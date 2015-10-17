/**
* @preserve CanvasJS jQuery Charting Plugin - http://canvasjs.com/ 
* Copyright 2013 fenopix
*/

/*
* CanvasJS Charts follows Dual Licensing Model as mentioned below. 
* 
* ---------------------Free for Non-Commercial Use--------------------
* 
* For non-commercial purposes you can use the software for free under Creative Commons Attribution-NonCommercial 3.0 License. Refer to the following link for further details on the same.
*     http://creativecommons.org/licenses/by-nc/3.0/deed.en_US
* 
* ---------------------Commercial License--------------------
* Commercial use of CanvasJS requires you to purchase a license. Without a commercial license you can use it for evaluation purposes only. Please refer to the following link for further details.
*     http://canvasjs.com/
* 
*/

(function ($, window, document, undefined) {

	$.fn.CanvasJSChart = function (options) {

		if (options) {

			var $el = this.first();
			var container = this[0];
			var chart = new CanvasJS.Chart(container, options);

			$el.children(".canvasjs-chart-container").data("canvasjsChartRef", chart);

			chart.render();

			return this;

		} else {

			return this.first().children(".canvasjs-chart-container").data("canvasjsChartRef");

		}
	}

}(jQuery, window, document));