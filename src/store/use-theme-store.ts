import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const getSystemTheme = () => {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getSystemTheme(),
      setTheme: (theme) => {
        const root = document.documentElement
        const resolvedTheme = theme === 'system' ? getSystemTheme() : theme
        
        root.classList.remove('light', 'dark')
        root.classList.add(resolvedTheme)
        
        set({ theme: resolvedTheme })
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)
