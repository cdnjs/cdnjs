import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/inputmask' {

    interface CompleteParams {
        originalEvent: React.SyntheticEvent;
        value: string | undefined | null;
    }

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: string;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: string;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
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
        onComplete?(e: CompleteParams): void;
        onChange?(e: ChangeParams): void;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
    }

    export class InputMask extends React.Component<InputMaskProps, any> { }
}
