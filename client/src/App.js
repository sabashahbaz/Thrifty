import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CartProvider from './Components/Pieces/CartContext'
import React, {useState } from "react";
import axios from 'axios'
import LoginPage from './Components/Pages/LoginPage'
import Register from './Components/Pages/Register'
import UserContextProvider from './Components/Pieces/UserContext';
import MyListing from './Components/Pages/MyListing';
import WishListPage from './Components/Pages/WishListPage';
import Navbar from './Components/Pieces/Navbar';
import NewListingPage from './Components/Pages/NewListingPage';
import ProductsPage from './Components/Pages/ProductsPage';
import DisplayProduct from './Components/Pieces/DisplayProduct';
import DisplayWishListPage from './Components/Pieces/DisplayWishListProduct';
import Cancel from './Components/Pages/CancelledOrder'
import Success from './Components/Pages/SuccessfulOrder'
import Welcome from './Components/Pages/Welcome'

axios.defaults.baseURL = 'http://localhost:4000'

//establishing all routes//

function App() {
    const [searchedProducts, setSearchedProducts] = useState([])

    return (
        <BrowserRouter>
        <UserContextProvider>
            <CartProvider>
            <Navbar setSearchedProducts={setSearchedProducts} />
                <Routes >
                        <Route path="/login" element={<LoginPage setSearchedProducts={setSearchedProducts}/>} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/products" element={<ProductsPage searchedProducts={searchedProducts} />}/>
                        <Route path="wishlist" element={<WishListPage />}/>
                        <Route path="/wishlist/:id" element={<DisplayWishListPage />}/>
                        <Route path="listings" element={<MyListing />} />
                        <Route path="listings/new" element={<NewListingPage />}/>
                        <Route path="listings/:id" element={<NewListingPage  />}/>
                        <Route path="/product/:id" element={<DisplayProduct  />}/> 
                        <Route path="success" element={<Success/>} />
                        <Route path="cancel" element={<Cancel/>} />
                        <Route path="/" element={<Welcome/>}/>
                </Routes>
            </CartProvider>
        </UserContextProvider>
        </BrowserRouter>
    )};


export default App;
