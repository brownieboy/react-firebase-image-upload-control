import React from "react";
import "./App.css";
import {initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider, GithubAuthProvider, TwitterAuthProvider, FacebookAuthProvider, signInWithEmailAndPassword} from "firebase/auth";
import "firebase/database";
import withFirebaseAuth from "react-with-firebase-auth";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";

import {CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ReactFirebaseImageUploader from "./package";
import Login from "./Login";

// You must supply this!
import firebaseConfigObj from "./firebaseconfig/firebase-config.json";
const firebaseApp = initializeApp(firebaseConfigObj);
const firebaseAppAuth = getAuth();

const providers = {
  googleProvider: new GoogleAuthProvider(),
  githubProvider: new GithubAuthProvider(),
  twitterProvider: new TwitterAuthProvider(),
  facebookProvider: new FacebookAuthProvider()
};

const App = props => {
  const {user} = props;

  const imageUploaderSharedProps = {
    firebaseApp,
    storageFolder: "rfiu-test"
  };

  return (
    <div className="App">
      <h1>React Firebase Image Uploader Test</h1>
      <Login {...props} />
      <div style={{marginTop: 40, marginBottom: 100}}>
        {user ? (
          <>
            <div>
              <h4>Vanilla Example</h4>
              <ReactFirebaseImageUploader
                {...imageUploaderSharedProps}
                multiple
              />
            </div>
            <div style={{marginTop: "40px"}}>
              <h4>Material with Circular Progress Bar Example</h4>
              <ReactFirebaseImageUploader
                {...imageUploaderSharedProps}
                progressControl={CircularProgressbar}
                checkboxControl={Checkbox}
                buttonControl={Button}
                uploadButtonIcon={CloudUploadIcon}
                removeButtonIcon={DeleteIcon}
                options={{
                  styles: {
                    // imgPreview: { maxWidth: "50px" },
                    imgPreviewLabel: {fontSize: "12px"},
                    progressControlWrapper: {height: 70, width: 70}
                  }
                }}
                multiple
                uploadStartCallback={fileToStore => {
                  console.log(
                    "uploadStartCallback triggered, and we're done!, fileToStore",
                    fileToStore
                  );
                }}
                uploadCompleteCallback={statusObj => {
                  console.log(
                    "uploadCompleteCallback triggered, and we're done!, statusObj",
                    statusObj
                  );
                }}
              />
            </div>
          </>
        ) : (
          <div>Login to upload images</div>
        )}
      </div>
    </div>
  );
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth
})(App);
