import { createContext, useContext, useState } from "react";
import axios from "axios";

// export const CartContext = createContext({
//     wishlist: [],
//     setShoppingCart: [],
//     deleteFromWishlist: () => {},
//     addProductToCart: () => {},
//     deleteFromShoppingCart: () => {},
// })

export const CartContext = createContext({})

function CartProvider({children}) {

    const [wishlist, setWishlist] = useState([])
    const [shoppingCart, setShoppingCart] = useState([])
    let deleteResponse;

    function deleteFromWishlist(itemId) {
        console.log("item id",itemId)
        axios.delete(`/deleteFromWishlist/${itemId}`, {withCredentials:true})
        .then((response) => {console.log("product is deleted")},
        // window.location.reload()
        )}

    async function addToWishlist(product) {
        const response = await  axios.post('/addToWishlist', {
            "productId": product.productId,
            "title": product.title,
            "price": product.price,
            "size": product.size,
            "image": product.image 
        }, {withCredentials: true})
        console.log(response.data)
    }

    async function addToCart (product) {
        const response = await axios.post('addToCart', {
            "title": product.title, 
            "price": product.price,
            "image": product.image, 
            "size": product.size 
        }, {withCredentials: true})
        console.log(response.data)
    }

    function deleteProductFromCart(itemId) {
        console.log("item id from delete cart",itemId)
        axios.delete(`/deleteProductFromCart/${itemId}`, {withCredentials:true})
        .then((response) => {console.log(deleteResponse)})
        }

    return (
        <CartContext.Provider 
            value={{wishlist, setWishlist, deleteFromWishlist, addToWishlist, 
                shoppingCart, setShoppingCart, addToCart, deleteProductFromCart, deleteResponse}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;