import React from "react";

const App = ({
  onUploadStart,
  storageRef,
  metadata,
  randomizeFilename,
  filename,
  hidden = true,
  style = {}
}) => {

  const inputStyle = {
    ...style,
    ...(hidden && {
      width: "0.1px",
      height: "0.1px",
      opacity: 0,
      overflow: "hidden",
      position: "absolute",
      zIndex: -1
    })
  };
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
