import React from "react";
import { Link } from "react-router-dom";
import BookCase from "./BookCase";

class SearchBooks extends React.Component {
	constructor(props) {
		super(props);
		this.state = { searchQuery: props.initQuery || "" };
	}

	componentWillUnmount() {
		this.props.onClearSearch();
	}

	componentDidMount() {
		//If the search component was called with a search query specified already
		if (this.props.initQuery) {
			//Let's run the search for the first time
			this.props.onSearch(this.props.initQuery);
		}
	}

	// A handler for the search text box
	onValueChange = e => {
		var query = e.target.value;
		this.setState({ searchQuery: query });
		this.props.onSearch(query);
	};

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
							onChange={this.onValueChange}
							placeholder="Search by title or author"
							value={this.state.searchQuery}
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
