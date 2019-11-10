/**
 * @license Highcharts JS v7.0.3 (2019-02-06)
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
        define(function () {
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    (function (H) {
        /**
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

    }(Highcharts));
    return (function () {


    }());
}));