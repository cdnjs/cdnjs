import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { KeyFilterType } from '../keyfilter';

type ChipsRemovableType = boolean | ((options: ChipsRemovableOptions) => boolean);

interface ChipsRemovableOptions {
    value: any;
    index: number;
    props: ChipsProps;
}

interface ChipsAddParams {
    originalEvent: React.SyntheticEvent;
    value: any;
}

interface ChipsRemoveParams extends ChipsAddParams {}

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

export interface ChipsProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'onFocus' | 'onBlur' | 'onKeyDown' | 'ref'> {
    inputRef?: React.Ref<HTMLInputElement>;
    inputId?: string;
    name?: string;
    placeholder?: string;
    value?: any[];
    max?: number;
    disabled?: boolean;
    readOnly?: boolean;
    removable?: ChipsRemovableType;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    separator?: string;
    allowDuplicate?: boolean;
    keyfilter?: KeyFilterType;
    addOnBlur?: boolean;
    itemTemplate?(item: any): React.ReactNode;
    onAdd?(e: ChipsAddParams): void;
    onRemove?(e: ChipsRemoveParams): void;
    onChange?(e: ChipsChangeParams): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
    children?: React.ReactNode;
}

export declare class Chips extends React.Component<ChipsProps, any> {
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
}
