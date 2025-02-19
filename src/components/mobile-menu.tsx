'use client'

import { Menu } from '@headlessui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu as MenuIcon, X } from 'lucide-react'

interface MobileMenuProps {
  links: Array<{ href: string; label: string }>
}

export function MobileMenu({ links }: MobileMenuProps) {
  const pathname = usePathname()

  return (
    <Menu as="div" className="relative">
      {({ open }) => (
        <>
          <Menu.Button
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center',
              'rounded-lg border border-border bg-background',
              'text-muted-foreground hover:text-foreground',
              'focus:outline-none focus:ring-2',
              'focus:ring-primary focus:ring-offset-2',
              'transition-colors duration-200'
            )}
            aria-label="Open menu"
          >
            {open ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-4 w-4" aria-hidden="true" />
            )}
          </Menu.Button>

          <Menu.Items
            className={cn(
              'absolute right-0 top-full mt-2 w-36 origin-top-right',
              'rounded-lg border border-border bg-background p-1',
              'shadow-lg focus:outline-none',
              'divide-y divide-border'
            )}
          >
            <div className="px-1 py-1">
              {links.map(({ href, label }) => (
                <Menu.Item key={href}>
                  {({ active }) => (
                    <Link
                      href={href}
                      className={cn(
                        'group flex w-full items-center rounded-md px-3 py-2 text-sm',
                        active || pathname === href
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground',
                        'transition-colors duration-200'
                      )}
                    >
                      {label}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </>
      )}
    </Menu>
  )
}
