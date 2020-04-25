import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import './styles.css';

export default function Login() {
    const history = useHistory();

    const handleLoginForm = data => {
        history.push('/');
    }

    return (
        <>
            <Header />
            <form className="login-form" onSubmit={handleLoginForm}>
                <h1>Fazer Login</h1>
                <input type="email" name="email" placeholder="E-mail"/><br/>
                <input type="password" name="password" placeholder="Senha"/><br/>
                
                <div className="register-link"><span>Quero <Link to="/register">criar</Link> uma conta!</span></div>

                <button type="submit">Login</button>
            </form>
        </>
    )
}