import * as React from 'react';

interface ConfirmPopupProps {
    target?: any;
    visible?: boolean;
    message?: any;
    rejectLabel?: string;
    acceptLabel?: string;
    icon?: string;
    rejectIcon?: string;
    acceptIcon?: string;
    rejectClassName?: string;
    acceptClassName?: string;
    className?: string;
    style?: object;
    appendTo?: any;
    dismissable?: boolean;
    footer?: any;
    onHide?(result: string): void;
    accept?(): void;
    reject?(): void;
}

export class ConfirmPopup extends React.Component<ConfirmPopupProps,any> {}

export function confirmPopup(props: ConfirmPopupProps):any;
