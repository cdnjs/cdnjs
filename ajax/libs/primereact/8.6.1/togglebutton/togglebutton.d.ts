import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

type ToggleButtonIconPositionType = 'left' | 'right';

interface ToggleButtonChangeTargetOptions {
    name: string;
    id: string;
    value: boolean;
}

interface ToggleButtonChangeParams {
    originalEvent: React.SyntheticEvent;
    value: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: ToggleButtonChangeTargetOptions;
}

export interface ToggleButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    onIcon?: IconType<ToggleButtonProps>;
    offIcon?: IconType<ToggleButtonProps>;
    onLabel?: string;
    offLabel?: string;
    iconPos?: ToggleButtonIconPositionType;
    checked?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: ToggleButtonChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLElement>): void;
    onBlur?(event: React.FocusEvent<HTMLElement>): void;
    children?: React.ReactNode;
}

export declare class ToggleButton extends React.Component<ToggleButtonProps, any> {
    public getElement(): HTMLDivElement;
}
