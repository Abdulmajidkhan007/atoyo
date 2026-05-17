import { createSlice } from '@reduxjs/toolkit'
import type { ThemeMode } from '@/types'

const getInitial = (): ThemeMode => {
  const stored = localStorage.getItem('atoyo_theme') as ThemeMode | null
  if (stored) return stored
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: getInitial() },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('atoyo_theme', state.mode)
      document.documentElement.setAttribute('data-theme', state.mode)
    },
    setTheme(state, action) {
      state.mode = action.payload
      localStorage.setItem('atoyo_theme', state.mode)
      document.documentElement.setAttribute('data-theme', state.mode)
    },
  },
})

export const { toggleTheme, setTheme } = themeSlice.actions
export const selectTheme = (state: { theme: { mode: ThemeMode } }) => state.theme.mode
export default themeSlice.reducer
