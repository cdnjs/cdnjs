import * as React from 'react';
import { InputText, InputTextProps } from '../inputtext';
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

export interface InputMaskProps extends Omit<InputTextProps, 'onChange'> {
    mask?: string;
    slotChar?: string;
    autoClear?: boolean;
    unmask?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onComplete?(e: InputMaskCompleteParams): void;
    onChange?(e: InputMaskChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    children?: React.ReactNode;
}

export declare class InputMask extends React.Component<InputMaskProps, any> {
    public getElement(): typeof InputText;
}
