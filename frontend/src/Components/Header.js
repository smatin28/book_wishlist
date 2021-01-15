import SearchForm from './SearchForm';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Wishlist from './Wishlist';

export default class Header extends Component {
    logged_out_nav = (
        <ul>
            <li className="search-bar"><SearchForm onSearch={this.props.onSearch}/></li>
            <li onClick={() => this.props.display_form('login')}
                className="users"><NavLink to="/">Login</NavLink></li>
            <li onClick={() => this.props.display_form('signup')}
                className="users"><NavLink to="/">Sign Up</NavLink></li>
        </ul>
    );

    logged_in_nav = (
        <ul>
            <li className="search-bar"><SearchForm onSearch={this.props.onSearch} wishlist={this.props.wishlist}/></li>
            <li className="users"
                onClick={() => this.props.handle_logout()}><NavLink to="/">Log Out</NavLink></li>
            <li className="users"
                onClick={() => this.props.handle_wishlist()}><NavLink to="/wishlist">My Wishlist</NavLink></li>
        </ul>
    )
    render() {
      return (
          <div className="App-header">{(this.props.logged_in)
              ? this.logged_in_nav
              : this.logged_out_nav}
          </div>
      );
    }
}

Header.propTypes = {
    logged_in: PropTypes.bool.isRequired,
    display_form: PropTypes.func.isRequired,
    handle_logout: PropTypes.func.isRequired,
    /* handle_wishlist: PropTypes.func.isRequired */
}
