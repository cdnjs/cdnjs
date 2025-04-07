/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/textpath-support
 * @requires highcharts
 *
 * (c) 2009-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import TextPath from '../../Extensions/TextPath.js';
const G = Highcharts;
G.TextPath = TextPath;
G.TextPath.compose(G.SVGElement);
export default Highcharts;
