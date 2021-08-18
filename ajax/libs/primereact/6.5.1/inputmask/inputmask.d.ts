import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface InputMaskCompleteParams {
    originalEvent: React.SyntheticEvent;
    value: string | undefined | null;
}

interface InputMaskChangeTargetOptions {
    name: string;
    id: string;
    value: string;
}

interface InputMaskChangeParams {
    originalEvent: React.SyntheticEvent;
    value: string;
    stopPropagation(): void;
    preventDefault(): void;
    target: InputMaskChangeTargetOptions;
}

export interface InputMaskProps {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    value?: string;
    type?: string;
    mask?: string;
    slotChar?: string;
    autoClear?: boolean;
    unmask?: boolean;
    style?: object;
    className?: string;
    placeholder?: string;
    size?: number;
    maxlength?: number;
    tabIndex?: number;
    disabled?: boolean;
    readOnly?: boolean;
    name?: string;
    required?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onComplete?(e: InputMaskCompleteParams): void;
    onChange?(e: InputMaskChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
}

export declare class InputMask extends React.Component<InputMaskProps, any> { }
