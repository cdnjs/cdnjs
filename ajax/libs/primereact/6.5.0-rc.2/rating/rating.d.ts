import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';

interface RatingChangeTargetOptions {
    name: string;
    id: string;
    value: number | undefined | null;
}

interface RatingChangeParams {
    originalEvent: React.SyntheticEvent;
    value: number | undefined | null;
    stopPropagation(): void;
    preventDefault(): void;
    target: RatingChangeTargetOptions;
}

export interface RatingProps {
    id?: string;
    value?: number;
    disabled?: boolean;
    readOnly?: boolean;
    stars?: number;
    cancel?: boolean;
    style?: object;
    className?: string;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: RatingChangeParams): void;
}

export declare class Rating extends React.Component<RatingProps, any> { }
