import axios from "axios";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import Cookies from "js-cookie";
import {useNavigate} from 'react-router-dom'
const Books = ({ role, searchQuery }) => {
    const [books, setBooks] = useState([]);
    const [issuedBooks, setIssuedBooks] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (role!=='' && role!=='admin' && role!=='student') {
            navigate('/error')
        }
    }, [role])
    // const [role, setRole] = useState('student')
    // console.log(role)
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/book/books`, {
                    params: { search: searchQuery }
                });
                setBooks(res.data.books);
                setIssuedBooks(res.data.issuedBooks)
                // setRole(res.data.role)
            } catch (err) {
                console.log(err);
            }
        };

        fetchBooks();
    }, [searchQuery]); // Added searchQuery as a dependency

    const handleIssueBook = (book, shouldDelete=false) => {
        if (shouldDelete){
            const tempIssuedBooks = [...issuedBooks]
            setIssuedBooks(tempIssuedBooks.filter(b => b.id!==book))
        }
        else{setIssuedBooks([...issuedBooks, {id: book, issued: false}]);}

    }
    console.log(issuedBooks, books)
    return (
        <div className="book-list">
            {
                books.map(book => (
                    <BookCard key={book.book_id} book={book} issuedBooks={issuedBooks} role={role} handleIssueBook={handleIssueBook} />
                ))
            }
        </div>
    );
}

export default Books;
