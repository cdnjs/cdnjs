/**
 * @license Highcharts JS v10.2.1 (2022-08-29)
 * @module highcharts/modules/boost
 * @requires highcharts
 *
 * Boost module
 *
 * (c) 2010-2021 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 *
 * */
'use strict';
import Highcharts from '../../Core/Globals.js';
import Boost from '../../Extensions/Boost/Boost.js';
var G = Highcharts;
G.hasWebGLSupport = Boost.hasWebGLSupport;
Boost.compose(G.Chart, G.Series, G.seriesTypes, G.Color);
