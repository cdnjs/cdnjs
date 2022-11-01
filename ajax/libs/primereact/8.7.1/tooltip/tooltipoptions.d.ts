import * as React from 'react';

type TooltipPositionType = 'top' | 'bottom' | 'left' | 'right';

type TooltipEventType = 'hover' | 'focus' | 'both';

type TooltipAppendToType = 'self' | HTMLElement | undefined | null;

interface TooltipEventParams {
    originalEvent: React.SyntheticEvent;
    target: HTMLElement;
}

export default interface TooltipOptions {
    className?: string;
    style?: React.CSSProperties;
    appendTo?: TooltipAppendToType;
    position?: TooltipPositionType;
    my?: string;
    at?: string;
    event?: TooltipEventType;
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
    disabled?: boolean;
    showOnDisabled?: boolean;
    onBeforeShow?(e: TooltipEventParams): void;
    onBeforeHide?(e: TooltipEventParams): void;
    onShow?(e: TooltipEventParams): void;
    onHide?(e: TooltipEventParams): void;
}
