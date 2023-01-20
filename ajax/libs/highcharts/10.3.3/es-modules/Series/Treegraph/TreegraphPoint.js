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
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var TreemapPoint = SeriesRegistry.seriesTypes.treemap.prototype.pointClass;
import U from '../../Core/Utilities.js';
var addEvent = U.addEvent, fireEvent = U.fireEvent, merge = U.merge, pick = U.pick;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
var TreegraphPoint = /** @class */ (function (_super) {
    __extends(TreegraphPoint, _super);
    function TreegraphPoint() {
        /* *
         *
         *  Properties
         *
         * */
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.options = void 0;
        _this.isLink = false;
        _this.series = void 0;
        _this.node = void 0;
        _this.setState = Point.prototype.setState;
        return _this;
    }
    /* *
     *
     *  Functions
     *
     * */
    TreegraphPoint.prototype.draw = function () {
        _super.prototype.draw.apply(this, arguments);
        this.renderCollapseButton();
    };
    TreegraphPoint.prototype.renderCollapseButton = function () {
        var point = this, series = point.series, parentGroup = point.graphic && point.graphic.parentGroup, levelOptions = series.mapOptionsToLevel[point.node.level || 0] || {}, btnOptions = merge(series.options.collapseButton, levelOptions.collapseButton, point.series.options.collapseButton), width = btnOptions.width, height = btnOptions.height, shape = btnOptions.shape, style = btnOptions.style, padding = 2, chart = this.series.chart;
        if (!point.shapeArgs) {
            return;
        }
        this.collapseButtonOptions = btnOptions;
        if (!point.collapseButton) {
            if (!point.node.children.length || !btnOptions.enabled) {
                return;
            }
            var _a = this.getCollapseBtnPosition(btnOptions), x = _a.x, y = _a.y;
            point.collapseButton = chart.renderer
                .label(point.collapsed ? '+' : '-', x, y, shape)
                .attr({
                height: height - 2 * padding,
                width: width - 2 * padding,
                padding: padding,
                fill: "#cccccc" /* Palette.neutralColor20 */,
                rotation: chart.inverted ? 90 : 0,
                rotationOriginX: width / 2,
                rotationOriginY: height / 2,
                stroke: "#333333" /* Palette.neutralColor80 */,
                'stroke-width': 1,
                'text-align': 'center',
                align: 'center',
                zIndex: 1
            })
                .addClass('highcharts-tracker')
                .addClass('highcharts-collapse-button')
                .removeClass('highcharts-no-tooltip')
                .css(style || {})
                .add(parentGroup);
            point.collapseButton.element.point = point;
            if (btnOptions.onlyOnHover && !point.collapsed) {
                point.collapseButton.hide();
            }
        }
        else {
            if (!point.node.children.length || !btnOptions.enabled) {
                point.collapseButton.destroy();
                delete point.collapseButton;
            }
            else {
                var _b = this.getCollapseBtnPosition(btnOptions), x = _b.x, y = _b.y;
                point.collapseButton
                    .attr({
                    text: point.collapsed ? '+' : '-',
                    rotation: chart.inverted ? 90 : 0,
                    rotationOriginX: width / 2,
                    rotationOriginY: height / 2,
                    visibility: point.visible &&
                        (!btnOptions.onlyOnHover ||
                            point.state === 'hover' ||
                            point.collapsed) ?
                        'inherit' :
                        'hidden'
                })
                    .animate({ x: x, y: y });
            }
        }
    };
    TreegraphPoint.prototype.toggleCollapse = function (state) {
        this.collapsed = pick(state, !this.collapsed);
        fireEvent(this.series, 'toggleCollapse');
        this.series.redraw();
    };
    TreegraphPoint.prototype.shouldDraw = function () {
        return _super.prototype.shouldDraw.call(this) && this.visible;
    };
    TreegraphPoint.prototype.destroy = function () {
        if (this.collapseButton) {
            this.collapseButton.destroy();
            delete this.collapseButton;
            this.collapseButton = void 0;
        }
        _super.prototype.destroy.apply(this, arguments);
    };
    TreegraphPoint.prototype.getCollapseBtnPosition = function (btnOptions) {
        var point = this, chart = point.series.chart, inverted = chart.inverted, btnWidth = btnOptions.width, btnHeight = btnOptions.height, _a = point.shapeArgs || {}, _b = _a.x, x = _b === void 0 ? 0 : _b, _c = _a.y, y = _c === void 0 ? 0 : _c, _d = _a.width, width = _d === void 0 ? 0 : _d, _e = _a.height, height = _e === void 0 ? 0 : _e;
        return {
            x: x +
                btnOptions.x +
                (inverted ? -btnHeight * 0.3 : width + btnWidth * -0.3),
            y: y + height / 2 - btnHeight / 2 + btnOptions.y
        };
    };
    return TreegraphPoint;
}(TreemapPoint));
addEvent(TreegraphPoint, 'mouseOut', function () {
    var btn = this.collapseButton, btnOptions = this.collapseButtonOptions;
    if (btn && btnOptions && btnOptions.onlyOnHover && !this.collapsed) {
        btn.hide();
    }
});
addEvent(TreegraphPoint, 'mouseOver', function () {
    if (this.collapseButton) {
        this.collapseButton.show();
    }
});
// Handle showing and hiding of the points
addEvent(TreegraphPoint, 'click', function () {
    this.toggleCollapse();
});
/* *
 *
 *  Export Default
 *
 * */
export default TreegraphPoint;
