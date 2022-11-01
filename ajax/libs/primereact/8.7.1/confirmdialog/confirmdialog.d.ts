import * as React from 'react';
import { DialogProps } from '../dialog';
import { IconType } from '../utils';

type ConfirmDialogTemplateType = React.ReactNode | ((options: ConfirmDialogOptions) => React.ReactNode);

type ConfirmDialogAppendToType = 'self' | HTMLElement | undefined | null;

interface ConfirmDialogOptions {
    accept(): void;
    reject(): void;
    acceptClassName: string;
    rejectClassName: string;
    acceptLabel: string;
    rejectLabel: string;
    element: React.ReactNode;
    props: ConfirmDialogProps;
    [key: string]: any;
}

export interface ConfirmDialogProps extends Omit<DialogProps, 'onHide' | 'footer'> {
    tagKey?: string;
    visible?: boolean;
    message?: ConfirmDialogTemplateType;
    rejectLabel?: string;
    acceptLabel?: string;
    icon?: IconType<ConfirmDialogProps>;
    rejectIcon?: IconType<ConfirmDialogProps>;
    acceptIcon?: IconType<ConfirmDialogProps>;
    rejectClassName?: string;
    acceptClassName?: string;
    appendTo?: ConfirmDialogAppendToType;
    className?: string;
    footer?: ConfirmDialogTemplateType;
    onHide?(result: string): void;
    accept?(): void;
    reject?(): void;
    children?: React.ReactNode;
}

interface ConfirmDialogReturn {
    show(): void;
    hide(): void;
}

export declare class ConfirmDialog extends React.Component<ConfirmDialogProps, any> {
    public confirm(props?: ConfirmDialogProps): void;
}

export declare function confirmDialog(props: ConfirmDialogProps): ConfirmDialogReturn;
