import React, { useState, useContext } from "react";
import logo from "../../Assets/logo.png";
import {Link} from 'react-router-dom';
import { UserContext } from "../Pieces/UserContext.js";
import ProductSearchBar from "./ProductSearchBar";


function Navbar ({ setSearchedProducts}) {

    const {user} = useContext(UserContext);
    console.log("wht is the user from navbar", user)

    return ( 
        <nav>
        <header className=" p-1 flex justify-between items-center "> {/* Added 'items-center' class */}
            <Link to='/'><img src={logo} className="h-24" /></Link>
        
            <ProductSearchBar setSearchedProducts={setSearchedProducts} />
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
            </div>
            <Link to={user ? '/account/profile' :'/login'} className="flex items-center gap-2 border border-gray-300 rounded-full py-1 px-2 w-100 h-9 shadow-md shadow-gray-300">
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

