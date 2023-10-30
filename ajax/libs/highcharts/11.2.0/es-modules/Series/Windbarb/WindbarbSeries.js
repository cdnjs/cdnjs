/* *
 *
 *  Wind barb series module
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../../Core/Animation/AnimationUtilities.js';
const { animObject } = A;
import ApproximationRegistry from '../../Extensions/DataGrouping/ApproximationRegistry.js';
import H from '../../Core/Globals.js';
import OnSeriesComposition from '../OnSeriesComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: ColumnSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { extend, merge, pick } = U;
import WindbarbPoint from './WindbarbPoint.js';
import WindbarbSeriesDefaults from './WindbarbSeriesDefaults.js';
/* *
 *
 *  Functions
 *
 * */
/**
 * Once off, register the windbarb approximation for data grouping. This can
 * be called anywhere (not necessarily in the translate function), but must
 * happen after the data grouping module is loaded and before the
 * wind barb series uses it.
 * @private
 */
function registerApproximation() {
    if (!ApproximationRegistry.windbarb) {
        ApproximationRegistry.windbarb = (values, directions) => {
            let vectorX = 0, vectorY = 0;
            for (let i = 0, iEnd = values.length; i < iEnd; i++) {
                vectorX += values[i] * Math.cos(directions[i] * H.deg2rad);
                vectorY += values[i] * Math.sin(directions[i] * H.deg2rad);
            }
            return [
                // Wind speed
                values.reduce((sum, value) => (sum + value), 0) / values.length,
                // Wind direction
                Math.atan2(vectorY, vectorX) / H.deg2rad
            ];
        };
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 * @name Highcharts.seriesTypes.windbarb
 *
 * @augments Highcharts.Series
 */
class WindbarbSeries extends ColumnSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    init(chart, options) {
        super.init(chart, options);
    }
    // Get presentational attributes.
    pointAttribs(point, state) {
        const options = this.options;
        let stroke = point.color || this.color, strokeWidth = this.options.lineWidth;
        if (state) {
            stroke = options.states[state].color || stroke;
            strokeWidth =
                (options.states[state].lineWidth || strokeWidth) +
                    (options.states[state].lineWidthPlus || 0);
        }
        return {
            'stroke': stroke,
            'stroke-width': strokeWidth
        };
    }
    // Create a single wind arrow. It is later rotated around the zero
    // centerpoint.
    windArrow(point) {
        const level = point.beaufortLevel, u = this.options.vectorLength / 20;
        let knots = point.value * 1.943844, barbs, pos = -10;
        if (point.isNull) {
            return [];
        }
        if (level === 0) {
            return this.chart.renderer.symbols.circle(-10 * u, -10 * u, 20 * u, 20 * u);
        }
        // The stem and the arrow head
        const path = [
            ['M', 0, 7 * u],
            ['L', -1.5 * u, 7 * u],
            ['L', 0, 10 * u],
            ['L', 1.5 * u, 7 * u],
            ['L', 0, 7 * u],
            ['L', 0, -10 * u] // top
        ];
        // For each full 50 knots, add a pennant
        barbs = (knots - knots % 50) / 50; // pennants
        if (barbs > 0) {
            while (barbs--) {
                path.push(pos === -10 ? ['L', 0, pos * u] : ['M', 0, pos * u], ['L', 5 * u, pos * u + 2], ['L', 0, pos * u + 4]);
                // Substract from the rest and move position for next
                knots -= 50;
                pos += 7;
            }
        }
        // For each full 10 knots, add a full barb
        barbs = (knots - knots % 10) / 10;
        if (barbs > 0) {
            while (barbs--) {
                path.push(pos === -10 ? ['L', 0, pos * u] : ['M', 0, pos * u], ['L', 7 * u, pos * u]);
                knots -= 10;
                pos += 3;
            }
        }
        // For each full 5 knots, add a half barb
        barbs = (knots - knots % 5) / 5; // half barbs
        if (barbs > 0) {
            while (barbs--) {
                path.push(pos === -10 ? ['L', 0, pos * u] : ['M', 0, pos * u], ['L', 4 * u, pos * u]);
                knots -= 5;
                pos += 3;
            }
        }
        return path;
    }
    drawPoints() {
        const chart = this.chart, yAxis = this.yAxis, inverted = chart.inverted, shapeOffset = this.options.vectorLength / 2;
        for (const point of this.points) {
            const plotX = point.plotX, plotY = point.plotY;
            // Check if it's inside the plot area, but only for the X
            // dimension.
            if (this.options.clip === false ||
                chart.isInsidePlot(plotX, 0)) {
                // Create the graphic the first time
                if (!point.graphic) {
                    point.graphic = this.chart.renderer
                        .path()
                        .add(this.markerGroup)
                        .addClass('highcharts-point ' +
                        'highcharts-color-' +
                        pick(point.colorIndex, point.series.colorIndex));
                }
                // Position the graphic
                point.graphic
                    .attr({
                    d: this.windArrow(point),
                    translateX: plotX + this.options.xOffset,
                    translateY: plotY + this.options.yOffset,
                    rotation: point.direction
                });
                if (!this.chart.styledMode) {
                    point.graphic
                        .attr(this.pointAttribs(point));
                }
            }
            else if (point.graphic) {
                point.graphic = point.graphic.destroy();
            }
            // Set the tooltip anchor position
            point.tooltipPos = [
                plotX + this.options.xOffset +
                    (inverted && !this.onSeries ? shapeOffset : 0),
                plotY + this.options.yOffset -
                    (inverted ?
                        0 :
                        shapeOffset + yAxis.pos - chart.plotTop)
            ]; // #6327
        }
    }
    // Fade in the arrows on initializing series.
    animate(init) {
        if (init) {
            this.markerGroup.attr({
                opacity: 0.01
            });
        }
        else {
            this.markerGroup.animate({
                opacity: 1
            }, animObject(this.options.animation));
        }
    }
    markerAttribs(point, state) {
        return {};
    }
    getExtremes() {
        return {};
    }
    shouldShowTooltip(plotX, plotY, options = {}) {
        options.ignoreX = this.chart.inverted;
        options.ignoreY = !options.ignoreX;
        return super.shouldShowTooltip(plotX, plotY, options);
    }
}
WindbarbSeries.defaultOptions = merge(ColumnSeries.defaultOptions, WindbarbSeriesDefaults);
OnSeriesComposition.compose(WindbarbSeries);
extend(WindbarbSeries.prototype, {
    beaufortFloor: [0, 0.3, 1.6, 3.4, 5.5, 8.0, 10.8, 13.9, 17.2, 20.8,
        24.5, 28.5, 32.7],
    beaufortName: ['Calm', 'Light air', 'Light breeze',
        'Gentle breeze', 'Moderate breeze', 'Fresh breeze',
        'Strong breeze', 'Near gale', 'Gale', 'Strong gale', 'Storm',
        'Violent storm', 'Hurricane'],
    invertible: false,
    parallelArrays: ['x', 'value', 'direction'],
    pointArrayMap: ['value', 'direction'],
    pointClass: WindbarbPoint,
    trackerGroups: ['markerGroup'],
    translate: function () {
        const beaufortFloor = this.beaufortFloor, beaufortName = this.beaufortName;
        OnSeriesComposition.translate.call(this);
        for (const point of this.points) {
            let level = 0;
            // Find the beaufort level (zero based)
            for (; level < beaufortFloor.length; level++) {
                if (beaufortFloor[level] > point.value) {
                    break;
                }
            }
            point.beaufortLevel = level - 1;
            point.beaufort = beaufortName[level - 1];
        }
    }
});
SeriesRegistry.registerSeriesType('windbarb', WindbarbSeries);
registerApproximation();
/* *
 *
 *  Default Export
 *
 * */
export default WindbarbSeries;
