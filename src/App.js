import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter, Route } from 'react-router-dom'

const shelfNames = {
  currentlyReading: "Currently Reading",
  "wantToRead": "Want To Read",
  "read" : "Read"
}

class App extends React.Component {
  state = {
    shelfs: [],
    searchResult: []
  }

componentDidMount(){
    BooksAPI.getAll().then(books => {
    this.setState({ shelfs: this.arrangeInShelfs(books) });
    });
}

arrangeInShelfs(books){
  //define a search shelf if we are searching
  var searchShelfId = "searchShelf";
  //Get all the books that the user has put in shelfs already
  var allBooks = this.state.shelfs.reduce((books, shelf)=> {books.push(...shelf.books); return books;}, []);

//put the books in a shelf according to their shelf property value
 return books.reduce((shelfs, book) => {
   // Find the shelf in the aggregated shelfs array if the book has a shelf id, otherwise find the search shelf.
   var shelf = book.shelf ? shelfs.find(i=>i.id === book.shelf) : shelfs.find(i=> i.id === searchShelfId);
   //If we haven't found the shelf in the aggregated array:
	if(!shelf)
	{
      	//Create a new shelf with the shelf id specified by the first book found that belongs to that shelf.
		shelf = { id: book.shelf || searchShelfId, name: shelfNames[book.shelf], books: [] };
      	//Add it to the aggregated list of shelfs.
		shelfs.push(shelf);
	}
   // Put the book in the shelf that it belongs to.
   shelf.books.push(book);
   
   //Now, if the book has no shelf specified (the book came from the search API), let's check if the user already put in a shelf.
   if(!book.shelf)
     //This will help the Book component to select an option from the 'Move to' context menu.
     book.shelf = (allBooks.find(b => b.id === book.id) || { shelf:undefined }).shelf;
   
	return shelfs;
 }, []);
}

onSearch = e => {
  var query = e.target.value;
  if(query === "")
  {
    this.setState({searchResult: []});
    return;
  }
  
  BooksAPI.search(e.target.value)
  .then(books => { 
    var shelfs = this.arrangeInShelfs(books);
    this.setState({searchResult: shelfs}, () => console.log(this.state) );
  });
}

  render() {
    return (
	<BrowserRouter>
     <div className="app">
		<Route path="/" exact render={() => <BookCase shelfs={this.state.shelfs} />} />
		<Route path="/search" exact render={() => <SearchBooks shelfs={this.state.searchResult} onSearch={this.onSearch} />} />
	</div>
	</BrowserRouter>
    )
  }
}

export default App
