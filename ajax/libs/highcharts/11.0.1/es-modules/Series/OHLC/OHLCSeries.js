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
import OHLCPoint from './OHLCPoint.js';
import OHLCSeriesDefaults from './OHLCSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { hlc: HLCSeries } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { addEvent, extend, merge } = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function onSeriesAfterSetOptions(e) {
    const options = e.options, dataGrouping = options.dataGrouping;
    if (dataGrouping &&
        options.useOhlcData &&
        options.id !== 'highcharts-navigator-series') {
        dataGrouping.approximation = 'ohlc';
    }
}
/**
 * Add useOhlcData option
 * @private
 */
function onSeriesInit(eventOptions) {
    // eslint-disable-next-line no-invalid-this
    const series = this, options = eventOptions.options;
    if (options.useOhlcData &&
        options.id !== 'highcharts-navigator-series') {
        extend(series, {
            pointValKey: OHLCSeries.prototype.pointValKey,
            // keys: ohlcProto.keys, // @todo potentially nonsense
            pointArrayMap: OHLCSeries.prototype.pointArrayMap,
            toYData: OHLCSeries.prototype.toYData
        });
    }
}
/* *
 *
 *  Class
 *
 * */
/**
 * The ohlc series type.
 *
 * @private
 * @class
 * @name Highcharts.seriesTypes.ohlc
 *
 * @augments Highcharts.Series
 */
class OHLCSeries extends HLCSeries {
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
     *  Static Functions
     *
     * */
    static compose(SeriesClass, ..._args) {
        if (U.pushUnique(composedMembers, SeriesClass)) {
            addEvent(SeriesClass, 'afterSetOptions', onSeriesAfterSetOptions);
            addEvent(SeriesClass, 'init', onSeriesInit);
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    getPointPath(point, graphic) {
        const path = super.getPointPath(point, graphic), strokeWidth = graphic.strokeWidth(), crispCorr = (strokeWidth % 2) / 2, crispX = Math.round(point.plotX) - crispCorr, halfWidth = Math.round(point.shapeArgs.width / 2);
        let plotOpen = point.plotOpen;
        // crisp vector coordinates
        if (point.open !== null) {
            plotOpen = Math.round(point.plotOpen) + crispCorr;
            path.push(['M', crispX, plotOpen], ['L', crispX - halfWidth, plotOpen]);
            super.extendStem(path, strokeWidth / 2, plotOpen);
        }
        return path;
    }
    /**
     * Postprocess mapping between options and SVG attributes
     * @private
     */
    pointAttribs(point, state) {
        const attribs = super.pointAttribs.call(this, point, state), options = this.options;
        delete attribs.fill;
        if (!point.options.color &&
            options.upColor &&
            point.open < point.close) {
            attribs.stroke = options.upColor;
        }
        return attribs;
    }
    toYData(point) {
        // return a plain array for speedy calculation
        return [point.open, point.high, point.low, point.close];
    }
}
OHLCSeries.defaultOptions = merge(HLCSeries.defaultOptions, OHLCSeriesDefaults);
extend(OHLCSeries.prototype, {
    pointClass: OHLCPoint,
    pointArrayMap: ['open', 'high', 'low', 'close']
});
SeriesRegistry.registerSeriesType('ohlc', OHLCSeries);
/* *
 *
 *  Default Export
 *
 * */
export default OHLCSeries;
