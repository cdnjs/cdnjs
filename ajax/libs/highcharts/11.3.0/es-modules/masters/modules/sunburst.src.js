/**
 * @license Highcharts JS v11.3.0 (2024-01-10)
 * @module highcharts/modules/sunburst
 * @requires highcharts
 *
 * (c) 2016-2024 Highsoft AS
 * Authors: Jon Arild Nygard
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import '../../Series/Treemap/TreemapSeries.js';
import '../../Series/Sunburst/SunburstSeries.js';
import Breadcrumbs from '../../Extensions/Breadcrumbs/Breadcrumbs.js';
const G = Highcharts;
G.Breadcrumbs = Breadcrumbs;
Breadcrumbs.compose(G.Chart, G.defaultOptions);
