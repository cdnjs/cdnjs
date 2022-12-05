import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import TooltipOptions from '../tooltip/tooltipoptions';

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
    appendTo?: ColorPickerAppendToType;
    children?: React.ReactNode;
    defaultColor?: string;
    format?: string;
    inline?: boolean;
    inputId?: string;
    inputRef?: React.Ref<HTMLInputElement>;
    panelClassName?: string | undefined;
    panelStyle?: React.CSSProperties | undefined;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    transitionOptions?: CSSTransitionProps;
    value?: ColorPickerValueType;
    onChange?(e: ColorPickerChangeParams): void;
    onShow?(): void;
    onHide?(): void;
}

export declare class ColorPicker extends React.Component<ColorPickerProps, any> {
    public show(): void;
    public hide(): void;
    public getElement(): HTMLDivElement;
    public getInput(): HTMLInputElement;
    public getOverlay(): HTMLElement;
}
