import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'
import { BrowserRouter, Route } from 'react-router-dom'

class App extends React.Component {
  state = {
    shelfs: []
  }

componentDidMount(){
  console.log('componentDidMount');
    BooksAPI.getAll().then(books => {
    this.setState({ shelfs: this.categorizeBooks(books) }, ()=> { console.log("Callback" , this.state)});
    });
}

categorizeBooks(books){
 return books.reduce((result, book) => {
   var shelf = result.find(i=>i.shelf === book.shelf);
	if(!shelf)
	{
		shelf = { shelf: book.shelf, books: [] };
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

  render() {
    return (
	<BrowserRouter>
     <div className="app">
		<Route path="/" exact render={() => <BookCase shelfs={this.state.shelfs} />} />
		<Route path="/search" exact render={() => <SearchBooks />} />
	</div>
	</BrowserRouter>
    )
  }
}

export default App
