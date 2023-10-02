import React from 'react';

function ColorsForm () {

    return(
        <div>
            <h2 className="text-2xl mt-4">Color</h2>
                <p className="text-sm text-stone-300"> Select the color of your product</p>
                    <div className="grid grid-cols-4">
                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-red-500">Red</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-orange-400">Orange</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-yellow-300">Yellow</span>
                        </label>


                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-pink-300">Pink</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-green-500">Green</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-blue-500">Blue</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-purple-500">Purple</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-amber-800">Brown</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox"  />
                            <span className="text-gray-400">Gray</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span>Black</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1">
                            <input type="checkbox" />
                            <span className="text-black font-outline-4">White</span>
                        </label>
                    </div>
                    <div className= "">
                        <button className = "bg-primary rounded-xl w-full mt-2 mb-10" > Add to Closet</button>
                    </div>     
                </div>
            )
        }

export default ColorsForm;