# Contributing to react-firebase-image-upload-control

## Pull Requests
PRs always welcome, even unsolicited ones.  Please try and explain what it is that you're trying to do with the PR though.

## Repository Layout
The repository is split into two folders.
- The **component** folder holds the source code and build for the react-firebase-image-upload-control component itself.
- The **rfiu-examples** folder holds source code and build for an example app that shows the react-firebase-image-upload-control control.  This was built with Create React App

## Building the Component & Running The Example
To develop the component, you should run both it and the example app at the same time.  Here's how to do that:

1. Copy your firebase-config.json file into the **rfiu-examples/src/firebase-config/**.  You will need to create the folder if it's not already there.  See [Google's instructions on how download your config file](https://support.google.com/firebase/answer/7015592?hl=en#web); (you want the "web app" file).   Your project must be enabled for [Cloud Storage](https://firebase.google.com/docs/storage/web/start).
1. Open a terminal and enter `yarn start` or `npm start` there.  This will run the component code and the demo code, both in watch mode.  (Under the hood, I use Lerna to make parallel calls to the `yarn start` in both the /component and /demo folders.)

## Editing the source code
Change the source code in the **component/src/FirebaseUploader.js** file.   Whenever you save that file, the running processes will build the component and copy it to the **rfiu-examples/src/package** folder.  This should be reflected in your browser after a few seconds.

## Tests
Run `yarn test` from the root folder.

There's just a couple of basic Jest snapshot tests at the moment.  More to come here...

## Building the Distribution Versions
Run `yarn build` from the **component** folder.  This will build a distribution file to the **component/dist** folder.