import React, { useState } from "react";

import ReactFirebaseImageUploader from "./package";
// import ReactFirebaseImageUploader from "react-firebase-image-uploader";

const UploadImages = ({ firebaseApp }) => {
  // const [dummy, setDummy] = useState("");
  console.log("TCL: UploadImages -> firebaseApp", firebaseApp);
  return (
    <div>
      <ReactFirebaseImageUploader firebaseApp={firebaseApp} storageFolder="mikey" />
      I'm a imported boy with a hook
    </div>
  );
};

export default UploadImages;
