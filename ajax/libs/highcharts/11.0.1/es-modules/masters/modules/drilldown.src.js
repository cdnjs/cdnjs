/**
 * @license Highcharts JS v11.0.1 (2023-05-08)
 * @module highcharts/modules/drilldown
 * @requires highcharts
 *
 * Highcharts Drilldown module
 *
 * Author: Torstein Honsi
 * License: www.highcharts.com/license
 *
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import '../../Extensions/Drilldown.js';
import Breadcrumbs from '../../Extensions/Breadcrumbs/Breadcrumbs.js';
const G = Highcharts;
G.Breadcrumbs = Breadcrumbs;
Breadcrumbs.compose(G.Chart, G.defaultOptions);
