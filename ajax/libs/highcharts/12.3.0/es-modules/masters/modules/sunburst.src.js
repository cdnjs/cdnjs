/**
 * @license Highcharts JS v12.3.0 (2025-06-21)
 * @module highcharts/modules/sunburst
 * @requires highcharts
 *
 * (c) 2016-2025 Highsoft AS
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
G.Breadcrumbs = G.Breadcrumbs || Breadcrumbs;
G.Breadcrumbs.compose(G.Chart, G.defaultOptions);
export default Highcharts;
