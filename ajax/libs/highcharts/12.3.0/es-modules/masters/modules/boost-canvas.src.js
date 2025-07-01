/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/boost-canvas
 * @requires highcharts
 *
 * Boost module
 *
 * (c) 2010-2025 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import BoostCanvas from '../../Extensions/BoostCanvas.js';
const G = Highcharts;
/**
 * Initialize the canvas boost.
 *
 * @function Highcharts.initCanvasBoost
 */
G.initCanvasBoost = function () {
    BoostCanvas.compose(G.Chart, G.Series, G.seriesTypes);
};
export default Highcharts;
