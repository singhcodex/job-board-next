import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { getApplications, getJobsPosted, getUser } from "@/lib/data"
import prisma from "@/lib/prisma"
import Jobs from "./component/Jobs"
import { useSession } from "next-auth/react"
import Link from "next/link"
import Job from "./job/[id]"

export default function Dashboard({ jobs, user, applications }) {
    const { data: session, status } = useSession()
  
    return (
      <div className='mt-10'>
        <div className='text-center p-4 m-4'>
          <h2 className='mb-10 text-4xl font-bold'>Dashboard</h2>
          {user.company && (
            <span className='bg-black text-white uppercase text-sm p-2 '>
              Company
            </span>
          )}
          {session && (
            <p className='mt-10 mb-10 text-2xl font-normal'>
              {user.company ? 'all the jobs you posted' : 'your applications'}
            </p>
          )}
        </div>
  
        {user.company ? (
            <div>
                {jobs.map((job, index) => (
                    <div key={index}>
                        <Job job={job} isDashboard={true}/>
                    </div>
                ))}
            </div>
          
        ) : (
          <>
                  {applications.map((application, application_index) => {
                    return (
                      <div key={application_index} className='mb-4 mt-20 flex justify-center'>
                  <div className='pl-16 pr-16 -mt-6 w-1/2'>
                    <Link href={`/job/${application.job.id}`}>
                      <a className='text-xl font-bold underline'>
                        {application.job.title}
                      </a>
                    </Link>
                    <h2 className='text-base font-normal mt-3'>
                      {application.coverletter}
                    </h2>
                  </div>
                </div>
              )
            })}
          </>
        )}
      </div>
    )
  }
  
  export async function getServerSideProps(context) {
      const session = await getServerSession(context.req, context.res, authOptions)
    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))
  
    let jobs = []
    let applications = []
  
    if (user.company) {
      jobs = await getJobsPosted(user.id, prisma)
      jobs = JSON.parse(JSON.stringify(jobs))
    } else {
      applications = await getApplications(user.id, prisma)
      applications = JSON.parse(JSON.stringify(applications))
    }
  
    return {
      props: {
        jobs,
        user,
        applications,
      },
    }
  }