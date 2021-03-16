export default interface TooltipOptions {
    className?: string;
    style?: object;
    appendTo?: object;
    position?: string;
    my?: string;
    at?: string;
    event?: string;
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
    onBeforeShow?(e: {originalEvent: Event, target: HTMLElement}): void;
    onBeforeHide?(e: {originalEvent: Event, target: HTMLElement}): void;
    onShow?(e: {originalEvent: Event, target: HTMLElement}): void;
    onHide?(e: {originalEvent: Event, target: HTMLElement}): void;
}
