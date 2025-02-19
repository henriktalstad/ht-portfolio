'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'
import { useTheme } from '@/components/providers/theme-provider'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="relative h-10 w-10 rounded-lg bg-muted p-2 hover:bg-muted/80 focus-ring"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center text-foreground"
      >
        <Sun className="h-5 w-5" />
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="absolute inset-0 flex items-center justify-center text-foreground"
      >
        <Moon className="h-5 w-5" />
      </motion.div>
    </button>
  )
}
