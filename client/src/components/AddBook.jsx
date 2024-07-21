import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import  "../css/AddBook.css";

const AddBook = ({role}) => {
    const navigate = useNavigate();
    useEffect(() => {
        if (role!=='' && role!=='admin') {
            navigate('/error')
        }
    }, [role])
    
    
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
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const invalid = book_id === "" || title === "" || description === "" || author === "" || genre === "" || department === "" || count <=0 || vendor === "" || vendor_id === "" || publisher === "" || publisher_id === "" || image_url === "";

        if (invalid){
            alert('Invalid Entries')
            return
        }
        axios.post(`${import.meta.env.VITE_API_URL}/book/add`, {
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
            if(res.data.added) {
                navigate('/books');
            }
            else {
                alert(res.data.message);
            }
        })
        .catch(err => console.log(err));
    };

    return (role==='admin' &&
        <div className="book-form-container">
            <div className="book-form">
                <h2>Add Book</h2>
                <br />
                <div className="form-group">
                    <label htmlFor='book_id'>Book ID:</label>
                    <input type="text" id="book_id" name="book_id"
                    onChange={(e) => setBook_id(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor='title'>Title:</label>
                    <input type="text" id="title" name="title"
                    onChange={(e) => setTitle(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor='description'>Description:</label>
                    <input type="text" id="description" name="description"
                    onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">Author:</label>
                    <input type="text" id="author" name="author"
                    onChange={(e) => setAuthor(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="genre">Genre:</label>
                    <input type="text" id="genre" name="genre"
                    onChange={(e) => setGenre(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <input type="text" id="department" name="department"
                    onChange={(e) => setDepartment(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="count">Count:</label>
                    <input type="number" id="count" name="count"
                    onChange={(e) => setCount(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="vendor">Vendor:</label>
                    <input type="text" id="vendor" name="vendor"
                    onChange={(e) => setVendor(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="vendor_id">Vendor ID:</label>
                    <input type="text" id="vendor_id" name="vendor_id"
                    onChange={(e) => setVendor_id(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="publisher">Publisher:</label>
                    <input type="text" id="publisher" name="publisher"
                    onChange={(e) => setPublisher(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="publisher_id">Publisher ID:</label>
                    <input type="text" id="publisher_id" name="publisher_id"
                    onChange={(e) => setPublisher_id(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="image_url">Image url:</label>
                    <input type="text" id="image_url" name="image_url"
                    onChange={(e) => setImage_url(e.target.value)}/>
                </div>
                <button className="submit" onClick={handleSubmit}>Add</button>
            </div>
            
        </div>
    );
}

export default AddBook;
