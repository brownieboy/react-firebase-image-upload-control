import React from "react";
import renderer from "react-test-renderer";
import {render} from "@testing-library/react";
import FirebaseUploader from "../src/FirebaseUploader";

const dummyFirebaseApp = {
  name: "rfiu",
  options: {},
  automaticDataCollectionEnabled: false
};

describe("<FirebaseUploader />", () => {
  it("should show a component", () => {
    const component = (
      <FirebaseUploader
        firebaseApp={dummyFirebaseApp}
        storageFolder={"rfiu-test"}
      />
    );
    const {container} = render(component);
    expect(container.children.length).toBe(4);
  });

  it("should match the snapshot correctly", () => {
    const component = (
      <FirebaseUploader
        firebaseApp={dummyFirebaseApp}
        storageFolder="rfiu-test"
      />
    );
    const tree = renderer.create(component).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
