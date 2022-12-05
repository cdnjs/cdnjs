import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

type ButtonPositionType = 'top' | 'bottom' | 'left' | 'right';

export interface ButtonProps extends Omit<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'disabled' | 'ref'> {
    badge?: string;
    badgeClassName?: string;
    children?: React.ReactNode;
    disabled?: boolean;
    icon?: IconType<ButtonProps>;
    iconPos?: ButtonPositionType;
    label?: string;
    loading?: boolean;
    loadingIcon?: IconType<ButtonProps>;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    visible?: boolean;
}

export declare class Button extends React.Component<ButtonProps, any> {}
