import axios from 'axios'
import React, {useState, useEffect} from 'react'


function ShoppingCartModal ({onClose}) {

    const [productsInCart, setProductsInCart] = useState([])

    useEffect(() => {
        axios.get('/getProductsFromCart',{ withCredentials: true })
        .then(response => {
            console.log("the response",response.data)
            setProductsInCart(response.data)
        })
    }, [])

    console.log("I am so smart",productsInCart)

   //add total cost of products
    function addTotalCost() {
        let totalCost = 0;
        productsInCart.forEach((product) => (
            totalCost += product.price 
        ));
        return totalCost.toFixed(2); 
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
                    <h2 className = "mb-2">Shopping Cart:</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    
                </div>
            {/* <h2 className = "mb-2">Shopping Cart:</h2> */}
                {productsInCart.map((product)=> (
                    <div key={product._id} className="flex gap-3 py-1 px-3">
                        <div className = " h-[100px] w-[100px]">
                            <img src={product.image} atl={product.title} />
                        </div>
                        <div>
                            <div>{product.title}</div>
                            <div className="flex justify-between">
                                <div>{product.size}</div>
                                <div className = "mr-3">${product.price}.00</div>
                            </div>
                        </div>
                    </div>
                ))}
                <div className = "flex in-line justify-between mr-3">
                    <p className = "mt-1 ml-3 ">Total Price:${addTotalCost()}</p>
                    <button className = " bg-emerald-200 p-1 px-5 mb-2 rounded-xl shadow hover:shadow-xl hover:bg-emerald-400">
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}

export default ShoppingCartModal;