import React, { useState } from "react";
import PropTypes from "prop-types";
import FileUploader from "./react-firebase-file-uploader";
import _uniqBy from "lodash/fp/uniqBy";
import _pickBy from "lodash/fp/pickBy";
import prettyBytes from "pretty-bytes";

import ImageDrop from "./ImageDrop.js";

const styles = {
  imagePreview: {
    maxHeight: 150,
    maxWidth: 200,
  },
  progressControl: {
    label: {
      fontSize: 10,
    },
  },
};

const PlainProgressIndicator = ({ value, fileName }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginRight: 5,
    }}
  >
    <div>{value}%</div>
    <div style={styles.progressControl.label}>{fileName}</div>
  </div>
);
const PlainCheckbox = (props) => <input type="checkbox" {...props} />;
const PlainButton = ({ children, ...props }) => (
  <button {...props}>{children}</button>
);

const PassedPropProgressIndicator = ({
  component,
  value,
  componentWrapperStyles,
  fileName,
}) => {
  const PassedComponent = component;
  if (componentWrapperStyles) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          marginRight: 10,
        }}
      >
        <div style={componentWrapperStyles}>
          <PassedComponent value={value} text={`${value}%`} />
        </div>
        <div style={styles.progressControl.label}>{fileName}</div>
      </div>
    );
  }
  return <PassedComponent value={`${value}%`} />;
};

export default function FirebaseUploadImage({
  firebaseApp,
  storageFolder = "rfiu",
  disabled = false,
  multiple = false,
  options = {
    styles: {
      imgPreview: {},
      imgPreviewLabel: {},
      progressControlWrapper: {},
    },
  },
  progressControl,
  checkboxControl,
  buttonControl,
  uploadButtonIcon,
  removeButtonIcon,
  uploadStartCallback,
  uploadCompleteCallback,
}) {
  const [filesToStore, setFilesToStore] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [uploadState, setUploadState] = useState({});
  const [uploadButtonClicked, setUploadButtonClicked] = useState(false);
  let fileUploader;
  const UploadButtonIcon = uploadButtonIcon;
  const RemoveButtonIcon = removeButtonIcon;
  const ProgressControl = progressControl
    ? PassedPropProgressIndicator
    : PlainProgressIndicator;

  const CheckboxControl = checkboxControl || PlainCheckbox;
  const ButtonControl = buttonControl || PlainButton;

  const handleImageChange = (currentFileArray, prevFileArray) => {
    if (multiple) {
      const allFilesArray = [...currentFileArray, ...prevFileArray];

      const uniqueFilesArray = _uniqBy((e) => e.name, [
        ...filesToStore,
        ...allFilesArray,
      ]).map((file) =>
        // Spread operator didn't work here.  Has to be Object.assign()
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFilesToStore(uniqueFilesArray);
    } else {
      setFilesToStore(
        currentFileArray.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    }
    setFilesToRemove([]); // Important to clear this if we have new files
  };

  /*

  const startUploadManually = () => {
    setUploadButtonClicked(true);
    filesToStore.forEach(file => {
      fileUploader.startUpload(file);
    });
  };
  async function uploadFiles(files) {
    await Promise.all(files.map(uploadImageAsPromise));
 }
 */

  const startUploadManually = async () => {
    if (uploadStartCallback) {
      uploadStartCallback(filesToStore);
    }
    setUploadButtonClicked(true);
    const uploadResults = await Promise.all(
      filesToStore.map(async (file) => {
        const fileuploadResult = await fileUploader.startUpload(file);
        // console.log(
        //   "TCL: startUploadManually -> fileuploadResult",
        //   fileuploadResult
        // );
        return fileuploadResult;
      })
    );
    // console.log("TCL: startUploadManually -> uploadResults", uploadResults);
  };

  const handleProgress = (percent, ...args) => {
    console.log(
      "TCL ~ file: FirebaseUploader.js ~ line 160 ~ handleProgress ~ args",
      [...args]
    );
    if (
      args[0]._delegate._blob &&
      args[0]._delegate._blob.data_ &&
      args[0]._delegate._blob.data_.name
    ) {
      setUploadState((prevState) => {
        return {
          ...prevState,
          [args[0]._delegate._blob.data_.name]: percent,
        };
      });
    }
  };

  const handleFileRemovalCheck = (event) => {
    if (event.target.checked) {
      setFilesToRemove([...filesToRemove, event.target.value]);
    } else {
      setFilesToRemove(
        filesToRemove.filter((member) => member !== event.target.value)
      );
    }
  };

  const handleRemoveFiles = () => {
    setFilesToStore(
      filesToStore.filter((member) => !filesToRemove.includes(member.name))
    );
    setFilesToRemove([]); // Important to clear this after
  };

  const handleUploadSuccess = async (...args) => {
    console.log(
      "TCL ~ file: FirebaseUploader.js ~ line 188 ~ handleUploadSuccess ~ args",
      args
    );
    if (args[1].blob_ && args[1].blob_.data_ && args[1].blob_.data_.name) {
      const fileName = args[1].blob_.data_.name;
      const downloadUrl = await firebaseApp.firebase_
        .storage()
        .ref(storageFolder)
        .child(fileName)
        .getDownloadURL();
      setFilesToStore((prevState) => {
        const currentFileIndex = prevState.findIndex(
          (member) => member.name === fileName
        );

        const newFileInfo = Object.assign(prevState[currentFileIndex]);
        newFileInfo.downloadUrl = downloadUrl;

        const newState = [
          ...prevState.slice(0, currentFileIndex),
          newFileInfo,
          ...prevState.slice(currentFileIndex + 1),
        ];
        if (uploadCompleteCallback) {
          const filesWithDownloadUrls = newState.filter(
            (member) => member.downloadUrl
          );
          if (newState.length === filesWithDownloadUrls.length) {
            uploadCompleteCallback({ files: newState });
          }
        }
        return newState;
      });
    }
  };

  const imgPreviewStyles = {
    ...styles.imagePreview,
    ...options.styles.imgPreview,
  };

  const imgPreviewTitleStyles = {
    ...styles.imagePreviewTitle,
    ...options.styles.imgPreviewTitle,
  };

  return (
    <>
      <ImageDrop
        // accept="image/*"
        // options={{ onDrop: handleImageChange, multiple }}
        onDrop={handleImageChange}
        multiple={multiple}
      />
      <FileUploader
        ref={(instance) => {
          fileUploader = instance;
        }} // ⇐ reference the component
        storageRef={firebaseApp.storage().ref(storageFolder)}
        style={{ display: "none" }}
        onProgress={handleProgress}
        onUploadSuccess={handleUploadSuccess}
        multiple={multiple}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {filesToStore.length > 0
          ? filesToStore.map((file) => (
              <div
                key={file.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  marginRight: 10,
                }}
              >
                <img
                  src={file.preview}
                  title={file.name}
                  alt={file.name}
                  style={imgPreviewStyles}
                />
                <div style={imgPreviewTitleStyles}>
                  <label
                    htmlFor={file.name}
                    style={options.styles.imgPreviewLabel}
                  >
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <ButtonControl
          variant="contained"
          onClick={handleRemoveFiles}
          style={{ textTransform: "none", marginTop: 10, marginRight: 10 }}
          disabled={filesToRemove.length === 0}
        >
          {/* <DeleteIcon style={{ marginRight: 10 }} /> */}
          {removeButtonIcon ? (
            <RemoveButtonIcon style={{ marginRight: 10 }} />
          ) : null}
          Remove checked files
        </ButtonControl>
        <ButtonControl
          color="primary"
          variant="contained"
          onClick={startUploadManually}
          style={{ textTransform: "none", marginTop: 10, marginRight: 10 }}
          disabled={disabled || filesToStore.length === 0}
        >
          {/* <CloudUploadIcon style={{ marginRight: 10 }} /> */}
          {uploadButtonIcon ? (
            <UploadButtonIcon style={{ marginRight: 10 }} />
          ) : null}
          {filesToStore.length > 1 ? "Upload all" : "Upload"}
        </ButtonControl>
      </div>
      <div style={{ display: "flex", alignItems: "center", marginTop: 10 }}>
        {/* {uploadButtonClicked && ( */}
        {uploadButtonClicked &&
          filesToStore.map((file) => {
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
}

FirebaseUploadImage.propTypes = {
  firebaseApp: PropTypes.object.isRequired,
  storageFolder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  progressControl: PropTypes.func,
  checkboxControl: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  buttonControl: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  uploadButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  removeButtonIcon: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  uploadStartCallback: PropTypes.func,
  uploadCompleteCallback: PropTypes.func,
};
