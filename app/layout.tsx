import './globals.css'
import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Revenue Calculator - Professional Payout & Goal Calculator',
  description: 'Calculate user payouts and determine how many users you need to reach your revenue goals with yearly, monthly, and weekly subscription breakdowns.',
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50">
          <main>
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 