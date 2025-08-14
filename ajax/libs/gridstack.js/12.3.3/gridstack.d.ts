/*!
 * GridStack 12.3.2
 * https://gridstackjs.com/
 *
 * Copyright (c) 2021-2025  Alain Dumesny
 * see root license https://github.com/gridstack/gridstack.js/tree/master/LICENSE
 */
import { GridStackEngine } from './gridstack-engine';
import { Utils } from './utils';
import { ColumnOptions, GridItemHTMLElement, GridStackElement, GridStackEventHandlerCallback, GridStackNode, GridStackWidget, numberOrString, DDDragOpt, GridStackOptions, GridStackEventHandler, GridStackNodesHandler, AddRemoveFcn, SaveFcn, CompactOptions, ResizeToContentFcn, GridStackDroppedHandler, GridStackElementHandler, Position, RenderFcn } from './types';
import { DDGridStack } from './dd-gridstack';
export * from './types';
export * from './utils';
export * from './gridstack-engine';
export * from './dd-gridstack';
export * from './dd-manager';
export * from './dd-element';
export * from './dd-draggable';
export * from './dd-droppable';
export * from './dd-resizable';
export * from './dd-resizable-handle';
export * from './dd-base-impl';
export interface GridHTMLElement extends HTMLElement {
    gridstack?: GridStack;
}
/** list of possible events, or space separated list of them */
export type GridStackEvent = 'added' | 'change' | 'disable' | 'drag' | 'dragstart' | 'dragstop' | 'dropped' | 'enable' | 'removed' | 'resize' | 'resizestart' | 'resizestop' | 'resizecontent';
/** Defines the coordinates of an object */
export interface MousePosition {
    top: number;
    left: number;
}
/** Defines the position of a cell inside the grid*/
export interface CellPosition {
    x: number;
    y: number;
}
/**
 * Main gridstack class - you will need to call `GridStack.init()` first to initialize your grid.
 * Note: your grid elements MUST have the following classes for the CSS layout to work:
 * @example
 * <div class="grid-stack">
 *   <div class="grid-stack-item">
 *     <div class="grid-stack-item-content">Item 1</div>
 *   </div>
 * </div>
 */
export declare class GridStack {
    el: GridHTMLElement;
    opts: GridStackOptions;
    /**
     * initializing the HTML element, or selector string, into a grid will return the grid. Calling it again will
     * simply return the existing instance (ignore any passed options). There is also an initAll() version that support
     * multiple grids initialization at once. Or you can use addGrid() to create the entire grid from JSON.
     * @param options grid options (optional)
     * @param elOrString element or CSS selector (first one used) to convert to a grid (default to '.grid-stack' class selector)
     *
     * @example
     * const grid = GridStack.init();
     *
     * Note: the HTMLElement (of type GridHTMLElement) will store a `gridstack: GridStack` value that can be retrieve later
     * const grid = document.querySelector('.grid-stack').gridstack;
     */
    static init(options?: GridStackOptions, elOrString?: GridStackElement): GridStack;
    /**
     * Will initialize a list of elements (given a selector) and return an array of grids.
     * @param options grid options (optional)
     * @param selector elements selector to convert to grids (default to '.grid-stack' class selector)
     *
     * @example
     * const grids = GridStack.initAll();
     * grids.forEach(...)
     */
    static initAll(options?: GridStackOptions, selector?: string): GridStack[];
    /**
     * call to create a grid with the given options, including loading any children from JSON structure. This will call GridStack.init(), then
     * grid.load() on any passed children (recursively). Great alternative to calling init() if you want entire grid to come from
     * JSON serialized data, including options.
     * @param parent HTML element parent to the grid
     * @param opt grids options used to initialize the grid, and list of children
     */
    static addGrid(parent: HTMLElement, opt?: GridStackOptions): GridStack;
    /** call this method to register your engine instead of the default one.
     * See instead `GridStackOptions.engineClass` if you only need to
     * replace just one instance.
     */
    static registerEngine(engineClass: typeof GridStackEngine): void;
    /**
     * callback method use when new items|grids needs to be created or deleted, instead of the default
     * item: <div class="grid-stack-item"><div class="grid-stack-item-content">w.content</div></div>
     * grid: <div class="grid-stack">grid content...</div>
     * add = true: the returned DOM element will then be converted to a GridItemHTMLElement using makeWidget()|GridStack:init().
     * add = false: the item will be removed from DOM (if not already done)
     * grid = true|false for grid vs grid-items
     */
    static addRemoveCB?: AddRemoveFcn;
    /**
     * callback during saving to application can inject extra data for each widget, on top of the grid layout properties
     */
    static saveCB?: SaveFcn;
    /**
     * callback to create the content of widgets so the app can control how to store and restore it
     * By default this lib will do 'el.textContent = w.content' forcing text only support for avoiding potential XSS issues.
     */
    static renderCB?: RenderFcn;
    /** called after a widget has been updated (eg: load() into an existing list of children) so application can do extra work */
    static updateCB?: (w: GridStackNode) => void;
    /** callback to use for resizeToContent instead of the built in one */
    static resizeToContentCB?: ResizeToContentFcn;
    /** parent class for sizing content. defaults to '.grid-stack-item-content' */
    static resizeToContentParent: string;
    /** scoping so users can call GridStack.Utils.sort() for example */
    static Utils: typeof Utils;
    /** scoping so users can call new GridStack.Engine(12) for example */
    static Engine: typeof GridStackEngine;
    /** engine used to implement non DOM grid functionality */
    engine: GridStackEngine;
    /** point to a parent grid item if we're nested (inside a grid-item in between 2 Grids) */
    parentGridNode?: GridStackNode;
    /** time to wait for animation (if enabled) to be done so content sizing can happen */
    animationDelay: number;
    protected static engineClass: typeof GridStackEngine;
    protected resizeObserver: ResizeObserver;
    protected responseLayout: ColumnOptions;
    private _skipInitialResize;
    /**
     * Construct a grid item from the given element and options
     * @param el the HTML element tied to this grid after it's been initialized
     * @param opts grid options - public for classes to access, but use methods to modify!
     */
    constructor(el: GridHTMLElement, opts?: GridStackOptions);
    private _updateColumnVar;
    /**
     * add a new widget and returns it.
     *
     * Widget will be always placed even if result height is more than actual grid height.
     * You need to use `willItFit()` before calling addWidget for additional check.
     * See also `makeWidget(el)` for DOM element.
     *
     * @example
     * const grid = GridStack.init();
     * grid.addWidget({w: 3, content: 'hello'});
     *
     * @param w GridStackWidget definition. used MakeWidget(el) if you have dom element instead.
     */
    addWidget(w: GridStackWidget): GridItemHTMLElement;
    /**
     * Create the default grid item divs and content (possibly lazy loaded) by using GridStack.renderCB().
     *
     * @param n GridStackNode definition containing widget configuration
     * @returns the created HTML element with proper grid item structure
     *
     * @example
     * const element = grid.createWidgetDivs({ w: 2, h: 1, content: 'Hello World' });
     */
    createWidgetDivs(n: GridStackNode): HTMLElement;
    /**
     * Convert an existing gridItem element into a sub-grid with the given (optional) options, else inherit them
     * from the parent's subGrid options.
     * @param el gridItem element to convert
     * @param ops (optional) sub-grid options, else default to node, then parent settings, else defaults
     * @param nodeToAdd (optional) node to add to the newly created sub grid (used when dragging over existing regular item)
     * @param saveContent if true (default) the html inside .grid-stack-content will be saved to child widget
     * @returns newly created grid
     */
    makeSubGrid(el: GridItemHTMLElement, ops?: GridStackOptions, nodeToAdd?: GridStackNode, saveContent?: boolean): GridStack;
    /**
     * called when an item was converted into a nested grid to accommodate a dragged over item, but then item leaves - return back
     * to the original grid-item. Also called to remove empty sub-grids when last item is dragged out (since re-creating is simple)
     */
    removeAsSubGrid(nodeThatRemoved?: GridStackNode): void;
    /**
     * saves the current layout returning a list of widgets for serialization which might include any nested grids.
     * @param saveContent if true (default) the latest html inside .grid-stack-content will be saved to GridStackWidget.content field, else it will
     * be removed.
     * @param saveGridOpt if true (default false), save the grid options itself, so you can call the new GridStack.addGrid()
     * to recreate everything from scratch. GridStackOptions.children would then contain the widget list instead.
     * @param saveCB callback for each node -> widget, so application can insert additional data to be saved into the widget data structure.
     * @param column if provided, the grid will be saved for the given column size (IFF we have matching internal saved layout, or current layout).
     * Otherwise it will use the largest possible layout (say 12 even if rendering at 1 column) so we can restore to all layouts.
     * NOTE: if you want to save to currently display layout, pass this.getColumn() as column.
     * NOTE2: nested grids will ALWAYS save to the container size to be in sync with parent.
     * @returns list of widgets or full grid option, including .children list of widgets
     */
    save(saveContent?: boolean, saveGridOpt?: boolean, saveCB?: SaveFcn, column?: number): GridStackWidget[] | GridStackOptions;
    /**
     * Load widgets from a list. This will call update() on each (matching by id) or add/remove widgets that are not there.
     * Used to restore a grid layout for a saved layout list (see `save()`).
     *
     * @param items list of widgets definition to update/create
     * @param addRemove boolean (default true) or callback method can be passed to control if and how missing widgets can be added/removed, giving
     * the user control of insertion.
     * @returns the grid instance for chaining
     *
     * @example
     * // Basic usage with saved layout
     * const savedLayout = grid.save(); // Save current layout
     * // ... later restore it
     * grid.load(savedLayout);
     *
     * // Load with custom add/remove callback
     * grid.load(layout, (items, grid, add) => {
     *   if (add) {
     *     // Custom logic for adding new widgets
     *     items.forEach(item => {
     *       const el = document.createElement('div');
     *       el.innerHTML = item.content || '';
     *       grid.addWidget(el, item);
     *     });
     *   } else {
     *     // Custom logic for removing widgets
     *     items.forEach(item => grid.removeWidget(item.el));
     *   }
     * });
     *
     * // Load without adding/removing missing widgets
     * grid.load(layout, false);
     *
     * @see {@link http://gridstackjs.com/demo/serialization.html} for complete example
     */
    load(items: GridStackWidget[], addRemove?: boolean | AddRemoveFcn): GridStack;
    /**
     * use before calling a bunch of `addWidget()` to prevent un-necessary relayouts in between (more efficient)
     * and get a single event callback. You will see no changes until `batchUpdate(false)` is called.
     */
    batchUpdate(flag?: boolean): GridStack;
    /**
     * Gets the current cell height in pixels. This takes into account the unit type and converts to pixels if necessary.
     *
     * @param forcePixel if true, forces conversion to pixels even when cellHeight is specified in other units
     * @returns the cell height in pixels
     *
     * @example
     * const height = grid.getCellHeight();
     * console.log('Cell height:', height, 'px');
     *
     * // Force pixel conversion
     * const pixelHeight = grid.getCellHeight(true);
     */
    getCellHeight(forcePixel?: boolean): number;
    /**
     * Update current cell height - see `GridStackOptions.cellHeight` for format by updating eh Browser CSS variable.
     *
     * @param val the cell height. Options:
     *   - `undefined`: cells content will be made square (match width minus margin)
     *   - `0`: the CSS will be generated by the application instead
     *   - number: height in pixels
     *   - string: height with units (e.g., '70px', '5rem', '2em')
     * @returns the grid instance for chaining
     *
     * @example
     * grid.cellHeight(100);     // 100px height
     * grid.cellHeight('70px');  // explicit pixel height
     * grid.cellHeight('5rem');  // relative to root font size
     * grid.cellHeight(grid.cellWidth() * 1.2); // aspect ratio
     * grid.cellHeight('auto');  // auto-size based on content
     */
    cellHeight(val?: numberOrString): GridStack;
    /** Gets current cell width. */
    /**
     * Gets the current cell width in pixels. This is calculated based on the grid container width divided by the number of columns.
     *
     * @returns the cell width in pixels
     *
     * @example
     * const width = grid.cellWidth();
     * console.log('Cell width:', width, 'px');
     *
     * // Use cell width to calculate widget dimensions
     * const widgetWidth = width * 3; // For a 3-column wide widget
     */
    cellWidth(): number;
    /** return our expected width (or parent) , and optionally of window for dynamic column check */
    protected _widthOrContainer(forBreakpoint?: boolean): number;
    /** checks for dynamic column count for our current size, returning true if changed */
    protected checkDynamicColumn(): boolean;
    /**
     * Re-layout grid items to reclaim any empty space. This is useful after removing widgets
     * or when you want to optimize the layout.
     *
     * @param layout layout type. Options:
     *   - 'compact' (default): might re-order items to fill any empty space
     *   - 'list': keep the widget left->right order the same, even if that means leaving an empty slot if things don't fit
     * @param doSort re-sort items first based on x,y position. Set to false to do your own sorting ahead (default: true)
     * @returns the grid instance for chaining
     *
     * @example
     * // Compact layout after removing widgets
     * grid.removeWidget('.widget-to-remove');
     * grid.compact();
     *
     * // Use list layout (preserve order)
     * grid.compact('list');
     *
     * // Compact without sorting first
     * grid.compact('compact', false);
     */
    compact(layout?: CompactOptions, doSort?: boolean): GridStack;
    /**
     * Set the number of columns in the grid. Will update existing widgets to conform to new number of columns,
     * as well as cache the original layout so you can revert back to previous positions without loss.
     *
     * Requires `gridstack-extra.css` or `gridstack-extra.min.css` for [2-11] columns,
     * else you will need to generate correct CSS.
     * See: https://github.com/gridstack/gridstack.js#change-grid-columns
     *
     * @param column Integer > 0 (default 12)
     * @param layout specify the type of re-layout that will happen. Options:
     *   - 'moveScale' (default): scale widget positions and sizes
     *   - 'move': keep widget sizes, only move positions
     *   - 'scale': keep widget positions, only scale sizes
     *   - 'none': don't change widget positions or sizes
     *   Note: items will never be outside of the current column boundaries.
     *   Ignored for `column=1` as we always want to vertically stack.
     * @returns the grid instance for chaining
     *
     * @example
     * // Change to 6 columns with default scaling
     * grid.column(6);
     *
     * // Change to 4 columns, only move positions
     * grid.column(4, 'move');
     *
     * // Single column layout (vertical stack)
     * grid.column(1);
     */
    column(column: number, layout?: ColumnOptions): GridStack;
    /**
     * Get the number of columns in the grid (default 12).
     *
     * @returns the current number of columns in the grid
     *
     * @example
     * const columnCount = grid.getColumn(); // returns 12 by default
     */
    getColumn(): number;
    /**
     * Returns an array of grid HTML elements (no placeholder) - used to iterate through our children in DOM order.
     * This method excludes placeholder elements and returns only actual grid items.
     *
     * @returns array of GridItemHTMLElement instances representing all grid items
     *
     * @example
     * const items = grid.getGridItems();
     * items.forEach(item => {
     *   console.log('Item ID:', item.gridstackNode.id);
     * });
     */
    getGridItems(): GridItemHTMLElement[];
    /**
     * Returns true if change callbacks should be ignored due to column change, sizeToContent, loading, etc.
     * This is useful for callers who want to implement dirty flag functionality.
     *
     * @returns true if change callbacks are currently being ignored
     *
     * @example
     * if (!grid.isIgnoreChangeCB()) {
     *   // Process the change event
     *   console.log('Grid layout changed');
     * }
     */
    isIgnoreChangeCB(): boolean;
    /**
     * Destroys a grid instance. DO NOT CALL any methods or access any vars after this as it will free up members.
     * @param removeDOM if `false` grid and items HTML elements will not be removed from the DOM (Optional. Default `true`).
     */
    destroy(removeDOM?: boolean): GridStack;
    /**
     * Enable/disable floating widgets (default: `false`). When enabled, widgets can float up to fill empty spaces.
     * See [example](http://gridstackjs.com/demo/float.html)
     *
     * @param val true to enable floating, false to disable
     * @returns the grid instance for chaining
     *
     * @example
     * grid.float(true);  // Enable floating
     * grid.float(false); // Disable floating (default)
     */
    float(val: boolean): GridStack;
    /**
     * Get the current float mode setting.
     *
     * @returns true if floating is enabled, false otherwise
     *
     * @example
     * const isFloating = grid.getFloat();
     * console.log('Floating enabled:', isFloating);
     */
    getFloat(): boolean;
    /**
     * Get the position of the cell under a pixel on screen.
     * @param position the position of the pixel to resolve in
     * absolute coordinates, as an object with top and left properties
     * @param useDocRelative if true, value will be based on document position vs parent position (Optional. Default false).
     * Useful when grid is within `position: relative` element
     *
     * Returns an object with properties `x` and `y` i.e. the column and row in the grid.
     */
    getCellFromPixel(position: MousePosition, useDocRelative?: boolean): CellPosition;
    /**
     * Returns the current number of rows, which will be at least `minRow` if set.
     * The row count is based on the highest positioned widget in the grid.
     *
     * @returns the current number of rows in the grid
     *
     * @example
     * const rowCount = grid.getRow();
     * console.log('Grid has', rowCount, 'rows');
     */
    getRow(): number;
    /**
     * Checks if the specified rectangular area is empty (no widgets occupy any part of it).
     *
     * @param x the x coordinate (column) of the area to check
     * @param y the y coordinate (row) of the area to check
     * @param w the width in columns of the area to check
     * @param h the height in rows of the area to check
     * @returns true if the area is completely empty, false if any widget overlaps
     *
     * @example
     * // Check if a 2x2 area at position (1,1) is empty
     * if (grid.isAreaEmpty(1, 1, 2, 2)) {
     *   console.log('Area is available for placement');
     * }
     */
    isAreaEmpty(x: number, y: number, w: number, h: number): boolean;
    /**
     * If you add elements to your grid by hand (or have some framework creating DOM), you have to tell gridstack afterwards to make them widgets.
     * If you want gridstack to add the elements for you, use `addWidget()` instead.
     * Makes the given element a widget and returns it.
     *
     * @param els widget or single selector to convert.
     * @param options widget definition to use instead of reading attributes or using default sizing values
     * @returns the converted GridItemHTMLElement
     *
     * @example
     * const grid = GridStack.init();
     *
     * // Create HTML content manually, possibly looking like:
     * // <div id="item-1" gs-x="0" gs-y="0" gs-w="3" gs-h="2"></div>
     * grid.el.innerHTML = '<div id="item-1" gs-w="3"></div><div id="item-2"></div>';
     *
     * // Convert existing elements to widgets
     * grid.makeWidget('#item-1'); // Uses gs-* attributes from DOM
     * grid.makeWidget('#item-2', {w: 2, h: 1, content: 'Hello World'});
     *
     * // Or pass DOM element directly
     * const element = document.getElementById('item-3');
     * grid.makeWidget(element, {x: 0, y: 1, w: 4, h: 2});
     */
    makeWidget(els: GridStackElement, options?: GridStackWidget): GridItemHTMLElement;
    /**
     * Register event handler for grid events. You can call this on a single event name, or space separated list.
     *
     * Supported events:
     * - `added`: Called when widgets are being added to a grid
     * - `change`: Occurs when widgets change their position/size due to constraints or direct changes
     * - `disable`: Called when grid becomes disabled
     * - `dragstart`: Called when grid item starts being dragged
     * - `drag`: Called while grid item is being dragged (for each new row/column value)
     * - `dragstop`: Called after user is done moving the item, with updated DOM attributes
     * - `dropped`: Called when an item has been dropped and accepted over a grid
     * - `enable`: Called when grid becomes enabled
     * - `removed`: Called when items are being removed from the grid
     * - `resizestart`: Called before user starts resizing an item
     * - `resize`: Called while grid item is being resized (for each new row/column value)
     * - `resizestop`: Called after user is done resizing the item, with updated DOM attributes
     *
     * @param name event name(s) to listen for (space separated for multiple)
     * @param callback function to call when event occurs
     * @returns the grid instance for chaining
     *
     * @example
     * // Listen to multiple events at once
     * grid.on('added removed change', (event, items) => {
     *   items.forEach(item => console.log('Item changed:', item));
     * });
     *
     * // Listen to individual events
     * grid.on('added', (event, items) => {
     *   items.forEach(item => console.log('Added item:', item));
     * });
     */
    on(name: 'dropped', callback: GridStackDroppedHandler): GridStack;
    on(name: 'enable' | 'disable', callback: GridStackEventHandler): GridStack;
    on(name: 'change' | 'added' | 'removed' | 'resizecontent', callback: GridStackNodesHandler): GridStack;
    on(name: 'resizestart' | 'resize' | 'resizestop' | 'dragstart' | 'drag' | 'dragstop', callback: GridStackElementHandler): GridStack;
    on(name: string, callback: GridStackEventHandlerCallback): GridStack;
    /**
     * unsubscribe from the 'on' event GridStackEvent
     * @param name of the event (see possible values) or list of names space separated
     */
    off(name: GridStackEvent | string): GridStack;
    /**
     * Remove all event handlers from the grid. This is useful for cleanup when destroying a grid.
     *
     * @returns the grid instance for chaining
     *
     * @example
     * grid.offAll(); // Remove all event listeners
     */
    offAll(): GridStack;
    /**
     * Removes widget from the grid.
     * @param el  widget or selector to modify
     * @param removeDOM if `false` DOM element won't be removed from the tree (Default? true).
     * @param triggerEvent if `false` (quiet mode) element will not be added to removed list and no 'removed' callbacks will be called (Default? true).
     */
    removeWidget(els: GridStackElement, removeDOM?: boolean, triggerEvent?: boolean): GridStack;
    /**
     * Removes all widgets from the grid.
     * @param removeDOM if `false` DOM elements won't be removed from the tree (Default? `true`).
     * @param triggerEvent if `false` (quiet mode) element will not be added to removed list and no 'removed' callbacks will be called (Default? true).
     */
    removeAll(removeDOM?: boolean, triggerEvent?: boolean): GridStack;
    /**
     * Toggle the grid animation state.  Toggles the `grid-stack-animate` class.
     * @param doAnimate if true the grid will animate.
     * @param delay if true setting will be set on next event loop.
     */
    setAnimation(doAnimate?: boolean, delay?: boolean): GridStack;
    /**
     * Toggle the grid static state, which permanently removes/add Drag&Drop support, unlike disable()/enable() that just turns it off/on.
     * Also toggle the grid-stack-static class.
     * @param val if true the grid become static.
     * @param updateClass true (default) if css class gets updated
     * @param recurse true (default) if sub-grids also get updated
     */
    setStatic(val: boolean, updateClass?: boolean, recurse?: boolean): GridStack;
    /**
     * Updates the passed in options on the grid (similar to update(widget) for for the grid options).
     * @param options PARTIAL grid options to update - only items specified will be updated.
     * NOTE: not all options updating are currently supported (lot of code, unlikely to change)
     */
    updateOptions(o: GridStackOptions): GridStack;
    /**
     * Updates widget position/size and other info. This is used to change widget properties after creation.
     * Can update position, size, content, and other widget properties.
     *
     * Note: If you need to call this on all nodes, use load() instead which will update what changed.
     * Setting the same x,y for multiple items will be indeterministic and likely unwanted.
     *
     * @param els widget element(s) or selector to modify
     * @param opt new widget options (x,y,w,h, etc.). Only those set will be updated.
     * @returns the grid instance for chaining
     *
     * @example
     * // Update widget size and position
     * grid.update('.my-widget', { x: 2, y: 1, w: 3, h: 2 });
     *
     * // Update widget content
     * grid.update(widget, { content: '<p>New content</p>' });
     *
     * // Update multiple properties
     * grid.update('#my-widget', {
     *   w: 4,
     *   h: 3,
     *   noResize: true,
     *   locked: true
     * });
     */
    update(els: GridStackElement, opt: GridStackWidget): GridStack;
    private moveNode;
    /**
     * Updates widget height to match the content height to avoid vertical scrollbars or dead space.
     * This automatically adjusts the widget height based on its content size.
     *
     * Note: This assumes only 1 child under resizeToContentParent='.grid-stack-item-content'
     * (sized to gridItem minus padding) that represents the entire content size.
     *
     * @param el the grid item element to resize
     *
     * @example
     * // Resize a widget to fit its content
     * const widget = document.querySelector('.grid-stack-item');
     * grid.resizeToContent(widget);
     *
     * // This is commonly used with dynamic content:
     * widget.querySelector('.content').innerHTML = 'New longer content...';
     * grid.resizeToContent(widget);
     */
    resizeToContent(el: GridItemHTMLElement): void;
    /** call the user resize (so they can do extra work) else our build in version */
    private resizeToContentCBCheck;
    /**
     * Rotate widgets by swapping their width and height. This is typically called when the user presses 'r' during dragging.
     * The rotation swaps the w/h dimensions and adjusts min/max constraints accordingly.
     *
     * @param els widget element(s) or selector to rotate
     * @param relative optional pixel coordinate relative to upper/left corner to rotate around (keeps that cell under cursor)
     * @returns the grid instance for chaining
     *
     * @example
     * // Rotate a specific widget
     * grid.rotate('.my-widget');
     *
     * // Rotate with relative positioning during drag
     * grid.rotate(widget, { left: 50, top: 30 });
     */
    rotate(els: GridStackElement, relative?: Position): GridStack;
    /**
     * Updates the margins which will set all 4 sides at once - see `GridStackOptions.margin` for format options.
     * Supports CSS string format of 1, 2, or 4 values or a single number.
     *
     * @param value margin value - can be:
     *   - Single number: `10` (applies to all sides)
     *   - Two values: `'10px 20px'` (top/bottom, left/right)
     *   - Four values: `'10px 20px 5px 15px'` (top, right, bottom, left)
     * @returns the grid instance for chaining
     *
     * @example
     * grid.margin(10);           // 10px all sides
     * grid.margin('10px 20px');  // 10px top/bottom, 20px left/right
     * grid.margin('5px 10px 15px 20px'); // Different for each side
     */
    margin(value: numberOrString): GridStack;
    /**
     * Returns the current margin value as a number (undefined if the 4 sides don't match).
     * This only returns a number if all sides have the same margin value.
     *
     * @returns the margin value in pixels, or undefined if sides have different values
     *
     * @example
     * const margin = grid.getMargin();
     * if (margin !== undefined) {
     *   console.log('Uniform margin:', margin, 'px');
     * } else {
     *   console.log('Margins are different on different sides');
     * }
     */
    getMargin(): number;
    /**
     * Returns true if the height of the grid will be less than the vertical
     * constraint. Always returns true if grid doesn't have height constraint.
     * @param node contains x,y,w,h,auto-position options
     *
     * @example
     * if (grid.willItFit(newWidget)) {
     *   grid.addWidget(newWidget);
     * } else {
     *   alert('Not enough free space to place the widget');
     * }
     */
    willItFit(node: GridStackWidget): boolean;
    /**
     * called when we are being resized - check if the one Column Mode needs to be turned on/off
     * and remember the prev columns we used, or get our count from parent, as well as check for cellHeight==='auto' (square)
     * or `sizeToContent` gridItem options.
     */
    onResize(clientWidth?: number): GridStack;
    /** resizes content for given node (or all) if shouldSizeToContent() is true */
    private resizeToContentCheck;
    /** add or remove the grid element size event handler */
    protected _updateResizeEvent(forceRemove?: boolean): GridStack;
    /**
     * Get the global drag & drop implementation instance.
     * This provides access to the underlying drag & drop functionality.
     *
     * @returns the DDGridStack instance used for drag & drop operations
     *
     * @example
     * const dd = GridStack.getDD();
     * // Access drag & drop functionality
     */
    static getDD(): DDGridStack;
    /**
     * call to setup dragging in from the outside (say toolbar), by specifying the class selection and options.
     * Called during GridStack.init() as options, but can also be called directly (last param are used) in case the toolbar
     * is dynamically create and needs to be set later.
     * @param dragIn string selector (ex: '.sidebar-item') or list of dom elements
     * @param dragInOptions options - see DDDragOpt. (default: {handle: '.grid-stack-item-content', appendTo: 'body'}
     * @param widgets GridStackWidget def to assign to each element which defines what to create on drop
     * @param root optional root which defaults to document (for shadow dom pass the parent HTMLDocument)
     */
    static setupDragIn(dragIn?: string | HTMLElement[], dragInOptions?: DDDragOpt, widgets?: GridStackWidget[], root?: HTMLElement | Document): void;
    /**
     * Enables/Disables dragging by the user for specific grid elements.
     * For all items and future items, use enableMove() instead. No-op for static grids.
     *
     * Note: If you want to prevent an item from moving due to being pushed around by another
     * during collision, use the 'locked' property instead.
     *
     * @param els widget element(s) or selector to modify
     * @param val if true widget will be draggable, assuming the parent grid isn't noMove or static
     * @returns the grid instance for chaining
     *
     * @example
     * // Make specific widgets draggable
     * grid.movable('.my-widget', true);
     *
     * // Disable dragging for specific widgets
     * grid.movable('#fixed-widget', false);
     */
    movable(els: GridStackElement, val: boolean): GridStack;
    /**
     * Enables/Disables user resizing for specific grid elements.
     * For all items and future items, use enableResize() instead. No-op for static grids.
     *
     * @param els widget element(s) or selector to modify
     * @param val if true widget will be resizable, assuming the parent grid isn't noResize or static
     * @returns the grid instance for chaining
     *
     * @example
     * // Make specific widgets resizable
     * grid.resizable('.my-widget', true);
     *
     * // Disable resizing for specific widgets
     * grid.resizable('#fixed-size-widget', false);
     */
    resizable(els: GridStackElement, val: boolean): GridStack;
    /**
     * Temporarily disables widgets moving/resizing.
     * If you want a more permanent way (which freezes up resources) use `setStatic(true)` instead.
     *
     * Note: This is a no-op for static grids.
     *
     * This is a shortcut for:
     * ```typescript
     * grid.enableMove(false);
     * grid.enableResize(false);
     * ```
     *
     * @param recurse if true (default), sub-grids also get updated
     * @returns the grid instance for chaining
     *
     * @example
     * // Disable all interactions
     * grid.disable();
     *
     * // Disable only this grid, not sub-grids
     * grid.disable(false);
     */
    disable(recurse?: boolean): GridStack;
    /**
     * Re-enables widgets moving/resizing - see disable().
     * Note: This is a no-op for static grids.
     *
     * This is a shortcut for:
     * ```typescript
     * grid.enableMove(true);
     * grid.enableResize(true);
     * ```
     *
     * @param recurse if true (default), sub-grids also get updated
     * @returns the grid instance for chaining
     *
     * @example
     * // Re-enable all interactions
     * grid.enable();
     *
     * // Enable only this grid, not sub-grids
     * grid.enable(false);
     */
    enable(recurse?: boolean): GridStack;
    /**
     * Enables/disables widget moving for all widgets. No-op for static grids.
     * Note: locally defined items (with noMove property) still override this setting.
     *
     * @param doEnable if true widgets will be movable, if false moving is disabled
     * @param recurse if true (default), sub-grids also get updated
     * @returns the grid instance for chaining
     *
     * @example
     * // Enable moving for all widgets
     * grid.enableMove(true);
     *
     * // Disable moving for all widgets
     * grid.enableMove(false);
     *
     * // Enable only this grid, not sub-grids
     * grid.enableMove(true, false);
     */
    enableMove(doEnable: boolean, recurse?: boolean): GridStack;
    /**
     * Enables/disables widget resizing for all widgets. No-op for static grids.
     * Note: locally defined items (with noResize property) still override this setting.
     *
     * @param doEnable if true widgets will be resizable, if false resizing is disabled
     * @param recurse if true (default), sub-grids also get updated
     * @returns the grid instance for chaining
     *
     * @example
     * // Enable resizing for all widgets
     * grid.enableResize(true);
     *
     * // Disable resizing for all widgets
     * grid.enableResize(false);
     *
     * // Enable only this grid, not sub-grids
     * grid.enableResize(true, false);
     */
    enableResize(doEnable: boolean, recurse?: boolean): GridStack;
    /**
     * prepares the element for drag&drop - this is normally called by makeWidget() unless are are delay loading
     * @param el GridItemHTMLElement of the widget
     * @param [force=false]
     * */
    prepareDragDrop(el: GridItemHTMLElement, force?: boolean): GridStack;
    /** call given event callback on our main top-most grid (if we're nested) */
    protected triggerEvent(event: Event, target: GridItemHTMLElement): void;
    commit(): GridStack;
}
