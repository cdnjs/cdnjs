/* *
 *
 *  Arc diagram module
 *
 *  (c) 2018-2021 Torstein Honsi
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
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.fromNode = void 0;
        this.index = void 0;
        this.linksFrom = void 0;
        this.linksTo = void 0;
        this.options = void 0;
        this.series = void 0;
        this.scale = void 0;
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
