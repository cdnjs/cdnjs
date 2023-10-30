/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 * @module highcharts/modules/treemap
 * @requires highcharts
 *
 * (c) 2014-2021 Highsoft AS
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
