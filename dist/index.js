(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "prop-types", "react-dropzone", "react-firebase-file-uploader", "@material-ui/icons/CloudUpload", "@material-ui/icons/Delete", "@material-ui/core/Checkbox", "@material-ui/core/FormControlLabel", "react-circular-progressbar", "react-circular-progressbar/dist/styles.css", "lodash/fp/uniqBy", "pretty-bytes", "@material-ui/core/Button", "./ImageDrop.js"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("prop-types"), require("react-dropzone"), require("react-firebase-file-uploader"), require("@material-ui/icons/CloudUpload"), require("@material-ui/icons/Delete"), require("@material-ui/core/Checkbox"), require("@material-ui/core/FormControlLabel"), require("react-circular-progressbar"), require("react-circular-progressbar/dist/styles.css"), require("lodash/fp/uniqBy"), require("pretty-bytes"), require("@material-ui/core/Button"), require("./ImageDrop.js"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactDropzone, global.reactFirebaseFileUploader, global.CloudUpload, global.Delete, global.Checkbox, global.FormControlLabel, global.reactCircularProgressbar, global.styles, global.uniqBy, global.prettyBytes, global.Button, global.ImageDrop);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _react, _propTypes, _reactDropzone, _reactFirebaseFileUploader, _CloudUpload, _Delete, _Checkbox, _FormControlLabel, _reactCircularProgressbar, _styles, _uniqBy2, _prettyBytes, _Button, _ImageDrop) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = FirebaseUploadImage;
  _react = _interopRequireWildcard(_react);
  _propTypes = _interopRequireDefault(_propTypes);
  _reactFirebaseFileUploader = _interopRequireDefault(_reactFirebaseFileUploader);
  _CloudUpload = _interopRequireDefault(_CloudUpload);
  _Delete = _interopRequireDefault(_Delete);
  _Checkbox = _interopRequireDefault(_Checkbox);
  _FormControlLabel = _interopRequireDefault(_FormControlLabel);
  _uniqBy2 = _interopRequireDefault(_uniqBy2);
  _prettyBytes = _interopRequireDefault(_prettyBytes);
  _Button = _interopRequireDefault(_Button);
  _ImageDrop = _interopRequireDefault(_ImageDrop);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
    } = (0, _reactDropzone.useDropzone)({
      accept: "image/*",
      ...props
    });
    const style = useMemo(() => ({ ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }), [isDragActive, isDragReject]);
    return _react.default.createElement("div", {
      className: "container"
    }, _react.default.createElement("div", getRootProps({
      style
    }), _react.default.createElement("input", getInputProps()), _react.default.createElement("p", null, "Drag 'n' drop some files here, or click to select files")));
  };

  const styles = {
    imagePreview: {
      maxHeight: 150,
      maxWidth: 200
    },
    imagePreviewTitle: {
      fontSize: 11
    }
  };

  function FirebaseUploadImage({
    firebaseApp,
    label = "image",
    storageFolder,
    disabled = false,
    multiple = false,
    options = {
      styles: {
        imgPreview: {},
        imagePreviewTitle: {}
      }
    }
  }) {
    let fileUploader;
    const [filesToStore, setFilesToStore] = (0, _react.useState)([]);
    const [filesToRemove, setFilesToRemove] = (0, _react.useState)([]);
    const [uploadState, setUploadState] = (0, _react.useState)(0);

    const handleImageChange = (currentFileArray, prevFileArray) => {
      if (multiple) {
        const allFilesArray = [...currentFileArray, ...prevFileArray];
        const uniqueFilesArray = (0, _uniqBy2.default)(e => e.name, [...filesToStore, ...allFilesArray]).map(file => // Spread operator didn't work here.  Has to be Object.assign()
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));
        setFilesToStore(uniqueFilesArray);
      } else {
        setFilesToStore(currentFileArray.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        })));
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
        setFilesToRemove(filesToRemove.filter(member => member !== event.target.id));
      }
    };

    const handleRemoveFiles = () => {
      setFilesToStore(filesToStore.filter(member => !filesToRemove.includes(member.name)));
      setFilesToRemove([]); // Important to clear this after
    };

    const imgPreviewStyles = { ...styles.imagePreview,
      ...options.styles.imgPreview
    };
    const imgPreviewTitleStyles = { ...styles.imagePreviewTitle,
      ...options.styles.imgPreviewTitle
    };
    return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ImageDrop.default // accept="image/*"
    // options={{ onDrop: handleImageChange, multiple }}
    , {
      onDrop: handleImageChange,
      multiple: multiple
    }), _react.default.createElement(_reactFirebaseFileUploader.default, {
      ref: instance => {
        fileUploader = instance;
      } // ⇐ reference the component
      ,
      storageRef: firebaseApp.storage().ref(storageFolder),
      style: {
        display: "none"
      },
      onProgress: handleProgress // multiple={multiple}

    }), _react.default.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap"
      }
    }, filesToStore.length > 0 ? filesToStore.map(file => _react.default.createElement("div", {
      key: file.name,
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginBottom: 10,
        marginRight: 10
      }
    }, _react.default.createElement("img", {
      src: file.preview,
      title: file.name,
      alt: file.name,
      style: imgPreviewStyles
    }), _react.default.createElement("div", {
      style: imgPreviewTitleStyles
    }, _react.default.createElement(_FormControlLabel.default, {
      control: _react.default.createElement(_Checkbox.default, {
        checked: filesToRemove.includes(file.name),
        onChange: handleFileRemovalCheck,
        id: file.name
      }),
      label: `${file.name} (${(0, _prettyBytes.default)(file.size)})`
    })))) : null), _react.default.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center"
      }
    }, _react.default.createElement(_Button.default, {
      variant: "contained",
      onClick: handleRemoveFiles,
      style: {
        textTransform: "none",
        marginTop: 10,
        marginRight: 10
      },
      disabled: filesToRemove.length === 0
    }, _react.default.createElement(_Delete.default, {
      style: {
        marginRight: 10
      }
    }), "Remove checked files"), _react.default.createElement(_Button.default, {
      variant: "contained",
      onClick: startUploadManually,
      style: {
        textTransform: "none",
        marginTop: 10,
        marginRight: 10
      },
      disabled: disabled || filesToStore.length === 0
    }, _react.default.createElement(_CloudUpload.default, {
      style: {
        marginRight: 10
      }
    }), "Upload All"), _react.default.createElement("div", {
      style: {
        height: 70,
        width: 70
      }
    }, _react.default.createElement(_reactCircularProgressbar.CircularProgressbar, {
      value: uploadState,
      text: `${uploadState}%`
    }))));
  }

  FirebaseUploadImage.propTypes = {
    firebaseApp: _propTypes.default.object.isRequired,
    storageFolder: _propTypes.default.string.isRequired,
    disabled: _propTypes.default.bool,
    label: _propTypes.default.string,
    multiple: _propTypes.default.bool
  };
});
