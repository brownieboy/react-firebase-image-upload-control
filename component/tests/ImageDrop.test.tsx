import React from "react";
import renderer from "react-test-renderer";
import {render} from "@testing-library/react";
import ImageDrop from "../src/ImageDrop";

describe("<ImageDrop />", () => {
  it("should show a component", () => {
    const component = <ImageDrop />;
    const {container} = render(component);
    expect(container.children.length).toBe(1);
  });

  it("should match the snapshot correctly", () => {
    const component = <ImageDrop />;
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
