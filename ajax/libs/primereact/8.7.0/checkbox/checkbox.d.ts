import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

interface CheckboxChangeTargetOptions {
    type: string;
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

export interface CheckboxProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    id?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    inputId?: string;
    value?: any;
    name?: string;
    checked?: any;
    trueValue?: any;
    falseValue?: any;
    style?: React.CSSProperties;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    icon?: IconType<CheckboxProps>;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: CheckboxChangeParams): void;
    onMouseDown?(event: React.MouseEvent<HTMLElement>): void;
    onContextMenu?(event: React.MouseEvent<HTMLElement>): void;
    children?: React.ReactNode;
}

export declare class Checkbox extends React.Component<CheckboxProps, any> {
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
}
