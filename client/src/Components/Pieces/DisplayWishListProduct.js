import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from 'react-router-dom';
import {CartContext} from './CartContext';
import axios from "axios";
import AddToWishlist from "./AddToWishlist";
import AddToCart from "./AddToCart";
import RemoveFromWishlist from "./RemoveFromWishlist";

// selected product will be displayed 

function DisplayWishListPage ({addToCart, addedToCart }) {
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(product?.coverImage)

    const {id} = useParams();
    console.log("id",id)

    useEffect(() => {
        console.log("hiiiii")
        if (!id) {return;}
        console.log("byeeee")
        axios.get(`/searchWishlistByID/${id}`)
            .then((response) => {
            setProduct(response.data.data);
            console.log("use effect from displayws product",response.data)
        })
        .catch((error) => {
            console.error('Error fetching product details:', error);
        });
    }, []);

    // console.log("blah", product.id)

    function handleSelectedImage(image) {
        setSelectedImage(image);
    }
    return (
        <div className="mt-2  ml-5 -mx-8 px-8 py-4 ">
            <div>
                { product 
                ?  <div className="mt-5">
                <div className="grid grid-cols-2 gap-2">
                    <div className="grid grid-cols-[.5fr_2fr] ">
                    <div className="h-[600px] overflow-y-auto cursor-pointer">
                        {product.images.map(image => (
                            <img onClick={()=> handleSelectedImage(image)}src={image} className="py-1 h-[120px] w-[120px]" />
                        ))}
                        {/* <img onClick={()=> handleSelectedImage(image)} src={product.coverImage} className="py-1 h-[120px] w-[120px]"/> */}
                    </div>
                    <img src={ selectedImage||product.coverImage} className="m-0 h-[600px] w-[600px] object-cover aspect square"/>

                    </div>
                
                    <div className="flex flex-col ml-3">
                        <h1 className="text-3xl ml-4">{product.title}</h1>
                        <div className = "mt-4 ml-5">
                            <a className="my-2 block font-semibold underline text-4xl text-red-80 mb-5"
                                target="_blank"
                                href={`https://www.google.com/search?q=${encodeURIComponent(product.brand)}`}>
                                {product.brand}</a>
                            <h2 className="text-2xl mt-7">${product.price.val}0</h2>
                            <h2 className="mt-5 text-2xl"> Size: {product.size}</h2>
                            {/* <AddToWishlist productId={id} title={product.title} price={product.price.val} size={product.size} coverImage={product.coverImage}/> */}
                            <div className= " mt-4 flex inline gap-10">
                                <div>
                                    <h2 className = "font-semibold ">Category</h2>
                                    <p>{product.category.category}</p>
                                </div>
                                <div>
                                    <h2 className = "font-semibold ">Colors</h2>
                                    {product.colors.map(color => (
                                        <div>{color.name}</div>
                                    ))}
                                </div>
                            </div>
                            <RemoveFromWishlist product={product}/>
                            <h2 className= "font-semibold text-xl mt-4">Description</h2>
                            <p className="text-md leading-1 mt-2">{product.description}</p>
                        </div>
                        {/* <div className= "text-xl mt-4" onClick={()=>addToCart({title, image, price, size, image})}>
                            <button className= "bg-blue-200 rounded-xl p-1 w-40 ml-4" >Add to cart</button>
                        </div> */}
                        <AddToCart addedToCart={addedToCart} addToCart={ addToCart} title={product.title} image={product.coverImage} price= {product.price.val} size={product.size}/>
                    </div>
                </div>
            </div>
                : 
                <div className="flex justify-center items-center h-screen">
                <img src ="https://www.onwebchat.com/img/spinner.gif" className="w-32 h-32 mb-8" />
                </div>
                }
                
            </div>
        </div>
    )
}

export default DisplayWishListPage;
