/**
 *
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 *
 * [Live Demo](https://www.primereact.org/fileupload)
 *
 * @module fileupload
 *
 */
import * as React from 'react';
import { BadgePassThroughOptions } from '../badge/badge';
import { ButtonPassThroughOptions } from '../button/button';
import { MessagePassThroughOptions } from '../message/message';
import { ProgressBarPassThroughOptions } from '../progressbar/progressbar';
import { IconType, PassThroughType } from '../utils';

export declare type FileUploadPassThroughType<T> = PassThroughType<T, FileUploadPassThroughMethodOptions>;

/**
 * Custom passthrough(pt) option method.
 */
export interface FileUploadPassThroughMethodOptions {
    props: FileUploadProps;
    state: FileUploadState;
}

/**
 * Custom passthrough(pt) options.
 * @see {@link FileUploadProps.pt}
 */
export interface FileUploadPassThroughOptions {
    /**
     * Uses to pass attributes to the root's DOM element.
     */
    root?: FileUploadPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the input's DOM element.
     */
    input?: FileUploadPassThroughType<React.HTMLAttributes<HTMLInputElement>>;
    /**
     * Uses to pass attributes to the buttonbar's DOM element.
     */
    buttonbar?: FileUploadPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the choose button's DOM element.
     */
    chooseButton?: FileUploadPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the choose icon's DOM element.
     */
    chooseIcon?: FileUploadPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the choose button label's DOM element.
     */
    chooseButtonLabel?: FileUploadPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the upload button's DOM element.
     * @see {@link ButtonPassThroughOptions}
     */
    uploadButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the cancel button's DOM element.
     * @see {@link ButtonPassThroughOptions}
     */
    cancelButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the content's DOM element.
     */
    content?: FileUploadPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the progressbar's DOM element.
     * @see {@link ProgressBarPassThroughOptions}
     */
    progressbar?: ProgressBarPassThroughOptions;
    /**
     * Uses to pass attributes to the messages' DOM element.
     * @see {@link MessagePassThroughOptions}
     */
    message?: MessagePassThroughOptions;
    /**
     * Uses to pass attributes to the file's DOM element.
     */
    file?: FileUploadPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the thumbnail's DOM element.
     */
    thumbnail?: FileUploadPassThroughType<React.ImgHTMLAttributes<HTMLImageElement>>;
    /**
     * Uses to pass attributes to the details's DOM element.
     */
    details?: FileUploadPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the fileName's DOM element.
     */
    fileName?: FileUploadPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the fileSize's DOM element.
     */
    fileSize?: FileUploadPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the badge's DOM element.
     * @see {@link BadgePassThroughOptions}
     */
    badge?: BadgePassThroughOptions;
    /**
     * Uses to pass attributes to the actions's DOM element.
     */
    actions?: FileUploadPassThroughType<React.HTMLAttributes<HTMLDivElement>>;
    /**
     * Uses to pass attributes to the remove button's DOM element.
     * @see {@link ButtonPassThroughOptions}
     */
    removeButton?: ButtonPassThroughOptions;
    /**
     * Uses to pass attributes to the label's DOM element.
     */
    label?: FileUploadPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the basic button's DOM element.
     */
    basicButton?: FileUploadPassThroughType<React.HTMLAttributes<HTMLSpanElement>>;
    /**
     * Uses to pass attributes to the upload icon's DOM element.
     */
    uploadIcon?: FileUploadPassThroughType<React.SVGProps<SVGSVGElement> | React.HTMLAttributes<HTMLSpanElement>>;
}

/**
 * Defines current inline state in FileUpload component.
 */
export interface FileUploadState {
    /**
     * Current files.
     */
    files: any[];
    /**
     * Current uplaoding state as a boolean.
     * @defaultValue false
     */
    uploading: boolean;
    /**
     * Current focused state as a boolean.
     * @defaultValue false
     */
    focused: boolean;
    /**
     * Current progress state as a number.
     * @defaultValue 0
     */
    progress: number;
    /**
     * Current uploaded files.
     */
    uploadedFiles: any[];
}

/**
 * Custom file upload options
 */
interface FileUploadOptions {
    /**
     * Defines the text to display.
     */
    label?: string;
    /**
     * Defines the image to display.
     */
    icon?: IconType<FileUploadProps>;
    /**
     * Defines whether to display only the icon.
     */
    iconOnly?: boolean;
    /**
     * Style class of the component.
     */
    className?: string;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties;
}

/**
 * Custom file upload header options
 */
interface FileUploadHeaderTemplateOptions {
    /**
     * The class name for the header element.
     */
    className: string;
    /**
     * The choose button element.
     */
    chooseButton: JSX.Element;
    /**
     * The upload button element.
     */
    uploadButton: JSX.Element;
    /**
     * The cancel button element.
     */
    cancelButton: JSX.Element;
    /**
     * The default element created by the component.
     */
    element: JSX.Element;
    /**
     * The props passed to the component.
     * @type {FileUploadProps}
     */
    props: FileUploadProps;
}

/**
 * Custom item template options
 */
interface ItemTemplateOptions {
    /**
     * Callback to invoke when a item template is removed.
     * @param {React.SyntheticEvent} event - Browser event
     */
    onRemove(event: React.SyntheticEvent): void;
    /**
     * Element to display preview of the file.
     */
    previewElement: JSX.Element;
    /**
     * Element to display the name of the file.
     */
    fileNameElement: JSX.Element;
    /**
     * Element to display the size of the file.
     */
    sizeElement: JSX.Element;
    /**
     * Element to display the remove button.
     */
    removeElement: JSX.Element;
    /**
     * Formatted string of the file size.
     */
    formatSize: string;
    /**
     * Array of files.
     */
    files: File[];
    /**
     * Index of the file.
     */
    index: number;
    /**
     * Default element created by the component.
     */
    element: JSX.Element;
    /**
     * All component props
     * @type {FileUploadProps}
     */
    props: FileUploadProps;
}

/**
 * Custom before upload event.
 * @see {@link FileUploadProps.onBeforeUpload}
 * @event
 */
interface FileUploadBeforeUploadEvent {
    /**
     * XmlHttpRequest instance.
     */
    xhr: XMLHttpRequest;
    /**
     * FormData object.
     */
    formData: FormData;
}

/**
 * Custom before send event.
 * @see {@link FileUploadProps.onBeforeSend}
 * @extends {FileUploadBeforeUploadEvent}
 * @event
 */
interface FileUploadBeforeSendEvent extends FileUploadBeforeUploadEvent {}

/**
 * Custom file upload event.
 */
interface FileUploadFilesEvent {
    /**
     * Uploaded files.
     */
    files: File[];
}

/**
 * Custom upload event.
 * @see {@link FileUploadProps.onUpload}
 * @extends {FileUploadFilesEvent}
 * @event
 */
interface FileUploadUploadEvent extends FileUploadFilesEvent {
    /**
     * XmlHttpRequest instance.
     */
    xhr: XMLHttpRequest;
}

/**
 * Custom error event.
 * @see {@link FileUploadProps.onError}
 * @extends {FileUploadUploadEvent}
 * @event
 */
interface FileUploadErrorEvent extends FileUploadUploadEvent {}

/**
 * Custom select event.
 * @see {@link FileUploadProps.onSelect}, {@link FileUploadProps.onBeforeSelect}
 * @extends {FileUploadFilesEvent}
 * @event
 */
interface FileUploadSelectEvent extends FileUploadFilesEvent {
    /**
     * Browser event.
     */
    originalEvent: React.ChangeEvent<HTMLInputElement> | DragEvent;
}

/**
 * Custom progress event.
 * @see {@link FileUploadProps.onProgress}
 * @event
 */
interface FileUploadProgressEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Calculated progress value.
     */
    progress: number;
}

/**
 * Custom file upload handler options
 */
interface FileUploadHandlerOptions {
    /**
     * Clears the current files selected for upload.
     */
    clear(): void;
    /**
     * All component props
     * @type {FileUploadProps}
     */
    props: FileUploadProps;
}

/**
 * Custom uploadHandler event.
 * @see {@link FileUploadProps.uploadHandler}
 * @extends {FileUploadFilesEvent}
 * @event
 */
interface FileUploadHandlerEvent extends FileUploadFilesEvent {
    /**
     * Handler options.
     */
    options: FileUploadHandlerOptions;
}

/**
 * Custom remove event.
 * @see {@link FileUploadProps.onRemove}
 * @event
 */
interface FileUploadRemoveEvent {
    /**
     * Browser event.
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected file.
     */
    file: File;
}

/**
 * Defines valid properties in FileUpload component.
 * @group Properties
 */
interface FileUploadProps {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * Name of the request parameter to identify the files at backend.
     */
    name?: string | undefined;
    /**
     * Remote url to upload the files.
     */
    url?: string | undefined;
    /**
     * Defines the UI of the component, possible values are "advanced" and "basic".
     * @defaultValue advanced
     */
    mode?: 'basic' | 'advanced' | undefined;
    /**
     * Used to select multiple files at once from file dialog.
     * @defaultValue false
     */
    multiple?: boolean | undefined;
    /**
     * Pattern to restrict the allowed file types such as "image/*".
     * @defaultValue false
     */
    accept?: string | undefined;
    /**
     * Icon of the remove element.
     */
    removeIcon?: IconType<FileUploadProps> | undefined;
    /**
     * Disables the upload functionality.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * When enabled, upload begins automatically after selection is completed.
     * @defaultValue false
     */
    auto?: boolean | undefined;
    /**
     * Maximum file size allowed in bytes.
     */
    maxFileSize?: number | undefined;
    /**
     * Summary message of the invalid fize size.
     * @defaultValue Invalid file size
     */
    invalidFileSizeMessageSummary?: string | undefined;
    /**
     * Detail message of the invalid fize size.
     * @defaultValue "Maximum upload size is."
     */
    invalidFileSizeMessageDetail?: string | undefined;
    /**
     * Inline style of the component.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Style class of the component.
     */
    className?: string | undefined;
    /**
     * Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
     * @defaultValue false
     */
    withCredentials?: boolean | undefined;
    /**
     * Width of the image thumbnail in pixels.
     * @defaultValue 50
     */
    previewWidth?: number | undefined;
    /**
     * Label of the choose button. Defaults to global value in Locale configuration.
     */
    chooseLabel?: string | undefined;
    /**
     * Label of the upload button. Defaults to global value in Locale configuration.
     */
    uploadLabel?: string | undefined;
    /**
     * Label of the cancel button. Defaults to global value in Locale configuration.
     */
    cancelLabel?: string | undefined;
    /**
     * Options used to customize the choose button. These options have "label", "icon", "className" and "style" properties.
     */
    chooseOptions?: FileUploadOptions | undefined;
    /**
     * Options used to customize the upload button. These options have "label", "icon", "className" and "style" properties.
     */
    uploadOptions?: FileUploadOptions | undefined;
    /**
     * Options used to customize the cancel button. These options have "label", "icon", "className" and "style" properties.
     */
    cancelOptions?: FileUploadOptions | undefined;
    /**
     * Whether to use the default upload or a manual implementation defined in uploadHandler callback.
     * @defaultValue false
     */
    customUpload?: boolean | undefined;
    /**
     * Custom template of the header.
     */
    headerClassName?: string | undefined;
    /**
     * Inline style of the header.
     */
    headerStyle?: React.CSSProperties | undefined;
    /**
     * Style class of the content.
     */
    contentClassName?: string | undefined;
    /**
     * Inline style of the content.
     */
    contentStyle?: React.CSSProperties | undefined;
    /**
     * Custom template of the header.
     */
    headerTemplate?: React.ReactNode | ((options: FileUploadHeaderTemplateOptions) => React.ReactNode);
    /**
     * Custom template of each item content in the container.
     */
    itemTemplate?: React.ReactNode | ((file: object, options: ItemTemplateOptions) => React.ReactNode);
    /**
     * Custom template of empty content in the container.
     */
    emptyTemplate?: React.ReactNode | ((props: FileUploadProps) => React.ReactNode);
    /**
     * Custom template of progressBar content in the container.
     */
    progressBarTemplate?: React.ReactNode | ((props: FileUploadProps) => React.ReactNode);
    /**
     * Callback to invoke before file upload begins to customize the request such as post parameters before the files.
     * @param {FileUploadBeforeUploadEvent} event - Custom beforeUpload.
     */
    onBeforeUpload?(event: FileUploadBeforeUploadEvent): void;
    /**
     * Callback to invoke before file send begins to customize the request such as adding headers.
     * @param {FileUploadBeforeSendEvent} event - Browser event.
     */
    onBeforeSend?(event: FileUploadBeforeSendEvent): void;
    /**
     * Callback to invoke before files dropped. Return false from callback to prevent drop.
     * @param {DragEvent} event - DragEvent instance.
     */
    onBeforeDrop?(event: DragEvent): void;
    /**
     * Callback to invoke before files are selected. Return false from callback to prevent selection.
     * @param {FileUploadSelectEvent} event - Custom select event.
     */
    onBeforeSelect?(event: FileUploadSelectEvent): void;
    /**
     * Callback to invoke when file upload is complete.
     * @param {FileUploadUploadEvent} event - Custom upload event.
     */
    onUpload?(event: FileUploadUploadEvent): void;
    /**
     * Callback to invoke if file upload fails.
     * @param {FileUploadErrorEvent} event - Custom error event.
     */
    onError?(event: FileUploadErrorEvent): void;
    /**
     * Callback to invoke when files in queue are removed without uploading.
     */
    onClear?(): void;
    /**
     * Callback to invoke when files are selected.
     * @param {FileUploadSelectEvent} event - Custom select event.
     */
    onSelect?(event: FileUploadSelectEvent): void;
    /**
     * Callback to invoke when files are being uploaded.
     * @param {FileUploadProgressEvent} event - Custom progress event.
     */
    onProgress?(event: FileUploadProgressEvent): void;
    /**
     * Callback to invoke when a validation file fails.
     * @param {File} file - Invalid file.
     */
    onValidationFail?(file: File): void;
    /**
     * Callback to invoke in custom upload mode to upload the files manually.
     * @param {FileUploadHandlerEvent} event - Custom uploadHandler event
     */
    uploadHandler?(event: FileUploadHandlerEvent): void;
    /**
     * Callback to invoke when a file is removed without uploading using clear button of a file.
     * @param {FileUploadRemoveEvent} event - Custom remove event.
     */
    onRemove?(event: FileUploadRemoveEvent): void;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
    /**
     * Uses to pass attributes to DOM elements inside the component.
     * @type {FileUploadPassThroughOptions}
     */
    pt?: FileUploadPassThroughOptions;
}

/**
 * **PrimeReact - FileUpload**
 *
 * _FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations._
 *
 * [Live Demo](https://www.primereact.org/fileupload/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class FileUpload extends React.Component<FileUploadProps, any> {
    /**
     * Uploads the selected files.
     */
    public upload(): void;
    /**
     * Clears the files list.
     */
    public clear(): void;
    /**
     * Formats the number of bytes.
     * @param {number} bytes - Custom size event.
     */
    public formatSize(bytes: number): number;
    /**
     * Handles file selection event and updates.
     * @param {FileUploadSelectEvent} event - Custom select event.
     */
    public onFileSelect(event: FileUploadSelectEvent): void;
    /**
     * Used to get container element.
     * @return {HTMLElement} Container element
     */
    public getElement(): HTMLElement;
    /**
     * Used to get input element.
     * @return {HTMLInputElement} Input element
     */
    public getInput(): HTMLInputElement;
    /**
     * Gets the current files list.
     * @return {File[]} Current files.
     */
    public getFiles(): File[];
    /**
     * Sets the current files list.
     * @param {File[]} files - Current files.
     */
    public setFiles(files: File[]): void;
    /**
     * Gets the current uploaded files list.
     * @return {File[]} Current uploaded files.
     */
    public getUploadedFiles(): File[];
    /**
     * Sets the current uploaded files list.
     * @param {File[]} files - Current uploaded files.
     */
    public setUploadedFiles(files: File[]): void;
}
