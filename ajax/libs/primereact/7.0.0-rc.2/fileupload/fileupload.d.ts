import * as React from 'react';

type FileUploadModeType = 'basic' | 'advanced';

interface FileUploadOptionsType {
    label?: string;
    icon?: string;
    iconOnly?: boolean;
    className?: string;
    style?: object
}

interface FileUploadHeaderTemplateOptions {
    className: string;
    chooseButton: JSX.Element;
    uploadButton: JSX.Element;
    cancelButton: JSX.Element;
    element: JSX.Element;
    props: FileUploadProps;
}

type FileUploadHeaderTemplateType = React.ReactNode | ((options: FileUploadHeaderTemplateOptions) => React.ReactNode);

interface ItemTemplateOptions {
    onRemove(event: React.SyntheticEvent): void;
    previewElement: JSX.Element;
    fileNameElement: JSX.Element;
    sizeElement: JSX.Element;
    removeElement: JSX.Element;
    formatSize: string;
    element: JSX.Element;
    props: FileUploadProps;
}

type FileUploadItemTemplateType = React.ReactNode | ((file: object, options: ItemTemplateOptions) => React.ReactNode);

type FileUploadEmptyTemplateType = React.ReactNode | ((props: FileUploadProps) => React.ReactNode);

type FileUploadProgressBarTemplateType = React.ReactNode | ((props: FileUploadProps) => React.ReactNode);

interface FileUploadBeforeUploadParams {
    xhr: XMLHttpRequest;
    formData: FormData;
}

interface FileUploadBeforeSendParams extends FileUploadBeforeUploadParams { }

interface FileUploadFilesParam {
    files: File[];
}

interface FileUploadUploadParams extends FileUploadFilesParam {
    xhr: XMLHttpRequest;
}

interface FileUploadErrorParams extends FileUploadUploadParams { }

interface FileUploadSelectParams extends FileUploadFilesParam {
    originalEvent: React.SyntheticEvent;
}

interface FileUploadProgressParams {
    originalEvent: React.SyntheticEvent;
    progress: number;
}

interface FileUploadHandlerOptions {
    clear(): void;
    props: FileUploadProps;
}

interface FileUploadHandlerParam extends FileUploadFilesParam {
    options: FileUploadHandlerOptions;
}

interface FileUploadRemoveParams extends FileUploadSelectParams { }

interface FileUploadProps {
    id?: string;
    name?: string;
    url?: string;
    mode?: FileUploadModeType;
    multiple?: boolean;
    accept?: string;
    disabled?: boolean;
    auto?: boolean;
    maxFileSize?: number;
    invalidFileSizeMessageSummary?: string;
    invalidFileSizeMessageDetail?: string;
    style?: object;
    className?: string;
    withCredentials?: boolean;
    previewWidth?: number;
    chooseLabel?: string;
    uploadLabel?: string;
    cancelLabel?: string;
    chooseOptions?: FileUploadOptionsType;
    uploadOptions?: FileUploadOptionsType;
    cancelOptions?: FileUploadOptionsType;
    customUpload?: boolean;
    headerClassName?: string;
    headerStyle?: object;
    contentClassName?: string;
    contentStyle?: object;
    headerTemplate?: FileUploadHeaderTemplateType;
    itemTemplate?: FileUploadItemTemplateType;
    emptyTemplate?: FileUploadEmptyTemplateType;
    progressBarTemplate?: FileUploadProgressBarTemplateType;
    onBeforeUpload?(e: FileUploadBeforeUploadParams): void;
    onBeforeSend?(e: FileUploadBeforeSendParams): void;
    onUpload?(e: FileUploadUploadParams): void;
    onError?(e: FileUploadErrorParams): void;
    onClear?(): void;
    onSelect?(e: FileUploadSelectParams): void;
    onProgress?(e: FileUploadProgressParams): void;
    onValidationFail?(file: File): void;
    uploadHandler?(e: FileUploadHandlerParam): void;
    onRemove?(e: FileUploadRemoveParams): void;
}

export declare class FileUpload extends React.Component<FileUploadProps, any> {
    public upload(): void;
    public clear(): void;
}
