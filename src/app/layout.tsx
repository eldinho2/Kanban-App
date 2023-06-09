import './globals.css'
import { Poppins, Roboto } from '@next/font/google'

const roboto = Roboto({
  weight: ['400', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
})

const poppins = Poppins({
  weight: ['400', '700'],
  variable: '--font-poppins',
  subsets: ['latin'],
})

export const metadata = {
  title: 'Kanban',
  description: 'Generated by create next app',
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${poppins.variable}`}>
          {children}
      </body>
    </html>
  )
}
