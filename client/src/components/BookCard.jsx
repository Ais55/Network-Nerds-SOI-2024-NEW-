import React from "react";
import '../css/BookCard.css'
import { Link } from 'react-router-dom';

function trimming(description, maxLength = 20) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + '...';
    }
    return description;
  }
  

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
        console.log("-----------" +book)
    return (
        <div className = 'book-card'>
            <img src={image_url} alt={title} className="book-image"/>
            <div className="book-details">
                <h3>{book_id}</h3>
                <h3>{trimming(title,55)}</h3>
                <h4>{trimming(description, 70)}</h4>
                <p>Author: {author}</p>
                <p>Department : {department}</p>
                <p>count : {count}</p>
                <p>Issued  : {issued_books}</p>
            </div>
            <div className="book-actions">
                <Link to={`/book/${book._id}`} className="action-link">
                    <button className="action-button edit-button">Edit</button>
                </Link>
                <Link to={`/book/${book._id}`} className="action-link">
                    <button className="action-button delete-button">Delete</button>
                </Link>
            </div>
        </div>
    )
}

export default BookCard