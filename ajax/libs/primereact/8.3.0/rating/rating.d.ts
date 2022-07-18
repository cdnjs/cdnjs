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

export interface RatingProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange'> {
    value?: number;
    disabled?: boolean;
    readOnly?: boolean;
    stars?: number;
    cancel?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: RatingChangeParams): void;
    children?: React.ReactNode;
}

export declare class Rating extends React.Component<RatingProps, any> { 
    public getElement(): HTMLDivElement;
}
