import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'

class Search extends Component {
  state = {
    query: []
  }
   clearQuery = () => {
    this.setState({query: ''})
  }

  search = (event) => {
    if (event.target.value.length < 1) {
      return true;
    }
    BooksAPI.search(event.target.value, 25).then((books) => {
      if (books.error === undefined) {
        this.setState({query: books});
      } else {
        this.setState({query: []});
      }
    });
  }

  render () {
    const { query } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={this.search}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {query.map((book) => (
              <Book key={book.id} book={book} changeShelf={this.props.onShelfSelect} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search