import { getJob } from "@/lib/data";
import prisma from "@/lib/prisma";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Apply({job}){
    const [coverletter, setCoverletter] = useState('')
    const {data: session, status} = useSession()

    const router = useRouter()

    if(!session) return null
    
    return (
        <>
        <div className="container m-auto">
            <div className="mt-10 mb-4">
                <Link href={`/job/${job.id}`}
                className="border rounded-full px-8 py-2 hover:bg-black hover:text-white">
                    Back
                </Link>
            </div>
            <div className="text-center">
                <h2 className="text-xl font-bold">Apply to the Job {job.title}</h2>
            </div>
            <form
            onSubmit={async (e) => {
                e.preventDefault()

                await fetch('/api/application', {
                    body: JSON.stringify({
                        coverletter,
                        job: job.id,
                    }),
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST'
                })

                router.push('/dashboard')
            }}>
                <div className="mt-4 mb-3">
                    <p className="mb-5">{job.description}</p>
                    <p>PostedBy  
                    <Link href={`/company/${job.author.id}`}>
                    <span className="text-base front-medium underline"> {job.author.name}</span>
                    </Link>   
                    </p>
                </div>

                <div className="mt-2 mr-1">
                    <textarea className="w-full p-5 text-lg font-medium bg-transparent border"
                    rows={6}
                    cols={50}
                    placeholder="Cover letter"
                    required
                    onChange={(e) => setCoverletter(e.target.value)}/>
                </div>
                <div className="mt-5 text-center">
                    <button
                    className="px-8 py-2 border rounded-full hover:bg-black hover:text-white">Apply for this job</button>
                </div>
            </form>
        </div>
        </>
    )
}

export async function getServerSideProps(context){
    let job = await getJob(context.params.id, prisma)
    job = JSON.parse(JSON.stringify(job))

    return {
        props: {
            job,
        }
    }
}