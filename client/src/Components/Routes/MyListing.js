import React from "react";
import {Link,Outlet, useLocation} from 'react-router-dom';
 

function MyListing(){

    const location = useLocation();

    // Define the path where you want to show the link
    const showLinkPath = '/account/listings';

    return(
        <div>
        <div className="flex justify-center items-center">
        <Outlet />
        {location.pathname === showLinkPath && (
            <Link className="inline-flex bg-primary text-black py-2 px-6 rounded-full" to='/account/listings/new'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new listing
            </Link>
        )}
    </div>


        </div>
        
);
}

export default MyListing;