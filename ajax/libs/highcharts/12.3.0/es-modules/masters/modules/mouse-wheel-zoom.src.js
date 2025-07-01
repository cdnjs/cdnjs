/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/mouse-wheel-zoom
 * @requires highcharts
 *
 * Mousewheel zoom module
 *
 * (c) 2023 Askel Eirik Johansson
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import MouseWheelZoom from '../../Extensions/MouseWheelZoom/MouseWheelZoom.js';
const G = Highcharts;
G.MouseWheelZoom = G.MouseWheelZoom || MouseWheelZoom;
G.MouseWheelZoom.compose(G.Chart);
export default Highcharts;
