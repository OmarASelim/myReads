import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from '../BooksAPI'
import BookList from '../components/BookList'
import Search from '../components/Search'
import './App.css'

class App extends Component {
  state = {
    Books: [],
    filterBooks: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({Books: books})
    });
  }

  changeShelf = (event) => {
    BooksAPI.update({id: event.target.id}, event.target.value).then((response) => {
       BooksAPI.getAll().then((books) => {
        this.setState({Books: books})

      });
    });
  }

  search = (query) => {
    if (query) {
      BooksAPI.search(query).then((response) => {
          this.updateBooks(response)
          if (!response.error) {
            this.setState({filterBooks: response})
          } else {
            this.setState({filterBooks: []})
          }
        })
    } else {
      this.setState({filterBooks: []})
    }
  }
    updateBooks = (values) => {
    for (let value of values) {
      for (let book of this.state.Books) {
        if (value.id === book.id) {
          value.shelf = book.shelf
        }
      }
    }
    this.setState({filterBooks: values})
  }


  render() {
    const { Books } = this.state;
    return (
      <div className="app">
        <Route exact path='/' render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookList title='Currently Reading' books={Books.filter((book) => book.shelf === 'currentlyReading')} changeShelf={this.changeShelf}  />
                <BookList title='Want to Read' books={Books.filter((book) => book.shelf === 'wantToRead')} changeShelf={this.changeShelf}  />
                <BookList title='Read' books={Books.filter((book) => book.shelf === 'read')} changeShelf={this.changeShelf}  />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
        />
        <Route path='/search' render={({history})=>(
          <Search search={(query) => this.search(query)} filterBooks={this.state.filterBooks} onShelfSelect={(event)=>{
            this.changeShelf(event)
            history.push('/')
          }}/>
        )}
        />
      </div>
    )
  }
}

export default App