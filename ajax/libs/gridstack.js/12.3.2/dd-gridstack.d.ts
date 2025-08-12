/**
 * dd-gridstack.ts 12.3.2
 * Copyright (c) 2021-2025 Alain Dumesny - see GridStack root license
 */
import { GridItemHTMLElement, GridStackElement, DDDragOpt } from './types';
import { DDElementHost } from './dd-element';
/**
 * Drag & Drop options for drop targets.
 * Configures which elements can be dropped onto a grid.
 */
export type DDDropOpt = {
    /** Function to determine if an element can be dropped (see GridStackOptions.acceptWidgets) */
    accept?: (el: GridItemHTMLElement) => boolean;
};
/**
 * Drag & Drop operation types used throughout the DD system.
 * Can be control commands or configuration objects.
 */
export type DDOpts = 'enable' | 'disable' | 'destroy' | 'option' | string | any;
/**
 * Keys for DD configuration options that can be set via the 'option' command.
 */
export type DDKey = 'minWidth' | 'minHeight' | 'maxWidth' | 'maxHeight' | 'maxHeightMoveUp' | 'maxWidthMoveLeft';
/**
 * Values for DD configuration options (numbers or strings with units).
 */
export type DDValue = number | string;
/**
 * Callback function type for drag & drop events.
 *
 * @param event - The DOM event that triggered the callback
 * @param arg2 - The grid item element being dragged/dropped
 * @param helper - Optional helper element used during drag operations
 */
export type DDCallback = (event: Event, arg2: GridItemHTMLElement, helper?: GridItemHTMLElement) => void;
/**
 * HTML Native Mouse and Touch Events Drag and Drop functionality.
 *
 * This class provides the main drag & drop implementation for GridStack,
 * handling resizing, dragging, and dropping of grid items using native HTML5 events.
 * It manages the interaction between different DD components and the grid system.
 */
export declare class DDGridStack {
    /**
     * Enable/disable/configure resizing for grid elements.
     *
     * @param el - Grid item element(s) to configure
     * @param opts - Resize options or command ('enable', 'disable', 'destroy', 'option', or config object)
     * @param key - Option key when using 'option' command
     * @param value - Option value when using 'option' command
     * @returns this instance for chaining
     *
     * @example
     * dd.resizable(element, 'enable');  // Enable resizing
     * dd.resizable(element, 'option', 'minWidth', 100);  // Set minimum width
     */
    resizable(el: GridItemHTMLElement, opts: DDOpts, key?: DDKey, value?: DDValue): DDGridStack;
    /**
     * Enable/disable/configure dragging for grid elements.
     *
     * @param el - Grid item element(s) to configure
     * @param opts - Drag options or command ('enable', 'disable', 'destroy', 'option', or config object)
     * @param key - Option key when using 'option' command
     * @param value - Option value when using 'option' command
     * @returns this instance for chaining
     *
     * @example
     * dd.draggable(element, 'enable');  // Enable dragging
     * dd.draggable(element, {handle: '.drag-handle'});  // Configure drag handle
     */
    draggable(el: GridItemHTMLElement, opts: DDOpts, key?: DDKey, value?: DDValue): DDGridStack;
    dragIn(el: GridStackElement, opts: DDDragOpt): DDGridStack;
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
