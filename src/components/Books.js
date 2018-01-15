import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.array
}

function BookShelf({title, books, onChangeShelf}) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
          ))}
        </ol>
      </div>
    </div>
  )
}

export default BookShelf