import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

//search bar to allow user to search for products via Poshmark API 
function ProductSearchBar({setSearchedProducts}) {
    const navigate = useNavigate();
    const [newSearch, setNewSearch ] = useState("")

    function handleChange(e){
        setNewSearch(e.target.value)
    }

    //serach for products with API call 
    function searchProducts (e) {
        e.preventDefault()
        axios.get(`/searchProducts/${newSearch}`)
        .then(response => {
            setSearchedProducts(response.data.data)
            navigate('/products') //navigate to products page, with the searched functions displayed 
        })
    };

    return(
        <form className="flex border border-gray-300 rounded-full py-1 px-3 w-1/2 h-8 shadow-md shadow-amber-900/50 mr-5 bg-white" onSubmit={searchProducts}>
        <input
            className = "search-bar focus:outline-none flex-grow  "
            type="text"
            placeholder="search products" 
            onChange={handleChange}
            value={newSearch}           
        />
        <button  type= "submit" className="bg-navbar/75 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </button>
        </form>
    )
}

export default ProductSearchBar;