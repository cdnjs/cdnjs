import { I18n, UppyFile } from "@uppy/core";
import { type MediaManagerUiProps } from "../MediaManagerUi";
export type NotificationStatus = "success" | "partial_failure" | "full_failure" | "processing" | "unknown" | "selection_success" | "selection_partial_failure" | "";
interface Props {
    startUpload: MediaManagerUiProps["startUpload"];
    isAllComplete: boolean;
    erroredFiles: UppyFile[];
    totalFileCount: number;
    isAllErrored: boolean;
    isAllPaused: boolean;
    isUploadStarted: boolean;
    cancel: MediaManagerUiProps["cancel"];
    done: MediaManagerUiProps["done"];
    isUploadInProgress: boolean;
    retry: MediaManagerUiProps["retry"];
    totalProgress: number;
    i18n: I18n;
    step: MediaManagerUiProps["step"];
    numberOfCompletedFiles: number;
    maxNumberOfFiles: MediaManagerUiProps["maxNumberOfFiles"];
    handleInputChange: MediaManagerUiProps["handleInputChange"];
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    isAddFilesDisabled: MediaManagerUiProps["isAddFilesDisabled"];
}
export declare function ModalFooter(props: Props): import("preact").JSX.Element;
export {};
