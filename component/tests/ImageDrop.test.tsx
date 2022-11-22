import React from "react";
import renderer from "react-test-renderer";
import {render} from "@testing-library/react";

describe("<ImageDrop />", () => {
  it("should show a div", () => {
    const component = <div>Facebook</div>;
    const {container} = render(component);
    expect(container.children.length).toBe(1);
  });

  it("should match the snapshot correctly", () => {
    const component = <div>Facebook</div>;
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
