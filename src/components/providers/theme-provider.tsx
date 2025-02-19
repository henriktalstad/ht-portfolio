'use client'

import * as React from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { motion, AnimatePresence } from 'motion/react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeStore {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        
        if (theme === 'system') {
          const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light'
          root.classList.add(systemTheme)
        } else {
          root.classList.add(theme)
        }
        
        set({ theme })
      },
    }),
    {
      name: 'theme-storage',
    }
  )
)

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = React.useState(false)
  const theme = useThemeStore((state) => state.theme)

  // Handle initial theme
  React.useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem('theme-storage')
    if (savedTheme) {
      const { state: { theme } } = JSON.parse(savedTheme)
      useThemeStore.getState().setTheme(theme)
    }
  }, [])

  // Handle system theme changes
  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = () => {
      if (theme === 'system') {
        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(mediaQuery.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  if (!mounted) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export function useTheme() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  const resolvedTheme = React.useMemo(() => {
    if (typeof window === 'undefined') return 'system'
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    return theme
  }, [theme])

  return {
    theme,
    resolvedTheme,
    setTheme,
  }
}
