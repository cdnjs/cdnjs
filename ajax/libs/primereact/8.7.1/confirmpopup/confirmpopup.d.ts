import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { IconType } from '../utils';

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
    tagKey?: string;
    target?: HTMLElement;
    visible?: boolean;
    message?: ConfirmPopupTemplateType;
    rejectLabel?: string;
    acceptLabel?: string;
    icon?: IconType<ConfirmPopupProps>;
    rejectIcon?: IconType<ConfirmPopupProps>;
    acceptIcon?: IconType<ConfirmPopupProps>;
    rejectClassName?: string;
    acceptClassName?: string;
    className?: string;
    style?: React.CSSProperties;
    appendTo?: ConfirmPopupAppendToType;
    dismissable?: boolean;
    footer?: ConfirmPopupTemplateType;
    transitionOptions?: CSSTransitionProps;
    onShow?(): void;
    onHide?(result: string): void;
    accept?(): void;
    reject?(): void;
    children?: React.ReactNode;
}

interface ConfirmPopupReturn {
    show(): void;
    hide(): void;
}

export declare class ConfirmPopup extends React.Component<ConfirmPopupProps, any> {
    public confirm(props?: ConfirmPopupProps): void;
}

export declare function confirmPopup(props: ConfirmPopupProps): ConfirmPopupReturn;
