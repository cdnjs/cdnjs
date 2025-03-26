/**
 * dd-draggable.ts 11.1.2
 * Copyright (c) 2021-2024  Alain Dumesny - see GridStack root license
 */
import { DDBaseImplement, HTMLElementExtendOpt } from './dd-base-impl';
import { GridItemHTMLElement, DDDragOpt } from './types';
type DDDragEvent = 'drag' | 'dragstart' | 'dragstop';
export declare class DDDraggable extends DDBaseImplement implements HTMLElementExtendOpt<DDDragOpt> {
    el: GridItemHTMLElement;
    option: DDDragOpt;
    helper: HTMLElement;
    constructor(el: GridItemHTMLElement, option?: DDDragOpt);
    on(event: DDDragEvent, callback: (event: DragEvent) => void): void;
    off(event: DDDragEvent): void;
    enable(): void;
    disable(forDestroy?: boolean): void;
    destroy(): void;
    updateOption(opts: DDDragOpt): DDDraggable;
}
export {};
