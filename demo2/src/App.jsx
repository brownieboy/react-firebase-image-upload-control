import React from "react";
import AppFirebaseUploader from "./App-firebase-uploader";

class App extends React.Component {
  render() {
    return (
      <>
        <h2>Uploader App Wrapper</h2>
        <AppFirebaseUploader />
      </>
    );
  }
}

export default App;
