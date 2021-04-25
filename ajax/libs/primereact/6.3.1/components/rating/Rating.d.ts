import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/rating' {

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: number | undefined | null;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: number | undefined | null;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
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
        onChange?(e: ChangeParams): void;
    }

    export class Rating extends React.Component<RatingProps, any> { }
}
