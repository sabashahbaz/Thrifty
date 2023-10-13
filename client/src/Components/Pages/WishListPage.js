import React, {useState,useEffect, useContext} from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
// import {UserContext }from "../Pieces/UserContext";

function WishListPage({deleteFromWishlist}) {

    const [wishlistProducts, setWishlistProducts] = useState([])
    // const {user} = useContext(UserContext);


    useEffect(() => {
        axios.get('/wishlistProducts',{ withCredentials: true })
        .then(response => {
            console.log("the response",response.data)
            setWishlistProducts(response.data)
        })
    }, [])

    function deleteFromWishlist(itemId) {
        console.log("item id",itemId)
        axios.delete(`/deleteFromWishlist/${itemId}`, {withCredentials:true})
        .then((response) => {console.log("product is deleted")},
        window.location.reload()
        )}
        
    return (
        <div className= "flex flex-col items-center justify-center mt-10 ">
            <h1 className = "text-2xl font-bold">My Wishlist</h1>
            <div className="mt-6 grid grid-cols-1sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3 ">
                {wishlistProducts.map((wishlistItem) => (
                    <div key={wishlistItem.product.productId} className=" p-6 rounded-2xl cursor-pointer shadow-md shadow-gray-200">
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
                    <div className=" flex items-center justify-center mt-1">
                        <button className = " bg-white text-sm rounded-lg p-1 w-30 mt-2 ml-auto hover:bg-red-100" onClick={()=> deleteFromWishlist(wishlistItem.product.productId)}>
                        Remove from Wishlist
                        </button>
                    </div>
                    </div>
                ))}
            </div>
        </div>
    )};

export default WishListPage;

