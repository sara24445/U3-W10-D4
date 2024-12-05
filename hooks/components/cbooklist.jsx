import React, { useState, useEffect } from 'react';

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Simulating API call
    fetch('/api/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []); // L'array vuoto significa che l'effetto verrà eseguito solo al montaggio

  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>{book.title}</li>
      ))}
    </ul>
  );
};

export default BookList;