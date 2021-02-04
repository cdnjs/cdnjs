import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface ToggleButtonProps {
    id?: string;
    onIcon?: string;
    offIcon?: string;
    onLabel?: string;
    offLabel?: string;
    iconPos?: string;
    style?: object;
    className?: string;
    checked?: boolean;
    tabIndex?: number;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    ariaLabelledBy?:string;
    onChange?(e: {originalEvent: Event, value: boolean, target: {type: string, name: string, id: string, value: boolean}}): void;
    onFocus?(event: Event): void;
    onBlur?(event: Event): void;
}

export class ToggleButton extends React.Component<ToggleButtonProps,any> {}
