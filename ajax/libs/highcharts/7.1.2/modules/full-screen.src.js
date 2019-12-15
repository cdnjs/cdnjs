/**
 * @license Highcharts JS v7.1.2 (2019-06-04)
 *
 * Advanced Highstock tools
 *
 * (c) 2010-2019 Highsoft AS
 * Author: Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/full-screen', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'modules/full-screen.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2009-2019 Sebastian Bochann
         *
         * Full screen for Highcharts
         *
         * License: www.highcharts.com/license
         */


        H.FullScreen = function (container) {
            this.init(container.parentNode); // main div of the chart
        };

        /**
         * The module allows user to enable full screen mode in StockTools.
         * Based on default solutions in browsers.
         *
         */

        H.FullScreen.prototype = {
            /**
             * Init function
             *
             * @param {HTMLDOMElement} - chart div
             *
             */
            init: function (container) {
                if (container.requestFullscreen) {
                    container.requestFullscreen();
                } else if (container.mozRequestFullScreen) {
                    container.mozRequestFullScreen();
                } else if (container.webkitRequestFullscreen) {
                    container.webkitRequestFullscreen();
                } else if (container.msRequestFullscreen) {
                    container.msRequestFullscreen();
                }
            }
        };

    });
    _registerModule(_modules, 'masters/modules/full-screen.src.js', [], function () {


    });
}));