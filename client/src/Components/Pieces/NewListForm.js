import React from 'react';

function NewListForm ({uploadImage, 
    title, setTitle,brand, 
    setBrand, size, setSize, 
    description, setDescription, 
    price, setPrice, addedImages, setImages}) {

    return(
        <div>
            <h2 className="text-2xl">Title</h2>
                    <p className="text-sm text-stone-300"> short and catchy as an advertisement</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-blue-100"  
                            type="text" 
                            placeholder="title"
                            value={title}
                            onChange={(e)=> setTitle(e.target.value)} />

                <h2 className="text-2xl mt-4">Brand</h2>
                <p className="text-sm text-stone-300"> brand of product</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-blue-100" 
                            type="text" 
                            placeholder="Steve Madden"
                            value={brand}
                            onChange={(e)=> setBrand(e.target.value)} />

                <h2 className="text-2xl mt-4">Size</h2>
                <p className="text-sm text-stone-300"> size of product</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-blue-100" 
                            type="text" 
                            placeholder="7"
                            value={size}
                            onChange={(e)=> setSize(e.target.value)}/>

                <h2 className="text-2xl mt-4">Description</h2>
                <p className="text-sm text-stone-300"> description of product</p>
                    <textarea className=" w-full border my-1 py-2 px-3 rounded-xl cursor-pointer hover:bg-blue-100"
                                type="text"
                                value={description}
                                onChange={(e)=> setDescription(e.target.value)}/>

                <h2 className="text-2xl mt-4">Price</h2>
                <p className="text-sm text-stone-300"> how much do you want to sell it for?</p>
                    <input className= "w-full border my-1 py-2 px-3 h-8 rounded-xl cursor-pointer hover:bg-blue-100" 
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
                    <label className="h-32 cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 cursor-pointer hover:bg-blue-100">
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



    {/* <button onClick={(e)=> deleteImage(e, image)} className="cursor pointer absolute bottom-1 right-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-1">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                            </button> */}
                            {/* <button onClick={(e)=> selectAsMainImage(e,image)} className="cursor pointer absolute bottom-1 left-1 text-white bg-black bg-opacity-50 rounded-2xl py-1 px-1">
                                {image === addedImages[0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                )}
                                {image !== addedImages [0] && (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                    </svg>
                                )}
                                
                            </button> */}


    // //delete image from form - doesnt work maybe won't keep 
    // function deleteImage(e, selectedImage) {
    //     e.preventDefault()
    //     setImages([...addedImages.filter(image => image == selectedImage)])
    // }

    // //select as main image - doenst work
    // function selectAsMainImage(e, selectedImage) {
    //     e.preventDefault()
    //     const newAddedImages = [selectedImage,...addedImages.filter(image => image !==selectedImage)]
    //     setImages (newAddedImages)
    // }