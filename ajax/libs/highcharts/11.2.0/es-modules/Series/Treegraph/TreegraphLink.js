/* *
 *
 *  (c) 2010-2022 Pawel Lysy Grzegorz Blachlinski
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
    constructor() {
        super(...arguments);
        /* *
        *
        *  Class properties
        *
        * */
        this.isLink = true;
        this.node = {};
        this.formatPrefix = 'link';
        this.dataLabelOnNull = true;
    }
    /* *
     *
     *  Functions
     *
     * */
    init(series, options, x, point) {
        const link = super.init.apply(this, arguments);
        this.formatPrefix = 'link';
        this.dataLabelOnNull = true;
        if (point) {
            link.fromNode = point.node.parentNode.point;
            link.visible = point.visible;
            link.toNode = point;
            this.id = link.toNode.id + '-' + link.fromNode.id;
        }
        return link;
    }
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
