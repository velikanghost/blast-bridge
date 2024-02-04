import type { Metadata } from 'next'
import '@/styles/globals.css'
import 'primereact/resources/themes/tailwind-light/theme.css'
import { PrimeReactProvider } from 'primereact/api'
import Navbar from '@/components/Navbar'
import Web3ReactProviderUpgrade from './provider'

export const metadata: Metadata = {
  title: 'Blast Bridge',
  description: 'A simple dapp to bridge into Blast',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Web3ReactProviderUpgrade>
          <PrimeReactProvider>
            <Navbar />
            {children}
          </PrimeReactProvider>
        </Web3ReactProviderUpgrade>
      </body>
    </html>
  )
}
