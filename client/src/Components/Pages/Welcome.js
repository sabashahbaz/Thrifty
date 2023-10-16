
import React, {useContext} from 'react';
import bg from "../../Assets/thriftybg.png"
import { Link } from 'react-router-dom';
import { UserContext } from "../Pieces/UserContext.js";

//welcome page 
export default function Welcome () {

    const {user} = useContext(UserContext);
    return (
        <div className="">
            <div className="flex items-center justify-around bg-gradient-to-t from-amber-800 to-white">
            <img src={bg} />
            </div>
            {user ? ( // if there is a user present, this button will direct their their wishlist 
            <Link to="/wishlist">
                <button className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-navbar text-black text-xl font-bold px-8 py-4 rounded-md shadow-md cursor-pointer border-2 border-black">
                Start Shopping
                </button>
            </Link>
            ) : ( // of there is a no user present, this button will direct to the login page  
            <Link to="/login">
                <button className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-navbar text-black text-xl font-bold px-8 py-4 rounded-md shadow-md cursor-pointer border-2 border-black">
                Start Shopping
                </button>
            </Link>
            )}
        </div>
    )};