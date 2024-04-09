import { ChangeEventHandler } from "preact/compat";
import { I18n } from "@uppy/core";
import { MediaManagerUiProps } from "../MediaManagerUi";
interface MobileAddFilesToList {
    isAddFilesDisabled: boolean;
    numberOfFilesLeft: number;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    i18n: I18n;
}
export declare function MobileAddFilesToList(props: MobileAddFilesToList): import("preact/compat").JSX.Element;
export {};
