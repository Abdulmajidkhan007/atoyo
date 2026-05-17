import {
  collection, doc, getDoc, getDocs, addDoc, updateDoc, deleteDoc,
  query, where, orderBy, limit, startAfter,
  type QueryConstraint, type DocumentData, serverTimestamp, Timestamp,
} from 'firebase/firestore'
import { db } from './config'

export const COLLECTIONS = {
  PRODUCTS: 'products', CATEGORIES: 'categories', ORDERS: 'orders',
  USERS: 'users', REVIEWS: 'reviews', BLOG_POSTS: 'blog_posts',
  CONTACT_MESSAGES: 'contact_messages', BANNERS: 'banners', SITE_SETTINGS: 'site_settings',
} as const

export async function getDocument<T>(collectionName: string, id: string): Promise<T | null> {
  const snap = await getDoc(doc(db, collectionName, id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data() } as T
}

export async function getDocuments<T>(collectionName: string, constraints: QueryConstraint[] = []): Promise<T[]> {
  const snap = await getDocs(query(collection(db, collectionName), ...constraints))
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as T))
}

export async function createDocument(collectionName: string, data: DocumentData): Promise<string> {
  const docRef = await addDoc(collection(db, collectionName), { ...data, createdAt: serverTimestamp() })
  return docRef.id
}

export async function updateDocument(collectionName: string, id: string, data: Partial<DocumentData>): Promise<void> {
  await updateDoc(doc(db, collectionName, id), { ...data, updatedAt: serverTimestamp() })
}

export async function deleteDocument(collectionName: string, id: string): Promise<void> {
  await deleteDoc(doc(db, collectionName, id))
}

export { where, orderBy, limit, startAfter, serverTimestamp, Timestamp }
