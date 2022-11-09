/* eslint-disable indent */
import React, {useState} from "react";
import {
  ref as fbRef,
  getDownloadURL,
  getStorage,
  uploadBytesResumable
} from "firebase/storage";
// import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// import FileUploader from "./react-firebase-file-uploader";
import _uniqBy from "lodash/fp/uniqBy";
// import _pickBy from "lodash/fp/pickBy";
import prettyBytes from "pretty-bytes";

import ImageDrop from "./ImageDrop.js";

const styles = {
  imagePreview: {
    maxHeight: 150,
    maxWidth: 200
  },
  progressControl: {
    label: {
      fontSize: 10
    }
  }
};

interface PlainProgressIndicatorProps {
  value: number;
  fileName: string;
}

const PlainProgressIndicator = ({
  value,
  fileName
}: PlainProgressIndicatorProps) => {
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

const PlainCheckbox = props => <input type="checkbox" {...props} />;

interface PlainButtonProps {
  children: React.ReactNode;
}

const PlainButton = ({children, ...props}: PlainButtonProps) => {
  console.log(
    "TCL ~ file: FirebaseUploader.js ~ line 48 ~ PlainButton ~ children",
    children
  );
  return <button {...props}>{children}</button>;
};

interface PassedPropProgressIndicatorProps {}

const PassedPropProgressIndicator = ({
  component,
  value,
  componentWrapperStyles,
  fileName
}: PassedPropProgressIndicatorProps) => {
  console.log("TCL ~ file: FirebaseUploader.js ~ line 54 ~ value", value);
  const PassedComponent = component;
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
          <PassedComponent value={value} text={`${value}%`} />
        </div>
        <div style={styles.progressControl.label}>{fileName}</div>
      </div>
    );
  }
  return <PassedComponent value={`${value}%`} />;
};

interface FirebaseUploadImageProps {
  firebaseApp: object;
  storageFolder: string;
  disabled?: boolean;
  multiple?: boolean;
  options?: {
    styles?: {
      imgPreview?: object;
      imgPreviewLabel?: object;
      progressControlWrapper?: object;
    };
  };
  progressControl?(...args: unknown[]): unknown;
  checkboxControl?: (...args: unknown[]) => unknown | object;
  buttonControl?: (...args: unknown[]) => unknown | object;
  uploadButtonIcon?: (...args: unknown[]) => unknown | object;
  removeButtonIcon?: (...args: unknown[]) => unknown | object;
  uploadStartCallback?(...args: unknown[]): unknown;
  uploadCompleteCallback?(...args: unknown[]): unknown;
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
  const [filesToStore, setFilesToStore] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [uploadState, setUploadState] = useState({});
  const [uploadButtonClicked, setUploadButtonClicked] = useState(false);
  const UploadButtonIcon = uploadButtonIcon;
  const RemoveButtonIcon = removeButtonIcon;
  const ProgressControl = progressControl
    ? PassedPropProgressIndicator
    : PlainProgressIndicator;

  const CheckboxControl = checkboxControl || PlainCheckbox;
  const ButtonControl = buttonControl || PlainButton;

  const storage = getStorage(firebaseApp);

  const handleImageChange = (currentFileArray, prevFileArray) => {
    if (multiple) {
      const allFilesArray = [...currentFileArray, ...prevFileArray];

      const uniqueFilesArray = _uniqBy(
        e => e.name,
        [...filesToStore, ...allFilesArray]
      ).map(file =>
        // Spread operator didn't work here.  Has to be Object.assign()
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );

      setFilesToStore(uniqueFilesArray);
    } else {
      setFilesToStore(
        currentFileArray.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
    setFilesToRemove([]); // Important to clear this if we have new files
  };

  const handleProgress = (percent, task) => {
    if (task._blob?.data_?.name) {
      setUploadState(prevState => {
        return {
          ...prevState,
          [task._blob?.data_?.name]: percent
        };
      });
    }
  };

  const startUpload = async () => {
    if (uploadStartCallback) {
      uploadStartCallback(filesToStore);
    }
    setUploadButtonClicked(true);
    // const file = filesToStore[0];

    filesToStore.forEach(file => {
      const storageRef = fbRef(storage, `${storageFolder}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        snapshot => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          handleProgress(progress, uploadTask);
        },
        error => {
          alert(error);
        },
        () => {
          handleUploadSuccess(uploadTask);
        }
      );
    });
  };

  const handleUploadSuccess = async task => {
    const fileName = task._blob?.data_?.name;
    const downloadUrl = await getDownloadURL(task.snapshot?.ref);
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

  const handleFileRemovalCheck = event => {
    if (event.target.checked) {
      setFilesToRemove([...filesToRemove, event.target.value]);
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
    ...options.styles.imgPreview
  };

  const imgPreviewTitleStyles = {
    ...styles.imagePreviewTitle,
    ...options.styles.imgPreviewTitle
  };

  return (
    <>
      <ImageDrop
        // accept="image/*"
        // options={{ onDrop: handleImageChange, multiple }}
        onDrop={handleImageChange}
        multiple={multiple}
      />
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
                    style={options.styles.imgPreviewLabel}>
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
                componentWrapperStyles={options.styles.progressControlWrapper}
                fileName={file.name}
              />
            );
          })}
      </div>
    </>
  );
};

export default FirebaseUploadImage;
