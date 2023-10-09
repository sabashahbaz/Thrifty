import React, { useState, useContext } from "react";
import { UserContext } from "../Pieces/UserContext.js";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

function Profile () {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    async function logout() {
        try {
            await axios.post('/logout');
            setUser(null);
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    return (
        <button onClick={logout} className="bg-primary p-2 w-1/2 rounded-2xl text-black"> Logout</button>
    )

}

export default Profile;