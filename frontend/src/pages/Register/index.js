import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import Header from '../../components/Header';

import api from '../../services/api';

import './styles.css';

export default function Register() {
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        name: yup.string().required(),
        password: yup.string().min(8).required(),
    });

    const history = useHistory();

    const handleRegisterForm = values => {
        api.post('register', values).then(() => {
            history.push('/login');
            alert('Usuário criado!');
        });
    }
    
    return (
        <>
            <Header />
            <Formik initialValues={{}} onSubmit={handleRegisterForm} validationSchema={validations}>
                <Form className="register-form">
                    <h1>Criar Conta</h1>
                    <div className="form-group">
                        <Field name="email" placeholder="E-mail"/> 
                        <ErrorMessage component="div" name="email" className="error-msg"/> 
                    </div>
                    <div className="form-group">
                        <Field name="name" placeholder="Nome"/> 
                        <ErrorMessage component="div" name="name" className="error-msg"/> 
                    </div>
                    <div className="form-group">
                        <Field type="password" name="password" placeholder="Senha"/> 
                        <ErrorMessage component="div" name="password" className="error-msg"/> 
                    </div>
                    
                    <div className="login-link"><span>Já tenho uma conta, fazer <Link to="/login">login</Link> com minha conta!</span></div>

                    <button type="submit">Cadastrar</button>
                </Form>
            </Formik>
        </>
    )
}