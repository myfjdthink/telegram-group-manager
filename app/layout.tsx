import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Task3 Group Admin',
  description: 'Task3 Group Admin',
  generator: 'Task3 Group Admin',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
