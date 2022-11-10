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

export interface TriStateCheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'value' | 'ref'> {
    value?: boolean | undefined | null;
    disabled?: boolean;
    readOnly?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: TriStateCheckboxChangeParams): void;
    children?: React.ReactNode;
}

export declare class TriStateCheckbox extends React.Component<TriStateCheckboxProps, any> {
    public getElement(): HTMLDivElement;
}
