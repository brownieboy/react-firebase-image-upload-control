import React, { useState } from "react";
import "./App.css";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import withFirebaseAuth from "react-with-firebase-auth";
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
      <div style={{ marginTop: 40 }}>
        {user ? (
          <>
            <ReactFirebaseImageUploader
              firebaseApp={firebaseApp}
              storageFolder="rfiu-test"
              multiple
            />
            <ReactFirebaseImageUploader
              firebaseApp={firebaseApp}
              storageFolder="rfiu-test"
              progressControl={CircularProgressbar}
              progressControlWrapperStyles={{ height: "40px", width: "40px" }}
              multiple
            />
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
