import React from 'react';
import { useHistory } from 'react-router';
import './Shop.css';

const Shop = (props) => {
const{ImageURL, name,price, _id} = props.product;
const history = useHistory();

const handleCheckOut = ()=>{
history.push(`/product/${_id}`)

}

    return (
        <div className="col-md-4 card">
            <img  src={ImageURL} alt=""/>
            <p>{name} Price: {price}</p>
         <button onClick={handleCheckOut} className="btn btn-success">Buy Now</button>
        </div>
    );
};

export default Shop;