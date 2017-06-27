(function (window) {
    'use strict';

    var c3 = window.c3 = {};
    var d3 = window.d3;

    /*
     * Generate chart according to config
     */
    c3.generate = function (config) {

        var c3 = { data : {} },
            cache = {};

        var EXPANDED = '_expanded_', SELECTED = '_selected_', INCLUDED = '_included_';

        /*-- Handle Config --*/

        function checkConfig(key, message) {
            if (! (key in config)) { throw Error(message); }
        }

        function getConfig(keys, defaultValue) {
            var target = config;
            for (var i = 0; i < keys.length; i++) {
                if (! (keys[i] in target)) { return defaultValue; }
                target = target[keys[i]];
            }
            return target;
        }

        // bindto - id to bind the chart
        var __bindto = getConfig(['bindto'], '#chart');

        var __size_width = getConfig(['size', 'width'], null),
            __size_height = getConfig(['size', 'height'], null);

        var __padding_left = getConfig(['padding', 'left'], null),
            __padding_right = getConfig(['padding', 'right'], null);

        var __zoom_enabled = getConfig(['zoom', 'enabled'], false),
            __zoom_extent = getConfig(['zoom', 'extent'], null),
            __zoom_privileged = getConfig(['zoom', 'privileged'], false);

        var __onenter = getConfig(['onenter'], function () {}),
            __onleave = getConfig(['onleave'], function () {});

        // data - data configuration
        checkConfig('data', 'data is required in config');

        var __data_x = getConfig(['data', 'x'], null),
            __data_xs = getConfig(['data', 'xs'], null),
            __data_x_format = getConfig(['data', 'x_format'], '%Y-%m-%d'),
            __data_id_converter = getConfig(['data', 'id_converter'], function (id) { return id; }),
            __data_names = getConfig(['data', 'names'], {}),
            __data_groups = getConfig(['data', 'groups'], []),
            __data_axes = getConfig(['data', 'axes'], {}),
            __data_type = getConfig(['data', 'type'], null),
            __data_types = getConfig(['data', 'types'], {}),
            __data_regions = getConfig(['data', 'regions'], {}),
            __data_colors = getConfig(['data', 'colors'], {}),
            __data_selection_enabled = getConfig(['data', 'selection', 'enabled'], false),
            __data_selection_grouped = getConfig(['data', 'selection', 'grouped'], false),
            __data_selection_isselectable = getConfig(['data', 'selection', 'isselectable'], function () { return true; });

        // subchart
        var __subchart_show = getConfig(['subchart', 'show'], false),
            __subchart_size_height = __subchart_show ? getConfig(['subchart', 'size', 'height'], 60) : 0;

        // color
        var __color_pattern = getConfig(['color', 'pattern'], null);

        // legend
        var __legend_show = getConfig(['legend', 'show'], true),
            __legend_item_width = getConfig(['legend', 'item', 'width'], 80), // TODO: auto
            __legend_item_onclick = getConfig(['legend', 'item', 'onclick'], function () {});

        // axis
        var __axis_x_type = getConfig(['axis', 'x', 'type'], 'indexed'),
            __axis_x_categories = getConfig(['axis', 'x', 'categories'], []),
            __axis_x_tick_centered = getConfig(['axis', 'x', 'tick', 'centered'], false),
            __axis_x_tick_format = getConfig(['axis', 'x', 'tick', 'format'], null),
            __axis_x_default = getConfig(['axis', 'x', 'default'], null),
            __axis_x_label = getConfig(['axis', 'x', 'label'], null),
            __axis_y_max = getConfig(['axis', 'y', 'max'], null),
            __axis_y_min = getConfig(['axis', 'y', 'min'], null),
            __axis_y_center = getConfig(['axis', 'y', 'center'], null),
            __axis_y_label = getConfig(['axis', 'y', 'label'], null),
            // not used
            //__axis_y_rescale = getConfig(['axis', 'y', 'rescale'], true),
            __axis_y_inner = getConfig(['axis', 'y', 'inner'], false),
            __axis_y_tick_format = getConfig(['axis', 'y', 'tick', 'format'], function (d) { return d; }),
            __axis_y_padding = getConfig(['axis', 'y', 'padding'], null),
            __axis_y_ticks = getConfig(['axis', 'y', 'ticks'], 10),
            __axis_y2_show = getConfig(['axis', 'y2', 'show'], false),
            __axis_y2_max = getConfig(['axis', 'y2', 'max'], null),
            __axis_y2_min = getConfig(['axis', 'y2', 'min'], null),
            __axis_y2_center = getConfig(['axis', 'y2', 'center'], null),
            // not used
            // __axis_y2_label = getConfig(['axis', 'y2', 'text'], null),
            // __axis_y2_rescale = getConfig(['axis', 'y2', 'rescale'], true),
            __axis_y2_inner = getConfig(['axis', 'y2', 'inner'], false),
            __axis_y2_tick_format = getConfig(['axis', 'y2', 'tick', 'format'], function (d) { return d; }),
            __axis_y2_padding = getConfig(['axis', 'y2', 'padding'], null),
            __axis_y2_ticks = getConfig(['axis', 'y2', 'ticks'], 10),
            __axis_rotated = getConfig(['axis', 'rotated'], false);

        // grid
        var __grid_x_show = getConfig(['grid', 'x', 'show'], false),
            __grid_x_type = getConfig(['grid', 'x', 'type'], 'tick'),
            __grid_x_lines = getConfig(['grid', 'x', 'lines'], null),
            __grid_y_show = getConfig(['grid', 'y', 'show'], false),
            // not used
            // __grid_y_type = getConfig(['grid', 'y', 'type'], 'tick'),
            __grid_y_lines = getConfig(['grid', 'y', 'lines'], null);

        // point - point of each data
        var __point_show = getConfig(['point', 'show'], true),
            __point_r = __point_show ? getConfig(['point', 'r'], 2.5) : 0,
            __point_focus_line_enabled = getConfig(['point', 'focus', 'line', 'enabled'], true),
            __point_focus_expand_enabled = getConfig(['point', 'focus', 'expand', 'enabled'], true),
            __point_focus_expand_r = getConfig(['point', 'focus', 'expand', 'r'], __point_focus_expand_enabled ? 4 : __point_r),
            __point_select_r = getConfig(['point', 'focus', 'select', 'r'], 8),
            __point_onclick = getConfig(['point', 'onclick'], function () {}),
            __point_onselected = getConfig(['point', 'onselected'], function () {}),
            __point_onunselected = getConfig(['point', 'onunselected'], function () {});

        // region - region to change style
        var __regions = getConfig(['regions'], []);

        // tooltip - show when mouseover on each data
        var __tooltip_contents = getConfig(['tooltip', 'contents'], function (d) {
            var title = getXAxisTickFormat()(d[0].x),
                text = "<table class='-tooltip'><tr><th colspan='2'>" + title + "</th></tr>", i, value, name;
            for (i = 0; i < d.length; i++) {
                if (isDefined(d[i])) {
                    value = isDefined(d[i].value) ? (Math.round(d[i].value * 100) / 100).toFixed(2) : '-';
                    name = d[i].name;
                } else {
                    value = '-';
                    name = '-';
                }
                text += "<tr class='-tooltip-name-" + d[i].id + "'><td class='name'><span style='background-color:" + color(d[i].id) + "'></span>" + name + "</td><td class='value'>" + value + "</td></tr>";
            }
            return text + "</table>";
        }),
            __tooltip_init_show = getConfig(['tooltip', 'init', 'show'], false),
            __tooltip_init_x = getConfig(['tooltip', 'init', 'x'], 0),
            __tooltip_init_position = getConfig(['tooltip', 'init', 'position'], {top: '0px', left: '50px'});

        /*-- Set Variables --*/

        var clipId = __bindto.replace('#', '') + '-clip',
            clipPath = "url(#" + clipId + ")";

        var isTimeSeries = (__axis_x_type === 'timeseries'),
            isCategorized = (__axis_x_type === 'categorized'),
            isCustomX = !isTimeSeries && (__data_x || __data_xs);

        var dragStart = null, dragging = false, cancelClick = false;

        var legendHeight = __legend_show ? 40 : 0;

        var color = generateColor(__data_colors, __color_pattern);

        var defaultTimeFormat = (function () {
            var formats = [
                [d3.time.format("%Y/%-m/%-d"), function () { return true; }],
                [d3.time.format("%-m/%-d"), function (d) { return d.getMonth(); }],
                [d3.time.format("%-m/%-d"), function (d) { return d.getDate() !== 1; }],
                [d3.time.format("%-m/%-d"), function (d) { return d.getDay() && d.getDate() !== 1; }],
                [d3.time.format("%I %p"), function (d) { return d.getHours(); }],
                [d3.time.format("%I:%M"), function (d) { return d.getMinutes(); }],
                [d3.time.format(":%S"), function (d) { return d.getSeconds(); }],
                [d3.time.format(".%L"), function (d) { return d.getMilliseconds(); }]
            ];
            return function (date) {
                var i = formats.length - 1, f = formats[i];
                while (!f[1](date)) { f = formats[--i]; }
                return f[0](date);
            };
        })();

        /*-- Set Chart Params --*/

        var bottom, bottom2, right, left, top2, top3, margin, margin2, margin3, width, height, height2, height3, currentWidth, currentHeight;
        var xMin, xMax, yMin, yMax, x, y, y2, subX, subY, subY2, xAxis, yAxis, yAxis2, subXAxis;

        var xOrient = __axis_rotated ? "left" : "bottom",
            yOrient = __axis_rotated ? (__axis_y_inner ? "top" : "bottom") : (__axis_y_inner ? "right" : "left"),
            y2Orient = __axis_rotated ? (__axis_y2_inner ? "bottom" : "top") : (__axis_y2_inner ? "left" : "right"),
            subXOrient = "bottom";

        var translate = {
            main : function () { return "translate(" + margin.left + "," + margin.top + ")"; },
            context : function () { return "translate(" + margin2.left + "," + margin2.top + ")"; },
            legend : function () { return "translate(" + margin3.left + "," + margin3.top + ")"; },
            y2 : function () { return "translate(" + (__axis_rotated ? 0 : width) + "," + (__axis_rotated ? 10 : 0) + ")"; },
            x : function () { return "translate(0," + height + ")"; },
            subx : function () { return "translate(0," + height2 + ")"; }
        };

        /*-- Define Functions --*/

        //-- Sizes --//

        function updateSizes() {
            currentWidth = getCurrentWidth();
            currentHeight = getCurrentHeight();
            bottom = 20 + __subchart_size_height + legendHeight;
            right = getCurrentPaddingRight();
            left = getCurrentPaddingLeft();
            top2 = currentHeight - __subchart_size_height - legendHeight;
            bottom2 = 20 + legendHeight;
            top3 = currentHeight - legendHeight;
            margin = {top: 0, right: right, bottom: bottom, left: left};
            margin2 = {top: top2, right: NaN, bottom: bottom2, left: left};
            margin3 = {top: top3, right: NaN, bottom: 0, left: left};
            width = currentWidth - margin.left - margin.right;
            height = currentHeight - margin.top - margin.bottom;
            height2 = currentHeight - margin2.top - margin2.bottom;
            height3 = currentHeight - margin3.top - margin3.bottom;
        }
        function getCurrentWidth() {
            return __size_width === null ? getParentWidth() : __size_width;
        }
        function getCurrentHeight() {
            var h = __size_height === null ? getParentHeight() : __size_height;
            return h > 0 ? h : 320;
        }
        function getCurrentPaddingLeft() {
            if (__padding_left) {
                return __padding_left;
            } else {
                return __axis_y_inner ? 1 : getDefaultPaddingWithAxisId('y');
            }
        }
        function getCurrentPaddingRight() {
            if (__padding_right) {
                return __padding_right;
            } else if (__axis_y2_show) {
                return __axis_y2_inner || __axis_rotated ? 1 : getDefaultPaddingWithAxisId('y2');
            } else {
                return 20;
            }
        }
        function getDefaultPaddingWithAxisId() {
            return 40; // TODO: calc automatically
        }
        function getParentWidth() {
            return +d3.select(__bindto).style("width").replace('px', ''); // TODO: if rotated, use height
        }
        function getParentHeight() {
            return +d3.select(__bindto).style('height').replace('px', ''); // TODO: if rotated, use width
        }
        function getXAxisClipWidth() {
            return width + 2 + margin.left + margin.right;
        }
        function getXAxisClipHeight() {
            return 40;
        }
        function getYAxisClipWidth() {
            return margin.left + 20;
        }
        function getYAxisClipHeight() {
            return height - margin.top + 2 + getXAxisClipHeight();
        }

        //-- Scales --//

        function updateScales() {
            // update edges
            xMin = __axis_rotated ? 10 : 0;
            xMax = __axis_rotated ? height : width;
            yMin = __axis_rotated ? 0 : height;
            yMax = __axis_rotated ? width : 1;
            // update scales
            x = getX(xMin, xMax, isDefined(x) ? x.domain() : undefined, function () { return xAxis.tickOffset(); });
            y = getY(yMin, yMax, isDefined(y) ? y.domain() : undefined);
            y2 = getY(yMin, yMax, isDefined(y2) ? y2.domain() : undefined);
            subX = getX(0, width, isDefined(orgXDomain) ? orgXDomain : undefined, function (d) { return d % 1 === 0 ? subXAxis.tickOffset() : 0; });
            subY = getY(height2, 10);
            subY2 = getY(height2, 10);
            // update axes
            xAxis = getXAxis(x, xOrient);
            yAxis = getYAxis(y, yOrient);
            yAxis2 = getYAxis(y2, y2Orient);
            subXAxis = getXAxis(subX, subXOrient);
        }

        function getX(min, max, domain, offset) {
            var scale = ((isTimeSeries) ? d3.time.scale() : d3.scale.linear()).range([min, max]);
            // Set function and values for c3
            scale.orgDomain = function () { return scale.domain(); };
            if (isDefined(domain)) { scale.domain(domain); }
            if (isUndefined(offset)) { offset = function () { return 0; }; }
            // Define customized scale if categorized axis
            if (isCategorized) {
                var _scale = scale, key;
                scale = function (d) { return _scale(d) + offset(d); };
                for (key in _scale) {
                    scale[key] = _scale[key];
                }
                scale.orgDomain = function () {
                    return _scale.domain();
                };
                scale.domain = function (domain) {
                    if (!arguments.length) {
                        domain = _scale.domain();
                        return [domain[0], domain[1] + 1];
                    }
                    _scale.domain(domain);
                    return scale;
                };
            }
            return scale;
        }
        function getY(min, max) {
            return d3.scale.linear().range([min, max]);
        }
        function getYScale(id) {
            return getAxisId(id) === 'y2' ? y2 : y;
        }
        function getSubYScale(id) {
            return getAxisId(id) === 'y2' ? subY2 : subY;
        }

        //-- Axes --//

        function getXAxis(scale, orient) {
            var axis = (isCategorized ? categoryAxis() : d3.svg.axis()).scale(scale).orient(orient);

            // Set tick format
            axis.tickFormat(getXAxisTickFormat());

            // Set categories
            if (isCategorized) {
                axis.categories(__axis_x_categories).tickCentered(__axis_x_tick_centered);
            } else {
                // TODO: fix
                axis.tickOffset = function () { return 0; };
            }

            return axis;
        }
        function getYAxis(scale, orient) {
            return d3.svg.axis().scale(scale).orient(orient);
        }
        function getAxisId(id) {
            return id in __data_axes ? __data_axes[id] : 'y';
        }
        function getXAxisTickFormat() {
            var tickFormat = isTimeSeries ? defaultTimeFormat : isCategorized ? category : function (x) { return x; };
            if (__axis_x_tick_format) {
                tickFormat = typeof __axis_x_tick_format === 'function' ? __axis_x_tick_format : isTimeSeries ? function (date) { return d3.time.format(__axis_x_tick_format)(date); } : tickFormat;
            }
            return tickFormat;
        }

        //-- Domain --//

        function getYDomainMin(targets) {
            return d3.min(targets, function (t) { return d3.min(t.values, function (v) { return v.value; }); });
        }
        function getYDomainMax(targets) {
            var ys = {}, j, k;

            targets.forEach(function (t) {
                ys[t.id] = [];
                t.values.forEach(function (v) {
                    ys[t.id].push(v.value);
                });
            });
            for (j = 0; j < __data_groups.length; j++) {
                for (k = 1; k < __data_groups[j].length; k++) {
                    if (! isBarType(__data_groups[j][k])) { continue; }
                    if (isUndefined(ys[__data_groups[j][k]])) { continue; }
                    ys[__data_groups[j][k]].forEach(function (v, i) {
                        if (getAxisId(__data_groups[j][k]) === getAxisId(__data_groups[j][0])) {
                            ys[__data_groups[j][0]][i] += v * 1;
                        }
                    });
                }
            }

            return d3.max(Object.keys(ys).map(function (key) { return d3.max(ys[key]); }));
        }
        function getYDomain(axisId) {
            var yTargets = getTargets(function (d) { return getAxisId(d.id) === axisId; }),
                yMin = axisId === 'y2' ? __axis_y2_min : __axis_y_min,
                yMax = axisId === 'y2' ? __axis_y2_max : __axis_y_max,
                yDomainMin = (yMin !== null) ? yMin : getYDomainMin(yTargets),
                yDomainMax = (yMax !== null) ? yMax : getYDomainMax(yTargets),
                padding = Math.abs(yDomainMax - yDomainMin) * 0.1,
                padding_top = padding, padding_bottom = padding,
                center = axisId === 'y2' ? __axis_y2_center : __axis_y_center;
            if (center !== null) {
                var yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));
                yDomainMax = yDomainAbs - center;
                yDomainMin = center - yDomainAbs;
            }
            if (axisId === 'y' && __axis_y_padding !== null) {
                padding_top = isDefined(__axis_y_padding.top) ? __axis_y_padding.top : padding;
                padding_bottom = isDefined(__axis_y_padding.bottom) ? __axis_y_padding.bottom : padding;
            }
            if (axisId === 'y2' && __axis_y2_padding !== null) {
                padding_top = isDefined(__axis_y2_padding.top) ? __axis_y2_padding.top : padding;
                padding_bottom = isDefined(__axis_y2_padding.bottom) ? __axis_y2_padding.bottom : padding;
            }
            return [hasBarType(yTargets) ? 0 : yDomainMin - padding_bottom, yDomainMax + padding_top];
        }
        function getXDomainRatio(isSub) {
            var domain, extent;
            if (isSub) {
                domain = x.domain();
                extent = brush.extent();
            } else {
                domain = orgXDomain;
                extent = x.domain();
            }
            return (domain[1] - domain[0]) / (extent[1] - extent[0]);
        }
        function getDefaultXDomain() {
            var padding = isCategorized ? 0 : Math.abs(lastX - firstX) * 0.01;
            return [firstX - padding, lastX + padding];
        }
        function diffDomain(d) {
            return d[1] - d[0];
        }

        //-- Cache --//

        function hasCaches(ids) {
            for (var i = 0; i < ids.length; i++) {
                if (! (ids[i] in cache)) { return false; }
            }
            return true;
        }
        function addCache(id, target) {
            cache[id] = cloneTarget(target);
        }
        function getCaches(ids) {
            var targets = [];
            for (var i = 0; i < ids.length; i++) {
                if (ids[i] in cache) { targets.push(cloneTarget(cache[ids[i]])); }
            }
            return targets;
        }

        //-- Regions --//

        function regionStart(d) {
            return ('start' in d) ? x(isTimeSeries ? parseDate(d.start) : d.start) : 0;
        }

        function regionWidth(d) {
            var start = regionStart(d),
                end = ('end' in d) ? x(isTimeSeries ? parseDate(d.end) : d.end) : width,
                w = end - start;
            return (w < 0) ? 0 : w;
        }

        //-- Data --//

        function isX(key) {
            return (__data_x && key === __data_x) || (__data_xs && hasValue(__data_xs, key));
        }
        function isNotX(key) {
            return !isX(key);
        }
        function getXKey(id) {
            return __data_x ? __data_x : __data_xs ? __data_xs[id] : null;
        }

        function addName(data) {
            var name = __data_names[data.id];
            data.name = isDefined(name) ? name : data.id;
            return data;
        }

        function convertRowsToData(rows) {
            var keys = rows[0], new_row = {}, new_rows = [], i, j;
            for (i = 1; i < rows.length; i++) {
                new_row = {};
                for (j = 0; j < rows[i].length; j++) {
                    new_row[keys[j]] = rows[i][j];
                }
                new_rows.push(new_row);
            }
            return new_rows;
        }
        function convertColumnsToData(columns) {
            var new_rows = [], i, j, key;
            for (i = 0; i < columns.length; i++) {
                key = columns[i][0];
                for (j = 1; j < columns[i].length; j++) {
                    if (isUndefined(new_rows[j - 1])) {
                        new_rows[j - 1] = {};
                    }
                    new_rows[j - 1][key] = columns[i][j];
                }
            }
            return new_rows;
        }
        function convertDataToTargets(data) {
            var ids = d3.keys(data[0]).filter(isNotX), xs = d3.keys(data[0]).filter(isX), targets;

            // check "x" is defined if timeseries
            if (isTimeSeries && xs.length === 0) {
                window.alert('data.x or data.xs must be specified when axis.x.type == "timeseries"');
                return [];
            }

            // save x for update data by load
            if (isCustomX) {
                ids.forEach(function (id) {
                    var xKey = getXKey(id);
                    if (xs.indexOf(xKey) >= 0) {
                        c3.data.x[id] = data.map(function (d) { return d[xKey]; });
                    }
                });
            }

            // convert to target
            targets = ids.map(function (id) {
                var convertedId = __data_id_converter(id);
                return {
                    id: convertedId,
                    id_org: id,
                    values: data.map(function (d, i) {
                        var x, xKey = getXKey(id);

                        if (isTimeSeries) {
                            x = parseDate(d[xKey]);
                        }
                        else if (isCustomX) {
                            x = d[xKey] ? d[xKey] : c3.data.x[id][i];
                        }
                        else {
                            x = i;
                        }

                        if (x < firstX || firstX === null) { firstX = x; }
                        if (lastX < x) { lastX = x; }

                        d.x = x; // used by event-rect

                        return {x: x, value: d[id] !== null && !isNaN(d[id]) ? +d[id] : null, id: convertedId};
                    })
                };
            });

            // finish targets
            targets.forEach(function (t) {
                var i;
                // sort values by its x
                t.values = t.values.sort(function (v1, v2) {
                    var x1 = v1.x || v1.x === 0 ? v1.x : Infinity,
                        x2 = v2.x || v2.x === 0 ? v2.x : Infinity;
                    return x1 - x2;
                });
                // indexing each value
                i = 0;
                t.values.forEach(function (v) {
                    v.index = i++;
                });
            });

            // cache as original id keyed
            targets.forEach(function (d) {
                addCache(d.id_org, d);
            });

            return targets;
        }
        function cloneTarget(target) {
            return {
                id : target.id,
                id_org : target.id_org,
                values : target.values.map(function (d) {
                    return {x: d.x, value: d.value, id: d.id};
                })
            };
        }
        function getPrevX(i) {
            return i > 0 ? c3.data.targets[0].values[i - 1].x : undefined;
        }
        function getNextX(i) {
            return i < maxDataCount() - 1 ? c3.data.targets[0].values[i + 1].x : undefined;
        }
        function maxDataCount() {
            return d3.max(c3.data.targets, function (t) { return t.values.length; });
        }
        function getTargetIds(targets) {
            targets = isUndefined(targets) ? c3.data.targets : targets;
            return targets.map(function (d) { return d.id; });
        }
        function hasTarget(id) {
            var ids = getTargetIds(), i;
            for (i = 0; i < ids.length; i++) {
                if (ids[i] === id) {
                    return true;
                }
            }
            return false;
        }
        function getTargets(filter) {
            return isDefined(filter) ? c3.data.targets.filter(filter) : c3.data.targets;
        }
        function category(i) {
            return i < __axis_x_categories.length ? __axis_x_categories[i] : i;
        }
        function classShapes(d) { return "-shapes -shapes-" + d.id; }
        function classLine(d) { return classShapes(d) + " -line -line-" + d.id; }
        function classCircles(d) { return classShapes(d) + " -circles -circles-" + d.id; }
        function classBars(d) { return classShapes(d) + " -bars -bars-" + d.id; }
        function classShape(d, i) { return "-shape -shape-" + i; }
        function classCircle(d, i) { return classShape(d, i) + " -circle -circle-" + i; }
        function classBar(d, i) { return classShape(d, i) + " -bar -bar-" + i; }
        function classRegion(d, i) { return 'region region-' + i + ' ' + ('classes' in d ? [].concat(d.classes).join(' ') : ''); }

        function xx(d) {
            return x(d.x);
        }
        function xv(d) {
            return x(isTimeSeries ? parseDate(d.value) : d.value);
        }
        function yv(d) {
            return y(d.value);
        }

        function findSameXOfValues(values, index) {
            var i, targetX = values[index].x, sames = [];
            for (i = index - 1; i >= 0; i--) {
                if (targetX !== values[i].x) { break; }
                sames.push(values[i]);
            }
            for (i = index; i < values.length; i++) {
                if (targetX !== values[i].x) { break; }
                sames.push(values[i]);
            }
            return sames;
        }

        function findClosestOfValues(values, pos, _min, _max) { // MEMO: values must be sorted by x
            var min = _min ? _min : 0,
                max = _max ? _max : values.length - 1,
                med = Math.floor((max - min) / 2) + min,
                value = values[med],
                diff = x(value.x) - pos[0],
                candidates;

            // Update range for search
            diff > 0 ? max = med : min = med;

            // if candidates are two closest min and max, stop recursive call
            if ((max - min) === 1) {

                // Get candidates that has same min and max index
                candidates = [];
                if (values[min].x) {
                    candidates = candidates.concat(findSameXOfValues(values, min));
                }
                if (values[max].x) {
                    candidates = candidates.concat(findSameXOfValues(values, max));
                }

                // Determine the closest and return
                return findClosest(candidates, pos);
            }

            return findClosestOfValues(values, pos, min, max);
        }
        function findClosestFromTargets(targets, pos) {
            var candidates;

            // map to array of closest points of each target
            candidates = targets.map(function (target) {
                return findClosestOfValues(target.values, pos);
            });

            // decide closest point and return
            return findClosest(candidates, pos);
        }
        function findClosest(values, pos) {
            var minDist, closest;
            values.forEach(function (v) {
                var d = dist(v, pos);
                if (d < minDist || ! minDist) {
                    minDist = d;
                    closest = v;
                }
            });
            return closest;
        }


        //-- Tooltip --//

        function showTooltip(selectedData, mouse) {
            // Construct tooltip
            tooltip.html(__tooltip_contents(selectedData))
                .style("visibility", "hidden")
                .style("display", "block");
            // Get tooltip dimensions
            var tWidth = tooltip.property('offsetWidth'),
                tHeight = tooltip.property('offsetHeight');
            // Set tooltip
            // todo get rid of magic numbers
            tooltip
                .style("top", (mouse[1] + 15 + tHeight < getCurrentHeight() ? mouse[1] + 15 : mouse[1] - tHeight) + "px")
                .style("left", ((__axis_rotated ?
                  mouse[0] :
                  (x(selectedData[0].x) + 60 + tWidth < getCurrentWidth()) ?
                      (x(selectedData[0].x) + 60) + "px" : (x(selectedData[0].x) - tWidth + 30) + "px"
                )))
                .style("visibility", "visible");
        }
        function hideTooltip() {
            tooltip.style("display", "none");
        }

        function showXGridFocus(data) {
            // Hide when scatter plot exists
            if (hasScatterType(c3.data.targets)) { return; }
            main.selectAll('line.xgrid-focus')
                .style("visibility", "visible")
                .data([data])
                .attr(__axis_rotated ? 'y1' : 'x1', xx)
                .attr(__axis_rotated ? 'y2' : 'x2', xx);
        }
        function hideXGridFocus() {
            main.select('line.xgrid-focus').style("visibility", "hidden");
        }

        //-- Circle --//

        function circleX(d) {
            return d.x || d.x === 0 ? x(d.x) : null;
        }
        function circleY(d) {
            return getYScale(d.id)(d.value);
        }

        //-- Bar --//

        function getBarIndices() {
            var indices = {}, i = 0, j, k;
            getTargets(isBarType).forEach(function (d) {
                for (j = 0; j < __data_groups.length; j++) {
                    if (__data_groups[j].indexOf(d.id) < 0) { continue; }
                    for (k = 0; k < __data_groups[j].length; k++) {
                        if (__data_groups[j][k] in indices) {
                            indices[d.id] = indices[__data_groups[j][k]];
                            break;
                        }
                    }
                }
                if (isUndefined(indices[d.id])) { indices[d.id] = i++; }
            });
            indices.__max__ = i - 1;
            return indices;
        }
        function getBarX(barW, barTargetsNum, barIndices, isSub) {
            var scale = isSub ? subX : x;
            if (! barTargetsNum) { return function () { return 0; }; }
            return function (d) {
                var barIndex = d.id in barIndices ? barIndices[d.id] : 0;
                return d.x || d.x === 0 ? scale(d.x) - barW * (barTargetsNum / 2 - barIndex) : 0;
            };
        }
        function getBarY(barH, barIndices, zeroBased, isSub) {
            var indicesIds = Object.keys(barIndices);
            return function (d, i) {
                var offset = 0;
                var scale = isSub ? getSubYScale(d.id) : getYScale(d.id);
                getTargets(isBarType).forEach(function (t) {
                    if (t.id === d.id || barIndices[t.id] !== barIndices[d.id]) { return; }
                    if (indicesIds.indexOf(t.id) < indicesIds.indexOf(d.id)) {
                        offset += barH(t.values[i]);
                    }
                });
                return zeroBased ? offset : scale(d.value) - offset;
            };
        }
        function getBarW(axis, barTargetsNum, isSub) {
            var barW;
            if (isCategorized) {
                barW = barTargetsNum ? (axis.tickOffset() * 2 * 0.6) / barTargetsNum : 0;
            } else {
                barW = (((__axis_rotated ? height : width) * getXDomainRatio(isSub)) / (maxDataCount() - 1)) * 0.6;
            }
            return barW;
        }
        function getBarH(height, isSub) {
            var h = height === null ? function (v) { return v; } : function (v) { return height > v ? height - v : 0; };
            return function (d) {
                var scale = isSub ? getSubYScale(d.id) : getYScale(d.id);
                return h(scale(d.value));
            };
        }

        //-- Type --//

        function setTargetType(targets, type) {
            var targetIds = isUndefined(targets) ? getTargetIds() : targets;
            if (typeof targetIds === 'string') { targetIds = [targetIds]; }
            for (var i = 0; i < targetIds.length; i++) {
                __data_types[targetIds[i]] = type;
            }
        }
        function hasType(targets, type) {
            var has = false;
            targets.forEach(function (t) {
                if (__data_types[t.id] === type) { has = true; }
                if (!(t.id in __data_types) && type === 'line') { has = true; }
            });
            return has;
        }
        /* not used
        function hasLineType(targets) {
            return hasType(targets, 'line');
        }
        */
        function hasBarType(targets) {
            return hasType(targets, 'bar');
        }
        function hasScatterType(targets) {
            return hasType(targets, 'scatter');
        }
        function isLineType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return !(id in __data_types) || __data_types[id] === 'line' || __data_types[id] === 'spline';
        }
        function isSplineType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'spline';
        }
        function isBarType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'bar';
        }
        function isScatterType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'scatter';
        }
        /* not used
        function lineData(d) {
            return isLineType(d) ? d.values : [];
        }
        function scatterData(d) {
            return isScatterType(d) ? d.values : [];
        }
        */
        function barData(d) {
            return isBarType(d) ? d.values : [];
        }
        function lineOrScatterData(d) {
            return isLineType(d) || isScatterType(d) ? d.values : [];
        }

        //-- Color --//

        function generateColor(_colors, _pattern) {
            var ids = [],
                colors = _colors,
                pattern = (_pattern !== null) ? _pattern : ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']; //same as d3.scale.category10()

            return function (id) {
                // if specified, choose that color
                if (id in colors) { return _colors[id]; }

                // if not specified, choose from pattern
                if (ids.indexOf(id) === -1) {
                    ids.push(id);
                }
                return pattern[ids.indexOf(id) % pattern.length];
            };
        }

        //-- Date --//

        function parseDate(date) {
            var parsedDate;
            if (!date) { throw Error(date + " can not be parsed as d3.time with format " + __data_x_format + ". Maybe 'x' of this data is not defined. See data.x or data.xs option."); }
            parsedDate = d3.time.format(__data_x_format).parse(date);
            if (!parsedDate) { throw Error("Failed to parse '" + date + "' with format " + __data_x_format); }
            return parsedDate;
        }

        //-- Util --//

        function isWithinCircle(_this, _r) {
            var mouse = d3.mouse(_this), d3_this = d3.select(_this);
            var cx = d3_this.attr("cx") * 1, cy = d3_this.attr("cy") * 1;
            return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < _r;
        }
        function isWithinBar(_this) {
            var mouse = d3.mouse(_this), d3_this = d3.select(_this);
            var x = d3_this.attr("x") * 1, y = d3_this.attr("y") * 1, w = d3_this.attr("width") * 1;
            var sx = x - 10, ex = x + w + 10, ey = y - 10;
            return sx < mouse[0] && mouse[0] < ex && ey < mouse[1];
        }
        function isWithinRegions(x, regions) {
            var i;
            for (i = 0; i < regions.length; i++) {
                if (regions[i].start < x && x <= regions[i].end) { return true; }
            }
            return false;
        }

        function hasValue(dict, value) {
            var found = false;
            Object.keys(dict).forEach(function (key) {
                if (dict[key] === value) { found = true; }
            });
            return found;
        }

        function dist(data, pos) {
            return Math.pow(x(data.x) - pos[0], 2) + Math.pow(y(data.value) - pos[1], 2);
        }

        //-- Selection --//

        function selectPoint(target, d, i) {
            __point_onselected(target, d);
            // add selected-circle on low layer g
            main.select(".selected-circles-" + d.id).selectAll('.selected-circle-' + i)
                .data([d])
              .enter().append('circle')
                .attr("class", function () { return "selected-circle selected-circle-" + i; })
                .attr("cx", __axis_rotated ? circleY : circleX)
                .attr("cy", __axis_rotated ? circleX : circleY)
                .attr("stroke", function () { return color(d.id); })
                .attr("r", __point_select_r * 1.4)
              .transition().duration(100)
                .attr("r", __point_select_r);
        }
        function unselectPoint(target, d, i) {
            __point_onunselected(target, d);
            // remove selected-circle from low layer g
            main.select(".selected-circles-" + d.id).selectAll(".selected-circle-" + i)
              .transition().duration(100).attr('r', 0)
                .remove();
        }
        function togglePoint(selected, target, d, i) {
            (selected) ? selectPoint(target, d, i) : unselectPoint(target, d, i);
        }

        function selectBar() {
        }
        function unselectBar() {
        }
        function toggleBar(selected, target, d, i) {
            (selected) ? selectBar(target, d, i) : unselectBar(target, d, i);
        }

        function filterRemoveNull(data) {
            return data.filter(function (d) { return d.value !== null; });
        }

        //-- Shape --//

        function getCircles(i, id) {
            return (id ? main.selectAll('.-circles-' + id) : main).selectAll('.-circle' + (i || i === 0 ? '-' + i : ''));
        }
        function expandCircles(i, id) {
            getCircles(i, id)
                .classed(EXPANDED, true)
                .attr('r', __point_focus_expand_r);
        }
        function unexpandCircles(i) {
            getCircles(i)
                .filter(function () { return d3.select(this).classed(EXPANDED); })
                .classed(EXPANDED, false)
                .attr('r', __point_r);
        }
        function getBars(i) {
            return main.selectAll(".-bar" + (i || i === 0 ? '-' + i : ''));
        }
        function expandBars(i) {
            getBars(i).classed(EXPANDED, false);
        }
        function unexpandBars(i) {
            getBars(i).classed(EXPANDED, false);
        }

        // For main region
        var lineOnMain = (function () {
            var line = d3.svg.line()
                .x(__axis_rotated ? function (d) { return getYScale(d.id)(d.value); } : xx)
                .y(__axis_rotated ? xx : function (d) { return getYScale(d.id)(d.value); });
            return function (d) {
                var data = filterRemoveNull(d.values), x0, y0;
                if (isLineType(d)) {
                    isSplineType(d) ? line.interpolate("cardinal") : line.interpolate("linear");
                    return __data_regions[d.id] ? lineWithRegions(data, x, getYScale(d.id), __data_regions[d.id]) : line(data);
                } else {
                    x0 = x(data[0].x);
                    y0 = getYScale(d.id)(data[0].value);
                    return __axis_rotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;
                }
            };
        })();

        // For brush region
        var lineOnSub = (function () {
            var line = d3.svg.line()
                .x(function (d) { return subX(d.x); })
                .y(function (d) { return getSubYScale(d.id)(d.value); });
            return function (d) {
                var data = filterRemoveNull(d.values);
                return isLineType(d) ? line(data) : "M " + subX(data[0].x) + " " + getSubYScale(d.id)(data[0].value);
            };
        })();

        function lineWithRegions(d, x, y, _regions) {
            var prev = -1, i, j;
            var s = "M", sWithRegion;
            var xp, yp, dx, dy, dd, diff;
            var xValue, yValue;
            var regions = [];

            // Check start/end of regions
            if (isDefined(_regions)) {
                for (i = 0; i < _regions.length; i++) {
                    regions[i] = {};
                    if (isUndefined(_regions[i].start)) {
                        regions[i].start = d[0].x;
                    } else {
                        regions[i].start = isTimeSeries ? parseDate(_regions[i].start) : _regions[i].start;
                    }
                    if (isUndefined(_regions[i].end)) {
                        regions[i].end = d[d.length - 1].x;
                    } else {
                        regions[i].end = isTimeSeries ? parseDate(_regions[i].end) : _regions[i].end;
                    }
                }
            }

            // Set scales
            xValue = __axis_rotated ? function (d) { return y(d.value); } : function (d) { return x(d.x); };
            yValue = __axis_rotated ? function (d) { return x(d.x); } : function (d) { return y(d.value); };

            // Define svg generator function for region
            if (isTimeSeries) {
                sWithRegion = function (d0, d1, j, diff) {
                    var x0 = d0.x.getTime(), x_diff = d1.x - d0.x,
                        xv0 = new Date(x0 + x_diff * j),
                        xv1 = new Date(x0 + x_diff * (j + diff));
                    return "M" + x(xv0) + " " + y(yp(j)) + " " + x(xv1) + " " + y(yp(j + diff));
                };
            } else {
                sWithRegion = function (d0, d1, j, diff) {
                    return "M" + x(xp(j)) + " " + y(yp(j)) + " " + x(xp(j + diff)) + " " + y(yp(j + diff));
                };
            }

            // Generate
            for (i = 0; i < d.length; i++) {
                // Draw as normal
                if (isUndefined(regions) || ! isWithinRegions(d[i].x, regions)) {
                    s += " " + xValue(d[i]) + " " + yValue(d[i]);
                }
                // Draw with region // TODO: Fix for horizotal charts
                else {
                    xp = getX(d[i - 1].x, d[i].x);
                    yp = getY(d[i - 1].value, d[i].value);

                    dx = x(d[i].x) - x(d[i - 1].x);
                    dy = y(d[i].value) - y(d[i - 1].value);
                    dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                    diff = 2 / dd;
                    var diffx2 = diff * 2;

                    for (j = diff; j <= 1; j += diffx2) {
                        s += sWithRegion(d[i - 1], d[i], j, diff);
                    }
                }
                prev = d[i].x;
            }

            return s;
        }

        //-- Define brush/zoom -//

        var brush = d3.svg.brush().on("brush", redrawForBrush);
        var zoom = d3.behavior.zoom().on("zoomstart", function () { zoom.altDomain = d3.event.sourceEvent.altKey ? x.orgDomain() : null; }).on("zoom", __zoom_enabled ? redrawForZoom : null);

        // define functions for c3
        brush.update = function () {
            if (context) { context.select('.x.brush').call(this); }
            return this;
        };
        zoom.orgScaleExtent = function () {
            var extent = __zoom_extent ? __zoom_extent : [1, 10];
            return [extent[0], Math.max(maxDataCount() / extent[1], extent[1])];
        };
        zoom.updateScaleExtent = function () {
            var ratio = diffDomain(x.orgDomain()) / diffDomain(orgXDomain), extent = this.orgScaleExtent();
            this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);
            return this;
        };

        /*-- Draw Chart --*/

        // for svg elements
        var svg, defs, main, context, legend, tooltip, selectChart;

        // for brush area culculation
        var firstX = null, lastX = null, orgXDomain;

        function init(data) {
            var eventRect, grid, xgridLine;
            var i;

            selectChart = d3.select(__bindto);
            if (selectChart.empty()) {
                window.alert('No bind element found. Check the selector specified by "bindto" and existance of that element. Default "bindto" is "#chart".');
                return;
            } else {
                selectChart.html("");
            }

            // Init data as targets
            c3.data.x = {};
            c3.data.targets = convertDataToTargets(data);

            // TODO: set names if names not specified

            // Set data type if data.type is specified
            if (__data_type) {
                setTargetType(getTargetIds().filter(function (id) { return ! (id in __data_types); }), __data_type);
            }

            // Init sizes and scales
            updateSizes();
            updateScales();

            // Set domains for each scale
            x.domain(d3.extent(getDefaultXDomain()));
            y.domain(getYDomain('y'));
            y2.domain(getYDomain('y2'));
            subX.domain(x.domain());
            subY.domain(y.domain());
            subY2.domain(y2.domain());

            // Set axes attrs
            xAxis.ticks(data.length < 10 ? data.length : 10);
            yAxis.ticks(__axis_y_ticks).outerTickSize(0).tickFormat(__axis_y_tick_format);
            yAxis2.ticks(__axis_y2_ticks).outerTickSize(0).tickFormat(__axis_y2_tick_format);

            // Save original x domain for zoom update
            orgXDomain = x.domain();

            // Set initialized scales to brush and zoom
            brush.x(subX);
            if (__zoom_enabled) { zoom.x(x); }

            /*-- Basic Elements --*/

            // Define svgs
            svg = d3.select(__bindto).append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .on('mouseenter', __onenter)
                .on('mouseleave', __onleave);

            // Define defs
            defs = svg.append("defs");
            defs.append("clipPath")
                .attr("id", clipId)
              .append("rect")
                .attr("y", margin.top)
                .attr("width", width)
                .attr("height", height - margin.top);
            defs.append("clipPath")
                .attr("id", "xaxis-clip")
              .append("rect")
                .attr("x", -1 - margin.left)
                .attr("y", -20)
                .attr("width", getXAxisClipWidth)
                .attr("height", getXAxisClipHeight);
            defs.append("clipPath")
                .attr("id", "yaxis-clip")
              .append("rect")
                .attr("x", -margin.left + 1)
                .attr("y", margin.top - 1)
                .attr("width", getYAxisClipWidth)
                .attr("height", getYAxisClipHeight);

            // Define regions
            main = svg.append("g").attr("transform", translate.main);
            context = __subchart_show ? svg.append("g").attr("transform", translate.context) : null;
            legend = __legend_show ? svg.append("g").attr("transform", translate.legend) : null;

            // Define tooltip
            tooltip = d3.select(__bindto)
                .style("position", "relative")
              .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("display", "none");

            /*-- Main Region --*/

            // Add Axis
            main.append("g")
                .attr("class", "x axis")
                .attr("clip-path", __axis_rotated ? "" : "url(#xaxis-clip)")
                .attr("transform", translate.x)
                .call(__axis_rotated ? yAxis : xAxis)
              .append("text")
                .attr("class", "-axis-x-label")
                .attr("x", width)
                .attr("dy", "-.5em")
                .style("text-anchor", "end")
                .text(__axis_x_label);
            main.append("g")
                .attr("class", "y axis")
                .attr("clip-path", __axis_rotated ? "url(#yaxis-clip)" : "")
                .call(__axis_rotated ? xAxis : yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("dy", "1.2em")
                .attr("dx", "-.5em")
                .style("text-anchor", "end")
                .text(__axis_y_label);

            if (__axis_y2_show) {
                main.append("g")
                    .attr("class", "y2 axis")
                    .attr("transform", translate.y2)
                    .call(yAxis2);
            }

            // Grids
            grid = main.append('g')
                .attr("clip-path", clipPath)
                .attr('class', 'grid');

            // X-Grid
            if (__grid_x_show) {
                grid.append("g").attr("class", "xgrids");
            }
            if (__grid_x_lines) {
                xgridLine = grid.append('g')
                    .attr("class", "xgrid-lines")
                  .selectAll('.xgrid-line')
                    .data(__grid_x_lines)
                  .enter().append('g')
                    .attr("class", "xgrid-line");
                xgridLine.append('line')
                    .attr("class", function (d) { return "" + d['class']; });
                xgridLine.append('text')
                    .attr("class", function (d) { return "" + d['class']; })
                    .attr("text-anchor", "end")
                    .attr("transform", __axis_rotated ? "" : "rotate(-90)")
                    .attr('dx', __axis_rotated ? 0 : -margin.top)
                    .attr('dy', -6)
                    .text(function (d) { return d.text; });
            }
            if (__point_focus_line_enabled) {
                grid.append('g')
                    .attr("class", "xgrid-focus")
                  .append('line')
                    .attr('class', 'xgrid-focus')
                    .attr("x1", __axis_rotated ? 0 : -10)
                    .attr("x2", __axis_rotated ? width : -10)
                    .attr("y1", __axis_rotated ? -10 : margin.top)
                    .attr("y2", __axis_rotated ? -10 : height);
            }

            // Y-Grid
            if (__grid_y_show) {
                grid.append('g').attr('class', 'ygrids');
            }
            if (__grid_y_lines) {
                grid.append('g')
                    .attr('class', 'ygrid-lines')
                  .selectAll('ygrid-line')
                    .data(__grid_y_lines)
                  .enter().append('line')
                    .attr("class", function (d) { return "ygrid-line " + d['class']; });
            }

            // Area
            main.append('g')
                .attr("clip-path", clipPath)
                .attr("class", "regions");

            // Define g for chart area
            main.append('g')
                .attr("clip-path", clipPath)
                .attr('class', 'chart');

            // Cover whole with rects for events
            eventRect = main.select('.chart').append("g")
                .attr("class", "event-rects")
                .style('fill-opacity', 0)
                .style('cursor', __zoom_enabled ? 'ew-resize' : null);

            // Generate rect for event handling
            __data_xs ? generateEventRectsForMultipleXs(eventRect) : generateEventRectsForSingleX(eventRect, data);

            // Define g for bar chart area
            main.select(".chart").append("g")
                .attr("class", "chart-bars");

            // Define g for line chart area
            main.select(".chart").append("g")
                .attr("class", "chart-lines");

            if (__zoom_enabled) { // TODO: __zoom_privileged here?
                // if zoom privileged, insert rect to forefront
                main.insert('rect', __zoom_privileged ? null : 'g.grid')
                    .attr('class', 'zoom-rect')
                    .attr('width', width)
                    .attr('height', height)
                    .style('opacity', 0)
                    .style('cursor', 'ew-resize')
                    .call(zoom).on("dblclick.zoom", null);
            }

            // Set default extent if defined
            if (__axis_x_default !== null) {
                brush.extent(typeof __axis_x_default !== 'function' ? __axis_x_default : __axis_x_default(firstX, lastX));
            }

            /*-- Context Region --*/

            if (__subchart_show) {
                // Define g for chart area
                context.append('g')
                    .attr("clip-path", clipPath)
                    .attr('class', 'chart');

                // Define g for bar chart area
                context.select(".chart").append("g")
                    .attr("class", "chart-bars");

                // Define g for line chart area
                context.select(".chart").append("g")
                    .attr("class", "chart-lines");

                // Add extent rect for Brush
                context.append("g")
                    .attr("clip-path", clipPath)
                    .attr("class", "x brush")
                    .call(brush)
                  .selectAll("rect")
                    .attr("height", height2);

                // ATTENTION: This must be called AFTER chart added
                // Add Axis
                context.append("g")
                    .attr("class", "x axis")
                    .attr("transform", translate.subx)
                    .call(subXAxis);
            }

            /*-- Legend Region --*/

            if (__legend_show) { updateLegend(c3.data.targets); }

            // Set targets
            updateTargets(c3.data.targets);

            // Draw with targets
            redraw({withTransition: false, withUpdateXDomain: true});

            // Show tooltip if needed
            if (__tooltip_init_show) {
                if (isTimeSeries && typeof __tooltip_init_x === 'string') {
                    __tooltip_init_x = parseDate(__tooltip_init_x);
                    for (i = 0; i < c3.data.targets[0].values.length; i++) {
                        if ((c3.data.targets[0].values[i].x - __tooltip_init_x) === 0) { break; }
                    }
                    __tooltip_init_x = i;
                }
                tooltip.html(__tooltip_contents(c3.data.targets.map(function (d) {
                    return addName(d.values[__tooltip_init_x]);
                })));
                tooltip.style("top", __tooltip_init_position.top)
                       .style("left", __tooltip_init_position.left)
                       .style("display", "block");
            }

            // Bind resize event
            if (window.onresize == null) {
                window.onresize = resize;
            }
        }

        function generateEventRectsForSingleX(eventRect, data) {
            eventRect
              .selectAll(".event-rects")
                .data(data)
              .enter().append("rect")
                .attr("class", function (d, i) { return "event-rect event-rect-" + i; })
                .style("cursor", __data_selection_enabled && __data_selection_grouped ? "pointer" : null)
                .on('mouseover', function (d, i) {
                    if (dragging) { return; } // do nothing if dragging

                    var selectedData = c3.data.targets.map(function (d) { return addName(d.values[i]); });
                    var j, newData;

                    // Sort selectedData as names order
                    if (Object.keys(__data_names).length > 0) {
                        newData = [];
                        for (var id in __data_names) {
                            for (j = 0; j < selectedData.length; j++) {
                                if (selectedData[j].id === id) {
                                    newData.push(selectedData[j]);
                                    selectedData.shift(j);
                                    break;
                                }
                            }
                        }
                        selectedData = newData.concat(selectedData); // Add remained
                    }

                    // Expand shapes if needed
                    if (__point_focus_expand_enabled) { expandCircles(i); }
                    expandBars(i);

                    // Show xgrid focus line
                    showXGridFocus(selectedData[0]);
                })
                .on('mouseout', function (d, i) {
                    hideXGridFocus();
                    hideTooltip();
                    // Undo expanded shapes
                    unexpandCircles(i);
                    unexpandBars();
                })
                .on('mousemove', function (d, i) {
                    var selectedData;

                    if (dragging) { return; } // do nothing when dragging

                    // Show tooltip
                    selectedData = c3.data.targets.map(function (d) {
                        return addName(d.values[i]);
                    });
                    showTooltip(selectedData, d3.mouse(this));

                    if (! __data_selection_enabled) { return; }
                    if (__data_selection_grouped) { return; } // nothing to do when grouped

                    main.selectAll('.-shape-' + i)
                        .filter(function (d) { return __data_selection_isselectable(d); })
                        .each(function () {
                            var _this = d3.select(this).classed(EXPANDED, true);
                            if (this.nodeName === 'circle') { _this.attr('r', __point_focus_expand_r); }
                            d3.select('.event-rect-' + i).style('cursor', null);
                        })
                        .filter(function () {
                            var _this = d3.select(this);
                            if (this.nodeName === 'circle') {
                                return isWithinCircle(this, __point_select_r);
                            }
                            else if (this.nodeName === 'rect') {
                                return isWithinBar(this, _this.attr('x'), _this.attr('y'));
                            }
                        })
                        .each(function () {
                            var _this = d3.select(this);
                            if (! _this.classed(EXPANDED)) {
                                _this.classed(EXPANDED, true);
                                if (this.nodeName === 'circle') { _this.attr('r', __point_select_r); }
                            }
                            d3.select('.event-rect-' + i).style('cursor', 'pointer');
                        });
                })
                .on('click', function (d, i) {
                    if (cancelClick) {
                        cancelClick = false;
                        return;
                    }
                    main.selectAll('.-shape-' + i).each(function (d) { selectShape(this, d, i); });
                })
                .call(
                    d3.behavior.drag().origin(Object)
                        .on('drag', function () { drag(d3.mouse(this)); })
                        .on('dragstart', function () { dragstart(d3.mouse(this)); })
                        .on('dragend', function () { dragend(); })
                )
                .call(zoom).on("dblclick.zoom", null);
        }

        function generateEventRectsForMultipleXs(eventRect) {
            eventRect.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width)
                .attr('height', height)
                .attr('class', "event-rect")
                .on('mouseout', function () {
                    hideXGridFocus();
                    hideTooltip();
                    unexpandCircles();
                })
                .on('mousemove', function () {
                    var mouse, closest, selectedData;

                    if (dragging) { return; } // do nothing when dragging

                    mouse = d3.mouse(this);
                    closest = findClosestFromTargets(c3.data.targets, mouse);

                    // show tooltip when cursor is close to some point
                    selectedData = [addName(closest)];
                    showTooltip(selectedData, mouse);

                    // expand points
                    if (__point_focus_expand_enabled) {
                        unexpandCircles();
                        expandCircles(closest.index, closest.id);
                    }

                    // Show xgrid focus line
                    showXGridFocus(selectedData[0]);

                    // Show cursor as pointer if point is close to mouse position
                    if (dist(closest, mouse) < 100) {
                        d3.select('.event-rect').style('cursor', 'pointer');
                    } else {
                        d3.select('.event-rect').style('cursor', null);
                    }
                })
                .on('click', function () {
                    var mouse = d3.mouse(this),
                        closest = findClosestFromTargets(c3.data.targets, mouse);

                    // select if selection enabled
                    if (dist(closest, mouse) < 100) {
                        main.select('.-circles-' + closest.id).select('.-circle-' + closest.index).each(function () {
                            selectShape(this, closest, closest.index);
                        });
                    }
                })
                .call(
                    d3.behavior.drag().origin(Object)
                        .on('drag', function () { drag(d3.mouse(this)); })
                        .on('dragstart', function () { dragstart(d3.mouse(this)); })
                        .on('dragend', function () { dragend(); })
                )
                .call(zoom).on("dblclick.zoom", null);
        }

        function selectShape(target, d, i) {
            var _this = d3.select(target),
                isSelected = _this.classed(SELECTED);
            var isWithin = false, toggle;
            if (target.nodeName === 'circle') {
                isWithin = isWithinCircle(target, __point_select_r * 1.5);
                toggle = togglePoint;
            }
            else if (target.nodeName === 'rect') {
                isWithin = isWithinBar(target);
                toggle = toggleBar;
            }
            if (__data_selection_grouped || isWithin) {
                if (__data_selection_enabled && __data_selection_isselectable(d)) {
                    _this.classed(SELECTED, !isSelected);
                    toggle(!isSelected, _this, d, i);
                }
                __point_onclick(d, _this); // TODO: should be __data_onclick
            }
        }

        function drag(mouse) {
            if (! __data_selection_enabled) { return; } // do nothing if not selectable
            if (__zoom_enabled && ! zoom.altDomain) { return; } // skip if zoomable because of conflict drag dehavior

            var sx = dragStart[0], sy = dragStart[1],
                mx = mouse[0],
                my = mouse[1],
                minX = Math.min(sx, mx),
                maxX = Math.max(sx, mx),
                minY = (__data_selection_grouped) ? margin.top : Math.min(sy, my),
                maxY = (__data_selection_grouped) ? height : Math.max(sy, my);
            main.select('.dragarea')
                .attr('x', minX)
                .attr('y', minY)
                .attr('width', maxX - minX)
                .attr('height', maxY - minY);
            // TODO: binary search when multiple xs
            main.selectAll('.-shapes').selectAll('.-shape')
                .filter(function (d) { return __data_selection_isselectable(d); })
                .each(function (d, i) {
                    var _this = d3.select(this),
                        isSelected = _this.classed(SELECTED),
                        isIncluded = _this.classed(INCLUDED),
                        _x, _y, _w, toggle, isWithin = false;
                    if (this.nodeName === 'circle') {
                        _x = _this.attr("cx") * 1;
                        _y = _this.attr("cy") * 1;
                        toggle = togglePoint;
                        isWithin = minX < _x && _x < maxX && minY < _y && _y < maxY;
                    }
                    else if (this.nodeName === 'rect') {
                        _x = _this.attr("x") * 1;
                        _y = _this.attr("y") * 1;
                        _w = _this.attr('width') * 1;
                        toggle = toggleBar;
                        isWithin = minX < _x + _w && _x < maxX && _y < maxY;
                    }
                    if (isWithin ^ isIncluded) {
                        _this.classed(INCLUDED, !isIncluded);
                        // TODO: included/unincluded callback here
                        _this.classed(SELECTED, !isSelected);
                        toggle(!isSelected, _this, d, i);
                    }
                });
        }

        function dragstart(mouse) {
            if (! __data_selection_enabled) { return; } // do nothing if not selectable
            dragStart = mouse;
            main.select('.chart').append('rect')
                .attr('class', 'dragarea')
                .style('opacity', 0.1);
            dragging = true;
            // TODO: add callback here
        }

        function dragend() {
            if (! __data_selection_enabled) { return; } // do nothing if not selectable
            main.select('.dragarea')
                .transition().duration(100)
                .style('opacity', 0)
                .remove();
            main.selectAll('.-shape')
                .classed(INCLUDED, false);
            dragging = false;
            // TODO: add callback here
            
        }

        function redraw(options) {
            var xgrid, xgridData, xgridLine;
            var mainCircle, mainBar;
            var barIndices = getBarIndices(), barTargetsNum = barIndices.__max__ + 1;
            var barX, barY, barW, barH;
            var rectX, rectW;
            var withY, withSubchart, withTransition, withUpdateXDomain;
            var duration;

            options = isDefined(options) ? options : {};
            withY = isDefined(options.withY) ? options.withY : true;
            withSubchart = isDefined(options.withSubchart) ? options.withSubchart : true;
            withTransition = isDefined(options.withTransition) ? options.withTransition : true;
            withUpdateXDomain = isDefined(options.withUpdateXDomain) ? options.withUpdateXDomain : false;

            duration = withTransition ? 250 : 0;

            // ATTENTION: call here to update tickOffset
            if (withUpdateXDomain) {
                x.domain(brush.empty() ? orgXDomain : brush.extent());
                if (__zoom_enabled) { zoom.x(x).updateScaleExtent(); }
            }
            y.domain(getYDomain('y'));
            y2.domain(getYDomain('y2'));

            main.select(".x.axis").transition().duration(__axis_rotated ? duration : 0).call(__axis_rotated ? yAxis : xAxis);
            main.select(".y.axis").transition().duration(__axis_rotated ? 0 : duration).call(__axis_rotated ? xAxis : yAxis);
            main.select(".y2.axis").transition().call(yAxis2);

            // Update label position
            main.select(".x.axis .-axis-x-label").attr("x", width);

            // Update sub domain
            subY.domain(y.domain());
            subY2.domain(y2.domain());

            // tooltip
            tooltip.style("display", "none");

            // grid
            main.select('line.xgrid-focus')
                .style("visibility", "hidden")
                .attr('y2', height);
            if (__grid_x_show) {
                if (__grid_x_type === 'year') {
                    xgridData = [];
                    var firstYear = firstX.getFullYear();
                    var lastYear = lastX.getFullYear();
                    for (var year = firstYear; year <= lastYear; year++) {
                        xgridData.push(new Date(year + '-01-01 00:00:00'));
                    }
                } else {
                    xgridData = x.ticks(10);
                }

                xgrid = main.select('.xgrids').selectAll(".xgrid")
                    .data(xgridData);
                xgrid.enter().append('line').attr("class", "xgrid");
                xgrid.attr("x1", __axis_rotated ? 0 : function (d) { return x(d) - xAxis.tickOffset(); })
                    .attr("x2", __axis_rotated ? width : function (d) { return x(d) - xAxis.tickOffset(); })
                    .attr("y1", __axis_rotated ? function (d) { return x(d) - xAxis.tickOffset(); } : margin.top)
                    .attr("y2", __axis_rotated ? function (d) { return x(d) - xAxis.tickOffset(); } : height)
                    .style("opacity", function () { return +d3.select(this).attr(__axis_rotated ? 'y1' : 'x1') === (__axis_rotated ? height : 0) ? 0 : 1; });
                xgrid.exit().remove();
            }
            if (__grid_x_lines) {
                xgridLine = main.selectAll(".xgrid-lines");
                xgridLine.selectAll('line')
                    .attr("x1", __axis_rotated ? 0 : xv)
                    .attr("x2", __axis_rotated ? width : xv)
                    .attr("y1", __axis_rotated ? xv : margin.top)
                    .attr("y2", __axis_rotated ? xv : height);
                xgridLine.selectAll('text')
                    .attr("x", __axis_rotated ? width : 0)
                    .attr("y", xv);
            }
            // Y-Grid
            if (withY && __grid_y_show) {
                var ygrid = main.select('.ygrids').selectAll(".ygrid")
                    .data(y.ticks(10));
                ygrid.enter().append('line')
                    .attr('class', 'ygrid');
                ygrid.attr("x1", __axis_rotated ? y : 0)
                     .attr("x2", __axis_rotated ? y : width)
                     .attr("y1", __axis_rotated ? 0 : y)
                     .attr("y2", __axis_rotated ? height : y);
                ygrid.exit().remove();
            }
            if (withY && __grid_y_lines) {
                main.select('.ygrid-lines').selectAll('.ygrid-line')
                    .attr("y1", yv)
                    .attr("y2", yv);
            }

            // bars
            barW = getBarW(xAxis, barTargetsNum, false);
            barH = getBarH(__axis_rotated ? null : height);
            barX = getBarX(barW, barTargetsNum, barIndices);
            barY = getBarY(barH, barIndices, __axis_rotated);
            mainBar = main.selectAll('.-bars').selectAll('.-bar')
                .data(barData);
            mainBar.transition().duration(duration)
                .attr("x", __axis_rotated ? barY : barX)
                .attr("y", __axis_rotated ? barX : barY)
                .attr("width", __axis_rotated ? barH : barW)
                .attr("height", __axis_rotated ? barW : barH);
            mainBar.enter().append('rect')
                .attr("class", classBar)
                .attr("x", __axis_rotated ? barY : barX)
                .attr("y", __axis_rotated ? barX : barY)
                .attr("width", __axis_rotated ? barH : barW)
                .attr("height", __axis_rotated ? barW : barH)
                .style("opacity", 0)
              .transition().duration(duration)
                .style('opacity', 1);
            mainBar.exit().transition().duration(duration)
                .style('opacity', 0)
                .remove();

            // lines and cricles
            main.selectAll('.-line')
              .transition().duration(duration)
                .attr("d", lineOnMain);
            mainCircle = main.selectAll('.-circles').selectAll('.-circle')
                .data(lineOrScatterData);
            mainCircle.transition().duration(duration)
                .style('opacity', function (d) { return d.value === null ? 0 : 1; })
                .attr("cx", __axis_rotated ? circleY : circleX)
                .attr("cy", __axis_rotated ? circleX : circleY);
            mainCircle.enter().append("circle")
                .style('opacity', function (d) { return d.value === null ? 0 : 1; })
                .attr("class", classCircle)
                .attr("cx", __axis_rotated ? circleY : circleX)
                .attr("cy", __axis_rotated ? circleX : circleY)
                .attr("r", __point_r);
            mainCircle.exit().remove();

            // subchart
            if (__subchart_show) {
                // reflect main chart to extent on subchart if zoomed
                if (d3.event !== null && d3.event.type === 'zoom') {
                    brush.extent(x.orgDomain()).update();
                }
                // update subchart elements if needed
                if (withSubchart) {
                    // axes
                    // TODO: fix when rotated
                    context.select('.x.axis').transition().duration(__axis_rotated ? duration : 0).call(__axis_rotated ? yAxis : subXAxis);
                    // extent rect
                    if (! brush.empty()) {
                        brush.extent(x.orgDomain()).update();
                    }
                    // bars
                    barW = getBarW(subXAxis, barTargetsNum, true);
                    barH = getBarH(height2, true);
                    barX = getBarX(barW, barTargetsNum, barIndices, true);
                    barY = getBarY(barH, barIndices, false, true);
                    var contextBar = context.selectAll('.-bars').selectAll('.-bar')
                        .data(barData);
                    contextBar.transition().duration(duration)
                        .attr("x", barX).attr("y", barY).attr("width", barW).attr("height", barH);
                    contextBar.enter().append('rect')
                        .attr("class", classBar)
                        .attr("x", barX).attr("y", barY).attr("width", barW).attr("height", barH)
                        .style("opacity", 0)
                      .transition()
                        .style('opacity', 1);
                    contextBar.exit().transition()
                        .style('opacity', 0)
                        .remove();
                    // lines
                    context.selectAll('.-line')
                      .transition().duration(duration)
                        .attr("d", lineOnSub);
                }
            }

            // circles for select
            main.selectAll('.selected-circles')
                .filter(function (d) { return isBarType(d); })
                .selectAll('circle')
                .remove();
            main.selectAll('.selected-circle')
              .transition().duration(duration)
                .attr("cx", __axis_rotated ? circleY : circleX)
                .attr("cy", __axis_rotated ? circleX : circleY);

            // rect for mouseover
            if (! __data_xs) {
                if (isCustomX) {
                    rectW = function (d, i) {
                        var prevX = getPrevX(i), nextX = getNextX(i);
                        return (x(nextX ? nextX : d.x + 50) - x(prevX ? prevX : d.x - 50)) / 2;
                    };
                    rectX = function (d, i) {
                        var prevX = getPrevX(i);
                        return (x(d.x) + x(prevX ? prevX : d.x - 50)) / 2;
                    };
                } else {
                    rectW = (((__axis_rotated ? height : width) * getXDomainRatio()) / (maxDataCount() - 1));
                    rectX = function (d) { return x(d.x) - (rectW / 2); };
                }
                main.selectAll('.event-rect')
                  .attr("x", __axis_rotated ? 0 : rectX)
                  .attr("y", __axis_rotated ? rectX : 0)
                  .attr("width", __axis_rotated ? width : rectW)
                  .attr("height", __axis_rotated ? rectW : height);
            }

            // rect for regions
            var mainRegion = main.select('.regions').selectAll('rect.region')
                .data(__regions);
            mainRegion.enter().append('rect');
            mainRegion
                .attr('class', classRegion)
                .attr("x", __axis_rotated ? 0 : regionStart)
                .attr("y", __axis_rotated ? regionStart : margin.top)
                .attr("width", __axis_rotated ? width : regionWidth)
                .attr("height", __axis_rotated ? regionWidth : height)
                .style("fill-opacity", function (d) { return isDefined(d.opacity) ? d.opacity : 0.1; });
            mainRegion.exit().transition().duration(duration)
                .style("fill-opacity", 0)
                .remove();
        }
        function redrawForBrush() {
            redraw({
                withTransition: false,
                withY: false,
                withSubchart: false,
                withUpdateXDomain: true
            });
        }
        function redrawForZoom() {
            if (d3.event.sourceEvent.type === 'mousemove' && zoom.altDomain) {
                x.domain(zoom.altDomain);
                zoom.x(x).updateScaleExtent();
                return;
            }
            if (isCategorized && x.orgDomain()[0] === orgXDomain[0]) {
                x.domain([orgXDomain[0] - 1e-10, x.orgDomain()[1]]);
            }
            redraw({
                withTransition: false,
                withY: false,
                withSubchart: false
            });
            if (d3.event.sourceEvent.type === 'mousemove') {
                cancelClick = true;
            }
        }

        function resize() {
            // Update sizes and scales
            updateSizes();
            updateScales();
            // Set x for brush again because of scale update
            brush.x(subX);
            // Set x for zoom again because of scale update
            if (__zoom_enabled) { zoom.x(x); }
            // Update sizes
            d3.select('svg').attr('width', currentWidth).attr('height', currentHeight);
            d3.select('#' + clipId).select('rect').attr('width', width).attr('height', height);
            d3.select('#xaxis-clip').select('rect').attr('width', getXAxisClipWidth);
            d3.select('.zoom-rect').attr('width', width).attr('height', height);
            // Update main positions
            main.select('.x.axis').attr("transform", translate.x);
            main.select('.y2.axis').attr("transform", translate.y2);
            // Update context sizes and positions
            if (__subchart_show) {
                context.select('.x.brush').selectAll('rect').attr('height', height2);
                context.attr("transform", translate.context);
                context.select('.x.axis').attr("transform", translate.subx);
            }
            // Update legend positions
            if (__legend_show) {
                legend.attr("transform", translate.legend);
                updateLegend(c3.data.targets, {withTransition: false});
            }
            // Draw with new sizes & scales
            redraw({withTransition: false, withUpdateXDomain: true});
        }

        function updateTargets(targets) {
            var mainLineEnter, mainLineUpdate, mainBarEnter, mainBarUpdate;
            var contextLineEnter, contextLineUpdate, contextBarEnter, contextBarUpdate;

            /*-- Main --*/

            //-- Bar --//
            mainBarUpdate = main.select('.chart-bars')
              .selectAll('.chart-bar')
                .data(targets);
            mainBarEnter = mainBarUpdate.enter().append('g')
                .attr('class', function (d) { return 'chart-bar target target-' + d.id; })
                .style("pointer-events", "none")
                .style('opacity', 0);
            // Bars for each data
            mainBarEnter.append('g')
                .attr("class", classBars)
                .style("fill", function (d) { return color(d.id); })
                .style("stroke", function (d) { return color(d.id); })
                .style("stroke-width", 0)
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; });

            //-- Line --//
            mainLineUpdate = main.select('.chart-lines')
              .selectAll('.chart-line')
                .data(targets);
            mainLineEnter = mainLineUpdate.enter().append('g')
                .attr('class', function (d) { return 'chart-line target target-' + d.id; })
                .style("pointer-events", "none")
                .style('opacity', 0);
            // Lines for each data
            mainLineEnter.append("path")
                .attr("class", classLine)
                .style("stroke", function (d) { return color(d.id); });
            // Circles for each data point on lines
            mainLineEnter.append('g')
                .attr("class", function (d) { return "selected-circles selected-circles-" + d.id; });
            mainLineEnter.append('g')
                .attr("class", classCircles)
                .style("fill", function (d) { return color(d.id); })
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; });
            // Update date for selected circles
            targets.forEach(function (t) {
                main.selectAll('.selected-circles-' + t.id).selectAll('.selected-circle').each(function (d) {
                    d.value = t.values[d.x].value;
                });
            });

            /*-- Context --*/

            if (__subchart_show) {

                contextBarUpdate = context.select('.chart-bars')
                  .selectAll('.chart-bar')
                    .data(targets);
                contextBarEnter = contextBarUpdate.enter().append('g')
                    .attr('class', function (d) { return 'chart-bar target target-' + d.id; })
                    .style('opacity', 0);
                // Bars for each data
                contextBarEnter.append('g')
                    .attr("class", classBars)
                    .style("fill", function (d) { return color(d.id); });

                //-- Line --//
                contextLineUpdate = context.select('.chart-lines')
                  .selectAll('.chart-line')
                    .data(targets);
                contextLineEnter = contextLineUpdate.enter().append('g')
                    .attr('class', function (d) { return 'chart-line target target-' + d.id; })
                    .style('opacity', 0);
                // Lines for each data
                contextLineEnter.append("path")
                    .attr("class", classLine)
                    .style("stroke", function (d) { return color(d.id); });
            }

            /*-- Legend --*/

            if (__legend_show) {
                updateLegend(targets);
            }

            /*-- Show --*/

            // Fade-in each chart
            d3.selectAll('.target')
                .transition()
                .style("opacity", 1);
        }

        function load(targets, done) {
            // Update/Add data
            c3.data.targets.forEach(function (d) {
                for (var i = 0; i < targets.length; i++) {
                    if (d.id === targets[i].id) {
                        d.values = targets[i].values;
                        targets.splice(i, 1);
                        break;
                    }
                }
            });
            c3.data.targets = c3.data.targets.concat(targets); // add remained

            // Set targets
            updateTargets(c3.data.targets);

            // Redraw with new targets
            redraw();

            done();
        }

        /*-- Draw Legend --*/

        function updateLegend(targets, options) {
            var ids = getTargetIds(targets), l;
            var padding = width / 2 - __legend_item_width * Object.keys(targets).length / 2;
            var withTransition;

            options = isUndefined(options) ? {} : options;

            withTransition = isDefined(options.withTransition) ? options.withTransition : true;

            // Define g for legend area
            l = legend.selectAll('.legend-item')
                .data(ids)
              .enter().append('g')
                .attr('class', function (d) { return 'legend-item legend-item-' + d; })
                .style('cursor', 'pointer')
                .on('click', function (d) {
                    __legend_item_onclick(d);
                })
                .on('mouseover', function (d) {
                    d3.selectAll('.legend-item').filter(function (_d) { return _d !== d; })
                      .transition().duration(100)
                        .style('opacity', 0.3);
                    c3.focus(d);
                })
                .on('mouseout', function () {
                    d3.selectAll('.legend-item')
                      .transition().duration(100)
                        .style('opacity', 1);
                    c3.revert();
                });
            l.append('rect')
                .attr("class", "legend-item-event")
                .style('fill-opacity', 0)
                .attr('x', -200)
                .attr('y', function () { return legendHeight / 2 - 16; })
                .attr('width', __legend_item_width)
                .attr('height', 24);
            l.append('rect')
                .attr("class", "legend-item-tile")
                .style('fill', function (d) { return color(d); })
                .attr('x', -200)
                .attr('y', function () { return legendHeight / 2 - 9; })
                .attr('width', 10)
                .attr('height', 10);
            l.append('text')
                .text(function (d) { return isDefined(__data_names[d]) ? __data_names[d] : d; })
                .attr('x', -200)
                .attr('y', function () { return legendHeight / 2; });

            legend.selectAll('rect.legend-item-event')
                .data(ids)
              .transition().duration(withTransition ? 250 : 0)
                .attr('x', function (d, i) { return padding + __legend_item_width * i; });

            legend.selectAll('rect.legend-item-tile')
                .data(ids)
              .transition().duration(withTransition ? 250 : 0)
                .attr('x', function (d, i) { return padding + __legend_item_width * i; });

            legend.selectAll('text')
                .data(ids)
              .transition().duration(withTransition ? 250 : 0)
                .attr('x', function (d, i) { return padding + __legend_item_width * i + 14; });
        }

        /*-- Event Handling --*/

        function getTargetSelector(target) {
            return isDefined(target) ? '.target-' + target : '.target';
        }

        c3.focus = function (target) {
            c3.defocus();
            d3.selectAll(getTargetSelector(target))
                .filter(function (d) { return hasTarget(d.id); })
                .classed('focused', true)
                .transition().duration(100)
                .style('opacity', 1);
        };

        c3.defocus = function (target) {
            d3.selectAll(getTargetSelector(target))
                .filter(function (d) { return hasTarget(d.id); })
                .classed('focused', false)
                .transition().duration(100)
                .style('opacity', 0.3);
        };

        c3.revert = function (target) {
            d3.selectAll(getTargetSelector(target))
                .filter(function (d) { return hasTarget(d.id); })
                .classed('focused', false)
                .transition().duration(100)
                .style('opacity', 1);
        };

        c3.show = function (target) {
            d3.selectAll(getTargetSelector(target))
                .transition()
                .style('opacity', 1);
        };

        c3.hide = function (target) {
            d3.selectAll(getTargetSelector(target))
                .transition()
                .style('opacity', 0);
        };

        c3.unzoom = function () {
            brush.clear().update();
            redraw({withUpdateXDomain: true});
        };

        c3.load = function (args) {
            // check args
            if (isUndefined(args.done)) {
                args.done = function () {};
            }
            // update categories if exists
            if ('categories' in args && isCategorized) {
                __axis_x_categories = args.categories;
                xAxis.categories(__axis_x_categories);
            }
            // use cache if exists
            if ('cacheIds' in args && hasCaches(args.cacheIds)) {
                load(getCaches(args.cacheIds), args.done);
                return;
            }
            // load data
            if ('data' in args) {
                load(convertDataToTargets(args.data), args.done);
            }
            else if ('url' in args) {
                d3.csv(args.url, function (error, data) {
                    load(convertDataToTargets(data), args.done);
                });
            }
            else if ('rows' in args) {
                load(convertDataToTargets(convertRowsToData(args.rows)), args.done);
            }
            else if ('columns' in args) {
                load(convertDataToTargets(convertColumnsToData(args.columns)), args.done);
            }
            else {
                throw Error('url or rows or columns is required.');
            }
        };

        c3.unload = function (target) {
            c3.data.targets = c3.data.targets.filter(function (d) {
                return d.id !== target;
            });
            d3.selectAll('.target-' + target)
              .transition()
                .style('opacity', 0)
                .remove();

            if (__legend_show) {
                d3.selectAll('.legend-item-' + target).remove();
                updateLegend(c3.data.targets);
            }

            if (c3.data.targets.length > 0) { redraw(); }
        };

        c3.selected = function (target) {
            var suffix = isDefined(target) ? '-' + target : '';
            return d3.merge(
                main.selectAll('.-shapes' + suffix).selectAll('.-shape')
                    .filter(function () { return d3.select(this).classed(SELECTED); })
                    .map(function (d) { return d.map(function (_d) { return _d.__data__; }); })
            );
        };

        c3.select = function (ids, indices, resetOther) {
            if (! __data_selection_enabled) { return; }
            main.selectAll('.-shapes').selectAll('.-shape').each(function (d, i) {
                var selectShape = (this.nodeName === 'circle') ? selectPoint : selectBar,
                    unselectShape = (this.nodeName === 'circle') ? unselectPoint : unselectBar;
                if (indices.indexOf(i) >= 0) {
                    if (__data_selection_isselectable(d) && (__data_selection_grouped || isUndefined(ids) || ids.indexOf(d.id) >= 0)) {
                        selectShape(d3.select(this).classed(SELECTED, true), d, i);
                    }
                } else if (isDefined(resetOther) && resetOther) {
                    unselectShape(d3.select(this).classed(SELECTED, false), d, i);
                }
            });
        };

        c3.unselect = function (ids, indices) {
            if (! __data_selection_enabled) { return; }
            main.selectAll('.-shapes').selectAll('.-shape').each(function (d, i) {
                var unselectShape = (this.nodeName === 'circle') ? unselectPoint : unselectBar;
                if (isUndefined(indices) || indices.indexOf(i) >= 0) {
                    if (__data_selection_isselectable(d) && (__data_selection_grouped || isUndefined(ids) || ids.indexOf(d.id) >= 0)) {
                        unselectShape(d3.select(this).classed(SELECTED, false), d, i);
                    }
                }
            });
        };

        c3.toLine = function (targets) {
            setTargetType(targets, 'line');
            redraw();
        };

        c3.toSpline = function (targets) {
            setTargetType(targets, 'spline');
            redraw();
        };

        c3.toBar = function (targets) {
            setTargetType(targets, 'bar');
            redraw();
        };

        c3.toScatter = function (targets) {
            setTargetType(targets, 'scatter');
            redraw();
        };

        c3.groups = function (groups) {
            if (isUndefined(groups)) { return __data_groups; }
            __data_groups = groups;
            redraw();
            return __data_groups;
        };

        c3.regions = function (regions) {
            if (isUndefined(regions)) { return __regions; }
            __regions = regions;
            redraw();
            return __regions;
        };
        c3.regions.add = function (regions) {
            if (isUndefined(regions)) { return __regions; }
            __regions = __regions.concat(regions);
            redraw();
            return __regions;
        };
        c3.regions.remove = function (classes, options) {
            var regionClasses = [].concat(classes);
            options = isDefined(options) ? options : {};
            regionClasses.forEach(function (cls) {
                var regions = d3.selectAll('.' + cls);
                if (isDefined(options.duration)) {
                    regions = regions.transition().duration(options.duration).style('fill-opacity', 0);
                }
                regions.remove();
                __regions = __regions.filter(function (region) {
                    return region.classes.indexOf(cls) < 0;
                });
            });
            return __regions;
        };

        c3.data.get = function (id) {
            var target = c3.data.getAsTarget(id);
            return isDefined(target) ? target.values.map(function (d) { return d.value; }) : undefined;
        };
        c3.data.getAsTarget = function (id) {
            var targets = getTargets(function (d) { return d.id === id; });
            return targets.length > 0 ? targets[0] : undefined;
        };

        c3.destroy = function () {
            c3.data.targets = undefined;
            c3.data.x = {};
            selectChart.html("");
            window.onresize = null;
        };

        /*-- Load data and init chart with defined functions --*/

        if ('url' in config.data) {
            d3.csv(config.data.url, function (error, data) { init(data); });
        }
        else if ('rows' in config.data) {
            init(convertRowsToData(config.data.rows));
        }
        else if ('columns' in config.data) {
            init(convertColumnsToData(config.data.columns));
        }
        else {
            throw Error('url or rows or columns is required.');
        }

        return c3;
    };

    function categoryAxis() {
        var scale = d3.scale.linear(), orient = "bottom";
        var tickMajorSize = 6, /*tickMinorSize = 6,*/ tickEndSize = 6, tickPadding = 3, tickCentered = false, tickTextNum = 10, tickOffset = 0, tickFormat = null;
        var categories = [];
        function axisX(selection, x) {
            selection.attr("transform", function (d) {
                return "translate(" + (x(d) + tickOffset) + ", 0)";
            });
        }
        function axisY(selection, y) {
            selection.attr("transform", function (d) {
                return "translate(0," + y(d) + ")";
            });
        }
        function scaleExtent(domain) {
            var start = domain[0], stop = domain[domain.length - 1];
            return start < stop ? [ start, stop ] : [ stop, start ];
        }
        function generateTicks(domain) {
            var ticks = [];
            for (var i = Math.ceil(domain[0]); i < domain[1]; i++) {
                ticks.push(i);
            }
            if (ticks.length > 0 && ticks[0] > 0) {
                ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
            }
            return ticks;
        }
        function shouldShowTickText(ticks, i) {
            return ticks.length < tickTextNum || i % Math.ceil(ticks.length / tickTextNum) === 0;
        }
        function category(i) {
            return i < categories.length ? categories[i] : i;
        }
        function formattedCategory(i) {
            var c = category(i);
            return tickFormat ? tickFormat(c) : c;
        }
        function axis(g) {
            g.each(function () {
                var g = d3.select(this);
                var ticks = generateTicks(scale.domain());
                var tick = g.selectAll(".tick.major").data(ticks, String),
                    tickEnter = tick.enter().insert("g", "path").attr("class", "tick major").style("opacity", 1e-6),
                    tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(),
                    tickUpdate = d3.transition(tick).style("opacity", 1),
                    tickTransform,
                    tickX;
                var range = scale.rangeExtent ? scale.rangeExtent() : scaleExtent(scale.range()),
                    path = g.selectAll(".domain").data([ 0 ]);

                path.enter().append("path").attr("class", "domain");

                var pathUpdate = d3.transition(path);

                var scale1 = scale.copy(), scale0 = this.__chart__ || scale1;
                this.__chart__ = scale1;
                tickEnter.append("line");
                tickEnter.append("text");
                var lineEnter = tickEnter.select("line"), lineUpdate = tickUpdate.select("line"), text = tick.select("text"), textEnter = tickEnter.select("text"), textUpdate = tickUpdate.select("text");

                tickOffset = (scale1(1) - scale1(0)) / 2;
                tickX = tickCentered ? 0 : tickOffset;

                switch (orient) {
                case "bottom":
                    {
                        tickTransform = axisX;
                        lineEnter.attr("y2", tickMajorSize);
                        textEnter.attr("y", Math.max(tickMajorSize, 0) + tickPadding);
                        lineUpdate.attr("x1", tickX).attr("x2", tickX).attr("y2", tickMajorSize);
                        textUpdate.attr("x", 0).attr("y", Math.max(tickMajorSize, 0) + tickPadding);
                        text.attr("dy", ".71em").style("text-anchor", "middle");
                        text.text(function (i) { return shouldShowTickText(ticks, i) ? formattedCategory(i) : ""; });
                        pathUpdate.attr("d", "M" + range[0] + "," + tickEndSize + "V0H" + range[1] + "V" + tickEndSize);
                    }

                    break;
/* TODO: implement
                case "top":
                    {
                        tickTransform = axisX
                        lineEnter.attr("y2", -tickMajorSize)
                        textEnter.attr("y", -(Math.max(tickMajorSize, 0) + tickPadding))
                        lineUpdate.attr("x2", 0).attr("y2", -tickMajorSize)
                        textUpdate.attr("x", 0).attr("y", -(Math.max(tickMajorSize, 0) + tickPadding))
                        text.attr("dy", "0em").style("text-anchor", "middle")
                        pathUpdate.attr("d", "M" + range[0] + "," + -tickEndSize + "V0H" + range[1] + "V" + -tickEndSize)
                        break
                    }
*/
                case "left":
                    {
                        tickTransform = axisY;
                        lineEnter.attr("x2", -tickMajorSize);
                        textEnter.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding));
                        lineUpdate.attr("x2", -tickMajorSize).attr("y2", 0);
                        textUpdate.attr("x", -(Math.max(tickMajorSize, 0) + tickPadding)).attr("y", tickOffset);
                        text.attr("dy", ".32em").style("text-anchor", "end");
                        text.text(function (i) { return shouldShowTickText(ticks, i) ? formattedCategory(i) : ""; });
                        pathUpdate.attr("d", "M" + -tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + -tickEndSize);
                        break;
                    }
/*
                case "right":
                    {
                        tickTransform = axisY
                        lineEnter.attr("x2", tickMajorSize)
                        textEnter.attr("x", Math.max(tickMajorSize, 0) + tickPadding)
                        lineUpdate.attr("x2", tickMajorSize).attr("y2", 0)
                        textUpdate.attr("x", Math.max(tickMajorSize, 0) + tickPadding).attr("y", 0)
                        text.attr("dy", ".32em").style("text-anchor", "start")
                        pathUpdate.attr("d", "M" + tickEndSize + "," + range[0] + "H0V" + range[1] + "H" + tickEndSize)
                        break
                    }
*/
                }
                if (scale.ticks) {
                    tickEnter.call(tickTransform, scale0);
                    tickUpdate.call(tickTransform, scale1);
                    tickExit.call(tickTransform, scale1);
                } else {
                    var dx = scale1.rangeBand() / 2, x = function (d) {
                        return scale1(d) + dx;
                    };
                    tickEnter.call(tickTransform, x);
                    tickUpdate.call(tickTransform, x);
                }
            });
        }
        axis.scale = function (x) {
            if (!arguments.length) { return scale; }
            scale = x;
            return axis;
        };
        axis.orient = function (x) {
            if (!arguments.length) { return orient; }
            orient = x in {top: 1, right: 1, bottom: 1, left: 1} ? x + "" : "bottom";
            return axis;
        };
        axis.categories = function (x) {
            if (!arguments.length) { return categories; }
            categories = x;
            return axis;
        };
        axis.tickCentered = function (x) {
            if (!arguments.length) { return tickCentered; }
            tickCentered = x;
            return axis;
        };
        axis.tickTextNum = function (x) {
            if (!arguments.length) { return tickTextNum; }
            tickTextNum = x;
            return axis;
        };
        axis.tickFormat = function (format) {
            if (!arguments.length) { return tickFormat; }
            tickFormat = format;
            return axis;
        };
        axis.tickOffset = function () {
            return tickOffset;
        };
        axis.ticks = function () {
            return; // TODO: implement
        };
        return axis;
    }

    function isUndefined(v) {
        return typeof v === 'undefined';
    }
    function isDefined(v) {
        return typeof v !== 'undefined';
    }

})(window);
