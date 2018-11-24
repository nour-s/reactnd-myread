import React from "react";
import renderer from "react-test-renderer";
import BookCase from "../BookCase";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";

describe("BookCase test", () => {
	let shelfs = [
		{ id: "shelf 1", books: [{ id: 1, title: "Title 1" }] },
		{ id: "shelf 2", books: [{ id: 2, title: "Title 2" }] }
	];
	let rawComponent = (
		<MemoryRouter>
			<BookCase shelfs={shelfs} showSearchLink={true} />
		</MemoryRouter>
	);
	it("BookCase should match snapshot", () => {
		const component = renderer.create(rawComponent);
		const tree = component.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("BookCase should have a link to the Search page", () => {
		const component = mount(React.createElement(() => rawComponent));
		var link = component.find("Link");
		expect(link.prop("to").pathname).toBe("/search");
	});
});
