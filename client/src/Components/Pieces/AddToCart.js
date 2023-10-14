import axios from 'axios';
import React, {useState, useContext} from 'react'
import {CartContext} from './CartContext';

function AddToCart({id, title, price, size, image}) {
    console.log("meow",id)

    const {shoppingCart, setShoppingCart, addToCart, deleteProductFromCart } = useContext(CartContext);
    const [addedToCart, setAddedToCart] = useState(false)

    return(
        <div>
        <div className="inline-flex mt-5">
            <div className="cursor-pointer in-line flex gap-1">
            {addedToCart ? ( 
                <div className= " flex gap-1 text-xl mt-4">
                    <button className= "bg-emerald-300 rounded-xl p-1 w-40">Added to Cart</button>
                </div>
            ) : (
                <div className= "text-xl mt-4" onClick={()=>{addToCart({title, image, price, size, image}); setAddedToCart(true)}}>
                            <button className= "bg-blue-200 rounded-xl p-1 w-40">Add to cart</button>
                        </div>
            )}
            </div>
        </div>
        </div>
    );
}

export default AddToCart;