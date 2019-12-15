/**
 * @license Highcharts JS v6.1.0 (2018-04-13)
 *
 * (c) 2009-2017 Highsoft AS
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
	if (typeof module === 'object' && module.exports) {
		module.exports = factory;
	} else {
		factory(Highcharts);
	}
}(function (Highcharts) {
	(function (Highcharts) {
		/**
		 * (c) 2010-2017 Highsoft AS
		 *
		 * License: www.highcharts.com/license
		 *
		 * Accessible high-contrast theme for Highcharts. Considers colorblindness and
		 * monochrome rendering.
		 * @author Øystein Moseng
		 */

		Highcharts.theme = {
		    colors: ['#FDD089', '#FF7F79', '#A0446E', '#251535'],

		    colorAxis: {
		        maxColor: '#60042E',
		        minColor: '#FDD089'
		    },

		    plotOptions: {
		        map: {
		            nullColor: '#fefefc'
		        }
		    },

		    navigator: {
		        series: {
		            color: '#FF7F79',
		            lineColor: '#A0446E'
		        }
		    }
		};

		// Apply the theme
		Highcharts.setOptions(Highcharts.theme);

	}(Highcharts));
}));
