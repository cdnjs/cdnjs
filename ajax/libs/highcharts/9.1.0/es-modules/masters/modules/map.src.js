/**
 * @license Highmaps JS v9.1.0 (2021-05-04)
 * @module highcharts/modules/map
 * @requires highcharts
 *
 * Highmaps as a plugin for Highcharts or Highcharts Stock.
 *
 * (c) 2011-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import '../../Core/Axis/MapAxis.js';
import '../../Core/Axis/ColorAxis.js';
import '../../Mixins/ColorMapSeries.js';
import '../../Maps/MapNavigation.js';
import '../../Maps/MapPointer.js';
import '../../Series/Map/MapSeries.js';
import '../../Series/MapLine/MapLineSeries.js';
import '../../Series/MapPoint/MapPointSeries.js';
import '../../Series/MapBubble/MapBubbleSeries.js';
import '../../Series/Heatmap/HeatmapSeries.js';
import '../../Extensions/GeoJSON.js';
import MapChart from '../../Core/Chart/MapChart.js';
Highcharts.MapChart = MapChart;
Highcharts.mapChart = Highcharts.Map = MapChart.mapChart;
Highcharts.maps = MapChart.maps;
