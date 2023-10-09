import React, { useState, useContext } from "react";
import logo from "../../Assets/logo.png";
import {Link} from 'react-router-dom';
import { UserContext } from "../Pieces/UserContext.js";
import ProductSearchBar from "./ProductSearchBar";
import UserDetails from './UserDetails';

function Navbar ({ setProductsList, currentUser, logout }) {

    const {user} = useContext(UserContext);
    console.log("wht is the user from navbar", user)
    return ( 
        <nav>
        <header className=" p-1 flex justify-between items-center "> {/* Added 'items-center' class */}
            <Link to='/'><img src={logo} className="h-24" /></Link>
        
                <form className="flex border border-gray-300 rounded-full py-1 px-7 w-1/2 h-8 shadow-md shadow-gray-300 mr-20 ">
                <input
                    className = "search-bar focus:outline-none flex-grow "
                    type="text"
                    placeholder="search products" 
                    // onChange={handleChange}
                    // value={newSearch}           
                />
                <button className="bg-primary p-1 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
                </form>
            <Link to={user ? '/account' :'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-2 w-100 h-9 shadow-md shadow-gray-300">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className="bg-primary text-black rounded-full border border-gray-100 overflow-hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                    </svg>
                </div>
                {user ?  (
                    <div>
                        {user.firstName}
                    </div>
                ): null}
    
            </Link>
        </header>
    </nav>
    )
}

export default Navbar;

// const NavContainer = styled.nav `
//     /* justify-content: space-between;
//     align-items: center;
//     height: 80px; */

//     background-color: ;
//     color: white;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     height: 80px;
//     padding: 0 20px;

//     .nav-center {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//     }


//     .logo {
//         display: flex; 
//         margin-top: 0px; 
//         height: 80px;
//         width: 270px;
//     }
//     .nav-links {
//         letter-spacing: 2px;
//         padding: 10px; 
//         align-items: center;
//         justify-content: center;
//         display: flex;
//         margin-top: 0px; 
//     }
//     .nav-link{
//         letter-spacing: 2px;
//         padding: 10px;
//         align-items: center;
//         justify-content: center;  
//     }

