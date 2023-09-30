import React, { useState } from "react";
import { Link } from 'react-router-dom'


export default function LoginPage({ attemptLogin, setCurrentUser}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleChangeUsername = e => setUsername(e.target.value)
    const handleChangePassword = e => setPassword(e.target.value)


     // let history = useHistory();
      async  function handleSubmit (e) {
        e.preventDefault();
        let currentUserResponse;
        await fetch('/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
            },
            body: JSON.stringify({"username": username, "password": password })
        })
        .then(response => response.json())
        .then(data => {
            currentUserResponse = data;
            setCurrentUser(data);
        });
        // if (!currentUserResponse.error) history.push('/')

    }


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className = "mb-32">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto">
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" type="email" placeholder="you@email.com" />
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" type="password" placeholder = "password" />
                    <button className="bg-primary p-2 w-full rounded-2xl text-black"> Login</button>
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