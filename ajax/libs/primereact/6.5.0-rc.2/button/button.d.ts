import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

type ButtonPositionType = 'top' | 'bottom' | 'left' | 'right';

type ButtonIconType = React.ReactNode | ((options: ButtonIconOptions) => React.ReactNode);

export interface ButtonIconOptions {
    className: string;
    element: React.ReactNode;
    props: ButtonProps;
}

export interface ButtonProps extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'disabled'> {
    label?: string;
    icon?: ButtonIconType;
    iconPos?: ButtonPositionType;
    badge?: string;
    badgeClassName?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: ButtonIconType;
}

export declare class Button extends React.Component<ButtonProps, any> { }
