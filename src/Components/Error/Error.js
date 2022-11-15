import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css'

const Error = () => {
    return (
        <div className='error'>
            <h1>This page is not Found <Link to='/'>Please Go Home</Link> </h1>
            <div className='image'>
                <img src="https://media.istockphoto.com/photos/blue-exclamation-icon-sign-or-attention-caution-mark-illustration-picture-id1337010656" alt="" />
            </div>
        </div>
    );
};

export default Error;