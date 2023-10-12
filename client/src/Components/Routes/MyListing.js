import React, {useEffect, useState} from "react";
import {Link,Outlet, useLocation} from 'react-router-dom';
import axios from "axios";


function MyListing(){
    const [listings, setListings] = useState([])

    //to display all of the saved listings
    useEffect(() => {
        axios.get('/userListings', {withCredentials: true})
        .then(({data}) => {
            console.log(data)
            setListings(data)
            
        })
    }, [])

    //delete item from listing 
    function deleteFromListing(itemId) {
        console.log("item id",itemId)
        axios.delete(`/deleteListing/${itemId}`, {withCredentials:true})
        .then((response) => {console.log("product is deleted")},
        window.location.reload()
        )}
    
    return(
        <div className="mt-5">
            <div className = "w-full flex items-center justify-center">
            <Link className="inline-flex bg-blue-200 text-black py-2 px-6 rounded-full cursor-pointer hover:bg-blue-400" to='new'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Add new listing
            </Link>
            </div>
            <div className="mt-6 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3 ">
                {listings.map((listing, index) => (
                    <div key={index} className=" p-6 rounded-2xl cursor-pointer shadow-md shadow-gray-200">
                        <div className="bg-gray-300 mb-2 rounded-2xl">
                            <img
                            className="rounded-2xl w-full h-[330px] w-[320px] aspect-square"
                            src={`http://localhost:4000/uploads/${listing.images[0]}`}
                            alt={listing.title}
                            />
                        </div>
                    <h2 className="text-md mt-3 leading-4">{listing.title}</h2>
                    <div className="flex mt-1 justify-between">
                        <h3 className="text-md text-red-800">{listing.size}</h3>
                        <h3 className="font-bold text-md">${listing.price}</h3>
                    </div>
                    <div className=" flex items-center justify-center mt-1">
                        <Link to={'/listings/'+ listing._id}>
                            <button className= " bg-blue-100 rounded-lg p-1 w-40 mt-2 hover:bg-blue-400">edit listing</button>
                        </Link>
                        <button className = "bg-red-100 rounded-lg p-1 w-30 mt-2 ml-20 hover:bg-red-400" onClick={()=> deleteFromListing(listing._id)}>
                            delete
                        </button>
                    </div>
                    </div>
                ))}
            </div>
        </div> 
    )
};

export default MyListing;