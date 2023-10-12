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
                        <Route path="/products" element={<ProductsPage searchedProducts={searchedProducts} />}>
                            {/* <Route path=":id" element={<DisplayProduct/>}/> */}
                        </Route>
                        {/* <Route path="account" element={<AccountPage />}> */}
                            <Route path="profile" element={<Profile />} />
                            <Route path="wishlist" element={<WishListPage />}/>
                            <Route path="listings" element={<MyListing />} >
                                <Route path="new" element={<NewListing />}/>
                                <Route path=":id" element={<NewListing  />}/>
                            </Route>
                        {/* </Route> */}
                        <Route path="/product/:id" element={<DisplayProduct/>}/> 
                        <Route path="/wishlist/:id" element={<DisplayWishListPage  />}/>
                    {/* </Route> */}
                </Routes>
        </UserContextProvider>
        </BrowserRouter>
    )
};


export default App;
