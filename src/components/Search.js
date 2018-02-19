import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'

class Search extends Component {

  render () {
    const { filterBooks ,search, onShelfSelect } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" onChange={(event) => search(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {filterBooks.map((book) => (
              <Book key={book.id} book={book} changeShelf={onShelfSelect} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search