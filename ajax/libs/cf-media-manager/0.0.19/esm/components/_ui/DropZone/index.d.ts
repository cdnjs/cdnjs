import classNames from "classnames";
import { ComponentChildren } from "preact";
import { ChangeEventHandler } from "preact/compat";
import { MediaManagerUiProps } from "../../MediaManagerUi";
interface DropZoneProps {
    isDraggingOver: boolean;
    isAddFilesDisabled: boolean;
    children: ComponentChildren;
    maxNumberOfFiles: number;
    minNumberOfFiles: number;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    dropZoneClassNames?: classNames.ArgumentArray;
}
export declare function DropZone({ children, isDraggingOver, isAddFilesDisabled, maxNumberOfFiles, handleInputChange, allowedFileTypes, dropZoneClassNames, }: DropZoneProps): import("preact").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map