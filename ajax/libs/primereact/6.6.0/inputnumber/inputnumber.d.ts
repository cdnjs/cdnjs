import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface InputNumberValueChangeTargetOptions {
    name: string;
    id: string;
    value: number;
}

interface InputNumberValueChangeParams {
    originalEvent: React.SyntheticEvent;
    value: number;
    stopPropagation(): void;
    preventDefault(): void;
    target: InputNumberValueChangeTargetOptions;
}

interface InputNumberChangeParams {
    originalEvent: React.SyntheticEvent;
    value: number;
}

export interface InputNumberProps {
    value?: number;
    inputRef?: React.Ref<HTMLInputElement>;
    format?: boolean;
    showButtons?: boolean;
    buttonLayout?: string;
    incrementButtonClassName?: string;
    decrementButtonClassName?: string;
    incrementButtonIcon?: string;
    decrementButtonIcon?: string;
    locale?: string;
    localeMatcher?: string;
    mode?: string;
    suffix?: string;
    prefix?: string;
    currency?: string;
    currencyDisplay?: string;
    useGrouping?: boolean;
    minFractionDigits?: number;
    maxFractionDigits?: number;
    id?: string;
    name?: string;
    type?: string;
    allowEmpty?: boolean;
    step?: number;
    min?: number;
    max?: number;
    disabled?: boolean;
    required?: boolean;
    tabIndex?: number;
    pattern?: string;
    inputMode?: string;
    placeholder?: string;
    readOnly?: boolean;
    size?: number;
    style?: object;
    className?: string;
    inputId?: string;
    autoFocus?: boolean;
    inputStyle?: object;
    inputClassName?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onValueChange?(e: InputNumberValueChangeParams): void;
    onChange?(e: InputNumberChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
}

export declare class InputNumber extends React.Component<InputNumberProps, any> { }
