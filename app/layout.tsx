import './globals.css';
import type { Metadata } from 'next';
import { GeistMono, GeistSans } from "geist/font";

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'GitHub Activity Dashboard',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${GeistSans.variable} ${GeistMono.variable}`} lang="en">
        <body>{children}</body>
    </html>
  )
}