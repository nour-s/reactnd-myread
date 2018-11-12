import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'
import * as BooksAPI from './BooksAPI'

class App extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    shelfs: [],
    showSearchPage: false
  }

constructor() {
  super();
  this.onOpenSearch = this.onOpenSearch.bind(this);
  this.onCloseSearch = this.onCloseSearch.bind(this);

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

onOpenSearch(){
 this.setState({ showSearchPage: true }); 
}

onCloseSearch(){
 this.setState({ showSearchPage: false }); 
}

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (<SearchBooks onCloseSearch={this.onCloseSearch}  />) : (<BookCase shelfs={this.state.shelfs} onOpenSearch={this.onOpenSearch} />)}
      </div>
    )
  }
}

export default App
