import * as React from 'react';

type ConfirmPopupTemplateType = React.ReactNode | ((options: ConfirmPopupOptions) => React.ReactNode);

type ConfirmPopupAppendToType = 'self' | HTMLElement | undefined | null;

interface ConfirmPopupOptions {
    accept(): void;
    reject(): void;
    className: string;
    acceptClassName: string;
    rejectClassName: string;
    acceptLabel: string;
    rejectLabel: string;
    element: React.ReactNode;
    props: ConfirmPopupProps;
    [key: string]: any;
}

export interface ConfirmPopupProps {
    target?: HTMLElement;
    visible?: boolean;
    message?: ConfirmPopupTemplateType;
    rejectLabel?: string;
    acceptLabel?: string;
    icon?: string;
    rejectIcon?: string;
    acceptIcon?: string;
    rejectClassName?: string;
    acceptClassName?: string;
    className?: string;
    style?: object;
    appendTo?: ConfirmPopupAppendToType;
    dismissable?: boolean;
    footer?: ConfirmPopupTemplateType;
    transitionOptions?: object;
    onShow?(): void;
    onHide?(result: string): void;
    accept?(): void;
    reject?(): void;
}

interface ConfirmPopupReturn {
    show(): void;
    hide(): void;
}

export declare class ConfirmPopup extends React.Component<ConfirmPopupProps, any> { }

export declare function confirmPopup(props: ConfirmPopupProps): ConfirmPopupReturn;
