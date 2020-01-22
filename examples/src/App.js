import React from "react";
import "./App.css";
import MyModule from "./dist/index.js";

function App() {
  return (
    <div className="App">
      <h1>My Module Test</h1>
      <MyModule />
    </div>
  );
}

export default App;
