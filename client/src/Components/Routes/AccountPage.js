import React, {useContext, useState} from'react';
import { UserContext } from "../Pieces/UserContext.js"
import { Navigate, Link, useParams } from "react-router-dom";



function Account () {
    
    // const {subpage} = useParams();
    const {user, loggedIn} = useContext(UserContext);
    const [activeLink, setActiveLink] = useState(null);

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



    function handleLinkClick(link) {
        setActiveLink(link);
    }
    
    function getLinkClasses(link) {
        return `p-2 px-6 ${activeLink === link ? 'bg-primary rounded-full' : ''}`;
    }


    //2:00 to fix the defaul to be on profile
    return (
        <div>
             <nav>
        <div className="w-full flex justify-center mt-8 gap-7 mb-8">
            <Link
                to="/account"
                className={getLinkClasses('profile')}
                onClick={() => handleLinkClick('profile')}
            >
            Profile
            </Link>
            <Link
                to="/account/wishlist"
                className={getLinkClasses('wishlist')}
                onClick={() => handleLinkClick('wishlist')}
            >
            Wishlist
            </Link>
            <Link
                to="/account/listings"
                className={getLinkClasses('listings')}
                onClick={() => handleLinkClick('listings')}
            >
            Listings
            </Link>
        </div>
        </nav>
        {subpage === 'profile' && (
            <div className="text-center max-w-lg mx-auto">
            Logged in as {user.firstName} ({user.email})<br />
            <button className="bg-primary rounded-full max-w-sm mt-2 w-1/2">Logout</button>
            </div>
        )}
        </div>
    );
    }

export default Account;