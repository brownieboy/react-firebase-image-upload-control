/// <reference types="react" />
import { DropzoneOptions } from "react-dropzone";
export interface FileWithPreview extends File {
    preview?: string;
}
declare const StyledDropzone: (props: DropzoneOptions | undefined) => JSX.Element;
export default StyledDropzone;
