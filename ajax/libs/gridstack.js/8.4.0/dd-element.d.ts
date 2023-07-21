/**
 * dd-elements.ts 8.4.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { DDResizable, DDResizableOpt } from './dd-resizable';
import { GridItemHTMLElement } from './types';
import { DDDraggable, DDDraggableOpt } from './dd-draggable';
import { DDDroppable, DDDroppableOpt } from './dd-droppable';
export interface DDElementHost extends GridItemHTMLElement {
    ddElement?: DDElement;
}
export declare class DDElement {
    static init(el: DDElementHost): DDElement;
    el: DDElementHost;
    ddDraggable?: DDDraggable;
    ddDroppable?: DDDroppable;
    ddResizable?: DDResizable;
    constructor(el: DDElementHost);
    on(eventName: string, callback: (event: MouseEvent) => void): DDElement;
    off(eventName: string): DDElement;
    setupDraggable(opts: DDDraggableOpt): DDElement;
    cleanDraggable(): DDElement;
    setupResizable(opts: DDResizableOpt): DDElement;
    cleanResizable(): DDElement;
    setupDroppable(opts: DDDroppableOpt): DDElement;
    cleanDroppable(): DDElement;
}
