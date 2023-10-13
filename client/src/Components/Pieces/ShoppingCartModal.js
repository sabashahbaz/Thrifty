import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from './CartContext';


function ShoppingCartModal ({onClose}) {

    const [productsInCart, setProductsInCart] = useState([])
    const {shoppingCart, setShoppingCart, deleteResponse } = useContext(CartContext);

    useEffect(() => {
        axios.get('/getProductsFromCart',{ withCredentials: true })
        .then(response => {
            console.log("the response",response.data)
            setShoppingCart(response.data)
        })
    }, [])

   //add total cost of products
    function addTotalCost() {
        let totalCost = 0;
        shoppingCart.forEach((product) => (
            totalCost += product.price 
        ));
        return totalCost.toFixed(2); 
    }

    // function refreshPage() {
    //     if (deleteResponse) {
    //         console.log("hehhehehehe")
    //         axios.get('/getProductsFromCart', { withCredentials: true })
    //             .then((response) => {
    //                 console.log("from refreshpage", response.data);
    //                 setShoppingCart(response.data);
    //             });
    //     }
    // }


    // function deleteProductFromCart(itemId) {
    //     let deleteResponse;
    //     console.log("item id from delete cart",itemId)
    //     axios.delete(`/deleteProductFromCart/${itemId}`, {withCredentials:true})
    //     .then((response) => {
    //         deleteResponse= response
    //         console.log(deleteResponse)})
    //         if (deleteResponse) {
    //             console.log("hehhehehehe")
    //             axios.get('/getProductsFromCart', { withCredentials: true })
    //                 .then((response) => {
    //                 console.log("from refreshpage", response.data);
    //                 setShoppingCart(response.data);
    //                 });
    //         }
    //     }


    async function deleteProductFromCart(itemId) {
        try {
            console.log("item id from delete cart", itemId);
            const response = await axios.delete(`/deleteProductFromCart/${itemId}`, { withCredentials: true });
            console.log("Delete response:", response);
    
            if (response.status === 200) {
                // The item was successfully deleted, so refresh the shopping cart
                const refreshResponse = await axios.get('/getProductsFromCart', { withCredentials: true });
                console.log("Refresh response:", refreshResponse);
    
                if (refreshResponse.status === 200) {
                    // Update the shopping cart
                    setShoppingCart(refreshResponse.data);
                }
            }
        } catch (error) {
            console.error("Error deleting item from cart:", error);
        }
    }
   

    return (
        <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
        <div className="w-[600px] flex flex-col">
            {/* <div className="text-black text-xl place-self-end cursor-pointer" onClick={() => onClose()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div> */}
            <div className="bg-white p-2 rounded-xl ">
                <div className="text-black text-xl  cursor-pointer flex justify-between" onClick={() => onClose()}>
                    <h2 className = "mb-2 ml-2">Shopping Cart:</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    
                </div>
            <div className="max-h-[400px] overflow-y-auto">
                {shoppingCart.map((product)=> (
                    <div>
                        <hr class="h-px my-1 bg-gray-200 border-1 light:bg-gray-200"></hr>
                    <div key={product._id} className="flex gap-3 py-1 px-3">
                        <div className = " h-[100px] w-[100px]">
                            <img src={product.image} atl={product.title} />
                        </div>
                        <div>
                            <div>{product.title}</div>
                            <div className="flex justify-between">
                                <div className="flex gap-1">
                                    <div>Size:</div>
                                    <div className='text-md text-red-800'> {product.size}</div>
                                </div>
                                <div className = "mr-3">${product.price}.00</div>
                            </div>
                            <div onClick={()=>{deleteProductFromCart(product._id)}}>
                            {/* <div onClick={()=>deleteProductFromCart(product._id)}> */}
                                <button className = "bg-red-100 px-1 text-sm text-gray-500 rounded-lg ">
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
                <div className = "flex in-line justify-between mr-3 mt-3">
                    <button className = "bg-emerald-200 p-1 px-5 mb-2 ml-2 rounded-xl shadow hover:shadow-xl hover:bg-emerald-400">
                        Place Order
                    </button>
                    <p className = "mt-1 ml-3 font-bold text-xl">Total Price: ${addTotalCost()}</p>
                </div>
                
            </div>
        </div>
    </div>
    )
}

export default ShoppingCartModal;