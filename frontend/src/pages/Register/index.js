import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import './styles.css';

export default function Register() {
    const history = useHistory();

    const handleRegisterForm = data => {
        history.push('/');
    }
    
    return (
        <>
            <Header />
            <form className="register-form" onSubmit={handleRegisterForm}>
                <h1>Criar Conta</h1>
                <input type="email" name="email" placeholder="E-mail"/><br/>
                <input type="text" name="name" placeholder="Nome"/><br/>
                <input type="password" name="password" placeholder="Senha"/><br/>
                <input type="password" name="confirm-password" placeholder="Confirmar senha"/><br/>
                
                <div className="login-link"><span>Já tenho uma conta, fazer <Link to="/login">login</Link> com minha conta!</span></div>

                <button type="submit">Cadastrar</button>
            </form>
        </>
    )
}