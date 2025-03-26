/**
 * dd-resizable.ts 11.1.2
 * Copyright (c) 2021-2024  Alain Dumesny - see GridStack root license
 */
import { DDBaseImplement, HTMLElementExtendOpt } from './dd-base-impl';
import { DDUIData, GridItemHTMLElement } from './types';
export interface DDResizableOpt {
    autoHide?: boolean;
    handles?: string;
    maxHeight?: number;
    maxHeightMoveUp?: number;
    maxWidth?: number;
    maxWidthMoveLeft?: number;
    minHeight?: number;
    minWidth?: number;
    start?: (event: Event, ui: DDUIData) => void;
    stop?: (event: Event) => void;
    resize?: (event: Event, ui: DDUIData) => void;
}
export declare class DDResizable extends DDBaseImplement implements HTMLElementExtendOpt<DDResizableOpt> {
    el: GridItemHTMLElement;
    option: DDResizableOpt;
    constructor(el: GridItemHTMLElement, option?: DDResizableOpt);
    on(event: 'resizestart' | 'resize' | 'resizestop', callback: (event: DragEvent) => void): void;
    off(event: 'resizestart' | 'resize' | 'resizestop'): void;
    enable(): void;
    disable(): void;
    destroy(): void;
    updateOption(opts: DDResizableOpt): DDResizable;
}
