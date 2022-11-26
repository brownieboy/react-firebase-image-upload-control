import { FirebaseApp } from "firebase/app";
export interface ExtendedFile extends File {
    /** The URL to the file that you just uploaded */
    downloadUrl: string;
}
export interface FirebaseUploadImageProps {
    /** A reference to your Firebase app that was initialised with a call such as `firebase.initializeApp(firebaseConfigObj)` */
    firebaseApp: FirebaseApp;
    /** The target folder in Firebase storage. */
    storageFolder: string;
    /** Set to `true` to display the control in a disabled state.
     * @defaultValue `false`
     */
    disabled?: boolean;
    /** Set to `true` to specify the control will accept multiple images.
     * @defaultValue `false`, the control accepts only one image
     */
    multiple?: boolean;
    /** Additional styles passed to the control via the `styles` property */
    options?: {
        styles?: {
            /** styles passed directly to the preview images */
            imgPreview?: object;
            /** styles passed to the labels of the preview images */
            imgPreviewLabel?: object;
            /** if you're passing a `progressControl` prop, then that prop will be automatically wrapped inside a `<div>` tag by the control.  The `progressControlWrapper` styles will be passed to that wrapper. */
            progressControlWrapper?: object;
            /** styles passed to the title div that wraps the image preview label and checkbox */
            imgPreviewTitle?: object;
        };
    };
    /**  React component function that you can use to show upload progress as percentage.   The control must take a `value` prop, which is a number between 0 and 100.   In the demo, I use my own component function, which is based on `@mui/material/Checkbox`.  If not specified, the upload percentage will display as plain text.
     *
     * @example
     * `CircularProgressWithLabel`
     * Note: you're passing the function to create the component, not a component that's already been created.   So its `CircularProgressWithLabel` and _not_ `<CircularProgressWithLabel />`
     */
    progressControl?: any;
    /**  A React component function to display checkboxes next to each image preview.  If not supplied, plain HTML checkboxes are used, i.e `<input type="checkbox">`.
     *
     * @example
     * `MyCheckbox`
     *
     * @default
     * If not supplied, plain HTML checkboxes are used, i.e `<input type="checkbox">`.
     */
    checkboxControl?: any;
    /** A React control to display buttons for **Upload all** and **Remove checked files** button.
     *
     * @example
     * `Button`
     *
     * @default
     *   If not supplied, plain HTML buttons are used. */
    buttonControl?: any;
    /** A React icon component will be displayed on the **Upload all** button.
     *
     * @example
     * `CloudUpload`
     *
     * @default
     * If prop not supplied then the button will have no icon */
    uploadButtonIcon?: any;
    /** A React icon component will be displayed on the **Remove all** button.
     *
     * @example
     * `CloudUpload`
     *
     * @default
     * If prop not supplied then the button will have no icon */
    removeButtonIcon?: any;
    /** Function that is called when the Upload button on the control is clicked.  */
    uploadStartCallback?(fileToStore: Array<File>): any;
    /** Function that is called when all uploads have completed.
     *
     * @returns
     * The function receives one parameter, which is an object of info on the files that were uploaded.  The object has a `files` property, which is an array of all the files uploaded.  Each member of the `files` array is an object of `File` info, plus a `downloadUrl` property, which you can use to add the uploaded file to an HTML page as an `<img \>` tag. */
    uploadCompleteCallback?(statusObj: {
        files: Array<ExtendedFile>;
    }): any;
}
declare const FirebaseUploadImage: ({ firebaseApp, storageFolder, disabled, multiple, options, progressControl, checkboxControl, buttonControl, uploadButtonIcon, removeButtonIcon, uploadStartCallback, uploadCompleteCallback }: FirebaseUploadImageProps) => JSX.Element;
export default FirebaseUploadImage;
