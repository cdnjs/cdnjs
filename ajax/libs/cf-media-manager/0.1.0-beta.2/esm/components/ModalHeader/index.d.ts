/// <reference types="react" />
import { I18n } from "@uppy/core";
import { MediaManagerUiProps } from "../MediaManagerUi";
interface Props {
    cancel: () => void;
    step: MediaManagerUiProps["step"];
    i18n: I18n;
    leftChild?: JSX.Element;
}
export declare function ModalHeader(props: Props): import("preact").JSX.Element;
export {};
