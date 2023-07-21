/**
 * gridstack-engine.ts 8.4.0
 * Copyright (c) 2021-2022 Alain Dumesny - see GridStack root license
 */
import { GridStackNode, GridStackPosition, GridStackMoveOpts, SaveFcn, CompactOptions } from './types';
/** callback to update the DOM attributes since this class is generic (no HTML or other info) for items that changed - see _notify() */
type OnChangeCB = (nodes: GridStackNode[]) => void;
/** options used during creation - similar to GridStackOptions */
export interface GridStackEngineOptions {
    column?: number;
    maxRow?: number;
    float?: boolean;
    nodes?: GridStackNode[];
    onChange?: OnChangeCB;
}
/**
 * Defines the GridStack engine that does most no DOM grid manipulation.
 * See GridStack methods and vars for descriptions.
 *
 * NOTE: values should not be modified directly - call the main GridStack API instead
 */
export declare class GridStackEngine {
    column: number;
    maxRow: number;
    nodes: GridStackNode[];
    addedNodes: GridStackNode[];
    removedNodes: GridStackNode[];
    batchMode: boolean;
    constructor(opts?: GridStackEngineOptions);
    batchUpdate(flag?: boolean, doPack?: boolean): GridStackEngine;
    protected _useEntireRowArea(node: GridStackNode, nn: GridStackPosition): boolean;
    /** return the nodes that intercept the given node. Optionally a different area can be used, as well as a second node to skip */
    collide(skip: GridStackNode, area?: GridStackNode, skip2?: GridStackNode): GridStackNode;
    collideAll(skip: GridStackNode, area?: GridStackNode, skip2?: GridStackNode): GridStackNode[];
    /** does a pixel coverage collision based on where we started, returning the node that has the most coverage that is >50% mid line */
    protected directionCollideCoverage(node: GridStackNode, o: GridStackMoveOpts, collides: GridStackNode[]): GridStackNode;
    /** does a pixel coverage returning the node that has the most coverage by area */
    /** called to cache the nodes pixel rectangles used for collision detection during drag */
    cacheRects(w: number, h: number, top: number, right: number, bottom: number, left: number): GridStackEngine;
    /** called to possibly swap between 2 nodes (same size or column, not locked, touching), returning true if successful */
    swap(a: GridStackNode, b: GridStackNode): boolean;
    isAreaEmpty(x: number, y: number, w: number, h: number): boolean;
    /** re-layout grid items to reclaim any empty space - optionally keeping the sort order exactly the same ('list' mode) vs truly finding an empty spaces */
    compact(layout?: CompactOptions, doSort?: boolean): GridStackEngine;
    /** enable/disable floating widgets (default: `false`) See [example](http://gridstackjs.com/demo/float.html) */
    set float(val: boolean);
    /** float getter method */
    get float(): boolean;
    /** sort the nodes array from first to last, or reverse. Called during collision/placement to force an order */
    sortNodes(dir?: 1 | -1, column?: number): GridStackEngine;
    /**
     * given a random node, makes sure it's coordinates/values are valid in the current grid
     * @param node to adjust
     * @param resizing if out of bound, resize down or move into the grid to fit ?
     */
    prepareNode(node: GridStackNode, resizing?: boolean): GridStackNode;
    /** part2 of preparing a node to fit inside our grid - checks for x,y,w from grid dimensions */
    nodeBoundFix(node: GridStackNode, resizing?: boolean): GridStackNode;
    /** returns a list of modified nodes from their original values */
    getDirtyNodes(verify?: boolean): GridStackNode[];
    /** find the first available empty spot for the given node width/height, updating the x,y attributes. return true if found.
     * optionally you can pass your own existing node list and column count, otherwise defaults to that engine data.
     * Optionally pass a widget to start search AFTER, meaning the order will remain the same but possibly have empty slots we skipped
     */
    findEmptyPosition(node: GridStackNode, nodeList?: GridStackNode[], column?: number, after?: GridStackNode): boolean;
    /** call to add the given node to our list, fixing collision and re-packing */
    addNode(node: GridStackNode, triggerAddEvent?: boolean, after?: GridStackNode): GridStackNode;
    removeNode(node: GridStackNode, removeDOM?: boolean, triggerEvent?: boolean): GridStackEngine;
    removeAll(removeDOM?: boolean): GridStackEngine;
    /** checks if item can be moved (layout constrain) vs moveNode(), returning true if was able to move.
     * In more complicated cases (maxRow) it will attempt at moving the item and fixing
     * others in a clone first, then apply those changes if still within specs. */
    moveNodeCheck(node: GridStackNode, o: GridStackMoveOpts): boolean;
    /** return true if can fit in grid height constrain only (always true if no maxRow) */
    willItFit(node: GridStackNode): boolean;
    /** true if x,y or w,h are different after clamping to min/max */
    changedPosConstrain(node: GridStackNode, p: GridStackPosition): boolean;
    /** return true if the passed in node was actually moved (checks for no-op and locked) */
    moveNode(node: GridStackNode, o: GridStackMoveOpts): boolean;
    getRow(): number;
    beginUpdate(node: GridStackNode): GridStackEngine;
    endUpdate(): GridStackEngine;
    /** saves a copy of the largest column layout (eg 12 even when rendering oneColumnMode) so we don't loose orig layout,
     * returning a list of widgets for serialization */
    save(saveElement?: boolean, saveCB?: SaveFcn): GridStackNode[];
    /**
     * call to cache the given layout internally to the given location so we can restore back when column changes size
     * @param nodes list of nodes
     * @param column corresponding column index to save it under
     * @param clear if true, will force other caches to be removed (default false)
     */
    cacheLayout(nodes: GridStackNode[], column: number, clear?: boolean): GridStackEngine;
    /**
     * call to cache the given node layout internally to the given location so we can restore back when column changes size
     * @param node single node to cache
     * @param column corresponding column index to save it under
     */
    cacheOneLayout(n: GridStackNode, column: number): GridStackEngine;
    protected findCacheLayout(n: GridStackNode, column: number): number;
    /** called to remove all internal values but the _id */
    cleanupNode(node: GridStackNode): GridStackEngine;
}
export {};
