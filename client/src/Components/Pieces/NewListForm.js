import React from 'react';

//form to allow user to post new lising for sale 

function NewListForm ({uploadImage, 
    title, setTitle,brand, 
    setBrand, size, setSize, 
    description, setDescription, 
    price, setPrice, addedImages, setImages}) {

    return(
        <div>
            <h2 className="text-2xl">Title</h2>
                    <p className="text-sm text-stone-300"> short and catchy as an advertisement</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-navbar/25"  
                            type="text" 
                            placeholder="title"
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)} />

                <h2 className="text-2xl mt-4">Brand</h2>
                <p className="text-sm text-stone-300"> brand of product</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-navbar/25" 
                            type="text" 
                            placeholder="Steve Madden"
                            value={brand}
                            onChange={(e)=> setBrand(e.target.value)} />

                <h2 className="text-2xl mt-4">Size</h2>
                <p className="text-sm text-stone-300"> size of product</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-navbar/25" 
                            type="text" 
                            placeholder="7"
                            value={size}
                            onChange={(e)=> setSize(e.target.value)}/>

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-sm text-stone-300"> description of product</p>
                    <textarea className=" w-full border my-1 py-2 px-3 rounded-xl cursor-pointer hover:bg-navbar/25"
                                type="text"
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}/>

                <h2 className="text-2xl mt-4">Price</h2>
                <p className="text-sm text-stone-300"> how much do you want to sell it for?</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-navbar/25" 
                            type="number" 
                            placeholder="$25.00"
                            value={price}
                            onChange={(e)=> setPrice(e.target.value)} />

                <h2 className="text-2xl mt-4">Images</h2>
                <p className="text-sm text-stone-300"> upload images of your product</p>
                <div className=" grid gap-2 grid-cols-3 mt-3">
                    {addedImages.length > 0 && addedImages.map((image,index) => (
                        <div className=" " key={index}>
                            <img className = "h-[150px] w-[130px] " src={`http://localhost:4000/uploads/${image}`}/>
                        </div>
                    ))}
                    <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-white rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer ">
                        <input type= "file" multiple className="hidden" onChange={uploadImage}/>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                    </svg>
                    Upload
                    </label>
                </div>
        </div>
    )
}

export default NewListForm;
