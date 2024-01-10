/* *
 *
 *  (c) 2009-2024 Øystein Moseng
 *
 *  Handle announcing new data for a chart.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import H from '../../../Core/Globals.js';
const { composed } = H;
import U from '../../../Core/Utilities.js';
const { addEvent, defined, pushUnique } = U;
import Announcer from '../../Utils/Announcer.js';
import ChartUtilities from '../../Utils/ChartUtilities.js';
const { getChartTitle } = ChartUtilities;
import EventProvider from '../../Utils/EventProvider.js';
import SeriesDescriber from './SeriesDescriber.js';
const { defaultPointDescriptionFormatter, defaultSeriesDescriptionFormatter } = SeriesDescriber;
/* *
 *
 *  Functions
 *
 * */
/* eslint-disable valid-jsdoc */
/**
 * @private
 */
function chartHasAnnounceEnabled(chart) {
    return !!chart.options.accessibility.announceNewData.enabled;
}
/**
 * @private
 */
function findPointInDataArray(point) {
    const candidates = point.series.data.filter((candidate) => (point.x === candidate.x && point.y === candidate.y));
    return candidates.length === 1 ? candidates[0] : point;
}
/**
 * Get array of unique series from two arrays
 * @private
 */
function getUniqueSeries(arrayA, arrayB) {
    const uniqueSeries = (arrayA || []).concat(arrayB || []).reduce((acc, cur) => {
        acc[cur.name + cur.index] = cur;
        return acc;
    }, {});
    return Object
        .keys(uniqueSeries)
        .map((ix) => uniqueSeries[ix]);
}
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class NewDataAnnouncer {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(chart) {
        this.dirty = {
            allSeries: {}
        };
        this.lastAnnouncementTime = 0;
        this.chart = chart;
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Initialize the new data announcer.
     * @private
     */
    init() {
        const chart = this.chart;
        const announceOptions = (chart.options.accessibility.announceNewData);
        const announceType = announceOptions.interruptUser ?
            'assertive' : 'polite';
        this.lastAnnouncementTime = 0;
        this.dirty = {
            allSeries: {}
        };
        this.eventProvider = new EventProvider();
        this.announcer = new Announcer(chart, announceType);
        this.addEventListeners();
    }
    /**
     * Remove traces of announcer.
     * @private
     */
    destroy() {
        this.eventProvider.removeAddedEvents();
        this.announcer.destroy();
    }
    /**
     * Add event listeners for the announcer
     * @private
     */
    addEventListeners() {
        const announcer = this, chart = this.chart, e = this.eventProvider;
        e.addEvent(chart, 'afterApplyDrilldown', function () {
            announcer.lastAnnouncementTime = 0;
        });
        e.addEvent(chart, 'afterAddSeries', function (e) {
            announcer.onSeriesAdded(e.series);
        });
        e.addEvent(chart, 'redraw', function () {
            announcer.announceDirtyData();
        });
    }
    /**
     * On new data series added, update dirty list.
     * @private
     * @param {Highcharts.Series} series
     */
    onSeriesAdded(series) {
        if (chartHasAnnounceEnabled(this.chart)) {
            this.dirty.hasDirty = true;
            this.dirty.allSeries[series.name + series.index] = series;
            // Add it to newSeries storage unless we already have one
            this.dirty.newSeries = defined(this.dirty.newSeries) ?
                void 0 : series;
        }
    }
    /**
     * Gather what we know and announce the data to user.
     * @private
     */
    announceDirtyData() {
        const chart = this.chart, announcer = this;
        if (chart.options.accessibility.announceNewData &&
            this.dirty.hasDirty) {
            let newPoint = this.dirty.newPoint;
            // If we have a single new point, see if we can find it in the
            // data array. Otherwise we can only pass through options to
            // the description builder, and it is a bit sparse in info.
            if (newPoint) {
                newPoint = findPointInDataArray(newPoint);
            }
            this.queueAnnouncement(Object
                .keys(this.dirty.allSeries)
                .map((ix) => announcer.dirty.allSeries[ix]), this.dirty.newSeries, newPoint);
            // Reset
            this.dirty = {
                allSeries: {}
            };
        }
    }
    /**
     * Announce to user that there is new data.
     * @private
     * @param {Array<Highcharts.Series>} dirtySeries
     *          Array of series with new data.
     * @param {Highcharts.Series} [newSeries]
     *          If a single new series was added, a reference to this series.
     * @param {Highcharts.Point} [newPoint]
     *          If a single point was added, a reference to this point.
     */
    queueAnnouncement(dirtySeries, newSeries, newPoint) {
        const chart = this.chart;
        const annOptions = chart.options.accessibility.announceNewData;
        if (annOptions.enabled) {
            const now = +new Date();
            const dTime = now - this.lastAnnouncementTime;
            const time = Math.max(0, annOptions.minAnnounceInterval - dTime);
            // Add series from previously queued announcement.
            const allSeries = getUniqueSeries(this.queuedAnnouncement && this.queuedAnnouncement.series, dirtySeries);
            // Build message and announce
            const message = this.buildAnnouncementMessage(allSeries, newSeries, newPoint);
            if (message) {
                // Is there already one queued?
                if (this.queuedAnnouncement) {
                    clearTimeout(this.queuedAnnouncementTimer);
                }
                // Build the announcement
                this.queuedAnnouncement = {
                    time: now,
                    message: message,
                    series: allSeries
                };
                // Queue the announcement
                this.queuedAnnouncementTimer = setTimeout(() => {
                    if (this && this.announcer) {
                        this.lastAnnouncementTime = +new Date();
                        this.announcer.announce(this.queuedAnnouncement.message);
                        delete this.queuedAnnouncement;
                        delete this.queuedAnnouncementTimer;
                    }
                }, time);
            }
        }
    }
    /**
     * Get announcement message for new data.
     * @private
     * @param {Array<Highcharts.Series>} dirtySeries
     *          Array of series with new data.
     * @param {Highcharts.Series} [newSeries]
     *          If a single new series was added, a reference to this series.
     * @param {Highcharts.Point} [newPoint]
     *          If a single point was added, a reference to this point.
     *
     * @return {string|null}
     * The announcement message to give to user.
     */
    buildAnnouncementMessage(dirtySeries, newSeries, newPoint) {
        const chart = this.chart, annOptions = chart.options.accessibility.announceNewData;
        // User supplied formatter?
        if (annOptions.announcementFormatter) {
            const formatterRes = annOptions.announcementFormatter(dirtySeries, newSeries, newPoint);
            if (formatterRes !== false) {
                return formatterRes.length ? formatterRes : null;
            }
        }
        // Default formatter - use lang options
        const multiple = H.charts && H.charts.length > 1 ?
            'Multiple' : 'Single', langKey = newSeries ? 'newSeriesAnnounce' + multiple :
            newPoint ? 'newPointAnnounce' + multiple : 'newDataAnnounce', chartTitle = getChartTitle(chart);
        return chart.langFormat('accessibility.announceNewData.' + langKey, {
            chartTitle: chartTitle,
            seriesDesc: newSeries ?
                defaultSeriesDescriptionFormatter(newSeries) :
                null,
            pointDesc: newPoint ?
                defaultPointDescriptionFormatter(newPoint) :
                null,
            point: newPoint,
            series: newSeries
        });
    }
}
/* *
 *
 *  Class Namespace
 *
 * */
(function (NewDataAnnouncer) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Static Functions
     *
     * */
    /**
     * @private
     */
    function compose(SeriesClass) {
        if (pushUnique(composed, compose)) {
            addEvent(SeriesClass, 'addPoint', seriesOnAddPoint);
            addEvent(SeriesClass, 'updatedData', seriesOnUpdatedData);
        }
    }
    NewDataAnnouncer.compose = compose;
    /**
     * On new point added, update dirty list.
     * @private
     * @param {Highcharts.Point} point
     */
    function seriesOnAddPoint(e) {
        const chart = this.chart, newDataAnnouncer = this.newDataAnnouncer;
        if (newDataAnnouncer &&
            newDataAnnouncer.chart === chart &&
            chartHasAnnounceEnabled(chart)) {
            // Add it to newPoint storage unless we already have one
            newDataAnnouncer.dirty.newPoint = (defined(newDataAnnouncer.dirty.newPoint) ?
                void 0 :
                e.point);
        }
    }
    /**
     * On new data in the series, make sure we add it to the dirty list.
     * @private
     * @param {Highcharts.Series} series
     */
    function seriesOnUpdatedData() {
        const chart = this.chart, newDataAnnouncer = this.newDataAnnouncer;
        if (newDataAnnouncer &&
            newDataAnnouncer.chart === chart &&
            chartHasAnnounceEnabled(chart)) {
            newDataAnnouncer.dirty.hasDirty = true;
            newDataAnnouncer.dirty.allSeries[this.name + this.index] = this;
        }
    }
})(NewDataAnnouncer || (NewDataAnnouncer = {}));
/* *
 *
 *  Default Export
 *
 * */
export default NewDataAnnouncer;
