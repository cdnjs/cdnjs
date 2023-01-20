/* *
 *
 *  (c) 2010-2021 Grzegorz Blachliński
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Math3D from '../../Core/Math3D.js';
var perspective = Math3D.perspective;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
var lineProto = SeriesRegistry.seriesTypes.line.prototype;
import U from '../../Core/Utilities.js';
var pick = U.pick, wrap = U.wrap;
/* *
 *
 *  Constants
 *
 * */
var composedClasses = [];
/* *
 *
 *  Functions
 *
 * */
function compose(AreaSeriesClass) {
    if (composedClasses.indexOf(AreaSeriesClass) === -1) {
        composedClasses.push(AreaSeriesClass);
        wrap(AreaSeriesClass.prototype, 'getGraphPath', wrapAreaSeriesGetGraphPath);
    }
}
function wrapAreaSeriesGetGraphPath(proceed) {
    var series = this, svgPath = proceed.apply(series, [].slice.call(arguments, 1));
    // Do not do this if the chart is not 3D
    if (!series.chart.is3d()) {
        return svgPath;
    }
    var getGraphPath = lineProto.getGraphPath, options = series.options, translatedThreshold = Math.round(// #10909
    series.yAxis.getThreshold(options.threshold));
    var bottomPoints = [];
    if (series.rawPointsX) {
        for (var i = 0; i < series.points.length; i++) {
            bottomPoints.push({
                x: series.rawPointsX[i],
                y: options.stacking ?
                    series.points[i].yBottom : translatedThreshold,
                z: series.zPadding
            });
        }
    }
    var options3d = series.chart.options.chart.options3d;
    bottomPoints = perspective(bottomPoints, series.chart, true).map(function (point) { return ({ plotX: point.x, plotY: point.y, plotZ: point.z }); });
    if (series.group && options3d && options3d.depth && options3d.beta) {
        // Markers should take the global zIndex of series group.
        if (series.markerGroup) {
            series.markerGroup.add(series.group);
            series.markerGroup.attr({
                translateX: 0,
                translateY: 0
            });
        }
        series.group.attr({
            zIndex: Math.max(1, (options3d.beta > 270 || options3d.beta < 90) ?
                options3d.depth - Math.round(series.zPadding || 0) :
                Math.round(series.zPadding || 0))
        });
    }
    bottomPoints.reversed = true;
    var bottomPath = getGraphPath.call(series, bottomPoints, true, true);
    if (bottomPath[0] && bottomPath[0][0] === 'M') {
        bottomPath[0] = ['L', bottomPath[0][1], bottomPath[0][2]];
    }
    if (series.areaPath) {
        // Remove previously used bottomPath and add the new one.
        var areaPath = series.areaPath.splice(0, series.areaPath.length / 2).concat(bottomPath);
        // Use old xMap in the new areaPath
        areaPath.xMap = series.areaPath.xMap;
        series.areaPath = areaPath;
    }
    return svgPath;
}
/* *
 *
 *  Default Export
 *
 * */
var Area3DSeries = {
    compose: compose
};
export default Area3DSeries;
