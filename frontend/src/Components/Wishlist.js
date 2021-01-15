import React from 'react';
import axios from 'axios';
import Book from './Book';
import Delete from './Delete';

const Wishlist = (props) => {
    var wishlist = props.wishlist.filter(book => book.user === props.pk)
    wishlist = wishlist.map(book => {
        return (
        <li
            className="book"
            key={book.id}
        >
          <h1>{book.title}</h1>
          <h2>By: {book.authors}</h2>
          <h3>Date published: {book.published}</h3>
          <img src={book.imageURL} alt="" />
          <h4 >Description: </h4>
          <p>{book.description}</p>
          <Delete
            book_id={book.id}
            handleDelete={props.handleDelete}
          />
        </li>
    )});
    if (props.books.length !== 0) {
        return (<p></p>)
    } else {
    return (
        <ul className="book-list">
            { wishlist }
        </ul>


)}};



export default Wishlist;
