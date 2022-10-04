import React from "react";

const App = props => {
  console.log("TCL ~ file: index.js ~ line 4 ~ props", props);
  return (
    <input
      type="file"
      // onChange={this.handleFileSelection}
      // {...props}
      // style={inputStyle}
    />
  );
};

export default App;
