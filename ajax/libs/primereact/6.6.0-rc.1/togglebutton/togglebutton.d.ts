import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

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

export interface ToggleButtonProps {
    id?: string;
    onIcon?: string;
    offIcon?: string;
    onLabel?: string;
    offLabel?: string;
    iconPos?: ToggleButtonIconPositionType;
    style?: object;
    className?: string;
    checked?: boolean;
    tabIndex?: number;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: ToggleButtonChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLElement>): void;
    onBlur?(event: React.FocusEvent<HTMLElement>): void;
}

export declare class ToggleButton extends React.Component<ToggleButtonProps, any> { }
