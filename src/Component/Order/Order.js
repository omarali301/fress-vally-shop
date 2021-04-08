import React, { useEffect, useState } from 'react';
import './Order.css';

const Order = () => {
    const [order, setOrder] = useState([]);

    useEffect(()=>{
        const url =`https://mysterious-hamlet-80719.herokuapp.com/orderProducts`
        fetch(url)
        .then(res => res.json())
        .then(data =>setOrder(data))
    },[])
// console.log(order);


function deleteProduct(event, id){
    console.log(event.target.parentNode);
    fetch(`https://mysterious-hamlet-80719.herokuapp.com/delete/${id}`,{
        method: 'DELETE'
    })
    
    .then(res => res.json())
    .then(result =>{
        console.log('delete successful', result);
        if(result){
    
            event.target.parentNode.style.display = 'none';
        }
    })
    
    }


    return (
        <div>
            <h1>This is order page</h1>
            {
                order.map(order =><li  className="orderBox">
                    {/* <img src={order.ImageURL} alt=""/> */}
                 
                    <p><span className="nameGap">{order.name}</span> <span className="priceGap">Price : {order.price}</span>
                    <button onClick={() =>deleteProduct()} className="btn btn-success">Delete</button> </p>
                </li>)
            }
        </div>
    );
};

export default Order;