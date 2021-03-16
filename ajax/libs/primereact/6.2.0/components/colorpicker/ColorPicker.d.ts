import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

interface ColorPickerProps {
    id?: string;
    value?: any;
    style?: object;
    className?: string;
    defaultColor?: string;
    inline?: boolean;
    format?: string;
    appendTo?: any;
    disabled?: boolean;
    tabIndex?: number;
    inputId?: string;
    tooltip?: any;
    tooltipOptions?: TooltipOptions;
    onChange?(value: any, target: {name: string, id: string, value: any}): void;
}

export class ColorPicker extends React.Component<ColorPickerProps,any> {}
