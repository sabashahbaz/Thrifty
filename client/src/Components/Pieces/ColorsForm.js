import React from 'react';

function ColorsForm ({onChange, selected}) {

    function handleColorClick(e){
        const {checked, name} = e.target
        if (checked) {
            onChange([...selected, name])
        } else {
            onChange([...selected.filter(selectedName => selectedName !==name)])
        }
    }

    return(
        <div>
            <h2 className="text-2xl mt-4">Color</h2>
                <p className="text-sm text-stone-300"> Select the color of your product</p>
                    <div className="grid grid-cols-4">
                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('red')} name="red" onChange={handleColorClick} />
                            <span className="text-red-500">Red</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('orange')} name="orange" onChange={handleColorClick}/>
                            <span className="text-orange-400 ">Orange</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('yellow')} name="yellow" onChange={handleColorClick}/>
                            <span className="text-yellow-300">Yellow</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('pink')} name="pink" onChange={handleColorClick}/>
                            <span className="text-pink-300">Pink</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('green')} name="green" onChange={handleColorClick}/>
                            <span className="text-green-500">Green</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('blue')} name="blue" onChange={handleColorClick}/>
                            <span className="text-blue-500">Blue</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('purple')} name="purple" onChange={handleColorClick}/>
                            <span className="text-purple-500">Purple</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('brown')} name="brown" onChange={handleColorClick}/>
                            <span className="text-amber-800">Brown</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('gray')} name="gray" onChange={handleColorClick} />
                            <span className="text-gray-400">Gray</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('black')} name="black" onChange={handleColorClick}/>
                            <span>Black</span>
                        </label>

                        <label className = " p-3 flex rounded gap-1 cursor-pointer">
                            <input type="checkbox" checked={selected.includes('white')} name="white" onChange={handleColorClick}/>
                            <span className="text-black font-outline-4">White</span>
                        </label>
                    </div>
                    <div className= "">
                        <button className = "bg-navbar/50 rounded-xl w-full mt-2 mb-10 h-10 cursor-pointer hover:bg-navbar/75" > Add to Closet</button>
                    </div>     
                </div>
            )
        }

export default ColorsForm;