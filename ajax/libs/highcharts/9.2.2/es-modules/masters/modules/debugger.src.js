/**
 * @license Highcharts JS v9.2.2 (2021-08-24)
 * @module highcharts/modules/debugger
 * @requires highcharts
 *
 * Debugger module
 *
 * (c) 2012-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import ErrorMessages from '../../Extensions/Debugger/ErrorMessages.js';
Highcharts.errorMessages = ErrorMessages;
import '../../Extensions/Debugger/Debugger.js';
