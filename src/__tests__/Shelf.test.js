import React from "react";
import renderer from "react-test-renderer";
import Shelf from "../Shelf";
import { mount } from "enzyme";

describe("Shelf test", () => {
	let shelf = { id: "shelf 1", books: [{ id: 1, title: "Title 1" }] };
	let onMoveBook;
	let rawComponent;

	beforeEach(() => {
		onMoveBook = jest.fn();
		rawComponent = <Shelf shelf={shelf} onMoveBook={onMoveBook} />;
	});

	it("Shelf should match snapshot", () => {
		const component = renderer.create(rawComponent);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("Shelf should render the proper number of Book component", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);
		expect(component.find("Book")).toHaveLength(1);
	});

	it("Shelf should pass onMoveBook function to books", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);

		component.find("Book").forEach(b => {
			expect(b.prop("onMoveBook")).toBe(onMoveBook);
		});
	});
});
