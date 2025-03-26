/**
 * types.ts 11.1.2
 * Copyright (c) 2021-2024 Alain Dumesny - see GridStack root license
 */
import { GridStack } from './gridstack';
import { GridStackEngine } from './gridstack-engine';
export declare const gridDefaults: GridStackOptions;
/**
 * different layout options when changing # of columns, including a custom function that takes new/old column count, and array of new/old positions
 * Note: new list may be partially already filled if we have a cache of the layout at that size and new items were added later.
 * Options are:
 * 'list' - treat items as sorted list, keeping items (un-sized unless too big for column count) sequentially reflowing them
 * 'compact' - similar to list, but using compact() method which will possibly re-order items if an empty slots are available due to a larger item needing to be pushed to next row
 * 'moveScale' - will scale and move items by the ratio new newColumnCount / oldColumnCount
 * 'move' | 'scale' - will only size or move items
 * 'none' will leave items unchanged, unless they don't fit in column count
 */
export type ColumnOptions = 'list' | 'compact' | 'moveScale' | 'move' | 'scale' | 'none' | ((column: number, oldColumn: number, nodes: GridStackNode[], oldNodes: GridStackNode[]) => void);
export type CompactOptions = 'list' | 'compact';
export type numberOrString = number | string;
export interface GridItemHTMLElement extends HTMLElement {
    /** pointer to grid node instance */
    gridstackNode?: GridStackNode;
}
export type GridStackElement = string | HTMLElement | GridItemHTMLElement;
/** specific and general event handlers for the .on() method */
export type GridStackEventHandler = (event: Event) => void;
export type GridStackElementHandler = (event: Event, el: GridItemHTMLElement) => void;
export type GridStackNodesHandler = (event: Event, nodes: GridStackNode[]) => void;
export type GridStackDroppedHandler = (event: Event, previousNode: GridStackNode, newNode: GridStackNode) => void;
export type GridStackEventHandlerCallback = GridStackEventHandler | GridStackElementHandler | GridStackNodesHandler | GridStackDroppedHandler;
/** optional function called during load() to callback the user on new added/remove grid items | grids */
export type AddRemoveFcn = (parent: HTMLElement, w: GridStackWidget, add: boolean, grid: boolean) => HTMLElement | undefined;
/** optional function called during save() to let the caller add additional custom data to the GridStackWidget structure that will get returned */
export type SaveFcn = (node: GridStackNode, w: GridStackWidget) => void;
/** optional function called during load()/addWidget() to let the caller create custom content other than plan text */
export type RenderFcn = (el: HTMLElement, w: GridStackWidget) => void;
export type ResizeToContentFcn = (el: GridItemHTMLElement) => void;
/** describes the responsive nature of the grid. NOTE: make sure to have correct extra CSS to support this. */
export interface Responsive {
    /** wanted width to maintain (+-50%) to dynamically pick a column count. NOTE: make sure to have correct extra CSS to support this. */
    columnWidth?: number;
    /** maximum number of columns allowed (default: 12). NOTE: make sure to have correct extra CSS to support this. */
    columnMax?: number;
    /** explicit width:column breakpoints instead of automatic 'columnWidth'. NOTE: make sure to have correct extra CSS to support this. */
    breakpoints?: Breakpoint[];
    /** specify if breakpoints are for window size or grid size (default:false = grid) */
    breakpointForWindow?: boolean;
    /** global re-layout mode when changing columns */
    layout?: ColumnOptions;
}
export interface Breakpoint {
    /** <= width for the breakpoint to trigger */
    w?: number;
    /** column count */
    c: number;
    /** re-layout mode if different from global one */
    layout?: ColumnOptions;
}
/**
 * Defines the options for a Grid
 */
export interface GridStackOptions {
    /**
     * accept widgets dragged from other grids or from outside (default: `false`). Can be:
     * `true` (uses `'.grid-stack-item'` class filter) or `false`,
     * string for explicit class name,
     * function returning a boolean. See [example](http://gridstack.github.io/gridstack.js/demo/two.html)
     */
    acceptWidgets?: boolean | string | ((element: Element) => boolean);
    /** possible values (default: `mobile`) - does not apply to non-resizable widgets
      * `false` the resizing handles are only shown while hovering over a widget
      * `true` the resizing handles are always shown
      * 'mobile' if running on a mobile device, default to `true` (since there is no hovering per say), else `false`.
      See [example](http://gridstack.github.io/gridstack.js/demo/mobile.html) */
    alwaysShowResizeHandle?: true | false | 'mobile';
    /** turns animation on (default?: true) */
    animate?: boolean;
    /** if false gridstack will not initialize existing items (default?: true) */
    auto?: boolean;
    /**
     * one cell height (default?: 'auto'). Can be:
     *  an integer (px)
     *  a string (ex: '100px', '10em', '10rem'). Note: % doesn't work right - see demo/cell-height.html
     *  0, in which case the library will not generate styles for rows. Everything must be defined in your own CSS files.
     *  'auto' - height will be calculated for square cells (width / column) and updated live as you resize the window - also see `cellHeightThrottle`
     *  'initial' - similar to 'auto' (start at square cells) but stay that size during window resizing.
     */
    cellHeight?: numberOrString;
    /** throttle time delay (in ms) used when cellHeight='auto' to improve performance vs usability (default?: 100).
     * A value of 0 will make it instant at a cost of re-creating the CSS file at ever window resize event!
     * */
    cellHeightThrottle?: number;
    /** (internal) unit for cellHeight (default? 'px') which is set when a string cellHeight with a unit is passed (ex: '10rem') */
    cellHeightUnit?: string;
    /** list of children item to create when calling load() or addGrid() */
    children?: GridStackWidget[];
    /** number of columns (default?: 12). Note: IF you change this, CSS also have to change. See https://github.com/gridstack/gridstack.js#change-grid-columns.
     * Note: for nested grids, it is recommended to use 'auto' which will always match the container grid-item current width (in column) to keep inside and outside
     * items always to same. flag is not supported for regular non-nested grids.
     */
    column?: number | 'auto';
    /** responsive column layout for width:column behavior */
    columnOpts?: Responsive;
    /** additional class on top of '.grid-stack' (which is required for our CSS) to differentiate this instance.
    Note: only used by addGrid(), else your element should have the needed class */
    class?: string;
    /** disallows dragging of widgets (default?: false) */
    disableDrag?: boolean;
    /** disallows resizing of widgets (default?: false). */
    disableResize?: boolean;
    /** allows to override UI draggable options. (default?: { handle?: '.grid-stack-item-content', appendTo?: 'body' }) */
    draggable?: DDDragOpt;
    /** let user drag nested grid items out of a parent or not (default true - not supported yet) */
    /** the type of engine to create (so you can subclass) default to GridStackEngine */
    engineClass?: typeof GridStackEngine;
    /** enable floating widgets (default?: false) See example (http://gridstack.github.io/gridstack.js/demo/float.html) */
    float?: boolean;
    /** draggable handle selector (default?: '.grid-stack-item-content') */
    handle?: string;
    /** draggable handle class (e.g. 'grid-stack-item-content'). If set 'handle' is ignored (default?: null) */
    handleClass?: string;
    /** additional widget class (default?: 'grid-stack-item') */
    itemClass?: string;
    /** re-layout mode when we're a subgrid and we are being resized. default to 'list' */
    layout?: ColumnOptions;
    /** true when widgets are only created when they scroll into view (visible) */
    lazyLoad?: boolean;
    /**
     * gap between grid item and content (default?: 10). This will set all 4 sides and support the CSS formats below
     *  an integer (px)
     *  a string with possible units (ex: '2em', '20px', '2rem')
     *  string with space separated values (ex: '5px 10px 0 20px' for all 4 sides, or '5em 10em' for top/bottom and left/right pairs like CSS).
     * Note: all sides must have same units (last one wins, default px)
     */
    margin?: numberOrString;
    /** OLD way to optionally set each side - use margin: '5px 10px 0 20px' instead. Used internally to store each side. */
    marginTop?: numberOrString;
    marginRight?: numberOrString;
    marginBottom?: numberOrString;
    marginLeft?: numberOrString;
    /** (internal) unit for margin (default? 'px') set when `margin` is set as string with unit (ex: 2rem') */
    marginUnit?: string;
    /** maximum rows amount. Default? is 0 which means no maximum rows */
    maxRow?: number;
    /** minimum rows amount. Default is `0`. You can also do this with `min-height` CSS attribute
     * on the grid div in pixels, which will round to the closest row.
     */
    minRow?: number;
    /** If you are using a nonce-based Content Security Policy, pass your nonce here and
     * GridStack will add it to the <style> elements it creates. */
    nonce?: string;
    /** class for placeholder (default?: 'grid-stack-placeholder') */
    placeholderClass?: string;
    /** placeholder default content (default?: '') */
    placeholderText?: string;
    /** allows to override UI resizable options. (default?: { handles: 'se' }) */
    resizable?: DDResizeOpt;
    /**
     * if true widgets could be removed by dragging outside of the grid. It could also be a selector string (ex: ".trash"),
     * in this case widgets will be removed by dropping them there (default?: false)
     * See example (http://gridstack.github.io/gridstack.js/demo/two.html)
     */
    removable?: boolean | string;
    /** allows to override UI removable options. (default?: { accept: '.grid-stack-item' }) */
    removableOptions?: DDRemoveOpt;
    /** fix grid number of rows. This is a shortcut of writing `minRow:N, maxRow:N`. (default `0` no constrain) */
    row?: number;
    /**
     * if true turns grid to RTL. Possible values are true, false, 'auto' (default?: 'auto')
     * See [example](http://gridstack.github.io/gridstack.js/demo/right-to-left(rtl).html)
     */
    rtl?: boolean | 'auto';
    /** set to true if all grid items (by default, but item can also override) height should be based on content size instead of WidgetItem.h to avoid v-scrollbars.
     * Note: this is still row based, not pixels, so it will use ceil(getBoundingClientRect().height / getCellHeight())
     */
    sizeToContent?: boolean;
    /**
     * makes grid static (default?: false). If `true` widgets are not movable/resizable.
     * You don't even need draggable/resizable. A CSS class
     * 'grid-stack-static' is also added to the element.
     */
    staticGrid?: boolean;
    /** if `true` will add style element to `<head>` otherwise will add it to element's parent node (default `false`). */
    styleInHead?: boolean;
    /** list of differences in options for automatically created sub-grids under us (inside our grid-items) */
    subGridOpts?: GridStackOptions;
    /** enable/disable the creation of sub-grids on the fly by dragging items completely
     * over others (nest) vs partially (push). Forces `DDDragOpt.pause=true` to accomplish that. */
    subGridDynamic?: boolean;
}
/** options used during GridStackEngine.moveNode() */
export interface GridStackMoveOpts extends GridStackPosition {
    /** node to skip collision */
    skip?: GridStackNode;
    /** do we pack (default true) */
    pack?: boolean;
    /** true if we are calling this recursively to prevent simple swap or coverage collision - default false*/
    nested?: boolean;
    /** vars to calculate other cells coordinates */
    cellWidth?: number;
    cellHeight?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    /** position in pixels of the currently dragged items (for overlap check) */
    rect?: GridStackPosition;
    /** true if we're live resizing */
    resizing?: boolean;
    /** best node (most coverage) we collied with */
    collide?: GridStackNode;
    /** for collision check even if we don't move */
    forceCollide?: boolean;
}
export interface GridStackPosition {
    /** widget position x (default?: 0) */
    x?: number;
    /** widget position y (default?: 0) */
    y?: number;
    /** widget dimension width (default?: 1) */
    w?: number;
    /** widget dimension height (default?: 1) */
    h?: number;
}
/**
 * GridStack Widget creation options
 */
export interface GridStackWidget extends GridStackPosition {
    /** if true then x, y parameters will be ignored and widget will be places on the first available position (default?: false) */
    autoPosition?: boolean;
    /** minimum width allowed during resize/creation (default?: undefined = un-constrained) */
    minW?: number;
    /** maximum width allowed during resize/creation (default?: undefined = un-constrained) */
    maxW?: number;
    /** minimum height allowed during resize/creation (default?: undefined = un-constrained) */
    minH?: number;
    /** maximum height allowed during resize/creation (default?: undefined = un-constrained) */
    maxH?: number;
    /** prevent direct resizing by the user (default?: undefined = un-constrained) */
    noResize?: boolean;
    /** prevents direct moving by the user (default?: undefined = un-constrained) */
    noMove?: boolean;
    /** same as noMove+noResize but also prevents being pushed by other widgets or api (default?: undefined = un-constrained) */
    locked?: boolean;
    /** value for `gs-id` stored on the widget (default?: undefined) */
    id?: string;
    /** html to append inside as content */
    content?: string;
    /** true when widgets are only created when they scroll into view (visible) */
    lazyLoad?: boolean;
    /** local (vs grid) override - see GridStackOptions.
     * Note: This also allow you to set a maximum h value (but user changeable during normal resizing) to prevent unlimited content from taking too much space (get scrollbar) */
    sizeToContent?: boolean | number;
    /** local override of GridStack.resizeToContentParent that specify the class to use for the parent (actual) vs child (wanted) height */
    resizeToContentParent?: string;
    /** optional nested grid options and list of children, which then turns into actual instance at runtime to get options from */
    subGridOpts?: GridStackOptions;
}
/** Drag&Drop resize options */
export interface DDResizeOpt {
    /** do resize handle hide by default until mouse over ? - default: true on desktop, false on mobile*/
    autoHide?: boolean;
    /**
     * sides where you can resize from (ex: 'e, se, s, sw, w') - default 'se' (south-east)
     * Note: it is not recommended to resize from the top sides as weird side effect may occur.
    */
    handles?: string;
}
/** Drag&Drop remove options */
export interface DDRemoveOpt {
    /** class that can be removed (default?: opts.itemClass) */
    accept?: string;
    /** class that cannot be removed (default: 'grid-stack-non-removable') */
    decline?: string;
}
/** Drag&Drop dragging options */
export interface DDDragOpt {
    /** class selector of items that can be dragged. default to '.grid-stack-item-content' */
    handle?: string;
    /** default to 'body' */
    appendTo?: string;
    /** if set (true | msec), dragging placement (collision) will only happen after a pause by the user. Note: this is Global */
    pause?: boolean | number;
    /** default to `true` */
    scroll?: boolean;
    /** prevents dragging from starting on specified elements, listed as comma separated selectors (eg: '.no-drag'). default built in is 'input,textarea,button,select,option' */
    cancel?: string;
    /** helper function when dropping: 'clone' or your own method */
    helper?: 'clone' | ((el: HTMLElement) => HTMLElement);
    /** callbacks */
    start?: (event: Event, ui: DDUIData) => void;
    stop?: (event: Event) => void;
    drag?: (event: Event, ui: DDUIData) => void;
}
export interface Size {
    width: number;
    height: number;
}
export interface Position {
    top: number;
    left: number;
}
export interface Rect extends Size, Position {
}
/** data that is passed during drag and resizing callbacks */
export interface DDUIData {
    position?: Position;
    size?: Size;
    draggable?: HTMLElement;
}
/**
 * internal runtime descriptions describing the widgets in the grid
 */
export interface GridStackNode extends GridStackWidget {
    /** pointer back to HTML element */
    el?: GridItemHTMLElement;
    /** pointer back to parent Grid instance */
    grid?: GridStack;
    /** actual sub-grid instance */
    subGrid?: GridStack;
    /** allow delay creation when visible */
    visibleObservable?: IntersectionObserver;
}
