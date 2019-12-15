/**
 * @license Highcharts JS v7.1.2 (2019-06-04)
 *
 * Arrow Symbols
 *
 * (c) 2017-2019 Lars A. V. Cabrera
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/arrow-symbols', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);
        }
    }
    _registerModule(_modules, 'parts-gantt/ArrowSymbols.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2017 Highsoft AS
         * Authors: Lars A. V. Cabrera
         *
         * License: www.highcharts.com/license
         */



        /**
         * Creates an arrow symbol. Like a triangle, except not filled.
         * ```
         *                   o
         *             o
         *       o
         * o
         *       o
         *             o
         *                   o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
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
         * ```
         *       o
         *    o
         * o
         *    o
         *       o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['arrow-half'] = function (x, y, w, h) {
            return H.SVGRenderer.prototype.symbols.arrow(x, y, w / 2, h);
        };

        /**
         * Creates a left-oriented triangle.
         * ```
         *             o
         *       ooooooo
         * ooooooooooooo
         *       ooooooo
         *             o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the triangle
         *
         * @param {number} y
         *        y position of the triangle
         *
         * @param {number} w
         *        width of the triangle
         *
         * @param {number} h
         *        height of the triangle
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
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
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['arrow-filled'] =
                H.SVGRenderer.prototype.symbols['triangle-left'];

        /**
         * Creates a half-width, left-oriented triangle.
         * ```
         *       o
         *    oooo
         * ooooooo
         *    oooo
         *       o
         * ```
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the triangle
         *
         * @param {number} y
         *        y position of the triangle
         *
         * @param {number} w
         *        width of the triangle
         *
         * @param {number} h
         *        height of the triangle
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['triangle-left-half'] = function (x, y, w, h) {
            return H.SVGRenderer.prototype.symbols['triangle-left'](x, y, w / 2, h);
        };

        /**
         * Alias function for triangle-left-half.
         *
         * @private
         * @function
         *
         * @param {number} x
         *        x position of the arrow
         *
         * @param {number} y
         *        y position of the arrow
         *
         * @param {number} w
         *        width of the arrow
         *
         * @param {number} h
         *        height of the arrow
         *
         * @return {Highcharts.SVGPathArray}
         *         Path array
         */
        H.SVGRenderer.prototype.symbols['arrow-filled-half'] =
                H.SVGRenderer.prototype.symbols['triangle-left-half'];

    });
    _registerModule(_modules, 'masters/modules/arrow-symbols.src.js', [], function () {


    });
}));