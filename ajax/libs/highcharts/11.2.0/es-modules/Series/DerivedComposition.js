/* *
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../Core/Globals.js';
const { noop } = H;
import Series from '../Core/Series/Series.js';
import U from '../Core/Utilities.js';
const { addEvent, defined } = U;
/* *
 *
 *  Composition
 *
 * */
/**
 * Provides methods for auto setting/updating series data based on the based
 * series data.
 * @private
 */
var DerivedComposition;
(function (DerivedComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Constants
     *
     * */
    const composedMembers = [];
    DerivedComposition.hasDerivedData = true;
    /**
     * Method to be implemented - inside the method the series has already
     * access to the base series via m `this.baseSeries` and the bases data is
     * initialised. It should return data in the format accepted by
     * `Series.setData()` method
     * @private
     */
    DerivedComposition.setDerivedData = noop;
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * @private
     */
    function compose(SeriesClass) {
        if (U.pushUnique(composedMembers, SeriesClass)) {
            const seriesProto = SeriesClass.prototype;
            seriesProto.addBaseSeriesEvents = addBaseSeriesEvents;
            seriesProto.addEvents = addEvents;
            seriesProto.destroy = destroy;
            seriesProto.init = init;
            seriesProto.setBaseSeries = setBaseSeries;
        }
        return SeriesClass;
    }
    DerivedComposition.compose = compose;
    /**
     * Initialise series
     * @private
     */
    function init() {
        Series.prototype.init.apply(this, arguments);
        this.initialised = false;
        this.baseSeries = null;
        this.eventRemovers = [];
        this.addEvents();
    }
    DerivedComposition.init = init;
    /**
     * Sets base series for the series
     * @private
     */
    function setBaseSeries() {
        const chart = this.chart, baseSeriesOptions = this.options.baseSeries, baseSeries = (defined(baseSeriesOptions) &&
            (chart.series[baseSeriesOptions] ||
                chart.get(baseSeriesOptions)));
        this.baseSeries = baseSeries || null;
    }
    DerivedComposition.setBaseSeries = setBaseSeries;
    /**
     * Adds events for the series
     * @private
     */
    function addEvents() {
        this.eventRemovers.push(addEvent(this.chart, 'afterLinkSeries', () => {
            this.setBaseSeries();
            if (this.baseSeries && !this.initialised) {
                this.setDerivedData();
                this.addBaseSeriesEvents();
                this.initialised = true;
            }
        }));
    }
    DerivedComposition.addEvents = addEvents;
    /**
     * Adds events to the base series - it required for recalculating the data
     * in the series if the base series is updated / removed / etc.
     * @private
     */
    function addBaseSeriesEvents() {
        this.eventRemovers.push(addEvent(this.baseSeries, 'updatedData', () => {
            this.setDerivedData();
        }), addEvent(this.baseSeries, 'destroy', () => {
            this.baseSeries = null;
            this.initialised = false;
        }));
    }
    DerivedComposition.addBaseSeriesEvents = addBaseSeriesEvents;
    /**
     * Destroys the series
     * @private
     */
    function destroy() {
        this.eventRemovers.forEach((remover) => {
            remover();
        });
        Series.prototype.destroy.apply(this, arguments);
    }
    DerivedComposition.destroy = destroy;
})(DerivedComposition || (DerivedComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default DerivedComposition;
