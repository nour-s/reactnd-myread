import React from "react";
import { Link } from "react-router-dom";
import BookCase from "./BookCase";

class SearchBooks extends React.Component {
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={{ pathname: "/" }}>
            Close{" "}
          </Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input
              type="text"
              onChange={this.props.onSearch}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {this.props.shelfs.length > 0 && (
            <BookCase
              shelfs={this.props.shelfs}
              onMoveBook={this.props.onMoveBook}
            />
          )}
          <ol className="books-grid" />
        </div>
      </div>
    );
  }
}

export default SearchBooks;
