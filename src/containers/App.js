import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom'

import * as BooksAPI from '../BooksAPI'
import BookShelf from '../components/Books'
import Search from '../components/Search'
import './App.css'

class App extends Component {
  state = {
    Books: []
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
                <BookShelf title='Currently Reading' books={Books.filter((book) => book.shelf === 'currentlyReading')} onChangeShelf={this.changeShelf} />
                <BookShelf title='Want to Read' books={Books.filter((book) => book.shelf === 'wantToRead')} onChangeShelf={this.changeShelf} />
                <BookShelf title='Read' books={Books.filter((book) => book.shelf === 'read')} onChangeShelf={this.changeShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        )}
        />
        <Route path='/search' render={({history})=>(
          <Search onShelfSelect={(event)=>{
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