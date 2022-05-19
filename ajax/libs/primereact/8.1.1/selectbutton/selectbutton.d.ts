import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { SelectItemOptionsType } from '../selectitem/SelectItem';

type SelectButtonOptionDisabledType = string | ((option: any) => boolean);

interface SelectButtonChangeTargetOptions {
    name: string;
    id: string;
    value: any;
}

interface SelectButtonChangeParams {
    originalEvent: React.SyntheticEvent;
    value: any;
    stopPropagation(): void;
    preventDefault(): void;
    target: SelectButtonChangeTargetOptions;
}

export interface SelectButtonProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'unselectable' | 'onChange' | 'ref'> {
    id?: string;
    value?: any;
    options?: SelectItemOptionsType;
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: SelectButtonOptionDisabledType;
    tabIndex?: number;
    multiple?: boolean;
    unselectable?: boolean;
    disabled?: boolean;
    style?: object;
    className?: string;
    dataKey?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    itemTemplate?(option: any): React.ReactNode;
    onChange?(e: SelectButtonChangeParams): void;
    children?: React.ReactNode;
}

export declare class SelectButton extends React.Component<SelectButtonProps, any> { }
