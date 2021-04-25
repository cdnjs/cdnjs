import * as React from 'react';

declare module 'primereact/fileupload' {

    type ModeType = 'basic' | 'advanced';

    interface OptionsType {
        label?: string;
        icon?: string;
        iconOnly?: boolean;
        className?: string;
        style?: object
    }

    interface HeaderTemplateOptions {
        className: string;
        chooseButton: JSX.Element;
        uploadButton: JSX.Element;
        cancelButton: JSX.Element;
        element: JSX.Element;
        props: FileUploadProps;
    }

    type HeaderTemplateType = React.ReactNode | ((options: HeaderTemplateOptions) => React.ReactNode);

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

    type ItemTemplateType = React.ReactNode | ((file: object, options: ItemTemplateOptions) => React.ReactNode);

    type EmptyTemplateType = React.ReactNode | ((props: FileUploadProps) => React.ReactNode);

    interface BeforeUploadParams {
        xhr: XMLHttpRequest;
        formData: FormData;
    }

    interface BeforeSendParams extends BeforeUploadParams { }

    interface FilesParam {
        files: File[];
    }

    interface UploadParams extends FilesParam {
        xhr: XMLHttpRequest;
    }

    interface ErrorParams extends UploadParams { }

    interface SelectParams extends FilesParam {
        originalEvent: React.SyntheticEvent;
    }

    interface ProgressParams {
        originalEvent: React.SyntheticEvent;
        progress: number;
    }

    interface RemoveParams extends SelectParams { }

    export interface FileUploadProps {
        id?: string;
        name?: string;
        url?: string;
        mode?: ModeType;
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
        chooseOptions?: OptionsType;
        uploadOptions?: OptionsType;
        cancelOptions?: OptionsType;
        customUpload?: boolean;
        headerClassName?: string;
        headerStyle?: object;
        contentClassName?: string;
        contentStyle?: object;
        headerTemplate?: HeaderTemplateType;
        itemTemplate?: ItemTemplateType;
        emptyTemplate?: EmptyTemplateType;
        onBeforeUpload?(e: BeforeUploadParams): void;
        onBeforeSend?(e: BeforeSendParams): void;
        onUpload?(e: UploadParams): void;
        onError?(e: ErrorParams): void;
        onClear?(): void;
        onSelect?(e: SelectParams): void;
        onProgress?(e: ProgressParams): void;
        onValidationFail?(file: File): void;
        uploadHandler?(e: FilesParam): void;
        onRemove?(e: RemoveParams): void;
    }

    export class FileUpload extends React.Component<FileUploadProps, any> {
        public upload(): void;
        public clear(): void;
    }
}
