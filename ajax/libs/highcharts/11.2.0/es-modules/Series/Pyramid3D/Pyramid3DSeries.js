/* *
 *
 *  Highcharts pyramid3d series module
 *
 *  (c) 2010-2021 Highsoft AS
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import Pyramid3DSeriesDefaults from './Pyramid3DSeriesDefaults.js';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { funnel3d: Funnel3DSeries } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { merge } = U;
/* *
 *
 *  Class
 *
 * */
/**
 * The pyramid3d series type.
 *
 * @class
 * @name Highcharts.seriesTypes.pyramid3d
 * @augments seriesTypes.funnel3d
 * @requires highcharts-3d
 * @requires modules/cylinder
 * @requires modules/funnel3d
 * @requires modules/pyramid3d
 */
class Pyramid3DSeries extends Funnel3DSeries {
    constructor() {
        /* *
         *
         *  Static Properties
         *
         * */
        super(...arguments);
        /* *
         *
         *  Properties
         *
         * */
        this.data = void 0;
        this.options = void 0;
        this.points = void 0;
    }
}
Pyramid3DSeries.defaultOptions = merge(Funnel3DSeries.defaultOptions, Pyramid3DSeriesDefaults);
SeriesRegistry.registerSeriesType('pyramid3d', Pyramid3DSeries);
/* *
 *
 *  Default Export
 *
 * */
export default Pyramid3DSeries;
