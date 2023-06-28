/* *
 *
 *  Dependency wheel module
 *
 *  (c) 2018-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { sankey: { prototype: { pointClass: SankeyPoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { wrap } = U;
/* *
 *
 *  Class
 *
 * */
class DependencyWheelPoint extends SankeyPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.angle = void 0;
        this.fromNode = void 0;
        this.index = void 0;
        this.linksFrom = void 0;
        this.linksTo = void 0;
        this.options = void 0;
        this.series = void 0;
        this.shapeArgs = void 0;
        this.toNode = void 0;
        /* eslint-enable valid-jsdoc */
    }
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Return a text path that the data label uses.
     * @private
     */
    getDataLabelPath(label) {
        const renderer = this.series.chart.renderer, shapeArgs = this.shapeArgs, upperHalf = this.angle < 0 || this.angle > Math.PI, start = shapeArgs.start || 0, end = shapeArgs.end || 0;
        // First time
        if (!this.dataLabelPath) {
            // Destroy the path with the label
            wrap(label, 'destroy', (proceed) => {
                if (this.dataLabelPath) {
                    this.dataLabelPath = this.dataLabelPath.destroy();
                }
                return proceed.call(label);
            });
            // Subsequent times
        }
        else {
            this.dataLabelPath = this.dataLabelPath.destroy();
            delete this.dataLabelPath;
        }
        // All times
        this.dataLabelPath = renderer
            .arc({
            open: true,
            longArc: Math.abs(Math.abs(start) - Math.abs(end)) < Math.PI ? 0 : 1
        })
            .attr({
            x: shapeArgs.x,
            y: shapeArgs.y,
            r: (shapeArgs.r +
                (this.dataLabel.options.distance || 0)),
            start: (upperHalf ? start : end),
            end: (upperHalf ? end : start),
            clockwise: +upperHalf
        })
            .add(renderer.defs);
        return this.dataLabelPath;
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
