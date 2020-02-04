import React from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import withFirebaseAuth from "react-with-firebase-auth";
import Checkbox from "@material-ui/core/Checkbox";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ReactFirebaseImageUploader from "./package";
import Login from "./Login";

// You must supply this!
import firebaseConfigObj from "./firebaseconfig/firebase-config.json";
const firebaseApp = firebase.initializeApp(firebaseConfigObj);
const firebaseAppAuth = firebaseApp.auth();

const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  githubProvider: new firebase.auth.GithubAuthProvider(),
  twitterProvider: new firebase.auth.TwitterAuthProvider(),
  facebookProvider: new firebase.auth.FacebookAuthProvider()
};

const App = props => {
  const { user } = props;

  return (
    <div className="App">
      <h1>React Firebase Image Uploader Test</h1>
      <Login {...props} />
      <div style={{ marginTop: 40, marginBottom: 100 }}>
        {user ? (
          <>
            <div>
              <h4>Vanilla Example</h4>
              <ReactFirebaseImageUploader
                firebaseApp={firebaseApp}
                storageFolder="rfiu-test"
                // multiple
              />
            </div>
            <div style={{ marginTop: "40px" }}>
              <h4>Material with Circular Progress Bar Example</h4>
              <ReactFirebaseImageUploader
                firebaseApp={firebaseApp}
                storageFolder="rfiu-test"
                progressControl={CircularProgressbar}
                checkboxControl={Checkbox}
                buttonControl={Button}
                uploadButtonIcon={CloudUploadIcon}
                removeButtonIcon={DeleteIcon}
                options={{
                  styles: {
                    // imgPreview: { maxWidth: "50px" },
                    imgPreviewLabel: { fontSize: "12px" },
                    progressControlWrapper: { height: "60px", width: "60px" }
                  }
                }}
                multiple={true}
                uploadCompleteCallback={status => {
                  console.log("uploadCompleteCallback, returned ", status);
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
