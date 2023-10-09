import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios'
import Layout from './Layout'
import LoginPage from './Components/Routes/LoginPage'
import Register from './Components/Routes/Register'
import AccountPage from './Components/Routes/AccountPage';

// import { UserContextProvider } from './Components/Pieces/UserContext';
import UserContextProvider from './Components/Pieces/UserContext';
import MyListing from './Components/Routes/MyListing';
import WishListPage from './Components/Routes/WishListPage';
import Navbar from './Components/Pieces/Navbar';
import NewListing from './Components/Routes/NewListingPage';
import Profile from './Components/Routes/Profile'
// import IndexPage from './Components/Routes/IndexPage'
// import Navbar from './Components/Pieces/Navbar'


// The main app page, pareant. landing page, idk //

axios.defaults.baseURL = 'http://localhost:4000'
function App() {


    const [currentUser, setCurrentUser] = useState(null)


    return (
        <BrowserRouter>
        <UserContextProvider currentUser={currentUser} setCurrentUser={setCurrentUser}>
            <Navbar></Navbar>
                <Routes >
                    {/* <Route path="/" element={<Layout />} > */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="account" element={<AccountPage />}>
                            <Route path="profile" element={<Profile />} />
                            <Route path="wishlist" element={<WishListPage />} />
                            <Route path="listings" element={<MyListing />} >
                                <Route path="new" element={<NewListing />}/>
                                <Route path=":id" element={<NewListing />}/>
                            </Route>
                        </Route>
                    {/* </Route> */}
                </Routes>
        </UserContextProvider>
        </BrowserRouter>
    )
};


export default App;

// const [products, setProductsList] = useState([])
// const [wishlist, setWishlist] = useState([])
// const [featuredProduct, setFeaturedProduct] = useState([])


//    //check_session 
//    useEffect(() => {
//     fetch('/check_session')
//     .then(response => {
//         if(response.ok) {
//         response.json()
//         .then(user => setCurrentUser(user))
//         }
//     })
//     }, [])

// //create account function
// function createAccount(userInfo) {
//     console.log(userInfo)
//     fetch('/users', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accepts': 'application/json'
//         },
//         body: JSON.stringify(userInfo)
//     })
//         .then(response => response.json())
//         .then(data => setCurrentUser(data))
// };


// function logout() {
//     fetch('/logout', {method: 'DELETE'})
//     .then(response => {if (response.ok) {setCurrentUser(null)}})
//     console.log("logout")
// }  

// //FEATURED PRODUCT 
// function handleFeaturedProduct(clickedProduct) {
//     setFeaturedProduct(clickedProduct)
// }

// //WISHLIST 
// function handleAddToWishlist(productToAdd) {
//     fetch ("/add_to_wishlist", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/JSON",
//         },
//         body: JSON.stringify({"item_id": productToAdd}),
//     })
//     .then(res=>res.json())
//     .then(data=> setWishlist(data));

//     // setWishlist = ([...wishlist, data])
//     console.log(wishlist)

