import React from "react";
import PropTypes from "prop-types";

class Book extends React.Component {
	options = [
		{ value: "move", text: "Move to...", disabled: true },
		{ value: "currentlyReading", text: "Currently Reading" },
		{ value: "read", text: "Read" },
		{ value: "none", text: "None" }
	];

	onShelfChanged = select => {
		var shelfId = select.target.value;
		this.props.onMoveBook(this.props.book, shelfId);
	};

	render() {
		var book = this.props.book;
		return (
			<div className="book">
				<div className="book-top">
					<div
						className="book-cover"
						style={{
							width: 128,
							height: 193,
							backgroundImage: `url(${
								(book.imageLinks || { thumbnail: "" }).thumbnail
							})`
						}}
					/>
					<div className="book-shelf-changer">
						<select
							value={book.shelf || "none"}
							onChange={this.onShelfChanged}
						>
							{this.options.map(o => (
								<option
									key={o.value}
									value={o.value}
									disabled={o.disabled || false}
								>
									{o.text}
								</option>
							))}
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				{book.authors && (
					<div className="book-authors">
						{book.authors.reduce(
							(all, author) => `${all} - ${author}`
						)}
					</div>
				)}
			</div>
		);
	}
}

Book.propTypes = {
	book: PropTypes.shape({
		title: PropTypes.string,
		shelf: PropTypes.string,
		authors: PropTypes.array,
		imageLinks: PropTypes.shape({
			thumbnail: PropTypes.string
		})
	})
};
export default Book;
