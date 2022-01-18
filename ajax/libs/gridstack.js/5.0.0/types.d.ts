/**
 * types.ts 5.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { GridStack } from './gridstack';
/** different layout options when changing # of columns,
 * including a custom function that takes new/old column count, and array of new/old positions
 * Note: new list may be partially already filled if we have a cache of the layout at that size and new items were added later.
 */
export declare type ColumnOptions = 'moveScale' | 'move' | 'scale' | 'none' | ((column: number, oldColumn: number, nodes: GridStackNode[], oldNodes: GridStackNode[]) => void);
export declare type numberOrString = number | string;
export interface GridItemHTMLElement extends HTMLElement {
    /** pointer to grid node instance */
    gridstackNode?: GridStackNode;
}
export declare type GridStackElement = string | HTMLElement | GridItemHTMLElement;
export declare type GridStackEventHandlerCallback = (event: Event, arg2?: GridItemHTMLElement | GridStackNode | GridStackNode[], newNode?: GridStackNode) => void;
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
    /** possible values (default: `false` only show on hover)
      * `true` the resizing handles are always shown even if the user is not hovering over the widget
      * advance condition such as this mobile browser agent check:
      `alwaysShowResizeHandle: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test( navigator.userAgent )`
      See [example](http://gridstack.github.io/gridstack.js/demo/mobile.html) */
    alwaysShowResizeHandle?: boolean;
    /** turns animation on (default?: true) */
    animate?: boolean;
    /** if false gridstack will not initialize existing items (default?: true) */
    auto?: boolean;
    /**
     * one cell height (default?: 'auto'). Can be:
     *  an integer (px)
     *  a string (ex: '100px', '10em', '10rem'). Note: % doesn't right - see demo/cell-height.html
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
     * items always to same. flag is ignored for non nested grids.
     */
    column?: number | 'auto';
    /** additional class on top of '.grid-stack' (which is required for our CSS) to differentiate this instance.
    Note: only used by addGrid(), else your element should have the needed class */
    class?: string;
    /** disallows dragging of widgets (default?: false) */
    disableDrag?: boolean;
    /** disables the onColumnMode when the grid width is less than minWidth (default?: false) */
    disableOneColumnMode?: boolean;
    /** disallows resizing of widgets (default?: false). */
    disableResize?: boolean;
    /** allows to override UI draggable options. (default?: { handle?: '.grid-stack-item-content', scroll?: true, appendTo?: 'body', containment: null }) */
    draggable?: DDDragOpt;
    /** allows to drag external items using this selector - see dragInOptions. (default: undefined) */
    dragIn?: string;
    /** allows to drag external items using these options. See `GridStack.setupDragIn()` instead (not per grid really).
     * (default?: { handle: '.grid-stack-item-content', revert: 'invalid', scroll: false, appendTo: 'body' })
     * helper can be 'clone' or your own function (set what the drag/dropped item will be instead)
     */
    dragInOptions?: DDDragInOpt;
    /** let user drag nested grid items out of a parent or not (default false) */
    dragOut?: boolean;
    /** enable floating widgets (default?: false) See example (http://gridstack.github.io/gridstack.js/demo/float.html) */
    float?: boolean;
    /** draggable handle selector (default?: '.grid-stack-item-content') */
    handle?: string;
    /** draggable handle class (e.g. 'grid-stack-item-content'). If set 'handle' is ignored (default?: null) */
    handleClass?: string;
    /** id used to debug grid instance, not currently stored in DOM attributes */
    id?: numberOrString;
    /** additional widget class (default?: 'grid-stack-item') */
    itemClass?: string;
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
    /** minimal width. If grid width is less, grid will be shown in one column mode (default?: 768) */
    minWidth?: number;
    /**
     * set to true if you want oneColumnMode to use the DOM order and ignore x,y from normal multi column
     * layouts during sorting. This enables you to have custom 1 column layout that differ from the rest. (default?: false)
     */
    oneColumnModeDomSort?: boolean;
    /** class for placeholder (default?: 'grid-stack-placeholder') */
    placeholderClass?: string;
    /** placeholder default content (default?: '') */
    placeholderText?: string;
    /** allows to override UI resizable options. (default?: { autoHide: true, handles: 'se' }) */
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
     * See [example](http://gridstack.github.io/gridstack.js/demo/rtl.html)
     */
    rtl?: boolean | 'auto';
    /**
     * makes grid static (default?: false). If `true` widgets are not movable/resizable.
     * You don't even need draggable/resizable. A CSS class
     * 'grid-stack-static' is also added to the element.
     */
    staticGrid?: boolean;
    /** if `true` will add style element to `<head>` otherwise will add it to element's parent node (default `false`). */
    styleInHead?: boolean;
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
    /** prevent resizing (default?: undefined = un-constrained) */
    noResize?: boolean;
    /** prevents moving (default?: undefined = un-constrained) */
    noMove?: boolean;
    /** prevents being moved by others during their (default?: undefined = un-constrained) */
    locked?: boolean;
    /** widgets can have their own custom resize handles. For example 'e,w' will make that particular widget only resize east and west. See `resizable: {handles: string}` option */
    resizeHandles?: string;
    /** value for `gs-id` stored on the widget (default?: undefined) */
    id?: numberOrString;
    /** html to append inside as content */
    content?: string;
    /** optional nested grid options and list of children, which then turns into actual instance at runtime */
    subGrid?: GridStackOptions | GridStack;
}
/** Drag&Drop resize options */
export interface DDResizeOpt {
    /** do resize handle hide by default until mouse over ? - default: true */
    autoHide?: boolean;
    /**
     * sides where you can resize from (ex: 'e, se, s, sw, w') - default 'se' (south-east)
     * Note: it is not recommended to resize from the top sides as weird side effect may occur.
    */
    handles?: string;
}
/** Drag&Drop remove options */
export interface DDRemoveOpt {
    /** class that can be removed (default?: '.' + opts.itemClass) */
    accept?: string;
}
/** Drag&Drop dragging options */
export interface DDDragOpt {
    /** class selector of items that can be dragged. default to '.grid-stack-item-content' */
    handle?: string;
    /** default to `true` */
    scroll?: boolean;
    /** default to 'body' */
    appendTo?: string;
    /** parent constraining where item can be dragged out from (default: null = no constrain) */
    containment?: string;
}
export interface DDDragInOpt extends DDDragOpt {
    /** used when dragging item from the outside, and canceling (ex: 'invalid' or your own method)*/
    revert?: string | ((event: Event) => HTMLElement);
    /** helper function when dropping (ex: 'clone' or your own method) */
    helper?: string | ((event: Event) => HTMLElement);
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
}
/**
 * internal descriptions describing the items in the grid
 */
export interface GridStackNode extends GridStackWidget {
    /** pointer back to HTML element */
    el?: GridItemHTMLElement;
    /** pointer back to Grid instance */
    grid?: GridStack;
}
