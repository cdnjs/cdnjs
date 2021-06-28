import * as React from 'react';
import { DialogProps } from '../dialog';

type ConfirmDialogTemplateType = React.ReactNode | ((options: ConfirmDialogOptions) => React.ReactNode);

type ConfirmDialogAppendToType = 'self' | HTMLElement | undefined | null;

interface ConfirmDialogBreakpoints {
    [key: string]: string;
}

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

export interface ConfirmDialogProps extends Omit<DialogProps, 'onHide'> {
    visible?: boolean;
    message?: ConfirmDialogTemplateType;
    rejectLabel?: string;
    acceptLabel?: string;
    icon?: string;
    rejectIcon?: string;
    acceptIcon?: string;
    rejectClassName?: string;
    acceptClassName?: string;
    appendTo?: ConfirmDialogAppendToType;
    className?: string;
    footer?: ConfirmDialogTemplateType;
    breakpoints?: ConfirmDialogBreakpoints;
    onHide?(result: string): void;
    accept?(): void;
    reject?(): void;
}

interface ConfirmDialogReturn {
    show(): void;
    hide(): void;
}

export declare class ConfirmDialog extends React.Component<ConfirmDialogProps, any> { }

export declare function confirmDialog(props: ConfirmDialogProps): ConfirmDialogReturn;
