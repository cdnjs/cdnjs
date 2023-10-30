/* *
 *
 *  Marker clusters module.
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  Author: Wojciech Chmiel
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import A from '../../Core/Animation/AnimationUtilities.js';
const { animObject } = A;
import D from '../../Core/Defaults.js';
const { defaultOptions } = D;
import MarkerClusterDefaults from './MarkerClusterDefaults.js';
import MarkerClusterScatter from './MarkerClusterScatter.js';
import U from '../../Core/Utilities.js';
const { addEvent, defined, error, isFunction, merge, pushUnique, syncTimeout } = U;
/* *
 *
 *  Constants
 *
 * */
const composedMembers = [];
(defaultOptions.plotOptions || {}).series = merge((defaultOptions.plotOptions || {}).series, MarkerClusterDefaults);
/* *
 *
 *  Functions
 *
 * */
/** @private */
function compose(AxisClass, ChartClass, highchartsDefaultOptions, SeriesClass) {
    const PointClass = SeriesClass.prototype.pointClass;
    if (pushUnique(composedMembers, AxisClass)) {
        addEvent(AxisClass, 'setExtremes', onAxisSetExtremes);
    }
    if (pushUnique(composedMembers, ChartClass)) {
        addEvent(ChartClass, 'render', onChartRender);
    }
    if (pushUnique(composedMembers, PointClass)) {
        addEvent(PointClass, 'drillToCluster', onPointDrillToCluster);
        addEvent(PointClass, 'update', onPointUpdate);
    }
    if (pushUnique(composedMembers, SeriesClass)) {
        addEvent(SeriesClass, 'afterRender', onSeriesAfterRender);
    }
    const { scatter: ScatterSeries } = SeriesClass.types;
    if (ScatterSeries) {
        MarkerClusterScatter.compose(highchartsDefaultOptions, ScatterSeries);
    }
}
/**
 * Destroy the old tooltip after zoom.
 * @private
 */
function onAxisSetExtremes() {
    const chart = this.chart;
    let animationDuration = 0;
    for (const series of chart.series) {
        if (series.markerClusterInfo) {
            animationDuration = (animObject((series.options.cluster || {}).animation).duration ||
                0);
        }
    }
    syncTimeout(() => {
        if (chart.tooltip) {
            chart.tooltip.destroy();
        }
    }, animationDuration);
}
/**
 * Handle animation.
 * @private
 */
function onChartRender() {
    const chart = this;
    for (const series of (chart.series || [])) {
        if (series.markerClusterInfo) {
            const options = series.options.cluster, pointsState = (series.markerClusterInfo || {}).pointsState, oldState = (pointsState || {}).oldState;
            if ((options || {}).animation &&
                series.markerClusterInfo &&
                series.chart.pointer.pinchDown.length === 0 &&
                ((series.xAxis || {}).eventArgs || {}).trigger !== 'pan' &&
                oldState &&
                Object.keys(oldState).length) {
                for (const cluster of series.markerClusterInfo.clusters) {
                    series.animateClusterPoint(cluster);
                }
                for (const noise of series.markerClusterInfo.noise) {
                    series.animateClusterPoint(noise);
                }
            }
        }
    }
}
/** @private */
function onPointDrillToCluster(event) {
    const point = event.point || event.target, series = point.series, clusterOptions = series.options.cluster, onDrillToCluster = ((clusterOptions || {}).events || {}).drillToCluster;
    if (isFunction(onDrillToCluster)) {
        onDrillToCluster.call(this, event);
    }
}
/**
 * Override point prototype to throw a warning when trying to update
 * clustered point.
 * @private
 */
function onPointUpdate() {
    const point = this;
    if (point.dataGroup) {
        error('Highcharts marker-clusters module: ' +
            'Running `Point.update` when point belongs to clustered series' +
            ' is not supported.', false, point.series.chart);
        return false;
    }
}
/**
 * Add classes, change mouse cursor.
 * @private
 */
function onSeriesAfterRender() {
    const series = this, clusterZoomEnabled = (series.options.cluster || {}).drillToCluster;
    if (series.markerClusterInfo && series.markerClusterInfo.clusters) {
        for (const cluster of series.markerClusterInfo.clusters) {
            if (cluster.point && cluster.point.graphic) {
                cluster.point.graphic.addClass('highcharts-cluster-point');
                // Change cursor to pointer when drillToCluster is enabled.
                if (clusterZoomEnabled && cluster.point) {
                    cluster.point.graphic.css({
                        cursor: 'pointer'
                    });
                    if (cluster.point.dataLabel) {
                        cluster.point.dataLabel.css({
                            cursor: 'pointer'
                        });
                    }
                }
                if (defined(cluster.clusterZone)) {
                    cluster.point.graphic.addClass(cluster.clusterZoneClassName ||
                        'highcharts-cluster-zone-' +
                            cluster.clusterZone.zoneIndex);
                }
            }
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
const MarkerClusters = {
    compose
};
export default MarkerClusters;
/* *
 *
 *  API Options
 *
 * */
/**
 * Function callback when a cluster is clicked.
 *
 * @callback Highcharts.MarkerClusterDrillCallbackFunction
 *
 * @param {Highcharts.Point} this
 *        The point where the event occured.
 *
 * @param {Highcharts.PointClickEventObject} event
 *        Event arguments.
 */
''; // keeps doclets above in JS file
