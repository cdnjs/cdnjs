import * as React from 'react';
import { DialogProps } from '../dialog/Dialog.d.ts';

interface ConfirmDialogProps extends DialogProps {
    visible?: boolean;
    message?: any;
    rejectLabel?: string;
    acceptLabel?: string;
    icon?: string;
    rejectIcon?: string;
    acceptIcon?: string;
    rejectClassName?: string;
    acceptClassName?: string;
    appendTo?: any;
    className?: string;
    footer?: any;
    breakpoints?: {[key: string]: string};
    onHide?(result: string): void;
    accept?(): void;
    reject?(): void;
}

export class ConfirmDialog extends React.Component<ConfirmDialogProps,any> {}

export function confirmDialog(props: ConfirmDialogProps):any;
