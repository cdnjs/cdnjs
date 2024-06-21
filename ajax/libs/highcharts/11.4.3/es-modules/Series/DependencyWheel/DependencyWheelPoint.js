/* *
 *
 *  Dependency wheel module
 *
 *  (c) 2018-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { sankey: { prototype: { pointClass: SankeyPoint } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { pInt, wrap } = U;
/* *
 *
 *  Class
 *
 * */
class DependencyWheelPoint extends SankeyPoint {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * Return a text path that the data label uses.
     * @private
     */
    getDataLabelPath(label) {
        const point = this, renderer = point.series.chart.renderer, shapeArgs = point.shapeArgs, upperHalf = point.angle < 0 || point.angle > Math.PI, start = shapeArgs.start || 0, end = shapeArgs.end || 0;
        // First time
        if (!point.dataLabelPath) {
            // Destroy the path with the label
            wrap(label, 'destroy', function (proceed) {
                if (point.dataLabelPath) {
                    point.dataLabelPath = point.dataLabelPath.destroy();
                }
                return proceed.call(this);
            });
            // Subsequent times
        }
        else {
            point.dataLabelPath = point.dataLabelPath.destroy();
            delete point.dataLabelPath;
        }
        // All times
        point.dataLabelPath = renderer
            .arc({
            open: true,
            longArc: Math.abs(Math.abs(start) - Math.abs(end)) < Math.PI ? 0 : 1
        })
            .attr({
            x: shapeArgs.x,
            y: shapeArgs.y,
            r: ((shapeArgs.r || 0) + pInt(label.options?.distance || 0)),
            start: (upperHalf ? start : end),
            end: (upperHalf ? end : start),
            clockwise: +upperHalf
        })
            .add(renderer.defs);
        return point.dataLabelPath;
    }
    isValid() {
        // No null points here
        return true;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default DependencyWheelPoint;
