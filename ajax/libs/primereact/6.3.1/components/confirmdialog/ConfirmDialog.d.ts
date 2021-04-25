import * as React from 'react';
import { DialogProps } from 'primereact/dialog';

declare module 'primereact/confirmdialog' {

    type TemplateType = React.ReactNode | ((props: ConfirmDialogProps) => React.ReactNode);

    type AppendToType = 'self' | HTMLElement | undefined | null;

    interface Breakpoints {
        [key: string]: string;
    }

    export interface ConfirmDialogProps extends Omit<DialogProps, 'onHide'> {
        visible?: boolean;
        message?: TemplateType;
        rejectLabel?: string;
        acceptLabel?: string;
        icon?: string;
        rejectIcon?: string;
        acceptIcon?: string;
        rejectClassName?: string;
        acceptClassName?: string;
        appendTo?: AppendToType;
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

    export class ConfirmDialog extends React.Component<ConfirmDialogProps, any> { }

    export function confirmDialog(props: ConfirmDialogProps): ConfirmDialogReturn;
}
