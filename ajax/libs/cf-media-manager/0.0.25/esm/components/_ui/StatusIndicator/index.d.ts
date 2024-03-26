/**
 * Status indicator is rendered in the footer and either hints an error state or an info message
 * to the user
 */
import { I18n, UppyFile } from "@uppy/core";
import React from "preact/compat";
import { Step } from "../../../MediaManager";
interface StatusIndicatorProps {
    isAllErrored: boolean;
    errordFiles: UppyFile[];
    isAllComplete: boolean;
    isUploadInProgress: boolean;
    totalFileCount: number;
    i18n: I18n;
    totalProgress: number;
    step: Step;
    isUploadStarted: boolean;
}
export declare function StatusIndicator(props: StatusIndicatorProps): React.JSX.Element | null;
export {};
