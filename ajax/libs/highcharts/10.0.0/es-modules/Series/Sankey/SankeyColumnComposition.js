import U from '../../Core/Utilities.js';
var defined = U.defined, relativeLength = U.relativeLength;
var SankeyColumnComposition;
(function (SankeyColumnComposition) {
    /* *
     *
     *  Declarations
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
        var sankeyColumnArray = points;
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
    var SankeyColumnAdditions = /** @class */ (function () {
        function SankeyColumnAdditions(points, series) {
            this.points = points;
            this.series = series;
        }
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
        SankeyColumnAdditions.prototype.getTranslationFactor = function (series) {
            var column = this.points, nodes = column.slice(), chart = series.chart, minLinkWidth = series.options.minLinkWidth || 0;
            var skipPoint, factor = 0, i, remainingHeight = ((chart.plotSizeY || 0) -
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
                        remainingHeight -= minLinkWidth;
                        skipPoint = true;
                    }
                }
                if (!skipPoint) {
                    break;
                }
            }
            // Re-insert original nodes
            column.length = 0;
            nodes.forEach(function (node) {
                column.push(node);
            });
            return factor;
        };
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
        SankeyColumnAdditions.prototype.top = function (factor) {
            var series = this.series;
            var nodePadding = series.nodePadding;
            var height = this.points.reduce(function (height, node) {
                if (height > 0) {
                    height += nodePadding;
                }
                var nodeHeight = Math.max(node.getSum() * factor, series.options.minLinkWidth || 0);
                height += nodeHeight;
                return height;
            }, 0);
            return ((series.chart.plotSizeY || 0) - height) / 2;
        };
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
        SankeyColumnAdditions.prototype.left = function (factor) {
            var series = this.series, chart = series.chart, equalNodes = series.options.equalNodes;
            var maxNodesLength = chart.inverted ?
                chart.plotHeight : chart.plotWidth, nodePadding = series.nodePadding;
            var width = this.points.reduce(function (width, node) {
                if (width > 0) {
                    width += nodePadding;
                }
                var nodeWidth = equalNodes ?
                    maxNodesLength / node.series.nodes.length - nodePadding :
                    Math.max(node.getSum() * factor, series.options.minLinkWidth || 0);
                width += nodeWidth;
                return width;
            }, 0);
            return ((chart.plotSizeX || 0) - Math.round(width)) / 2;
        };
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
        SankeyColumnAdditions.prototype.sum = function () {
            return this.points.reduce(function (sum, node) {
                return sum + node.getSum();
            }, 0);
        };
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
        SankeyColumnAdditions.prototype.offset = function (node, factor) {
            var column = this.points, series = this.series, nodePadding = series.nodePadding;
            var offset = 0, totalNodeOffset;
            if (series.is('organization') && node.hangsFrom) {
                return {
                    absoluteTop: node.hangsFrom.nodeY
                };
            }
            for (var i = 0; i < column.length; i++) {
                var sum = column[i].getSum();
                var height = Math.max(sum * factor, series.options.minLinkWidth || 0);
                var directionOffset = node.options[series.chart.inverted ?
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
        };
        return SankeyColumnAdditions;
    }());
    SankeyColumnComposition.SankeyColumnAdditions = SankeyColumnAdditions;
})(SankeyColumnComposition || (SankeyColumnComposition = {}));
export default SankeyColumnComposition;
