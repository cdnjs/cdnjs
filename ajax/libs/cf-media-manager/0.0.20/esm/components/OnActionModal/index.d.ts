import { I18n } from "@uppy/core";
import { PropsWithChildren } from "preact/compat";
import { MediaManagerUiProps } from "../MediaManagerUi";
interface Props {
    isClosing: boolean;
    isHidden: boolean;
}
export declare function OnActionModal(props: PropsWithChildren<Props>): import("preact/compat").JSX.Element;
interface CloseConfirmModalProps {
    i18n: I18n;
    cancel: MediaManagerUiProps["cancel"];
    isClosing: boolean;
    isHidden: boolean;
    closeExitConfirmModal: MediaManagerUiProps["closeExitConfirmModal"];
}
export declare function CloseConfirmModal(props: PropsWithChildren<CloseConfirmModalProps>): import("preact/compat").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map