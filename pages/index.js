import Image from 'next/image'
import { Inter } from 'next/font/google'
import prisma from '@/lib/prisma'
import { getJobs } from '@/lib/data'
import Jobs from './component/Jobs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Index({jobs}) {
  const {data: session, status } = useSession()
  const router = useRouter()

  if(session && !session.user.name){
    router.push('/setup')
  }

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
     <h1 className='text-2xl text-bold'>Find a Job</h1>
     {!session && (
      <a className='flex justify-center w-24 px-8 py-2 mx-auto front-bold text-white bg-black border border-black rounded-full'
      href='/api/auth/signin'>Login</a>
     )}
     <Jobs jobs={jobs}/>
    </main>
  )
}


export async function getServerSideProps(context){
  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))

  return {
    props: {
      jobs,
    }
  }
}
