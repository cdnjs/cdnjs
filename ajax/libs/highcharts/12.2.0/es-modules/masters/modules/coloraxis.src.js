/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/color-axis
 * @requires highcharts
 *
 * ColorAxis module
 *
 * (c) 2012-2025 Pawel Potaczek
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import ColorAxis from '../../Core/Axis/Color/ColorAxis.js';
const G = Highcharts;
G.ColorAxis = G.ColorAxis || ColorAxis;
G.ColorAxis.compose(G.Chart, G.Fx, G.Legend, G.Series);
export default Highcharts;
