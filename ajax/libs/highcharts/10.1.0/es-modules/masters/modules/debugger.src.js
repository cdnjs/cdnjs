/**
 * @license Highcharts JS v10.1.0 (2022-04-29)
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
