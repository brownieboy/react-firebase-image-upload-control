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
  const [user, setUser] = useState(null);
  console.log("TCL ~ file: App.js ~ line 36 ~ App ~ user", user);

  const imageUploaderSharedProps = {
    firebaseApp,
    storageFolder: "rfiu-test"
  };

  useEffect(() => {
    auth.onAuthStateChanged(function (user) {
      if (auth?.currentUser?.email) {
        setUser(auth.currentUser.email);
      } else {
        setUser(null);
      }
    });
    return () => {};
  }, []);

  return (
    <div className="App">
      <h1>React Firebase Image Uploader Test</h1>
      <Login
        {...loginProviders}
        auth={auth}
        user={user}
      />
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
        ) : (
          <div>Login to upload images</div>
        )}
      </div>
    </div>
  );
};

export default App;
