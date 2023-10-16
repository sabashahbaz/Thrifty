import React, {useState,useEffect, useContext} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import {CartContext} from '../Pieces/CartContext'
import DisplayProduct from '../Pieces/DisplayProduct'


function WishListPage() {

    const {wishlist, setWishlist, deleteFromWishlist} = useContext(CartContext);

    useEffect(() => {
        axios.get('/wishlistProducts',{ withCredentials: true })
        .then(response => {
            setWishlist(response.data)
        })
    }, [])

    function toggleRefresh() {
        window.location.reload()
    }

    return (
        <div className= "flex flex-col items-center justify-center mt-10  ">
            <h1 className = "text-2xl font-bold">My Wishlist</h1>
            <div className="mt-6 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3 ">
                {wishlist.map((wishlistItem) => (
                    <div key={wishlistItem.product.productId} className=" p-6 rounded-2xl cursor-pointer shadow-md shadow-gray-300">
                        <Link to={`/wishlist/${wishlistItem.product.productId}`} >
                        <div className="bg-gray-300 rounded-2xl">
                            <img
                            className="rounded-2xl w-full h-[330px] w-[320px] aspect-square"
                            src={wishlistItem.product.image}
                            alt={wishlistItem.product.title}
                            />
                        </div>
                        </Link>
                    <h2 className="text-md mt-3 leading-4">{wishlistItem.product.title}</h2>
                    <div className="flex mt-1 justify-between">
                        <h3 className="text-md text-red-800">{wishlistItem.product.size}</h3>
                        <h3 className="font-bold text-md">${wishlistItem.product.price}</h3>
                    </div>
                    <div className=" flex items-center justify-center mt-1" 
                        onClick={() => {deleteFromWishlist(wishlistItem.product.productId);
                        toggleRefresh();}}>
                        <button className = " bg-white text-sm rounded-lg p-1 w-30 mt-2 ml-auto hover:bg-red-100">
                        Remove from Wishlist
                        </button> 
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )};

export default WishListPage;

