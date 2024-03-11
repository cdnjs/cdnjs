import { I18n, UppyFile } from "@uppy/core";
import { ChangeEventHandler } from "preact/compat";
import { Step } from "../../MediaManager";
import { type MediaManagerUiProps } from "../MediaManagerUi";
interface Props {
    maxFileSizeInBytes: MediaManagerUiProps["maxFileSizeInBytes"];
    maxNumberOfFiles: number;
    minNumberOfFiles: number;
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    isDraggingOver: boolean;
    files: Record<string, UppyFile>;
    totalFileCount: number;
    isAddFilesDisabled: boolean;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
    isUploadInProgress: boolean;
    removeFile: MediaManagerUiProps["removeFile"];
    isAllComplete: boolean;
    isAllErrored: boolean;
    step: Step;
    i18n: I18n;
    info: MediaManagerUiProps["info"];
}
export declare function ListPanel(props: Props): import("preact/compat").JSX.Element;
export {};
