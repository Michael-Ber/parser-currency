import React from 'react';
import { Link } from 'react-router-dom';
import "./logo.scss";

export const Logo = () => {
    return (
        <div className='logo'>
            <Link to="/" className="logo__link">Logo</Link>
        </div>
    )
}
