import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface InputSwitchChangeTargetOptions {
    name: string;
    id: string;
    value: boolean;
}

interface InputSwitchChangeParams {
    originalEvent: React.SyntheticEvent;
    value: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: InputSwitchChangeTargetOptions;
}

export interface InputSwitchProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    style?: React.CSSProperties;
    className?: string;
    inputId?: string;
    name?: string;
    tabIndex?: number;
    checked?: any;
    trueValue?: any;
    falseValue?: any;
    disabled?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: InputSwitchChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    children?: React.ReactNode;
}

export declare class InputSwitch extends React.Component<InputSwitchProps, any> {
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
}
