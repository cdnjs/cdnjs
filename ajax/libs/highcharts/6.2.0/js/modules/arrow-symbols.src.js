/**
 * @license Highcharts JS v6.2.0 (2018-10-17)
 * Arrow Symbols
 *
 * (c) 2017 Lars A. V. Cabrera
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
		 * (c) 2017 Highsoft AS
		 * Authors: Lars A. V. Cabrera
		 *
		 * License: www.highcharts.com/license
		 */

		/**
		 * Creates an arrow symbol. Like a triangle, except not filled.
		 *                   o
		 *             o
		 *       o
		 * o
		 *       o
		 *             o
		 *                   o
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols.arrow = function (x, y, w, h) {
		    return [
		        'M', x, y + h / 2,
		        'L', x + w, y,
		        'L', x, y + h / 2,
		        'L', x + w, y + h
		    ];
		};

		/**
		 * Creates a half-width arrow symbol. Like a triangle, except not filled.
		 *       o
		 *    o
		 * o
		 *    o
		 *       o
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['arrow-half'] = function (x, y, w, h) {
		    return H.SVGRenderer.prototype.symbols.arrow(x, y, w / 2, h);
		};

		/**
		 * Creates a left-oriented triangle.
		 *             o
		 *       ooooooo
		 * ooooooooooooo
		 *       ooooooo
		 *             o
		 * @param  {number} x x position of the triangle
		 * @param  {number} y y position of the triangle
		 * @param  {number} w width of the triangle
		 * @param  {number} h height of the triangle
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['triangle-left'] = function (x, y, w, h) {
		    return [
		        'M', x + w, y,
		        'L', x, y + h / 2,
		        'L', x + w, y + h,
		        'Z'
		    ];
		};

		/**
		 * Alias function for triangle-left.
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['arrow-filled'] =
		        H.SVGRenderer.prototype.symbols['triangle-left'];

		/**
		 * Creates a half-width, left-oriented triangle.
		 *       o
		 *    oooo
		 * ooooooo
		 *    oooo
		 *       o
		 * @param  {number} x x position of the triangle
		 * @param  {number} y y position of the triangle
		 * @param  {number} w width of the triangle
		 * @param  {number} h height of the triangle
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['triangle-left-half'] = function (x, y, w, h) {
		    return H.SVGRenderer.prototype.symbols['triangle-left'](x, y, w / 2, h);
		};

		/**
		 * Alias function for triangle-left-half.
		 * @param  {number} x x position of the arrow
		 * @param  {number} y y position of the arrow
		 * @param  {number} w width of the arrow
		 * @param  {number} h height of the arrow
		 * @return {Array}   Path array
		 */
		H.SVGRenderer.prototype.symbols['arrow-filled-half'] =
		        H.SVGRenderer.prototype.symbols['triangle-left-half'];

	}(Highcharts));
	return (function () {


	}());
}));
