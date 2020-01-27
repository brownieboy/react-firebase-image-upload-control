import React, { useState } from "react";

import ReactFirebaseImageUploader from "react-firebase-image-uploader";

const UploadImages = ({ firebaseApp }) => {
  console.log("TCL: UploadImages -> firebaseApp", firebaseApp);
  return (
    <div>
      <ReactFirebaseImageUploader firebaseApp={firebaseApp} storageFolder="mikey" />
    </div>
  );
};

export default UploadImages;
