import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

type PasswordHeaderType = React.ReactNode | ((props: PasswordProps) => React.ReactNode);

type PasswordFooterType = React.ReactNode | ((props: PasswordProps) => React.ReactNode);

type PasswordContentType = React.ReactNode | ((props: PasswordProps) => React.ReactNode);

interface PasswordIconParams {
    onClick(): void;
    className: string;
    element: JSX.Element;
    props: PasswordProps;
}

type PasswordIconType = React.ReactNode | ((e: PasswordIconParams) => React.ReactNode);

type PasswordAppendToType = 'self' | HTMLElement | undefined | null;

export interface PasswordProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onInput'> {
    id?: string;
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    promptLabel?: string;
    weakLabel?: string;
    mediumLabel?: string;
    strongLabel?: string;
    mediumRegex?: string;
    strongRegex?: string;
    feedback?: boolean;
    toggleMask?: boolean;
    appendTo?: PasswordAppendToType;
    header?: PasswordHeaderType;
    content?: PasswordContentType;
    footer?: PasswordFooterType;
    icon?: PasswordIconType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    style?: object;
    className?: string;
    inputStyle?: object;
    inputClassName?: string;
    panelStyle?: object;
    panelClassName?: string;
    transitionOptions?: object;
    onInput?(event: React.FormEvent<HTMLInputElement>, validatePattern: boolean): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class Password extends React.Component<PasswordProps, any> { }
