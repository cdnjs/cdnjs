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
                var eventMgr = new n3Charts.Utils.EventManager();
                var factoryMgr = new n3Charts.Utils.FactoryManager();
                // Initialize global events
                eventMgr.init(n3Charts.Utils.EventManager.EVENTS);
                // Register all factories
                // Note: we can apply additional arguments to each factory
                factoryMgr.registerMany([
                    ['container', n3Charts.Factory.Container, element[0]],
                    ['tooltip', n3Charts.Factory.Tooltip, element[0]],
                    ['legend', n3Charts.Factory.Legend, element[0]],
                    ['transitions', n3Charts.Factory.Transition],
                    ['x-axis', n3Charts.Factory.Axis, n3Charts.Utils.AxisOptions.SIDE.X],
                    ['y-axis', n3Charts.Factory.Axis, n3Charts.Utils.AxisOptions.SIDE.Y],
                    ['y2-axis', n3Charts.Factory.Axis, n3Charts.Utils.AxisOptions.SIDE.Y2],
                    ['grid', n3Charts.Factory.Grid],
                    ['zoom', n3Charts.Factory.Zoom],
                    // This order is important, otherwise it can mess up with the tooltip
                    // (and you don't want to mess up with a tooltip, trust me).
                    ['series-area', n3Charts.Factory.Series.Area],
                    ['series-column', n3Charts.Factory.Series.Column],
                    ['series-line', n3Charts.Factory.Series.Line],
                    ['series-dot', n3Charts.Factory.Series.Dot]
                ]);
                // Initialize all factories
                factoryMgr.all().forEach(function (f) { return f.instance.init(f.key, eventMgr, factoryMgr); });
                // When options aren't defined at startup (when used inside a directive, for example)
                // we need to wait until they are to create the chart.
                var deferredCreation = scope.options === undefined;
                // Unwrap native options and update the chart
                var data, options;
                var update = function () {
                    // Call the update event with a copy of the options
                    // and data to avoid infinite digest loop
                    options = new n3Charts.Utils.Options(angular.copy(scope.options));
                    data = new n3Charts.Utils.Data(angular.copy(scope.data));
                    if (deferredCreation) {
                        deferredCreation = false;
                        eventMgr.trigger('create', options);
                        eventMgr.trigger('resize', element[0].parentElement);
                    }
                    // Update the eventMgr itself
                    eventMgr.update(data, options);
                    // Trigger the update event
                    eventMgr.trigger('update', data, options);
                };
                // Trigger the create event
                if (!deferredCreation) {
                    eventMgr.trigger('create', new n3Charts.Utils.Options(angular.copy(scope.options)));
                    eventMgr.trigger('resize', element[0].parentElement);
                }
                // We use $watch because both options and data
                // are objects and not arrays
                scope.$watch('[options, data]', update, true);
                eventMgr.on('legend-click.directive', function (series) {
                    var foundSeries = scope.options.series.filter(function (s) { return s.id === series.id; })[0];
                    foundSeries.visible = series.getToggledVisibility();
                    scope.$apply();
                });
                if (attributes.syncKey) {
                    _this.$rootScope.$on(attributes.syncKey, function (event, value) {
                        if (!data || !options) {
                            return;
                        }
                        factoryMgr.get('tooltip').showFromCoordinates(value, data, options);
                    });
                    eventMgr.on('container-move.directive', function (event) {
                        scope.$emit(attributes.syncKey, factoryMgr.get('container').getCoordinatesFromEvent(event));
                    });
                    eventMgr.on('container-out.directive', function () {
                        scope.$emit(attributes.syncKey, { x: undefined, y: undefined });
                    });
                }
                scope.elementDimensions = {};
                var $timeout = _this.$timeout;
                var debounce = function (callback, interval) {
                    var t = null;
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i - 0] = arguments[_i];
                        }
                        $timeout.cancel(t);
                        t = $timeout(function () { return callback.apply(_this, args); }, interval);
                    };
                };
                var resizeCb = debounce(function (event) {
                    var rect = element[0].parentElement.getBoundingClientRect();
                    scope.elementDimensions.height = rect.height;
                    scope.elementDimensions.width = rect.width;
                    scope.elementDimensions.left = rect.left;
                    scope.elementDimensions.right = rect.right;
                    scope.elementDimensions.bottom = rect.bottom;
                    scope.elementDimensions.top = rect.top;
                    scope.$apply();
                }, 50);
                angular.element(_this.$window).on('resize', resizeCb);
                // Watching the dimensions instead of updating when resize event occurs
                // allows to redraw _only_ when the element itself was actually resized
                scope.$watch('elementDimensions', function () {
                    eventMgr.trigger('resize', element[0].parentElement);
                    update();
                }, true);
                // Trigger the destroy event
                scope.$on('$destroy', function () {
                    eventMgr.trigger('destroy');
                    angular.element(_this.$window).off();
                });
            };
        }
        return LineChart;
    })();
    n3Charts.LineChart = LineChart;
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var EventManager = (function () {
            function EventManager() {
            }
            EventManager.prototype.init = function (events) {
                // Generate a new d3.dispatch event dispatcher
                this._dispatch = d3.dispatch.apply(this, events);
                // Support chaining
                return this;
            };
            EventManager.prototype.update = function (data, options) {
                this.data = data;
                this.options = options;
                return;
            };
            EventManager.prototype.on = function (event, callback) {
                // Register an event listener
                // TODO We need to add an $apply() in here
                this._dispatch.on(event, callback);
                // Support chaining
                return this;
            };
            EventManager.prototype.trigger = function (event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    args[_i - 1] = arguments[_i];
                }
                // Trigger an event, and call the event handler
                this._dispatch[event].apply(this, args);
                // Support chaining
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
            EventManager.EVENTS = [
                'create',
                'update',
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
                'zoom',
            ];
            return EventManager;
        })();
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
                // Return the complete stack
                return this._factoryStack;
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
        })();
        Utils.FactoryManager = FactoryManager;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var BaseFactory = (function () {
            function BaseFactory() {
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
        })();
        Utils.BaseFactory = BaseFactory;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var SeriesFactory = (function (_super) {
            __extends(SeriesFactory, _super);
            function SeriesFactory() {
                _super.apply(this, arguments);
            }
            SeriesFactory.prototype.update = function (data, options) {
                this.data = data;
                this.options = options;
                this.softUpdate();
            };
            SeriesFactory.prototype.softUpdate = function () {
                var series = this.options.getSeriesByType(this.type).filter(function (s) { return s.visible; });
                this.updateSeriesContainer(series);
            };
            SeriesFactory.prototype.create = function () {
                this.createContainer(this.factoryMgr.get('container').data);
                this.eventMgr.on('zoom.' + this.type, this.softUpdate.bind(this));
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
        })(Utils.BaseFactory);
        Utils.SeriesFactory = SeriesFactory;
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
        })();
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
                for (var key in js) {
                    if (js.hasOwnProperty(key)) {
                        js[key] = new Utils.Dataset(js[key], key);
                    }
                }
                this.sets = js;
            };
            Data.prototype.getDatasets = function (series, options) {
                var _this = this;
                return series.map(function (d) { return _this.getDatasetValues(d, options); });
            };
            Data.prototype.getDatasetValues = function (series, options) {
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
            Data.getMinDistance = function (data, scale, key, range) {
                if (key === void 0) { key = 'x'; }
                return d3.min(
                // Compute the minimum difference along an axis on all series
                data.map(function (series) {
                    // Compute minimum delta
                    return series
                        .map(function (d) { return scale(d[key]); })
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
        })();
        Utils.Data = Data;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var SeriesOptions = (function () {
            function SeriesOptions(js) {
                if (js === void 0) { js = {}; }
                this.axis = 'y';
                this.type = ['line'];
                this.visible = true;
                this.defined = function (v) { return true; };
                var options = this.sanitizeOptions(js);
                this.id = options.id || Utils.Options.uuid();
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
                var options = {};
                // Extend the default options
                angular.extend(options, this, js);
                options.axis = this.sanitizeAxis(options.axis);
                options.interpolation = this.sanitizeInterpolation(options.interpolation);
                options.id = Utils.Options.getString(options.id);
                options.type = Utils.Options.getArray(options.type);
                options.dataset = Utils.Options.getString(options.dataset);
                options.key = this.sanitizeKeys(options.key);
                options.color = Utils.Options.getString(options.color);
                options.label = Utils.Options.getString(options.label);
                options.visible = Utils.Options.getBoolean(options.visible);
                options.defined = Utils.Options.getFunction(options.defined);
                return options;
            };
            SeriesOptions.prototype.sanitizeInterpolation = function (js) {
                if (!js) {
                    return { mode: 'linear', tension: 0.7 };
                }
                return {
                    mode: Utils.Options.getString(js.mode, 'linear'),
                    tension: Utils.Options.getNumber(js.tension, 0.7)
                };
            };
            SeriesOptions.prototype.sanitizeKeys = function (js) {
                if (!js) {
                    return { y1: undefined };
                }
                if (typeof js === 'string') {
                    return { y1: Utils.Options.getString(js) };
                }
                return {
                    y0: Utils.Options.getString(js.y0),
                    y1: Utils.Options.getString(js.y1)
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
                if (['y'].indexOf(axis) === -1) {
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
        })();
        Utils.SeriesOptions = SeriesOptions;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var AxisOptions = (function () {
            function AxisOptions(js) {
                if (js === void 0) { js = {}; }
                this.type = 'linear';
                this.key = 'x';
                this.ticksShift = {
                    x: 0,
                    y: 0
                };
                this.parse(js);
            }
            AxisOptions.prototype.parse = function (js) {
                this.type = Utils.Options.getString(js.type, 'linear');
                this.key = js.key;
                this.tickFormat = Utils.Options.getFunction(js.tickFormat);
                this.ticks = js.ticks;
                if (js.ticksShift) {
                    this.ticksShift = {
                        x: Utils.Options.getNumber(js.ticksShift.x, 0),
                        y: Utils.Options.getNumber(js.ticksShift.y, 0)
                    };
                }
                if (this.type === AxisOptions.TYPE.LINEAR) {
                    this.min = Utils.Options.getNumber(js.min, undefined);
                    this.max = Utils.Options.getNumber(js.max, undefined);
                }
                else if (this.type === AxisOptions.TYPE.DATE) {
                    this.min = Utils.Options.getDate(js.min, undefined);
                    this.max = Utils.Options.getDate(js.max, undefined);
                }
            };
            AxisOptions.isValidSide = function (side) {
                return d3.values(AxisOptions.SIDE).indexOf(side) !== -1;
            };
            AxisOptions.prototype.configure = function (axis) {
                axis.tickFormat(this.tickFormat);
                if (this.ticks instanceof Array) {
                    axis.tickValues(this.ticks);
                }
                else if (typeof this.ticks === 'number') {
                    axis.ticks(this.ticks);
                }
                return axis;
            };
            AxisOptions.SIDE = {
                X: 'x',
                Y: 'y',
                Y2: 'y2'
            };
            AxisOptions.TYPE = {
                LINEAR: 'linear',
                DATE: 'date',
                LOG: 'log'
            };
            return AxisOptions;
        })();
        Utils.AxisOptions = AxisOptions;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        ;
        var Options = (function () {
            function Options(js) {
                this.series = [];
                this.pan = {
                    x: false,
                    y: false
                };
                this.axes = {
                    x: {},
                    y: {}
                };
                this.margin = {
                    top: 0,
                    left: 40,
                    bottom: 40,
                    right: 40
                };
                this.grid = {
                    x: false,
                    y: true
                };
                var options = this.sanitizeOptions(js);
                this.margin = options.margin;
                this.series = options.series;
                this.axes = options.axes;
                this.pan = options.pan;
                this.grid = options.grid;
                this.tooltipHook = options.tooltipHook;
            }
            /**
             * Make sure that the options have proper types,
             * and convert raw js to typed variables
             */
            Options.prototype.sanitizeOptions = function (js) {
                var options = {};
                // Extend the default options
                angular.extend(options, this, js);
                options.margin = this.sanitizeMargin(Options.getObject(options.margin, this.margin));
                options.series = this.sanitizeSeries(Options.getArray(options.series));
                options.axes = this.sanitizeAxes(Options.getObject(options.axes, this.axes));
                options.grid = this.sanitizeTwoAxesOptions(options.grid, this.grid);
                options.pan = this.sanitizeTwoAxesOptions(options.pan, this.pan);
                options.tooltipHook = Options.getFunction(options.tooltipHook);
                return options;
            };
            Options.prototype.sanitizeMargin = function (margin) {
                return {
                    top: Options.getNumber(margin.top, 0),
                    left: Options.getNumber(margin.left, 0),
                    bottom: Options.getNumber(margin.bottom, 0),
                    right: Options.getNumber(margin.right, 0)
                };
            };
            Options.prototype.sanitizeSeries = function (series) {
                return (series).map(function (s) { return new Utils.SeriesOptions(s); });
            };
            Options.prototype.sanitizeTwoAxesOptions = function (object, def) {
                var g = {
                    x: Options.getBoolean(object.x, def.x),
                    y: Options.getBoolean(object.y, def.y)
                };
                return g;
            };
            Options.prototype.sanitizeAxes = function (axes) {
                // Map object keys and return a new object
                return Object.keys(axes).reduce(function (prev, key) {
                    prev[key] = new Utils.AxisOptions(axes[key]);
                    return prev;
                }, {});
            };
            Options.prototype.getAbsKey = function () {
                if (!this.axes[Utils.AxisOptions.SIDE.X]) {
                    throw new TypeError('Cannot find abs key : ' + Utils.AxisOptions.SIDE.X);
                }
                return this.axes[Utils.AxisOptions.SIDE.X].key;
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
            Options.prototype.getSeriesAndDatasetBySide = function (side) {
                if (!Utils.AxisOptions.isValidSide(side)) {
                    throw new TypeError('Cannot get axis side : ' + side);
                }
                if (side === Utils.AxisOptions.SIDE.Y2 && !this.axes[side]) {
                    side = Utils.AxisOptions.SIDE.Y;
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
                if (!Utils.AxisOptions.isValidSide(side)) {
                    throw new TypeError('Cannot get axis side : ' + side);
                }
                if (side === Utils.AxisOptions.SIDE.Y2 && !this.axes[side]) {
                    return this.axes[Utils.AxisOptions.SIDE.Y];
                }
                return this.axes[side];
            };
            Options.prototype.getSeriesByType = function (type) {
                if (!Utils.SeriesOptions.isValidType(type)) {
                    throw new TypeError('Unknown series type: ' + type);
                }
                return this.series.filter(function (s) { return s.hasType(type); });
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
                if (!angular.isObject(value)) {
                    throw TypeError(value + ' option must be an object.');
                }
                var obj = {};
                // Extend by default parameter
                angular.extend(obj, defaultValue, value);
                return obj;
            };
            Options.getArray = function (value, defaultValue) {
                if (defaultValue === void 0) { defaultValue = []; }
                return defaultValue.concat(value);
            };
            Options.uuid = function () {
                // @src: http://stackoverflow.com/a/2117523
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                    .replace(/[xy]/g, function (c) {
                    var r = Math.random() * 16 | 0;
                    var v = c === 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            };
            return Options;
        })();
        Utils.Options = Options;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Utils;
    (function (Utils) {
        'use strict';
        var Dimensions = (function () {
            function Dimensions() {
                this.width = 600;
                this.height = 200;
                this.innerWidth = 560;
                this.innerHeight = 160;
                this.margin = {
                    left: 30,
                    bottom: 20,
                    right: 30,
                    top: 20
                };
            }
            Dimensions.prototype.updateMargins = function (options) {
                var _this = this;
                if (!options || !options.margin) {
                    return;
                }
                var fn = function (prop) { return _this.margin[prop] = Utils.Options.getNumber(options.margin[prop], _this.margin[prop]); };
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
                // Oooooh I hate doing this.
                var hPadding = this.getDimensionByProperty(parent, 'padding-left') + this.getDimensionByProperty(parent, 'padding-right');
                var vPadding = this.getDimensionByProperty(parent, 'padding-top') + this.getDimensionByProperty(parent, 'padding-bottom');
                this.width = parent.clientWidth - hPadding;
                this.height = parent.clientHeight - vPadding;
                this.innerHeight = this.height - this.margin.top - this.margin.bottom;
                this.innerWidth = this.width - this.margin.left - this.margin.right;
            };
            return Dimensions;
        })();
        Utils.Dimensions = Dimensions;
    })(Utils = n3Charts.Utils || (n3Charts.Utils = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='EventManager.ts' />
/// <reference path='FactoryManager.ts' />
/// <reference path='BaseFactory.ts' />
/// <reference path='SeriesFactory.ts' />
/// <reference path='Dataset.ts' />
/// <reference path='Data.ts' />
/// <reference path='SeriesOptions.ts' />
/// <reference path='AxisOptions.ts' />
/// <reference path='Options.ts' />
/// <reference path='Dimensions.ts' />
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
                this.dim = new n3Charts.Utils.Dimensions();
            }
            Container.prototype.create = function (options) {
                this.dim.updateMargins(options);
                this.listenToElement(this.element, options);
                this.createRoot();
                this.createContainer();
                this.eventMgr.on('resize', this.dim.fromParentElement.bind(this.dim));
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
                var xScale = this.factoryMgr.get('x-axis').scale;
                var x = xScale.invert(event.clientX - left - dim.margin.left);
                var yScale = this.factoryMgr.get('y-axis').scale;
                var y = yScale.invert(event.clientY - top - dim.margin.top);
                if (y < yScale.domain()[0] || y > yScale.domain()[1]) {
                    y = undefined;
                }
                if (x < xScale.domain()[0] || x > xScale.domain()[1]) {
                    x = undefined;
                }
                return { y: y, x: x };
            };
            Container.prototype.update = function (datasets, options) {
                this.updateRoot();
                this.updateContainer();
            };
            Container.prototype.destroy = function () {
                this.destroyRoot();
            };
            Container.prototype.createRoot = function () {
                // Create the SVG root node
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
                this.defs.append('svg:clipPath')
                    .attr('id', 'clipping-path')
                    .append('svg:rect')
                    .attr('id', 'clipping-rect');
                this.data = this.vis
                    .append('g')
                    .attr({
                    'class': 'data',
                    'clip-path': 'url(#clipping-path)'
                });
                this.overlay = this.vis
                    .append('g')
                    .attr('class', 'overlay');
            };
            Container.prototype.updateContainer = function () {
                // Update the dimensions of the container
                this.vis
                    .attr({
                    'width': this.dim.innerWidth,
                    'height': this.dim.innerHeight,
                    'transform': 'translate(' + this.dim.margin.left + ', ' + this.dim.margin.top + ')'
                });
                d3.select(this.element).select('#clipping-rect')
                    .attr({
                    'width': this.dim.innerWidth,
                    'height': this.dim.innerHeight
                });
            };
            Container.prototype.getDimensions = function () {
                return this.dim;
            };
            return Container;
        })(n3Charts.Utils.BaseFactory);
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
            Tooltip.prototype.create = function () {
                this.createTooltip();
                this.eventMgr.on('container-move.tooltip', this.show.bind(this));
                this.eventMgr.on('container-out.tooltip', this.hide.bind(this));
                this.hide();
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
                for (var i = 0; i < datasets.length; i++) {
                    for (var j = 0; j < datasets[i].length; j++) {
                        if (options.axes.x.type === 'date') {
                            // _sigh_ TypeScript...
                            var distance = Math.abs(datasets[i][j].x.getTime() - x);
                        }
                        else {
                            var distance = Math.abs(datasets[i][j].x - x);
                        }
                        if (distance === minDistance) {
                            closestRows.push({ series: visibleSeries[i], row: datasets[i][j] });
                        }
                        else if (distance < minDistance) {
                            minDistance = distance;
                            closestRows = [{ series: visibleSeries[i], row: datasets[i][j] }];
                            closestIndex = j;
                        }
                    }
                }
                return { rows: closestRows, index: closestIndex };
            };
            Tooltip.prototype.showFromCoordinates = function (coordinates, data, options) {
                var x = coordinates.x, y = coordinates.y;
                if (x === undefined || y === undefined) {
                    this.hide();
                    return;
                }
                if (x instanceof Date) {
                    // _sigh_ TypeScript...
                    x = x.getTime();
                }
                var _a = this.getClosestRows(x, data, options), rows = _a.rows, index = _a.index;
                if (rows.length === 0) {
                    this.hide();
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
                var container = this.factoryMgr.get('container');
                var coordinates = container.getCoordinatesFromEvent(event);
                this.showFromCoordinates(coordinates, data, options);
            };
            // This is the part the user can override.
            Tooltip.prototype.getTooltipContent = function (rows, closestIndex, options) {
                var xTickFormat = options.getByAxisSide(n3Charts.Utils.AxisOptions.SIDE.X).tickFormat;
                var yTickFormat = options.getByAxisSide(n3Charts.Utils.AxisOptions.SIDE.Y).tickFormat;
                var getRowValue = function (d) {
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
                var xScale = this.factoryMgr.get('x-axis').scale;
                var yScale = this.factoryMgr.get('y-axis').scale;
                var radius = 3;
                var circlePath = function (r, cx, cy) {
                    return "M " + cx + " " + cy + " m -" + r + ", 0 a " + r + "," + r + " 0 1,0 " + r * 2 + ",0 a " + r + "," + r + " 0 1,0 -" + r * 2 + ",0 ";
                };
                var trianglePath = function (r, cx, cy) {
                    return "M " + cx + " " + cy + " m -" + r + ", 0 a " + r + "," + r + " 0 1,0 " + r * 2 + ",0 a " + r + "," + r + " 0 1,0 -" + r * 2 + ",0 ";
                };
                var initDots = function (s) {
                    s.attr('class', 'tooltip-dots-group');
                    s.append('path').attr({
                        'class': 'tooltip-dot y1'
                    });
                    s.append('path').attr({
                        'class': 'tooltip-dot y0'
                    }).style({
                        'display': function (d) { return d.series.hasTwoKeys() ? null : 'none'; }
                    });
                };
                var updateDots = function (s) {
                    s.select('.tooltip-dot.y1').attr({
                        'd': function (d) { return circlePath(radius, xScale(d.row.x), yScale(d.row.y1)); },
                        'stroke': function (d) { return d.series.color; }
                    });
                    s.select('.tooltip-dot.y0').attr({
                        'd': function (d) {
                            if (d.series.hasTwoKeys()) {
                                return circlePath(radius, xScale(d.row.x), yScale(d.row.y0));
                            }
                            return '';
                        },
                        'stroke': function (d) { return d.series.color; }
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
            Tooltip.prototype.hide = function () {
                this.svg
                    .style('display', 'none');
                this.line
                    .style('opacity', '0');
                this.dots
                    .style('opacity', '0');
            };
            return Tooltip;
        })(n3Charts.Utils.BaseFactory);
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
                // Get the container dimensions
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                var init = function (series) {
                    var items = series.append('div').attr({ 'class': 'item' })
                        .call(_this.legendClick());
                    items.append('div').attr({ 'class': 'icon' });
                    items.append('div').attr({ 'class': 'label' });
                };
                var update = function (series) {
                    series
                        .attr('class', function (d) { return 'item ' + d.type.join(' '); })
                        .classed('hidden', function (d) { return !d.visible; });
                    series.select('.icon').style('background-color', function (d) { return d.color; });
                    series.select('.label').text(function (d) { return d.label; });
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
        })(n3Charts.Utils.BaseFactory);
        Factory.Legend = Legend;
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
var n3Charts;
(function (n3Charts) {
    var Factory;
    (function (Factory) {
        'use strict';
        var Axis = (function (_super) {
            __extends(Axis, _super);
            function Axis(side) {
                _super.call(this);
                this.side = side;
                if (!n3Charts.Utils.AxisOptions.isValidSide(side)) {
                    throw new TypeError('Wrong axis side : ' + side);
                }
            }
            Axis.prototype.create = function () {
                // Get the svg container
                var vis = this.factoryMgr.get('container').axes;
                this.createAxis(vis);
                this.eventMgr.on('zoom.' + this.key, this.softUpdate.bind(this));
            };
            // This simply redraws the axis, without reprocessing the extent
            Axis.prototype.softUpdate = function () {
                this.svg.call(this.d3axis);
            };
            Axis.prototype.update = function (data, options) {
                // Get the container dimensions
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                // Get the [min, max] extent of the axis
                var extent = this.getExtent(data, options);
                // Get the options for the axis
                var axisOptions = options.getByAxisSide(this.side);
                this.scale = this.getScale(axisOptions);
                this.updateScaleRange(dim);
                this.updateScaleDomain(extent);
                this.d3axis = this.getAxis(this.scale, axisOptions);
                this.updateAxisOrientation(this.d3axis);
                this.updateAxisContainer(dim);
                this.shiftAxisTicks(axisOptions);
            };
            Axis.prototype.shiftAxisTicks = function (options) {
                var _a = options.ticksShift, x = _a.x, y = _a.y;
                this.svg.selectAll('text')
                    .attr('transform', "translate(" + x + ", " + y + ")");
            };
            Axis.prototype.destroy = function () {
                this.destroyAxis();
            };
            Axis.prototype.updateScaleRange = function (dim) {
                if (this.isAbscissas()) {
                    this.scale.range([0, dim.innerWidth]);
                }
                else {
                    this.scale.range([dim.innerHeight, 0]);
                }
            };
            Axis.prototype.updateScaleDomain = function (extent) {
                this.scale.domain(extent);
            };
            Axis.prototype.getExtentForDatasets = function (data, filter, accessor) {
                var min = Number.POSITIVE_INFINITY;
                var max = Number.NEGATIVE_INFINITY;
                for (var key in data.sets) {
                    if (!filter(key)) {
                        continue;
                    }
                    ;
                    data.sets[key].values.forEach(function (datum) {
                        var data = accessor(datum, key);
                        if (data[0] < min) {
                            min = data[0];
                        }
                        if (data[1] > max) {
                            max = data[1];
                        }
                    });
                }
                return [
                    min === Number.POSITIVE_INFINITY ? 0 : min,
                    max === Number.NEGATIVE_INFINITY ? 1 : max
                ];
            };
            Axis.prototype.getExtent = function (datasets, options) {
                var axisOptions = options.getByAxisSide(this.side);
                var extent = undefined;
                if (this.isAbscissas()) {
                    var activeDatasets = options.getVisibleDatasets();
                    var abscissasKey = options.getAbsKey();
                    extent = this.getExtentForDatasets(datasets, function (key) { return activeDatasets.indexOf(key) > -1; }, function (datum) { return [datum[abscissasKey], datum[abscissasKey]]; });
                }
                else {
                    var _a = options.getSeriesAndDatasetBySide(this.side), datasetsForSide = _a.datasetsForSide, seriesForDataset = _a.seriesForDataset;
                    extent = this.getExtentForDatasets(datasets, function (key) { return datasetsForSide.indexOf(key) > -1; }, function (datum, datasetKey) {
                        var highest = seriesForDataset[datasetKey].map(function (series) { return datum[series.key.y1]; });
                        var lowest = seriesForDataset[datasetKey].map(function (series) { return datum[series.key.y0] || datum[series.key.y1]; });
                        return [d3.min(lowest), d3.max(highest)];
                    });
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
                return this.side === n3Charts.Utils.AxisOptions.SIDE.X;
            };
            Axis.prototype.isInLastHalf = function (value) {
                var fn = function (v) { return v; };
                if (value instanceof Date) {
                    fn = function (v) { return v.getTime(); };
                }
                var _a = this.scale.domain(), a = _a[0], b = _a[1];
                return fn(value) > fn(a) + (fn(b) - fn(a)) / 2;
            };
            Axis.prototype.createAxis = function (vis) {
                // Create the axis container
                this.svg = vis
                    .append('g')
                    .attr('class', 'axis ' + this.side + '-axis');
            };
            Axis.prototype.updateAxisOrientation = function (axis) {
                if (this.isAbscissas()) {
                    axis.orient('bottom');
                }
                else {
                    if (this.side === n3Charts.Utils.AxisOptions.SIDE.Y) {
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
                    this.svg
                        .attr('transform', 'translate(0, ' + dim.innerHeight + ')');
                }
                else {
                    if (this.side === n3Charts.Utils.AxisOptions.SIDE.Y) {
                        this.svg
                            .attr('transform', 'translate(0, 0)');
                    }
                    else {
                        this.svg
                            .attr('transform', "translate(" + dim.innerWidth + ", 0)");
                    }
                }
                // Redraw the Axis
                this.svg
                    .transition()
                    .call(this.factoryMgr.get('transitions').edit)
                    .call(this.d3axis);
            };
            Axis.prototype.destroyAxis = function () {
                // Remove the axis container
                this.svg.remove();
            };
            Axis.prototype.getScale = function (options) {
                // Create and return a D3 Scale
                var scale;
                if (options.type === n3Charts.Utils.AxisOptions.TYPE.DATE) {
                    return d3.time.scale();
                }
                if (options.type === n3Charts.Utils.AxisOptions.TYPE.LOG) {
                    return d3.scale.log();
                }
                return d3.scale.linear();
            };
            Axis.prototype.getAxis = function (scale, options) {
                // Create and return a D3 Axis generator
                var axis = d3.svg.axis()
                    .scale(scale);
                options.configure(axis);
                return axis;
            };
            Axis.prototype.cloneAxis = function () {
                return d3.svg.axis()
                    .scale(this.d3axis.scale())
                    .orient(this.d3axis.orient())
                    .tickValues(this.d3axis.tickValues())
                    .ticks(this.d3axis.ticks())
                    .tickSize(this.d3axis.tickSize());
                // dafuq is wrong with this tslinter ???
                // .tickFormat(this.d3axis.tickFormat);
            };
            return Axis;
        })(n3Charts.Utils.BaseFactory);
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
            };
            Grid.prototype.update = function (data, options) {
                var container = this.factoryMgr.get('container');
                var dim = container.getDimensions();
                if (options.grid.x) {
                    var xAxis = this.factoryMgr.get('x-axis').cloneAxis();
                    this.svg.select('.x-grid')
                        .transition()
                        .call(this.factoryMgr.get('transitions').edit)
                        .attr('transform', 'translate(0, ' + dim.innerHeight + ')')
                        .call(xAxis.tickSize(-dim.innerHeight, 0));
                }
                if (options.grid.y) {
                    var yAxis = this.factoryMgr.get('y-axis').cloneAxis();
                    this.svg.select('.y-grid')
                        .transition()
                        .call(this.factoryMgr.get('transitions').edit)
                        .call(yAxis.tickSize(-dim.innerWidth, 0));
                }
            };
            Grid.prototype.destroy = function () {
                this.svg.remove();
            };
            return Grid;
        })(n3Charts.Utils.BaseFactory);
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
            }
            Zoom.prototype.create = function () {
                this.behavior = d3.behavior.zoom();
            };
            Zoom.prototype.update = function (data, options) {
                var xAxis = this.factoryMgr.get('x-axis');
                var yAxis = this.factoryMgr.get('y-axis');
                if (options.pan.x) {
                    this.behavior.x(xAxis.scale);
                }
                if (options.pan.y) {
                    this.behavior.y(yAxis.scale);
                }
                if (!options.pan.x && !options.pan.y) {
                    return;
                }
                var y2Axis = this.factoryMgr.get('y2-axis');
                var eventMgr = this.eventMgr;
                var transitions = this.factoryMgr.get('transitions');
                this.behavior
                    .scaleExtent([1, 1])
                    .on('zoom', function () {
                    // This will need to be done better when actually having y2 axes...
                    y2Axis.scale.domain(yAxis.scale.domain());
                    // Turning off and on transitions so that panning/zooming feels quick and
                    // reactive
                    transitions.off();
                    eventMgr.trigger('zoom', d3.event.sourceEvent.target);
                    transitions.on();
                });
                this.factoryMgr.get('container').svg.call(this.behavior);
                // This is to allow scroll, we don't actually care about zoom here,
                // despite the name...
                this.factoryMgr.get('container').svg.on('wheel.zoom', null);
                this.factoryMgr.get('container').svg.on('mousewheel.zoom', null);
            };
            return Zoom;
        })(n3Charts.Utils.BaseFactory);
        Factory.Zoom = Zoom;
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
            }
            Transition.prototype.off = function () {
                Transition.duration = 0;
            };
            Transition.prototype.on = function () {
                Transition.duration = Transition.defaultDuration;
            };
            Transition.prototype.enter = function (t) {
                var duration = Transition.duration;
                var ease = Transition.ease;
                var n = t[0].length;
                var delay = function (d, i) { return n ? i / n * duration : 0; };
                t.duration(duration)
                    .delay(delay)
                    .ease(ease);
            };
            Transition.prototype.edit = function (t) {
                var duration = Transition.duration;
                var ease = Transition.ease;
                var delay = 0;
                t.duration(duration)
                    .delay(delay)
                    .ease(ease);
            };
            Transition.prototype.exit = function (t) {
                var duration = Transition.duration;
                var ease = Transition.ease;
                var delay = 0;
                t.duration(duration)
                    .delay(delay)
                    .ease(ease);
            };
            Transition.defaultDuration = 250;
            Transition.duration = Transition.defaultDuration;
            Transition.ease = 'cubic';
            Transition.enabled = true;
            return Transition;
        })(n3Charts.Utils.BaseFactory);
        Factory.Transition = Transition;
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
                    this.type = n3Charts.Utils.SeriesOptions.TYPE.DOT;
                }
                Dot.prototype.updateData = function (group, series, index, numSeries) {
                    var xAxis = this.factoryMgr.get('x-axis');
                    var yAxis = this.factoryMgr.get('y-axis');
                    var dotsData = this.data.getDatasetValues(series, this.options).filter(series.defined);
                    var dotsRadius = 2;
                    var dots = group.selectAll('.' + this.type)
                        .data(dotsData, function (d) { return d.x; });
                    var initPoint = function (s) {
                        s.attr({
                            r: function (d) { return dotsRadius; },
                            cx: function (d) { return xAxis.scale(d.x); },
                            cy: function (d) { return yAxis.scale.range()[0]; }
                        });
                    };
                    var updatePoint = function (s) {
                        s.attr({
                            cx: function (d) { return xAxis.scale(d.x); },
                            cy: function (d) { return yAxis.scale(d.y1); }
                        })
                            .style('opacity', series.visible ? 1 : 0);
                    };
                    dots.enter()
                        .append('circle')
                        .attr('class', this.type)
                        .call(this.eventMgr.datumEnter(series, this.options))
                        .call(this.eventMgr.datumOver(series, this.options))
                        .call(this.eventMgr.datumMove(series, this.options))
                        .call(this.eventMgr.datumLeave(series, this.options))
                        .call(initPoint)
                        .transition()
                        .call(this.factoryMgr.get('transitions').enter)
                        .call(updatePoint);
                    dots
                        .transition()
                        .call(this.factoryMgr.get('transitions').edit)
                        .call(updatePoint);
                    dots.exit()
                        .transition()
                        .call(this.factoryMgr.get('transitions').exit)
                        .call(initPoint)
                        .each('end', function () {
                        d3.select(this).remove();
                    });
                };
                Dot.prototype.styleSeries = function (group) {
                    group.style({
                        'stroke': function (d) { return d.color; }
                    });
                };
                return Dot;
            })(n3Charts.Utils.SeriesFactory);
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
                    this.type = n3Charts.Utils.SeriesOptions.TYPE.LINE;
                }
                Line.prototype.updateData = function (group, series, index, numSeries) {
                    group.classed('dashed', series.isDashed());
                    var xAxis = this.factoryMgr.get('x-axis');
                    var yAxis = this.factoryMgr.get('y-axis');
                    var lineData = this.data.getDatasetValues(series, this.options);
                    var initLine = d3.svg.line()
                        .defined(series.defined)
                        .x(function (d) { return xAxis.scale(d.x); })
                        .y(yAxis.scale.range()[0])
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
                    line.enter()
                        .append('path')
                        .attr('class', this.type)
                        .attr('d', function (d) { return initLine(d); })
                        .transition()
                        .call(this.factoryMgr.get('transitions').enter)
                        .attr('d', function (d) { return updateLine(d); });
                    line
                        .transition()
                        .call(this.factoryMgr.get('transitions').edit)
                        .attr('d', function (d) { return updateLine(d); })
                        .style('opacity', series.visible ? 1 : 0);
                    line.exit()
                        .transition()
                        .call(this.factoryMgr.get('transitions').exit)
                        .attr('d', function (d) { return initLine(d); })
                        .each('end', function () {
                        d3.select(this).remove();
                    });
                };
                Line.prototype.styleSeries = function (group) {
                    group.style({
                        'fill': 'none',
                        'stroke': function (s) { return s.color; },
                        'stroke-dasharray': function (s) { return s.isDashed() ? '10,3' : undefined; }
                    });
                };
                return Line;
            })(n3Charts.Utils.SeriesFactory);
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
                    this.type = n3Charts.Utils.SeriesOptions.TYPE.AREA;
                }
                Area.prototype.updateData = function (group, series, index, numSeries) {
                    var xAxis = this.factoryMgr.get('x-axis');
                    var yAxis = this.factoryMgr.get('y-axis');
                    var areaData = this.data.getDatasetValues(series, this.options);
                    var initArea = d3.svg.area()
                        .defined(series.defined)
                        .x(function (d) { return xAxis.scale(d.x); })
                        .y0(yAxis.scale.range()[0])
                        .y1(yAxis.scale.range()[0])
                        .interpolate(series.interpolation.mode)
                        .tension(series.interpolation.tension);
                    var updateArea = d3.svg.area()
                        .defined(series.defined)
                        .x(function (d) { return xAxis.scale(d.x); })
                        .y0(function (d) { return isNaN(yAxis.scale(d.y0)) ? yAxis.scale.range()[0] : yAxis.scale(d.y0); })
                        .y1(function (d) { return yAxis.scale(d.y1); })
                        .interpolate(series.interpolation.mode)
                        .tension(series.interpolation.tension);
                    var area = group.selectAll('.' + this.type)
                        .data([areaData]);
                    area.enter()
                        .append('path')
                        .attr('class', this.type)
                        .attr('d', function (d) { return initArea(d); })
                        .transition()
                        .call(this.factoryMgr.get('transitions').enter)
                        .attr('d', function (d) { return updateArea(d); });
                    area
                        .transition()
                        .call(this.factoryMgr.get('transitions').edit)
                        .attr('d', function (d) { return updateArea(d); })
                        .style('opacity', series.visible ? 1 : 0);
                    area.exit()
                        .transition()
                        .call(this.factoryMgr.get('transitions').exit)
                        .attr('d', function (d) { return initArea(d); })
                        .each('end', function () {
                        d3.select(this).remove();
                    });
                };
                Area.prototype.styleSeries = function (group) {
                    group.style({
                        'fill': function (s) { return s.color; },
                        'stroke': function (s) { return s.color; }
                    });
                };
                return Area;
            })(n3Charts.Utils.SeriesFactory);
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
                    this.type = n3Charts.Utils.SeriesOptions.TYPE.COLUMN;
                    this.gapFactor = 0.2;
                    this.outerPadding = (this.gapFactor / 2) * 3;
                    this.columnsWidth = 0;
                }
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
                    var delta = n3Charts.Utils.Data.getMinDistance(colsDatasets, xAxis.scale, 'x');
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
                    var xAxis = this.factoryMgr.get('x-axis');
                    var yAxis = this.factoryMgr.get('y-axis');
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
                        .data(colsData, function (d) { return d.x; });
                    cols.enter()
                        .append('rect')
                        .attr('class', this.type)
                        .call(this.eventMgr.datumEnter(series, this.options))
                        .call(this.eventMgr.datumOver(series, this.options))
                        .call(this.eventMgr.datumMove(series, this.options))
                        .call(this.eventMgr.datumLeave(series, this.options))
                        .call(initCol)
                        .transition()
                        .call(this.factoryMgr.get('transitions').enter)
                        .call(updateCol);
                    cols
                        .transition()
                        .call(this.factoryMgr.get('transitions').edit)
                        .call(updateCol);
                    cols.exit()
                        .transition()
                        .call(this.factoryMgr.get('transitions').exit)
                        .call(initCol)
                        .each('end', function () {
                        d3.select(this).remove();
                    });
                };
                Column.prototype.styleSeries = function (group) {
                    group.style({
                        'fill': function (d) { return d.color; },
                        'stroke': function (d) { return d.color; },
                        'stroke-width': 1
                    });
                };
                return Column;
            })(n3Charts.Utils.SeriesFactory);
            Series.Column = Column;
        })(Series = Factory.Series || (Factory.Series = {}));
    })(Factory = n3Charts.Factory || (n3Charts.Factory = {}));
})(n3Charts || (n3Charts = {}));
/// <reference path='Dot.ts' />
/// <reference path='Line.ts' />
/// <reference path='Area.ts' />
/// <reference path='Column.ts' />
/// <reference path='Container.ts' />
/// <reference path='Tooltip.ts' />
/// <reference path='Legend.ts' />
/// <reference path='Axis.ts' />
/// <reference path='Grid.ts' />
/// <reference path='Zoom.ts' />
/// <reference path='Transition.ts' />
/// <reference path='series/_index.ts' />
/// <reference path='../typings/jquery/jquery.d.ts' />
/// <reference path='../typings/angularjs/angular.d.ts' />
/// <reference path='../typings/d3/d3.d.ts' />
/// <reference path='utils/_index.ts' />
/// <reference path='factories/_index.ts' />
/// <reference path='LineChart.ts' />
var n3Charts;
(function (n3Charts) {
    'use strict';
    // Create the angular module
    angular.module('n3-line-chart', [])
        .directive('linechart', [
        '$window', '$parse', '$timeout', '$rootScope',
        function ($window, $parse, $timeout, $rootScope) { return new n3Charts.LineChart($window, $parse, $timeout, $rootScope); }
    ]);
})(n3Charts || (n3Charts = {}));
