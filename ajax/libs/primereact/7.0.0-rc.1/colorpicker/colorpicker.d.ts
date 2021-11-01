import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import Omit from '../util';

type ColorPickerAppendToType = 'self' | HTMLElement | undefined | null;

type ColorPickerFormatType = 'hex' | 'rgb' | 'hsb';

interface ColorPickerChangeTargetOptions {
    name: string;
    id: string;
    value: string;
}

interface ColorPickerChangeParams {
    value: string;
    stopPropagation(): void;
    preventDefault(): void;
    target: ColorPickerChangeTargetOptions;
}

export interface ColorPickerProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'value'> {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: any;
    defaultColor?: string;
    inline?: boolean;
    format?: string;
    appendTo?: ColorPickerAppendToType;
    inputId?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    transitionOptions?: object;
    onChange?(e: ColorPickerChangeParams): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class ColorPicker extends React.Component<ColorPickerProps, any> { }
