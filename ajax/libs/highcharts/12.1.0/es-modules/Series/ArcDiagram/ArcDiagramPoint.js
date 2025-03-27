/* *
 *
 *  Arc diagram module
 *
 *  (c) 2018-2024 Torstein Honsi
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import NodesComposition from '../NodesComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { sankey: { prototype: { pointClass: SankeyPoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { extend } = U;
/* *
 *
 *  Class
 *
 * */
class ArcDiagramPoint extends SankeyPoint {
    /* *
     *
     *  Functions
     *
     * */
    /* eslint-disable valid-jsdoc */
    isValid() {
        // No null points here
        return true;
    }
}
extend(ArcDiagramPoint.prototype, {
    setState: NodesComposition.setNodeState
});
/* *
 *
 *  Default Export
 *
 * */
export default ArcDiagramPoint;
