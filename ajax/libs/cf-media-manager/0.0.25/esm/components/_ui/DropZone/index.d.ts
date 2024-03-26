import classNames from "classnames";
import { ComponentChildren, Ref } from "preact";
import { ChangeEventHandler } from "preact/compat";
import { MediaManagerUiProps } from "../../MediaManagerUi";
export declare function renderHiddenInput({ maxNumberOfFiles, handleInputChange, allowedFileTypes, isAddFilesDisabled, ref, }: {
    maxNumberOfFiles: number;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    ref: Ref<HTMLInputElement> | null;
    isAddFilesDisabled: boolean;
}): import("preact").JSX.Element;
interface DropZoneProps {
    isDraggingOver: boolean;
    isAddFilesDisabled: boolean;
    children: ComponentChildren;
    maxNumberOfFiles: number;
    minNumberOfFiles: number;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    dropZoneClassNames?: classNames.ArgumentArray;
    totalFileCount: number;
}
export declare function DropZone({ children, isAddFilesDisabled, maxNumberOfFiles, handleInputChange, allowedFileTypes, dropZoneClassNames, }: DropZoneProps): import("preact").JSX.Element;
export {};
