# Contributing to react-firebase-image-upload-control

## Pull Requests
PRs always welecome, even unsolicited ones.  Please try and explain what it is that you're trying to do with the PR though.

## Repository Layout
The repository is split into two folders.
- The **component** folder holds the source code and build for the react-firebase-image-upload-control component itself.
- The **rfiu-examples** folder holds source code and build for an example app that shows the react-firebase-image-upload-control control.  This was built with Create React App

## Building the Component & Running The Example
To develop the component, you should run both it and the example app at the same time.  Here's how to do that:

1. Copy your firebase-config.json file into the **rfiu-examples/src/firebase-config/**.  You will need to create the folder if it's not already there.  See [Google's instructions on how download your config file](https://support.google.com/firebase/answer/7015592?hl=en#web); (you want the "web app" file).   Your project must be enabled for [Cloud Storage](https://firebase.google.com/docs/storage/web/start).
1. Open a terminal, cd to the **component** folder and run `yarn` or `npm i`, followed by `yarn start` or `npm start` there.
1. Open a second terminal, cd to the **rfiu-examples** folder and run  `yarn` or `npm i`, followed by `yarn start` or `npm start` there too.  A browser should start with the example app loaded.

## Editing the source code
Change the source code in the **component/src/FirebaseUploader.js** file.   Whenever you save that file, the `watch` command that was called by the first `yarn start` above will build the component and copy it to the **rfiu-examples/src/package** folder.  This change will get picked up Create React App (the second `yarn start` that you called above) and should appear in the browser after a few seconds.

## Building the Distribution Versions
Run `yarn build` from the **component** folder.  This will build a distribution file to the **component/dist** folder.