/**
 * dd-elements.ts 11.1.2
 * Copyright (c) 2021-2024 Alain Dumesny - see GridStack root license
 */
import { DDResizable, DDResizableOpt } from './dd-resizable';
import { DDDragOpt, GridItemHTMLElement } from './types';
import { DDDraggable } from './dd-draggable';
import { DDDroppable, DDDroppableOpt } from './dd-droppable';
export interface DDElementHost extends GridItemHTMLElement {
    ddElement?: DDElement;
}
export declare class DDElement {
    el: DDElementHost;
    static init(el: DDElementHost): DDElement;
    ddDraggable?: DDDraggable;
    ddDroppable?: DDDroppable;
    ddResizable?: DDResizable;
    constructor(el: DDElementHost);
    on(eventName: string, callback: (event: MouseEvent) => void): DDElement;
    off(eventName: string): DDElement;
    setupDraggable(opts: DDDragOpt): DDElement;
    cleanDraggable(): DDElement;
    setupResizable(opts: DDResizableOpt): DDElement;
    cleanResizable(): DDElement;
    setupDroppable(opts: DDDroppableOpt): DDElement;
    cleanDroppable(): DDElement;
}
