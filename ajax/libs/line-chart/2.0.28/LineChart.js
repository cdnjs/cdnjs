var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var n3Charts;
(function (n3Charts) {
    var svg;
    (function (svg) {
        'use strict';
        function twoSpeedAxis() {
            var d3_arraySlice = [].slice;
            var d3_array = function (list) { return d3_arraySlice.call(list); };
            var d3_svg_axisDefaultOrient = 'bottom', d3_svg_axisOrients = { top: 1, right: 1, bottom: 1, left: 1 };
            function d3_svg_axisX(selection, x0, x1) {
                selection.attr('transform', function (d) {
                    var v0 = x0(d.value);
                    return 'translate(' + (isFinite(v0) ? v0 : x1(d.value)) + ',0)';
                });
            }
            function d3_svg_axisY(selection, y0, y1) {
                selection.attr('transform', function (d) {
                    var v0 = y0(d.value);
                    return 'translate(0,' + (isFinite(v0) ? v0 : y1(d.value)) + ')';
                });
            }
            function d3_scaleExtent(domain) {
                var start = domain[0], stop = domain[domain.length - 1];
                return start < stop ? [start, stop] : [stop, start];
            }
            function d3_scaleRange(scale) {
                return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
            }
            var scale = d3.scale.linear(), orient = d3_svg_axisDefaultOrient, outerTickSize = 6, innerTickSize = 24, tickPadding = -6, minorInnerTickSize = 0, minorTickPadding = 5, ticks = null, tickValues = null, tickFormat_;
            var tickGenerator = function (ticks, selector, scale0, scale1, g) {
                var isMajor = selector === 'major';
                var tickSize = isMajor ? innerTickSize : minorInnerTickSize;
                var padding = isMajor ? tickPadding : minorTickPadding;
                var tick = g.selectAll('.tick.' + selector).data(ticks, function (d) { return scale1(d.value); });
                var tickEnter = tick.enter().insert('g', '.domain').attr('class', 'tick ' + selector).style('opacity', 1e-6);
                // d3.transition interface isn't suppose to take any arguments
                // WELL GOOD THING THERE'S A D.TS FILE
                var tickExit = d3.transition(tick.exit()).style('opacity', 1e-6).remove();
                var tickUpdate = d3.transition(tick.order()).style('opacity', 1);
                var tickSpacing = Math.max(tickSize, 0) + padding;
                var tickTransform;
                // Domain.
                var range = d3_scaleRange(scale1);
                var path = g.selectAll('.domain').data([0]);
                var pathUpdate = (path.enter().append('path').attr('class', 'domain'), path.transition());
                tickEnter.append('line');
                tickEnter.append('text');
                var lineEnter = tickEnter.select('line');
                var lineUpdate = tickUpdate.select('line');
                var text = tick.select('text').text(function (d, i) { return tickFormat_ ? tickFormat_(d, i) : d.label; });
                var textEnter = tickEnter.select('text');
                var textUpdate = tickUpdate.select('text');
                var sign = orient === 'top' || orient === 'left' ? -1 : 1;
                var x1, x2, y1, y2;
                if (orient === 'bottom' || orient === 'top') {
                    tickTransform = d3_svg_axisX, x1 = 'x', y1 = 'y', x2 = 'x2', y2 = 'y2';
                    text.attr({
                        'dy': sign < 0 ? '0em' : '.8em',
                        'dx': '5px'
                    }).style('text-anchor', 'left');
                    pathUpdate.attr('d', 'M' + range[0] + ',' + sign * outerTickSize + 'V0H' + range[1] + 'V' + sign * outerTickSize);
                }
                else {
                    tickTransform = d3_svg_axisY, x1 = 'y', y1 = 'x', x2 = 'y2', y2 = 'x2';
                    text.attr({
                        'dy': '.32em',
                        'dx': sign < 0 ? -tickSpacing + 'px' : tickSpacing + 'px'
                    }).style('text-anchor', sign < 0 ? 'end' : 'start');
                    pathUpdate.attr('d', 'M' + sign * outerTickSize + ',' + range[0] + 'H0V' + range[1] + 'H' + sign * outerTickSize);
                }
                lineEnter.attr(y2, sign * tickSize);
                textEnter.attr(y1, sign * tickSpacing);
                lineUpdate.attr(x2, 0).attr(y2, sign * tickSize);
                textUpdate.attr(x1, 0).attr(y1, sign * tickSpacing);
                tickExit.call(tickTransform, scale1, scale0);
                tickEnter.call(tickTransform, scale0, scale1);
                tickUpdate.call(tickTransform, scale1, scale1);
            };
            var axis = function (g) {
                g.each(function () {
                    var g = d3.select(this);
                    // Stash a snapshot of the new scale, and retrieve the old snapshot.
                    var scale0 = this.__chart__ || scale;
                    var scale1 = this.__chart__ = scale.copy();
                    // Ticks, or domain values for ordinal scales.
                    var _a = ticks(scale1.domain()), major = _a.major, minor = _a.minor;
                    tickGenerator(major, 'major', scale0, scale1, g);
                    tickGenerator(minor, 'minor', scale0, scale1, g);
                });
            };
            axis.scale = function (x) {
                if (!arguments.length) {
                    return scale;
                }
                scale = x;
                return axis;
            };
            axis.orient = function (x) {
                if (!arguments.length) {
                    return orient;
                }
                orient = x in d3_svg_axisOrients ? x + '' : d3_svg_axisDefaultOrient;
                return axis;
            };
            axis.ticks = function (x) {
                if (!arguments.length) {
                    return ticks;
                }
                ticks = x;
                return axis;
            };
            axis.tickValues = function (x) {
                if (!arguments.length) {
                    return tickValues;
                }
                tickValues = x;
                return axis;
            };
            axis.tickFormat = function (x) {
                if (!arguments.length) {
                    return tickFormat_;
                }
                tickFormat_ = x;
                return axis;
            };
            axis.tickSize = function (x) {
                var n = arguments.length;
                if (!n) {
                    return innerTickSize;
                }
                innerTickSize = +x;
                outerTickSize = +arguments[n - 1];
                minorInnerTickSize = +x;
                return axis;
            };
            axis.innerTickSize = function (x) {
                if (!arguments.length) {
                    return innerTickSize;
                }
                innerTickSize = +x;
                return axis;
            };
            axis.outerTickSize = function (x) {
                if (!arguments.length) {
                    return outerTickSize;
                }
                outerTickSize = +x;
                return axis;
            };
            axis.tickPadding = function (x) {
                if (!arguments.length) {
                    return tickPadding;
                }
                tickPadding = +x;
                return axis;
            };
            return axis;
        }
        svg.twoSpeedAxis = twoSpeedAxis;
        ;
    })(svg = n3Charts.svg || (n3Charts.svg = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='TwoSpeedAxis.ts' />
var n3Charts;
(function (n3Charts) {
    var Options;
    (function (Options) {
        'use strict';
        var SymbolOptions = (function () {
            function SymbolOptions(js) {
                if (js === void 0) { js = {}; }
                this.parse(js);
            }
            SymbolOptions.prototype.parse = function (js) {
                if (!SymbolOptions.isValidType(js.type)) {
                    throw new Error("Unknown type for symbol: " + js.type);
                }
                this.type = Options.Options.getString(js.type);
                this.value = Options.Options.getNumber(js.value, 0);
                this.color = Options.Options.getString(js.color, 'lightgrey');
                this.axis = Options.Options.getString(js.axis, 'y');
                this.id = Options.Options.getString(js.id, n3Charts.Utils.UUID.generate());
            };
            SymbolOptions.isValidType = function (type) {
                return d3.values(SymbolOptions.TYPE).indexOf(type) !== -1;
            };
            SymbolOptions.TYPE = {
                HLINE: 'hline',
                VLINE: 'vline'
            };
            return SymbolOptions;
        }());
        Options.SymbolOptions = SymbolOptions;
    })(Options = n3Charts.Options || (n3Charts.Options = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Options;
    (function (Options) {
        'use strict';
        var SeriesOptions = (function () {
            function SeriesOptions(js) {
                if (js === void 0) { js = {}; }
                this.axis = 'y';
                this.type = ['line'];
                this.visible = true;
                this.defined = function (v) { return true; };
                var options = this.sanitizeOptions(js);
                this.id = options.id || n3Charts.Utils.UUID.generate();
                this.axis = options.axis;
                this.interpolation = options.interpolation;
                this.dataset = options.dataset;
                this.key = options.key;
                this.color = options.color;
                this.visible = options.visible;
                this.label = options.label || options.id;
                if (options.defined) {
                    this.defined = options.defined;
                }
                if (options.type.length > 0) {
                    this.type = this.sanitizeType(options.type);
                }
            }
            /**
             * Make sure that the options have proper types,
             * and convert raw js to typed variables
             */
            SeriesOptions.prototype.sanitizeOptions = function (js) {
                var options = n3Charts.Utils.ObjectUtils.extend(this, js);
                options.axis = this.sanitizeAxis(options.axis);
                options.interpolation = this.sanitizeInterpolation(options.interpolation);
                options.id = Options.Options.getString(options.id);
                options.type = Options.Options.getArray(options.type);
                options.dataset = Options.Options.getString(options.dataset);
                options.key = this.sanitizeKeys(options.key);
                options.color = Options.Options.getString(options.color);
                options.label = Options.Options.getString(options.label);
                options.visible = Options.Options.getBoolean(options.visible);
                options.defined = Options.Options.getFunction(options.defined);
                return options;
            };
            SeriesOptions.prototype.sanitizeInterpolation = function (js) {
                if (!js) {
                    return { mode: 'linear', tension: 0.7 };
                }
                return {
                    mode: Options.Options.getString(js.mode, 'linear'),
                    tension: Options.Options.getNumber(js.tension, 0.7)
                };
            };
            SeriesOptions.prototype.sanitizeKeys = function (js) {
                if (!js) {
                    return { y1: undefined };
                }
                if (typeof js === 'string') {
                    return { y1: Options.Options.getString(js) };
                }
                return {
                    y0: Options.Options.getString(js.y0),
                    y1: Options.Options.getString(js.y1)
                };
            };
            /**
             * Return the toggeled visibility without modifying
             * the visibility property itself
             */
            SeriesOptions.prototype.getToggledVisibility = function () {
                return !this.visible;
            };
            /**
             * Return an array of valid types
             */
            SeriesOptions.prototype.sanitizeType = function (types) {
                return types.filter(function (type) {
                    if (!SeriesOptions.isValidType(type)) {
                        console.warn('Unknow series type : ' + type);
                        return false;
                    }
                    return true;
                });
            };
            /**
             * Return a valid axis key
             */
            SeriesOptions.prototype.sanitizeAxis = function (axis) {
                if (['y', 'y2'].indexOf(axis) === -1) {
                    throw TypeError(axis + ' is not a valid series option for axis.');
                }
                return axis;
            };
            /**
             * Returns true if the series has a type column.
             * Series of type column need special treatment,
             * because x values are usually offset
             */
            SeriesOptions.prototype.isAColumn = function () {
                return this.hasType(SeriesOptions.TYPE.COLUMN);
            };
            SeriesOptions.prototype.isDashed = function () {
                return this.type.indexOf(SeriesOptions.TYPE.DASHED_LINE) !== -1;
            };
            /**
             * Returns true if the series has a type *type*,
             * where type should be a value of SeriesOptions.TYPE
             */
            SeriesOptions.prototype.hasType = function (type) {
                if (type === SeriesOptions.TYPE.LINE) {
                    return (this.type.indexOf(type) !== -1 || this.type.indexOf(SeriesOptions.TYPE.DASHED_LINE) !== -1);
                }
                return this.type.indexOf(type) !== -1;
            };
            SeriesOptions.prototype.hasTwoKeys = function () {
                return this.key.y0 !== undefined;
            };
            /**
             * Returns true if the type *type* is a valid type
             */
            SeriesOptions.isValidType = function (type) {
                return d3.values(SeriesOptions.TYPE).indexOf(type) !== -1;
            };
            SeriesOptions.TYPE = {
                DOT: 'dot',
                LINE: 'line',
                DASHED_LINE: 'dashed-line',
                AREA: 'area',
                COLUMN: 'column'
            };
            return SeriesOptions;
        }());
        Options.SeriesOptions = SeriesOptions;
    })(Options = n3Charts.Options || (n3Charts.Options = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Options;
    (function (Options) {
        'use strict';
        var AxisOptions = (function () {
            function AxisOptions(js) {
                if (js === void 0) { js = {}; }
                this.includeZero = false;
                this.type = 'linear';
                this.key = 'x';
                this.padding = { min: 0, max: 0 };
                this.ticksShift = {
                    x: 0,
                    y: 0
                };
                this.parse(js);
            }
            AxisOptions.prototype.parse = function (js) {
                this.type = Options.Options.getString(js.type, 'linear');
                this.key = js.key;
                this.padding = Options.Options.getObject(js.padding || {}, this.padding);
                this.includeZero = Options.Options.getBoolean(js.includeZero, false);
                this.tickFormat = Options.Options.getFunction(js.tickFormat);
                this.ticks = js.ticks;
                if (js.ticksShift) {
                    this.ticksShift = {
                        x: Options.Options.getNumber(js.ticksShift.x, 0),
                        y: Options.Options.getNumber(js.ticksShift.y, 0)
                    };
                }
                if (this.type === AxisOptions.TYPE.LINEAR) {
                    this.min = Options.Options.getNumber(js.min, undefined);
                    this.max = Options.Options.getNumber(js.max, undefined);
                }
                else if (this.type === AxisOptions.TYPE.DATE) {
                    this.min = Options.Options.getDate(js.min, undefined);
                    this.max = Options.Options.getDate(js.max, undefined);
                }
            };
            AxisOptions.isValidSide = function (side) {
                return d3.values(AxisOptions.SIDE).indexOf(side) !== -1;
            };
            AxisOptions.prototype.hasDynamicTicks = function () {
                return this.ticks instanceof Function;
            };
            AxisOptions.prototype.configure = function (axis) {
                axis.tickFormat(this.tickFormat);
                if (this.ticks instanceof Array) {
                    axis.tickValues(this.ticks);
                }
                else if (typeof this.ticks === 'number') {
                    axis.ticks(this.ticks);
                }
                else if (this.ticks instanceof Function) {
                    axis.ticks(this.ticks);
                }
                return axis;
            };
            AxisOptions.SIDE = {
                X: 'x',
                X2: 'x2',
                Y: 'y',
                Y2: 'y2'
            };
            AxisOptions.TYPE = {
                LINEAR: 'linear',
                DATE: 'date',
                LOG: 'log'
            };
            return AxisOptions;
        }());
        Options.AxisOptions = AxisOptions;
    })(Options = n3Charts.Options || (n3Charts.Options = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Options;
    (function (Options) {
        'use strict';
        var Dimensions = (function () {
            function Dimensions() {
                this.width = 600;
                this.height = 200;
                this.innerWidth = 560;
                this.innerHeight = 160;
                this.margin = Dimensions.getDefaultMargins();
            }
            Dimensions.getDefaultMargins = function () {
                return {
                    top: 0,
                    left: 40,
                    bottom: 40,
                    right: 40
                };
            };
            Dimensions.prototype.updateMargins = function (options) {
                var _this = this;
                if (!options || !options.margin) {
                    return;
                }
                var fn = function (prop) { return _this.margin[prop] = Options.Options.getNumber(options.margin[prop], _this.margin[prop]); };
                fn('top');
                fn('bottom');
                fn('left');
                fn('right');
            };
            Dimensions.prototype.getDimensionByProperty = function (element, propertyName) {
                var style = window.getComputedStyle(element, null);
                return +style.getPropertyValue(propertyName).replace(/px$/, '');
            };
            Dimensions.prototype.fromParentElement = function (parent) {
                if (!parent) {
                    return;
                }
                // Oooooh I hate doing this.
                var hPadding = this.getDimensionByProperty(parent, 'padding-left') + this.getDimensionByProperty(parent, 'padding-right');
                var vPadding = this.getDimensionByProperty(parent, 'padding-top') + this.getDimensionByProperty(parent, 'padding-bottom');
                this.width = parent.clientWidth - hPadding;
                this.height = parent.clientHeight - vPadding;
                this.innerHeight = this.height - this.margin.top - this.margin.bottom;
                this.innerWidth = this.width - this.margin.left - this.margin.right;
            };
            return Dimensions;
        }());
        Options.Dimensions = Dimensions;
    })(Options = n3Charts.Options || (n3Charts.Options = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Options;
    (function (Options_1) {
        'use strict';
        ;
        var Options = (function () {
            function Options(js) {
                this.doubleClickEnabled = true;
                this.series = [];
                this.symbols = [];
                this.pan = {
                    x: function () { return undefined; },
                    x2: function () { return undefined; },
                    y: function () { return undefined; },
                    y2: function () { return undefined; }
                };
                this.zoom = {
                    x: false,
                    y: false
                };
                this.axes = {
                    x: {},
                    y: {}
                };
                this.margin = Options_1.Dimensions.getDefaultMargins();
                this.grid = {
                    x: false,
                    y: true
                };
                var options = n3Charts.Utils.ObjectUtils.extend(this, js);
                this.margin = this.sanitizeMargin(Options.getObject(options.margin, this.margin));
                this.series = this.sanitizeSeries(Options.getArray(options.series));
                this.symbols = this.sanitizeSymbols(Options.getArray(options.symbols));
                this.axes = this.sanitizeAxes(Options.getObject(options.axes, this.axes));
                this.grid = this.sanitizeTwoAxesOptions(options.grid, this.grid);
                this.pan = this.sanitizePanOptions(options.pan, this.pan);
                this.zoom = this.sanitizeTwoAxesOptions(options.zoom, this.zoom);
                this.tooltipHook = Options.getFunction(options.tooltipHook);
                this.doubleClickEnabled = Options.getBoolean(options.doubleClickEnabled, false);
            }
            Options.prototype.sanitizeMargin = function (margin) {
                return {
                    top: Options.getNumber(margin.top, 0),
                    left: Options.getNumber(margin.left, 0),
                    bottom: Options.getNumber(margin.bottom, 0),
                    right: Options.getNumber(margin.right, 0)
                };
            };
            Options.prototype.sanitizeSeries = function (series) {
                return (series).map(function (s) { return new Options_1.SeriesOptions(s); });
            };
            Options.prototype.sanitizeSymbols = function (symbols) {
                return (symbols).map(function (s) { return new Options_1.SymbolOptions(s); });
            };
            Options.prototype.sanitizeTwoAxesOptions = function (object, def) {
                return {
                    x: Options.getBoolean(object.x, def.x),
                    y: Options.getBoolean(object.y, def.y)
                };
            };
            Options.prototype.sanitizePanOptions = function (object, def) {
                return {
                    x: this.sanitizePanOption(object.x),
                    x2: this.sanitizePanOption(object.x2),
                    y: this.sanitizePanOption(object.y),
                    y2: this.sanitizePanOption(object.y2)
                };
            };
            Options.prototype.sanitizePanOption = function (option) {
                if (option === undefined) {
                    return function (domain) { return undefined; };
                }
                else if (n3Charts.Utils.ObjectUtils.isBoolean(option)) {
                    if (option) {
                        return function (domain) { return domain; };
                    }
                    else {
                        return function (domain) { return undefined; };
                    }
                }
                else if (n3Charts.Utils.ObjectUtils.isFunction(option)) {
                    return option;
                }
                else {
                    throw new Error('Pan option should either be a Boolean or a function. Please RTFM.');
                }
            };
            Options.prototype.sanitizeAxes = function (axes) {
                // Map object keys and return a new object
                return Object.keys(axes).reduce(function (prev, key) {
                    prev[key] = new Options_1.AxisOptions(axes[key]);
                    return prev;
                }, {});
            };
            Options.prototype.getAbsKey = function () {
                if (!this.axes[Options_1.AxisOptions.SIDE.X]) {
                    throw new TypeError('Cannot find abs key : ' + Options_1.AxisOptions.SIDE.X);
                }
                return this.axes[Options_1.AxisOptions.SIDE.X].key;
            };
            Options.prototype.getVisibleDatasets = function () {
                var datasets = [];
                this.series.forEach(function (series) {
                    if (series.visible) {
                        if (datasets.indexOf(series.dataset) === -1) {
                            datasets.push(series.dataset);
                        }
                    }
                });
                return datasets;
            };
            Options.prototype.getVisibleSeriesBySide = function (side) {
                return this.series.filter(function (s) { return s.visible && s.axis === side; });
            };
            Options.prototype.getSeriesAndDatasetBySide = function (side) {
                if (!Options_1.AxisOptions.isValidSide(side)) {
                    throw new TypeError('Cannot get axis side : ' + side);
                }
                if (side === Options_1.AxisOptions.SIDE.Y2 && !this.axes[side]) {
                    side = Options_1.AxisOptions.SIDE.Y;
                }
                var datasetsForSide = [];
                var seriesForDataset = {};
                this.series.forEach(function (series) {
                    if (series.visible && series.axis === side) {
                        datasetsForSide.push(series.dataset);
                        if (!seriesForDataset[series.dataset]) {
                            seriesForDataset[series.dataset] = [];
                        }
                        seriesForDataset[series.dataset].push(series);
                    }
                });
                return { seriesForDataset: seriesForDataset, datasetsForSide: datasetsForSide };
            };
            Options.prototype.getByAxisSide = function (side) {
                if (!Options_1.AxisOptions.isValidSide(side)) {
                    throw new TypeError('Cannot get axis side : ' + side);
                }
                if (!this.axes[side]) {
                    if (side === Options_1.AxisOptions.SIDE.Y2) {
                        return this.axes[Options_1.AxisOptions.SIDE.Y];
                    }
                    else if (side === Options_1.AxisOptions.SIDE.X2) {
                        return this.axes[Options_1.AxisOptions.SIDE.X];
                    }
                }
                return this.axes[side];
            };
            Options.prototype.getSeriesByType = function (type) {
                if (!Options_1.SeriesOptions.isValidType(type)) {
                    throw new TypeError('Unknown series type: ' + type);
                }
                return this.series.filter(function (s) { return s.hasType(type); });
            };
            Options.prototype.getSymbolsByType = function (type) {
                if (!Options_1.SymbolOptions.isValidType(type)) {
                    throw new TypeError('Unknown symbols type: ' + type);
                }
                return this.symbols.filter(function (s) { return s.type === type; });
            };
            Options.getBoolean = function (value, defaultValue) {
                if (defaultValue === void 0) { defaultValue = true; }
                if (typeof value === 'boolean') {
                    return value;
                }
                return defaultValue;
            };
            Options.getNumber = function (value, defaultValue) {
                var n = parseFloat(value);
                return !isNaN(n) ? n : defaultValue;
            };
            Options.getDate = function (value, defaultValue) {
                return value instanceof Date ? value : defaultValue;
            };
            Options.getFunction = function (value) {
                return value instanceof Function ? value : undefined;
            };
            Options.getString = function (value, defaultValue) {
                return value ? String(value) : defaultValue;
            };
            Options.getIdentifier = function (value) {
                var s = Options.getString(value);
                return s.replace(/[^a-zA-Z0-9\-_]/ig, '');
            };
            Options.getObject = function (value, defaultValue) {
                if (defaultValue === void 0) { defaultValue = {}; }
                // Type check because *val* is of type any
                if (!n3Charts.Utils.ObjectUtils.isObject(value)) {
                    throw TypeError(value + ' option must be an object.');
                }
                return n3Charts.Utils.ObjectUtils.extend(defaultValue, value);
            };
            Options.getArray = function (value, defaultValue) {
                if (defaultValue === void 0) { defaultValue = []; }
                return defaultValue.concat(value);
            };
            return Options;
        }());
        Options_1.Options = Options;
    })(Options = n3Charts.Options || (n3Charts.Options = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='SymbolOptions.ts' />
/// <reference path='SeriesOptions.ts' />
/// <reference path='AxisOptions.ts' />
/// <reference path='Dimensions.ts' />
/// <reference path='Options.ts' />
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var EventManager = (function () {
            function EventManager() {
                // For testing purposes
                this.strictMode = true;
            }
            EventManager.prototype.init = function (events) {
                var _this = this;
                // Generate a new d3.dispatch event dispatcher
                this._dispatch = d3.dispatch.apply(this, events);
                // Not sure about that... it's supposed to avoid several directives to
                // replace each others' listeners, but is a timestamp really unique ?
                var id = new Date().getTime();
                d3.select(window).on('mouseup.' + id, function () {
                    // (<Event>d3.event).preventDefault();
                    _this.trigger('window-mouseup');
                });
                d3.select(window).on('mousemove.' + id, function () {
                    // (<Event>d3.event).preventDefault();
                    _this.trigger('window-mousemove');
                });
                // Support chaining
                return this;
            };
            EventManager.prototype.update = function (data, options) {
                this.data = data;
                this.options = options;
                return;
            };
            EventManager.prototype.on = function (event, callback) {
                if (this.strictMode && EventManager.EVENTS.indexOf(event.split('.')[0]) === -1) {
                    throw new Error("Unknown event: " + event);
                }
                this._dispatch.on(event, callback);
                return this;
            };
            EventManager.prototype.trigger = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                this._dispatch[event].apply(this, args);
                return this;
            };
            EventManager.prototype.triggerDataAndOptions = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                args.push(this.data);
                args.push(this.options);
                this._dispatch[event].apply(this, args);
                return this;
            };
            EventManager.prototype.datumEnter = function (series, options) {
                var _this = this;
                return function (selection) {
                    return selection.on('mouseenter', function (d, i) {
                        _this.trigger('enter', d, i, series, options);
                    });
                };
            };
            EventManager.prototype.datumOver = function (series, options) {
                var _this = this;
                return function (selection) {
                    return selection.on('mouseover', function (d, i) {
                        _this.trigger('over', d, i, series, options);
                    });
                };
            };
            EventManager.prototype.datumMove = function (series, options) {
                var _this = this;
                return function (selection) {
                    return selection.on('mousemove', function (d, i) {
                        _this.trigger('over', d, i, series, options);
                    });
                };
            };
            EventManager.prototype.datumLeave = function (series, options) {
                var _this = this;
                return function (selection) {
                    return selection.on('mouseleave', function (d, i) {
                        _this.trigger('leave', d, i, series, options);
                    });
                };
            };
            // That would be so cool to have native dblclick support in D3...
            EventManager.prototype.listenForDblClick = function (selection, callback, listenerSuffix) {
                var _this = this;
                var down, tolerance = 5, last, wait = null;
                var dist = function (a, b) {
                    return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
                };
                selection.on('mousedown.dbl.' + listenerSuffix, function () {
                    down = d3.mouse(document.body);
                    last = new Date().getTime();
                });
                selection.on('mouseup.dbl.' + listenerSuffix, function () {
                    if (!down || dist(down, d3.mouse(document.body)) > tolerance) {
                        return;
                    }
                    if (wait && _this.options.doubleClickEnabled) {
                        window.clearTimeout(wait);
                        wait = null;
                        callback(d3.event);
                    }
                    else {
                        wait = window.setTimeout((function (e) {
                            return function () {
                                wait = null;
                            };
                        })(d3.event), 300);
                    }
                });
                return selection;
            };
            EventManager.EVENTS = [
                'create',
                'update',
                'data-update',
                'resize',
                'destroy',
                'enter',
                'over',
                'move',
                'leave',
                'click',
                'dblclick',
                'legend-click',
                'legend-over',
                'legend-out',
                'container-over',
                'container-move',
                'container-out',
                'focus',
                'toggle',
                'outer-world-hover',
                'outer-world-domain-change',
                'pan',
                'pan-end',
                'zoom',
                'zoom-end',
                'zoom-pan-reset',
                'window-mouseup',
                'window-mousemove',
            ];
            return EventManager;
        }());
        Utils.EventManager = EventManager;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var FactoryManager = (function () {
            function FactoryManager() {
                // A stack of all factories, preserves order
                this._factoryStack = [];
            }
            FactoryManager.prototype.index = function (factoryKey) {
                // Return the index of a factory by the factoryKey
                return this._factoryStack
                    .map(function (d) { return d.key; })
                    .indexOf(factoryKey);
            };
            FactoryManager.prototype.getBoundFunction = function (factoryKey, functionName) {
                var factory = this.get(factoryKey);
                if (!factory) {
                    return null;
                }
                return factory[functionName].bind(factory);
            };
            // This should return a more meaningful type...
            FactoryManager.prototype.get = function (factoryKey) {
                // Get the index of the factory
                var index = this.index(factoryKey);
                // Return the factory instance
                if (index > -1) {
                    return this._factoryStack[index].instance;
                }
                // Well, no factory found
                return null;
            };
            FactoryManager.prototype.all = function () {
                return this._factoryStack;
            };
            FactoryManager.prototype.turnFactoriesOff = function (keys) {
                var _this = this;
                var toUndo = [];
                keys.forEach(function (key) {
                    var f = _this.get(key);
                    if (f.isOn()) {
                        f.off();
                        toUndo.push(key);
                    }
                });
                return function () { return _this.turnFactoriesOn(toUndo); };
            };
            FactoryManager.prototype.turnFactoriesOn = function (keys) {
                var _this = this;
                var toUndo = [];
                keys.forEach(function (key) {
                    var f = _this.get(key);
                    if (f.isOff()) {
                        f.on();
                        toUndo.push(key);
                    }
                });
                return function () { return _this.turnFactoriesOff(toUndo); };
            };
            FactoryManager.prototype.registerMany = function (factories) {
                var _this = this;
                // Loop over the factories
                factories.forEach(function (factoryArgs) {
                    // Register each of them, applying all
                    // values as arguments
                    _this.register.apply(_this, factoryArgs);
                });
                // Support chaining
                return this;
            };
            FactoryManager.prototype.register = function (key, constructor) {
                var args = [];
                for (var _i = 2; _i < arguments.length; _i++) {
                    args[_i - 2] = arguments[_i];
                }
                // This generates a new factory constructor, applying
                // the additional args to the original constructor;
                // it preserves the name of the original constructor
                var factory = constructor.bind.apply(constructor, [null].concat(args));
                // Let's create a new instance of the factory
                var instance = new factory();
                // and push the entry to the factory stack
                this._factoryStack.push({
                    key: key,
                    instance: instance
                });
                // Return the instance
                return instance;
            };
            FactoryManager.prototype.unregister = function (factoryKey) {
                // Get the index of the factory
                var index = this.index(factoryKey);
                // And delete the factory
                if (index > -1) {
                    delete this._factoryStack[index];
                }
                // Support chaining
                return this;
            };
            return FactoryManager;
        }());
        Utils.FactoryManager = FactoryManager;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var Dataset = (function () {
            function Dataset(values, id) {
                this.fromJS(values, id);
            }
            Dataset.prototype.fromJS = function (values, id) {
                this.id = id;
                this.values = values;
            };
            return Dataset;
        }());
        Utils.Dataset = Dataset;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var Data = (function () {
            function Data(js) {
                if (js) {
                    this.fromJS(js);
                }
            }
            Data.prototype.fromJS = function (js) {
                var sets = {};
                for (var key in js) {
                    if (js.hasOwnProperty(key)) {
                        sets[key] = new Utils.Dataset(js[key], key);
                    }
                }
                this.sets = sets;
            };
            Data.prototype.getDatasets = function (series, options) {
                var _this = this;
                return series.map(function (d) { return _this.getDatasetValues(d, options); });
            };
            Data.prototype.getDatasetValues = function (series, options) {
                if (!this.sets || !this.sets[series.dataset].values) {
                    return [];
                }
                var xKey = options.getAbsKey();
                var fn;
                if (series.key.y0) {
                    fn = function (d) {
                        return { x: d[xKey], y1: d[series.key.y1], y0: d[series.key.y0] };
                    };
                }
                else {
                    fn = function (d) {
                        return { x: d[xKey], y1: d[series.key.y1], y0: 0 };
                    };
                }
                return this.sets[series.dataset].values.map(fn);
            };
            Data.getMinDistance = function (data, axis, key, range) {
                if (key === void 0) { key = 'x'; }
                return d3.min(
                // Compute the minimum difference along an axis on all series
                data.map(function (series) {
                    // Compute minimum delta
                    return series
                        .map(function (d) { return axis.scale(d[key]); })
                        .filter(function (d) {
                        return range ? d >= range[0] && d <= range[1] : true;
                    })
                        .reduce(function (prev, d, i, arr) {
                        // Get the difference from the current value
                        // with the previous value in the array
                        var diff = i > 0 ? d - arr[i - 1] : Number.MAX_VALUE;
                        // Return the new difference if it is smaller
                        // than the previous difference
                        return diff < prev ? diff : prev;
                    }, Number.MAX_VALUE);
                }));
            };
            return Data;
        }());
        Utils.Data = Data;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var FunctionUtils = (function () {
            function FunctionUtils() {
            }
            FunctionUtils.debounce = function (callback, interval) {
                var _this = this;
                var t = null;
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i - 0] = arguments[_i];
                    }
                    if (t) {
                        window.clearTimeout(t);
                    }
                    t = window.setTimeout(function () { return callback.apply(_this, args); }, interval);
                };
            };
            ;
            return FunctionUtils;
        }());
        Utils.FunctionUtils = FunctionUtils;
        var UUID = (function () {
            function UUID() {
            }
            UUID.generate = function () {
                // @src: http://stackoverflow.com/a/2117523
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                    .replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0;
                    var v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };
            return UUID;
        }());
        Utils.UUID = UUID;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var ObjectUtils = (function () {
            function ObjectUtils() {
            }
            ObjectUtils.isFunction = function (wut) {
                return wut instanceof Function;
            };
            ObjectUtils.isDate = function (wut) {
                return wut instanceof Date;
            };
            ObjectUtils.isObject = function (wut) {
                return !(wut instanceof Array) && wut instanceof Object;
            };
            ObjectUtils.isArray = function (wut) {
                return wut instanceof Array;
            };
            ObjectUtils.isBoolean = function (wut) {
                return wut === true || wut === false;
            };
            ObjectUtils.isReference = function (wut) {
                return wut instanceof Array || wut instanceof Object;
            };
            ObjectUtils.sameType = function (a, b) {
                if (ObjectUtils.isArray(a) && ObjectUtils.isArray(b)) {
                    return true;
                }
                if (ObjectUtils.isObject(a) && ObjectUtils.isObject(b)) {
                    return true;
                }
                return typeof a === typeof b;
            };
            ObjectUtils.extend = function (target, source) {
                var copy = ObjectUtils.copy, extend = ObjectUtils.extend, sameType = ObjectUtils.sameType, isReference = ObjectUtils.isReference, isFunction = ObjectUtils.isFunction;
                var result = Utils.ObjectUtils.copy(target);
                if (!source) {
                    return result;
                }
                for (var key in source) {
                    if (!source.hasOwnProperty(key)) {
                        continue;
                    }
                    if (!target.hasOwnProperty(key) || !sameType(target[key], source[key])) {
                        result[key] = copy(source[key]);
                    }
                    else if (sameType(target[key], source[key])) {
                        if (isFunction(target[key])) {
                            result[key] = source[key];
                        }
                        else if (isReference(target[key])) {
                            result[key] = extend(target[key], source[key]);
                        }
                        else {
                            result[key] = source[key];
                        }
                    }
                }
                return result;
            };
            ObjectUtils.copy = function (source) {
                if (ObjectUtils.isDate(source)) {
                    // Flippin' generic types force me to return an any BUT WHO CARES
                    return new Date(source['getTime']());
                }
                if (ObjectUtils.isFunction(source)) {
                    return source; // We don't do functions.
                }
                if (source instanceof Array) {
                    // Dirty but type guards don't play nice with generic types and
                    // EVERYTHING IS BROKEN THIS MORNING SO I don't care.
                    var n = source['length'];
                    var ret = [];
                    for (var i = 0; i < n; i++) {
                        ret[i] = ObjectUtils.copy(source[i]);
                    }
                    return ret;
                }
                if (source instanceof Object) {
                    var ret = {};
                    for (var key in source) {
                        if (source.hasOwnProperty(key)) {
                            ret[key] = ObjectUtils.copy(source[key]);
                        }
                    }
                    return ret;
                }
                return source;
            };
            ;
            return ObjectUtils;
        }());
        Utils.ObjectUtils = ObjectUtils;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='IDomains.ts' />
/// <reference path='EventManager.ts' />
/// <reference path='FactoryManager.ts' />
/// <reference path='Dataset.ts' />
/// <reference path='Data.ts' />
/// <reference path='FunctionUtils.ts' />
/// <reference path='ObjectUtils.ts' />
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var BaseFactory = (function () {
            function BaseFactory() {
                this.enabled = true;
            }
            BaseFactory.prototype.init = function (key, eventMgr, factoryMgr) {
                this.key = key;
                this.eventMgr = eventMgr;
                this.factoryMgr = factoryMgr;
                // Create namespaced event listener
                // and bind a proper this statement
                this.eventMgr.on('create.' + this.key, this.create.bind(this));
                this.eventMgr.on('update.' + this.key, this.update.bind(this));
                this.eventMgr.on('destroy.' + this.key, this.destroy.bind(this));
            };
            BaseFactory.prototype.on = function () {
                this.enabled = true;
            };
            BaseFactory.prototype.off = function () {
                this.enabled = false;
            };
            BaseFactory.prototype.isOn = function () {
                return this.enabled === true;
            };
            BaseFactory.prototype.isOff = function () {
                return this.enabled === false;
            };
            BaseFactory.prototype.create = function (options) {
                // This methods need to be overwritten by factories
            };
            BaseFactory.prototype.update = function (data, options) {
                // This methods need to be overwritten by factories
            };
            BaseFactory.prototype.destroy = function () {
                // This methods need to be overwritten by factories
            };
            return BaseFactory;
        }());
        Factory.BaseFactory = BaseFactory;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Container = (function (_super) {
            __extends(Container, _super);
            function Container(element) {
                _super.call(this);
                this.element = element;
                this.dim = new n3Charts.Options.Dimensions();
            }
            Container.prototype.create = function (options) {
                var _this = this;
                this.dim.updateMargins(options);
                this.listenToElement(this.element, options);
                this.createRoot();
                this.createContainer();
                this.dim.fromParentElement(this.element.parentElement);
                this.eventMgr.on('resize', function () {
                    _this.dim.fromParentElement(_this.element.parentElement);
                    _this.update();
                });
                // D3, Y U NO DBLCKICK ?
                this.eventMgr.listenForDblClick(this.svg, function () {
                    _this.eventMgr.trigger('zoom-pan-reset', true);
                }, this.key);
                this.eventMgr.on('zoom-pan-reset.' + this.key, function (event) {
                    _this.eventMgr.triggerDataAndOptions('update');
                });
            };
            Container.prototype.listenToElement = function (element, options) {
                var eventMgr = this.eventMgr;
                element.addEventListener('mouseover', function (event) {
                    eventMgr.triggerDataAndOptions.apply(eventMgr, ['container-over', event]);
                });
                element.addEventListener('mousemove', function (event) {
                    eventMgr.triggerDataAndOptions.apply(eventMgr, ['container-move', event]);
                });
                element.addEventListener('mouseout', function (event) {
                    eventMgr.triggerDataAndOptions.apply(eventMgr, ['container-out', event]);
                });
            };
            Container.prototype.getCoordinatesFromEvent = function (event) {
                var dim = this.getDimensions();
                var _a = event.currentTarget.getBoundingClientRect(), left = _a.left, top = _a.top;
                var xScale = this.factoryMgr.get('x-axis');
                var x = xScale.invert(event.clientX - left - dim.margin.left);
                var yScale = this.factoryMgr.get('y-axis');
                var y = yScale.invert(event.clientY - top - dim.margin.top);
                return { y: y, x: x };
            };
            Container.prototype.update = function () {
                this.updateRoot();
                this.updateContainer();
            };
            Container.prototype.destroy = function () {
                this.destroyRoot();
            };
            Container.prototype.createRoot = function () {
                this.svg = d3.select(this.element)
                    .append('svg')
                    .attr('class', 'chart');
                this.defs = this.svg
                    .append('defs');
            };
            Container.prototype.updateRoot = function () {
                // Update the dimensions of the root
                this.svg
                    .attr('width', this.dim.width)
                    .attr('height', this.dim.height);
            };
            Container.prototype.destroyRoot = function () {
                // Remove the root node
                this.svg.remove();
            };
            Container.prototype.createContainer = function () {
                // Create a visualization container
                this.vis = this.svg
                    .append('g')
                    .attr('class', 'container');
                this.axes = this.vis
                    .append('g')
                    .attr('class', 'axes');
                this.clippingPathId = 'clipping-path-' + n3Charts.Utils.UUID.generate();
                this.defs.append('svg:clipPath')
                    .attr('id', this.clippingPathId)
                    .append('svg:rect')
                    .attr('id', 'clipping-rect');
                this.data = this.vis
                    .append('g')
                    .attr({
                    'class': 'data',
                    'clip-path': 'url(#' + this.clippingPathId + ')'
                });
                this.overlay = this.vis
                    .append('g')
                    .attr('class', 'overlay');
                this.symbols = this.overlay
                    .append('g')
                    .attr({
                    'class': 'symbols',
                    'clip-path': 'url(#' + this.clippingPathId + ')'
                });
            };
            Container.prototype.updateContainer = function () {
                this.vis
                    .attr({
                    'width': this.dim.innerWidth,
                    'height': Math.max(this.dim.innerHeight, 0),
                    'transform': 'translate(' + this.dim.margin.left + ', ' + this.dim.margin.top + ')'
                });
                d3.select(this.element).select('#clipping-rect')
                    .attr({
                    'width': Math.max(this.dim.innerWidth, 0),
                    'height': Math.max(this.dim.innerHeight, 0)
                });
            };
            Container.prototype.getDimensions = function () {
                return this.dim;
            };
            return Container;
        }(Factory.BaseFactory));
        Factory.Container = Container;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Tooltip = (function (_super) {
            __extends(Tooltip, _super);
            function Tooltip(element) {
                _super.call(this);
                this.element = element;
            }
            Tooltip.prototype.off = function () {
                _super.prototype.off.call(this);
                this.hide();
            };
            Tooltip.prototype.create = function (options) {
                this.options = options;
                this.createTooltip();
                this.eventMgr.on('container-move.tooltip', this.show.bind(this));
                this.eventMgr.on('container-out.tooltip', this.hide.bind(this));
                this.eventMgr.on('outer-world-hover.tooltip', this.showFromCoordinates.bind(this));
                this.hide();
            };
            Tooltip.prototype.update = function (data, options) {
                this.options = options;
            };
            Tooltip.prototype.createTooltip = function () {
                var svg = this.svg = d3.select(this.element)
                    .append('div')
                    .attr('class', 'chart-tooltip');
                svg.append('div')
                    .attr('class', 'abscissas');
                this.line = this.factoryMgr.get('container').overlay
                    .append('line')
                    .attr('class', 'tooltip-line');
                this.dots = this.factoryMgr.get('container').overlay
                    .append('g')
                    .attr('class', 'tooltip-dots');
            };
            Tooltip.prototype.destroy = function () {
                this.svg.remove();
            };
            Tooltip.prototype.getClosestRows = function (x, data, options) {
                var visibleSeries = options.series.filter(function (series) { return series.visible; });
                var datasets = visibleSeries.map(function (series) { return data.getDatasetValues(series, options).filter(series.defined); });
                var closestRows = [];
                var closestIndex = -1;
                var minDistance = Number.POSITIVE_INFINITY;
                var foundSeries = [];
                for (var i = 0; i < datasets.length; i++) {
                    for (var j = 0; j < datasets[i].length; j++) {
                        if (options.axes.x.type === 'date') {
                            // _sigh_ TypeScript...
                            var distance = Math.abs(datasets[i][j].x.getTime() - x);
                        }
                        else {
                            var distance = Math.abs(datasets[i][j].x - x);
                        }
                        var series = visibleSeries[i];
                        if (distance === minDistance && foundSeries.indexOf(series) === -1) {
                            closestRows.push({ series: series, row: datasets[i][j] });
                            foundSeries.push(series);
                        }
                        else if (distance < minDistance) {
                            minDistance = distance;
                            closestRows = [{ series: visibleSeries[i], row: datasets[i][j] }];
                            foundSeries = [series];
                            closestIndex = j;
                        }
                    }
                }
                return { rows: closestRows, index: closestIndex };
            };
            Tooltip.prototype.showFromCoordinates = function (coordinates, data, options) {
                if (this.isOff()) {
                    return;
                }
                var x = coordinates.x, y = coordinates.y;
                if (x === undefined || y === undefined) {
                    this.hide(undefined, data, options);
                    return;
                }
                if (x instanceof Date) {
                    // _sigh_ TypeScript...
                    x = x.getTime();
                }
                var _a = this.getClosestRows(x, data, options), rows = _a.rows, index = _a.index;
                if (rows.length === 0) {
                    this.hide(undefined, data, options);
                    return;
                }
                this.updateTooltipDots(rows);
                this.dots.style('opacity', '1');
                this.updateLinePosition(rows);
                this.line.style('opacity', '1');
                var tooltipContent = this.getTooltipContent(rows, index, options);
                if (options.tooltipHook) {
                    tooltipContent = options.tooltipHook(rows);
                }
                if (!tooltipContent) {
                    return;
                }
                this.updateTooltipContent(tooltipContent, index, options);
                this.updateTooltipPosition(rows);
                this.svg.style('display', null);
            };
            Tooltip.prototype.show = function (event, data, options) {
                if (this.isOff()) {
                    return;
                }
                var container = this.factoryMgr.get('container');
                var coordinates = container.getCoordinatesFromEvent(event);
                this.showFromCoordinates(coordinates, data, options);
            };
            Tooltip.prototype.hide = function (event, data, options) {
                this.svg
                    .style('display', 'none');
                this.line
                    .style('opacity', '0');
                this.dots
                    .style('opacity', '0');
                if (options && options.tooltipHook) {
                    options.tooltipHook(undefined);
                }
            };
            // This is the part the user can override.
            Tooltip.prototype.getTooltipContent = function (rows, closestIndex, options) {
                var xTickFormat = options.getByAxisSide(n3Charts.Options.AxisOptions.SIDE.X).tickFormat;
                var getYTickFormat = function (side) { return options.getByAxisSide(side).tickFormat; };
                var getRowValue = function (d) {
                    var yTickFormat = getYTickFormat(d.series.axis);
                    var fn = yTickFormat ? function (y1) { return yTickFormat(y1, closestIndex); } : function (y1) { return y1; };
                    var y1Label = fn(d.row.y1);
                    if (d.series.hasTwoKeys()) {
                        return '[' + fn(d.row.y0) + ', ' + y1Label + ']';
                    }
                    else {
                        return y1Label;
                    }
                };
                return {
                    abscissas: xTickFormat ? xTickFormat(rows[0].row.x, closestIndex) : rows[0].row.x,
                    rows: rows.map(function (row) {
                        return {
                            label: row.series.label,
                            value: getRowValue(row),
                            color: row.series.color,
                            id: row.series.id
                        };
                    })
                };
            };
            Tooltip.prototype.updateTooltipContent = function (result, closestIndex, options) {
                this.svg.select('.abscissas')
                    .text(result.abscissas);
                var initItem = function (s) {
                    s.attr({ 'class': 'tooltip-item' });
                    s.append('div')
                        .attr({ 'class': 'color-dot' })
                        .style({
                        'background-color': function (d) { return d.color; }
                    });
                    s.append('div')
                        .attr({ 'class': 'series-label' });
                    s.append('div')
                        .attr({ 'class': 'y-value' });
                    return s;
                };
                var updateItem = function (s) {
                    s.select('.series-label')
                        .text(function (d) { return d.label; });
                    s.select('.y-value')
                        .text(function (d) { return d.value; });
                    return s;
                };
                var items = this.svg.selectAll('.tooltip-item')
                    .data(result.rows, function (d, i) { return !!d.id ? d.id : i; });
                items.enter()
                    .append('div')
                    .call(initItem)
                    .call(updateItem);
                items.call(updateItem);
                items.exit().remove();
            };
            Tooltip.prototype.updateTooltipDots = function (rows) {
                var _this = this;
                var xScale = this.factoryMgr.get('x-axis').scale;
                var yScale = function (side) { return _this.factoryMgr.get(side + '-axis').scale; };
                var radius = 3;
                var initDots = function (s) {
                    s.attr('class', 'tooltip-dots-group');
                    s.append('circle').attr({
                        'class': 'tooltip-dot y1'
                    }).on('click', function (d, i) {
                        _this.eventMgr.trigger('click', d.row, i, d.series, _this.options);
                    });
                    s.append('circle').attr({
                        'class': 'tooltip-dot y0'
                    }).style({
                        'display': function (d) { return d.series.hasTwoKeys() ? null : 'none'; }
                    }).on('click', function (d, i) {
                        _this.eventMgr.trigger('click', d.row, i, d.series, _this.options);
                    });
                };
                var updateDots = function (s) {
                    s.select('.tooltip-dot.y1').attr({
                        'r': function (d) { return radius; },
                        'cx': function (d) { return xScale(d.row.x); },
                        'cy': function (d) { return yScale(d.series.axis)(d.row.y1); },
                        'stroke': function (d) { return d.series.color; }
                    });
                    s.select('.tooltip-dot.y0').attr({
                        'r': function (d) { return d.series.hasTwoKeys() ? radius : null; },
                        'cx': function (d) { return d.series.hasTwoKeys() ? xScale(d.row.x) : null; },
                        'cy': function (d) { return d.series.hasTwoKeys() ? yScale(d.series.axis)(d.row.y0) : null; },
                        'stroke': function (d) { return d.series.hasTwoKeys() ? d.series.color : null; }
                    });
                };
                var dots = this.dots.selectAll('.tooltip-dots-group')
                    .data(rows);
                dots.enter()
                    .append('g')
                    .call(initDots)
                    .call(updateDots);
                dots.call(updateDots);
                dots.exit().remove();
            };
            Tooltip.prototype.updateTooltipPosition = function (rows) {
                var lastRow = rows.slice(-1)[0];
                var xAxis = this.factoryMgr.get('x-axis');
                var yScale = this.factoryMgr.get('y-axis').scale;
                var margin = this.factoryMgr.get('container').getDimensions().margin;
                var leftOffset = this.element.offsetLeft;
                var topOffset = this.element.offsetTop;
                var xOffset = 0;
                var transform = '';
                if (xAxis.isInLastHalf(lastRow.row.x)) {
                    transform = 'translate(-100%, 0)';
                    xOffset = -10;
                }
                else {
                    xOffset = 10;
                }
                this.svg
                    .style({
                    'left': (leftOffset + margin.left + xAxis.scale(lastRow.row.x) + xOffset) + 'px',
                    'top': (topOffset + margin.top) + 'px',
                    'transform': transform
                });
                return;
            };
            Tooltip.prototype.updateLinePosition = function (rows) {
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                var lastRow = rows.slice(-1)[0];
                var xAxis = this.factoryMgr.get('x-axis');
                var x = xAxis.scale(lastRow.row.x);
                this.line.attr({
                    'x1': x,
                    'x2': x,
                    'y1': -dim.margin.top,
                    'y2': dim.innerHeight
                });
                return;
            };
            return Tooltip;
        }(Factory.BaseFactory));
        Factory.Tooltip = Tooltip;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Legend = (function (_super) {
            __extends(Legend, _super);
            function Legend(element) {
                _super.call(this);
                this.element = element;
            }
            Legend.prototype.create = function () {
                this.createLegend();
            };
            Legend.prototype.createLegend = function () {
                this.div = d3.select(this.element)
                    .append('div')
                    .attr('class', 'chart-legend')
                    .style('position', 'absolute');
            };
            Legend.prototype.legendClick = function () {
                var _this = this;
                return function (selection) {
                    return selection.on('click', function (series) {
                        _this.eventMgr.trigger('legend-click', series);
                    });
                };
            };
            Legend.prototype.update = function (data, options) {
                var _this = this;
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                var init = function (series) {
                    var items = series.append('div').attr({ 'class': 'item' })
                        .call(_this.legendClick());
                    items.append('div').attr({ 'class': 'icon' });
                    items.append('div').attr({ 'class': 'legend-label' });
                };
                var update = function (series) {
                    series
                        .attr('class', function (d) { return 'item ' + d.type.join(' '); })
                        .classed('legend-hidden', function (d) { return !d.visible; });
                    series.select('.icon').style('background-color', function (d) { return d.color; });
                    series.select('.legend-label').text(function (d) { return d.label; });
                };
                var legendItems = this.div.selectAll('.item')
                    .data(options.series);
                legendItems.enter().call(init);
                legendItems.call(update);
                legendItems.exit().remove();
            };
            Legend.prototype.destroy = function () {
                this.div.remove();
            };
            return Legend;
        }(Factory.BaseFactory));
        Factory.Legend = Legend;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='./BaseFactory.ts' />
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Axis = (function (_super) {
            __extends(Axis, _super);
            function Axis(side) {
                var _this = this;
                _super.call(this);
                this.side = side;
                if (!n3Charts.Options.AxisOptions.isValidSide(side)) {
                    throw new TypeError('Wrong axis side : ' + side);
                }
                this.scale = function (value) { return _this._scale.call(_this, value); };
            }
            Axis.prototype.range = function () {
                return this._scale.range();
            };
            Axis.prototype.getDomain = function () {
                return this._scale.domain();
            };
            Axis.prototype.setDomain = function (d) {
                return this._scale.domain.call(this, d);
            };
            Axis.prototype.create = function () {
                var vis = this.factoryMgr.get('container').axes;
                this.createAxis(vis);
                this.eventMgr.on('pan.' + this.key, this.softUpdate.bind(this));
                this.eventMgr.on('zoom-end.' + this.key, this.softUpdate.bind(this));
                this.eventMgr.on('outer-world-domain-change.' + this.key, this.updateFromOuterWorld.bind(this));
                this.eventMgr.on('resize.' + this.key, this.onResize.bind(this));
            };
            Axis.prototype.updateFromOuterWorld = function (domains) {
                this.updateScaleDomain(domains[this.side]);
                this.softUpdate();
            };
            Axis.prototype.softUpdate = function () {
                if (this.factoryMgr.get('transitions').isOn()) {
                    this.svg
                        .transition()
                        .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                        .call(this.d3axis);
                }
                else {
                    this.svg.call(this.d3axis);
                }
            };
            Axis.prototype.onResize = function () {
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                this.updateScaleRange(dim, this.options);
                this.updateAxisContainer(dim);
                this.softUpdate();
            };
            Axis.prototype.getDimensions = function () {
                // Get the container dimensions
                var container = this.factoryMgr.get('container');
                return container.getDimensions();
            };
            Axis.prototype.update = function (data, options) {
                var dimensions = this.getDimensions();
                // Get the [min, max] extent of the axis
                var extent = this.getExtent(data, options);
                // Get the options for the axis
                this.options = options.getByAxisSide(this.side);
                this._scale = this.getScale();
                this.updateScaleRange(dimensions, this.options);
                this.updateScaleDomain(extent);
                this.d3axis = this.getAxis(this._scale, this.options);
                this.updateAxisOrientation(this.d3axis);
                this.updateAxisContainer(dimensions);
                this.shiftAxisTicks(this.options);
            };
            Axis.prototype.shiftAxisTicks = function (options) {
                var _a = options.ticksShift, x = _a.x, y = _a.y;
                this.svg.selectAll('text')
                    .attr('transform', "translate(" + x + ", " + y + ")");
            };
            Axis.prototype.destroy = function () {
                this.destroyAxis();
            };
            Axis.prototype.updateScaleRange = function (dimensions, axisOptions) {
                if (this.isAbscissas()) {
                    this._scale.range([axisOptions.padding.min, dimensions.innerWidth - axisOptions.padding.max]);
                }
                else {
                    this._scale.range([dimensions.innerHeight - axisOptions.padding.min, axisOptions.padding.max]);
                }
            };
            Axis.prototype.updateScaleDomain = function (extent) {
                this._scale.domain(extent);
            };
            Axis.prototype.getScaleDomain = function () {
                return this._scale ? this._scale.domain() : [0, 1];
            };
            Axis.prototype.getExtent = function (datasets, options) {
                var axisOptions = options.getByAxisSide(this.side);
                var extent = undefined;
                if (this.isAbscissas()) {
                    var activeDatasets = options.getVisibleDatasets();
                    var abscissasKey_1 = options.getAbsKey();
                    var xValues_1 = [];
                    activeDatasets.forEach(function (key) {
                        var data = datasets.sets[key].values;
                        xValues_1 = xValues_1.concat(data.map(function (datum) { return datum[abscissasKey_1]; }));
                    });
                    extent = d3.extent(xValues_1);
                }
                else {
                    var lowests_1 = axisOptions.includeZero ? [0] : [];
                    var highests_1 = axisOptions.includeZero ? [0] : [];
                    var series = options.getVisibleSeriesBySide(this.side);
                    if (this.side === n3Charts.Options.AxisOptions.SIDE.Y2 && series.length === 0) {
                        series = options.getVisibleSeriesBySide(n3Charts.Options.AxisOptions.SIDE.Y);
                    }
                    series.forEach(function (s) {
                        var values = datasets.getDatasetValues(s, options);
                        values.forEach(function (datum) {
                            if (s.defined && !s.defined(datum)) {
                                return;
                            }
                            lowests_1.push(datum.y0 || datum.y1);
                            highests_1.push(datum.y1);
                        });
                    });
                    extent = [d3.min(lowests_1), d3.max(highests_1)];
                    if (extent[0] === 0 && extent[1] === 0) {
                        extent = [0, 1];
                    }
                }
                if (axisOptions.min !== undefined) {
                    extent[0] = axisOptions.min;
                }
                if (axisOptions.max !== undefined) {
                    extent[1] = axisOptions.max;
                }
                return extent;
            };
            Axis.prototype.isAbscissas = function () {
                return [n3Charts.Options.AxisOptions.SIDE.X, n3Charts.Options.AxisOptions.SIDE.X2].indexOf(this.side) !== -1;
            };
            Axis.prototype.isInLastHalf = function (value) {
                var fn = function (v) { return v; };
                if (value instanceof Date) {
                    fn = function (v) { return v.getTime(); };
                }
                var _a = this._scale.domain(), a = _a[0], b = _a[1];
                return fn(value) > fn(a) + (fn(b) - fn(a)) / 2;
            };
            Axis.prototype.createAxis = function (vis) {
                this.svg = vis
                    .append('g')
                    .attr('class', 'axis ' + this.side + '-axis');
            };
            Axis.prototype.updateAxisOrientation = function (axis) {
                if (this.isAbscissas()) {
                    if (this.side === n3Charts.Options.AxisOptions.SIDE.X) {
                        axis.orient('bottom');
                    }
                    else {
                        axis.orient('top');
                    }
                }
                else {
                    if (this.side === n3Charts.Options.AxisOptions.SIDE.Y) {
                        axis.orient('left');
                    }
                    else {
                        axis.orient('right');
                    }
                }
            };
            Axis.prototype.updateAxisContainer = function (dim) {
                // Move the axis container to the correct position
                if (this.isAbscissas()) {
                    if (this.side === n3Charts.Options.AxisOptions.SIDE.X) {
                        this.svg
                            .attr('transform', "translate(0, " + dim.innerHeight + ")");
                    }
                    else {
                        this.svg
                            .attr('transform', 'translate(0, 0)');
                    }
                }
                else {
                    if (this.side === n3Charts.Options.AxisOptions.SIDE.Y) {
                        this.svg
                            .attr('transform', 'translate(0, 0)');
                    }
                    else {
                        this.svg
                            .attr('transform', "translate(" + dim.innerWidth + ", 0)");
                    }
                }
                this.softUpdate();
            };
            Axis.prototype.destroyAxis = function () {
                // Remove the axis container
                this.svg.remove();
            };
            Axis.prototype.invert = function (value) {
                return this._scale.invert(value);
            };
            Axis.prototype.isTimeAxis = function () {
                return this.options.type === n3Charts.Options.AxisOptions.TYPE.DATE;
            };
            Axis.prototype.getScale = function () {
                if (this.options && this.options.type === n3Charts.Options.AxisOptions.TYPE.DATE) {
                    return d3.time.scale();
                }
                if (this.options && this.options.type === n3Charts.Options.AxisOptions.TYPE.LOG) {
                    return d3.scale.log();
                }
                return d3.scale.linear();
            };
            Axis.prototype.getAxis = function (scale, options) {
                var axis;
                // Create and return a D3 Axis generator
                if (options.hasDynamicTicks()) {
                    axis = n3Charts.svg.twoSpeedAxis()
                        .scale(scale);
                }
                else {
                    axis = d3.svg.axis()
                        .scale(scale);
                }
                options.configure(axis);
                return axis;
            };
            Axis.prototype.cloneAxis = function () {
                var axis;
                if (this.options && this.options.hasDynamicTicks()) {
                    axis = n3Charts.svg.twoSpeedAxis()
                        .ticks(this.d3axis.ticks());
                }
                else {
                    axis = d3.svg.axis()
                        .ticks(this.d3axis.ticks()[0]);
                }
                return axis
                    .scale(this.d3axis.scale())
                    .orient(this.d3axis.orient())
                    .tickValues(this.d3axis.tickValues())
                    .tickSize(this.d3axis.tickSize());
                // dafuq is wrong with this tslinter ???
                // .tickFormat(this.d3axis.tickFormat);
            };
            return Axis;
        }(Factory.BaseFactory));
        Factory.Axis = Axis;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Grid = (function (_super) {
            __extends(Grid, _super);
            function Grid() {
                _super.apply(this, arguments);
            }
            Grid.prototype.create = function () {
                this.svg = this.factoryMgr.get('container').axes
                    .insert('g', ':first-child')
                    .attr('class', 'grid');
                this.svg.append('g').classed('x-grid', true);
                this.svg.append('g').classed('y-grid', true);
                this.eventMgr.on('resize.' + this.key, this.softUpdate.bind(this));
                this.eventMgr.on('pan.' + this.key, this.softUpdate.bind(this));
                this.eventMgr.on('zoom-end.' + this.key, this.softUpdate.bind(this));
                this.eventMgr.on('outer-world-domain-change.' + this.key, this.softUpdate.bind(this));
            };
            Grid.prototype.softUpdate = function () {
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                if (this.xAxis) {
                    var sel = this.svg.select('.x-grid');
                    if (this.factoryMgr.get('transitions').isOn()) {
                        sel = sel
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'));
                    }
                    sel.attr('transform', 'translate(0, ' + dim.innerHeight + ')')
                        .call(this.xAxis.tickSize(-dim.innerHeight, 0));
                }
                if (this.yAxis) {
                    var sel = this.svg.select('.y-grid');
                    if (this.factoryMgr.get('transitions').isOn()) {
                        sel = sel
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'));
                    }
                    sel
                        .call(this.yAxis.tickSize(-dim.innerWidth, 0));
                }
            };
            Grid.prototype._updateVisibility = function (options) {
                this.svg.select('.x-grid').style('display', options.grid.x ? null : 'none');
                this.svg.select('.y-grid').style('display', options.grid.y ? null : 'none');
            };
            Grid.prototype.update = function (data, options) {
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                if (options.grid.x) {
                    this.xAxis = this.factoryMgr.get('x-axis').cloneAxis()
                        .tickSize(-dim.innerHeight, 0);
                    this.svg.select('.x-grid')
                        .transition()
                        .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                        .attr('transform', 'translate(0, ' + dim.innerHeight + ')')
                        .call(this.xAxis);
                }
                if (options.grid.y) {
                    this.yAxis = this.factoryMgr.get('y-axis').cloneAxis();
                    this.svg.select('.y-grid')
                        .transition()
                        .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                        .call(this.yAxis.tickSize(-dim.innerWidth, 0));
                }
                this._updateVisibility(options);
            };
            Grid.prototype.destroy = function () {
                this.svg.remove();
            };
            return Grid;
        }(Factory.BaseFactory));
        Factory.Grid = Grid;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Zoom = (function (_super) {
            __extends(Zoom, _super);
            function Zoom() {
                _super.apply(this, arguments);
                this.isActive = false;
            }
            Zoom.prototype.create = function () {
                this.rect = this.factoryMgr.get('container').svg
                    .append('rect')
                    .attr('class', 'chart-brush');
            };
            Zoom.prototype.constrainOutgoingDomains = function (domains) {
                if (!this.zoomOnX) {
                    delete domains.x;
                }
                if (!this.zoomOnY) {
                    delete domains.y;
                }
            };
            Zoom.prototype.update = function (data, options) {
                var dimensions = this.factoryMgr.get('container').getDimensions();
                var _a = dimensions.margin, left = _a.left, top = _a.top;
                this.zoomOnX = options.zoom.x;
                this.zoomOnY = options.zoom.y;
                if (!this.zoomOnX && !this.zoomOnY) {
                    return;
                }
                this.xStartFn = this.zoomOnX ? function (x) { return x; } : function (x) { return left; };
                this.xEndFn = this.zoomOnX ? function (x) { return x; } : function (x) { return dimensions.innerWidth + left; };
                this.yStartFn = this.zoomOnY ? function (y) { return y; } : function (y) { return top; };
                this.yEndFn = this.zoomOnY ? function (y) { return y; } : function (y) { return dimensions.innerHeight + top; };
                this.registerEvents(this.factoryMgr.get('container'));
            };
            Zoom.prototype.show = function (_a) {
                var xStart = _a.xStart, xEnd = _a.xEnd, yStart = _a.yStart, yEnd = _a.yEnd;
                _b = xStart > xEnd ? [xEnd, xStart] : [xStart, xEnd], xStart = _b[0], xEnd = _b[1];
                _c = yStart > yEnd ? [yEnd, yStart] : [yStart, yEnd], yStart = _c[0], yEnd = _c[1];
                this.rect.attr({
                    x: xStart,
                    width: xEnd - xStart,
                    y: yStart,
                    height: yEnd - yStart
                }).style('opacity', '1');
                var _b, _c;
            };
            Zoom.prototype.hide = function () {
                this.rect.style('opacity', '0');
            };
            Zoom.prototype.updateAxes = function (_a) {
                var xStart = _a.xStart, xEnd = _a.xEnd, yStart = _a.yStart, yEnd = _a.yEnd;
                _b = xStart > xEnd ? [xEnd, xStart] : [xStart, xEnd], xStart = _b[0], xEnd = _b[1];
                _c = yStart > yEnd ? [yEnd, yStart] : [yStart, yEnd], yStart = _c[0], yEnd = _c[1];
                var dimensions = this.factoryMgr.get('container').getDimensions();
                var _d = dimensions.margin, left = _d.left, top = _d.top;
                var xAxis = this.factoryMgr.get('x-axis');
                var x2Axis = this.factoryMgr.get('x2-axis');
                xAxis.setDomain([xAxis.invert(xStart - left), xAxis.invert(xEnd - left)]);
                x2Axis.setDomain(xAxis.getDomain());
                var yAxis = this.factoryMgr.get('y-axis');
                var y2Axis = this.factoryMgr.get('y2-axis');
                yAxis.setDomain([yAxis.invert(yEnd - top), yAxis.invert(yStart - top)]);
                y2Axis.setDomain([y2Axis.invert(yEnd - top), y2Axis.invert(yStart - top)]);
                var _b, _c;
            };
            Zoom.prototype.registerEvents = function (container) {
                var _this = this;
                var k = function (event) { return (event + "." + _this.key); };
                var xStart;
                var xEnd;
                var yStart;
                var yEnd;
                var turnBackOn;
                var onMouseUp = function () {
                    _this.isActive = false;
                    _this.hide();
                    if (xEnd !== undefined && yEnd !== undefined) {
                        _this.updateAxes({ xStart: xStart, xEnd: xEnd, yStart: yStart, yEnd: yEnd });
                        _this.eventMgr.trigger('zoom-end');
                        xStart = xEnd = yStart = yEnd = undefined;
                        turnBackOn();
                    }
                    _this.eventMgr.on(k('window-mouseup'), null);
                };
                container.svg
                    .on(k('mousedown'), function () {
                    var event = d3.event;
                    // We don't want to process non-left click events
                    if (event.button !== 0) {
                        return;
                    }
                    if (event.altKey) {
                        turnBackOn = _this.factoryMgr.turnFactoriesOff(['tooltip']);
                        _this.isActive = true;
                        _this.eventMgr.on(k('window-mouseup'), onMouseUp);
                        _a = d3.mouse(event.currentTarget), xStart = _a[0], yStart = _a[1];
                        xStart = _this.xStartFn(xStart);
                        yStart = _this.yStartFn(yStart);
                    }
                    var _a;
                }).on(k('mousemove'), function () {
                    if (_this.isActive) {
                        _a = d3.mouse(d3.event.currentTarget), xEnd = _a[0], yEnd = _a[1];
                        xEnd = _this.xEndFn(xEnd);
                        yEnd = _this.yEndFn(yEnd);
                        _this.show({ xStart: xStart, xEnd: xEnd, yStart: yStart, yEnd: yEnd });
                        _this.eventMgr.trigger('zoom');
                    }
                    var _a;
                });
            };
            return Zoom;
        }(Factory.BaseFactory));
        Factory.Zoom = Zoom;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Pan = (function (_super) {
            __extends(Pan, _super);
            function Pan() {
                _super.apply(this, arguments);
                this.isActive = false;
                this.hasMoved = false;
            }
            Pan.prototype.constrainDomains = function (domains) {
                domains.x = this.options.x(domains.x);
                domains.x2 = this.options.x2(domains.x2);
                domains.y = this.options.y(domains.y);
                domains.y2 = this.options.y2(domains.y2);
            };
            Pan.prototype.move = function (domains) {
                var x = domains.x, x2 = domains.x2, y = domains.y, y2 = domains.y2;
                var xAxis = this.factoryMgr.get('x-axis');
                var x2Axis = this.factoryMgr.get('x2-axis');
                var yAxis = this.factoryMgr.get('y-axis');
                var y2Axis = this.factoryMgr.get('y2-axis');
                if (x) {
                    xAxis.setDomain(x);
                }
                if (x2) {
                    x2Axis.setDomain(x2);
                }
                if (y) {
                    yAxis.setDomain(y);
                }
                if (y2) {
                    y2Axis.setDomain(y2);
                }
            };
            Pan.prototype.getNewDomains = function (deltaX, deltaX2, deltaY, deltaY2) {
                var xAxis = this.factoryMgr.get('x-axis');
                var x2Axis = this.factoryMgr.get('x2-axis');
                var yAxis = this.factoryMgr.get('y-axis');
                var y2Axis = this.factoryMgr.get('y2-axis');
                return {
                    x: xAxis.range().map(function (x) { return x + deltaX; }).map(xAxis.invert, xAxis),
                    x2: x2Axis.range().map(function (x) { return x + deltaX2; }).map(x2Axis.invert, xAxis),
                    y: yAxis.range().map(function (x) { return x + deltaY; }).map(yAxis.invert, yAxis),
                    y2: y2Axis.range().map(function (x) { return x + deltaY2; }).map(y2Axis.invert, y2Axis)
                };
            };
            Pan.prototype.update = function (data, options) {
                var _this = this;
                this.options = options.pan;
                var container = this.factoryMgr.get('container');
                var k = function (event) { return (event + "." + _this.key); };
                var xStart;
                var yStart;
                var turnBackOn;
                var onMouseUp = function () {
                    if (_this.hasMoved) {
                        _this.eventMgr.trigger('pan-end');
                    }
                    if (turnBackOn) {
                        turnBackOn();
                    }
                    _this.isActive = _this.hasMoved = false;
                    turnBackOn = undefined;
                    _this.eventMgr.on(k('window-mouseup'), null);
                    _this.eventMgr.on(k('window-mousemove'), null);
                };
                var onMouseMove = function () {
                    if (_this.isActive) {
                        var _a = d3.mouse(container.svg.node()), xEnd = _a[0], yEnd = _a[1];
                        var newDomains = _this.getNewDomains(xStart - xEnd, xStart - xEnd, yStart - yEnd, yStart - yEnd);
                        _this.constrainDomains(newDomains);
                        var x = newDomains.x, x2 = newDomains.x2, y = newDomains.y, y2 = newDomains.y2;
                        if (x || x2 || y || y2) {
                            if (!turnBackOn) {
                                turnBackOn = _this.factoryMgr.turnFactoriesOff(['tooltip', 'transitions']);
                            }
                            _this.hasMoved = true;
                            _this.move(newDomains);
                            _this.eventMgr.trigger('pan');
                        }
                        _b = [xEnd, yEnd], xStart = _b[0], yStart = _b[1];
                    }
                    var _b;
                };
                container.svg
                    .on(k('mousedown'), function () {
                    var event = d3.event;
                    // We don't want to process non-left click events
                    if (event.button !== 0) {
                        return;
                    }
                    if (!event.altKey) {
                        _this.isActive = true;
                        _a = d3.mouse(event.currentTarget), xStart = _a[0], yStart = _a[1];
                        _this.eventMgr.on(k('window-mouseup'), onMouseUp);
                        _this.eventMgr.on(k('window-mousemove'), onMouseMove);
                    }
                    var _a;
                });
            };
            return Pan;
        }(Factory.BaseFactory));
        Factory.Pan = Pan;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Transition = (function (_super) {
            __extends(Transition, _super);
            function Transition() {
                _super.apply(this, arguments);
                this.duration = Transition.defaultDuration;
                this.ease = 'cubic';
            }
            Transition.prototype.off = function () {
                _super.prototype.off.call(this);
                this.duration = 0;
            };
            Transition.prototype.on = function () {
                _super.prototype.on.call(this);
                this.duration = Transition.defaultDuration;
            };
            Transition.prototype.enter = function (t) {
                var duration = this.duration;
                var ease = this.ease;
                var n = t[0].length;
                var delay = function (d, i) { return n ? i / n * duration : 0; };
                t.duration(duration)
                    .delay(delay)
                    .ease(ease);
            };
            Transition.prototype.edit = function (t) {
                var duration = this.duration;
                var ease = this.ease;
                var delay = 0;
                t.duration(duration)
                    .delay(delay)
                    .ease(ease);
            };
            Transition.prototype.exit = function (t) {
                var duration = this.duration;
                var ease = this.ease;
                var delay = 0;
                t.duration(duration)
                    .delay(delay)
                    .ease(ease);
            };
            Transition.defaultDuration = 250;
            return Transition;
        }(Factory.BaseFactory));
        Factory.Transition = Transition;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        var Symbols;
        (function (Symbols) {
            'use strict';
            var HLine = (function (_super) {
                __extends(HLine, _super);
                function HLine() {
                    _super.apply(this, arguments);
                }
                HLine.prototype.create = function () {
                    this.svg = this.factoryMgr.get('container').symbols
                        .append('g')
                        .attr({ 'class': 'hlines' });
                    this.eventMgr.on('resize.' + this.key, this.softUpdate.bind(this));
                    this.eventMgr.on('pan.' + this.key, this.softUpdate.bind(this));
                    this.eventMgr.on('zoom-end.' + this.key, this.softUpdate.bind(this));
                    this.eventMgr.on('outer-world-domain-change.' + this.key, this.softUpdate.bind(this));
                };
                HLine.prototype.softUpdate = function () {
                    var xAxis = this.factoryMgr.get('x-axis');
                    var yAxes = {
                        y: this.factoryMgr.get('y-axis'),
                        y2: this.factoryMgr.get('y2-axis')
                    };
                    var hline = this.svg.selectAll('.hline')
                        .data(this.options.getSymbolsByType(n3Charts.Options.SymbolOptions.TYPE.HLINE), function (o) { return o.id; });
                    var init = function (selection) {
                        selection
                            .attr('class', 'hline')
                            .style({
                            'opacity': 0,
                            'stroke': function (o) { return o.color; }
                        });
                    };
                    var update = function (selection) {
                        selection.attr({
                            'x1': xAxis.scale(xAxis.getDomain()[0]),
                            'x2': xAxis.scale(xAxis.getDomain()[1]),
                            'y1': function (o) { return yAxes[o.axis].scale(o.value); },
                            'y2': function (o) { return yAxes[o.axis].scale(o.value); }
                        }).style({
                            'opacity': 1
                        });
                    };
                    if (this.factoryMgr.get('transitions').isOn()) {
                        hline.enter()
                            .append('svg:line')
                            .call(init)
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'enter'))
                            .call(update);
                        hline
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                            .call(update);
                        hline.exit()
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'exit'))
                            .style('opacity', 0)
                            .each('end', function () {
                            d3.select(this).remove();
                        });
                    }
                    else {
                        hline.enter()
                            .append('svg:line')
                            .call(init);
                        hline
                            .call(update);
                        hline.exit()
                            .remove();
                    }
                };
                HLine.prototype.update = function (data, options) {
                    this.options = options;
                    this.softUpdate();
                };
                HLine.prototype.destroy = function () {
                    this.svg.remove();
                };
                return HLine;
            }(Factory.BaseFactory));
            Symbols.HLine = HLine;
        })(Symbols = Factory.Symbols || (Factory.Symbols = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        var Symbols;
        (function (Symbols) {
            'use strict';
            var VLine = (function (_super) {
                __extends(VLine, _super);
                function VLine() {
                    _super.apply(this, arguments);
                }
                VLine.prototype.create = function () {
                    this.svg = this.factoryMgr.get('container').symbols
                        .append('g')
                        .attr({ 'class': 'vlines' });
                    this.eventMgr.on('resize.' + this.key, this.softUpdate.bind(this));
                    this.eventMgr.on('pan.' + this.key, this.softUpdate.bind(this));
                    this.eventMgr.on('zoom-end.' + this.key, this.softUpdate.bind(this));
                    this.eventMgr.on('outer-world-domain-change.' + this.key, this.softUpdate.bind(this));
                };
                VLine.prototype.softUpdate = function () {
                    var xAxis = this.factoryMgr.get('x-axis');
                    var yAxis = this.factoryMgr.get('y-axis');
                    var vline = this.svg.selectAll('.vline')
                        .data(this.options.getSymbolsByType(n3Charts.Options.SymbolOptions.TYPE.VLINE), function (o) { return o.id; });
                    var init = function (selection) {
                        selection
                            .attr('class', 'vline')
                            .style({
                            'opacity': 0,
                            'stroke': function (o) { return o.color; }
                        });
                    };
                    var update = function (selection) {
                        selection.attr({
                            'x1': function (o) { return xAxis.scale(o.value); },
                            'x2': function (o) { return xAxis.scale(o.value); },
                            'y1': yAxis.scale(yAxis.getDomain()[0]),
                            'y2': yAxis.scale(yAxis.getDomain()[1])
                        }).style({
                            'opacity': 1
                        });
                    };
                    if (this.factoryMgr.get('transitions').isOn()) {
                        vline.enter()
                            .append('svg:line')
                            .call(init)
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'enter'))
                            .call(update);
                        vline
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                            .call(update);
                        vline.exit()
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'exit'))
                            .style('opacity', 0)
                            .each('end', function () {
                            d3.select(this).remove();
                        });
                    }
                    else {
                        vline.enter()
                            .append('svg:line')
                            .call(init);
                        vline
                            .call(update);
                        vline.exit()
                            .remove();
                    }
                };
                VLine.prototype.update = function (data, options) {
                    this.options = options;
                    this.softUpdate();
                };
                VLine.prototype.destroy = function () {
                    this.svg.remove();
                };
                return VLine;
            }(Factory.BaseFactory));
            Symbols.VLine = VLine;
        })(Symbols = Factory.Symbols || (Factory.Symbols = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='HLine.ts' />
/// <reference path='VLine.ts' />
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        var Series;
        (function (Series) {
            'use strict';
            var SeriesFactory = (function (_super) {
                __extends(SeriesFactory, _super);
                function SeriesFactory() {
                    _super.apply(this, arguments);
                }
                SeriesFactory.prototype.create = function () {
                    this.createContainer(this.factoryMgr.get('container').data);
                    // Hard update
                    this.eventMgr.on('data-update.' + this.type, this.update.bind(this));
                    // Soft updates
                    this.eventMgr.on('pan.' + this.type, this.softUpdate.bind(this));
                    this.eventMgr.on('zoom-end.' + this.type, this.softUpdate.bind(this));
                    this.eventMgr.on('outer-world-domain-change.' + this.key, this.softUpdate.bind(this));
                    this.eventMgr.on('resize.' + this.type, this.softUpdate.bind(this));
                };
                SeriesFactory.prototype.update = function (data, options) {
                    this.data = data;
                    this.options = options;
                    this.softUpdate();
                };
                SeriesFactory.prototype.getAxes = function (series) {
                    return {
                        xAxis: this.factoryMgr.get('x-axis'),
                        yAxis: this.factoryMgr.get(series.axis + '-axis')
                    };
                };
                SeriesFactory.prototype.softUpdate = function () {
                    var series = this.options.getSeriesByType(this.type).filter(function (s) { return s.visible; });
                    this.updateSeriesContainer(series);
                };
                SeriesFactory.prototype.destroy = function () {
                    this.svg.remove();
                };
                SeriesFactory.prototype.createContainer = function (parent) {
                    this.svg = parent
                        .append('g')
                        .attr('class', this.type + SeriesFactory.containerClassSuffix);
                };
                SeriesFactory.prototype.updateSeriesContainer = function (series) {
                    var _this = this;
                    // Create a data join
                    var groups = this.svg
                        .selectAll('.' + this.type + SeriesFactory.seriesClassSuffix)
                        .data(series, function (d) { return d.id; });
                    // Create a new group for every new series
                    groups.enter()
                        .append('g')
                        .attr({
                        class: function (d) {
                            return _this.type + SeriesFactory.seriesClassSuffix + ' ' + d.id;
                        }
                    });
                    // Update all existing series groups
                    this.styleSeries(groups);
                    this.updateSeries(groups, series);
                    // Delete unused series groups
                    groups.exit()
                        .remove();
                };
                SeriesFactory.prototype.updateSeries = function (groups, series) {
                    // Workaround to retrieve the D3.Selection
                    // in the callback function (bound to keyword this)
                    var self = this;
                    groups.each(function (d, i) {
                        // Hmmmm TypeScript...
                        var group = d3.select(this);
                        self.updateData(group, d, i, series.length);
                    });
                };
                SeriesFactory.prototype.updateData = function (group, series, index, numSeries) {
                    // this needs to be overwritten
                };
                SeriesFactory.prototype.styleSeries = function (group) {
                    // this needs to be overwritten
                };
                SeriesFactory.containerClassSuffix = '-data';
                SeriesFactory.seriesClassSuffix = '-series';
                return SeriesFactory;
            }(n3Charts.Factory.BaseFactory));
            Series.SeriesFactory = SeriesFactory;
        })(Series = Factory.Series || (Factory.Series = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        var Series;
        (function (Series) {
            'use strict';
            var Dot = (function (_super) {
                __extends(Dot, _super);
                function Dot() {
                    _super.apply(this, arguments);
                    this.type = n3Charts.Options.SeriesOptions.TYPE.DOT;
                }
                Dot.prototype.updateData = function (group, series, index, numSeries) {
                    var _a = this.getAxes(series), xAxis = _a.xAxis, yAxis = _a.yAxis;
                    var dotsData = this.data.getDatasetValues(series, this.options).filter(series.defined);
                    var dotsRadius = 2;
                    var dots = group.selectAll('.' + this.type)
                        .data(dotsData, function (d) { return '' + d.x; });
                    var initPoint = function (s) {
                        s.attr({
                            r: function (d) { return dotsRadius; },
                            cx: function (d) { return xAxis.scale(d.x); },
                            cy: function (d) { return yAxis.range()[0]; }
                        });
                    };
                    var updatePoint = function (s) {
                        s.attr({
                            r: function (d) { return dotsRadius; },
                            cx: function (d) { return xAxis.scale(d.x); },
                            cy: function (d) { return yAxis.scale(d.y1); }
                        })
                            .style('opacity', series.visible ? 1 : 0);
                    };
                    if (this.factoryMgr.get('transitions').isOn()) {
                        dots.enter()
                            .append('circle')
                            .attr('class', this.type)
                            .call(this.eventMgr.datumEnter(series, this.options))
                            .call(this.eventMgr.datumOver(series, this.options))
                            .call(this.eventMgr.datumMove(series, this.options))
                            .call(this.eventMgr.datumLeave(series, this.options))
                            .call(initPoint)
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'enter'))
                            .call(updatePoint);
                        dots
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                            .call(updatePoint);
                        dots.exit()
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'exit'))
                            .call(initPoint)
                            .each('end', function () {
                            d3.select(this).remove();
                        });
                    }
                    else {
                        dots.enter()
                            .append('circle')
                            .attr('class', this.type)
                            .call(this.eventMgr.datumEnter(series, this.options))
                            .call(this.eventMgr.datumOver(series, this.options))
                            .call(this.eventMgr.datumMove(series, this.options))
                            .call(this.eventMgr.datumLeave(series, this.options))
                            .call(updatePoint);
                        dots
                            .call(updatePoint);
                        dots.exit()
                            .remove();
                    }
                };
                Dot.prototype.styleSeries = function (group) {
                    group.style({
                        'stroke': function (d) { return d.color; }
                    });
                };
                return Dot;
            }(Factory.Series.SeriesFactory));
            Series.Dot = Dot;
        })(Series = Factory.Series || (Factory.Series = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        var Series;
        (function (Series) {
            'use strict';
            var Line = (function (_super) {
                __extends(Line, _super);
                function Line() {
                    _super.apply(this, arguments);
                    this.type = n3Charts.Options.SeriesOptions.TYPE.LINE;
                }
                Line.prototype.updateData = function (group, series, index, numSeries) {
                    group.classed('dashed', series.isDashed());
                    var _a = this.getAxes(series), xAxis = _a.xAxis, yAxis = _a.yAxis;
                    var lineData = this.data.getDatasetValues(series, this.options);
                    var initLine = d3.svg.line()
                        .defined(series.defined)
                        .x(function (d) { return xAxis.scale(d.x); })
                        .y((yAxis.range()[0]))
                        .interpolate(series.interpolation.mode)
                        .tension(series.interpolation.tension);
                    var updateLine = d3.svg.line()
                        .defined(series.defined)
                        .x(function (d) { return xAxis.scale(d.x); })
                        .y(function (d) { return yAxis.scale(d.y1); })
                        .interpolate(series.interpolation.mode)
                        .tension(series.interpolation.tension);
                    var line = group.selectAll('.' + this.type)
                        .data([lineData]);
                    if (this.factoryMgr.get('transitions').isOn()) {
                        line.enter()
                            .append('path')
                            .attr('class', this.type)
                            .attr('d', function (d) { return initLine(d); })
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'enter'))
                            .attr('d', function (d) { return updateLine(d); });
                        line
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                            .attr('d', function (d) { return updateLine(d); })
                            .style('opacity', series.visible ? 1 : 0);
                        line.exit()
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'exit'))
                            .attr('d', function (d) { return initLine(d); })
                            .each('end', function () {
                            d3.select(this).remove();
                        });
                    }
                    else {
                        line.enter()
                            .append('path')
                            .attr('class', this.type)
                            .attr('d', function (d) { return updateLine(d); });
                        line
                            .attr('d', function (d) { return updateLine(d); })
                            .style('opacity', series.visible ? 1 : 0);
                        line.exit()
                            .remove();
                    }
                };
                Line.prototype.styleSeries = function (group) {
                    group.style({
                        'fill': 'none',
                        'stroke': function (s) { return s.color; },
                        'stroke-dasharray': function (s) { return s.isDashed() ? '10,3' : undefined; }
                    });
                };
                return Line;
            }(Factory.Series.SeriesFactory));
            Series.Line = Line;
        })(Series = Factory.Series || (Factory.Series = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        var Series;
        (function (Series) {
            'use strict';
            var Area = (function (_super) {
                __extends(Area, _super);
                function Area() {
                    _super.apply(this, arguments);
                    this.type = n3Charts.Options.SeriesOptions.TYPE.AREA;
                }
                Area.prototype.updateData = function (group, series, index, numSeries) {
                    var _a = this.getAxes(series), xAxis = _a.xAxis, yAxis = _a.yAxis;
                    var areaData = this.data.getDatasetValues(series, this.options);
                    var initArea = d3.svg.area()
                        .defined(series.defined)
                        .x(function (d) { return xAxis.scale(d.x); })
                        .y0((yAxis.range()[0]))
                        .y1((yAxis.range()[0]))
                        .interpolate(series.interpolation.mode)
                        .tension(series.interpolation.tension);
                    var updateArea = d3.svg.area()
                        .defined(series.defined)
                        .x(function (d) { return xAxis.scale(d.x); })
                        .y0(function (d) { return isNaN(yAxis.scale(d.y0)) ? yAxis.range()[0] : yAxis.scale(d.y0); })
                        .y1(function (d) { return yAxis.scale(d.y1); })
                        .interpolate(series.interpolation.mode)
                        .tension(series.interpolation.tension);
                    var area = group.selectAll('.' + this.type)
                        .data([areaData]);
                    if (this.factoryMgr.get('transitions').isOn()) {
                        area.enter()
                            .append('path')
                            .attr('class', this.type)
                            .attr('d', function (d) { return initArea(d); })
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'enter'))
                            .attr('d', function (d) { return updateArea(d); });
                        area
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                            .attr('d', function (d) { return updateArea(d); })
                            .style('opacity', series.visible ? 1 : 0);
                        area.exit()
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'exit'))
                            .attr('d', function (d) { return initArea(d); })
                            .each('end', function () { d3.select(this).remove(); });
                    }
                    else {
                        area.enter()
                            .append('path')
                            .attr('class', this.type)
                            .attr('d', function (d) { return updateArea(d); });
                        area
                            .attr('d', function (d) { return updateArea(d); })
                            .style('opacity', series.visible ? 1 : 0);
                        area.exit()
                            .remove();
                    }
                };
                Area.prototype.styleSeries = function (group) {
                    group.style({
                        'fill': function (s) { return s.color; },
                        'stroke': function (s) { return s.color; }
                    });
                };
                return Area;
            }(Factory.Series.SeriesFactory));
            Series.Area = Area;
        })(Series = Factory.Series || (Factory.Series = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        var Series;
        (function (Series) {
            'use strict';
            var Column = (function (_super) {
                __extends(Column, _super);
                function Column() {
                    _super.apply(this, arguments);
                    this.type = n3Charts.Options.SeriesOptions.TYPE.COLUMN;
                    this.gapFactor = 0.2;
                    this.outerPadding = (this.gapFactor / 2) * 3;
                    this.columnsWidth = 0;
                }
                Column.prototype.softUpdate = function () {
                    var series = this.options.getSeriesByType(this.type).filter(function (s) { return s.visible; });
                    this.updateColumnsWidth(series, this.options);
                    this.updateColumnScale(series, this.options);
                    this.updateSeriesContainer(series);
                };
                Column.prototype.update = function (data, options) {
                    this.data = data;
                    this.options = options;
                    var series = options.getSeriesByType(this.type).filter(function (s) { return s.visible; });
                    this.updateColumnsWidth(series, options);
                    this.updateColumnScale(series, options);
                    this.updateSeriesContainer(series);
                };
                Column.prototype.updateColumnsWidth = function (series, options) {
                    var xAxis = this.factoryMgr.get('x-axis');
                    var colsDatasets = this.data.getDatasets(series, options);
                    var delta = n3Charts.Utils.Data.getMinDistance(colsDatasets, xAxis, 'x');
                    this.columnsWidth = delta < Number.MAX_VALUE ? delta / series.length : 10;
                };
                Column.prototype.updateColumnScale = function (series, options) {
                    var halfWidth = this.columnsWidth * series.length / 2;
                    this.innerXScale = d3.scale.ordinal()
                        .domain(series.map(function (s) { return s.id; }))
                        .rangeBands([-halfWidth, halfWidth], 0, 0.1);
                };
                Column.prototype.getTooltipPosition = function (series) {
                    return this.innerXScale(series.id) + this.innerXScale.rangeBand() / 2;
                };
                Column.prototype.updateData = function (group, series, index, numSeries) {
                    var _this = this;
                    var _a = this.getAxes(series), xAxis = _a.xAxis, yAxis = _a.yAxis;
                    var colsData = this.data.getDatasetValues(series, this.options).filter(series.defined);
                    var xFn = function (d) { return xAxis.scale(d.x) + _this.innerXScale(series.id); };
                    var initCol = function (s) {
                        s.attr({
                            x: xFn,
                            y: function (d) { return yAxis.scale(d.y0); },
                            width: _this.innerXScale.rangeBand(),
                            height: 0
                        });
                    };
                    var updateCol = function (s) {
                        s.attr({
                            x: xFn,
                            y: function (d) { return d.y1 > 0 ? yAxis.scale(d.y1) : yAxis.scale(d.y0); },
                            width: _this.innerXScale.rangeBand(),
                            height: function (d) { return Math.abs(yAxis.scale(d.y0) - yAxis.scale(d.y1)); }
                        })
                            .style('opacity', series.visible ? 1 : 0);
                    };
                    var cols = group.selectAll('.' + this.type)
                        .data(colsData, function (d) { return '' + d.x; });
                    if (this.factoryMgr.get('transitions').isOn()) {
                        cols.enter()
                            .append('rect')
                            .attr('class', this.type)
                            .call(this.eventMgr.datumEnter(series, this.options))
                            .call(this.eventMgr.datumOver(series, this.options))
                            .call(this.eventMgr.datumMove(series, this.options))
                            .call(this.eventMgr.datumLeave(series, this.options))
                            .call(initCol)
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'enter'))
                            .call(updateCol);
                        cols
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'edit'))
                            .call(updateCol);
                        cols.exit()
                            .transition()
                            .call(this.factoryMgr.getBoundFunction('transitions', 'exit'))
                            .call(initCol)
                            .each('end', function () {
                            d3.select(this).remove();
                        });
                    }
                    else {
                        cols.enter()
                            .append('rect')
                            .attr('class', this.type)
                            .call(this.eventMgr.datumEnter(series, this.options))
                            .call(this.eventMgr.datumOver(series, this.options))
                            .call(this.eventMgr.datumMove(series, this.options))
                            .call(this.eventMgr.datumLeave(series, this.options))
                            .call(updateCol);
                        cols
                            .call(updateCol);
                        cols.exit()
                            .remove();
                    }
                };
                Column.prototype.styleSeries = function (group) {
                    group.style({
                        'fill': function (d) { return d.color; },
                        'stroke': function (d) { return d.color; },
                        'stroke-width': 1
                    });
                };
                return Column;
            }(Factory.Series.SeriesFactory));
            Series.Column = Column;
        })(Series = Factory.Series || (Factory.Series = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='SeriesFactory.ts' />
/// <reference path='Dot.ts' />
/// <reference path='Line.ts' />
/// <reference path='Area.ts' />
/// <reference path='Column.ts' />
/// <reference path='BaseFactory.ts' />
/// <reference path='Container.ts' />
/// <reference path='Tooltip.ts' />
/// <reference path='Legend.ts' />
/// <reference path='Axis.ts' />
/// <reference path='Grid.ts' />
/// <reference path='Zoom.ts' />
/// <reference path='Pan.ts' />
/// <reference path='Transition.ts' />
/// <reference path='symbols/_index.ts' />
/// <reference path='series/_index.ts' />
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var AngularJSSyncLayer = (function (_super) {
            __extends(AngularJSSyncLayer, _super);
            function AngularJSSyncLayer(scope, attributes, $parse) {
                _super.call(this);
                this.scope = scope;
                this.attributes = attributes;
                this.$parse = $parse;
            }
            AngularJSSyncLayer.prototype.create = function () {
                this.unregisteringFunctions = [];
                this.sanitizeAttributes();
                this.syncTooltips();
                this.syncDomainsChange();
                this.syncDatumEvents();
            };
            AngularJSSyncLayer.prototype.sanitizeAttributes = function () {
                var _a = this.attributes, tooltipSyncKey = _a.tooltipSyncKey, domainsSyncKey = _a.domainsSyncKey;
                if (!!tooltipSyncKey && !!domainsSyncKey) {
                    if (tooltipSyncKey === domainsSyncKey) {
                        throw new Error('Heterogeneous sync keys can\'t have the same value.');
                    }
                }
            };
            AngularJSSyncLayer.prototype.syncDatumEvents = function () {
                var _this = this;
                var eventMgr = this.eventMgr;
                if (!!this.attributes.onClick) {
                    var onClick = this.$parse(this.attributes.onClick);
                    eventMgr.on('click.sync-layer', function (d, i, series, options) {
                        onClick(_this.scope.$parent, { row: d, index: i, series: series, options: options });
                    });
                }
            };
            AngularJSSyncLayer.prototype.syncTooltips = function () {
                var _this = this;
                var eventMgr = this.eventMgr;
                if (!!this.attributes.tooltipSyncKey) {
                    this.unregisteringFunctions.push(this.scope.$root.$on(this.attributes.tooltipSyncKey, function (event, value) {
                        eventMgr.triggerDataAndOptions('outer-world-hover', value);
                    }));
                    eventMgr.on('container-move.sync-layer', function (event) {
                        _this.scope.$emit(_this.attributes.tooltipSyncKey, _this.factoryMgr.get('container').getCoordinatesFromEvent(event));
                    });
                    eventMgr.on('container-out.sync-layer', function () {
                        _this.scope.$emit(_this.attributes.tooltipSyncKey, { x: undefined, y: undefined });
                    });
                }
            };
            AngularJSSyncLayer.prototype.syncDomainsChange = function () {
                var _this = this;
                var eventMgr = this.eventMgr;
                var callbacks = [];
                var xAxis = this.factoryMgr.get('x-axis');
                var x2Axis = this.factoryMgr.get('x2-axis');
                var yAxis = this.factoryMgr.get('y-axis');
                var y2Axis = this.factoryMgr.get('y2-axis');
                if (!!this.attributes.onDomainsChange) {
                    var onDomainsChange = this.$parse(this.attributes.onDomainsChange);
                    callbacks.push(function (domains, _a) {
                        var isEndEvent = _a.isEndEvent;
                        if (isEndEvent) {
                            onDomainsChange(_this.scope.$parent, { $domains: domains });
                        }
                    });
                }
                if (!!this.attributes.domainsSyncKey) {
                    this.unregisteringFunctions.push(this.scope.$root.$on(this.attributes.domainsSyncKey, function (event, domains, type) {
                        if (event.targetScope === _this.scope) {
                            return;
                        }
                        if (!domains.x || !domains.y || !domains.x2 || !domains.y2) {
                            domains = angular.copy(domains);
                        }
                        if (!domains.x) {
                            domains.x = xAxis.getScaleDomain();
                        }
                        if (!domains.x2) {
                            domains.x2 = x2Axis.getScaleDomain();
                        }
                        if (!domains.y) {
                            domains.y = yAxis.getScaleDomain();
                        }
                        if (!domains.y2) {
                            domains.y2 = y2Axis.getScaleDomain();
                        }
                        if (type === 'zoom-end') {
                            eventMgr.trigger('outer-world-domain-change', domains);
                            _this.factoryMgr.turnFactoriesOn(['tooltip']);
                        }
                        else if (type === 'zoom') {
                            _this.factoryMgr.turnFactoriesOff(['tooltip']);
                        }
                        else if (type === 'pan' || type === 'pan-end') {
                            _this.factoryMgr.turnFactoriesOff(['transitions', 'tooltip']);
                            eventMgr.trigger('outer-world-domain-change', domains);
                            if (type === 'pan-end') {
                                _this.factoryMgr.turnFactoriesOn(['transitions', 'tooltip']);
                            }
                        }
                        else if (type === 'zoom-pan-reset') {
                            eventMgr.trigger('zoom-pan-reset', false);
                        }
                    }));
                    callbacks.push(function (domains, _a) {
                        var type = _a.type;
                        _this.scope.$emit(_this.attributes.domainsSyncKey, domains, type);
                    });
                }
                var getDomains = function () {
                    return {
                        x: xAxis.getScaleDomain(),
                        x2: x2Axis.getScaleDomain(),
                        y: yAxis.getScaleDomain(),
                        y2: y2Axis.getScaleDomain()
                    };
                };
                var ping = function (domains, args) { return callbacks.forEach(function (fn) { return fn(domains, args); }); };
                eventMgr.on('pan.sync-layer', function () {
                    var domains = getDomains();
                    _this.factoryMgr.get('pan').constrainDomains(domains);
                    ping(domains, { type: 'pan' });
                });
                eventMgr.on('pan-end.sync-layer', function () {
                    var domains = getDomains();
                    _this.factoryMgr.get('pan').constrainDomains(domains);
                    ping(domains, { type: 'pan-end', isEndEvent: true });
                });
                eventMgr.on('zoom.sync-layer', function () {
                    var domains = getDomains();
                    _this.factoryMgr.get('zoom').constrainOutgoingDomains(domains);
                    ping(domains, { type: 'zoom', isEndEvent: false });
                });
                eventMgr.on('zoom-end.sync-layer', function () {
                    var domains = getDomains();
                    _this.factoryMgr.get('zoom').constrainOutgoingDomains(domains);
                    ping(domains, { type: 'zoom-end', isEndEvent: true });
                });
                eventMgr.on('zoom-pan-reset.sync-layer', function (madeHere) {
                    if (madeHere) {
                        ping(getDomains(), { type: 'zoom-pan-reset', isEndEvent: true });
                    }
                });
            };
            AngularJSSyncLayer.prototype.destroy = function () {
                var fn;
                while (fn = this.unregisteringFunctions.pop()) {
                    fn();
                }
            };
            return AngularJSSyncLayer;
        }(Factory.BaseFactory));
        Factory.AngularJSSyncLayer = AngularJSSyncLayer;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='../../typings/browser.d.ts' />
/// <reference path='../svg/_index.ts' />
/// <reference path='../options/_index.ts' />
/// <reference path='../utils/_index.ts' />
/// <reference path='../factories/_index.ts' />
/// <reference path='./SyncLayer.ts' />
var n3Charts;
(function (n3Charts) {
    'use strict';
    var LineChart = (function () {
        function LineChart($window, $parse, $timeout, $rootScope) {
            var _this = this;
            this.$window = $window;
            this.$parse = $parse;
            this.$timeout = $timeout;
            this.$rootScope = $rootScope;
            this.scope = {
                data: '=',
                options: '=',
                styles: '=',
                hoveredCoordinates: '='
            };
            this.restrict = 'E';
            this.replace = true;
            this.template = '<div></div>';
            this.link = function (scope, element, attributes) {
                var data;
                var options;
                var eventMgr = new n3Charts.Utils.EventManager();
                var factoryMgr = new n3Charts.Utils.FactoryManager();
                eventMgr.init(n3Charts.Utils.EventManager.EVENTS);
                factoryMgr.registerMany([
                    ['container', n3Charts.Factory.Container, element[0]],
                    ['tooltip', n3Charts.Factory.Tooltip, element[0]],
                    ['legend', n3Charts.Factory.Legend, element[0]],
                    ['transitions', n3Charts.Factory.Transition],
                    ['x-axis', n3Charts.Factory.Axis, n3Charts.Options.AxisOptions.SIDE.X],
                    ['x2-axis', n3Charts.Factory.Axis, n3Charts.Options.AxisOptions.SIDE.X2],
                    ['y-axis', n3Charts.Factory.Axis, n3Charts.Options.AxisOptions.SIDE.Y],
                    ['y2-axis', n3Charts.Factory.Axis, n3Charts.Options.AxisOptions.SIDE.Y2],
                    ['grid', n3Charts.Factory.Grid],
                    ['pan', n3Charts.Factory.Pan],
                    ['zoom', n3Charts.Factory.Zoom],
                    ['sync-layer', n3Charts.Factory.AngularJSSyncLayer, scope, attributes, _this.$parse],
                    // This order is important, otherwise it can mess up with the tooltip
                    // (and you don't want to mess up with a tooltip, trust me).
                    ['series-area', n3Charts.Factory.Series.Area],
                    ['series-column', n3Charts.Factory.Series.Column],
                    ['series-line', n3Charts.Factory.Series.Line],
                    ['series-dot', n3Charts.Factory.Series.Dot],
                    ['symbols-hline', n3Charts.Factory.Symbols.HLine],
                    ['symbols-vline', n3Charts.Factory.Symbols.VLine]
                ]);
                factoryMgr.all().forEach(function (f) { return f.instance.init(f.key, eventMgr, factoryMgr); });
                var deferredCreation = scope.options === undefined;
                var updateAll = function () {
                    options = new n3Charts.Options.Options(angular.copy(scope.options));
                    data = new n3Charts.Utils.Data(scope.data);
                    if (deferredCreation) {
                        deferredCreation = false;
                        eventMgr.trigger('create', options);
                    }
                    eventMgr.update(data, options);
                    eventMgr.trigger('update', data, options);
                };
                if (!deferredCreation) {
                    eventMgr.trigger('create', new n3Charts.Options.Options(angular.copy(scope.options)));
                }
                var updateData = function (_data) {
                    if (!_data) {
                        return;
                    }
                    data.fromJS(_data);
                    factoryMgr.turnFactoriesOff(['transitions']);
                    eventMgr.trigger('data-update', data, options);
                    factoryMgr.turnFactoriesOn(['transitions']);
                    eventMgr.trigger('update', data, options);
                };
                scope.$watch('options', updateAll, true);
                scope.$watch('data', updateData, true);
                eventMgr.on('legend-click.directive', function (series) {
                    var foundSeries = scope.options.series.filter(function (s) { return s.id === series.id; })[0];
                    foundSeries.visible = series.getToggledVisibility();
                    scope.$apply();
                });
                eventMgr.on('pan.directive', function () {
                    factoryMgr.get('container').svg.classed('panning', true);
                });
                eventMgr.on('pan-end.directive', function () {
                    factoryMgr.get('container').svg.classed('panning', false);
                });
                var getDimensions = function () {
                    if (!element || !element[0]) {
                        return {};
                    }
                    var rect = element[0].parentElement.getBoundingClientRect();
                    return {
                        height: rect.height,
                        width: rect.width,
                        left: rect.left,
                        right: rect.right,
                        bottom: rect.bottom,
                        top: rect.top
                    };
                };
                var debouncedResizeEventEmitter = n3Charts.Utils.FunctionUtils.debounce(function () {
                    eventMgr.trigger('resize', element[0].parentElement);
                }, 50);
                scope.$watch(getDimensions, debouncedResizeEventEmitter, true);
                var debouncedApplier = n3Charts.Utils.FunctionUtils.debounce(function () { return scope.$apply(); }, 50);
                angular.element(_this.$window).on('resize', debouncedApplier);
                // Trigger the destroy event
                scope.$on('$destroy', function () {
                    eventMgr.trigger('destroy');
                    angular.element(_this.$window).off('resize', debouncedApplier);
                });
            };
        }
        return LineChart;
    }());
    n3Charts.LineChart = LineChart;
})(n3Charts || (n3Charts = {}));
/// <reference path='../../typings/browser.d.ts' />
/// <reference path='./LineChart.ts' />
// Create the angular module
angular.module('n3-line-chart', [])
    .directive('linechart', [
    '$window', '$parse', '$timeout', '$rootScope',
    function ($window, $parse, $timeout, $rootScope) { return new n3Charts.LineChart($window, $parse, $timeout, $rootScope); }
]);
