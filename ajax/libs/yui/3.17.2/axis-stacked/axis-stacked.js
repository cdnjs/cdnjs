/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add('axis-stacked', function (Y, NAME) {

/**
 * Provides functionality for drawing a stacked numeric axis for use with a chart.
 *
 * @module charts
 * @submodule axis-stacked
 */
/**
 * StackedAxis draws a stacked numeric axis for a chart.
 *
 * @class StackedAxis
 * @constructor
 * @param {Object} config (optional) Configuration parameters.
 * @extends NumericAxis
 * @uses StackedImpl
 * @submodule axis-stacked
 */
Y.StackedAxis = Y.Base.create("stackedAxis", Y.NumericAxis, [Y.StackedImpl]);



}, '3.17.2', {"requires": ["axis-numeric", "axis-stacked-base"]});
