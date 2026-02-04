// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBI62eNKjTCm4Kfb_1dfInxrT7jFsiK4YU",
  authDomain: "connectour-438918.firebaseapp.com",
  projectId: "connectour-438918",
  storageBucket: "connectour-438918.appspot.com",
  messagingSenderId: "237895936141",
  appId: "1:237895936141:web:a7890c882e0253d27cdac4",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
