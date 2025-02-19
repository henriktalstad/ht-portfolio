'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

const links = [
  { href: '/blog', label: 'Blog' },
  { href: '/projects', label: 'Projects' },
  { href: '/about', label: 'About' },
]

export function Nav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              src="/henrik.webp"
              alt="Henrik Talstad"
              fill
              className="object-cover"
              priority
            />
          </div>
          <span className="font-medium">Henrik Talstad</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:space-x-6">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm transition-colors hover:text-foreground/80',
                  isActive ? 'text-foreground' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            )
          })}
          <ThemeToggle />
        </nav>

        {/* Mobile Navigation */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav className="mt-6 flex flex-col space-y-4">
                {links.map((link) => {
                  const isActive = pathname === link.href
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        'text-sm transition-colors hover:text-foreground/80',
                        isActive ? 'text-foreground' : 'text-foreground/60'
                      )}
                    >
                      {link.label}
                    </Link>
                  )
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
