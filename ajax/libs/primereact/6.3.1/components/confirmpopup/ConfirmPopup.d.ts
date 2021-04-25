import * as React from 'react';

declare module 'primereact/confirmpopup' {

    type TemplateType = React.ReactNode | ((props: ConfirmPopupProps) => React.ReactNode);

    type AppendToType = 'self' | HTMLElement | undefined | null;

    export interface ConfirmPopupProps {
        target?: HTMLElement;
        visible?: boolean;
        message?: TemplateType;
        rejectLabel?: string;
        acceptLabel?: string;
        icon?: string;
        rejectIcon?: string;
        acceptIcon?: string;
        rejectClassName?: string;
        acceptClassName?: string;
        className?: string;
        style?: object;
        appendTo?: AppendToType;
        dismissable?: boolean;
        footer?: TemplateType;
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

    export class ConfirmPopup extends React.Component<ConfirmPopupProps, any> { }

    export function confirmPopup(props: ConfirmPopupProps): ConfirmPopupReturn;
}
