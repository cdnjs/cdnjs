/**
 * @license Highstock JS v10.3.3 (2023-01-20)
 * @module highcharts/modules/stock-tools
 * @requires highcharts
 * @requires highcharts/modules/stock
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import NavigationBindings from '../../Extensions/Annotations/NavigationBindings.js';
import StockTools from '../../Stock/StockTools/StockTools.js';
import StockToolsGui from '../../Stock/StockTools/StockToolsGui.js';
import Toolbar from '../../Stock/StockTools/StockToolbar.js';
var G = Highcharts;
G.Toolbar = Toolbar;
StockTools.compose(NavigationBindings);
StockToolsGui.compose(G.Chart, NavigationBindings);
