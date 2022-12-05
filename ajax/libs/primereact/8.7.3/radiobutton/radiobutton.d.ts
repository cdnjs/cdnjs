import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface RadioButtonChangeTargetOptions {
    type: string;
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

export interface RadioButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    inputRef?: React.Ref<HTMLInputElement>;
    inputId?: string;
    name?: string;
    value?: any;
    checked?: boolean;
    disabled?: boolean;
    required?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: RadioButtonChangeParams): void;
    children?: React.ReactNode;
}

export declare class RadioButton extends React.Component<RadioButtonProps, any> {
    public select(e?: React.SyntheticEvent): void;
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
}
