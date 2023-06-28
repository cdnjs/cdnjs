/* *
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  Extension to the Series object in 3D charts.
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Math3D from '../Math3D.js';
const { perspective } = Math3D;
import Series from '../Series/Series.js';
import U from '../Utilities.js';
const { addEvent, extend, merge, pick, isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class Series3D extends Series {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    translate() {
        super.translate.apply(this, arguments);
        if (this.chart.is3d()) {
            this.translate3dPoints();
        }
    }
    /**
     * Translate the plotX, plotY properties and add plotZ.
     * @private
     */
    translate3dPoints() {
        let series = this, seriesOptions = series.options, chart = series.chart, zAxis = pick(series.zAxis, chart.options.zAxis[0]), rawPoints = [], rawPoint, projectedPoints, projectedPoint, zValue, i, rawPointsX = [], stack = seriesOptions.stacking ?
            (isNumber(seriesOptions.stack) ? seriesOptions.stack : 0) :
            series.index || 0;
        series.zPadding = stack *
            (seriesOptions.depth || 0 + (seriesOptions.groupZPadding || 1));
        for (i = 0; i < series.data.length; i++) {
            rawPoint = series.data[i];
            if (zAxis && zAxis.translate) {
                zValue = zAxis.logarithmic && zAxis.val2lin ?
                    zAxis.val2lin(rawPoint.z) :
                    rawPoint.z; // #4562
                rawPoint.plotZ = zAxis.translate(zValue);
                rawPoint.isInside = rawPoint.isInside ?
                    (zValue >= zAxis.min &&
                        zValue <= zAxis.max) :
                    false;
            }
            else {
                rawPoint.plotZ = series.zPadding;
            }
            rawPoint.axisXpos = rawPoint.plotX;
            rawPoint.axisYpos = rawPoint.plotY;
            rawPoint.axisZpos = rawPoint.plotZ;
            rawPoints.push({
                x: rawPoint.plotX,
                y: rawPoint.plotY,
                z: rawPoint.plotZ
            });
            rawPointsX.push(rawPoint.plotX || 0);
        }
        series.rawPointsX = rawPointsX;
        projectedPoints = perspective(rawPoints, chart, true);
        for (i = 0; i < series.data.length; i++) {
            rawPoint = series.data[i];
            projectedPoint = projectedPoints[i];
            rawPoint.plotX = projectedPoint.x;
            rawPoint.plotY = projectedPoint.y;
            rawPoint.plotZ = projectedPoint.z;
        }
    }
}
/* *
 *
 *  Static Properties
 *
 * */
Series3D.defaultOptions = merge(Series.defaultOptions);
/* *
 *
 *  Compatibility
 *
 * */
/* eslint-disable no-invalid-this */
addEvent(Series, 'afterTranslate', function () {
    if (this.chart.is3d()) {
        this.translate3dPoints();
    }
});
/* eslint-enable no-invalid-this */
extend(Series.prototype, {
    translate3dPoints: Series3D.prototype.translate3dPoints
});
/* *
 *
 *  Default Export
 *
 * */
export default Series3D;
