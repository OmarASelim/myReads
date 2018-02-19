import React, { Component } from 'react'

import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    width                 : '85%',
    height                : '400px',
    transform             : 'translate(-50%, -50%)'
  }
};



class Book extends Component {
   constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#2e7c31';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  

  render () {
    const { book, changeShelf, value } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
            <div className="book-shelf-changer">
            
           
              <select id={book.id} value={book.shelf} onChange={changeShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>

          <div className="book-title"> 
              <a href="#" onClick={this.openModal}>{book.title}</a> 
          </div>
          
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >

          <h2 ref={subtitle => this.subtitle = subtitle}>{book.title}</h2>
          
          <div className="book">
            <div className="book-top">
              <div className="back-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})`}}></div>
              <div className="book-shelf-changer">
                <select id={book.id} value={value} onChange={changeShelf}>
                  <option value="none" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
            </div>
          </div>
          
          <p>Rating: {book.averageRating}</p>
          <p>Written by: {book.authors}</p>
          <p>Categories: {book.categories}</p>
          <p>{book.description}</p>
          <button onClick={this.closeModal}>close</button>
        </Modal>
        {book.authors &&
          book.authors.map(author =>
            <div key={author} className="book-authors">
              {author}
            </div>
          )}
        </div>
      </li>
    )
  }
}

export default Book