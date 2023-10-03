import React, { useState, useContext } from "react";
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from "../Pieces/UserContext.js";

export default function LoginPage({ attemptLogin, setCurrentUser}) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const {setUser} = useContext(UserContext)

    const handleChangeEmail = e => setEmail(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)

    async function handleLogin (e) {
        e.preventDefault()
        try {
        const response =  await axios.post('/login',{
                email, password}, {withCredentials: true});
                setUser(response.data)
                console.log(response.data)
                if (response.status === 200) {
                    alert('Login successful');
                    setRedirect(true)
                } else {
                    alert('Login failed');
                }
        } catch (e) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to="/"/>
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className = "mb-32">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLogin}>
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" 
                            type="email" 
                            placeholder="your@email.com" 
                            value={email}
                            onChange={handleChangeEmail}
                            />
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" 
                            type="password" 
                            placeholder = "password"
                            value={password}
                            onChange={handleChangePassword} 
                            />
                    <button className="bg-primary p-2 w-full rounded-2xl text-black"> Login</button>
                    <div className="text-center py-2 text-gray-500">
                        Don't have an account yet? <Link className="underline text" to={'/register'}> Register now</Link>
                        </div>
                </form>


            </div>
        </div>
    )
};



// <form className="form-container" onSubmit={handleSubmit}>
// <h1>Login to your account</h1>
// <div className="form-group">
//     <h2>Username</h2>
//     <input
//         className="input-field"
//         type="text"
//         onChange={handleChangeUsername}
//         placeholder="Enter your username"
//         value={username}
//     />
//     <input type="email" placeholder="you@email.com" />
// </div>
// <div className="form-group">
//     <h2>Password</h2>
//     <input
//         className="input-field"
//         type="password"
//         onChange={handleChangePassword}
//         placeholder="Enter your password"
//         value={password}
//     />
// </div>
// <input className="submit-button" type="submit" value="Sign in" />
// </form>


    //  // let history = useHistory();
    //   async  function handleSubmit (e) {
    //     e.preventDefault();
    //     let currentUserResponse;
    //     await fetch('/login', {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json',
    //         'Accepts': 'application/json'
    //         },
    //         body: JSON.stringify({"username": username, "password": password })
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         currentUserResponse = data;
    //         setCurrentUser(data);
    //     });
    //     // if (!currentUserResponse.error) history.push('/')

    // }