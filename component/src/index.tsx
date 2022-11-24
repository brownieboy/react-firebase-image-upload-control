import React from "react";
import FirebaseUploader, {FirebaseUploadImageProps, ExtendedFile} from "./FirebaseUploader";

const App = (props: FirebaseUploadImageProps) => (
  <FirebaseUploader {...props} />
);

export default App;
export {ExtendedFile, FirebaseUploadImageProps};
