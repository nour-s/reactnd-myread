import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from './BookCase'
import SearchBooks from './SearchBooks'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

constructor(){
  super();
  this.onOpenSearch = this.onOpenSearch.bind(this);
  this.onCloseSearch = this.onCloseSearch.bind(this);
  
}

onOpenSearch(){
 this.setState({ showSearchPage: true }); 
}

onCloseSearch(){
 this.setState({ showSearchPage: false }); 
}

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (<SearchBooks onCloseSearch={this.onCloseSearch}  />) : (<BookCase onOpenSearch={this.onOpenSearch} />)}
      </div>
    )
  }
}

export default BooksApp
