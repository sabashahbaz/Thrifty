import React, {useState, useEffect} from "react";
import axios from "axios";
import NewListForm from "../Pieces/NewListForm";
import ColorsForm from "../Pieces/ColorsForm";
import { useNavigate, useParams } from "react-router-dom";

function NewListingPage ({setListings}) {
    const navigate = useNavigate()
    const [title, setTitle] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [addedImages, setImages] = useState([])
    const [colors, selectedColors] = useState("")
    const {id} = useParams()


    //setting use state so the form will have the data filled out to be able to update the form
    useEffect(() => {
        if(!id) {return;} // if there is no id, return nothing 
        axios.get('/listings/' +id) // if there an id present -> fetch the listing information 
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
        });
    }, [id]);

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
            console.log("added images from upload",addedImages)
        })
    };

    console.log("addedImages",addedImages)

    //add new listing to database OR updating existing listing
    async function saveNewListing(e){
        e.preventDefault()
        if (id) {
            //update
            console.log("update", addedImages)
            await axios.put('/updateNewListing',{
                id,
                title, brand, 
                size, description, 
                price, addedImages, colors}, {withCredentials: true});
                navigate('/listings')
                // window.location.reload(true);
            
        } else {
            //add new listing
            await axios.post('/addNewListing',{
                title, brand, 
                size, description, 
                price, addedImages, colors}, {withCredentials: true});
                (navigate('/listings'))
                window.location.reload(true);
        }
    }
    
    return(
        <div className="mt-10 w-full">
            <div className = "w-full flex-col justify-center items-center ">
            <form onSubmit={saveNewListing}>
                <div className=" w-1/2 ml-24 bg-navbar/25 border-3 p-4 rounded-xl">
                    <NewListForm
                    title={title} setTitle={setTitle}
                    brand={brand} setBrand={setBrand}
                    size={size} setSize={setSize}
                    description={description} setDescription={setDescription}
                    price={price} setPrice={setPrice}
                    addedImages={addedImages} setImages={setImages}
                    uploadImage={uploadImage}/>
                    <ColorsForm selected={colors} onChange={selectedColors} />
                </div>
            </form>
            <image src={"https://i.gifer.com/33U8.gif"} />
            </div> 
        </div>
    )
};

export default NewListingPage;