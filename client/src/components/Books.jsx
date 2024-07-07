// Books.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";

const Books = ({ role, searchQuery }) => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get("http://localhost:3001/book/books", {
                    params: { search: searchQuery }
                });
                setBooks(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchBooks();
    }, [searchQuery]); // Added searchQuery as a dependency

    return (
        <div className="book-list">
            {
                books.map(book => (
                    <BookCard key={book.book_id} book={book} role={role} />
                ))
            }
        </div>
    );
}

export default Books;
