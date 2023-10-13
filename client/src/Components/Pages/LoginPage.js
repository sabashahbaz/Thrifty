import React, { useState, useContext } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "../Pieces/UserContext.js";
import bg from "../../Assets/bg-clothing.png"

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
        <div className=" h-screen flex items-center justify-around bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }} >
            <div className = "container mb-20 bg shadow-xl w-25 bg-loginbackground/90 w-1/2 rounded-2xl border-2 border-orange-950/50">
                <h1 className="text-4xl text-center mt-6">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <div className = "pt-5">
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl shadow hover:shadow-xl cursor-pointer focus:outline-none" 
                            type="email" 
                            placeholder="your@email.com" 
                            value={email}
                            onChange={handleChangeEmail}
                            />

                    </div>
                    <div className = "pt-5">
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl shadow hover:shadow-xl cursor-pointer focus:outline-none " 
                            type="password" 
                            placeholder = "password"
                            value={password}
                            onChange={handleChangePassword} 
                            />

                    </div>
                    <div className = "pt-5">
                    <button className="bg-amber-900/25 p-2 w-full rounded-2xl text-black font-bold text-lg shadow hover:shadow-xl cursor-pointer border-2 border-amber-950"> Login</button>
                    </div>
                    
                    <div className="text-center font-bold py-2 text-amber-950 mt-2 ">
                        Don't have an account yet? <Link className="underline text cursor-pointer shadow hover:text-amber-800" to={'/register'}> Register now</Link>
                        </div>
                </form>
            </div>
        </div>
    )
};
