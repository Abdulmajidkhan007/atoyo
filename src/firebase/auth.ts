import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  GoogleAuthProvider, signInWithPopup, onAuthStateChanged, updateProfile,
  type User,
} from 'firebase/auth'
import { auth } from './config'
import { createDocument, getDocument, COLLECTIONS } from './firestore'

const googleProvider = new GoogleAuthProvider()

export async function registerWithEmail(email: string, password: string, displayName: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, password)
  await updateProfile(cred.user, { displayName })
  await createDocument(COLLECTIONS.USERS, { uid: cred.user.uid, email, displayName, role: 'user', emailVerified: false, phone: '', address: '' })
  return cred.user
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, password)
  return cred.user
}

export async function loginWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider)
  const user = result.user
  const existing = await getDocument(COLLECTIONS.USERS, user.uid)
  if (!existing) {
    await createDocument(COLLECTIONS.USERS, { uid: user.uid, email: user.email, displayName: user.displayName, role: 'user', emailVerified: true, phone: '', address: '' })
  }
  return user
}

export async function logout(): Promise<void> {
  await signOut(auth)
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback)
}
