import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';

import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft, FaGithub, FaLinkedin } from 'react-icons/fa';

import api from '../../services/api';

import './styles.css';

export default function ReadPost() {

    const [post, setPost] = useState({});
    const [author, setAuthor] = useState({});

    const { id } = useParams();

    useEffect(() => {
        api.get(`/posts/${id}`).then(response => {
            setPost(response.data);
            setAuthor(response.data.user);
        });
    }, []);

    return (
        <>
            <Header />
            <div className="read-post-container">

                <div className="go-back-link">
                    <Link to="/"><FaArrowLeft size={20} color="#3169c1" className="nav-icon"/>Voltar para Home</Link>
                </div>

                <div className="post-container">
                    <div className="post">
                        <h1>{post.title}</h1>
                        <p>{post.body}</p>
                    </div>
                    <div className="author-container">
                        <h3>Escrito por: {author.authorName}</h3>
                        {author.authorGithub && <a href={`https://www.github.com/${author.authorGithub}`} target="_blanck"><FaGithub size={18} color="#3169c1" className="nav-icon"/>{author.authorGithub}</a>}
                    </div>
                </div>
            </div>
        </>
    )
}