import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import AddToWishlist from "./AddToWishlist.js";
import AddToCart from "./AddToCart";
// selected product will be displayed 

function DisplayProduct () {
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(product?.coverImage)

    const {id} = useParams();

    useEffect(() => {
        if (!id) {return;}
        axios.get(`/searchProductsByID/${id}`)
            .then((response) => {
            setProduct(response.data.data);
            console.log("did it work",response.data)
        })
        .catch((error) => {
            console.error('Error fetching product details:', error);
        });
    }, [id]);

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
                        <h1 className="text-3xl ml-2">{product.title}</h1>
                        <div className = "mt-4 ml-5">
                            <a className="my-2 block font-semibold underline text-4xl text-red-80 mb-5"
                                target="_blank"
                                href={`https://www.google.com/search?q=${encodeURIComponent(product.brand)}`}>
                                {product.brand}</a>
                            <h2 className="text-2xl mt-7">${product.price.val}0</h2>
                            <h2 className="mt-5 text-2xl"> Size: {product.size}</h2>
                            <AddToWishlist productId={id} title={product.title} image = { product.coverImage} price={product.price.val} size={product.size}/>
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
                            <h2 className= "font-semibold text-xl mt-4">Description</h2>
                            <p className="text-md leading-1 mt-2">{product.description}</p>
                        </div>
                        < AddToCart id={product.id} title={product.title} image={product.coverImage} price= {product.price.val} size={product.size}  />
                    </div>
                </div>
            </div> 
                : <div className="flex justify-center items-center h-screen">
                    <img src ="https://www.onwebchat.com/img/spinner.gif" className="w-32 h-32 mb-8" />
                </div>
                }
            </div>
        </div>
    )
}

export default DisplayProduct;


