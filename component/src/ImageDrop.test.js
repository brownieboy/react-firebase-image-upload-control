import React from "react";
import renderer from "react-test-renderer";

test("Div renders correctly", () => {
  const tree = renderer
    .create(<div>Facebook</div>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
