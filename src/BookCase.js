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
          				 {this.props.shelfs.map(shelf => (<Shelf key={shelf.shelf} shelf={shelf}/>))}
					</div>
				</div>
				<div className="open-search">
					<a onClick={() => this.props.onOpenSearch() }>Add a book</a>
				</div>
			</div>
		);
	}
}

export default BookCase;