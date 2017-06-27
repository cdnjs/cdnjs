/*
 *  Copyright 2012 the original author or authors.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
dc = {
    version: "1.2.0",
    constants : {
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
    _renderlet : null
};

dc.chartRegistry = function() {
    // chartGroup:string => charts:array
    var _chartMap = {};

    this.has = function(chart) {
        for (var e in _chartMap) {
            if (_chartMap[e].indexOf(chart) >= 0)
                return true;
        }
        return false;
    };

    function initializeChartGroup(group) {
        if (!group)
            group = dc.constants.DEFAULT_CHART_GROUP;

        if (!_chartMap[group])
            _chartMap[group] = [];

        return group;
    }

    this.register = function(chart, group) {
        group = initializeChartGroup(group);
        _chartMap[group].push(chart);
    };

    this.clear = function() {
        _chartMap = {};
    };

    this.list = function(group) {
        group = initializeChartGroup(group);
        return _chartMap[group];
    };

    return this;
}();

dc.registerChart = function(chart, group) {
    dc.chartRegistry.register(chart, group);
};

dc.hasChart = function(chart) {
    return dc.chartRegistry.has(chart);
};

dc.deregisterAllCharts = function() {
    dc.chartRegistry.clear();
};

dc.filterAll = function(group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].filterAll();
    }
};

dc.renderAll = function(group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].render();
    }

    if(dc._renderlet !== null)
        dc._renderlet(group);
};

dc.redrawAll = function(group) {
    var charts = dc.chartRegistry.list(group);
    for (var i = 0; i < charts.length; ++i) {
        charts[i].redraw();
    }

    if(dc._renderlet !== null)
        dc._renderlet(group);
};

dc.transition = function(selections, duration, callback) {
    if (duration <= 0 || duration === undefined)
        return selections;

    var s = selections
        .transition()
        .duration(duration);

    if (callback instanceof Function) {
        callback(s);
    }

    return s;
};

dc.units = {};
dc.units.integers = function(s, e) {
    return Math.abs(e - s);
};

dc.units.ordinal = function(s, e, domain){
    return domain;
};
dc.units.float = {};
dc.units.float.precision= function(precision){
    var _f = function(s, e, domain){return Math.ceil(Math.abs((e-s)/_f.resolution));};
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
    return o instanceof Object && o.__dc_flag__;
};
dc.errors = {};

dc.errors.Exception = function(msg) {
    var _msg = msg != null ? msg : "Unexpected internal error";

    this.message = _msg;

    this.toString = function(){
        return _msg;
    };
};

dc.errors.InvalidStateException = function() {
    dc.errors.Exception.apply(this, arguments);
};dc.dateFormat = d3.time.format("%m/%d/%Y");

dc.printers = {};
dc.printers.filter = function (filter) {
    var s = "";

    if (filter) {
        if (filter instanceof Array) {
            if (filter.length >= 2)
                s = "[" + printSingleValue(filter[0]) + " -> " + printSingleValue(filter[1]) + "]";
            else if (filter.length >= 1)
                s = printSingleValue(filter[0]);
        } else {
            s = printSingleValue(filter)
        }
    }

    return s;
};

function printSingleValue(filter) {
    var s = "" + filter;

    if (filter instanceof Date)
        s = dc.dateFormat(filter);
    else if (typeof(filter) == "string")
        s = filter;
    else if (typeof(filter) == "number")
        s = Math.round(filter);

    return s;
}

dc.utils = {};
dc.utils.add = function (l, r) {
    if (typeof r === "string")
        r = r.replace("%", "")

    if (l instanceof Date) {
        if (typeof r === "string") r = +r
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
        r = r.replace("%", "")

    if (l instanceof Date) {
        if (typeof r === "string") r = +r
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
dc.utils.GroupStack = function () {
    var _dataPointMatrix = [];
    var _groups = [];
    var _defaultAccessor;

    function initializeDataPointRow(x) {
        if (!_dataPointMatrix[x])
            _dataPointMatrix[x] = [];
    }

    this.setDataPoint = function (x, y, data) {
        initializeDataPointRow(x);
        _dataPointMatrix[x][y] = data;
    };

    this.getDataPoint = function (x, y) {
        initializeDataPointRow(x);
        var dataPoint = _dataPointMatrix[x][y];
        if (dataPoint == undefined)
            dataPoint = 0;
        return dataPoint;
    };

    this.addGroup = function (group, retriever) {
        if (!retriever)
            retriever = _defaultAccessor;
        _groups.push([group, retriever]);
        return _groups.length - 1;
    };

    this.getGroupByIndex = function (index) {
        return _groups[index][0];
    };

    this.getAccessorByIndex = function (index) {
        return _groups[index][1];
    };

    this.size = function () {
        return _groups.length;
    };

    this.clear = function () {
        _dataPointMatrix = [];
        _groups = [];
    };

    this.setDefaultAccessor = function (retriever) {
        _defaultAccessor = retriever;
    };

    this.getDataPoints = function () {
        return _dataPointMatrix;
    };
};

function isNegligible(max) {
    return max === undefined || (max < dc.constants.NEGLIGIBLE_NUMBER && max > -dc.constants.NEGLIGIBLE_NUMBER);
}

dc.utils.groupMax = function (group, accessor) {
    var max = d3.max(group.all(), function (e) {
        return accessor(e);
    });
    if (isNegligible(max)) max = 0;
    return max;
};

dc.utils.groupMin = function (group, accessor) {
    var min = d3.min(group.all(), function (e) {
        return accessor(e);
    });
    if (isNegligible(min)) min = 0;
    return min;
};

dc.utils.nameToId = function (name) {
    return name.toLowerCase().replace(/[\s]/g, "_").replace(/[\.']/g, "");
};

dc.utils.appendOrSelect = function (parent, name) {
    var element = parent.select(name);
    if (element.empty()) element = parent.append(name);
    return element;
};
dc.events = {
    current: null
};

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
dc.cumulative = {};

dc.cumulative.Base = function() {
    this._keyIndex = [];
    this._map = {};

    this.sanitizeKey = function(key) {
        key = key + "";
        return key;
    };

    this.clear = function() {
        this._keyIndex = [];
        this._map = {};
    };

    this.size = function() {
        return this._keyIndex.length;
    };

    this.getValueByKey = function(key) {
        key = this.sanitizeKey(key);
        var value = this._map[key];
        return value;
    };

    this.setValueByKey = function(key, value) {
        key = this.sanitizeKey(key);
        return this._map[key] = value;
    };

    this.indexOfKey = function(key) {
        key = this.sanitizeKey(key);
        return this._keyIndex.indexOf(key);
    };

    this.addToIndex = function(key) {
        key = this.sanitizeKey(key);
        this._keyIndex.push(key);
    };

    this.getKeyByIndex = function(index) {
        return this._keyIndex[index];
    };
};

dc.cumulative.Sum = function() {
    dc.cumulative.Base.apply(this, arguments);

    this.add = function(key, value) {
        if (value == null)
            value = 0;

        if (this.getValueByKey(key) == null) {
            this.addToIndex(key);
            this.setValueByKey(key, value);
        } else {
            this.setValueByKey(key, this.getValueByKey(key) + value);
        }
    };

    this.minus = function(key, value) {
        this.setValueByKey(key, this.getValueByKey(key) - value);
    };

    this.cumulativeSum = function(key) {
        var keyIndex = this.indexOfKey(key);
        if (keyIndex < 0) return 0;
        var cumulativeValue = 0;
        for (var i = 0; i <= keyIndex; ++i) {
            var k = this.getKeyByIndex(i);
            cumulativeValue += this.getValueByKey(k);
        }
        return cumulativeValue;
    };
};
dc.cumulative.Sum.prototype = new dc.cumulative.Base();

dc.cumulative.CountUnique = function() {
    dc.cumulative.Base.apply(this, arguments);

    function hashSize(hash) {
        var size = 0, key;
        for (key in hash) {
            if (hash.hasOwnProperty(key)) size++;
        }
        return size;
    }

    this.add = function(key, e) {
        if (this.getValueByKey(key) == null) {
            this.setValueByKey(key, {});
            this.addToIndex(key);
        }

        if (e != null) {
            if (this.getValueByKey(key)[e] == null)
                this.getValueByKey(key)[e] = 0;

            this.getValueByKey(key)[e] += 1;
        }
    };

    this.minus = function(key, e) {
        this.getValueByKey(key)[e] -= 1;
        if (this.getValueByKey(key)[e] <= 0)
            delete this.getValueByKey(key)[e];
    };

    this.count = function(key) {
        return hashSize(this.getValueByKey(key));
    };

    this.cumulativeCount = function(key) {
        var keyIndex = this.indexOfKey(key);
        if (keyIndex < 0) return 0;
        var cumulativeCount = 0;
        for (var i = 0; i <= keyIndex; ++i) {
            var k = this.getKeyByIndex(i);
            cumulativeCount += this.count(k);
        }
        return cumulativeCount;
    };
};
dc.cumulative.CountUnique.prototype = new dc.cumulative.Base();
dc.baseChart = function (_chart) {
    _chart.__dc_flag__ = true;

    var _dimension;
    var _group;

    var _anchor;
    var _root;
    var _svg;

    var _width = 200, _height = 200;

    var _keyAccessor = function (d) {
        return d.key;
    };
    var _valueAccessor = function (d) {
        return d.value;
    };

    var _label = function (d) {
        return d.key;
    };
    var _renderLabel = false;

    var _title = function (d) {
        return d.key + ": " + d.value;
    };
    var _renderTitle = false;

    var _transitionDuration = 750;

    var _filterPrinter = dc.printers.filter;

    var _renderlets = [];

    var _chartGroup = dc.constants.DEFAULT_CHART_GROUP;

    var NULL_LISTENER = function (chart) {
    };
    var _listeners = {
        preRender: NULL_LISTENER,
        postRender: NULL_LISTENER,
        preRedraw: NULL_LISTENER,
        postRedraw: NULL_LISTENER,
        filtered: NULL_LISTENER
    };

    _chart.width = function (w) {
        if (!arguments.length) return _width;
        _width = w;
        return _chart;
    };

    _chart.height = function (h) {
        if (!arguments.length) return _height;
        _height = h;
        return _chart;
    };

    _chart.dimension = function (d) {
        if (!arguments.length) return _dimension;
        _dimension = d;
        return _chart;
    };

    _chart.group = function (g) {
        if (!arguments.length) return _group;
        _group = g;
        return _chart;
    };

    _chart.orderedGroup = function () {
        return _group.order(function (p) {
            return p.key;
        });
    };

    _chart.filterAll = function () {
        return _chart.filter(null);
    };

    _chart.dataSet = function () {
        return _dimension != undefined && _group != undefined;
    };

    _chart.select = function (s) {
        return _root.select(s);
    };

    _chart.selectAll = function (s) {
        return _root.selectAll(s);
    };

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

    _chart.root = function (r) {
        if (!arguments.length) return _root;
        _root = r;
        return _chart;
    };

    _chart.svg = function (_) {
        if (!arguments.length) return _svg;
        _svg = _;
        return _chart;
    };

    _chart.resetSvg = function () {
        _chart.select("svg").remove();
        return _chart.generateSvg();
    };

    _chart.generateSvg = function () {
        _svg = _chart.root().append("svg")
            .attr("width", _chart.width())
            .attr("height", _chart.height());
        return _svg;
    };

    _chart.filterPrinter = function (_) {
        if (!arguments.length) return _filterPrinter;
        _filterPrinter = _;
        return _chart;
    };

    _chart.turnOnControls = function () {
        _chart.selectAll(".reset").style("display", null);
        _chart.selectAll(".filter").text(_filterPrinter(_chart.filter())).style("display", null);
        return _chart;
    };

    _chart.turnOffControls = function () {
        _chart.selectAll(".reset").style("display", "none");
        _chart.selectAll(".filter").style("display", "none").text(_chart.filter());
        return _chart;
    };

    _chart.transitionDuration = function (d) {
        if (!arguments.length) return _transitionDuration;
        _transitionDuration = d;
        return _chart;
    };

    _chart.render = function () {
        _listeners.preRender(_chart);

        if (_dimension == null)
            throw new dc.errors.InvalidStateException("Mandatory attribute chart.dimension is missing on chart["
                + _chart.anchor() + "]");

        if (_group == null)
            throw new dc.errors.InvalidStateException("Mandatory attribute chart.group is missing on chart["
                + _chart.anchor() + "]");

        var result = _chart.doRender();


        if (_chart.transitionDuration() > 0) {
            setTimeout(function () {
                _chart.invokeRenderlet(_chart);
                _listeners.postRender(_chart);
            }, _chart.transitionDuration());
        } else {
            _chart.invokeRenderlet(_chart);
            _listeners.postRender(_chart);
        }

        return result;
    };

    _chart.redraw = function () {
        _listeners.preRedraw(_chart);

        var result = _chart.doRedraw();

        _chart.invokeRenderlet(_chart);

        _listeners.postRedraw(_chart);

        return result;
    };

    _chart.invokeFilteredListener = function (chart, f) {
        if (f !== undefined) _listeners.filtered(_chart, f);
    };

    // abstract function stub
    _chart.filter = function (f) {
        // do nothing in base, should be overridden by sub-function
        _chart.invokeFilteredListener(_chart, f);
        return _chart;
    };

    _chart.doRender = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart.doRedraw = function () {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart.keyAccessor = function (_) {
        if (!arguments.length) return _keyAccessor;
        _keyAccessor = _;
        return _chart;
    };

    _chart.valueAccessor = function (_) {
        if (!arguments.length) return _valueAccessor;
        _valueAccessor = _;
        return _chart;
    };

    _chart.label = function (_) {
        if (!arguments.length) return _label;
        _label = _;
        _renderLabel = true;
        return _chart;
    };

    _chart.renderLabel = function (_) {
        if (!arguments.length) return _renderLabel;
        _renderLabel = _;
        return _chart;
    };

    _chart.title = function (_) {
        if (!arguments.length) return _title;
        _title = _;
        _renderTitle = true;
        return _chart;
    };

    _chart.renderTitle = function (_) {
        if (!arguments.length) return _renderTitle;
        _renderTitle = _;
        return _chart;
    };

    _chart.renderlet = function (_) {
        _renderlets.push(_);
        return _chart;
    };

    _chart.invokeRenderlet = function (chart) {
        for (var i = 0; i < _renderlets.length; ++i) {
            _renderlets[i](chart);
        }
    };

    _chart.chartGroup = function (_) {
        if (!arguments.length) return _chartGroup;
        _chartGroup = _;
        return _chart;
    };

    _chart.on = function (event, listener) {
        _listeners[event] = listener;
        return _chart;
    };

    return _chart;
};
dc.coordinateGridChart = function (_chart) {
    var DEFAULT_Y_AXIS_TICKS = 5;
    var GRID_LINE_CLASS = "grid-line";
    var HORIZONTAL_CLASS = "horizontal";
    var VERTICAL_CLASS = "vertical";

    _chart = dc.baseChart(_chart);

    var _margin = {top: 10, right: 50, bottom: 30, left: 30};

    var _parent;
    var _g;
    var _chartBodyG;

    var _x;
    var _xOriginalDomain;
    var _xAxis = d3.svg.axis();
    var _xUnits = dc.units.integers;
    var _xAxisPadding = 0;
    var _xElasticity = false;

    var _y;
    var _yAxis = d3.svg.axis();
    var _yAxisPadding = 0;
    var _yElasticity = false;

    var _filter;
    var _brush = d3.svg.brush();
    var _brushOn = true;
    var _round;

    var _renderHorizontalGridLine = false;
    var _renderVerticalGridLine = false;

    var _refocused = false;
    var _unitCount;

    _chart.generateG = function (parent) {
        if (parent == null)
            _parent = _chart.svg();
        else
            _parent = parent;

        _g = _parent.append("g");

        _chartBodyG = _g.append("g").attr("class", "chartBody")
            .attr("clip-path", "url(#" + getClipPathId() + ")");

        return _g;
    };

    _chart.g = function (_) {
        if (!arguments.length) return _g;
        _g = _;
        return _chart;
    };

    _chart.chartBodyG = function (_) {
        if (!arguments.length) return _chartBodyG;
        _chartBodyG = _;
        return _chart;
    };

    _chart.margins = function (m) {
        if (!arguments.length) return _margin;
        _margin = m;
        return _chart;
    };

    _chart.x = function (_) {
        if (!arguments.length) return _x;
        _x = _;
        _xOriginalDomain = _x.domain();
        return _chart;
    };

    _chart.xOriginalDomain = function () {
        return _xOriginalDomain;
    };

    _chart.xUnits = function (_) {
        if (!arguments.length) return _xUnits;
        _xUnits = _;
        return _chart;
    };

    _chart.xAxis = function (_) {
        if (!arguments.length) return _xAxis;
        _xAxis = _;
        return _chart;
    };

    _chart.elasticX = function (_) {
        if (!arguments.length) return _xElasticity;
        _xElasticity = _;
        return _chart;
    };

    _chart.xAxisPadding = function (_) {
        if (!arguments.length) return _xAxisPadding;
        _xAxisPadding = _;
        return _chart;
    };

    _chart.xUnitCount = function () {
        if (_unitCount == null || _chart.refocused()) {
            var units = _chart.xUnits()(_chart.x().domain()[0], _chart.x().domain()[1], _chart.x().domain());

            if (units instanceof Array)
                _unitCount = units.length;
            else
                _unitCount = units;
        }

        return _unitCount;
    };

    _chart.isOrdinal = function () {
        return _chart.xUnits() === dc.units.ordinal;
    };

    _chart.prepareOrdinalXAxis = function (count) {
        if (!count)
            count = _chart.xUnitCount();
        var range = [];
        var currentPosition = 0;
        var increment = _chart.xAxisLength() / count;
        for (var i = 0; i < count; i++) {
            range[i] = currentPosition;
            currentPosition += increment;
        }
        _x.range(range);
    };

    function prepareXAxis(g) {
        if (_chart.elasticX() && !_chart.isOrdinal()) {
            _x.domain([_chart.xAxisMin(), _chart.xAxisMax()]);
        }

        if (_chart.isOrdinal()) {
            _chart.prepareOrdinalXAxis();
        } else {
            _x.range([0, _chart.xAxisLength()]);
        }

        _xAxis = _xAxis.scale(_chart.x()).orient("bottom");

        renderVerticalGridLines(g);
    }

    _chart.renderXAxis = function (g) {
        var axisXG = g.selectAll("g.x");

        if (axisXG.empty())
            axisXG = g.append("g")
                .attr("class", "axis x")
                .attr("transform", "translate(" + _chart.margins().left + "," + _chart.xAxisY() + ")");

        dc.transition(axisXG, _chart.transitionDuration())
            .call(_xAxis);
    };

    function renderVerticalGridLines(g) {
        if (_renderVerticalGridLine) {
            var gridLineG = g.selectAll("g." + VERTICAL_CLASS);

            if (gridLineG.empty())
                gridLineG = g.insert("g", ":first-child")
                    .attr("class", GRID_LINE_CLASS + " " + VERTICAL_CLASS)
                    .attr("transform", "translate(" + _chart.yAxisX() + "," + _chart.margins().top + ")");

            var ticks = _xAxis.tickValues() ? _xAxis.tickValues() : _x.ticks(_xAxis.ticks()[0]);

            var lines = gridLineG.selectAll("line")
                .data(ticks);

            // enter
            var linesGEnter = lines.enter()
                .append("line")
                .attr("x1", function (d) {
                    return _x(d);
                })
                .attr("y1", _chart.xAxisY() - _chart.margins().top)
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
                .attr("y1", _chart.xAxisY() - _chart.margins().top)
                .attr("x2", function (d) {
                    return _x(d);
                })
                .attr("y2", 0);

            // exit
            lines.exit().remove();
        }
    }

    _chart.xAxisY = function () {
        return (_chart.height() - _chart.margins().bottom);
    };

    _chart.xAxisLength = function () {
        return _chart.width() - _chart.margins().left - _chart.margins().right;
    };

    function prepareYAxis(g) {
        if (_y == null || _chart.elasticY()) {
            _y = d3.scale.linear();
            _y.domain([_chart.yAxisMin(), _chart.yAxisMax()]).rangeRound([_chart.yAxisHeight(), 0]);
        }

        _y.range([_chart.yAxisHeight(), 0]);
        _yAxis = _yAxis.scale(_y).orient("left").ticks(DEFAULT_Y_AXIS_TICKS);

        renderHorizontalGridLines(g);
    }

    _chart.renderYAxis = function (g) {
        var axisYG = g.selectAll("g.y");
        if (axisYG.empty())
            axisYG = g.append("g")
                .attr("class", "axis y")
                .attr("transform", "translate(" + _chart.yAxisX() + "," + _chart.margins().top + ")");

        dc.transition(axisYG, _chart.transitionDuration())
            .call(_yAxis);
    };

    function renderHorizontalGridLines(g) {
        if (_renderHorizontalGridLine) {
            var gridLineG = g.selectAll("g." + HORIZONTAL_CLASS);

            var ticks = _yAxis.tickValues() ? _yAxis.tickValues() : _y.ticks(_yAxis.ticks()[0]);

            if (gridLineG.empty())
                gridLineG = g.insert("g", ":first-child")
                    .attr("class", GRID_LINE_CLASS + " " + HORIZONTAL_CLASS)
                    .attr("transform", "translate(" + _chart.yAxisX() + "," + _chart.margins().top + ")");

            var lines = gridLineG.selectAll("line")
                .data(ticks);

            // enter
            var linesGEnter = lines.enter()
                .append("line")
                .attr("x1", 1)
                .attr("y1", function (d) {
                    return _y(d);
                })
                .attr("x2", _chart.xAxisLength())
                .attr("y2", function (d) {
                    return _y(d);
                })
                .attr("opacity", 0);
            dc.transition(linesGEnter, _chart.transitionDuration())
                .attr("opacity", 1);

            // update
            dc.transition(lines, _chart.transitionDuration())
                .attr("x1", 1)
                .attr("y1", function (d) {
                    return _y(d);
                })
                .attr("x2", _chart.xAxisLength())
                .attr("y2", function (d) {
                    return _y(d);
                });

            // exit
            lines.exit().remove();
        }
    }

    _chart.yAxisX = function () {
        return _chart.margins().left;
    };

    _chart.y = function (_) {
        if (!arguments.length) return _y;
        _y = _;
        return _chart;
    };

    _chart.yAxis = function (y) {
        if (!arguments.length) return _yAxis;
        _yAxis = y;
        return _chart;
    };

    _chart.elasticY = function (_) {
        if (!arguments.length) return _yElasticity;
        _yElasticity = _;
        return _chart;
    };

    _chart.renderHorizontalGridLines = function (_) {
        if (!arguments.length) return _renderHorizontalGridLine;
        _renderHorizontalGridLine = _;
        return _chart;
    };

    _chart.renderVerticalGridLines = function (_) {
        if (!arguments.length) return _renderVerticalGridLine;
        _renderVerticalGridLine = _;
        return _chart;
    };

    _chart.xAxisMin = function () {
        var min = d3.min(_chart.group().all(), function (e) {
            return _chart.keyAccessor()(e);
        });
        return dc.utils.subtract(min, _xAxisPadding);
    };

    _chart.xAxisMax = function () {
        var max = d3.max(_chart.group().all(), function (e) {
            return _chart.keyAccessor()(e);
        });
        return dc.utils.add(max, _xAxisPadding);
    };

    _chart.yAxisMin = function () {
        var min = d3.min(_chart.group().all(), function (e) {
            return _chart.valueAccessor()(e);
        });
        min = dc.utils.subtract(min, _yAxisPadding);
        return min;
    };

    _chart.yAxisMax = function () {
        var max = d3.max(_chart.group().all(), function (e) {
            return _chart.valueAccessor()(e);
        });
        max = dc.utils.add(max, _yAxisPadding);
        return max;
    };

    _chart.yAxisPadding = function (_) {
        if (!arguments.length) return _yAxisPadding;
        _yAxisPadding = _;
        return _chart;
    };

    _chart.yAxisHeight = function () {
        return _chart.height() - _chart.margins().top - _chart.margins().bottom;
    };

    _chart.round = function (_) {
        if (!arguments.length) return _round;
        _round = _;
        return _chart;
    };

    _chart.filter = function (_) {
        if (!arguments.length) return _filter;

        if (_) {
            _filter = _;
            _chart.brush().extent(_);
            _chart.dimension().filter(_);
            _chart.turnOnControls();
        } else {
            _filter = null;
            _chart.brush().clear();
            _chart.dimension().filterAll();
            _chart.turnOffControls();
        }

        _chart.invokeFilteredListener(_chart, _);

        return _chart;
    };

    _chart.brush = function (_) {
        if (!arguments.length) return _brush;
        _brush = _;
        return _chart;
    };

    function brushHeight() {
        return _chart.xAxisY() - _chart.margins().top;
    }

    _chart.renderBrush = function (g) {
        if (_chart.isOrdinal())
            _brushOn = false;

        if (_brushOn) {
            _brush.on("brushstart", brushStart)
                .on("brush", brushing)
                .on("brushend", brushEnd);

            var gBrush = g.append("g")
                .attr("class", "brush")
                .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")")
                .call(_brush.x(_chart.x()));
            gBrush.selectAll("rect").attr("height", brushHeight());
            gBrush.selectAll(".resize").append("path").attr("d", _chart.resizeHandlePath);

            if (_filter) {
                _chart.redrawBrush(g);
            }
        }
    };

    function brushStart(p) {
    }

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

    function brushing(p) {
        var extent = _chart.extendBrush();

        _chart.redrawBrush(_g);

        if (_chart.brushIsEmpty(extent)) {
            dc.events.trigger(function () {
                _chart.filter(null);
                dc.redrawAll(_chart.chartGroup());
            });
        } else {
            dc.events.trigger(function () {
                _chart.filter([extent[0], extent[1]]);
                dc.redrawAll(_chart.chartGroup());
            }, dc.constants.EVENT_DELAY);
        }
    }

    function brushEnd(p) {
    }

    _chart.redrawBrush = function (g) {
        if (_brushOn) {
            if (_chart.filter() && _chart.brush().empty())
                _chart.brush().extent(_chart.filter());

            var gBrush = g.select("g.brush");
            gBrush.call(_chart.brush().x(_chart.x()));
            gBrush.selectAll("rect").attr("height", brushHeight());
        }

        _chart.fadeDeselectedArea();
    };

    _chart.fadeDeselectedArea = function () {
        // do nothing, sub-chart should override this function
    };

    // borrowed from Crossfilter example
    _chart.resizeHandlePath = function (d) {
        var e = +(d == "e"), x = e ? 1 : -1, y = brushHeight() / 3;
        return "M" + (.5 * x) + "," + y
            + "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
            + "V" + (2 * y - 6)
            + "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
            + "Z"
            + "M" + (2.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8)
            + "M" + (4.5 * x) + "," + (y + 8)
            + "V" + (2 * y - 8);
    };

    function getClipPathId() {
        return _chart.anchor().replace('#', '') + "-clip";
    }

    function generateClipPath() {
        var defs = dc.utils.appendOrSelect(_parent, "defs");

        var chartBodyClip = dc.utils.appendOrSelect(defs, "clipPath").attr("id", getClipPathId());

        dc.utils.appendOrSelect(chartBodyClip, "rect")
            .attr("x", _chart.margins().left)
            .attr("y", _chart.margins().top)
            .attr("width", _chart.xAxisLength())
            .attr("height", _chart.yAxisHeight());
    }

    _chart.doRender = function () {
        if (_x == null)
            throw new dc.errors.InvalidStateException("Mandatory attribute chart.x is missing on chart["
                + _chart.anchor() + "]");

        _chart.resetSvg();

        if (_chart.dataSet()) {
            _chart.generateG();

            generateClipPath();
            prepareXAxis(_chart.g());
            prepareYAxis(_chart.g());

            _chart.plotData();

            _chart.renderXAxis(_chart.g());
            _chart.renderYAxis(_chart.g());

            _chart.renderBrush(_chart.g());
        }

        return _chart;
    };

    _chart.doRedraw = function () {
        prepareXAxis(_chart.g());
        prepareYAxis(_chart.g());

        _chart.plotData();

        if (_chart.elasticY())
            _chart.renderYAxis(_chart.g());

        if (_chart.elasticX() || _refocused)
            _chart.renderXAxis(_chart.g());

        _chart.redrawBrush(_chart.g());

        return _chart;
    };

    _chart.subRender = function () {
        if (_chart.dataSet()) {
            _chart.plotData();
        }

        return _chart;
    };

    _chart.brushOn = function (_) {
        if (!arguments.length) return _brushOn;
        _brushOn = _;
        return _chart;
    };

    _chart.getDataWithinXDomain = function (group) {
        var data = [];

        if (_chart.isOrdinal()) {
            data = group.all();
        } else {
            group.all().forEach(function (d) {
                var key = _chart.keyAccessor()(d);
                if (key >= _chart.x().domain()[0] && key <= _chart.x().domain()[1])
                    data.push(d);
            });
        }

        return data;
    };

    function hasRangeSelected(range) {
        return range != null && range != undefined && range instanceof Array && range.length > 1;
    }

    _chart.focus = function (range) {
        _refocused = true;

        if (hasRangeSelected(range)) {
            _chart.x().domain(range);
        } else {
            _chart.x().domain(_chart.xOriginalDomain());
        }

        _chart.redraw();

        if (!hasRangeSelected(range))
            _refocused = false;
    };

    _chart.refocused = function () {
        return _refocused;
    };

    return _chart;
};
dc.colorChart = function(_chart) {
    var _colors = d3.scale.category20c();

    var _colorDomain = [0, _colors.range().length];

    var _colorCalculator = function(value) {
        var minValue = _colorDomain[0];
        var maxValue = _colorDomain[1];

        if (isNaN(value)) value = 0;
        if(maxValue == null) return _colors(value);

        var colorsLength = _chart.colors().range().length;
        var denominator = (maxValue - minValue) / colorsLength;
        var colorValue = Math.abs(Math.min(colorsLength - 1, Math.round((value - minValue) / denominator)));
        return _chart.colors()(colorValue);
    };

    var _colorAccessor = function(d, i){return i;};

    _chart.colors = function(_) {
        if (!arguments.length) return _colors;

        if (_ instanceof Array) {
            _colors = d3.scale.ordinal().range(_);
            var domain = [];
            for(var i = 0; i < _.length; ++i){
                domain.push(i);
            }
            _colors.domain(domain);
        } else {
            _colors = _;
        }

        _colorDomain = [0, _colors.range().length];

        return _chart;
    };

    _chart.colorCalculator = function(_){
        if(!arguments.length) return _colorCalculator;
        _colorCalculator = _;
        return _chart;
    };

    _chart.getColor = function(d, i){
        return _colorCalculator(_colorAccessor(d, i));
    };

    _chart.colorAccessor = function(_){
        if(!arguments.length) return _colorAccessor;
        _colorAccessor = _;
        return _chart;
    };

    _chart.colorDomain = function(_){
        if(!arguments.length) return _colorDomain;
        _colorDomain = _;
        return _chart;
    };

    return _chart;
};
dc.singleSelectionChart = function(_chart) {
    var _filter;
    var _filterHandler = function(dimension, filter){
        dimension.filter(filter);
        return filter;
    };

    _chart.hasFilter = function() {
        return _filter != null;
    };

    _chart.filter = function(_) {
        if (!arguments.length) return _filter;

        _filter = _;

        if (_chart.dataSet() && _chart.dimension().filter != undefined){
            var f = _filterHandler(_chart.dimension(), _filter);
            _filter = f?f:_filter;
        }

        if (_) {
            _chart.turnOnControls();
        } else {
            _chart.turnOffControls();
        }

        _chart.invokeFilteredListener(_chart, _);

        return _chart;
    };

    _chart.highlightSelected = function(e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, true);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    };

    _chart.fadeDeselected = function(e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, true);
    };

    _chart.resetHighlight = function(e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    };

    _chart.onClick = function(d) {
        var toFilter = _chart.keyAccessor()(d);
        dc.events.trigger(function() {
            _chart.filterTo(toFilter == _chart.filter() ? null : toFilter);
        });
    };

    _chart.filterTo = function(toFilter) {
        _chart.filter(toFilter);
        dc.redrawAll(_chart.chartGroup());
    };

    _chart.filterHandler = function(_){
        if(!arguments.length) return _filterHandler;
        _filterHandler = _;
        return _chart;
    };

    return _chart;
};
dc.stackableChart = function (_chart) {
    var MIN_DATA_POINT_HEIGHT = 0;

    var _groupStack = new dc.utils.GroupStack();
    var _allGroups;
    var _allValueAccessors;
    var _allKeyAccessors;

    _chart.stack = function (group, retriever) {
        _groupStack.setDefaultAccessor(_chart.valueAccessor());
        _groupStack.addGroup(group, retriever);

        expireCache();

        return _chart;
    };

    function expireCache() {
        _allGroups = null;
        _allValueAccessors = null;
        _allKeyAccessors = null;
    }

    _chart.allGroups = function () {
        if (_allGroups == null) {
            _allGroups = [];

            _allGroups.push(_chart.group());

            for (var i = 0; i < _groupStack.size(); ++i)
                _allGroups.push(_groupStack.getGroupByIndex(i));
        }

        return _allGroups;
    };

    _chart.allValueAccessors = function () {
        if (_allValueAccessors == null) {
            _allValueAccessors = [];

            _allValueAccessors.push(_chart.valueAccessor());

            for (var i = 0; i < _groupStack.size(); ++i)
                _allValueAccessors.push(_groupStack.getAccessorByIndex(i));
        }

        return _allValueAccessors;
    };

    _chart.getValueAccessorByIndex = function (groupIndex) {
        return _chart.allValueAccessors()[groupIndex];
    };

    _chart.yAxisMin = function () {
        var min = 0;
        var allGroups = _chart.allGroups();

        for (var groupIndex = 0; groupIndex < allGroups.length; ++groupIndex) {
            var group = allGroups[groupIndex];
            var m = dc.utils.groupMin(group, _chart.getValueAccessorByIndex(groupIndex));
            if (m < min) min = m;
        }

        if (min < 0) {
            min = 0;
            for (var groupIndex = 0; groupIndex < allGroups.length; ++groupIndex) {
                var group = allGroups[groupIndex];
                min += dc.utils.groupMin(group, _chart.getValueAccessorByIndex(groupIndex));
            }
        }

        min = dc.utils.subtract(min, _chart.yAxisPadding());

        return min;
    };

    _chart.yAxisMax = function () {
        var max = 0;
        var allGroups = _chart.allGroups();

        for (var groupIndex = 0; groupIndex < allGroups.length; ++groupIndex) {
            var group = allGroups[groupIndex];
            max += dc.utils.groupMax(group, _chart.getValueAccessorByIndex(groupIndex));
        }

        max = dc.utils.add(max, _chart.yAxisPadding());

        return max;
    };

    _chart.allKeyAccessors = function () {
        if (_allKeyAccessors == null) {
            _allKeyAccessors = [];

            _allKeyAccessors.push(_chart.keyAccessor());

            for (var i = 0; i < _groupStack.size(); ++i)
                _allKeyAccessors.push(_chart.keyAccessor());
        }

        return _allKeyAccessors;
    };

    _chart.getKeyAccessorByIndex = function (groupIndex) {
        return _chart.allKeyAccessors()[groupIndex];
    };

    _chart.xAxisMin = function () {
        var min = null;
        var allGroups = _chart.allGroups();

        for (var groupIndex = 0; groupIndex < allGroups.length; ++groupIndex) {
            var group = allGroups[groupIndex];
            var m = dc.utils.groupMin(group, _chart.getKeyAccessorByIndex(groupIndex));
            if (min == null || min > m) min = m;
        }

        return dc.utils.subtract(min, _chart.xAxisPadding());
    };

    _chart.xAxisMax = function () {
        var max = null;
        var allGroups = _chart.allGroups();

        for (var groupIndex = 0; groupIndex < allGroups.length; ++groupIndex) {
            var group = allGroups[groupIndex];
            var m = dc.utils.groupMax(group, _chart.getKeyAccessorByIndex(groupIndex));
            if (max == null || max < m) max = m;
        }

        return dc.utils.add(max, _chart.xAxisPadding());
    };

    _chart.baseLineY = function () {
        return _chart.y()(0);
    }

    _chart.dataPointBaseline = function () {
        return _chart.margins().top + _chart.baseLineY();
    };

    function getValueFromData(groupIndex, d) {
        return _chart.getValueAccessorByIndex(groupIndex)(d);
    }

    _chart.dataPointHeight = function (d, groupIndex) {
        var value = getValueFromData(groupIndex, d);
        var yPosition = _chart.y()(value);
        var zeroPosition = _chart.baseLineY();
        var h = 0;

        if (value > 0)
            h = zeroPosition - yPosition;
        else
            h = yPosition - zeroPosition;

        if (isNaN(h) || h < MIN_DATA_POINT_HEIGHT)
            h = MIN_DATA_POINT_HEIGHT;

        return h;
    };

    function calculateDataPointMatrix(data, groupIndex) {
        for (var dataIndex = 0; dataIndex < data.length; ++dataIndex) {
            var d = data[dataIndex];
            var value = getValueFromData(groupIndex, d);
            if (groupIndex == 0) {
                if (value > 0)
                    _groupStack.setDataPoint(groupIndex, dataIndex, _chart.dataPointBaseline() - _chart.dataPointHeight(d, groupIndex));
                else
                    _groupStack.setDataPoint(groupIndex, dataIndex, _chart.dataPointBaseline());
            } else {
                if (value > 0)
                    _groupStack.setDataPoint(groupIndex, dataIndex, _groupStack.getDataPoint(groupIndex - 1, dataIndex) - _chart.dataPointHeight(d, groupIndex))
                else if (value < 0)
                    _groupStack.setDataPoint(groupIndex, dataIndex, _groupStack.getDataPoint(groupIndex - 1, dataIndex) + _chart.dataPointHeight(d, groupIndex - 1))
                else // value == 0
                    _groupStack.setDataPoint(groupIndex, dataIndex, _groupStack.getDataPoint(groupIndex - 1, dataIndex))
            }
        }
    }

    _chart.calculateDataPointMatrixForAll = function (groups) {
        for (var groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
            var group = groups[groupIndex];
            var data = group.all();

            calculateDataPointMatrix(data, groupIndex);
        }
    };

    _chart.calculateDataPointMatrixWithinXDomain = function (groups) {
        for (var groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
            var group = groups[groupIndex];
            var data = _chart.getDataWithinXDomain(group);

            calculateDataPointMatrix(data, groupIndex);
        }
    };

    _chart.getChartStack = function () {
        return _groupStack;
    };

    dc.override(_chart, "valueAccessor", function (_) {
        if (!arguments.length) return _chart._valueAccessor();
        expireCache();
        return _chart._valueAccessor(_);
    });

    dc.override(_chart, "keyAccessor", function (_) {
        if (!arguments.length) return _chart._keyAccessor();
        expireCache();
        return _chart._keyAccessor(_);
    });

    return _chart;
};
dc.abstractBubbleChart = function (_chart) {
    var _maxBubbleRelativeSize = 0.3;
    var _minRadiusWithLabel = 10;

    _chart.BUBBLE_NODE_CLASS = "node";
    _chart.BUBBLE_CLASS = "bubble";
    _chart.MIN_RADIUS = 10;

    _chart = dc.singleSelectionChart(dc.colorChart(_chart));

    _chart.renderLabel(true);
    _chart.renderTitle(false);

    var _r = d3.scale.linear().domain([0, 100]);

    var _rValueAccessor = function (d) {
        return d.r;
    };

    _chart.r = function (_) {
        if (!arguments.length) return _r;
        _r = _;
        return _chart;
    };

    _chart.radiusValueAccessor = function (_) {
        if (!arguments.length) return _rValueAccessor;
        _rValueAccessor = _;
        return _chart;
    };

    _chart.rMin = function () {
        var min = d3.min(_chart.group().all(), function (e) {
            return _chart.radiusValueAccessor()(e);
        });
        return min;
    };

    _chart.rMax = function () {
        var max = d3.max(_chart.group().all(), function (e) {
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

    _chart.doRenderLabel = function (bubbleGEnter) {
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

    _chart.doRenderTitles = function (g) {
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

    _chart.minRadiusWithLabel = function (_) {
        if (!arguments.length) return _minRadiusWithLabel;
        _minRadiusWithLabel = _;
        return _chart;
    };

    _chart.maxBubbleRelativeSize = function (_) {
        if (!arguments.length) return _maxBubbleRelativeSize;
        _maxBubbleRelativeSize = _;
        return _chart;
    };

    _chart.initBubbleColor = function (d, i) {
        this[dc.constants.NODE_INDEX_NAME] = i;
        return _chart.getColor(d, i);
    };

    _chart.updateBubbleColor = function (d, i) {
        // a work around to get correct node index since
        // d3 does not send i correctly here
        return _chart.getColor(d, this[dc.constants.NODE_INDEX_NAME]);
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
        return _chart.filter() == d.key;
    };

    _chart.onClick = function (d) {
        var toFilter = d.key;
        if (toFilter == _chart.filter()) {
            dc.events.trigger(function () {
                _chart.filter(null);
                dc.redrawAll(_chart.chartGroup());
            });
        } else {
            dc.events.trigger(function () {
                _chart.filter(toFilter);
                dc.redrawAll(_chart.chartGroup());
            });
        }
    };

    return _chart;
};
dc.pieChart = function(parent, chartGroup) {
    var DEFAULT_MIN_ANGLE_FOR_LABEL = 0.5;

    var _sliceCssClass = "pie-slice";

    var _radius = 90, _innerRadius = 0;

    var _g;

    var _minAngleForLabel = DEFAULT_MIN_ANGLE_FOR_LABEL;

    var _chart = dc.singleSelectionChart(dc.colorChart(dc.baseChart({})));

    _chart.label(function(d) {
        return _chart.keyAccessor()(d.data);
    });

    _chart.renderLabel(true);

    _chart.title(function(d) {
        return _chart.keyAccessor()(d.data) + ": " + _chart.valueAccessor()(d.data);
    });

    _chart.transitionDuration(350);

    _chart.doRender = function() {
        _chart.resetSvg();

        _g = _chart.svg()
            .append("g")
            .attr("transform", "translate(" + _chart.cx() + "," + _chart.cy() + ")");

        drawChart();

        return _chart;
    };

    function drawChart() {
        if (_chart.dataSet()) {
            var pie = calculateDataPie();

            var arc = _chart.buildArcs();

            var pieData = pie(_chart.orderedGroup().top(Infinity));

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
            .attr("class", function(d, i) {
                return _sliceCssClass + " _" + i;
            });
        return slicesEnter;
    }

    function createSlicePath(slicesEnter, arc) {
        var slicePath = slicesEnter.append("path")
            .attr("fill", function(d, i) {
                return _chart.getColor(d, i);
            })
            .on("click", onClick)
            .attr("d", function(d, i) {
                return safeArc(d, i, arc);
            });
        slicePath.transition()
            .duration(_chart.transitionDuration())
            .attrTween("d", tweenPie);
    }

    function createTitles(slicesEnter) {
        if (_chart.renderTitle()) {
            slicesEnter.append("title").text(function(d) {
                return _chart.title()(d);
            });
        }
    }

    function createLabels(pieData, arc) {
        if (_chart.renderLabel()) {
            var labels = _g.selectAll("text." + _sliceCssClass)
                .data(pieData);

            var labelsEnter = labels
                .enter()
                .append("text")
                .attr("class", function(d, i) {
                    return _sliceCssClass + " _" + i;
                })
                .on("click", onClick);
            dc.transition(labelsEnter, _chart.transitionDuration())
                .attr("transform", function(d) {
                    d.innerRadius = _chart.innerRadius();
                    d.outerRadius = _radius;
                    var centroid = arc.centroid(d);
                    if (isNaN(centroid[0]) || isNaN(centroid[1])) {
                        return "translate(0,0)";
                    } else {
                        return "translate(" + centroid + ")";
                    }
                })
                .attr("text-anchor", "middle")
                .text(function(d) {
                    var data = d.data;
                    if (sliceHasNoData(data) || sliceTooSmall(d))
                        return "";
                    return _chart.label()(d);
                });
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
            .attr("d", function(d, i) {
                return safeArc(d, i, arc);
            });
        dc.transition(slicePaths, _chart.transitionDuration(),
            function(s) {
                s.attrTween("d", tweenPie);
            }).attr("fill", function(d, i) {
                return _chart.getColor(d, i);
            });
    }

    function updateLabels(pieData, arc) {
        if (_chart.renderLabel()) {
            var labels = _g.selectAll("text." + _sliceCssClass)
                .data(pieData);
            dc.transition(labels, _chart.transitionDuration())
                .attr("transform", function(d) {
                    d.innerRadius = _chart.innerRadius();
                    d.outerRadius = _radius;
                    var centroid = arc.centroid(d);
                    if (isNaN(centroid[0]) || isNaN(centroid[1])) {
                        return "translate(0,0)";
                    } else {
                        return "translate(" + centroid + ")";
                    }
                })
                .attr("text-anchor", "middle")
                .text(function(d) {
                    var data = d.data;
                    if (sliceHasNoData(data) || sliceTooSmall(d))
                        return "";
                    return _chart.label()(d);
                });
        }
    }

    function updateTitles(pieData) {
        if (_chart.renderTitle()) {
            _g.selectAll("g." + _sliceCssClass)
                .data(pieData)
                .select("title")
                .text(function(d) {
                    return _chart.title()(d);
                });
        }
    }

    function removeElements(slices) {
        slices.exit().remove();
    }

    function highlightFilter() {
        if (_chart.hasFilter()) {
            _chart.selectAll("g." + _sliceCssClass).each(function(d) {
                if (_chart.isSelectedSlice(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll("g." + _sliceCssClass).each(function(d) {
                _chart.resetHighlight(this);
            });
        }
    }

    _chart.innerRadius = function(r) {
        if (!arguments.length) return _innerRadius;
        _innerRadius = r;
        return _chart;
    };

    _chart.radius = function(r) {
        if (!arguments.length) return _radius;
        _radius = r;
        return _chart;
    };

    _chart.cx = function() {
        return _chart.width() / 2;
    };

    _chart.cy = function() {
        return _chart.height() / 2;
    };

    _chart.buildArcs = function() {
        return d3.svg.arc().outerRadius(_radius).innerRadius(_innerRadius);
    };

    _chart.isSelectedSlice = function(d) {
        return _chart.filter() == _chart.keyAccessor()(d.data);
    };

    _chart.doRedraw = function() {
        drawChart();
        return _chart;
    };

    _chart.minAngleForLabel = function(_) {
        if (!arguments.length) return _minAngleForLabel;
        _minAngleForLabel = _;
        return _chart;
    };

    function calculateDataPie() {
        return d3.layout.pie().sort(null).value(function(d) {
            return _chart.valueAccessor()(d);
        });
    }

    function sliceTooSmall(d) {
        var angle = (d.endAngle - d.startAngle);
        return isNaN(angle) || angle < _minAngleForLabel;
    }

    function sliceHasNoData(data) {
        return _chart.valueAccessor()(data) == 0;
    }

    function tweenPie(b) {
        b.innerRadius = _chart.innerRadius();
        var current = this._current;
        if (isOffCanvas(current))
            current = {startAngle: 0, endAngle: 0};
        var i = d3.interpolate(current, b);
        this._current = i(0);
        return function(t) {
            return safeArc(i(t), 0, _chart.buildArcs());
        };
    }

    function isOffCanvas(current) {
        return current == null || isNaN(current.startAngle) || isNaN(current.endAngle);
    }

    function onClick(d) {
        _chart.onClick(d.data);
    }

    function safeArc(d, i, arc) {
        var path = arc(d, i);
        if(path.indexOf("NaN") >= 0)
            path = "M0,0";
        return path;
    }

    return _chart.anchor(parent, chartGroup);
};
dc.barChart = function (parent, chartGroup) {
    var MIN_BAR_WIDTH = 1;
    var DEFAULT_GAP_BETWEEN_BARS = 2;

    var _chart = dc.stackableChart(dc.coordinateGridChart(dc.singleSelectionChart({})));

    var _gap = DEFAULT_GAP_BETWEEN_BARS;
    var _centerBar = false;

    var _numberOfBars;
    var _barWidth;

    _chart.plotData = function () {
        var groups = _chart.allGroups();

        _chart.calculateDataPointMatrixWithinXDomain(groups);

        for (var groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
            generateBarsPerGroup(groupIndex, groups[groupIndex]);
        }
    };

    function generateBarsPerGroup(groupIndex, group) {
        var bars = _chart.chartBodyG().selectAll("rect." + dc.constants.STACK_CLASS + groupIndex)
            .data(_chart.getDataWithinXDomain(group));

        addNewBars(bars, groupIndex);

        updateBars(bars, groupIndex);

        deleteBars(bars);
    }

    function addNewBars(bars, groupIndex) {
        var bars = bars.enter().append("rect");

        bars.attr("class", "bar " + dc.constants.STACK_CLASS + groupIndex)
            .attr("x", function (data, dataIndex) {
                return barX(this, data, groupIndex, dataIndex);
            })
            .attr("y", _chart.baseLineY())
            .attr("width", barWidth);

        if (_chart.isOrdinal())
            bars.on("click", _chart.onClick);

        if (_chart.renderTitle()) {
            bars.append("title").text(_chart.title());
        }

        dc.transition(bars, _chart.transitionDuration())
            .attr("y", function (data, dataIndex) {
                return barY(this, data, dataIndex);
            })
            .attr("height", function (data) {
                return _chart.dataPointHeight(data, getGroupIndexFromBar(this));
            });
    }

    function updateBars(bars, groupIndex) {
        if (_chart.renderTitle()) {
            bars.select("title").text(_chart.title());
        }

        dc.transition(bars, _chart.transitionDuration())
            .attr("x", function (data, dataIndex) {
                return barX(this, data, groupIndex, dataIndex);
            })
            .attr("y", function (data, dataIndex) {
                return barY(this, data, dataIndex);
            })
            .attr("height", function (data) {
                return _chart.dataPointHeight(data, getGroupIndexFromBar(this));
            })
            .attr("width", barWidth);
    }

    function deleteBars(bars) {
        dc.transition(bars.exit(), _chart.transitionDuration())
            .attr("y", _chart.xAxisY())
            .attr("height", 0);
    }

    function getNumberOfBars() {
        if (_numberOfBars == null || _chart.refocused()){
            _numberOfBars = _chart.xUnitCount();
        }
        return _numberOfBars;
    }

    function barWidth(d) {
        if (_barWidth == null || _chart.refocused()) {
            var numberOfBars = getNumberOfBars();
            var w = MIN_BAR_WIDTH;
            if (_chart.isOrdinal())
                w = Math.floor(_chart.xAxisLength() / (numberOfBars + 1));
            else
                w = Math.floor(_chart.xAxisLength() / numberOfBars);

            w -= _gap;

            if (isNaN(w) || w < MIN_BAR_WIDTH)
                w = MIN_BAR_WIDTH;

            _barWidth = w;
        }

        return _barWidth;
    }

    function setGroupIndexToBar(bar, groupIndex) {
        bar[dc.constants.GROUP_INDEX_NAME] = groupIndex;
    }

    function barX(bar, data, groupIndex, dataIndex) {
        setGroupIndexToBar(bar, groupIndex);
        var position = _chart.x()(_chart.keyAccessor()(data)) + _chart.margins().left;
        if (_centerBar)
            position = position - barWidth(data) / 2;
        return position;
    }

    function getGroupIndexFromBar(bar) {
        var groupIndex = bar[dc.constants.GROUP_INDEX_NAME];
        return groupIndex;
    }

    function barY(bar, data, dataIndex) {
        var groupIndex = getGroupIndexFromBar(bar);
        return _chart.getChartStack().getDataPoint(groupIndex, dataIndex);
    }

    _chart.fadeDeselectedArea = function () {
        var bars = _chart.chartBodyG().selectAll("rect.bar");
        var extent = _chart.brush().extent();

        if (_chart.isOrdinal()) {
            if (_chart.filter() != null)
                bars.classed(dc.constants.DESELECTED_CLASS, function (d) {
                    var key = _chart.keyAccessor()(d);
                    return key != _chart.filter();
                });
            else
                bars.classed(dc.constants.DESELECTED_CLASS, false);
        } else {
            if (!_chart.brushIsEmpty(extent)) {
                var start = extent[0];
                var end = extent[1];

                bars.classed(dc.constants.DESELECTED_CLASS, function (d) {
                    var xValue = _chart.keyAccessor()(d);
                    return xValue < start || xValue >= end;
                });
            } else {
                bars.classed(dc.constants.DESELECTED_CLASS, false);
            }
        }
    };

    _chart.centerBar = function (_) {
        if (!arguments.length) return _centerBar;
        _centerBar = _;
        return _chart;
    };

    _chart.gap = function (_) {
        if (!arguments.length) return _gap;
        _gap = _;
        return _chart;
    };

    _chart.extendBrush = function () {
        var extent = _chart.brush().extent();
        if (_chart.round() && !_centerBar) {
            extent[0] = extent.map(_chart.round())[0];
            extent[1] = extent.map(_chart.round())[1];

            _chart.chartBodyG().select(".brush")
                .call(_chart.brush().extent(extent));
        }
        return extent;
    };

    dc.override(_chart, "prepareOrdinalXAxis", function () {
        return this._prepareOrdinalXAxis(_chart.xUnitCount() + 1);
    });

    return _chart.anchor(parent, chartGroup);
};
dc.lineChart = function(parent, chartGroup) {
    var AREA_BOTTOM_PADDING = 1;
    var DEFAULT_DOT_RADIUS = 5;
    var TOOLTIP_G_CLASS = "dc-tooltip";
    var DOT_CIRCLE_CLASS = "dot";
    var Y_AXIS_REF_LINE_CLASS = "yRef";
    var X_AXIS_REF_LINE_CLASS = "xRef";

    var _chart = dc.stackableChart(dc.coordinateGridChart({}));
    var _renderArea = false;
    var _dotRadius = DEFAULT_DOT_RADIUS;

    _chart.transitionDuration(500);

    _chart.plotData = function() {
        var groups = _chart.allGroups();

        _chart.calculateDataPointMatrixForAll(groups);

        for (var groupIndex = 0; groupIndex < groups.length; ++ groupIndex) {
            var group = groups[groupIndex];
            plotDataByGroup(groupIndex, group);
        }
    };

    function plotDataByGroup(groupIndex, group) {
        var stackedCssClass = getStackedCssClass(groupIndex);

        var g = createGrouping(stackedCssClass, group);

        var line = drawLine(g, stackedCssClass, groupIndex);

        if (_renderArea)
            drawArea(g, stackedCssClass, groupIndex, line);

        if (_chart.renderTitle())
            drawDots(g, groupIndex);
    }

    function getStackedCssClass(groupIndex) {
        return dc.constants.STACK_CLASS + groupIndex;
    }

    function createGrouping(stackedCssClass, group) {
        var g = _chart.chartBodyG().select("g." + stackedCssClass);

        if (g.empty())
            g = _chart.chartBodyG().append("g").attr("class", stackedCssClass);

        g.datum(group.all());

        return g;
    }

    function drawLine(g, stackedCssClass, groupIndex) {
        var linePath = g.select("path.line");

        if (linePath.empty())
            linePath = g.append("path")
                .attr("class", "line " + stackedCssClass);

        linePath[0][0][dc.constants.GROUP_INDEX_NAME] = groupIndex;

        var line = d3.svg.line()
            .x(lineX)
            .y(function(d, dataIndex) {
                var groupIndex = this[dc.constants.GROUP_INDEX_NAME];
                return lineY(d, dataIndex, groupIndex);
            });

        dc.transition(linePath, _chart.transitionDuration(),
            function(t) {
                t.ease("linear");
            }).attr("d", line);

        return line;
    }

    var lineX = function(d) {
        return _chart.margins().left + _chart.x()(_chart.keyAccessor()(d));
    };

    var lineY = function(d, dataIndex, groupIndex) {
        var y = _chart.getChartStack().getDataPoint(groupIndex, dataIndex);
        if(y >= _chart.dataPointBaseline())
            y += _chart.dataPointHeight(d, groupIndex);
        return y;
    };

    function drawArea(g, stackedCssClass, groupIndex, line) {
        var areaPath = g.select("path.area");

        if (areaPath.empty())
            areaPath = g.append("path")
                .attr("class", "area " + stackedCssClass);

        areaPath[0][0][dc.constants.GROUP_INDEX_NAME] = groupIndex;

        var area = d3.svg.area()
            .x(line.x())
            .y1(line.y())
            .y0(function(d, dataIndex) {
                var groupIndex = this[dc.constants.GROUP_INDEX_NAME];

                if (groupIndex == 0)
                    return _chart.dataPointBaseline() - AREA_BOTTOM_PADDING;

                var y = _chart.getChartStack().getDataPoint(groupIndex-1, dataIndex);

                if(y < _chart.dataPointBaseline())
                    return y - AREA_BOTTOM_PADDING;
                else
                    return y + _chart.dataPointHeight(d, groupIndex-1);
            });

        dc.transition(areaPath, _chart.transitionDuration(),
            function(t) {
                t.ease("linear");
            }).attr("d", area);
    }

    _chart.renderArea = function(_) {
        if (!arguments.length) return _renderArea;
        _renderArea = _;
        return _chart;
    };

    function drawDots(parentG, groupIndex) {
        var g = parentG.select("g." + TOOLTIP_G_CLASS);

        if (g.empty())
            g = parentG.append("g").attr("class", TOOLTIP_G_CLASS);

        createRefLines(g);

        var dots = g.selectAll("circle." + DOT_CIRCLE_CLASS)
            .data(g.datum());

        dots.enter()
            .append("circle")
            .attr("class", DOT_CIRCLE_CLASS)
            .attr("r", _dotRadius)
            .style("fill-opacity", 1e-6)
            .style("stroke-opacity", 1e-6)
            .on("mousemove", function(d) {
                var dot = d3.select(this);
                showDot(dot);
                showRefLines(dot, g);
            })
            .on("mouseout", function(d) {
                var dot = d3.select(this);
                hideDot(dot);
                hideRefLines(g);
            })
            .append("title").text(_chart.title());

        dots.attr("cx", lineX)
            .attr("cy", function(d, dataIndex) {
                return lineY(d, dataIndex, groupIndex);
            })
            .select("title").text(_chart.title());

        dots.exit().remove();
    }

    function createRefLines(g) {
        var yRefLine = g.select("path." + Y_AXIS_REF_LINE_CLASS).empty() ? g.append("path").attr("class", Y_AXIS_REF_LINE_CLASS) : g.select("path." + Y_AXIS_REF_LINE_CLASS);
        yRefLine.style("display", "none").attr("stroke-dasharray", "5,5");

        var xRefLine = g.select("path." + X_AXIS_REF_LINE_CLASS).empty() ? g.append("path").attr("class", X_AXIS_REF_LINE_CLASS) : g.select("path." + X_AXIS_REF_LINE_CLASS);
        xRefLine.style("display", "none").attr("stroke-dasharray", "5,5");
    }

    function showDot(dot) {
        dot.style("fill-opacity", .8);
        dot.style("stroke-opacity", .8);
        return dot;
    }

    function showRefLines(dot, g) {
        var x = dot.attr("cx");
        var y = dot.attr("cy");
        g.select("path." + Y_AXIS_REF_LINE_CLASS).style("display", "").attr("d", "M" + _chart.margins().left + " " + y + "L" + (x) + " " + (y));
        g.select("path." + X_AXIS_REF_LINE_CLASS).style("display", "").attr("d", "M" + x + " " + (_chart.height() - _chart.margins().bottom) + "L" + x + " " + y);
    }

    function hideDot(dot) {
        dot.style("fill-opacity", 1e-6).style("stroke-opacity", 1e-6);
    }

    function hideRefLines(g) {
        g.select("path." + Y_AXIS_REF_LINE_CLASS).style("display", "none");
        g.select("path." + X_AXIS_REF_LINE_CLASS).style("display", "none");
    }

    _chart.dotRadius = function(_) {
        if (!arguments.length) return _dotRadius;
        _dotRadius = _;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};
dc.dataCount = function(parent, chartGroup) {
    var _formatNumber = d3.format(",d");
    var _chart = dc.baseChart({});

    _chart.doRender = function() {
        _chart.selectAll(".total-count").text(_formatNumber(_chart.dimension().size()));
        _chart.selectAll(".filter-count").text(_formatNumber(_chart.group().value()));

        return _chart;
    };

    _chart.doRedraw = function(){
        return _chart.doRender();
    };

    return _chart.anchor(parent, chartGroup);
};
dc.dataTable = function(parent, chartGroup) {
    var LABEL_CSS_CLASS = "dc-table-label";
    var ROW_CSS_CLASS = "dc-table-row";
    var COLUMN_CSS_CLASS = "dc-table-column";
    var GROUP_CSS_CLASS = "dc-table-group";

    var _chart = dc.baseChart({});

    var _size = 25;
    var _columns = [];
    var _sortBy = function(d) {
        return d;
    };
    var _order = d3.ascending;
    var _sort;

    _chart.doRender = function() {
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
        if (!_sort)
            _sort = crossfilter.quicksort.by(_sortBy);

        var entries = _chart.dimension().top(_size);

        return d3.nest()
            .key(_chart.group())
            .sortKeys(_order)
            .entries(_sort(entries, 0, entries.length));
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

        for (var i = 0; i < _columns.length; ++i) {
            var f = _columns[i];
            rowEnter.append("td")
                .attr("class", COLUMN_CSS_CLASS + " _" + i)
                .html(function(d) {
                    return f(d);
                });
        }

        rows.exit().remove();

        return rows;
    }

    _chart.doRedraw = function() {
        return _chart.doRender();
    };

    _chart.size = function(s) {
        if (!arguments.length) return _size;
        _size = s;
        return _chart;
    };

    _chart.columns = function(_) {
        if (!arguments.length) return _columns;
        _columns = _;
        return _chart;
    };

    _chart.sortBy = function(_) {
        if (!arguments.length) return _sortBy;
        _sortBy = _;
        return _chart;
    };

    _chart.order = function(_) {
        if (!arguments.length) return _order;
        _order = _;
        return _chart;
    };

    return _chart.anchor(parent, chartGroup);
};
dc.bubbleChart = function(parent, chartGroup) {
    var _chart = dc.abstractBubbleChart(dc.coordinateGridChart({}));

    var _elasticRadius = false;

    _chart.transitionDuration(750);

    var bubbleLocator = function(d) {
        return "translate(" + (bubbleX(d)) + "," + (bubbleY(d)) + ")";
    };

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
            .data(_chart.group().all());

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
            .attr("fill", _chart.initBubbleColor)
            .attr("r", 0);
        dc.transition(bubbleG, _chart.transitionDuration())
            .attr("r", function(d) {
                return _chart.bubbleR(d);
            })
            .attr("opacity", function(d) {
                return (_chart.bubbleR(d) > 0) ? 1 : 0;
            });

        _chart.doRenderLabel(bubbleGEnter);

        _chart.doRenderTitles(bubbleGEnter);
    }

    function updateNodes(bubbleG) {
        dc.transition(bubbleG, _chart.transitionDuration())
            .attr("transform", bubbleLocator)
            .selectAll("circle." + _chart.BUBBLE_CLASS)
            .attr("fill", _chart.updateBubbleColor)
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
        var x = _chart.x()(_chart.keyAccessor()(d)) + _chart.margins().left;
        if (isNaN(x))
            x = 0;
        return x;
    }

    function bubbleY(d) {
        var y = _chart.margins().top + _chart.y()(_chart.valueAccessor()(d));
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
dc.compositeChart = function(parent, chartGroup) {
    var SUB_CHART_CLASS = "sub";

    var _chart = dc.coordinateGridChart({});
    var _children = [];

    _chart.transitionDuration(500);

    dc.override(_chart, "generateG", function() {
        var g = this._generateG();

        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];

            generateChildG(child, i);

            if (child.dimension() == null) child.dimension(_chart.dimension());
            if (child.group() == null) child.group(_chart.group());
            child.chartGroup(_chart.chartGroup());
            child.svg(_chart.svg());
            child.height(_chart.height());
            child.width(_chart.width());
            child.margins(_chart.margins());
            child.xUnits(_chart.xUnits());
            child.transitionDuration(_chart.transitionDuration());
        }

        return g;
    });

    function generateChildG(child, i) {
        child.generateG(_chart.g());
        child.g().attr("class", SUB_CHART_CLASS + " _" + i);
    }

    _chart.plotData = function() {
        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];

            if (child.g() == null) {
                generateChildG(child, i);
            }

            child.x(_chart.x());
            child.y(_chart.y());
            child.xAxis(_chart.xAxis());
            child.yAxis(_chart.yAxis());

            child.plotData();

            child.invokeRenderlet(child);
        }
    };

    _chart.fadeDeselectedArea = function() {
        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];
            child.brush(_chart.brush());
            child.fadeDeselectedArea();
        }
    };

    _chart.compose = function(charts) {
        _children = charts;
        return _chart;
    };

    _chart.children = function(){
        return _children;
    };

    function getAllYAxisMinFromChildCharts() {
        var allMins = [];
        for (var i = 0; i < _children.length; ++i) {
            allMins.push(_children[i].yAxisMin());
        }
        return allMins;
    }

    _chart.yAxisMin = function() {
        return d3.min(getAllYAxisMinFromChildCharts());
    };

    function getAllYAxisMaxFromChildCharts() {
        var allMaxes = [];
        for (var i = 0; i < _children.length; ++i) {
            allMaxes.push(_children[i].yAxisMax());
        }
        return allMaxes;
    }

    _chart.yAxisMax = function() {
        return dc.utils.add(d3.max(getAllYAxisMaxFromChildCharts()), _chart.yAxisPadding());
    };

    function getAllXAxisMinFromChildCharts() {
        var allMins = [];
        for (var i = 0; i < _children.length; ++i) {
            allMins.push(_children[i].xAxisMin());
        }
        return allMins;
    }

    _chart.xAxisMin = function() {
        return dc.utils.subtract(d3.min(getAllXAxisMinFromChildCharts()), _chart.xAxisPadding());
    };

    function getAllXAxisMaxFromChildCharts() {
        var allMaxes = [];
        for (var i = 0; i < _children.length; ++i) {
            allMaxes.push(_children[i].xAxisMax());
        }
        return allMaxes;
    }

    _chart.xAxisMax = function() {
        return dc.utils.add(d3.max(getAllXAxisMaxFromChildCharts()), _chart.xAxisPadding());
    };

    return _chart.anchor(parent, chartGroup);
};
dc.geoChoroplethChart = function (parent, chartGroup) {
    var _chart = dc.singleSelectionChart(dc.colorChart(dc.baseChart({})));

    _chart.colorAccessor(function (d, i) {
        return d;
    });

    var _geoPath = d3.geo.path();

    var _geoJsons = [];

    _chart.doRender = function () {
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
    };

    function plotData(layerIndex) {
        var maxValue = dc.utils.groupMax(_chart.group(), _chart.valueAccessor());
        var data = generateLayeredData();

        if (isDataLayer(layerIndex)) {
            var regionG = renderRegionG(layerIndex);

            renderPaths(regionG, layerIndex, data, maxValue);

            renderTitle(regionG, layerIndex, data);
        }
    }

    function generateLayeredData() {
        var data = {};
        var groupAll = _chart.group().all();
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
        return _chart.hasFilter() && _chart.filter() == getKey(layerIndex, d);
    }

    function isDeselected(layerIndex, d) {
        return _chart.hasFilter() && _chart.filter() != getKey(layerIndex, d);
    }

    function getKey(layerIndex, d) {
        return geoJson(layerIndex).keyAccessor(d);
    }

    function geoJson(index) {
        return _geoJsons[index];
    }

    function renderPaths(regionG, layerIndex, data, maxValue) {
        var paths = regionG
            .select("path")
            .attr("fill", function (d) {
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
        if (selectedRegion == _chart.filter()) {
            dc.events.trigger(function () {
                _chart.filter(null);
                dc.redrawAll(_chart.chartGroup());
            });
        } else {
            dc.events.trigger(function () {
                _chart.filter(selectedRegion);
                dc.redrawAll(_chart.chartGroup());
            });
        }
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

    _chart.doRedraw = function () {
        for (var layerIndex = 0; layerIndex < _geoJsons.length; ++layerIndex) {
            plotData(layerIndex);
        }
    };

    _chart.overlayGeoJson = function (json, name, keyAccessor) {
        for (var i = 0; i < _geoJsons.length; ++i) {
            if (_geoJsons[i].name == name) {
                _geoJsons[i].data = json;
                _geoJsons[i].keyAccessor = keyAccessor;
                return _chart
            }
        }
        _geoJsons.push({name: name, data: json, keyAccessor: keyAccessor});
        return _chart;
    };

    _chart.projection = function (projection) {
        _geoPath.projection(projection);
        return _chart;
    };

    _chart.geoJsons = function () {
        return _geoJsons;
    };

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
dc.bubbleOverlay = function(root, chartGroup) {
    var BUBBLE_OVERLAY_CLASS = "bubble-overlay";
    var BUBBLE_NODE_CLASS = "node";
    var BUBBLE_CLASS = "bubble";

    var _chart = dc.abstractBubbleChart(dc.baseChart({}));
    var _g;
    var _points = [];

    _chart.transitionDuration(750);

    _chart.radiusValueAccessor(function(d) {
        return d.value;
    });

    _chart.point = function(name, x, y) {
        _points.push({name: name, x: x, y: y});
        return _chart;
    };

    _chart.doRender = function() {
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
                    .attr("fill", _chart.initBubbleColor)
                    .on("click", _chart.onClick);

            dc.transition(circle, _chart.transitionDuration())
                .attr("r", function(d) {
                    return _chart.bubbleR(d);
                });

            _chart.doRenderLabel(nodeG);

            _chart.doRenderTitles(nodeG);
        });
    }

    function mapData() {
        var data = {};
        _chart.group().all().forEach(function(datum) {
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

    _chart.doRedraw = function() {
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
                .attr("fill", _chart.updateBubbleColor);

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