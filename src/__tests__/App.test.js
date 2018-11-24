import React from "react";
import renderer from "react-test-renderer";
import App from "../App";
import * as BooksAPI from "../BooksAPI";
import { mount } from "enzyme";
import { MemoryRouter } from "react-router";

describe("App test", () => {
	let onMoveBook;
	let onSearch;
	let onClearSearch;
	let rawComponent;
	let booksget;

	let shelfs = [
		{
			id: "read",
			name: "Read",
			books: [{ id: 1, title: "Title 1", shelf: "read" }]
		},
		{
			id: "wantToRead",
			name: "Want To Read",
			books: [{ id: 2, title: "Title 2", shelf: "wantToRead" }]
		}
	];
	//jest.setTimeout(30000);
	let books = [
		{ id: 1, title: "Title 1", shelf: "read" },
		{ id: 2, title: "Title 2", shelf: "wantToRead" }
	];

	beforeEach(() => {
		// spyOn(BooksAPI, "getAll").and.returnValue(Promise.resolve(books));
		//booksget = spyOn(BooksAPI, "getAll");
		BooksAPI["getAll"] = () => Promise.resolve(books);

		onMoveBook = jest.fn();
		onSearch = jest.fn();
		onClearSearch = jest.fn();

		rawComponent = (
			<MemoryRouter initialEntries={["/", "/search"]} initialIndex={1}>
				<App />
			</MemoryRouter>
		);
	});

	it("App should match snapshot", () => {
		const component = renderer.create(rawComponent);
		let tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("App should have a BookCase component with proper props", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);
		let app = component.find("App");
		let bookCase = component.find("BookCase");

		// app.setState({ shelfs: shelfs });

		expect(bookCase).toBeDefined();
		// expect(bookCase.prop("shelfs")).toEqual(shelfs);
	});
});
