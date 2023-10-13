import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import React, {useState } from "react";
import axios from 'axios'
import Layout from './Layout'
import LoginPage from './Components/Pages/LoginPage'
import Register from './Components/Pages/Register'
import UserContextProvider from './Components/Pieces/UserContext';
import MyListing from './Components/Pages/MyListing';
import WishListPage from './Components/Pages/WishListPage';
import Navbar from './Components/Pieces/Navbar';
import NewListingPage from './Components/Pages/NewListingPage';
import Profile from './Components/Pages/Profile'
import ProductsPage from './Components/Pages/ProductsPage';
import DisplayProduct from './Components/Pieces/DisplayProduct';
import DisplayWishListPage from './Components/Pieces/DisplayWishListPage';
import Cancel from './Components/Pages/Cancel'
import Success from './Components/Pages/Success'
// import IndexPage from './Components/Routes/IndexPage'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [searchedProducts, setSearchedProducts] = useState([])
    
    

    // function deleteFromWishlist(itemId) {
    //     console.log("from delete withlsit function ",itemId)
    //     axios.delete(`/deleteFromWishlist/${itemId}`, {withCredentials:true})
    //     .then((response) => {console.log("product is deleted")},
    //     window.location.reload()
    //     )}


    return (
        <BrowserRouter>
        <UserContextProvider currentUser={currentUser} setCurrentUser={setCurrentUser}>
            <Navbar setSearchedProducts={setSearchedProducts} />
                <Routes >
                    {/* <Route path="/" element={<Layout />} > */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products" element={<ProductsPage searchedProducts={searchedProducts} />}/>
                        <Route path="profile" element={<Profile />} />
                        <Route path="wishlist" element={<WishListPage />}/>
                        <Route path="/wishlist/:id" element={<DisplayWishListPage  />}/>
                        <Route path="listings" element={<MyListing />} />
                        <Route path="listings/new" element={<NewListingPage />}/>
                        <Route path="listings/:id" element={<NewListingPage  />}/>
                        <Route path="/product/:id" element={<DisplayProduct/>}/> 
                        <Route path="/shoppingCart"/>
                        <Route path="success" element={<Success/>} />
                        <Route path="cancel" element={<Cancel/>} />
                </Routes>
        </UserContextProvider>
        </BrowserRouter>
    )
};


export default App;
