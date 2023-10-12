import {BrowserRouter, Routes, Route, Outlet, Navigate} from 'react-router-dom';
import React, {useState } from "react";
import axios from 'axios'
import Layout from './Layout'
import LoginPage from './Components/Routes/LoginPage'
import Register from './Components/Routes/Register'
import UserContextProvider from './Components/Pieces/UserContext';
import MyListing from './Components/Routes/MyListing';
import WishListPage from './Components/Routes/WishListPage';
import Navbar from './Components/Pieces/Navbar';
import NewListingPage from './Components/Routes/NewListingPage';
import Profile from './Components/Routes/Profile'
import ProductsPage from './Components/Routes/ProductsPage';
import DisplayProduct from './Components/Pieces/DisplayProduct';
import DisplayWishListPage from './Components/Pieces/DisplayWishListPage';
// import IndexPage from './Components/Routes/IndexPage'

axios.defaults.baseURL = 'http://localhost:4000'

function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [searchedProducts, setSearchedProducts] = useState([])


    return (
        <BrowserRouter>
        <UserContextProvider currentUser={currentUser} setCurrentUser={setCurrentUser}>
            <Navbar setSearchedProducts={setSearchedProducts}/>
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
                </Routes>
        </UserContextProvider>
        </BrowserRouter>
    )
};


export default App;
