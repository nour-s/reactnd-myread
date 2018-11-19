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
    this.setState({ shelfs: this.categorizeBooks(books) });
    });
}

categorizeBooks(books){
  console.log("categorize: " , books);
 return books.reduce((result, book) => {
   var shelf = result.find(i=>i.id === book.shelf);
	if(!shelf)
	{
		shelf = { id: book.shelf, name: shelfNames[book.shelf], books: [] };
		result.push(shelf);
	}
   shelf.books.push(book);
	return result;
 }, []);
}

groupBy = function(array, key) {
  return array.reduce(function(aggregated, item) {
    (aggregated[item[key]]=aggregated[item[key]] || []).push(item);
    return aggregated;
  }, {});
};

onSearch = e => {
  var query = e.target.value;
  if(query === "")
  {
    this.setState({searchResult: []});
    return;
  }
  BooksAPI.search(e.target.value)
  .then(result => { 
    // console.log("Found books", result);
    this.setState({searchResult: this.categorizeBooks(result)});
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
