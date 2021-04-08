import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";

const AddProduct = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [ImageURL, setImageURL] = useState();
    // console.log(ImageURL);
    const onSubmit = data =>{ 
        console.log(data);
        const shopData = {
            name : data.name,
            price : data.price,
            ImageURL: ImageURL,
        };
        console.log(shopData)
       
        const url = `https://mysterious-hamlet-80719.herokuapp.com/addProduct`
    
        // console.log(shopData)
        fetch(url,{
            method : 'POST',
            headers: {
                'content-Type': 'application/json'
            },
            body : JSON.stringify(shopData)
        })

        .then(res => console.log('server side response',res))
    
    };
    
    const handleImageUpload = event =>{
        // console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', '1096af0da178957723e48210631cd209');
        imageData.append('image', event.target.files[0]);

        axios.post('https://api.imgbb.com/1/upload',imageData)
        .then(function(response){
            setImageURL(response.data.data.display_url);
        })
        .catch(function(error){
            console.log(error);
        })
    }
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
               
                <input name="name" defaultValue="product name" {...register("name")} />
                <br/>
               <input name="price" defaultValue="product price" {...register("price")} />
      
                <br/>
                <input name="exampleRequired" type="file" onChange={handleImageUpload} />
               <br/>
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddProduct;