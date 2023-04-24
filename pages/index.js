import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Index() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
     <h1>Index page</h1>
     <p>
      <a href='/api/auth/signin'>Login</a>
     </p>
    </main>
  )
}
