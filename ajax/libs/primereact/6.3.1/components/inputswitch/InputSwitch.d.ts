import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/inputswitch' {

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: boolean;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: boolean;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    export interface InputSwitchProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        style?: object;
        className?: string;
        inputId?: string;
        name?: string;
        checked?: boolean;
        disabled?: boolean;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
    }

    export class InputSwitch extends React.Component<InputSwitchProps, any> { }
}
