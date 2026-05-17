import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC1IRhd9DgOekIOWLW1kxNtizyG2ojKocs",
  authDomain: "atoyo-52eba.firebaseapp.com",
  projectId: "atoyo-52eba",
  storageBucket: "atoyo-52eba.firebasestorage.app",
  messagingSenderId: "957435369043",
  appId: "1:957435369043:web:bec968f15758d3745898a6",
  measurementId: "G-9KQ2TW3JBW"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
