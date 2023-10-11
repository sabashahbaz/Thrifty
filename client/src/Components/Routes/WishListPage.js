import React, {useState,useEffect, useContext} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import {UserContext }from "../Pieces/UserContext";

function WishListPage() {

    const [wishlistProducts, setWishlistProducts] = useState([])
    const {user} = useContext(UserContext);


    useEffect(() => {
        axios.get('/wishlistProducts',{ withCredentials: true })
        .then(response => {
            // console.log("the response",response.data.produc)
            setWishlistProducts(response.data)
        })
    }, [])

    return (
        <div className = " py-4 px-8 mt-8 grid gap-x-12 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlistProducts.map((wishlistItem) => (
                <Link to={'/product/' + wishlistItem.product.id} >
                <div key={wishlistItem.product.id}>
                    <div className="bg-gray-300 mb-2 rounded-2xl flex">
                        <img className = "rounded-2xl object-cover aspect-square" src={wishlistItem.product.image} alt={wishlistItem.product.title} />
                        <div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </div>
                    </div>
                    <h2 className= "text-md mt-3 leading-4">{wishlistItem.product.title}</h2>
                    <div className="flex mt-1 justify-between">
                        <h3 className = "text-md text-red-800"> {wishlistItem.product.size}</h3>
                        <h3 className = "font-bold text-md"> ${wishlistItem.product.price.val}0</h3>
                    </div>

                    
                </div>
                </Link>
            ))}
        </div>
    )
}

export default WishListPage;