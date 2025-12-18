/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import {
  GoogleAuthProvider,
  User,
  UserCredential,
  getAuth,
  signInAnonymously,
  signInWithPopup,
} from "firebase/auth"
import { atom, useAtomValue } from "jotai"
import { loadable } from "jotai/utils"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { fetchUserType } from "../services/user-service"
import { UserType } from "../types/user-type"
import { app, auth } from "./firebaseInit"
import { store } from "./store"

export const currentUser = atom<Promise<User | null> | User | null>(
  new Promise<User | null>(() => {})
)

export const currentUserType = atom<Promise<UserType | null> | UserType | null>(
  new Promise<UserType | null>(() => {})
)

currentUser.debugLabel = "currentUser"

const unsubscribe = auth.onAuthStateChanged(async (user) => {
  store.set(currentUser, user)
  if (user) {
    const userType = await fetchUserType(user.uid)
    store.set(currentUserType, userType)
  } else {
    store.set(currentUserType, null)
  }
})

if (import.meta.hot) {
  import.meta.hot.dispose(() => unsubscribe())
}

export function useCurrentUser() {
  return useAtomValue(currentUser)
}
export function useCurrentUserType() {
  return useAtomValue(currentUserType)
}
export const currentUserLoadable = loadable(currentUser)

export const currentUserTypeLoadable = loadable(currentUserType)

export function useCurrentUserLoadable() {
  return useAtomValue(currentUserLoadable)
}

export function useCurrentUserTypeLoadable() {
  return useAtomValue(currentUserTypeLoadable)
}

export function useSignIn(signInMethod: SignInMethod): [signIn: () => void, inFlight: boolean] {
  const navigate = useNavigate()
  const [inFlight, setInFlight] = useState(false)

  const signIn = useCallback(() => {
    let p: Promise<UserCredential> | null = null

    if (signInMethod === "anonymous") {
      const auth = getAuth(app)
      p = signInAnonymously(auth)
    }

    if (signInMethod === "google.com") {
      const auth = getAuth(app)
      const provider = new GoogleAuthProvider()
      provider.addScope("profile")
      provider.addScope("email")
      provider.setCustomParameters({
        // login_hint: ...
        prompt: "consent",
      })
      p = signInWithPopup(auth, provider)
    }

    if (!p) throw new Error(`Not supported: ${signInMethod}`)

    setInFlight(true)
    p.then(() => navigate("/")).finally(() => {
      setInFlight(false)
      window.location.reload()
    })
  }, [signInMethod, navigate])

  return [signIn, inFlight] as const
}

export type SignInMethod = "google.com" | "anonymous"
