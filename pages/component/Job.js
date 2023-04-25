import Link from "next/link"
import { useRouter } from "next/router"

const Job = ({job, isDashboard}) => {
    const router = useRouter()
    return (
        <div className="pl-16 pr-16 mb-4 mt-20">
            <h2 className="underline text-xl font-bold">
                <Link href={`/job/${job.id}`} className="hover:text-sky-600">{job.title}</Link>
            </h2>
            <p className="text-base font-normal mt-3 mb-5">{job.description}</p>
            {isDashboard && job.published ? (
                <span className="bg-black text-white uppercase text-sm p-2 mr-5"
                onClick={async () => {
                    await fetch('/api/job', {
                        body: JSON.stringify({
                            id: job.id,
                            task: 'unpublish',
                        }),
                        headers:  {'Content-Type': 'application/json'},
                        method: 'PUT'
                    })
                    router.reload(window.location.pathname)
                }}> ✅ Published</span>
            ): (
                <span className="bg-black text-white uppercase text-sm p-2 mr-5"
                onClick={async () => {
                    await fetch('/api/job', {
                        body: JSON.stringify({
                            id: job.id,
                            task: 'unpublish',
                        }),
                        headers:  {'Content-Type': 'application/json'},
                        method: 'PUT'
                    })
                    router.reload(window.location.pathname)
                }}>  ❌ Published</span>
            )}
            <div className="mt-4">
                <p className="inline">Posted by </p>
                <span className="underline text-base font-medium color-primary">{job.author.name}</span>
            </div>
        </div>
    )
}

export default Job