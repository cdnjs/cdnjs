/**
 * @license Highcharts JS v11.4.8 (2024-08-29)
 *
 * Plugin for displaying a message when there is no data visible in chart.
 *
 * (c) 2010-2024 Highsoft AS
 * Author: Oystein Moseng
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/no-data-to-display', ['highcharts'], function (Highcharts) {
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
                Highcharts.win.dispatchEvent(new CustomEvent(
                    'HighchartsModuleLoaded',
                    { detail: { path: path, module: obj[path] } }
                ));
            }
        }
    }
    _registerModule(_modules, 'Extensions/NoDataToDisplay/NoDataDefaults.js', [], function () {
        /* *
         *
         *  Plugin for displaying a message when there is no data visible in chart.
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Oystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  API Options
         *
         * */
        /**
         * @optionparent lang
         */
        const lang = {
            /**
             * The text to display when the chart contains no data.
             *
             * @see [noData](#noData)
             *
             * @sample highcharts/no-data-to-display/no-data-line
             *         No-data text
             *
             * @since    3.0.8
             * @product  highcharts highstock
             * @requires modules/no-data-to-display
             */
            noData: 'No data to display'
        };
        /**
         * Options for displaying a message like "No data to display".
         * This feature requires the file no-data-to-display.js to be loaded in the
         * page. The actual text to display is set in the lang.noData option.
         *
         * @sample highcharts/no-data-to-display/no-data-line
         *         Line chart with no-data module
         * @sample highcharts/no-data-to-display/no-data-pie
         *         Pie chart with no-data module
         *
         * @product      highcharts highstock gantt
         * @requires     modules/no-data-to-display
         * @optionparent noData
         */
        const noData = {
            /**
             * An object of additional SVG attributes for the no-data label.
             *
             * @type      {Highcharts.SVGAttributes}
             * @since     3.0.8
             * @product   highcharts highstock gantt
             * @apioption noData.attr
             */
            attr: {
                zIndex: 1
            },
            /**
             * Whether to insert the label as HTML, or as pseudo-HTML rendered with
             * SVG.
             *
             * @type      {boolean}
             * @default   false
             * @since     4.1.10
             * @product   highcharts highstock gantt
             * @apioption noData.useHTML
             */
            /**
             * The position of the no-data label, relative to the plot area.
             *
             * @type  {Highcharts.AlignObject}
             * @since 3.0.8
             */
            position: {
                /**
                 * Horizontal offset of the label, in pixels.
                 */
                x: 0,
                /**
                 * Vertical offset of the label, in pixels.
                 */
                y: 0,
                /**
                 * Horizontal alignment of the label.
                 *
                 * @type {Highcharts.AlignValue}
                 */
                align: 'center',
                /**
                 * Vertical alignment of the label.
                 *
                 * @type {Highcharts.VerticalAlignValue}
                 */
                verticalAlign: 'middle'
            },
            /**
             * CSS styles for the no-data label.
             *
             * @sample highcharts/no-data-to-display/no-data-line
             *         Styled no-data text
             *
             * @type {Highcharts.CSSObject}
             */
            style: {
                /** @ignore */
                fontWeight: 'bold',
                /** @ignore */
                fontSize: '0.8em',
                /** @ignore */
                color: "#666666" /* Palette.neutralColor60 */
            }
        };
        /* *
         *
         *  Default Export
         *
         * */
        const NoDataDefaults = {
            lang,
            noData
        };

        return NoDataDefaults;
    });
    _registerModule(_modules, 'Extensions/NoDataToDisplay/NoDataToDisplay.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Extensions/NoDataToDisplay/NoDataDefaults.js'], _modules['Core/Utilities.js']], function (AST, NoDataDefaults, U) {
        /* *
         *
         *  Plugin for displaying a message when there is no data visible in chart.
         *
         *  (c) 2010-2024 Highsoft AS
         *
         *  Author: Oystein Moseng
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        const { addEvent, extend, merge } = U;
        /* *
         *
         *  Functions
         *
         * */
        /**
         * Returns true if there are data points within the plot area now.
         *
         * @private
         * @function Highcharts.Chart#hasData
         * @return {boolean|undefined}
         * True, if there are data points.
         * @requires modules/no-data-to-display
         */
        function chartHasData() {
            const chart = this, series = chart.series || [];
            let i = series.length;
            while (i--) {
                if (series[i].hasData() && !series[i].options.isInternal) {
                    return true;
                }
            }
            return chart.loadingShown; // #4588
        }
        /**
         * Hide no-data message.
         *
         * @private
         * @function Highcharts.Chart#hideNoData
         * @return {void}
         * @requires modules/no-data-to-display
         */
        function chartHideNoData() {
            const chart = this;
            if (chart.noDataLabel) {
                chart.noDataLabel = chart.noDataLabel.destroy();
            }
        }
        /**
         * Display a no-data message.
         * @private
         * @function Highcharts.Chart#showNoData
         * @param {string} [str]
         * An optional message to show in place of the default one
         * @return {void}
         * @requires modules/no-data-to-display
         */
        function chartShowNoData(str) {
            const chart = this, options = chart.options, text = str || (options && options.lang.noData) || '', noDataOptions = options && (options.noData || {});
            if (chart.renderer) { // Meaning chart is not destroyed
                if (!chart.noDataLabel) {
                    chart.noDataLabel = chart.renderer
                        .label(text, 0, 0, void 0, void 0, void 0, noDataOptions.useHTML, void 0, 'no-data')
                        .add();
                }
                if (!chart.styledMode) {
                    chart.noDataLabel
                        .attr(AST.filterUserAttributes(noDataOptions.attr || {}))
                        .css(noDataOptions.style || {});
                }
                chart.noDataLabel.align(extend(chart.noDataLabel.getBBox(), noDataOptions.position || {}), false, 'plotBox');
            }
        }
        /** @private */
        function compose(ChartClass, highchartsDefaultOptions) {
            const chartProto = ChartClass.prototype;
            if (!chartProto.showNoData) {
                chartProto.hasData = chartHasData;
                chartProto.hideNoData = chartHideNoData;
                chartProto.showNoData = chartShowNoData;
                addEvent(ChartClass, 'render', onChartRender);
                merge(true, highchartsDefaultOptions, NoDataDefaults);
            }
        }
        /**
         * Add event listener to handle automatic show or hide no-data message.
         * @private
         */
        function onChartRender() {
            const chart = this;
            if (chart.hasData()) {
                chart.hideNoData();
            }
            else {
                chart.showNoData();
            }
        }
        /* *
         *
         *  Default Export
         *
         * */
        const NoDataToDisplay = {
            compose
        };

        return NoDataToDisplay;
    });
    _registerModule(_modules, 'masters/modules/no-data-to-display.src.js', [_modules['Core/Globals.js'], _modules['Extensions/NoDataToDisplay/NoDataToDisplay.js']], function (Highcharts, NoDataToDisplay) {

        const G = Highcharts;
        NoDataToDisplay.compose(G.Chart, G.defaultOptions);

        return Highcharts;
    });
}));
