

export default function Utils(){
    
    return (
        <>
            <div className="container m-auto mt-10">
                <h2 className="font-bold text-xl text-center">Utils</h2>
                <div className="flex-1 m-5 space-x-10 text-center">
                    <button
                    className="border bg-slate-500 px-8 py-2 rounded-full text-white hover:bg-slate-600"
                    onClick={ async () => {
                        await fetch('/api/utils', {
                            body: JSON.stringify({
                                task: 'clean_database',
                            }),
                            headers:  {
                                'Content-Type': 'application/json',
                            },
                            method: 'POST'
                        })
                    }}>Clean Database</button>
                    <button
                    className="border bg-slate-500 px-8 py-2 rounded-full text-white hover:bg-slate-600"
                    onClick={async () => {
                        await fetch('/api/utils', {
                            body: JSON.stringify({
                                task: 'generate_users_and_jobs'
                            }),
                            headers: { 'Content-Type': 'application/json'},
                            method: 'POST'
                        })
                    }}>Generate 10 USers and some Jobs</button>
                    <button
                    className="border bg-slate-500 px-8 py-2 rounded-full text-white hover:bg-slate-600"
                    onClick={async () => {
                        await fetch('/api/utils', {
                            body: JSON.stringify({
                                task: 'generate_one_job'
                            }),
                            headers: { 'Content-Type': 'application/json'},
                            method: 'POST'
                        })
                    }}>Generate One Job</button>
                </div>
               
            </div>
        </>
    )
}