import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

// selected product will be displayed 

function DisplayProduct ({ }) {
    const [product, setProduct] = useState(null)
    const [selectedImage, setSelectedImage] = useState(product?.coverImage)

    const {id} = useParams();

    useEffect(() => {
        if (!id) {
            return;
        }
        console.log("what is happening")
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
        <div className="mt-2  ml-5 bg-gray-100 -mx-8 px-8 py-4 ">
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
                        <h1 className="text-3xl">{product.title}</h1>
                        <div className = "mt-7 ml-5">
                            <a className="my-2 block font-semibold underline text-4xl text-red-80 mb-5"
                                target="_blank"
                                href={`https://www.google.com/search?q=${encodeURIComponent(product.brand)}`}>
                                {product.brand}</a>
                            <h2 className="text-2xl mt-7">${product.price.val}0</h2>
                            <h2 className="mt-5 text-2xl"> Size: {product.size}</h2>
                            <div className = "inline-flex mt-5">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                </svg> 
                                <p>Add to Wishlist</p>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                </svg>
                            </div>
                            <div>
                                <h2>Category</h2>
                                <p>{product.category.category}</p>
                                <h2>Colors</h2>
                                {product.colors.map(color => (
                                    <div>{color.name}</div>
                                ))}
                            </div>
                            <h2 className= "font-semibold text-xl">Description</h2>
                            <p className="text-md leading-1">{product.description}</p>
                            
                        
                        </div>

                    </div>
                </div>
            </div>

                    
                : <div>
                    <img src ="https://i.pinimg.com/originals/df/d2/68/dfd2683c9701642c776e31d3b0d603a9.gif" />
                </div>
                }
                
            </div>
        </div>
    )
}

export default DisplayProduct;


{/* <img src={product.coverImage} className="m-0 h-[600px] w-[600px] object-cover aspect square"/> */}