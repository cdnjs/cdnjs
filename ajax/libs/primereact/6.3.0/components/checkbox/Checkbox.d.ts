import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare namespace Checkbox {
    interface ChangeTargetOptions {
        type: 'checkbox';
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

    interface CheckboxProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        inputId?: string;
        value?: any;
        name?: string;
        checked?: boolean;
        style?: object;
        className?: string;
        disabled?: boolean;
        required?: boolean;
        readOnly?: boolean;
        tabIndex?: number;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
        onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
        onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    }
}

export declare class Checkbox extends React.Component<Checkbox.CheckboxProps, any> { }
