/**
 * @license Highcharts JS v10.0.0 (2022-03-07)
 *
 * Annotations module
 *
 * (c) 2009-2021 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/annotations-advanced', ['highcharts'], function (Highcharts) {
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
                window.dispatchEvent(
                    new CustomEvent(
                        'HighchartsModuleLoaded',
                        { detail: { path: path, module: obj[path] }
                    })
                );
            }
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
                    // Sometimes the target is the annotation and sometimes its the
                    // controllable
                    var annotation = pick(emitter.target && emitter.target.annotation,
                        emitter.target);
                    if (annotation) {
                        // Keep annotation selected after dragging control point
                        annotation.cancelClick = emitter.hasDragged;
                    }
                    emitter.cancelClick = emitter.hasDragged;
                    emitter.hasDragged = false;
                    emitter.chart.hasDraggedAnnotation = false;
                    // ControlPoints vs Annotation:
                    fireEvent(pick(annotation, // #15952
                    emitter), 'afterUpdate');
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
        var merge = U.merge,
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
                    this.x = void 0;
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
                return (options.points ||
                    (options.point && splat(options.point)));
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
             * @param {boolean|undefined} translateSecondPoint If the shape has two
             * points attached to it, this option allows you to translate also
             * the second point
             */
            translateShape: function (dx, dy, translateSecondPoint) {
                var chart = this.annotation.chart, 
                    // Annotation.options
                    shapeOptions = this.annotation.userOptions, 
                    // Chart.options.annotations
                    annotationIndex = chart.annotations.indexOf(this.annotation),
                    chartOptions = chart.options.annotations[annotationIndex];
                this.translatePoint(dx, dy, 0);
                if (translateSecondPoint) {
                    this.translatePoint(dx, dy, 1);
                }
                // Options stored in:
                // - chart (for exporting)
                // - current config (for redraws)
                chartOptions[this.collection][this.index]
                    .point = this.options.point;
                shapeOptions[this.collection][this.index]
                    .point = this.options.point;
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
                        itemOptions.stroke;
                var setMarker = function (markerType) {
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
                                .addMarker((itemOptions.id || uniqueKey()) + '-' + markerId, merge(predefinedMarker, { color: color }));
                            item.attr(markerType, marker.getAttribute('id'));
                        }
                    }
                };
                ['markerStart', 'markerEnd']
                    .forEach(setMarker);
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
                this.setControlPointsVisibility = (ControllableMixin.setControlPointsVisibility);
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
                return (ControllableMixin.shouldBeDrawn.call(this) ||
                    Boolean(this.options.d));
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
                this.setControlPointsVisibility = (ControllableMixin.setControlPointsVisibility);
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
                this.setControlPointsVisibility = (ControllableMixin.setControlPointsVisibility);
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
    _registerModule(_modules, 'Extensions/Annotations/Controllables/ControllableEllipse.js', [_modules['Extensions/Annotations/Mixins/ControllableMixin.js'], _modules['Extensions/Annotations/Controllables/ControllablePath.js'], _modules['Core/Utilities.js']], function (ControllableMixin, ControllablePath, U) {
        /* *
         *
         * Author: Pawel Lysy
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var merge = U.merge,
            defined = U.defined;
        /**
         * A controllable ellipse class.
         *
         * @requires modules/annotations
         *
         * @private
         * @class
         * @name Highcharts.AnnotationControllableEllipse
         *
         * @param {Highcharts.Annotation} annotation an annotation instance
         * @param {Highcharts.AnnotationsShapeOptions} options a shape's options
         * @param {number} index of the Ellipse
         */
        var ControllableEllipse = /** @class */ (function () {
                /* *
                 *
                 *  Constructor
                 *
                 * */
                function ControllableEllipse(annotation, options, index) {
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
                this.linkPoints = ControllableMixin.linkPoints;
                this.point = ControllableMixin.point;
                this.scale = ControllableMixin.scale;
                this.setControlPointsVisibility = (ControllableMixin.setControlPointsVisibility);
                this.shouldBeDrawn = ControllableMixin.shouldBeDrawn;
                this.transform = ControllableMixin.transform;
                this.translatePoint = ControllableMixin.translatePoint;
                this.transformPoint = ControllableMixin.transformPoint;
                /**
                 * @type 'ellipse'
                 */
                this.type = 'ellipse';
                this.init(annotation, options, index);
                this.collection = 'shapes';
            }
            /* *
             *
             *  Functions
             *
             * */
            ControllableEllipse.prototype.init = function (annotation, options, index) {
                if (defined(options.yAxis)) {
                    options.points.forEach(function (point) {
                        point.yAxis = options.yAxis;
                    });
                }
                if (defined(options.xAxis)) {
                    options.points.forEach(function (point) {
                        point.xAxis = options.xAxis;
                    });
                }
                ControllableMixin.init.call(this, annotation, options, index);
            };
            /**
             *
             * Render the element
             * @param parent parent SVG element.
             */
            ControllableEllipse.prototype.render = function (parent) {
                this.graphic = this.annotation.chart.renderer.createElement('ellipse')
                    .attr(this.attrsFromOptions(this.options))
                    .add(parent);
                ControllableMixin.render.call(this);
            };
            /**
             * Translate the points.
             * Mostly used to handle dragging of the ellipse.
             */
            ControllableEllipse.prototype.translate = function (dx, dy) {
                ControllableMixin.translateShape.call(this, dx, dy, true);
            };
            /**
             * Get the distance from the line to the point.
             * @param point1 first point which is on the line
             * @param point2 second point
             * @param x0 point's x value from which you want to calculate the distance from
             * @param y0 point's y value from which you want to calculate the distance from
             */
            ControllableEllipse.prototype.getDistanceFromLine = function (point1, point2, x0, y0) {
                return Math.abs((point2.y - point1.y) * x0 - (point2.x - point1.x) * y0 +
                    point2.x * point1.y - point2.y * point1.x) / Math.sqrt((point2.y - point1.y) * (point2.y - point1.y) +
                    (point2.x - point1.x) * (point2.x - point1.x));
            };
            /**
             * The fuction calculates the svg attributes of the ellipse, and returns all
             * parameters neccessary to draw the ellipse.
             * @param position absolute position of the first point in points array
             * @param position2 absolute position of the second point in points array
             */
            ControllableEllipse.prototype.getAttrs = function (position, position2) {
                var x1 = position.x,
                    y1 = position.y,
                    x2 = position2.x,
                    y2 = position2.y,
                    cx = (x1 + x2) / 2,
                    cy = (y1 + y2) / 2,
                    rx = Math.sqrt((x1 - x2) * (x1 - x2) / 4 + (y1 - y2) * (y1 - y2) / 4),
                    tan = (y2 - y1) / (x2 - x1);
                var angle = Math.atan(tan) * 180 / Math.PI;
                if (cx < x1) {
                    angle += 180;
                }
                var ry = this.getRY();
                return { cx: cx, cy: cy, rx: rx, ry: ry, angle: angle };
            };
            /**
             * Get the value of minor radius of the ellipse.
             */
            ControllableEllipse.prototype.getRY = function () {
                var yAxis = this.getYAxis();
                return defined(yAxis) ?
                    Math.abs(yAxis.toPixels(this.options.ry) - yAxis.toPixels(0)) :
                    this.options.ry;
            };
            /**
             * get the yAxis object to which the ellipse is pinned.
             */
            ControllableEllipse.prototype.getYAxis = function () {
                var yAxisIndex = this.options.yAxis;
                return this.chart.yAxis[yAxisIndex];
            };
            /**
             * Get the absolute coordinates of the MockPoint
             * @param point MockPoint that is added through options
             */
            ControllableEllipse.prototype.getAbsolutePosition = function (point) {
                return this.anchor(point).absolutePosition;
            };
            /**
             *
             * Redraw the element
             * @param animation display an annimation
             */
            ControllableEllipse.prototype.redraw = function (animation) {
                var position = this.getAbsolutePosition(this.points[0]),
                    position2 = this.getAbsolutePosition(this.points[1]),
                    attrs = this.getAttrs(position,
                    position2);
                if (position) {
                    this.graphic[animation ? 'animate' : 'attr']({
                        cx: attrs.cx,
                        cy: attrs.cy,
                        rx: attrs.rx,
                        ry: attrs.ry,
                        rotation: attrs.angle,
                        rotationOriginX: attrs.cx,
                        rotationOriginY: attrs.cy
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
             * Set the radius Y.
             *
             * @param {number} ry a radius in y direction to be set
             */
            ControllableEllipse.prototype.setYRadius = function (ry) {
                this.options.ry = ry;
                this.annotation.userOptions.shapes[0].ry = ry;
                this.annotation.options.shapes[0].ry = ry;
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
             * @name Highcharts.AnnotationControllableEllipse.attrsMap
             * @type {Highcharts.Dictionary<string>}
             */
            ControllableEllipse.attrsMap = merge(ControllablePath.attrsMap, {
                ry: 'ry'
            });
            return ControllableEllipse;
        }());

        return ControllableEllipse;
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
                this.setControlPointsVisibility = (ControllableMixin.setControlPointsVisibility);
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
                            h: (anchorRelativePosition.height ||
                                anchorRelativePosition.width)
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
                this.setControlPointsVisibility = (ControllableMixin.setControlPointsVisibility);
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
    _registerModule(_modules, 'Extensions/Annotations/Annotations.js', [_modules['Core/Animation/AnimationUtilities.js'], _modules['Core/Chart/Chart.js'], _modules['Extensions/Annotations/Mixins/ControllableMixin.js'], _modules['Extensions/Annotations/Controllables/ControllableRect.js'], _modules['Extensions/Annotations/Controllables/ControllableCircle.js'], _modules['Extensions/Annotations/Controllables/ControllableEllipse.js'], _modules['Extensions/Annotations/Controllables/ControllablePath.js'], _modules['Extensions/Annotations/Controllables/ControllableImage.js'], _modules['Extensions/Annotations/Controllables/ControllableLabel.js'], _modules['Extensions/Annotations/ControlPoint.js'], _modules['Extensions/Annotations/Mixins/EventEmitterMixin.js'], _modules['Core/Globals.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Pointer.js'], _modules['Core/Utilities.js']], function (A, Chart, ControllableMixin, ControllableRect, ControllableCircle, ControllableEllipse, ControllablePath, ControllableImage, ControllableLabel, ControlPoint, EventEmitterMixin, H, MockPoint, Pointer, U) {
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
                        if (newOptions[name]) {
                            mergedOptions[name] = splat(newOptions[name]).map(function (basicOptions, i) {
                                return merge(baseOptions[name][i], basicOptions);
                            });
                        }
                        else {
                            mergedOptions[name] = baseOptions[name];
                        }
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
                if (this.clipXAxis &&
                    this.clipYAxis &&
                    this.options.crop // #15399
                ) {
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
                        var point = labelOrShape &&
                            (labelOrShape.point ||
                                (labelOrShape.points && labelOrShape.points[0]));
                    return [
                        xAxes[point && point.xAxis] || axes[0],
                        yAxes[point && point.yAxis] || axes[1]
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
                    .add(this.graphic);
                if (this.options.crop) { // #15399
                    this.shapesGroup.clip(this.chart.plotBoxClip);
                }
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
                    navigation = this.chart.navigationBindings,
                    visibility = pick(visible, !options.visible);
                this.graphic.attr('visibility', visibility ? 'visible' : 'hidden');
                if (!visibility) {
                    this.setControlPointsVisibility(false);
                    if (navigation.activeAnnotation === this &&
                        navigation.popup &&
                        navigation.popup.formType === 'annotation-toolbar') {
                        fireEvent(navigation, 'closePopup');
                    }
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
             * @param {Object} shapeOptions
             * a confg object for a single shape
             * @param {number} index
             * annotation may have many shapes, this is the shape's index saved in
             * shapes.index.
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
                'ellipse': ControllableEllipse,
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
                 */
                animation: {},
                /**
                 * Whether to hide the part of the annotation
                 * that is outside the plot area.
                 *
                 * @sample highcharts/annotations/label-crop-overflow/
                 *         Crop line annotation
                 * @type  {boolean}
                 * @since 9.3.0
                 */
                crop: true,
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
                    borderColor: "#000000" /* neutralColor100 */,
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
                 * @sample highcharts/annotations/mock-points/
                 *         Attach annotation to a mock point with different ways
                 *
                 * @declare   Highcharts.AnnotationMockPointOptionsObject
                 * @type      {
                 *               string|
                 *               Highcharts.AnnotationMockPointOptionsObject|
                 *               Highcharts.AnnotationMockPointFunction
                 *            }
                 * @requires  modules/annotations
                 * @apioption annotations.labels.point
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
                 * @sample highcharts/annotations/mock-points/
                 *         Attach annotation to a mock point with different ways
                 *
                 * @declare   Highcharts.AnnotationMockPointOptionsObject
                 * @type      {
                 *               string|
                 *               Highcharts.AnnotationMockPointOptionsObject|
                 *               Highcharts.AnnotationMockPointFunction
                 *            }
                 * @extends   annotations.labels.point
                 * @requires  modules/annotations
                 * @apioption annotations.shapes.point
                 */
                /**
                 * An array of points for the shape
                 * or a callback function that returns that shape point.
                 *
                 * This option is available
                 * for shapes which can use multiple points such as path. A
                 * point can be either a point object or a point's id.
                 *
                 * @see [annotations.shapes.point](annotations.shapes.point.html)
                 *
                 * @type      {Array<Highcharts.AnnotationShapePointOptions>}
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
                     *
                     * The radius of the shape in y direction.
                     * Used for the ellipse.
                     *
                     * @sample highcharts/annotations/ellipse/
                     *         Ellipse annotation
                     *
                     * @type      {number}
                     * @apioption annotations.shapeOptions.ry
                     **/
                    /**
                     *
                     * The xAxis index to which the points should be attached.
                     * Used for the ellipse.
                     *
                     * @type      {number}
                     * @apioption annotations.shapeOptions.xAxis
                     **/
                    /**
                     * The yAxis index to which the points should be attached.
                     * Used for the ellipse.
                     *
                     * @type      {number}
                     * @apioption annotations.shapeOptions.yAxis
                     **/
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
                     * The type of the shape.
                     * Avaliable options are circle, rect and ellipse.
                     *
                     * @sample highcharts/annotations/shape/
                     *         Basic shape annotation
                     *
                     * @sample highcharts/annotations/ellipse/
                     *         Ellipse annotation
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
                        cursor: 'pointer',
                        fill: "#ffffff" /* backgroundColor */,
                        stroke: "#000000" /* neutralColor100 */,
                        'stroke-width': 2
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
                 * Fires when the annotation is clicked.
                 *
                 * @type      {Highcharts.EventCallbackFunction<Highcharts.Annotation>}
                 * @since     7.1.0
                 * @apioption annotations.events.click
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
                var Constructor = Annotation
                        .types[userOptions.type] || Annotation,
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
             * @sample highcharts/annotations/add-annotation/
             *         Add annotation
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
                    annotation = (idOrAnnotation.coll === 'annotations') ?
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
                                        event.dataRows.forEach(function (row) {
                                            if (!wasAdded &&
                                                row.xValues &&
                                                xAxisIndex !== void 0 &&
                                                annotationX === row.xValues[xAxisIndex]) {
                                                if (joinAnnotations &&
                                                    row.length > startRowLength) {
                                                    row[row.length - 1] += (annotationSeparator +
                                                        annotationText_1);
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
        /* eslint-enable no-invalid-this, valid-jsdoc */
        /**
         * Object of shape point.
         *
         * @interface Highcharts.AnnotationMockPointOptionsObject
         *
         */
        /**
         * The x position of the point. Units can be either in axis
         * or chart pixel coordinates.
         *
         * @type      {number}
         * @name      Highcharts.AnnotationMockPointOptionsObject.x
         */
        /**
         * The y position of the point. Units can be either in axis
         * or chart pixel coordinates.
         *
         * @type      {number}
         * @name      Highcharts.AnnotationMockPointOptionsObject.y
         */
        /**
         * This number defines which xAxis the point is connected to.
         * It refers to either the axis id or the index of the axis in
         * the xAxis array. If the option is not configured or the axis
         * is not found the point's x coordinate refers to the chart
         * pixels.
         *
         * @type      {number|string|null}
         * @name      Highcharts.AnnotationMockPointOptionsObject.xAxis
         */
        /**
         * This number defines which yAxis the point is connected to.
         * It refers to either the axis id or the index of the axis in
         * the yAxis array. If the option is not configured or the axis
         * is not found the point's y coordinate refers to the chart
         * pixels.
         *
         * @type      {number|string|null}
         * @name      Highcharts.AnnotationMockPointOptionsObject.yAxis
         */
        /**
         * Callback function that returns the annotation shape point.
         *
         * @callback Highcharts.AnnotationMockPointFunction
         *
         * @param  {Highcharts.Annotation} annotation
         *         An annotation instance.
         *
         * @return {Highcharts.AnnotationMockPointOptionsObject}
         *         Annotations shape point.
         */
        /**
         * Shape point as string, object or function.
         *
         * @typedef {
         *          string|
         *          Highcharts.AnnotationMockPointOptionsObject|
         *          Highcharts.AnnotationMockPointFunction
         *     }Highcharts.AnnotationShapePointOptions
         */
        ''; // required by JSDoc parsing

        return Annotation;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/BasicAnnotation.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Utilities.js']], function (Annotation, MockPoint, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* eslint-disable no-invalid-this */
        var BasicAnnotation = /** @class */ (function (_super) {
                __extends(BasicAnnotation, _super);
            /* *
             *
             *  Constructors
             *
             * */
            function BasicAnnotation(chart, options) {
                return _super.call(this, chart, options) || this;
            }
            /* *
             *
             *  Functions
             *
             * */
            BasicAnnotation.prototype.addControlPoints = function () {
                var options = this.options,
                    controlPoints = BasicAnnotation.basicControlPoints,
                    annotationType = this.basicType,
                    optionsGroup = options.labels || options.shapes;
                optionsGroup.forEach(function (group) {
                    group.controlPoints = controlPoints[annotationType];
                });
            };
            BasicAnnotation.prototype.init = function () {
                var options = this.options;
                if (options.shapes) {
                    delete options.labelOptions;
                    var type = options.shapes[0].type;
                    // The rectangle is rendered as a path, whereas other basic shapes
                    // are rendered as their respecitve SVG shapes.
                    if (type && type !== 'path') {
                        this.basicType = type;
                    }
                    else {
                        this.basicType = 'rectangle';
                    }
                }
                else {
                    delete options.shapes;
                    this.basicType = 'label';
                }
                Annotation.prototype.init.apply(this, arguments);
            };
            /* *
             *
             *  Static Properties
             *
             * */
            BasicAnnotation.basicControlPoints = {
                label: [{
                        symbol: 'triangle-down',
                        positioner: function (target) {
                            if (!target.graphic.placed) {
                                return {
                                    x: 0,
                                    y: -9e7
                                };
                            }
                            var xy = MockPoint
                                    .pointToPixels(target.points[0]);
                            return {
                                x: xy.x - this.graphic.width / 2,
                                y: xy.y - this.graphic.height / 2
                            };
                        },
                        // TRANSLATE POINT/ANCHOR
                        events: {
                            drag: function (e, target) {
                                var xy = this.mouseMoveToTranslation(e);
                                target.translatePoint(xy.x, xy.y);
                                target.annotation.userOptions.labels[0].point =
                                    target.options.point;
                                target.redraw(false);
                            }
                        }
                    }, {
                        symbol: 'square',
                        positioner: function (target) {
                            if (!target.graphic.placed) {
                                return {
                                    x: 0,
                                    y: -9e7
                                };
                            }
                            return {
                                x: target.graphic.alignAttr.x -
                                    this.graphic.width / 2,
                                y: target.graphic.alignAttr.y -
                                    this.graphic.height / 2
                            };
                        },
                        // TRANSLATE POSITION WITHOUT CHANGING THE
                        // ANCHOR
                        events: {
                            drag: function (e, target) {
                                var xy = this.mouseMoveToTranslation(e);
                                target.translate(xy.x, xy.y);
                                target.annotation.userOptions.labels[0].point =
                                    target.options.point;
                                target.redraw(false);
                            }
                        }
                    }],
                rectangle: [{
                        positioner: function (annotation) {
                            var xy = MockPoint
                                    .pointToPixels(annotation.points[2]);
                            return {
                                x: xy.x - 4,
                                y: xy.y - 4
                            };
                        },
                        events: {
                            drag: function (e, target) {
                                var annotation = target.annotation,
                                    coords = this.chart.pointer.getCoordinates(e),
                                    x = coords.xAxis[0].value,
                                    y = coords.yAxis[0].value,
                                    points = target.options.points;
                                // Top right point
                                points[1].x = x;
                                // Bottom right point (cursor position)
                                points[2].x = x;
                                points[2].y = y;
                                // Bottom left
                                points[3].y = y;
                                annotation.userOptions.shapes[0].points =
                                    target.options.points;
                                annotation.redraw(false);
                            }
                        }
                    }],
                circle: [{
                        positioner: function (target) {
                            var xy = MockPoint.pointToPixels(target.points[0]),
                                r = target.options.r;
                            return {
                                x: xy.x + r * Math.cos(Math.PI / 4) -
                                    this.graphic.width / 2,
                                y: xy.y + r * Math.sin(Math.PI / 4) -
                                    this.graphic.height / 2
                            };
                        },
                        events: {
                            // TRANSFORM RADIUS ACCORDING TO Y
                            // TRANSLATION
                            drag: function (e, target) {
                                var annotation = target.annotation,
                                    position = this.mouseMoveToTranslation(e);
                                target.setRadius(Math.max(target.options.r +
                                    position.y /
                                        Math.sin(Math.PI / 4), 5));
                                annotation.userOptions.shapes[0].r = target.options.r;
                                annotation.userOptions.shapes[0].point =
                                    target.options.point;
                                target.redraw(false);
                            }
                        }
                    }],
                ellipse: [{
                        positioner: function (target) {
                            var position = target.getAbsolutePosition(target.points[0]);
                            return {
                                x: position.x - this.graphic.width / 2,
                                y: position.y - this.graphic.height / 2
                            };
                        },
                        events: {
                            drag: function (e, target) {
                                var position = target.getAbsolutePosition(target.points[0]);
                                target.translatePoint(e.chartX - position.x, e.chartY - position.y, 0);
                                target.redraw(false);
                            }
                        }
                    }, {
                        positioner: function (target) {
                            var position = target.getAbsolutePosition(target.points[1]);
                            return {
                                x: position.x - this.graphic.width / 2,
                                y: position.y - this.graphic.height / 2
                            };
                        },
                        events: {
                            drag: function (e, target) {
                                var position = target.getAbsolutePosition(target.points[1]);
                                target.translatePoint(e.chartX - position.x, e.chartY - position.y, 1);
                                target.redraw(false);
                            }
                        }
                    }, {
                        positioner: function (target) {
                            var position = target.getAbsolutePosition(target.points[0]),
                                position2 = target.getAbsolutePosition(target.points[1]),
                                attrs = target.getAttrs(position,
                                position2);
                            return {
                                x: attrs.cx - this.graphic.width / 2 +
                                    attrs.ry * Math.sin((attrs.angle * Math.PI) / 180),
                                y: attrs.cy - this.graphic.height / 2 -
                                    attrs.ry * Math.cos((attrs.angle * Math.PI) / 180)
                            };
                        },
                        events: {
                            drag: function (e, target) {
                                var position = target.getAbsolutePosition(target.points[0]),
                                    position2 = target.getAbsolutePosition(target.points[1]),
                                    newR = target.getDistanceFromLine(position,
                                    position2,
                                    e.chartX,
                                    e.chartY),
                                    yAxis = target.getYAxis(),
                                    newRY = Math.abs(yAxis.toValue(0) - yAxis.toValue(newR));
                                target.setYRadius(newRY);
                                target.redraw(false);
                            }
                        }
                    }]
            };
            return BasicAnnotation;
        }(Annotation));
        BasicAnnotation.prototype.defaultOptions = merge(Annotation.prototype.defaultOptions, {});
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.basicAnnotation = BasicAnnotation;
        /* *
         *
         *  Default Export
         *
         * */

        return BasicAnnotation;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/CrookedLine.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/ControlPoint.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Utilities.js']], function (Annotation, ControlPoint, MockPoint, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var CrookedLine = /** @class */ (function (_super) {
                __extends(CrookedLine, _super);
            /* *
             *
             * Constructors
             *
             * */
            function CrookedLine(chart, options) {
                return _super.call(this, chart, options) || this;
            }
            /* *
             *
             * Functions
             *
             * */
            /**
             * Overrides default setter to get axes from typeOptions.
             * @private
             */
            CrookedLine.prototype.setClipAxes = function () {
                this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
                this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis];
            };
            CrookedLine.prototype.getPointsOptions = function () {
                var typeOptions = this.options.typeOptions;
                return (typeOptions.points || []).map(function (pointOptions) {
                    pointOptions.xAxis = typeOptions.xAxis;
                    pointOptions.yAxis = typeOptions.yAxis;
                    return pointOptions;
                });
            };
            CrookedLine.prototype.getControlPointsOptions = function () {
                return this.getPointsOptions();
            };
            CrookedLine.prototype.addControlPoints = function () {
                this.getControlPointsOptions().forEach(function (pointOptions, i) {
                    var controlPoint = new ControlPoint(this.chart,
                        this,
                        merge(this.options.controlPointOptions,
                        pointOptions.controlPoint),
                        i);
                    this.controlPoints.push(controlPoint);
                    pointOptions.controlPoint = controlPoint.options;
                }, this);
            };
            CrookedLine.prototype.addShapes = function () {
                var typeOptions = this.options.typeOptions,
                    shape = this.initShape(merge(typeOptions.line, {
                        type: 'path',
                        points: this.points.map(function (_point,
                    i) {
                            return function (target) {
                                return target.annotation.points[i];
                        };
                    })
                }), 0);
                typeOptions.line = shape.options;
            };
            return CrookedLine;
        }(Annotation));
        CrookedLine.prototype.defaultOptions = merge(Annotation.prototype.defaultOptions, 
        /**
         * A crooked line annotation.
         *
         * @sample highcharts/annotations-advanced/crooked-line/
         *         Crooked line
         *
         * @product      highstock
         * @optionparent annotations.crookedLine
         */
        {
            /**
             * @extends   annotations.labelOptions
             * @apioption annotations.crookedLine.labelOptions
             */
            /**
             * @extends   annotations.shapeOptions
             * @apioption annotations.crookedLine.shapeOptions
             */
            /**
             * Additional options for an annotation with the type.
             */
            typeOptions: {
                /**
                 * This number defines which xAxis the point is connected to.
                 * It refers to either the axis id or the index of the axis
                 * in the xAxis array.
                 */
                xAxis: 0,
                /**
                 * This number defines which yAxis the point is connected to.
                 * It refers to either the axis id or the index of the axis
                 * in the xAxis array.
                 */
                yAxis: 0,
                /**
                 * @type      {Array<*>}
                 * @apioption annotations.crookedLine.typeOptions.points
                 */
                /**
                 * The x position of the point.
                 *
                 * @type      {number}
                 * @apioption annotations.crookedLine.typeOptions.points.x
                 */
                /**
                 * The y position of the point.
                 *
                 * @type      {number}
                 * @apioption annotations.crookedLine.typeOptions.points.y
                 */
                /**
                 * @type      {number}
                 * @excluding positioner, events
                 * @apioption annotations.crookedLine.typeOptions.points.controlPoint
                 */
                /**
                 * Line options.
                 *
                 * @excluding height, point, points, r, type, width
                 */
                line: {
                    fill: 'none'
                }
            },
            /**
             * @excluding positioner, events
             */
            controlPointOptions: {
                positioner: function (target) {
                    var graphic = this.graphic,
                        xy = MockPoint.pointToPixels(target.points[this.index]);
                    return {
                        x: xy.x - graphic.width / 2,
                        y: xy.y - graphic.height / 2
                    };
                },
                events: {
                    drag: function (e, target) {
                        if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                            visiblePlotOnly: true
                        })) {
                            var translation = this.mouseMoveToTranslation(e);
                            target.translatePoint(translation.x, translation.y, this.index);
                            // Update options:
                            target.options.typeOptions
                                .points[this.index].x = target.points[this.index].x;
                            target.options.typeOptions
                                .points[this.index].y = target.points[this.index].y;
                            target.redraw(false);
                        }
                    }
                }
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.crookedLine = CrookedLine;
        /* *
         *
         *  Export Default
         *
         * */

        return CrookedLine;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/ElliottWave.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/Types/CrookedLine.js'], _modules['Core/Utilities.js']], function (Annotation, CrookedLine, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var ElliottWave = /** @class */ (function (_super) {
                __extends(ElliottWave, _super);
            function ElliottWave(chart, options) {
                return _super.call(this, chart, options) || this;
            }
            /* *
             *
             * Functions
             *
             * */
            ElliottWave.prototype.addLabels = function () {
                this.getPointsOptions().forEach(function (point, i) {
                    var typeOptions = this.options.typeOptions,
                        label = this.initLabel(merge(point.label, {
                            text: typeOptions.labels[i],
                            point: function (target) {
                                return target.annotation.points[i];
                        }
                    }), false);
                    point.label = label.options;
                }, this);
            };
            return ElliottWave;
        }(CrookedLine));
        ElliottWave.prototype.defaultOptions = merge(CrookedLine.prototype.defaultOptions, 
        /**
         * An elliott wave annotation.
         *
         * @sample highcharts/annotations-advanced/elliott-wave/
         *         Elliott wave
         *
         * @extends      annotations.crookedLine
         * @product      highstock
         * @optionparent annotations.elliottWave
         */
        {
            typeOptions: {
                /**
                 * @extends   annotations.crookedLine.labelOptions
                 * @apioption annotations.elliottWave.typeOptions.points.label
                 */
                /**
                 * @ignore-option
                 */
                labels: ['(0)', '(A)', '(B)', '(C)', '(D)', '(E)'],
                line: {
                    strokeWidth: 1
                }
            },
            labelOptions: {
                align: 'center',
                allowOverlap: true,
                crop: true,
                overflow: 'none',
                type: 'rect',
                backgroundColor: 'none',
                borderWidth: 0,
                y: -5
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.elliottWave = ElliottWave;
        /* *
         *
         *  Default Export
         *
         * */

        return ElliottWave;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/Tunnel.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/ControlPoint.js'], _modules['Extensions/Annotations/Types/CrookedLine.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Utilities.js']], function (Annotation, ControlPoint, CrookedLine, MockPoint, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        /**
         * @private
         */
        function getSecondCoordinate(p1, p2, x) {
            return (p2.y - p1.y) / (p2.x - p1.x) * (x - p1.x) + p1.y;
        }
        var Tunnel = /** @class */ (function (_super) {
                __extends(Tunnel, _super);
            /* *
             *
             * Constructors
             *
             * */
            function Tunnel(chart, options) {
                return _super.call(this, chart, options) || this;
            }
            /* *
             *
             * Functions
             *
             * */
            Tunnel.prototype.getPointsOptions = function () {
                var pointsOptions = CrookedLine.prototype.getPointsOptions.call(this);
                pointsOptions[2] = this.heightPointOptions(pointsOptions[1]);
                pointsOptions[3] = this.heightPointOptions(pointsOptions[0]);
                return pointsOptions;
            };
            Tunnel.prototype.getControlPointsOptions = function () {
                return this.getPointsOptions().slice(0, 2);
            };
            Tunnel.prototype.heightPointOptions = function (pointOptions) {
                var heightPointOptions = merge(pointOptions),
                    typeOptions = this.options.typeOptions;
                heightPointOptions.y += typeOptions.height;
                return heightPointOptions;
            };
            Tunnel.prototype.addControlPoints = function () {
                CrookedLine.prototype.addControlPoints.call(this);
                var options = this.options,
                    typeOptions = options.typeOptions,
                    controlPoint = new ControlPoint(this.chart,
                    this,
                    merge(options.controlPointOptions,
                    typeOptions.heightControlPoint), 2);
                this.controlPoints.push(controlPoint);
                typeOptions.heightControlPoint = controlPoint.options;
            };
            Tunnel.prototype.addShapes = function () {
                this.addLine();
                this.addBackground();
            };
            Tunnel.prototype.addLine = function () {
                var line = this.initShape(merge(this.options.typeOptions.line, {
                        type: 'path',
                        points: [
                            this.points[0],
                            this.points[1],
                            function (target) {
                                var pointOptions = MockPoint.pointToOptions(target.annotation.points[2]);
                            pointOptions.command = 'M';
                            return pointOptions;
                        },
                        this.points[3]
                    ]
                }), 0);
                this.options.typeOptions.line = line.options;
            };
            Tunnel.prototype.addBackground = function () {
                var background = this.initShape(merge(this.options.typeOptions.background, {
                        type: 'path',
                        points: this.points.slice()
                    }), 1);
                this.options.typeOptions.background = background.options;
            };
            /**
             * Translate start or end ("left" or "right") side of the tunnel.
             * @private
             * @param {number} dx
             * the amount of x translation
             * @param {number} dy
             * the amount of y translation
             * @param {boolean} [end]
             * whether to translate start or end side
             */
            Tunnel.prototype.translateSide = function (dx, dy, end) {
                var topIndex = Number(end),
                    bottomIndex = topIndex === 0 ? 3 : 2;
                this.translatePoint(dx, dy, topIndex);
                this.translatePoint(dx, dy, bottomIndex);
            };
            /**
             * Translate height of the tunnel.
             * @private
             * @param {number} dh
             * the amount of height translation
             */
            Tunnel.prototype.translateHeight = function (dh) {
                this.translatePoint(0, dh, 2);
                this.translatePoint(0, dh, 3);
                this.options.typeOptions.height = this.points[3].y -
                    this.points[0].y;
            };
            return Tunnel;
        }(CrookedLine));
        Tunnel.prototype.defaultOptions = merge(CrookedLine.prototype.defaultOptions, 
        /**
         * A tunnel annotation.
         *
         * @extends annotations.crookedLine
         * @sample highcharts/annotations-advanced/tunnel/
         *         Tunnel
         * @product highstock
         * @optionparent annotations.tunnel
         */
        {
            typeOptions: {
                /**
                 * Background options.
                 *
                 * @type {Object}
                 * @excluding height, point, points, r, type, width, markerEnd,
                 *            markerStart
                 */
                background: {
                    fill: 'rgba(130, 170, 255, 0.4)',
                    strokeWidth: 0
                },
                line: {
                    strokeWidth: 1
                },
                /**
                 * The height of the annotation in terms of yAxis.
                 */
                height: -2,
                /**
                 * Options for the control point which controls
                 * the annotation's height.
                 *
                 * @extends annotations.crookedLine.controlPointOptions
                 * @excluding positioner, events
                 */
                heightControlPoint: {
                    positioner: function (target) {
                        var startXY = MockPoint.pointToPixels(target.points[2]),
                            endXY = MockPoint.pointToPixels(target.points[3]),
                            x = (startXY.x + endXY.x) / 2;
                        return {
                            x: x - this.graphic.width / 2,
                            y: getSecondCoordinate(startXY, endXY, x) -
                                this.graphic.height / 2
                        };
                    },
                    events: {
                        drag: function (e, target) {
                            if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                                visiblePlotOnly: true
                            })) {
                                target.translateHeight(this.mouseMoveToTranslation(e).y);
                                target.redraw(false);
                            }
                        }
                    }
                }
            },
            /**
             * @extends annotations.crookedLine.controlPointOptions
             * @excluding positioner, events
             */
            controlPointOptions: {
                events: {
                    drag: function (e, target) {
                        if (target.chart.isInsidePlot(e.chartX - target.chart.plotLeft, e.chartY - target.chart.plotTop, {
                            visiblePlotOnly: true
                        })) {
                            var translation = this.mouseMoveToTranslation(e);
                            target.translateSide(translation.x, translation.y, !!this.index);
                            target.redraw(false);
                        }
                    }
                }
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.tunnel = Tunnel;
        /* *
         *
         *  Default Export
         *
         * */

        return Tunnel;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/InfinityLine.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/Types/CrookedLine.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Utilities.js']], function (Annotation, CrookedLine, MockPoint, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var InfinityLine = /** @class */ (function (_super) {
                __extends(InfinityLine, _super);
            /* *
             *
             *  Constructors
             *
             * */
            function InfinityLine(chart, options) {
                return _super.call(this, chart, options) || this;
            }
            /* *
             *
             * Static Functions
             *
             * */
            InfinityLine.edgePoint = function (startIndex, endIndex) {
                return function (target) {
                    var annotation = target.annotation,
                        points = annotation.points,
                        type = annotation.options.typeOptions.type;
                    if (type === 'horizontalLine' || type === 'verticalLine') {
                        // Horizontal and vertical lines have only one point,
                        // make a copy of it:
                        points = [
                            points[0],
                            new MockPoint(annotation.chart, points[0].target, {
                                // add 0 or 1 to x or y depending on type
                                x: points[0].x + +(type === 'horizontalLine'),
                                y: points[0].y + +(type === 'verticalLine'),
                                xAxis: points[0].options.xAxis,
                                yAxis: points[0].options.yAxis
                            })
                        ];
                    }
                    return InfinityLine.findEdgePoint(points[startIndex], points[endIndex]);
                };
            };
            InfinityLine.findEdgeCoordinate = function (firstPoint, secondPoint, xOrY, edgePointFirstCoordinate) {
                var xOrYOpposite = xOrY === 'x' ? 'y' : 'x';
                // solves equation for x or y
                // y - y1 = (y2 - y1) / (x2 - x1) * (x - x1)
                return ((secondPoint[xOrY] - firstPoint[xOrY]) *
                    (edgePointFirstCoordinate - firstPoint[xOrYOpposite]) /
                    (secondPoint[xOrYOpposite] - firstPoint[xOrYOpposite]) +
                    firstPoint[xOrY]);
            };
            InfinityLine.findEdgePoint = function (firstPoint, secondPoint) {
                var chart = firstPoint.series.chart,
                    xAxis = firstPoint.series.xAxis,
                    yAxis = secondPoint.series.yAxis,
                    firstPointPixels = MockPoint.pointToPixels(firstPoint),
                    secondPointPixels = MockPoint.pointToPixels(secondPoint),
                    deltaX = secondPointPixels.x - firstPointPixels.x,
                    deltaY = secondPointPixels.y - firstPointPixels.y,
                    xAxisMin = xAxis.left,
                    xAxisMax = xAxisMin + xAxis.width,
                    yAxisMin = yAxis.top,
                    yAxisMax = yAxisMin + yAxis.height,
                    xLimit = deltaX < 0 ? xAxisMin : xAxisMax,
                    yLimit = deltaY < 0 ? yAxisMin : yAxisMax,
                    edgePoint = {
                        x: deltaX === 0 ? firstPointPixels.x : xLimit,
                        y: deltaY === 0 ? firstPointPixels.y : yLimit
                    },
                    edgePointX,
                    edgePointY,
                    swap;
                if (deltaX !== 0 && deltaY !== 0) {
                    edgePointY = InfinityLine.findEdgeCoordinate(firstPointPixels, secondPointPixels, 'y', xLimit);
                    edgePointX = InfinityLine.findEdgeCoordinate(firstPointPixels, secondPointPixels, 'x', yLimit);
                    if (edgePointY >= yAxisMin && edgePointY <= yAxisMax) {
                        edgePoint.x = xLimit;
                        edgePoint.y = edgePointY;
                    }
                    else {
                        edgePoint.x = edgePointX;
                        edgePoint.y = yLimit;
                    }
                }
                edgePoint.x -= chart.plotLeft;
                edgePoint.y -= chart.plotTop;
                if (firstPoint.series.chart.inverted) {
                    swap = edgePoint.x;
                    edgePoint.x = edgePoint.y;
                    edgePoint.y = swap;
                }
                return edgePoint;
            };
            /* *
             *
             *  Functions
             *
             * */
            InfinityLine.prototype.addShapes = function () {
                var typeOptions = this.options.typeOptions,
                    points = [
                        this.points[0],
                        InfinityLine.endEdgePoint
                    ];
                // Be case-insensitive (#15155) e.g.:
                // - line
                // - horizontalLine
                // - verticalLine
                if (typeOptions.type.match(/line/gi)) {
                    points[0] = InfinityLine.startEdgePoint;
                }
                var line = this.initShape(merge(typeOptions.line, {
                        type: 'path',
                        points: points
                    }), 0);
                typeOptions.line = line.options;
            };
            /**
             *
             * Static Properties
             *
             */
            InfinityLine.endEdgePoint = InfinityLine.edgePoint(0, 1);
            InfinityLine.startEdgePoint = InfinityLine.edgePoint(1, 0);
            return InfinityLine;
        }(CrookedLine));
        InfinityLine.prototype.defaultOptions = merge(CrookedLine.prototype.defaultOptions, {});
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.infinityLine = InfinityLine;
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * An infinity line annotation.
         *
         * @sample highcharts/annotations-advanced/infinity-line/
         *         Infinity Line
         *
         * @extends   annotations.crookedLine
         * @product   highstock
         * @apioption annotations.infinityLine
         */
        (''); // keeps doclets above in transpiled file

        return InfinityLine;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/TimeCycles.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/Types/CrookedLine.js'], _modules['Extensions/Annotations/ControlPoint.js'], _modules['Core/Utilities.js']], function (Annotation, CrookedLine, ControlPoint, U) {
        /* *
         *
         *  Authors: Rafal Sebestjanski and Pawel Lysy
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge,
            isNumber = U.isNumber,
            defined = U.defined;
        /**
         * Function to create start of the path.
         * @param {number} x x position of the TimeCycles
         * @param {number} y y position of the TimeCycles
         * @return {string} path
         */
        function getStartingPath(x, y) {
            return ['M', x, y];
        }
        /**
         * Function which generates the path of the halfcircle.
         *
         * @param {number} pixelInterval diameter of the circle in pixels
         * @param {number} numberOfCircles number of cricles
         * @param {number} startX x position of the first circle
         * @param {number} y y position of the bottom of the timeCycles
         * @return {string} path
         *
         */
        function getCirclePath(pixelInterval, numberOfCircles, startX, y) {
            var strToRepeat = function (i) { return [
                    'A',
                    pixelInterval / 2,
                    pixelInterval / 2,
                    0,
                    1,
                    1,
                    startX + i * pixelInterval,
                    y
                ]; };
            var path = [];
            for (var i = 1; i <= numberOfCircles; i++) {
                path.push(strToRepeat(i));
            }
            return path;
        }
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var TimeCycles = /** @class */ (function (_super) {
                __extends(TimeCycles, _super);
            function TimeCycles() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            TimeCycles.prototype.init = function (annotation, options, index) {
                if (defined(options.yAxis)) {
                    options.points.forEach(function (point) {
                        point.yAxis = options.yAxis;
                    });
                }
                if (defined(options.xAxis)) {
                    options.points.forEach(function (point) {
                        point.xAxis = options.xAxis;
                    });
                }
                _super.prototype.init.call(this, annotation, options, index);
            };
            TimeCycles.prototype.setPath = function () {
                this.shapes[0].options.d = this.getPath();
            };
            TimeCycles.prototype.getPath = function () {
                return [getStartingPath(this.startX, this.y)].concat(getCirclePath(this.pixelInterval, this.numberOfCircles, this.startX, this.y));
            };
            TimeCycles.prototype.addShapes = function () {
                var typeOptions = this.options.typeOptions;
                this.setPathProperties();
                var shape = this.initShape(merge(typeOptions.line, {
                        type: 'path',
                        d: this.getPath(),
                        points: this.options.points
                    }), 0);
                typeOptions.line = shape.options;
            };
            TimeCycles.prototype.addControlPoints = function () {
                var _this = this;
                var options = this.options,
                    typeOptions = options.typeOptions;
                options.controlPointOptions.style.cursor = this.chart.inverted ?
                    'ns-resize' :
                    'ew-resize';
                typeOptions.controlPointOptions.forEach(function (option) {
                    var controlPointsOptions = merge(options.controlPointOptions,
                        option);
                    var controlPoint = new ControlPoint(_this.chart,
                        _this,
                        controlPointsOptions, 0);
                    _this.controlPoints.push(controlPoint);
                });
            };
            TimeCycles.prototype.setPathProperties = function () {
                var options = this.options.typeOptions,
                    points = options.points;
                if (!points) {
                    return;
                }
                var point1 = points[0],
                    point2 = points[1],
                    xAxisNumber = options.xAxis || 0,
                    yAxisNumber = options.yAxis || 0,
                    xAxis = this.chart.xAxis[xAxisNumber],
                    yAxis = this.chart.yAxis[yAxisNumber],
                    xValue1 = point1.x,
                    yValue = point1.y,
                    xValue2 = point2.x;
                if (!xValue1 || !xValue2) {
                    return;
                }
                var y = isNumber(yValue) ?
                        yAxis.toPixels(yValue) :
                        yAxis.top + yAxis.height,
                    x = isNumber(xValue1) ? xAxis.toPixels(xValue1) : xAxis.left,
                    x2 = isNumber(xValue2) ? xAxis.toPixels(xValue2) : xAxis.left + 30,
                    xAxisLength = xAxis.len,
                    pixelInterval = Math.round(Math.max(Math.abs(x2 - x), 2)), 
                    // There can be 2 not full circles on the chart, so add 2.
                    numberOfCircles = Math.floor(xAxisLength / pixelInterval) + 2, 
                    // Calculate where the annotation should start drawing relative to
                    // first point.
                    pixelShift = (Math.floor((x - xAxis.left) / pixelInterval) + 1) * pixelInterval;
                this.startX = x - pixelShift;
                this.y = y;
                this.pixelInterval = pixelInterval;
                this.numberOfCircles = numberOfCircles;
            };
            TimeCycles.prototype.redraw = function (animation) {
                this.setPathProperties();
                this.setPath();
                _super.prototype.redraw.call(this, animation);
            };
            return TimeCycles;
        }(CrookedLine));
        TimeCycles.prototype.defaultOptions = merge(CrookedLine.prototype.defaultOptions, {
            typeOptions: {
                controlPointOptions: [{
                        positioner: function (target) {
                            var point = target.points[0],
                                position = target.anchor(point).absolutePosition;
                            return {
                                x: position.x - this.graphic.width / 2,
                                y: target.y - this.graphic.height
                            };
                        },
                        events: {
                            drag: function (e, target) {
                                var position = target.anchor(target.points[0]).absolutePosition;
                                target.translatePoint(e.chartX - position.x, 0, 0);
                                target.redraw(false);
                            }
                        }
                    }, {
                        positioner: function (target) {
                            var point = target.points[1],
                                position = target.anchor(point).absolutePosition;
                            return {
                                x: position.x - this.graphic.width / 2,
                                y: target.y - this.graphic.height
                            };
                        },
                        events: {
                            drag: function (e, target) {
                                var position = target.anchor(target.points[1]).absolutePosition;
                                target.translatePoint(e.chartX - position.x, 0, 1);
                                target.redraw(false);
                            }
                        }
                    }]
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.timeCycles = TimeCycles;
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * The TimeCycles Annotation
         * @sample highcharts/annotations-advanced/time-cycles/
         *     Time Cycles annotation
         *
         * @extends   annotations.crookedLine
         * @product   highstock
         * @exclude  labelOptions
         * @apioption annotations.timeCycles
         */
        /**
         * @exclude   y
         * @product   highstock
         * @apioption annotations.timeCycles.typeOptions.points
         */
        (''); // keeps doclets above in transpiled file

        return TimeCycles;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/Fibonacci.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Extensions/Annotations/Types/Tunnel.js'], _modules['Core/Utilities.js']], function (Annotation, MockPoint, Tunnel, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var createPathDGenerator = function (retracementIndex,
            isBackground) {
                return function () {
                    var annotation = this.annotation;
                if (!annotation.startRetracements || !annotation.endRetracements) {
                    return [];
                }
                var leftTop = this.anchor(annotation.startRetracements[retracementIndex]).absolutePosition,
                    rightTop = this.anchor(annotation.endRetracements[retracementIndex]).absolutePosition,
                    d = [
                        ['M',
                    Math.round(leftTop.x),
                    Math.round(leftTop.y)],
                        ['L',
                    Math.round(rightTop.x),
                    Math.round(rightTop.y)]
                    ],
                    rightBottom,
                    leftBottom;
                if (isBackground) {
                    rightBottom = this.anchor(annotation.endRetracements[retracementIndex - 1]).absolutePosition;
                    leftBottom = this.anchor(annotation.startRetracements[retracementIndex - 1]).absolutePosition;
                    d.push(['L', Math.round(rightBottom.x), Math.round(rightBottom.y)], ['L', Math.round(leftBottom.x), Math.round(leftBottom.y)]);
                }
                return d;
            };
        };
        var Fibonacci = /** @class */ (function (_super) {
                __extends(Fibonacci, _super);
            /* *
             *
             * Constructors
             *
             * */
            function Fibonacci(chart, options) {
                return _super.call(this, chart, options) || this;
            }
            /* *
             *
             * Functions
             *
             * */
            Fibonacci.prototype.linkPoints = function () {
                _super.prototype.linkPoints.call(this);
                this.linkRetracementsPoints();
                return;
            };
            Fibonacci.prototype.linkRetracementsPoints = function () {
                var points = this.points,
                    startDiff = points[0].y - points[3].y,
                    endDiff = points[1].y - points[2].y,
                    startX = points[0].x,
                    endX = points[1].x;
                Fibonacci.levels.forEach(function (level, i) {
                    var startRetracement = points[0].y - startDiff * level,
                        endRetracement = points[1].y - endDiff * level;
                    this.startRetracements = this.startRetracements || [];
                    this.endRetracements = this.endRetracements || [];
                    this.linkRetracementPoint(i, startX, startRetracement, this.startRetracements);
                    this.linkRetracementPoint(i, endX, endRetracement, this.endRetracements);
                }, this);
            };
            Fibonacci.prototype.linkRetracementPoint = function (pointIndex, x, y, retracements) {
                var point = retracements[pointIndex],
                    typeOptions = this.options.typeOptions;
                if (!point) {
                    retracements[pointIndex] = new MockPoint(this.chart, this, {
                        x: x,
                        y: y,
                        xAxis: typeOptions.xAxis,
                        yAxis: typeOptions.yAxis
                    });
                }
                else {
                    point.options.x = x;
                    point.options.y = y;
                    point.refresh();
                }
            };
            Fibonacci.prototype.addShapes = function () {
                Fibonacci.levels.forEach(function (_level, i) {
                    var _a = this.options.typeOptions,
                        backgroundColors = _a.backgroundColors,
                        lineColor = _a.lineColor,
                        lineColors = _a.lineColors;
                    this.initShape({
                        type: 'path',
                        d: createPathDGenerator(i),
                        stroke: lineColors[i] || lineColor
                    }, i);
                    if (i > 0) {
                        this.initShape({
                            type: 'path',
                            fill: backgroundColors[i - 1],
                            strokeWidth: 0,
                            d: createPathDGenerator(i, true)
                        });
                    }
                }, this);
            };
            Fibonacci.prototype.addLabels = function () {
                Fibonacci.levels.forEach(function (level, i) {
                    var options = this.options.typeOptions,
                        label = this.initLabel(merge(options.labels[i], {
                            point: function (target) {
                                var point = MockPoint.pointToOptions(target.annotation.startRetracements[i]);
                            return point;
                        },
                        text: level.toString()
                    }));
                    options.labels[i] = label.options;
                }, this);
            };
            /* *
             *
             * Static properties
             *
             * */
            Fibonacci.levels = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1];
            return Fibonacci;
        }(Tunnel));
        Fibonacci.prototype.defaultOptions = merge(Tunnel.prototype.defaultOptions, 
        /**
         * A fibonacci annotation.
         *
         * @sample highcharts/annotations-advanced/fibonacci/
         *         Fibonacci
         *
         * @extends      annotations.crookedLine
         * @product      highstock
         * @optionparent annotations.fibonacci
         */
        {
            typeOptions: {
                /**
                 * The height of the fibonacci in terms of yAxis.
                 */
                height: 2,
                /**
                 * An array of background colors:
                 * Default to:
                 * ```
                 * [
                 * 'rgba(130, 170, 255, 0.4)',
                 * 'rgba(139, 191, 216, 0.4)',
                 * 'rgba(150, 216, 192, 0.4)',
                 * 'rgba(156, 229, 161, 0.4)',
                 * 'rgba(162, 241, 130, 0.4)',
                 * 'rgba(169, 255, 101, 0.4)'
                 * ]
                 * ```
                 */
                backgroundColors: [
                    'rgba(130, 170, 255, 0.4)',
                    'rgba(139, 191, 216, 0.4)',
                    'rgba(150, 216, 192, 0.4)',
                    'rgba(156, 229, 161, 0.4)',
                    'rgba(162, 241, 130, 0.4)',
                    'rgba(169, 255, 101, 0.4)'
                ],
                /**
                 * The color of line.
                 */
                lineColor: "#999999" /* neutralColor40 */,
                /**
                 * An array of colors for the lines.
                 */
                lineColors: [],
                /**
                 * An array with options for the labels.
                 *
                 * @type      {Array<*>}
                 * @extends   annotations.crookedLine.labelOptions
                 * @apioption annotations.fibonacci.typeOptions.labels
                 */
                labels: []
            },
            labelOptions: {
                allowOverlap: true,
                align: 'right',
                backgroundColor: 'none',
                borderWidth: 0,
                crop: false,
                overflow: 'none',
                shape: 'rect',
                style: {
                    color: 'grey'
                },
                verticalAlign: 'middle',
                y: 0
            }
        });
        Annotation.types.fibonacci = Fibonacci;
        /* *
         *
         *  Default Export
         *
         * */

        return Fibonacci;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/FibonacciTimeZones.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/ControlPoint.js'], _modules['Extensions/Annotations/Types/CrookedLine.js'], _modules['Extensions/Annotations/Types/InfinityLine.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Utilities.js']], function (Annotation, ControlPoint, CrookedLine, InfinityLine, MockPoint, U) {
        /* *
         *
         *  Author: Rafal Sebestjanski
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* *
         *
         *  Class
         *
         * */
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var FibonacciTimeZones = /** @class */ (function (_super) {
                __extends(FibonacciTimeZones, _super);
            function FibonacciTimeZones() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            /* *
             *
             *  Functions
             *
             * */
            /*
            Method taken (and slightly changed) from the InfinityLine annotation.

            It uses x coordinate to create two mock points on the same x. Then,
            it uses some logic from InfinityLine to find equation of the line passing
            through our two points and, using that equation, it finds and returns
            the coordinates of where the line intersects the plot area edges.

            This is being done for each fibonacci time zone line.


                    this point here is found
                       |
                       v
             |---------*--------------------------------------------------------|
             |                                                                  |
             |                                                                  |
             |                                                                  |
             |                                                                  |
             |         *   copy of the primary point                            |
             |                                                                  |
             |         *   primary point (e.g. the one given in options)        |
             |                                                                  |
             |---------*--------------------------------------------------------|
                    and this point here is found (intersection with the plot area edge)

            */
            FibonacciTimeZones.prototype.edgePoint = function (startIndex, endIndex, fibonacciIndex) {
                return function (target) {
                    var chart = target.annotation.chart,
                        plotLeftOrTop = chart.inverted ? chart.plotTop : chart.plotLeft;
                    var points = target.annotation.points;
                    var xAxis = points[0].series.xAxis, 
                        // Distance between the two first lines in pixels
                        deltaX = points.length > 1 ?
                            points[1].plotX - points[0].plotX : 0, 
                        // firstLine.x + fibb * offset
                        x = xAxis.toValue(points[0].plotX + plotLeftOrTop + fibonacciIndex * deltaX);
                    // We need 2 mock points with the same x coordinate, different y
                    points = [
                        new MockPoint(chart, points[0].target, {
                            x: x,
                            y: 0,
                            xAxis: points[0].options.xAxis,
                            yAxis: points[0].options.yAxis
                        }),
                        new MockPoint(chart, points[0].target, {
                            x: x,
                            y: 1,
                            xAxis: points[0].options.xAxis,
                            yAxis: points[0].options.yAxis
                        })
                    ];
                    return InfinityLine.findEdgePoint(points[startIndex], points[endIndex]);
                };
            };
            FibonacciTimeZones.prototype.addShapes = function () {
                var numberOfLines = 11;
                var fibb = 1,
                    nextFibb = 1;
                for (var i = 0; i < numberOfLines; i++) {
                    // The fibb variable equals to 1 twice - correct it in the first
                    // iteration so the lines don't overlap
                    var correctedFibb = !i ? 0 : fibb,
                        points = [
                            this.edgePoint(1, 0,
                        correctedFibb),
                            this.edgePoint(0, 1,
                        correctedFibb)
                        ];
                    // Calculate fibbonacci
                    nextFibb = fibb + nextFibb;
                    fibb = nextFibb - fibb;
                    // Save the second line for the control point
                    if (i === 1) {
                        this.secondLineEdgePoints = [points[0], points[1]];
                    }
                    this.initShape(merge(this.options.typeOptions.line, {
                        type: 'path',
                        points: points
                    }), i // shape's index. Can be found in annotation.shapes[i].index
                    );
                }
            };
            FibonacciTimeZones.prototype.addControlPoints = function () {
                var options = this.options,
                    typeOptions = options.typeOptions,
                    controlPoint = new ControlPoint(this.chart,
                    this,
                    merge(options.controlPointOptions,
                    typeOptions.controlPointOptions), 0);
                this.controlPoints.push(controlPoint);
                typeOptions.controlPointOptions = controlPoint.options;
            };
            return FibonacciTimeZones;
        }(CrookedLine));
        FibonacciTimeZones.prototype.defaultOptions = merge(CrookedLine.prototype.defaultOptions, {
            typeOptions: {
                // Options for showing in popup edit
                line: {
                    /**
                     * The color of the lines.
                     *
                     * @type      {string}
                     * @since 9.3.0
                     * @default   'rgba(0, 0, 0, 0.75)'
                     * @apioption annotations.fibonacciTimeZones.typeOptions.line.stroke
                     */
                    stroke: 'rgba(0, 0, 0, 0.75)',
                    /**
                     * The width of the lines.
                     *
                     * @type      {number}
                     * @since 9.3.0
                     * @default   1
                     * @apioption annotations.fibonacciTimeZones.typeOptions.line.strokeWidth
                     */
                    strokeWidth: 1,
                    // Don't inherit fill (don't display in popup edit)
                    fill: void 0
                },
                controlPointOptions: {
                    positioner: function () {
                        var _a;
                        // The control point is in the middle of the second line
                        var target = this.target,
                            graphic = this.graphic,
                            edgePoints = target.secondLineEdgePoints,
                            args = { annotation: target },
                            firstEdgePointY = edgePoints[0](args).y,
                            secondEdgePointY = edgePoints[1](args).y,
                            plotLeft = this.chart.plotLeft,
                            plotTop = this.chart.plotTop;
                        var x = edgePoints[0](args).x,
                            y = (firstEdgePointY + secondEdgePointY) / 2;
                        if (this.chart.inverted) {
                            _a = [y, x], x = _a[0], y = _a[1];
                        }
                        return {
                            x: plotLeft + x - graphic.width / 2,
                            y: plotTop + y - graphic.height / 2
                        };
                    },
                    events: {
                        drag: function (e, target) {
                            var isInsidePlot = target.chart.isInsidePlot(e.chartX - target.chart.plotLeft,
                                e.chartY - target.chart.plotTop, {
                                    visiblePlotOnly: true
                                });
                            if (isInsidePlot) {
                                var translation = this.mouseMoveToTranslation(e);
                                target.translatePoint(translation.x, 0, 1);
                                target.redraw(false);
                            }
                        }
                    }
                }
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.fibonacciTimeZones = FibonacciTimeZones;
        /* *
         *
         *  Default Export
         *
         * */
        /* *
         *
         *  API Declarations
         *
         * */
        /**
         * The Fibonacci Time Zones annotation.
         *
         * @sample highcharts/annotations-advanced/fibonacci-time-zones/
         *         Fibonacci Time Zones
         *
         * @extends   annotations.crookedLine
         * @since 9.3.0
         * @product   highstock
         * @apioption annotations.fibonacciTimeZones
         */
        /**
         * @exclude   y
         * @since 9.3.0
         * @product   highstock
         * @apioption annotations.fibonacciTimeZones.typeOptions.points
         */
        (''); // keeps doclets above in transpiled file

        return FibonacciTimeZones;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/Pitchfork.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/Types/InfinityLine.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Utilities.js']], function (Annotation, InfinityLine, MockPoint, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var Pitchfork = /** @class */ (function (_super) {
                __extends(Pitchfork, _super);
            /* *
             *
             * Constructors
             *
             * */
            function Pitchfork(chart, options) {
                return _super.call(this, chart, options) || this;
            }
            /* *
             *
             * Static Functions
             *
             * */
            Pitchfork.outerLineEdgePoint = function (firstPointIndex) {
                return function (target) {
                    var annotation = target.annotation,
                        points = annotation.points;
                    return Pitchfork.findEdgePoint(points[firstPointIndex], points[0], new MockPoint(annotation.chart, target, annotation.midPointOptions()));
                };
            };
            Pitchfork.findEdgePoint = function (point, firstAnglePoint, secondAnglePoint) {
                var angle = Math.atan2((secondAnglePoint.plotY -
                        firstAnglePoint.plotY),
                    secondAnglePoint.plotX - firstAnglePoint.plotX),
                    distance = 1e7;
                return {
                    x: point.plotX + distance * Math.cos(angle),
                    y: point.plotY + distance * Math.sin(angle)
                };
            };
            Pitchfork.middleLineEdgePoint = function (target) {
                var annotation = target.annotation,
                    points = annotation.points;
                return InfinityLine.findEdgePoint(points[0], new MockPoint(annotation.chart, target, annotation.midPointOptions()));
            };
            /* *
             *
             *  Functions
             *
             * */
            Pitchfork.prototype.midPointOptions = function () {
                var points = this.points;
                return {
                    x: (points[1].x + points[2].x) / 2,
                    y: (points[1].y + points[2].y) / 2,
                    xAxis: points[0].series.xAxis,
                    yAxis: points[0].series.yAxis
                };
            };
            Pitchfork.prototype.addShapes = function () {
                this.addLines();
                this.addBackgrounds();
            };
            Pitchfork.prototype.addLines = function () {
                this.initShape({
                    type: 'path',
                    points: [
                        this.points[0],
                        Pitchfork.middleLineEdgePoint
                    ]
                }, 0);
                this.initShape({
                    type: 'path',
                    points: [
                        this.points[1],
                        Pitchfork.topLineEdgePoint
                    ]
                }, 1);
                this.initShape({
                    type: 'path',
                    points: [
                        this.points[2],
                        Pitchfork.bottomLineEdgePoint
                    ]
                }, 2);
            };
            Pitchfork.prototype.addBackgrounds = function () {
                var shapes = this.shapes,
                    typeOptions = this.options.typeOptions;
                var innerBackground = this.initShape(merge(typeOptions.innerBackground, {
                        type: 'path',
                        points: [
                            function (target) {
                                var annotation = target.annotation,
                    points = annotation.points,
                    midPointOptions = annotation.midPointOptions();
                            return {
                                x: (points[1].x + midPointOptions.x) / 2,
                                y: (points[1].y + midPointOptions.y) / 2,
                                xAxis: midPointOptions.xAxis,
                                yAxis: midPointOptions.yAxis
                            };
                        },
                        shapes[1].points[1],
                        shapes[2].points[1],
                        function (target) {
                            var annotation = target.annotation,
                                points = annotation.points,
                                midPointOptions = annotation.midPointOptions();
                            return {
                                x: (midPointOptions.x + points[2].x) / 2,
                                y: (midPointOptions.y + points[2].y) / 2,
                                xAxis: midPointOptions.xAxis,
                                yAxis: midPointOptions.yAxis
                            };
                        }
                    ]
                }), 3);
                var outerBackground = this.initShape(merge(typeOptions.outerBackground, {
                        type: 'path',
                        points: [
                            this.points[1],
                            shapes[1].points[1],
                            shapes[2].points[1],
                            this.points[2]
                        ]
                    }), 4);
                typeOptions.innerBackground = innerBackground.options;
                typeOptions.outerBackground = outerBackground.options;
            };
            /**
             *
             * Static Properties
             *
             */
            Pitchfork.topLineEdgePoint = Pitchfork.outerLineEdgePoint(1);
            Pitchfork.bottomLineEdgePoint = Pitchfork.outerLineEdgePoint(0);
            return Pitchfork;
        }(InfinityLine));
        Pitchfork.prototype.defaultOptions = merge(InfinityLine.prototype.defaultOptions, 
        /**
         * A pitchfork annotation.
         *
         * @sample highcharts/annotations-advanced/pitchfork/
         *         Pitchfork
         *
         * @extends      annotations.infinityLine
         * @product      highstock
         * @optionparent annotations.pitchfork
         */
        {
            typeOptions: {
                /**
                 * Inner background options.
                 *
                 * @extends   annotations.crookedLine.shapeOptions
                 * @excluding height, r, type, width
                 */
                innerBackground: {
                    fill: 'rgba(130, 170, 255, 0.4)',
                    strokeWidth: 0
                },
                /**
                 * Outer background options.
                 *
                 * @extends   annotations.crookedLine.shapeOptions
                 * @excluding height, r, type, width
                 */
                outerBackground: {
                    fill: 'rgba(156, 229, 161, 0.4)',
                    strokeWidth: 0
                }
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.pitchfork = Pitchfork;
        /* *
         *
         *  Default Export
         *
         * */

        return Pitchfork;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/VerticalLine.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/MockPoint.js'], _modules['Core/Utilities.js']], function (Annotation, MockPoint, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var merge = U.merge,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var VerticalLine = /** @class */ (function (_super) {
                __extends(VerticalLine, _super);
            /* *
             *
             *  Constructors
             *
             * */
            function VerticalLine(chart, userOptions) {
                return _super.call(this, chart, userOptions) || this;
            }
            /* *
             *
             *  Static Functions
             *
             * */
            VerticalLine.connectorFirstPoint = function (target) {
                var annotation = target.annotation,
                    chart = annotation.chart,
                    inverted = chart.inverted,
                    point = annotation.points[0],
                    left = pick(point.series.yAxis && point.series.yAxis.left, 0),
                    top = pick(point.series.yAxis && point.series.yAxis.top, 0),
                    offset = annotation.options.typeOptions.label.offset,
                    y = MockPoint.pointToPixels(point,
                    true)[inverted ? 'x' : 'y'];
                return {
                    x: point.x,
                    xAxis: point.series.xAxis,
                    y: y + offset +
                        (inverted ? (left - chart.plotLeft) : (top - chart.plotTop))
                };
            };
            VerticalLine.connectorSecondPoint = function (target) {
                var annotation = target.annotation,
                    chart = annotation.chart,
                    inverted = chart.inverted,
                    typeOptions = annotation.options.typeOptions,
                    point = annotation.points[0],
                    left = pick(point.series.yAxis && point.series.yAxis.left, 0),
                    top = pick(point.series.yAxis && point.series.yAxis.top, 0),
                    yOffset = typeOptions.yOffset,
                    y = MockPoint.pointToPixels(point,
                    true)[inverted ? 'x' : 'y'];
                if (typeOptions.label.offset < 0) {
                    yOffset *= -1;
                }
                return {
                    x: point.x,
                    xAxis: point.series.xAxis,
                    y: y + yOffset +
                        (inverted ? (left - chart.plotLeft) : (top - chart.plotTop))
                };
            };
            /* *
             *
             *  Functions
             *
             * */
            VerticalLine.prototype.getPointsOptions = function () {
                return [this.options.typeOptions.point];
            };
            VerticalLine.prototype.addShapes = function () {
                var typeOptions = this.options.typeOptions,
                    connector = this.initShape(merge(typeOptions.connector, {
                        type: 'path',
                        points: [
                            VerticalLine.connectorFirstPoint,
                            VerticalLine.connectorSecondPoint
                        ]
                    }), 0);
                typeOptions.connector = connector.options;
            };
            VerticalLine.prototype.addLabels = function () {
                var typeOptions = this.options.typeOptions, labelOptions = typeOptions.label, x = 0, y = labelOptions.offset, verticalAlign = labelOptions.offset < 0 ? 'bottom' : 'top', align = 'center';
                if (this.chart.inverted) {
                    x = labelOptions.offset;
                    y = 0;
                    verticalAlign = 'middle';
                    align = labelOptions.offset < 0 ? 'right' : 'left';
                }
                var label = this.initLabel(merge(labelOptions, {
                        verticalAlign: verticalAlign,
                        align: align,
                        x: x,
                        y: y
                    }));
                typeOptions.label = label.options;
            };
            return VerticalLine;
        }(Annotation));
        VerticalLine.prototype.defaultOptions = merge(Annotation.prototype.defaultOptions, 
        /**
         * A vertical line annotation.
         *
         * @sample highcharts/annotations-advanced/vertical-line/
         *         Vertical line
         *
         * @extends      annotations.crookedLine
         * @excluding    labels, shapes, controlPointOptions
         * @product      highstock
         * @optionparent annotations.verticalLine
         */
        {
            typeOptions: {
                /**
                 * @ignore
                 */
                yOffset: 10,
                /**
                 * Label options.
                 *
                 * @extends annotations.crookedLine.labelOptions
                 */
                label: {
                    offset: -40,
                    point: function (target) {
                        return target.annotation.points[0];
                    },
                    allowOverlap: true,
                    backgroundColor: 'none',
                    borderWidth: 0,
                    crop: true,
                    overflow: 'none',
                    shape: 'rect',
                    text: '{y:.2f}'
                },
                /**
                 * Connector options.
                 *
                 * @extends   annotations.crookedLine.shapeOptions
                 * @excluding height, r, type, width
                 */
                connector: {
                    strokeWidth: 1,
                    markerEnd: 'arrow'
                }
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.verticalLine = VerticalLine;
        /* *
         *
         *  Default Export
         *
         * */

        return VerticalLine;
    });
    _registerModule(_modules, 'Extensions/Annotations/Types/Measure.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Extensions/Annotations/ControlPoint.js'], _modules['Core/Utilities.js']], function (Annotation, ControlPoint, U) {
        /* *
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var __extends = (this && this.__extends) || (function () {
                var extendStatics = function (d,
            b) {
                    extendStatics = Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array && function (d,
            b) { d.__proto__ = b; }) ||
                        function (d,
            b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
                return extendStatics(d, b);
            };
            return function (d, b) {
                extendStatics(d, b);
                function __() { this.constructor = d; }
                d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
            };
        })();
        var defined = U.defined,
            extend = U.extend,
            isNumber = U.isNumber,
            merge = U.merge,
            pick = U.pick;
        /* eslint-disable no-invalid-this, valid-jsdoc */
        var Measure = /** @class */ (function (_super) {
                __extends(Measure, _super);
            /* *
             *
             *  Constructors
             *
             * */
            function Measure(chart, userOptions) {
                return _super.call(this, chart, userOptions) || this;
            }
            /* *
             *
             *  Functions
             *
             * */
            /**
             * Init annotation object.
             * @private
             */
            Measure.prototype.init = function (annotationOrChart, userOptions, index) {
                Annotation.prototype.init.call(this, annotationOrChart, userOptions, index);
                this.offsetX = 0;
                this.offsetY = 0;
                this.resizeX = 0;
                this.resizeY = 0;
                Measure.calculations.init.call(this);
                this.addValues();
                this.addShapes();
            };
            /**
             * Overrides default setter to get axes from typeOptions.
             * @private
             */
            Measure.prototype.setClipAxes = function () {
                this.clipXAxis = this.chart.xAxis[this.options.typeOptions.xAxis];
                this.clipYAxis = this.chart.yAxis[this.options.typeOptions.yAxis];
            };
            /**
             * Get measure points configuration objects.
             * @private
             */
            Measure.prototype.pointsOptions = function () {
                return this.options.points;
            };
            /**
             * Get points configuration objects for shapes.
             * @private
             */
            Measure.prototype.shapePointsOptions = function () {
                var options = this.options.typeOptions,
                    xAxis = options.xAxis,
                    yAxis = options.yAxis;
                return [
                    {
                        x: this.xAxisMin,
                        y: this.yAxisMin,
                        xAxis: xAxis,
                        yAxis: yAxis
                    },
                    {
                        x: this.xAxisMax,
                        y: this.yAxisMin,
                        xAxis: xAxis,
                        yAxis: yAxis
                    },
                    {
                        x: this.xAxisMax,
                        y: this.yAxisMax,
                        xAxis: xAxis,
                        yAxis: yAxis
                    },
                    {
                        x: this.xAxisMin,
                        y: this.yAxisMax,
                        xAxis: xAxis,
                        yAxis: yAxis
                    }
                ];
            };
            Measure.prototype.addControlPoints = function () {
                var inverted = this.chart.inverted,
                    options = this.options.controlPointOptions;
                var selectType = this.options.typeOptions.selectType,
                    controlPoint;
                if (!defined(this.userOptions.controlPointOptions &&
                    this.userOptions.controlPointOptions.style.cursor)) {
                    if (selectType === 'x') {
                        options.style.cursor = inverted ? 'ns-resize' : 'ew-resize';
                    }
                    else if (selectType === 'y') {
                        options.style.cursor = inverted ? 'ew-resize' : 'ns-resize';
                    }
                }
                controlPoint = new ControlPoint(this.chart, this, this.options.controlPointOptions, 0);
                this.controlPoints.push(controlPoint);
                // add extra controlPoint for horizontal and vertical range
                if (selectType !== 'xy') {
                    controlPoint = new ControlPoint(this.chart, this, this.options.controlPointOptions, 1);
                    this.controlPoints.push(controlPoint);
                }
            };
            /**
             * Add label with calculated values (min, max, average, bins).
             * @private
             * @param {boolean} [resize]
             * The flag for resize shape
             */
            Measure.prototype.addValues = function (resize) {
                var typeOptions = this.options.typeOptions,
                    formatter = typeOptions.label.formatter;
                // set xAxisMin, xAxisMax, yAxisMin, yAxisMax
                Measure.calculations.recalculate.call(this, resize);
                if (!typeOptions.label.enabled) {
                    return;
                }
                if (this.labels.length > 0) {
                    this.labels[0].text = ((formatter && formatter.call(this)) ||
                        Measure.calculations.defaultFormatter.call(this));
                }
                else {
                    this.initLabel(extend({
                        shape: 'rect',
                        backgroundColor: 'none',
                        color: 'black',
                        borderWidth: 0,
                        dashStyle: 'Dash',
                        overflow: 'allow',
                        align: 'left',
                        y: 0,
                        x: 0,
                        verticalAlign: 'top',
                        crop: true,
                        xAxis: 0,
                        yAxis: 0,
                        point: function (target) {
                            var annotation = target.annotation,
                                options = target.options;
                            return {
                                x: annotation.xAxisMin,
                                y: annotation.yAxisMin,
                                xAxis: pick(typeOptions.xAxis, options.xAxis),
                                yAxis: pick(typeOptions.yAxis, options.yAxis)
                            };
                        },
                        text: (formatter && formatter.call(this)) ||
                            Measure.calculations.defaultFormatter.call(this)
                    }, typeOptions.label), void 0);
                }
            };
            /**
             * Crosshair, background (rect).
             * @private
             */
            Measure.prototype.addShapes = function () {
                this.addCrosshairs();
                this.addBackground();
            };
            /**
             * Add background shape.
             * @private
             */
            Measure.prototype.addBackground = function () {
                var shapePoints = this.shapePointsOptions();
                if (typeof shapePoints[0].x === 'undefined') {
                    return;
                }
                this.initShape(extend({
                    type: 'path',
                    points: this.shapePointsOptions()
                }, this.options.typeOptions.background), 2);
            };
            /**
             * Add internal crosshair shapes (on top and bottom).
             * @private
             */
            Measure.prototype.addCrosshairs = function () {
                var chart = this.chart,
                    options = this.options.typeOptions,
                    point = this.options.typeOptions.point,
                    xAxis = chart.xAxis[options.xAxis],
                    yAxis = chart.yAxis[options.yAxis],
                    inverted = chart.inverted,
                    xAxisMin = xAxis.toPixels(this.xAxisMin),
                    xAxisMax = xAxis.toPixels(this.xAxisMax),
                    yAxisMin = yAxis.toPixels(this.yAxisMin),
                    yAxisMax = yAxis.toPixels(this.yAxisMax),
                    defaultOptions = {
                        point: point,
                        type: 'path'
                    },
                    pathH = [],
                    pathV = [],
                    crosshairOptionsX,
                    crosshairOptionsY,
                    temp;
                if (inverted) {
                    temp = xAxisMin;
                    xAxisMin = yAxisMin;
                    yAxisMin = temp;
                    temp = xAxisMax;
                    xAxisMax = yAxisMax;
                    yAxisMax = temp;
                }
                // horizontal line
                if (options.crosshairX.enabled) {
                    pathH = [[
                            'M',
                            xAxisMin,
                            yAxisMin + ((yAxisMax - yAxisMin) / 2)
                        ], [
                            'L',
                            xAxisMax,
                            yAxisMin + ((yAxisMax - yAxisMin) / 2)
                        ]];
                }
                // vertical line
                if (options.crosshairY.enabled) {
                    pathV = [[
                            'M',
                            xAxisMin + ((xAxisMax - xAxisMin) / 2),
                            yAxisMin
                        ], [
                            'L',
                            xAxisMin + ((xAxisMax - xAxisMin) / 2),
                            yAxisMax
                        ]];
                }
                // Update existed crosshair
                if (this.shapes.length > 0) {
                    this.shapes[0].options.d = pathH;
                    this.shapes[1].options.d = pathV;
                }
                else {
                    // Add new crosshairs
                    crosshairOptionsX = merge(defaultOptions, options.crosshairX);
                    crosshairOptionsY = merge(defaultOptions, options.crosshairY);
                    this.initShape(extend({ d: pathH }, crosshairOptionsX), 0);
                    this.initShape(extend({ d: pathV }, crosshairOptionsY), 1);
                }
            };
            Measure.prototype.onDrag = function (e) {
                var translation = this.mouseMoveToTranslation(e), selectType = this.options.typeOptions.selectType, x = selectType === 'y' ? 0 : translation.x, y = selectType === 'x' ? 0 : translation.y;
                this.translate(x, y);
                this.offsetX += x;
                this.offsetY += y;
                // animation, resize, setStartPoints
                this.redraw(false, false, true);
            };
            /**
             * Translate start or end ("left" or "right") side of the measure.
             * Update start points (startXMin, startXMax, startYMin, startYMax)
             * @private
             * @param {number} dx
             * the amount of x translation
             * @param {number} dy
             * the amount of y translation
             * @param {number} cpIndex
             * index of control point
             * @param {Highcharts.AnnotationDraggableValue} selectType
             * x / y / xy
             */
            Measure.prototype.resize = function (dx, dy, cpIndex, selectType) {
                // background shape
                var bckShape = this.shapes[2];
                if (selectType === 'x') {
                    if (cpIndex === 0) {
                        bckShape.translatePoint(dx, 0, 0);
                        bckShape.translatePoint(dx, dy, 3);
                    }
                    else {
                        bckShape.translatePoint(dx, 0, 1);
                        bckShape.translatePoint(dx, dy, 2);
                    }
                }
                else if (selectType === 'y') {
                    if (cpIndex === 0) {
                        bckShape.translatePoint(0, dy, 0);
                        bckShape.translatePoint(0, dy, 1);
                    }
                    else {
                        bckShape.translatePoint(0, dy, 2);
                        bckShape.translatePoint(0, dy, 3);
                    }
                }
                else {
                    bckShape.translatePoint(dx, 0, 1);
                    bckShape.translatePoint(dx, dy, 2);
                    bckShape.translatePoint(0, dy, 3);
                }
                Measure.calculations.updateStartPoints
                    .call(this, false, true, cpIndex, dx, dy);
                this.options.typeOptions.background.height = Math.abs(this.startYMax - this.startYMin);
                this.options.typeOptions.background.width = Math.abs(this.startXMax - this.startXMin);
            };
            /**
             * Redraw event which render elements and update start points if needed.
             * @private
             * @param {boolean} animation
             * @param {boolean} [resize]
             * flag if resized
             * @param {boolean} [setStartPoints]
             * update position of start points
             */
            Measure.prototype.redraw = function (animation, resize, setStartPoints) {
                this.linkPoints();
                if (!this.graphic) {
                    this.render();
                }
                if (setStartPoints) {
                    Measure.calculations.updateStartPoints.call(this, true, false);
                }
                // #11174 - clipBox was not recalculate during resize / redraw
                if (this.clipRect) {
                    this.clipRect.animate(this.getClipBox());
                }
                this.addValues(resize);
                this.addCrosshairs();
                this.redrawItems(this.shapes, animation);
                this.redrawItems(this.labels, animation);
                // redraw control point to run positioner
                this.controlPoints.forEach(function (controlPoint) {
                    controlPoint.redraw();
                });
            };
            Measure.prototype.translate = function (dx, dy) {
                this.shapes.forEach(function (item) {
                    item.translate(dx, dy);
                });
                this.options.typeOptions.point.x = this.startXMin;
                this.options.typeOptions.point.y = this.startYMin;
            };
            /* *
             *
             *  Static Functions
             *
             * */
            Measure.calculations = {
                /**
                 * Set starting points
                 * @private
                 */
                init: function () {
                    var options = this.options.typeOptions,
                        chart = this.chart,
                        getPointPos = Measure.calculations.getPointPos,
                        inverted = chart.inverted,
                        xAxis = chart.xAxis[options.xAxis],
                        yAxis = chart.yAxis[options.yAxis],
                        bck = options.background,
                        width = inverted ? bck.height : bck.width,
                        height = inverted ? bck.width : bck.height,
                        selectType = options.selectType,
                        top = inverted ? xAxis.left : yAxis.top, // #13664
                        left = inverted ? yAxis.top : xAxis.left; // #13664
                        this.startXMin = options.point.x;
                    this.startYMin = options.point.y;
                    if (isNumber(width)) {
                        this.startXMax = this.startXMin + width;
                    }
                    else {
                        this.startXMax = getPointPos(xAxis, this.startXMin, parseFloat(width));
                    }
                    if (isNumber(height)) {
                        this.startYMax = this.startYMin - height;
                    }
                    else {
                        this.startYMax = getPointPos(yAxis, this.startYMin, parseFloat(height));
                    }
                    // x / y selection type
                    if (selectType === 'x') {
                        this.startYMin = yAxis.toValue(top);
                        this.startYMax = yAxis.toValue(top + yAxis.len);
                    }
                    else if (selectType === 'y') {
                        this.startXMin = xAxis.toValue(left);
                        this.startXMax = xAxis.toValue(left + xAxis.len);
                    }
                },
                /**
                 * Set current xAxisMin, xAxisMax, yAxisMin, yAxisMax.
                 * Calculations of measure values (min, max, average, bins).
                 * @private
                 * @param {boolean} [resize]
                 * Flag if shape is resized.
                 */
                recalculate: function (resize) {
                    var calc = Measure.calculations,
                        options = this.options.typeOptions,
                        xAxis = this.chart.xAxis[options.xAxis],
                        yAxis = this.chart.yAxis[options.yAxis],
                        getPointPos = Measure.calculations.getPointPos,
                        offsetX = this.offsetX,
                        offsetY = this.offsetY;
                    this.xAxisMin = getPointPos(xAxis, this.startXMin, offsetX);
                    this.xAxisMax = getPointPos(xAxis, this.startXMax, offsetX);
                    this.yAxisMin = getPointPos(yAxis, this.startYMin, offsetY);
                    this.yAxisMax = getPointPos(yAxis, this.startYMax, offsetY);
                    this.min = calc.min.call(this);
                    this.max = calc.max.call(this);
                    this.average = calc.average.call(this);
                    this.bins = calc.bins.call(this);
                    if (resize) {
                        this.resize(0, 0);
                    }
                },
                /**
                 * Set current xAxisMin, xAxisMax, yAxisMin, yAxisMax.
                 * Calculations of measure values (min, max, average, bins).
                 * @private
                 * @param {Highcharts.Axis} axis
                 * X or y axis reference
                 * @param {number} value
                 * Point's value (x or y)
                 * @param {number} offset
                 * Amount of pixels
                 */
                getPointPos: function (axis, value, offset) {
                    return axis.toValue(axis.toPixels(value) + offset);
                },
                /**
                 * Update position of start points
                 * (startXMin, startXMax, startYMin, startYMax)
                 * @private
                 * @param {boolean} redraw
                 * Flag if shape is redraw
                 * @param {boolean} resize
                 * Flag if shape is resized
                 * @param {number} cpIndex
                 * Index of controlPoint
                 */
                updateStartPoints: function (redraw, resize, cpIndex, dx, dy) {
                    var options = this.options.typeOptions,
                        selectType = options.selectType,
                        xAxis = this.chart.xAxis[options.xAxis],
                        yAxis = this.chart.yAxis[options.yAxis],
                        getPointPos = Measure.calculations.getPointPos,
                        startXMin = this.startXMin,
                        startXMax = this.startXMax,
                        startYMin = this.startYMin,
                        startYMax = this.startYMax,
                        offsetX = this.offsetX,
                        offsetY = this.offsetY;
                    if (resize) {
                        if (selectType === 'x') {
                            if (cpIndex === 0) {
                                this.startXMin = getPointPos(xAxis, startXMin, dx);
                            }
                            else {
                                this.startXMax = getPointPos(xAxis, startXMax, dx);
                            }
                        }
                        else if (selectType === 'y') {
                            if (cpIndex === 0) {
                                this.startYMin = getPointPos(yAxis, startYMin, dy);
                            }
                            else {
                                this.startYMax = getPointPos(yAxis, startYMax, dy);
                            }
                        }
                        else {
                            this.startXMax = getPointPos(xAxis, startXMax, dx);
                            this.startYMax = getPointPos(yAxis, startYMax, dy);
                        }
                    }
                    if (redraw) {
                        this.startXMin = getPointPos(xAxis, startXMin, offsetX);
                        this.startXMax = getPointPos(xAxis, startXMax, offsetX);
                        this.startYMin = getPointPos(yAxis, startYMin, offsetY);
                        this.startYMax = getPointPos(yAxis, startYMax, offsetY);
                        this.offsetX = 0;
                        this.offsetY = 0;
                    }
                },
                /**
                 * Default formatter of label's content
                 * @private
                 */
                defaultFormatter: function () {
                    return 'Min: ' + this.min +
                        '<br>Max: ' + this.max +
                        '<br>Average: ' + this.average +
                        '<br>Bins: ' + this.bins;
                },
                /**
                 * Set values for xAxisMin, xAxisMax, yAxisMin, yAxisMax, also
                 * when chart is inverted
                 * @private
                 */
                getExtremes: function (xAxisMin, xAxisMax, yAxisMin, yAxisMax) {
                    return {
                        xAxisMin: Math.min(xAxisMax, xAxisMin),
                        xAxisMax: Math.max(xAxisMax, xAxisMin),
                        yAxisMin: Math.min(yAxisMax, yAxisMin),
                        yAxisMax: Math.max(yAxisMax, yAxisMin)
                    };
                },
                /**
                 * Definitions of calculations (min, max, average, bins)
                 * @private
                 */
                min: function () {
                    var min = Infinity,
                        series = this.chart.series,
                        ext = Measure.calculations.getExtremes(this.xAxisMin,
                        this.xAxisMax,
                        this.yAxisMin,
                        this.yAxisMax),
                        isCalculated = false; // to avoid Infinity in formatter
                        series.forEach(function (serie) {
                            if (serie.visible &&
                                serie.options.id !== 'highcharts-navigator-series') {
                                serie.points.forEach(function (point) {
                                    if (!point.isNull &&
                                        point.y < min &&
                                        point.x > ext.xAxisMin &&
                                        point.x <= ext.xAxisMax &&
                                        point.y > ext.yAxisMin &&
                                        point.y <= ext.yAxisMax) {
                                        min = point.y;
                                    isCalculated = true;
                                }
                            });
                        }
                    });
                    if (!isCalculated) {
                        min = '';
                    }
                    return min;
                },
                max: function () {
                    var max = -Infinity,
                        series = this.chart.series,
                        ext = Measure.calculations.getExtremes(this.xAxisMin,
                        this.xAxisMax,
                        this.yAxisMin,
                        this.yAxisMax),
                        isCalculated = false; // to avoid Infinity in formatter
                        series.forEach(function (serie) {
                            if (serie.visible &&
                                serie.options.id !== 'highcharts-navigator-series') {
                                serie.points.forEach(function (point) {
                                    if (!point.isNull &&
                                        point.y > max &&
                                        point.x > ext.xAxisMin &&
                                        point.x <= ext.xAxisMax &&
                                        point.y > ext.yAxisMin &&
                                        point.y <= ext.yAxisMax) {
                                        max = point.y;
                                    isCalculated = true;
                                }
                            });
                        }
                    });
                    if (!isCalculated) {
                        max = '';
                    }
                    return max;
                },
                average: function () {
                    var average = '';
                    if (this.max !== '' && this.min !== '') {
                        average = (this.max + this.min) / 2;
                    }
                    return average;
                },
                bins: function () {
                    var bins = 0,
                        series = this.chart.series,
                        ext = Measure.calculations.getExtremes(this.xAxisMin,
                        this.xAxisMax,
                        this.yAxisMin,
                        this.yAxisMax),
                        isCalculated = false; // to avoid Infinity in formatter
                        series.forEach(function (serie) {
                            if (serie.visible &&
                                serie.options.id !== 'highcharts-navigator-series') {
                                serie.points.forEach(function (point) {
                                    if (!point.isNull &&
                                        point.x > ext.xAxisMin &&
                                        point.x <= ext.xAxisMax &&
                                        point.y > ext.yAxisMin &&
                                        point.y <= ext.yAxisMax) {
                                        bins++;
                                    isCalculated = true;
                                }
                            });
                        }
                    });
                    if (!isCalculated) {
                        bins = '';
                    }
                    return bins;
                }
            };
            return Measure;
        }(Annotation));
        Measure.prototype.defaultOptions = merge(Annotation.prototype.defaultOptions, 
        /**
         * A measure annotation.
         *
         * @extends annotations.crookedLine
         * @excluding labels, labelOptions, shapes, shapeOptions
         * @sample highcharts/annotations-advanced/measure/
         *         Measure
         * @product highstock
         * @optionparent annotations.measure
         */
        {
            typeOptions: {
                /**
                 * Decides in what dimensions the user can resize by dragging the
                 * mouse. Can be one of x, y or xy.
                 */
                selectType: 'xy',
                /**
                 * This number defines which xAxis the point is connected to.
                 * It refers to either the axis id or the index of the axis
                 * in the xAxis array.
                 */
                xAxis: 0,
                /**
                 * This number defines which yAxis the point is connected to.
                 * It refers to either the axis id or the index of the axis
                 * in the yAxis array.
                 */
                yAxis: 0,
                background: {
                    /**
                     * The color of the rectangle.
                     */
                    fill: 'rgba(130, 170, 255, 0.4)',
                    /**
                     * The width of border.
                     */
                    strokeWidth: 0,
                    /**
                     * The color of border.
                     */
                    stroke: void 0
                },
                /**
                 * Configure a crosshair that is horizontally placed in middle of
                 * rectangle.
                 *
                 */
                crosshairX: {
                    /**
                     * Enable or disable the horizontal crosshair.
                     *
                     */
                    enabled: true,
                    /**
                     * The Z index of the crosshair in annotation.
                     */
                    zIndex: 6,
                    /**
                     * The dash or dot style of the crosshair's line. For possible
                     * values, see
                     * [this demonstration](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/).
                     *
                     * @type    {Highcharts.DashStyleValue}
                     * @default Dash
                     */
                    dashStyle: 'Dash',
                    /**
                     * The marker-end defines the arrowhead that will be drawn
                     * at the final vertex of the given crosshair's path.
                     *
                     * @type       {string}
                     * @default    arrow
                     */
                    markerEnd: 'arrow'
                },
                /**
                 * Configure a crosshair that is vertically placed in middle of
                 * rectangle.
                 */
                crosshairY: {
                    /**
                     * Enable or disable the vertical crosshair.
                     *
                     */
                    enabled: true,
                    /**
                     * The Z index of the crosshair in annotation.
                     */
                    zIndex: 6,
                    /**
                     * The dash or dot style of the crosshair's line. For possible
                     * values, see [this demonstration](https://jsfiddle.net/gh/get/library/pure/highcharts/highcharts/tree/master/samples/highcharts/plotoptions/series-dashstyle-all/).
                     *
                     * @type      {Highcharts.DashStyleValue}
                     * @default   Dash
                     * @apioption annotations.measure.typeOptions.crosshairY.dashStyle
                     *
                     */
                    dashStyle: 'Dash',
                    /**
                     * The marker-end defines the arrowhead that will be drawn
                     * at the final vertex of the given crosshair's path.
                     *
                     * @type       {string}
                     * @default    arrow
                     * @validvalue ["none", "arrow"]
                     *
                     */
                    markerEnd: 'arrow'
                },
                label: {
                    /**
                     * Enable or disable the label text (min, max, average,
                     * bins values).
                     *
                     * Defaults to true.
                     */
                    enabled: true,
                    /**
                     * CSS styles for the measure label.
                     *
                     * @type    {Highcharts.CSSObject}
                     * @default {"color": "#666666", "fontSize": "11px"}
                     */
                    style: {
                        fontSize: '11px',
                        color: '#666666'
                    },
                    /**
                     * Formatter function for the label text.
                     *
                     * Available data are:
                     *
                     * <table>
                     *
                     * <tbody>
                     *
                     * <tr>
                     *
                     * <td>`this.min`</td>
                     *
                     * <td>The mininimum value of the points in the selected
                     * range.</td>
                     *
                     * </tr>
                     *
                     * <tr>
                     *
                     * <td>`this.max`</td>
                     *
                     * <td>The maximum value of the points in the selected
                     * range.</td>
                     *
                     * </tr>
                     *
                     * <tr>
                     *
                     * <td>`this.average`</td>
                     *
                     * <td>The average value of the points in the selected
                     * range.</td>
                     *
                     * </tr>
                     *
                     * <tr>
                     *
                     * <td>`this.bins`</td>
                     *
                     * <td>The amount of the points in the selected range.</td>
                     *
                     * </tr>
                     *
                     * </table>
                     *
                     * @type {Function}
                     *
                     */
                    formatter: void 0
                }
            },
            controlPointOptions: {
                positioner: function (target) {
                    var cpIndex = this.index,
                        chart = target.chart,
                        options = target.options,
                        typeOptions = options.typeOptions,
                        selectType = typeOptions.selectType,
                        controlPointOptions = options.controlPointOptions,
                        inverted = chart.inverted,
                        xAxis = chart.xAxis[typeOptions.xAxis],
                        yAxis = chart.yAxis[typeOptions.yAxis],
                        targetX = target.xAxisMax,
                        targetY = target.yAxisMax,
                        ext = Measure.calculations.getExtremes(target.xAxisMin,
                        target.xAxisMax,
                        target.yAxisMin,
                        target.yAxisMax),
                        x,
                        y;
                    if (selectType === 'x') {
                        targetY = (ext.yAxisMax - ext.yAxisMin) / 2;
                        // first control point
                        if (cpIndex === 0) {
                            targetX = target.xAxisMin;
                        }
                    }
                    if (selectType === 'y') {
                        targetX = ext.xAxisMin +
                            ((ext.xAxisMax - ext.xAxisMin) / 2);
                        // first control point
                        if (cpIndex === 0) {
                            targetY = target.yAxisMin;
                        }
                    }
                    if (inverted) {
                        x = yAxis.toPixels(targetY);
                        y = xAxis.toPixels(targetX);
                    }
                    else {
                        x = xAxis.toPixels(targetX);
                        y = yAxis.toPixels(targetY);
                    }
                    return {
                        x: x - (controlPointOptions.width / 2),
                        y: y - (controlPointOptions.height / 2)
                    };
                },
                events: {
                    drag: function (e, target) {
                        var translation = this.mouseMoveToTranslation(e), selectType = target.options.typeOptions.selectType, index = this.index, x = selectType === 'y' ? 0 : translation.x, y = selectType === 'x' ? 0 : translation.y;
                        target.resize(x, y, index, selectType);
                        target.resizeX += x;
                        target.resizeY += y;
                        target.redraw(false, true);
                    }
                }
            }
        });
        /* *
         *
         *  Registry
         *
         * */
        Annotation.types.measure = Measure;
        /* *
         *
         *  Default Export
         *
         * */

        return Measure;
    });
    _registerModule(_modules, 'Core/Chart/ChartNavigationComposition.js', [], function () {
        /**
         *
         *  (c) 2010-2021 Paweł Fus
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        /* *
         *
         *  Composition
         *
         * */
        var ChartNavigationComposition;
        (function (ChartNavigationComposition) {
            /* *
             *
             *  Declarations
             *
             * */
            /* *
             *
             *  Functions
             *
             * */
            /* eslint-disable valid-jsdoc */
            /**
             * @private
             */
            function compose(chart) {
                if (!chart.navigation) {
                    chart.navigation = new Additions(chart);
                }
                return chart;
            }
            ChartNavigationComposition.compose = compose;
            /* *
             *
             *  Class
             *
             * */
            /**
             * Initializes `chart.navigation` object which delegates `update()` methods
             * to all other common classes (used in exporting and navigationBindings).
             * @private
             */
            var Additions = /** @class */ (function () {
                    /* *
                     *
                     *  Constructor
                     *
                     * */
                    function Additions(chart) {
                        this.updates = [];
                    this.chart = chart;
                }
                /* *
                 *
                 *  Functions
                 *
                 * */
                /**
                 * Registers an `update()` method in the `chart.navigation` object.
                 *
                 * @private
                 * @param {UpdateFunction} updateFn
                 * The `update()` method that will be called in `chart.update()`.
                 */
                Additions.prototype.addUpdate = function (updateFn) {
                    this.chart.navigation.updates.push(updateFn);
                };
                /**
                 * @private
                 */
                Additions.prototype.update = function (options, redraw) {
                    var _this = this;
                    this.updates.forEach(function (updateFn) {
                        updateFn.call(_this.chart, options, redraw);
                    });
                };
                return Additions;
            }());
            ChartNavigationComposition.Additions = Additions;
        })(ChartNavigationComposition || (ChartNavigationComposition = {}));
        /* *
         *
         *  Default Export
         *
         * */

        return ChartNavigationComposition;
    });
    _registerModule(_modules, 'Extensions/Annotations/NavigationBindings.js', [_modules['Extensions/Annotations/Annotations.js'], _modules['Core/Chart/Chart.js'], _modules['Core/Chart/ChartNavigationComposition.js'], _modules['Core/FormatUtilities.js'], _modules['Core/Globals.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Utilities.js']], function (Annotation, Chart, ChartNavigationComposition, F, H, D, U) {
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
                    xAxis = isNumber(options.xAxis) && chart.xAxis[options.xAxis],
                    yAxis = isNumber(options.yAxis) && chart.yAxis[options.yAxis];
                if (xAxis && yAxis) {
                    var x = xAxis.toValue(event[xAxis.horiz ? 'chartX' : 'chartY']), y = yAxis.toValue(event[yAxis.horiz ? 'chartX' : 'chartY']), width = x - options.point.x, height = options.point.y - y;
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
                    var extremes = coord.axis.getExtremes(),
                        axisMin = extremes.min,
                        axisMax = extremes.max, 
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
                        if (bindings &&
                            bindings.button.className
                                .indexOf('highcharts-disabled-btn') === -1) {
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
                ChartNavigationComposition
                    .compose(this.chart).navigation
                    .addUpdate(function (options) {
                    navigation.update(options);
                });
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
             * @param {Object} events
             *        Events passed down from bindings (`init`, `start`, `step`, `end`)
             *
             * @param {Highcharts.PointerEventObject} clickEvent
             *        Browser's click event
             */
            NavigationBindings.prototype.bindingsButtonClick = function (button, events, clickEvent) {
                var navigation = this,
                    chart = navigation.chart,
                    svgContainer = chart.renderer.boxWrapper;
                var shouldEventBeFired = true;
                if (navigation.selectedButtonElement) {
                    if (navigation.selectedButtonElement.classList === button.classList) {
                        shouldEventBeFired = false;
                    }
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
                if (shouldEventBeFired) {
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
                }
                else {
                    chart.stockTools && chart.stockTools.toggleButtonAciveClass(button);
                    svgContainer.removeClass(PREFIX + 'draw-mode');
                    navigation.nextEvent = false;
                    navigation.mouseMoveEvent = false;
                    navigation.selectedButton = null;
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
                    activeAnnotation = navigation.activeAnnotation,
                    selectedButton = navigation.selectedButton,
                    svgContainer = chart.renderer.boxWrapper;
                if (activeAnnotation) {
                    // Click outside popups, should close them and deselect the
                    // annotation
                    if (!activeAnnotation.cancelClick && // #15729
                        !clickEvent.activeAnnotation &&
                        // Element could be removed in the child action, e.g. button
                        clickEvent.target.parentNode &&
                        // TO DO: Polyfill for IE11?
                        !closestPolyfill(clickEvent.target, '.' + PREFIX + 'popup')) {
                        fireEvent(navigation, 'closePopup');
                    }
                    else if (activeAnnotation.cancelClick) {
                        // Reset cancelClick after the other event handlers have run
                        setTimeout(function () {
                            activeAnnotation.cancelClick = false;
                        }, 0);
                    }
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
                            navigation.mouseMoveEvent = navigation.nextEvent = selectedButton.steps[navigation.stepIndex];
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
                 * @param {Object} parentEditables
                 *        Editables from NavigationBindings.annotationsEditable
                 *
                 * @param {Object} parent
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
                                traverse(nestedOption, nestedKey, key === 0 ?
                                    parentEditables :
                                    nestedEditables[key], nextParent);
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
             * @param {Highcharts.HTMLDOMElement} container
             * Container that event is bound to.
             *
             * @param {global.Event} event
             * Browser's event.
             *
             * @return {Array<Array<string, Highcharts.HTMLDOMElement>>}
             * Array of class names with corresponding elements
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
             * @return {Object}
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
                ellipse: ['shapes'],
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
                rectangle: ['crosshairX', 'crosshairY', 'labelOptions'],
                ellipse: ['labelOptions'],
                circle: ['labelOptions']
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
                                    typeOptions.crosshairY.enabled = (typeOptions.crosshairY
                                        .strokeWidth !== 0);
                                    typeOptions.crosshairX.enabled = (typeOptions.crosshairX
                                        .strokeWidth !== 0);
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
                        ellipse: 'Ellipse',
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
                 *
                 * @sample {highstock} stock/stocktools/stocktools-thresholds
                 *               Custom bindings
                 * @sample {highcharts} highcharts/annotations/bindings/
                 *               Simple binding
                 * @sample {highcharts} highcharts/annotations/bindings-custom-annotation/
                 *               Custom annotation binding
                 *
                 * @since        7.0.0
                 * @requires     modules/annotations
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
                            }, navigation.annotationsOptions, navigation.bindings.circleAnnotation
                                .annotationsOptions));
                        },
                        /** @ignore-option */
                        steps: [
                            function (e, annotation) {
                                var mockPointOpts = annotation.options.shapes[0]
                                        .point,
                                    distance;
                                if (isNumber(mockPointOpts.xAxis) &&
                                    isNumber(mockPointOpts.yAxis)) {
                                    var inverted = this.chart.inverted,
                                        x = this.chart.xAxis[mockPointOpts.xAxis]
                                            .toPixels(mockPointOpts.x),
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
                    ellipseAnnotation: {
                        className: 'highcharts-ellipse-annotation',
                        start: function (e) {
                            var coords = this.chart.pointer.getCoordinates(e),
                                coordsX = this.utils.getAssignedAxis(coords.xAxis),
                                coordsY = this.utils.getAssignedAxis(coords.yAxis),
                                navigation = this.chart.options.navigation;
                            if (!coordsX || !coordsY) {
                                return;
                            }
                            return this.chart.addAnnotation(merge({
                                langKey: 'ellipse',
                                type: 'basicAnnotation',
                                shapes: [
                                    {
                                        type: 'ellipse',
                                        xAxis: coordsX.axis.options.index,
                                        yAxis: coordsY.axis.options.index,
                                        points: [{
                                                x: coordsX.value,
                                                y: coordsY.value
                                            }, {
                                                x: coordsX.value,
                                                y: coordsY.value
                                            }],
                                        ry: 1
                                    }
                                ]
                            }, navigation.annotationsOptions, navigation.bindings.ellipseAnnotation
                                .annotationOptions));
                        },
                        steps: [
                            function (e, annotation) {
                                var target = annotation.shapes[0],
                                    position = target.getAbsolutePosition(target.points[1]);
                                target.translatePoint(e.chartX - position.x, e.chartY - position.y, 1);
                                target.redraw(false);
                            },
                            function (e, annotation) {
                                var target = annotation.shapes[0],
                                    position = target.getAbsolutePosition(target.points[0]),
                                    position2 = target.getAbsolutePosition(target.points[1]),
                                    newR = target.getDistanceFromLine(position,
                                    position2,
                                    e.chartX,
                                    e.chartY),
                                    yAxis = target.getYAxis(),
                                    newRY = Math.abs(yAxis.toValue(0) - yAxis.toValue(newR));
                                target.setYRadius(newRY);
                                target.redraw(false);
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
                                            { xAxis: xAxis, yAxis: yAxis, x: x, y: y },
                                            { command: 'Z' }
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
                 * @default   https://code.highcharts.com/10.0.0/gfx/stock-icons/
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
                 * @requires     modules/annotations
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
                        // Get the HTML element coresponding to the className taken
                        // from StockToolsBindings.
                        var buttonNode = chart.navigationBindings.container[0]
                                .querySelectorAll('.' + key);
                        if (buttonNode) {
                            for (var i = 0; i < buttonNode.length; i++) {
                                var button = buttonNode[i],
                                    cls = button.className;
                                if (value.noDataState === 'normal') {
                                    // If button has noDataState: 'normal', and has
                                    // disabledClassName, remove this className.
                                    if (cls.indexOf(disabledClassName) !== -1) {
                                        button.classList.remove(disabledClassName);
                                    }
                                }
                                else if (!buttonsEnabled_1) {
                                    if (cls.indexOf(disabledClassName) === -1) {
                                        button.className += ' ' + disabledClassName;
                                    }
                                }
                                else {
                                    // Enable all buttons by deleting the className.
                                    if (cls.indexOf(disabledClassName) !== -1) {
                                        button.classList.remove(disabledClassName);
                                    }
                                }
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
    _registerModule(_modules, 'Extensions/Annotations/Popup.js', [_modules['Core/Renderer/HTML/AST.js'], _modules['Core/Globals.js'], _modules['Extensions/Annotations/NavigationBindings.js'], _modules['Core/DefaultOptions.js'], _modules['Core/Pointer.js'], _modules['Core/Utilities.js']], function (AST, H, NavigationBindings, D, Pointer, U) {
        /* *
         *
         *  Popup generator for Stock tools
         *
         *  (c) 2009-2021 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         *  !!!!!!! SOURCE GETS TRANSPILED BY TYPESCRIPT. EDIT TS FILE ONLY. !!!!!!!
         *
         * */
        var doc = H.doc,
            isFirefox = H.isFirefox;
        var getOptions = D.getOptions;
        var addEvent = U.addEvent,
            createElement = U.createElement,
            defined = U.defined,
            fireEvent = U.fireEvent,
            isArray = U.isArray,
            isObject = U.isObject,
            objectEach = U.objectEach,
            pick = U.pick,
            stableSort = U.stableSort,
            wrap = U.wrap;
        var indexFilter = /\d/g, PREFIX = 'highcharts-', A = 'a', DIV = 'div', INPUT = 'input', LABEL = 'label', BUTTON = 'button', SELECT = 'select', OPTION = 'option', SPAN = 'span', UL = 'ul', LI = 'li', H3 = 'h3';
        /**
         * Enum for properties which should have dropdown list.
         * @private
         */
        var DropdownProperties;
        (function (DropdownProperties) {
            DropdownProperties[DropdownProperties["params.algorithm"] = 0] = "params.algorithm";
            DropdownProperties[DropdownProperties["params.average"] = 1] = "params.average";
        })(DropdownProperties || (DropdownProperties = {}));
        /**
         * List of available algorithms for the specific indicator.
         * @private
         */
        var dropdownParameters = {
                'algorithm-pivotpoints': ['standard', 'fibonacci', 'camarilla'],
                'average-disparityindex': ['sma', 'ema', 'dema', 'tema', 'wma']
            };
        /* eslint-disable no-invalid-this, valid-jsdoc */
        // onContainerMouseDown blocks internal popup events, due to e.preventDefault.
        // Related issue #4606
        wrap(Pointer.prototype, 'onContainerMouseDown', function (proceed, e) {
            // elements is not in popup
            if (!this.inClass(e.target, PREFIX + 'popup')) {
                proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        });
        H.Popup = function (parentDiv, iconsURL, chart) {
            this.init(parentDiv, iconsURL, chart);
        };
        H.Popup.prototype = {
            /**
             * Initialize the popup. Create base div and add close button.
             * @private
             * @param {Highcharts.HTMLDOMElement} parentDiv
             * Container where popup should be placed
             * @param {string} iconsURL
             * Icon URL
             */
            init: function (parentDiv, iconsURL, chart) {
                this.chart = chart;
                // create popup div
                this.container = createElement(DIV, {
                    className: PREFIX + 'popup highcharts-no-tooltip'
                }, void 0, parentDiv);
                addEvent(this.container, 'mousedown', function () {
                    var activeAnnotation = chart &&
                            chart.navigationBindings &&
                            chart.navigationBindings.activeAnnotation;
                    if (activeAnnotation) {
                        activeAnnotation.cancelClick = true;
                        var unbind_1 = addEvent(H.doc, 'click',
                            function () {
                                setTimeout(function () {
                                    activeAnnotation.cancelClick = false;
                            }, 0);
                            unbind_1();
                        });
                    }
                });
                this.lang = this.getLangpack();
                this.iconsURL = iconsURL;
                // add close button
                this.addCloseBtn();
            },
            /**
             * Create HTML element and attach click event (close popup).
             * @private
             */
            addCloseBtn: function () {
                var _self = this,
                    closeBtn;
                var iconsURL = this.iconsURL;
                // create close popup btn
                closeBtn = createElement(DIV, {
                    className: PREFIX + 'popup-close'
                }, void 0, this.container);
                closeBtn.style['background-image'] = 'url(' +
                    (iconsURL.match(/png|svg|jpeg|jpg|gif/ig) ?
                        iconsURL : iconsURL + 'close.svg') + ')';
                ['click', 'touchstart'].forEach(function (eventName) {
                    addEvent(closeBtn, eventName, function () {
                        if (_self.chart) {
                            fireEvent(_self.chart.navigationBindings, 'closePopup');
                        }
                        else {
                            _self.closePopup();
                        }
                    });
                });
            },
            /**
             * Create two columns (divs) in HTML.
             * @private
             * @param {Highcharts.HTMLDOMElement} container
             * Container of columns
             * @return {Highcharts.Dictionary<Highcharts.HTMLDOMElement>}
             * Reference to two HTML columns (lhsCol, rhsCol)
             */
            addColsContainer: function (container) {
                var rhsCol,
                    lhsCol;
                // left column
                lhsCol = createElement(DIV, {
                    className: PREFIX + 'popup-lhs-col'
                }, void 0, container);
                // right column
                rhsCol = createElement(DIV, {
                    className: PREFIX + 'popup-rhs-col'
                }, void 0, container);
                // wrapper content
                createElement(DIV, {
                    className: PREFIX + 'popup-rhs-col-wrapper'
                }, void 0, rhsCol);
                return {
                    lhsCol: lhsCol,
                    rhsCol: rhsCol
                };
            },
            /**
             * Create input with label.
             *
             * @private
             *
             * @param {string} option
             *        Chain of fields i.e params.styles.fontSize separeted by the dot.
             *
             * @param {string} indicatorType
             *        Type of the indicator i.e. sma, ema...
             *
             * @param {HTMLDOMElement} parentDiv
             *        HTML parent element.
             *
             * @param {Highcharts.InputAttributes} inputAttributes
             *        Attributes of the input.
             *
             * @return {HTMLInputElement}
             *         Return created input element.
             */
            addInput: function (option, indicatorType, parentDiv, inputAttributes) {
                var optionParamList = option.split('.'), optionName = optionParamList[optionParamList.length - 1], lang = this.lang, inputName = PREFIX + indicatorType + '-' + pick(inputAttributes.htmlFor, optionName);
                var input;
                if (!inputName.match(indexFilter)) {
                    // add label
                    createElement(LABEL, {
                        htmlFor: inputName,
                        className: inputAttributes.labelClassName
                    }, void 0, parentDiv).appendChild(doc.createTextNode(lang[optionName] || optionName));
                }
                // add input
                input = createElement(INPUT, {
                    name: inputName,
                    value: inputAttributes.value,
                    type: inputAttributes.type,
                    className: PREFIX + 'popup-field'
                }, void 0, parentDiv);
                input.setAttribute(PREFIX + 'data-name', option);
                return input;
            },
            /**
             * Create button.
             * @private
             * @param {Highcharts.HTMLDOMElement} parentDiv
             * Container where elements should be added
             * @param {string} label
             * Text placed as button label
             * @param {string} type
             * add | edit | remove
             * @param {Function} callback
             * On click callback
             * @param {Highcharts.HTMLDOMElement} fieldsDiv
             * Container where inputs are generated
             * @return {Highcharts.HTMLDOMElement}
             * HTML button
             */
            addButton: function (parentDiv, label, type, fieldsDiv, callback) {
                var _self = this,
                    closePopup = this.closePopup,
                    getFields = this.getFields,
                    button;
                button = createElement(BUTTON, void 0, void 0, parentDiv);
                button.appendChild(doc.createTextNode(label));
                if (callback) {
                    ['click', 'touchstart'].forEach(function (eventName) {
                        addEvent(button, eventName, function () {
                            closePopup.call(_self);
                            return callback(getFields(fieldsDiv, type));
                        });
                    });
                }
                return button;
            },
            /**
             * Get values from all inputs and selections then create JSON.
             *
             * @private
             *
             * @param {Highcharts.HTMLDOMElement} parentDiv
             * The container where inputs and selections are created.
             *
             * @param {string} type
             * Type of the popup bookmark (add|edit|remove).
             */
            getFields: function (parentDiv, type) {
                var inputList = Array.prototype.slice.call(parentDiv.querySelectorAll(INPUT)), selectList = Array.prototype.slice.call(parentDiv.querySelectorAll(SELECT)), optionSeries = '#' + PREFIX + 'select-series > option:checked', optionVolume = '#' + PREFIX + 'select-volume > option:checked', linkedTo = parentDiv.querySelectorAll(optionSeries)[0], volumeTo = parentDiv.querySelectorAll(optionVolume)[0];
                var fieldsOutput;
                fieldsOutput = {
                    actionType: type,
                    linkedTo: linkedTo && linkedTo.getAttribute('value') || '',
                    fields: {}
                };
                inputList.forEach(function (input) {
                    var param = input.getAttribute(PREFIX + 'data-name'), seriesId = input.getAttribute(PREFIX + 'data-series-id');
                    // params
                    if (seriesId) {
                        fieldsOutput.seriesId = input.value;
                    }
                    else if (param) {
                        fieldsOutput.fields[param] = input.value;
                    }
                    else {
                        // type like sma / ema
                        fieldsOutput.type = input.value;
                    }
                });
                selectList.forEach(function (select) {
                    var id = select.id;
                    // Get inputs only for the parameters, not for series and volume.
                    if (id !== PREFIX + 'select-series' &&
                        id !== PREFIX + 'select-volume') {
                        var parameter = id.split('highcharts-select-')[1];
                        fieldsOutput.fields[parameter] = select.value;
                    }
                });
                if (volumeTo) {
                    fieldsOutput.fields['params.volumeSeriesID'] = volumeTo
                        .getAttribute('value') || '';
                }
                return fieldsOutput;
            },
            /**
             * Reset content of the current popup and show.
             * @private
             */
            showPopup: function () {
                var popupDiv = this.container,
                    toolbarClass = PREFIX + 'annotation-toolbar',
                    popupCloseBtn = popupDiv
                        .querySelectorAll('.' + PREFIX + 'popup-close')[0];
                this.formType = void 0;
                // reset content
                popupDiv.innerHTML = AST.emptyHTML;
                // reset toolbar styles if exists
                if (popupDiv.className.indexOf(toolbarClass) >= 0) {
                    popupDiv.classList.remove(toolbarClass);
                    // reset toolbar inline styles
                    popupDiv.removeAttribute('style');
                }
                // add close button
                popupDiv.appendChild(popupCloseBtn);
                popupDiv.style.display = 'block';
                popupDiv.style.height = '';
            },
            /**
             * Hide popup.
             * @private
             */
            closePopup: function () {
                var container = pick(this.popup && this.popup.container,
                    this.container);
                container.style.display = 'none';
            },
            /**
             * Create content and show popup.
             * @private
             * @param {string} - type of popup i.e indicators
             * @param {Highcharts.Chart} - chart
             * @param {Highcharts.AnnotationsOptions} - options
             * @param {Function} - on click callback
             */
            showForm: function (type, chart, options, callback) {
                if (!chart) {
                    return;
                }
                this.popup = chart.navigationBindings.popup;
                // show blank popup
                this.showPopup();
                // indicator form
                if (type === 'indicators') {
                    this.indicators.addForm.call(this, chart, options, callback);
                }
                // annotation small toolbar
                if (type === 'annotation-toolbar') {
                    this.annotations.addToolbar.call(this, chart, options, callback);
                }
                // annotation edit form
                if (type === 'annotation-edit') {
                    this.annotations.addForm.call(this, chart, options, callback);
                }
                // flags form - add / edit
                if (type === 'flag') {
                    this.annotations.addForm.call(this, chart, options, callback, true);
                }
                this.formType = type;
                // Explicit height is needed to make inner elements scrollable
                this.container.style.height = this.container.offsetHeight + 'px';
            },
            /**
             * Return lang definitions for popup.
             * @private
             * @return {Highcharts.Dictionary<string>} - elements translations.
             */
            getLangpack: function () {
                return getOptions().lang.navigation.popup;
            },
            annotations: {
                /**
                 * Create annotation simple form. It contains two buttons
                 * (edit / remove) and text label.
                 * @private
                 * @param {Highcharts.Chart} - chart
                 * @param {Highcharts.AnnotationsOptions} - options
                 * @param {Function} - on click callback
                 */
                addToolbar: function (chart, options, callback) {
                    var _self = this,
                        lang = this.lang,
                        popupDiv = this.popup.container,
                        showForm = this.showForm,
                        toolbarClass = PREFIX + 'annotation-toolbar',
                        button;
                    // set small size
                    if (popupDiv.className.indexOf(toolbarClass) === -1) {
                        popupDiv.className += ' ' + toolbarClass;
                    }
                    // set position
                    if (chart) {
                        popupDiv.style.top = chart.plotTop + 10 + 'px';
                    }
                    // create label
                    createElement(SPAN, void 0, void 0, popupDiv).appendChild(doc.createTextNode(pick(
                    // Advanced annotations:
                    lang[options.langKey] || options.langKey, 
                    // Basic shapes:
                    options.shapes && options.shapes[0].type)));
                    // add buttons
                    button = this.addButton(popupDiv, lang.removeButton || 'remove', 'remove', popupDiv, callback);
                    button.className += ' ' + PREFIX + 'annotation-remove-button';
                    button.style['background-image'] = 'url(' +
                        this.iconsURL + 'destroy.svg)';
                    button = this.addButton(popupDiv, lang.editButton || 'edit', 'edit', popupDiv, function () {
                        showForm.call(_self, 'annotation-edit', chart, options, callback);
                    });
                    button.className += ' ' + PREFIX + 'annotation-edit-button';
                    button.style['background-image'] = 'url(' +
                        this.iconsURL + 'edit.svg)';
                },
                /**
                 * Create annotation simple form.
                 * It contains fields with param names.
                 * @private
                 * @param {Highcharts.Chart} chart
                 * Chart
                 * @param {Object} options
                 * Options
                 * @param {Function} callback
                 * On click callback
                 * @param {boolean} [isInit]
                 * If it is a form declared for init annotation
                 */
                addForm: function (chart, options, callback, isInit) {
                    var popupDiv = this.popup.container,
                        lang = this.lang,
                        bottomRow,
                        lhsCol;
                    if (!chart) {
                        return;
                    }
                    // create title of annotations
                    lhsCol = createElement('h2', {
                        className: PREFIX + 'popup-main-title'
                    }, void 0, popupDiv);
                    lhsCol.appendChild(doc.createTextNode(lang[options.langKey] || options.langKey || ''));
                    // left column
                    lhsCol = createElement(DIV, {
                        className: (PREFIX + 'popup-lhs-col ' + PREFIX + 'popup-lhs-full')
                    }, void 0, popupDiv);
                    bottomRow = createElement(DIV, {
                        className: PREFIX + 'popup-bottom-row'
                    }, void 0, popupDiv);
                    this.annotations.addFormFields.call(this, lhsCol, chart, '', options, [], true);
                    this.addButton(bottomRow, isInit ?
                        (lang.addButton || 'add') :
                        (lang.saveButton || 'save'), isInit ? 'add' : 'save', popupDiv, callback);
                },
                /**
                 * Create annotation's form fields.
                 * @private
                 * @param {Highcharts.HTMLDOMElement} parentDiv
                 * Div where inputs are placed
                 * @param {Highcharts.Chart} chart
                 * Chart
                 * @param {string} parentNode
                 * Name of parent to create chain of names
                 * @param {Highcharts.AnnotationsOptions} options
                 * Options
                 * @param {Array<unknown>} storage
                 * Array where all items are stored
                 * @param {boolean} [isRoot]
                 * Recursive flag for root
                 */
                addFormFields: function (parentDiv, chart, parentNode, options, storage, isRoot) {
                    var _self = this,
                        addFormFields = this.annotations.addFormFields,
                        addInput = this.addInput,
                        lang = this.lang,
                        parentFullName,
                        titleName;
                    if (!chart) {
                        return;
                    }
                    objectEach(options, function (value, option) {
                        // create name like params.styles.fontSize
                        parentFullName = parentNode !== '' ?
                            parentNode + '.' + option : option;
                        if (isObject(value)) {
                            if (
                            // value is object of options
                            !isArray(value) ||
                                // array of objects with params. i.e labels in Fibonacci
                                (isArray(value) && isObject(value[0]))) {
                                titleName = lang[option] || option;
                                if (!titleName.match(indexFilter)) {
                                    storage.push([
                                        true,
                                        titleName,
                                        parentDiv
                                    ]);
                                }
                                addFormFields.call(_self, parentDiv, chart, parentFullName, value, storage, false);
                            }
                            else {
                                storage.push([
                                    _self,
                                    parentFullName,
                                    'annotation',
                                    parentDiv,
                                    value
                                ]);
                            }
                        }
                    });
                    if (isRoot) {
                        stableSort(storage, function (a) {
                            return a[1].match(/format/g) ? -1 : 1;
                        });
                        if (isFirefox) {
                            storage.reverse(); // (#14691)
                        }
                        storage.forEach(function (genInput) {
                            if (genInput[0] === true) {
                                createElement(SPAN, {
                                    className: PREFIX + 'annotation-title'
                                }, void 0, genInput[2]).appendChild(doc.createTextNode(genInput[1]));
                            }
                            else {
                                genInput[4] = {
                                    value: genInput[4][0],
                                    type: genInput[4][1]
                                };
                                addInput.apply(genInput[0], genInput.splice(1));
                            }
                        });
                    }
                }
            },
            indicators: {
                /**
                 * Create indicator's form. It contains two tabs (ADD and EDIT) with
                 * content.
                 * @private
                 */
                addForm: function (chart, _options, callback) {
                    var tabsContainers,
                        indicators = this.indicators,
                        lang = this.lang,
                        buttonParentDiv;
                    if (!chart) {
                        return;
                    }
                    // add tabs
                    this.tabs.init.call(this, chart);
                    // get all tabs content divs
                    tabsContainers = this.popup.container
                        .querySelectorAll('.' + PREFIX + 'tab-item-content');
                    // ADD tab
                    this.addColsContainer(tabsContainers[0]);
                    indicators.addSearchBox.call(this, chart, tabsContainers[0]);
                    indicators.addIndicatorList.call(this, chart, tabsContainers[0], 'add');
                    buttonParentDiv = tabsContainers[0]
                        .querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0];
                    this.addButton(buttonParentDiv, lang.addButton || 'add', 'add', buttonParentDiv, callback);
                    // EDIT tab
                    this.addColsContainer(tabsContainers[1]);
                    indicators.addIndicatorList.call(this, chart, tabsContainers[1], 'edit');
                    buttonParentDiv = tabsContainers[1]
                        .querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0];
                    this.addButton(buttonParentDiv, lang.saveButton || 'save', 'edit', buttonParentDiv, callback);
                    this.addButton(buttonParentDiv, lang.removeButton || 'remove', 'remove', buttonParentDiv, callback);
                },
                /**
                 * Filter object of series which are not indicators.
                 * If the filter string exists, check against it.
                 *
                 * @private
                 *
                 * @param {Highcharts.FilteredSeries} series
                 *        All series are available in the plotOptions.
                 *
                 * @param {string|undefined} filter
                 *        Applied filter string from the input.
                 *        For the first iteration, it's an empty string.
                 *
                 * @return {Array<Highcharts.FilteredSeries>} filteredSeriesArray
                 *         Returns array of filtered series based on filter string.
                 */
                filterSeries: function (series, filter) {
                    var popup = this,
                        indicators = popup.indicators,
                        lang = popup.chart && popup.chart.options.lang,
                        indicatorAliases = lang &&
                            lang.navigation &&
                            lang.navigation.popup &&
                            lang.navigation.popup.indicatorAliases;
                    var filteredSeriesArray = [],
                        filteredSeries;
                    objectEach(series, function (series, value) {
                        var seriesOptions = series.options;
                        // Allow only indicators.
                        if (series.params || seriesOptions &&
                            seriesOptions.params) {
                            var _a = indicators.getNameType(series,
                                value),
                                indicatorFullName = _a.indicatorFullName,
                                indicatorType = _a.indicatorType;
                            if (filter) {
                                // Replace invalid characters.
                                var validFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                                var regex = new RegExp(validFilter, 'i'),
                                    alias = indicatorAliases &&
                                        indicatorAliases[indicatorType] &&
                                        indicatorAliases[indicatorType].join(' ') || '';
                                if (indicatorFullName.match(regex) ||
                                    alias.match(regex)) {
                                    filteredSeries = {
                                        indicatorFullName: indicatorFullName,
                                        indicatorType: indicatorType,
                                        series: series
                                    };
                                    filteredSeriesArray.push(filteredSeries);
                                }
                            }
                            else {
                                filteredSeries = {
                                    indicatorFullName: indicatorFullName,
                                    indicatorType: indicatorType,
                                    series: series
                                };
                                filteredSeriesArray.push(filteredSeries);
                            }
                        }
                    });
                    return filteredSeriesArray;
                },
                /**
                 * Filter an array of series and map its names and types.
                 *
                 * @private
                 *
                 * @param {Highcharts.FilteredSeries} series
                 *        All series that are available in the plotOptions.
                 *
                 * @return {Array<Highcharts.FilteredSeries>} filteredSeriesArray
                 *         Returns array of filtered series based on filter string.
                 */
                filterSeriesArray: function (series) {
                    var filteredSeriesArray = [],
                        filteredSeries;
                    // Allow only indicators.
                    series.forEach(function (series) {
                        var seriesOptions = series.options;
                        if (series.is('sma')) {
                            filteredSeries = {
                                indicatorFullName: series.name,
                                indicatorType: series.type,
                                series: series
                            };
                            filteredSeriesArray.push(filteredSeries);
                        }
                    });
                    return filteredSeriesArray;
                },
                /**
                 * Create HTML list of all indicators (ADD mode) or added indicators
                 * (EDIT mode).
                 *
                 * @private
                 *
                 * @param {Highcharts.AnnotationChart} chart
                 *        The chart object.
                 *
                 * @param {string} [optionName]
                 *        Name of the option into which selection is being added.
                 *
                 * @param {HTMLDOMElement} [parentDiv]
                 *        HTML parent element.
                 *
                 * @param {string} listType
                 *        Type of list depending on the selected bookmark.
                 *        Might be 'add' or 'edit'.
                 *
                 * @param {string|undefined} filter
                 *        Applied filter string from the input.
                 *        For the first iteration, it's an empty string.
                 */
                addIndicatorList: function (chart, parentDiv, listType, filter) {
                    var popup = this, indicators = popup.indicators, lang = popup.lang, lhsCol = parentDiv.querySelectorAll('.' + PREFIX + 'popup-lhs-col')[0], rhsCol = parentDiv.querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0], isEdit = listType === 'edit', addFormFields = this.indicators.addFormFields, series = (isEdit ?
                            chart.series : // EDIT mode
                            chart.options.plotOptions || {} // ADD mode
                        );
                    if (!chart && series) {
                        return;
                    }
                    var rhsColWrapper,
                        indicatorList,
                        item,
                        filteredSeriesArray = [];
                    // Filter and sort the series.
                    if (!isEdit && !isArray(series)) {
                        // Apply filters only for the 'add' indicator list.
                        filteredSeriesArray = indicators.filterSeries.call(this, series, filter);
                    }
                    else if (isArray(series)) {
                        filteredSeriesArray = indicators.filterSeriesArray.call(this, series);
                    }
                    // Sort indicators alphabeticaly.
                    stableSort(filteredSeriesArray, function (a, b) {
                        var seriesAName = a.indicatorFullName.toLowerCase(),
                            seriesBName = b.indicatorFullName.toLowerCase();
                        return (seriesAName < seriesBName) ?
                            -1 : (seriesAName > seriesBName) ? 1 : 0;
                    });
                    // If the list exists remove it from the DOM
                    // in order to create a new one with different filters.
                    if (lhsCol.children[1]) {
                        lhsCol.children[1].remove();
                    }
                    // Create wrapper for list.
                    indicatorList = createElement(UL, {
                        className: PREFIX + 'indicator-list'
                    }, void 0, lhsCol);
                    rhsColWrapper = rhsCol.querySelectorAll('.' + PREFIX + 'popup-rhs-col-wrapper')[0];
                    filteredSeriesArray.forEach(function (seriesSet) {
                        var indicatorFullName = seriesSet.indicatorFullName,
                            indicatorType = seriesSet.indicatorType,
                            series = seriesSet.series;
                        item = createElement(LI, {
                            className: PREFIX + 'indicator-list'
                        }, void 0, indicatorList);
                        item.appendChild(doc.createTextNode(indicatorFullName));
                        ['click', 'touchstart'].forEach(function (eventName) {
                            addEvent(item, eventName, function () {
                                var button = rhsColWrapper.parentNode
                                        .children[1];
                                addFormFields.call(popup, chart, series, indicatorType, rhsColWrapper);
                                if (button) {
                                    button.style.display = 'block';
                                }
                                // add hidden input with series.id
                                if (isEdit && series.options) {
                                    createElement(INPUT, {
                                        type: 'hidden',
                                        name: PREFIX + 'id-' + indicatorType,
                                        value: series.options.id
                                    }, void 0, rhsColWrapper).setAttribute(PREFIX + 'data-series-id', series.options.id);
                                }
                            });
                        });
                    });
                    // select first item from the list
                    if (indicatorList.childNodes.length > 0) {
                        indicatorList.childNodes[0].click();
                    }
                    else if (!isEdit) {
                        AST.setElementHTML(rhsColWrapper.parentNode.children[0], lang.noFilterMatch || '');
                        rhsColWrapper.parentNode.children[1]
                            .style.display = 'none';
                    }
                },
                /**
                 * Add searchbox HTML element and its' label.
                 *
                 * @private
                 *
                 * @param {Highcharts.AnnotationChart} chart
                 *        The chart object.
                 *
                 * @param {HTMLDOMElement} parentDiv
                 *        HTML parent element.
                 */
                addSearchBox: function (chart, parentDiv) {
                    var popup = this, lhsCol = parentDiv.querySelectorAll('.' + PREFIX + 'popup-lhs-col')[0], options = 'searchIndicators', inputAttributes = {
                            value: '',
                            type: 'text',
                            htmlFor: 'search-indicators',
                            labelClassName: 'highcharts-input-search-indicators-label'
                        }, clearFilterText = this.lang.clearFilter, inputWrapper = createElement(DIV, {
                            className: 'highcharts-input-wrapper'
                        }, void 0, lhsCol);
                    var handleInputChange = function (inputText) {
                            // Apply some filters.
                            popup.indicators.addIndicatorList.call(popup,
                        chart,
                        popup.container, 'add',
                        inputText);
                    };
                    // Add input field with the label and button.
                    var input = this.addInput(options,
                        INPUT,
                        inputWrapper,
                        inputAttributes),
                        button = createElement(A, {
                            textContent: clearFilterText
                        },
                        void 0,
                        inputWrapper);
                    input.classList.add('highcharts-input-search-indicators');
                    button.classList.add('clear-filter-button');
                    // Add input change events.
                    addEvent(input, 'input', function (e) {
                        handleInputChange(this.value);
                        // Show clear filter button.
                        if (this.value.length) {
                            button.style.display = 'inline-block';
                        }
                        else {
                            button.style.display = 'none';
                        }
                    });
                    // Add clear filter click event.
                    ['click', 'touchstart'].forEach(function (eventName) {
                        addEvent(button, eventName, function () {
                            // Clear the input.
                            input.value = '';
                            handleInputChange('');
                            // Hide clear filter button- no longer nececary.
                            button.style.display = 'none';
                        });
                    });
                },
                /**
                 * Add selection HTML element and its' label.
                 *
                 * @private
                 *
                 * @param {string} indicatorType
                 * Type of the indicator i.e. sma, ema...
                 *
                 * @param {string} [optionName]
                 * Name of the option into which selection is being added.
                 *
                 * @param {HTMLDOMElement} [parentDiv]
                 * HTML parent element.
                 */
                addSelection: function (indicatorType, optionName, parentDiv) {
                    var optionParamList = optionName.split('.'),
                        labelText = optionParamList[optionParamList.length - 1];
                    var selectName = PREFIX + optionName + '-type-' + indicatorType,
                        lang = this.lang,
                        selectBox;
                    // Add a label for the selection box.
                    createElement(LABEL, {
                        htmlFor: selectName
                    }, null, parentDiv).appendChild(doc.createTextNode(lang[labelText] || optionName));
                    // Create a selection box.
                    selectBox = createElement(SELECT, {
                        name: selectName,
                        className: PREFIX + 'popup-field',
                        id: PREFIX + 'select-' + optionName
                    }, null, parentDiv);
                    selectBox.setAttribute('id', PREFIX + 'select-' + optionName);
                    return selectBox;
                },
                /**
                 * Get and add selection options.
                 *
                 * @private
                 *
                 * @param {Highcharts.AnnotationChart} chart
                 *        The chart object.
                 *
                 * @param {string} [optionName]
                 *        Name of the option into which selection is being added.
                 *
                 * @param {HTMLSelectElement} [selectBox]
                 *        HTML select box element to which the options are being added.
                 *
                 * @param {string|undefined} indicatorType
                 *        Type of the indicator i.e. sma, ema...
                 *
                 * @param {string|undefined} parameterName
                 *        Name of the parameter which should be applied.
                 *
                 * @param {string|undefined} selectedOption
                 *        Default value in dropdown.
                 */
                addSelectionOptions: function (chart, optionName, selectBox, indicatorType, parameterName, selectedOption, currentSeries) {
                    var popup = this;
                    // Get and apply selection options for the possible series.
                    if (optionName === 'series' || optionName === 'volume') {
                        // List all series which have id - mandatory for indicator.
                        chart.series.forEach(function (series) {
                            var seriesOptions = series.options,
                                seriesName = seriesOptions.name ||
                                    seriesOptions.params ?
                                    series.name :
                                    seriesOptions.id || '';
                            if (seriesOptions.id !== PREFIX + 'navigator-series' &&
                                seriesOptions.id !== (currentSeries &&
                                    currentSeries.options &&
                                    currentSeries.options.id)) {
                                if (!defined(selectedOption) &&
                                    optionName === 'volume' &&
                                    series.type === 'column') {
                                    selectedOption = seriesOptions.id;
                                }
                                createElement(OPTION, {
                                    value: seriesOptions.id
                                }, void 0, selectBox).appendChild(doc.createTextNode(seriesName));
                            }
                        });
                    }
                    else if (indicatorType && parameterName) {
                        // Get and apply options for the possible parameters.
                        var dropdownKey = parameterName + '-' + indicatorType,
                            parameterOption = dropdownParameters[dropdownKey];
                        parameterOption.forEach(function (element) {
                            createElement(OPTION, {
                                value: element
                            }, void 0, selectBox).appendChild(doc.createTextNode(element));
                        });
                    }
                    // Add the default dropdown value if defined.
                    if (defined(selectedOption)) {
                        selectBox.value = selectedOption;
                    }
                },
                /**
                 * Extract full name and type of requested indicator.
                 *
                 * @private
                 *
                 * @param {Highcharts.Series} series
                 * Series which name is needed(EDITmode - defaultOptions.series,
                 * ADDmode - indicator series).
                 *
                 * @param {string} [indicatorType]
                 * Type of the indicator i.e. sma, ema...
                 *
                 * @return {Highcharts.Dictionary<string>}
                 * Full name and series type.
                 */
                getNameType: function (series, indicatorType) {
                    var options = series.options,
                        seriesTypes = H.seriesTypes;
                    // add mode
                    var seriesName = (seriesTypes[indicatorType] &&
                            seriesTypes[indicatorType].prototype.nameBase) ||
                            indicatorType.toUpperCase(),
                        seriesType = indicatorType;
                    // edit
                    if (options && options.type) {
                        seriesType = series.options.type;
                        seriesName = series.name;
                    }
                    return {
                        indicatorFullName: seriesName,
                        indicatorType: seriesType
                    };
                },
                /**
                 * Create the selection box for the series,
                 * add options and apply the default one.
                 *
                 * @private
                 *
                 * @param {string} indicatorType
                 *        Type of the indicator i.e. sma, ema...
                 *
                 * @param {string} [optionName]
                 *        Name of the option into which selection is being added.
                 *
                 * @param {Highcharts.AnnotationChart} chart
                 *        The chart object.
                 *
                 * @param {HTMLDOMElement} [parentDiv]
                 *        HTML parent element.
                 *
                 * @param {string|undefined} selectedOption
                 *        Default value in dropdown.
                 */
                listAllSeries: function (indicatorType, optionName, chart, parentDiv, currentSeries, selectedOption) {
                    var popup = this,
                        indicators = popup.indicators;
                    // Won't work without the chart.
                    if (!chart) {
                        return;
                    }
                    // Add selection boxes.
                    var selectBox = indicators.addSelection.call(popup,
                        indicatorType,
                        optionName,
                        parentDiv);
                    // Add possible dropdown options.
                    indicators.addSelectionOptions.call(popup, chart, optionName, selectBox, void 0, void 0, void 0, currentSeries);
                    // Add the default dropdown value if defined.
                    if (defined(selectedOption)) {
                        selectBox.value = selectedOption;
                    }
                },
                /**
                 * Create typical inputs for chosen indicator. Fields are extracted from
                 * defaultOptions (ADD mode) or current indicator (ADD mode). Two extra
                 * fields are added:
                 * - hidden input - contains indicator type (required for callback)
                 * - select - list of series which can be linked with indicator
                 * @private
                 * @param {Highcharts.Chart} chart
                 * Chart
                 * @param {Highcharts.Series} series
                 * Indicator
                 * @param {string} seriesType
                 * Indicator type like: sma, ema, etc.
                 * @param {Highcharts.HTMLDOMElement} rhsColWrapper
                 * Element where created HTML list is added
                 */
                addFormFields: function (chart, series, seriesType, rhsColWrapper) {
                    var fields = series.params || series.options.params,
                        getNameType = this.indicators.getNameType;
                    // reset current content
                    rhsColWrapper.innerHTML = AST.emptyHTML;
                    // create title (indicator name in the right column)
                    createElement(H3, {
                        className: PREFIX + 'indicator-title'
                    }, void 0, rhsColWrapper).appendChild(doc.createTextNode(getNameType(series, seriesType).indicatorFullName));
                    // input type
                    createElement(INPUT, {
                        type: 'hidden',
                        name: PREFIX + 'type-' + seriesType,
                        value: seriesType
                    }, void 0, rhsColWrapper);
                    // list all series with id
                    this.indicators.listAllSeries.call(this, seriesType, 'series', chart, rhsColWrapper, series, series.linkedParent && series.linkedParent.options.id);
                    if (fields.volumeSeriesID) {
                        this.indicators.listAllSeries.call(this, seriesType, 'volume', chart, rhsColWrapper, series, series.linkedParent && fields.volumeSeriesID);
                    }
                    // add param fields
                    this.indicators.addParamInputs.call(this, chart, 'params', fields, seriesType, rhsColWrapper);
                },
                /**
                 * Recurent function which lists all fields, from params object and
                 * create them as inputs. Each input has unique `data-name` attribute,
                 * which keeps chain of fields i.e params.styles.fontSize.
                 * @private
                 * @param {Highcharts.Chart} chart
                 * Chart
                 * @param {string} parentNode
                 * Name of parent to create chain of names
                 * @param {Highcharts.PopupFieldsDictionary<string>} fields
                 * Params which are based for input create
                 * @param {string} type
                 * Indicator type like: sma, ema, etc.
                 * @param {Highcharts.HTMLDOMElement} parentDiv
                 * Element where created HTML list is added
                 */
                addParamInputs: function (chart, parentNode, fields, type, parentDiv) {
                    var popup = this,
                        indicators = popup.indicators;
                    var addParamInputs = this.indicators.addParamInputs,
                        addInput = this.addInput,
                        parentFullName;
                    if (!chart) {
                        return;
                    }
                    objectEach(fields, function (value, fieldName) {
                        // create name like params.styles.fontSize
                        parentFullName = parentNode + '.' + fieldName;
                        if (defined(value) && // skip if field is unnecessary, #15362
                            parentFullName) {
                            if (isObject(value)) {
                                // (15733) 'Periods' has an arrayed value. Label must be
                                // created here.
                                addInput.call(popup, parentFullName, type, parentDiv, {});
                                addParamInputs.call(popup, chart, parentFullName, value, type, parentDiv);
                            }
                            // If the option is listed in dropdown enum,
                            // add the selection box for it.
                            if (parentFullName in DropdownProperties) {
                                // Add selection boxes.
                                var selectBox = indicators.addSelection.call(popup,
                                    type,
                                    parentFullName,
                                    parentDiv);
                                // Add possible dropdown options.
                                indicators.addSelectionOptions.call(popup, chart, parentNode, selectBox, type, fieldName, value);
                            }
                            else if (
                            // Skip volume field which is created by addFormFields.
                            parentFullName !== 'params.volumeSeriesID' &&
                                !isArray(value) // Skip params declared in array.
                            ) {
                                addInput.call(popup, parentFullName, type, parentDiv, {
                                    value: value,
                                    type: 'text'
                                } // all inputs are text type
                                );
                            }
                        }
                    });
                },
                /**
                 * Get amount of indicators added to chart.
                 * @private
                 * @return {number} - Amount of indicators
                 */
                getAmount: function () {
                    var series = this.series,
                        counter = 0;
                    series.forEach(function (serie) {
                        var seriesOptions = serie.options;
                        if (serie.params ||
                            seriesOptions && seriesOptions.params) {
                            counter++;
                        }
                    });
                    return counter;
                }
            },
            tabs: {
                /**
                 * Init tabs. Create tab menu items, tabs containers
                 * @private
                 * @param {Highcharts.Chart} chart
                 * Reference to current chart
                 */
                init: function (chart) {
                    var tabs = this.tabs,
                        indicatorsCount = this.indicators.getAmount.call(chart),
                        firstTab; // run by default
                        if (!chart) {
                            return;
                    }
                    // create menu items
                    firstTab = tabs.addMenuItem.call(this, 'add');
                    tabs.addMenuItem.call(this, 'edit', indicatorsCount);
                    // create tabs containers
                    tabs.addContentItem.call(this, 'add');
                    tabs.addContentItem.call(this, 'edit');
                    tabs.switchTabs.call(this, indicatorsCount);
                    // activate first tab
                    tabs.selectTab.call(this, firstTab, 0);
                },
                /**
                 * Create tab menu item
                 * @private
                 * @param {string} tabName
                 * `add` or `edit`
                 * @param {number} [disableTab]
                 * Disable tab when 0
                 * @return {Highcharts.HTMLDOMElement}
                 * Created HTML tab-menu element
                 */
                addMenuItem: function (tabName, disableTab) {
                    var popupDiv = this.popup.container,
                        className = PREFIX + 'tab-item',
                        lang = this.lang,
                        menuItem;
                    if (disableTab === 0) {
                        className += ' ' + PREFIX + 'tab-disabled';
                    }
                    // tab 1
                    menuItem = createElement(SPAN, {
                        className: className
                    }, void 0, popupDiv);
                    menuItem.appendChild(doc.createTextNode(lang[tabName + 'Button'] || tabName));
                    menuItem.setAttribute(PREFIX + 'data-tab-type', tabName);
                    return menuItem;
                },
                /**
                 * Create tab content
                 * @private
                 * @return {HTMLDOMElement} - created HTML tab-content element
                 */
                addContentItem: function () {
                    var popupDiv = this.popup.container;
                    return createElement(DIV, {
                        // #12100
                        className: PREFIX + 'tab-item-content ' +
                            PREFIX + 'no-mousewheel'
                    }, void 0, popupDiv);
                },
                /**
                 * Add click event to each tab
                 * @private
                 * @param {number} disableTab
                 * Disable tab when 0
                 */
                switchTabs: function (disableTab) {
                    var _self = this,
                        popupDiv = this.popup.container,
                        tabs = popupDiv.querySelectorAll('.' + PREFIX + 'tab-item'),
                        dataParam;
                    tabs.forEach(function (tab, i) {
                        dataParam = tab.getAttribute(PREFIX + 'data-tab-type');
                        if (dataParam === 'edit' && disableTab === 0) {
                            return;
                        }
                        ['click', 'touchstart'].forEach(function (eventName) {
                            addEvent(tab, eventName, function () {
                                // reset class on other elements
                                _self.tabs.deselectAll.call(_self);
                                _self.tabs.selectTab.call(_self, this, i);
                            });
                        });
                    });
                },
                /**
                 * Set tab as visible
                 * @private
                 * @param {globals.Element} - current tab
                 * @param {number} - Index of tab in menu
                 */
                selectTab: function (tab, index) {
                    var allTabs = this.popup.container
                            .querySelectorAll('.' + PREFIX + 'tab-item-content');
                    tab.className += ' ' + PREFIX + 'tab-item-active';
                    allTabs[index].className += ' ' + PREFIX + 'tab-item-show';
                },
                /**
                 * Set all tabs as invisible.
                 * @private
                 */
                deselectAll: function () {
                    var popupDiv = this.popup.container,
                        tabs = popupDiv
                            .querySelectorAll('.' + PREFIX + 'tab-item'),
                        tabsContent = popupDiv
                            .querySelectorAll('.' + PREFIX + 'tab-item-content'),
                        i;
                    for (i = 0; i < tabs.length; i++) {
                        tabs[i].classList.remove(PREFIX + 'tab-item-active');
                        tabsContent[i].classList.remove(PREFIX + 'tab-item-show');
                    }
                }
            }
        };
        addEvent(NavigationBindings, 'showPopup', function (config) {
            if (!this.popup) {
                // Add popup to main container
                this.popup = new H.Popup(this.chart.container, (this.chart.options.navigation.iconsURL ||
                    (this.chart.options.stockTools &&
                        this.chart.options.stockTools.gui.iconsURL) ||
                    'https://code.highcharts.com/10.0.0/gfx/stock-icons/'), this.chart);
            }
            this.popup.showForm(config.formType, this.chart, config.options, config.onSubmit);
        });
        addEvent(NavigationBindings, 'closePopup', function () {
            if (this.popup) {
                this.popup.closePopup();
            }
        });

        return H.Popup;
    });
    _registerModule(_modules, 'masters/modules/annotations-advanced.src.js', [], function () {


    });
}));