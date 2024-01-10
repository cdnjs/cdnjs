/**
 * @license Highcharts Gantt JS v11.3.0 (2024-01-10)
 * @module highcharts/modules/pathfinder
 * @requires highcharts
 *
 * Pathfinder
 *
 * (c) 2016-2024 Øystein Moseng
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import Pathfinder from '../../Gantt/Pathfinder.js';
import ArrowSymbols from '../../Extensions/ArrowSymbols.js';
const G = Highcharts;
G.Pathfinder = Pathfinder;
ArrowSymbols.compose(G.SVGRenderer);
Pathfinder.compose(G.Chart, G.Point);
