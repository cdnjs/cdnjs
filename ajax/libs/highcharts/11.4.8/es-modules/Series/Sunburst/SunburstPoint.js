/* *
 *
 *  This module implements sunburst charts in Highcharts.
 *
 *  (c) 2016-2024 Highsoft AS
 *
 *  Authors: Jon Arild Nygard
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: { prototype: { pointClass: Point } }, seriesTypes: { treemap: { prototype: { pointClass: TreemapPoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { correctFloat, extend, pInt } = U;
/* *
 *
 *  Class
 *
 * */
class SunburstPoint extends TreemapPoint {
    /* *
     *
     *  Functions
     *
     * */
    getDataLabelPath(label) {
        const renderer = this.series.chart.renderer, shapeArgs = this.shapeExisting, r = shapeArgs.r + pInt(label.options?.distance || 0);
        let start = shapeArgs.start, end = shapeArgs.end;
        const angle = start + (end - start) / 2; // Arc middle value
        let upperHalf = angle < 0 &&
            angle > -Math.PI ||
            angle > Math.PI, moreThanHalf;
        // Check if point is a full circle
        if (start === -Math.PI / 2 &&
            correctFloat(end) === correctFloat(Math.PI * 1.5)) {
            start = -Math.PI + Math.PI / 360;
            end = -Math.PI / 360;
            upperHalf = true;
        }
        // Check if dataLabels should be render in the upper half of the circle
        if (end - start > Math.PI) {
            upperHalf = false;
            moreThanHalf = true;
            // Close to the full circle, add some padding so that the SVG
            // renderer treats it as separate points (#18884).
            if ((end - start) > 2 * Math.PI - 0.01) {
                start += 0.01;
                end -= 0.01;
            }
        }
        if (this.dataLabelPath) {
            this.dataLabelPath = this.dataLabelPath.destroy();
        }
        // All times
        this.dataLabelPath = renderer
            .arc({
            open: true,
            longArc: moreThanHalf ? 1 : 0
        })
            .attr({
            start: (upperHalf ? start : end),
            end: (upperHalf ? end : start),
            clockwise: +upperHalf,
            x: shapeArgs.x,
            y: shapeArgs.y,
            r: (r + shapeArgs.innerR) / 2
        })
            .add(renderer.defs);
        return this.dataLabelPath;
    }
    isValid() {
        return true;
    }
}
extend(SunburstPoint.prototype, {
    getClassName: Point.prototype.getClassName,
    haloPath: Point.prototype.haloPath,
    setState: Point.prototype.setState
});
/* *
 *
 *  Default Export
 *
 * */
export default SunburstPoint;
