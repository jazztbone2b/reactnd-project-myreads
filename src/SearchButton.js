import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchButton extends Component {
    render() {
        return (
            <Link to="/search" className="open-search">
              <button>Add a book</button>
            </Link>
        )
    }
}

export default SearchButton;