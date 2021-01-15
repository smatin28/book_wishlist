import React from 'react';
import Book from './Book';
import NoBooks from './NoBooks';

const BookList = props => {

  const results = props.data;
  let books;
  if (results.length > 0) {
      books = results.map(book =>
        <Book
          title={book.volumeInfo.title}
          authors={book.volumeInfo.authors}
          date={book.volumeInfo.publishedDate}
          description={book.volumeInfo.description}
          /* Some books don't have a thumbnail, in which case imageURL is null */
          imageURL={
                    (book.volumeInfo.imageLinks)
                    ? book.volumeInfo.imageLinks.thumbnail
                    : null
                   }
          key={book.id}
          handleAdd={props.handleAdd}
          loggedIn={props.loggedIn}
          />
      );
  } else {
      books = <NoBooks />
  }

  return(
    <ul className="book-list">
      { books }
    </ul>
  );
}

export default BookList;
