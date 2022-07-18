import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

type ButtonPositionType = 'top' | 'bottom' | 'left' | 'right';

export interface ButtonProps extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'disabled'|'ref'> {
    label?: string;
    icon?: IconType<ButtonProps>;
    iconPos?: ButtonPositionType;
    badge?: string;
    badgeClassName?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: IconType<ButtonProps>;
    children?: React.ReactNode;
}

export declare class Button extends React.Component<ButtonProps, any> { 
    public getElement(): HTMLButtonElement;
}
