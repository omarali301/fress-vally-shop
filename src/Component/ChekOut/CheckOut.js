import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Order from '../Order/Order';
import './CheckOut.css';

const CheckOut = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [checkOut, SetCheckOUt] = useState();
    const {productId} = useParams();
const {name, price, quantity,ImageURL} = checkOut || {};
useEffect(() => {
    fetch(`https://mysterious-hamlet-80719.herokuapp.com/product/${productId}`)
    .then(res => res.json())
    .then(data =>SetCheckOUt(data))

},[])

const handleOrder  =()=>{
    const {name, quantity,  price, ImageURL} = checkOut;
    const newOrder = {...loggedInUser, name, quantity, price, ImageURL}
    fetch('https://mysterious-hamlet-80719.herokuapp.com/addOrder',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newOrder)
    })
    .then(res => res.json())
    .then(data =>{
        console.log(data);
    })
}
    return (
        <div className="checkBox row">
        <div className="center"> <h4>Check Out</h4></div>
        <div className="col-md-3 checkout">        
            <img src={ImageURL} alt=""/>
            <p>{name} Price: {price}</p>

            <p>This is admin page</p>
            <Link  to={'/Order'}>
            <button onClick={handleOrder} className="btn btn-success "> Order </button>
            </Link>
              </div>
        </div>
    );
};

export default CheckOut;