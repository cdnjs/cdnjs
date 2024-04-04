/* *
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { hlc: HLCSeries } } = SeriesRegistry;
/* *
 *
 *  Class
 *
 * */
class OHLCPoint extends HLCSeries.prototype.pointClass {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Extend the parent method by adding up or down to the class name.
     * @private
     * @function Highcharts.seriesTypes.ohlc#getClassName
     */
    getClassName() {
        return super.getClassName.call(this) +
            (this.open < this.close ?
                ' highcharts-point-up' :
                ' highcharts-point-down');
    }
    /**
     * Save upColor as point color (#14826).
     * @private
     * @function Highcharts.seriesTypes.ohlc#resolveUpColor
     */
    resolveUpColor() {
        if (this.open < this.close &&
            !this.options.color &&
            this.series.options.upColor) {
            this.color = this.series.options.upColor;
        }
    }
    /**
     * Extend the parent method by saving upColor.
     * @private
     * @function Highcharts.seriesTypes.ohlc#resolveColor
     */
    resolveColor() {
        super.resolveColor();
        if (!this.series.is('heikinashi')) {
            this.resolveUpColor();
        }
    }
    /**
     * Extend the parent method by saving upColor.
     * @private
     * @function Highcharts.seriesTypes.ohlc#getZone
     *
     * @return {Highcharts.SeriesZonesOptionsObject}
     *         The zone item.
     */
    getZone() {
        const zone = super.getZone();
        this.resolveUpColor();
        return zone;
    }
    /**
     * Extend the parent method by resolving up/down colors (#15849)
     * @private
     **/
    applyOptions() {
        super.applyOptions.apply(this, arguments);
        if (this.resolveColor) {
            this.resolveColor();
        }
        return this;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default OHLCPoint;
