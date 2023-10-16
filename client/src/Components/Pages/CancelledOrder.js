import React, {useContext} from 'react';
import bg from "../../Assets/cancel.png"


// user will be redirected to this page 
function Cancel () {
    return (
        <div className="">
            <div className="flex items-center justify-around bg-gradient-to-t from-amber-800 to-white">
            <img src={bg} />
            </div>
        </div>
    )
}

export default Cancel;