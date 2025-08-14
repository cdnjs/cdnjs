/**
 * gridstack-engine.ts 12.3.2
 * Copyright (c) 2021-2025  Alain Dumesny - see GridStack root license
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
 * Defines the GridStack engine that handles all grid layout calculations and node positioning.
 * This is the core engine that performs grid manipulation without any DOM operations.
 *
 * The engine manages:
 * - Node positioning and collision detection
 * - Layout algorithms (compact, float, etc.)
 * - Grid resizing and column changes
 * - Widget movement and resizing logic
 *
 * NOTE: Values should not be modified directly - use the main GridStack API instead
 * to ensure proper DOM updates and event triggers.
 */
export declare class GridStackEngine {
    column: number;
    maxRow: number;
    nodes: GridStackNode[];
    addedNodes: GridStackNode[];
    removedNodes: GridStackNode[];
    batchMode: boolean;
    defaultColumn: number;
    /** true when grid.load() already cached the layout and can skip out of bound caching info */
    skipCacheUpdate?: boolean;
    constructor(opts?: GridStackEngineOptions);
    /**
     * Enable/disable batch mode for multiple operations to optimize performance.
     * When enabled, layout updates are deferred until batch mode is disabled.
     *
     * @param flag true to enable batch mode, false to disable and apply changes
     * @param doPack if true (default), pack/compact nodes when disabling batch mode
     * @returns the engine instance for chaining
     *
     * @example
     * // Start batch mode for multiple operations
     * engine.batchUpdate(true);
     * engine.addNode(node1);
     * engine.addNode(node2);
     * engine.batchUpdate(false); // Apply all changes at once
     */
    batchUpdate(flag?: boolean, doPack?: boolean): GridStackEngine;
    protected _useEntireRowArea(node: GridStackNode, nn: GridStackPosition): boolean;
    /**
     * Return the first node that intercepts/collides with the given node or area.
     * Used for collision detection during drag and drop operations.
     *
     * @param skip the node to skip in collision detection (usually the node being moved)
     * @param area the area to check for collisions (defaults to skip node's area)
     * @param skip2 optional second node to skip in collision detection
     * @returns the first colliding node, or undefined if no collision
     *
     * @example
     * const colliding = engine.collide(draggedNode, {x: 2, y: 1, w: 2, h: 1});
     * if (colliding) {
     *   console.log('Would collide with:', colliding.id);
     * }
     */
    collide(skip: GridStackNode, area?: GridStackNode, skip2?: GridStackNode): GridStackNode | undefined;
    /**
     * Return all nodes that intercept/collide with the given node or area.
     * Similar to collide() but returns all colliding nodes instead of just the first.
     *
     * @param skip the node to skip in collision detection
     * @param area the area to check for collisions (defaults to skip node's area)
     * @param skip2 optional second node to skip in collision detection
     * @returns array of all colliding nodes
     *
     * @example
     * const allCollisions = engine.collideAll(draggedNode);
     * console.log('Colliding with', allCollisions.length, 'nodes');
     */
    collideAll(skip: GridStackNode, area?: GridStackNode, skip2?: GridStackNode): GridStackNode[];
    /** does a pixel coverage collision based on where we started, returning the node that has the most coverage that is >50% mid line */
    protected directionCollideCoverage(node: GridStackNode, o: GridStackMoveOpts, collides: GridStackNode[]): GridStackNode | undefined;
    /**
     * Attempt to swap the positions of two nodes if they meet swapping criteria.
     * Nodes can swap if they are the same size or in the same column/row, not locked, and touching.
     *
     * @param a first node to swap
     * @param b second node to swap
     * @returns true if swap was successful, false if not possible, undefined if not applicable
     *
     * @example
     * const swapped = engine.swap(nodeA, nodeB);
     * if (swapped) {
     *   console.log('Nodes swapped successfully');
     * }
     */
    swap(a: GridStackNode, b: GridStackNode): boolean | undefined;
    /**
     * Check if the specified rectangular area is empty (no nodes occupy any part of it).
     *
     * @param x the x coordinate (column) of the area to check
     * @param y the y coordinate (row) of the area to check
     * @param w the width in columns of the area to check
     * @param h the height in rows of the area to check
     * @returns true if the area is completely empty, false if any node overlaps
     *
     * @example
     * if (engine.isAreaEmpty(2, 1, 3, 2)) {
     *   console.log('Area is available for placement');
     * }
     */
    isAreaEmpty(x: number, y: number, w: number, h: number): boolean;
    /**
     * Re-layout grid items to reclaim any empty space.
     * This optimizes the grid layout by moving items to fill gaps.
     *
     * @param layout layout algorithm to use:
     *   - 'compact' (default): find truly empty spaces, may reorder items
     *   - 'list': keep the sort order exactly the same, move items up sequentially
     * @param doSort if true (default), sort nodes by position before compacting
     * @returns the engine instance for chaining
     *
     * @example
     * // Compact to fill empty spaces
     * engine.compact();
     *
     * // Compact preserving item order
     * engine.compact('list');
     */
    compact(layout?: CompactOptions, doSort?: boolean): GridStackEngine;
    /**
     * Enable/disable floating widgets (default: `false`).
     * When floating is enabled, widgets can move up to fill empty spaces.
     * See [example](http://gridstackjs.com/demo/float.html)
     *
     * @param val true to enable floating, false to disable
     *
     * @example
     * engine.float = true;  // Enable floating
     * engine.float = false; // Disable floating (default)
     */
    set float(val: boolean);
    /**
     * Get the current floating mode setting.
     *
     * @returns true if floating is enabled, false otherwise
     *
     * @example
     * const isFloating = engine.float;
     * console.log('Floating enabled:', isFloating);
     */
    get float(): boolean;
    /**
     * Sort the nodes array from first to last, or reverse.
     * This is called during collision/placement operations to enforce a specific order.
     *
     * @param dir sort direction: 1 for ascending (first to last), -1 for descending (last to first)
     * @returns the engine instance for chaining
     *
     * @example
     * engine.sortNodes();    // Sort ascending (default)
     * engine.sortNodes(-1);  // Sort descending
     */
    sortNodes(dir?: 1 | -1): GridStackEngine;
    /**
     * Prepare and validate a node's coordinates and values for the current grid.
     * This ensures the node has valid position, size, and properties before being added to the grid.
     *
     * @param node the node to prepare and validate
     * @param resizing if true, resize the node down if it's out of bounds; if false, move it to fit
     * @returns the prepared node with valid coordinates
     *
     * @example
     * const node = { w: 3, h: 2, content: 'Hello' };
     * const prepared = engine.prepareNode(node);
     * console.log('Node prepared at:', prepared.x, prepared.y);
     */
    prepareNode(node: GridStackNode, resizing?: boolean): GridStackNode;
    /**
     * Part 2 of preparing a node to fit inside the grid - validates and fixes coordinates and dimensions.
     * This ensures the node fits within grid boundaries and respects min/max constraints.
     *
     * @param node the node to validate and fix
     * @param resizing if true, resize the node to fit; if false, move the node to fit
     * @returns the engine instance for chaining
     *
     * @example
     * // Fix a node that might be out of bounds
     * engine.nodeBoundFix(node, true); // Resize to fit
     * engine.nodeBoundFix(node, false); // Move to fit
     */
    nodeBoundFix(node: GridStackNode, resizing?: boolean): GridStackEngine;
    /**
     * Returns a list of nodes that have been modified from their original values.
     * This is used to track which nodes need DOM updates.
     *
     * @param verify if true, performs additional verification by comparing current vs original positions
     * @returns array of nodes that have been modified
     *
     * @example
     * const changed = engine.getDirtyNodes();
     * console.log('Modified nodes:', changed.length);
     *
     * // Get verified dirty nodes
     * const verified = engine.getDirtyNodes(true);
     */
    getDirtyNodes(verify?: boolean): GridStackNode[];
    /**
     * Find the first available empty spot for the given node dimensions.
     * Updates the node's x,y attributes with the found position.
     *
     * @param node the node to find a position for (w,h must be set)
     * @param nodeList optional list of nodes to check against (defaults to engine nodes)
     * @param column optional column count (defaults to engine column count)
     * @param after optional node to start search after (maintains order)
     * @returns true if an empty position was found and node was updated
     *
     * @example
     * const node = { w: 2, h: 1 };
     * if (engine.findEmptyPosition(node)) {
     *   console.log('Found position at:', node.x, node.y);
     * }
     */
    findEmptyPosition(node: GridStackNode, nodeList?: GridStackNode[], column?: number, after?: GridStackNode): boolean;
    /**
     * Add the given node to the grid, handling collision detection and re-packing.
     * This is the main method for adding new widgets to the engine.
     *
     * @param node the node to add to the grid
     * @param triggerAddEvent if true, adds node to addedNodes list for event triggering
     * @param after optional node to place this node after (for ordering)
     * @returns the added node (or existing node if duplicate)
     *
     * @example
     * const node = { x: 0, y: 0, w: 2, h: 1, content: 'Hello' };
     * const added = engine.addNode(node, true);
     */
    addNode(node: GridStackNode, triggerAddEvent?: boolean, after?: GridStackNode): GridStackNode;
    /**
     * Remove the given node from the grid.
     *
     * @param node the node to remove
     * @param removeDOM if true (default), marks node for DOM removal
     * @param triggerEvent if true, adds node to removedNodes list for event triggering
     * @returns the engine instance for chaining
     *
     * @example
     * engine.removeNode(node, true, true);
     */
    removeNode(node: GridStackNode, removeDOM?: boolean, triggerEvent?: boolean): GridStackEngine;
    /**
     * Remove all nodes from the grid.
     *
     * @param removeDOM if true (default), marks all nodes for DOM removal
     * @param triggerEvent if true (default), triggers removal events
     * @returns the engine instance for chaining
     *
     * @example
     * engine.removeAll(); // Remove all nodes
     */
    removeAll(removeDOM?: boolean, triggerEvent?: boolean): GridStackEngine;
    /**
     * Check if a node can be moved to a new position, considering layout constraints.
     * This is a safer version of moveNode() that validates the move first.
     *
     * For complex cases (like maxRow constraints), it simulates the move in a clone first,
     * then applies the changes only if they meet all specifications.
     *
     * @param node the node to move
     * @param o move options including target position
     * @returns true if the node was successfully moved
     *
     * @example
     * const canMove = engine.moveNodeCheck(node, { x: 2, y: 1 });
     * if (canMove) {
     *   console.log('Node moved successfully');
     * }
     */
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
    /** saves a copy of the largest column layout (eg 12 even when rendering 1 column) so we don't loose orig layout, unless explicity column
     * count to use is given. returning a list of widgets for serialization
     * @param saveElement if true (default), the element will be saved to GridStackWidget.el field, else it will be removed.
     * @param saveCB callback for each node -> widget, so application can insert additional data to be saved into the widget data structure.
     * @param column if provided, the grid will be saved for the given column count (IFF we have matching internal saved layout, or current layout).
     * Note: nested grids will ALWAYS save the container w to match overall layouts (parent + child) to be consistent.
    */
    save(saveElement?: boolean, saveCB?: SaveFcn, column?: number): GridStackNode[];
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
    protected findCacheLayout(n: GridStackNode, column: number): number | undefined;
    removeNodeFromLayoutCache(n: GridStackNode): void;
    /** called to remove all internal values but the _id */
    cleanupNode(node: GridStackNode): GridStackEngine;
}
export {};
