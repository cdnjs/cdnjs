import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface InputNumberProps {
    value?: number;
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
    onValueChange?(e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void;
    onChange?(e: {originalEvent: Event, value: any}): void;
    onBlur?(e: Event): void;
    onFocus?(e: Event): void;
    onKeyDown?(e: Event): void;
}

export class InputNumber extends React.Component<InputNumberProps,any> {}
