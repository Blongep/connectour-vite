import { getApp } from "firebase/app"
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore"

import { app } from "../core/firebaseInit"
import { UserType } from "../types/user-type"
const db = getFirestore(app ? app : getApp())

export const fetchUserType = async (userId: string): Promise<UserType> => {
  const querySnapshotUserType = await getDocs(
    query(collection(db, "userTypes"), where("userId", "==", userId))
  )
  if (querySnapshotUserType.docs.length > 0) {
    const userType = querySnapshotUserType.docs[0].data()
    return {
      id: userType.id,
      userId: userId,
      type: userType.type,
    } as unknown as UserType
  }
  return {} as unknown as UserType
}

export const subscribeToArtist = async (userId: string, artistId: string): Promise<void> => {
  try {
    const subscriptionData = {
      userId: userId,
      artistId: artistId,
    }

    // Add the subscription to the "subscriptions" collection
    await addDoc(collection(db, "subscriptions"), subscriptionData)
    console.log(`User ${userId} subscribed to artist ${artistId}`)
  } catch (error) {
    console.error("Error subscribing to artist:", error)
    throw new Error("Failed to subscribe to artist")
  }
}

export const isUserSubscribedToArtist = async (
  userId: string,
  artistId: string
): Promise<boolean> => {
  try {
    const querySnapshot = await getDocs(
      query(
        collection(db, "subscriptions"),
        where("userId", "==", userId),
        where("artistId", "==", artistId)
      )
    )

    // If the query returns any documents, the user is subscribed
    return querySnapshot.docs.length > 0
  } catch (error) {
    console.error("Error checking artist subscription:", error)
    return false
  }
}
