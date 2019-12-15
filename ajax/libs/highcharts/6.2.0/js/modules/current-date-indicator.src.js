/**
 * @license Highcharts JS v6.2.0 (2018-10-17)
 * CurrentDateIndicator
 *
 * (c) 2010-2016 Lars A. V. Cabrera
 *
 * --- WORK IN PROGRESS ---
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
	(function (H) {
		/**
		* (c) 2016 Highsoft AS
		* Author: Lars A. V. Cabrera
		*
		* License: www.highcharts.com/license
		*/

		/**
		 * Show an indicator on the axis for the current date and time. Can be a boolean
		 * or a configuration object similar to [xAxis.plotLines](#xAxis.plotLines).
		 *
		 * @type {Object}
		 * @extends {xAxis.plotLines}
		 * @excluding value
		 * @sample  gantt/current-date-indicator/demo
		 *          Current date indicator enabled
		 * @sample  gantt/current-date-indicator/object-config
		 *          Current date indicator with custom options
		 * @product gantt
		 * @apioption xAxis.currentDateIndicator
		 */

		var addEvent = H.addEvent,
		    Axis = H.Axis,
		    PlotLineOrBand = H.PlotLineOrBand,
		    merge = H.merge,
		    defaultConfig = {
		        currentDateIndicator: true,
		        color: '#ccd6eb',
		        width: 2,
		        label: {
		            format: '%a, %b %d %Y, %H:%M',
		            formatter: undefined,
		            rotation: 0,
		            style: {
		                fontSize: '10px'
		            }
		        }
		    };

		addEvent(Axis, 'afterSetOptions', function () {
		    var options = this.options,
		        cdiOptions = options.currentDateIndicator;

		    if (cdiOptions) {
		        if (typeof cdiOptions === 'object') {
		            // Ignore formatter if custom format is defined
		            if (cdiOptions.label && cdiOptions.label.format) {
		                cdiOptions.label.formatter = undefined;
		            }
		            cdiOptions = merge(defaultConfig, cdiOptions);
		        } else {
		            cdiOptions = merge(defaultConfig);
		        }

		        cdiOptions.value = new Date();

		        if (!options.plotLines) {
		            options.plotLines = [];
		        }

		        options.plotLines.push(cdiOptions);
		    }

		});

		addEvent(PlotLineOrBand, 'render', function () {
		    var options = this.options,
		        format,
		        formatter;

		    if (options.currentDateIndicator && options.label) {
		        format = options.label.format;
		        formatter = options.label.formatter;

		        options.value = new Date();
		        if (typeof formatter === 'function') {
		            options.label.text = formatter(this);
		        } else {
		            options.label.text = H.dateFormat(format, new Date());
		        }

		        // If the label already exists, update its text
		        if (this.label) {
		            this.label.attr({
		                text: options.label.text
		            });
		        }
		    }
		});

	}(Highcharts));
	return (function () {


	}());
}));
