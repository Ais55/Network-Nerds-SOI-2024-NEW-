import React from 'react';

const MyBooks = ({ issuedBooks }) => {
  return (
    <div>
      <h1>My Books</h1>
      {issuedBooks.map(book => (
        <div key={book.book_id}>
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Department: {book.department}</p>
        </div>
      ))}
    </div>
  );
};

export default MyBooks;
