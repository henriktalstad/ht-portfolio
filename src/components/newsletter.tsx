'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    
    try {
      // Add your newsletter subscription logic here
      await new Promise(resolve => setTimeout(resolve, 1000))
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <section className="newsletter-container">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <h2 className="text-2xl font-bold md:text-3xl">
            Stay Updated
          </h2>
          <p className="text-muted-foreground">
            Subscribe to my newsletter for updates on my latest projects, articles, and tech insights.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-3 sm:space-y-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="newsletter-input"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="newsletter-button whitespace-nowrap"
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {status === 'success' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-green-600 dark:text-green-400"
              >
                Thanks for subscribing!
              </motion.p>
            )}
            {status === 'error' && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-600 dark:text-red-400"
              >
                Something went wrong. Please try again.
              </motion.p>
            )}
          </form>
        </div>
        
        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/50 to-transparent rounded-xl" />
          <Image
            src="/profile.jpg"
            alt="Henrik Talstad"
            width={400}
            height={400}
            className="rounded-xl object-cover w-full h-full"
          />
        </div>
      </div>
    </section>
  )
}
