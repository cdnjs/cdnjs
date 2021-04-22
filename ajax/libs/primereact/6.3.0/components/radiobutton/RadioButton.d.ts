import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare namespace RadioButton {

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: any;
        checked: boolean;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: any;
        checked: boolean;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    interface RadioButtonProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        inputId?: string;
        name?: string;
        value?: any;
        checked?: boolean;
        style?: object;
        className?: string;
        disabled?: boolean;
        required?: boolean;
        tabIndex?: number;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
    }
}

export declare class RadioButton extends React.Component<RadioButton.RadioButtonProps, any> { }
