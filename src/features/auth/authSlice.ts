import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { User } from '@/types'

interface AuthState {
  user: User | null
  loading: boolean
  initialized: boolean
  otpEmail: string | null
}

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: true, initialized: false, otpEmail: null } as AuthState,
  reducers: {
    setUser(state, action: PayloadAction<User | null>) {
      state.user = action.payload
      state.loading = false
      state.initialized = true
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload
    },
    setOtpEmail(state, action: PayloadAction<string | null>) {
      state.otpEmail = action.payload
    },
    clearAuth(state) {
      state.user = null
      state.otpEmail = null
    },
  },
})

export const { setUser, setLoading, setOtpEmail, clearAuth } = authSlice.actions
export default authSlice.reducer
