/* *
 *
 *  (c) 2010-2022 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { treemap: { prototype: { NodeClass: TreemapNode } } } } = SeriesRegistry;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class TreegraphNode extends TreemapNode {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.mod = 0;
        this.shift = 0;
        this.change = 0;
        this.children = [];
        this.preX = 0;
        this.hidden = false;
        this.wasVisited = false;
        this.collapsed = false;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Get the next left node which is either first child or thread.
     *
     * @return {TreegraphNode|undefined}
     *         Next left node child or thread.
     */
    nextLeft() {
        return this.getLeftMostChild() || this.thread;
    }
    /**
     * Get the next right node which is either last child or thread.
     *
     * @return {TreegraphNode|undefined}
     *         Next right node child or thread.
     */
    nextRight() {
        return this.getRightMostChild() || this.thread;
    }
    /**
     * Return the left one of the greatest uncommon ancestors of a
     * leftInternal node and it's right neighbor.
     *
     * @param {TreegraphNode} leftIntNode
     * @param {TreegraphNode} defaultAncestor
     * @return {TreegraphNode}
     *         Left one of the greatest uncommon ancestors of a leftInternal
     *         node and it's right neighbor.
     *
     */
    getAncestor(leftIntNode, defaultAncestor) {
        const leftAnc = leftIntNode.ancestor;
        if (leftAnc.children[0] === this.children[0]) {
            return leftIntNode.ancestor;
        }
        return defaultAncestor;
    }
    /**
     * Get node's first sibling, which is not hidden.
     *
     * @return {TreegraphNode|undefined}
     *         First sibling of the node which is not hidden or undefined, if it
     *         does not exists.
     */
    getLeftMostSibling() {
        const parent = this.getParent();
        if (parent) {
            for (const child of parent.children) {
                if (child && child.point.visible) {
                    return child;
                }
            }
        }
    }
    /**
     * Check if the node is a leaf (if it has any children).
     *
     * @return {boolean}
     *         If the node has no visible children return true.
     */
    hasChildren() {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return true;
            }
        }
        return false;
    }
    /**
     * Get node's left sibling (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Left sibling of the node
     */
    getLeftSibling() {
        const parent = this.getParent();
        if (parent) {
            const children = parent.children;
            for (let i = this.relativeXPosition - 1; i >= 0; i--) {
                if (children[i] && children[i].point.visible) {
                    return children[i];
                }
            }
        }
    }
    /**
     * Get the node's first child (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Node's first child which isn't hidden.
     */
    getLeftMostChild() {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    }
    /**
     * Get the node's last child (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Node's last child which isn't hidden.
     */
    getRightMostChild() {
        const children = this.children;
        for (let i = children.length - 1; i >= 0; i--) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    }
    /**
     * Get the parent of current node or return undefined for root of the
     * tree.
     *
     * @return {TreegraphNode|undefined}
     *         Node's parent or undefined for root.
     */
    getParent() {
        return this.parentNode;
    }
    /**
     * Get node's first child which is not hidden.
     *
     * @return {TreegraphNode|undefined}
     *         First child.
     */
    getFirstChild() {
        const children = this.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default TreegraphNode;
