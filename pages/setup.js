import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";


export default function Setup(){
  
    const router = useRouter()
    const {data: session, status} = useSession()
    const loading = status === 'loading'

    const [name, setName] = useState('')
    const [company, setCompany] = useState(false)

    if(loading) return null

    if(!session && !session.user){
        router.push('/')
        return null
    }

    if(!loading && session && session.user.name){
        router.push('/')
    }

    return (
        <>
        <div className="container m-auto">
        <form className="mt-10 ml-20" 
        onSubmit={ async (e) => {
            e.preventDefault()
            await fetch('/api/setup', {
                body: JSON.stringify({name, company}),
                headers: {'Content-Type': 'application/json'},
                method: 'POST',
            })
            session.user.name = name
            session.user.company = company
            router.push('/')
        }}>
            <div className="card border px-5 py-4">
                <legend className="font-bold text-xl text-center mb-5">Setup User Name or Company</legend>
                <div className="form-group text-center">
                    <label className="mx-4">Add your Name</label>
                    <input className="form-input px-4 py-3 rounded border" type="text" name="name" onChange={(e) => setName(e.target.value)}/>   
                </div>
                <div className="my-5 text-center">
                    <label className="mx-4">Check this box if you're a Company and you want to post a Jobs </label>
                    <input 
                    type="checkbox"
                    name="company"
                    checked={company}
                    onChange={(e) => setCompany(!company)}
                    className="px-4 py-3 rounded border"/>
                </div>
                <div className="text-center">
                    <button className="border rounded-full px-8 py-2 bg-green-500 hover:bg-green-600">Save</button>
                </div>
               
            </div>
        </form>
        </div>
        
        </>
        
    )
}