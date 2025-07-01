/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/mouse-wheel-zoom
 * @requires highcharts
 *
 * Non-cartesian series zoom module
 *
 * (c) 2024 Hubert Kozik
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import NonCartesianSeriesZoom from '../../Extensions/NonCartesianSeriesZoom/NonCartesianSeriesZoom.js';
const G = Highcharts;
G.NonCartesianSeriesZoom = G.NonCartesianSeriesZoom || NonCartesianSeriesZoom;
G.NonCartesianSeriesZoom.compose(G.Chart, G.Series, G.Tooltip);
export default Highcharts;
