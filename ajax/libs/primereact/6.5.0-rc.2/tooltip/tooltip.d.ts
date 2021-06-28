import * as React from 'react';
import TooltipOptions from './tooltipoptions';

type TooltipTargetType = string | string[] | HTMLElement;

export interface TooltipProps extends TooltipOptions {
    id?: string;
    target?: TooltipTargetType;
    content?: string;
    disabled?: boolean;
}

export declare class Tooltip extends React.Component<TooltipProps, any> {
    public updateTargetEvents(target: HTMLElement): void;
    public loadTargetEvents(target: HTMLElement): void;
    public unloadTargetEvents(target: HTMLElement): void;
}
