/**
 * @license Highcharts JS v11.3.0 (2024-01-10)
 * @module highcharts/modules/treemap
 * @requires highcharts
 *
 * (c) 2014-2024 Highsoft AS
 * Authors: Jon Arild Nygard / Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import TreemapSeries from '../../Series/Treemap/TreemapSeries.js';
import Breadcrumbs from '../../Extensions/Breadcrumbs/Breadcrumbs.js';
const G = Highcharts;
G.Breadcrumbs = Breadcrumbs;
Breadcrumbs.compose(G.Chart, G.defaultOptions);
TreemapSeries.compose(G.Series);
