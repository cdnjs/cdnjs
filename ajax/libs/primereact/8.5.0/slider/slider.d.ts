import * as React from 'react';

type SliderOrientationType = 'horizontal' | 'vertical';

type SliderValueType = number | [number, number];

interface SliderChangeParams {
    originalEvent: React.SyntheticEvent;
    value: SliderValueType;
}

interface SliderSlideEndParams extends SliderChangeParams {}

export interface SliderProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'value' | 'ref'> {
    value?: SliderValueType;
    min?: number;
    max?: number;
    orientation?: SliderOrientationType;
    step?: number;
    range?: boolean;
    disabled?: boolean;
    ariaLabelledBy?: string;
    onChange?(e: SliderChangeParams): void;
    onSlideEnd?(e: SliderSlideEndParams): void;
    children?: React.ReactNode;
}

export declare class Slider extends React.Component<SliderProps, any> {
    public getElement(): HTMLDivElement;
}
