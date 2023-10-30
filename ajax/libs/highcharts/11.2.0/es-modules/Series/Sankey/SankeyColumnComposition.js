/* *
 *
 *  Sankey diagram module
 *
 *  (c) 2010-2021 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import U from '../../Core/Utilities.js';
const { defined, pushUnique, relativeLength } = U;
/* *
 *
 *  Composition
 *
 * */
var SankeyColumnComposition;
(function (SankeyColumnComposition) {
    /* *
     *
     *  Declarations
     *
     * */
    /* *
     *
     *  Functions
     *
     * */
    /**
     * SankeyColumn Composition
     * @private
     * @function Highcharts.SankeyColumn#compose
     *
     * @param {Array<SankeyPoint>} points
     * The array of nodes
     * @param {SankeySeries} series
     * Series connected to column
     * @return {ArrayComposition} SankeyColumnArray
     */
    function compose(points, series) {
        const sankeyColumnArray = points;
        sankeyColumnArray.sankeyColumn =
            new SankeyColumnAdditions(sankeyColumnArray, series);
        return sankeyColumnArray;
    }
    SankeyColumnComposition.compose = compose;
    /* *
     *
     *  Classes
     *
     * */
    class SankeyColumnAdditions {
        /* *
         *
         *  Constructor
         *
         * */
        constructor(points, series) {
            this.points = points;
            this.series = series;
        }
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Calculate translation factor used in column and nodes distribution
         * @private
         * @function Highcharts.SankeyColumn#getTranslationFactor
         *
         * @param {SankeySeries} series
         * The Series
         * @return {number} TranslationFactor
         * Translation Factor
         */
        getTranslationFactor(series) {
            const column = this.points, nodes = column.slice(), chart = series.chart, minLinkWidth = series.options.minLinkWidth || 0;
            let skipPoint, factor = 0, i, remainingHeight = ((chart.plotSizeY || 0) -
                (series.options.borderWidth || 0) -
                (column.length - 1) * series.nodePadding);
            // Because the minLinkWidth option doesn't obey the direct
            // translation, we need to run translation iteratively, check
            // node heights, remove those nodes affected by minLinkWidth,
            // check again, etc.
            while (column.length) {
                factor = remainingHeight / column.sankeyColumn.sum();
                skipPoint = false;
                i = column.length;
                while (i--) {
                    if (column[i].getSum() * factor < minLinkWidth) {
                        column.splice(i, 1);
                        remainingHeight =
                            Math.max(0, remainingHeight - minLinkWidth);
                        skipPoint = true;
                    }
                }
                if (!skipPoint) {
                    break;
                }
            }
            // Re-insert original nodes
            column.length = 0;
            for (const node of nodes) {
                column.push(node);
            }
            return factor;
        }
        /**
         * Get the top position of the column in pixels
         * @private
         * @function Highcharts.SankeyColumn#top
         *
         * @param {number} factor
         * The Translation Factor
         * @return {number} top
         * The top position of the column
         */
        top(factor) {
            const series = this.series, nodePadding = series.nodePadding, height = this.points.reduce((height, node) => {
                if (height > 0) {
                    height += nodePadding;
                }
                const nodeHeight = Math.max(node.getSum() * factor, series.options.minLinkWidth || 0);
                height += nodeHeight;
                return height;
            }, 0);
            // Node alignment option handling #19096
            return {
                top: 0,
                center: 0.5,
                bottom: 1
            }[series.options.nodeAlignment || 'center'] * ((series.chart.plotSizeY || 0) - height);
        }
        /**
         * Get the left position of the column in pixels
         * @private
         * @function Highcharts.SankeyColumn#top
         *
         * @param {number} factor
         * The Translation Factor
         * @return {number} left
         * The left position of the column
         */
        left(factor) {
            const series = this.series, chart = series.chart, equalNodes = series.options.equalNodes, maxNodesLength = (chart.inverted ? chart.plotHeight : chart.plotWidth), nodePadding = series.nodePadding, width = this.points.reduce((width, node) => {
                if (width > 0) {
                    width += nodePadding;
                }
                const nodeWidth = equalNodes ?
                    maxNodesLength / node.series.nodes.length -
                        nodePadding :
                    Math.max(node.getSum() * factor, series.options.minLinkWidth || 0);
                width += nodeWidth;
                return width;
            }, 0);
            return ((chart.plotSizeX || 0) - Math.round(width)) / 2;
        }
        /**
         * Calculate sum of all nodes inside specific column
         * @private
         * @function Highcharts.SankeyColumn#sum
         *
         * @param {ArrayComposition} this
         * Sankey Column Array
         *
         * @return {number} sum
         * Sum of all nodes inside column
         */
        sum() {
            return this.points.reduce((sum, node) => (sum + node.getSum()), 0);
        }
        /**
         * Get the offset in pixels of a node inside the column
         * @private
         * @function Highcharts.SankeyColumn#offset
         *
         * @param {SankeyPoint} node
         * Sankey node
         * @param {number} factor
         * Translation Factor
         * @return {number} offset
         * Offset of a node inside column
         */
        offset(node, factor) {
            const column = this.points, series = this.series, nodePadding = series.nodePadding;
            let offset = 0, totalNodeOffset;
            if (series.is('organization') && node.hangsFrom) {
                return {
                    absoluteTop: node.hangsFrom.nodeY
                };
            }
            for (let i = 0; i < column.length; i++) {
                const sum = column[i].getSum();
                const height = Math.max(sum * factor, series.options.minLinkWidth || 0);
                const directionOffset = node.options[series.chart.inverted ?
                    'offsetHorizontal' :
                    'offsetVertical'], optionOffset = node.options.offset || 0;
                if (sum) {
                    totalNodeOffset = height + nodePadding;
                }
                else {
                    // If node sum equals 0 nodePadding is missed #12453
                    totalNodeOffset = 0;
                }
                if (column[i] === node) {
                    return {
                        relativeTop: offset + (defined(directionOffset) ?
                            // directionOffset is a percent
                            // of the node height
                            relativeLength(directionOffset, height) :
                            relativeLength(optionOffset, totalNodeOffset))
                    };
                }
                offset += totalNodeOffset;
            }
        }
    }
    SankeyColumnComposition.SankeyColumnAdditions = SankeyColumnAdditions;
})(SankeyColumnComposition || (SankeyColumnComposition = {}));
/* *
 *
 *  Default Export
 *
 * */
export default SankeyColumnComposition;
