/**
 * @license Highcharts JS v7.1.3 (2019-08-14)
 *
 * Annotations module
 *
 * (c) 2009-2019 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/annotations', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'annotations/eventEmitterMixin.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        var objectEach = U.objectEach;

        var fireEvent = H.fireEvent;

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
                var emitter = this;

                H.addEvent(
                    emitter.graphic.element,
                    'mousedown',
                    function (e) {
                        emitter.onMouseDown(e);
                    }
                );

                objectEach(emitter.options.events, function (event, type) {
                    var eventHandler = function (e) {
                        if (type !== 'click' || !emitter.cancelClick) {
                            event.call(
                                emitter,
                                emitter.chart.pointer.normalize(e),
                                emitter.target
                            );
                        }
                    };

                    if (H.inArray(type, emitter.nonDOMEvents || []) === -1) {
                        emitter.graphic.on(type, eventHandler);
                    } else {
                        H.addEvent(emitter, type, eventHandler);
                    }
                });

                if (emitter.options.draggable) {
                    H.addEvent(emitter, 'drag', emitter.onDrag);

                    if (!emitter.graphic.renderer.styledMode) {
                        emitter.graphic.css({
                            cursor: {
                                x: 'ew-resize',
                                y: 'ns-resize',
                                xy: 'move'
                            }[emitter.options.draggable]
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
             *
             * @param {Object} e event
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

                emitter.removeDrag = H.addEvent(
                    H.doc,
                    'mousemove',
                    function (e) {
                        emitter.hasDragged = true;

                        e = pointer.normalize(e);
                        e.prevChartX = prevChartX;
                        e.prevChartY = prevChartY;

                        fireEvent(emitter, 'drag', e);

                        prevChartX = e.chartX;
                        prevChartY = e.chartY;
                    }
                );

                emitter.removeMouseUp = H.addEvent(
                    H.doc,
                    'mouseup',
                    function (e) {
                        emitter.cancelClick = emitter.hasDragged;
                        emitter.hasDragged = false;
                        // ControlPoints vs Annotation:
                        fireEvent(H.pick(emitter.target, emitter), 'afterUpdate');
                        emitter.onMouseUp(e);
                    }
                );
            },

            /**
             * Mouse up handler.
             *
             * @param {Object} e event
             */
            onMouseUp: function () {
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
             *
             * @param {Object} e event
             */
            onDrag: function (e) {
                if (
                    this.chart.isInsidePlot(
                        e.chartX - this.chart.plotLeft,
                        e.chartY - this.chart.plotTop
                    )
                ) {
                    var translation = this.mouseMoveToTranslation(e);

                    if (this.options.draggable === 'x') {
                        translation.y = 0;
                    }

                    if (this.options.draggable === 'y') {
                        translation.x = 0;
                    }

                    if (this.points.length) {
                        this.translate(translation.x, translation.y);
                    } else {
                        this.shapes.forEach(function (shape) {
                            shape.translate(translation.x, translation.y);
                        });
                        this.labels.forEach(function (label) {
                            label.translate(translation.x, translation.y);
                        });
                    }

                    this.redraw(false);
                }
            },

            /**
             * Map mouse move event to the radians.
             *
             * @param {Object} e event
             * @param {number} cx center x
             * @param {number} cy center y
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
             *
             * @param {Object} e event
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

                H.removeEvent(this);

                this.hcEvents = null;
            }
        };


        return eventEmitterMixin;
    });
    _registerModule(_modules, 'annotations/ControlPoint.js', [_modules['parts/Globals.js'], _modules['annotations/eventEmitterMixin.js']], function (H, eventEmitterMixin) {

        /**
         * A control point class which is a connection between controllable
         * transform methods and a user actions.
         *
         * @constructor
         * @mixes eventEmitterMixin
         * @memberOf Annotation
         *
         * @param {Highcharts.Chart} chart a chart instance
         * @param {Object} target a controllable instance which is a target for
         *        a control point
         * @param {Annotation.ControlPoint.Options} options an options object
         * @param {number} [index]
         */
        function ControlPoint(chart, target, options, index) {
            this.chart = chart;
            this.target = target;
            this.options = options;
            this.index = H.pick(options.index, index);
        }

        /**
         * @typedef {Object} Annotation.ControlPoint.Position
         * @property {number} x
         * @property {number} y
         */

        /**
         * @callback Annotation.ControlPoint.Positioner
         * @param {Object} e event
         * @param {Controllable} target
         * @return {Annotation.ControlPoint.Position} position
         */

        /**
         * @typedef {Object} Annotation.ControlPoint.Options
         * @property {string} symbol
         * @property {number} width
         * @property {number} height
         * @property {Object} style
         * @property {boolean} visible
         * @property {Annotation.ControlPoint.Positioner} positioner
         * @property {Object} events
         */

        H.extend(
            ControlPoint.prototype,
            eventEmitterMixin
        );

        /**
         * List of events for `anntation.options.events` that should not be
         * added to `annotation.graphic` but to the `annotation`.
         *
         * @type {Array<string>}
         */
        ControlPoint.prototype.nonDOMEvents = ['drag'];

        /**
         * Set the visibility.
         *
         * @param {boolean} [visible]
         **/
        ControlPoint.prototype.setVisibility = function (visible) {
            this.graphic.attr('visibility', visible ? 'visible' : 'hidden');

            this.options.visible = visible;
        };

        /**
         * Render the control point.
         */
        ControlPoint.prototype.render = function () {
            var chart = this.chart,
                options = this.options;

            this.graphic = chart.renderer
                .symbol(
                    options.symbol,
                    0,
                    0,
                    options.width,
                    options.height
                )
                .add(chart.controlPointsGroup)
                .css(options.style);

            this.setVisibility(options.visible);
            this.addEvents();
        };

        /**
         * Redraw the control point.
         *
         * @param {boolean} [animation]
         */
        ControlPoint.prototype.redraw = function (animation) {
            this.graphic[animation ? 'animate' : 'attr'](
                this.options.positioner.call(this, this.target)
            );
        };


        /**
         * Destroy the control point.
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
         */
        ControlPoint.prototype.update = function (userOptions) {
            var chart = this.chart,
                target = this.target,
                index = this.index,
                options = H.merge(true, this.options, userOptions);

            this.destroy();
            this.constructor(chart, target, options, index);
            this.render(chart.controlPointsGroup);
            this.redraw();
        };


        return ControlPoint;
    });
    _registerModule(_modules, 'annotations/MockPoint.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {

        var defined = U.defined;


        /**
         * A mock point label configuration.
         *
         * @interface Annotation.MockLabelOptionsObject
         *//**
         * X value translated to x axis scale
         * @name Annotation.MockLabelOptionsObject#x
         * @type {number|undefined}
         *//**
         * Y value translated to y axis scale
         * @name Annotation.MockLabelOptionsObject#y
         * @type {number|undefined}
         *//**
         * @name Annotation.MockLabelOptionsObject#point
         * @type {Highcharts.Point}
         */

        /**
         * A mock point configuration.
         *
         * @interface Highcharts.MockPointOptionsObject
         *//**
         * x value for the point in xAxis scale or pixels
         * @name Highcharts.MockPointOptionsObject#x
         * @type {number}
         *//**
         * y value for the point in yAxis scale or pixels
         * @name Highcharts.MockPointOptionsObject#y
         * @type {number}
         *//**
         * xAxis index or id
         * @name Highcharts.MockPointOptionsObject#xAxis
         * @type {Highcharts.Axis|number|string|undefined}
         *//**
         * yAxis index or id
         * @name Highcharts.MockPointOptionsObject#yAxis
         * @property {Highcharts.Axis|number|string|undefined}
         */

        /**
         * A point-like object, a mock point or a point uses in series.
         *
         * @private
         * @typedef {Highcharts.Point|Highcharts.MockPoint} Highcharts.PointLike
         */

        /**
         * A trimmed point object which imitates {@link Highchart.Point} class.
         * It is created when there is a need of pointing to some chart's position
         * using axis values or pixel values
         *
         * @private
         * @class
         * @name Highcharts.MockPoint
         *
         * @param {Highcharts.Chart} chart
         *        The chart object
         *
         * @param {Highcharts.MockPointOptionsObject} options
         *        The options object
         */
        function MockPoint(chart, target, options) {
            /**
             * A mock series instance imitating a real series from a real point.
             *
             * @type {Object}
             * @property {boolean} series.visible=true - whether a series is visible
             * @property {Chart} series.chart - a chart instance
             * @property {function} series.getPlotBox
             */
            this.series = {
                visible: true,
                chart: chart,
                getPlotBox: H.Series.prototype.getPlotBox
            };

            /**
             * @type {?Controllable}
             */
            this.target = target || null;

            /**
             * Options for the mock point.
             *
             * @type {Highcharts.MockPointOptionsObject}
             */
            this.options = options;

            /**
             * If an xAxis is set it represents the point's value in terms of the xAxis.
             *
             * @name Annotation.MockPoint#x
             * @type {?number}
             */

            /**
             * If an yAxis is set it represents the point's value in terms of the yAxis.
             *
             * @name Annotation.MockPoint#y
             * @type {?number}
             */

            /**
             * It represents the point's pixel x coordinate relative to its plot box.
             *
             * @name Annotation.MockPoint#plotX
             * @type {?number}
             */

            /**
             * It represents the point's pixel y position relative to its plot box.
             *
             * @name Annotation.MockPoint#plotY
             * @type {?number}
             */

            /**
             * Whether the point is inside the plot box.
             *
             * @name Annotation.MockPoint#isInside
             * @type {boolean}
             */

            this.applyOptions(this.getOptions());
        }

        /**
         * Create a mock point from a real Highcharts point.
         *
         * @param {Point} point
         *
         * @return {Annotation.MockPoint} a mock point instance.
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
         * @typedef Annotation.MockPoint.Position
         * @property {number} x
         * @property {number} y
         */

        /**
         * Get the pixel position from the point like object.
         *
         * @param {Annotation.PointLike} point
         * @param {boolean} [paneCoordinates]
         *        whether the pixel position should be relative
         *
         * @return {Annotation.MockPoint.Position} pixel position
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
                } else {
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
         * @param {Annotation.PointLike} point
         *
         * @return {Annotation.MockPoint.Options} mock point's options
         */
        MockPoint.pointToOptions = function (point) {
            return {
                x: point.x,
                y: point.y,
                xAxis: point.series.xAxis,
                yAxis: point.series.yAxis
            };
        };

        H.extend(MockPoint.prototype, /** @lends Annotation.MockPoint# */ {
            /**
             * A flag indicating that a point is not the real one.
             *
             * @type {boolean}
             * @default true
             */
            mock: true,

            /**
             * Check if the point has dynamic options.
             *
             * @return {boolean} A positive flag if the point has dynamic options.
             */
            hasDynamicOptions: function () {
                return typeof this.options === 'function';
            },

            /**
             * Get the point's options.
             *
             * @return {Annotation.MockPoint.Options} the mock point's options.
             */
            getOptions: function () {
                return this.hasDynamicOptions() ?
                    this.options(this.target) :
                    this.options;
            },

            /**
             * Apply options for the point.
             *
             * @param {Annotation.MockPoint.Options} options
             */
            applyOptions: function (options) {
                this.command = options.command;

                this.setAxis(options, 'x');
                this.setAxis(options, 'y');

                this.refresh();
            },

            /**
             * Set x or y axis.
             *
             * @param {Annotation.MockPoint.Options} options
             * @param {string} xOrY 'x' or 'y' string literal
             */
            setAxis: function (options, xOrY) {
                var axisName = xOrY + 'Axis',
                    axisOptions = options[axisName],
                    chart = this.series.chart;

                this.series[axisName] =
                    axisOptions instanceof H.Axis ?
                        axisOptions :
                        defined(axisOptions) ?
                            chart[axisName][axisOptions] || chart.get(axisOptions) :
                            null;
            },

            /**
             * Transform the mock point to an anchor
             * (relative position on the chart).
             *
             * @return {Array<number>} A quadruple of numbers which denotes x, y,
             * width and height of the box
             **/
            toAnchor: function () {
                var anchor = [this.plotX, this.plotY, 0, 0];

                if (this.series.chart.inverted) {
                    anchor[0] = this.plotY;
                    anchor[1] = this.plotX;
                }

                return anchor;
            },

            /**
             * @typedef {Object} Annotation.MockPoint.LabelConfig
             * @property {number|undefined} x x value translated to x axis scale
             * @property {number|undefined} y y value translated to y axis scale
             * @property {Annotation.MockPoint} point instance of the point
             */

            /**
             * Returns a label config object -
             * the same as Highcharts.Point.prototype.getLabelConfig
             *
             * @return {Annotation.MockPoint.LabelConfig} the point's label config
             */
            getLabelConfig: function () {
                return {
                    x: this.x,
                    y: this.y,
                    point: this
                };
            },

            /**
             * Check if the point is inside its pane.
             *
             * @return {boolean} A flag indicating whether the point is inside the pane.
             */
            isInsidePane: function () {
                var plotX = this.plotX,
                    plotY = this.plotY,
                    xAxis = this.series.xAxis,
                    yAxis = this.series.yAxis,
                    isInside = true;

                if (xAxis) {
                    isInside = defined(plotX) && plotX >= 0 && plotX <= xAxis.len;
                }

                if (yAxis) {
                    isInside =
                        isInside &&
                        defined(plotY) &&
                        plotY >= 0 && plotY <= yAxis.len;
                }

                return isInside;
            },

            /**
             * Refresh point values and coordinates based on its options.
             */
            refresh: function () {
                var series = this.series,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    options = this.getOptions();

                if (xAxis) {
                    this.x = options.x;
                    this.plotX = xAxis.toPixels(options.x, true);
                } else {
                    this.x = null;
                    this.plotX = options.x;
                }

                if (yAxis) {
                    this.y = options.y;
                    this.plotY = yAxis.toPixels(options.y, true);
                } else {
                    this.y = null;
                    this.plotY = options.y;
                }

                this.isInside = this.isInsidePane();
            },

            /**
             * Translate the point.
             *
             * @param {number} [cx] origin x transformation
             * @param {number} [cy] origin y transformation
             * @param {number} dx translation for x coordinate
             * @param {number} dy translation for y coordinate
             **/
            translate: function (cx, cy, dx, dy) {
                if (!this.hasDynamicOptions()) {
                    this.plotX += dx;
                    this.plotY += dy;

                    this.refreshOptions();
                }
            },

            /**
             * Scale the point.
             *
             * @param {number} cx origin x transformation
             * @param {number} cy origin y transformation
             * @param {number} sx scale factor x
             * @param {number} sy scale factor y
             */
            scale: function (cx, cy, sx, sy) {
                if (!this.hasDynamicOptions()) {
                    var x = this.plotX * sx,
                        y = this.plotY * sy,
                        tx = (1 - sx) * cx,
                        ty = (1 - sy) * cy;

                    this.plotX = tx + x;
                    this.plotY = ty + y;

                    this.refreshOptions();
                }
            },

            /**
             * Rotate the point.
             *
             * @param {number} cx origin x rotation
             * @param {number} cy origin y rotation
             * @param {number} radians
             */
            rotate: function (cx, cy, radians) {
                if (!this.hasDynamicOptions()) {
                    var cos = Math.cos(radians),
                        sin = Math.sin(radians),
                        x = this.plotX,
                        y = this.plotY,
                        tx,
                        ty;

                    x -= cx;
                    y -= cy;

                    tx = x * cos - y * sin;
                    ty = x * sin + y * cos;

                    this.plotX = tx + cx;
                    this.plotY = ty + cy;

                    this.refreshOptions();
                }
            },

            /**
             * Refresh point options based on its plot coordinates.
             */
            refreshOptions: function () {
                var series = this.series,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis;

                this.x = this.options.x = xAxis ?
                    this.options.x = xAxis.toValue(this.plotX, true) :
                    this.plotX;

                this.y = this.options.y = yAxis ?
                    yAxis.toValue(this.plotY, true) :
                    this.plotY;
            }
        });


        return MockPoint;
    });
    _registerModule(_modules, 'annotations/controllable/controllableMixin.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['annotations/ControlPoint.js'], _modules['annotations/MockPoint.js']], function (H, U, ControlPoint, MockPoint) {

        var isObject = U.isObject,
            isString = U.isString,
            splat = U.splat;


        /**
         * It provides methods for handling points, control points
         * and points transformations.
         *
         * @private
         * @mixin
         * @memberOf Annotation
         */
        var controllableMixin = {
            /**
             * Init the controllable
             *
             * @param {Annotation} annotation - an annotation instance
             * @param {Object} options - options specific for controllable
             * @param {number} index - index of the controllable element
             **/
            init: function (annotation, options, index) {
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
             **/
            attr: function () {
                this.graphic.attr.apply(this.graphic, arguments);
            },


            /**
             * Get the controllable's points options.
             *
             * @return {Array<PointLikeOptions>} - an array of points' options.
             *
             */
            getPointsOptions: function () {
                var options = this.options;

                return options.points || (options.point && splat(options.point));
            },

            /**
             * Utility function for mapping item's options
             * to element's attribute
             *
             * @param {Object} options
             * @return {Object} mapped options
             **/
            attrsFromOptions: function (options) {
                var map = this.constructor.attrsMap,
                    attrs = {},
                    key,
                    mappedKey,
                    styledMode = this.chart.styledMode;

                for (key in options) {
                    mappedKey = map[key];

                    if (
                        mappedKey &&
                        (
                            !styledMode ||
                            ['fill', 'stroke', 'stroke-width']
                                .indexOf(mappedKey) === -1
                        )
                    ) {
                        attrs[mappedKey] = options[key];
                    }
                }

                return attrs;
            },

            /**
             * @typedef {Object} Annotation.controllableMixin.Position
             * @property {number} x
             * @property {number} y
             */

            /**
             * An object which denotes an anchor position
             *
             * @typedef Annotation.controllableMixin.AnchorPosition
             *          Annotation.controllableMixin.Position
             * @property {number} height
             * @property {number} width
             */

            /**
             * An object which denots a controllable's anchor positions
             * - relative and absolute.
             *
             * @typedef {Object} Annotation.controllableMixin.Anchor
             * @property {Annotation.controllableMixin.AnchorPosition} relativePosition
             * @property {Annotation.controllableMixin.AnchorPosition} absolutePosition
             */

            /**
             * Returns object which denotes anchor position - relative and absolute.
             *
             * @param {Annotation.PointLike} point a point like object
             * @return {Annotation.controllableMixin.Anchor} a controllable anchor
             */
            anchor: function (point) {
                var plotBox = point.series.getPlotBox(),

                    box = point.mock ?
                        point.toAnchor() :
                        H.Tooltip.prototype.getAnchor.call({
                            chart: point.series.chart
                        }, point),

                    anchor = {
                        x: box[0] + (this.options.x || 0),
                        y: box[1] + (this.options.y || 0),
                        height: box[2] || 0,
                        width: box[3] || 0
                    };

                return {
                    relativePosition: anchor,
                    absolutePosition: H.merge(anchor, {
                        x: anchor.x + plotBox.translateX,
                        y: anchor.y + plotBox.translateY
                    })
                };
            },

            /**
             * Map point's options to a point-like object.
             *
             * @param {Highcharts.MockPointOptionsObject} pointOptions
             *        point's options
             * @param {Highcharts.PointLike} point
             *        a point like instance
             *
             * @return {Highcharts.PointLike|null}
             *         if the point is found/set returns this point, otherwise null
             */
            point: function (pointOptions, point) {
                if (pointOptions && pointOptions.series) {
                    return pointOptions;
                }

                if (!point || point.series === null) {
                    if (isObject(pointOptions)) {
                        point = new MockPoint(
                            this.chart,
                            this,
                            pointOptions
                        );
                    } else if (isString(pointOptions)) {
                        point = this.chart.get(pointOptions) || null;
                    } else if (typeof pointOptions === 'function') {
                        var pointConfig = pointOptions.call(point, this);

                        point = pointConfig.series ?
                            pointConfig :
                            new MockPoint(
                                this.chart,
                                this,
                                pointOptions
                            );
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

                (controlPointsOptions || []).forEach(
                    function (controlPointOptions, i) {
                        var options = H.merge(
                            this.options.controlPointOptions,
                            controlPointOptions
                        );

                        if (!options.index) {
                            options.index = i;
                        }

                        controlPointsOptions[i] = options;

                        this.controlPoints.push(
                            new ControlPoint(this.chart, this, options)
                        );
                    },
                    this
                );
            },

            /**
             * Check if a controllable should be rendered/redrawn.
             *
             * @return {boolean} whether a controllable should be drawn.
             */
            shouldBeDrawn: function () {
                return Boolean(this.points.length);
            },

            /**
             * Render a controllable.
             **/
            render: function () {
                this.controlPoints.forEach(function (controlPoint) {
                    controlPoint.render();
                });
            },

            /**
             * Redraw a controllable.
             *
             * @param {boolean} animation
             **/
            redraw: function (animation) {
                this.controlPoints.forEach(function (controlPoint) {
                    controlPoint.redraw(animation);
                });
            },

            /**
             * Transform a controllable with a specific transformation.
             *
             * @param {string} transformation a transformation name
             * @param {number} cx origin x transformation
             * @param {number} cy origin y transformation
             * @param {number} p1 param for the transformation
             * @param {number} p2 param for the transformation
             **/
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
             * @param {number} cx origin x transformation
             * @param {number} cy origin y transformation
             * @param {number} p1 param for the transformation
             * @param {number} p2 param for the transformation
             * @param {number} i index of the point
             *
             **/
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
             * @param {boolean} [visible]
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
                    options = H.merge(true, this.options, newOptions),
                    parentGroup = this.graphic.parentGroup;

                this.destroy();
                this.constructor(annotation, options);
                this.render(parentGroup);
                this.redraw();
            }
        };


        return controllableMixin;
    });
    _registerModule(_modules, 'annotations/controllable/markerMixin.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {

        var defined = U.defined,
            objectEach = U.objectEach,
            splat = U.splat;


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
         *         strokeWidth: 0
         *       }
         *     }]
         *   }
         * }
         * </pre>
         * @type {Object}
         * @sample highcharts/annotations/custom-markers/
         *         Define a custom marker for annotations
         * @sample highcharts/css/annotations-markers/
         *         Define markers in a styled mode
         * @since 6.0.0
         * @apioption defs
         */
        var defaultMarkers = {
            arrow: {
                tagName: 'marker',
                render: false,
                id: 'arrow',
                refY: 5,
                refX: 9,
                markerWidth: 10,
                markerHeight: 10,
                children: [{
                    tagName: 'path',
                    d: 'M 0 0 L 10 5 L 0 10 Z', // triangle (used as an arrow)
                    strokeWidth: 0
                }]
            },

            'reverse-arrow': {
                tagName: 'marker',
                render: false,
                id: 'reverse-arrow',
                refY: 5,
                refX: 1,
                markerWidth: 10,
                markerHeight: 10,
                children: [{
                    tagName: 'path',
                    // reverse triangle (used as an arrow)
                    d: 'M 0 5 L 10 0 L 10 10 Z',
                    strokeWidth: 0
                }]
            }
        };

        H.SVGRenderer.prototype.addMarker = function (id, markerOptions) {
            var options = { id: id };

            var attrs = {
                stroke: markerOptions.color || 'none',
                fill: markerOptions.color || 'rgba(0, 0, 0, 0.75)'
            };

            options.children = markerOptions.children.map(function (child) {
                return H.merge(attrs, child);
            });

            var marker = this.definition(H.merge(true, {
                markerWidth: 20,
                markerHeight: 20,
                refX: 0,
                refY: 0,
                orient: 'auto'
            }, markerOptions, options));

            marker.id = id;

            return marker;
        };

        var createMarkerSetter = function (markerType) {
            return function (value) {
                this.attr(markerType, 'url(#' + value + ')');
            };
        };

        /**
         * @private
         * @mixin
         */
        var markerMixin = {
            markerEndSetter: createMarkerSetter('marker-end'),
            markerStartSetter: createMarkerSetter('marker-start'),

            /*
             * Set markers.
             *
             * @param {Controllable} item
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
                            for (key in defs) {
                                def = defs[key];

                                if (
                                    markerId === def.id && def.tagName === 'marker'
                                ) {
                                    predefinedMarker = def;
                                    break;
                                }
                            }

                            if (predefinedMarker) {
                                marker = item[markerType] = chart.renderer
                                    .addMarker(
                                        (itemOptions.id || H.uniqueKey()) + '-' +
                                        predefinedMarker.id,
                                        H.merge(predefinedMarker, { color: color })
                                    );

                                item.attr(markerType, marker.attr('id'));
                            }
                        }
                    };

                ['markerStart', 'markerEnd'].forEach(setMarker);
            }
        };

        // In a styled mode definition is implemented
        H.SVGRenderer.prototype.definition = function (def) {
            var ren = this;

            function recurse(config, parent) {
                var ret;

                splat(config).forEach(function (item) {
                    var node = ren.createElement(item.tagName),
                        attr = {};

                    // Set attributes
                    objectEach(item, function (val, key) {
                        if (
                            key !== 'tagName' &&
                            key !== 'children' &&
                            key !== 'textContent'
                        ) {
                            attr[key] = val;
                        }
                    });
                    node.attr(attr);

                    // Add to the tree
                    node.add(parent || ren.defs);

                    // Add text content
                    if (item.textContent) {
                        node.element.appendChild(
                            H.doc.createTextNode(item.textContent)
                        );
                    }

                    // Recurse
                    recurse(item.children || [], node);

                    ret = node;
                });

                // Return last node added (on top level it's the only one)
                return ret;
            }
            return recurse(def);
        };

        H.addEvent(H.Chart, 'afterGetContainer', function () {
            this.options.defs = H.merge(defaultMarkers, this.options.defs || {});

            objectEach(this.options.defs, function (def) {
                if (def.tagName === 'marker' && def.render !== false) {
                    this.renderer.addMarker(def.id, def);
                }
            }, this);
        });


        return markerMixin;
    });
    _registerModule(_modules, 'annotations/controllable/ControllablePath.js', [_modules['parts/Globals.js'], _modules['annotations/controllable/controllableMixin.js'], _modules['annotations/controllable/markerMixin.js']], function (H, controllableMixin, markerMixin) {

        // See TRACKER_FILL in highcharts.src.js
        var TRACKER_FILL = 'rgba(192,192,192,' + (H.svg ? 0.0001 : 0.002) + ')';

        /**
         * A controllable path class.
         *
         * @class
         * @mixes Annotation.controllableMixin
         * @mixes Annotation.markerMixin
         * @memberOf Annotation
         *
         * @param {Highcharts.Annotation}
         * @param {Object} options a path's options object
         * @param {number} index of the path
         **/
        function ControllablePath(annotation, options, index) {
            this.init(annotation, options, index);
            this.collection = 'shapes';
        }

        /**
         * @typedef {Object} Annotation.ControllablePath.AttrsMap
         * @property {string} dashStyle=dashstyle
         * @property {string} strokeWidth=stroke-width
         * @property {string} stroke=stroke
         * @property {string} fill=fill
         * @property {string} zIndex=zIndex
         */

        /**
         * A map object which allows to map options attributes to element attributes
         *
         * @type {Annotation.ControllablePath.AttrsMap}
         */
        ControllablePath.attrsMap = {
            dashStyle: 'dashstyle',
            strokeWidth: 'stroke-width',
            stroke: 'stroke',
            fill: 'fill',
            zIndex: 'zIndex'
        };

        H.merge(
            true,
            ControllablePath.prototype,
            controllableMixin, /** @lends Annotation.ControllablePath# */ {
                /**
                 * @type 'path'
                 */
                type: 'path',

                setMarkers: markerMixin.setItemMarkers,

                /**
                 * Map the controllable path to 'd' path attribute
                 *
                 * @return {Array<(string|number)>} a path's d attribute
                 */
                toD: function () {
                    var d = this.options.d;

                    if (d) {
                        return typeof d === 'function' ?
                            d.call(this) :
                            d;
                    }

                    var points = this.points,
                        len = points.length,
                        showPath = len,
                        point = points[0],
                        position = showPath && this.anchor(point).absolutePosition,
                        pointIndex = 0,
                        dIndex = 2,
                        command;

                    d = position && ['M', position.x, position.y];

                    while (++pointIndex < len && showPath) {
                        point = points[pointIndex];
                        command = point.command || 'L';
                        position = this.anchor(point).absolutePosition;

                        if (command === 'Z') {
                            d[++dIndex] = command;
                        } else {
                            if (command !== points[pointIndex - 1].command) {
                                d[++dIndex] = command;
                            }

                            d[++dIndex] = position.x;
                            d[++dIndex] = position.y;
                        }

                        showPath = point.series.visible;
                    }

                    return showPath ?
                        this.chart.renderer.crispLine(d, this.graphic.strokeWidth()) :
                        null;
                },

                shouldBeDrawn: function () {
                    return controllableMixin.shouldBeDrawn.call(this) ||
                        Boolean(this.options.d);
                },

                render: function (parent) {
                    var options = this.options,
                        attrs = this.attrsFromOptions(options);

                    this.graphic = this.annotation.chart.renderer
                        .path(['M', 0, 0])
                        .attr(attrs)
                        .add(parent);

                    if (options.className) {
                        this.graphic.addClass(options.className);
                    }

                    this.tracker = this.annotation.chart.renderer
                        .path(['M', 0, 0])
                        .addClass('highcharts-tracker-line')
                        .attr({
                            zIndex: 2
                        })
                        .add(parent);

                    if (!this.annotation.chart.styledMode) {
                        this.tracker.attr({
                            'stroke-linejoin': 'round', // #1225
                            stroke: TRACKER_FILL,
                            fill: TRACKER_FILL,
                            'stroke-width': this.graphic.strokeWidth() +
                                options.snap * 2
                        });
                    }

                    controllableMixin.render.call(this);

                    H.extend(this.graphic, {
                        markerStartSetter: markerMixin.markerStartSetter,
                        markerEndSetter: markerMixin.markerEndSetter
                    });

                    this.setMarkers(this);
                },

                redraw: function (animation) {

                    var d = this.toD(),
                        action = animation ? 'animate' : 'attr';

                    if (d) {
                        this.graphic[action]({ d: d });
                        this.tracker[action]({ d: d });
                    } else {
                        this.graphic.attr({ d: 'M 0 ' + -9e9 });
                        this.tracker.attr({ d: 'M 0 ' + -9e9 });
                    }

                    this.graphic.placed = this.tracker.placed = Boolean(d);

                    controllableMixin.redraw.call(this, animation);
                }
            }
        );


        return ControllablePath;
    });
    _registerModule(_modules, 'annotations/controllable/ControllableRect.js', [_modules['parts/Globals.js'], _modules['annotations/controllable/controllableMixin.js'], _modules['annotations/controllable/ControllablePath.js']], function (H, controllableMixin, ControllablePath) {

        /**
         * A controllable rect class.
         *
         * @class
         * @mixes Annotation.controllableMixin
         * @memberOf Annotation
         *
         * @param {Highcharts.Annotation} annotation an annotation instance
         * @param {Object} options a rect's options
         * @param {number} index of the rectangle
         **/
        function ControllableRect(annotation, options, index) {
            this.init(annotation, options, index);
            this.collection = 'shapes';
        }

        /**
         * @typedef {Annotation.ControllablePath.AttrsMap}
         *          Annotation.ControllableRect.AttrsMap
         * @property {string} width=width
         * @property {string} height=height
         */

        /**
         * A map object which allows to map options attributes to element attributes
         *
         * @type {Annotation.ControllableRect.AttrsMap}
         */
        ControllableRect.attrsMap = H.merge(ControllablePath.attrsMap, {
            width: 'width',
            height: 'height'
        });

        H.merge(
            true,
            ControllableRect.prototype,
            controllableMixin, /** @lends Annotation.ControllableRect# */ {
                /**
                 * @type 'rect'
                 */
                type: 'rect',

                translate: controllableMixin.translateShape,

                render: function (parent) {
                    var attrs = this.attrsFromOptions(this.options);

                    this.graphic = this.annotation.chart.renderer
                        .rect(0, -9e9, 0, 0)
                        .attr(attrs)
                        .add(parent);

                    controllableMixin.render.call(this);
                },

                redraw: function (animation) {
                    var position = this.anchor(this.points[0]).absolutePosition;

                    if (position) {
                        this.graphic[animation ? 'animate' : 'attr']({
                            x: position.x,
                            y: position.y,
                            width: this.options.width,
                            height: this.options.height
                        });
                    } else {
                        this.attr({
                            x: 0,
                            y: -9e9
                        });
                    }

                    this.graphic.placed = Boolean(position);

                    controllableMixin.redraw.call(this, animation);
                }
            }
        );


        return ControllableRect;
    });
    _registerModule(_modules, 'annotations/controllable/ControllableCircle.js', [_modules['parts/Globals.js'], _modules['annotations/controllable/controllableMixin.js'], _modules['annotations/controllable/ControllablePath.js']], function (H, controllableMixin, ControllablePath) {

        /**
         * A controllable circle class.
         *
         * @constructor
         * @mixes Annotation.controllableMixin
         * @memberOf Annotation
         *
         * @param {Highcharts.Annotation} annotation an annotation instance
         * @param {Object} options a shape's options
         * @param {number} index of the circle
         **/
        function ControllableCircle(annotation, options, index) {
            this.init(annotation, options, index);
            this.collection = 'shapes';
        }

        /**
         * A map object which allows to map options attributes to element attributes.
         */
        ControllableCircle.attrsMap = H.merge(ControllablePath.attrsMap, {
            r: 'r'
        });

        H.merge(
            true,
            ControllableCircle.prototype,
            controllableMixin, /** @lends Annotation.ControllableCircle# */ {
                /**
                 * @type 'circle'
                 */
                type: 'circle',

                translate: controllableMixin.translateShape,

                render: function (parent) {
                    var attrs = this.attrsFromOptions(this.options);

                    this.graphic = this.annotation.chart.renderer
                        .circle(0, -9e9, 0)
                        .attr(attrs)
                        .add(parent);

                    controllableMixin.render.call(this);
                },

                redraw: function (animation) {
                    var position = this.anchor(this.points[0]).absolutePosition;

                    if (position) {
                        this.graphic[animation ? 'animate' : 'attr']({
                            x: position.x,
                            y: position.y,
                            r: this.options.r
                        });
                    } else {
                        this.graphic.attr({
                            x: 0,
                            y: -9e9
                        });
                    }

                    this.graphic.placed = Boolean(position);

                    controllableMixin.redraw.call(this, animation);
                },

                /**
                 * Set the radius.
                 *
                 * @param {number} r a radius to be set
                 */
                setRadius: function (r) {
                    this.options.r = r;
                }
            }
        );


        return ControllableCircle;
    });
    _registerModule(_modules, 'annotations/controllable/ControllableLabel.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['annotations/controllable/controllableMixin.js'], _modules['annotations/MockPoint.js']], function (H, U, controllableMixin, MockPoint) {

        var isNumber = U.isNumber;



        /**
         * @private
         * @interface Highcharts.AnnotationAnchorObject
         *//**
         * Relative to the plot area position
         * @name Highcharts.AnnotationAnchorObject#relativePosition
         * @type {Highcharts.AnnotationAnchorPositionObject}
         *//**
         * Absolute position
         * @name Highcharts.AnnotationAnchorObject#absolutePosition
         * @type {Highcharts.AnnotationAnchorPositionObject}
         */

        /**
         * An object which denotes an anchor position
         *
         * @private
         * @interface Highcharts.AnnotationAnchorPositionObject
         *//**
         * @name Highcharts.AnnotationAnchorPositionObject#x
         * @property {number}
         *//**
         * @name Highcharts.AnnotationAnchorPositionObject#y
         * @property {number}
         *//**
         * @name Highcharts.AnnotationAnchorPositionObject#height
         * @property {number}
         *//**
         * @name Highcharts.AnnotationAnchorPositionObject#width
         * @property {number}
         */

        /**
         * A controllable label class.
         *
         * @private
         * @class
         * @name Annotation.ControllableLabel
         *
         * @mixes Annotation.controllableMixin
         *
         * @param {Highcharts.Annotation} annotation an annotation instance
         * @param {object} options a label's options
         * @param {number} index of the label
         **/
        function ControllableLabel(annotation, options, index) {
            this.init(annotation, options, index);
            this.collection = 'labels';
        }

        /**
         * Shapes which do not have background - the object is used for proper
         * setting of the contrast color.
         *
         * @type {Array<string>}
         */
        ControllableLabel.shapesWithoutBackground = ['connector'];

        /**
         * Returns new aligned position based alignment options and box to align to.
         * It is almost a one-to-one copy from SVGElement.prototype.align
         * except it does not use and mutate an element
         *
         * @param {Object} alignOptions
         * @param {Object} box
         * @return {Annotation.controllableMixin.Position} aligned position
         */
        ControllableLabel.alignedPosition = function (alignOptions, box) {
            var align = alignOptions.align,
                vAlign = alignOptions.verticalAlign,
                x = (box.x || 0) + (alignOptions.x || 0),
                y = (box.y || 0) + (alignOptions.y || 0),

                alignFactor,
                vAlignFactor;

            if (align === 'right') {
                alignFactor = 1;
            } else if (align === 'center') {
                alignFactor = 2;
            }
            if (alignFactor) {
                x += (box.width - (alignOptions.width || 0)) / alignFactor;
            }

            if (vAlign === 'bottom') {
                vAlignFactor = 1;
            } else if (vAlign === 'middle') {
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
         *
         * @param {Object} label
         * @param {Object} alignOptions
         * @param {Object} alignAttr
         * @return {Object} justified options
         **/
        ControllableLabel.justifiedOptions = function (
            chart,
            label,
            alignOptions,
            alignAttr
        ) {
            var align = alignOptions.align,
                verticalAlign = alignOptions.verticalAlign,
                padding = label.box ? 0 : (label.padding || 0),
                bBox = label.getBBox(),
                off,

                options = {
                    align: align,
                    verticalAlign: verticalAlign,
                    x: alignOptions.x,
                    y: alignOptions.y,
                    width: label.width,
                    height: label.height
                },

                x = alignAttr.x - chart.plotLeft,
                y = alignAttr.y - chart.plotTop;

            // Off left
            off = x + padding;
            if (off < 0) {
                if (align === 'right') {
                    options.align = 'left';
                } else {
                    options.x = -off;
                }
            }

            // Off right
            off = x + bBox.width - padding;
            if (off > chart.plotWidth) {
                if (align === 'left') {
                    options.align = 'right';
                } else {
                    options.x = chart.plotWidth - off;
                }
            }

            // Off top
            off = y + padding;
            if (off < 0) {
                if (verticalAlign === 'bottom') {
                    options.verticalAlign = 'top';
                } else {
                    options.y = -off;
                }
            }

            // Off bottom
            off = y + bBox.height - padding;
            if (off > chart.plotHeight) {
                if (verticalAlign === 'top') {
                    options.verticalAlign = 'bottom';
                } else {
                    options.y = chart.plotHeight - off;
                }
            }

            return options;
        };

        /**
         * @typedef {Object} Annotation.ControllableLabel.AttrsMap
         * @property {string} backgroundColor=fill
         * @property {string} borderColor=stroke
         * @property {string} borderWidth=stroke-width
         * @property {string} zIndex=zIndex
         * @property {string} borderRadius=r
         * @property {string} padding=padding
         */

        /**
         * A map object which allows to map options attributes to element attributes
         *
         * @type {Annotation.ControllableLabel.AttrsMap}
         */
        ControllableLabel.attrsMap = {
            backgroundColor: 'fill',
            borderColor: 'stroke',
            borderWidth: 'stroke-width',
            zIndex: 'zIndex',
            borderRadius: 'r',
            padding: 'padding'
        };

        H.merge(
            true,
            ControllableLabel.prototype,
            controllableMixin, /** @lends Annotation.ControllableLabel# */ {
                /**
                 * Translate the point of the label by deltaX and deltaY translations.
                 * The point is the label's anchor.
                 *
                 * @param {number} dx translation for x coordinate
                 * @param {number} dy translation for y coordinate
                 **/
                translatePoint: function (dx, dy) {
                    controllableMixin.translatePoint.call(this, dx, dy, 0);
                },

                /**
                 * Translate x and y position relative to the label's anchor.
                 *
                 * @param {number} dx translation for x coordinate
                 * @param {number} dy translation for y coordinate
                 **/
                translate: function (dx, dy) {
                    var chart = this.annotation.chart,
                        // Annotation.options
                        labelOptions = this.annotation.userOptions,
                        // Chart.options.annotations
                        annotationIndex = chart.annotations.indexOf(this.annotation),
                        chartAnnotations = chart.options.annotations,
                        chartOptions = chartAnnotations[annotationIndex],
                        temp;

                    if (chart.inverted) {
                        temp = dx;
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
                },

                render: function (parent) {
                    var options = this.options,
                        attrs = this.attrsFromOptions(options),
                        style = options.style;

                    this.graphic = this.annotation.chart.renderer
                        .label(
                            '',
                            0,
                            -9999, // #10055
                            options.shape,
                            null,
                            null,
                            options.useHTML,
                            null,
                            'annotation-label'
                        )
                        .attr(attrs)
                        .add(parent);

                    if (!this.annotation.chart.styledMode) {
                        if (style.color === 'contrast') {
                            style.color = this.annotation.chart.renderer.getContrast(
                                ControllableLabel.shapesWithoutBackground.indexOf(
                                    options.shape
                                ) > -1 ? '#FFFFFF' : options.backgroundColor
                            );
                        }
                        this.graphic
                            .css(options.style)
                            .shadow(options.shadow);
                    }

                    if (options.className) {
                        this.graphic.addClass(options.className);
                    }

                    this.graphic.labelrank = options.labelrank;

                    controllableMixin.render.call(this);
                },

                redraw: function (animation) {
                    var options = this.options,
                        text = this.text || options.format || options.text,
                        label = this.graphic,
                        point = this.points[0],
                        show = false,
                        anchor,
                        attrs;

                    label.attr({
                        text: text ?
                            H.format(
                                text,
                                point.getLabelConfig(),
                                this.annotation.chart.time
                            ) :
                            options.formatter.call(point, this)
                    });

                    anchor = this.anchor(point);
                    attrs = this.position(anchor);
                    show = attrs;

                    if (show) {
                        label.alignAttr = attrs;

                        attrs.anchorX = anchor.absolutePosition.x;
                        attrs.anchorY = anchor.absolutePosition.y;

                        label[animation ? 'animate' : 'attr'](attrs);
                    } else {
                        label.attr({
                            x: 0,
                            y: -9999 // #10055
                        });
                    }

                    label.placed = Boolean(show);

                    controllableMixin.redraw.call(this, animation);
                },
                /**
                 * All basic shapes don't support alignTo() method except label.
                 * For a controllable label, we need to subtract translation from
                 * options.
                 */
                anchor: function () {
                    var anchor = controllableMixin.anchor.apply(this, arguments),
                        x = this.options.x || 0,
                        y = this.options.y || 0;

                    anchor.absolutePosition.x -= x;
                    anchor.absolutePosition.y -= y;

                    anchor.relativePosition.x -= x;
                    anchor.relativePosition.y -= y;

                    return anchor;
                },

                /**
                 * Returns the label position relative to its anchor.
                 *
                 * @param {Highcharts.AnnotationAnchorObject} anchor
                 *
                 * @return {Highcharts.AnnotationAnchorPositionObject|null} position
                 */
                position: function (anchor) {
                    var item = this.graphic,
                        chart = this.annotation.chart,
                        point = this.points[0],
                        itemOptions = this.options,
                        anchorAbsolutePosition = anchor.absolutePosition,
                        anchorRelativePosition = anchor.relativePosition,
                        itemPosition,
                        alignTo,
                        itemPosRelativeX,
                        itemPosRelativeY,

                        showItem =
                            point.series.visible &&
                            MockPoint.prototype.isInsidePane.call(point);

                    if (showItem) {

                        if (itemOptions.distance) {
                            itemPosition = H.Tooltip.prototype.getPosition.call(
                                {
                                    chart: chart,
                                    distance: H.pick(itemOptions.distance, 16)
                                },
                                item.width,
                                item.height,
                                {
                                    plotX: anchorRelativePosition.x,
                                    plotY: anchorRelativePosition.y,
                                    negative: point.negative,
                                    ttBelow: point.ttBelow,
                                    h: anchorRelativePosition.height ||
                                    anchorRelativePosition.width
                                }
                            );
                        } else if (itemOptions.positioner) {
                            itemPosition = itemOptions.positioner.call(this);
                        } else {
                            alignTo = {
                                x: anchorAbsolutePosition.x,
                                y: anchorAbsolutePosition.y,
                                width: 0,
                                height: 0
                            };

                            itemPosition = ControllableLabel.alignedPosition(
                                H.extend(itemOptions, {
                                    width: item.width,
                                    height: item.height
                                }),
                                alignTo
                            );

                            if (this.options.overflow === 'justify') {
                                itemPosition = ControllableLabel.alignedPosition(
                                    ControllableLabel.justifiedOptions(
                                        chart,
                                        item,
                                        itemOptions,
                                        itemPosition
                                    ),
                                    alignTo
                                );
                            }
                        }


                        if (itemOptions.crop) {
                            itemPosRelativeX = itemPosition.x - chart.plotLeft;
                            itemPosRelativeY = itemPosition.y - chart.plotTop;

                            showItem =
                                chart.isInsidePlot(
                                    itemPosRelativeX,
                                    itemPosRelativeY
                                ) &&
                                chart.isInsidePlot(
                                    itemPosRelativeX + item.width,
                                    itemPosRelativeY + item.height
                                );
                        }
                    }

                    return showItem ? itemPosition : null;
                }
            }
        );

        /* ********************************************************************** */

        /**
         * General symbol definition for labels with connector
         * @private
         */
        H.SVGRenderer.prototype.symbols.connector = function (x, y, w, h, options) {
            var anchorX = options && options.anchorX,
                anchorY = options && options.anchorY,
                path,
                yOffset,
                lateral = w / 2;

            if (isNumber(anchorX) && isNumber(anchorY)) {

                path = ['M', anchorX, anchorY];

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
                    path.push('L', x + lateral, y + h);

                    // Anchor above label
                } else if (anchorY < y) {
                    path.push('L', x + lateral, y);

                    // Anchor left of label
                } else if (anchorX < x) {
                    path.push('L', x, y + h / 2);

                    // Anchor right of label
                } else if (anchorX > x + w) {
                    path.push('L', x + w, y + h / 2);
                }
            }

            return path || [];
        };


        return ControllableLabel;
    });
    _registerModule(_modules, 'annotations/controllable/ControllableImage.js', [_modules['parts/Globals.js'], _modules['annotations/controllable/controllableMixin.js'], _modules['annotations/controllable/ControllableLabel.js']], function (H, controllableMixin, ControllableLabel) {

        /**
         * A controllable image class.
         *
         * @class
         * @mixes Annotation.controllableMixin
         * @memberOf Annotation
         *
         * @param {Highcharts.Annotation} annotation - an annotation instance
         * @param {Object} options a controllable's options
         * @param {number} index of the image
         **/
        function ControllableImage(annotation, options, index) {
            this.init(annotation, options, index);
            this.collection = 'shapes';
        }

        /**
         * @typedef {Object} Annotation.ControllableImage.AttrsMap
         * @property {string} width=width
         * @property {string} height=height
         * @property {string} zIndex=zIndex
         */

        /**
         * A map object which allows to map options attributes to element attributes
         *
         * @type {Annotation.ControllableImage.AttrsMap}
         */
        ControllableImage.attrsMap = {
            width: 'width',
            height: 'height',
            zIndex: 'zIndex'
        };

        H.merge(
            true,
            ControllableImage.prototype,
            controllableMixin, /** @lends Annotation.ControllableImage# */ {
                /**
                 * @type 'image'
                 */
                type: 'image',

                translate: controllableMixin.translateShape,

                render: function (parent) {
                    var attrs = this.attrsFromOptions(this.options),
                        options = this.options;

                    this.graphic = this.annotation.chart.renderer
                        .image(options.src, 0, -9e9, options.width, options.height)
                        .attr(attrs)
                        .add(parent);

                    this.graphic.width = options.width;
                    this.graphic.height = options.height;

                    controllableMixin.render.call(this);
                },

                redraw: function (animation) {
                    var anchor = this.anchor(this.points[0]),
                        position = ControllableLabel.prototype.position.call(
                            this,
                            anchor
                        );

                    if (position) {
                        this.graphic[animation ? 'animate' : 'attr']({
                            x: position.x,
                            y: position.y
                        });
                    } else {
                        this.graphic.attr({
                            x: 0,
                            y: -9e9
                        });
                    }

                    this.graphic.placed = Boolean(position);

                    controllableMixin.redraw.call(this, animation);
                }
            }
        );


        return ControllableImage;
    });
    _registerModule(_modules, 'annotations/annotations.src.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['annotations/controllable/controllableMixin.js'], _modules['annotations/controllable/ControllableRect.js'], _modules['annotations/controllable/ControllableCircle.js'], _modules['annotations/controllable/ControllablePath.js'], _modules['annotations/controllable/ControllableImage.js'], _modules['annotations/controllable/ControllableLabel.js'], _modules['annotations/eventEmitterMixin.js'], _modules['annotations/MockPoint.js'], _modules['annotations/ControlPoint.js']], function (H, U, controllableMixin, ControllableRect, ControllableCircle, ControllablePath, ControllableImage, ControllableLabel, eventEmitterMixin, MockPoint, ControlPoint) {
        /* *
         *
         *  (c) 2009-2017 Highsoft, Black Label
         *
         *  License: www.highcharts.com/license
         *
         * */



        var defined = U.defined,
            erase = U.erase,
            splat = U.splat;


        var merge = H.merge,
            addEvent = H.addEvent,
            fireEvent = H.fireEvent,
            find = H.find,
            pick = H.pick,
            reduce = H.reduce,
            destroyObjectProperties = H.destroyObjectProperties,
            chartProto = H.Chart.prototype;

        /* *********************************************************************
         *
         * ANNOTATION
         *
         ******************************************************************** */

        /**
         * @typedef {
         *          Annotation.ControllableCircle|
         *          Annotation.ControllableImage|
         *          Annotation.ControllablePath|
         *          Annotation.ControllableRect
         *          }
         *          Annotation.Shape
         */

        /**
         * @typedef {Annotation.ControllableLabel} Annotation.Label
         */

        /**
         * An annotation class which serves as a container for items like labels or
         * shapes. Created items are positioned on the chart either by linking them to
         * existing points or created mock points
         *
         * @class
         * @name Highcharts.Annotation
         *
         * @param {Highcharts.Chart} chart a chart instance
         * @param {Highcharts.AnnotationsOptions} options the options object
         */
        var Annotation = H.Annotation = function (chart, options) {
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
             * @type {Array<Annotation.ControlPoint>}
             */
            this.controlPoints = [];

            this.coll = 'annotations';

            /**
             * The array of labels which belong to the annotation.
             *
             * @type {Array<Annotation.Label>}
             */
            this.labels = [];

            /**
             * The array of shapes which belong to the annotation.
             *
             * @type {Array<Annotation.Shape>}
             */
            this.shapes = [];

            /**
             * The options for the annotations.
             *
             * @type {Highcharts.AnnotationsOptions}
             */
            // this.options = merge(this.defaultOptions, userOptions);
            this.options = options;

            /**
             * The user options for the annotations.
             *
             * @type {Highcharts.AnnotationsOptions}
             */
            this.userOptions = merge(true, {}, options);

            // Handle labels and shapes - those are arrays
            // Merging does not work with arrays (stores reference)
            labelsAndShapes = this.getLabelsAndShapesOptions(
                this.userOptions,
                options
            );
            this.userOptions.labels = labelsAndShapes.labels;
            this.userOptions.shapes = labelsAndShapes.shapes;

            /**
             * The callback that reports to the overlapping-labels module which
             * labels it should account for.
             *
             * @name labelCollector
             * @memberOf Annotation#
             * @type {Function}
             */

            /**
             * The group svg element.
             *
             * @name group
             * @memberOf Annotation#
             * @type {Highcharts.SVGElement}
             */

            /**
             * The group svg element of the annotation's shapes.
             *
             * @name shapesGroup
             * @memberOf Annotation#
             * @type {Highcharts.SVGElement}
             */

            /**
             * The group svg element of the annotation's labels.
             *
             * @name labelsGroup
             * @memberOf Annotation#
             * @type {Highcharts.SVGElement}
             */

            this.init(chart, options);
        };


        merge(
            true,
            Annotation.prototype,
            controllableMixin,
            eventEmitterMixin,
            /** @lends Annotation# */
            {

                /**
                 * List of events for `annotation.options.events` that should not be
                 * added to `annotation.graphic` but to the `annotation`.
                 *
                 * @type {Array<string>}
                 */
                nonDOMEvents: ['add', 'afterUpdate', 'remove'],

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
                 * @optionparent annotations
                 */
                defaultOptions: {

                    /**
                     * Sets an ID for an annotation. Can be user later when removing an
                     * annotation in [Chart#removeAnnotation(id)](
                     * /class-reference/Highcharts.Chart#removeAnnotation) method.
                     *
                     * @type      {string|number}
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
                     * Allow an annotation to be draggable by a user. Possible
                     * values are `"x"`, `"xy"`, `"y"` and `""` (disabled).
                     *
                     * @sample highcharts/annotations/draggable/
                     *         Annotations draggable: 'xy'
                     *
                     * @type       {string}
                     * @validvalue ["x", "xy", "y", ""]
                     */
                    draggable: 'xy',

                    /**
                     * Options for annotation's labels. Each label inherits options
                     * from the labelOptions object. An option from the labelOptions
                     * can be overwritten by config for a specific label.
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
                         * The background color or gradient for the annotation's label.
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
                        borderColor: 'black',

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
                        className: '',

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
                         * label. Note that if a `format` or `text` are defined, the
                         * format or text take precedence and the formatter is ignored.
                         * `This` refers to a point object.
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
                         * How to handle the annotation's label that flow outside the
                         * plot area. The justify option aligns the label inside the
                         * plot area.
                         *
                         * @sample highcharts/annotations/label-crop-overflow/
                         *         Crop or justify labels
                         *
                         * @validvalue ["allow", "justify"]
                         */
                        overflow: 'justify',

                        /**
                         * When either the borderWidth or the backgroundColor is set,
                         * this    is the padding within the box.
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
                         * The name of a symbol to use for the border around the label.
                         * Symbols are predefined functions on the Renderer object.
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
                     * An array of labels for the annotation. For options that apply to
                     * multiple labels, they can be added to the
                     * [labelOptions](annotations.labelOptions.html).
                     *
                     * @type      {Array<*>}
                     * @extends   annotations.labelOptions
                     * @apioption annotations.labels
                     */

                    /**
                     * This option defines the point to which the label will be
                     * connected. It can be either the point which exists in the
                     * series - it is referenced by the point's id - or a new point with
                     * defined x, y properties and optionally axes.
                     *
                     * @sample highcharts/annotations/mock-point/
                     *         Attach annotation to a mock point
                     *
                     * @type      {string|Highcharts.MockPointOptionsObject}
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
                     * This number defines which xAxis the point is connected to. It
                     * refers to either the axis id or the index of the axis in the
                     * xAxis array. If the option is not configured or the axis is not
                     * found the point's x coordinate refers to the chart pixels.
                     *
                     * @type      {number|string}
                     * @apioption annotations.labels.point.xAxis
                     */

                    /**
                     * This number defines which yAxis the point is connected to. It
                     * refers to either the axis id or the index of the axis in the
                     * yAxis array. If the option is not configured or the axis is not
                     * found the point's y coordinate refers to the chart pixels.
                     *
                     * @type      {number|string}
                     * @apioption annotations.labels.point.yAxis
                     */


                    /**
                     * An array of shapes for the annotation. For options that apply to
                     * multiple shapes, then can be added to the
                     * [shapeOptions](annotations.shapeOptions.html).
                     *
                     * @type      {Array<*>}
                     * @extends   annotations.shapeOptions
                     * @apioption annotations.shapes
                     */

                    /**
                     * This option defines the point to which the shape will be
                     * connected. It can be either the point which exists in the
                     * series - it is referenced by the point's id - or a new point with
                     * defined x, y properties and optionally axes.
                     *
                     * @type      {string|Highcharts.MockPointOptionsObject}
                     * @extends   annotations.labels.point
                     * @apioption annotations.shapes.point
                     */

                    /**
                     * An array of points for the shape. This option is available for
                     * shapes which can use multiple points such as path. A point can be
                     * either a point object or a point's id.
                     *
                     * @see [annotations.shapes.point](annotations.shapes.point.html)
                     *
                     * @type      {Array<string|Highcharts.MockPointOptionsObject>}
                     * @extends   annotations.labels.point
                     * @apioption annotations.shapes.points
                     */

                    /**
                     * Id of the marker which will be drawn at the final vertex of the
                     * path. Custom markers can be defined in defs property.
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
                     * Id of the marker which will be drawn at the first vertex of the
                     * path. Custom markers can be defined in defs property.
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
                     * Options for annotation's shapes. Each shape inherits options from
                     * the shapeOptions object. An option from the shapeOptions can be
                     * overwritten by config for a specific shape.
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
                         * @default   'rect'
                         * @apioption annotations.shapeOptions.type
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
                     * @type      {Annotation.ControlPoint.Options}
                     * @apioption annotations.controlPointOptions
                     */
                    controlPointOptions: {

                        /**
                         * @function {Annotation.ControlPoint.Positioner}
                         * @apioption annotations.controlPointOptions.positioner
                         */

                        symbol: 'circle',
                        width: 10,
                        height: 10,
                        style: {
                            stroke: 'black',
                            'stroke-width': 2,
                            fill: 'white'
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
                     */
                    events: {},

                    /**
                     * The Z index of the annotation.
                     */
                    zIndex: 6

                },

                /**
                 * Initialize the annotation.
                 *
                 * @param {Highcharts.Chart}
                 *        The chart
                 * @param {Highcharts.AnnotationsOptions}
                 *        The user options for the annotation
                 */
                init: function () {
                    this.linkPoints();
                    this.addControlPoints();
                    this.addShapes();
                    this.addLabels();
                    this.addClipPaths();
                    this.setLabelCollector();
                },

                getLabelsAndShapesOptions: function (baseOptions, newOptions) {
                    var mergedOptions = {};

                    ['labels', 'shapes'].forEach(function (name) {
                        if (baseOptions[name]) {
                            mergedOptions[name] = splat(newOptions[name]).map(
                                function (basicOptions, i) {
                                    return merge(baseOptions[name][i], basicOptions);
                                }
                            );
                        }
                    });

                    return mergedOptions;
                },

                addShapes: function () {
                    (this.options.shapes || []).forEach(
                        this.initShape,
                        this
                    );
                },

                addLabels: function () {
                    (this.options.labels || []).forEach(
                        this.initLabel,
                        this
                    );
                },

                addClipPaths: function () {
                    this.setClipAxes();

                    if (this.clipXAxis && this.clipYAxis) {
                        this.clipRect = this.chart.renderer.clipRect(
                            this.getClipBox()
                        );
                    }
                },

                setClipAxes: function () {
                    var xAxes = this.chart.xAxis,
                        yAxes = this.chart.yAxis,
                        linkedAxes = reduce(
                            (this.options.labels || [])
                                .concat(this.options.shapes || []),
                            function (axes, labelOrShape) {
                                return [
                                    xAxes[
                                        labelOrShape &&
                                        labelOrShape.point &&
                                        labelOrShape.point.xAxis
                                    ] || axes[0],
                                    yAxes[
                                        labelOrShape &&
                                        labelOrShape.point &&
                                        labelOrShape.point.yAxis
                                    ] || axes[1]
                                ];
                            },
                            []
                        );

                    this.clipXAxis = linkedAxes[0];
                    this.clipYAxis = linkedAxes[1];
                },

                getClipBox: function () {
                    return {
                        x: this.clipXAxis.left,
                        y: this.clipYAxis.top,
                        width: this.clipXAxis.width,
                        height: this.clipYAxis.height
                    };
                },

                setLabelCollector: function () {
                    var annotation = this;

                    annotation.labelCollector = function () {
                        return annotation.labels.reduce(
                            function (labels, label) {
                                if (!label.options.allowOverlap) {
                                    labels.push(label.graphic);
                                }

                                return labels;
                            },
                            []
                        );
                    };

                    annotation.chart.labelCollectors.push(
                        annotation.labelCollector
                    );
                },

                /**
                 * Set an annotation options.
                 *
                 * @param {Highcharts.AnnotationsOptions} - user options for an annotation
                 */
                setOptions: function (userOptions) {
                    this.options = merge(this.defaultOptions, userOptions);
                },

                redraw: function (animation) {
                    this.linkPoints();

                    if (!this.graphic) {
                        this.render();
                    }

                    if (this.clipRect) {
                        this.clipRect.animate(this.getClipBox());
                    }

                    this.redrawItems(this.shapes, animation);
                    this.redrawItems(this.labels, animation);


                    controllableMixin.redraw.call(this, animation);
                },

                /**
                 * @param {Array<(Annotation.Label|Annotation.Shape)>} items
                 * @param {boolean} [animation]
                 */
                redrawItems: function (items, animation) {
                    var i = items.length;

                    // needs a backward loop
                    // labels/shapes array might be modified
                    // due to destruction of the item
                    while (i--) {
                        this.redrawItem(items[i], animation);
                    }
                },

                render: function () {
                    var renderer = this.chart.renderer;

                    this.graphic = renderer
                        .g('annotation')
                        .attr({
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

                    if (this.clipRect) {
                        this.graphic.clip(this.clipRect);
                    }

                    this.addEvents();

                    controllableMixin.render.call(this);
                },

                /**
                 * Set the annotation's visibility.
                 *
                 * @param {Boolean} [visible] - Whether to show or hide an annotation.
                 * If the param is omitted, the annotation's visibility is toggled.
                 */
                setVisibility: function (visibility) {
                    var options = this.options,
                        visible = pick(visibility, !options.visible);

                    this.graphic.attr(
                        'visibility',
                        visible ? 'visible' : 'hidden'
                    );

                    if (!visible) {
                        this.setControlPointsVisibility(false);
                    }

                    options.visible = visible;
                },

                setControlPointsVisibility: function (visible) {
                    var setItemControlPointsVisibility = function (item) {
                        item.setControlPointsVisibility(visible);
                    };

                    controllableMixin.setControlPointsVisibility.call(
                        this,
                        visible
                    );

                    this.shapes.forEach(setItemControlPointsVisibility);
                    this.labels.forEach(setItemControlPointsVisibility);
                },

                /**
                 * Destroy the annotation. This function does not touch the chart
                 * that the annotation belongs to (all annotations are kept in
                 * the chart.annotations array) - it is recommended to use
                 * {@link Highcharts.Chart#removeAnnotation} instead.
                 */
                destroy: function () {
                    var chart = this.chart,
                        destroyItem = function (item) {
                            item.destroy();
                        };

                    this.labels.forEach(destroyItem);
                    this.shapes.forEach(destroyItem);

                    this.clipXAxis = null;
                    this.clipYAxis = null;

                    erase(chart.labelCollectors, this.labelCollector);

                    eventEmitterMixin.destroy.call(this);
                    controllableMixin.destroy.call(this);

                    destroyObjectProperties(this, chart);
                },

                /**
                 * See {@link Highcharts.Chart#removeAnnotation}.
                 */
                remove: function () {
                    // Let chart.update() remove annoations on demand
                    return this.chart.removeAnnotation(this);
                },

                update: function (userOptions) {
                    var chart = this.chart,
                        labelsAndShapes = this.getLabelsAndShapesOptions(
                            this.userOptions,
                            userOptions
                        ),
                        userOptionsIndex = chart.annotations.indexOf(this),
                        options = H.merge(true, this.userOptions, userOptions);

                    options.labels = labelsAndShapes.labels;
                    options.shapes = labelsAndShapes.shapes;

                    this.destroy();
                    this.constructor(chart, options);

                    // Update options in chart options, used in exporting (#9767):
                    chart.options.annotations[userOptionsIndex] = options;

                    this.isUpdating = true;
                    this.redraw();
                    this.isUpdating = false;
                    fireEvent(this, 'afterUpdate');
                },

                /* *************************************************************
                 * ITEM SECTION
                 * Contains methods for handling a single item in an annotation
                 **************************************************************** */

                /**
                 * Initialisation of a single shape
                 *
                 * @param {Object} shapeOptions - a confg object for a single shape
                 */
                initShape: function (shapeOptions, index) {
                    var options = merge(
                            this.options.shapeOptions,
                            {
                                controlPointOptions: this.options.controlPointOptions
                            },
                            shapeOptions
                        ),
                        shape = new Annotation.shapesMap[options.type](
                            this,
                            options,
                            index
                        );

                    shape.itemType = 'shape';

                    this.shapes.push(shape);

                    return shape;
                },

                /**
                 * Initialisation of a single label
                 *
                 * @param {Object} labelOptions
                 **/
                initLabel: function (labelOptions, index) {
                    var options = merge(
                            this.options.labelOptions,
                            {
                                controlPointOptions: this.options.controlPointOptions
                            },
                            labelOptions
                        ),
                        label = new ControllableLabel(
                            this,
                            options,
                            index
                        );

                    label.itemType = 'label';

                    this.labels.push(label);

                    return label;
                },

                /**
                 * Redraw a single item.
                 *
                 * @param {Annotation.Label|Annotation.Shape} item
                 * @param {boolean} [animation]
                 */
                redrawItem: function (item, animation) {
                    item.linkPoints();

                    if (!item.shouldBeDrawn()) {
                        this.destroyItem(item);
                    } else {
                        if (!item.graphic) {
                            this.renderItem(item);
                        }

                        item.redraw(
                            H.pick(animation, true) && item.graphic.placed
                        );

                        if (item.points.length) {
                            this.adjustVisibility(item);
                        }
                    }
                },

                /**
                 * Hide or show annotaiton attached to points.
                 *
                 * @param {Annotation.Label|Annotation.Shape} item
                 */

                adjustVisibility: function (item) { // #9481
                    var hasVisiblePoints = false,
                        label = item.graphic;

                    item.points.forEach(function (point) {
                        if (
                            point.series.visible !== false &&
                            point.visible !== false
                        ) {
                            hasVisiblePoints = true;
                        }
                    });

                    if (!hasVisiblePoints) {
                        label.hide();

                    } else if (label.visibility === 'hidden') {
                        label.show();
                    }
                },

                /**
                 * Destroy a single item.
                 *
                 * @param {Annotation.Label|Annotation.Shape} item
                 */
                destroyItem: function (item) {
                    // erase from shapes or labels array
                    erase(this[item.itemType + 's'], item);
                    item.destroy();
                },

                /**
                 * @private
                 */
                renderItem: function (item) {
                    item.render(
                        item.itemType === 'label' ?
                            this.labelsGroup :
                            this.shapesGroup
                    );
                }
            }
        );

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

        Annotation.types = {};

        Annotation.MockPoint = MockPoint;
        Annotation.ControlPoint = ControlPoint;

        H.extendAnnotation = function (
            Constructor,
            BaseConstructor,
            prototype,
            defaultOptions
        ) {
            BaseConstructor = BaseConstructor || Annotation;

            merge(
                true,
                Constructor.prototype,
                BaseConstructor.prototype,
                prototype
            );

            Constructor.prototype.defaultOptions = merge(
                Constructor.prototype.defaultOptions,
                defaultOptions || {}
            );
        };

        /* *********************************************************************
         *
         * EXTENDING CHART PROTOTYPE
         *
         ******************************************************************** */

        H.extend(chartProto, /** @lends Highcharts.Chart# */ {
            initAnnotation: function (userOptions) {
                var Constructor =
                    Annotation.types[userOptions.type] || Annotation,
                    options = H.merge(
                        Constructor.prototype.defaultOptions,
                        userOptions
                    ),
                    annotation = new Constructor(this, options);

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
                }

                return annotation;
            },

            /**
             * Remove an annotation from the chart.
             *
             * @param {String|Number|Annotation} idOrAnnotation - The annotation's id or
             *      direct annotation object.
             */
            removeAnnotation: function (idOrAnnotation) {
                var annotations = this.annotations,
                    annotation = idOrAnnotation.coll === 'annotations' ?
                        idOrAnnotation :
                        find(
                            annotations,
                            function (annotation) {
                                return annotation.options.id === idOrAnnotation;
                            }
                        );

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
                });
            }
        });

        // Let chart.update() update annotations
        chartProto.collectionsWithUpdate.push('annotations');

        // Let chart.update() create annoations on demand
        chartProto.collectionsWithInit.annotations = [chartProto.addAnnotation];

        chartProto.callbacks.push(function (chart) {
            chart.annotations = [];

            if (!chart.options.annotations) {
                chart.options.annotations = [];
            }

            chart.plotBoxClip = this.renderer.clipRect(this.plotBox);

            chart.controlPointsGroup = chart.renderer
                .g('control-points')
                .attr({ zIndex: 99 })
                .clip(chart.plotBoxClip)
                .add();

            chart.options.annotations.forEach(function (annotationOptions, i) {
                var annotation = chart.initAnnotation(annotationOptions);

                chart.options.annotations[i] = annotation.options;
            });

            chart.drawAnnotations();
            addEvent(chart, 'redraw', chart.drawAnnotations);
            addEvent(chart, 'destroy', function () {
                chart.plotBoxClip.destroy();
                chart.controlPointsGroup.destroy();
            });
        });

    });
    _registerModule(_modules, 'mixins/navigation.js', [], function () {
        /**
         *
         *  (c) 2010-2018 Paweł Fus
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
                        update: function (options, redraw) {
                            this.updates.forEach(function (updateConfig) {
                                updateConfig.update.call(updateConfig.context, options, redraw);
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
    _registerModule(_modules, 'annotations/navigationBindings.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js'], _modules['mixins/navigation.js']], function (H, U, chartNavigationMixin) {
        /* *
         *
         *  (c) 2009-2017 Highsoft, Black Label
         *
         *  License: www.highcharts.com/license
         *
         * */

        var isArray = U.isArray,
            isNumber = U.isNumber,
            isObject = U.isObject,
            objectEach = U.objectEach;


        var doc = H.doc,
            win = H.win,
            addEvent = H.addEvent,
            pick = H.pick,
            merge = H.merge,
            extend = H.extend,
            fireEvent = H.fireEvent,
            PREFIX = 'highcharts-';

        // IE 9-11 polyfill for Element.closest():
        function closestPolyfill(el, s) {
            var ElementProto = win.Element.prototype,
                elementMatches =
                    ElementProto.matches ||
                    ElementProto.msMatchesSelector ||
                    ElementProto.webkitMatchesSelector,
                ret = null;

            if (ElementProto.closest) {
                ret = ElementProto.closest.call(el, s);
            } else {
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
             * Update size of background (rect) in some annotations: Measure, Simple
             * Rect.
             *
             * @private
             * @function bindingsUtils.updateRectSize
             *
             * @param {global.Event} event
             *        Normalized browser event
             *
             * @param {Highcharts.Annotation} annotation
             *        Annotation to be updated
             */
            updateRectSize: function (event, annotation) {
                var chart = annotation.chart,
                    options = annotation.options.typeOptions,
                    coords = chart.pointer.getCoordinates(event),
                    width = coords.xAxis[0].value - options.point.x,
                    height = options.point.y - coords.yAxis[0].value;

                annotation.update({
                    typeOptions: {
                        background: {
                            width: chart.inverted ? height : width,
                            height: chart.inverted ? width : height
                        }
                    }
                });
            },

            /**
             * Get field type according to value
             *
             * @private
             * @function bindingsUtils.getFieldType
             *
             * @param {*} value
             *        Atomic type (one of: string, number, boolean)
             *
             * @return {string}
             *         Field type (one of: text, number, checkbox)
             */
            getFieldType: function (value) {
                return {
                    'string': 'text',
                    'number': 'number',
                    'boolean': 'checkbox'
                }[typeof value];
            }
        };

        H.NavigationBindings = function (chart, options) {
            this.chart = chart;
            this.options = options;
            this.eventsToUnbind = [];
            this.container = doc.getElementsByClassName(
                this.options.bindingsClassName
            );
        };

        // Define which options from annotations should show up in edit box:
        H.NavigationBindings.annotationsEditable = {
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
            crookedLine: []
        };

        // Define non editable fields per annotation, for example Rectangle inherits
        // options from Measure, but crosshairs are not available
        H.NavigationBindings.annotationsNonEditable = {
            rectangle: ['crosshairX', 'crosshairY', 'label']
        };

        extend(H.NavigationBindings.prototype, {
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
            /**
             * Initi all events conencted to NavigationBindings.
             *
             * @private
             * @function Highcharts.NavigationBindings#initEvents
             */
            initEvents: function () {
                var navigation = this,
                    chart = navigation.chart,
                    bindingsContainer = navigation.container,
                    options = navigation.options;

                // Shorthand object for getting events for buttons:
                navigation.boundClassNames = {};

                objectEach(options.bindings, function (value) {
                    navigation.boundClassNames[value.className] = value;
                });

                // Handle multiple containers with the same class names:
                [].forEach.call(bindingsContainer, function (subContainer) {
                    navigation.eventsToUnbind.push(
                        addEvent(
                            subContainer,
                            'click',
                            function (event) {
                                var bindings = navigation.getButtonEvents(
                                    bindingsContainer,
                                    event
                                );

                                if (bindings) {
                                    navigation.bindingsButtonClick(
                                        bindings.button,
                                        bindings.events,
                                        event
                                    );
                                }
                            }
                        )
                    );
                });

                objectEach(options.events || {}, function (callback, eventName) {
                    if (H.isFunction(callback)) {
                        navigation.eventsToUnbind.push(
                            addEvent(
                                navigation,
                                eventName,
                                callback
                            )
                        );
                    }
                });

                navigation.eventsToUnbind.push(
                    addEvent(chart.container, 'click', function (e) {
                        if (
                            !chart.cancelClick &&
                            chart.isInsidePlot(
                                e.chartX - chart.plotLeft,
                                e.chartY - chart.plotTop
                            )
                        ) {
                            navigation.bindingsChartClick(this, e);
                        }
                    })
                );
                navigation.eventsToUnbind.push(
                    addEvent(chart.container, 'mousemove', function (e) {
                        navigation.bindingsContainerMouseMove(this, e);
                    })
                );
            },

            /**
             * Common chart.update() delegation, shared between bindings and exporting.
             *
             * @private
             * @function Highcharts.NavigationBindings#initUpdate
             */
            initUpdate: function () {
                var navigation = this;

                chartNavigationMixin.addUpdate(
                    function (options) {
                        navigation.update(options);
                    },
                    this.chart
                );
            },

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
             * @param {object} [events]
             *        Events passed down from bindings (`init`, `start`, `step`, `end`)
             *
             * @param {global.Event} [clickEvent]
             *        Browser's click event
             */
            bindingsButtonClick: function (button, events, clickEvent) {
                var navigation = this,
                    chart = navigation.chart;

                if (navigation.selectedButtonElement) {
                    fireEvent(
                        navigation,
                        'deselectButton',
                        { button: navigation.selectedButtonElement }
                    );

                    if (navigation.nextEvent) {
                        // Remove in-progress annotations adders:
                        if (
                            navigation.currentUserDetails &&
                            navigation.currentUserDetails.coll === 'annotations'
                        ) {
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
            },
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
             * @param {global.Event} clickEvent
             *        Browser's click event.
             */
            bindingsChartClick: function (chartContainer, clickEvent) {
                var navigation = this,
                    chart = navigation.chart,
                    selectedButton = navigation.selectedButton,
                    svgContainer = chart.renderer.boxWrapper;

                // Click outside popups, should close them and deselect the annotation
                if (
                    navigation.activeAnnotation &&
                    !clickEvent.activeAnnotation &&
                    // Element could be removed in the child action, e.g. button
                    clickEvent.target.parentNode &&
                    // TO DO: Polyfill for IE11?
                    !closestPolyfill(clickEvent.target, '.' + PREFIX + 'popup')
                ) {
                    fireEvent(navigation, 'closePopup');
                    navigation.deselectAnnotation();
                }

                if (!selectedButton || !selectedButton.start) {
                    return;
                }


                if (!navigation.nextEvent) {
                    // Call init method:
                    navigation.currentUserDetails = selectedButton.start.call(
                        navigation,
                        clickEvent
                    );

                    // If steps exists (e.g. Annotations), bind them:
                    if (selectedButton.steps) {
                        navigation.stepIndex = 0;
                        navigation.steps = true;
                        navigation.mouseMoveEvent = navigation.nextEvent =
                            selectedButton.steps[navigation.stepIndex];
                    } else {

                        fireEvent(
                            navigation,
                            'deselectButton',
                            { button: navigation.selectedButtonElement }
                        );
                        svgContainer.removeClass(PREFIX + 'draw-mode');
                        navigation.steps = false;
                        navigation.selectedButton = null;
                        // First click is also the last one:
                        if (selectedButton.end) {
                            selectedButton.end.call(
                                navigation,
                                clickEvent,
                                navigation.currentUserDetails
                            );

                        }
                    }
                } else {

                    navigation.nextEvent(
                        clickEvent,
                        navigation.currentUserDetails
                    );

                    if (navigation.steps) {

                        navigation.stepIndex++;

                        if (selectedButton.steps[navigation.stepIndex]) {
                            // If we have more steps, bind them one by one:
                            navigation.mouseMoveEvent = navigation.nextEvent =
                                selectedButton.steps[navigation.stepIndex];
                        } else {
                            fireEvent(
                                navigation,
                                'deselectButton',
                                { button: navigation.selectedButtonElement }
                            );
                            svgContainer.removeClass(PREFIX + 'draw-mode');
                            // That was the last step, call end():
                            if (selectedButton.end) {
                                selectedButton.end.call(
                                    navigation,
                                    clickEvent,
                                    navigation.currentUserDetails
                                );
                            }
                            navigation.nextEvent = false;
                            navigation.mouseMoveEvent = false;
                            navigation.selectedButton = null;
                        }
                    }
                }
            },
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
            bindingsContainerMouseMove: function (container, moveEvent) {
                if (this.mouseMoveEvent) {
                    this.mouseMoveEvent(
                        moveEvent,
                        this.currentUserDetails
                    );
                }
            },
            /**
             * Translate fields (e.g. `params.period` or `marker.styles.color`) to
             * Highcharts options object (e.g. `{ params: { period } }`).
             *
             * @private
             * @function Highcharts.NavigationBindings#fieldsToOptions
             *
             * @param {object} fields
             *        Fields from popup form.
             *
             * @param {object} config
             *        Default config to be modified.
             *
             * @return {object}
             *         Modified config
             */
            fieldsToOptions: function (fields, config) {
                objectEach(fields, function (value, field) {
                    var parsedValue = parseFloat(value),
                        path = field.split('.'),
                        parent = config,
                        pathLength = path.length - 1;

                    // If it's a number (not "forma" options), parse it:
                    if (
                        isNumber(parsedValue) &&
                        !value.match(/px/g) &&
                        !field.match(/format/g)
                    ) {
                        value = parsedValue;
                    }

                    // Remove empty strings or values like 0
                    if (value !== '' && value !== 'undefined') {
                        path.forEach(function (name, index) {
                            var nextName = pick(path[index + 1], '');

                            if (pathLength === index) {
                                // Last index, put value:
                                parent[name] = value;
                            } else if (!parent[name]) {
                                // Create middle property:
                                parent[name] = nextName.match(/\d/g) ? [] : {};
                                parent = parent[name];
                            } else {
                                // Jump into next property
                                parent = parent[name];
                            }
                        });
                    }
                });
                return config;
            },
            /**
             * Shorthand method to deselect an annotation.
             *
             * @function Highcharts.NavigationBindings#deselectAnnotation
             */
            deselectAnnotation: function () {
                if (this.activeAnnotation) {
                    this.activeAnnotation.setControlPointsVisibility(false);
                    this.activeAnnotation = false;
                }
            },
            /**
             * Generates API config for popup in the same format as options for
             * Annotation object.
             *
             * @function Highcharts.NavigationBindings#annotationToFields
             *
             * @param {Highcharts.Annotation} annotation
             *        Annotations object
             *
             * @return {object}
             *         Annotation options to be displayed in popup box
             */
            annotationToFields: function (annotation) {
                var options = annotation.options,
                    editables = H.NavigationBindings.annotationsEditable,
                    nestedEditables = editables.nestedOptions,
                    getFieldType = this.utils.getFieldType,
                    type = pick(
                        options.type,
                        options.shapes && options.shapes[0] &&
                            options.shapes[0].type,
                        options.labels && options.labels[0] &&
                            options.labels[0].itemType,
                        'label'
                    ),
                    nonEditables = H.NavigationBindings
                        .annotationsNonEditable[options.langKey] || [],
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
                 * @function Highcharts.NavigationBindings#annotationToFields.traverse
                 *
                 * @param {*} option
                 *        Atomic type or object/array
                 *
                 * @param {string} key
                 *        Option name, for example "visible" or "x", "y"
                 *
                 * @param {object} allowed
                 *        Editables from H.NavigationBindings.annotationsEditable
                 *
                 * @param {object} parent
                 *        Where new options will be assigned
                 */
                function traverse(option, key, parentEditables, parent) {
                    var nextParent;

                    if (
                        parentEditables &&
                        nonEditables.indexOf(key) === -1 &&
                        (
                            (
                                parentEditables.indexOf &&
                                parentEditables.indexOf(key)
                            ) >= 0 ||
                            parentEditables[key] || // nested array
                            parentEditables === true // simple array
                        )
                    ) {
                        // Roots:
                        if (isArray(option)) {
                            parent[key] = [];

                            option.forEach(function (arrayOption, i) {
                                if (!isObject(arrayOption)) {
                                    // Simple arrays, e.g. [String, Number, Boolean]
                                    traverse(
                                        arrayOption,
                                        0,
                                        nestedEditables[key],
                                        parent[key]
                                    );
                                } else {
                                    // Advanced arrays, e.g. [Object, Object]
                                    parent[key][i] = {};
                                    objectEach(
                                        arrayOption,
                                        function (nestedOption, nestedKey) {
                                            traverse(
                                                nestedOption,
                                                nestedKey,
                                                nestedEditables[key],
                                                parent[key][i]
                                            );
                                        }
                                    );
                                }
                            });
                        } else if (isObject(option)) {
                            nextParent = {};
                            if (isArray(parent)) {
                                parent.push(nextParent);
                                nextParent[key] = {};
                                nextParent = nextParent[key];
                            } else {
                                parent[key] = nextParent;
                            }
                            objectEach(option, function (nestedOption, nestedKey) {
                                traverse(
                                    nestedOption,
                                    nestedKey,
                                    key === 0 ? parentEditables : nestedEditables[key],
                                    nextParent
                                );
                            });
                        } else {
                            // Leaf:
                            if (key === 'format') {
                                parent[key] = [
                                    H.format(
                                        option,
                                        annotation.labels[0].points[0]
                                    ).toString(),
                                    'text'
                                ];
                            } else if (isArray(parent)) {
                                parent.push([option, getFieldType(option)]);
                            } else {
                                parent[key] = [option, getFieldType(option)];
                            }
                        }
                    }
                }

                objectEach(options, function (option, key) {
                    if (key === 'typeOptions') {
                        visualOptions[key] = {};
                        objectEach(options[key], function (typeOption, typeKey) {
                            traverse(
                                typeOption,
                                typeKey,
                                nestedEditables,
                                visualOptions[key],
                                true
                            );
                        });
                    } else {
                        traverse(option, key, editables[type], visualOptions);
                    }
                });

                return visualOptions;
            },

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
             * @return {Array<string>}
             *         Array of class names with corresponding elements
             */
            getClickedClassNames: function (container, event) {
                var element = event.target,
                    classNames = [],
                    elemClassName;

                while (element) {
                    elemClassName = H.attr(element, 'class');
                    if (elemClassName) {
                        classNames = classNames.concat(
                            elemClassName.split(' ').map(
                                function (name) { // eslint-disable-line no-loop-func
                                    return [
                                        name,
                                        element
                                    ];
                                }
                            )
                        );
                    }
                    element = element.parentNode;

                    if (element === container) {
                        return classNames;
                    }
                }

                return classNames;

            },
            /**
             * Get events bound to a button. It's a custom event delegation to find all
             * events connected to the element.
             *
             * @function Highcharts.NavigationBindings#getButtonEvents
             *
             * @param {Highcharts.HTMLDOMElement}
             *        Container that event is bound to.
             *
             * @param {global.Event} event
             *        Browser's event.
             *
             * @return {object}
             *         Oject with events (init, start, steps, and end)
             */
            getButtonEvents: function (container, event) {
                var navigation = this,
                    classNames = this.getClickedClassNames(container, event),
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
            },
            /**
             * Bindings are just events, so the whole update process is simply
             * removing old events and adding new ones.
             *
             * @private
             * @function Highcharts.NavigationBindings#update
             */
            update: function (options) {
                this.options = merge(true, this.options, options);
                this.removeEvents();
                this.initEvents();
            },
            /**
             * Remove all events created in the navigation.
             *
             * @private
             * @function Highcharts.NavigationBindings#removeEvents
             */
            removeEvents: function () {
                this.eventsToUnbind.forEach(function (unbinder) {
                    unbinder();
                });
            },
            destroy: function () {
                this.removeEvents();
            },
            /**
             * General utils for bindings
             *
             * @private
             * @name Highcharts.NavigationBindings#utils
             * @type {bindingsUtils}
             */
            utils: bindingsUtils
        });

        H.Chart.prototype.initNavigationBindings = function () {
            var chart = this,
                options = chart.options;

            if (options && options.navigation && options.navigation.bindings) {
                chart.navigationBindings = new H.NavigationBindings(
                    chart,
                    options.navigation
                );
                chart.navigationBindings.initEvents();
                chart.navigationBindings.initUpdate();
            }
        };

        addEvent(H.Chart, 'load', function () {
            this.initNavigationBindings();
        });

        addEvent(H.Chart, 'destroy', function () {
            if (this.navigationBindings) {
                this.navigationBindings.destroy();
            }
        });

        addEvent(H.NavigationBindings, 'deselectButton', function () {
            this.selectedButtonElement = null;
        });

        addEvent(H.Annotation, 'remove', function () {
            if (this.chart.navigationBindings) {
                this.chart.navigationBindings.deselectAnnotation();
            }
        });


        // Show edit-annotation form:
        function selectableAnnotation(annotationType) {
            var originalClick = annotationType.prototype.defaultOptions.events &&
                    annotationType.prototype.defaultOptions.events.click;

            function selectAndshowPopup(event) {
                var annotation = this,
                    navigation = annotation.chart.navigationBindings,
                    prevAnnotation = navigation.activeAnnotation;

                if (originalClick) {
                    originalClick.click.call(annotation, event);
                }

                if (prevAnnotation !== annotation) {
                    // Select current:
                    navigation.deselectAnnotation();

                    navigation.activeAnnotation = annotation;
                    annotation.setControlPointsVisibility(true);

                    fireEvent(
                        navigation,
                        'showPopup',
                        {
                            annotation: annotation,
                            formType: 'annotation-toolbar',
                            options: navigation.annotationToFields(annotation),
                            onSubmit: function (data) {

                                var config = {},
                                    typeOptions;

                                if (data.actionType === 'remove') {
                                    navigation.activeAnnotation = false;
                                    navigation.chart.removeAnnotation(annotation);
                                } else {
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
                        }
                    );
                } else {
                    // Deselect current:
                    navigation.deselectAnnotation();
                    fireEvent(navigation, 'closePopup');
                }
                // Let bubble event to chart.click:
                event.activeAnnotation = true;
            }

            H.merge(
                true,
                annotationType.prototype.defaultOptions.events,
                {
                    click: selectAndshowPopup
                }
            );
        }

        if (H.Annotation) {
            // Basic shapes:
            selectableAnnotation(H.Annotation);

            // Advanced annotations:
            objectEach(H.Annotation.types, function (annotationType) {
                selectableAnnotation(annotationType);
            });
        }

        H.setOptions({
            /**
             * @optionparent lang
             */
            lang: {
                /**
                 * Configure the Popup strings in the chart. Requires the
                 * `annotations.js` or `annotations-advanced.src.js` module to be
                 * loaded.
                 *
                 * @since           7.0.0
                 * @type            {Object}
                 * @product         highcharts highstock
                 */
                navigation: {
                    /**
                     * Translations for all field names used in popup.
                     *
                     * @product         highcharts highstock
                     * @type            {Object}
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
                 * @type         {Highcharts.Dictionary<Highcharts.StockToolsBindingsObject>|*}
                 * @sample       stock/stocktools/stocktools-thresholds
                 *               Custom bindings in Highstock
                 * @since        7.0.0
                 * @product      highcharts highstock
                 */
                bindings: {
                    /**
                     * A circle annotation bindings. Includes `start` and one event in
                     * `steps` array.
                     *
                     * @type    {Highcharts.StockToolsBindingsObject}
                     * @default {"className": "highcharts-circle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                     */
                    circleAnnotation: {
                        /** @ignore */
                        className: 'highcharts-circle-annotation',
                        /** @ignore */
                        start: function (e) {
                            var coords = this.chart.pointer.getCoordinates(e),
                                navigation = this.chart.options.navigation,
                                controlPoints = [{
                                    positioner: function (target) {
                                        var xy = H.Annotation.MockPoint
                                                .pointToPixels(
                                                    target.points[0]
                                                ),
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
                                                position = this
                                                    .mouseMoveToTranslation(e);

                                            target.setRadius(
                                                Math.max(
                                                    target.options.r +
                                                        position.y /
                                                        Math.sin(Math.PI / 4),
                                                    5
                                                )
                                            );

                                            annotation.options.shapes[0] =
                                                annotation.userOptions.shapes[0] =
                                                target.options;

                                            target.redraw(false);
                                        }
                                    }
                                }];

                            return this.chart.addAnnotation(
                                merge(
                                    {
                                        langKey: 'circle',
                                        shapes: [{
                                            type: 'circle',
                                            point: {
                                                xAxis: 0,
                                                yAxis: 0,
                                                x: coords.xAxis[0].value,
                                                y: coords.yAxis[0].value
                                            },
                                            r: 5,
                                            controlPoints: controlPoints
                                        }]
                                    },
                                    navigation
                                        .annotationsOptions,
                                    navigation
                                        .bindings
                                        .circleAnnotation
                                        .annotationsOptions
                                )
                            );
                        },
                        /** @ignore */
                        steps: [
                            function (e, annotation) {
                                var point = annotation.options.shapes[0].point,
                                    x = this.chart.xAxis[0].toPixels(point.x),
                                    y = this.chart.yAxis[0].toPixels(point.y),
                                    inverted = this.chart.inverted,
                                    distance = Math.max(
                                        Math.sqrt(
                                            Math.pow(
                                                inverted ? y - e.chartX : x - e.chartX,
                                                2
                                            ) +
                                            Math.pow(
                                                inverted ? x - e.chartY : y - e.chartY,
                                                2
                                            )
                                        ),
                                        5
                                    );

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
                     * @type    {Highcharts.StockToolsBindingsObject}
                     * @default {"className": "highcharts-rectangle-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                     */
                    rectangleAnnotation: {
                        /** @ignore */
                        className: 'highcharts-rectangle-annotation',
                        /** @ignore */
                        start: function (e) {
                            var coords = this.chart.pointer.getCoordinates(e),
                                navigation = this.chart.options.navigation,
                                x = coords.xAxis[0].value,
                                y = coords.yAxis[0].value,
                                controlPoints = [{
                                    positioner: function (annotation) {
                                        var xy = H.Annotation.MockPoint
                                            .pointToPixels(
                                                annotation.shapes[0].points[2]
                                            );

                                        return {
                                            x: xy.x - 4,
                                            y: xy.y - 4
                                        };
                                    },
                                    events: {
                                        drag: function (e, target) {
                                            var coords = this.chart.pointer
                                                    .getCoordinates(e),
                                                x = coords.xAxis[0].value,
                                                y = coords.yAxis[0].value,
                                                shape = target.options.shapes[0],
                                                points = shape.points;

                                            // Top right point
                                            points[1].x = x;
                                            // Bottom right point (cursor position)
                                            points[2].x = x;
                                            points[2].y = y;
                                            // Bottom left
                                            points[3].y = y;

                                            target.options.shapes[0].points = points;

                                            target.redraw(false);
                                        }
                                    }
                                }];

                            return this.chart.addAnnotation(
                                merge(
                                    {
                                        langKey: 'rectangle',
                                        shapes: [{
                                            type: 'path',
                                            points: [{
                                                xAxis: 0,
                                                yAxis: 0,
                                                x: x,
                                                y: y
                                            }, {
                                                xAxis: 0,
                                                yAxis: 0,
                                                x: x,
                                                y: y
                                            }, {
                                                xAxis: 0,
                                                yAxis: 0,
                                                x: x,
                                                y: y
                                            }, {
                                                xAxis: 0,
                                                yAxis: 0,
                                                x: x,
                                                y: y
                                            }]
                                        }],
                                        controlPoints: controlPoints
                                    },
                                    navigation
                                        .annotationsOptions,
                                    navigation
                                        .bindings
                                        .rectangleAnnotation
                                        .annotationsOptions
                                )
                            );
                        },
                        /** @ignore */
                        steps: [
                            function (e, annotation) {
                                var points = annotation.options.shapes[0].points,
                                    coords = this.chart.pointer.getCoordinates(e),
                                    x = coords.xAxis[0].value,
                                    y = coords.yAxis[0].value;

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
                        ]
                    },
                    /**
                     * A label annotation bindings. Includes `start` event only.
                     *
                     * @type    {Highcharts.StockToolsBindingsObject}
                     * @default {"className": "highcharts-label-annotation", "start": function() {}, "steps": [function() {}], "annotationsOptions": {}}
                     */
                    labelAnnotation: {
                        /** @ignore */
                        className: 'highcharts-label-annotation',
                        /** @ignore */
                        start: function (e) {
                            var coords = this.chart.pointer.getCoordinates(e),
                                navigation = this.chart.options.navigation,
                                controlPoints = [{
                                    symbol: 'triangle-down',
                                    positioner: function (target) {
                                        if (!target.graphic.placed) {
                                            return {
                                                x: 0,
                                                y: -9e7
                                            };
                                        }

                                        var xy = H.Annotation.MockPoint
                                            .pointToPixels(
                                                target.points[0]
                                            );

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

                                            target.annotation.labels[0].options =
                                                target.options;

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

                                            target.annotation.labels[0].options =
                                                target.options;

                                            target.redraw(false);
                                        }
                                    }
                                }];

                            return this.chart.addAnnotation(
                                merge(
                                    {
                                        langKey: 'label',
                                        labelOptions: {
                                            format: '{y:.2f}'
                                        },
                                        labels: [{
                                            point: {
                                                xAxis: 0,
                                                yAxis: 0,
                                                x: coords.xAxis[0].value,
                                                y: coords.yAxis[0].value
                                            },
                                            overflow: 'none',
                                            crop: true,
                                            controlPoints: controlPoints
                                        }]
                                    },
                                    navigation
                                        .annotationsOptions,
                                    navigation
                                        .bindings
                                        .labelAnnotation
                                        .annotationsOptions
                                )
                            );
                        }
                    }
                },
                /**
                 * Path where Highcharts will look for icons. Change this to use
                 * icons from a different server.
                 *
                 * @since     7.1.3
                 * @apioption navigation.iconsURL
                 * @default   https://code.highcharts.com/7.1.3/gfx/stock-icons/
                 */

                /**
                 * A `showPopup` event. Fired when selecting for example an annotation.
                 *
                 * @type      {Function}
                 * @apioption navigation.events.showPopup
                 */

                /**
                 * A `hidePopop` event. Fired when Popup should be hidden, for exampole
                 * when clicking on an annotation again.
                 *
                 * @type      {Function}
                 * @apioption navigation.events.hidePopup
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
                 *            measure, pitchfork, tunnel, verticalLine
                 * @apioption navigation.annotationsOptions
                 */
                annotationsOptions: {}
            }
        });

    });
    _registerModule(_modules, 'annotations/popup.js', [_modules['parts/Globals.js'], _modules['parts/Utilities.js']], function (H, U) {
        /* *
         *
         *  Popup generator for Stock tools
         *
         *  (c) 2009-2017 Sebastian Bochan
         *
         *  License: www.highcharts.com/license
         *
         * */

        var defined = U.defined,
            isArray = U.isArray,
            isObject = U.isObject,
            isString = U.isString,
            objectEach = U.objectEach;

        var addEvent = H.addEvent,
            createElement = H.createElement,
            pick = H.pick,
            wrap = H.wrap,
            indexFilter = /\d/g,
            PREFIX = 'highcharts-',
            DIV = 'div',
            INPUT = 'input',
            LABEL = 'label',
            BUTTON = 'button',
            SELECT = 'select',
            OPTION = 'option',
            SPAN = 'span',
            UL = 'ul',
            LI = 'li',
            H3 = 'h3';

        // onContainerMouseDown blocks internal popup events, due to e.preventDefault.
        // Related issue #4606

        wrap(H.Pointer.prototype, 'onContainerMouseDown', function (proceed, e) {

            var popupClass = e.target && e.target.className;

            // elements is not in popup
            if (!(isString(popupClass) &&
                popupClass.indexOf(PREFIX + 'popup-field') >= 0)
            ) {
                proceed.apply(this, Array.prototype.slice.call(arguments, 1));
            }
        });

        H.Popup = function (parentDiv, iconsURL) {
            this.init(parentDiv, iconsURL);
        };

        H.Popup.prototype = {
            /**
             * Initialize the popup. Create base div and add close button.
             * @private
             * @param {HTMLDOMElement} - container where popup should be placed
             * @param {Object} - user options
             * @return {HTMLDOMElement} - return created popup's div
             */
            init: function (parentDiv, iconsURL) {

                // create popup div
                this.container = createElement(DIV, {
                    className: PREFIX + 'popup'
                }, null, parentDiv);

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

                // create close popup btn
                closeBtn = createElement(DIV, {
                    className: PREFIX + 'popup-close'
                }, null, this.container);

                closeBtn.style['background-image'] = 'url(' +
                        this.iconsURL + 'close.svg)';

                ['click', 'touchstart'].forEach(function (eventName) {
                    addEvent(closeBtn, eventName, function () {
                        _self.closePopup();
                    });
                });
            },
            /**
             * Create two columns (divs) in HTML.
             * @private
             * @param {HTMLDOMElement} - container of columns
             * @return {Object} - reference to two HTML columns
             */
            addColsContainer: function (container) {
                var rhsCol,
                    lhsCol;

                // left column
                lhsCol = createElement(DIV, {
                    className: PREFIX + 'popup-lhs-col'
                }, null, container);

                // right column
                rhsCol = createElement(DIV, {
                    className: PREFIX + 'popup-rhs-col'
                }, null, container);

                // wrapper content
                createElement(DIV, {
                    className: PREFIX + 'popup-rhs-col-wrapper'
                }, null, rhsCol);

                return {
                    lhsCol: lhsCol,
                    rhsCol: rhsCol
                };
            },
            /**
             * Create input with label.
             * @private
             * @param {String} - chain of fields i.e params.styles.fontSize
             * @param {String} - indicator type
             * @param {HTMLDOMElement} - container where elements should be added
             * @param {String} - dafault value of input i.e period value is 14,
             * extracted from defaultOptions (ADD mode) or series options (EDIT mode)
             */
            addInput: function (option, type, parentDiv, value) {
                var optionParamList = option.split('.'),
                    optionName = optionParamList[optionParamList.length - 1],
                    lang = this.lang,
                    inputName = PREFIX + type + '-' + optionName;

                if (!inputName.match(indexFilter)) {
                    // add label
                    createElement(
                        LABEL, {
                            innerHTML: lang[optionName] || optionName,
                            htmlFor: inputName
                        },
                        null,
                        parentDiv
                    );
                }

                // add input
                createElement(
                    INPUT,
                    {
                        name: inputName,
                        value: value[0],
                        type: value[1],
                        className: PREFIX + 'popup-field'
                    },
                    null,
                    parentDiv
                ).setAttribute(PREFIX + 'data-name', option);
            },
            /**
             * Create button.
             * @private
             * @param {HTMLDOMElement} - container where elements should be added
             * @param {String} - text placed as button label
             * @param {String} - add | edit | remove
             * @param {Function} - on click callback
             * @param {HTMLDOMElement} - container where inputs are generated
             * @return {HTMLDOMElement} - html button
             */
            addButton: function (parentDiv, label, type, callback, fieldsDiv) {
                var _self = this,
                    closePopup = this.closePopup,
                    getFields = this.getFields,
                    button;

                button = createElement(BUTTON, {
                    innerHTML: label
                }, null, parentDiv);

                ['click', 'touchstart'].forEach(function (eventName) {
                    addEvent(button, eventName, function () {
                        closePopup.call(_self);

                        return callback(
                            getFields(fieldsDiv, type)
                        );
                    });
                });

                return button;
            },
            /**
             * Get values from all inputs and create JSON.
             * @private
             * @param {HTMLDOMElement} - container where inputs are created
             * @param {String} - add | edit | remove
             * @return {Object} - fields
             */
            getFields: function (parentDiv, type) {

                var inputList = parentDiv.querySelectorAll('input'),
                    optionSeries = '#' + PREFIX + 'select-series > option:checked',
                    optionVolume = '#' + PREFIX + 'select-volume > option:checked',
                    linkedTo = parentDiv.querySelectorAll(optionSeries)[0],
                    volumeTo = parentDiv.querySelectorAll(optionVolume)[0],
                    seriesId,
                    param,
                    fieldsOutput;

                fieldsOutput = {
                    actionType: type,
                    linkedTo: linkedTo && linkedTo.getAttribute('value'),
                    fields: { }
                };

                [].forEach.call(inputList, function (input) {
                    param = input.getAttribute(PREFIX + 'data-name');
                    seriesId = input.getAttribute(PREFIX + 'data-series-id');

                    // params
                    if (seriesId) {
                        fieldsOutput.seriesId = input.value;
                    } else if (param) {
                        fieldsOutput.fields[param] = input.value;
                    } else {
                        // type like sma / ema
                        fieldsOutput.type = input.value;
                    }
                });

                if (volumeTo) {
                    fieldsOutput.fields['params.volumeSeriesID'] = volumeTo
                        .getAttribute('value');
                }

                return fieldsOutput;
            },
            /**
             * Reset content of the current popup and show.
             * @private
             * @param {Chart} - chart
             * @param {Function} - on click callback
             * @return {Object} - fields
             */
            showPopup: function () {

                var popupDiv = this.container,
                    toolbarClass = PREFIX + 'annotation-toolbar',
                    popupCloseBtn = popupDiv
                        .querySelectorAll('.' + PREFIX + 'popup-close')[0];

                // reset content
                popupDiv.innerHTML = '';

                // reset toolbar styles if exists
                if (popupDiv.className.indexOf(toolbarClass) >= 0) {
                    popupDiv.classList.remove(toolbarClass);

                    // reset toolbar inline styles
                    popupDiv.removeAttribute('style');
                }

                // add close button
                popupDiv.appendChild(popupCloseBtn);
                popupDiv.style.display = 'block';
            },
            /**
             * Hide popup.
             * @private
             */
            closePopup: function () {
                this.popup.container.style.display = 'none';
            },
            /**
             * Create content and show popup.
             * @private
             * @param {String} - type of popup i.e indicators
             * @param {Chart} - chart
             * @param {Object} - options
             * @param {Function} - on click callback
             */
            showForm: function (type, chart, options, callback) {

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
            },
            /**
             * Return lang definitions for popup.
             * @private
             * @return {Object} - elements translations.
             */
            getLangpack: function () {
                return H.getOptions().lang.navigation.popup;
            },
            annotations: {
                /**
                 * Create annotation simple form. It contains two buttons
                 * (edit / remove) and text label.
                 * @private
                 * @param {Chart} - chart
                 * @param {Object} - options
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
                    popupDiv.style.top = chart.plotTop + 10 + 'px';

                    // create label
                    createElement(SPAN, {
                        innerHTML: pick(
                            // Advanced annotations:
                            lang[options.langKey] || options.langKey,
                            // Basic shapes:
                            options.shapes && options.shapes[0].type
                        )
                    }, null, popupDiv);

                    // add buttons
                    button = this.addButton(
                        popupDiv,
                        lang.removeButton || 'remove',
                        'remove',
                        callback,
                        popupDiv
                    );

                    button.className += ' ' + PREFIX + 'annotation-remove-button';
                    button.style['background-image'] = 'url(' +
                        this.iconsURL + 'destroy.svg)';

                    button = this.addButton(
                        popupDiv,
                        lang.editButton || 'edit',
                        'edit',
                        function () {
                            showForm.call(
                                _self,
                                'annotation-edit',
                                chart,
                                options,
                                callback
                            );
                        },
                        popupDiv
                    );

                    button.className += ' ' + PREFIX + 'annotation-edit-button';
                    button.style['background-image'] = 'url(' +
                        this.iconsURL + 'edit.svg)';

                },
                /**
                 * Create annotation simple form.
                 * It contains fields with param names.
                 * @private
                 * @param {Chart} - chart
                 * @param {Object} - options
                 * @param {Function} - on click callback
                 * @param {Boolean} - if it is a form declared for init annotation
                 */
                addForm: function (chart, options, callback, isInit) {
                    var popupDiv = this.popup.container,
                        lang = this.lang,
                        bottomRow,
                        lhsCol;

                    // create title of annotations
                    lhsCol = createElement('h2', {
                        innerHTML: lang[options.langKey] || options.langKey,
                        className: PREFIX + 'popup-main-title'
                    }, null, popupDiv);

                    // left column
                    lhsCol = createElement(DIV, {
                        className: PREFIX + 'popup-lhs-col ' + PREFIX + 'popup-lhs-full'
                    }, null, popupDiv);

                    bottomRow = createElement(DIV, {
                        className: PREFIX + 'popup-bottom-row'
                    }, null, popupDiv);

                    this.annotations.addFormFields.call(
                        this,
                        lhsCol,
                        chart,
                        '',
                        options,
                        [],
                        true
                    );

                    this.addButton(
                        bottomRow,
                        isInit ?
                            (lang.addButton || 'add') :
                            (lang.saveButton || 'save'),
                        isInit ? 'add' : 'save',
                        callback,
                        popupDiv
                    );
                },
                /**
                 * Create annotation's form fields.
                 * @private
                 * @param {HTMLDOMElement} - div where inputs are placed
                 * @param {Chart} - chart
                 * @param {String} - name of parent to create chain of names
                 * @param {Object} - options
                 * @param {Array} - storage - array where all items are stored
                 * @param {Boolean} - isRoot - recursive flag for root
                 */
                addFormFields: function (
                    parentDiv,
                    chart,
                    parentNode,
                    options,
                    storage,
                    isRoot
                ) {
                    var _self = this,
                        addFormFields = this.annotations.addFormFields,
                        addInput = this.addInput,
                        lang = this.lang,
                        parentFullName,
                        titleName;

                    objectEach(options, function (value, option) {

                        // create name like params.styles.fontSize
                        parentFullName = parentNode !== '' ?
                            parentNode + '.' + option : option;

                        if (isObject(value)) {
                            if (
                                // value is object of options
                                !isArray(value) ||
                                // array of objects with params. i.e labels in Fibonacci
                                (isArray(value) && isObject(value[0]))
                            ) {
                                titleName = lang[option] || option;

                                if (!titleName.match(indexFilter)) {
                                    storage.push([
                                        true,
                                        titleName,
                                        parentDiv
                                    ]);
                                }

                                addFormFields.call(
                                    _self,
                                    parentDiv,
                                    chart,
                                    parentFullName,
                                    value,
                                    storage,
                                    false
                                );
                            } else {
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
                        storage = storage.sort(function (a) {
                            return a[1].match(/format/g) ? -1 : 1;
                        });

                        storage.forEach(function (genInput) {
                            if (genInput[0] === true) {
                                createElement(SPAN, {
                                    className: PREFIX + 'annotation-title',
                                    innerHTML: genInput[1]
                                }, null, genInput[2]);
                            } else {
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
                 * @param {Chart} - chart
                 * @param {Object} - options
                 * @param {Function} - on click callback
                 */
                addForm: function (chart, options, callback) {

                    var tabsContainers,
                        indicators = this.indicators,
                        lang = this.lang,
                        buttonParentDiv;

                    // add tabs
                    this.tabs.init.call(this, chart);

                    // get all tabs content divs
                    tabsContainers = this.popup.container
                        .querySelectorAll('.' + PREFIX + 'tab-item-content');

                    // ADD tab
                    this.addColsContainer(tabsContainers[0]);
                    indicators.addIndicatorList.call(
                        this,
                        chart,
                        tabsContainers[0],
                        'add'
                    );

                    buttonParentDiv = tabsContainers[0]
                        .querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0];

                    this.addButton(
                        buttonParentDiv,
                        lang.addButton || 'add',
                        'add',
                        callback,
                        buttonParentDiv
                    );

                    // EDIT tab
                    this.addColsContainer(tabsContainers[1]);
                    indicators.addIndicatorList.call(
                        this,
                        chart,
                        tabsContainers[1],
                        'edit'
                    );

                    buttonParentDiv = tabsContainers[1]
                        .querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0];

                    this.addButton(
                        buttonParentDiv,
                        lang.saveButton || 'save',
                        'edit',
                        callback,
                        buttonParentDiv
                    );
                    this.addButton(
                        buttonParentDiv,
                        lang.removeButton || 'remove',
                        'remove',
                        callback,
                        buttonParentDiv
                    );
                },
                /**
                 * Create HTML list of all indicators (ADD mode) or added indicators
                 * (EDIT mode).
                 * @private
                 * @param {Chart} - chart
                 * @param {HTMLDOMElement} - container where list is added
                 * @param {String} - 'edit' or 'add' mode
                 */
                addIndicatorList: function (chart, parentDiv, listType) {
                    var _self = this,
                        lhsCol = parentDiv
                            .querySelectorAll('.' + PREFIX + 'popup-lhs-col')[0],
                        rhsCol = parentDiv
                            .querySelectorAll('.' + PREFIX + 'popup-rhs-col')[0],
                        isEdit = listType === 'edit',
                        series = isEdit ? chart.series : // EDIT mode
                            chart.options.plotOptions, // ADD mode
                        addFormFields = this.indicators.addFormFields,
                        rhsColWrapper,
                        indicatorList,
                        item;

                    // create wrapper for list
                    indicatorList = createElement(UL, {
                        className: PREFIX + 'indicator-list'
                    }, null, lhsCol);

                    rhsColWrapper = rhsCol
                        .querySelectorAll('.' + PREFIX + 'popup-rhs-col-wrapper')[0];

                    objectEach(series, function (serie, value) {
                        var seriesOptions = serie.options;

                        if (
                            serie.params ||
                            seriesOptions && seriesOptions.params
                        ) {

                            var indicatorNameType = _self.indicators
                                    .getNameType(serie, value),
                                indicatorType = indicatorNameType.type;

                            item = createElement(LI, {
                                className: PREFIX + 'indicator-list',
                                innerHTML: indicatorNameType.name
                            }, null, indicatorList);

                            ['click', 'touchstart'].forEach(function (eventName) {
                                addEvent(item, eventName, function () {

                                    addFormFields.call(
                                        _self,
                                        chart,
                                        isEdit ? serie : series[indicatorType],
                                        indicatorNameType.type,
                                        rhsColWrapper
                                    );

                                    // add hidden input with series.id
                                    if (isEdit && serie.options) {
                                        createElement(INPUT, {
                                            type: 'hidden',
                                            name: PREFIX + 'id-' + indicatorType,
                                            value: serie.options.id
                                        }, null, rhsColWrapper)
                                            .setAttribute(
                                                PREFIX + 'data-series-id',
                                                serie.options.id
                                            );
                                    }
                                });
                            });
                        }
                    });

                    // select first item from the list
                    if (indicatorList.childNodes.length > 0) {
                        indicatorList.childNodes[0].click();
                    }
                },
                /**
                 * Extract full name and type of requested indicator.
                 * @private
                 * @param {Series} - series which name is needed.
                 * (EDIT mode - defaultOptions.series, ADD mode - indicator series).
                 * @param {String} - indicator type like: sma, ema, etc.
                 * @return {Object} - series name and type like: sma, ema, etc.
                 */
                getNameType: function (series, type) {
                    var options = series.options,
                        seriesTypes = H.seriesTypes,
                        // add mode
                        seriesName = seriesTypes[type] &&
                            seriesTypes[type].prototype.nameBase || type.toUpperCase(),
                        seriesType = type;

                    // edit
                    if (options && options.type) {
                        seriesType = series.options.type;
                        seriesName = series.name;
                    }

                    return {
                        name: seriesName,
                        type: seriesType
                    };
                },
                /**
                 * List all series with unique ID. Its mandatory for indicators to set
                 * correct linking.
                 * @private
                 * @param {String} - indicator type like: sma, ema, etc.
                 * @param {String} - type of select i.e series or volume.
                 * @param {Chart} - chart
                 * @param {HTMLDOMElement} - element where created HTML list is added
                 * @param {String} selectedOption
                 *         optional param for default value in dropdown
                 */
                listAllSeries: function (
                    type,
                    optionName,
                    chart,
                    parentDiv,
                    selectedOption
                ) {
                    var selectName = PREFIX + optionName + '-type-' + type,
                        lang = this.lang,
                        selectBox,
                        seriesOptions;

                    createElement(
                        LABEL, {
                            innerHTML: lang[optionName] || optionName,
                            htmlFor: selectName
                        },
                        null,
                        parentDiv
                    );

                    // select type
                    selectBox = createElement(
                        SELECT,
                        {
                            name: selectName,
                            className: PREFIX + 'popup-field'
                        },
                        null,
                        parentDiv
                    );

                    selectBox.setAttribute('id', PREFIX + 'select-' + optionName);

                    // list all series which have id - mandatory for creating indicator
                    chart.series.forEach(function (serie) {

                        seriesOptions = serie.options;

                        if (
                            !seriesOptions.params &&
                            seriesOptions.id &&
                            seriesOptions.id !== PREFIX + 'navigator-series'
                        ) {
                            createElement(
                                OPTION,
                                {
                                    innerHTML: seriesOptions.name || seriesOptions.id,
                                    value: seriesOptions.id
                                },
                                null,
                                selectBox
                            );
                        }
                    });

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
                 * @param {Chart} - chart
                 * @param {Series} - indicator
                 * @param {String} - indicator type like: sma, ema, etc.
                 * @param {HTMLDOMElement} - element where created HTML list is added
                 */
                addFormFields: function (chart, series, seriesType, rhsColWrapper) {
                    var fields = series.params || series.options.params,
                        getNameType = this.indicators.getNameType;

                    // reset current content
                    rhsColWrapper.innerHTML = '';

                    // create title (indicator name in the right column)
                    createElement(
                        H3,
                        {
                            className: PREFIX + 'indicator-title',
                            innerHTML: getNameType(series, seriesType).name
                        },
                        null,
                        rhsColWrapper
                    );

                    // input type
                    createElement(
                        INPUT,
                        {
                            type: 'hidden',
                            name: PREFIX + 'type-' + seriesType,
                            value: seriesType
                        },
                        null,
                        rhsColWrapper
                    );

                    // list all series with id
                    this.indicators.listAllSeries.call(
                        this,
                        seriesType,
                        'series',
                        chart,
                        rhsColWrapper,
                        series.linkedParent && fields.volumeSeriesID
                    );

                    if (fields.volumeSeriesID) {
                        this.indicators.listAllSeries.call(
                            this,
                            seriesType,
                            'volume',
                            chart,
                            rhsColWrapper,
                            series.linkedParent && series.linkedParent.options.id
                        );
                    }

                    // add param fields
                    this.indicators.addParamInputs.call(
                        this,
                        chart,
                        'params',
                        fields,
                        seriesType,
                        rhsColWrapper
                    );
                },
                /**
                 * Recurent function which lists all fields, from params object and
                 * create them as inputs. Each input has unique `data-name` attribute,
                 * which keeps chain of fields i.e params.styles.fontSize.
                 * @private
                 * @param {Chart} - chart
                 * @param {String} - name of parent to create chain of names
                 * @param {Series} - fields - params which are based for input create
                 * @param {String} - indicator type like: sma, ema, etc.
                 * @param {HTMLDOMElement} - element where created HTML list is added
                 */
                addParamInputs: function (chart, parentNode, fields, type, parentDiv) {
                    var _self = this,
                        addParamInputs = this.indicators.addParamInputs,
                        addInput = this.addInput,
                        parentFullName;

                    objectEach(fields, function (value, fieldName) {
                        // create name like params.styles.fontSize
                        parentFullName = parentNode + '.' + fieldName;

                        if (isObject(value)) {
                            addParamInputs.call(
                                _self,
                                chart,
                                parentFullName,
                                value,
                                type,
                                parentDiv
                            );
                        } else if (
                        // skip volume field which is created by addFormFields
                            parentFullName !== 'params.volumeSeriesID'
                        ) {
                            addInput.call(
                                _self,
                                parentFullName,
                                type,
                                parentDiv,
                                [value, 'text'] // all inputs are text type
                            );
                        }
                    });
                },
                /**
                 * Get amount of indicators added to chart.
                 * @private
                 * @return {Number} - Amount of indicators
                 */
                getAmount: function () {
                    var series = this.series,
                        counter = 0;

                    objectEach(series, function (serie) {
                        var seriesOptions = serie.options;

                        if (
                            serie.params ||
                            seriesOptions && seriesOptions.params
                        ) {
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
                 * @param {Chart} - reference to current chart
                 */
                init: function (chart) {
                    var tabs = this.tabs,
                        indicatorsCount = this.indicators.getAmount.call(chart),
                        firstTab; // run by default

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
                 * @param {String} - `add` or `edit`
                 * @param {Number} - Disable tab when 0
                 * @return {HTMLDOMElement} - created HTML tab-menu element
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
                    menuItem = createElement(
                        SPAN,
                        {
                            innerHTML: lang[tabName + 'Button'] || tabName,
                            className: className
                        },
                        null,
                        popupDiv
                    );

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

                    return createElement(
                        DIV,
                        {
                            className: PREFIX + 'tab-item-content'
                        },
                        null,
                        popupDiv
                    );
                },
                /**
                 * Add click event to each tab
                 * @private
                 * @param {Number} - Disable tab when 0
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
                 * @param {HTMLDOMElement} - current tab
                 * @param {Number} - Index of tab in menu
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

        addEvent(H.NavigationBindings, 'showPopup', function (config) {
            if (!this.popup) {
                // Add popup to main container
                this.popup = new H.Popup(
                    this.chart.container, (
                        this.chart.options.navigation.iconsURL ||
                        (
                            this.chart.options.stockTools &&
                            this.chart.options.stockTools.gui.iconsURL
                        ) ||
                        'https://code.highcharts.com/7.1.3/gfx/stock-icons/'
                    )
                );
            }

            this.popup.showForm(
                config.formType,
                this.chart,
                config.options,
                config.onSubmit
            );
        });

        addEvent(H.NavigationBindings, 'closePopup', function () {
            if (this.popup) {
                this.popup.closePopup();
            }
        });

    });
    _registerModule(_modules, 'masters/modules/annotations.src.js', [], function () {


    });
}));