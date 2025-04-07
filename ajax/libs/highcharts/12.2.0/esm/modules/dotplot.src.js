/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/dotplot
 * @requires highcharts
 *
 * Dot plot series type for Highcharts
 *
 * (c) 2010-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
import * as __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__ from "../highcharts.src.js";
/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/

;// external ["../highcharts.src.js","default"]
const external_highcharts_src_js_default_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"];
var external_highcharts_src_js_default_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_namespaceObject);
;// ./code/es-modules/Series/DotPlot/DotPlotSeriesDefaults.js
/* *
 *
 *  (c) 2009-2025 Torstein Honsi
 *
 *  Dot plot series type for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */

/* *
 *
 *  API Options
 *
 * */
const DotPlotSeriesDefaults = {
    itemPadding: 0.1,
    marker: {
        symbol: 'circle',
        states: {
            hover: {},
            select: {}
        }
    },
    slotsPerBar: void 0
};
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const DotPlot_DotPlotSeriesDefaults = (DotPlotSeriesDefaults);

;// external ["../highcharts.src.js","default","SeriesRegistry"]
const external_highcharts_src_js_default_SeriesRegistry_namespaceObject = __WEBPACK_EXTERNAL_MODULE__highcharts_src_js_8202131d__["default"].SeriesRegistry;
var external_highcharts_src_js_default_SeriesRegistry_default = /*#__PURE__*/__webpack_require__.n(external_highcharts_src_js_default_SeriesRegistry_namespaceObject);
;// ./code/es-modules/Series/DotPlot/DotPlotSeries.js
/* *
 *
 *  (c) 2009-2025 Torstein Honsi
 *
 *  Dot plot series type for Highcharts
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
/**
 * @private
 * @todo
 * - Check update, remove etc.
 * - Custom icons like persons, carts etc. Either as images, font icons or
 *   Highcharts symbols.
 */



const { column: ColumnSeries } = (external_highcharts_src_js_default_SeriesRegistry_default()).seriesTypes;

const { extend, isNumber, merge, pick } = (external_highcharts_src_js_default_default());
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.dotplot
 *
 * @augments Highcharts.Series
 */
class DotPlotSeries extends ColumnSeries {
    /* *
     *
     *  Functions
     *
     * */
    drawPoints() {
        const series = this, options = series.options, renderer = series.chart.renderer, seriesMarkerOptions = options.marker, total = this.points.reduce((acc, point) => acc + Math.abs(point.y || 0), 0), totalHeight = this.points.reduce((acc, point) => acc + (point.shapeArgs?.height || 0), 0), itemPadding = options.itemPadding || 0, columnWidth = this.points[0]?.shapeArgs?.width || 0;
        let slotsPerBar = options.slotsPerBar, slotWidth = columnWidth;
        // Find the suitable number of slots per column
        if (!isNumber(slotsPerBar)) {
            slotsPerBar = 1;
            while (slotsPerBar < total) {
                if (total / slotsPerBar <
                    (totalHeight / slotWidth) * 1.2) {
                    break;
                }
                slotsPerBar++;
                slotWidth = columnWidth / slotsPerBar;
            }
        }
        const height = (totalHeight * slotsPerBar) / total;
        for (const point of series.points) {
            const pointMarkerOptions = point.marker || {}, symbol = (pointMarkerOptions.symbol ||
                seriesMarkerOptions.symbol), radius = pick(pointMarkerOptions.radius, seriesMarkerOptions.radius), isSquare = symbol !== 'rect', width = isSquare ? height : slotWidth, shapeArgs = point.shapeArgs || {}, startX = (shapeArgs.x || 0) + ((shapeArgs.width || 0) -
                slotsPerBar * width) / 2, positiveYValue = Math.abs(point.y ?? 0), shapeY = (shapeArgs.y || 0), shapeHeight = (shapeArgs.height || 0);
            let graphics, x = startX, y = point.negative ? shapeY : shapeY + shapeHeight - height, slotColumn = 0;
            point.graphics = graphics = point.graphics || [];
            const pointAttr = point.pointAttr ?
                (point.pointAttr[point.selected ? 'selected' : ''] ||
                    series.pointAttr['']) :
                series.pointAttribs(point, point.selected && 'select');
            delete pointAttr.r;
            if (series.chart.styledMode) {
                delete pointAttr.stroke;
                delete pointAttr['stroke-width'];
            }
            if (typeof point.y === 'number') {
                if (!point.graphic) {
                    point.graphic = renderer.g('point').add(series.group);
                }
                for (let val = 0; val < positiveYValue; val++) {
                    const attr = {
                        x: x + width * itemPadding,
                        y: y + height * itemPadding,
                        width: width * (1 - 2 * itemPadding),
                        height: height * (1 - 2 * itemPadding),
                        r: radius
                    };
                    let graphic = graphics[val];
                    if (graphic) {
                        graphic.animate(attr);
                    }
                    else {
                        graphic = renderer
                            .symbol(symbol)
                            .attr(extend(attr, pointAttr))
                            .add(point.graphic);
                    }
                    graphic.isActive = true;
                    graphics[val] = graphic;
                    x += width;
                    slotColumn++;
                    if (slotColumn >= slotsPerBar) {
                        slotColumn = 0;
                        x = startX;
                        y = point.negative ? y + height : y - height;
                    }
                }
            }
            let i = -1;
            for (const graphic of graphics) {
                ++i;
                if (graphic) {
                    if (!graphic.isActive) {
                        graphic.destroy();
                        graphics.splice(i, 1);
                    }
                    else {
                        graphic.isActive = false;
                    }
                }
            }
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
DotPlotSeries.defaultOptions = merge(ColumnSeries.defaultOptions, DotPlot_DotPlotSeriesDefaults);
extend(DotPlotSeries.prototype, {
    markerAttribs: void 0
});
external_highcharts_src_js_default_SeriesRegistry_default().registerSeriesType('dotplot', DotPlotSeries);
/* *
 *
 *  Default Export
 *
 * */
/* harmony default export */ const DotPlot_DotPlotSeries = ((/* unused pure expression or super */ null && (DotPlotSeries)));

;// ./code/es-modules/masters/modules/dotplot.src.js




/* harmony default export */ const dotplot_src = ((external_highcharts_src_js_default_default()));

export { dotplot_src as default };
