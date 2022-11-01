import * as React from 'react';
import TooltipOptions from '../tooltip/tooltipoptions';
import { IconType } from '../utils';

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

export interface RatingProps extends Omit<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLDivElement>, HTMLDivElement>, 'onChange' | 'ref'> {
    value?: number;
    disabled?: boolean;
    readOnly?: boolean;
    stars?: number;
    cancel?: boolean;
    tooltip?: string;
    tooltipOptions?: TooltipOptions;
    onChange?(e: RatingChangeParams): void;
    children?: React.ReactNode;
    onIcon?: IconType<RatingProps>;
    offIcon?: IconType<RatingProps>;
    cancelIcon?: IconType<RatingProps>;
    cancelIconProps?: React.HTMLAttributes<HTMLSpanElement>;
    onIconProps?: React.HTMLAttributes<HTMLSpanElement>;
    offIconProps?: React.HTMLAttributes<HTMLSpanElement>;
}

export declare class Rating extends React.Component<RatingProps, any> {
    public getElement(): HTMLDivElement;
}
