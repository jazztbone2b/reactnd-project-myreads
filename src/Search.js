import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksApi from './BooksAPI';
import * as PropTypes from 'prop-types';
import Book from './Book';

class Search extends Component {
    static propTypes = {
        usersBooks: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }

    state = {
        query: '',
        books: undefined
    }

    updateQuery = async (query) => {
        await this.setState(() => ({
            query: query
        }))

        this.fetchBooks();
    }

    fetchBooks = async () => {
        await BooksApi.search(this.state.query.trim())
            .then((searchResults) => {
                if (!searchResults || searchResults.error) {
                    this.setState(() => ({
                        books: undefined
                    }))
                }
                else {
                    // set the shelf if the book exists in the user's books
                    const filteredBooks = searchResults.map(book => this.checkIfBookExists(book));

                    this.setState(() => ({
                        books: filteredBooks
                    }))
                }
            })
            .catch(error => console.log(error))
    }

    checkIfBookExists = (book) => {
        this.props.usersBooks.find(item => item.id === book.id ?  book.shelf = item.shelf : book.shelf = null)


        return book;
    }

    callTwo = () => {
        this.props.onChangeShelf();
        this.checkBooks();
    }

    render() {
        const { query, books } = this.state;

        return (
            <div className="search-books">
            <div className="search-books-bar">
                <Link to="/">
                    <button className="close-search">Close</button>
                </Link>

                <div className="search-books-input-wrapper">
                    <input 
                        type="text"
                        placeholder="Search by title or author"
                        value={query}
                        onChange={(event) => this.updateQuery(event.target.value)}
                    />
                </div>
            </div>

            <div className="search-books-results">
              <ol className="books-grid">
                  {books && books.length > 0 ? 
                    books.map((item) => (
                        item.authors && item.imageLinks ?
                        <div key={item.id}>
                            <Book book={item} onChangeShelf={this.props.onChangeShelf}/>
                        </div> : null
                    )) :
                    <div>No books were found.</div>
                    }
              </ol>
            </div>
          </div>
        )
    }
}

export default Search;