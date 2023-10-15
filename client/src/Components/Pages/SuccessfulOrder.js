import React, {useContext} from 'react';
import bg from "../../Assets/success.png"
import { Link } from 'react-router-dom';
import { UserContext } from "../Pieces/UserContext.js";

function Success () {
    const {user} = useContext(UserContext);
    return (
        <div className="">
            <div className="flex items-center justify-around bg-gradient-to-t from-amber-800 to-white">
            <img src={bg} />
            </div>
        </div>
    )};

export default Success;