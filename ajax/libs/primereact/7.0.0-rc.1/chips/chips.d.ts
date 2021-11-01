import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface ChipsAddParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface ChipsRemoveParams extends ChipsAddParams { }

interface ChipsChangeTargetOptions {
    name: string;
    id: string;
    value: any[];
}

interface ChipsChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any[];
    stopPropagation(): void;
    preventDefault(): void;
    target: ChipsChangeTargetOptions;
}

export interface ChipsProps {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    name?: string;
    placeholder?: string;
    value?: any[];
    max?: number;
    disabled?: boolean;
    style?: object;
    className?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    separator?: string;
    allowDuplicate?: boolean;
    itemTemplate?(item: any): React.ReactNode;
    onAdd?(e: ChipsAddParams): void;
    onRemove?(e: ChipsRemoveParams): void;
    onChange?(e: ChipsChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
}

export declare class Chips extends React.Component<ChipsProps, any> { }
