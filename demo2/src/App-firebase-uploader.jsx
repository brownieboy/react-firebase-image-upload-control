import React from "react";
import "./App.css";

const App = (props) => {
  const { user } = props;
  console.log("TCL ~ file: App.jsx ~ line 33 ~ App ~ user", user);

  return (
    <div className="App">
      <h1>React Firebase Image Uploader Test</h1>
    </div>
  );
};

// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(App);

export default App;
