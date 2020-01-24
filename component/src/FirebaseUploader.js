import React, {  useState } from "react";
import PropTypes from "prop-types";
// import { useDropzone } from "react-dropzone";

import FileUploader from "react-firebase-file-uploader";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import DeleteIcon from "@material-ui/icons/Delete";

import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import _uniqBy from "lodash/fp/uniqBy";
import prettyBytes from "pretty-bytes";

import Button from "@material-ui/core/Button";

import ImageDrop from "./ImageDrop.js";
/*
const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const StyledDropzone = props => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ accept: "image/*", ...props });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </div>
  );
};
*/

const styles = {
  imagePreview: {
    maxHeight: 150,
    maxWidth: 200
  },
  imagePreviewTitle: {
    fontSize: 11
  }
};

export default function FirebaseUploadImage({
  firebaseApp,
  label = "image",
  storageFolder,
  disabled = false,
  multiple = false,
  options = { styles: { imgPreview: {}, imagePreviewTitle: {} } }
}) {
  let fileUploader;

  const [filesToStore, setFilesToStore] = useState([]);
  const [filesToRemove, setFilesToRemove] = useState([]);
  const [uploadState, setUploadState] = useState(0);

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
    console.log("TCL: handleProgress -> args", args);
    setUploadState(percent);
  };

  const handleFileRemovalCheck = (event, isChecked, value) => {
    if (isChecked) {
      setFilesToRemove([...filesToRemove, event.target.id]);
    } else {
      setFilesToRemove(
        filesToRemove.filter(member => member !== event.target.id)
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
                  {/* <Checkbox name="imageselector" />
                  {file.name} */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filesToRemove.includes(file.name)}
                        onChange={handleFileRemovalCheck}
                        id={file.name}
                      />
                    }
                    label={`${file.name} (${prettyBytes(file.size)})`}
                  />
                </div>
              </div>
            ))
          : null}
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={handleRemoveFiles}
          style={{ textTransform: "none", marginTop: 10, marginRight: 10 }}
          disabled={filesToRemove.length === 0}
        >
          <DeleteIcon style={{ marginRight: 10 }} />
          Remove checked files
        </Button>
        <Button
          variant="contained"
          onClick={startUploadManually}
          style={{ textTransform: "none", marginTop: 10, marginRight: 10 }}
          disabled={disabled || filesToStore.length === 0}
        >
          <CloudUploadIcon style={{ marginRight: 10 }} />
          Upload All
        </Button>
        <div style={{ height: 70, width: 70 }}>
          <CircularProgressbar value={uploadState} text={`${uploadState}%`} />
        </div>
      </div>
    </>
  );
}

FirebaseUploadImage.propTypes = {
  firebaseApp: PropTypes.object.isRequired,
  storageFolder: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  multiple: PropTypes.bool
};
