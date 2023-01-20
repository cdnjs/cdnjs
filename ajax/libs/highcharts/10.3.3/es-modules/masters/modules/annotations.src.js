/**
 * @license Highcharts JS v10.3.3 (2023-01-20)
 * @module highcharts/modules/annotations
 * @requires highcharts
 *
 * Annotations module
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import Annotation from '../../Extensions/Annotations/Annotation.js';
var G = Highcharts;
G.Annotation = Annotation;
Annotation.compose(G.Chart, G.Pointer, G.SVGRenderer);
