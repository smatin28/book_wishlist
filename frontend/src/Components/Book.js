import React from 'react';
import AddToWishlist from './AddToWishlist';

const Book = props => {
    if (props.loggedIn) {
        return (
            <li className="book">
              <h1>{props.title}</h1>
              <h2>By: {(props.authors)
                  ? props.authors.join(', ')
                  : ''}</h2>
              <h3>Date published: {props.date}</h3>
              <img src={props.imageURL} alt="" />
              <h4 >Description: </h4>
              <p>{props.description}</p>
              <AddToWishlist
                      title={props.title}
                      authors={props.authors}
                      date={props.date}
                      description={props.description}
                      url={props.imageURL}
                      handleAdd={props.handleAdd}
              />
            </li>
        )
    } else {
        return (
            <li className="book">
              <h1>{props.title}</h1>
              <h2>By: {(props.authors)
                  ? props.authors.join(', ')
                  : ''}</h2>
              <h3>Date published: {props.date}</h3>
              <img src={props.imageURL} alt="" />
              <h4 >Description: </h4>
              <p>{props.description}</p>
            </li>            
        )

    }


};

export default Book;
