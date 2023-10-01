import React, { useState } from "react";
import { Link } from 'react-router-dom'


function Register() {

    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("")

    // const handleChangeUsername = e => setUsername(e.target.value)
    // const handleChangePassword = e => setPassword(e.target.value)


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className = "mb-32">
                <h1 className="text-4xl text-center mb-4">Register</h1>
                <form className="max-w-md mx-auto">
                    <div className="flex">
                        <input className= "w-full border my-1 mr-1 py-2 px-3 rounded-2xl" type="first name" placeholder="first name" />
                        <input className= "w-full border my-1 ml-1 py-2 px-3 rounded-2xl" type="last name" placeholder="last name" />
                    </div>
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" type="email" placeholder="your@email.com" />
                    <input className= "w-full border my-1 py-2 px-3 rounded-2xl" type="password" placeholder = "password" />
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



// function handleSubmit(e) {
//     e.preventDefault();
//     createAccount({ "username": username, "password": password });
//     setIsAccountCreated(true)
//     createAccountAlert()
// }

// function createAccountAlert(e) {
//     if (isAccountCreated) {
//         alert("Account was created successfully!")
//     } else {
//         alert("Please try again ")
//     }
// }