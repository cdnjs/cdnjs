import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface CheckboxProps {
    id?: string;
    inputId?: string;
    value?: any;
    name?: string;
    checked?: boolean;
    style?: object;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    readOnly?: boolean;
    tabIndex?: number;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?: string;
    onMouseDown?(event: Event): void;
    onContextMenu?(event: Event): void;
    onChange?(e: {originalEvent: Event, value: any, checked: boolean, target: {type: string, name: string, id: string, value: any, checked: boolean}}): void;
}

export class Checkbox extends React.Component<CheckboxProps,any> {}
