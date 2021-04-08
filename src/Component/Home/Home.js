import React, { useEffect, useState } from 'react';
import Shop from '../Shop/Shop';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const url =`https://mysterious-hamlet-80719.herokuapp.com/shopProducts`
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            setProducts(data);
        })
    },[])

    return (
        <div className="container-fluid">
        <div className="row">

            {
                products.map(pd =><Shop product={pd}></Shop>)
            }
           
        </div>
        </div>
    );
};

export default Home;