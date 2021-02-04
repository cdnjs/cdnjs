import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface TriStateCheckboxProps {
    id?: string;
    inputId?: string;
    value?: boolean | null;
    name?: string;
    style?: object;
    className?: string;
    disabled?: boolean;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onChange?(e: {originalEvent: Event, value: any, target: {name: string, id: string, value: any}}): void;
}

export class TriStateCheckbox extends React.Component<TriStateCheckboxProps,any> {}
