import React from 'react';
import { Link } from 'react-router-dom';

const Admin = () => {

    return (
        <div style={{marginLeft:'30%', border: '1px solid green', width:'400px', padding: '20px', textAlign: 'center'}}>
            <p>You can add products now</p>
            <Link  to={'/addProduct'}>
            <button className="btn btn-success "> Add Product </button>
            </Link>

           
        </div>
    );
};

export default Admin;