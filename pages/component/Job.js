import Link from "next/link"

const Job = ({job}) => {
    return (
        <div className="pl-16 pr-16 mb-4 mt-20">
            <h2 className="underline text-xl font-bold">
                <Link href={`/job/${job.id}`} className="hover:text-sky-600">{job.title}</Link>
            </h2>
            <p className="text-base font-normal mt-3">{job.description}</p>

            <div className="mt-4">
                <p className="inline">Posted by </p>
                <span className="underline text-base font-medium color-primary">{job.author.name}</span>
            </div>
        </div>
    )
}

export default Job