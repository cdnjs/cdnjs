import * as React from 'react';

declare namespace Slider {

    type OrientationType = 'horizontal' | 'vertical';

    type ValueType = number | [number, number];

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: ValueType;
    }

    interface SlideEndParams extends ChangeParams { }

    interface SliderProps {
        id?: string;
        value?: ValueType;
        min?: number;
        max?: number;
        orientation?: OrientationType;
        step?: number;
        range?: boolean;
        style?: object;
        className?: string;
        disabled?: boolean;
        tabIndex?: number;
        ariaLabelledBy?: string;
        onChange?(e: ChangeParams): void;
        onSlideEnd?(e: SlideEndParams): void;
    }
}

export declare class Slider extends React.Component<Slider.SliderProps, any> { }
