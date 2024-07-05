import React from "react";
import '../css/BookCard.css'

const BookCard = ({book}) => {
    const{ 
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
        image_url} = book;
    return (
        <div className = 'book-card'>
            <img src={image_url} alt={title} className="book-image"/>
            <div className="book-details">
                <h3>{book_id}</h3>
                <h3>{title}</h3>
                <h4>{description}</h4>
                <p>Author: {author}</p>
                <p>Department : {department}</p>
                <p>count : {count}</p>
                <p>Issued Books : {issued_books}</p>
            </div>
            <div className="book-actions">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default BookCard