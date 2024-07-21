import React, { useEffect, useState } from "react";
import "../css/BookCard.css";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

function trimming(description, maxLength = 20) {
    if (description.length > maxLength) {
        return description.substring(0, maxLength) + "...";
    }
    return description;
}

const BookCard = ({ book, role, handleIssueBook, issuedBooks }) => {
    const {
        book_id,
        title,
        description,
        author,
        genre,
        department,
        count,
        issued_books,
        vendor,
        vendor_id,
        publisher,
        publisher_id,
        image_url,
    } = book;
    const [actualIssued_books, setActualIssued_books] = useState(0)
    useEffect(() => {
        setActualIssued_books(issued_books)
    }, [issued_books])
    // console.log(actualIssued_books)
    const navigate = useNavigate()
    // const handleDeleteBook = () => {
    //     axios.delete(`${import.meta.env.VITE_API_URL}/book/book/${book._id}`)
    //         .then(res => {
    //             if (res.data.deleted) {
    //                 navigate('/books');
    //             }
    //         })
    //         .catch(err => console.log(err));
    // }
    const handleGetIssued = async () => {
        if (issuedBooks.length>=3){
            alert('You can issue at most 3 books.')
            return
        }
        try {
            await axios.post(
                `${import.meta.env.VITE_API_URL}/book/issuebook/${book._id}`,
                {}
            )
            handleIssueBook(book._id);
            setActualIssued_books(actualIssued_books+1);
            alert("Issue request sent to admin");
        } catch (err) {
            console.log(err);
        }
    };
    const deleteIssue = async () => {
        try{
        await axios.delete(`${import.meta.env.VITE_API_URL}/book/issuebook/${book._id}`)
            handleIssueBook(book._id, true)
            setActualIssued_books(actualIssued_books-1);
        }catch(err){
            console.log(err)
        }
    };
    return (
        <div className="book-card">
            
            <img src={image_url} alt={title} className="book-image" />
            <div className="book-details">
                <h3>{book_id}</h3>
                <h3>{trimming(title, 55)}</h3>
                <h4>{trimming(description, 70)}</h4>
                <p>Author: {author}</p>
                <p>Department : {department}</p>
                {/* <p>count : {count}</p>
                <p>Issued : {issued_books}</p> */}
                <p>Available: {count - actualIssued_books}</p>
            </div>
            {role === "admin" && (
                <div className="book-actions">
                    <Link to={`/book/${book._id}`} className="action-link">
                        <button className="action-button edit-button">
                            Edit
                        </button>
                    </Link>
                    <Link to={`/delete/${book._id}`} className="action-link">
                        <button className="action-button delete-button">
                            Delete
                        </button>
                    </Link>
                </div>
            )}
            {role === "student" && (
                <div className='button-container'>
                    {(issuedBooks.some((b) => b.id === book._id)) ? (
                        issuedBooks.some((b) => b.id === book._id && !b.issued)?
                        <div className="request-sent">
                        
                            REQUEST SENT
                            <button
                                onClick={deleteIssue}
                                className="action-button delete-button">
                                Delete
                            </button>
                        </div> :
                        <div>
                            <span style={{color: 'rgb(14, 159, 14)'}}><strong>Issued:</strong></span> Return by {new Date(new Date(issuedBooks.find((b) => b.id === book._id).date).getTime() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                        </div>
                    ) : (
                        (count-actualIssued_books)>0 ? 
                        <button
                            onClick={handleGetIssued}
                            className="action-button edit-button">
                            Get Issued
                        </button> 
                        : <span style={{color: 'red'}}><strong>Not Available.</strong></span>
                    )}
                </div>
            )}
        </div>
    );
};

export default BookCard;
