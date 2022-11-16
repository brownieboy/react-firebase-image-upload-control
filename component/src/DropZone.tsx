import React, {useCallback} from "react";
import {useDropzone, FileRejection} from "react-dropzone";

interface DropZoneProps {
  onDrop(acceptedFiles: File[], rejectedFiles: FileRejection[]): void;
}

function DropZone({onDrop: handleOnDrop}: DropZoneProps) {
  // const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: File[]) => {
  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      console.log(
        "TCL ~ file: DropZone.tsx ~ line 6 ~ onDrop ~ acceptedFiles",
        acceptedFiles
      );
      handleOnDrop(acceptedFiles, rejectedFiles);
      // Do something with the files
    },
    []
  );
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
}

export default DropZone;
