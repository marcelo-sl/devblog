import React from 'react';

import Header from '../../components/Header';

import './styles.css';

export default function Profile() {
    return (
        <>
            <Header />
            <div className="profile">
                <h1 className="title">Esse é o meu perfil</h1>
            </div>
        </>
    );
}