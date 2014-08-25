/*!
 *  dc 2.0.0-alpha.2
 *  http://dc-js.github.io/dc.js/
 *  Copyright 2012 Nick Zhu and other contributors
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

(function() { function _dc(d3) {
'use strict';

/**
#### Version 2.0.0-alpha.2

The entire dc.js library is scoped under the **dc** name space. It does not introduce anything else
into the global name space.

#### Function Chaining
Most dc functions are designed to allow function chaining, meaning they return the current chart
instance whenever it is appropriate. This way chart configuration can be written in the following
style:
```js
chart.width(300)
    .height(300)
    .filter("sunday")
```
The getter forms of functions do not participate in function chaining because they necessarily
return values that are not the chart.  (Although some, such as `.svg` and `.xAxis`, return values
that are chainable d3 objects.)

**/
var dc = {
    version: "2.0.0-alpha.2",
    constants: {
        CHART_CLASS: "dc-chart",
        DEBUG_GROUP_CLASS: "debug",
        STACK_CLASS: "stack",
        DESELECTED_CLASS: "deselected",
        SELECTED_CLASS: "selected",
        NODE_INDEX_NAME: "__index__",
        GROUP_INDEX_NAME: "__group_index__",
        DEFAULT_CHART_GROUP: "__default_chart_group__",
        EVENT_DELAY: 40,
        NEGLIGIBLE_NUMBER: 1e-10
    },
    _renderlet: null
};

dc.chartRegistry = function() {
    // chartGroup:string => charts:array
    var _chartMap = {};

    function initializeChartGroup(group) {
        if (!group)
            group = dc.constants.DEFAULT_CHART_GROUP;

        if (!_chartMap[group])
            _chartMap[group] = [];

        return group;
    }

    return {
        has: function(chart) {
            for (var e in _chartMap) {
                if (_chartMap[e].indexOf(chart) >= 0)
                    return true;
            }
            return false;
        },

        register: function(chart, group) {
            group = initializeChartGroup(group);
            _chartMap[group].push(chart);
        },

        deregister: function (chart, group) {
            group = initializeChartGroup(group);
            for (var i = 0; i < _chartMap[group].length; i++) {
                if (_chartMap[group][i].anchorName() === chart.anchorName()) {
                    _chartMap[group].splice(i, 1);
                    break;
                }
            }
        },

        clear: function(group) {
            if (group) {
                delete _chartMap[group];
            } else {
                _chartMap = {};
            }
        },

        list: function(group) {
            group = initializeChartGroup(group);
            return _chartMap[group];
        }
    };
}();

dc.registerChart = function(chart, group) {
    dc.chartRegistry.register(chart, group);
};

dc.deregisterChart = function (chart, group) {
    dc.chartRegistry.deregister(chart, group);
};

dc.hasChart = function(chart) {
    return dc.chartRegistry.has(chart);
};

dc.deregisterAllCharts = function(group) {
    dc.chartRegistry.clear(group);
};

/**
## Utilities
**/

/**
#### dc.filterAll([chartGroup])
Clear all filters on all charts within the given chart group. If the chart group is not given then
only charts that belong to the default chart group will be reset.
**/
dc.filterAll = function(group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].filterAll();
    }
};

/**
#### dc.refocusAll([chartGroup])
Reset zoom level / focus on all charts that belong to the given chart group. If the chart group is
not given then only charts that belong to the default chart group will be reset.
**/
dc.refocusAll = function(group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        if (charts[i].focus) charts[i].focus();
    }
};

/**
#### dc.renderAll([chartGroup])
Re-render all charts belong to the given chart group. If the chart group is not given then only
charts that belong to the default chart group will be re-rendered.
**/
dc.renderAll = function(group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].render();
    }

    if(dc._renderlet !== null)
        dc._renderlet(group);
};

/**
#### dc.redrawAll([chartGroup])
Redraw all charts belong to the given chart group. If the chart group is not given then only charts
that belong to the default chart group will be re-drawn. Redraw is different from re-render since
when redrawing dc tries to update the graphic incrementally, using transitions, instead of starting
from scratch.
**/
dc.redrawAll = function(group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].redraw();
    }

    if(dc._renderlet !== null)
        dc._renderlet(group);
};

/**
#### dc.disableTransitions
If this boolean is set truthy, all transitions will be disabled, and changes to the charts will happen
immediately.  Default: false
**/
dc.disableTransitions = false;

dc.transition = function(selections, duration, callback) {
    if (duration <= 0 || duration === undefined || dc.disableTransitions)
        return selections;

    var s = selections
        .transition()
        .duration(duration);

    if (typeof(callback) === 'function') {
        callback(s);
    }

    return s;
};

dc.units = {};

/**
#### dc.units.integers
`dc.units.integers` is the default value for `xUnits` for the [Coordinate Grid
Chart](#coordinate-grid-chart) and should be used when the x values are a sequence of integers.

It is a function that counts the number of integers in the range supplied in its start and end parameters.

```js
chart.xUnits(dc.units.integers) // already the default
```

**/
dc.units.integers = function(s, e) {
    return Math.abs(e - s);
};

/**
#### dc.units.ordinal
This argument can be passed to the `xUnits` function of the to specify ordinal units for the x
axis. Usually this parameter is used in combination with passing `d3.scale.ordinal()` to `.x`.

It just returns the domain passed to it, which for ordinal charts is an array of all values.

```js
chart.xUnits(dc.units.ordinal)
    .x(d3.scale.ordinal())
```

**/
dc.units.ordinal = function(s, e, domain){
    return domain;
};

/**
#### dc.units.fp.precision(precision)
This function generates an argument for the [Coordinate Grid Chart's](#coordinate-grid-chart)
`xUnits` function specifying that the x values are floating-point numbers with the given
precision.

The returned function determines how many values at the given precision will fit into the range
supplied in its start and end parameters.

```js
// specify values (and ticks) every 0.1 units
chart.xUnits(dc.units.fp.precision(0.1)
// there are 500 units between 0.5 and 1 if the precision is 0.001
var thousandths = dc.units.fp.precision(0.001);
thousandths(0.5, 1.0) // returns 500
```
**/
dc.units.fp = {};
dc.units.fp.precision = function(precision){
    var _f = function(s, e){
        var d = Math.abs((e-s)/_f.resolution);
        if(dc.utils.isNegligible(d - Math.floor(d)))
            return Math.floor(d);
        else
            return Math.ceil(d);
    };
    _f.resolution = precision;
    return _f;
};

dc.round = {};
dc.round.floor = function(n) {
    return Math.floor(n);
};
dc.round.ceil = function(n) {
    return Math.ceil(n);
};
dc.round.round = function(n) {
    return Math.round(n);
};

dc.override = function(obj, functionName, newFunction) {
    var existingFunction = obj[functionName];
    obj["_" + functionName] = existingFunction;
    obj[functionName] = newFunction;
};

dc.renderlet = function(_){
    if(!arguments.length) return dc._renderlet;
    dc._renderlet = _;
    return dc;
};

dc.instanceOfChart = function (o) {
    return o instanceof Object && o.__dc_flag__ && true;
};

dc.errors = {};

dc.errors.Exception = function(msg) {
    var _msg = msg || "Unexpected internal error";

    this.message = _msg;

    this.toString = function(){
        return _msg;
    };
};

dc.errors.InvalidStateException = function() {
    dc.errors.Exception.apply(this, arguments);
};

dc.dateFormat = d3.time.format("%m/%d/%Y");

dc.printers = {};

dc.printers.filters = function (filters) {
    var s = "";

    for (var i = 0; i < filters.length; ++i) {
        if (i > 0) s += ", ";
        s += dc.printers.filter(filters[i]);
    }

    return s;
};

dc.printers.filter = function (filter) {
    var s = "";

    if (filter) {
        if (filter instanceof Array) {
            if (filter.length >= 2)
                s = "[" + dc.utils.printSingleValue(filter[0]) + " -> " + dc.utils.printSingleValue(filter[1]) + "]";
            else if (filter.length >= 1)
                s = dc.utils.printSingleValue(filter[0]);
        } else {
            s = dc.utils.printSingleValue(filter);
        }
    }

    return s;
};

dc.pluck = function(n,f) {
    if (!f) return function(d) { return d[n]; };
    return function(d,i) { return f.call(d,d[n],i); };
};

dc.utils = {};

dc.utils.printSingleValue = function (filter) {
    var s = "" + filter;

    if (filter instanceof Date)
        s = dc.dateFormat(filter);
    else if (typeof(filter) == "string")
        s = filter;
    else if (dc.utils.isFloat(filter))
        s = dc.utils.printSingleValue.fformat(filter);
    else if (dc.utils.isInteger(filter))
        s = Math.round(filter);

    return s;
};
dc.utils.printSingleValue.fformat = d3.format(".2f");

// FIXME: these assume than any string r is a percentage (whether or not it
// includes %). They also generate strange results if l is a string.
dc.utils.add = function (l, r) {
    if (typeof r === "string")
        r = r.replace("%", "");

    if (l instanceof Date) {
        if (typeof r === "string") r = +r;
        var d = new Date();
        d.setTime(l.getTime());
        d.setDate(l.getDate() + r);
        return d;
    } else if (typeof r === "string") {
        var percentage = (+r / 100);
        return l > 0 ? l * (1 + percentage) : l * (1 - percentage);
    } else {
        return l + r;
    }
};

dc.utils.subtract = function (l, r) {
    if (typeof r === "string")
        r = r.replace("%", "");

    if (l instanceof Date) {
        if (typeof r === "string") r = +r;
        var d = new Date();
        d.setTime(l.getTime());
        d.setDate(l.getDate() - r);
        return d;
    } else if (typeof r === "string") {
        var percentage = (+r / 100);
        return l < 0 ? l * (1 + percentage) : l * (1 - percentage);
    } else {
        return l - r;
    }
};

dc.utils.isNumber = function(n) {
    return n===+n;
};

dc.utils.isFloat = function (n) {
    return n===+n && n!==(n|0);
};

dc.utils.isInteger = function (n) {
    return n===+n && n===(n|0);
};

dc.utils.isNegligible = function (n) {
    return !dc.utils.isNumber(n) || (n < dc.constants.NEGLIGIBLE_NUMBER && n > -dc.constants.NEGLIGIBLE_NUMBER);
};

dc.utils.clamp = function (val, min, max) {
    return val < min ? min : (val > max ? max : val);
};

var _idCounter = 0;
dc.utils.uniqueId = function () {
    return ++_idCounter;
};

dc.utils.nameToId = function (name) {
    return name.toLowerCase().replace(/[\s]/g, "_").replace(/[\.']/g, "");
};

dc.utils.appendOrSelect = function (parent, name) {
    var element = parent.select(name);
    if (element.empty()) element = parent.append(name);
    return element;
};

dc.utils.safeNumber = function(n){return dc.utils.isNumber(+n)?+n:0;};

dc.logger = {};

dc.logger.enableDebugLog = false;

dc.logger.warn = function (msg) {
    if (console) {
        if (console.warn) {
            console.warn(msg);
        } else if (console.log) {
            console.log(msg);
        }
    }

    return dc.logger;
};

dc.logger.debug = function (msg) {
    if (dc.logger.enableDebugLog && console) {
        if (console.debug) {
            console.debug(msg);
        } else if (console.log) {
            console.log(msg);
        }
    }

    return dc.logger;
};

dc.events = {
    current: null
};

/**
#### dc.events.trigger(function[, delay])
This function triggers a throttled event function with a specified delay (in milli-seconds).  Events
that are triggered repetitively due to user interaction such brush dragging might flood the library
and invoke more renders than can be executed in time. Using this function to wrap your event
function allows the library to smooth out the rendering by throttling events and only responding to
the most recent event.

```js
    chart.renderlet(function(chart){
        // smooth the rendering through event throttling
        dc.events.trigger(function(){
            // focus some other chart to the range selected by user on this chart
            someOtherChart.focus(chart.filter());
        });
    })
```
**/
dc.events.trigger = function(closure, delay) {
    if (!delay){
        closure();
        return;
    }

    dc.events.current = closure;

    setTimeout(function() {
        if (closure == dc.events.current)
            closure();
    }, delay);
};

dc.filters = {};

/**
## Filters

The dc.js filters are functions which are passed into crossfilter to chose which records will be
accumulated to produce values for the charts.  In the crossfilter model, any filters applied on one
dimension will affect all the other dimensions but not that one.  dc always applies a filter
function to the dimension; the function combines multiple filters and if any of them accept a
record, it is filtered in.

These filter constructors are used as appropriate by the various charts to implement brushing.  We
mention below which chart uses which filter.  In some cases, many instances of a filter will be added.

**/

/**
#### dc.filters.RangedFilter(low, high)
 RangedFilter is a filter which accepts keys between `low` and `high`.  It is used to implement X
 axis brushing for the [coordinate grid charts](#coordinate-grid-mixin).
**/
dc.filters.RangedFilter = function(low, high) {
    var range = Array(low, high);
    range.isFiltered = function(value) {
        return value >= this[0] && value < this[1];
    };

    return range;
};

/**
#### dc.filters.TwoDimensionalFilter(array)
 TwoDimensionalFilter is a filter which accepts a single two-dimensional value.  It is used by the
 [heat map chart](#heat-map) to include particular cells as they are clicked.  (Rows and columns are
 filtered by filtering all the cells in the row or column.)
**/
dc.filters.TwoDimensionalFilter = function(array) {
    if (array === null) { return null; }

    var filter = array;
    filter.isFiltered = function(value) {
        return value.length && value.length == filter.length &&
               value[0] == filter[0] && value[1] == filter[1];
    };

    return filter;
};

/**
#### dc.filters.RangedTwoDimensionalFilter(array)
 The RangedTwoDimensionalFilter allows filtering all values which fit within a rectangular
 region. It is used by the [scatter plot](#scatter-plot) to implement rectangular brushing.

 It takes two two-dimensional points in the form `[[x1,y1],[x2,y2]]`, and normalizes them so that
 `x1 <= x2` and `y1 <- y2`. It then returns a filter which accepts any points which are in the
 rectangular range including the lower values but excluding the higher values.

 If an array of two values are given to the RangedTwoDimensionalFilter, it interprets the values as
 two x coordinates `x1` and `x2` and returns a filter which accepts any points for which `x1 <= x <
 x2`.
 **/
dc.filters.RangedTwoDimensionalFilter = function(array){
    if (array === null) { return null; }

    var filter = array;
    var fromBottomLeft;

    if (filter[0] instanceof Array) {
        fromBottomLeft = [[Math.min(array[0][0], array[1][0]),
                           Math.min(array[0][1], array[1][1])],
                          [Math.max(array[0][0], array[1][0]),
                           Math.max(array[0][1], array[1][1])]];
    } else {
        fromBottomLeft = [[array[0], -Infinity],
                          [array[1], Infinity]];
    }

    filter.isFiltered = function(value) {
        var x, y;

        if (value instanceof Array) {
            if (value.length != 2) return false;
            x = value[0];
            y = value[1];
        } else {
            x = value;
            y = fromBottomLeft[0][1];
        }

        return x >= fromBottomLeft[0][0] && x < fromBottomLeft[1][0] &&
               y >= fromBottomLeft[0][1] && y < fromBottomLeft[1][1];
    };

    return filter;
};

/**
## Base Mixin
Base Mixin is an abstract functional object representing a basic dc chart object
for all chart and widget implementations. Methods from the Base Mixin are inherited
and available on all chart implementation in the DC library.
**/
dc.baseMixin = function (_chart) {
    _chart.__dc_flag__ = dc.utils.uniqueId();

    var _dimension;
    var _group;

    var _anchor;
    var _root;
    var _svg;

    var _minWidth = 200;
    var _default_width = function (element) {
        var width = element && element.getBoundingClientRect && element.getBoundingClientRect().width;
        return (width && width > _minWidth) ? width : _minWidth;
    };
    var _width = _default_width;

    var _minHeight = 200;
    var _default_height = function (element) {
        var height = element && element.getBoundingClientRect && element.getBoundingClientRect().height;
        return (height && height > _minHeight) ? height : _minHeight;
    };
    var _height = _default_height;

    var _keyAccessor = dc.pluck('key');
    var _valueAccessor = dc.pluck('value');
    var _label = dc.pluck('key');

    var _ordering = dc.pluck('key');
    var _orderSort;

    var _renderLabel = false;

    var _title = function (d) {
        return _chart.keyAccessor()(d) + ": " + _chart.valueAccessor()(d);
    };
    var _renderTitle = false;

    var _transitionDuration = 750;

    var _filterPrinter = dc.printers.filters;

    var _renderlets = [];
    var _mandatoryAttributes = ['dimension', 'group'];

    var _chartGroup = dc.constants.DEFAULT_CHART_GROUP;

    var NULL_LISTENER = function () {};

    var _listeners = d3.dispatch(
        "preRender",
        "postRender",
        "preRedraw",
        "postRedraw",
        "filtered",
        "zoomed");

    var _legend;

    var _filters = [];
    var _filterHandler = function (dimension, filters) {
        dimension.filter(null);

        if (filters.length === 0)
            dimension.filter(null);
        else
            dimension.filterFunction(function (d) {
                for(var i = 0; i < filters.length; i++) {
                    var filter = filters[i];
                    if (filter.isFiltered && filter.isFiltered(d)) {
                        return true;
                    } else if (filter <= d && filter >= d) {
                        return true;
                    }
                }
                return false;
            });

        return filters;
    };

    var _data = function (group) {
        return group.all();
    };

    /**
    #### .width([value])
    Set or get the width attribute of a chart. See `.height` below for further description of the
    behavior.

    **/
    _chart.width = function (w) {
        if (!arguments.length) return _width(_root.node());
        _width = d3.functor(w || _default_width);
        return _chart;
    };

    /**
    #### .height([value])
    Set or get the height attribute of a chart. The height is applied to the SVG element generated by
    the chart when rendered (or rerendered). If a value is given, then it will be used to calculate
    the new height and the chart returned for method chaining.  The value can either be a numeric, a
    function, or falsy. If no value is specified then the value of the current height attribute will
    be returned.

    By default, without an explicit height being given, the chart will select the width of its
    anchor element. If that isn't possible it defaults to 200. Setting the value falsy will return
    the chart to the default behavior

    Examples:

    ```js
    chart.height(250); // Set the chart's height to 250px;
    chart.height(function(anchor) { return doSomethingWith(anchor); }); // set the chart's height with a function
    chart.height(null); // reset the height to the default auto calculation
    ```

    **/
    _chart.height = function (h) {
        if (!arguments.length) return _height(_root.node());
        _height = d3.functor(h || _default_height);
        return _chart;
    };

    /**
    #### .minWidth([value])
    Set or get the minimum width attribute of a chart. This only applicable if the width is
    calculated by dc.

    **/
    _chart.minWidth = function (w) {
        if (!arguments.length) return _minWidth;
        _minWidth = w;
        return _chart;
    };

    /**
    #### .minHeight([value])
    Set or get the minimum height attribute of a chart. This only applicable if the height is
    calculated by dc.

    **/
    _chart.minHeight = function (w) {
        if (!arguments.length) return _minHeight;
        _minHeight = w;
        return _chart;
    };

    /**
    #### .dimension([value]) - **mandatory**
    Set or get the dimension attribute of a chart. In dc a dimension can be any valid [crossfilter
    dimension](https://github.com/square/crossfilter/wiki/API-Reference#wiki-dimension).

    If a value is given, then it will be used as the new dimension. If no value is specified then
    the current dimension will be returned.

    **/
    _chart.dimension = function (d) {
        if (!arguments.length) return _dimension;
        _dimension = d;
        _chart.expireCache();
        return _chart;
    };

    /**
    #### .data([callback])
    Set the data callback or retrieve the chart's data set. The data callback is passed the chart's
    group and by default will return `group.all()`. This behavior may be modified to, for instance,
    return only the top 5 groups:
    ```
        chart.data(function(group) {
            return group.top(5);
        });
    ```
    **/
    _chart.data = function(d) {
        if (!arguments.length) return _data.call(_chart,_group);
        _data = d3.functor(d);
        _chart.expireCache();
        return _chart;
    };

    /**
    #### .group([value, [name]]) - **mandatory**
    Set or get the group attribute of a chart. In dc a group is a [crossfilter
    group](https://github.com/square/crossfilter/wiki/API-Reference#wiki-group). Usually the group
    should be created from the particular dimension associated with the same chart. If a value is
    given, then it will be used as the new group.

    If no value specified then the current group will be returned.
    If `name` is specified then it will be used to generate legend label.

    **/
    _chart.group = function (g, name) {
        if (!arguments.length) return _group;
        _group = g;
        _chart._groupName = name;
        _chart.expireCache();
        return _chart;
    };

    /**
    #### .ordering([orderFunction])
    Get or set an accessor to order ordinal charts
    **/
    _chart.ordering = function(o) {
        if (!arguments.length) return _ordering;
        _ordering = o;
        _orderSort = crossfilter.quicksort.by(_ordering);
        _chart.expireCache();
        return _chart;
    };

    _chart._computeOrderedGroups = function(data) {
        var dataCopy = data.slice(0);

        if (dataCopy.length <= 1)
            return dataCopy;

        if (!_orderSort)
            _orderSort = crossfilter.quicksort.by(_ordering);

        return _orderSort(dataCopy, 0, dataCopy.length);
    };

    /**
    #### .filterAll()
    Clear all filters associated with this chart.

    **/
    _chart.filterAll = function () {
        return _chart.filter(null);
    };

    /**
    #### .select(selector)
    Execute d3 single selection in the chart's scope using the given selector and return the d3
    selection. Roughly the same as:
    ```js
    d3.select("#chart-id").select(selector);
    ```
    This function is **not chainable** since it does not return a chart instance; however the d3
    selection result can be chained to d3 function calls.

    **/
    _chart.select = function (s) {
        return _root.select(s);
    };

    /**
    #### .selectAll(selector)
    Execute in scope d3 selectAll using the given selector and return d3 selection result. Roughly
    the same as:
    ```js
    d3.select("#chart-id").selectAll(selector);
    ```
    This function is **not chainable** since it does not return a chart instance; however the d3
    selection result can be chained to d3 function calls.

    **/
    _chart.selectAll = function (s) {
        return _root ? _root.selectAll(s) : null;
    };

    /**
     #### .anchor([anchorChart|anchorSelector|anchorNode], [chartGroup])
     Set the svg root to either be an existing chart's root; or any valid [d3 single
     selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying a dom
     block element such as a div; or a dom element or d3 selection. Optionally registers the chart
     within the chartGroup. This class is called internally on chart initialization, but be called
     again to relocate the chart. However, it will orphan any previously created SVG elements.
    **/
    _chart.anchor = function (a, chartGroup) {
        if (!arguments.length) return _anchor;
        if (dc.instanceOfChart(a)) {
            _anchor = a.anchor();
            _root = a.root();
        } else {
            _anchor = a;
            _root = d3.select(_anchor);
            _root.classed(dc.constants.CHART_CLASS, true);
            dc.registerChart(_chart, chartGroup);
        }
        _chartGroup = chartGroup;
        return _chart;
    };

    /**
    #### .anchorName()
    Returns the dom id for the chart's anchored location.

    **/
    _chart.anchorName = function () {
        var a = _chart.anchor();
        if (a && a.id) return a.id;
        if (a && a.replace) return a.replace('#','');
        return "" + _chart.chartID();
    };

    /**
    #### .root([rootElement])
    Returns the root element where a chart resides. Usually it will be the parent div element where
    the svg was created. You can also pass in a new root element however this is usually handled by
    dc internally. Resetting the root element on a chart outside of dc internals may have
    unexpected consequences.

    **/
    _chart.root = function (r) {
        if (!arguments.length) return _root;
        _root = r;
        return _chart;
    };

    /**
    #### .svg([svgElement])
    Returns the top svg element for this specific chart. You can also pass in a new svg element,
    however this is usually handled by dc internally. Resetting the svg element on a chart outside
    of dc internals may have unexpected consequences.

    **/
    _chart.svg = function (_) {
        if (!arguments.length) return _svg;
        _svg = _;
        return _chart;
    };

    /**
    #### .resetSvg()
    Remove the chart's SVG elements from the dom and recreate the container SVG element.
    **/
    _chart.resetSvg = function () {
        _chart.select("svg").remove();
        return generateSvg();
    };

    function generateSvg() {
        _svg = _chart.root().append("svg")
            .attr("width", _chart.width())
            .attr("height", _chart.height());
        return _svg;
    }

    /**
    #### .filterPrinter([filterPrinterFunction])
    Set or get the filter printer function. The filter printer function is used to generate human
    friendly text for filter value(s) associated with the chart instance. By default dc charts use a
    default filter printer `dc.printers.filter` that provides simple printing support for both
    single value and ranged filters.

    **/
    _chart.filterPrinter = function (_) {
        if (!arguments.length) return _filterPrinter;
        _filterPrinter = _;
        return _chart;
    };

    /**
    #### .turnOnControls() & .turnOffControls()
    Turn on/off optional control elements within the root element. dc currently supports the
    following html control elements.

    * root.selectAll(".reset") - elements are turned on if the chart has an active filter. This type
     of control element is usually used to store a reset link to allow user to reset filter on a
     certain chart. This element will be turned off automatically if the filter is cleared.
    * root.selectAll(".filter") elements are turned on if the chart has an active filter. The text
     content of this element is then replaced with the current filter value using the filter printer
     function. This type of element will be turned off automatically if the filter is cleared.

    **/
    _chart.turnOnControls = function () {
        if (_root) {
            _chart.selectAll(".reset").style("display", null);
            _chart.selectAll(".filter").text(_filterPrinter(_chart.filters())).style("display", null);
        }
        return _chart;
    };

    _chart.turnOffControls = function () {
        if (_root) {
            _chart.selectAll(".reset").style("display", "none");
            _chart.selectAll(".filter").style("display", "none").text(_chart.filter());
        }
        return _chart;
    };

    /**
    #### .transitionDuration([duration])
    Set or get the animation transition duration(in milliseconds) for this chart instance. Default
    duration is 750ms.

    **/
    _chart.transitionDuration = function (d) {
        if (!arguments.length) return _transitionDuration;
        _transitionDuration = d;
        return _chart;
    };

    _chart._mandatoryAttributes = function (_) {
        if (!arguments.length) return _mandatoryAttributes;
        _mandatoryAttributes = _;
        return _chart;
    };

    function checkForMandatoryAttributes(a) {
        if (!_chart[a] || !_chart[a]())
            throw new dc.errors.InvalidStateException("Mandatory attribute chart." + a +
                                                      " is missing on chart[#" + _chart.anchorName() + "]");
    }

    /**
    #### .render()
    Invoking this method will force the chart to re-render everything from scratch. Generally it
    should only be used to render the chart for the first time on the page or if you want to make
    sure everything is redrawn from scratch instead of relying on the default incremental redrawing
    behaviour.

    **/
    _chart.render = function () {
        _listeners.preRender(_chart);

        if (_mandatoryAttributes)
            _mandatoryAttributes.forEach(checkForMandatoryAttributes);

        var result = _chart._doRender();

        if (_legend) _legend.render();

        _chart._activateRenderlets("postRender");

        return result;
    };

    _chart._activateRenderlets = function (event) {
        if (_chart.transitionDuration() > 0 && _svg) {
            _svg.transition().duration(_chart.transitionDuration())
                .each("end", function () {
                    runAllRenderlets();
                    if (event) _listeners[event](_chart);
                });
        } else {
            runAllRenderlets();
            if (event) _listeners[event](_chart);
        }
    };

    /**
    #### .redraw()
    Calling redraw will cause the chart to re-render data changes incrementally. If there is no
    change in the underlying data dimension then calling this method will have no effect on the
    chart. Most chart interaction in dc will automatically trigger this method through internal
    events (in particular [dc.redrawAll](#dcredrawallchartgroup)); therefore, you only need to
    manually invoke this function if data is manipulated outside of dc's control (for example if
    data is loaded in the background using `crossfilter.add()`).

    **/
    _chart.redraw = function () {
        _listeners.preRedraw(_chart);

        var result = _chart._doRedraw();

        if (_legend) _legend.render();

        _chart._activateRenderlets("postRedraw");

        return result;
    };

    _chart.redrawGroup = function () {
        dc.redrawAll(_chart.chartGroup());
    };

    _chart.renderGroup = function () {
        dc.renderAll(_chart.chartGroup());
    };

    _chart._invokeFilteredListener = function (f) {
        if (f !== undefined) _listeners.filtered(_chart, f);
    };

    _chart._invokeZoomedListener = function () {
        _listeners.zoomed(_chart);
    };

    /**
    #### .hasFilter([filter])
    Check whether is any active filter or a specific filter is associated with particular chart instance.
    This function is **not chainable**.

    **/
    _chart.hasFilter = function (filter) {
        if (!arguments.length) return _filters.length > 0;
        return _filters.some(function(f) {
            return filter <= f && filter >= f;
        });
    };

    function removeFilter(_) {
        for(var i = 0; i < _filters.length; i++) {
            if(_filters[i] <= _ && _filters[i] >= _) {
                _filters.splice(i, 1);
                break;
            }
        }
        applyFilters();
        _chart._invokeFilteredListener(_);
    }

    function addFilter(_) {
        _filters.push(_);
        applyFilters();
        _chart._invokeFilteredListener(_);
    }

    function resetFilters() {
        _filters = [];
        applyFilters();
        _chart._invokeFilteredListener(null);
    }

    function applyFilters() {
        if (_chart.dimension() && _chart.dimension().filter) {
            var fs = _filterHandler(_chart.dimension(), _filters);
            _filters = fs ? fs : _filters;
        }
    }

    _chart.replaceFilter = function (_) {
        _filters = [];
        _chart.filter(_);
    };

    /**
    #### .filter([filterValue])
    Filter the chart by the given value or return the current filter if the input parameter is missing.
    ```js
    // filter by a single string
    chart.filter("Sunday");
    // filter by a single age
    chart.filter(18);
    ```

    **/
    _chart.filter = function (_) {
        if (!arguments.length) return _filters.length > 0 ? _filters[0] : null;
        if (_ instanceof Array && _[0] instanceof Array && !_.isFiltered) {
            _[0].forEach(function(d){
                if (_chart.hasFilter(d)) {
                    _filters.splice(_filters.indexOf(d), 1);
                } else {
                    _filters.push(d);
                }
            });
            applyFilters();
            _chart._invokeFilteredListener(_);
        } else if (_ === null) {
            resetFilters();
        } else {
            if (_chart.hasFilter(_))
                removeFilter(_);
            else
                addFilter(_);
        }

        if (_root !== null && _chart.hasFilter()) {
            _chart.turnOnControls();
        } else {
            _chart.turnOffControls();
        }

        return _chart;
    };

    /**
    #### .filters()
    Returns all current filters. This method does not perform defensive cloning of the internal
    filter array before returning, therefore any modification of the returned array will effect the
    chart's internal filter storage.

    **/
    _chart.filters = function () {
        return _filters;
    };

    _chart.highlightSelected = function (e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, true);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    };

    _chart.fadeDeselected = function (e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, true);
    };

    _chart.resetHighlight = function (e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    };

    /**
    #### .onClick(datum)
    This function is passed to d3 as the onClick handler for each chart. The default behavior is to
    filter on the clicked datum (passed to the callback) and redraw the chart group.
    **/
    _chart.onClick = function (d) {
        var filter = _chart.keyAccessor()(d);
        dc.events.trigger(function () {
            _chart.filter(filter);
            _chart.redrawGroup();
        });
    };

    /**
    #### .filterHandler([function])
    Set or get the filter handler. The filter handler is a function that performs the filter action
    on a specific dimension. Using a custom filter handler allows you to perform additional logic
    before or after filtering.

    ```js
    // default filter handler
    function(dimension, filter){
        dimension.filter(filter); // perform filtering
        return filter; // return the actual filter value
    }

    // custom filter handler
    chart.filterHandler(function(dimension, filter){
        var newFilter = filter + 10;
        dimension.filter(newFilter);
        return newFilter; // set the actual filter value to the new value
    });
    ```

    **/
    _chart.filterHandler = function (_) {
        if (!arguments.length) return _filterHandler;
        _filterHandler = _;
        return _chart;
    };

    // abstract function stub
    _chart._doRender = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart._doRedraw = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart.legendables = function () {
        // do nothing in base, should be overridden by sub-function
        return [];
    };

    _chart.legendHighlight = function (d) {
        // do nothing in base, should be overridden by sub-function
    };

    _chart.legendReset = function (d) {
        // do nothing in base, should be overridden by sub-function
    };

    _chart.legendToggle = function (d) {
        // do nothing in base, should be overriden by sub-function
    };

    _chart.isLegendableHidden = function (d) {
        // do nothing in base, should be overridden by sub-function
        return false;
    };

    /**
    #### .keyAccessor([keyAccessorFunction])
    Set or get the key accessor function. The key accessor function is used to retrieve the key
    value from the crossfilter group. Key values are used differently in different charts, for
    example keys correspond to slices in a pie chart and x axis positions in a grid coordinate chart.
    ```js
    // default key accessor
    chart.keyAccessor(function(d) { return d.key; });
    // custom key accessor for a multi-value crossfilter reduction
    chart.keyAccessor(function(p) { return p.value.absGain; });
    ```

    **/
    _chart.keyAccessor = function (_) {
        if (!arguments.length) return _keyAccessor;
        _keyAccessor = _;
        return _chart;
    };

    /**
    #### .valueAccessor([valueAccessorFunction])
    Set or get the value accessor function. The value accessor function is used to retrieve the
    value from the crossfilter group. Group values are used differently in different charts, for
    example values correspond to slice sizes in a pie chart and y axis positions in a grid
    coordinate chart.
    ```js
    // default value accessor
    chart.valueAccessor(function(d) { return d.value; });
    // custom value accessor for a multi-value crossfilter reduction
    chart.valueAccessor(function(p) { return p.value.percentageGain; });
    ```

    **/
    _chart.valueAccessor = function (_) {
        if (!arguments.length) return _valueAccessor;
        _valueAccessor = _;
        return _chart;
    };

    /**
    #### .label([labelFunction])
    Set or get the label function. The chart class will use this function to render labels for each
    child element in the chart, e.g. slices in a pie chart or bubbles in a bubble chart. Not every
    chart supports the label function for example bar chart and line chart do not use this function
    at all.
    ```js
    // default label function just return the key
    chart.label(function(d) { return d.key; });
    // label function has access to the standard d3 data binding and can get quite complicated
    chart.label(function(d) { return d.data.key + "(" + Math.floor(d.data.value / all.value() * 100) + "%)"; });
    ```

    **/
    _chart.label = function (_) {
        if (!arguments.length) return _label;
        _label = _;
        _renderLabel = true;
        return _chart;
    };

    /**
    #### .renderLabel(boolean)
    Turn on/off label rendering

    **/
    _chart.renderLabel = function (_) {
        if (!arguments.length) return _renderLabel;
        _renderLabel = _;
        return _chart;
    };

    /**
    #### .title([titleFunction])
    Set or get the title function. The chart class will use this function to render the svg title
    (usually interpreted by browser as tooltips) for each child element in the chart, e.g. a slice
    in a pie chart or a bubble in a bubble chart. Almost every chart supports the title function;
    however in grid coordinate charts you need to turn off the brush in order to see titles, because
    otherwise the brush layer will block tooltip triggering.
    ```js
    // default title function just return the key
    chart.title(function(d) { return d.key + ": " + d.value; });
    // title function has access to the standard d3 data binding and can get quite complicated
    chart.title(function(p) {
        return p.key.getFullYear()
            + "\n"
            + "Index Gain: " + numberFormat(p.value.absGain) + "\n"
            + "Index Gain in Percentage: " + numberFormat(p.value.percentageGain) + "%\n"
            + "Fluctuation / Index Ratio: " + numberFormat(p.value.fluctuationPercentage) + "%";
    });
    ```

    **/
    _chart.title = function (_) {
        if (!arguments.length) return _title;
        _title = _;
        _renderTitle = true;
        return _chart;
    };

    /**
    #### .renderTitle(boolean)
    Turn on/off title rendering, or return the state of the render title flag if no arguments are
    given.

    **/
    _chart.renderTitle = function (_) {
        if (!arguments.length) return _renderTitle;
        _renderTitle = _;
        return _chart;
    };

    /**
    #### .renderlet(renderletFunction)
    A renderlet is similar to an event listener on rendering event. Multiple renderlets can be added
    to an individual chart.  Each time a chart is rerendered or redrawn the renderlets are invoked
    right after the chart finishes its own drawing routine, giving you a way to modify the svg
    elements. Renderlet functions take the chart instance as the only input parameter and you can
    use the dc API or use raw d3 to achieve pretty much any effect.
    ```js
    // renderlet function
    chart.renderlet(function(chart){
        // mix of dc API and d3 manipulation
        chart.select("g.y").style("display", "none");
        // its a closure so you can also access other chart variable available in the closure scope
        moveChart.filter(chart.filter());
    });
    ```

    **/
    _chart.renderlet = function (_) {
        _renderlets.push(_);
        return _chart;
    };

    function runAllRenderlets() {
        for (var i = 0; i < _renderlets.length; ++i) {
            _renderlets[i](_chart);
        }
    }

    /**
    #### .chartGroup([group])
    Get or set the chart group to which this chart belongs. Chart groups are rendered or redrawn
    together since it is expected they share the same underlying crossfilter data set.
    **/
    _chart.chartGroup = function (_) {
        if (!arguments.length) return _chartGroup;
        _chartGroup = _;
        return _chart;
    };

    /**
    #### .expireCache()
    Expire the internal chart cache. dc charts cache some data internally on a per chart basis to
    speed up rendering and avoid unnecessary calculation; however it might be useful to clear the
    cache if you have changed state which will affect rendering.  For example if you invoke the
    `crossfilter.add` function or reset group or dimension after rendering it is a good idea to
    clear the cache to make sure charts are rendered properly.

    **/
    _chart.expireCache = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    /**
    #### .legend([dc.legend])
    Attach a dc.legend widget to this chart. The legend widget will automatically draw legend labels
    based on the color setting and names associated with each group.

    ```js
    chart.legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
    ```

    **/
    _chart.legend = function (l) {
        if (!arguments.length) return _legend;
        _legend = l;
        _legend.parent(_chart);
        return _chart;
    };

    /**
    #### .chartID()
    Returns the internal numeric ID of the chart.
    **/
    _chart.chartID = function () {
        return _chart.__dc_flag__;
    };

    /**
    #### .options(optionsObject)
    Set chart options using a configuration object. Each key in the object will cause the method of
    the same name to be called with the value to set that attribute for the chart.

    Example:
    ```
    chart.options({dimension: myDimension, group: myGroup});
    ```
    **/
    _chart.options = function(opts) {
        for (var o in opts) {
            if (typeof(_chart[o]) === 'function') {
                _chart[o].call(_chart,opts[o]);
            } else {
                dc.logger.debug("Not a valid option setter name: " + o);
            }
        }
        return _chart;
    };

    /**
    ## Listeners
    All dc chart instance supports the following listeners.

    #### .on("preRender", function(chart){...})
    This listener function will be invoked before chart rendering.

    #### .on("postRender", function(chart){...})
    This listener function will be invoked after chart finish rendering including all renderlets' logic.

    #### .on("preRedraw", function(chart){...})
    This listener function will be invoked before chart redrawing.

    #### .on("postRedraw", function(chart){...})
    This listener function will be invoked after chart finish redrawing including all renderlets' logic.

    #### .on("filtered", function(chart, filter){...})
    This listener function will be invoked after a filter is applied, added or removed.

    #### .on("zoomed", function(chart, filter){...})
    This listener function will be invoked after a zoom is triggered.

    **/
    _chart.on = function (event, listener) {
        _listeners.on(event, listener);
        return _chart;
    };

    return _chart;
};


/**
## Margin Mixin

Margin is a mixin that provides margin utility functions for both the Row Chart and Coordinate Grid
Charts.

**/
dc.marginMixin = function (_chart) {
    var _margin = {top: 10, right: 50, bottom: 30, left: 30};

    /**
    #### .margins([margins])
    Get or set the margins for a particular coordinate grid chart instance. The margins is stored as
    an associative Javascript array. Default margins: {top: 10, right: 50, bottom: 30, left: 30}.

    The margins can be accessed directly from the getter.
    ```js
    var leftMargin = chart.margins().left; // 30 by default
    chart.margins().left = 50;
    leftMargin = chart.margins().left; // now 50
    ```

    **/
    _chart.margins = function (m) {
        if (!arguments.length) return _margin;
        _margin = m;
        return _chart;
    };

    _chart.effectiveWidth = function () {
        return _chart.width() - _chart.margins().left - _chart.margins().right;
    };

    _chart.effectiveHeight = function () {
        return _chart.height() - _chart.margins().top - _chart.margins().bottom;
    };

    return _chart;
};

/**
## Color Mixin

The Color Mixin is an abstract chart functional class providing universal coloring support
as a mix-in for any concrete chart implementation.

**/

dc.colorMixin = function(_chart) {
    var _colors = d3.scale.category20c();
    var _defaultAccessor = true;

    var _colorAccessor = function(d) { return _chart.keyAccessor()(d); };

    /**
    #### .colors([colorScale])
    Retrieve current color scale or set a new color scale. This methods accepts any function that
    operates like a d3 scale. If not set the default is
    `d3.scale.category20c()`.
    ```js
    // alternate categorical scale
    chart.colors(d3.scale.category20b());

    // ordinal scale
    chart.colors(d3.scale.ordinal().range(['red','green','blue']));
    // convenience method, the same as above
    chart.ordinalColors(['red','green','blue']);

    // set a linear scale
    chart.linearColors(["#4575b4", "#ffffbf", "#a50026"]);
    ```
    **/
    _chart.colors = function(_) {
        if (!arguments.length) return _colors;
        if (_ instanceof Array) _colors = d3.scale.quantize().range(_); // deprecated legacy support, note: this fails for ordinal domains
        else _colors = d3.functor(_);
        return _chart;
    };

    /**
    #### .ordinalColors(r)
    Convenience method to set the color scale to d3.scale.ordinal with range `r`.

    **/
    _chart.ordinalColors = function(r) {
        return _chart.colors(d3.scale.ordinal().range(r));
    };

    /**
    #### .linearColors(r)
    Convenience method to set the color scale to an Hcl interpolated linear scale with range `r`.

    **/
    _chart.linearColors = function(r) {
        return _chart.colors(d3.scale.linear()
                             .range(r)
                             .interpolate(d3.interpolateHcl));
    };

    /**
    #### .colorAccessor([colorAccessorFunction])
    Set or the get color accessor function. This function will be used to map a data point in a
    crossfilter group to a color value on the color scale. The default function uses the key
    accessor.
    ```js
    // default index based color accessor
    .colorAccessor(function(d, i){return i;})
    // color accessor for a multi-value crossfilter reduction
    .colorAccessor(function(d){return d.value.absGain;})
    ```
    **/
    _chart.colorAccessor = function(_){
        if(!arguments.length) return _colorAccessor;
        _colorAccessor = _;
        _defaultAccessor = false;
        return _chart;
    };

    // what is this?
    _chart.defaultColorAccessor = function() {
        return _defaultAccessor;
    };

    /**
    #### .colorDomain([domain])
    Set or get the current domain for the color mapping function. The domain must be supplied as an
    array.

    Note: previously this method accepted a callback function. Instead you may use a custom scale
    set by `.colors`.

    **/
    _chart.colorDomain = function(_){
        if(!arguments.length) return _colors.domain();
        _colors.domain(_);
        return _chart;
    };

    /**
    #### .calculateColorDomain()
    Set the domain by determining the min and max values as retrieved by `.colorAccessor` over the
    chart's dataset.

    **/
    _chart.calculateColorDomain = function () {
        var newDomain = [d3.min(_chart.data(), _chart.colorAccessor()),
                         d3.max(_chart.data(), _chart.colorAccessor())];
        _colors.domain(newDomain);
    };

    /**
    #### .getColor(d [, i])
    Get the color for the datum d and counter i. This is used internally by charts to retrieve a color.

    **/
    _chart.getColor = function(d, i){
        return _colors(_colorAccessor.call(this,d, i));
    };

    /**
     #### .colorCalculator([value])
     Gets or sets chart.getColor.
     **/
    _chart.colorCalculator = function(_){
        if(!arguments.length) return _chart.getColor;
        _chart.getColor = _;
        return _chart;
    };

    return _chart;
};

/**
## Coordinate Grid Mixin

Includes: [Color Mixin](#color-mixin), [Margin Mixin](#margin-mixin), [Base Mixin](#base-mixin)

Coordinate Grid is an abstract base chart designed to support a number of coordinate grid based
concrete chart types, e.g. bar chart, line chart, and bubble chart.

**/
dc.coordinateGridMixin = function (_chart) {
    var GRID_LINE_CLASS = "grid-line";
    var HORIZONTAL_CLASS = "horizontal";
    var VERTICAL_CLASS = "vertical";
    var Y_AXIS_LABEL_CLASS = 'y-axis-label';
    var X_AXIS_LABEL_CLASS = 'x-axis-label';
    var DEFAULT_AXIS_LABEL_PADDING = 12;

    _chart = dc.colorMixin(dc.marginMixin(dc.baseMixin(_chart)));

    _chart.colors(d3.scale.category10());
    _chart._mandatoryAttributes().push('x');

    var _parent;
    var _g;
    var _chartBodyG;

    var _x;
    var _xOriginalDomain;
    var _xAxis = d3.svg.axis().orient("bottom");
    var _xUnits = dc.units.integers;
    var _xAxisPadding = 0;
    var _xElasticity = false;
    var _xAxisLabel;
    var _xAxisLabelPadding = 0;
    var _lastXDomain;

    var _y;
    var _yAxis = d3.svg.axis().orient("left");
    var _yAxisPadding = 0;
    var _yElasticity = false;
    var _yAxisLabel;
    var _yAxisLabelPadding = 0;

    var _brush = d3.svg.brush();
    var _brushOn = true;
    var _round;

    var _renderHorizontalGridLine = false;
    var _renderVerticalGridLine = false;

    var _refocused = false;
    var _unitCount;

    var _zoomScale = [1, Infinity];
    var _zoomOutRestrict = true;

    var _zoom = d3.behavior.zoom().on("zoom", zoomHandler);
    var _nullZoom = d3.behavior.zoom().on("zoom", null);
    var _hasBeenMouseZoomable = false;

    var _rangeChart;
    var _focusChart;

    var _mouseZoomable = false;
    var _clipPadding = 0;

    var _outerRangeBandPadding = 0.5;
    var _rangeBandPadding = 0;

    var _useRightYAxis = false;

    _chart.rescale = function () {
        _unitCount = undefined;
    };

    /**
    #### .rangeChart([chart])
    Get or set the range selection chart associated with this instance. Setting the range selection
    chart using this function will automatically update its selection brush when the current chart
    zooms in. In return the given range chart will also automatically attach this chart as its focus
    chart hence zoom in when range brush updates. See the [Nasdaq 100
    Index](http://dc-js.github.com/dc.js/) example for this effect in action.

    **/
    _chart.rangeChart = function (_) {
        if (!arguments.length) return _rangeChart;
        _rangeChart = _;
        _rangeChart.focusChart(_chart);
        return _chart;
    };

    /**
    #### .zoomScale([extent])
    Get or set the scale extent for mouse zooms.

    **/
    _chart.zoomScale = function (_) {
        if (!arguments.length) return _zoomScale;
        _zoomScale = _;
        return _chart;
    };

    /**
    #### .zoomOutRestrict([true/false])
    Get or set the zoom restriction for the chart. If true limits the zoom to origional domain of the chart.
    **/
    _chart.zoomOutRestrict = function (r) {
        if (!arguments.length) return _zoomOutRestrict;
        _zoomScale[0] = r ? 1 : 0;
        _zoomOutRestrict = r;
        return _chart;
    };

    _chart._generateG = function (parent) {
        if (parent === undefined)
            _parent = _chart.svg();
        else
            _parent = parent;

        _g = _parent.append("g");

        _chartBodyG = _g.append("g").attr("class", "chart-body")
            .attr("transform", "translate(" + _chart.margins().left + ", " + _chart.margins().top + ")")
            .attr("clip-path", "url(#" + getClipPathId() + ")");

        return _g;
    };

    /**
    #### .g([gElement])
    Get or set the root g element. This method is usually used to retrieve the g element in order to
    overlay custom svg drawing programatically. **Caution**: The root g element is usually generated
    by dc.js internals, and resetting it might produce unpredictable result.

    **/
    _chart.g = function (_) {
        if (!arguments.length) return _g;
        _g = _;
        return _chart;
    };

    /**
    #### .mouseZoomable([boolean])
    Set or get mouse zoom capability flag (default: false). When turned on the chart will be
    zoomable using the mouse wheel. If the range selector chart is attached zooming will also update
    the range selection brush on the associated range selector chart.

    **/
    _chart.mouseZoomable = function (z) {
        if (!arguments.length) return _mouseZoomable;
        _mouseZoomable = z;
        return _chart;
    };

    /**
    #### .chartBodyG()
    Retrieve the svg group for the chart body.
    **/
    _chart.chartBodyG = function (_) {
        if (!arguments.length) return _chartBodyG;
        _chartBodyG = _;
        return _chart;
    };

    /**
    #### .x([xScale]) - **mandatory**
    Get or set the x scale. The x scale can be any d3
    [quantitive scale](https://github.com/mbostock/d3/wiki/Quantitative-Scales) or
    [ordinal scale](https://github.com/mbostock/d3/wiki/Ordinal-Scales).
    ```js
    // set x to a linear scale
    chart.x(d3.scale.linear().domain([-2500, 2500]))
    // set x to a time scale to generate histogram
    chart.x(d3.time.scale().domain([new Date(1985, 0, 1), new Date(2012, 11, 31)]))
    ```

    **/
    _chart.x = function (_) {
        if (!arguments.length) return _x;
        _x = _;
        _xOriginalDomain = _x.domain();
        return _chart;
    };

    _chart.xOriginalDomain = function () {
        return _xOriginalDomain;
    };

    /**
    #### .xUnits([xUnits function])
    Set or get the xUnits function. The coordinate grid chart uses the xUnits function to calculate
    the number of data projections on x axis such as the number of bars for a bar chart or the
    number of dots for a line chart. This function is expected to return a Javascript array of all
    data points on x axis, or the number of points on the axis. [d3 time range functions
    d3.time.days, d3.time.months, and
    d3.time.years](https://github.com/mbostock/d3/wiki/Time-Intervals#aliases) are all valid xUnits
    function. dc.js also provides a few units function, see the [Utilities](#utilities) section for
    a list of built-in units functions. The default xUnits function is dc.units.integers.
    ```js
    // set x units to count days
    chart.xUnits(d3.time.days);
    // set x units to count months
    chart.xUnits(d3.time.months);
    ```
    A custom xUnits function can be used as long as it follows the following interface:
    ```js
    // units in integer
    function(start, end, xDomain) {
        // simply calculates how many integers in the domain
        return Math.abs(end - start);
    };

    // fixed units
    function(start, end, xDomain) {
        // be aware using fixed units will disable the focus/zoom ability on the chart
        return 1000;
    };
    ```

    **/
    _chart.xUnits = function (_) {
        if (!arguments.length) return _xUnits;
        _xUnits = _;
        return _chart;
    };

    /**
    #### .xAxis([xAxis])
    Set or get the x axis used by a particular coordinate grid chart instance. This function is most
    useful when x axis customization is required. The x axis in dc.js is an instance of a [d3
    axis object](https://github.com/mbostock/d3/wiki/SVG-Axes#wiki-axis); therefore it supports any
    valid d3 axis manipulation. **Caution**: The x axis is usually generated internally by dc;
    resetting it may cause unexpected results.
    ```js
    // customize x axis tick format
    chart.xAxis().tickFormat(function(v) {return v + "%";});
    // customize x axis tick values
    chart.xAxis().tickValues([0, 100, 200, 300]);
    ```

    **/
    _chart.xAxis = function (_) {
        if (!arguments.length) return _xAxis;
        _xAxis = _;
        return _chart;
    };

    /**
    #### .elasticX([boolean])
    Turn on/off elastic x axis behavior. If x axis elasticity is turned on, then the grid chart will
    attempt to recalculate the x axis range whenever a redraw event is triggered.

    **/
    _chart.elasticX = function (_) {
        if (!arguments.length) return _xElasticity;
        _xElasticity = _;
        return _chart;
    };

    /**
    #### .xAxisPadding([padding])
    Set or get x axis padding for the elastic x axis. The padding will be added to both end of the x
    axis if elasticX is turned on; otherwise it is ignored.

    * padding can be an integer or percentage in string (e.g. "10%"). Padding can be applied to
    number or date x axes.  When padding a date axis, an integer represents number of days being padded
    and a percentage string will be treated the same as an integer.

    **/
    _chart.xAxisPadding = function (_) {
        if (!arguments.length) return _xAxisPadding;
        _xAxisPadding = _;
        return _chart;
    };

    /**
    #### .xUnitCount()
    Returns the number of units displayed on the x axis using the unit measure configured by
    .xUnits.
    **/
    _chart.xUnitCount = function () {
        if (_unitCount === undefined) {
            var units = _chart.xUnits()(_chart.x().domain()[0], _chart.x().domain()[1], _chart.x().domain());

            if (units instanceof Array)
                _unitCount = units.length;
            else
                _unitCount = units;
        }

        return _unitCount;
    };
    /**
     #### .useRightYAxis()
     Gets or sets whether the chart should be drawn with a right axis instead of a left axis. When
     used with a chart in a composite chart, allows both left and right Y axes to be shown on a
     chart.
     **/

    _chart.useRightYAxis = function (_) {
        if (!arguments.length) return _useRightYAxis;
        _useRightYAxis = _;
        return _chart;
    };

    /**
    #### isOrdinal()
    Returns true if the chart is using ordinal xUnits ([dc.units.ordinal](#dcunitsordinal)), or false
    otherwise. Most charts behave differently with ordinal data and use the result of this method to
    trigger the appropriate logic.
    **/
    _chart.isOrdinal = function () {
        return _chart.xUnits() === dc.units.ordinal;
    };

    _chart._useOuterPadding = function() {
        return true;
    };

    _chart._ordinalXDomain = function() {
        var groups = _chart._computeOrderedGroups(_chart.data());
        return groups.map(_chart.keyAccessor());
    };

    function prepareXAxis(g) {
        if(!_chart.isOrdinal()) {
            if (_chart.elasticX())
                _x.domain([_chart.xAxisMin(), _chart.xAxisMax()]);
        }
        else { // _chart.isOrdinal()
            if(_chart.elasticX() || _x.domain().length===0)
                _x.domain(_chart._ordinalXDomain());
        }

        // has the domain changed?
        var xdom = _x.domain();
        if(!_lastXDomain || xdom.some(function(elem, i) { return elem != _lastXDomain[i]; }))
            _chart.rescale();
        _lastXDomain = xdom;

        // please can't we always use rangeBands for bar charts?
        if (_chart.isOrdinal()) {
            _x.rangeBands([0,_chart.xAxisLength()],_rangeBandPadding,
                          _chart._useOuterPadding()?_outerRangeBandPadding:0);
        } else {
            _x.range([0, _chart.xAxisLength()]);
        }

        _xAxis = _xAxis.scale(_chart.x());

        renderVerticalGridLines(g);
    }

    _chart.renderXAxis = function (g) {
        var axisXG = g.selectAll("g.x");

        if (axisXG.empty())
            axisXG = g.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(" + _chart.margins().left + "," + _chart._xAxisY() + ")");

        var axisXLab = g.selectAll("text."+X_AXIS_LABEL_CLASS);
        if (axisXLab.empty() && _chart.xAxisLabel())
            axisXLab = g.append('text')
                .attr("transform", "translate(" + (_chart.margins().left + _chart.xAxisLength() / 2) + "," + (_chart.height() - _xAxisLabelPadding) + ")")
                .attr('class', X_AXIS_LABEL_CLASS)
                .attr('text-anchor', 'middle')
                .text(_chart.xAxisLabel());
        if (_chart.xAxisLabel() && axisXLab.text() != _chart.xAxisLabel())
            axisXLab.text(_chart.xAxisLabel());

        dc.transition(axisXG, _chart.transitionDuration())
            .call(_xAxis);
    };

    function renderVerticalGridLines(g) {
        var gridLineG = g.selectAll("g." + VERTICAL_CLASS);

        if (_renderVerticalGridLine) {
            if (gridLineG.empty())
                gridLineG = g.insert("g", ":first-child")
                    .attr("class", GRID_LINE_CLASS + " " + VERTICAL_CLASS)
                    .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")");

            var ticks = _xAxis.tickValues() ? _xAxis.tickValues() : _x.ticks(_xAxis.ticks()[0]);

            var lines = gridLineG.selectAll("line")
                .data(ticks);

            // enter
            var linesGEnter = lines.enter()
                .append("line")
                .attr("x1", function (d) {
                    return _x(d);
                })
                .attr("y1", _chart._xAxisY() - _chart.margins().top)
                .attr("x2", function (d) {
                    return _x(d);
                })
                .attr("y2", 0)
                .attr("opacity", 0);
            dc.transition(linesGEnter, _chart.transitionDuration())
                .attr("opacity", 1);

            // update
            dc.transition(lines, _chart.transitionDuration())
                .attr("x1", function (d) {
                    return _x(d);
                })
                .attr("y1", _chart._xAxisY() - _chart.margins().top)
                .attr("x2", function (d) {
                    return _x(d);
                })
                .attr("y2", 0);

            // exit
            lines.exit().remove();
        }
        else {
            gridLineG.selectAll("line").remove();
        }
    }

    _chart._xAxisY = function () {
        return (_chart.height() - _chart.margins().bottom);
    };

    _chart.xAxisLength = function () {
        return _chart.effectiveWidth();
    };

    /**
    #### .xAxisLabel([labelText, [, padding]])
    Set or get the x axis label. If setting the label, you may optionally include additional padding to
    the margin to make room for the label. By default the padded is set to 12 to accomodate the text height.
    **/
    _chart.xAxisLabel = function (_, padding) {
        if (!arguments.length) return _xAxisLabel;
        _xAxisLabel = _;
        _chart.margins().bottom -= _xAxisLabelPadding;
        _xAxisLabelPadding = (padding === undefined) ? DEFAULT_AXIS_LABEL_PADDING : padding;
        _chart.margins().bottom += _xAxisLabelPadding;
        return _chart;
    };

    _chart._prepareYAxis = function(g) {
        if (_y === undefined || _chart.elasticY()) {
            _y = d3.scale.linear();
            var min = _chart.yAxisMin() || 0,
                max = _chart.yAxisMax() || 0;
            _y.domain([min, max]).rangeRound([_chart.yAxisHeight(), 0]);
        }

        _y.range([_chart.yAxisHeight(), 0]);
        _yAxis = _yAxis.scale(_y);

        if (_useRightYAxis)
            _yAxis.orient("right");

        _chart._renderHorizontalGridLinesForAxis(g, _y, _yAxis);
    };

    _chart.renderYAxisLabel = function(axisClass, text, rotation, labelXPosition) {
        labelXPosition = labelXPosition || _yAxisLabelPadding;

        var axisYLab = _chart.g().selectAll("text." + Y_AXIS_LABEL_CLASS + "." + axisClass + "-label");
        if (axisYLab.empty() && text) {

            var labelYPosition = (_chart.margins().top + _chart.yAxisHeight() / 2);
            axisYLab = _chart.g().append('text')
                .attr("transform", "translate(" + labelXPosition + "," + labelYPosition + "),rotate(" + rotation + ")")
                .attr('class', Y_AXIS_LABEL_CLASS + " " + axisClass + "-label")
                .attr('text-anchor', 'middle')
                .text(text);
        }
        if (text && axisYLab.text() != text) {
            axisYLab.text(text);
        }
    };

    _chart.renderYAxisAt = function (axisClass, axis, position){
        var axisYG = _chart.g().selectAll("g." + axisClass);
        if (axisYG.empty()) {
            axisYG = _chart.g().append("g")
                .attr("class", "axis " + axisClass)
                .attr("transform", "translate(" + position + "," + _chart.margins().top + ")");
        }

        dc.transition(axisYG, _chart.transitionDuration()).call(axis);
    };

    _chart.renderYAxis = function () {
        var axisPosition = _useRightYAxis ? (_chart.width() - _chart.margins().right) : _chart._yAxisX();
        _chart.renderYAxisAt("y", _yAxis, axisPosition);
        var labelPosition = _useRightYAxis ? (_chart.width() - _yAxisLabelPadding) : _yAxisLabelPadding;
        var rotation = _useRightYAxis ? 90 : -90;
        _chart.renderYAxisLabel("y", _chart.yAxisLabel(), rotation, labelPosition);
    };

    _chart._renderHorizontalGridLinesForAxis = function (g, scale, axis) {
        var gridLineG = g.selectAll("g." + HORIZONTAL_CLASS);

        if (_renderHorizontalGridLine) {
            var ticks = axis.tickValues() ? axis.tickValues() : scale.ticks(axis.ticks()[0]);

            if (gridLineG.empty()) {
                gridLineG = g.insert("g", ":first-child")
                    .attr("class", GRID_LINE_CLASS + " " + HORIZONTAL_CLASS)
                    .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")");
            }

            var lines = gridLineG.selectAll("line")
                .data(ticks);

            // enter
            var linesGEnter = lines.enter()
                .append("line")
                .attr("x1", 1)
                .attr("y1", function (d) {
                    return scale(d);
                })
                .attr("x2", _chart.xAxisLength())
                .attr("y2", function (d) {
                    return scale(d);
                })
                .attr("opacity", 0);
            dc.transition(linesGEnter, _chart.transitionDuration())
                .attr("opacity", 1);

            // update
            dc.transition(lines, _chart.transitionDuration())
                .attr("x1", 1)
                .attr("y1", function (d) {
                    return scale(d);
                })
                .attr("x2", _chart.xAxisLength())
                .attr("y2", function (d) {
                    return scale(d);
                });

            // exit
            lines.exit().remove();
        }
        else {
            gridLineG.selectAll("line").remove();
        }
    };

    _chart._yAxisX = function () {
        return _chart.useRightYAxis() ? _chart.width() - _chart.margins().right : _chart.margins().left;
    };


    /**
    #### .yAxisLabel([labelText, [, padding]])
    Set or get the y axis label. If setting the label, you may optionally include additional padding
    to the margin to make room for the label. By default the padded is set to 12 to accomodate the
    text height.
    **/
    _chart.yAxisLabel = function (_, padding) {
        if (!arguments.length) return _yAxisLabel;
        _yAxisLabel = _;
        _chart.margins().left -= _yAxisLabelPadding;
        _yAxisLabelPadding = (padding === undefined) ? DEFAULT_AXIS_LABEL_PADDING : padding;
        _chart.margins().left += _yAxisLabelPadding;
        return _chart;
    };

    /**
    #### .y([yScale])
    Get or set the y scale. The y scale is typically automatically determined by the chart implementation.

    **/
    _chart.y = function (_) {
        if (!arguments.length) return _y;
        _y = _;
        return _chart;
    };

    /**
    #### .yAxis([yAxis])
    Set or get the y axis used by the coordinate grid chart instance. This function is most useful
    when y axis customization is required. The y axis in dc.js is simply an instance of a [d3 axis
    object](https://github.com/mbostock/d3/wiki/SVG-Axes#wiki-_axis); therefore it supports any
    valid d3 axis manipulation. **Caution**: The y axis is usually generated internally by dc;
    resetting it may cause unexpected results.
    ```js
    // customize y axis tick format
    chart.yAxis().tickFormat(function(v) {return v + "%";});
    // customize y axis tick values
    chart.yAxis().tickValues([0, 100, 200, 300]);
    ```

    **/
    _chart.yAxis = function (y) {
        if (!arguments.length) return _yAxis;
        _yAxis = y;
        return _chart;
    };

    /**
    #### .elasticY([boolean])
    Turn on/off elastic y axis behavior. If y axis elasticity is turned on, then the grid chart will
    attempt to recalculate the y axis range whenever a redraw event is triggered.

    **/
    _chart.elasticY = function (_) {
        if (!arguments.length) return _yElasticity;
        _yElasticity = _;
        return _chart;
    };

    /**
    #### .renderHorizontalGridLines([boolean])
    Turn on/off horizontal grid lines.

    **/
    _chart.renderHorizontalGridLines = function (_) {
        if (!arguments.length) return _renderHorizontalGridLine;
        _renderHorizontalGridLine = _;
        return _chart;
    };

    /**
    #### .renderVerticalGridLines([boolean])
    Turn on/off vertical grid lines.

    **/
    _chart.renderVerticalGridLines = function (_) {
        if (!arguments.length) return _renderVerticalGridLine;
        _renderVerticalGridLine = _;
        return _chart;
    };

    /**
    #### .xAxisMin()
    Calculates the minimum x value to display in the chart. Includes xAxisPadding if set.
    **/
    _chart.xAxisMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return _chart.keyAccessor()(e);
        });
        return dc.utils.subtract(min, _xAxisPadding);
    };

    /**
    #### .xAxisMax()
    Calculates the maximum x value to display in the chart. Includes xAxisPadding if set.
    **/
    _chart.xAxisMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return _chart.keyAccessor()(e);
        });
        return dc.utils.add(max, _xAxisPadding);
    };

    /**
    #### .yAxisMin()
    Calculates the minimum y value to display in the chart. Includes yAxisPadding if set.
    **/
    _chart.yAxisMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return _chart.valueAccessor()(e);
        });
        return dc.utils.subtract(min, _yAxisPadding);
    };

    /**
    #### .yAxisMax()
    Calculates the maximum y value to display in the chart. Includes yAxisPadding if set.
    **/
    _chart.yAxisMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return _chart.valueAccessor()(e);
        });
        return dc.utils.add(max, _yAxisPadding);
    };

    /**
    #### .yAxisPadding([padding])
    Set or get y axis padding for the elastic y axis. The padding will be added to the top of the y
    axis if elasticY is turned on; otherwise it is ignored.

    * padding can be an integer or percentage in string (e.g. "10%"). Padding can be applied to
    number or date axes. When padding a date axis, an integer represents number of days being padded
    and a percentage string will be treated the same as an integer.

    **/
    _chart.yAxisPadding = function (_) {
        if (!arguments.length) return _yAxisPadding;
        _yAxisPadding = _;
        return _chart;
    };

    _chart.yAxisHeight = function () {
        return _chart.effectiveHeight();
    };

    /**
    #### .round([rounding function])
    Set or get the rounding function used to quantize the selection when brushing is enabled.
    ```js
    // set x unit round to by month, this will make sure range selection brush will
    // select whole months
    chart.round(d3.time.month.round);
    ```

    **/
    _chart.round = function (_) {
        if (!arguments.length) return _round;
        _round = _;
        return _chart;
    };

    _chart._rangeBandPadding = function (_) {
        if (!arguments.length) return _rangeBandPadding;
        _rangeBandPadding = _;
        return _chart;
    };

    _chart._outerRangeBandPadding = function (_) {
        if (!arguments.length) return _outerRangeBandPadding;
        _outerRangeBandPadding = _;
        return _chart;
    };

    dc.override(_chart, "filter", function (_) {
        if (!arguments.length) return _chart._filter();

        _chart._filter(_);

        if (_) {
            _chart.brush().extent(_);
        } else {
            _chart.brush().clear();
        }

        return _chart;
    });

    _chart.brush = function (_) {
        if (!arguments.length) return _brush;
        _brush = _;
        return _chart;
    };

    function brushHeight() {
        return _chart._xAxisY() - _chart.margins().top;
    }

    _chart.renderBrush = function (g) {
        if (_brushOn) {
            _brush.on("brush", _chart._brushing);
            _brush.on("brushstart", _chart._disableMouseZoom);
            _brush.on("brushend", configureMouseZoom);

            var gBrush = g.append("g")
                .attr("class", "brush")
                .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")")
                .call(_brush.x(_chart.x()));
            _chart.setBrushY(gBrush);
            _chart.setHandlePaths(gBrush);

            if (_chart.hasFilter()) {
                _chart.redrawBrush(g);
            }
        }
    };

    _chart.setHandlePaths = function (gBrush) {
        gBrush.selectAll(".resize").append("path").attr("d", _chart.resizeHandlePath);
    };

    _chart.setBrushY = function(gBrush){
        gBrush.selectAll("rect").attr("height", brushHeight());
    };

    _chart.extendBrush = function () {
        var extent = _brush.extent();
        if (_chart.round()) {
            extent[0] = extent.map(_chart.round())[0];
            extent[1] = extent.map(_chart.round())[1];

            _g.select(".brush")
                .call(_brush.extent(extent));
        }
        return extent;
    };

    _chart.brushIsEmpty = function (extent) {
        return _brush.empty() || !extent || extent[1] <= extent[0];
    };

    _chart._brushing = function() {
        var extent = _chart.extendBrush();

        _chart.redrawBrush(_g);

        if (_chart.brushIsEmpty(extent)) {
            dc.events.trigger(function () {
                _chart.filter(null);
                _chart.redrawGroup();
            }, dc.constants.EVENT_DELAY);
        } else {
            var rangedFilter = dc.filters.RangedFilter(extent[0], extent[1]);

            dc.events.trigger(function () {
                _chart.replaceFilter(rangedFilter);
                _chart.redrawGroup();
            }, dc.constants.EVENT_DELAY);
        }
    };

    _chart.redrawBrush = function (g) {
        if (_brushOn) {
            if (_chart.filter() && _chart.brush().empty())
                _chart.brush().extent(_chart.filter());

            var gBrush = g.select("g.brush");
            gBrush.call(_chart.brush().x(_chart.x()));
            _chart.setBrushY(gBrush);
        }

        _chart.fadeDeselectedArea();
    };

    _chart.fadeDeselectedArea = function () {
        // do nothing, sub-chart should override this function
    };

    // borrowed from Crossfilter example
    _chart.resizeHandlePath = function (d) {
        var e = +(d == "e"), x = e ? 1 : -1, y = brushHeight() / 3;
        /*jshint -W014 */
        return "M" + (0.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (0.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
        /*jshint +W014 */
    };

    function getClipPathId() {
        return _chart.anchorName() + "-clip";
    }

    /**
    #### .clipPadding([padding])
    Get or set the padding in pixels for the clip path. Once set padding will be applied evenly to
    the top, left, right, and bottom when the clip path is generated. If set to zero, the clip area
    will be exactly the chart body area minus the margins.  Default: 5

    **/
    _chart.clipPadding = function (p) {
        if (!arguments.length) return _clipPadding;
        _clipPadding = p;
        return _chart;
    };

    function generateClipPath() {
        var defs = dc.utils.appendOrSelect(_parent, "defs");

        var chartBodyClip = dc.utils.appendOrSelect(defs, "clipPath").attr("id", getClipPathId());

        var padding = _clipPadding * 2;

        dc.utils.appendOrSelect(chartBodyClip, "rect")
            .attr("width", _chart.xAxisLength() + padding)
            .attr("height", _chart.yAxisHeight() + padding);
    }

    _chart._preprocessData = function() {};

    _chart._doRender = function () {
        _chart.resetSvg();

        _chart._preprocessData();

        _chart._generateG();
        generateClipPath();

        drawChart(true);

        configureMouseZoom();

        return _chart;
    };

    _chart._doRedraw = function () {
        _chart._preprocessData();

        drawChart(false);

        return _chart;
    };

    function drawChart (render) {
        if (_chart.isOrdinal())
            _brushOn = false;

        prepareXAxis(_chart.g());
        _chart._prepareYAxis(_chart.g());

        _chart.plotData();

        if (_chart.elasticX() || _refocused || render)
            _chart.renderXAxis(_chart.g());

        if (_chart.elasticY() || render)
            _chart.renderYAxis(_chart.g());

        if (render)
            _chart.renderBrush(_chart.g());
        else
            _chart.redrawBrush(_chart.g());
    }

    function configureMouseZoom () {
        if (_mouseZoomable) {
            _chart._enableMouseZoom();
        }
        else if (_hasBeenMouseZoomable) {
            _chart._disableMouseZoom();
        }
    }

    _chart._enableMouseZoom = function () {
        _hasBeenMouseZoomable = true;
        _zoom.x(_chart.x())
            .scaleExtent(_zoomScale)
            .size([_chart.width(),_chart.height()]);
        _chart.root().call(_zoom);
    };

    _chart._disableMouseZoom = function () {
        _chart.root().call(_nullZoom);
    };

    function zoomHandler() {
        _refocused = true;
        if (_zoomOutRestrict) {
            _chart.x().domain(constrainRange(_chart.x().domain(), _xOriginalDomain));
            if (_rangeChart) {
                _chart.x().domain(constrainRange(_chart.x().domain(), _rangeChart.x().domain()));
            }
        }

        var domain = _chart.x().domain();
        var domFilter = dc.filters.RangedFilter(domain[0], domain[1]);

        _chart.replaceFilter(domFilter);
        _chart.rescale();
        _chart.redraw();

        if (_rangeChart && !rangesEqual(_chart.filter(), _rangeChart.filter())) {
            dc.events.trigger( function () {
                _rangeChart.replaceFilter(domFilter);
                _rangeChart.redraw();
            });
        }

        _chart._invokeZoomedListener();

        dc.events.trigger(function () {
            _chart.redrawGroup();
        }, dc.constants.EVENT_DELAY);

        _refocused = !rangesEqual(domain, _xOriginalDomain);
    }

    function constrainRange(range, constraint) {
        var constrainedRange = [];
        constrainedRange[0] = d3.max([range[0], constraint[0]]);
        constrainedRange[1] = d3.min([range[1], constraint[1]]);
        return constrainedRange;
    }

    /**
    #### .focus([range])
    Zoom this chart to focus on the given range. The given range should be an array containing only
    2 elements (`[start, end]`) defining a range in the x domain. If the range is not given or set
    to null, then the zoom will be reset. _For focus to work elasticX has to be turned off;
    otherwise focus will be ignored._
    ```js
    chart.renderlet(function(chart){
        // smooth the rendering through event throttling
        dc.events.trigger(function(){
            // focus some other chart to the range selected by user on this chart
            someOtherChart.focus(chart.filter());
        });
    })
    ```

    **/
    _chart.focus = function (range) {
        if (hasRangeSelected(range))
            _chart.x().domain(range);
        else
            _chart.x().domain(_xOriginalDomain);

        _zoom.x(_chart.x());
        zoomHandler();
    };

    _chart.refocused = function () {
        return _refocused;
    };

    _chart.focusChart = function (c) {
        if (!arguments.length) return _focusChart;
        _focusChart = c;
        _chart.on("filtered", function (chart) {
            if (!chart.filter()) {
                dc.events.trigger(function() {
                    _focusChart.x().domain(_focusChart.xOriginalDomain());
                });
            } else if (!rangesEqual(chart.filter(), _focusChart.filter())) {
                dc.events.trigger(function () {
                    _focusChart.focus(chart.filter());
                });
            }
        });
        return _chart;
    };

    function rangesEqual(range1, range2) {
        if (!range1 && !range2) {
            return true;
        }
        else if (!range1 || !range2) {
            return false;
        }
        else if (range1.length === 0 && range2.length === 0) {
            return true;
        }
        else if (range1[0].valueOf() === range2[0].valueOf() &&
            range1[1].valueOf() === range2[1].valueOf()) {
            return true;
        }
        else return false;
    }

    /**
    #### .brushOn([boolean])
    Turn on/off the brush-based range filter. When brushing is on then user can drag the mouse
    across a chart with a quantitative scale to perform range filtering based on the extent of the
    brush, or click on the bars of an ordinal bar chart or slices of a pie chart to filter and
    unfilter them. However turning on the brush filter will disable other interactive elements on
    the chart such as highlighting, tool tips, and reference lines. Zooming will still be possible
    if enabled, but only via scrolling (panning will be disabled.) Default: true

    **/
    _chart.brushOn = function (_) {
        if (!arguments.length) return _brushOn;
        _brushOn = _;
        return _chart;
    };

    function hasRangeSelected(range) {
        return range instanceof Array && range.length > 1;
    }

    return _chart;
};

/**
## Stack Mixin

Stack Mixin is an mixin that provides cross-chart support of stackability using d3.layout.stack.

**/
dc.stackMixin = function (_chart) {

    var _stackLayout = d3.layout.stack()
        .values(prepareValues);

    var _stack = [];
    var _titles = {};

    var _hidableStacks = false;

    function prepareValues(layer, layerIdx) {
        var valAccessor = layer.accessor || _chart.valueAccessor();
        layer.name = String(layer.name || layerIdx);
        layer.values = layer.group.all().map(function(d,i) {
            return {x: _chart.keyAccessor()(d,i),
                    y: layer.hidden ? null : valAccessor(d,i),
                    data: d,
                    layer: layer.name,
                    hidden: layer.hidden};
        });

        layer.values = layer.values.filter(domainFilter());
        return layer.values;
    }

    function domainFilter() {
        if (!_chart.x()) return d3.functor(true);
        var xDomain = _chart.x().domain();
        if (_chart.isOrdinal()) {
            // TODO #416
            //var domainSet = d3.set(xDomain);
            return function(p) {
                return true; //domainSet.has(p.x);
            };
        }
        if (_chart.elasticX()) {
            return function() { return true; };
        }
        return function(p) {
            //return true;
            return p.x >= xDomain[0] && p.x <= xDomain[xDomain.length-1];
        };
    }

    /**
    #### .stack(group[, name, accessor])
    Stack a new crossfilter group onto this chart with an optional custom value accessor. All stacks
    in the same chart will share the same key accessor and therefore the same set of keys.

    For example, in a stacked bar chart, the bars of each stack will be positioned using the same set
    of keys on the x axis, while stacked vertically. If name is specified then it will be used to
    generate the legend label.
    ```js
    // stack group using default accessor
    chart.stack(valueSumGroup)
    // stack group using custom accessor
    .stack(avgByDayGroup, function(d){return d.value.avgByDay;});
    ```

    **/
    _chart.stack = function (group, name, accessor) {
        if (!arguments.length) return _stack;

        if (arguments.length <= 2)
            accessor = name;

        var layer = {group:group};
        if (typeof name === 'string') layer.name = name;
        if (typeof accessor === 'function') layer.accessor = accessor;
        _stack.push(layer);

        return _chart;
    };

    dc.override(_chart,'group', function (g,n,f) {
        if (!arguments.length) return _chart._group();
        _stack = [];
        _titles = {};
        _chart.stack(g,n);
        if (f) _chart.valueAccessor(f);
        return _chart._group(g,n);
    });

    /**
    #### .hidableStacks([boolean])
    Allow named stacks to be hidden or shown by clicking on legend items.
    This does not affect the behavior of hideStack or showStack.

    **/
    _chart.hidableStacks = function(_) {
        if (!arguments.length) return _hidableStacks;
        _hidableStacks = _;
        return _chart;
    };

    function findLayerByName(n) {
        var i = _stack.map(dc.pluck('name')).indexOf(n);
        return _stack[i];
    }

    /**
    #### .hideStack(name)
    Hide all stacks on the chart with the given name.
    The chart must be re-rendered for this change to appear.

    **/
    _chart.hideStack = function (stackName) {
        var layer = findLayerByName(stackName);
        if (layer) layer.hidden = true;
        return _chart;
    };

    /**
    #### .showStack(name)
    Show all stacks on the chart with the given name.
    The chart must be re-rendered for this change to appear.

    **/
    _chart.showStack = function (stackName) {
        var layer = findLayerByName(stackName);
        if (layer) layer.hidden = false;
        return _chart;
    };

    _chart.getValueAccessorByIndex = function (index) {
        return _stack[index].accessor || _chart.valueAccessor();
    };

    _chart.yAxisMin = function () {
        var min = d3.min(flattenStack(), function (p) {
            return (p.y + p.y0 < p.y0) ? (p.y + p.y0) : p.y0;
        });

        return dc.utils.subtract(min, _chart.yAxisPadding());

    };

    _chart.yAxisMax = function () {
        var max = d3.max(flattenStack(), function (p) {
            return p.y + p.y0;
        });

        return dc.utils.add(max, _chart.yAxisPadding());
    };

    function flattenStack() {
        return _chart.data().reduce(function(all,layer) {
            return all.concat(layer.values);
        },[]);
    }

    _chart.xAxisMin = function () {
        var min = d3.min(flattenStack(), dc.pluck('x'));
        return dc.utils.subtract(min, _chart.xAxisPadding());
    };

    _chart.xAxisMax = function () {
        var max = d3.max(flattenStack(), dc.pluck('x'));
        return dc.utils.add(max, _chart.xAxisPadding());
    };

    /**
    #### .title([stackName], [titleFunction])
    Set or get the title function. Chart class will use this function to render svg title (usually interpreted by browser
    as tooltips) for each child element in the chart, i.e. a slice in a pie chart or a bubble in a bubble chart. Almost
    every chart supports title function however in grid coordinate chart you need to turn off brush in order to use title
    otherwise the brush layer will block tooltip trigger.

    If the first argument is a stack name, the title function will get or set the title for that stack. If stackName
    is not provided, the first stack is implied.
    ```js
    // set a title function on "first stack"
    chart.title("first stack", function(d) { return d.key + ": " + d.value; });
    // get a title function from "second stack"
    var secondTitleFunction = chart.title("second stack");
    );
    ```
    **/
    dc.override(_chart, "title", function (stackName, titleAccessor) {
        if (!stackName) return _chart._title();

        if (typeof stackName === 'function') return _chart._title(stackName);
        if (stackName == _chart._groupName && typeof titleAccessor === 'function')
            return _chart._title(titleAccessor);

        if (typeof titleAccessor !== 'function') return _titles[stackName] || _chart._title();

        _titles[stackName] = titleAccessor;

        return _chart;
    });

    /**
     #### .stackLayout([layout])
     Gets or sets the stack layout algorithm, which computes a baseline for each stack and
     propagates it to the next.  The default is
     [d3.layout.stack](https://github.com/mbostock/d3/wiki/Stack-Layout#stack).
     **/
    _chart.stackLayout = function (stack) {
        if (!arguments.length) return _stackLayout;
        _stackLayout = stack;
        return _chart;
    };

    function visability(l) {
        return !l.hidden;
    }

    _chart.data(function() {
        var layers = _stack.filter(visability);
        return layers.length ? _chart.stackLayout()(layers) : [];
    });

    _chart._ordinalXDomain = function () {
        return flattenStack().map(dc.pluck('x'));
    };

    _chart.colorAccessor(function (d) {
        var layer = this.layer || this.name || d.name || d.layer;
        return layer;
    });

    _chart.legendables = function () {
        return _stack.map(function (layer, i) {
            return {chart:_chart, name:layer.name, hidden: layer.hidden || false, color:_chart.getColor.call(layer,layer.values,i)};
        });
    };

    _chart.isLegendableHidden = function (d) {
        var layer = findLayerByName(d.name);
        return layer ? layer.hidden : false;
    };

    _chart.legendToggle = function (d) {
        if(_hidableStacks) {
            if (_chart.isLegendableHidden(d)) _chart.showStack(d.name);
            else _chart.hideStack(d.name);
            //_chart.redraw();
            _chart.renderGroup();
        }
    };

    return _chart;
};

/**
## Cap Mixin

Cap is a mixin that groups small data elements below a _cap_ into an *others* grouping for both the
Row and Pie Charts.

The top ordered elements in the group up to the cap amount will be kept in the chart, and the rest
will be replaced with an *others* element, with value equal to the sum of the replaced values. The
keys of the elements below the cap limit are recorded in order to filter by those keys when the
*others* element is clicked.

**/
dc.capMixin = function (_chart) {

    var _cap = Infinity;

    var _othersLabel = "Others";

    var _othersGrouper = function (topRows) {
        var topRowsSum = d3.sum(topRows, _chart.valueAccessor()),
            allRows = _chart.group().all(),
            allRowsSum = d3.sum(allRows, _chart.valueAccessor()),
            topKeys = topRows.map(_chart.keyAccessor()),
            allKeys = allRows.map(_chart.keyAccessor()),
            topSet = d3.set(topKeys),
            others = allKeys.filter(function(d){return !topSet.has(d);});
        if (allRowsSum > topRowsSum)
            return topRows.concat([{"others": others, "key": _othersLabel, "value": allRowsSum - topRowsSum}]);
        return topRows;
    };

    _chart.cappedKeyAccessor = function(d,i) {
        if (d.others)
            return d.key;
        return _chart.keyAccessor()(d,i);
    };

    _chart.cappedValueAccessor = function(d,i) {
        if (d.others)
            return d.value;
        return _chart.valueAccessor()(d,i);
    };

    _chart.data(function(group) {
        if (_cap == Infinity) {
            return _chart._computeOrderedGroups(group.all());
        } else {
            var topRows = group.top(_cap); // ordered by crossfilter group order (default value)
            topRows = _chart._computeOrderedGroups(topRows); // re-order using ordering (default key)
            if (_othersGrouper) return _othersGrouper(topRows);
            return topRows;
        }
    });

    /**
    #### .cap([count])
    Get or set the count of elements to that will be included in the cap.
    **/
    _chart.cap = function (_) {
        if (!arguments.length) return _cap;
        _cap = _;
        return _chart;
    };

    /**
    #### .othersLabel([label])
    Get or set the label for *Others* slice when slices cap is specified. Default label is **Others**.
    **/
    _chart.othersLabel = function (_) {
        if (!arguments.length) return _othersLabel;
        _othersLabel = _;
        return _chart;
    };

    /**
    #### .othersGrouper([grouperFunction])
    Get or set the grouper function that will perform the insertion of data for the *Others* slice
    if the slices cap is specified. If set to a falsy value, no others will be added. By default the
    grouper function computes the sum of all values below the cap.
    ```js
    chart.othersGrouper(function (data) {
        // compute the value for others, presumably the sum of all values below the cap
        var othersSum  = yourComputeOthersValueLogic(data)

        // the keys are needed to properly filter when the others element is clicked
        var othersKeys = yourComputeOthersKeysArrayLogic(data);

        // add the others row to the dataset
        data.push({"key": "Others", "value": othersSum, "others": othersKeys });

        return data;
    });
    ```
    **/
    _chart.othersGrouper = function (_) {
        if (!arguments.length) return _othersGrouper;
        _othersGrouper = _;
        return _chart;
    };

    dc.override(_chart, "onClick", function (d) {
        if (d.others)
            _chart.filter([d.others]);
        _chart._onClick(d);
    });

    return _chart;
};

/**
## Bubble Mixin

Includes: [Color Mixin](#color-mixin)

This Mixin provides reusable functionalities for any chart that needs to visualize data using bubbles.

**/
dc.bubbleMixin = function (_chart) {
    var _maxBubbleRelativeSize = 0.3;
    var _minRadiusWithLabel = 10;

    _chart.BUBBLE_NODE_CLASS = "node";
    _chart.BUBBLE_CLASS = "bubble";
    _chart.MIN_RADIUS = 10;

    _chart = dc.colorMixin(_chart);

    _chart.renderLabel(true);
    _chart.renderTitle(false);

    _chart.data(function(group) {
        return group.top(Infinity);
    });

    var _r = d3.scale.linear().domain([0, 100]);

    var _rValueAccessor = function (d) {
        return d.r;
    };

    /**
    #### .r([bubbleRadiusScale])
    Get or set the bubble radius scale. By default the bubble chart uses
    `d3.scale.linear().domain([0, 100])` as its r scale .

    **/
    _chart.r = function (_) {
        if (!arguments.length) return _r;
        _r = _;
        return _chart;
    };

    /**
    #### .radiusValueAccessor([radiusValueAccessor])
    Get or set the radius value accessor function. If set, the radius value accessor function will
    be used to retrieve a data value for each bubble. The data retrieved then will be mapped using
    the r scale to the actual bubble radius. This allows you to encode a data dimension using bubble
    size.

    **/
    _chart.radiusValueAccessor = function (_) {
        if (!arguments.length) return _rValueAccessor;
        _rValueAccessor = _;
        return _chart;
    };

    _chart.rMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return _chart.radiusValueAccessor()(e);
        });
        return min;
    };

    _chart.rMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return _chart.radiusValueAccessor()(e);
        });
        return max;
    };

    _chart.bubbleR = function (d) {
        var value = _chart.radiusValueAccessor()(d);
        var r = _chart.r()(value);
        if (isNaN(r) || value <= 0)
            r = 0;
        return r;
    };

    var labelFunction = function (d) {
        return _chart.label()(d);
    };

    var labelOpacity = function (d) {
        return (_chart.bubbleR(d) > _minRadiusWithLabel) ? 1 : 0;
    };

    _chart._doRenderLabel = function (bubbleGEnter) {
        if (_chart.renderLabel()) {
            var label = bubbleGEnter.select("text");

            if (label.empty()) {
                label = bubbleGEnter.append("text")
                    .attr("text-anchor", "middle")
                    .attr("dy", ".3em")
                    .on("click", _chart.onClick);
            }

            label
                .attr("opacity", 0)
                .text(labelFunction);
            dc.transition(label, _chart.transitionDuration())
                .attr("opacity", labelOpacity);
        }
    };

    _chart.doUpdateLabels = function (bubbleGEnter) {
        if (_chart.renderLabel()) {
            var labels = bubbleGEnter.selectAll("text")
                .text(labelFunction);
            dc.transition(labels, _chart.transitionDuration())
                .attr("opacity", labelOpacity);
        }
    };

    var titleFunction = function (d) {
        return _chart.title()(d);
    };

    _chart._doRenderTitles = function (g) {
        if (_chart.renderTitle()) {
            var title = g.select("title");

            if (title.empty())
                g.append("title").text(titleFunction);
        }
    };

    _chart.doUpdateTitles = function (g) {
        if (_chart.renderTitle()) {
            g.selectAll("title").text(titleFunction);
        }
    };

    /**
    #### .minRadiusWithLabel([radius])
    Get or set the minimum radius for label rendering. If a bubble's radius is less than this value
    then no label will be rendered.  Default: 10

    **/
    _chart.minRadiusWithLabel = function (_) {
        if (!arguments.length) return _minRadiusWithLabel;
        _minRadiusWithLabel = _;
        return _chart;
    };

    /**
    #### .maxBubbleRelativeSize([relativeSize])
    Get or set the maximum relative size of a bubble to the length of x axis. This value is useful
    when the difference in radius between bubbles is too great. Default: 0.3

    **/
    _chart.maxBubbleRelativeSize = function (_) {
        if (!arguments.length) return _maxBubbleRelativeSize;
        _maxBubbleRelativeSize = _;
        return _chart;
    };

    _chart.fadeDeselectedArea = function () {
        if (_chart.hasFilter()) {
            _chart.selectAll("g." + _chart.BUBBLE_NODE_CLASS).each(function (d) {
                if (_chart.isSelectedNode(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll("g." + _chart.BUBBLE_NODE_CLASS).each(function (d) {
                _chart.resetHighlight(this);
            });
        }
    };

    _chart.isSelectedNode = function (d) {
        return _chart.hasFilter(d.key);
    };

    _chart.onClick = function (d) {
        var filter = d.key;
        dc.events.trigger(function () {
            _chart.filter(filter);
            _chart.redrawGroup();
        });
    };

    return _chart;
};

/**
## Pie Chart

Includes: [Cap Mixin](#cap-mixin), [Color Mixin](#color-mixin), [Base Mixin](#base-mixin)

The pie chart implementation is usually used to visualize a small categorical distribution.  The pie
chart uses keyAccessor to determine the slices, and valueAccessor to calculate the size of each
slice relative to the sum of all values. Slices are ordered by `.ordering` which defaults to sorting
by key.

Examples:

* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)

#### dc.pieChart(parent[, chartGroup])
Create a pie chart instance and attaches it to the given parent element.

Parameters:

* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created pie chart instance

```js
// create a pie chart under #chart-container1 element using the default global chart group
var chart1 = dc.pieChart("#chart-container1");
// create a pie chart under #chart-container2 element using chart group A
var chart2 = dc.pieChart("#chart-container2", "chartGroupA");
```

**/
dc.pieChart = function (parent, chartGroup) {
    var DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;

    var _sliceCssClass = "pie-slice";
    var _emptyCssClass = "empty-chart";
    var _emptyTitle = "empty";

    var _radius,
        _innerRadius = 0;

    var _g;
    
    var _cx;

    var _cy;

    var _minAngleForLabel = DEFAULT_MIN_ANGLE_FOR_LABEL;

    var _externalLabelRadius;

    var _chart = dc.capMixin(dc.colorMixin(dc.baseMixin({})));

    _chart.colorAccessor(_chart.cappedKeyAccessor);

    _chart.title(function (d) {
        return _chart.cappedKeyAccessor(d) + ": " + _chart.cappedValueAccessor(d);
    });

    /**
    #### .slicesCap([cap])
    Get or set the maximum number of slices the pie chart will generate. The top slices are determined by
    value from high to low. Other slices exeeding the cap will be rolled up into one single *Others* slice.
    The resulting data will still be sorted by .ordering (default by key).

    **/
    _chart.slicesCap = _chart.cap;

    _chart.label(_chart.cappedKeyAccessor);
    _chart.renderLabel(true);

    _chart.transitionDuration(350);

    _chart._doRender = function () {
        _chart.resetSvg();

        _g = _chart.svg()
            .append("g")
            .attr("transform", "translate(" + _chart.cx() + "," + _chart.cy() + ")");

        drawChart();

        return _chart;
    };

    function drawChart() {
        // set radius on basis of chart dimension if missing
        _radius = _radius ? _radius : d3.min([_chart.width(), _chart.height()]) /2;

        var arc = buildArcs();

        var pie = pieLayout();
        var pieData;
        // if we have data...
        if(d3.sum(_chart.data(), _chart.valueAccessor())) {
            pieData = pie(_chart.data());
            _g.classed(_emptyCssClass, false);
        } else {
            // otherwise we'd be getting NaNs, so override
            // note: abuse others for its ignoring the value accessor
            pieData = pie([{key:_emptyTitle, value:1, others: [_emptyTitle]}]);
            _g.classed(_emptyCssClass, true);
        }

        if (_g) {
            var slices = _g.selectAll("g." + _sliceCssClass)
                .data(pieData);

            createElements(slices, arc, pieData);

            updateElements(pieData, arc);

            removeElements(slices);

            highlightFilter();
        }
    }

    function createElements(slices, arc, pieData) {
        var slicesEnter = createSliceNodes(slices);

        createSlicePath(slicesEnter, arc);

        createTitles(slicesEnter);

        createLabels(pieData, arc);
    }

    function createSliceNodes(slices) {
        var slicesEnter = slices
            .enter()
            .append("g")
            .attr("class", function (d, i) {
                return _sliceCssClass + " _" + i;
            });
        return slicesEnter;
    }

    function createSlicePath(slicesEnter, arc) {
        var slicePath = slicesEnter.append("path")
            .attr("fill", fill)
            .on("click", onClick)
            .attr("d", function (d, i) {
                return safeArc(d, i, arc);
            });

        dc.transition(slicePath, _chart.transitionDuration(), function (s) {
            s.attrTween("d", tweenPie);
        });
    }

    function createTitles(slicesEnter) {
        if (_chart.renderTitle()) {
            slicesEnter.append("title").text(function (d) {
                return _chart.title()(d);
            });
        }
    }

    function positionLabels(labelsEnter, arc) {
        dc.transition(labelsEnter, _chart.transitionDuration())
            .attr("transform", function (d) {
                return labelPosition(d, arc);
            })
            .attr("text-anchor", "middle")
            .text(function (d) {
                var data = d.data;
                if (sliceHasNoData(data) || sliceTooSmall(d))
                    return "";
                return _chart.label()(d.data);
            });
    }

    function createLabels(pieData, arc) {
        if (_chart.renderLabel()) {
            var labels = _g.selectAll("text." + _sliceCssClass)
                .data(pieData);

            labels.exit().remove();

            var labelsEnter = labels
                .enter()
                .append("text")
                .attr("class", function (d, i) {
                    var classes = _sliceCssClass + " _" + i;
                    if(_externalLabelRadius)
                        classes += " external";
                    return classes;
                })
                .on("click", onClick);
            positionLabels(labelsEnter, arc);
        }
    }

    function updateElements(pieData, arc) {
        updateSlicePaths(pieData, arc);
        updateLabels(pieData, arc);
        updateTitles(pieData);
    }

    function updateSlicePaths(pieData, arc) {
        var slicePaths = _g.selectAll("g." + _sliceCssClass)
            .data(pieData)
            .select("path")
            .attr("d", function (d, i) {
                return safeArc(d, i, arc);
            });
        dc.transition(slicePaths, _chart.transitionDuration(),
            function (s) {
                s.attrTween("d", tweenPie);
            }).attr("fill", fill);
    }

    function updateLabels(pieData, arc) {
        if (_chart.renderLabel()) {
            var labels = _g.selectAll("text." + _sliceCssClass)
                .data(pieData);
            positionLabels(labels, arc);
        }
    }

    function updateTitles(pieData) {
        if (_chart.renderTitle()) {
            _g.selectAll("g." + _sliceCssClass)
                .data(pieData)
                .select("title")
                .text(function (d) {
                    return _chart.title()(d.data);
                });
        }
    }

    function removeElements(slices) {
        slices.exit().remove();
    }

    function highlightFilter() {
        if (_chart.hasFilter()) {
            _chart.selectAll("g." + _sliceCssClass).each(function (d) {
                if (isSelectedSlice(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll("g." + _sliceCssClass).each(function (d) {
                _chart.resetHighlight(this);
            });
        }
    }

    /**
    #### .innerRadius([innerRadius])
    Get or set the inner radius of the pie chart. If the inner radius is greater than 0px then the
    pie chart will be rendered as a doughnut chart. Default inner radius is 0px.

    **/
    _chart.innerRadius = function (r) {
        if (!arguments.length) return _innerRadius;
        _innerRadius = r;
        return _chart;
    };

    /**
    #### .radius([radius])
    Get or set the outer radius. Default radius is 90px.

    **/
    _chart.radius = function (r) {
        if (!arguments.length) return _radius;
        _radius = r;
        return _chart;
    };

    /**
    #### .cx([cx])
    Get or set center x coordinate position. Default is center of svg.

    **/
    _chart.cx = function (cx) {
        if (!arguments.length) return (_cx ||  _chart.width() / 2);
        _cx = cx;
        return _chart;
    };

    /**
    #### .cy([cy])
    Get or set center y coordinate position. Default is center of svg.

    **/
    _chart.cy = function (cy) {
        if (!arguments.length) return (_cy ||  _chart.height() / 2);
        _cy = cy;
        return _chart;
    };

    function buildArcs() {
        return d3.svg.arc().outerRadius(_radius).innerRadius(_innerRadius);
    }

    function isSelectedSlice(d) {
        return _chart.hasFilter(_chart.cappedKeyAccessor(d.data));
    }

    _chart._doRedraw = function () {
        drawChart();
        return _chart;
    };

    /**
    #### .minAngleForLabel([minAngle])
    Get or set the minimal slice angle for label rendering. Any slice with a smaller angle will not
    display a slice label.  Default min angle is 0.5.
    **/
    _chart.minAngleForLabel = function (_) {
        if (!arguments.length) return _minAngleForLabel;
        _minAngleForLabel = _;
        return _chart;
    };

    function pieLayout() {
        return d3.layout.pie().sort(null).value(_chart.cappedValueAccessor);
    }

    function sliceTooSmall(d) {
        var angle = (d.endAngle - d.startAngle);
        return isNaN(angle) || angle < _minAngleForLabel;
    }

    function sliceHasNoData(d) {
        return _chart.cappedValueAccessor(d) === 0;
    }

    function tweenPie(b) {
        b.innerRadius = _innerRadius;
        var current = this._current;
        if (isOffCanvas(current))
            current = {startAngle: 0, endAngle: 0};
        var i = d3.interpolate(current, b);
        this._current = i(0);
        return function (t) {
            return safeArc(i(t), 0, buildArcs());
        };
    }

    function isOffCanvas(current) {
        return !current || isNaN(current.startAngle) || isNaN(current.endAngle);
    }

    function fill(d, i) {
        return _chart.getColor(d.data, i);
    }

    function onClick(d, i) {
        if (_g.attr("class") != _emptyCssClass)
            _chart.onClick(d.data, i);
    }

    function safeArc(d, i, arc) {
        var path = arc(d, i);
        if (path.indexOf("NaN") >= 0)
            path = "M0,0";
        return path;
    }

    /**
     #### .emptyTitle([title])
     Title to use for the only slice when there is no data
     */
    _chart.emptyTitle = function(title) {
        if (arguments.length === 0)
            return _emptyTitle;
        _emptyTitle = title;
        return _chart;
    };

    /**
     #### .externalLabels([radius])
     Position slice labels offset from the outer edge of the chart

     The given argument sets the radial offset.
     */
    _chart.externalLabels = function(radius) {
        if (arguments.length === 0) {
            return _externalLabelRadius;
        } else if(radius) {
            _externalLabelRadius = radius;
        } else {
            _externalLabelRadius = undefined;
        }

        return _chart;
    };

    function labelPosition(d, arc) {
        var centroid;
        if( _externalLabelRadius ) {
            centroid = d3.svg.arc()
                .outerRadius(_radius+_externalLabelRadius)
                .innerRadius(_radius+_externalLabelRadius)
                .centroid(d);
        } else {
            centroid = arc.centroid(d);
        }
        if (isNaN(centroid[0]) || isNaN(centroid[1])) {
            return "translate(0,0)";
        } else {
            return "translate(" + centroid + ")";
        }
    }

    _chart.legendables = function() {
        return _chart.data().map(function (d, i) {
            var legendable = { name: d.key, data: d.value, others: d.others, chart:_chart };
            legendable.color = _chart.getColor(d,i);
            return legendable;
        });
    };

    _chart.legendHighlight = function(d) {
        highlightSliceFromLegendable(d, true);
    };

    _chart.legendReset = function(d) {
        highlightSliceFromLegendable(d, false);
    };

    _chart.legendToggle = function(d) {
        _chart.onClick({ key: d.name, others: d.others });
    };

    function highlightSliceFromLegendable(legendable, highlighted) {
        _chart.selectAll('g.pie-slice').each(function (d) {
            if (legendable.name == d.data.key) {
                d3.select(this).classed("highlight", highlighted);
            }
        });
    }

    return _chart.anchor(parent, chartGroup);
};

/**
## Bar Chart

Includes: [Stack Mixin](#stack Mixin), [Coordinate Grid Mixin](#coordinate-grid-mixin)

Concrete bar chart/histogram implementation.

Examples:

* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)
* [Canadian City Crime Stats](http://dc-js.github.com/dc.js/crime/index.html)

#### dc.barChart(parent[, chartGroup])
Create a bar chart instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection | compositeChart - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
 If the bar chart is a sub-chart in a [Composite Chart](#composite-chart) then pass in the parent composite
 chart instance.
* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created bar chart instance

```js
// create a bar chart under #chart-container1 element using the default global chart group
var chart1 = dc.barChart("#chart-container1");
// create a bar chart under #chart-container2 element using chart group A
var chart2 = dc.barChart("#chart-container2", "chartGroupA");
// create a sub-chart under a composite parent chart
var chart3 = dc.barChart(compositeChart);
```

**/
dc.barChart = function (parent, chartGroup) {
    var MIN_BAR_WIDTH = 1;
    var DEFAULT_GAP_BETWEEN_BARS = 2;

    var _chart = dc.stackMixin(dc.coordinateGridMixin({}));

    var _gap = DEFAULT_GAP_BETWEEN_BARS;
    var _centerBar = false;
    var _alwaysUseRounding = false;

    var _barWidth;

    dc.override(_chart, 'rescale', function () {
        _chart._rescale();
        _barWidth = undefined;
    });

    dc.override(_chart, 'render', function () {
        if (_chart.round() && _centerBar && !_alwaysUseRounding) {
            dc.logger.warn("By default, brush rounding is disabled if bars are centered. " +
                         "See dc.js bar chart API documentation for details.");
        }

        _chart._render();
    });

    _chart.plotData = function () {
        var layers = _chart.chartBodyG().selectAll("g.stack")
            .data(_chart.data());

        calculateBarWidth();

        layers
            .enter()
            .append("g")
            .attr("class", function (d, i) {
                return "stack " + "_" + i;
            });

        layers.each(function (d, i) {
            var layer = d3.select(this);

            renderBars(layer, i, d);
        });
    };

    function barHeight(d) {
        return dc.utils.safeNumber(Math.abs(_chart.y()(d.y + d.y0) - _chart.y()(d.y0)));
    }

    function renderBars(layer, layerIndex, d) {
        var bars = layer.selectAll("rect.bar")
            .data(d.values, dc.pluck('x'));

        var enter = bars.enter()
            .append("rect")
            .attr("class", "bar")
            .attr("fill", dc.pluck('data',_chart.getColor))
            .attr("height", 0);

        if (_chart.renderTitle())
            enter.append("title").text(dc.pluck('data',_chart.title(d.name)));

        if (_chart.isOrdinal())
            bars.on("click", onClick);

        dc.transition(bars, _chart.transitionDuration())
            .attr("x", function (d) {
                var x = _chart.x()(d.x);
                if (_centerBar) x -= _barWidth / 2;
                if (_chart.isOrdinal() && _gap!==undefined) x += _gap/2;
                return dc.utils.safeNumber(x);
            })
            .attr("y", function (d) {
                var y = _chart.y()(d.y + d.y0);

                if (d.y < 0)
                    y -= barHeight(d);

                return dc.utils.safeNumber(y);
            })
            .attr("width", _barWidth)
            .attr("height", function (d) {
                return barHeight(d);
            })
            .attr("fill", dc.pluck('data',_chart.getColor))
            .select("title").text(dc.pluck('data',_chart.title(d.name)));

        dc.transition(bars.exit(), _chart.transitionDuration())
            .attr("height", 0)
            .remove();
    }

    function calculateBarWidth() {
        if (_barWidth === undefined) {
            var numberOfBars = _chart.xUnitCount();

            // please can't we always use rangeBands for bar charts?
            if (_chart.isOrdinal() && _gap===undefined)
                _barWidth = Math.floor(_chart.x().rangeBand());
            else if (_gap)
                _barWidth = Math.floor((_chart.xAxisLength() - (numberOfBars - 1) * _gap) / numberOfBars);
            else
                _barWidth = Math.floor(_chart.xAxisLength() / (1 + _chart.barPadding()) / numberOfBars);

            if (_barWidth == Infinity || isNaN(_barWidth) || _barWidth < MIN_BAR_WIDTH)
                _barWidth = MIN_BAR_WIDTH;
        }
    }

    _chart.fadeDeselectedArea = function () {
        var bars = _chart.chartBodyG().selectAll("rect.bar");
        var extent = _chart.brush().extent();

        if (_chart.isOrdinal()) {
            if (_chart.hasFilter()) {
                bars.classed(dc.constants.SELECTED_CLASS, function (d) {
                    return _chart.hasFilter(d.x);
                });
                bars.classed(dc.constants.DESELECTED_CLASS, function (d) {
                    return !_chart.hasFilter(d.x);
                });
            } else {
                bars.classed(dc.constants.SELECTED_CLASS, false);
                bars.classed(dc.constants.DESELECTED_CLASS, false);
            }
        } else {
            if (!_chart.brushIsEmpty(extent)) {
                var start = extent[0];
                var end = extent[1];

                bars.classed(dc.constants.DESELECTED_CLASS, function (d) {
                    return d.x < start || d.x >= end;
                });
            } else {
                bars.classed(dc.constants.DESELECTED_CLASS, false);
            }
        }
    };

    /**
    #### .centerBar(boolean)
    Whether the bar chart will render each bar centered around the data position on x axis. Default: false

    **/
    _chart.centerBar = function (_) {
        if (!arguments.length) return _centerBar;
        _centerBar = _;
        return _chart;
    };

    function onClick(d) {
        _chart.onClick(d.data);
    }

    /**
    #### .barPadding([padding])
    Get or set the spacing between bars as a fraction of bar size. Valid values are between 0-1.
    Setting this value will also remove any previously set `gap`. See the
    [d3 docs](https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands)
    for a visual description of how the padding is applied.
    **/
    _chart.barPadding = function (_) {
        if (!arguments.length) return _chart._rangeBandPadding();
        _chart._rangeBandPadding(_);
        _gap = undefined;
        return _chart;
    };

    _chart._useOuterPadding = function() {
        return _gap===undefined;
    };

    /**
    #### .outerPadding([padding])
    Get or set the outer padding on an ordinal bar chart. This setting has no effect on non-ordinal charts.
    Will pad the width by `padding * barWidth` on each side of the chart.

    Default: 0.5
    **/
    _chart.outerPadding = _chart._outerRangeBandPadding;

    /**
     #### .gap(gapBetweenBars)
     Manually set fixed gap (in px) between bars instead of relying on the default auto-generated
     gap.  By default the bar chart implementation will calculate and set the gap automatically
     based on the number of data points and the length of the x axis.

    **/
    _chart.gap = function (_) {
        if (!arguments.length) return _gap;
        _gap = _;
        return _chart;
    };

    _chart.extendBrush = function () {
        var extent = _chart.brush().extent();
        if (_chart.round() && (!_centerBar || _alwaysUseRounding)) {
            extent[0] = extent.map(_chart.round())[0];
            extent[1] = extent.map(_chart.round())[1];

            _chart.chartBodyG().select(".brush")
                .call(_chart.brush().extent(extent));
        }

        return extent;
    };

    /**
    #### .alwaysUseRounding([boolean])
    Set or get whether rounding is enabled when bars are centered.  Default: false.  If false, using
    rounding with centered bars will result in a warning and rounding will be ignored.  This flag
    has no effect if bars are not centered.

    When using standard d3.js rounding methods, the brush often doesn't align correctly with
    centered bars since the bars are offset.  The rounding function must add an offset to
    compensate, such as in the following example.
    ```js
    chart.round(function(n) {return Math.floor(n)+0.5});
    ```
    **/
    _chart.alwaysUseRounding = function (_) {
        if (!arguments.length) return _alwaysUseRounding;
        _alwaysUseRounding = _;
        return _chart;
    };

    function colorFilter(color,inv) {
        return function() {
            var item = d3.select(this);
            var match = item.attr('fill') == color;
            return inv ? !match : match;
        };
    }

    _chart.legendHighlight = function (d) {
        if(!_chart.isLegendableHidden(d)) {
            _chart.g().selectAll('rect.bar')
                .classed('highlight', colorFilter(d.color))
                .classed('fadeout', colorFilter(d.color,true));
        }
    };

    _chart.legendReset = function () {
        _chart.g().selectAll('rect.bar')
            .classed('highlight', false)
            .classed('fadeout', false);
    };

    dc.override(_chart, "xAxisMax", function() {
        var max = this._xAxisMax();
        if('resolution' in _chart.xUnits()) {
            var res = _chart.xUnits().resolution;
            max += res;
        }
        return max;
    });

    return _chart.anchor(parent, chartGroup);
};

/**
## Line Chart

Includes [Stack Mixin](#stack-mixin), [Coordinate Grid Mixin](#coordinate-grid-mixin)

Concrete line/area chart implementation.

Examples:
* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)
* [Canadian City Crime Stats](http://dc-js.github.com/dc.js/crime/index.html)

#### dc.lineChart(parent[, chartGroup])
Create a line chart instance and attach it to the given parent element.

Parameters:

* parent : string | node | selection | compositeChart - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
 If the line chart is a sub-chart in a [Composite Chart](#composite-chart) then pass in the parent composite
 chart instance.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created line chart instance

```js
// create a line chart under #chart-container1 element using the default global chart group
var chart1 = dc.lineChart("#chart-container1");
// create a line chart under #chart-container2 element using chart group A
var chart2 = dc.lineChart("#chart-container2", "chartGroupA");
// create a sub-chart under a composite parent chart
var chart3 = dc.lineChart(compositeChart);
```

**/
dc.lineChart = function (parent, chartGroup) {
    var DEFAULT_DOT_RADIUS = 5;
    var TOOLTIP_G_CLASS = "dc-tooltip";
    var DOT_CIRCLE_CLASS = "dot";
    var Y_AXIS_REF_LINE_CLASS = "yRef";
    var X_AXIS_REF_LINE_CLASS = "xRef";
    var DEFAULT_DOT_OPACITY = 1e-6;

    var _chart = dc.stackMixin(dc.coordinateGridMixin({}));
    var _renderArea = false;
    var _dotRadius = DEFAULT_DOT_RADIUS;
    var _dataPointRadius = null;
    var _dataPointFillOpacity = DEFAULT_DOT_OPACITY;
    var _dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
    var _interpolate = 'linear';
    var _tension = 0.7;
    var _defined;
    var _dashStyle;

    _chart.transitionDuration(500);
    _chart._rangeBandPadding(1);

    _chart.plotData = function () {
        var chartBody = _chart.chartBodyG();
        var layersList = chartBody.selectAll("g.stack-list");

        if (layersList.empty()) layersList = chartBody.append("g").attr("class", "stack-list");

        var layers = layersList.selectAll("g.stack").data(_chart.data());

        var layersEnter = layers
            .enter()
            .append("g")
            .attr("class", function (d, i) {
                return "stack " + "_" + i;
            });

        drawLine(layersEnter, layers);

        drawArea(layersEnter, layers);

        drawDots(chartBody, layers);
    };

    /**
     #### .interpolate([value])
     Gets or sets the interpolator to use for lines drawn, by string name, allowing e.g. step
     functions, splines, and cubic interpolation.  This is passed to
     [d3.svg.line.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_interpolate) and
     [d3.svg.area.interpolate](https://github.com/mbostock/d3/wiki/SVG-Shapes#area_interpolate),
     where you can find a complete list of valid arguments
     **/
    _chart.interpolate = function(_){
        if (!arguments.length) return _interpolate;
        _interpolate = _;
        return _chart;
    };

    /**
     #### .tension([value]) Gets or sets the tension to use for lines drawn, in the range 0 to 1.
     This parameter further customizes the interpolation behavior.  It is passed to
     [d3.svg.line.tension](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_tension) and
     [d3.svg.area.tension](https://github.com/mbostock/d3/wiki/SVG-Shapes#area_tension).  Default:
     0.7
     **/
    _chart.tension = function(_){
        if (!arguments.length) return _tension;
        _tension = _;
        return _chart;
    };

    /**
     #### .defined([value])
     Gets or sets a function that will determine discontinuities in the line which should be
     skipped: the path will be broken into separate subpaths if some points are undefined.
     This function is passed to
     [d3.svg.line.defined](https://github.com/mbostock/d3/wiki/SVG-Shapes#line_defined)

     Note: crossfilter will sometimes coerce nulls to 0, so you may need to carefully write
     custom reduce functions to get this to work, depending on your data. See
     https://github.com/dc-js/dc.js/issues/615#issuecomment-49089248
     **/
    _chart.defined = function(_){
        if (!arguments.length) return _defined;
        _defined = _;
        return _chart;
    };

    /**
    #### .dashStyle([array])
    Set the line's d3 dashstyle. This value becomes the "stroke-dasharray" of line. Defaults to empty
    array (solid line).
     ```js
     // create a Dash Dot Dot Dot
     chart.dashStyle([3,1,1,1]);
     ```
    **/
    _chart.dashStyle = function (_) {
        if (!arguments.length) return _dashStyle;
        _dashStyle = _;
        return _chart;
    };

    /**
    #### .renderArea([boolean])
    Get or set render area flag. If the flag is set to true then the chart will render the area
    beneath each line and the line chart effectively becomes an area chart.

    **/
    _chart.renderArea = function (_) {
        if (!arguments.length) return _renderArea;
        _renderArea = _;
        return _chart;
    };

    function colors(d, i) {
        return _chart.getColor.call(d,d.values,i);
    }

    function drawLine(layersEnter, layers) {
        var line = d3.svg.line()
            .x(function (d) {
                return _chart.x()(d.x);
            })
            .y(function (d) {
                return _chart.y()(d.y + d.y0);
            })
            .interpolate(_interpolate)
            .tension(_tension);
        if (_defined)
            line.defined(_defined);

        var path = layersEnter.append("path")
            .attr("class", "line")
            .attr("stroke", colors);
        if (_dashStyle)
            path.attr("stroke-dasharray", _dashStyle);

        dc.transition(layers.select("path.line"), _chart.transitionDuration())
            //.ease("linear")
            .attr("stroke", colors)
            .attr("d", function (d) {
                return safeD(line(d.values));
            });
    }

    function drawArea(layersEnter, layers) {
        if (_renderArea) {
            var area = d3.svg.area()
                .x(function (d) {
                    return _chart.x()(d.x);
                })
                .y(function (d) {
                    return _chart.y()(d.y + d.y0);
                })
                .y0(function (d) {
                    return _chart.y()(d.y0);
                })
                .interpolate(_interpolate)
                .tension(_tension);
            if (_defined)
                area.defined(_defined);

            layersEnter.append("path")
                .attr("class", "area")
                .attr("fill", colors)
                .attr("d", function (d) {
                    return safeD(area(d.values));
                });

            dc.transition(layers.select("path.area"), _chart.transitionDuration())
                //.ease("linear")
                .attr("fill", colors)
                .attr("d", function (d) {
                    return safeD(area(d.values));
                });
        }
    }

    function safeD(d){
        return (!d || d.indexOf("NaN") >= 0) ? "M0,0" : d;
    }

    function drawDots(chartBody, layers) {
        if (!_chart.brushOn()) {
            var tooltipListClass = TOOLTIP_G_CLASS + "-list";
            var tooltips = chartBody.select("g." + tooltipListClass);

            if (tooltips.empty()) tooltips = chartBody.append("g").attr("class", tooltipListClass);

            layers.each(function (d, layerIndex) {
                var points = d.values;
                if (_defined) points = points.filter(_defined);

                var g = tooltips.select("g." + TOOLTIP_G_CLASS + "._" + layerIndex);
                if (g.empty()) g = tooltips.append("g").attr("class", TOOLTIP_G_CLASS + " _" + layerIndex);

                createRefLines(g);

                var dots = g.selectAll("circle." + DOT_CIRCLE_CLASS)
                    .data(points,dc.pluck('x'));

                dots.enter()
                    .append("circle")
                    .attr("class", DOT_CIRCLE_CLASS)
                    .attr("r", getDotRadius())
                    .attr("fill", _chart.getColor)
                    .style("fill-opacity", _dataPointFillOpacity)
                    .style("stroke-opacity", _dataPointStrokeOpacity)
                    .on("mousemove", function (d) {
                        var dot = d3.select(this);
                        showDot(dot);
                        showRefLines(dot, g);
                    })
                    .on("mouseout", function (d) {
                        var dot = d3.select(this);
                        hideDot(dot);
                        hideRefLines(g);
                    })
                    .append("title").text(dc.pluck('data', _chart.title(d.name)));

                dots.attr("cx", function (d) {
                        return dc.utils.safeNumber(_chart.x()(d.x));
                    })
                    .attr("cy", function (d) {
                        return dc.utils.safeNumber(_chart.y()(d.y + d.y0));
                    })
                    .attr("fill", _chart.getColor)
                    .select("title").text(dc.pluck('data', _chart.title(d.name)));

                dots.exit().remove();
            });
        }
    }

    function createRefLines(g) {
        var yRefLine = g.select("path." + Y_AXIS_REF_LINE_CLASS).empty() ? g.append("path").attr("class", Y_AXIS_REF_LINE_CLASS) : g.select("path." + Y_AXIS_REF_LINE_CLASS);
        yRefLine.style("display", "none").attr("stroke-dasharray", "5,5");

        var xRefLine = g.select("path." + X_AXIS_REF_LINE_CLASS).empty() ? g.append("path").attr("class", X_AXIS_REF_LINE_CLASS) : g.select("path." + X_AXIS_REF_LINE_CLASS);
        xRefLine.style("display", "none").attr("stroke-dasharray", "5,5");
    }

    function showDot(dot) {
        dot.style("fill-opacity", 0.8);
        dot.style("stroke-opacity", 0.8);
        dot.attr("r", _dotRadius);
        return dot;
    }

    function showRefLines(dot, g) {
        var x = dot.attr("cx");
        var y = dot.attr("cy");
        var yAxisX = (_chart._yAxisX() - _chart.margins().left);
        var yAxisRefPathD = "M" + yAxisX + " " + y + "L" + (x) + " " + (y);
        var xAxisRefPathD = "M" + x + " " + _chart.yAxisHeight() + "L" + x + " " + y;
        g.select("path." + Y_AXIS_REF_LINE_CLASS).style("display", "").attr("d", yAxisRefPathD);
        g.select("path." + X_AXIS_REF_LINE_CLASS).style("display", "").attr("d", xAxisRefPathD);
    }

    function getDotRadius() {
        return _dataPointRadius || _dotRadius;
    }

    function hideDot(dot) {
        dot.style("fill-opacity", _dataPointFillOpacity)
            .style("stroke-opacity", _dataPointStrokeOpacity)
            .attr("r", getDotRadius());
    }

    function hideRefLines(g) {
        g.select("path." + Y_AXIS_REF_LINE_CLASS).style("display", "none");
        g.select("path." + X_AXIS_REF_LINE_CLASS).style("display", "none");
    }

    /**
    #### .dotRadius([dotRadius])
    Get or set the radius (in px) for dots displayed on the data points. Default dot radius is 5.
    **/
    _chart.dotRadius = function (_) {
        if (!arguments.length) return _dotRadius;
        _dotRadius = _;
        return _chart;
    };

    /**
    #### .renderDataPoints([options])
    Always show individual dots for each datapoint.

    Options, if given, is an object that can contain the following:

    * fillOpacity (default 0.8)
    * strokeOpacity (default 0.8)
    * radius (default 2)

    If `options` is falsy, it disables data point rendering.

    If no `options` are provided, the current `options` values are instead returned.

    Example:
    ```
    chart.renderDataPoints({radius: 2, fillOpacity: 0.8, strokeOpacity: 0.8})
    ```
    **/
    _chart.renderDataPoints = function (options) {
        if (!arguments.length) {
            return {
                fillOpacity: _dataPointFillOpacity,
                strokeOpacity: _dataPointStrokeOpacity,
                radius: _dataPointRadius
            };
        } else if (!options) {
            _dataPointFillOpacity = DEFAULT_DOT_OPACITY;
            _dataPointStrokeOpacity = DEFAULT_DOT_OPACITY;
            _dataPointRadius = null;
        } else {
            _dataPointFillOpacity = options.fillOpacity || 0.8;
            _dataPointStrokeOpacity = options.strokeOpacity || 0.8;
            _dataPointRadius = options.radius || 2;
        }
        return _chart;
    };

    function colorFilter(color, dashstyle, inv) {
        return function() {
            var item = d3.select(this);
            var match = (item.attr('stroke') == color && item.attr("stroke-dasharray") == ((dashstyle instanceof Array) ? dashstyle.join(",") : null) )|| item.attr('fill') == color;
            return inv ? !match : match;
        };
    }

    _chart.legendHighlight = function (d) {
        if(!_chart.isLegendableHidden(d)) {
            _chart.g().selectAll('path.line, path.area')
                .classed('highlight', colorFilter(d.color, d.dashstyle))
                .classed('fadeout', colorFilter(d.color, d.dashstyle, true));
        }
    };

    _chart.legendReset = function () {
        _chart.g().selectAll('path.line, path.area')
            .classed('highlight', false)
            .classed('fadeout', false);
    };

    dc.override(_chart,'legendables', function() {
        var legendables = _chart._legendables();
        if (!_dashStyle) return legendables;
        return legendables.map(function(l) {
            l.dashstyle = _dashStyle;
            return l;
        });
    });

    return _chart.anchor(parent, chartGroup);
};

/**
## Data Count Widget

Includes: [Base Mixin](#base-mixin)

The data count widget is a simple widget designed to display the number of records selected by the
current filters out of the total number of records in the data set. Once created the data count widget
will automatically update the text content of the following elements under the parent element.

* ".total-count" - total number of records
* ".filter-count" - number of records matched by the current filters

Examples:

* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)

#### dc.dataCount(parent[, chartGroup])
Create a data count widget and attach it to the given parent element.

Parameters:

* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
* chartGroup : string (optional) - name of the chart group this widget should be placed in.
 The data count widget will only react to filter changes in the chart group.

Returns:
A newly created data count widget instance

#### .dimension(allData) - **mandatory**
For the data count widget the only valid dimension is the entire data set.

#### .group(groupAll) - **mandatory**
For the data count widget the only valid group is the group returned by `dimension.groupAll()`.

```js
var ndx = crossfilter(data);
var all = ndx.groupAll();

dc.dataCount(".dc-data-count")
    .dimension(ndx)
    .group(all);
```

**/
dc.dataCount = function(parent, chartGroup) {
    var SPAN_CLASS = 'data-count-display';
    var _formatNumber = d3.format(",d");
    var _chart = dc.baseMixin({});
    var _html = {some:"",all:""};

    /**
     #### html([object])
     Gets or sets an optional object specifying HTML templates to use depending how many items are
     selected. The text `%total-count` will replaced with the total number of records, and the text
     `%filter-count` will be replaced with the number of selected records.
     - all: HTML template to use if all items are selected
     - some: HTML template to use if not all items are selected

     ```js
     counter.html({
         some: "%filter-count out of %total-count records selected",
         all: "All records selected. Click on charts to apply filters"
     })
     ```
     **/
    _chart.html = function(s) {
        if (!arguments.length) return _html;
        if(s.all)
            _html.all = s.all;
        if(s.some)
            _html.some = s.some;
        return _chart;
    };

    _chart._doRender = function() {
        var tot = _chart.dimension().size(),
            val = _chart.group().value();
        var all = _formatNumber(tot);
        var selected = _formatNumber(val);

        if((tot===val)&&(_html.all!=="")) {
            _chart.root().html(_html.all.replace('%total-count',all).replace('%filter-count',selected));
        }
        else if(_html.some!=="") {
            _chart.root().html(_html.some.replace('%total-count',all).replace('%filter-count',selected));
        } else {
            _chart.selectAll(".total-count").text(all);
            _chart.selectAll(".filter-count").text(selected);
        }
        return _chart;
    };

    _chart._doRedraw = function(){
        return _chart._doRender();
    };

    return _chart.anchor(parent, chartGroup);
};

/**
## Data Table Widget

Includes: [Base Mixin](#base-mixin)

The data table is a simple widget designed to list crossfilter focused data set (rows being
filtered) in a good old tabular fashion.

Examples:
* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)

#### dc.dataTable(parent[, chartGroup])
Create a data table widget instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created data table widget instance

**/
dc.dataTable = function(parent, chartGroup) {
    var LABEL_CSS_CLASS = "dc-table-label";
    var ROW_CSS_CLASS = "dc-table-row";
    var COLUMN_CSS_CLASS = "dc-table-column";
    var GROUP_CSS_CLASS = "dc-table-group";

    var _chart = dc.baseMixin({});

    var _size = 25;
    var _columns = [];
    var _sortBy = function(d) {
        return d;
    };
    var _order = d3.ascending;

    _chart._doRender = function() {
        _chart.selectAll("tbody").remove();

        renderRows(renderGroups());

        return _chart;
    };

    function renderGroups() {
        var groups = _chart.root().selectAll("tbody")
            .data(nestEntries(), function(d) {
                return _chart.keyAccessor()(d);
            });

        var rowGroup = groups
            .enter()
            .append("tbody");

        rowGroup
            .append("tr")
            .attr("class", GROUP_CSS_CLASS)
                .append("td")
                .attr("class", LABEL_CSS_CLASS)
                .attr("colspan", _columns.length)
                .html(function(d) {
                    return _chart.keyAccessor()(d);
                });

        groups.exit().remove();

        return rowGroup;
    }

    function nestEntries() {
        var entries = _chart.dimension().top(_size);

        return d3.nest()
            .key(_chart.group())
            .sortKeys(_order)
            .entries(entries.sort(function(a, b){
                return _order(_sortBy(a), _sortBy(b));
            }));
    }

    function renderRows(groups) {
        var rows = groups.order()
            .selectAll("tr." + ROW_CSS_CLASS)
            .data(function(d) {
                return d.values;
            });

        var rowEnter = rows.enter()
            .append("tr")
            .attr("class", ROW_CSS_CLASS);

        _columns.forEach(function(f,i) {
            rowEnter.append("td")
                .attr("class", COLUMN_CSS_CLASS + " _" + i)
                .html(f);
        });

        rows.exit().remove();

        return rows;
    }

    _chart._doRedraw = function() {
        return _chart._doRender();
    };

    /**
    #### .size([size])
    Get or set the table size which determines the number of rows displayed by the widget.

    **/
    _chart.size = function(s) {
        if (!arguments.length) return _size;
        _size = s;
        return _chart;
    };

    /**
    #### .columns([columnFunctionArray])
    Get or set column functions. The data table widget uses an array of functions to generate dynamic
    columns. Column functions are simple javascript functions with only one input argument d which
    represents a row in the data set, and the return value of these functions will be used directly
    to generate table content for the cells.

    ```js
        chart.columns([
            function(d) {
                return d.date;
            },
            function(d) {
                return d.open;
            },
            function(d) {
                return d.close;
            },
            function(d) {
                return numberFormat(d.close - d.open);
            },
            function(d) {
                return d.volume;
            }
        ]);
    ```

    **/
    _chart.columns = function(_) {
        if (!arguments.length) return _columns;
        _columns = _;
        return _chart;
    };

    /**
    #### .sortBy([sortByFunction])
    Get or set sort-by function. This function works as a value accessor at row level and returns a
    particular field to be sorted by. Default value: identity function

    ```js
       chart.sortBy(function(d) {
            return d.date;
        });
    ```

    **/
    _chart.sortBy = function(_) {
        if (!arguments.length) return _sortBy;
        _sortBy = _;
        return _chart;
    };

    /**
    #### .order([order])
    Get or set sort order. Default value: ``` d3.ascending ```

    ```js
        chart.order(d3.descending);
    ```

    **/
    _chart.order = function(_) {
        if (!arguments.length) return _order;
        _order = _;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 ## Data Grid Widget

 Includes: [Base Mixin](#base-mixin)

 Data grid is a simple widget designed to list the filtered records, providing
 a simple way to define how the items are displayed.

 Examples:
 * [List of members of the european parliament](http://europarl.me/dc.js/web/ep/index.html)

 #### dc.dataGrid(parent[, chartGroup])
 Create a data grid widget instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created data grid widget instance

 **/
dc.dataGrid = function(parent, chartGroup) {
    var LABEL_CSS_CLASS = "dc-grid-label";
    var ITEM_CSS_CLASS = "dc-grid-item";
    var GROUP_CSS_CLASS = "dc-grid-group";
    var GRID_CSS_CLASS = "dc-grid-top";

    var _chart = dc.baseMixin({});

    var _size = 999; // shouldn't be needed, but you might
    var _html = function (d) { return "you need to provide an html() handling param:  " + JSON.stringify(d); };
    var _sortBy = function(d) {
        return d;
    };
    var _order = d3.ascending;

    var _htmlGroup = function (d) {
        return "<div class='"+GROUP_CSS_CLASS+"'><h1 class='"+LABEL_CSS_CLASS+"'>"+
            _chart.keyAccessor()(d)+"</h1></div>";
    };

    _chart._doRender = function() {
        _chart.selectAll("div."+ GRID_CSS_CLASS).remove();

        renderItems(renderGroups());

        return _chart;
    };

    function renderGroups() {
        var groups = _chart.root().selectAll("div."+ GRID_CSS_CLASS)
                .data(nestEntries(), function(d) {
                    return _chart.keyAccessor()(d);
                });

        var itemGroup = groups
                .enter()
                .append("div")
                .attr("class", GRID_CSS_CLASS);

        if (_htmlGroup) {
            itemGroup
                .html(function(d) {
                    return _htmlGroup(d);
                });
        }

        groups.exit().remove();
        return itemGroup;
    }

    function nestEntries() {
        var entries = _chart.dimension().top(_size);

        return d3.nest()
            .key(_chart.group())
            .sortKeys(_order)
            .entries(entries.sort(function(a, b){
                return _order(_sortBy(a), _sortBy(b));
            }));
    }

    function renderItems(groups) {
        var items = groups.order()
                .selectAll("div." + ITEM_CSS_CLASS)
                .data(function(d) {
                    return d.values;
                });

        items.enter()
            .append("div")
            .attr("class", ITEM_CSS_CLASS)
            .html(function(d) {
                return _html(d);
            });

        items.exit().remove();

        return items;
    }

    _chart._doRedraw = function() {
        return _chart._doRender();
    };

    /**
     #### .size([size])
     Get or set the grid size which determines the number of items displayed by the widget.

     **/
    _chart.size = function(s) {
        if (!arguments.length) return _size;
        _size = s;
        return _chart;
    };

    /**
     #### .html( function (data) { return "<html>"; })
     Get or set the function that formats an item. The data grid widget uses a
     function to generate dynamic html. Use your favourite templating engine or
     generate the string directly.
     ```js
     chart.html(function (d) { return "<div class='item "+data.exampleCategory+"'>"+data.exampleString+"</div>";});
     ```

     **/
    _chart.html = function(_) {
        if (!arguments.length) return _html;
        _html = _;
        return _chart;
    };


    /**
     #### .htmlGroup( function (data) { return "<html>"; })
     Get or set the function that formats a group label.
     ```js
     chart.htmlGroup (function (d) { return "<h2>".d.key . "with " . d.values.length ." items</h2>"});
     ```

     **/
    _chart.htmlGroup = function(_) {
        if (!arguments.length) return _htmlGroup;
        _htmlGroup = _;
        return _chart;
    };

    /**
     #### .sortBy([sortByFunction])
     Get or set sort-by function. This function works as a value accessor at the item
     level and returns a particular field to be sorted.
     by. Default: identity function

     ```js
     chart.sortBy(function(d) {
         return d.date;
     });
     ```

     **/
    _chart.sortBy = function(_) {
        if (!arguments.length) return _sortBy;
        _sortBy = _;
        return _chart;
    };

    /**
     #### .order([order])
     Get or set sort order function. Default value: ``` d3.ascending ```

     ```js
     chart.order(d3.descending);
     ```

     **/
    _chart.order = function(_) {
        if (!arguments.length) return _order;
        _order = _;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
## Bubble Chart

Includes: [Bubble Mixin](#bubble-mixin), [Coordinate Grid Mixin](#coordinate-grid-mixin)

A concrete implementation of a general purpose bubble chart that allows data visualization using the
following dimensions:

* x axis position
* y axis position
* bubble radius
* color

Examples:
* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)
* [US Venture Capital Landscape 2011](http://dc-js.github.com/dc.js/vc/index.html)

#### dc.bubbleChart(parent[, chartGroup])
Create a bubble chart instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection | compositeChart - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created bubble chart instance

```js
// create a bubble chart under #chart-container1 element using the default global chart group
var bubbleChart1 = dc.bubbleChart("#chart-container1");
// create a bubble chart under #chart-container2 element using chart group A
var bubbleChart2 = dc.bubbleChart("#chart-container2", "chartGroupA");
```

**/
dc.bubbleChart = function(parent, chartGroup) {
    var _chart = dc.bubbleMixin(dc.coordinateGridMixin({}));

    var _elasticRadius = false;

    _chart.transitionDuration(750);

    var bubbleLocator = function(d) {
        return "translate(" + (bubbleX(d)) + "," + (bubbleY(d)) + ")";
    };

    /**
    #### .elasticRadius([boolean])
    Turn on or off the elastic bubble radius feature, or return the value of the flag. If this
    feature is turned on, then bubble radii will be automatically rescaled to fit the chart better.

    **/
    _chart.elasticRadius = function(_) {
        if (!arguments.length) return _elasticRadius;
        _elasticRadius = _;
        return _chart;
    };

    _chart.plotData = function() {
        if (_elasticRadius)
            _chart.r().domain([_chart.rMin(), _chart.rMax()]);

        _chart.r().range([_chart.MIN_RADIUS, _chart.xAxisLength() * _chart.maxBubbleRelativeSize()]);

        var bubbleG = _chart.chartBodyG().selectAll("g." + _chart.BUBBLE_NODE_CLASS)
            .data(_chart.data(), function (d) { return d.key; });

        renderNodes(bubbleG);

        updateNodes(bubbleG);

        removeNodes(bubbleG);

        _chart.fadeDeselectedArea();
    };

    function renderNodes(bubbleG) {
        var bubbleGEnter = bubbleG.enter().append("g");

        bubbleGEnter
            .attr("class", _chart.BUBBLE_NODE_CLASS)
            .attr("transform", bubbleLocator)
            .append("circle").attr("class", function(d, i) {
                return _chart.BUBBLE_CLASS + " _" + i;
            })
            .on("click", _chart.onClick)
            .attr("fill", _chart.getColor)
            .attr("r", 0);
        dc.transition(bubbleG, _chart.transitionDuration())
            .selectAll("circle." + _chart.BUBBLE_CLASS)
            .attr("r", function(d) {
                return _chart.bubbleR(d);
            })
            .attr("opacity", function(d) {
                return (_chart.bubbleR(d) > 0) ? 1 : 0;
            });

        _chart._doRenderLabel(bubbleGEnter);

        _chart._doRenderTitles(bubbleGEnter);
    }

    function updateNodes(bubbleG) {
        dc.transition(bubbleG, _chart.transitionDuration())
            .attr("transform", bubbleLocator)
            .selectAll("circle." + _chart.BUBBLE_CLASS)
            .attr("fill", _chart.getColor)
            .attr("r", function(d) {
                return _chart.bubbleR(d);
            })
            .attr("opacity", function(d) {
                return (_chart.bubbleR(d) > 0) ? 1 : 0;
            });

        _chart.doUpdateLabels(bubbleG);
        _chart.doUpdateTitles(bubbleG);
    }

    function removeNodes(bubbleG) {
        bubbleG.exit().remove();
    }

    function bubbleX(d) {
        var x = _chart.x()(_chart.keyAccessor()(d));
        if (isNaN(x))
            x = 0;
        return x;
    }

    function bubbleY(d) {
        var y = _chart.y()(_chart.valueAccessor()(d));
        if (isNaN(y))
            y = 0;
        return y;
    }

    _chart.renderBrush = function(g) {
        // override default x axis brush from parent chart
    };

    _chart.redrawBrush = function(g) {
        // override default x axis brush from parent chart
        _chart.fadeDeselectedArea();
    };

    return _chart.anchor(parent, chartGroup);
};

/**
## Composite Chart

Includes: [Coordinate Grid Mixin](#coordinate-grid-mixin)

Composite charts are a special kind of chart that render multiple charts on the same Coordinate
Grid. You can overlay (compose) different bar/line/area charts in a single composite chart to
achieve some quite flexible charting effects.

#### dc.compositeChart(parent[, chartGroup])
Create a composite chart instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created composite chart instance

```js
// create a composite chart under #chart-container1 element using the default global chart group
var compositeChart1 = dc.compositeChart("#chart-container1");
// create a composite chart under #chart-container2 element using chart group A
var compositeChart2 = dc.compositeChart("#chart-container2", "chartGroupA");
```

**/
dc.compositeChart = function (parent, chartGroup) {

    var SUB_CHART_CLASS = "sub";
    var DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING = 12;

    var _chart = dc.coordinateGridMixin({});
    var _children = [];

    var _childOptions = {};

    var _shareColors = false,
        _shareTitle = true;

    var _rightYAxis = d3.svg.axis(),
        _rightYAxisLabel = 0,
        _rightYAxisLabelPadding = DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING,
        _rightY,
        _rightAxisGridLines = false;

    _chart._mandatoryAttributes([]);
    _chart.transitionDuration(500);

    dc.override(_chart, "_generateG", function () {
        var g = this.__generateG();

        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];

            generateChildG(child, i);

            if (!child.dimension()) child.dimension(_chart.dimension());
            if (!child.group()) child.group(_chart.group());

            child.chartGroup(_chart.chartGroup());
            child.svg(_chart.svg());
            child.xUnits(_chart.xUnits());
            child.transitionDuration(_chart.transitionDuration());
            child.brushOn(_chart.brushOn());
        }

        return g;
    });

    _chart._brushing = function () {
        var extent = _chart.extendBrush();
        var brushIsEmpty = _chart.brushIsEmpty(extent);

        for (var i = 0; i < _children.length; ++i) {
            _children[i].filter(null);
            if (!brushIsEmpty) _children[i].filter(extent);
        }
    };

    _chart._prepareYAxis = function () {
        if (leftYAxisChildren().length !== 0) { prepareLeftYAxis(); }
        if (rightYAxisChildren().length !== 0) { prepareRightYAxis(); }

        if (leftYAxisChildren().length > 0 && !_rightAxisGridLines) {
            _chart._renderHorizontalGridLinesForAxis(_chart.g(), _chart.y(), _chart.yAxis());
        }
        else if (rightYAxisChildren().length > 0) {
            _chart._renderHorizontalGridLinesForAxis(_chart.g(), _rightY, _rightYAxis);
        }
    };

    _chart.renderYAxis = function () {
        if (leftYAxisChildren().length !== 0) {
            _chart.renderYAxisAt("y", _chart.yAxis(), _chart.margins().left);
            _chart.renderYAxisLabel("y", _chart.yAxisLabel(), -90);
        }

        if (rightYAxisChildren().length !== 0) {
            _chart.renderYAxisAt("yr", _chart.rightYAxis(), _chart.width() - _chart.margins().right);
            _chart.renderYAxisLabel("yr", _chart.rightYAxisLabel(), 90, _chart.width() - _rightYAxisLabelPadding);
        }
    };

    function prepareRightYAxis() {
        if (_chart.rightY() === undefined || _chart.elasticY()) {
            _chart.rightY(d3.scale.linear());
            _chart.rightY().domain([rightYAxisMin(), rightYAxisMax()]).rangeRound([_chart.yAxisHeight(), 0]);
        }

        _chart.rightY().range([_chart.yAxisHeight(), 0]);
        _chart.rightYAxis(_chart.rightYAxis().scale(_chart.rightY()));

        _chart.rightYAxis().orient("right");
    }

    function prepareLeftYAxis() {
        if (_chart.y() === undefined || _chart.elasticY()) {
            _chart.y(d3.scale.linear());
            _chart.y().domain([yAxisMin(), yAxisMax()]).rangeRound([_chart.yAxisHeight(), 0]);
        }

        _chart.y().range([_chart.yAxisHeight(), 0]);
        _chart.yAxis(_chart.yAxis().scale(_chart.y()));

        _chart.yAxis().orient("left");
    }

    function generateChildG(child, i) {
        child._generateG(_chart.g());
        child.g().attr("class", SUB_CHART_CLASS + " _" + i);
    }

    _chart.plotData = function () {
        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];

            if (!child.g()) {
                generateChildG(child, i);
            }

            if (_shareColors) {
                child.colors(_chart.colors());
            }

            child.x(_chart.x());

            child.xAxis(_chart.xAxis());

            if (child.useRightYAxis()) {
                child.y(_chart.rightY());
                child.yAxis(_chart.rightYAxis());
            }
            else {
                child.y(_chart.y());
                child.yAxis(_chart.yAxis());
            }

            child.plotData();

            child._activateRenderlets();
        }
    };

    /**
    #### .useRightAxisGridLines(bool)
    Get or set whether to draw gridlines from the right y axis.  Drawing from the left y axis is the
    default behavior. This option is only respected when subcharts with both left and right y-axes
    are present.
    **/
    _chart.useRightAxisGridLines = function(_) {
        if (!arguments) return _rightAxisGridLines;

        _rightAxisGridLines = _;
        return _chart;
    };

    /**
    #### .childOptions({object})
    Get or set chart-specific options for all child charts. This is equivalent to calling `.options`
    on each child chart.
    **/
    _chart.childOptions = function (_) {
        if(!arguments.length) return _childOptions;
        _childOptions = _;
        _children.forEach(function(child){
            child.options(_childOptions);
        });
        return _chart;
    };

    _chart.fadeDeselectedArea = function () {
        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];
            child.brush(_chart.brush());
            child.fadeDeselectedArea();
        }
    };

    /**
    #### .rightYAxisLabel([labelText])
    Set or get the right y axis label.
    **/
    _chart.rightYAxisLabel = function (_, padding) {
        if (!arguments.length) return _rightYAxisLabel;
        _rightYAxisLabel = _;
        _chart.margins().right -= _rightYAxisLabelPadding;
        _rightYAxisLabelPadding = (padding === undefined) ? DEFAULT_RIGHT_Y_AXIS_LABEL_PADDING : padding;
        _chart.margins().right += _rightYAxisLabelPadding;
        return _chart;
    };

    /**
    #### .compose(subChartArray)
    Combine the given charts into one single composite coordinate grid chart.

    ```js
    // compose the given charts in the array into one single composite chart
    moveChart.compose([
        // when creating sub-chart you need to pass in the parent chart
        dc.lineChart(moveChart)
            .group(indexAvgByMonthGroup) // if group is missing then parent's group will be used
            .valueAccessor(function(d){return d.value.avg;})
            // most of the normal functions will continue to work in a composed chart
            .renderArea(true)
            .stack(monthlyMoveGroup, function(d){return d.value;})
            .title(function(d){
                var value = d.value.avg?d.value.avg:d.value;
                if(isNaN(value)) value = 0;
                return dateFormat(d.key) + "\n" + numberFormat(value);
            }),
        dc.barChart(moveChart)
            .group(volumeByMonthGroup)
            .centerBar(true)
    ]);
    ```

    **/
    _chart.compose = function (charts) {
        _children = charts;
        _children.forEach(function(child) {
            child.height(_chart.height());
            child.width(_chart.width());
            child.margins(_chart.margins());

            if (_shareTitle) child.title(_chart.title());

            child.options(_childOptions);
        });
        return _chart;
    };

    /**
     #### .children()
     Returns the child charts which are composed into the composite chart.
     **/

    _chart.children = function () {
        return _children;
    };

    /**
    #### .shareColors([boolean])
    Get or set color sharing for the chart. If set, the `.colors()` value from this chart
    will be shared with composed children. Additionally if the child chart implements
    Stackable and has not set a custom .colorAccessor, then it will generate a color
    specific to its order in the composition.
    **/
    _chart.shareColors = function (_) {
        if (!arguments.length) return _shareColors;
        _shareColors = _;
        return _chart;
    };

    /**
    #### .shareTitle([[boolean])
    Get or set title sharing for the chart. If set, the `.title()` value from this chart will be
    shared with composed children. Default value is true.
    **/
    _chart.shareTitle = function (_) {
        if (!arguments.length) return _shareTitle;
        _shareTitle = _;
        return _chart;
    };

    /**
    #### .rightY([yScale])
    Get or set the y scale for the right axis. The right y scale is typically automatically
    generated by the chart implementation.

    **/
    _chart.rightY = function (_) {
        if (!arguments.length) return _rightY;
        _rightY = _;
        return _chart;
    };

    function leftYAxisChildren() {
        return _children.filter(function (child) {
            return !child.useRightYAxis();
        });
    }

    function rightYAxisChildren() {
        return _children.filter(function (child) {
            return child.useRightYAxis();
        });
    }

    function getYAxisMin(charts) {
        return charts.map(function(c) {
            return c.yAxisMin();
        });
    }

    delete _chart.yAxisMin;
    function yAxisMin() {
        return d3.min(getYAxisMin(leftYAxisChildren()));
    }

    function rightYAxisMin() {
        return d3.min(getYAxisMin(rightYAxisChildren()));
    }

    function getYAxisMax(charts) {
        return charts.map(function(c) {
            return c.yAxisMax();
        });
    }

    delete _chart.yAxisMax;
    function yAxisMax() {
        return dc.utils.add(d3.max(getYAxisMax(leftYAxisChildren())), _chart.yAxisPadding());
    }

    function rightYAxisMax() {
        return dc.utils.add(d3.max(getYAxisMax(rightYAxisChildren())), _chart.yAxisPadding());
    }

    function getAllXAxisMinFromChildCharts() {
        return _children.map(function(c) {
            return c.xAxisMin();
        });
    }

    dc.override(_chart, 'xAxisMin',function () {
        return dc.utils.subtract(d3.min(getAllXAxisMinFromChildCharts()), _chart.xAxisPadding());
    });

    function getAllXAxisMaxFromChildCharts() {
        return _children.map(function(c) {
            return c.xAxisMax();
        });
    }

    dc.override(_chart, 'xAxisMax',function () {
        return dc.utils.add(d3.max(getAllXAxisMaxFromChildCharts()), _chart.xAxisPadding());
    });

    _chart.legendables = function () {
        return _children.reduce(function(items,child) {
            if (_shareColors) child.colors(_chart.colors());
            items.push.apply(items, child.legendables());
            return items;
        },[]);
    };

    _chart.legendHighlight = function (d) {
        for (var j = 0; j < _children.length; ++j) {
            var child = _children[j];
            child.legendHighlight(d);
        }
    };

    _chart.legendReset = function (d) {
        for (var j = 0; j < _children.length; ++j) {
            var child = _children[j];
            child.legendReset(d);
        }
    };

    _chart.legendToggle = function (d) {
        console.log("composite should not be getting legendToggle itself");
    };

    /**
    #### .rightYAxis([yAxis])
    Set or get the right y axis used by the composite chart. This function is most useful when y
    axis customization is required. The y axis in dc.js is an instance of a [d3 axis
    object](https://github.com/mbostock/d3/wiki/SVG-Axes#wiki-_axis) therefore it supports any valid
    d3 axis manipulation. **Caution**: The y axis is usually generated internally by dc;
    resetting it may cause unexpected results.
    ```js
    // customize y axis tick format
    chart.rightYAxis().tickFormat(function(v) {return v + "%";});
    // customize y axis tick values
    chart.rightYAxis().tickValues([0, 100, 200, 300]);
    ```

    **/
    _chart.rightYAxis = function (rightYAxis) {
        if (!arguments.length) return _rightYAxis;
        _rightYAxis = rightYAxis;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 ## Series Chart

 Includes: [Composite Chart](#composite chart)

 A series chart is a chart that shows multiple series of data overlaid on one chart, where the
 series is specified in the data. It is a specialization of Composite Chart and inherits all
 composite features other than recomposing the chart.

 #### dc.seriesChart(parent[, chartGroup])
 Create a series chart instance and attach it to the given parent element.

 Parameters:
* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

 Returns:
 A newly created series chart instance

 ```js
 // create a series chart under #chart-container1 element using the default global chart group
 var seriesChart1 = dc.seriesChart("#chart-container1");
 // create a series chart under #chart-container2 element using chart group A
 var seriesChart2 = dc.seriesChart("#chart-container2", "chartGroupA");
 ```

 **/
dc.seriesChart = function (parent, chartGroup) {
    var _chart = dc.compositeChart(parent, chartGroup);

    var _charts = {};
    var _chartFunction = dc.lineChart;
    var _seriesAccessor;
    var _seriesSort = d3.ascending;
    var _valueSort = keySort;

    _chart._mandatoryAttributes().push('seriesAccessor','chart');
    _chart.shareColors(true);

    function keySort(a,b) {
        return d3.ascending(_chart.keyAccessor()(a), _chart.keyAccessor()(b));
    }

    _chart._preprocessData = function () {
        var keep = [];
        var children_changed;
        var nester = d3.nest().key(_seriesAccessor);
        if(_seriesSort)
            nester.sortKeys(_seriesSort);
        if(_valueSort)
            nester.sortValues(_valueSort);
        var nesting = nester.entries(_chart.data());
        var children =
            nesting.map(function(sub,i) {
                var subChart = _charts[sub.key] || _chartFunction.call(_chart,_chart,chartGroup,sub.key,i);
                if(!_charts[sub.key])
                    children_changed = true;
                _charts[sub.key] = subChart;
                keep.push(sub.key);
                return subChart
                    .dimension(_chart.dimension())
                    .group({all:d3.functor(sub.values)}, sub.key)
                    .keyAccessor(_chart.keyAccessor())
                    .valueAccessor(_chart.valueAccessor())
                    .brushOn(_chart.brushOn());
            });
        // this works around the fact compositeChart doesn't really
        // have a removal interface
        Object.keys(_charts)
            .filter(function(c) {return keep.indexOf(c) === -1;})
            .forEach(function(c) {
                clearChart(c);
                children_changed = true;
            });
        _chart._compose(children);
        if(children_changed && _chart.legend())
            _chart.legend().render();
    };

    function clearChart(c) {
        if(_charts[c].g())
            _charts[c].g().remove();
        delete _charts[c];
    }

    function resetChildren() {
        Object.keys(_charts).map(clearChart);
        _charts = {};
    }

    /**
     #### .chart([function])
     Get or set the chart function, which generates the child charts.  Default: dc.lineChart

     ```
     // put interpolation on the line charts used for the series
     chart.chart(function(c) { return dc.lineChart(c).interpolate('basis'); })
     // do a scatter series chart
     chart.chart(dc.scatterPlot)
     ```

     **/
    _chart.chart = function(_) {
        if (!arguments.length) return _chartFunction;
        _chartFunction = _;
        resetChildren();
        return _chart;
    };

    /**
     #### .seriesAccessor([accessor])
     Get or set accessor function for the displayed series. Given a datum, this function
     should return the series that datum belongs to.
     **/
    _chart.seriesAccessor = function(_) {
        if (!arguments.length) return _seriesAccessor;
        _seriesAccessor = _;
        resetChildren();
        return _chart;
    };

    /**
     #### .seriesSort([sortFunction])
     Get or set a function to sort the list of series by, given series values.

     Example:
     ```
     chart.seriesSort(d3.descending);
     ```
     **/
    _chart.seriesSort = function(_) {
        if (!arguments.length) return _seriesSort;
        _seriesSort = _;
        resetChildren();
        return _chart;
    };

    /**
     #### .valueSort([sortFunction])
     Get or set a function to sort each series values by. By default this is the key accessor which,
     for example, will ensure a lineChart series connects its points in increasing key/x order,
     rather than haphazardly.
    **/
    _chart.valueSort = function(_) {
        if (!arguments.length) return _valueSort;
        _valueSort = _;
        resetChildren();
        return _chart;
    };

    // make compose private
    _chart._compose = _chart.compose;
    delete _chart.compose;

    return _chart;
};

/**
## Geo Choropleth Chart

Includes: [Color Mixin](#color-mixin), [Base Mixin](#base-mixin)

The geo choropleth chart is designed as an easy way to create a crossfilter driven choropleth map
from GeoJson data. This chart implementation was inspired by [the great d3 choropleth
example](http://bl.ocks.org/4060606).

Examples:
* [US Venture Capital Landscape 2011](http://dc-js.github.com/dc.js/vc/index.html)

#### dc.geoChoroplethChart(parent[, chartGroup])
Create a choropleth chart instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created choropleth chart instance

```js
// create a choropleth chart under "#us-chart" element using the default global chart group
var chart1 = dc.geoChoroplethChart("#us-chart");
// create a choropleth chart under "#us-chart2" element using chart group A
var chart2 = dc.compositeChart("#us-chart2", "chartGroupA");
```

**/
dc.geoChoroplethChart = function (parent, chartGroup) {
    var _chart = dc.colorMixin(dc.baseMixin({}));

    _chart.colorAccessor(function (d) {
        return d || 0;
    });

    var _geoPath = d3.geo.path();
    var _projectionFlag;

    var _geoJsons = [];

    _chart._doRender = function () {
        _chart.resetSvg();
        for (var layerIndex = 0; layerIndex < _geoJsons.length; ++layerIndex) {
            var states = _chart.svg().append("g")
                .attr("class", "layer" + layerIndex);

            var regionG = states.selectAll("g." + geoJson(layerIndex).name)
                .data(geoJson(layerIndex).data)
                .enter()
                .append("g")
                .attr("class", geoJson(layerIndex).name);

            regionG
                .append("path")
                .attr("fill", "white")
                .attr("d", _geoPath);

            regionG.append("title");

            plotData(layerIndex);
        }
        _projectionFlag = false;
    };

    function plotData(layerIndex) {
        var data = generateLayeredData();

        if (isDataLayer(layerIndex)) {
            var regionG = renderRegionG(layerIndex);

            renderPaths(regionG, layerIndex, data);

            renderTitle(regionG, layerIndex, data);
        }
    }

    function generateLayeredData() {
        var data = {};
        var groupAll = _chart.data();
        for (var i = 0; i < groupAll.length; ++i) {
            data[_chart.keyAccessor()(groupAll[i])] = _chart.valueAccessor()(groupAll[i]);
        }
        return data;
    }

    function isDataLayer(layerIndex) {
        return geoJson(layerIndex).keyAccessor;
    }

    function renderRegionG(layerIndex) {
        var regionG = _chart.svg()
            .selectAll(layerSelector(layerIndex))
            .classed("selected", function (d) {
                return isSelected(layerIndex, d);
            })
            .classed("deselected", function (d) {
                return isDeselected(layerIndex, d);
            })
            .attr("class", function (d) {
                var layerNameClass = geoJson(layerIndex).name;
                var regionClass = dc.utils.nameToId(geoJson(layerIndex).keyAccessor(d));
                var baseClasses = layerNameClass + " " + regionClass;
                if (isSelected(layerIndex, d)) baseClasses += " selected";
                if (isDeselected(layerIndex, d)) baseClasses += " deselected";
                return baseClasses;
            });
        return regionG;
    }

    function layerSelector(layerIndex) {
        return "g.layer" + layerIndex + " g." + geoJson(layerIndex).name;
    }

    function isSelected(layerIndex, d) {
        return _chart.hasFilter() && _chart.hasFilter(getKey(layerIndex, d));
    }

    function isDeselected(layerIndex, d) {
        return _chart.hasFilter() && !_chart.hasFilter(getKey(layerIndex, d));
    }

    function getKey(layerIndex, d) {
        return geoJson(layerIndex).keyAccessor(d);
    }

    function geoJson(index) {
        return _geoJsons[index];
    }

    function renderPaths(regionG, layerIndex, data) {
        var paths = regionG
            .select("path")
            .attr("fill", function () {
                var currentFill = d3.select(this).attr("fill");
                if (currentFill)
                    return currentFill;
                return "none";
            })
            .on("click", function (d) {
                return _chart.onClick(d, layerIndex);
            });

        dc.transition(paths, _chart.transitionDuration()).attr("fill", function (d, i) {
            return _chart.getColor(data[geoJson(layerIndex).keyAccessor(d)], i);
        });
    }

    _chart.onClick = function (d, layerIndex) {
        var selectedRegion = geoJson(layerIndex).keyAccessor(d);
        dc.events.trigger(function () {
            _chart.filter(selectedRegion);
            _chart.redrawGroup();
        });
    };

    function renderTitle(regionG, layerIndex, data) {
        if (_chart.renderTitle()) {
            regionG.selectAll("title").text(function (d) {
                var key = getKey(layerIndex, d);
                var value = data[key];
                return _chart.title()({key: key, value: value});
            });
        }
    }

    _chart._doRedraw = function () {
        for (var layerIndex = 0; layerIndex < _geoJsons.length; ++layerIndex) {
            plotData(layerIndex);
            if(_projectionFlag) {
                _chart.svg().selectAll("g." + geoJson(layerIndex).name + " path").attr("d", _geoPath);
            }
        }
        _projectionFlag = false;
    };

    /**
    #### .overlayGeoJson(json, name, keyAccessor) - **mandatory**
    Use this function to insert a new GeoJson map layer. This function can be invoked multiple times
    if you have multiple GeoJson data layers to render on top of each other. If you overlay multiple
    layers with the same name the new overlay will override the existing one.

    Parameters:
    * json - GeoJson feed
    * name - name of the layer
    * keyAccessor - accessor function used to extract "key" from the GeoJson data. The key extracted by
    this function should match the keys returned by the crossfilter groups.

    ```js
    // insert a layer for rendering US states
    chart.overlayGeoJson(statesJson.features, "state", function(d) {
        return d.properties.name;
    });
    ```

    **/
    _chart.overlayGeoJson = function (json, name, keyAccessor) {
        for (var i = 0; i < _geoJsons.length; ++i) {
            if (_geoJsons[i].name == name) {
                _geoJsons[i].data = json;
                _geoJsons[i].keyAccessor = keyAccessor;
                return _chart;
            }
        }
        _geoJsons.push({name: name, data: json, keyAccessor: keyAccessor});
        return _chart;
    };

    /**
    #### .projection(projection)
    Set custom geo projection function. See the available [d3 geo projection
    functions](https://github.com/mbostock/d3/wiki/Geo-Projections).  Default value: albersUsa.

    **/
    _chart.projection = function (projection) {
        _geoPath.projection(projection);
        _projectionFlag = true;
        return _chart;
    };

    /**
    #### .geoJsons()
    Returns all GeoJson layers currently registered with this chart. The returned array is a
    reference to this chart's internal data structure, so any modification to this array will also
    modify this chart's internal registration.

    Returns an array of objects containing fields {name, data, accessor}

    **/
    _chart.geoJsons = function () {
        return _geoJsons;
    };

    /**
    #### .geoPath()
    Returns the [d3.geo.path](https://github.com/mbostock/d3/wiki/Geo-Paths#path) object used to
    render the projection and features.  Can be useful for figuring out the bounding box of the
    feature set and thus a way to calculate scale and translation for the projection.

    **/
    _chart.geoPath = function () {
        return _geoPath;
    };

    /**
    #### .removeGeoJson(name)
    Remove a GeoJson layer from this chart by name

    **/
    _chart.removeGeoJson = function (name) {
        var geoJsons = [];

        for (var i = 0; i < _geoJsons.length; ++i) {
            var layer = _geoJsons[i];
            if (layer.name != name) {
                geoJsons.push(layer);
            }
        }

        _geoJsons = geoJsons;

        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
## Bubble Overlay Chart

Includes: [Bubble Mixin](#bubble-mixin), [Base Mixin](#base-mixin)

The bubble overlay chart is quite different from the typical bubble chart. With the bubble overlay
chart you can arbitrarily place bubbles on an existing svg or bitmap image, thus changing the
typical x and y positioning while retaining the capability to visualize data using bubble radius
and coloring.

Examples:
* [Canadian City Crime Stats](http://dc-js.github.com/dc.js/crime/index.html)

#### dc.bubbleOverlay(parent[, chartGroup])
Create a bubble overlay chart instance and attach it to the given parent element.

Parameters:
* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
 off-screen. Typically this element should also be the parent of the underlying image.
* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created bubble overlay chart instance

```js
// create a bubble overlay chart on top of the "#chart-container1 svg" element using the default global chart group
var bubbleChart1 = dc.bubbleOverlayChart("#chart-container1").svg(d3.select("#chart-container1 svg"));
// create a bubble overlay chart on top of the "#chart-container2 svg" element using chart group A
var bubbleChart2 = dc.compositeChart("#chart-container2", "chartGroupA").svg(d3.select("#chart-container2 svg"));
```

#### .svg(imageElement) - **mandatory**
Set the underlying svg image element. Unlike other dc charts this chart will not generate a svg
element; therefore the bubble overlay chart will not work if this function is not invoked. If the
underlying image is a bitmap, then an empty svg will need to be created on top of the image.

```js
// set up underlying svg element
chart.svg(d3.select("#chart svg"));
```

**/
dc.bubbleOverlay = function(root, chartGroup) {
    var BUBBLE_OVERLAY_CLASS = "bubble-overlay";
    var BUBBLE_NODE_CLASS = "node";
    var BUBBLE_CLASS = "bubble";

    var _chart = dc.bubbleMixin(dc.baseMixin({}));
    var _g;
    var _points = [];

    _chart.transitionDuration(750);

    _chart.radiusValueAccessor(function(d) {
        return d.value;
    });

    /**
    #### .point(name, x, y) - **mandatory**
    Set up a data point on the overlay. The name of a data point should match a specific "key" among
    data groups generated using keyAccessor.  If a match is found (point name <-> data group key)
    then a bubble will be generated at the position specified by the function. x and y
    value specified here are relative to the underlying svg.

    **/
    _chart.point = function(name, x, y) {
        _points.push({name: name, x: x, y: y});
        return _chart;
    };

    _chart._doRender = function() {
        _g = initOverlayG();

        _chart.r().range([_chart.MIN_RADIUS, _chart.width() * _chart.maxBubbleRelativeSize()]);

        initializeBubbles();

        _chart.fadeDeselectedArea();

        return _chart;
    };

    function initOverlayG() {
        _g = _chart.select("g." + BUBBLE_OVERLAY_CLASS);
        if (_g.empty())
            _g = _chart.svg().append("g").attr("class", BUBBLE_OVERLAY_CLASS);
        return _g;
    }

    function initializeBubbles() {
        var data = mapData();

        _points.forEach(function(point) {
            var nodeG = getNodeG(point, data);

            var circle = nodeG.select("circle." + BUBBLE_CLASS);

            if (circle.empty())
                circle = nodeG.append("circle")
                    .attr("class", BUBBLE_CLASS)
                    .attr("r", 0)
                    .attr("fill", _chart.getColor)
                    .on("click", _chart.onClick);

            dc.transition(circle, _chart.transitionDuration())
                .attr("r", function(d) {
                    return _chart.bubbleR(d);
                });

            _chart._doRenderLabel(nodeG);

            _chart._doRenderTitles(nodeG);
        });
    }

    function mapData() {
        var data = {};
        _chart.data().forEach(function(datum) {
            data[_chart.keyAccessor()(datum)] = datum;
        });
        return data;
    }

    function getNodeG(point, data) {
        var bubbleNodeClass = BUBBLE_NODE_CLASS + " " + dc.utils.nameToId(point.name);

        var nodeG = _g.select("g." + dc.utils.nameToId(point.name));

        if (nodeG.empty()) {
            nodeG = _g.append("g")
                .attr("class", bubbleNodeClass)
                .attr("transform", "translate(" + point.x + "," + point.y + ")");
        }

        nodeG.datum(data[point.name]);

        return nodeG;
    }

    _chart._doRedraw = function() {
        updateBubbles();

        _chart.fadeDeselectedArea();

        return _chart;
    };

    function updateBubbles() {
        var data = mapData();

        _points.forEach(function(point) {
            var nodeG = getNodeG(point, data);

            var circle = nodeG.select("circle." + BUBBLE_CLASS);

            dc.transition(circle, _chart.transitionDuration())
                .attr("r", function(d) {
                    return _chart.bubbleR(d);
                })
                .attr("fill", _chart.getColor);

            _chart.doUpdateLabels(nodeG);

            _chart.doUpdateTitles(nodeG);
        });
    }

    _chart.debug = function(flag) {
        if(flag){
            var debugG = _chart.select("g." + dc.constants.DEBUG_GROUP_CLASS);

            if(debugG.empty())
                debugG = _chart.svg()
                    .append("g")
                    .attr("class", dc.constants.DEBUG_GROUP_CLASS);

            var debugText = debugG.append("text")
                .attr("x", 10)
                .attr("y", 20);

            debugG
                .append("rect")
                .attr("width", _chart.width())
                .attr("height", _chart.height())
                .on("mousemove", function() {
                    var position = d3.mouse(debugG.node());
                    var msg = position[0] + ", " + position[1];
                    debugText.text(msg);
                });
        }else{
            _chart.selectAll(".debug").remove();
        }

        return _chart;
    };

    _chart.anchor(root, chartGroup);

    return _chart;
};

/**
## Row Chart

Includes: [Cap Mixin](#cap-mixin), [Margin Mixin](#margin-mixin), [Color Mixin](#color-mixin), [Base Mixin](#base-mixin)

Concrete row chart implementation.

#### dc.rowChart(parent[, chartGroup])
Create a row chart instance and attach it to the given parent element.

Parameters:

* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created row chart instance

```js
// create a row chart under #chart-container1 element using the default global chart group
var chart1 = dc.rowChart("#chart-container1");
// create a row chart under #chart-container2 element using chart group A
var chart2 = dc.rowChart("#chart-container2", "chartGroupA");
```

**/
dc.rowChart = function (parent, chartGroup) {

    var _g;

    var _labelOffsetX = 10;
    var _labelOffsetY = 15;
    var _titleLabelOffsetX = 2;

    var _gap = 5;

    var _fixedBarHeight = false;
    var _rowCssClass = "row";
    var _titleRowCssClass = "titlerow";
    var _renderTitleLabel = false;

    var _chart = dc.capMixin(dc.marginMixin(dc.colorMixin(dc.baseMixin({}))));

    var _x;

    var _elasticX;

    var _xAxis = d3.svg.axis().orient("bottom");

    var _rowData;

    _chart.rowsCap = _chart.cap;

    function calculateAxisScale() {
        if (!_x || _elasticX) {
            var extent = d3.extent(_rowData, _chart.cappedValueAccessor);
            if (extent[0] > 0) extent[0] = 0;
            _x = d3.scale.linear().domain(extent)
                .range([0, _chart.effectiveWidth()]);
        }
        _xAxis.scale(_x);
    }

    function drawAxis() {
        var axisG = _g.select("g.axis");

        calculateAxisScale();

        if (axisG.empty())
            axisG = _g.append("g").attr("class", "axis")
                .attr("transform", "translate(0, " + _chart.effectiveHeight() + ")");

        dc.transition(axisG, _chart.transitionDuration())
            .call(_xAxis);
    }

    _chart._doRender = function () {
        _chart.resetSvg();

        _g = _chart.svg()
            .append("g")
            .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")");

        drawChart();

        return _chart;
    };

    _chart.title(function (d) {
        return _chart.cappedKeyAccessor(d) + ": " + _chart.cappedValueAccessor(d);
    });

    _chart.label(_chart.cappedKeyAccessor);

    /**
     #### .x([scale])
     Gets or sets the x scale. The x scale can be any d3
     [quantitive scale](https://github.com/mbostock/d3/wiki/Quantitative-Scales)
     **/
    _chart.x = function(x){
        if(!arguments.length) return _x;
        _x = x;
        return _chart;
    };

    function drawGridLines() {
        _g.selectAll("g.tick")
            .select("line.grid-line")
            .remove();

        _g.selectAll("g.tick")
            .append("line")
            .attr("class", "grid-line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", function () {
                return -_chart.effectiveHeight();
            });
    }

    function drawChart() {
        _rowData = _chart.data();

        drawAxis();
        drawGridLines();

        var rows = _g.selectAll("g." + _rowCssClass)
            .data(_rowData);

        createElements(rows);
        removeElements(rows);
        updateElements(rows);
    }

    function createElements(rows) {
        var rowEnter = rows.enter()
            .append("g")
            .attr("class", function (d, i) {
                return _rowCssClass + " _" + i;
            });

        rowEnter.append("rect").attr("width", 0);

        createLabels(rowEnter);
        updateLabels(rows);
    }

    function removeElements(rows) {
        rows.exit().remove();
    }

    function rootValue() {
        var root = _x(0);
        return root === -Infinity ? _x(1) : root;
    }

    function updateElements(rows) {
        var n = _rowData.length;

        var height;
        if (!_fixedBarHeight) height = (_chart.effectiveHeight() - (n + 1) * _gap) / n;
            else height = _fixedBarHeight;

        var rect = rows.attr("transform",function (d, i) {
                return "translate(0," + ((i + 1) * _gap + i * height) + ")";
            }).select("rect")
            .attr("height", height)
            .attr("fill", _chart.getColor)
            .on("click", onClick)
            .classed("deselected", function (d) {
                return (_chart.hasFilter()) ? !isSelectedRow(d) : false;
            })
            .classed("selected", function (d) {
                return (_chart.hasFilter()) ? isSelectedRow(d) : false;
            });

        dc.transition(rect, _chart.transitionDuration())
            .attr("width", function (d) {
                return Math.abs(rootValue() - _x(_chart.valueAccessor()(d)));
            })
            .attr("transform", translateX);

        createTitles(rows);
        updateLabels(rows);
    }

    function createTitles(rows) {
        if (_chart.renderTitle()) {
            rows.selectAll("title").remove();
            rows.append("title").text(_chart.title());
        }
    }

    function createLabels(rowEnter) {
        if (_chart.renderLabel()) {
            rowEnter.append("text")
                .on("click", onClick);
        }
        if (_chart.renderTitleLabel()) {
            rowEnter.append("text")
                .attr("class", _titleRowCssClass)
                .on("click", onClick);
        }
    }

    function updateLabels(rows) {
        if (_chart.renderLabel()) {
            var lab = rows.select("text")
                .attr("x", _labelOffsetX)
                .attr("y", _labelOffsetY)
                .on("click", onClick)
                .attr("class", function (d, i) {
                    return _rowCssClass + " _" + i;
                })
                .text(function (d) {
                    return _chart.label()(d);
                });
            dc.transition(lab, _chart.transitionDuration())
                .attr("transform", translateX);
        }
        if (_chart.renderTitleLabel()) {
            var titlelab = rows.select("." + _titleRowCssClass)
                    .attr("x", _chart.effectiveWidth() - _titleLabelOffsetX)
                    .attr("y", _labelOffsetY)
                    .attr("text-anchor", "end")
                    .on("click", onClick)
                    .attr("class", function (d, i) {
                        return _titleRowCssClass + " _" + i ;
                    })
                    .text(function (d) {
                        return _chart.title()(d);
                    });
            dc.transition(titlelab, _chart.transitionDuration())
                .attr("transform", translateX);
        }
    }

    /**
    #### .renderTitleLabel(boolean)
    Turn on/off Title label rendering (values) using SVG style of text-anchor 'end'

    **/
    _chart.renderTitleLabel = function (_) {
        if (!arguments.length) return _renderTitleLabel;
        _renderTitleLabel = _;
        return _chart;
    };

    function onClick(d) {
        _chart.onClick(d);
    }

    function translateX(d) {
        var x = _x(_chart.cappedValueAccessor(d)),
            x0 = rootValue(),
            s = x > x0 ? x0 : x;
        return "translate("+s+",0)";
    }

    _chart._doRedraw = function () {
        drawChart();
        return _chart;
    };

    /**
    #### .xAxis()
    Get the x axis for the row chart instance.  Note: not settable for row charts.
    See the [d3 axis object](https://github.com/mbostock/d3/wiki/SVG-Axes#wiki-axis) documention for more information.
    ```js
    // customize x axis tick format
    chart.xAxis().tickFormat(function(v) {return v + "%";});
    // customize x axis tick values
    chart.xAxis().tickValues([0, 100, 200, 300]);
    ```

    **/
    _chart.xAxis = function () {
        return _xAxis;
    };

    /**
    #### .fixedBarHeight([height])
    Get or set the fixed bar height. Default is [false] which will auto-scale bars.
    For example, if you want to fix the height for a specific number of bars (useful in TopN charts)
    you could fix height as follows (where count = total number of bars in your TopN and gap is your vertical gap space).
    ```js
     chart.fixedBarHeight( chartheight - (count + 1) * gap / count);
    ```
    **/
    _chart.fixedBarHeight = function (g) {
        if (!arguments.length) return _fixedBarHeight;
        _fixedBarHeight = g;
        return _chart;
    };

    /**
    #### .gap([gap])
    Get or set the vertical gap space between rows on a particular row chart instance. Default gap is 5px;

    **/
    _chart.gap = function (g) {
        if (!arguments.length) return _gap;
        _gap = g;
        return _chart;
    };

    /**
    #### .elasticX([boolean])
    Get or set the elasticity on x axis. If this attribute is set to true, then the x axis will rescle to auto-fit the data
    range when filtered.

    **/
    _chart.elasticX = function (_) {
        if (!arguments.length) return _elasticX;
        _elasticX = _;
        return _chart;
    };

    /**
    #### .labelOffsetX([x])
    Get or set the x offset (horizontal space to the top left corner of a row) for labels on a particular row chart. Default x offset is 10px;

    **/
    _chart.labelOffsetX = function (o) {
        if (!arguments.length) return _labelOffsetX;
        _labelOffsetX = o;
        return _chart;
    };

    /**
    #### .labelOffsetY([y])
    Get or set the y offset (vertical space to the top left corner of a row) for labels on a particular row chart. Default y offset is 15px;

    **/
    _chart.labelOffsetY = function (o) {
        if (!arguments.length) return _labelOffsetY;
        _labelOffsetY = o;
        return _chart;
    };

    /**
    #### .titleLabelOffsetx([x])
    Get of set the x offset (horizontal space between right edge of row and right edge or text.   Default x offset is 2px;

    **/
    _chart.titleLabelOffsetX = function (o) {
        if (!arguments.length) return _titleLabelOffsetX;
        _titleLabelOffsetX = o;
        return _chart;
    };

    function isSelectedRow (d) {
        return _chart.hasFilter(_chart.cappedKeyAccessor(d));
    }

    return _chart.anchor(parent, chartGroup);
};

/**
## Legend
Legend is a attachable widget that can be added to other dc charts to render horizontal legend
labels.

```js
chart.legend(dc.legend().x(400).y(10).itemHeight(13).gap(5))
```

Examples:
* [Nasdaq 100 Index](http://dc-js.github.com/dc.js/)
* [Canadian City Crime Stats](http://dc-js.github.com/dc.js/crime/index.html)

**/
dc.legend = function () {
    var LABEL_GAP = 2;

    var _legend = {},
        _parent,
        _x = 0,
        _y = 0,
        _itemHeight = 12,
        _gap = 5,
        _horizontal = false,
        _legendWidth = 560,
        _itemWidth = 70;

    var _g;

    _legend.parent = function (p) {
        if (!arguments.length) return _parent;
        _parent = p;
        return _legend;
    };

    _legend.render = function () {
        _parent.svg().select("g.dc-legend").remove();
        _g = _parent.svg().append("g")
            .attr("class", "dc-legend")
            .attr("transform", "translate(" + _x + "," + _y + ")");
        var legendables = _parent.legendables();

        var itemEnter = _g.selectAll('g.dc-legend-item')
            .data(legendables)
            .enter()
            .append("g")
            .attr("class", "dc-legend-item")
            .on("mouseover", function(d) {
                _parent.legendHighlight(d);
            })
            .on("mouseout", function (d) {
                _parent.legendReset(d);
            })
            .on("click", function (d) {
                d.chart.legendToggle(d);
            });

        _g.selectAll('g.dc-legend-item')
            .classed("fadeout", function(d) {
                return d.chart.isLegendableHidden(d);
            });

        if (legendables.some(dc.pluck('dashstyle'))) {
            itemEnter
                .append("line")
                .attr("x1", 0)
                .attr("y1", _itemHeight / 2)
                .attr("x2", _itemHeight)
                .attr("y2", _itemHeight / 2)
                .attr("stroke-width", 2)
                .attr("stroke-dasharray", dc.pluck('dashstyle'))
                .attr("stroke", dc.pluck('color'));
        } else {
            itemEnter
                .append("rect")
                .attr("width", _itemHeight)
                .attr("height", _itemHeight)
                .attr("fill", function(d){return d?d.color:"blue";});
        }

        itemEnter.append("text")
                .text(dc.pluck('name'))
                .attr("x", _itemHeight + LABEL_GAP)
                .attr("y", function(){return _itemHeight / 2 + (this.clientHeight?this.clientHeight:13) / 2 - 2;});

        var _cumulativeLegendTextWidth = 0;
        var row = 0;
        itemEnter.attr("transform", function(d, i) {
            if(_horizontal) {
                var translateBy = "translate(" + _cumulativeLegendTextWidth + "," + row * legendItemHeight() + ")";
                if ((_cumulativeLegendTextWidth + _itemWidth) >= _legendWidth) {
                    ++row ;
                    _cumulativeLegendTextWidth = 0 ;
                } else {
                    _cumulativeLegendTextWidth += _itemWidth;
                }
                return translateBy;
            }
            else {
                return "translate(0," + i * legendItemHeight() + ")";
            }
        });
    };

    function legendItemHeight() {
        return _gap + _itemHeight;
    }

    /**
    #### .x([value])
    Set or get x coordinate for legend widget. Default: 0.
    **/
    _legend.x = function (x) {
        if (!arguments.length) return _x;
        _x = x;
        return _legend;
    };

    /**
    #### .y([value])
    Set or get y coordinate for legend widget. Default: 0.
    **/
    _legend.y = function (y) {
        if (!arguments.length) return _y;
        _y = y;
        return _legend;
    };

    /**
    #### .gap([value])
    Set or get gap between legend items. Default: 5.
    **/
    _legend.gap = function (gap) {
        if (!arguments.length) return _gap;
        _gap = gap;
        return _legend;
    };

    /**
    #### .itemHeight([value])
    Set or get legend item height. Default: 12.
    **/
    _legend.itemHeight = function (h) {
        if (!arguments.length) return _itemHeight;
        _itemHeight = h;
        return _legend;
    };

    /**
    #### .horizontal([boolean])
    Position legend horizontally instead of vertically
    **/
    _legend.horizontal = function(_) {
        if (!arguments.length) return _horizontal;
        _horizontal = _;
        return _legend;
    };

    /**
    #### .legendWidth([value])
    Maximum width for horizontal legend. Default: 560.
    **/
    _legend.legendWidth = function(_) {
        if (!arguments.length) return _legendWidth;
        _legendWidth = _;
        return _legend;
    };

    /**
    #### .itemWidth([value])
    legendItem width for horizontal legend. Default: 70.
    **/
    _legend.itemWidth = function(_) {
        if (!arguments.length) return _itemWidth;
        _itemWidth = _;
        return _legend;
    };

    return _legend;
};

/**
## Scatter Plot

Includes: [Coordinate Grid Mixin](#coordinate-grid-mixin)

A scatter plot chart

#### dc.scatterPlot(parent[, chartGroup])
Create a scatter plot instance and attach it to the given parent element.

Parameters:

* parent : string | node | selection | compositeChart - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
 If the scatter plot is a sub-chart in a [Composite Chart](#composite-chart) then pass in the parent composite
 chart instance.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

Returns:
A newly created scatter plot instance

```js
// create a scatter plot under #chart-container1 element using the default global chart group
var chart1 = dc.scatterPlot("#chart-container1");
// create a scatter plot under #chart-container2 element using chart group A
var chart2 = dc.scatterPlot("#chart-container2", "chartGroupA");
// create a sub-chart under a composite parent chart
var chart3 = dc.scatterPlot(compositeChart);
```

 **/
dc.scatterPlot = function (parent, chartGroup) {
    var _chart = dc.coordinateGridMixin({});
    var _symbol = d3.svg.symbol();

    var originalKeyAccessor = _chart.keyAccessor();
    _chart.keyAccessor(function (d) { return originalKeyAccessor(d)[0]; });
    _chart.valueAccessor(function (d) { return originalKeyAccessor(d)[1]; });
    _chart.colorAccessor(function (d) { return _chart._groupName; });

    var _locator = function (d) {
        return "translate(" + _chart.x()(_chart.keyAccessor()(d)) + "," +
                              _chart.y()(_chart.valueAccessor()(d)) + ")";
    };

    var _symbolSize = 3;
    var _highlightedSize = 5;
    var _hiddenSize = 0;

    _symbol.size(function(d) {
        if(d.value === 0)
            return _hiddenSize;
        else if(this.filtered)
            return Math.pow(_highlightedSize, 2);
        else
            return Math.pow(_symbolSize, 2);
    });

    dc.override(_chart, "_filter", function(filter) {
        if (!arguments.length) return _chart.__filter();

        return _chart.__filter(dc.filters.RangedTwoDimensionalFilter(filter));
    });

    _chart.plotData = function () {
        var symbols = _chart.chartBodyG().selectAll("path.symbol")
            .data(_chart.data());

        symbols
            .enter()
        .append("path")
            .attr("class", "symbol")
            .attr("opacity", 0)
            .attr("fill", _chart.getColor)
            .attr("transform", _locator);

        dc.transition(symbols, _chart.transitionDuration())
            .attr("opacity", function(d) { return d.value ? 1 : 0; })
            .attr("fill", _chart.getColor)
            .attr("transform", _locator)
            .attr("d", _symbol);

        dc.transition(symbols.exit(), _chart.transitionDuration())
            .attr("opacity", 0).remove();
    };

    /**
    #### .symbol([type])
    Get or set the symbol type used for each point. By default the symbol is a circle. See the D3
    [docs](https://github.com/mbostock/d3/wiki/SVG-Shapes#wiki-symbol_type) for acceptable types.
    Type can be a constant or an accessor.

    **/
    _chart.symbol = function(type) {
        if(!arguments.length) return _symbol.type();
        _symbol.type(type);
        return _chart;
    };

    /**
    #### .symbolSize([radius])
    Set or get radius for symbols. Default: 3.

    **/
    _chart.symbolSize = function(s){
        if(!arguments.length) return _symbolSize;
        _symbolSize = s;
        return _chart;
    };

    /**
    #### .highlightedSize([radius])
    Set or get radius for highlighted symbols. Default: 4.

    **/
    _chart.highlightedSize = function(s){
        if(!arguments.length) return _highlightedSize;
        _highlightedSize = s;
        return _chart;
    };

    /**
    #### .hiddenSize([radius])
    Set or get radius for symbols when the group is empty. Default: 0.

    **/
    _chart.hiddenSize = function(s){
        if(!arguments.length) return _hiddenSize;
        _hiddenSize = s;
        return _chart;
    };

    _chart.legendables = function () {
        return [{chart: _chart, name: _chart._groupName, color: _chart.getColor()}];
    };

    _chart.legendHighlight = function (d) {
        resizeSymbolsWhere(function (symbol) {
            return symbol.attr('fill') == d.color;
        }, _highlightedSize);
        _chart.selectAll('.chart-body path.symbol').filter(function () {
            return d3.select(this).attr('fill') != d.color;
        }).classed('fadeout', true);
    };

    _chart.legendReset = function (d) {
        resizeSymbolsWhere(function (symbol) {
            return symbol.attr('fill') == d.color;
        }, _symbolSize);
        _chart.selectAll('.chart-body path.symbol').filter(function () {
            return d3.select(this).attr('fill') != d.color;
        }).classed('fadeout', false);
    };

    function resizeSymbolsWhere(condition, size) {
        var symbols = _chart.selectAll('.chart-body path.symbol').filter(function (d) {
            return condition(d3.select(this));
        });
        var oldSize = _symbol.size();
        _symbol.size(Math.pow(size, 2));
        dc.transition(symbols, _chart.transitionDuration()).attr("d", _symbol);
        _symbol.size(oldSize);
    }

    _chart.setHandlePaths = function () {
        // no handle paths for poly-brushes
    };

    _chart.extendBrush = function () {
        var extent = _chart.brush().extent();
        if (_chart.round()) {
            extent[0] = extent[0].map(_chart.round());
            extent[1] = extent[1].map(_chart.round());

            _chart.g().select(".brush")
                .call(_chart.brush().extent(extent));
        }
        return extent;
    };

    _chart.brushIsEmpty = function (extent) {
        return _chart.brush().empty() || !extent || extent[0][0] >= extent[1][0] || extent[0][1] >= extent[1][1];
    };

    function resizeFiltered(filter) {
        var symbols = _chart.selectAll('.chart-body path.symbol').each(function (d) {
            this.filtered = filter && filter.isFiltered(d.key);
        });

        dc.transition(symbols, _chart.transitionDuration()).attr("d", _symbol);
    }

    _chart._brushing = function () {
        var extent = _chart.extendBrush();

        _chart.redrawBrush(_chart.g());

        if (_chart.brushIsEmpty(extent)) {
            dc.events.trigger(function () {
                _chart.filter(null);
                _chart.redrawGroup();
            });

            resizeFiltered(false);

        } else {
            var ranged2DFilter = dc.filters.RangedTwoDimensionalFilter(extent);
            dc.events.trigger(function () {
                _chart.filter(null);
                _chart.filter(ranged2DFilter);
                _chart.redrawGroup();
            }, dc.constants.EVENT_DELAY);

            resizeFiltered(ranged2DFilter);
        }
    };

    _chart.setBrushY = function (gBrush) {
        gBrush.call(_chart.brush().y(_chart.y()));
    };

    return _chart.anchor(parent, chartGroup);
};

/**
## Number Display Widget

Includes: [Base Mixin](#base-mixin)

A display of a single numeric value.

Examples:

* [Test Example](http://dc-js.github.io/dc.js/examples/number.html)

#### dc.numberDisplay(parent[, chartGroup])
Create a Number Display instance and attach it to the given parent element.

Unlike other charts, you do not need to set a dimension. Instead a group object must be provided and
a valueAccessor that returns a single value.

Parameters:

* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.
* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 The number display widget will only react to filter changes in the chart group.

Returns:
A newly created number display instance

```js
// create a number display under #chart-container1 element using the default global chart group
var display1 = dc.numberDisplay("#chart-container1");
```

**/
dc.numberDisplay = function (parent, chartGroup) {
    var SPAN_CLASS = 'number-display';
    var _formatNumber = d3.format(".2s");
    var _chart = dc.baseMixin({});
    var _html = {one:"",some:"",none:""};

    // dimension not required
    _chart._mandatoryAttributes(['group']);

    /**
    #### .html([object])
     Gets or sets an optional object specifying HTML templates to use depending on the number
     displayed.  The text `%number` will be replaced with the current value.
     - one: HTML template to use if the number is 1
     - zero: HTML template to use if the number is 0
     - some: HTML template to use otherwise

     ```js
     numberWidget.html({
         one:"%number record",
         some:"%number records",
         none:"no records"})
     ```
    **/

    _chart.html = function(s) {
        if (!arguments.length) return _html;
        if(s.none)
            _html.none = s.none;//if none available
        else if(s.one)
            _html.none = s.one;//if none not available use one
        else if(s.some)
            _html.none = s.some;//if none and one not available use some
        if(s.one)
            _html.one = s.one;//if one available
        else if(s.some)
            _html.one = s.some;//if one not available use some
        if(s.some)
            _html.some = s.some;//if some available
        else if(s.one)
            _html.some = s.one;//if some not available use one
        return _chart;
    };

    /**
    #### .value()
    Calculate and return the underlying value of the display
    **/

    _chart.value = function () {
        return _chart.data();
    };

    _chart.data(function (group) {
        var valObj = group.value ? group.value() : group.top(1)[0];
        return _chart.valueAccessor()(valObj);
    });

    _chart.transitionDuration(250); // good default

    _chart._doRender = function () {
        var newValue = _chart.value(),
            span     = _chart.selectAll("."+SPAN_CLASS);

        if(span.empty())
            span = span.data([0])
                .enter()
                .append("span")
                .attr("class", SPAN_CLASS);

        span.transition()
            .duration(_chart.transitionDuration())
            .ease('quad-out-in')
            .tween("text", function () {
                var interp = d3.interpolateNumber(this.lastValue || 0, newValue);
                this.lastValue = newValue;
                return function (t) {
                    var html = null, num = _chart.formatNumber()(interp(t));
                    if(newValue===0 && (_html.none!==""))
                        html = _html.none;
                    else if(newValue===1 &&(_html.one!==""))
                        html = _html.one;
                    else if(_html.some!=="")
                        html = _html.some;
                    this.innerHTML = html ? html.replace("%number", num) : num;
                };
            });
    };

    _chart._doRedraw = function(){
        return _chart._doRender();
    };

    /**
    #### .formatNumber([formatter])
    Get or set a function to format the value for the display. By default `d3.format(".2s");` is used.

    **/
    _chart.formatNumber = function (_) {
        if (!arguments.length) return _formatNumber;
        _formatNumber = _;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};

/**
 ## Heat Map

 Includes: [Color Mixin](#color-mixin), [Margin Mixin](#margin-mixin), [Base Mixin](#base-mixin)

 A heat map is matrix that represents the values of two dimensions of data using colors.

 #### dc.heatMap(parent[, chartGroup])
 Create a heat map instance and attach it to the given parent element.

 Parameters:
* parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) specifying
 a dom block element such as a div; or a dom element or d3 selection.

* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

 Returns:
 A newly created heat map instance

 ```js
 // create a heat map under #chart-container1 element using the default global chart group
 var heatMap1 = dc.heatMap("#chart-container1");
 // create a heat map under #chart-container2 element using chart group A
 var heatMap2 = dc.heatMap("#chart-container2", "chartGroupA");
 ```

 **/
dc.heatMap = function (parent, chartGroup) {

    var DEFAULT_BORDER_RADIUS = 6.75;

    var _chartBody;

    var _cols;
    var _rows;
    var _xBorderRadius = DEFAULT_BORDER_RADIUS;
    var _yBorderRadius = DEFAULT_BORDER_RADIUS;

    var _chart = dc.colorMixin(dc.marginMixin(dc.baseMixin({})));
    _chart._mandatoryAttributes(['group']);
    _chart.title(_chart.colorAccessor());

    var _xAxisOnClick = function (d) { filterAxis(0, d); };
    var _yAxisOnClick = function (d) { filterAxis(1, d); };
    var _boxOnClick = function (d) {
        var filter = d.key;
        dc.events.trigger(function() {
            _chart.filter(filter);
            _chart.redrawGroup();
        });
    };

    function filterAxis(axis, value) {
        var cellsOnAxis = _chart.selectAll(".box-group").filter( function (d) {
            return d.key[axis] == value;
        });
        var unfilteredCellsOnAxis = cellsOnAxis.filter( function (d) {
            return !_chart.hasFilter(d.key);
        });
        dc.events.trigger(function() {
            if(unfilteredCellsOnAxis.empty()) {
                cellsOnAxis.each( function (d) {
                    _chart.filter(d.key);
                });
            } else {
                unfilteredCellsOnAxis.each( function (d) {
                    _chart.filter(d.key);
                });
            }
            _chart.redrawGroup();
        });
    }

    dc.override(_chart, "filter", function(filter) {
        if (!arguments.length) return _chart._filter();

        return _chart._filter(dc.filters.TwoDimensionalFilter(filter));
    });

    function uniq(d,i,a) {
        return !i || a[i-1] != d;
    }

    /**
     #### .rows([values])
     Gets or sets the values used to create the rows of the heatmap, as an array. By default, all
     the values will be fetched from the data using the value accessor, and they will be sorted in
     ascending order.
     **/

    _chart.rows = function (_) {
        if (arguments.length) {
            _rows = _;
            return _chart;
        }
        if (_rows) return _rows;
        var rowValues = _chart.data().map(_chart.valueAccessor());
        rowValues.sort(d3.ascending);
        return d3.scale.ordinal().domain(rowValues.filter(uniq));
    };

    /**
     #### .cols([keys])
     Gets or sets the keys used to create the columns of the heatmap, as an array. By default, all
     the values will be fetched from the data using the key accessor, and they will be sorted in
     ascending order.
     **/
    _chart.cols = function (_) {
        if (arguments.length) {
            _cols = _;
            return _chart;
        }
        if (_cols) return _cols;
        var colValues = _chart.data().map(_chart.keyAccessor());
        colValues.sort(d3.ascending);
        return d3.scale.ordinal().domain(colValues.filter(uniq));
    };

    _chart._doRender = function () {
        _chart.resetSvg();

        _chartBody = _chart.svg()
          .append("g")
          .attr("class", "heatmap")
          .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")");

        return _chart._doRedraw();
    };

    _chart._doRedraw = function () {
        var rows = _chart.rows(),
            cols = _chart.cols(),
            rowCount = rows.domain().length,
            colCount = cols.domain().length,
            boxWidth = Math.floor(_chart.effectiveWidth() / colCount),
            boxHeight = Math.floor(_chart.effectiveHeight() / rowCount);

        cols.rangeRoundBands([0, _chart.effectiveWidth()]);
        rows.rangeRoundBands([_chart.effectiveHeight(), 0]);

        var boxes = _chartBody.selectAll("g.box-group").data(_chart.data(), function(d,i) {
            return _chart.keyAccessor()(d,i) + '\0' + _chart.valueAccessor()(d,i);
        });
        var gEnter = boxes.enter().append("g")
            .attr("class", "box-group");

        gEnter.append("rect")
            .attr("class","heat-box")
            .attr("fill", "white")
            .on("click", _chart.boxOnClick());

        gEnter.append("title")
            .text(_chart.title());

        dc.transition(boxes.selectAll("rect"), _chart.transitionDuration())
            .attr("x", function(d,i) { return cols(_chart.keyAccessor()(d,i)); })
            .attr("y", function(d,i) { return rows(_chart.valueAccessor()(d,i)); })
            .attr("rx", _xBorderRadius)
            .attr("ry", _yBorderRadius)
            .attr("fill", _chart.getColor)
            .attr("width", boxWidth)
            .attr("height", boxHeight);

        boxes.exit().remove();

        var gCols = _chartBody.selectAll("g.cols");
        if (gCols.empty())
            gCols = _chartBody.append("g").attr("class", "cols axis");
        var gColsText = gCols.selectAll('text').data(cols.domain());
        gColsText.enter().append("text")
              .attr("x", function(d) { return cols(d) + boxWidth/2; })
              .style("text-anchor", "middle")
              .attr("y", _chart.effectiveHeight())
              .attr("dy", 12)
              .on("click", _chart.xAxisOnClick())
              .text(function(d) { return d; });
        dc.transition(gColsText, _chart.transitionDuration())
               .text(function(d) { return d; })
               .attr("x", function(d) { return cols(d) + boxWidth/2; });
        gColsText.exit().remove();
        var gRows = _chartBody.selectAll("g.rows");
        if (gRows.empty())
            gRows = _chartBody.append("g").attr("class", "rows axis");
        var gRowsText = gRows.selectAll('text').data(rows.domain());
        gRowsText.enter().append("text")
              .attr("dy", 6)
              .style("text-anchor", "end")
              .attr("x", 0)
              .attr("dx", -2)
              .on("click", _chart.yAxisOnClick())
              .text(function(d) { return d; });
        dc.transition(gRowsText, _chart.transitionDuration())
              .text(function(d) { return d; })
              .attr("y", function(d) { return rows(d) + boxHeight/2; });
        gRowsText.exit().remove();

        if (_chart.hasFilter()) {
            _chart.selectAll("g.box-group").each(function (d) {
                if (_chart.isSelectedNode(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll("g.box-group").each(function () {
                _chart.resetHighlight(this);
            });
        }
        return _chart;
    };
    /**
     #### .boxOnClick([handler])
     Gets or sets the handler that fires when an individual cell is clicked in the heatmap.
     By default, filtering of the cell will be toggled.
     **/
    _chart.boxOnClick = function (f) {
        if (!arguments.length) return _boxOnClick;
        _boxOnClick = f;
        return _chart;
    };

    /**
     #### .xAxisOnClick([handler])
     Gets or sets the handler that fires when a column tick is clicked in the x axis.
     By default, if any cells in the column are unselected, the whole column will be selected,
     otherwise the whole column will be unselected.
     **/
    _chart.xAxisOnClick = function (f) {
        if (!arguments.length) return _xAxisOnClick;
        _xAxisOnClick = f;
        return _chart;
    };

    /**
     #### .yAxisOnClick([handler])
     Gets or sets the handler that fires when a row tick is clicked in the y axis.
     By default, if any cells in the row are unselected, the whole row will be selected,
     otherwise the whole row will be unselected.
     **/
    _chart.yAxisOnClick = function (f) {
        if (!arguments.length) return _yAxisOnClick;
        _yAxisOnClick = f;
        return _chart;
    };

    /**
     #### .xBorderRadius([value])
     Gets or sets the X border radius.  Set to 0 to get full rectangles.  Default: 6.75
     */
    _chart.xBorderRadius = function (d) {
        if (!arguments.length) return _xBorderRadius;
        _xBorderRadius = d;
        return _chart;
    };

    /**
     #### .xBorderRadius([value])
     Gets or sets the Y border radius.  Set to 0 to get full rectangles.  Default: 6.75
     */
    _chart.yBorderRadius = function (d) {
        if (!arguments.length) return _yBorderRadius;
        _yBorderRadius = d;
        return _chart;
    };

    _chart.isSelectedNode = function (d) {
        return _chart.hasFilter(d.key);
    };

    return _chart.anchor(parent, chartGroup);
};

// https://github.com/d3/d3-plugins/blob/master/box/box.js
(function() {

// Inspired by http://informationandvisualization.de/blog/box-plot
d3.box = function() {
  var width = 1,
      height = 1,
      duration = 0,
      domain = null,
      value = Number,
      whiskers = boxWhiskers,
      quartiles = boxQuartiles,
      tickFormat = null;

  // For each small multiple…
  function box(g) {
    g.each(function(d, i) {
      d = d.map(value).sort(d3.ascending);
      var g = d3.select(this),
          n = d.length,
          min = d[0],
          max = d[n - 1];

      // Compute quartiles. Must return exactly 3 elements.
      var quartileData = d.quartiles = quartiles(d);

      // Compute whiskers. Must return exactly 2 elements, or null.
      var whiskerIndices = whiskers && whiskers.call(this, d, i),
          whiskerData = whiskerIndices && whiskerIndices.map(function(i) { return d[i]; });

      // Compute outliers. If no whiskers are specified, all data are "outliers".
      // We compute the outliers as indices, so that we can join across transitions!
      var outlierIndices = whiskerIndices
          ? d3.range(0, whiskerIndices[0]).concat(d3.range(whiskerIndices[1] + 1, n))
          : d3.range(n);

      // Compute the new x-scale.
      var x1 = d3.scale.linear()
          .domain(domain && domain.call(this, d, i) || [min, max])
          .range([height, 0]);

      // Retrieve the old x-scale, if this is an update.
      var x0 = this.__chart__ || d3.scale.linear()
          .domain([0, Infinity])
          .range(x1.range());

      // Stash the new scale.
      this.__chart__ = x1;

      // Note: the box, median, and box tick elements are fixed in number,
      // so we only have to handle enter and update. In contrast, the outliers
      // and other elements are variable, so we need to exit them! Variable
      // elements also fade in and out.

      // Update center line: the vertical line spanning the whiskers.
      var center = g.selectAll("line.center")
          .data(whiskerData ? [whiskerData] : []);

      center.enter().insert("line", "rect")
          .attr("class", "center")
          .attr("x1", width / 2)
          .attr("y1", function(d) { return x0(d[0]); })
          .attr("x2", width / 2)
          .attr("y2", function(d) { return x0(d[1]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.transition()
          .duration(duration)
          .style("opacity", 1)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); });

      center.exit().transition()
          .duration(duration)
          .style("opacity", 1e-6)
          .attr("y1", function(d) { return x1(d[0]); })
          .attr("y2", function(d) { return x1(d[1]); })
          .remove();

      // Update innerquartile box.
      var box = g.selectAll("rect.box")
          .data([quartileData]);

      box.enter().append("rect")
          .attr("class", "box")
          .attr("x", 0)
          .attr("y", function(d) { return x0(d[2]); })
          .attr("width", width)
          .attr("height", function(d) { return x0(d[0]) - x0(d[2]); })
        .transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      box.transition()
          .duration(duration)
          .attr("y", function(d) { return x1(d[2]); })
          .attr("height", function(d) { return x1(d[0]) - x1(d[2]); });

      // Update median line.
      var medianLine = g.selectAll("line.median")
          .data([quartileData[1]]);

      medianLine.enter().append("line")
          .attr("class", "median")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      medianLine.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1);

      // Update whiskers.
      var whisker = g.selectAll("line.whisker")
          .data(whiskerData || []);

      whisker.enter().insert("line", "circle, text")
          .attr("class", "whisker")
          .attr("x1", 0)
          .attr("y1", x0)
          .attr("x2", width)
          .attr("y2", x0)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1);

      whisker.exit().transition()
          .duration(duration)
          .attr("y1", x1)
          .attr("y2", x1)
          .style("opacity", 1e-6)
          .remove();

      // Update outliers.
      var outlier = g.selectAll("circle.outlier")
          .data(outlierIndices, Number);

      outlier.enter().insert("circle", "text")
          .attr("class", "outlier")
          .attr("r", 5)
          .attr("cx", width / 2)
          .attr("cy", function(i) { return x0(d[i]); })
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1);

      outlier.exit().transition()
          .duration(duration)
          .attr("cy", function(i) { return x1(d[i]); })
          .style("opacity", 1e-6)
          .remove();

      // Compute the tick format.
      var format = tickFormat || x1.tickFormat(8);

      // Update box ticks.
      var boxTick = g.selectAll("text.box")
          .data(quartileData);

      boxTick.enter().append("text")
          .attr("class", "box")
          .attr("dy", ".3em")
          .attr("dx", function(d, i) { return i & 1 ? 6 : -6; })
          .attr("x", function(d, i) { return i & 1 ? width : 0; })
          .attr("y", x0)
          .attr("text-anchor", function(d, i) { return i & 1 ? "start" : "end"; })
          .text(format)
        .transition()
          .duration(duration)
          .attr("y", x1);

      boxTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1);

      // Update whisker ticks. These are handled separately from the box
      // ticks because they may or may not exist, and we want don't want
      // to join box ticks pre-transition with whisker ticks post-.
      var whiskerTick = g.selectAll("text.whisker")
          .data(whiskerData || []);

      whiskerTick.enter().append("text")
          .attr("class", "whisker")
          .attr("dy", ".3em")
          .attr("dx", 6)
          .attr("x", width)
          .attr("y", x0)
          .text(format)
          .style("opacity", 1e-6)
        .transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.transition()
          .duration(duration)
          .text(format)
          .attr("y", x1)
          .style("opacity", 1);

      whiskerTick.exit().transition()
          .duration(duration)
          .attr("y", x1)
          .style("opacity", 1e-6)
          .remove();
    });
    d3.timer.flush();
  }

  box.width = function(x) {
    if (!arguments.length) return width;
    width = x;
    return box;
  };

  box.height = function(x) {
    if (!arguments.length) return height;
    height = x;
    return box;
  };

  box.tickFormat = function(x) {
    if (!arguments.length) return tickFormat;
    tickFormat = x;
    return box;
  };

  box.duration = function(x) {
    if (!arguments.length) return duration;
    duration = x;
    return box;
  };

  box.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x == null ? x : d3.functor(x);
    return box;
  };

  box.value = function(x) {
    if (!arguments.length) return value;
    value = x;
    return box;
  };

  box.whiskers = function(x) {
    if (!arguments.length) return whiskers;
    whiskers = x;
    return box;
  };

  box.quartiles = function(x) {
    if (!arguments.length) return quartiles;
    quartiles = x;
    return box;
  };

  return box;
};

function boxWhiskers(d) {
  return [0, d.length - 1];
}

function boxQuartiles(d) {
  return [
    d3.quantile(d, .25),
    d3.quantile(d, .5),
    d3.quantile(d, .75)
  ];
}

})();

/**
 ## Box Plot

 Includes: [Coordinate Grid Mixin](#coordinate-grid-mixin)

 A box plot is a chart that depicts numerical data via their quartile ranges.

 #### dc.boxPlot(parent[, chartGroup])
 Create a box plot instance and attach it to the given parent element.

 Parameters:
 * parent : string | node | selection - any valid
 [d3 single selector](https://github.com/mbostock/d3/wiki/Selections#selecting-elements) representing
 a dom block element such as a div; or a dom element or d3 selection.
* chartGroup : string (optional) - name of the chart group this chart instance should be placed in.
 Interaction with a chart will only trigger events and redraws within the chart's group.

 Returns:
 A newly created box plot instance

 ```js
 // create a box plot under #chart-container1 element using the default global chart group
 var boxPlot1 = dc.boxPlot("#chart-container1");
 // create a box plot under #chart-container2 element using chart group A
 var boxPlot2 = dc.boxPlot("#chart-container2", "chartGroupA");
 ```

 **/
dc.boxPlot = function (parent, chartGroup) {
    var _chart = dc.coordinateGridMixin({});

    var _whisker_iqr_factor = 1.5;
    var _whiskers_iqr = default_whiskers_iqr;
    var _whiskers = _whiskers_iqr(_whisker_iqr_factor);

    var _box = d3.box();
    var _tickFormat = null;

    var _boxWidth = function (innerChartWidth, xUnits) {
        if (_chart.isOrdinal())
            return _chart.x().rangeBand();
        else
            return innerChartWidth / (1 + _chart.boxPadding()) / xUnits;
    };

    // default padding to handle min/max whisker text
    _chart.yAxisPadding(12);

    // default to ordinal
    _chart.x(d3.scale.ordinal());
    _chart.xUnits(dc.units.ordinal);

    // valueAccessor should return an array of values that can be coerced into numbers
    // or if data is overloaded for a static array of arrays, it should be `Number`.
    // Empty arrays are not included.
    _chart.data(function(group) {
        return group.all().map(function (d) {
            d.map = function(accessor) { return accessor.call(d,d); };
            return d;
        }).filter(function (d) {
            var values = _chart.valueAccessor()(d);
            return values.length !== 0;
        });
    });

    /**
    #### .boxPadding([padding])
    Get or set the spacing between boxes as a fraction of box size. Valid values are within 0-1.
    See the [d3 docs](https://github.com/mbostock/d3/wiki/Ordinal-Scales#wiki-ordinal_rangeBands)
    for a visual description of how the padding is applied.

    Default: 0.8
    **/
    _chart.boxPadding = _chart._rangeBandPadding;
    _chart.boxPadding(0.8);

    /**
    #### .outerPadding([padding])
    Get or set the outer padding on an ordinal box chart. This setting has no effect on non-ordinal charts
    or on charts with a custom `.boxWidth`. Will pad the width by `padding * barWidth` on each side of the chart.

    Default: 0.5
    **/
    _chart.outerPadding = _chart._outerRangeBandPadding;
    _chart.outerPadding(0.5);

    /**
     #### .boxWidth(width || function(innerChartWidth, xUnits) { ... })
     Get or set the numerical width of the boxplot box. The width may also be a function taking as
     parameters the chart width excluding the right and left margins, as well as the number of x
     units.
     **/
    _chart.boxWidth = function(_) {
        if (!arguments.length) return _boxWidth;
        _boxWidth = d3.functor(_);
        return _chart;
    };

    var boxTransform = function (d, i) {
        var xOffset = _chart.x()(_chart.keyAccessor()(d,i));
        return "translate(" + xOffset + ",0)";
    };

    _chart._preprocessData = function () {
        if (_chart.elasticX()) {
            _chart.x().domain([]);
        }
    };

    _chart.plotData = function () {
        var _calculatedBoxWidth = _boxWidth(_chart.effectiveWidth(), _chart.xUnitCount());

        _box.whiskers(_whiskers)
            .width(_calculatedBoxWidth)
            .height(_chart.effectiveHeight())
            .value(_chart.valueAccessor())
            .domain(_chart.y().domain())
            .duration(_chart.transitionDuration())
            .tickFormat(_tickFormat);

        var boxesG = _chart.chartBodyG().selectAll('g.box').data(_chart.data(), function (d) { return d.key; });

        renderBoxes(boxesG);
        updateBoxes(boxesG);
        removeBoxes(boxesG);

        _chart.fadeDeselectedArea();
    };

    function renderBoxes(boxesG) {
        var boxesGEnter = boxesG.enter().append("g");

        boxesGEnter
            .attr("class", "box")
            .attr("transform", boxTransform)
            .call(_box)
            .on("click", function(d) {
                _chart.filter(d.key);
                _chart.redrawGroup();
            });
    }

    function updateBoxes(boxesG) {
        dc.transition(boxesG, _chart.transitionDuration())
            .attr("transform", boxTransform)
            .call(_box)
            .each(function() {
                d3.select(this).select('rect.box').attr("fill", _chart.getColor);
            });
    }

    function removeBoxes(boxesG) {
        boxesG.exit().remove().call(_box);
    }

    _chart.fadeDeselectedArea = function () {
        if (_chart.hasFilter()) {
            _chart.g().selectAll("g.box").each(function (d) {
                if (_chart.isSelectedNode(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.g().selectAll("g.box").each(function () {
                _chart.resetHighlight(this);
            });
        }
    };

    _chart.isSelectedNode = function (d) {
        return _chart.hasFilter(d.key);
    };

    _chart.yAxisMin = function () {
        var min = d3.min(_chart.data(), function (e) {
            return d3.min(_chart.valueAccessor()(e));
        });
        return dc.utils.subtract(min, _chart.yAxisPadding());
    };

    _chart.yAxisMax = function () {
        var max = d3.max(_chart.data(), function (e) {
            return d3.max(_chart.valueAccessor()(e));
        });
        return dc.utils.add(max, _chart.yAxisPadding());
    };

    /**
     #### .tickFormat()
     Set the numerical format of the boxplot median, whiskers and quartile labels. Defaults to
     integer formatting.
     ```js
     // format ticks to 2 decimal places
     chart.tickFormat(d3.format(".2f"));
     ```
     **/
    _chart.tickFormat = function(x) {
        if (!arguments.length) return _tickFormat;
        _tickFormat = x;
        return _chart;
    };

    // Returns a function to compute the interquartile range.
    function default_whiskers_iqr(k) {
        return function (d) {
            var q1 = d.quartiles[0],
                q3 = d.quartiles[2],
                iqr = (q3 - q1) * k,
                i = -1,
                j = d.length;
            while (d[++i] < q1 - iqr);
            while (d[--j] > q3 + iqr);
            return [i, j];
        };
    }

    return _chart.anchor(parent, chartGroup);
};

// Renamed functions

dc.abstractBubbleChart = dc.bubbleMixin;
dc.baseChart = dc.baseMixin;
dc.capped = dc.capMixin;
dc.colorChart = dc.colorMixin;
dc.coordinateGridChart = dc.coordinateGridMixin;
dc.marginable = dc.marginMixin;
dc.stackableChart = dc.stackMixin;

return dc;}
if(typeof define === "function" && define.amd) {
  define(["d3"], _dc);
} else if(typeof module === "object" && module.exports) {
  module.exports = _dc(d3);
} else {
  this.dc = _dc(d3);
}
}
)();
