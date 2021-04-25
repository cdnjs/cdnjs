import * as React from 'react';

type PositionType = 'top' | 'bottom' | 'left' | 'right';

type EventType = 'hover' | 'focus';

type AppendToType = 'self' | HTMLElement | undefined | null;

interface EventParams {
    originalEvent: React.SyntheticEvent;
    target: HTMLElement;
}

export default interface TooltipOptions {
    className?: string;
    style?: object;
    appendTo?: AppendToType;
    position?: PositionType;
    my?: string;
    at?: string;
    event?: EventType;
    showEvent?: string;
    hideEvent?: string;
    autoZIndex?: boolean;
    baseZIndex?: number;
    mouseTrack?: boolean;
    mouseTrackTop?: number;
    mouseTrackLeft?: number;
    showDelay?: number;
    updateDelay?: number;
    hideDelay?: number;
    autoHide?: boolean;
    onBeforeShow?(e: EventParams): void;
    onBeforeHide?(e: EventParams): void;
    onShow?(e: EventParams): void;
    onHide?(e: EventParams): void;
}
