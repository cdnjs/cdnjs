import * as React from 'react';
import { Dialog } from '../dialog/Dialog';

declare namespace ConfirmDialog {

    type TemplateType = React.ReactNode | ((props: ConfirmDialogProps) => React.ReactNode);

    interface Breakpoints {
        [key: string]: string;
    }

    interface ConfirmDialogProps extends Omit<Dialog.DialogProps, 'onHide'> {
        visible?: boolean;
        message?: TemplateType;
        rejectLabel?: string;
        acceptLabel?: string;
        icon?: string;
        rejectIcon?: string;
        acceptIcon?: string;
        rejectClassName?: string;
        acceptClassName?: string;
        appendTo?: HTMLElement | string;
        className?: string;
        footer?: TemplateType;
        breakpoints?: Breakpoints;
        onHide?(result: string): void;
        accept?(): void;
        reject?(): void;
    }

    interface ConfirmDialogReturn {
        show(): void;
        hide(): void;
    }
}

export declare class ConfirmDialog extends React.Component<ConfirmDialog.ConfirmDialogProps, any> { }

export declare function confirmDialog(props: ConfirmDialog.ConfirmDialogProps): ConfirmDialog.ConfirmDialogReturn;
