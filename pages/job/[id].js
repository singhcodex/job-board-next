import { getJob } from "@/lib/data"
import prisma from "@/lib/prisma"
import Link from "next/link"

export default function Job({job}){
    return (
       <>
       <div className="container m-auto">
        <div className="mt-6 mb-5">
        <Link className="border text-center rounded-full px-10 py-2 hover:bg-slate-700 hover:text-white" href={`/`}>Back</Link>    
        </div>
       

        <div className="card border px-3 py-4">
            <h2 className="text-center mb-5 text-xl font-bold">{job.title}</h2>
            <p>{job.description}</p>

            <div className="mt-4">
                <p className="inline">Posted By </p>
                <Link href={`/company/${job.author.id}`}>
                    <span className="underline hover:text-sky-500">{job.author.name}</span>
                </Link>
            </div>
        </div>

        <div className="text-center mt-5">
            <Link href={`/job/${job.id}/apply`}>
                <button className="border px-8 py-2 mt-0 font-bold rounded-full hover:bg-black hover:text-white">
                    Apply for this Job
                </button>
            </Link>
        </div>
       </div>
       </>
    )
}


export async function getServerSideProps(context){
    let job = await getJob(context.params.id, prisma)
    job = JSON.parse(JSON.stringify(job))
    
    console.log(context.params.id)

    return {props: {job}}
}