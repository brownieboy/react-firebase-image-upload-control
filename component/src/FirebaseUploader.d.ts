import { FirebaseApp } from "firebase/app";
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
            /** styles passed to the title text of the image preview */
            imgPreviewTitle?: object;
        };
    };
    progressControl?: any;
    checkboxControl?: any;
    buttonControl?: any;
    uploadButtonIcon?: any;
    removeButtonIcon?: any;
    uploadStartCallback?: Function;
    uploadCompleteCallback?: Function;
}
declare const FirebaseUploadImage: ({ firebaseApp, storageFolder, disabled, multiple, options, progressControl, checkboxControl, buttonControl, uploadButtonIcon, removeButtonIcon, uploadStartCallback, uploadCompleteCallback }: FirebaseUploadImageProps) => JSX.Element;
export default FirebaseUploadImage;
