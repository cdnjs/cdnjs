import * as React from 'react';
import { InputText } from '../inputtext/inputtext';
import TooltipOptions from '../tooltip/tooltipoptions';

interface InputNumberValueChangeTargetOptions {
    name: string;
    id: string;
    value: number | null;
}

interface InputNumberValueChangeParams {
    originalEvent: React.SyntheticEvent;
    value: number | null;
    stopPropagation(): void;
    preventDefault(): void;
    target: InputNumberValueChangeTargetOptions;
}

interface InputNumberChangeParams {
    originalEvent: React.SyntheticEvent;
    value: number | null;
}

export interface InputNumberProps extends Omit<React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, 'onChange' | 'ref'> {
    value?: number | null;
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
    name?: string;
    type?: string;
    allowEmpty?: boolean;
    step?: number;
    min?: number;
    max?: number;
    maxLength?: number;
    disabled?: boolean;
    required?: boolean;
    tabIndex?: number;
    pattern?: string;
    placeholder?: string;
    readOnly?: boolean;
    size?: number;
    inputId?: string;
    autoFocus?: boolean;
    inputStyle?: React.CSSProperties;
    inputClassName?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onValueChange?(e: InputNumberValueChangeParams): void;
    onChange?(e: InputNumberChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    children?: React.ReactNode;
}

export declare class InputNumber extends React.Component<InputNumberProps, any> {
    public getFormatter(): any;
    public getElement(): HTMLSpanElement;
    public getInput(): typeof InputText;
}
