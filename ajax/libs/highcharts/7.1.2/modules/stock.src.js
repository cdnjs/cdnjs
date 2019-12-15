/**
 * @license Highcharts JS v7.1.2 (2019-06-04)
 *
 * Highstock as a plugin for Highcharts
 *
 * (c) 2010-2019 Torstein Honsi
 *
 * License: www.highcharts.com/license
 */
'use strict';
(function (factory) {
    if (typeof module === 'object' && module.exports) {
        factory['default'] = factory;
        module.exports = factory;
    } else if (typeof define === 'function' && define.amd) {
        define('highcharts/modules/stock', ['highcharts'], function (Highcharts) {
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
    _registerModule(_modules, 'parts/Scrollbar.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */



        var addEvent = H.addEvent,
            Axis = H.Axis,
            correctFloat = H.correctFloat,
            defaultOptions = H.defaultOptions,
            defined = H.defined,
            destroyObjectProperties = H.destroyObjectProperties,
            fireEvent = H.fireEvent,
            hasTouch = H.hasTouch,
            isTouchDevice = H.isTouchDevice,
            merge = H.merge,
            pick = H.pick,
            removeEvent = H.removeEvent,
            swapXY;

        /**
         *
         * The scrollbar is a means of panning over the X axis of a stock chart.
         * Scrollbars can  also be applied to other types of axes.
         *
         * Another approach to scrollable charts is the [chart.scrollablePlotArea](
         * https://api.highcharts.com/highcharts/chart.scrollablePlotArea) option that
         * is especially suitable for simpler cartesian charts on mobile.
         *
         * In styled mode, all the presentational options for the
         * scrollbar are replaced by the classes `.highcharts-scrollbar-thumb`,
         * `.highcharts-scrollbar-arrow`, `.highcharts-scrollbar-button`,
         * `.highcharts-scrollbar-rifles` and `.highcharts-scrollbar-track`.
         *
         * @sample stock/yaxis/inverted-bar-scrollbar/
         *         A scrollbar on a simple bar chart
         *
         * @product highstock gantt
         * @optionparent scrollbar
         */
        var defaultScrollbarOptions = {

            /**
             * The height of the scrollbar. The height also applies to the width
             * of the scroll arrows so that they are always squares. Defaults to
             * 20 for touch devices and 14 for mouse devices.
             *
             * @sample stock/scrollbar/height/
             *         A 30px scrollbar
             *
             * @type    {number}
             * @default 20/14
             */
            height: isTouchDevice ? 20 : 14,

            /**
             * The border rounding radius of the bar.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderRadius: 0,

            /**
             * The corner radius of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderRadius: 0,

            /**
             * Enable or disable the scrollbar.
             *
             * @sample stock/scrollbar/enabled/
             *         Disable the scrollbar, only use navigator
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.enabled
             */

            /**
             * Whether to redraw the main chart as the scrollbar or the navigator
             * zoomed window is moved. Defaults to `true` for modern browsers and
             * `false` for legacy IE browsers as well as mobile devices.
             *
             * @sample stock/scrollbar/liveredraw
             *         Setting live redraw to false
             *
             * @type  {boolean}
             * @since 1.3
             */
            liveRedraw: undefined,

            /**
             * The margin between the scrollbar and its axis when the scrollbar is
             * applied directly to an axis.
             */
            margin: 10,

            /**
             * The minimum width of the scrollbar.
             *
             * @since 1.2.5
             */
            minWidth: 6,

            /**
             * Whether to show or hide the scrollbar when the scrolled content is
             * zoomed out to it full extent.
             *
             * @type      {boolean}
             * @default   true
             * @apioption scrollbar.showFull
             */

            step: 0.2,

            /**
             * The z index of the scrollbar group.
             */
            zIndex: 3,

            /**
             * The background color of the scrollbar itself.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            barBackgroundColor: '#cccccc',

            /**
             * The width of the bar's border.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            barBorderWidth: 1,

            /**
             * The color of the scrollbar's border.
             *
             * @type {Highcharts.ColorString}
             */
            barBorderColor: '#cccccc',

            /**
             * The color of the small arrow inside the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonArrowColor: '#333333',

            /**
             * The color of scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            buttonBackgroundColor: '#e6e6e6',

            /**
             * The color of the border of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString}
             */
            buttonBorderColor: '#cccccc',

            /**
             * The border width of the scrollbar buttons.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            buttonBorderWidth: 1,

            /**
             * The color of the small rifles in the middle of the scrollbar.
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            rifleColor: '#333333',

            /**
             * The color of the track background.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             */
            trackBackgroundColor: '#f2f2f2',

            /**
             * The color of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type {Highcharts.ColorString}
             */
            trackBorderColor: '#f2f2f2',

            /**
             * The corner radius of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             *
             * @type      {number}
             * @default   0
             * @apioption scrollbar.trackBorderRadius
             */

            /**
             * The width of the border of the scrollbar track.
             *
             * @sample stock/scrollbar/style/
             *         Scrollbar styling
             */
            trackBorderWidth: 1
        };

        defaultOptions.scrollbar = merge(
            true,
            defaultScrollbarOptions,
            defaultOptions.scrollbar
        );

        /**
         * When we have vertical scrollbar, rifles and arrow in buttons should be
         * rotated. The same method is used in Navigator's handles, to rotate them.
         *
         * @function Highcharts.swapXY
         *
         * @param {Array<number|string>} path
         *        Path to be rotated.
         *
         * @param {boolean} vertical
         *        If vertical scrollbar, swap x-y values.
         *
         * @return {Array<number|string>}
         */
        H.swapXY = swapXY = function (path, vertical) {
            var i,
                len = path.length,
                temp;

            if (vertical) {
                for (i = 0; i < len; i += 3) {
                    temp = path[i + 1];
                    path[i + 1] = path[i + 2];
                    path[i + 2] = temp;
                }
            }

            return path;
        };

        /**
         * A reusable scrollbar, internally used in Highstock's navigator and optionally
         * on individual axes.
         *
         * @private
         * @class
         * @name Highcharts.Scrollbar
         *
         * @param {Highcharts.SVGRenderer} renderer
         *
         * @param {Highcharts.ScrollbarOptions} options
         *
         * @param {Highcharts.Chart} chart
         */
        function Scrollbar(renderer, options, chart) { // docs
            this.init(renderer, options, chart);
        }

        Scrollbar.prototype = {

            /**
             * @private
             * @function Highcharts.Scrollbar#init
             *
             * @param {Highcharts.SVGRenderer} renderer
             *
             * @param {Highcharts.ScrollbarOptions} options
             *
             * @param {Highcharts.Chart} chart
             */
            init: function (renderer, options, chart) {

                this.scrollbarButtons = [];

                this.renderer = renderer;

                this.userOptions = options;
                this.options = merge(defaultScrollbarOptions, options);

                this.chart = chart;

                // backward compatibility
                this.size = pick(this.options.size, this.options.height);

                // Init
                if (options.enabled) {
                    this.render();
                    this.initEvents();
                    this.addEvents();
                }
            },

            /**
             * Render scrollbar with all required items.
             *
             * @private
             * @function Highcharts.Scrollbar#render
             */
            render: function () {
                var scroller = this,
                    renderer = scroller.renderer,
                    options = scroller.options,
                    size = scroller.size,
                    styledMode = this.chart.styledMode,
                    group;

                // Draw the scrollbar group
                scroller.group = group = renderer.g('scrollbar').attr({
                    zIndex: options.zIndex,
                    translateY: -99999
                }).add();

                // Draw the scrollbar track:
                scroller.track = renderer.rect()
                    .addClass('highcharts-scrollbar-track')
                    .attr({
                        x: 0,
                        r: options.trackBorderRadius || 0,
                        height: size,
                        width: size
                    }).add(group);

                if (!styledMode) {
                    scroller.track.attr({
                        fill: options.trackBackgroundColor,
                        stroke: options.trackBorderColor,
                        'stroke-width': options.trackBorderWidth
                    });
                }

                this.trackBorderWidth = scroller.track.strokeWidth();
                scroller.track.attr({
                    y: -this.trackBorderWidth % 2 / 2
                });


                // Draw the scrollbar itself
                scroller.scrollbarGroup = renderer.g().add(group);

                scroller.scrollbar = renderer.rect()
                    .addClass('highcharts-scrollbar-thumb')
                    .attr({
                        height: size,
                        width: size,
                        r: options.barBorderRadius || 0
                    }).add(scroller.scrollbarGroup);

                scroller.scrollbarRifles = renderer
                    .path(swapXY([
                        'M',
                        -3, size / 4,
                        'L',
                        -3, 2 * size / 3,
                        'M',
                        0, size / 4,
                        'L',
                        0, 2 * size / 3,
                        'M',
                        3, size / 4,
                        'L',
                        3, 2 * size / 3
                    ], options.vertical))
                    .addClass('highcharts-scrollbar-rifles')
                    .add(scroller.scrollbarGroup);

                if (!styledMode) {
                    scroller.scrollbar.attr({
                        fill: options.barBackgroundColor,
                        stroke: options.barBorderColor,
                        'stroke-width': options.barBorderWidth
                    });
                    scroller.scrollbarRifles.attr({
                        stroke: options.rifleColor,
                        'stroke-width': 1
                    });
                }

                scroller.scrollbarStrokeWidth = scroller.scrollbar.strokeWidth();
                scroller.scrollbarGroup.translate(
                    -scroller.scrollbarStrokeWidth % 2 / 2,
                    -scroller.scrollbarStrokeWidth % 2 / 2
                );

                // Draw the buttons:
                scroller.drawScrollbarButton(0);
                scroller.drawScrollbarButton(1);
            },

            /**
             * Position the scrollbar, method called from a parent with defined
             * dimensions.
             *
             * @private
             * @function Highcharts.Scrollbar#position
             *
             * @param {number} x
             *        x-position on the chart
             *
             * @param {number} y
             *        y-position on the chart
             *
             * @param {number} width
             *        width of the scrollbar
             *
             * @param {number} height
             *        height of the scorllbar
             */
            position: function (x, y, width, height) {
                var scroller = this,
                    options = scroller.options,
                    vertical = options.vertical,
                    xOffset = height,
                    yOffset = 0,
                    method = scroller.rendered ? 'animate' : 'attr';

                scroller.x = x;
                scroller.y = y + this.trackBorderWidth;
                scroller.width = width; // width with buttons
                scroller.height = height;
                scroller.xOffset = xOffset;
                scroller.yOffset = yOffset;

                // If Scrollbar is a vertical type, swap options:
                if (vertical) {
                    scroller.width = scroller.yOffset = width = yOffset = scroller.size;
                    scroller.xOffset = xOffset = 0;
                    scroller.barWidth = height - width * 2; // width without buttons
                    scroller.x = x = x + scroller.options.margin;
                } else {
                    scroller.height = scroller.xOffset = height = xOffset =
                        scroller.size;
                    scroller.barWidth = width - height * 2; // width without buttons
                    scroller.y = scroller.y + scroller.options.margin;
                }

                // Set general position for a group:
                scroller.group[method]({
                    translateX: x,
                    translateY: scroller.y
                });

                // Resize background/track:
                scroller.track[method]({
                    width: width,
                    height: height
                });

                // Move right/bottom button ot it's place:
                scroller.scrollbarButtons[1][method]({
                    translateX: vertical ? 0 : width - xOffset,
                    translateY: vertical ? height - yOffset : 0
                });
            },

            /**
             * Draw the scrollbar buttons with arrows
             *
             * @private
             * @function Highcharts.Scrollbar#drawScrollbarButton
             *
             * @param {number} index
             *        0 is left, 1 is right
             */
            drawScrollbarButton: function (index) {
                var scroller = this,
                    renderer = scroller.renderer,
                    scrollbarButtons = scroller.scrollbarButtons,
                    options = scroller.options,
                    size = scroller.size,
                    group,
                    tempElem;

                group = renderer.g().add(scroller.group);
                scrollbarButtons.push(group);

                // Create a rectangle for the scrollbar button
                tempElem = renderer.rect()
                    .addClass('highcharts-scrollbar-button')
                    .add(group);

                // Presentational attributes
                if (!this.chart.styledMode) {
                    tempElem.attr({
                        stroke: options.buttonBorderColor,
                        'stroke-width': options.buttonBorderWidth,
                        fill: options.buttonBackgroundColor
                    });
                }

                // Place the rectangle based on the rendered stroke width
                tempElem.attr(tempElem.crisp({
                    x: -0.5,
                    y: -0.5,
                    width: size + 1, // +1 to compensate for crispifying in rect method
                    height: size + 1,
                    r: options.buttonBorderRadius
                }, tempElem.strokeWidth()));

                // Button arrow
                tempElem = renderer
                    .path(swapXY([
                        'M',
                        size / 2 + (index ? -1 : 1),
                        size / 2 - 3,
                        'L',
                        size / 2 + (index ? -1 : 1),
                        size / 2 + 3,
                        'L',
                        size / 2 + (index ? 2 : -2),
                        size / 2
                    ], options.vertical))
                    .addClass('highcharts-scrollbar-arrow')
                    .add(scrollbarButtons[index]);

                if (!this.chart.styledMode) {
                    tempElem.attr({
                        fill: options.buttonArrowColor
                    });
                }
            },

            /**
             * Set scrollbar size, with a given scale.
             *
             * @private
             * @function Highcharts.Scrollbar#setRange
             *
             * @param {number} from
             *        scale (0-1) where bar should start
             *
             * @param {number} to
             *        scale (0-1) where bar should end
             */
            setRange: function (from, to) {
                var scroller = this,
                    options = scroller.options,
                    vertical = options.vertical,
                    minWidth = options.minWidth,
                    fullWidth = scroller.barWidth,
                    fromPX,
                    toPX,
                    newPos,
                    newSize,
                    newRiflesPos,
                    method = (
                        this.rendered &&
                        !this.hasDragged &&
                        !(this.chart.navigator && this.chart.navigator.hasDragged)
                    ) ? 'animate' : 'attr';

                if (!defined(fullWidth)) {
                    return;
                }

                from = Math.max(from, 0);
                fromPX = Math.ceil(fullWidth * from);
                toPX = fullWidth * Math.min(to, 1);
                scroller.calculatedWidth = newSize = correctFloat(toPX - fromPX);

                // We need to recalculate position, if minWidth is used
                if (newSize < minWidth) {
                    fromPX = (fullWidth - minWidth + newSize) * from;
                    newSize = minWidth;
                }
                newPos = Math.floor(fromPX + scroller.xOffset + scroller.yOffset);
                newRiflesPos = newSize / 2 - 0.5; // -0.5 -> rifle line width / 2

                // Store current position:
                scroller.from = from;
                scroller.to = to;

                if (!vertical) {
                    scroller.scrollbarGroup[method]({
                        translateX: newPos
                    });
                    scroller.scrollbar[method]({
                        width: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateX: newRiflesPos
                    });
                    scroller.scrollbarLeft = newPos;
                    scroller.scrollbarTop = 0;
                } else {
                    scroller.scrollbarGroup[method]({
                        translateY: newPos
                    });
                    scroller.scrollbar[method]({
                        height: newSize
                    });
                    scroller.scrollbarRifles[method]({
                        translateY: newRiflesPos
                    });
                    scroller.scrollbarTop = newPos;
                    scroller.scrollbarLeft = 0;
                }

                if (newSize <= 12) {
                    scroller.scrollbarRifles.hide();
                } else {
                    scroller.scrollbarRifles.show(true);
                }

                // Show or hide the scrollbar based on the showFull setting
                if (options.showFull === false) {
                    if (from <= 0 && to >= 1) {
                        scroller.group.hide();
                    } else {
                        scroller.group.show();
                    }
                }

                scroller.rendered = true;
            },

            /**
             * Init events methods, so we have an access to the Scrollbar itself
             *
             * @private
             * @function Highcharts.Scrollbar#initEvents
             *
             * @fires Highcharts.Scrollbar#event:changed
             */
            initEvents: function () {
                var scroller = this;

                /**
                 * Event handler for the mouse move event.
                 */
                scroller.mouseMoveHandler = function (e) {
                    var normalizedEvent = scroller.chart.pointer.normalize(e),
                        options = scroller.options,
                        direction = options.vertical ? 'chartY' : 'chartX',
                        initPositions = scroller.initPositions,
                        scrollPosition,
                        chartPosition,
                        change;

                    // In iOS, a mousemove event with e.pageX === 0 is fired when
                    // holding the finger down in the center of the scrollbar. This
                    // should be ignored.
                    if (
                        scroller.grabbedCenter &&
                        // #4696, scrollbar failed on Android
                        (!e.touches || e.touches[0][direction] !== 0)
                    ) {
                        chartPosition = scroller.cursorToScrollbarPosition(
                            normalizedEvent
                        )[direction];
                        scrollPosition = scroller[direction];

                        change = chartPosition - scrollPosition;

                        scroller.hasDragged = true;
                        scroller.updatePosition(
                            initPositions[0] + change,
                            initPositions[1] + change
                        );

                        if (scroller.hasDragged) {
                            fireEvent(scroller, 'changed', {
                                from: scroller.from,
                                to: scroller.to,
                                trigger: 'scrollbar',
                                DOMType: e.type,
                                DOMEvent: e
                            });
                        }
                    }
                };

                /**
                 * Event handler for the mouse up event.
                 */
                scroller.mouseUpHandler = function (e) {
                    if (scroller.hasDragged) {
                        fireEvent(scroller, 'changed', {
                            from: scroller.from,
                            to: scroller.to,
                            trigger: 'scrollbar',
                            DOMType: e.type,
                            DOMEvent: e
                        });
                    }
                    scroller.grabbedCenter =
                        scroller.hasDragged =
                        scroller.chartX =
                        scroller.chartY = null;
                };

                scroller.mouseDownHandler = function (e) {
                    var normalizedEvent = scroller.chart.pointer.normalize(e),
                        mousePosition = scroller.cursorToScrollbarPosition(
                            normalizedEvent
                        );

                    scroller.chartX = mousePosition.chartX;
                    scroller.chartY = mousePosition.chartY;
                    scroller.initPositions = [scroller.from, scroller.to];

                    scroller.grabbedCenter = true;
                };

                scroller.buttonToMinClick = function (e) {
                    var range = correctFloat(scroller.to - scroller.from) *
                        scroller.options.step;

                    scroller.updatePosition(
                        correctFloat(scroller.from - range),
                        correctFloat(scroller.to - range)
                    );
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMEvent: e
                    });
                };

                scroller.buttonToMaxClick = function (e) {
                    var range = (scroller.to - scroller.from) * scroller.options.step;

                    scroller.updatePosition(scroller.from + range, scroller.to + range);
                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMEvent: e
                    });
                };

                scroller.trackClick = function (e) {
                    var normalizedEvent = scroller.chart.pointer.normalize(e),
                        range = scroller.to - scroller.from,
                        top = scroller.y + scroller.scrollbarTop,
                        left = scroller.x + scroller.scrollbarLeft;

                    if (
                        (scroller.options.vertical && normalizedEvent.chartY > top) ||
                        (!scroller.options.vertical && normalizedEvent.chartX > left)
                    ) {
                        // On the top or on the left side of the track:
                        scroller.updatePosition(
                            scroller.from + range,
                            scroller.to + range
                        );
                    } else {
                        // On the bottom or the right side of the track:
                        scroller.updatePosition(
                            scroller.from - range,
                            scroller.to - range
                        );
                    }

                    fireEvent(scroller, 'changed', {
                        from: scroller.from,
                        to: scroller.to,
                        trigger: 'scrollbar',
                        DOMEvent: e
                    });
                };
            },

            /**
             * Get normalized (0-1) cursor position over the scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#cursorToScrollbarPosition
             *
             * @param  {*} normalizedEvent
             *         normalized event, with chartX and chartY values
             *
             * @return {*}
             *         Local position {chartX, chartY}
             */
            cursorToScrollbarPosition: function (normalizedEvent) {
                var scroller = this,
                    options = scroller.options,
                    minWidthDifference = options.minWidth > scroller.calculatedWidth ?
                        options.minWidth :
                        0; // minWidth distorts translation

                return {
                    chartX: (normalizedEvent.chartX - scroller.x - scroller.xOffset) /
                        (scroller.barWidth - minWidthDifference),
                    chartY: (normalizedEvent.chartY - scroller.y - scroller.yOffset) /
                        (scroller.barWidth - minWidthDifference)
                };
            },

            /**
             * Update position option in the Scrollbar, with normalized 0-1 scale
             *
             * @private
             * @function Highcharts.Scrollbar#updatePosition
             *
             * @param  {number} from
             *
             * @param  {number} to
             */
            updatePosition: function (from, to) {
                if (to > 1) {
                    from = correctFloat(1 - correctFloat(to - from));
                    to = 1;
                }

                if (from < 0) {
                    to = correctFloat(to - from);
                    from = 0;
                }

                this.from = from;
                this.to = to;
            },

            /**
             * Update the scrollbar with new options
             *
             * @private
             * @function Highcharts.Scrollbar#update
             *
             * @param  {Highcharts.ScrollbarOptions} options
             */
            update: function (options) {
                this.destroy();
                this.init(
                    this.chart.renderer,
                    merge(true, this.options, options),
                    this.chart
                );
            },

            /**
             * Set up the mouse and touch events for the Scrollbar
             *
             * @private
             * @function Highcharts.Scrollbar#addEvents
             */
            addEvents: function () {
                var buttonsOrder = this.options.inverted ? [1, 0] : [0, 1],
                    buttons = this.scrollbarButtons,
                    bar = this.scrollbarGroup.element,
                    track = this.track.element,
                    mouseDownHandler = this.mouseDownHandler,
                    mouseMoveHandler = this.mouseMoveHandler,
                    mouseUpHandler = this.mouseUpHandler,
                    _events;

                // Mouse events
                _events = [
                    [buttons[buttonsOrder[0]].element, 'click', this.buttonToMinClick],
                    [buttons[buttonsOrder[1]].element, 'click', this.buttonToMaxClick],
                    [track, 'click', this.trackClick],
                    [bar, 'mousedown', mouseDownHandler],
                    [bar.ownerDocument, 'mousemove', mouseMoveHandler],
                    [bar.ownerDocument, 'mouseup', mouseUpHandler]
                ];

                // Touch events
                if (hasTouch) {
                    _events.push(
                        [bar, 'touchstart', mouseDownHandler],
                        [bar.ownerDocument, 'touchmove', mouseMoveHandler],
                        [bar.ownerDocument, 'touchend', mouseUpHandler]
                    );
                }

                // Add them all
                _events.forEach(function (args) {
                    addEvent.apply(null, args);
                });
                this._events = _events;
            },

            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Scrollbar#removeEvents
             */
            removeEvents: function () {
                this._events.forEach(function (args) {
                    removeEvent.apply(null, args);
                });
                this._events.length = 0;
            },

            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Scrollbar#destroy
             */
            destroy: function () {

                var scroller = this.chart.scroller;

                // Disconnect events added in addEvents
                this.removeEvents();

                // Destroy properties
                [
                    'track',
                    'scrollbarRifles',
                    'scrollbar',
                    'scrollbarGroup',
                    'group'
                ].forEach(
                    function (prop) {
                        if (this[prop] && this[prop].destroy) {
                            this[prop] = this[prop].destroy();
                        }
                    },
                    this
                );

                // #6421, chart may have more scrollbars
                if (scroller && this === scroller.scrollbar) {
                    scroller.scrollbar = null;

                    // Destroy elements in collection
                    destroyObjectProperties(scroller.scrollbarButtons);
                }
            }
        };

        if (!H.Scrollbar) {
            /* *
             * Wrap axis initialization and create scrollbar if enabled:
             */
            addEvent(Axis, 'afterInit', function () {
                var axis = this;

                if (
                    axis.options &&
                    axis.options.scrollbar &&
                    axis.options.scrollbar.enabled
                ) {
                    // Predefined options:
                    axis.options.scrollbar.vertical = !axis.horiz;
                    axis.options.startOnTick = axis.options.endOnTick = false;

                    axis.scrollbar = new Scrollbar(
                        axis.chart.renderer,
                        axis.options.scrollbar,
                        axis.chart
                    );

                    addEvent(axis.scrollbar, 'changed', function (e) {
                        var unitedMin = Math.min(
                                pick(axis.options.min, axis.min),
                                axis.min,
                                axis.dataMin
                            ),
                            unitedMax = Math.max(
                                pick(axis.options.max, axis.max),
                                axis.max,
                                axis.dataMax
                            ),
                            range = unitedMax - unitedMin,
                            to,
                            from;

                        if (
                            (axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)
                        ) {
                            to = unitedMin + range * this.to;
                            from = unitedMin + range * this.from;
                        } else {
                            // y-values in browser are reversed, but this also applies
                            // for reversed horizontal axis:
                            to = unitedMin + range * (1 - this.from);
                            from = unitedMin + range * (1 - this.to);
                        }

                        if (
                            pick(
                                this.options.liveRedraw,
                                H.svg && !H.isTouchDevice && !this.chart.isBoosting
                            ) ||
                            // Mouseup always should change extremes
                            e.DOMType === 'mouseup' ||
                            // Internal events
                            !defined(e.DOMType)
                        ) {
                            axis.setExtremes(
                                from,
                                to,
                                true,
                                e.DOMType !== 'mousemove',
                                e
                            );
                        } else {
                            // When live redraw is disabled, don't change extremes
                            // Only change the position of the scollbar thumb
                            this.setRange(this.from, this.to);
                        }
                    });
                }
            });

            /* *
            * Wrap rendering axis, and update scrollbar if one is created:
            */
            addEvent(Axis, 'afterRender', function () {
                var axis = this,
                    scrollMin = Math.min(
                        pick(axis.options.min, axis.min),
                        axis.min,
                        pick(axis.dataMin, axis.min) // #6930
                    ),
                    scrollMax = Math.max(
                        pick(axis.options.max, axis.max),
                        axis.max,
                        pick(axis.dataMax, axis.max) // #6930
                    ),
                    scrollbar = axis.scrollbar,
                    offset = axis.axisTitleMargin + (axis.titleOffset || 0),
                    scrollbarsOffsets = axis.chart.scrollbarsOffsets,
                    axisMargin = axis.options.margin || 0,
                    offsetsIndex,
                    from,
                    to;

                if (scrollbar) {

                    if (axis.horiz) {

                        // Reserve space for labels/title
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += offset;
                        }

                        scrollbar.position(
                            axis.left,
                            axis.top + axis.height + 2 + scrollbarsOffsets[1] -
                                (axis.opposite ? axisMargin : 0),
                            axis.width,
                            axis.height
                        );

                        // Next scrollbar should reserve space for margin (if set)
                        if (!axis.opposite) {
                            scrollbarsOffsets[1] += axisMargin;
                        }

                        offsetsIndex = 1;
                    } else {

                        // Reserve space for labels/title
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += offset;
                        }

                        scrollbar.position(
                            axis.left + axis.width + 2 + scrollbarsOffsets[0] -
                                (axis.opposite ? 0 : axisMargin),
                            axis.top,
                            axis.width,
                            axis.height
                        );

                        // Next scrollbar should reserve space for margin (if set)
                        if (axis.opposite) {
                            scrollbarsOffsets[0] += axisMargin;
                        }

                        offsetsIndex = 0;
                    }

                    scrollbarsOffsets[offsetsIndex] += scrollbar.size +
                        scrollbar.options.margin;

                    if (
                        isNaN(scrollMin) ||
                        isNaN(scrollMax) ||
                        !defined(axis.min) ||
                        !defined(axis.max) ||
                        axis.min === axis.max // #10733
                    ) {
                        // default action: when extremes are the same or there is not
                        // extremes on the axis, but scrollbar exists, make it full size
                        scrollbar.setRange(0, 1);
                    } else {
                        from = (axis.min - scrollMin) / (scrollMax - scrollMin);
                        to = (axis.max - scrollMin) / (scrollMax - scrollMin);

                        if (
                            (axis.horiz && !axis.reversed) ||
                            (!axis.horiz && axis.reversed)
                        ) {
                            scrollbar.setRange(from, to);
                        } else {
                            // inverse vertical axis
                            scrollbar.setRange(1 - to, 1 - from);
                        }
                    }
                }
            });

            /* *
            * Make space for a scrollbar
            */
            addEvent(Axis, 'afterGetOffset', function () {
                var axis = this,
                    index = axis.horiz ? 2 : 1,
                    scrollbar = axis.scrollbar;

                if (scrollbar) {
                    axis.chart.scrollbarsOffsets = [0, 0]; // reset scrollbars offsets
                    axis.chart.axisOffset[index] +=
                        scrollbar.size + scrollbar.options.margin;
                }
            });

            H.Scrollbar = Scrollbar;
        }

    });
    _registerModule(_modules, 'parts/Navigator.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */



        var addEvent = H.addEvent,
            Axis = H.Axis,
            Chart = H.Chart,
            color = H.color,
            defaultOptions = H.defaultOptions,
            defined = H.defined,
            destroyObjectProperties = H.destroyObjectProperties,
            erase = H.erase,
            extend = H.extend,
            hasTouch = H.hasTouch,
            isArray = H.isArray,
            isNumber = H.isNumber,
            isTouchDevice = H.isTouchDevice,
            merge = H.merge,
            pick = H.pick,
            removeEvent = H.removeEvent,
            Scrollbar = H.Scrollbar,
            Series = H.Series,
            seriesTypes = H.seriesTypes,

            defaultSeriesType,

            // Finding the min or max of a set of variables where we don't know if they
            // are defined, is a pattern that is repeated several places in Highcharts.
            // Consider making this a global utility method.
            numExt = function (extreme) {
                var numbers = [].filter.call(arguments, isNumber);

                if (numbers.length) {
                    return Math[extreme].apply(0, numbers);
                }
            };

        defaultSeriesType = seriesTypes.areaspline === undefined ?
            'line' :
            'areaspline';

        extend(defaultOptions, {

            /**
             * Maximum range which can be set using the navigator's handles.
             * Opposite of [xAxis.minRange](#xAxis.minRange).
             *
             * @sample {highstock} stock/navigator/maxrange/
             *         Defined max and min range
             *
             * @type      {number}
             * @since     6.0.0
             * @product   highstock gantt
             * @apioption xAxis.maxRange
             */

            /**
             * The navigator is a small series below the main series, displaying
             * a view of the entire data set. It provides tools to zoom in and
             * out on parts of the data as well as panning across the dataset.
             *
             * @product      highstock gantt
             * @optionparent navigator
             */
            navigator: {

                /**
                 * Whether the navigator and scrollbar should adapt to updated data
                 * in the base X axis. When loading data async, as in the demo below,
                 * this should be `false`. Otherwise new data will trigger navigator
                 * redraw, which will cause unwanted looping. In the demo below, the
                 * data in the navigator is set only once. On navigating, only the main
                 * chart content is updated.
                 *
                 * @sample {highstock} stock/demo/lazy-loading/
                 *         Set to false with async data loading
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption navigator.adaptToUpdatedData
                 */

                /**
                 * An integer identifying the index to use for the base series, or a
                 * string representing the id of the series.
                 *
                 * **Note**: As of Highcharts 5.0, this is now a deprecated option.
                 * Prefer [series.showInNavigator](#plotOptions.series.showInNavigator).
                 *
                 * @see [series.showInNavigator](#plotOptions.series.showInNavigator)
                 *
                 * @deprecated
                 * @type      {*}
                 * @default   0
                 * @apioption navigator.baseSeries
                 */

                /**
                 * Enable or disable the navigator.
                 *
                 * @sample {highstock} stock/navigator/enabled/
                 *         Disable the navigator
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption navigator.enabled
                 */

                /**
                 * When the chart is inverted, whether to draw the navigator on the
                 * opposite side.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     5.0.8
                 * @apioption navigator.opposite
                 */

                /**
                 * The height of the navigator.
                 *
                 * @sample {highstock} stock/navigator/height/
                 *         A higher navigator
                 */
                height: 40,

                /**
                 * The distance from the nearest element, the X axis or X axis labels.
                 *
                 * @sample {highstock} stock/navigator/margin/
                 *         A margin of 2 draws the navigator closer to the X axis labels
                 */
                margin: 25,

                /**
                 * Whether the mask should be inside the range marking the zoomed
                 * range, or outside. In Highstock 1.x it was always `false`.
                 *
                 * @sample {highstock} stock/navigator/maskinside-false/
                 *         False, mask outside
                 *
                 * @since   2.0
                 */
                maskInside: true,

                /**
                 * Options for the handles for dragging the zoomed area.
                 *
                 * @sample {highstock} stock/navigator/handles/
                 *         Colored handles
                 */
                handles: {
                    /**
                     * Width for handles.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @since   6.0.0
                     */
                    width: 7,

                    /**
                     * Height for handles.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @since   6.0.0
                     */
                    height: 15,

                    /**
                     * Array to define shapes of handles. 0-index for left, 1-index for
                     * right.
                     *
                     * Additionally, the URL to a graphic can be given on this form:
                     * `url(graphic.png)`. Note that for the image to be applied to
                     * exported charts, its URL needs to be accessible by the export
                     * server.
                     *
                     * Custom callbacks for symbol path generation can also be added to
                     * `Highcharts.SVGRenderer.prototype.symbols`. The callback is then
                     * used by its method name, as shown in the demo.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @type    {Array<string>}
                     * @default ["navigator-handle", "navigator-handle"]
                     * @since   6.0.0
                     */
                    symbols: ['navigator-handle', 'navigator-handle'],

                    /**
                     * Allows to enable/disable handles.
                     *
                     * @since   6.0.0
                     */
                    enabled: true,

                    /**
                     * The width for the handle border and the stripes inside.
                     *
                     * @sample {highstock} stock/navigator/styled-handles/
                     *         Styled handles
                     *
                     * @since     6.0.0
                     * @apioption navigator.handles.lineWidth
                     */
                    lineWidth: 1,

                    /**
                     * The fill for the handle.
                     *
                     * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     */
                    backgroundColor: '#f2f2f2',

                    /**
                     * The stroke for the handle border and the stripes inside.
                     *
                     * @type    {Highcharts.ColorString}
                     */
                    borderColor: '#999999'
                },

                /**
                 * The color of the mask covering the areas of the navigator series
                 * that are currently not visible in the main series. The default
                 * color is bluish with an opacity of 0.3 to see the series below.
                 *
                 * @see In styled mode, the mask is styled with the
                 *      `.highcharts-navigator-mask` and
                 *      `.highcharts-navigator-mask-inside` classes.
                 *
                 * @sample {highstock} stock/navigator/maskfill/
                 *         Blue, semi transparent mask
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @default rgba(102,133,194,0.3)
                 */
                maskFill: color('#6685c2').setOpacity(0.3).get(),

                /**
                 * The color of the line marking the currently zoomed area in the
                 * navigator.
                 *
                 * @sample {highstock} stock/navigator/outline/
                 *         2px blue outline
                 *
                 * @type    {Highcharts.ColorString}
                 * @default #cccccc
                 */
                outlineColor: '#cccccc',

                /**
                 * The width of the line marking the currently zoomed area in the
                 * navigator.
                 *
                 * @see In styled mode, the outline stroke width is set with the
                 *      `.highcharts-navigator-outline` class.
                 *
                 * @sample {highstock} stock/navigator/outline/
                 *         2px blue outline
                 *
                 * @type    {number}
                 */
                outlineWidth: 1,

                /**
                 * Options for the navigator series. Available options are the same
                 * as any series, documented at [plotOptions](#plotOptions.series)
                 * and [series](#series).
                 *
                 * Unless data is explicitly defined on navigator.series, the data
                 * is borrowed from the first series in the chart.
                 *
                 * Default series options for the navigator series are:
                 *
                 * <pre>series: {
                 *     type: 'areaspline',
                 *     fillOpacity: 0.05,
                 *     dataGrouping: {
                 *         smoothed: true
                 *     },
                 *     lineWidth: 1,
                 *     marker: {
                 *         enabled: false
                 *     }
                 * }</pre>
                 *
                 * @see In styled mode, the navigator series is styled with the
                 *      `.highcharts-navigator-series` class.
                 *
                 * @sample {highstock} stock/navigator/series-data/
                 *         Using a separate data set for the navigator
                 * @sample {highstock} stock/navigator/series/
                 *         A green navigator series
                 */
                series: {

                    /**
                     * The type of the navigator series. Defaults to `areaspline` if
                     * defined, otherwise `line`.
                     *
                     * @type    {string}
                     * @default areaspline
                     */
                    type: defaultSeriesType,

                    /**
                     * The fill opacity of the navigator series.
                     */
                    fillOpacity: 0.05,

                    /**
                     * The pixel line width of the navigator series.
                     */
                    lineWidth: 1,

                    /**
                     * @ignore-option
                     */
                    compare: null,

                    /**
                     * Unless data is explicitly defined, the data is borrowed from the
                     * first series in the chart.
                     *
                     * @type      {Array<number|Array<number|string|null>|object|null>}
                     * @product   highstock
                     * @apioption navigator.series.data
                     */

                    /**
                     * Data grouping options for the navigator series.
                     *
                     * @extends plotOptions.series.dataGrouping
                     */
                    dataGrouping: {
                        approximation: 'average',
                        enabled: true,
                        groupPixelWidth: 2,
                        smoothed: true,
                        // Day and week differs from plotOptions.series.dataGrouping
                        units: [
                            ['millisecond', [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]],
                            ['second', [1, 2, 5, 10, 15, 30]],
                            ['minute', [1, 2, 5, 10, 15, 30]],
                            ['hour', [1, 2, 3, 4, 6, 8, 12]],
                            ['day', [1, 2, 3, 4]],
                            ['week', [1, 2, 3]],
                            ['month', [1, 3, 6]],
                            ['year', null]
                        ]
                    },

                    /**
                     * Data label options for the navigator series. Data labels are
                     * disabled by default on the navigator series.
                     *
                     * @extends plotOptions.series.dataLabels
                     */
                    dataLabels: {
                        /** @ignore-option */
                        enabled: false,
                        /** @ignore-option */
                        zIndex: 2 // #1839
                    },

                    id: 'highcharts-navigator-series',

                    className: 'highcharts-navigator-series',

                    /**
                     * Sets the fill color of the navigator series.
                     *
                     * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                     * @apioption navigator.series.color
                     */

                    /**
                     * Line color for the navigator series. Allows setting the color
                     * while disallowing the default candlestick setting.
                     *
                     * @type {Highcharts.ColorString|null}
                     */
                    lineColor: null, // #4602

                    marker: {
                        enabled: false
                    },

                    pointRange: 0,

                    /**
                     * The threshold option. Setting it to 0 will make the default
                     * navigator area series draw its area from the 0 value and up.
                     *
                     * @type {number|null}
                     */
                    threshold: null
                },

                /**
                 * Options for the navigator X axis. Default series options
                 * for the navigator xAxis are:
                 *
                 * <pre>xAxis: {
                 *     tickWidth: 0,
                 *     lineWidth: 0,
                 *     gridLineWidth: 1,
                 *     tickPixelInterval: 200,
                 *     labels: {
                 *            align: 'left',
                 *         style: {
                 *             color: '#888'
                 *         },
                 *         x: 3,
                 *         y: -4
                 *     }
                 * }</pre>
                 *
                 * @extends   xAxis
                 * @excluding linkedTo, maxZoom, minRange, opposite, range, scrollbar,
                 *            showEmpty, maxRange
                 */
                xAxis: {
                    /**
                     * Additional range on the right side of the xAxis. Works similar to
                     * xAxis.maxPadding, but value is set in milliseconds.
                     * Can be set for both, main xAxis and navigator's xAxis.
                     *
                     * @since   6.0.0
                     */
                    overscroll: 0,

                    className: 'highcharts-navigator-xaxis',

                    tickLength: 0,

                    lineWidth: 0,

                    gridLineColor: '#e6e6e6',

                    gridLineWidth: 1,

                    tickPixelInterval: 200,

                    labels: {

                        align: 'left',

                        /**
                         * @type {Highcharts.CSSObject}
                         */
                        style: {
                            /** @ignore */
                            color: '#999999'
                        },

                        x: 3,

                        y: -4

                    },

                    crosshair: false

                },

                /**
                 * Options for the navigator Y axis. Default series options
                 * for the navigator yAxis are:
                 *
                 * <pre>yAxis: {
                 *     gridLineWidth: 0,
                 *     startOnTick: false,
                 *     endOnTick: false,
                 *     minPadding: 0.1,
                 *     maxPadding: 0.1,
                 *     labels: {
                 *         enabled: false
                 *     },
                 *     title: {
                 *         text: null
                 *     },
                 *     tickWidth: 0
                 * }</pre>
                 *
                 * @extends   yAxis
                 * @excluding height, linkedTo, maxZoom, minRange, ordinal, range,
                 *            showEmpty, scrollbar, top, units, maxRange, minLength,
                 *            maxLength, resize
                 */
                yAxis: {

                    className: 'highcharts-navigator-yaxis',

                    gridLineWidth: 0,

                    startOnTick: false,

                    endOnTick: false,

                    minPadding: 0.1,

                    maxPadding: 0.1,

                    labels: {
                        enabled: false
                    },

                    crosshair: false,

                    title: {
                        text: null
                    },

                    tickLength: 0,

                    tickWidth: 0

                }

            }

        });

        /**
         * Draw one of the handles on the side of the zoomed range in the navigator
         *
         * @function Highcharts.Renderer#symbols.navigator-handle
         *
         * @param {boolean} inverted
         *        flag for chart.inverted
         *
         * @return {Highcharts.SVGPathArray}
         *         Path to be used in a handle
         */
        H.Renderer.prototype.symbols['navigator-handle'] = function (
            x,
            y,
            w,
            h,
            options
        ) {
            var halfWidth = options.width / 2,
                markerPosition = Math.round(halfWidth / 3) + 0.5,
                height = options.height;

            return [
                'M',
                -halfWidth - 1, 0.5,
                'L',
                halfWidth, 0.5,
                'L',
                halfWidth, height + 0.5,
                'L',
                -halfWidth - 1, height + 0.5,
                'L',
                -halfWidth - 1, 0.5,
                'M',
                -markerPosition, 4,
                'L',
                -markerPosition, height - 3,
                'M',
                markerPosition - 1, 4,
                'L',
                markerPosition - 1, height - 3
            ];
        };

        /**
         * Add logic to normalize the zoomed range in order to preserve the pressed
         * state of range selector buttons
         *
         * @private
         * @function Highcharts.Axis#toFixedRange
         *
         * @param {number} pxMin
         *
         * @param {number} pxMax
         *
         * @param {number} fixedMin
         *
         * @param {number} fixedMax
         *
         * @return {*}
         */
        Axis.prototype.toFixedRange = function (pxMin, pxMax, fixedMin, fixedMax) {
            var fixedRange = this.chart && this.chart.fixedRange,
                newMin = pick(fixedMin, this.translate(pxMin, true, !this.horiz)),
                newMax = pick(fixedMax, this.translate(pxMax, true, !this.horiz)),
                changeRatio = fixedRange && (newMax - newMin) / fixedRange;

            // If the difference between the fixed range and the actual requested range
            // is too great, the user is dragging across an ordinal gap, and we need to
            // release the range selector button.
            if (changeRatio > 0.7 && changeRatio < 1.3) {
                if (fixedMax) {
                    newMin = newMax - fixedRange;
                } else {
                    newMax = newMin + fixedRange;
                }
            }
            if (!isNumber(newMin) || !isNumber(newMax)) { // #1195, #7411
                newMin = newMax = undefined;
            }

            return {
                min: newMin,
                max: newMax
            };
        };

        /**
         * The Navigator class
         *
         * @private
         * @class
         * @name Highcharts.Navigator
         *
         * @param {Highcharts.Chart} chart
         *        Chart object
         */
        function Navigator(chart) {
            this.init(chart);
        }

        Navigator.prototype = {

            /**
             * Draw one of the handles on the side of the zoomed range in the navigator
             *
             * @private
             * @function Highcharts.Navigator#drawHandle
             *
             * @param {number} x
             *        The x center for the handle
             *
             * @param {number} index
             *        0 for left and 1 for right
             *
             * @param {boolean} inverted
             *        flag for chart.inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawHandle: function (x, index, inverted, verb) {
                var navigator = this,
                    height = navigator.navigatorOptions.handles.height;

                // Place it
                navigator.handles[index][verb](inverted ? {
                    translateX: Math.round(navigator.left + navigator.height / 2),
                    translateY: Math.round(
                        navigator.top + parseInt(x, 10) + 0.5 - height
                    )
                } : {
                    translateX: Math.round(navigator.left + parseInt(x, 10)),
                    translateY: Math.round(
                        navigator.top + navigator.height / 2 - height / 2 - 1
                    )
                });
            },

            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawOutline
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawOutline: function (zoomedMin, zoomedMax, inverted, verb) {
                var navigator = this,
                    maskInside = navigator.navigatorOptions.maskInside,
                    outlineWidth = navigator.outline.strokeWidth(),
                    halfOutline = outlineWidth / 2,
                    outlineCorrection = (outlineWidth % 2) / 2, // #5800
                    outlineHeight = navigator.outlineHeight,
                    scrollbarHeight = navigator.scrollbarHeight,
                    navigatorSize = navigator.size,
                    left = navigator.left - scrollbarHeight,
                    navigatorTop = navigator.top,
                    verticalMin,
                    path;

                if (inverted) {
                    left -= halfOutline;
                    verticalMin = navigatorTop + zoomedMax + outlineCorrection;
                    zoomedMax = navigatorTop + zoomedMin + outlineCorrection;

                    path = [
                        'M',
                        left + outlineHeight,
                        navigatorTop - scrollbarHeight - outlineCorrection, // top edge
                        'L',
                        left + outlineHeight,
                        verticalMin, // top right of zoomed range
                        'L',
                        left,
                        verticalMin, // top left of z.r.
                        'L',
                        left,
                        zoomedMax, // bottom left of z.r.
                        'L',
                        left + outlineHeight,
                        zoomedMax, // bottom right of z.r.
                        'L',
                        left + outlineHeight,
                        navigatorTop + navigatorSize + scrollbarHeight // bottom edge
                    ].concat(maskInside ? [
                        'M',
                        left + outlineHeight,
                        verticalMin - halfOutline, // upper left of zoomed range
                        'L',
                        left + outlineHeight,
                        zoomedMax + halfOutline // upper right of z.r.
                    ] : []);
                } else {
                    zoomedMin += left + scrollbarHeight - outlineCorrection;
                    zoomedMax += left + scrollbarHeight - outlineCorrection;
                    navigatorTop += halfOutline;

                    path = [
                        'M',
                        left,
                        navigatorTop, // left
                        'L',
                        zoomedMin,
                        navigatorTop, // upper left of zoomed range
                        'L',
                        zoomedMin,
                        navigatorTop + outlineHeight, // lower left of z.r.
                        'L',
                        zoomedMax,
                        navigatorTop + outlineHeight, // lower right of z.r.
                        'L',
                        zoomedMax,
                        navigatorTop, // upper right of z.r.
                        'L',
                        left + navigatorSize + scrollbarHeight * 2,
                        navigatorTop // right
                    ].concat(maskInside ? [
                        'M',
                        zoomedMin - halfOutline,
                        navigatorTop, // upper left of zoomed range
                        'L',
                        zoomedMax + halfOutline,
                        navigatorTop // upper right of z.r.
                    ] : []);
                }
                navigator.outline[verb]({
                    d: path
                });
            },

            /**
             * Render outline around the zoomed range
             *
             * @private
             * @function Highcharts.Navigator#drawMasks
             *
             * @param {number} zoomedMin
             *        in pixels position where zoomed range starts
             *
             * @param {number} zoomedMax
             *        in pixels position where zoomed range ends
             *
             * @param {boolean} inverted
             *        flag if chart is inverted
             *
             * @param {string} verb
             *        use 'animate' or 'attr'
             */
            drawMasks: function (zoomedMin, zoomedMax, inverted, verb) {
                var navigator = this,
                    left = navigator.left,
                    top = navigator.top,
                    navigatorHeight = navigator.height,
                    height,
                    width,
                    x,
                    y;

                // Determine rectangle position & size
                // According to (non)inverted position:
                if (inverted) {
                    x = [left, left, left];
                    y = [top, top + zoomedMin, top + zoomedMax];
                    width = [navigatorHeight, navigatorHeight, navigatorHeight];
                    height = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                } else {
                    x = [left, left + zoomedMin, left + zoomedMax];
                    y = [top, top, top];
                    width = [
                        zoomedMin,
                        zoomedMax - zoomedMin,
                        navigator.size - zoomedMax
                    ];
                    height = [navigatorHeight, navigatorHeight, navigatorHeight];
                }
                navigator.shades.forEach(function (shade, i) {
                    shade[verb]({
                        x: x[i],
                        y: y[i],
                        width: width[i],
                        height: height[i]
                    });
                });
            },

            /**
             * Generate DOM elements for a navigator:
             *
             * - main navigator group
             *
             * - all shades
             *
             * - outline
             *
             * - handles
             *
             * @private
             * @function Highcharts.Navigator#renderElements
             */
            renderElements: function () {
                var navigator = this,
                    navigatorOptions = navigator.navigatorOptions,
                    maskInside = navigatorOptions.maskInside,
                    chart = navigator.chart,
                    inverted = chart.inverted,
                    renderer = chart.renderer,
                    navigatorGroup,
                    mouseCursor = {
                        cursor: inverted ? 'ns-resize' : 'ew-resize'
                    };

                // Create the main navigator group
                navigator.navigatorGroup = navigatorGroup = renderer.g('navigator')
                    .attr({
                        zIndex: 8,
                        visibility: 'hidden'
                    })
                    .add();

                // Create masks, each mask will get events and fill:
                [
                    !maskInside,
                    maskInside,
                    !maskInside
                ].forEach(function (hasMask, index) {
                    navigator.shades[index] = renderer.rect()
                        .addClass('highcharts-navigator-mask' +
                            (index === 1 ? '-inside' : '-outside'))
                        .add(navigatorGroup);

                    if (!chart.styledMode) {
                        navigator.shades[index]
                            .attr({
                                fill: hasMask ?
                                    navigatorOptions.maskFill :
                                    'rgba(0,0,0,0)'
                            })
                            .css(index === 1 && mouseCursor);
                    }
                });

                // Create the outline:
                navigator.outline = renderer.path()
                    .addClass('highcharts-navigator-outline')
                    .add(navigatorGroup);

                if (!chart.styledMode) {
                    navigator.outline.attr({
                        'stroke-width': navigatorOptions.outlineWidth,
                        stroke: navigatorOptions.outlineColor
                    });
                }

                // Create the handlers:
                if (navigatorOptions.handles.enabled) {
                    [0, 1].forEach(function (index) {
                        navigatorOptions.handles.inverted = chart.inverted;
                        navigator.handles[index] = renderer.symbol(
                            navigatorOptions.handles.symbols[index],
                            -navigatorOptions.handles.width / 2 - 1,
                            0,
                            navigatorOptions.handles.width,
                            navigatorOptions.handles.height,
                            navigatorOptions.handles
                        );
                        // zIndex = 6 for right handle, 7 for left.
                        // Can't be 10, because of the tooltip in inverted chart #2908
                        navigator.handles[index].attr({ zIndex: 7 - index })
                            .addClass(
                                'highcharts-navigator-handle ' +
                                'highcharts-navigator-handle-' +
                                ['left', 'right'][index]
                            ).add(navigatorGroup);

                        if (!chart.styledMode) {
                            var handlesOptions = navigatorOptions.handles;

                            navigator.handles[index]
                                .attr({
                                    fill: handlesOptions.backgroundColor,
                                    stroke: handlesOptions.borderColor,
                                    'stroke-width': handlesOptions.lineWidth
                                })
                                .css(mouseCursor);
                        }
                    });
                }
            },

            /**
             * Update navigator
             *
             * @private
             * @function Highcharts.Navigator#update
             *
             * @param {Highcharts.NavigatorOptions} options
             *        Options to merge in when updating navigator
             */
            update: function (options) {
                // Remove references to old navigator series in base series
                (this.series || []).forEach(function (series) {
                    if (series.baseSeries) {
                        delete series.baseSeries.navigatorSeries;
                    }
                });
                // Destroy and rebuild navigator
                this.destroy();
                var chartOptions = this.chart.options;

                merge(true, chartOptions.navigator, this.options, options);
                this.init(this.chart);
            },

            /**
             * Render the navigator
             *
             * @private
             * @function Highcharts.Navigator#render
             *
             * @param {number} min
             *        X axis value minimum
             *
             * @param {number} max
             *        X axis value maximum
             *
             * @param {number} pxMin
             *        Pixel value minimum
             *
             * @param {number} pxMax
             *        Pixel value maximum
             */
            render: function (min, max, pxMin, pxMax) {

                var navigator = this,
                    chart = navigator.chart,
                    navigatorWidth,
                    scrollbarLeft,
                    scrollbarTop,
                    scrollbarHeight = navigator.scrollbarHeight,
                    navigatorSize,
                    xAxis = navigator.xAxis,
                    scrollbarXAxis = xAxis.fake ? chart.xAxis[0] : xAxis,
                    navigatorEnabled = navigator.navigatorEnabled,
                    zoomedMin,
                    zoomedMax,
                    rendered = navigator.rendered,
                    inverted = chart.inverted,
                    verb,
                    newMin,
                    newMax,
                    currentRange,
                    minRange = chart.xAxis[0].minRange,
                    maxRange = chart.xAxis[0].options.maxRange;

                // Don't redraw while moving the handles (#4703).
                if (this.hasDragged && !defined(pxMin)) {
                    return;
                }

                // Don't render the navigator until we have data (#486, #4202, #5172).
                if (!isNumber(min) || !isNumber(max)) {
                    // However, if navigator was already rendered, we may need to resize
                    // it. For example hidden series, but visible navigator (#6022).
                    if (rendered) {
                        pxMin = 0;
                        pxMax = pick(xAxis.width, scrollbarXAxis.width);
                    } else {
                        return;
                    }
                }

                navigator.left = pick(
                    xAxis.left,
                    // in case of scrollbar only, without navigator
                    chart.plotLeft + scrollbarHeight + (inverted ? chart.plotWidth : 0)
                );

                navigator.size = zoomedMax = navigatorSize = pick(
                    xAxis.len,
                    (inverted ? chart.plotHeight : chart.plotWidth) -
                        2 * scrollbarHeight
                );

                if (inverted) {
                    navigatorWidth = scrollbarHeight;
                } else {
                    navigatorWidth = navigatorSize + 2 * scrollbarHeight;
                }

                // Get the pixel position of the handles
                pxMin = pick(pxMin, xAxis.toPixels(min, true));
                pxMax = pick(pxMax, xAxis.toPixels(max, true));

                // Verify (#1851, #2238)
                if (!isNumber(pxMin) || Math.abs(pxMin) === Infinity) {
                    pxMin = 0;
                    pxMax = navigatorWidth;
                }

                // Are we below the minRange? (#2618, #6191)
                newMin = xAxis.toValue(pxMin, true);
                newMax = xAxis.toValue(pxMax, true);
                currentRange = Math.abs(H.correctFloat(newMax - newMin));
                if (currentRange < minRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - minRange, true);
                    } else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + minRange, true);
                    }
                } else if (defined(maxRange) && currentRange > maxRange) {
                    if (this.grabbedLeft) {
                        pxMin = xAxis.toPixels(newMax - maxRange, true);
                    } else if (this.grabbedRight) {
                        pxMax = xAxis.toPixels(newMin + maxRange, true);
                    }
                }

                // Handles are allowed to cross, but never exceed the plot area
                navigator.zoomedMax = Math.min(Math.max(pxMin, pxMax, 0), zoomedMax);
                navigator.zoomedMin = Math.min(
                    Math.max(
                        navigator.fixedWidth ?
                            navigator.zoomedMax - navigator.fixedWidth :
                            Math.min(pxMin, pxMax),
                        0
                    ),
                    zoomedMax
                );

                navigator.range = navigator.zoomedMax - navigator.zoomedMin;

                zoomedMax = Math.round(navigator.zoomedMax);
                zoomedMin = Math.round(navigator.zoomedMin);

                if (navigatorEnabled) {
                    navigator.navigatorGroup.attr({
                        visibility: 'visible'
                    });
                    // Place elements
                    verb = rendered && !navigator.hasDragged ? 'animate' : 'attr';

                    navigator.drawMasks(zoomedMin, zoomedMax, inverted, verb);
                    navigator.drawOutline(zoomedMin, zoomedMax, inverted, verb);

                    if (navigator.navigatorOptions.handles.enabled) {
                        navigator.drawHandle(zoomedMin, 0, inverted, verb);
                        navigator.drawHandle(zoomedMax, 1, inverted, verb);
                    }
                }

                if (navigator.scrollbar) {
                    if (inverted) {
                        scrollbarTop = navigator.top - scrollbarHeight;
                        scrollbarLeft = navigator.left - scrollbarHeight +
                            (navigatorEnabled || !scrollbarXAxis.opposite ? 0 :
                                // Multiple axes has offsets:
                                (scrollbarXAxis.titleOffset || 0) +
                                // Self margin from the axis.title
                                scrollbarXAxis.axisTitleMargin
                            );
                        scrollbarHeight = navigatorSize + 2 * scrollbarHeight;
                    } else {
                        scrollbarTop = navigator.top +
                            (navigatorEnabled ? navigator.height : -scrollbarHeight);
                        scrollbarLeft = navigator.left - scrollbarHeight;
                    }
                    // Reposition scrollbar
                    navigator.scrollbar.position(
                        scrollbarLeft,
                        scrollbarTop,
                        navigatorWidth,
                        scrollbarHeight
                    );
                    // Keep scale 0-1
                    navigator.scrollbar.setRange(
                        // Use real value, not rounded because range can be very small
                        // (#1716)
                        navigator.zoomedMin / (navigatorSize || 1),
                        navigator.zoomedMax / (navigatorSize || 1)
                    );
                }
                navigator.rendered = true;
            },

            /**
             * Set up the mouse and touch events for the navigator
             *
             * @private
             * @function Highcharts.Navigator#addMouseEvents
             */
            addMouseEvents: function () {
                var navigator = this,
                    chart = navigator.chart,
                    container = chart.container,
                    eventsToUnbind = [],
                    mouseMoveHandler,
                    mouseUpHandler;

                /**
                 * Create mouse events' handlers.
                 * Make them as separate functions to enable wrapping them:
                 */
                navigator.mouseMoveHandler = mouseMoveHandler = function (e) {
                    navigator.onMouseMove(e);
                };
                navigator.mouseUpHandler = mouseUpHandler = function (e) {
                    navigator.onMouseUp(e);
                };

                // Add shades and handles mousedown events
                eventsToUnbind = navigator.getPartsEvents('mousedown');
                // Add mouse move and mouseup events. These are bind to doc/container,
                // because Navigator.grabbedSomething flags are stored in mousedown
                // events
                eventsToUnbind.push(
                    addEvent(container, 'mousemove', mouseMoveHandler),
                    addEvent(container.ownerDocument, 'mouseup', mouseUpHandler)
                );

                // Touch events
                if (hasTouch) {
                    eventsToUnbind.push(
                        addEvent(container, 'touchmove', mouseMoveHandler),
                        addEvent(container.ownerDocument, 'touchend', mouseUpHandler)
                    );
                    eventsToUnbind.concat(navigator.getPartsEvents('touchstart'));
                }

                navigator.eventsToUnbind = eventsToUnbind;

                // Data events
                if (navigator.series && navigator.series[0]) {
                    eventsToUnbind.push(
                        addEvent(
                            navigator.series[0].xAxis,
                            'foundExtremes',
                            function () {
                                chart.navigator.modifyNavigatorAxisExtremes();
                            }
                        )
                    );
                }
            },

            /**
             * Generate events for handles and masks
             *
             * @private
             * @function Highcharts.Navigator#getPartsEvents
             *
             * @param {string} eventName
             *        Event name handler, 'mousedown' or 'touchstart'
             *
             * @return {Array<Function>}
             *         An array of functions to remove navigator functions from the
             *         events again.
             */
            getPartsEvents: function (eventName) {
                var navigator = this,
                    events = [];

                ['shades', 'handles'].forEach(function (name) {
                    navigator[name].forEach(function (navigatorItem, index) {
                        events.push(
                            addEvent(
                                navigatorItem.element,
                                eventName,
                                function (e) {
                                    navigator[name + 'Mousedown'](e, index);
                                }
                            )
                        );
                    });
                });
                return events;
            },

            /**
             * Mousedown on a shaded mask, either:
             *
             * - will be stored for future drag&drop
             *
             * - will directly shift to a new range
             *
             * @private
             * @function Highcharts.Navigator#shadesMousedown
             *
             * @param {global.PointerEventObject} e
             *        Mouse event
             *
             * @param {number} index
             *        Index of a mask in Navigator.shades array
             */
            shadesMousedown: function (e, index) {
                e = this.chart.pointer.normalize(e);

                var navigator = this,
                    chart = navigator.chart,
                    xAxis = navigator.xAxis,
                    zoomedMin = navigator.zoomedMin,
                    navigatorPosition = navigator.left,
                    navigatorSize = navigator.size,
                    range = navigator.range,
                    chartX = e.chartX,
                    fixedMax,
                    fixedMin,
                    ext,
                    left;

                // For inverted chart, swap some options:
                if (chart.inverted) {
                    chartX = e.chartY;
                    navigatorPosition = navigator.top;
                }

                if (index === 1) {
                    // Store information for drag&drop
                    navigator.grabbedCenter = chartX;
                    navigator.fixedWidth = range;
                    navigator.dragOffset = chartX - zoomedMin;
                } else {
                    // Shift the range by clicking on shaded areas
                    left = chartX - navigatorPosition - range / 2;
                    if (index === 0) {
                        left = Math.max(0, left);
                    } else if (index === 2 && left + range >= navigatorSize) {
                        left = navigatorSize - range;
                        if (navigator.reversedExtremes) {
                            // #7713
                            left -= range;
                            fixedMin = navigator.getUnionExtremes().dataMin;
                        } else {
                            // #2293, #3543
                            fixedMax = navigator.getUnionExtremes().dataMax;
                        }
                    }
                    if (left !== zoomedMin) { // it has actually moved
                        navigator.fixedWidth = range; // #1370

                        ext = xAxis.toFixedRange(
                            left,
                            left + range,
                            fixedMin,
                            fixedMax
                        );
                        if (defined(ext.min)) { // #7411
                            chart.xAxis[0].setExtremes(
                                Math.min(ext.min, ext.max),
                                Math.max(ext.min, ext.max),
                                true,
                                null, // auto animation
                                { trigger: 'navigator' }
                            );
                        }
                    }
                }
            },

            /**
             * Mousedown on a handle mask.
             * Will store necessary information for drag&drop.
             *
             * @private
             * @function Highcharts.Navigator#handlesMousedown
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             *
             * @param {number} index
             *        Index of a handle in Navigator.handles array
             */
            handlesMousedown: function (e, index) {
                e = this.chart.pointer.normalize(e);

                var navigator = this,
                    chart = navigator.chart,
                    baseXAxis = chart.xAxis[0],
                    // For reversed axes, min and max are changed,
                    // so the other extreme should be stored
                    reverse = navigator.reversedExtremes;

                if (index === 0) {
                    // Grab the left handle
                    navigator.grabbedLeft = true;
                    navigator.otherHandlePos = navigator.zoomedMax;
                    navigator.fixedExtreme = reverse ? baseXAxis.min : baseXAxis.max;
                } else {
                    // Grab the right handle
                    navigator.grabbedRight = true;
                    navigator.otherHandlePos = navigator.zoomedMin;
                    navigator.fixedExtreme = reverse ? baseXAxis.max : baseXAxis.min;
                }

                chart.fixedRange = null;
            },
            /**
             * Mouse move event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseMove
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseMove: function (e) {
                var navigator = this,
                    chart = navigator.chart,
                    left = navigator.left,
                    navigatorSize = navigator.navigatorSize,
                    range = navigator.range,
                    dragOffset = navigator.dragOffset,
                    inverted = chart.inverted,
                    chartX;


                // In iOS, a mousemove event with e.pageX === 0 is fired when holding
                // the finger down in the center of the scrollbar. This should be
                // ignored.
                if (!e.touches || e.touches[0].pageX !== 0) { // #4696

                    e = chart.pointer.normalize(e);
                    chartX = e.chartX;

                    // Swap some options for inverted chart
                    if (inverted) {
                        left = navigator.top;
                        chartX = e.chartY;
                    }

                    // Drag left handle or top handle
                    if (navigator.grabbedLeft) {
                        navigator.hasDragged = true;
                        navigator.render(
                            0,
                            0,
                            chartX - left,
                            navigator.otherHandlePos
                        );
                    // Drag right handle or bottom handle
                    } else if (navigator.grabbedRight) {
                        navigator.hasDragged = true;
                        navigator.render(
                            0,
                            0,
                            navigator.otherHandlePos,
                            chartX - left
                        );
                    // Drag scrollbar or open area in navigator
                    } else if (navigator.grabbedCenter) {
                        navigator.hasDragged = true;
                        if (chartX < dragOffset) { // outside left
                            chartX = dragOffset;
                        // outside right
                        } else if (chartX > navigatorSize + dragOffset - range) {
                            chartX = navigatorSize + dragOffset - range;
                        }

                        navigator.render(
                            0,
                            0,
                            chartX - dragOffset,
                            chartX - dragOffset + range
                        );
                    }
                    if (
                        navigator.hasDragged &&
                        navigator.scrollbar &&
                        pick(
                            navigator.scrollbar.options.liveRedraw,

                            // By default, don't run live redraw on VML, on touch
                            // devices or if the chart is in boost.
                            H.svg && !isTouchDevice && !this.chart.isBoosting
                        )
                    ) {
                        e.DOMType = e.type; // DOMType is for IE8
                        setTimeout(function () {
                            navigator.onMouseUp(e);
                        }, 0);
                    }
                }
            },

            /**
             * Mouse up event based on x/y mouse position.
             *
             * @private
             * @function Highcharts.Navigator#onMouseUp
             *
             * @param {Highcharts.PointerEventObject} e
             *        Mouse event
             */
            onMouseUp: function (e) {
                var navigator = this,
                    chart = navigator.chart,
                    xAxis = navigator.xAxis,
                    scrollbar = navigator.scrollbar,
                    unionExtremes,
                    fixedMin,
                    fixedMax,
                    ext,
                    DOMEvent = e.DOMEvent || e;

                if (
                    // MouseUp is called for both, navigator and scrollbar (that order),
                    // which causes calling afterSetExtremes twice. Prevent first call
                    // by checking if scrollbar is going to set new extremes (#6334)
                    (navigator.hasDragged && (!scrollbar || !scrollbar.hasDragged)) ||
                    e.trigger === 'scrollbar'
                ) {
                    unionExtremes = navigator.getUnionExtremes();

                    // When dragging one handle, make sure the other one doesn't change
                    if (navigator.zoomedMin === navigator.otherHandlePos) {
                        fixedMin = navigator.fixedExtreme;
                    } else if (navigator.zoomedMax === navigator.otherHandlePos) {
                        fixedMax = navigator.fixedExtreme;
                    }
                    // Snap to right edge (#4076)
                    if (navigator.zoomedMax === navigator.size) {
                        fixedMax = navigator.reversedExtremes ?
                            unionExtremes.dataMin : unionExtremes.dataMax;
                    }

                    // Snap to left edge (#7576)
                    if (navigator.zoomedMin === 0) {
                        fixedMin = navigator.reversedExtremes ?
                            unionExtremes.dataMax : unionExtremes.dataMin;
                    }

                    ext = xAxis.toFixedRange(
                        navigator.zoomedMin,
                        navigator.zoomedMax,
                        fixedMin,
                        fixedMax
                    );

                    if (defined(ext.min)) {
                        chart.xAxis[0].setExtremes(
                            Math.min(ext.min, ext.max),
                            Math.max(ext.min, ext.max),
                            true,
                            // Run animation when clicking buttons, scrollbar track etc,
                            // but not when dragging handles or scrollbar
                            navigator.hasDragged ? false : null,
                            {
                                trigger: 'navigator',
                                triggerOp: 'navigator-drag',
                                DOMEvent: DOMEvent // #1838
                            }
                        );
                    }
                }

                if (e.DOMType !== 'mousemove') {
                    navigator.grabbedLeft = navigator.grabbedRight =
                        navigator.grabbedCenter = navigator.fixedWidth =
                        navigator.fixedExtreme = navigator.otherHandlePos =
                        navigator.hasDragged = navigator.dragOffset = null;
                }
            },

            /**
             * Removes the event handlers attached previously with addEvents.
             *
             * @private
             * @function Highcharts.Navigator#removeEvents
             */
            removeEvents: function () {
                if (this.eventsToUnbind) {
                    this.eventsToUnbind.forEach(function (unbind) {
                        unbind();
                    });
                    this.eventsToUnbind = undefined;
                }
                this.removeBaseSeriesEvents();
            },

            /**
             * Remove data events.
             *
             * @private
             * @function Highcharts.Navigator#removeBaseSeriesEvents
             */
            removeBaseSeriesEvents: function () {
                var baseSeries = this.baseSeries || [];

                if (this.navigatorEnabled && baseSeries[0]) {
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        baseSeries.forEach(function (series) {
                            removeEvent(series, 'updatedData', this.updatedDataHandler);
                        }, this);
                    }

                    // We only listen for extremes-events on the first baseSeries
                    if (baseSeries[0].xAxis) {
                        removeEvent(
                            baseSeries[0].xAxis,
                            'foundExtremes',
                            this.modifyBaseAxisExtremes
                        );
                    }
                }
            },

            /**
             * Initialize the Navigator object
             *
             * @private
             * @function Highcharts.Navigator#init
             *
             * @param {Highcharts.Chart} chart
             */
            init: function (chart) {
                var chartOptions = chart.options,
                    navigatorOptions = chartOptions.navigator,
                    navigatorEnabled = navigatorOptions.enabled,
                    scrollbarOptions = chartOptions.scrollbar,
                    scrollbarEnabled = scrollbarOptions.enabled,
                    height = navigatorEnabled ? navigatorOptions.height : 0,
                    scrollbarHeight = scrollbarEnabled ? scrollbarOptions.height : 0;

                this.handles = [];
                this.shades = [];

                this.chart = chart;
                this.setBaseSeries();

                this.height = height;
                this.scrollbarHeight = scrollbarHeight;
                this.scrollbarEnabled = scrollbarEnabled;
                this.navigatorEnabled = navigatorEnabled;
                this.navigatorOptions = navigatorOptions;
                this.scrollbarOptions = scrollbarOptions;
                this.outlineHeight = height + scrollbarHeight;

                this.opposite = pick(
                    navigatorOptions.opposite,
                    !navigatorEnabled && chart.inverted
                ); // #6262

                var navigator = this,
                    baseSeries = navigator.baseSeries,
                    xAxisIndex = chart.xAxis.length,
                    yAxisIndex = chart.yAxis.length,
                    baseXaxis = baseSeries && baseSeries[0] && baseSeries[0].xAxis ||
                        chart.xAxis[0] || { options: {} };

                chart.isDirtyBox = true;

                if (navigator.navigatorEnabled) {
                    // an x axis is required for scrollbar also
                    navigator.xAxis = new Axis(chart, merge({
                        // inherit base xAxis' break and ordinal options
                        breaks: baseXaxis.options.breaks,
                        ordinal: baseXaxis.options.ordinal
                    }, navigatorOptions.xAxis, {
                        id: 'navigator-x-axis',
                        yAxis: 'navigator-y-axis',
                        isX: true,
                        type: 'datetime',
                        index: xAxisIndex,
                        isInternal: true,
                        offset: 0,
                        keepOrdinalPadding: true, // #2436
                        startOnTick: false,
                        endOnTick: false,
                        minPadding: 0,
                        maxPadding: 0,
                        zoomEnabled: false
                    }, chart.inverted ? {
                        offsets: [scrollbarHeight, 0, -scrollbarHeight, 0],
                        width: height
                    } : {
                        offsets: [0, -scrollbarHeight, 0, scrollbarHeight],
                        height: height
                    }));

                    navigator.yAxis = new Axis(chart, merge(navigatorOptions.yAxis, {
                        id: 'navigator-y-axis',
                        alignTicks: false,
                        offset: 0,
                        index: yAxisIndex,
                        isInternal: true,
                        zoomEnabled: false
                    }, chart.inverted ? {
                        width: height
                    } : {
                        height: height
                    }));

                    // If we have a base series, initialize the navigator series
                    if (baseSeries || navigatorOptions.series.data) {
                        navigator.updateNavigatorSeries(false);

                    // If not, set up an event to listen for added series
                    } else if (chart.series.length === 0) {

                        navigator.unbindRedraw = addEvent(
                            chart,
                            'beforeRedraw',
                            function () {
                                // We've got one, now add it as base
                                if (chart.series.length > 0 && !navigator.series) {
                                    navigator.setBaseSeries();
                                    navigator.unbindRedraw(); // reset
                                }
                            }
                        );
                    }

                    navigator.reversedExtremes = (
                        chart.inverted && !navigator.xAxis.reversed
                    ) || (
                        !chart.inverted && navigator.xAxis.reversed
                    );

                    // Render items, so we can bind events to them:
                    navigator.renderElements();
                    // Add mouse events
                    navigator.addMouseEvents();

                // in case of scrollbar only, fake an x axis to get translation
                } else {
                    navigator.xAxis = {
                        translate: function (value, reverse) {
                            var axis = chart.xAxis[0],
                                ext = axis.getExtremes(),
                                scrollTrackWidth = axis.len - 2 * scrollbarHeight,
                                min = numExt('min', axis.options.min, ext.dataMin),
                                valueRange = numExt(
                                    'max',
                                    axis.options.max,
                                    ext.dataMax
                                ) - min;

                            return reverse ?
                                // from pixel to value
                                (value * valueRange / scrollTrackWidth) + min :
                                // from value to pixel
                                scrollTrackWidth * (value - min) / valueRange;
                        },
                        toPixels: function (value) {
                            return this.translate(value);
                        },
                        toValue: function (value) {
                            return this.translate(value, true);
                        },
                        toFixedRange: Axis.prototype.toFixedRange,
                        fake: true
                    };
                }


                // Initialize the scrollbar
                if (chart.options.scrollbar.enabled) {
                    chart.scrollbar = navigator.scrollbar = new Scrollbar(
                        chart.renderer,
                        merge(chart.options.scrollbar, {
                            margin: navigator.navigatorEnabled ? 0 : 10,
                            vertical: chart.inverted
                        }),
                        chart
                    );
                    addEvent(navigator.scrollbar, 'changed', function (e) {
                        var range = navigator.size,
                            to = range * this.to,
                            from = range * this.from;

                        navigator.hasDragged = navigator.scrollbar.hasDragged;
                        navigator.render(0, 0, from, to);

                        if (
                            chart.options.scrollbar.liveRedraw ||
                            (
                                e.DOMType !== 'mousemove' &&
                                e.DOMType !== 'touchmove'
                            )
                        ) {
                            setTimeout(function () {
                                navigator.onMouseUp(e);
                            });
                        }
                    });
                }

                // Add data events
                navigator.addBaseSeriesEvents();
                // Add redraw events
                navigator.addChartEvents();
            },

            /**
             * Get the union data extremes of the chart - the outer data extremes of the
             * base X axis and the navigator axis.
             *
             * @private
             * @function Highcharts.Navigator#getUnionExtremes
             *
             * @param {boolean} returnFalseOnNoBaseSeries
             *        as the param says.
             *
             * @return {*}
             */
            getUnionExtremes: function (returnFalseOnNoBaseSeries) {
                var baseAxis = this.chart.xAxis[0],
                    navAxis = this.xAxis,
                    navAxisOptions = navAxis.options,
                    baseAxisOptions = baseAxis.options,
                    ret;

                if (!returnFalseOnNoBaseSeries || baseAxis.dataMin !== null) {
                    ret = {
                        dataMin: pick( // #4053
                            navAxisOptions && navAxisOptions.min,
                            numExt(
                                'min',
                                baseAxisOptions.min,
                                baseAxis.dataMin,
                                navAxis.dataMin,
                                navAxis.min
                            )
                        ),
                        dataMax: pick(
                            navAxisOptions && navAxisOptions.max,
                            numExt(
                                'max',
                                baseAxisOptions.max,
                                baseAxis.dataMax,
                                navAxis.dataMax,
                                navAxis.max
                            )
                        )
                    };
                }
                return ret;
            },

            /**
             * Set the base series and update the navigator series from this. With a bit
             * of modification we should be able to make this an API method to be called
             * from the outside
             *
             * @private
             * @function Highcharts.Navigator#setBaseSeries
             *
             * @param {*} baseSeriesOptions
             *        Additional series options for a navigator
             *
             * @param {boolean} [redraw]
             *        Whether to redraw after update.
             */
            setBaseSeries: function (baseSeriesOptions, redraw) {
                var chart = this.chart,
                    baseSeries = this.baseSeries = [];

                baseSeriesOptions = (
                    baseSeriesOptions ||
                    chart.options && chart.options.navigator.baseSeries ||
                    (chart.series.length ?
                        // Find the first non-navigator series (#8430)
                        H.find(chart.series, function (s) {
                            return !s.options.isInternal;
                        }).index : 0)
                );

                // Iterate through series and add the ones that should be shown in
                // navigator.
                (chart.series || []).forEach(function (series, i) {
                    if (
                        // Don't include existing nav series
                        !series.options.isInternal &&
                        (
                            series.options.showInNavigator ||
                            (
                                i === baseSeriesOptions ||
                                series.options.id === baseSeriesOptions
                            ) &&
                            series.options.showInNavigator !== false
                        )
                    ) {
                        baseSeries.push(series);
                    }
                });

                // When run after render, this.xAxis already exists
                if (this.xAxis && !this.xAxis.fake) {
                    this.updateNavigatorSeries(true, redraw);
                }
            },

            /**
             * Update series in the navigator from baseSeries, adding new if does not
             * exist.
             *
             * @private
             * @function Highcharts.Navigator.updateNavigatorSeries
             *
             * @param {boolean} addEvents
             *
             * @param {boolean} redraw
             */
            updateNavigatorSeries: function (addEvents, redraw) {
                var navigator = this,
                    chart = navigator.chart,
                    baseSeries = navigator.baseSeries,
                    baseOptions,
                    mergedNavSeriesOptions,
                    chartNavigatorSeriesOptions = navigator.navigatorOptions.series,
                    baseNavigatorOptions,
                    navSeriesMixin = {
                        enableMouseTracking: false,
                        index: null, // #6162
                        linkedTo: null, // #6734
                        group: 'nav', // for columns
                        padXAxis: false,
                        xAxis: 'navigator-x-axis',
                        yAxis: 'navigator-y-axis',
                        showInLegend: false,
                        stacking: false, // #4823
                        isInternal: true,
                        states: {
                            inactive: {
                                opacity: 1
                            }
                        }
                    },
                    // Remove navigator series that are no longer in the baseSeries
                    navigatorSeries = navigator.series =
                        (navigator.series || []).filter(function (navSeries) {
                            var base = navSeries.baseSeries;

                            if (baseSeries.indexOf(base) < 0) { // Not in array
                                // If there is still a base series connected to this
                                // series, remove event handler and reference.
                                if (base) {
                                    removeEvent(
                                        base,
                                        'updatedData',
                                        navigator.updatedDataHandler
                                    );
                                    delete base.navigatorSeries;
                                }
                                // Kill the nav series. It may already have been
                                // destroyed (#8715).
                                if (navSeries.chart) {
                                    navSeries.destroy();
                                }
                                return false;
                            }
                            return true;
                        });

                // Go through each base series and merge the options to create new
                // series
                if (baseSeries && baseSeries.length) {
                    baseSeries.forEach(function eachBaseSeries(base) {
                        var linkedNavSeries = base.navigatorSeries,
                            userNavOptions = extend(
                                // Grab color and visibility from base as default
                                {
                                    color: base.color,
                                    visible: base.visible
                                },
                                !isArray(chartNavigatorSeriesOptions) ?
                                    chartNavigatorSeriesOptions :
                                    defaultOptions.navigator.series
                            );

                        // Don't update if the series exists in nav and we have disabled
                        // adaptToUpdatedData.
                        if (
                            linkedNavSeries &&
                            navigator.navigatorOptions.adaptToUpdatedData === false
                        ) {
                            return;
                        }

                        navSeriesMixin.name = 'Navigator ' + baseSeries.length;

                        baseOptions = base.options || {};
                        baseNavigatorOptions = baseOptions.navigatorOptions || {};
                        mergedNavSeriesOptions = merge(
                            baseOptions,
                            navSeriesMixin,
                            userNavOptions,
                            baseNavigatorOptions
                        );

                        // Merge data separately. Do a slice to avoid mutating the
                        // navigator options from base series (#4923).
                        var navigatorSeriesData =
                            baseNavigatorOptions.data || userNavOptions.data;

                        navigator.hasNavigatorData =
                            navigator.hasNavigatorData || !!navigatorSeriesData;
                        mergedNavSeriesOptions.data =
                            navigatorSeriesData ||
                            baseOptions.data && baseOptions.data.slice(0);

                        // Update or add the series
                        if (linkedNavSeries && linkedNavSeries.options) {
                            linkedNavSeries.update(mergedNavSeriesOptions, redraw);
                        } else {
                            base.navigatorSeries = chart.initSeries(
                                mergedNavSeriesOptions
                            );
                            base.navigatorSeries.baseSeries = base; // Store ref
                            navigatorSeries.push(base.navigatorSeries);
                        }
                    });
                }

                // If user has defined data (and no base series) or explicitly defined
                // navigator.series as an array, we create these series on top of any
                // base series.
                if (
                    chartNavigatorSeriesOptions.data &&
                    !(baseSeries && baseSeries.length) ||
                    isArray(chartNavigatorSeriesOptions)
                ) {
                    navigator.hasNavigatorData = false;
                    // Allow navigator.series to be an array
                    chartNavigatorSeriesOptions = H.splat(chartNavigatorSeriesOptions);
                    chartNavigatorSeriesOptions
                        .forEach(function (userSeriesOptions, i) {
                            navSeriesMixin.name =
                            'Navigator ' + (navigatorSeries.length + 1);
                            mergedNavSeriesOptions = merge(
                                defaultOptions.navigator.series,
                                {
                                // Since we don't have a base series to pull color from,
                                // try to fake it by using color from series with same
                                // index. Otherwise pull from the colors array. We need
                                // an explicit color as otherwise updates will increment
                                // color counter and we'll get a new color for each
                                // update of the nav series.
                                    color: chart.series[i] &&
                                    !chart.series[i].options.isInternal &&
                                    chart.series[i].color ||
                                    chart.options.colors[i] ||
                                    chart.options.colors[0]
                                },
                                navSeriesMixin,
                                userSeriesOptions
                            );
                            mergedNavSeriesOptions.data = userSeriesOptions.data;
                            if (mergedNavSeriesOptions.data) {
                                navigator.hasNavigatorData = true;
                                navigatorSeries.push(
                                    chart.initSeries(mergedNavSeriesOptions)
                                );
                            }
                        });
                }

                if (addEvents) {
                    this.addBaseSeriesEvents();
                }
            },

            /**
             * Add data events.
             * For example when main series is updated we need to recalculate extremes
             *
             * @private
             * @function Highcharts.Navigator#addBaseSeriesEvent
             */
            addBaseSeriesEvents: function () {
                var navigator = this,
                    baseSeries = navigator.baseSeries || [];

                // Bind modified extremes event to first base's xAxis only.
                // In event of > 1 base-xAxes, the navigator will ignore those.
                // Adding this multiple times to the same axis is no problem, as
                // duplicates should be discarded by the browser.
                if (baseSeries[0] && baseSeries[0].xAxis) {
                    addEvent(
                        baseSeries[0].xAxis,
                        'foundExtremes',
                        this.modifyBaseAxisExtremes
                    );
                }

                baseSeries.forEach(function (base) {
                    // Link base series show/hide to navigator series visibility
                    addEvent(base, 'show', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(true, false);
                        }
                    });
                    addEvent(base, 'hide', function () {
                        if (this.navigatorSeries) {
                            this.navigatorSeries.setVisible(false, false);
                        }
                    });

                    // Respond to updated data in the base series, unless explicitily
                    // not adapting to data changes.
                    if (this.navigatorOptions.adaptToUpdatedData !== false) {
                        if (base.xAxis) {
                            addEvent(base, 'updatedData', this.updatedDataHandler);
                        }
                    }

                    // Handle series removal
                    addEvent(base, 'remove', function () {
                        if (this.navigatorSeries) {
                            erase(navigator.series, this.navigatorSeries);
                            if (defined(this.navigatorSeries.options)) {
                                this.navigatorSeries.remove(false);
                            }
                            delete this.navigatorSeries;
                        }
                    });
                }, this);
            },

            /**
             * Get minimum from all base series connected to the navigator
             *
             * @param  {number} currentSeriesMin
             *         Minium from the current series
             *
             * @return {number} Minimum from all series
             */
            getBaseSeriesMin: function (currentSeriesMin) {
                return this.baseSeries.reduce(
                    function (min, series) {
                        // (#10193)
                        return Math.min(min, series.xData ? series.xData[0] : min);
                    },
                    currentSeriesMin
                );
            },

            /**
             * Set the navigator x axis extremes to reflect the total. The navigator
             * extremes should always be the extremes of the union of all series in the
             * chart as well as the navigator series.
             *
             * @private
             * @function Highcharts.Navigator#modifyNavigatorAxisExtremes
             */
            modifyNavigatorAxisExtremes: function () {
                var xAxis = this.xAxis,
                    unionExtremes;

                if (xAxis.getExtremes) {
                    unionExtremes = this.getUnionExtremes(true);
                    if (
                        unionExtremes &&
                        (
                            unionExtremes.dataMin !== xAxis.min ||
                            unionExtremes.dataMax !== xAxis.max
                        )
                    ) {
                        xAxis.min = unionExtremes.dataMin;
                        xAxis.max = unionExtremes.dataMax;
                    }
                }
            },

            /**
             * Hook to modify the base axis extremes with information from the Navigator
             *
             * @private
             * @function Highcharts.Navigator#modifyBaseAxisExtremes
             */
            modifyBaseAxisExtremes: function () {
                var baseXAxis = this,
                    navigator = baseXAxis.chart.navigator,
                    baseExtremes = baseXAxis.getExtremes(),
                    baseMin = baseExtremes.min,
                    baseMax = baseExtremes.max,
                    baseDataMin = baseExtremes.dataMin,
                    baseDataMax = baseExtremes.dataMax,
                    range = baseMax - baseMin,
                    stickToMin = navigator.stickToMin,
                    stickToMax = navigator.stickToMax,
                    overscroll = pick(baseXAxis.options.overscroll, 0),
                    newMax,
                    newMin,
                    navigatorSeries = navigator.series && navigator.series[0],
                    hasSetExtremes = !!baseXAxis.setExtremes,

                    // When the extremes have been set by range selector button, don't
                    // stick to min or max. The range selector buttons will handle the
                    // extremes. (#5489)
                    unmutable = baseXAxis.eventArgs &&
                        baseXAxis.eventArgs.trigger === 'rangeSelectorButton';

                if (!unmutable) {

                    // If the zoomed range is already at the min, move it to the right
                    // as new data comes in
                    if (stickToMin) {
                        newMin = baseDataMin;
                        newMax = newMin + range;
                    }

                    // If the zoomed range is already at the max, move it to the right
                    // as new data comes in
                    if (stickToMax) {
                        newMax = baseDataMax + overscroll;

                        // if stickToMin is true, the new min value is set above
                        if (!stickToMin) {
                            newMin = Math.max(
                                newMax - range,
                                navigator.getBaseSeriesMin(
                                    navigatorSeries && navigatorSeries.xData ?
                                        navigatorSeries.xData[0] :
                                        -Number.MAX_VALUE
                                )
                            );
                        }
                    }

                    // Update the extremes
                    if (hasSetExtremes && (stickToMin || stickToMax)) {
                        if (isNumber(newMin)) {
                            baseXAxis.min = baseXAxis.userMin = newMin;
                            baseXAxis.max = baseXAxis.userMax = newMax;
                        }
                    }
                }

                // Reset
                navigator.stickToMin = navigator.stickToMax = null;
            },

            /**
             * Handler for updated data on the base series. When data is modified, the
             * navigator series must reflect it. This is called from the Chart.redraw
             * function before axis and series extremes are computed.
             *
             * @private
             * @function Highcharts.Navigator#updateDataHandler
             */
            updatedDataHandler: function () {
                var navigator = this.chart.navigator,
                    baseSeries = this,
                    navigatorSeries = this.navigatorSeries,
                    xDataMin = navigator.getBaseSeriesMin(baseSeries.xData[0]);

                // If the scrollbar is scrolled all the way to the right, keep right as
                // new data  comes in.
                navigator.stickToMax = navigator.reversedExtremes ?
                    Math.round(navigator.zoomedMin) === 0 :
                    Math.round(navigator.zoomedMax) >= Math.round(navigator.size);

                // Detect whether the zoomed area should stick to the minimum or
                // maximum. If the current axis minimum falls outside the new updated
                // dataset, we must adjust.
                navigator.stickToMin = isNumber(baseSeries.xAxis.min) &&
                    (baseSeries.xAxis.min <= xDataMin) &&
                    (!this.chart.fixedRange || !navigator.stickToMax);

                // Set the navigator series data to the new data of the base series
                if (navigatorSeries && !navigator.hasNavigatorData) {
                    navigatorSeries.options.pointStart = baseSeries.xData[0];
                    navigatorSeries.setData(
                        baseSeries.options.data,
                        false,
                        null,
                        false
                    ); // #5414
                }
            },

            /**
             * Add chart events, like redrawing navigator, when chart requires that.
             *
             * @private
             * @function Highcharts.Navigator#addChartEvents
             */
            addChartEvents: function () {
                if (!this.eventsToUnbind) {
                    this.eventsToUnbind = [];
                }

                this.eventsToUnbind.push(
                    // Move the scrollbar after redraw, like after data updata even if
                    // axes don't redraw
                    addEvent(
                        this.chart,
                        'redraw',
                        function () {
                            var navigator = this.navigator,
                                xAxis = navigator && (
                                    navigator.baseSeries &&
                                    navigator.baseSeries[0] &&
                                    navigator.baseSeries[0].xAxis ||
                                    navigator.scrollbar && this.xAxis[0]
                                ); // #5709

                            if (xAxis) {
                                navigator.render(xAxis.min, xAxis.max);
                            }
                        }
                    ),
                    // Make room for the navigator, can be placed around the chart:
                    addEvent(
                        this.chart,
                        'getMargins',
                        function () {
                            var chart = this,
                                navigator = chart.navigator,
                                marginName = navigator.opposite ?
                                    'plotTop' : 'marginBottom';

                            if (chart.inverted) {
                                marginName = navigator.opposite ?
                                    'marginRight' : 'plotLeft';
                            }

                            chart[marginName] = (chart[marginName] || 0) + (
                                navigator.navigatorEnabled || !chart.inverted ?
                                    navigator.outlineHeight :
                                    0
                            ) + navigator.navigatorOptions.margin;
                        }
                    )
                );
            },

            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.Navigator#destroy
             */
            destroy: function () {

                // Disconnect events added in addEvents
                this.removeEvents();

                if (this.xAxis) {
                    erase(this.chart.xAxis, this.xAxis);
                    erase(this.chart.axes, this.xAxis);
                }
                if (this.yAxis) {
                    erase(this.chart.yAxis, this.yAxis);
                    erase(this.chart.axes, this.yAxis);
                }
                // Destroy series
                (this.series || []).forEach(function (s) {
                    if (s.destroy) {
                        s.destroy();
                    }
                });

                // Destroy properties
                [
                    'series', 'xAxis', 'yAxis', 'shades', 'outline', 'scrollbarTrack',
                    'scrollbarRifles', 'scrollbarGroup', 'scrollbar', 'navigatorGroup',
                    'rendered'
                ].forEach(function (prop) {
                    if (this[prop] && this[prop].destroy) {
                        this[prop].destroy();
                    }
                    this[prop] = null;
                }, this);

                // Destroy elements in collection
                [this.handles].forEach(function (coll) {
                    destroyObjectProperties(coll);
                }, this);
            }
        };

        if (!H.Navigator) {
            H.Navigator = Navigator;

            // For Stock charts, override selection zooming with some special features
            // because X axis zooming is already allowed by the Navigator and Range
            // selector.
            addEvent(Axis, 'zoom', function (e) {
                var chart = this.chart,
                    chartOptions = chart.options,
                    zoomType = chartOptions.chart.zoomType,
                    pinchType = chartOptions.chart.pinchType,
                    previousZoom,
                    navigator = chartOptions.navigator,
                    rangeSelector = chartOptions.rangeSelector;

                if (this.isXAxis && ((navigator && navigator.enabled) ||
                        (rangeSelector && rangeSelector.enabled))) {

                    // For y only zooming, ignore the X axis completely
                    if (zoomType === 'y') {
                        e.zoomed = false;

                    // For xy zooming, record the state of the zoom before zoom
                    // selection, then when the reset button is pressed, revert to this
                    // state. This should apply only if the chart is initialized with a
                    // range (#6612), otherwise zoom all the way out.
                    } else if (
                        (
                            (!isTouchDevice && zoomType === 'xy') ||
                            (isTouchDevice && pinchType === 'xy')
                        ) &&
                        this.options.range
                    ) {

                        previousZoom = this.previousZoom;
                        if (defined(e.newMin)) {
                            this.previousZoom = [this.min, this.max];
                        } else if (previousZoom) {
                            e.newMin = previousZoom[0];
                            e.newMax = previousZoom[1];
                            delete this.previousZoom;
                        }
                    }

                }
                if (e.zoomed !== undefined) {
                    e.preventDefault();
                }
            });

            // For Stock charts. For x only zooming, do not to create the zoom button
            // because X axis zooming is already allowed by the Navigator and Range
            // selector. (#9285)
            addEvent(Chart, 'beforeShowResetZoom', function () {
                var chartOptions = this.options,
                    navigator = chartOptions.navigator,
                    rangeSelector = chartOptions.rangeSelector;

                if (
                    (
                        (navigator && navigator.enabled) ||
                        (rangeSelector && rangeSelector.enabled)
                    ) && (
                        (!isTouchDevice && chartOptions.chart.zoomType === 'x') ||
                        (isTouchDevice && chartOptions.chart.pinchType === 'x')
                    )
                ) {
                    return false;
                }
            });

            // Initialize navigator for stock charts
            addEvent(Chart, 'beforeRender', function () {
                var options = this.options;

                if (options.navigator.enabled || options.scrollbar.enabled) {
                    this.scroller = this.navigator = new Navigator(this);
                }
            });

            // For stock charts, extend the Chart.setChartSize method so that we can set
            // the final top position of the navigator once the height of the chart,
            // including the legend, is determined. #367. We can't use Chart.getMargins,
            // because labels offsets are not calculated yet.
            addEvent(Chart, 'afterSetChartSize', function () {

                var legend = this.legend,
                    navigator = this.navigator,
                    scrollbarHeight,
                    legendOptions,
                    xAxis,
                    yAxis;

                if (navigator) {
                    legendOptions = legend && legend.options;
                    xAxis = navigator.xAxis;
                    yAxis = navigator.yAxis;
                    scrollbarHeight = navigator.scrollbarHeight;

                    // Compute the top position
                    if (this.inverted) {
                        navigator.left = navigator.opposite ?
                            this.chartWidth - scrollbarHeight - navigator.height :
                            this.spacing[3] + scrollbarHeight;
                        navigator.top = this.plotTop + scrollbarHeight;
                    } else {
                        navigator.left = this.plotLeft + scrollbarHeight;
                        navigator.top = navigator.navigatorOptions.top ||
                            this.chartHeight -
                            navigator.height -
                            scrollbarHeight -
                            this.spacing[2] -
                            (
                                this.rangeSelector && this.extraBottomMargin ?
                                    this.rangeSelector.getHeight() :
                                    0
                            ) -
                            (
                                (
                                    legendOptions &&
                                    legendOptions.verticalAlign === 'bottom' &&
                                    legendOptions.enabled &&
                                    !legendOptions.floating
                                ) ?
                                    legend.legendHeight +
                                    pick(legendOptions.margin, 10) :
                                    0
                            );
                    }

                    if (xAxis && yAxis) { // false if navigator is disabled (#904)

                        if (this.inverted) {
                            xAxis.options.left = yAxis.options.left = navigator.left;
                        } else {
                            xAxis.options.top = yAxis.options.top = navigator.top;
                        }

                        xAxis.setAxisSize();
                        yAxis.setAxisSize();
                    }
                }
            });

            // Merge options, if no scrolling exists yet
            addEvent(Chart, 'update', function (e) {

                var navigatorOptions = (e.options.navigator || {}),
                    scrollbarOptions = (e.options.scrollbar || {});

                if (!this.navigator && !this.scroller &&
                    (navigatorOptions.enabled || scrollbarOptions.enabled)
                ) {
                    merge(true, this.options.navigator, navigatorOptions);
                    merge(true, this.options.scrollbar, scrollbarOptions);
                    delete e.options.navigator;
                    delete e.options.scrollbar;
                }

            });

            // Initialize navigator, if no scrolling exists yet
            addEvent(Chart, 'afterUpdate', function (event) {

                if (!this.navigator && !this.scroller &&
                    (this.options.navigator.enabled || this.options.scrollbar.enabled)
                ) {
                    this.scroller = this.navigator = new Navigator(this);

                    if (pick(event.redraw, true)) {
                        this.redraw(event.animation); // #7067
                    }
                }

            });

            // Handle adding new series
            addEvent(Chart, 'afterAddSeries', function () {
                if (this.navigator) {
                    // Recompute which series should be shown in navigator, and add them
                    this.navigator.setBaseSeries(null, false);
                }
            });

            // Handle updating series
            addEvent(Series, 'afterUpdate', function () {
                if (this.chart.navigator && !this.options.isInternal) {
                    this.chart.navigator.setBaseSeries(null, false);
                }
            });

            Chart.prototype.callbacks.push(function (chart) {
                var extremes,
                    navigator = chart.navigator;

                // Initialize the navigator
                if (navigator && chart.xAxis[0]) {
                    extremes = chart.xAxis[0].getExtremes();
                    navigator.render(extremes.min, extremes.max);
                }
            });
        }

    });
    _registerModule(_modules, 'parts/OrdinalAxis.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */


        // Has a dependency on Navigator due to the use of Axis.toFixedRange

        var addEvent = H.addEvent,
            Axis = H.Axis,
            Chart = H.Chart,
            css = H.css,
            defined = H.defined,
            extend = H.extend,
            noop = H.noop,
            pick = H.pick,
            Series = H.Series,
            timeUnits = H.timeUnits;

        /* ************************************************************************** *
         * Start ordinal axis logic                                                   *
         * ************************************************************************** */
        addEvent(Series, 'updatedData', function () {
            var xAxis = this.xAxis;

            // Destroy the extended ordinal index on updated data
            if (xAxis && xAxis.options.ordinal) {
                delete xAxis.ordinalIndex;
            }
        });

        /**
         * In an ordinal axis, there might be areas with dense consentrations of points,
         * then large gaps between some. Creating equally distributed ticks over this
         * entire range may lead to a huge number of ticks that will later be removed.
         * So instead, break the positions up in segments, find the tick positions for
         * each segment then concatenize them. This method is used from both data
         * grouping logic and X axis tick position logic.
         * @private
         */
        Axis.prototype.getTimeTicks = function (
            normalizedInterval,
            min,
            max,
            startOfWeek,
            positions,
            closestDistance,
            findHigherRanks
        ) {

            var start = 0,
                end,
                segmentPositions,
                higherRanks = {},
                hasCrossedHigherRank,
                info,
                posLength,
                outsideMax,
                groupPositions = [],
                lastGroupPosition = -Number.MAX_VALUE,
                tickPixelIntervalOption = this.options.tickPixelInterval,
                time = this.chart.time,
                // Record all the start positions of a segment, to use when deciding
                // what's a gap in the data.
                segmentStarts = [];

            // The positions are not always defined, for example for ordinal positions
            // when data has regular interval (#1557, #2090)
            if (
                (!this.options.ordinal && !this.options.breaks) ||
                !positions ||
                positions.length < 3 ||
                min === undefined
            ) {
                return time.getTimeTicks.apply(time, arguments);
            }

            // Analyze the positions array to split it into segments on gaps larger than
            // 5 times the closest distance. The closest distance is already found at
            // this point, so we reuse that instead of computing it again.
            posLength = positions.length;

            for (end = 0; end < posLength; end++) {

                outsideMax = end && positions[end - 1] > max;

                if (positions[end] < min) { // Set the last position before min
                    start = end;
                }

                if (
                    end === posLength - 1 ||
                    positions[end + 1] - positions[end] > closestDistance * 5 ||
                    outsideMax
                ) {

                    // For each segment, calculate the tick positions from the
                    // getTimeTicks utility function. The interval will be the same
                    // regardless of how long the segment is.
                    if (positions[end] > lastGroupPosition) { // #1475

                        segmentPositions = time.getTimeTicks(
                            normalizedInterval,
                            positions[start],
                            positions[end],
                            startOfWeek
                        );

                        // Prevent duplicate groups, for example for multiple segments
                        // within one larger time frame (#1475)
                        while (
                            segmentPositions.length &&
                            segmentPositions[0] <= lastGroupPosition
                        ) {
                            segmentPositions.shift();
                        }
                        if (segmentPositions.length) {
                            lastGroupPosition =
                                segmentPositions[segmentPositions.length - 1];
                        }

                        segmentStarts.push(groupPositions.length);
                        groupPositions = groupPositions.concat(segmentPositions);
                    }
                    // Set start of next segment
                    start = end + 1;
                }

                if (outsideMax) {
                    break;
                }
            }

            // Get the grouping info from the last of the segments. The info is the same
            // for all segments.
            info = segmentPositions.info;

            // Optionally identify ticks with higher rank, for example when the ticks
            // have crossed midnight.
            if (findHigherRanks && info.unitRange <= timeUnits.hour) {
                end = groupPositions.length - 1;

                // Compare points two by two
                for (start = 1; start < end; start++) {
                    if (
                        time.dateFormat('%d', groupPositions[start]) !==
                        time.dateFormat('%d', groupPositions[start - 1])
                    ) {
                        higherRanks[groupPositions[start]] = 'day';
                        hasCrossedHigherRank = true;
                    }
                }

                // If the complete array has crossed midnight, we want to mark the first
                // positions also as higher rank
                if (hasCrossedHigherRank) {
                    higherRanks[groupPositions[0]] = 'day';
                }
                info.higherRanks = higherRanks;
            }

            // Save the info
            info.segmentStarts = segmentStarts;
            groupPositions.info = info;


            // Don't show ticks within a gap in the ordinal axis, where the space
            // between two points is greater than a portion of the tick pixel interval
            if (findHigherRanks && defined(tickPixelIntervalOption)) {

                var length = groupPositions.length,
                    i = length,
                    itemToRemove,
                    translated,
                    translatedArr = [],
                    lastTranslated,
                    medianDistance,
                    distance,
                    distances = [];

                // Find median pixel distance in order to keep a reasonably even
                // distance between ticks (#748)
                while (i--) {
                    translated = this.translate(groupPositions[i]);
                    if (lastTranslated) {
                        distances[i] = lastTranslated - translated;
                    }
                    translatedArr[i] = lastTranslated = translated;
                }
                distances.sort();
                medianDistance = distances[Math.floor(distances.length / 2)];
                if (medianDistance < tickPixelIntervalOption * 0.6) {
                    medianDistance = null;
                }

                // Now loop over again and remove ticks where needed
                i = groupPositions[length - 1] > max ? length - 1 : length; // #817
                lastTranslated = undefined;
                while (i--) {
                    translated = translatedArr[i];
                    distance = Math.abs(lastTranslated - translated);
                    // #4175 - when axis is reversed, the distance, is negative but
                    // tickPixelIntervalOption positive, so we need to compare the same
                    // values

                    // Remove ticks that are closer than 0.6 times the pixel interval
                    // from the one to the right, but not if it is close to the median
                    // distance (#748).
                    if (
                        lastTranslated &&
                        distance < tickPixelIntervalOption * 0.8 &&
                        (medianDistance === null || distance < medianDistance * 0.8)
                    ) {

                        // Is this a higher ranked position with a normal position to
                        // the right?
                        if (
                            higherRanks[groupPositions[i]] &&
                            !higherRanks[groupPositions[i + 1]]
                        ) {

                            // Yes: remove the lower ranked neighbour to the right
                            itemToRemove = i + 1;
                            lastTranslated = translated; // #709

                        } else {

                            // No: remove this one
                            itemToRemove = i;
                        }

                        groupPositions.splice(itemToRemove, 1);

                    } else {
                        lastTranslated = translated;
                    }
                }
            }
            return groupPositions;
        };

        // Extend the Axis prototype
        extend(Axis.prototype, /** @lends Axis.prototype */ {

            /**
             * Calculate the ordinal positions before tick positions are calculated.
             *
             * @private
             * @function Highcharts.Axis#beforeSetTickPositions
             */
            beforeSetTickPositions: function () {
                var axis = this,
                    len,
                    ordinalPositions = [],
                    uniqueOrdinalPositions,
                    useOrdinal = false,
                    dist,
                    extremes = axis.getExtremes(),
                    min = extremes.min,
                    max = extremes.max,
                    minIndex,
                    maxIndex,
                    slope,
                    hasBreaks = axis.isXAxis && !!axis.options.breaks,
                    isOrdinal = axis.options.ordinal,
                    overscrollPointsRange = Number.MAX_VALUE,
                    ignoreHiddenSeries = axis.chart.options.chart.ignoreHiddenSeries,
                    i,
                    hasBoostedSeries;

                // Apply the ordinal logic
                if (isOrdinal || hasBreaks) { // #4167 YAxis is never ordinal ?

                    axis.series.forEach(function (series, i) {
                        uniqueOrdinalPositions = [];

                        if (
                            (!ignoreHiddenSeries || series.visible !== false) &&
                            (series.takeOrdinalPosition !== false || hasBreaks)
                        ) {

                            // concatenate the processed X data into the existing
                            // positions, or the empty array
                            ordinalPositions = ordinalPositions.concat(
                                series.processedXData
                            );
                            len = ordinalPositions.length;

                            // remove duplicates (#1588)
                            ordinalPositions.sort(function (a, b) {
                                // without a custom function it is sorted as strings
                                return a - b;
                            });

                            overscrollPointsRange = Math.min(
                                overscrollPointsRange,
                                pick(
                                    // Check for a single-point series:
                                    series.closestPointRange,
                                    overscrollPointsRange
                                )
                            );

                            if (len) {

                                i = 0;
                                while (i < len - 1) {
                                    if (
                                        ordinalPositions[i] !== ordinalPositions[i + 1]
                                    ) {
                                        uniqueOrdinalPositions.push(
                                            ordinalPositions[i + 1]
                                        );
                                    }
                                    i++;
                                }

                                // Check first item:
                                if (
                                    uniqueOrdinalPositions[0] !== ordinalPositions[0]
                                ) {
                                    uniqueOrdinalPositions.unshift(
                                        ordinalPositions[0]
                                    );
                                }

                                ordinalPositions = uniqueOrdinalPositions;
                            }
                        }

                        if (series.isSeriesBoosting) {
                            hasBoostedSeries = true;
                        }

                    });

                    if (hasBoostedSeries) {
                        ordinalPositions.length = 0;
                    }

                    // cache the length
                    len = ordinalPositions.length;

                    // Check if we really need the overhead of mapping axis data against
                    // the ordinal positions. If the series consist of evenly spaced
                    // data any way, we don't need any ordinal logic.
                    if (len > 2) { // two points have equal distance by default
                        dist = ordinalPositions[1] - ordinalPositions[0];
                        i = len - 1;
                        while (i-- && !useOrdinal) {
                            if (
                                ordinalPositions[i + 1] - ordinalPositions[i] !== dist
                            ) {
                                useOrdinal = true;
                            }
                        }

                        // When zooming in on a week, prevent axis padding for weekends
                        // even though the data within the week is evenly spaced.
                        if (
                            !axis.options.keepOrdinalPadding &&
                            (
                                ordinalPositions[0] - min > dist ||
                                max - ordinalPositions[ordinalPositions.length - 1] >
                                    dist
                            )
                        ) {
                            useOrdinal = true;
                        }
                    } else if (axis.options.overscroll) {
                        if (len === 2) {
                            // Exactly two points, distance for overscroll is fixed:
                            overscrollPointsRange =
                                ordinalPositions[1] - ordinalPositions[0];
                        } else if (len === 1) {
                            // We have just one point, closest distance is unknown.
                            // Assume then it is last point and overscrolled range:
                            overscrollPointsRange = axis.options.overscroll;
                            ordinalPositions = [
                                ordinalPositions[0],
                                ordinalPositions[0] + overscrollPointsRange
                            ];
                        } else {
                            // In case of zooming in on overscrolled range, stick to the
                            // old range:
                            overscrollPointsRange = axis.overscrollPointsRange;
                        }
                    }

                    // Record the slope and offset to compute the linear values from the
                    // array index. Since the ordinal positions may exceed the current
                    // range, get the start and end positions within it (#719, #665b)
                    if (useOrdinal) {

                        if (axis.options.overscroll) {
                            axis.overscrollPointsRange = overscrollPointsRange;
                            ordinalPositions = ordinalPositions.concat(
                                axis.getOverscrollPositions()
                            );
                        }

                        // Register
                        axis.ordinalPositions = ordinalPositions;

                        // This relies on the ordinalPositions being set. Use Math.max
                        // and Math.min to prevent padding on either sides of the data.
                        minIndex = axis.ordinal2lin( // #5979
                            Math.max(
                                min,
                                ordinalPositions[0]
                            ),
                            true
                        );
                        maxIndex = Math.max(axis.ordinal2lin(
                            Math.min(
                                max,
                                ordinalPositions[ordinalPositions.length - 1]
                            ),
                            true
                        ), 1); // #3339

                        // Set the slope and offset of the values compared to the
                        // indices in the ordinal positions
                        axis.ordinalSlope = slope = (max - min) / (maxIndex - minIndex);
                        axis.ordinalOffset = min - (minIndex * slope);

                    } else {
                        axis.overscrollPointsRange = pick(
                            axis.closestPointRange,
                            axis.overscrollPointsRange
                        );
                        axis.ordinalPositions = axis.ordinalSlope = axis.ordinalOffset =
                            undefined;
                    }
                }

                axis.isOrdinal = isOrdinal && useOrdinal; // #3818, #4196, #4926
                axis.groupIntervalFactor = null; // reset for next run
            },

            /**
             * Translate from a linear axis value to the corresponding ordinal axis
             * position. If there are no gaps in the ordinal axis this will be the same.
             * The translated value is the value that the point would have if the axis
             * were linear, using the same min and max.
             *
             * @private
             * @function Highcharts.Axis#val2lin
             *
             * @param {number} val
             *        The axis value.
             *
             * @param {boolean} toIndex
             *        Whether to return the index in the ordinalPositions or the new
             *        value.
             *
             * @return {number}
             */
            val2lin: function (val, toIndex) {
                var axis = this,
                    ordinalPositions = axis.ordinalPositions,
                    ret;

                if (!ordinalPositions) {
                    ret = val;

                } else {

                    var ordinalLength = ordinalPositions.length,
                        i,
                        distance,
                        ordinalIndex;

                    // first look for an exact match in the ordinalpositions array
                    i = ordinalLength;
                    while (i--) {
                        if (ordinalPositions[i] === val) {
                            ordinalIndex = i;
                            break;
                        }
                    }

                    // if that failed, find the intermediate position between the two
                    // nearest values
                    i = ordinalLength - 1;
                    while (i--) {
                        if (val > ordinalPositions[i] || i === 0) { // interpolate
                            // something between 0 and 1
                            distance = (val - ordinalPositions[i]) /
                                (ordinalPositions[i + 1] - ordinalPositions[i]);
                            ordinalIndex = i + distance;
                            break;
                        }
                    }
                    ret = toIndex ?
                        ordinalIndex :
                        axis.ordinalSlope * (ordinalIndex || 0) + axis.ordinalOffset;
                }
                return ret;
            },
            /**
             * Translate from linear (internal) to axis value.
             *
             * @private
             * @function Highcharts.Axis#lin2val
             *
             * @param {number} val
             *        The linear abstracted value.
             *
             * @param {boolean} fromIndex
             *        Translate from an index in the ordinal positions rather than a
             *        value.
             *
             * @return {number}
             */
            lin2val: function (val, fromIndex) {
                var axis = this,
                    ordinalPositions = axis.ordinalPositions,
                    ret;

                // the visible range contains only equally spaced values
                if (!ordinalPositions) {
                    ret = val;

                } else {

                    var ordinalSlope = axis.ordinalSlope,
                        ordinalOffset = axis.ordinalOffset,
                        i = ordinalPositions.length - 1,
                        linearEquivalentLeft,
                        linearEquivalentRight,
                        distance;


                    // Handle the case where we translate from the index directly, used
                    // only when panning an ordinal axis
                    if (fromIndex) {

                        if (val < 0) { // out of range, in effect panning to the left
                            val = ordinalPositions[0];
                        } else if (val > i) { // out of range, panning to the right
                            val = ordinalPositions[i];
                        } else { // split it up
                            i = Math.floor(val);
                            distance = val - i; // the decimal
                        }

                    // Loop down along the ordinal positions. When the linear equivalent
                    // of i matches an ordinal position, interpolate between the left
                    // and right values.
                    } else {
                        while (i--) {
                            linearEquivalentLeft = (ordinalSlope * i) + ordinalOffset;
                            if (val >= linearEquivalentLeft) {
                                linearEquivalentRight =
                                    (ordinalSlope * (i + 1)) + ordinalOffset;
                                // something between 0 and 1
                                distance = (val - linearEquivalentLeft) /
                                    (linearEquivalentRight - linearEquivalentLeft);
                                break;
                            }
                        }
                    }

                    // If the index is within the range of the ordinal positions, return
                    // the associated or interpolated value. If not, just return the
                    // value
                    return (
                        distance !== undefined && ordinalPositions[i] !== undefined ?
                            ordinalPositions[i] + (
                                distance ?
                                    distance *
                                    (ordinalPositions[i + 1] - ordinalPositions[i]) :
                                    0
                            ) :
                            val
                    );
                }
                return ret;
            },
            /**
             * Get the ordinal positions for the entire data set. This is necessary in
             * chart panning because we need to find out what points or data groups are
             * available outside the visible range. When a panning operation starts, if
             * an index for the given grouping does not exists, it is created and
             * cached. This index is deleted on updated data, so it will be regenerated
             * the next time a panning operation starts.
             *
             * @private
             * @function Highcharts.Axis#getExtendedPositions
             *
             * @return {Array<number>}
             */
            getExtendedPositions: function () {
                var axis = this,
                    chart = axis.chart,
                    grouping = axis.series[0].currentDataGrouping,
                    ordinalIndex = axis.ordinalIndex,
                    key = grouping ? grouping.count + grouping.unitName : 'raw',
                    overscroll = axis.options.overscroll,
                    extremes = axis.getExtremes(),
                    fakeAxis,
                    fakeSeries;

                // If this is the first time, or the ordinal index is deleted by
                // updatedData,
                // create it.
                if (!ordinalIndex) {
                    ordinalIndex = axis.ordinalIndex = {};
                }


                if (!ordinalIndex[key]) {

                    // Create a fake axis object where the extended ordinal positions
                    // are emulated
                    fakeAxis = {
                        series: [],
                        chart: chart,
                        getExtremes: function () {
                            return {
                                min: extremes.dataMin,
                                max: extremes.dataMax + overscroll
                            };
                        },
                        options: {
                            ordinal: true
                        },
                        val2lin: Axis.prototype.val2lin, // #2590
                        ordinal2lin: Axis.prototype.ordinal2lin // #6276
                    };

                    // Add the fake series to hold the full data, then apply processData
                    // to it
                    axis.series.forEach(function (series) {
                        fakeSeries = {
                            xAxis: fakeAxis,
                            xData: series.xData.slice(),
                            chart: chart,
                            destroyGroupedData: noop
                        };

                        fakeSeries.xData = fakeSeries.xData.concat(
                            axis.getOverscrollPositions()
                        );

                        fakeSeries.options = {
                            dataGrouping: grouping ? {
                                enabled: true,
                                forced: true,
                                // doesn't matter which, use the fastest
                                approximation: 'open',
                                units: [[grouping.unitName, [grouping.count]]]
                            } : {
                                enabled: false
                            }
                        };
                        series.processData.apply(fakeSeries);


                        fakeAxis.series.push(fakeSeries);
                    });

                    // Run beforeSetTickPositions to compute the ordinalPositions
                    axis.beforeSetTickPositions.apply(fakeAxis);

                    // Cache it
                    ordinalIndex[key] = fakeAxis.ordinalPositions;
                }
                return ordinalIndex[key];
            },

            /**
             * Get ticks for an ordinal axis within a range where points don't exist.
             * It is required when overscroll is enabled. We can't base on points,
             * because we may not have any, so we use approximated pointRange and
             * generate these ticks between Axis.dataMax, Axis.dataMax + Axis.overscroll
             * evenly spaced. Used in panning and navigator scrolling.
             *
             * @private
             * @function Highcharts.Axis#getOverscrollPositions
             *
             * @returns {Array<number>}
             *          Generated ticks
             */
            getOverscrollPositions: function () {
                var axis = this,
                    extraRange = axis.options.overscroll,
                    distance = axis.overscrollPointsRange,
                    positions = [],
                    max = axis.dataMax;

                if (H.defined(distance)) {
                    // Max + pointRange because we need to scroll to the last

                    positions.push(max);

                    while (max <= axis.dataMax + extraRange) {
                        max += distance;
                        positions.push(max);
                    }

                }

                return positions;
            },

            /**
             * Find the factor to estimate how wide the plot area would have been if
             * ordinal gaps were included. This value is used to compute an imagined
             * plot width in order to establish the data grouping interval.
             *
             * A real world case is the intraday-candlestick example. Without this
             * logic, it would show the correct data grouping when viewing a range
             * within each day, but once moving the range to include the gap between two
             * days, the interval would include the cut-away night hours and the data
             * grouping would be wrong. So the below method tries to compensate by
             * identifying the most common point interval, in this case days.
             *
             * An opposite case is presented in issue #718. We have a long array of
             * daily data, then one point is appended one hour after the last point. We
             * expect the data grouping not to change.
             *
             * In the future, if we find cases where this estimation doesn't work
             * optimally, we might need to add a second pass to the data grouping logic,
             * where we do another run with a greater interval if the number of data
             * groups is more than a certain fraction of the desired group count.
             *
             * @private
             * @function Highcharts.Axis#getGroupIntervalFactor
             *
             * @param {number} xMin
             *
             * @param {number} xMax
             *
             * @param {Highcharts.Series} series
             *
             * @return {number}
             */
            getGroupIntervalFactor: function (xMin, xMax, series) {
                var i,
                    processedXData = series.processedXData,
                    len = processedXData.length,
                    distances = [],
                    median,
                    groupIntervalFactor = this.groupIntervalFactor;

                // Only do this computation for the first series, let the other inherit
                // it (#2416)
                if (!groupIntervalFactor) {

                    // Register all the distances in an array
                    for (i = 0; i < len - 1; i++) {
                        distances[i] = processedXData[i + 1] - processedXData[i];
                    }

                    // Sort them and find the median
                    distances.sort(function (a, b) {
                        return a - b;
                    });
                    median = distances[Math.floor(len / 2)];

                    // Compensate for series that don't extend through the entire axis
                    // extent. #1675.
                    xMin = Math.max(xMin, processedXData[0]);
                    xMax = Math.min(xMax, processedXData[len - 1]);

                    this.groupIntervalFactor = groupIntervalFactor =
                        (len * median) / (xMax - xMin);
                }

                // Return the factor needed for data grouping
                return groupIntervalFactor;
            },

            /**
             * Make the tick intervals closer because the ordinal gaps make the ticks
             * spread out or cluster.
             *
             * @private
             * @function Highcharts.Axis#postProcessTickInterval
             *
             * @param {number} tickInterval
             *
             * @return {number}
             */
            postProcessTickInterval: function (tickInterval) {
                // Problem: https://jsfiddle.net/highcharts/FQm4E/1/
                // This is a case where this algorithm doesn't work optimally. In this
                // case, the tick labels are spread out per week, but all the gaps
                // reside within weeks. So we have a situation where the labels are
                // courser than the ordinal gaps, and thus the tick interval should not
                // be altered
                var ordinalSlope = this.ordinalSlope,
                    ret;


                if (ordinalSlope) {
                    if (!this.options.breaks) {
                        ret = tickInterval / (ordinalSlope / this.closestPointRange);
                    } else {
                        ret = this.closestPointRange || tickInterval; // #7275
                    }
                } else {
                    ret = tickInterval;
                }
                return ret;
            }
        });

        // Record this to prevent overwriting by broken-axis module (#5979)
        Axis.prototype.ordinal2lin = Axis.prototype.val2lin;

        // Extending the Chart.pan method for ordinal axes
        addEvent(Chart, 'pan', function (e) {
            var chart = this,
                xAxis = chart.xAxis[0],
                overscroll = xAxis.options.overscroll,
                chartX = e.originalEvent.chartX,
                runBase = false;

            if (xAxis.options.ordinal && xAxis.series.length) {

                var mouseDownX = chart.mouseDownX,
                    extremes = xAxis.getExtremes(),
                    dataMax = extremes.dataMax,
                    min = extremes.min,
                    max = extremes.max,
                    trimmedRange,
                    hoverPoints = chart.hoverPoints,
                    closestPointRange =
                        xAxis.closestPointRange || xAxis.overscrollPointsRange,
                    pointPixelWidth = (
                        xAxis.translationSlope *
                        (xAxis.ordinalSlope || closestPointRange)
                    ),
                    // how many ordinal units did we move?
                    movedUnits = (mouseDownX - chartX) / pointPixelWidth,
                    // get index of all the chart's points
                    extendedAxis = { ordinalPositions: xAxis.getExtendedPositions() },
                    ordinalPositions,
                    searchAxisLeft,
                    lin2val = xAxis.lin2val,
                    val2lin = xAxis.val2lin,
                    searchAxisRight;

                // we have an ordinal axis, but the data is equally spaced
                if (!extendedAxis.ordinalPositions) {
                    runBase = true;

                } else if (Math.abs(movedUnits) > 1) {

                    // Remove active points for shared tooltip
                    if (hoverPoints) {
                        hoverPoints.forEach(function (point) {
                            point.setState();
                        });
                    }

                    if (movedUnits < 0) {
                        searchAxisLeft = extendedAxis;
                        searchAxisRight = xAxis.ordinalPositions ? xAxis : extendedAxis;
                    } else {
                        searchAxisLeft = xAxis.ordinalPositions ? xAxis : extendedAxis;
                        searchAxisRight = extendedAxis;
                    }

                    // In grouped data series, the last ordinal position represents the
                    // grouped data, which is to the left of the real data max. If we
                    // don't compensate for this, we will be allowed to pan grouped data
                    // series passed the right of the plot area.
                    ordinalPositions = searchAxisRight.ordinalPositions;
                    if (dataMax > ordinalPositions[ordinalPositions.length - 1]) {
                        ordinalPositions.push(dataMax);
                    }

                    // Get the new min and max values by getting the ordinal index for
                    // the current extreme, then add the moved units and translate back
                    // to values. This happens on the extended ordinal positions if the
                    // new position is out of range, else it happens on the current x
                    // axis which is smaller and faster.
                    chart.fixedRange = max - min;
                    trimmedRange = xAxis.toFixedRange(
                        null,
                        null,
                        lin2val.apply(searchAxisLeft, [
                            val2lin.apply(searchAxisLeft, [min, true]) + movedUnits,
                            true // translate from index
                        ]),
                        lin2val.apply(searchAxisRight, [
                            val2lin.apply(searchAxisRight, [max, true]) + movedUnits,
                            true // translate from index
                        ])
                    );

                    // Apply it if it is within the available data range
                    if (
                        trimmedRange.min >= Math.min(extremes.dataMin, min) &&
                        trimmedRange.max <= Math.max(dataMax, max) + overscroll
                    ) {
                        xAxis.setExtremes(
                            trimmedRange.min,
                            trimmedRange.max,
                            true,
                            false,
                            { trigger: 'pan' }
                        );
                    }

                    chart.mouseDownX = chartX; // set new reference for next run
                    css(chart.container, { cursor: 'move' });
                }

            } else {
                runBase = true;
            }

            // revert to the linear chart.pan version
            if (runBase) {
                if (overscroll) {
                    xAxis.max = xAxis.dataMax + overscroll;
                }
            } else {
                e.preventDefault();
            }
        });

        addEvent(Axis, 'foundExtremes', function () {
            var axis = this;

            if (
                axis.isXAxis &&
                defined(axis.options.overscroll) &&
                axis.max === axis.dataMax &&
                (
                    // Panning is an execption,
                    // We don't want to apply overscroll when panning over the dataMax
                    !axis.chart.mouseIsDown ||
                    axis.isInternal
                ) && (
                    // Scrollbar buttons are the other execption:
                    !axis.eventArgs ||
                    axis.eventArgs && axis.eventArgs.trigger !== 'navigator'
                )
            ) {
                axis.max += axis.options.overscroll;

                // Live data and buttons require translation for the min:
                if (!axis.isInternal && defined(axis.userMin)) {
                    axis.min += axis.options.overscroll;
                }
            }
        });

        // For ordinal axis, that loads data async, redraw axis after data is loaded.
        // If we don't do that, axis will have the same extremes as previously, but
        // ordinal positions won't be calculated. See #10290
        addEvent(Axis, 'afterSetScale', function () {
            var axis = this;

            if (axis.horiz && !axis.isDirty) {
                axis.isDirty = axis.isOrdinal &&
                    axis.chart.navigator &&
                    !axis.chart.navigator.adaptToUpdatedData;
            }
        });
        /* ************************************************************************** *
         * End ordinal axis logic                                                     *
         * ************************************************************************** */

    });
    _registerModule(_modules, 'modules/broken-axis.src.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2009-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */



        var addEvent = H.addEvent,
            pick = H.pick,
            extend = H.extend,
            isArray = H.isArray,
            find = H.find,
            fireEvent = H.fireEvent,
            Axis = H.Axis,
            Series = H.Series;

        /**
         * Returns the first break found where the x is larger then break.from and
         * smaller then break.to.
         *
         * @param {number} x The number which should be within a break.
         * @param {array} breaks The array of breaks to search within.
         * @return {object|boolean} Returns the first break found that matches, returns
         * false if no break is found.
         */
        var findBreakAt = function (x, breaks) {
            return find(breaks, function (b) {
                return b.from < x && x < b.to;
            });
        };

        extend(Axis.prototype, {
            isInBreak: function (brk, val) {
                var ret,
                    repeat = brk.repeat || Infinity,
                    from = brk.from,
                    length = brk.to - brk.from,
                    test = (
                        val >= from ?
                            (val - from) % repeat :
                            repeat - ((from - val) % repeat)
                    );

                if (!brk.inclusive) {
                    ret = test < length && test !== 0;
                } else {
                    ret = test <= length;
                }
                return ret;
            },

            isInAnyBreak: function (val, testKeep) {

                var breaks = this.options.breaks,
                    i = breaks && breaks.length,
                    inbrk,
                    keep,
                    ret;


                if (i) {

                    while (i--) {
                        if (this.isInBreak(breaks[i], val)) {
                            inbrk = true;
                            if (!keep) {
                                keep = pick(
                                    breaks[i].showPoints,
                                    !this.isXAxis
                                );
                            }
                        }
                    }

                    if (inbrk && testKeep) {
                        ret = inbrk && !keep;
                    } else {
                        ret = inbrk;
                    }
                }
                return ret;
            }
        });

        addEvent(Axis, 'afterInit', function () {
            if (typeof this.setBreaks === 'function') {
                this.setBreaks(this.options.breaks, false);
            }
        });

        addEvent(Axis, 'afterSetTickPositions', function () {
            if (this.isBroken) {
                var axis = this,
                    tickPositions = this.tickPositions,
                    info = this.tickPositions.info,
                    newPositions = [],
                    i;

                for (i = 0; i < tickPositions.length; i++) {
                    if (!axis.isInAnyBreak(tickPositions[i])) {
                        newPositions.push(tickPositions[i]);
                    }
                }

                this.tickPositions = newPositions;
                this.tickPositions.info = info;
            }
        });

        // Force Axis to be not-ordinal when breaks are defined
        addEvent(Axis, 'afterSetOptions', function () {
            if (this.isBroken) {
                this.options.ordinal = false;
            }
        });

        /**
         * Dynamically set or unset breaks in an axis. This function in lighter than
         * usin Axis.update, and it also preserves animation.
         *
         * @private
         * @function Highcharts.Axis#setBreaks
         *
         * @param {Array<*>} [breaks]
         *        The breaks to add. When `undefined` it removes existing breaks.
         *
         * @param {boolean} [redraw=true]
         *        Whether to redraw the chart immediately.
         */
        Axis.prototype.setBreaks = function (breaks, redraw) {
            var axis = this,
                isBroken = (isArray(breaks) && !!breaks.length);

            function breakVal2Lin(val) {
                var nval = val,
                    brk,
                    i;

                for (i = 0; i < axis.breakArray.length; i++) {
                    brk = axis.breakArray[i];
                    if (brk.to <= val) {
                        nval -= brk.len;
                    } else if (brk.from >= val) {
                        break;
                    } else if (axis.isInBreak(brk, val)) {
                        nval -= (val - brk.from);
                        break;
                    }
                }

                return nval;
            }

            function breakLin2Val(val) {
                var nval = val,
                    brk,
                    i;

                for (i = 0; i < axis.breakArray.length; i++) {
                    brk = axis.breakArray[i];
                    if (brk.from >= nval) {
                        break;
                    } else if (brk.to < nval) {
                        nval += brk.len;
                    } else if (axis.isInBreak(brk, nval)) {
                        nval += brk.len;
                    }
                }
                return nval;
            }


            axis.isDirty = axis.isBroken !== isBroken;
            axis.isBroken = isBroken;
            axis.options.breaks = axis.userOptions.breaks = breaks;
            axis.forceRedraw = true; // Force recalculation in setScale

            if (!isBroken && axis.val2lin === breakVal2Lin) {
                // Revert to prototype functions
                delete axis.val2lin;
                delete axis.lin2val;
            }

            if (isBroken) {
                axis.userOptions.ordinal = false;
                axis.val2lin = breakVal2Lin;
                axis.lin2val = breakLin2Val;

                axis.setExtremes = function (
                    newMin,
                    newMax,
                    redraw,
                    animation,
                    eventArguments
                ) {
                    // If trying to set extremes inside a break, extend min to after,
                    // and max to before the break ( #3857 )
                    if (this.isBroken) {
                        var axisBreak,
                            breaks = this.options.breaks;

                        while ((axisBreak = findBreakAt(newMin, breaks))) {
                            newMin = axisBreak.to;
                        }
                        while ((axisBreak = findBreakAt(newMax, breaks))) {
                            newMax = axisBreak.from;
                        }

                        // If both min and max is within the same break.
                        if (newMax < newMin) {
                            newMax = newMin;
                        }
                    }
                    Axis.prototype.setExtremes.call(
                        this,
                        newMin,
                        newMax,
                        redraw,
                        animation,
                        eventArguments
                    );
                };

                axis.setAxisTranslation = function (saveOld) {
                    Axis.prototype.setAxisTranslation.call(this, saveOld);

                    this.unitLength = null;
                    if (this.isBroken) {
                        var breaks = axis.options.breaks,
                            breakArrayT = [], // Temporary one
                            breakArray = [],
                            length = 0,
                            inBrk,
                            repeat,
                            min = axis.userMin || axis.min,
                            max = axis.userMax || axis.max,
                            pointRangePadding = pick(axis.pointRangePadding, 0),
                            start,
                            i;

                        // Min & max check (#4247)
                        breaks.forEach(function (brk) {
                            repeat = brk.repeat || Infinity;
                            if (axis.isInBreak(brk, min)) {
                                min += (brk.to % repeat) - (min % repeat);
                            }
                            if (axis.isInBreak(brk, max)) {
                                max -= (max % repeat) - (brk.from % repeat);
                            }
                        });

                        // Construct an array holding all breaks in the axis
                        breaks.forEach(function (brk) {
                            start = brk.from;
                            repeat = brk.repeat || Infinity;

                            while (start - repeat > min) {
                                start -= repeat;
                            }
                            while (start < min) {
                                start += repeat;
                            }

                            for (i = start; i < max; i += repeat) {
                                breakArrayT.push({
                                    value: i,
                                    move: 'in'
                                });
                                breakArrayT.push({
                                    value: i + (brk.to - brk.from),
                                    move: 'out',
                                    size: brk.breakSize
                                });
                            }
                        });

                        breakArrayT.sort(function (a, b) {
                            return (
                                (a.value === b.value) ?
                                    (
                                        (a.move === 'in' ? 0 : 1) -
                                        (b.move === 'in' ? 0 : 1)
                                    ) :
                                    a.value - b.value
                            );
                        });

                        // Simplify the breaks
                        inBrk = 0;
                        start = min;

                        breakArrayT.forEach(function (brk) {
                            inBrk += (brk.move === 'in' ? 1 : -1);

                            if (inBrk === 1 && brk.move === 'in') {
                                start = brk.value;
                            }
                            if (inBrk === 0) {
                                breakArray.push({
                                    from: start,
                                    to: brk.value,
                                    len: brk.value - start - (brk.size || 0)
                                });
                                length += brk.value - start - (brk.size || 0);
                            }
                        });

                        axis.breakArray = breakArray;

                        // Used with staticScale, and below, the actual axis length when
                        // breaks are substracted.
                        axis.unitLength = max - min - length + pointRangePadding;

                        fireEvent(axis, 'afterBreaks');

                        if (axis.staticScale) {
                            axis.transA = axis.staticScale;
                        } else if (axis.unitLength) {
                            axis.transA *= (max - axis.min + pointRangePadding) /
                                axis.unitLength;
                        }

                        if (pointRangePadding) {
                            axis.minPixelPadding = axis.transA * axis.minPointOffset;
                        }

                        axis.min = min;
                        axis.max = max;
                    }
                };
            }

            if (pick(redraw, true)) {
                this.chart.redraw();
            }
        };

        addEvent(Series, 'afterGeneratePoints', function () {

            var series = this,
                xAxis = series.xAxis,
                yAxis = series.yAxis,
                points = series.points,
                point,
                i = points.length,
                connectNulls = series.options.connectNulls,
                nullGap;


            if (xAxis && yAxis && (xAxis.options.breaks || yAxis.options.breaks)) {
                while (i--) {
                    point = points[i];

                    // Respect nulls inside the break (#4275)
                    nullGap = point.y === null && connectNulls === false;
                    if (
                        !nullGap &&
                        (
                            xAxis.isInAnyBreak(point.x, true) ||
                            yAxis.isInAnyBreak(point.y, true)
                        )
                    ) {
                        points.splice(i, 1);
                        if (this.data[i]) {
                            // Removes the graphics for this point if they exist
                            this.data[i].destroyElements();
                        }
                    }
                }
            }

        });

        addEvent(Series, 'afterRender', function drawPointsWrapped() {
            this.drawBreaks(this.xAxis, ['x']);
            this.drawBreaks(this.yAxis, pick(this.pointArrayMap, ['y']));
        });

        H.Series.prototype.drawBreaks = function (axis, keys) {
            var series = this,
                points = series.points,
                breaks,
                threshold,
                eventName,
                y;

            if (!axis) {
                return; // #5950
            }

            keys.forEach(function (key) {
                breaks = axis.breakArray || [];
                threshold = axis.isXAxis ?
                    axis.min :
                    pick(series.options.threshold, axis.min);
                points.forEach(function (point) {
                    y = pick(point['stack' + key.toUpperCase()], point[key]);
                    breaks.forEach(function (brk) {
                        eventName = false;

                        if (
                            (threshold < brk.from && y > brk.to) ||
                            (threshold > brk.from && y < brk.from)
                        ) {
                            eventName = 'pointBreak';

                        } else if (
                            (threshold < brk.from && y > brk.from && y < brk.to) ||
                            (threshold > brk.from && y > brk.to && y < brk.from)
                        ) {
                            eventName = 'pointInBreak';
                        }
                        if (eventName) {
                            fireEvent(axis, eventName, { point: point, brk: brk });
                        }
                    });
                });
            });
        };


        /**
         * Extend getGraphPath by identifying gaps in the data so that we can draw a gap
         * in the line or area. This was moved from ordinal axis module to broken axis
         * module as of #5045.
         *
         * @private
         * @function Highcharts.Series#gappedPath
         */
        H.Series.prototype.gappedPath = function () {
            var currentDataGrouping = this.currentDataGrouping,
                groupingSize = currentDataGrouping && currentDataGrouping.gapSize,
                gapSize = this.options.gapSize,
                points = this.points.slice(),
                i = points.length - 1,
                yAxis = this.yAxis,
                xRange,
                stack;

            /**
             * Defines when to display a gap in the graph, together with the
             * [gapUnit](plotOptions.series.gapUnit) option.
             *
             * In case when `dataGrouping` is enabled, points can be grouped into a
             * larger time span. This can make the grouped points to have a greater
             * distance than the absolute value of `gapSize` property, which will result
             * in disappearing graph completely. To prevent this situation the mentioned
             * distance between grouped points is used instead of previously defined
             * `gapSize`.
             *
             * In practice, this option is most often used to visualize gaps in
             * time series. In a stock chart, intraday data is available for daytime
             * hours, while gaps will appear in nights and weekends.
             *
             * @see [gapUnit](plotOptions.series.gapUnit)
             * @see [xAxis.breaks](#xAxis.breaks)
             *
             * @sample {highstock} stock/plotoptions/series-gapsize/
             *         Setting the gap size to 2 introduces gaps for weekends in daily
             *         datasets.
             *
             * @type      {number}
             * @default   0
             * @product   highstock
             * @apioption plotOptions.series.gapSize
             */

            /**
             * Together with [gapSize](plotOptions.series.gapSize), this option defines
             * where to draw gaps in the graph.
             *
             * When the `gapUnit` is `relative` (default), a gap size of 5 means
             * that if the distance between two points is greater than five times
             * that of the two closest points, the graph will be broken.
             *
             * When the `gapUnit` is `value`, the gap is based on absolute axis values,
             * which on a datetime axis is milliseconds. This also applies to the
             * navigator series that inherits gap options from the base series.
             *
             * @see [gapSize](plotOptions.series.gapSize)
             *
             * @type       {string}
             * @default    relative
             * @since      5.0.13
             * @product    highstock
             * @validvalue ["relative", "value"]
             * @apioption  plotOptions.series.gapUnit
             */

            if (gapSize && i > 0) { // #5008

                // Gap unit is relative
                if (this.options.gapUnit !== 'value') {
                    gapSize *= this.closestPointRange;
                }

                // Setting a new gapSize in case dataGrouping is enabled (#7686)
                if (groupingSize && groupingSize > gapSize) {
                    gapSize = groupingSize;
                }

                // extension for ordinal breaks
                while (i--) {
                    if (points[i + 1].x - points[i].x > gapSize) {
                        xRange = (points[i].x + points[i + 1].x) / 2;

                        points.splice( // insert after this one
                            i + 1,
                            0,
                            {
                                isNull: true,
                                x: xRange
                            }
                        );

                        // For stacked chart generate empty stack items, #6546
                        if (this.options.stacking) {
                            stack = yAxis.stacks[this.stackKey][xRange] =
                                new H.StackItem(
                                    yAxis,
                                    yAxis.options.stackLabels,
                                    false,
                                    xRange,
                                    this.stack
                                );
                            stack.total = 0;
                        }
                    }
                }
            }

            // Call base method
            return this.getGraphPath(points);
        };

    });
    _registerModule(_modules, 'masters/modules/broken-axis.src.js', [], function () {


    });
    _registerModule(_modules, 'parts/DataGrouping.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         * */

        /**
         * @typedef {"average"|"averages"|"open"|"high"|"low"|"close"|"sum"} Highcharts.DataGroupingApproximationValue
         */



        var addEvent = H.addEvent,
            arrayMax = H.arrayMax,
            arrayMin = H.arrayMin,
            Axis = H.Axis,
            defaultPlotOptions = H.defaultPlotOptions,
            defined = H.defined,
            extend = H.extend,
            format = H.format,
            isNumber = H.isNumber,
            merge = H.merge,
            pick = H.pick,
            Point = H.Point,
            Series = H.Series,
            Tooltip = H.Tooltip;

        /* ************************************************************************** *
         *  Start data grouping module                                                *
         * ************************************************************************** */

        /**
         * Data grouping is the concept of sampling the data values into larger
         * blocks in order to ease readability and increase performance of the
         * JavaScript charts. Highstock by default applies data grouping when
         * the points become closer than a certain pixel value, determined by
         * the `groupPixelWidth` option.
         *
         * If data grouping is applied, the grouping information of grouped
         * points can be read from the [Point.dataGroup](
         * /class-reference/Highcharts.Point#dataGroup). If point options other than
         * the data itself are set, for example `name` or `color` or custom properties,
         * the grouping logic doesn't know how to group it. In this case the options of
         * the first point instance are copied over to the group point. This can be
         * altered through a custom `approximation` callback function.
         *
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping
         */

        /**
         * The method of approximation inside a group. When for example 30 days
         * are grouped into one month, this determines what value should represent
         * the group. Possible values are "average", "averages", "open", "high",
         * "low", "close" and "sum". For OHLC and candlestick series the approximation
         * is "ohlc" by default, which finds the open, high, low and close values
         * within all the grouped data. For ranges, the approximation is "range",
         * which finds the low and high values. For multi-dimensional data,
         * like ranges and OHLC, "averages" will compute the average for each
         * dimension.
         *
         * Custom aggregate methods can be added by assigning a callback function
         * as the approximation. This function takes a numeric array as the
         * argument and should return a single numeric value or `null`. Note
         * that the numeric array will never contain null values, only true
         * numbers. Instead, if null values are present in the raw data, the
         * numeric array will have an `.hasNulls` property set to `true`. For
         * single-value data sets the data is available in the first argument
         * of the callback function. For OHLC data sets, all the open values
         * are in the first argument, all high values in the second etc.
         *
         * Since v4.2.7, grouping meta data is available in the approximation
         * callback from `this.dataGroupInfo`. It can be used to extract information
         * from the raw data.
         *
         * Defaults to `average` for line-type series, `sum` for columns, `range`
         * for range series and `ohlc` for OHLC and candlestick.
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-approximation
         *         Approximation callback with custom data
         *
         * @type       {Highcharts.DataGroupingApproximationValue|Function}
         * @product    highstock
         * @apioption  plotOptions.series.dataGrouping.approximation
         */

        /**
         * Datetime formats for the header of the tooltip in a stock chart.
         * The format can vary within a chart depending on the currently selected
         * time range and the current data grouping.
         *
         * The default formats are:
         *
         * <pre>{
         *     millisecond: [
         *         '%A, %b %e, %H:%M:%S.%L', '%A, %b %e, %H:%M:%S.%L', '-%H:%M:%S.%L'
         *     ],
         *     second: ['%A, %b %e, %H:%M:%S', '%A, %b %e, %H:%M:%S', '-%H:%M:%S'],
         *     minute: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
         *     hour: ['%A, %b %e, %H:%M', '%A, %b %e, %H:%M', '-%H:%M'],
         *     day: ['%A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
         *     week: ['Week from %A, %b %e, %Y', '%A, %b %e', '-%A, %b %e, %Y'],
         *     month: ['%B %Y', '%B', '-%B %Y'],
         *     year: ['%Y', '%Y', '-%Y']
         * }</pre>
         *
         * For each of these array definitions, the first item is the format
         * used when the active time span is one unit. For instance, if the
         * current data applies to one week, the first item of the week array
         * is used. The second and third items are used when the active time
         * span is more than two units. For instance, if the current data applies
         * to two weeks, the second and third item of the week array are used,
         *  and applied to the start and end date of the time span.
         *
         * @type      {object}
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping.dateTimeLabelFormats
         */

        /**
         * Enable or disable data grouping.
         *
         * @type      {boolean}
         * @default   true
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping.enabled
         */

        /**
         * When data grouping is forced, it runs no matter how small the intervals
         * are. This can be handy for example when the sum should be calculated
         * for values appearing at random times within each hour.
         *
         * @type      {boolean}
         * @default   false
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping.forced
         */

        /**
         * The approximate pixel width of each group. If for example a series
         * with 30 points is displayed over a 600 pixel wide plot area, no grouping
         * is performed. If however the series contains so many points that
         * the spacing is less than the groupPixelWidth, Highcharts will try
         * to group it into appropriate groups so that each is more or less
         * two pixels wide. If multiple series with different group pixel widths
         * are drawn on the same x axis, all series will take the greatest width.
         * For example, line series have 2px default group width, while column
         * series have 10px. If combined, both the line and the column will
         * have 10px by default.
         *
         * @type      {number}
         * @default   2
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping.groupPixelWidth
         */

        /**
         * By default only points within the visible range are grouped. Enabling this
         * option will force data grouping to calculate all grouped points for a given
         * dataset. That option prevents for example a column series from calculating
         * a grouped point partially. The effect is similar to
         * [Series.getExtremesFromAll](#plotOptions.series.getExtremesFromAll) but does
         * not affect yAxis extremes.
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-groupall/
         *         Two series with the same data but different groupAll setting
         *
         * @type      {boolean}
         * @default   false
         * @since     6.1.0
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping.groupAll
         */

        /**
         * Normally, a group is indexed by the start of that group, so for example
         * when 30 daily values are grouped into one month, that month's x value
         * will be the 1st of the month. This apparently shifts the data to
         * the left. When the smoothed option is true, this is compensated for.
         * The data is shifted to the middle of the group, and min and max
         * values are preserved. Internally, this is used in the Navigator series.
         *
         * @type      {boolean}
         * @default   false
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping.smoothed
         */

        /**
         * An array determining what time intervals the data is allowed to be
         * grouped to. Each array item is an array where the first value is
         * the time unit and the second value another array of allowed multiples.
         * Defaults to:
         *
         * <pre>units: [[
         *     'millisecond', // unit name
         *     [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
         * ], [
         *     'second',
         *     [1, 2, 5, 10, 15, 30]
         * ], [
         *     'minute',
         *     [1, 2, 5, 10, 15, 30]
         * ], [
         *     'hour',
         *     [1, 2, 3, 4, 6, 8, 12]
         * ], [
         *     'day',
         *     [1]
         * ], [
         *     'week',
         *     [1]
         * ], [
         *     'month',
         *     [1, 3, 6]
         * ], [
         *     'year',
         *     null
         * ]]</pre>
         *
         * @type      {Array<Array<string,(Array<number>|null)>>}
         * @product   highstock
         * @apioption plotOptions.series.dataGrouping.units
         */

        /**
         * The approximate pixel width of each group. If for example a series
         * with 30 points is displayed over a 600 pixel wide plot area, no grouping
         * is performed. If however the series contains so many points that
         * the spacing is less than the groupPixelWidth, Highcharts will try
         * to group it into appropriate groups so that each is more or less
         * two pixels wide. Defaults to `10`.
         *
         * @sample {highstock} stock/plotoptions/series-datagrouping-grouppixelwidth/
         *         Two series with the same data density but different groupPixelWidth
         *
         * @type      {number}
         * @default   10
         * @product   highstock
         * @apioption plotOptions.column.dataGrouping.groupPixelWidth
         */

        /**
         * @private
         */
        var approximations = H.approximations = {
            sum: function (arr) {
                var len = arr.length,
                    ret;

                // 1. it consists of nulls exclusive
                if (!len && arr.hasNulls) {
                    ret = null;
                // 2. it has a length and real values
                } else if (len) {
                    ret = 0;
                    while (len--) {
                        ret += arr[len];
                    }
                }
                // 3. it has zero length, so just return undefined
                // => doNothing()

                return ret;
            },
            average: function (arr) {
                var len = arr.length,
                    ret = approximations.sum(arr);

                // If we have a number, return it divided by the length. If not,
                // return null or undefined based on what the sum method finds.
                if (isNumber(ret) && len) {
                    ret = ret / len;
                }

                return ret;
            },
            // The same as average, but for series with multiple values, like area
            // ranges.
            averages: function () { // #5479
                var ret = [];

                [].forEach.call(arguments, function (arr) {
                    ret.push(approximations.average(arr));
                });

                // Return undefined when first elem. is undefined and let
                // sum method handle null (#7377)
                return ret[0] === undefined ? undefined : ret;
            },
            open: function (arr) {
                return arr.length ? arr[0] : (arr.hasNulls ? null : undefined);
            },
            high: function (arr) {
                return arr.length ?
                    arrayMax(arr) :
                    (arr.hasNulls ? null : undefined);
            },
            low: function (arr) {
                return arr.length ?
                    arrayMin(arr) :
                    (arr.hasNulls ? null : undefined);
            },
            close: function (arr) {
                return arr.length ?
                    arr[arr.length - 1] :
                    (arr.hasNulls ? null : undefined);
            },
            // ohlc and range are special cases where a multidimensional array is
            // input and an array is output
            ohlc: function (open, high, low, close) {
                open = approximations.open(open);
                high = approximations.high(high);
                low = approximations.low(low);
                close = approximations.close(close);

                if (
                    isNumber(open) ||
                    isNumber(high) ||
                    isNumber(low) ||
                    isNumber(close)
                ) {
                    return [open, high, low, close];
                }
                // else, return is undefined
            },
            range: function (low, high) {
                low = approximations.low(low);
                high = approximations.high(high);
                if (isNumber(low) || isNumber(high)) {
                    return [low, high];
                }
                if (low === null && high === null) {
                    return null;
                }
                // else, return is undefined
            }
        };

        var groupData = function (xData, yData, groupPositions, approximation) {
            var series = this,
                data = series.data,
                dataOptions = series.options && series.options.data,
                groupedXData = [],
                groupedYData = [],
                groupMap = [],
                dataLength = xData.length,
                pointX,
                pointY,
                groupedY,
                // when grouping the fake extended axis for panning,
                // we don't need to consider y
                handleYData = !!yData,
                values = [],
                approximationFn,
                pointArrayMap = series.pointArrayMap,
                pointArrayMapLength = pointArrayMap && pointArrayMap.length,
                extendedPointArrayMap = ['x'].concat(pointArrayMap || ['y']),
                pos = 0,
                start = 0,
                valuesLen,
                i,
                j;

            function getApproximation(approx) {
                if (typeof approx === 'function') {
                    return approx;
                }
                if (approximations[approx]) {
                    return approximations[approx];
                }
                return approximations[
                    (series.getDGApproximation && series.getDGApproximation()) ||
                    'average'
                ];
            }
            approximationFn = getApproximation(approximation);

            // Calculate values array size from pointArrayMap length
            if (pointArrayMapLength) {
                pointArrayMap.forEach(function () {
                    values.push([]);
                });
            } else {
                values.push([]);
            }
            valuesLen = pointArrayMapLength || 1;

            // Start with the first point within the X axis range (#2696)
            for (i = 0; i <= dataLength; i++) {
                if (xData[i] >= groupPositions[0]) {
                    break;
                }
            }

            for (i; i <= dataLength; i++) {

                // when a new group is entered, summarize and initialize
                // the previous group
                while (
                    (
                        groupPositions[pos + 1] !== undefined &&
                        xData[i] >= groupPositions[pos + 1]
                    ) ||
                    i === dataLength
                ) { // get the last group

                    // get group x and y
                    pointX = groupPositions[pos];
                    series.dataGroupInfo = {
                        start: series.cropStart + start,
                        length: values[0].length
                    };
                    groupedY = approximationFn.apply(series, values);

                    // By default, let options of the first grouped point be passed over
                    // to the grouped point. This allows preserving properties like
                    // `name` and `color` or custom properties. Implementers can
                    // override this from the approximation function, where they can
                    // write custom options to `this.dataGroupInfo.options`.
                    if (series.pointClass && !defined(series.dataGroupInfo.options)) {
                        // Convert numbers and arrays into objects
                        series.dataGroupInfo.options = merge(
                            series.pointClass.prototype
                                .optionsToObject.call(
                                    { series: series },
                                    series.options.data[series.cropStart + start]
                                )
                        );

                        // Make sure the raw data (x, y, open, high etc) is not copied
                        // over and overwriting approximated data.
                        extendedPointArrayMap.forEach(function (key) { // eslint-disable-line
                            delete series.dataGroupInfo.options[key];
                        });
                    }

                    // push the grouped data
                    if (groupedY !== undefined) {
                        groupedXData.push(pointX);
                        groupedYData.push(groupedY);
                        groupMap.push(series.dataGroupInfo);
                    }

                    // reset the aggregate arrays
                    start = i;
                    for (j = 0; j < valuesLen; j++) {
                        values[j].length = 0; // faster than values[j] = []
                        values[j].hasNulls = false;
                    }

                    // Advance on the group positions
                    pos += 1;

                    // don't loop beyond the last group
                    if (i === dataLength) {
                        break;
                    }
                }

                // break out
                if (i === dataLength) {
                    break;
                }

                // for each raw data point, push it to an array that contains all values
                // for this specific group
                if (pointArrayMap) {

                    var index = series.cropStart + i,
                        point = (data && data[index]) ||
                            series.pointClass.prototype.applyOptions.apply({
                                series: series
                            }, [dataOptions[index]]),
                        val;

                    for (j = 0; j < pointArrayMapLength; j++) {
                        val = point[pointArrayMap[j]];
                        if (isNumber(val)) {
                            values[j].push(val);
                        } else if (val === null) {
                            values[j].hasNulls = true;
                        }
                    }

                } else {
                    pointY = handleYData ? yData[i] : null;

                    if (isNumber(pointY)) {
                        values[0].push(pointY);
                    } else if (pointY === null) {
                        values[0].hasNulls = true;
                    }
                }
            }

            return {
                groupedXData: groupedXData,
                groupedYData: groupedYData,
                groupMap: groupMap
            };
        };

        var dataGrouping = {
            approximations: approximations,
            groupData: groupData
        };


        // -----------------------------------------------------------------------------
        // The following code applies to implementation of data grouping on a Series

        var seriesProto = Series.prototype,
            baseProcessData = seriesProto.processData,
            baseGeneratePoints = seriesProto.generatePoints,

            /**
             * @ignore
             */
            commonOptions = {
                // enabled: null, // (true for stock charts, false for basic),
                // forced: undefined,
                groupPixelWidth: 2,
                // the first one is the point or start value, the second is the start
                // value if we're dealing with range, the third one is the end value if
                // dealing with a range
                dateTimeLabelFormats: {
                    millisecond: [
                        '%A, %b %e, %H:%M:%S.%L',
                        '%A, %b %e, %H:%M:%S.%L',
                        '-%H:%M:%S.%L'
                    ],
                    second: [
                        '%A, %b %e, %H:%M:%S',
                        '%A, %b %e, %H:%M:%S',
                        '-%H:%M:%S'
                    ],
                    minute: [
                        '%A, %b %e, %H:%M',
                        '%A, %b %e, %H:%M',
                        '-%H:%M'
                    ],
                    hour: [
                        '%A, %b %e, %H:%M',
                        '%A, %b %e, %H:%M',
                        '-%H:%M'
                    ],
                    day: [
                        '%A, %b %e, %Y',
                        '%A, %b %e',
                        '-%A, %b %e, %Y'
                    ],
                    week: [
                        'Week from %A, %b %e, %Y',
                        '%A, %b %e',
                        '-%A, %b %e, %Y'
                    ],
                    month: [
                        '%B %Y',
                        '%B',
                        '-%B %Y'
                    ],
                    year: [
                        '%Y',
                        '%Y',
                        '-%Y'
                    ]
                }
                // smoothed = false, // enable this for navigator series only
            },

            specificOptions = { // extends common options
                line: {},
                spline: {},
                area: {},
                areaspline: {},
                column: {
                    groupPixelWidth: 10
                },
                columnrange: {
                    groupPixelWidth: 10
                },
                candlestick: {
                    groupPixelWidth: 10
                },
                ohlc: {
                    groupPixelWidth: 5
                }
            },

            // units are defined in a separate array to allow complete overriding in
            // case of a user option
            defaultDataGroupingUnits = H.defaultDataGroupingUnits = [
                [
                    'millisecond', // unit name
                    [1, 2, 5, 10, 20, 25, 50, 100, 200, 500] // allowed multiples
                ], [
                    'second',
                    [1, 2, 5, 10, 15, 30]
                ], [
                    'minute',
                    [1, 2, 5, 10, 15, 30]
                ], [
                    'hour',
                    [1, 2, 3, 4, 6, 8, 12]
                ], [
                    'day',
                    [1]
                ], [
                    'week',
                    [1]
                ], [
                    'month',
                    [1, 3, 6]
                ], [
                    'year',
                    null
                ]
            ];


        // Set default approximations to the prototypes if present. Properties are
        // inherited down. Can be overridden for individual series types.
        seriesProto.getDGApproximation = function () {
            if (H.seriesTypes.arearange && this instanceof H.seriesTypes.arearange) {
                return 'range';
            }
            if (H.seriesTypes.ohlc && this instanceof H.seriesTypes.ohlc) {
                return 'ohlc';
            }
            if (H.seriesTypes.column && this instanceof H.seriesTypes.column) {
                return 'sum';
            }
            return 'average';
        };

        /**
         * Define the available approximation types. The data grouping
         * approximations takes an array or numbers as the first parameter. In case
         * of ohlc, four arrays are sent in as four parameters. Each array consists
         * only of numbers. In case null values belong to the group, the property
         * .hasNulls will be set to true on the array.
         *
         * @product highstock
         *
         * @private
         * @name Highcharts.approximations
         * @type {Highcharts.Dictionary<Function>}
         */

        /**
         * Takes parallel arrays of x and y data and groups the data into intervals
         * defined by groupPositions, a collection of starting x values for each group.
         *
         * @private
         * @function Highcharts.Series#groupData
         *
         * @param {Array<number>} xData
         *
         * @param {Array<number>} yData
         *
         * @param {boolean} groupPositions
         *
         * @param {string|Function} approximation
         *
         * @return {Array<Array<number>,Array<number>,Array<object>>}
         */
        seriesProto.groupData = groupData;

        // Extend the basic processData method, that crops the data to the current zoom
        // range, with data grouping logic.
        seriesProto.processData = function () {
            var series = this,
                chart = series.chart,
                options = series.options,
                dataGroupingOptions = options.dataGrouping,
                groupingEnabled = series.allowDG !== false && dataGroupingOptions &&
                    pick(dataGroupingOptions.enabled, chart.options.isStock),
                visible = series.visible || !chart.options.chart.ignoreHiddenSeries,
                hasGroupedData,
                skip,
                lastDataGrouping = this.currentDataGrouping,
                currentDataGrouping,
                croppedData,
                revertRequireSorting = false;

            // Run base method
            series.forceCrop = groupingEnabled; // #334
            series.groupPixelWidth = null; // #2110
            series.hasProcessed = true; // #2692

            // Data needs to be sorted for dataGrouping
            if (groupingEnabled && !series.requireSorting) {
                series.requireSorting = revertRequireSorting = true;
            }

            // Skip if processData returns false or if grouping is disabled (in that
            // order)
            skip = (
                baseProcessData.apply(series, arguments) === false ||
                !groupingEnabled
            );

            // Revert original requireSorting value if changed
            if (revertRequireSorting) {
                series.requireSorting = false;
            }

            if (!skip) {
                series.destroyGroupedData();

                var i,
                    processedXData = dataGroupingOptions.groupAll ? series.xData :
                        series.processedXData,
                    processedYData = dataGroupingOptions.groupAll ? series.yData :
                        series.processedYData,
                    plotSizeX = chart.plotSizeX,
                    xAxis = series.xAxis,
                    ordinal = xAxis.options.ordinal,
                    groupPixelWidth = series.groupPixelWidth =
                        xAxis.getGroupPixelWidth && xAxis.getGroupPixelWidth();

                // Execute grouping if the amount of points is greater than the limit
                // defined in groupPixelWidth
                if (groupPixelWidth) {
                    hasGroupedData = true;

                    // Force recreation of point instances in series.translate, #5699
                    series.isDirty = true;
                    series.points = null; // #6709

                    var extremes = xAxis.getExtremes(),
                        xMin = extremes.min,
                        xMax = extremes.max,
                        groupIntervalFactor = (
                            ordinal &&
                            xAxis.getGroupIntervalFactor(xMin, xMax, series)
                        ) || 1,
                        interval =
                            (groupPixelWidth * (xMax - xMin) / plotSizeX) *
                            groupIntervalFactor,
                        groupPositions = xAxis.getTimeTicks(
                            xAxis.normalizeTimeTickInterval(
                                interval,
                                dataGroupingOptions.units || defaultDataGroupingUnits
                            ),
                            // Processed data may extend beyond axis (#4907)
                            Math.min(xMin, processedXData[0]),
                            Math.max(xMax, processedXData[processedXData.length - 1]),
                            xAxis.options.startOfWeek,
                            processedXData,
                            series.closestPointRange
                        ),
                        groupedData = seriesProto.groupData.apply(
                            series,
                            [
                                processedXData,
                                processedYData,
                                groupPositions,
                                dataGroupingOptions.approximation
                            ]
                        ),
                        groupedXData = groupedData.groupedXData,
                        groupedYData = groupedData.groupedYData,
                        gapSize = 0;

                    // Prevent the smoothed data to spill out left and right, and make
                    // sure data is not shifted to the left
                    if (dataGroupingOptions.smoothed && groupedXData.length) {
                        i = groupedXData.length - 1;
                        groupedXData[i] = Math.min(groupedXData[i], xMax);
                        while (i-- && i > 0) {
                            groupedXData[i] += interval / 2;
                        }
                        groupedXData[0] = Math.max(groupedXData[0], xMin);
                    }

                    // Record what data grouping values were used
                    for (i = 1; i < groupPositions.length; i++) {
                        // The grouped gapSize needs to be the largest distance between
                        // the group to capture varying group sizes like months or DST
                        // crossing (#10000). Also check that the gap is not at the
                        // start of a segment.
                        if (
                            !groupPositions.info.segmentStarts ||
                            groupPositions.info.segmentStarts.indexOf(i) === -1
                        ) {
                            gapSize = Math.max(
                                groupPositions[i] - groupPositions[i - 1],
                                gapSize
                            );
                        }
                    }
                    currentDataGrouping = groupPositions.info;
                    currentDataGrouping.gapSize = gapSize;
                    series.closestPointRange = groupPositions.info.totalRange;
                    series.groupMap = groupedData.groupMap;

                    // Make sure the X axis extends to show the first group (#2533)
                    // But only for visible series (#5493, #6393)
                    if (
                        defined(groupedXData[0]) &&
                        groupedXData[0] < xAxis.dataMin &&
                        visible
                    ) {
                        if (
                            (
                                !defined(xAxis.options.min) &&
                                xAxis.min <= xAxis.dataMin
                            ) ||
                            xAxis.min === xAxis.dataMin
                        ) {
                            xAxis.min = groupedXData[0];
                        }
                        xAxis.dataMin = groupedXData[0];
                    }

                    // We calculated all group positions but we should render
                    // only the ones within the visible range
                    if (dataGroupingOptions.groupAll) {
                        croppedData = series.cropData(
                            groupedXData,
                            groupedYData,
                            xAxis.min,
                            xAxis.max,
                            1 // Ordinal xAxis will remove left-most points otherwise
                        );
                        groupedXData = croppedData.xData;
                        groupedYData = croppedData.yData;
                    }
                    // Set series props
                    series.processedXData = groupedXData;
                    series.processedYData = groupedYData;
                } else {
                    series.groupMap = null;
                }
                series.hasGroupedData = hasGroupedData;
                series.currentDataGrouping = currentDataGrouping;

                series.preventGraphAnimation =
                    (lastDataGrouping && lastDataGrouping.totalRange) !==
                    (currentDataGrouping && currentDataGrouping.totalRange);
            }
        };

        // Destroy the grouped data points. #622, #740
        seriesProto.destroyGroupedData = function () {

            var groupedData = this.groupedData;

            // clear previous groups
            (groupedData || []).forEach(function (point, i) {
                if (point) {
                    groupedData[i] = point.destroy ? point.destroy() : null;
                }
            });
            this.groupedData = null;
        };

        // Override the generatePoints method by adding a reference to grouped data
        seriesProto.generatePoints = function () {

            baseGeneratePoints.apply(this);

            // Record grouped data in order to let it be destroyed the next time
            // processData runs
            this.destroyGroupedData(); // #622
            this.groupedData = this.hasGroupedData ? this.points : null;
        };

        // Override point prototype to throw a warning when trying to update grouped
        // points.
        addEvent(Point, 'update', function () {
            if (this.dataGroup) {
                H.error(24, false, this.series.chart);
                return false;
            }
        });

        // Extend the original method, make the tooltip's header reflect the grouped
        // range.
        addEvent(Tooltip, 'headerFormatter', function (e) {
            var tooltip = this,
                time = this.chart.time,
                labelConfig = e.labelConfig,
                series = labelConfig.series,
                options = series.options,
                tooltipOptions = series.tooltipOptions,
                dataGroupingOptions = options.dataGrouping,
                xDateFormat = tooltipOptions.xDateFormat,
                xDateFormatEnd,
                xAxis = series.xAxis,
                currentDataGrouping,
                dateTimeLabelFormats,
                labelFormats,
                formattedKey,
                formatString = tooltipOptions[
                    (e.isFooter ? 'footer' : 'header') + 'Format'
                ];

            // apply only to grouped series
            if (
                xAxis &&
                xAxis.options.type === 'datetime' &&
                dataGroupingOptions &&
                isNumber(labelConfig.key)
            ) {

                // set variables
                currentDataGrouping = series.currentDataGrouping;
                dateTimeLabelFormats = dataGroupingOptions.dateTimeLabelFormats ||
                    // Fallback to commonOptions (#9693)
                    commonOptions.dateTimeLabelFormats;

                // if we have grouped data, use the grouping information to get the
                // right format
                if (currentDataGrouping) {
                    labelFormats = dateTimeLabelFormats[currentDataGrouping.unitName];
                    if (currentDataGrouping.count === 1) {
                        xDateFormat = labelFormats[0];
                    } else {
                        xDateFormat = labelFormats[1];
                        xDateFormatEnd = labelFormats[2];
                    }
                // if not grouped, and we don't have set the xDateFormat option, get the
                // best fit, so if the least distance between points is one minute, show
                // it, but if the least distance is one day, skip hours and minutes etc.
                } else if (!xDateFormat && dateTimeLabelFormats) {
                    xDateFormat = tooltip.getXDateFormat(
                        labelConfig,
                        tooltipOptions,
                        xAxis
                    );
                }

                // now format the key
                formattedKey = time.dateFormat(xDateFormat, labelConfig.key);
                if (xDateFormatEnd) {
                    formattedKey += time.dateFormat(
                        xDateFormatEnd,
                        labelConfig.key + currentDataGrouping.totalRange - 1
                    );
                }

                // Replace default header style with class name
                if (series.chart.styledMode) {
                    formatString = this.styledModeFormat(formatString);
                }

                // return the replaced format
                e.text = format(
                    formatString, {
                        point: extend(labelConfig.point, { key: formattedKey }),
                        series: series
                    },
                    time
                );

                e.preventDefault();

            }
        });

        // Destroy grouped data on series destroy
        addEvent(Series, 'destroy', seriesProto.destroyGroupedData);


        // Handle default options for data grouping. This must be set at runtime because
        // some series types are defined after this.
        addEvent(Series, 'afterSetOptions', function (e) {

            var options = e.options,
                type = this.type,
                plotOptions = this.chart.options.plotOptions,
                defaultOptions = defaultPlotOptions[type].dataGrouping,
                // External series, for example technical indicators should also
                // inherit commonOptions which are not available outside this module
                baseOptions = this.useCommonDataGrouping && commonOptions;

            if (specificOptions[type] || baseOptions) { // #1284
                if (!defaultOptions) {
                    defaultOptions = merge(commonOptions, specificOptions[type]);
                }

                options.dataGrouping = merge(
                    baseOptions,
                    defaultOptions,
                    plotOptions.series && plotOptions.series.dataGrouping, // #1228
                    plotOptions[type].dataGrouping, // Set by the StockChart constructor
                    this.userOptions.dataGrouping
                );
            }
        });

        // When resetting the scale reset the hasProccessed flag to avoid taking
        // previous data grouping of neighbour series into accound when determining
        // group pixel width (#2692).
        addEvent(Axis, 'afterSetScale', function () {
            this.series.forEach(function (series) {
                series.hasProcessed = false;
            });
        });

        // Get the data grouping pixel width based on the greatest defined individual
        // width of the axis' series, and if whether one of the axes need grouping.
        Axis.prototype.getGroupPixelWidth = function () {

            var series = this.series,
                len = series.length,
                i,
                groupPixelWidth = 0,
                doGrouping = false,
                dataLength,
                dgOptions;

            // If multiple series are compared on the same x axis, give them the same
            // group pixel width (#334)
            i = len;
            while (i--) {
                dgOptions = series[i].options.dataGrouping;
                if (dgOptions) {
                    groupPixelWidth = Math.max(
                        groupPixelWidth,
                        // Fallback to commonOptions (#9693)
                        pick(dgOptions.groupPixelWidth, commonOptions.groupPixelWidth)
                    );

                }
            }

            // If one of the series needs grouping, apply it to all (#1634)
            i = len;
            while (i--) {
                dgOptions = series[i].options.dataGrouping;

                if (dgOptions && series[i].hasProcessed) { // #2692

                    dataLength = (series[i].processedXData || series[i].data).length;

                    // Execute grouping if the amount of points is greater than the
                    // limit defined in groupPixelWidth
                    if (
                        series[i].groupPixelWidth ||
                        dataLength > (this.chart.plotSizeX / groupPixelWidth) ||
                        (dataLength && dgOptions.forced)
                    ) {
                        doGrouping = true;
                    }
                }
            }

            return doGrouping ? groupPixelWidth : 0;
        };

        /**
         * Highstock only. Force data grouping on all the axis' series.
         *
         * @product highstock
         *
         * @function Highcharts.Axis#setDataGrouping
         *
         * @param {boolean|Highcharts.PlotSeriesDataGroupingOptions} [dataGrouping]
         *        A `dataGrouping` configuration. Use `false` to disable data grouping
         *        dynamically.
         *
         * @param {boolean} [redraw=true]
         *        Whether to redraw the chart or wait for a later call to
         *        {@link Chart#redraw}.
         */
        Axis.prototype.setDataGrouping = function (dataGrouping, redraw) {
            var i;

            redraw = pick(redraw, true);

            if (!dataGrouping) {
                dataGrouping = {
                    forced: false,
                    units: null
                };
            }

            // Axis is instantiated, update all series
            if (this instanceof Axis) {
                i = this.series.length;
                while (i--) {
                    this.series[i].update({
                        dataGrouping: dataGrouping
                    }, false);
                }

            // Axis not yet instanciated, alter series options
            } else {
                this.chart.options.series.forEach(function (seriesOptions) {
                    seriesOptions.dataGrouping = dataGrouping;
                }, false);
            }

            // Clear ordinal slope, so we won't accidentaly use the old one (#7827)
            this.ordinalSlope = null;

            if (redraw) {
                this.chart.redraw();
            }
        };

        H.dataGrouping = dataGrouping;

        /* ************************************************************************** *
         *  End data grouping module                                                  *
         * ************************************************************************** */

        return dataGrouping;
    });
    _registerModule(_modules, 'parts/OHLCSeries.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */



        var Point = H.Point,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * The ohlc series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.ohlc
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'ohlc',
            'column'

            /**
             * An OHLC chart is a style of financial chart used to describe price
             * movements over time. It displays open, high, low and close values per
             * data point.
             *
             * @sample stock/demo/ohlc/
             *         OHLC chart
             *
             * @extends      plotOptions.column
             * @excluding    borderColor, borderRadius, borderWidth, crisp, stacking,
             *               stack
             * @product      highstock
             * @optionparent plotOptions.ohlc
             */
            , {

                /**
                 * The approximate pixel width of each group. If for example a series
                 * with 30 points is displayed over a 600 pixel wide plot area, no
                 * grouping is performed. If however the series contains so many points
                 * that the spacing is less than the groupPixelWidth, Highcharts will
                 * try to group it into appropriate groups so that each is more or less
                 * two pixels wide. Defaults to `5`.
                 *
                 * @type      {number}
                 * @default   5
                 * @product   highstock
                 * @apioption plotOptions.ohlc.dataGrouping.groupPixelWidth
                 */

                /**
                 * The pixel width of the line/border. Defaults to `1`.
                 *
                 * @sample {highstock} stock/plotoptions/ohlc-linewidth/
                 *         A greater line width
                 *
                 * @type    {number}
                 * @default 1
                 * @product highstock
                 *
                 * @private
                 */
                lineWidth: 1,

                tooltip: {
                    pointFormat: '<span style="color:{point.color}">\u25CF</span> ' +
                    '<b> {series.name}</b><br/>' +
                    'Open: {point.open}<br/>' +
                    'High: {point.high}<br/>' +
                    'Low: {point.low}<br/>' +
                    'Close: {point.close}<br/>'
                },

                threshold: null,

                states: {

                    /**
                     * @extends plotOptions.column.states.hover
                     * @product highstock
                     */
                    hover: {

                        /**
                         * The pixel width of the line representing the OHLC point.
                         *
                         * @type    {number}
                         * @default 3
                         * @product highstock
                         */
                        lineWidth: 3
                    }
                },

                /**
                 * Determines which one of `open`, `high`, `low`, `close` values should
                 * be represented as `point.y`, which is later used to set dataLabel
                 * position and [compare](#plotOptions.series.compare).
                 *
                 * @sample {highstock} stock/plotoptions/ohlc-pointvalkey/
                 *         Possible values
                 *
                 * @type       {string}
                 * @default    close
                 * @validvalue ["open", "high", "low", "close"]
                 * @product    highstock
                 * @apioption  plotOptions.ohlc.pointValKey
                 */

                /**
                 * Line color for up points.
                 *
                 * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @product   highstock
                 * @apioption plotOptions.ohlc.upColor
                 */

                stickyTracking: true

            },
            /**
             * @lends Highcharts.seriesTypes.ohlc
             */
            {
                directTouch: false,
                pointArrayMap: ['open', 'high', 'low', 'close'],
                toYData: function (point) {
                    // return a plain array for speedy calculation
                    return [point.open, point.high, point.low, point.close];
                },
                pointValKey: 'close',

                pointAttrToOptions: {
                    'stroke': 'color',
                    'stroke-width': 'lineWidth'
                },

                /**
                 * @private
                 * @function Highcarts.seriesTypes.ohlc#init
                 */
                init: function () {
                    seriesTypes.column.prototype.init.apply(this, arguments);

                    this.options.stacking = false; // #8817
                },

                /**
                 * Postprocess mapping between options and SVG attributes
                 *
                 * @private
                 * @function Highcharts.seriesTypes.ohlc#pointAttribs
                 *
                 * @param {Highcharts.Point} point
                 *
                 * @param {string} state
                 *
                 * @return {Highcharts.Dictionary<*>}
                 */
                pointAttribs: function (point, state) {
                    var attribs = seriesTypes.column.prototype.pointAttribs.call(
                            this,
                            point,
                            state
                        ),
                        options = this.options;

                    delete attribs.fill;

                    if (
                        !point.options.color &&
                    options.upColor &&
                    point.open < point.close
                    ) {
                        attribs.stroke = options.upColor;
                    }

                    return attribs;
                },

                /**
                 * Translate data points from raw values x and y to plotX and plotY
                 *
                 * @private
                 * @function Highcharts.seriesTypes.ohlc#translate
                 */
                translate: function () {
                    var series = this,
                        yAxis = series.yAxis,
                        hasModifyValue = !!series.modifyValue,
                        translated = [
                            'plotOpen',
                            'plotHigh',
                            'plotLow',
                            'plotClose',
                            'yBottom'
                        ]; // translate OHLC for

                    seriesTypes.column.prototype.translate.apply(series);

                    // Do the translation
                    series.points.forEach(function (point) {
                        [point.open, point.high, point.low, point.close, point.low]
                            .forEach(
                                function (value, i) {
                                    if (value !== null) {
                                        if (hasModifyValue) {
                                            value = series.modifyValue(value);
                                        }
                                        point[translated[i]] =
                                            yAxis.toPixels(value, true);
                                    }
                                }
                            );

                        // Align the tooltip to the high value to avoid covering the
                        // point
                        point.tooltipPos[1] =
                        point.plotHigh + yAxis.pos - series.chart.plotTop;
                    });
                },

                /**
                 * Draw the data points
                 *
                 * @private
                 * @function Highcharts.seriesTypes.ohlc#drawPoints
                 */
                drawPoints: function () {
                    var series = this,
                        points = series.points,
                        chart = series.chart;


                    points.forEach(function (point) {
                        var plotOpen,
                            plotClose,
                            crispCorr,
                            halfWidth,
                            path,
                            graphic = point.graphic,
                            crispX,
                            isNew = !graphic;

                        if (point.plotY !== undefined) {

                            // Create and/or update the graphic
                            if (!graphic) {
                                point.graphic = graphic = chart.renderer.path()
                                    .add(series.group);
                            }

                            if (!chart.styledMode) {
                                graphic.attr(
                                    series.pointAttribs(
                                        point, point.selected && 'select'
                                    )
                                ); // #3897
                            }

                            // crisp vector coordinates
                            crispCorr = (graphic.strokeWidth() % 2) / 2;
                            crispX = Math.round(point.plotX) - crispCorr; // #2596
                            halfWidth = Math.round(point.shapeArgs.width / 2);

                            // the vertical stem
                            path = [
                                'M',
                                crispX, Math.round(point.yBottom),
                                'L',
                                crispX, Math.round(point.plotHigh)
                            ];

                            // open
                            if (point.open !== null) {
                                plotOpen = Math.round(point.plotOpen) + crispCorr;
                                path.push(
                                    'M',
                                    crispX,
                                    plotOpen,
                                    'L',
                                    crispX - halfWidth,
                                    plotOpen
                                );
                            }

                            // close
                            if (point.close !== null) {
                                plotClose = Math.round(point.plotClose) + crispCorr;
                                path.push(
                                    'M',
                                    crispX,
                                    plotClose,
                                    'L',
                                    crispX + halfWidth,
                                    plotClose
                                );
                            }

                            graphic[isNew ? 'attr' : 'animate']({ d: path })
                                .addClass(point.getClassName(), true);

                        }


                    });

                },

                animate: null // Disable animation

            },
            /**
             * @lends Highcharts.seriesTypes.ohlc.prototype.pointClass.prototype
             */
            {

                /**
                 * Extend the parent method by adding up or down to the class name.
                 *
                 * @private
                 * @function Highcharts.seriesTypes.ohlc#getClassName
                 */
                getClassName: function () {
                    return Point.prototype.getClassName.call(this) +
                    (
                        this.open < this.close ?
                            ' highcharts-point-up' :
                            ' highcharts-point-down'
                    );
                }

            }
        );

        /**
         * A `ohlc` series. If the [type](#series.ohlc.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.ohlc
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.ohlc
         */

        /**
         * An array of data points for the series. For the `ohlc` series type,
         * points can be given in the following ways:
         *
         * 1. An array of arrays with 5 or 4 values. In this case, the values correspond
         *    to `x,open,high,low,close`. If the first value is a string, it is applied
         *    as the name of the point, and the `x` value is inferred. The `x` value can
         *    also be omitted, in which case the inner arrays should be of length 4\.
         *    Then the `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 6, 5, 6, 7],
         *        [1, 9, 4, 8, 2],
         *        [2, 6, 3, 4, 10]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.ohlc.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        open: 3,
         *        high: 4,
         *        low: 5,
         *        close: 2,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        open: 4,
         *        high: 3,
         *        low: 6,
         *        close: 7,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @type      {Array<Array<(number|string),number,number,number>|Array<(number|string),number,number,number,number>|*>}
         * @extends   series.arearange.data
         * @excluding y, marker
         * @product   highstock
         * @apioption series.ohlc.data
         */

        /**
         * The closing value of each data point.
         *
         * @type      {number}
         * @product   highstock
         * @apioption series.ohlc.data.close
         */

        /**
         * The opening value of each data point.
         *
         * @type      {number}
         * @product   highstock
         * @apioption series.ohlc.data.open
         */

    });
    _registerModule(_modules, 'parts/CandlestickSeries.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */



        var defaultPlotOptions = H.defaultPlotOptions,
            merge = H.merge,
            seriesType = H.seriesType,
            seriesTypes = H.seriesTypes;

        /**
         * A candlestick chart is a style of financial chart used to describe price
         * movements over time.
         *
         * @sample stock/demo/candlestick/
         *         Candlestick chart
         *
         * @extends      plotOptions.ohlc
         * @excluding    borderColor,borderRadius,borderWidth
         * @product      highstock
         * @optionparent plotOptions.candlestick
         */
        var candlestickOptions = {

            /**
             * The specific line color for up candle sticks. The default is to inherit
             * the general `lineColor` setting.
             *
             * @sample {highstock} stock/plotoptions/candlestick-linecolor/
             *         Candlestick line colors
             *
             * @type      {Highcharts.ColorString}
             * @since     1.3.6
             * @product   highstock
             * @apioption plotOptions.candlestick.upLineColor
             */

            /**
             * @type      {Highcharts.DataGroupingApproximationValue|Function}
             * @default   ohlc
             * @product   highstock
             * @apioption plotOptions.candlestick.dataGrouping.approximation
             */

            states: {

                /**
                 * @extends plotOptions.column.states.hover
                 * @product highstock
                 */
                hover: {

                    /**
                     * The pixel width of the line/border around the candlestick.
                     *
                     * @product highstock
                     */
                    lineWidth: 2
                }
            },

            /**
             * @extends plotOptions.ohlc.tooltip
             */
            tooltip: defaultPlotOptions.ohlc.tooltip,

            /**
             * @type    {number|null}
             * @product highstock
             */
            threshold: null,

            /**
             * The color of the line/border of the candlestick.
             *
             * In styled mode, the line stroke can be set with the
             * `.highcharts-candlestick-series .highcahrts-point` rule.
             *
             * @see [upLineColor](#plotOptions.candlestick.upLineColor)
             *
             * @sample {highstock} stock/plotoptions/candlestick-linecolor/
             *         Candlestick line colors
             *
             * @type    {Highcharts.ColorString}
             * @default #000000
             * @product highstock
             */
            lineColor: '#000000',

            /**
             * The pixel width of the candlestick line/border. Defaults to `1`.
             *
             *
             * In styled mode, the line stroke width can be set with the
             * `.highcharts-candlestick-series .highcahrts-point` rule.
             *
             * @product highstock
             */
            lineWidth: 1,

            /**
             * The fill color of the candlestick when values are rising.
             *
             * In styled mode, the up color can be set with the
             * `.highcharts-candlestick-series .highcharts-point-up` rule.
             *
             * @sample {highstock} stock/plotoptions/candlestick-color/
             *         Custom colors
             * @sample {highstock} highcharts/css/candlestick/
             *         Colors in styled mode
             *
             * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
             * @default #ffffff
             * @product highstock
             */
            upColor: '#ffffff',

            /**
             * @product highstock
             */
            stickyTracking: true

        };

        /**
         * The candlestick series type.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.candlestick
         *
         * @augments Highcharts.seriesTypes.ohlc
         */
        seriesType(
            'candlestick',
            'ohlc',
            merge(
                defaultPlotOptions.column,
                candlestickOptions
            ),
            /**
             * @lends seriesTypes.candlestick
             */
            {

                /**
                 * Postprocess mapping between options and SVG attributes
                 *
                 * @private
                 * @function Highcharts.seriesTypes.candlestick#pointAttribs
                 *
                 * @param {Highcharts.Point} point
                 *
                 * @param {string} [state]
                 *
                 * @return {Highcharts.SVGAttributes}
                 */
                pointAttribs: function (point, state) {
                    var attribs = seriesTypes.column.prototype.pointAttribs.call(
                            this,
                            point,
                            state
                        ),
                        options = this.options,
                        isUp = point.open < point.close,
                        stroke = options.lineColor || this.color,
                        stateOptions;

                    attribs['stroke-width'] = options.lineWidth;

                    attribs.fill = point.options.color ||
                        (isUp ? (options.upColor || this.color) : this.color);
                    attribs.stroke = point.lineColor ||
                        (isUp ? (options.upLineColor || stroke) : stroke);

                    // Select or hover states
                    if (state) {
                        stateOptions = options.states[state];
                        attribs.fill = stateOptions.color || attribs.fill;
                        attribs.stroke = stateOptions.lineColor || attribs.stroke;
                        attribs['stroke-width'] =
                            stateOptions.lineWidth || attribs['stroke-width'];
                    }


                    return attribs;
                },

                /**
                 * Draw the data points.
                 *
                 * @private
                 * @function Highcharts.seriesTypes.candlestick#drawPoints
                 */
                drawPoints: function () {
                    var series = this,
                        points = series.points,
                        chart = series.chart,
                        reversedYAxis = series.yAxis.reversed;


                    points.forEach(function (point) {

                        var graphic = point.graphic,
                            plotOpen,
                            plotClose,
                            topBox,
                            bottomBox,
                            hasTopWhisker,
                            hasBottomWhisker,
                            crispCorr,
                            crispX,
                            path,
                            halfWidth,
                            isNew = !graphic;

                        if (point.plotY !== undefined) {

                            if (!graphic) {
                                point.graphic = graphic = chart.renderer.path()
                                    .add(series.group);
                            }

                            if (!series.chart.styledMode) {
                                graphic
                                    .attr(
                                        series.pointAttribs(
                                            point,
                                            point.selected && 'select'
                                        )
                                    ) // #3897
                                    .shadow(series.options.shadow);
                            }

                            // Crisp vector coordinates
                            crispCorr = (graphic.strokeWidth() % 2) / 2;
                            crispX = Math.round(point.plotX) - crispCorr; // #2596
                            plotOpen = point.plotOpen;
                            plotClose = point.plotClose;
                            topBox = Math.min(plotOpen, plotClose);
                            bottomBox = Math.max(plotOpen, plotClose);
                            halfWidth = Math.round(point.shapeArgs.width / 2);
                            hasTopWhisker = reversedYAxis ?
                                bottomBox !== point.yBottom :
                                Math.round(topBox) !== Math.round(point.plotHigh);
                            hasBottomWhisker = reversedYAxis ?
                                Math.round(topBox) !== Math.round(point.plotHigh) :
                                bottomBox !== point.yBottom;
                            topBox = Math.round(topBox) + crispCorr;
                            bottomBox = Math.round(bottomBox) + crispCorr;

                            // Create the path. Due to a bug in Chrome 49, the path is
                            // first instanciated with no values, then the values
                            // pushed. For unknown reasons, instanciating the path array
                            // with all the values would lead to a crash when updating
                            // frequently (#5193).
                            path = [];
                            path.push(
                                'M',
                                crispX - halfWidth, bottomBox,
                                'L',
                                crispX - halfWidth, topBox,
                                'L',
                                crispX + halfWidth, topBox,
                                'L',
                                crispX + halfWidth, bottomBox,
                                'Z', // Ensure a nice rectangle #2602
                                'M',
                                crispX, topBox,
                                'L',
                                // #460, #2094
                                crispX, hasTopWhisker ?
                                    Math.round(
                                        reversedYAxis ? point.yBottom : point.plotHigh
                                    ) :
                                    topBox,
                                'M',
                                crispX, bottomBox,
                                'L',
                                // #460, #2094
                                crispX, hasBottomWhisker ?
                                    Math.round(
                                        reversedYAxis ? point.plotHigh : point.yBottom
                                    ) :
                                    bottomBox
                            );

                            graphic[isNew ? 'attr' : 'animate']({ d: path })
                                .addClass(point.getClassName(), true);

                        }
                    });
                }
            }
        );

        /**
         * A `candlestick` series. If the [type](#series.candlestick.type)
         * option is not specified, it is inherited from [chart.type](
         * #chart.type).
         *
         * @type      {*}
         * @extends   series,plotOptions.candlestick
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.candlestick
         */

        /**
         * An array of data points for the series. For the `candlestick` series
         * type, points can be given in the following ways:
         *
         * 1. An array of arrays with 5 or 4 values. In this case, the values correspond
         *    to `x,open,high,low,close`. If the first value is a string, it is applied
         *    as the name of the point, and the `x` value is inferred. The `x` value can
         *    also be omitted, in which case the inner arrays should be of length 4.
         *    Then the `x` value is automatically calculated, either starting at 0 and
         *    incremented by 1, or from `pointStart` and `pointInterval` given in the
         *    series options.
         *    ```js
         *    data: [
         *        [0, 7, 2, 0, 4],
         *        [1, 1, 4, 2, 8],
         *        [2, 3, 3, 9, 3]
         *    ]
         *    ```
         *
         * 2. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.candlestick.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        open: 9,
         *        high: 2,
         *        low: 4,
         *        close: 6,
         *        name: "Point2",
         *        color: "#00FF00"
         *    }, {
         *        x: 1,
         *        open: 1,
         *        high: 4,
         *        low: 7,
         *        close: 7,
         *        name: "Point1",
         *        color: "#FF00FF"
         *    }]
         *    ```
         *
         * @type      {Array<Array<(number|string),number,number,number>|Array<(number|string),number,number,number,number>|*>}
         * @extends   series.ohlc.data
         * @excluding y
         * @product   highstock
         * @apioption series.candlestick.data
         */

    });
    _registerModule(_modules, 'mixins/on-series.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */



        var defined = H.defined,
            seriesTypes = H.seriesTypes,
            stableSort = H.stableSort;

        /**
         * @private
         * @mixin onSeriesMixin
         */
        var onSeriesMixin = {

            /**
             * Override getPlotBox. If the onSeries option is valid, return the plot box
             * of the onSeries, otherwise proceed as usual.
             *
             * @private
             * @function onSeriesMixin.getPlotBox
             *
             * @return {Highcharts.SeriesPlotBoxObject}
             */
            getPlotBox: function () {
                return H.Series.prototype.getPlotBox.call(
                    (
                        this.options.onSeries &&
                        this.chart.get(this.options.onSeries)
                    ) || this
                );
            },

            /**
             * Extend the translate method by placing the point on the related series
             *
             * @private
             * @function onSeriesMixin.translate
             */
            translate: function () {

                seriesTypes.column.prototype.translate.apply(this);

                var series = this,
                    options = series.options,
                    chart = series.chart,
                    points = series.points,
                    cursor = points.length - 1,
                    point,
                    lastPoint,
                    optionsOnSeries = options.onSeries,
                    onSeries = optionsOnSeries && chart.get(optionsOnSeries),
                    onKey = options.onKey || 'y',
                    step = onSeries && onSeries.options.step,
                    onData = onSeries && onSeries.points,
                    i = onData && onData.length,
                    inverted = chart.inverted,
                    xAxis = series.xAxis,
                    yAxis = series.yAxis,
                    xOffset = 0,
                    leftPoint,
                    lastX,
                    rightPoint,
                    currentDataGrouping,
                    distanceRatio;

                // relate to a master series
                if (onSeries && onSeries.visible && i) {
                    xOffset = (onSeries.pointXOffset || 0) + (onSeries.barW || 0) / 2;
                    currentDataGrouping = onSeries.currentDataGrouping;
                    lastX = (
                        onData[i - 1].x +
                        (currentDataGrouping ? currentDataGrouping.totalRange : 0)
                    ); // #2374

                    // sort the data points
                    stableSort(points, function (a, b) {
                        return (a.x - b.x);
                    });

                    onKey = 'plot' + onKey[0].toUpperCase() + onKey.substr(1);
                    while (i-- && points[cursor]) {
                        leftPoint = onData[i];
                        point = points[cursor];
                        point.y = leftPoint.y;

                        if (leftPoint.x <= point.x && leftPoint[onKey] !== undefined) {
                            if (point.x <= lastX) { // #803

                                point.plotY = leftPoint[onKey];

                                // interpolate between points, #666
                                if (leftPoint.x < point.x && !step) {
                                    rightPoint = onData[i + 1];
                                    if (rightPoint && rightPoint[onKey] !== undefined) {
                                        // the distance ratio, between 0 and 1
                                        distanceRatio = (point.x - leftPoint.x) /
                                            (rightPoint.x - leftPoint.x);
                                        point.plotY +=
                                            distanceRatio *
                                            // the plotY distance
                                            (rightPoint[onKey] - leftPoint[onKey]);
                                        point.y +=
                                            distanceRatio *
                                            (rightPoint.y - leftPoint.y);
                                    }
                                }
                            }
                            cursor--;
                            i++; // check again for points in the same x position
                            if (cursor < 0) {
                                break;
                            }
                        }
                    }
                }

                // Add plotY position and handle stacking
                points.forEach(function (point, i) {

                    var stackIndex;

                    point.plotX += xOffset; // #2049

                    // Undefined plotY means the point is either on axis, outside series
                    // range or hidden series. If the series is outside the range of the
                    // x axis it should fall through with an undefined plotY, but then
                    // we must remove the shapeArgs (#847). For inverted charts, we need
                    // to calculate position anyway, because series.invertGroups is not
                    // defined
                    if (point.plotY === undefined || inverted) {
                        if (point.plotX >= 0 && point.plotX <= xAxis.len) {
                            // We're inside xAxis range
                            if (inverted) {
                                point.plotY = xAxis.translate(point.x, 0, 1, 0, 1);
                                point.plotX = defined(point.y) ?
                                    yAxis.translate(point.y, 0, 0, 0, 1) : 0;
                            } else {
                                point.plotY = (xAxis.opposite ? 0 : series.yAxis.len) +
                                    xAxis.offset; // For the windbarb demo
                            }
                        } else {
                            point.shapeArgs = {}; // 847
                        }
                    }

                    // if multiple flags appear at the same x, order them into a stack
                    lastPoint = points[i - 1];
                    if (lastPoint && lastPoint.plotX === point.plotX) {
                        if (lastPoint.stackIndex === undefined) {
                            lastPoint.stackIndex = 0;
                        }
                        stackIndex = lastPoint.stackIndex + 1;
                    }
                    point.stackIndex = stackIndex; // #3639
                });

                this.onSeries = onSeries;
            }
        };


        return onSeriesMixin;
    });
    _registerModule(_modules, 'parts/FlagsSeries.js', [_modules['parts/Globals.js'], _modules['mixins/on-series.js']], function (H, onSeriesMixin) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */

        /**
         * @typedef {"flag"|"circlepin"|"squarepin"} Highcharts.FlagShapeValue
         */



        var addEvent = H.addEvent,
            merge = H.merge,
            noop = H.noop,
            defined = H.defined,
            Renderer = H.Renderer,
            Series = H.Series,
            seriesType = H.seriesType,
            SVGRenderer = H.SVGRenderer,
            TrackerMixin = H.TrackerMixin,
            VMLRenderer = H.VMLRenderer,
            symbols = SVGRenderer.prototype.symbols;

        /**
         * The Flags series.
         *
         * @private
         * @class
         * @name Highcharts.seriesTypes.flags
         *
         * @augments Highcharts.Series
         */
        seriesType(
            'flags',
            'column'

            /**
             * Flags are used to mark events in stock charts. They can be added on the
             * timeline, or attached to a specific series.
             *
             * @sample stock/demo/flags-general/
             *         Flags on a line series
             *
             * @extends      plotOptions.column
             * @excluding    animation, borderColor, borderRadius, borderWidth,
             *               colorByPoint, dataGrouping, pointPadding, pointWidth,
             *               turboThreshold
             * @product      highstock
             * @optionparent plotOptions.flags
             */
            , {

                /**
                 * In case the flag is placed on a series, on what point key to place
                 * it. Line and columns have one key, `y`. In range or OHLC-type series,
                 * however, the flag can optionally be placed on the `open`, `high`,
                 *  `low` or `close` key.
                 *
                 * @sample {highstock} stock/plotoptions/flags-onkey/
                 *         Range series, flag on high
                 *
                 * @type       {string}
                 * @default    y
                 * @since      4.2.2
                 * @product    highstock
                 * @validvalue ["y", "open", "high", "low", "close"]
                 * @apioption  plotOptions.flags.onKey
                 */

                /**
                 * The id of the series that the flags should be drawn on. If no id
                 * is given, the flags are drawn on the x axis.
                 *
                 * @sample {highstock} stock/plotoptions/flags/
                 *         Flags on series and on x axis
                 *
                 * @type      {string}
                 * @product   highstock
                 * @apioption plotOptions.flags.onSeries
                 */

                pointRange: 0, // #673

                /**
                 * Whether the flags are allowed to overlap sideways. If `false`, the
                 * flags are moved sideways using an algorithm that seeks to place every
                 * flag as close as possible to its original position.
                 *
                 * @sample {highstock} stock/plotoptions/flags-allowoverlapx
                 *         Allow sideways overlap
                 *
                 * @since 6.0.4
                 */
                allowOverlapX: false,

                /**
                 * The shape of the marker. Can be one of "flag", "circlepin",
                 * "squarepin", or an image of the format `url(/path-to-image.jpg)`.
                 * Individual shapes can also be set for each point.
                 *
                 * @sample {highstock} stock/plotoptions/flags/
                 *         Different shapes
                 *
                 * @type    {Highcharts.FlagShapeValue}
                 * @product highstock
                 */
                shape: 'flag',

                /**
                 * When multiple flags in the same series fall on the same value, this
                 * number determines the vertical offset between them.
                 *
                 * @sample {highstock} stock/plotoptions/flags-stackdistance/
                 *         A greater stack distance
                 *
                 * @product highstock
                 */
                stackDistance: 12,

                /**
                 * Text alignment for the text inside the flag.
                 *
                 * @since      5.0.0
                 * @product    highstock
                 * @validvalue ["left", "center", "right"]
                 */
                textAlign: 'center',

                /**
                 * Specific tooltip options for flag series. Flag series tooltips are
                 * different from most other types in that a flag doesn't have a data
                 * value, so the tooltip rather displays the `text` option for each
                 * point.
                 *
                 * @extends   plotOptions.series.tooltip
                 * @excluding changeDecimals, valueDecimals, valuePrefix, valueSuffix
                 * @product   highstock
                 */
                tooltip: {
                    pointFormat: '{point.text}<br/>'
                },

                threshold: null,

                /**
                 * The text to display on each flag. This can be defined on series
                 * level, or individually for each point. Defaults to `"A"`.
                 *
                 * @type      {string}
                 * @default   A
                 * @product   highstock
                 * @apioption plotOptions.flags.title
                 */

                /**
                 * The y position of the top left corner of the flag relative to either
                 * the series (if onSeries is defined), or the x axis. Defaults to
                 * `-30`.
                 *
                 * @product highstock
                 */
                y: -30,

                /**
                 * Whether to use HTML to render the flag texts. Using HTML allows for
                 * advanced formatting, images and reliable bi-directional text
                 * rendering. Note that exported images won't respect the HTML, and that
                 * HTML won't respect Z-index settings.
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     1.3
                 * @product   highstock
                 * @apioption plotOptions.flags.useHTML
                 */

                /**
                 * Fixed width of the flag's shape. By default, width is autocalculated
                 * according to the flag's title.
                 *
                 * @sample {highstock} stock/demo/flags-shapes/
                 *         Flags with fixed width
                 *
                 * @type      {number}
                 * @product   highstock
                 * @apioption plotOptions.flags.width
                 */

                /**
                 * Fixed height of the flag's shape. By default, height is
                 * autocalculated according to the flag's title.
                 *
                 * @type      {number}
                 * @product   highstock
                 * @apioption plotOptions.flags.height
                 */

                /**
                 * The fill color for the flags.
                 *
                 * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                 * @product highstock
                 */
                fillColor: '#ffffff',

                /**
                 * The color of the line/border of the flag.
                 *
                 * In styled mode, the stroke is set in the
                 * `.highcharts-flag-series.highcharts-point` rule.
                 *
                 * @type      {Highcharts.ColorString}
                 * @default   #000000
                 * @product   highstock
                 * @apioption plotOptions.flags.lineColor
                 */

                /**
                 * The pixel width of the flag's line/border.
                 *
                 * @product highstock
                 */
                lineWidth: 1,

                states: {

                    /**
                     * @extends plotOptions.column.states.hover
                     * @product highstock
                     */
                    hover: {

                        /**
                         * The color of the line/border of the flag.
                         *
                         * @type    {Highcharts.ColorString}
                         * @product highstock
                         */
                        lineColor: '#000000',

                        /**
                         * The fill or background color of the flag.
                         *
                         * @type    {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
                         * @product highstock
                         */
                        fillColor: '#ccd6eb'
                    }
                },

                /**
                 * The text styles of the flag.
                 *
                 * In styled mode, the styles are set in the
                 * `.highcharts-flag-series .highcharts-point` rule.
                 *
                 * @type    {Highcharts.CSSObject}
                 * @default {"fontSize": "11px", "fontWeight": "bold"}
                 * @product highstock
                 */
                style: {
                    /** @ignore-option */
                    fontSize: '11px',
                    /** @ignore-option */
                    fontWeight: 'bold'
                }

            },
            /**
             * @lends seriesTypes.flags.prototype
             */
            {
                sorted: false,
                noSharedTooltip: true,
                allowDG: false,
                takeOrdinalPosition: false, // #1074
                trackerGroups: ['markerGroup'],
                forceCrop: true,

                /**
                 * Inherit the initialization from base Series.
                 *
                 * @private
                 * @borrows Highcharts.Series#init as Highcharts.seriesTypes.flags#init
                 */
                init: Series.prototype.init,

                /**
                 * Get presentational attributes
                 *
                 * @private
                 * @function Highcharts.seriesTypes.flags#pointAttribs
                 *
                 * @param {Highcharts.Point} point
                 *
                 * @param {string} [state]
                 *
                 * @return {Highcharts.SVGAttributes}
                 */
                pointAttribs: function (point, state) {
                    var options = this.options,
                        color = (point && point.color) || this.color,
                        lineColor = options.lineColor,
                        lineWidth = (point && point.lineWidth),
                        fill = (point && point.fillColor) || options.fillColor;

                    if (state) {
                        fill = options.states[state].fillColor;
                        lineColor = options.states[state].lineColor;
                        lineWidth = options.states[state].lineWidth;
                    }

                    return {
                        'fill': fill || color,
                        'stroke': lineColor || color,
                        'stroke-width': lineWidth || options.lineWidth || 0
                    };
                },

                translate: onSeriesMixin.translate,
                getPlotBox: onSeriesMixin.getPlotBox,

                /**
                 * Draw the markers.
                 *
                 * @private
                 * @function Highcharts.seriesTypes.flags#drawPoints
                 */
                drawPoints: function () {
                    var series = this,
                        points = series.points,
                        chart = series.chart,
                        renderer = chart.renderer,
                        plotX,
                        plotY,
                        inverted = chart.inverted,
                        options = series.options,
                        optionsY = options.y,
                        shape,
                        i,
                        point,
                        graphic,
                        stackIndex,
                        anchorY,
                        attribs,
                        outsideRight,
                        yAxis = series.yAxis,
                        boxesMap = {},
                        boxes = [],
                        centered;

                    i = points.length;
                    while (i--) {
                        point = points[i];
                        outsideRight =
                        (inverted ? point.plotY : point.plotX) > series.xAxis.len;
                        plotX = point.plotX;
                        stackIndex = point.stackIndex;
                        shape = point.options.shape || options.shape;
                        plotY = point.plotY;

                        if (plotY !== undefined) {
                            plotY = point.plotY + optionsY -
                            (
                                stackIndex !== undefined &&
                                stackIndex * options.stackDistance
                            );
                        }
                        // skip connectors for higher level stacked points
                        point.anchorX = stackIndex ? undefined : point.plotX;
                        anchorY = stackIndex ? undefined : point.plotY;
                        centered = shape !== 'flag';

                        graphic = point.graphic;

                        // Only draw the point if y is defined and the flag is within
                        // the visible area
                        if (plotY !== undefined && plotX >= 0 && !outsideRight) {

                            // Create the flag
                            if (!graphic) {
                                graphic = point.graphic = renderer.label(
                                    '',
                                    null,
                                    null,
                                    shape,
                                    null,
                                    null,
                                    options.useHTML
                                );

                                if (!chart.styledMode) {
                                    graphic
                                        .attr(series.pointAttribs(point))
                                        .css(merge(options.style, point.style));
                                }

                                graphic.attr({
                                    align: centered ? 'center' : 'left',
                                    width: options.width,
                                    height: options.height,
                                    'text-align': options.textAlign
                                })
                                    .addClass('highcharts-point')
                                    .add(series.markerGroup);

                                // Add reference to the point for tracker (#6303)
                                if (point.graphic.div) {
                                    point.graphic.div.point = point;
                                }

                                if (!chart.styledMode) {
                                    graphic.shadow(options.shadow);
                                }

                                graphic.isNew = true;
                            }

                            if (plotX > 0) { // #3119
                                plotX -= graphic.strokeWidth() % 2; // #4285
                            }

                            // Plant the flag
                            attribs = {
                                y: plotY,
                                anchorY: anchorY
                            };
                            if (options.allowOverlapX) {
                                attribs.x = plotX;
                                attribs.anchorX = point.anchorX;
                            }
                            graphic.attr({
                                text: point.options.title || options.title || 'A'
                            })[graphic.isNew ? 'attr' : 'animate'](attribs);

                            // Rig for the distribute function
                            if (!options.allowOverlapX) {
                                if (!boxesMap[point.plotX]) {
                                    boxesMap[point.plotX] = {
                                        align: centered ? 0.5 : 0,
                                        size: graphic.width,
                                        target: plotX,
                                        anchorX: plotX
                                    };
                                } else {
                                    boxesMap[point.plotX].size = Math.max(
                                        boxesMap[point.plotX].size,
                                        graphic.width
                                    );
                                }
                            }

                            // Set the tooltip anchor position
                            point.tooltipPos = [
                                plotX,
                                plotY + yAxis.pos - chart.plotTop
                            ]; // #6327

                        } else if (graphic) {
                            point.graphic = graphic.destroy();
                        }

                    }

                    // Handle X-dimension overlapping
                    if (!options.allowOverlapX) {
                        H.objectEach(boxesMap, function (box) {
                            box.plotX = box.anchorX;
                            boxes.push(box);
                        });

                        H.distribute(boxes, inverted ? yAxis.len : this.xAxis.len, 100);

                        points.forEach(function (point) {
                            var box = point.graphic && boxesMap[point.plotX];

                            if (box) {
                                point.graphic[
                                    point.graphic.isNew ? 'attr' : 'animate'
                                ]({
                                    x: box.pos + box.align * box.size,
                                    anchorX: point.anchorX
                                });
                                // Hide flag when its box position is not specified
                                // (#8573, #9299)
                                if (!defined(box.pos)) {
                                    point.graphic.attr({
                                        x: -9999,
                                        anchorX: -9999
                                    });
                                    point.graphic.isNew = true;
                                } else {
                                    point.graphic.isNew = false;
                                }
                            }
                        });
                    }

                    // Can be a mix of SVG and HTML and we need events for both (#6303)
                    if (options.useHTML) {
                        H.wrap(series.markerGroup, 'on', function (proceed) {
                            return H.SVGElement.prototype.on.apply(
                            // for HTML
                                proceed.apply(this, [].slice.call(arguments, 1)),
                                // and for SVG
                                [].slice.call(arguments, 1)
                            );
                        });
                    }

                },

                /**
                 * Extend the column trackers with listeners to expand and contract
                 * stacks.
                 *
                 * @private
                 * @function Highcharts.seriesTypes.flags#drawTracker
                 */
                drawTracker: function () {
                    var series = this,
                        points = series.points;

                    TrackerMixin.drawTrackerPoint.apply(this);

                    /* *
                    * Bring each stacked flag up on mouse over, this allows readability
                    * of vertically stacked elements as well as tight points on the x
                    * axis. #1924.
                    */
                    points.forEach(function (point) {
                        var graphic = point.graphic;

                        if (graphic) {
                            addEvent(graphic.element, 'mouseover', function () {

                                // Raise this point
                                if (point.stackIndex > 0 && !point.raised) {
                                    point._y = graphic.y;
                                    graphic.attr({
                                        y: point._y - 8
                                    });
                                    point.raised = true;
                                }

                                // Revert other raised points
                                points.forEach(function (otherPoint) {
                                    if (
                                        otherPoint !== point &&
                                    otherPoint.raised &&
                                    otherPoint.graphic
                                    ) {
                                        otherPoint.graphic.attr({
                                            y: otherPoint._y
                                        });
                                        otherPoint.raised = false;
                                    }
                                });
                            });
                        }
                    });
                },

                /**
                 * Disable animation, but keep clipping (#8546).
                 *
                 * @private
                 * @function Highcharts.seriesTypes.flags#animate
                 *
                 * @param {boolean} [init]
                 */
                animate: function (init) {
                    if (init) {
                        this.setClip();
                    } else {
                        this.animate = null;
                    }
                },

                /**
                 * @private
                 * @function Highcharts.seriesTypes.flags#setClip
                 */
                setClip: function () {
                    Series.prototype.setClip.apply(this, arguments);
                    if (this.options.clip !== false && this.sharedClipKey) {
                        this.markerGroup.clip(this.chart[this.sharedClipKey]);
                    }
                },

                /**
                 * @private
                 * @function Highcharts.seriesTypes.flags#buildKDTree
                 */
                buildKDTree: noop,

                /**
                 * Don't invert the flag marker group (#4960).
                 *
                 * @private
                 * @function Highcharts.seriesTypes.flags#invertGroups
                 */
                invertGroups: noop

            },
            /**
             * @lends seriesTypes.column.prototype.pointClass.prototype
             */
            {
                isValid: function () {
                    // #9233 - Prevent from treating flags as null points (even if
                    // they have no y values defined).
                    return H.isNumber(this.y) || this.y === undefined;
                }
            }

        );

        // create the flag icon with anchor
        symbols.flag = function (x, y, w, h, options) {
            var anchorX = (options && options.anchorX) || x,
                anchorY = (options && options.anchorY) || y;

            return symbols.circle(anchorX - 1, anchorY - 1, 2, 2).concat(
                [
                    'M', anchorX, anchorY,
                    'L', x, y + h,
                    x, y,
                    x + w, y,
                    x + w, y + h,
                    x, y + h,
                    'Z'
                ]
            );
        };

        // Create the circlepin and squarepin icons with anchor
        function createPinSymbol(shape) {
            symbols[shape + 'pin'] = function (x, y, w, h, options) {

                var anchorX = options && options.anchorX,
                    anchorY = options && options.anchorY,
                    path,
                    labelTopOrBottomY;

                // For single-letter flags, make sure circular flags are not taller
                // than their width
                if (shape === 'circle' && h > w) {
                    x -= Math.round((h - w) / 2);
                    w = h;
                }

                path = symbols[shape](x, y, w, h);

                if (anchorX && anchorY) {
                    /**
                     * If the label is below the anchor, draw the connecting line
                     * from the top edge of the label
                     * otherwise start drawing from the bottom edge
                     */
                    labelTopOrBottomY = (y > anchorY) ? y : y + h;
                    path.push(
                        'M',
                        shape === 'circle' ? x + w / 2 : path[1] + path[4] / 2,
                        labelTopOrBottomY,
                        'L',
                        anchorX,
                        anchorY
                    );
                    path = path.concat(
                        symbols.circle(anchorX - 1, anchorY - 1, 2, 2)
                    );
                }

                return path;
            };
        }
        createPinSymbol('circle');
        createPinSymbol('square');

        /**
         * The symbol callbacks are generated on the SVGRenderer object in all browsers.
         * Even VML browsers need this in order to generate shapes in export. Now share
         * them with the VMLRenderer.
         */
        if (Renderer === VMLRenderer) {
            ['flag', 'circlepin', 'squarepin'].forEach(function (shape) {
                VMLRenderer.prototype.symbols[shape] = symbols[shape];
            });
        }

        /**
         * A `flags` series. If the [type](#series.flags.type) option is not
         * specified, it is inherited from [chart.type](#chart.type).
         *
         * @extends   series,plotOptions.flags
         * @excluding dataParser, dataURL
         * @product   highstock
         * @apioption series.flags
         */

        /**
         * An array of data points for the series. For the `flags` series type,
         * points can be given in the following ways:
         *
         * 1. An array of objects with named values. The following snippet shows only a
         *    few settings, see the complete options set below. If the total number of
         *    data points exceeds the series'
         *    [turboThreshold](#series.flags.turboThreshold), this option is not
         *    available.
         *    ```js
         *    data: [{
         *        x: 1,
         *        title: "A",
         *        text: "First event"
         *    }, {
         *        x: 1,
         *        title: "B",
         *        text: "Second event"
         *    }]
         *    ```
         *
         * @type      {Array<*>}
         * @extends   series.line.data
         * @excluding dataLabels, marker, name, y
         * @product   highstock
         * @apioption series.flags.data
         */

        /**
         * The fill color of an individual flag. By default it inherits from
         * the series color.
         *
         * @type      {Highcharts.ColorString|Highcharts.GradientColorObject|Highcharts.PatternObject}
         * @product   highstock
         * @apioption series.flags.data.fillColor
         */

        /**
         * The longer text to be shown in the flag's tooltip.
         *
         * @type      {string}
         * @product   highstock
         * @apioption series.flags.data.text
         */

        /**
         * The short text to be shown on the flag.
         *
         * @type      {string}
         * @product   highstock
         * @apioption series.flags.data.title
         */

    });
    _registerModule(_modules, 'parts/RangeSelector.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         * (c) 2010-2019 Torstein Honsi
         *
         * License: www.highcharts.com/license
         */

        /**
         * Define the time span for the button
         *
         * @typedef {"all"|"day"|"hour"|"millisecond"|"minute"|"month"|"second"|"week"|"year"|"ytd"} Highcharts.RangeSelectorButtonTypeValue
         */

        /**
         * Callback function to react on button clicks.
         *
         * @callback Highcharts.RangeSelectorClickCallbackFunction
         *
         * @param {global.Event} e
         *        Event arguments.
         *
         * @param {boolean|undefined}
         *        Return false to cancel the default button event.
         */

        /**
         * Callback function to parse values entered in the input boxes and return a
         * valid JavaScript time as milliseconds since 1970.
         *
         * @callback Highcharts.RangeSelectorParseCallbackFunction
         *
         * @param {string} value
         *        Input value to parse.
         *
         * @return {number}
         *         Parsed JavaScript time value.
         */



        var addEvent = H.addEvent,
            Axis = H.Axis,
            Chart = H.Chart,
            css = H.css,
            createElement = H.createElement,
            defaultOptions = H.defaultOptions,
            defined = H.defined,
            destroyObjectProperties = H.destroyObjectProperties,
            discardElement = H.discardElement,
            extend = H.extend,
            fireEvent = H.fireEvent,
            isNumber = H.isNumber,
            merge = H.merge,
            pick = H.pick,
            pInt = H.pInt,
            splat = H.splat;

        /* ****************************************************************************
         * Start Range Selector code                                                  *
         *****************************************************************************/
        extend(defaultOptions, {

            /**
             * The range selector is a tool for selecting ranges to display within
             * the chart. It provides buttons to select preconfigured ranges in
             * the chart, like 1 day, 1 week, 1 month etc. It also provides input
             * boxes where min and max dates can be manually input.
             *
             * @product      highstock gantt
             * @optionparent rangeSelector
             */
            rangeSelector: {

                /**
                 * Whether to enable all buttons from the start. By default buttons are
                 * only enabled if the corresponding time range exists on the X axis,
                 * but enabling all buttons allows for dynamically loading different
                 * time ranges.
                 *
                 * @sample {highstock} stock/rangeselector/allbuttonsenabled-true/
                 *         All buttons enabled
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     2.0.3
                 * @apioption rangeSelector.allButtonsEnabled
                 */

                /**
                 * An array of configuration objects for the buttons.
                 *
                 * Defaults to
                 *
                 * <pre>buttons: [{
                 *     type: 'month',
                 *     count: 1,
                 *     text: '1m'
                 * }, {
                 *     type: 'month',
                 *     count: 3,
                 *     text: '3m'
                 * }, {
                 *     type: 'month',
                 *     count: 6,
                 *     text: '6m'
                 * }, {
                 *     type: 'ytd',
                 *     text: 'YTD'
                 * }, {
                 *     type: 'year',
                 *     count: 1,
                 *     text: '1y'
                 * }, {
                 *     type: 'all',
                 *     text: 'All'
                 * }]</pre>
                 *
                 * @sample {highstock} stock/rangeselector/datagrouping/
                 *         Data grouping by buttons
                 *
                 * @type      {Array<*>}
                 * @apioption rangeSelector.buttons
                 */

                /**
                 * How many units of the defined type the button should span. If `type`
                 * is "month" and `count` is 3, the button spans three months.
                 *
                 * @type      {number}
                 * @default   1
                 * @apioption rangeSelector.buttons.count
                 */

                /**
                 * Fires when clicking on the rangeSelector button. One parameter,
                 * event, is passed to the function, containing common event
                 * information.
                 *
                 * <pre>
                 * click: function(e) {
                 *   console.log(this);
                 * }
                 * </pre>
                 *
                 * Return false to stop default button's click action.
                 *
                 * @sample {highstock} stock/rangeselector/button-click/
                 *         Click event on the button
                 *
                 * @type      {Highcharts.RangeSelectorClickCallbackFunction}
                 * @apioption rangeSelector.buttons.events.click
                 */

                /**
                 * Additional range (in milliseconds) added to the end of the calculated
                 * time span.
                 *
                 * @sample {highstock} stock/rangeselector/min-max-offsets/
                 *         Button offsets
                 *
                 * @type      {number}
                 * @default   0
                 * @since     6.0.0
                 * @apioption rangeSelector.buttons.offsetMax
                 */

                /**
                 * Additional range (in milliseconds) added to the start of the
                 * calculated time span.
                 *
                 * @sample {highstock} stock/rangeselector/min-max-offsets/
                 *         Button offsets
                 *
                 * @type      {number}
                 * @default   0
                 * @since     6.0.0
                 * @apioption rangeSelector.buttons.offsetMin
                 */

                /**
                 * When buttons apply dataGrouping on a series, by default zooming
                 * in/out will deselect buttons and unset dataGrouping. Enable this
                 * option to keep buttons selected when extremes change.
                 *
                 * @sample {highstock} stock/rangeselector/preserve-datagrouping/
                 *         Different preserveDataGrouping settings
                 *
                 * @type      {boolean}
                 * @default   false
                 * @since     6.1.2
                 * @apioption rangeSelector.buttons.preserveDataGrouping
                 */

                /**
                 * A custom data grouping object for each button.
                 *
                 * @see [series.dataGrouping](#plotOptions.series.dataGrouping)
                 *
                 * @sample {highstock} stock/rangeselector/datagrouping/
                 *         Data grouping by range selector buttons
                 *
                 * @type      {*}
                 * @extends   plotOptions.series.dataGrouping
                 * @apioption rangeSelector.buttons.dataGrouping
                 */

                /**
                 * The text for the button itself.
                 *
                 * @type      {string}
                 * @apioption rangeSelector.buttons.text
                 */

                /**
                 * Defined the time span for the button. Can be one of `millisecond`,
                 * `second`, `minute`, `hour`, `day`, `week`, `month`, `year`, `ytd`,
                 * and `all`.
                 *
                 * @type       {Highcharts.RangeSelectorButtonTypeValue}
                 * @apioption  rangeSelector.buttons.type
                 */

                /**
                 * The space in pixels between the buttons in the range selector.
                 *
                 * @type      {number}
                 * @default   0
                 * @apioption rangeSelector.buttonSpacing
                 */

                /**
                 * Enable or disable the range selector.
                 *
                 * @sample {highstock} stock/rangeselector/enabled/
                 *         Disable the range selector
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption rangeSelector.enabled
                 */

                /**
                 * The vertical alignment of the rangeselector box. Allowed properties
                 * are `top`, `middle`, `bottom`.
                 *
                 * @sample {highstock} stock/rangeselector/vertical-align-middle/
                 *         Middle
                 * @sample {highstock} stock/rangeselector/vertical-align-bottom/
                 *         Bottom
                 *
                 * @type  {Highcharts.VerticalAlignValue}
                 * @since 6.0.0
                 */
                verticalAlign: 'top',

                /**
                 * A collection of attributes for the buttons. The object takes SVG
                 * attributes like `fill`, `stroke`, `stroke-width`, as well as `style`,
                 * a collection of CSS properties for the text.
                 *
                 * The object can also be extended with states, so you can set
                 * presentational options for `hover`, `select` or `disabled` button
                 * states.
                 *
                 * CSS styles for the text label.
                 *
                 * In styled mode, the buttons are styled by the
                 * `.highcharts-range-selector-buttons .highcharts-button` rule with its
                 * different states.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type {Highcharts.SVGAttributes}
                 */
                buttonTheme: {
                    /** @ignore */
                    width: 28,
                    /** @ignore */
                    height: 18,
                    /** @ignore */
                    padding: 2,
                    /** @ignore */
                    zIndex: 7 // #484, #852
                },

                /**
                 * When the rangeselector is floating, the plot area does not reserve
                 * space for it. This opens for positioning anywhere on the chart.
                 *
                 * @sample {highstock} stock/rangeselector/floating/
                 *         Placing the range selector between the plot area and the
                 *         navigator
                 *
                 * @since 6.0.0
                 */
                floating: false,

                /**
                 * The x offset of the range selector relative to its horizontal
                 * alignment within `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @since 6.0.0
                 */
                x: 0,

                /**
                 * The y offset of the range selector relative to its horizontal
                 * alignment within `chart.spacingLeft` and `chart.spacingRight`.
                 *
                 * @since 6.0.0
                 */
                y: 0,

                /**
                 * Deprecated. The height of the range selector. Currently it is
                 * calculated dynamically.
                 *
                 * @deprecated
                 * @type  {number|undefined}
                 * @since 2.1.9
                 */
                height: undefined, // reserved space for buttons and input

                /**
                 * The border color of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {Highcharts.ColorString}
                 * @default   #cccccc
                 * @since     1.3.7
                 * @apioption rangeSelector.inputBoxBorderColor
                 */

                /**
                 * The pixel height of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {number}
                 * @default   17
                 * @since     1.3.7
                 * @apioption rangeSelector.inputBoxHeight
                 */

                /**
                 * CSS for the container DIV holding the input boxes. Deprecated as
                 * of 1.2.5\. Use [inputPosition](#rangeSelector.inputPosition) instead.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @deprecated
                 * @type      {Highcharts.CSSObject}
                 * @apioption rangeSelector.inputBoxStyle
                 */

                /**
                 * The pixel width of the date input boxes.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {number}
                 * @default   90
                 * @since     1.3.7
                 * @apioption rangeSelector.inputBoxWidth
                 */

                /**
                 * The date format in the input boxes when not selected for editing.
                 * Defaults to `%b %e, %Y`.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 * @type      {string}
                 * @default   %b %e, %Y
                 * @apioption rangeSelector.inputDateFormat
                 */

                /**
                 * A custom callback function to parse values entered in the input boxes
                 * and return a valid JavaScript time as milliseconds since 1970.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 * @type      {Highcharts.RangeSelectorParseCallbackFunction}
                 * @since     1.3.3
                 * @apioption rangeSelector.inputDateParser
                 */

                /**
                 * The date format in the input boxes when they are selected for
                 * editing. This must be a format that is recognized by JavaScript
                 * Date.parse.
                 *
                 * @sample {highstock} stock/rangeselector/input-format/
                 *         Milliseconds in the range selector
                 *
                 * @type      {string}
                 * @default   %Y-%m-%d
                 * @apioption rangeSelector.inputEditDateFormat
                 */

                /**
                 * Enable or disable the date input boxes. Defaults to enabled when
                 * there is enough space, disabled if not (typically mobile).
                 *
                 * @sample {highstock} stock/rangeselector/input-datepicker/
                 *         Extending the input with a jQuery UI datepicker
                 *
                 * @type      {boolean}
                 * @default   true
                 * @apioption rangeSelector.inputEnabled
                 */

                /**
                 * Positioning for the input boxes. Allowed properties are `align`,
                 *  `x` and `y`.
                 *
                 * @since 1.2.4
                 */
                inputPosition: {

                    /**
                     * The alignment of the input box. Allowed properties are `left`,
                     * `center`, `right`.
                     *
                     * @sample {highstock} stock/rangeselector/input-button-position/
                     *         Alignment
                     *
                     * @type  {Highcharts.AlignValue}
                     * @since 6.0.0
                     */
                    align: 'right',

                    /**
                     * X offset of the input row.
                     */
                    x: 0,

                    /**
                     * Y offset of the input row.
                     */
                    y: 0
                },

                /**
                 * The index of the button to appear pre-selected.
                 *
                 * @type      {number}
                 * @apioption rangeSelector.selected
                 */

                /**
                 * Positioning for the button row.
                 *
                 * @since 1.2.4
                 */
                buttonPosition: {

                    /**
                     * The alignment of the input box. Allowed properties are `left`,
                     * `center`, `right`.
                     *
                     * @sample {highstock} stock/rangeselector/input-button-position/
                     *         Alignment
                     *
                     * @type  {Highcharts.AlignValue}
                     * @since 6.0.0
                     */
                    align: 'left',

                    /**
                     * X offset of the button row.
                     */
                    x: 0,

                    /**
                     * Y offset of the button row.
                     */
                    y: 0
                },

                /**
                 * CSS for the HTML inputs in the range selector.
                 *
                 * In styled mode, the inputs are styled by the
                 * `.highcharts-range-input text` rule in SVG mode, and
                 * `input.highcharts-range-selector` when active.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type      {Highcharts.CSSObject}
                 * @apioption rangeSelector.inputStyle
                 */

                /**
                 * CSS styles for the labels - the Zoom, From and To texts.
                 *
                 * In styled mode, the labels are styled by the
                 * `.highcharts-range-label` class.
                 *
                 * @sample {highstock} stock/rangeselector/styling/
                 *         Styling the buttons and inputs
                 *
                 * @type {Highcharts.CSSObject}
                 */
                labelStyle: {
                    /** @ignore */
                    color: '#666666'
                }
            }
        });

        defaultOptions.lang = merge(

            defaultOptions.lang,

            /**
             * Language object. The language object is global and it can't be set
             * on each chart initialization. Instead, use `Highcharts.setOptions` to
             * set it before any chart is initialized.
             *
             * <pre>Highcharts.setOptions({
             *     lang: {
             *         months: [
             *             'Janvier', 'Février', 'Mars', 'Avril',
             *             'Mai', 'Juin', 'Juillet', 'Août',
             *             'Septembre', 'Octobre', 'Novembre', 'Décembre'
             *         ],
             *         weekdays: [
             *             'Dimanche', 'Lundi', 'Mardi', 'Mercredi',
             *             'Jeudi', 'Vendredi', 'Samedi'
             *         ]
             *     }
             * });</pre>
             *
             * @optionparent lang
             */
            {

                /**
                 * The text for the label for the range selector buttons.
                 *
                 * @product highstock gantt
                 */
                rangeSelectorZoom: 'Zoom',

                /**
                 * The text for the label for the "from" input box in the range
                 * selector.
                 *
                 * @product highstock gantt
                 */
                rangeSelectorFrom: 'From',

                /**
                 * The text for the label for the "to" input box in the range selector.
                 *
                 * @product highstock gantt
                 */
                rangeSelectorTo: 'To'
            }
        );

        /**
         * The range selector.
         *
         * @private
         * @class
         * @name Highcharts.RangeSelector
         *
         * @param {Highcharts.Chart} chart
         */
        function RangeSelector(chart) {

            // Run RangeSelector
            this.init(chart);
        }

        RangeSelector.prototype = {
            /**
             * The method to run when one of the buttons in the range selectors is
             * clicked
             *
             * @private
             * @function Highcharts.RangeSelector#clickButton
             *
             * @param {number} i
             *        The index of the button
             *
             * @param {boolean} redraw
             */
            clickButton: function (i, redraw) {
                var rangeSelector = this,
                    chart = rangeSelector.chart,
                    rangeOptions = rangeSelector.buttonOptions[i],
                    baseAxis = chart.xAxis[0],
                    unionExtremes = (
                        chart.scroller && chart.scroller.getUnionExtremes()
                    ) || baseAxis || {},
                    dataMin = unionExtremes.dataMin,
                    dataMax = unionExtremes.dataMax,
                    newMin,
                    newMax = baseAxis && Math.round(
                        Math.min(baseAxis.max, pick(dataMax, baseAxis.max))
                    ), // #1568
                    type = rangeOptions.type,
                    baseXAxisOptions,
                    range = rangeOptions._range,
                    rangeMin,
                    minSetting,
                    rangeSetting,
                    ctx,
                    ytdExtremes,
                    dataGrouping = rangeOptions.dataGrouping;

                // chart has no data, base series is removed
                if (dataMin === null || dataMax === null) {
                    return;
                }

                // Set the fixed range before range is altered
                chart.fixedRange = range;

                // Apply dataGrouping associated to button
                if (dataGrouping) {
                    this.forcedDataGrouping = true;
                    Axis.prototype.setDataGrouping.call(
                        baseAxis || { chart: this.chart },
                        dataGrouping,
                        false
                    );

                    this.frozenStates = rangeOptions.preserveDataGrouping;
                }

                // Apply range
                if (type === 'month' || type === 'year') {
                    if (!baseAxis) {
                        // This is set to the user options and picked up later when the
                        // axis is instantiated so that we know the min and max.
                        range = rangeOptions;
                    } else {
                        ctx = {
                            range: rangeOptions,
                            max: newMax,
                            chart: chart,
                            dataMin: dataMin,
                            dataMax: dataMax
                        };
                        newMin = baseAxis.minFromRange.call(ctx);
                        if (isNumber(ctx.newMax)) {
                            newMax = ctx.newMax;
                        }
                    }

                // Fixed times like minutes, hours, days
                } else if (range) {
                    newMin = Math.max(newMax - range, dataMin);
                    newMax = Math.min(newMin + range, dataMax);

                } else if (type === 'ytd') {

                    // On user clicks on the buttons, or a delayed action running from
                    // the beforeRender event (below), the baseAxis is defined.
                    if (baseAxis) {
                        // When "ytd" is the pre-selected button for the initial view,
                        // its calculation is delayed and rerun in the beforeRender
                        // event (below). When the series are initialized, but before
                        // the chart is rendered, we have access to the xData array
                        // (#942).
                        if (dataMax === undefined) {
                            dataMin = Number.MAX_VALUE;
                            dataMax = Number.MIN_VALUE;
                            chart.series.forEach(function (series) {
                                // reassign it to the last item
                                var xData = series.xData;

                                dataMin = Math.min(xData[0], dataMin);
                                dataMax = Math.max(xData[xData.length - 1], dataMax);
                            });
                            redraw = false;
                        }
                        ytdExtremes = rangeSelector.getYTDExtremes(
                            dataMax,
                            dataMin,
                            chart.time.useUTC
                        );
                        newMin = rangeMin = ytdExtremes.min;
                        newMax = ytdExtremes.max;

                    // "ytd" is pre-selected. We don't yet have access to processed
                    // point and extremes data (things like pointStart and pointInterval
                    // are missing), so we delay the process (#942)
                    } else {
                        rangeSelector.deferredYTDClick = i;
                        return;
                    }
                } else if (type === 'all' && baseAxis) {
                    newMin = dataMin;
                    newMax = dataMax;
                }

                newMin += rangeOptions._offsetMin;
                newMax += rangeOptions._offsetMax;

                rangeSelector.setSelected(i);

                // Update the chart
                if (!baseAxis) {
                    // Axis not yet instanciated. Temporarily set min and range
                    // options and remove them on chart load (#4317).
                    baseXAxisOptions = splat(chart.options.xAxis)[0];
                    rangeSetting = baseXAxisOptions.range;
                    baseXAxisOptions.range = range;
                    minSetting = baseXAxisOptions.min;
                    baseXAxisOptions.min = rangeMin;
                    addEvent(chart, 'load', function resetMinAndRange() {
                        baseXAxisOptions.range = rangeSetting;
                        baseXAxisOptions.min = minSetting;
                    });
                } else {
                    // Existing axis object. Set extremes after render time.
                    baseAxis.setExtremes(
                        newMin,
                        newMax,
                        pick(redraw, 1),
                        null, // auto animation
                        {
                            trigger: 'rangeSelectorButton',
                            rangeSelectorButton: rangeOptions
                        }
                    );
                }
            },

            /**
             * Set the selected option. This method only sets the internal flag, it
             * doesn't update the buttons or the actual zoomed range.
             *
             * @private
             * @function Highcharts.RangeSelector#setSelected
             *
             * @param {boolean} selected
             */
            setSelected: function (selected) {
                this.selected = this.options.selected = selected;
            },

            /**
             * The default buttons for pre-selecting time frames
             */
            defaultButtons: [{
                type: 'month',
                count: 1,
                text: '1m'
            }, {
                type: 'month',
                count: 3,
                text: '3m'
            }, {
                type: 'month',
                count: 6,
                text: '6m'
            }, {
                type: 'ytd',
                text: 'YTD'
            }, {
                type: 'year',
                count: 1,
                text: '1y'
            }, {
                type: 'all',
                text: 'All'
            }],

            /**
             * Initialize the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#init
             *
             * @param {Highcharts.Chart} chart
             */
            init: function (chart) {
                var rangeSelector = this,
                    options = chart.options.rangeSelector,
                    buttonOptions = options.buttons ||
                        [].concat(rangeSelector.defaultButtons),
                    selectedOption = options.selected,
                    blurInputs = function () {
                        var minInput = rangeSelector.minInput,
                            maxInput = rangeSelector.maxInput;

                        // #3274 in some case blur is not defined
                        if (minInput && minInput.blur) {
                            fireEvent(minInput, 'blur');
                        }
                        if (maxInput && maxInput.blur) {
                            fireEvent(maxInput, 'blur');
                        }
                    };

                rangeSelector.chart = chart;
                rangeSelector.options = options;
                rangeSelector.buttons = [];

                rangeSelector.buttonOptions = buttonOptions;

                this.unMouseDown = addEvent(chart.container, 'mousedown', blurInputs);
                this.unResize = addEvent(chart, 'resize', blurInputs);

                // Extend the buttonOptions with actual range
                buttonOptions.forEach(rangeSelector.computeButtonRange);

                // zoomed range based on a pre-selected button index
                if (selectedOption !== undefined && buttonOptions[selectedOption]) {
                    this.clickButton(selectedOption, false);
                }


                addEvent(chart, 'load', function () {
                    // If a data grouping is applied to the current button, release it
                    // when extremes change
                    if (chart.xAxis && chart.xAxis[0]) {
                        addEvent(chart.xAxis[0], 'setExtremes', function (e) {
                            if (
                                this.max - this.min !== chart.fixedRange &&
                                e.trigger !== 'rangeSelectorButton' &&
                                e.trigger !== 'updatedData' &&
                                rangeSelector.forcedDataGrouping &&
                                !rangeSelector.frozenStates
                            ) {
                                this.setDataGrouping(false, false);
                            }
                        });
                    }
                });
            },

            /**
             * Dynamically update the range selector buttons after a new range has been
             * set
             *
             * @private
             * @function Highcharts.RangeSelector#updateButtonStates
             */
            updateButtonStates: function () {
                var rangeSelector = this,
                    chart = this.chart,
                    baseAxis = chart.xAxis[0],
                    actualRange = Math.round(baseAxis.max - baseAxis.min),
                    hasNoData = !baseAxis.hasVisibleSeries,
                    day = 24 * 36e5, // A single day in milliseconds
                    unionExtremes = (
                        chart.scroller &&
                        chart.scroller.getUnionExtremes()
                    ) || baseAxis,
                    dataMin = unionExtremes.dataMin,
                    dataMax = unionExtremes.dataMax,
                    ytdExtremes = rangeSelector.getYTDExtremes(
                        dataMax,
                        dataMin,
                        chart.time.useUTC
                    ),
                    ytdMin = ytdExtremes.min,
                    ytdMax = ytdExtremes.max,
                    selected = rangeSelector.selected,
                    selectedExists = isNumber(selected),
                    allButtonsEnabled = rangeSelector.options.allButtonsEnabled,
                    buttons = rangeSelector.buttons;

                rangeSelector.buttonOptions.forEach(function (rangeOptions, i) {
                    var range = rangeOptions._range,
                        type = rangeOptions.type,
                        count = rangeOptions.count || 1,
                        button = buttons[i],
                        state = 0,
                        disable,
                        select,
                        offsetRange = rangeOptions._offsetMax - rangeOptions._offsetMin,
                        isSelected = i === selected,
                        // Disable buttons where the range exceeds what is allowed in
                        // the current view
                        isTooGreatRange = range > dataMax - dataMin,
                        // Disable buttons where the range is smaller than the minimum
                        // range
                        isTooSmallRange = range < baseAxis.minRange,
                        // Do not select the YTD button if not explicitly told so
                        isYTDButNotSelected = false,
                        // Disable the All button if we're already showing all
                        isAllButAlreadyShowingAll = false,
                        isSameRange = range === actualRange;

                    // Months and years have a variable range so we check the extremes
                    if (
                        (type === 'month' || type === 'year') &&
                        (
                            actualRange + 36e5 >=
                            { month: 28, year: 365 }[type] * day * count - offsetRange
                        ) &&
                        (
                            actualRange - 36e5 <=
                            { month: 31, year: 366 }[type] * day * count + offsetRange
                        )
                    ) {
                        isSameRange = true;
                    } else if (type === 'ytd') {
                        isSameRange = (ytdMax - ytdMin + offsetRange) === actualRange;
                        isYTDButNotSelected = !isSelected;
                    } else if (type === 'all') {
                        isSameRange = baseAxis.max - baseAxis.min >= dataMax - dataMin;
                        isAllButAlreadyShowingAll = (
                            !isSelected &&
                            selectedExists &&
                            isSameRange
                        );
                    }

                    // The new zoom area happens to match the range for a button - mark
                    // it selected. This happens when scrolling across an ordinal gap.
                    // It can be seen in the intraday demos when selecting 1h and scroll
                    // across the night gap.
                    disable = (
                        !allButtonsEnabled &&
                        (
                            isTooGreatRange ||
                            isTooSmallRange ||
                            isAllButAlreadyShowingAll ||
                            hasNoData
                        )
                    );
                    select = (
                        (isSelected && isSameRange) ||
                        (isSameRange && !selectedExists && !isYTDButNotSelected) ||
                        (isSelected && rangeSelector.frozenStates)
                    );

                    if (disable) {
                        state = 3;
                    } else if (select) {
                        selectedExists = true; // Only one button can be selected
                        state = 2;
                    }

                    // If state has changed, update the button
                    if (button.state !== state) {
                        button.setState(state);

                        // Reset (#9209)
                        if (state === 0 && selected === i) {
                            rangeSelector.setSelected(null);
                        }
                    }
                });
            },

            /**
             * Compute and cache the range for an individual button
             *
             * @private
             * @function Highcharts.RangeSelector#computeButtonRange
             *
             * @param {Highcharts.RangeSelectorOptions} rangeOptions
             */
            computeButtonRange: function (rangeOptions) {
                var type = rangeOptions.type,
                    count = rangeOptions.count || 1,

                    // these time intervals have a fixed number of milliseconds, as
                    // opposed to month, ytd and year
                    fixedTimes = {
                        millisecond: 1,
                        second: 1000,
                        minute: 60 * 1000,
                        hour: 3600 * 1000,
                        day: 24 * 3600 * 1000,
                        week: 7 * 24 * 3600 * 1000
                    };

                // Store the range on the button object
                if (fixedTimes[type]) {
                    rangeOptions._range = fixedTimes[type] * count;
                } else if (type === 'month' || type === 'year') {
                    rangeOptions._range =
                        { month: 30, year: 365 }[type] * 24 * 36e5 * count;
                }

                rangeOptions._offsetMin = pick(rangeOptions.offsetMin, 0);
                rangeOptions._offsetMax = pick(rangeOptions.offsetMax, 0);
                rangeOptions._range +=
                    rangeOptions._offsetMax - rangeOptions._offsetMin;
            },

            /**
             * Set the internal and displayed value of a HTML input for the dates
             *
             * @private
             * @function Highcharts.RangeSelector#setInputValue
             *
             * @param {string} name
             *
             * @param {number} inputTime
             */
            setInputValue: function (name, inputTime) {
                var options = this.chart.options.rangeSelector,
                    time = this.chart.time,
                    input = this[name + 'Input'];

                if (defined(inputTime)) {
                    input.previousValue = input.HCTime;
                    input.HCTime = inputTime;
                }

                input.value = time.dateFormat(
                    options.inputEditDateFormat || '%Y-%m-%d',
                    input.HCTime
                );
                this[name + 'DateBox'].attr({
                    text: time.dateFormat(
                        options.inputDateFormat || '%b %e, %Y',
                        input.HCTime
                    )
                });
            },

            /**
             * @private
             * @function Highcharts.RangeSelector#showInput
             *
             * @param {string} name
             */
            showInput: function (name) {
                var inputGroup = this.inputGroup,
                    dateBox = this[name + 'DateBox'];

                css(this[name + 'Input'], {
                    left: (inputGroup.translateX + dateBox.x) + 'px',
                    top: inputGroup.translateY + 'px',
                    width: (dateBox.width - 2) + 'px',
                    height: (dateBox.height - 2) + 'px',
                    border: '2px solid silver'
                });
            },

            /**
             * @private
             * @function Highcharts.RangeSelector#hideInput
             *
             * @param {string} name
             */
            hideInput: function (name) {
                css(this[name + 'Input'], {
                    border: 0,
                    width: '1px',
                    height: '1px'
                });
                this.setInputValue(name);
            },

            /**
             * Draw either the 'from' or the 'to' HTML input box of the range selector
             *
             * @private
             * @function Highcharts.RangeSelector#drawInput
             *
             * @param {string} name
             */
            drawInput: function (name) {
                var rangeSelector = this,
                    chart = rangeSelector.chart,
                    chartStyle = chart.renderer.style || {},
                    renderer = chart.renderer,
                    options = chart.options.rangeSelector,
                    lang = defaultOptions.lang,
                    div = rangeSelector.div,
                    isMin = name === 'min',
                    input,
                    label,
                    dateBox,
                    inputGroup = this.inputGroup;

                function updateExtremes() {
                    var inputValue = input.value,
                        value = (options.inputDateParser || Date.parse)(inputValue),
                        chartAxis = chart.xAxis[0],
                        dataAxis = chart.scroller && chart.scroller.xAxis ?
                            chart.scroller.xAxis :
                            chartAxis,
                        dataMin = dataAxis.dataMin,
                        dataMax = dataAxis.dataMax;

                    if (value !== input.previousValue) {
                        input.previousValue = value;
                        // If the value isn't parsed directly to a value by the
                        // browser's Date.parse method, like YYYY-MM-DD in IE, try
                        // parsing it a different way
                        if (!isNumber(value)) {
                            value = inputValue.split('-');
                            value = Date.UTC(
                                pInt(value[0]),
                                pInt(value[1]) - 1,
                                pInt(value[2])
                            );
                        }

                        if (isNumber(value)) {

                            // Correct for timezone offset (#433)
                            if (!chart.time.useUTC) {
                                value =
                                    value + new Date().getTimezoneOffset() * 60 * 1000;
                            }

                            // Validate the extremes. If it goes beyound the data min or
                            // max, use the actual data extreme (#2438).
                            if (isMin) {
                                if (value > rangeSelector.maxInput.HCTime) {
                                    value = undefined;
                                } else if (value < dataMin) {
                                    value = dataMin;
                                }
                            } else {
                                if (value < rangeSelector.minInput.HCTime) {
                                    value = undefined;
                                } else if (value > dataMax) {
                                    value = dataMax;
                                }
                            }

                            // Set the extremes
                            if (value !== undefined) {
                                chartAxis.setExtremes(
                                    isMin ? value : chartAxis.min,
                                    isMin ? chartAxis.max : value,
                                    undefined,
                                    undefined,
                                    { trigger: 'rangeSelectorInput' }
                                );
                            }
                        }
                    }
                }

                // Create the text label
                this[name + 'Label'] = label = renderer.label(
                    lang[isMin ? 'rangeSelectorFrom' : 'rangeSelectorTo'],
                    this.inputGroup.offset
                )
                    .addClass('highcharts-range-label')
                    .attr({
                        padding: 2
                    })
                    .add(inputGroup);
                inputGroup.offset += label.width + 5;

                // Create an SVG label that shows updated date ranges and and records
                // click events that bring in the HTML input.
                this[name + 'DateBox'] = dateBox = renderer.label('', inputGroup.offset)
                    .addClass('highcharts-range-input')
                    .attr({
                        padding: 2,
                        width: options.inputBoxWidth || 90,
                        height: options.inputBoxHeight || 17,
                        'text-align': 'center'
                    })
                    .on('click', function () {
                        // If it is already focused, the onfocus event doesn't fire
                        // (#3713)
                        rangeSelector.showInput(name);
                        rangeSelector[name + 'Input'].focus();
                    });

                if (!chart.styledMode) {
                    dateBox.attr({
                        stroke:
                            options.inputBoxBorderColor || '#cccccc',
                        'stroke-width': 1
                    });
                }

                dateBox.add(inputGroup);

                inputGroup.offset += dateBox.width + (isMin ? 10 : 0);


                // Create the HTML input element. This is rendered as 1x1 pixel then set
                // to the right size when focused.
                this[name + 'Input'] = input = createElement('input', {
                    name: name,
                    className: 'highcharts-range-selector',
                    type: 'text'
                }, {
                    top: chart.plotTop + 'px' // prevent jump on focus in Firefox
                }, div);

                if (!chart.styledMode) {
                    // Styles
                    label.css(merge(chartStyle, options.labelStyle));

                    dateBox.css(merge({
                        color: '#333333'
                    }, chartStyle, options.inputStyle));

                    css(input, extend({
                        position: 'absolute',
                        border: 0,
                        width: '1px', // Chrome needs a pixel to see it
                        height: '1px',
                        padding: 0,
                        textAlign: 'center',
                        fontSize: chartStyle.fontSize,
                        fontFamily: chartStyle.fontFamily,
                        top: '-9999em' // #4798
                    }, options.inputStyle));
                }

                // Blow up the input box
                input.onfocus = function () {
                    rangeSelector.showInput(name);
                };
                // Hide away the input box
                input.onblur = function () {
                    // update extermes only when inputs are active
                    if (input === H.doc.activeElement) { // Only when focused
                        // Update also when no `change` event is triggered, like when
                        // clicking inside the SVG (#4710)
                        updateExtremes();
                    }
                    // #10404 - move hide and blur outside focus
                    rangeSelector.hideInput(name);
                    input.blur(); // #4606
                };

                // handle changes in the input boxes
                input.onchange = updateExtremes;

                input.onkeypress = function (event) {
                    // IE does not fire onchange on enter
                    if (event.keyCode === 13) {
                        updateExtremes();
                    }
                };
            },

            /**
             * Get the position of the range selector buttons and inputs. This can be
             * overridden from outside for custom positioning.
             *
             * @private
             * @function Highcharts.RangeSelector#getPosition
             *
             * @return {Highcharts.Dictionary<number>}
             */
            getPosition: function () {
                var chart = this.chart,
                    options = chart.options.rangeSelector,
                    top = options.verticalAlign === 'top' ?
                        chart.plotTop - chart.axisOffset[0] :
                        0; // set offset only for varticalAlign top

                return {
                    buttonTop: top + options.buttonPosition.y,
                    inputTop: top + options.inputPosition.y - 10
                };
            },
            /**
             * Get the extremes of YTD. Will choose dataMax if its value is lower than
             * the current timestamp. Will choose dataMin if its value is higher than
             * the timestamp for the start of current year.
             *
             * @private
             * @function Highcharts.RangeSelector#getYTDExtremes
             *
             * @param {number} dataMax
             *
             * @param {number} dataMin
             *
             * @return {*}
             *         Returns min and max for the YTD
             */
            getYTDExtremes: function (dataMax, dataMin, useUTC) {
                var time = this.chart.time,
                    min,
                    now = new time.Date(dataMax),
                    year = time.get('FullYear', now),
                    startOfYear = useUTC ?
                        time.Date.UTC(year, 0, 1) : // eslint-disable-line new-cap
                        +new time.Date(year, 0, 1);

                min = Math.max(dataMin || 0, startOfYear);
                now = now.getTime();
                return {
                    max: Math.min(dataMax || now, now),
                    min: min
                };
            },

            /**
             * Render the range selector including the buttons and the inputs. The first
             * time render is called, the elements are created and positioned. On
             * subsequent calls, they are moved and updated.
             *
             * @private
             * @function Highcharts.RangeSelector#render
             *
             * @param {number} min
             *        X axis minimum
             *
             * @param {number} max
             *        X axis maximum
             */
            render: function (min, max) {

                var rangeSelector = this,
                    chart = rangeSelector.chart,
                    renderer = chart.renderer,
                    container = chart.container,
                    chartOptions = chart.options,
                    navButtonOptions = (
                        chartOptions.exporting &&
                        chartOptions.exporting.enabled !== false &&
                        chartOptions.navigation &&
                        chartOptions.navigation.buttonOptions
                    ),
                    lang = defaultOptions.lang,
                    div = rangeSelector.div,
                    options = chartOptions.rangeSelector,
                    // Place inputs above the container
                    inputsZIndex = pick(
                        chartOptions.chart.style &&
                        chartOptions.chart.style.zIndex,
                        0
                    ) + 1,
                    floating = options.floating,
                    buttons = rangeSelector.buttons,
                    inputGroup = rangeSelector.inputGroup,
                    buttonTheme = options.buttonTheme,
                    buttonPosition = options.buttonPosition,
                    inputPosition = options.inputPosition,
                    inputEnabled = options.inputEnabled,
                    states = buttonTheme && buttonTheme.states,
                    plotLeft = chart.plotLeft,
                    buttonLeft,
                    buttonGroup = rangeSelector.buttonGroup,
                    group,
                    groupHeight,
                    rendered = rangeSelector.rendered,
                    verticalAlign = rangeSelector.options.verticalAlign,
                    legend = chart.legend,
                    legendOptions = legend && legend.options,
                    buttonPositionY = buttonPosition.y,
                    inputPositionY = inputPosition.y,
                    animate = rendered || false,
                    verb = animate ? 'animate' : 'attr',
                    exportingX = 0,
                    alignTranslateY,
                    legendHeight,
                    minPosition,
                    translateY = 0,
                    translateX;

                if (options.enabled === false) {
                    return;
                }

                // create the elements
                if (!rendered) {

                    rangeSelector.group = group = renderer.g('range-selector-group')
                        .attr({
                            zIndex: 7
                        })
                        .add();

                    rangeSelector.buttonGroup = buttonGroup =
                        renderer.g('range-selector-buttons').add(group);

                    rangeSelector.zoomText = renderer.text(
                        lang.rangeSelectorZoom,
                        0,
                        15
                    )
                        .add(buttonGroup);

                    if (!chart.styledMode) {

                        rangeSelector.zoomText.css(options.labelStyle);

                        buttonTheme['stroke-width'] =
                            pick(buttonTheme['stroke-width'], 0);
                    }

                    rangeSelector.buttonOptions.forEach(function (rangeOptions, i) {

                        buttons[i] = renderer.button(
                            rangeOptions.text,
                            0,
                            0,
                            function (e) {

                                // extract events from button object and call
                                var buttonEvents = (
                                        rangeOptions.events &&
                                            rangeOptions.events.click
                                    ),
                                    callDefaultEvent;

                                if (buttonEvents) {
                                    callDefaultEvent =
                                            buttonEvents.call(rangeOptions, e);
                                }

                                if (callDefaultEvent !== false) {
                                    rangeSelector.clickButton(i);
                                }

                                rangeSelector.isActive = true;
                            },
                            buttonTheme,
                            states && states.hover,
                            states && states.select,
                            states && states.disabled
                        )
                            .attr({
                                'text-align': 'center'
                            })
                            .add(buttonGroup);
                    });

                    // first create a wrapper outside the container in order to make
                    // the inputs work and make export correct
                    if (inputEnabled !== false) {
                        rangeSelector.div = div = createElement('div', null, {
                            position: 'relative',
                            height: 0,
                            zIndex: inputsZIndex
                        });

                        container.parentNode.insertBefore(div, container);

                        // Create the group to keep the inputs
                        rangeSelector.inputGroup = inputGroup =
                            renderer.g('input-group').add(group);
                        inputGroup.offset = 0;

                        rangeSelector.drawInput('min');
                        rangeSelector.drawInput('max');
                    }
                }

                // #8769, allow dynamically updating margins
                rangeSelector.zoomText[verb]({
                    x: pick(plotLeft + buttonPosition.x, plotLeft)
                });
                // button start position
                buttonLeft = pick(plotLeft + buttonPosition.x, plotLeft) +
                    rangeSelector.zoomText.getBBox().width + 5;
                rangeSelector.buttonOptions.forEach(function (rangeOptions, i) {

                    buttons[i][verb]({ x: buttonLeft });

                    // increase button position for the next button
                    buttonLeft += buttons[i].width + pick(options.buttonSpacing, 5);
                });


                plotLeft = chart.plotLeft - chart.spacing[3];
                rangeSelector.updateButtonStates();

                // detect collisiton with exporting
                if
                (
                    navButtonOptions &&
                        this.titleCollision(chart) &&
                        verticalAlign === 'top' &&
                        buttonPosition.align === 'right' &&
                        (
                            (buttonPosition.y + buttonGroup.getBBox().height - 12) <
                            ((navButtonOptions.y || 0) + navButtonOptions.height)
                        )
                ) {
                    exportingX = -40;
                }

                if (buttonPosition.align === 'left') {
                    translateX = buttonPosition.x - chart.spacing[3];
                } else if (buttonPosition.align === 'right') {
                    translateX = buttonPosition.x + exportingX - chart.spacing[1];
                }

                // align button group
                buttonGroup.align({
                    y: buttonPosition.y,
                    width: buttonGroup.getBBox().width,
                    align: buttonPosition.align,
                    x: translateX
                }, true, chart.spacingBox);

                // skip animation
                rangeSelector.group.placed = animate;
                rangeSelector.buttonGroup.placed = animate;

                if (inputEnabled !== false) {

                    var inputGroupX,
                        inputGroupWidth,
                        buttonGroupX,
                        buttonGroupWidth;

                    // detect collision with exporting
                    if
                    (
                        navButtonOptions &&
                            this.titleCollision(chart) &&
                            verticalAlign === 'top' &&
                            inputPosition.align === 'right' &&
                            (
                                (inputPosition.y - inputGroup.getBBox().height - 12) <
                                (
                                    (navButtonOptions.y || 0) +
                                    navButtonOptions.height +
                                    chart.spacing[0]
                                )
                            )
                    ) {
                        exportingX = -40;
                    } else {
                        exportingX = 0;
                    }

                    if (inputPosition.align === 'left') {
                        translateX = plotLeft;
                    } else if (inputPosition.align === 'right') {
                        translateX = -Math.max(chart.axisOffset[1], -exportingX);
                    }

                    // Update the alignment to the updated spacing box
                    inputGroup.align({
                        y: inputPosition.y,
                        width: inputGroup.getBBox().width,
                        align: inputPosition.align,
                        // fix wrong getBBox() value on right align
                        x: inputPosition.x + translateX - 2
                    }, true, chart.spacingBox);

                    // detect collision
                    inputGroupX = (
                        inputGroup.alignAttr.translateX +
                        inputGroup.alignOptions.x -
                        exportingX +
                        // getBBox for detecing left margin
                        inputGroup.getBBox().x +
                        // 2px padding to not overlap input and label
                        2
                    );

                    inputGroupWidth = inputGroup.alignOptions.width;

                    buttonGroupX = buttonGroup.alignAttr.translateX +
                        buttonGroup.getBBox().x;
                    // 20 is minimal spacing between elements
                    buttonGroupWidth = buttonGroup.getBBox().width + 20;

                    if (
                        (inputPosition.align === buttonPosition.align) ||
                            (
                                (buttonGroupX + buttonGroupWidth > inputGroupX) &&
                                (inputGroupX + inputGroupWidth > buttonGroupX) &&
                                (
                                    buttonPositionY <
                                    (inputPositionY + inputGroup.getBBox().height)
                                )
                            )
                    ) {

                        inputGroup.attr({
                            translateX: inputGroup.alignAttr.translateX +
                                (chart.axisOffset[1] >= -exportingX ? 0 : -exportingX),
                            translateY: inputGroup.alignAttr.translateY +
                                buttonGroup.getBBox().height + 10
                        });

                    }

                    // Set or reset the input values
                    rangeSelector.setInputValue('min', min);
                    rangeSelector.setInputValue('max', max);

                    // skip animation
                    rangeSelector.inputGroup.placed = animate;
                }

                // vertical align
                rangeSelector.group.align({
                    verticalAlign: verticalAlign
                }, true, chart.spacingBox);

                // set position
                groupHeight = rangeSelector.group.getBBox().height + 20; // # 20 padding
                alignTranslateY = rangeSelector.group.alignAttr.translateY;

                // calculate bottom position
                if (verticalAlign === 'bottom') {
                    legendHeight = (
                        legendOptions &&
                        legendOptions.verticalAlign === 'bottom' &&
                        legendOptions.enabled &&
                        !legendOptions.floating ?
                            legend.legendHeight + pick(legendOptions.margin, 10) :
                            0
                    );

                    groupHeight = groupHeight + legendHeight - 20;
                    translateY = (
                        alignTranslateY -
                        groupHeight -
                        (floating ? 0 : options.y) -
                        10 // 10 spacing
                    );

                }

                if (verticalAlign === 'top') {
                    if (floating) {
                        translateY = 0;
                    }

                    if (chart.titleOffset) {
                        translateY = chart.titleOffset + chart.options.title.margin;
                    }

                    translateY += ((chart.margin[0] - chart.spacing[0]) || 0);

                } else if (verticalAlign === 'middle') {
                    if (inputPositionY === buttonPositionY) {
                        if (inputPositionY < 0) {
                            translateY = alignTranslateY + minPosition;
                        } else {
                            translateY = alignTranslateY;
                        }
                    } else if (inputPositionY || buttonPositionY) {
                        if (inputPositionY < 0 || buttonPositionY < 0) {
                            translateY -= Math.min(inputPositionY, buttonPositionY);
                        } else {
                            translateY = alignTranslateY - groupHeight + minPosition;
                        }
                    }
                }

                rangeSelector.group.translate(
                    options.x,
                    options.y + Math.floor(translateY)
                );

                // translate HTML inputs
                if (inputEnabled !== false) {
                    rangeSelector.minInput.style.marginTop =
                        rangeSelector.group.translateY + 'px';
                    rangeSelector.maxInput.style.marginTop =
                        rangeSelector.group.translateY + 'px';
                }

                rangeSelector.rendered = true;
            },

            /**
             * Extracts height of range selector
             *
             * @private
             * @function Highcharts.RangeSelector#getHeight
             *
             * @return {number}
             *         Returns rangeSelector height
             */
            getHeight: function () {
                var rangeSelector = this,
                    options = rangeSelector.options,
                    rangeSelectorGroup = rangeSelector.group,
                    inputPosition = options.inputPosition,
                    buttonPosition = options.buttonPosition,
                    yPosition = options.y,
                    buttonPositionY = buttonPosition.y,
                    inputPositionY = inputPosition.y,
                    rangeSelectorHeight = 0,
                    minPosition;

                if (options.height) {
                    return options.height;
                }

                rangeSelectorHeight = rangeSelectorGroup ?
                    // 13px to keep back compatibility
                    (rangeSelectorGroup.getBBox(true).height) + 13 + yPosition :
                    0;

                minPosition = Math.min(inputPositionY, buttonPositionY);

                if (
                    (inputPositionY < 0 && buttonPositionY < 0) ||
                    (inputPositionY > 0 && buttonPositionY > 0)
                ) {
                    rangeSelectorHeight += Math.abs(minPosition);
                }

                return rangeSelectorHeight;
            },

            /**
             * Detect collision with title or subtitle
             *
             * @private
             * @function Highcharts.RangeSelector#titleCollision
             *
             * @param {Highcharts.Chart} chart
             *
             * @return {boolean}
             *         Returns collision status
             */
            titleCollision: function (chart) {
                return !(chart.options.title.text || chart.options.subtitle.text);
            },

            /**
             * Update the range selector with new options
             *
             * @private
             * @function Highcharts.RangeSelector#update
             *
             * @param {Highcharts.RangeSelectorOptions} options
             */
            update: function (options) {
                var chart = this.chart;
                merge(true, chart.options.rangeSelector, options);

                this.destroy();
                this.init(chart);

                chart.rangeSelector.render();
            },

            /**
             * Destroys allocated elements.
             *
             * @private
             * @function Highcharts.RangeSelector#destroy
             */
            destroy: function () {
                var rSelector = this,
                    minInput = rSelector.minInput,
                    maxInput = rSelector.maxInput;

                rSelector.unMouseDown();
                rSelector.unResize();

                // Destroy elements in collections
                destroyObjectProperties(rSelector.buttons);

                // Clear input element events
                if (minInput) {
                    minInput.onfocus = minInput.onblur = minInput.onchange = null;
                }
                if (maxInput) {
                    maxInput.onfocus = maxInput.onblur = maxInput.onchange = null;
                }

                // Destroy HTML and SVG elements
                H.objectEach(rSelector, function (val, key) {
                    if (val && key !== 'chart') {
                        if (val.destroy) { // SVGElement
                            val.destroy();
                        } else if (val.nodeType) { // HTML element
                            discardElement(this[key]);
                        }
                    }
                    if (val !== RangeSelector.prototype[key]) {
                        rSelector[key] = null;
                    }
                }, this);
            }
        };

        /**
         * Get the axis min value based on the range option and the current max. For
         * stock charts this is extended via the {@link RangeSelector} so that if the
         * selected range is a multiple of months or years, it is compensated for
         * various month lengths.
         *
         * @private
         * @function Highcharts.Axis#minFromRange
         *
         * @return {number}
         *         The new minimum value.
         */
        Axis.prototype.minFromRange = function () {
            var rangeOptions = this.range,
                type = rangeOptions.type,
                timeName = { month: 'Month', year: 'FullYear' }[type],
                min,
                max = this.max,
                dataMin,
                range,
                time = this.chart.time,
                // Get the true range from a start date
                getTrueRange = function (base, count) {
                    var date = new time.Date(base),
                        basePeriod = time.get(timeName, date);

                    time.set(timeName, date, basePeriod + count);

                    if (basePeriod === time.get(timeName, date)) {
                        time.set('Date', date, 0); // #6537
                    }

                    return date.getTime() - base;
                };

            if (isNumber(rangeOptions)) {
                min = max - rangeOptions;
                range = rangeOptions;
            } else {
                min = max + getTrueRange(max, -rangeOptions.count);

                // Let the fixedRange reflect initial settings (#5930)
                if (this.chart) {
                    this.chart.fixedRange = max - min;
                }
            }

            dataMin = pick(this.dataMin, Number.MIN_VALUE);
            if (!isNumber(min)) {
                min = dataMin;
            }
            if (min <= dataMin) {
                min = dataMin;
                if (range === undefined) { // #4501
                    range = getTrueRange(min, rangeOptions.count);
                }
                this.newMax = Math.min(min + range, this.dataMax);
            }
            if (!isNumber(max)) {
                min = undefined;
            }
            return min;

        };

        if (!H.RangeSelector) {
            // Initialize rangeselector for stock charts
            addEvent(Chart, 'afterGetContainer', function () {
                if (this.options.rangeSelector.enabled) {
                    this.rangeSelector = new RangeSelector(this);
                }
            });

            addEvent(Chart, 'beforeRender', function () {

                var chart = this,
                    axes = chart.axes,
                    rangeSelector = chart.rangeSelector,
                    verticalAlign;

                if (rangeSelector) {

                    if (isNumber(rangeSelector.deferredYTDClick)) {
                        rangeSelector.clickButton(rangeSelector.deferredYTDClick);
                        delete rangeSelector.deferredYTDClick;
                    }

                    axes.forEach(function (axis) {
                        axis.updateNames();
                        axis.setScale();
                    });

                    chart.getAxisMargins();

                    rangeSelector.render();
                    verticalAlign = rangeSelector.options.verticalAlign;

                    if (!rangeSelector.options.floating) {
                        if (verticalAlign === 'bottom') {
                            this.extraBottomMargin = true;
                        } else if (verticalAlign !== 'middle') {
                            this.extraTopMargin = true;
                        }
                    }
                }

            });

            addEvent(Chart, 'update', function (e) {

                var chart = this,
                    options = e.options,
                    optionsRangeSelector = options.rangeSelector,
                    rangeSelector = chart.rangeSelector,
                    verticalAlign,
                    extraBottomMarginWas = this.extraBottomMargin,
                    extraTopMarginWas = this.extraTopMargin;

                if (
                    optionsRangeSelector &&
                    optionsRangeSelector.enabled &&
                    !defined(rangeSelector)
                ) {
                    this.options.rangeSelector.enabled = true;
                    this.rangeSelector = new RangeSelector(this);
                }

                this.extraBottomMargin = false;
                this.extraTopMargin = false;

                if (rangeSelector) {

                    rangeSelector.render();

                    verticalAlign = (
                        optionsRangeSelector &&
                        optionsRangeSelector.verticalAlign
                    ) || (
                        rangeSelector.options && rangeSelector.options.verticalAlign
                    );

                    if (!rangeSelector.options.floating) {
                        if (verticalAlign === 'bottom') {
                            this.extraBottomMargin = true;
                        } else if (verticalAlign !== 'middle') {
                            this.extraTopMargin = true;
                        }
                    }

                    if (
                        this.extraBottomMargin !== extraBottomMarginWas ||
                        this.extraTopMargin !== extraTopMarginWas
                    ) {
                        this.isDirtyBox = true;
                    }

                }

            });

            addEvent(Chart, 'render', function () {
                var chart = this,
                    rangeSelector = chart.rangeSelector,
                    verticalAlign;

                if (rangeSelector && !rangeSelector.options.floating) {

                    rangeSelector.render();
                    verticalAlign = rangeSelector.options.verticalAlign;

                    if (verticalAlign === 'bottom') {
                        this.extraBottomMargin = true;
                    } else if (verticalAlign !== 'middle') {
                        this.extraTopMargin = true;
                    }
                }
            });

            addEvent(Chart, 'getMargins', function () {
                var rangeSelector = this.rangeSelector,
                    rangeSelectorHeight;

                if (rangeSelector) {
                    rangeSelectorHeight = rangeSelector.getHeight();
                    if (this.extraTopMargin) {
                        this.plotTop += rangeSelectorHeight;
                    }

                    if (this.extraBottomMargin) {
                        this.marginBottom += rangeSelectorHeight;
                    }
                }
            });

            Chart.prototype.callbacks.push(function (chart) {
                var extremes,
                    rangeSelector = chart.rangeSelector,
                    unbindRender,
                    unbindSetExtremes;

                function renderRangeSelector() {
                    extremes = chart.xAxis[0].getExtremes();
                    if (isNumber(extremes.min)) {
                        rangeSelector.render(extremes.min, extremes.max);
                    }
                }

                if (rangeSelector) {
                    // redraw the scroller on setExtremes
                    unbindSetExtremes = addEvent(
                        chart.xAxis[0],
                        'afterSetExtremes',
                        function (e) {
                            rangeSelector.render(e.min, e.max);
                        }
                    );

                    // redraw the scroller chart resize
                    unbindRender = addEvent(chart, 'redraw', renderRangeSelector);

                    // do it now
                    renderRangeSelector();
                }

                // Remove resize/afterSetExtremes at chart destroy
                addEvent(chart, 'destroy', function destroyEvents() {
                    if (rangeSelector) {
                        unbindRender();
                        unbindSetExtremes();
                    }
                });
            });


            H.RangeSelector = RangeSelector;
        }

    });
    _registerModule(_modules, 'parts/StockChart.js', [_modules['parts/Globals.js']], function (H) {
        /* *
         *
         *  (c) 2010-2019 Torstein Honsi
         *
         *  License: www.highcharts.com/license
         *
         * */


        // Has a dependency on Navigator due to the use of
        // defaultOptions.navigator
        // Has a dependency on Scrollbar due to the use of
        // defaultOptions.scrollbar
        // Has a dependency on RangeSelector due to the use of
        // defaultOptions.rangeSelector

        var addEvent = H.addEvent,
            arrayMax = H.arrayMax,
            arrayMin = H.arrayMin,
            Axis = H.Axis,
            Chart = H.Chart,
            defined = H.defined,
            extend = H.extend,
            format = H.format,
            isNumber = H.isNumber,
            isString = H.isString,
            merge = H.merge,
            pick = H.pick,
            Point = H.Point,
            Renderer = H.Renderer,
            Series = H.Series,
            splat = H.splat,
            SVGRenderer = H.SVGRenderer,
            VMLRenderer = H.VMLRenderer,

            seriesProto = Series.prototype,
            seriesInit = seriesProto.init,
            seriesProcessData = seriesProto.processData,
            pointTooltipFormatter = Point.prototype.tooltipFormatter;


        /**
         * Compare the values of the series against the first non-null, non-
         * zero value in the visible range. The y axis will show percentage
         * or absolute change depending on whether `compare` is set to `"percent"`
         * or `"value"`. When this is applied to multiple series, it allows
         * comparing the development of the series against each other. Adds
         * a `change` field to every point object.
         *
         * @see [compareBase](#plotOptions.series.compareBase)
         * @see [Axis.setCompare()](/class-reference/Highcharts.Axis#setCompare)
         *
         * @sample {highstock} stock/plotoptions/series-compare-percent/
         *         Percent
         * @sample {highstock} stock/plotoptions/series-compare-value/
         *         Value
         *
         * @type      {string}
         * @since     1.0.1
         * @product   highstock
         * @apioption plotOptions.series.compare
         */

        /**
         * Defines if comparison should start from the first point within the visible
         * range or should start from the first point <b>before</b> the range.
         * In other words, this flag determines if first point within the visible range
         * will have 0% (`compareStart=true`) or should have been already calculated
         * according to the previous point (`compareStart=false`).
         *
         * @sample {highstock} stock/plotoptions/series-comparestart/
         *         Calculate compare within visible range
         *
         * @type      {boolean}
         * @default   false
         * @since     6.0.0
         * @product   highstock
         * @apioption plotOptions.series.compareStart
         */

        /**
         * When [compare](#plotOptions.series.compare) is `percent`, this option
         * dictates whether to use 0 or 100 as the base of comparison.
         *
         * @sample {highstock} stock/plotoptions/series-comparebase/
         *         Compare base is 100
         *
         * @type       {number}
         * @default    0
         * @since      5.0.6
         * @product    highstock
         * @validvalue [0, 100]
         * @apioption  plotOptions.series.compareBase
         */

        /**
         * Factory function for creating new stock charts. Creates a new
         * {@link Highcharts.Chart|Chart} object with different default options than the
         * basic Chart.
         *
         * @example
         * var chart = Highcharts.stockChart('container', {
         *     series: [{
         *         data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
         *         pointInterval: 24 * 60 * 60 * 1000
         *     }]
         * });
         *
         * @function Highcharts.stockChart
         *
         * @param {string|Highcharts.HTMLDOMElement} [renderTo]
         *        The DOM element to render to, or its id.
         *
         * @param {Highcharts.Options} options
         *        The chart options structure as described in the
         *        [options reference](https://api.highcharts.com/highstock).
         *
         * @param {Highcharts.ChartCallbackFunction} [callback]
         *        A function to execute when the chart object is finished loading and
         *        rendering. In most cases the chart is built in one thread, but in
         *        Internet Explorer version 8 or less the chart is sometimes
         *        initialized before the document is ready, and in these cases the
         *        chart object will not be finished synchronously. As a consequence,
         *        code that relies on the newly built Chart object should always run in
         *        the callback. Defining a
         *        [chart.events.load](https://api.highcharts.com/highstock/chart.events.load)
         *        handler is equivalent.
         *
         * @return {Highcharts.Chart}
         *         The chart object.
         */
        H.StockChart = H.stockChart = function (a, b, c) {
            var hasRenderToArg = isString(a) || a.nodeName,
                options = arguments[hasRenderToArg ? 1 : 0],
                userOptions = options,
                // to increase performance, don't merge the data
                seriesOptions = options.series,
                defaultOptions = H.getOptions(),
                opposite,

                // Always disable startOnTick:true on the main axis when the navigator
                // is enabled (#1090)
                navigatorEnabled = pick(
                    options.navigator && options.navigator.enabled,
                    defaultOptions.navigator.enabled,
                    true
                ),
                disableStartOnTick = navigatorEnabled ? {
                    startOnTick: false,
                    endOnTick: false
                } : null;

            // apply X axis options to both single and multi y axes
            options.xAxis = splat(options.xAxis || {}).map(function (xAxisOptions, i) {
                return merge(
                    { // defaults
                        minPadding: 0,
                        maxPadding: 0,
                        overscroll: 0,
                        ordinal: true,
                        title: {
                            text: null
                        },
                        labels: {
                            overflow: 'justify'
                        },
                        showLastLabel: true
                    },
                    defaultOptions.xAxis, // #3802
                    defaultOptions.xAxis && defaultOptions.xAxis[i], // #7690
                    xAxisOptions, // user options
                    { // forced options
                        type: 'datetime',
                        categories: null
                    },
                    disableStartOnTick
                );
            });

            // apply Y axis options to both single and multi y axes
            options.yAxis = splat(options.yAxis || {}).map(function (yAxisOptions, i) {
                opposite = pick(yAxisOptions.opposite, true);
                return merge(
                    { // defaults
                        labels: {
                            y: -2
                        },
                        opposite: opposite,

                        /**
                         * @default {highcharts} true
                         * @default {highstock} false
                         * @apioption yAxis.showLastLabel
                         *
                         * @private
                         */
                        showLastLabel: !!(
                            // #6104, show last label by default for category axes
                            yAxisOptions.categories ||
                            yAxisOptions.type === 'category'
                        ),

                        title: {
                            text: null
                        }
                    },
                    defaultOptions.yAxis, // #3802
                    defaultOptions.yAxis && defaultOptions.yAxis[i], // #7690
                    yAxisOptions // user options
                );
            });

            options.series = null;

            options = merge(
                {
                    chart: {
                        panning: true,
                        pinchType: 'x'
                    },
                    navigator: {
                        enabled: navigatorEnabled
                    },
                    scrollbar: {
                        // #4988 - check if setOptions was called
                        enabled: pick(defaultOptions.scrollbar.enabled, true)
                    },
                    rangeSelector: {
                        // #4988 - check if setOptions was called
                        enabled: pick(defaultOptions.rangeSelector.enabled, true)
                    },
                    title: {
                        text: null
                    },
                    tooltip: {
                        split: pick(defaultOptions.tooltip.split, true),
                        crosshairs: true
                    },
                    legend: {
                        enabled: false
                    }

                },

                options, // user's options

                { // forced options
                    isStock: true // internal flag
                }
            );

            options.series = userOptions.series = seriesOptions;

            return hasRenderToArg ?
                new Chart(a, options, c) :
                new Chart(options, b);
        };

        // Handle som Stock-specific series defaults, override the plotOptions before
        // series options are handled.
        addEvent(Series, 'setOptions', function (e) {
            var series = this,
                overrides;

            function is(type) {
                return H.seriesTypes[type] && series instanceof H.seriesTypes[type];
            }
            if (this.chart.options.isStock) {

                if (is('column') || is('columnrange')) {
                    overrides = {
                        borderWidth: 0,
                        shadow: false
                    };

                } else if (is('line') && !is('scatter') && !is('sma')) {
                    overrides = {
                        marker: {
                            enabled: false,
                            radius: 2
                        }
                    };
                }
                if (overrides) {
                    e.plotOptions[this.type] = merge(
                        e.plotOptions[this.type],
                        overrides
                    );
                }
            }
        });

        // Override the automatic label alignment so that the first Y axis' labels
        // are drawn on top of the grid line, and subsequent axes are drawn outside
        addEvent(Axis, 'autoLabelAlign', function (e) {
            var chart = this.chart,
                options = this.options,
                panes = chart._labelPanes = chart._labelPanes || {},
                key,
                labelOptions = this.options.labels;

            if (this.chart.options.isStock && this.coll === 'yAxis') {
                key = options.top + ',' + options.height;
                // do it only for the first Y axis of each pane
                if (!panes[key] && labelOptions.enabled) {
                    if (labelOptions.x === 15) { // default
                        labelOptions.x = 0;
                    }
                    if (labelOptions.align === undefined) {
                        labelOptions.align = 'right';
                    }
                    panes[key] = this;
                    e.align = 'right';

                    e.preventDefault();
                }
            }
        });

        // Clear axis from label panes (#6071)
        addEvent(Axis, 'destroy', function () {
            var chart = this.chart,
                key = this.options && (this.options.top + ',' + this.options.height);

            if (key && chart._labelPanes && chart._labelPanes[key] === this) {
                delete chart._labelPanes[key];
            }
        });

        // Override getPlotLinePath to allow for multipane charts
        addEvent(Axis, 'getPlotLinePath', function (e) {
            var axis = this,
                series = (
                    this.isLinked && !this.series ?
                        this.linkedParent.series :
                        this.series
                ),
                chart = axis.chart,
                renderer = chart.renderer,
                axisLeft = axis.left,
                axisTop = axis.top,
                x1,
                y1,
                x2,
                y2,
                result = [],
                axes = [], // #3416 need a default array
                axes2,
                uniqueAxes,
                translatedValue = e.translatedValue,
                value = e.value,
                force = e.force,
                transVal;

            // Return the other axis based on either the axis option or on related
            // series.
            function getAxis(coll) {
                var otherColl = coll === 'xAxis' ? 'yAxis' : 'xAxis',
                    opt = axis.options[otherColl];

                // Other axis indexed by number
                if (isNumber(opt)) {
                    return [chart[otherColl][opt]];
                }

                // Other axis indexed by id (like navigator)
                if (isString(opt)) {
                    return [chart.get(opt)];
                }

                // Auto detect based on existing series
                return series.map(function (s) {
                    return s[otherColl];
                });
            }

            if (
                // For stock chart, by default render paths across the panes
                // except the case when `acrossPanes` is disabled by user (#6644)
                (chart.options.isStock && e.acrossPanes !== false) &&
                // Ignore in case of colorAxis or zAxis. #3360, #3524, #6720
                axis.coll === 'xAxis' || axis.coll === 'yAxis'
            ) {

                e.preventDefault();

                // Get the related axes based on series
                axes = getAxis(axis.coll);

                // Get the related axes based options.*Axis setting #2810
                axes2 = (axis.isXAxis ? chart.yAxis : chart.xAxis);
                axes2.forEach(function (A) {
                    if (
                        defined(A.options.id) ?
                            A.options.id.indexOf('navigator') === -1 :
                            true
                    ) {
                        var a = (A.isXAxis ? 'yAxis' : 'xAxis'),
                            rax = (
                                defined(A.options[a]) ?
                                    chart[a][A.options[a]] :
                                    chart[a][0]
                            );

                        if (axis === rax) {
                            axes.push(A);
                        }
                    }
                });


                // Remove duplicates in the axes array. If there are no axes in the axes
                // array, we are adding an axis without data, so we need to populate
                // this with grid lines (#2796).
                uniqueAxes = axes.length ?
                    [] :
                    [axis.isXAxis ? chart.yAxis[0] : chart.xAxis[0]]; // #3742
                axes.forEach(function (axis2) {
                    if (
                        uniqueAxes.indexOf(axis2) === -1 &&
                        // Do not draw on axis which overlap completely. #5424
                        !H.find(uniqueAxes, function (unique) {
                            return unique.pos === axis2.pos && unique.len === axis2.len;
                        })
                    ) {
                        uniqueAxes.push(axis2);
                    }
                });

                transVal = pick(
                    translatedValue,
                    axis.translate(value, null, null, e.old)
                );
                if (isNumber(transVal)) {
                    if (axis.horiz) {
                        uniqueAxes.forEach(function (axis2) {
                            var skip;

                            y1 = axis2.pos;
                            y2 = y1 + axis2.len;
                            x1 = x2 = Math.round(transVal + axis.transB);

                            // outside plot area
                            if (
                                force !== 'pass' &&
                                (x1 < axisLeft || x1 > axisLeft + axis.width)
                            ) {
                                if (force) {
                                    x1 = x2 = Math.min(
                                        Math.max(axisLeft, x1),
                                        axisLeft + axis.width
                                    );
                                } else {
                                    skip = true;
                                }
                            }
                            if (!skip) {
                                result.push('M', x1, y1, 'L', x2, y2);
                            }
                        });
                    } else {
                        uniqueAxes.forEach(function (axis2) {
                            var skip;

                            x1 = axis2.pos;
                            x2 = x1 + axis2.len;
                            y1 = y2 = Math.round(axisTop + axis.height - transVal);

                            // outside plot area
                            if (
                                force !== 'pass' &&
                                (y1 < axisTop || y1 > axisTop + axis.height)
                            ) {
                                if (force) {
                                    y1 = y2 = Math.min(
                                        Math.max(axisTop, y1),
                                        axis.top + axis.height
                                    );
                                } else {
                                    skip = true;
                                }
                            }
                            if (!skip) {
                                result.push('M', x1, y1, 'L', x2, y2);
                            }
                        });
                    }
                }
                e.path = result.length > 0 ?
                    renderer.crispPolyLine(result, e.lineWidth || 1) :
                    // #3557 getPlotLinePath in regular Highcharts also returns null
                    null;
            }
        });

        /**
         * Function to crisp a line with multiple segments
         *
         * @private
         * @function Highcharts.SVGRenderer#crispPolyLine
         *
         * @param {Array<number>} points
         *
         * @param {number} width
         *
         * @return {Array<number>}
         */
        SVGRenderer.prototype.crispPolyLine = function (points, width) {
            // points format: ['M', 0, 0, 'L', 100, 0]
            // normalize to a crisp line
            var i;

            for (i = 0; i < points.length; i = i + 6) {
                if (points[i + 1] === points[i + 4]) {
                    // Substract due to #1129. Now bottom and left axis gridlines behave
                    // the same.
                    points[i + 1] = points[i + 4] =
                        Math.round(points[i + 1]) - (width % 2 / 2);
                }
                if (points[i + 2] === points[i + 5]) {
                    points[i + 2] = points[i + 5] =
                        Math.round(points[i + 2]) + (width % 2 / 2);
                }
            }
            return points;
        };
        if (Renderer === VMLRenderer) {
            VMLRenderer.prototype.crispPolyLine = SVGRenderer.prototype.crispPolyLine;
        }

        // Wrapper to hide the label
        addEvent(Axis, 'afterHideCrosshair', function () {
            if (this.crossLabel) {
                this.crossLabel = this.crossLabel.hide();
            }
        });

        // Extend crosshairs to also draw the label
        addEvent(Axis, 'afterDrawCrosshair', function (event) {

            // Check if the label has to be drawn
            if (
                !defined(this.crosshair.label) ||
                !this.crosshair.label.enabled ||
                !this.cross
            ) {
                return;
            }

            var chart = this.chart,
                options = this.options.crosshair.label, // the label's options
                horiz = this.horiz, // axis orientation
                opposite = this.opposite, // axis position
                left = this.left, // left position
                top = this.top, // top position
                crossLabel = this.crossLabel, // the svgElement
                posx,
                posy,
                crossBox,
                formatOption = options.format,
                formatFormat = '',
                limit,
                align,
                tickInside = this.options.tickPosition === 'inside',
                snap = this.crosshair.snap !== false,
                value,
                offset = 0,
                // Use last available event (#5287)
                e = event.e || (this.cross && this.cross.e),
                point = event.point,
                lin2log = this.lin2log,
                min,
                max;

            if (this.isLog) {
                min = lin2log(this.min);
                max = lin2log(this.max);
            } else {
                min = this.min;
                max = this.max;
            }

            align = (horiz ? 'center' : opposite ?
                (this.labelAlign === 'right' ? 'right' : 'left') :
                (this.labelAlign === 'left' ? 'left' : 'center'));

            // If the label does not exist yet, create it.
            if (!crossLabel) {
                crossLabel = this.crossLabel = chart.renderer
                    .label(
                        null,
                        null,
                        null,
                        options.shape || 'callout'
                    )
                    .addClass(
                        'highcharts-crosshair-label' + (
                            this.series[0] &&
                            ' highcharts-color-' + this.series[0].colorIndex
                        )
                    )
                    .attr({
                        align: options.align || align,
                        padding: pick(options.padding, 8),
                        r: pick(options.borderRadius, 3),
                        zIndex: 2
                    })
                    .add(this.labelGroup);

                // Presentational
                if (!chart.styledMode) {
                    crossLabel
                        .attr({
                            fill: options.backgroundColor ||
                                (this.series[0] && this.series[0].color) ||
                                '#666666',
                            stroke: options.borderColor || '',
                            'stroke-width': options.borderWidth || 0
                        })
                        .css(extend({
                            color: '#ffffff',
                            fontWeight: 'normal',
                            fontSize: '11px',
                            textAlign: 'center'
                        }, options.style));
                }
            }

            if (horiz) {
                posx = snap ? point.plotX + left : e.chartX;
                posy = top + (opposite ? 0 : this.height);
            } else {
                posx = opposite ? this.width + left : 0;
                posy = snap ? point.plotY + top : e.chartY;
            }

            if (!formatOption && !options.formatter) {
                if (this.isDatetimeAxis) {
                    formatFormat = '%b %d, %Y';
                }
                formatOption =
                    '{value' + (formatFormat ? ':' + formatFormat : '') + '}';
            }

            // Show the label
            value = snap ?
                point[this.isXAxis ? 'x' : 'y'] :
                this.toValue(horiz ? e.chartX : e.chartY);

            crossLabel.attr({
                text: formatOption ?
                    format(formatOption, { value: value }, chart.time) :
                    options.formatter.call(this, value),
                x: posx,
                y: posy,
                // Crosshair should be rendered within Axis range (#7219)
                visibility: value < min || value > max ? 'hidden' : 'visible'
            });

            crossBox = crossLabel.getBBox();

            // now it is placed we can correct its position
            if (horiz) {
                if ((tickInside && !opposite) || (!tickInside && opposite)) {
                    posy = crossLabel.y - crossBox.height;
                }
            } else {
                posy = crossLabel.y - (crossBox.height / 2);
            }

            // check the edges
            if (horiz) {
                limit = {
                    left: left - crossBox.x,
                    right: left + this.width - crossBox.x
                };
            } else {
                limit = {
                    left: this.labelAlign === 'left' ? left : 0,
                    right: this.labelAlign === 'right' ?
                        left + this.width :
                        chart.chartWidth
                };
            }

            // left edge
            if (crossLabel.translateX < limit.left) {
                offset = limit.left - crossLabel.translateX;
            }
            // right edge
            if (crossLabel.translateX + crossBox.width >= limit.right) {
                offset = -(crossLabel.translateX + crossBox.width - limit.right);
            }

            // show the crosslabel
            crossLabel.attr({
                x: posx + offset,
                y: posy,
                // First set x and y, then anchorX and anchorY, when box is actually
                // calculated, #5702
                anchorX: horiz ?
                    posx :
                    (this.opposite ? 0 : chart.chartWidth),
                anchorY: horiz ?
                    (this.opposite ? chart.chartHeight : 0) :
                    posy + crossBox.height / 2
            });
        });

        /* ************************************************************************** *
         *  Start value compare logic                                                 *
         * ************************************************************************** */

        /**
         * Extend series.init by adding a method to modify the y value used for plotting
         * on the y axis. This method is called both from the axis when finding dataMin
         * and dataMax, and from the series.translate method.
         *
         * @ignore
         * @function Highcharts.Series#init
         */
        seriesProto.init = function () {

            // Call base method
            seriesInit.apply(this, arguments);

            // Set comparison mode
            this.setCompare(this.options.compare);
        };

        /**
         * Highstock only. Set the
         * [compare](https://api.highcharts.com/highstock/plotOptions.series.compare)
         * mode of the series after render time. In most cases it is more useful running
         * {@link Axis#setCompare} on the X axis to update all its series.
         *
         * @function Highcharts.Series#setCompare
         *
         * @param {string} compare
         *        Can be one of `null`, `"percent"` or `"value"`.
         */
        seriesProto.setCompare = function (compare) {

            // Set or unset the modifyValue method
            this.modifyValue = (compare === 'value' || compare === 'percent') ?
                function (value, point) {
                    var compareValue = this.compareValue;

                    if (
                        value !== undefined &&
                        compareValue !== undefined
                    ) { // #2601, #5814

                        // Get the modified value
                        if (compare === 'value') {
                            value -= compareValue;

                        // Compare percent
                        } else {
                            value = 100 * (value / compareValue) -
                                (this.options.compareBase === 100 ? 0 : 100);
                        }

                        // record for tooltip etc.
                        if (point) {
                            point.change = value;
                        }

                        return value;
                    }
                } :
                null;

            // Survive to export, #5485
            this.userOptions.compare = compare;

            // Mark dirty
            if (this.chart.hasRendered) {
                this.isDirty = true;
            }

        };

        /**
         * Extend series.processData by finding the first y value in the plot area,
         * used for comparing the following values
         *
         * @ignore
         * @function Highcharts.Series#processData
         */
        seriesProto.processData = function () {
            var series = this,
                i,
                keyIndex = -1,
                processedXData,
                processedYData,
                compareStart = series.options.compareStart === true ? 0 : 1,
                length,
                compareValue;

            // call base method
            seriesProcessData.apply(this, arguments);

            if (series.xAxis && series.processedYData) { // not pies

                // local variables
                processedXData = series.processedXData;
                processedYData = series.processedYData;
                length = processedYData.length;

                // For series with more than one value (range, OHLC etc), compare
                // against close or the pointValKey (#4922, #3112, #9854)
                if (series.pointArrayMap) {
                    keyIndex = series.pointArrayMap.indexOf(
                        series.options.pointValKey || series.pointValKey || 'y'
                    );
                }

                // find the first value for comparison
                for (i = 0; i < length - compareStart; i++) {
                    compareValue = processedYData[i] && keyIndex > -1 ?
                        processedYData[i][keyIndex] :
                        processedYData[i];
                    if (
                        isNumber(compareValue) &&
                        processedXData[i + compareStart] >= series.xAxis.min &&
                        compareValue !== 0
                    ) {
                        series.compareValue = compareValue;
                        break;
                    }
                }
            }
        };

        // Modify series extremes
        addEvent(Series, 'afterGetExtremes', function () {
            if (this.modifyValue) {
                var extremes = [
                    this.modifyValue(this.dataMin),
                    this.modifyValue(this.dataMax)
                ];

                this.dataMin = arrayMin(extremes);
                this.dataMax = arrayMax(extremes);
            }
        });

        /**
         * Highstock only. Set the compare mode on all series belonging to an Y axis
         * after render time.
         *
         * @see [series.plotOptions.compare](https://api.highcharts.com/highstock/series.plotOptions.compare)
         *
         * @sample stock/members/axis-setcompare/
         *         Set compoare
         *
         * @function Highcharts.Axis#setCompare
         *
         * @param {string} compare
         *        The compare mode. Can be one of `null`, `"value"` or `"percent"`.
         *
         * @param {boolean} [redraw=true]
         *        Whether to redraw the chart or to wait for a later call to
         *        {@link Chart#redraw}.
         */
        Axis.prototype.setCompare = function (compare, redraw) {
            if (!this.isXAxis) {
                this.series.forEach(function (series) {
                    series.setCompare(compare);
                });
                if (pick(redraw, true)) {
                    this.chart.redraw();
                }
            }
        };

        /**
         * Extend the tooltip formatter by adding support for the point.change variable
         * as well as the changeDecimals option.
         *
         * @ignore
         * @function Highcharts.Point#tooltipFormatter
         *
         * @param {string} pointFormat
         */
        Point.prototype.tooltipFormatter = function (pointFormat) {
            var point = this;

            pointFormat = pointFormat.replace(
                '{point.change}',
                (point.change > 0 ? '+' : '') + H.numberFormat(
                    point.change,
                    pick(point.series.tooltipOptions.changeDecimals, 2)
                )
            );

            return pointTooltipFormatter.apply(this, [pointFormat]);
        };

        /* ************************************************************************** *
         *  End value compare logic                                                   *
         * ************************************************************************** */


        // Extend the Series prototype to create a separate series clip box. This is
        // related to using multiple panes, and a future pane logic should incorporate
        // this feature (#2754).
        addEvent(Series, 'render', function () {
            var clipHeight;

            // Only do this on not 3d (#2939, #5904) nor polar (#6057) charts, and only
            // if the series type handles clipping in the animate method (#2975).
            if (
                !(this.chart.is3d && this.chart.is3d()) &&
                !this.chart.polar &&
                this.xAxis &&
                !this.xAxis.isRadial // Gauge, #6192
            ) {
                // Include xAxis line width, #8031
                clipHeight = this.yAxis.len - (this.xAxis.axisLine ?
                    Math.floor(this.xAxis.axisLine.strokeWidth() / 2) :
                    0);

                // First render, initial clip box
                if (!this.clipBox && this.animate) {
                    this.clipBox = merge(this.chart.clipBox);
                    this.clipBox.width = this.xAxis.len;
                    this.clipBox.height = clipHeight;

                // On redrawing, resizing etc, update the clip rectangle
                } else if (this.chart[this.sharedClipKey]) {
                    // animate in case resize is done during initial animation
                    this.chart[this.sharedClipKey].animate({
                        width: this.xAxis.len,
                        height: clipHeight
                    });

                    // also change markers clip animation for consistency
                    // (marker clip rects should exist only on chart init)
                    if (
                        this.chart[this.sharedClipKey + 'm']
                    ) {
                        this.chart[this.sharedClipKey + 'm'].animate({
                            width: this.xAxis.len
                        });
                    }
                }
            }
        });

        addEvent(Chart, 'update', function (e) {
            var options = e.options;

            // Use case: enabling scrollbar from a disabled state.
            // Scrollbar needs to be initialized from a controller, Navigator in this
            // case (#6615)
            if ('scrollbar' in options && this.navigator) {
                merge(true, this.options.scrollbar, options.scrollbar);
                this.navigator.update({}, false);
                delete options.scrollbar;
            }
        });

    });
    _registerModule(_modules, 'masters/modules/stock.src.js', [], function () {


    });
}));