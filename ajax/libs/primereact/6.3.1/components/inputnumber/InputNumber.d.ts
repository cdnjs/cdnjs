import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/inputnumber' {

    interface ValueChangeTargetOptions {
        name: string;
        id: string;
        value: number;
    }

    interface ValueChangeParams {
        originalEvent: React.SyntheticEvent;
        value: number;
        stopPropagation(): void;
        preventDefault(): void;
        target: ValueChangeTargetOptions;
    }

    interface ChangeParams {
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
        onValueChange?(e: ValueChangeParams): void;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
        onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    }

    export class InputNumber extends React.Component<InputNumberProps, any> { }
}
