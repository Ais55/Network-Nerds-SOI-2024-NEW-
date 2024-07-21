//DeleteBook.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteBook = ({role}) => {
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (role!=='' && role!=='admin') {
            navigate('/error')
        }else{
            axios.delete(`${import.meta.env.VITE_API_URL}/book/book/${id}`)
            .then(res => {
                if (res.data.deleted) {
                    navigate('/books');
                }
            })
            .catch(err => console.log(err));
        }
    }, [role])

    return null;
}

export default DeleteBook;
