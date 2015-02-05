dc = {
    version: "0.6.0",
    _charts: []
};

dc.registerChart = function(chart) {
    dc._charts.push(chart);
};

dc.hasChart = function(chart) {
    return dc._charts.indexOf(chart) >= 0;
};

dc.deregisterAllCharts = function() {
    dc._charts = [];
};

dc.filterAll = function() {
    for (var i = 0; i < dc._charts.length; ++i) {
        dc._charts[i].filterAll();
    }
};

dc.renderAll = function() {
    for (var i = 0; i < dc._charts.length; ++i) {
        dc._charts[i].render();
    }
};

dc.redrawAll = function() {
    for (var i = 0; i < dc._charts.length; ++i) {
        dc._charts[i].redraw();
    }
};

dc.transition = function(selections, duration, callback) {
    if (duration <= 0)
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
    return new Array(Math.abs(e - s));
};

dc.round = {};

dc.round.floor = function(n) {
    return Math.floor(n);
};

dc.override = function(obj, functionName, newFunction) {
    var existingFunction = obj[functionName];
    newFunction._ = existingFunction;
    obj[functionName] = function() {
        var expression = "newFunction(";

        for(var i = 0; i < arguments.length; ++i)
            expression += "argument["+i+"],";

        expression += "existingFunction);"

        return eval(expression);
    };
}
dc.dateFormat = d3.time.format("%m/%d/%Y");

dc.printers = {};

dc.printers.filter = function(filter) {
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

dc.constants = function() {
};
dc.constants.STACK_CLASS = "stack";
dc.constants.DESELECTED_CLASS = "deselected";
dc.constants.SELECTED_CLASS = "selected";
dc.constants.GROUP_INDEX_NAME = "__group_index__";

dc.utils = {};
dc.utils.GroupStack = function() {
    var _dataPointMatrix = [];
    var _groups = [];
    var _defaultRetriever;

    function initializeDataPointRow(x) {
        if (!_dataPointMatrix[x])
            _dataPointMatrix[x] = [];
    }

    this.setDataPoint = function(x, y, data) {
        initializeDataPointRow(x);
        _dataPointMatrix[x][y] = data;
    };

    this.getDataPoint = function(x, y) {
        initializeDataPointRow(x);
        var dataPoint = _dataPointMatrix[x][y];
        if (dataPoint == undefined)
            dataPoint = 0;
        return dataPoint;
    };

    this.addGroup = function(group, retriever) {
        if(!retriever)
            retriever = _defaultRetriever;
        _groups.push([group, retriever]);
        return _groups.length - 1;
    };

    this.getGroupByIndex = function(index) {
        return _groups[index][0];
    };

    this.getRetrieverByIndex = function(index) {
        return _groups[index][1];
    };

    this.size = function() {
        return _groups.length;
    };

    this.clear = function(){
        _dataPointMatrix = [];
        _groups = [];
    };

    this.setDefaultRetriever = function(retriever){
        _defaultRetriever = retriever;
    };
};
dc.baseChart = function(_chart) {
    var _dimension;
    var _group;

    var _anchor;
    var _root;
    var _svg;

    var _width = 200, _height = 200;

    var _keyRetriever = function(d) {
        return d.key;
    };
    var _valueRetriever = function(d) {
        return d.value;
    };

    var _label = function(d) {
        return d.key;
    };
    var _renderLabel = false;

    var _title = function(d) {
        return d.key + ": " + d.value;
    };
    var _renderTitle = false;

    var _transitionDuration = 750;

    var _filterPrinter = dc.printers.filter;

    _chart.dimension = function(d) {
        if (!arguments.length) return _dimension;
        _dimension = d;
        return _chart;
    };

    _chart.group = function(g) {
        if (!arguments.length) return _group;
        _group = g;
        return _chart;
    };

    _chart.orderedGroup = function() {
        return _group.order(function(p) {
            return p.key;
        });
    };

    _chart.filterAll = function() {
        return _chart.filter(null);
    };

    _chart.dataAreSet = function() {
        return _dimension != undefined && _group != undefined;
    };

    _chart.select = function(s) {
        return _root.select(s);
    };

    _chart.selectAll = function(s) {
        return _root.selectAll(s);
    };

    _chart.anchor = function(a) {
        if (!arguments.length) return _anchor;
        if (a instanceof Object) {
            _anchor = a.anchor();
            _root = a.root();
        } else {
            _anchor = a;
            _root = d3.select(_anchor);
            dc.registerChart(_chart);
        }
        return _chart;
    };

    _chart.root = function(r) {
        if (!arguments.length) return _root;
        _root = r;
        return _chart;
    };

    _chart.width = function(w) {
        if (!arguments.length) return _width;
        _width = w;
        return _chart;
    };

    _chart.height = function(h) {
        if (!arguments.length) return _height;
        _height = h;
        return _chart;
    };

    _chart.svg = function(_) {
        if (!arguments.length) return _svg;
        _svg = _;
        return _chart;
    };

    _chart.resetSvg = function() {
        _chart.select("svg").remove();
        return _chart.generateSvg();
    };

    _chart.generateSvg = function() {
        _svg = _chart.root().append("svg")
            .attr("width", _chart.width())
            .attr("height", _chart.height());
        return _svg;
    };

    _chart.filterPrinter = function(_){
        if(!arguments.length) return _filterPrinter;
        _filterPrinter = _;
        return _chart;
    };

    _chart.turnOnControls = function() {
        _chart.selectAll(".reset").style("display", null);
        _chart.selectAll(".filter").text(_filterPrinter(_chart.filter())).style("display", null);
    };

    _chart.turnOffControls = function() {
        _chart.selectAll(".reset").style("display", "none");
        _chart.selectAll(".filter").style("display", "none").text(_chart.filter());
    };

    _chart.transitionDuration = function(d) {
        if (!arguments.length) return _transitionDuration;
        _transitionDuration = d;
        return _chart;
    };

    // abstract function stub
    _chart.filter = function(f) {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart.render = function() {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart.redraw = function() {
        // do nothing in base, should be overridden by sub-function
        return _chart;
    };

    _chart.keyRetriever = function(_) {
        if (!arguments.length) return _keyRetriever;
        _keyRetriever = _;
        return _chart;
    };

    _chart.valueRetriever = function(_) {
        if (!arguments.length) return _valueRetriever;
        _valueRetriever = _;
        return _chart;
    };

    _chart.label = function(_) {
        if (!arguments.length) return _label;
        _label = _;
        _renderLabel = true;
        return _chart;
    };

    _chart.renderLabel = function(_) {
        if (!arguments.length) return _renderLabel;
        _renderLabel = _;
        return _chart;
    };

    _chart.title = function(_) {
        if (!arguments.length) return _title;
        _title = _;
        _renderTitle = true;
        return _chart;
    };

    _chart.renderTitle = function(_) {
        if (!arguments.length) return _renderTitle;
        _renderTitle = _;
        return _chart;
    };

    return _chart;
};
dc.coordinateGridChart = function(_chart) {
    var DEFAULT_Y_AXIS_TICKS = 5;

    _chart = dc.baseChart(_chart);

    var _margin = {top: 10, right: 50, bottom: 30, left: 20};

    var _g;

    var _x;
    var _xAxis = d3.svg.axis();
    var _xUnits = dc.units.integers;

    var _y;
    var _yAxis = d3.svg.axis();
    var _yElasticity = false;

    var _filter;
    var _brush = d3.svg.brush();
    var _round;

    _chart.generateG = function() {
        _g = _chart.svg().append("g")
            .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")");
        return _g;
    };

    _chart.g = function(_) {
        if (!arguments.length) return _g;
        _g = _;
        return _chart;
    };

    _chart.margins = function(m) {
        if (!arguments.length) return _margin;
        _margin = m;
        return _chart;
    };

    _chart.x = function(_) {
        if (!arguments.length) return _x;
        _x = _;
        return _chart;
    };

    _chart.xAxis = function(_) {
        if (!arguments.length) return _xAxis;
        _xAxis = _;
        return _chart;
    };

    _chart.renderXAxis = function(g) {
        g.select("g.x").remove();
        _x.range([0, _chart.xAxisLength()]);
        _xAxis = _xAxis.scale(_chart.x()).orient("bottom");
        g.append("g")
            .attr("class", "axis x")
            .attr("transform", "translate(" + _chart.margins().left + "," + _chart.xAxisY() + ")")
            .call(_xAxis);
    };

    _chart.xAxisY = function() {
        return (_chart.height() - _chart.margins().bottom);
    };

    _chart.xAxisLength = function() {
        return _chart.width() - _chart.margins().left - _chart.margins().right;
    };

    _chart.xUnits = function(_) {
        if (!arguments.length) return _xUnits;
        _xUnits = _;
        return _chart;
    };

    _chart.renderYAxis = function(g) {
        g.select("g.y").remove();

        if (_y == null || _chart.elasticY()) {
            _y = d3.scale.linear();
            _y.domain([_chart.yAxisMin(), _chart.yAxisMax()]).rangeRound([_chart.yAxisHeight(), 0]);
        }

        _y.range([_chart.yAxisHeight(), 0]);
        _yAxis = _yAxis.scale(_y).orient("left").ticks(DEFAULT_Y_AXIS_TICKS);

        g.append("g")
            .attr("class", "axis y")
            .attr("transform", "translate(" + _chart.margins().left + "," + _chart.margins().top + ")")
            .call(_yAxis);
    };

    _chart.y = function(_) {
        if (!arguments.length) return _y;
        _y = _;
        return _chart;
    };

    _chart.yAxis = function(y) {
        if (!arguments.length) return _yAxis;
        _yAxis = y;
        return _chart;
    };

    _chart.elasticY = function(_) {
        if (!arguments.length) return _yElasticity;
        _yElasticity = _;
        return _chart;
    };

    _chart.yAxisMin = function() {
        var min = d3.min(_chart.group().all(), function(e) {
            return _chart.valueRetriever()(e);
        });
        if (min > 0) min = 0;
        return min;
    };

    _chart.yAxisMax = function() {
        return d3.max(_chart.group().all(), function(e) {
            return _chart.valueRetriever()(e);
        });
    };

    _chart.yAxisHeight = function() {
        return _chart.height() - _chart.margins().top - _chart.margins().bottom;
    };

    _chart.round = function(_) {
        if (!arguments.length) return _round;
        _round = _;
        return _chart;
    };

    _chart._filter = function(_) {
        if (!arguments.length) return _filter;
        _filter = _;
        return _chart;
    };

    _chart.filter = function(_) {
        if (!arguments.length) return _filter;

        if (_) {
            _filter = _;
            _chart.brush().extent(_);
            _chart.dimension().filterRange(_);
            _chart.turnOnControls();
        } else {
            _filter = null;
            _chart.brush().clear();
            _chart.dimension().filterAll();
            _chart.turnOffControls();
        }

        return _chart;
    };

    _chart.brush = function(_) {
        if (!arguments.length) return _brush;
        _brush = _;
        return _chart;
    };

    _chart.renderBrush = function(g) {
        _brush.on("brushstart", brushStart)
            .on("brush", brushing)
            .on("brushend", brushEnd);

        var gBrush = g.append("g")
            .attr("class", "brush")
            .attr("transform", "translate(" + _chart.margins().left + ",0)")
            .call(_brush.x(_chart.x()));
        gBrush.selectAll("rect").attr("height", _chart.xAxisY());
        gBrush.selectAll(".resize").append("path").attr("d", _chart.resizeHandlePath);

        if (_filter) {
            _chart.redrawBrush(g);
        }
    };

    function brushStart(p) {
    }

    function brushing(p) {
        var extent = _brush.extent();
        if (_chart.round()) {
            extent[0] = extent.map(_chart.round())[0];
            extent[1] = extent.map(_chart.round())[1];
            _g.select(".brush")
                .call(_brush.extent(extent));
        }
        extent = _brush.extent();
        _chart.filter(_brush.empty() ? null : [extent[0], extent[1]]);
        dc.redrawAll();
    }

    function brushEnd(p) {
    }

    _chart.redrawBrush = function(g) {
        if (_chart._filter() && _chart.brush().empty())
            _chart.brush().extent(_chart._filter());

        var gBrush = g.select("g.brush");
        gBrush.call(_chart.brush().x(_chart.x()));
        gBrush.selectAll("rect").attr("height", _chart.xAxisY());

        _chart.fadeDeselectedArea();
    };

    _chart.fadeDeselectedArea = function(){
        // do nothing, sub-chart should override this function
    };

    // borrowed from Crossfilter example
    _chart.resizeHandlePath = function(d) {
        var e = +(d == "e"), x = e ? 1 : -1, y = _chart.xAxisY() / 3;
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

    _chart.render = function() {
        _chart.resetSvg();

        if (_chart.dataAreSet()) {
            _chart.generateG();

            _chart.renderXAxis(_chart.g());
            _chart.renderYAxis(_chart.g());

            _chart.plotData();

            _chart.renderBrush(_chart.g());
        }

        return _chart;
    };

    _chart.redraw = function() {
        if (_chart.elasticY())
            _chart.renderYAxis(_chart.g());

        _chart.plotData();
        _chart.redrawBrush(_chart.g());

        return _chart;
    };

    _chart.subRender = function(){
        if (_chart.dataAreSet()) {
            _chart.plotData();
        }

        return _chart;
    };

    return _chart;
};
dc.colorChart = function(_chart) {
    var _colors = d3.scale.category20c();

    _chart.colors = function(_) {
        if (!arguments.length) return _colors;

        if(_ instanceof Array)
            _colors = d3.scale.ordinal().range(_);
        else
            _colors = _;

        return _chart;
    };

    return _chart;
};
dc.singleSelectionChart = function(_chart) {
    var _filter;

    _chart.hasFilter = function() {
        return _filter != null;
    };

    _chart.filter = function(f) {
        if (!arguments.length) return _filter;

        _filter = f;

        if (_chart.dataAreSet())
            _chart.dimension().filter(_filter);

        if (f) {
            _chart.turnOnControls();
        } else {
            _chart.turnOffControls();
        }

        return _chart;
    };

    _chart.currentFilter = function() {
       return _filter;
    };

    _chart.highlightSelected = function(e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, true);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    }

    _chart.fadeDeselected = function(e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, true);
    }

    _chart.resetHighlight = function(e) {
        d3.select(e).classed(dc.constants.SELECTED_CLASS, false);
        d3.select(e).classed(dc.constants.DESELECTED_CLASS, false);
    }

    return _chart;
};
dc.stackableChart = function(_chart) {
    var MIN_DATA_POINT_HEIGHT = 0;
    var DATA_POINT_PADDING_BOTTOM = 1;

    var _groupStack = new dc.utils.GroupStack();

    _chart.stack = function(group, retriever) {
        _groupStack.setDefaultRetriever(_chart.valueRetriever());
        _groupStack.addGroup(group, retriever);
        return _chart;
    };

    _chart.allGroups = function() {
        var allGroups = [];

        allGroups.push(_chart.group());

        for (var i = 0; i < _groupStack.size(); ++i)
            allGroups.push(_groupStack.getGroupByIndex(i));

        return allGroups;
    };

    _chart.allValueRetrievers = function() {
        var allRetrievers = [];

        allRetrievers.push(_chart.valueRetriever());

        for (var i = 0; i < _groupStack.size(); ++i)
            allRetrievers.push(_groupStack.getRetrieverByIndex(i));

        return allRetrievers;
    };

    _chart.getValueRetrieverByIndex = function(groupIndex) {
        return _chart.allValueRetrievers()[groupIndex];
    };

    _chart.yAxisMin = function() {
        var min = 0;
        var allGroups = _chart.allGroups();

        for (var groupIndex = 0; groupIndex < allGroups.length; ++groupIndex) {
            var group = allGroups[groupIndex];
            var m = d3.min(group.all(), function(e) {
                return _chart.getValueRetrieverByIndex(groupIndex)(e);
            });
            if (m < min) min = m;
        }

        return min;
    };

    _chart.yAxisMax = function() {
        var max = 0;
        var allGroups = _chart.allGroups();

        for (var groupIndex = 0; groupIndex < allGroups.length; ++groupIndex) {
            var group = allGroups[groupIndex];
            max += d3.max(group.all(), function(e) {
                return _chart.getValueRetrieverByIndex(groupIndex)(e);
            });
        }

        return max;
    };

    _chart.dataPointBaseline = function() {
        return _chart.margins().top + _chart.yAxisHeight() - DATA_POINT_PADDING_BOTTOM;
    };

    _chart.dataPointHeight = function(d, groupIndex) {
        var h = (_chart.yAxisHeight() - _chart.y()(_chart.getValueRetrieverByIndex(groupIndex)(d)) - DATA_POINT_PADDING_BOTTOM);
        if (isNaN(h) || h < MIN_DATA_POINT_HEIGHT)
            h = MIN_DATA_POINT_HEIGHT;
        return h;
    };

    _chart.calculateDataPointMatrix = function(groups) {
        for (var groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
            var data = groups[groupIndex].all();
            for (var dataIndex = 0; dataIndex < data.length; ++dataIndex) {
                var d = data[dataIndex];
                if (groupIndex == 0)
                    _groupStack.setDataPoint(groupIndex, dataIndex, _chart.dataPointBaseline() - _chart.dataPointHeight(d, groupIndex));
                else
                    _groupStack.setDataPoint(groupIndex, dataIndex, _groupStack.getDataPoint(groupIndex - 1, dataIndex) - _chart.dataPointHeight(d, groupIndex))
            }
        }
    };

    _chart.getChartStack = function() {
        return _groupStack;
    };

    return _chart;
};
dc.pieChart = function(_parent) {
    var _sliceCssClass = "pie-slice";

    var _radius = 0, _innerRadius = 0;

    var _g;

    var _arc;
    var _dataPie;
    var _slices;
    var _slicePaths;

    var _labels;

    var _chart = dc.singleSelectionChart(dc.colorChart(dc.baseChart({})));

    _chart.label(function(d) {
        return _chart.keyRetriever()(d.data);
    });
    _chart.renderLabel(true);

    _chart.title(function(d) {
        return d.data.key + ": " + d.data.value;
    });

    _chart.transitionDuration(350);

    _chart.render = function() {
        _chart.resetSvg();

        if (_chart.dataAreSet()) {
            _g = _chart.svg()
                .append("g")
                .attr("transform", "translate(" + _chart.cx() + "," + _chart.cy() + ")");

            _dataPie = calculateDataPie();

            _arc = _chart.buildArcs();

            _slices = _chart.drawSlices(_g, _dataPie, _arc);

            _chart.drawLabels(_slices, _arc);
            _chart.drawTitles(_slices, _arc);

            _chart.highlightFilter();
        }

        return _chart;
    };

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

    _chart.drawSlices = function(topG, dataPie, arcs) {
        _slices = topG.selectAll("g." + _sliceCssClass)
            .data(dataPie(_chart.orderedGroup().top(Infinity)))
            .enter()
            .append("g")
            .attr("class", function(d, i) {
                return _sliceCssClass + " " + i;
            });

        _slicePaths = _slices.append("path")
            .attr("fill", function(d, i) {
                return _chart.colors()(i);
            })
            .attr("d", arcs);

        _slicePaths
            .transition()
            .duration(_chart.transitionDuration())
            .attrTween("d", tweenPie);

        _slicePaths.on("click", onClick);

        return _slices;
    };

    _chart.drawLabels = function(slices, arc) {
        if (_chart.renderLabel()) {
            _labels = slices.append("text");
            redrawLabels(arc);
            _labels.on("click", onClick);
        }
    };

    _chart.drawTitles = function(slices, arc) {
        if (_chart.renderTitle()) {
            slices.append("title").text(function(d) {
                return _chart.title()(d);
            });
        }
    };

    _chart.highlightFilter = function() {
        if (_chart.hasFilter()) {
            _chart.selectAll("g." + _sliceCssClass).select("path").each(function(d) {
                if (_chart.isSelectedSlice(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll("g." + _sliceCssClass).selectAll("path").each(function(d) {
                _chart.resetHighlight(this);
            });
        }
    };

    _chart.isSelectedSlice = function(d) {
        return _chart.filter() == _chart.keyRetriever()(d.data);
    };

    _chart.redraw = function() {
        _chart.highlightFilter();
        var data = _dataPie(_chart.orderedGroup().top(Infinity));
        _slicePaths = _slicePaths.data(data);
        _labels = _labels.data(data);
        dc.transition(_slicePaths, _chart.transitionDuration(), function(s) {
            s.attrTween("d", tweenPie);
        });
        redrawLabels(_arc);
        redrawTitles();
        return _chart;
    };

    function calculateDataPie() {
        return d3.layout.pie().value(function(d) {
            return _chart.valueRetriever()(d);
        });
    }

    function redrawLabels(arc) {
        dc.transition(_labels, _chart.transitionDuration())
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
                if (_chart.valueRetriever()(data) == 0)
                    return "";
                return _chart.label()(d);
            });
    }

    function redrawTitles() {
        if (_chart.renderTitle()) {
            _slices.selectAll("title").text(function(d) {
                return _chart.title()(d);
            });
        }
    }

    function tweenPie(b) {
        b.innerRadius = _chart.innerRadius();
        var current = this._current;
        if (isOffCanvas(current))
            current = {startAngle: 0, endAngle: 0};
        var i = d3.interpolate(current, b);
        this._current = i(0);
        return function(t) {
            return _arc(i(t));
        };
    }

    function isOffCanvas(current) {
        return current == null || isNaN(current.startAngle) || isNaN(current.endAngle);
    }

    function onClick(d) {
        _chart.filter(_chart.keyRetriever()(d.data));
        dc.redrawAll();
    }

    return _chart.anchor(_parent);
};
dc.barChart = function(_parent) {
    var MIN_BAR_WIDTH = 1;
    var BAR_PADDING_WIDTH = 2;

    var _chart = dc.stackableChart(dc.coordinateGridChart({}));

    _chart.transitionDuration(500);

    _chart.plotData = function() {
        var groups = _chart.allGroups();

        _chart.calculateDataPointMatrix(groups);

        for (var groupIndex = 0; groupIndex < groups.length; ++groupIndex) {
            generateBarsPerGroup(groupIndex, groups[groupIndex]);
        }
    };

    function generateBarsPerGroup(groupIndex, group) {
        var bars = _chart.g().selectAll("rect." + dc.constants.STACK_CLASS + groupIndex)
            .data(group.all());

        // new
        bars.enter()
            .append("rect")
            .attr("class", "bar " + dc.constants.STACK_CLASS + groupIndex)
            .attr("x", function(data, dataIndex) {
                return barX(this, data, groupIndex, dataIndex);
            })
            .attr("y", _chart.xAxisY())
            .attr("width", barWidth);
        dc.transition(bars, _chart.transitionDuration())
            .attr("y", function(data, dataIndex) {
                return barY(this, data, dataIndex);
            })
            .attr("height", function(data) {
                return _chart.dataPointHeight(data, getGroupIndexFromBar(this));
            });

        // update
        dc.transition(bars, _chart.transitionDuration())
            .attr("y", function(data, dataIndex) {

                return barY(this, data, dataIndex);
            })
            .attr("height", function(data) {
                return _chart.dataPointHeight(data, getGroupIndexFromBar(this));
            });

        // delete
        dc.transition(bars.exit(), _chart.transitionDuration())
            .attr("y", _chart.xAxisY())
            .attr("height", 0);
    }

    function barWidth(d) {
        var numberOfBars = _chart.xUnits()(_chart.x().domain()[0], _chart.x().domain()[1]).length + BAR_PADDING_WIDTH;
        var w = Math.floor(_chart.xAxisLength() / numberOfBars);
        if (isNaN(w) || w < MIN_BAR_WIDTH)
            w = MIN_BAR_WIDTH;
        return w;
    }

    function setGroupIndexToBar(bar, groupIndex) {
        bar[dc.constants.GROUP_INDEX_NAME] = groupIndex;
    }

    function barX(bar, data, groupIndex, dataIndex) {
        setGroupIndexToBar(bar, groupIndex);
        return _chart.x()(_chart.keyRetriever()(data)) + _chart.margins().left;
    }

    function getGroupIndexFromBar(bar) {
        var groupIndex = bar[dc.constants.GROUP_INDEX_NAME];
        return groupIndex;
    }

    function barY(bar, data, dataIndex) {
        var groupIndex = getGroupIndexFromBar(bar);
        return _chart.getChartStack().getDataPoint(groupIndex, dataIndex);
    }

    _chart.fadeDeselectedArea = function() {
        var bars = _chart.g().selectAll("rect.bar");

        if (!_chart.brush().empty() && _chart.brush().extent() != null) {
            var start = _chart.brush().extent()[0];
            var end = _chart.brush().extent()[1];

            bars.classed(dc.constants.DESELECTED_CLASS, function(d) {
                var xValue = _chart.keyRetriever()(d);
                return xValue < start || xValue >= end;
            });
        } else {
            bars.classed(dc.constants.DESELECTED_CLASS, false);
        }
    };

    return _chart.anchor(_parent);
};
dc.lineChart = function(_parent) {
    var AREA_BOTTOM_PADDING = 1;

    var _chart = dc.stackableChart(dc.coordinateGridChart({}));
    var _renderArea = false;

    _chart.transitionDuration(500);

    _chart.plotData = function() {
        var groups = _chart.allGroups();

        _chart.calculateDataPointMatrix(groups);

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
    }

    function getStackedCssClass(groupIndex) {
        return dc.constants.STACK_CLASS + groupIndex;
    }

    function createGrouping(stackedCssClass, group) {
        var g = _chart.g().select("g." + stackedCssClass);

        if (g.empty())
            g = _chart.g().append("g").attr("class", stackedCssClass);

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
            .x(function(d) {
                return _chart.margins().left + _chart.x()(_chart.keyRetriever()(d));
            })
            .y(function(d, dataIndex) {
                var groupIndex = this[dc.constants.GROUP_INDEX_NAME];
                return _chart.getChartStack().getDataPoint(groupIndex, dataIndex);
            });

        dc.transition(linePath, _chart.transitionDuration(),
            function(t) {
                t.ease("linear");
            }).attr("d", line);
        return line;
    }

    function drawArea(g, stackedCssClass, groupIndex, line) {
        var areaPath = g.selectAll("path.area");

        if (areaPath.empty())
            areaPath = g.append("path")
                .attr("class", "area " + stackedCssClass);

        areaPath[0][0][dc.constants.GROUP_INDEX_NAME] = groupIndex;

        var area = d3.svg.area()
            .x(line.x())
            .y1(line.y())
            .y0(function(d, dataIndex) {
                var groupIndex = this[dc.constants.GROUP_INDEX_NAME];
                if (groupIndex == 0) return _chart.y()(0) - AREA_BOTTOM_PADDING + _chart.margins().top;
                return _chart.getChartStack().getDataPoint(groupIndex - 1, dataIndex);
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

    return _chart.anchor(_parent);
};
dc.dataCount = function(_parent) {
    var _formatNumber = d3.format(",d");
    var _chart = dc.baseChart({});

    _chart.render = function() {
        _chart.selectAll(".total-count").text(_formatNumber(_chart.dimension().size()));
        _chart.selectAll(".filter-count").text(_formatNumber(_chart.group().value()));

        return _chart;
    };

    _chart.redraw = function(){
        return _chart.render();
    };

    return _chart.anchor(_parent);
};
dc.dataTable = function(_parent) {
    var _chart = dc.baseChart({});

    var _size = 25;
    var _columns = [];
    var _sortBy = function(d) {
        return d;
    };
    var _order = d3.ascending;
    var _sort;

    _chart.render = function() {
        _chart.selectAll("div.row").remove();

        renderRows(renderGroups());

        return _chart;
    };

    function renderGroups() {
        var groups = _chart.root().selectAll("div.group")
            .data(nestEntries(), function(d) {
                return _chart.keyRetriever()(d);
            });

        groups.enter().append("div")
            .attr("class", "group")
            .append("span")
            .attr("class", "label")
            .text(function(d) {
                return _chart.keyRetriever()(d);
            });

        groups.exit().remove();

        return groups;
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
            .selectAll("div.row")
            .data(function(d) {
                return d.values;
            });

        var rowEnter = rows.enter()
            .append("div")
            .attr("class", "row");

        for (var i = 0; i < _columns.length; ++i) {
            var f = _columns[i];
            rowEnter.append("span")
                .attr("class", "column " + i)
                .text(function(d) {
                    return f(d);
                });
        }

        rows.exit().remove();

        return rows;
    }

    _chart.redraw = function() {
        return _chart.render();
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

    return _chart.anchor(_parent);
};
dc.bubbleChart = function(_parent) {
    var NODE_CLASS = "node";
    var BUBBLE_CLASS = "bubble";
    var MIN_RADIUS = 10;

    var _chart = dc.singleSelectionChart(dc.colorChart(dc.coordinateGridChart({})));

    _chart.renderLabel(true);
    _chart.renderTitle(false);

    var _r = d3.scale.linear().domain([0, 100]);
    var _rValueRetriever = function(d) {
        return d.r;
    };

    _chart.transitionDuration(750);

    var bubbleLocator = function(d) {
        return "translate(" + (bubbleX(d)) + "," + (bubbleY(d)) + ")";
    };

    _chart.plotData = function() {
         _r.range([0, _chart.xAxisLength() / 3]);

        var bubbleG = _chart.g().selectAll("g." + NODE_CLASS)
            .data(_chart.group().all());

        renderNodes(bubbleG);

        updateNodes(bubbleG);

        removeNodes(bubbleG);

        _chart.fadeDeselectedArea();
    };

    function renderNodes(bubbleG) {
        var bubbleGEnter = bubbleG.enter().append("g");
        bubbleGEnter
            .attr("class", NODE_CLASS)
            .attr("transform", bubbleLocator)
            .append("circle").attr("class", function(d, i) {
                return BUBBLE_CLASS + " " + i;
            })
            .on("click", onClick)
            .attr("fill", function(d, i) {
                return _chart.colors()(i);
            })
            .attr("r", 0);
        dc.transition(bubbleG, _chart.transitionDuration())
            .attr("r", function(d) {
                return bubbleR(d);
            });

        renderLabel(bubbleGEnter);

        renderTitles(bubbleGEnter);
    }

    var labelFunction = function(d) {
        return bubbleR(d) > MIN_RADIUS ? _chart.label()(d) : "";
    };

    function renderLabel(bubbleGEnter) {
        if (_chart.renderLabel()) {

            bubbleGEnter.append("text")
                .attr("text-anchor", "middle")
                .attr("dy", ".3em")
                .on("click", onClick)
                .text(labelFunction);
        }
    }

    function updateLabels(bubbleGEnter) {
        if (_chart.renderLabel()) {
            bubbleGEnter.selectAll("text")
                .text(labelFunction);
        }
    }

    var titleFunction = function(d) {
        return _chart.title()(d);
    };

    function renderTitles(g) {
        if (_chart.renderTitle()) {
            g.append("title").text(titleFunction);
        }
    }

    function updateTitles(g) {
        if (_chart.renderTitle()) {
            g.selectAll("title").text(titleFunction);
        }
    }

    function updateNodes(bubbleG) {
        dc.transition(bubbleG, _chart.transitionDuration())
            .attr("transform", bubbleLocator)
            .selectAll("circle." + BUBBLE_CLASS)
            .attr("r", function(d) {
                return bubbleR(d);
            });
        updateLabels(bubbleG);
        updateTitles(bubbleG);
    }

    function removeNodes(bubbleG) {
        dc.transition(bubbleG.exit().selectAll("circle." + BUBBLE_CLASS), _chart.transitionDuration())
            .attr("r", 0)
            .remove();
    }

    var onClick = function(d) {
        _chart.filter(d.key);
        dc.redrawAll();
    };

    function bubbleX(d) {
        return _chart.x()(_chart.keyRetriever()(d)) + _chart.margins().left;
    }

    function bubbleY(d) {
        return _chart.margins().top + _chart.y()(_chart.valueRetriever()(d));
    }

    function bubbleR(d) {
        return _chart.r()(_chart.radiusValueRetriever()(d));
    }

    _chart.renderBrush = function(g) {
        // override default x axis brush from parent chart
    };

    _chart.redrawBrush = function(g) {
        // override default x axis brush from parent chart
        _chart.fadeDeselectedArea();
    };

    _chart.fadeDeselectedArea = function() {
        var normalOpacity = 1;
        var fadeOpacity = 0.1;
        if (_chart.hasFilter()) {
            _chart.selectAll("g." + NODE_CLASS).select("circle").each(function(d) {
                if (_chart.isSelectedSlice(d)) {
                    _chart.highlightSelected(this);
                } else {
                    _chart.fadeDeselected(this);
                }
            });
        } else {
            _chart.selectAll("g." + NODE_CLASS).selectAll("circle").each(function(d) {
                _chart.resetHighlight(this);
            });
        }
    };

    _chart.isSelectedSlice = function(d) {
        return _chart.filter() == d.key;
    };

    _chart.r = function(_) {
        if (!arguments.length) return _r;
        _r = _;
        return _chart;
    };

    _chart.radiusValueRetriever = function(_) {
        if (!arguments.length) return _rValueRetriever;
        _rValueRetriever = _;
        return _chart;
    };

    return _chart.anchor(_parent);
};
dc.compositeChart = function(_parent) {
    var SUB_CHART_CLASS = "sub";

    var _chart = dc.coordinateGridChart({});
    var _children = [];

    _chart.transitionDuration(500);

    dc.override(_chart, "generateG", function(_super) {
        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];
            if (child.dimension() == null) child.dimension(_chart.dimension());
            if (child.group() == null) child.group(_chart.group());
            child.svg(_chart.svg());
            child.height(_chart.height());
            child.width(_chart.width());
            child.margins(_chart.margins());
            child.xUnits(_chart.xUnits());
            child.transitionDuration(_chart.transitionDuration());
            child.generateG();
            child.g().attr("class", SUB_CHART_CLASS);
        }

        return _super();
    });

    _chart.plotData = function() {
        for (var i = 0; i < _children.length; ++i) {
            var child = _children[i];
            child.x(_chart.x());
            child.y(_chart.y());
            child.xAxis(_chart.xAxis());
            child.yAxis(_chart.yAxis());

            child.plotData();
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
        var allMaxs = [];
        for (var i = 0; i < _children.length; ++i) {
            allMaxs.push(_children[i].yAxisMax());
        }
        return allMaxs;
    }

    _chart.yAxisMax = function() {
        return d3.max(getAllYAxisMaxFromChildCharts());
    };

    function combineAllGroups() {
        var allGroups = [];

        allGroups.push(_chart.group());

        for (var i = 0; i < _children.length; ++i) {
            var groups = _children[i].allGroups();
            for (var j = 0; j < groups.length; ++j)
                allGroups.push(groups[j]);
        }

        return allGroups;
    }

    return _chart.anchor(_parent);
};
