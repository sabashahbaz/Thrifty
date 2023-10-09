import React, {useState} from "react";
import axios from "axios";
import NewListForm from "../Pieces/NewListForm";
import ColorsForm from "../Pieces/ColorsForm";
import { Navigate } from "react-router-dom";

function NewListing() {

    const [title, setTitle] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [images, setImages] = useState([])
    const [colors, selectedColors] = useState("")
    const [redirect, setRedirect] = useState("")

    //upload images from computer to post as new listing
    function uploadImage (e) {
        e.preventDefault()
        const files = e.target.files; // gets the files uploaded by the user
        console.log("files",{files})
        const data = new FormData(); // new FormData object is created (construct a set of key/value pairs)
        for (let i = 0; i < files.length; i++) { 
            data.append('images', files[i]);  // append each file to the data object wit the key "images", to create a key of images
        }
        axios.post('/uploadImages', data, { // post request, sending the data (array of fselected iles)
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(response=> {
            const {data:filenames} = response // assings data to the filename 
            setImages(prev => {
                return [...prev, ...filenames]
            })
        })
    };

    async function addNewListing(e){
        e.preventDefault()
        const {data} = await axios.post('/addNewListing',{
            title, brand, 
            size, description, 
            price, images, colors, 
        }, {withCredentials: true});
        console.log(data) // the response is already in JSON format, so just access the data
        setRedirect('/account/listings');
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    
    return(
        <div className=" px-10 w-1/2">
            <form onSubmit={addNewListing}>
                <NewListForm
                title={title} setTitle={setTitle}
                brand={brand} setBrand={setBrand}
                size={size} setSize={setSize}
                description={description} setDescription={setDescription}
                price={price} setPrice={setPrice}
                images={images} setImages={setImages}
                uploadImage={uploadImage}
                />
                <ColorsForm selected={colors} onChange={selectedColors}/>
            </form>
        </div>
    )
}

export default NewListing;