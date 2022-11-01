import * as React from 'react';
import TooltipOptions, { TooltipEventParams } from './tooltipoptions';

type TooltipTargetType = string | string[] | HTMLElement;

export interface TooltipProps extends TooltipOptions {
    id?: string;
    target?: TooltipTargetType;
    content?: string;
    children?: React.ReactNode;
}

export declare class Tooltip extends React.Component<TooltipProps, any> {
    public updateTargetEvents(target: HTMLElement): void;
    public loadTargetEvents(target: HTMLElement): void;
    public unloadTargetEvents(target: HTMLElement): void;
    public getElement(): HTMLElement;
    public getTarget(): HTMLElement | null;
    public show(e?: TooltipEventParams): null;
    public hide(e?: TooltipEventParams): null;
}
