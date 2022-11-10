/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2021 Torstein Honsi
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
import Point from '../../Core/Series/Point.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ColumnSeries = SeriesRegistry.seriesTypes.column;
import U from '../../Core/Utilities.js';
var defined = U.defined;
/* *
 *
 *  Class
 *
 * */
var SankeyPoint = /** @class */ (function (_super) {
    __extends(SankeyPoint, _super);
    function SankeyPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.className = void 0;
        _this.fromNode = void 0;
        _this.level = void 0;
        _this.linkBase = void 0;
        _this.linksFrom = void 0;
        _this.linksTo = void 0;
        _this.mass = void 0;
        _this.nodeX = void 0;
        _this.nodeY = void 0;
        _this.options = void 0;
        _this.series = void 0;
        _this.toNode = void 0;
        return _this;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    SankeyPoint.prototype.applyOptions = function (options, x) {
        Point.prototype.applyOptions.call(this, options, x);
        // Treat point.level as a synonym of point.column
        if (defined(this.options.level)) {
            this.options.column = this.column = this.options.level;
        }
        return this;
    };
    /**
     * @private
     */
    SankeyPoint.prototype.getClassName = function () {
        return (this.isNode ? 'highcharts-node ' : 'highcharts-link ') +
            Point.prototype.getClassName.call(this);
    };
    /**
     * If there are incoming links, place it to the right of the
     * highest order column that links to this one.
     *
     * @private
     */
    SankeyPoint.prototype.getFromNode = function () {
        var node = this;
        var fromColumn = -1, fromNode;
        for (var i = 0; i < node.linksTo.length; i++) {
            var point = node.linksTo[i];
            if (point.fromNode.column > fromColumn &&
                point.fromNode !== node // #16080
            ) {
                fromNode = point.fromNode;
                fromColumn = fromNode.column;
            }
        }
        return { fromNode: fromNode, fromColumn: fromColumn };
    };
    /**
     * Calculate node.column if it's not set by user
     * @private
     */
    SankeyPoint.prototype.setNodeColumn = function () {
        var node = this;
        if (!defined(node.options.column)) {
            // No links to this node, place it left
            if (node.linksTo.length === 0) {
                node.column = 0;
            }
            else {
                node.column = node.getFromNode().fromColumn + 1;
            }
        }
    };
    /**
     * @private
     */
    SankeyPoint.prototype.isValid = function () {
        return this.isNode || typeof this.weight === 'number';
    };
    return SankeyPoint;
}(ColumnSeries.prototype.pointClass));
/* *
 *
 *  Default Export
 *
 * */
export default SankeyPoint;
