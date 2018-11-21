import React from "react";
import Book from "./Book";
import PropTypes from "prop-types";

class Shelf extends React.Component {
	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.shelf.name}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{this.props.shelf.books.map(book => (
							<li key={book.id}>
								<Book
									book={book}
									onMoveBook={this.props.onMoveBook}
								/>
							</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}

Shelf.propTypes = {
	shelf: PropTypes.shape({
		books: PropTypes.array
	}),
	onMoveBook: PropTypes.func
};

export default Shelf;
