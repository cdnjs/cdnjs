/**
 * @license Highcharts JS v8.0.0 (2019-12-10)
 *
 * (c) 2009-2019 Sebastian Bochan, Rafal Sebestjanski
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/lollipop', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'modules/lollipop.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Sebastian Bochan, Rafal Sebestjanski
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var seriesType = H.seriesType,
            areaProto = H.seriesTypes.area.prototype,
            colProto = H.seriesTypes.column.prototype;
        /**
         * The lollipop series is a carteseian series with a line anchored from
         * the x axis and a dot at the end to mark the value.
         * Requires `highcharts-more.js`, `modules/dumbbell.js` and
         * `modules/lollipop.js`.
         *
         * @sample {highcharts} highcharts/demo/lollipop/
         *         Lollipop chart
         * @sample {highcharts} highcharts/series-dumbbell/styled-mode-dumbbell/
         *         Styled mode
         *
         * @extends      plotOptions.dumbbell
         * @product      highcharts highstock
         * @excluding    fillColor, fillOpacity, lineWidth, stack, stacking, lowColor,
         *               stickyTracking, trackByArea
         * @since 8.0.0
         * @optionparent plotOptions.lollipop
         */
        seriesType('lollipop', 'dumbbell', {
            /** @ignore-option */
            lowColor: void 0,
            /** @ignore-option */
            threshold: 0,
            /** @ignore-option */
            connectorWidth: 1,
            /** @ignore-option */
            groupPadding: 0.2,
            /** @ignore-option */
            pointPadding: 0.1,
            /** @ignore-option */
            states: {
                hover: {
                    /** @ignore-option */
                    lineWidthPlus: 0,
                    /** @ignore-option */
                    connectorWidthPlus: 1,
                    /** @ignore-option */
                    halo: false
                }
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">●</span> {series.name}: <b>{point.low}</b><br/>'
            }
        }, {
            translatePoint: areaProto.translate,
            drawPoint: areaProto.drawPoints,
            drawDataLabels: colProto.drawDataLabels,
            setShapeArgs: colProto.translate
        }, {
            pointSetState: areaProto.pointClass.prototype.setState,
            setState: H.seriesTypes.dumbbell.prototype.pointClass.prototype.setState
        });

    });
    _registerModule(_modules, 'masters/modules/lollipop.src.js', [], function () {


    });
}));