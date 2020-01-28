import React from "react";

import ReactFirebaseImageUploader from "./package";

const UploadImages = ({ firebaseApp, storageFolder = "rfiu" }) => {
  return (
    <div>
      <ReactFirebaseImageUploader
        firebaseApp={firebaseApp}
        storageFolder={storageFolder}
      />
    </div>
  );
};

export default UploadImages;
