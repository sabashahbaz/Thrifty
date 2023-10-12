import React, { useState, useContext } from "react";
import { UserContext } from "../Pieces/UserContext.js";
import axios from 'axios'
import { Navigate, useNavigate } from "react-router-dom";

function Profile () {
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate()

    async function logout() {
        try {
            await axios.delete('/logout', { withCredentials: true });
            // setUser(null);
            window.location.reload()
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    }
    return (
        <div>
            <button onClick={logout} className="bg-primary p-2 rounded-2xl text-black"> Logout</button>
        </div>
    )

}

export default Profile;