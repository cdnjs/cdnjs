/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/debugger
 * @requires highcharts
 *
 * Debugger module
 *
 * (c) 2012-2025 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import Debugger from '../../Extensions/Debugger/Debugger.js';
import ErrorMessages from '../../Extensions/Debugger/ErrorMessages.js';
const G = Highcharts;
G.errorMessages = G.errorMessages || ErrorMessages;
Debugger.compose(G.Chart);
export default Highcharts;
