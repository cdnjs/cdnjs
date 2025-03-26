/* *
 *
 *  (c) 2010-2024 Pawel Lysy Grzegorz Blachlinski
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Point from '../../Core/Series/Point.js';
import U from '../../Core/Utilities.js';
const { pick, extend } = U;
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { column: { prototype: { pointClass: ColumnPoint } } } } = SeriesRegistry;
/* *
 *
 *  Class
 *
 * */
/**
 * @private
 * @class
 */
class LinkPoint extends ColumnPoint {
    /* *
     *
     *  Constructor
     *
     * */
    constructor(series, options, x, point) {
        super(series, options, x);
        /* *
         *
         *  Properties
         *
         * */
        this.dataLabelOnNull = true;
        this.formatPrefix = 'link';
        this.isLink = true;
        this.node = {};
        this.formatPrefix = 'link';
        this.dataLabelOnNull = true;
        if (point) {
            this.fromNode = point.node.parentNode.point;
            this.visible = point.visible;
            this.toNode = point;
            this.id = this.toNode.id + '-' + this.fromNode.id;
        }
    }
    /* *
     *
     *  Functions
     *
     * */
    update(options, redraw, animation, runEvent) {
        const oldOptions = {
            id: this.id,
            formatPrefix: this.formatPrefix
        };
        Point.prototype.update.call(this, options, this.isLink ? false : redraw, // Hold the redraw for nodes
        animation, runEvent);
        this.visible = this.toNode.visible;
        extend(this, oldOptions);
        if (pick(redraw, true)) {
            this.series.chart.redraw(animation);
        }
    }
}
/* *
 *
 *  Export Default
 *
 * */
export default LinkPoint;
