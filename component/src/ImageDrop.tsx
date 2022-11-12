import React, {useMemo} from "react";
import {useDropzone, DropzoneOptions} from "react-dropzone";

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

const StyledDropzone = (props: DropzoneOptions | undefined) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: {"image/jpeg": [], "image/png": [], "image/gif": []},
    ...props
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragAccept, isDragReject]
  );
  const message = props?.multiple
    ? "Drag 'n' drop some files here, or click to select files"
    : "Drag 'n' drop a file here, or click to select a file";
  return (
    <div className="container">
      {/* @ts-ignore */}
      <div {...getRootProps({style})}>
        <input {...getInputProps()} />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default StyledDropzone;
