(function (window) {
    'use strict';

    /*global define, module, exports, require */

    var c3 = {
        version: "0.2.2"
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
        chartArcsBackground: 'c3-chart-arcs-background',
        chartArcsGaugeUnit: 'c3-chart-arcs-gauge-unit',
        chartArcsGaugeMax: 'c3-chart-arcs-gauge-max',
        chartArcsGaugeMin: 'c3-chart-arcs-gauge-min',
        selectedCircle: 'c3-selected-circle',
        selectedCircles: 'c3-selected-circles',
        eventRect: 'c3-event-rect',
        eventRects: 'c3-event-rects',
        eventRectsSingle: 'c3-event-rects-single',
        eventRectsMultiple: 'c3-event-rects-multiple',
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
        lines: 'c3-lines',
        bar: 'c3-bar',
        bars: 'c3-bars',
        circle: 'c3-circle',
        circles: 'c3-circles',
        arc: 'c3-arc',
        arcs: 'c3-arcs',
        area: 'c3-area',
        areas: 'c3-areas',
        empty: 'c3-empty',
        text: 'c3-text',
        texts: 'c3-texts',
        gaugeValue: 'c3-gauge-value',
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
        axis: 'c3-axis',
        axisX: 'c3-axis-x',
        axisXLabel: 'c3-axis-x-label',
        axisY: 'c3-axis-y',
        axisYLabel: 'c3-axis-y-label',
        axisY2: 'c3-axis-y2',
        axisY2Label: 'c3-axis-y2-label',
        legendItem: 'c3-legend-item',
        legendItemEvent: 'c3-legend-item-event',
        legendItemTile: 'c3-legend-item-tile',
        legendItemHidden: 'c3-legend-item-hidden',
        legendItemFocused: 'c3-legend-item-focused',
        dragarea: 'c3-dragarea',
        EXPANDED: '_expanded_',
        SELECTED: '_selected_',
        INCLUDED: '_included_',
    };

    /*
     * Generate chart according to config
     */
    c3.generate = function (config) {

        var d3 = window.d3 ? window.d3 : 'undefined' !== typeof require ? require("d3") : undefined;

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
                if (!isLast && typeof nextTarget !== 'object') {
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
            __padding_right = getConfig(['padding', 'right']),
            __padding_top = getConfig(['padding', 'top']),
            __padding_bottom = getConfig(['padding', 'bottom']);

        var __zoom_enabled = getConfig(['zoom', 'enabled'], false),
            __zoom_extent = getConfig(['zoom', 'extent']),
            __zoom_privileged = getConfig(['zoom', 'privileged'], false);

        var __interaction_enabled = getConfig(['interaction', 'enabled'], true);

        var __onenter = getConfig(['onenter'], function () {}),
            __onleave = getConfig(['onleave'], function () {}),
            __onresize = getConfig(['onresize'], function () {}),
            __onresized = getConfig(['onresized'], function () {});

        var __transition_duration = getConfig(['transition', 'duration'], 350);

        // data - data configuration
        checkConfig('data', 'data is required in config');

        var __data_x = getConfig(['data', 'x']),
            __data_xs = getConfig(['data', 'xs'], {}),
            __data_x_format = getConfig(['data', 'x_format'], '%Y-%m-%d'),
            __data_id_converter = getConfig(['data', 'id_converter'], function (id) { return id; }),
            __data_names = getConfig(['data', 'names'], {}),
            __data_classes = getConfig(['data', 'classes'], {}),
            __data_groups = getConfig(['data', 'groups'], []),
            __data_axes = getConfig(['data', 'axes'], {}),
            __data_type = getConfig(['data', 'type']),
            __data_types = getConfig(['data', 'types'], {}),
            __data_labels = getConfig(['data', 'labels'], {}),
            __data_order = getConfig(['data', 'order']),
            __data_regions = getConfig(['data', 'regions'], {}),
            __data_color = getConfig(['data', 'color']),
            __data_colors = getConfig(['data', 'colors'], {}),
            __data_hide = getConfig(['data', 'hide'], false),
            __data_filter = getConfig(['data', 'filter']),
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

        // configuration for no plot-able data supplied.
        var __data_empty_label_text = getConfig(['data', 'empty', 'label', 'text'], "");
        
        // subchart
        var __subchart_show = getConfig(['subchart', 'show'], false),
            __subchart_size_height = getConfig(['subchart', 'size', 'height'], 60);

        // color
        var __color_pattern = getConfig(['color', 'pattern'], []),
            __color_threshold  = getConfig(['color', 'threshold'], {});

        // legend
        var __legend_show = getConfig(['legend', 'show'], true),
            __legend_position = getConfig(['legend', 'position'], 'bottom'),
            __legend_item_onclick = getConfig(['legend', 'item', 'onclick']),
            __legend_item_onmouseover = getConfig(['legend', 'item', 'onmouseover']),
            __legend_item_onmouseout = getConfig(['legend', 'item', 'onmouseout']),
            __legend_equally = getConfig(['legend', 'equally'], false);

        // axis
        var __axis_rotated = getConfig(['axis', 'rotated'], false),
            __axis_x_show = getConfig(['axis', 'x', 'show'], true),
            __axis_x_type = getConfig(['axis', 'x', 'type'], 'indexed'),
            __axis_x_localtime = getConfig(['axis', 'x', 'localtime'], true),
            __axis_x_categories = getConfig(['axis', 'x', 'categories'], []),
            __axis_x_tick_centered = getConfig(['axis', 'x', 'tick', 'centered'], false),
            __axis_x_tick_format = getConfig(['axis', 'x', 'tick', 'format']),
            __axis_x_tick_culling = getConfig(['axis', 'x', 'tick', 'culling'], {}),
            __axis_x_tick_culling_max = getConfig(['axis', 'x', 'tick', 'culling', 'max'], 10),
            __axis_x_tick_count = getConfig(['axis', 'x', 'tick', 'count']),
            __axis_x_tick_fit = getConfig(['axis', 'x', 'tick', 'fit'], true),
            __axis_x_tick_values = getConfig(['axis', 'x', 'tick', 'values'], null),
            __axis_x_tick_rotate = getConfig(['axis', 'x', 'tick', 'rotate']),
            __axis_x_max = getConfig(['axis', 'x', 'max'], null),
            __axis_x_min = getConfig(['axis', 'x', 'min'], null),
            __axis_x_padding = getConfig(['axis', 'x', 'padding'], {}),
            __axis_x_height = getConfig(['axis', 'x', 'height']),
            __axis_x_default = getConfig(['axis', 'x', 'default']),
            __axis_x_label = getConfig(['axis', 'x', 'label'], {}),
            __axis_y_show = getConfig(['axis', 'y', 'show'], true),
            __axis_y_max = getConfig(['axis', 'y', 'max']),
            __axis_y_min = getConfig(['axis', 'y', 'min']),
            __axis_y_center = getConfig(['axis', 'y', 'center']),
            __axis_y_label = getConfig(['axis', 'y', 'label'], {}),
            __axis_y_inner = getConfig(['axis', 'y', 'inner'], false),
            __axis_y_tick_format = getConfig(['axis', 'y', 'tick', 'format']),
            __axis_y_padding = getConfig(['axis', 'y', 'padding']),
            __axis_y_ticks = getConfig(['axis', 'y', 'ticks'], 10),
            __axis_y2_show = getConfig(['axis', 'y2', 'show'], false),
            __axis_y2_max = getConfig(['axis', 'y2', 'max']),
            __axis_y2_min = getConfig(['axis', 'y2', 'min']),
            __axis_y2_center = getConfig(['axis', 'y2', 'center']),
            __axis_y2_label = getConfig(['axis', 'y2', 'label'], {}),
            __axis_y2_inner = getConfig(['axis', 'y2', 'inner'], false),
            __axis_y2_tick_format = getConfig(['axis', 'y2', 'tick', 'format']),
            __axis_y2_padding = getConfig(['axis', 'y2', 'padding']),
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
            __point_r = getConfig(['point', 'r'], 2.5),
            __point_focus_line_enabled = getConfig(['point', 'focus', 'line', 'enabled'], true),
            __point_focus_expand_enabled = getConfig(['point', 'focus', 'expand', 'enabled'], true),
            __point_focus_expand_r = getConfig(['point', 'focus', 'expand', 'r']),
            __point_select_r = getConfig(['point', 'focus', 'select', 'r']);

        var __line_connect_null = getConfig(['line', 'connect_null'], false);

        // bar
        var __bar_width = getConfig(['bar', 'width']),
            __bar_width_ratio = getConfig(['bar', 'width', 'ratio'], 0.6);

        // pie
        var __pie_label_show = getConfig(['pie', 'label', 'show'], true),
            __pie_label_format = getConfig(['pie', 'label', 'format']),
            __pie_label_threshold = getConfig(['pie', 'label', 'threshold'], 0.05),
            __pie_expand = getConfig(['pie', 'expand'], true),
            __pie_onclick = getConfig(['pie', 'onclick'], function () {}),
            __pie_onmouseover = getConfig(['pie', 'onmouseover'], function () {}),
            __pie_onmouseout = getConfig(['pie', 'onmouseout'], function () {});

        // gauge
        var __gauge_label_show = getConfig(['gauge', 'label', 'show'], true),
            __gauge_label_format = getConfig(['gauge', 'label', 'format']),
            __gauge_expand = getConfig(['gauge', 'expand'], true),
            __gauge_min = getConfig(['gauge', 'min'], 0),
            __gauge_max = getConfig(['gauge', 'max'], 100),
            __gauge_onclick = getConfig(['gauge', 'onclick'], function () {}),
            __gauge_onmouseover = getConfig(['gauge', 'onmouseover'], function () {}),
            __gauge_onmouseout = getConfig(['gauge', 'onmouseout'], function () {}),
            __gauge_units = getConfig(['gauge', 'units']),
            __gauge_width = getConfig(['gauge', 'width']);

        // donut
        var __donut_label_show = getConfig(['donut', 'label', 'show'], true),
            __donut_label_format = getConfig(['donut', 'label', 'format']),
            __donut_label_threshold = getConfig(['donut', 'label', 'threshold'], 0.05),
            __donut_expand = getConfig(['donut', 'expand'], true),
            __donut_title = getConfig(['donut', 'title'], ""),
            __donut_onclick = getConfig(['donut', 'onclick'], function () {}),
            __donut_onmouseover = getConfig(['donut', 'onmouseover'], function () {}),
            __donut_onmouseout = getConfig(['donut', 'onmouseout'], function () {});

        // region - region to change style
        var __regions = getConfig(['regions'], []);

        // tooltip - show when mouseover on each data
        var __tooltip_show = getConfig(['tooltip', 'show'], true),
            __tooltip_grouped = getConfig(['tooltip', 'grouped'], true),
            __tooltip_format_title = getConfig(['tooltip', 'format', 'title']),
            __tooltip_format_name = getConfig(['tooltip', 'format', 'name']),
            __tooltip_format_value = getConfig(['tooltip', 'format', 'value']),
            __tooltip_contents = getConfig(['tooltip', 'contents'], function (d, defaultTitleFormat, defaultValueFormat, color) {
            var titleFormat = __tooltip_format_title ? __tooltip_format_title : defaultTitleFormat,
                nameFormat = __tooltip_format_name ? __tooltip_format_name : function (name) { return name; },
                valueFormat = __tooltip_format_value ? __tooltip_format_value : defaultValueFormat,
                text, i, title, value, name, bgcolor;
            for (i = 0; i < d.length; i++) {
                if (! (d[i] && (d[i].value || d[i].value === 0))) { continue; }

                if (! text) {
                    title = titleFormat ? titleFormat(d[i].x) : d[i].x;
                    text = "<table class='" + CLASS.tooltip + "'>" + (title || title === 0 ? "<tr><th colspan='2'>" + title + "</th></tr>" : "");
                }

                name = nameFormat(d[i].name);
                value = valueFormat(d[i].value, d[i].ratio, d[i].id, d[i].index);
                bgcolor = levelColor ? levelColor(d[i].value) : color(d[i].id);

                text += "<tr class='" + CLASS.tooltipName + "-" + d[i].id + "'>";
                text += "<td class='name'><span style='background-color:" + bgcolor + "'></span>" + name + "</td>";
                text += "<td class='value'>" + value + "</td>";
                text += "</tr>";
            }
            return text + "</table>";
        }),
            __tooltip_init_show = getConfig(['tooltip', 'init', 'show'], false),
            __tooltip_init_x = getConfig(['tooltip', 'init', 'x'], 0),
            __tooltip_init_position = getConfig(['tooltip', 'init', 'position'], {top: '0px', left: '50px'});

        /*-- Set Variables --*/

        // MEMO: clipId needs to be unique because it conflicts when multiple charts exist
        var clipId = "c3-" + (+new Date()) + '-clip',
            clipIdForXAxis = clipId + '-xaxis',
            clipIdForYAxis = clipId + '-yaxis',
            clipPath = getClipPath(clipId),
            clipPathForXAxis = getClipPath(clipIdForXAxis),
            clipPathForYAxis = getClipPath(clipIdForYAxis);

        var isTimeSeries = (__axis_x_type === 'timeseries'),
            isCategorized = (__axis_x_type.indexOf('categor') >= 0),
            isCustomX = function () { return !isTimeSeries && (__data_x || notEmpty(__data_xs)); };

        var dragStart = null, dragging = false, cancelClick = false, mouseover = false, transiting = false;

        var defaultColorPattern = d3.scale.category10().range(),
            color = generateColor(__data_colors, notEmpty(__color_pattern) ? __color_pattern : defaultColorPattern, __data_color),
            levelColor = notEmpty(__color_threshold) ? generateLevelColor(__color_pattern, __color_threshold) : null;

        var timeFormat = __axis_x_localtime ? d3.time.format : d3.time.format.utc,
            defaultTimeFormat = timeFormat.multi([
                [".%L", function (d) { return d.getMilliseconds(); }],
                [":%S", function (d) { return d.getSeconds(); }],
                ["%I:%M", function (d) { return d.getMinutes(); }],
                ["%I %p", function (d) { return d.getHours(); }],
                ["%-m/%-d", function (d) { return d.getDay() && d.getDate() !== 1; }],
                ["%-m/%-d", function (d) { return d.getDate() !== 1; }],
                ["%-m/%-d", function (d) { return d.getMonth(); }],
                ["%Y/%-m/%-d", function () { return true; }]
            ]);

        var hiddenTargetIds = [], hiddenLegendIds = [];

        /*-- Set Chart Params --*/

        var margin, margin2, margin3, width, width2, height, height2, currentWidth, currentHeight;
        var radius, radiusExpanded, innerRadius, arcWidth, arcHeight, svgArc, svgArcExpanded, svgArcExpandedSub, pie;
        var xMin, xMax, yMin, yMax, subXMin, subXMax, subYMin, subYMax;
        var x, y, y2, subX, subY, subY2, xAxis, yAxis, y2Axis, subXAxis;
        var axes = {};

        var xOrient = __axis_rotated ? "left" : "bottom",
            yOrient = __axis_rotated ? (__axis_y_inner ? "top" : "bottom") : (__axis_y_inner ? "right" : "left"),
            y2Orient = __axis_rotated ? (__axis_y2_inner ? "bottom" : "top") : (__axis_y2_inner ? "left" : "right"),
            subXOrient = __axis_rotated ? "left" : "bottom";

        var translate = {
            main : function () { return "translate(" + asHalfPixel(margin.left) + "," + asHalfPixel(margin.top) + ")"; },
            context : function () { return "translate(" + asHalfPixel(margin2.left) + "," + asHalfPixel(margin2.top) + ")"; },
            legend : function () { return "translate(" + margin3.left + "," + margin3.top + ")"; },
            x : function () { return "translate(0," + (__axis_rotated ? 0 : height) + ")"; },
            y : function () { return "translate(0," + (__axis_rotated ? height : 0) + ")"; },
            y2 : function () { return "translate(" + (__axis_rotated ? 0 : width) + "," + (__axis_rotated ? 1 : 0) + ")"; },
            subx : function () { return "translate(0," + (__axis_rotated ? 0 : height2) + ")"; },
            arc: function () { return "translate(" + (arcWidth / 2) + "," + (arcHeight / 2) + ")"; }
        };

        var isLegendRight = __legend_position === 'right';
        var legendStep = 0, legendItemWidth = 0, legendItemHeight = 0, legendOpacityForHidden = 0.15;

        /*-- Define Functions --*/

        function getClipPath(id) {
            var isIE9 = window.navigator.appVersion.toLowerCase().indexOf("msie 9.") >= 0;
            return "url(" + (isIE9 ? "" : document.URL.split('#')[0]) + "#" + id + ")";
        }

        function asHalfPixel(n) {
            return Math.ceil(n) + 0.5;
        }

        function transformMain(withTransition, transitions) {
            var xAxis, yAxis, y2Axis;
            if (transitions && transitions.axisX) {
                xAxis = transitions.axisX;
            } else {
                xAxis  = main.select('.' + CLASS.axisX);
                if (withTransition) { xAxis = xAxis.transition(); }
            }
            if (transitions && transitions.axisY) {
                yAxis = transitions.axisY;
            } else {
                yAxis = main.select('.' + CLASS.axisY);
                if (withTransition) { yAxis = yAxis.transition(); }
            }
            if (transitions && transitions.axisY2) {
                y2Axis = transitions.axisY2;
            } else {
                y2Axis = main.select('.' + CLASS.axisY2);
                if (withTransition) { y2Axis = y2Axis.transition(); }
            }
            main.attr("transform", translate.main);
            xAxis.attr("transform", translate.x);
            yAxis.attr("transform", translate.y);
            y2Axis.attr("transform", translate.y2);
            main.select('.' + CLASS.chartArcs).attr("transform", translate.arc);
        }
        function transformContext(withTransition, transitions) {
            var subXAxis;
            if (transitions && transitions.axisSubX) {
                subXAxis = transitions.axisSubX;
            } else {
                subXAxis = context.select('.' + CLASS.axisX);
                if (withTransition) { subXAxis = subXAxis.transition(); }
            }
            context.attr("transform", translate.context);
            subXAxis.attr("transform", translate.subx);
        }
        function transformLegend(withTransition) {
            (withTransition ? legend.transition() : legend).attr("transform", translate.legend);
        }
        function transformAll(withTransition, transitions) {
            transformMain(withTransition, transitions);
            if (__subchart_show) { transformContext(withTransition, transitions); }
            transformLegend(withTransition);
        }

        //-- Sizes --//

        // TODO: configurabale
        var rotated_padding_left = 30, rotated_padding_right = __axis_rotated && !__axis_x_show ? 0 : 30, rotated_padding_top = 5;

        // MEMO: each value should be int to avoid disabling antialiasing
        function updateSizes() {
            var legendHeight = getLegendHeight(), legendWidth = getLegendWidth(),
                legendHeightForBottom = isLegendRight ? 0 : legendHeight,
                hasArc = hasArcType(c3.data.targets),
                xAxisHeight = __axis_rotated || hasArc ? 0 : getHorizontalAxisHeight('x'),
                subchartHeight = __subchart_show && !hasArc ? (__subchart_size_height + xAxisHeight) : 0;

            currentWidth = getCurrentWidth();
            currentHeight = getCurrentHeight();

            // for main, context
            if (__axis_rotated) {
                margin = {
                    top: getHorizontalAxisHeight('y2') + getCurrentPaddingTop(),
                    right: hasArc ? 0 : getCurrentPaddingRight(),
                    bottom: getHorizontalAxisHeight('y') + legendHeightForBottom + getCurrentPaddingBottom(),
                    left: subchartHeight + (hasArc ? 0 : getCurrentPaddingLeft())
                };
                margin2 = {
                    top: margin.top,
                    right: NaN,
                    bottom: 20 + legendHeightForBottom,
                    left: rotated_padding_left
                };
            } else {
                margin = {
                    top: 4 + getCurrentPaddingTop(), // for top tick text
                    right: hasArc ? 0 : getCurrentPaddingRight(),
                    bottom: xAxisHeight + subchartHeight + legendHeightForBottom + getCurrentPaddingBottom(),
                    left: hasArc ? 0 : getCurrentPaddingLeft()
                };
                margin2 = {
                    top: currentHeight - subchartHeight - legendHeightForBottom,
                    right: NaN,
                    bottom: xAxisHeight + legendHeightForBottom,
                    left: margin.left
                };
            }
            // for legend
            margin3 = {
                top: isLegendRight ? 0 : currentHeight - legendHeight,
                right: NaN,
                bottom: 0,
                left: isLegendRight ? currentWidth - legendWidth : 0
            };

            width = currentWidth - margin.left - margin.right;
            height = currentHeight - margin.top - margin.bottom;
            if (width < 0) { width = 0; }
            if (height < 0) { height = 0; }

            width2 = __axis_rotated ? margin.left - rotated_padding_left - rotated_padding_right : width;
            height2 = __axis_rotated ? height : currentHeight - margin2.top - margin2.bottom;
            if (width2 < 0) { width2 = 0; }
            if (height2 < 0) { height2 = 0; }

            // for arc
            arcWidth = width - (isLegendRight ? legendWidth + 10 : 0);
            arcHeight = height - (isLegendRight ? 0 : 10);
            updateRadius();

            if (isLegendRight && hasArc) {
                margin3.left = arcWidth / 2 + radiusExpanded * 1.1;
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
            var innerRadiusRatio;
            radiusExpanded = Math.min(arcWidth, arcHeight) / 2;
            radius = radiusExpanded * 0.95;
            innerRadiusRatio = __gauge_width ? (radius - __gauge_width) / radius : 0.6;
            innerRadius = hasDonutType(c3.data.targets) || hasGaugeType(c3.data.targets) ? radius * innerRadiusRatio : 0;
        }
        function getSvgLeft() {
            var leftAxisClass = __axis_rotated ? CLASS.axisX : CLASS.axisY,
                leftAxis = main.select('.' + leftAxisClass).node(),
                svgRect = leftAxis ? leftAxis.getBoundingClientRect() : {right: 0},
                chartRect = selectChart.node().getBoundingClientRect(),
                hasArc = hasArcType(c3.data.targets),
                svgLeft = svgRect.right - chartRect.left - (hasArc ? 0 : getCurrentPaddingLeft());
            return svgLeft > 0 ? svgLeft : 0;
        }
        function getCurrentWidth() {
            return __size_width ? __size_width : getParentWidth();
        }
        function getCurrentHeight() {
            var h = __size_height ? __size_height : getParentHeight();
            return h > 0 ? h : 320;
        }
        function getCurrentPaddingTop() {
            return __padding_top ? __padding_top : 0;
        }
        function getCurrentPaddingBottom() {
            return __padding_bottom ? __padding_bottom : 0;
        }
        function getCurrentPaddingLeft() {
            if (__padding_left) {
                return __padding_left;
            } else if (__axis_rotated) {
                return !__axis_x_show ? 1 : Math.max(ceil10(getAxisWidthByAxisId('x')), 40);
            } else {
                return !__axis_y_show || __axis_y_inner ? 1 : ceil10(getAxisWidthByAxisId('y'));
            }
        }
        function getCurrentPaddingRight() {
            var defaultPadding = 10, legendWidthOnRight = isLegendRight ? getLegendWidth() + 20 : 0;
            if (__padding_right) {
                return __padding_right;
            } else if (__axis_rotated) {
                return defaultPadding + legendWidthOnRight;
            } else {
                return (!__axis_y2_show || __axis_y2_inner ? defaultPadding : ceil10(getAxisWidthByAxisId('y2'))) + legendWidthOnRight;
            }
        }
        function getAxisWidthByAxisId(id) {
            var position = getAxisLabelPositionById(id);
            return position.isInner ? 20 + getMaxTickWidth(id) : 40 + getMaxTickWidth(id);
        }
        function getHorizontalAxisHeight(axisId) {
            if (axisId === 'x' && !__axis_x_show) { return 0; }
            if (axisId === 'x' && __axis_x_height) { return __axis_x_height; }
            if (axisId === 'y' && !__axis_y_show) { return __legend_show && !isLegendRight ? 10 : 1; }
            if (axisId === 'y2' && !__axis_y2_show) { return rotated_padding_top; }
            return (getAxisLabelPositionById(axisId).isInner ? 30 : 40) + (axisId === 'y2' ? -10 : 0);
        }
        function getParentRectValue(key) {
            var parent = selectChart.node(), v;
            while (parent && parent.tagName !== 'BODY') {
                v = parent.getBoundingClientRect()[key];
                if (v) {
                    break;
                }
                parent = parent.parentNode;
            }
            return v;
        }
        function getParentWidth() {
            return getParentRectValue('width');
        }
        function getParentHeight() {
            var h = selectChart.style('height');
            return h.indexOf('px') > 0 ? +h.replace('px', '') : 0;
        }
        function getAxisClipX(forHorizontal) {
            // axis line width + padding for left
            return forHorizontal ? -(1 + 30) : -(margin.left - 1);
        }
        function getAxisClipY(forHorizontal) {
            return forHorizontal ? -20 : -4;
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
            // width + axis line width + padding for left/right
            return forHorizontal ? width + 2 + 30 + 30 : margin.left + 20;
        }
        function getAxisClipHeight(forHorizontal) {
            return forHorizontal ? (__axis_x_height ? __axis_x_height : 0) + 80 : height + 8;
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
            var target = getMaxDataCountTarget(c3.data.targets),
                firstData, lastData, base, maxDataCount, ratio, w;
            if (!target) {
                return 0;
            }
            firstData = target.values[0], lastData = target.values[target.values.length - 1];
            base = x(lastData.x) - x(firstData.x);
            if (base === 0) {
                return __axis_rotated ? height : width;
            }
            maxDataCount = getMaxDataCount();
            ratio = (hasBarType(c3.data.targets) ? (maxDataCount - (isCategorized ? 0.25 : 1)) / maxDataCount : 1);
            w = maxDataCount > 1 ? (base * ratio) / (maxDataCount - 1) : base;
            return w < 1 ? 1 : w;
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
            return __legend_show ? isLegendRight ? currentHeight : Math.max(20, legendItemHeight) * (legendStep + 1) : 0;
        }

        //-- Scales --//

        function updateScales() {
            var xAxisTickFormat, xAxisTickValues, forInit = !x;
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
            y = getY(yMin, yMax, forInit ? undefined : y.domain());
            y2 = getY(yMin, yMax, forInit ? undefined : y2.domain());
            subX = getX(xMin, xMax, orgXDomain, function (d) { return d % 1 ? 0 : subXAxis.tickOffset(); });
            subY = getY(subYMin, subYMax, forInit ? undefined : subY.domain());
            subY2 = getY(subYMin, subYMax, forInit ? undefined : subY2.domain());
            // update axes
            xAxisTickFormat = getXAxisTickFormat();
            xAxisTickValues = __axis_x_tick_values ? __axis_x_tick_values : (forInit ? undefined : xAxis.tickValues());
            xAxis = getXAxis(x, xOrient, xAxisTickFormat, xAxisTickValues);
            subXAxis = getXAxis(subX, subXOrient, xAxisTickFormat, xAxisTickValues);
            yAxis = getYAxis(y, yOrient, __axis_y_tick_format, __axis_y_ticks);
            y2Axis = getYAxis(y2, y2Orient, __axis_y2_tick_format, __axis_y2_ticks);
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
        function getScale(min, max, forTimeseries) {
            return (forTimeseries ? d3.time.scale() : d3.scale.linear()).range([min, max]);
        }
        function getX(min, max, domain, offset) {
            var scale = getScale(min, max, isTimeSeries),//(isTimeSeries ? d3.time.scale() : d3.scale.linear()).range([min, max]),
                _scale = domain ? scale.domain(domain) : scale, key;
            // Define customized scale if categorized axis
            if (isCategorized) {
                offset = offset || function () { return 0; };
                scale = function (d, raw) {
                    var v = _scale(d) + offset(d);
                    return raw ? v : Math.ceil(v);
                };
            } else {
                scale = function (d, raw) {
                    var v = _scale(d);
                    return raw ? v : Math.ceil(v);
                };
            }
            // define functions
            for (key in _scale) {
                scale[key] = _scale[key];
            }
            scale.orgDomain = function () {
                var domain = _scale.domain();
                if (orgXDomain && orgXDomain[0] === domain[0] && orgXDomain[1] < domain[1]) {
                    domain[1] = orgXDomain[1];
                }
                return domain;
            };
            // define custom domain() for categorized axis
            if (isCategorized) {
                scale.domain = function (domain) {
                    if (!arguments.length) {
                        domain = this.orgDomain();
                        return [domain[0], domain[1] + 1];
                    }
                    orgXDomain = domain;
                    _scale.domain(domain);
                    return scale;
                };
            }
            return scale;
        }
        function getY(min, max, domain) {
            var scale = getScale(min, max);
            if (domain) { scale.domain(domain); }
            return scale;
        }
        function getYScale(id) {
            return getAxisId(id) === 'y2' ? y2 : y;
        }
        function getSubYScale(id) {
            return getAxisId(id) === 'y2' ? subY2 : subY;
        }

        //-- Axes --//

        function getXAxis(scale, orient, tickFormat, tickValues) {
            var axis = c3_axis(d3, isCategorized).scale(scale).orient(orient);

            // Set tick
            axis.tickFormat(tickFormat).tickValues(tickValues);
            if (isCategorized) {
                axis.tickCentered(__axis_x_tick_centered);
                if (isEmpty(__axis_x_tick_culling)) {
                    __axis_x_tick_culling = false;
                }
            } else {
                // TODO: move this to c3_axis
                axis.tickOffset = function () {
                    var edgeX = getEdgeX(c3.data.targets), diff = x(edgeX[1]) - x(edgeX[0]),
                        base = diff ? diff : (__axis_rotated ? height : width);
                    return (base / getMaxDataCount()) / 2;
                };
            }

            return axis;
        }
        function getYAxis(scale, orient, tickFormat, ticks) {
            return c3_axis(d3).scale(scale).orient(orient).tickFormat(tickFormat).ticks(ticks);
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
                    format = function (date) {
                        return date ? timeFormat(__axis_x_tick_format)(date) : "";
                    };
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
        function xForRotatedTickText(r) {
            return 10 * Math.sin(Math.PI * (r / 180));
        }
        function yForRotatedTickText(r) {
            return 11.5 - 2.5 * (r / 15);
        }
        function rotateTickText(axis, transition, rotate) {
            axis.selectAll('.tick text')
                .style("text-anchor", "start");
            transition.selectAll('.tick text')
                .attr("y", yForRotatedTickText(rotate))
                .attr("x", xForRotatedTickText(rotate))
                .attr("transform", "rotate(" + rotate + ")");
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
                return position.isInner ? "1.2em" : -25 - getMaxTickWidth('x');
            } else {
                return position.isInner ? "-0.5em" : __axis_x_height ? __axis_x_height - 10 : "3em";
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
                var box = this.getBoundingClientRect();
                if (maxWidth < box.width) { maxWidth = box.width; }
            });
            return maxWidth < 0 ? 0 : maxWidth;
        }
        function updateAxisLabels(withTransition) {
            var axisXLabel = main.select('.' + CLASS.axisX + ' .' + CLASS.axisXLabel),
                axisYLabel = main.select('.' + CLASS.axisY + ' .' + CLASS.axisYLabel),
                axisY2Label = main.select('.' + CLASS.axisY2 + ' .' + CLASS.axisY2Label);
            (withTransition ? axisXLabel.transition() : axisXLabel)
                .attr("x", xForXAxisLabel)
                .attr("dx", dxForXAxisLabel)
                .attr("dy", dyForXAxisLabel)
                .text(textForXAxisLabel);
            (withTransition ? axisYLabel.transition() : axisYLabel)
                .attr("x", xForYAxisLabel)
                .attr("dx", dxForYAxisLabel)
                .attr("dy", dyForYAxisLabel)
                .attr("dy", dyForYAxisLabel)
                .text(textForYAxisLabel);
            (withTransition ? axisY2Label.transition() : axisY2Label)
                .attr("x", xForY2AxisLabel)
                .attr("dx", dxForY2AxisLabel)
                .attr("dy", dyForY2AxisLabel)
                .text(textForY2AxisLabel);
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
                }
            });
            if (isNaN(d.endAngle)) {
                d.endAngle = d.startAngle;
            }
            if (isGaugeType(d.data)) {
                var gMin = __gauge_min, gMax = __gauge_max,
                    gF = Math.abs(gMin) + gMax,
                    aTic = (Math.PI) / gF;
                d.startAngle = (-1 * (Math.PI / 2)) + (aTic * Math.abs(gMin));
                d.endAngle = d.startAngle + (aTic * ((d.value > gMax) ? gMax : d.value));
            }
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
        function getArc(d, withoutUpdate, force) {
            return force || isArcType(d.data) ? svgArc(d, withoutUpdate) : "M 0 0";
        }
        function transformForArcLabel(d) {
            var updated = updateAngle(d), c, x, y, h, ratio, translate = "";
            if (updated && !hasGaugeType(c3.data.targets)) {
                c = svgArc.centroid(updated);
                x = isNaN(c[0]) ? 0 : c[0];
                y = isNaN(c[1]) ? 0 : c[1];
                h = Math.sqrt(x * x + y * y);
                // TODO: ratio should be an option?
                ratio = radius && h ? (36 / radius > 0.375 ? 1.175 - 36 / radius : 0.8) * radius / h : 0;
                translate = "translate(" + (x * ratio) +  ',' + (y * ratio) +  ")";
            }
            return translate;
        }
        function getArcRatio(d) {
            var whole = hasGaugeType(c3.data.targets) ? Math.PI : (Math.PI * 2);
            return d ? (d.endAngle - d.startAngle) / whole : null;
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
            if (! shouldShowArcLabel()) { return ""; }
            updated = updateAngle(d);
            value = updated ? updated.value : null;
            ratio = getArcRatio(updated);
            if (! meetsArcLabelThreshold(ratio)) { return ""; }
            format = getArcLabelFormat();
            return format ? format(value, ratio) : defaultArcValueFormat(value, ratio);
        }
        function expandArc(id, withoutFadeOut) {
            var target = svg.selectAll('.' + CLASS.chartArc + selectorTarget(id)),
                noneTargets = svg.selectAll('.' + CLASS.arc).filter(function (data) { return data.data.id !== id; });

            if (shouldExpand(id)) {
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
            }

            if (!withoutFadeOut) {
                noneTargets.style("opacity", 0.3);
            }
        }
        function unexpandArc(id) {
            var target = svg.selectAll('.' + CLASS.chartArc + selectorTarget(id));
            target.selectAll('path.' + CLASS.arc)
              .transition().duration(50)
                .attr("d", svgArc);
            svg.selectAll('.' + CLASS.arc)
                .style("opacity", 1);
        }
        function shouldShowArcLabel() {
            var shouldShow = true;
            if (hasDonutType(c3.data.targets)) {
                shouldShow = __donut_label_show;
            } else if (hasPieType(c3.data.targets)) {
                shouldShow = __pie_label_show;
            }
            // when gauge, always true
            return shouldShow;
        }
        function meetsArcLabelThreshold(ratio) {
            var threshold = hasDonutType(c3.data.targets) ? __donut_label_threshold : __pie_label_threshold;
            return ratio >= threshold;
        }
        function getArcLabelFormat() {
            var format = __pie_label_format;
            if (hasGaugeType(c3.data.targets)) {
                format = __gauge_label_format;
            } else if (hasDonutType(c3.data.targets)) {
                format = __donut_label_format;
            }
            return format;
        }
        function getArcTitle() {
            return hasDonutType(c3.data.targets) ? __donut_title : "";
        }
        function getArcOnClick() {
            var callback = __pie_onclick;
            if (hasGaugeType(c3.data.targets)) {
                callback = __gauge_onclick;
            } else if (hasDonutType(c3.data.targets)) {
                callback = __donut_onclick;
            }
            return typeof callback === 'function' ? callback : function () {};
        }
        function getArcOnMouseOver() {
            var callback = __pie_onmouseover;
            if (hasGaugeType(c3.data.targets)) {
                callback = __gauge_onmouseover;
            } else if (hasDonutType(c3.data.targets)) {
                callback = __donut_onmouseover;
            }
            return typeof callback === 'function' ? callback : function () {};
        }
        function getArcOnMouseOut() {
            var callback = __pie_onmouseout;
            if (hasGaugeType(c3.data.targets)) {
                callback = __gauge_onmouseout;
            } else if (hasDonutType(c3.data.targets)) {
                callback = __donut_onmouseout;
            }
            return typeof callback === 'function' ? callback : function () {};
        }

        //-- Domain --//

        function getAxisPadding(padding, key, defaultValue, all) {
            var ratio = padding.unit === 'ratio' ? all : 1;
            return isValue(padding[key]) ? padding[key] * ratio : defaultValue;
        }

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
                yDomainAbs, lengths, diff, ratio, isAllPositive, isAllNegative,
                showHorizontalDataLabel = hasDataLabel() && __axis_rotated,
                showVerticalDataLabel = hasDataLabel() && !__axis_rotated;
            if (yTargets.length === 0) { // use current domain if target of axisId is none
                return axisId === 'y2' ? y2.domain() : y.domain();
            }
            if (yDomainMin === yDomainMax) {
                yDomainMin < 0 ? yDomainMax = 0 : yDomainMin = 0;
            }
            isAllPositive = yDomainMin > 0 && yDomainMax > 0;
            isAllNegative = yDomainMin < 0 && yDomainMax < 0;

            if (isAllPositive) { yDomainMin = 0; }
            if (isAllNegative) { yDomainMax = 0; }

            domainLength = Math.abs(yDomainMax - yDomainMin);
            padding = padding_top = padding_bottom = domainLength * 0.1;

            if (center) {
                yDomainAbs = Math.max(Math.abs(yDomainMin), Math.abs(yDomainMax));
                yDomainMax = yDomainAbs - center;
                yDomainMin = center - yDomainAbs;
            }
            // add padding for data label
            if (showHorizontalDataLabel) {
                lengths = getDataLabelLength(yDomainMin, yDomainMax, axisId, 'width');
                diff = diffDomain(y.range());
                ratio = [lengths[0] / diff, lengths[1] / diff];
                padding_top += domainLength * (ratio[1] / (1 - ratio[0] - ratio[1]));
                padding_bottom += domainLength * (ratio[0] / (1 - ratio[0] - ratio[1]));
            } else if (showVerticalDataLabel) {
                lengths = getDataLabelLength(yDomainMin, yDomainMax, axisId, 'height');
                padding_top += lengths[1];
                padding_bottom += lengths[0];
            }
            if (axisId === 'y' && __axis_y_padding) {
                padding_top = getAxisPadding(__axis_y_padding, 'top', padding, domainLength);
                padding_bottom = getAxisPadding(__axis_y_padding, 'bottom', padding, domainLength);
            }
            if (axisId === 'y2' && __axis_y2_padding) {
                padding_top = getAxisPadding(__axis_y2_padding, 'top', padding, domainLength);
                padding_bottom = getAxisPadding(__axis_y2_padding, 'bottom', padding, domainLength);
            }
            // Bar/Area chart should be 0-based if all positive|negative
            if (hasBarType(yTargets) || hasAreaType(yTargets)) {
                if (isAllPositive) { padding_bottom = yDomainMin; }
                if (isAllNegative) { padding_top = -yDomainMax; }
            }
            return [yDomainMin - padding_bottom, yDomainMax + padding_top];
        }
        function getXDomainMin(targets) {
            return __axis_x_min ? (isTimeSeries ? parseDate(__axis_x_min) : __axis_x_min) : d3.min(targets, function (t) { return d3.min(t.values, function (v) { return v.x; }); });
        }
        function getXDomainMax(targets) {
            return __axis_x_max ? (isTimeSeries ? parseDate(__axis_x_max) : __axis_x_max) : d3.max(targets, function (t) { return d3.max(t.values, function (v) { return v.x; }); });
        }
        function getXDomainPadding(targets) {
            var edgeX = getEdgeX(targets), diff = edgeX[1] - edgeX[0],
                maxDataCount, padding, paddingLeft, paddingRight;
            if (isCategorized) {
                padding = 0;
            } else if (hasBarType(targets)) {
                maxDataCount = getMaxDataCount();
                padding = maxDataCount > 1 ? (diff / (maxDataCount - 1)) / 2 : 0.5;
            } else {
                padding = diff * 0.01;
            }
            if (typeof __axis_x_padding === 'object' && notEmpty(__axis_x_padding)) {
                paddingLeft = isValue(__axis_x_padding.left) ? __axis_x_padding.left : padding;
                paddingRight = isValue(__axis_x_padding.right) ? __axis_x_padding.right : padding;
            } else if (typeof __axis_x_padding === 'number') {
                paddingLeft = paddingRight = __axis_x_padding;
            } else {
                paddingLeft = paddingRight = padding;
            }
            return {left: paddingLeft, right: paddingRight};
        }
        function getXDomain(targets) {
            var xDomain = [getXDomainMin(targets), getXDomainMax(targets)],
                firstX = xDomain[0], lastX = xDomain[1],
                padding = getXDomainPadding(targets),
                min = 0, max = 0;
            // show center of x domain if min and max are the same
            if ((firstX - lastX) === 0 && !isCategorized) {
                firstX = isTimeSeries ? new Date(firstX.getTime() * 0.5) : -0.5;
                lastX = isTimeSeries ? new Date(lastX.getTime() * 1.5) : 0.5;
            }
            if (firstX || firstX === 0) {
                min = isTimeSeries ? new Date(firstX.getTime() - padding.left) : firstX - padding.left;
            }
            if (lastX || lastX === 0) {
                max = isTimeSeries ? new Date(lastX.getTime() + padding.right) : lastX + padding.right;
            }
            return [min, max];
        }
        function updateXDomain(targets, withUpdateXDomain, withUpdateOrgXDomain, domain) {
            if (withUpdateOrgXDomain) {
                x.domain(domain ? domain : d3.extent(getXDomain(targets)));
                orgXDomain = x.domain();
                if (__zoom_enabled) { zoom.scale(x).updateScaleExtent(); }
                subX.domain(x.domain());
                brush.scale(subX);
            }
            if (withUpdateXDomain) {
                x.domain(domain ? domain : brush.empty() ? orgXDomain : brush.extent());
                if (__zoom_enabled) { zoom.scale(x).updateScaleExtent(); }
            }
            return x.domain();
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

        function regionX(d) {
            var xPos, yScale = d.axis === 'y' ? y : y2;
            if (d.axis === 'y' || d.axis === 'y2') {
                xPos = __axis_rotated ? ('start' in d ? yScale(d.start) : 0) : 0;
            } else {
                xPos = __axis_rotated ? 0 : ('start' in d ? x(isTimeSeries ? parseDate(d.start) : d.start) : 0);
            }
            return xPos;
        }
        function regionY(d) {
            var yPos, yScale = d.axis === 'y' ? y : y2;
            if (d.axis === 'y' || d.axis === 'y2') {
                yPos = __axis_rotated ? 0 : ('end' in d ? yScale(d.end) : 0);
            } else {
                yPos = __axis_rotated ? ('start' in d ? x(isTimeSeries ? parseDate(d.start) : d.start) : 0) : 0;
            }
            return yPos;
        }
        function regionWidth(d) {
            var start = regionX(d), end, yScale = d.axis === 'y' ? y : y2;
            if (d.axis === 'y' || d.axis === 'y2') {
                end = __axis_rotated ? ('end' in d ? yScale(d.end) : width) : width;
            } else {
                end = __axis_rotated ? width : ('end' in d ? x(isTimeSeries ? parseDate(d.end) : d.end) : width);
            }
            return end < start ? 0 : end - start;
        }
        function regionHeight(d) {
            var start = regionY(d), end, yScale = d.axis === 'y' ? y : y2;
            if (d.axis === 'y' || d.axis === 'y2') {
                end = __axis_rotated ? height : ('start' in d ? yScale(d.start) : height);
            } else {
                end = __axis_rotated ? ('end' in d ? x(isTimeSeries ? parseDate(d.end) : d.end) : height) : height;
            }
            return end < start ? 0 : end - start;
        }
        function isRegionOnX(d) {
            return !d.axis || d.axis === 'x';
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
        function getXValuesOfXKey(key, targets) {
            var xValues, ids = targets && notEmpty(targets) ? mapToIds(targets) : [];
            ids.forEach(function (id) {
                if (getXKey(id) === key) {
                    xValues = c3.data.xs[id];
                }
            });
            return xValues;
        }
        function getXValue(id, i) {
            return id in c3.data.xs && c3.data.xs[id] && isValue(c3.data.xs[id][i]) ? c3.data.xs[id][i] : i;
        }
        function getOtherTargetXs() {
            var idsForX = Object.keys(c3.data.xs);
            return idsForX.length ? c3.data.xs[idsForX[0]] : null;
        }
        function getOtherTargetX(index) {
            var xs = getOtherTargetXs();
            return xs && index < xs.length ? xs[index] : null;
        }
        function addXs(xs) {
            Object.keys(xs).forEach(function (id) {
                __data_xs[id] = xs[id];
            });
        }
        function isSingleX(xs) {
            return d3.set(Object.keys(xs).map(function (id) { return xs[id]; })).size() === 1;
        }

        function addName(data) {
            var name;
            if (data) {
                name = __data_names[data.id];
                data.name = name ? name : data.id;
            }
            return data;
        }

        function getValueOnIndex(values, index) {
            var valueOnIndex = values.filter(function (v) { return v.index === index; });
            return valueOnIndex.length ? valueOnIndex[0] : null;
        }

        function updateTargetX(targets, x) {
            targets.forEach(function (t) {
                t.values.forEach(function (v, i) {
                    v.x = generateTargetX(x[i], t.id, i);
                });
                c3.data.xs[t.id] = x;
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
            else if (isCustomX() && !isCategorized) {
                x = isValue(rawX) ? +rawX : getXValue(id, index);
            }
            else {
                x = index;
            }
            return x;
        }
        function convertCsvToData(csv) {
            var rows = d3.csv.parseRows(csv), d;
            if (rows.length === 1) {
                d = [{}];
                rows[0].forEach(function (id) {
                    d[0][id] = null;
                });
            } else {
                d = d3.csv.parse(csv);
            }
            return d;
        }
        function convertJsonToData(json, keys) {
            var new_rows = [], targetKeys, data;
            if (keys) { // when keys specified, json would be an array that includes objects
                targetKeys = keys.value;
                if (keys.x) {
                    targetKeys.push(keys.x);
                    __data_x = keys.x;
                }
                new_rows.push(targetKeys);
                json.forEach(function (o) {
                    var new_row = [];
                    targetKeys.forEach(function (key) {
                        new_row.push(o[key]);
                    });
                    new_rows.push(new_row);
                });
                data = convertRowsToData(new_rows);
            } else {
                Object.keys(json).forEach(function (key) {
                    new_rows.push([key].concat(json[key]));
                });
                data = convertColumnsToData(new_rows);
            }
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
        function convertDataToTargets(data, appendXs) {
            var ids = d3.keys(data[0]).filter(isNotX), xs = d3.keys(data[0]).filter(isX), targets;

            // save x for update data by load when custom x and c3.x API
            ids.forEach(function (id) {
                var xKey = getXKey(id);

                if (isCustomX() || isTimeSeries) {
                    // if included in input data
                    if (xs.indexOf(xKey) >= 0) {
                        c3.data.xs[id] = (appendXs && c3.data.xs[id] ? c3.data.xs[id] : []).concat(
                            data.map(function (d) { return d[xKey]; })
                                .filter(isValue)
                                .map(function (rawX, i) { return generateTargetX(rawX, id, i); })
                        );
                    }
                    // if not included in input data, find from preloaded data of other id's x
                    else if (__data_x) {
                        c3.data.xs[id] = getOtherTargetXs();
                    }
                    // if not included in input data, find from preloaded data
                    else if (notEmpty(__data_xs)) {
                        c3.data.xs[id] = getXValuesOfXKey(xKey, c3.data.targets);
                    }
                    // MEMO: if no x included, use same x of current will be used
                } else {
                    c3.data.xs[id] = data.map(function (d, i) { return i; });
                }
            });

            // check x is defined
            ids.forEach(function (id) {
                if (!c3.data.xs[id]) {
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
                        if (isCustomX() && isCategorized && index === 0 && rawX) {
                            if (i === 0) { __axis_x_categories = []; }
                            __axis_x_categories.push(rawX);
                        }
                        // mark as x = undefined if value is undefined and filter to remove after mapped
                        if (typeof d[id] === 'undefined' || c3.data.xs[id].length <= i) {
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
            var value = getValueOnIndex(c3.data.targets[0].values, i - 1);
            return value ? value.x : null;
        }
        function getNextX(i) {
            var value = getValueOnIndex(c3.data.targets[0].values, i + 1);
            return value ? value.x : null;
        }
        function getMaxDataCount() {
            return d3.max(c3.data.targets, function (t) { return t.values.length; });
        }
        function getMaxDataCountTarget(targets) {
            var length = targets.length, max = 0, maxTarget;
            if (length > 1) {
                targets.forEach(function (t) {
                    if (t.values.length > max) {
                        maxTarget = t;
                        max = t.values.length;
                    }
                });
            } else {
                maxTarget = length ? targets[0] : null;
            }
            return maxTarget;
        }
        function getEdgeX(targets) {
            var target = getMaxDataCountTarget(targets), firstData, lastData;
            if (!target) {
                return [0, 0];
            }
            firstData = target.values[0], lastData = target.values[target.values.length - 1];
            return [firstData.x, lastData.x];
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
        function generateTickValues(xs, tickCount) {
            var tickValues = xs, targetCount, start, end, count, interval, i, tickValue;
            if (tickCount) {
                targetCount = typeof tickCount === 'function' ? tickCount() : tickCount;
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
            if (!isTimeSeries) { tickValues = tickValues.sort(function (a, b) { return a - b; }); }
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
        function classText(d) { return generateClass(CLASS.text, d.index); }
        function classTexts(d) { return generateClass(CLASS.texts, d.id); }
        function classShape(d) { return generateClass(CLASS.shape, d.index); }
        function classShapes(d) { return generateClass(CLASS.shapes, d.id); }
        function classLine(d) { return classShape(d) + generateClass(CLASS.line, d.id); }
        function classLines(d) { return classShapes(d) + generateClass(CLASS.lines, d.id); }
        function classCircle(d) { return classShape(d) + generateClass(CLASS.circle, d.index); }
        function classCircles(d) { return classShapes(d) + generateClass(CLASS.circles, d.id); }
        function classBar(d) { return classShape(d) + generateClass(CLASS.bar, d.index); }
        function classBars(d) { return classShapes(d) + generateClass(CLASS.bars, d.id); }
        function classArc(d) { return classShape(d.data) + generateClass(CLASS.arc, d.data.id); }
        function classArcs(d) { return classShapes(d.data) + generateClass(CLASS.arcs, d.data.id); }
        function classArea(d) { return classShape(d) + generateClass(CLASS.area, d.id); }
        function classAreas(d) { return classShapes(d) + generateClass(CLASS.areas, d.id); }
        function classRegion(d, i) { return generateClass(CLASS.region, i) + ' ' + ('class' in d ? d.class : ''); }
        function classEvent(d) { return generateClass(CLASS.eventRect, d.index); }
        function classTarget(id) {
            var additionalClassSuffix = __data_classes[id], additionalClass = '';
            if (additionalClassSuffix) {
                additionalClass = ' ' + CLASS.target + '-' + additionalClassSuffix;
            }
            return generateClass(CLASS.target, id) + additionalClass;
        }
        function classChartText(d) { return CLASS.chartText + classTarget(d.id); }
        function classChartLine(d) { return CLASS.chartLine + classTarget(d.id); }
        function classChartBar(d) { return CLASS.chartBar + classTarget(d.id); }
        function classChartArc(d) { return CLASS.chartArc + classTarget(d.data.id); }

        function getTargetSelectorSuffix(targetId) {
            return targetId || targetId === 0 ? '-' + (targetId.replace ? targetId.replace(/([^a-zA-Z0-9-_])/g, '-') : targetId) : '';
        }
        function selectorTarget(id) { return '.' + CLASS.target + getTargetSelectorSuffix(id); }
        function selectorTargets(ids) { return ids.length ? ids.map(function (id) { return selectorTarget(id); }) : null; }
        function selectorLegend(id) { return '.' + CLASS.legendItem + getTargetSelectorSuffix(id); }
        function selectorLegends(ids) { return ids.length ? ids.map(function (id) { return selectorLegend(id); }) : null; }

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
        function getDataLabelLength(min, max, axisId, key) {
            var lengths = [0, 0], paddingCoef = 1.3;
            selectChart.select('svg').selectAll('.dummy')
                .data([min, max])
              .enter().append('text')
                .text(function (d) { return formatByAxisId(axisId)(d); })
                .each(function (d, i) {
                    lengths[i] = this.getBoundingClientRect()[key] * paddingCoef;
                })
              .remove();
            return lengths;
        }
        function getYFormat(forArc) {
            var formatForY = forArc && !hasGaugeType(c3.data.targets) ? defaultArcValueFormat : yFormat,
                formatForY2 = forArc && !hasGaugeType(c3.data.targets) ? defaultArcValueFormat : y2Format;
            return function (v, ratio, id) {
                var format = getAxisId(id) === 'y2' ? formatForY2 : formatForY;
                return format(v, ratio);
            };
        }
        function yFormat(v) {
            var format = __axis_y_tick_format ? __axis_y_tick_format : defaultValueFormat;
            return format(v);
        }
        function y2Format(v) {
            var format = __axis_y2_tick_format ? __axis_y2_tick_format : defaultValueFormat;
            return format(v);
        }
        function defaultValueFormat(v) {
            return isValue(v) ? +v : "";
        }
        function defaultArcValueFormat(v, ratio) {
            return (ratio * 100).toFixed(1) + '%';
        }
        function formatByAxisId(axisId) {
            var format = function (v) { return isValue(v) ? +v : ""; };
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
            return Math.ceil(x(isTimeSeries ? parseDate(d.value) : d.value));
        }
        function yv(d) {
            var yScale = d.axis && d.axis === 'y2' ? y2 : y;
            return Math.ceil(yScale(d.value));
        }
        function subxx(d) {
            return d ? subX(d.x) : null;
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
                if (values[min].x || values[min].x === 0) {
                    candidates = candidates.concat(findSameXOfValues(values, min));
                }
                if (values[max].x || values[max].x === 0) {
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
            return d3.merge(targets.map(function (t) { return t.values; })).filter(function (v) { return v.x - x === 0; });
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
            var tWidth, tHeight, svgLeft, tooltipLeft, tooltipRight, tooltipTop, chartRight;
            var forArc = hasArcType(c3.data.targets),
                dataToShow = selectedData.filter(function (d) { return d && isValue(d.value); });
            if (dataToShow.length === 0 || !__tooltip_show) {
                return;
            }
            tooltip.html(__tooltip_contents(selectedData, getXAxisTickFormat(), getYFormat(forArc), color)).style("display", "block");

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
                    tooltipLeft -= tooltipRight - chartRight;
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
            var focusEl = main.selectAll('line.' + CLASS.xgridFocus);
            focusEl
                .style("visibility", "visible")
                .data([dataToShow[0]])
                .attr(__axis_rotated ? 'y1' : 'x1', xx)
                .attr(__axis_rotated ? 'y2' : 'x2', xx);
            smoothLines(focusEl, 'grid');
        }
        function hideXGridFocus() {
            main.select('line.' + CLASS.xgridFocus).style("visibility", "hidden");
        }
        function generateGridData(type, scale) {
            var gridData = [], xDomain, firstYear, lastYear, i,
                tickNum = main.select("." + CLASS.axisX).selectAll('.tick').size();
            if (type === 'year') {
                xDomain = getXDomain();
                firstYear = xDomain[0].getFullYear();
                lastYear = xDomain[1].getFullYear();
                for (i = firstYear; i <= lastYear; i++) {
                    gridData.push(new Date(i + '-01-01 00:00:00'));
                }
            } else {
                gridData = scale.ticks(10);
                if (gridData.length > tickNum) { // use only int
                    gridData = gridData.filter(function (d) { return ("" + d).indexOf('.') < 0; });
                }
            }
            return gridData;
        }

        //-- Shape --//

        function getShapeIndices(typeFilter) {
            var indices = {}, i = 0, j, k;
            filterTargetsToShow(c3.data.targets.filter(typeFilter)).forEach(function (d) {
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
        function getShapeX(offset, targetsNum, indices, isSub) {
            var scale = isSub ? subX : x;
            return function (d) {
                var index = d.id in indices ? indices[d.id] : 0;
                return d.x || d.x === 0 ? scale(d.x) - offset * (targetsNum / 2 - index) : 0;
            };
        }
        function getShapeY(isSub) {
            return function (d) {
                var scale = isSub ? getSubYScale(d.id) : getYScale(d.id);
                return scale(d.value);
            };
        }
        function getShapeOffset(typeFilter, indices, isSub) {
            var targets = orderTargets(filterTargetsToShow(c3.data.targets.filter(typeFilter))),
                targetIds = targets.map(function (t) { return t.id; });
            return function (d, i) {
                var scale = isSub ? getSubYScale(d.id) : getYScale(d.id),
                    y0 = scale(0), offset = y0;
                targets.forEach(function (t) {
                    if (t.id === d.id || indices[t.id] !== indices[d.id]) { return; }
                    if (targetIds.indexOf(t.id) < targetIds.indexOf(d.id) && t.values[i].value * d.value > 0) {
                        offset += scale(t.values[i].value) - y0;
                    }
                });
                return offset;
            };
        }

        //-- Circle --//

        function circleX(d) {
            return d.x || d.x === 0 ? x(d.x) : null;
        }
        function circleY(d, i) {
            var lineIndices = getShapeIndices(isLineType), getPoint = generateGetLinePoint(lineIndices);
            return __data_groups.length > 0 ? getPoint(d, i)[0][1] : getYScale(d.id)(d.value);
        }

        //-- Bar --//

        function getBarW(axis, barTargetsNum) {
            return typeof __bar_width === 'number' ? __bar_width : barTargetsNum ? (axis.tickOffset() * 2 * __bar_width_ratio) / barTargetsNum : 0;
        }

        //-- Type --//

        function setTargetType(targetIds, type) {
            mapToTargetIds(targetIds).forEach(function (id) {
                withoutFadeIn[id] = (type === __data_types[id]);
                __data_types[id] = type;
            });
            if (!targetIds) {
                __data_type = type;
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
        function hasAreaType(targets) {
            return hasType(targets, 'area') || hasType(targets, 'area-spline') || hasType(targets, 'area-step');
        }
        function hasBarType(targets) {
            return hasType(targets, 'bar');
        }
        function hasScatterType(targets) {
            return hasType(targets, 'scatter');
        }
        function hasPieType(targets) {
            return __data_type === 'pie' || hasType(targets, 'pie');
        }
        function hasGaugeType(targets) {
            return hasType(targets, 'gauge');
        }
        function hasDonutType(targets) {
            return __data_type === 'donut' || hasType(targets, 'donut');
        }
        function hasArcType(targets) {
            return hasPieType(targets) || hasDonutType(targets) || hasGaugeType(targets);
        }
        function isLineType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return !__data_types[id] || ['line', 'spline', 'area', 'area-spline', 'step', 'area-step'].indexOf(__data_types[id]) >= 0;
        }
        function isStepType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return ['step', 'area-step'].indexOf(__data_types[id]) >= 0;
        }
        function isSplineType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return ['spline', 'area-spline'].indexOf(__data_types[id]) >= 0;
        }
        function isAreaType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return ['area', 'area-spline', 'area-step'].indexOf(__data_types[id]) >= 0;
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
        function isGaugeType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'gauge';
        }
        function isDonutType(d) {
            var id = (typeof d === 'string') ? d : d.id;
            return __data_types[id] === 'donut';
        }
        function isArcType(d) {
            return isPieType(d) || isDonutType(d) || isGaugeType(d);
        }
        function lineData(d) {
            return isLineType(d) ? [d] : [];
        }
        function arcData(d) {
            return isArcType(d.data) ? [d] : [];
        }
        /* not used
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

        function shouldExpand(id) {
            return (isDonutType(id) && __donut_expand) || (isGaugeType(id) && __gauge_expand) || (isPieType(id) && __pie_expand);
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
                else if (colors[id]) {
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

        function generateLevelColor(colors, threshold) {
            var asValue = threshold.unit === 'value',
                values = threshold.values && threshold.values.length ? threshold.values : [],
                max = threshold.max || 100;
            return function (value) {
                var i, v, color = colors[colors.length - 1];
                for (i = 0; i < values.length; i++) {
                    v = asValue ? value : (value * 100 / max);
                    if (v < values[i]) {
                        color = colors[i];
                        break;
                    }
                }
                return color;
            };
        }

        //-- Date --//

        function parseDate(date) {
            var parsedDate;
            try {
                parsedDate = date instanceof Date ? new Date(date) : d3.time.format(__data_x_format).parse(date);
            } catch (e) {
                window.console.error("Failed to parse x '" + date + "' to Date with format " + __data_x_format);
            }
            return parsedDate;
        }

        //-- Util --//

        function isWithinCircle(_this, _r) {
            var mouse = d3.mouse(_this), d3_this = d3.select(_this);
            var cx = d3_this.attr("cx") * 1, cy = d3_this.attr("cy") * 1;
            return Math.sqrt(Math.pow(cx - mouse[0], 2) + Math.pow(cy - mouse[1], 2)) < _r;
        }
        function isWithinBar(_this) {
            var mouse = d3.mouse(_this), box = _this.getBoundingClientRect(),
                seg0 = _this.pathSegList.getItem(0), seg1 = _this.pathSegList.getItem(1);
            var x = seg0.x, y = Math.min(seg0.y, seg1.y), w = box.width, h = box.height, offset = 2;
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

        function generateWait() {
            var transitionsToWait = [],
                f = function (transition, callback) {
                    var timer = setInterval(function () {
                        var done = 0;
                        transitionsToWait.forEach(function (t) {
                            if (t.empty()) {
                                done += 1;
                                return;
                            }
                            try {
                                t.transition();
                            } catch (e) {
                                done += 1;
                            }
                        });
                        if (done === transitionsToWait.length) {
                            clearInterval(timer);
                            if (callback) { callback(); }
                        }
                    }, 10);
                };
            f.add = function (transition) {
                transitionsToWait.push(transition);
            };
            return f;
        }

        function getOption(options, key, defaultValue) {
            return isDefined(options[key]) ? options[key] : defaultValue;
        }

        function ceil10(v) {
            return Math.ceil(v / 10) * 10;
        }

        function getTextRect(text, cls) {
            var rect;
            d3.select('body').selectAll('.dummy')
                .data([text])
              .enter().append('text')
                .classed(cls ? cls : "", true)
                .text(text)
                .each(function () { rect = this.getBoundingClientRect(); })
              .remove();
            return rect;
        }

        function getInterpolate(d) {
            return isSplineType(d) ? "cardinal" : isStepType(d) ? "step-after" : "linear";
        }

        function getEmptySelection() {
            return d3.selectAll([]);
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
                .attr("r", pointSelectR(d) * 1.4)
              .transition().duration(100)
                .attr("r", pointSelectR);
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
            target.transition().duration(100).style("fill", function () { return d3.rgb(color(d)).brighter(0.75); });
        }
        function unselectBar(target, d) {
            __data_onunselected(d, target.node());
            target.transition().duration(100).style("fill", function () { return color(d); });
        }
        function toggleBar(selected, target, d, i) {
            selected ? selectBar(target, d, i) : unselectBar(target, d, i);
        }
        function toggleArc(selected, target, d, i) {
            toggleBar(selected, target, d.data, i);
        }
        function getToggle(that) {
            // path selection not supported yet
            return that.nodeName === 'circle' ? togglePoint : (d3.select(that).classed(CLASS.bar) ? toggleBar : toggleArc);
        }

        function filterRemoveNull(data) {
            return data.filter(function (d) { return isValue(d.value); });
        }

        //-- Point --//

        function pointR(d) {
            return __point_show && !isStepType(d) ? (typeof __point_r === 'function' ? __point_r(d) : __point_r) : 0;
        }
        function pointExpandedR(d) {
            return __point_focus_expand_enabled ? (__point_focus_expand_r ? __point_focus_expand_r : pointR(d) * 1.75) : pointR(d);
        }
        function pointSelectR(d) {
            return __point_select_r ? __point_select_r : pointR(d) * 4;
        }

        //-- Shape --//

        function getCircles(i, id) {
            return (id ? main.selectAll('.' + CLASS.circles + getTargetSelectorSuffix(id)) : main).selectAll('.' + CLASS.circle + (isValue(i) ? '-' + i : ''));
        }
        function expandCircles(i, id) {
            getCircles(i, id)
                .classed(CLASS.EXPANDED, true)
                .attr('r', pointExpandedR);
        }
        function unexpandCircles(i) {
            getCircles(i)
                .filter(function () { return d3.select(this).classed(CLASS.EXPANDED); })
                .classed(CLASS.EXPANDED, false)
                .attr('r', pointR);
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

        function generateDrawArea(areaIndices, isSub) {
            var area = d3.svg.area(),
                getPoint = generateGetAreaPoint(areaIndices, isSub),
                yScaleGetter = isSub ? getSubYScale : getYScale,
                value0 = function (d, i) {
                    return __data_groups.length > 0 ? getPoint(d, i)[0][1] : yScaleGetter(d.id)(0);
                },
                value1 = function (d, i) {
                    return __data_groups.length > 0 ? getPoint(d, i)[1][1] : yScaleGetter(d.id)(d.value);
                };

            area = __axis_rotated ? area.x0(value0).x1(value1).y(xx) : area.x(xx).y0(value0).y1(value1);

            return function (d) {
                var data = filterRemoveNull(d.values), x0 = 0, y0 = 0, path;

                if (isAreaType(d)) {
                    path = area.interpolate(getInterpolate(d))(data);
                } else {
                    if (data[0]) {
                        x0 = x(data[0].x);
                        y0 = getYScale(d.id)(data[0].value);
                    }
                    path = __axis_rotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;
                }
                return path ? path : "M 0 0";
            };
        }

        function generateDrawLine(lineIndices, isSub) {
            var line = d3.svg.line(),
                getPoint = generateGetLinePoint(lineIndices, isSub),
                yScaleGetter = isSub ? getSubYScale : getYScale,
                xValue = isSub ? subxx : xx,
                yValue = function (d, i) {
                    return __data_groups.length > 0 ? getPoint(d, i)[0][1] : yScaleGetter(d.id)(d.value);
                };

            line = __axis_rotated ? line.x(yValue).y(xValue) : line.x(xValue).y(yValue);
            if (!__line_connect_null) { line = line.defined(function (d) { return d.value != null; }); }
            return function (d) {
                var data = __line_connect_null ? filterRemoveNull(d.values) : d.values,
                    x = isSub ? x : subX, y = yScaleGetter(d.id), x0 = 0, y0 = 0, path;
                if (isLineType(d)) {
                    if (__data_regions[d.id]) {
                        path = lineWithRegions(data, x, y, __data_regions[d.id]);
                    } else {
                        path = line.interpolate(getInterpolate(d))(data);
                    }
                } else {
                    if (data[0]) {
                        x0 = x(data[0].x);
                        y0 = y(data[0].value);
                    }
                    path = __axis_rotated ? "M " + y0 + " " + x0 : "M " + x0 + " " + y0;
                }
                return path ? path : "M 0 0";
            };
        }

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
        function getXForText(points, d, textElement) {
            var box = textElement.getBoundingClientRect(), xPos, padding;
            if (__axis_rotated) {
                padding = isBarType(d) ? 4 : 6;
                xPos = points[2][1] + padding * (d.value < 0 ? -1 : 1);
            } else {
                xPos = points[0][0] + (points[2][0] - points[0][0]) / 2;
            }
            return xPos > width ? width - box.width : xPos;
        }
        function getYForText(points, d, textElement) {
            var box = textElement.getBoundingClientRect(), yPos;
            if (__axis_rotated) {
                yPos = (points[0][0] + points[2][0] + box.height * 0.6) / 2;
            } else {
                yPos = points[2][1] + (d.value < 0 ? box.height : isBarType(d) ? -3 : -6);
            }
            return yPos < box.height ? box.height : yPos;
        }

        function generateGetAreaPoint(areaIndices, isSub) { // partial duplication of generateGetBarPoints
            var areaTargetsNum = areaIndices.__max__ + 1,
                x = getShapeX(0, areaTargetsNum, areaIndices, !!isSub),
                y = getShapeY(!!isSub),
                areaOffset = getShapeOffset(isAreaType, areaIndices, !!isSub),
                yScale = isSub ? getSubYScale : getYScale;
            return function (d, i) {
                var y0 = yScale(d.id)(0),
                    offset = areaOffset(d, i) || y0, // offset is for stacked area chart
                    posX = x(d), posY = y(d);
                    // fix posY not to overflow opposite quadrant
                if (__axis_rotated) {
                    if ((0 < d.value && posY < y0) || (d.value < 0 && y0 < posY)) { posY = y0; }
                }
                // 1 point that marks the area position
                return [
                    [posX, offset],
                    [posX, posY - (y0 - offset)]
                ];
            };
        }

        function generateGetBarPoints(barIndices, isSub) {
            var barTargetsNum = barIndices.__max__ + 1,
                barW = getBarW(xAxis, barTargetsNum),
                barX = getShapeX(barW, barTargetsNum, barIndices, !!isSub),
                barY = getShapeY(!!isSub),
                barOffset = getShapeOffset(isBarType, barIndices, !!isSub),
                yScale = isSub ? getSubYScale : getYScale;
            return function (d, i) {
                var y0 = yScale(d.id)(0),
                    offset = barOffset(d, i) || y0, // offset is for stacked bar chart
                    posX = barX(d), posY = barY(d);
                // fix posY not to overflow opposite quadrant
                if (__axis_rotated) {
                    if ((0 < d.value && posY < y0) || (d.value < 0 && y0 < posY)) { posY = y0; }
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

        function generateGetLinePoint(lineIndices, isSub) { // partial duplication of generateGetBarPoints
            var lineTargetsNum = lineIndices.__max__ + 1,
                x = getShapeX(0, lineTargetsNum, lineIndices, !!isSub),
                y = getShapeY(!!isSub),
                lineOffset = getShapeOffset(isLineType, lineIndices, !!isSub),
                yScale = isSub ? getSubYScale : getYScale;
            return function (d, i) {
                var y0 = yScale(d.id)(0),
                    offset = lineOffset(d, i) || y0, // offset is for stacked area chart
                    posX = x(d), posY = y(d);
                // fix posY not to overflow opposite quadrant
                if (__axis_rotated) {
                    if ((0 < d.value && posY < y0) || (d.value < 0 && y0 < posY)) { posY = y0; }
                }
                // 1 point that marks the line position
                return [
                    [posX, posY - (y0 - offset)]
                ];
            };
        }

        function lineWithRegions(d, x, y, _regions) {
            var prev = -1, i, j;
            var s = "M", sWithRegion;
            var xp, yp, dx, dy, dd, diff, diffx2;
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
                    return "M" + x(xp(j), true) + " " + y(yp(j)) + " " + x(xp(j + diff), true) + " " + y(yp(j + diff));
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
                    xp = getScale(d[i - 1].x, d[i].x, isTimeSeries);
                    yp = getScale(d[i - 1].value, d[i].value);

                    dx = x(d[i].x) - x(d[i - 1].x);
                    dy = y(d[i].value) - y(d[i - 1].value);
                    dd = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                    diff = 2 / dd;
                    diffx2 = diff * 2;

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

        zoom = d3.behavior.zoom()
            .on("zoomstart", function () { zoom.altDomain = d3.event.sourceEvent.altKey ? x.orgDomain() : null; })
            .on("zoom", redrawForZoom);
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

        /*-- Draw Chart --*/

        // for svg elements
        var svg, defs, main, context, legend, tooltip, selectChart;

        // for brush area culculation
        var orgXDomain;

        // for save value
        var orgAreaOpacity, withoutFadeIn = {};

        function observeInserted(selection) {
            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    if (mutation.type === 'childList' && mutation.previousSibling) {
                        observer.disconnect();
                        // need to wait for completion of load because size calculation requires the actual sizes determined after that completion
                        var interval = window.setInterval(function () {
                            // parentNode will NOT be null when completed
                            if (selection.node().parentNode) {
                                window.clearInterval(interval);
                                redraw({
                                    withUpdateTranslate: true,
                                    withTransform: true,
                                    withUpdateXDomain: true,
                                    withUpdateOrgXDomain: true,
                                    withTransition: false,
                                    withTransitionForTransform: false,
                                    withLegend: true
                                });
                                selection.transition().style('opacity', 1);
                            }
                        }, 10);
                    }
                });
            });
            observer.observe(selection.node(), {attributes: true, childList: true, characterData: true});
        }

        function init(data) {
            var arcs, eventRect, grid, i, binding = true;

            selectChart = d3.select(__bindto);
            if (selectChart.empty()) {
                selectChart = d3.select(document.createElement('div')).style('opacity', 0);
                observeInserted(selectChart);
                binding = false;
            }
            selectChart.html("").classed("c3", true);

            // Init data as targets
            c3.data.xs = {};
            c3.data.targets = convertDataToTargets(data);

            if (__data_filter) {
                c3.data.targets = c3.data.targets.filter(__data_filter);
            }

            // Set targets to hide if needed
            if (__data_hide) {
                addHiddenTargetIds(__data_hide === true ? mapToIds(c3.data.targets) : __data_hide);
            }

            // when gauge, hide legend // TODO: fix
            if (hasGaugeType(c3.data.targets)) {
                __legend_show = false;
            }

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
                .style("overflow", "hidden")
                .on('mouseenter', __onenter)
                .on('mouseleave', __onleave);

            // Define defs
            defs = svg.append("defs");
            defs.append("clipPath").attr("id", clipId).append("rect");
            defs.append("clipPath").attr("id", clipIdForXAxis).append("rect");
            defs.append("clipPath").attr("id", clipIdForYAxis).append("rect");
            updateSvgSize();

            // Define regions
            main = svg.append("g").attr("transform", translate.main);
            context = svg.append("g").attr("transform", translate.context);
            legend = svg.append("g").attr("transform", translate.legend);

            if (!__subchart_show) {
                context.style('visibility', 'hidden');
            }

            if (!__legend_show) {
                legend.style('visibility', 'hidden');
                hiddenLegendIds = mapToIds(c3.data.targets);
            }

            // Define tooltip
            tooltip = selectChart
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

            // text when empty
            main.append("text")
                .attr("class", CLASS.text + ' ' + CLASS.empty)
                .attr("text-anchor", "middle") // horizontal centering of text at x position in all browsers.
                .attr("dominant-baseline", "middle"); // vertical centering of text at y position in all browsers, except IE.

            // Grids
            grid = main.append('g')
                .attr("clip-path", clipPath)
                .attr('class', CLASS.grid);

            // X-Grid
            if (__grid_x_show) {
                grid.append("g").attr("class", CLASS.xgrids);
            }
            if (__point_focus_line_enabled) {
                grid.append('g')
                    .attr("class", CLASS.xgridFocus)
                  .append('line')
                    .attr('class', CLASS.xgridFocus);
            }
            grid.append('g').attr("class", CLASS.xgridLines);

            // Y-Grid
            if (__grid_y_show) {
                grid.append('g').attr('class', CLASS.ygrids);
            }
            grid.append('g').attr('class', CLASS.ygridLines);

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
                .style('fill-opacity', 0);

            // Define g for bar chart area
            main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartBars);

            // Define g for line chart area
            main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartLines);

            // Define g for arc chart area
            arcs = main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartArcs)
                .attr("transform", translate.arc);
            arcs.append('text')
                .attr('class', CLASS.chartArcsTitle)
                .style("text-anchor", "middle")
                .text(getArcTitle());
            if (hasGaugeType(c3.data.targets)) {
                arcs.append('path')
                    .attr("class", CLASS.chartArcsBackground)
                    .attr("d", function () {
                        var d = {
                            data: [{value: __gauge_max}],
                            startAngle: -1 * (Math.PI / 2),
                            endAngle: Math.PI / 2
                        };
                        return getArc(d, true, true);
                    });
                arcs.append("text")
                    .attr("dy", ".75em")
                    .attr("class", CLASS.chartArcsGaugeUnit)
                    .style("text-anchor", "middle")
                    .style("pointer-events", "none")
                    .text(__gauge_label_show ? __gauge_units : '');
                arcs.append("text")
                    .attr("dx", -1 * (innerRadius + ((radius - innerRadius) / 2)) + "px")
                    .attr("dy", "1.2em")
                    .attr("class", CLASS.chartArcsGaugeMin)
                    .style("text-anchor", "middle")
                    .style("pointer-events", "none")
                    .text(__gauge_label_show ? __gauge_min : '');
                arcs.append("text")
                    .attr("dx", innerRadius + ((radius - innerRadius) / 2) + "px")
                    .attr("dy", "1.2em")
                    .attr("class", CLASS.chartArcsGaugeMax)
                    .style("text-anchor", "middle")
                    .style("pointer-events", "none")
                    .text(__gauge_label_show ? __gauge_max : '');
            }

            main.select('.' + CLASS.chart).append("g")
                .attr("class", CLASS.chartTexts);

            // if zoom privileged, insert rect to forefront
            main.insert('rect', __zoom_privileged ? null : 'g.' + CLASS.grid)
                .attr('class', CLASS.zoomRect)
                .attr('width', width)
                .attr('height', height)
                .style('opacity', 0)
                .style('cursor', __axis_rotated ? 'ns-resize' : 'ew-resize')
                .call(zoom).on("dblclick.zoom", null);

            // Set default extent if defined
            if (__axis_x_default) {
                brush.extent(typeof __axis_x_default !== 'function' ? __axis_x_default : __axis_x_default(getXDomain()));
            }

            // Add Axis
            axes.x = main.append("g")
                .attr("class", CLASS.axis + ' ' + CLASS.axisX)
                .attr("clip-path", clipPathForXAxis)
                .attr("transform", translate.x)
                .style("visibility", __axis_x_show ? 'visible' : 'hidden');
            axes.x.append("text")
                .attr("class", CLASS.axisXLabel)
                .attr("transform", __axis_rotated ? "rotate(-90)" : "")
                .style("text-anchor", textAnchorForXAxisLabel);

            axes.y = main.append("g")
                .attr("class", CLASS.axis + ' ' + CLASS.axisY)
                .attr("clip-path", clipPathForYAxis)
                .attr("transform", translate.y)
                .style("visibility", __axis_y_show ? 'visible' : 'hidden');
            axes.y.append("text")
                .attr("class", CLASS.axisYLabel)
                .attr("transform", __axis_rotated ? "" : "rotate(-90)")
                .style("text-anchor", textAnchorForYAxisLabel);

            axes.y2 = main.append("g")
                .attr("class", CLASS.axis + ' ' + CLASS.axisY2)
                // clip-path?
                .attr("transform", translate.y2)
                .style("visibility", __axis_y2_show ? 'visible' : 'hidden');
            axes.y2.append("text")
                .attr("class", CLASS.axisY2Label)
                .attr("transform", __axis_rotated ? "" : "rotate(-90)")
                .style("text-anchor", textAnchorForY2AxisLabel);

            /*-- Context Region --*/

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
            axes.subx = context.append("g")
                .attr("class", CLASS.axisX)
                .attr("transform", translate.subx)
                .attr("clip-path", __axis_rotated ? "" : clipPathForXAxis);

            // Set targets
            updateTargets(c3.data.targets);

            // Draw with targets
            if (binding) {
                redraw({withUpdateTranslate: true, withTransform: true, withUpdateXDomain: true, withUpdateOrgXDomain: true, withTransitionForAxis: false});
            }

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
                }), getXAxisTickFormat(), getYFormat(hasArcType(c3.data.targets)), color));
                tooltip.style("top", __tooltip_init_position.top)
                       .style("left", __tooltip_init_position.left)
                       .style("display", "block");
            }

            // Bind resize event
            if (window.onresize == null) {
                window.onresize = generateResize();
            }
            if (window.onresize.add) {
                window.onresize.add(__onresize);
                window.onresize.add(function () {
                    c3.flush();
                });
                window.onresize.add(__onresized);
            }

            // export element of the chart
            c3.element = selectChart.node();
        }

        function generateEventRectsForSingleX(eventRectEnter) {
            eventRectEnter.append("rect")
                .attr("class", classEvent)
                .style("cursor", __data_selection_enabled && __data_selection_grouped ? "pointer" : null)
                .on('mouseover', function (d) {
                    var index = d.index, selectedData, newData;

                    if (dragging) { return; } // do nothing if dragging
                    if (hasArcType(c3.data.targets)) { return; }

                    selectedData = c3.data.targets.map(function (t) {
                        return addName(getValueOnIndex(t.values, index));
                    });

                    // Sort selectedData as names order
                    newData = [];
                    Object.keys(__data_names).forEach(function (id) {
                        for (var j = 0; j < selectedData.length; j++) {
                            if (selectedData[j] && selectedData[j].id === id) {
                                newData.push(selectedData[j]);
                                selectedData.shift(j);
                                break;
                            }
                        }
                    });
                    selectedData = newData.concat(selectedData); // Add remained

                    // Expand shapes for selection
                    if (__point_focus_expand_enabled) { expandCircles(index); }
                    expandBars(index);

                    // Call event handler
                    main.selectAll('.' + CLASS.shape + '-' + index).each(function (d) {
                        __data_onenter(d);
                    });
                })
                .on('mouseout', function (d) {
                    var index = d.index;
                    if (hasArcType(c3.data.targets)) { return; }
                    hideXGridFocus();
                    hideTooltip();
                    // Undo expanded shapes
                    unexpandCircles(index);
                    unexpandBars();
                    // Call event handler
                    main.selectAll('.' + CLASS.shape + '-' + index).each(function (d) {
                        __data_onleave(d);
                    });
                })
                .on('mousemove', function (d) {
                    var selectedData, index = d.index, eventRect = svg.select('.' + CLASS.eventRect + '-' + index);

                    if (dragging) { return; } // do nothing when dragging
                    if (hasArcType(c3.data.targets)) { return; }

                    // Show tooltip
                    selectedData = filterTargetsToShow(c3.data.targets).map(function (t) {
                        return addName(getValueOnIndex(t.values, index));
                    });

                    if (__tooltip_grouped) {
                        showTooltip(selectedData, d3.mouse(this));
                        showXGridFocus(selectedData);
                    }

                    if (__tooltip_grouped && (!__data_selection_enabled || __data_selection_grouped)) {
                        return;
                    }

                    main.selectAll('.' + CLASS.shape + '-' + index)
                        .each(function () {
                            d3.select(this).classed(CLASS.EXPANDED, true);
                            if (__data_selection_enabled) {
                                eventRect.style('cursor', __data_selection_grouped ? 'pointer' : null);
                            }
                            if (!__tooltip_grouped) {
                                hideXGridFocus();
                                hideTooltip();
                                if (!__data_selection_grouped) {
                                    unexpandCircles(index);
                                    unexpandBars();
                                }
                            }
                        })
                        .filter(function (d) {
                            if (this.nodeName === 'circle') {
                                return isWithinCircle(this, pointSelectR(d));
                            }
                            else if (this.nodeName === 'path') {
                                return isWithinBar(this);
                            }
                        })
                        .each(function (d) {
                            if (__data_selection_enabled && (__data_selection_grouped || __data_selection_isselectable(d))) {
                                eventRect.style('cursor', 'pointer');
                            }
                            if (!__tooltip_grouped) {
                                showTooltip([d], d3.mouse(this));
                                showXGridFocus([d]);
                                if (__point_focus_expand_enabled) { expandCircles(index, d.id); }
                                expandBars(index, d.id);
                            }
                        });
                })
                .on('click', function (d) {
                    var index = d.index;
                    if (hasArcType(c3.data.targets)) { return; }
                    if (cancelClick) {
                        cancelClick = false;
                        return;
                    }
                    main.selectAll('.' + CLASS.shape + '-' + index).each(function (d) { toggleShape(this, d, index); });
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
                    var targetsToShow = filterTargetsToShow(c3.data.targets);
                    var mouse, closest, sameXData, selectedData;

                    if (dragging) { return; } // do nothing when dragging
                    if (hasArcType(targetsToShow)) { return; }

                    mouse = d3.mouse(this);
                    closest = findClosestFromTargets(targetsToShow, mouse);

                    if (! closest) { return; }

                    if (isScatterType(closest)) {
                        sameXData = [closest];
                    } else {
                        sameXData = filterSameX(targetsToShow, closest.x);
                    }

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
                    var targetsToShow = filterTargetsToShow(c3.data.targets);
                    var mouse, closest;

                    if (hasArcType(targetsToShow)) { return; }

                    mouse = d3.mouse(this);
                    closest = findClosestFromTargets(targetsToShow, mouse);

                    if (! closest) { return; }

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

        function toggleShape(that, d, i) {
            var shape = d3.select(that), isSelected = shape.classed(CLASS.SELECTED), isWithin,  toggle;
            if (that.nodeName === 'circle') {
                isWithin = isWithinCircle(that, pointSelectR(d) * 1.5);
                toggle = togglePoint;
            }
            else if (that.nodeName === 'path') {
                if (shape.classed(CLASS.bar)) {
                    isWithin = isWithinBar(that);
                    toggle = toggleBar;
                } else { // would be arc
                    isWithin = true;
                    toggle = toggleArc;
                }
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
                __data_onclick(d, that);
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
                    var shape = d3.select(this),
                        isSelected = shape.classed(CLASS.SELECTED),
                        isIncluded = shape.classed(CLASS.INCLUDED),
                        _x, _y, _w, _h, toggle, isWithin = false, box;
                    if (shape.classed(CLASS.circle)) {
                        _x = shape.attr("cx") * 1;
                        _y = shape.attr("cy") * 1;
                        toggle = togglePoint;
                        isWithin = minX < _x && _x < maxX && minY < _y && _y < maxY;
                    }
                    else if (shape.classed(CLASS.bar)) {
                        box = getPathBox(this);
                        _x = box.x;
                        _y = box.y;
                        _w = box.width;
                        _h = box.height;
                        toggle = toggleBar;
                        isWithin = !(maxX < _x || _x + _w < minX) && !(maxY < _y || _y + _h < minY);
                    } else {
                        // line/area selection not supported yet
                        return;
                    }
                    if (isWithin ^ isIncluded) {
                        shape.classed(CLASS.INCLUDED, !isIncluded);
                        // TODO: included/unincluded callback here
                        shape.classed(CLASS.SELECTED, !isSelected);
                        toggle(!isSelected, shape, d, i);
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

        function smoothLines(el, type) {
            if (type === 'grid') {
                el.each(function () {
                    var g = d3.select(this),
                        x1 = g.attr('x1'),
                        x2 = g.attr('x2'),
                        y1 = g.attr('y1'),
                        y2 = g.attr('y2');
                    g.attr({
                        'x1': Math.ceil(x1),
                        'x2': Math.ceil(x2),
                        'y1': Math.ceil(y1),
                        'y2': Math.ceil(y2),
                    });
                });
            }
        }

        function redraw(options, transitions) {
            var xgrid, xgridAttr, xgridData, xgridLines, xgridLine, ygrid, ygridLines, ygridLine, flushXGrid;
            var mainLine, mainArea, mainCircle, mainBar, mainArc, mainRegion, mainText, contextLine,  contextArea, contextBar, eventRect, eventRectUpdate;
            var areaIndices = getShapeIndices(isAreaType), barIndices = getShapeIndices(isBarType), lineIndices = getShapeIndices(isLineType), maxDataCountTarget, tickOffset;
            var rectX, rectW;
            var withY, withSubchart, withTransition, withTransitionForExit, withTransitionForAxis, withTransform, withUpdateXDomain, withUpdateOrgXDomain, withLegend, withUpdateTranslate;
            var hideAxis = hasArcType(c3.data.targets);
            var drawArea, drawAreaOnSub, drawBar, drawBarOnSub, drawLine, drawLineOnSub, xForText, yForText;
            var duration, durationForExit, durationForAxis, waitForDraw = generateWait();
            var targetsToShow = filterTargetsToShow(c3.data.targets), tickValues, i, intervalForCulling;

            xgrid = xgridLines = mainCircle = mainText = getEmptySelection();

            options = options || {};
            withY = getOption(options, "withY", true);
            withSubchart = getOption(options, "withSubchart", true);
            withTransition = getOption(options, "withTransition", true);
            withTransform = getOption(options, "withTransform", false);
            withUpdateXDomain = getOption(options, "withUpdateXDomain", false);
            withUpdateOrgXDomain = getOption(options, "withUpdateOrgXDomain", false);
            withUpdateTranslate = getOption(options, "withUpdateTranslate", false);
            withLegend = getOption(options, "withLegend", false);
            withTransitionForExit = getOption(options, "withTransitionForExit", withTransition);
            withTransitionForAxis = getOption(options, "withTransitionForAxis", withTransition);

            duration = withTransition ? __transition_duration : 0;
            durationForExit = withTransitionForExit ? duration : 0;
            durationForAxis = withTransitionForAxis ? duration : 0;

            transitions = transitions || generateAxisTransitions(durationForAxis);

            // MEMO: call axis to generate ticks and get those length, then update translate with them
            if (withUpdateTranslate) {
                if (__axis_rotated) {
                    axes.x.call(xAxis);
                    axes.subx.call(subXAxis);
                } else {
                    axes.y.call(yAxis);
                    axes.y2.call(y2Axis);
                }
                updateSizes();
                updateScales();
                updateSvgSize();
                transformAll(false);
            }

            // update legend and transform each g
            if (withLegend && __legend_show) {
                updateLegend(mapToIds(c3.data.targets), options, transitions);
            }

            // MEMO: needed for grids calculation
            if (isCategorized && targetsToShow.length === 0) {
                x.domain([0, axes.x.selectAll('.tick').size()]);
            }

            if (targetsToShow.length) {
                updateXDomain(targetsToShow, withUpdateXDomain, withUpdateOrgXDomain);
                // update axis tick values according to options
                if (!__axis_x_tick_values && (__axis_x_tick_fit || __axis_x_tick_count)) {
                    tickValues = generateTickValues(mapTargetsToUniqueXs(targetsToShow), __axis_x_tick_count);
                    xAxis.tickValues(tickValues);
                    subXAxis.tickValues(tickValues);
                }
            } else {
                xAxis.tickValues([]);
                subXAxis.tickValues([]);
            }

            y.domain(getYDomain(targetsToShow, 'y'));
            y2.domain(getYDomain(targetsToShow, 'y2'));

            // axes
            axes.x.style("opacity", hideAxis ? 0 : 1);
            axes.y.style("opacity", hideAxis ? 0 : 1);
            axes.y2.style("opacity", hideAxis ? 0 : 1);
            axes.subx.style("opacity", hideAxis ? 0 : 1);
            transitions.axisX.call(xAxis);
            transitions.axisY.call(yAxis);
            transitions.axisY2.call(y2Axis);
            transitions.axisSubX.call(subXAxis);

            // Update axis label
            updateAxisLabels(withTransition);

            // show/hide if manual culling needed
            if (withUpdateXDomain && targetsToShow.length) {
                if (__axis_x_tick_culling && tickValues) {
                    for (i = 1; i < tickValues.length; i++) {
                        if (tickValues.length / i < __axis_x_tick_culling_max) {
                            intervalForCulling = i;
                            break;
                        }
                    }
                    svg.selectAll('.' + CLASS.axisX + ' .tick text').each(function (e) {
                        var index = tickValues.indexOf(e);
                        if (index >= 0) {
                            d3.select(this).style('display', index % intervalForCulling ? 'none' : 'block');
                        }
                    });
                } else {
                    svg.selectAll('.' + CLASS.axisX + ' .tick text').style('display', 'block');
                }
            }

            // rotate tick text if needed
            if (!__axis_rotated && __axis_x_tick_rotate) {
                rotateTickText(axes.x, transitions.axisX, __axis_x_tick_rotate);
            }

            // setup drawer - MEMO: these must be called after axis updated
            drawArea = generateDrawArea(areaIndices, false);
            drawBar = generateDrawBar(barIndices);
            drawLine = generateDrawLine(lineIndices, false);
            xForText = generateXYForText(barIndices, true);
            yForText = generateXYForText(barIndices, false);

            // Update sub domain
            subY.domain(y.domain());
            subY2.domain(y2.domain());

            // tooltip
            tooltip.style("display", "none");

            // xgrid focus
            updateXgridFocus();

            // Data empty label positioning and text.
            main.select("text." + CLASS.text + '.' + CLASS.empty)
                .attr("x", width / 2)
                .attr("y", height / 2)
                .text(__data_empty_label_text)
              .transition()
                .style('opacity', targetsToShow.length ? 0 : 1);

            // grid
            main.select('line.' + CLASS.xgridFocus).style("visibility", "hidden");
            if (__grid_x_show) {
                xgridAttr = __axis_rotated ? {
                    'x1': 0,
                    'x2': width,
                    'y1': function (d) { return x(d) - tickOffset; },
                    'y2': function (d) { return x(d) - tickOffset; }
                } : {
                    'x1': function (d) { return x(d) + tickOffset; },
                    'x2': function (d) { return x(d) + tickOffset; },
                    'y1': margin.top,
                    'y2': height
                };
                // this is used to flow
                flushXGrid = function (withoutUpdate) {
                    xgridData = generateGridData(__grid_x_type, x);
                    tickOffset = isCategorized ? xAxis.tickOffset() : 0;
                    xgrid = main.select('.' + CLASS.xgrids).selectAll('.' + CLASS.xgrid)
                        .data(xgridData);
                    xgrid.enter().append('line').attr("class", CLASS.xgrid);
                    if (!withoutUpdate) {
                        xgrid.attr(xgridAttr)
                            .style("opacity", function () { return +d3.select(this).attr(__axis_rotated ? 'y1' : 'x1') === (__axis_rotated ? height : 0) ? 0 : 1; });
                    }
                    xgrid.exit().remove();
                };
                flushXGrid();
            }
            xgridLines = main.select('.' + CLASS.xgridLines).selectAll('.' + CLASS.xgridLine)
                .data(__grid_x_lines);
            // enter
            xgridLine = xgridLines.enter().append('g')
                .attr("class", function (d) { return CLASS.xgridLine + (d.class ? ' ' + d.class : ''); });
            xgridLine.append('line')
                .style("opacity", 0);
            xgridLine.append('text')
                .attr("text-anchor", "end")
                .attr("transform", __axis_rotated ? "" : "rotate(-90)")
                .attr('dx', __axis_rotated ? 0 : -margin.top)
                .attr('dy', -5)
                .style("opacity", 0);
            // udpate
            // done in d3.transition() of the end of this function
            // exit
            xgridLines.exit().transition().duration(duration)
                .style("opacity", 0)
                .remove();
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
                smoothLines(ygrid, 'grid');
            }
            if (withY) {
                ygridLines = main.select('.' + CLASS.ygridLines).selectAll('.' + CLASS.ygridLine)
                    .data(__grid_y_lines);
                // enter
                ygridLine = ygridLines.enter().append('g')
                    .attr("class", function (d) { return CLASS.ygridLine + (d.class ? ' ' + d.class : ''); });
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

            // rect for regions
            mainRegion = main.select('.' + CLASS.regions).selectAll('.' + CLASS.region)
                .data(__regions);
            mainRegion.enter().append('g')
                .attr('class', classRegion)
              .append('rect')
                .style("fill-opacity", 0);
            mainRegion.exit().transition().duration(duration)
                .style("opacity", 0)
                .remove();

            // bars
            mainBar = main.selectAll('.' + CLASS.bars).selectAll('.' + CLASS.bar)
                .data(barData);
            mainBar.enter().append('path')
                .attr("class", classBar)
                .style("stroke", function (d) { return color(d.id); })
                .style("fill", function (d) { return color(d.id); });
            mainBar
                .style("opacity", initialOpacity);
            mainBar.exit().transition().duration(durationForExit)
                .style('opacity', 0)
                .remove();

            // lines, areas and cricles
            mainLine = main.selectAll('.' + CLASS.lines).selectAll('.' + CLASS.line)
                .data(lineData);
            mainLine.enter().append('path')
                .attr('class', classLine)
                .style("stroke", color);
            mainLine
                .style("opacity", initialOpacity)
                .attr('transform', null);
            mainLine.exit().transition().duration(durationForExit)
                .style('opacity', 0)
                .remove();

            mainArea = main.selectAll('.' + CLASS.areas).selectAll('.' + CLASS.area)
                .data(lineData);
            mainArea.enter().append('path')
                .attr("class", classArea)
                .style("fill", color)
                .style("opacity", function () { orgAreaOpacity = +d3.select(this).style('opacity'); return 0; });
            mainArea
                .style("opacity", orgAreaOpacity);
            mainArea.exit().transition().duration(durationForExit)
                .style('opacity', 0)
                .remove();

            if (__point_show) {
                mainCircle = main.selectAll('.' + CLASS.circles).selectAll('.' + CLASS.circle)
                    .data(lineOrScatterData);
                mainCircle.enter().append("circle")
                    .attr("class", classCircle)
                    .attr("r", pointR)
                    .style("fill", color);
                mainCircle
                    .style("opacity", initialOpacity);
                mainCircle.exit().remove();
            }

            if (hasDataLabel()) {
                mainText = main.selectAll('.' + CLASS.texts).selectAll('.' + CLASS.text)
                    .data(barOrLineData);
                mainText.enter().append('text')
                    .attr("class", classText)
                    .attr('text-anchor', function (d) { return __axis_rotated ? (d.value < 0 ? 'end' : 'start') : 'middle'; })
                    .style("stroke", 'none')
                    .style("fill", color)
                    .style("fill-opacity", 0);
                mainText
                    .text(function (d) { return formatByAxisId(getAxisId(d.id))(d.value, d.id); });
                mainText.exit()
                  .transition().duration(durationForExit)
                    .style('fill-opacity', 0)
                    .remove();
            }

            // arc
            mainArc = main.selectAll('.' + CLASS.arcs).selectAll('.' + CLASS.arc)
                .data(arcData);
            mainArc.enter().append('path')
                .attr("class", classArc)
                .style("fill", function (d) { return color(d.data); })
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; })
                .style("opacity", 0)
                .each(function (d) {
                    if (isGaugeType(d.data)) {
                        d.startAngle = d.endAngle = -1 * (Math.PI / 2);
                    }
                    this._current = d;
                })
                .on('mouseover', function (d, i) {
                    var updated, arcData, callback;
                    if (transiting) { // skip while transiting
                        return;
                    }
                    updated = updateAngle(d);
                    arcData = convertToArcData(updated);
                    callback = getArcOnMouseOver();
                    // transitions
                    expandArc(updated.data.id);
                    toggleFocusLegend(updated.data.id, true);
                    callback(arcData, i);
                })
                .on('mousemove', function (d) {
                    var updated = updateAngle(d), arcData = convertToArcData(updated), selectedData = [arcData];
                    showTooltip(selectedData, d3.mouse(this));
                })
                .on('mouseout', function (d, i) {
                    var updated, arcData, callback;
                    if (transiting) { // skip while transiting
                        return;
                    }
                    updated = updateAngle(d);
                    arcData = convertToArcData(updated);
                    callback = getArcOnMouseOut();
                    // transitions
                    unexpandArc(updated.data.id);
                    revertLegend();
                    hideTooltip();
                    callback(arcData, i);
                })
                .on('click', function (d, i) {
                    var updated = updateAngle(d), arcData = convertToArcData(updated), callback = getArcOnClick();
                    toggleShape(this, d, i);
                    callback(arcData, i);
                });
            mainArc
                .attr("transform", function (d) { return !isGaugeType(d.data) && withTransform ? "scale(0)" : ""; })
                .style("opacity", function (d) { return d === this._current ? 0 : 1; })
                .each(function () { transiting = true; })
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
                    if (isNaN(this._current.endAngle)) {
                        this._current.endAngle = this._current.startAngle;
                    }
                    interpolate = d3.interpolate(this._current, updated);
                    this._current = interpolate(0);
                    return function (t) { return getArc(interpolate(t), true); };
                })
                .attr("transform", withTransform ? "scale(1)" : "")
                .style("fill", function (d) {
                    return levelColor ? levelColor(d.data.values[0].value) : color(d.data.id);
                }) // Where gauge reading color would receive customization.
                .style("opacity", 1)
                .call(endall, function () {
                    transiting = false;
                });
            mainArc.exit().transition().duration(durationForExit)
                .style('opacity', 0)
                .remove();
            main.selectAll('.' + CLASS.chartArc).select('text')
                .style("opacity", 0)
                .attr('class', function (d) { return isGaugeType(d.data) ? CLASS.gaugeValue : ''; })
                .text(textForArcLabel)
                .attr("transform", transformForArcLabel)
              .transition().duration(duration)
                .style("opacity", function (d) { return isTargetToShow(d.data.id) && isArcType(d.data) ? 1 : 0; });
            main.select('.' + CLASS.chartArcsTitle)
                .style("opacity", hasDonutType(c3.data.targets) || hasGaugeType(c3.data.targets) ? 1 : 0);

            // subchart
            if (__subchart_show) {
                // reflect main chart to extent on subchart if zoomed
                if (d3.event && d3.event.type === 'zoom') {
                    brush.extent(x.orgDomain()).update();
                }
                // update subchart elements if needed
                if (withSubchart) {

                    // rotate tick text if needed
                    if (!__axis_rotated && __axis_x_tick_rotate) {
                        rotateTickText(axes.subx, transitions.axisSubX, __axis_x_tick_rotate);
                    }

                    // extent rect
                    if (!brush.empty()) {
                        brush.extent(x.orgDomain()).update();
                    }
                    // setup drawer - MEMO: this must be called after axis updated
                    drawAreaOnSub = generateDrawArea(areaIndices, true);
                    drawBarOnSub = generateDrawBar(barIndices, true);
                    drawLineOnSub = generateDrawLine(lineIndices, true);
                    // bars
                    contextBar = context.selectAll('.' + CLASS.bars).selectAll('.' + CLASS.bar)
                        .data(barData);
                    contextBar.enter().append('path')
                        .attr("class", classBar)
                        .style("stroke", 'none')
                        .style("fill", color);
                    contextBar
                        .style("opacity", initialOpacity)
                      .transition().duration(duration)
                        .attr('d', drawBarOnSub)
                        .style('opacity', 1);
                    contextBar.exit().transition().duration(duration)
                        .style('opacity', 0)
                        .remove();
                    // lines
                    contextLine = context.selectAll('.' + CLASS.lines).selectAll('.' + CLASS.line)
                        .data(lineData);
                    contextLine.enter().append('path')
                        .attr('class', classLine)
                        .style('stroke', color);
                    contextLine
                        .style("opacity", initialOpacity)
                      .transition().duration(duration)
                        .attr("d", drawLineOnSub)
                        .style('opacity', 1);
                    contextLine.exit().transition().duration(duration)
                        .style('opacity', 0)
                        .remove();
                    // area
                    contextArea = context.selectAll('.' + CLASS.areas).selectAll('.' + CLASS.area)
                        .data(lineData);
                    contextArea.enter().append('path')
                        .attr("class", classArea)
                        .style("fill", color)
                        .style("opacity", function () { orgAreaOpacity = +d3.select(this).style('opacity'); return 0; });
                    contextArea
                        .style("opacity", 0)
                      .transition().duration(duration)
                        .attr("d", drawAreaOnSub)
                        .style("fill", color)
                        .style("opacity", orgAreaOpacity);
                    contextArea.exit().transition().duration(durationForExit)
                        .style('opacity', 0)
                        .remove();
                }
            }

            // circles for select
            main.selectAll('.' + CLASS.selectedCircles)
                .filter(function (d) { return isBarType(d); })
                .selectAll('circle')
                .remove();

            if (__interaction_enabled) {
                // rect for mouseover
                eventRect = main.select('.' + CLASS.eventRects)
                    .style('cursor', __zoom_enabled ? __axis_rotated ? 'ns-resize' : 'ew-resize' : null);
                if (notEmpty(__data_xs) && !isSingleX(__data_xs)) {

                    if (!eventRect.classed(CLASS.eventRectsMultiple)) {
                        eventRect.classed(CLASS.eventRectsMultiple, true).classed(CLASS.eventRectsSingle, false)
                            .selectAll('.' + CLASS.eventRect).remove();
                    }

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

                    if (!eventRect.classed(CLASS.eventRectsSingle)) {
                        eventRect.classed(CLASS.eventRectsMultiple, false).classed(CLASS.eventRectsSingle, true)
                            .selectAll('.' + CLASS.eventRect).remove();
                    }

                    if ((isCustomX() || isTimeSeries) && !isCategorized) {
                        rectW = function (d) {
                            var prevX = getPrevX(d.index), nextX = getNextX(d.index), dx = c3.data.xs[d.id][d.index];
                            return (x(nextX ? nextX : dx) - x(prevX ? prevX : dx)) / 2;
                        };
                        rectX = function (d) {
                            var prevX = getPrevX(d.index), dx = c3.data.xs[d.id][d.index];
                            return (x(dx) + x(prevX ? prevX : dx)) / 2;
                        };
                    } else {
                        rectW = getEventRectWidth();
                        rectX = function (d) {
                            return x(d.x) - (rectW / 2);
                        };
                    }
                    // Set data
                    maxDataCountTarget = getMaxDataCountTarget(c3.data.targets);
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
            }

            // transition should be derived from one transition
            d3.transition().duration(duration).each(function () {
                waitForDraw.add(mainBar.transition()
                    .attr('d', drawBar)
                    .style("fill", color)
                    .style("opacity", 1));
                waitForDraw.add(mainLine.transition()
                    .attr("d", drawLine)
                    .style("stroke", color)
                    .style("opacity", 1));
                waitForDraw.add(mainArea.transition()
                    .attr("d", drawArea)
                    .style("fill", color)
                    .style("opacity", orgAreaOpacity));
                waitForDraw.add(mainCircle.transition()
                    .style('opacity', opacityForCircle)
                    .style("fill", color)
                    .attr("cx", __axis_rotated ? circleY : circleX)
                    .attr("cy", __axis_rotated ? circleX : circleY));
                waitForDraw.add(main.selectAll('.' + CLASS.selectedCircle).transition()
                    .attr("cx", __axis_rotated ? circleY : circleX)
                    .attr("cy", __axis_rotated ? circleX : circleY));
                waitForDraw.add(mainText.transition()
                    .attr('x', xForText)
                    .attr('y', yForText)
                    .style("fill", color)
                    .style("fill-opacity", options.flow ? 0 : initialOpacityForText));
                waitForDraw.add(mainRegion.selectAll('rect').transition()
                    .attr("x", regionX)
                    .attr("y", regionY)
                    .attr("width", regionWidth)
                    .attr("height", regionHeight)
                    .style("fill-opacity", function (d) { return isValue(d.opacity) ? d.opacity : 0.1; }));
                waitForDraw.add(xgridLines.select('line').transition()
                    .attr("x1", __axis_rotated ? 0 : xv)
                    .attr("x2", __axis_rotated ? width : xv)
                    .attr("y1", __axis_rotated ? xv : margin.top)
                    .attr("y2", __axis_rotated ? xv : height)
                    .style("opacity", 1));
                waitForDraw.add(xgridLines.select('text').transition()
                    .attr("x", __axis_rotated ? width : 0)
                    .attr("y", xv)
                    .text(function (d) { return d.text; })
                    .style("opacity", 1));
            })
            .call(waitForDraw, options.flow ? function () { // only for flow
                var translateX, scaleX = 1, transform,
                    flowIndex = options.flow.index,
                    flowLength = options.flow.length,
                    flowStart = getValueOnIndex(c3.data.targets[0].values, flowIndex),
                    flowEnd = getValueOnIndex(c3.data.targets[0].values, flowIndex + flowLength),
                    orgDomain = x.domain(), domain,
                    durationForFlow = options.flow.duration || duration,
                    onend = options.flow.onend || function () {},
                    wait = generateWait();

                // remove head data after rendered
                c3.data.targets.forEach(function (d) {
                    d.values.splice(0, flowLength);
                });

                // update x domain to generate axis elements for flow
                domain = updateXDomain(targetsToShow, true, true);
                // update elements related to x scale
                if (flushXGrid) { flushXGrid(true); }

                // generate transform to flow
                if (!options.flow.orgDataCount) { // if empty
                    if (isTimeSeries) {
                        if (c3.data.targets[0].values.length !== 1) {
                            translateX = x(orgDomain[0]) - x(domain[0]);
                        } else {
                            flowStart = getValueOnIndex(c3.data.targets[0].values, 0);
                            flowEnd = getValueOnIndex(c3.data.targets[0].values, c3.data.targets[0].values.length - 1);
                            translateX = x(flowStart.x) - x(flowEnd.x);
                        }
                    } else {
                        if (c3.data.targets[0].values.length !== 1) {
                            translateX = (domain[0] - orgDomain[0] >= 1 ? x(orgDomain[0]) : 0) - x(flowEnd.x);
                        } else {
                            translateX = diffDomain(domain) / 2;
                        }
                    }
                } else if (options.flow.orgDataCount === 1 || flowStart.x === flowEnd.x) {
                    translateX = x(orgDomain[0]) - x(domain[0]);
                } else {
                    if (isTimeSeries) {
                        translateX = (x(orgDomain[0]) - x(domain[0]));
                    } else {
                        translateX = (x(flowStart.x) - x(flowEnd.x));
                    }
                }
                scaleX = (diffDomain(orgDomain) / diffDomain(domain));
                transform = 'translate(' + translateX + ',0) scale(' + scaleX + ',1)';

                d3.transition().ease('linear').duration(durationForFlow).each(function () {
                    wait.add(axes.x.transition().call(xAxis));
                    wait.add(mainBar.transition().attr('transform', transform));
                    wait.add(mainLine.transition().attr('transform', transform));
                    wait.add(mainArea.transition().attr('transform', transform));
                    wait.add(mainCircle.transition().attr('transform', transform));
                    wait.add(mainText.transition().attr('transform', transform));
                    wait.add(mainRegion.filter(isRegionOnX).transition().attr('transform', transform));
                    wait.add(xgrid.transition().attr('transform', transform));
                    wait.add(xgridLines.transition().attr('transform', transform));
                })
                .call(wait, function () {
                    var i, shapes = [], texts = [], eventRects = [];

                    // remove flowed elements
                    if (flowLength) {
                        for (i = 0; i < flowLength; i++) {
                            shapes.push('.' + CLASS.shape + '-' + (flowIndex + i));
                            texts.push('.' + CLASS.text + '-' + (flowIndex + i));
                            eventRects.push('.' + CLASS.eventRect + '-' + (flowIndex + i));
                        }
                        svg.selectAll('.' + CLASS.shapes).selectAll(shapes).remove();
                        svg.selectAll('.' + CLASS.texts).selectAll(texts).remove();
                        svg.selectAll('.' + CLASS.eventRects).selectAll(eventRects).remove();
                        svg.select('.' + CLASS.xgrid).remove();
                    }

                    // draw again for removing flowed elements and reverting attr
                    xgrid
                        .attr('transform', null)
                        .attr(xgridAttr);
                    xgridLines
                        .attr('transform', null);
                    xgridLines.select('line')
                        .attr("x1", __axis_rotated ? 0 : xv)
                        .attr("x2", __axis_rotated ? width : xv);
                    xgridLines.select('text')
                        .attr("x", __axis_rotated ? width : 0)
                        .attr("y", xv);
                    mainBar
                        .attr('transform', null)
                        .attr("d", drawBar);
                    mainLine
                        .attr('transform', null)
                        .attr("d", drawLine);
                    mainArea
                        .attr('transform', null)
                        .attr("d", drawArea);
                    mainCircle
                        .attr('transform', null)
                        .attr("cx", __axis_rotated ? circleY : circleX)
                        .attr("cy", __axis_rotated ? circleX : circleY);
                    mainText
                        .attr('transform', null)
                        .attr('x', xForText)
                        .attr('y', yForText)
                        .style('fill-opacity', opacityForText);
                    mainRegion
                        .attr('transform', null);
                    mainRegion.select('rect').filter(isRegionOnX)
                        .attr("x", regionX)
                        .attr("width", regionWidth);
                    eventRectUpdate
                        .attr("x", __axis_rotated ? 0 : rectX)
                        .attr("y", __axis_rotated ? rectX : 0)
                        .attr("width", __axis_rotated ? width : rectW)
                        .attr("height", __axis_rotated ? rectW : height);

                    // callback for end of flow
                    onend();
                });
            } : null);

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
            if (!__zoom_enabled) {
                return;
            }
            if (filterTargetsToShow(c3.data.targets).length === 0) {
                return;
            }
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
            svg.select('#' + clipId).select('rect')
                .attr('width', width)
                .attr('height', height);
            svg.select('#' + clipIdForXAxis).select('rect')
                .attr('x', getXAxisClipX)
                .attr('y', getXAxisClipY)
                .attr('width', getXAxisClipWidth)
                .attr('height', getXAxisClipHeight);
            svg.select('#' + clipIdForYAxis).select('rect')
                .attr('x', getYAxisClipX)
                .attr('y', getYAxisClipY)
                .attr('width', getYAxisClipWidth)
                .attr('height', getYAxisClipHeight);
            svg.select('.' + CLASS.zoomRect)
                .attr('width', width)
                .attr('height', height);
            // MEMO: parent div's height will be bigger than svg when <!DOCTYPE html>
            selectChart.style('max-height', currentHeight + "px");
        }

        function generateAxisTransitions(duration) {
            return {
                axisX: duration ? axes.x.transition().duration(duration) : axes.x,
                axisY: duration ? axes.y.transition().duration(duration) : axes.y,
                axisY2: duration ? axes.y2.transition().duration(duration) : axes.y2,
                axisSubX: duration ? axes.subx.transition().duration(duration) : axes.subx,
            };
        }

        function updateAndRedraw(options) {
            var transitions;
            options = options || {};
            // same with redraw
            options.withTransition = getOption(options, "withTransition", true);
            options.withTransform = getOption(options, "withTransform", false);
            options.withLegend = getOption(options, "withLegend", false);
            // NOT same with redraw
            options.withUpdateXDomain = true;
            options.withUpdateOrgXDomain = true;
            options.withTransitionForExit = false;
            // MEMO: this needs to be called before updateLegend and it means this ALWAYS needs to be called)
            updateSizes();
            // MEMO: called in updateLegend in redraw if withLegend
            if (!(options.withLegend && __legend_show)) {
                transitions = generateAxisTransitions(options.withTransitionForAxis ? __transition_duration : 0);
                // Update scales
                updateScales();
                updateSvgSize();
                // Update g positions
                transformAll(options.withTransition, transitions);
            }
            // Draw with new sizes & scales
            redraw(options, transitions);
        }

        function updateTargets(targets) {
            var mainLineEnter, mainLineUpdate, mainBarEnter, mainBarUpdate, mainPieEnter, mainPieUpdate, mainTextUpdate, mainTextEnter;
            var contextLineEnter, contextLineUpdate, contextBarEnter, contextBarUpdate;

            /*-- Main --*/

            //-- Text --//
            mainTextUpdate = main.select('.' + CLASS.chartTexts).selectAll('.' + CLASS.chartText)
                .data(targets)
                .attr('class', classChartText);
            mainTextEnter = mainTextUpdate.enter().append('g')
                .attr('class', classChartText)
                .style('opacity', 0)
                .style("pointer-events", "none");
            mainTextEnter.append('g')
                .attr('class', classTexts);

            //-- Bar --//
            mainBarUpdate = main.select('.' + CLASS.chartBars).selectAll('.' + CLASS.chartBar)
                .data(targets)
                .attr('class', classChartBar);
            mainBarEnter = mainBarUpdate.enter().append('g')
                .attr('class', classChartBar)
                .style('opacity', 0)
                .style("pointer-events", "none");
            // Bars for each data
            mainBarEnter.append('g')
                .attr("class", classBars)
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; });

            //-- Line --//
            mainLineUpdate = main.select('.' + CLASS.chartLines).selectAll('.' + CLASS.chartLine)
                .data(targets)
                .attr('class', classChartLine);
            mainLineEnter = mainLineUpdate.enter().append('g')
                .attr('class', classChartLine)
                .style('opacity', 0)
                .style("pointer-events", "none");
            // Lines for each data
            mainLineEnter.append('g')
                .attr("class", classLines);
            // Areas
            mainLineEnter.append('g')
                .attr('class', classAreas);
            // Circles for each data point on lines
            mainLineEnter.append('g')
                .attr("class", function (d) { return generateClass(CLASS.selectedCircles, d.id); });
            mainLineEnter.append('g')
                .attr("class", classCircles)
                .style("cursor", function (d) { return __data_selection_isselectable(d) ? "pointer" : null; });
            // Update date for selected circles
            targets.forEach(function (t) {
                main.selectAll('.' + CLASS.selectedCircles + getTargetSelectorSuffix(t.id)).selectAll('.' + CLASS.selectedCircle).each(function (d) {
                    d.value = t.values[d.index].value;
                });
            });
            // MEMO: can not keep same color...
            //mainLineUpdate.exit().remove();

            //-- Pie --//
            mainPieUpdate = main.select('.' + CLASS.chartArcs).selectAll('.' + CLASS.chartArc)
                .data(pie(targets))
                .attr("class", classChartArc);
            mainPieEnter = mainPieUpdate.enter().append("g")
                .attr("class", classChartArc);
            mainPieEnter.append('g')
                .attr('class', classArcs);
            mainPieEnter.append("text")
                .attr("dy", hasGaugeType(c3.data.targets) ? "-0.35em" : ".35em")
                .style("opacity", 0)
                .style("text-anchor", "middle")
                .style("pointer-events", "none");
            // MEMO: can not keep same color..., but not bad to update color in redraw
            //mainPieUpdate.exit().remove();

            /*-- Context --*/

            if (__subchart_show) {

                contextBarUpdate = context.select('.' + CLASS.chartBars).selectAll('.' + CLASS.chartBar)
                    .data(targets)
                    .attr('class', classChartBar);
                contextBarEnter = contextBarUpdate.enter().append('g')
                    .style('opacity', 0)
                    .attr('class', classChartBar);
                // Bars for each data
                contextBarEnter.append('g')
                    .attr("class", classBars);

                //-- Line --//
                contextLineUpdate = context.select('.' + CLASS.chartLines).selectAll('.' + CLASS.chartLine)
                    .data(targets)
                    .attr('class', classChartLine);
                contextLineEnter = contextLineUpdate.enter().append('g')
                    .style('opacity', 0)
                    .attr('class', classChartLine);
                // Lines for each data
                contextLineEnter.append("g")
                    .attr("class", classLines);
                // Area
                contextLineEnter.append("g")
                    .attr("class", classAreas);
            }

            /*-- Show --*/

            // Fade-in each chart
            svg.selectAll('.' + CLASS.target).filter(function (d) { return isTargetToShow(d.id); })
                .transition().duration(__transition_duration)
                .style("opacity", 1);
        }

        function load(targets, args) {
            // filter loading targets if needed
            if (args.filter) {
                targets = targets.filter(args.filter);
            }
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

        function opacityForLegend(legendItem) {
            return legendItem.classed(CLASS.legendItemHidden) ? legendOpacityForHidden : 1;
        }
        function opacityForUnfocusedLegend(legendItem) {
            return legendItem.classed(CLASS.legendItemHidden) ? legendOpacityForHidden : 0.3;
        }
        function toggleFocusLegend(id, focus) {
            legend.selectAll('.' + CLASS.legendItem)
              .transition().duration(100)
                .style('opacity', function (_id) {
                    var This = d3.select(this);
                    if (id && _id !== id) {
                        return focus ? opacityForUnfocusedLegend(This) : opacityForLegend(This);
                    } else {
                        return focus ? opacityForLegend(This) : opacityForUnfocusedLegend(This);
                    }
                });
        }
        function revertLegend() {
            legend.selectAll('.' + CLASS.legendItem)
              .transition().duration(100)
                .style('opacity', function () { return opacityForLegend(d3.select(this)); });
        }
        function showLegend(targetIds) {
            if (!__legend_show) {
                __legend_show = true;
                legend.style('visibility', 'visible');
            }
            removeHiddenLegendIds(targetIds);
            legend.selectAll(selectorLegends(targetIds))
                .style('visibility', 'visible')
              .transition()
                .style('opacity', function () { return opacityForLegend(d3.select(this)); });
        }
        function hideLegend(targetIds) {
            if (__legend_show && isEmpty(targetIds)) {
                __legend_show = false;
                legend.style('visibility', 'hidden');
            }
            addHiddenLegendIds(targetIds);
            legend.selectAll(selectorLegends(targetIds))
                .style('opacity', 0)
                .style('visibility', 'hidden');
        }

        function updateLegend(targetIds, options, transitions) {
            var xForLegend, xForLegendText, xForLegendRect, yForLegend, yForLegendText, yForLegendRect;
            var paddingTop = 4, paddingRight = 36, maxWidth = 0, maxHeight = 0, posMin = 10;
            var l, totalLength = 0, offsets = {}, widths = {}, heights = {}, margins = [0], steps = {}, step = 0;
            var withTransition, withTransitionForTransform;
            var hasFocused = legend.selectAll('.' + CLASS.legendItemFocused).size();
            var texts, rects, tiles;

            options = options || {};
            withTransition = getOption(options, "withTransition", true);
            withTransitionForTransform = getOption(options, "withTransitionForTransform", true);

            function updatePositions(textElement, id, reset) {
                var box = getTextRect(textElement.textContent, CLASS.legendItem),
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
                xForLegend = function (id) { return maxWidth * steps[id]; };
                yForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
            } else {
                xForLegend = function (id) { return margins[steps[id]] + offsets[id]; };
                yForLegend = function (id) { return maxHeight * steps[id]; };
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
                    d3.select(this).classed(CLASS.legendItemFocused, true);
                    if (!transiting) {
                        c3.focus(id);
                    }
                    if (typeof __legend_item_onmouseover === 'function') {
                        __legend_item_onmouseover(id);
                    }
                })
                .on('mouseout', function (id) {
                    d3.select(this).classed(CLASS.legendItemFocused, false);
                    if (!transiting) {
                        c3.revert();
                    }
                    if (typeof __legend_item_onmouseout === 'function') {
                        __legend_item_onmouseout(id);
                    }
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
                .attr('y', isLegendRight ? -200 : yForLegendRect);
            l.append('rect')
                .attr("class", CLASS.legendItemTile)
                .style("pointer-events", "none")
                .style('fill', color)
                .attr('x', isLegendRight ? xForLegendText : -200)
                .attr('y', isLegendRight ? -200 : yForLegend)
                .attr('width', 10)
                .attr('height', 10);

            texts = legend.selectAll('text')
                .data(targetIds)
                .text(function (id) { return isDefined(__data_names[id]) ? __data_names[id] : id; }) // MEMO: needed for update
                .each(function (id, i) { updatePositions(this, id, i === 0); });
            (withTransition ? texts.transition() : texts)
                .attr('x', xForLegendText)
                .attr('y', yForLegendText);

            rects = legend.selectAll('rect.' + CLASS.legendItemEvent)
                .data(targetIds);
            (withTransition ? rects.transition() : rects)
                .attr('width', function (id) { return widths[id]; })
                .attr('height', function (id) { return heights[id]; })
                .attr('x', xForLegendRect)
                .attr('y', yForLegendRect);

            tiles = legend.selectAll('rect.' + CLASS.legendItemTile)
                .data(targetIds);
            (withTransition ? tiles.transition() : tiles)
                .style('fill', color)
                .attr('x', xForLegend)
                .attr('y', yForLegend);

            // toggle legend state
            legend.selectAll('.' + CLASS.legendItem)
                .classed(CLASS.legendItemHidden, function (id) { return !isTargetToShow(id); })
              .transition()
                .style('opacity', function (id) {
                    var This = d3.select(this);
                    if (isTargetToShow(id)) {
                        return !hasFocused || This.classed(CLASS.legendItemFocused) ? opacityForLegend(This) : opacityForUnfocusedLegend(This);
                    } else {
                        return legendOpacityForHidden;
                    }
                });

            // Update all to reflect change of legend
            updateLegendItemWidth(maxWidth);
            updateLegendItemHeight(maxHeight);
            updateLegendStep(step);
            // Update size and scale
            updateSizes();
            updateScales();
            updateSvgSize();
            // Update g positions
            transformAll(withTransitionForTransform, transitions);
        }

        /*-- Event Handling --*/

        function isNoneArc(d) {
            return hasTarget(c3.data.targets, d.id);
        }
        function isArc(d) {
            return 'data' in d && hasTarget(c3.data.targets, d.data.id);
        }
        function getGridFilterToRemove(params) {
            return params ? function (line) {
                var found = false;
                [].concat(params).forEach(function (param) {
                    if ((('value' in param && line.value === params.value) || ('class' in param && line.class === params.class))) {
                        found = true;
                    }
                });
                return found;
            } : function () { return true; };
        }
        function removeGridLines(params, forX) {
            var toRemove = getGridFilterToRemove(params),
                toShow = function (line) { return !toRemove(line); },
                classLines = forX ? CLASS.xgridLines : CLASS.ygridLines,
                classLine = forX ? CLASS.xgridLine : CLASS.ygridLine;
            main.select('.' + classLines).selectAll('.' + classLine).filter(toRemove)
              .transition().duration(__transition_duration)
                .style('opacity', 0).remove();
            if (forX) {
                __grid_x_lines = __grid_x_lines.filter(toShow);
            } else {
                __grid_y_lines = __grid_y_lines.filter(toShow);
            }
        }
        function transformTo(targetIds, type, optionsForRedraw) {
            var withTransitionForAxis = !hasArcType(c3.data.targets);
            transiting = false;
            setTargetType(targetIds, type);
            updateAndRedraw(optionsForRedraw || {withTransitionForAxis: withTransitionForAxis});
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
            toggleFocusLegend(targetId, true);
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
            toggleFocusLegend(targetId, false);
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

            redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});
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

            redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});
        };

        c3.toggle = function (targetId) {
            isTargetToShow(targetId) ? c3.hide(targetId) : c3.show(targetId);
        };

        c3.unzoom = function () {
            brush.clear().update();
            redraw({withUpdateXDomain: true});
        };
        c3.zoom = function () {
        };
        c3.zoom.enable = function (enabled) {
            __zoom_enabled = enabled;
            updateAndRedraw();
        };

        c3.load = function (args) {
            // update xs if specified
            if (args.xs) {
                addXs(args.xs);
            }
            // update classes if exists
            if ('classes' in args) {
                Object.keys(args.classes).forEach(function (id) {
                    __data_classes[id] = args.classes[id];
                });
            }
            // update categories if exists
            if ('categories' in args && isCategorized) {
                __axis_x_categories = args.categories;
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

        c3.unload = function (targetIds, done) {
            unload(mapToTargetIds(targetIds), function () {
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true, withLegend: true});
                if (typeof done === 'function') { done(); }
            });
        };

        c3.flow = function (args) {
            var targets = convertDataToTargets(convertColumnsToData(args.columns), true), notfoundIds = [],
                orgDataCount = getMaxDataCount(), dataCount, domain, baseTarget, baseValue, length = 0, tail = 0, diff, to;

            // Update/Add data
            c3.data.targets.forEach(function (t) {
                var found = false, i, j;
                for (i = 0; i < targets.length; i++) {
                    if (t.id === targets[i].id) {
                        found = true;

                        if (t.values[t.values.length - 1]) {
                            tail = t.values[t.values.length - 1].index + 1;
                        }
                        length = targets[i].values.length;

                        for (j = 0; j < length; j++) {
                            targets[i].values[j].index = tail + j;
                            if (!isTimeSeries) {
                                targets[i].values[j].x = tail + j;
                            }
                        }
                        t.values = t.values.concat(targets[i].values);

                        targets.splice(i, 1);
                        break;
                    }
                }
                if (!found) { notfoundIds.push(t.id); }
            });

            // Append null for not found targets
            c3.data.targets.forEach(function (t) {
                var i, j;
                for (i = 0; i < notfoundIds.length; i++) {
                    if (t.id === notfoundIds[i]) {
                        tail = t.values[t.values.length - 1].index + 1;
                        for (j = 0; j < length; j++) {
                            t.values.push({
                                id: t.id,
                                index: tail + j,
                                x: isTimeSeries ? getOtherTargetX(tail + j) : tail + j,
                                value: null
                            });
                        }
                    }
                }
            });

            // Generate null values for new target
            if (c3.data.targets.length) {
                targets.forEach(function (t) {
                    var i, missing = [];
                    for (i = c3.data.targets[0].values[0].index; i < tail; i++) {
                        missing.push({
                            id: t.id,
                            index: i,
                            x: isTimeSeries ? getOtherTargetX(i) : i,
                            value: null
                        });
                    }
                    t.values.forEach(function (v) {
                        v.index += tail;
                        if (!isTimeSeries) {
                            v.x += tail;
                        }
                    });
                    t.values = missing.concat(t.values);
                });
            }
            c3.data.targets = c3.data.targets.concat(targets); // add remained

            // check data count becuase behavior needs to change when it's only one
            dataCount = getMaxDataCount();
            baseTarget = c3.data.targets[0];
            baseValue = baseTarget.values[0];

            // Update length to flow if needed
            if (isDefined(args.to)) {
                length = 0;
                to = isTimeSeries ? parseDate(args.to) : args.to;
                baseTarget.values.forEach(function (v) {
                    if (v.x < to) { length++; }
                });
            } else if (isDefined(args.length)) {
                length = args.length;
            }

            // If only one data, update the domain to flow from left edge of the chart
            if (!orgDataCount) {
                if (isTimeSeries) {
                    if (baseTarget.values.length > 1) {
                        diff = baseTarget.values[baseTarget.values.length - 1].x - baseValue.x;
                    } else {
                        diff = baseValue.x - getXDomain(c3.data.targets)[0];
                    }
                } else {
                    diff = 1;
                }
                domain = [baseValue.x - diff, baseValue.x];
                updateXDomain(null, true, true, domain);
            } else if (orgDataCount === 1) {
                if (isTimeSeries) {
                    diff = (baseTarget.values[baseTarget.values.length - 1].x - baseValue.x) / 2;
                    domain = [new Date(+baseValue.x - diff), new Date(+baseValue.x + diff)];
                    updateXDomain(null, true, true, domain);
                }
            }

            // Set targets
            updateTargets(c3.data.targets);

            // Redraw with new targets
            redraw({
                flow: {
                    index: baseValue.index,
                    length: length,
                    duration: isValue(args.duration) ? args.duration : __transition_duration,
                    onend: args.onend,
                    orgDataCount: orgDataCount,
                },
                withLegend: true,
                withTransition: orgDataCount > 1,
            });
        };

        c3.selected = function (targetId) {
            return d3.merge(
                main.selectAll('.' + CLASS.shapes + getTargetSelectorSuffix(targetId)).selectAll('.' + CLASS.shape)
                    .filter(function () { return d3.select(this).classed(CLASS.SELECTED); })
                    .map(function (d) { return d.map(function (d) { var data = d.__data__; return data.data ? data.data : data; }); })
            );
        };

        c3.select = function (ids, indices, resetOther) {
            if (! __data_selection_enabled) { return; }
            main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape).each(function (d, i) {
                var shape = d3.select(this), id = d.data ? d.data.id : d.id, toggle = getToggle(this),
                    isTargetId = __data_selection_grouped || !ids || ids.indexOf(id) >= 0,
                    isTargetIndex = !indices || indices.indexOf(i) >= 0,
                    isSelected = shape.classed(CLASS.SELECTED);
                // line/area selection not supported yet
                if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {
                    return;
                }
                if (isTargetId && isTargetIndex) {
                    if (__data_selection_isselectable(d) && !isSelected) {
                        toggle(true, shape.classed(CLASS.SELECTED, true), d, i);
                    }
                } else if (isDefined(resetOther) && resetOther) {
                    if (isSelected) {
                        toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
                    }
                }
            });
        };

        c3.unselect = function (ids, indices) {
            if (! __data_selection_enabled) { return; }
            main.selectAll('.' + CLASS.shapes).selectAll('.' + CLASS.shape).each(function (d, i) {
                var shape = d3.select(this), id = d.data ? d.data.id : d.id, toggle = getToggle(this),
                    isTargetId = __data_selection_grouped || !ids || ids.indexOf(id) >= 0,
                    isTargetIndex = !indices || indices.indexOf(i) >= 0,
                    isSelected = shape.classed(CLASS.SELECTED);
                // line/area selection not supported yet
                if (shape.classed(CLASS.line) || shape.classed(CLASS.area)) {
                    return;
                }
                if (isTargetId && isTargetIndex) {
                    if (__data_selection_isselectable(d)) {
                        if (isSelected) {
                            toggle(false, shape.classed(CLASS.SELECTED, false), d, i);
                        }
                    }
                }
            });
        };

        c3.transform = function (type, targetIds) {
            var options = ['pie', 'donut'].indexOf(type) >= 0 ? {withTransform: true} : null;
            transformTo(targetIds, type, options);
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
            removeGridLines(params, true);
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
            removeGridLines(params, false);
        };

        c3.regions = function (regions) {
            if (!regions) { return __regions; }
            __regions = regions;
            redraw();
            return __regions;
        };
        c3.regions.add = function (regions) {
            if (!regions) { return __regions; }
            __regions = __regions.concat(regions);
            redraw();
            return __regions;
        };
        c3.regions.remove = function (options) {
            var duration, classes, regions;

            options = options || {};
            duration = getOption(options, "duration", __transition_duration);
            classes = getOption(options, "classes", [CLASS.region]);

            regions = main.select('.' + CLASS.regions).selectAll(classes.map(function (c) { return '.' + c; }));
            (duration ? regions.transition().duration(duration) : regions)
                .style('opacity', 0)
                .remove();

            __regions = __regions.filter(function (region) {
                var found = false;
                if (!region.class) {
                    return true;
                }
                region.class.split(' ').forEach(function (c) {
                    if (classes.indexOf(c) >= 0) { found = true; }
                });
                return !found;
            });

            return __regions;
        };

        c3.data.get = function (targetId) {
            var target = c3.data.getAsTarget(targetId);
            return isDefined(target) ? target.values.map(function (d) { return d.value; }) : undefined;
        };
        c3.data.getAsTarget = function (targetId) {
            var targets = c3.data.targets.filter(function (t) { return t.id === targetId; });
            return targets.length > 0 ? targets[0] : undefined;
        };
        c3.data.names = function (names) {
            if (!arguments.length) { return __data_names; }
            Object.keys(names).forEach(function (id) {
                __data_names[id] = names[id];
            });
            redraw({withLegend: true});
            return __data_names;
        };
        c3.data.colors = function (colors) {
            if (!arguments.length) { return __data_colors; }
            Object.keys(colors).forEach(function (id) {
                __data_colors[id] = colors[id];
            });
            redraw({withLegend: true});
            return __data_colors;
        };

        c3.color = color;

        c3.x = function (x) {
            if (arguments.length) {
                updateTargetX(c3.data.targets, x);
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});
            }
            return c3.data.xs;
        };
        c3.xs = function (xs) {
            if (arguments.length) {
                updateTargetXs(c3.data.targets, xs);
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});
            }
            return c3.data.xs;
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
                    if (isValue(max.x)) { __axis_x_max = max.x; }
                    if (isValue(max.y)) { __axis_y_max = max.y; }
                    if (isValue(max.y2)) { __axis_y2_max = max.y2; }
                } else {
                    __axis_y_max = __axis_y2_max = max;
                }
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});
            }
        };
        c3.axis.min = function (min) {
            if (arguments.length) {
                if (typeof min === 'object') {
                    if (isValue(min.x)) { __axis_x_min = min.x; }
                    if (isValue(min.y)) { __axis_y_min = min.y; }
                    if (isValue(min.y2)) { __axis_y2_min = min.y2; }
                } else {
                    __axis_y_min = __axis_y2_min = min;
                }
                redraw({withUpdateOrgXDomain: true, withUpdateXDomain: true});
            }
        };
        c3.axis.range = function (range) {
            if (arguments.length) {
                if (typeof range.max !== 'undefined') { c3.axis.max(range.max); }
                if (typeof range.min !== 'undefined') { c3.axis.min(range.min); }
            }
        };

        c3.legend.show = function (targetIds) {
            showLegend(mapToTargetIds(targetIds));
            updateAndRedraw({withLegend: true});
        };
        c3.legend.hide = function (targetIds) {
            hideLegend(mapToTargetIds(targetIds));
            updateAndRedraw({withLegend: true});
        };

        c3.resize = function (size) {
            __size_width = size ? size.width : null;
            __size_height = size ? size.height : null;
            c3.flush();
        };

        c3.flush = function () {
            updateAndRedraw({withLegend: true, withTransition: false, withTransitionForTransform: false});
        };

        c3.destroy = function () {
            c3.data.targets = undefined;
            c3.data.xs = {};
            selectChart.classed('c3', false).html("");
            window.onresize = null;
        };

        /*-- Load data and init chart with defined functions --*/

        function initWithUrl(args) {
            var type = args.mimeType ? args.mimeType : 'csv';
            d3.xhr(args.url, function (error, data) {
                var d;
                if (type === 'json') {
                    d = convertJsonToData(JSON.parse(data.response), args.keys);
                } else {
                    d = convertCsvToData(data.response);
                }
                init(d);
            });
        }

        if (config.data.url) {
            initWithUrl(config.data);
        }
        else if (config.data.json) {
            init(convertJsonToData(config.data.json, config.data.keys));
        }
        else if (config.data.rows) {
            init(convertRowsToData(config.data.rows));
        }
        else if (config.data.columns) {
            init(convertColumnsToData(config.data.columns));
        }
        else {
            throw Error('url or json or rows or columns is required.');
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

    if (typeof define === "function" && define.amd) {
        define("c3", ["d3"], c3);
    } else if ('undefined' !== typeof exports && 'undefined' !== typeof module) {
        module.exports = c3;
    } else {
        window.c3 = c3;
    }

    // Features:
    // 1. category axis
    // 2. ceil values of translate/x/y to int for half pixel antialiasing
    function c3_axis(d3, isCategory) {
        var scale = d3.scale.linear(), orient = "bottom", innerTickSize = 6, outerTickSize = 6, tickPadding = 3, tickValues = null, tickFormat, tickArguments;

        var tickOffset = 0, tickCulling = true, tickCentered;

        function axisX(selection, x) {
            selection.attr("transform", function (d) {
                return "translate(" + Math.ceil(x(d) + tickOffset) + ", 0)";
            });
        }
        function axisY(selection, y) {
            selection.attr("transform", function (d) {
                return "translate(0," + Math.ceil(y(d)) + ")";
            });
        }
        function scaleExtent(domain) {
            var start = domain[0], stop = domain[domain.length - 1];
            return start < stop ? [ start, stop ] : [ stop, start ];
        }
        function generateTicks(scale) {
            var i, domain, ticks = [];
            if (scale.ticks) {
                return scale.ticks.apply(scale, tickArguments);
            }
            domain = scale.domain();
            for (i = Math.ceil(domain[0]); i < domain[1]; i++) {
                ticks.push(i);
            }
            if (ticks.length > 0 && ticks[0] > 0) {
                ticks.unshift(ticks[0] - (ticks[1] - ticks[0]));
            }
            return ticks;
        }
        function copyScale() {
            var newScale = scale.copy(), domain;
            if (isCategory) {
                domain = scale.domain();
                newScale.domain([domain[0], domain[1] - 1]);
            }
            return newScale;
        }
        function textFormatted(v) {
            return tickFormat ? tickFormat(v) : v;
        }
        function axis(g) {
            g.each(function () {
                var g = d3.select(this);
                var scale0 = this.__chart__ || scale, scale1 = this.__chart__ = copyScale();

                var ticks = tickValues ? tickValues : generateTicks(scale1),
                    tick = g.selectAll(".tick").data(ticks, scale1),
                    tickEnter = tick.enter().insert("g", ".domain").attr("class", "tick").style("opacity", 1e-6),
                    tickExit = d3.transition(tick.exit()).style("opacity", 1e-6).remove(),
                    tickUpdate = d3.transition(tick).style("opacity", 1),
                    tickTransform, tickX;

                var range = scale.rangeExtent ? scale.rangeExtent() : scaleExtent(scale.range()),
                    path = g.selectAll(".domain").data([ 0 ]),
                    pathUpdate = (path.enter().append("path").attr("class", "domain"), d3.transition(path));
                tickEnter.append("line");
                tickEnter.append("text");

                var lineEnter = tickEnter.select("line"),
                    lineUpdate = tickUpdate.select("line"),
                    text = tick.select("text").text(textFormatted),
                    textEnter = tickEnter.select("text"),
                    textUpdate = tickUpdate.select("text");

                if (isCategory) {
                    tickOffset = Math.ceil((scale1(1) - scale1(0)) / 2);
                    tickX = tickCentered ? 0 : tickOffset;
                } else {
                    tickOffset = tickX = 0;
                }

                function tickSize(d) {
                    var tickPosition = scale(d) + tickOffset;
                    return range[0] < tickPosition && tickPosition < range[1] ? innerTickSize : 0;
                }

                switch (orient) {
                case "bottom":
                    {
                        tickTransform = axisX;
                        lineEnter.attr("y2", innerTickSize);
                        textEnter.attr("y", Math.max(innerTickSize, 0) + tickPadding);
                        lineUpdate.attr("x1", tickX).attr("x2", tickX).attr("y2", tickSize);
                        textUpdate.attr("x", 0).attr("y", Math.max(innerTickSize, 0) + tickPadding);
                        text.attr("dy", ".71em").style("text-anchor", "middle");
                        pathUpdate.attr("d", "M" + range[0] + "," + outerTickSize + "V0H" + range[1] + "V" + outerTickSize);
                        break;
                    }
                case "top":
                    {
                        tickTransform = axisX;
                        lineEnter.attr("y2", -innerTickSize);
                        textEnter.attr("y", -(Math.max(innerTickSize, 0) + tickPadding));
                        lineUpdate.attr("x2", 0).attr("y2", -innerTickSize);
                        textUpdate.attr("x", 0).attr("y", -(Math.max(innerTickSize, 0) + tickPadding));
                        text.attr("dy", "0em").style("text-anchor", "middle");
                        pathUpdate.attr("d", "M" + range[0] + "," + -outerTickSize + "V0H" + range[1] + "V" + -outerTickSize);
                        break;
                    }
                case "left":
                    {
                        tickTransform = axisY;
                        lineEnter.attr("x2", -innerTickSize);
                        textEnter.attr("x", -(Math.max(innerTickSize, 0) + tickPadding));
                        lineUpdate.attr("x2", -innerTickSize).attr("y2", 0);
                        textUpdate.attr("x", -(Math.max(innerTickSize, 0) + tickPadding)).attr("y", tickOffset);
                        text.attr("dy", ".32em").style("text-anchor", "end");
                        pathUpdate.attr("d", "M" + -outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + -outerTickSize);
                        break;
                    }
                case "right":
                    {
                        tickTransform = axisY;
                        lineEnter.attr("x2", innerTickSize);
                        textEnter.attr("x", Math.max(innerTickSize, 0) + tickPadding);
                        lineUpdate.attr("x2", innerTickSize).attr("y2", 0);
                        textUpdate.attr("x", Math.max(innerTickSize, 0) + tickPadding).attr("y", 0);
                        text.attr("dy", ".32em").style("text-anchor", "start");
                        pathUpdate.attr("d", "M" + outerTickSize + "," + range[0] + "H0V" + range[1] + "H" + outerTickSize);
                        break;
                    }
                }
                if (scale1.rangeBand) {
                    var x = scale1, dx = x.rangeBand() / 2;
                    scale0 = scale1 = function (d) {
                        return x(d) + dx;
                    };
                } else if (scale0.rangeBand) {
                    scale0 = scale1;
                } else {
                    tickExit.call(tickTransform, scale1);
                }
                tickEnter.call(tickTransform, scale0);
                tickUpdate.call(tickTransform, scale1);
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
        axis.tickFormat = function (format) {
            if (!arguments.length) { return tickFormat; }
            tickFormat = format;
            return axis;
        };
        axis.tickCentered = function (isCentered) {
            if (!arguments.length) { return tickCentered; }
            tickCentered = isCentered;
            return axis;
        };
        axis.tickOffset = function () { // This will be overwritten when normal x axis
            return tickOffset;
        };
        axis.ticks = function () {
            if (!arguments.length) { return tickArguments; }
            tickArguments = arguments;
            return axis;
        };
        axis.tickCulling = function (culling) {
            if (!arguments.length) { return tickCulling; }
            tickCulling = culling;
            return axis;
        };
        axis.tickValues = function (x) {
            if (!arguments.length) { return tickValues; }
            tickValues = x;
            return axis;
        };
        return axis;
    }

})(window);
