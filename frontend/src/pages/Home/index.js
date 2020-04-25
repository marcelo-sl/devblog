import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import { Link } from 'react-router-dom';
import { FaClock, FaBook } from 'react-icons/fa';
import moment from 'moment';
import 'moment/locale/pt-br';

import api from '../../services/api';

import './styles.css';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('posts').then(response => {
            setPosts(response.data);
        });
    }, [posts]);

    return (
        <>
            <Header />
            <div className="home-container">
                <div className="header">
                    <h1 className="title"><FaBook size={25} color="#3169c1" className="nav-icon"/>Últimos Posts</h1>
                </div>
                <ul className="post-list">
                    {posts.map(post => (
                        <li key={post.id} className="post-list-item">
                            <Link to={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                            <div className="flex">
                                <h3>Escrito por: {post.user.authorName}</h3>
                                <p><FaClock size={16} color="#FFF" className="time-icon"/>{moment(post.updated_at.split(' ')[0]).format("LL")}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}