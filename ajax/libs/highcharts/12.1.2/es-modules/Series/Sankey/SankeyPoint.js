/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Point from '../../Core/Series/Point.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { column: ColumnSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { defined } = U;
/* *
 *
 *  Class
 *
 * */
class SankeyPoint extends ColumnSeries.prototype.pointClass {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    applyOptions(options, x) {
        Point.prototype.applyOptions.call(this, options, x);
        // Treat point.level as a synonym of point.column
        if (defined(this.options.level)) {
            this.options.column = this.column = this.options.level;
        }
        return this;
    }
    /**
     * @private
     */
    getClassName() {
        return (this.isNode ? 'highcharts-node ' : 'highcharts-link ') +
            Point.prototype.getClassName.call(this);
    }
    /**
     * If there are incoming links, place it to the right of the
     * highest order column that links to this one.
     *
     * @private
     */
    getFromNode() {
        const node = this;
        let fromColumn = -1, fromNode;
        for (let i = 0; i < node.linksTo.length; i++) {
            const point = node.linksTo[i];
            if (point.fromNode.column > fromColumn &&
                point.fromNode !== node // #16080
            ) {
                fromNode = point.fromNode;
                fromColumn = fromNode.column;
            }
        }
        return { fromNode, fromColumn };
    }
    /**
     * Calculate node.column if it's not set by user
     * @private
     */
    setNodeColumn() {
        const node = this;
        if (!defined(node.options.column)) {
            // No links to this node, place it left
            if (node.linksTo.length === 0) {
                node.column = 0;
            }
            else {
                node.column = node.getFromNode().fromColumn + 1;
            }
        }
    }
    /**
     * @private
     */
    isValid() {
        return this.isNode || typeof this.weight === 'number';
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default SankeyPoint;
