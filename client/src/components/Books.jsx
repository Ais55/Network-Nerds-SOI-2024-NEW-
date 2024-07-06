// Books.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const Books = ({ role, searchQuery }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/book/books")
            .then(res => {
                setBooks(res.data);
                console.log(res.data);
            }).catch(err => console.log(err));
    }, []); // Added dependency array to run useEffect only once on mount

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.id.toString().includes(searchQuery) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="book-list">
            {
                filteredBooks.map(book => (
                    <BookCard key={book.id} book={book} role={role} />
                ))
            }
        </div>
    );
}

export default Books;
