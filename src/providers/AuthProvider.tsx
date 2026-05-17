import { useEffect } from 'react'
import { useAppDispatch } from '@/store'
import { setUser } from '@/features/auth/authSlice'
import { onAuthChange } from '@/firebase/auth'
import { getDocument, COLLECTIONS } from '@/firebase/firestore'
import type { User } from '@/types'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        const userData = await getDocument<User>(COLLECTIONS.USERS, firebaseUser.uid)
        dispatch(
          setUser(
            userData || {
              uid: firebaseUser.uid,
              email: firebaseUser.email || '',
              displayName: firebaseUser.displayName || '',
              role: 'user',
              emailVerified: firebaseUser.emailVerified,
            }
          )
        )
      } else {
        dispatch(setUser(null))
      }
    })

    return unsubscribe
  }, [dispatch])

  return <>{children}</>
}
