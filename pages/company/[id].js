import { getCompany, getCompanyJobs } from "@/lib/data"
import prisma from "@/lib/prisma"
import Link from "next/link"
import Job from "../component/Job"

export default function Company({jobs, company}){
    return (
        <>
        <div className="container m-auto mt-10">
            <Link href={`/`} className="border rounded-full py-2 px-8 hover:bg-slate-500 hover:text-white">Back</Link>
            <div className="mt-4">
                <h2 className="text-center font-bold text-xl mb-10">Profile of {company.name}</h2>
                <div className="card border border-r-2 px-2 py-4">
                    <p className="underline text-center">Company jobs</p>
                {jobs.map((job, index) => (
                    <Job key={index} job={job}/>
                    ))}
                </div>
               
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps({params}){
    let company = await getCompany(params.id, prisma)

    let jobs = await getCompanyJobs(params.id, prisma)

    company = JSON.parse(JSON.stringify(company))
    jobs = JSON.parse(JSON.stringify(jobs))

    return {
        props: {jobs, company}
    }
}