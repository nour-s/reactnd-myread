// Auto-generated do not edit

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import React from "react";
import renderer from "react-test-renderer";
import SearchBooks from "../SearchBooks";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";

describe("SearchBooks test", () => {
	let onMoveBook;
	let onSearch;
	let onClearSearch;
	let rawComponent;

	let shelfs = [
		{ id: "shelf 1", books: [{ id: 1, title: "Title 1" }] },
		{ id: "shelf 2", books: [{ id: 2, title: "Title 2" }] }
	];

	beforeEach(() => {
		onMoveBook = jest.fn();
		onSearch = jest.fn();
		onClearSearch = jest.fn();

		rawComponent = (
			<MemoryRouter>
				<SearchBooks
					initQuery={"anyQuery"}
					shelfs={shelfs}
					onMoveBook={onMoveBook}
					onSearch={onSearch}
					onClearSearch={onClearSearch}
				/>
			</MemoryRouter>
		);
	});

	it("SearchBooks should match snapshot", () => {
		const component = renderer.create(rawComponent);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("SearchBooks should have a link to main page", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);

		expect(component.find("Link").prop("to").pathname).toBe("/");
	});

	it("SearchBooks should have a BookCase component with proper props", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);

		expect(component.find("BookCase")).toBeDefined();
		expect(component.find("BookCase").prop("shelfs")).toBe(shelfs);
		expect(component.find("BookCase").prop("onMoveBook")).toBe(onMoveBook);
	});

	it("SearchBooks should have the text box populated with default query", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);
		var input = component.find("input");
		expect(input.prop("value")).toBe("anyQuery");
	});

	it("SearchBooks should have the text box populated with default query", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);
		var input = component.find("input");
		input.simulate("change", { target: { value: "newQuery" } });
		expect(onSearch).toBeCalledWith("newQuery");
	});

	it("SearchBooks should clear the search text box when unmounted", () => {
		const wrapper = React.createElement(() => rawComponent);
		let component = mount(wrapper);
		component.unmount();
		expect(onClearSearch).toBeCalled();
	});
});
