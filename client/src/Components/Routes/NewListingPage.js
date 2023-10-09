import React, {useState, useEffect} from "react";
import axios from "axios";
import NewListForm from "../Pieces/NewListForm";
import ColorsForm from "../Pieces/ColorsForm";
import { Navigate, useParams } from "react-router-dom";

function NewListing() {

    const [title, setTitle] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [addedImages, setImages] = useState([])
    const [colors, selectedColors] = useState("")
    const [redirect, setRedirect] = useState("")
    const {id} = useParams()


    //setting use state so the form will have the data filled out to be able to update the form
    useEffect(() => {
        if(!id) {
            return;
        }
        axios.get('/listings/' +id)
        .then(response => {
            const {data} = response;
            setTitle(data.title);
            setBrand(data.brand);
            setDescription(data.description)
            setSize(data.size);
            setImages(data.images);
            selectedColors(data.colors);
            setSize(data.size);
            setPrice(data.price)

            console.log("addedImages", addedImages, setImages)
            console.log(response.data)
        })
    }, [id])

    
    
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
            // setImages(prev => {
            //     return [...prev, ...filenames]
            setImages(prev => {
                return [...prev, ...filenames]
            })
            console.log("added images frmo upload",addedImages)
        })
    };



    console.log("addedImages",addedImages)
    //add new listing to database OR updating existing listing
    async function saveNewListing(e){
        e.preventDefault()
        if (id) {
            //update
            await axios.put('/updateNewListing',{
                id,
                title, brand, 
                size, description, 
                price, addedImages, colors, 
            }, {withCredentials: true});
            setRedirect(true);
        } else {
            //add new listing
            console.log("image post req", addedImages)
            await axios.post('/addNewListing',{
                title, brand, 
                size, description, 
                price, addedImages, colors, 
            }, {withCredentials: true});
            
            setRedirect(true);
        }
    }
    if (redirect) {
        return <Navigate to={'/account/listings'} />
    }

    return(
        <div className=" px-10 w-1/2">
            <form onSubmit={saveNewListing}>
                <NewListForm
                title={title} setTitle={setTitle}
                brand={brand} setBrand={setBrand}
                size={size} setSize={setSize}
                description={description} setDescription={setDescription}
                price={price} setPrice={setPrice}
                addedImages={addedImages} setImages={setImages}
                uploadImage={uploadImage}
                />
                <ColorsForm selected={colors} onChange={selectedColors}/>
            </form>
        </div>
    )
}

export default NewListing;