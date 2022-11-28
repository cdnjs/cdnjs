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
import Point from '../../Core/Series/Point.js';
import U from '../../Core/Utilities.js';
var pick = U.pick, extend = U.extend;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var ColumnPoint = SeriesRegistry.seriesTypes.column.prototype.pointClass;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
var LinkPoint = /** @class */ (function (_super) {
    __extends(LinkPoint, _super);
    function LinkPoint() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* *
        *
        *  Class properties
        *
        * */
        _this.isLink = true;
        _this.node = {};
        _this.formatPrefix = 'link';
        _this.dataLabelOnNull = true;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    LinkPoint.prototype.init = function (series, options, x, point) {
        var link = _super.prototype.init.apply(this, arguments);
        this.formatPrefix = 'link';
        this.dataLabelOnNull = true;
        if (point) {
            link.fromNode = point.node.parentNode.point;
            link.visible = point.visible;
            link.toNode = point;
            this.id = link.toNode.id + '-' + link.fromNode.id;
        }
        return link;
    };
    LinkPoint.prototype.update = function (options, redraw, animation, runEvent) {
        var oldOptions = {
            id: this.id,
            formatPrefix: this.formatPrefix
        };
        Point.prototype.update.call(this, options, this.isLink ? false : redraw, // Hold the redraw for nodes
        animation, runEvent);
        this.visible = this.toNode.visible;
        extend(this, oldOptions);
        if (pick(redraw, true)) {
            this.series.chart.redraw(animation);
        }
    };
    return LinkPoint;
}(ColumnPoint));
/* *
 *
 *  Export Default
 *
 * */
export default LinkPoint;
