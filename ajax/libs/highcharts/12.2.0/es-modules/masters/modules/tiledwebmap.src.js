/**
 * @license Highcharts JS v12.2.0 (2025-04-07)
 * @module highcharts/modules/tiledwebmap
 * @requires highcharts
 *
 * (c) 2009-2025
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import TilesProviderRegistry from '../../Maps/TilesProviders/TilesProviderRegistry.js';
import TiledWebMapSeries from '../../Series/TiledWebMap/TiledWebMapSeries.js';
const G = Highcharts;
G.TilesProviderRegistry = G.TilesProviderRegistry || TilesProviderRegistry;
TiledWebMapSeries.compose(G.MapView);
export default Highcharts;
