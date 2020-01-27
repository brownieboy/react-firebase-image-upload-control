import React, { useState } from "react";

import ReactFirebaseImageUploader from "./component/react-firebase-image-uploader.js";

const UploadImages = ({ firebaseApp }) => {
  return (
    <div>
      <ReactFirebaseImageUploader firebaseApp={firebaseApp} />
    </div>
  );
};

export default UploadImages;
