import React from 'react';

import { Link } from 'react-router-dom';
import { FaBookOpen, FaSignInAlt } from 'react-icons/fa';

import './styles.css';

export default function Header() {
    return (
        <div className="header-container">
            
            <Link to="/" className="logo">
            <FaBookOpen size={30} color="#FFF" className="logo-icon" />
                <h1>DevBlog</h1>
            </Link>
            
            <div className="links">
                <Link to="/login">
                    Entrar<FaSignInAlt size={18} color="#FFF" className="sign-icon"/>
                </Link>
            </div>
        </div>
    );
}