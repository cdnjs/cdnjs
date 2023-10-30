/**
 * @license Highcharts JS v11.2.0 (2023-10-30)
 * @module highcharts/modules/cylinder
 * @requires highcharts
 * @requires highcharts/highcharts-3d
 *
 * Highcharts cylinder module
 *
 * (c) 2010-2021 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
'use strict';
import CylinderSeries from '../../Series/Cylinder/CylinderSeries.js';
import RendererRegistry from '../../Core/Renderer/RendererRegistry.js';
CylinderSeries.compose(RendererRegistry.getRendererType());
