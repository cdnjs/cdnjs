import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface SelectButtonProps {
    id?: string;
    value?: any;
    options?: any[];
    optionLabel?: string;
    optionValue?: string;
    optionDisabled?: string;
    tabIndex?: number;
    multiple?: boolean;
    disabled?: boolean;
    style?: object;
    className?: string;
    dataKey?: string;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    itemTemplate?(option:any): React.ReactNode;
    onChange?(e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void;
}

export class SelectButton extends React.Component<SelectButtonProps,any> {}
