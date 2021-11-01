import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface CheckboxChangeTargetOptions {
    type: 'checkbox';
    name: string;
    id: string;
    value: any;
    checked: boolean;
}

interface CheckboxChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    checked: boolean;
    stopPropagation(): void;
    preventDefault(): void;
    target: CheckboxChangeTargetOptions;
}

export interface CheckboxProps {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputId?: string;
    value?: any;
    name?: string;
    checked?: any;
    trueValue?: any;
    falseValue?: any;
    style?: object;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    icon?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: CheckboxChangeParams): void;
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
}

export declare class Checkbox extends React.Component<CheckboxProps, any> { }
