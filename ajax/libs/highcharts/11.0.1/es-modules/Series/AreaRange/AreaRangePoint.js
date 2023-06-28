/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { area: { prototype: { pointClass: AreaPoint, pointClass: { prototype: areaProto } } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { defined, isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class AreaRangePoint extends AreaPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        /**
         * Range series only. The high or maximum value for each data point.
         * @name Highcharts.Point#high
         * @type {number|undefined}
         */
        this.high = void 0;
        /**
         * Range series only. The low or minimum value for each data point.
         * @name Highcharts.Point#low
         * @type {number|undefined}
         */
        this.low = void 0;
        this.options = void 0;
        this.plotX = void 0;
        this.series = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    setState() {
        const prevState = this.state, series = this.series, isPolar = series.chart.polar;
        if (!defined(this.plotHigh)) {
            // Boost doesn't calculate plotHigh
            this.plotHigh = series.yAxis.toPixels(this.high, true);
        }
        if (!defined(this.plotLow)) {
            // Boost doesn't calculate plotLow
            this.plotLow = this.plotY = series.yAxis.toPixels(this.low, true);
        }
        if (series.stateMarkerGraphic) {
            series.lowerStateMarkerGraphic = series.stateMarkerGraphic;
            series.stateMarkerGraphic = series.upperStateMarkerGraphic;
        }
        // Change state also for the top marker
        this.graphic = this.graphics && this.graphics[1];
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        // Top state:
        areaProto.setState.apply(this, arguments);
        this.state = prevState;
        // Now restore defaults
        this.plotY = this.plotLow;
        this.graphic = this.graphics && this.graphics[0];
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        if (series.stateMarkerGraphic) {
            series.upperStateMarkerGraphic = series.stateMarkerGraphic;
            series.stateMarkerGraphic = series.lowerStateMarkerGraphic;
            // Lower marker is stored at stateMarkerGraphic
            // to avoid reference duplication (#7021)
            series.lowerStateMarkerGraphic = void 0;
        }
        areaProto.setState.apply(this, arguments);
    }
    haloPath() {
        const isPolar = this.series.chart.polar;
        let path = [];
        // Bottom halo
        this.plotY = this.plotLow;
        if (isPolar && isNumber(this.plotLowX)) {
            this.plotX = this.plotLowX;
        }
        if (this.isInside) {
            path = areaProto.haloPath.apply(this, arguments);
        }
        // Top halo
        this.plotY = this.plotHigh;
        if (isPolar && isNumber(this.plotHighX)) {
            this.plotX = this.plotHighX;
        }
        if (this.isTopInside) {
            path = path.concat(areaProto.haloPath.apply(this, arguments));
        }
        return path;
    }
    isValid() {
        return isNumber(this.low) && isNumber(this.high);
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default AreaRangePoint;
