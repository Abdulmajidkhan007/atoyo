import { useEffect } from 'react'
import { useAppSelector } from '@/store'
import { selectTheme } from '@/features/theme/themeSlice'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useAppSelector(selectTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}
