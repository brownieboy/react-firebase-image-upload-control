import React from "react";
import FirebaseUploader, {FirebaseUploadImageProps} from "./FirebaseUploader";

const App = (props: FirebaseUploadImageProps) => (
  <FirebaseUploader {...props} />
);

export default App;
export {FirebaseUploadImageProps};
