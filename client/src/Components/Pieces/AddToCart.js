import axios from 'axios';
import React, {useState,} from 'react'

function AddToCart({title, price, size, image}) {

    const [addedToCart, setAddedToCart] = useState(false)

    async function addToCart () {
        const response = await axios.post('addToCart', {
            title, price, image, size 
        }, {withCredentials: true})
        console.log(response.data)
        const cartId = response.data._id
        if (cartId)
            return setAddedToCart (!addedToCart)
    }

    return(
        <div>
        <div className="inline-flex mt-5">
            <div className="cursor-pointer in-line flex gap-1" onClick={()=>addToCart({title, image, price, size, image}) }>
            {addedToCart ? (
                <div className= "ml-4 flex gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                    <p>Added to Cart</p>
                </div>
            ) : (
                <div className= "text-xl mt-4">
                            <button className= "bg-blue-200 rounded-xl p-1 w-40 ml-4">Add to cart</button>
                        </div>
            )}
            </div>
        </div>
        </div>
    );
}

export default AddToCart;