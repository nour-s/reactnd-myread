import React from "react";
import "./App.css";
import BookCase from "./BookCase";
import SearchBooks from "./SearchBooks";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Route } from "react-router-dom";
import { debounced } from "./Util";

//Map the shelf id to a friendly name.
const shelfNames = {
	currentlyReading: "Currently Reading",
	wantToRead: "Want To Read",
	read: "Read"
};

class App extends React.Component {
	state = {
		shelfs: [], // the list of shelfs with books inside them
		searchResult: [] // the search results if the Search component runs one
	};

	componentDidMount() {
		// When we first mount the component, let's bring the user books (arranged in shelfs).
		BooksAPI.getAll().then(books => {
			this.setState({ shelfs: this.arrangeInShelfs(books) });
		});
	}

	arrangeInShelfs(books) {
		//define a search shelf if we are searching
		var searchShelfId = "searchShelf";
		//Get all the books that the user has put in shelfs already
		var allBooks = this.state.shelfs.reduce((books, shelf) => {
			books.push(...shelf.books);
			return books;
		}, []);

		//put the books in a shelf according to their shelf property value
		return books.reduce((shelfs, book) => {
			// Find the shelf in the aggregated shelfs array if the book has a shelf id, otherwise find the search shelf.
			var shelf = book.shelf
				? shelfs.find(i => i.id === book.shelf)
				: shelfs.find(i => i.id === searchShelfId);
			//If we haven't found the shelf in the aggregated array:
			if (!shelf) {
				//Create a new shelf with the shelf id specified by the first book found that belongs to that shelf.
				shelf = {
					id: book.shelf || searchShelfId,
					name: shelfNames[book.shelf],
					books: []
				};
				//Add it to the aggregated list of shelfs.
				shelfs.push(shelf);
			}
			// Put the book in the shelf that it belongs to.
			shelf.books.push(book);

			//Now, if the book has no shelf specified (the book came from the search API), let's check if the user already put in a shelf.
			if (!book.shelf)
				//This will help the Book component to select an option from the 'Move to' context menu.
				book.shelf = (
					allBooks.find(b => b.id === book.id) || { shelf: undefined }
				).shelf;

			return shelfs;
		}, []);
	}

	onSearch = debounced(query => {
		if (query === "") {
			this.setState({ searchResult: [] });
			return;
		}

		BooksAPI.search(query).then(books => {
			var shelfs = books.error ? [] : this.arrangeInShelfs(books);
			this.setState({ searchResult: shelfs });
		});
	}, 300);

	// Handle clearing the search results
	onClearSearch = () =>
		this.setState({
			searchResult: []
		});

	// Handle moving the book to the passed shelf.
	onMoveBook = (book, shelfId) => {
		return BooksAPI.update(book, shelfId).then(res => {
			// Reflect the change on the book object passed.
			book.shelf = shelfId;
			BooksAPI.getAll().then(books => {
				this.setState({ shelfs: this.arrangeInShelfs(books) });
			});
		});
	};

	render() {
		return (
			<BrowserRouter>
				<div className="app">
					<Route
						path="/"
						exact
						render={() => (
							<BookCase
								onMoveBook={this.onMoveBook}
								shelfs={this.state.shelfs}
							/>
						)}
					/>
					<Route
						path="/search:query?"
						exact
						render={props => (
							<SearchBooks
								shelfs={this.state.searchResult}
								onMoveBook={this.onMoveBook}
								onSearch={this.onSearch}
								onClearSearch={this.onClearSearch}
								initQuery={new URLSearchParams(
									props.location.search
								).get("query")}
							/>
						)}
					/>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
