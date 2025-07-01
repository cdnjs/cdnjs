/**
 * @license Highstock JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/full-screen
 * @requires highcharts
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2025 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import Fullscreen from '../../Extensions/Exporting/Fullscreen.js';
const G = Highcharts;
G.Fullscreen = G.Fullscreen || Fullscreen;
G.Fullscreen.compose(G.Chart);
export default Highcharts;
