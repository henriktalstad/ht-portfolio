import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { QueryProvider } from '@/components/providers/query-provider'
import { Nav } from '@/components/nav'
import '@/app/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'henriktalstad.com',
    template: '%s: Henrik Talstad',
  },
  description: 'Entrepreneur & Full-stack developer.',
  openGraph: {
    title: 'Henrik Talstad',
    description: 'Entrepreneur & Full-stack developer.',
    url: 'https://henriktalstad.com',
    siteName: 'henriktalstad.com',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: 'Henrik Talstad',
    card: 'summary_large_image',
  },
  icons: {
    icon: [
      {
        url: '/henrik.webp',
        sizes: 'any',
        type: 'image/webp',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <QueryProvider>
            <div className="relative min-h-screen">
              <Nav />
              <main className="container py-12 animate-fade-up">
                {children}
              </main>
              <footer className="container py-12 mt-32 border-t border-border">
                <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                  <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built with{' '}
                    <a
                      href="https://nextjs.org"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      Next.js
                    </a>
                    {' '}and{' '}
                    <a
                      href="https://sanity.io"
                      target="_blank"
                      rel="noreferrer"
                      className="font-medium underline underline-offset-4"
                    >
                      Sanity
                    </a>
                    .
                  </p>
                  <div className="flex items-center gap-4">
                    <a
                      href="https://github.com/henriktalstad"
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">GitHub</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a
                      href="https://no.linkedin.com/in/henrik-talstad-7b6909245"
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a
                    href="mailto:henrik.talstad@gmail.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <span className="sr-only">Email</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                      <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </QueryProvider>
      </ThemeProvider>
    </body>
  </html>
  )
}
