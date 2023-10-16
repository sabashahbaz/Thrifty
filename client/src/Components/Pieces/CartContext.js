import { createContext, useState } from "react";
import axios from "axios";

//utilizing create Context to allow for versitile use of functions and state variables//
export const CartContext = createContext({})

function CartProvider({children}) {

    const [wishlist, setWishlist] = useState([])
    const [shoppingCart, setShoppingCart] = useState([])
    let deleteResponse;

    //user can delele an item from their wishlist 
    function deleteFromWishlist(itemId) {
        axios.delete(`/deleteFromWishlist/${itemId}`, {withCredentials:true})
        .then((response) => {console.log("product is deleted")},
        // window.location.reload()
        )};

    //user can add a product to their wishlist 
    async function addToWishlist(product) {
        const response = await  axios.post('/addToWishlist', {
            "productId": product.productId,
            "title": product.title,
            "price": product.price,
            "size": product.size,
            "image": product.image 
        }, {withCredentials: true})
    };

    //user can add product to thier cart 
    async function addToCart (product) {
        const response = await axios.post('addToCart', {
            "title": product.title, 
            "price": product.price,
            "image": product.image, 
            "size": product.size 
        }, {withCredentials: true})
    }

    //user can delete product from their cart 
    function deleteProductFromCart(itemId) {
        axios.delete(`/deleteProductFromCart/${itemId}`, {withCredentials:true})
        .then((response) => {console.log(deleteResponse)})
        }

    //return all of the childern of this component, for easy user 
    return (
        <CartContext.Provider 
            value={{wishlist, setWishlist, deleteFromWishlist, addToWishlist, 
                shoppingCart, setShoppingCart, addToCart, deleteProductFromCart, deleteResponse}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider;