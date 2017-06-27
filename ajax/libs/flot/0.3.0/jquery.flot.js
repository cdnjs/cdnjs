/* Javascript plotting library for jQuery, v. 0.3.
 *
 * Released under the MIT license by iola, December 2007.
 *
 */

(function($) {
    function Plot(target_, data_, options_) {
        // data is on the form:
        //   [ series1 series2 ... ]
        // where series is either just the data as [ [x1, y1], [x2, y2], ... ]
        // or { data: [ [x1, y1], [x2, y2], ... ], label: "some label" }
        
        var series = [];
        var options = {
            // the color theme used for graphs
            colors: ["#edc240", "#afd8f8", "#cb4b4b", "#4da74d", "#9440ed"],
            legend: {
                show: true,
                noColumns: 1, // number of colums in legend table
                labelFormatter: null, // fn: string -> string
                labelBoxBorderColor: "#ccc", // border color for the little label boxes
                container: null, // container (as jQuery object) to put legend in, null means default on top of graph
                position: "ne", // position of default legend container within plot
                margin: 5, // distance from grid edge to default legend container within plot
                backgroundColor: null, // null means auto-detect
                backgroundOpacity: 0.85 // set to 0 to avoid background
            },
            xaxis: {
                ticks: null, // either [1, 3] or [[1, "a"], 3]
                noTicks: 5, // approximate number of ticks for auto-ticks
                tickFormatter: defaultTickFormatter, // fn: number -> string
                tickDecimals: null, // no. of decimals, null means auto
                min: null, // min. value to show, null means set automatically
                max: null, // max. value to show, null means set automatically
                autoscaleMargin: 0 // margin in % to add if auto-setting min/max
            },
            yaxis: {
                noTicks: 5,
                ticks: null,
                tickFormatter: defaultTickFormatter,
                min: null,
                max: null,
                autoscaleMargin: 0.02
            },
            points: {
                show: false,
                radius: 3,
                lineWidth: 2, // in pixels
                fill: true,
                fillColor: "#ffffff"
            },
            lines: {
                show: false,
                lineWidth: 2, // in pixels
                fill: false,
                fillColor: null
            },
            bars: {
                show: false,
                lineWidth: 2, // in pixels
                barWidth: 1, // in units of the x axis
                fill: true,
                fillColor: null
            },
            grid: {
                color: "#545454", // primary color used for outline and labels
                backgroundColor: null, // null for transparent, else color
                tickColor: "#dddddd", // color used for the ticks
                labelMargin: 3, // in pixels
                clickable: null
            },
            selection: {
                mode: null, // one of null, "x", "y" or "xy"
                color: "#e8cfac"
            },
            shadowSize: 4
        };
        var canvas = null, overlay = null;
        var ctx = null, octx = null;
        var target = target_;
        var xaxis = {};
        var yaxis = {};
        
        var plotOffset = { left: 0, right: 0, top: 0, bottom: 0};
        var labelMaxWidth = 0;
        var labelMaxHeight = 0;
        var canvasWidth = 0;
        var canvasHeight = 0;
        var plotWidth = 0;
        var plotHeight = 0;
        var hozScale = 0;
        var vertScale = 0;
        

        // initialize
        series = parseData(data_);
        parseOptions(options_);
        fillInSeriesOptions();

        constructCanvas();
        bindEvents();
        findDataRanges();
        calculateRange(xaxis, options.xaxis);
        extendXRangeIfNeededByBar();
        calculateRange(yaxis, options.yaxis);
        calculateTicks(xaxis, options.xaxis);
        calculateTicks(yaxis, options.yaxis);
        calculateSpacing();
        draw();
        insertLegend();

        this.getCanvas = function() { return canvas; };
        this.getPlotOffset = function() { return plotOffset; };
        this.clearSelection = clearSelection;
        this.setSelection = setSelection;
        
        function parseData(d) {
            var res = [];
            for (var i = 0; i < d.length; ++i) {
                var s;
                if (d[i].data) {
                    s = {};
                    for (var v in d[i])
                        s[v] = d[i][v];
                }
                else {
                    s = { data: d[i] };
                }
                res.push(s);
            }

            return res;
        }
        
        function parseOptions(o) {
            $.extend(true, options, o);
        }

        function constructCanvas() {
            canvasWidth = target.width();
            canvasHeight = target.height();
            target.html(""); // clear target
            target.css("position", "relative"); // for positioning labels and overlay

            if (canvasWidth <= 0 || canvasHeight <= 0)
                throw "Invalid dimensions for plot, width = " + canvasWidth + ", height = " + canvasHeight;

            // the canvas
            canvas = jQuery('<canvas width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>').appendTo(target).get(0);
	    if (jQuery.browser.msie) // excanvas hack
		canvas = window.G_vmlCanvasManager.initElement(canvas);
            ctx = canvas.getContext("2d");

            // overlay canvas for interactive features
            overlay = jQuery('<canvas style="position:absolute;left:0px;top:0px;" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>').appendTo(target).get(0);
	    if (jQuery.browser.msie) // excanvas hack
		overlay = window.G_vmlCanvasManager.initElement(overlay);
            octx = overlay.getContext("2d");
        }

        function bindEvents() {
            if (options.selection.mode != null) {
                $(overlay).mousedown(onMouseDown);
                // FIXME: temp. work-around until jQuery bug 1871 is fixed
                target.get(0).onmousemove = onMouseMove;
            }

            if (options.grid.clickable)
                $(overlay).click(onClick);
        }

        function findDataRanges() {
            yaxis.datamin = xaxis.datamin = 0;
            xaxis.datamax = yaxis.datamax = 1;

            if (series.length == 0)
                return;

            // get datamin, datamax start values
            var i, found = false;
            for (i = 0; i < series.length; ++i) {
                if (series[i].data.length > 0) {
                    xaxis.datamin = xaxis.datamax = series[i].data[0][0];
                    yaxis.datamin = yaxis.datamax = series[i].data[0][1];
                    found = true;
                    break;
                }
            }

            if (!found)
                return;

            // then find real datamin, datamax
            for (i = 0; i < series.length; ++i) {
                var data = series[i].data;
                for (var j = 0; j < data.length; ++j) {
                    var x = data[j][0];
                    var y = data[j][1];
                    if (x < xaxis.datamin)
                        xaxis.datamin = x;
                    else if (x > xaxis.datamax)
                        xaxis.datamax = x;
                    if (y < yaxis.datamin)
                        yaxis.datamin = y;
                    else if (y > yaxis.datamax)
                        yaxis.datamax = y;
                }
            }
        }

        function getTickSize(noTicks, min, max, decimals) {
            var delta = (max - min) / noTicks;
            var magn = getMagnitude(delta);
            var norm = delta / magn; // norm is between 1.0 and 10.0

            var tickSize = 1;
            if (norm < 1.5)
                tickSize = 1;
            else if (norm < 2.25)
                tickSize = 2;
            else if (norm < 3)
                tickSize = 2.5;
            else if (norm < 7.5)
                tickSize = 5;
            else
                tickSize = 10;

            if (tickSize == 2.5 && decimals == 0)
                tickSize = 2;
            
            tickSize *= magn;
            return tickSize;
        }
        
        function calculateRange(axis, axisOptions) {
            var min = axisOptions.min != null ? axisOptions.min : axis.datamin;
            var max = axisOptions.max != null ? axisOptions.max : axis.datamax;

            // check degenerate case
            if (max - min == 0.0) {
                var widen;
                if (max == 0.0)
                    widen = 1.0;
                else
                    widen = 0.01;

                min -= widen;
                max += widen;
            }
            
            axis.tickSize = getTickSize(axisOptions.noTicks, min, max, axisOptions.tickDecimals);
                
            // consider autoscaling
            var margin;
            if (axisOptions.min == null) {
                // first add in a little margin
                margin = axisOptions.autoscaleMargin;
                if (margin != 0) {
                    min -= axis.tickSize * margin;
                    // make sure we don't go below zero if all
                    // values are positive
                    if (min < 0 && axis.datamin >= 0)
                        min = 0;
                    
                    min = axis.tickSize * Math.floor(min / axis.tickSize);
                }
            }
            if (axisOptions.max == null) {
                margin = axisOptions.autoscaleMargin;
                if (margin != 0) {
                    max += axis.tickSize * margin;
                    if (max > 0 && axis.datamax <= 0)
                        max = 0;
                    
                    max = axis.tickSize * Math.ceil(max / axis.tickSize);
                }
            }
            
            axis.min = min;
            axis.max = max;
        }

        function extendXRangeIfNeededByBar() {
            if (options.xaxis.max == null) {
                // great, we're autoscaling, check if we might need a bump

                var newmax = xaxis.max;
                for (var i = 0; i < series.length; ++i)
                    if (series[i].bars.show && series[i].bars.barWidth + xaxis.datamax > newmax)
                        newmax = xaxis.max + series[i].bars.barWidth;
                xaxis.max = newmax;
            }
        }

        function defaultTickFormatter(val) {
            return "" + val;
        }

        function calculateTicks(axis, axisOptions) {
            var i;
            axis.ticks = [];

            if (axisOptions.ticks) {
                var ticks = axisOptions.ticks;

                if ($.isFunction(ticks))
                    // generate the ticks
                    ticks = ticks({ min: axis.min, max: axis.max });
                
                // clean up the user-supplied ticks, copy them over
                for (i = 0; i < ticks.length; ++i) {
                    var v, label;
                    var t = ticks[i];
                    if (typeof(t) == "object") {
                        v = t[0];
                        if (t.length > 1)
                            label = t[1];
                        else
                            label = axisOptions.tickFormatter(v);
                    }
                    else {
                        v = t;
                        label = axisOptions.tickFormatter(v);
                    }
                    axis.ticks[i] = { v: v, label: label };
                }
            }
            else {
                // round to nearest multiple of tick size
                var start = axis.tickSize * Math.ceil(axis.min / axis.tickSize);
                // then spew out all possible ticks
                for (i = 0; start + i * axis.tickSize <= axis.max; ++i) {
                    v = start + i * axis.tickSize;
                    
                    // round (this is always needed to fix numerical instability)
                    var decimals = axisOptions.tickDecimals;
                    if (decimals == null)
                        decimals = 1 - Math.floor(Math.log(axis.tickSize) / Math.LN10);
                    if (decimals < 0)
                        decimals = 0;
                    
                    v = v.toFixed(decimals);
                    axis.ticks.push({ v: v, label: axisOptions.tickFormatter(v) });
                }
            }
        }
        
        function calculateSpacing() {
            // calculate spacing for labels, using the heuristic
            // that the longest string is probably the one that takes
            // up the most space
            var i, max_label = "";
            for (i = 0; i < yaxis.ticks.length; ++i) {
                var l = yaxis.ticks[i].label.length;
                if (l > max_label.length)
                    max_label = yaxis.ticks[i].label;
            }

            // measure it
            var dummyDiv = $('<div style="position:absolute;top:-10000px;font-size:smaller" class="gridLabel">' + max_label + '</div>').appendTo(target);
            labelMaxWidth = dummyDiv.width();
            labelMaxHeight = dummyDiv.height();
            dummyDiv.remove();

            var maxOutset = 2; // grid outline line width
            if (options.points.show)
                maxOutset = Math.max(maxOutset, options.points.radius + options.points.lineWidth/2);
            for (i = 0; i < series.length; ++i) {
                if (series[i].points.show)
                    maxOutset = Math.max(maxOutset, series[i].points.radius + series[i].points.lineWidth/2);
            }

            plotOffset.left = plotOffset.right = plotOffset.top = plotOffset.bottom = maxOutset;
            
            plotOffset.left += labelMaxWidth + options.grid.labelMargin;
            plotOffset.bottom += labelMaxHeight + options.grid.labelMargin;
            
            plotWidth = canvasWidth - plotOffset.left - plotOffset.right;
            plotHeight = canvasHeight - plotOffset.bottom - plotOffset.top;
            hozScale = plotWidth / (xaxis.max - xaxis.min);
            vertScale = plotHeight / (yaxis.max - yaxis.min);
        }
        
        function draw() {
            drawGrid();
            drawLabels();
            for (var i = 0; i < series.length; i++) {
                drawSeries(series[i]);
            }
        }

        function tHoz(x) {
            return (x - xaxis.min) * hozScale;
        }

        function tVert(y) {
            return plotHeight - (y - yaxis.min) * vertScale;
        }

        function drawGrid() {
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            // draw background, if any
            if (options.grid.backgroundColor != null) {
                ctx.fillStyle = options.grid.backgroundColor;
                ctx.fillRect(0, 0, plotWidth, plotHeight);
            }
            
            // draw the inner grid
            ctx.lineWidth = 1;
            ctx.strokeStyle = options.grid.tickColor;
            ctx.beginPath();
            var i, v;
            for (i = 0; i < xaxis.ticks.length; ++i) {
                v = xaxis.ticks[i].v;
                if (v == xaxis.min || v == xaxis.max)
                    continue;   // skip those lying on the axes

                ctx.moveTo(Math.floor(tHoz(v)) + ctx.lineWidth/2, 0);
                ctx.lineTo(Math.floor(tHoz(v)) + ctx.lineWidth/2, plotHeight);
            }

            for (i = 0; i < yaxis.ticks.length; ++i) {
                v = yaxis.ticks[i].v;
                if (v == yaxis.min || v == yaxis.max)
                    continue;

                ctx.moveTo(0, Math.floor(tVert(v)) + ctx.lineWidth/2);
                ctx.lineTo(plotWidth, Math.floor(tVert(v)) + ctx.lineWidth/2);
            }
            ctx.stroke();
            
            // draw outline
            ctx.lineWidth = 2;
            ctx.strokeStyle = options.grid.color;
            ctx.lineJoin = "round";
            ctx.strokeRect(0, 0, plotWidth, plotHeight);
            ctx.restore();
        }
        
        function drawLabels() {
            var i;
            var tick;
            var html = '<div style="font-size:smaller;color:' + options.grid.color + '">';
            // calculate width for labels; to avoid measuring the
            // widths of the labels, we construct fixed-size boxes and
            // put the labels inside them, the fixed-size boxes are
            // easy to mid-align
            var noLabels = 0;
            for (i = 0; i < xaxis.ticks.length; ++i) {
                if (xaxis.ticks[i].label) {
                    ++noLabels;
                }
            }
            var xBoxWidth = plotWidth / noLabels;
            
            // do the x-axis
            for (i = 0; i < xaxis.ticks.length; ++i) {
                tick = xaxis.ticks[i];
                if (!tick.label)
                    continue;
                html += '<div style="position:absolute;top:' + (plotOffset.top + plotHeight + options.grid.labelMargin) + 'px;left:' + (plotOffset.left + tHoz(tick.v) - xBoxWidth/2) + 'px;width:' + xBoxWidth + 'px;text-align:center" class="gridLabel">' + tick.label + "</div>";
            }
            
            // do the y-axis
            for (i = 0; i < yaxis.ticks.length; ++i) {
                tick = yaxis.ticks[i];
                if (!tick.label || tick.label.length == 0)
                    continue;
                html += '<div style="position:absolute;top:' + (plotOffset.top + tVert(tick.v) - labelMaxHeight/2) + 'px;left:0;width:' + labelMaxWidth + 'px;text-align:right" class="gridLabel">' + tick.label + "</div>";
            }

            html += '</div>';
            
            target.append(html);
        }

        function fillInSeriesOptions() {
            var i;
            
            // collect what we already got of colors
            var neededColors = series.length;
            var usedColors = [];
            var assignedColors = [];
            for (i = 0; i < series.length; ++i) {
                var sc = series[i].color;
                if (sc != null) {
                    --neededColors;
                    if (typeof(sc) == "number")
                        assignedColors.push(sc);
                    else
                        usedColors.push(parseColor(series[i].color));
                }
            }
            
            // we might need to generate more colors if higher indices
            // are assigned
            for (i = 0; i < assignedColors.length; ++i) {
                neededColors = Math.max(neededColors, assignedColors[i] + 1);
            }

            // produce colors as needed
            var colors = [];
            var variation = 0;
            i = 0;
            while (colors.length < neededColors) {
                var c;
                if (options.colors.length == i) // check degenerate case
                    c = new Color(100, 100, 100);
                else
                    c = parseColor(options.colors[i]);

                // vary color if needed
                var sign = variation % 2 == 1 ? -1 : 1;
                var factor = 1 + sign * Math.ceil(variation / 2) * 0.2;
                c.scale(factor, factor, factor);

                // FIXME: if we're getting to close to something else,
                // we should probably skip this one
                colors.push(c);
                
                ++i;
                if (i >= options.colors.length) {
                    i = 0;
                    ++variation;
                }
            }

            // fill in the options
            var colori = 0;
            for (i = 0; i < series.length; ++i) {
                var s = series[i];

                // assign colors
                if (s.color == null) {
                    s.color = colors[colori].toString();
                    ++colori;
                }
                else if (typeof(s.color) == "number")
                    s.color = colors[s.color].toString();

                // copy the rest
                s.lines = $.extend(true, {}, options.lines, s.lines);
                s.points = $.extend(true, {}, options.points, s.points);
                s.bars = $.extend(true, {}, options.bars, s.bars);
                if (s.shadowSize == null)
                    s.shadowSize = options.shadowSize;
            }
        }
        
        function drawSeries(series) {
            if (series.lines.show || (!series.bars.show && !series.points.show))
                drawSeriesLines(series);
            if (series.bars.show)
                drawSeriesBars(series);
            if (series.points.show)
                drawSeriesPoints(series);
        }
        
        function drawSeriesLines(series) {
            function plotLine(data, offset) {
                if (data.length < 2)
                    return;

                var prevx = tHoz(data[0][0]),
                    prevy = tVert(data[0][1]) + offset;

                ctx.beginPath();
                ctx.moveTo(prevx, prevy);
                for (var i = 0; i < data.length - 1; ++i) {
                    var x1 = data[i][0], y1 = data[i][1],
                        x2 = data[i+1][0], y2 = data[i+1][1];

                    // clip with ymin
                    if (y1 <= y2 && y1 < yaxis.min) {
                        if (y2 < yaxis.min)
                            continue;   // line segment is outside
                        // compute new intersection point
                        x1 = (yaxis.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = yaxis.min;
                    }
                    else if (y2 <= y1 && y2 < yaxis.min) {
                        if (y1 < yaxis.min)
                            continue;
                        x2 = (yaxis.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = yaxis.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > yaxis.max) {
                        if (y2 > yaxis.max)
                            continue;
                        x1 = (yaxis.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = yaxis.max;
                    }
                    else if (y2 >= y1 && y2 > yaxis.max) {
                        if (y1 > yaxis.max)
                            continue;
                        x2 = (yaxis.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = yaxis.max;
                    }

                    // clip with xmin
                    if (x1 <= x2 && x1 < xaxis.min) {
                        if (x2 < xaxis.min)
                            continue;
                        y1 = (xaxis.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = xaxis.min;
                    }
                    else if (x2 <= x1 && x2 < xaxis.min) {
                        if (x1 < xaxis.min)
                            continue;
                        y2 = (xaxis.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = xaxis.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > xaxis.max) {
                        if (x2 > xaxis.max)
                            continue;
                        y1 = (xaxis.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = xaxis.max;
                    }
                    else if (x2 >= x1 && x2 > xaxis.max) {
                        if (x1 > xaxis.max)
                            continue;
                        y2 = (xaxis.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = xaxis.max;
                    }

                    if (prevx != tHoz(x1) || prevy != tVert(y1) + offset)
                        ctx.moveTo(tHoz(x1), tVert(y1) + offset);
                    
                    prevx = tHoz(x2);
                    prevy = tVert(y2) + offset;
                    ctx.lineTo(prevx, prevy);
                }
                ctx.stroke();
            }

            function plotLineArea(data) {
                if (data.length < 2)
                    return;

                var bottom = Math.min(Math.max(0, yaxis.min), yaxis.max);
                var top, lastX = 0;

                var first = true;
                
                ctx.beginPath();
                for (var i = 0; i < data.length - 1; ++i) {
                    var x1 = data[i][0], y1 = data[i][1],
                        x2 = data[i+1][0], y2 = data[i+1][1];

                    // clip x values
                    
                    // clip with xmin
                    if (x1 <= x2 && x1 < xaxis.min) {
                        if (x2 < xaxis.min)
                            continue;
                        y1 = (xaxis.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = xaxis.min;
                    }
                    else if (x2 <= x1 && x2 < xaxis.min) {
                        if (x1 < xaxis.min)
                            continue;
                        y2 = (xaxis.min - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = xaxis.min;
                    }

                    // clip with xmax
                    if (x1 >= x2 && x1 > xaxis.max) {
                        if (x2 > xaxis.max)
                            continue;
                        y1 = (xaxis.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x1 = xaxis.max;
                    }
                    else if (x2 >= x1 && x2 > xaxis.max) {
                        if (x1 > xaxis.max)
                            continue;
                        y2 = (xaxis.max - x1) / (x2 - x1) * (y2 - y1) + y1;
                        x2 = xaxis.max;
                    }

                    if (first) {
                        ctx.moveTo(tHoz(x1), tVert(bottom));
                        first = false;
                    }
                    
                    // now first check the case where both is outside
                    if (y1 >= yaxis.max && y2 >= yaxis.max) {
                        ctx.lineTo(tHoz(x1), tVert(yaxis.max));
                        ctx.lineTo(tHoz(x2), tVert(yaxis.max));
                        continue;
                    }
                    else if (y1 <= yaxis.min && y2 <= yaxis.min) {
                        ctx.lineTo(tHoz(x1), tVert(yaxis.min));
                        ctx.lineTo(tHoz(x2), tVert(yaxis.min));
                        continue;
                    }
                    
                    // else it's a bit more complicated, there might
                    // be two rectangles and two triangles we need to fill
                    // in; to find these keep track of the current x values
                    var x1old = x1, x2old = x2;

                    // and clip the y values, without shortcutting
                    
                    // clip with ymin
                    if (y1 <= y2 && y1 < yaxis.min && y2 >= yaxis.min) {
                        x1 = (yaxis.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = yaxis.min;
                    }
                    else if (y2 <= y1 && y2 < yaxis.min && y1 >= yaxis.min) {
                        x2 = (yaxis.min - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = yaxis.min;
                    }

                    // clip with ymax
                    if (y1 >= y2 && y1 > yaxis.max && y2 <= yaxis.max) {
                        x1 = (yaxis.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y1 = yaxis.max;
                    }
                    else if (y2 >= y1 && y2 > yaxis.max && y1 <= yaxis.max) {
                        x2 = (yaxis.max - y1) / (y2 - y1) * (x2 - x1) + x1;
                        y2 = yaxis.max;
                    }


                    // if the x value was changed we got a rectangle
                    // to fill
                    if (x1 != x1old) {
                        if (y1 <= yaxis.min)
                            top = yaxis.min;
                        else
                            top = yaxis.max;
                        
                        ctx.lineTo(tHoz(x1old), tVert(top));
                        ctx.lineTo(tHoz(x1), tVert(top));
                    }
                    
                    // fill the triangles
                    ctx.lineTo(tHoz(x1), tVert(y1));
                    ctx.lineTo(tHoz(x2), tVert(y2));

                    // fill the other rectangle if it's there
                    if (x2 != x2old) {
                        if (y2 <= yaxis.min)
                            top = yaxis.min;
                        else
                            top = yaxis.max;
                        
                        ctx.lineTo(tHoz(x2old), tVert(top));
                        ctx.lineTo(tHoz(x2), tVert(top));
                    }

                    lastX = Math.max(x2, x2old);
                }
                /*
                ctx.beginPath();
                ctx.moveTo(tHoz(data[0][0]), tVert(0));
                for (var i = 0; i < data.length; i++) {
                    ctx.lineTo(tHoz(data[i][0]), tVert(data[i][1]));
                }
                ctx.lineTo(tHoz(data[data.length - 1][0]), tVert(0));*/
                ctx.lineTo(tHoz(lastX), tVert(bottom));
                ctx.fill();
            }
            
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";

            var lw = series.lines.lineWidth;
            var sw = series.shadowSize;
            // FIXME: consider another form of shadow when filling is turned on
            if (sw > 0) {
                // draw shadow in two steps
                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotLine(series.data, lw/2 + sw/2 + ctx.lineWidth/2);

                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotLine(series.data, lw/2 + ctx.lineWidth/2);
            }

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            if (series.lines.fill) {
                ctx.fillStyle = series.lines.fillColor != null ? series.lines.fillColor : parseColor(series.color).scale(null, null, null, 0.4).toString();
                plotLineArea(series.data, 0);
            }

            plotLine(series.data, 0);
            ctx.restore();
        }

        function drawSeriesPoints(series) {
            function plotPoints(data, radius, fill) {
                for (var i = 0; i < data.length; ++i) {
                    var x = data[i][0], y = data[i][1];
                    if (x < xaxis.min || x > xaxis.max || y < yaxis.min || y > yaxis.max)
                        continue;
                    
                    ctx.beginPath();
                    ctx.arc(tHoz(x), tVert(y), radius, 0, 2 * Math.PI, true);
                    if (fill)
                        ctx.fill();
                    ctx.stroke();
                }
            }

            function plotPointShadows(data, offset, radius) {
                for (var i = 0; i < data.length; ++i) {
                    var x = data[i][0], y = data[i][1];
                    if (x < xaxis.min || x > xaxis.max || y < yaxis.min || y > yaxis.max)
                        continue;
                    ctx.beginPath();
                    ctx.arc(tHoz(x), tVert(y) + offset, radius, 0, Math.PI, false);
                    ctx.stroke();
                }
            }
            
            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);

            var lw = series.lines.lineWidth;
            var sw = series.shadowSize;
            if (sw > 0) {
                // draw shadow in two steps
                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotPointShadows(series.data, sw/2 + ctx.lineWidth/2, series.points.radius);

                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotPointShadows(series.data, ctx.lineWidth/2, series.points.radius);
            }

            ctx.lineWidth = series.points.lineWidth;
            ctx.strokeStyle = series.color;
            ctx.fillStyle = series.points.fillColor != null ? series.points.fillColor : series.color;
            plotPoints(series.data, series.points.radius, series.points.fill);
            ctx.restore();
        }

        function drawSeriesBars(series) {
            function plotBars(data, barWidth, offset, fill) {
                if (data.length < 2)
                    return;

                for (var i = 0; i < data.length; i++) {
                    var x = data[i][0], y = data[i][1];
                    var drawLeft = true, drawTop = true, drawRight = true;
                    var left = x, right = x + barWidth, bottom = 0, top = y;

                    if (right < xaxis.min || left > xaxis.max || top < yaxis.min || bottom > yaxis.max)
                        continue;

                    // clip
                    if (left < xaxis.min) {
                        left = xaxis.min;
                        drawLeft = false;
                    }

                    if (right > xaxis.max) {
                        right = xaxis.max;
                        drawRight = false;
                    }

                    if (bottom < yaxis.min)
                        bottom = yaxis.min;

                    if (top > yaxis.max) {
                        top = yaxis.max;
                        drawTop = false;
                    }

                    // fill the bar
                    if (fill) {
                        ctx.beginPath();
                        ctx.moveTo(tHoz(left), tVert(bottom) + offset);
                        ctx.lineTo(tHoz(left), tVert(top) + offset);
                        ctx.lineTo(tHoz(right), tVert(top) + offset);
                        ctx.lineTo(tHoz(right), tVert(bottom) + offset);
                        ctx.fill();
                    }

                    // draw outline
                    if (drawLeft || drawRight || drawTop) {
                        ctx.beginPath();
                        ctx.moveTo(tHoz(left), tVert(bottom) + offset);
                        if (drawLeft)
                            ctx.lineTo(tHoz(left), tVert(top) + offset);
                        else
                            ctx.moveTo(tHoz(left), tVert(top) + offset);

                        if (drawTop)
                            ctx.lineTo(tHoz(right), tVert(top) + offset);
                        else
                            ctx.moveTo(tHoz(right), tVert(top) + offset);
                        if (drawRight)
                            ctx.lineTo(tHoz(right), tVert(bottom) + offset);
                        else
                            ctx.moveTo(tHoz(right), tVert(bottom) + offset);
                        ctx.stroke();
                    }
                }
            }

            ctx.save();
            ctx.translate(plotOffset.left, plotOffset.top);
            ctx.lineJoin = "round";

            var bw = series.bars.barWidth;
            var lw = Math.min(series.bars.lineWidth, bw);
            // FIXME: figure out a way to add shadows
            /*
            var sw = series.shadowSize;
            if (sw > 0) {
                // draw shadow in two steps
                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.1)";
                plotBars(series.data, bw, lw/2 + sw/2 + ctx.lineWidth/2, false);

                ctx.lineWidth = sw / 2;
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                plotBars(series.data, bw, lw/2 + ctx.lineWidth/2, false);
            }*/

            ctx.lineWidth = lw;
            ctx.strokeStyle = series.color;
            if (series.bars.fill) {
                ctx.fillStyle = series.bars.fillColor != null ? series.bars.fillColor : parseColor(series.color).scale(null, null, null, 0.4).toString();
            }

            plotBars(series.data, bw, 0, series.bars.fill);
            ctx.restore();
        }

        function insertLegend() {
            if (!options.legend.show)
                return;
            
            var fragments = [];
            var rowStarted = false;
            for (i = 0; i < series.length; ++i) {
                if (!series[i].label)
                    continue;
                
                if (i % options.legend.noColumns == 0) {
                    if (rowStarted)
                        fragments.push('</tr>');
                    fragments.push('<tr>');
                    rowStarted = true;
                }

                var label = series[i].label;
                if (options.legend.labelFormatter != null)
                    label = options.legend.labelFormatter(label);
                
                fragments.push(
                    '<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:14px;height:10px;background-color:' + series[i].color + '"></div></div></td>' +
                    '<td class="legendLabel">' + label + '</td>');
            }
            if (rowStarted)
                fragments.push('</tr>');
            
            if (fragments.length > 0) {
                var table = '<table style="font-size:smaller;color:' + options.grid.color + '">' + fragments.join("") + '</table>';
                if (options.legend.container != null)
                    options.legend.container.append(table);
                else {
                    var pos = "";
                    var p = options.legend.position, m = options.legend.margin;
                    if (p.charAt(0) == "n")
                        pos += 'top:' + (m + plotOffset.top) + 'px;';
                    else if (p.charAt(0) == "s")
                        pos += 'bottom:' + (m + plotOffset.bottom) + 'px;';
                    if (p.charAt(1) == "e")
                        pos += 'right:' + (m + plotOffset.right) + 'px;';
                    else if (p.charAt(1) == "w")
                        pos += 'left:' + (m + plotOffset.bottom) + 'px;';
                    var div = $('<div class="legend" style="position:absolute;z-index:2;' + pos +'">' + table + '</div>').appendTo(target);
                    if (options.legend.backgroundOpacity != 0.0) {
                        // put in the transparent background
                        // separately to avoid blended labels and
                        // label boxes
                        var c = options.legend.backgroundColor;
                        if (c == null) {
                            var tmp;
                            if (options.grid.backgroundColor != null)
                                tmp = options.grid.backgroundColor;
                            else
                                tmp = extractColor(div);
                            c = parseColor(tmp).adjust(null, null, null, 1).toString();
                        }
                        $('<div style="position:absolute;width:' + div.width() + 'px;height:' + div.height() + 'px;' + pos +'background-color:' + c + ';"> </div>').appendTo(target).css('opacity', options.legend.backgroundOpacity);
                        
                    }
                }
            }
        }

        var lastMousePos = { pageX: null, pageY: null };
        var selection = { first: { x: -1, y: -1}, second: { x: -1, y: -1} };
        var prevSelection = null;
        var selectionInterval = null;
        var ignoreClick = false;
        
        function onMouseMove(ev) {
            // FIXME: temp. work-around until jQuery bug 1871 is fixed
            var e = ev || window.event;
            if (e.pageX == null && e.clientX != null) {
                var de = document.documentElement, b = document.body;
                lastMousePos.pageX = e.clientX + (de && de.scrollLeft || b.scrollLeft || 0);
                lastMousePos.pageY = e.clientY + (de && de.scrollTop || b.scrollTop || 0);
            }
            else {
                lastMousePos.pageX = e.pageX;
                lastMousePos.pageY = e.pageY;
            }
        }
        
        function onMouseDown(e) {
            if (e.which != 1)  // only accept left-click
                return;
            
            setSelectionPos(selection.first, e);
                
            if (selectionInterval != null)
                clearInterval(selectionInterval);
            lastMousePos.pageX = null;
            selectionInterval = setInterval(updateSelectionOnMouseMove, 200);
            $(document).one("mouseup", onSelectionMouseUp);
        }

        function onClick(e) {
            if (ignoreClick) {
                ignoreClick = false;
                return;
            }
            
            var offset = $(overlay).offset();
            var pos = {};
            pos.x = e.pageX - offset.left - plotOffset.left;
            pos.x = xaxis.min + pos.x / hozScale;
            pos.y = e.pageY - offset.top - plotOffset.top;
            pos.y = yaxis.max - pos.y / vertScale;

            target.trigger("plotclick", [ pos ]);
        }
        
        function triggerSelectedEvent() {
            var x1, x2, y1, y2;
            if (selection.first.x <= selection.second.x) {
                x1 = selection.first.x;
                x2 = selection.second.x;
            }
            else {
                x1 = selection.second.x;
                x2 = selection.first.x;
            }

            if (selection.first.y >= selection.second.y) {
                y1 = selection.first.y;
                y2 = selection.second.y;
            }
            else {
                y1 = selection.second.y;
                y2 = selection.first.y;
            }
            
            x1 = xaxis.min + x1 / hozScale;
            x2 = xaxis.min + x2 / hozScale;

            y1 = yaxis.max - y1 / vertScale;
            y2 = yaxis.max - y2 / vertScale;

            target.trigger("selected", [ { x1: x1, y1: y1, x2: x2, y2: y2 } ]);
        }
        
        function onSelectionMouseUp(e) {
            if (selectionInterval != null) {
                clearInterval(selectionInterval);
                selectionInterval = null;
            }

            setSelectionPos(selection.second, e);
            clearSelection();
            if (!selectionIsSane() || e.which != 1)
                return false;
            
            drawSelection();
            triggerSelectedEvent();
            ignoreClick = true;

            return false;
        }

        function setSelectionPos(pos, e) {
            var offset = $(overlay).offset();
            if (options.selection.mode == "y") {
                if (pos == selection.first)
                    pos.x = 0;
                else
                    pos.x = plotWidth;
            }
            else {
                pos.x = e.pageX - offset.left - plotOffset.left;
                pos.x = Math.min(Math.max(0, pos.x), plotWidth);
            }

            if (options.selection.mode == "x") {
                if (pos == selection.first)
                    pos.y = 0;
                else
                    pos.y = plotHeight;
            }
            else {
	        pos.y = e.pageY - offset.top - plotOffset.top;
                pos.y = Math.min(Math.max(0, pos.y), plotHeight);
            }
        }
        
        function updateSelectionOnMouseMove() {
            if (lastMousePos.pageX == null)
                return;
            
            setSelectionPos(selection.second, lastMousePos);
            clearSelection();
            if (selectionIsSane())
                drawSelection();
        }

        function clearSelection() {
            if (prevSelection == null)
                return;

            var x = Math.min(prevSelection.first.x, prevSelection.second.x),
                y = Math.min(prevSelection.first.y, prevSelection.second.y),
                w = Math.abs(prevSelection.second.x - prevSelection.first.x),
                h = Math.abs(prevSelection.second.y - prevSelection.first.y);
            
            octx.clearRect(x + plotOffset.left - octx.lineWidth,
                           y + plotOffset.top - octx.lineWidth,
                           w + octx.lineWidth*2,
                           h + octx.lineWidth*2);
            
            prevSelection = null;
        }
        
        function setSelection(area) {
            clearSelection();
            
            if (options.selection.mode == "x") {
                selection.first.y = 0;
                selection.second.y = plotHeight;
            }
            else {
                selection.first.y = (yaxis.max - area.y1) * vertScale;
                selection.second.y = (yaxis.max - area.y2) * vertScale;
            }
            if (options.selection.mode == "y") {
                selection.first.x = 0;
                selection.second.x = plotWidth;
            }
            else {
                selection.first.x = (area.x1 - xaxis.min) * hozScale;
                selection.second.x = (area.x2 - xaxis.min) * hozScale;
            }

            drawSelection();
            triggerSelectedEvent();
        }
        
        function drawSelection() {
            if (prevSelection != null &&
                selection.first.x == prevSelection.first.x &&
                selection.first.y == prevSelection.first.y && 
                selection.second.x == prevSelection.second.x &&
                selection.second.y == prevSelection.second.y)
                return;
            
            octx.strokeStyle = parseColor(options.selection.color).scale(null, null, null, 0.8).toString();
            octx.lineWidth = 1;
            ctx.lineJoin = "round";
            octx.fillStyle = parseColor(options.selection.color).scale(null, null, null, 0.4).toString();

            prevSelection = { first:  { x: selection.first.x,
                                        y: selection.first.y },
                              second: { x: selection.second.x,
                                        y: selection.second.y } };

            var x = Math.min(selection.first.x, selection.second.x),
                y = Math.min(selection.first.y, selection.second.y),
                w = Math.abs(selection.second.x - selection.first.x),
                h = Math.abs(selection.second.y - selection.first.y);
            
            octx.fillRect(x + plotOffset.left, y + plotOffset.top, w, h);
            octx.strokeRect(x + plotOffset.left, y + plotOffset.top, w, h);
        }

        function selectionIsSane() {
            var minSize = 5;
            return Math.abs(selection.second.x - selection.first.x) >= minSize &&
                Math.abs(selection.second.y - selection.first.y) >= minSize;
        }
    }
    
    $.plot = function(target, data, options) {
        var plot = new Plot(target, data, options);
        /*var t0 = new Date();     
        var t1 = new Date();
	var tstr = "time used (msecs): " + (t1.getTime() - t0.getTime())
	if (window.console)
            console.log(tstr);
	else
	    alert(tstr);*/
        return plot;
    };

    function getMagnitude(x) {
        return Math.pow(10, Math.floor(Math.log(x) / Math.LN10));
    }

       
    // color helpers, inspiration from the jquery color animation
    // plugin by John Resig
    function Color (r, g, b, a) {
       
        var rgba = ['r','g','b','a'];
        var x = 4; //rgba.length
       
        while (-1<--x) {
            this[rgba[x]] = arguments[x] || ((x==3) ? 1.0 : 0);
        }
       
        this.toString = function() {
            if (this.a >= 1.0) {
                return "rgb("+[this.r,this.g,this.b].join(",")+")";
            } else {
                return "rgba("+[this.r,this.g,this.b,this.a].join(",")+")";
            }
        };

        this.scale = function(rf, gf, bf, af) {
            x = 4; //rgba.length
            while (-1<--x) {
                if (arguments[x] != null)
                    this[rgba[x]] *= arguments[x];
            }
            return this.normalize();
        };

        this.adjust = function(rd, gd, bd, ad) {
            x = 4; //rgba.length
            while (-1<--x) {
                if (arguments[x] != null)
                    this[rgba[x]] += arguments[x];
            }
            return this.normalize();
        };

        this.clone = function() {
            return new Color(this.r, this.b, this.g, this.a);
        };

        var limit = function(val,minVal,maxVal) {
            return Math.max(Math.min(val, maxVal), minVal);
        };

        this.normalize = function() {
            this.r = limit(parseInt(this.r), 0, 255);
            this.g = limit(parseInt(this.g), 0, 255);
            this.b = limit(parseInt(this.b), 0, 255);
            this.a = limit(this.a, 0, 1);
            return this;
        };

        this.normalize();
    }
    
    var lookupColors = {
	aqua:[0,255,255],
	azure:[240,255,255],
	beige:[245,245,220],
	black:[0,0,0],
	blue:[0,0,255],
	brown:[165,42,42],
	cyan:[0,255,255],
	darkblue:[0,0,139],
	darkcyan:[0,139,139],
	darkgrey:[169,169,169],
	darkgreen:[0,100,0],
	darkkhaki:[189,183,107],
	darkmagenta:[139,0,139],
	darkolivegreen:[85,107,47],
	darkorange:[255,140,0],
	darkorchid:[153,50,204],
	darkred:[139,0,0],
	darksalmon:[233,150,122],
	darkviolet:[148,0,211],
	fuchsia:[255,0,255],
	gold:[255,215,0],
	green:[0,128,0],
	indigo:[75,0,130],
	khaki:[240,230,140],
	lightblue:[173,216,230],
	lightcyan:[224,255,255],
	lightgreen:[144,238,144],
	lightgrey:[211,211,211],
	lightpink:[255,182,193],
	lightyellow:[255,255,224],
	lime:[0,255,0],
	magenta:[255,0,255],
	maroon:[128,0,0],
	navy:[0,0,128],
	olive:[128,128,0],
	orange:[255,165,0],
	pink:[255,192,203],
	purple:[128,0,128],
	violet:[128,0,128],
	red:[255,0,0],
	silver:[192,192,192],
	white:[255,255,255],
	yellow:[255,255,0]
    };    

    function extractColor(element) {
        var color, elem = element;
	do {
	    color = elem.css("background-color").toLowerCase();
            // keep going until we find an element that has color, or
            // we hit the body
	    if (color != '' && color != 'transparent')
		break;
            elem = elem.parent();
	} while (!$.nodeName(elem.get(0), "body"));

        // catch Safari's way of signalling transparent
        if (color == "rgba(0, 0, 0, 0)") 
            return "transparent";
        
        return color;
    }
    
    // parse string, returns Color
    function parseColor(str) {
        // Some named colors to work with
        // From Interface by Stefan Petre
        // http://interface.eyecon.ro/

	var result;

	// Look for rgb(num,num,num)
	if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))
	    return new Color(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]));

	// Look for rgba(num,num,num,num)
	if (result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
	    return new Color(parseInt(result[1]), parseInt(result[2]), parseInt(result[3]), parseFloat(result[4]));
        
	// Look for rgb(num%,num%,num%)
	if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))
	    return new Color(parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55);

	// Look for rgba(num%,num%,num%,num)
	if (result = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
	    return new Color(parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55, parseFloat(result[4]));
        
	// Look for #a0b1c2
	if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))
	    return new Color(parseInt(result[1],16), parseInt(result[2],16), parseInt(result[3],16));

	// Look for #fff
	if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))
	    return new Color(parseInt(result[1]+result[1],16), parseInt(result[2]+result[2],16), parseInt(result[3]+result[3],16));

	// Otherwise, we're most likely dealing with a named color
        var name = jQuery.trim(str).toLowerCase();
        if (name == "transparent")
            return new Color(255, 255, 255, 0);
        else {
            result = lookupColors[name];
	    return new Color(result[0], result[1], result[2]);
        }
    }
	
})(jQuery);
