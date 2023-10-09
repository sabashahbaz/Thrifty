import React, {useEffect, useState} from "react";
import {Link,Outlet, useLocation} from 'react-router-dom';
import axios from "axios";

function MyListing(){

    const location = useLocation();
    const [listings, setListings] = useState([])

    // Define the path where you want to show the link
    const showLinkPath = '/account/listings';

    //to display all of the saved listings
    useEffect(() => {
        axios.get('/listings', {withCredentials: true})
        .then(({data}) => {
            setListings(data)
        })
    }, [])

    console.log("from use effect",listings)

    //image er
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
        <div className ="mt-4 p-4"> 
            {listings.map(listing => (
                <Link to={'/account/listings/' +listing._id} className="flex cursor-pointer mb-3 items-start gap-4 bg-gray-100 p-4 rounded-2xl">
                <div className="w-32 h-32 bg-gray-300">
                    <img src={'http://localhost:4000/uploads/' + listing.images[0]} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow">
                    <h2 className="text-xl">{listing.title}</h2>
                    <p className="text-sm mt-2">{listing.description}</p>
                </div>
            </Link>
            ))}
        </div>

    

    </div>
        
);
}

export default MyListing;