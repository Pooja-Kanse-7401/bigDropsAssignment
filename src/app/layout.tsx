import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://shielddrive.vercel.app'
const TITLE    = 'ShieldDrive — Get Your Free Auto Insurance Quote'
const DESC     = 'Compare auto insurance rates in minutes. Licensed in all 50 states. See how much you could save today.'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  TITLE,
    template: '%s | ShieldDrive Insurance',
  },

  description: DESC,

  keywords: [
    'auto insurance',
    'car insurance quotes',
    'cheap car insurance',
    'free insurance quote',
    'compare auto insurance',
    'US car insurance',
  ],

  authors: [{ name: 'ShieldDrive Insurance', url: BASE_URL }],

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type:        'website',
    url:         BASE_URL,
    siteName:    'ShieldDrive Insurance',
    title:       TITLE,
    description: DESC,
    images: [
      {
        url:    '/og-image.png',
        width:  1200,
        height: 630,
        alt:    'ShieldDrive Insurance — Get Your Free Auto Quote',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       TITLE,
    description: DESC,
    images:      ['/og-image.png'],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
