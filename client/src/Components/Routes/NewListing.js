import React from "react";

 

function NewListing() {

    return(
        <div className="mr-auto px-10 w-1/2">
            <form>
                <h2 className="text-2xl">Title</h2>
                    <p className="text-gray-400 text-sm"> short and catchy as an advertisement</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8"  type="text" placeholder="title" />
                <h2 className="text-2xl mt-4">Brand</h2>
                    <input className= "w-full border my-1 py-2 px-3 h-8" type="text" placeholder="Steve Madden" />
                <h2 className="text-2xl mt-4">Description</h2>
                    <input className= "w-full border my-1 py-2 px-3 h-32" type="text" placeholder="description" />
                <h2 className="text-2xl mt-4">Price</h2>
                    <input className= "w-full border my-1 py-2 px-3 h-8" type="text" placeholder="$35" />
                <h2 className="text-2xl mt-4">Images</h2>
                <div className="mt-2 grid grid-cols-3 ">
                    <button className="border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">+</button>

                </div>
            
                
            </form>
        </div>
    )
}

export default NewListing;