import React from "react";

 

function NewListing() {

    return(
        <div className=" px-10 w-1/2">
            <form>
                <h2 className="text-2xl">Title</h2>
                    <p className="text-gray-400 text-sm"> short and catchy as an advertisement</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl"  type="text" placeholder="title" />

                <h2 className="text-2xl mt-4">Brand</h2>
                <p className="text-gray-400 text-sm"> brand of product</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl" type="text" placeholder="Steve Madden" />

                <h2 className="text-2xl mt-4">Size</h2>
                <p className="text-gray-400 text-sm"> size of product</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl" type="text" placeholder="Steve Madden" />

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-gray-400 text-sm"> description of product</p>
                    <textarea className=" w-full border my-1 py-2 px-3 rounded-xl" />

                <h2 className="text-2xl mt-4">Price</h2>
                <p className="text-gray-400 text-sm"> how much do you want to sell it for?</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl" type="text" placeholder="$25.00" />

                <h2 className="text-2xl mt-4">Images</h2>
                <p className="text-gray-400 text-sm"> upload images of your product</p>
                <div className="mt-2 grid grid-cols-3 ">
                    <button className=" flex gap-1 justify-center border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                    </button>

                </div>

                <h2 className="text-2xl mt-4">Color</h2>
                <p className="text-gray-400 text-sm"> Select the color of your product</p>

                    <div className="grid grid-cols-4">

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-red-500">Red</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-orange-400">Orange</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-yellow-300">Yellow</span>
                        </label>


                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-pink-300">Pink</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-green-500">Green</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-blue-500">Blue</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-purple-500">Purple</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-amber-800">Brown</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox"  />
                            <span className="text-gray-400">Gray</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span>Black</span>
                        </label>

                        <label className = " p-3 flex rounded gap-2">
                            <input type="checkbox" />
                            <span className="text-amber-100 font-outline-4">White</span>
                        </label>

                    </div>
                    
            
                
            </form>
        </div>
    )
}

export default NewListing;