import { I18n, UppyFile } from "@uppy/core";
import { type MediaManagerUiProps } from "../MediaManagerUi";
import { Step } from "../../MediaManager";
interface Props {
    file: UppyFile;
    error?: string;
    removeFile: MediaManagerUiProps["removeFile"];
    isUploadInProgress: boolean;
    i18n: I18n;
    step: Step;
}
export declare function FileItem(props: Props): import("preact").JSX.Element;
declare module "@uppy/utils" {
    interface FileProgress {
        preprocess: boolean;
        postprocess: boolean;
    }
    interface UppyFile {
        error?: string;
    }
}
declare module "@uppy/core" { }
export {};
