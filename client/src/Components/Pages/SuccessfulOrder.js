import React, {useContext} from 'react';
import bg from "../../Assets/success.png"
import { UserContext } from "../Pieces/UserContext.js";

// user will be directed after a successful checkout 
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