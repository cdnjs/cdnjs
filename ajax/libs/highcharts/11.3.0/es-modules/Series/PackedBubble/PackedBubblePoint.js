/* *
 *
 *  (c) 2010-2024 Grzegorz Blachlinski, Sebastian Bochan
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Chart from '../../Core/Chart/Chart.js';
import Point from '../../Core/Series/Point.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { bubble: { prototype: { pointClass: BubblePoint } } } } = SeriesRegistry;
/* *
 *
 *  Class
 *
 * */
class PackedBubblePoint extends BubblePoint {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    /**
     * Destroy point.
     * Then remove point from the layout.
     * @private
     */
    destroy() {
        if (this.series.layout) {
            this.series.layout.removeElementFromCollection(this, this.series.layout.nodes);
        }
        return Point.prototype.destroy.apply(this, arguments);
    }
    firePointEvent() {
        const point = this, series = this.series, seriesOptions = series.options;
        if (this.isParentNode && seriesOptions.parentNode) {
            const temp = seriesOptions.allowPointSelect;
            seriesOptions.allowPointSelect = (seriesOptions.parentNode.allowPointSelect);
            Point.prototype.firePointEvent.apply(this, arguments);
            seriesOptions.allowPointSelect = temp;
        }
        else {
            Point.prototype.firePointEvent.apply(this, arguments);
        }
    }
    select() {
        const point = this, series = this.series, chart = series.chart;
        if (point.isParentNode) {
            chart.getSelectedPoints = chart.getSelectedParentNodes;
            Point.prototype.select.apply(this, arguments);
            chart.getSelectedPoints = Chart.prototype.getSelectedPoints;
        }
        else {
            Point.prototype.select.apply(this, arguments);
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default PackedBubblePoint;
