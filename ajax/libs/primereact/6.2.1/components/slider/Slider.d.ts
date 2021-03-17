import * as React from 'react';

interface SliderProps {
    id?: string;
    value?: number|[number, number];
    min?: number;
    max?: number;
    orientation?: string;
    step?: number;
    range?: boolean;
    style?: object;
    className?: string;
    disabled?: boolean;
    tabIndex?: number;
    ariaLabelledBy?: string;
    onChange?(e: {originalEvent: Event, value: number|[number, number]}): void;
    onSlideEnd?(e: {originalEvent: Event, value: number|[number, number]}): void;
}

export class Slider extends React.Component<SliderProps,any> {}
