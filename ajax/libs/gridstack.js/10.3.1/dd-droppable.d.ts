/**
 * dd-droppable.ts 10.3.1
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
import { DDBaseImplement, HTMLElementExtendOpt } from './dd-base-impl';
import { DDUIData } from './types';
export interface DDDroppableOpt {
    accept?: string | ((el: HTMLElement) => boolean);
    drop?: (event: DragEvent, ui: DDUIData) => void;
    over?: (event: DragEvent, ui: DDUIData) => void;
    out?: (event: DragEvent, ui: DDUIData) => void;
}
export declare class DDDroppable extends DDBaseImplement implements HTMLElementExtendOpt<DDDroppableOpt> {
    el: HTMLElement;
    option: DDDroppableOpt;
    accept: (el: HTMLElement) => boolean;
    constructor(el: HTMLElement, option?: DDDroppableOpt);
    on(event: 'drop' | 'dropover' | 'dropout', callback: (event: DragEvent) => void): void;
    off(event: 'drop' | 'dropover' | 'dropout'): void;
    enable(): void;
    disable(forDestroy?: boolean): void;
    destroy(): void;
    updateOption(opts: DDDroppableOpt): DDDroppable;
    /** item is being dropped on us - called by the drag mouseup handler - this calls the client drop event */
    drop(e: MouseEvent): void;
}
