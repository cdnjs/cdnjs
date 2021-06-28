import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

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

export interface SelectButtonProps {
    id?: string;
    value?: any;
    options?: any[];
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
}

export declare class SelectButton extends React.Component<SelectButtonProps, any> { }
