/**
 * @license Highcharts JS v10.1.0 (2022-04-29)
 * @module highcharts/modules/data
 * @requires highcharts
 *
 * Data module
 *
 * (c) 2012-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
import Highcharts from '../../Core/Globals.js';
import HttpUtilities from '../../Core/HttpUtilities.js';
import Data from '../../Extensions/Data.js';
var G = Highcharts;
// Functions
G.ajax = HttpUtilities.ajax;
G.getJSON = HttpUtilities.getJSON;
G.post = HttpUtilities.post;
// Classes
G.Data = Data;
G.HttpUtilities = HttpUtilities;
