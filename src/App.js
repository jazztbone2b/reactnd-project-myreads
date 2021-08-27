import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom';
import './App.css'
import Header from './Header';
import BookShelf from './BookShelf';
import SearchButton from './SearchButton';
import Search from './Search';

class BooksApp extends React.Component {
  state = {
    allBooks: [],
    bookTypes: ['currentlyReading', 'wantToRead', 'read']
  }

  componentDidMount = () => {
    BooksAPI.getAll()
      .then((allBooks) => {
        this.setState(() => ({
          allBooks
        }))
      })
      .catch(error => console.log(error))
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        if (this.state.allBooks.find(item => item.id === book.id)) {
          // if the book already exists, find it and replace it with the updated book
          const updatedBooks = this.state.allBooks.map(x => {
            if (x.id === book.id) {
                x.shelf = shelf
            }
            return x;
          });

          // set the state to equal the updatedBooks array
          this.setState(() => ({
            allBooks: updatedBooks
          }))
        } else {
          // otherwise, add the book to the allBooks array

          // set the book's shelf
          book.shelf = shelf;

          // add it
          this.setState((currentState) => ({
            allBooks: currentState.allBooks.concat([book])
          }))
        }
      })
      .catch(error => console.log(error))
  }

  render() {
    const allBooks = this.state.allBooks;

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books-content">
            <Header />
            {this.state.bookTypes.map(item => (
              <div key={item}>
                <BookShelf
                books={allBooks}
                bookType={item}
                onChangeShelf={(book, shelf) => {
                  this.changeShelf(book, shelf);
                }}/>
              </div>
            ))}

            <SearchButton />
          </div>
        )} />

        <Route path='/search' render={() => (
          <Search 
          usersBooks={allBooks}
          onChangeShelf={(book, shelf) => {
            this.changeShelf(book, shelf);
          }}/>
        )} />
      </div>
    )
  }
}

export default BooksApp;
