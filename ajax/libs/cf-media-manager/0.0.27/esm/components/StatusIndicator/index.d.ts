import { I18n } from "@uppy/core";
import { MediaManagerUiProps } from "../MediaManagerUi";
interface StatusIndicatorProps {
    totalFileCount: number;
    numberOfCompletedFiles: number;
    numberOfErroredFiles: number;
    isAllComplete: boolean;
    step: MediaManagerUiProps["step"];
    i18n: I18n;
    totalProgress: number;
}
export declare function StatusIndicator(props: StatusIndicatorProps): import("preact/compat").JSX.Element;
export {};
