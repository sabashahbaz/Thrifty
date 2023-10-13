import React, { useState } from "react";
import { Link } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function registerUser (e) {
    e.preventDefault()
    try {
        await axios.post('/register', {
            firstName, lastName, email, password
        });
        alert("Registered successfull. Now you can log in.")
    } catch (e) {
        alert("Registration failed. Please try again.")
    }
};

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className = "mb-32">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <div className="flex">
                        <input className= "w-full border my-1 mr-1 py-2 px-3 rounded-2xl" 
                                type="first name" 
                                placeholder="first name"
                                value={firstName} 
                                onChange={(e) => setFirstName(e.target.value)}
                                />
                        <input className= "w-full border my-1 ml-1 py-2 px-3 rounded-2xl" 
                                type="last name" 
                                placeholder="last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)} 
                                />
                    </div>
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" 
                            type="email" 
                            placeholder="your@email.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" 
                            type="password" 
                            placeholder = "password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            />
                    <button className="bg-primary p-2 w-full rounded-2xl text-black"> Register</button>
                    <div className="text-center py-2 text-gray-500">
                        Already a member? <Link className="underline text" to={'/login'}> Login</Link>
                        </div>
                </form>


            </div>
        </div>
    )
};

export default Register;
