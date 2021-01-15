import React from 'react';

const Delete = props => (
  <button className="wishlist-buttons" onClick={() => props.handleDelete(props.book_id)}>Remove</button>
);

export default Delete;
