/**
*
* jquery.sparkline.js
*
* v1.4.3
* (c) Splunk, Inc 
* Contact: Gareth Watts (gareth@splunk.com)
* http://omnipotent.net/jquery.sparkline/
*
* Generates inline sparkline charts from data supplied either to the method
* or inline in HTML
* 
* Compatible with Internet Explorer 6.0+ and modern browsers equipped with the canvas tag
* (Firefox 2.0+, Safari, Opera, etc)
*
* License: New BSD License
* 
* Copyright (c) 2009, Splunk Inc.
* All rights reserved.
* 
* Redistribution and use in source and binary forms, with or without modification, 
* are permitted provided that the following conditions are met:
* 
*     * Redistributions of source code must retain the above copyright notice, 
*       this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright notice, 
*       this list of conditions and the following disclaimer in the documentation 
*       and/or other materials provided with the distribution.
*     * Neither the name of Splunk Inc nor the names of its contributors may 
*       be used to endorse or promote products derived from this software without 
*       specific prior written permission.
* 
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES 
* OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT 
* SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
* SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT 
* OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) 
* HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, 
* OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
* 
*
* Usage: 
*  $(selector).sparkline(values, options)
*
* If values is undefined or set to 'html' then the data values are read from the specified tag:
*   <p>Sparkline: <span class="sparkline">1,4,6,6,8,5,3,5</span></p>
*   $('.sparkline').sparkline();
* There must be no spaces in the enclosed data set
*
* Otherwise values must be an array of numbers or null values
*    <p>Sparkline: <span id="sparkline1">This text replaced if the browser is compatible</span></p>
*    $('#sparkline1').sparkline([1,4,6,6,8,5,3,5])
*    $('#sparkline2').sparkline([1,4,6,null,null,5,3,5])
*
* For line charts, x values can also be specified:
*   <p>Sparkline: <span class="sparkline">1:1,2.7:4,3.4:6,5:6,6:8,8.7:5,9:3,10:5</span></p>
*    $('#sparkline1').sparkline([ [1,1], [2.7,4], [3.4,6], [5,6], [6,8], [8.7,5], [9,3], [10,5] ])
*
* Supported options:
*   lineColor - Color of the line used for the chart
*   fillColor - Color used to fill in the chart - Set to '' or false for a transparent chart
*   width - Width of the chart - Defaults to 3 times the number of values in pixels
*   height - Height of the chart - Defaults to the height of the containing element
*   chartRangeMin - Specify the minimum value to use for the range of the chart - Defaults to the minimum value supplied
*   chartRangeMax - Specify the maximum value to use for the range of the chart - Defaults to the maximum value supplied
*   composite - If true then don't erase any existing chart attached to the tag, but draw
*           another chart over the top - Note that width and height are ignored if an
*           existing chart is detected.
*
* There are 7 types of sparkline, selected by supplying a "type" option of 'line' (default),
* 'bar', 'tristate', 'bullet', 'discrete', 'pie' or 'box'
*    line - Line chart.  Options:
*       spotColor - Set to '' to not end each line in a circular spot
*       minSpotColor - If set, color of spot at minimum value
*       maxSpotColor - If set, color of spot at maximum value
*       spotRadius - Radius in pixels
*       lineWidth - Width of line in pixels
*       normalRangeMin 
*       normalRangeMax - If set draws a filled horizontal bar between these two values marking the "normal"
*                      or expected range of values
*       normalRangeColor - Color to use for the above bar
*       defaultPixelsPerValue - Defaults to 3 pixels of width for each value in the chart
*
*   bar - Bar chart.  Options:
*       barColor - Color of bars for postive values
*       negBarColor - Color of bars for negative values
*       barWidth - Width of bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*       barSpacing - Gap between bars in pixels
*       zeroAxis - Centers the y-axis around zero if true
*
*   tristate - Charts values of win (>0), lose (<0) or draw (=0)
*       posBarColor - Color of win values
*       negBarColor - Color of lose values
*       zeroBarColor - Color of draw values
*       barWidth - Width of bars in pixels
*       barSpacing - Gap between bars in pixels
*       colorMap - Optional mappnig of values to colors to override the *BarColor values above
*
*   discrete - Options:
*       lineHeight - Height of each line in pixels - Defaults to 30% of the graph height
*       thesholdValue - Values less than this value will be drawn using thresholdColor instead of lineColor
*       thresholdColor
*
*   bullet - Values for bullet graphs msut be in the order: target, performance, range1, range2, range3, ...
*       options:
*       targetColor - The color of the vertical target marker
*       targetWidth - The width of the target marker in pixels
*       performanceColor - The color of the performance measure horizontal bar
*       rangeColors - Colors to use for each qualitative range background color
*
*   pie - Pie chart. Options:
*       sliceColors - An array of colors to use for pie slices
*       offset - Angle in degrees to offset the first slice - Try -90 or +90
*
*   box - Box plot. Options:
*       raw - Set to true to supply pre-computed plot points as values
*             values should be: low_outlier, low_whisker, q1, median, q3, high_whisker, high_outlier
*             When set to false you can supply any number of values and the box plot will
*             be computed for you.  Default is false.
*       showOutliers - Set to true (default) to display outliers as circles
*       outlierIRQ - Interquartile range used to determine outliers.  Default 1.5
*       boxLineColor - Outline color of the box
*       boxFillColor - Fill color for the box
*       whiskerColor - Line color used for whiskers
*       outlierLineColor - Outline color of outlier circles
*       outlierFillColor - Fill color of the outlier circles
*       spotRadius - Radius of outlier circles
*       medianColor - Line color of the median line
*       target - Draw a target cross hair at the supplied value (default undefined)
*      
*   
*       
*   Examples:
*   $('#sparkline1').sparkline(myvalues, { lineColor: '#f00', fillColor: false });
*   $('.barsparks').sparkline('html', { type:'bar', height:'40px', barWidth:5 });
*   $('#tristate').sparkline([1,1,-1,1,0,0,-1], { type:'tristate' }):
*   $('#discrete').sparkline([1,3,4,5,5,3,4,5], { type:'discrete' });
*   $('#bullet').sparkline([10,12,12,9,7], { type:'bullet' });
*   $('#pie').sparkline([1,1,2], { type:'pie' });
*/


(function($) {

    // Provide a cross-browser interface to a few simple drawing primitives
    $.fn.simpledraw = function(width, height, use_existing) {
        if (use_existing && this[0].vcanvas) return this[0].vcanvas;
        if (width==undefined) width=$(this).innerWidth();
        if (height==undefined) height=$(this).innerHeight();
        if ($.browser.hasCanvas) {
            return new vcanvas_canvas(width, height, this);
        } else if ($.browser.msie) {
            return new vcanvas_vml(width, height, this);
        } else {
            return false;
        }
    };

    var pending = [];

    $.fn.sparkline = function(uservalues, options) {
        var options = $.extend({
            type : 'line',
            lineColor : '#00f',
            fillColor : '#cdf',
            defaultPixelsPerValue : 3,
            width : 'auto', 
            height : 'auto',
            composite : false
        }, options ? options : {});
        
        return this.each(function() {
            var render = function() {
                var values = (uservalues=='html' || uservalues==undefined) ? $(this).text().split(',') : uservalues;

                var width = options.width=='auto' ? values.length*options.defaultPixelsPerValue : options.width;
                if (options.height == 'auto') {
                    if (!options.composite || !this.vcanvas) {
                        // must be a better way to get the line height
                        var tmp = document.createElement('span');
                        tmp.innerHTML = 'a';
                        $(this).html(tmp);
                        height = $(tmp).innerHeight();
                        $(tmp).remove();
                    }
                } else {
                    height = options.height;
                }

                $.fn.sparkline[options.type].call(this, values, options, width, height);
            }
            // jQuery 1.3.0 completely changed the meaning of :hidden :-/
            if (($(this).html() && $(this).is(':hidden')) || ($.fn.jquery < "1.3.0" && $(this).parents().is(':hidden'))) {
                pending.push([this, render]);
            } else {
                render.call(this);
            }
        });
    };


    $.sparkline_display_visible = function() {
        for (var i=pending.length-1; i>=0; i--) {
            var el = pending[i][0];
            if ($(el).is(':visible') && !$(el).parents().is(':hidden')) {
                pending[i][1].call(el);
                pending.splice(i, 1);
            }
        }
    };

    $.fn.sparkline.line = function(values, options, width, height) {
        var options = $.extend({
            spotColor : '#f80',
            spotRadius : 1.5,
            minSpotColor : '#f80',
            maxSpotColor : '#f80',
            lineWidth: 1, 
            normalRangeMin : undefined,
            normalRangeMax : undefined,
            normalRangeColor : '#ccc',
            chartRangeMin : undefined,
            chartRangeMax : undefined
        }, options ? options : {});

        var xvalues = [], yvalues = [], yminmax = [];
        for (i=0; i<values.length; i++) {
            var v = values[i];
            var isstr = typeof(values[i])=='string';
            var isarray = typeof(values[i])=='object' && values[i] instanceof Array;
            var sp = isstr && values[i].split(':');
            if (isstr && sp.length == 2) { // x:y
                xvalues.push(Number(sp[0]));
                yvalues.push(Number(sp[1]));
                yminmax.push(Number(sp[1]));
            } else if (isarray) {
                xvalues.push(values[i][0]);
                yvalues.push(values[i][1]);
                yminmax.push(values[i][1]);
            } else {
                xvalues.push(i);
                if (values[i]===null || values[i]=='null') {
                    yvalues.push(null);
                } else {
                    yvalues.push(Number(values[i]));
                    yminmax.push(Number(values[i]));
                }
            }
        }
        if (options.xvalues) {
            xvalues = options.xvalues;
        }

        var maxy = Math.max.apply(Math, yminmax);
        var maxyval = maxy;
        var miny = Math.min.apply(Math, yminmax);
        var minyval = miny;

        var maxx = Math.max.apply(Math, xvalues);
        var maxxval = maxx;
        var minx = Math.min.apply(Math, xvalues);
        var minxval = minx;

        if (options.normalRangeMin!=undefined) {
            if (options.normalRangeMin<miny)
                miny = options.normalRangeMin;
            if (options.normalRangeMax>maxy)
                maxy = options.normalRangeMax;
        }
        if (options.chartRangeMin!=undefined && options.chartRangeMin<miny) {
            miny = options.chartRangeMin;
        }
        if (options.chartRangeMax!=undefined && options.chartRangeMax>maxy) {
            maxy = options.chartRangeMax;
        }
        var rangex = maxx-minx == 0 ? 1 : maxx-minx;
        var rangey = maxy-miny == 0 ? 1 : maxy-miny;
        var vl = yvalues.length-1;

        if (vl<1) {
            this.innerHTML = '';
            return;
        }

        var target = $(this).simpledraw(width, height, options.composite);
        if (target) {
            var canvas_width = target.pixel_width;
            var canvas_height = target.pixel_height;
            var canvas_top = 0;
            var canvas_left = 0;

            if (options.spotRadius && (canvas_width < (options.spotRadius*4) || canvas_height < (options.spotRadius*4))) {
                options.spotRadius = 0;
            }
            if (options.spotRadius) {
                // adjust the canvas size as required so that spots will fit
                if (options.minSpotColor || (options.spotColor && yvalues[vl]==miny)) 
                    canvas_height -= Math.ceil(options.spotRadius);
                if (options.maxSpotColor || (options.spotColor && yvalues[vl]==maxy)) {
                    canvas_height -= Math.ceil(options.spotRadius);
                    canvas_top += Math.ceil(options.spotRadius);
                }
                if (options.minSpotColor || options.maxSpotColor && (yvalues[0]==miny || yvalues[0]==maxy)) {
                    canvas_left += Math.ceil(options.spotRadius);
                    canvas_width -= Math.ceil(options.spotRadius);
                }
                if (options.spotColor || (options.minSpotColor || options.maxSpotColor && (yvalues[vl]==miny||yvalues[vl]==maxy)))
                    canvas_width -= Math.ceil(options.spotRadius);
            }


            canvas_height--;
            if (options.normalRangeMin!=undefined) {
                var ytop = canvas_top+Math.round(canvas_height-(canvas_height*((options.normalRangeMax-miny)/rangey)));
                var height = Math.round((canvas_height*(options.normalRangeMax-options.normalRangeMin))/rangey);
                target.drawRect(canvas_left, ytop, canvas_width, height, undefined, options.normalRangeColor);
            }

            var path = [];
            var paths = [path];
            for(var i=0; i<yvalues.length; i++) {
                var x=xvalues[i], y=yvalues[i];
                if (y===null) {
                    if (i) {
                        if (yvalues[i-1]!==null) {
                            path = [];
                            paths.push(path);
                        }
                    }
                } else {
                    if (!path.length) {
                        // previous value was null
                        path.push([canvas_left+Math.round((x-minx)*(canvas_width/rangex)), canvas_top+canvas_height]);
                    }
                    path.push([canvas_left+Math.round((x-minx)*(canvas_width/rangex)), canvas_top+Math.round(canvas_height-(canvas_height*((y-miny)/rangey)))]);
                }
            }
            for(var i=0; i<paths.length; i++) {
                path = paths[i];
                if (!path.length)
                    continue; // last value was null
                if (options.fillColor) {
                    path.push([path[path.length-1][0], canvas_top+canvas_height-1]);
                    target.drawShape(path, undefined, options.fillColor);
                    path.pop();
                }
                // if there's only a single point in this path, then we want to display it as a vertical line
                // which means we keep path[0]  as is
                if (path.length>2) {
                    // else we want the first value 
                    path[0] = [ path[0][0], path[1][1] ];
                }
                target.drawShape(path, options.lineColor, undefined, options.lineWidth);
            }
            if (options.spotRadius && options.spotColor) {
                target.drawCircle(canvas_left+canvas_width,  canvas_top+Math.round(canvas_height-(canvas_height*((yvalues[vl]-miny)/rangey))), options.spotRadius, undefined, options.spotColor);
            }
            if (maxy!=minyval) {
                if (options.spotRadius && options.minSpotColor) {
                    var x = xvalues[yvalues.indexOf(minyval)];
                    target.drawCircle(canvas_left+Math.round((x-minx)*(canvas_width/rangex)),  canvas_top+Math.round(canvas_height-(canvas_height*((minyval-miny)/rangey))), options.spotRadius, undefined, options.minSpotColor);
                }
                if (options.spotRadius && options.maxSpotColor) {
                    var x = xvalues[yvalues.indexOf(maxyval)];
                    target.drawCircle(canvas_left+Math.round((x-minx)*(canvas_width/rangex)),  canvas_top+Math.round(canvas_height-(canvas_height*((maxyval-miny)/rangey))), options.spotRadius, undefined, options.maxSpotColor);
                }
            }
        } else {
            // Remove the tag contents if sparklines aren't supported
            this.innerHTML = '';
        }
    };

    $.fn.sparkline.bar = function(values, options, width, height) {
        var options = $.extend({
            type : 'bar',
            barColor : '#00f',
            negBarColor : '#f44',
            zeroColor: undefined,
            zeroAxis : undefined,
            barWidth : 4,
            barSpacing : 1,
            chartRangeMax: undefined,
            chartRangeMin: undefined,
            colorMap : {}
        }, options ? options : {});

        var width = (values.length * options.barWidth) + ((values.length-1) * options.barSpacing);
        var num_values = [];
        for(var i=0; i<values.length; i++) {
            if (values[i]=='null' || values[i]===null) {
                values[i] = null;
            } else {
                values[i] = Number(values[i]);
                num_values.push(Number(values[i]));
            }
        }
        var max = Math.max.apply(Math, num_values);
        var min = Math.min.apply(Math, num_values);
        if (options.chartRangeMin!=undefined && options.chartRangeMin<min) {
            min = options.chartRangeMin;
        }
        if (options.chartRangeMax!=undefined && options.chartRangeMax>max) {
            max = options.chartRangeMax;
        }
        if (options.zeroAxis == undefined) options.zeroAxis = min<0;
        var range = max-min == 0 ? 1 : max-min;

        var target = $(this).simpledraw(width, height);
        if (target) {
            var canvas_width = target.pixel_width;
            var canvas_height = target.pixel_height;
            var yzero = min<0 && options.zeroAxis ? canvas_height-Math.round(canvas_height * (Math.abs(min)/range))-1 : canvas_height-1;

            for(var i=0; i<values.length; i++) {
                var x = i*(options.barWidth+options.barSpacing);
                var val = values[i];
                if (val===null) {
                    continue;
                }
                var color = (val < 0) ? options.negBarColor : options.barColor;
                if (options.zeroAxis && min<0) {
                    var height = Math.round(canvas_height*((Math.abs(val)/range)))+1;
                    var y = (val < 0) ? yzero : yzero-height;
                } else {
                    var height = Math.round(canvas_height*((val-min)/range))+1;
                    var y = canvas_height-height;
                }
                if (val==0 && options.zeroColor!=undefined) {
                    color = options.zeroColor;
                }
                if (options.colorMap[val]) {
                    color = options.colorMap[val];
                }
                target.drawRect(x, y, options.barWidth-1, height-1, color, color);
            }
        } else {
            // Remove the tag contents if sparklines aren't supported
            this.innerHTML = '';
        }
    };

    $.fn.sparkline.tristate = function(values, options, width, height) {
        values = $.map(values, Number);
        var options = $.extend({
            barWidth : 4,
            barSpacing : 1,
            posBarColor: '#6f6',
            negBarColor : '#f44',
            zeroBarColor : '#999',
            colorMap : {}
        }, options);

        var width = (values.length * options.barWidth) + ((values.length-1) * options.barSpacing);

        var target = $(this).simpledraw(width, height);
        if (target) {
            var canvas_width = target.pixel_width;
            var canvas_height = target.pixel_height;
            var half_height = Math.round(canvas_height/2);

            for(var i=0; i<values.length; i++) {
                var x = i*(options.barWidth+options.barSpacing);
                if (values[i] < 0) {
                    var y = half_height;
                    var height = half_height-1;
                    var color = options.negBarColor;
                } else if (values[i] > 0) {
                    var y = 0;
                    var height = half_height-1;
                    var color = options.posBarColor;
                } else {
                    var y = half_height-1;
                    var height = 2;
                    var color = options.zeroBarColor;
                }
                if (options.colorMap[values[i]]) {
                    color = options.colorMap[values[i]];
                }
                target.drawRect(x, y, options.barWidth-1, height-1, color, color);
            }
        } else {
            // Remove the tag contents if sparklines aren't supported
            this.innerHTML = '';
        }
    };

    $.fn.sparkline.discrete = function(values, options, width, height) {
        values = $.map(values, Number);
        var options = $.extend({
            lineHeight: 'auto',
            thresholdColor: undefined,
            thresholdValue : 0,
            chartRangeMax: undefined,
            chartRangeMin: undefined
        }, options);

        width = options.width=='auto' ? values.length*2 : width;
        var interval = Math.floor(width / values.length);

        var target = $(this).simpledraw(width, height);
        if (target) {
            var canvas_width = target.pixel_width;
            var canvas_height = target.pixel_height;
            var line_height = options.lineHeight == 'auto' ? Math.round(canvas_height * 0.3) : options.lineHeight;
            var pheight = canvas_height - line_height;
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            if (options.chartRangeMin!=undefined && options.chartRangeMin<min) {
                min = options.chartRangeMin;
            }
            if (options.chartRangeMax!=undefined && options.chartRangeMax>max) {
                max = options.chartRangeMax;
            }
            var range = max-min;

            for(var i=0; i<values.length; i++) {
                var val = values[i];
                var x = (i*interval);
                var ytop = Math.round(pheight-pheight*((val-min)/range));
                target.drawLine(x, ytop, x, ytop+line_height, (options.thresholdColor && val < options.thresholdValue) ? options.thresholdColor : options.lineColor);
            }
        }  else {
            // Remove the tag contents if sparklines aren't supported
            this.innerHTML = '';
        }
                
    };

    $.fn.sparkline.bullet = function(values, options, width, height) {
        values = $.map(values, Number);
        // target, performance, range1, range2, range3
        var options = $.extend({
            targetColor : 'red',
            targetWidth : 3, // width of the target bar in pixels
            performanceColor : 'blue',
            rangeColors : ['#D3DAFE', '#A8B6FF', '#7F94FF' ],
            base : undefined // set this to a number to change the base start number
        }, options);

        
        width = options.width=='auto' ? '4.0em' : width;

        var target = $(this).simpledraw(width, height);
        if (target && values.length>1) {
            var canvas_width = target.pixel_width-Math.ceil(options.targetWidth/2);
            var canvas_height = target.pixel_height;

            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            if (options.base == undefined) {
                var min = min < 0 ? min : 0;
            } else {
                min = options.base;
            }
            var range = max-min;

            // draw range values
            for(i=2; i<values.length; i++) {
                var rangeval = parseInt(values[i]);
                var rangewidth = Math.round(canvas_width*((rangeval-min)/range));
                target.drawRect(0, 0, rangewidth-1, canvas_height-1, options.rangeColors[i-2], options.rangeColors[i-2]);
            }

            // draw the performance bar
            var perfval = parseInt(values[1]);
            var perfwidth = Math.round(canvas_width*((perfval-min)/range));
            target.drawRect(0, Math.round(canvas_height*0.3), perfwidth-1, Math.round(canvas_height*0.4)-1, options.performanceColor, options.performanceColor);

            // draw the target linej
            var targetval = parseInt(values[0]);
            var x = Math.round(canvas_width*((targetval-min)/range)-(options.targetWidth/2));
            var targettop = Math.round(canvas_height*0.10);
            var targetheight = canvas_height-(targettop*2);
            target.drawRect(x, targettop, options.targetWidth-1, targetheight-1, options.targetColor, options.targetColor);
        }  else {
            // Remove the tag contents if sparklines aren't supported
            this.innerHTML = '';
        }
    };

    $.fn.sparkline.pie = function(values, options, width, height) {
        values = $.map(values, Number);
        var options = $.extend({
            sliceColors : ['#f00', '#0f0', '#00f']
        }, options);

        width = options.width=='auto' ? height : width;

        var target = $(this).simpledraw(width, height);
        if (target && values.length>1) {
            var canvas_width = target.pixel_width;
            var canvas_height = target.pixel_height;
                
            var radius = Math.floor(Math.min(canvas_width, canvas_height)/2);
            var total = 0;
            for(var i=0; i<values.length; i++)
                total += values[i];
            var next = 0;
            if (options.offset) {
                next += (2*Math.PI)*(options.offset/360);
            }
            var circle = 2*Math.PI;
            for(var i=0; i<values.length; i++) {
                var start = next;
                var end = next;
                if (total > 0) {  // avoid divide by zero
                    end = next + (circle*(values[i]/total));
                }
                target.drawPieSlice(radius, radius, radius, start, end, undefined, options.sliceColors[i % options.sliceColors.length]);
                next = end;
            }
        }
    };

    function quartile(values, q) {
        if (q==2) {
            var vl2 = Math.floor(values.length/2);
            return values.length % 2 ? values[vl2] : (values[vl2]+values[vl2+1])/2;
        } else {
            var vl4 = Math.floor(values.length/4);
            return values.length % 2 ? (values[vl4*q]+values[vl4*q+1])/2 : values[vl4*q];
        }
    };

    $.fn.sparkline.box = function(values, options, width, height) {
        values = $.map(values, Number);
        var options = $.extend({
            raw: false,
            boxLineColor: 'black',
            boxFillColor: '#cdf',
            whiskerColor: 'black',
            outlierLineColor: '#333',
            outlierFillColor: 'white',
            medianColor: 'red',
            showOutliers: true,
            outlierIQR: 1.5,
            spotRadius: 1.5,
            target: undefined,
            targetColor: '#4a2',
            chartRangeMax: undefined,
            chartRangeMin: undefined
        }, options);

        width = options.width=='auto' ? '4.0em' : width;

        minvalue = options.chartRangeMin==undefined ? Math.min.apply(Math, values) : options.chartRangeMin;
        maxvalue = options.chartRangeMax==undefined ? Math.max.apply(Math, values) : options.chartRangeMax;
        var target = $(this).simpledraw(width, height);
        if (target && values.length>1) {
            var canvas_width = target.pixel_width;
            var canvas_height = target.pixel_height;
            if (options.raw) {
                if (options.showOutliers && values.length>5) {
                    var loutlier=values[0], lwhisker=values[1], q1=values[2], q2=values[3], q3=values[4], rwhisker=values[5], routlier=values[6];
                } else {
                    var lwhisker=values[0], q1=values[1], q2=values[2], q3=values[3], rwhisker=values[4];
                }
            } else {
                values.sort(function(a, b) { return a-b; });
                var q1 = quartile(values, 1);
                var q2 = quartile(values, 2);
                var q3 = quartile(values, 3);
                var iqr = q3-q1;
                if (options.showOutliers) {
                    var lwhisker=undefined, rwhisker=undefined;
                    for(var i=0; i<values.length; i++) {
                        if (lwhisker==undefined && values[i] > q1-(iqr*options.outlierIQR))
                            lwhisker = values[i];
                        if (values[i] < q3+(iqr*options.outlierIQR))
                            rwhisker = values[i];
                    }
                    var loutlier = values[0];
                    var routlier = values[values.length-1];
                } else {
                    var lwhisker = values[0];
                    var rwhisker = values[values.length-1];
                }
            }

            var unitsize = canvas_width / (maxvalue-minvalue+1);
            var canvas_left = 0;
            if (options.showOutliers) {
                canvas_left = Math.ceil(options.spotRadius);
                canvas_width -= 2*Math.ceil(options.spotRadius);
                var unitsize = canvas_width / (maxvalue-minvalue+1);
                if (loutlier < lwhisker)
                    target.drawCircle((loutlier-minvalue)*unitsize+canvas_left, canvas_height/2, options.spotRadius, options.outlierLineColor, options.outlierFillColor);
                if (routlier > rwhisker)
                    target.drawCircle((routlier-minvalue)*unitsize+canvas_left, canvas_height/2, options.spotRadius, options.outlierLineColor, options.outlierFillColor);
            }

            // box
            target.drawRect(
                Math.round((q1-minvalue)*unitsize+canvas_left),
                Math.round(canvas_height*0.1),
                Math.round((q3-q1)*unitsize), 
                Math.round(canvas_height*0.8), 
                options.boxLineColor, 
                options.boxFillColor);
            // left whisker
            target.drawLine(
                Math.round((lwhisker-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height/2), 
                Math.round((q1-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height/2), 
                options.lineColor);
            target.drawLine(
                Math.round((lwhisker-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height/4), 
                Math.round((lwhisker-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height-canvas_height/4), 
                options.whiskerColor);
            // right whisker
            target.drawLine(Math.round((rwhisker-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height/2), 
                Math.round((q3-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height/2), 
                options.lineColor);
            target.drawLine(
                Math.round((rwhisker-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height/4), 
                Math.round((rwhisker-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height-canvas_height/4), 
                options.whiskerColor);
            // median line
            target.drawLine(
                Math.round((q2-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height*0.1),
                Math.round((q2-minvalue)*unitsize+canvas_left), 
                Math.round(canvas_height*0.9),
                options.medianColor);
            if (options.target) {
                var size = Math.ceil(options.spotRadius);
                target.drawLine(
                    Math.round((options.target-minvalue)*unitsize+canvas_left), 
                    Math.round((canvas_height/2)-size), 
                    Math.round((options.target-minvalue)*unitsize+canvas_left), 
                    Math.round((canvas_height/2)+size), 
                    options.targetColor);
                target.drawLine(
                    Math.round((options.target-minvalue)*unitsize+canvas_left-size), 
                    Math.round(canvas_height/2), 
                    Math.round((options.target-minvalue)*unitsize+canvas_left+size), 
                    Math.round(canvas_height/2), 
                    options.targetColor);
            }
        }  else {
            // Remove the tag contents if sparklines aren't supported
            this.innerHTML = '';
        }
    };


    // IE doesn't provide an indexOf method for arrays :-(
    if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function(entry) {
            for(var i=0; i<this.length; i++) {
                if (this[i] == entry)
                    return i;
            }
            return -1;
        }
    }

    // Setup a very simple "virtual canvas" to make drawing the few shapes we need easier
    // This is accessible as $(foo).simpledraw()

    if ($.browser.msie && !document.namespaces['v']) {
        document.namespaces.add('v', 'urn:schemas-microsoft-com:vml', '#default#VML');
    }

    if ($.browser.hasCanvas == undefined) {
        var t = document.createElement('canvas');
        $.browser.hasCanvas = t.getContext!=undefined;
    }

    var vcanvas_base = function(width, height, target) {
    };

    vcanvas_base.prototype = {
        init : function(width, height, target) {
            this.width = width;
            this.height = height;
            this.target = target;
            if (target[0]) target=target[0];
            target.vcanvas = this;
        },

        drawShape : function(path, lineColor, fillColor, lineWidth) {
            alert('drawShape not implemented');
        },

        drawLine : function(x1, y1, x2, y2, lineColor, lineWidth) {
            return this.drawShape([ [x1,y1], [x2,y2] ], lineColor, lineWidth);
        },

        drawCircle : function(x, y, radius, lineColor, fillColor) {
            alert('drawCircle not implemented');
        },

        drawPieSlice : function(x, y, radius, startAngle, endAngle, lineColor, fillColor) {
            alert('drawPieSlice not implemented');
        },

        drawRect : function(x, y, width, height, lineColor, fillColor) {
            alert('drawRect not implemented');
        },

        getElement : function() {
            return this.canvas;
        },

        _insert : function(el, target) {
            $(target).html(el);
        }
    };

    var vcanvas_canvas = function(width, height, target) {
        return this.init(width, height, target);
    };

    vcanvas_canvas.prototype = $.extend(new vcanvas_base, {
        _super : vcanvas_base.prototype,

        init : function(width, height, target) {
            this._super.init(width, height, target);
            this.canvas = document.createElement('canvas');
            if (target[0]) target=target[0];
            target.vcanvas = this;
            $(this.canvas).css({ display:'inline-block', width:width, height:height, verticalAlign:'top' });
            this._insert(this.canvas, target);
            this.pixel_height = $(this.canvas).height();
            this.pixel_width = $(this.canvas).width();
            this.canvas.width = this.pixel_width;
            this.canvas.height = this.pixel_height;
            $(this.canvas).css({width: this.pixel_width, height: this.pixel_height});
        },

        _getContext : function(lineColor, fillColor, lineWidth) {
            var context = this.canvas.getContext('2d');
            if (lineColor != undefined)
                context.strokeStyle = lineColor;
            context.lineWidth = lineWidth==undefined ? 1 : lineWidth;
            if (fillColor != undefined)
                context.fillStyle = fillColor;
            return context;
        },

        drawShape : function(path, lineColor, fillColor, lineWidth) {
            var context = this._getContext(lineColor, fillColor, lineWidth);
            context.beginPath();
            context.moveTo(path[0][0]+0.5, path[0][1]+0.5);
            for(var i=1; i<path.length; i++) {
                context.lineTo(path[i][0]+0.5, path[i][1]+0.5); // the 0.5 offset gives us crisp pixel-width lines
            }
            if (lineColor != undefined) {
                context.stroke();
            }
            if (fillColor != undefined) {
                context.fill();
            }
        },

        drawCircle : function(x, y, radius, lineColor, fillColor) {
            var context = this._getContext(lineColor, fillColor);
            context.beginPath();
            context.arc(x, y, radius, 0, 2*Math.PI, false);
            if (lineColor != undefined) {
                context.stroke();
            }
            if (fillColor != undefined) {
                context.fill();
            }
        }, 

        drawPieSlice : function(x, y, radius, startAngle, endAngle, lineColor, fillColor) {
            var context = this._getContext(lineColor, fillColor);
            context.beginPath();
            context.moveTo(x, y);
            context.arc(x, y, radius, startAngle, endAngle, false);
            context.lineTo(x, y);
            context.closePath();
            if (lineColor != undefined) {
                context.stroke();
            }
            if (fillColor) {
                context.fill();
            }
        },

        drawRect : function(x, y, width, height, lineColor, fillColor) {
            return this.drawShape([ [x,y], [x+width, y], [x+width, y+height], [x, y+height], [x, y] ], lineColor, fillColor);
        }
        
    });

    var vcanvas_vml = function(width, height, target) {
        return this.init(width, height, target);
    };

    vcanvas_vml.prototype = $.extend(new vcanvas_base, {
        _super : vcanvas_base.prototype,

        init : function(width, height, target) {
            this._super.init(width, height, target);
            if (target[0]) target=target[0];
            target.vcanvas = this;
            this.canvas = document.createElement('span');
            $(this.canvas).css({ display:'inline-block', position: 'relative', overflow:'hidden', width:width, height:height, margin:'0px', padding:'0px', verticalAlign: 'top'});
            this._insert(this.canvas, target);
            this.pixel_height = $(this.canvas).height();
            this.pixel_width = $(this.canvas).width();
            this.canvas.width = this.pixel_width;
            this.canvas.height = this.pixel_height;;
            var groupel = '<v:group coordorigin="0 0" coordsize="'+this.pixel_width+' '+this.pixel_height+'"'
                    +' style="position:absolute;top:0;left:0;width:'+this.pixel_width+'px;height='+this.pixel_height+'px;"></v:group>';
            this.canvas.insertAdjacentHTML('beforeEnd', groupel);
            this.group = $(this.canvas).children()[0];
        },

        drawShape : function(path, lineColor, fillColor, lineWidth) {
            var vpath = [];
            for(var i=0; i<path.length; i++) {
                vpath[i] = ''+(path[i][0])+','+(path[i][1]);
            }
            var initial = vpath.splice(0,1);
            lineWidth = lineWidth == undefined ? 1 : lineWidth;
            var stroke = lineColor == undefined ? ' stroked="false" ' : ' strokeWeight="'+lineWidth+'" strokeColor="'+lineColor+'" ';
            var fill = fillColor == undefined ? ' filled="false"' : ' fillColor="'+fillColor+'" filled="true" ';
            var closed = vpath[0] == vpath[vpath.length-1] ? 'x ' : '';
            var vel = '<v:shape coordorigin="0 0" coordsize="'+this.pixel_width+' '+this.pixel_height+'" '
                + stroke
                + fill
                +' style="position:absolute;left:0px;top:0px;height:'+this.pixel_height+'px;width:'+this.pixel_width+'px;padding:0px;margin:0px;" '
                +' path="m '+initial+' l '+vpath.join(', ')+' '+closed+'e">'
                +' </v:shape>';
             this.group.insertAdjacentHTML('beforeEnd', vel);
        },

        drawCircle : function(x, y, radius, lineColor, fillColor) {
            x -= radius+1;
            y -= radius+1;
            var stroke = lineColor == undefined ? ' stroked="false" ' : ' strokeWeight="1" strokeColor="'+lineColor+'" ';
            var fill = fillColor == undefined ? ' filled="false"' : ' fillColor="'+fillColor+'" filled="true" ';
            var vel = '<v:oval '
                + stroke
                + fill
                +' style="position:absolute;top:'+y+'px; left:'+x+'px; width:'+(radius*2)+'px; height:'+(radius*2)+'px"></v:oval>';
            this.group.insertAdjacentHTML('beforeEnd', vel);
            
        },
        
        drawPieSlice : function(x, y, radius, startAngle, endAngle, lineColor, fillColor) {
            if (startAngle == endAngle) {
                return;  // VML seems to have problem when start angle equals end angle.
            }
            if ((endAngle - startAngle) == (2*Math.PI)) {
                startAngle = 0.0;  // VML seems to have a problem when drawing a full circle that doesn't start 0
                endAngle = (2*Math.PI);
            }

            var startx = x + Math.round(Math.cos(startAngle) * radius);
            var starty = y + Math.round(Math.sin(startAngle) * radius);
            var endx = x + Math.round(Math.cos(endAngle) * radius);
            var endy = y + Math.round(Math.sin(endAngle) * radius);

            var vpath = [  x-radius, y-radius, x+radius, y+radius, startx, starty, endx, endy ]; 
            var stroke = lineColor == undefined ? ' stroked="false" ' : ' strokeWeight="1" strokeColor="'+lineColor+'" ';
            var fill = fillColor == undefined ? ' filled="false"' : ' fillColor="'+fillColor+'" filled="true" ';
            var vel = '<v:shape coordorigin="0 0" coordsize="'+this.pixel_width+' '+this.pixel_height+'" '
                + stroke
                + fill
                +' style="position:absolute;left:0px;top:0px;height:'+this.pixel_height+'px;width:'+this.pixel_width+'px;padding:0px;margin:0px;" '
                +' path="m '+x+','+y+' wa '+vpath.join(', ')+' x e">'
                +' </v:shape>';
             this.group.insertAdjacentHTML('beforeEnd', vel);
        },

        drawRect : function(x, y, width, height, lineColor, fillColor) {
            return this.drawShape( [ [x, y], [x, y+height], [x+width, y+height], [x+width, y], [x, y] ], lineColor, fillColor);
        }
    });

})(jQuery);
