import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

import Header from '../../components/Header';

import api from '../../services/api';

import './styles.css';

export default function Login() {
    const validations = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().min(8).required(),
    });

    const history = useHistory();

    const handleLoginForm = values => {
        api.post('authenticate', values).then(res => {
            const { token } = res.data;
            localStorage.setItem('user-token', token);
        });

        history.push('/');
    }

    return (
        <>
            <Header />
            <Formik initialValues={{}} onSubmit={handleLoginForm} validationSchema={validations}>
                <Form className="login-form" >
                    <h1>Fazer Login</h1>
                    <div className="form-group">
                        <Field name="email" placeholder="E-mail"/>
                        <ErrorMessage component="div" name="email" className="error-msg"/>
                    </div>
                    <div className="form-group">
                        <Field type="password" name="password" placeholder="Senha"/>
                        <ErrorMessage component="div" name="password" className="error-msg"/>
                    </div>
                    
                    <div className="register-link"><span>Quero <Link to="/register">criar</Link> uma conta!</span></div>

                    <button type="submit">Login</button>
                </Form>
            </Formik>
        </>
    )
}