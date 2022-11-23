import { FirebaseApp } from "firebase/app";
export interface FirebaseUploadImageProps {
    firebaseApp: FirebaseApp;
    storageFolder: string;
    disabled?: boolean;
    multiple?: boolean;
    options?: {
        styles?: {
            imgPreview?: object;
            imgPreviewLabel?: object;
            progressControlWrapper?: object;
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
