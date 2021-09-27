import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface TriStateCheckboxChangeTargetOptions {
    name: string;
    id: string;
    value: boolean | undefined | null;
}

interface TriStateCheckboxChangeParams {
    originalEvent: React.SyntheticEvent;
    value: boolean | undefined | null;
    stopPropagation(): void;
    preventDefault(): void;
    target: TriStateCheckboxChangeTargetOptions;
}

export interface TriStateCheckboxProps {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputId?: string;
    value?: boolean | undefined | null;
    name?: string;
    style?: object;
    className?: string;
    disabled?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: TriStateCheckboxChangeParams): void;
}

export declare class TriStateCheckbox extends React.Component<TriStateCheckboxProps, any> { }
