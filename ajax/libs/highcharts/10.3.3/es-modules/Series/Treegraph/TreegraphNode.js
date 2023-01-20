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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var TreemapNode = SeriesRegistry.seriesTypes.treemap.prototype.NodeClass;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
var TreegraphNode = /** @class */ (function (_super) {
    __extends(TreegraphNode, _super);
    function TreegraphNode() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.mod = 0;
        _this.shift = 0;
        _this.change = 0;
        _this.children = [];
        _this.preX = 0;
        _this.hidden = false;
        _this.wasVisited = false;
        _this.collapsed = false;
        return _this;
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
    TreegraphNode.prototype.nextLeft = function () {
        return this.getLeftMostChild() || this.thread;
    };
    /**
     * Get the next right node which is either last child or thread.
     *
     * @return {TreegraphNode|undefined}
     *         Next right node child or thread.
     */
    TreegraphNode.prototype.nextRight = function () {
        return this.getRightMostChild() || this.thread;
    };
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
    TreegraphNode.prototype.getAncestor = function (leftIntNode, defaultAncestor) {
        var leftAnc = leftIntNode.ancestor;
        if (leftAnc.children[0] === this.children[0]) {
            return leftIntNode.ancestor;
        }
        return defaultAncestor;
    };
    /**
     * Get node's first sibling, which is not hidden.
     *
     * @return {TreegraphNode|undefined}
     *         First sibling of the node which is not hidden or undefined, if it
     *         does not exists.
     */
    TreegraphNode.prototype.getLeftMostSibling = function () {
        var parent = this.getParent();
        if (parent) {
            for (var _i = 0, _a = parent.children; _i < _a.length; _i++) {
                var child = _a[_i];
                if (child && child.point.visible) {
                    return child;
                }
            }
        }
    };
    /**
     * Check if the node is a leaf (if it has any children).
     *
     * @return {boolean}
     *         If the node has no visible children return true.
     */
    TreegraphNode.prototype.hasChildren = function () {
        var children = this.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return true;
            }
        }
        return false;
    };
    /**
     * Get node's left sibling (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Left sibling of the node
     */
    TreegraphNode.prototype.getLeftSibling = function () {
        var parent = this.getParent();
        if (parent) {
            var children = parent.children;
            for (var i = this.relativeXPosition - 1; i >= 0; i--) {
                if (children[i] && children[i].point.visible) {
                    return children[i];
                }
            }
        }
    };
    /**
     * Get the node's first child (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Node's first child which isn't hidden.
     */
    TreegraphNode.prototype.getLeftMostChild = function () {
        var children = this.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    };
    /**
     * Get the node's last child (if it exists).
     *
     * @return {TreegraphNode|undefined}
     *         Node's last child which isn't hidden.
     */
    TreegraphNode.prototype.getRightMostChild = function () {
        var children = this.children;
        for (var i = children.length - 1; i >= 0; i--) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    };
    /**
     * Get the parent of current node or return undefined for root of the
     * tree.
     *
     * @return {TreegraphNode|undefined}
     *         Node's parent or undefined for root.
     */
    TreegraphNode.prototype.getParent = function () {
        return this.parentNode;
    };
    /**
     * Get node's first child which is not hidden.
     *
     * @return {TreegraphNode|undefined}
     *         First child.
     */
    TreegraphNode.prototype.getFirstChild = function () {
        var children = this.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i].point.visible) {
                return children[i];
            }
        }
    };
    return TreegraphNode;
}(TreemapNode));
/* *
 *
 *  Default Export
 *
 * */
export default TreegraphNode;
