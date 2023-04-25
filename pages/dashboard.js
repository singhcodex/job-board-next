import { getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"
import { getJobsPosted, getUser } from "@/lib/data"
import prisma from "@/lib/prisma"
import Jobs from "./component/Jobs"
import { useSession } from "next-auth/react"

export default function Dashboard({jobs, user}){
    const {data: session, status} = useSession()
    return (
        <>
        <div className="container m-auto">
            <div className="text-center">
            <h2 className="text-center text-2xl font-bold">Dashboard</h2>
           {user.company && (
            <span className="bg-black text-white uppercase text-sm p-2">Company</span>
           )}
           {session && (
            <>
            {user.company && (
                <p className="my-10 text-xl font-normal">All the jobs you Posted</p>
            )}
            </>
           )}
            </div>
           
        </div>
        <Jobs jobs={jobs} isDashboard={true}/>
        </>
    )
}

export async function getServerSideProps(context){
    const session = await getServerSession(context.req, context.res, authOptions)

    let user = await getUser(session.user.id, prisma)
    user = JSON.parse(JSON.stringify(user))

    let jobs = await getJobsPosted(user.id, prisma)
    jobs = JSON.parse(JSON.stringify(jobs))

    return {
        props: {
            jobs,user
        }
    }
}