import React, { useState } from "react";
// import withFirebaseAuth from "react-with-firebase-auth";
// import * as firebase from "firebase/app";
// import "firebase/auth";
import UserForm from "./UserForm";

const Login = ({
  loading,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook,
  signInWithGithub,
  signInWithTwitter,
  signInAnonymously,
  signOut,
  user
}) => {
  const [signInResult, setSignInResult] = useState({
    type: "",
    callbackObj: {}
  });
  const [loginType, setLoginType] = useState("email");

  const loginMetaArray = [
    { id: "anonymous", label: "Anonymously", handler: signInAnonymously },
    {
      id: "email",
      label: "Email and password",
      handler: signInWithEmailAndPassword
    },
    { id: "google", label: "Google ID", handler: signInWithGoogle },
    { id: "github", label: "Github", handler: signInWithGithub },
    { id: "facebook", label: "Facebook", handler: signInWithFacebook },
    { id: "twitter", label: "Twitter", handler: signInWithTwitter }
  ];

  const handleLoginButtonClick = async e => {
    const loginButtonValue = e.target.value;
    const matchLoginObj = loginMetaArray.find(
      member => member.id === loginButtonValue
    );
    console.log("TCL: matchLoginObj", matchLoginObj);
    const newSignInResult = await matchLoginObj.handler();
    setSignInResult({ type: loginButtonValue, callbackObj: newSignInResult });
  };

  const handleSignInWithEmailAndPassword = async (email, password) => {
    const newSignInResult = await signInWithEmailAndPassword(email, password);
    setSignInResult({ type: "email", callbackObj: newSignInResult });
  };

  const handleChangeLoginType = e => setLoginType(e.target.value);

  const getLoginButton = () => {
    if (loginType === "email") {
      return (
        <div>
          <UserForm onSubmit={handleSignInWithEmailAndPassword} />
        </div>
      );
    } else {
      const matchLoginObj = loginMetaArray.find(
        member => member.id === loginType
      );
      return (
        <div>
          <button
            onClick={handleLoginButtonClick}
            value={loginType}
          >{`Login with ${matchLoginObj.label}`}</button>
        </div>
      );
    }
  };

  return (
    <div className="App">
      {user ? (
        <h1>Hello, {user.displayName}</h1>
      ) : (
        <>
          <h1>Log in</h1>
          <p>
            You need to log into Firebase first. Please choose your login type
          </p>
          {loginMetaArray.map(type => (
            <div key={type.id}>
              <label>
                <input
                  type="radio"
                  value={type.id}
                  onChange={handleChangeLoginType}
                  name="logintype"
                  checked={loginType === type.id}
                />
                {type.label}
              </label>
              <br />
            </div>
          ))}
        </>
      )}
      {user ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <>
          <h3>Sign in</h3>
          {getLoginButton()}
        </>
      )}

      {/* {loading && <h2>Loading..</h2>} */}
      <div style={{ marginTop: 20 }}>
        <b>Last sign-in message:</b>
        <div style={{ fontSize: 11 }}>
          {signInResult.type === ""
            ? "No logins messages"
            : `${signInResult.type}: ${signInResult.callbackObj.message}`}
        </div>
      </div>
    </div>
  );
};

export default Login;
