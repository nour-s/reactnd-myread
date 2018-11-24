import React from "react";
import renderer from "react-test-renderer";
import Book from "../Book";
import { mount } from "enzyme";

describe("Book test", () => {
	let rawComponent;
	let onMoveBook;
	let book = {
		title: "a book",
		shelf: "a shelf",
		authors: ["author 1", "author 2"],
		imageLinks: { thumbnail: "url" }
	};

	beforeEach(() => {
		onMoveBook = jest.fn();
		rawComponent = <Book onMoveBook={onMoveBook} book={book} />;
	});

	it("Book should match snapshot", () => {
		let component = renderer.create(rawComponent);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Book - move book to a shelf should work", () => {
		var wrapper = React.createElement(() => rawComponent);
		// I don't know why mount(rawComponent) doesn't work, and I have to do a work-around
		let component = mount(wrapper);
		const select = component.find("select").first();
		expect(select).toBeDefined();
		select.simulate("change", { target: { value: "read" } });
		expect(onMoveBook).toBeCalledWith(book, "read");
	});
});
