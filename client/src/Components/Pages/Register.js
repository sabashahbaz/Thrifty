import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import bg from "../../Assets/bg-clothing.png"

//user registration page 
function Register() {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    //user submit their name, email and password 
    async function registerUser (e) {
    e.preventDefault()
    try {
        await axios.post('/register', {
            firstName, lastName, email, password
        });
        alert("Registered successfull. Now you can log in.")
        navigate('/login') // once their information is submitted, they redirected to the login page 
    } catch (e) {
        alert("Registration failed. Please try again.")
    }
};

    return (
        <div className=" h-screen  grow flex items-center justify-around bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
            <div className = "container mb-20 bg shadow-xl w-25 bg-loginbackground/90 w-1/2 h-1/2 rounded-2xl border-2 border-orange-950/50">
                <h1 className="text-4xl text-center mt-6">Register</h1>
                <form className="max-w-md mx-auto mt-5" onSubmit={registerUser}>
                    <div className = "pt-4">
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
                    </div>
                    <div className = "pt-4">
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" 
                            type="email" 
                            placeholder="your@email.com"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            />
                    </div>
                    <div className = "pt-4">
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" 
                            type="password" 
                            placeholder = "password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            />
                    </div>
                    <div className = "pt-4">
                        <button className="bg-amber-900/25 p-2 w-full rounded-2xl text-black font-bold text-xl"> Register</button>
                        <div className="text-center font-bold py-2 amber-950 mt-2">
                        Already a member? <Link className="underline text cursor-pointer shadow hover:text-amber-800" to={'/login'}> Login</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )};

export default Register;
