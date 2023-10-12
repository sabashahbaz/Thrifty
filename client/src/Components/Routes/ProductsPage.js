import React, {useState, useEffect} from "react";
import {Link, useOutletContext} from 'react-router-dom';
import DisplayProduct from '../Pieces/DisplayProduct'
// import loadingGif from '../assets/loadinggif.gif';


// Displays all of the products that are searched //
function ProductsPage({searchedProducts}){

    console.log("searched products",searchedProducts)
    return (
        <div className = " py-4 px-8 mt-8 grid gap-x-12 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchedProducts.map(product => (
                <Link to={'/product/' + product.id} >
                <div key={product.id}>
                    <div className="bg-gray-300 mb-2 rounded-2xl flex bg-gray-300">
                        <img className = "rounded-2xl object-cover aspect-square" src={product.coverImage} alt={product.title} />
                    </div>
                    <h2 className= "text-md mt-3 leading-4">{product.title}</h2>
                    <div className="flex mt-1 justify-between">
                        <h3 className = "text-md text-red-800"> {product.size}</h3>
                        <h3 className = "font-bold text-md"> ${product.price.val}0</h3>
                    </div>
                </div>
                </Link>
            ))}
        </div>

            )

}

export default ProductsPage;

