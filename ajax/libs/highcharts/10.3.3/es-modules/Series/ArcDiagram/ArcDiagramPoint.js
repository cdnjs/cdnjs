/* *
 *
 *  Arc diagram module
 *
 *  (c) 2018-2021 Torstein Honsi
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
import NodesComposition from '../NodesComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var SankeyPoint = SeriesRegistry.seriesTypes.sankey.prototype.pointClass;
import U from '../../Core/Utilities.js';
var extend = U.extend;
/* *
 *
 *  Class
 *
 * */
var ArcDiagramPoint = /** @class */ (function (_super) {
    __extends(ArcDiagramPoint, _super);
    function ArcDiagramPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.fromNode = void 0;
        _this.index = void 0;
        _this.linksFrom = void 0;
        _this.linksTo = void 0;
        _this.options = void 0;
        _this.series = void 0;
        _this.scale = void 0;
        _this.shapeArgs = void 0;
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
    ArcDiagramPoint.prototype.isValid = function () {
        // No null points here
        return true;
    };
    return ArcDiagramPoint;
}(SankeyPoint));
extend(ArcDiagramPoint.prototype, {
    setState: NodesComposition.setNodeState
});
/* *
 *
 *  Default Export
 *
 * */
export default ArcDiagramPoint;
