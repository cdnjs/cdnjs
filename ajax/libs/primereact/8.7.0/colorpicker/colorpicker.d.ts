import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { CSSTransitionProps } from '../csstransition';

type ColorPickerAppendToType = 'self' | HTMLElement | undefined | null;

type ColorPickerFormatType = 'hex' | 'rgb' | 'hsb';

type ColorPickerValueType = string | ColorPickerRGBType | ColorPickerHSBType | undefined;

interface ColorPickerRGBType {
    r: number;
    g: number;
    b: number;
}

interface ColorPickerHSBType {
    h: number;
    s: number;
    b: number;
}

interface ColorPickerChangeTargetOptions {
    name: string;
    id: string;
    value: ColorPickerValueType;
}

interface ColorPickerChangeParams {
    value: ColorPickerValueType;
    stopPropagation(): void;
    preventDefault(): void;
    target: ColorPickerChangeTargetOptions;
}

export interface ColorPickerProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'onChange' | 'value' | 'ref'> {
    inputRef?: React.Ref<HTMLInputElement>;
    value?: ColorPickerValueType;
    defaultColor?: string;
    inline?: boolean;
    format?: string;
    appendTo?: ColorPickerAppendToType;
    inputId?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    transitionOptions?: CSSTransitionProps;
    onChange?(e: ColorPickerChangeParams): void;
    onShow?(): void;
    onHide?(): void;
    children?: React.ReactNode;
}

export declare class ColorPicker extends React.Component<ColorPickerProps, any> {
    public show(): void;
    public hide(): void;
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
}
