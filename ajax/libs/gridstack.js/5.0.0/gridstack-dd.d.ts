/**
 * gridstack-dd.ts 5.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { GridStackDDI } from './gridstack-ddi';
import { GridItemHTMLElement, GridStackElement, DDDragInOpt } from './types';
/** Drag&Drop drop options */
export declare type DDDropOpt = {
    /** function or class type that this grid will accept as dropped items (see GridStackOptions.acceptWidgets) */
    accept?: (el: GridItemHTMLElement) => boolean;
};
/** drag&drop options currently called from the main code, but others can be passed in grid options */
export declare type DDOpts = 'enable' | 'disable' | 'destroy' | 'option' | string | any;
export declare type DDKey = 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight';
export declare type DDValue = number | string;
/** drag&drop events callbacks */
export declare type DDCallback = (event: Event, arg2: GridItemHTMLElement, helper?: GridItemHTMLElement) => void;
/**
 * Base class implementing common Grid drag'n'drop functionality, with domain specific subclass (h5 vs jq subclasses)
 */
export declare abstract class GridStackDD extends GridStackDDI {
    /** override to cast to correct type */
    static get(): GridStackDD;
    /** removes any drag&drop present (called during destroy) */
    remove(el: GridItemHTMLElement): GridStackDD;
    abstract resizable(el: GridItemHTMLElement, opts: DDOpts, key?: DDKey, value?: DDValue): GridStackDD;
    abstract isResizable(el: HTMLElement): boolean;
    abstract draggable(el: GridItemHTMLElement, opts: DDOpts, key?: DDKey, value?: DDValue): GridStackDD;
    abstract dragIn(el: GridStackElement, opts: DDDragInOpt): GridStackDD;
    abstract isDraggable(el: HTMLElement): boolean;
    abstract droppable(el: GridItemHTMLElement, opts: DDOpts | DDDropOpt, key?: DDKey, value?: DDValue): GridStackDD;
    abstract isDroppable(el: HTMLElement): boolean;
    abstract on(el: GridItemHTMLElement, eventName: string, callback: DDCallback): GridStackDD;
    abstract off(el: GridItemHTMLElement, eventName: string): GridStackDD;
}
