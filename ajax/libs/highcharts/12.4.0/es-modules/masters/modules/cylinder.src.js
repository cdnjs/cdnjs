/**
 * @license Highcharts JS v12.4.0 (2025-09-04)
 * @module highcharts/modules/cylinder
 * @requires highcharts
 * @requires highcharts/highcharts-3d
 *
 * Highcharts cylinder module
 *
 * (c) 2010-2025 Kacper Madej
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import CylinderSeries from '../../Series/Cylinder/CylinderSeries.js';
import RendererRegistry from '../../Core/Renderer/RendererRegistry.js';
CylinderSeries.compose(RendererRegistry.getRendererType());
export default Highcharts;
