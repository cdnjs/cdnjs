import * as React from 'react';

type SliderOrientationType = 'horizontal' | 'vertical';

type SliderValueType = number | [number, number];

interface SliderChangeParams {
    originalEvent: React.SyntheticEvent;
    value: SliderValueType;
}

interface SliderSlideEndParams extends SliderChangeParams { }

export interface SliderProps {
    id?: string;
    value?: SliderValueType;
    min?: number;
    max?: number;
    orientation?: SliderOrientationType;
    step?: number;
    range?: boolean;
    style?: object;
    className?: string;
    disabled?: boolean;
    tabIndex?: number;
    ariaLabelledBy?: string;
    onChange?(e: SliderChangeParams): void;
    onSlideEnd?(e: SliderSlideEndParams): void;
}

export declare class Slider extends React.Component<SliderProps, any> { }
