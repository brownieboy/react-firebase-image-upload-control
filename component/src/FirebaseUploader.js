import React, { useState } from "react";
import PropTypes from "prop-types";
// import { useDropzone } from "react-dropzone";

import FileUploader from "react-firebase-file-uploader";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
// import DeleteIcon from "@material-ui/icons/Delete";

// import Checkbox from "@material-ui/core/Checkbox";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import "react-circular-progressbar/dist/styles.css";
import _uniqBy from "lodash/fp/uniqBy";
import prettyBytes from "pretty-bytes";

import ImageDrop from "./ImageDrop.js";

const styles = {
  imagePreview: {
    maxHeight: 150,
    maxWidth: 200
  }
  // imagePreviewTitle: {
  //   fontSize: 11
  // }
};

const PlainProgressIndicator = ({ value }) => <span>{value}%</span>;
const PlainCheckbox = props => <input type="checkbox" {...props} />;

const PassedPropProgressIndicator = ({
  component,
  value,
  componentWrapperStyles
}) => {
  const PassedComponent = component;
  if (componentWrapperStyles) {
    return (
      <div style={componentWrapperStyles}>
        <PassedComponent value={`${value}%`} text={value} />
      </div>
    );
  }
  return <PassedComponent value={`${value}%`} />;
};

export default function FirebaseUploadImage({
  firebaseApp,
  label = "image",
  storageFolder = "rfiu",
  disabled = false,
  multiple = false,
  options = {
    styles: {
      imgPreview: {},
      imagePreviewTitle: {},
      progressControlWrapper: {}
    }
  },
  progressControl,
  checkboxControl
}) {
  const [filesToStore, setFilesToStore] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [uploadState, setUploadState] = useState(0);
  let fileUploader;

  const ProgressControl = progressControl
    ? PassedPropProgressIndicator
    : PlainProgressIndicator;

  const CheckboxControl = checkboxControl || PlainCheckbox;

  const handleImageChange = (currentFileArray, prevFileArray) => {
    if (multiple) {
      const allFilesArray = [...currentFileArray, ...prevFileArray];

      const uniqueFilesArray = _uniqBy(e => e.name, [
        ...filesToStore,
        ...allFilesArray
      ]).map(file =>
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

  const startUploadManually = () => {
    filesToStore.forEach(file => {
      fileUploader.startUpload(file);
    });
  };

  const handleProgress = (percent, ...args) => {
    setUploadState(percent);
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
      <FileUploader
        ref={instance => {
          fileUploader = instance;
        }} // ⇐ reference the component
        storageRef={firebaseApp.storage().ref(storageFolder)}
        style={{ display: "none" }}
        onProgress={handleProgress}
        // multiple={multiple}
      />
      <div
        style={{
          display: "flex",
          flexWrap: "wrap"
        }}
      >
        {filesToStore.length > 0
          ? filesToStore.map(file => (
              <div
                key={file.name}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  marginBottom: 10,
                  marginRight: 10
                }}
              >
                <img
                  src={file.preview}
                  title={file.name}
                  alt={file.name}
                  style={imgPreviewStyles}
                />
                <div style={imgPreviewTitleStyles}>
                  <label htmlFor={file.name}>
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
        <button
          onClick={handleRemoveFiles}
          style={{ textTransform: "none", marginTop: 10, marginRight: 10 }}
          disabled={filesToRemove.length === 0}
        >
          {/* <DeleteIcon style={{ marginRight: 10 }} /> */}
          Remove checked files
        </button>
        <button
          onClick={startUploadManually}
          style={{ textTransform: "none", marginTop: 10, marginRight: 10 }}
          disabled={disabled || filesToStore.length === 0}
        >
          {/* <CloudUploadIcon style={{ marginRight: 10 }} /> */}
          Upload All
        </button>
        <ProgressControl
          value={uploadState}
          text={uploadState}
          component={progressControl}
          componentWrapperStyles={options.styles.progressControlWrapper}
        />
      </div>
    </>
  );
}

FirebaseUploadImage.propTypes = {
  firebaseApp: PropTypes.object.isRequired,
  storageFolder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  multiple: PropTypes.bool,
  progressControl: PropTypes.func,
  checkboxControl: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
};
