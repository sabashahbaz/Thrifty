import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

// selected product will be displayed 

function DisplayProduct ({ }) {
    const [product, setProduct] = useState(null)

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

    return (
        <div className="mt-2  ml-5 bg-gray-100 -mx-8 px-8 py-4">
            <div>
                { product 
                ?  <div>
                        <div>
                            <div>
                                <h1 className = "text-3xl">{product.title}</h1>
                                <a className =" my-2 block font-semibold underline" target="_blank" href={`https://www.google.com/search?q=${encodeURIComponent(product.brand)}`}>{product.brand}</a>
                            </div>
                            <div className = "w-1/2">
                            <div className="grid grid-cols-[.5fr_2fr] mt-10">
                                <div className="h-[600px] w-[150px] overflow-y-auto p-0">
                                    {product.images.map((image) => (
                                        <img src={image} className="m-0"/>
                                    ))}
                                </div>
                                <img src={product.coverImage} className="m-0 h-[600px] w-[600px]"/>
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