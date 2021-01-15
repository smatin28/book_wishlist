import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import key from './Keys';
import BookList from './Components/BookList';
import Header from './Components/Header';
import LoginForm from './Components/LoginForm';
import SignupForm from './Components/SignupForm';
import Wishlist from './Components/Wishlist';
import SearchForm from './Components/SearchForm';
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Redirect
} from 'react-router-dom';

class App extends Component {

  constructor() {
      super();
      this.state = {
          books: [this.performSearch()],
          loading: true,
          displayed_form: '',
          logged_in: localStorage.getItem('token') ? true : false,
          username: '',
          email: '',
          user_pk: null,
          wishlist: ''
      }
  }

  componentDidMount() {
      if (this.state.logged_in) {
          fetch('http://localhost:8000/book_api/current_user/', {
              headers: {
                  Authorization: `JWT ${localStorage.getItem('token')}`
              }
          })
          .then(response => response.json())
          .then(jsonData => {
              this.setState({ username: jsonData.username});
          });
          this.getWishlist();
      }

  };

  getWishlist = () => {
      fetch('http://localhost:8000/book_api/api/book', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`
          }
      })
      .then(response => response.json())
      .then(data =>  this.state.wishlist = data)
      .then(() => console.log(this.state.wishlist))
  }

  handle_login = (e, data) => {
      e.preventDefault();
      fetch('http://localhost:8000/token-auth/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(jsonData => {
          localStorage.setItem('token', jsonData.token);
          this.setState({
              logged_in: true,
              displayed_form: '',
              username: jsonData.user.username,
              user_pk: jsonData.user.pk
          });
      })
      /*Retrieve wishlist once user logs in */
      .then(() => this.getWishlist() )
      .then(() => console.log(this.state.user_pk))
  };

  handle_signup = (e, data) => {
      e.preventDefault();
      fetch('http://localhost:8000/book_api/users/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              /*Authorization: `JWT ${localStorage.getItem('token')}`*/
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(jsonData => {
          localStorage.setItem('token', jsonData.token);
          this.setState({
              logged_in: true,
              displayed_form: '',
              username: jsonData.username,
              user_pk: jsonData.pk
          })
      })
      /*Retrieve wishlist once user signs up */
      .then(() => this.getWishlist())
      .then(() => console.log(this.state.user_pk))
  };

  handle_logout = () => {
      localStorage.removeItem('token');
      this.setState({
          logged_in: false,
          username: ''
      });
      this.performSearch();
  };

  display_form = form => {
      this.setState({
          displayed_form: form
      })
  }

  handle_wishlist = () => {
      this.setState({
          displayed_form: '',
          books: [],
          loading: false,
      })
  }

  handleAdd = (title, authors, date, description, url) => {

      if (date !== undefined) {
          if (date.includes("-") === false) {
              var date_formatted = `${date}` + "-01-01"
          } else {
          var date_formatted = date
          }
      } else {
          var date_formatted = null
      }
      fetch('http://localhost:8000/book_api/api/book/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              Authorization: `JWT ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
              "title": title,
              "authors": authors.join(", "),
              "published": date_formatted,
              "description": description,
              "user": this.state.user_pk,
              "imageURL": url.toString()
          })
      })
      .then(response => response.json())
      .then(() =>
          fetch('http://localhost:8000/book_api/api/book', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `JWT ${localStorage.getItem('token')}`
              }
          })
          .then(response => response.json())
          .then(data =>  this.state.wishlist = data)
          .then(() => console.log(date_formatted))
          .then(() => this.getWishlist())
      )

  }

  performSearch = (query = 'in') => {
      query = query.split(' ').join('+')
      console.log(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${key}`)
      axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=20&key=${key}`)
       .then( response => {
            // handle success
            this.setState({
                books: response.data.items,
                loading: false,
                displayed_form: ''
            });
        })
        .catch(error => {
        // handle error
          console.log('Error: ' + error);
      }).then(() => console.log(this.state.books))
  };

  handleDelete = id => {
      fetch(`http://localhost:8000/book_api/api/book/${id}/`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.text())
        .then(() => this.getWishlist())
        .then(() => this.handle_wishlist())
        .then(() =>
        <Wishlist
            pk={this.state.user_pk}
            wishlist={this.state.wishlist}
            books={this.state.books}
            handleDelete={this.handleDelete}
        />);
  };

  render() {
      let form;
      switch (this.state.displayed_form) {
          case 'login':
            form = <LoginForm handle_login={this.handle_login} />;
            break;
          case 'signup':
            form = <SignupForm handle_signup={this.handle_signup} />;
            break;
          default:
            form = null;
      }
      return (
        <BrowserRouter>
        <div className="App">
          <header>
            <Header
                onSearch={this.performSearch}
                logged_in={this.state.logged_in}
                display_form={this.display_form}
                handle_logout={this.handle_logout}
                handle_wishlist={this.handle_wishlist}
                user={this.state.username}
                pk={this.state.user_pk}
                wishlist={this.state.wishlist}
                books={this.state.books}
                handleDelete={this.handleDelete}
            />
          </header>
          <Switch>
            <Route exact path="/wishlist" render={ () => <Wishlist
                pk={this.state.user_pk}
                wishlist={this.state.wishlist}
                books={this.state.books}
                handleDelete={this.handleDelete}  /> } />
          </Switch>
          <div>
          {/*Contains search results */}

          {
              (form)
              ? <div>{form}</div>
              : (this.state.loading)
                ? <p>Loading...</p>
                : <BookList
                    data={this.state.books}
                    handleAdd={this.handleAdd}
                    loggedIn={this.state.logged_in}
                  />
          }

          </div>

        </div>
        </BrowserRouter>
      );
  }
}

export default App;
