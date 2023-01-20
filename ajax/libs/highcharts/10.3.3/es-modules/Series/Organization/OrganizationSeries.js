/* *
 *
 *  Organization chart module
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
import OrganizationPoint from './OrganizationPoint.js';
import OrganizationSeriesDefaults from './OrganizationSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
import PathUtilities from '../PathUtilities.js';
var SankeySeries = SeriesRegistry.seriesTypes.sankey;
import U from '../../Core/Utilities.js';
var css = U.css, extend = U.extend, merge = U.merge, pick = U.pick;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.organization
 *
 * @augments Highcharts.seriesTypes.sankey
 */
var OrganizationSeries = /** @class */ (function (_super) {
    __extends(OrganizationSeries, _super);
    function OrganizationSeries() {
        /* *
         *
         *  Static Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* *
         *
         *  Static Functions
         *
         * */
        /* *
         *
         *  Properties
         *
         * */
        _this.data = void 0;
        _this.options = void 0;
        _this.points = void 0;
        return _this;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    OrganizationSeries.prototype.alignDataLabel = function (point, dataLabel, options) {
        // Align the data label to the point graphic
        var shapeArgs = point.shapeArgs;
        if (options.useHTML && shapeArgs) {
            var width_1 = shapeArgs.width || 0, height_1 = shapeArgs.height || 0, padjust = (this.options.borderWidth +
                2 * this.options.dataLabels.padding);
            if (this.chart.inverted) {
                width_1 = height_1;
                height_1 = shapeArgs.width || 0;
            }
            height_1 -= padjust;
            width_1 -= padjust;
            // Set the size of the surrounding div emulating `g`
            var text = dataLabel.text;
            if (text) {
                css(text.element.parentNode, {
                    width: width_1 + 'px',
                    height: height_1 + 'px'
                });
                // Set properties for the span emulating `text`
                css(text.element, {
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                });
            }
            // The getBBox function is used in `alignDataLabel` to align
            // inside the box
            dataLabel.getBBox = function () { return ({ width: width_1, height: height_1, x: 0, y: 0 }); };
            // Overwrite dataLabel dimensions (#13100).
            dataLabel.width = width_1;
            dataLabel.height = height_1;
        }
        _super.prototype.alignDataLabel.apply(this, arguments);
    };
    OrganizationSeries.prototype.createNode = function (id) {
        var node = _super.prototype.createNode.call(this, id);
        // All nodes in an org chart are equal width
        node.getSum = function () { return 1; };
        return node;
    };
    OrganizationSeries.prototype.pointAttribs = function (point, state) {
        var series = this, attribs = SankeySeries.prototype.pointAttribs.call(series, point, state), level = point.isNode ? point.level : point.fromNode.level, levelOptions = series.mapOptionsToLevel[level || 0] || {}, options = point.options, stateOptions = (levelOptions.states &&
            levelOptions.states[state]) ||
            {}, borderRadius = pick(stateOptions.borderRadius, options.borderRadius, levelOptions.borderRadius, series.options.borderRadius), linkColor = pick(stateOptions.linkColor, options.linkColor, levelOptions.linkColor, series.options.linkColor, stateOptions.link && stateOptions.link.color, options.link && options.link.color, levelOptions.link && levelOptions.link.color, series.options.link && series.options.link.color), linkLineWidth = pick(stateOptions.linkLineWidth, options.linkLineWidth, levelOptions.linkLineWidth, series.options.linkLineWidth, stateOptions.link && stateOptions.link.lineWidth, options.link && options.link.lineWidth, levelOptions.link && levelOptions.link.lineWidth, series.options.link && series.options.link.lineWidth), linkOpacity = pick(stateOptions.linkOpacity, options.linkOpacity, levelOptions.linkOpacity, series.options.linkOpacity, stateOptions.link && stateOptions.link.linkOpacity, options.link && options.link.linkOpacity, levelOptions.link && levelOptions.link.linkOpacity, series.options.link && series.options.link.linkOpacity);
        if (!point.isNode) {
            attribs.stroke = linkColor;
            attribs['stroke-width'] = linkLineWidth;
            attribs.opacity = linkOpacity;
            delete attribs.fill;
        }
        else {
            if (borderRadius) {
                attribs.r = borderRadius;
            }
        }
        return attribs;
    };
    OrganizationSeries.prototype.translateLink = function (point) {
        var fromNode = point.fromNode, toNode = point.toNode, linkWidth = pick(this.options.linkLineWidth, this.options.link.lineWidth), crisp = (Math.round(linkWidth) % 2) / 2, factor = pick(this.options.link.offset, 0.5), type = pick(point.options.link && point.options.link.type, this.options.link.type);
        if (fromNode.shapeArgs && toNode.shapeArgs) {
            var x1 = Math.floor((fromNode.shapeArgs.x || 0) +
                (fromNode.shapeArgs.width || 0)) + crisp, y1 = Math.floor((fromNode.shapeArgs.y || 0) +
                (fromNode.shapeArgs.height || 0) / 2) + crisp, x2 = Math.floor(toNode.shapeArgs.x || 0) + crisp, y2 = Math.floor((toNode.shapeArgs.y || 0) +
                (toNode.shapeArgs.height || 0) / 2) + crisp, xMiddle = void 0, hangingIndent = this.options.hangingIndent, toOffset = toNode.options.offset, percentOffset = /%$/.test(toOffset) && parseInt(toOffset, 10), inverted = this.chart.inverted;
            if (inverted) {
                x1 -= (fromNode.shapeArgs.width || 0);
                x2 += (toNode.shapeArgs.width || 0);
            }
            xMiddle = this.colDistance ?
                Math.floor(x2 +
                    ((inverted ? 1 : -1) *
                        (this.colDistance - this.nodeWidth)) /
                        2) + crisp :
                Math.floor((x2 + x1) / 2) + crisp;
            // Put the link on the side of the node when an offset is given. HR
            // node in the main demo.
            if (percentOffset &&
                (percentOffset >= 50 || percentOffset <= -50)) {
                xMiddle = x2 = Math.floor(x2 + (inverted ? -0.5 : 0.5) *
                    (toNode.shapeArgs.width || 0)) + crisp;
                y2 = toNode.shapeArgs.y || 0;
                if (percentOffset > 0) {
                    y2 += toNode.shapeArgs.height || 0;
                }
            }
            if (toNode.hangsFrom === fromNode) {
                if (this.chart.inverted) {
                    y1 = Math.floor((fromNode.shapeArgs.y || 0) +
                        (fromNode.shapeArgs.height || 0) -
                        hangingIndent / 2) + crisp;
                    y2 = ((toNode.shapeArgs.y || 0) +
                        (toNode.shapeArgs.height || 0));
                }
                else {
                    y1 = Math.floor((fromNode.shapeArgs.y || 0) +
                        hangingIndent / 2) + crisp;
                }
                xMiddle = x2 = Math.floor((toNode.shapeArgs.x || 0) +
                    (toNode.shapeArgs.width || 0) / 2) + crisp;
            }
            point.plotX = xMiddle;
            point.plotY = (y1 + y2) / 2;
            point.shapeType = 'path';
            if (type === 'straight') {
                point.shapeArgs = {
                    d: [
                        ['M', x1, y1],
                        ['L', x2, y2]
                    ]
                };
            }
            else if (type === 'curved') {
                var offset = Math.abs(x2 - x1) * factor * (inverted ? -1 : 1);
                point.shapeArgs = {
                    d: [
                        ['M', x1, y1],
                        ['C', x1 + offset, y1, x2 - offset, y2, x2, y2]
                    ]
                };
            }
            else {
                point.shapeArgs = {
                    d: PathUtilities.curvedPath([
                        ['M', x1, y1],
                        ['L', xMiddle, y1],
                        ['L', xMiddle, y2],
                        ['L', x2, y2]
                    ], pick(this.options.linkRadius, this.options.link.radius))
                };
            }
            point.dlBox = {
                x: (x1 + x2) / 2,
                y: (y1 + y2) / 2,
                height: linkWidth,
                width: 0
            };
        }
    };
    OrganizationSeries.prototype.translateNode = function (node, column) {
        SankeySeries.prototype.translateNode.call(this, node, column);
        var parentNode = node.hangsFrom, indent = this.options.hangingIndent || 0, sign = this.chart.inverted ? -1 : 1, shapeArgs = node.shapeArgs, indentLogic = this.options.hangingIndentTranslation, minLength = this.options.minNodeLength || 10;
        if (parentNode) {
            if (indentLogic === 'cumulative') {
                // Move to the right:
                shapeArgs.height -= indent;
                shapeArgs.y -= sign * indent;
                while (parentNode) {
                    shapeArgs.y += sign * indent;
                    parentNode = parentNode.hangsFrom;
                }
            }
            else if (indentLogic === 'shrink') {
                // Resize the node:
                while (parentNode &&
                    shapeArgs.height > indent + minLength) {
                    shapeArgs.height -= indent;
                    parentNode = parentNode.hangsFrom;
                }
            }
            else {
                // indentLogic === "inherit"
                // Do nothing (v9.3.2 and prev versions):
                shapeArgs.height -= indent;
                if (!this.chart.inverted) {
                    shapeArgs.y += indent;
                }
            }
        }
        node.nodeHeight = this.chart.inverted ?
            shapeArgs.width :
            shapeArgs.height;
    };
    OrganizationSeries.defaultOptions = merge(SankeySeries.defaultOptions, OrganizationSeriesDefaults);
    return OrganizationSeries;
}(SankeySeries));
extend(OrganizationSeries.prototype, {
    pointClass: OrganizationPoint
});
SeriesRegistry.registerSeriesType('organization', OrganizationSeries);
/* *
 *
 *  Default Export
 *
 * */
export default OrganizationSeries;
/* *
 *
 *  API Declarations
 *
 * */
/**
 * Layout value for the child nodes in an organization chart. If `hanging`, this
 * node's children will hang below their parent, allowing a tighter packing of
 * nodes in the diagram.
 *
 * @typedef {"normal"|"hanging"} Highcharts.SeriesOrganizationNodesLayoutValue
 */
/**
 * Indent translation value for the child nodes in an organization chart, when
 * parent has `hanging` layout. Option can shrink nodes (for tight charts),
 * translate children to the left, or render nodes directly under the parent.
 *
 * @typedef {"inherit"|"cumulative"|"shrink"} Highcharts.OrganizationHangingIndentTranslationValue
 */
''; // detach doclets above
