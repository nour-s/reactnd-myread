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

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.


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

debounced = function (fn, delay) {
  let timerId;
  return function (...args) {
    //Simple hack to avoid loosing the event, if it is an event handler.
    if(args[0].persist)
      args[0].persist();
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }
}

onSearch = () =>
{	
  return this.debounced(e =>
  {
    var query = e.target.value;
    if(query === "")
    {
      this.setState({searchResult: []});
      return;
    }

    BooksAPI.search(query)
    .then(books => {
      var shelfs = books.error ? [] : this.arrangeInShelfs(books);
      this.setState({searchResult: shelfs});
    })
  }, 300);
}

onMoveBook = (bookId, shelfId) => {
  BooksAPI.update(bookId, shelfId)
  .then(res=> 
        BooksAPI.getAll().then(books => {
    		this.setState({ shelfs: this.arrangeInShelfs(books) });
    	})
    );
}

  render() {
    return (
	<BrowserRouter>
     <div className="app">
		<Route path="/" exact render={() => <BookCase onMoveBook={this.onMoveBook} shelfs={this.state.shelfs} />} />
		<Route path="/search" exact render={() => <SearchBooks shelfs={this.state.searchResult} onMoveBook={this.onMoveBook} onSearch={this.onSearch()} />} />
	</div>
	</BrowserRouter>
    )
  }
}

export default App
