import React from 'react'

class Book extends React.Component
{
  
onShelfChanged = (select) => {
  var shelfId = select.target.value;
 this.props.onMoveBook(this.props.book, shelfId);
}
  
	render(){
      var book = this.props.book;
     	return (
          <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${(book.imageLinks || {thumbnail:''}).thumbnail })` }}>
							</div>
                            <div className="book-shelf-changer">
                              <select value={book.shelf || "none"} onChange={ this.onShelfChanged }>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
						{ book.authors && <div className="book-authors">{book.authors.reduce((all, author)=> `${all} - ${author}`)}</div> }
                        </div>
		);
	}
}

export default Book;