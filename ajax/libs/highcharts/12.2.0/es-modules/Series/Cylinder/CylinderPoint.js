/* *
 *
 *  Highcharts cylinder - a 3D series
 *
 *  (c) 2010-2025 Highsoft AS
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
const { column: { prototype: { pointClass: ColumnPoint } } } = SeriesRegistry.seriesTypes;
import U from '../../Core/Utilities.js';
const { extend } = U;
/* *
 *
 *  Class
 *
 * */
class CylinderPoint extends ColumnPoint {
}
extend(CylinderPoint.prototype, {
    shapeType: 'cylinder'
});
/* *
 *
 *  Default Export
 *
 * */
export default CylinderPoint;
