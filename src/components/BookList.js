import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

BookList.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array
}

function BookList({title, books, changeShelf, value}) {
  
  return (
  
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} value={book.shelf} changeShelf={changeShelf} />

          ))}
        </ol>
      </div>
    </div>
  )
}

export default BookList