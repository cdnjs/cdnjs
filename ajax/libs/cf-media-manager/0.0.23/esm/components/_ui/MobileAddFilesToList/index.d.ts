import { ChangeEventHandler } from "preact/compat";
import { MediaManagerUiProps } from "../../MediaManagerUi";
import { I18n } from "@uppy/core";
interface MobileAddFilesToList {
    isAddFilesDisabled: boolean;
    numberOfFilesLeft: number;
    handleInputChange: ChangeEventHandler<HTMLInputElement>;
    allowedFileTypes: MediaManagerUiProps["allowedFileTypes"];
    i18n: I18n;
}
export default function MobileAddFilesToList(props: MobileAddFilesToList): import("preact/compat").JSX.Element;
export {};
