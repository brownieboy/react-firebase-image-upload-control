# Contributing to react-firebase-image-upload-control

## Pull Requests

PRs always welecome, even unsolicited ones. Please try and explain what it is that you're trying to do with the PR though.  (It's amazing how many devs don't!)

## Repository Layout

The repository is split into two folders.

- The **component** folder holds the source code and build for the react-firebase-image-upload-control component itself.
- The **demo** folder holds source code and build for an example app that shows the react-firebase-image-upload-control control. This was built with Create React App

## Building the Component & Running The Example

To develop the component, you should run both it and the example app at the same time. Here's how to do that:

1. Copy your firebase-config.json file into the **rfiu-examples/src/firebase-config/**. You will need to create the folder if it's not already there. See [Google's instructions on how download your config file](https://support.google.com/firebase/answer/7015592?hl=en#web); (you want the "web app" file). Your project must be enabled for [Cloud Storage](https://firebase.google.com/docs/storage/web/start).
2. Open a terminal and run `npm start` (or `yarn start`) from the repo's root folder.  This will run both the component *and* the demo in watch mode.

## Editing the source code

Change the source code in the **component/src/FirebaseUploader.js** file. Whenever you save that file, the `watch` command that was called by the first `yarn start` above will build the component and copy it to the **demo/src/package** folder. This change will get picked up Create React App (the second `yarn start` that you called above) and should appear in the browser after a few seconds.

## Building the Distribution Versions

Run `yarn build` from the **component** folder. This will build a distribution file to the **demo/dist** folder.

## Documentation

The component definitions are auto-generated from TypeScript definitions, using [TypeDoc](https://typedoc.org/).  Use the `yarn docs` command to update this.

The Readme.md in the root is also part of this generation process, so you should *not* edit it in place.  Instead, the /component/README-source.md file.  Any changes to that will be copied to the root README.md file when you run `yarn docs`.
