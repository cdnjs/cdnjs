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

export interface InputSwitchProps {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    style?: object;
    className?: string;
    inputId?: string;
    name?: string;
    checked?: any;
    trueValue?: any;
    falseValue?: any;
    disabled?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: InputSwitchChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
}

export declare class InputSwitch extends React.Component<InputSwitchProps, any> { }
