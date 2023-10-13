import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "../Pieces/UserContext.js";

export default function LoginPage({ attemptLogin, setCurrentUser}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const {setUser} = useContext(UserContext)

    const handleChangeEmail = e => setEmail(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    async function handleLogin (e) {
        e.preventDefault()
        // try {
        const response = await axios.post('/login',{email, password}, {withCredentials: true})
        setUser(response.data)
        console.log(response.data)
        navigate('/')
    }
    


    return (
        <div className=" h-screen flex items-center justify-around bg-gradient-to-t from-sky-300 to-blue-500" >
            <div className = "container mb-20 bg shadow-xl w-25 bg-sky-300 w-1/2 rounded-2xl border-2 border-blue-500">
                <h1 className="text-4xl text-center mt-6">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <div className = "pt-5">
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl shadow hover:shadow-xl cursor-pointer" 
                            type="email" 
                            placeholder="your@email.com" 
                            value={email}
                            onChange={handleChangeEmail}
                            />

                    </div>
                    <div className = "pt-5">
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl shadow hover:shadow-xl cursor-pointer" 
                            type="password" 
                            placeholder = "password"
                            value={password}
                            onChange={handleChangePassword} 
                            />

                    </div>
                    <div className = "pt-5">
                    <button className="bg-zinc-200 p-2 w-full rounded-2xl text-black shadow hover:shadow-xl cursor-pointer border-2 border-blue-400"> Login</button>
                    </div>
                    
                    <div className="text-center py-2 text-gray-500 mt-2 ">
                        Don't have an account yet? <Link className="underline text cursor-pointer shadow hover:shadow-xl" to={'/register'}> Register now</Link>
                        </div>
                </form>
            </div>
        </div>
    )
};
