/**
 * @license Highcharts JS v11.4.3 (2024-05-22)
 *
 * (c) 2009-2024 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/overlapping-datalabels', ['highcharts'], function (Highcharts) {
            factory(Highcharts);
            factory.Highcharts = Highcharts;
            return factory;
        });
    } else {
        factory(typeof Highcharts !== 'undefined' ? Highcharts : undefined);
    }
}(function (Highcharts) {
    'use strict';
    var _modules = Highcharts ? Highcharts._modules : {};
    function _registerModule(obj, path, args, fn) {
        if (!obj.hasOwnProperty(path)) {
            obj[path] = fn.apply(null, args);

            if (typeof CustomEvent === 'function') {
                window.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'masters/modules/overlapping-datalabels.src.js', [_modules['Core/Globals.js'], _modules['Extensions/OverlappingDataLabels.js']], function (Highcharts, OverlappingDataLabels) {

        const G = Highcharts;
        G.OverlappingDataLabels = G.OverlappingDataLabels || OverlappingDataLabels;
        G.OverlappingDataLabels.compose(G.Chart);

        return Highcharts;
    });
}));