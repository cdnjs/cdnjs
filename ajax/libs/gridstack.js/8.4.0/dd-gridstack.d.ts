/**
 * dd-gridstack.ts 8.4.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { GridItemHTMLElement, GridStackElement, DDDragInOpt } from './types';
import { DDElementHost } from './dd-element';
/** Drag&Drop drop options */
export type DDDropOpt = {
    /** function or class type that this grid will accept as dropped items (see GridStackOptions.acceptWidgets) */
    accept?: (el: GridItemHTMLElement) => boolean;
};
/** drag&drop options currently called from the main code, but others can be passed in grid options */
export type DDOpts = 'enable' | 'disable' | 'destroy' | 'option' | string | any;
export type DDKey = 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight';
export type DDValue = number | string;
/** drag&drop events callbacks */
export type DDCallback = (event: Event, arg2: GridItemHTMLElement, helper?: GridItemHTMLElement) => void;
/**
 * HTML Native Mouse and Touch Events Drag and Drop functionality.
 */
export declare class DDGridStack {
    resizable(el: GridItemHTMLElement, opts: DDOpts, key?: DDKey, value?: DDValue): DDGridStack;
    draggable(el: GridItemHTMLElement, opts: DDOpts, key?: DDKey, value?: DDValue): DDGridStack;
    dragIn(el: GridStackElement, opts: DDDragInOpt): DDGridStack;
    droppable(el: GridItemHTMLElement, opts: DDOpts | DDDropOpt, key?: DDKey, value?: DDValue): DDGridStack;
    /** true if element is droppable */
    isDroppable(el: DDElementHost): boolean;
    /** true if element is draggable */
    isDraggable(el: DDElementHost): boolean;
    /** true if element is draggable */
    isResizable(el: DDElementHost): boolean;
    on(el: GridItemHTMLElement, name: string, callback: DDCallback): DDGridStack;
    off(el: GridItemHTMLElement, name: string): DDGridStack;
}
