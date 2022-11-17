import React, {useEffect, useState} from "react";
import {initializeApp} from "firebase/app";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";
import "firebase/database";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

import CircularProgressWithLabel from "./CircularProgressWithLabel";
import "./App.css";

import ReactFirebaseImageUploader from "./.package";
import Login from "./Login";

// You must supply this!
import firebaseConfigObj from "./firebaseconfig/firebase-config.json";
const firebaseApp = initializeApp(firebaseConfigObj);
const auth = getAuth();

const loginProviders = {
  signInWithEmailAndPassword,
  signOut,
  browserSessionPersistence,
  setPersistence
};

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userPolled, setUserPolled] = useState(false);

  const imageUploaderSharedProps = {
    firebaseApp,
    storageFolder: "rfiu-test"
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      console.log("TCL ~ file: App.js ~ line 45 ~ user", user);
      setUserPolled(true);
      if (auth?.currentUser?.email) {
        setCurrentUser(auth.currentUser.email);
      } else {
        setCurrentUser(null);
      }
    });
    return () => {};
  }, []);

  return (
    <div className="App">
      <h1>React Firebase Image Uploader Test</h1>
      {userPolled ? (
        <Login {...loginProviders} auth={auth} user={currentUser} />
      ) : (
        "Checking login details..."
      )}
      <div style={{marginTop: 40, marginBottom: 100}}>
        {currentUser ? (
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
                wrapperFunc={CircularProgressWithLabel}
                progressControl={CircularProgressWithLabel}
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
        ) : null}
      </div>
    </div>
  );
};

export default App;
