/**
 * dd-draggable.ts 8.4.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
import { DDBaseImplement, HTMLElementExtendOpt } from './dd-base-impl';
import { DDUIData } from './types';
export interface DDDraggableOpt {
    appendTo?: string | HTMLElement;
    handle?: string;
    helper?: 'clone' | HTMLElement | ((event: Event) => HTMLElement);
    cancel?: string;
    start?: (event: Event, ui: DDUIData) => void;
    stop?: (event: Event) => void;
    drag?: (event: Event, ui: DDUIData) => void;
}
type DDDragEvent = 'drag' | 'dragstart' | 'dragstop';
export declare class DDDraggable extends DDBaseImplement implements HTMLElementExtendOpt<DDDraggableOpt> {
    el: HTMLElement;
    option: DDDraggableOpt;
    helper: HTMLElement;
    constructor(el: HTMLElement, option?: DDDraggableOpt);
    on(event: DDDragEvent, callback: (event: DragEvent) => void): void;
    off(event: DDDragEvent): void;
    enable(): void;
    disable(forDestroy?: boolean): void;
    destroy(): void;
    updateOption(opts: DDDraggableOpt): DDDraggable;
}
export {};
