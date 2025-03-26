/* *
 *
 *  Highcharts funnel3d series module
 *
 *  (c) 2010-2024 Highsoft AS
 *
 *  Author: Kacper Madej
 *
 *  License: www.highcharts.com/license
 *
 *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
 *
 * */
'use strict';
import SeriesRegistry from '../../Core/Series/SeriesRegistry.js';
const { seriesTypes: { column: ColumnSeries } } = SeriesRegistry;
import U from '../../Core/Utilities.js';
const { extend } = U;
/* *
 *
 *  Class
 *
 * */
class Funnel3DPoint extends ColumnSeries.prototype.pointClass {
}
extend(Funnel3DPoint.prototype, {
    shapeType: 'funnel3d'
});
/* *
 *
 *  Default Export
 *
 * */
export default Funnel3DPoint;
