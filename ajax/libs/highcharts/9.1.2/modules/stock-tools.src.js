/**
 * @license Highstock JS v9.1.2 (2021-06-16)
 *
 * Advanced Highcharts Stock tools
 *
 * (c) 2010-2021 Highsoft AS
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
    _registerModule(_modules, 'Extensions/Annotations/Mixins/EventEmitterMixin.js', [_modules['Core/Globals.js'], _modules['Core/Utilities.js']], function (H, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            fireEvent = U.fireEvent,
            objectEach = U.objectEach,
            pick = U.pick,
            removeEvent = U.removeEvent;
        /* eslint-disable valid-jsdoc */
        /**
         * It provides methods for:
         * - adding and handling DOM events and a drag event,
         * - mapping a mouse move event to the distance between two following events.
         *   The units of the distance are specific to a transformation,
         *   e.g. for rotation they are radians, for scaling they are scale factors.
         *
         * @private
         * @mixin
         * @memberOf Annotation
         */
        var eventEmitterMixin = {
                /**
                 * Add emitter events.
                 */
                addEvents: function () {
                    var emitter = this,
            addMouseDownEvent = function (element) {
                        addEvent(element,
            H.isTouchDevice ? 'touchstart' : 'mousedown',
            function (e) {
                            emitter.onMouseDown(e);
                    }, { passive: false });
                };
                addMouseDownEvent(this.graphic.element);
                (emitter.labels || []).forEach(function (label) {
                    if (label.options.useHTML && label.graphic.text) {
                        // Mousedown event bound to HTML element (#13070).
                        addMouseDownEvent(label.graphic.text.element);
                    }
                });
                objectEach(emitter.options.events, function (event, type) {
                    var eventHandler = function (e) {
                            if (type !== 'click' || !emitter.cancelClick) {
                                event.call(emitter,
                        emitter.chart.pointer.normalize(e),
                        emitter.target);
                        }
                    };
                    if ((emitter.nonDOMEvents || []).indexOf(type) === -1) {
                        emitter.graphic.on(type, eventHandler);
                    }
                    else {
                        addEvent(emitter, type, eventHandler, { passive: false });
                    }
                });
                if (emitter.options.draggable) {
                    addEvent(emitter, 'drag', emitter.onDrag);
                    if (!emitter.graphic.renderer.styledMode) {
                        var cssPointer_1 = {
                                cursor: {
                                    x: 'ew-resize',
                                    y: 'ns-resize',
                                    xy: 'move'
                                }[emitter.options.draggable]
                            };
                        emitter.graphic.css(cssPointer_1);
                        (emitter.labels || []).forEach(function (label) {
                            if (label.options.useHTML && label.graphic.text) {
                                label.graphic.text.css(cssPointer_1);
                            }
                        });
                    }
                }
                if (!emitter.isUpdating) {
                    fireEvent(emitter, 'add');
                }
            },
            /**
             * Remove emitter document events.
             */
            removeDocEvents: function () {
                if (this.removeDrag) {
                    this.removeDrag = this.removeDrag();
                }
                if (this.removeMouseUp) {
                    this.removeMouseUp = this.removeMouseUp();
                }
            },
            /**
             * Mouse down handler.
             */
            onMouseDown: function (e) {
                var emitter = this,
                    pointer = emitter.chart.pointer,
                    prevChartX,
                    prevChartY;
                if (e.preventDefault) {
                    e.preventDefault();
                }
                // On right click, do nothing:
                if (e.button === 2) {
                    return;
                }
                e = pointer.normalize(e);
                prevChartX = e.chartX;
                prevChartY = e.chartY;
                emitter.cancelClick = false;
                emitter.chart.hasDraggedAnnotation = true;
                emitter.removeDrag = addEvent(H.doc, H.isTouchDevice ? 'touchmove' : 'mousemove', function (e) {
                    emitter.hasDragged = true;
                    e = pointer.normalize(e);
                    e.prevChartX = prevChartX;
                    e.prevChartY = prevChartY;
                    fireEvent(emitter, 'drag', e);
                    prevChartX = e.chartX;
                    prevChartY = e.chartY;
                }, H.isTouchDevice ? { passive: false } : void 0);
                emitter.removeMouseUp = addEvent(H.doc, H.isTouchDevice ? 'touchend' : 'mouseup', function (e) {
                    emitter.cancelClick = emitter.hasDragged;
                    emitter.hasDragged = false;
                    emitter.chart.hasDraggedAnnotation = false;
                    // ControlPoints vs Annotation:
                    fireEvent(pick(emitter.target, emitter), 'afterUpdate');
                    emitter.onMouseUp(e);
                }, H.isTouchDevice ? { passive: false } : void 0);
            },
            /**
             * Mouse up handler.
             */
            onMouseUp: function (_e) {
                var chart = this.chart,
                    annotation = this.target || this,
                    annotationsOptions = chart.options.annotations,
                    index = chart.annotations.indexOf(annotation);
                this.removeDocEvents();
                annotationsOptions[index] = annotation.options;
            },
            /**
             * Drag and drop event. All basic annotations should share this
             * capability as well as the extended ones.
             */
            onDrag: function (e) {
                if (this.chart.isInsidePlot(e.chartX - this.chart.plotLeft, e.chartY - this.chart.plotTop, {
                    visiblePlotOnly: true
                })) {
                    var translation_1 = this.mouseMoveToTranslation(e);
                    if (this.options.draggable === 'x') {
                        translation_1.y = 0;
                    }
                    if (this.options.draggable === 'y') {
                        translation_1.x = 0;
                    }
                    if (this.points.length) {
                        this.translate(translation_1.x, translation_1.y);
                    }
                    else {
                        this.shapes.forEach(function (shape) {
                            shape.translate(translation_1.x, translation_1.y);
                        });
                        this.labels.forEach(function (label) {
                            label.translate(translation_1.x, translation_1.y);
                        });
                    }
                    this.redraw(false);
                }
            },
            /**
             * Map mouse move event to the radians.
             */
            mouseMoveToRadians: function (e, cx, cy) {
                var prevDy = e.prevChartY - cy,
                    prevDx = e.prevChartX - cx,
                    dy = e.chartY - cy,
                    dx = e.chartX - cx,
                    temp;
                if (this.chart.inverted) {
                    temp = prevDx;
                    prevDx = prevDy;
                    prevDy = temp;
                    temp = dx;
                    dx = dy;
                    dy = temp;
                }
                return Math.atan2(dy, dx) - Math.atan2(prevDy, prevDx);
            },
            /**
             * Map mouse move event to the distance between two following events.
             */
            mouseMoveToTranslation: function (e) {
                var dx = e.chartX - e.prevChartX,
                    dy = e.chartY - e.prevChartY,
                    temp;
                if (this.chart.inverted) {
                    temp = dy;
                    dy = dx;
                    dx = temp;
                }
                return {
                    x: dx,
                    y: dy
                };
            },
            /**
             * Map mouse move to the scale factors.
             *
             * @param {Object} e event
             * @param {number} cx center x
             * @param {number} cy center y
             **/
            mouseMoveToScale: function (e, cx, cy) {
                var prevDx = e.prevChartX - cx,
                    prevDy = e.prevChartY - cy,
                    dx = e.chartX - cx,
                    dy = e.chartY - cy,
                    sx = (dx || 1) / (prevDx || 1),
                    sy = (dy || 1) / (prevDy || 1),
                    temp;
                if (this.chart.inverted) {
                    temp = sy;
                    sy = sx;
                    sx = temp;
                }
                return {
                    x: sx,
                    y: sy
                };
            },
            /**
             * Destroy the event emitter.
             */
            destroy: function () {
                this.removeDocEvents();
                removeEvent(this);
                this.hcEvents = null;
            }
        };

        return eventEmitterMixin;
    });
    _registerModule(_modules, 'Extensions/Annotations/ControlPoint.js', [_modules['Core/Utilities.js'], _modules['Extensions/Annotations/Mixins/EventEmitterMixin.js']], function (U, eventEmitterMixin) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * Callback to modify annotation's possitioner controls.
         *
         * @callback Highcharts.AnnotationControlPointPositionerFunction
         * @param {Highcharts.AnnotationControlPoint} this
         * @param {Highcharts.AnnotationControllable} target
         * @return {Highcharts.PositionObject}
         */
        var extend = U.extend,
            merge = U.merge,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A control point class which is a connection between controllable
         * transform methods and a user actions.
         *
         * @requires modules/annotations
         *
         * @class
         * @name Highcharts.AnnotationControlPoint
         *
         * @hideconstructor
         *
         * @param {Highcharts.Chart} chart
         * A chart instance.
         *
         * @param {Highcharts.AnnotationControllable} target
         * A controllable instance which is a target for a control point.
         *
         * @param {Highcharts.AnnotationControlPointOptionsObject} options
         * An options object.
         *
         * @param {number} [index]
         * Point index.
         */
        var ControlPoint = /** @class */ (function () {
                function ControlPoint(chart, target, options, index) {
                    /**
                     *
                     * Properties
                     *
                     */
                    this.addEvents = eventEmitterMixin.addEvents;
                this.graphic = void 0;
                this.mouseMoveToRadians = eventEmitterMixin.mouseMoveToRadians;
                this.mouseMoveToScale = eventEmitterMixin.mouseMoveToScale;
                this.mouseMoveToTranslation = eventEmitterMixin.mouseMoveToTranslation;
                this.onDrag = eventEmitterMixin.onDrag;
                this.onMouseDown = eventEmitterMixin.onMouseDown;
                this.onMouseUp = eventEmitterMixin.onMouseUp;
                this.removeDocEvents = eventEmitterMixin.removeDocEvents;
                /**
                 *
                 * Functions
                 *
                 */
                /**
                 * List of events for `anntation.options.events` that should not be
                 * added to `annotation.graphic` but to the `annotation`.
                 * @private
                 * @name Highcharts.AnnotationControlPoint#nonDOMEvents
                 * @type {Array<string>}
                 */
                this.nonDOMEvents = ['drag'];
                this.chart = chart;
                this.target = target;
                this.options = options;
                this.index = pick(options.index, index);
            }
            /**
             * Set the visibility of the control point.
             *
             * @function Highcharts.AnnotationControlPoint#setVisibility
             *
             * @param {boolean} visible
             * Visibility of the control point.
             *
             * @return {void}
             */
            ControlPoint.prototype.setVisibility = function (visible) {
                this.graphic.attr('visibility', visible ? 'visible' : 'hidden');
                this.options.visible = visible;
            };
            /**
             * Render the control point.
             * @private
             */
            ControlPoint.prototype.render = function () {
                var chart = this.chart,
                    options = this.options;
                this.graphic = chart.renderer
                    .symbol(options.symbol, 0, 0, options.width, options.height)
                    .add(chart.controlPointsGroup)
                    .css(options.style);
                this.setVisibility(options.visible);
                // npm test -- --tests "highcharts/annotations-advanced/*"
                this.addEvents();
            };
            /**
             * Redraw the control point.
             * @private
             * @param {boolean} [animation]
             */
            ControlPoint.prototype.redraw = function (animation) {
                this.graphic[animation ? 'animate' : 'attr'](this.options.positioner.call(this, this.target));
            };
            /**
             * Destroy the control point.
             * @private
             */
            ControlPoint.prototype.destroy = function () {
                eventEmitterMixin.destroy.call(this);
                if (this.graphic) {
                    this.graphic = this.graphic.destroy();
                }
                this.chart = null;
                this.target = null;
                this.options = null;
            };
            /**
             * Update the control point.
             *
             * @function Highcharts.AnnotationControlPoint#update
             *
             * @param {Partial<Highcharts.AnnotationControlPointOptionsObject>} userOptions
             * New options for the control point.
             *
             * @return {void}
             */
            ControlPoint.prototype.update = function (userOptions) {
                var chart = this.chart,
                    target = this.target,
                    index = this.index,
                    options = merge(true,
                    this.options,
                    userOptions);
                this.destroy();
                this.constructor(chart, target, options, index);
                this.render(chart.controlPointsGroup);
                this.redraw();
            };
            return ControlPoint;
        }());

        return ControlPoint;
    });
    _registerModule(_modules, 'Extensions/Annotations/MockPoint.js', [_modules['Core/Series/Series.js'], _modules['Core/Utilities.js'], _modules['Core/Axis/Axis.js']], function (Series, U, Axis) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /**
         * @private
         * @interface Highcharts.AnnotationMockLabelOptionsObject
         */ /**
        * Point instance of the point.
        * @name Highcharts.AnnotationMockLabelOptionsObject#point
        * @type {Highcharts.AnnotationMockPoint}
        */ /**
        * X value translated to x axis scale.
        * @name Highcharts.AnnotationMockLabelOptionsObject#x
        * @type {number|null}
        */ /**
        * Y value translated to y axis scale.
        * @name Highcharts.AnnotationMockLabelOptionsObject#y
        * @type {number|null}
        */
        /**
         * A mock series instance imitating a real series from a real point.
         * @private
         * @interface Highcharts.AnnotationMockSeries
         */ /**
        * Whether a series is visible.
        * @name Highcharts.AnnotationMockSeries#visible
        * @type {boolean}
        */ /**
        * A chart instance.
        * @name Highcharts.AnnotationMockSeries#chart
        * @type {Highcharts.Chart}
        */ /**
        * @name Highcharts.AnnotationMockSeries#getPlotBox
        * @type {Function}
        */
        /**
         * Indicates if this is a mock point for an annotation.
         * @name Highcharts.Point#mock
         * @type {boolean|undefined}
         */
        var defined = U.defined,
            extend = U.extend,
            fireEvent = U.fireEvent;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A trimmed point object which imitates {@link Highchart.Point} class. It is
         * created when there is a need of pointing to some chart's position using axis
         * values or pixel values
         *
         * @requires modules/annotations
         *
         * @private
         * @class
         * @name Highcharts.AnnotationMockPoint
         *
         * @hideconstructor
         *
         * @param {Highcharts.Chart} chart
         * The chart instance.
         *
         * @param {Highcharts.AnnotationControllable|null} target
         * The related controllable.
         *
         * @param {Highcharts.AnnotationMockPointOptionsObject|Function} options
         * The options object.
         */
        var MockPoint = /** @class */ (function () {
                function MockPoint(chart, target, options) {
                    this.isInside = void 0;
                this.negative = void 0;
                this.plotX = void 0;
                this.plotY = void 0;
                this.ttBelow = void 0;
                this.x = void 0;
                this.y = void 0;
                /* *
                 *
                 * Functions
                 *
                 * */
                /**
                 * A flag indicating that a point is not the real one.
                 *
                 * @type {boolean}
                 * @default true
                 */
                this.mock = true;
                /**
                 * A mock series instance imitating a real series from a real point.
                 *
                 * @name Annotation.AnnotationMockPoint#series
                 * @type {Highcharts.AnnotationMockSeries}
                 */
                this.series = {
                    visible: true,
                    chart: chart,
                    getPlotBox: Series.prototype.getPlotBox
                };
                /**
                 * @name Annotation.AnnotationMockPoint#target
                 * @type {Highcharts.AnnotationControllable|null}
                 */
                this.target = target || null;
                /**
                 * Options for the mock point.
                 *
                 * @name Annotation.AnnotationMockPoint#options
                 * @type {Highcharts.AnnotationsMockPointOptionsObject}
                 */
                this.options = options;
                /**
                 * If an xAxis is set it represents the point's value in terms of the
                 * xAxis.
                 *
                 * @name Annotation.AnnotationMockPoint#x
                 * @type {number|undefined}
                 */
                /**
                 * If an yAxis is set it represents the point's value in terms of the
                 * yAxis.
                 *
                 * @name Annotation.AnnotationMockPoint#y
                 * @type {number|undefined}
                 */
                /**
                 * It represents the point's pixel x coordinate relative to its plot
                 * box.
                 *
                 * @name Annotation.AnnotationMockPoint#plotX
                 * @type {number|undefined}
                 */
                /**
                 * It represents the point's pixel y position relative to its plot box.
                 *
                 * @name Annotation.AnnotationMockPoint#plotY
                 * @type {number|undefined}
                 */
                /**
                 * Whether the point is inside the plot box.
                 *
                 * @name Annotation.AnnotationMockPoint#isInside
                 * @type {boolean|undefined}
                 */
                this.applyOptions(this.getOptions());
            }
            /**
             * Create a mock point from a real Highcharts point.
             *
             * @private
             * @static
             *
             * @param {Highcharts.Point} point
             *
             * @return {Highcharts.AnnotationMockPoint}
             * A mock point instance.
             */
            MockPoint.fromPoint = function (point) {
                return new MockPoint(point.series.chart, null, {
                    x: point.x,
                    y: point.y,
                    xAxis: point.series.xAxis,
                    yAxis: point.series.yAxis
                });
            };
            /**
             * Get the pixel position from the point like object.
             *
             * @private
             * @static
             *
             * @param {Highcharts.AnnotationPointType} point
             *
             * @param {boolean} [paneCoordinates]
             *        whether the pixel position should be relative
             *
             * @return {Highcharts.PositionObject} pixel position
             */
            MockPoint.pointToPixels = function (point, paneCoordinates) {
                var series = point.series,
                    chart = series.chart,
                    x = point.plotX,
                    y = point.plotY,
                    plotBox;
                if (chart.inverted) {
                    if (point.mock) {
                        x = point.plotY;
                        y = point.plotX;
                    }
                    else {
                        x = chart.plotWidth - point.plotY;
                        y = chart.plotHeight - point.plotX;
                    }
                }
                if (series && !paneCoordinates) {
                    plotBox = series.getPlotBox();
                    x += plotBox.translateX;
                    y += plotBox.translateY;
                }
                return {
                    x: x,
                    y: y
                };
            };
            /**
             * Get fresh mock point options from the point like object.
             *
             * @private
             * @static
             *
             * @param {Highcharts.AnnotationPointType} point
             *
             * @return {Highcharts.AnnotationMockPointOptionsObject}
             * A mock point's options.
             */
            MockPoint.pointToOptions = function (point) {
                return {
                    x: point.x,
                    y: point.y,
                    xAxis: point.series.xAxis,
                    yAxis: point.series.yAxis
                };
            };
            /**
             * Check if the point has dynamic options.
             * @private
             * @return {boolean}
             * A positive flag if the point has dynamic options.
             */
            MockPoint.prototype.hasDynamicOptions = function () {
                return typeof this.options === 'function';
            };
            /**
             * Get the point's options.
             * @private
             * @return {Highcharts.AnnotationMockPointOptionsObject}
             * The mock point's options.
             */
            MockPoint.prototype.getOptions = function () {
                return this.hasDynamicOptions() ?
                    this.options(this.target) :
                    this.options;
            };
            /**
             * Apply options for the point.
             * @private
             * @param {Highcharts.AnnotationMockPointOptionsObject} options
             */
            MockPoint.prototype.applyOptions = function (options) {
                this.command = options.command;
                this.setAxis(options, 'x');
                this.setAxis(options, 'y');
                this.refresh();
            };
            /**
             * Set x or y axis.
             * @private
             * @param {Highcharts.AnnotationMockPointOptionsObject} options
             * @param {string} xOrY
             * 'x' or 'y' string literal
             */
            MockPoint.prototype.setAxis = function (options, xOrY) {
                var axisName = (xOrY + 'Axis'),
                    axisOptions = options[axisName],
                    chart = this.series.chart;
                this.series[axisName] =
                    axisOptions instanceof Axis ?
                        axisOptions :
                        defined(axisOptions) ?
                            (chart[axisName][axisOptions] ||
                                chart.get(axisOptions)) :
                            null;
            };
            /**
             * Transform the mock point to an anchor (relative position on the chart).
             * @private
             * @return {Array<number>}
             * A quadruple of numbers which denotes x, y, width and height of the box
             **/
            MockPoint.prototype.toAnchor = function () {
                var anchor = [this.plotX,
                    this.plotY, 0, 0];
                if (this.series.chart.inverted) {
                    anchor[0] = this.plotY;
                    anchor[1] = this.plotX;
                }
                return anchor;
            };
            /**
             * Returns a label config object - the same as
             * Highcharts.Point.prototype.getLabelConfig
             * @private
             * @return {Highcharts.AnnotationMockLabelOptionsObject} the point's label config
             */
            MockPoint.prototype.getLabelConfig = function () {
                return {
                    x: this.x,
                    y: this.y,
                    point: this
                };
            };
            /**
             * Check if the point is inside its pane.
             * @private
             * @return {boolean} A flag indicating whether the point is inside the pane.
             */
            MockPoint.prototype.isInsidePlot = function () {
                var plotX = this.plotX,
                    plotY = this.plotY,
                    xAxis = this.series.xAxis,
                    yAxis = this.series.yAxis,
                    e = {
                        x: plotX,
                        y: plotY,
                        isInsidePlot: true
                    };
                if (xAxis) {
                    e.isInsidePlot = defined(plotX) && plotX >= 0 && plotX <= xAxis.len;
                }
                if (yAxis) {
                    e.isInsidePlot =
                        e.isInsidePlot &&
                            defined(plotY) &&
                            plotY >= 0 && plotY <= yAxis.len;
                }
                fireEvent(this.series.chart, 'afterIsInsidePlot', e);
                return e.isInsidePlot;
            };
            /**
             * Refresh point values and coordinates based on its options.
             * @private
             */
            MockPoint.prototype.refresh = function () {
                var series = this.series,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    options = this.getOptions();
                if (xAxis) {
                    this.x = options.x;
                    this.plotX = xAxis.toPixels(options.x, true);
                }
                else {
                    this.x = null;
                    this.plotX = options.x;
                }
                if (yAxis) {
                    this.y = options.y;
                    this.plotY = yAxis.toPixels(options.y, true);
                }
                else {
                    this.y = null;
                    this.plotY = options.y;
                }
                this.isInside = this.isInsidePlot();
            };
            /**
             * Translate the point.
             *
             * @private
             *
             * @param {number|undefined} cx
             * Origin x transformation.
             *
             * @param {number|undefined} cy
             * Origin y transformation.
             *
             * @param {number} dx
             * Translation for x coordinate.
             *
             * @param {number} dy
             * Translation for y coordinate.
             **/
            MockPoint.prototype.translate = function (_cx, _cy, dx, dy) {
                if (!this.hasDynamicOptions()) {
                    this.plotX += dx;
                    this.plotY += dy;
                    this.refreshOptions();
                }
            };
            /**
             * Scale the point.
             *
             * @private
             *
             * @param {number} cx
             * Origin x transformation.
             *
             * @param {number} cy
             * Origin y transformation.
             *
             * @param {number} sx
             * Scale factor x.
             *
             * @param {number} sy
             * Scale factor y.
             */
            MockPoint.prototype.scale = function (cx, cy, sx, sy) {
                if (!this.hasDynamicOptions()) {
                    var x = this.plotX * sx,
                        y = this.plotY * sy,
                        tx = (1 - sx) * cx,
                        ty = (1 - sy) * cy;
                    this.plotX = tx + x;
                    this.plotY = ty + y;
                    this.refreshOptions();
                }
            };
            /**
             * Rotate the point.
             * @private
             * @param {number} cx origin x rotation
             * @param {number} cy origin y rotation
             * @param {number} radians
             */
            MockPoint.prototype.rotate = function (cx, cy, radians) {
                if (!this.hasDynamicOptions()) {
                    var cos = Math.cos(radians),
                        sin = Math.sin(radians),
                        x = this.plotX,
                        y = this.plotY,
                        tx = void 0,
                        ty = void 0;
                    x -= cx;
                    y -= cy;
                    tx = x * cos - y * sin;
                    ty = x * sin + y * cos;
                    this.plotX = tx + cx;
                    this.plotY = ty + cy;
                    this.refreshOptions();
                }
            };
            /**
             * Refresh point options based on its plot coordinates.
             * @private
             */
            MockPoint.prototype.refreshOptions = function () {
                var series = this.series,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis;
                this.x = this.options.x = xAxis ?
                    this.options.x = xAxis.toValue(this.plotX, true) :
                    this.plotX;
                this.y = this.options.y = yAxis ?
                    yAxis.toValue(this.plotY, true) :
                    this.plotY;
            };
            return MockPoint;
        }());

        return MockPoint;
    });
    _registerModule(_modules, 'Extensions/Annotations/Mixins/ControllableMixin.js', [_modules['Extensions/Annotations/ControlPoint.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Tooltip.js'], _modules['Core/Utilities.js']], function (ControlPoint, MockPoint, Tooltip, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var isObject = U.isObject,
            isString = U.isString,
            merge = U.merge,
            splat = U.splat;
        /**
         * An object which denots a controllable's anchor positions - relative and
         * absolute.
         *
         * @private
         * @interface Highcharts.AnnotationAnchorObject
         */ /**
        * Relative to the plot area position
        * @name Highcharts.AnnotationAnchorObject#relativePosition
        * @type {Highcharts.BBoxObject}
        */ /**
        * Absolute position
        * @name Highcharts.AnnotationAnchorObject#absolutePosition
        * @type {Highcharts.BBoxObject}
        */
        /**
         * @interface Highcharts.AnnotationControllable
         */ /**
        * @name Highcharts.AnnotationControllable#annotation
        * @type {Highcharts.Annotation}
        */ /**
        * @name Highcharts.AnnotationControllable#chart
        * @type {Highcharts.Chart}
        */ /**
        * @name Highcharts.AnnotationControllable#collection
        * @type {string}
        */ /**
        * @private
        * @name Highcharts.AnnotationControllable#controlPoints
        * @type {Array<Highcharts.AnnotationControlPoint>}
        */ /**
        * @name Highcharts.AnnotationControllable#points
        * @type {Array<Highcharts.Point>}
        */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * It provides methods for handling points, control points
         * and points transformations.
         *
         * @private
         * @mixin
         * @name Highcharts.AnnotationControllableMixin
         */
        var controllableMixin = {
                /**
                 * Init the controllable
                 */
                init: function (annotation,
            options,
            index) {
                    this.annotation = annotation;
                this.chart = annotation.chart;
                this.options = options;
                this.points = [];
                this.controlPoints = [];
                this.index = index;
                this.linkPoints();
                this.addControlPoints();
            },
            /**
             * Redirect attr usage on the controllable graphic element.
             */
            attr: function () {
                this.graphic.attr.apply(this.graphic, arguments);
            },
            /**
             * Get the controllable's points options.
             *
             * @return {Array<Highcharts.PointOptionsObject>}
             * An array of points' options.
             */
            getPointsOptions: function () {
                var options = this.options;
                return (options.points || (options.point && splat(options.point)));
            },
            /**
             * Utility function for mapping item's options
             * to element's attribute
             *
             * @param {Highcharts.AnnotationsLabelsOptions|Highcharts.AnnotationsShapesOptions} options
             *
             * @return {Highcharts.SVGAttributes}
             * Mapped options.
             */
            attrsFromOptions: function (options) {
                var map = this.constructor.attrsMap,
                    attrs = {},
                    key,
                    mappedKey,
                    styledMode = this.chart.styledMode;
                for (key in options) { // eslint-disable-line guard-for-in
                    mappedKey = map[key];
                    if (mappedKey &&
                        (!styledMode ||
                            ['fill', 'stroke', 'stroke-width']
                                .indexOf(mappedKey) === -1)) {
                        attrs[mappedKey] = options[key];
                    }
                }
                return attrs;
            },
            /**
             * Returns object which denotes anchor position - relative and absolute.
             *
             * @param {Highcharts.AnnotationPointType} point
             * A point like object.
             *
             * @return {Highcharts.AnnotationAnchorObject} a controllable anchor
             */
            anchor: function (point) {
                var plotBox = point.series.getPlotBox(),
                    chart = point.series.chart,
                    box = point.mock ?
                        point.toAnchor() :
                        Tooltip.prototype.getAnchor.call({
                            chart: point.series.chart
                        },
                    point),
                    anchor = {
                        x: box[0] + (this.options.x || 0),
                        y: box[1] + (this.options.y || 0),
                        height: box[2] || 0,
                        width: box[3] || 0
                    };
                return {
                    relativePosition: anchor,
                    absolutePosition: merge(anchor, {
                        x: anchor.x + (point.mock ? plotBox.translateX : chart.plotLeft),
                        y: anchor.y + (point.mock ? plotBox.translateY : chart.plotTop)
                    })
                };
            },
            /**
             * Map point's options to a point-like object.
             *
             * @param {string|Function|Highcharts.AnnotationMockPointOptionsObject|Highcharts.AnnotationPointType} pointOptions
             * Point's options.
             *
             * @param {Highcharts.AnnotationPointType} point
             * A point-like instance.
             *
             * @return {Highcharts.AnnotationPointType|null}
             *         if the point is found/set returns this point, otherwise null
             */
            point: function (pointOptions, point) {
                if (pointOptions && pointOptions.series) {
                    return pointOptions;
                }
                if (!point || point.series === null) {
                    if (isObject(pointOptions)) {
                        point = new MockPoint(this.chart, this, pointOptions);
                    }
                    else if (isString(pointOptions)) {
                        point = this.chart.get(pointOptions) || null;
                    }
                    else if (typeof pointOptions === 'function') {
                        var pointConfig = pointOptions.call(point,
                            this);
                        point = pointConfig.series ?
                            pointConfig :
                            new MockPoint(this.chart, this, pointOptions);
                    }
                }
                return point;
            },
            /**
             * Find point-like objects based on points options.
             *
             * @return {Array<Annotation.PointLike>} an array of point-like objects
             */
            linkPoints: function () {
                var pointsOptions = this.getPointsOptions(),
                    points = this.points,
                    len = (pointsOptions && pointsOptions.length) || 0,
                    i,
                    point;
                for (i = 0; i < len; i++) {
                    point = this.point(pointsOptions[i], points[i]);
                    if (!point) {
                        points.length = 0;
                        return;
                    }
                    if (point.mock) {
                        point.refresh();
                    }
                    points[i] = point;
                }
                return points;
            },
            /**
             * Add control points to a controllable.
             */
            addControlPoints: function () {
                var controlPointsOptions = this.options.controlPoints;
                (controlPointsOptions || []).forEach(function (controlPointOptions, i) {
                    var options = merge(this.options.controlPointOptions,
                        controlPointOptions);
                    if (!options.index) {
                        options.index = i;
                    }
                    controlPointsOptions[i] = options;
                    this.controlPoints.push(new ControlPoint(this.chart, this, options));
                }, this);
            },
            /**
             * Check if a controllable should be rendered/redrawn.
             *
             * @return {boolean}
             * Whether a controllable should be drawn.
             */
            shouldBeDrawn: function () {
                return Boolean(this.points.length);
            },
            /**
             * Render a controllable.
             */
            render: function (_parentGroup) {
                this.controlPoints.forEach(function (controlPoint) {
                    controlPoint.render();
                });
            },
            /**
             * Redraw a controllable.
             *
             * @param {boolean} [animation]
             */
            redraw: function (animation) {
                this.controlPoints.forEach(function (controlPoint) {
                    controlPoint.redraw(animation);
                });
            },
            /**
             * Transform a controllable with a specific transformation.
             *
             * @param {string} transformation a transformation name
             * @param {number|null} cx origin x transformation
             * @param {number|null} cy origin y transformation
             * @param {number} p1 param for the transformation
             * @param {number} [p2] param for the transformation
             */
            transform: function (transformation, cx, cy, p1, p2) {
                if (this.chart.inverted) {
                    var temp = cx;
                    cx = cy;
                    cy = temp;
                }
                this.points.forEach(function (point, i) {
                    this.transformPoint(transformation, cx, cy, p1, p2, i);
                }, this);
            },
            /**
             * Transform a point with a specific transformation
             * If a transformed point is a real point it is replaced with
             * the mock point.
             *
             * @param {string} transformation a transformation name
             * @param {number|null} cx origin x transformation
             * @param {number|null} cy origin y transformation
             * @param {number} p1 param for the transformation
             * @param {number|undefined} p2 param for the transformation
             * @param {number} i index of the point
             */
            transformPoint: function (transformation, cx, cy, p1, p2, i) {
                var point = this.points[i];
                if (!point.mock) {
                    point = this.points[i] = MockPoint.fromPoint(point);
                }
                point[transformation](cx, cy, p1, p2);
            },
            /**
             * Translate a controllable.
             *
             * @param {number} dx translation for x coordinate
             * @param {number} dy translation for y coordinate
             **/
            translate: function (dx, dy) {
                this.transform('translate', null, null, dx, dy);
            },
            /**
             * Translate a specific point within a controllable.
             *
             * @param {number} dx translation for x coordinate
             * @param {number} dy translation for y coordinate
             * @param {number} i index of the point
             **/
            translatePoint: function (dx, dy, i) {
                this.transformPoint('translate', null, null, dx, dy, i);
            },
            /**
             * Translate shape within controllable item.
             * Replaces `controllable.translate` method.
             *
             * @param {number} dx translation for x coordinate
             * @param {number} dy translation for y coordinate
             */
            translateShape: function (dx, dy) {
                var chart = this.annotation.chart, 
                    // Annotation.options
                    shapeOptions = this.annotation.userOptions, 
                    // Chart.options.annotations
                    annotationIndex = chart.annotations.indexOf(this.annotation),
                    chartOptions = chart.options.annotations[annotationIndex];
                this.translatePoint(dx, dy, 0);
                // Options stored in:
                // - chart (for exporting)
                // - current config (for redraws)
                chartOptions[this.collection][this.index].point = this.options.point;
                shapeOptions[this.collection][this.index].point = this.options.point;
            },
            /**
             * Rotate a controllable.
             *
             * @param {number} cx origin x rotation
             * @param {number} cy origin y rotation
             * @param {number} radians
             **/
            rotate: function (cx, cy, radians) {
                this.transform('rotate', cx, cy, radians);
            },
            /**
             * Scale a controllable.
             *
             * @param {number} cx origin x rotation
             * @param {number} cy origin y rotation
             * @param {number} sx scale factor x
             * @param {number} sy scale factor y
             */
            scale: function (cx, cy, sx, sy) {
                this.transform('scale', cx, cy, sx, sy);
            },
            /**
             * Set control points' visibility.
             *
             * @param {boolean} visible
             */
            setControlPointsVisibility: function (visible) {
                this.controlPoints.forEach(function (controlPoint) {
                    controlPoint.setVisibility(visible);
                });
            },
            /**
             * Destroy a controllable.
             */
            destroy: function () {
                if (this.graphic) {
                    this.graphic = this.graphic.destroy();
                }
                if (this.tracker) {
                    this.tracker = this.tracker.destroy();
                }
                this.controlPoints.forEach(function (controlPoint) {
                    controlPoint.destroy();
                });
                this.chart = null;
                this.points = null;
                this.controlPoints = null;
                this.options = null;
                if (this.annotation) {
                    this.annotation = null;
                }
            },
            /**
             * Update a controllable.
             *
             * @param {Object} newOptions
             */
            update: function (newOptions) {
                var annotation = this.annotation,
                    options = merge(true,
                    this.options,
                    newOptions),
                    parentGroup = this.graphic.parentGroup;
                this.destroy();
                this.constructor(annotation, options, this.index);
                this.render(parentGroup);
                this.redraw();
            }
        };

        return controllableMixin;
    });
    _registerModule(_modules, 'Extensions/Annotations/Mixins/MarkerMixin.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Utilities.js']], function (Chart, SVGRenderer, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var addEvent = U.addEvent,
            defined = U.defined,
            merge = U.merge,
            uniqueKey = U.uniqueKey;
        /**
         * Options for configuring markers for annotations.
         *
         * An example of the arrow marker:
         * <pre>
         * {
         *   arrow: {
         *     id: 'arrow',
         *     tagName: 'marker',
         *     refY: 5,
         *     refX: 5,
         *     markerWidth: 10,
         *     markerHeight: 10,
         *     children: [{
         *       tagName: 'path',
         *       attrs: {
         *         d: 'M 0 0 L 10 5 L 0 10 Z',
         *         'stroke-width': 0
         *       }
         *     }]
         *   }
         * }
         * </pre>
         *
         * @sample highcharts/annotations/custom-markers/
         *         Define a custom marker for annotations
         *
         * @sample highcharts/css/annotations-markers/
         *         Define markers in a styled mode
         *
         * @type         {Highcharts.Dictionary<Highcharts.ASTNode>}
         * @since        6.0.0
         * @optionparent defs
         */
        var defaultMarkers = {
                /**
                 * @type {Highcharts.ASTNode}
                 */
                arrow: {
                    tagName: 'marker',
                    attributes: {
                        id: 'arrow',
                        refY: 5,
                        refX: 9,
                        markerWidth: 10,
                        markerHeight: 10
                    },
                    /**
                     * @type {Array<Highcharts.DefsOptions>}
                     */
                    children: [{
                            tagName: 'path',
                            attributes: {
                                d: 'M 0 0 L 10 5 L 0 10 Z',
                                'stroke-width': 0
                            }
                        }]
                },
                /**
                 * @type {Highcharts.ASTNode}
                 */
                'reverse-arrow': {
                    tagName: 'marker',
                    attributes: {
                        id: 'reverse-arrow',
                        refY: 5,
                        refX: 1,
                        markerWidth: 10,
                        markerHeight: 10
                    },
                    children: [{
                            tagName: 'path',
                            attributes: {
                                // reverse triangle (used as an arrow)
                                d: 'M 0 5 L 10 0 L 10 10 Z',
                                'stroke-width': 0
                            }
                        }]
                }
            };
        SVGRenderer.prototype.addMarker = function (id, markerOptions) {
            var options = { attributes: { id: id } };
            var attrs = {
                    stroke: markerOptions.color || 'none',
                    fill: markerOptions.color || 'rgba(0, 0, 0, 0.75)'
                };
            options.children = (markerOptions.children &&
                markerOptions.children.map(function (child) {
                    return merge(attrs, child);
                }));
            var ast = merge(true, {
                    attributes: {
                        markerWidth: 20,
                        markerHeight: 20,
                        refX: 0,
                        refY: 0,
                        orient: 'auto'
                    }
                },
                markerOptions,
                options);
            var marker = this.definition(ast);
            marker.id = id;
            return marker;
        };
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function createMarkerSetter(markerType) {
            return function (value) {
                this.attr(markerType, 'url(#' + value + ')');
            };
        }
        /**
         * @private
         * @mixin
         * @name Highcharts.AnnotaitonMarkerMixin
         */
        var markerMixin = {
                markerEndSetter: createMarkerSetter('marker-end'),
                markerStartSetter: createMarkerSetter('marker-start'),
                /**
                 * Set markers.
                 * @private
                 * @param {Highcharts.AnnotationControllablePath} item
                 */
                setItemMarkers: function (item) {
                    var itemOptions = item.options,
            chart = item.chart,
            defs = chart.options.defs,
            fill = itemOptions.fill,
            color = defined(fill) && fill !== 'none' ?
                        fill :
                        itemOptions.stroke,
            setMarker = function (markerType) {
                        var markerId = itemOptions[markerType],
            def,
            predefinedMarker,
            key,
            marker;
                    if (markerId) {
                        for (key in defs) { // eslint-disable-line guard-for-in
                            def = defs[key];
                            if ((markerId === (def.attributes && def.attributes.id) ||
                                // Legacy, for
                                // unit-tests/annotations/annotations-shapes
                                markerId === def.id) &&
                                def.tagName === 'marker') {
                                predefinedMarker = def;
                                break;
                            }
                        }
                        if (predefinedMarker) {
                            marker = item[markerType] = chart.renderer
                                .addMarker((itemOptions.id || uniqueKey()) + '-' +
                                markerId, merge(predefinedMarker, { color: color }));
                            item.attr(markerType, marker.getAttribute('id'));
                        }
                    }
                };
                ['markerStart', 'markerEnd'].forEach(setMarker);
            }
        };
        addEvent(Chart, 'afterGetContainer', function () {
            this.options.defs = merge(defaultMarkers, this.options.defs || {});
            // objectEach(this.options.defs, function (def): void {
            //     const attributes = def.attributes;
            //     if (
            //         def.tagName === 'marker' &&
            //         attributes &&
            //         attributes.id &&
            //         attributes.display !== 'none'
            //     ) {
            //         this.renderer.addMarker(attributes.id, def);
            //     }
            // }, this);
        });

        return markerMixin;
    });
    _registerModule(_modules, 'Extensions/Annotations/Controllables/ControllablePath.js', [_modules['Extensions/Annotations/Mixins/ControllableMixin.js'], _modules['Core/Globals.js'], _modules['Extensions/Annotations/Mixins/MarkerMixin.js'], _modules['Core/Utilities.js']], function (ControllableMixin, H, MarkerMixin, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var extend = U.extend;
        // See TRACKER_FILL in highcharts.src.js
        var TRACKER_FILL = 'rgba(192,192,192,' + (H.svg ? 0.0001 : 0.002) + ')';
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A controllable path class.
         *
         * @requires modules/annotations
         *
         * @private
         * @class
         * @name Highcharts.AnnotationControllablePath
         *
         * @param {Highcharts.Annotation}
         * Related annotation.
         *
         * @param {Highcharts.AnnotationsShapeOptions} options
         * A path's options object.
         *
         * @param {number} index
         * Index of the path.
         */
        var ControllablePath = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function ControllablePath(annotation, options, index) {
                    /* *
                     *
                     *  Properties
                     *
                     * */
                    this.addControlPoints = ControllableMixin.addControlPoints;
                this.anchor = ControllableMixin.anchor;
                this.attr = ControllableMixin.attr;
                this.attrsFromOptions = ControllableMixin.attrsFromOptions;
                this.destroy = ControllableMixin.destroy;
                this.getPointsOptions = ControllableMixin.getPointsOptions;
                this.init = ControllableMixin.init;
                this.linkPoints = ControllableMixin.linkPoints;
                this.point = ControllableMixin.point;
                this.rotate = ControllableMixin.rotate;
                this.scale = ControllableMixin.scale;
                this.setControlPointsVisibility = ControllableMixin.setControlPointsVisibility;
                this.setMarkers = MarkerMixin.setItemMarkers;
                this.transform = ControllableMixin.transform;
                this.transformPoint = ControllableMixin.transformPoint;
                this.translate = ControllableMixin.translate;
                this.translatePoint = ControllableMixin.translatePoint;
                this.translateShape = ControllableMixin.translateShape;
                this.update = ControllableMixin.update;
                /**
                 * @type 'path'
                 */
                this.type = 'path';
                this.init(annotation, options, index);
                this.collection = 'shapes';
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Map the controllable path to 'd' path attribute.
             *
             * @return {Highcharts.SVGPathArray|null}
             * A path's d attribute.
             */
            ControllablePath.prototype.toD = function () {
                var dOption = this.options.d;
                if (dOption) {
                    return typeof dOption === 'function' ?
                        dOption.call(this) :
                        dOption;
                }
                var points = this.points,
                    len = points.length,
                    showPath = len,
                    point = points[0],
                    position = showPath && this.anchor(point).absolutePosition,
                    pointIndex = 0,
                    command,
                    d = [];
                if (position) {
                    d.push(['M', position.x, position.y]);
                    while (++pointIndex < len && showPath) {
                        point = points[pointIndex];
                        command = point.command || 'L';
                        position = this.anchor(point).absolutePosition;
                        if (command === 'M') {
                            d.push([command, position.x, position.y]);
                        }
                        else if (command === 'L') {
                            d.push([command, position.x, position.y]);
                        }
                        else if (command === 'Z') {
                            d.push([command]);
                        }
                        showPath = point.series.visible;
                    }
                }
                return showPath ?
                    this.chart.renderer.crispLine(d, this.graphic.strokeWidth()) :
                    null;
            };
            ControllablePath.prototype.shouldBeDrawn = function () {
                return (ControllableMixin.shouldBeDrawn.call(this) || Boolean(this.options.d));
            };
            ControllablePath.prototype.render = function (parent) {
                var options = this.options,
                    attrs = this.attrsFromOptions(options);
                this.graphic = this.annotation.chart.renderer
                    .path([['M', 0, 0]])
                    .attr(attrs)
                    .add(parent);
                if (options.className) {
                    this.graphic.addClass(options.className);
                }
                this.tracker = this.annotation.chart.renderer
                    .path([['M', 0, 0]])
                    .addClass('highcharts-tracker-line')
                    .attr({
                    zIndex: 2
                })
                    .add(parent);
                if (!this.annotation.chart.styledMode) {
                    this.tracker.attr({
                        'stroke-linejoin': 'round',
                        stroke: TRACKER_FILL,
                        fill: TRACKER_FILL,
                        'stroke-width': this.graphic.strokeWidth() +
                            options.snap * 2
                    });
                }
                ControllableMixin.render.call(this);
                extend(this.graphic, {
                    markerStartSetter: MarkerMixin.markerStartSetter,
                    markerEndSetter: MarkerMixin.markerEndSetter
                });
                this.setMarkers(this);
            };
            ControllablePath.prototype.redraw = function (animation) {
                var d = this.toD(),
                    action = animation ? 'animate' : 'attr';
                if (d) {
                    this.graphic[action]({ d: d });
                    this.tracker[action]({ d: d });
                }
                else {
                    this.graphic.attr({ d: 'M 0 ' + -9e9 });
                    this.tracker.attr({ d: 'M 0 ' + -9e9 });
                }
                this.graphic.placed = this.tracker.placed = Boolean(d);
                ControllableMixin.redraw.call(this, animation);
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * A map object which allows to map options attributes to element attributes
             *
             * @name Highcharts.AnnotationControllablePath.attrsMap
             * @type {Highcharts.Dictionary<string>}
             */
            ControllablePath.attrsMap = {
                dashStyle: 'dashstyle',
                strokeWidth: 'stroke-width',
                stroke: 'stroke',
                fill: 'fill',
                zIndex: 'zIndex'
            };
            return ControllablePath;
        }());

        return ControllablePath;
    });
    _registerModule(_modules, 'Extensions/Annotations/Controllables/ControllableRect.js', [_modules['Extensions/Annotations/Mixins/ControllableMixin.js'], _modules['Extensions/Annotations/Controllables/ControllablePath.js'], _modules['Core/Utilities.js']], function (ControllableMixin, ControllablePath, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var merge = U.merge;
        /**
         * @typedef {Annotation.ControllablePath.AttrsMap}
         *          Annotation.ControllableRect.AttrsMap
         * @property {string} width=width
         * @property {string} height=height
         */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A controllable rect class.
         *
         * @requires modules/annotations
         *
         * @private
         * @class
         * @name Highcharts.AnnotationControllableRect
         *
         * @param {Highcharts.Annotation} annotation
         * An annotation instance.
         *
         * @param {Highcharts.AnnotationsShapeOptions} options
         * A rect's options.
         *
         * @param {number} index
         * Index of the rectangle
         */
        var ControllableRect = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function ControllableRect(annotation, options, index) {
                    /* *
                     *
                     *  Properties
                     *
                     * */
                    this.addControlPoints = ControllableMixin.addControlPoints;
                this.anchor = ControllableMixin.anchor;
                this.attr = ControllableMixin.attr;
                this.attrsFromOptions = ControllableMixin.attrsFromOptions;
                this.destroy = ControllableMixin.destroy;
                this.getPointsOptions = ControllableMixin.getPointsOptions;
                this.init = ControllableMixin.init;
                this.linkPoints = ControllableMixin.linkPoints;
                this.point = ControllableMixin.point;
                this.rotate = ControllableMixin.rotate;
                this.scale = ControllableMixin.scale;
                this.setControlPointsVisibility = ControllableMixin.setControlPointsVisibility;
                this.shouldBeDrawn = ControllableMixin.shouldBeDrawn;
                this.transform = ControllableMixin.transform;
                this.transformPoint = ControllableMixin.transformPoint;
                this.translatePoint = ControllableMixin.translatePoint;
                this.translateShape = ControllableMixin.translateShape;
                this.update = ControllableMixin.update;
                /**
                 * @type 'rect'
                 */
                this.type = 'rect';
                this.translate = ControllableMixin.translateShape;
                this.init(annotation, options, index);
                this.collection = 'shapes';
            }
            /* *
             *
             *  Functions
             *
             * */
            ControllableRect.prototype.render = function (parent) {
                var attrs = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer
                    .rect(0, -9e9, 0, 0)
                    .attr(attrs)
                    .add(parent);
                ControllableMixin.render.call(this);
            };
            ControllableRect.prototype.redraw = function (animation) {
                var position = this.anchor(this.points[0]).absolutePosition;
                if (position) {
                    this.graphic[animation ? 'animate' : 'attr']({
                        x: position.x,
                        y: position.y,
                        width: this.options.width,
                        height: this.options.height
                    });
                }
                else {
                    this.attr({
                        x: 0,
                        y: -9e9
                    });
                }
                this.graphic.placed = Boolean(position);
                ControllableMixin.redraw.call(this, animation);
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * A map object which allows to map options attributes to element attributes
             *
             * @type {Annotation.ControllableRect.AttrsMap}
             */
            ControllableRect.attrsMap = merge(ControllablePath.attrsMap, {
                width: 'width',
                height: 'height'
            });
            return ControllableRect;
        }());

        return ControllableRect;
    });
    _registerModule(_modules, 'Extensions/Annotations/Controllables/ControllableCircle.js', [_modules['Extensions/Annotations/Mixins/ControllableMixin.js'], _modules['Extensions/Annotations/Controllables/ControllablePath.js'], _modules['Core/Utilities.js']], function (ControllableMixin, ControllablePath, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var merge = U.merge;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A controllable circle class.
         *
         * @requires modules/annotations
         *
         * @private
         * @class
         * @name Highcharts.AnnotationControllableCircle
         *
         * @param {Highcharts.Annotation} annotation an annotation instance
         * @param {Highcharts.AnnotationsShapeOptions} options a shape's options
         * @param {number} index of the circle
         */
        var ControllableCircle = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function ControllableCircle(annotation, options, index) {
                    /* *
                     *
                     *  Properties
                     *
                     * */
                    this.addControlPoints = ControllableMixin.addControlPoints;
                this.anchor = ControllableMixin.anchor;
                this.attr = ControllableMixin.attr;
                this.attrsFromOptions = ControllableMixin.attrsFromOptions;
                this.destroy = ControllableMixin.destroy;
                this.getPointsOptions = ControllableMixin.getPointsOptions;
                this.init = ControllableMixin.init;
                this.linkPoints = ControllableMixin.linkPoints;
                this.point = ControllableMixin.point;
                this.rotate = ControllableMixin.rotate;
                this.scale = ControllableMixin.scale;
                this.setControlPointsVisibility = ControllableMixin.setControlPointsVisibility;
                this.shouldBeDrawn = ControllableMixin.shouldBeDrawn;
                this.transform = ControllableMixin.transform;
                this.transformPoint = ControllableMixin.transformPoint;
                this.translatePoint = ControllableMixin.translatePoint;
                this.translateShape = ControllableMixin.translateShape;
                this.update = ControllableMixin.update;
                /**
                 * @type 'circle'
                 */
                this.type = 'circle';
                this.translate = ControllableMixin.translateShape;
                this.init(annotation, options, index);
                this.collection = 'shapes';
            }
            /* *
             *
             *  Functions
             *
             * */
            ControllableCircle.prototype.render = function (parent) {
                var attrs = this.attrsFromOptions(this.options);
                this.graphic = this.annotation.chart.renderer
                    .circle(0, -9e9, 0)
                    .attr(attrs)
                    .add(parent);
                ControllableMixin.render.call(this);
            };
            ControllableCircle.prototype.redraw = function (animation) {
                var position = this.anchor(this.points[0]).absolutePosition;
                if (position) {
                    this.graphic[animation ? 'animate' : 'attr']({
                        x: position.x,
                        y: position.y,
                        r: this.options.r
                    });
                }
                else {
                    this.graphic.attr({
                        x: 0,
                        y: -9e9
                    });
                }
                this.graphic.placed = Boolean(position);
                ControllableMixin.redraw.call(this, animation);
            };
            /**
             * Set the radius.
             *
             * @param {number} r a radius to be set
             */
            ControllableCircle.prototype.setRadius = function (r) {
                this.options.r = r;
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * A map object which allows to map options attributes to element
             * attributes.
             *
             * @name Highcharts.AnnotationControllableCircle.attrsMap
             * @type {Highcharts.Dictionary<string>}
             */
            ControllableCircle.attrsMap = merge(ControllablePath.attrsMap, { r: 'r' });
            return ControllableCircle;
        }());

        return ControllableCircle;
    });
    _registerModule(_modules, 'Extensions/Annotations/Controllables/ControllableLabel.js', [_modules['Extensions/Annotations/Mixins/ControllableMixin.js'], _modules['Core/FormatUtilities.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Renderer/SVG/SVGRenderer.js'], _modules['Core/Tooltip.js'], _modules['Core/Utilities.js']], function (ControllableMixin, F, MockPoint, SVGRenderer, Tooltip, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Imports
         *
         * */
        var format = F.format;
        var symbols = SVGRenderer.prototype.symbols;
        var extend = U.extend,
            isNumber = U.isNumber,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A controllable label class.
         *
         * @requires modules/annotations
         *
         * @private
         * @class
         * @name Highcharts.AnnotationControllableLabel
         *
         * @param {Highcharts.Annotation} annotation
         * An annotation instance.
         * @param {Highcharts.AnnotationsLabelOptions} options
         * A label's options.
         * @param {number} index
         * Index of the label.
         */
        var ControllableLabel = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function ControllableLabel(annotation, options, index) {
                    /* *
                     *
                     *  Properties
                     *
                     * */
                    this.addControlPoints = ControllableMixin.addControlPoints;
                this.attr = ControllableMixin.attr;
                this.attrsFromOptions = ControllableMixin.attrsFromOptions;
                this.destroy = ControllableMixin.destroy;
                this.getPointsOptions = ControllableMixin.getPointsOptions;
                this.init = ControllableMixin.init;
                this.linkPoints = ControllableMixin.linkPoints;
                this.point = ControllableMixin.point;
                this.rotate = ControllableMixin.rotate;
                this.scale = ControllableMixin.scale;
                this.setControlPointsVisibility = ControllableMixin.setControlPointsVisibility;
                this.shouldBeDrawn = ControllableMixin.shouldBeDrawn;
                this.transform = ControllableMixin.transform;
                this.transformPoint = ControllableMixin.transformPoint;
                this.translateShape = ControllableMixin.translateShape;
                this.update = ControllableMixin.update;
                this.init(annotation, options, index);
                this.collection = 'labels';
            }
            /* *
             *
             *  Static Functions
             *
             * */
            /**
             * Returns new aligned position based alignment options and box to align to.
             * It is almost a one-to-one copy from SVGElement.prototype.align
             * except it does not use and mutate an element
             *
             * @param {Highcharts.AnnotationAlignObject} alignOptions
             *
             * @param {Highcharts.BBoxObject} box
             *
             * @return {Highcharts.PositionObject}
             * Aligned position.
             */
            ControllableLabel.alignedPosition = function (alignOptions, box) {
                var align = alignOptions.align,
                    vAlign = alignOptions.verticalAlign;
                var x = (box.x || 0) + (alignOptions.x || 0),
                    y = (box.y || 0) + (alignOptions.y || 0),
                    alignFactor,
                    vAlignFactor;
                if (align === 'right') {
                    alignFactor = 1;
                }
                else if (align === 'center') {
                    alignFactor = 2;
                }
                if (alignFactor) {
                    x += (box.width - (alignOptions.width || 0)) / alignFactor;
                }
                if (vAlign === 'bottom') {
                    vAlignFactor = 1;
                }
                else if (vAlign === 'middle') {
                    vAlignFactor = 2;
                }
                if (vAlignFactor) {
                    y += (box.height - (alignOptions.height || 0)) / vAlignFactor;
                }
                return {
                    x: Math.round(x),
                    y: Math.round(y)
                };
            };
            /**
             * Returns new alignment options for a label if the label is outside the
             * plot area. It is almost a one-to-one copy from
             * Series.prototype.justifyDataLabel except it does not mutate the label and
             * it works with absolute instead of relative position.
             */
            ControllableLabel.justifiedOptions = function (chart, label, alignOptions, alignAttr) {
                var align = alignOptions.align,
                    verticalAlign = alignOptions.verticalAlign,
                    padding = label.box ? 0 : (label.padding || 0),
                    bBox = label.getBBox(), 
                    //
                    options = {
                        align: align,
                        verticalAlign: verticalAlign,
                        x: alignOptions.x,
                        y: alignOptions.y,
                        width: label.width,
                        height: label.height
                    }, 
                    //
                    x = (alignAttr.x || 0) - chart.plotLeft,
                    y = (alignAttr.y || 0) - chart.plotTop;
                var off;
                // Off left
                off = x + padding;
                if (off < 0) {
                    if (align === 'right') {
                        options.align = 'left';
                    }
                    else {
                        options.x = (options.x || 0) - off;
                    }
                }
                // Off right
                off = x + bBox.width - padding;
                if (off > chart.plotWidth) {
                    if (align === 'left') {
                        options.align = 'right';
                    }
                    else {
                        options.x = (options.x || 0) + chart.plotWidth - off;
                    }
                }
                // Off top
                off = y + padding;
                if (off < 0) {
                    if (verticalAlign === 'bottom') {
                        options.verticalAlign = 'top';
                    }
                    else {
                        options.y = (options.y || 0) - off;
                    }
                }
                // Off bottom
                off = y + bBox.height - padding;
                if (off > chart.plotHeight) {
                    if (verticalAlign === 'top') {
                        options.verticalAlign = 'bottom';
                    }
                    else {
                        options.y = (options.y || 0) + chart.plotHeight - off;
                    }
                }
                return options;
            };
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Translate the point of the label by deltaX and deltaY translations.
             * The point is the label's anchor.
             *
             * @param {number} dx translation for x coordinate
             * @param {number} dy translation for y coordinate
             */
            ControllableLabel.prototype.translatePoint = function (dx, dy) {
                ControllableMixin.translatePoint.call(this, dx, dy, 0);
            };
            /**
             * Translate x and y position relative to the label's anchor.
             *
             * @param {number} dx translation for x coordinate
             * @param {number} dy translation for y coordinate
             */
            ControllableLabel.prototype.translate = function (dx, dy) {
                var chart = this.annotation.chart, 
                    // Annotation.options
                    labelOptions = this.annotation.userOptions, 
                    // Chart.options.annotations
                    annotationIndex = chart.annotations.indexOf(this.annotation),
                    chartAnnotations = chart.options.annotations,
                    chartOptions = chartAnnotations[annotationIndex];
                if (chart.inverted) {
                    var temp = dx;
                    dx = dy;
                    dy = temp;
                }
                // Local options:
                this.options.x += dx;
                this.options.y += dy;
                // Options stored in chart:
                chartOptions[this.collection][this.index].x = this.options.x;
                chartOptions[this.collection][this.index].y = this.options.y;
                labelOptions[this.collection][this.index].x = this.options.x;
                labelOptions[this.collection][this.index].y = this.options.y;
            };
            ControllableLabel.prototype.render = function (parent) {
                var options = this.options,
                    attrs = this.attrsFromOptions(options),
                    style = options.style;
                this.graphic = this.annotation.chart.renderer
                    .label('', 0, -9999, // #10055
                options.shape, null, null, options.useHTML, null, 'annotation-label')
                    .attr(attrs)
                    .add(parent);
                if (!this.annotation.chart.styledMode) {
                    if (style.color === 'contrast') {
                        style.color = this.annotation.chart.renderer.getContrast(ControllableLabel.shapesWithoutBackground.indexOf(options.shape) > -1 ? '#FFFFFF' : options.backgroundColor);
                    }
                    this.graphic
                        .css(options.style)
                        .shadow(options.shadow);
                }
                if (options.className) {
                    this.graphic.addClass(options.className);
                }
                this.graphic.labelrank = options.labelrank;
                ControllableMixin.render.call(this);
            };
            ControllableLabel.prototype.redraw = function (animation) {
                var options = this.options,
                    text = this.text || options.format || options.text,
                    label = this.graphic,
                    point = this.points[0];
                label.attr({
                    text: text ?
                        format(text, point.getLabelConfig(), this.annotation.chart) :
                        options.formatter.call(point, this)
                });
                var anchor = this.anchor(point);
                var attrs = this.position(anchor);
                if (attrs) {
                    label.alignAttr = attrs;
                    attrs.anchorX = anchor.absolutePosition.x;
                    attrs.anchorY = anchor.absolutePosition.y;
                    label[animation ? 'animate' : 'attr'](attrs);
                }
                else {
                    label.attr({
                        x: 0,
                        y: -9999 // #10055
                    });
                }
                label.placed = !!attrs;
                ControllableMixin.redraw.call(this, animation);
            };
            /**
             * All basic shapes don't support alignTo() method except label.
             * For a controllable label, we need to subtract translation from
             * options.
             */
            ControllableLabel.prototype.anchor = function (_point) {
                var anchor = ControllableMixin.anchor.apply(this,
                    arguments),
                    x = this.options.x || 0,
                    y = this.options.y || 0;
                anchor.absolutePosition.x -= x;
                anchor.absolutePosition.y -= y;
                anchor.relativePosition.x -= x;
                anchor.relativePosition.y -= y;
                return anchor;
            };
            /**
             * Returns the label position relative to its anchor.
             *
             * @param {Highcharts.AnnotationAnchorObject} anchor
             *
             * @return {Highcharts.PositionObject|null}
             */
            ControllableLabel.prototype.position = function (anchor) {
                var item = this.graphic,
                    chart = this.annotation.chart,
                    point = this.points[0],
                    itemOptions = this.options,
                    anchorAbsolutePosition = anchor.absolutePosition,
                    anchorRelativePosition = anchor.relativePosition;
                var itemPosition,
                    alignTo,
                    itemPosRelativeX,
                    itemPosRelativeY,
                    showItem = point.series.visible &&
                        MockPoint.prototype.isInsidePlot.call(point);
                var _a = item.width,
                    width = _a === void 0 ? 0 : _a,
                    _b = item.height,
                    height = _b === void 0 ? 0 : _b;
                if (showItem) {
                    if (itemOptions.distance) {
                        itemPosition = Tooltip.prototype.getPosition.call({
                            chart: chart,
                            distance: pick(itemOptions.distance, 16)
                        }, width, height, {
                            plotX: anchorRelativePosition.x,
                            plotY: anchorRelativePosition.y,
                            negative: point.negative,
                            ttBelow: point.ttBelow,
                            h: (anchorRelativePosition.height || anchorRelativePosition.width)
                        });
                    }
                    else if (itemOptions.positioner) {
                        itemPosition = itemOptions.positioner.call(this);
                    }
                    else {
                        alignTo = {
                            x: anchorAbsolutePosition.x,
                            y: anchorAbsolutePosition.y,
                            width: 0,
                            height: 0
                        };
                        itemPosition = ControllableLabel.alignedPosition(extend(itemOptions, {
                            width: width,
                            height: height
                        }), alignTo);
                        if (this.options.overflow === 'justify') {
                            itemPosition = ControllableLabel.alignedPosition(ControllableLabel.justifiedOptions(chart, item, itemOptions, itemPosition), alignTo);
                        }
                    }
                    if (itemOptions.crop) {
                        itemPosRelativeX = itemPosition.x - chart.plotLeft;
                        itemPosRelativeY = itemPosition.y - chart.plotTop;
                        showItem =
                            chart.isInsidePlot(itemPosRelativeX, itemPosRelativeY) &&
                                chart.isInsidePlot(itemPosRelativeX + width, itemPosRelativeY + height);
                    }
                }
                return showItem ? itemPosition : null;
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * A map object which allows to map options attributes to element attributes
             *
             * @type {Highcharts.Dictionary<string>}
             */
            ControllableLabel.attrsMap = {
                backgroundColor: 'fill',
                borderColor: 'stroke',
                borderWidth: 'stroke-width',
                zIndex: 'zIndex',
                borderRadius: 'r',
                padding: 'padding'
            };
            /**
             * Shapes which do not have background - the object is used for proper
             * setting of the contrast color.
             *
             * @type {Array<string>}
             */
            ControllableLabel.shapesWithoutBackground = ['connector'];
            return ControllableLabel;
        }());
        /**
         * General symbol definition for labels with connector
         * @private
         */
        symbols.connector = function (x, y, w, h, options) {
            var anchorX = options && options.anchorX,
                anchorY = options && options.anchorY;
            var path,
                yOffset,
                lateral = w / 2;
            if (isNumber(anchorX) && isNumber(anchorY)) {
                path = [['M', anchorX, anchorY]];
                // Prefer 45 deg connectors
                yOffset = y - anchorY;
                if (yOffset < 0) {
                    yOffset = -h - yOffset;
                }
                if (yOffset < w) {
                    lateral = anchorX < x + (w / 2) ? yOffset : w - yOffset;
                }
                // Anchor below label
                if (anchorY > y + h) {
                    path.push(['L', x + lateral, y + h]);
                    // Anchor above label
                }
                else if (anchorY < y) {
                    path.push(['L', x + lateral, y]);
                    // Anchor left of label
                }
                else if (anchorX < x) {
                    path.push(['L', x, y + h / 2]);
                    // Anchor right of label
                }
                else if (anchorX > x + w) {
                    path.push(['L', x + w, y + h / 2]);
                }
            }
            return path || [];
        };

        return ControllableLabel;
    });
    _registerModule(_modules, 'Extensions/Annotations/Controllables/ControllableImage.js', [_modules['Extensions/Annotations/Controllables/ControllableLabel.js'], _modules['Extensions/Annotations/Mixins/ControllableMixin.js']], function (ControllableLabel, ControllableMixin) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * A controllable image class.
         *
         * @requires modules/annotations
         *
         * @private
         * @class
         * @name Highcharts.AnnotationControllableImage
         *
         * @param {Highcharts.Annotation} annotation
         * An annotation instance.
         *
         * @param {Highcharts.AnnotationsShapeOptions} options
         * A controllable's options.
         *
         * @param {number} index
         * Index of the image.
         */
        var ControllableImage = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function ControllableImage(annotation, options, index) {
                    /* *
                     *
                     *  Properties
                     *
                     * */
                    this.addControlPoints = ControllableMixin.addControlPoints;
                this.anchor = ControllableMixin.anchor;
                this.attr = ControllableMixin.attr;
                this.attrsFromOptions = ControllableMixin.attrsFromOptions;
                this.destroy = ControllableMixin.destroy;
                this.getPointsOptions = ControllableMixin.getPointsOptions;
                this.init = ControllableMixin.init;
                this.linkPoints = ControllableMixin.linkPoints;
                this.point = ControllableMixin.point;
                this.rotate = ControllableMixin.rotate;
                this.scale = ControllableMixin.scale;
                this.setControlPointsVisibility = ControllableMixin.setControlPointsVisibility;
                this.shouldBeDrawn = ControllableMixin.shouldBeDrawn;
                this.transform = ControllableMixin.transform;
                this.transformPoint = ControllableMixin.transformPoint;
                this.translatePoint = ControllableMixin.translatePoint;
                this.translateShape = ControllableMixin.translateShape;
                this.update = ControllableMixin.update;
                /**
                 * @type 'image'
                 */
                this.type = 'image';
                this.translate = ControllableMixin.translateShape;
                this.init(annotation, options, index);
                this.collection = 'shapes';
            }
            ControllableImage.prototype.render = function (parent) {
                var attrs = this.attrsFromOptions(this.options),
                    options = this.options;
                this.graphic = this.annotation.chart.renderer
                    .image(options.src, 0, -9e9, options.width, options.height)
                    .attr(attrs)
                    .add(parent);
                this.graphic.width = options.width;
                this.graphic.height = options.height;
                ControllableMixin.render.call(this);
            };
            ControllableImage.prototype.redraw = function (animation) {
                var anchor = this.anchor(this.points[0]),
                    position = ControllableLabel.prototype.position.call(this,
                    anchor);
                if (position) {
                    this.graphic[animation ? 'animate' : 'attr']({
                        x: position.x,
                        y: position.y
                    });
                }
                else {
                    this.graphic.attr({
                        x: 0,
                        y: -9e9
                    });
                }
                this.graphic.placed = Boolean(position);
                ControllableMixin.redraw.call(this, animation);
            };
            /* *
             *
             *  Static Properties
             *
             * */
            /**
             * A map object which allows to map options attributes to element attributes
             *
             * @name Highcharts.AnnotationControllableImage.attrsMap
             * @type {Highcharts.Dictionary<string>}
             */
            ControllableImage.attrsMap = {
                width: 'width',
                height: 'height',
                zIndex: 'zIndex'
            };
            return ControllableImage;
        }());

        return ControllableImage;
    });
    _registerModule(_modules, 'Extensions/Annotations/Annotations.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Chart/Chart.js'], _modules['Extensions/Annotations/Mixins/ControllableMixin.js'], _modules['Extensions/Annotations/Controllables/ControllableRect.js'], _modules['Extensions/Annotations/Controllables/ControllableCircle.js'], _modules['Extensions/Annotations/Controllables/ControllablePath.js'], _modules['Extensions/Annotations/Controllables/ControllableImage.js'], _modules['Extensions/Annotations/Controllables/ControllableLabel.js'], _modules['Extensions/Annotations/ControlPoint.js'], _modules['Extensions/Annotations/Mixins/EventEmitterMixin.js'], _modules['Core/Globals.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Pointer.js'], _modules['Core/Utilities.js'], _modules['Core/Color/Palette.js']], function (A, Chart, ControllableMixin, ControllableRect, ControllableCircle, ControllablePath, ControllableImage, ControllableLabel, ControlPoint, EventEmitterMixin, H, MockPoint, Pointer, U, palette) {
        /* *
         *
         *  (c) 2009-2021 Highsoft, Black Label
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var getDeferredAnimation = A.getDeferredAnimation;
        var chartProto = Chart.prototype;
        var addEvent = U.addEvent,
            defined = U.defined,
            destroyObjectProperties = U.destroyObjectProperties,
            erase = U.erase,
            extend = U.extend,
            find = U.find,
            fireEvent = U.fireEvent,
            merge = U.merge,
            pick = U.pick,
            splat = U.splat,
            wrap = U.wrap;
        /* *********************************************************************
         *
         * ANNOTATION
         *
         ******************************************************************** */
        /**
         * Possible directions for draggable annotations. An empty string (`''`)
         * makes the annotation undraggable.
         *
         * @typedef {''|'x'|'xy'|'y'} Highcharts.AnnotationDraggableValue
         */
        /**
         * @private
         * @typedef {
         *          Highcharts.AnnotationControllableCircle|
         *          Highcharts.AnnotationControllableImage|
         *          Highcharts.AnnotationControllablePath|
         *          Highcharts.AnnotationControllableRect
         *          }
         *          Highcharts.AnnotationShapeType
         * @requires modules/annotations
         */
        /**
         * @private
         * @typedef {
         *          Highcharts.AnnotationControllableLabel
         *          }
         *          Highcharts.AnnotationLabelType
         * @requires modules/annotations
         */
        /**
         * A point-like object, a mock point or a point used in series.
         * @private
         * @typedef {Highcharts.AnnotationMockPoint|Highcharts.Point} Highcharts.AnnotationPointType
         * @requires modules/annotations
         */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * An annotation class which serves as a container for items like labels or
         * shapes. Created items are positioned on the chart either by linking them to
         * existing points or created mock points
         *
         * @class
         * @name Highcharts.Annotation
         *
         * @param {Highcharts.Chart} chart a chart instance
         * @param {Highcharts.AnnotationsOptions} userOptions the options object
         */
        var Annotation = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function Annotation(chart, userOptions) {
                    /* *
                     *
                     *  Properties
                     *
                     * */
                    this.annotation = void 0;
                this.coll = 'annotations';
                this.collection = void 0;
                this.animationConfig = void 0;
                this.graphic = void 0;
                this.group = void 0;
                this.labelCollector = void 0;
                this.labelsGroup = void 0;
                this.shapesGroup = void 0;
                var labelsAndShapes;
                /**
                 * The chart that the annotation belongs to.
                 *
                 * @type {Highcharts.Chart}
                 */
                this.chart = chart;
                /**
                 * The array of points which defines the annotation.
                 *
                 * @type {Array<Highcharts.Point>}
                 */
                this.points = [];
                /**
                 * The array of control points.
                 *
                 * @private
                 * @name Highcharts.Annotation#controlPoints
                 * @type {Array<Annotation.ControlPoint>}
                 */
                this.controlPoints = [];
                this.coll = 'annotations';
                /**
                 * The array of labels which belong to the annotation.
                 *
                 * @private
                 * @name Highcharts.Annotation#labels
                 * @type {Array<Highcharts.AnnotationLabelType>}
                 */
                this.labels = [];
                /**
                 * The array of shapes which belong to the annotation.
                 *
                 * @private
                 * @name Highcharts.Annotation#shapes
                 * @type {Array<Highcharts.AnnotationShapeType>}
                 */
                this.shapes = [];
                /**
                 * The options for the annotations.
                 *
                 * @name Highcharts.Annotation#options
                 * @type {Highcharts.AnnotationsOptions}
                 */
                this.options = merge(this.defaultOptions, userOptions);
                /**
                 * The user options for the annotations.
                 *
                 * @name Highcharts.Annotation#userOptions
                 * @type {Highcharts.AnnotationsOptions}
                 */
                this.userOptions = userOptions;
                // Handle labels and shapes - those are arrays
                // Merging does not work with arrays (stores reference)
                labelsAndShapes = this.getLabelsAndShapesOptions(this.options, userOptions);
                this.options.labels = labelsAndShapes.labels;
                this.options.shapes = labelsAndShapes.shapes;
                /**
                 * The callback that reports to the overlapping-labels module which
                 * labels it should account for.
                 * @private
                 * @name Highcharts.Annotation#labelCollector
                 * @type {Function}
                 */
                /**
                 * The group svg element.
                 *
                 * @name Highcharts.Annotation#group
                 * @type {Highcharts.SVGElement}
                 */
                /**
                 * The group svg element of the annotation's shapes.
                 *
                 * @name Highcharts.Annotation#shapesGroup
                 * @type {Highcharts.SVGElement}
                 */
                /**
                 * The group svg element of the annotation's labels.
                 *
                 * @name Highcharts.Annotation#labelsGroup
                 * @type {Highcharts.SVGElement}
                 */
                this.init(chart, this.options);
            }
            /**
             * Initialize the annotation.
             * @private
             */
            Annotation.prototype.init = function () {
                var chart = this.chart,
                    animOptions = this.options.animation;
                this.linkPoints();
                this.addControlPoints();
                this.addShapes();
                this.addLabels();
                this.setLabelCollector();
                this.animationConfig = getDeferredAnimation(chart, animOptions);
            };
            Annotation.prototype.getLabelsAndShapesOptions = function (baseOptions, newOptions) {
                var mergedOptions = {};
                ['labels', 'shapes'].forEach(function (name) {
                    if (baseOptions[name]) {
                        mergedOptions[name] = splat(newOptions[name]).map(function (basicOptions, i) {
                            return merge(baseOptions[name][i], basicOptions);
                        });
                    }
                });
                return mergedOptions;
            };
            Annotation.prototype.addShapes = function () {
                (this.options.shapes || []).forEach(function (shapeOptions, i) {
                    var shape = this.initShape(shapeOptions,
                        i);
                    merge(true, this.options.shapes[i], shape.options);
                }, this);
            };
            Annotation.prototype.addLabels = function () {
                (this.options.labels || []).forEach(function (labelsOptions, i) {
                    var labels = this.initLabel(labelsOptions,
                        i);
                    merge(true, this.options.labels[i], labels.options);
                }, this);
            };
            Annotation.prototype.addClipPaths = function () {
                this.setClipAxes();
                if (this.clipXAxis && this.clipYAxis) {
                    this.clipRect = this.chart.renderer.clipRect(this.getClipBox());
                }
            };
            Annotation.prototype.setClipAxes = function () {
                var xAxes = this.chart.xAxis,
                    yAxes = this.chart.yAxis,
                    linkedAxes = (this.options.labels || [])
                        .concat(this.options.shapes || [])
                        .reduce(function (axes,
                    labelOrShape) {
                        return [
                            xAxes[labelOrShape &&
                                labelOrShape.point &&
                                labelOrShape.point.xAxis] || axes[0],
                            yAxes[labelOrShape &&
                                labelOrShape.point &&
                                labelOrShape.point.yAxis] || axes[1]
                        ];
                }, []);
                this.clipXAxis = linkedAxes[0];
                this.clipYAxis = linkedAxes[1];
            };
            Annotation.prototype.getClipBox = function () {
                if (this.clipXAxis && this.clipYAxis) {
                    return {
                        x: this.clipXAxis.left,
                        y: this.clipYAxis.top,
                        width: this.clipXAxis.width,
                        height: this.clipYAxis.height
                    };
                }
            };
            Annotation.prototype.setLabelCollector = function () {
                var annotation = this;
                annotation.labelCollector = function () {
                    return annotation.labels.reduce(function (labels, label) {
                        if (!label.options.allowOverlap) {
                            labels.push(label.graphic);
                        }
                        return labels;
                    }, []);
                };
                annotation.chart.labelCollectors.push(annotation.labelCollector);
            };
            /**
             * Set an annotation options.
             * @private
             * @param {Highcharts.AnnotationsOptions} - user options for an annotation
             */
            Annotation.prototype.setOptions = function (userOptions) {
                this.options = merge(this.defaultOptions, userOptions);
            };
            Annotation.prototype.redraw = function (animation) {
                this.linkPoints();
                if (!this.graphic) {
                    this.render();
                }
                if (this.clipRect) {
                    this.clipRect.animate(this.getClipBox());
                }
                this.redrawItems(this.shapes, animation);
                this.redrawItems(this.labels, animation);
                ControllableMixin.redraw.call(this, animation);
            };
            /**
             * @private
             * @param {Array<Highcharts.AnnotationControllable>} items
             * @param {boolean} [animation]
             */
            Annotation.prototype.redrawItems = function (items, animation) {
                var i = items.length;
                // needs a backward loop
                // labels/shapes array might be modified
                // due to destruction of the item
                while (i--) {
                    this.redrawItem(items[i], animation);
                }
            };
            /**
             * @private
             * @param {Array<Highcharts.AnnotationControllable>} items
             */
            Annotation.prototype.renderItems = function (items) {
                var i = items.length;
                while (i--) {
                    this.renderItem(items[i]);
                }
            };
            Annotation.prototype.render = function () {
                var renderer = this.chart.renderer;
                this.graphic = renderer
                    .g('annotation')
                    .attr({
                    opacity: 0,
                    zIndex: this.options.zIndex,
                    visibility: this.options.visible ?
                        'visible' :
                        'hidden'
                })
                    .add();
                this.shapesGroup = renderer
                    .g('annotation-shapes')
                    .add(this.graphic)
                    .clip(this.chart.plotBoxClip);
                this.labelsGroup = renderer
                    .g('annotation-labels')
                    .attr({
                    // hideOverlappingLabels requires translation
                    translateX: 0,
                    translateY: 0
                })
                    .add(this.graphic);
                this.addClipPaths();
                if (this.clipRect) {
                    this.graphic.clip(this.clipRect);
                }
                // Render shapes and labels before adding events (#13070).
                this.renderItems(this.shapes);
                this.renderItems(this.labels);
                this.addEvents();
                ControllableMixin.render.call(this);
            };
            /**
             * Set the annotation's visibility.
             * @private
             * @param {boolean} [visible]
             * Whether to show or hide an annotation. If the param is omitted, the
             * annotation's visibility is toggled.
             */
            Annotation.prototype.setVisibility = function (visible) {
                var options = this.options,
                    visibility = pick(visible, !options.visible);
                this.graphic.attr('visibility', visibility ? 'visible' : 'hidden');
                if (!visibility) {
                    this.setControlPointsVisibility(false);
                }
                options.visible = visibility;
            };
            Annotation.prototype.setControlPointsVisibility = function (visible) {
                var setItemControlPointsVisibility = function (item) {
                        item.setControlPointsVisibility(visible);
                };
                ControllableMixin.setControlPointsVisibility.call(this, visible);
                this.shapes.forEach(setItemControlPointsVisibility);
                this.labels.forEach(setItemControlPointsVisibility);
            };
            /**
             * Destroy the annotation. This function does not touch the chart
             * that the annotation belongs to (all annotations are kept in
             * the chart.annotations array) - it is recommended to use
             * {@link Highcharts.Chart#removeAnnotation} instead.
             * @private
             */
            Annotation.prototype.destroy = function () {
                var chart = this.chart,
                    destroyItem = function (item) {
                        item.destroy();
                };
                this.labels.forEach(destroyItem);
                this.shapes.forEach(destroyItem);
                this.clipXAxis = null;
                this.clipYAxis = null;
                erase(chart.labelCollectors, this.labelCollector);
                EventEmitterMixin.destroy.call(this);
                ControllableMixin.destroy.call(this);
                destroyObjectProperties(this, chart);
            };
            /**
             * See {@link Highcharts.Chart#removeAnnotation}.
             * @private
             */
            Annotation.prototype.remove = function () {
                // Let chart.update() remove annoations on demand
                return this.chart.removeAnnotation(this);
            };
            /**
             * Updates an annotation.
             *
             * @function Highcharts.Annotation#update
             *
             * @param {Partial<Highcharts.AnnotationsOptions>} userOptions
             * New user options for the annotation.
             *
             * @return {void}
             */
            Annotation.prototype.update = function (userOptions, redraw) {
                var chart = this.chart,
                    labelsAndShapes = this.getLabelsAndShapesOptions(this.userOptions,
                    userOptions),
                    userOptionsIndex = chart.annotations.indexOf(this),
                    options = merge(true,
                    this.userOptions,
                    userOptions);
                options.labels = labelsAndShapes.labels;
                options.shapes = labelsAndShapes.shapes;
                this.destroy();
                this.constructor(chart, options);
                // Update options in chart options, used in exporting (#9767):
                chart.options.annotations[userOptionsIndex] = options;
                this.isUpdating = true;
                if (pick(redraw, true)) {
                    chart.redraw();
                }
                fireEvent(this, 'afterUpdate');
                this.isUpdating = false;
            };
            /* *************************************************************
                * ITEM SECTION
                * Contains methods for handling a single item in an annotation
                **************************************************************** */
            /**
             * Initialisation of a single shape
             * @private
             * @param {Object} shapeOptions - a confg object for a single shape
             */
            Annotation.prototype.initShape = function (shapeOptions, index) {
                var options = merge(this.options.shapeOptions, {
                        controlPointOptions: this.options.controlPointOptions
                    },
                    shapeOptions),
                    shape = new Annotation.shapesMap[options.type](this,
                    options,
                    index);
                shape.itemType = 'shape';
                this.shapes.push(shape);
                return shape;
            };
            /**
             * Initialisation of a single label
             * @private
             */
            Annotation.prototype.initLabel = function (labelOptions, index) {
                var options = merge(this.options.labelOptions, {
                        controlPointOptions: this.options.controlPointOptions
                    },
                    labelOptions),
                    label = new ControllableLabel(this,
                    options,
                    index);
                label.itemType = 'label';
                this.labels.push(label);
                return label;
            };
            /**
             * Redraw a single item.
             * @private
             * @param {Annotation.Label|Annotation.Shape} item
             * @param {boolean} [animation]
             */
            Annotation.prototype.redrawItem = function (item, animation) {
                item.linkPoints();
                if (!item.shouldBeDrawn()) {
                    this.destroyItem(item);
                }
                else {
                    if (!item.graphic) {
                        this.renderItem(item);
                    }
                    item.redraw(pick(animation, true) && item.graphic.placed);
                    if (item.points.length) {
                        this.adjustVisibility(item);
                    }
                }
            };
            /**
             * Hide or show annotaiton attached to points.
             * @private
             * @param {Annotation.Label|Annotation.Shape} item
             */
            Annotation.prototype.adjustVisibility = function (item) {
                var hasVisiblePoints = false,
                    label = item.graphic;
                item.points.forEach(function (point) {
                    if (point.series.visible !== false &&
                        point.visible !== false) {
                        hasVisiblePoints = true;
                    }
                });
                if (!hasVisiblePoints) {
                    label.hide();
                }
                else if (label.visibility === 'hidden') {
                    label.show();
                }
            };
            /**
             * Destroy a single item.
             * @private
             * @param {Annotation.Label|Annotation.Shape} item
             */
            Annotation.prototype.destroyItem = function (item) {
                // erase from shapes or labels array
                erase(this[item.itemType + 's'], item);
                item.destroy();
            };
            /**
             * @private
             */
            Annotation.prototype.renderItem = function (item) {
                item.render(item.itemType === 'label' ?
                    this.labelsGroup :
                    this.shapesGroup);
            };
            /**
             * @private
             */
            Annotation.ControlPoint = ControlPoint;
            /**
             * @private
             */
            Annotation.MockPoint = MockPoint;
            /**
             * An object uses for mapping between a shape type and a constructor.
             * To add a new shape type extend this object with type name as a key
             * and a constructor as its value.
             */
            Annotation.shapesMap = {
                'rect': ControllableRect,
                'circle': ControllableCircle,
                'path': ControllablePath,
                'image': ControllableImage
            };
            /**
             * @private
             */
            Annotation.types = {};
            return Annotation;
        }());
        merge(true, Annotation.prototype, ControllableMixin, EventEmitterMixin, 
        // restore original Annotation implementation after mixin overwrite
        merge(Annotation.prototype, 
        /** @lends Highcharts.Annotation# */
        {
            /**
             * List of events for `annotation.options.events` that should not be
             * added to `annotation.graphic` but to the `annotation`.
             *
             * @private
             * @type {Array<string>}
             */
            nonDOMEvents: ['add', 'afterUpdate', 'drag', 'remove'],
            /**
             * A basic type of an annotation. It allows to add custom labels
             * or shapes. The items  can be tied to points, axis coordinates
             * or chart pixel coordinates.
             *
             * @sample highcharts/annotations/basic/
             *         Basic annotations
             * @sample highcharts/demo/annotations/
             *         Advanced annotations
             * @sample highcharts/css/annotations
             *         Styled mode
             * @sample highcharts/annotations-advanced/controllable
             *         Controllable items
             * @sample {highstock} stock/annotations/fibonacci-retracements
             *         Custom annotation, Fibonacci retracement
             *
             * @type         {Array<*>}
             * @since        6.0.0
             * @requires     modules/annotations
             * @optionparent annotations
             *
             * @private
             */
            defaultOptions: {
                /**
                 * Sets an ID for an annotation. Can be user later when
                 * removing an annotation in [Chart#removeAnnotation(id)](
                 * /class-reference/Highcharts.Chart#removeAnnotation) method.
                 *
                 * @type      {number|string}
                 * @apioption annotations.id
                 */
                /**
                 * Whether the annotation is visible.
                 *
                 * @sample highcharts/annotations/visible/
                 *         Set annotation visibility
                 */
                visible: true,
                /**
                 * Enable or disable the initial animation when a series is
                 * displayed for the `annotation`. The animation can also be set
                 * as a configuration object. Please note that this option only
                 * applies to the initial animation.
                 * For other animations, see [chart.animation](#chart.animation)
                 * and the animation parameter under the API methods.
                 * The following properties are supported:
                 *
                 * - `defer`: The animation delay time in milliseconds.
                 *
                 * @sample {highcharts} highcharts/annotations/defer/
                 *          Animation defer settings
                 * @type {boolean|Partial<Highcharts.AnimationOptionsObject>}
                 * @since 8.2.0
                 * @apioption annotations.animation
                 */
                animation: {},
                /**
                 * The animation delay time in milliseconds.
                 * Set to `0` renders annotation immediately.
                 * As `undefined` inherits defer time from the [series.animation.defer](#plotOptions.series.animation.defer).
                 *
                 * @type      {number}
                 * @since 8.2.0
                 * @apioption annotations.animation.defer
                 */
                /**
                 * Allow an annotation to be draggable by a user. Possible
                 * values are `'x'`, `'xy'`, `'y'` and `''` (disabled).
                 *
                 * @sample highcharts/annotations/draggable/
                 *         Annotations draggable: 'xy'
                 *
                 * @type {Highcharts.AnnotationDraggableValue}
                 */
                draggable: 'xy',
                /**
                 * Options for annotation's labels. Each label inherits options
                 * from the labelOptions object. An option from the labelOptions
                 * can be overwritten by config for a specific label.
                 *
                 * @requires modules/annotations
                 */
                labelOptions: {
                    /**
                     * The alignment of the annotation's label. If right,
                     * the right side of the label should be touching the point.
                     *
                     * @sample highcharts/annotations/label-position/
                     *         Set labels position
                     *
                     * @type {Highcharts.AlignValue}
                     */
                    align: 'center',
                    /**
                     * Whether to allow the annotation's labels to overlap.
                     * To make the labels less sensitive for overlapping,
                     * the can be set to 0.
                     *
                     * @sample highcharts/annotations/tooltip-like/
                     *         Hide overlapping labels
                     */
                    allowOverlap: false,
                    /**
                     * The background color or gradient for the annotation's
                     * label.
                     *
                     * @sample highcharts/annotations/label-presentation/
                     *         Set labels graphic options
                     *
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    /**
                     * The border color for the annotation's label.
                     *
                     * @sample highcharts/annotations/label-presentation/
                     *         Set labels graphic options
                     *
                     * @type {Highcharts.ColorString}
                     */
                    borderColor: palette.neutralColor100,
                    /**
                     * The border radius in pixels for the annotaiton's label.
                     *
                     * @sample highcharts/annotations/label-presentation/
                     *         Set labels graphic options
                     */
                    borderRadius: 3,
                    /**
                     * The border width in pixels for the annotation's label
                     *
                     * @sample highcharts/annotations/label-presentation/
                     *         Set labels graphic options
                     */
                    borderWidth: 1,
                    /**
                     * A class name for styling by CSS.
                     *
                     * @sample highcharts/css/annotations
                     *         Styled mode annotations
                     *
                     * @since 6.0.5
                     */
                    className: 'highcharts-no-tooltip',
                    /**
                     * Whether to hide the annotation's label
                     * that is outside the plot area.
                     *
                     * @sample highcharts/annotations/label-crop-overflow/
                     *         Crop or justify labels
                     */
                    crop: false,
                    /**
                     * The label's pixel distance from the point.
                     *
                     * @sample highcharts/annotations/label-position/
                     *         Set labels position
                     *
                     * @type      {number}
                     * @apioption annotations.labelOptions.distance
                     */
                    /**
                     * A
                     * [format](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting)
                     * string for the data label.
                     *
                     * @see [plotOptions.series.dataLabels.format](plotOptions.series.dataLabels.format.html)
                     *
                     * @sample highcharts/annotations/label-text/
                     *         Set labels text
                     *
                     * @type      {string}
                     * @apioption annotations.labelOptions.format
                     */
                    /**
                     * Alias for the format option.
                     *
                     * @see [format](annotations.labelOptions.format.html)
                     *
                     * @sample highcharts/annotations/label-text/
                     *         Set labels text
                     *
                     * @type      {string}
                     * @apioption annotations.labelOptions.text
                     */
                    /**
                     * Callback JavaScript function to format the annotation's
                     * label. Note that if a `format` or `text` are defined,
                     * the format or text take precedence and the formatter is
                     * ignored. `This` refers to a point object.
                     *
                     * @sample highcharts/annotations/label-text/
                     *         Set labels text
                     *
                     * @type    {Highcharts.FormatterCallbackFunction<Highcharts.Point>}
                     * @default function () { return defined(this.y) ? this.y : 'Annotation label'; }
                     */
                    formatter: function () {
                        return defined(this.y) ? this.y : 'Annotation label';
                    },
                    /**
                     * Whether the annotation is visible in the exported data
                     * table.
                     *
                     * @sample highcharts/annotations/include-in-data-export/
                     *         Do not include in the data export
                     *
                     * @since 8.2.0
                     * @requires modules/export-data
                     */
                    includeInDataExport: true,
                    /**
                     * How to handle the annotation's label that flow outside
                     * the plot area. The justify option aligns the label inside
                     * the plot area.
                     *
                     * @sample highcharts/annotations/label-crop-overflow/
                     *         Crop or justify labels
                     *
                     * @validvalue ["allow", "justify"]
                     */
                    overflow: 'justify',
                    /**
                     * When either the borderWidth or the backgroundColor is
                     * set, this is the padding within the box.
                     *
                     * @sample highcharts/annotations/label-presentation/
                     *         Set labels graphic options
                     */
                    padding: 5,
                    /**
                     * The shadow of the box. The shadow can be an object
                     * configuration containing `color`, `offsetX`, `offsetY`,
                     * `opacity` and `width`.
                     *
                     * @sample highcharts/annotations/label-presentation/
                     *         Set labels graphic options
                     *
                     * @type {boolean|Highcharts.ShadowOptionsObject}
                     */
                    shadow: false,
                    /**
                     * The name of a symbol to use for the border around the
                     * label. Symbols are predefined functions on the Renderer
                     * object.
                     *
                     * @sample highcharts/annotations/shapes/
                     *         Available shapes for labels
                     */
                    shape: 'callout',
                    /**
                     * Styles for the annotation's label.
                     *
                     * @see [plotOptions.series.dataLabels.style](plotOptions.series.dataLabels.style.html)
                     *
                     * @sample highcharts/annotations/label-presentation/
                     *         Set labels graphic options
                     *
                     * @type {Highcharts.CSSObject}
                     */
                    style: {
                        /** @ignore */
                        fontSize: '11px',
                        /** @ignore */
                        fontWeight: 'normal',
                        /** @ignore */
                        color: 'contrast'
                    },
                    /**
                     * Whether to [use HTML](https://www.highcharts.com/docs/chart-concepts/labels-and-string-formatting#html)
                     * to render the annotation's label.
                     */
                    useHTML: false,
                    /**
                     * The vertical alignment of the annotation's label.
                     *
                     * @sample highcharts/annotations/label-position/
                     *         Set labels position
                     *
                     * @type {Highcharts.VerticalAlignValue}
                     */
                    verticalAlign: 'bottom',
                    /**
                     * The x position offset of the label relative to the point.
                     * Note that if a `distance` is defined, the distance takes
                     * precedence over `x` and `y` options.
                     *
                     * @sample highcharts/annotations/label-position/
                     *         Set labels position
                     */
                    x: 0,
                    /**
                     * The y position offset of the label relative to the point.
                     * Note that if a `distance` is defined, the distance takes
                     * precedence over `x` and `y` options.
                     *
                     * @sample highcharts/annotations/label-position/
                     *         Set labels position
                     */
                    y: -16
                },
                /**
                 * An array of labels for the annotation. For options that apply
                 * to multiple labels, they can be added to the
                 * [labelOptions](annotations.labelOptions.html).
                 *
                 * @type      {Array<*>}
                 * @extends   annotations.labelOptions
                 * @apioption annotations.labels
                 */
                /**
                 * This option defines the point to which the label will be
                 * connected. It can be either the point which exists in the
                 * series - it is referenced by the point's id - or a new point
                 * with defined x, y properties and optionally axes.
                 *
                 * @sample highcharts/annotations/mock-point/
                 *         Attach annotation to a mock point
                 *
                 * @declare   Highcharts.AnnotationMockPointOptionsObject
                 * @type      {string|*}
                 * @requires  modules/annotations
                 * @apioption annotations.labels.point
                 */
                /**
                 * The x position of the point. Units can be either in axis
                 * or chart pixel coordinates.
                 *
                 * @type      {number}
                 * @apioption annotations.labels.point.x
                 */
                /**
                 * The y position of the point. Units can be either in axis
                 * or chart pixel coordinates.
                 *
                 * @type      {number}
                 * @apioption annotations.labels.point.y
                 */
                /**
                 * This number defines which xAxis the point is connected to.
                 * It refers to either the axis id or the index of the axis in
                 * the xAxis array. If the option is not configured or the axis
                 * is not found the point's x coordinate refers to the chart
                 * pixels.
                 *
                 * @type      {number|string|null}
                 * @apioption annotations.labels.point.xAxis
                 */
                /**
                 * This number defines which yAxis the point is connected to.
                 * It refers to either the axis id or the index of the axis in
                 * the yAxis array. If the option is not configured or the axis
                 * is not found the point's y coordinate refers to the chart
                 * pixels.
                 *
                 * @type      {number|string|null}
                 * @apioption annotations.labels.point.yAxis
                 */
                /**
                 * An array of shapes for the annotation. For options that apply
                 * to multiple shapes, then can be added to the
                 * [shapeOptions](annotations.shapeOptions.html).
                 *
                 * @type      {Array<*>}
                 * @extends   annotations.shapeOptions
                 * @apioption annotations.shapes
                 */
                /**
                 * This option defines the point to which the shape will be
                 * connected. It can be either the point which exists in the
                 * series - it is referenced by the point's id - or a new point
                 * with defined x, y properties and optionally axes.
                 *
                 * @declare   Highcharts.AnnotationMockPointOptionsObject
                 * @type      {string|Highcharts.AnnotationMockPointOptionsObject}
                 * @extends   annotations.labels.point
                 * @apioption annotations.shapes.point
                 */
                /**
                 * An array of points for the shape. This option is available
                 * for shapes which can use multiple points such as path. A
                 * point can be either a point object or a point's id.
                 *
                 * @see [annotations.shapes.point](annotations.shapes.point.html)
                 *
                 * @declare   Highcharts.AnnotationMockPointOptionsObject
                 * @type      {Array<string|*>}
                 * @extends   annotations.labels.point
                 * @apioption annotations.shapes.points
                 */
                /**
                 * The URL for an image to use as the annotation shape. Note,
                 * type has to be set to `'image'`.
                 *
                 * @see [annotations.shapes.type](annotations.shapes.type)
                 * @sample highcharts/annotations/shape-src/
                 *         Define a marker image url for annotations
                 *
                 * @type      {string}
                 * @apioption annotations.shapes.src
                 */
                /**
                 * Id of the marker which will be drawn at the final vertex of
                 * the path. Custom markers can be defined in defs property.
                 *
                 * @see [defs.markers](defs.markers.html)
                 *
                 * @sample highcharts/annotations/custom-markers/
                 *         Define a custom marker for annotations
                 *
                 * @type      {string}
                 * @apioption annotations.shapes.markerEnd
                 */
                /**
                 * Id of the marker which will be drawn at the first vertex of
                 * the path. Custom markers can be defined in defs property.
                 *
                 * @see [defs.markers](defs.markers.html)
                 *
                 * @sample {highcharts} highcharts/annotations/custom-markers/
                 *         Define a custom marker for annotations
                 *
                 * @type      {string}
                 * @apioption annotations.shapes.markerStart
                 */
                /**
                 * Options for annotation's shapes. Each shape inherits options
                 * from the shapeOptions object. An option from the shapeOptions
                 * can be overwritten by config for a specific shape.
                 *
                 * @requires  modules/annotations
                 */
                shapeOptions: {
                    /**
                     * The width of the shape.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     *
                     * @type      {number}
                     * @apioption annotations.shapeOptions.width
                     **/
                    /**
                     * The height of the shape.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     *
                     * @type      {number}
                     * @apioption annotations.shapeOptions.height
                     */
                    /**
                     * The type of the shape, e.g. circle or rectangle.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     *
                     * @type      {string}
                     * @default   rect
                     * @apioption annotations.shapeOptions.type
                     */
                    /**
                     * The URL for an image to use as the annotation shape.
                     * Note, type has to be set to `'image'`.
                     *
                     * @see [annotations.shapeOptions.type](annotations.shapeOptions.type)
                     * @sample highcharts/annotations/shape-src/
                     *         Define a marker image url for annotations
                     *
                     * @type      {string}
                     * @apioption annotations.shapeOptions.src
                     */
                    /**
                     * Name of the dash style to use for the shape's stroke.
                     *
                     * @sample {highcharts} highcharts/plotoptions/series-dashstyle-all/
                     *         Possible values demonstrated
                     *
                     * @type      {Highcharts.DashStyleValue}
                     * @apioption annotations.shapeOptions.dashStyle
                     */
                    /**
                     * The color of the shape's stroke.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     *
                     * @type {Highcharts.ColorString}
                     */
                    stroke: 'rgba(0, 0, 0, 0.75)',
                    /**
                     * The pixel stroke width of the shape.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     */
                    strokeWidth: 1,
                    /**
                     * The color of the shape's fill.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     *
                     * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    fill: 'rgba(0, 0, 0, 0.75)',
                    /**
                     * The radius of the shape.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     */
                    r: 0,
                    /**
                     * Defines additional snapping area around an annotation
                     * making this annotation to focus. Defined in pixels.
                     */
                    snap: 2
                },
                /**
                 * Options for annotation's control points. Each control point
                 * inherits options from controlPointOptions object.
                 * Options from the controlPointOptions can be overwritten
                 * by options in a specific control point.
                 *
                 * @declare   Highcharts.AnnotationControlPointOptionsObject
                 * @requires  modules/annotations
                 * @apioption annotations.controlPointOptions
                 */
                controlPointOptions: {
                    /**
                     * @type      {Highcharts.AnnotationControlPointPositionerFunction}
                     * @apioption annotations.controlPointOptions.positioner
                     */
                    symbol: 'circle',
                    width: 10,
                    height: 10,
                    style: {
                        stroke: palette.neutralColor100,
                        'stroke-width': 2,
                        fill: palette.backgroundColor
                    },
                    visible: false,
                    events: {}
                },
                /**
                 * Event callback when annotation is added to the chart.
                 *
                 * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
                 * @since     7.1.0
                 * @apioption annotations.events.add
                 */
                /**
                 * Event callback when annotation is updated (e.g. drag and
                 * droppped or resized by control points).
                 *
                 * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
                 * @since     7.1.0
                 * @apioption annotations.events.afterUpdate
                 */
                /**
                 * Event callback when annotation is removed from the chart.
                 *
                 * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
                 * @since     7.1.0
                 * @apioption annotations.events.remove
                 */
                /**
                 * Events available in annotations.
                 *
                 * @requires modules/annotations
                 */
                events: {},
                /**
                 * The Z index of the annotation.
                 */
                zIndex: 6
            }
        }));
        H.extendAnnotation = function (Constructor, BaseConstructor, prototype, defaultOptions) {
            BaseConstructor = BaseConstructor || Annotation;
            extend(Constructor.prototype, merge(BaseConstructor.prototype, prototype));
            Constructor.prototype.defaultOptions = merge(Constructor.prototype.defaultOptions, defaultOptions || {});
        };
        /* *********************************************************************
         *
         * EXTENDING CHART PROTOTYPE
         *
         ******************************************************************** */
        extend(chartProto, /** @lends Highcharts.Chart# */ {
            initAnnotation: function (userOptions) {
                var Constructor = Annotation.types[userOptions.type] || Annotation,
                    annotation = new Constructor(this,
                    userOptions);
                this.annotations.push(annotation);
                return annotation;
            },
            /**
             * Add an annotation to the chart after render time.
             *
             * @param  {Highcharts.AnnotationsOptions} options
             *         The annotation options for the new, detailed annotation.
             * @param {boolean} [redraw]
             *
             * @return {Highcharts.Annotation} - The newly generated annotation.
             */
            addAnnotation: function (userOptions, redraw) {
                var annotation = this.initAnnotation(userOptions);
                this.options.annotations.push(annotation.options);
                if (pick(redraw, true)) {
                    annotation.redraw();
                    annotation.graphic.attr({
                        opacity: 1
                    });
                }
                return annotation;
            },
            /**
             * Remove an annotation from the chart.
             *
             * @param {number|string|Highcharts.Annotation} idOrAnnotation
             * The annotation's id or direct annotation object.
             */
            removeAnnotation: function (idOrAnnotation) {
                var annotations = this.annotations,
                    annotation = idOrAnnotation.coll === 'annotations' ?
                        idOrAnnotation :
                        find(annotations,
                    function (annotation) {
                            return annotation.options.id === idOrAnnotation;
                    });
                if (annotation) {
                    fireEvent(annotation, 'remove');
                    erase(this.options.annotations, annotation.options);
                    erase(annotations, annotation);
                    annotation.destroy();
                }
            },
            drawAnnotations: function () {
                this.plotBoxClip.attr(this.plotBox);
                this.annotations.forEach(function (annotation) {
                    annotation.redraw();
                    annotation.graphic.animate({
                        opacity: 1
                    }, annotation.animationConfig);
                });
            }
        });
        // Let chart.update() update annotations
        chartProto.collectionsWithUpdate.push('annotations');
        // Let chart.update() create annoations on demand
        chartProto.collectionsWithInit.annotations = [chartProto.addAnnotation];
        // Create lookups initially
        addEvent(Chart, 'afterInit', function () {
            this.annotations = [];
            if (!this.options.annotations) {
                this.options.annotations = [];
            }
        });
        chartProto.callbacks.push(function (chart) {
            chart.plotBoxClip = this.renderer.clipRect(this.plotBox);
            chart.controlPointsGroup = chart.renderer
                .g('control-points')
                .attr({ zIndex: 99 })
                .clip(chart.plotBoxClip)
                .add();
            chart.options.annotations.forEach(function (annotationOptions, i) {
                if (
                // Verify that it has not been previously added in a responsive rule
                !chart.annotations.some(function (annotation) {
                    return annotation.options === annotationOptions;
                })) {
                    var annotation = chart.initAnnotation(annotationOptions);
                    chart.options.annotations[i] = annotation.options;
                }
            });
            chart.drawAnnotations();
            addEvent(chart, 'redraw', chart.drawAnnotations);
            addEvent(chart, 'destroy', function () {
                chart.plotBoxClip.destroy();
                chart.controlPointsGroup.destroy();
            });
            addEvent(chart, 'exportData', function (event) {
                var annotations = chart.annotations,
                    csvColumnHeaderFormatter = ((this.options.exporting &&
                        this.options.exporting.csv) ||
                        {}).columnHeaderFormatter, 
                    // If second row doesn't have xValues
                    // then it is a title row thus multiple level header is in use.
                    multiLevelHeaders = !event.dataRows[1].xValues,
                    annotationHeader = (chart.options.lang &&
                        chart.options.lang.exportData &&
                        chart.options.lang.exportData.annotationHeader),
                    columnHeaderFormatter = function (index) {
                        var s;
                    if (csvColumnHeaderFormatter) {
                        s = csvColumnHeaderFormatter(index);
                        if (s !== false) {
                            return s;
                        }
                    }
                    s = annotationHeader + ' ' + index;
                    if (multiLevelHeaders) {
                        return {
                            columnTitle: s,
                            topLevelColumnTitle: s
                        };
                    }
                    return s;
                }, startRowLength = event.dataRows[0].length, annotationSeparator = (chart.options.exporting &&
                    chart.options.exporting.csv &&
                    chart.options.exporting.csv.annotations &&
                    chart.options.exporting.csv.annotations.itemDelimiter), joinAnnotations = (chart.options.exporting &&
                    chart.options.exporting.csv &&
                    chart.options.exporting.csv.annotations &&
                    chart.options.exporting.csv.annotations.join);
                annotations.forEach(function (annotation) {
                    if (annotation.options.labelOptions.includeInDataExport) {
                        annotation.labels.forEach(function (label) {
                            if (label.options.text) {
                                var annotationText_1 = label.options.text;
                                label.points.forEach(function (points) {
                                    var annotationX = points.x,
                                        xAxisIndex = points.series.xAxis ?
                                            points.series.xAxis.options.index :
                                            -1;
                                    var wasAdded = false;
                                    // Annotation not connected to any xAxis -
                                    // add new row.
                                    if (xAxisIndex === -1) {
                                        var n = event.dataRows[0].length,
                                            newRow = new Array(n);
                                        for (var i = 0; i < n; ++i) {
                                            newRow[i] = '';
                                        }
                                        newRow.push(annotationText_1);
                                        newRow.xValues = [];
                                        newRow.xValues[xAxisIndex] = annotationX;
                                        event.dataRows.push(newRow);
                                        wasAdded = true;
                                    }
                                    // Annotation placed on a exported data point
                                    // - add new column
                                    if (!wasAdded) {
                                        event.dataRows.forEach(function (row, rowIndex) {
                                            if (!wasAdded &&
                                                row.xValues &&
                                                xAxisIndex !== void 0 &&
                                                annotationX === row.xValues[xAxisIndex]) {
                                                if (joinAnnotations &&
                                                    row.length > startRowLength) {
                                                    row[row.length - 1] +=
                                                        annotationSeparator + annotationText_1;
                                                }
                                                else {
                                                    row.push(annotationText_1);
                                                }
                                                wasAdded = true;
                                            }
                                        });
                                    }
                                    // Annotation not placed on any exported data point,
                                    // but connected to the xAxis - add new row
                                    if (!wasAdded) {
                                        var n = event.dataRows[0].length,
                                            newRow = new Array(n);
                                        for (var i = 0; i < n; ++i) {
                                            newRow[i] = '';
                                        }
                                        newRow[0] = annotationX;
                                        newRow.push(annotationText_1);
                                        newRow.xValues = [];
                                        if (xAxisIndex !== void 0) {
                                            newRow.xValues[xAxisIndex] = annotationX;
                                        }
                                        event.dataRows.push(newRow);
                                    }
                                });
                            }
                        });
                    }
                });
                var maxRowLen = 0;
                event.dataRows.forEach(function (row) {
                    maxRowLen = Math.max(maxRowLen, row.length);
                });
                var newRows = maxRowLen - event.dataRows[0].length;
                for (var i = 0; i < newRows; i++) {
                    var header = columnHeaderFormatter(i + 1);
                    if (multiLevelHeaders) {
                        event.dataRows[0].push(header.topLevelColumnTitle);
                        event.dataRows[1].push(header.columnTitle);
                    }
                    else {
                        event.dataRows[0].push(header);
                    }
                }
            });
        });
        wrap(Pointer.prototype, 'onContainerMouseDown', function (proceed) {
            if (!this.chart.hasDraggedAnnotation) {
                proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        });
        H.Annotation = Annotation;

        return Annotation;
    });
    _registerModule(_modules, 'Mixins/Navigation.js', [], function () {
        /**
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var chartNavigation = {
                /**
                 * Initializes `chart.navigation` object which delegates `update()` methods
                 * to all other common classes (used in exporting and navigationBindings).
                 *
                 * @private
                 * @param {Highcharts.Chart} chart
                 *        The chart instance.
                 * @return {void}
                 */
                initUpdate: function (chart) {
                    if (!chart.navigation) {
                        chart.navigation = {
                            updates: [],
                            update: function (options,
            redraw) {
                                this.updates.forEach(function (updateConfig) {
                                    updateConfig.update.call(updateConfig.context,
            options,
            redraw);
                            });
                        }
                    };
                }
            },
            /**
             * Registers an `update()` method in the `chart.navigation` object.
             *
             * @private
             * @param {Highcharts.ChartNavigationUpdateFunction} update
             *        The `update()` method that will be called in `chart.update()`.
             * @param {Highcharts.Chart} chart
             *        The chart instance. `update()` will use that as a context
             *        (`this`).
             * @return {void}
             */
            addUpdate: function (update, chart) {
                if (!chart.navigation) {
                    this.initUpdate(chart);
                }
                chart.navigation.updates.push({
                    update: update,
                    context: chart
                });
            }
        };

        return chartNavigation;
    });
    _registerModule(_modules, 'Extensions/Annotations/NavigationBindings.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Core/Chart/Chart.js'], _modules['Mixins/Navigation.js'], _modules['Core/FormatUtilities.js'], _modules['Core/Globals.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Utilities.js']], function (Annotation, Chart, chartNavigationMixin, F, H, D, U) {
        /* *
         *
         *  (c) 2009-2021 Highsoft, Black Label
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var format = F.format;
        var setOptions = D.setOptions;
        var addEvent = U.addEvent,
            attr = U.attr,
            fireEvent = U.fireEvent,
            isArray = U.isArray,
            isFunction = U.isFunction,
            isNumber = U.isNumber,
            isObject = U.isObject,
            merge = U.merge,
            objectEach = U.objectEach,
            pick = U.pick;
        /**
         * A config object for navigation bindings in annotations.
         *
         * @interface Highcharts.NavigationBindingsOptionsObject
         */ /**
        * ClassName of the element for a binding.
        * @name Highcharts.NavigationBindingsOptionsObject#className
        * @type {string|undefined}
        */ /**
        * Last event to be fired after last step event.
        * @name Highcharts.NavigationBindingsOptionsObject#end
        * @type {Function|undefined}
        */ /**
        * Initial event, fired on a button click.
        * @name Highcharts.NavigationBindingsOptionsObject#init
        * @type {Function|undefined}
        */ /**
        * Event fired on first click on a chart.
        * @name Highcharts.NavigationBindingsOptionsObject#start
        * @type {Function|undefined}
        */ /**
        * Last event to be fired after last step event. Array of step events to be
        * called sequentially after each user click.
        * @name Highcharts.NavigationBindingsOptionsObject#steps
        * @type {Array<Function>|undefined}
        */
        var doc = H.doc,
            win = H.win,
            PREFIX = 'highcharts-';
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * IE 9-11 polyfill for Element.closest():
         * @private
         */
        function closestPolyfill(el, s) {
            var ElementProto = win.Element.prototype,
                elementMatches = ElementProto.matches ||
                    ElementProto.msMatchesSelector ||
                    ElementProto.webkitMatchesSelector,
                ret = null;
            if (ElementProto.closest) {
                ret = ElementProto.closest.call(el, s);
            }
            else {
                do {
                    if (elementMatches.call(el, s)) {
                        return el;
                    }
                    el = el.parentElement || el.parentNode;
                } while (el !== null && el.nodeType === 1);
            }
            return ret;
        }
        /**
         * @private
         * @interface bindingsUtils
         */
        var bindingsUtils = {
                /**
                 * Get field type according to value
                 *
                 * @private
                 * @function Highcharts.NavigationBindingsUtilsObject.getFieldType
                 *
                 * @param {'boolean'|'number'|'string'} value
                 * Atomic type (one of: string,
            number,
            boolean)
                 *
                 * @return {'checkbox'|'number'|'text'}
                 * Field type (one of: text,
            number,
            checkbox)
                 */
                getFieldType: function (value) {
                    return {
                        'string': 'text',
                        'number': 'number',
                        'boolean': 'checkbox'
                    }[typeof value];
            },
            /**
             * Update size of background (rect) in some annotations: Measure, Simple
             * Rect.
             *
             * @private
             * @function Highcharts.NavigationBindingsUtilsObject.updateRectSize
             *
             * @param {Highcharts.PointerEventObject} event
             * Normalized browser event
             *
             * @param {Highcharts.Annotation} annotation
             * Annotation to be updated
             */
            updateRectSize: function (event, annotation) {
                var chart = annotation.chart,
                    options = annotation.options.typeOptions,
                    coords = chart.pointer.getCoordinates(event),
                    coordsX = chart.navigationBindings.utils.getAssignedAxis(coords.xAxis),
                    coordsY = chart.navigationBindings.utils.getAssignedAxis(coords.yAxis),
                    width,
                    height;
                if (coordsX && coordsY) {
                    width = coordsX.value - options.point.x;
                    height = options.point.y - coordsY.value;
                    annotation.update({
                        typeOptions: {
                            background: {
                                width: chart.inverted ? height : width,
                                height: chart.inverted ? width : height
                            }
                        }
                    });
                }
            },
            /**
             * Returns the first xAxis or yAxis that was clicked with its value.
             *
             * @private
             * @function Highcharts.NavigationBindingsUtilsObject#getAssignedAxis
             *
             * @param {Array<Highcharts.PointerAxisCoordinateObject>} coords
             *        All the chart's x or y axes with a current pointer's axis value.
             *
             * @return {Highcharts.PointerAxisCoordinateObject}
             *         Object with a first found axis and its value that pointer
             *         is currently pointing.
             */
            getAssignedAxis: function (coords) {
                return coords.filter(function (coord) {
                    var axisMin = coord.axis.min,
                        axisMax = coord.axis.max, 
                        // Correct axis edges when axis has series
                        // with pointRange (like column)
                        minPointOffset = pick(coord.axis.minPointOffset, 0);
                    return isNumber(axisMin) && isNumber(axisMax) &&
                        coord.value >= (axisMin - minPointOffset) &&
                        coord.value <= (axisMax + minPointOffset) &&
                        // don't count navigator axis
                        !coord.axis.options.isInternal;
                })[0]; // If the axes overlap, return the first axis that was found.
            }
        };
        /**
         * @private
         */
        var NavigationBindings = /** @class */ (function () {
                /* *
                 *
                 *  Constructors
                 *
                 * */
                function NavigationBindings(chart, options) {
                    this.boundClassNames = void 0;
                this.selectedButton = void 0;
                this.chart = chart;
                this.options = options;
                this.eventsToUnbind = [];
                this.container = doc.getElementsByClassName(this.options.bindingsClassName || '');
            }
            // Private properties added by bindings:
            // Active (selected) annotation that is editted through popup/forms
            // activeAnnotation: Annotation
            // Holder for current step, used on mouse move to update bound object
            // mouseMoveEvent: function () {}
            // Next event in `step` array to be called on chart's click
            // nextEvent: function () {}
            // Index in the `step` array of the current event
            // stepIndex: 0
            // Flag to determine if current binding has steps
            // steps: true|false
            // Bindings holder for all events
            // selectedButton: {}
            // Holder for user options, returned from `start` event, and passed on to
            // `step`'s' and `end`.
            // currentUserDetails: {}
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Initi all events conencted to NavigationBindings.
             *
             * @private
             * @function Highcharts.NavigationBindings#initEvents
             */
            NavigationBindings.prototype.initEvents = function () {
                var navigation = this,
                    chart = navigation.chart,
                    bindingsContainer = navigation.container,
                    options = navigation.options;
                // Shorthand object for getting events for buttons:
                navigation.boundClassNames = {};
                objectEach((options.bindings || {}), function (value) {
                    navigation.boundClassNames[value.className] = value;
                });
                // Handle multiple containers with the same class names:
                [].forEach.call(bindingsContainer, function (subContainer) {
                    navigation.eventsToUnbind.push(addEvent(subContainer, 'click', function (event) {
                        var bindings = navigation.getButtonEvents(subContainer,
                            event);
                        if (bindings && bindings.button.className.indexOf('highcharts-disabled-btn') === -1) {
                            navigation.bindingsButtonClick(bindings.button, bindings.events, event);
                        }
                    }));
                });
                objectEach(options.events || {}, function (callback, eventName) {
                    if (isFunction(callback)) {
                        navigation.eventsToUnbind.push(addEvent(navigation, eventName, callback, { passive: false }));
                    }
                });
                navigation.eventsToUnbind.push(addEvent(chart.container, 'click', function (e) {
                    if (!chart.cancelClick &&
                        chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop, {
                            visiblePlotOnly: true
                        })) {
                        navigation.bindingsChartClick(this, e);
                    }
                }));
                navigation.eventsToUnbind.push(addEvent(chart.container, H.isTouchDevice ? 'touchmove' : 'mousemove', function (e) {
                    navigation.bindingsContainerMouseMove(this, e);
                }, H.isTouchDevice ? { passive: false } : void 0));
            };
            /**
             * Common chart.update() delegation, shared between bindings and exporting.
             *
             * @private
             * @function Highcharts.NavigationBindings#initUpdate
             */
            NavigationBindings.prototype.initUpdate = function () {
                var navigation = this;
                chartNavigationMixin.addUpdate(function (options) {
                    navigation.update(options);
                }, this.chart);
            };
            /**
             * Hook for click on a button, method selcts/unselects buttons,
             * then calls `bindings.init` callback.
             *
             * @private
             * @function Highcharts.NavigationBindings#bindingsButtonClick
             *
             * @param {Highcharts.HTMLDOMElement} [button]
             *        Clicked button
             *
             * @param {object} events
             *        Events passed down from bindings (`init`, `start`, `step`, `end`)
             *
             * @param {Highcharts.PointerEventObject} clickEvent
             *        Browser's click event
             */
            NavigationBindings.prototype.bindingsButtonClick = function (button, events, clickEvent) {
                var navigation = this,
                    chart = navigation.chart;
                if (navigation.selectedButtonElement) {
                    fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                    if (navigation.nextEvent) {
                        // Remove in-progress annotations adders:
                        if (navigation.currentUserDetails &&
                            navigation.currentUserDetails.coll === 'annotations') {
                            chart.removeAnnotation(navigation.currentUserDetails);
                        }
                        navigation.mouseMoveEvent = navigation.nextEvent = false;
                    }
                }
                navigation.selectedButton = events;
                navigation.selectedButtonElement = button;
                fireEvent(navigation, 'selectButton', { button: button });
                // Call "init" event, for example to open modal window
                if (events.init) {
                    events.init.call(navigation, button, clickEvent);
                }
                if (events.start || events.steps) {
                    chart.renderer.boxWrapper.addClass(PREFIX + 'draw-mode');
                }
            };
            /**
             * Hook for click on a chart, first click on a chart calls `start` event,
             * then on all subsequent clicks iterate over `steps` array.
             * When finished, calls `end` event.
             *
             * @private
             * @function Highcharts.NavigationBindings#bindingsChartClick
             *
             * @param {Highcharts.Chart} chart
             *        Chart that click was performed on.
             *
             * @param {Highcharts.PointerEventObject} clickEvent
             *        Browser's click event.
             */
            NavigationBindings.prototype.bindingsChartClick = function (chart, clickEvent) {
                chart = this.chart;
                var navigation = this,
                    selectedButton = navigation.selectedButton,
                    svgContainer = chart.renderer.boxWrapper;
                // Click outside popups, should close them and deselect the annotation
                if (navigation.activeAnnotation &&
                    !clickEvent.activeAnnotation &&
                    // Element could be removed in the child action, e.g. button
                    clickEvent.target.parentNode &&
                    // TO DO: Polyfill for IE11?
                    !closestPolyfill(clickEvent.target, '.' + PREFIX + 'popup')) {
                    fireEvent(navigation, 'closePopup');
                }
                if (!selectedButton || !selectedButton.start) {
                    return;
                }
                if (!navigation.nextEvent) {
                    // Call init method:
                    navigation.currentUserDetails = selectedButton.start.call(navigation, clickEvent);
                    // If steps exists (e.g. Annotations), bind them:
                    if (navigation.currentUserDetails && selectedButton.steps) {
                        navigation.stepIndex = 0;
                        navigation.steps = true;
                        navigation.mouseMoveEvent = navigation.nextEvent =
                            selectedButton.steps[navigation.stepIndex];
                    }
                    else {
                        fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                        svgContainer.removeClass(PREFIX + 'draw-mode');
                        navigation.steps = false;
                        navigation.selectedButton = null;
                        // First click is also the last one:
                        if (selectedButton.end) {
                            selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                        }
                    }
                }
                else {
                    navigation.nextEvent(clickEvent, navigation.currentUserDetails);
                    if (navigation.steps) {
                        navigation.stepIndex++;
                        if (selectedButton.steps[navigation.stepIndex]) {
                            // If we have more steps, bind them one by one:
                            navigation.mouseMoveEvent = navigation.nextEvent =
                                selectedButton.steps[navigation.stepIndex];
                        }
                        else {
                            fireEvent(navigation, 'deselectButton', { button: navigation.selectedButtonElement });
                            svgContainer.removeClass(PREFIX + 'draw-mode');
                            // That was the last step, call end():
                            if (selectedButton.end) {
                                selectedButton.end.call(navigation, clickEvent, navigation.currentUserDetails);
                            }
                            navigation.nextEvent = false;
                            navigation.mouseMoveEvent = false;
                            navigation.selectedButton = null;
                        }
                    }
                }
            };
            /**
             * Hook for mouse move on a chart's container. It calls current step.
             *
             * @private
             * @function Highcharts.NavigationBindings#bindingsContainerMouseMove
             *
             * @param {Highcharts.HTMLDOMElement} container
             *        Chart's container.
             *
             * @param {global.Event} moveEvent
             *        Browser's move event.
             */
            NavigationBindings.prototype.bindingsContainerMouseMove = function (_container, moveEvent) {
                if (this.mouseMoveEvent) {
                    this.mouseMoveEvent(moveEvent, this.currentUserDetails);
                }
            };
            /**
             * Translate fields (e.g. `params.period` or `marker.styles.color`) to
             * Highcharts options object (e.g. `{ params: { period } }`).
             *
             * @private
             * @function Highcharts.NavigationBindings#fieldsToOptions<T>
             *
             * @param {Highcharts.Dictionary<string>} fields
             *        Fields from popup form.
             *
             * @param {T} config
             *        Default config to be modified.
             *
             * @return {T}
             *         Modified config
             */
            NavigationBindings.prototype.fieldsToOptions = function (fields, config) {
                objectEach(fields, function (value, field) {
                    var parsedValue = parseFloat(value),
                        path = field.split('.'),
                        parent = config,
                        pathLength = path.length - 1;
                    // If it's a number (not "format" options), parse it:
                    if (isNumber(parsedValue) &&
                        !value.match(/px/g) &&
                        !field.match(/format/g)) {
                        value = parsedValue;
                    }
                    // Remove empty strings or values like 0
                    if (value !== '' && value !== 'undefined') {
                        path.forEach(function (name, index) {
                            var nextName = pick(path[index + 1], '');
                            if (pathLength === index) {
                                // Last index, put value:
                                parent[name] = value;
                            }
                            else if (!parent[name]) {
                                // Create middle property:
                                parent[name] = nextName.match(/\d/g) ? [] : {};
                                parent = parent[name];
                            }
                            else {
                                // Jump into next property
                                parent = parent[name];
                            }
                        });
                    }
                });
                return config;
            };
            /**
             * Shorthand method to deselect an annotation.
             *
             * @function Highcharts.NavigationBindings#deselectAnnotation
             */
            NavigationBindings.prototype.deselectAnnotation = function () {
                if (this.activeAnnotation) {
                    this.activeAnnotation.setControlPointsVisibility(false);
                    this.activeAnnotation = false;
                }
            };
            /**
             * Generates API config for popup in the same format as options for
             * Annotation object.
             *
             * @function Highcharts.NavigationBindings#annotationToFields
             *
             * @param {Highcharts.Annotation} annotation
             *        Annotations object
             *
             * @return {Highcharts.Dictionary<string>}
             *         Annotation options to be displayed in popup box
             */
            NavigationBindings.prototype.annotationToFields = function (annotation) {
                var options = annotation.options,
                    editables = NavigationBindings.annotationsEditable,
                    nestedEditables = editables.nestedOptions,
                    getFieldType = this.utils.getFieldType,
                    type = pick(options.type,
                    options.shapes && options.shapes[0] &&
                        options.shapes[0].type,
                    options.labels && options.labels[0] &&
                        options.labels[0].itemType, 'label'),
                    nonEditables = NavigationBindings.annotationsNonEditable[options.langKey] || [],
                    visualOptions = {
                        langKey: options.langKey,
                        type: type
                    };
                /**
                 * Nested options traversing. Method goes down to the options and copies
                 * allowed options (with values) to new object, which is last parameter:
                 * "parent".
                 *
                 * @private
                 *
                 * @param {*} option
                 *        Atomic type or object/array
                 *
                 * @param {string} key
                 *        Option name, for example "visible" or "x", "y"
                 *
                 * @param {object} parentEditables
                 *        Editables from NavigationBindings.annotationsEditable
                 *
                 * @param {object} parent
                 *        Where new options will be assigned
                 */
                function traverse(option, key, parentEditables, parent) {
                    var nextParent;
                    if (parentEditables &&
                        option &&
                        nonEditables.indexOf(key) === -1 &&
                        ((parentEditables.indexOf &&
                            parentEditables.indexOf(key)) >= 0 ||
                            parentEditables[key] || // nested array
                            parentEditables === true // simple array
                        )) {
                        // Roots:
                        if (isArray(option)) {
                            parent[key] = [];
                            option.forEach(function (arrayOption, i) {
                                if (!isObject(arrayOption)) {
                                    // Simple arrays, e.g. [String, Number, Boolean]
                                    traverse(arrayOption, 0, nestedEditables[key], parent[key]);
                                }
                                else {
                                    // Advanced arrays, e.g. [Object, Object]
                                    parent[key][i] = {};
                                    objectEach(arrayOption, function (nestedOption, nestedKey) {
                                        traverse(nestedOption, nestedKey, nestedEditables[key], parent[key][i]);
                                    });
                                }
                            });
                        }
                        else if (isObject(option)) {
                            nextParent = {};
                            if (isArray(parent)) {
                                parent.push(nextParent);
                                nextParent[key] = {};
                                nextParent = nextParent[key];
                            }
                            else {
                                parent[key] = nextParent;
                            }
                            objectEach(option, function (nestedOption, nestedKey) {
                                traverse(nestedOption, nestedKey, key === 0 ? parentEditables : nestedEditables[key], nextParent);
                            });
                        }
                        else {
                            // Leaf:
                            if (key === 'format') {
                                parent[key] = [
                                    format(option, annotation.labels[0].points[0]).toString(),
                                    'text'
                                ];
                            }
                            else if (isArray(parent)) {
                                parent.push([option, getFieldType(option)]);
                            }
                            else {
                                parent[key] = [option, getFieldType(option)];
                            }
                        }
                    }
                }
                objectEach(options, function (option, key) {
                    if (key === 'typeOptions') {
                        visualOptions[key] = {};
                        objectEach(options[key], function (typeOption, typeKey) {
                            traverse(typeOption, typeKey, nestedEditables, visualOptions[key], true);
                        });
                    }
                    else {
                        traverse(option, key, editables[type], visualOptions);
                    }
                });
                return visualOptions;
            };
            /**
             * Get all class names for all parents in the element. Iterates until finds
             * main container.
             *
             * @function Highcharts.NavigationBindings#getClickedClassNames
             *
             * @param {Highcharts.HTMLDOMElement}
             *        Container that event is bound to.
             *
             * @param {global.Event} event
             *        Browser's event.
             *
             * @return {Array<Array<string, Highcharts.HTMLDOMElement>>}
             *         Array of class names with corresponding elements
             */
            NavigationBindings.prototype.getClickedClassNames = function (container, event) {
                var element = event.target,
                    classNames = [],
                    elemClassName;
                while (element) {
                    elemClassName = attr(element, 'class');
                    if (elemClassName) {
                        classNames = classNames.concat(elemClassName
                            .split(' ')
                            .map(function (name) {
                            return [
                                name,
                                element
                            ];
                        }));
                    }
                    element = element.parentNode;
                    if (element === container) {
                        return classNames;
                    }
                }
                return classNames;
            };
            /**
             * Get events bound to a button. It's a custom event delegation to find all
             * events connected to the element.
             *
             * @private
             * @function Highcharts.NavigationBindings#getButtonEvents
             *
             * @param {Highcharts.HTMLDOMElement} container
             *        Container that event is bound to.
             *
             * @param {global.Event} event
             *        Browser's event.
             *
             * @return {object}
             *         Object with events (init, start, steps, and end)
             */
            NavigationBindings.prototype.getButtonEvents = function (container, event) {
                var navigation = this,
                    classNames = this.getClickedClassNames(container,
                    event),
                    bindings;
                classNames.forEach(function (className) {
                    if (navigation.boundClassNames[className[0]] && !bindings) {
                        bindings = {
                            events: navigation.boundClassNames[className[0]],
                            button: className[1]
                        };
                    }
                });
                return bindings;
            };
            /**
             * Bindings are just events, so the whole update process is simply
             * removing old events and adding new ones.
             *
             * @private
             * @function Highcharts.NavigationBindings#update
             */
            NavigationBindings.prototype.update = function (options) {
                this.options = merge(true, this.options, options);
                this.removeEvents();
                this.initEvents();
            };
            /**
             * Remove all events created in the navigation.
             *
             * @private
             * @function Highcharts.NavigationBindings#removeEvents
             */
            NavigationBindings.prototype.removeEvents = function () {
                this.eventsToUnbind.forEach(function (unbinder) {
                    unbinder();
                });
            };
            NavigationBindings.prototype.destroy = function () {
                this.removeEvents();
            };
            /* *
             *
             *  Static Properties
             *
             * */
            // Define which options from annotations should show up in edit box:
            NavigationBindings.annotationsEditable = {
                // `typeOptions` are always available
                // Nested and shared options:
                nestedOptions: {
                    labelOptions: ['style', 'format', 'backgroundColor'],
                    labels: ['style'],
                    label: ['style'],
                    style: ['fontSize', 'color'],
                    background: ['fill', 'strokeWidth', 'stroke'],
                    innerBackground: ['fill', 'strokeWidth', 'stroke'],
                    outerBackground: ['fill', 'strokeWidth', 'stroke'],
                    shapeOptions: ['fill', 'strokeWidth', 'stroke'],
                    shapes: ['fill', 'strokeWidth', 'stroke'],
                    line: ['strokeWidth', 'stroke'],
                    backgroundColors: [true],
                    connector: ['fill', 'strokeWidth', 'stroke'],
                    crosshairX: ['strokeWidth', 'stroke'],
                    crosshairY: ['strokeWidth', 'stroke']
                },
                // Simple shapes:
                circle: ['shapes'],
                verticalLine: [],
                label: ['labelOptions'],
                // Measure
                measure: ['background', 'crosshairY', 'crosshairX'],
                // Others:
                fibonacci: [],
                tunnel: ['background', 'line', 'height'],
                pitchfork: ['innerBackground', 'outerBackground'],
                rect: ['shapes'],
                // Crooked lines, elliots, arrows etc:
                crookedLine: [],
                basicAnnotation: ['shapes', 'labelOptions']
            };
            // Define non editable fields per annotation, for example Rectangle inherits
            // options from Measure, but crosshairs are not available
            NavigationBindings.annotationsNonEditable = {
                rectangle: ['crosshairX', 'crosshairY', 'label']
            };
            return NavigationBindings;
        }());
        /**
         * General utils for bindings
         *
         * @private
         * @name Highcharts.NavigationBindings.utils
         * @type {bindingsUtils}
         */
        NavigationBindings.prototype.utils = bindingsUtils;
        Chart.prototype.initNavigationBindings = function () {
            var chart = this,
                options = chart.options;
            if (options && options.navigation && options.navigation.bindings) {
                chart.navigationBindings = new NavigationBindings(chart, options.navigation);
                chart.navigationBindings.initEvents();
                chart.navigationBindings.initUpdate();
            }
        };
        addEvent(Chart, 'load', function () {
            this.initNavigationBindings();
        });
        addEvent(Chart, 'destroy', function () {
            if (this.navigationBindings) {
                this.navigationBindings.destroy();
            }
        });
        addEvent(NavigationBindings, 'deselectButton', function () {
            this.selectedButtonElement = null;
        });
        addEvent(Annotation, 'remove', function () {
            if (this.chart.navigationBindings) {
                this.chart.navigationBindings.deselectAnnotation();
            }
        });
        /**
         * Show edit-annotation form:
         * @private
         */
        function selectableAnnotation(annotationType) {
            var originalClick = annotationType.prototype.defaultOptions.events &&
                    annotationType.prototype.defaultOptions.events.click;
            /**
             * @private
             */
            function selectAndShowPopup(eventArguments) {
                var annotation = this,
                    navigation = annotation.chart.navigationBindings,
                    prevAnnotation = navigation.activeAnnotation;
                if (originalClick) {
                    originalClick.call(annotation, eventArguments);
                }
                if (prevAnnotation !== annotation) {
                    // Select current:
                    navigation.deselectAnnotation();
                    navigation.activeAnnotation = annotation;
                    annotation.setControlPointsVisibility(true);
                    fireEvent(navigation, 'showPopup', {
                        annotation: annotation,
                        formType: 'annotation-toolbar',
                        options: navigation.annotationToFields(annotation),
                        onSubmit: function (data) {
                            var config = {},
                                typeOptions;
                            if (data.actionType === 'remove') {
                                navigation.activeAnnotation = false;
                                navigation.chart.removeAnnotation(annotation);
                            }
                            else {
                                navigation.fieldsToOptions(data.fields, config);
                                navigation.deselectAnnotation();
                                typeOptions = config.typeOptions;
                                if (annotation.options.type === 'measure') {
                                    // Manually disable crooshars according to
                                    // stroke width of the shape:
                                    typeOptions.crosshairY.enabled =
                                        typeOptions.crosshairY.strokeWidth !== 0;
                                    typeOptions.crosshairX.enabled =
                                        typeOptions.crosshairX.strokeWidth !== 0;
                                }
                                annotation.update(config);
                            }
                        }
                    });
                }
                else {
                    // Deselect current:
                    fireEvent(navigation, 'closePopup');
                }
                // Let bubble event to chart.click:
                eventArguments.activeAnnotation = true;
            }
            merge(true, annotationType.prototype.defaultOptions.events, {
                click: selectAndShowPopup
            });
        }
        if (H.Annotation) {
            // Basic shapes:
            selectableAnnotation(Annotation);
            // Advanced annotations:
            objectEach(Annotation.types, function (annotationType) {
                selectableAnnotation(annotationType);
            });
        }
        setOptions({
            /**
             * @optionparent lang
             *
             * @private
             */
            lang: {
                /**
                 * Configure the Popup strings in the chart. Requires the
                 * `annotations.js` or `annotations-advanced.src.js` module to be
                 * loaded.
                 *
                 * @since   7.0.0
                 * @product highcharts highstock
                 */
                navigation: {
                    /**
                     * Translations for all field names used in popup.
                     *
                     * @product highcharts highstock
                     */
                    popup: {
                        simpleShapes: 'Simple shapes',
                        lines: 'Lines',
                        circle: 'Circle',
                        rectangle: 'Rectangle',
                        label: 'Label',
                        shapeOptions: 'Shape options',
                        typeOptions: 'Details',
                        fill: 'Fill',
                        format: 'Text',
                        strokeWidth: 'Line width',
                        stroke: 'Line color',
                        title: 'Title',
                        name: 'Name',
                        labelOptions: 'Label options',
                        labels: 'Labels',
                        backgroundColor: 'Background color',
                        backgroundColors: 'Background colors',
                        borderColor: 'Border color',
                        borderRadius: 'Border radius',
                        borderWidth: 'Border width',
                        style: 'Style',
                        padding: 'Padding',
                        fontSize: 'Font size',
                        color: 'Color',
                        height: 'Height',
                        shapes: 'Shape options'
                    }
                }
            },
            /**
             * @optionparent navigation
             * @product      highcharts highstock
             *
             * @private
             */
            navigation: {
                /**
                 * A CSS class name where all bindings will be attached to. Multiple
                 * charts on the same page should have separate class names to prevent
                 * duplicating events.
                 *
                 * Default value of versions < 7.0.4 `highcharts-bindings-wrapper`
                 *
                 * @since     7.0.0
                 * @type      {string}
                 */
                bindingsClassName: 'highcharts-bindings-container',
                /**
                 * Bindings definitions for custom HTML buttons. Each binding implements
                 * simple event-driven interface:
                 *
                 * - `className`: classname used to bind event to
                 *
                 * - `init`: initial event, fired on button click
                 *
                 * - `start`: fired on first click on a chart
                 *
                 * - `steps`: array of sequential events fired one after another on each
                 *   of users clicks
                 *
                 * - `end`: last event to be called after last step event
                 *
                 * @type         {Highcharts.Dictionary<Highcharts.NavigationBindingsOptionsObject>|*}
                 * @sample       stock/stocktools/stocktools-thresholds
                 *               Custom bindings in Highcharts Stock
                 * @since        7.0.0
                 * @product      highcharts highstock
                 */
                bindings: {
                    /**
                     * A circle annotation bindings. Includes `start` and one event in
                     * `steps` array.
                     *
                     * @type    {Highcharts.NavigationBindingsOptionsObject}
                     * @default {"className": "highcharts-circle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                     */
                    circleAnnotation: {
                        /** @ignore-option */
                        className: 'highcharts-circle-annotation',
                        /** @ignore-option */
                        start: function (e) {
                            var coords = this.chart.pointer.getCoordinates(e),
                                coordsX = this.utils.getAssignedAxis(coords.xAxis),
                                coordsY = this.utils.getAssignedAxis(coords.yAxis),
                                navigation = this.chart.options.navigation;
                            // Exit if clicked out of axes area
                            if (!coordsX || !coordsY) {
                                return;
                            }
                            return this.chart.addAnnotation(merge({
                                langKey: 'circle',
                                type: 'basicAnnotation',
                                shapes: [{
                                        type: 'circle',
                                        point: {
                                            x: coordsX.value,
                                            y: coordsY.value,
                                            xAxis: coordsX.axis.options.index,
                                            yAxis: coordsY.axis.options.index
                                        },
                                        r: 5
                                    }]
                            }, navigation
                                .annotationsOptions, navigation
                                .bindings
                                .circleAnnotation
                                .annotationsOptions));
                        },
                        /** @ignore-option */
                        steps: [
                            function (e, annotation) {
                                var mockPointOpts = annotation.options.shapes[0]
                                        .point,
                                    inverted = this.chart.inverted,
                                    x,
                                    y,
                                    distance;
                                if (isNumber(mockPointOpts.xAxis) &&
                                    isNumber(mockPointOpts.yAxis)) {
                                    x = this.chart.xAxis[mockPointOpts.xAxis]
                                        .toPixels(mockPointOpts.x);
                                    y = this.chart.yAxis[mockPointOpts.yAxis]
                                        .toPixels(mockPointOpts.y);
                                    distance = Math.max(Math.sqrt(Math.pow(inverted ? y - e.chartX : x - e.chartX, 2) +
                                        Math.pow(inverted ? x - e.chartY : y - e.chartY, 2)), 5);
                                }
                                annotation.update({
                                    shapes: [{
                                            r: distance
                                        }]
                                });
                            }
                        ]
                    },
                    /**
                     * A rectangle annotation bindings. Includes `start` and one event
                     * in `steps` array.
                     *
                     * @type    {Highcharts.NavigationBindingsOptionsObject}
                     * @default {"className": "highcharts-rectangle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                     */
                    rectangleAnnotation: {
                        /** @ignore-option */
                        className: 'highcharts-rectangle-annotation',
                        /** @ignore-option */
                        start: function (e) {
                            var coords = this.chart.pointer.getCoordinates(e),
                                coordsX = this.utils.getAssignedAxis(coords.xAxis),
                                coordsY = this.utils.getAssignedAxis(coords.yAxis);
                            // Exit if clicked out of axes area
                            if (!coordsX || !coordsY) {
                                return;
                            }
                            var x = coordsX.value,
                                y = coordsY.value,
                                xAxis = coordsX.axis.options.index,
                                yAxis = coordsY.axis.options.index,
                                navigation = this.chart.options.navigation;
                            return this.chart.addAnnotation(merge({
                                langKey: 'rectangle',
                                type: 'basicAnnotation',
                                shapes: [{
                                        type: 'path',
                                        points: [
                                            { xAxis: xAxis, yAxis: yAxis, x: x, y: y },
                                            { xAxis: xAxis, yAxis: yAxis, x: x, y: y },
                                            { xAxis: xAxis, yAxis: yAxis, x: x, y: y },
                                            { xAxis: xAxis, yAxis: yAxis, x: x, y: y }
                                        ]
                                    }]
                            }, navigation
                                .annotationsOptions, navigation
                                .bindings
                                .rectangleAnnotation
                                .annotationsOptions));
                        },
                        /** @ignore-option */
                        steps: [
                            function (e, annotation) {
                                var points = annotation.options.shapes[0].points,
                                    coords = this.chart.pointer.getCoordinates(e),
                                    coordsX = this.utils.getAssignedAxis(coords.xAxis),
                                    coordsY = this.utils.getAssignedAxis(coords.yAxis),
                                    x,
                                    y;
                                if (coordsX && coordsY) {
                                    x = coordsX.value;
                                    y = coordsY.value;
                                    // Top right point
                                    points[1].x = x;
                                    // Bottom right point (cursor position)
                                    points[2].x = x;
                                    points[2].y = y;
                                    // Bottom left
                                    points[3].y = y;
                                    annotation.update({
                                        shapes: [{
                                                points: points
                                            }]
                                    });
                                }
                            }
                        ]
                    },
                    /**
                     * A label annotation bindings. Includes `start` event only.
                     *
                     * @type    {Highcharts.NavigationBindingsOptionsObject}
                     * @default {"className": "highcharts-label-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                     */
                    labelAnnotation: {
                        /** @ignore-option */
                        className: 'highcharts-label-annotation',
                        /** @ignore-option */
                        start: function (e) {
                            var coords = this.chart.pointer.getCoordinates(e),
                                coordsX = this.utils.getAssignedAxis(coords.xAxis),
                                coordsY = this.utils.getAssignedAxis(coords.yAxis),
                                navigation = this.chart.options.navigation;
                            // Exit if clicked out of axes area
                            if (!coordsX || !coordsY) {
                                return;
                            }
                            return this.chart.addAnnotation(merge({
                                langKey: 'label',
                                type: 'basicAnnotation',
                                labelOptions: {
                                    format: '{y:.2f}'
                                },
                                labels: [{
                                        point: {
                                            xAxis: coordsX.axis.options.index,
                                            yAxis: coordsY.axis.options.index,
                                            x: coordsX.value,
                                            y: coordsY.value
                                        },
                                        overflow: 'none',
                                        crop: true
                                    }]
                            }, navigation
                                .annotationsOptions, navigation
                                .bindings
                                .labelAnnotation
                                .annotationsOptions));
                        }
                    }
                },
                /**
                 * Path where Highcharts will look for icons. Change this to use icons
                 * from a different server.
                 *
                 * @type      {string}
                 * @default   https://code.highcharts.com/9.1.2/gfx/stock-icons/
                 * @since     7.1.3
                 * @apioption navigation.iconsURL
                 */
                /**
                 * A `showPopup` event. Fired when selecting for example an annotation.
                 *
                 * @type      {Function}
                 * @apioption navigation.events.showPopup
                 */
                /**
                 * A `closePopup` event. Fired when Popup should be hidden, for example
                 * when clicking on an annotation again.
                 *
                 * @type      {Function}
                 * @apioption navigation.events.closePopup
                 */
                /**
                 * Event fired on a button click.
                 *
                 * @type      {Function}
                 * @sample    highcharts/annotations/gui/
                 *            Change icon in a dropddown on event
                 * @sample    highcharts/annotations/gui-buttons/
                 *            Change button class on event
                 * @apioption navigation.events.selectButton
                 */
                /**
                 * Event fired when button state should change, for example after
                 * adding an annotation.
                 *
                 * @type      {Function}
                 * @sample    highcharts/annotations/gui/
                 *            Change icon in a dropddown on event
                 * @sample    highcharts/annotations/gui-buttons/
                 *            Change button class on event
                 * @apioption navigation.events.deselectButton
                 */
                /**
                 * Events to communicate between Stock Tools and custom GUI.
                 *
                 * @since        7.0.0
                 * @product      highcharts highstock
                 * @optionparent navigation.events
                 */
                events: {},
                /**
                 * Additional options to be merged into all annotations.
                 *
                 * @sample stock/stocktools/navigation-annotation-options
                 *         Set red color of all line annotations
                 *
                 * @type      {Highcharts.AnnotationsOptions}
                 * @extends   annotations
                 * @exclude   crookedLine, elliottWave, fibonacci, infinityLine,
                 *            measure, pitchfork, tunnel, verticalLine, basicAnnotation
                 * @apioption navigation.annotationsOptions
                 */
                annotationsOptions: {
                    animation: {
                        defer: 0
                    }
                }
            }
        });
        addEvent(Chart, 'render', function () {
            var chart = this,
                navigationBindings = chart.navigationBindings,
                disabledClassName = 'highcharts-disabled-btn';
            if (chart && navigationBindings) {
                // Check if the buttons should be enabled/disabled based on
                // visible series.
                var buttonsEnabled_1 = false;
                chart.series.forEach(function (series) {
                    if (!series.options.isInternal && series.visible) {
                        buttonsEnabled_1 = true;
                    }
                });
                objectEach(navigationBindings.boundClassNames, function (value, key) {
                    if (chart.navigationBindings &&
                        chart.navigationBindings.container &&
                        chart.navigationBindings.container[0]) {
                        // Get the HTML element coresponding to the
                        // className taken from StockToolsBindings.
                        var buttonNode = chart.navigationBindings.container[0].querySelectorAll('.' + key);
                        if (buttonNode) {
                            if (value.noDataState === 'normal') {
                                buttonNode.forEach(function (button) {
                                    // If button has noDataState: 'normal',
                                    // and has disabledClassName,
                                    // remove this className.
                                    if (button.className.indexOf(disabledClassName) !== -1) {
                                        button.classList.remove(disabledClassName);
                                    }
                                });
                            }
                            else if (!buttonsEnabled_1) {
                                buttonNode.forEach(function (button) {
                                    if (button.className.indexOf(disabledClassName) === -1) {
                                        button.className += ' ' + disabledClassName;
                                    }
                                });
                            }
                            else {
                                buttonNode.forEach(function (button) {
                                    // Enable all buttons by deleting the className.
                                    if (button.className.indexOf(disabledClassName) !== -1) {
                                        button.classList.remove(disabledClassName);
                                    }
                                });
                            }
                        }
                    }
                });
            }
        });
        addEvent(NavigationBindings, 'closePopup', function () {
            this.deselectAnnotation();
        });

        return NavigationBindings;
    });
    _registerModule(_modules, 'Stock/StockToolsBindings.js', [_modules['Core/Globals.js'], _modules['Extensions/Annotations/NavigationBindings.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Series/Series.js'], _modules['Core/Utilities.js'], _modules['Core/Color/Palette.js']], function (H, NavigationBindings, D, Series, U, palette) {
        /**
         *
         *  Events generator for Stock tools
         *
         *  (c) 2009-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var getOptions = D.getOptions,
            setOptions = D.setOptions;
        var correctFloat = U.correctFloat,
            defined = U.defined,
            extend = U.extend,
            fireEvent = U.fireEvent,
            isNumber = U.isNumber,
            merge = U.merge,
            pick = U.pick,
            uniqueKey = U.uniqueKey;
        var bindingsUtils = NavigationBindings.prototype.utils,
            PREFIX = 'highcharts-';
        /* eslint-disable no-invalid-this, valid-jsdoc */
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
         * @param {Highcharts.FlagsShapeValue} type
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
                    point = bindingsUtils.attractToPoint(e,
                    chart),
                    pointConfig,
                    seriesOptions;
                if (!point) {
                    return;
                }
                pointConfig = {
                    x: point.x,
                    y: point.y
                };
                seriesOptions = {
                    type: 'flags',
                    onSeries: point.series.id,
                    shape: type,
                    data: [pointConfig],
                    xAxis: point.xAxis,
                    yAxis: point.yAxis,
                    point: {
                        events: {
                            click: function () {
                                var point = this,
                                    options = point.options;
                                fireEvent(navigation, 'showPopup', {
                                    point: point,
                                    formType: 'annotation-toolbar',
                                    options: {
                                        langKey: 'flags',
                                        type: 'flags',
                                        title: [
                                            options.title,
                                            getFieldType(options.title)
                                        ],
                                        name: [
                                            options.name,
                                            getFieldType(options.name)
                                        ]
                                    },
                                    onSubmit: function (updated) {
                                        if (updated.actionType === 'remove') {
                                            point.remove();
                                        }
                                        else {
                                            point.update(navigation.fieldsToOptions(updated.fields, {}));
                                        }
                                    }
                                });
                            }
                        }
                    }
                };
                if (!toolbar || !toolbar.guiEnabled) {
                    chart.addSeries(seriesOptions);
                }
                fireEvent(navigation, 'showPopup', {
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
                        navigation.fieldsToOptions(data.fields, seriesOptions.data[0]);
                        chart.addSeries(seriesOptions);
                    }
                });
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
                    'klinger',
                    'mfi',
                    'obv',
                    'vbp',
                    'vwap'
                ],
                indicatorsWithAxes = [
                    'ad',
                    'atr',
                    'cci',
                    'cmf',
                    'disparityindex',
                    'cmo',
                    'dmi',
                    'macd',
                    'mfi',
                    'roc',
                    'rsi',
                    'ao',
                    'aroon',
                    'aroonoscillator',
                    'trix',
                    'apo',
                    'dpo',
                    'ppo',
                    'natr',
                    'obv',
                    'williamsr',
                    'stochastic',
                    'slowstochastic',
                    'linearRegression',
                    'linearRegressionSlope',
                    'linearRegressionIntercept',
                    'linearRegressionAngle',
                    'klinger'
                ],
                yAxis,
                parentSeries,
                defaultOptions,
                series;
            if (data.actionType === 'edit') {
                navigation.fieldsToOptions(data.fields, seriesConfig);
                series = chart.get(data.seriesId);
                if (series) {
                    series.update(seriesConfig, false);
                }
            }
            else if (data.actionType === 'remove') {
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
                        var removedYAxisHeight = yAxis.options.height;
                        yAxis.remove(false);
                        navigation.resizeYAxes(removedYAxisHeight);
                    }
                }
            }
            else {
                seriesConfig.id = uniqueKey();
                navigation.fieldsToOptions(data.fields, seriesConfig);
                parentSeries = chart.get(seriesConfig.linkedTo);
                defaultOptions = getOptions().plotOptions;
                // Make sure that indicator uses the SUM approx if SUM approx is used
                // by parent series (#13950).
                if (typeof parentSeries !== 'undefined' &&
                    parentSeries instanceof Series &&
                    parentSeries.getDGApproximation() === 'sum' &&
                    // If indicator has defined approx type, use it (e.g. "ranges")
                    !defined(defaultOptions && defaultOptions[seriesConfig.type] &&
                        defaultOptions.dataGrouping &&
                        defaultOptions.dataGrouping.approximation)) {
                    seriesConfig.dataGrouping = {
                        approximation: 'sum'
                    };
                }
                if (indicatorsWithAxes.indexOf(data.type) >= 0) {
                    yAxis = chart.addAxis({
                        id: uniqueKey(),
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
                }
                else {
                    seriesConfig.yAxis = chart.get(data.linkedTo).options.yAxis;
                }
                if (indicatorsWithVolume.indexOf(data.type) >= 0) {
                    seriesConfig.params.volumeSeriesID = chart.series.filter(function (series) {
                        return series.options.type === 'column';
                    })[0].options.id;
                }
                chart.addSeries(seriesConfig, false);
            }
            fireEvent(navigation, 'deselectButton', {
                button: navigation.selectedButtonElement
            });
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
         * @param {Highcharts.PointerEventObject} e
         *        normalized browser event
         *
         * @param {Highcharts.Annotation} annotation
         *        Annotation to be updated
         *
         * @return {void}
         */
        bindingsUtils.updateHeight = function (e, annotation) {
            var coordsY = this.utils.getAssignedAxis(this.chart.pointer.getCoordinates(e).yAxis);
            if (coordsY) {
                annotation.update({
                    typeOptions: {
                        height: coordsY.value -
                            annotation.options.typeOptions.points[1].y
                    }
                });
            }
        };
        // @todo
        // Consider using getHoverData(), but always kdTree (columns?)
        bindingsUtils.attractToPoint = function (e, chart) {
            var coords = chart.pointer.getCoordinates(e),
                coordsX,
                coordsY,
                distX = Number.MAX_VALUE,
                closestPoint,
                x,
                y;
            if (chart.navigationBindings) {
                coordsX = chart.navigationBindings.utils.getAssignedAxis(coords.xAxis);
                coordsY = chart.navigationBindings.utils.getAssignedAxis(coords.yAxis);
            }
            // Exit if clicked out of axes area.
            if (!coordsX || !coordsY) {
                return;
            }
            x = coordsX.value;
            y = coordsY.value;
            // Search by 'x' but only in yAxis' series.
            coordsY.axis.series.forEach(function (series) {
                if (series.points) {
                    series.points.forEach(function (point) {
                        if (point && distX > Math.abs(point.x - x)) {
                            distX = Math.abs(point.x - x);
                            closestPoint = point;
                        }
                    });
                }
            });
            if (closestPoint && closestPoint.x && closestPoint.y) {
                return {
                    x: closestPoint.x,
                    y: closestPoint.y,
                    below: y < closestPoint.y,
                    series: closestPoint.series,
                    xAxis: closestPoint.series.xAxis.options.index || 0,
                    yAxis: closestPoint.series.yAxis.options.index || 0
                };
            }
        };
        /**
         * Shorthand to check if given yAxis comes from navigator.
         *
         * @private
         * @function bindingsUtils.isNotNavigatorYAxis
         *
         * @param {Highcharts.Axis} axis
         * Axis to check.
         *
         * @return {boolean}
         * True, if axis comes from navigator.
         */
        bindingsUtils.isNotNavigatorYAxis = function (axis) {
            return axis.userOptions.className !== PREFIX + 'navigator-yaxis';
        };
        /**
         * Check if any of the price indicators are enabled.
         * @private
         * @function bindingsUtils.isLastPriceEnabled
         *
         * @param {array} series
         *        Array of series.
         *
         * @return {boolean}
         *         Tells which indicator is enabled.
         */
        bindingsUtils.isPriceIndicatorEnabled = function (series) {
            return series.some(function (s) { return s.lastVisiblePrice || s.lastPrice; });
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
                    coords = this.chart.pointer.getCoordinates(e),
                    coordsX = this.utils.getAssignedAxis(coords.xAxis),
                    coordsY = this.utils.getAssignedAxis(coords.yAxis);
                if (coordsX && coordsY) {
                    options.points.forEach(function (point, index) {
                        if (index >= startIndex) {
                            point.x = coordsX.value;
                            point.y = coordsY.value;
                        }
                    });
                    annotation.update({
                        typeOptions: {
                            points: options.points
                        }
                    });
                }
            };
        };
        // Extends NavigationBindigs to support indicators and resizers:
        extend(NavigationBindings.prototype, {
            /* eslint-disable valid-jsdoc */
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
             * @param {string} removedYAxisHeight
             *        Height of the removed yAxis in percents.
             *
             * @return {Highcharts.YAxisPositions}
             *         An object containing an array of calculated positions
             *         in percentages. Format: `{top: Number, height: Number}`
             *         and maximum value of top + height of axes.
             */
            getYAxisPositions: function (yAxes, plotHeight, defaultHeight, removedYAxisHeight) {
                var positions,
                    allAxesHeight = 0,
                    previousAxisHeight,
                    removedHeight;
                /** @private */
                function isPercentage(prop) {
                    return defined(prop) && !isNumber(prop) && prop.match('%');
                }
                if (removedYAxisHeight) {
                    removedHeight = correctFloat((parseFloat(removedYAxisHeight) / 100));
                }
                positions = yAxes.map(function (yAxis, index) {
                    var height = correctFloat(isPercentage(yAxis.options.height) ?
                            parseFloat(yAxis.options.height) / 100 :
                            yAxis.height / plotHeight),
                        top = correctFloat(isPercentage(yAxis.options.top) ?
                            parseFloat(yAxis.options.top) / 100 :
                            (yAxis.top - yAxis.chart.plotTop) / plotHeight);
                    // New axis' height is NaN so we can check if
                    // the axis is newly created this way
                    if (!removedHeight) {
                        if (!isNumber(height)) {
                            // Check if the previous axis is the
                            // indicator axis (every indicator inherits from sma)
                            height = yAxes[index - 1].series.every(function (s) { return s.is('sma'); }) ?
                                previousAxisHeight : defaultHeight / 100;
                        }
                        if (!isNumber(top)) {
                            top = allAxesHeight;
                        }
                        previousAxisHeight = height;
                        allAxesHeight = correctFloat(Math.max(allAxesHeight, (top || 0) + (height || 0)));
                    }
                    else {
                        if (top <= allAxesHeight) {
                            allAxesHeight = correctFloat(Math.max(allAxesHeight, (top || 0) + (height || 0)));
                        }
                        else {
                            top = correctFloat(top - removedHeight);
                            allAxesHeight = correctFloat(allAxesHeight + height);
                        }
                    }
                    return {
                        height: height * 100,
                        top: top * 100
                    };
                });
                return { positions: positions, allAxesHeight: allAxesHeight };
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
                yAxes.forEach(function (_yAxis, index) {
                    var nextYAxis = yAxes[index + 1];
                    // We have next axis, bind them:
                    if (nextYAxis) {
                        resizers[index] = {
                            enabled: true,
                            controlledAxis: {
                                next: [
                                    pick(nextYAxis.options.id, nextYAxis.options.index)
                                ]
                            }
                        };
                    }
                    else {
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
             * checks if new axis is added, if the new axis will fit under previous
             * axes it is placed there. If not, current plot area is scaled
             * to make room for new axis.
             *
             * If axis is removed, the current plot area streaches to fit into 100%
             * of the plot area.
             *
             * @private
             * @function Highcharts.NavigationBindings#resizeYAxes
             * @param {string} [removedYAxisHeight]
             *
             *
             */
            resizeYAxes: function (removedYAxisHeight) {
                // The height of the new axis before rescalling. In %, but as a number.
                var defaultHeight = 20;
                var chart = this.chart, 
                    // Only non-navigator axes
                    yAxes = chart.yAxis.filter(bindingsUtils.isNotNavigatorYAxis),
                    plotHeight = chart.plotHeight, 
                    // Gather current heights (in %)
                    _a = this.getYAxisPositions(yAxes,
                    plotHeight,
                    defaultHeight,
                    removedYAxisHeight),
                    positions = _a.positions,
                    allAxesHeight = _a.allAxesHeight,
                    resizers = this.getYAxisResizers(yAxes);
                // check if the axis is being either added or removed and
                // if the new indicator axis will fit under existing axes.
                // if so, there is no need to scale them.
                if (!removedYAxisHeight &&
                    allAxesHeight <= correctFloat(0.8 + defaultHeight / 100)) {
                    positions[positions.length - 1] = {
                        height: defaultHeight,
                        top: correctFloat(allAxesHeight * 100 - defaultHeight)
                    };
                }
                else {
                    positions.forEach(function (position) {
                        position.height = (position.height / (allAxesHeight * 100)) * 100;
                        position.top = (position.top / (allAxesHeight * 100)) * 100;
                    });
                }
                positions.forEach(function (position, index) {
                    yAxes[index].update({
                        height: position.height + '%',
                        top: position.top + '%',
                        resize: resizers[index],
                        offset: 0
                    }, false);
                });
            },
            /**
             * Utility to modify calculated positions according to the remaining/needed
             * space. Later, these positions are used in `yAxis.update({ top, height })`
             *
             * @private
             * @function Highcharts.NavigationBindings#recalculateYAxisPositions
             * @param {Array<Highcharts.Dictionary<number>>} positions
             * Default positions of all yAxes.
             * @param {number} changedSpace
             * How much space should be added or removed.
             * @param {boolean} modifyHeight
             * Update only `top` or both `top` and `height`.
             * @param {number} adder
             * `-1` or `1`, to determine whether we should add or remove space.
             *
             * @return {Array<object>}
             *         Modified positions,
             */
            recalculateYAxisPositions: function (positions, changedSpace, modifyHeight, adder) {
                positions.forEach(function (position, index) {
                    var prevPosition = positions[index - 1];
                    position.top = !prevPosition ? 0 :
                        correctFloat(prevPosition.height + prevPosition.top);
                    if (modifyHeight) {
                        position.height = correctFloat(position.height + adder * changedSpace);
                    }
                });
                return positions;
            }
            /* eslint-enable valid-jsdoc */
        });
        /**
         * @type         {Highcharts.Dictionary<Highcharts.NavigationBindingsOptionsObject>}
         * @since        7.0.0
         * @optionparent navigation.bindings
         */
        var stockToolsBindings = {
                // Line type annotations:
                /**
                 * A segment annotation bindings. Includes `start` and one event in `steps`
                 * array.
                 *
                 * @type    {Highcharts.NavigationBindingsOptionsObject}
                 * @product highstock
                 * @default {"className": "highcharts-segment", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                 */
                segment: {
                    /** @ignore-option */
                    className: 'highcharts-segment',
                    // eslint-disable-next-line valid-jsdoc
                    /** @ignore-option */
                    start: function (e) {
                        var coords = this.chart.pointer.getCoordinates(e), coordsX = this.utils.getAssignedAxis(coords.xAxis), coordsY = this.utils.getAssignedAxis(coords.yAxis), navigation = this.chart.options.navigation, options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'segment',
                        type: 'crookedLine',
                        typeOptions: {
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.segment.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A segment with an arrow annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-segment", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            arrowSegment: {
                /** @ignore-option */
                className: 'highcharts-arrow-segment',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis),
                        navigation = this.chart.options.navigation,
                        options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'arrowSegment',
                        type: 'crookedLine',
                        typeOptions: {
                            line: {
                                markerEnd: 'arrow'
                            },
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.arrowSegment.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A ray annotation bindings. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-ray", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            ray: {
                /** @ignore-option */
                className: 'highcharts-ray',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis),
                        navigation = this.chart.options.navigation,
                        options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'ray',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'ray',
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.ray.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A ray with an arrow annotation bindings. Includes `start` and one event
             * in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-ray", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            arrowRay: {
                /** @ignore-option */
                className: 'highcharts-arrow-ray',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis),
                        navigation = this.chart.options.navigation,
                        options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'arrowRay',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'ray',
                            line: {
                                markerEnd: 'arrow'
                            },
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.arrowRay.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A line annotation. Includes `start` and one event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-infinity-line", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            infinityLine: {
                /** @ignore-option */
                className: 'highcharts-infinity-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis),
                        navigation = this.chart.options.navigation,
                        options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'infinityLine',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'line',
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.infinityLine.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A line with arrow annotation. Includes `start` and one event in `steps`
             * array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-arrow-infinity-line", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            arrowInfinityLine: {
                /** @ignore-option */
                className: 'highcharts-arrow-infinity-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis),
                        navigation = this.chart.options.navigation,
                        options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'arrowInfinityLine',
                        type: 'infinityLine',
                        typeOptions: {
                            type: 'line',
                            line: {
                                markerEnd: 'arrow'
                            },
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }, {
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.arrowInfinityLine.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1)
                ]
            },
            /**
             * A horizontal line annotation. Includes `start` event.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-horizontal-line", "start": function() {}, "annotationsOptions": {}}
             */
            horizontalLine: {
                /** @ignore-option */
                className: 'highcharts-horizontal-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis),
                        navigation = this.chart.options.navigation,
                        options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'horizontalLine',
                        type: 'infinityLine',
                        draggable: 'y',
                        typeOptions: {
                            type: 'horizontalLine',
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.horizontalLine.annotationsOptions);
                    this.chart.addAnnotation(options);
                }
            },
            /**
             * A vertical line annotation. Includes `start` event.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-line", "start": function() {}, "annotationsOptions": {}}
             */
            verticalLine: {
                /** @ignore-option */
                className: 'highcharts-vertical-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis),
                        navigation = this.chart.options.navigation,
                        options;
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    options = merge({
                        langKey: 'verticalLine',
                        type: 'infinityLine',
                        draggable: 'x',
                        typeOptions: {
                            type: 'verticalLine',
                            xAxis: coordsX.axis.options.index,
                            yAxis: coordsY.axis.options.index,
                            points: [{
                                    x: coordsX.value,
                                    y: coordsY.value
                                }]
                        }
                    }, navigation.annotationsOptions, navigation.bindings.verticalLine.annotationsOptions);
                    this.chart.addAnnotation(options);
                }
            },
            /**
             * Crooked line (three points) annotation bindings. Includes `start` and two
             * events in `steps` (for second and third points in crooked line) array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-crooked3", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            // Crooked Line type annotations:
            crooked3: {
                /** @ignore-option */
                className: 'highcharts-crooked3',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'crooked3',
                            type: 'crookedLine',
                            typeOptions: {
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                points: [
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y }
                                ]
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.crooked3.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateNthPoint(2)
                ]
            },
            /**
             * Crooked line (five points) annotation bindings. Includes `start` and four
             * events in `steps` (for all consequent points in crooked line) array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-crooked3", "start": function() {}, "steps": [function() {}, function() {}, function() {}, function() {}], "annotationsOptions": {}}
             */
            crooked5: {
                /** @ignore-option */
                className: 'highcharts-crooked5',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'crookedLine',
                            type: 'crookedLine',
                            typeOptions: {
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                points: [
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y }
                                ]
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.crooked5.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
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
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-elliott3", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            elliott3: {
                /** @ignore-option */
                className: 'highcharts-elliott3',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'elliott3',
                            type: 'elliottWave',
                            typeOptions: {
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                points: [
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y }
                                ]
                            },
                            labelOptions: {
                                style: {
                                    color: palette.neutralColor60
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.elliott3.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
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
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-elliott3", "start": function() {}, "steps": [function() {}, function() {}, function() {}, function() {}], "annotationsOptions": {}}
             */
            elliott5: {
                /** @ignore-option */
                className: 'highcharts-elliott5',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'elliott5',
                            type: 'elliottWave',
                            typeOptions: {
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                points: [
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y }
                                ]
                            },
                            labelOptions: {
                                style: {
                                    color: palette.neutralColor60
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.elliott5.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
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
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-x", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            measureX: {
                /** @ignore-option */
                className: 'highcharts-measure-x',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'measure',
                            type: 'measure',
                            typeOptions: {
                                selectType: 'x',
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                point: { x: x,
                        y: y },
                                crosshairX: {
                                    strokeWidth: 1,
                                    stroke: palette.neutralColor100
                                },
                                crosshairY: {
                                    enabled: false,
                                    strokeWidth: 0,
                                    stroke: palette.neutralColor100
                                },
                                background: {
                                    width: 0,
                                    height: 0,
                                    strokeWidth: 0,
                                    stroke: palette.backgroundColor
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: palette.neutralColor60
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.measureX.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateRectSize
                ]
            },
            /**
             * A measure (y-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-y", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            measureY: {
                /** @ignore-option */
                className: 'highcharts-measure-y',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'measure',
                            type: 'measure',
                            typeOptions: {
                                selectType: 'y',
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                point: { x: x,
                        y: y },
                                crosshairX: {
                                    enabled: false,
                                    strokeWidth: 0,
                                    stroke: palette.neutralColor100
                                },
                                crosshairY: {
                                    strokeWidth: 1,
                                    stroke: palette.neutralColor100
                                },
                                background: {
                                    width: 0,
                                    height: 0,
                                    strokeWidth: 0,
                                    stroke: palette.backgroundColor
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: palette.neutralColor60
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.measureY.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateRectSize
                ]
            },
            /**
             * A measure (xy-dimension) annotation bindings. Includes `start` and one
             * event in `steps` array.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-measure-xy", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
             */
            measureXY: {
                /** @ignore-option */
                className: 'highcharts-measure-xy',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'measure',
                            type: 'measure',
                            typeOptions: {
                                selectType: 'xy',
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                point: { x: x,
                        y: y },
                                background: {
                                    width: 0,
                                    height: 0,
                                    strokeWidth: 10
                                },
                                crosshairX: {
                                    strokeWidth: 1,
                                    stroke: palette.neutralColor100
                                },
                                crosshairY: {
                                    strokeWidth: 1,
                                    stroke: palette.neutralColor100
                                }
                            },
                            labelOptions: {
                                style: {
                                    color: palette.neutralColor60
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.measureXY.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateRectSize
                ]
            },
            // Advanced type annotations:
            /**
             * A fibonacci annotation bindings. Includes `start` and two events in
             * `steps` array (updates second point, then height).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-fibonacci", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            fibonacci: {
                /** @ignore-option */
                className: 'highcharts-fibonacci',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'fibonacci',
                            type: 'fibonacci',
                            typeOptions: {
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                points: [
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y }
                                ]
                            },
                            labelOptions: {
                                style: {
                                    color: palette.neutralColor60
                                }
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.fibonacci.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateHeight
                ]
            },
            /**
             * A parallel channel (tunnel) annotation bindings. Includes `start` and
             * two events in `steps` array (updates second point, then height).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-parallel-channel", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            parallelChannel: {
                /** @ignore-option */
                className: 'highcharts-parallel-channel',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value,
                        y = coordsY.value,
                        navigation = this.chart.options.navigation,
                        options = merge({
                            langKey: 'parallelChannel',
                            type: 'tunnel',
                            typeOptions: {
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                points: [
                                    { x: x,
                        y: y },
                                    { x: x,
                        y: y }
                                ]
                            }
                        },
                        navigation.annotationsOptions,
                        navigation.bindings.parallelChannel.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
                steps: [
                    bindingsUtils.updateNthPoint(1),
                    bindingsUtils.updateHeight
                ]
            },
            /**
             * An Andrew's pitchfork annotation bindings. Includes `start` and two
             * events in `steps` array (sets second and third control points).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-pitchfork", "start": function() {}, "steps": [function() {}, function() {}], "annotationsOptions": {}}
             */
            pitchfork: {
                /** @ignore-option */
                className: 'highcharts-pitchfork',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var coords = this.chart.pointer.getCoordinates(e),
                        coordsX = this.utils.getAssignedAxis(coords.xAxis),
                        coordsY = this.utils.getAssignedAxis(coords.yAxis);
                    // Exit if clicked out of axes area
                    if (!coordsX || !coordsY) {
                        return;
                    }
                    var x = coordsX.value, y = coordsY.value, navigation = this.chart.options.navigation, options = merge({
                            langKey: 'pitchfork',
                            type: 'pitchfork',
                            typeOptions: {
                                xAxis: coordsX.axis.options.index,
                                yAxis: coordsY.axis.options.index,
                                points: [{
                                        x: coordsX.value,
                                        y: coordsY.value,
                                        controlPoint: {
                                            style: {
                                                fill: palette.negativeColor
                                            }
                                        }
                                    }, { x: x, y: y },
                                    { x: x, y: y }],
                                innerBackground: {
                                    fill: 'rgba(100, 170, 255, 0.8)'
                                }
                            },
                            shapeOptions: {
                                strokeWidth: 2
                            }
                        }, navigation.annotationsOptions, navigation.bindings.pitchfork.annotationsOptions);
                    return this.chart.addAnnotation(options);
                },
                /** @ignore-option */
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
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-counter", "start": function() {}, "annotationsOptions": {}}
             */
            verticalCounter: {
                /** @ignore-option */
                className: 'highcharts-vertical-counter',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var closestPoint = bindingsUtils.attractToPoint(e,
                        this.chart),
                        navigation = this.chart.options.navigation,
                        options,
                        annotation;
                    // Exit if clicked out of axes area
                    if (!closestPoint) {
                        return;
                    }
                    this.verticalCounter = this.verticalCounter || 0;
                    options = merge({
                        langKey: 'verticalCounter',
                        type: 'verticalLine',
                        typeOptions: {
                            point: {
                                x: closestPoint.x,
                                y: closestPoint.y,
                                xAxis: closestPoint.xAxis,
                                yAxis: closestPoint.yAxis
                            },
                            label: {
                                offset: closestPoint.below ? 40 : -40,
                                text: this.verticalCounter.toString()
                            }
                        },
                        labelOptions: {
                            style: {
                                color: palette.neutralColor60,
                                fontSize: '11px'
                            }
                        },
                        shapeOptions: {
                            stroke: 'rgba(0, 0, 0, 0.75)',
                            strokeWidth: 1
                        }
                    }, navigation.annotationsOptions, navigation.bindings.verticalCounter.annotationsOptions);
                    annotation = this.chart.addAnnotation(options);
                    this.verticalCounter++;
                    annotation.options.events.click.call(annotation, {});
                }
            },
            /**
             * A vertical arrow annotation bindings. Includes `start` event. On click,
             * finds the closest point and marks it with an arrow and a label with
             * value.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-label", "start": function() {}, "annotationsOptions": {}}
             */
            verticalLabel: {
                /** @ignore-option */
                className: 'highcharts-vertical-label',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var closestPoint = bindingsUtils.attractToPoint(e,
                        this.chart),
                        navigation = this.chart.options.navigation,
                        options,
                        annotation;
                    // Exit if clicked out of axes area
                    if (!closestPoint) {
                        return;
                    }
                    options = merge({
                        langKey: 'verticalLabel',
                        type: 'verticalLine',
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
                                color: palette.neutralColor60,
                                fontSize: '11px'
                            }
                        },
                        shapeOptions: {
                            stroke: 'rgba(0, 0, 0, 0.75)',
                            strokeWidth: 1
                        }
                    }, navigation.annotationsOptions, navigation.bindings.verticalLabel.annotationsOptions);
                    annotation = this.chart.addAnnotation(options);
                    annotation.options.events.click.call(annotation, {});
                }
            },
            /**
             * A vertical arrow annotation bindings. Includes `start` event. On click,
             * finds the closest point and marks it with an arrow.
             * `${palette.positiveColor}` is the color of the arrow when
             * pointing from above and `${palette.negativeColor}`
             * when pointing from below the point.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-vertical-arrow", "start": function() {}, "annotationsOptions": {}}
             */
            verticalArrow: {
                /** @ignore-option */
                className: 'highcharts-vertical-arrow',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                start: function (e) {
                    var closestPoint = bindingsUtils.attractToPoint(e,
                        this.chart),
                        navigation = this.chart.options.navigation,
                        options,
                        annotation;
                    // Exit if clicked out of axes area
                    if (!closestPoint) {
                        return;
                    }
                    options = merge({
                        langKey: 'verticalArrow',
                        type: 'verticalLine',
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
                                stroke: closestPoint.below ?
                                    palette.negativeColor : palette.positiveColor
                            }
                        },
                        shapeOptions: {
                            stroke: 'rgba(0, 0, 0, 0.75)',
                            strokeWidth: 1
                        }
                    }, navigation.annotationsOptions, navigation.bindings.verticalArrow.annotationsOptions);
                    annotation = this.chart.addAnnotation(options);
                    annotation.options.events.click.call(annotation, {});
                }
            },
            // Flag types:
            /**
             * A flag series bindings. Includes `start` event. On click, finds the
             * closest point and marks it with a flag with `'circlepin'` shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-circlepin", "start": function() {}}
             */
            flagCirclepin: {
                /** @ignore-option */
                className: 'highcharts-flag-circlepin',
                /** @ignore-option */
                start: bindingsUtils.addFlagFromForm('circlepin')
            },
            /**
             * A flag series bindings. Includes `start` event. On click, finds the
             * closest point and marks it with a flag with `'diamondpin'` shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-diamondpin", "start": function() {}}
             */
            flagDiamondpin: {
                /** @ignore-option */
                className: 'highcharts-flag-diamondpin',
                /** @ignore-option */
                start: bindingsUtils.addFlagFromForm('flag')
            },
            /**
             * A flag series bindings. Includes `start` event.
             * On click, finds the closest point and marks it with a flag with
             * `'squarepin'` shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-squarepin", "start": function() {}}
             */
            flagSquarepin: {
                /** @ignore-option */
                className: 'highcharts-flag-squarepin',
                /** @ignore-option */
                start: bindingsUtils.addFlagFromForm('squarepin')
            },
            /**
             * A flag series bindings. Includes `start` event.
             * On click, finds the closest point and marks it with a flag without pin
             * shape.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-flag-simplepin", "start": function() {}}
             */
            flagSimplepin: {
                /** @ignore-option */
                className: 'highcharts-flag-simplepin',
                /** @ignore-option */
                start: bindingsUtils.addFlagFromForm('nopin')
            },
            // Other tools:
            /**
             * Enables zooming in xAxis on a chart. Includes `start` event which
             * changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-x", "init": function() {}}
             */
            zoomX: {
                /** @ignore-option */
                className: 'highcharts-zoom-x',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zoomType: 'x'
                        }
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Enables zooming in yAxis on a chart. Includes `start` event which
             * changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-y", "init": function() {}}
             */
            zoomY: {
                /** @ignore-option */
                className: 'highcharts-zoom-y',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zoomType: 'y'
                        }
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Enables zooming in xAxis and yAxis on a chart. Includes `start` event
             * which changes [chart.zoomType](#chart.zoomType).
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-zoom-xy", "init": function() {}}
             */
            zoomXY: {
                /** @ignore-option */
                className: 'highcharts-zoom-xy',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.update({
                        chart: {
                            zoomType: 'xy'
                        }
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Changes main series to `'line'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-line", "init": function() {}}
             */
            seriesTypeLine: {
                /** @ignore-option */
                className: 'highcharts-series-type-line',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'line',
                        useOhlcData: true
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Changes main series to `'ohlc'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-ohlc", "init": function() {}}
             */
            seriesTypeOhlc: {
                /** @ignore-option */
                className: 'highcharts-series-type-ohlc',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'ohlc'
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Changes main series to `'candlestick'` type.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-series-type-candlestick", "init": function() {}}
             */
            seriesTypeCandlestick: {
                /** @ignore-option */
                className: 'highcharts-series-type-candlestick',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.series[0].update({
                        type: 'candlestick'
                    });
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Displays chart in fullscreen.
             *
             * **Note**: Fullscreen is not supported on iPhone due to iOS limitations.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "noDataState": "normal", "highcharts-full-screen", "init": function() {}}
             */
            fullScreen: {
                /** @ignore-option */
                className: 'highcharts-full-screen',
                noDataState: 'normal',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    this.chart.fullscreen.toggle();
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Hides/shows two price indicators:
             * - last price in the dataset
             * - last price in the selected range
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-current-price-indicator", "init": function() {}}
             */
            currentPriceIndicator: {
                /** @ignore-option */
                className: 'highcharts-current-price-indicator',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    var chart = this.chart,
                        series = chart.series,
                        gui = chart.stockTools,
                        priceIndicatorEnabled = bindingsUtils.isPriceIndicatorEnabled(chart.series);
                    if (gui && gui.guiEnabled) {
                        series.forEach(function (series) {
                            series.update({
                                lastPrice: { enabled: !priceIndicatorEnabled },
                                lastVisiblePrice: { enabled: !priceIndicatorEnabled, label: { enabled: true } }
                            }, false);
                        });
                        chart.redraw();
                    }
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Indicators bindings. Includes `init` event to show a popup.
             *
             * Note: In order to show base series from the chart in the popup's
             * dropdown each series requires
             * [series.id](https://api.highcharts.com/highstock/series.line.id) to be
             * defined.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-indicators", "init": function() {}}
             */
            indicators: {
                /** @ignore-option */
                className: 'highcharts-indicators',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function () {
                    var navigation = this;
                    fireEvent(navigation, 'showPopup', {
                        formType: 'indicators',
                        options: {},
                        // Callback on submit:
                        onSubmit: function (data) {
                            navigation.utils.manageIndicators.call(navigation, data);
                        }
                    });
                }
            },
            /**
             * Hides/shows all annotations on a chart.
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-toggle-annotations", "init": function() {}}
             */
            toggleAnnotations: {
                /** @ignore-option */
                className: 'highcharts-toggle-annotations',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
                init: function (button) {
                    var chart = this.chart,
                        gui = chart.stockTools,
                        iconsURL = gui.getIconsURL();
                    this.toggledAnnotations = !this.toggledAnnotations;
                    (chart.annotations || []).forEach(function (annotation) {
                        annotation.setVisibility(!this.toggledAnnotations);
                    }, this);
                    if (gui && gui.guiEnabled) {
                        if (this.toggledAnnotations) {
                            button.firstChild.style['background-image'] =
                                'url("' + iconsURL +
                                    'annotations-hidden.svg")';
                        }
                        else {
                            button.firstChild.style['background-image'] =
                                'url("' + iconsURL +
                                    'annotations-visible.svg")';
                        }
                    }
                    fireEvent(this, 'deselectButton', { button: button });
                }
            },
            /**
             * Save a chart in localStorage under `highcharts-chart` key.
             * Stored items:
             * - annotations
             * - indicators (with yAxes)
             * - flags
             *
             * @type    {Highcharts.NavigationBindingsOptionsObject}
             * @product highstock
             * @default {"className": "highcharts-save-chart", "noDataState": "normal", "init": function() {}}
             */
            saveChart: {
                /** @ignore-option */
                className: 'highcharts-save-chart',
                noDataState: 'normal',
                // eslint-disable-next-line valid-jsdoc
                /** @ignore-option */
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
                        if (series.is('sma')) {
                            indicators.push(series.userOptions);
                        }
                        else if (series.type === 'flags') {
                            flags.push(series.userOptions);
                        }
                    });
                    chart.yAxis.forEach(function (yAxis) {
                        if (bindingsUtils.isNotNavigatorYAxis(yAxis)) {
                            yAxes.push(yAxis.options);
                        }
                    });
                    H.win.localStorage.setItem(PREFIX + 'chart', JSON.stringify({
                        annotations: annotations,
                        indicators: indicators,
                        flags: flags,
                        yAxes: yAxes
                    }));
                    fireEvent(this, 'deselectButton', { button: button });
                }
            }
        };
        setOptions({
            navigation: {
                bindings: stockToolsBindings
            }
        });
        NavigationBindings.prototype.utils = merge(bindingsUtils, NavigationBindings.prototype.utils);

    });
    _registerModule(_modules, 'Stock/StockToolsGui.js', [_modules['Core/Chart/Chart.js'], _modules['Core/Globals.js'], _modules['Extensions/Annotations/NavigationBindings.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Utilities.js']], function (Chart, H, NavigationBindings, D, U) {
        /* *
         *
         *  GUI generator for Stock tools
         *
         *  (c) 2009-2021 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var setOptions = D.setOptions;
        var addEvent = U.addEvent,
            createElement = U.createElement,
            css = U.css,
            extend = U.extend,
            fireEvent = U.fireEvent,
            getStyle = U.getStyle,
            isArray = U.isArray,
            merge = U.merge,
            pick = U.pick;
        var DIV = 'div', SPAN = 'span', UL = 'ul', LI = 'li', PREFIX = 'highcharts-', activeClass = PREFIX + 'active';
        setOptions({
            /**
             * @optionparent lang
             */
            lang: {
                /**
                 * Configure the stockTools GUI titles(hints) in the chart. Requires
                 * the `stock-tools.js` module to be loaded.
                 *
                 * @product highstock
                 * @since   7.0.0
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
                        background: 'Background',
                        // Indicators' params (#15170):
                        index: 'Index',
                        period: 'Period',
                        standardDeviation: 'Standard deviation',
                        periodTenkan: 'Tenkan period',
                        periodSenkouSpanB: 'Senkou Span B period',
                        periodATR: 'ATR period',
                        multiplierATR: 'ATR multiplier',
                        shortPeriod: 'Short period',
                        longPeriod: 'Long period',
                        signalPeriod: 'Signal period',
                        decimals: 'Decimals',
                        algorithm: 'Algorithm',
                        topBand: 'Top band',
                        bottomBand: 'Bottom band',
                        initialAccelerationFactor: 'Initial acceleration factor',
                        maxAccelerationFactor: 'Max acceleration factor',
                        increment: 'Increment',
                        multiplier: 'Multiplier',
                        ranges: 'Ranges',
                        highIndex: 'High index',
                        lowIndex: 'Low index',
                        deviation: 'Deviation',
                        xAxisUnit: 'x-axis unit',
                        factor: 'Factor',
                        fastAvgPeriod: 'Fast average period',
                        slowAvgPeriod: 'Slow average period',
                        average: 'Average'
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
             * @since        7.0.0
             * @optionparent stockTools
             */
            stockTools: {
                /**
                 * Definitions of buttons in Stock Tools GUI.
                 */
                gui: {
                    /**
                     * Path where Highcharts will look for icons. Change this to use
                     * icons from a different server.
                     *
                     * Since 7.1.3 use [iconsURL](#navigation.iconsURL) for popup and
                     * stock tools.
                     *
                     * @deprecated
                     * @apioption stockTools.gui.iconsURL
                     *
                     */
                    /**
                     * Enable or disable the stockTools gui.
                     */
                    enabled: true,
                    /**
                     * A CSS class name to apply to the stocktools' div,
                     * allowing unique CSS styling for each chart.
                     */
                    className: 'highcharts-bindings-wrapper',
                    /**
                     * A CSS class name to apply to the container of buttons,
                     * allowing unique CSS styling for each chart.
                     */
                    toolbarClassName: 'stocktools-toolbar',
                    /**
                     * A collection of strings pointing to config options for the
                     * toolbar items. Each name refers to a unique key from the
                     * definitions object.
                     *
                     * @type    {Array<string>}
                     * @default [
                     *   'indicators',
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
                     * ]
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
                     */
                    definitions: {
                        separator: {
                            /**
                             * A predefined background symbol for the button.
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
        /* eslint-disable no-invalid-this, valid-jsdoc */
        // Run HTML generator
        addEvent(Chart, 'afterGetContainer', function () {
            this.setStockTools();
        });
        addEvent(Chart, 'getMargins', function () {
            var listWrapper = this.stockTools && this.stockTools.listWrapper,
                offsetWidth = listWrapper && ((listWrapper.startWidth +
                    getStyle(listWrapper, 'padding-left') +
                    getStyle(listWrapper, 'padding-right')) || listWrapper.offsetWidth);
            if (offsetWidth && offsetWidth < this.plotWidth) {
                this.plotLeft += offsetWidth;
                this.spacing[3] += offsetWidth;
            }
        }, {
            order: 0
        });
        ['beforeRender', 'beforeRedraw'].forEach(function (event) {
            addEvent(Chart, event, function () {
                if (this.stockTools) {
                    var optionsChart = this.options.chart;
                    var listWrapper = this.stockTools.listWrapper,
                        offsetWidth = listWrapper && ((listWrapper.startWidth +
                            getStyle(listWrapper, 'padding-left') +
                            getStyle(listWrapper, 'padding-right')) || listWrapper.offsetWidth);
                    var dirty = false;
                    if (offsetWidth && offsetWidth < this.plotWidth) {
                        var nextX = pick(optionsChart.spacingLeft,
                            optionsChart.spacing && optionsChart.spacing[3], 0) + offsetWidth;
                        var diff = nextX - this.spacingBox.x;
                        this.spacingBox.x = nextX;
                        this.spacingBox.width -= diff;
                        dirty = true;
                    }
                    else if (offsetWidth === 0) {
                        dirty = true;
                    }
                    if (offsetWidth !== this.stockTools.prevOffsetWidth) {
                        this.stockTools.prevOffsetWidth = offsetWidth;
                        if (dirty) {
                            this.isDirtyLegend = true;
                        }
                    }
                }
            });
        });
        addEvent(Chart, 'destroy', function () {
            if (this.stockTools) {
                this.stockTools.destroy();
            }
        });
        addEvent(Chart, 'redraw', function () {
            if (this.stockTools && this.stockTools.guiEnabled) {
                this.stockTools.redraw();
            }
        });
        /**
         * Toolbar Class
         * @private
         * @constructor
         * @param {Object} - options of toolbar
         * @param {Chart} - Reference to chart
         */
        var Toolbar = /** @class */ (function () {
                function Toolbar(options, langOptions, chart) {
                    this.arrowDown = void 0;
                this.arrowUp = void 0;
                this.arrowWrapper = void 0;
                this.listWrapper = void 0;
                this.showhideBtn = void 0;
                this.submenu = void 0;
                this.toolbar = void 0;
                this.wrapper = void 0;
                this.chart = chart;
                this.options = options;
                this.lang = langOptions;
                // set url for icons.
                this.iconsURL = this.getIconsURL();
                this.guiEnabled = options.enabled;
                this.visible = pick(options.visible, true);
                this.placed = pick(options.placed, false);
                // General events collection which should be removed upon
                // destroy/update:
                this.eventsToUnbind = [];
                if (this.guiEnabled) {
                    this.createHTML();
                    this.init();
                    this.showHideNavigatorion();
                }
                fireEvent(this, 'afterInit');
            }
            /**
             * Initialize the toolbar. Create buttons and submenu for each option
             * defined in `stockTools.gui`.
             * @private
             */
            Toolbar.prototype.init = function () {
                var _self = this,
                    lang = this.lang,
                    guiOptions = this.options,
                    toolbar = this.toolbar,
                    addSubmenu = _self.addSubmenu,
                    buttons = guiOptions.buttons,
                    defs = guiOptions.definitions,
                    allButtons = toolbar.childNodes,
                    button;
                // create buttons
                buttons.forEach(function (btnName) {
                    button = _self.addButton(toolbar, defs, btnName, lang);
                    _self.eventsToUnbind.push(addEvent(button.buttonWrapper, 'click', function () {
                        _self.eraseActiveButtons(allButtons, button.buttonWrapper);
                    }));
                    if (isArray(defs[btnName].items)) {
                        // create submenu buttons
                        addSubmenu.call(_self, button, defs[btnName]);
                    }
                });
            };
            /**
             * Create submenu (list of buttons) for the option. In example main button
             * is Line, in submenu will be buttons with types of lines.
             * @private
             * @param {Highcharts.Dictionary<Highcharts.HTMLDOMElement>}
             * button which has submenu
             * @param {Highcharts.StockToolsGuiDefinitionsButtonsOptions}
             * list of all buttons
             */
            Toolbar.prototype.addSubmenu = function (parentBtn, button) {
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
                }, void 0, buttonWrapper);
                // create submenu buttons and select the first one
                this.addSubmenuItems(buttonWrapper, button);
                // show / hide submenu
                _self.eventsToUnbind.push(addEvent(submenuArrow, 'click', function (e) {
                    e.stopPropagation();
                    // Erase active class on all other buttons
                    _self.eraseActiveButtons(allButtons, buttonWrapper);
                    // hide menu
                    if (buttonWrapper.className.indexOf(PREFIX + 'current') >= 0) {
                        menuWrapper.style.width =
                            menuWrapper.startWidth + 'px';
                        buttonWrapper.classList.remove(PREFIX + 'current');
                        submenuWrapper.style.display = 'none';
                    }
                    else {
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
                            buttonWrapper.offsetTop > topMargin)) {
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
                            getStyle(menuWrapper, 'padding-left') +
                            submenuWrapper.offsetWidth + 3 + 'px';
                    }
                }));
            };
            /**
             * Create buttons in submenu
             * @private
             * @param {Highcharts.HTMLDOMElement}
             * button where submenu is placed
             * @param {Highcharts.StockToolsGuiDefinitionsButtonsOptions}
             * list of all buttons options
             *
             */
            Toolbar.prototype.addSubmenuItems = function (buttonWrapper, button) {
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
                    submenuBtn = _self.addButton(submenuWrapper, button, btnName, lang);
                    _self.eventsToUnbind.push(addEvent(submenuBtn.mainButton, 'click', function () {
                        _self.switchSymbol(this, buttonWrapper, true);
                        menuWrapper.style.width =
                            menuWrapper.startWidth + 'px';
                        submenuWrapper.style.display = 'none';
                    }));
                });
                // select first submenu item
                firstSubmenuItem = submenuWrapper
                    .querySelectorAll('li > .' + PREFIX + 'menu-item-btn')[0];
                // replace current symbol, in main button, with submenu's button style
                _self.switchSymbol(firstSubmenuItem, false);
            };
            /*
             * Erase active class on all other buttons.
             *
             * @param {Array} - Array of HTML buttons
             * @param {HTMLDOMElement} - Current HTML button
             *
             */
            Toolbar.prototype.eraseActiveButtons = function (buttons, currentButton, submenuItems) {
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
            };
            /**
             * Create single button. Consist of HTML elements `li`, `span`, and (if
             * exists) submenu container.
             * @private
             * @param {Highcharts.HTMLDOMElement} target
             * HTML reference, where button should be added
             * @param {Highcharts.StockToolsGuiDefinitionsButtonsOptions|Highcharts.StockToolsGuiDefinitionsOptions} options
             * All options, by btnName refer to particular button
             * @param {string} btnName
             * of functionality mapped for specific class
             * @param {Highcharts.Dictionary<string>} lang
             * All titles, by btnName refer to particular button
             * @return {Object} - references to all created HTML elements
             */
            Toolbar.prototype.addButton = function (target, options, btnName, lang) {
                if (lang === void 0) { lang = {}; }
                var btnOptions = options[btnName],
                    items = btnOptions.items,
                    classMapping = Toolbar.prototype.classMapping,
                    userClassName = btnOptions.className || '',
                    mainButton,
                    submenuArrow,
                    buttonWrapper;
                // main button wrapper
                buttonWrapper = createElement(LI, {
                    className: pick(classMapping[btnName], '') + ' ' + userClassName,
                    title: lang[btnName] || btnName
                }, void 0, target);
                // single button
                mainButton = createElement(SPAN, {
                    className: PREFIX + 'menu-item-btn'
                }, void 0, buttonWrapper);
                // submenu
                if (items && items.length) {
                    // arrow is a hook to show / hide submenu
                    submenuArrow = createElement(SPAN, {
                        className: PREFIX + 'submenu-item-arrow ' +
                            PREFIX + 'arrow-right'
                    }, void 0, buttonWrapper);
                    submenuArrow.style.backgroundImage = 'url(' +
                        this.iconsURL + 'arrow-bottom.svg)';
                }
                else {
                    mainButton.style.backgroundImage = 'url(' +
                        this.iconsURL + btnOptions.symbol + ')';
                }
                return {
                    buttonWrapper: buttonWrapper,
                    mainButton: mainButton,
                    submenuArrow: submenuArrow
                };
            };
            /*
             * Create navigation's HTML elements: container and arrows.
             *
             */
            Toolbar.prototype.addNavigation = function () {
                var stockToolbar = this,
                    wrapper = stockToolbar.wrapper;
                // arrow wrapper
                stockToolbar.arrowWrapper = createElement(DIV, {
                    className: PREFIX + 'arrow-wrapper'
                });
                stockToolbar.arrowUp = createElement(DIV, {
                    className: PREFIX + 'arrow-up'
                }, void 0, stockToolbar.arrowWrapper);
                stockToolbar.arrowUp.style.backgroundImage =
                    'url(' + this.iconsURL + 'arrow-right.svg)';
                stockToolbar.arrowDown = createElement(DIV, {
                    className: PREFIX + 'arrow-down'
                }, void 0, stockToolbar.arrowWrapper);
                stockToolbar.arrowDown.style.backgroundImage =
                    'url(' + this.iconsURL + 'arrow-right.svg)';
                wrapper.insertBefore(stockToolbar.arrowWrapper, wrapper.childNodes[0]);
                // attach scroll events
                stockToolbar.scrollButtons();
            };
            /*
             * Add events to navigation (two arrows) which allows user to scroll
             * top/down GUI buttons, if container's height is not enough.
             *
             */
            Toolbar.prototype.scrollButtons = function () {
                var targetY = 0,
                    _self = this,
                    wrapper = _self.wrapper,
                    toolbar = _self.toolbar,
                    step = 0.1 * wrapper.offsetHeight; // 0.1 = 10%
                    _self.eventsToUnbind.push(addEvent(_self.arrowUp, 'click',
                    function () {
                        if (targetY > 0) {
                            targetY -= step;
                        toolbar.style.marginTop = -targetY + 'px';
                    }
                }));
                _self.eventsToUnbind.push(addEvent(_self.arrowDown, 'click', function () {
                    if (wrapper.offsetHeight + targetY <=
                        toolbar.offsetHeight + step) {
                        targetY += step;
                        toolbar.style.marginTop = -targetY + 'px';
                    }
                }));
            };
            /*
             * Create stockTools HTML main elements.
             *
             */
            Toolbar.prototype.createHTML = function () {
                var stockToolbar = this,
                    chart = stockToolbar.chart,
                    guiOptions = stockToolbar.options,
                    container = chart.container,
                    navigation = chart.options.navigation,
                    bindingsClassName = navigation && navigation.bindingsClassName,
                    listWrapper,
                    toolbar;
                // create main container
                var wrapper = stockToolbar.wrapper = createElement(DIV, {
                        className: PREFIX + 'stocktools-wrapper ' +
                            guiOptions.className + ' ' + bindingsClassName
                    });
                container.appendChild(wrapper);
                // Mimic event behaviour of being outside chart.container
                [
                    'mousemove',
                    'click',
                    'touchstart'
                ].forEach(function (eventType) {
                    addEvent(wrapper, eventType, function (e) {
                        return e.stopPropagation();
                    });
                });
                addEvent(wrapper, 'mouseover', function (e) {
                    return chart.pointer.onContainerMouseLeave(e);
                });
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
            };
            /**
             * Function called in redraw verifies if the navigation should be visible.
             * @private
             */
            Toolbar.prototype.showHideNavigatorion = function () {
                // arrows
                // 50px space for arrows
                if (this.visible &&
                    this.toolbar.offsetHeight > (this.wrapper.offsetHeight - 50)) {
                    this.arrowWrapper.style.display = 'block';
                }
                else {
                    // reset margin if whole toolbar is visible
                    this.toolbar.style.marginTop = '0px';
                    // hide arrows
                    this.arrowWrapper.style.display = 'none';
                }
            };
            /**
             * Create button which shows or hides GUI toolbar.
             * @private
             */
            Toolbar.prototype.showHideToolbar = function () {
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
                }, void 0, wrapper);
                showhideBtn.style.backgroundImage =
                    'url(' + this.iconsURL + 'arrow-right.svg)';
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
                }
                else {
                    wrapper.style.height = '100%';
                    showhideBtn.style.top = getStyle(toolbar, 'padding-top') + 'px';
                    showhideBtn.style.left = (wrapper.offsetWidth +
                        getStyle(toolbar, 'padding-left')) + 'px';
                }
                // Toggle menu
                stockToolbar.eventsToUnbind.push(addEvent(showhideBtn, 'click', function () {
                    chart.update({
                        stockTools: {
                            gui: {
                                visible: !visible,
                                placed: true
                            }
                        }
                    });
                }));
            };
            /*
             * In main GUI button, replace icon and class with submenu button's
             * class / symbol.
             *
             * @param {HTMLDOMElement} - submenu button
             * @param {Boolean} - true or false
             *
             */
            Toolbar.prototype.switchSymbol = function (button, redraw) {
                var buttonWrapper = button.parentNode,
                    buttonWrapperClass = buttonWrapper.classList.value, 
                    // main button in first level og GUI
                    mainNavButton = buttonWrapper.parentNode.parentNode;
                // if the button is disabled, don't do anything
                if (buttonWrapperClass.indexOf('highcharts-disabled-btn') > -1) {
                    return;
                }
                // set class
                mainNavButton.className = '';
                if (buttonWrapperClass) {
                    mainNavButton.classList.add(buttonWrapperClass.trim());
                }
                // set icon
                mainNavButton
                    .querySelectorAll('.' + PREFIX + 'menu-item-btn')[0]
                    .style.backgroundImage =
                    button.style.backgroundImage;
                // set active class
                if (redraw) {
                    this.selectButton(mainNavButton);
                }
            };
            /*
             * Set select state (active class) on button.
             *
             * @param {HTMLDOMElement} - button
             *
             */
            Toolbar.prototype.selectButton = function (button) {
                if (button.className.indexOf(activeClass) >= 0) {
                    button.classList.remove(activeClass);
                }
                else {
                    button.classList.add(activeClass);
                }
            };
            /*
             * Remove active class from all buttons except defined.
             *
             * @param {HTMLDOMElement} - button which should not be deactivated
             *
             */
            Toolbar.prototype.unselectAllButtons = function (button) {
                var activeButtons = button.parentNode
                        .querySelectorAll('.' + activeClass);
                [].forEach.call(activeButtons, function (activeBtn) {
                    if (activeBtn !== button) {
                        activeBtn.classList.remove(activeClass);
                    }
                });
            };
            /*
             * Update GUI with given options.
             *
             * @param {Object} - general options for Stock Tools
             */
            Toolbar.prototype.update = function (options, redraw) {
                merge(true, this.chart.options.stockTools, options);
                this.destroy();
                this.chart.setStockTools(options);
                // If Stock Tools are updated, then bindings should be updated too:
                if (this.chart.navigationBindings) {
                    this.chart.navigationBindings.update();
                }
                this.chart.isDirtyBox = true;
                if (pick(redraw, true)) {
                    this.chart.redraw();
                }
            };
            /**
             * Destroy all HTML GUI elements.
             * @private
             */
            Toolbar.prototype.destroy = function () {
                var stockToolsDiv = this.wrapper,
                    parent = stockToolsDiv && stockToolsDiv.parentNode;
                this.eventsToUnbind.forEach(function (unbinder) {
                    unbinder();
                });
                // Remove the empty element
                if (parent) {
                    parent.removeChild(stockToolsDiv);
                }
            };
            /**
             * Redraw, GUI requires to verify if the navigation should be visible.
             * @private
             */
            Toolbar.prototype.redraw = function () {
                this.showHideNavigatorion();
            };
            Toolbar.prototype.getIconsURL = function () {
                return this.chart.options.navigation.iconsURL ||
                    this.options.iconsURL ||
                    'https://code.highcharts.com/9.1.2/gfx/stock-icons/';
            };
            return Toolbar;
        }());
        /**
         * Mapping JSON fields to CSS classes.
         * @private
         */
        Toolbar.prototype.classMapping = {
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
        };
        extend(Chart.prototype, {
            /**
             * Verify if Toolbar should be added.
             * @private
             * @param {Highcharts.StockToolsOptions} - chart options
             */
            setStockTools: function (options) {
                var chartOptions = this.options,
                    lang = chartOptions.lang,
                    guiOptions = merge(chartOptions.stockTools && chartOptions.stockTools.gui,
                    options && options.gui),
                    langOptions = lang && lang.stockTools && lang.stockTools.gui;
                this.stockTools = new Toolbar(guiOptions, langOptions, this);
                if (this.stockTools.guiEnabled) {
                    this.isDirtyBox = true;
                }
            }
        });
        // Comunication with bindings:
        addEvent(NavigationBindings, 'selectButton', function (event) {
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
        addEvent(NavigationBindings, 'deselectButton', function (event) {
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
        // Check if the correct price indicator button is displayed, #15029.
        addEvent(Chart, 'render', function () {
            var chart = this,
                stockTools = chart.stockTools,
                button = stockTools &&
                    stockTools.toolbar &&
                    stockTools.toolbar.querySelector('.highcharts-current-price-indicator');
            // Change the initial button background.
            if (stockTools && chart.navigationBindings && chart.options.series && button) {
                if (chart.navigationBindings.constructor.prototype.utils.isPriceIndicatorEnabled(chart.series)) {
                    button.firstChild.style['background-image'] =
                        'url("' + stockTools.getIconsURL() + 'current-price-hide.svg")';
                }
                else {
                    button.firstChild.style['background-image'] =
                        'url("' + stockTools.getIconsURL() + 'current-price-show.svg")';
                }
            }
        });
        H.Toolbar = Toolbar;

        return H.Toolbar;
    });
    _registerModule(_modules, 'masters/modules/stock-tools.src.js', [], function () {


    });
}));