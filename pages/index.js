import Image from 'next/image'
import { Inter } from 'next/font/google'
import prisma from '@/lib/prisma'
import { getJobs } from '@/lib/data'
import Jobs from './component/Jobs'

const inter = Inter({ subsets: ['latin'] })

export default function Index({jobs}) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
     <h1 className='text-2xl text-bold'>Find a Job</h1>
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
