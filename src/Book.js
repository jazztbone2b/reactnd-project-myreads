import React, { Component } from 'react';

class Book extends Component {
    state = {
        bookShelf: null
    }

    componentDidMount() {
        this.updateShelf(this.props.book.shelf);
    }

    updateShelf = (shelfName) => {
        this.setState(() => ({
            bookShelf: shelfName
        }))
    }

    handleChange(book, event) {
        event.preventDefault();
        this.props.onChangeShelf(book, event.target.value);
        this.updateShelf(event.target.value);
    }

    render() {
        const book = this.props.book;

        return (
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})` }}></div>

                        <div className="book-shelf-changer">
                            <select value={this.state.bookShelf ? this.state.bookShelf : 'none'} onChange={(event) => this.handleChange(book, event)}>
                                <option disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <h3>{book.title}</h3>
                    <div>
                        {book.authors.map(author => (
                            <div key={author}>{author}</div>
                        ))}
                    </div>
                </div>
            </li>
        )
    }
}

export default Book;