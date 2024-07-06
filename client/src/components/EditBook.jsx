import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../css/AddBook.css";

const EditBook = () => {
    const [book_id, setBook_id] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [department, setDepartment] = useState('');
    const [count, setCount] = useState('');
    const [vendor, setVendor] = useState('');
    const [vendor_id, setVendor_id] = useState('');
    const [publisher, setPublisher] = useState('');
    const [publisher_id, setPublisher_id] = useState('');
    const [image_url, setImage_url] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:3001/book/book/${id}`)
            .then(res => {
                console.log(res);
                setBook_id(res.data.book_id);
                setTitle(res.data.title);
                setDescription(res.data.description);
                setAuthor(res.data.author);
                setGenre(res.data.genre);
                setDepartment(res.data.department);
                setCount(res.data.count);
                setVendor(res.data.vendor);
                setVendor_id(res.data.vendor_id);
                setPublisher(res.data.publisher);
                setPublisher_id(res.data.publisher_id); // Corrected this line
                setImage_url(res.data.image_url);
            })
            .catch(err => console.log(err));
    }, [id]); // Added id to the dependency array

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:3001/book/book/${id}`, {
            book_id,
            title,
            description,
            author,
            genre,
            department,
            count,
            vendor,
            vendor_id,
            publisher,
            publisher_id,
            image_url
        })
            .then(res => {
                if (res.data.updated) {
                    navigate('/books');
                } else {
                    console.log(res);
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="book-form-container">
            <div className="book-form">
                <h2>Edit Book</h2>
                <br />
                <div className="form-group">
                    <label htmlFor='book_id'>Book ID:</label>
                    <input type="text" id="book_id" name="book_id" value={book_id}
                        onChange={(e) => setBook_id(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='title'>Title:</label>
                    <input type="text" id="title" name="title" value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor='description'>Description:</label>
                    <input type="text" id="description" name="description" value={description}
                        onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" name="author" value={author}
                        onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre" value={genre}
                        onChange={(e) => setGenre(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <input type="text" id="department" name="department" value={department}
                        onChange={(e) => setDepartment(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="count">Count:</label>
                    <input type="number" id="count" name="count" value={count}
                        onChange={(e) => setCount(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="vendor">Vendor:</label>
                    <input type="text" id="vendor" name="vendor" value={vendor}
                        onChange={(e) => setVendor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="vendor_id">Vendor ID:</label>
                    <input type="text" id="vendor_id" name="vendor_id" value={vendor_id}
                        onChange={(e) => setVendor_id(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher:</label>
                    <input type="text" id="publisher" name="publisher" value={publisher}
                        onChange={(e) => setPublisher(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="publisher_id">Publisher ID:</label>
                    <input type="text" id="publisher_id" name="publisher_id" value={publisher_id}
                        onChange={(e) => setPublisher_id(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="image_url">Image URL:</label>
                    <input type="text" id="image_url" name="image_url" value={image_url}
                        onChange={(e) => setImage_url(e.target.value)} />
                </div>
                <button className="submit" onClick={handleSubmit}>Update</button>
            </div>
        </div>
    );
}

export default EditBook;
