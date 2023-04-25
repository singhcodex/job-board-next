import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";


export default function New(){
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [salary, setSalary] = useState('')
    const [location, setLocation] = useState('')
    const router = useRouter()
    const {data: session, status} = useSession()

    if(!session || !session.user) return null

    return [
        <>
        <div className="container m-auto">
            <div className="border border-black px-8 py-3">
                <form
                onSubmit={ async (e) => {
                    e.preventDefault()

                    await fetch('/api/job', {
                        body: JSON.stringify({
                            title,
                            description,
                            salary,
                            location
                        }),
                        headers: { 'Content-Type': 'application/json'},
                        method: 'POST'
                    })
                    router.push('/dashboard')
                }}>
                    <h2 className="text-center mb-3 text-2xl font-bold">Post a new Job!</h2>
                    <div className=" pt-2 mt-2 mr-1 ">
                        <input 
                        className="border p-4 w-full text-lg font-medium bg-transparent" 
                        placeholder="Job Title"
                        required
                        onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className=" pt-2 mt-2 mr-1 ">
                        <textarea 
                        className="border p-4 w-full text-lg font-medium bg-transparent" 
                        placeholder="Job description"
                        required
                        onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className=" pt-2 mt-2 mr-1 ">
                        <input 
                        className="border p-4 w-full text-lg font-medium bg-transparent" 
                        placeholder="Salary"
                        required
                        onChange={(e) => setSalary(e.target.value)}/>
                    </div>
                    <div className=" pt-2 mt-2 mr-1 ">
                        <input 
                        className="border p-4 w-full text-lg font-medium bg-transparent" 
                        placeholder="Job Location"
                        required
                        onChange={(e) => setLocation(e.target.value)}/>
                    </div>
                    <div className="mt-5">
                        <button
                        className="border px-8 py-2 mt-0 font-bold rounded-full hover:bg-slate-500 hover:text-white">Post job</button>
                    </div>
                </form>
            </div>

        </div>
        </>
    ]
}