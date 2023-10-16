import React, {useContext} from 'react';
import bg from "../../Assets/cancel.png"
import { UserContext } from "../Pieces/UserContext.js";


function Cancel () {
    const {user} = useContext(UserContext);
    return (
        <div className="">
            <div className="flex items-center justify-around bg-gradient-to-t from-amber-800 to-white">
            <img src={bg} />
            </div>
        </div>
    )
}

export default Cancel;