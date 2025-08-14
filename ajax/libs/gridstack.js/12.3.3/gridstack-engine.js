/**
 * gridstack-engine.ts 12.3.2
 * Copyright (c) 2021-2025  Alain Dumesny - see GridStack root license
 */
import { Utils } from './utils';
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
class GridStackEngine {
    constructor(opts = {}) {
        this.addedNodes = [];
        this.removedNodes = [];
        this.defaultColumn = 12;
        this.column = opts.column || this.defaultColumn;
        if (this.column > this.defaultColumn)
            this.defaultColumn = this.column;
        this.maxRow = opts.maxRow;
        this._float = opts.float;
        this.nodes = opts.nodes || [];
        this.onChange = opts.onChange;
    }
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
    batchUpdate(flag = true, doPack = true) {
        if (!!this.batchMode === flag)
            return this;
        this.batchMode = flag;
        if (flag) {
            this._prevFloat = this._float;
            this._float = true; // let things go anywhere for now... will restore and possibly reposition later
            this.cleanNodes();
            this.saveInitial(); // since begin update (which is called multiple times) won't do this
        }
        else {
            this._float = this._prevFloat;
            delete this._prevFloat;
            if (doPack)
                this._packNodes();
            this._notify();
        }
        return this;
    }
    // use entire row for hitting area (will use bottom reverse sorted first) if we not actively moving DOWN and didn't already skip
    _useEntireRowArea(node, nn) {
        return (!this.float || this.batchMode && !this._prevFloat) && !this._hasLocked && (!node._moving || node._skipDown || nn.y <= node.y);
    }
    /** @internal fix collision on given 'node', going to given new location 'nn', with optional 'collide' node already found.
     * return true if we moved. */
    _fixCollisions(node, nn = node, collide, opt = {}) {
        this.sortNodes(-1); // from last to first, so recursive collision move items in the right order
        collide = collide || this.collide(node, nn); // REAL area collide for swap and skip if none...
        if (!collide)
            return false;
        // swap check: if we're actively moving in gravity mode, see if we collide with an object the same size
        if (node._moving && !opt.nested && !this.float) {
            if (this.swap(node, collide))
                return true;
        }
        // during while() collisions MAKE SURE to check entire row so larger items don't leap frog small ones (push them all down starting last in grid)
        let area = nn;
        if (!this._loading && this._useEntireRowArea(node, nn)) {
            area = { x: 0, w: this.column, y: nn.y, h: nn.h };
            collide = this.collide(node, area, opt.skip); // force new hit
        }
        let didMove = false;
        const newOpt = { nested: true, pack: false };
        let counter = 0;
        while (collide = collide || this.collide(node, area, opt.skip)) { // could collide with more than 1 item... so repeat for each
            if (counter++ > this.nodes.length * 2) {
                throw new Error("Infinite collide check");
            }
            let moved;
            // if colliding with a locked item OR loading (move after) OR moving down with top gravity (and collide could move up) -> skip past the collide,
            // but remember that skip down so we only do this once (and push others otherwise).
            if (collide.locked || this._loading || node._moving && !node._skipDown && nn.y > node.y && !this.float &&
                // can take space we had, or before where we're going
                (!this.collide(collide, { ...collide, y: node.y }, node) || !this.collide(collide, { ...collide, y: nn.y - collide.h }, node))) {
                node._skipDown = (node._skipDown || nn.y > node.y);
                const newNN = { ...nn, y: collide.y + collide.h, ...newOpt };
                // pretent we moved to where we are now so we can continue any collision checks #2492
                moved = this._loading && Utils.samePos(node, newNN) ? true : this.moveNode(node, newNN);
                if ((collide.locked || this._loading) && moved) {
                    Utils.copyPos(nn, node); // moving after lock become our new desired location
                }
                else if (!collide.locked && moved && opt.pack) {
                    // we moved after and will pack: do it now and keep the original drop location, but past the old collide to see what else we might push way
                    this._packNodes();
                    nn.y = collide.y + collide.h;
                    Utils.copyPos(node, nn);
                }
                didMove = didMove || moved;
            }
            else {
                // move collide down *after* where we will be, ignoring where we are now (don't collide with us)
                moved = this.moveNode(collide, { ...collide, y: nn.y + nn.h, skip: node, ...newOpt });
            }
            if (!moved)
                return didMove; // break inf loop if we couldn't move after all (ex: maxRow, fixed)
            collide = undefined;
        }
        return didMove;
    }
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
    collide(skip, area = skip, skip2) {
        const skipId = skip._id;
        const skip2Id = skip2?._id;
        return this.nodes.find(n => n._id !== skipId && n._id !== skip2Id && Utils.isIntercepted(n, area));
    }
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
    collideAll(skip, area = skip, skip2) {
        const skipId = skip._id;
        const skip2Id = skip2?._id;
        return this.nodes.filter(n => n._id !== skipId && n._id !== skip2Id && Utils.isIntercepted(n, area));
    }
    /** does a pixel coverage collision based on where we started, returning the node that has the most coverage that is >50% mid line */
    directionCollideCoverage(node, o, collides) {
        if (!o.rect || !node._rect)
            return;
        const r0 = node._rect; // where started
        const r = { ...o.rect }; // where we are
        // update dragged rect to show where it's coming from (above or below, etc...)
        if (r.y > r0.y) {
            r.h += r.y - r0.y;
            r.y = r0.y;
        }
        else {
            r.h += r0.y - r.y;
        }
        if (r.x > r0.x) {
            r.w += r.x - r0.x;
            r.x = r0.x;
        }
        else {
            r.w += r0.x - r.x;
        }
        let collide;
        let overMax = 0.5; // need >50%
        for (let n of collides) {
            if (n.locked || !n._rect) {
                break;
            }
            const r2 = n._rect; // overlapping target
            let yOver = Number.MAX_VALUE, xOver = Number.MAX_VALUE;
            // depending on which side we started from, compute the overlap % of coverage
            // (ex: from above/below we only compute the max horizontal line coverage)
            if (r0.y < r2.y) { // from above
                yOver = ((r.y + r.h) - r2.y) / r2.h;
            }
            else if (r0.y + r0.h > r2.y + r2.h) { // from below
                yOver = ((r2.y + r2.h) - r.y) / r2.h;
            }
            if (r0.x < r2.x) { // from the left
                xOver = ((r.x + r.w) - r2.x) / r2.w;
            }
            else if (r0.x + r0.w > r2.x + r2.w) { // from the right
                xOver = ((r2.x + r2.w) - r.x) / r2.w;
            }
            const over = Math.min(xOver, yOver);
            if (over > overMax) {
                overMax = over;
                collide = n;
            }
        }
        o.collide = collide; // save it so we don't have to find it again
        return collide;
    }
    /** does a pixel coverage returning the node that has the most coverage by area */
    /*
    protected collideCoverage(r: GridStackPosition, collides: GridStackNode[]): {collide: GridStackNode, over: number} {
      const collide: GridStackNode;
      const overMax = 0;
      collides.forEach(n => {
        if (n.locked || !n._rect) return;
        const over = Utils.areaIntercept(r, n._rect);
        if (over > overMax) {
          overMax = over;
          collide = n;
        }
      });
      return {collide, over: overMax};
    }
    */
    /**
     * Cache the pixel rectangles for all nodes used for collision detection during drag operations.
     * This optimization converts grid coordinates to pixel coordinates for faster collision detection.
     *
     * @param w width of a single grid cell in pixels
     * @param h height of a single grid cell in pixels
     * @param top top margin/padding in pixels
     * @param right right margin/padding in pixels
     * @param bottom bottom margin/padding in pixels
     * @param left left margin/padding in pixels
     * @returns the engine instance for chaining
     *
     * @internal This is typically called by GridStack during resize events
     */
    cacheRects(w, h, top, right, bottom, left) {
        this.nodes.forEach(n => n._rect = {
            y: n.y * h + top,
            x: n.x * w + left,
            w: n.w * w - left - right,
            h: n.h * h - top - bottom
        });
        return this;
    }
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
    swap(a, b) {
        if (!b || b.locked || !a || a.locked)
            return false;
        function _doSwap() {
            const x = b.x, y = b.y;
            b.x = a.x;
            b.y = a.y; // b -> a position
            if (a.h != b.h) {
                a.x = x;
                a.y = b.y + b.h; // a -> goes after b
            }
            else if (a.w != b.w) {
                a.x = b.x + b.w;
                a.y = y; // a -> goes after b
            }
            else {
                a.x = x;
                a.y = y; // a -> old b position
            }
            a._dirty = b._dirty = true;
            return true;
        }
        let touching; // remember if we called it (vs undefined)
        // same size and same row or column, and touching
        if (a.w === b.w && a.h === b.h && (a.x === b.x || a.y === b.y) && (touching = Utils.isTouching(a, b)))
            return _doSwap();
        if (touching === false)
            return; // IFF ran test and fail, bail out
        // check for taking same columns (but different height) and touching
        if (a.w === b.w && a.x === b.x && (touching || (touching = Utils.isTouching(a, b)))) {
            if (b.y < a.y) {
                const t = a;
                a = b;
                b = t;
            } // swap a <-> b vars so a is first
            return _doSwap();
        }
        if (touching === false)
            return;
        // check if taking same row (but different width) and touching
        if (a.h === b.h && a.y === b.y && (touching || (touching = Utils.isTouching(a, b)))) {
            if (b.x < a.x) {
                const t = a;
                a = b;
                b = t;
            } // swap a <-> b vars so a is first
            return _doSwap();
        }
        return false;
    }
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
    isAreaEmpty(x, y, w, h) {
        const nn = { x: x || 0, y: y || 0, w: w || 1, h: h || 1 };
        return !this.collide(nn);
    }
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
    compact(layout = 'compact', doSort = true) {
        if (this.nodes.length === 0)
            return this;
        if (doSort)
            this.sortNodes();
        const wasBatch = this.batchMode;
        if (!wasBatch)
            this.batchUpdate();
        const wasColumnResize = this._inColumnResize;
        if (!wasColumnResize)
            this._inColumnResize = true; // faster addNode()
        const copyNodes = this.nodes;
        this.nodes = []; // pretend we have no nodes to conflict layout to start with...
        copyNodes.forEach((n, index, list) => {
            let after;
            if (!n.locked) {
                n.autoPosition = true;
                if (layout === 'list' && index)
                    after = list[index - 1];
            }
            this.addNode(n, false, after); // 'false' for add event trigger
        });
        if (!wasColumnResize)
            delete this._inColumnResize;
        if (!wasBatch)
            this.batchUpdate(false);
        return this;
    }
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
    set float(val) {
        if (this._float === val)
            return;
        this._float = val || false;
        if (!val) {
            this._packNodes()._notify();
        }
    }
    /**
     * Get the current floating mode setting.
     *
     * @returns true if floating is enabled, false otherwise
     *
     * @example
     * const isFloating = engine.float;
     * console.log('Floating enabled:', isFloating);
     */
    get float() { return this._float || false; }
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
    sortNodes(dir = 1) {
        this.nodes = Utils.sort(this.nodes, dir);
        return this;
    }
    /** @internal called to top gravity pack the items back OR revert back to original Y positions when floating */
    _packNodes() {
        if (this.batchMode) {
            return this;
        }
        this.sortNodes(); // first to last
        if (this.float) {
            // restore original Y pos
            this.nodes.forEach(n => {
                if (n._updating || n._orig === undefined || n.y === n._orig.y)
                    return;
                let newY = n.y;
                while (newY > n._orig.y) {
                    --newY;
                    const collide = this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
                    if (!collide) {
                        n._dirty = true;
                        n.y = newY;
                    }
                }
            });
        }
        else {
            // top gravity pack
            this.nodes.forEach((n, i) => {
                if (n.locked)
                    return;
                while (n.y > 0) {
                    const newY = i === 0 ? 0 : n.y - 1;
                    const canBeMoved = i === 0 || !this.collide(n, { x: n.x, y: newY, w: n.w, h: n.h });
                    if (!canBeMoved)
                        break;
                    // Note: must be dirty (from last position) for GridStack::OnChange CB to update positions
                    // and move items back. The user 'change' CB should detect changes from the original
                    // starting position instead.
                    n._dirty = (n.y !== newY);
                    n.y = newY;
                }
            });
        }
        return this;
    }
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
    prepareNode(node, resizing) {
        node._id = node._id ?? GridStackEngine._idSeq++;
        // make sure USER supplied id are unique in our list, else assign a new one as it will create issues during load/update/etc...
        const id = node.id;
        if (id) {
            let count = 1; // append nice _n rather than some random number
            while (this.nodes.find(n => n.id === node.id && n !== node)) {
                node.id = id + '_' + (count++);
            }
        }
        // if we're missing position, have the grid position us automatically (before we set them to 0,0)
        if (node.x === undefined || node.y === undefined || node.x === null || node.y === null) {
            node.autoPosition = true;
        }
        // assign defaults for missing required fields
        const defaults = { x: 0, y: 0, w: 1, h: 1 };
        Utils.defaults(node, defaults);
        if (!node.autoPosition) {
            delete node.autoPosition;
        }
        if (!node.noResize) {
            delete node.noResize;
        }
        if (!node.noMove) {
            delete node.noMove;
        }
        Utils.sanitizeMinMax(node);
        // check for NaN (in case messed up strings were passed. can't do parseInt() || defaults.x above as 0 is valid #)
        if (typeof node.x == 'string') {
            node.x = Number(node.x);
        }
        if (typeof node.y == 'string') {
            node.y = Number(node.y);
        }
        if (typeof node.w == 'string') {
            node.w = Number(node.w);
        }
        if (typeof node.h == 'string') {
            node.h = Number(node.h);
        }
        if (isNaN(node.x)) {
            node.x = defaults.x;
            node.autoPosition = true;
        }
        if (isNaN(node.y)) {
            node.y = defaults.y;
            node.autoPosition = true;
        }
        if (isNaN(node.w)) {
            node.w = defaults.w;
        }
        if (isNaN(node.h)) {
            node.h = defaults.h;
        }
        this.nodeBoundFix(node, resizing);
        return node;
    }
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
    nodeBoundFix(node, resizing) {
        const before = node._orig || Utils.copyPos({}, node);
        if (node.maxW) {
            node.w = Math.min(node.w || 1, node.maxW);
        }
        if (node.maxH) {
            node.h = Math.min(node.h || 1, node.maxH);
        }
        if (node.minW) {
            node.w = Math.max(node.w || 1, node.minW);
        }
        if (node.minH) {
            node.h = Math.max(node.h || 1, node.minH);
        }
        // if user loaded a larger than allowed widget for current # of columns,
        // remember it's position & width so we can restore back (1 -> 12 column) #1655 #1985
        // IFF we're not in the middle of column resizing!
        const saveOrig = (node.x || 0) + (node.w || 1) > this.column;
        if (saveOrig && this.column < this.defaultColumn && !this._inColumnResize && !this.skipCacheUpdate && node._id != null && this.findCacheLayout(node, this.defaultColumn) === -1) {
            const copy = { ...node }; // need _id + positions
            if (copy.autoPosition || copy.x === undefined) {
                delete copy.x;
                delete copy.y;
            }
            else
                copy.x = Math.min(this.defaultColumn - 1, copy.x);
            copy.w = Math.min(this.defaultColumn, copy.w || 1);
            this.cacheOneLayout(copy, this.defaultColumn);
        }
        if (node.w > this.column) {
            node.w = this.column;
        }
        else if (node.w < 1) {
            node.w = 1;
        }
        if (this.maxRow && node.h > this.maxRow) {
            node.h = this.maxRow;
        }
        else if (node.h < 1) {
            node.h = 1;
        }
        if (node.x < 0) {
            node.x = 0;
        }
        if (node.y < 0) {
            node.y = 0;
        }
        if (node.x + node.w > this.column) {
            if (resizing) {
                node.w = this.column - node.x;
            }
            else {
                node.x = this.column - node.w;
            }
        }
        if (this.maxRow && node.y + node.h > this.maxRow) {
            if (resizing) {
                node.h = this.maxRow - node.y;
            }
            else {
                node.y = this.maxRow - node.h;
            }
        }
        if (!Utils.samePos(node, before)) {
            node._dirty = true;
        }
        return this;
    }
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
    getDirtyNodes(verify) {
        // compare original x,y,w,h instead as _dirty can be a temporary state
        if (verify) {
            return this.nodes.filter(n => n._dirty && !Utils.samePos(n, n._orig));
        }
        return this.nodes.filter(n => n._dirty);
    }
    /** @internal call this to call onChange callback with dirty nodes so DOM can be updated */
    _notify(removedNodes) {
        if (this.batchMode || !this.onChange)
            return this;
        const dirtyNodes = (removedNodes || []).concat(this.getDirtyNodes());
        this.onChange(dirtyNodes);
        return this;
    }
    /**
     * Clean all dirty and last tried information from nodes.
     * This resets the dirty state tracking for all nodes.
     *
     * @returns the engine instance for chaining
     *
     * @internal
     */
    cleanNodes() {
        if (this.batchMode)
            return this;
        this.nodes.forEach(n => {
            delete n._dirty;
            delete n._lastTried;
        });
        return this;
    }
    /**
     * Save the initial position/size of all nodes to track real dirty state.
     * This creates a snapshot of current positions that can be restored later.
     *
     * Note: Should be called right after change events and before move/resize operations.
     *
     * @returns the engine instance for chaining
     *
     * @internal
     */
    saveInitial() {
        this.nodes.forEach(n => {
            n._orig = Utils.copyPos({}, n);
            delete n._dirty;
        });
        this._hasLocked = this.nodes.some(n => n.locked);
        return this;
    }
    /**
     * Restore all nodes back to their initial values.
     * This is typically called when canceling an operation (e.g., Esc key during drag).
     *
     * @returns the engine instance for chaining
     *
     * @internal
     */
    restoreInitial() {
        this.nodes.forEach(n => {
            if (!n._orig || Utils.samePos(n, n._orig))
                return;
            Utils.copyPos(n, n._orig);
            n._dirty = true;
        });
        this._notify();
        return this;
    }
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
    findEmptyPosition(node, nodeList = this.nodes, column = this.column, after) {
        const start = after ? after.y * column + (after.x + after.w) : 0;
        let found = false;
        for (let i = start; !found; ++i) {
            const x = i % column;
            const y = Math.floor(i / column);
            if (x + node.w > column) {
                continue;
            }
            const box = { x, y, w: node.w, h: node.h };
            if (!nodeList.find(n => Utils.isIntercepted(box, n))) {
                if (node.x !== x || node.y !== y)
                    node._dirty = true;
                node.x = x;
                node.y = y;
                delete node.autoPosition;
                found = true;
            }
        }
        return found;
    }
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
    addNode(node, triggerAddEvent = false, after) {
        const dup = this.nodes.find(n => n._id === node._id);
        if (dup)
            return dup; // prevent inserting twice! return it instead.
        // skip prepareNode if we're in middle of column resize (not new) but do check for bounds!
        this._inColumnResize ? this.nodeBoundFix(node) : this.prepareNode(node);
        delete node._temporaryRemoved;
        delete node._removeDOM;
        let skipCollision;
        if (node.autoPosition && this.findEmptyPosition(node, this.nodes, this.column, after)) {
            delete node.autoPosition; // found our slot
            skipCollision = true;
        }
        this.nodes.push(node);
        if (triggerAddEvent) {
            this.addedNodes.push(node);
        }
        if (!skipCollision)
            this._fixCollisions(node);
        if (!this.batchMode) {
            this._packNodes()._notify();
        }
        return node;
    }
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
    removeNode(node, removeDOM = true, triggerEvent = false) {
        if (!this.nodes.find(n => n._id === node._id)) {
            // TEST console.log(`Error: GridStackEngine.removeNode() node._id=${node._id} not found!`)
            return this;
        }
        if (triggerEvent) { // we wait until final drop to manually track removed items (rather than during drag)
            this.removedNodes.push(node);
        }
        if (removeDOM)
            node._removeDOM = true; // let CB remove actual HTML (used to set _id to null, but then we loose layout info)
        // don't use 'faster' .splice(findIndex(),1) in case node isn't in our list, or in multiple times.
        this.nodes = this.nodes.filter(n => n._id !== node._id);
        if (!node._isAboutToRemove)
            this._packNodes(); // if dragged out, no need to relayout as already done...
        this._notify([node]);
        return this;
    }
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
    removeAll(removeDOM = true, triggerEvent = true) {
        delete this._layouts;
        if (!this.nodes.length)
            return this;
        removeDOM && this.nodes.forEach(n => n._removeDOM = true); // let CB remove actual HTML (used to set _id to null, but then we loose layout info)
        const removedNodes = this.nodes;
        this.removedNodes = triggerEvent ? removedNodes : [];
        this.nodes = [];
        return this._notify(removedNodes);
    }
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
    moveNodeCheck(node, o) {
        // if (node.locked) return false;
        if (!this.changedPosConstrain(node, o))
            return false;
        o.pack = true;
        // simpler case: move item directly...
        if (!this.maxRow) {
            return this.moveNode(node, o);
        }
        // complex case: create a clone with NO maxRow (will check for out of bounds at the end)
        let clonedNode;
        const clone = new GridStackEngine({
            column: this.column,
            float: this.float,
            nodes: this.nodes.map(n => {
                if (n._id === node._id) {
                    clonedNode = { ...n };
                    return clonedNode;
                }
                return { ...n };
            })
        });
        if (!clonedNode)
            return false;
        // check if we're covering 50% collision and could move, while still being under maxRow or at least not making it worse
        // (case where widget was somehow added past our max #2449)
        const canMove = clone.moveNode(clonedNode, o) && clone.getRow() <= Math.max(this.getRow(), this.maxRow);
        // else check if we can force a swap (float=true, or different shapes) on non-resize
        if (!canMove && !o.resizing && o.collide) {
            const collide = o.collide.el.gridstackNode; // find the source node the clone collided with at 50%
            if (this.swap(node, collide)) { // swaps and mark dirty
                this._notify();
                return true;
            }
        }
        if (!canMove)
            return false;
        // if clone was able to move, copy those mods over to us now instead of caller trying to do this all over!
        // Note: we can't use the list directly as elements and other parts point to actual node, so copy content
        clone.nodes.filter(n => n._dirty).forEach(c => {
            const n = this.nodes.find(a => a._id === c._id);
            if (!n)
                return;
            Utils.copyPos(n, c);
            n._dirty = true;
        });
        this._notify();
        return true;
    }
    /** return true if can fit in grid height constrain only (always true if no maxRow) */
    willItFit(node) {
        delete node._willFitPos;
        if (!this.maxRow)
            return true;
        // create a clone with NO maxRow and check if still within size
        const clone = new GridStackEngine({
            column: this.column,
            float: this.float,
            nodes: this.nodes.map(n => { return { ...n }; })
        });
        const n = { ...node }; // clone node so we don't mod any settings on it but have full autoPosition and min/max as well! #1687
        this.cleanupNode(n);
        delete n.el;
        delete n._id;
        delete n.content;
        delete n.grid;
        clone.addNode(n);
        if (clone.getRow() <= this.maxRow) {
            node._willFitPos = Utils.copyPos({}, n);
            return true;
        }
        return false;
    }
    /** true if x,y or w,h are different after clamping to min/max */
    changedPosConstrain(node, p) {
        // first make sure w,h are set for caller
        p.w = p.w || node.w;
        p.h = p.h || node.h;
        if (node.x !== p.x || node.y !== p.y)
            return true;
        // check constrained w,h
        if (node.maxW) {
            p.w = Math.min(p.w, node.maxW);
        }
        if (node.maxH) {
            p.h = Math.min(p.h, node.maxH);
        }
        if (node.minW) {
            p.w = Math.max(p.w, node.minW);
        }
        if (node.minH) {
            p.h = Math.max(p.h, node.minH);
        }
        return (node.w !== p.w || node.h !== p.h);
    }
    /** return true if the passed in node was actually moved (checks for no-op and locked) */
    moveNode(node, o) {
        if (!node || /*node.locked ||*/ !o)
            return false;
        let wasUndefinedPack;
        if (o.pack === undefined && !this.batchMode) {
            wasUndefinedPack = o.pack = true;
        }
        // constrain the passed in values and check if we're still changing our node
        if (typeof o.x !== 'number') {
            o.x = node.x;
        }
        if (typeof o.y !== 'number') {
            o.y = node.y;
        }
        if (typeof o.w !== 'number') {
            o.w = node.w;
        }
        if (typeof o.h !== 'number') {
            o.h = node.h;
        }
        const resizing = (node.w !== o.w || node.h !== o.h);
        const nn = Utils.copyPos({}, node, true); // get min/max out first, then opt positions next
        Utils.copyPos(nn, o);
        this.nodeBoundFix(nn, resizing);
        Utils.copyPos(o, nn);
        if (!o.forceCollide && Utils.samePos(node, o))
            return false;
        const prevPos = Utils.copyPos({}, node);
        // check if we will need to fix collision at our new location
        const collides = this.collideAll(node, nn, o.skip);
        let needToMove = true;
        if (collides.length) {
            const activeDrag = node._moving && !o.nested;
            // check to make sure we actually collided over 50% surface area while dragging
            let collide = activeDrag ? this.directionCollideCoverage(node, o, collides) : collides[0];
            // if we're enabling creation of sub-grids on the fly, see if we're covering 80% of either one, if we didn't already do that
            if (activeDrag && collide && node.grid?.opts?.subGridDynamic && !node.grid._isTemp) {
                const over = Utils.areaIntercept(o.rect, collide._rect);
                const a1 = Utils.area(o.rect);
                const a2 = Utils.area(collide._rect);
                const perc = over / (a1 < a2 ? a1 : a2);
                if (perc > .8) {
                    collide.grid.makeSubGrid(collide.el, undefined, node);
                    collide = undefined;
                }
            }
            if (collide) {
                needToMove = !this._fixCollisions(node, nn, collide, o); // check if already moved...
            }
            else {
                needToMove = false; // we didn't cover >50% for a move, skip...
                if (wasUndefinedPack)
                    delete o.pack;
            }
        }
        // now move (to the original ask vs the collision version which might differ) and repack things
        if (needToMove && !Utils.samePos(node, nn)) {
            node._dirty = true;
            Utils.copyPos(node, nn);
        }
        if (o.pack) {
            this._packNodes()
                ._notify();
        }
        return !Utils.samePos(node, prevPos); // pack might have moved things back
    }
    getRow() {
        return this.nodes.reduce((row, n) => Math.max(row, n.y + n.h), 0);
    }
    beginUpdate(node) {
        if (!node._updating) {
            node._updating = true;
            delete node._skipDown;
            if (!this.batchMode)
                this.saveInitial();
        }
        return this;
    }
    endUpdate() {
        const n = this.nodes.find(n => n._updating);
        if (n) {
            delete n._updating;
            delete n._skipDown;
        }
        return this;
    }
    /** saves a copy of the largest column layout (eg 12 even when rendering 1 column) so we don't loose orig layout, unless explicity column
     * count to use is given. returning a list of widgets for serialization
     * @param saveElement if true (default), the element will be saved to GridStackWidget.el field, else it will be removed.
     * @param saveCB callback for each node -> widget, so application can insert additional data to be saved into the widget data structure.
     * @param column if provided, the grid will be saved for the given column count (IFF we have matching internal saved layout, or current layout).
     * Note: nested grids will ALWAYS save the container w to match overall layouts (parent + child) to be consistent.
    */
    save(saveElement = true, saveCB, column) {
        // use the highest layout for any saved info so we can have full detail on reload #1849
        // unless we're given a column to match (always set for nested grids)
        const len = this._layouts?.length || 0;
        let layout;
        if (len) {
            if (column) {
                if (column !== this.column)
                    layout = this._layouts[column];
            }
            else if (this.column !== len - 1) {
                layout = this._layouts[len - 1];
            }
        }
        const list = [];
        this.sortNodes();
        this.nodes.forEach(n => {
            const wl = layout?.find(l => l._id === n._id);
            // use layout info fields instead if set
            const w = { ...n, ...(wl || {}) };
            Utils.removeInternalForSave(w, !saveElement);
            if (saveCB)
                saveCB(n, w);
            list.push(w);
        });
        return list;
    }
    /** @internal called whenever a node is added or moved - updates the cached layouts */
    layoutsNodesChange(nodes) {
        if (!this._layouts || this._inColumnResize)
            return this;
        // remove smaller layouts - we will re-generate those on the fly... larger ones need to update
        this._layouts.forEach((layout, column) => {
            if (!layout || column === this.column)
                return this;
            if (column < this.column) {
                this._layouts[column] = undefined;
            }
            else {
                // we save the original x,y,w (h isn't cached) to see what actually changed to propagate better.
                // NOTE: we don't need to check against out of bound scaling/moving as that will be done when using those cache values. #1785
                const ratio = column / this.column;
                nodes.forEach(node => {
                    if (!node._orig)
                        return; // didn't change (newly added ?)
                    const n = layout.find(l => l._id === node._id);
                    if (!n)
                        return; // no cache for new nodes. Will use those values.
                    // Y changed, push down same amount
                    // TODO: detect doing item 'swaps' will help instead of move (especially in 1 column mode)
                    if (n.y >= 0 && node.y !== node._orig.y) {
                        n.y += (node.y - node._orig.y);
                    }
                    // X changed, scale from new position
                    if (node.x !== node._orig.x) {
                        n.x = Math.round(node.x * ratio);
                    }
                    // width changed, scale from new width
                    if (node.w !== node._orig.w) {
                        n.w = Math.round(node.w * ratio);
                    }
                    // ...height always carries over from cache
                });
            }
        });
        return this;
    }
    /**
     * @internal Called to scale the widget width & position up/down based on the column change.
     * Note we store previous layouts (especially original ones) to make it possible to go
     * from say 12 -> 1 -> 12 and get back to where we were.
     *
     * @param prevColumn previous number of columns
     * @param column  new column number
     * @param layout specify the type of re-layout that will happen (position, size, etc...).
     * Note: items will never be outside of the current column boundaries. default (moveScale). Ignored for 1 column
     */
    columnChanged(prevColumn, column, layout = 'moveScale') {
        if (!this.nodes.length || !column || prevColumn === column)
            return this;
        // simpler shortcuts layouts
        const doCompact = layout === 'compact' || layout === 'list';
        if (doCompact) {
            this.sortNodes(1); // sort with original layout once and only once (new column will affect order otherwise)
        }
        // cache the current layout in case they want to go back (like 12 -> 1 -> 12) as it requires original data IFF we're sizing down (see below)
        if (column < prevColumn)
            this.cacheLayout(this.nodes, prevColumn);
        this.batchUpdate(); // do this EARLY as it will call saveInitial() so we can detect where we started for _dirty and collision
        let newNodes = [];
        let nodes = doCompact ? this.nodes : Utils.sort(this.nodes, -1); // current column reverse sorting so we can insert last to front (limit collision)
        // see if we have cached previous layout IFF we are going up in size (restore) otherwise always
        // generate next size down from where we are (looks more natural as you gradually size down).
        if (column > prevColumn && this._layouts) {
            const cacheNodes = this._layouts[column] || [];
            // ...if not, start with the largest layout (if not already there) as down-scaling is more accurate
            // by pretending we came from that larger column by assigning those values as starting point
            const lastIndex = this._layouts.length - 1;
            if (!cacheNodes.length && prevColumn !== lastIndex && this._layouts[lastIndex]?.length) {
                prevColumn = lastIndex;
                this._layouts[lastIndex].forEach(cacheNode => {
                    const n = nodes.find(n => n._id === cacheNode._id);
                    if (n) {
                        // still current, use cache info positions
                        if (!doCompact && !cacheNode.autoPosition) {
                            n.x = cacheNode.x ?? n.x;
                            n.y = cacheNode.y ?? n.y;
                        }
                        n.w = cacheNode.w ?? n.w;
                        if (cacheNode.x == undefined || cacheNode.y === undefined)
                            n.autoPosition = true;
                    }
                });
            }
            // if we found cache re-use those nodes that are still current
            cacheNodes.forEach(cacheNode => {
                const j = nodes.findIndex(n => n._id === cacheNode._id);
                if (j !== -1) {
                    const n = nodes[j];
                    // still current, use cache info positions
                    if (doCompact) {
                        n.w = cacheNode.w; // only w is used, and don't trim the list
                        return;
                    }
                    if (cacheNode.autoPosition || isNaN(cacheNode.x) || isNaN(cacheNode.y)) {
                        this.findEmptyPosition(cacheNode, newNodes);
                    }
                    if (!cacheNode.autoPosition) {
                        n.x = cacheNode.x ?? n.x;
                        n.y = cacheNode.y ?? n.y;
                        n.w = cacheNode.w ?? n.w;
                        newNodes.push(n);
                    }
                    nodes.splice(j, 1);
                }
            });
        }
        // much simpler layout that just compacts
        if (doCompact) {
            this.compact(layout, false);
        }
        else {
            // ...and add any extra non-cached ones
            if (nodes.length) {
                if (typeof layout === 'function') {
                    layout(column, prevColumn, newNodes, nodes);
                }
                else {
                    const ratio = (doCompact || layout === 'none') ? 1 : column / prevColumn;
                    const move = (layout === 'move' || layout === 'moveScale');
                    const scale = (layout === 'scale' || layout === 'moveScale');
                    nodes.forEach(node => {
                        // NOTE: x + w could be outside of the grid, but addNode() below will handle that
                        node.x = (column === 1 ? 0 : (move ? Math.round(node.x * ratio) : Math.min(node.x, column - 1)));
                        node.w = ((column === 1 || prevColumn === 1) ? 1 : scale ? (Math.round(node.w * ratio) || 1) : (Math.min(node.w, column)));
                        newNodes.push(node);
                    });
                    nodes = [];
                }
            }
            // finally re-layout them in reverse order (to get correct placement)
            newNodes = Utils.sort(newNodes, -1);
            this._inColumnResize = true; // prevent cache update
            this.nodes = []; // pretend we have no nodes to start with (add() will use same structures) to simplify layout
            newNodes.forEach(node => {
                this.addNode(node, false); // 'false' for add event trigger
                delete node._orig; // make sure the commit doesn't try to restore things back to original
            });
        }
        this.nodes.forEach(n => delete n._orig); // clear _orig before batch=false so it doesn't handle float=true restore
        this.batchUpdate(false, !doCompact);
        delete this._inColumnResize;
        return this;
    }
    /**
     * call to cache the given layout internally to the given location so we can restore back when column changes size
     * @param nodes list of nodes
     * @param column corresponding column index to save it under
     * @param clear if true, will force other caches to be removed (default false)
     */
    cacheLayout(nodes, column, clear = false) {
        const copy = [];
        nodes.forEach((n, i) => {
            // make sure we have an id in case this is new layout, else re-use id already set
            if (n._id === undefined) {
                const existing = n.id ? this.nodes.find(n2 => n2.id === n.id) : undefined; // find existing node using users id
                n._id = existing?._id ?? GridStackEngine._idSeq++;
            }
            copy[i] = { x: n.x, y: n.y, w: n.w, _id: n._id }; // only thing we change is x,y,w and id to find it back
        });
        this._layouts = clear ? [] : this._layouts || []; // use array to find larger quick
        this._layouts[column] = copy;
        return this;
    }
    /**
     * call to cache the given node layout internally to the given location so we can restore back when column changes size
     * @param node single node to cache
     * @param column corresponding column index to save it under
     */
    cacheOneLayout(n, column) {
        n._id = n._id ?? GridStackEngine._idSeq++;
        const l = { x: n.x, y: n.y, w: n.w, _id: n._id };
        if (n.autoPosition || n.x === undefined) {
            delete l.x;
            delete l.y;
            if (n.autoPosition)
                l.autoPosition = true;
        }
        this._layouts = this._layouts || [];
        this._layouts[column] = this._layouts[column] || [];
        const index = this.findCacheLayout(n, column);
        if (index === -1)
            this._layouts[column].push(l);
        else
            this._layouts[column][index] = l;
        return this;
    }
    findCacheLayout(n, column) {
        return this._layouts?.[column]?.findIndex(l => l._id === n._id) ?? -1;
    }
    removeNodeFromLayoutCache(n) {
        if (!this._layouts) {
            return;
        }
        for (let i = 0; i < this._layouts.length; i++) {
            const index = this.findCacheLayout(n, i);
            if (index !== -1) {
                this._layouts[i].splice(index, 1);
            }
        }
    }
    /** called to remove all internal values but the _id */
    cleanupNode(node) {
        for (const prop in node) {
            if (prop[0] === '_' && prop !== '_id')
                delete node[prop];
        }
        return this;
    }
}
/** @internal unique global internal _id counter */
GridStackEngine._idSeq = 0;
export { GridStackEngine };
//# sourceMappingURL=gridstack-engine.js.map