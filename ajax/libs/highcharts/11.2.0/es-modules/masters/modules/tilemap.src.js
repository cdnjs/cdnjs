/**
 * @license Highmaps JS v11.2.0 (2023-10-30)
 * @module highcharts/modules/tilemap
 * @requires highcharts
 * @requires highcharts/modules/map
 *
 * Tilemap module
 *
 * (c) 2010-2021 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import TilemapSeries from '../../Series/Tilemap/TilemapSeries.js';
const G = Highcharts;
TilemapSeries.compose(G.Axis);
