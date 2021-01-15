import React from 'react';

const AddToWishlist = (props) => {
    return (
        <button className="wishlist-buttons" onClick={() => props.handleAdd(
            props.title,
            props.authors,
            props.date,
            props.description,
            props.url
        )}>Add</button>
    )
}

export default AddToWishlist;
