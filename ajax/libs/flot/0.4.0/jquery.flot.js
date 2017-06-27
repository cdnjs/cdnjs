/* Javascript plotting library for jQuery, v. 0.4.
 *
 * Released under the MIT license by iola, December 2007.
 *
 */

(function($) {
    function Plot(target_, data_, options_) {
        // data is on the form:
        //   [ series1, series2 ... ]
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
                mode: null, // null or "time"
                min: null, // min. value to show, null means set automatically
                max: null, // max. value to show, null means set automatically
                autoscaleMargin: null, // margin in % to add if auto-setting min/max
                ticks: null, // either [1, 3] or [[1, "a"], 3] or (fn: axis info -> ticks) or app. number of ticks for auto-ticks
                tickFormatter: null, // fn: number -> string
                
                // mode specific options
                tickDecimals: null, // no. of decimals, null means auto
                tickSize: null, // number or [number, "unit"]
                minTickSize: null, // number or [number, "unit"]
                monthNames: null, // list of names of months
                timeformat: null // format string to use
            },
            yaxis: {
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
                borderWidth: 2,
                clickable: null,
                coloredAreas: null, // array of { x1, y1, x2, y2 } or fn: plot area -> areas
                coloredAreasColor: "#f4f4f4"
            },
            selection: {
                mode: null, // one of null, "x", "y" or "xy"
                color: "#e8cfac"
            },
            shadowSize: 4
        };
        var canvas = null, overlay = null, eventHolder = null, 
            ctx = null, octx = null,
            target = target_,
            xaxis = {}, yaxis = {},
            plotOffset = { left: 0, right: 0, top: 0, bottom: 0},
            yLabelMaxWidth = 0, yLabelMaxHeight = 0, xLabelBoxWidth = 0,
            canvasWidth = 0, canvasHeight = 0,
            plotWidth = 0, plotHeight = 0,
            hozScale = 0, vertScale = 0,
            // dedicated to storing data for buggy standard compliance cases
            workarounds = {};
        
        this.setData = setData;
        this.setupGrid = setupGrid;
        this.draw = draw;
        this.clearSelection = clearSelection;
        this.setSelection = setSelection;
        this.getCanvas = function() { return canvas; };
        this.getPlotOffset = function() { return plotOffset; };
        this.getData = function() { return series; };
        this.getAxes = function() { return { xaxis: xaxis, yaxis: yaxis }; };
        
        // initialize
        parseOptions(options_);
        setData(data_);
        constructCanvas();
        setupGrid();
        draw();


        function setData(d) {
            series = parseData(d);

            fillInSeriesOptions();
            processData();
        }
        
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

            // backwards compatibility, to be removed in future
            if (options.xaxis.noTicks && options.xaxis.ticks == null)
                options.xaxis.ticks = options.xaxis.noTicks;
            if (options.yaxis.noTicks && options.yaxis.ticks == null)
                options.yaxis.ticks = options.yaxis.noTicks;
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
                    if (typeof sc == "number")
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
            var colori = 0, s;
            for (i = 0; i < series.length; ++i) {
                s = series[i];

                // assign colors
                if (s.color == null) {
                    s.color = colors[colori].toString();
                    ++colori;
                }
                else if (typeof s.color == "number")
                    s.color = colors[s.color].toString();

                // copy the rest
                s.lines = $.extend(true, {}, options.lines, s.lines);
                s.points = $.extend(true, {}, options.points, s.points);
                s.bars = $.extend(true, {}, options.bars, s.bars);
                if (s.shadowSize == null)
                    s.shadowSize = options.shadowSize;
            }
        }
        
        function processData() {
            xaxis.datamin = yaxis.datamin = Number.MAX_VALUE;
            xaxis.datamax = yaxis.datamax = Number.MIN_VALUE;

            for (var i = 0; i < series.length; ++i) {
                var data = series[i].data;
                for (var j = 0; j < data.length; ++j) {
                    if (data[j] == null)
                        continue;
                    
                    var x = data[j][0], y = data[j][1];

                    // convert to number
                    if (x == null || y == null || isNaN(x = +x) || isNaN(y = +y)) {
                        data[j] = null; // mark this point as invalid
                        continue;
                    }

                    if (x < xaxis.datamin)
                        xaxis.datamin = x;
                    if (x > xaxis.datamax)
                        xaxis.datamax = x;
                    if (y < yaxis.datamin)
                        yaxis.datamin = y;
                    if (y > yaxis.datamax)
                        yaxis.datamax = y;
                }
            }
            
            if (xaxis.datamin == Number.MAX_VALUE)
                xaxis.datamin = 0;
            if (yaxis.datamin == Number.MAX_VALUE)
                yaxis.datamin = 0;
            if (xaxis.datamax == Number.MIN_VALUE)
                xaxis.datamax = 1;
            if (yaxis.datamax == Number.MIN_VALUE)
                yaxis.datamax = 1;
        }

        function constructCanvas() {
            canvasWidth = target.width();
            canvasHeight = target.height();
            target.html(""); // clear target
            target.css("position", "relative"); // for positioning labels and overlay

            if (canvasWidth <= 0 || canvasHeight <= 0)
                throw "Invalid dimensions for plot, width = " + canvasWidth + ", height = " + canvasHeight;

            // the canvas
            canvas = $('<canvas width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>').appendTo(target).get(0);
            if ($.browser.msie) // excanvas hack
                canvas = window.G_vmlCanvasManager.initElement(canvas);
            ctx = canvas.getContext("2d");

            // overlay canvas for interactive features
            overlay = $('<canvas style="position:absolute;left:0px;top:0px;" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>').appendTo(target).get(0);
            if ($.browser.msie) // excanvas hack
                overlay = window.G_vmlCanvasManager.initElement(overlay);
            octx = overlay.getContext("2d");

            // we include the canvas in the event holder too, because IE 7
            // sometimes has trouble with the stacking order
            eventHolder = $([overlay, canvas]);

            
            // bind events
            if (options.selection.mode != null) {
                eventHolder.mousedown(onMouseDown);
                
                // FIXME: temp. work-around until jQuery bug 1871 is fixed
                eventHolder.each(function () {
                    this.onmousemove = onMouseMove;
                });
            }

            if (options.grid.clickable)
                eventHolder.click(onClick);
        }

        function setupGrid() {
            // x axis
            setRange(xaxis, options.xaxis);
            prepareTickGeneration(xaxis, options.xaxis);
            setTicks(xaxis, options.xaxis);
            extendXRangeIfNeededByBar();

            // y axis
            setRange(yaxis, options.yaxis);
            prepareTickGeneration(yaxis, options.yaxis);
            setTicks(yaxis, options.yaxis);

            setSpacing();
            insertLabels();
            insertLegend();
        }
        
        function setRange(axis, axisOptions) {
            var min = axisOptions.min != null ? axisOptions.min : axis.datamin;
            var max = axisOptions.max != null ? axisOptions.max : axis.datamax;

            if (max - min == 0.0) {
                // degenerate case
                var widen;
                if (max == 0.0)
                    widen = 1.0;
                else
                    widen = 0.01;

                min -= widen;
                max += widen;
            }
            else {
                // consider autoscaling
                var margin = axisOptions.autoscaleMargin;
                if (margin != null) {
                    if (axisOptions.min == null) {
                        min -= (max - min) * margin;
                        // make sure we don't go below zero if all values
                        // are positive
                        if (min < 0 && axis.datamin >= 0)
                            min = 0;
                    }
                    if (axisOptions.max == null) {
                        max += (max - min) * margin;
                        if (max > 0 && axis.datamax <= 0)
                            max = 0;
                    }
                }
            }
            axis.min = min;
            axis.max = max;
        }

        function prepareTickGeneration(axis, axisOptions) {
            // estimate number of ticks
            var noTicks;
            if (typeof axisOptions.ticks == "number" && axisOptions.ticks > 0)
                noTicks = axisOptions.ticks;
            else if (axis == xaxis)
                noTicks = canvasWidth / 100;
            else
                noTicks = canvasHeight / 60;
            
            var delta = (axis.max - axis.min) / noTicks;
            var size, generator, unit, formatter, i, magn, norm;

            if (axisOptions.mode == "time") {
                // pretty handling of time
                
                function formatDate(d, fmt, monthNames) {
                    var leftPad = function(n) {
                        n = "" + n;
                        return n.length == 1 ? "0" + n : n;
                    };
                    
                    var r = [];
                    var escape = false;
                    if (monthNames == null)
                        monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    for (var i = 0; i < fmt.length; ++i) {
                        var c = fmt.charAt(i);
                        
                        if (escape) {
                            switch (c) {
                            case 'h': c = "" + d.getHours(); break;
                            case 'H': c = leftPad(d.getHours()); break;
                            case 'M': c = leftPad(d.getMinutes()); break;
                            case 'S': c = leftPad(d.getSeconds()); break;
                            case 'd': c = "" + d.getDate(); break;
                            case 'm': c = "" + (d.getMonth() + 1); break;
                            case 'y': c = "" + d.getFullYear(); break;
                            case 'b': c = "" + monthNames[d.getMonth()]; break;
                            }
                            r.push(c);
                            escape = false;
                        }
                        else {
                            if (c == "%")
                                escape = true;
                            else
                                r.push(c);
                        }
                    }
                    return r.join("");
                }
                
                    
                // map of app. size of time units in milliseconds
                var timeUnitSize = {
                    "second": 1000,
                    "minute": 60 * 1000,
                    "hour": 60 * 60 * 1000,
                    "day": 24 * 60 * 60 * 1000,
                    "month": 30 * 24 * 60 * 60 * 1000,
                    "year": 365.2425 * 24 * 60 * 60 * 1000
                };


                // the allowed tick sizes, after 1 year we use
                // an integer algorithm
                var spec = [
                    [1, "second"], [2, "second"], [5, "second"], [10, "second"],
                    [30, "second"], 
                    [1, "minute"], [2, "minute"], [5, "minute"], [10, "minute"],
                    [30, "minute"], 
                    [1, "hour"], [2, "hour"], [4, "hour"],
                    [8, "hour"], [12, "hour"],
                    [1, "day"], [2, "day"], [3, "day"],
                    [0.25, "month"], [0.5, "month"], [1, "month"],
                    [2, "month"], [3, "month"], [6, "month"],
                    [1, "year"]
                ];

                var minSize = 0;
                if (axisOptions.minTickSize != null) {
                    if (typeof axisOptions.tickSize == "number")
                        minSize = axisOptions.tickSize;
                    else
                        minSize = axisOptions.minTickSize[0] * timeUnitSize[axisOptions.minTickSize[1]];
                }

                for (i = 0; i < spec.length - 1; ++i)
                    if (delta < (spec[i][0] * timeUnitSize[spec[i][1]]
                                 + spec[i + 1][0] * timeUnitSize[spec[i + 1][1]]) / 2
                       && spec[i][0] * timeUnitSize[spec[i][1]] >= minSize)
                        break;
                size = spec[i][0];
                unit = spec[i][1];
                
                // special-case the possibility of several years
                if (unit == "year") {
                    magn = Math.pow(10, Math.floor(Math.log(delta / timeUnitSize.year) / Math.LN10));
                    norm = (delta / timeUnitSize.year) / magn;
                    if (norm < 1.5)
                        size = 1;
                    else if (norm < 3)
                        size = 2;
                    else if (norm < 7.5)
                        size = 5;
                    else
                        size = 10;

                    size *= magn;
                }

                if (axisOptions.tickSize) {
                    size = axisOptions.tickSize[0];
                    unit = axisOptions.tickSize[1];
                }
                
                generator = function(axis) {
                    var ticks = [],
                        tickSize = axis.tickSize[0], unit = axis.tickSize[1],
                        d = new Date(axis.min);
                    
                    var step = tickSize * timeUnitSize[unit];

                    if (unit == "second")
                        d.setSeconds(floorInBase(d.getSeconds(), tickSize));
                    if (unit == "minute")
                        d.setMinutes(floorInBase(d.getMinutes(), tickSize));
                    if (unit == "hour")
                        d.setHours(floorInBase(d.getHours(), tickSize));
                    if (unit == "month")
                        d.setMonth(floorInBase(d.getMonth(), tickSize));
                    if (unit == "year")
                        d.setFullYear(floorInBase(d.getFullYear(), tickSize));
                    
                    // reset smaller components
                    d.setMilliseconds(0);
                    if (step >= timeUnitSize.minute)
                        d.setSeconds(0);
                    if (step >= timeUnitSize.hour)
                        d.setMinutes(0);
                    if (step >= timeUnitSize.day)
                        d.setHours(0);
                    if (step >= timeUnitSize.day * 4)
                        d.setDate(1);
                    if (step >= timeUnitSize.year)
                        d.setMonth(0);


                    var carry = 0, v;
                    do {
                        v = d.getTime();
                        ticks.push({ v: v, label: axis.tickFormatter(v, axis) });
                        if (unit == "month") {
                            if (tickSize < 1) {
                                // a bit complicated - we'll divide the month
                                // up but we need to take care of fractions
                                // so we don't end up in the middle of a day
                                d.setDate(1);
                                var start = d.getTime();
                                d.setMonth(d.getMonth() + 1);
                                var end = d.getTime();
                                d.setTime(v + carry * timeUnitSize.hour + (end - start) * tickSize);
                                carry = d.getHours();
                                d.setHours(0);
                            }
                            else
                                d.setMonth(d.getMonth() + tickSize);
                        }
                        else if (unit == "year") {
                            d.setFullYear(d.getFullYear() + tickSize);
                        }
                        else
                            d.setTime(v + step);
                    } while (v < axis.max);

                    return ticks;
                };

                formatter = function (v, axis) {
                    var d = new Date(v);

                    // first check global format
                    if (axisOptions.timeformat != null)
                        return formatDate(d, axisOptions.timeformat, axisOptions.monthNames);
                    
                    var t = axis.tickSize[0] * timeUnitSize[axis.tickSize[1]];
                    var span = axis.max - axis.min;
                    
                    if (t < timeUnitSize.minute)
                        fmt = "%h:%M:%S";
                    else if (t < timeUnitSize.day) {
                        if (span < 2 * timeUnitSize.day)
                            fmt = "%h:%M";
                        else
                            fmt = "%b %d %h:%M";
                    }
                    else if (t < timeUnitSize.month)
                        fmt = "%b %d";
                    else if (t < timeUnitSize.year) {
                        if (span < timeUnitSize.year)
                            fmt = "%b";
                        else
                            fmt = "%b %y";
                    }
                    else
                        fmt = "%y";
                    
                    return formatDate(d, fmt, axisOptions.monthNames);
                };
            }
            else {
                // pretty rounding of base-10 numbers
                var maxDec = axisOptions.tickDecimals;
                var dec = -Math.floor(Math.log(delta) / Math.LN10);
                if (maxDec != null && dec > maxDec)
                    dec = maxDec;
                
                magn = Math.pow(10, -dec);
                norm = delta / magn; // norm is between 1.0 and 10.0
                
                if (norm < 1.5)
                    size = 1;
                else if (norm < 3) {
                    size = 2;
                    // special case for 2.5, requires an extra decimal
                    if (norm > 2.25 && (maxDec == null || dec + 1 <= maxDec)) {
                        size = 2.5;
                        ++dec;
                    }
                }
                else if (norm < 7.5)
                    size = 5;
                else
                    size = 10;

                size *= magn;
                
                if (axisOptions.minTickSize != null && size < axisOptions.minTickSize)
                    size = axisOptions.minTickSize;

                if (axisOptions.tickSize != null)
                    size = axisOptions.tickSize;
                
                axis.tickDecimals = Math.max(0, (maxDec != null) ? maxDec : dec);
                
                generator = function (axis) {
                    var ticks = [];
                    var start = floorInBase(axis.min, axis.tickSize);
                    // then spew out all possible ticks
                    var i = 0, v;
                    do {
                        v = start + i * axis.tickSize;
                        ticks.push({ v: v, label: axis.tickFormatter(v, axis) });
                        ++i;
                    } while (v < axis.max);
                    return ticks;
                };

                formatter = function (v, axis) {
                    return v.toFixed(axis.tickDecimals);
                };
            }

            axis.tickSize = unit ? [size, unit] : size;
            axis.tickGenerator = generator;
            if ($.isFunction(axisOptions.tickFormatter))
                axis.tickFormatter = function (v, axis) { return "" + axisOptions.tickFormatter(v, axis); };
            else
                axis.tickFormatter = formatter;
        }
        
        function extendXRangeIfNeededByBar() {
            if (options.xaxis.max == null) {
                // great, we're autoscaling, check if we might need a bump

                var newmax = xaxis.max;
                for (var i = 0; i < series.length; ++i)
                    if (series[i].bars.show && series[i].bars.barWidth + xaxis.datamax > newmax)
                        newmax = xaxis.datamax + series[i].bars.barWidth;
                xaxis.max = newmax;
            }
        }

        function setTicks(axis, axisOptions) {
            axis.ticks = [];
            
            if (axisOptions.ticks == null)
                axis.ticks = axis.tickGenerator(axis);
            else if (typeof axisOptions.ticks == "number") {
                if (axisOptions.ticks > 0)
                    axis.ticks = axis.tickGenerator(axis);
            }
            else if (axisOptions.ticks) {
                var ticks = axisOptions.ticks;

                if ($.isFunction(ticks))
                    // generate the ticks
                    ticks = ticks({ min: axis.min, max: axis.max });
                
                // clean up the user-supplied ticks, copy them over
                var i, v;
                for (i = 0; i < ticks.length; ++i) {
                    var label = null;
                    var t = ticks[i];
                    if (typeof t == "object") {
                        v = t[0];
                        if (t.length > 1)
                            label = t[1];
                    }
                    else
                        v = t;
                    if (label == null)
                        label = axis.tickFormatter(v, axis);
                    axis.ticks[i] = { v: v, label: label };
                }
            }

            if (axisOptions.autoscaleMargin != null && axis.ticks.length > 0) {
                // snap to ticks
                if (axisOptions.min == null)
                    axis.min = Math.min(axis.min, axis.ticks[0].v);
                if (axisOptions.max == null && axis.ticks.length > 1)
                    axis.max = Math.min(axis.max, axis.ticks[axis.ticks.length - 1].v);
            }
        }
        
        function setSpacing() {
            // calculate y label dimensions
            var i, labels = [], l;
            for (i = 0; i < yaxis.ticks.length; ++i) {
                l = yaxis.ticks[i].label;
                if (l)
                    labels.push('<div class="tickLabel">' + l + '</div>');
            }

            if (labels.length > 0) {
                var dummyDiv = $('<div style="position:absolute;top:-10000px;font-size:smaller">'
                                 + labels.join("") + '</div>').appendTo(target);
                yLabelMaxWidth = dummyDiv.width();
                yLabelMaxHeight = dummyDiv.find("div").height();
                dummyDiv.remove();
            }

            var maxOutset = options.grid.borderWidth;
            if (options.points.show)
                maxOutset = Math.max(maxOutset, options.points.radius + options.points.lineWidth/2);
            for (i = 0; i < series.length; ++i) {
                if (series[i].points.show)
                    maxOutset = Math.max(maxOutset, series[i].points.radius + series[i].points.lineWidth/2);
            }

            plotOffset.left = plotOffset.right = plotOffset.top = plotOffset.bottom = maxOutset;
            
            plotOffset.left += yLabelMaxWidth + options.grid.labelMargin;
            plotWidth = canvasWidth - plotOffset.left - plotOffset.right;

            // set width for labels; to avoid measuring the widths of
            // the labels, we construct fixed-size boxes and put the
            // labels inside them, the fixed-size boxes are easy to
            // mid-align
            xLabelBoxWidth = plotWidth / 6;
            
            // measure x label heights
            labels = [];
            for (i = 0; i < xaxis.ticks.length; ++i) {
                l = xaxis.ticks[i].label;
                if (l)
                    labels.push('<span class="tickLabel" width="' + xLabelBoxWidth + '">' + l + '</span>');
            }

            var xLabelMaxHeight = 0;
            if (labels.length > 0) {
                var dummyDiv = $('<div style="position:absolute;top:-10000px;font-size:smaller">'
                                 + labels.join("") + '</div>').appendTo(target);
                xLabelMaxHeight = dummyDiv.height();
                dummyDiv.remove();
            }

            plotOffset.bottom += xLabelMaxHeight + options.grid.labelMargin;
            plotHeight = canvasHeight - plotOffset.bottom - plotOffset.top;
            hozScale = plotWidth / (xaxis.max - xaxis.min);
            vertScale = plotHeight / (yaxis.max - yaxis.min);
        }
        
        function draw() {
            drawGrid();
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
            var i;
            
            ctx.save();
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            ctx.translate(plotOffset.left, plotOffset.top);

            // draw background, if any
            if (options.grid.backgroundColor != null) {
                ctx.fillStyle = options.grid.backgroundColor;
                ctx.fillRect(0, 0, plotWidth, plotHeight);
            }

            // draw colored areas
            if (options.grid.coloredAreas) {
                var areas = options.grid.coloredAreas;
                if ($.isFunction(areas))
                    areas = areas({ xmin: xaxis.min, xmax: xaxis.max, ymin: yaxis.min, ymax: yaxis.max });

                for (i = 0; i < areas.length; ++i) {
                    var a = areas[i];

                    // clip
                    if (a.x1 == null || a.x1 < xaxis.min)
                        a.x1 = xaxis.min;
                    if (a.x2 == null || a.x2 > xaxis.max)
                        a.x2 = xaxis.max;
                    if (a.y1 == null || a.y1 < yaxis.min)
                        a.y1 = yaxis.min;
                    if (a.y2 == null || a.y2 > yaxis.max)
                        a.y2 = yaxis.max;

                    var tmp;
                    if (a.x1 > a.x2) {
                        tmp = a.x1;
                        a.x1 = a.x2;
                        a.x2 = tmp;
                    }
                    if (a.y1 > a.y2) {
                        tmp = a.y1;
                        a.y1 = a.y2;
                        a.y2 = tmp;
                    }

                    if (a.x1 >= xaxis.max || a.x2 <= xaxis.min || a.x1 == a.x2
                        || a.y1 >= yaxis.max || a.y2 <= yaxis.min || a.y1 == a.y2)
                        continue;

                    ctx.fillStyle = a.color || options.grid.coloredAreasColor;
                    ctx.fillRect(Math.floor(tHoz(a.x1)), Math.floor(tVert(a.y2)),
                                 Math.floor(tHoz(a.x2) - tHoz(a.x1)), Math.floor(tVert(a.y1) - tVert(a.y2)));
                }
            }
            
            // draw the inner grid
            ctx.lineWidth = 1;
            ctx.strokeStyle = options.grid.tickColor;
            ctx.beginPath();
            var v;
            for (i = 0; i < xaxis.ticks.length; ++i) {
                v = xaxis.ticks[i].v;
                if (v <= xaxis.min || v >= xaxis.max)
                    continue;   // skip those lying on the axes

                ctx.moveTo(Math.floor(tHoz(v)) + ctx.lineWidth/2, 0);
                ctx.lineTo(Math.floor(tHoz(v)) + ctx.lineWidth/2, plotHeight);
            }

            for (i = 0; i < yaxis.ticks.length; ++i) {
                v = yaxis.ticks[i].v;
                if (v <= yaxis.min || v >= yaxis.max)
                    continue;

                ctx.moveTo(0, Math.floor(tVert(v)) + ctx.lineWidth/2);
                ctx.lineTo(plotWidth, Math.floor(tVert(v)) + ctx.lineWidth/2);
            }
            ctx.stroke();
            
            if (options.grid.borderWidth) {
                // draw border
                ctx.lineWidth = options.grid.borderWidth;
                ctx.strokeStyle = options.grid.color;
                ctx.lineJoin = "round";
                ctx.strokeRect(0, 0, plotWidth, plotHeight);
                ctx.restore();
            }
        }
        
        function insertLabels() {
            target.find(".tickLabels").remove();
            
            var i, tick;
            var html = '<div class="tickLabels" style="font-size:smaller;color:' + options.grid.color + '">';
            
            // do the x-axis
            for (i = 0; i < xaxis.ticks.length; ++i) {
                tick = xaxis.ticks[i];
                if (!tick.label || tick.v < xaxis.min || tick.v > xaxis.max)
                    continue;
                html += '<div style="position:absolute;top:' + (plotOffset.top + plotHeight + options.grid.labelMargin) + 'px;left:' + (plotOffset.left + tHoz(tick.v) - xLabelBoxWidth/2) + 'px;width:' + xLabelBoxWidth + 'px;text-align:center" class="tickLabel">' + tick.label + "</div>";
            }
            
            // do the y-axis
            for (i = 0; i < yaxis.ticks.length; ++i) {
                tick = yaxis.ticks[i];
                if (!tick.label || tick.v < yaxis.min || tick.v > yaxis.max)
                    continue;
                html += '<div style="position:absolute;top:' + (plotOffset.top + tVert(tick.v) - yLabelMaxHeight/2) + 'px;left:0;width:' + yLabelMaxWidth + 'px;text-align:right" class="tickLabel">' + tick.label + "</div>";
            }

            html += '</div>';
            
            target.append(html);
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
                var prev, cur = null, drawx = null, drawy = null;
                
                ctx.beginPath();
                for (var i = 0; i < data.length; ++i) {
                    prev = cur;
                    cur = data[i];

                    if (prev == null || cur == null)
                        continue;
                    
                    var x1 = prev[0], y1 = prev[1],
                        x2 = cur[0], y2 = cur[1];

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

                    if (drawx != tHoz(x1) || drawy != tVert(y1) + offset)
                        ctx.moveTo(tHoz(x1), tVert(y1) + offset);
                    
                    drawx = tHoz(x2);
                    drawy = tVert(y2) + offset;
                    ctx.lineTo(drawx, drawy);
                }
                ctx.stroke();
            }

            function plotLineArea(data) {
                var prev, cur = null;
                
                var bottom = Math.min(Math.max(0, yaxis.min), yaxis.max);
                var top, lastX = 0;

                var areaOpen = false;
                
                for (var i = 0; i < data.length; ++i) {
                    prev = cur;
                    cur = data[i];

                    if (areaOpen && prev != null && cur == null) {
                        // close area
                        ctx.lineTo(tHoz(lastX), tVert(bottom));
                        ctx.fill();
                        areaOpen = false;
                        continue;
                    }

                    if (prev == null || cur == null)
                        continue;
                        
                    var x1 = prev[0], y1 = prev[1],
                        x2 = cur[0], y2 = cur[1];

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

                    if (!areaOpen) {
                        // open area
                        ctx.beginPath();
                        ctx.moveTo(tHoz(x1), tVert(bottom));
                        areaOpen = true;
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

                if (areaOpen) {
                    ctx.lineTo(tHoz(lastX), tVert(bottom));
                    ctx.fill();
                }
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
                    if (data[i] == null)
                        continue;
                    
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
                    if (data[i] == null)
                        continue;
                    
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
                for (var i = 0; i < data.length; i++) {
                    if (data[i] == null)
                        continue;
                    
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
            target.find(".legend").remove();

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
                    '<td class="legendColorBox"><div style="border:1px solid ' + options.legend.labelBoxBorderColor + ';padding:1px"><div style="width:14px;height:10px;background-color:' + series[i].color + ';overflow:hidden"></div></div></td>' +
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
                    var legend = $('<div class="legend">' + table.replace('style="', 'style="position:absolute;' + pos +';') + '</div>').appendTo(target);
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
                                tmp = extractColor(legend);
                            c = parseColor(tmp).adjust(null, null, null, 1).toString();
                        }
                        var div = legend.children();
                        $('<div style="position:absolute;width:' + div.width() + 'px;height:' + div.height() + 'px;' + pos +'background-color:' + c + ';"> </div>').prependTo(legend).css('opacity', options.legend.backgroundOpacity);
                        
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
            
            // cancel out any text selections
            document.body.focus();

            // prevent text selection and drag in old-school browsers
            if (document.onselectstart !== undefined && workarounds.onselectstart == null) {
                workarounds.onselectstart = document.onselectstart;
                document.onselectstart = function () { return false; };
            }
            if (document.ondrag !== undefined && workarounds.ondrag == null) {
                workarounds.ondrag = document.ondrag;
                document.ondrag = function () { return false; };
            }
            
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
            
            var offset = eventHolder.offset();
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
            if (document.onselectstart !== undefined)
                document.onselectstart = workarounds.onselectstart;
            if (document.ondrag !== undefined)
                document.ondrag = workarounds.ondrag;
            
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
    
    // round to nearby lower multiple of base
    function floorInBase(n, base) {
        return base * Math.floor(n / base);
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
        var result;

        // Look for rgb(num,num,num)
        if (result = /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(str))
            return new Color(parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10));
        
        // Look for rgba(num,num,num,num)
        if (result = /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return new Color(parseInt(result[1], 10), parseInt(result[2], 10), parseInt(result[3], 10), parseFloat(result[4]));
            
        // Look for rgb(num%,num%,num%)
        if (result = /rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(str))
            return new Color(parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55);

        // Look for rgba(num%,num%,num%,num)
        if (result = /rgba\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\s*\)/.exec(str))
            return new Color(parseFloat(result[1])*2.55, parseFloat(result[2])*2.55, parseFloat(result[3])*2.55, parseFloat(result[4]));
        
        // Look for #a0b1c2
        if (result = /#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(str))
            return new Color(parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16));

        // Look for #fff
        if (result = /#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(str))
            return new Color(parseInt(result[1]+result[1], 16), parseInt(result[2]+result[2], 16), parseInt(result[3]+result[3], 16));

        // Otherwise, we're most likely dealing with a named color
        var name = $.trim(str).toLowerCase();
        if (name == "transparent")
            return new Color(255, 255, 255, 0);
        else {
            result = lookupColors[name];
            return new Color(result[0], result[1], result[2]);
        }
    }
        
})(jQuery);
