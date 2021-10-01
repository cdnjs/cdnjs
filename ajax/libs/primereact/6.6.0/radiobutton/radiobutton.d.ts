import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface RadioButtonChangeTargetOptions {
    name: string;
    id: string;
    value: any;
    checked: boolean;
}

interface RadioButtonChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    checked: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: RadioButtonChangeTargetOptions;
}

export interface RadioButtonProps {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputId?: string;
    name?: string;
    value?: any;
    checked?: boolean;
    style?: object;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    tabIndex?: number;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: RadioButtonChangeParams): void;
}

export declare class RadioButton extends React.Component<RadioButtonProps, any> { }
