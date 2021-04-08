import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


const Header = () => {
    return (
        <nav className="navStyle">
        <Link to ="/home">Home</Link>
        <Link to ="/Order">Order </Link>
        <Link to ="/admin">Admin </Link>     
        <Link className="btn btn-primary" to ="/login">Login</Link>
        </nav>

    );
};

export default Header;