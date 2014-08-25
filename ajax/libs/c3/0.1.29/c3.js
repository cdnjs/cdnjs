(function (window) {
    'use strict';

    var c3 = {
        version: "0.1.29"
    };

    var CLASS = {
        target: 'c3-target',
        chart : 'c3-chart',
        chartLine: 'c3-chart-line',
        chartLines: 'c3-chart-lines',
        chartBar: 'c3-chart-bar',
        chartBars: 'c3-chart-bars',
        chartText: 'c3-chart-text',
        chartTexts: 'c3-chart-texts',
        chartArc: 'c3-chart-arc',
        chartArcs: 'c3-chart-arcs',
        chartArcsTitle: 'c3-chart-arcs-title',
        selectedCircle: 'c3-selected-circle',
        selectedCircles: 'c3-selected-circles',
        eventRect: 'c3-event-rect',
        eventRects: 'c3-event-rects',
        zoomRect: 'c3-zoom-rect',
        brush: 'c3-brush',
        focused: 'c3-focused',
        region: 'c3-region',
        regions: 'c3-regions',
        tooltip: 'c3-tooltip',
        tooltipName: 'c3-tooltip-name',
        shape: 'c3-shape',
        shapes: 'c3-shapes',
        line: 'c3-line',
        bar: 'c3-bar',
        bars: 'c3-bars',
        circle: 'c3-circle',
        circles: 'c3-circles',
        arc: 'c3-arc',
        area: 'c3-area',
        text: 'c3-text',
        texts: 'c3-texts',
        grid: 'c3-grid',
        xgrid: 'c3-xgrid',
        xgrids: 'c3-xgrids',
        xgridLine: 'c3-xgrid-line',
        xgridLines: 'c3-xgrid-lines',
        xgridFocus: 'c3-xgrid-focus',
        ygrid: 'c3-ygrid',
        ygrids: 'c3-ygrids',
        ygridLine: 'c3-ygrid-line',
        ygridLines: 'c3-ygrid-lines',
        axisX: 'c3-axis-x',
        axisXLabel: 'c3-axis-x-label',
        axisY: 'c3-axis-y',
        axisYLabel: 'c3-axis-y-label',
        axisY2: 'c3-axis-y2',
        axisY2Label: 'c3-axis-y2-label',
        legendItem: 'c3-legend-item',
        legendItemEvent: 'c3-legend-item-event',
        legendItemTile: 'c3-legend-item-tile',
        dragarea: 'c3-dragarea',
        EXPANDED: '_expanded_',
        SELECTED: '_selected_',
        INCLUDED: '_included_',
    };

    /*
     * Generate chart according to config
     */
    c3.generate = function (config) {

        var d3 = window.d3 ? window.d3 : window.require ? window.require("d3") : undefined;

        var c3 = { data : {}, axis: {}, legend: {} },
            cache = {};

        /*-- Handle Config --*/

        function checkConfig(key, message) {
            if (! (key in config)) { throw Error(message); }
        }

        function getConfig(keys, defaultValue) {
            var target = config, i, isLast, nextTarget;
            for (i = 0; i < keys.length; i++) {
                // return default if key not found
                if (typeof target === 'object' && !(keys[i] in target)) { return defaultValue; }
                // Check next key's value
                isLast = (i === keys.length - 1);
                nextTarget = target[keys[i]];
                if ((!isLast && typeof nextTarget !== 'object') || (isLast && typeof defaultValue !== 'object' && typeof nextTarget === 'object' && nextTarget !== null)) {
                    return defaultValue;
                }
                target = nextTarget;
            }
            return target;
        }

        // bindto - id to bind the chart
        var __bindto = getConfig(['bindto'], '#chart');

        var __size_width = getConfig(['size', 'width']),
            __size_height = getConfig(['size', 'height']);

        var __padding_left = getConfig(['padding', 'left']),
            __padding_right = getConfig(['padding', 'right']);

        var __zoom_enabled = getConfig(['zoom', 'enabled'], false),
            __zoom_extent = getConfig(['zoom', 'extent']),
            __zoom_privileged = getConfig(['zoom', 'privileged'], false);

        var __onenter = getConfig(['onenter'], function () {}),
            __onleave = getConfig(['onleave'], function () {});

        var __transition_duration = getConfig(['transition', 'duration'], 350);

        // data - data configuration
        checkConfig('data', 'data is required in config');

        var __data_x = getConfig(['data', 'x']),
            __data_xs = getConfig(['data', 'xs'], {}),
            __data_x_format = getConfig(['data', 'x_format']),
            __data_id_converter = getConfig(['data', 'id_converter'], function (id) { return id; }),
            __data_names = getConfig(['data', 'names'], {}),
            __data_groups = getConfig(['data', 'groups'], []),
            __data_axes = getConfig(['data', 'axes'], {}),
            __data_type = getConfig(['data', 'type']),
            __data_types = getConfig(['data', 'types'], {}),
            __data_labels = getConfig(['data', 'labels'], {}),
            __data_order = getConfig(['data', 'order']),
            __data_regions = getConfig(['data', 'regions'], {}),
            __data_color = getConfig(['data', 'color']),
            __data_colors = getConfig(['data', 'colors'], {}),
            __data_selection_enabled = getConfig(['data', 'selection', 'enabled'], false),
            __data_selection_grouped = getConfig(['data', 'selection', 'grouped'], false),
            __data_selection_isselectable = getConfig(['data', 'selection', 'isselectable'], function () { return true; }),
            __data_selection_multiple = getConfig(['data', 'selection', 'multiple'], true),
            __data_onclick = getConfig(['data', 'onclick'], function () {}),
            __data_onenter = getConfig(['data', 'onenter'], function () {}),
            __data_onleave = getConfig(['data', 'onleave'], function () {}),
            __data_onselected = getConfig(['data', 'onselected'], function () {}),
            __data_onunselected = getConfig(['data', 'onunselected'], function () {}),
            __data_ondragstart = getConfig(['data', 'ondragstart'], function () {}),
            __data_ondragend = getConfig(['data', 'ondragend'], function () {});

        // subchart
        var __subchart_show = getConfig(['subchart', 'show'], false),
            __subchart_size_height = __subchart_show ? getConfig(['subchart', 'size', 'height'], 60) : 0;

        // color
        var __color_pattern = getConfig(['color', 'pattern'], []);

        // legend
        var __legend_show = getConfig(['legend', 'show'], true),
            __legend_position = getConfig(['legend', 'position'], 'bottom'),
            __legend_item_onclick = getConfig(['legend', 'item', 'onclick']),
            __legend_equally = getConfig(['legend', 'equally'], false);

        // axis
        var __axis_rotated = getConfig(['axis', 'rotated'], false),
            __axis_x_type = getConfig(['axis', 'x', 'type'], 'indexed'),
            __axis_x_categories = getConfig(['axis', 'x', 'categories'], []),
            __axis_x_tick_centered = getConfig(['axis', 'x', 'tick', 'centered'], false),
            __axis_x_tick_format = getConfig(['axis', 'x', 'tick', 'format']),
            __axis_x_tick_culling = getConfig(['axis', 'x', 'tick', 'culling'], {}),
            __axis_x_tick_culling_max = getConfig(['axis', 'x', 'tick', 'culling', 'max'], __axis_x_type === 'categorized' ? Infinity : 10),
            __axis_x_tick_count = getConfig(['axis', 'x', 'tick', 'count']),
            __axis_x_tick_fit = getConfig(['axis', 'x', 'tick', 'fit'], false),
            __axis_x_max = getConfig(['axis', 'x', 'max']),
            __axis_x_min = getConfig(['axis', 'x', 'min']),
            __axis_x_default = getConfig(['axis', 'x', 'default']),
            __axis_x_label = getConfig(['axis', 'x', 'label'], {}),
            __axis_y_show = getConfig(['axis', 'y', 'show'], true),
            __axis_y_max = getConfig(['axis', 'y', 'max']),
            __axis_y_min = getConfig(['axis', 'y', 'min']),
            __axis_y_center = getConfig(['axis', 'y', 'center']),
            __axis_y_label = getConfig(['axis', 'y', 'label'], {}),
            __axis_y_inner = getConfig(['axis', 'y', 'inner'], false),
            __axis_y_tick_format = getConfig(['axis', 'y', 'tick', 'format']),
            __axis_y_padding = getConfig(['axis', 'y', 'padding'], {}),
            __axis_y_ticks = getConfig(['axis', 'y', 'ticks'], 10),
            __axis_y2_show = getConfig(['axis', 'y2', 'show'], false),
            __axis_y2_max = getConfig(['axis', 'y2', 'max']),
            __axis_y2_min = getConfig(['axis', 'y2', 'min']),
            __axis_y2_center = getConfig(['axis', 'y2', 'center']),
            __axis_y2_label = getConfig(['axis', 'y2', 'label'], {}),
            __axis_y2_inner = getConfig(['axis', 'y2', 'inner'], false),
            __axis_y2_tick_format = getConfig(['axis', 'y2', 'tick', 'format']),
            __axis_y2_padding = getConfig(['axis', 'y2', 'padding'], {}),
            __axis_y2_ticks = getConfig(['axis', 'y2', 'ticks'], 10);

        // grid
        var __grid_x_show = getConfig(['grid', 'x', 'show'], false),
            __grid_x_type = getConfig(['grid', 'x', 'type'], 'tick'),
            __grid_x_lines = getConfig(['grid', 'x', 'lines'], []),
            __grid_y_show = getConfig(['grid', 'y', 'show'], false),
            // not used
            // __grid_y_type = getConfig(['grid', 'y', 'type'], 'tick'),
            __grid_y_lines = getConfig(['grid', 'y', 'lines'], []),
            __grid_y_ticks = getConfig(['grid', 'y', 'ticks'], 10);

        // point - point of each data
        var __point_show = getConfig(['point', 'show'], true),
            __point_r = __point_show ? getConfig(['point', 'r'], 2.5) : 0,
            __point_focus_line_enabled = getConfig(['point', 'focus', 'line', 'enabled'], true),
            __point_focus_expand_enabled = getConfig(['point', 'focus', 'expand', 'enabled'], true),
            __point_focus_expand_r = getConfig(['point', 'focus', 'expand', 'r'], __point_focus_expand_enabled ? 4 : __point_r),
            __point_select_r = getConfig(['point', 'focus', 'select', 'r'], 8);

        // bar
        var __bar_width = getConfig(['bar', 'width']),
            __bar_width_ratio = getConfig(['bar', 'width', 'ratio'], 0.6);

        // pie
        var __pie_label_show = getConfig(['pie', 'label', 'show'], true),
            __pie_label_format = getConfig(['pie', 'label', 'format']),
            __pie_onclick = getConfig(['pie', 'onclick'], function () {}),
            __pie_onmouseover = getConfig(['pie', 'onmouseover'], function () {}),
            __pie_onmouseout = getConfig(['pie', 'onmouseout'], function () {});

        // donut
        var __donut_label_show = getConfig(['donut', 'label', 'show'], true),
            __donut_label_format = getConfig(['donut', 'label', 'format']),
            __donut_title = getConfig(['donut', 'title'], ""),
            __donut_onclick = getConfig(['donut', 'onclick'], function () {}),
            __donut_onmouseover = getConfig(['donut', 'onmouseover'], function () {}),
            __donut_onmouseout = getConfig(['donut', 'onmouseout'], function () {});

        // region - region to change style
        var __regions = getConfig(['regions'], []);

        // tooltip - show when mouseover on each data
        var __tooltip_show = getConfig(['tooltip', 'show'], true),
            __tooltip_format_title = getConfig(['tooltip', 'format', 'title']),
            __tooltip_format_value = getConfig(['tooltip', 'format', 'value']),
            __tooltip_contents = getConfig(['tooltip', 'contents'], function (d, defaultTitleFormat, defaultValueFormat, color) {
            var titleFormat = __tooltip_format_title ? __tooltip_format_title : defaultTitleFormat,
                valueFormat = __tooltip_format_value ? __tooltip_format_value : defaultValueFormat,
                text, i, title, value, name;
            for (i = 0; i < d.length; i++) {
                if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                if (! text) {
                    title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                    text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                }

                name = d[i].name;
                value = valueFormat(d[i].value, d[i].ratio);

                text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                text += "<td class='name'><span style='background-color:" + color(d[i].id) + "'></span>" + name + "</td>";
                text += "<td class='value'>" + value + "</td>";
                text += "</tr>";
            }
            return text + "</table>";
        }),
            __tooltip_init_show = getConfig(['tooltip', 'init', 'show'], false),
            __tooltip_init_x = getConfig(['tooltip', 'init', 'x'], 0),
            __tooltip_init_position = getConfig(['tooltip', 'init', 'position'], {top: '0px', left: '50px'});

        /*-- Set Variables --*/

        var clipId = (typeof __bindto === "string" ? __bindto.replace('#', '') : __bindto.id)  + '-clip',
            clipIdForXAxis = clipId + '-xaxis',
            clipIdForYAxis = clipId + '-yaxis',
            clipPath = getClipPath(clipId),
            clipPathForXAxis = getClipPath(clipPathForXAxis),
            clipPathForYAxis = getClipPath(clipPathForYAxis);

        var isTimeSeries = (__axis_x_type === 'timeseries'),
            isCategorized = (__axis_x_type === 'categorized'),
            isCustomX = !isTimeSeries && (__data_x || notEmpty(__data_xs));

        var dragStart = null, dragging = false, cancelClick = false, mouseover = false;

        var defaultColorPattern = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'], //same as d3.scale.category10()
            color = generateColor(__data_colors, notEmpty(__color_pattern) ? __color_pattern : defaultColorPattern, __data_color);

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

        var hiddenTargetIds = [], hiddenLegendIds = [];

        /*-- Set Chart Params --*/

        var margin, margin2, margin3, width, width2, height, height2, currentWidth, currentHeight;
        var radius, radiusExpanded, innerRadius, svgArc, svgArcExpanded, svgArcExpandedSub, pie;
        var xMin, xMax, yMin, yMax, subXMin, subXMax, subYMin, subYMax;
        var x, y, y2, subX, subY, subY2, xAxis, yAxis, yAxis2, subXAxis;

        var xOrient = __axis_rotated ? "left" : "bottom",
            yOrient = __axis_rotated ? (__axis_y_inner ? "top" : "bottom") : (__axis_y_inner ? "right" : "left"),
            y2Orient = __axis_rotated ? (__axis_y2_inner ? "bottom" : "top") : (__axis_y2_inner ? "left" : "right"),
            subXOrient = __axis_rotated ? "left" : "bottom";

        var translate = {
            main : function () { return "translate(" + margin.left + "," + margin.top + ")"; },
            context : function () { return "translate(" + margin2.left + "," + margin2.top + ")"; },
            legend : function () { return "translate(" + margin3.left + "," + margin3.top + ")"; },
            x : function () { return "translate(0," + (__axis_rotated ? 0 : height) + ")"; },
            y : function () { return "translate(0," + (__axis_rotated ? height : 0) + ")"; },
            y2 : function () { return "translate(" + (__axis_rotated ? 0 : width) + "," + (__axis_rotated ? 1 : 0) + ")"; },
            subx : function () { return "translate(0," + (__axis_rotated ? 0 : height2) + ")"; },
            arc: function () { return "translate(" + width / 2 + "," + height / 2 + ")"; }
        };

        var isLegendRight = __legend_position === 'right';
        var legendStep = 0, legendItemWidth = 0, legendItemHeight = 0;

        /*-- Define Functions --*/

        function getClipPath(id) {
            return "url(" + document.URL.split('#')[0] + "#" + id + ")";
        }

        function transformMain(withTransition) {
            var duration = withTransition !== false ? 250 : 0;
            main.attr("transform", translate.main);
            main.select('.' + CLASS.axisX).transition().duration(duration).attr("transform", translate.x);
            main.select('.' + CLASS.axisY).transition().duration(duration).attr("transform", translate.y);
            main.select('.' + CLASS.axisY2).attr("transform", translate.y2);
            main.select('.' + CLASS.chartArcs).attr("transform", translate.arc);
        }
        function transformContext() {
            if (__subchart_show) {
                context.attr("transform", translate.context);
                context.select('.' + CLASS.axisX).attr("transform", translate.subx);
            }
        }
        function transformLegend(withTransition) {
            var duration = withTransition !== false ? 250 : 0;
            legend.transition().duration(duration).attr("transform", translate.legend);
        }
        function transformAll(withTransition) {
            transformMain(withTransition);
            transformContext(withTransition);
            transformLegend(withTransition);
        }

        //-- Sizes --//

        // TODO: configurabale
        var rotated_padding_left = 30, rotated_padding_right = 30, rotated_padding_top = 5;

        function updateSizes() {
            var legendHeight = getLegendHeight(), legendWidth = getLegendWidth();

            currentWidth = getCurrentWidth();
            currentHeight = getCurrentHeight();

            // for main
            margin = {
                top: __axis_rotated ? getHorizontalAxisHeight('y2') : rotated_padding_top,
                right: getCurrentPaddingRight(),
                bottom: getHorizontalAxisHeight(__axis_rotated ? 'y' : 'x') + (__axis_rotated ? 0 : __subchart_size_height) + (isLegendRight ? 0 : legendHeight),
                left: (__axis_rotated ? __subchart_size_height + rotated_padding_right : 0) + getCurrentPaddingLeft()
            };
            width = currentWidth - margin.left - margin.right;
            height = currentHeight - margin.top - margin.bottom;
            if (width < 0) { width = 0; }
            if (height < 0) { height = 0; }

            // for context
            margin2 = {
                top: __axis_rotated ? margin.top : (currentHeight - __subchart_size_height - (isLegendRight ? 0 : legendHeight)),
                right: NaN,
                bottom: 20 + (isLegendRight ? 0 : legendHeight),
                left: __axis_rotated ? rotated_padding_left : margin.left
            };
            width2 = __axis_rotated ? margin.left - rotated_padding_left - rotated_padding_right : width;
            height2 = __axis_rotated ? height : currentHeight - margin2.top - margin2.bottom;
            if (width2 < 0) { width2 = 0; }
            if (height2 < 0) { height2 = 0; }

            // for legend
            margin3 = {
                top: isLegendRight ? 0 : currentHeight - legendHeight,
                right: NaN,
                bottom: 0,
                left: isLegendRight ? currentWidth - legendWidth : 0
            };

            // for arc
            updateRadius();

            if (isLegendRight && hasArcType(c3.data.targets)) {
                margin3.left = width / 2 + radiusExpanded;
            }
        }
        function updateXgridFocus() {
            main.select('line.' + CLASS.xgridFocus)
                .attr("x1", __axis_rotated ? 0 : -10)
                .attr("x2", __axis_rotated ? width : -10)
                .attr("y1", __axis_rotated ? -10 : margin.top)
                .attr("y2", __axis_rotated ? -10 : height);
        }
        function updateRadius() {
            radiusExpanded = height / 2;
            radius = radiusExpanded * 0.95;
            innerRadius = hasDonutType(c3.data.targets) ? radius * 0.6 : 0;
        }
        function getSvgLeft() {
            var leftAxisClass = __axis_rotated ? CLASS.axisX : CLASS.axisY,
                leftAxis = d3.select('.' + leftAxisClass).node(),
                svgRect = leftAxis ? leftAxis.getBoundingClientRect() : {right: 0},
                chartRect = d3.select(__bindto).node().getBoundingClientRect(),
                svgLeft = svgRect.right - chartRect.left - getCurrentPaddingLeft();
            return svgLeft > 0 ? svgLeft : 0;
        }
        function getCurrentWidth() {
            return __size_width ? __size_width : getParentWidth();
        }
        function getCurrentHeight() {
            var h = __size_height ? __size_height : getParentHeight();
            return h > 0 ? h : 320;
        }
        function getCurrentPaddingLeft() {
            if (hasArcType(c3.data.targets)) {
                return 0;
            } else if (__padding_left) {
                return __padding_left;
            } else {
                return __axis_rotated || !__axis_y_show || __axis_y_inner ? 1 : getAxisWidthByAxisId('y');
            }
        }
        function getCurrentPaddingRight() {
            var defaultPadding = 1;
            if (hasArcType(c3.data.targets)) {
                return 0;
            } else if (__padding_right) {
                return __padding_right;
            } else if (isLegendRight) {
                return getLegendWidth() + (__axis_y2_show && !__axis_rotated ? getAxisWidthByAxisId('y2') : defaultPadding);
            } else if (__axis_y2_show) {
                return __axis_y2_inner || __axis_rotated ? defaultPadding : getAxisWidthByAxisId('y2');
            } else {
                return defaultPadding;
            }
        }
        function getAxisWidthByAxisId(id) {
            var position = getAxisLabelPositionById(id);
            return position.isInner ? 20 + getMaxTickWidth(id) : 40 + getMaxTickWidth(id);
        }
        function getHorizontalAxisHeight(axisId) {
            if (axisId === 'y' && !__axis_y_show) { return __legend_show && !isLegendRight ? 10 : 1; }
            if (axisId === 'y2' && !__axis_y2_show) { return rotated_padding_top; }
            return (getAxisLabelPositionById(axisId).isInner ? 30 : 40) + (axisId === 'y2' ? -10 : 0);
        }
        function getParentWidth() {
            return +d3.select(__bindto).style("width").replace('px', ''); // TODO: if rotated, use height
        }
        function getParentHeight() {
            return +d3.select(__bindto).style('height').replace('px', ''); // TODO: if rotated, use width
        }
        function getAxisClipX(forHorizontal) {
            return forHorizontal ? -(1 + 4) : -(margin.left - 1);
        }
        function getAxisClipY(forHorizontal) {
            return forHorizontal ? -20 : -1;
        }
        function getXAxisClipX() {
            return getAxisClipX(!__axis_rotated);
        }
        function getXAxisClipY() {
            return getAxisClipY(!__axis_rotated);
        }
        function getYAxisClipX() {
            return getAxisClipX(__axis_rotated);
        }
        function getYAxisClipY() {
            return getAxisClipY(__axis_rotated);
        }
        function getAxisClipWidth(forHorizontal) {
            return forHorizontal ? width + 2 + 4 : margin.left + 20;
        }
        function getAxisClipHeight(forHorizontal) {
            return forHorizontal ? 80 : height + 2;
        }
        function getXAxisClipWidth() {
            return getAxisClipWidth(!__axis_rotated);
        }
        function getXAxisClipHeight() {
            return getAxisClipHeight(!__axis_rotated);
        }
        function getYAxisClipWidth() {
            return getAxisClipWidth(__axis_rotated);
        }
        function getYAxisClipHeight() {
            return getAxisClipHeight(__axis_rotated);
        }
        function getEventRectWidth() {
            var base = __axis_rotated ? height : width,
                maxDataCount = getMaxDataCount(),
                ratio = getXDomainRatio() * (hasBarType(c3.data.targets) ? (maxDataCount - (isCategorized ? 0.25 : 1)) / maxDataCount : 0.98);
            return maxDataCount > 1 ? (base * ratio) / (maxDataCount - 1) : base;
        }
        function updateLegendStep(step) {
            legendStep = step;
        }
        function updateLegendItemWidth(w) {
            legendItemWidth = w;
        }
        function updateLegendItemHeight(h) {
            legendItemHeight = h;
        }
        function getLegendWidth() {
            return __legend_show ? isLegendRight ? legendItemWidth * (legendStep + 1) : currentWidth : 0;
        }
        function getLegendHeight() {
            return __legend_show ? isLegendRight ? currentHeight : legendItemHeight * (legendStep + 1) : 0;
        }

        //-- Scales --//

        function updateScales() {
            var xAxisTickFormat, forInit = !x;
            // update edges
            xMin = __axis_rotated ? 1 : 0;
            xMax = __axis_rotated ? height : width;
            yMin = __axis_rotated ? 0 : height;
            yMax = __axis_rotated ? width : 1;
            subXMin = xMin;
            subXMax = xMax;
            subYMin = __axis_rotated ? 0 : height2;
            subYMax = __axis_rotated ? width2 : 1;
            // update scales
            x = getX(xMin, xMax, forInit ? undefined : x.domain(), function () { return xAxis.tickOffset(); });
            y = getY(yMin, yMax);
            y2 = getY(yMin, yMax);
            subX = getX(xMin, xMax, orgXDomain, function (d) { return d % 1 ? 0 : subXAxis.tickOffset(); });
            subY = getY(subYMin, subYMax);
            subY2 = getY(subYMin, subYMax);
            // update axes
            xAxisTickFormat = getXAxisTickFormat();
            xAxis = getXAxis(x, xOrient, xAxisTickFormat);
            subXAxis = getXAxis(subX, subXOrient, xAxisTickFormat);
            yAxis = getYAxis(y, yOrient, __axis_y_tick_format, __axis_y_ticks);
            yAxis2 = getYAxis(y2, y2Orient, __axis_y2_tick_format, __axis_y2_ticks);
            // Set initialized scales to brush and zoom
            if (!forInit) {
                brush.scale(subX);
                if (__zoom_enabled) { zoom.scale(x); }
            }
            // update for arc
            updateArc();
        }
        function updateArc() {
            svgArc = getSvgArc();
            svgArcExpanded = getSvgArcExpanded();
            svgArcExpandedSub = getSvgArcExpanded(0.98);
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

        function getXAxis(scale, orient, tickFormat) {
            var axis = (isCategorized ? categoryAxis() : d3.svg.axis()).scale(scale).orient(orient);

            // Set tick
            axis.tickFormat(tickFormat);
            if (isCategorized) {
                axis.tickCentered(__axis_x_tick_centered);
            } else {
                axis.tickOffset = function () {
                    var base = __axis_rotated ? height : width;
                    return ((base * getXDomainRatio()) / getMaxDataCount()) / 2;
                };
            }

            // Set categories
            if (isCategorized) {
                axis.categories(__axis_x_categories);
            }

            return axis;
        }
        function getYAxis(scale, orient, tickFormat, ticks) {
            return d3.svg.axis().scale(scale).orient(orient).tickFormat(tickFormat).ticks(ticks).outerTickSize(0);
        }
        function getAxisId(id) {
            return id in __data_axes ? __data_axes[id] : 'y';
        }
        function getXAxisTickFormat() {
            var format = isTimeSeries ? defaultTimeFormat : isCategorized ? categoryName : function (v) { return v < 0 ? v.toFixed(0) : v; };
            if (__axis_x_tick_format) {
                if (typeof __axis_x_tick_format === 'function') {
                    format = __axis_x_tick_format;
                } else if (isTimeSeries) {
                    format = function (date) { return d3.time.format(__axis_x_tick_format)(date); };
                }
            }
            return format;
        }
        function getAxisLabelOptionByAxisId(axisId) {
            var option;
            if (axisId === 'y') {
                option = __axis_y_label;
            } else if (axisId === 'y2') {
                option = __axis_y2_label;
            } else if (axisId === 'x') {
                option = __axis_x_label;
            }
            return option;
        }
        function getAxisLabelText(axisId) {
            var option = getAxisLabelOptionByAxisId(axisId);
            return typeof option === 'string' ? option : option ? option.text : null;
        }
        function setAxisLabelText(axisId, text) {
            var option = getAxisLabelOptionByAxisId(axisId);
            if (typeof option === 'string') {
                if (axisId === 'y') {
                    __axis_y_label = text;
                } else if (axisId === 'y2') {
                    __axis_y2_label = text;
                } else if (axisId === 'x') {
                    __axis_x_label = text;
                }
            } else if (option) {
                option.text = text;
            }
        }
        function getAxisLabelPosition(axisId, defaultPosition) {
            var option = getAxisLabelOptionByAxisId(axisId),
                position = (option && typeof option === 'object' && option.position) ? option.position : defaultPosition;
            return {
                isInner: position.indexOf('inner') >= 0,
                isOuter: position.indexOf('outer') >= 0,
                isLeft: position.indexOf('left') >= 0,
                isCenter: position.indexOf('center') >= 0,
                isRight: position.indexOf('right') >= 0,
                isTop: position.indexOf('top') >= 0,
                isMiddle: position.indexOf('middle') >= 0,
                isBottom: position.indexOf('bottom') >= 0
            };
        }
        function getXAxisLabelPosition() {
            return getAxisLabelPosition('x', __axis_rotated ? 'inner-top' : 'inner-right');
        }
        function getYAxisLabelPosition() {
            return getAxisLabelPosition('y', __axis_rotated ? 'inner-right' : 'inner-top');
        }
        function getY2AxisLabelPosition() {
            return getAxisLabelPosition('y2', __axis_rotated ? 'inner-right' : 'inner-top');
        }
        function getAxisLabelPositionById(id) {
            return id === 'y2' ? getY2AxisLabelPosition() : id === 'y' ? getYAxisLabelPosition() : getXAxisLabelPosition();
        }
        function textForXAxisLabel() {
            return getAxisLabelText('x');
        }
        function textForYAxisLabel() {
            return getAxisLabelText('y');
        }
        function textForY2AxisLabel() {
            return getAxisLabelText('y2');
        }
        function xForAxisLabel(forHorizontal, position) {
            if (forHorizontal) {
                return position.isLeft ? 0 : position.isCenter ? width / 2 : width;
            } else {
                return position.isBottom ? -height : position.isMiddle ? -height / 2 : 0;
            }
        }
        function dxForAxisLabel(forHorizontal, position) {
            if (forHorizontal) {
                return position.isLeft ? "0.5em" : position.isRight ? "-0.5em" : "0";
            } else {
                return position.isTop ? "-0.5em" : position.isBottom ? "0.5em" : "0";
            }
        }
        function textAnchorForAxisLabel(forHorizontal, position) {
            if (forHorizontal) {
                return position.isLeft ? 'start' : position.isCenter ? 'middle' : 'end';
            } else {
                return position.isBottom ? 'start' : position.isMiddle ? 'middle' : 'end';
            }
        }
        function xForXAxisLabel() {
            return xForAxisLabel(!__axis_rotated, getXAxisLabelPosition());
        }
        function xForYAxisLabel() {
            return xForAxisLabel(__axis_rotated, getYAxisLabelPosition());
        }
        function xForY2AxisLabel() {
            return xForAxisLabel(__axis_rotated, getY2AxisLabelPosition());
        }
        function dxForXAxisLabel() {
            return dxForAxisLabel(!__axis_rotated, getXAxisLabelPosition());
        }
        function dxForYAxisLabel() {
            return dxForAxisLabel(__axis_rotated, getYAxisLabelPosition());
        }
        function dxForY2AxisLabel() {
            return dxForAxisLabel(__axis_rotated, getY2AxisLabelPosition());
        }
        function dyForXAxisLabel() {
            var position = getXAxisLabelPosition();
            if (__axis_rotated) {
                return position.isInner ? "1.2em" : -30 - getMaxTickWidth('x');
            } else {
                return position.isInner ? "-0.5em" : "3em";
            }
        }
        function dyForYAxisLabel() {
            var position = getYAxisLabelPosition();
            if (__axis_rotated) {
                return position.isInner ? "-0.5em" : "3em";
            } else {
                return position.isInner ? "1.2em" : -20 - getMaxTickWidth('y');
            }
        }
        function dyForY2AxisLabel() {
            var position = getY2AxisLabelPosition();
            if (__axis_rotated) {
                return position.isInner ? "1.2em" : "-2.2em";
            } else {
                return position.isInner ? "-0.5em" : 30 + getMaxTickWidth('y2');
            }
        }
        function textAnchorForXAxisLabel() {
            return textAnchorForAxisLabel(!__axis_rotated, getXAxisLabelPosition());
        }
        function textAnchorForYAxisLabel() {
            return textAnchorForAxisLabel(__axis_rotated, getYAxisLabelPosition());
        }
        function textAnchorForY2AxisLabel() {
            return textAnchorForAxisLabel(__axis_rotated, getY2AxisLabelPosition());
        }
        function getMaxTickWidth(id) {
            var maxWidth = 0, axisClass = id === 'x' ? CLASS.axisX : id === 'y' ? CLASS.axisY : CLASS.axisY2;
            d3.selectAll('.' + axisClass + ' .tick text').each(function () {
                var box = this.getBBox();
                if (maxWidth < box.width) { maxWidth = box.width; }
            });
            return maxWidth < 20 ? 20 : maxWidth;
        }
        function updateAxisLabels() {
            main.select('.' + CLASS.axisX + ' .' + CLASS.axisXLabel).attr("x", xForXAxisLabel).text(textForXAxisLabel);
            main.select('.' + CLASS.axisY + ' .' + CLASS.axisYLabel).attr("x", xForYAxisLabel).attr("dy", dyForYAxisLabel).text(textForYAxisLabel);
            main.select('.' + CLASS.axisY2 + ' .' + CLASS.axisY2Label).attr("x", xForY2AxisLabel).attr("dy", dyForY2AxisLabel).text(textForY2AxisLabel);
        }

        function categoryAxis() {
            var scale = d3.scale.linear(), orient = "bottom";
            var tickMajorSize = 6, /*tickMinorSize = 6,*/ tickEndSize = 6, tickPadding = 3, tickCentered = false, tickTextNum = 10, tickOffset = 0, tickFormat = null, tickCulling = true;
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
                var length = ticks.length - 1;
                return length <= tickTextNum || i % Math.ceil(length / tickTextNum) === 0;
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
                            break;
                        }
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
            axis.tickFormat = function (format) {
                if (!arguments.length) { return tickFormat; }
                tickFormat = format;
                return axis;
            };
            axis.tickOffset = function () {
                return tickOffset;
            };
            axis.ticks = function (n) {
                if (!arguments.length) { return tickTextNum; }
                tickTextNum = n;
                return axis;
            };
            axis.tickCulling = function (culling) {
                if (!arguments.length) { return tickCulling; }
                tickCulling = culling;
                return axis;
            };
            axis.tickValues = function () {
                // TODO: do something
            };
            return axis;
        }

        //-- Arc --//

        pie = d3.layout.pie().value(function (d) {
            return d.values.reduce(function (a, b) { return a + b.value; }, 0);
        });

        function updateAngle(d) {
            var found = false;
            pie(filterTargetsToShow(c3.data.targets)).forEach(function (t) {
                if (! found && t.data.id === d.data.id) {
                    found = true;
                    d = t;
                    return;
                }
            });
            return found ? d : null;
        }

        function getSvgArc() {
            var arc = d3.svg.arc().outerRadius(radius).innerRadius(innerRadius),
                newArc = function (d, withoutUpdate) {
                    var updated;
                    if (withoutUpdate) { return arc(d); } // for interpolate
                    updated = updateAngle(d);
                    return updated ? arc(updated) : "M 0 0";
                };
            // TODO: extends all function
            newArc.centroid = arc.centroid;
            return newArc;
        }
        function getSvgArcExpanded(rate) {
            var arc = d3.svg.arc().outerRadius(radiusExpanded * (rate ? rate : 1)).innerRadius(innerRadius);
            return function (d) {
                var updated = updateAngle(d);
                return updated ? arc(updated) : "M 0 0";
            };
        }
        function getArc(d, withoutUpdate) {
            return isArcType(d.data) ? svgArc(d, withoutUpdate) : "M 0 0";
        }
        function transformForArcLabel(d) {
            var updated = updateAngle(d), c, x, y, h, translate = "";
            if (updated) {
                c = svgArc.centroid(updated);
                x = c[0], y = c[1], h = Math.sqrt(x * x + y * y);
                translate = "translate(" + ((x / h) * radius * 0.8) +  ',' + ((y / h) * radius * 0.8) +  ")";
            }
            return translate;
        }
        function getArcRatio(d) {
            return d ? (d.endAngle - d.startAngle) / (Math.PI * 2) : null;
        }
        function convertToArcData(d) {
            return addName({
                id: d.data.id,
                value: d.value,
                ratio: getArcRatio(d)
            });
        }
        function textForArcLabel(d) {
            var updated, value, ratio, format;
            if (! shouldShowArcLable()) { return ""; }
            updated = updateAngle(d);
            value = updated ? updated.value : null;
            ratio = getArcRatio(updated);
            format = getArcLabelFormat();
            return format ? format(value, ratio) : defaultArcValueFormat(value, ratio);
        }
        function expandArc(id, withoutFadeOut) {
            var target = svg.selectAll('.' + CLASS.chartArc + selectorTarget(id)),
                noneTargets = svg.selectAll('.' + CLASS.arc).filter(function (data) { return data.data.id !== id; });
            target.selectAll('path')
              .transition().duration(50)
                .attr("d", svgArcExpanded)
              .transition().duration(100)
                .attr("d", svgArcExpandedSub)
                .each(function (d) {
                    if (isDonutType(d.data)) {
                        // callback here
                    }
                });
            if (!withoutFadeOut) {
                noneTargets.style("opacity", 0.3);
            }
        }
        function unexpandArc(id) {
            var target = svg.selectAll('.' + CLASS.chartArc + selectorTarget(id));
            target.selectAll('path')
              .transition().duration(50)
                .attr("d", svgArc);
            svg.selectAll('.' + CLASS.arc)
                .style("opacity", 1);
        }
        function shouldShowArcLable() {
            return hasDonutType(c3.data.targets) ? __donut_label_show : __pie_label_show;
        }
        function getArcLabelFormat() {
            return hasDonutType(c3.data.targets) ? __donut_label_format : __pie_label_format;
        }
        function getArcTitle() {
            return hasDonutType(c3.data.targets) ? __donut_title : "";
        }
        function getArcOnClick() {
            var callback = hasDonutType(c3.data.targets) ? __donut_onclick : __pie_onclick;
            return typeof callback === 'function' ? callback : function () {};
        }
        function getArcOnMouseOver() {
            var callback = hasDonutType(c3.data.targets) ? __donut_onmouseover : __pie_onmouseover;
            return typeof callback === 'function' ? callback : function () {};
        }
        function getArcOnMouseOut() {
            var callback = hasDonutType(c3.data.targets) ? __donut_onmouseout : __pie_onmouseout;
            return typeof callback === 'function' ? callback : function () {};
        }

        //-- Domain --//

        function getYDomainMin(targets) {
            var ids = mapToIds(targets), ys = getValuesAsIdKeyed(targets), j, k, baseId, idsInGroup, id, hasNegativeValue;
            if (__data_groups.length > 0) {
                hasNegativeValue = hasNegativeValueInTargets(targets);
                for (j = 0; j < __data_groups.length; j++) {
                    // Determine baseId
                    idsInGroup = __data_groups[j].filter(function (id) { return ids.indexOf(id) >= 0; });
                    if (idsInGroup.length === 0) { continue; }
                    baseId = idsInGroup[0];
                    // Consider negative values
                    if (hasNegativeValue && ys[baseId]) {
                        ys[baseId].forEach(function (v, i) {
                            ys[baseId][i] = v < 0 ? v : 0;
                        });
                    }
                    // Compute min
                    for (k = 1; k < idsInGroup.length; k++) {
                        id = idsInGroup[k];
                        if (! ys[id]) { continue; }
                        ys[id].forEach(function (v, i) {
                            if (getAxisId(id) === getAxisId(baseId) && ys[baseId] && !(hasNegativeValue && +v > 0)) {
                                ys[baseId][i] += +v;
                            }
                        });
                    }
                }
            }
            return d3.min(Object.keys(ys).map(function (key) { return d3.min(ys[key]); }));
        }
        function getYDomainMax(targets) {
            var ids = mapToIds(targets), ys = getValuesAsIdKeyed(targets), j, k, baseId, idsInGroup, id, hasPositiveValue;
            if (__data_groups.length > 0) {
                hasPositiveValue = hasPositiveValueInTargets(targets);
                for (j = 0; j < __data_groups.length; j++) {
                    // Determine baseId
                    idsInGroup = __data_groups[j].filter(function (id) { return ids.indexOf(id) >= 0; });
                    if (idsInGroup.length === 0) { continue; }
                    baseId = idsInGroup[0];
                    // Consider positive values
                    if (hasPositiveValue && ys[baseId]) {
                        ys[baseId].forEach(function (v, i) {
                            ys[baseId][i] = v > 0 ? v : 0;
                        });
                    }
                    // Compute max
                    for (k = 1; k < idsInGroup.length; k++) {
                        id = idsInGroup[k];
                        if (! ys[id]) { continue; }
                        ys[id].forEach(function (v, i) {
                            if (getAxisId(id) === getAxisId(baseId) && ys[baseId] && !(hasPositiveValue && +v < 0)) {
                                ys[baseId][i] += +v;
                            }
                        });
                    }
                }
            }
            return d3.max(Object.keys(ys).map(function (key) { return d3.max(ys[key]); }));
        }
        function getYDomain(targets, axisId) {
            var yTargets = targets.filter(function (d) { return getAxisId(d.id) === axisId; }),
                yMin = axisId === 'y2' ? __axis_y2_min : __axis_y_min,
                yMax = axisId === 'y2' ? __axis_y2_max : __axis_y_max,
                yDomainMin = isValue(yMin) ? yMin : getYDomainMin(yTargets),
                yDomainMax = isValue(yMax) ? yMax : getYDomainMax(yTargets),
                domainLength, padding, padding_top, padding_bottom,
                center = axisId === 'y2' ? __axis_y2_center : __axis_y_center,
                yDomainAbs, widths, diff, ratio,
                showHorizontalDataLabel = hasDataLabel() && __axis_rotated;
            if (yTargets.length === 0) { // use current domain if target of axisId is none
                return axisId === 'y2' ? y2.domain() : y.domain();
            }
            if (yDomainMin === yDomainMax) {
                yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0;
            }
            domainLength = Math.abs(yDomainMax - yDomainMin);
            padding = padding_top = padding_bottom = showHorizontalDataLabel ? 0 : domainLength * 0.1;
            if (center) {
                yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));
                yDomainMax = yDomainAbs - center;
                yDomainMin = center - yDomainAbs;
            }
            // add padding for data label
            if (showHorizontalDataLabel) {
                widths = getDataLabelWidth(yDomainMin, yDomainMax);
                diff = diffDomain(y.range());
                ratio = [widths[0] / diff, widths[1] / diff];
                padding_top += domainLength * (ratio[1] / (1 - ratio[0] - ratio[1]));
                padding_bottom += domainLength * (ratio[0] / (1 - ratio[0] - ratio[1]));
            }
            if (axisId === 'y' && __axis_y_padding) {
                padding_top = isValue(__axis_y_padding.top) ? __axis_y_padding.top : padding;
                padding_bottom = isValue(__axis_y_padding.bottom) ? __axis_y_padding.bottom : padding;
            }
            if (axisId === 'y2' && __axis_y2_padding) {
                padding_top = isValue(__axis_y2_padding.top) ? __axis_y2_padding.top : padding;
                padding_bottom = isValue(__axis_y2_padding.bottom) ? __axis_y2_padding.bottom : padding;
            }
            // Bar chart with only positive values should be 0-based
            if (hasBarType(yTargets) && !hasNegativeValueInTargets(yTargets)) {
                padding_bottom = yDomainMin;
            }
            return [yDomainMin - padding_bottom, yDomainMax + padding_top];
        }
        function getXDomainRatio(isSub) {
            var orgDiff = diffDomain(orgXDomain), currentDiff = diffDomain(x.domain());
            return isSub || currentDiff === 0 ? 1 : orgDiff / currentDiff;
        }
        function getXDomainMin(targets) {
            return __axis_x_min ? __axis_x_min : d3.min(targets, function (t) { return d3.min(t.values, function (v) { return v.x; }); });
        }
        function getXDomainMax(targets) {
            return __axis_x_max ? __axis_x_max : d3.max(targets, function (t) { return d3.max(t.values, function (v) { return v.x; }); });
        }
        function getXDomainPadding(targets, domain) {
            var firstX = domain[0], lastX = domain[1], diff = Math.abs(firstX - lastX), maxDataCount, padding;
            if (isCategorized) {
                padding = 0;
            } else if (hasBarType(targets)) {
                maxDataCount = getMaxDataCount();
                padding = maxDataCount > 1 ? (diff / (maxDataCount - 1)) / 2 : 0.5;
            } else {
                padding = diff * 0.01;
            }
            return padding;
        }
        function getXDomain(targets) {
            var xDomain = [getXDomainMin(targets), getXDomainMax(targets)],
                firstX = xDomain[0], lastX = xDomain[1],
                padding = getXDomainPadding(targets, xDomain),
                min = isTimeSeries ? new Date(firstX.getTime() - padding) : firstX - padding,
                max = isTimeSeries ? new Date(lastX.getTime() + padding) : lastX + padding;
            return [min, max];
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
            return (__data_x && key === __data_x) || (notEmpty(__data_xs) && hasValue(__data_xs, key));
        }
        function isNotX(key) {
            return !isX(key);
        }
        function getXKey(id) {
            return __data_x ? __data_x : notEmpty(__data_xs) ? __data_xs[id] : null;
        }
        function getXValue(id, i) {
            return id in c3.data.x && c3.data.x[id] && c3.data.x[id][i] ? c3.data.x[id][i] : i;
        }
        function addXs(xs) {
            Object.keys(xs).forEach(function (id) {
                __data_xs[id] = xs[id];
            });
        }

        function addName(data) {
            var name;
            if (data) {
                name = __data_names[data.id];
                data.name = name ? name : data.id;
            }
            return data;
        }

        function updateTargetX(targets, x) {
            targets.forEach(function (t) {
                t.values.forEach(function (v, i) {
                    v.x = generateTargetX(x[i], t.id, i);
                });
                c3.data.x[t.id] = x;
            });
        }
        function updateTargetXs(targets, xs) {
            targets.forEach(function (t) {
                if (xs[t.id]) {
                    updateTargetX([t], xs[t.id]);
                }
            });
        }
        function generateTargetX(rawX, id, index) {
            var x;
            if (isTimeSeries) {
                x = rawX ? rawX instanceof Date ? rawX : parseDate(rawX) : parseDate(getXValue(id, index));
            }
            else if (isCustomX && !isCategorized) {
                x = rawX ? +rawX : getXValue(id, index);
            }
            else {
                x = index;
            }
            return x;
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

            // save x for update data by load when custom x and c3.x API
            ids.forEach(function (id) {
                var xKey = getXKey(id), idsForX = Object.keys(c3.data.x);

                if (isCustomX || isTimeSeries) {
                    if (xs.indexOf(xKey) >= 0) {
                        c3.data.x[id] = data.map(function (d) { return d[xKey]; });
                    }
                    // Use other id's x when same x (data.x option) specified.
                    else if (__data_x && idsForX.length > 0) {
                        c3.data.x[id] = c3.data.x[idsForX[0]];
                    }
                    // MEMO: if no x included, use same x of current will be used
                } else {
                    c3.data.x[id] = data.map(function (d, i) { return i; });
                }
            });

            // check x is defined
            ids.forEach(function (id) {
                if (!c3.data.x[id]) {
                    throw new Error('x is not defined for id = "' + id + '".');
                }
            });

            // convert to target
            targets = ids.map(function (id, index) {
                var convertedId = __data_id_converter(id);
                return {
                    id: convertedId,
                    id_org: id,
                    values: data.map(function (d, i) {
                        var xKey = getXKey(id), rawX = d[xKey], x = generateTargetX(rawX, id, i);
                        // use x as categories if custom x and categorized
                        if (isCustomX && isCategorized && index === 0 && rawX) {
                            if (i === 0) { __axis_x_categories = []; }
                            __axis_x_categories.push(rawX);
                        }
                        // mark as x = undefined if value is undefined and filter to remove after mapped
                        if (typeof d[id] === 'undefined') {
                            x = undefined;
                        }
                        return {x: x, value: d[id] !== null && !isNaN(d[id]) ? +d[id] : null, id: convertedId};
                    }).filter(function (v) { return typeof v.x !== 'undefined'; })
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

            // set target types
            if (__data_type) {
                setTargetType(mapToIds(targets).filter(function (id) { return ! (id in __data_types); }), __data_type);
            }

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
            return i > 0 && c3.data.targets[0].values[i - 1] ? c3.data.targets[0].values[i - 1].x : undefined;
        }
        function getNextX(i) {
            return i < getMaxDataCount() - 1 ? c3.data.targets[0].values[i + 1].x : undefined;
        }
        function getMaxDataCount() {
            return d3.max(c3.data.targets, function (t) { return t.values.length; });
        }
        function getMaxDataCountTarget() {
            var length = c3.data.targets.length, max = 0, maxTarget;
            if (length > 1) {
                c3.data.targets.forEach(function (t) {
                    if (t.values.length > max) {
                        maxTarget = t;
                        max = t.values.length;
                    }
                });
            } else {
                maxTarget = length ? c3.data.targets[0] : null;
            }
            return maxTarget;
        }
        function mapToIds(targets) {
            return targets.map(function (d) { return d.id; });
        }
        function mapToTargetIds(ids) {
            return ids ? (typeof ids === 'string' ? [ids] : ids) : mapToIds(c3.data.targets);
        }
        function hasTarget(targets, id) {
            var ids = mapToIds(targets), i;
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
        function isTargetToShow(targetId) {
            return hiddenTargetIds.indexOf(targetId) < 0;
        }
        function isLegendToShow(targetId) {
            return hiddenLegendIds.indexOf(targetId) < 0;
        }
        function filterTargetsToShow(targets) {
            return targets.filter(function (t) { return isTargetToShow(t.id); });
        }
        function mapTargetsToUniqueXs(targets) {
            var xs = d3.set(d3.merge(targets.map(function (t) { return t.values.map(function (v) { return v.x; }); }))).values();
            return isTimeSeries ? xs.map(function (x) { return new Date(x); }) : xs.map(function (x) { return +x; });
        }
        function generateTickValues(xs) {
            var tickValues = xs, targetCount, start, end, count, interval, i, tickValue;
            if (!__axis_x_tick_fit && __axis_x_tick_count) {
                // TODO: need some arguments for __axis_x_tick_count()?
                targetCount = typeof __axis_x_tick_count === 'function' ? __axis_x_tick_count() : __axis_x_tick_count;
                // compute ticks according to __axis_x_tick_count
                if (targetCount === 1) {
                    tickValues = [xs[0]];
                } else if (targetCount === 2) {
                    tickValues = [xs[0], xs[xs.length - 1]];
                } else if (targetCount > 2) {
                    count = targetCount - 2;
                    start = xs[0];
                    end = xs[xs.length - 1];
                    interval = (end - start) / (count + 1);
                    // re-construct uniqueXs
                    tickValues = [start];
                    for (i = 0; i < count; i++) {
                        tickValue = +start + interval * (i + 1);
                        tickValues.push(isTimeSeries ? new Date(tickValue) : tickValue);
                    }
                    tickValues.push(end);
                }
            }
            return tickValues;
        }
        function addHiddenTargetIds(targetIds) {
            hiddenTargetIds = hiddenTargetIds.concat(targetIds);
        }
        function removeHiddenTargetIds(targetIds) {
            hiddenTargetIds = hiddenTargetIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
        }
        function addHiddenLegendIds(targetIds) {
            hiddenLegendIds = hiddenLegendIds.concat(targetIds);
        }
        function removeHiddenLegendIds(targetIds) {
            hiddenLegendIds = hiddenLegendIds.filter(function (id) { return targetIds.indexOf(id) < 0; });
        }
        function getValuesAsIdKeyed(targets) {
            var ys = {};
            targets.forEach(function (t) {
                ys[t.id] = [];
                t.values.forEach(function (v) {
                    ys[t.id].push(v.value);
                });
            });
            return ys;
        }
        function checkValueInTargets(targets, checker) {
            var ids = Object.keys(targets), i, j, values;
            for (i = 0; i < ids.length; i++) {
                values = targets[ids[i]].values;
                for (j = 0; j < values.length; j++) {
                    if (checker(values[j].value)) {
                        return true;
                    }
                }
            }
            return false;
        }
        function hasNegativeValueInTargets(targets) {
            return checkValueInTargets(targets, function (v) { return v < 0; });
        }
        function hasPositiveValueInTargets(targets) {
            return checkValueInTargets(targets, function (v) { return v > 0; });
        }
        function categoryName(i) {
            return i < __axis_x_categories.length ? __axis_x_categories[i] : i;
        }
        function generateClass(prefix, targetId) {
            return " " + prefix + " " + prefix + getTargetSelectorSuffix(targetId);
        }
        function classText(d) { return generateClass(CLASS.text, d.id); }
        function classTexts(d) { return generateClass(CLASS.texts, d.id); }
        function classShape(d, i) { return generateClass(CLASS.shape, i); }
        function classShapes(d) { return generateClass(CLASS.shapes, d.id); }
        function classLine(d) { return classShapes(d) + generateClass(CLASS.line, d.id); }
        function classCircle(d, i) { return classShape(d, i) + generateClass(CLASS.circle, i); }
        function classCircles(d) { return classShapes(d) + generateClass(CLASS.circles, d.id); }
        function classBar(d, i) { return classShape(d, i) + generateClass(CLASS.bar, i); }
        function classBars(d) { return classShapes(d) + generateClass(CLASS.bars, d.id); }
        function classArc(d) { return classShapes(d.data) + generateClass(CLASS.arc, d.data.id); }
        function classArea(d) { return classShapes(d) + generateClass(CLASS.area, d.id); }
        function classRegion(d, i) { return generateClass(CLASS.region, i) + ' ' + ('class' in d ? d.class : ''); }
        function classEvent(d, i) { return generateClass(CLASS.eventRect, i); }

        function getTargetSelectorSuffix(targetId) {
            return targetId || targetId === 0 ? '-' + (targetId.replace ? targetId.replace(/([^a-zA-Z0-9-_])/g, '-') : targetId) : '';
        }
        function selectorTarget(id) { return '.' + CLASS.target + getTargetSelectorSuffix(id); }
        function selectorTargets(ids) { return ids.map(function (id) { return selectorTarget(id); }); }
        function selectorLegend(id) { return '.' + CLASS.legendItem + getTargetSelectorSuffix(id); }
        function selectorLegends(ids) { return ids.map(function (id) { return selectorLegend(id); }); }

        function initialOpacity(d) {
            return d.value !== null && withoutFadeIn[d.id] ? 1 : 0;
        }
        function initialOpacityForText(d) {
            var targetOpacity = opacityForText(d);
            return initialOpacity(d) * targetOpacity;
        }
        function opacityForCircle(d) {
            return isValue(d.value) ? isScatterType(d) ? 0.5 : 1 : 0;
        }
        function opacityForText() {
            return hasDataLabel() ? 1 : 0;
        }
        function hasDataLabel() {
            if (typeof __data_labels === 'boolean' && __data_labels) {
                return true;
            } else if (typeof __data_labels === 'object' && notEmpty(__data_labels)) {
                return true;
            }
            return false;
        }
        function getDataLabelWidth(min, max) {
            var widths = [], paddingCoef = 1.3;
            d3.select('svg').selectAll('.dummy')
                .data([min, max])
              .enter().append('text')
                .text(function (d) { return d; })
                .each(function (d, i) { var box = this.getBBox(); widths[i] = box.width * paddingCoef; })
              .remove();
            return widths;
        }

        function defaultValueFormat(v) {
            var yFormat = __axis_y_tick_format ? __axis_y_tick_format : function (v) { return isValue(v) ? +v : ""; };
            return yFormat(v);
        }
        function defaultArcValueFormat(v, ratio) {
            return (ratio * 100).toFixed(1) + '%';
        }
        function formatByAxisId(id) {
            var defaultFormat = function (v) { return isValue(v) ? +v : ""; }, axisId = getAxisId(id), format = defaultFormat;
            // find format according to axis id
            if (typeof __data_labels.format === 'function') {
                format = __data_labels.format;
            } else if (typeof __data_labels.format === 'object') {
                if (typeof __data_labels.format[axisId] === 'function') {
                    format = __data_labels.format[axisId];
                }
            }
            return format;
        }

        function xx(d) {
            return d ? x(d.x) : null;
        }
        function xv(d) {
            return x(isTimeSeries ? parseDate(d.value) : d.value);
        }
        function yv(d) {
            return y(d.value);
        }
        function subxx(d) {
            return subX(d.x);
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
                diff = x(value.x) - pos[__axis_rotated ? 1 : 0],
                candidates;

            // Update range for search
            diff > 0 ? max = med : min = med;

            // if candidates are two closest min and max, stop recursive call
            if ((max - min) === 1 || (min === 0 && max === 0)) {

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
        function filterSameX(targets, x) {
            return d3.merge(targets.map(function (t) { return t.values; })).filter(function (v) { return v.x === x; });
        }

        function getPathBox(path) {
            var box = path.getBoundingClientRect(),
                items = [path.pathSegList.getItem(0), path.pathSegList.getItem(1)],
                minX = items[0].x, minY = Math.min(items[0].y, items[1].y);
            return {x: minX, y: minY, width: box.width, height: box.height};
        }

        function isOrderDesc() {
            return __data_order && __data_order.toLowerCase() === 'desc';
        }
        function isOrderAsc() {
            return __data_order && __data_order.toLowerCase() === 'asc';
        }
        function orderTargets(targets) {
            var orderAsc = isOrderAsc(), orderDesc = isOrderDesc();
            if (orderAsc || orderDesc) {
                targets.sort(function (t1, t2) {
                    var reducer = function (p, c) { return p + Math.abs(c.value); };
                    var t1Sum = t1.values.reduce(reducer, 0),
                        t2Sum = t2.values.reduce(reducer, 0);
                    return orderAsc ? t2Sum - t1Sum : t1Sum - t2Sum;
                });
            } else if (typeof __data_order === 'function') {
                targets.sort(__data_order);
            } // TODO: accept name array for order
            return targets;
        }

        //-- Tooltip --//

        function showTooltip(selectedData, mouse) {
            var tWidth, tHeight;
            var svgLeft, tooltipLeft, tooltipRight, tooltipTop, chartRight;
            var forArc = hasArcType(c3.data.targets);
            var valueFormat = forArc ? defaultArcValueFormat : defaultValueFormat;
            var dataToShow = selectedData.filter(function (d) { return d && isValue(d.value); });
            if (! __tooltip_show) { return; }
            // don't show tooltip when no data
            if (dataToShow.length === 0) { return; }
            // Construct tooltip
            tooltip.html(__tooltip_contents(selectedData, getXAxisTickFormat(), valueFormat, color)).style("display", "block");
            // Get tooltip dimensions
            tWidth = tooltip.property('offsetWidth');
            tHeight = tooltip.property('offsetHeight');
            // Determin tooltip position
            if (forArc) {
                tooltipLeft = (width / 2) + mouse[0];
                tooltipTop = (height / 2) + mouse[1] + 20;
            } else {
                if (__axis_rotated) {
                    svgLeft = getSvgLeft();
                    tooltipLeft = svgLeft + mouse[0] + 100;
                    tooltipRight = tooltipLeft + tWidth;
                    chartRight = getCurrentWidth() - getCurrentPaddingRight();
                    tooltipTop = x(dataToShow[0].x) + 20;
                } else {
                    svgLeft = getSvgLeft();
                    tooltipLeft = svgLeft + getCurrentPaddingLeft() + x(dataToShow[0].x) + 20;
                    tooltipRight = tooltipLeft + tWidth;
                    chartRight = svgLeft + getCurrentWidth() - getCurrentPaddingRight();
                    tooltipTop = mouse[1] + 15;
                }

                if (tooltipRight > chartRight) {
                    tooltipLeft -= tWidth + 60;
                }
                if (tooltipTop + tHeight > getCurrentHeight()) {
                    tooltipTop -= tHeight + 30;
                }
            }
            // Set tooltip
            tooltip
                .style("top", tooltipTop + "px")
                .style("left", tooltipLeft + 'px');
        }
        function hideTooltip() {
            tooltip.style("display", "none");
        }

        function showXGridFocus(selectedData) {
            var dataToShow = selectedData.filter(function (d) { return d && isValue(d.value); });
            if (! __tooltip_show) { return; }
            // Hide when scatter plot exists
            if (hasScatterType(c3.data.targets) || hasArcType(c3.data.targets)) { return; }
            main.selectAll('line.' + CLASS.xgridFocus)
                .style("visibility", "visible")
                .data([dataToShow[0]])
                .attr(__axis_rotated ? 'y1' : 'x1', xx)
                .attr(__axis_rotated ? 'y2' : 'x2', xx);
        }
        function hideXGridFocus() {
            main.select('line.' + CLASS.xgridFocus).style("visibility", "hidden");
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
            filterTargetsToShow(getTargets(isBarType)).forEach(function (d) {
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
            return function (d) {
                var barIndex = d.id in barIndices ? barIndices[d.id] : 0;
                return d.x || d.x === 0 ? scale(d.x) - barW * (barTargetsNum / 2 - barIndex) : 0;
            };
        }
        function getBarY(isSub) {
            return function (d) {
                var scale = isSub ? getSubYScale(d.id) : getYScale(d.id);
                return scale(d.value);
            };
        }
        function getBarOffset(barIndices, isSub) {
            var targets = orderTargets(filterTargetsToShow(getTargets(isBarType))),
                targetIds = targets.map(function (t) { return t.id; });
            return function (d, i) {
                var scale = isSub ? getSubYScale(d.id) : getYScale(d.id),
                    y0 = scale(0), offset = y0;
                targets.forEach(function (t) {
                    if (t.id === d.id || barIndices[t.id] !== barIndices[d.id]) { return; }
                    if (targetIds.indexOf(t.id) < targetIds.indexOf(d.id) && t.values[i].value * d.value > 0) {
                        offset += scale(t.values[i].value) - y0;
                    }
                });
                return offset;
            };
        }
        function getBarW(axis, barTargetsNum) {
            return __bar_width ? __bar_width : barTargetsNum ? (axis.tickOffset() * 2 * __bar_width_ratio) / barTargetsNum : 0;
        }

        //-- Type --//

        function setTargetType(targetIds, type) {
            mapToTargetIds(targetIds).forEach(function (id) {
                withoutFadeIn[id] = (type === __data_types[id]);
                __data_types[id] = type;
            });
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
        function hasPieType(targets) {
            return hasType(targets, 'pie');
        }
        function hasDonutType(targets) {
            return hasType(targets, 'donut');
        }
        function hasArcType(targets) {
            return hasPieType(targets) || hasDonutType(targets);
        }
        function isLineType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return !(id in __data_types) || __data_types[id] === 'line' || __data_types[id] === 'spline' || __data_types[id] === 'area' || __data_types[id] === 'area-spline';
        }
        function isSplineType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'spline' || __data_types[id] === 'area-spline';
        }
        function isBarType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'bar';
        }
        function isScatterType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'scatter';
        }
        function isPieType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'pie';
        }
        function isDonutType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'donut';
        }
        function isArcType(d) {
            return isPieType(d) || isDonutType(d);
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
        function barOrLineData(d) {
            return isBarType(d) || isLineType(d) ? d.values : [];
        }

        //-- Color --//

        function generateColor(colors, pattern, callback) {
            var ids = [];

            return function (d) {
                var id = d.id || d, color;

                // if callback function is provided
                if (colors[id] instanceof Function) {
                    color = colors[id](d);
                }
                // if specified, choose that color
                else if (id in colors) {
                    color = colors[id];
                }
                // if not specified, choose from pattern
                else {
                    if (ids.indexOf(id) < 0) { ids.push(id); }
                    color = pattern[ids.indexOf(id) % pattern.length];
                }
                return callback instanceof Function ? callback(color, d) : color;
            };
        }

        //-- Date --//

        function parseDate(date) {
            var parsedDate;
            if (!date) { throw Error(date + " can not be parsed as d3.time with format " + __data_x_format + ". Maybe 'x' of this data is not defined. See data.x or data.xs option."); }
            try {
                parsedDate = __data_x_format ? d3.time.format(__data_x_format).parse(date) : new Date(date);
            } catch (e) {
                parsedDate = undefined;
            }
            if (!parsedDate) { window.console.error("Failed to parse x '" + date + "' to Date with format " + __data_x_format); }
            return parsedDate;
        }

        //-- Util --//

        function isWithinCircle(_this, _r) {
            var mouse = d3.mouse(_this), d3_this = d3.select(_this);
            var cx = d3_this.attr("cx") * 1, cy = d3_this.attr("cy") * 1;
            return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < _r;
        }
        function isWithinBar(_this) {
            var mouse = d3.mouse(_this), box = _this.getBBox();
            var x = box.x, y = box.y, w = box.width, h = box.height, offset = 2;
            var sx = x - offset, ex = x + w + offset, sy = y + h + offset, ey = y - offset;
            return sx < mouse[0] && mouse[0] < ex && ey < mouse[1] && mouse[1] < sy;
        }
        function isWithinRegions(x, regions) {
            var i;
            for (i = 0; i < regions.length; i++) {
                if (regions[i].start < x && x <= regions[i].end) { return true; }
            }
            return false;
        }

        function isEmpty(o) {
            return !o || (typeof o === 'string' && o.length === 0) || (typeof o === 'object' && Object.keys(o).length === 0);
        }
        function notEmpty(o) {
            return Object.keys(o).length > 0;
        }
        function hasValue(dict, value) {
            var found = false;
            Object.keys(dict).forEach(function (key) {
                if (dict[key] === value) { found = true; }
            });
            return found;
        }

        function dist(data, pos) {
            var yScale = getAxisId(data.id) === 'y' ? y : y2,
                xIndex = __axis_rotated ? 1 : 0,
                yIndex = __axis_rotated ? 0 : 1;
            return Math.pow(x(data.x) - pos[xIndex], 2) + Math.pow(yScale(data.value) - pos[yIndex], 2);
        }

        function endall(transition, callback) {
            var n = 0;
            transition
                .each(function () { ++n; })
                .each("end", function () {
                    if (!--n) { callback.apply(this, arguments); }
                });
        }

        //-- Selection --//

        function selectPoint(target, d, i) {
            __data_onselected(d, target.node());
            // add selected-circle on low layer g
            main.select('.' + CLASS.selectedCircles + getTargetSelectorSuffix(d.id)).selectAll('.' + CLASS.selectedCircle + '-' + i)
                .data([d])
              .enter().append('circle')
                .attr("class", function () { return generateClass(CLASS.selectedCircle, i); })
                .attr("cx", __axis_rotated ? circleY : circleX)
                .attr("cy", __axis_rotated ? circleX : circleY)
                .attr("stroke", function () { return color(d); })
                .attr("r", __point_select_r * 1.4)
              .transition().duration(100)
                .attr("r", __point_select_r);
        }
        function unselectPoint(target, d, i) {
            __data_onunselected(d, target.node());
            // remove selected-circle from low layer g
            main.select('.' + CLASS.selectedCircles + getTargetSelectorSuffix(d.id)).selectAll('.' + CLASS.selectedCircle + '-' + i)
              .transition().duration(100).attr('r', 0)
                .remove();
        }
        function togglePoint(selected, target, d, i) {
            selected ? selectPoint(target, d, i) : unselectPoint(target, d, i);
        }

        function selectBar(target, d) {
            __data_onselected(d, target.node());
            target.transition().duration(100).style("fill", function () { return d3.rgb(color(d)).darker(1); });
        }
        function unselectBar(target, d) {
            __data_onunselected(d, target.node());
            target.transition().duration(100).style("fill", function () { return color(d); });
        }
        function toggleBar(selected, target, d, i) {
            selected ? selectBar(target, d, i) : unselectBar(target, d, i);
        }

        function filterRemoveNull(data) {
            return data.filter(function (d) { return isValue(d.value); });
        }

        //-- Shape --//

        function getCircles(i, id) {
            return (id ? main.selectAll('.' + CLASS.circles + getTargetSelectorSuffix(id)) : main).selectAll('.' + CLASS.circle + (isValue(i) ? '-' + i : ''));
        }
        function expandCircles(i, id) {
            getCircles(i, id)
                .classed(CLASS.EXPANDED, true)
                .attr('r', __point_focus_expand_r);
        }
        function unexpandCircles(i) {
            getCircles(i)
                .filter(function () { return d3.select(this).classed(CLASS.EXPANDED); })
                .classed(CLASS.EXPANDED, false)
                .attr('r', __point_r);
        }
        function getBars(i) {
            return main.selectAll('.' + CLASS.bar + (isValue(i) ? '-' + i : ''));
        }
        function expandBars(i) {
            getBars(i).classed(CLASS.EXPANDED, true);
        }
        function unexpandBars(i) {
            getBars(i).classed(CLASS.EXPANDED, false);
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

        var areaOnMain = (function () {
            var area;

            if (__axis_rotated) {
                area = d3.svg.area()
                    .x0(function (d) { return getYScale(d.id)(0); })
                    .x1(function (d) { return getYScale(d.id)(d.value); })
                    .y(xx);
            } else {
                area = d3.svg.area()
                    .x(xx)
                    .y0(function (d) { return getYScale(d.id)(0); })
                    .y1(function (d) { return getYScale(d.id)(d.value); });
            }

            return function (d) {
                var data = filterRemoveNull(d.values), x0, y0;

                if (hasType([d], 'area') || hasType([d], 'area-spline')) {
                    isSplineType(d) ? area.interpolate("cardinal") : area.interpolate("linear");
                    return area(data);
                } else {
                    x0 = x(data[0].x);
                    y0 = getYScale(d.id)(data[0].value);
                    return __axis_rotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;
                }
            };
        })();

        function generateDrawBar(barIndices, isSub) {
            var getPoints = generateGetBarPoints(barIndices, isSub);
            return function (d, i) {
                // 4 points that make a bar
                var points = getPoints(d, i);

                // switch points if axis is rotated, not applicable for sub chart
                var indexX = __axis_rotated ? 1 : 0;
                var indexY = __axis_rotated ? 0 : 1;

                var path = 'M ' + points[0][indexX] + ',' + points[0][indexY] + ' ' +
                        'L' + points[1][indexX] + ',' + points[1][indexY] + ' ' +
                        'L' + points[2][indexX] + ',' + points[2][indexY] + ' ' +
                        'L' + points[3][indexX] + ',' + points[3][indexY] + ' ' +
                        'z';

                return path;
            };
        }
        function generateXYForText(barIndices, forX) {
            var getPoints = generateGetBarPoints(barIndices, false),
                getter = forX ? getXForText : getYForText;
            return function (d, i) {
                return getter(getPoints(d, i), d, this);
            };
        }
        function getXForText(points, d) {
            var padding;
            if (__axis_rotated) {
                padding = isBarType(d) ? 4 : 6;
                return points[2][1] + padding * (d.value < 0 ? -1 : 1);
            } else {
                return points[0][0] + (points[2][0] - points[0][0]) / 2;
            }
        }
        function getYForText(points, d, textElement) {
            var box = textElement.getBBox();
            if (__axis_rotated) {
                return (points[0][0] + points[2][0] + box.height * 0.6) / 2;
            } else {
                return points[2][1] + (d.value < 0 ? box.height : isBarType(d) ? -3 : -6);
            }
        }

        function generateGetBarPoints(barIndices, isSub) {
            var barTargetsNum = barIndices.__max__ + 1,
                barW = getBarW(xAxis, barTargetsNum),
                x = getBarX(barW, barTargetsNum, barIndices, !!isSub),
                y = getBarY(!!isSub),
                barOffset = getBarOffset(barIndices, !!isSub),
                yScale = isSub ? getSubYScale : getYScale;
            return function (d, i) {
                var y0 = yScale(d.id)(0),
                    offset = barOffset(d, i) || y0, // offset is for stacked bar chart
                    posX = x(d), posY = y(d);
                // fix posY not to overflow opposite quadrant
                if (__axis_rotated) {
                    if ((d.value > 0 && posY < offset) || (d.value < 0 && posY > offset)) { posY = offset; }
                }
                // 4 points that make a bar
                return [
                    [posX, offset],
                    [posX, posY - (y0 - offset)],
                    [posX + barW, posY - (y0 - offset)],
                    [posX + barW, offset]
                ];
            };
        }

        // For brush region
        var lineOnSub = (function () {
            var line = d3.svg.line()
                .x(__axis_rotated ? function (d) { return getSubYScale(d.id)(d.value); } : subxx)
                .y(__axis_rotated ? subxx : function (d) { return getSubYScale(d.id)(d.value); });
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

        var brush, zoom = function () {};

        brush = d3.svg.brush().on("brush", redrawForBrush);
        brush.update = function () {
            if (context) { context.select('.' + CLASS.brush).call(this); }
            return this;
        };
        brush.scale = function (scale) {
            return __axis_rotated ? this.y(scale) : this.x(scale);
        };

        if (__zoom_enabled) {
            zoom = d3.behavior.zoom()
                .on("zoomstart", function () { zoom.altDomain = d3.event.sourceEvent.altKey ? x.orgDomain() : null; })
                .on("zoom", __zoom_enabled ? redrawForZoom : null);
            zoom.scale = function (scale) {
                return __axis_rotated ? this.y(scale) : this.x(scale);
            };
            zoom.orgScaleExtent = function () {
                var extent = __zoom_extent ? __zoom_extent : [1, 10];
                return [extent[0], Math.max(getMaxDataCount() / extent[1], extent[1])];
            };
            zoom.updateScaleExtent = function () {
                var ratio = diffDomain(x.orgDomain()) / diffDomain(orgXDomain), extent = this.orgScaleExtent();
                this.scaleExtent([extent[0] * ratio, extent[1] * ratio]);
                return this;
            };
        }

        /*-- Draw Chart --*/

        // for svg elements
        var svg, defs, main, context, legend, tooltip, selectChart;

        // for brush area culculation
        var orgXDomain;

        // for save value
        var orgAreaOpacity, withoutFadeIn = {};

        function init(data) {
            var eventRect, grid;
            var i;

            selectChart = d3.select(__bindto);
            if (selectChart.empty()) {
                throw new Error('No bind element found. Check the selector specified by "bindto" and existance of that element. Default "bindto" is "#chart".');
            } else {
                selectChart.html("");
            }

            // Set class
            selectChart.classed("c3", true);

            // Init data as targets
            c3.data.x = {};
            c3.data.targets = convertDataToTargets(data);

            // TODO: set names if names not specified

            // Init sizes and scales
            updateSizes();
            updateScales();

            // Set domains for each scale
            x.domain(d3.extent(getXDomain(c3.data.targets)));
            y.domain(getYDomain(c3.data.targets, 'y'));
            y2.domain(getYDomain(c3.data.targets, 'y2'));
            subX.domain(x.domain());
            subY.domain(y.domain());
            subY2.domain(y2.domain());

            // Save original x domain for zoom update
            orgXDomain = x.domain();

            // Set initialized scales to brush and zoom
            brush.scale(subX);
            if (__zoom_enabled) { zoom.scale(x); }

            /*-- Basic Elements --*/

            // Define svgs
            svg = selectChart.append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .on('mouseenter', __onenter)
                .on('mouseleave', __onleave);

            // Define defs
            defs = svg.append("defs");
            defs.append("clipPath")
                .attr("id", clipId)
              .append("rect")
                .attr("width", width)
                .attr("height", height);
            defs.append("clipPath")
                .attr("id", clipIdForXAxis)
              .append("rect")
                .attr("x", getXAxisClipX)
                .attr("y", getXAxisClipY)
                .attr("width", getXAxisClipWidth)
                .attr("height", getXAxisClipHeight);
            defs.append("clipPath")
                .attr("id", clipIdForYAxis)
              .append("rect")
                .attr("x", getYAxisClipX)
                .attr("y", getYAxisClipY)
                .attr("width", getYAxisClipWidth)
                .attr("height", getYAxisClipHeight);

            // Define regions
            main = svg.append("g").attr("transform", translate.main);
            context = __subchart_show ? svg.append("g").attr("transform", translate.context) : null;
            legend = svg.append("g").attr("transform", translate.legend);

            if (!__legend_show) {
                legend.style('visibility', 'hidden');
                hiddenLegendIds = mapToIds(c3.data.targets);
            }

            // Define tooltip
            tooltip = d3.select(__bindto)
                .style("position", "relative")
              .append("div")
                .style("position", "absolute")
                .style("pointer-events", "none")
                .style("z-index", "10")
                .style("display", "none");

            // MEMO: call here to update legend box and tranlate for all
            // MEMO: translate will be upated by this, so transform not needed in updateLegend()
            updateLegend(mapToIds(c3.data.targets), {withTransform: false, withTransitionForTransform: false});

            /*-- Main Region --*/

            // Add Axis
            main.append("g")
                .attr("class", CLASS.axisX)
                .attr("clip-path", __axis_rotated ? "" : clipPathForXAxis)
                .attr("transform", translate.x)
              .append("text")
                .attr("class", CLASS.axisXLabel)
                .attr("transform", __axis_rotated ? "rotate(-90)" : "")
                .attr("dx", dxForXAxisLabel)
                .attr("dy", dyForXAxisLabel)
                .style("text-anchor", textAnchorForXAxisLabel);

            if (__axis_y_show) {
                main.append("g")
                    .attr("class", CLASS.axisY)
                    .attr("clip-path", __axis_rotated ? clipPathForYAxis : "")
                    .attr("transform", translate.y)
                  .append("text")
                    .attr("class", CLASS.axisYLabel)
                    .attr("transform", __axis_rotated ? "" : "rotate(-90)")
                    .attr("dx", dxForYAxisLabel)
                    .attr("dy", dyForYAxisLabel)
                    .style("text-anchor", textAnchorForYAxisLabel);
            }

            if (__axis_y2_show) {
                main.append("g")
                    .attr("class", CLASS.axisY2)
                    // clip-path?
                    .attr("transform", translate.y2)
                  .append("text")
                    .attr("class", CLASS.axisY2Label)
                    .attr("transform", __axis_rotated ? "" : "rotate(-90)")
                    .attr("dx", dxForY2AxisLabel)
                    .style("text-anchor", textAnchorForY2AxisLabel);
            }

            // Grids
            grid = main.append('g')
                .attr("clip-path", clipPath)
                .attr('class', CLASS.grid);

            // X-Grid
            if (__grid_x_show) {
                grid.append("g").attr("class", CLASS.xgrids);
            }
            if (notEmpty(__grid_x_lines)) {
                grid.append('g').attr("class", CLASS.xgridLines);
            }
            if (__point_focus_line_enabled) {
                grid.append('g')
                    .attr("class", CLASS.xgridFocus)
                  .append('line')
                    .attr('class', CLASS.xgridFocus);
            }

            // Y-Grid
            if (__grid_y_show) {
                grid.append('g').attr('class', CLASS.ygrids);
            }
            if (notEmpty(__grid_y_lines)) {
                grid.append('g').attr('class', CLASS.ygridLines);
            }

            // Regions
            main.append('g')
                .attr("clip-path", clipPath)
                .attr("class", CLASS.regions);

            // Define g for chart area
            main.append('g')
                .attr("clip-path", clipPath)
                .attr('class', CLASS.chart);

            // Cover whole with rects for events
            eventRect = main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.eventRects)
                .style('fill-opacity', 0)
                .style('cursor', __zoom_enabled ? __axis_rotated ? 'ns-resize' : 'ew-resize' : null);

            // Define g for bar chart area
            main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartBars);

            // Define g for line chart area
            main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartLines);

            // Define g for arc chart area
            main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartArcs)
                .attr("transform", translate.arc)
              .append('text')
                .attr('class', CLASS.chartArcsTitle)
                .style("text-anchor", "middle")
                .text(getArcTitle());

            main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartTexts);

            if (__zoom_enabled) { // TODO: __zoom_privileged here?
                // if zoom privileged, insert rect to forefront
                main.insert('rect', __zoom_privileged ? null : 'g.' + CLASS.grid)
                    .attr('class', CLASS.zoomRect)
                    .attr('width', width)
                    .attr('height', height)
                    .style('opacity', 0)
                    .style('cursor', __axis_rotated ? 'ns-resize' : 'ew-resize')
                    .call(zoom).on("dblclick.zoom", null);
            }

            // Set default extent if defined
            if (__axis_x_default) {
                brush.extent(typeof __axis_x_default !== 'function' ? __axis_x_default : __axis_x_default(getXDomain()));
            }

            /*-- Context Region --*/

            if (__subchart_show) {
                // Define g for chart area
                context.append('g')
                    .attr("clip-path", clipPath)
                    .attr('class', CLASS.chart);

                // Define g for bar chart area
                context.select('.' + CLASS.chart).append("g")
                    .attr("class", CLASS.chartBars);

                // Define g for line chart area
                context.select('.' + CLASS.chart).append("g")
                    .attr("class", CLASS.chartLines);

                // Add extent rect for Brush
                context.append("g")
                    .attr("clip-path", clipPath)
                    .attr("class", CLASS.brush)
                    .call(brush)
                  .selectAll("rect")
                    .attr(__axis_rotated ? "width" : "height", __axis_rotated ? width2 : height2);

                // ATTENTION: This must be called AFTER chart added
                // Add Axis
                context.append("g")
                    .attr("class", CLASS.axisX)
                    .attr("transform", translate.subx)
                    .attr("clip-path", __axis_rotated ? "" : clipPathForXAxis);
            }

            // Set targets
            updateTargets(c3.data.targets);

            // Update ticks for width calculation
            if (__axis_rotated) {
                main.select('.' + CLASS.axisX).style("opacity", 0).call(xAxis);
            } else {
                main.select('.' + CLASS.axisY).style("opacity", 0).call(yAxis);
                main.select('.' + CLASS.axisY2).style("opacity", 0).call(yAxis2);
            }

            // Draw with targets
            redraw({withTransform: true, withUpdateXDomain: true, withUpdateOrgXDomain: true, withTransitionForAxis: false});

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
                }), getXAxisTickFormat(), defaultValueFormat, color));
                tooltip.style("top", __tooltip_init_position.top)
                       .style("left", __tooltip_init_position.left)
                       .style("display", "block");
            }

            // Bind resize event
            if (window.onresize == null) {
                window.onresize = generateResize();
            }
            if (window.onresize.add) {
                window.onresize.add(function () {
                    updateAndRedraw({withLegend: true, withTransition: false, withTransitionForTransform: false});
                });
            }
        }

        function generateEventRectsForSingleX(eventRectEnter) {
            eventRectEnter.append("rect")
                .attr("class", classEvent)
                .style("cursor", __data_selection_enabled && __data_selection_grouped ? "pointer" : null)
                .on('mouseover', function (_, i) {
                    if (dragging) { return; } // do nothing if dragging
                    if (hasArcType(c3.data.targets)) { return; }

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

                    // Call event handler
                    main.selectAll('.' + CLASS.shape + '-' + i).each(function (d) {
                        __data_onenter(d);
                    });
                })
                .on('mouseout', function (_, i) {
                    if (hasArcType(c3.data.targets)) { return; }
                    hideXGridFocus();
                    hideTooltip();
                    // Undo expanded shapes
                    unexpandCircles(i);
                    unexpandBars();
                    // Call event handler
                    main.selectAll('.' + CLASS.shape + '-' + i).each(function (d) {
                        __data_onleave(d);
                    });
                })
                .on('mousemove', function (_, i) {
                    var selectedData;

                    if (dragging) { return; } // do nothing when dragging
                    if (hasArcType(c3.data.targets)) { return; }

                    // Show tooltip
                    selectedData = filterTargetsToShow(c3.data.targets).map(function (d) {
                        return addName(d.values[i]);
                    });
                    showTooltip(selectedData, d3.mouse(this));

                    // Show xgrid focus line
                    showXGridFocus(selectedData);

                    if (! __data_selection_enabled) { return; }
                    if (__data_selection_grouped) { return; } // nothing to do when grouped

                    main.selectAll('.' + CLASS.shape + '-' + i)
                        .filter(function (d) { return __data_selection_isselectable(d); })
                        .each(function () {
                            var _this = d3.select(this).classed(CLASS.EXPANDED, true);
                            if (this.nodeName === 'circle') { _this.attr('r', __point_focus_expand_r); }
                            svg.select('.' + CLASS.eventRect + '-' + i).style('cursor', null);
                        })
                        .filter(function () {
                            if (this.nodeName === 'circle') {
                                return isWithinCircle(this, __point_select_r);
                            }
                            else if (this.nodeName === 'path') {
                                return isWithinBar(this);
                            }
                        })
                        .each(function () {
                            var _this = d3.select(this);
                            if (! _this.classed(CLASS.EXPANDED)) {
                                _this.classed(CLASS.EXPANDED, true);
                                if (this.nodeName === 'circle') { _this.attr('r', __point_select_r); }
                            }
                            svg.select('.' + CLASS.eventRect + '-' + i).style('cursor', 'pointer');
                        });
                })
                .on('click', function (_, i) {
                    if (hasArcType(c3.data.targets)) { return; }
                    if (cancelClick) {
                        cancelClick = false;
                        return;
                    }
                    main.selectAll('.' + CLASS.shape + '-' + i).each(function (d) { toggleShape(this, d, i); });
                })
                .call(
                    d3.behavior.drag().origin(Object)
                        .on('drag', function () { drag(d3.mouse(this)); })
                        .on('dragstart', function () { dragstart(d3.mouse(this)); })
                        .on('dragend', function () { dragend(); })
                )
                .call(zoom).on("dblclick.zoom", null);
        }

        function generateEventRectsForMultipleXs(eventRectEnter) {
            eventRectEnter.append('rect')
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', width)
                .attr('height', height)
                .attr('class', CLASS.eventRect)
                .on('mouseout', function () {
                    if (hasArcType(c3.data.targets)) { return; }
                    hideXGridFocus();
                    hideTooltip();
                    unexpandCircles();
                })
                .on('mousemove', function () {
                    var mouse, closest, sameXData, selectedData;

                    if (dragging) { return; } // do nothing when dragging
                    if (hasArcType(c3.data.targets)) { return; }

                    mouse = d3.mouse(this);
                    closest = findClosestFromTargets(c3.data.targets, mouse);

                    sameXData = filterSameX(c3.data.targets, closest.x);

                    // show tooltip when cursor is close to some point
                    selectedData = sameXData.map(function (d) {
                        return addName(d);
                    });
                    showTooltip(selectedData, mouse);

                    // expand points
                    if (__point_focus_expand_enabled) {
                        unexpandCircles();
                        expandCircles(closest.index, closest.id);
                    }

                    // Show xgrid focus line
                    showXGridFocus(selectedData);

                    // Show cursor as pointer if point is close to mouse position
                    if (dist(closest, mouse) < 100) {
                        svg.select('.' + CLASS.eventRect).style('cursor', 'pointer');
                        if (!mouseover) {
                            __data_onenter(closest);
                            mouseover = true;
                        }
                    } else {
                        svg.select('.' + CLASS.eventRect).style('cursor', null);
                        __data_onleave(closest);
                        mouseover = false;
                    }
                })
                .on('click', function () {
                    var mouse, closest;

                    if (hasArcType(c3.data.targets)) { return; }

                    mouse = d3.mouse(this);
                    closest = findClosestFromTargets(c3.data.targets, mouse);

                    // select if selection enabled
                    if (dist(closest, mouse) < 100) {
                        main.select('.' + CLASS.circles + '-' + getTargetSelectorSuffix(closest.id)).select('.' + CLASS.circle + '-' + closest.index).each(function () {
                            toggleShape(this, closest, closest.index);
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

        function toggleShape(target, d, i) {
            var shape = d3.select(target),
                isSelected = shape.classed(CLASS.SELECTED);
            var isWithin = false, toggle;
            if (target.nodeName === 'circle') {
                isWithin = isWithinCircle(target, __point_select_r * 1.5);
                toggle = togglePoint;
            }
            else if (target.nodeName === 'path') {
                isWithin = isWithinBar(target);
                toggle = toggleBar;
            }
            if (__data_selection_grouped || isWithin) {
                if (__data_selection_enabled && __data_selection_isselectable(d)) {
                    if (!__data_selection_multiple) {
                        main.selectAll('.' + CLASS.shapes + (__data_selection_grouped ? getTargetSelectorSuffix(d.id) : "")).selectAll('.' + CLASS.shape).each(function (d, i) {
                            var shape = d3.select(this);
                            if (shape.classed(CLASS.SELECTED)) { toggle(false, shape.classed(CLASS.SELECTED, false), d, i); }
                        });
                    }
                    shape.classed(CLASS.SELECTED, !isSelected);
                    toggle(!isSelected, shape, d, i);
                }
                __data_onclick(d, target);
            }
        }

        function drag(mouse) {
            var sx, sy, mx, my, minX, maxX, minY, maxY;

            if (hasArcType(c3.data.targets)) { return; }
            if (! __data_selection_enabled) { return; } // do nothing if not selectable
            if (__zoom_enabled && ! zoom.altDomain) { return; } // skip if zoomable because of conflict drag dehavior
            if (!__data_selection_multiple) { return; } // skip when single selection becuase drag is used for multiple selection

            sx = dragStart[0];
            sy = dragStart[1];
            mx = mouse[0];
            my = mouse[1];
            minX = Math.min(sx, mx);
            maxX = Math.max(sx, mx);
            minY = (__data_selection_grouped) ? margin.top : Math.min(sy, my);
            maxY = (__data_selection_grouped) ? height : Math.max(sy, my);

            main.select('.' + CLASS.dragarea)
                .attr('x', minX)
                .attr('y', minY)
                .attr('width', maxX - minX)
                .attr('height', maxY - minY);
            // TODO: binary search when multiple xs
            main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape)
                .filter(function (d) { return __data_selection_isselectable(d); })
                .each(function (d, i) {
                    var _this = d3.select(this),
                        isSelected = _this.classed(CLASS.SELECTED),
                        isIncluded = _this.classed(CLASS.INCLUDED),
                        _x, _y, _w, _h, toggle, isWithin = false, box;
                    if (this.nodeName === 'circle') {
                        _x = _this.attr("cx") * 1;
                        _y = _this.attr("cy") * 1;
                        toggle = togglePoint;
                        isWithin = minX < _x && _x < maxX && minY < _y && _y < maxY;
                    }
                    else if (this.nodeName === 'path') {
                        box = getPathBox(this);
                        _x = box.x;
                        _y = box.y;
                        _w = box.width;
                        _h = box.height;
                        toggle = toggleBar;
                        isWithin = !(maxX < _x || _x + _w < minX) && !(maxY < _y || _y + _h < minY);
                    }
                    if (isWithin ^ isIncluded) {
                        _this.classed(CLASS.INCLUDED, !isIncluded);
                        // TODO: included/unincluded callback here
                        _this.classed(CLASS.SELECTED, !isSelected);
                        toggle(!isSelected, _this, d, i);
                    }
                });
        }

        function dragstart(mouse) {
            if (hasArcType(c3.data.targets)) { return; }
            if (! __data_selection_enabled) { return; } // do nothing if not selectable
            dragStart = mouse;
            main.select('.' + CLASS.chart).append('rect')
                .attr('class', CLASS.dragarea)
                .style('opacity', 0.1);
            dragging = true;
            __data_ondragstart();
        }

        function dragend() {
            if (hasArcType(c3.data.targets)) { return; }
            if (! __data_selection_enabled) { return; } // do nothing if not selectable
            main.select('.' + CLASS.dragarea)
                .transition().duration(100)
                .style('opacity', 0)
                .remove();
            main.selectAll('.' + CLASS.shape)
                .classed(CLASS.INCLUDED, false);
            dragging = false;
            __data_ondragend();
        }

        function redraw(options) {
            var xaxis, yaxis, xgrid, xgridData, xgridLines, xgridLine, ygrid, ygridLines, ygridLine;
            var mainCircle, mainBar, mainRegion, mainText, contextBar, eventRectUpdate;
            var barIndices = getBarIndices(), maxDataCountTarget;
            var rectX, rectW;
            var withY, withSubchart, withTransition, withTransitionForExit, withTransitionForAxis, withTransitionForHorizontalAxis, withTransform, withUpdateXDomain, withUpdateOrgXDomain, withLegend;
            var hideAxis = hasArcType(c3.data.targets);
            var drawBar, drawBarOnSub, xForText, yForText;
            var duration, durationForExit, durationForAxis;
            var targetsToShow = filterTargetsToShow(c3.data.targets), tickValues, i, intervalForCulling;

            // abort if no targets to show
            if (targetsToShow.length === 0) {
                return;
            }

            options = isDefined(options) ? options : {};
            withY = isDefined(options.withY) ? options.withY : true;
            withSubchart = isDefined(options.withSubchart) ? options.withSubchart : true;
            withTransition = isDefined(options.withTransition) ? options.withTransition : true;
            withTransform = isDefined(options.withTransform) ? options.withTransform : false;
            withUpdateXDomain = isDefined(options.withUpdateXDomain) ? options.withUpdateXDomain : false;
            withUpdateOrgXDomain = isDefined(options.withUpdateOrgXDomain) ? options.withUpdateOrgXDomain : false;
            withLegend = isDefined(options.withLegend) ? options.withLegend : false;

            withTransitionForExit = isDefined(options.withTransitionForExit) ? options.withTransitionForExit : withTransition;
            withTransitionForAxis = isDefined(options.withTransitionForAxis) ? options.withTransitionForAxis : withTransition;
            withTransitionForHorizontalAxis = isDefined(options.withTransitionForHorizontalAxis) ? options.withTransitionForHorizontalAxis : withTransition;

            duration = withTransition ? __transition_duration : 0;
            durationForExit = withTransitionForExit ? duration : 0;
            durationForAxis = withTransitionForAxis ? duration : 0;

            // update legend and transform each g
            if (withLegend && __legend_show) {
                updateLegend(mapToIds(c3.data.targets), options);
            }

            if (withUpdateOrgXDomain) {
                x.domain(d3.extent(getXDomain(targetsToShow)));
                orgXDomain = x.domain();
                if (__zoom_enabled) { zoom.scale(x).updateScaleExtent(); }
                subX.domain(x.domain());
                brush.scale(subX);
            }

            // ATTENTION: call here to update tickOffset
            if (withUpdateXDomain) {
                x.domain(brush.empty() ? orgXDomain : brush.extent());
                if (__zoom_enabled) { zoom.scale(x).updateScaleExtent(); }
            }
            y.domain(getYDomain(targetsToShow, 'y'));
            y2.domain(getYDomain(targetsToShow, 'y2'));

            // update axis tick values according to options, except for scatter plot
            if (! hasScatterType(targetsToShow)) { // TODO: fix this
                tickValues = generateTickValues(mapTargetsToUniqueXs(targetsToShow)).sort();
                xAxis.tickValues(tickValues);
                subXAxis.tickValues(tickValues);
            }

            // x axis
            xaxis = main.select('.' + CLASS.axisX).style("opacity", hideAxis ? 0 : 1);
            if (__axis_rotated || withTransitionForHorizontalAxis) {
                xaxis = xaxis.transition().duration(durationForAxis);
            }
            xaxis.call(xAxis);
            // y axis
            yaxis = main.select('.' + CLASS.axisY).style("opacity", hideAxis ? 0 : 1);
            if (!__axis_rotated || withTransitionForHorizontalAxis) {
                yaxis = yaxis.transition().duration(durationForAxis);
            }
            yaxis.call(yAxis);
            // y2 axis
            main.select('.' + CLASS.axisY2).style("opacity", hideAxis ? 0 : 1).transition().duration(durationForAxis).call(yAxis2);

            // show/hide if manual culling needed
            if (withUpdateXDomain && __axis_x_tick_culling && tickValues) {
                for (i = 1; i < tickValues.length; i++) {
                    if (tickValues.length / i < __axis_x_tick_culling_max) {
                        intervalForCulling = i;
                        break;
                    }
                }
                d3.selectAll('.' + CLASS.axisX + ' .tick text').each(function (e, i) {
                    d3.select(this).style('display', i % intervalForCulling ? 'none' : 'block');
                });
            }

            // setup drawer - MEMO: these must be called after axis updated
            drawBar = generateDrawBar(barIndices);
            xForText = generateXYForText(barIndices, true);
            yForText = generateXYForText(barIndices, false);

            // Update axis label
            updateAxisLabels();

            // Update sub domain
            subY.domain(y.domain());
            subY2.domain(y2.domain());

            // tooltip
            tooltip.style("display", "none");

            // xgrid focus
            updateXgridFocus();

            // grid
            main.select('line.' + CLASS.xgridFocus).style("visibility", "hidden");
            if (__grid_x_show) {
                if (__grid_x_type === 'year') {
                    xgridData = [];
                    var xDomain = getXDomain();
                    var firstYear = xDomain[0].getFullYear();
                    var lastYear = xDomain[1].getFullYear();
                    for (var year = firstYear; year <= lastYear; year++) {
                        xgridData.push(new Date(year + '-01-01 00:00:00'));
                    }
                } else {
                    xgridData = x.ticks(10);
                }

                xgrid = main.select('.' + CLASS.xgrids).selectAll('.' + CLASS.xgrid)
                    .data(xgridData);
                xgrid.enter().append('line').attr("class", CLASS.xgrid);
                xgrid.attr("x1", __axis_rotated ? 0 : function (d) { return x(d) - xAxis.tickOffset(); })
                    .attr("x2", __axis_rotated ? width : function (d) { return x(d) - xAxis.tickOffset(); })
                    .attr("y1", __axis_rotated ? function (d) { return x(d) - xAxis.tickOffset(); } : margin.top)
                    .attr("y2", __axis_rotated ? function (d) { return x(d) - xAxis.tickOffset(); } : height)
                    .style("opacity", function () { return +d3.select(this).attr(__axis_rotated ? 'y1' : 'x1') === (__axis_rotated ? height : 0) ? 0 : 1; });
                xgrid.exit().remove();
            }
            if (notEmpty(__grid_x_lines)) {
                xgridLines = main.select('.' + CLASS.xgridLines).selectAll('.' + CLASS.xgridLine)
                    .data(__grid_x_lines);
                // enter
                xgridLine = xgridLines.enter().append('g')
                    .attr("class", function (d) { return CLASS.xgridLine + (d.class ? d.class : ''); });
                xgridLine.append('line')
                    .style("opacity", 0);
                xgridLine.append('text')
                    .attr("text-anchor", "end")
                    .attr("transform", __axis_rotated ? "" : "rotate(-90)")
                    .attr('dx', __axis_rotated ? 0 : -margin.top)
                    .attr('dy', -5)
                    .style("opacity", 0);
                // udpate
                xgridLines.select('line')
                  .transition().duration(duration)
                    .attr("x1", __axis_rotated ? 0 : xv)
                    .attr("x2", __axis_rotated ? width : xv)
                    .attr("y1", __axis_rotated ? xv : margin.top)
                    .attr("y2", __axis_rotated ? xv : height)
                    .style("opacity", 1);
                xgridLines.select('text')
                  .transition().duration(duration)
                    .attr("x", __axis_rotated ? width : 0)
                    .attr("y", xv)
                    .text(function (d) { return d.text; })
                    .style("opacity", 1);
                // exit
                xgridLines.exit().transition().duration(duration)
                    .style("opacity", 0)
                    .remove();
            }
            // Y-Grid
            if (withY && __grid_y_show) {
                ygrid = main.select('.' + CLASS.ygrids).selectAll('.' + CLASS.ygrid)
                    .data(y.ticks(__grid_y_ticks));
                ygrid.enter().append('line')
                    .attr('class', CLASS.ygrid);
                ygrid.attr("x1", __axis_rotated ? y : 0)
                    .attr("x2", __axis_rotated ? y : width)
                    .attr("y1", __axis_rotated ? 0 : y)
                    .attr("y2", __axis_rotated ? height : y);
                ygrid.exit().remove();
            }
            if (withY && notEmpty(__grid_y_lines)) {
                ygridLines = main.select('.' + CLASS.ygridLines).selectAll('.' + CLASS.ygridLine)
                    .data(__grid_y_lines);
                // enter
                ygridLine = ygridLines.enter().append('g')
                    .attr("class", function (d) { return CLASS.ygridLine + (d.class ? d.class : ''); });
                ygridLine.append('line')
                    .style("opacity", 0);
                ygridLine.append('text')
                    .attr("text-anchor", "end")
                    .attr("transform", __axis_rotated ? "rotate(-90)" : "")
                    .attr('dx', __axis_rotated ? 0 : -margin.top)
                    .attr('dy', -5)
                    .style("opacity", 0);
                // update
                ygridLines.select('line')
                  .transition().duration(duration)
                    .attr("x1", __axis_rotated ? yv : 0)
                    .attr("x2", __axis_rotated ? yv : width)
                    .attr("y1", __axis_rotated ? 0 : yv)
                    .attr("y2", __axis_rotated ? height : yv)
                    .style("opacity", 1);
                ygridLines.select('text')
                  .transition().duration(duration)
                    .attr("x", __axis_rotated ? 0 : width)
                    .attr("y", yv)
                    .text(function (d) { return d.text; })
                    .style("opacity", 1);
                // exit
                ygridLines.exit().transition().duration(duration)
                    .style("opacity", 0)
                    .remove();
            }

            // bars
            mainBar = main.selectAll('.' + CLASS.bars).selectAll('.' + CLASS.bar)
                .data(barData);
            mainBar.enter().append('path')
                .attr('d', drawBar)
                .style("stroke", 'none')
                .style("opacity", 0)
                .style("fill", function (d) { return color(d); })
                .attr("class", classBar);
            mainBar
                .style("opacity", initialOpacity)
              .transition().duration(duration)
                .attr('d', drawBar)
                .style("opacity", 1);
            mainBar.exit().transition().duration(durationForExit)
                .style('opacity', 0)
                .remove();

            mainText = main.selectAll('.' + CLASS.texts).selectAll('.' + CLASS.text)
                .data(barOrLineData);
            mainText.enter().append('text')
                .attr("class", classText)
                .attr('text-anchor', function (d) { return __axis_rotated ? (d.value < 0 ? 'end' : 'start') : 'middle'; })
                .style("stroke", 'none')
                .style("fill-opacity", 0);
            mainText
                .text(function (d) { return formatByAxisId(d.id)(d.value); })
                .style("fill-opacity", initialOpacityForText)
              .transition().duration(duration)
                .attr('x', xForText)
                .attr('y', yForText)
                .style("fill-opacity", opacityForText);
            mainText.exit()
              .transition().duration(durationForExit)
                .style('fill-opacity', 0)
                .remove();

            // lines and cricles
            main.selectAll('.' + CLASS.line)
                .style("opacity", initialOpacity)
              .transition().duration(duration)
                .attr("d", lineOnMain)
                .style("opacity", 1);
            main.selectAll('.' + CLASS.area)
                .style("opacity", 0)
              .transition().duration(duration)
                .attr("d", areaOnMain)
                .style("opacity", orgAreaOpacity);
            mainCircle = main.selectAll('.' + CLASS.circles).selectAll('.' + CLASS.circle)
                .data(lineOrScatterData);
            mainCircle.enter().append("circle")
                .attr("class", classCircle)
                .style('opacity', 0)
                .attr("r", __point_r);
            mainCircle
                .style("opacity", initialOpacity)
              .transition().duration(duration)
                .style('opacity', opacityForCircle)
                .attr("cx", __axis_rotated ? circleY : circleX)
                .attr("cy", __axis_rotated ? circleX : circleY);
            mainCircle.exit().remove();

            // arc
            main.selectAll('.' + CLASS.chartArc).select('.' + CLASS.arc)
                .attr("transform", withTransform ? "scale(0)" : "")
                .style("opacity", function (d) { return d === this._current ? 0 : 1; })
              .transition().duration(duration)
                .attrTween("d", function (d) {
                    var updated = updateAngle(d), interpolate;
                    if (! updated) {
                        return function () { return "M 0 0"; };
                    }
/*
                    if (this._current === d) {
                        this._current = {
                            startAngle: Math.PI*2,
                            endAngle: Math.PI*2,
                        };
                    }
*/
                    interpolate = d3.interpolate(this._current, updated);
                    this._current = interpolate(0);
                    return function (t) { return getArc(interpolate(t), true); };
                })
                .attr("transform", withTransform ? "scale(1)" : "")
                .style("opacity", 1);
            main.selectAll('.' + CLASS.chartArc).select('text')
                .attr("transform", transformForArcLabel)
                .style("opacity", 0)
              .transition().duration(duration)
                .text(textForArcLabel)
                .style("opacity", function (d) { return isTargetToShow(d.data.id) && isArcType(d.data) ? 1 : 0; });
            main.select('.' + CLASS.chartArcsTitle)
                .style("opacity", hasDonutType(c3.data.targets) ? 1 : 0);

            // subchart
            if (__subchart_show) {
                // reflect main chart to extent on subchart if zoomed
                if (d3.event !== null && d3.event.type === 'zoom') {
                    brush.extent(x.orgDomain()).update();
                }
                // update subchart elements if needed
                if (withSubchart) {
                    // axes
                    context.select('.' + CLASS.axisX).style("opacity", hideAxis ? 0 : 1).transition().duration(duration).call(subXAxis);
                    // extent rect
                    if (!brush.empty()) {
                        brush.extent(x.orgDomain()).update();
                    }
                    // setup drawer - MEMO: this must be called after axis updated
                    drawBarOnSub = generateDrawBar(barIndices, true);
                    // bars
                    contextBar = context.selectAll('.' + CLASS.bars).selectAll('.' + CLASS.bar)
                        .data(barData);
                    contextBar.enter().append('path')
                        .attr('d', drawBarOnSub)
                        .style("stroke", 'none')
                        .style("fill", function (d) { return color(d); })
                        .attr("class", classBar);
                    contextBar
                        .style("opacity", initialOpacity)
                      .transition().duration(duration)
                        .attr('d', drawBarOnSub)
                        .style('opacity', 1);
                    contextBar.exit().transition().duration(duration)
                        .style('opacity', 0)
                        .remove();
                    // lines
                    context.selectAll('.' + CLASS.line)
                        .style("opacity", initialOpacity)
                      .transition().duration(duration)
                        .attr("d", lineOnSub)
                        .style('opacity', 1);
                }
            }

            // circles for select
            main.selectAll('.' + CLASS.selectedCircles)
                .filter(function (d) { return isBarType(d); })
                .selectAll('circle')
                .remove();
            main.selectAll('.' + CLASS.selectedCircle)
              .transition().duration(duration)
                .attr("cx", __axis_rotated ? circleY : circleX)
                .attr("cy", __axis_rotated ? circleX : circleY);

            // rect for mouseover
            if (notEmpty(__data_xs)) {
                eventRectUpdate = main.select('.' + CLASS.eventRects).selectAll('.' + CLASS.eventRect)
                    .data([0]);
                // enter : only one rect will be added
                generateEventRectsForMultipleXs(eventRectUpdate.enter());
                // update
                eventRectUpdate
                    .attr('x', 0)
                    .attr('y', 0)
                    .attr('width', width)
                    .attr('height', height);
                // exit : not needed becuase always only one rect exists
            } else {
                if (isCustomX && !isCategorized) {
                    rectW = function (d, i) {
                        var prevX = getPrevX(i), nextX = getNextX(i), dx = c3.data.x[d.id][i];
                        return (x(nextX ? nextX : dx + 50) - x(prevX ? prevX : dx - 50)) / 2;
                    };
                    rectX = function (d, i) {
                        var prevX = getPrevX(i), dx = c3.data.x[d.id][i];
                        return (x(dx) + x(prevX ? prevX : dx - 50)) / 2;
                    };
                } else {
                    rectW = getEventRectWidth();
                    rectX = function (d) {
                        return x(d.x) - (rectW / 2);
                    };
                }
                // Set data
                maxDataCountTarget = getMaxDataCountTarget();
                main.select('.' + CLASS.eventRects)
                    .datum(maxDataCountTarget ? maxDataCountTarget.values : []);
                // Update rects
                eventRectUpdate = main.select('.' + CLASS.eventRects).selectAll('.' + CLASS.eventRect)
                    .data(function (d) { return d; });
                // enter
                generateEventRectsForSingleX(eventRectUpdate.enter());
                // update
                eventRectUpdate
                    .attr('class', classEvent)
                    .attr("x", __axis_rotated ? 0 : rectX)
                    .attr("y", __axis_rotated ? rectX : 0)
                    .attr("width", __axis_rotated ? width : rectW)
                    .attr("height", __axis_rotated ? rectW : height);
                // exit
                eventRectUpdate.exit().remove();
            }

            // rect for regions
            mainRegion = main.select('.' + CLASS.regions).selectAll('rect.' + CLASS.region)
                .data(__regions);
            mainRegion.enter().append('rect')
                .style("fill-opacity", 0);
            mainRegion
                .attr('class', classRegion)
                .attr("x", __axis_rotated ? 0 : regionStart)
                .attr("y", __axis_rotated ? regionStart : margin.top)
                .attr("width", __axis_rotated ? width : regionWidth)
                .attr("height", __axis_rotated ? regionWidth : height)
              .transition().duration(duration)
                .style("fill-opacity", function (d) { return isValue(d.opacity) ? d.opacity : 0.1; });
            mainRegion.exit().transition().duration(duration)
                .style("fill-opacity", 0)
                .remove();

            // update fadein condition
            mapToIds(c3.data.targets).forEach(function (id) {
                withoutFadeIn[id] = true;
            });
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
                zoom.scale(x).updateScaleExtent();
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

        function generateResize() {
            var resizeFunctions = [];
            function callResizeFunctions() {
                resizeFunctions.forEach(function (f) {
                    f();
                });
            }
            callResizeFunctions.add = function (f) {
                resizeFunctions.push(f);
            };
            return callResizeFunctions;
        }

        function updateSvgSize() {
            svg.attr('width', currentWidth).attr('height', currentHeight);
            svg.select('#' + clipId).select('rect').attr('width', width).attr('height', height);
            svg.select('#' + clipIdForXAxis).select('rect').attr('width', getXAxisClipWidth);
            svg.select('#' + clipIdForYAxis).select('rect').attr('width', getYAxisClipWidth);
            svg.select('.' + CLASS.zoomRect).attr('width', width).attr('height', height);
        }

        function updateAndRedraw(options) {
            options = options || {};
            // same with redraw
            options.withTransition = isDefined(options.withTransition) ? options.withTransition : true;
            options.withTransform = isDefined(options.withTransform) ? options.withTransform : false;
            options.withLegend = isDefined(options.withLegend) ? options.withLegend : false;
            // NOT same with redraw
            options.withUpdateXDomain = true;
            options.withUpdateOrgXDomain = true;
            options.withTransitionForExit = false;
            // Update sizes and scales
            updateSizes();
            updateScales();
            updateSvgSize();
            // Update g positions
            transformAll(options.withTransition);
            // Draw with new sizes & scales
            redraw(options);
        }

        function updateTargets(targets) {
            var mainLineEnter, mainLineUpdate, mainBarEnter, mainBarUpdate, mainPieEnter, mainPieUpdate, mainTextUpdate, mainTextEnter;
            var contextLineEnter, contextLineUpdate, contextBarEnter, contextBarUpdate;

            /*-- Main --*/

            //-- Text --//
            mainTextUpdate = main.select('.' + CLASS.chartTexts)
                  .selectAll('.' + CLASS.chartText)
                    .data(targets);
            mainTextEnter = mainTextUpdate.enter().append('g')
                .attr('class', function (d) { return CLASS.chartText + generateClass(CLASS.target, d.id); })
                .style("pointer-events", "none");
            mainTextEnter.append('g')
                .attr('class', classTexts)
                .style("fill", function (d) { return color(d); });

            //-- Bar --//
            mainBarUpdate = main.select('.' + CLASS.chartBars)
              .selectAll('.' + CLASS.chartBar)
                .data(targets);
            mainBarEnter = mainBarUpdate.enter().append('g')
                .attr('class', function (d) { return CLASS.chartBar + generateClass(CLASS.target, d.id); })
                .style("pointer-events", "none");
            // Bars for each data
            mainBarEnter.append('g')
                .attr("class", classBars)
                .style("fill", function (d) { return color(d); })
                .style("stroke", "none")
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; });

            //-- Line --//
            mainLineUpdate = main.select('.' + CLASS.chartLines)
              .selectAll('.' + CLASS.chartLine)
                .data(targets);
            mainLineEnter = mainLineUpdate.enter().append('g')
                .attr('class', function (d) { return CLASS.chartLine + generateClass(CLASS.target, d.id); })
                .style("pointer-events", "none");
            // Lines for each data
            mainLineEnter.append("path")
                .attr("class", classLine)
                .style("opacity", 0)
                .style("stroke", function (d) { return color(d); });
            // Areas
            mainLineEnter.append("path")
                .attr("class", classArea)
                .style("opacity", function () { orgAreaOpacity = +d3.select(this).style('opacity'); return 0; })
                .style("fill", function (d) { return color(d); });
            // Circles for each data point on lines
            mainLineEnter.append('g')
                .attr("class", function (d) { return generateClass(CLASS.selectedCircles, d.id); });
            mainLineEnter.append('g')
                .attr("class", classCircles)
                .style("fill", function (d) { return color(d); })
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; });
            // Update date for selected circles
            targets.forEach(function (t) {
                main.selectAll('.' + CLASS.selectedCircles + getTargetSelectorSuffix(t.id)).selectAll('.' + CLASS.selectedCircle).each(function (d, i) {
                    d.value = t.values[i].value;
                });
            });
            // MEMO: can not keep same color...
            //mainLineUpdate.exit().remove();

            //-- Pie --//
            mainPieUpdate = main.select('.' + CLASS.chartArcs)
              .selectAll('.' + CLASS.chartArc)
                .data(pie(targets));
            mainPieEnter = mainPieUpdate.enter().append("g")
                .attr("class", function (d) { return CLASS.chartArc + generateClass(CLASS.target, d.data.id); });
            mainPieEnter.append("path")
                .attr("class", classArc)
                .style("opacity", 0)
                .style("fill", function (d) { return color(d.data); })
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; })
                .each(function (d) { this._current = d; })
                .on('mouseover', function (d, i) {
                    var updated = updateAngle(d), arcData = convertToArcData(updated), callback = getArcOnMouseOver();
                    expandArc(updated.data.id);
                    focusLegend(updated.data.id);
                    callback(arcData, i);
                })
                .on('mousemove', function (d) {
                    var updated = updateAngle(d), selectedData = [convertToArcData(updated)];
                    showTooltip(selectedData, d3.mouse(this));
                })
                .on('mouseout', function (d, i) {
                    var updated = updateAngle(d), arcData = convertToArcData(updated), callback = getArcOnMouseOut();
                    unexpandArc(updated.data.id);
                    revertLegend();
                    hideTooltip();
                    callback(arcData, i);
                })
                .on('click', function (d, i) {
                    var updated = updateAngle(d), arcData = convertToArcData(updated), callback = getArcOnClick();
                    callback(arcData, i);
                });
            mainPieEnter.append("text")
                .attr("dy", ".35em")
                .style("opacity", 0)
                .style("text-anchor", "middle")
                .style("pointer-events", "none");
            // MEMO: can not keep same color..., but not bad to update color in redraw
            //mainPieUpdate.exit().remove();

            /*-- Context --*/

            if (__subchart_show) {

                contextBarUpdate = context.select('.' + CLASS.chartBars)
                  .selectAll('.' + CLASS.chartBar)
                    .data(targets);
                contextBarEnter = contextBarUpdate.enter().append('g')
                    .attr('class', function (d) { return CLASS.chartBar + generateClass(CLASS.target, d.id); });
                // Bars for each data
                contextBarEnter.append('g')
                    .attr("class", classBars)
                    .style("fill", function (d) { return color(d); });

                //-- Line --//
                contextLineUpdate = context.select('.' + CLASS.chartLines)
                  .selectAll('.' + CLASS.chartLine)
                    .data(targets);
                contextLineEnter = contextLineUpdate.enter().append('g')
                    .attr('class', function (d) { return CLASS.chartLine + generateClass(CLASS.target, d.id); });
                // Lines for each data
                contextLineEnter.append("path")
                    .attr("class", classLine)
                    .style("opacity", 0)
                    .style("stroke", function (d) { return color(d); });
            }

            /*-- Show --*/

            // Fade-in each chart
            svg.selectAll('.' + CLASS.target).filter(function (d) { return isTargetToShow(d.id); })
                .transition()
                .style("opacity", 1);
        }

        function load(targets, args) {
            // set type if args.types || args.type specified
            if (args.type || args.types) {
                targets.forEach(function (t) {
                    args.types ? setTargetType(t.id, args.types[t.id]) : setTargetType(t.id, args.type);
                });
            }
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
            redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});

            if (typeof args.done === 'function') {
                args.done();
            }
        }
        function loadFromArgs(args) {
            // load data
            if ('data' in args) {
                load(convertDataToTargets(args.data), args);
            }
            else if ('url' in args) {
                d3.csv(args.url, function (error, data) {
                    load(convertDataToTargets(data), args);
                });
            }
            else if ('rows' in args) {
                load(convertDataToTargets(convertRowsToData(args.rows)), args);
            }
            else if ('columns' in args) {
                load(convertDataToTargets(convertColumnsToData(args.columns)), args);
            }
            else {
                throw Error('url or rows or columns is required.');
            }
        }

        function unload(targetIds, done) {
            if (typeof done !== 'function') {
                done = function () {};
            }
            // filter existing target
            targetIds = targetIds.filter(function (id) { return hasTarget(c3.data.targets, id); });
            // If no target, call done and return
            if (!targetIds || targetIds.length === 0) {
                done();
                return;
            }
            svg.selectAll(targetIds.map(function (id) { return selectorTarget(id); }))
              .transition()
                .style('opacity', 0)
                .remove()
                .call(endall, done);
            targetIds.forEach(function (id) {
                // Reset fadein for future load
                withoutFadeIn[id] = false;
                // Remove target's elements
                legend.selectAll('.' + CLASS.legendItem + getTargetSelectorSuffix(id)).remove();
                // Remove target
                c3.data.targets = c3.data.targets.filter(function (t) {
                    return t.id !== id;
                });
            });
        }

        /*-- Draw Legend --*/

        function toggleFocusLegend(id, focus) {
            var legendItem = legend.selectAll('.' + CLASS.legendItem),
                isTarget = function (d) { return (!id || d === id); },
                notTarget = function (d) { return !isTarget(d); };
            legendItem.filter(notTarget).transition().duration(100).style('opacity', focus ? 0.3 : 1);
            legendItem.filter(isTarget).transition().duration(100).style('opacity', focus ? 1 : 0.3);
        }
        function focusLegend(id) {
            toggleFocusLegend(id, true);
        }
        function defocusLegend(id) {
            toggleFocusLegend(id, false);
        }
        function revertLegend() {
            legend.selectAll('.' + CLASS.legendItem)
              .transition().duration(100)
                .style('opacity', 1);
        }
        function showLegend(targetIds) {
            removeHiddenLegendIds(targetIds);
            legend.selectAll(selectorLegends(targetIds))
                .style('visibility', 'visible')
              .transition()
                .style('opacity', 1);
            updateLegend(mapToIds(c3.data.targets));
        }
        function hideLegend(targetIds) {
            addHiddenLegendIds(targetIds);
            legend.selectAll(selectorLegends(targetIds))
                .style('opacity', 0)
                .style('visibility', 'hidden');
            updateLegend(mapToIds(c3.data.targets));
        }

        function updateLegend(targetIds, options) {
            var xForLegend, xForLegendText, xForLegendRect, yForLegend, yForLegendText, yForLegendRect;
            var paddingTop = 4, paddingRight = 26, maxWidth = 0, maxHeight = 0, posMin = 10;
            var l, totalLength = 0, offsets = {}, widths = {}, heights = {}, margins = [0], steps = {}, step = 0;
            var withTransition, withTransitionForTransform, withTransformAll;

            options = options || {};
            withTransition = isDefined(options.withTransition) ? options.withTransition : true;
            withTransitionForTransform = isDefined(options.withTransitionForTransform) ? options.withTransitionForTransform : true;
            withTransformAll = isDefined(options.withTransformAll) ? options.withTransformAll : true;

            function updatePositions(textElement, id, reset) {
                var box = textElement.getBBox(),
                    itemWidth = Math.ceil((box.width + paddingRight) / 10) * 10,
                    itemHeight = Math.ceil((box.height + paddingTop) / 10) * 10,
                    itemLength = isLegendRight ? itemHeight : itemWidth,
                    areaLength = isLegendRight ? getLegendHeight() : getLegendWidth(),
                    margin, maxLength;

                // MEMO: care about condifion of step, totalLength
                function updateValues(id, withoutStep) {
                    if (!withoutStep) {
                        margin = (areaLength - totalLength - itemLength) / 2;
                        if (margin < posMin) {
                            margin = (areaLength - itemLength) / 2;
                            totalLength = 0;
                            step++;
                        }
                    }
                    steps[id] = step;
                    margins[step] = margin;
                    offsets[id] = totalLength;
                    totalLength += itemLength;
                }

                if (reset) {
                    totalLength = 0;
                    step = 0;
                    maxWidth = 0;
                    maxHeight = 0;
                }

                if (__legend_show && !isLegendToShow(id)) {
                    widths[id] = heights[id] = steps[id] = offsets[id] = 0;
                    return;
                }

                widths[id] = itemWidth;
                heights[id] = itemHeight;

                if (!maxWidth || itemWidth >= maxWidth) { maxWidth = itemWidth; }
                if (!maxHeight || itemHeight >= maxHeight) { maxHeight = itemHeight; }
                maxLength = isLegendRight ? maxHeight : maxWidth;

                if (__legend_equally) {
                    Object.keys(widths).forEach(function (id) { widths[id] = maxWidth; });
                    Object.keys(heights).forEach(function (id) { heights[id] = maxHeight; });
                    margin = (areaLength - maxLength * targetIds.length) / 2;
                    if (margin < posMin) {
                        totalLength = 0;
                        step = 0;
                        targetIds.forEach(function (id) { updateValues(id); });
                    }
                    else {
                        updateValues(id, true);
                    }
                } else {
                    updateValues(id);
                }
            }

            if (isLegendRight) {
                xForLegend = function (id) { return maxWidth * (0.2 + steps[id]); };
                yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
            } else {
                xForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
                yForLegend = function (id) { return maxHeight * (0.2 + steps[id]); };
            }
            xForLegendText = function (id, i) { return xForLegend(id, i) + 14; };
            yForLegendText = function (id, i) { return yForLegend(id, i) + 9; };
            xForLegendRect = function (id, i) { return xForLegend(id, i) - 4; };
            yForLegendRect = function (id, i) { return yForLegend(id, i) - 7; };

            // Define g for legend area
            l = legend.selectAll('.' + CLASS.legendItem)
                .data(targetIds)
              .enter().append('g')
                .attr('class', function (id) { return generateClass(CLASS.legendItem, id); })
                .style('visibility', function (id) { return isLegendToShow(id) ? 'visible' : 'hidden'; })
                .style('cursor', 'pointer')
                .on('click', function (id) {
                    typeof __legend_item_onclick === 'function' ? __legend_item_onclick(id) : c3.toggle(id);
                })
                .on('mouseover', function (id) {
                    c3.focus(id);
                })
                .on('mouseout', function () {
                    c3.revert();
                });
            l.append('text')
                .text(function (id) { return isDefined(__data_names[id]) ? __data_names[id] : id; })
                .each(function (id, i) { updatePositions(this, id, i === 0); })
                .style("pointer-events", "none")
                .attr('x', isLegendRight ? xForLegendText : -200)
                .attr('y', isLegendRight ? -200 : yForLegendText);
            l.append('rect')
                .attr("class", CLASS.legendItemEvent)
                .style('fill-opacity', 0)
                .attr('x', isLegendRight ? xForLegendRect : -200)
                .attr('y', isLegendRight ? -200 : yForLegendRect)
                .attr('width', function (id) { return widths[id]; })
                .attr('height', function (id) { return heights[id]; });
            l.append('rect')
                .attr("class", CLASS.legendItemTile)
                .style("pointer-events", "none")
                .style('fill', function (id) { return color(id); })
                .attr('x', isLegendRight ? xForLegendText : -200)
                .attr('y', isLegendRight ? -200 : yForLegend)
                .attr('width', 10)
                .attr('height', 10);

            legend.selectAll('text')
                .data(targetIds)
                .text(function (id) { return isDefined(__data_names[id]) ? __data_names[id] : id; }) // MEMO: needed for update
                .each(function (id, i) { updatePositions(this, id, i === 0); })
              .transition().duration(withTransition ? 250 : 0)
                .attr('x', xForLegendText)
                .attr('y', yForLegendText);

            legend.selectAll('rect.' + CLASS.legendItemEvent)
                .data(targetIds)
              .transition().duration(withTransition ? 250 : 0)
                .attr('x', xForLegendRect)
                .attr('y', yForLegendRect);

            legend.selectAll('rect.' + CLASS.legendItemTile)
                .data(targetIds)
              .transition().duration(withTransition ? 250 : 0)
                .attr('x', xForLegend)
                .attr('y', yForLegend);

            // Update all to reflect change of legend
            updateLegendItemWidth(maxWidth);
            updateLegendItemHeight(maxHeight);
            updateLegendStep(step);
            // Update size and scale
            updateSizes();
            updateScales();
            updateSvgSize();
            // Update g positions
            if (withTransformAll) {
                transformAll(withTransitionForTransform);
            }
        }

        /*-- Event Handling --*/

        function isNoneArc(d) {
            return hasTarget(c3.data.targets, d.id);
        }
        function isArc(d) {
            return 'data' in d && hasTarget(c3.data.targets, d.data.id);
        }
        function getGridFilter(params) {
            var value = params && params.value ? params.value : null,
                klass = params && params['class'] ? params['class'] : null;
            return value ? function (line) { return line.value !== value; } : klass ? function (line) { return line['class'] !== klass; } : function () { return true; };
        }
        function transformTo(targetIds, type, optionsForRedraw) {
            var withTransitionForAxis = !hasArcType(c3.data.targets);
            setTargetType(targetIds, type);
            updateAndRedraw(optionsForRedraw ? optionsForRedraw : {withTransitionForAxis: withTransitionForAxis});
        }

        c3.focus = function (targetId) {
            var candidates = svg.selectAll(selectorTarget(targetId)),
                candidatesForNoneArc = candidates.filter(isNoneArc),
                candidatesForArc = candidates.filter(isArc);
            function focus(targets) {
                filterTargetsToShow(targets).transition().duration(100).style('opacity', 1);
            }
            c3.revert();
            c3.defocus();
            focus(candidatesForNoneArc.classed(CLASS.focused, true));
            focus(candidatesForArc);
            if (hasArcType(c3.data.targets)) {
                expandArc(targetId, true);
            }
            focusLegend(targetId);
        };

        c3.defocus = function (targetId) {
            var candidates = svg.selectAll(selectorTarget(targetId)),
                candidatesForNoneArc = candidates.filter(isNoneArc),
                candidatesForArc = candidates.filter(isArc);
            function defocus(targets) {
                filterTargetsToShow(targets).transition().duration(100).style('opacity', 0.3);
            }
            c3.revert();
            defocus(candidatesForNoneArc.classed(CLASS.focused, false));
            defocus(candidatesForArc);
            if (hasArcType(c3.data.targets)) {
                unexpandArc(targetId);
            }
            defocusLegend(targetId);
        };

        c3.revert = function (targetId) {
            var candidates = svg.selectAll(selectorTarget(targetId)),
                candidatesForNoneArc = candidates.filter(isNoneArc),
                candidatesForArc = candidates.filter(isArc);
            function revert(targets) {
                filterTargetsToShow(targets).transition().duration(100).style('opacity', 1);
            }
            revert(candidatesForNoneArc.classed(CLASS.focused, false));
            revert(candidatesForArc);
            if (hasArcType(c3.data.targets)) {
                unexpandArc(targetId);
            }
            revertLegend();
        };

        c3.show = function (targetIds, options) {
            targetIds = mapToTargetIds(targetIds);
            options = options || {};

            removeHiddenTargetIds(targetIds);
            svg.selectAll(selectorTargets(targetIds))
              .transition()
                .style('opacity', 1);

            if (options.withLegend) {
                showLegend(targetIds);
            }

            redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withTransitionForHorizontalAxis: false});
        };

        c3.hide = function (targetIds, options) {
            targetIds = mapToTargetIds(targetIds);
            options = options || {};

            addHiddenTargetIds(targetIds);
            svg.selectAll(selectorTargets(targetIds))
              .transition()
                .style('opacity', 0);

            if (options.withLegend) {
                hideLegend(targetIds);
            }

            redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withTransitionForHorizontalAxis: false});
        };

        c3.toggle = function (targetId) {
            isTargetToShow(targetId) ? c3.hide(targetId) : c3.show(targetId);
        };

        c3.unzoom = function () {
            brush.clear().update();
            redraw({withUpdateXDomain: true});
        };

        c3.load = function (args) {
            // update xs if specified
            if (args.xs) {
                addXs(args.xs);
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
            // unload if needed
            if ('unload' in args) {
                // TODO: do not unload if target will load (included in url/rows/columns)
                unload(mapToTargetIds((typeof args.unload === 'boolean' && args.unload) ? null : args.unload), function () {
                    loadFromArgs(args);
                });
            } else {
                loadFromArgs(args);
            }
        };

        c3.unload = function (targetIds) {
            unload(mapToTargetIds(targetIds), function () {
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});
            });
        };

        c3.selected = function (targetId) {
            return d3.merge(
                main.selectAll('.' + CLASS.shapes + getTargetSelectorSuffix(targetId)).selectAll('.' + CLASS.shape)
                    .filter(function () { return d3.select(this).classed(CLASS.SELECTED); })
                    .map(function (d) { return d.map(function (_d) { return _d.__data__; }); })
            );
        };

        c3.select = function (ids, indices, resetOther) {
            if (! __data_selection_enabled) { return; }
            main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape).each(function (d, i) {
                var shape = d3.select(this),
                    select = (this.nodeName === 'circle') ? selectPoint : selectBar,
                    unselect = (this.nodeName === 'circle') ? unselectPoint : unselectBar,
                    isTargetId = __data_selection_grouped || !ids || ids.indexOf(d.id) >= 0,
                    isTargetIndex = !indices || indices.indexOf(i) >= 0,
                    isSelected = shape.classed(CLASS.SELECTED);
                if (isTargetId && isTargetIndex) {
                    if (__data_selection_isselectable(d) && !isSelected) {
                        select(shape.classed(CLASS.SELECTED, true), d, i);
                    }
                } else if (isDefined(resetOther) && resetOther) {
                    if (isSelected) {
                        unselect(shape.classed(CLASS.SELECTED, false), d, i);
                    }
                }
            });
        };

        c3.unselect = function (ids, indices) {
            if (! __data_selection_enabled) { return; }
            main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape).each(function (d, i) {
                var shape = d3.select(this),
                    unselect = (this.nodeName === 'circle') ? unselectPoint : unselectBar,
                    isTargetId = __data_selection_grouped || !ids || ids.indexOf(d.id) >= 0,
                    isTargetIndex = !indices || indices.indexOf(i) >= 0,
                    isSelected = shape.classed(CLASS.SELECTED);
                if (isTargetId && isTargetIndex) {
                    if (__data_selection_isselectable(d)) {
                        if (isSelected) {
                            unselect(shape.classed(CLASS.SELECTED, false), d, i);
                        }
                    }
                }
            });
        };

        c3.toLine = function (targetIds) {
            transformTo(targetIds, 'line');
        };

        c3.toSpline = function (targetIds) {
            transformTo(targetIds, 'spline');
        };

        c3.toBar = function (targetIds) {
            transformTo(targetIds, 'bar');
        };

        c3.toScatter = function (targetIds) {
            transformTo(targetIds, 'scatter');
        };

        c3.toArea = function (targetIds) {
            transformTo(targetIds, 'area');
        };

        c3.toAreaSpline = function (targetIds) {
            transformTo(targetIds, 'area-spline');
        };

        c3.toPie = function (targetIds) {
            transformTo(targetIds, 'pie', {withTransform: true});
        };

        c3.toDonut = function (targetIds) {
            transformTo(targetIds, 'donut', {withTransform: true});
        };

        c3.groups = function (groups) {
            if (isUndefined(groups)) { return __data_groups; }
            __data_groups = groups;
            redraw();
            return __data_groups;
        };

        c3.xgrids = function (grids) {
            if (! grids) { return __grid_x_lines; }
            __grid_x_lines = grids;
            redraw();
            return __grid_x_lines;
        };
        c3.xgrids.add = function (grids) {
            if (! grids) { return; }
            return c3.xgrids(__grid_x_lines.concat(grids));
        };
        c3.xgrids.remove = function (params) { // TODO: multiple
            var filter = getGridFilter(params);
            return c3.xgrids(__grid_x_lines.filter(filter));
        };

        c3.ygrids = function (grids) {
            if (! grids) { return __grid_y_lines; }
            __grid_y_lines = grids;
            redraw();
            return __grid_y_lines;
        };
        c3.ygrids.add = function (grids) {
            if (! grids) { return; }
            return c3.ygrids(__grid_y_lines.concat(grids));
        };
        c3.ygrids.remove = function (params) { // TODO: multiple
            var filter = getGridFilter(params);
            return c3.ygrids(__grid_y_lines.filter(filter));
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
                var duration = isValue(options.duration) ? options.duration : 0;
                svg.selectAll('.' + cls)
                  .transition().duration(duration)
                    .style('fill-opacity', 0)
                    .remove();
                __regions = __regions.filter(function (region) {
                    return region.classes.indexOf(cls) < 0;
                });
            });
            return __regions;
        };

        c3.data.get = function (targetId) {
            var target = c3.data.getAsTarget(targetId);
            return isDefined(target) ? target.values.map(function (d) { return d.value; }) : undefined;
        };
        c3.data.getAsTarget = function (targetId) {
            var targets = getTargets(function (t) { return t.id === targetId; });
            return targets.length > 0 ? targets[0] : undefined;
        };
        c3.data.names = function (names) {
            if (!arguments.length) { return __data_names; }
            Object.keys(names).forEach(function (id) {
                __data_names[id] = names[id];
            });
            updateLegend(mapToIds(c3.data.targets), {withTransition: true});
            return __data_names;
        };

        c3.x = function (x) {
            if (arguments.length) {
                updateTargetX(c3.data.targets, x);
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});
            }
            return c3.data.x;
        };
        c3.xs = function (xs) {
            if (arguments.length) {
                updateTargetXs(c3.data.targets, xs);
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});
            }
            return c3.data.x;
        };

        c3.axis.labels = function (labels) {
            if (arguments.length) {
                Object.keys(labels).forEach(function (axisId) {
                    setAxisLabelText(axisId, labels[axisId]);
                });
                updateAxisLabels();
            }
            // TODO: return some values?
        };
        c3.axis.max = function (max) {
            if (arguments.length) {
                if (typeof max === 'object') {
                    if (isValue(max.y)) { __axis_y_max = +max.y; }
                    if (isValue(max.y2)) { __axis_y2_max = +max.y2; }
                } else {
                    __axis_y_max = __axis_y2_max = +max;
                }
                redraw();
            }
        };
        c3.axis.min = function (min) {
            if (arguments.length) {
                if (typeof min === 'object') {
                    if (isValue(min.y)) { __axis_y_min = +min.y; }
                    if (isValue(min.y2)) { __axis_y2_min = +min.y2; }
                } else {
                    __axis_y_min = __axis_y2_min = +min;
                }
                redraw();
            }
        };
        c3.axis.range = function (range) {
            if (arguments.length) {
                if (typeof range.max !== 'undefined') { c3.axis.max(range.max); }
                if (typeof range.min !== 'undefined') { c3.axis.min(range.min); }
            }
        };

        c3.legend.show = function (targetIds) {
            if (!__legend_show) {
                __legend_show = true;
                legend.style('visibility', 'visible');
            }
            showLegend(mapToTargetIds(targetIds));
            redraw({withTransitionForHorizontalAxis: false});
        };
        c3.legend.hide = function (targetIds) {
            if (__legend_show && isEmpty(targetIds)) {
                __legend_show = false;
                legend.style('visibility', 'hidden');
            }
            hideLegend(mapToTargetIds(targetIds));
            redraw({withTransitionForHorizontalAxis: false});
        };

        c3.resize = function (size) {
            __size_width = size ? size.width : null;
            __size_height = size ? size.height : null;
            updateAndRedraw({withLegend: true, withTransition: false, withTransitionForTransform: false});
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

    function isValue(v) {
        return v || v === 0;
    }
    function isUndefined(v) {
        return typeof v === 'undefined';
    }
    function isDefined(v) {
        return typeof v !== 'undefined';
    }

    if (typeof window.define === "function" && window.define.amd) {
        window.define("c3", ["d3"], c3);
    } else {
        window.c3 = c3;
    }
    // TODO: module.exports

})(window);
