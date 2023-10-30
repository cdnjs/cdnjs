/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 * @module highcharts/modules/no-data-to-display
 * @requires highcharts
 *
 * Plugin for displaying a message when there is no data visible in chart.
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import NoDataToDisplay from '../../Extensions/NoDataToDisplay/NoDataToDisplay.js';
const G = Highcharts;
NoDataToDisplay.compose(G.Chart, G.defaultOptions);
