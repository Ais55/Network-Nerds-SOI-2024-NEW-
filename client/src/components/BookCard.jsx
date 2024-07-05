import React from "react";
import '../css/BookCard.css'
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
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
    )
}

export default BookCard