import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

function ProductSearchBar({setSearchedProducts}) {
    const navigate = useNavigate();
    const [newSearch, setNewSearch ] = useState("")

    function handleChange(e){
        setNewSearch(e.target.value)
    }

    // he is using use effect to constantly have the places fetched on page - will use for featured 
    function searchProducts (e) {
        e.preventDefault()
        console.log("inside search products")
        axios.get(`/searchProducts/${newSearch}`)
        .then(response => {
            setSearchedProducts(response.data.data)
            // console.log("data from search bar",data)
            navigate('/products')
        })
    };

    return(
        <form className="flex border border-gray-300 rounded-full py-1 px-7 w-1/2 h-8 shadow-md shadow-gray-300 mr-20" onSubmit={searchProducts}>
        <input
            className = "search-bar focus:outline-none flex-grow "
            type="text"
            placeholder="search products" 
            onChange={handleChange}
            value={newSearch}           
        />
        <button  type= "submit" className="bg-primary p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
        </button>
        </form>
    )
}

export default ProductSearchBar;