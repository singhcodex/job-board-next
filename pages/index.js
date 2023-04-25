import Image from 'next/image'
import { Inter } from 'next/font/google'
import prisma from '@/lib/prisma'
import { getJobs, getUser } from '@/lib/data'
import Jobs from './component/Jobs'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Index({jobs, user}) {
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

     {session && (
      <div className='mx-auto text-center'>
        <p className='mb-10 text-2xl font-normal'>
          Welcome, {user.name} {user.company && (
            <span className='bg-black text-white uppercase text-sm p-2'> Company</span>
          )}
        </p>
        {user.company ? (
          <>
          <Link href={`/new`}>
            <button className='border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>Click here to post New Job</button>
          </Link>
          <Link href={`/dashboard`}>
          <button className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '>See all the Jobs you posted</button>
          </Link>
          </>
        ) : (
          <>
          <Link href={`/dashboard`}>
          <button
          className='ml-5 border px-8 py-2 mt-5 font-bold rounded-full bg-black text-white border-black '
        >
          see all the jobs you applied to
        </button>
          </Link>
          
          </>
        )}

      </div>
     )}
     <Jobs jobs={jobs}/>
    </main>
  )
}


export async function getServerSideProps(context){
  const session = await getServerSession(context.req, context.res, authOptions)

  let jobs = await getJobs(prisma)
  jobs = JSON.parse(JSON.stringify(jobs))
  
  if(!session){
    return {
      props: {
        jobs,
      }
    }
  }

  let user = await getUser(session.user.id, prisma)
  user = JSON.parse(JSON.stringify(user))

  return {
    props: {
      jobs,
      user,
    }
  }
  
}
