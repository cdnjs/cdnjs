import Uppy, { State, UIPlugin, UppyFile } from "@uppy/core";
import { ChangeEvent } from "preact/compat";
import { NotificationStatus } from "./components/ModalFooter";
import "./index.css";
import locale from "./locale";
import "./style.scss";
import { createSuperFocus } from "./utils/focus";
import { ManagerCallbacks } from ".";
export type Note = {
    status: NotificationStatus;
    msg: string;
};
interface PluginState {
    metaFields: Record<string, any>;
    isHidden: boolean;
    isDraggingOver: boolean;
    areInsidesReadyToBeVisible: boolean;
    step?: Step;
    note?: Note;
    isClosing?: boolean;
    closeConfirmModalState?: {
        isClosing: boolean;
        isHidden: boolean;
    };
}
export type Opts = {
    maxNumberOfFiles: number;
    minNumberOfFiles: number;
    onDragLeave: ((evt: DragEvent) => void) | undefined;
    onDrop: ((evt: DragEvent) => void) | undefined;
    onDragOver: ((evt: DragEvent) => void) | undefined;
    id?: string;
    target?: string;
    trigger?: string | null | HTMLElement;
    metaFields?: Record<string, any> | undefined;
    maxFileSizeInBytes: number;
    isDefaultHidden: boolean;
} & ManagerCallbacks;
interface FileWithPath extends File {
    relativePath?: string;
}
export type Step = "start" | "add_files" | "upload";
export declare const defaultOptions: Opts;
export default class MediaManager extends UIPlugin {
    id: string;
    title: string;
    type: string;
    modalName: string;
    defaultLocale: typeof locale;
    opts: Opts;
    removeDragOverClassTimeout: ReturnType<typeof setTimeout> | undefined;
    savedScrollPosition: number | undefined;
    savedActiveElement: Element | null;
    el: HTMLElement | null;
    resizeObserver: undefined | ResizeObserver;
    makeDashboardInsidesVisibleAnywayTimeout: ReturnType<typeof setTimeout> | undefined;
    superFocus: ReturnType<typeof createSuperFocus>;
    constructor(uppy: Uppy, opts?: Partial<Opts>);
    install: () => void;
    uninstall: () => void;
    startListeningToResize: () => void;
    initEvents: () => void;
    /**
     * Note that will appear in the footer of the modal. Communicates
     * various states like added images.
     */
    setNote: (note: PluginState["note"]) => void;
    addFiles: (files: FileWithPath[]) => void;
    handleDragOver: (event: DragEvent) => void;
    handleDragLeave: (event: DragEvent) => void;
    handleDrop: (event: DragEvent) => Promise<void>;
    reset: () => void;
    resetAndClose: () => void;
    done: () => void;
    cancel: () => void;
    requestCloseModal: () => Promise<any> | undefined;
    removeFile: (file: UppyFile) => void;
    handleKeyDownInModal: (event: KeyboardEvent) => void;
    closeModal: (opts?: {
        manualClose?: Boolean;
    }) => Promise<any> | undefined;
    startUpload: () => Promise<void | import("@uppy/core").UploadResult<Record<string, unknown>, Record<string, unknown>>>;
    isModalOpen: () => boolean;
    handlePopState: (event: PopStateEvent) => void;
    updateBrowserHistory: () => void;
    openModal: () => Promise<any>;
    openExitConfirmModal: () => Promise<any>;
    closeExitConfirmModal: () => Promise<any> | undefined;
    handleClickOutside: () => void;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    retry: () => void;
    setStep: (step: Step) => void;
    render: (state: State) => import("preact/compat").JSX.Element;
}
export interface Restrictions {
    maxFileSize?: number | null;
    minFileSize?: number | null;
    maxTotalFileSize?: number | null;
    maxNumberOfFiles?: number | null;
    minNumberOfFiles?: number | null;
    allowedFileTypes?: string[] | null;
}
declare module "@uppy/core" {
    interface Uppy {
        opts: {
            restrictions: Restrictions;
        };
    }
}
export {};
//# sourceMappingURL=MediaManager.d.ts.map