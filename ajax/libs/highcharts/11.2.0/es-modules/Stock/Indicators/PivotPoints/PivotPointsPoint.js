/* *
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../../Core/Series/SeriesRegistry.js';
const SMAPoint = SeriesRegistry.seriesTypes.sma.prototype.pointClass;
/* *
 *
 *  Functions
 *
 * */
/**
 * @private
 */
function destroyExtraLabels(point, functionName) {
    const props = point.series.pointArrayMap;
    let prop, i = props.length;
    SeriesRegistry.seriesTypes.sma.prototype.pointClass.prototype[functionName].call(point);
    while (i--) {
        prop = 'dataLabel' + props[i];
        // S4 dataLabel could be removed by parent method:
        if (point[prop] && point[prop].element) {
            point[prop].destroy();
        }
        point[prop] = null;
    }
}
/* *
 *
 *  Class
 *
 * */
class PivotPointsPoint extends SMAPoint {
    constructor() {
        /* *
         *
         *  Properties
         *
         * */
        super(...arguments);
        this.P = void 0;
        this.pivotLine = void 0;
        this.series = void 0;
    }
    /* *
     *
     *  Functions
     *
     * */
    destroyElements() {
        destroyExtraLabels(this, 'destroyElements');
    }
    // This method is called when removing points, e.g. series.update()
    destroy() {
        destroyExtraLabels(this, 'destroyElements');
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default PivotPointsPoint;
