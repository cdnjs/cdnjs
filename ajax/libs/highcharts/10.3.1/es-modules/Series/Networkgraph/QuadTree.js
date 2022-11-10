/* *
 *
 *  Networkgraph series
 *
 *  (c) 2010-2021 Paweł Fus
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import QuadTreeNode from './QuadTreeNode.js';
/* *
 *
 *  Class
 *
 * */
/**
 * The QuadTree class. Used in Networkgraph chart as a base for Barnes-Hut
 * approximation.
 *
 * @private
 * @class
 * @name Highcharts.QuadTree
 *
 * @param {number} x
 *        Left position of the plotting area
 * @param {number} y
 *        Top position of the plotting area
 * @param {number} width
 *        Width of the plotting area
 * @param {number} height
 *        Height of the plotting area
 */
var QuadTree = /** @class */ (function () {
    /* *
     *
     *  Constructor
     *
     * */
    function QuadTree(x, y, width, height) {
        // Boundary rectangle:
        this.box = {
            left: x,
            top: y,
            width: width,
            height: height
        };
        this.maxDepth = 25;
        this.root = new QuadTreeNode(this.box);
        this.root.isInternal = true;
        this.root.isRoot = true;
        this.root.divideBox();
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Calculate mass of the each QuadNode in the tree.
     */
    QuadTree.prototype.calculateMassAndCenter = function () {
        this.visitNodeRecursive(null, null, function (node) {
            node.updateMassAndCenter();
        });
    };
    /**
     * Insert nodes into the QuadTree
     *
     * @param {Array<Highcharts.Point>} points
     *        Points as nodes
     */
    QuadTree.prototype.insertNodes = function (points) {
        for (var _i = 0, points_1 = points; _i < points_1.length; _i++) {
            var point = points_1[_i];
            this.root.insert(point, this.maxDepth);
        }
    };
    /**
     * Depfth first treversal (DFS). Using `before` and `after` callbacks,
     * we can get two results: preorder and postorder traversals, reminder:
     *
     * ```
     *     (a)
     *     / \
     *   (b) (c)
     *   / \
     * (d) (e)
     * ```
     *
     * DFS (preorder): `a -> b -> d -> e -> c`
     *
     * DFS (postorder): `d -> e -> b -> c -> a`
     *
     * @param {Highcharts.QuadTreeNode|null} node
     *        QuadTree node
     * @param {Function} [beforeCallback]
     *        Function to be called before visiting children nodes.
     * @param {Function} [afterCallback]
     *        Function to be called after visiting children nodes.
     */
    QuadTree.prototype.visitNodeRecursive = function (node, beforeCallback, afterCallback) {
        var goFurther;
        if (!node) {
            node = this.root;
        }
        if (node === this.root && beforeCallback) {
            goFurther = beforeCallback(node);
        }
        if (goFurther === false) {
            return;
        }
        for (var _i = 0, _a = node.nodes; _i < _a.length; _i++) {
            var qtNode = _a[_i];
            if (qtNode.isInternal) {
                if (beforeCallback) {
                    goFurther = beforeCallback(qtNode);
                }
                if (goFurther === false) {
                    continue;
                }
                this.visitNodeRecursive(qtNode, beforeCallback, afterCallback);
            }
            else if (qtNode.body) {
                if (beforeCallback) {
                    beforeCallback(qtNode.body);
                }
            }
            if (afterCallback) {
                afterCallback(qtNode);
            }
        }
        if (node === this.root && afterCallback) {
            afterCallback(node);
        }
    };
    return QuadTree;
}());
/* *
 *
 *  Default Export
 *
 * */
export default QuadTree;
