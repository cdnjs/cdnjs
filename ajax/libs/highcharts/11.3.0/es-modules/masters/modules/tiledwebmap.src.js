/**
 * @license Highcharts JS v11.3.0 (2024-01-10)
 * @module highcharts/modules/tiledwebmap
 * @requires highcharts
 *
 * (c) 2009-2024
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import TiledWebMapSeries from '../../Series/TiledWebMap/TiledWebMapSeries.js';
import TilesProviderRegistry from '../../Maps/TilesProviders/TilesProviderRegistry.js';
const G = Highcharts;
G.TilesProviderRegistry = TilesProviderRegistry;
TiledWebMapSeries.compose(G.Chart);
