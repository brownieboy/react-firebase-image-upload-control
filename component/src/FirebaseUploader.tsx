/* eslint-disable indent */
import React, {useState} from "react";
import {
  ref as fbRef,
  getDownloadURL,
  getStorage,
  uploadBytesResumable
} from "firebase/storage";
import {FirebaseApp} from "firebase/app";
import _uniqBy from "lodash/fp/uniqBy";
import prettyBytes from "pretty-bytes";
// @ts-ignore
import ImageDrop, {FileWithPreview} from "./ImageDrop";

const styles = {
  imagePreview: {
    maxHeight: 150,
    maxWidth: 200
  },
  imagePreviewTitle: {},
  progressControl: {
    label: {
      fontSize: 10
    }
  }
};

interface FileUploadState {
  [key: string]: number;
}

export interface ExtendedFile extends File {
  /** The URL to the file that you just uploaded */
  downloadUrl: string;
}

const PlainProgressIndicator = ({value, fileName}: any) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 5
      }}>
      <div>{value}%</div>
      <div style={styles.progressControl.label}>{fileName}</div>
    </div>
  );
};

const PlainCheckbox = (
  props: JSX.IntrinsicAttributes &
    React.ClassAttributes<HTMLInputElement> &
    React.InputHTMLAttributes<HTMLInputElement>
) => <input type="checkbox" {...props} />;

interface PlainButtonProps {
  children: React.ReactNode;
}

const PlainButton = ({children, ...props}: PlainButtonProps) => {
  return <button {...props}>{children}</button>;
};

const PassedPropProgressIndicator = ({
  component: Component,
  value,
  componentWrapperStyles,
  fileName
}: any) => {
  if (componentWrapperStyles) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginRight: 10
        }}>
        <div style={componentWrapperStyles}>
          <Component value={value} />
        </div>
        <div style={styles.progressControl.label}>{fileName}</div>
      </div>
    );
  }
  return (
    <Component
      value={value}
      //  text={`${value}%`}
    />
  );
};

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
  uploadCompleteCallback?(statusObj: {files: Array<ExtendedFile>}): any;
}

const FirebaseUploadImage = ({
  firebaseApp,
  storageFolder = "rfiu",
  disabled = false,
  multiple = false,

  options = {
    styles: {
      imgPreview: {},
      imgPreviewLabel: {},
      progressControlWrapper: {}
    }
  },

  progressControl,
  checkboxControl,
  buttonControl,
  uploadButtonIcon,
  removeButtonIcon,
  uploadStartCallback,
  uploadCompleteCallback
}: FirebaseUploadImageProps) => {
  const [filesToStore, setFilesToStore] = useState<FileWithPreview[]>([]);
  const [filesToRemove, setFilesToRemove] = useState<string[]>([]);
  const [uploadState, setUploadState] = useState<FileUploadState>({});
  const [uploadButtonClicked, setUploadButtonClicked] = useState(false);
  const UploadButtonIcon = uploadButtonIcon;
  const RemoveButtonIcon = removeButtonIcon;
  const ProgressControl = progressControl
    ? PassedPropProgressIndicator
    : PlainProgressIndicator;

  const CheckboxControl = checkboxControl || PlainCheckbox;
  const ButtonControl = buttonControl || PlainButton;

  const storage = getStorage(firebaseApp);

  const handleImageChange = (acceptedFilesArray: FileWithPreview[]) => {
    if (multiple) {
      const uniqueFilesArray = _uniqBy(
        e => e.name,
        [...filesToStore, ...acceptedFilesArray]
      ).map(file =>
        // Spread operator didn't work here.  Has to be Object.assign()
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );

      setFilesToStore(uniqueFilesArray);
    } else {
      setFilesToStore(
        acceptedFilesArray.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
    setFilesToRemove([]); // Important to clear this if we have new files
  };

  const handleProgress = (percent: number, fileName: string) => {
    setUploadState((prevState: any) => {
      return {
        ...prevState,
        [fileName]: percent
      };
    });
  };

  const startUpload = async () => {
    if (uploadStartCallback) {
      uploadStartCallback(filesToStore);
    }
    setUploadButtonClicked(true);

    filesToStore.forEach(file => {
      const storageRef = fbRef(storage, `${storageFolder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          const fileName = snapshot.ref.name;
          handleProgress(progress, fileName);
        },
        error => {
          alert(error);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const fileName = uploadTask?.snapshot?.ref?.name;
          handleUploadSuccess(fileName, downloadUrl);
        }
      );
    });
  };

  const handleUploadSuccess = async (fileName: string, downloadUrl: string) => {
    setFilesToStore(prevState => {
      const currentFileIndex = prevState.findIndex(
        member => member.name === fileName
      );

      const newFileInfo = Object.assign(prevState[currentFileIndex]);
      newFileInfo.downloadUrl = downloadUrl;

      const newState = [
        ...prevState.slice(0, currentFileIndex),
        newFileInfo,
        ...prevState.slice(currentFileIndex + 1)
      ];
      if (uploadCompleteCallback) {
        const filesWithDownloadUrls = newState.filter(
          member => member.downloadUrl
        );
        if (newState.length === filesWithDownloadUrls.length) {
          uploadCompleteCallback({files: newState});
        }
      }
      return newState;
    });
  };

  // event prop defined as any because it might be an @mui checkbox or any other
  // kind of checkbox, not just an HTML one.
  const handleFileRemovalCheck = (event: any) => {
    if (event.target.checked) {
      setFilesToRemove([...filesToRemove, event?.target?.value]);
    } else {
      setFilesToRemove(
        filesToRemove.filter(member => member !== event.target.value)
      );
    }
  };

  const handleRemoveFiles = () => {
    setFilesToStore(
      filesToStore.filter(member => !filesToRemove.includes(member.name))
    );
    setFilesToRemove([]); // Important to clear this after
  };

  const imgPreviewStyles = {
    ...styles.imagePreview,
    ...options?.styles?.imgPreview
  };

  const imgPreviewTitleStyles = {
    ...styles.imagePreviewTitle,
    ...options?.styles?.imgPreviewTitle
  };

  return (
    <>
      <ImageDrop onDrop={handleImageChange} multiple={multiple} />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}>
        {filesToStore.length > 0
          ? filesToStore.map(file => (
              <div
                key={file.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  marginRight: 10
                }}>
                <img
                  src={file.preview}
                  title={file.name}
                  alt={file.name}
                  style={imgPreviewStyles}
                />
                <div style={imgPreviewTitleStyles}>
                  <label
                    htmlFor={file.name}
                    style={options?.styles?.imgPreviewLabel}>
                    {`${file.name} (${prettyBytes(file.size)})`}
                  </label>
                  <CheckboxControl
                    checked={filesToRemove.includes(file.name)}
                    onChange={handleFileRemovalCheck}
                    id={file.name}
                    value={file.name}
                  />
                </div>
              </div>
            ))
          : null}
      </div>
      <div style={{display: "flex", alignItems: "center"}}>
        <ButtonControl
          variant="contained"
          onClick={handleRemoveFiles}
          style={{textTransform: "none", marginTop: 10, marginRight: 10}}
          disabled={filesToRemove.length === 0}>
          {/* <DeleteIcon style={{ marginRight: 10 }} /> */}
          {removeButtonIcon ? (
            <RemoveButtonIcon style={{marginRight: 10}} />
          ) : null}
          Remove checked files
        </ButtonControl>
        <ButtonControl
          color="primary"
          variant="contained"
          onClick={startUpload}
          style={{textTransform: "none", marginTop: 10, marginRight: 10}}
          disabled={disabled || filesToStore.length === 0}>
          {/* <CloudUploadIcon style={{ marginRight: 10 }} /> */}
          {uploadButtonIcon ? (
            <UploadButtonIcon style={{marginRight: 10}} />
          ) : null}
          {filesToStore.length > 1 ? "Upload all" : "Upload"}
        </ButtonControl>
      </div>
      <div style={{display: "flex", alignItems: "center", marginTop: 10}}>
        {/* {uploadButtonClicked && ( */}
        {uploadButtonClicked &&
          filesToStore.map(file => {
            return (
              <ProgressControl
                value={uploadState[file.name] || 0}
                key={file.name}
                component={progressControl}
                componentWrapperStyles={options?.styles?.progressControlWrapper}
                fileName={file.name}
              />
            );
          })}
      </div>
    </>
  );
};

export default FirebaseUploadImage;
