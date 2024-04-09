import { ComponentProps } from "preact";
import { type MediaManagerUiProps } from "../MediaManagerUi";
import { Button } from "../_ui/Button";
interface UploadButtonProps extends ComponentProps<typeof Button> {
    startUpload: MediaManagerUiProps["startUpload"];
}
export declare function UploadButton({ startUpload, ...rest }: UploadButtonProps): import("preact").JSX.Element;
interface RetryButtonProps {
    retry: MediaManagerUiProps["retry"];
}
export declare function RetryButton({ retry }: RetryButtonProps): import("preact").JSX.Element;
interface DoneButtonProps extends ComponentProps<typeof Button> {
    closeModal: MediaManagerUiProps["done"];
}
export declare function DoneButton({ closeModal, ...rest }: DoneButtonProps): import("preact").JSX.Element;
export {};
