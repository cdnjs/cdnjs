/* *
 *
 *  (c) 2010-2024 Askel Eirik Johansson, Piotr Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { mapline: { prototype: { pointClass: MapLinePoint } } } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { pick, isString, isNumber } = U;
/* *
 *
 *  Class
 *
 * */
class FlowMapPoint extends MapLinePoint {
    /* *
     *
     *  Functions
     *
     * */
    /**
     * @private
     */
    isValid() {
        let valid = !!(this.options.to && this.options.from);
        [this.options.to, this.options.from]
            .forEach(function (toOrFrom) {
            valid = !!(valid && (toOrFrom && (isString(toOrFrom) || ( // point id or has lat/lon coords
            isNumber(pick(toOrFrom[0], toOrFrom.lat)) &&
                isNumber(pick(toOrFrom[1], toOrFrom.lon))))));
        });
        return valid;
    }
}
/* *
 *
 *  Default Export
 *
 * */
export default FlowMapPoint;
