import React, {useContext, useState} from'react';
import { UserContext } from "../Pieces/UserContext.js"
import { Navigate, useNavigate, Link, useParams, Outlet } from "react-router-dom";
import axios from "axios";
import MyListing from './MyListing.js';


function Account () { 
    const navigate = useNavigate();
    // const {subpage} = useParams();
    const {user, loggedIn, setUser} = useContext(UserContext);
    const [activeLink, setActiveLink] = useState(null);
    const [redirect, setRedirect] = useState(null);

    //doesnt work 
    let { subpage } = useParams();
    let classes = 'p-2 px-6';
    if (subpage === undefined) {
      subpage = 'profile'; // Set the default value
      classes += ' bg-primary rounded-full'; // Add CSS classes when setting the default value
    }

    if (!loggedIn) {
        return <Navigate to="/login" />
    }

    async function logout() {
        try {
          // First, send the logout request
            await axios.post('/logout');

          // Once the request is complete, set the user to null and navigate
            setUser(null);
            navigate('/login');
        } catch (error) {
          // Handle any errors here
            console.error('Logout error:', error);
        }
    }

    console.log("after i logged out",user)

    function handleLinkClick(link) {
        setActiveLink(link);
    }
    
    function getLinkClasses(link) {
        return `inline-flex p-2 px-6 gap-1 ${activeLink === link ? 'bg-primary rounded-full' : ''}`
    }

    // function getLinkClasses(link) {
    //     let classes = `inline-flex p-2 px-6 gap-1`;
    
    //     if (activeLink === link) {
    //         classes += ' bg-primary rounded-full';
    //     } else {
    //         classes += ' bg-red rounded-full';
    //     }
    
    //     return classes;
    // }

    //2:00 to fix the defaul to be on profile
    return (
    <div>
        <nav>
        <div className="w-full flex justify-center mt-8 gap-7 mb-8">
            <Link to="/account" className={getLinkClasses('profile')} onClick={() => handleLinkClick('profile')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
            Profile
            </Link>

            <Link to="/account/wishlist" className={getLinkClasses('wishlist')} onClick={() => handleLinkClick('wishlist')}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            Wishlist</Link>

            <Link
            to="/account/listings"
            className={getLinkClasses('listings')}
            onClick={() => handleLinkClick('listings')}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Closet
            </Link>
        </div>
        </nav>
        <Outlet />
    </div>
    );
}

export default Account;


/* {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
            Logged in as {user.firstName} ({user.email})<br />
            <button onClick={logout} className="bg-primary rounded-full max-w-sm mt-2 w-1/2">Logout</button>
            </div>
        )}
        {subpage === 'listings' && (
            <div>
                <MyListing />
            </div>
        )}
        </div> */ 
