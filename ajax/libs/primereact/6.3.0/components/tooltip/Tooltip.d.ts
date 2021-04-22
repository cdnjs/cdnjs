import * as React from 'react';
import TooltipOptions from './TooltipOptions';

declare namespace Tooltip {

    type TargetType = string | string[] | HTMLElement;

    interface TooltipProps extends TooltipOptions {
        id?: string;
        target?: TargetType;
        content?: string;
        disabled?: boolean;
    }
}

export declare class Tooltip extends React.Component<Tooltip.TooltipProps, any> {
    public updateTargetEvents(target: HTMLElement): void;
    public loadTargetEvents(target: HTMLElement): void;
    public unloadTargetEvents(target: HTMLElement): void;
}
