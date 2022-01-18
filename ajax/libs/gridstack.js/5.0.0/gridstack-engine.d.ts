/**
 * gridstack-engine.ts 5.0
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */
import { GridStackNode, GridStackPosition, GridStackMoveOpts } from './types';
export declare type onChangeCB = (nodes: GridStackNode[], removeDOM?: boolean) => void;
/** options used for creations - similar to GridStackOptions */
export interface GridStackEngineOptions {
    column?: number;
    maxRow?: number;
    float?: boolean;
    nodes?: GridStackNode[];
    onChange?: onChangeCB;
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
    onChange: onChangeCB;
    addedNodes: GridStackNode[];
    removedNodes: GridStackNode[];
    batchMode: boolean;
    constructor(opts?: GridStackEngineOptions);
    batchUpdate(): GridStackEngine;
    commit(): GridStackEngine;
    private _useEntireRowArea;
    /** return the nodes that intercept the given node. Optionally a different area can be used, as well as a second node to skip */
    collide(skip: GridStackNode, area?: GridStackNode, skip2?: GridStackNode): GridStackNode;
    collideAll(skip: GridStackNode, area?: GridStackNode, skip2?: GridStackNode): GridStackNode[];
    /** does a pixel coverage collision, returning the node that has the most coverage that is >50% mid line */
    collideCoverage(node: GridStackNode, o: GridStackMoveOpts, collides: GridStackNode[]): GridStackNode;
    /** called to cache the nodes pixel rectangles used for collision detection during drag */
    cacheRects(w: number, h: number, top: number, right: number, bottom: number, left: number): GridStackEngine;
    /** called to possibly swap between 2 nodes (same size or column, not locked, touching), returning true if successful */
    swap(a: GridStackNode, b: GridStackNode): boolean;
    isAreaEmpty(x: number, y: number, w: number, h: number): boolean;
    /** re-layout grid items to reclaim any empty space */
    compact(): GridStackEngine;
    /** enable/disable floating widgets (default: `false`) See [example](http://gridstackjs.com/demo/float.html) */
    set float(val: boolean);
    /** float getter method */
    get float(): boolean;
    /**
     * given a random node, makes sure it's coordinates/values are valid in the current grid
     * @param node to adjust
     * @param resizing if out of bound, resize down or move into the grid to fit ?
     */
    prepareNode(node: GridStackNode, resizing?: boolean): GridStackNode;
    /** part2 of preparing a node to fit inside our grid - checks  for x,y from grid dimensions */
    nodeBoundFix(node: GridStackNode, resizing?: boolean): GridStackNode;
    getDirtyNodes(verify?: boolean): GridStackNode[];
    /** call to add the given node to our list, fixing collision and re-packing */
    addNode(node: GridStackNode, triggerAddEvent?: boolean): GridStackNode;
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
    /** saves a copy of the largest column layout (eg 12 even when rendering oneColumnMode, so we don't loose orig layout),
     * returning a list of widgets for serialization */
    save(saveElement?: boolean): GridStackNode[];
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
    /** called to remove all internal values but the _id */
    cleanupNode(node: GridStackNode): GridStackEngine;
}
