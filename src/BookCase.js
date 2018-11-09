import React from "react";
import Shelf from "./Shelf";

class BookCase extends React.Component
{
	render(){
		return (
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
          				<Shelf name="Currently Reading"/>
          				<Shelf name="Want to Read"/>
          				<Shelf name="Read"/>
					</div>
				</div>
				<div className="open-search">
					<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
				</div>
			</div>
		);
	}
}

export default BookCase;