import React from "react";
import PropTypes from "prop-types";
import Shelf from "./Shelf";
import { Link } from "react-router-dom";

class BookCase extends React.Component {
	render() {
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						{this.props.shelfs.map(shelf => (
							<Shelf
								onMoveBook={this.props.onMoveBook}
								key={shelf.id}
								shelf={shelf}
							/>
						))}
					</div>
				</div>
				<div className="open-search">
					{(this.props.showSearchLink || false) && (
						<Link to={{ pathname: "/search" }}>Add a book</Link>
					)}
				</div>
			</div>
		);
	}
}

BookCase.propTypes = {
	shelfs: PropTypes.array
};

export default BookCase;
