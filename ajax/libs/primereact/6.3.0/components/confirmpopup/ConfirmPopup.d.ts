import * as React from 'react';

declare namespace ConfirmPopup {

    type TemplateType = React.ReactNode | ((props: ConfirmPopupProps) => React.ReactNode);

    interface ConfirmPopupProps {
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
        appendTo?: HTMLElement | string;
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
}

export declare class ConfirmPopup extends React.Component<ConfirmPopup.ConfirmPopupProps, any> { }

export declare function confirmPopup(props: ConfirmPopup.ConfirmPopupProps): ConfirmPopup.ConfirmPopupReturn;
