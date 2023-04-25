import { useState } from "react";


export default function Setup(){
    const [name, setName] = useState('')
    const [company, setCompany] = useState(false)

    return (
        <form className="mt-10 ml-20">
            <div className="flex-1 mb-5">
                <div className="form-group">
                    <label className="mx-4">Add your Name</label>
                    <input className="form-input px-4 py-3 rounded border" type="text" name="name" onChange={(e) => setName(e.target.value)}/>   
                </div>
                <div className="my-5">
                    <label className="mx-4">Check this box if you're a Company and you want to post a Jobs </label>
                    <input 
                    type="checkbox"
                    name="company"
                    checked={company}
                    onChange={(e) => setCompany(!company)}
                    className="px-4 py-3 rounded border"/>
                </div>
            </div>
        </form>
    )
}