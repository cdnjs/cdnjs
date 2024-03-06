import { I18n } from "@uppy/core";
import { FunctionComponent } from "preact";
import { ChangeEventHandler } from "preact/compat";
import { MediaManagerUiProps } from "../MediaManagerUi";
interface Props {
    maxFileSizeInBytes: MediaManagerUiProps["maxFileSizeInBytes"];
    maxNumberOfFiles: number;
    minNumberOfFiles: number;
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    isDraggingOver: boolean;
    isAddFilesDisabled: boolean;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
    i18n: I18n;
    info: MediaManagerUiProps["info"];
    step: MediaManagerUiProps["step"];
}
export declare const StartScreenPanel: FunctionComponent<Props>;
export {};
//# sourceMappingURL=index.d.ts.map