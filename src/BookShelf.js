import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Book from './Book';

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        bookType: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired,
    }
    
    render() {
        const books = this.props.books;
        const bookType = this.props.bookType;

        let title;

        // set the shelf title
        switch(bookType) {
            case('currentlyReading'):
                title = 'Currently Reading';
                break;
            case('wantToRead'):
                title = 'Want to Read';
                break;
            case('read'):
                title = 'Read';
                break;
            default:
                break;
        }

        return (
            // Filter for books based on book type
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter((x) => x.shelf === bookType).map(item => (
                                <span key={item.id}>
                                    <Book book={item} onChangeShelf={this.props.onChangeShelf}/>
                                </span>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf;