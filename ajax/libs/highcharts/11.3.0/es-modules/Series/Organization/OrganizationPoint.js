/* *
 *
 *  Organization chart module
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
const { sankey: { prototype: { pointClass: SankeyPointClass } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { defined, find, pick } = U;
/* *
 *
 *  Functions
 *
 * */
/**
 * Get columns offset including all sibiling and cousins etc.
 * @private
 */
function getOffset(node) {
    let offset = node.linksFrom.length;
    node.linksFrom.forEach((link) => {
        if (link.id === link.toNode.linksTo[0].id) {
            // Node has children, that hangs directly from it:
            offset += getOffset(link.toNode);
        }
        else {
            // If the node hangs from multiple parents, and this is not
            // the last one, ignore it:
            offset--;
        }
    });
    return offset;
}
/* *
 *
 *  Class
 *
 * */
class OrganizationPoint extends SankeyPointClass {
    /* *
     *
     *  Functions
     *
     * */
    constructor(series, options, x) {
        super(series, options, x);
        if (!this.isNode) {
            this.dataLabelOnNull = true;
            this.formatPrefix = 'link';
        }
    }
    /**
     * All nodes in an org chart are equal width.
     * @private
     */
    getSum() {
        return 1;
    }
    /**
     * Set node.column for hanging layout
     * @private
     */
    setNodeColumn() {
        super.setNodeColumn();
        const node = this, fromNode = node.getFromNode().fromNode;
        // Hanging layout
        if (
        // Not defined by user
        !defined(node.options.column) &&
            // Has links to
            node.linksTo.length !== 0 &&
            // And parent uses hanging layout
            fromNode &&
            fromNode.options.layout === 'hanging') {
            let i = -1, link;
            // Default all children of the hanging node
            // to have hanging layout
            node.options.layout = pick(node.options.layout, 'hanging');
            node.hangsFrom = fromNode;
            find(fromNode.linksFrom, (link, index) => {
                const found = link.toNode === node;
                if (found) {
                    i = index;
                }
                return found;
            });
            // For all siblings' children (recursively)
            // increase the column offset to prevent overlapping
            for (let j = 0; j < fromNode.linksFrom.length; ++j) {
                link = fromNode.linksFrom[j];
                if (link.toNode.id === node.id) {
                    // Break
                    j = fromNode.linksFrom.length;
                }
                else {
                    i += getOffset(link.toNode);
                }
            }
            node.column = (node.column || 0) + i;
        }
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default OrganizationPoint;
