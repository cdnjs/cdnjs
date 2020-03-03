/**
 * @license Highcharts JS v8.0.1 (2020-03-02)
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
    _registerModule(_modules, 'modules/lollipop.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  (c) 2010-2020 Sebastian Bochan, Rafal Sebestjanski
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var seriesType = U.seriesType;
        var areaProto = H.seriesTypes.area.prototype,
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
        /**
         * The `lollipop` series. If the [type](#series.lollipop.type) option is
         * not specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.lollipop
         * @product   highcharts highstock
         * @requires  highcharts-more
         * @requires  modules/dumbbell
         * @requires  modules/lollipop
         * @apioption series.lollipop
         */
        /**
         * An array of data points for the series. For the `lollipop` series type,
         * points can be given in the following ways:
         *
         * 1. An array of numerical values. In this case, the numerical values will be
         *    interpreted as `y` options. The `x` values will be automatically
         *    calculated, either starting at 0 and incremented by 1, or from
         *    `pointStart` and `pointInterval` given in the series options. If the axis
         *    has categories, these will be used. Example:
         *    ```js
         *    data: [0, 5, 3, 5]
         *    ```
         *
         * 2. An array of arrays with 2 values. In this case, the values correspond to
         *    `x,y`. If the first value is a string, it is applied as the name of the
         *    point, and the `x` value is inferred.
         *    ```js
         *    data: [
         *        [0, 6],
         *        [1, 2],
         *        [2, 6]
         *    ]
         *    ```
         *
         * 3. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.lollipop.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        y: 9,
         *        name: "Point2",
         *        color: "#00FF00",
         *        connectorWidth: 3,
         *        connectorColor: "#FF00FF"
         *    }, {
         *        x: 1,
         *        y: 6,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @sample {highcharts} highcharts/chart/reflow-true/
         *         Numerical values
         * @sample {highcharts} highcharts/series/data-array-of-arrays/
         *         Arrays of numeric x and y
         * @sample {highcharts} highcharts/series/data-array-of-arrays-datetime/
         *         Arrays of datetime x and y
         * @sample {highcharts} highcharts/series/data-array-of-name-value/
         *         Arrays of point.name and y
         * @sample {highcharts} highcharts/series/data-array-of-objects/
         *         Config objects
         *
         * @type      {Array<number|Array<(number|string),(number|null)>|null|*>}
         * @extends   series.dumbbell.data
         * @excluding lowColor
         * @product   highcharts highstock
         * @apioption series.lollipop.data
         */
        ''; // adds doclets above to transpiled file

    });
    _registerModule(_modules, 'masters/modules/lollipop.src.js', [], function () {


    });
}));