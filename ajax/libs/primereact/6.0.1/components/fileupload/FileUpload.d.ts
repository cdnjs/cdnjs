import * as React from 'react';

interface FileUploadProps {
    id?: string;
    name?: string;
    url?: string;
    mode?: string;
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
    customUpload?: boolean;
    emptyTemplate?: ((props: object) => any | any);
    onBeforeUpload?(e: { xhr: XMLHttpRequest, formData: any }): void;
    onBeforeSend?(e: { xhr: XMLHttpRequest, formData: any }): void;
    onUpload?(e: {xhr: XMLHttpRequest, files: any}): void;
    onError?(e: {xhr: XMLHttpRequest, files: any}): void;
    onClear?(): void;
    onSelect?(e: {originalEvent: Event, files: any}): void;
    onProgress?(e: {originalEvent: Event, progress: any}): void;
    onValidationFail?(file: File): void;
    uploadHandler?(e: {files: any}): void;
    onRemove?(e: {originalEvent: Event, file: any}): void;
}

export class FileUpload extends React.Component<FileUploadProps,any> {
    public upload():void;
    public clear():void;
}
