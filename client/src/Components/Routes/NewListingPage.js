import React, {useState} from "react";
import axios from "axios";
import NewListForm from "../Pieces/NewListForm";
import ColorsForm from "../Pieces/ColorsForm";

function NewListing() {

    const [title, setTitle] = useState("")
    const [brand, setBrand] = useState("")
    const [size, setSize] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [images, setImages] = useState([])

    function uploadImage (e) {
        e.preventDefault()
        const files = e.target.files;
        console.log({files})
        const data = new FormData();
        data.set('images', files)
        axios.post('/uploadImages', data, {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }).then(data=> {
            console.log(data)
            setImages([...images, data])
        })

    }

    return(
        <div className=" px-10 w-1/2">
            <form>
                <NewListForm
                title={title} setTitle={setTitle}
                brand={brand} setBrand={setBrand}
                size={size} setSize={setSize}
                description={description} setDescription={setDescription}
                price={price} setPrice={setPrice}
                images={images} setImages={setImages}
                uploadImage={uploadImage}
                />
                <ColorsForm />
            </form>
        </div>
    )
}

export default NewListing;