/**
 * @license Highcharts JS v6.1.3 (2018-09-12)
 *
 * (c) 2009-2017 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else if (typeof define === 'function' && define.amd) {
		define(function () {
			return factory;
		});
	} else {
		factory(Highcharts);
	}
}(function (Highcharts) {

}));
