/* *
 *
 *  Tilemaps module
 *
 *  (c) 2010-2021 Highsoft AS
 *  Author: Øystein Moseng
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import ColorAxisComposition from '../../Core/Axis/Color/ColorAxisComposition.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { series: { prototype: { pointClass: Point } }, seriesTypes: { heatmap: { prototype: { pointClass: HeatmapPoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { extend } = U;
/* *
 *
 *  Class
 *
 * */
class TilemapPoint extends HeatmapPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.options = void 0;
        this.radius = void 0;
        this.series = void 0;
        this.tileEdges = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     * @function Highcharts.Point#haloPath
     */
    haloPath() {
        return this.series.tileShape.haloPath.apply(this, arguments);
    }
}
extend(TilemapPoint.prototype, {
    setState: Point.prototype.setState,
    setVisible: ColorAxisComposition.pointSetVisible
});
/* *
 *
 *  Default Export
 *
 * */
export default TilemapPoint;
