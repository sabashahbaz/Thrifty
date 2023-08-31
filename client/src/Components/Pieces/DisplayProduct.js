import React, {useState, useEffect} from "react";
import {Link} from 'react-router-dom';

// this is the individal card that the product will be displayed in 

export default function DisplayProducts ({key, product, image, name, brand, description, handleAddToWishlist, handleFeaturedProduct}) {

    function handleClick (e) {
        handleAddToWishlist(product)
    }

    function handleClickedProduct (e) {
        handleFeaturedProduct(product)
        
    }

    return (
        <div>
            <li className="product-card">
                <p>{name}</p>
                <p>{brand}</p>
                <p>{description}</p>
                <div className="image">
                <Link to='/featuredproduct'> 
                        <img 
                        onClick={(e) => handleClickedProduct(e)} // when you click on the image, it will take you to '/featuredproduct' => will only display the product you clicked 
                        src={image} alt={name} />
                    </Link> */
                </div>
                <div className="details">
                    {/* <p>{product.price}</p> */}
                    {/* <p>{product.brand}</p> */}
                    {/* <span>{product.description}</span> */}
                    <button onClick={(e) => handleClick(e)}>Add to wishlist</button> 
                </div> 
            </li>
        </div>
    )
}