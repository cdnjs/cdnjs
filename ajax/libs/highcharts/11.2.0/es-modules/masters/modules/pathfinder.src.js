/**
 * @license Highcharts Gantt JS v11.2.0 (2023-10-30)
 * @module highcharts/modules/pathfinder
 * @requires highcharts
 *
 * Pathfinder
 *
 * (c) 2016-2021 Øystein Moseng
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
