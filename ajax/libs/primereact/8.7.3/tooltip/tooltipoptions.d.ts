import * as React from 'react';

type TooltipPositionType = 'top' | 'bottom' | 'left' | 'right' | 'mouse';

type TooltipEventType = 'hover' | 'focus' | 'both';

type TooltipAppendToType = 'self' | HTMLElement | undefined | null;

interface TooltipEventParams {
    originalEvent: React.SyntheticEvent;
    target: HTMLElement;
}

export default interface TooltipOptions {
    appendTo?: TooltipAppendToType;
    at?: string;
    autoHide?: boolean;
    autoZIndex?: boolean;
    baseZIndex?: number;
    className?: string;
    disabled?: boolean;
    event?: TooltipEventType;
    hideDelay?: number;
    hideEvent?: string;
    mouseTrack?: boolean;
    mouseTrackLeft?: number;
    mouseTrackTop?: number;
    my?: string;
    position?: TooltipPositionType;
    showDelay?: number;
    showEvent?: string;
    showOnDisabled?: boolean;
    style?: React.CSSProperties;
    updateDelay?: number;
    onBeforeShow?(e: TooltipEventParams): void;
    onBeforeHide?(e: TooltipEventParams): void;
    onShow?(e: TooltipEventParams): void;
    onHide?(e: TooltipEventParams): void;
}
