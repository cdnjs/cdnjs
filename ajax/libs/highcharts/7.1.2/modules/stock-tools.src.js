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
        define('highcharts/modules/stock-tools', ['highcharts', 'highcharts/modules/stock'], function (Highcharts) {
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
    _registerModule(_modules, 'modules/stock-tools-bindings.js', [_modules['parts/Globals.js']], function (H) {
        /**
         *
         *  Events generator for Stock tools
         *
         *  (c) 2009-2019 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         * */

        /**
         * A config object for bindings in Stock Tools module.
         *
         * @interface Highcharts.StockToolsBindingsObject
         *//**
         * ClassName of the element for a binding.
         * @name Highcharts.StockToolsBindingsObject#className
         * @type {string|undefined}
         *//**
         * Last event to be fired after last step event.
         * @name Highcharts.StockToolsBindingsObject#end
         * @type {Function|undefined}
         *//**
         * Initial event, fired on a button click.
         * @name Highcharts.StockToolsBindingsObject#init
         * @type {Function|undefined}
         *//**
         * Event fired on first click on a chart.
         * @name Highcharts.StockToolsBindingsObject#start
         * @type {Function|undefined}
         *//**
         * Last event to be fired after last step event. Array of step events to be
         * called sequentially after each user click.
         * @name Highcharts.StockToolsBindingsObject#steps
         * @type {Array<Function>|undefined}
         */



        var fireEvent = H.fireEvent,
            defined = H.defined,
            pick = H.pick,
            extend = H.extend,
            merge = H.merge,
            isNumber = H.isNumber,
            correctFloat = H.correctFloat,
            bindingsUtils = H.NavigationBindings.prototype.utils,
            PREFIX = 'highcharts-';

        /**
         * Generates function which will add a flag series using modal in GUI.
         * Method fires an event "showPopup" with config:
         * `{type, options, callback}`.
         *
         * Example: NavigationBindings.utils.addFlagFromForm('url(...)') - will
         * generate function that shows modal in GUI.
         *
         * @private
         * @function bindingsUtils.addFlagFromForm
         *
         * @param {string} type
         *        Type of flag series, e.g. "squarepin"
         *
         * @return {Function}
         *         Callback to be used in `start` callback
         */
        bindingsUtils.addFlagFromForm = function (type) {
            return function (e) {
                var navigation = this,
                    chart = navigation.chart,
                    toolbar = chart.stockTools,
                    getFieldType = bindingsUtils.getFieldType,
                    point = bindingsUtils.attractToPoint(e, chart),
                    pointConfig = {
                        x: point.x,
                        y: point.y
                    },
                    seriesOptions = {
                        type: 'flags',
                        onSeries: point.series.id,
                        shape: type,
                        data: [pointConfig],
                        point: {
                            events: {
                                click: function () {
                                    var point = this,
                                        options = point.options;

                                    fireEvent(
                                        navigation,
                                        'showPopup',
                                        {
                                            point: point,
                                            formType: 'annotation-toolbar',
                                            options: {
                                                langKey: 'flags',
                                                type: 'flags',
                                                title: [
                                                    options.title,
                                                    getFieldType(
                                                        options.title
                                                    )
                                                ],
                                                name: [
                                                    options.name,
                                                    getFieldType(
                                                        options.name
                                                    )
                                                ]
                                            },
                                            onSubmit: function (updated) {
                                                if (updated.actionType === 'remove') {
                                                    point.remove();
                                                } else {
                                                    point.update(
                                                        navigation.fieldsToOptions(
                                                            updated.fields,
                                                            {}
                                                        )
                                                    );
                                                }
                                            }
                                        }
                                    );
                                }
                            }
                        }
                    };

                if (!toolbar || !toolbar.guiEnabled) {
                    chart.addSeries(seriesOptions);
                }

                fireEvent(
                    navigation,
                    'showPopup',
                    {
                        formType: 'flag',
                        // Enabled options:
                        options: {
                            langKey: 'flags',
                            type: 'flags',
                            title: ['A', getFieldType('A')],
                            name: ['Flag A', getFieldType('Flag A')]
                        },
                        // Callback on submit:
                        onSubmit: function (data) {
                            navigation.fieldsToOptions(
                                data.fields,
                                seriesOptions.data[0]
                            );
                            chart.addSeries(seriesOptions);
                        }
                    }
                );
            };
        };

        bindingsUtils.manageIndicators = function (data) {
            var navigation = this,
                chart = navigation.chart,
                seriesConfig = {
                    linkedTo: data.linkedTo,
                    type: data.type
                },
                indicatorsWithVolume = [
                    'ad',
                    'cmf',
                    'mfi',
                    'vbp',
                    'vwap'
                ],
                indicatorsWithAxes = [
                    'ad',
                    'atr',
                    'cci',
                    'cmf',
                    'macd',
                    'mfi',
                    'roc',
                    'rsi',
                    'vwap',
                    'ao',
                    'aroon',
                    'aroonoscillator',
                    'trix',
                    'apo',
                    'dpo',
                    'ppo',
                    'natr',
                    'williamsr',
                    'stochastic',
                    'linearRegression',
                    'linearRegressionSlope',
                    'linearRegressionIntercept',
                    'linearRegressionAngle'
                ],
                yAxis,
                series;

            if (data.actionType === 'edit') {
                navigation.fieldsToOptions(data.fields, seriesConfig);
                series = chart.get(data.seriesId);

                if (series) {
                    series.update(seriesConfig, false);
                }
            } else if (data.actionType === 'remove') {
                series = chart.get(data.seriesId);
                if (series) {
                    yAxis = series.yAxis;

                    if (series.linkedSeries) {
                        series.linkedSeries.forEach(function (linkedSeries) {
                            linkedSeries.remove(false);
                        });
                    }

                    series.remove(false);

                    if (indicatorsWithAxes.indexOf(series.type) >= 0) {
                        yAxis.remove(false);
                        navigation.resizeYAxes();
                    }
                }
            } else {
                seriesConfig.id = H.uniqueKey();
                navigation.fieldsToOptions(data.fields, seriesConfig);

                if (indicatorsWithAxes.indexOf(data.type) >= 0) {
                    yAxis = chart.addAxis({
                        id: H.uniqueKey(),
                        offset: 0,
                        opposite: true,
                        title: {
                            text: ''
                        },
                        tickPixelInterval: 40,
                        showLastLabel: false,
                        labels: {
                            align: 'left',
                            y: -2
                        }
                    }, false, false);
                    seriesConfig.yAxis = yAxis.options.id;
                    navigation.resizeYAxes();
                } else {
                    seriesConfig.yAxis = chart.get(data.linkedTo).options.yAxis;
                }

                if (indicatorsWithVolume.indexOf(data.type) >= 0) {
                    seriesConfig.params.volumeSeriesID = chart.series.filter(
                        function (series) {
                            return series.options.type === 'column';
                        }
                    )[0].options.id;
                }

                chart.addSeries(seriesConfig, false);
            }

            fireEvent(
                navigation,
                'deselectButton',
                {
                    button: navigation.selectedButtonElement
                }
            );

            chart.redraw();
        };

        /**
         * Update height for an annotation. Height is calculated as a difference
         * between last point in `typeOptions` and current position. It's a value,
         * not pixels height.
         *
         * @private
         * @function bindingsUtils.updateHeight
         *
         * @param {global.Event} e
         *        normalized browser event
         *
         * @param {Highcharts.Annotation} annotation
         *        Annotation to be updated
         */
        bindingsUtils.updateHeight = function (e, annotation) {
            annotation.update({
                typeOptions: {
                    height: this.chart.yAxis[0].toValue(e.chartY) -
                        annotation.options.typeOptions.points[1].y
                }
            });
        };

        // @todo
        // Consider using getHoverData(), but always kdTree (columns?)
        bindingsUtils.attractToPoint = function (e, chart) {
            var x = chart.xAxis[0].toValue(e.chartX),
                y = chart.yAxis[0].toValue(e.chartY),
                distX = Number.MAX_VALUE,
                closestPoint;

            chart.series.forEach(function (series) {
                series.points.forEach(function (point) {
                    if (point && distX > Math.abs(point.x - x)) {
                        distX = Math.abs(point.x - x);
                        closestPoint = point;
                    }
                });
            });

            return {
                x: closestPoint.x,
                y: closestPoint.y,
                below: y < closestPoint.y,
                series: closestPoint.series,
                xAxis: closestPoint.series.xAxis.index || 0,
                yAxis: closestPoint.series.yAxis.index || 0
            };
        };

        /**
         * Shorthand to check if given yAxis comes from navigator.
         *
         * @private
         * @function bindingsUtils.isNotNavigatorYAxis
         *
         * @param {Highcharts.Axis} axis
         *        Axis
         *
         * @return {boolean}
         */
        bindingsUtils.isNotNavigatorYAxis = function (axis) {
            return axis.userOptions.className !== PREFIX + 'navigator-yaxis';
        };
        /**
         * Update each point after specified index, most of the annotations use
         * this. For example crooked line: logic behind updating each point is the
         * same, only index changes when adding an annotation.
         *
         * Example: NavigationBindings.utils.updateNthPoint(1) - will generate
         * function that updates all consecutive points except point with index=0.
         *
         * @private
         * @function bindingsUtils.updateNthPoint
         *
         * @param {number} startIndex
         *        Index from each point should udpated
         *
         * @return {Function}
         *         Callback to be used in steps array
         */
        bindingsUtils.updateNthPoint = function (startIndex) {
            return function (e, annotation) {
                var options = annotation.options.typeOptions,
                    x = this.chart.xAxis[0].toValue(e.chartX),
                    y = this.chart.yAxis[0].toValue(e.chartY);

                options.points.forEach(function (point, index) {
                    if (index >= startIndex) {
                        point.x = x;
                        point.y = y;
                    }
                });

                annotation.update({
                    typeOptions: {
                        points: options.points
                    }
                });
            };
        };

        // Extends NavigationBindigs to support indicators and resizers:
        extend(H.NavigationBindings.prototype, {
            /**
             * Get current positions for all yAxes. If new axis does not have position,
             * returned is default height and last available top place.
             *
             * @private
             * @function Highcharts.NavigationBindings#getYAxisPositions
             *
             * @param {Array<Highcharts.Axis>} yAxes
             *        Array of yAxes available in the chart.
             *
             * @param {number} plotHeight
             *        Available height in the chart.
             *
             * @param {number} defaultHeight
             *        Default height in percents.
             *
             * @return {Array}
             *         An array of calculated positions in percentages.
             *         Format: `{top: Number, height: Number}`
             */
            getYAxisPositions: function (yAxes, plotHeight, defaultHeight) {
                var positions,
                    allAxesHeight = 0;

                function isPercentage(prop) {
                    return defined(prop) && !isNumber(prop) && prop.match('%');
                }

                positions = yAxes.map(function (yAxis) {
                    var height = isPercentage(yAxis.options.height) ?
                            parseFloat(yAxis.options.height) / 100 :
                            yAxis.height / plotHeight,
                        top = isPercentage(yAxis.options.top) ?
                            parseFloat(yAxis.options.top) / 100 :
                            correctFloat(
                                yAxis.top - yAxis.chart.plotTop
                            ) / plotHeight;

                    // New yAxis does not contain "height" info yet
                    if (!isNumber(height)) {
                        height = defaultHeight / 100;
                    }

                    allAxesHeight = correctFloat(allAxesHeight + height);

                    return {
                        height: height * 100,
                        top: top * 100
                    };
                });

                positions.allAxesHeight = allAxesHeight;

                return positions;
            },

            /**
             * Get current resize options for each yAxis. Note that each resize is
             * linked to the next axis, except the last one which shouldn't affect
             * axes in the navigator. Because indicator can be removed with it's yAxis
             * in the middle of yAxis array, we need to bind closest yAxes back.
             *
             * @private
             * @function Highcharts.NavigationBindings#getYAxisResizers
             *
             * @param {Array<Highcharts.Axis>} yAxes
             *        Array of yAxes available in the chart
             *
             * @return {Array<object>}
             *         An array of resizer options.
             *         Format: `{enabled: Boolean, controlledAxis: { next: [String]}}`
             */
            getYAxisResizers: function (yAxes) {
                var resizers = [];

                yAxes.forEach(function (yAxis, index) {
                    var nextYAxis = yAxes[index + 1];

                    // We have next axis, bind them:
                    if (nextYAxis) {
                        resizers[index] = {
                            enabled: true,
                            controlledAxis: {
                                next: [
                                    pick(
                                        nextYAxis.options.id,
                                        nextYAxis.options.index
                                    )
                                ]
                            }
                        };
                    } else {
                        // Remove binding:
                        resizers[index] = {
                            enabled: false
                        };
                    }
                });

                return resizers;
            },
            /**
             * Resize all yAxes (except navigator) to fit the plotting height. Method
             * checks if new axis is added, then shrinks other main axis up to 5 panes.
             * If added is more thatn 5 panes, it rescales all other axes to fit new
             * yAxis.
             *
             * If axis is removed, and we have more than 5 panes, rescales all other
             * axes. If chart has less than 5 panes, first pane receives all extra
             * space.
             *
             * @private
             * @function Highcharts.NavigationBindings#resizeYAxes
             *
             * @param {number} defaultHeight
             *        Default height for yAxis
             */
            resizeYAxes: function (defaultHeight) {
                defaultHeight = defaultHeight || 20; // in %, but as a number
                var chart = this.chart,
                    // Only non-navigator axes
                    yAxes = chart.yAxis.filter(this.utils.isNotNavigatorYAxis),
                    plotHeight = chart.plotHeight,
                    allAxesLength = yAxes.length,
                    // Gather current heights (in %)
                    positions = this.getYAxisPositions(
                        yAxes,
                        plotHeight,
                        defaultHeight
                    ),
                    resizers = this.getYAxisResizers(yAxes),
                    allAxesHeight = positions.allAxesHeight,
                    changedSpace = defaultHeight;

                // More than 100%
                if (allAxesHeight > 1) {
                    // Simple case, add new panes up to 5
                    if (allAxesLength < 6) {
                        // Added axis, decrease first pane's height:
                        positions[0].height = correctFloat(
                            positions[0].height - changedSpace
                        );
                        // And update all other "top" positions:
                        positions = this.recalculateYAxisPositions(
                            positions,
                            changedSpace
                        );
                    } else {
                        // We have more panes, rescale all others to gain some space,
                        // This is new height for upcoming yAxis:
                        defaultHeight = 100 / allAxesLength;
                        // This is how much we need to take from each other yAxis:
                        changedSpace = defaultHeight / (allAxesLength - 1);

                        // Now update all positions:
                        positions = this.recalculateYAxisPositions(
                            positions,
                            changedSpace,
                            true,
                            -1
                        );
                    }
                    // Set last position manually:
                    positions[allAxesLength - 1] = {
                        top: correctFloat(100 - defaultHeight),
                        height: defaultHeight
                    };

                } else {
                    // Less than 100%
                    changedSpace = correctFloat(1 - allAxesHeight) * 100;
                    // Simple case, return first pane it's space:
                    if (allAxesLength < 5) {
                        positions[0].height = correctFloat(
                            positions[0].height + changedSpace
                        );

                        positions = this.recalculateYAxisPositions(
                            positions,
                            changedSpace
                        );
                    } else {
                        // There were more panes, return to each pane a bit of space:
                        changedSpace /= allAxesLength;
                        // Removed axis, add extra space to the first pane:
                        // And update all other positions:
                        positions = this.recalculateYAxisPositions(
                            positions,
                            changedSpace,
                            true,
                            1
                        );
                    }
                }

                positions.forEach(function (position, index) {
                    // if (index === 0) debugger;
                    yAxes[index].update({
                        height: position.height + '%',
                        top: position.top + '%',
                        resize: resizers[index]
                    }, false);
                });
            },
            /**
             * Utility to modify calculated positions according to the remaining/needed
             * space. Later, these positions are used in `yAxis.update({ top, height })`
             *
             * @private
             * @function Highcharts.NavigationBindings#recalculateYAxisPositions
             *
             * @param {Array<object>} positions
             *        Default positions of all yAxes.
             *
             * @param {number} changedSpace
             *        How much space should be added or removed.
             * @param {number} adder
             *        `-1` or `1`, to determine whether we should add or remove space.
             *
             * @param {boolean} modifyHeight
             *        Update only `top` or both `top` and `height`.
             *
             * @return {Array<object>}
             *         Modified positions,
             */
            recalculateYAxisPositions: function (
                positions,
                changedSpace,
                modifyHeight,
                adder
            ) {
                positions.forEach(function (position, index) {
                    var prevPosition = positions[index - 1];

                    position.top = !prevPosition ? 0 :
                        correctFloat(prevPosition.height + prevPosition.top);

                    if (modifyHeight) {
                        position.height = correctFloat(
                            position.height + adder * changedSpace
                        );
                    }
                });

                return positions;
            }
        });

        /**
         * @type         {Highcharts.Dictionary<Highcharts.StockToolsBindingsObject>|*}
         * @since        7.0.0
         * @optionparent navigation.bindings
         */
        var stockToolsBindings = {
            // Line type annotations:
            /**
             * A segment annotation bindings. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-segment", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            segment: {
                /** @ignore */
                className: 'highcharts-segment',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'crookedLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'segment',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A segment with an arrow annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-segment", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            arrowSegment: {
                /** @ignore */
                className: 'highcharts-arrow-segment',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'crookedLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'arrowSegment',
                            type: type,
                            typeOptions: {
                                line: {
                                    markerEnd: 'arrow'
                                },
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A ray annotation bindings. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-ray", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            ray: {
                /** @ignore */
                className: 'highcharts-ray',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'crookedLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'ray',
                            type: type,
                            typeOptions: {
                                type: 'ray',
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A ray with an arrow annotation bindings. Includes `start` and one event
             * in `steps` array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-ray", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            arrowRay: {
                /** @ignore */
                className: 'highcharts-arrow-ray',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'infinityLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'arrowRay',
                            type: type,
                            typeOptions: {
                                type: 'ray',
                                line: {
                                    markerEnd: 'arrow'
                                },
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A line annotation. Includes `start` and one event in `steps` array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-infinity-line", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            infinityLine: {
                /** @ignore */
                className: 'highcharts-infinity-line',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'infinityLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'infinityLine',
                            type: type,
                            typeOptions: {
                                type: 'line',
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A line with arrow annotation. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-infinity-line", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            arrowInfinityLine: {
                /** @ignore */
                className: 'highcharts-arrow-infinity-line',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'infinityLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'arrowInfinityLine',
                            type: type,
                            typeOptions: {
                                type: 'line',
                                line: {
                                    markerEnd: 'arrow'
                                },
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A horizontal line annotation. Includes `start` event.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-horizontal-line", "start": function() {}, "annotationOptions": {}}
             */
            horizontalLine: {
                /** @ignore */
                className: 'highcharts-horizontal-line',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'infinityLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'horizontalLine',
                            type: type,
                            typeOptions: {
                                type: 'horizontalLine',
                                points: [{
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    this.chart.addAnnotation(options);
                }
            },
            /**
             * A vertical line annotation. Includes `start` event.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-line", "start": function() {}, "annotationOptions": {}}
             */
            verticalLine: {
                /** @ignore */
                className: 'highcharts-vertical-line',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'infinityLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'verticalLine',
                            type: type,
                            typeOptions: {
                                type: 'verticalLine',
                                points: [{
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    this.chart.addAnnotation(options);
                }
            },
            /**
             * Crooked line (three points) annotation bindings. Includes `start` and two
             * events in `steps` (for second and third points in crooked line) array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-crooked3", "start": function() {}, "steps": [function() {}, function() {}], "annotationOptions": {}}
             */
            // Crooked Line type annotations:
            crooked3: {
                /** @ignore */
                className: 'highcharts-crooked3',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'crookedLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'crooked3',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateNthPoint(2)
                ]
            },
            /**
             * Crooked line (five points) annotation bindings. Includes `start` and four
             * events in `steps` (for all consequent points in crooked line) array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-crooked3", "start": function() {}, "steps": [function() {}, function() {}, function() {}, function() {}], "annotationOptions": {}}
             */
            crooked5: {
                /** @ignore */
                className: 'highcharts-crooked5',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'crookedLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'crookedLine',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateNthPoint(2),
                    bindingsUtils.updateNthPoint(3),
                    bindingsUtils.updateNthPoint(4)
                ]
            },
            /**
             * Elliott wave (three points) annotation bindings. Includes `start` and two
             * events in `steps` (for second and third points) array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-elliott3", "start": function() {}, "steps": [function() {}, function() {}], "annotationOptions": {}}
             */
            elliott3: {
                /** @ignore */
                className: 'highcharts-elliott3',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'elliottWave',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'elliott3',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666'
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateNthPoint(2),
                    bindingsUtils.updateNthPoint(3)
                ]
            },
            /**
             * Elliott wave (five points) annotation bindings. Includes `start` and four
             * event in `steps` (for all consequent points in Elliott wave) array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-elliott3", "start": function() {}, "steps": [function() {}, function() {}, function() {}, function() {}], "annotationOptions": {}}
             */
            elliott5: {
                /** @ignore */
                className: 'highcharts-elliott5',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'elliottWave',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'elliott5',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666'
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateNthPoint(2),
                    bindingsUtils.updateNthPoint(3),
                    bindingsUtils.updateNthPoint(4),
                    bindingsUtils.updateNthPoint(5)
                ]
            },
            /**
             * A measure (x-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-x", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            measureX: {
                /** @ignore */
                className: 'highcharts-measure-x',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'measure',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'measure',
                            type: type,
                            typeOptions: {
                                selectType: 'x',
                                point: {
                                    x: x,
                                    y: y,
                                    xAxis: 0,
                                    yAxis: 0
                                },
                                crosshairX: {
                                    strokeWidth: 1,
                                    stroke: '#000000'
                                },
                                crosshairY: {
                                    enabled: false,
                                    strokeWidth: 0,
                                    stroke: '#000000'
                                },
                                background: {
                                    width: 0,
                                    height: 0,
                                    strokeWidth: 0,
                                    stroke: '#ffffff',
                                    fill: 'red'
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666'
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateRectSize
                ]
            },
            /**
             * A measure (y-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-y", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            measureY: {
                /** @ignore */
                className: 'highcharts-measure-y',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'measure',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'measure',
                            type: type,
                            typeOptions: {
                                selectType: 'y',
                                point: {
                                    x: x,
                                    y: y,
                                    xAxis: 0,
                                    yAxis: 0
                                },
                                crosshairX: {
                                    enabled: false,
                                    strokeWidth: 0,
                                    stroke: '#000000'
                                },
                                crosshairY: {
                                    strokeWidth: 1,
                                    stroke: '#000000'
                                },
                                background: {
                                    width: 0,
                                    height: 0,
                                    strokeWidth: 0,
                                    stroke: '#ffffff'
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666'
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateRectSize
                ]
            },
            /**
             * A measure (xy-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-xy", "start": function() {}, "steps": [function() {}], "annotationOptions": {}}
             */
            measureXY: {
                /** @ignore */
                className: 'highcharts-measure-xy',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'measure',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'measure',
                            type: 'measure',
                            typeOptions: {
                                selectType: 'xy',
                                point: {
                                    x: x,
                                    y: y,
                                    xAxis: 0,
                                    yAxis: 0
                                },
                                background: {
                                    width: 0,
                                    height: 0,
                                    strokeWidth: 10
                                },
                                crosshairX: {
                                    strokeWidth: 1,
                                    stroke: '#000000'
                                },
                                crosshairY: {
                                    strokeWidth: 1,
                                    stroke: '#000000'
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666'
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateRectSize
                ]
            },
            // Advanced type annotations:
            /**
             * A fibonacci annotation bindings. Includes `start` and two events in
             * `steps` array (updates second point, then height).
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-fibonacci", "start": function() {}, "steps": [function() {}, function() {}], "annotationOptions": {}}
             */
            fibonacci: {
                /** @ignore */
                className: 'highcharts-fibonacci',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'fibonacci',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'fibonacci',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666'
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateHeight
                ]
            },
            /**
             * A parallel channel (tunnel) annotation bindings. Includes `start` and
             * two events in `steps` array (updates second point, then height).
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-parallel-channel", "start": function() {}, "steps": [function() {}, function() {}], "annotationOptions": {}}
             */
            parallelChannel: {
                /** @ignore */
                className: 'highcharts-parallel-channel',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'tunnel',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'parallelChannel',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }]
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateHeight
                ]
            },
            /**
             * An Andrew's pitchfork annotation bindings. Includes `start` and two
             * events in `steps` array (sets second and third control points).
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-pitchfork", "start": function() {}, "steps": [function() {}, function() {}], "annotationOptions": {}}
             */
            pitchfork: {
                /** @ignore */
                className: 'highcharts-pitchfork',
                /** @ignore */
                start: function (e) {
                    var x = this.chart.xAxis[0].toValue(e.chartX),
                        y = this.chart.yAxis[0].toValue(e.chartY),
                        type = 'pitchfork',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'pitchfork',
                            type: type,
                            typeOptions: {
                                points: [{
                                    x: x,
                                    y: y,
                                    controlPoint: {
                                        style: {
                                            fill: 'red'
                                        }
                                    }
                                }, {
                                    x: x,
                                    y: y
                                }, {
                                    x: x,
                                    y: y
                                }],
                                innerBackground: {
                                    fill: 'rgba(100, 170, 255, 0.8)'
                                }
                            },
                            shapeOptions: {
                                strokeWidth: 2
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions);

                    return this.chart.addAnnotation(options);
                },
                /** @ignore */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateNthPoint(2)
                ]
            },
            // Labels with arrow and auto increments
            /**
             * A vertical counter annotation bindings. Includes `start` event. On click,
             * finds the closest point and marks it with a numeric annotation -
             * incrementing counter on each add.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-counter", "start": function() {}, "annotationOptions": {}}
             */
            verticalCounter: {
                /** @ignore */
                className: 'highcharts-vertical-counter',
                /** @ignore */
                start: function (e) {
                    var closestPoint = bindingsUtils.attractToPoint(e, this.chart),
                        type = 'verticalLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        verticalCounter = !defined(this.verticalCounter) ? 0 :
                            this.verticalCounter,
                        options = merge({
                            langKey: 'verticalCounter',
                            type: type,
                            typeOptions: {
                                point: {
                                    x: closestPoint.x,
                                    y: closestPoint.y,
                                    xAxis: closestPoint.xAxis,
                                    yAxis: closestPoint.yAxis
                                },
                                label: {
                                    offset: closestPoint.below ? 40 : -40,
                                    text: verticalCounter.toString()
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666',
                                    fontSize: '11px'
                                }
                            },
                            shapeOptions: {
                                stroke: 'rgba(0, 0, 0, 0.75)',
                                strokeWidth: 1
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions),
                        annotation;

                    annotation = this.chart.addAnnotation(options);

                    verticalCounter++;

                    annotation.options.events.click.call(annotation, {});
                }
            },
            /**
             * A vertical arrow annotation bindings. Includes `start` event. On click,
             * finds the closest point and marks it with an arrow and a label with
             * value.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-label", "start": function() {}, "annotationOptions": {}}
             */
            verticalLabel: {
                /** @ignore */
                className: 'highcharts-vertical-label',
                /** @ignore */
                start: function (e) {
                    var closestPoint = bindingsUtils.attractToPoint(e, this.chart),
                        type = 'verticalLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'verticalLabel',
                            type: type,
                            typeOptions: {
                                point: {
                                    x: closestPoint.x,
                                    y: closestPoint.y,
                                    xAxis: closestPoint.xAxis,
                                    yAxis: closestPoint.yAxis
                                },
                                label: {
                                    offset: closestPoint.below ? 40 : -40
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: '#666666',
                                    fontSize: '11px'
                                }
                            },
                            shapeOptions: {
                                stroke: 'rgba(0, 0, 0, 0.75)',
                                strokeWidth: 1
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions),
                        annotation;

                    annotation = this.chart.addAnnotation(options);

                    annotation.options.events.click.call(annotation, {});
                }
            },
            /**
             * A vertical arrow annotation bindings. Includes `start` event. On click,
             * finds the closest point and marks it with an arrow. Green arrow when
             * pointing from above, red when pointing from below the point.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-arrow", "start": function() {}, "annotationOptions": {}}
             */
            verticalArrow: {
                /** @ignore */
                className: 'highcharts-vertical-arrow',
                /** @ignore */
                start: function (e) {
                    var closestPoint = bindingsUtils.attractToPoint(e, this.chart),
                        type = 'verticalLine',
                        navigation = this.chart.options.navigation,
                        bindings = navigation && navigation.bindings,
                        options = merge({
                            langKey: 'verticalArrow',
                            type: type,
                            typeOptions: {
                                point: {
                                    x: closestPoint.x,
                                    y: closestPoint.y,
                                    xAxis: closestPoint.xAxis,
                                    yAxis: closestPoint.yAxis
                                },
                                label: {
                                    offset: closestPoint.below ? 40 : -40,
                                    format: ' '
                                },
                                connector: {
                                    fill: 'none',
                                    stroke: closestPoint.below ? 'red' : 'green'
                                }
                            },
                            shapeOptions: {
                                stroke: 'rgba(0, 0, 0, 0.75)',
                                strokeWidth: 1
                            }
                        },
                        navigation.annotationsOptions,
                        bindings[type] && bindings[type].annotationsOptions),
                        annotation;

                    annotation = this.chart.addAnnotation(options);

                    annotation.options.events.click.call(annotation, {});
                }
            },
            // Flag types:
            /**
             * A flag series bindings. Includes `start` event. On click, finds the
             * closest point and marks it with a flag with `'circlepin'` shape.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-circlepin", "start": function() {}, "annotationOptions": {}}
             */
            flagCirclepin: {
                /** @ignore */
                className: 'highcharts-flag-circlepin',
                /** @ignore */
                start: bindingsUtils
                    .addFlagFromForm('circlepin')
            },
            /**
             * A flag series bindings. Includes `start` event. On click, finds the
             * closest point and marks it with a flag with `'diamondpin'` shape.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-diamondpin", "start": function() {}, "annotationOptions": {}}
             */
            flagDiamondpin: {
                /** @ignore */
                className: 'highcharts-flag-diamondpin',
                /** @ignore */
                start: bindingsUtils
                    .addFlagFromForm('flag')
            },
            /**
             * A flag series bindings. Includes `start` event.
             * On click, finds the closest point and marks it with a flag with
             * `'squarepin'` shape.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-squarepin", "start": function() {}, "annotationOptions": {}}
             */
            flagSquarepin: {
                /** @ignore */
                className: 'highcharts-flag-squarepin',
                /** @ignore */
                start: bindingsUtils
                    .addFlagFromForm('squarepin')
            },
            /**
             * A flag series bindings. Includes `start` event.
             * On click, finds the closest point and marks it with a flag without pin
             * shape.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-simplepin", "start": function() {}, "annotationOptions": {}}
             */
            flagSimplepin: {
                /** @ignore */
                className: 'highcharts-flag-simplepin',
                /** @ignore */
                start: bindingsUtils
                    .addFlagFromForm('nopin')
            },
            // Other tools:
            /**
             * Enables zooming in xAxis on a chart. Includes `start` event which
             * changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-x", "init": function() {}, "annotationOptions": {}}
             */
            zoomX: {
                /** @ignore */
                className: 'highcharts-zoom-x',
                /** @ignore */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zoomType: 'x'
                        }
                    });

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Enables zooming in yAxis on a chart. Includes `start` event which
             * changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-y", "init": function() {}, "annotationOptions": {}}
             */
            zoomY: {
                /** @ignore */
                className: 'highcharts-zoom-y',
                /** @ignore */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zoomType: 'y'
                        }
                    });
                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Enables zooming in xAxis and yAxis on a chart. Includes `start` event
             * which changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-xy", "init": function() {}, "annotationOptions": {}}
             */
            zoomXY: {
                /** @ignore */
                className: 'highcharts-zoom-xy',
                /** @ignore */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zoomType: 'xy'
                        }
                    });

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Changes main series to `'line'` type.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-line", "init": function() {}, "annotationOptions": {}}
             */
            seriesTypeLine: {
                /** @ignore */
                className: 'highcharts-series-type-line',
                /** @ignore */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'line',
                        useOhlcData: true
                    });

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Changes main series to `'ohlc'` type.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-ohlc", "init": function() {}, "annotationOptions": {}}
             */
            seriesTypeOhlc: {
                /** @ignore */
                className: 'highcharts-series-type-ohlc',
                /** @ignore */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'ohlc'
                    });

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Changes main series to `'candlestick'` type.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-candlestick", "init": function() {}, "annotationOptions": {}}
             */
            seriesTypeCandlestick: {
                /** @ignore */
                className: 'highcharts-series-type-candlestick',
                /** @ignore */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'candlestick'
                    });

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Displays chart in fullscreen.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-full-screen", "init": function() {}, "annotationOptions": {}}
             */
            fullScreen: {
                /** @ignore */
                className: 'highcharts-full-screen',
                /** @ignore */
                init: function (button) {
                    var chart = this.chart;

                    chart.fullScreen = new H.FullScreen(chart.container);

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Hides/shows two price indicators:
             * - last price in the dataset
             * - last price in the selected range
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-current-price-indicator", "init": function() {}, "annotationOptions": {}}
             */
            currentPriceIndicator: {
                /** @ignore */
                className: 'highcharts-current-price-indicator',
                /** @ignore */
                init: function (button) {
                    var series = this.chart.series[0],
                        options = series.options,
                        lastVisiblePrice = options.lastVisiblePrice &&
                                        options.lastVisiblePrice.enabled,
                        lastPrice = options.lastPrice && options.lastPrice.enabled,
                        gui = this.chart.stockTools;

                    if (gui && gui.guiEnabled) {
                        if (lastPrice) {
                            button.firstChild.style['background-image'] =
                                'url("' + gui.options.iconsURL +
                                'current-price-show.svg")';
                        } else {
                            button.firstChild.style['background-image'] =
                                'url("' + gui.options.iconsURL +
                                'current-price-hide.svg")';
                        }
                    }

                    series.update({
                        // line
                        lastPrice: {
                            enabled: !lastPrice,
                            color: 'red'
                        },
                        // label
                        lastVisiblePrice: {
                            enabled: !lastVisiblePrice,
                            label: {
                                enabled: true
                            }
                        }
                    });

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Indicators bindings. Includes `init` event to show a popup.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-indicators", "init": function() {}, "annotationOptions": {}}
             */
            indicators: {
                /** @ignore */
                className: 'highcharts-indicators',
                /** @ignore */
                init: function () {
                    var navigation = this;

                    fireEvent(
                        navigation,
                        'showPopup',
                        {
                            formType: 'indicators',
                            options: {},
                            // Callback on submit:
                            onSubmit: function (data) {
                                navigation.utils.manageIndicators.call(
                                    navigation,
                                    data
                                );
                            }
                        }
                    );
                }
            },
            /**
             * Hides/shows all annotations on a chart.
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-toggle-annotations", "init": function() {}, "annotationOptions": {}}
             */
            toggleAnnotations: {
                /** @ignore */
                className: 'highcharts-toggle-annotations',
                /** @ignore */
                init: function (button) {
                    var gui = this.chart.stockTools;

                    this.toggledAnnotations = !this.toggledAnnotations;

                    (this.chart.annotations || []).forEach(function (annotation) {
                        annotation.setVisibility(!this.toggledAnnotations);
                    }, this);

                    if (gui && gui.guiEnabled) {
                        if (this.toggledAnnotations) {
                            button.firstChild.style['background-image'] =
                                'url("' + gui.options.iconsURL +
                                    'annotations-hidden.svg")';
                        } else {
                            button.firstChild.style['background-image'] =
                                'url("' + gui.options.iconsURL +
                                    'annotations-visible.svg")';
                        }
                    }

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            },
            /**
             * Save a chart in localStorage under `highcharts-chart` key.
             * Stored items:
             * - annotations
             * - indicators (with yAxes)
             * - flags
             *
             * @type    {Highcharts.StockToolsBindingsObject}
             * @product highstock
             * @default {"className": "highcharts-save-chart", "init": function() {}, "annotationOptions": {}}
             */
            saveChart: {
                /** @ignore */
                className: 'highcharts-save-chart',
                /** @ignore */
                init: function (button) {
                    var navigation = this,
                        chart = navigation.chart,
                        annotations = [],
                        indicators = [],
                        flags = [],
                        yAxes = [];

                    chart.annotations.forEach(function (annotation, index) {
                        annotations[index] = annotation.userOptions;
                    });

                    chart.series.forEach(function (series) {
                        if (series instanceof H.seriesTypes.sma) {
                            indicators.push(series.userOptions);
                        } else if (series.type === 'flags') {
                            flags.push(series.userOptions);
                        }
                    });

                    chart.yAxis.forEach(function (yAxis) {
                        if (navigation.utils.isNotNavigatorYAxis(yAxis)) {
                            yAxes.push(yAxis.options);
                        }
                    });

                    H.win.localStorage.setItem(
                        PREFIX + 'chart',
                        JSON.stringify({
                            annotations: annotations,
                            indicators: indicators,
                            flags: flags,
                            yAxes: yAxes
                        })
                    );

                    fireEvent(
                        this,
                        'deselectButton',
                        { button: button }
                    );
                }
            }
        };

        H.setOptions({
            navigation: {
                bindings: stockToolsBindings
            }
        });

    });
    _registerModule(_modules, 'modules/stock-tools-gui.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * GUI generator for Stock tools
         *
         * (c) 2009-2017 Sebastian Bochan
         *
         * License: www.highcharts.com/license
         */

        var addEvent = H.addEvent,
            createElement = H.createElement,
            pick = H.pick,
            isArray = H.isArray,
            fireEvent = H.fireEvent,
            getStyle = H.getStyle,
            merge = H.merge,
            css = H.css,
            win = H.win,
            DIV = 'div',
            SPAN = 'span',
            UL = 'ul',
            LI = 'li',
            PREFIX = 'highcharts-',
            activeClass = PREFIX + 'active';

        H.setOptions({
            /**
             * @optionparent lang
             */
            lang: {
                /**
                 * Configure the stockTools GUI titles(hints) in the chart. Requires
                 * the `stock-tools.js` module to be loaded.
                 *
                 * @product         highstock
                 * @since           7.0.0
                 * @type            {Object}
                 */
                stockTools: {
                    gui: {
                        // Main buttons:
                        simpleShapes: 'Simple shapes',
                        lines: 'Lines',
                        crookedLines: 'Crooked lines',
                        measure: 'Measure',
                        advanced: 'Advanced',
                        toggleAnnotations: 'Toggle annotations',
                        verticalLabels: 'Vertical labels',
                        flags: 'Flags',
                        zoomChange: 'Zoom change',
                        typeChange: 'Type change',
                        saveChart: 'Save chart',
                        indicators: 'Indicators',
                        currentPriceIndicator: 'Current Price Indicators',

                        // Other features:
                        zoomX: 'Zoom X',
                        zoomY: 'Zoom Y',
                        zoomXY: 'Zooom XY',
                        fullScreen: 'Fullscreen',
                        typeOHLC: 'OHLC',
                        typeLine: 'Line',
                        typeCandlestick: 'Candlestick',

                        // Basic shapes:
                        circle: 'Circle',
                        label: 'Label',
                        rectangle: 'Rectangle',

                        // Flags:
                        flagCirclepin: 'Flag circle',
                        flagDiamondpin: 'Flag diamond',
                        flagSquarepin: 'Flag square',
                        flagSimplepin: 'Flag simple',

                        // Measures:
                        measureXY: 'Measure XY',
                        measureX: 'Measure X',
                        measureY: 'Measure Y',

                        // Segment, ray and line:
                        segment: 'Segment',
                        arrowSegment: 'Arrow segment',
                        ray: 'Ray',
                        arrowRay: 'Arrow ray',
                        line: 'Line',
                        arrowLine: 'Arrow line',
                        horizontalLine: 'Horizontal line',
                        verticalLine: 'Vertical line',
                        infinityLine: 'Infinity line',

                        // Crooked lines:
                        crooked3: 'Crooked 3 line',
                        crooked5: 'Crooked 5 line',
                        elliott3: 'Elliott 3 line',
                        elliott5: 'Elliott 5 line',

                        // Counters:
                        verticalCounter: 'Vertical counter',
                        verticalLabel: 'Vertical label',
                        verticalArrow: 'Vertical arrow',

                        // Advanced:
                        fibonacci: 'Fibonacci',
                        pitchfork: 'Pitchfork',
                        parallelChannel: 'Parallel channel'
                    }
                },
                navigation: {
                    popup: {
                        // Annotations:
                        circle: 'Circle',
                        rectangle: 'Rectangle',
                        label: 'Label',
                        segment: 'Segment',
                        arrowSegment: 'Arrow segment',
                        ray: 'Ray',
                        arrowRay: 'Arrow ray',
                        line: 'Line',
                        arrowLine: 'Arrow line',
                        horizontalLine: 'Horizontal line',
                        verticalLine: 'Vertical line',
                        crooked3: 'Crooked 3 line',
                        crooked5: 'Crooked 5 line',
                        elliott3: 'Elliott 3 line',
                        elliott5: 'Elliott 5 line',
                        verticalCounter: 'Vertical counter',
                        verticalLabel: 'Vertical label',
                        verticalArrow: 'Vertical arrow',
                        fibonacci: 'Fibonacci',
                        pitchfork: 'Pitchfork',
                        parallelChannel: 'Parallel channel',
                        infinityLine: 'Infinity line',
                        measure: 'Measure',
                        measureXY: 'Measure XY',
                        measureX: 'Measure X',
                        measureY: 'Measure Y',

                        // Flags:
                        flags: 'Flags',

                        // GUI elements:
                        addButton: 'add',
                        saveButton: 'save',
                        editButton: 'edit',
                        removeButton: 'remove',
                        series: 'Series',
                        volume: 'Volume',
                        connector: 'Connector',

                        // Field names:
                        innerBackground: 'Inner background',
                        outerBackground: 'Outer background',
                        crosshairX: 'Crosshair X',
                        crosshairY: 'Crosshair Y',
                        tunnel: 'Tunnel',
                        background: 'Background'
                    }
                }
            },
            /**
             * Configure the stockTools gui strings in the chart. Requires the
             * [stockTools module]() to be loaded. For a description of the module
             * and information on its features, see [Highcharts StockTools]().
             *
             * @product highstock
             *
             * @sample stock/demo/stock-tools-gui Stock Tools GUI
             *
             * @sample stock/demo/stock-tools-custom-gui Stock Tools customized GUI
             *
             * @since 7.0.0
             * @type {Object}
             * @optionparent stockTools
             */
            stockTools: {
                /**
                 * Definitions of buttons in Stock Tools GUI.
                 */
                gui: {
                    /**
                     * Enable or disable the stockTools gui.
                     *
                     * @type      {boolean}
                     * @default true
                     */
                    enabled: true,
                    /**
                     * A CSS class name to apply to the stocktools' div,
                     * allowing unique CSS styling for each chart.
                     *
                     * @type      {string}
                     * @default 'highcharts-bindings-wrapper'
                     *
                     */
                    className: 'highcharts-bindings-wrapper',
                    /**
                     * A CSS class name to apply to the container of buttons,
                     * allowing unique CSS styling for each chart.
                     *
                     * @type      {string}
                     * @default 'stocktools-toolbar'
                     *
                     */
                    toolbarClassName: 'stocktools-toolbar',
                    /**
                     * Path where Highcharts will look for icons. Change this to use
                     * icons from a different server.
                     */
                    iconsURL: 'https://code.highcharts.com/7.1.2/gfx/stock-icons/',
                    /**
                     * A collection of strings pointing to config options for the
                     * toolbar items. Each name refers to unique key from definitions
                     * object.
                     *
                     * @type      {array}
                     *
                     * @default [
                     *  'indicators',
                     *   'separator',
                     *   'simpleShapes',
                     *   'lines',
                     *   'crookedLines',
                     *   'measure',
                     *   'advanced',
                     *   'toggleAnnotations',
                     *   'separator',
                     *   'verticalLabels',
                     *   'flags',
                     *   'separator',
                     *   'zoomChange',
                     *   'fullScreen',
                     *   'typeChange',
                     *   'separator',
                     *   'currentPriceIndicator',
                     *   'saveChart'
                     *  ]
                     */
                    buttons: [
                        'indicators',
                        'separator',
                        'simpleShapes',
                        'lines',
                        'crookedLines',
                        'measure',
                        'advanced',
                        'toggleAnnotations',
                        'separator',
                        'verticalLabels',
                        'flags',
                        'separator',
                        'zoomChange',
                        'fullScreen',
                        'typeChange',
                        'separator',
                        'currentPriceIndicator',
                        'saveChart'
                    ],
                    /**
                     * An options object of the buttons definitions. Each name refers to
                     * unique key from buttons array.
                     *
                     * @type      {object}
                     *
                     */
                    definitions: {
                        separator: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'separator.svg'
                        },
                        simpleShapes: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'label',
                             *   'circle',
                             *   'rectangle'
                             * ]
                             *
                             */
                            items: [
                                'label',
                                'circle',
                                'rectangle'
                            ],
                            circle: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 *
                                 */
                                symbol: 'circle.svg'
                            },
                            rectangle: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 *
                                 */
                                symbol: 'rectangle.svg'
                            },
                            label: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 *
                                 */
                                symbol: 'label.svg'
                            }
                        },
                        flags: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'flagCirclepin',
                             *   'flagDiamondpin',
                             *   'flagSquarepin',
                             *   'flagSimplepin'
                             * ]
                             *
                             */
                            items: [
                                'flagCirclepin',
                                'flagDiamondpin',
                                'flagSquarepin',
                                'flagSimplepin'
                            ],
                            flagSimplepin: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 *
                                 */
                                symbol: 'flag-basic.svg'
                            },
                            flagDiamondpin: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 *
                                 */
                                symbol: 'flag-diamond.svg'
                            },
                            flagSquarepin: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'flag-trapeze.svg'
                            },
                            flagCirclepin: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'flag-elipse.svg'
                            }
                        },
                        lines: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'segment',
                             *   'arrowSegment',
                             *   'ray',
                             *   'arrowRay',
                             *   'line',
                             *   'arrowLine',
                             *   'horizontalLine',
                             *   'verticalLine'
                             * ]
                             */
                            items: [
                                'segment',
                                'arrowSegment',
                                'ray',
                                'arrowRay',
                                'line',
                                'arrowLine',
                                'horizontalLine',
                                'verticalLine'
                            ],
                            segment: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'segment.svg'
                            },
                            arrowSegment: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'arrow-segment.svg'
                            },
                            ray: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'ray.svg'
                            },
                            arrowRay: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'arrow-ray.svg'
                            },
                            line: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'line.svg'
                            },
                            arrowLine: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'arrow-line.svg'
                            },
                            verticalLine: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'vertical-line.svg'
                            },
                            horizontalLine: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'horizontal-line.svg'
                            }
                        },
                        crookedLines: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'elliott3',
                             *   'elliott5',
                             *   'crooked3',
                             *   'crooked5'
                             * ]
                             *
                             */
                            items: [
                                'elliott3',
                                'elliott5',
                                'crooked3',
                                'crooked5'
                            ],
                            crooked3: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'crooked-3.svg'
                            },
                            crooked5: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'crooked-5.svg'
                            },
                            elliott3: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'elliott-3.svg'
                            },
                            elliott5: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'elliott-5.svg'
                            }
                        },
                        verticalLabels: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'verticalCounter',
                             *   'verticalLabel',
                             *   'verticalArrow'
                             * ]
                             */
                            items: [
                                'verticalCounter',
                                'verticalLabel',
                                'verticalArrow'
                            ],
                            verticalCounter: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'vertical-counter.svg'
                            },
                            verticalLabel: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'vertical-label.svg'
                            },
                            verticalArrow: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'vertical-arrow.svg'
                            }
                        },
                        advanced: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'fibonacci',
                             *   'pitchfork',
                             *   'parallelChannel'
                             * ]
                             */
                            items: [
                                'fibonacci',
                                'pitchfork',
                                'parallelChannel'
                            ],
                            pitchfork: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'pitchfork.svg'
                            },
                            fibonacci: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'fibonacci.svg'
                            },
                            parallelChannel: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'parallel-channel.svg'
                            }
                        },
                        measure: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'measureXY',
                             *   'measureX',
                             *   'measureY'
                             * ]
                             */
                            items: [
                                'measureXY',
                                'measureX',
                                'measureY'
                            ],
                            measureX: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'measure-x.svg'
                            },
                            measureY: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'measure-y.svg'
                            },
                            measureXY: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'measure-xy.svg'
                            }
                        },
                        toggleAnnotations: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'annotations-visible.svg'
                        },
                        currentPriceIndicator: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'current-price-show.svg'
                        },
                        indicators: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'indicators.svg'
                        },
                        zoomChange: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'zoomX',
                             *   'zoomY',
                             *   'zoomXY'
                             * ]
                             */
                            items: [
                                'zoomX',
                                'zoomY',
                                'zoomXY'
                            ],
                            zoomX: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'zoom-x.svg'
                            },
                            zoomY: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'zoom-y.svg'
                            },
                            zoomXY: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'zoom-xy.svg'
                            }
                        },
                        typeChange: {
                            /**
                             * A collection of strings pointing to config options for
                             * the items.
                             *
                             * @type {array}
                             * @default [
                             *   'typeOHLC',
                             *   'typeLine',
                             *   'typeCandlestick'
                             * ]
                             */
                            items: [
                                'typeOHLC',
                                'typeLine',
                                'typeCandlestick'
                            ],
                            typeOHLC: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'series-ohlc.svg'
                            },
                            typeLine: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'series-line.svg'
                            },
                            typeCandlestick: {
                                /**
                                 * A predefined background symbol for the button.
                                 *
                                 * @type   {string}
                                 */
                                symbol: 'series-candlestick.svg'
                            }
                        },
                        fullScreen: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'fullscreen.svg'
                        },
                        saveChart: {
                            /**
                             * A predefined background symbol for the button.
                             *
                             * @type   {string}
                             */
                            symbol: 'save-chart.svg'
                        }
                    }
                }
            }
        });

        // Run HTML generator
        addEvent(H.Chart, 'afterGetContainer', function () {
            this.setStockTools();
        });

        addEvent(H.Chart, 'getMargins', function () {
            var listWrapper = this.stockTools && this.stockTools.listWrapper,
                offsetWidth = listWrapper && (
                    (
                        listWrapper.startWidth +
                        H.getStyle(listWrapper, 'padding-left') +
                        H.getStyle(listWrapper, 'padding-right')
                    ) || listWrapper.offsetWidth
                );

            if (offsetWidth && offsetWidth < this.plotWidth) {
                this.plotLeft += offsetWidth;
            }
        });

        addEvent(H.Chart, 'destroy', function () {
            if (this.stockTools) {
                this.stockTools.destroy();
            }
        });

        addEvent(H.Chart, 'redraw', function () {
            if (this.stockTools && this.stockTools.guiEnabled) {
                this.stockTools.redraw();
            }
        });

        /*
         * Toolbar Class
         *
         * @param {Object} - options of toolbar
         * @param {Chart} - Reference to chart
         *
         */

        H.Toolbar = function (options, langOptions, chart) {
            this.chart = chart;
            this.options = options;
            this.lang = langOptions;

            this.guiEnabled = options.enabled;
            this.visible = pick(options.visible, true);
            this.placed = pick(options.placed, false);

            // General events collection which should be removed upon destroy/update:
            this.eventsToUnbind = [];

            if (this.guiEnabled) {
                this.createHTML();

                this.init();

                this.showHideNavigatorion();
            }

            fireEvent(this, 'afterInit');
        };

        H.extend(H.Chart.prototype, {
            /*
             * Verify if Toolbar should be added.
             *
             * @param {Object} - chart options
             *
             */
            setStockTools: function (options) {
                var chartOptions = this.options,
                    lang = chartOptions.lang,
                    guiOptions = merge(
                        chartOptions.stockTools && chartOptions.stockTools.gui,
                        options && options.gui
                    ),
                    langOptions = lang.stockTools && lang.stockTools.gui;

                this.stockTools = new H.Toolbar(guiOptions, langOptions, this);

                if (this.stockTools.guiEnabled) {
                    this.isDirtyBox = true;
                }
            }
        });

        H.Toolbar.prototype = {
            /*
             * Initialize the toolbar. Create buttons and submenu for each option
             * defined in `stockTools.gui`.
             *
             */
            init: function () {
                var _self = this,
                    lang = this.lang,
                    guiOptions = this.options,
                    toolbar = this.toolbar,
                    addSubmenu = _self.addSubmenu,
                    buttons = guiOptions.buttons,
                    defs = guiOptions.definitions,
                    allButtons = toolbar.childNodes,
                    inIframe = this.inIframe(),
                    button;

                // create buttons
                buttons.forEach(function (btnName) {

                    button = _self.addButton(toolbar, defs, btnName, lang);

                    if (inIframe && btnName === 'fullScreen') {
                        button.buttonWrapper.className += ' ' + PREFIX + 'disabled-btn';
                    }

                    ['click', 'touchstart'].forEach(function (eventName) {
                        addEvent(button.buttonWrapper, eventName, function () {
                            _self.eraseActiveButtons(
                                allButtons,
                                button.buttonWrapper
                            );
                        });
                    });

                    if (isArray(defs[btnName].items)) {
                        // create submenu buttons
                        addSubmenu.call(_self, button, defs[btnName]);
                    }
                });
            },
            /*
             * Create submenu (list of buttons) for the option. In example main button
             * is Line, in submenu will be buttons with types of lines.
             *
             * @param {Object} - button which has submenu
             * @param {Array} - list of all buttons
             *
             */
            addSubmenu: function (parentBtn, button) {
                var _self = this,
                    submenuArrow = parentBtn.submenuArrow,
                    buttonWrapper = parentBtn.buttonWrapper,
                    buttonWidth = getStyle(buttonWrapper, 'width'),
                    wrapper = this.wrapper,
                    menuWrapper = this.listWrapper,
                    allButtons = this.toolbar.childNodes,
                    topMargin = 0,
                    submenuWrapper;

                // create submenu container
                this.submenu = submenuWrapper = createElement(UL, {
                    className: PREFIX + 'submenu-wrapper'
                }, null, buttonWrapper);

                // create submenu buttons and select the first one
                this.addSubmenuItems(buttonWrapper, button);

                // show / hide submenu
                ['click', 'touchstart'].forEach(function (eventName) {
                    addEvent(submenuArrow, eventName, function (e) {

                        e.stopPropagation();
                        // Erase active class on all other buttons
                        _self.eraseActiveButtons(allButtons, buttonWrapper);

                        // hide menu
                        if (buttonWrapper.className.indexOf(PREFIX + 'current') >= 0) {
                            menuWrapper.style.width = menuWrapper.startWidth + 'px';
                            buttonWrapper.classList.remove(PREFIX + 'current');
                            submenuWrapper.style.display = 'none';
                        } else {
                            // show menu
                            // to calculate height of element
                            submenuWrapper.style.display = 'block';

                            topMargin = submenuWrapper.offsetHeight -
                                        buttonWrapper.offsetHeight - 3;

                            // calculate position of submenu in the box
                            // if submenu is inside, reset top margin
                            if (
                                // cut on the bottom
                                !(submenuWrapper.offsetHeight +
                                    buttonWrapper.offsetTop >
                                wrapper.offsetHeight &&
                                // cut on the top
                                buttonWrapper.offsetTop > topMargin)
                            ) {
                                topMargin = 0;
                            }

                            // apply calculated styles
                            css(submenuWrapper, {
                                top: -topMargin + 'px',
                                left: buttonWidth + 3 + 'px'
                            });

                            buttonWrapper.className += ' ' + PREFIX + 'current';
                            menuWrapper.startWidth = wrapper.offsetWidth;
                            menuWrapper.style.width = menuWrapper.startWidth +
                                            H.getStyle(menuWrapper, 'padding-left') +
                                            submenuWrapper.offsetWidth + 3 + 'px';
                        }
                    });
                });
            },
            /*
             * Create buttons in submenu
             *
             * @param {HTMLDOMElement} - button where submenu is placed
             * @param {Array} - list of all buttons options
             *
             */
            addSubmenuItems: function (buttonWrapper, button) {
                var _self = this,
                    submenuWrapper = this.submenu,
                    lang = this.lang,
                    menuWrapper = this.listWrapper,
                    items = button.items,
                    firstSubmenuItem,
                    submenuBtn;

                // add items to submenu
                items.forEach(function (btnName) {
                    // add buttons to submenu
                    submenuBtn = _self.addButton(
                        submenuWrapper,
                        button,
                        btnName,
                        lang
                    );

                    ['click', 'touchstart'].forEach(function (eventName) {
                        addEvent(submenuBtn.mainButton, eventName, function () {
                            _self.switchSymbol(this, buttonWrapper, true);
                            menuWrapper.style.width = menuWrapper.startWidth + 'px';
                            submenuWrapper.style.display = 'none';
                        });
                    });
                });

                // select first submenu item
                firstSubmenuItem = submenuWrapper
                    .querySelectorAll('li > .' + PREFIX + 'menu-item-btn')[0];

                // replace current symbol, in main button, with submenu's button style
                _self.switchSymbol(firstSubmenuItem, false);
            },
            /*
             * Erase active class on all other buttons.
             *
             * @param {Array} - Array of HTML buttons
             * @param {HTMLDOMElement} - Current HTML button
             *
             */
            eraseActiveButtons: function (buttons, currentButton, submenuItems) {
                [].forEach.call(buttons, function (btn) {
                    if (btn !== currentButton) {
                        btn.classList.remove(PREFIX + 'current');
                        btn.classList.remove(PREFIX + 'active');
                        submenuItems =
                            btn.querySelectorAll('.' + PREFIX + 'submenu-wrapper');

                        // hide submenu
                        if (submenuItems.length > 0) {
                            submenuItems[0].style.display = 'none';
                        }
                    }
                });
            },
            /*
             * Create single button. Consist of `<li>` , `<span>` and (if exists)
             * submenu container.
             *
             * @param {HTMLDOMElement} - HTML reference, where button should be added
             * @param {Object} - all options, by btnName refer to particular button
             * @param {String} - name of functionality mapped for specific class
             * @param {Object} - All titles, by btnName refer to particular button
             *
             * @return {Object} - references to all created HTML elements
             */
            addButton: function (target, options, btnName, lang) {
                var guiOptions = this.options,
                    btnOptions = options[btnName],
                    items = btnOptions.items,
                    classMapping = H.Toolbar.prototype.classMapping,
                    userClassName = btnOptions.className || '',
                    mainButton,
                    submenuArrow,
                    buttonWrapper;

                // main button wrapper
                buttonWrapper = createElement(LI, {
                    className: pick(classMapping[btnName], '') + ' ' + userClassName,
                    title: lang[btnName] || btnName
                }, null, target);

                // single button
                mainButton = createElement(SPAN, {
                    className: PREFIX + 'menu-item-btn'
                }, null, buttonWrapper);


                // submenu
                if (items && items.length > 1) {

                    // arrow is a hook to show / hide submenu
                    submenuArrow = createElement(SPAN, {
                        className: PREFIX + 'submenu-item-arrow ' +
                            PREFIX + 'arrow-right'
                    }, null, buttonWrapper);
                } else {
                    mainButton.style['background-image'] = 'url(' +
                        guiOptions.iconsURL + btnOptions.symbol + ')';
                }

                return {
                    buttonWrapper: buttonWrapper,
                    mainButton: mainButton,
                    submenuArrow: submenuArrow
                };
            },
            /*
             * Create navigation's HTML elements: container and arrows.
             *
             */
            addNavigation: function () {
                var stockToolbar = this,
                    wrapper = stockToolbar.wrapper;

                // arrow wrapper
                stockToolbar.arrowWrapper = createElement(DIV, {
                    className: PREFIX + 'arrow-wrapper'
                });

                stockToolbar.arrowUp = createElement(DIV, {
                    className: PREFIX + 'arrow-up'
                }, null, stockToolbar.arrowWrapper);

                stockToolbar.arrowDown = createElement(DIV, {
                    className: PREFIX + 'arrow-down'
                }, null, stockToolbar.arrowWrapper);

                wrapper.insertBefore(
                    stockToolbar.arrowWrapper,
                    wrapper.childNodes[0]
                );

                // attach scroll events
                stockToolbar.scrollButtons();
            },
            /*
             * Add events to navigation (two arrows) which allows user to scroll
             * top/down GUI buttons, if container's height is not enough.
             *
             */
            scrollButtons: function () {
                var targetY = 0,
                    _self = this,
                    wrapper = _self.wrapper,
                    toolbar = _self.toolbar,
                    step = 0.1 * wrapper.offsetHeight; // 0.1 = 10%

                ['click', 'touchstart'].forEach(function (eventName) {
                    addEvent(_self.arrowUp, eventName, function () {
                        if (targetY > 0) {
                            targetY -= step;
                            toolbar.style['margin-top'] = -targetY + 'px';
                        }
                    });

                    addEvent(_self.arrowDown, eventName, function () {
                        if (
                            wrapper.offsetHeight + targetY <=
                            toolbar.offsetHeight + step
                        ) {
                            targetY += step;
                            toolbar.style['margin-top'] = -targetY + 'px';
                        }
                    });
                });
            },
            /*
             * Create stockTools HTML main elements.
             *
             */
            createHTML: function () {
                var stockToolbar = this,
                    chart = stockToolbar.chart,
                    guiOptions = stockToolbar.options,
                    container = chart.container,
                    navigation = chart.options.navigation,
                    bindingsClassName = navigation && navigation.bindingsClassName,
                    listWrapper,
                    toolbar,
                    wrapper;

                // create main container
                stockToolbar.wrapper = wrapper = createElement(DIV, {
                    className: PREFIX + 'stocktools-wrapper ' +
                        guiOptions.className + ' ' + bindingsClassName
                });
                container.parentNode.insertBefore(wrapper, container);

                // toolbar
                stockToolbar.toolbar = toolbar = createElement(UL, {
                    className: PREFIX + 'stocktools-toolbar ' +
                            guiOptions.toolbarClassName
                });

                // add container for list of buttons
                stockToolbar.listWrapper = listWrapper = createElement(DIV, {
                    className: PREFIX + 'menu-wrapper'
                });

                wrapper.insertBefore(listWrapper, wrapper.childNodes[0]);
                listWrapper.insertBefore(toolbar, listWrapper.childNodes[0]);

                stockToolbar.showHideToolbar();

                // add navigation which allows user to scroll down / top GUI buttons
                stockToolbar.addNavigation();
            },
            /*
             * Function called in redraw verifies if the navigation should be visible.
             *
             */
            showHideNavigatorion: function () {
                // arrows
                // 50px space for arrows
                if (
                    this.visible &&
                    this.toolbar.offsetHeight > (this.wrapper.offsetHeight - 50)
                ) {
                    this.arrowWrapper.style.display = 'block';
                } else {
                    // reset margin if whole toolbar is visible
                    this.toolbar.style.marginTop = '0px';

                    // hide arrows
                    this.arrowWrapper.style.display = 'none';
                }
            },
            /*
             * Create button which shows or hides GUI toolbar.
             *
             */
            showHideToolbar: function () {
                var stockToolbar = this,
                    chart = this.chart,
                    wrapper = stockToolbar.wrapper,
                    toolbar = this.listWrapper,
                    submenu = this.submenu,
                    visible = this.visible,
                    showhideBtn;

                // Show hide toolbar
                this.showhideBtn = showhideBtn = createElement(DIV, {
                    className: PREFIX + 'toggle-toolbar ' + PREFIX + 'arrow-left'
                }, null, wrapper);

                if (!visible) {
                    // hide
                    if (submenu) {
                        submenu.style.display = 'none';
                    }
                    showhideBtn.style.left = '0px';
                    stockToolbar.visible = visible = false;

                    toolbar.classList.add(PREFIX + 'hide');
                    showhideBtn.classList.toggle(PREFIX + 'arrow-right');
                    wrapper.style.height = showhideBtn.offsetHeight + 'px';
                } else {
                    wrapper.style.height = '100%';
                    showhideBtn.style.top = H.getStyle(toolbar, 'padding-top') + 'px';
                    showhideBtn.style.left = (
                        wrapper.offsetWidth +
                        H.getStyle(toolbar, 'padding-left')
                    ) + 'px';
                }

                // toggle menu
                ['click', 'touchstart'].forEach(function (eventName) {
                    addEvent(showhideBtn, eventName, function () {
                        chart.update({
                            stockTools: {
                                gui: {
                                    visible: !visible,
                                    placed: true
                                }
                            }
                        });
                    });
                });
            },
            /*
             * In main GUI button, replace icon and class with submenu button's
             * class / symbol.
             *
             * @param {HTMLDOMElement} - submenu button
             * @param {Boolean} - true or false
             *
             */
            switchSymbol: function (button, redraw) {
                var buttonWrapper = button.parentNode,
                    buttonWrapperClass = buttonWrapper.classList.value,
                    // main button in first level og GUI
                    mainNavButton = buttonWrapper.parentNode.parentNode;

                // set class
                mainNavButton.className = '';
                if (buttonWrapperClass) {
                    mainNavButton.classList.add(buttonWrapperClass.trim());
                }

                // set icon
                mainNavButton.querySelectorAll('.' + PREFIX + 'menu-item-btn')[0]
                    .style['background-image'] = button.style['background-image'];

                // set active class
                if (redraw) {
                    this.selectButton(mainNavButton);
                }
            },
            /*
             * Set select state (active class) on button.
             *
             * @param {HTMLDOMElement} - button
             *
             */
            selectButton: function (btn) {
                if (btn.className.indexOf(activeClass) >= 0) {
                    btn.classList.remove(activeClass);
                } else {
                    btn.classList.add(activeClass);
                }
            },
            /*
             * Remove active class from all buttons except defined.
             *
             * @param {HTMLDOMElement} - button which should not be deactivated
             *
             */
            unselectAllButtons: function (btn) {
                var activeButtons = btn.parentNode.querySelectorAll('.' + activeClass);

                [].forEach.call(activeButtons, function (activeBtn) {
                    if (activeBtn !== btn) {
                        activeBtn.classList.remove(activeClass);
                    }
                });
            },
            /*
             * Verify if chart is in iframe.
             *
             * @return {Object} - elements translations.
             */
            inIframe: function () {
                try {
                    return win.self !== win.top;
                } catch (e) {
                    return true;
                }
            },
            /*
             * Update GUI with given options.
             *
             * @param {Object} - general options for Stock Tools
             */
            update: function (options) {
                merge(true, this.chart.options.stockTools, options);
                this.destroy();
                this.chart.setStockTools(options);

                // If Stock Tools are updated, then bindings should be updated too:
                if (this.chart.navigationBindings) {
                    this.chart.navigationBindings.update();
                }
            },
            /*
             * Destroy all HTML GUI elements.
             *
             */
            destroy: function () {
                var stockToolsDiv = this.wrapper,
                    parent = stockToolsDiv && stockToolsDiv.parentNode;

                this.eventsToUnbind.forEach(function (unbinder) {
                    unbinder();
                });

                // Remove the empty element
                if (parent) {
                    parent.removeChild(stockToolsDiv);
                }

                // redraw
                this.chart.isDirtyBox = true;
                this.chart.redraw();
            },
            /*
             * Redraw, GUI requires to verify if the navigation should be visible.
             *
             */
            redraw: function () {
                this.showHideNavigatorion();
            },
            /*
             * Mapping JSON fields to CSS classes.
             *
             */
            classMapping: {
                circle: PREFIX + 'circle-annotation',
                rectangle: PREFIX + 'rectangle-annotation',
                label: PREFIX + 'label-annotation',
                segment: PREFIX + 'segment',
                arrowSegment: PREFIX + 'arrow-segment',
                ray: PREFIX + 'ray',
                arrowRay: PREFIX + 'arrow-ray',
                line: PREFIX + 'infinity-line',
                arrowLine: PREFIX + 'arrow-infinity-line',
                verticalLine: PREFIX + 'vertical-line',
                horizontalLine: PREFIX + 'horizontal-line',
                crooked3: PREFIX + 'crooked3',
                crooked5: PREFIX + 'crooked5',
                elliott3: PREFIX + 'elliott3',
                elliott5: PREFIX + 'elliott5',
                pitchfork: PREFIX + 'pitchfork',
                fibonacci: PREFIX + 'fibonacci',
                parallelChannel: PREFIX + 'parallel-channel',
                measureX: PREFIX + 'measure-x',
                measureY: PREFIX + 'measure-y',
                measureXY: PREFIX + 'measure-xy',
                verticalCounter: PREFIX + 'vertical-counter',
                verticalLabel: PREFIX + 'vertical-label',
                verticalArrow: PREFIX + 'vertical-arrow',
                currentPriceIndicator: PREFIX + 'current-price-indicator',
                indicators: PREFIX + 'indicators',
                flagCirclepin: PREFIX + 'flag-circlepin',
                flagDiamondpin: PREFIX + 'flag-diamondpin',
                flagSquarepin: PREFIX + 'flag-squarepin',
                flagSimplepin: PREFIX + 'flag-simplepin',
                zoomX: PREFIX + 'zoom-x',
                zoomY: PREFIX + 'zoom-y',
                zoomXY: PREFIX + 'zoom-xy',
                typeLine: PREFIX + 'series-type-line',
                typeOHLC: PREFIX + 'series-type-ohlc',
                typeCandlestick: PREFIX + 'series-type-candlestick',
                fullScreen: PREFIX + 'full-screen',
                toggleAnnotations: PREFIX + 'toggle-annotations',
                saveChart: PREFIX + 'save-chart',
                separator: PREFIX + 'separator'
            }
        };

        // Comunication with bindings:
        addEvent(H.NavigationBindings, 'selectButton', function (event) {
            var button = event.button,
                className = PREFIX + 'submenu-wrapper',
                gui = this.chart.stockTools;

            if (gui && gui.guiEnabled) {
                // Unslect other active buttons
                gui.unselectAllButtons(event.button);

                // If clicked on a submenu, select state for it's parent
                if (button.parentNode.className.indexOf(className) >= 0) {
                    button = button.parentNode.parentNode;
                }
                // Set active class on the current button
                gui.selectButton(button);
            }
        });


        addEvent(H.NavigationBindings, 'deselectButton', function (event) {
            var button = event.button,
                className = PREFIX + 'submenu-wrapper',
                gui = this.chart.stockTools;

            if (gui && gui.guiEnabled) {
                // If deselecting a button from a submenu, select state for it's parent
                if (button.parentNode.className.indexOf(className) >= 0) {
                    button = button.parentNode.parentNode;
                }
                gui.selectButton(button);
            }
        });

    });
    _registerModule(_modules, 'masters/modules/stock-tools.src.js', [], function () {


    });
}));