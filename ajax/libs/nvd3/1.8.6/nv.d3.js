/* nvd3 version 1.8.6 (https://github.com/novus/nvd3) 2017-08-23 */
(function(){

// set up main nv object
var nv = {};

// the major global objects under the nv namespace
nv.dev = false; //set false when in production
nv.tooltip = nv.tooltip || {}; // For the tooltip system
nv.utils = nv.utils || {}; // Utility subsystem
nv.models = nv.models || {}; //stores all the possible models/components
nv.charts = {}; //stores all the ready to use charts
nv.logs = {}; //stores some statistics and potential error messages
nv.dom = {}; //DOM manipulation functions

// Node/CommonJS - require D3
if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined' && typeof(d3) == 'undefined') {
    d3 = require('d3');
}

nv.dispatch = d3.dispatch('render_start', 'render_end');

// Function bind polyfill
// Needed ONLY for phantomJS as it's missing until version 2.0 which is unreleased as of this comment
// https://github.com/ariya/phantomjs/issues/10522
// http://kangax.github.io/compat-table/es5/#Function.prototype.bind
// phantomJS is used for running the test suite
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5 internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                    aArgs.concat(Array.prototype.slice.call(arguments)));
            };

        fNOP.prototype = this.prototype;
        fBound.prototype = new fNOP();
        return fBound;
    };
}

//  Development render timers - disabled if dev = false
if (nv.dev) {
    nv.dispatch.on('render_start', function(e) {
        nv.logs.startTime = +new Date();
    });

    nv.dispatch.on('render_end', function(e) {
        nv.logs.endTime = +new Date();
        nv.logs.totalTime = nv.logs.endTime - nv.logs.startTime;
        nv.log('total', nv.logs.totalTime); // used for development, to keep track of graph generation times
    });
}

// Logs all arguments, and returns the last so you can test things in place
// Note: in IE8 console.log is an object not a function, and if modernizr is used
// then calling Function.prototype.bind with with anything other than a function
// causes a TypeError to be thrown.
nv.log = function() {
    if (nv.dev && window.console && console.log && console.log.apply)
        console.log.apply(console, arguments);
    else if (nv.dev && window.console && typeof console.log == "function" && Function.prototype.bind) {
        var log = Function.prototype.bind.call(console.log, console);
        log.apply(console, arguments);
    }
    return arguments[arguments.length - 1];
};

// print console warning, should be used by deprecated functions
nv.deprecated = function(name, info) {
    if (console && console.warn) {
        console.warn('nvd3 warning: `' + name + '` has been deprecated. ', info || '');
    }
};

// The nv.render function is used to queue up chart rendering
// in non-blocking async functions.
// When all queued charts are done rendering, nv.dispatch.render_end is invoked.
nv.render = function render(step) {
    // number of graphs to generate in each timeout loop
    step = step || 1;

    nv.render.active = true;
    nv.dispatch.render_start();

    var renderLoop = function() {
        var chart, graph;

        for (var i = 0; i < step && (graph = nv.render.queue[i]); i++) {
            chart = graph.generate();
            if (typeof graph.callback == typeof(Function)) graph.callback(chart);
        }

        nv.render.queue.splice(0, i);

        if (nv.render.queue.length) {
            setTimeout(renderLoop);
        }
        else {
            nv.dispatch.render_end();
            nv.render.active = false;
        }
    };

    setTimeout(renderLoop);
};

nv.render.active = false;
nv.render.queue = [];

/*
Adds a chart to the async rendering queue. This method can take arguments in two forms:
nv.addGraph({
    generate: <Function>
    callback: <Function>
})

or

nv.addGraph(<generate Function>, <callback Function>)

The generate function should contain code that creates the NVD3 model, sets options
on it, adds data to an SVG element, and invokes the chart model. The generate function
should return the chart model.  See examples/lineChart.html for a usage example.

The callback function is optional, and it is called when the generate function completes.
*/
nv.addGraph = function(obj) {
    if (typeof arguments[0] === typeof(Function)) {
        obj = {generate: arguments[0], callback: arguments[1]};
    }

    nv.render.queue.push(obj);

    if (!nv.render.active) {
        nv.render();
    }
};

// Node/CommonJS exports
if (typeof(module) !== 'undefined' && typeof(exports) !== 'undefined') {
  module.exports = nv;
}

if (typeof(window) !== 'undefined') {
  window.nv = nv;
}
/* Facade for queueing DOM write operations
 * with Fastdom (https://github.com/wilsonpage/fastdom)
 * if available.
 * This could easily be extended to support alternate
 * implementations in the future.
 */
nv.dom.write = function(callback) {
	if (window.fastdom !== undefined) {
		return fastdom.mutate(callback);
	}
	return callback();
};

/* Facade for queueing DOM read operations
 * with Fastdom (https://github.com/wilsonpage/fastdom)
 * if available.
 * This could easily be extended to support alternate
 * implementations in the future.
 */
nv.dom.read = function(callback) {
	if (window.fastdom !== undefined) {
		return fastdom.measure(callback);
	}
	return callback();
};
/* Utility class to handle creation of an interactive layer.
 This places a rectangle on top of the chart. When you mouse move over it, it sends a dispatch
 containing the X-coordinate. It can also render a vertical line where the mouse is located.

 dispatch.elementMousemove is the important event to latch onto.  It is fired whenever the mouse moves over
 the rectangle. The dispatch is given one object which contains the mouseX/Y location.
 It also has 'pointXValue', which is the conversion of mouseX to the x-axis scale.
 */
nv.interactiveGuideline = function() {
    "use strict";

    var margin = { left: 0, top: 0 } //Pass the chart's top and left magins. Used to calculate the mouseX/Y.
        ,   width = null
        ,   height = null
        ,   xScale = d3.scale.linear()
        ,   dispatch = d3.dispatch('elementMousemove', 'elementMouseout', 'elementClick', 'elementDblclick', 'elementMouseDown', 'elementMouseUp')
        ,   showGuideLine = true
        ,   svgContainer = null // Must pass the chart's svg, we'll use its mousemove event.
        ,   tooltip = nv.models.tooltip()
        ,   isMSIE =  window.ActiveXObject// Checkt if IE by looking for activeX. (excludes IE11)
    ;

    tooltip
        .duration(0)
        .hideDelay(0)
        .hidden(false);

    function layer(selection) {
        selection.each(function(data) {
            var container = d3.select(this);
            var availableWidth = (width || 960), availableHeight = (height || 400);
            var wrap = container.selectAll("g.nv-wrap.nv-interactiveLineLayer")
                .data([data]);
            var wrapEnter = wrap.enter()
                .append("g").attr("class", " nv-wrap nv-interactiveLineLayer");
            wrapEnter.append("g").attr("class","nv-interactiveGuideLine");

            if (!svgContainer) {
                return;
            }

            function mouseHandler() {
                var mouseX = d3.event.clientX - this.getBoundingClientRect().left;
                var mouseY = d3.event.clientY - this.getBoundingClientRect().top;

                var subtractMargin = true;
                var mouseOutAnyReason = false;
                if (isMSIE) {
                    /*
                     D3.js (or maybe SVG.getScreenCTM) has a nasty bug in Internet Explorer 10.
                     d3.mouse() returns incorrect X,Y mouse coordinates when mouse moving
                     over a rect in IE 10.
                     However, d3.event.offsetX/Y also returns the mouse coordinates
                     relative to the triggering <rect>. So we use offsetX/Y on IE.
                     */
                    mouseX = d3.event.offsetX;
                    mouseY = d3.event.offsetY;

                    /*
                     On IE, if you attach a mouse event listener to the <svg> container,
                     it will actually trigger it for all the child elements (like <path>, <circle>, etc).
                     When this happens on IE, the offsetX/Y is set to where ever the child element
                     is located.
                     As a result, we do NOT need to subtract margins to figure out the mouse X/Y
                     position under this scenario. Removing the line below *will* cause
                     the interactive layer to not work right on IE.
                     */
                    if(d3.event.target.tagName !== "svg") {
                        subtractMargin = false;
                    }

                    if (d3.event.target.className.baseVal.match("nv-legend")) {
                        mouseOutAnyReason = true;
                    }

                }

                if(subtractMargin) {
                    mouseX -= margin.left;
                    mouseY -= margin.top;
                }

                /* If mouseX/Y is outside of the chart's bounds,
                 trigger a mouseOut event.
                 */
                if (d3.event.type === 'mouseout'
                    || mouseX < 0 || mouseY < 0
                    || mouseX > availableWidth || mouseY > availableHeight
                    || (d3.event.relatedTarget && d3.event.relatedTarget.ownerSVGElement === undefined)
                    || mouseOutAnyReason
                    ) {

                    if (isMSIE) {
                        if (d3.event.relatedTarget
                            && d3.event.relatedTarget.ownerSVGElement === undefined
                            && (d3.event.relatedTarget.className === undefined
                                || d3.event.relatedTarget.className.match(tooltip.nvPointerEventsClass))) {

                            return;
                        }
                    }
                    dispatch.elementMouseout({
                        mouseX: mouseX,
                        mouseY: mouseY
                    });
                    layer.renderGuideLine(null); //hide the guideline
                    tooltip.hidden(true);
                    return;
                } else {
                    tooltip.hidden(false);
                }


                var scaleIsOrdinal = typeof xScale.rangeBands === 'function';
                var pointXValue = undefined;

                // Ordinal scale has no invert method
                if (scaleIsOrdinal) {
                    var elementIndex = d3.bisect(xScale.range(), mouseX) - 1;
                    // Check if mouseX is in the range band
                    if (xScale.range()[elementIndex] + xScale.rangeBand() >= mouseX) {
                        pointXValue = xScale.domain()[d3.bisect(xScale.range(), mouseX) - 1];
                    }
                    else {
                        dispatch.elementMouseout({
                            mouseX: mouseX,
                            mouseY: mouseY
                        });
                        layer.renderGuideLine(null); //hide the guideline
                        tooltip.hidden(true);
                        return;
                    }
                }
                else {
                    pointXValue = xScale.invert(mouseX);
                }

                dispatch.elementMousemove({
                    mouseX: mouseX,
                    mouseY: mouseY,
                    pointXValue: pointXValue
                });

                //If user double clicks the layer, fire a elementDblclick
                if (d3.event.type === "dblclick") {
                    dispatch.elementDblclick({
                        mouseX: mouseX,
                        mouseY: mouseY,
                        pointXValue: pointXValue
                    });
                }

                // if user single clicks the layer, fire elementClick
                if (d3.event.type === 'click') {
                    dispatch.elementClick({
                        mouseX: mouseX,
                        mouseY: mouseY,
                        pointXValue: pointXValue
                    });
                }

                // if user presses mouse down the layer, fire elementMouseDown
                if (d3.event.type === 'mousedown') {
                	dispatch.elementMouseDown({
                		mouseX: mouseX,
                		mouseY: mouseY,
                		pointXValue: pointXValue
                	});
                }

                // if user presses mouse down the layer, fire elementMouseUp
                if (d3.event.type === 'mouseup') {
                	dispatch.elementMouseUp({
                		mouseX: mouseX,
                		mouseY: mouseY,
                		pointXValue: pointXValue
                	});
                }
            }

            svgContainer
                .on("touchmove",mouseHandler)
                .on("mousemove",mouseHandler, true)
                .on("mouseout" ,mouseHandler,true)
                .on("mousedown" ,mouseHandler,true)
                .on("mouseup" ,mouseHandler,true)
                .on("dblclick" ,mouseHandler)
                .on("click", mouseHandler)
            ;

            layer.guideLine = null;
            //Draws a vertical guideline at the given X postion.
            layer.renderGuideLine = function(x) {
                if (!showGuideLine) return;
                if (layer.guideLine && layer.guideLine.attr("x1") === x) return;
                nv.dom.write(function() {
                    var line = wrap.select(".nv-interactiveGuideLine")
                        .selectAll("line")
                        .data((x != null) ? [nv.utils.NaNtoZero(x)] : [], String);
                    line.enter()
                        .append("line")
                        .attr("class", "nv-guideline")
                        .attr("x1", function(d) { return d;})
                        .attr("x2", function(d) { return d;})
                        .attr("y1", availableHeight)
                        .attr("y2",0);
                    line.exit().remove();
                });
            }
        });
    }

    layer.dispatch = dispatch;
    layer.tooltip = tooltip;

    layer.margin = function(_) {
        if (!arguments.length) return margin;
        margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
        margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
        return layer;
    };

    layer.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return layer;
    };

    layer.height = function(_) {
        if (!arguments.length) return height;
        height = _;
        return layer;
    };

    layer.xScale = function(_) {
        if (!arguments.length) return xScale;
        xScale = _;
        return layer;
    };

    layer.showGuideLine = function(_) {
        if (!arguments.length) return showGuideLine;
        showGuideLine = _;
        return layer;
    };

    layer.svgContainer = function(_) {
        if (!arguments.length) return svgContainer;
        svgContainer = _;
        return layer;
    };

    return layer;
};

/* Utility class that uses d3.bisect to find the index in a given array, where a search value can be inserted.
 This is different from normal bisectLeft; this function finds the nearest index to insert the search value.

 For instance, lets say your array is [1,2,3,5,10,30], and you search for 28.
 Normal d3.bisectLeft will return 4, because 28 is inserted after the number 10.  But interactiveBisect will return 5
 because 28 is closer to 30 than 10.

 Unit tests can be found in: interactiveBisectTest.html

 Has the following known issues:
 * Will not work if the data points move backwards (ie, 10,9,8,7, etc) or if the data points are in random order.
 * Won't work if there are duplicate x coordinate values.
 */
nv.interactiveBisect = function (values, searchVal, xAccessor) {
    "use strict";
    if (! (values instanceof Array)) {
        return null;
    }
    var _xAccessor;
    if (typeof xAccessor !== 'function') {
        _xAccessor = function(d) {
            return d.x;
        }
    } else {
        _xAccessor = xAccessor;
    }
    var _cmp = function(d, v) {
        // Accessors are no longer passed the index of the element along with
        // the element itself when invoked by d3.bisector.
        //
        // Starting at D3 v3.4.4, d3.bisector() started inspecting the
        // function passed to determine if it should consider it an accessor
        // or a comparator. This meant that accessors that take two arguments
        // (expecting an index as the second parameter) are treated as
        // comparators where the second argument is the search value against
        // which the first argument is compared.
        return _xAccessor(d) - v;
    };

    var bisect = d3.bisector(_cmp).left;
    var index = d3.max([0, bisect(values,searchVal) - 1]);
    var currentValue = _xAccessor(values[index]);

    if (typeof currentValue === 'undefined') {
        currentValue = index;
    }

    if (currentValue === searchVal) {
        return index; //found exact match
    }

    var nextIndex = d3.min([index+1, values.length - 1]);
    var nextValue = _xAccessor(values[nextIndex]);

    if (typeof nextValue === 'undefined') {
        nextValue = nextIndex;
    }

    if (Math.abs(nextValue - searchVal) >= Math.abs(currentValue - searchVal)) {
        return index;
    } else {
        return nextIndex
    }
};

/*
 Returns the index in the array "values" that is closest to searchVal.
 Only returns an index if searchVal is within some "threshold".
 Otherwise, returns null.
 */
nv.nearestValueIndex = function (values, searchVal, threshold) {
    "use strict";
    var yDistMax = Infinity, indexToHighlight = null;
    values.forEach(function(d,i) {
        var delta = Math.abs(searchVal - d);
        if ( d != null && delta <= yDistMax && delta < threshold) {
            yDistMax = delta;
            indexToHighlight = i;
        }
    });
    return indexToHighlight;
};

/* Model which can be instantiated to handle tooltip rendering.
 Example usage:
 var tip = nv.models.tooltip().gravity('w').distance(23)
 .data(myDataObject);

 tip();    //just invoke the returned function to render tooltip.
 */
nv.models.tooltip = function() {
    "use strict";

    /*
    Tooltip data. If data is given in the proper format, a consistent tooltip is generated.
    Example Format of data:
    {
        key: "Date",
        value: "August 2009",
        series: [
            {key: "Series 1", value: "Value 1", color: "#000"},
            {key: "Series 2", value: "Value 2", color: "#00f"}
        ]
    }
    */
    var id = "nvtooltip-" + Math.floor(Math.random() * 100000) // Generates a unique id when you create a new tooltip() object.
        ,   data = null
        ,   gravity = 'w'   // Can be 'n','s','e','w'. Determines how tooltip is positioned.
        ,   distance = 25 // Distance to offset tooltip from the mouse location.
        ,   snapDistance = 0   // Tolerance allowed before tooltip is moved from its current position (creates 'snapping' effect)
        ,   classes = null  // Attaches additional CSS classes to the tooltip DIV that is created.
        ,   hidden = true  // Start off hidden, toggle with hide/show functions below.
        ,   hideDelay = 200  // Delay (in ms) before the tooltip hides after calling hide().
        ,   tooltip = null // d3 select of the tooltip div.
        ,   lastPosition = { left: null, top: null } // Last position the tooltip was in.
        ,   enabled = true  // True -> tooltips are rendered. False -> don't render tooltips.
        ,   duration = 100 // Tooltip movement duration, in ms.
        ,   headerEnabled = true // If is to show the tooltip header.
        ,   nvPointerEventsClass = "nv-pointer-events-none" // CSS class to specify whether element should not have mouse events.
    ;

    // Format function for the tooltip values column.
    // d is value,
    // i is series index
    // p is point containing the value
    var valueFormatter = function(d, i, p) {
        return d;
    };

    // Format function for the tooltip header value.
    var headerFormatter = function(d) {
        return d;
    };

    var keyFormatter = function(d, i) {
        return d;
    };

    // By default, the tooltip model renders a beautiful table inside a DIV, returned as HTML
    // You can override this function if a custom tooltip is desired. For instance, you could directly manipulate
    // the DOM by accessing elem and returning false.
    var contentGenerator = function(d, elem) {
        if (d === null) {
            return '';
        }

        var table = d3.select(document.createElement("table"));
        if (headerEnabled) {
            var theadEnter = table.selectAll("thead")
                .data([d])
                .enter().append("thead");

            theadEnter.append("tr")
                .append("td")
                .attr("colspan", 3)
                .append("strong")
                .classed("x-value", true)
                .html(headerFormatter(d.value));
        }

        var tbodyEnter = table.selectAll("tbody")
            .data([d])
            .enter().append("tbody");

        var trowEnter = tbodyEnter.selectAll("tr")
                .data(function(p) { return p.series})
                .enter()
                .append("tr")
                .classed("highlight", function(p) { return p.highlight});

        trowEnter.append("td")
            .classed("legend-color-guide",true)
            .append("div")
            .style("background-color", function(p) { return p.color});

        trowEnter.append("td")
            .classed("key",true)
            .classed("total",function(p) { return !!p.total})
            .html(function(p, i) { return keyFormatter(p.key, i)});

        trowEnter.append("td")
            .classed("value",true)
            .html(function(p, i) { return valueFormatter(p.value, i, p) });

        trowEnter.filter(function (p,i) { return p.percent !== undefined }).append("td")
            .classed("percent", true)
            .html(function(p, i) { return "(" + d3.format('%')(p.percent) + ")" });

        trowEnter.selectAll("td").each(function(p) {
            if (p.highlight) {
                var opacityScale = d3.scale.linear().domain([0,1]).range(["#fff",p.color]);
                var opacity = 0.6;
                d3.select(this)
                    .style("border-bottom-color", opacityScale(opacity))
                    .style("border-top-color", opacityScale(opacity))
                ;
            }
        });

        var html = table.node().outerHTML;
        if (d.footer !== undefined)
            html += "<div class='footer'>" + d.footer + "</div>";
        return html;

    };

    /*
     Function that returns the position (relative to the viewport/document.body)
     the tooltip should be placed in.
     Should return: {
        left: <leftPos>,
        top: <topPos>
     }
     */
    var position = function() {
        var pos = {
            left: d3.event !== null ? d3.event.clientX : 0,
            top: d3.event !== null ? d3.event.clientY : 0
        };

        if(getComputedStyle(document.body).transform != 'none') {
            // Take the offset into account, as now the tooltip is relative
            // to document.body.
            var client = document.body.getBoundingClientRect();
            pos.left -= client.left;
            pos.top -= client.top;
        }

        return pos;
    };

    var dataSeriesExists = function(d) {
        if (d && d.series) {
            if (nv.utils.isArray(d.series)) {
                return true;
            }
            // if object, it's okay just convert to array of the object
            if (nv.utils.isObject(d.series)) {
                d.series = [d.series];
                return true;
            }
        }
        return false;
    };

    // Calculates the gravity offset of the tooltip. Parameter is position of tooltip
    // relative to the viewport.
    var calcGravityOffset = function(pos) {
        var height = tooltip.node().offsetHeight,
            width = tooltip.node().offsetWidth,
            clientWidth = document.documentElement.clientWidth, // Don't want scrollbars.
            clientHeight = document.documentElement.clientHeight, // Don't want scrollbars.
            left, top, tmp;

        // calculate position based on gravity
        switch (gravity) {
            case 'e':
                left = - width - distance;
                top = - (height / 2);
                if(pos.left + left < 0) left = distance;
                if((tmp = pos.top + top) < 0) top -= tmp;
                if((tmp = pos.top + top + height) > clientHeight) top -= tmp - clientHeight;
                break;
            case 'w':
                left = distance;
                top = - (height / 2);
                if (pos.left + left + width > clientWidth) left = - width - distance;
                if ((tmp = pos.top + top) < 0) top -= tmp;
                if ((tmp = pos.top + top + height) > clientHeight) top -= tmp - clientHeight;
                break;
            case 'n':
                left = - (width / 2) - 5; // - 5 is an approximation of the mouse's height.
                top = distance;
                if (pos.top + top + height > clientHeight) top = - height - distance;
                if ((tmp = pos.left + left) < 0) left -= tmp;
                if ((tmp = pos.left + left + width) > clientWidth) left -= tmp - clientWidth;
                break;
            case 's':
                left = - (width / 2);
                top = - height - distance;
                if (pos.top + top < 0) top = distance;
                if ((tmp = pos.left + left) < 0) left -= tmp;
                if ((tmp = pos.left + left + width) > clientWidth) left -= tmp - clientWidth;
                break;
            case 'center':
                left = - (width / 2);
                top = - (height / 2);
                break;
            default:
                left = 0;
                top = 0;
                break;
        }

        return { 'left': left, 'top': top };
    };

    /*
     Positions the tooltip in the correct place, as given by the position() function.
     */
    var positionTooltip = function() {
        nv.dom.read(function() {
            var pos = position(),
                gravityOffset = calcGravityOffset(pos),
                left = pos.left + gravityOffset.left,
                top = pos.top + gravityOffset.top;

            // delay hiding a bit to avoid flickering
            if (hidden) {
                tooltip
                    .interrupt()
                    .transition()
                    .delay(hideDelay)
                    .duration(0)
                    .style('opacity', 0);
            } else {
                // using tooltip.style('transform') returns values un-usable for tween
                var old_translate = 'translate(' + lastPosition.left + 'px, ' + lastPosition.top + 'px)';
                var new_translate = 'translate(' + Math.round(left) + 'px, ' + Math.round(top) + 'px)';
                var translateInterpolator = d3.interpolateString(old_translate, new_translate);
                var is_hidden = tooltip.style('opacity') < 0.1;

                tooltip
                    .interrupt() // cancel running transitions
                    .transition()
                    .duration(is_hidden ? 0 : duration)
                    // using tween since some versions of d3 can't auto-tween a translate on a div
                    .styleTween('transform', function (d) {
                        return translateInterpolator;
                    }, 'important')
                    // Safari has its own `-webkit-transform` and does not support `transform`
                    .styleTween('-webkit-transform', function (d) {
                        return translateInterpolator;
                    })
                    .style('-ms-transform', new_translate)
                    .style('opacity', 1);
            }

            lastPosition.left = left;
            lastPosition.top = top;
        });
    };

    // Creates new tooltip container, or uses existing one on DOM.
    function initTooltip() {
        if (!tooltip || !tooltip.node()) {
            // Create new tooltip div if it doesn't exist on DOM.

            var data = [1];
            tooltip = d3.select(document.body).select('#'+id).data(data);

            tooltip.enter().append('div')
                   .attr("class", "nvtooltip " + (classes ? classes : "xy-tooltip"))
                   .attr("id", id)
                   .style("top", 0).style("left", 0)
                   .style('opacity', 0)
                   .style('position', 'fixed')
                   .selectAll("div, table, td, tr").classed(nvPointerEventsClass, true)
                   .classed(nvPointerEventsClass, true);

            tooltip.exit().remove()
        }
    }

    // Draw the tooltip onto the DOM.
    function nvtooltip() {
        if (!enabled) return;
        if (!dataSeriesExists(data)) return;

        nv.dom.write(function () {
            initTooltip();
            // Generate data and set it into tooltip.
            // Bonus - If you override contentGenerator and return false, you can use something like
            //         Angular, React or Knockout to bind the data for your tooltip directly to the DOM.
            var newContent = contentGenerator(data, tooltip.node());
            if (newContent) {
                tooltip.node().innerHTML = newContent;
            }

            positionTooltip();
        });

        return nvtooltip;
    }

    nvtooltip.nvPointerEventsClass = nvPointerEventsClass;
    nvtooltip.options = nv.utils.optionsFunc.bind(nvtooltip);

    nvtooltip._options = Object.create({}, {
        // simple read/write options
        duration: {get: function(){return duration;}, set: function(_){duration=_;}},
        gravity: {get: function(){return gravity;}, set: function(_){gravity=_;}},
        distance: {get: function(){return distance;}, set: function(_){distance=_;}},
        snapDistance: {get: function(){return snapDistance;}, set: function(_){snapDistance=_;}},
        classes: {get: function(){return classes;}, set: function(_){classes=_;}},
        enabled: {get: function(){return enabled;}, set: function(_){enabled=_;}},
        hideDelay: {get: function(){return hideDelay;}, set: function(_){hideDelay=_;}},
        contentGenerator: {get: function(){return contentGenerator;}, set: function(_){contentGenerator=_;}},
        valueFormatter: {get: function(){return valueFormatter;}, set: function(_){valueFormatter=_;}},
        headerFormatter: {get: function(){return headerFormatter;}, set: function(_){headerFormatter=_;}},
        keyFormatter: {get: function(){return keyFormatter;}, set: function(_){keyFormatter=_;}},
        headerEnabled: {get: function(){return headerEnabled;}, set: function(_){headerEnabled=_;}},
        position: {get: function(){return position;}, set: function(_){position=_;}},

        // Deprecated options
        chartContainer: {get: function(){return document.body;}, set: function(_){
            // deprecated after 1.8.3
            nv.deprecated('chartContainer', 'feature removed after 1.8.3');
        }},
        fixedTop: {get: function(){return null;}, set: function(_){
            // deprecated after 1.8.1
            nv.deprecated('fixedTop', 'feature removed after 1.8.1');
        }},
        offset: {get: function(){return {left: 0, top: 0};}, set: function(_){
            // deprecated after 1.8.1
            nv.deprecated('offset', 'use chart.tooltip.distance() instead');
        }},

        // options with extra logic
        hidden: {get: function(){return hidden;}, set: function(_){
            if (hidden != _) {
                hidden = !!_;
                nvtooltip();
            }
        }},
        data: {get: function(){return data;}, set: function(_){
            // if showing a single data point, adjust data format with that
            if (_.point) {
                _.value = _.point.x;
                _.series = _.series || {};
                _.series.value = _.point.y;
                _.series.color = _.point.color || _.series.color;
            }
            data = _;
        }},

        // read only properties
        node: {get: function(){return tooltip.node();}, set: function(_){}},
        id: {get: function(){return id;}, set: function(_){}}
    });

    nv.utils.initOptions(nvtooltip);
    return nvtooltip;
};


/*
Gets the browser window size

Returns object with height and width properties
 */
nv.utils.windowSize = function() {
    // Sane defaults
    var size = {width: 640, height: 480};

    // Most recent browsers use
    if (window.innerWidth && window.innerHeight) {
        size.width = window.innerWidth;
        size.height = window.innerHeight;
        return (size);
    }

    // IE can use depending on mode it is in
    if (document.compatMode=='CSS1Compat' &&
        document.documentElement &&
        document.documentElement.offsetWidth ) {

        size.width = document.documentElement.offsetWidth;
        size.height = document.documentElement.offsetHeight;
        return (size);
    }

    // Earlier IE uses Doc.body
    if (document.body && document.body.offsetWidth) {
        size.width = document.body.offsetWidth;
        size.height = document.body.offsetHeight;
        return (size);
    }

    return (size);
};


/* handle dumb browser quirks...  isinstance breaks if you use frames
typeof returns 'object' for null, NaN is a number, etc.
 */
nv.utils.isArray = Array.isArray;
nv.utils.isObject = function(a) {
    return a !== null && typeof a === 'object';
};
nv.utils.isFunction = function(a) {
    return typeof a === 'function';
};
nv.utils.isDate = function(a) {
    return toString.call(a) === '[object Date]';
};
nv.utils.isNumber = function(a) {
    return !isNaN(a) && typeof a === 'number';
};


/*
Binds callback function to run when window is resized
 */
nv.utils.windowResize = function(handler) {
    if (window.addEventListener) {
        window.addEventListener('resize', handler);
    } else {
        nv.log("ERROR: Failed to bind to window.resize with: ", handler);
    }
    // return object with clear function to remove the single added callback.
    return {
        callback: handler,
        clear: function() {
            window.removeEventListener('resize', handler);
        }
    }
};


/*
Backwards compatible way to implement more d3-like coloring of graphs.
Can take in nothing, an array, or a function/scale
To use a normal scale, get the range and pass that because we must be able
to take two arguments and use the index to keep backward compatibility
*/
nv.utils.getColor = function(color) {
    //if you pass in nothing, get default colors back
    if (color === undefined) {
        return nv.utils.defaultColor();

    //if passed an array, turn it into a color scale
    } else if(nv.utils.isArray(color)) {
        var color_scale = d3.scale.ordinal().range(color);
        return function(d, i) {
            var key = i === undefined ? d : i;
            return d.color || color_scale(key);
        };

    //if passed a function or scale, return it, or whatever it may be
    //external libs, such as angularjs-nvd3-directives use this
    } else {
        //can't really help it if someone passes rubbish as color
        return color;
    }
};


/*
Default color chooser uses a color scale of 20 colors from D3
 https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors
 */
nv.utils.defaultColor = function() {
    // get range of the scale so we'll turn it into our own function.
    return nv.utils.getColor(d3.scale.category20().range());
};


/*
Returns a color function that takes the result of 'getKey' for each series and
looks for a corresponding color from the dictionary
*/
nv.utils.customTheme = function(dictionary, getKey, defaultColors) {
    // use default series.key if getKey is undefined
    getKey = getKey || function(series) { return series.key };
    defaultColors = defaultColors || d3.scale.category20().range();

    // start at end of default color list and walk back to index 0
    var defIndex = defaultColors.length;

    return function(series, index) {
        var key = getKey(series);
        if (nv.utils.isFunction(dictionary[key])) {
            return dictionary[key]();
        } else if (dictionary[key] !== undefined) {
            return dictionary[key];
        } else {
            // no match in dictionary, use a default color
            if (!defIndex) {
                // used all the default colors, start over
                defIndex = defaultColors.length;
            }
            defIndex = defIndex - 1;
            return defaultColors[defIndex];
        }
    };
};


/*
From the PJAX example on d3js.org, while this is not really directly needed
it's a very cool method for doing pjax, I may expand upon it a little bit,
open to suggestions on anything that may be useful
*/
nv.utils.pjax = function(links, content) {

    var load = function(href) {
        d3.html(href, function(fragment) {
            var target = d3.select(content).node();
            target.parentNode.replaceChild(
                d3.select(fragment).select(content).node(),
                target);
            nv.utils.pjax(links, content);
        });
    };

    d3.selectAll(links).on("click", function() {
        history.pushState(this.href, this.textContent, this.href);
        load(this.href);
        d3.event.preventDefault();
    });

    d3.select(window).on("popstate", function() {
        if (d3.event.state) {
            load(d3.event.state);
        }
    });
};


/*
For when we want to approximate the width in pixels for an SVG:text element.
Most common instance is when the element is in a display:none; container.
Forumla is : text.length * font-size * constant_factor
*/
nv.utils.calcApproxTextWidth = function (svgTextElem) {
    if (nv.utils.isFunction(svgTextElem.style) && nv.utils.isFunction(svgTextElem.text)) {
        var fontSize = parseInt(svgTextElem.style("font-size").replace("px",""), 10);
        var textLength = svgTextElem.text().length;
        return nv.utils.NaNtoZero(textLength * fontSize * 0.5);
    }
    return 0;
};


/*
Numbers that are undefined, null or NaN, convert them to zeros.
*/
nv.utils.NaNtoZero = function(n) {
    if (!nv.utils.isNumber(n)
        || isNaN(n)
        || n === null
        || n === Infinity
        || n === -Infinity) {

        return 0;
    }
    return n;
};

/*
Add a way to watch for d3 transition ends to d3
*/
d3.selection.prototype.watchTransition = function(renderWatch){
    var args = [this].concat([].slice.call(arguments, 1));
    return renderWatch.transition.apply(renderWatch, args);
};


/*
Helper object to watch when d3 has rendered something
*/
nv.utils.renderWatch = function(dispatch, duration) {
    if (!(this instanceof nv.utils.renderWatch)) {
        return new nv.utils.renderWatch(dispatch, duration);
    }

    var _duration = duration !== undefined ? duration : 250;
    var renderStack = [];
    var self = this;

    this.models = function(models) {
        models = [].slice.call(arguments, 0);
        models.forEach(function(model){
            model.__rendered = false;
            (function(m){
                m.dispatch.on('renderEnd', function(arg){
                    m.__rendered = true;
                    self.renderEnd('model');
                });
            })(model);

            if (renderStack.indexOf(model) < 0) {
                renderStack.push(model);
            }
        });
    return this;
    };

    this.reset = function(duration) {
        if (duration !== undefined) {
            _duration = duration;
        }
        renderStack = [];
    };

    this.transition = function(selection, args, duration) {
        args = arguments.length > 1 ? [].slice.call(arguments, 1) : [];

        if (args.length > 1) {
            duration = args.pop();
        } else {
            duration = _duration !== undefined ? _duration : 250;
        }
        selection.__rendered = false;

        if (renderStack.indexOf(selection) < 0) {
            renderStack.push(selection);
        }

        if (duration === 0) {
            selection.__rendered = true;
            selection.delay = function() { return this; };
            selection.duration = function() { return this; };
            return selection;
        } else {
            if (selection.length === 0) {
                selection.__rendered = true;
            } else if (selection.every( function(d){ return !d.length; } )) {
                selection.__rendered = true;
            } else {
                selection.__rendered = false;
            }

            var n = 0;
            return selection
                .transition()
                .duration(duration)
                .each(function(){ ++n; })
                .each('end', function(d, i) {
                    if (--n === 0) {
                        selection.__rendered = true;
                        self.renderEnd.apply(this, args);
                    }
                });
        }
    };

    this.renderEnd = function() {
        if (renderStack.every( function(d){ return d.__rendered; } )) {
            renderStack.forEach( function(d){ d.__rendered = false; });
            dispatch.renderEnd.apply(this, arguments);
        }
    }

};


/*
Takes multiple objects and combines them into the first one (dst)
example:  nv.utils.deepExtend({a: 1}, {a: 2, b: 3}, {c: 4});
gives:  {a: 2, b: 3, c: 4}
*/
nv.utils.deepExtend = function(dst){
    var sources = arguments.length > 1 ? [].slice.call(arguments, 1) : [];
    sources.forEach(function(source) {
        for (var key in source) {
            var isArray = nv.utils.isArray(dst[key]);
            var isObject = nv.utils.isObject(dst[key]);
            var srcObj = nv.utils.isObject(source[key]);

            if (isObject && !isArray && srcObj) {
                nv.utils.deepExtend(dst[key], source[key]);
            } else {
                dst[key] = source[key];
            }
        }
    });
};


/*
state utility object, used to track d3 states in the models
*/
nv.utils.state = function(){
    if (!(this instanceof nv.utils.state)) {
        return new nv.utils.state();
    }
    var state = {};
    var _self = this;
    var _setState = function(){};
    var _getState = function(){ return {}; };
    var init = null;
    var changed = null;

    this.dispatch = d3.dispatch('change', 'set');

    this.dispatch.on('set', function(state){
        _setState(state, true);
    });

    this.getter = function(fn){
        _getState = fn;
        return this;
    };

    this.setter = function(fn, callback) {
        if (!callback) {
            callback = function(){};
        }
        _setState = function(state, update){
            fn(state);
            if (update) {
                callback();
            }
        };
        return this;
    };

    this.init = function(state){
        init = init || {};
        nv.utils.deepExtend(init, state);
    };

    var _set = function(){
        var settings = _getState();

        if (JSON.stringify(settings) === JSON.stringify(state)) {
            return false;
        }

        for (var key in settings) {
            if (state[key] === undefined) {
                state[key] = {};
            }
            state[key] = settings[key];
            changed = true;
        }
        return true;
    };

    this.update = function(){
        if (init) {
            _setState(init, false);
            init = null;
        }
        if (_set.call(this)) {
            this.dispatch.change(state);
        }
    };

};


/*
Snippet of code you can insert into each nv.models.* to give you the ability to
do things like:
chart.options({
  showXAxis: true,
  tooltips: true
});

To enable in the chart:
chart.options = nv.utils.optionsFunc.bind(chart);
*/
nv.utils.optionsFunc = function(args) {
    if (args) {
        d3.map(args).forEach((function(key,value) {
            if (nv.utils.isFunction(this[key])) {
                this[key](value);
            }
        }).bind(this));
    }
    return this;
};


/*
numTicks:  requested number of ticks
data:  the chart data

returns the number of ticks to actually use on X axis, based on chart data
to avoid duplicate ticks with the same value
*/
nv.utils.calcTicksX = function(numTicks, data) {
    // find max number of values from all data streams
    var numValues = 1;
    var i = 0;
    for (i; i < data.length; i += 1) {
        var stream_len = data[i] && data[i].values ? data[i].values.length : 0;
        numValues = stream_len > numValues ? stream_len : numValues;
    }
    nv.log("Requested number of ticks: ", numTicks);
    nv.log("Calculated max values to be: ", numValues);
    // make sure we don't have more ticks than values to avoid duplicates
    numTicks = numTicks > numValues ? numTicks = numValues - 1 : numTicks;
    // make sure we have at least one tick
    numTicks = numTicks < 1 ? 1 : numTicks;
    // make sure it's an integer
    numTicks = Math.floor(numTicks);
    nv.log("Calculating tick count as: ", numTicks);
    return numTicks;
};


/*
returns number of ticks to actually use on Y axis, based on chart data
*/
nv.utils.calcTicksY = function(numTicks, data) {
    // currently uses the same logic but we can adjust here if needed later
    return nv.utils.calcTicksX(numTicks, data);
};


/*
Add a particular option from an options object onto chart
Options exposed on a chart are a getter/setter function that returns chart
on set to mimic typical d3 option chaining, e.g. svg.option1('a').option2('b');

option objects should be generated via Object.create() to provide
the option of manipulating data via get/set functions.
*/
nv.utils.initOption = function(chart, name) {
    // if it's a call option, just call it directly, otherwise do get/set
    if (chart._calls && chart._calls[name]) {
        chart[name] = chart._calls[name];
    } else {
        chart[name] = function (_) {
            if (!arguments.length) return chart._options[name];
            chart._overrides[name] = true;
            chart._options[name] = _;
            return chart;
        };
        // calling the option as _option will ignore if set by option already
        // so nvd3 can set options internally but the stop if set manually
        chart['_' + name] = function(_) {
            if (!arguments.length) return chart._options[name];
            if (!chart._overrides[name]) {
                chart._options[name] = _;
            }
            return chart;
        }
    }
};


/*
Add all options in an options object to the chart
*/
nv.utils.initOptions = function(chart) {
    chart._overrides = chart._overrides || {};
    var ops = Object.getOwnPropertyNames(chart._options || {});
    var calls = Object.getOwnPropertyNames(chart._calls || {});
    ops = ops.concat(calls);
    for (var i in ops) {
        nv.utils.initOption(chart, ops[i]);
    }
};


/*
Inherit options from a D3 object
d3.rebind makes calling the function on target actually call it on source
Also use _d3options so we can track what we inherit for documentation and chained inheritance
*/
nv.utils.inheritOptionsD3 = function(target, d3_source, oplist) {
    target._d3options = oplist.concat(target._d3options || []);
    // Find unique d3 options (string) and update d3options
    target._d3options = (target._d3options || []).filter(function(item, i, ar){ return ar.indexOf(item) === i; });
    oplist.unshift(d3_source);
    oplist.unshift(target);
    d3.rebind.apply(this, oplist);
};


/*
Remove duplicates from an array
*/
nv.utils.arrayUnique = function(a) {
    return a.sort().filter(function(item, pos) {
        return !pos || item != a[pos - 1];
    });
};


/*
Keeps a list of custom symbols to draw from in addition to d3.svg.symbol
Necessary since d3 doesn't let you extend its list -_-
Add new symbols by doing nv.utils.symbols.set('name', function(size){...});
*/
nv.utils.symbolMap = d3.map();


/*
Replaces d3.svg.symbol so that we can look both there and our own map
 */
nv.utils.symbol = function() {
    var type,
        size = 64;
    function symbol(d,i) {
        var t = type.call(this,d,i);
        var s = size.call(this,d,i);
        if (d3.svg.symbolTypes.indexOf(t) !== -1) {
            return d3.svg.symbol().type(t).size(s)();
        } else {
            return nv.utils.symbolMap.get(t)(s);
        }
    }
    symbol.type = function(_) {
        if (!arguments.length) return type;
        type = d3.functor(_);
        return symbol;
    };
    symbol.size = function(_) {
        if (!arguments.length) return size;
        size = d3.functor(_);
        return symbol;
    };
    return symbol;
};


/*
Inherit option getter/setter functions from source to target
d3.rebind makes calling the function on target actually call it on source
Also track via _inherited and _d3options so we can track what we inherit
for documentation generation purposes and chained inheritance
*/
nv.utils.inheritOptions = function(target, source) {
    // inherit all the things
    var ops = Object.getOwnPropertyNames(source._options || {});
    var calls = Object.getOwnPropertyNames(source._calls || {});
    var inherited = source._inherited || [];
    var d3ops = source._d3options || [];
    var args = ops.concat(calls).concat(inherited).concat(d3ops);
    args.unshift(source);
    args.unshift(target);
    d3.rebind.apply(this, args);
    // pass along the lists to keep track of them, don't allow duplicates
    target._inherited = nv.utils.arrayUnique(ops.concat(calls).concat(inherited).concat(ops).concat(target._inherited || []));
    target._d3options = nv.utils.arrayUnique(d3ops.concat(target._d3options || []));
};


/*
Runs common initialize code on the svg before the chart builds
*/
nv.utils.initSVG = function(svg) {
    svg.classed({'nvd3-svg':true});
};


/*
Sanitize and provide default for the container height.
*/
nv.utils.sanitizeHeight = function(height, container) {
    return (height || parseInt(container.style('height'), 10) || 400);
};


/*
Sanitize and provide default for the container width.
*/
nv.utils.sanitizeWidth = function(width, container) {
    return (width || parseInt(container.style('width'), 10) || 960);
};


/*
Calculate the available height for a chart.
*/
nv.utils.availableHeight = function(height, container, margin) {
    return Math.max(0,nv.utils.sanitizeHeight(height, container) - margin.top - margin.bottom);
};

/*
Calculate the available width for a chart.
*/
nv.utils.availableWidth = function(width, container, margin) {
    return Math.max(0,nv.utils.sanitizeWidth(width, container) - margin.left - margin.right);
};

/*
Clear any rendered chart components and display a chart's 'noData' message
*/
nv.utils.noData = function(chart, container) {
    var opt = chart.options(),
        margin = opt.margin(),
        noData = opt.noData(),
        data = (noData == null) ? ["No Data Available."] : [noData],
        height = nv.utils.availableHeight(null, container, margin),
        width = nv.utils.availableWidth(null, container, margin),
        x = margin.left + width/2,
        y = margin.top + height/2;

    //Remove any previously created chart components
    container.selectAll('g').remove();

    var noDataText = container.selectAll('.nv-noData').data(data);

    noDataText.enter().append('text')
        .attr('class', 'nvd3 nv-noData')
        .attr('dy', '-.7em')
        .style('text-anchor', 'middle');

    noDataText
        .attr('x', x)
        .attr('y', y)
        .text(function(t){ return t; });
};

/*
 Wrap long labels.
 */
nv.utils.wrapTicks = function (text, width) {
    text.each(function() {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.1,
            y = text.attr("y"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
};

/*
Check equality of 2 array
*/
nv.utils.arrayEquals = function (array1, array2) {
    if (array1 === array2)
        return true;

    if (!array1 || !array2)
        return false;

    // compare lengths - can save a lot of time
    if (array1.length != array2.length)
        return false;

    for (var i = 0,
        l = array1.length; i < l; i++) {
        // Check if we have nested arrays
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
            // recurse into the nested arrays
            if (!nv.arrayEquals(array1[i], array2[i]))
                return false;
        } else if (array1[i] != array2[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
};

/*
 Check if a point within an arc
 */
nv.utils.pointIsInArc = function(pt, ptData, d3Arc) {
    // Center of the arc is assumed to be 0,0
    // (pt.x, pt.y) are assumed to be relative to the center
    var r1 = d3Arc.innerRadius()(ptData), // Note: Using the innerRadius
      r2 = d3Arc.outerRadius()(ptData),
      theta1 = d3Arc.startAngle()(ptData),
      theta2 = d3Arc.endAngle()(ptData);

    var dist = pt.x * pt.x + pt.y * pt.y,
      angle = Math.atan2(pt.x, -pt.y); // Note: different coordinate system.

    angle = (angle < 0) ? (angle + Math.PI * 2) : angle;

    return (r1 * r1 <= dist) && (dist <= r2 * r2) &&
      (theta1 <= angle) && (angle <= theta2);
};

nv.models.axis = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var axis = d3.svg.axis();
    var scale = d3.scale.linear();

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 75 //only used for tickLabel currently
        , height = 60 //only used for tickLabel currently
        , axisLabelText = null
        , showMaxMin = true //TODO: showMaxMin should be disabled on all ordinal scaled axes
        , rotateLabels = 0
        , rotateYLabel = true
        , staggerLabels = false
        , isOrdinal = false
        , ticks = null
        , axisLabelDistance = 0
        , fontSize = undefined
        , duration = 250
        , dispatch = d3.dispatch('renderEnd')
        , tickFormatMaxMin
        ;
    axis
        .scale(scale)
        .orient('bottom')
        .tickFormat(function(d) { return d })
    ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var scale0;
    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var container = d3.select(this);
            nv.utils.initSVG(container);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-axis').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-axis');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            if (ticks !== null)
                axis.ticks(ticks);
            else if (axis.orient() == 'top' || axis.orient() == 'bottom')
                axis.ticks(Math.abs(scale.range()[1] - scale.range()[0]) / 100);

            //TODO: consider calculating width/height based on whether or not label is added, for reference in charts using this component
            g.watchTransition(renderWatch, 'axis').call(axis);

            scale0 = scale0 || axis.scale();

            var fmt = axis.tickFormat();
            if (fmt == null) {
                fmt = scale0.tickFormat();
            }

            var axisLabel = g.selectAll('text.nv-axislabel')
                .data([axisLabelText || null]);
            axisLabel.exit().remove();

            //only skip when fontSize is undefined so it can be cleared with a null or blank string
            if (fontSize !== undefined) {
                g.selectAll('g').select("text").style('font-size', fontSize);
            }

            var xLabelMargin;
            var axisMaxMin;
            var w;
            switch (axis.orient()) {
                case 'top':
                    axisLabel.enter().append('text').attr('class', 'nv-axislabel');
                  w = 0;
                  if (scale.range().length === 1) {
                    w = isOrdinal ? scale.range()[0] * 2 + scale.rangeBand() : 0;
                  } else if (scale.range().length === 2) {
                    w = isOrdinal ? scale.range()[0] + scale.range()[1] + scale.rangeBand() : scale.range()[1];
                  } else if ( scale.range().length > 2){
                    w = scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]);
                  };
                    axisLabel
                        .attr('text-anchor', 'middle')
                        .attr('y', 0)
                        .attr('x', w/2);
                    if (showMaxMin) {
                        axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                            .data(scale.domain());
                        axisMaxMin.enter().append('g').attr('class',function(d,i){
                                return ['nv-axisMaxMin','nv-axisMaxMin-x',(i == 0 ? 'nv-axisMin-x':'nv-axisMax-x')].join(' ')
                        }).append('text');
                        axisMaxMin.exit().remove();
                        axisMaxMin
                            .attr('transform', function(d,i) {
                                return 'translate(' + nv.utils.NaNtoZero(scale(d)) + ',0)'
                            })
                            .select('text')
                            .attr('dy', '-0.5em')
                            .attr('y', -axis.tickPadding())
                            .attr('text-anchor', 'middle')
                            .text(function(d,i) {
                                var formatter = tickFormatMaxMin || fmt;
                                var v = formatter(d);
                                return ('' + v).match('NaN') ? '' : v;
                            });
                        axisMaxMin.watchTransition(renderWatch, 'min-max top')
                            .attr('transform', function(d,i) {
                                return 'translate(' + nv.utils.NaNtoZero(scale.range()[i]) + ',0)'
                            });
                    }
                    break;
                case 'bottom':
                    xLabelMargin = axisLabelDistance + 36;
                    var maxTextWidth = 30;
                    var textHeight = 0;
                    var xTicks = g.selectAll('g').select("text");
                    var rotateLabelsRule = '';
                    if (rotateLabels%360) {
                        //Reset transform on ticks so textHeight can be calculated correctly
                        xTicks.attr('transform', '');
                        //Calculate the longest xTick width
                        xTicks.each(function(d,i){
                            var box = this.getBoundingClientRect();
                            var width = box.width;
                            textHeight = box.height;
                            if(width > maxTextWidth) maxTextWidth = width;
                        });
                        rotateLabelsRule = 'rotate(' + rotateLabels + ' 0,' + (textHeight/2 + axis.tickPadding()) + ')';
                        //Convert to radians before calculating sin. Add 30 to margin for healthy padding.
                        var sin = Math.abs(Math.sin(rotateLabels*Math.PI/180));
                        xLabelMargin = (sin ? sin*maxTextWidth : maxTextWidth)+30;
                        //Rotate all xTicks
                        xTicks
                            .attr('transform', rotateLabelsRule)
                            .style('text-anchor', rotateLabels%360 > 0 ? 'start' : 'end');
                    } else {
                        if (staggerLabels) {
                            xTicks
                                .attr('transform', function(d,i) {
                                    return 'translate(0,' + (i % 2 == 0 ? '0' : '12') + ')'
                                });
                        } else {
                            xTicks.attr('transform', "translate(0,0)");
                        }
                    }
                    axisLabel.enter().append('text').attr('class', 'nv-axislabel');
                    w = 0;
                    if (scale.range().length === 1) {
                        w = isOrdinal ? scale.range()[0] * 2 + scale.rangeBand() : 0;
                    } else if (scale.range().length === 2) {
                        w = isOrdinal ? scale.range()[0] + scale.range()[1] + scale.rangeBand() : scale.range()[1];
                    } else if ( scale.range().length > 2){
                        w = scale.range()[scale.range().length-1]+(scale.range()[1]-scale.range()[0]);
                    };
                    axisLabel
                        .attr('text-anchor', 'middle')
                        .attr('y', xLabelMargin)
                        .attr('x', w/2);
                    if (showMaxMin) {
                        //if (showMaxMin && !isOrdinal) {
                        axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                            //.data(scale.domain())
                            .data([scale.domain()[0], scale.domain()[scale.domain().length - 1]]);
                        axisMaxMin.enter().append('g').attr('class',function(d,i){
                                return ['nv-axisMaxMin','nv-axisMaxMin-x',(i == 0 ? 'nv-axisMin-x':'nv-axisMax-x')].join(' ')
                        }).append('text');
                        axisMaxMin.exit().remove();
                        axisMaxMin
                            .attr('transform', function(d,i) {
                                return 'translate(' + nv.utils.NaNtoZero((scale(d) + (isOrdinal ? scale.rangeBand() / 2 : 0))) + ',0)'
                            })
                            .select('text')
                            .attr('dy', '.71em')
                            .attr('y', axis.tickPadding())
                            .attr('transform', rotateLabelsRule)
                            .style('text-anchor', rotateLabels ? (rotateLabels%360 > 0 ? 'start' : 'end') : 'middle')
                            .text(function(d,i) {
                                var formatter = tickFormatMaxMin || fmt;
                                var v = formatter(d);
                                return ('' + v).match('NaN') ? '' : v;
                            });
                        axisMaxMin.watchTransition(renderWatch, 'min-max bottom')
                            .attr('transform', function(d,i) {
                                return 'translate(' + nv.utils.NaNtoZero((scale(d) + (isOrdinal ? scale.rangeBand() / 2 : 0))) + ',0)'
                            });
                    }

                    break;
                case 'right':
                    axisLabel.enter().append('text').attr('class', 'nv-axislabel');
                    axisLabel
                        .style('text-anchor', rotateYLabel ? 'middle' : 'begin')
                        .attr('transform', rotateYLabel ? 'rotate(90)' : '')
                        .attr('y', rotateYLabel ? (-Math.max(margin.right, width) + 12 - (axisLabelDistance || 0)) : -10) //TODO: consider calculating this based on largest tick width... OR at least expose this on chart
                        .attr('x', rotateYLabel ? (d3.max(scale.range()) / 2) : axis.tickPadding());
                    if (showMaxMin) {
                        axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                            .data(scale.domain());
                       	axisMaxMin.enter().append('g').attr('class',function(d,i){
                                return ['nv-axisMaxMin','nv-axisMaxMin-y',(i == 0 ? 'nv-axisMin-y':'nv-axisMax-y')].join(' ')
                        }).append('text')
                            .style('opacity', 0);
                        axisMaxMin.exit().remove();
                        axisMaxMin
                            .attr('transform', function(d,i) {
                                return 'translate(0,' + nv.utils.NaNtoZero(scale(d)) + ')'
                            })
                            .select('text')
                            .attr('dy', '.32em')
                            .attr('y', 0)
                            .attr('x', axis.tickPadding())
                            .style('text-anchor', 'start')
                            .text(function(d, i) {
                                var formatter = tickFormatMaxMin || fmt;
                                var v = formatter(d);
                                return ('' + v).match('NaN') ? '' : v;
                            });
                        axisMaxMin.watchTransition(renderWatch, 'min-max right')
                            .attr('transform', function(d,i) {
                                return 'translate(0,' + nv.utils.NaNtoZero(scale.range()[i]) + ')'
                            })
                            .select('text')
                            .style('opacity', 1);
                    }
                    break;
                case 'left':
                    /*
                     //For dynamically placing the label. Can be used with dynamically-sized chart axis margins
                     var yTicks = g.selectAll('g').select("text");
                     yTicks.each(function(d,i){
                     var labelPadding = this.getBoundingClientRect().width + axis.tickPadding() + 16;
                     if(labelPadding > width) width = labelPadding;
                     });
                     */
                    axisLabel.enter().append('text').attr('class', 'nv-axislabel');
                    axisLabel
                        .style('text-anchor', rotateYLabel ? 'middle' : 'end')
                        .attr('transform', rotateYLabel ? 'rotate(-90)' : '')
                        .attr('y', rotateYLabel ? (-Math.max(margin.left, width) + 25 - (axisLabelDistance || 0)) : -10)
                        .attr('x', rotateYLabel ? (-d3.max(scale.range()) / 2) : -axis.tickPadding());
                    if (showMaxMin) {
                        axisMaxMin = wrap.selectAll('g.nv-axisMaxMin')
                            .data(scale.domain());
                        axisMaxMin.enter().append('g').attr('class',function(d,i){
                                return ['nv-axisMaxMin','nv-axisMaxMin-y',(i == 0 ? 'nv-axisMin-y':'nv-axisMax-y')].join(' ')
                        }).append('text')
                            .style('opacity', 0);
                        axisMaxMin.exit().remove();
                        axisMaxMin
                            .attr('transform', function(d,i) {
                                return 'translate(0,' + nv.utils.NaNtoZero(scale0(d)) + ')'
                            })
                            .select('text')
                            .attr('dy', '.32em')
                            .attr('y', 0)
                            .attr('x', -axis.tickPadding())
                            .attr('text-anchor', 'end')
                            .text(function(d,i) {
                                var formatter = tickFormatMaxMin || fmt;
                                var v = formatter(d);
                                return ('' + v).match('NaN') ? '' : v;
                            });
                        axisMaxMin.watchTransition(renderWatch, 'min-max right')
                            .attr('transform', function(d,i) {
                                return 'translate(0,' + nv.utils.NaNtoZero(scale.range()[i]) + ')'
                            })
                            .select('text')
                            .style('opacity', 1);
                    }
                    break;
            }
            axisLabel.text(function(d) { return d });

            if (showMaxMin && (axis.orient() === 'left' || axis.orient() === 'right')) {
                //check if max and min overlap other values, if so, hide the values that overlap
                g.selectAll('g') // the g's wrapping each tick
                    .each(function(d,i) {
                        d3.select(this).select('text').attr('opacity', 1);
                        if (scale(d) < scale.range()[1] + 10 || scale(d) > scale.range()[0] - 10) { // 10 is assuming text height is 16... if d is 0, leave it!
                            if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
                                d3.select(this).attr('opacity', 0);

                            d3.select(this).select('text').attr('opacity', 0); // Don't remove the ZERO line!!
                        }
                    });

                //if Max and Min = 0 only show min, Issue #281
                if (scale.domain()[0] == scale.domain()[1] && scale.domain()[0] == 0) {
                    wrap.selectAll('g.nv-axisMaxMin').style('opacity', function (d, i) {
                        return !i ? 1 : 0
                    });
                }
            }

            if (showMaxMin && (axis.orient() === 'top' || axis.orient() === 'bottom')) {
                var maxMinRange = [];
                wrap.selectAll('g.nv-axisMaxMin')
                    .each(function(d,i) {
                        try {
                            if (i) // i== 1, max position
                                maxMinRange.push(scale(d) - this.getBoundingClientRect().width - 4);  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
                            else // i==0, min position
                                maxMinRange.push(scale(d) + this.getBoundingClientRect().width + 4)
                        }catch (err) {
                            if (i) // i== 1, max position
                                maxMinRange.push(scale(d) - 4);  //assuming the max and min labels are as wide as the next tick (with an extra 4 pixels just in case)
                            else // i==0, min position
                                maxMinRange.push(scale(d) + 4);
                        }
                    });
                // the g's wrapping each tick
                g.selectAll('g').each(function(d, i) {
                    if (scale(d) < maxMinRange[0] || scale(d) > maxMinRange[1]) {
                        if (d > 1e-10 || d < -1e-10) // accounts for minor floating point errors... though could be problematic if the scale is EXTREMELY SMALL
                            d3.select(this).remove();
                        else
                            d3.select(this).select('text').remove(); // Don't remove the ZERO line!!
                    }
                });
            }

            //Highlight zero tick line
            g.selectAll('.tick')
                .filter(function (d) {
                    /*
                    The filter needs to return only ticks at or near zero.
                    Numbers like 0.00001 need to count as zero as well,
                    and the arithmetic trick below solves that.
                    */
                    return !parseFloat(Math.round(d * 100000) / 1000000) && (d !== undefined)
                })
                .classed('zero', true);

            //store old scales for use in transitions on update
            scale0 = scale.copy();

        });

        renderWatch.renderEnd('axis immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.axis = axis;
    chart.dispatch = dispatch;

    chart.options = nv.utils.optionsFunc.bind(chart);
    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        axisLabelDistance: {get: function(){return axisLabelDistance;}, set: function(_){axisLabelDistance=_;}},
        staggerLabels:     {get: function(){return staggerLabels;}, set: function(_){staggerLabels=_;}},
        rotateLabels:      {get: function(){return rotateLabels;}, set: function(_){rotateLabels=_;}},
        rotateYLabel:      {get: function(){return rotateYLabel;}, set: function(_){rotateYLabel=_;}},
        showMaxMin:        {get: function(){return showMaxMin;}, set: function(_){showMaxMin=_;}},
        axisLabel:         {get: function(){return axisLabelText;}, set: function(_){axisLabelText=_;}},
        height:            {get: function(){return height;}, set: function(_){height=_;}},
        ticks:             {get: function(){return ticks;}, set: function(_){ticks=_;}},
        width:             {get: function(){return width;}, set: function(_){width=_;}},
        fontSize:          {get: function(){return fontSize;}, set: function(_){fontSize=_;}},
        tickFormatMaxMin:  {get: function(){return tickFormatMaxMin;}, set: function(_){tickFormatMaxMin=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top !== undefined    ? _.top    : margin.top;
            margin.right  = _.right !== undefined  ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left !== undefined   ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration=_;
            renderWatch.reset(duration);
        }},
        scale: {get: function(){return scale;}, set: function(_){
            scale = _;
            axis.scale(scale);
            isOrdinal = typeof scale.rangeBands === 'function';
            nv.utils.inheritOptionsD3(chart, scale, ['domain', 'range', 'rangeBand', 'rangeBands']);
        }}
    });

    nv.utils.initOptions(chart);
    nv.utils.inheritOptionsD3(chart, axis, ['orient', 'tickValues', 'tickSubdivide', 'tickSize', 'tickPadding', 'tickFormat']);
    nv.utils.inheritOptionsD3(chart, scale, ['domain', 'range', 'rangeBand', 'rangeBands']);

    return chart;
};
nv.models.boxPlot = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 960,
        height = 500,
        id = Math.floor(Math.random() * 10000), // Create semi-unique ID in case user doesn't select one
        xScale = d3.scale.ordinal(),
        yScale = d3.scale.linear(),
        getX  = function(d) { return d.label }, // Default data model selectors.
        getQ1 = function(d) { return d.values.Q1 },
        getQ2 = function(d) { return d.values.Q2 },
        getQ3 = function(d) { return d.values.Q3 },
        getWl = function(d) { return d.values.whisker_low },
        getWh = function(d) { return d.values.whisker_high },
        getColor = function(d) { return d.color },
        getOlItems  = function(d) { return d.values.outliers },
        getOlValue = function(d, i, j) { return d },
        getOlLabel = function(d, i, j) { return d },
        getOlColor = function(d, i, j) { return undefined },
        color = nv.utils.defaultColor(),
        container = null,
        xDomain, xRange,
        yDomain, yRange,
        dispatch = d3.dispatch('elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd'),
        duration = 250,
        maxBoxWidth = null;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var xScale0, yScale0;
    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            container = d3.select(this);
            nv.utils.initSVG(container);

            // Setup Scales
            xScale.domain(xDomain || data.map(function(d,i) { return getX(d,i); }))
                .rangeBands(xRange || [0, availableWidth], 0.1);

            // if we know yDomain, no need to calculate
            var yData = []
            if (!yDomain) {
                // (y-range is based on quartiles, whiskers and outliers)
                var values = [], yMin, yMax;
                data.forEach(function (d, i) {
                    var q1 = getQ1(d), q3 = getQ3(d), wl = getWl(d), wh = getWh(d);
                    var olItems = getOlItems(d);
                    if (olItems) {
                        olItems.forEach(function (e, i) {
                            values.push(getOlValue(e, i, undefined));
                        });
                    }
                    if (wl) { values.push(wl) }
                    if (q1) { values.push(q1) }
                    if (q3) { values.push(q3) }
                    if (wh) { values.push(wh) }
                });
                yMin = d3.min(values);
                yMax = d3.max(values);
                yData = [ yMin, yMax ] ;
            }

            yScale.domain(yDomain || yData);
            yScale.range(yRange || [availableHeight, 0]);

            //store old scales if they exist
            xScale0 = xScale0 || xScale;
            yScale0 = yScale0 || yScale.copy().range([yScale(0),yScale(0)]);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap');
            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var boxplots = wrap.selectAll('.nv-boxplot').data(function(d) { return d });
            var boxEnter = boxplots.enter().append('g').style('stroke-opacity', 1e-6).style('fill-opacity', 1e-6);
            boxplots
                .attr('class', 'nv-boxplot')
                .attr('transform', function(d,i,j) { return 'translate(' + (xScale(getX(d,i)) + xScale.rangeBand() * 0.05) + ', 0)'; })
                .classed('hover', function(d) { return d.hover });
            boxplots
                .watchTransition(renderWatch, 'nv-boxplot: boxplots')
                .style('stroke-opacity', 1)
                .style('fill-opacity', 0.75)
                .delay(function(d,i) { return i * duration / data.length })
                .attr('transform', function(d,i) {
                    return 'translate(' + (xScale(getX(d,i)) + xScale.rangeBand() * 0.05) + ', 0)';
                });
            boxplots.exit().remove();

            // ----- add the SVG elements for each boxPlot -----

            // conditionally append whisker lines
            boxEnter.each(function(d,i) {
                var box = d3.select(this);
                [getWl, getWh].forEach(function (f) {
                    if (f(d) !== undefined && f(d) !== null) {
                        var key = (f === getWl) ? 'low' : 'high';
                        box.append('line')
                          .style('stroke', getColor(d) || color(d,i))
                          .attr('class', 'nv-boxplot-whisker nv-boxplot-' + key);
                        box.append('line')
                          .style('stroke', getColor(d) || color(d,i))
                          .attr('class', 'nv-boxplot-tick nv-boxplot-' + key);
                    }
                });
            });

            var box_width = function() { return (maxBoxWidth === null ? xScale.rangeBand() * 0.9 : Math.min(75, xScale.rangeBand() * 0.9)); };
            var box_left  = function() { return xScale.rangeBand() * 0.45 - box_width()/2; };
            var box_right = function() { return xScale.rangeBand() * 0.45 + box_width()/2; };

            // update whisker lines and ticks
            [getWl, getWh].forEach(function (f) {
                var key = (f === getWl) ? 'low' : 'high';
                var endpoint = (f === getWl) ? getQ1 : getQ3;
                boxplots.select('line.nv-boxplot-whisker.nv-boxplot-' + key)
                  .watchTransition(renderWatch, 'nv-boxplot: boxplots')
                    .attr('x1', xScale.rangeBand() * 0.45 )
                    .attr('y1', function(d,i) { return yScale(f(d)); })
                    .attr('x2', xScale.rangeBand() * 0.45 )
                    .attr('y2', function(d,i) { return yScale(endpoint(d)); });
                boxplots.select('line.nv-boxplot-tick.nv-boxplot-' + key)
                  .watchTransition(renderWatch, 'nv-boxplot: boxplots')
                    .attr('x1', box_left )
                    .attr('y1', function(d,i) { return yScale(f(d)); })
                    .attr('x2', box_right )
                    .attr('y2', function(d,i) { return yScale(f(d)); });
            });

            [getWl, getWh].forEach(function (f) {
                var key = (f === getWl) ? 'low' : 'high';
                boxEnter.selectAll('.nv-boxplot-' + key)
                  .on('mouseover', function(d,i,j) {
                      d3.select(this).classed('hover', true);
                      dispatch.elementMouseover({
                          series: { key: f(d), color: getColor(d) || color(d,j) },
                          e: d3.event
                      });
                  })
                  .on('mouseout', function(d,i,j) {
                      d3.select(this).classed('hover', false);
                      dispatch.elementMouseout({
                          series: { key: f(d), color: getColor(d) || color(d,j) },
                          e: d3.event
                      });
                  })
                  .on('mousemove', function(d,i) {
                      dispatch.elementMousemove({e: d3.event});
                  });
            });

            // boxes
            boxEnter.append('rect')
                .attr('class', 'nv-boxplot-box')
                // tooltip events
                .on('mouseover', function(d,i) {
                    d3.select(this).classed('hover', true);
                    dispatch.elementMouseover({
                        key: getX(d),
                        value: getX(d),
                        series: [
                            { key: 'Q3', value: getQ3(d), color: getColor(d) || color(d,i) },
                            { key: 'Q2', value: getQ2(d), color: getColor(d) || color(d,i) },
                            { key: 'Q1', value: getQ1(d), color: getColor(d) || color(d,i) }
                        ],
                        data: d,
                        index: i,
                        e: d3.event
                    });
                })
                .on('mouseout', function(d,i) {
                    d3.select(this).classed('hover', false);
                    dispatch.elementMouseout({
                        key: getX(d),
                        value: getX(d),
                        series: [
                            { key: 'Q3', value: getQ3(d), color: getColor(d) || color(d,i) },
                            { key: 'Q2', value: getQ2(d), color: getColor(d) || color(d,i) },
                            { key: 'Q1', value: getQ1(d), color: getColor(d) || color(d,i) }
                        ],
                        data: d,
                        index: i,
                        e: d3.event
                    });
                })
                .on('mousemove', function(d,i) {
                    dispatch.elementMousemove({e: d3.event});
                });

            // box transitions
            boxplots.select('rect.nv-boxplot-box')
              .watchTransition(renderWatch, 'nv-boxplot: boxes')
                .attr('y', function(d,i) { return yScale(getQ3(d)); })
                .attr('width', box_width)
                .attr('x', box_left )
                .attr('height', function(d,i) { return Math.abs(yScale(getQ3(d)) - yScale(getQ1(d))) || 1 })
                .style('fill', function(d,i) { return getColor(d) || color(d,i) })
                .style('stroke', function(d,i) { return getColor(d) || color(d,i) });

            // median line
            boxEnter.append('line').attr('class', 'nv-boxplot-median');

            boxplots.select('line.nv-boxplot-median')
              .watchTransition(renderWatch, 'nv-boxplot: boxplots line')
                .attr('x1', box_left)
                .attr('y1', function(d,i) { return yScale(getQ2(d)); })
                .attr('x2', box_right)
                .attr('y2', function(d,i) { return yScale(getQ2(d)); });

            // outliers
            var outliers = boxplots.selectAll('.nv-boxplot-outlier').data(function(d) {
                return getOlItems(d) || [];
            });
            outliers.enter().append('circle')
                .style('fill', function(d,i,j) { return getOlColor(d,i,j) || color(d,j) })
                .style('stroke', function(d,i,j) { return getOlColor(d,i,j) || color(d,j) })
                .style('z-index', 9000)
                .on('mouseover', function(d,i,j) {
                    d3.select(this).classed('hover', true);
                    dispatch.elementMouseover({
                        series: { key: getOlLabel(d,i,j), color: getOlColor(d,i,j) || color(d,j) },
                        e: d3.event
                    });
                })
                .on('mouseout', function(d,i,j) {
                    d3.select(this).classed('hover', false);
                    dispatch.elementMouseout({
                        series: { key: getOlLabel(d,i,j), color: getOlColor(d,i,j) || color(d,j) },
                        e: d3.event
                    });
                })
                .on('mousemove', function(d,i) {
                    dispatch.elementMousemove({e: d3.event});
                });
            outliers.attr('class', 'nv-boxplot-outlier');
            outliers
              .watchTransition(renderWatch, 'nv-boxplot: nv-boxplot-outlier')
                .attr('cx', xScale.rangeBand() * 0.45)
                .attr('cy', function(d,i,j) { return yScale(getOlValue(d,i,j)); })
                .attr('r', '3');
            outliers.exit().remove();

            //store old scales for use in transitions on update
            xScale0 = xScale.copy();
            yScale0 = yScale.copy();
        });

        renderWatch.renderEnd('nv-boxplot immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:       {get: function(){return width;}, set: function(_){width=_;}},
        height:      {get: function(){return height;}, set: function(_){height=_;}},
        maxBoxWidth: {get: function(){return maxBoxWidth;}, set: function(_){maxBoxWidth=_;}},
        x:           {get: function(){return getX;}, set: function(_){getX=_;}},
        q1: {get: function(){return getQ1;}, set: function(_){getQ1=_;}},
        q2: {get: function(){return getQ2;}, set: function(_){getQ2=_;}},
        q3: {get: function(){return getQ3;}, set: function(_){getQ3=_;}},
        wl: {get: function(){return getWl;}, set: function(_){getWl=_;}},
        wh: {get: function(){return getWh;}, set: function(_){getWh=_;}},
        itemColor:    {get: function(){return getColor;}, set: function(_){getColor=_;}},
        outliers:     {get: function(){return getOlItems;}, set: function(_){getOlItems=_;}},
        outlierValue: {get: function(){return getOlValue;}, set: function(_){getOlValue=_;}},
        outlierLabel: {get: function(){return getOlLabel;}, set: function(_){getOlLabel=_;}},
        outlierColor: {get: function(){return getOlColor;}, set: function(_){getOlColor=_;}},
        xScale:  {get: function(){return xScale;}, set: function(_){xScale=_;}},
        yScale:  {get: function(){return yScale;}, set: function(_){yScale=_;}},
        xDomain: {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain: {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:  {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:  {get: function(){return yRange;}, set: function(_){yRange=_;}},
        id:          {get: function(){return id;}, set: function(_){id=_;}},
        // rectClass: {get: function(){return rectClass;}, set: function(_){rectClass=_;}},
        y: {
            get: function() {
                console.warn('BoxPlot \'y\' chart option is deprecated. Please use model overrides instead.');
                return {};
            },
            set: function(_) {
                console.warn('BoxPlot \'y\' chart option is deprecated. Please use model overrides instead.');
            }
        },
        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};
nv.models.boxPlotChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var boxplot = nv.models.boxPlot(),
        xAxis = nv.models.axis(),
        yAxis = nv.models.axis();

    var margin = {top: 15, right: 10, bottom: 50, left: 60},
        width = null,
        height = null,
        color = nv.utils.getColor(),
        showXAxis = true,
        showYAxis = true,
        rightAlignYAxis = false,
        staggerLabels = false,
        tooltip = nv.models.tooltip(),
        x, y,
        noData = 'No Data Available.',
        dispatch = d3.dispatch('beforeUpdate', 'renderEnd'),
        duration = 250;

    xAxis
        .orient('bottom')
        .showMaxMin(false)
        .tickFormat(function(d) { return d })
    ;
    yAxis
        .orient((rightAlignYAxis) ? 'right' : 'left')
        .tickFormat(d3.format(',.1f'))
    ;

    tooltip.duration(0);

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(boxplot);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);

        selection.each(function(data) {
            var container = d3.select(this), that = this;
            nv.utils.initSVG(container);
            var availableWidth = (width  || parseInt(container.style('width')) || 960) - margin.left - margin.right;
            var availableHeight = (height || parseInt(container.style('height')) || 400) - margin.top - margin.bottom;

            chart.update = function() {
                dispatch.beforeUpdate();
                container.transition().duration(duration).call(chart);
            };
            chart.container = this;

            // TODO still need to find a way to validate quartile data presence using boxPlot callbacks.
            // Display No Data message if there's nothing to show. (quartiles required at minimum).
            if (!data || !data.length) {
                var noDataText = container.selectAll('.nv-noData').data([noData]);

                noDataText.enter().append('text')
                    .attr('class', 'nvd3 nv-noData')
                    .attr('dy', '-.7em')
                    .style('text-anchor', 'middle');

                noDataText
                    .attr('x', margin.left + availableWidth / 2)
                    .attr('y', margin.top + availableHeight / 2)
                    .text(function(d) { return d });

                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            x = boxplot.xScale();
            y = boxplot.yScale().clamp(true);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-boxPlotWithAxes').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-boxPlotWithAxes').append('g');
            var defsEnter = gEnter.append('defs');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y nv-axis')
                .append('g').attr('class', 'nv-zeroLine')
                .append('line');

            gEnter.append('g').attr('class', 'nv-barsWrap');
            g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            if (rightAlignYAxis) {
                g.select('.nv-y.nv-axis')
                    .attr('transform', 'translate(' + availableWidth + ',0)');
            }

            // Main Chart Component(s)
            boxplot.width(availableWidth).height(availableHeight);

            var barsWrap = g.select('.nv-barsWrap')
                .datum(data.filter(function(d) { return !d.disabled }))

            barsWrap.transition().call(boxplot);

            defsEnter.append('clipPath')
                .attr('id', 'nv-x-label-clip-' + boxplot.id())
                .append('rect');

            g.select('#nv-x-label-clip-' + boxplot.id() + ' rect')
                .attr('width', x.rangeBand() * (staggerLabels ? 2 : 1))
                .attr('height', 16)
                .attr('x', -x.rangeBand() / (staggerLabels ? 1 : 2 ));

            // Setup Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    .ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize(-availableHeight, 0);

                g.select('.nv-x.nv-axis').attr('transform', 'translate(0,' + y.range()[0] + ')');
                g.select('.nv-x.nv-axis').call(xAxis);

                var xTicks = g.select('.nv-x.nv-axis').selectAll('g');
                if (staggerLabels) {
                    xTicks
                        .selectAll('text')
                        .attr('transform', function(d,i,j) { return 'translate(0,' + (j % 2 === 0 ? '5' : '17') + ')' })
                }
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    .ticks( Math.floor(availableHeight/36) ) // can't use nv.utils.calcTicksY with Object data
                    .tickSize( -availableWidth, 0);

                g.select('.nv-y.nv-axis').call(yAxis);
            }

            // Zero line
            g.select('.nv-zeroLine line')
                .attr('x1',0)
                .attr('x2',availableWidth)
                .attr('y1', y(0))
                .attr('y2', y(0))
            ;

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------
        });

        renderWatch.renderEnd('nv-boxplot chart immediate');
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    boxplot.dispatch.on('elementMouseover.tooltip', function(evt) {
        tooltip.data(evt).hidden(false);
    });

    boxplot.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.data(evt).hidden(true);
    });

    boxplot.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.boxplot = boxplot;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        staggerLabels: {get: function(){return staggerLabels;}, set: function(_){staggerLabels=_;}},
        showXAxis: {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis: {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        tooltipContent:    {get: function(){return tooltip;}, set: function(_){tooltip=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            boxplot.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            boxplot.color(color);
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( (_) ? 'right' : 'left');
        }}
    });

    nv.utils.inheritOptions(chart, boxplot);
    nv.utils.initOptions(chart);

    return chart;
}

// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/

nv.models.bullet = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , orient = 'left' // TODO top & bottom
        , reverse = false
        , ranges = function(d) { return d.ranges }
        , markers = function(d) { return d.markers ? d.markers : [] }
        , markerLines = function(d) { return d.markerLines ? d.markerLines : [0] }
        , measures = function(d) { return d.measures }
        , rangeLabels = function(d) { return d.rangeLabels ? d.rangeLabels : [] }
        , markerLabels = function(d) { return d.markerLabels ? d.markerLabels : []  }
        , markerLineLabels = function(d) { return d.markerLineLabels ? d.markerLineLabels : []  }
        , measureLabels = function(d) { return d.measureLabels ? d.measureLabels : []  }
        , forceX = [0] // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
        , width = 380
        , height = 30
        , container = null
        , tickFormat = null
        , color = nv.utils.getColor(['#1f77b4'])
        , dispatch = d3.dispatch('elementMouseover', 'elementMouseout', 'elementMousemove')
        , defaultRangeLabels = ["Maximum", "Mean", "Minimum"]
        , legacyRangeClassNames = ["Max", "Avg", "Min"]
        , duration = 1000
        ;

    function sortLabels(labels, values){
        var lz = labels.slice();
        labels.sort(function(a, b){
            var iA = lz.indexOf(a);
            var iB = lz.indexOf(b);
            return d3.descending(values[iA], values[iB]);
        });
    };

    function chart(selection) {
        selection.each(function(d, i) {
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            container = d3.select(this);
            nv.utils.initSVG(container);

            var rangez = ranges.call(this, d, i).slice(),
                markerz = markers.call(this, d, i).slice(),
                markerLinez = markerLines.call(this, d, i).slice(),
                measurez = measures.call(this, d, i).slice(),
                rangeLabelz = rangeLabels.call(this, d, i).slice(),
                markerLabelz = markerLabels.call(this, d, i).slice(),
                markerLineLabelz = markerLineLabels.call(this, d, i).slice(),
                measureLabelz = measureLabels.call(this, d, i).slice();

            // Sort labels according to their sorted values
            sortLabels(rangeLabelz, rangez);
            sortLabels(markerLabelz, markerz);
            sortLabels(markerLineLabelz, markerLinez);
            sortLabels(measureLabelz, measurez);

            // sort values descending
            rangez.sort(d3.descending);
            markerz.sort(d3.descending);
            markerLinez.sort(d3.descending);
            measurez.sort(d3.descending);

            // Setup Scales
            // Compute the new x-scale.
            var x1 = d3.scale.linear()
                .domain( d3.extent(d3.merge([forceX, rangez])) )
                .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

            // Retrieve the old x-scale, if this is an update.
            var x0 = this.__chart__ || d3.scale.linear()
                .domain([0, Infinity])
                .range(x1.range());

            // Stash the new scale.
            this.__chart__ = x1;

            var rangeMin = d3.min(rangez), //rangez[2]
                rangeMax = d3.max(rangez), //rangez[0]
                rangeAvg = rangez[1];

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-bullet').data([d]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bullet');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            for(var i=0,il=rangez.length; i<il; i++){
                var rangeClassNames = 'nv-range nv-range'+i;
                if(i <= 2){
                    rangeClassNames = rangeClassNames + ' nv-range'+legacyRangeClassNames[i];
                }
                gEnter.append('rect').attr('class', rangeClassNames);
            }

            gEnter.append('rect').attr('class', 'nv-measure');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
                w1 = function(d) { return Math.abs(x1(d) - x1(0)) };
            var xp0 = function(d) { return d < 0 ? x0(d) : x0(0) },
                xp1 = function(d) { return d < 0 ? x1(d) : x1(0) };

            for(var i=0,il=rangez.length; i<il; i++){
                var range = rangez[i];
                g.select('rect.nv-range'+i)
                    .datum(range)
                    .attr('height', availableHeight)
                    .transition()
                    .duration(duration)
                    .attr('width', w1(range))
                    .attr('x', xp1(range))
            }

            g.select('rect.nv-measure')
                .style('fill', color)
                .attr('height', availableHeight / 3)
                .attr('y', availableHeight / 3)
                .on('mouseover', function() {
                    dispatch.elementMouseover({
                        value: measurez[0],
                        label: measureLabelz[0] || 'Current',
                        color: d3.select(this).style("fill")
                    })
                })
                .on('mousemove', function() {
                    dispatch.elementMousemove({
                        value: measurez[0],
                        label: measureLabelz[0] || 'Current',
                        color: d3.select(this).style("fill")
                    })
                })
                .on('mouseout', function() {
                    dispatch.elementMouseout({
                        value: measurez[0],
                        label: measureLabelz[0] || 'Current',
                        color: d3.select(this).style("fill")
                    })
                })
                .transition()
                .duration(duration)
                .attr('width', measurez < 0 ?
                    x1(0) - x1(measurez[0])
                    : x1(measurez[0]) - x1(0))
                .attr('x', xp1(measurez));

            var h3 =  availableHeight / 6;

            var markerData = markerz.map( function(marker, index) {
                return {value: marker, label: markerLabelz[index]}
            });
            gEnter
              .selectAll("path.nv-markerTriangle")
              .data(markerData)
              .enter()
              .append('path')
              .attr('class', 'nv-markerTriangle')
              .attr('d', 'M0,' + h3 + 'L' + h3 + ',' + (-h3) + ' ' + (-h3) + ',' + (-h3) + 'Z')
              .on('mouseover', function(d) {
                dispatch.elementMouseover({
                  value: d.value,
                  label: d.label || 'Previous',
                  color: d3.select(this).style("fill"),
                  pos: [x1(d.value), availableHeight/2]
                })

              })
              .on('mousemove', function(d) {
                  dispatch.elementMousemove({
                      value: d.value,
                      label: d.label || 'Previous',
                      color: d3.select(this).style("fill")
                  })
              })
              .on('mouseout', function(d, i) {
                  dispatch.elementMouseout({
                      value: d.value,
                      label: d.label || 'Previous',
                      color: d3.select(this).style("fill")
                  })
              });

            g.selectAll("path.nv-markerTriangle")
              .data(markerData)
              .transition()
              .duration(duration)
              .attr('transform', function(d) { return 'translate(' + x1(d.value) + ',' + (availableHeight / 2) + ')' });

            var markerLinesData = markerLinez.map( function(marker, index) {
                return {value: marker, label: markerLineLabelz[index]}
            });
            gEnter
              .selectAll("line.nv-markerLine")
              .data(markerLinesData)
              .enter()
              .append('line')
              .attr('cursor', '')
              .attr('class', 'nv-markerLine')
              .attr('x1', function(d) { return x1(d.value) })
              .attr('y1', '2')
              .attr('x2', function(d) { return x1(d.value) })
              .attr('y2', availableHeight - 2)
              .on('mouseover', function(d) {
                dispatch.elementMouseover({
                  value: d.value,
                  label: d.label || 'Previous',
                  color: d3.select(this).style("fill"),
                  pos: [x1(d.value), availableHeight/2]
                })

              })
              .on('mousemove', function(d) {
                  dispatch.elementMousemove({
                      value: d.value,
                      label: d.label || 'Previous',
                      color: d3.select(this).style("fill")
                  })
              })
              .on('mouseout', function(d, i) {
                  dispatch.elementMouseout({
                      value: d.value,
                      label: d.label || 'Previous',
                      color: d3.select(this).style("fill")
                  })
              });

            g.selectAll("line.nv-markerLine")
              .data(markerLinesData)
              .transition()
              .duration(duration)
              .attr('x1', function(d) { return x1(d.value) })
              .attr('x2', function(d) { return x1(d.value) });

            wrap.selectAll('.nv-range')
                .on('mouseover', function(d,i) {
                    var label = rangeLabelz[i] || defaultRangeLabels[i];
                    dispatch.elementMouseover({
                        value: d,
                        label: label,
                        color: d3.select(this).style("fill")
                    })
                })
                .on('mousemove', function() {
                    dispatch.elementMousemove({
                        value: measurez[0],
                        label: measureLabelz[0] || 'Previous',
                        color: d3.select(this).style("fill")
                    })
                })
                .on('mouseout', function(d,i) {
                    var label = rangeLabelz[i] || defaultRangeLabels[i];
                    dispatch.elementMouseout({
                        value: d,
                        label: label,
                        color: d3.select(this).style("fill")
                    })
                });
        });

        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        ranges:      {get: function(){return ranges;}, set: function(_){ranges=_;}}, // ranges (bad, satisfactory, good)
        markers:     {get: function(){return markers;}, set: function(_){markers=_;}}, // markers (previous, goal)
        measures: {get: function(){return measures;}, set: function(_){measures=_;}}, // measures (actual, forecast)
        forceX:      {get: function(){return forceX;}, set: function(_){forceX=_;}},
        width:    {get: function(){return width;}, set: function(_){width=_;}},
        height:    {get: function(){return height;}, set: function(_){height=_;}},
        tickFormat:    {get: function(){return tickFormat;}, set: function(_){tickFormat=_;}},
        duration:    {get: function(){return duration;}, set: function(_){duration=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        orient: {get: function(){return orient;}, set: function(_){ // left, right, top, bottom
            orient = _;
            reverse = orient == 'right' || orient == 'bottom';
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });

    nv.utils.initOptions(chart);
    return chart;
};



// Chart design based on the recommendations of Stephen Few. Implementation
// based on the work of Clint Ivy, Jamie Love, and Jason Davies.
// http://projects.instantcognition.com/protovis/bulletchart/
nv.models.bulletChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var bullet = nv.models.bullet();
    var tooltip = nv.models.tooltip();

    var orient = 'left' // TODO top & bottom
        , reverse = false
        , margin = {top: 5, right: 40, bottom: 20, left: 120}
        , ranges = function(d) { return d.ranges }
        , markers = function(d) { return d.markers ? d.markers : [] }
        , measures = function(d) { return d.measures }
        , width = null
        , height = 55
        , tickFormat = null
        , ticks = null
        , noData = null
        , dispatch = d3.dispatch()
        ;

    tooltip
        .duration(0)
        .headerEnabled(false);

    function chart(selection) {
        selection.each(function(d, i) {
            var container = d3.select(this);
            nv.utils.initSVG(container);

            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = height - margin.top - margin.bottom,
                that = this;

            chart.update = function() { chart(selection) };
            chart.container = this;

            // Display No Data message if there's nothing to show.
            if (!d || !ranges.call(this, d, i)) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            var rangez = ranges.call(this, d, i).slice().sort(d3.descending),
                markerz = markers.call(this, d, i).slice().sort(d3.descending),
                measurez = measures.call(this, d, i).slice().sort(d3.descending);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-bulletChart').data([d]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-bulletChart');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-bulletWrap');
            gEnter.append('g').attr('class', 'nv-titles');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // Compute the new x-scale.
            var x1 = d3.scale.linear()
                .domain([0, Math.max(rangez[0], (markerz[0] || 0), measurez[0])])  // TODO: need to allow forceX and forceY, and xDomain, yDomain
                .range(reverse ? [availableWidth, 0] : [0, availableWidth]);

            // Retrieve the old x-scale, if this is an update.
            var x0 = this.__chart__ || d3.scale.linear()
                .domain([0, Infinity])
                .range(x1.range());

            // Stash the new scale.
            this.__chart__ = x1;

            var w0 = function(d) { return Math.abs(x0(d) - x0(0)) }, // TODO: could optimize by precalculating x0(0) and x1(0)
                w1 = function(d) { return Math.abs(x1(d) - x1(0)) };

            var title = gEnter.select('.nv-titles').append('g')
                .attr('text-anchor', 'end')
                .attr('transform', 'translate(-6,' + (height - margin.top - margin.bottom) / 2 + ')');
            title.append('text')
                .attr('class', 'nv-title')
                .text(function(d) { return d.title; });

            title.append('text')
                .attr('class', 'nv-subtitle')
                .attr('dy', '1em')
                .text(function(d) { return d.subtitle; });

            bullet
                .width(availableWidth)
                .height(availableHeight);

            var bulletWrap = g.select('.nv-bulletWrap');
            d3.transition(bulletWrap).call(bullet);

            // Compute the tick format.
            var format = tickFormat || x1.tickFormat( availableWidth / 100 );

            // Update the tick groups.
            var tick = g.selectAll('g.nv-tick')
                .data(x1.ticks( ticks ? ticks : (availableWidth / 50) ), function(d) {
                    return this.textContent || format(d);
                });

            // Initialize the ticks with the old scale, x0.
            var tickEnter = tick.enter().append('g')
                .attr('class', 'nv-tick')
                .attr('transform', function(d) { return 'translate(' + x0(d) + ',0)' })
                .style('opacity', 1e-6);

            tickEnter.append('line')
                .attr('y1', availableHeight)
                .attr('y2', availableHeight * 7 / 6);

            tickEnter.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', '1em')
                .attr('y', availableHeight * 7 / 6)
                .text(format);

            // Transition the updating ticks to the new scale, x1.
            var tickUpdate = d3.transition(tick)
                .transition()
                .duration(bullet.duration())
                .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
                .style('opacity', 1);

            tickUpdate.select('line')
                .attr('y1', availableHeight)
                .attr('y2', availableHeight * 7 / 6);

            tickUpdate.select('text')
                .attr('y', availableHeight * 7 / 6);

            // Transition the exiting ticks to the new scale, x1.
            d3.transition(tick.exit())
                .transition()
                .duration(bullet.duration())
                .attr('transform', function(d) { return 'translate(' + x1(d) + ',0)' })
                .style('opacity', 1e-6)
                .remove();
        });

        d3.timer.flush();
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    bullet.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt['series'] = {
            key: evt.label,
            value: evt.value,
            color: evt.color
        };
        tooltip.data(evt).hidden(false);
    });

    bullet.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    bullet.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.bullet = bullet;
    chart.dispatch = dispatch;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        ranges:      {get: function(){return ranges;}, set: function(_){ranges=_;}}, // ranges (bad, satisfactory, good)
        markers:     {get: function(){return markers;}, set: function(_){markers=_;}}, // markers (previous, goal)
        measures: {get: function(){return measures;}, set: function(_){measures=_;}}, // measures (actual, forecast)
        width:    {get: function(){return width;}, set: function(_){width=_;}},
        height:    {get: function(){return height;}, set: function(_){height=_;}},
        tickFormat:    {get: function(){return tickFormat;}, set: function(_){tickFormat=_;}},
        ticks:    {get: function(){return ticks;}, set: function(_){ticks=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        orient: {get: function(){return orient;}, set: function(_){ // left, right, top, bottom
            orient = _;
            reverse = orient == 'right' || orient == 'bottom';
        }}
    });

    nv.utils.inheritOptions(chart, bullet);
    nv.utils.initOptions(chart);

    return chart;
};



nv.models.candlestickBar = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = null
        , height = null
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container
        , x = d3.scale.linear()
        , y = d3.scale.linear()
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , getOpen = function(d) { return d.open }
        , getClose = function(d) { return d.close }
        , getHigh = function(d) { return d.high }
        , getLow = function(d) { return d.low }
        , forceX = []
        , forceY = []
        , padData     = false // If true, adds half a data points width to front and back, for lining up a line chart with a bar chart
        , clipEdge = true
        , color = nv.utils.defaultColor()
        , interactive = false
        , xDomain
        , yDomain
        , xRange
        , yRange
        , dispatch = d3.dispatch('stateChange', 'changeState', 'renderEnd', 'chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove')
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    function chart(selection) {
        selection.each(function(data) {
            container = d3.select(this);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            nv.utils.initSVG(container);

            // Width of the candlestick bars.
            var barWidth = (availableWidth / data[0].values.length) * .45;

            // Setup Scales
            x.domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ));

            if (padData)
                x.range(xRange || [availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
            else
                x.range(xRange || [5 + barWidth / 2, availableWidth - barWidth / 2 - 5]);

            y.domain(yDomain || [
                    d3.min(data[0].values.map(getLow).concat(forceY)),
                    d3.max(data[0].values.map(getHigh).concat(forceY))
                ]
            ).range(yRange || [availableHeight, 0]);

            // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
            if (x.domain()[0] === x.domain()[1])
                x.domain()[0] ?
                    x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
                    : x.domain([-1,1]);

            if (y.domain()[0] === y.domain()[1])
                y.domain()[0] ?
                    y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
                    : y.domain([-1,1]);

            // Setup containers and skeleton of chart
            var wrap = d3.select(this).selectAll('g.nv-wrap.nv-candlestickBar').data([data[0].values]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-candlestickBar');
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-ticks');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            container
                .on('click', function(d,i) {
                    dispatch.chartClick({
                        data: d,
                        index: i,
                        pos: d3.event,
                        id: id
                    });
                });

            defsEnter.append('clipPath')
                .attr('id', 'nv-chart-clip-path-' + id)
                .append('rect');

            wrap.select('#nv-chart-clip-path-' + id + ' rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            g   .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');

            var ticks = wrap.select('.nv-ticks').selectAll('.nv-tick')
                .data(function(d) { return d });
            ticks.exit().remove();

            var tickGroups = ticks.enter().append('g');

            // The colors are currently controlled by CSS.
            ticks
                .attr('class', function(d, i, j) { return (getOpen(d, i) > getClose(d, i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i});

            var lines = tickGroups.append('line')
                .attr('class', 'nv-candlestick-lines')
                .attr('transform', function(d, i) { return 'translate(' + x(getX(d, i)) + ',0)'; })
                .attr('x1', 0)
                .attr('y1', function(d, i) { return y(getHigh(d, i)); })
                .attr('x2', 0)
                .attr('y2', function(d, i) { return y(getLow(d, i)); });

            var rects = tickGroups.append('rect')
                .attr('class', 'nv-candlestick-rects nv-bars')
                .attr('transform', function(d, i) {
                    return 'translate(' + (x(getX(d, i)) - barWidth/2) + ','
                    + (y(getY(d, i)) - (getOpen(d, i) > getClose(d, i) ? (y(getClose(d, i)) - y(getOpen(d, i))) : 0))
                    + ')';
                })
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', barWidth)
                .attr('height', function(d, i) {
                    var open = getOpen(d, i);
                    var close = getClose(d, i);
                    return open > close ? y(close) - y(open) : y(open) - y(close);
                });

            ticks.select('.nv-candlestick-lines').transition()
                .attr('transform', function(d, i) { return 'translate(' + x(getX(d, i)) + ',0)'; })
                .attr('x1', 0)
                .attr('y1', function(d, i) { return y(getHigh(d, i)); })
                .attr('x2', 0)
                .attr('y2', function(d, i) { return y(getLow(d, i)); });

            ticks.select('.nv-candlestick-rects').transition()
                .attr('transform', function(d, i) {
                    return 'translate(' + (x(getX(d, i)) - barWidth/2) + ','
                    + (y(getY(d, i)) - (getOpen(d, i) > getClose(d, i) ? (y(getClose(d, i)) - y(getOpen(d, i))) : 0))
                    + ')';
                })
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', barWidth)
                .attr('height', function(d, i) {
                    var open = getOpen(d, i);
                    var close = getClose(d, i);
                    return open > close ? y(close) - y(open) : y(open) - y(close);
                });
        });

        return chart;
    }


    //Create methods to allow outside functions to highlight a specific bar.
    chart.highlightPoint = function(pointIndex, isHoverOver) {
        chart.clearHighlights();
        container.select(".nv-candlestickBar .nv-tick-0-" + pointIndex)
            .classed("hover", isHoverOver)
        ;
    };

    chart.clearHighlights = function() {
        container.select(".nv-candlestickBar .nv-tick.hover")
            .classed("hover", false)
        ;
    };

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:    {get: function(){return width;}, set: function(_){width=_;}},
        height:   {get: function(){return height;}, set: function(_){height=_;}},
        xScale:   {get: function(){return x;}, set: function(_){x=_;}},
        yScale:   {get: function(){return y;}, set: function(_){y=_;}},
        xDomain:  {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain:  {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:   {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:   {get: function(){return yRange;}, set: function(_){yRange=_;}},
        forceX:   {get: function(){return forceX;}, set: function(_){forceX=_;}},
        forceY:   {get: function(){return forceY;}, set: function(_){forceY=_;}},
        padData:  {get: function(){return padData;}, set: function(_){padData=_;}},
        clipEdge: {get: function(){return clipEdge;}, set: function(_){clipEdge=_;}},
        id:       {get: function(){return id;}, set: function(_){id=_;}},
        interactive: {get: function(){return interactive;}, set: function(_){interactive=_;}},

        x:     {get: function(){return getX;}, set: function(_){getX=_;}},
        y:     {get: function(){return getY;}, set: function(_){getY=_;}},
        open:  {get: function(){return getOpen();}, set: function(_){getOpen=_;}},
        close: {get: function(){return getClose();}, set: function(_){getClose=_;}},
        high:  {get: function(){return getHigh;}, set: function(_){getHigh=_;}},
        low:   {get: function(){return getLow;}, set: function(_){getLow=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    != undefined ? _.top    : margin.top;
            margin.right  = _.right  != undefined ? _.right  : margin.right;
            margin.bottom = _.bottom != undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   != undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });

    nv.utils.initOptions(chart);
    return chart;
};

nv.models.cumulativeLineChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var lines = nv.models.line()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
        , legend = nv.models.legend()
        , controls = nv.models.legend()
        , interactiveLayer = nv.interactiveGuideline()
        , tooltip = nv.models.tooltip()
        ;

    var margin = {top: 30, right: 30, bottom: 50, left: 60}
        , marginTop = null
        , color = nv.utils.defaultColor()
        , width = null
        , height = null
        , showLegend = true
        , showXAxis = true
        , showYAxis = true
        , rightAlignYAxis = false
        , showControls = true
        , useInteractiveGuideline = false
        , rescaleY = true
        , x //can be accessed via chart.xScale()
        , y //can be accessed via chart.yScale()
        , id = lines.id()
        , state = nv.utils.state()
        , defaultState = null
        , noData = null
        , average = function(d) { return d.average }
        , dispatch = d3.dispatch('stateChange', 'changeState', 'renderEnd')
        , transitionDuration = 250
        , duration = 250
        , noErrorCheck = false  //if set to TRUE, will bypass an error check in the indexify function.
        ;

    state.index = 0;
    state.rescaleY = rescaleY;

    xAxis.orient('bottom').tickPadding(7);
    yAxis.orient((rightAlignYAxis) ? 'right' : 'left');

    tooltip.valueFormatter(function(d, i) {
        return yAxis.tickFormat()(d, i);
    }).headerFormatter(function(d, i) {
        return xAxis.tickFormat()(d, i);
    });

    controls.updateState(false);

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var dx = d3.scale.linear()
        , index = {i: 0, x: 0}
        , renderWatch = nv.utils.renderWatch(dispatch, duration)
        , currentYDomain
        ;

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled }),
                index: index.i,
                rescaleY: rescaleY
            };
        }
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.index !== undefined)
                index.i = state.index;
            if (state.rescaleY !== undefined)
                rescaleY = state.rescaleY;
            if (state.active !== undefined)
                data.forEach(function(series,i) {
                    series.disabled = !state.active[i];
                });
        }
    };

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(lines);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);
        selection.each(function(data) {
            var container = d3.select(this);
            nv.utils.initSVG(container);
            container.classed('nv-chart-' + id, true);
            var that = this;

            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() {
                if (duration === 0)
                    container.call(chart);
                else
                    container.transition().duration(duration).call(chart)
            };
            chart.container = this;

            state
                .setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            // DEPRECATED set state.disableddisabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            var indexDrag = d3.behavior.drag()
                .on('dragstart', dragStart)
                .on('drag', dragMove)
                .on('dragend', dragEnd);


            function dragStart(d,i) {
                d3.select(chart.container)
                    .style('cursor', 'ew-resize');
            }

            function dragMove(d,i) {
                index.x = d3.event.x;
                index.i = Math.round(dx.invert(index.x));
                updateZero();
            }

            function dragEnd(d,i) {
                d3.select(chart.container)
                    .style('cursor', 'auto');

                // update state and send stateChange with new index
                state.index = index.i;
                dispatch.stateChange(state);
            }

            // Display No Data message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            x = lines.xScale();
            y = lines.yScale();


            dx.domain([0, data[0].values.length - 1]) //Assumes all series have same length
                .range([0, availableWidth])
                .clamp(true);

            var data = indexify(index.i, data);

            // initialize the starting yDomain for the not-rescale case after indexify (to have calculated point.display)
            if (typeof(currentYDomain) === "undefined") {
                currentYDomain = getCurrentYDomain(data);
            }

            if (!rescaleY) {
                lines.yDomain(currentYDomain);
                lines.clipEdge(true);
            } else {
                lines.yDomain(null);
            }

            // Setup containers and skeleton of chart
            var interactivePointerEvents = (useInteractiveGuideline) ? "none" : "all";
            var wrap = container.selectAll('g.nv-wrap.nv-cumulativeLine').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-cumulativeLine').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-interactive');
            gEnter.append('g').attr('class', 'nv-x nv-axis').style("pointer-events","none");
            gEnter.append('g').attr('class', 'nv-y nv-axis');
            gEnter.append('g').attr('class', 'nv-background');
            gEnter.append('g').attr('class', 'nv-linesWrap').style("pointer-events",interactivePointerEvents);
            gEnter.append('g').attr('class', 'nv-avgLinesWrap').style("pointer-events","none");
            gEnter.append('g').attr('class', 'nv-legendWrap');
            gEnter.append('g').attr('class', 'nv-controlsWrap');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                legend.width(availableWidth);

                g.select('.nv-legendWrap')
                    .datum(data)
                    .call(legend);

                if (!marginTop && legend.height() !== margin.top) {
                    margin.top = legend.height();
                    availableHeight = nv.utils.availableHeight(height, container, margin);
                }

                g.select('.nv-legendWrap')
                    .attr('transform', 'translate(0,' + (-margin.top) +')')
            }

            // Controls
            if (!showControls) {
                 g.select('.nv-controlsWrap').selectAll('*').remove();
            } else {
                var controlsData = [
                    { key: 'Re-scale y-axis', disabled: !rescaleY }
                ];

                controls
                    .width(140)
                    .color(['#444', '#444', '#444'])
                    .rightAlign(false)
                    .margin({top: 5, right: 0, bottom: 5, left: 20})
                ;

                g.select('.nv-controlsWrap')
                    .datum(controlsData)
                    .attr('transform', 'translate(0,' + (-margin.top) +')')
                    .call(controls);
            }

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            // Show error if index point value is 0 (division by zero avoided)
            var tempDisabled = data.filter(function(d) { return d.tempDisabled });

            wrap.select('.tempDisabled').remove(); //clean-up and prevent duplicates
            if (tempDisabled.length) {
                wrap.append('text').attr('class', 'tempDisabled')
                    .attr('x', availableWidth / 2)
                    .attr('y', '-.71em')
                    .style('text-anchor', 'end')
                    .text(tempDisabled.map(function(d) { return d.key }).join(', ') + ' values cannot be calculated for this time period.');
            }

            //Set up interactive layer
            if (useInteractiveGuideline) {
                interactiveLayer
                    .width(availableWidth)
                    .height(availableHeight)
                    .margin({left:margin.left,top:margin.top})
                    .svgContainer(container)
                    .xScale(x);
                wrap.select(".nv-interactive").call(interactiveLayer);
            }

            gEnter.select('.nv-background')
                .append('rect');

            g.select('.nv-background rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            lines
                //.x(function(d) { return d.x })
                .y(function(d) { return d.display.y })
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    return d.color || color(d, i);
                }).filter(function(d,i) { return !data[i].disabled && !data[i].tempDisabled; }));

            var linesWrap = g.select('.nv-linesWrap')
                .datum(data.filter(function(d) { return  !d.disabled && !d.tempDisabled }));

            linesWrap.call(lines);

            //Store a series index number in the data array.
            data.forEach(function(d,i) {
                d.seriesIndex = i;
            });

            var avgLineData = data.filter(function(d) {
                return !d.disabled && !!average(d);
            });

            var avgLines = g.select(".nv-avgLinesWrap").selectAll("line")
                .data(avgLineData, function(d) { return d.key; });

            var getAvgLineY = function(d) {
                //If average lines go off the svg element, clamp them to the svg bounds.
                var yVal = y(average(d));
                if (yVal < 0) return 0;
                if (yVal > availableHeight) return availableHeight;
                return yVal;
            };

            avgLines.enter()
                .append('line')
                .style('stroke-width',2)
                .style('stroke-dasharray','10,10')
                .style('stroke',function (d,i) {
                    return lines.color()(d,d.seriesIndex);
                })
                .attr('x1',0)
                .attr('x2',availableWidth)
                .attr('y1', getAvgLineY)
                .attr('y2', getAvgLineY);

            avgLines
                .style('stroke-opacity',function(d){
                    //If average lines go offscreen, make them transparent
                    var yVal = y(average(d));
                    if (yVal < 0 || yVal > availableHeight) return 0;
                    return 1;
                })
                .attr('x1',0)
                .attr('x2',availableWidth)
                .attr('y1', getAvgLineY)
                .attr('y2', getAvgLineY);

            avgLines.exit().remove();

            //Create index line
            var indexLine = linesWrap.selectAll('.nv-indexLine')
                .data([index]);
            indexLine.enter().append('rect').attr('class', 'nv-indexLine')
                .attr('width', 3)
                .attr('x', -2)
                .attr('fill', 'red')
                .attr('fill-opacity', .5)
                .style("pointer-events","all")
                .call(indexDrag);

            indexLine
                .attr('transform', function(d) { return 'translate(' + dx(d.i) + ',0)' })
                .attr('height', availableHeight);

            // Setup Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/70, data) )
                    .tickSize(-availableHeight, 0);

                g.select('.nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + y.range()[0] + ')');
                g.select('.nv-x.nv-axis')
                    .call(xAxis);
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                    .tickSize( -availableWidth, 0);

                g.select('.nv-y.nv-axis')
                    .call(yAxis);
            }

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            function updateZero() {
                indexLine
                    .data([index]);

                //When dragging the index line, turn off line transitions.
                // Then turn them back on when done dragging.
                var oldDuration = chart.duration();
                chart.duration(0);
                chart.update();
                chart.duration(oldDuration);
            }

            g.select('.nv-background rect')
                .on('click', function() {
                    index.x = d3.mouse(this)[0];
                    index.i = Math.round(dx.invert(index.x));

                    // update state and send stateChange with new index
                    state.index = index.i;
                    dispatch.stateChange(state);

                    updateZero();
                });

            lines.dispatch.on('elementClick', function(e) {
                index.i = e.pointIndex;
                index.x = dx(index.i);

                // update state and send stateChange with new index
                state.index = index.i;
                dispatch.stateChange(state);

                updateZero();
            });

            controls.dispatch.on('legendClick', function(d,i) {
                d.disabled = !d.disabled;
                rescaleY = !d.disabled;
                state.rescaleY = rescaleY;
                if (!rescaleY) {
                    currentYDomain = getCurrentYDomain(data); // rescale is turned off, so set the currentYDomain
                }
                dispatch.stateChange(state);
                chart.update();
            });

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState)
                    state[key] = newState[key];
                dispatch.stateChange(state);
                chart.update();
            });

            interactiveLayer.dispatch.on('elementMousemove', function(e) {
                lines.clearHighlights();
                var singlePoint, pointIndex, pointXLocation, allData = [];

                data
                    .filter(function(series, i) {
                        series.seriesIndex = i;
                        return !(series.disabled || series.tempDisabled);
                    })
                    .forEach(function(series,i) {
                        pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
                        lines.highlightPoint(i, pointIndex, true);
                        var point = series.values[pointIndex];
                        if (typeof point === 'undefined') return;
                        if (typeof singlePoint === 'undefined') singlePoint = point;
                        if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
                        allData.push({
                            key: series.key,
                            value: chart.y()(point, pointIndex),
                            color: color(series,series.seriesIndex)
                        });
                    });

                //Highlight the tooltip entry based on which point the mouse is closest to.
                if (allData.length > 2) {
                    var yValue = chart.yScale().invert(e.mouseY);
                    var domainExtent = Math.abs(chart.yScale().domain()[0] - chart.yScale().domain()[1]);
                    var threshold = 0.03 * domainExtent;
                    var indexToHighlight = nv.nearestValueIndex(allData.map(function(d){return d.value}),yValue,threshold);
                    if (indexToHighlight !== null)
                        allData[indexToHighlight].highlight = true;
                }

                var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex), pointIndex);
                interactiveLayer.tooltip
                    .valueFormatter(function(d,i) {
                        return yAxis.tickFormat()(d);
                    })
                    .data(
                    {
                        value: xValue,
                        series: allData
                    }
                )();

                interactiveLayer.renderGuideLine(pointXLocation);
            });

            interactiveLayer.dispatch.on("elementMouseout",function(e) {
                lines.clearHighlights();
            });

            // Update chart from a state object passed to event handler
            dispatch.on('changeState', function(e) {
                if (typeof e.disabled !== 'undefined') {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });

                    state.disabled = e.disabled;
                }

                if (typeof e.index !== 'undefined') {
                    index.i = e.index;
                    index.x = dx(index.i);

                    state.index = e.index;

                    indexLine
                        .data([index]);
                }

                if (typeof e.rescaleY !== 'undefined') {
                    rescaleY = e.rescaleY;
                }

                chart.update();
            });

        });

        renderWatch.renderEnd('cumulativeLineChart immediate');

        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    lines.dispatch.on('elementMouseover.tooltip', function(evt) {
        var point = {
            x: chart.x()(evt.point),
            y: chart.y()(evt.point),
            color: evt.point.color
        };
        evt.point = point;
        tooltip.data(evt).hidden(false);
    });

    lines.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true)
    });

    //============================================================
    // Functions
    //------------------------------------------------------------

    var indexifyYGetter = null;
    /* Normalize the data according to an index point. */
    function indexify(idx, data) {
        if (!indexifyYGetter) indexifyYGetter = lines.y();
        return data.map(function(line, i) {
            if (!line.values) {
                return line;
            }
            var indexValue = line.values[idx];
            if (indexValue == null) {
                return line;
            }
            var v = indexifyYGetter(indexValue, idx);

            // avoid divide by zero
            if (Math.abs(v) < 0.00001 && !noErrorCheck) {
                line.tempDisabled = true;
                return line;
            }

            line.tempDisabled = false;

            line.values = line.values.map(function(point, pointIndex) {
                point.display = {'y': (indexifyYGetter(point, pointIndex) - v) / v };
                return point;
            });

            return line;
        })
    }

    function getCurrentYDomain(data) {
        var seriesDomains = data
            .filter(function(series) { return !(series.disabled || series.tempDisabled)})
            .map(function(series,i) {
                return d3.extent(series.values, function (d) { return d.display.y });
            });

        return [
            d3.min(seriesDomains, function(d) { return d[0] }),
            d3.max(seriesDomains, function(d) { return d[1] })
        ];
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.lines = lines;
    chart.legend = legend;
    chart.controls = controls;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.interactiveLayer = interactiveLayer;
    chart.state = state;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showControls:     {get: function(){return showControls;}, set: function(_){showControls=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        average: {get: function(){return average;}, set: function(_){average=_;}},
        defaultState:    {get: function(){return defaultState;}, set: function(_){defaultState=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        showXAxis:    {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis:    {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        noErrorCheck:    {get: function(){return noErrorCheck;}, set: function(_){noErrorCheck=_;}},

        // options that require extra logic in the setter
        rescaleY:     {get: function(){return rescaleY;}, set: function(_){
            rescaleY = _;
            chart.state.rescaleY = _; // also update state
        }},
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
        }},
        useInteractiveGuideline: {get: function(){return useInteractiveGuideline;}, set: function(_){
            useInteractiveGuideline = _;
            if (_ === true) {
                chart.interactive(false);
                chart.useVoronoi(false);
            }
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( (_) ? 'right' : 'left');
        }},
        duration:    {get: function(){return duration;}, set: function(_){
            duration = _;
            lines.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
            renderWatch.reset(duration);
        }}
    });

    nv.utils.inheritOptions(chart, lines);
    nv.utils.initOptions(chart);

    return chart;
};
//TODO: consider deprecating by adding necessary features to multiBar model
nv.models.discreteBar = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 960
        , height = 500
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container
        , x = d3.scale.ordinal()
        , y = d3.scale.linear()
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
        , color = nv.utils.defaultColor()
        , showValues = false
        , valueFormat = d3.format(',.2f')
        , xDomain
        , yDomain
        , xRange
        , yRange
        , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd')
        , rectClass = 'discreteBar'
        , duration = 250
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var x0, y0;
    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            container = d3.select(this);
            nv.utils.initSVG(container);

            //add series index to each data point for reference
            data.forEach(function(series, i) {
                series.values.forEach(function(point) {
                    point.series = i;
                });
            });

            // Setup Scales
            // remap and flatten the data for use in calculating the scales' domains
            var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
                data.map(function(d) {
                    return d.values.map(function(d,i) {
                        return { x: getX(d,i), y: getY(d,i), y0: d.y0 }
                    })
                });

            x   .domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
                .rangeBands(xRange || [0, availableWidth], .1);
            y   .domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return d.y }).concat(forceY)));

            // If showValues, pad the Y axis range to account for label height
            if (showValues) y.range(yRange || [availableHeight - (y.domain()[0] < 0 ? 12 : 0), y.domain()[1] > 0 ? 12 : 0]);
            else y.range(yRange || [availableHeight, 0]);

            //store old scales if they exist
            x0 = x0 || x;
            y0 = y0 || y.copy().range([y(0),y(0)]);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-discretebar').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discretebar');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-groups');
            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            //TODO: by definition, the discrete bar should not have multiple groups, will modify/remove later
            var groups = wrap.select('.nv-groups').selectAll('.nv-group')
                .data(function(d) { return d }, function(d) { return d.key });
            groups.enter().append('g')
                .style('stroke-opacity', 1e-6)
                .style('fill-opacity', 1e-6);
            groups.exit()
                .watchTransition(renderWatch, 'discreteBar: exit groups')
                .style('stroke-opacity', 1e-6)
                .style('fill-opacity', 1e-6)
                .remove();
            groups
                .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
                .classed('hover', function(d) { return d.hover });
            groups
                .watchTransition(renderWatch, 'discreteBar: groups')
                .style('stroke-opacity', 1)
                .style('fill-opacity', .75);

            var bars = groups.selectAll('g.nv-bar')
                .data(function(d) { return d.values });
            bars.exit().remove();

            var barsEnter = bars.enter().append('g')
                .attr('transform', function(d,i,j) {
                    return 'translate(' + (x(getX(d,i)) + x.rangeBand() * .05 ) + ', ' + y(0) + ')'
                })
                .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
                    d3.select(this).classed('hover', true);
                    dispatch.elementMouseover({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mouseout', function(d,i) {
                    d3.select(this).classed('hover', false);
                    dispatch.elementMouseout({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mousemove', function(d,i) {
                    dispatch.elementMousemove({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('click', function(d,i) {
                    var element = this;
                    dispatch.elementClick({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill"),
                        event: d3.event,
                        element: element
                    });
                    d3.event.stopPropagation();
                })
                .on('dblclick', function(d,i) {
                    dispatch.elementDblClick({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                    d3.event.stopPropagation();
                });

            barsEnter.append('rect')
                .attr('height', 0)
                .attr('width', x.rangeBand() * .9 / data.length )

            if (showValues) {
                barsEnter.append('text')
                    .attr('text-anchor', 'middle')
                ;

                bars.select('text')
                    .text(function(d,i) { return valueFormat(getY(d,i)) })
                    .watchTransition(renderWatch, 'discreteBar: bars text')
                    .attr('x', x.rangeBand() * .9 / 2)
                    .attr('y', function(d,i) { return getY(d,i) < 0 ? y(getY(d,i)) - y(0) + 12 : -4 })

                ;
            } else {
                bars.selectAll('text').remove();
            }

            bars
                .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive' })
                .style('fill', function(d,i) { return d.color || color(d,i) })
                .style('stroke', function(d,i) { return d.color || color(d,i) })
                .select('rect')
                .attr('class', rectClass)
                .watchTransition(renderWatch, 'discreteBar: bars rect')
                .attr('width', x.rangeBand() * .9 / data.length);
            bars.watchTransition(renderWatch, 'discreteBar: bars')
                //.delay(function(d,i) { return i * 1200 / data[0].values.length })
                .attr('transform', function(d,i) {
                    var left = x(getX(d,i)) + x.rangeBand() * .05,
                        top = getY(d,i) < 0 ?
                            y(0) :
                                y(0) - y(getY(d,i)) < 1 ?
                            y(0) - 1 : //make 1 px positive bars show up above y=0
                            y(getY(d,i));

                    return 'translate(' + left + ', ' + top + ')'
                })
                .select('rect')
                .attr('height', function(d,i) {
                    return  Math.max(Math.abs(y(getY(d,i)) - y(0)), 1)
                });


            //store old scales for use in transitions on update
            x0 = x.copy();
            y0 = y.copy();

        });

        renderWatch.renderEnd('discreteBar immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:   {get: function(){return width;}, set: function(_){width=_;}},
        height:  {get: function(){return height;}, set: function(_){height=_;}},
        forceY:  {get: function(){return forceY;}, set: function(_){forceY=_;}},
        showValues: {get: function(){return showValues;}, set: function(_){showValues=_;}},
        x:       {get: function(){return getX;}, set: function(_){getX=_;}},
        y:       {get: function(){return getY;}, set: function(_){getY=_;}},
        xScale:  {get: function(){return x;}, set: function(_){x=_;}},
        yScale:  {get: function(){return y;}, set: function(_){y=_;}},
        xDomain: {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain: {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:  {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:  {get: function(){return yRange;}, set: function(_){yRange=_;}},
        valueFormat:    {get: function(){return valueFormat;}, set: function(_){valueFormat=_;}},
        id:          {get: function(){return id;}, set: function(_){id=_;}},
        rectClass: {get: function(){return rectClass;}, set: function(_){rectClass=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};

nv.models.discreteBarChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var discretebar = nv.models.discreteBar()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
	, legend = nv.models.legend()
        , tooltip = nv.models.tooltip()
        ;

    var margin = {top: 15, right: 10, bottom: 50, left: 60}
        , marginTop = null
        , width = null
        , height = null
        , color = nv.utils.getColor()
	, showLegend = false
        , showXAxis = true
        , showYAxis = true
        , rightAlignYAxis = false
        , staggerLabels = false
        , wrapLabels = false
        , rotateLabels = 0
        , x
        , y
        , noData = null
        , dispatch = d3.dispatch('beforeUpdate','renderEnd')
        , duration = 250
        ;

    xAxis
        .orient('bottom')
        .showMaxMin(false)
        .tickFormat(function(d) { return d })
    ;
    yAxis
        .orient((rightAlignYAxis) ? 'right' : 'left')
        .tickFormat(d3.format(',.1f'))
    ;

    tooltip
        .duration(0)
        .headerEnabled(false)
        .valueFormatter(function(d, i) {
            return yAxis.tickFormat()(d, i);
        })
        .keyFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        });

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(discretebar);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);

        selection.each(function(data) {
            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() {
                dispatch.beforeUpdate();
                container.transition().duration(duration).call(chart);
            };
            chart.container = this;

            // Display No Data message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container);
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            x = discretebar.xScale();
            y = discretebar.yScale().clamp(true);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-discreteBarWithAxes').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-discreteBarWithAxes').append('g');
            var defsEnter = gEnter.append('defs');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y nv-axis')
                .append('g').attr('class', 'nv-zeroLine')
                .append('line');

            gEnter.append('g').attr('class', 'nv-barsWrap');
	    gEnter.append('g').attr('class', 'nv-legendWrap');

            g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                legend.width(availableWidth);

                g.select('.nv-legendWrap')
                    .datum(data)
                    .call(legend);

                if (!marginTop && legend.height() !== margin.top) {
                    margin.top = legend.height();
                    availableHeight = nv.utils.availableHeight(height, container, margin);
                }

                wrap.select('.nv-legendWrap')
                    .attr('transform', 'translate(0,' + (-margin.top) +')')
            }

            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            // Main Chart Component(s)
            discretebar
                .width(availableWidth)
                .height(availableHeight);

            var barsWrap = g.select('.nv-barsWrap')
                .datum(data.filter(function(d) { return !d.disabled }));

            barsWrap.transition().call(discretebar);


            defsEnter.append('clipPath')
                .attr('id', 'nv-x-label-clip-' + discretebar.id())
                .append('rect');

            g.select('#nv-x-label-clip-' + discretebar.id() + ' rect')
                .attr('width', x.rangeBand() * (staggerLabels ? 2 : 1))
                .attr('height', 16)
                .attr('x', -x.rangeBand() / (staggerLabels ? 1 : 2 ));

            // Setup Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize(-availableHeight, 0);

                g.select('.nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + (y.range()[0] + ((discretebar.showValues() && y.domain()[0] < 0) ? 16 : 0)) + ')');
                g.select('.nv-x.nv-axis').call(xAxis);

                var xTicks = g.select('.nv-x.nv-axis').selectAll('g');
                if (staggerLabels) {
                    xTicks
                        .selectAll('text')
                        .attr('transform', function(d,i,j) { return 'translate(0,' + (j % 2 == 0 ? '5' : '17') + ')' })
                }

                if (rotateLabels) {
                    xTicks
                        .selectAll('.tick text')
                        .attr('transform', 'rotate(' + rotateLabels + ' 0,0)')
                        .style('text-anchor', rotateLabels > 0 ? 'start' : 'end');
                }

                if (wrapLabels) {
                    g.selectAll('.tick text')
                        .call(nv.utils.wrapTicks, chart.xAxis.rangeBand())
                }
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                    .tickSize( -availableWidth, 0);

                g.select('.nv-y.nv-axis').call(yAxis);
            }

            // Zero line
            g.select(".nv-zeroLine line")
                .attr("x1",0)
                .attr("x2",(rightAlignYAxis) ? -availableWidth : availableWidth)
                .attr("y1", y(0))
                .attr("y2", y(0))
            ;
        });

        renderWatch.renderEnd('discreteBar chart immediate');
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    discretebar.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt['series'] = {
            key: chart.x()(evt.data),
            value: chart.y()(evt.data),
            color: evt.color
        };
        tooltip.data(evt).hidden(false);
    });

    discretebar.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    discretebar.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.discretebar = discretebar;
    chart.legend = legend;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
	showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        staggerLabels: {get: function(){return staggerLabels;}, set: function(_){staggerLabels=_;}},
        rotateLabels:  {get: function(){return rotateLabels;}, set: function(_){rotateLabels=_;}},
        wrapLabels:  {get: function(){return wrapLabels;}, set: function(_){wrapLabels=!!_;}},
        showXAxis: {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis: {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            discretebar.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            discretebar.color(color);
	    legend.color(color);
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( (_) ? 'right' : 'left');
        }}
    });

    nv.utils.inheritOptions(chart, discretebar);
    nv.utils.initOptions(chart);

    return chart;
}

nv.models.distribution = function() {
    "use strict";
    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 400 //technically width or height depending on x or y....
        , size = 8
        , axis = 'x' // 'x' or 'y'... horizontal or vertical
        , getData = function(d) { return d[axis] }  // defaults d.x or d.y
        , color = nv.utils.defaultColor()
        , scale = d3.scale.linear()
        , domain
        , duration = 250
        , dispatch = d3.dispatch('renderEnd')
        ;

    //============================================================


    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var scale0;
    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    //============================================================


    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var availableLength = width - (axis === 'x' ? margin.left + margin.right : margin.top + margin.bottom),
                naxis = axis == 'x' ? 'y' : 'x',
                container = d3.select(this);
            nv.utils.initSVG(container);

            //------------------------------------------------------------
            // Setup Scales

            scale0 = scale0 || scale;

            //------------------------------------------------------------


            //------------------------------------------------------------
            // Setup containers and skeleton of chart

            var wrap = container.selectAll('g.nv-distribution').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-distribution');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            //------------------------------------------------------------


            var distWrap = g.selectAll('g.nv-dist')
                .data(function(d) { return d }, function(d) { return d.key });

            distWrap.enter().append('g');
            distWrap
                .attr('class', function(d,i) { return 'nv-dist nv-series-' + i })
                .style('stroke', function(d,i) { return color(d, i) });

            var dist = distWrap.selectAll('line.nv-dist' + axis)
                .data(function(d) { return d.values })
            dist.enter().append('line')
                .attr(axis + '1', function(d,i) { return scale0(getData(d,i)) })
                .attr(axis + '2', function(d,i) { return scale0(getData(d,i)) })
            renderWatch.transition(distWrap.exit().selectAll('line.nv-dist' + axis), 'dist exit')
                // .transition()
                .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
                .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })
                .style('stroke-opacity', 0)
                .remove();
            dist
                .attr('class', function(d,i) { return 'nv-dist' + axis + ' nv-dist' + axis + '-' + i })
                .attr(naxis + '1', 0)
                .attr(naxis + '2', size);
            renderWatch.transition(dist, 'dist')
                // .transition()
                .attr(axis + '1', function(d,i) { return scale(getData(d,i)) })
                .attr(axis + '2', function(d,i) { return scale(getData(d,i)) })


            scale0 = scale.copy();

        });
        renderWatch.renderEnd('distribution immediate');
        return chart;
    }


    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------
    chart.options = nv.utils.optionsFunc.bind(chart);
    chart.dispatch = dispatch;

    chart.margin = function(_) {
        if (!arguments.length) return margin;
        margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
        margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
        margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
        margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
        return chart;
    };

    chart.width = function(_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.axis = function(_) {
        if (!arguments.length) return axis;
        axis = _;
        return chart;
    };

    chart.size = function(_) {
        if (!arguments.length) return size;
        size = _;
        return chart;
    };

    chart.getData = function(_) {
        if (!arguments.length) return getData;
        getData = d3.functor(_);
        return chart;
    };

    chart.scale = function(_) {
        if (!arguments.length) return scale;
        scale = _;
        return chart;
    };

    chart.color = function(_) {
        if (!arguments.length) return color;
        color = nv.utils.getColor(_);
        return chart;
    };

    chart.duration = function(_) {
        if (!arguments.length) return duration;
        duration = _;
        renderWatch.reset(duration);
        return chart;
    };
    //============================================================


    return chart;
}
nv.models.focus = function(content) {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var content = content || nv.models.line()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
        , brush = d3.svg.brush()
        ;

    var margin = {top: 10, right: 0, bottom: 30, left: 0}
        , color = nv.utils.defaultColor()
        , width = null
        , height = 70
        , showXAxis = true
        , showYAxis = false
        , rightAlignYAxis = false
        , ticks = null
        , x
        , y
        , brushExtent = null
        , duration = 250
        , dispatch = d3.dispatch('brush', 'onBrush', 'renderEnd')
        , syncBrushing = true
        ;

    content.interactive(false);
    content.pointActive(function(d) { return false; });

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(content);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);

        selection.each(function(data) {
            var container = d3.select(this);
            nv.utils.initSVG(container);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = height - margin.top - margin.bottom;

            chart.update = function() { 
                if( duration === 0 ) {
                    container.call( chart );
                } else {
                    container.transition().duration(duration).call(chart);
                }
            };
            chart.container = this;

            // Setup Scales
            x = content.xScale();
            y = content.yScale();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-focus').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-focus').append('g');
            var g = wrap.select('g');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            gEnter.append('g').attr('class', 'nv-background').append('rect');
            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y nv-axis');
            gEnter.append('g').attr('class', 'nv-contentWrap');
            gEnter.append('g').attr('class', 'nv-brushBackground');
            gEnter.append('g').attr('class', 'nv-x nv-brush');

            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            g.select('.nv-background rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);
                
            content
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    return d.color || color(d, i);
                }).filter(function(d,i) { return !data[i].disabled; }));

            var contentWrap = g.select('.nv-contentWrap')
                .datum(data.filter(function(d) { return !d.disabled; }));

            d3.transition(contentWrap).call(content);
            
            // Setup Brush
            brush
                .x(x)
                .on('brush', function() {
                    onBrush(syncBrushing);
                });

            brush.on('brushend', function () {
                if (!syncBrushing) {
                    dispatch.onBrush(brush.empty() ? x.domain() : brush.extent());
                }
            });

            if (brushExtent) brush.extent(brushExtent);

            var brushBG = g.select('.nv-brushBackground').selectAll('g')
                .data([brushExtent || brush.extent()]);
    
            var brushBGenter = brushBG.enter()
                .append('g');

            brushBGenter.append('rect')
                .attr('class', 'left')
                .attr('x', 0)
                .attr('y', 0)
                .attr('height', availableHeight);

            brushBGenter.append('rect')
                .attr('class', 'right')
                .attr('x', 0)
                .attr('y', 0)
                .attr('height', availableHeight);

            var gBrush = g.select('.nv-x.nv-brush')
                .call(brush);
            gBrush.selectAll('rect')
                .attr('height', availableHeight);
            gBrush.selectAll('.resize').append('path').attr('d', resizePath);

            onBrush(true);

            g.select('.nv-background rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            if (showXAxis) {
                xAxis.scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize(-availableHeight, 0);
  
                g.select('.nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + y.range()[0] + ')');
                d3.transition(g.select('.nv-x.nv-axis'))
                    .call(xAxis);
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                    .tickSize( -availableWidth, 0);

                d3.transition(g.select('.nv-y.nv-axis'))
                    .call(yAxis);
            }
            
            g.select('.nv-x.nv-axis')
                .attr('transform', 'translate(0,' + y.range()[0] + ')');

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            //============================================================
            // Functions
            //------------------------------------------------------------
    
            // Taken from crossfilter (http://square.github.com/crossfilter/)
            function resizePath(d) {
                var e = +(d == 'e'),
                    x = e ? 1 : -1,
                    y = availableHeight / 3;
                return 'M' + (0.5 * x) + ',' + y
                    + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
                    + 'V' + (2 * y - 6)
                    + 'A6,6 0 0 ' + e + ' ' + (0.5 * x) + ',' + (2 * y)
                    + 'Z'
                    + 'M' + (2.5 * x) + ',' + (y + 8)
                    + 'V' + (2 * y - 8)
                    + 'M' + (4.5 * x) + ',' + (y + 8)
                    + 'V' + (2 * y - 8);
            }
    
    
            function updateBrushBG() {
                if (!brush.empty()) brush.extent(brushExtent);
                brushBG
                    .data([brush.empty() ? x.domain() : brushExtent])
                    .each(function(d,i) {
                        var leftWidth = x(d[0]) - x.range()[0],
                            rightWidth = availableWidth - x(d[1]);
                        d3.select(this).select('.left')
                            .attr('width',  leftWidth < 0 ? 0 : leftWidth);
    
                        d3.select(this).select('.right')
                            .attr('x', x(d[1]))
                            .attr('width', rightWidth < 0 ? 0 : rightWidth);
                    });
            }


            function onBrush(shouldDispatch) {
                brushExtent = brush.empty() ? null : brush.extent();
                var extent = brush.empty() ? x.domain() : brush.extent();
                dispatch.brush({extent: extent, brush: brush});
                updateBrushBG();
                if (shouldDispatch) {
                    dispatch.onBrush(extent);
                }
            }
        });

        renderWatch.renderEnd('focus immediate');
        return chart;
    }


    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.content = content;
    chart.brush = brush;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showXAxis:      {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis:    {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        brushExtent: {get: function(){return brushExtent;}, set: function(_){brushExtent=_;}},
        syncBrushing: {get: function(){return syncBrushing;}, set: function(_){syncBrushing=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            content.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            content.color(color);
        }},
        interpolate: {get: function(){return content.interpolate();}, set: function(_){
            content.interpolate(_);
        }},
        xTickFormat: {get: function(){return xAxis.tickFormat();}, set: function(_){
            xAxis.tickFormat(_);
        }},
        yTickFormat: {get: function(){return yAxis.tickFormat();}, set: function(_){
            yAxis.tickFormat(_);
        }},
        x: {get: function(){return content.x();}, set: function(_){
            content.x(_);
        }},
        y: {get: function(){return content.y();}, set: function(_){
            content.y(_);
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( rightAlignYAxis ? 'right' : 'left');
        }}
    });

    nv.utils.inheritOptions(chart, content);
    nv.utils.initOptions(chart);

    return chart;
};
nv.models.forceDirectedGraph = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------
    var margin = {top: 2, right: 0, bottom: 2, left: 0}
        , width = 400
        , height = 32
        , container = null
        , dispatch = d3.dispatch('renderEnd')
        , color = nv.utils.getColor(['#000'])
        , tooltip      = nv.models.tooltip()
        , noData = null
        // Force directed graph specific parameters [default values]
        , linkStrength = 0.1
        , friction = 0.9
        , linkDist = 30
        , charge = -120
        , gravity = 0.1
        , theta = 0.8
        , alpha = 0.1
        , radius = 5
        // These functions allow to add extra attributes to ndes and links
        ,nodeExtras = function(nodes) { /* Do nothing */ }
        ,linkExtras = function(links) { /* Do nothing */ }
        , getX=d3.functor(0.0)
        , getY=d3.functor(0.0)
        ;


    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);

    function chart(selection) {
        renderWatch.reset();

        selection.each(function(data) {
          container = d3.select(this);
          nv.utils.initSVG(container);

          var availableWidth = nv.utils.availableWidth(width, container, margin),
              availableHeight = nv.utils.availableHeight(height, container, margin);

          container
                  .attr("width", availableWidth)
                  .attr("height", availableHeight);

          // Display No Data message if there's nothing to show.
          if (!data || !data.links || !data.nodes) {
              nv.utils.noData(chart, container)
              return chart;
          } else {
              container.selectAll('.nv-noData').remove();
          }
          container.selectAll('*').remove();

          // Collect names of all fields in the nodes
          var nodeFieldSet = new Set();
          data.nodes.forEach(function(node) {
            var keys = Object.keys(node);
            keys.forEach(function(key) {
              nodeFieldSet.add(key);
            });
          });

          var force = d3.layout.force()
                .nodes(data.nodes)
                .links(data.links)
                .size([availableWidth, availableHeight])
                .linkStrength(linkStrength)
                .friction(friction)
                .linkDistance(linkDist)
                .charge(charge)
                .gravity(gravity)
                .theta(theta)
                .alpha(alpha)
                .start();

          var link = container.selectAll(".link")
                .data(data.links)
                .enter().append("line")
                .attr("class", "nv-force-link")
                .style("stroke-width", function(d) { return Math.sqrt(d.value); });

          var node = container.selectAll(".node")
                .data(data.nodes)
                .enter()
                .append("g")
                .attr("class", "nv-force-node")
                .call(force.drag);

          node
            .append("circle")
            .attr("r", radius)
            .style("fill", function(d) { return color(d) } )
            .on("mouseover", function(evt) {
              container.select('.nv-series-' + evt.seriesIndex + ' .nv-distx-' + evt.pointIndex)
                  .attr('y1', evt.py);
              container.select('.nv-series-' + evt.seriesIndex + ' .nv-disty-' + evt.pointIndex)
                  .attr('x2', evt.px);

              // Add 'series' object to
              var nodeColor = color(evt);
              evt.series = [];
              nodeFieldSet.forEach(function(field) {
                evt.series.push({
                  color: nodeColor,
                  key:   field,
                  value: evt[field]
                });
              });
              tooltip.data(evt).hidden(false);
            })
            .on("mouseout",  function(d) {
              tooltip.hidden(true);
            });

          tooltip.headerFormatter(function(d) {return "Node";});

          // Apply extra attributes to nodes and links (if any)
          linkExtras(link);
          nodeExtras(node);

          force.on("tick", function() {
              link.attr("x1", function(d) { return d.source.x; })
                  .attr("y1", function(d) { return d.source.y; })
                  .attr("x2", function(d) { return d.target.x; })
                  .attr("y2", function(d) { return d.target.y; });

              node.attr("transform", function(d) {
                return "translate(" + d.x + ", " + d.y + ")";
              });
            });
        });

        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:     {get: function(){return width;}, set: function(_){width=_;}},
        height:    {get: function(){return height;}, set: function(_){height=_;}},

        // Force directed graph specific parameters
        linkStrength:{get: function(){return linkStrength;}, set: function(_){linkStrength=_;}},
        friction:    {get: function(){return friction;}, set: function(_){friction=_;}},
        linkDist:    {get: function(){return linkDist;}, set: function(_){linkDist=_;}},
        charge:      {get: function(){return charge;}, set: function(_){charge=_;}},
        gravity:     {get: function(){return gravity;}, set: function(_){gravity=_;}},
        theta:       {get: function(){return theta;}, set: function(_){theta=_;}},
        alpha:       {get: function(){return alpha;}, set: function(_){alpha=_;}},
        radius:      {get: function(){return radius;}, set: function(_){radius=_;}},

        //functor options
        x: {get: function(){return getX;}, set: function(_){getX=d3.functor(_);}},
        y: {get: function(){return getY;}, set: function(_){getY=d3.functor(_);}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        nodeExtras: {get: function(){return nodeExtras;}, set: function(_){
            nodeExtras = _;
        }},
        linkExtras: {get: function(){return linkExtras;}, set: function(_){
            linkExtras = _;
        }}
    });

    chart.dispatch = dispatch;
    chart.tooltip = tooltip;
    nv.utils.initOptions(chart);
    return chart;
};
nv.models.furiousLegend = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 5, right: 0, bottom: 5, left: 0}
        , width = 400
        , height = 20
        , getKey = function(d) { return d.key }
        , keyFormatter = function (d) { return d }
        , color = nv.utils.getColor()
        , maxKeyLength = 20 //default value for key lengths
        , align = true
        , padding = 28 //define how much space between legend items. - recommend 32 for furious version
        , rightAlign = true
        , updateState = true   //If true, legend will update data.disabled and trigger a 'stateChange' dispatch.
        , radioButtonMode = false   //If true, clicking legend items will cause it to behave like a radio button. (only one can be selected at a time)
        , expanded = false
        , dispatch = d3.dispatch('legendClick', 'legendDblclick', 'legendMouseover', 'legendMouseout', 'stateChange')
        , vers = 'classic' //Options are "classic" and "furious"
        ;

    function chart(selection) {
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                container = d3.select(this);
            nv.utils.initSVG(container);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-legend').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-legend').append('g');
            var g = wrap.select('g');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var series = g.selectAll('.nv-series')
                .data(function(d) {
                    if(vers != 'furious') return d;

                    return d.filter(function(n) {
                        return expanded ? true : !n.disengaged;
                    });
                });
            var seriesEnter = series.enter().append('g').attr('class', 'nv-series')

            var seriesShape;

            if(vers == 'classic') {
                seriesEnter.append('circle')
                    .style('stroke-width', 2)
                    .attr('class','nv-legend-symbol')
                    .attr('r', 5);

                seriesShape = series.select('circle');
            } else if (vers == 'furious') {
                seriesEnter.append('rect')
                    .style('stroke-width', 2)
                    .attr('class','nv-legend-symbol')
                    .attr('rx', 3)
                    .attr('ry', 3);

                seriesShape = series.select('rect');

                seriesEnter.append('g')
                    .attr('class', 'nv-check-box')
                    .property('innerHTML','<path d="M0.5,5 L22.5,5 L22.5,26.5 L0.5,26.5 L0.5,5 Z" class="nv-box"></path><path d="M5.5,12.8618467 L11.9185089,19.2803556 L31,0.198864511" class="nv-check"></path>')
                    .attr('transform', 'translate(-10,-8)scale(0.5)');

                var seriesCheckbox = series.select('.nv-check-box');

                seriesCheckbox.each(function(d,i) {
                    d3.select(this).selectAll('path')
                        .attr('stroke', setTextColor(d,i));
                });
            }

            seriesEnter.append('text')
                .attr('text-anchor', 'start')
                .attr('class','nv-legend-text')
                .attr('dy', '.32em')
                .attr('dx', '8');

            var seriesText = series.select('text.nv-legend-text');

            series
                .on('mouseover', function(d,i) {
                    dispatch.legendMouseover(d,i);  //TODO: Make consistent with other event objects
                })
                .on('mouseout', function(d,i) {
                    dispatch.legendMouseout(d,i);
                })
                .on('click', function(d,i) {
                    dispatch.legendClick(d,i);
                    // make sure we re-get data in case it was modified
                    var data = series.data();
                    if (updateState) {
                        if(vers =='classic') {
                            if (radioButtonMode) {
                                //Radio button mode: set every series to disabled,
                                //  and enable the clicked series.
                                data.forEach(function(series) { series.disabled = true});
                                d.disabled = false;
                            }
                            else {
                                d.disabled = !d.disabled;
                                if (data.every(function(series) { return series.disabled})) {
                                    //the default behavior of NVD3 legends is, if every single series
                                    // is disabled, turn all series' back on.
                                    data.forEach(function(series) { series.disabled = false});
                                }
                            }
                        } else if(vers == 'furious') {
                            if(expanded) {
                                d.disengaged = !d.disengaged;
                                d.userDisabled = d.userDisabled == undefined ? !!d.disabled : d.userDisabled;
                                d.disabled = d.disengaged || d.userDisabled;
                            } else if (!expanded) {
                                d.disabled = !d.disabled;
                                d.userDisabled = d.disabled;
                                var engaged = data.filter(function(d) { return !d.disengaged; });
                                if (engaged.every(function(series) { return series.userDisabled })) {
                                    //the default behavior of NVD3 legends is, if every single series
                                    // is disabled, turn all series' back on.
                                    data.forEach(function(series) {
                                        series.disabled = series.userDisabled = false;
                                    });
                                }
                            }
                        }
                        dispatch.stateChange({
                            disabled: data.map(function(d) { return !!d.disabled }),
                            disengaged: data.map(function(d) { return !!d.disengaged })
                        });

                    }
                })
                .on('dblclick', function(d,i) {
                    if(vers == 'furious' && expanded) return;
                    dispatch.legendDblclick(d,i);
                    if (updateState) {
                        // make sure we re-get data in case it was modified
                        var data = series.data();
                        //the default behavior of NVD3 legends, when double clicking one,
                        // is to set all other series' to false, and make the double clicked series enabled.
                        data.forEach(function(series) {
                            series.disabled = true;
                            if(vers == 'furious') series.userDisabled = series.disabled;
                        });
                        d.disabled = false;
                        if(vers == 'furious') d.userDisabled = d.disabled;
                        dispatch.stateChange({
                            disabled: data.map(function(d) { return !!d.disabled })
                        });
                    }
                });

            series.classed('nv-disabled', function(d) { return d.userDisabled });
            series.exit().remove();

            seriesText
                .attr('fill', setTextColor)
                .text(function (d) { return keyFormatter(getKey(d)) });

            //TODO: implement fixed-width and max-width options (max-width is especially useful with the align option)
            // NEW ALIGNING CODE, TODO: clean up

            var versPadding;
            switch(vers) {
                case 'furious' :
                    versPadding = 23;
                    break;
                case 'classic' :
                    versPadding = 20;
            }

            if (align) {

                var seriesWidths = [];
                series.each(function(d,i) {
                    var legendText;
                    if (keyFormatter(getKey(d)) && keyFormatter(getKey(d)).length > maxKeyLength) {
                        var trimmedKey = keyFormatter(getKey(d)).substring(0, maxKeyLength);
                        legendText = d3.select(this).select('text').text(trimmedKey + "...");
                        d3.select(this).append("svg:title").text(keyFormatter(getKey(d)));
                    } else {
                        legendText = d3.select(this).select('text');
                    }
                    var nodeTextLength;
                    try {
                        nodeTextLength = legendText.node().getComputedTextLength();
                        // If the legendText is display:none'd (nodeTextLength == 0), simulate an error so we approximate, instead
                        if(nodeTextLength <= 0) throw Error();
                    }
                    catch(e) {
                        nodeTextLength = nv.utils.calcApproxTextWidth(legendText);
                    }

                    seriesWidths.push(nodeTextLength + padding);
                });

                var seriesPerRow = 0;
                var legendWidth = 0;
                var columnWidths = [];

                while ( legendWidth < availableWidth && seriesPerRow < seriesWidths.length) {
                    columnWidths[seriesPerRow] = seriesWidths[seriesPerRow];
                    legendWidth += seriesWidths[seriesPerRow++];
                }
                if (seriesPerRow === 0) seriesPerRow = 1; //minimum of one series per row

                while ( legendWidth > availableWidth && seriesPerRow > 1 ) {
                    columnWidths = [];
                    seriesPerRow--;

                    for (var k = 0; k < seriesWidths.length; k++) {
                        if (seriesWidths[k] > (columnWidths[k % seriesPerRow] || 0) )
                            columnWidths[k % seriesPerRow] = seriesWidths[k];
                    }

                    legendWidth = columnWidths.reduce(function(prev, cur, index, array) {
                        return prev + cur;
                    });
                }

                var xPositions = [];
                for (var i = 0, curX = 0; i < seriesPerRow; i++) {
                    xPositions[i] = curX;
                    curX += columnWidths[i];
                }

                series
                    .attr('transform', function(d, i) {
                        return 'translate(' + xPositions[i % seriesPerRow] + ',' + (5 + Math.floor(i / seriesPerRow) * versPadding) + ')';
                    });

                //position legend as far right as possible within the total width
                if (rightAlign) {
                    g.attr('transform', 'translate(' + (width - margin.right - legendWidth) + ',' + margin.top + ')');
                }
                else {
                    g.attr('transform', 'translate(0' + ',' + margin.top + ')');
                }

                height = margin.top + margin.bottom + (Math.ceil(seriesWidths.length / seriesPerRow) * versPadding);

            } else {

                var ypos = 5,
                    newxpos = 5,
                    maxwidth = 0,
                    xpos;
                series
                    .attr('transform', function(d, i) {
                        var length = d3.select(this).select('text').node().getComputedTextLength() + padding;
                        xpos = newxpos;

                        if (width < margin.left + margin.right + xpos + length) {
                            newxpos = xpos = 5;
                            ypos += versPadding;
                        }

                        newxpos += length;
                        if (newxpos > maxwidth) maxwidth = newxpos;

                        return 'translate(' + xpos + ',' + ypos + ')';
                    });

                //position legend as far right as possible within the total width
                g.attr('transform', 'translate(' + (width - margin.right - maxwidth) + ',' + margin.top + ')');

                height = margin.top + margin.bottom + ypos + 15;
            }

            if(vers == 'furious') {
                // Size rectangles after text is placed
                seriesShape
                    .attr('width', function(d,i) {
                        return seriesText[0][i].getComputedTextLength() + 27;
                    })
                    .attr('height', 18)
                    .attr('y', -9)
                    .attr('x', -15)
            }

            seriesShape
                .style('fill', setBGColor)
                .style('stroke', function(d,i) { return d.color || color(d, i) });
        });

        function setTextColor(d,i) {
            if(vers != 'furious') return '#000';
            if(expanded) {
                return d.disengaged ? color(d,i) : '#fff';
            } else if (!expanded) {
                return !!d.disabled ? color(d,i) : '#fff';
            }
        }

        function setBGColor(d,i) {
            if(expanded && vers == 'furious') {
                return d.disengaged ? '#fff' : color(d,i);
            } else {
                return !!d.disabled ? '#fff' : color(d,i);
            }
        }

        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:          {get: function(){return width;}, set: function(_){width=_;}},
        height:         {get: function(){return height;}, set: function(_){height=_;}},
        key:            {get: function(){return getKey;}, set: function(_){getKey=_;}},
        keyFormatter:   {get: function(){return keyFormatter;}, set: function(_){keyFormatter=_;}},
        align:          {get: function(){return align;}, set: function(_){align=_;}},
        rightAlign:     {get: function(){return rightAlign;}, set: function(_){rightAlign=_;}},
        maxKeyLength:   {get: function(){return maxKeyLength;}, set: function(_){maxKeyLength=_;}},
        padding:        {get: function(){return padding;}, set: function(_){padding=_;}},
        updateState:    {get: function(){return updateState;}, set: function(_){updateState=_;}},
        radioButtonMode:{get: function(){return radioButtonMode;}, set: function(_){radioButtonMode=_;}},
        expanded:       {get: function(){return expanded;}, set: function(_){expanded=_;}},
        vers:           {get: function(){return vers;}, set: function(_){vers=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};
//TODO: consider deprecating and using multibar with single series for this
nv.models.historicalBar = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = null
        , height = null
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container = null
        , x = d3.scale.linear()
        , y = d3.scale.linear()
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , forceX = []
        , forceY = [0]
        , padData = false
        , clipEdge = true
        , color = nv.utils.defaultColor()
        , xDomain
        , yDomain
        , xRange
        , yRange
        , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd')
        , interactive = true
        ;

    var renderWatch = nv.utils.renderWatch(dispatch, 0);

    function chart(selection) {
        selection.each(function(data) {
            renderWatch.reset();

            container = d3.select(this);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            nv.utils.initSVG(container);

            // Setup Scales
            x.domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ));

            if (padData)
                x.range(xRange || [availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
            else
                x.range(xRange || [0, availableWidth]);

            y.domain(yDomain || d3.extent(data[0].values.map(getY).concat(forceY) ))
                .range(yRange || [availableHeight, 0]);

            // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
            if (x.domain()[0] === x.domain()[1])
                x.domain()[0] ?
                    x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
                    : x.domain([-1,1]);

            if (y.domain()[0] === y.domain()[1])
                y.domain()[0] ?
                    y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
                    : y.domain([-1,1]);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-historicalBar-' + id).data([data[0].values]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-historicalBar-' + id);
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-bars');
            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            container
                .on('click', function(d,i) {
                    dispatch.chartClick({
                        data: d,
                        index: i,
                        pos: d3.event,
                        id: id
                    });
                });

            defsEnter.append('clipPath')
                .attr('id', 'nv-chart-clip-path-' + id)
                .append('rect');

            wrap.select('#nv-chart-clip-path-' + id + ' rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            g.attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');

            var bars = wrap.select('.nv-bars').selectAll('.nv-bar')
                .data(function(d) { return d }, function(d,i) {return getX(d,i)});
            bars.exit().remove();

            bars.enter().append('rect')
                .attr('x', 0 )
                .attr('y', function(d,i) {  return nv.utils.NaNtoZero(y(Math.max(0, getY(d,i)))) })
                .attr('height', function(d,i) { return nv.utils.NaNtoZero(Math.abs(y(getY(d,i)) - y(0))) })
                .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - availableWidth / data[0].values.length * .45) + ',0)'; })
                .on('mouseover', function(d,i) {
                    if (!interactive) return;
                    d3.select(this).classed('hover', true);
                    dispatch.elementMouseover({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });

                })
                .on('mouseout', function(d,i) {
                    if (!interactive) return;
                    d3.select(this).classed('hover', false);
                    dispatch.elementMouseout({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mousemove', function(d,i) {
                    if (!interactive) return;
                    dispatch.elementMousemove({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('click', function(d,i) {
                    if (!interactive) return;
                    var element = this;
                    dispatch.elementClick({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill"),
                        event: d3.event,
                        element: element
                    });
                    d3.event.stopPropagation();
                })
                .on('dblclick', function(d,i) {
                    if (!interactive) return;
                    dispatch.elementDblClick({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                    d3.event.stopPropagation();
                });

            bars
                .attr('fill', function(d,i) { return color(d, i); })
                .attr('class', function(d,i,j) { return (getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive') + ' nv-bar-' + j + '-' + i })
                .watchTransition(renderWatch, 'bars')
                .attr('transform', function(d,i) { return 'translate(' + (x(getX(d,i)) - availableWidth / data[0].values.length * .45) + ',0)'; })
                //TODO: better width calculations that don't assume always uniform data spacing;w
                .attr('width', (availableWidth / data[0].values.length) * .9 );

            bars.watchTransition(renderWatch, 'bars')
                .attr('y', function(d,i) {
                    var rval = getY(d,i) < 0 ?
                        y(0) :
                            y(0) - y(getY(d,i)) < 1 ?
                        y(0) - 1 :
                        y(getY(d,i));
                    return nv.utils.NaNtoZero(rval);
                })
                .attr('height', function(d,i) { return nv.utils.NaNtoZero(Math.max(Math.abs(y(getY(d,i)) - y(0)),1)) });

        });

        renderWatch.renderEnd('historicalBar immediate');
        return chart;
    }

    //Create methods to allow outside functions to highlight a specific bar.
    chart.highlightPoint = function(pointIndex, isHoverOver) {
        container
            .select(".nv-bars .nv-bar-0-" + pointIndex)
            .classed("hover", isHoverOver)
        ;
    };

    chart.clearHighlights = function() {
        container
            .select(".nv-bars .nv-bar.hover")
            .classed("hover", false)
        ;
    };

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:   {get: function(){return width;}, set: function(_){width=_;}},
        height:  {get: function(){return height;}, set: function(_){height=_;}},
        forceX:  {get: function(){return forceX;}, set: function(_){forceX=_;}},
        forceY:  {get: function(){return forceY;}, set: function(_){forceY=_;}},
        padData: {get: function(){return padData;}, set: function(_){padData=_;}},
        x:       {get: function(){return getX;}, set: function(_){getX=_;}},
        y:       {get: function(){return getY;}, set: function(_){getY=_;}},
        xScale:  {get: function(){return x;}, set: function(_){x=_;}},
        yScale:  {get: function(){return y;}, set: function(_){y=_;}},
        xDomain: {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain: {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:  {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:  {get: function(){return yRange;}, set: function(_){yRange=_;}},
        clipEdge:    {get: function(){return clipEdge;}, set: function(_){clipEdge=_;}},
        id:          {get: function(){return id;}, set: function(_){id=_;}},
        interactive: {get: function(){return interactive;}, set: function(_){interactive=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};

nv.models.historicalBarChart = function(bar_model) {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var bars = bar_model || nv.models.historicalBar()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
        , legend = nv.models.legend()
        , interactiveLayer = nv.interactiveGuideline()
        , tooltip = nv.models.tooltip()
        ;


    var margin = {top: 30, right: 90, bottom: 50, left: 90}
        , marginTop = null
        , color = nv.utils.defaultColor()
        , width = null
        , height = null
        , showLegend = false
        , showXAxis = true
        , showYAxis = true
        , rightAlignYAxis = false
        , useInteractiveGuideline = false
        , x
        , y
        , state = {}
        , defaultState = null
        , noData = null
        , dispatch = d3.dispatch('tooltipHide', 'stateChange', 'changeState', 'renderEnd')
        , transitionDuration = 250
        ;

    xAxis.orient('bottom').tickPadding(7);
    yAxis.orient( (rightAlignYAxis) ? 'right' : 'left');
    tooltip
        .duration(0)
        .headerEnabled(false)
        .valueFormatter(function(d, i) {
            return yAxis.tickFormat()(d, i);
        })
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        });


    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch, 0);

    function chart(selection) {
        selection.each(function(data) {
            renderWatch.reset();
            renderWatch.models(bars);
            if (showXAxis) renderWatch.models(xAxis);
            if (showYAxis) renderWatch.models(yAxis);

            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() { container.transition().duration(transitionDuration).call(chart) };
            chart.container = this;

            //set state.disabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display noData message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            x = bars.xScale();
            y = bars.yScale();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-historicalBarChart').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-historicalBarChart').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y nv-axis');
            gEnter.append('g').attr('class', 'nv-barsWrap');
            gEnter.append('g').attr('class', 'nv-legendWrap');
            gEnter.append('g').attr('class', 'nv-interactive');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                legend.width(availableWidth);

                g.select('.nv-legendWrap')
                    .datum(data)
                    .call(legend);

                if (!marginTop && legend.height() !== margin.top) {
                    margin.top = legend.height();
                    availableHeight = nv.utils.availableHeight(height, container, margin);
                }

                wrap.select('.nv-legendWrap')
                    .attr('transform', 'translate(0,' + (-margin.top) +')')
            }
            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            //Set up interactive layer
            if (useInteractiveGuideline) {
                interactiveLayer
                    .width(availableWidth)
                    .height(availableHeight)
                    .margin({left:margin.left, top:margin.top})
                    .svgContainer(container)
                    .xScale(x);
                wrap.select(".nv-interactive").call(interactiveLayer);
            }
            bars
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    return d.color || color(d, i);
                }).filter(function(d,i) { return !data[i].disabled }));

            var barsWrap = g.select('.nv-barsWrap')
                .datum(data.filter(function(d) { return !d.disabled }));
            barsWrap.transition().call(bars);

            // Setup Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize(-availableHeight, 0);

                g.select('.nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + y.range()[0] + ')');
                g.select('.nv-x.nv-axis')
                    .transition()
                    .call(xAxis);
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                    .tickSize( -availableWidth, 0);

                g.select('.nv-y.nv-axis')
                    .transition()
                    .call(yAxis);
            }

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            interactiveLayer.dispatch.on('elementMousemove', function(e) {
                bars.clearHighlights();

                var singlePoint, pointIndex, pointXLocation, allData = [];
                data
                    .filter(function(series, i) {
                        series.seriesIndex = i;
                        return !series.disabled;
                    })
                    .forEach(function(series,i) {
                        pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
                        bars.highlightPoint(pointIndex,true);
                        var point = series.values[pointIndex];
                        if (point === undefined) return;
                        if (singlePoint === undefined) singlePoint = point;
                        if (pointXLocation === undefined) pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
                        allData.push({
                            key: series.key,
                            value: chart.y()(point, pointIndex),
                            color: color(series,series.seriesIndex),
                            data: series.values[pointIndex]
                        });
                    });

                var xValue = xAxis.tickFormat()(chart.x()(singlePoint,pointIndex));
                interactiveLayer.tooltip
                    .valueFormatter(function(d,i) {
                        return yAxis.tickFormat()(d);
                    })
                    .data({
                        value: xValue,
                        index: pointIndex,
                        series: allData
                    })();

                interactiveLayer.renderGuideLine(pointXLocation);

            });

            interactiveLayer.dispatch.on("elementMouseout",function(e) {
                dispatch.tooltipHide();
                bars.clearHighlights();
            });

            legend.dispatch.on('legendClick', function(d,i) {
                d.disabled = !d.disabled;

                if (!data.filter(function(d) { return !d.disabled }).length) {
                    data.map(function(d) {
                        d.disabled = false;
                        wrap.selectAll('.nv-series').classed('disabled', false);
                        return d;
                    });
                }

                state.disabled = data.map(function(d) { return !!d.disabled });
                dispatch.stateChange(state);

                selection.transition().call(chart);
            });

            legend.dispatch.on('legendDblclick', function(d) {
                //Double clicking should always enable current series, and disabled all others.
                data.forEach(function(d) {
                    d.disabled = true;
                });
                d.disabled = false;

                state.disabled = data.map(function(d) { return !!d.disabled });
                dispatch.stateChange(state);
                chart.update();
            });

            dispatch.on('changeState', function(e) {
                if (typeof e.disabled !== 'undefined') {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });

                    state.disabled = e.disabled;
                }

                chart.update();
            });
        });

        renderWatch.renderEnd('historicalBarChart immediate');
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    bars.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt['series'] = {
            key: chart.x()(evt.data),
            value: chart.y()(evt.data),
            color: evt.color
        };
        tooltip.data(evt).hidden(false);
    });

    bars.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    bars.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.bars = bars;
    chart.legend = legend;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.interactiveLayer = interactiveLayer;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        showXAxis: {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis: {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        defaultState:    {get: function(){return defaultState;}, set: function(_){defaultState=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
            bars.color(color);
        }},
        duration:    {get: function(){return transitionDuration;}, set: function(_){
            transitionDuration=_;
            renderWatch.reset(transitionDuration);
            yAxis.duration(transitionDuration);
            xAxis.duration(transitionDuration);
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( (_) ? 'right' : 'left');
        }},
        useInteractiveGuideline: {get: function(){return useInteractiveGuideline;}, set: function(_){
            useInteractiveGuideline = _;
            if (_ === true) {
                chart.interactive(false);
            }
        }}
    });

    nv.utils.inheritOptions(chart, bars);
    nv.utils.initOptions(chart);

    return chart;
};


// ohlcChart is just a historical chart with ohlc bars and some tweaks
nv.models.ohlcBarChart = function() {
    var chart = nv.models.historicalBarChart(nv.models.ohlcBar());

    // special default tooltip since we show multiple values per x
    chart.useInteractiveGuideline(true);
    chart.interactiveLayer.tooltip.contentGenerator(function(data) {
        // we assume only one series exists for this chart
        var d = data.series[0].data;
        // match line colors as defined in nv.d3.css
        var color = d.open < d.close ? "2ca02c" : "d62728";
        return '' +
            '<h3 style="color: #' + color + '">' + data.value + '</h3>' +
            '<table>' +
            '<tr><td>open:</td><td>' + chart.yAxis.tickFormat()(d.open) + '</td></tr>' +
            '<tr><td>close:</td><td>' + chart.yAxis.tickFormat()(d.close) + '</td></tr>' +
            '<tr><td>high</td><td>' + chart.yAxis.tickFormat()(d.high) + '</td></tr>' +
            '<tr><td>low:</td><td>' + chart.yAxis.tickFormat()(d.low) + '</td></tr>' +
            '</table>';
    });
    return chart;
};

// candlestickChart is just a historical chart with candlestick bars and some tweaks
nv.models.candlestickBarChart = function() {
    var chart = nv.models.historicalBarChart(nv.models.candlestickBar());

    // special default tooltip since we show multiple values per x
    chart.useInteractiveGuideline(true);
    chart.interactiveLayer.tooltip.contentGenerator(function(data) {
        // we assume only one series exists for this chart
        var d = data.series[0].data;
        // match line colors as defined in nv.d3.css
        var color = d.open < d.close ? "2ca02c" : "d62728";
        return '' +
            '<h3 style="color: #' + color + '">' + data.value + '</h3>' +
            '<table>' +
            '<tr><td>open:</td><td>' + chart.yAxis.tickFormat()(d.open) + '</td></tr>' +
            '<tr><td>close:</td><td>' + chart.yAxis.tickFormat()(d.close) + '</td></tr>' +
            '<tr><td>high</td><td>' + chart.yAxis.tickFormat()(d.high) + '</td></tr>' +
            '<tr><td>low:</td><td>' + chart.yAxis.tickFormat()(d.low) + '</td></tr>' +
            '</table>';
    });
    return chart;
};
nv.models.legend = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 5, right: 0, bottom: 5, left: 0}
        , width = 400
        , height = 20
        , getKey = function(d) { return d.key }
        , keyFormatter = function (d) { return d }
        , color = nv.utils.getColor()
        , maxKeyLength = 20 //default value for key lengths
        , align = true
        , padding = 32 //define how much space between legend items. - recommend 32 for furious version
        , rightAlign = true
        , updateState = true   //If true, legend will update data.disabled and trigger a 'stateChange' dispatch.
        , enableDoubleClick = true   //If true, legend will enable double click handling
        , radioButtonMode = false   //If true, clicking legend items will cause it to behave like a radio button. (only one can be selected at a time)
        , expanded = false
        , dispatch = d3.dispatch('legendClick', 'legendDblclick', 'legendMouseover', 'legendMouseout', 'stateChange')
        , vers = 'classic' //Options are "classic" and "furious"
        ;

    function chart(selection) {
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                container = d3.select(this);
            nv.utils.initSVG(container);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-legend').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-legend').append('g');
            var g = wrap.select('g');

            if (rightAlign)
                wrap.attr('transform', 'translate(' + (- margin.right) + ',' + margin.top + ')');
            else
                wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var series = g.selectAll('.nv-series')
                .data(function(d) {
                    if(vers != 'furious') return d;

                    return d.filter(function(n) {
                        return expanded ? true : !n.disengaged;
                    });
                });

            var seriesEnter = series.enter().append('g').attr('class', 'nv-series');
            var seriesShape;

            var versPadding;
            switch(vers) {
                case 'furious' :
                    versPadding = 23;
                    break;
                case 'classic' :
                    versPadding = 20;
            }

            if(vers == 'classic') {
                seriesEnter.append('circle')
                    .style('stroke-width', 2)
                    .attr('class','nv-legend-symbol')
                    .attr('r', 5);

                seriesShape = series.select('.nv-legend-symbol');
            } else if (vers == 'furious') {
                seriesEnter.append('rect')
                    .style('stroke-width', 2)
                    .attr('class','nv-legend-symbol')
                    .attr('rx', 3)
                    .attr('ry', 3);
                seriesShape = series.select('.nv-legend-symbol');

                seriesEnter.append('g')
                    .attr('class', 'nv-check-box')
                    .property('innerHTML','<path d="M0.5,5 L22.5,5 L22.5,26.5 L0.5,26.5 L0.5,5 Z" class="nv-box"></path><path d="M5.5,12.8618467 L11.9185089,19.2803556 L31,0.198864511" class="nv-check"></path>')
                    .attr('transform', 'translate(-10,-8)scale(0.5)');

                var seriesCheckbox = series.select('.nv-check-box');

                seriesCheckbox.each(function(d,i) {
                    d3.select(this).selectAll('path')
                        .attr('stroke', setTextColor(d,i));
                });
            }

            seriesEnter.append('text')
                .attr('text-anchor', 'start')
                .attr('class','nv-legend-text')
                .attr('dy', '.32em')
                .attr('dx', '8');

            var seriesText = series.select('text.nv-legend-text');

            series
                .on('mouseover', function(d,i) {
                    dispatch.legendMouseover(d,i);  //TODO: Make consistent with other event objects
                })
                .on('mouseout', function(d,i) {
                    dispatch.legendMouseout(d,i);
                })
                .on('click', function(d,i) {
                    dispatch.legendClick(d,i);
                    // make sure we re-get data in case it was modified
                    var data = series.data();
                    if (updateState) {
                        if(vers =='classic') {
                            if (radioButtonMode) {
                                //Radio button mode: set every series to disabled,
                                //  and enable the clicked series.
                                data.forEach(function(series) { series.disabled = true});
                                d.disabled = false;
                            }
                            else {
                                d.disabled = !d.disabled;
                                if (data.every(function(series) { return series.disabled})) {
                                    //the default behavior of NVD3 legends is, if every single series
                                    // is disabled, turn all series' back on.
                                    data.forEach(function(series) { series.disabled = false});
                                }
                            }
                        } else if(vers == 'furious') {
                            if(expanded) {
                                d.disengaged = !d.disengaged;
                                d.userDisabled = d.userDisabled == undefined ? !!d.disabled : d.userDisabled;
                                d.disabled = d.disengaged || d.userDisabled;
                            } else if (!expanded) {
                                d.disabled = !d.disabled;
                                d.userDisabled = d.disabled;
                                var engaged = data.filter(function(d) { return !d.disengaged; });
                                if (engaged.every(function(series) { return series.userDisabled })) {
                                    //the default behavior of NVD3 legends is, if every single series
                                    // is disabled, turn all series' back on.
                                    data.forEach(function(series) {
                                        series.disabled = series.userDisabled = false;
                                    });
                                }
                            }
                        }
                        dispatch.stateChange({
                            disabled: data.map(function(d) { return !!d.disabled }),
                            disengaged: data.map(function(d) { return !!d.disengaged })
                        });

                    }
                })
                .on('dblclick', function(d,i) {
                    if (enableDoubleClick) {
                        if (vers == 'furious' && expanded) return;
                        dispatch.legendDblclick(d, i);
                        if (updateState) {
                            // make sure we re-get data in case it was modified
                            var data = series.data();
                            //the default behavior of NVD3 legends, when double clicking one,
                            // is to set all other series' to false, and make the double clicked series enabled.
                            data.forEach(function (series) {
                                series.disabled = true;
                                if (vers == 'furious') series.userDisabled = series.disabled;
                            });
                            d.disabled = false;
                            if (vers == 'furious') d.userDisabled = d.disabled;
                            dispatch.stateChange({
                                disabled: data.map(function (d) {
                                    return !!d.disabled
                                })
                            });
                        }
                    }
                });

            series.classed('nv-disabled', function(d) { return d.userDisabled });
            series.exit().remove();

            seriesText
                .attr('fill', setTextColor)
                .text(function (d) { return keyFormatter(getKey(d)) });

            //TODO: implement fixed-width and max-width options (max-width is especially useful with the align option)
            // NEW ALIGNING CODE, TODO: clean up
            var legendWidth = 0;
            if (align) {

                var seriesWidths = [];
                series.each(function(d,i) {
                    var legendText;
                    if (keyFormatter(getKey(d)) && keyFormatter(getKey(d)).length > maxKeyLength) {
                        var trimmedKey = keyFormatter(getKey(d)).substring(0, maxKeyLength);
                        legendText = d3.select(this).select('text').text(trimmedKey + "...");
                        d3.select(this).append("svg:title").text(keyFormatter(getKey(d)));
                    } else {
                        legendText = d3.select(this).select('text');
                    }
                    var nodeTextLength;
                    try {
                        nodeTextLength = legendText.node().getComputedTextLength();
                        // If the legendText is display:none'd (nodeTextLength == 0), simulate an error so we approximate, instead
                        if(nodeTextLength <= 0) throw Error();
                    }
                    catch(e) {
                        nodeTextLength = nv.utils.calcApproxTextWidth(legendText);
                    }

                    seriesWidths.push(nodeTextLength + padding);
                });

                var seriesPerRow = 0;
                var columnWidths = [];
                legendWidth = 0;

                while ( legendWidth < availableWidth && seriesPerRow < seriesWidths.length) {
                    columnWidths[seriesPerRow] = seriesWidths[seriesPerRow];
                    legendWidth += seriesWidths[seriesPerRow++];
                }
                if (seriesPerRow === 0) seriesPerRow = 1; //minimum of one series per row

                while ( legendWidth > availableWidth && seriesPerRow > 1 ) {
                    columnWidths = [];
                    seriesPerRow--;

                    for (var k = 0; k < seriesWidths.length; k++) {
                        if (seriesWidths[k] > (columnWidths[k % seriesPerRow] || 0) )
                            columnWidths[k % seriesPerRow] = seriesWidths[k];
                    }

                    legendWidth = columnWidths.reduce(function(prev, cur, index, array) {
                        return prev + cur;
                    });
                }

                var xPositions = [];
                for (var i = 0, curX = 0; i < seriesPerRow; i++) {
                    xPositions[i] = curX;
                    curX += columnWidths[i];
                }

                series
                    .attr('transform', function(d, i) {
                        return 'translate(' + xPositions[i % seriesPerRow] + ',' + (5 + Math.floor(i / seriesPerRow) * versPadding) + ')';
                    });

                //position legend as far right as possible within the total width
                if (rightAlign) {
                    g.attr('transform', 'translate(' + (width - margin.right - legendWidth) + ',' + margin.top + ')');
                }
                else {
                    g.attr('transform', 'translate(0' + ',' + margin.top + ')');
                }

                height = margin.top + margin.bottom + (Math.ceil(seriesWidths.length / seriesPerRow) * versPadding);

            } else {

                var ypos = 5,
                    newxpos = 5,
                    maxwidth = 0,
                    xpos;
                series
                    .attr('transform', function(d, i) {
                        var length = d3.select(this).select('text').node().getComputedTextLength() + padding;
                        xpos = newxpos;

                        if (width < margin.left + margin.right + xpos + length) {
                            newxpos = xpos = 5;
                            ypos += versPadding;
                        }

                        newxpos += length;
                        if (newxpos > maxwidth) maxwidth = newxpos;

                        if(legendWidth < xpos + maxwidth) {
                            legendWidth = xpos + maxwidth;
                        }
                        return 'translate(' + xpos + ',' + ypos + ')';
                    });

                //position legend as far right as possible within the total width
                g.attr('transform', 'translate(' + (width - margin.right - maxwidth) + ',' + margin.top + ')');

                height = margin.top + margin.bottom + ypos + 15;
            }

            if(vers == 'furious') {
                // Size rectangles after text is placed
                seriesShape
                    .attr('width', function(d,i) {
                        return seriesText[0][i].getComputedTextLength() + 27;
                    })
                    .attr('height', 18)
                    .attr('y', -9)
                    .attr('x', -15);

                // The background for the expanded legend (UI)
                gEnter.insert('rect',':first-child')
                    .attr('class', 'nv-legend-bg')
                    .attr('fill', '#eee')
                    // .attr('stroke', '#444')
                    .attr('opacity',0);

                var seriesBG = g.select('.nv-legend-bg');

                seriesBG
                .transition().duration(300)
                    .attr('x', -versPadding )
                    .attr('width', legendWidth + versPadding - 12)
                    .attr('height', height + 10)
                    .attr('y', -margin.top - 10)
                    .attr('opacity', expanded ? 1 : 0);


            }

            seriesShape
                .style('fill', setBGColor)
                .style('fill-opacity', setBGOpacity)
                .style('stroke', setBGColor);
        });

        function setTextColor(d,i) {
            if(vers != 'furious') return '#000';
            if(expanded) {
                return d.disengaged ? '#000' : '#fff';
            } else if (!expanded) {
                if(!d.color) d.color = color(d,i);
                return !!d.disabled ? d.color : '#fff';
            }
        }

        function setBGColor(d,i) {
            if(expanded && vers == 'furious') {
                return d.disengaged ? '#eee' : d.color || color(d,i);
            } else {
                return d.color || color(d,i);
            }
        }


        function setBGOpacity(d,i) {
            if(expanded && vers == 'furious') {
                return 1;
            } else {
                return !!d.disabled ? 0 : 1;
            }
        }

        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:          {get: function(){return width;}, set: function(_){width=_;}},
        height:         {get: function(){return height;}, set: function(_){height=_;}},
        key:            {get: function(){return getKey;}, set: function(_){getKey=_;}},
        keyFormatter:   {get: function(){return keyFormatter;}, set: function(_){keyFormatter=_;}},
        align:          {get: function(){return align;}, set: function(_){align=_;}},
        maxKeyLength:   {get: function(){return maxKeyLength;}, set: function(_){maxKeyLength=_;}},
        rightAlign:     {get: function(){return rightAlign;}, set: function(_){rightAlign=_;}},
        padding:        {get: function(){return padding;}, set: function(_){padding=_;}},
        updateState:    {get: function(){return updateState;}, set: function(_){updateState=_;}},
        enableDoubleClick: {get: function(){return enableDoubleClick;}, set: function(_){enableDoubleClick=_;}},
        radioButtonMode:{get: function(){return radioButtonMode;}, set: function(_){radioButtonMode=_;}},
        expanded:       {get: function(){return expanded;}, set: function(_){expanded=_;}},
        vers:           {get: function(){return vers;}, set: function(_){vers=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};

nv.models.line = function() {
    "use strict";
    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var  scatter = nv.models.scatter()
        ;

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 960
        , height = 500
        , container = null
        , strokeWidth = 1.5
        , color = nv.utils.defaultColor() // a function that returns a color
        , getX = function(d) { return d.x } // accessor to get the x value from a data point
        , getY = function(d) { return d.y } // accessor to get the y value from a data point
        , defined = function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null } // allows a line to be not continuous when it is not defined
        , isArea = function(d) { return d.area } // decides if a line is an area or just a line
        , clipEdge = false // if true, masks lines within x and y scale
        , x //can be accessed via chart.xScale()
        , y //can be accessed via chart.yScale()
        , interpolate = "linear" // controls the line interpolation
        , duration = 250
        , dispatch = d3.dispatch('elementClick', 'elementMouseover', 'elementMouseout', 'renderEnd')
        ;

    scatter
        .pointSize(16) // default size
        .pointDomain([16,256]) //set to speed up calculation, needs to be unset if there is a custom size accessor
    ;

    //============================================================


    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var x0, y0 //used to store previous scales
        , renderWatch = nv.utils.renderWatch(dispatch, duration)
        ;

    //============================================================


    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(scatter);
        selection.each(function(data) {
            container = d3.select(this);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);
            nv.utils.initSVG(container);

            // Setup Scales
            x = scatter.xScale();
            y = scatter.yScale();

            x0 = x0 || x;
            y0 = y0 || y;

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-line').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-line');
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-groups');
            gEnter.append('g').attr('class', 'nv-scatterWrap');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            scatter
                .width(availableWidth)
                .height(availableHeight);

            var scatterWrap = wrap.select('.nv-scatterWrap');
            scatterWrap.call(scatter);

            defsEnter.append('clipPath')
                .attr('id', 'nv-edge-clip-' + scatter.id())
                .append('rect');

            wrap.select('#nv-edge-clip-' + scatter.id() + ' rect')
                .attr('width', availableWidth)
                .attr('height', (availableHeight > 0) ? availableHeight : 0);

            g   .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');
            scatterWrap
                .attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + scatter.id() + ')' : '');

            var groups = wrap.select('.nv-groups').selectAll('.nv-group')
                .data(function(d) { return d }, function(d) { return d.key });
            groups.enter().append('g')
                .style('stroke-opacity', 1e-6)
                .style('stroke-width', function(d) { return d.strokeWidth || strokeWidth })
                .style('fill-opacity', 1e-6);

            groups.exit().remove();

            groups
                .attr('class', function(d,i) {
                    return (d.classed || '') + ' nv-group nv-series-' + i;
                })
                .classed('hover', function(d) { return d.hover })
                .style('fill', function(d,i){ return color(d, i) })
                .style('stroke', function(d,i){ return color(d, i)});
            groups.watchTransition(renderWatch, 'line: groups')
                .style('stroke-opacity', 1)
                .style('fill-opacity', function(d) { return d.fillOpacity || .5});

            var areaPaths = groups.selectAll('path.nv-area')
                .data(function(d) { return isArea(d) ? [d] : [] }); // this is done differently than lines because I need to check if series is an area
            areaPaths.enter().append('path')
                .attr('class', 'nv-area')
                .attr('d', function(d) {
                    return d3.svg.area()
                        .interpolate(interpolate)
                        .defined(defined)
                        .x(function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
                        .y0(function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
                        .y1(function(d,i) { return y0( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                        //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                        .apply(this, [d.values])
                });
            groups.exit().selectAll('path.nv-area')
                .remove();

            areaPaths.watchTransition(renderWatch, 'line: areaPaths')
                .attr('d', function(d) {
                    return d3.svg.area()
                        .interpolate(interpolate)
                        .defined(defined)
                        .x(function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
                        .y0(function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
                        .y1(function(d,i) { return y( y.domain()[0] <= 0 ? y.domain()[1] >= 0 ? 0 : y.domain()[1] : y.domain()[0] ) })
                        //.y1(function(d,i) { return y0(0) }) //assuming 0 is within y domain.. may need to tweak this
                        .apply(this, [d.values])
                });

            var linePaths = groups.selectAll('path.nv-line')
                .data(function(d) { return [d.values] });

            linePaths.enter().append('path')
                .attr('class', 'nv-line')
                .attr('d',
                    d3.svg.line()
                    .interpolate(interpolate)
                    .defined(defined)
                    .x(function(d,i) { return nv.utils.NaNtoZero(x0(getX(d,i))) })
                    .y(function(d,i) { return nv.utils.NaNtoZero(y0(getY(d,i))) })
            );

            linePaths.watchTransition(renderWatch, 'line: linePaths')
                .attr('d',
                    d3.svg.line()
                    .interpolate(interpolate)
                    .defined(defined)
                    .x(function(d,i) { return nv.utils.NaNtoZero(x(getX(d,i))) })
                    .y(function(d,i) { return nv.utils.NaNtoZero(y(getY(d,i))) })
            );

            //store old scales for use in transitions on update
            x0 = x.copy();
            y0 = y.copy();
        });
        renderWatch.renderEnd('line immediate');
        return chart;
    }


    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.scatter = scatter;
    // Pass through events
    scatter.dispatch.on('elementClick', function(){ dispatch.elementClick.apply(this, arguments); });
    scatter.dispatch.on('elementMouseover', function(){ dispatch.elementMouseover.apply(this, arguments); });
    scatter.dispatch.on('elementMouseout', function(){ dispatch.elementMouseout.apply(this, arguments); });

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        defined: {get: function(){return defined;}, set: function(_){defined=_;}},
        interpolate:      {get: function(){return interpolate;}, set: function(_){interpolate=_;}},
        clipEdge:    {get: function(){return clipEdge;}, set: function(_){clipEdge=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            scatter.duration(duration);
        }},
        isArea: {get: function(){return isArea;}, set: function(_){
            isArea = d3.functor(_);
        }},
        x: {get: function(){return getX;}, set: function(_){
            getX = _;
            scatter.x(_);
        }},
        y: {get: function(){return getY;}, set: function(_){
            getY = _;
            scatter.y(_);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            scatter.color(color);
        }}
    });

    nv.utils.inheritOptions(chart, scatter);
    nv.utils.initOptions(chart);

    return chart;
};
nv.models.lineChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var lines = nv.models.line()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
        , legend = nv.models.legend()
        , interactiveLayer = nv.interactiveGuideline()
        , tooltip = nv.models.tooltip()
        , focus = nv.models.focus(nv.models.line())
        ;

    var margin = {top: 30, right: 20, bottom: 50, left: 60}
        , marginTop = null
        , color = nv.utils.defaultColor()
        , width = null
        , height = null
        , showLegend = true
        , legendPosition = 'top'
        , showXAxis = true
        , showYAxis = true
        , rightAlignYAxis = false
        , useInteractiveGuideline = false
        , x
        , y
        , focusEnable = false
        , state = nv.utils.state()
        , defaultState = null
        , noData = null
        , dispatch = d3.dispatch('stateChange', 'changeState', 'renderEnd')
        , duration = 250
        ;

    // set options on sub-objects for this chart
    xAxis.orient('bottom').tickPadding(7);
    yAxis.orient(rightAlignYAxis ? 'right' : 'left');

    lines.clipEdge(true).duration(0);

    tooltip.valueFormatter(function(d, i) {
        return yAxis.tickFormat()(d, i);
    }).headerFormatter(function(d, i) {
        return xAxis.tickFormat()(d, i);
    });

    interactiveLayer.tooltip.valueFormatter(function(d, i) {
        return yAxis.tickFormat()(d, i);
    }).headerFormatter(function(d, i) {
        return xAxis.tickFormat()(d, i);
    });


    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled; })
            };
        };
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.active !== undefined)
                data.forEach(function(series,i) {
                    series.disabled = !state.active[i];
                });
        };
    };

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(lines);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);

        selection.each(function(data) {
            var container = d3.select(this);
            nv.utils.initSVG(container);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin) - (focusEnable ? focus.height() : 0);
            chart.update = function() {
                if( duration === 0 ) {
                    container.call( chart );
                } else {
                    container.transition().duration(duration).call(chart);
                }
            };
            chart.container = this;

            state
                .setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            // DEPRECATED set state.disabled
            state.disabled = data.map(function(d) { return !!d.disabled; });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display noData message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length; }).length) {
                nv.utils.noData(chart, container);
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            /* Update `main' graph on brush update. */
            focus.dispatch.on("onBrush", function(extent) {
                onBrush(extent);
            });

            // Setup Scales
            x = lines.xScale();
            y = lines.yScale();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-lineChart').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-lineChart').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-legendWrap');

            var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
            focusEnter.append('g').attr('class', 'nv-background').append('rect');
            focusEnter.append('g').attr('class', 'nv-x nv-axis');
            focusEnter.append('g').attr('class', 'nv-y nv-axis');
            focusEnter.append('g').attr('class', 'nv-linesWrap');
            focusEnter.append('g').attr('class', 'nv-interactive');

            var contextEnter = gEnter.append('g').attr('class', 'nv-focusWrap');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                legend.width(availableWidth);

                g.select('.nv-legendWrap')
                    .datum(data)
                    .call(legend);

                if (legendPosition === 'bottom') {
                     margin.bottom = xAxis.height() + legend.height();
                     availableHeight = nv.utils.availableHeight(height, container, margin);
                     g.select('.nv-legendWrap')
                         .attr('transform', 'translate(0,' + (availableHeight + xAxis.height())  +')');
                } else if (legendPosition === 'top') {
                    if (!marginTop && legend.height() !== margin.top) {
                        margin.top = legend.height();
                        availableHeight = nv.utils.availableHeight(height, container, margin) - (focusEnable ? focus.height() : 0);
                    }

                    wrap.select('.nv-legendWrap')
                        .attr('transform', 'translate(0,' + (-margin.top) +')');
                }
            }

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            //Set up interactive layer
            if (useInteractiveGuideline) {
                interactiveLayer
                    .width(availableWidth)
                    .height(availableHeight)
                    .margin({left:margin.left, top:margin.top})
                    .svgContainer(container)
                    .xScale(x);
                wrap.select(".nv-interactive").call(interactiveLayer);
            }

            g.select('.nv-focus .nv-background rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            lines
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    return d.color || color(d, i);
                }).filter(function(d,i) { return !data[i].disabled; }));

            var linesWrap = g.select('.nv-linesWrap')
                .datum(data.filter(function(d) { return !d.disabled; }));


            // Setup Main (Focus) Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    ._ticks(nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize(-availableHeight, 0);
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                    .tickSize( -availableWidth, 0);
            }

            //============================================================
            // Update Axes
            //============================================================
            function updateXAxis() {
              if(showXAxis) {
                g.select('.nv-focus .nv-x.nv-axis')
                  .transition()
                  .duration(duration)
                  .call(xAxis)
                ;
              }
            }

            function updateYAxis() {
              if(showYAxis) {
                g.select('.nv-focus .nv-y.nv-axis')
                  .transition()
                  .duration(duration)
                  .call(yAxis)
                ;
              }
            }

            g.select('.nv-focus .nv-x.nv-axis')
                .attr('transform', 'translate(0,' + availableHeight + ')');

            //============================================================
            // Update Focus
            //============================================================
            if (!focusEnable && focus.brush.extent() === null) {
                linesWrap.call(lines);
                updateXAxis();
                updateYAxis();
            } else {
                focus.width(availableWidth);
                g.select('.nv-focusWrap')
                    .style('display', focusEnable ? 'initial' : 'none')
                    .attr('transform', 'translate(0,' + ( availableHeight + margin.bottom + focus.margin().top) + ')')
                    .call(focus);
                var extent = focus.brush.empty() ? focus.xDomain() : focus.brush.extent();
                if (extent !== null) {
                    onBrush(extent);
                }
            }
            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState)
                    state[key] = newState[key];
                dispatch.stateChange(state);
                chart.update();
            });

            interactiveLayer.dispatch.on('elementMousemove', function(e) {
                lines.clearHighlights();
                var singlePoint, pointIndex, pointXLocation, allData = [];
                data
                    .filter(function(series, i) {
                        series.seriesIndex = i;
                        return !series.disabled && !series.disableTooltip;
                    })
                    .forEach(function(series,i) {
                        var extent = focus.brush.extent() !== null ? (focus.brush.empty() ? focus.xScale().domain() : focus.brush.extent()) : x.domain();
                        var currentValues = series.values.filter(function(d,i) {
                            // Checks if the x point is between the extents, handling case where extent[0] is greater than extent[1]
                            // (e.g. x domain is manually set to reverse the x-axis)
                            if(extent[0] <= extent[1]) {
                                return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                            } else {
                                return lines.x()(d,i) >= extent[1] && lines.x()(d,i) <= extent[0];
                            }
                        });

                        pointIndex = nv.interactiveBisect(currentValues, e.pointXValue, lines.x());
                        var point = currentValues[pointIndex];
                        var pointYValue = chart.y()(point, pointIndex);
                        if (pointYValue !== null) {
                            lines.highlightPoint(i, pointIndex, true);
                        }
                        if (point === undefined) return;
                        if (singlePoint === undefined) singlePoint = point;
                        if (pointXLocation === undefined) pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
                        allData.push({
                            key: series.key,
                            value: pointYValue,
                            color: color(series,series.seriesIndex),
                            data: point
                        });
                    });
                //Highlight the tooltip entry based on which point the mouse is closest to.
                if (allData.length > 2) {
                    var yValue = chart.yScale().invert(e.mouseY);
                    var domainExtent = Math.abs(chart.yScale().domain()[0] - chart.yScale().domain()[1]);
                    var threshold = 0.03 * domainExtent;
                    var indexToHighlight = nv.nearestValueIndex(allData.map(function(d){return d.value;}),yValue,threshold);
                    if (indexToHighlight !== null)
                        allData[indexToHighlight].highlight = true;
                }

                var defaultValueFormatter = function(d,i) {
                    return d == null ? "N/A" : yAxis.tickFormat()(d);
                };

                interactiveLayer.tooltip
                    .valueFormatter(interactiveLayer.tooltip.valueFormatter() || defaultValueFormatter)
                    .data({
                        value: chart.x()( singlePoint,pointIndex ),
                        index: pointIndex,
                        series: allData
                    })();

                interactiveLayer.renderGuideLine(pointXLocation);

            });

            interactiveLayer.dispatch.on('elementClick', function(e) {
                var pointXLocation, allData = [];

                data.filter(function(series, i) {
                    series.seriesIndex = i;
                    return !series.disabled;
                }).forEach(function(series) {
                    var pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
                    var point = series.values[pointIndex];
                    if (typeof point === 'undefined') return;
                    if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));
                    var yPos = chart.yScale()(chart.y()(point,pointIndex));
                    allData.push({
                        point: point,
                        pointIndex: pointIndex,
                        pos: [pointXLocation, yPos],
                        seriesIndex: series.seriesIndex,
                        series: series
                    });
                });

                lines.dispatch.elementClick(allData);
            });

            interactiveLayer.dispatch.on("elementMouseout",function(e) {
                lines.clearHighlights();
            });

            dispatch.on('changeState', function(e) {
                if (typeof e.disabled !== 'undefined' && data.length === e.disabled.length) {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });

                    state.disabled = e.disabled;
                }
                chart.update();
            });

            //============================================================
            // Functions
            //------------------------------------------------------------

            // Taken from crossfilter (http://square.github.com/crossfilter/)
            function resizePath(d) {
                var e = +(d == 'e'),
                    x = e ? 1 : -1,
                    y = availableHeight / 3;
                return 'M' + (0.5 * x) + ',' + y
                    + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
                    + 'V' + (2 * y - 6)
                    + 'A6,6 0 0 ' + e + ' ' + (0.5 * x) + ',' + (2 * y)
                    + 'Z'
                    + 'M' + (2.5 * x) + ',' + (y + 8)
                    + 'V' + (2 * y - 8)
                    + 'M' + (4.5 * x) + ',' + (y + 8)
                    + 'V' + (2 * y - 8);
            }

            function onBrush(extent) {
                // Update Main (Focus)
                var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
                    .datum(
                    data.filter(function(d) { return !d.disabled; })
                        .map(function(d,i) {
                            return {
                                key: d.key,
                                area: d.area,
                                classed: d.classed,
                                values: d.values.filter(function(d,i) {
                                    return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                                }),
                                disableTooltip: d.disableTooltip
                            };
                        })
                );
                focusLinesWrap.transition().duration(duration).call(lines);

                // Update Main (Focus) Axes
                updateXAxis();
                updateYAxis();
            }
        });

        renderWatch.renderEnd('lineChart immediate');
        return chart;
    }


    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    lines.dispatch.on('elementMouseover.tooltip', function(evt) {
        if(!evt.series.disableTooltip){
            tooltip.data(evt).hidden(false);
        }
    });

    lines.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.lines = lines;
    chart.legend = legend;
    chart.focus = focus;
    chart.xAxis = xAxis;
    chart.x2Axis = focus.xAxis
    chart.yAxis = yAxis;
    chart.y2Axis = focus.yAxis
    chart.interactiveLayer = interactiveLayer;
    chart.tooltip = tooltip;
    chart.state = state;
    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        legendPosition: {get: function(){return legendPosition;}, set: function(_){legendPosition=_;}},
        showXAxis:      {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis:    {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        defaultState:    {get: function(){return defaultState;}, set: function(_){defaultState=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        // Focus options, mostly passed onto focus model.
        focusEnable:    {get: function(){return focusEnable;}, set: function(_){focusEnable=_;}},
        focusHeight:     {get: function(){return focus.height();}, set: function(_){focus.height(_);}},
        focusShowAxisX:    {get: function(){return focus.showXAxis();}, set: function(_){focus.showXAxis(_);}},
        focusShowAxisY:    {get: function(){return focus.showYAxis();}, set: function(_){focus.showYAxis(_);}},
        brushExtent: {get: function(){return focus.brushExtent();}, set: function(_){focus.brushExtent(_);}},

        // options that require extra logic in the setter
        focusMargin: {get: function(){return focus.margin}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            focus.margin.right  = _.right  !== undefined ? _.right  : focus.margin.right;
            focus.margin.bottom = _.bottom !== undefined ? _.bottom : focus.margin.bottom;
            focus.margin.left   = _.left   !== undefined ? _.left   : focus.margin.left;
        }},
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            lines.duration(duration);
            focus.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
            lines.color(color);
            focus.color(color);
        }},
        interpolate: {get: function(){return lines.interpolate();}, set: function(_){
            lines.interpolate(_);
            focus.interpolate(_);
        }},
        xTickFormat: {get: function(){return xAxis.tickFormat();}, set: function(_){
            xAxis.tickFormat(_);
            focus.xTickFormat(_);
        }},
        yTickFormat: {get: function(){return yAxis.tickFormat();}, set: function(_){
            yAxis.tickFormat(_);
            focus.yTickFormat(_);
        }},
        x: {get: function(){return lines.x();}, set: function(_){
            lines.x(_);
            focus.x(_);
        }},
        y: {get: function(){return lines.y();}, set: function(_){
            lines.y(_);
            focus.y(_);
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( rightAlignYAxis ? 'right' : 'left');
        }},
        useInteractiveGuideline: {get: function(){return useInteractiveGuideline;}, set: function(_){
            useInteractiveGuideline = _;
            if (useInteractiveGuideline) {
                lines.interactive(false);
                lines.useVoronoi(false);
            }
        }}
    });

    nv.utils.inheritOptions(chart, lines);
    nv.utils.initOptions(chart);

    return chart;
};

nv.models.lineWithFocusChart = function() {
  return nv.models.lineChart()
    .margin({ bottom: 30 })
    .focusEnable( true );
};
nv.models.linePlusBarChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var lines = nv.models.line()
        , lines2 = nv.models.line()
        , bars = nv.models.historicalBar()
        , bars2 = nv.models.historicalBar()
        , xAxis = nv.models.axis()
        , x2Axis = nv.models.axis()
        , y1Axis = nv.models.axis()
        , y2Axis = nv.models.axis()
        , y3Axis = nv.models.axis()
        , y4Axis = nv.models.axis()
        , legend = nv.models.legend()
        , brush = d3.svg.brush()
        , tooltip = nv.models.tooltip()
        ;

    var margin = {top: 30, right: 30, bottom: 30, left: 60}
        , marginTop = null
        , margin2 = {top: 0, right: 30, bottom: 20, left: 60}
        , width = null
        , height = null
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , color = nv.utils.defaultColor()
        , showLegend = true
        , focusEnable = true
        , focusShowAxisY = false
        , focusShowAxisX = true
        , focusHeight = 50
        , extent
        , brushExtent = null
        , x
        , x2
        , y1
        , y2
        , y3
        , y4
        , noData = null
        , dispatch = d3.dispatch('brush', 'stateChange', 'changeState')
        , transitionDuration = 0
        , state = nv.utils.state()
        , defaultState = null
        , legendLeftAxisHint = ' (left axis)'
        , legendRightAxisHint = ' (right axis)'
        , switchYAxisOrder = false
        ;

    lines.clipEdge(true);
    lines2.interactive(false);
    // We don't want any points emitted for the focus chart's scatter graph.
    lines2.pointActive(function(d) { return false });
    xAxis.orient('bottom').tickPadding(5);
    y1Axis.orient('left');
    y2Axis.orient('right');
    x2Axis.orient('bottom').tickPadding(5);
    y3Axis.orient('left');
    y4Axis.orient('right');

    tooltip.headerEnabled(true).headerFormatter(function(d, i) {
        return xAxis.tickFormat()(d, i);
    });

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var getBarsAxis = function() {
        return switchYAxisOrder
            ? { main: y2Axis, focus: y4Axis }
            : { main: y1Axis, focus: y3Axis }
    }

    var getLinesAxis = function() {
        return switchYAxisOrder
            ? { main: y1Axis, focus: y3Axis }
            : { main: y2Axis, focus: y4Axis }
    }

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled })
            };
        }
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.active !== undefined)
                data.forEach(function(series,i) {
                    series.disabled = !state.active[i];
                });
        }
    };

    var allDisabled = function(data) {
      return data.every(function(series) {
        return series.disabled;
      });
    }

    function chart(selection) {
        selection.each(function(data) {
            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight1 = nv.utils.availableHeight(height, container, margin)
                    - (focusEnable ? focusHeight : 0),
                availableHeight2 = focusHeight - margin2.top - margin2.bottom;

            chart.update = function() { container.transition().duration(transitionDuration).call(chart); };
            chart.container = this;

            state
                .setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            // DEPRECATED set state.disableddisabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display No Data message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            var dataBars = data.filter(function(d) { return !d.disabled && d.bar });
            var dataLines = data.filter(function(d) { return !d.bar }); // removed the !d.disabled clause here to fix Issue #240

            if (dataBars.length && !switchYAxisOrder) {
                x = bars.xScale();
            } else {
                x = lines.xScale();
            }

            x2 = x2Axis.scale();

            // select the scales and series based on the position of the yAxis
            y1 = switchYAxisOrder ? lines.yScale() : bars.yScale();
            y2 = switchYAxisOrder ? bars.yScale() : lines.yScale();
            y3 = switchYAxisOrder ? lines2.yScale() : bars2.yScale();
            y4 = switchYAxisOrder ? bars2.yScale() : lines2.yScale();

            var series1 = data
                .filter(function(d) { return !d.disabled && (switchYAxisOrder ? !d.bar : d.bar) })
                .map(function(d) {
                    return d.values.map(function(d,i) {
                        return { x: getX(d,i), y: getY(d,i) }
                    })
                });

            var series2 = data
                .filter(function(d) { return !d.disabled && (switchYAxisOrder ? d.bar : !d.bar) })
                .map(function(d) {
                    return d.values.map(function(d,i) {
                        return { x: getX(d,i), y: getY(d,i) }
                    })
                });

            x.range([0, availableWidth]);

            x2  .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x } ))
                .range([0, availableWidth]);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-linePlusBar').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-linePlusBar').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-legendWrap');

            // this is the main chart
            var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
            focusEnter.append('g').attr('class', 'nv-x nv-axis');
            focusEnter.append('g').attr('class', 'nv-y1 nv-axis');
            focusEnter.append('g').attr('class', 'nv-y2 nv-axis');
            focusEnter.append('g').attr('class', 'nv-barsWrap');
            focusEnter.append('g').attr('class', 'nv-linesWrap');

            // context chart is where you can focus in
            var contextEnter = gEnter.append('g').attr('class', 'nv-context');
            contextEnter.append('g').attr('class', 'nv-x nv-axis');
            contextEnter.append('g').attr('class', 'nv-y1 nv-axis');
            contextEnter.append('g').attr('class', 'nv-y2 nv-axis');
            contextEnter.append('g').attr('class', 'nv-barsWrap');
            contextEnter.append('g').attr('class', 'nv-linesWrap');
            contextEnter.append('g').attr('class', 'nv-brushBackground');
            contextEnter.append('g').attr('class', 'nv-x nv-brush');

            //============================================================
            // Legend
            //------------------------------------------------------------

            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                var legendWidth = legend.align() ? availableWidth / 2 : availableWidth;
                var legendXPosition = legend.align() ? legendWidth : 0;

                legend.width(legendWidth);

                g.select('.nv-legendWrap')
                    .datum(data.map(function(series) {
                        series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
                        if(switchYAxisOrder) {
                            series.key = series.originalKey + (series.bar ? legendRightAxisHint : legendLeftAxisHint);
                        } else {
                            series.key = series.originalKey + (series.bar ? legendLeftAxisHint : legendRightAxisHint);
                        }
                        return series;
                    }))
                    .call(legend);

                if (!marginTop && legend.height() !== margin.top) {
                    margin.top = legend.height();
                    // FIXME: shouldn't this be "- (focusEnabled ? focusHeight : 0)"?
                    availableHeight1 = nv.utils.availableHeight(height, container, margin) - focusHeight;
                }

                g.select('.nv-legendWrap')
                    .attr('transform', 'translate(' + legendXPosition + ',' + (-margin.top) +')');
            }

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            //============================================================
            // Context chart (focus chart) components
            //------------------------------------------------------------

            // hide or show the focus context chart
            g.select('.nv-context').style('display', focusEnable ? 'initial' : 'none');

            bars2
                .width(availableWidth)
                .height(availableHeight2)
                .color(data.map(function (d, i) {
                    return d.color || color(d, i);
                }).filter(function (d, i) {
                    return !data[i].disabled && data[i].bar
                }));
            lines2
                .width(availableWidth)
                .height(availableHeight2)
                .color(data.map(function (d, i) {
                    return d.color || color(d, i);
                }).filter(function (d, i) {
                    return !data[i].disabled && !data[i].bar
                }));

            var bars2Wrap = g.select('.nv-context .nv-barsWrap')
                .datum(dataBars.length ? dataBars : [
                    {values: []}
                ]);
            var lines2Wrap = g.select('.nv-context .nv-linesWrap')
                .datum(allDisabled(dataLines) ?
                       [{values: []}] :
                       dataLines.filter(function(dataLine) {
                         return !dataLine.disabled;
                       }));

            g.select('.nv-context')
                .attr('transform', 'translate(0,' + ( availableHeight1 + margin.bottom + margin2.top) + ')');

            bars2Wrap.transition().call(bars2);
            lines2Wrap.transition().call(lines2);

            // context (focus chart) axis controls
            if (focusShowAxisX) {
                x2Axis
                    ._ticks( nv.utils.calcTicksX(availableWidth / 100, data))
                    .tickSize(-availableHeight2, 0);
                g.select('.nv-context .nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + y3.range()[0] + ')');
                g.select('.nv-context .nv-x.nv-axis').transition()
                    .call(x2Axis);
            }

            if (focusShowAxisY) {
                y3Axis
                    .scale(y3)
                    ._ticks( availableHeight2 / 36 )
                    .tickSize( -availableWidth, 0);
                y4Axis
                    .scale(y4)
                    ._ticks( availableHeight2 / 36 )
                    .tickSize(dataBars.length ? 0 : -availableWidth, 0); // Show the y2 rules only if y1 has none

                g.select('.nv-context .nv-y3.nv-axis')
                    .style('opacity', dataBars.length ? 1 : 0)
                    .attr('transform', 'translate(0,' + x2.range()[0] + ')');
                g.select('.nv-context .nv-y2.nv-axis')
                    .style('opacity', dataLines.length ? 1 : 0)
                    .attr('transform', 'translate(' + x2.range()[1] + ',0)');

                g.select('.nv-context .nv-y1.nv-axis').transition()
                    .call(y3Axis);
                g.select('.nv-context .nv-y2.nv-axis').transition()
                    .call(y4Axis);
            }

            // Setup Brush
            brush.x(x2).on('brush', onBrush);

            if (brushExtent) brush.extent(brushExtent);

            var brushBG = g.select('.nv-brushBackground').selectAll('g')
                .data([brushExtent || brush.extent()]);

            var brushBGenter = brushBG.enter()
                .append('g');

            brushBGenter.append('rect')
                .attr('class', 'left')
                .attr('x', 0)
                .attr('y', 0)
                .attr('height', availableHeight2);

            brushBGenter.append('rect')
                .attr('class', 'right')
                .attr('x', 0)
                .attr('y', 0)
                .attr('height', availableHeight2);

            var gBrush = g.select('.nv-x.nv-brush')
                .call(brush);
            gBrush.selectAll('rect')
                //.attr('y', -5)
                .attr('height', availableHeight2);
            gBrush.selectAll('.resize').append('path').attr('d', resizePath);

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState)
                    state[key] = newState[key];
                dispatch.stateChange(state);
                chart.update();
            });

            // Update chart from a state object passed to event handler
            dispatch.on('changeState', function(e) {
                if (typeof e.disabled !== 'undefined') {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });
                    state.disabled = e.disabled;
                }
                chart.update();
            });

            //============================================================
            // Functions
            //------------------------------------------------------------

            // Taken from crossfilter (http://square.github.com/crossfilter/)
            function resizePath(d) {
                var e = +(d == 'e'),
                    x = e ? 1 : -1,
                    y = availableHeight2 / 3;
                return 'M' + (.5 * x) + ',' + y
                    + 'A6,6 0 0 ' + e + ' ' + (6.5 * x) + ',' + (y + 6)
                    + 'V' + (2 * y - 6)
                    + 'A6,6 0 0 ' + e + ' ' + (.5 * x) + ',' + (2 * y)
                    + 'Z'
                    + 'M' + (2.5 * x) + ',' + (y + 8)
                    + 'V' + (2 * y - 8)
                    + 'M' + (4.5 * x) + ',' + (y + 8)
                    + 'V' + (2 * y - 8);
            }


            function updateBrushBG() {
                if (!brush.empty()) brush.extent(brushExtent);
                brushBG
                    .data([brush.empty() ? x2.domain() : brushExtent])
                    .each(function(d,i) {
                        var leftWidth = x2(d[0]) - x2.range()[0],
                            rightWidth = x2.range()[1] - x2(d[1]);
                        d3.select(this).select('.left')
                            .attr('width',  leftWidth < 0 ? 0 : leftWidth);

                        d3.select(this).select('.right')
                            .attr('x', x2(d[1]))
                            .attr('width', rightWidth < 0 ? 0 : rightWidth);
                    });
            }

            function onBrush() {
                brushExtent = brush.empty() ? null : brush.extent();
                extent = brush.empty() ? x2.domain() : brush.extent();
                dispatch.brush({extent: extent, brush: brush});
                updateBrushBG();

                // Prepare Main (Focus) Bars and Lines
                bars
                    .width(availableWidth)
                    .height(availableHeight1)
                    .color(data.map(function(d,i) {
                        return d.color || color(d, i);
                    }).filter(function(d,i) { return !data[i].disabled && data[i].bar }));

                lines
                    .width(availableWidth)
                    .height(availableHeight1)
                    .color(data.map(function(d,i) {
                        return d.color || color(d, i);
                    }).filter(function(d,i) { return !data[i].disabled && !data[i].bar }));

                var focusBarsWrap = g.select('.nv-focus .nv-barsWrap')
                    .datum(!dataBars.length ? [{values:[]}] :
                        dataBars
                            .map(function(d,i) {
                                return {
                                    key: d.key,
                                    values: d.values.filter(function(d,i) {
                                        return bars.x()(d,i) >= extent[0] && bars.x()(d,i) <= extent[1];
                                    })
                                }
                            })
                );

                var focusLinesWrap = g.select('.nv-focus .nv-linesWrap')
                    .datum(allDisabled(dataLines) ? [{values:[]}] :
                           dataLines
                           .filter(function(dataLine) { return !dataLine.disabled; })
                           .map(function(d,i) {
                                return {
                                    area: d.area,
                                    fillOpacity: d.fillOpacity,
                                    strokeWidth: d.strokeWidth,
                                    key: d.key,
                                    values: d.values.filter(function(d,i) {
                                        return lines.x()(d,i) >= extent[0] && lines.x()(d,i) <= extent[1];
                                    })
                                }
                            })
                );

                // Update Main (Focus) X Axis
                if (dataBars.length && !switchYAxisOrder) {
                    x = bars.xScale();
                } else {
                    x = lines.xScale();
                }

                xAxis
                    .scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize(-availableHeight1, 0);

                xAxis.domain([Math.ceil(extent[0]), Math.floor(extent[1])]);

                g.select('.nv-x.nv-axis').transition().duration(transitionDuration)
                    .call(xAxis);

                // Update Main (Focus) Bars and Lines
                focusBarsWrap.transition().duration(transitionDuration).call(bars);
                focusLinesWrap.transition().duration(transitionDuration).call(lines);

                // Setup and Update Main (Focus) Y Axes
                g.select('.nv-focus .nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + y1.range()[0] + ')');

                y1Axis
                    .scale(y1)
                    ._ticks( nv.utils.calcTicksY(availableHeight1/36, data) )
                    .tickSize(-availableWidth, 0);
                y2Axis
                    .scale(y2)
                    ._ticks( nv.utils.calcTicksY(availableHeight1/36, data) );

                // Show the y2 rules only if y1 has none
                if(!switchYAxisOrder) {
                    y2Axis.tickSize(dataBars.length ? 0 : -availableWidth, 0);
                } else {
                    y2Axis.tickSize(dataLines.length ? 0 : -availableWidth, 0);
                }

                // Calculate opacity of the axis
                var barsOpacity = dataBars.length ? 1 : 0;
                var linesOpacity = dataLines.length && !allDisabled(dataLines) ? 1 : 0;

                var y1Opacity = switchYAxisOrder ? linesOpacity : barsOpacity;
                var y2Opacity = switchYAxisOrder ? barsOpacity : linesOpacity;

                g.select('.nv-focus .nv-y1.nv-axis')
                    .style('opacity', y1Opacity);
                g.select('.nv-focus .nv-y2.nv-axis')
                    .style('opacity', y2Opacity)
                    .attr('transform', 'translate(' + x.range()[1] + ',0)');

                g.select('.nv-focus .nv-y1.nv-axis').transition().duration(transitionDuration)
                    .call(y1Axis);
                g.select('.nv-focus .nv-y2.nv-axis').transition().duration(transitionDuration)
                    .call(y2Axis);
            }

            onBrush();

        });

        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    lines.dispatch.on('elementMouseover.tooltip', function(evt) {
        tooltip
            .duration(100)
            .valueFormatter(function(d, i) {
                return getLinesAxis().main.tickFormat()(d, i);
            })
            .data(evt)
            .hidden(false);
    });

    lines.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true)
    });

    bars.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt.value = chart.x()(evt.data);
        evt['series'] = {
            value: chart.y()(evt.data),
            color: evt.color
        };
        tooltip
            .duration(0)
            .valueFormatter(function(d, i) {
                return getBarsAxis().main.tickFormat()(d, i);
            })
            .data(evt)
            .hidden(false);
    });

    bars.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    bars.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================


    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.legend = legend;
    chart.lines = lines;
    chart.lines2 = lines2;
    chart.bars = bars;
    chart.bars2 = bars2;
    chart.xAxis = xAxis;
    chart.x2Axis = x2Axis;
    chart.y1Axis = y1Axis;
    chart.y2Axis = y2Axis;
    chart.y3Axis = y3Axis;
    chart.y4Axis = y4Axis;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        brushExtent:    {get: function(){return brushExtent;}, set: function(_){brushExtent=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        focusEnable:    {get: function(){return focusEnable;}, set: function(_){focusEnable=_;}},
        focusHeight:    {get: function(){return focusHeight;}, set: function(_){focusHeight=_;}},
        focusShowAxisX:    {get: function(){return focusShowAxisX;}, set: function(_){focusShowAxisX=_;}},
        focusShowAxisY:    {get: function(){return focusShowAxisY;}, set: function(_){focusShowAxisY=_;}},
        legendLeftAxisHint:    {get: function(){return legendLeftAxisHint;}, set: function(_){legendLeftAxisHint=_;}},
        legendRightAxisHint:    {get: function(){return legendRightAxisHint;}, set: function(_){legendRightAxisHint=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        focusMargin: {get: function(){return margin2;}, set: function(_){
            margin2.top    = _.top    !== undefined ? _.top    : margin2.top;
            margin2.right  = _.right  !== undefined ? _.right  : margin2.right;
            margin2.bottom = _.bottom !== undefined ? _.bottom : margin2.bottom;
            margin2.left   = _.left   !== undefined ? _.left   : margin2.left;
        }},
        duration: {get: function(){return transitionDuration;}, set: function(_){
            transitionDuration = _;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
        }},
        x: {get: function(){return getX;}, set: function(_){
            getX = _;
            lines.x(_);
            lines2.x(_);
            bars.x(_);
            bars2.x(_);
        }},
        y: {get: function(){return getY;}, set: function(_){
            getY = _;
            lines.y(_);
            lines2.y(_);
            bars.y(_);
            bars2.y(_);
        }},
        switchYAxisOrder:    {get: function(){return switchYAxisOrder;}, set: function(_){
            // Switch the tick format for the yAxis
            if(switchYAxisOrder !== _) {
                var y1 = y1Axis;
                y1Axis = y2Axis;
                y2Axis = y1;

                var y3 = y3Axis;
                y3Axis = y4Axis;
                y4Axis = y3;
            }
            switchYAxisOrder=_;

            y1Axis.orient('left');
            y2Axis.orient('right');
            y3Axis.orient('left');
            y4Axis.orient('right');
        }}
    });

    nv.utils.inheritOptions(chart, lines);
    nv.utils.initOptions(chart);

    return chart;
};

nv.models.multiBar = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 960
        , height = 500
        , x = d3.scale.ordinal()
        , y = d3.scale.linear()
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container = null
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
        , clipEdge = true
        , stacked = false
        , stackOffset = 'zero' // options include 'silhouette', 'wiggle', 'expand', 'zero', or a custom function
        , color = nv.utils.defaultColor()
        , hideable = false
        , barColor = null // adding the ability to set the color for each rather than the whole group
        , disabled // used in conjunction with barColor to communicate from multiBarHorizontalChart what series are disabled
        , duration = 500
        , xDomain
        , yDomain
        , xRange
        , yRange
        , groupSpacing = 0.1
        , fillOpacity = 0.75
        , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd')
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var x0, y0 //used to store previous scales
        , renderWatch = nv.utils.renderWatch(dispatch, duration)
        ;

    var last_datalength = 0;

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            container = d3.select(this);
            nv.utils.initSVG(container);
            var nonStackableCount = 0;
            // This function defines the requirements for render complete
            var endFn = function(d, i) {
                if (d.series === data.length - 1 && i === data[0].values.length - 1)
                    return true;
                return false;
            };

            if(hideable && data.length) hideable = [{
                values: data[0].values.map(function(d) {
                        return {
                            x: d.x,
                            y: 0,
                            series: d.series,
                            size: 0.01
                        };}
                )}];

            if (stacked) {
                var parsed = d3.layout.stack()
                    .offset(stackOffset)
                    .values(function(d){ return d.values })
                    .y(getY)
                (!data.length && hideable ? hideable : data);

                parsed.forEach(function(series, i){
                    // if series is non-stackable, use un-parsed data
                    if (series.nonStackable) {
                        data[i].nonStackableSeries = nonStackableCount++;
                        parsed[i] = data[i];
                    } else {
                        // don't stack this seires on top of the nonStackable seriees
                        if (i > 0 && parsed[i - 1].nonStackable){
                            parsed[i].values.map(function(d,j){
                                d.y0 -= parsed[i - 1].values[j].y;
                                d.y1 = d.y0 + d.y;
                            });
                        }
                    }
                });
                data = parsed;
            }
            //add series index and key to each data point for reference
            data.forEach(function(series, i) {
                series.values.forEach(function(point) {
                    point.series = i;
                    point.key = series.key;
                });
            });

            // HACK for negative value stacking
            if (stacked && data.length > 0) {
                data[0].values.map(function(d,i) {
                    var posBase = 0, negBase = 0;
                    data.map(function(d, idx) {
                        if (!data[idx].nonStackable) {
                            var f = d.values[i]
                            f.size = Math.abs(f.y);
                            if (f.y<0)  {
                                f.y1 = negBase;
                                negBase = negBase - f.size;
                            } else
                            {
                                f.y1 = f.size + posBase;
                                posBase = posBase + f.size;
                            }
                        }

                    });
                });
            }
            // Setup Scales
            // remap and flatten the data for use in calculating the scales' domains
            var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
                data.map(function(d, idx) {
                    return d.values.map(function(d,i) {
                        return { x: getX(d,i), y: getY(d,i), y0: d.y0, y1: d.y1, idx:idx }
                    })
                });

            x.domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
                .rangeBands(xRange || [0, availableWidth], groupSpacing);

            y.domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) {
                var domain = d.y;
                // increase the domain range if this series is stackable
                if (stacked && !data[d.idx].nonStackable) {
                    if (d.y > 0){
                        domain = d.y1
                    } else {
                        domain = d.y1 + d.y
                    }
                }
                return domain;
            }).concat(forceY)))
            .range(yRange || [availableHeight, 0]);

            // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
            if (x.domain()[0] === x.domain()[1])
                x.domain()[0] ?
                    x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
                    : x.domain([-1,1]);

            if (y.domain()[0] === y.domain()[1])
                y.domain()[0] ?
                    y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
                    : y.domain([-1,1]);

            x0 = x0 || x;
            y0 = y0 || y;

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-multibar').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibar');
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-groups');
            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            defsEnter.append('clipPath')
                .attr('id', 'nv-edge-clip-' + id)
                .append('rect');
            wrap.select('#nv-edge-clip-' + id + ' rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            g.attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');

            var groups = wrap.select('.nv-groups').selectAll('.nv-group')
                .data(function(d) { return d }, function(d,i) { return i });
            groups.enter().append('g')
                .style('stroke-opacity', 1e-6)
                .style('fill-opacity', 1e-6);

            var exitTransition = renderWatch
                .transition(groups.exit().selectAll('rect.nv-bar'), 'multibarExit', Math.min(100, duration))
                .attr('y', function(d, i, j) {
                    var yVal = y0(0) || 0;
                    if (stacked) {
                        if (data[d.series] && !data[d.series].nonStackable) {
                            yVal = y0(d.y0);
                        }
                    }
                    return yVal;
                })
                .attr('height', 0)
                .remove();
            if (exitTransition.delay)
                exitTransition.delay(function(d,i) {
                    var delay = i * (duration / (last_datalength + 1)) - i;
                    return delay;
                });
            groups
                .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
                .classed('hover', function(d) { return d.hover })
                .style('fill', function(d,i){ return color(d, i) })
                .style('stroke', function(d,i){ return color(d, i) });
            groups
                .style('stroke-opacity', 1)
                .style('fill-opacity', fillOpacity);

            var bars = groups.selectAll('rect.nv-bar')
                .data(function(d) { return (hideable && !data.length) ? hideable.values : d.values });
            bars.exit().remove();

            var barsEnter = bars.enter().append('rect')
                    .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
                    .attr('x', function(d,i,j) {
                        return stacked && !data[j].nonStackable ? 0 : (j * x.rangeBand() / data.length )
                    })
                    .attr('y', function(d,i,j) { return y0(stacked && !data[j].nonStackable ? d.y0 : 0) || 0 })
                    .attr('height', 0)
                    .attr('width', function(d,i,j) { return x.rangeBand() / (stacked && !data[j].nonStackable ? 1 : data.length) })
                    .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })
                ;
            bars
                .style('fill', function(d,i,j){ return color(d, j, i);  })
                .style('stroke', function(d,i,j){ return color(d, j, i); })
                .on('mouseover', function(d,i,j) {
                    d3.select(this).classed('hover', true);
                    dispatch.elementMouseover({
                        data: d,
                        index: i,
                        series: data[j],
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mouseout', function(d,i,j) {
                    d3.select(this).classed('hover', false);
                    dispatch.elementMouseout({
                        data: d,
                        index: i,
                        series: data[j],
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mousemove', function(d,i,j) {
                    dispatch.elementMousemove({
                        data: d,
                        index: i,
                        series: data[j],
                        color: d3.select(this).style("fill")
                    });
                })
                .on('click', function(d,i,j) {
                    var element = this;
                    dispatch.elementClick({
                        data: d,
                        index: i,
                        series: data[j],
                        color: d3.select(this).style("fill"),
                        event: d3.event,
                        element: element
                    });
                    d3.event.stopPropagation();
                })
                .on('dblclick', function(d,i,j) {
                    dispatch.elementDblClick({
                        data: d,
                        index: i,
                        series: data[j],
                        color: d3.select(this).style("fill")
                    });
                    d3.event.stopPropagation();
                });
            bars
                .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})
                .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',0)'; })

            if (barColor) {
                if (!disabled) disabled = data.map(function() { return true });
                bars
                    .style('fill', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); })
                    .style('stroke', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); });
            }

            var barSelection =
                bars.watchTransition(renderWatch, 'multibar', Math.min(250, duration))
                    .delay(function(d,i) {
                        return i * duration / data[0].values.length;
                    });
            if (stacked){
                barSelection
                    .attr('y', function(d,i,j) {
                        var yVal = 0;
                        // if stackable, stack it on top of the previous series
                        if (!data[j].nonStackable) {
                            yVal = y(d.y1);
                        } else {
                            if (getY(d,i) < 0){
                                yVal = y(0);
                            } else {
                                if (y(0) - y(getY(d,i)) < -1){
                                    yVal = y(0) - 1;
                                } else {
                                    yVal = y(getY(d, i)) || 0;
                                }
                            }
                        }
                        return yVal;
                    })
                    .attr('height', function(d,i,j) {
                        if (!data[j].nonStackable) {
                            return Math.max(Math.abs(y(d.y+d.y0) - y(d.y0)), 0);
                        } else {
                            return Math.max(Math.abs(y(getY(d,i)) - y(0)), 0) || 0;
                        }
                    })
                    .attr('x', function(d,i,j) {
                        var width = 0;
                        if (data[j].nonStackable) {
                            width = d.series * x.rangeBand() / data.length;
                            if (data.length !== nonStackableCount){
                                width = data[j].nonStackableSeries * x.rangeBand()/(nonStackableCount*2);
                            }
                        }
                        return width;
                    })
                    .attr('width', function(d,i,j){
                        if (!data[j].nonStackable) {
                            return x.rangeBand();
                        } else {
                            // if all series are nonStacable, take the full width
                            var width = (x.rangeBand() / nonStackableCount);
                            // otherwise, nonStackable graph will be only taking the half-width
                            // of the x rangeBand
                            if (data.length !== nonStackableCount) {
                                width = x.rangeBand()/(nonStackableCount*2);
                            }
                            return width;
                        }
                    });
            }
            else {
                barSelection
                    .attr('x', function(d,i) {
                        return d.series * x.rangeBand() / data.length;
                    })
                    .attr('width', x.rangeBand() / data.length)
                    .attr('y', function(d,i) {
                        return getY(d,i) < 0 ?
                            y(0) :
                                y(0) - y(getY(d,i)) < 1 ?
                            y(0) - 1 :
                            y(getY(d,i)) || 0;
                    })
                    .attr('height', function(d,i) {
                        return Math.max(Math.abs(y(getY(d,i)) - y(0)),1) || 0;
                    });
            }

            //store old scales for use in transitions on update
            x0 = x.copy();
            y0 = y.copy();

            // keep track of the last data value length for transition calculations
            if (data[0] && data[0].values) {
                last_datalength = data[0].values.length;
            }

        });

        renderWatch.renderEnd('multibar immediate');

        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:   {get: function(){return width;}, set: function(_){width=_;}},
        height:  {get: function(){return height;}, set: function(_){height=_;}},
        x:       {get: function(){return getX;}, set: function(_){getX=_;}},
        y:       {get: function(){return getY;}, set: function(_){getY=_;}},
        xScale:  {get: function(){return x;}, set: function(_){x=_;}},
        yScale:  {get: function(){return y;}, set: function(_){y=_;}},
        xDomain: {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain: {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:  {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:  {get: function(){return yRange;}, set: function(_){yRange=_;}},
        forceY:  {get: function(){return forceY;}, set: function(_){forceY=_;}},
        stacked: {get: function(){return stacked;}, set: function(_){stacked=_;}},
        stackOffset: {get: function(){return stackOffset;}, set: function(_){stackOffset=_;}},
        clipEdge:    {get: function(){return clipEdge;}, set: function(_){clipEdge=_;}},
        disabled:    {get: function(){return disabled;}, set: function(_){disabled=_;}},
        id:          {get: function(){return id;}, set: function(_){id=_;}},
        hideable:    {get: function(){return hideable;}, set: function(_){hideable=_;}},
        groupSpacing:{get: function(){return groupSpacing;}, set: function(_){groupSpacing=_;}},
        fillOpacity: {get: function(){return fillOpacity;}, set: function(_){fillOpacity=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        barColor:  {get: function(){return barColor;}, set: function(_){
            barColor = _ ? nv.utils.getColor(_) : null;
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};
nv.models.multiBarChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var multibar = nv.models.multiBar()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
        , interactiveLayer = nv.interactiveGuideline()
        , legend = nv.models.legend()
        , controls = nv.models.legend()
        , tooltip = nv.models.tooltip()
        ;

    var margin = {top: 30, right: 20, bottom: 50, left: 60}
        , marginTop = null
        , width = null
        , height = null
        , color = nv.utils.defaultColor()
        , showControls = true
        , controlLabels = {}
        , showLegend = true
        , legendPosition = null
        , showXAxis = true
        , showYAxis = true
        , rightAlignYAxis = false
        , reduceXTicks = true // if false a tick will show for every data point
        , staggerLabels = false
        , wrapLabels = false
        , rotateLabels = 0
        , x //can be accessed via chart.xScale()
        , y //can be accessed via chart.yScale()
        , state = nv.utils.state()
        , defaultState = null
        , noData = null
        , dispatch = d3.dispatch('stateChange', 'changeState', 'renderEnd')
        , controlWidth = function() { return showControls ? 180 : 0 }
        , duration = 250
        , useInteractiveGuideline = false
        ;

    state.stacked = false // DEPRECATED Maintained for backward compatibility

    multibar.stacked(false);
    xAxis
        .orient('bottom')
        .tickPadding(7)
        .showMaxMin(false)
        .tickFormat(function(d) { return d })
    ;
    yAxis
        .orient((rightAlignYAxis) ? 'right' : 'left')
        .tickFormat(d3.format(',.1f'))
    ;

    tooltip
        .duration(0)
        .valueFormatter(function(d, i) {
            return yAxis.tickFormat()(d, i);
        })
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        });

    interactiveLayer.tooltip
        .valueFormatter(function(d, i) {
            return d == null ? "N/A" : yAxis.tickFormat()(d, i);
        })
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        });

    interactiveLayer.tooltip
        .valueFormatter(function (d, i) {
            return d == null ? "N/A" : yAxis.tickFormat()(d, i);
        })
        .headerFormatter(function (d, i) {
            return xAxis.tickFormat()(d, i);
        });

    interactiveLayer.tooltip
        .duration(0)
        .valueFormatter(function(d, i) {
            return yAxis.tickFormat()(d, i);
        })
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        });

    controls.updateState(false);

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);
    var stacked = false;

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled }),
                stacked: stacked
            };
        }
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.stacked !== undefined)
                stacked = state.stacked;
            if (state.active !== undefined)
                data.forEach(function(series,i) {
                    series.disabled = !state.active[i];
                });
        }
    };

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(multibar);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);

        selection.each(function(data) {
            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() {
                if (duration === 0)
                    container.call(chart);
                else
                    container.transition()
                        .duration(duration)
                        .call(chart);
            };
            chart.container = this;

            state
                .setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            // DEPRECATED set state.disableddisabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display noData message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            x = multibar.xScale();
            y = multibar.yScale();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-multiBarWithLegend').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarWithLegend').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y nv-axis');
            gEnter.append('g').attr('class', 'nv-barsWrap');
            gEnter.append('g').attr('class', 'nv-legendWrap');
            gEnter.append('g').attr('class', 'nv-controlsWrap');
            gEnter.append('g').attr('class', 'nv-interactive');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                if (legendPosition === 'bottom') {
                    legend.width(availableWidth - margin.right);

                     g.select('.nv-legendWrap')
                         .datum(data)
                         .call(legend);

                     margin.bottom = xAxis.height() + legend.height();
                     availableHeight = nv.utils.availableHeight(height, container, margin);
                     g.select('.nv-legendWrap')
                         .attr('transform', 'translate(0,' + (availableHeight + xAxis.height())  +')');
                } else {
                    legend.width(availableWidth - controlWidth());

                    g.select('.nv-legendWrap')
                        .datum(data)
                        .call(legend);

                    if (!marginTop && legend.height() !== margin.top) {
                        margin.top = legend.height();
                        availableHeight = nv.utils.availableHeight(height, container, margin);
                    }

                    g.select('.nv-legendWrap')
                        .attr('transform', 'translate(' + controlWidth() + ',' + (-margin.top) +')');
                }
            }

            // Controls
            if (!showControls) {
                 g.select('.nv-controlsWrap').selectAll('*').remove();
            } else {
                var controlsData = [
                    { key: controlLabels.grouped || 'Grouped', disabled: multibar.stacked() },
                    { key: controlLabels.stacked || 'Stacked', disabled: !multibar.stacked() }
                ];

                controls.width(controlWidth()).color(['#444', '#444', '#444']);
                g.select('.nv-controlsWrap')
                    .datum(controlsData)
                    .attr('transform', 'translate(0,' + (-margin.top) +')')
                    .call(controls);
            }

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            // Main Chart Component(s)
            multibar
                .disabled(data.map(function(series) { return series.disabled }))
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    return d.color || color(d, i);
                }).filter(function(d,i) { return !data[i].disabled }));


            var barsWrap = g.select('.nv-barsWrap')
                .datum(data.filter(function(d) { return !d.disabled }));

            barsWrap.call(multibar);

            // Setup Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize(-availableHeight, 0);

                g.select('.nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + y.range()[0] + ')');
                g.select('.nv-x.nv-axis')
                    .call(xAxis);

                var xTicks = g.select('.nv-x.nv-axis > g').selectAll('g');

                xTicks
                    .selectAll('line, text')
                    .style('opacity', 1)

                if (staggerLabels) {
                    var getTranslate = function(x,y) {
                        return "translate(" + x + "," + y + ")";
                    };

                    var staggerUp = 5, staggerDown = 17;  //pixels to stagger by
                    // Issue #140
                    xTicks
                        .selectAll("text")
                        .attr('transform', function(d,i,j) {
                            return  getTranslate(0, (j % 2 == 0 ? staggerUp : staggerDown));
                        });

                    var totalInBetweenTicks = d3.selectAll(".nv-x.nv-axis .nv-wrap g g text")[0].length;
                    g.selectAll(".nv-x.nv-axis .nv-axisMaxMin text")
                        .attr("transform", function(d,i) {
                            return getTranslate(0, (i === 0 || totalInBetweenTicks % 2 !== 0) ? staggerDown : staggerUp);
                        });
                }

                if (wrapLabels) {
                    g.selectAll('.tick text')
                        .call(nv.utils.wrapTicks, chart.xAxis.rangeBand())
                }

                if (reduceXTicks)
                    xTicks
                        .filter(function(d,i) {
                            return i % Math.ceil(data[0].values.length / (availableWidth / 100)) !== 0;
                        })
                        .selectAll('text, line')
                        .style('opacity', 0);

                if(rotateLabels)
                    xTicks
                        .selectAll('.tick text')
                        .attr('transform', 'rotate(' + rotateLabels + ' 0,0)')
                        .style('text-anchor', rotateLabels > 0 ? 'start' : 'end');

                g.select('.nv-x.nv-axis').selectAll('g.nv-axisMaxMin text')
                    .style('opacity', 1);
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                    .tickSize( -availableWidth, 0);

                g.select('.nv-y.nv-axis')
                    .call(yAxis);
            }

            //Set up interactive layer
            if (useInteractiveGuideline) {
                interactiveLayer
                    .width(availableWidth)
                    .height(availableHeight)
                    .margin({left:margin.left, top:margin.top})
                    .svgContainer(container)
                    .xScale(x);
                wrap.select(".nv-interactive").call(interactiveLayer);
            }

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState)
                    state[key] = newState[key];
                dispatch.stateChange(state);
                chart.update();
            });

            controls.dispatch.on('legendClick', function(d,i) {
                if (!d.disabled) return;
                controlsData = controlsData.map(function(s) {
                    s.disabled = true;
                    return s;
                });
                d.disabled = false;

                switch (d.key) {
                    case 'Grouped':
                    case controlLabels.grouped:
                        multibar.stacked(false);
                        break;
                    case 'Stacked':
                    case controlLabels.stacked:
                        multibar.stacked(true);
                        break;
                }

                state.stacked = multibar.stacked();
                dispatch.stateChange(state);
                chart.update();
            });

            // Update chart from a state object passed to event handler
            dispatch.on('changeState', function(e) {
                if (typeof e.disabled !== 'undefined') {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });
                    state.disabled = e.disabled;
                }
                if (typeof e.stacked !== 'undefined') {
                    multibar.stacked(e.stacked);
                    state.stacked = e.stacked;
                    stacked = e.stacked;
                }
                chart.update();
            });

            if (useInteractiveGuideline) {
                interactiveLayer.dispatch.on('elementMousemove', function(e) {
                    if (e.pointXValue == undefined) return;

                    var singlePoint, pointIndex, pointXLocation, xValue, allData = [];
                    data
                        .filter(function(series, i) {
                            series.seriesIndex = i;
                            return !series.disabled;
                        })
                        .forEach(function(series,i) {
                            pointIndex = x.domain().indexOf(e.pointXValue)

                            var point = series.values[pointIndex];
                            if (point === undefined) return;

                            xValue = point.x;
                            if (singlePoint === undefined) singlePoint = point;
                            if (pointXLocation === undefined) pointXLocation = e.mouseX
                            allData.push({
                                key: series.key,
                                value: chart.y()(point, pointIndex),
                                color: color(series,series.seriesIndex),
                                data: series.values[pointIndex]
                            });
                        });

                    interactiveLayer.tooltip
                        .data({
                            value: xValue,
                            index: pointIndex,
                            series: allData
                        })();

                    interactiveLayer.renderGuideLine(pointXLocation);
                });

                interactiveLayer.dispatch.on("elementMouseout",function(e) {
                    interactiveLayer.tooltip.hidden(true);
                });
            }
            else {
                multibar.dispatch.on('elementMouseover.tooltip', function(evt) {
                    evt.value = chart.x()(evt.data);
                    evt['series'] = {
                        key: evt.data.key,
                        value: chart.y()(evt.data),
                        color: evt.color
                    };
                    tooltip.data(evt).hidden(false);
                });

                multibar.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true);
                });

                multibar.dispatch.on('elementMousemove.tooltip', function(evt) {
                    tooltip();
                });
            }
        });

        renderWatch.renderEnd('multibarchart immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.multibar = multibar;
    chart.legend = legend;
    chart.controls = controls;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.state = state;
    chart.tooltip = tooltip;
    chart.interactiveLayer = interactiveLayer;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        legendPosition: {get: function(){return legendPosition;}, set: function(_){legendPosition=_;}},
        showControls: {get: function(){return showControls;}, set: function(_){showControls=_;}},
        controlLabels: {get: function(){return controlLabels;}, set: function(_){controlLabels=_;}},
        showXAxis:      {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis:    {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        defaultState:    {get: function(){return defaultState;}, set: function(_){defaultState=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        reduceXTicks:    {get: function(){return reduceXTicks;}, set: function(_){reduceXTicks=_;}},
        rotateLabels:    {get: function(){return rotateLabels;}, set: function(_){rotateLabels=_;}},
        staggerLabels:    {get: function(){return staggerLabels;}, set: function(_){staggerLabels=_;}},
        wrapLabels:   {get: function(){return wrapLabels;}, set: function(_){wrapLabels=!!_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            multibar.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
            renderWatch.reset(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( rightAlignYAxis ? 'right' : 'left');
        }},
        useInteractiveGuideline: {get: function(){return useInteractiveGuideline;}, set: function(_){
            useInteractiveGuideline = _;
        }},
        barColor:  {get: function(){return multibar.barColor;}, set: function(_){
            multibar.barColor(_);
            legend.color(function(d,i) {return d3.rgb('#ccc').darker(i * 1.5).toString();})
        }}
    });

    nv.utils.inheritOptions(chart, multibar);
    nv.utils.initOptions(chart);

    return chart;
};

nv.models.multiBarHorizontal = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 960
        , height = 500
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container = null
        , x = d3.scale.ordinal()
        , y = d3.scale.linear()
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , getYerr = function(d) { return d.yErr }
        , forceY = [0] // 0 is forced by default.. this makes sense for the majority of bar graphs... user can always do chart.forceY([]) to remove
        , color = nv.utils.defaultColor()
        , barColor = null // adding the ability to set the color for each rather than the whole group
        , disabled // used in conjunction with barColor to communicate from multiBarHorizontalChart what series are disabled
        , stacked = false
        , showValues = false
        , showBarLabels = false
        , valuePadding = 60
        , groupSpacing = 0.1
        , fillOpacity = 0.75
        , valueFormat = d3.format(',.2f')
        , delay = 1200
        , xDomain
        , yDomain
        , xRange
        , yRange
        , duration = 250
        , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd')
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var x0, y0; //used to store previous scales
    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            container = d3.select(this);
            nv.utils.initSVG(container);

            if (stacked)
                data = d3.layout.stack()
                    .offset('zero')
                    .values(function(d){ return d.values })
                    .y(getY)
                (data);

            //add series index and key to each data point for reference
            data.forEach(function(series, i) {
                series.values.forEach(function(point) {
                    point.series = i;
                    point.key = series.key;
                });
            });

            // HACK for negative value stacking
            if (stacked)
                data[0].values.map(function(d,i) {
                    var posBase = 0, negBase = 0;
                    data.map(function(d) {
                        var f = d.values[i]
                        f.size = Math.abs(f.y);
                        if (f.y<0)  {
                            f.y1 = negBase - f.size;
                            negBase = negBase - f.size;
                        } else
                        {
                            f.y1 = posBase;
                            posBase = posBase + f.size;
                        }
                    });
                });

            // Setup Scales
            // remap and flatten the data for use in calculating the scales' domains
            var seriesData = (xDomain && yDomain) ? [] : // if we know xDomain and yDomain, no need to calculate
                data.map(function(d) {
                    return d.values.map(function(d,i) {
                        return { x: getX(d,i), y: getY(d,i), y0: d.y0, y1: d.y1 }
                    })
                });

            x.domain(xDomain || d3.merge(seriesData).map(function(d) { return d.x }))
                .rangeBands(xRange || [0, availableHeight], groupSpacing);

            y.domain(yDomain || d3.extent(d3.merge(seriesData).map(function(d) { return stacked ? (d.y > 0 ? d.y1 + d.y : d.y1 ) : d.y }).concat(forceY)))

            if (showValues && !stacked)
                y.range(yRange || [(y.domain()[0] < 0 ? valuePadding : 0), availableWidth - (y.domain()[1] > 0 ? valuePadding : 0) ]);
            else
                y.range(yRange || [0, availableWidth]);

            x0 = x0 || x;
            y0 = y0 || d3.scale.linear().domain(y.domain()).range([y(0),y(0)]);

            // Setup containers and skeleton of chart
            var wrap = d3.select(this).selectAll('g.nv-wrap.nv-multibarHorizontal').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multibarHorizontal');
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-groups');
            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var groups = wrap.select('.nv-groups').selectAll('.nv-group')
                .data(function(d) { return d }, function(d,i) { return i });
            groups.enter().append('g')
                .style('stroke-opacity', 1e-6)
                .style('fill-opacity', 1e-6);
            groups.exit().watchTransition(renderWatch, 'multibarhorizontal: exit groups')
                .style('stroke-opacity', 1e-6)
                .style('fill-opacity', 1e-6)
                .remove();
            groups
                .attr('class', function(d,i) { return 'nv-group nv-series-' + i })
                .classed('hover', function(d) { return d.hover })
                .style('fill', function(d,i){ return color(d, i) })
                .style('stroke', function(d,i){ return color(d, i) });
            groups.watchTransition(renderWatch, 'multibarhorizontal: groups')
                .style('stroke-opacity', 1)
                .style('fill-opacity', fillOpacity);

            var bars = groups.selectAll('g.nv-bar')
                .data(function(d) { return d.values });
            bars.exit().remove();

            var barsEnter = bars.enter().append('g')
                .attr('transform', function(d,i,j) {
                    return 'translate(' + y0(stacked ? d.y0 : 0) + ',' + (stacked ? 0 : (j * x.rangeBand() / data.length ) + x(getX(d,i))) + ')'
                });

            barsEnter.append('rect')
                .attr('width', 0)
                .attr('height', x.rangeBand() / (stacked ? 1 : data.length) )

            bars
                .on('mouseover', function(d,i) { //TODO: figure out why j works above, but not here
                    d3.select(this).classed('hover', true);
                    dispatch.elementMouseover({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mouseout', function(d,i) {
                    d3.select(this).classed('hover', false);
                    dispatch.elementMouseout({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mouseout', function(d,i) {
                    dispatch.elementMouseout({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('mousemove', function(d,i) {
                    dispatch.elementMousemove({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                })
                .on('click', function(d,i) {
                    var element = this;
                    dispatch.elementClick({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill"),
                        event: d3.event,
                        element: element
                    });
                    d3.event.stopPropagation();
                })
                .on('dblclick', function(d,i) {
                    dispatch.elementDblClick({
                        data: d,
                        index: i,
                        color: d3.select(this).style("fill")
                    });
                    d3.event.stopPropagation();
                });

            if (getYerr(data[0],0)) {
                barsEnter.append('polyline');

                bars.select('polyline')
                    .attr('fill', 'none')
                    .attr('points', function(d,i) {
                        var xerr = getYerr(d,i)
                            , mid = 0.8 * x.rangeBand() / ((stacked ? 1 : data.length) * 2);
                        xerr = xerr.length ? xerr : [-Math.abs(xerr), Math.abs(xerr)];
                        xerr = xerr.map(function(e) { return y(e + ((getY(d,i) < 0) ? 0 : getY(d,i))) - y(0); });
                        var a = [[xerr[0],-mid], [xerr[0],mid], [xerr[0],0], [xerr[1],0], [xerr[1],-mid], [xerr[1],mid]];
                        return a.map(function (path) { return path.join(',') }).join(' ');
                    })
                    .attr('transform', function(d,i) {
                        var mid = x.rangeBand() / ((stacked ? 1 : data.length) * 2);
                        return 'translate(0, ' + mid + ')';
                    });
            }

            barsEnter.append('text');

            if (showValues && !stacked) {
                bars.select('text')
                    .attr('text-anchor', function(d,i) { return getY(d,i) < 0 ? 'end' : 'start' })
                    .attr('y', x.rangeBand() / (data.length * 2))
                    .attr('dy', '.32em')
                    .text(function(d,i) {
                        var t = valueFormat(getY(d,i))
                            , yerr = getYerr(d,i);
                        if (yerr === undefined)
                            return t;
                        if (!yerr.length)
                            return t + '±' + valueFormat(Math.abs(yerr));
                        return t + '+' + valueFormat(Math.abs(yerr[1])) + '-' + valueFormat(Math.abs(yerr[0]));
                    });
                bars.watchTransition(renderWatch, 'multibarhorizontal: bars')
                    .select('text')
                    .attr('x', function(d,i) { return getY(d,i) < 0 ? -4 : y(getY(d,i)) - y(0) + 4 })
            } else {
                bars.selectAll('text').text('');
            }

            if (showBarLabels && !stacked) {
                barsEnter.append('text').classed('nv-bar-label',true);
                bars.select('text.nv-bar-label')
                    .attr('text-anchor', function(d,i) { return getY(d,i) < 0 ? 'start' : 'end' })
                    .attr('y', x.rangeBand() / (data.length * 2))
                    .attr('dy', '.32em')
                    .text(function(d,i) { return getX(d,i) });
                bars.watchTransition(renderWatch, 'multibarhorizontal: bars')
                    .select('text.nv-bar-label')
                    .attr('x', function(d,i) { return getY(d,i) < 0 ? y(0) - y(getY(d,i)) + 4 : -4 });
            }
            else {
                bars.selectAll('text.nv-bar-label').text('');
            }

            bars
                .attr('class', function(d,i) { return getY(d,i) < 0 ? 'nv-bar negative' : 'nv-bar positive'})

            if (barColor) {
                if (!disabled) disabled = data.map(function() { return true });
                bars
                    .style('fill', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); })
                    .style('stroke', function(d,i,j) { return d3.rgb(barColor(d,i)).darker(  disabled.map(function(d,i) { return i }).filter(function(d,i){ return !disabled[i]  })[j]   ).toString(); });
            }

            if (stacked)
                bars.watchTransition(renderWatch, 'multibarhorizontal: bars')
                    .attr('transform', function(d,i) {
                        return 'translate(' + y(d.y1) + ',' + x(getX(d,i)) + ')'
                    })
                    .select('rect')
                    .attr('width', function(d,i) {
                        return Math.abs(y(getY(d,i) + d.y0) - y(d.y0)) || 0
                    })
                    .attr('height', x.rangeBand() );
            else
                bars.watchTransition(renderWatch, 'multibarhorizontal: bars')
                    .attr('transform', function(d,i) {
                        //TODO: stacked must be all positive or all negative, not both?
                        return 'translate(' +
                            (getY(d,i) < 0 ? y(getY(d,i)) : y(0))
                            + ',' +
                            (d.series * x.rangeBand() / data.length
                                +
                                x(getX(d,i)) )
                            + ')'
                    })
                    .select('rect')
                    .attr('height', x.rangeBand() / data.length )
                    .attr('width', function(d,i) {
                        return Math.max(Math.abs(y(getY(d,i)) - y(0)),1) || 0
                    });

            //store old scales for use in transitions on update
            x0 = x.copy();
            y0 = y.copy();

        });

        renderWatch.renderEnd('multibarHorizontal immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:   {get: function(){return width;}, set: function(_){width=_;}},
        height:  {get: function(){return height;}, set: function(_){height=_;}},
        x:       {get: function(){return getX;}, set: function(_){getX=_;}},
        y:       {get: function(){return getY;}, set: function(_){getY=_;}},
        yErr:       {get: function(){return getYerr;}, set: function(_){getYerr=_;}},
        xScale:  {get: function(){return x;}, set: function(_){x=_;}},
        yScale:  {get: function(){return y;}, set: function(_){y=_;}},
        xDomain: {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain: {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:  {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:  {get: function(){return yRange;}, set: function(_){yRange=_;}},
        forceY:  {get: function(){return forceY;}, set: function(_){forceY=_;}},
        stacked: {get: function(){return stacked;}, set: function(_){stacked=_;}},
        showValues: {get: function(){return showValues;}, set: function(_){showValues=_;}},
        // this shows the group name, seems pointless?
        //showBarLabels:    {get: function(){return showBarLabels;}, set: function(_){showBarLabels=_;}},
        disabled:     {get: function(){return disabled;}, set: function(_){disabled=_;}},
        id:           {get: function(){return id;}, set: function(_){id=_;}},
        valueFormat:  {get: function(){return valueFormat;}, set: function(_){valueFormat=_;}},
        valuePadding: {get: function(){return valuePadding;}, set: function(_){valuePadding=_;}},
        groupSpacing: {get: function(){return groupSpacing;}, set: function(_){groupSpacing=_;}},
        fillOpacity:  {get: function(){return fillOpacity;}, set: function(_){fillOpacity=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        barColor:  {get: function(){return barColor;}, set: function(_){
            barColor = _ ? nv.utils.getColor(_) : null;
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};

nv.models.multiBarHorizontalChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var multibar = nv.models.multiBarHorizontal()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
        , legend = nv.models.legend().height(30)
        , controls = nv.models.legend().height(30)
        , tooltip = nv.models.tooltip()
        ;

    var margin = {top: 30, right: 20, bottom: 50, left: 60}
        , marginTop = null
        , width = null
        , height = null
        , color = nv.utils.defaultColor()
        , showControls = true
        , controlsPosition = 'top'        
        , controlLabels = {}
        , showLegend = true
        , legendPosition = 'top'
        , showXAxis = true
        , showYAxis = true
        , stacked = false
        , x //can be accessed via chart.xScale()
        , y //can be accessed via chart.yScale()
        , state = nv.utils.state()
        , defaultState = null
        , noData = null
        , dispatch = d3.dispatch('stateChange', 'changeState','renderEnd')
        , controlWidth = function() { return showControls ? 180 : 0 }
        , duration = 250
        ;

    state.stacked = false; // DEPRECATED Maintained for backward compatibility

    multibar.stacked(stacked);

    xAxis
        .orient('left')
        .tickPadding(5)
        .showMaxMin(false)
        .tickFormat(function(d) { return d })
    ;
    yAxis
        .orient('bottom')
        .tickFormat(d3.format(',.1f'))
    ;

    tooltip
        .duration(0)
        .valueFormatter(function(d, i) {
            return yAxis.tickFormat()(d, i);
        })
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        });

    controls.updateState(false);

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled }),
                stacked: stacked
            };
        }
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.stacked !== undefined)
                stacked = state.stacked;
            if (state.active !== undefined)
                data.forEach(function(series,i) {
                    series.disabled = !state.active[i];
                });
        }
    };

    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(multibar);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);

        selection.each(function(data) {
            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() { container.transition().duration(duration).call(chart) };
            chart.container = this;

            stacked = multibar.stacked();

            state
                .setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            // DEPRECATED set state.disableddisabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display No Data message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            x = multibar.xScale();
            y = multibar.yScale().clamp(true);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-multiBarHorizontalChart').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-multiBarHorizontalChart').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y nv-axis')
                .append('g').attr('class', 'nv-zeroLine')
                .append('line');
            gEnter.append('g').attr('class', 'nv-barsWrap');
            gEnter.append('g').attr('class', 'nv-legendWrap');
            gEnter.append('g').attr('class', 'nv-controlsWrap');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                legend.width(availableWidth - controlWidth());

                g.select('.nv-legendWrap')
                    .datum(data)
                    .call(legend);
                if (legendPosition === 'bottom') {
                     margin.bottom = xAxis.height() + legend.height();
                     availableHeight = nv.utils.availableHeight(height, container, margin);
                     g.select('.nv-legendWrap')
                         .attr('transform', 'translate(' + controlWidth() + ',' + (availableHeight + xAxis.height())  +')');
                } else if (legendPosition === 'top') {

                    if (!marginTop && legend.height() !== margin.top) {
                        margin.top = legend.height();
                        availableHeight = nv.utils.availableHeight(height, container, margin);
                    }

                    g.select('.nv-legendWrap')
                        .attr('transform', 'translate(' + controlWidth() + ',' + (-margin.top) +')');
                }                    
            }

            // Controls
            if (!showControls) {
                 g.select('.nv-controlsWrap').selectAll('*').remove();
            } else {
                var controlsData = [
                    { key: controlLabels.grouped || 'Grouped', disabled: multibar.stacked() },
                    { key: controlLabels.stacked || 'Stacked', disabled: !multibar.stacked() }
                ];

                controls.width(controlWidth()).color(['#444', '#444', '#444']);

                if (controlsPosition === 'bottom') {
                     margin.bottom = xAxis.height() + legend.height();
                     availableHeight = nv.utils.availableHeight(height, container, margin);
                    g.select('.nv-controlsWrap')
                        .datum(controlsData)
                        .attr('transform', 'translate(0,' + (availableHeight + xAxis.height()) +')')
                        .call(controls);  

                } else if (controlsPosition === 'top') {
                    g.select('.nv-controlsWrap')
                        .datum(controlsData)
                        .attr('transform', 'translate(0,' + (-margin.top) +')')
                        .call(controls);                        
                }
            }

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // Main Chart Component(s)
            multibar
                .disabled(data.map(function(series) { return series.disabled }))
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    return d.color || color(d, i);
                }).filter(function(d,i) { return !data[i].disabled }));

            var barsWrap = g.select('.nv-barsWrap')
                .datum(data.filter(function(d) { return !d.disabled }));

            barsWrap.transition().call(multibar);

            // Setup Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    ._ticks( nv.utils.calcTicksY(availableHeight/24, data) )
                    .tickSize(-availableWidth, 0);

                g.select('.nv-x.nv-axis').call(xAxis);

                var xTicks = g.select('.nv-x.nv-axis').selectAll('g');

                xTicks
                    .selectAll('line, text');
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize( -availableHeight, 0);

                g.select('.nv-y.nv-axis')
                    .attr('transform', 'translate(0,' + availableHeight + ')');
                g.select('.nv-y.nv-axis').call(yAxis);
            }

            // Zero line
            g.select(".nv-zeroLine line")
                .attr("x1", y(0))
                .attr("x2", y(0))
                .attr("y1", 0)
                .attr("y2", -availableHeight)
            ;

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState)
                    state[key] = newState[key];
                dispatch.stateChange(state);
                chart.update();
            });

            controls.dispatch.on('legendClick', function(d,i) {
                if (!d.disabled) return;
                controlsData = controlsData.map(function(s) {
                    s.disabled = true;
                    return s;
                });
                d.disabled = false;

                switch (d.key) {
                    case 'Grouped':
                    case controlLabels.grouped:
                        multibar.stacked(false);
                        break;
                    case 'Stacked':
                    case controlLabels.stacked:
                        multibar.stacked(true);
                        break;
                }

                state.stacked = multibar.stacked();
                dispatch.stateChange(state);
                stacked = multibar.stacked();

                chart.update();
            });

            // Update chart from a state object passed to event handler
            dispatch.on('changeState', function(e) {

                if (typeof e.disabled !== 'undefined') {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });

                    state.disabled = e.disabled;
                }

                if (typeof e.stacked !== 'undefined') {
                    multibar.stacked(e.stacked);
                    state.stacked = e.stacked;
                    stacked = e.stacked;
                }

                chart.update();
            });
        });
        renderWatch.renderEnd('multibar horizontal chart immediate');
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    multibar.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt.value = chart.x()(evt.data);
        evt['series'] = {
            key: evt.data.key,
            value: chart.y()(evt.data),
            color: evt.color
        };
        tooltip.data(evt).hidden(false);
    });

    multibar.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    multibar.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.multibar = multibar;
    chart.legend = legend;
    chart.controls = controls;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.state = state;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        legendPosition: {get: function(){return legendPosition;}, set: function(_){legendPosition=_;}},
        controlsPosition: {get: function(){return controlsPosition;}, set: function(_){controlsPosition=_;}},
        showControls: {get: function(){return showControls;}, set: function(_){showControls=_;}},
        controlLabels: {get: function(){return controlLabels;}, set: function(_){controlLabels=_;}},
        showXAxis:      {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis:    {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        defaultState:    {get: function(){return defaultState;}, set: function(_){defaultState=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            multibar.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
        }},
        barColor:  {get: function(){return multibar.barColor;}, set: function(_){
            multibar.barColor(_);
            legend.color(function(d,i) {return d3.rgb('#ccc').darker(i * 1.5).toString();})
        }}
    });

    nv.utils.inheritOptions(chart, multibar);
    nv.utils.initOptions(chart);

    return chart;
};
nv.models.multiChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 30, right: 20, bottom: 50, left: 60},
        marginTop = null,
        color = nv.utils.defaultColor(),
        width = null,
        height = null,
        showLegend = true,
        noData = null,
        yDomain1,
        yDomain2,
        getX = function(d) { return d.x },
        getY = function(d) { return d.y},
        interpolate = 'linear',
        useVoronoi = true,
        interactiveLayer = nv.interactiveGuideline(),
        useInteractiveGuideline = false,
        legendRightAxisHint = ' (right axis)',
        duration = 250
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var x = d3.scale.linear(),
        yScale1 = d3.scale.linear(),
        yScale2 = d3.scale.linear(),

        lines1 = nv.models.line().yScale(yScale1).duration(duration),
        lines2 = nv.models.line().yScale(yScale2).duration(duration),

        scatters1 = nv.models.scatter().yScale(yScale1).duration(duration),
        scatters2 = nv.models.scatter().yScale(yScale2).duration(duration),

        bars1 = nv.models.multiBar().stacked(false).yScale(yScale1).duration(duration),
        bars2 = nv.models.multiBar().stacked(false).yScale(yScale2).duration(duration),

        stack1 = nv.models.stackedArea().yScale(yScale1).duration(duration),
        stack2 = nv.models.stackedArea().yScale(yScale2).duration(duration),

        xAxis = nv.models.axis().scale(x).orient('bottom').tickPadding(5).duration(duration),
        yAxis1 = nv.models.axis().scale(yScale1).orient('left').duration(duration),
        yAxis2 = nv.models.axis().scale(yScale2).orient('right').duration(duration),

        legend = nv.models.legend().height(30),
        tooltip = nv.models.tooltip(),
        dispatch = d3.dispatch();

    var charts = [lines1, lines2, scatters1, scatters2, bars1, bars2, stack1, stack2];

    function chart(selection) {
        selection.each(function(data) {
            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);

            chart.update = function() { container.transition().call(chart); };
            chart.container = this;

            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            var dataLines1 = data.filter(function(d) {return d.type == 'line' && d.yAxis == 1});
            var dataLines2 = data.filter(function(d) {return d.type == 'line' && d.yAxis == 2});
            var dataScatters1 = data.filter(function(d) {return d.type == 'scatter' && d.yAxis == 1});
            var dataScatters2 = data.filter(function(d) {return d.type == 'scatter' && d.yAxis == 2});
            var dataBars1 =  data.filter(function(d) {return d.type == 'bar'  && d.yAxis == 1});
            var dataBars2 =  data.filter(function(d) {return d.type == 'bar'  && d.yAxis == 2});
            var dataStack1 = data.filter(function(d) {return d.type == 'area' && d.yAxis == 1});
            var dataStack2 = data.filter(function(d) {return d.type == 'area' && d.yAxis == 2});

            // Display noData message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container);
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            var series1 = data.filter(function(d) {return !d.disabled && d.yAxis == 1})
                .map(function(d) {
                    return d.values.map(function(d,i) {
                        return { x: getX(d), y: getY(d) }
                    })
                });

            var series2 = data.filter(function(d) {return !d.disabled && d.yAxis == 2})
                .map(function(d) {
                    return d.values.map(function(d,i) {
                        return { x: getX(d), y: getY(d) }
                    })
                });

            x   .domain(d3.extent(d3.merge(series1.concat(series2)), function(d) { return d.x }))
                .range([0, availableWidth]);

            var wrap = container.selectAll('g.wrap.multiChart').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'wrap nvd3 multiChart').append('g');

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y1 nv-axis');
            gEnter.append('g').attr('class', 'nv-y2 nv-axis');
            gEnter.append('g').attr('class', 'stack1Wrap');
            gEnter.append('g').attr('class', 'stack2Wrap');
            gEnter.append('g').attr('class', 'bars1Wrap');
            gEnter.append('g').attr('class', 'bars2Wrap');
            gEnter.append('g').attr('class', 'scatters1Wrap');
            gEnter.append('g').attr('class', 'scatters2Wrap');
            gEnter.append('g').attr('class', 'lines1Wrap');
            gEnter.append('g').attr('class', 'lines2Wrap');
            gEnter.append('g').attr('class', 'legendWrap');
            gEnter.append('g').attr('class', 'nv-interactive');

            var g = wrap.select('g');

            var color_array = data.map(function(d,i) {
                return data[i].color || color(d, i);
            });

            // Legend
            if (!showLegend) {
                g.select('.legendWrap').selectAll('*').remove();
            } else {
                var legendWidth = legend.align() ? availableWidth / 2 : availableWidth;
                var legendXPosition = legend.align() ? legendWidth : 0;

                legend.width(legendWidth);
                legend.color(color_array);

                g.select('.legendWrap')
                    .datum(data.map(function(series) {
                        series.originalKey = series.originalKey === undefined ? series.key : series.originalKey;
                        series.key = series.originalKey + (series.yAxis == 1 ? '' : legendRightAxisHint);
                        return series;
                    }))
                    .call(legend);

                if (!marginTop && legend.height() !== margin.top) {
                    margin.top = legend.height();
                    availableHeight = nv.utils.availableHeight(height, container, margin);
                }

                g.select('.legendWrap')
                    .attr('transform', 'translate(' + legendXPosition + ',' + (-margin.top) +')');
            }

            lines1
                .width(availableWidth)
                .height(availableHeight)
                .interpolate(interpolate)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'line'}));
            lines2
                .width(availableWidth)
                .height(availableHeight)
                .interpolate(interpolate)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'line'}));
            scatters1
                .width(availableWidth)
                .height(availableHeight)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'scatter'}));
            scatters2
                .width(availableWidth)
                .height(availableHeight)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'scatter'}));
            bars1
                .width(availableWidth)
                .height(availableHeight)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'bar'}));
            bars2
                .width(availableWidth)
                .height(availableHeight)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'bar'}));
            stack1
                .width(availableWidth)
                .height(availableHeight)
                .interpolate(interpolate)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 1 && data[i].type == 'area'}));
            stack2
                .width(availableWidth)
                .height(availableHeight)
                .interpolate(interpolate)
                .color(color_array.filter(function(d,i) { return !data[i].disabled && data[i].yAxis == 2 && data[i].type == 'area'}));

            g.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            var lines1Wrap = g.select('.lines1Wrap')
                .datum(dataLines1.filter(function(d){return !d.disabled}));
            var scatters1Wrap = g.select('.scatters1Wrap')
                .datum(dataScatters1.filter(function(d){return !d.disabled}));
            var bars1Wrap = g.select('.bars1Wrap')
                .datum(dataBars1.filter(function(d){return !d.disabled}));
            var stack1Wrap = g.select('.stack1Wrap')
                .datum(dataStack1.filter(function(d){return !d.disabled}));
            var lines2Wrap = g.select('.lines2Wrap')
                .datum(dataLines2.filter(function(d){return !d.disabled}));
            var scatters2Wrap = g.select('.scatters2Wrap')
                .datum(dataScatters2.filter(function(d){return !d.disabled}));
            var bars2Wrap = g.select('.bars2Wrap')
                .datum(dataBars2.filter(function(d){return !d.disabled}));
            var stack2Wrap = g.select('.stack2Wrap')
                .datum(dataStack2.filter(function(d){return !d.disabled}));

            var extraValue1BarStacked = [];
            if (bars1.stacked() && dataBars1.length) {
                var extraValue1BarStacked = dataBars1.filter(function(d){return !d.disabled}).map(function(a){return a.values});
                
                if (extraValue1BarStacked.length > 0)
                    extraValue1BarStacked = extraValue1BarStacked.reduce(function(a,b){
                        return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
                    });
            }
            if (dataBars1.length) {
                extraValue1BarStacked.push({x:0, y:0});
            }
            
            var extraValue2BarStacked = [];
            if (bars2.stacked() && dataBars2.length) {
                var extraValue2BarStacked = dataBars2.filter(function(d){return !d.disabled}).map(function(a){return a.values});
                
                if (extraValue2BarStacked.length > 0)
                    extraValue2BarStacked = extraValue2BarStacked.reduce(function(a,b){
                        return a.map(function(aVal,i){return {x: aVal.x, y: aVal.y + b[i].y}})
                    });
            }
            if (dataBars2.length) {
                extraValue2BarStacked.push({x:0, y:0});
            }
            
            yScale1 .domain(yDomain1 || d3.extent(d3.merge(series1).concat(extraValue1BarStacked), function(d) { return d.y } ))
                .range([0, availableHeight]);

            yScale2 .domain(yDomain2 || d3.extent(d3.merge(series2).concat(extraValue2BarStacked), function(d) { return d.y } ))
                .range([0, availableHeight]);

            lines1.yDomain(yScale1.domain());
            scatters1.yDomain(yScale1.domain());
            bars1.yDomain(yScale1.domain());
            stack1.yDomain(yScale1.domain());

            lines2.yDomain(yScale2.domain());
            scatters2.yDomain(yScale2.domain());
            bars2.yDomain(yScale2.domain());
            stack2.yDomain(yScale2.domain());

            if(dataStack1.length){d3.transition(stack1Wrap).call(stack1);}
            if(dataStack2.length){d3.transition(stack2Wrap).call(stack2);}

            if(dataBars1.length){d3.transition(bars1Wrap).call(bars1);}
            if(dataBars2.length){d3.transition(bars2Wrap).call(bars2);}

            if(dataLines1.length){d3.transition(lines1Wrap).call(lines1);}
            if(dataLines2.length){d3.transition(lines2Wrap).call(lines2);}

            if(dataScatters1.length){d3.transition(scatters1Wrap).call(scatters1);}
            if(dataScatters2.length){d3.transition(scatters2Wrap).call(scatters2);}

            xAxis
                ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                .tickSize(-availableHeight, 0);

            g.select('.nv-x.nv-axis')
                .attr('transform', 'translate(0,' + availableHeight + ')');
            d3.transition(g.select('.nv-x.nv-axis'))
                .call(xAxis);

            yAxis1
                ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                .tickSize( -availableWidth, 0);


            d3.transition(g.select('.nv-y1.nv-axis'))
                .call(yAxis1);

            yAxis2
                ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                .tickSize( -availableWidth, 0);

            d3.transition(g.select('.nv-y2.nv-axis'))
                .call(yAxis2);

            g.select('.nv-y1.nv-axis')
                .classed('nv-disabled', series1.length ? false : true)
                .attr('transform', 'translate(' + x.range()[0] + ',0)');

            g.select('.nv-y2.nv-axis')
                .classed('nv-disabled', series2.length ? false : true)
                .attr('transform', 'translate(' + x.range()[1] + ',0)');

            legend.dispatch.on('stateChange', function(newState) {
                chart.update();
            });

            if(useInteractiveGuideline){
                interactiveLayer
                    .width(availableWidth)
                    .height(availableHeight)
                    .margin({left:margin.left, top:margin.top})
                    .svgContainer(container)
                    .xScale(x);
                wrap.select(".nv-interactive").call(interactiveLayer);
            }

            //============================================================
            // Event Handling/Dispatching
            //------------------------------------------------------------

            function mouseover_line(evt) {
                var yaxis = evt.series.yAxis === 2 ? yAxis2 : yAxis1;
                evt.value = evt.point.x;
                evt.series = {
                    value: evt.point.y,
                    color: evt.point.color,
                    key: evt.series.key
                };
                tooltip
                    .duration(0)
                    .headerFormatter(function(d, i) {
                    	return xAxis.tickFormat()(d, i);
                    })
                    .valueFormatter(function(d, i) {
                        return yaxis.tickFormat()(d, i);
                    })
                    .data(evt)
                    .hidden(false);
            }

            function mouseover_scatter(evt) {
                var yaxis = evt.series.yAxis === 2 ? yAxis2 : yAxis1;
                evt.value = evt.point.x;
                evt.series = {
                    value: evt.point.y,
                    color: evt.point.color,
                    key: evt.series.key
                };
                tooltip
                    .duration(100)
                    .headerFormatter(function(d, i) {
                    	return xAxis.tickFormat()(d, i);
                    })
                    .valueFormatter(function(d, i) {
                        return yaxis.tickFormat()(d, i);
                    })
                    .data(evt)
                    .hidden(false);
            }

            function mouseover_stack(evt) {
                var yaxis = evt.series.yAxis === 2 ? yAxis2 : yAxis1;
                evt.point['x'] = stack1.x()(evt.point);
                evt.point['y'] = stack1.y()(evt.point);
                tooltip
                    .duration(0)
                    .headerFormatter(function(d, i) {
                    	return xAxis.tickFormat()(d, i);
                    })
                    .valueFormatter(function(d, i) {
                        return yaxis.tickFormat()(d, i);
                    })
                    .data(evt)
                    .hidden(false);
            }

            function mouseover_bar(evt) {
                var yaxis = evt.series.yAxis === 2 ? yAxis2 : yAxis1;

                evt.value = bars1.x()(evt.data);
                evt['series'] = {
                    value: bars1.y()(evt.data),
                    color: evt.color,
                    key: evt.data.key
                };
                tooltip
                    .duration(0)
                    .headerFormatter(function(d, i) {
                    	return xAxis.tickFormat()(d, i);
                    })
                    .valueFormatter(function(d, i) {
                        return yaxis.tickFormat()(d, i);
                    })
                    .data(evt)
                    .hidden(false);
            }



            function clearHighlights() {
              for(var i=0, il=charts.length; i < il; i++){
                var chart = charts[i];
                try {
                  chart.clearHighlights();
                } catch(e){}
              }
            }

            function highlightPoint(serieIndex, pointIndex, b){
              for(var i=0, il=charts.length; i < il; i++){
                var chart = charts[i];
                try {
                  chart.highlightPoint(serieIndex, pointIndex, b);
                } catch(e){}
              }
            }

            if(useInteractiveGuideline){
                interactiveLayer.dispatch.on('elementMousemove', function(e) {
                    clearHighlights();
                    var singlePoint, pointIndex, pointXLocation, allData = [];
                    data
                    .filter(function(series, i) {
                        series.seriesIndex = i;
                        return !series.disabled;
                    })
                    .forEach(function(series,i) {
                        var extent = x.domain();
                        var currentValues = series.values.filter(function(d,i) {
                            return chart.x()(d,i) >= extent[0] && chart.x()(d,i) <= extent[1];
                        });

                        pointIndex = nv.interactiveBisect(currentValues, e.pointXValue, chart.x());
                        var point = currentValues[pointIndex];
                        var pointYValue = chart.y()(point, pointIndex);
                        if (pointYValue !== null) {
                            highlightPoint(i, pointIndex, true);
                        }
                        if (point === undefined) return;
                        if (singlePoint === undefined) singlePoint = point;
                        if (pointXLocation === undefined) pointXLocation = x(chart.x()(point,pointIndex));
                        allData.push({
                            key: series.key,
                            value: pointYValue,
                            color: color(series,series.seriesIndex),
                            data: point,
                            yAxis: series.yAxis == 2 ? yAxis2 : yAxis1
                        });
                    });

                    var defaultValueFormatter = function(d,i) {
                        var yAxis = allData[i].yAxis;
                        return d == null ? "N/A" : yAxis.tickFormat()(d);
                    };

                    interactiveLayer.tooltip
                        .headerFormatter(function(d, i) {
                            return xAxis.tickFormat()(d, i);
                        })
                        .valueFormatter(interactiveLayer.tooltip.valueFormatter() || defaultValueFormatter)
                        .data({
                            value: chart.x()( singlePoint,pointIndex ),
                            index: pointIndex,
                            series: allData
                        })();

                    interactiveLayer.renderGuideLine(pointXLocation);
                });

                interactiveLayer.dispatch.on("elementMouseout",function(e) {
                    clearHighlights();
                });
            } else {
                lines1.dispatch.on('elementMouseover.tooltip', mouseover_line);
                lines2.dispatch.on('elementMouseover.tooltip', mouseover_line);
                lines1.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true)
                });
                lines2.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true)
                });

                scatters1.dispatch.on('elementMouseover.tooltip', mouseover_scatter);
                scatters2.dispatch.on('elementMouseover.tooltip', mouseover_scatter);
                scatters1.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true)
                });
                scatters2.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true)
                });

                stack1.dispatch.on('elementMouseover.tooltip', mouseover_stack);
                stack2.dispatch.on('elementMouseover.tooltip', mouseover_stack);
                stack1.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true)
                });
                stack2.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true)
                });

                bars1.dispatch.on('elementMouseover.tooltip', mouseover_bar);
                bars2.dispatch.on('elementMouseover.tooltip', mouseover_bar);

                bars1.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true);
                });
                bars2.dispatch.on('elementMouseout.tooltip', function(evt) {
                    tooltip.hidden(true);
                });
                bars1.dispatch.on('elementMousemove.tooltip', function(evt) {
                    tooltip();
                });
                bars2.dispatch.on('elementMousemove.tooltip', function(evt) {
                    tooltip();
                });
            }
        });

        return chart;
    }

    //============================================================
    // Global getters and setters
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.legend = legend;
    chart.lines1 = lines1;
    chart.lines2 = lines2;
    chart.scatters1 = scatters1;
    chart.scatters2 = scatters2;
    chart.bars1 = bars1;
    chart.bars2 = bars2;
    chart.stack1 = stack1;
    chart.stack2 = stack2;
    chart.xAxis = xAxis;
    chart.yAxis1 = yAxis1;
    chart.yAxis2 = yAxis2;
    chart.tooltip = tooltip;
    chart.interactiveLayer = interactiveLayer;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        yDomain1:      {get: function(){return yDomain1;}, set: function(_){yDomain1=_;}},
        yDomain2:    {get: function(){return yDomain2;}, set: function(_){yDomain2=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        interpolate:    {get: function(){return interpolate;}, set: function(_){interpolate=_;}},
        legendRightAxisHint:    {get: function(){return legendRightAxisHint;}, set: function(_){legendRightAxisHint=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        x: {get: function(){return getX;}, set: function(_){
            getX = _;
            lines1.x(_);
            lines2.x(_);
            scatters1.x(_);
            scatters2.x(_);
            bars1.x(_);
            bars2.x(_);
            stack1.x(_);
            stack2.x(_);
        }},
        y: {get: function(){return getY;}, set: function(_){
            getY = _;
            lines1.y(_);
            lines2.y(_);
            scatters1.y(_);
            scatters2.y(_);
            stack1.y(_);
            stack2.y(_);
            bars1.y(_);
            bars2.y(_);
        }},
        useVoronoi: {get: function(){return useVoronoi;}, set: function(_){
            useVoronoi=_;
            lines1.useVoronoi(_);
            lines2.useVoronoi(_);
            stack1.useVoronoi(_);
            stack2.useVoronoi(_);
        }},

        useInteractiveGuideline: {get: function(){return useInteractiveGuideline;}, set: function(_){
            useInteractiveGuideline = _;
            if (useInteractiveGuideline) {
                lines1.interactive(false);
                lines1.useVoronoi(false);
                lines2.interactive(false);
                lines2.useVoronoi(false);
                stack1.interactive(false);
                stack1.useVoronoi(false);
                stack2.interactive(false);
                stack2.useVoronoi(false);
                scatters1.interactive(false);
                scatters2.interactive(false);
            }
        }},

        duration: {get: function(){return duration;}, set: function(_) {
            duration = _;
            [lines1, lines2, stack1, stack2, scatters1, scatters2, xAxis, yAxis1, yAxis2].forEach(function(model){
              model.duration(duration);
            });
        }}
    });

    nv.utils.initOptions(chart);

    return chart;
};

nv.models.ohlcBar = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = null
        , height = null
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container = null
        , x = d3.scale.linear()
        , y = d3.scale.linear()
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , getOpen = function(d) { return d.open }
        , getClose = function(d) { return d.close }
        , getHigh = function(d) { return d.high }
        , getLow = function(d) { return d.low }
        , forceX = []
        , forceY = []
        , padData     = false // If true, adds half a data points width to front and back, for lining up a line chart with a bar chart
        , clipEdge = true
        , color = nv.utils.defaultColor()
        , interactive = false
        , xDomain
        , yDomain
        , xRange
        , yRange
        , dispatch = d3.dispatch('stateChange', 'changeState', 'renderEnd', 'chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove')
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    function chart(selection) {
        selection.each(function(data) {
            container = d3.select(this);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            nv.utils.initSVG(container);

            // ohlc bar width.
            var w = (availableWidth / data[0].values.length) * .9;

            // Setup Scales
            x.domain(xDomain || d3.extent(data[0].values.map(getX).concat(forceX) ));

            if (padData)
                x.range(xRange || [availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
            else
                x.range(xRange || [5 + w/2, availableWidth - w/2 - 5]);

            y.domain(yDomain || [
                    d3.min(data[0].values.map(getLow).concat(forceY)),
                    d3.max(data[0].values.map(getHigh).concat(forceY))
                ]
            ).range(yRange || [availableHeight, 0]);

            // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
            if (x.domain()[0] === x.domain()[1])
                x.domain()[0] ?
                    x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
                    : x.domain([-1,1]);

            if (y.domain()[0] === y.domain()[1])
                y.domain()[0] ?
                    y.domain([y.domain()[0] + y.domain()[0] * 0.01, y.domain()[1] - y.domain()[1] * 0.01])
                    : y.domain([-1,1]);

            // Setup containers and skeleton of chart
            var wrap = d3.select(this).selectAll('g.nv-wrap.nv-ohlcBar').data([data[0].values]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-ohlcBar');
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-ticks');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            container
                .on('click', function(d,i) {
                    dispatch.chartClick({
                        data: d,
                        index: i,
                        pos: d3.event,
                        id: id
                    });
                });

            defsEnter.append('clipPath')
                .attr('id', 'nv-chart-clip-path-' + id)
                .append('rect');

            wrap.select('#nv-chart-clip-path-' + id + ' rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            g   .attr('clip-path', clipEdge ? 'url(#nv-chart-clip-path-' + id + ')' : '');

            var ticks = wrap.select('.nv-ticks').selectAll('.nv-tick')
                .data(function(d) { return d });
            ticks.exit().remove();

            ticks.enter().append('path')
                .attr('class', function(d,i,j) { return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i })
                .attr('d', function(d,i) {
                    return 'm0,0l0,'
                        + (y(getOpen(d,i))
                            - y(getHigh(d,i)))
                        + 'l'
                        + (-w/2)
                        + ',0l'
                        + (w/2)
                        + ',0l0,'
                        + (y(getLow(d,i)) - y(getOpen(d,i)))
                        + 'l0,'
                        + (y(getClose(d,i))
                            - y(getLow(d,i)))
                        + 'l'
                        + (w/2)
                        + ',0l'
                        + (-w/2)
                        + ',0z';
                })
                .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
                .attr('fill', function(d,i) { return color[0]; })
                .attr('stroke', function(d,i) { return color[0]; })
                .attr('x', 0 )
                .attr('y', function(d,i) {  return y(Math.max(0, getY(d,i))) })
                .attr('height', function(d,i) { return Math.abs(y(getY(d,i)) - y(0)) });

            // the bar colors are controlled by CSS currently
            ticks.attr('class', function(d,i,j) {
                return (getOpen(d,i) > getClose(d,i) ? 'nv-tick negative' : 'nv-tick positive') + ' nv-tick-' + j + '-' + i;
            });

            d3.transition(ticks)
                .attr('transform', function(d,i) { return 'translate(' + x(getX(d,i)) + ',' + y(getHigh(d,i)) + ')'; })
                .attr('d', function(d,i) {
                    var w = (availableWidth / data[0].values.length) * .9;
                    return 'm0,0l0,'
                        + (y(getOpen(d,i))
                            - y(getHigh(d,i)))
                        + 'l'
                        + (-w/2)
                        + ',0l'
                        + (w/2)
                        + ',0l0,'
                        + (y(getLow(d,i))
                            - y(getOpen(d,i)))
                        + 'l0,'
                        + (y(getClose(d,i))
                            - y(getLow(d,i)))
                        + 'l'
                        + (w/2)
                        + ',0l'
                        + (-w/2)
                        + ',0z';
                });
        });

        return chart;
    }


    //Create methods to allow outside functions to highlight a specific bar.
    chart.highlightPoint = function(pointIndex, isHoverOver) {
        chart.clearHighlights();
        container.select(".nv-ohlcBar .nv-tick-0-" + pointIndex)
            .classed("hover", isHoverOver)
        ;
    };

    chart.clearHighlights = function() {
        container.select(".nv-ohlcBar .nv-tick.hover")
            .classed("hover", false)
        ;
    };

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:    {get: function(){return width;}, set: function(_){width=_;}},
        height:   {get: function(){return height;}, set: function(_){height=_;}},
        xScale:   {get: function(){return x;}, set: function(_){x=_;}},
        yScale:   {get: function(){return y;}, set: function(_){y=_;}},
        xDomain:  {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain:  {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:   {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:   {get: function(){return yRange;}, set: function(_){yRange=_;}},
        forceX:   {get: function(){return forceX;}, set: function(_){forceX=_;}},
        forceY:   {get: function(){return forceY;}, set: function(_){forceY=_;}},
        padData:  {get: function(){return padData;}, set: function(_){padData=_;}},
        clipEdge: {get: function(){return clipEdge;}, set: function(_){clipEdge=_;}},
        id:       {get: function(){return id;}, set: function(_){id=_;}},
        interactive: {get: function(){return interactive;}, set: function(_){interactive=_;}},

        x:     {get: function(){return getX;}, set: function(_){getX=_;}},
        y:     {get: function(){return getY;}, set: function(_){getY=_;}},
        open:  {get: function(){return getOpen();}, set: function(_){getOpen=_;}},
        close: {get: function(){return getClose();}, set: function(_){getClose=_;}},
        high:  {get: function(){return getHigh;}, set: function(_){getHigh=_;}},
        low:   {get: function(){return getLow;}, set: function(_){getLow=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    != undefined ? _.top    : margin.top;
            margin.right  = _.right  != undefined ? _.right  : margin.right;
            margin.bottom = _.bottom != undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   != undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });

    nv.utils.initOptions(chart);
    return chart;
};
// Code adapted from Jason Davies' "Parallel Coordinates"
// http://bl.ocks.org/jasondavies/1341281
nv.models.parallelCoordinates = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 30, right: 0, bottom: 10, left: 0}
        , width = null
        , height = null
        , availableWidth = null
        , availableHeight = null
        , x = d3.scale.ordinal()
        , y = {}
        , undefinedValuesLabel = "undefined values"
        , dimensionData = []
        , enabledDimensions = []
        , dimensionNames = []
        , displayBrush = true
        , color = nv.utils.defaultColor()
        , filters = []
        , active = []
        , dragging = []
        , axisWithUndefinedValues = []
        , lineTension = 1
        , foreground
        , background
        , dimensions
        , line = d3.svg.line()
        , axis = d3.svg.axis()
        , dispatch = d3.dispatch('brushstart', 'brush', 'brushEnd', 'dimensionsOrder', "stateChange", 'elementClick', 'elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd', 'activeChanged')
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var container = d3.select(this);
            availableWidth = nv.utils.availableWidth(width, container, margin);
            availableHeight = nv.utils.availableHeight(height, container, margin);

            nv.utils.initSVG(container);

           //Convert old data to new format (name, values)
            if (data[0].values === undefined) {
                var newData = [];
                data.forEach(function (d) {
                        var val = {};
                        var key = Object.keys(d);
                        key.forEach(function (k) { if (k !== "name") val[k] = d[k] });
                        newData.push({ key: d.name, values: val });
                });
                data = newData;
            }

            var dataValues = data.map(function (d) {return d.values});
            if (active.length === 0) {
                active = data;
            }; //set all active before first brush call
            
            dimensionNames = dimensionData.sort(function (a, b) { return a.currentPosition - b.currentPosition; }).map(function (d) { return d.key });
            enabledDimensions = dimensionData.filter(function (d) { return !d.disabled; });
            
            // Setup Scales
            x.rangePoints([0, availableWidth], 1).domain(enabledDimensions.map(function (d) { return d.key; }));

            //Set as true if all values on an axis are missing.
            // Extract the list of dimensions and create a scale for each.
            var oldDomainMaxValue = {};
            var displayMissingValuesline = false;
            var currentTicks = [];
            
            dimensionNames.forEach(function(d) {
                var extent = d3.extent(dataValues, function (p) { return +p[d]; });
                var min = extent[0];
                var max = extent[1];
                var onlyUndefinedValues = false;
                //If there is no values to display on an axis, set the extent to 0
                if (isNaN(min) || isNaN(max)) {
                    onlyUndefinedValues = true;
                    min = 0;
                    max = 0;
                }
                //Scale axis if there is only one value
                if (min === max) {
                    min = min - 1;
                    max = max + 1;
                }
                var f = filters.filter(function (k) { return k.dimension == d; });
                if (f.length !== 0) {
                    //If there is only NaN values, keep the existing domain.
                    if (onlyUndefinedValues) {
                        min = y[d].domain()[0];
                        max = y[d].domain()[1];
                    }
                        //If the brush extent is > max (< min), keep the extent value.
                    else if (!f[0].hasOnlyNaN && displayBrush) {
                        min = min > f[0].extent[0] ? f[0].extent[0] : min;
                        max = max < f[0].extent[1] ? f[0].extent[1] : max;
                    }
                        //If there is NaN values brushed be sure the brush extent is on the domain.
                    else if (f[0].hasNaN) {
                        max = max < f[0].extent[1] ? f[0].extent[1] : max;
                        oldDomainMaxValue[d] = y[d].domain()[1];
                        displayMissingValuesline = true;
                    }
                }
                //Use 90% of (availableHeight - 12) for the axis range, 12 reprensenting the space necessary to display "undefined values" text.
                //The remaining 10% are used to display the missingValue line.
                y[d] = d3.scale.linear()
                    .domain([min, max])
                    .range([(availableHeight - 12) * 0.9, 0]);

                axisWithUndefinedValues = [];
                y[d].brush = d3.svg.brush().y(y[d]).on('brushstart', brushstart).on('brush', brush).on('brushend', brushend);
            });

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-parallelCoordinates').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-parallelCoordinates');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-parallelCoordinates background');
            gEnter.append('g').attr('class', 'nv-parallelCoordinates foreground');
            gEnter.append('g').attr('class', 'nv-parallelCoordinates missingValuesline');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            line.interpolate('cardinal').tension(lineTension);
            axis.orient('left');
            var axisDrag = d3.behavior.drag()
                        .on('dragstart', dragStart)
                        .on('drag', dragMove)
                        .on('dragend', dragEnd);

            //Add missing value line at the bottom of the chart
            var missingValuesline, missingValueslineText;
            var step = x.range()[1] - x.range()[0];
            step = isNaN(step) ? x.range()[0] : step;
            if (!isNaN(step)) {
                var lineData = [0 + step / 2, availableHeight - 12, availableWidth - step / 2, availableHeight - 12];
                missingValuesline = wrap.select('.missingValuesline').selectAll('line').data([lineData]);
                missingValuesline.enter().append('line');
                missingValuesline.exit().remove();
                missingValuesline.attr("x1", function(d) { return d[0]; })
                        .attr("y1", function(d) { return d[1]; })
                        .attr("x2", function(d) { return d[2]; })
                        .attr("y2", function(d) { return d[3]; });
    
                //Add the text "undefined values" under the missing value line
                missingValueslineText = wrap.select('.missingValuesline').selectAll('text').data([undefinedValuesLabel]);
                missingValueslineText.append('text').data([undefinedValuesLabel]);
                missingValueslineText.enter().append('text');
                missingValueslineText.exit().remove();
                missingValueslineText.attr("y", availableHeight)
                        //To have the text right align with the missingValues line, substract 92 representing the text size.
                        .attr("x", availableWidth - 92 - step / 2)
                        .text(function(d) { return d; });
            }
            // Add grey background lines for context.
            background = wrap.select('.background').selectAll('path').data(data);
            background.enter().append('path');
            background.exit().remove();
            background.attr('d', path);

            // Add blue foreground lines for focus.
            foreground = wrap.select('.foreground').selectAll('path').data(data);
            foreground.enter().append('path')
            foreground.exit().remove();
            foreground.attr('d', path)
                .style("stroke-width", function (d, i) {
                if (isNaN(d.strokeWidth)) { d.strokeWidth = 1;} return d.strokeWidth;})
                .attr('stroke', function (d, i) { return d.color || color(d, i); });
            foreground.on("mouseover", function (d, i) {
                d3.select(this).classed('hover', true).style("stroke-width", d.strokeWidth + 2 + "px").style("stroke-opacity", 1);
                dispatch.elementMouseover({
                    label: d.name,
                    color: d.color || color(d, i),
                    values: d.values,
                    dimensions: enabledDimensions
                });

            });
            foreground.on("mouseout", function (d, i) {
                d3.select(this).classed('hover', false).style("stroke-width", d.strokeWidth + "px").style("stroke-opacity", 0.7);
                dispatch.elementMouseout({
                    label: d.name,
                    index: i
                });
            });
            foreground.on('mousemove', function (d, i) {
                dispatch.elementMousemove();
            });
            foreground.on('click', function (d) {
                dispatch.elementClick({
                    id: d.id
                });
            });
            // Add a group element for each dimension.
            dimensions = g.selectAll('.dimension').data(enabledDimensions);
            var dimensionsEnter = dimensions.enter().append('g').attr('class', 'nv-parallelCoordinates dimension');

            dimensions.attr('transform', function(d) { return 'translate(' + x(d.key) + ',0)'; });
            dimensionsEnter.append('g').attr('class', 'nv-axis');

            // Add an axis and title.
            dimensionsEnter.append('text')
                .attr('class', 'nv-label')
                .style("cursor", "move")
                .attr('dy', '-1em')
                .attr('text-anchor', 'middle')
                .on("mouseover", function(d, i) {
                    dispatch.elementMouseover({
                        label: d.tooltip || d.key,
                        color: d.color 
                    });
                })
                .on("mouseout", function(d, i) {
                    dispatch.elementMouseout({
                        label: d.tooltip
                    });
                })
                .on('mousemove', function (d, i) {
                    dispatch.elementMousemove();
                })
                .call(axisDrag);

            dimensionsEnter.append('g').attr('class', 'nv-brushBackground');
            dimensions.exit().remove();
            dimensions.select('.nv-label').text(function (d) { return d.key });

            // Add and store a brush for each axis.
            restoreBrush(displayBrush);

            var actives = dimensionNames.filter(function (p) { return !y[p].brush.empty(); }),
                    extents = actives.map(function (p) { return y[p].brush.extent(); });
            var formerActive = active.slice(0);

            //Restore active values
            active = [];
            foreground.style("display", function (d) {
                var isActive = actives.every(function (p, i) {
                    if ((isNaN(d.values[p]) || isNaN(parseFloat(d.values[p]))) && extents[i][0] == y[p].brush.y().domain()[0]) {
                        return true;
                    }
                    return (extents[i][0] <= d.values[p] && d.values[p] <= extents[i][1]) && !isNaN(parseFloat(d.values[p]));
                });
                if (isActive)
                    active.push(d);
                return !isActive ? "none" : null;

            });

            if (filters.length > 0 || !nv.utils.arrayEquals(active, formerActive)) {
               dispatch.activeChanged(active);
            }

            // Returns the path for a given data point.
            function path(d) {
                return line(enabledDimensions.map(function (p) {
                    //If value if missing, put the value on the missing value line
                    if (isNaN(d.values[p.key]) || isNaN(parseFloat(d.values[p.key])) || displayMissingValuesline) {
                        var domain = y[p.key].domain();
                        var range = y[p.key].range();
                        var min = domain[0] - (domain[1] - domain[0]) / 9;

                        //If it's not already the case, allow brush to select undefined values
                        if (axisWithUndefinedValues.indexOf(p.key) < 0) {

                            var newscale = d3.scale.linear().domain([min, domain[1]]).range([availableHeight - 12, range[1]]);
                            y[p.key].brush.y(newscale);
                            axisWithUndefinedValues.push(p.key);
                        }
                        if (isNaN(d.values[p.key]) || isNaN(parseFloat(d.values[p.key]))) {
                            return [x(p.key), y[p.key](min)];
                        }
                    }

                    //If parallelCoordinate contain missing values show the missing values line otherwise, hide it.
                    if (missingValuesline !== undefined) {
                        if (axisWithUndefinedValues.length > 0 || displayMissingValuesline) {
                            missingValuesline.style("display", "inline");
                            missingValueslineText.style("display", "inline");
                        } else {
                            missingValuesline.style("display", "none");
                            missingValueslineText.style("display", "none");
                        }
                    }
                    return [x(p.key), y[p.key](d.values[p.key])];
                }));
            }

            function restoreBrush(visible) {
                filters.forEach(function (f) {
                    //If filter brushed NaN values, keep the brush on the bottom of the axis.
                    var brushDomain = y[f.dimension].brush.y().domain();
                    if (f.hasOnlyNaN) {
                        f.extent[1] = (y[f.dimension].domain()[1] - brushDomain[0]) * (f.extent[1] - f.extent[0]) / (oldDomainMaxValue[f.dimension] - f.extent[0]) + brushDomain[0];
                    }
                    if (f.hasNaN) {
                        f.extent[0] = brushDomain[0];
                    }
                    if (visible)
                        y[f.dimension].brush.extent(f.extent);
                });
                
                dimensions.select('.nv-brushBackground')
                    .each(function (d) {
                        d3.select(this).call(y[d.key].brush);

                    })
                    .selectAll('rect')
                    .attr('x', -8)
                    .attr('width', 16);
                
                updateTicks();
            }
            
            // Handles a brush event, toggling the display of foreground lines.
            function brushstart() {
                //If brush aren't visible, show it before brushing again.
                if (displayBrush === false) {
                    displayBrush = true;
                    restoreBrush(true);
                }
            }
            
            // Handles a brush event, toggling the display of foreground lines.
            function brush() {
                actives = dimensionNames.filter(function (p) { return !y[p].brush.empty(); });
                extents = actives.map(function(p) { return y[p].brush.extent(); });

                filters = []; //erase current filters
                actives.forEach(function(d,i) {
                    filters[i] = {
                        dimension: d,
                        extent: extents[i],
                        hasNaN: false,
                        hasOnlyNaN: false
                    }
                });

                active = []; //erase current active list
                foreground.style('display', function(d) {
                    var isActive = actives.every(function(p, i) {
                        if ((isNaN(d.values[p]) || isNaN(parseFloat(d.values[p]))) && extents[i][0] == y[p].brush.y().domain()[0]) return true;
                        return (extents[i][0] <= d.values[p] && d.values[p] <= extents[i][1]) && !isNaN(parseFloat(d.values[p]));
                    });
                    if (isActive) active.push(d);
                    return isActive ? null : 'none';
                });
                
                updateTicks();
                
                dispatch.brush({
                    filters: filters,
                    active: active
                });
            }
            function brushend() {
                var hasActiveBrush = actives.length > 0 ? true : false;
                filters.forEach(function (f) {
                    if (f.extent[0] === y[f.dimension].brush.y().domain()[0] && axisWithUndefinedValues.indexOf(f.dimension) >= 0)
                        f.hasNaN = true;
                    if (f.extent[1] < y[f.dimension].domain()[0])
                        f.hasOnlyNaN = true;
                });
                dispatch.brushEnd(active, hasActiveBrush);
            }           
            function updateTicks() {
                dimensions.select('.nv-axis')
                    .each(function (d, i) {
                        var f = filters.filter(function (k) { return k.dimension == d.key; });
                        currentTicks[d.key] = y[d.key].domain();
                        
                        //If brush are available, display brush extent
                        if (f.length != 0 && displayBrush)
                        {
                            currentTicks[d.key] = [];
                            if (f[0].extent[1] > y[d.key].domain()[0]) 
                                currentTicks[d.key] = [f[0].extent[1]];
                            if (f[0].extent[0] >= y[d.key].domain()[0])
                                currentTicks[d.key].push(f[0].extent[0]);    
                        }
                            
                        d3.select(this).call(axis.scale(y[d.key]).tickFormat(d.format).tickValues(currentTicks[d.key]));
                });
            }
            function dragStart(d) {
                dragging[d.key] = this.parentNode.__origin__ = x(d.key);
                background.attr("visibility", "hidden");
            }
            function dragMove(d) {
                dragging[d.key] = Math.min(availableWidth, Math.max(0, this.parentNode.__origin__ += d3.event.x));
                foreground.attr("d", path);
                enabledDimensions.sort(function (a, b) { return dimensionPosition(a.key) - dimensionPosition(b.key); });
                enabledDimensions.forEach(function (d, i) { return d.currentPosition = i; });
                x.domain(enabledDimensions.map(function (d) { return d.key; }));
                dimensions.attr("transform", function(d) { return "translate(" + dimensionPosition(d.key) + ")"; });
            }
            function dragEnd(d, i) {
                delete this.parentNode.__origin__;
                delete dragging[d.key];
                d3.select(this.parentNode).attr("transform", "translate(" + x(d.key) + ")");
                foreground
                  .attr("d", path);
                background
                  .attr("d", path)
                  .attr("visibility", null);

                dispatch.dimensionsOrder(enabledDimensions);
            }
            function dimensionPosition(d) {
                var v = dragging[d];
                return v == null ? x(d) : v;
            }
        });
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:         {get: function(){return width;},           set: function(_){width= _;}},
        height:        {get: function(){return height;},          set: function(_){height= _;}},
        dimensionData: { get: function () { return dimensionData; }, set: function (_) { dimensionData = _; } },
        displayBrush: { get: function () { return displayBrush; }, set: function (_) { displayBrush = _; } },
        filters: { get: function () { return filters; }, set: function (_) { filters = _; } },
        active: { get: function () { return active; }, set: function (_) { active = _; } },
        lineTension:   {get: function(){return lineTension;},     set: function(_){lineTension = _;}},
        undefinedValuesLabel : {get: function(){return undefinedValuesLabel;}, set: function(_){undefinedValuesLabel=_;}},
        
        // deprecated options
        dimensions: {get: function () { return dimensionData.map(function (d){return d.key}); }, set: function (_) {
            // deprecated after 1.8.1
            nv.deprecated('dimensions', 'use dimensionData instead');
            if (dimensionData.length === 0) {
                _.forEach(function (k) { dimensionData.push({ key: k }) })
            } else {
                _.forEach(function (k, i) { dimensionData[i].key= k })
            }
        }},
        dimensionNames: {get: function () { return dimensionData.map(function (d){return d.key}); }, set: function (_) {
            // deprecated after 1.8.1
            nv.deprecated('dimensionNames', 'use dimensionData instead');
            dimensionNames = [];
            if (dimensionData.length === 0) {
                _.forEach(function (k) { dimensionData.push({ key: k }) })
            } else {
                _.forEach(function (k, i) { dimensionData[i].key = k })
            }
 
        }},
        dimensionFormats: {get: function () { return dimensionData.map(function (d) { return d.format }); }, set: function (_) {
            // deprecated after 1.8.1
            nv.deprecated('dimensionFormats', 'use dimensionData instead');
            if (dimensionData.length === 0) {
                _.forEach(function (f) { dimensionData.push({ format: f }) })
            } else {
                _.forEach(function (f, i) { dimensionData[i].format = f })
            }

        }},
        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    =  _.top    !== undefined ? _.top    : margin.top;
            margin.right  =  _.right  !== undefined ? _.right  : margin.right;
            margin.bottom =  _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   =  _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });
    nv.utils.initOptions(chart);
    return chart;
};
nv.models.parallelCoordinatesChart = function () {
        "use strict";
        //============================================================
        // Public Variables with Default Settings
        //------------------------------------------------------------

        var parallelCoordinates = nv.models.parallelCoordinates()
        var legend = nv.models.legend()
        var tooltip = nv.models.tooltip();
        var dimensionTooltip = nv.models.tooltip();

        var margin = { top: 0, right: 0, bottom: 0, left: 0 }
        , marginTop = null
        , width = null
        , height = null
        , showLegend = true
        , color = nv.utils.defaultColor()
        , state = nv.utils.state()
        , dimensionData = []
        , displayBrush = true
        , defaultState = null
        , noData = null
        , nanValue = "undefined"
        , dispatch = d3.dispatch('dimensionsOrder', 'brushEnd', 'stateChange', 'changeState', 'renderEnd')
        , controlWidth = function () { return showControls ? 180 : 0 }
        ;

	    //============================================================

		//============================================================
        // Private Variables
        //------------------------------------------------------------

        var renderWatch = nv.utils.renderWatch(dispatch);

        var stateGetter = function(data) {
            return function() {
                return {
                    active: data.map(function(d) { return !d.disabled })
                };
            }
        };

        var stateSetter = function(data) {
            return function(state) {
                if(state.active !== undefined) {
                    data.forEach(function(series, i) {
                        series.disabled = !state.active[i];
                    });
                }
            }
        };

        tooltip.contentGenerator(function(data) {
            var str = '<table><thead><tr><td class="legend-color-guide"><div style="background-color:' + data.color + '"></div></td><td><strong>' + data.key + '</strong></td></tr></thead>';
            if(data.series.length !== 0)
            {
                str = str + '<tbody><tr><td height ="10px"></td></tr>';
                data.series.forEach(function(d){
                    str = str + '<tr><td class="legend-color-guide"><div style="background-color:' + d.color + '"></div></td><td class="key">' + d.key + '</td><td class="value">' + d.value + '</td></tr>';
                });
                str = str + '</tbody>';
            }
            str = str + '</table>';
            return str;
        });

        //============================================================
        // Chart function
        //------------------------------------------------------------

        function chart(selection) {
            renderWatch.reset();
            renderWatch.models(parallelCoordinates);

            selection.each(function(data) {
                var container = d3.select(this);
                nv.utils.initSVG(container);

                var that = this;

                var availableWidth = nv.utils.availableWidth(width, container, margin),
                    availableHeight = nv.utils.availableHeight(height, container, margin);

                chart.update = function() { container.call(chart); };
                chart.container = this;

                state.setter(stateSetter(dimensionData), chart.update)
                    .getter(stateGetter(dimensionData))
                    .update();

                //set state.disabled
                state.disabled = dimensionData.map(function (d) { return !!d.disabled });

                //Keep dimensions position in memory
                dimensionData = dimensionData.map(function (d) {d.disabled = !!d.disabled; return d});
                dimensionData.forEach(function (d, i) {
                    d.originalPosition = isNaN(d.originalPosition) ? i : d.originalPosition;
                    d.currentPosition = isNaN(d.currentPosition) ? i : d.currentPosition;
                });

               if (!defaultState) {
                    var key;
                    defaultState = {};
                    for(key in state) {
                        if(state[key] instanceof Array)
                            defaultState[key] = state[key].slice(0);
                        else
                            defaultState[key] = state[key];
                    }
                }

                // Display No Data message if there's nothing to show.
                if(!data || !data.length) {
                    nv.utils.noData(chart, container);
                    return chart;
                } else {
                    container.selectAll('.nv-noData').remove();
                }

                //------------------------------------------------------------
                // Setup containers and skeleton of chart

                var wrap = container.selectAll('g.nv-wrap.nv-parallelCoordinatesChart').data([data]);
                var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-parallelCoordinatesChart').append('g');

                var g = wrap.select('g');

                gEnter.append('g').attr('class', 'nv-parallelCoordinatesWrap');
                gEnter.append('g').attr('class', 'nv-legendWrap');

                g.select("rect")
                    .attr("width", availableWidth)
                    .attr("height", (availableHeight > 0) ? availableHeight : 0);

                // Legend
                if (!showLegend) {
                    g.select('.nv-legendWrap').selectAll('*').remove();
                } else {
                    legend.width(availableWidth)
                        .color(function (d) { return "rgb(188,190,192)"; });

                    g.select('.nv-legendWrap')
                        .datum(dimensionData.sort(function (a, b) { return a.originalPosition - b.originalPosition; }))
                        .call(legend);

                    if (!marginTop && legend.height() !== margin.top) {
                        margin.top = legend.height();
                        availableHeight = nv.utils.availableHeight(height, container, margin);
                    }
                    wrap.select('.nv-legendWrap')
                       .attr('transform', 'translate( 0 ,' + (-margin.top) + ')');
                }
                wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

                // Main Chart Component(s)
                parallelCoordinates
                    .width(availableWidth)
                    .height(availableHeight)
                    .dimensionData(dimensionData)
                    .displayBrush(displayBrush);

		        var parallelCoordinatesWrap = g.select('.nv-parallelCoordinatesWrap ')
                  .datum(data);

		        parallelCoordinatesWrap.transition().call(parallelCoordinates);

				//============================================================
                // Event Handling/Dispatching (in chart's scope)
                //------------------------------------------------------------
                //Display reset brush button
		        parallelCoordinates.dispatch.on('brushEnd', function (active, hasActiveBrush) {
		            if (hasActiveBrush) {
		                displayBrush = true;
		                dispatch.brushEnd(active);
		            } else {

		                displayBrush = false;
		            }
		        });

		        legend.dispatch.on('stateChange', function(newState) {
		            for(var key in newState) {
		                state[key] = newState[key];
		            }
		            dispatch.stateChange(state);
		            chart.update();
		        });

                //Update dimensions order and display reset sorting button
		        parallelCoordinates.dispatch.on('dimensionsOrder', function (e) {
		            dimensionData.sort(function (a, b) { return a.currentPosition - b.currentPosition; });
		            var isSorted = false;
		            dimensionData.forEach(function (d, i) {
		                d.currentPosition = i;
		                if (d.currentPosition !== d.originalPosition)
		                    isSorted = true;
		            });
		            dispatch.dimensionsOrder(dimensionData, isSorted);
		        });

				// Update chart from a state object passed to event handler
                dispatch.on('changeState', function (e) {

                    if (typeof e.disabled !== 'undefined') {
                        dimensionData.forEach(function (series, i) {
                            series.disabled = e.disabled[i];
                        });
                        state.disabled = e.disabled;
                    }
                    chart.update();
                });
            });

            renderWatch.renderEnd('parraleleCoordinateChart immediate');
            return chart;
        }

		//============================================================
        // Event Handling/Dispatching (out of chart's scope)
        //------------------------------------------------------------

        parallelCoordinates.dispatch.on('elementMouseover.tooltip', function (evt) {
            var tp = {
                key: evt.label,
                color: evt.color,
                series: []
             }
            if(evt.values){
                Object.keys(evt.values).forEach(function (d) {
                    var dim = evt.dimensions.filter(function (dd) {return dd.key === d;})[0];
                    if(dim){
                        var v;
                        if (isNaN(evt.values[d]) || isNaN(parseFloat(evt.values[d]))) {
                            v = nanValue;
                        } else {
                            v = dim.format(evt.values[d]);
                        }
                        tp.series.push({ idx: dim.currentPosition, key: d, value: v, color: dim.color });
                    }
                });
                tp.series.sort(function(a,b) {return a.idx - b.idx});
             }
            tooltip.data(tp).hidden(false);
        });

        parallelCoordinates.dispatch.on('elementMouseout.tooltip', function(evt) {
            tooltip.hidden(true)
        });

        parallelCoordinates.dispatch.on('elementMousemove.tooltip', function () {
            tooltip();
        });
		 //============================================================
        // Expose Public Variables
        //------------------------------------------------------------

		// expose chart's sub-components
        chart.dispatch = dispatch;
        chart.parallelCoordinates = parallelCoordinates;
        chart.legend = legend;
        chart.tooltip = tooltip;
        chart.options = nv.utils.optionsFunc.bind(chart);

        chart._options = Object.create({}, {
            // simple options, just get/set the necessary values
            width: { get: function () { return width; }, set: function (_) { width = _; } },
            height: { get: function () { return height; }, set: function (_) { height = _; } },
            showLegend: { get: function () { return showLegend; }, set: function (_) { showLegend = _; } },
            defaultState: { get: function () { return defaultState; }, set: function (_) { defaultState = _; } },
            dimensionData: { get: function () { return dimensionData; }, set: function (_) { dimensionData = _; } },
            displayBrush: { get: function () { return displayBrush; }, set: function (_) { displayBrush = _; } },
            noData: { get: function () { return noData; }, set: function (_) { noData = _; } },
            nanValue: { get: function () { return nanValue; }, set: function (_) { nanValue = _; } },

            // options that require extra logic in the setter
            margin: {
                get: function () { return margin; },
                set: function (_) {
                    if (_.top !== undefined) {
                        margin.top = _.top;
                        marginTop = _.top;
                    }
                    margin.right = _.right !== undefined ? _.right : margin.right;
                    margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
                    margin.left = _.left !== undefined ? _.left : margin.left;
                }
            },
            color: {get: function(){return color;}, set: function(_){
                    color = nv.utils.getColor(_);
                    legend.color(color);
                    parallelCoordinates.color(color);
                }}
        });

        nv.utils.inheritOptions(chart, parallelCoordinates);
        nv.utils.initOptions(chart);

        return chart;
    };
nv.models.pie = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 500
        , height = 500
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container = null
        , color = nv.utils.defaultColor()
        , valueFormat = d3.format(',.2f')
        , showLabels = true
        , labelsOutside = false
        , labelType = "key"
        , labelThreshold = .02 //if slice percentage is under this, don't show label
        , hideOverlapLabels = false //Hide labels that don't fit in slice
        , donut = false
        , title = false
        , growOnHover = true
        , titleOffset = 0
        , labelSunbeamLayout = false
        , startAngle = false
        , padAngle = false
        , endAngle = false
        , cornerRadius = 0
        , donutRatio = 0.5
        , duration = 250
        , arcsRadius = []
        , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'elementMousemove', 'renderEnd')
        ;

    var arcs = [];
    var arcsOver = [];

    //============================================================
    // chart function
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right
                , availableHeight = height - margin.top - margin.bottom
                , radius = Math.min(availableWidth, availableHeight) / 2
                , arcsRadiusOuter = []
                , arcsRadiusInner = []
                ;

            container = d3.select(this)
            if (arcsRadius.length === 0) {
                var outer = radius - radius / 10;
                var inner = donutRatio * radius;
                for (var i = 0; i < data[0].length; i++) {
                    arcsRadiusOuter.push(outer);
                    arcsRadiusInner.push(inner);
                }
            } else {
                if(growOnHover){
                    arcsRadiusOuter = arcsRadius.map(function (d) { return (d.outer - d.outer / 10) * radius; });
                    arcsRadiusInner = arcsRadius.map(function (d) { return (d.inner - d.inner / 10) * radius; });
                    donutRatio = d3.min(arcsRadius.map(function (d) { return (d.inner - d.inner / 10); }));
                } else {
                    arcsRadiusOuter = arcsRadius.map(function (d) { return d.outer * radius; });
                    arcsRadiusInner = arcsRadius.map(function (d) { return d.inner * radius; });
                    donutRatio = d3.min(arcsRadius.map(function (d) { return d.inner; }));
                }
            }
            nv.utils.initSVG(container);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('.nv-wrap.nv-pie').data(data);
            var wrapEnter = wrap.enter().append('g').attr('class','nvd3 nv-wrap nv-pie nv-chart-' + id);
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');
            var g_pie = gEnter.append('g').attr('class', 'nv-pie');
            gEnter.append('g').attr('class', 'nv-pieLabels');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            g.select('.nv-pie').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');
            g.select('.nv-pieLabels').attr('transform', 'translate(' + availableWidth / 2 + ',' + availableHeight / 2 + ')');

            //
            container.on('click', function(d,i) {
                dispatch.chartClick({
                    data: d,
                    index: i,
                    pos: d3.event,
                    id: id
                });
            });

            arcs = [];
            arcsOver = [];
            for (var i = 0; i < data[0].length; i++) {

                var arc = d3.svg.arc().outerRadius(arcsRadiusOuter[i]);
                var arcOver = d3.svg.arc().outerRadius(arcsRadiusOuter[i] + 5);

                if (startAngle !== false) {
                    arc.startAngle(startAngle);
                    arcOver.startAngle(startAngle);
                }
                if (endAngle !== false) {
                    arc.endAngle(endAngle);
                    arcOver.endAngle(endAngle);
                }
                if (donut) {
                    arc.innerRadius(arcsRadiusInner[i]);
                    arcOver.innerRadius(arcsRadiusInner[i]);
                }

                if (arc.cornerRadius && cornerRadius) {
                    arc.cornerRadius(cornerRadius);
                    arcOver.cornerRadius(cornerRadius);
                }

                arcs.push(arc);
                arcsOver.push(arcOver);
            }

            // Setup the Pie chart and choose the data element
            var pie = d3.layout.pie()
                .sort(null)
                .value(function(d) { return d.disabled ? 0 : getY(d) });

            // padAngle added in d3 3.5
            if (pie.padAngle && padAngle) {
                pie.padAngle(padAngle);
            }

            // if title is specified and donut, put it in the middle
            if (donut && title) {
                g_pie.append("text").attr('class', 'nv-pie-title');

                wrap.select('.nv-pie-title')
                    .style("text-anchor", "middle")
                    .text(function (d) {
                        return title;
                    })
                    .style("font-size", (Math.min(availableWidth, availableHeight)) * donutRatio * 2 / (title.length + 2) + "px")
                    .attr("dy", "0.35em") // trick to vertically center text
                    .attr('transform', function(d, i) {
                        return 'translate(0, '+ titleOffset + ')';
                    });
            }

            var slices = wrap.select('.nv-pie').selectAll('.nv-slice').data(pie);
            var pieLabels = wrap.select('.nv-pieLabels').selectAll('.nv-label').data(pie);

            slices.exit().remove();
            pieLabels.exit().remove();

            var ae = slices.enter().append('g');
            ae.attr('class', 'nv-slice');
            ae.on('mouseover', function(d, i) {
                d3.select(this).classed('hover', true);
                if (growOnHover) {
                    d3.select(this).select("path").transition()
                        .duration(70)
                        .attr("d", arcsOver[i]);
                }
                dispatch.elementMouseover({
                    data: d.data,
                    index: i,
                    color: d3.select(this).style("fill"),
                    percent: (d.endAngle - d.startAngle) / (2 * Math.PI)
                });
            });
            ae.on('mouseout', function(d, i) {
                d3.select(this).classed('hover', false);
                if (growOnHover) {
                    d3.select(this).select("path").transition()
                        .duration(50)
                        .attr("d", arcs[i]);
                }
                dispatch.elementMouseout({data: d.data, index: i});
            });
            ae.on('mousemove', function(d, i) {
                dispatch.elementMousemove({data: d.data, index: i});
            });
            ae.on('click', function(d, i) {
                var element = this;
                dispatch.elementClick({
                    data: d.data,
                    index: i,
                    color: d3.select(this).style("fill"),
                    event: d3.event,
                    element: element
                });
            });
            ae.on('dblclick', function(d, i) {
                dispatch.elementDblClick({
                    data: d.data,
                    index: i,
                    color: d3.select(this).style("fill")
                });
            });

            slices.attr('fill', function(d,i) { return color(d.data, i); });
            slices.attr('stroke', function(d,i) { return color(d.data, i); });

            var paths = ae.append('path').each(function(d) {
                this._current = d;
            });

            slices.select('path')
                .transition()
                .duration(duration)
                .attr('d', function (d, i) { return arcs[i](d); })
                .attrTween('d', arcTween);

            if (showLabels) {
                // This does the normal label
                var labelsArc = [];
                for (var i = 0; i < data[0].length; i++) {
                    labelsArc.push(arcs[i]);

                    if (labelsOutside) {
                        if (donut) {
                            labelsArc[i] = d3.svg.arc().outerRadius(arcs[i].outerRadius());
                            if (startAngle !== false) labelsArc[i].startAngle(startAngle);
                            if (endAngle !== false) labelsArc[i].endAngle(endAngle);
                        }
                    } else if (!donut) {
                            labelsArc[i].innerRadius(0);
                    }
                }

                pieLabels.enter().append("g").classed("nv-label",true).each(function(d,i) {
                    var group = d3.select(this);

                    group.attr('transform', function (d, i) {
                        if (labelSunbeamLayout) {
                            d.outerRadius = arcsRadiusOuter[i] + 10; // Set Outer Coordinate
                            d.innerRadius = arcsRadiusOuter[i] + 15; // Set Inner Coordinate
                            var rotateAngle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
                            if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
                                rotateAngle -= 90;
                            } else {
                                rotateAngle += 90;
                            }
                            return 'translate(' + labelsArc[i].centroid(d) + ') rotate(' + rotateAngle + ')';
                        } else {
                            d.outerRadius = radius + 10; // Set Outer Coordinate
                            d.innerRadius = radius + 15; // Set Inner Coordinate
                            return 'translate(' + labelsArc[i].centroid(d) + ')'
                        }
                    });

                    group.append('rect')
                        .style('stroke', '#fff')
                        .style('fill', '#fff')
                        .attr("rx", 3)
                        .attr("ry", 3);

                    group.append('text')
                        .style('text-anchor', labelSunbeamLayout ? ((d.startAngle + d.endAngle) / 2 < Math.PI ? 'start' : 'end') : 'middle') //center the text on it's origin or begin/end if orthogonal aligned
                        .style('fill', '#000')
                });

                var labelLocationHash = {};
                var avgHeight = 14;
                var avgWidth = 140;
                var createHashKey = function(coordinates) {
                    return Math.floor(coordinates[0]/avgWidth) * avgWidth + ',' + Math.floor(coordinates[1]/avgHeight) * avgHeight;
                };
                var getSlicePercentage = function(d) {
                    return (d.endAngle - d.startAngle) / (2 * Math.PI);
                };

                pieLabels.watchTransition(renderWatch, 'pie labels').attr('transform', function (d, i) {
                    if (labelSunbeamLayout) {
                        d.outerRadius = arcsRadiusOuter[i] + 10; // Set Outer Coordinate
                        d.innerRadius = arcsRadiusOuter[i] + 15; // Set Inner Coordinate
                        var rotateAngle = (d.startAngle + d.endAngle) / 2 * (180 / Math.PI);
                        if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
                            rotateAngle -= 90;
                        } else {
                            rotateAngle += 90;
                        }
                        return 'translate(' + labelsArc[i].centroid(d) + ') rotate(' + rotateAngle + ')';
                    } else {
                        d.outerRadius = radius + 10; // Set Outer Coordinate
                        d.innerRadius = radius + 15; // Set Inner Coordinate

                        /*
                        Overlapping pie labels are not good. What this attempts to do is, prevent overlapping.
                        Each label location is hashed, and if a hash collision occurs, we assume an overlap.
                        Adjust the label's y-position to remove the overlap.
                        */
                        var center = labelsArc[i].centroid(d);
                        var percent = getSlicePercentage(d);
                        if (d.value && percent >= labelThreshold) {
                            var hashKey = createHashKey(center);
                            if (labelLocationHash[hashKey]) {
                                center[1] -= avgHeight;
                            }
                            labelLocationHash[createHashKey(center)] = true;
                        }
                        return 'translate(' + center + ')'
                    }
                });

                pieLabels.select(".nv-label text")
                    .style('text-anchor', function(d,i) {
                        //center the text on it's origin or begin/end if orthogonal aligned
                        return labelSunbeamLayout ? ((d.startAngle + d.endAngle) / 2 < Math.PI ? 'start' : 'end') : 'middle';
                    })
                    .text(function(d, i) {
                        var percent = getSlicePercentage(d);
                        var label = '';
                        if (!d.value || percent < labelThreshold) return '';

                        if(typeof labelType === 'function') {
                            label = labelType(d, i, {
                                'key': getX(d.data),
                                'value': getY(d.data),
                                'percent': valueFormat(percent)
                            });
                        } else {
                            switch (labelType) {
                                case 'key':
                                    label = getX(d.data);
                                    break;
                                case 'value':
                                    label = valueFormat(getY(d.data));
                                    break;
                                case 'percent':
                                    label = d3.format('%')(percent);
                                    break;
                            }
                        }
                        return label;
                    })
                ;

                if (hideOverlapLabels) {
                    pieLabels
                        .each(function (d, i) {
                            if (!this.getBBox) return;
                            var bb = this.getBBox(),
                            center = labelsArc[i].centroid(d);
                            var topLeft = {
                              x : center[0] + bb.x,
                              y : center[1] + bb.y
                            };

                            var topRight = {
                              x : topLeft.x + bb.width,
                              y : topLeft.y
                            };

                            var bottomLeft = {
                              x : topLeft.x,
                              y : topLeft.y + bb.height
                            };

                            var bottomRight = {
                              x : topLeft.x + bb.width,
                              y : topLeft.y + bb.height
                            };

                            d.visible = nv.utils.pointIsInArc(topLeft, d, arc) &&
                            nv.utils.pointIsInArc(topRight, d, arc) &&
                            nv.utils.pointIsInArc(bottomLeft, d, arc) &&
                            nv.utils.pointIsInArc(bottomRight, d, arc);
                        })
                        .style('display', function (d) {
                            return d.visible ? null : 'none';
                        })
                    ;
                }

            }


            // Computes the angle of an arc, converting from radians to degrees.
            function angle(d) {
                var a = (d.startAngle + d.endAngle) * 90 / Math.PI - 90;
                return a > 90 ? a - 180 : a;
            }

            function arcTween(a, idx) {
                a.endAngle = isNaN(a.endAngle) ? 0 : a.endAngle;
                a.startAngle = isNaN(a.startAngle) ? 0 : a.startAngle;
                if (!donut) a.innerRadius = 0;
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function (t) {
                    return arcs[idx](i(t));
                };
            }
        });

        renderWatch.renderEnd('pie immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        arcsRadius: { get: function () { return arcsRadius; }, set: function (_) { arcsRadius = _; } },
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLabels: {get: function(){return showLabels;}, set: function(_){showLabels=_;}},
        title:      {get: function(){return title;}, set: function(_){title=_;}},
        titleOffset:    {get: function(){return titleOffset;}, set: function(_){titleOffset=_;}},
        labelThreshold: {get: function(){return labelThreshold;}, set: function(_){labelThreshold=_;}},
        hideOverlapLabels: {get: function(){return hideOverlapLabels;}, set: function(_){hideOverlapLabels=_;}},
        valueFormat:    {get: function(){return valueFormat;}, set: function(_){valueFormat=_;}},
        x:          {get: function(){return getX;}, set: function(_){getX=_;}},
        id:         {get: function(){return id;}, set: function(_){id=_;}},
        endAngle:   {get: function(){return endAngle;}, set: function(_){endAngle=_;}},
        startAngle: {get: function(){return startAngle;}, set: function(_){startAngle=_;}},
        padAngle:   {get: function(){return padAngle;}, set: function(_){padAngle=_;}},
        cornerRadius: {get: function(){return cornerRadius;}, set: function(_){cornerRadius=_;}},
        donutRatio:   {get: function(){return donutRatio;}, set: function(_){donutRatio=_;}},
        labelsOutside: {get: function(){return labelsOutside;}, set: function(_){labelsOutside=_;}},
        labelSunbeamLayout: {get: function(){return labelSunbeamLayout;}, set: function(_){labelSunbeamLayout=_;}},
        donut:              {get: function(){return donut;}, set: function(_){donut=_;}},
        growOnHover:        {get: function(){return growOnHover;}, set: function(_){growOnHover=_;}},

        // depreciated after 1.7.1
        pieLabelsOutside: {get: function(){return labelsOutside;}, set: function(_){
            labelsOutside=_;
            nv.deprecated('pieLabelsOutside', 'use labelsOutside instead');
        }},
        // depreciated after 1.7.1
        donutLabelsOutside: {get: function(){return labelsOutside;}, set: function(_){
            labelsOutside=_;
            nv.deprecated('donutLabelsOutside', 'use labelsOutside instead');
        }},
        // deprecated after 1.7.1
        labelFormat: {get: function(){ return valueFormat;}, set: function(_) {
            valueFormat=_;
            nv.deprecated('labelFormat','use valueFormat instead');
        }},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = typeof _.top    != 'undefined' ? _.top    : margin.top;
            margin.right  = typeof _.right  != 'undefined' ? _.right  : margin.right;
            margin.bottom = typeof _.bottom != 'undefined' ? _.bottom : margin.bottom;
            margin.left   = typeof _.left   != 'undefined' ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
        }},
        y: {get: function(){return getY;}, set: function(_){
            getY=d3.functor(_);
        }},
        color: {get: function(){return color;}, set: function(_){
            color=nv.utils.getColor(_);
        }},
        labelType:          {get: function(){return labelType;}, set: function(_){
            labelType= _ || 'key';
        }}
    });

    nv.utils.initOptions(chart);
    return chart;
};
nv.models.pieChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var pie = nv.models.pie();
    var legend = nv.models.legend();
    var tooltip = nv.models.tooltip();

    var margin = {top: 30, right: 20, bottom: 20, left: 20}
        , marginTop = null
        , width = null
        , height = null
        , showTooltipPercent = false
        , showLegend = true
        , legendPosition = "top"
        , color = nv.utils.defaultColor()
        , state = nv.utils.state()
        , defaultState = null
        , noData = null
        , duration = 250
        , dispatch = d3.dispatch('stateChange', 'changeState','renderEnd')
        ;

    tooltip
        .duration(0)
        .headerEnabled(false)
        .valueFormatter(function(d, i) {
            return pie.valueFormat()(d, i);
        });

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled })
            };
        }
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.active !== undefined) {
                data.forEach(function (series, i) {
                    series.disabled = !state.active[i];
                });
            }
        }
    };

    //============================================================
    // Chart function
    //------------------------------------------------------------

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(pie);

        selection.each(function(data) {
            var container = d3.select(this);
            nv.utils.initSVG(container);

            var that = this;
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() { container.transition().call(chart); };
            chart.container = this;

            state.setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            //set state.disabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display No Data message if there's nothing to show.
            if (!data || !data.length) {
                nv.utils.noData(chart, container);
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-pieChart').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-pieChart').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-pieWrap');
            gEnter.append('g').attr('class', 'nv-legendWrap');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                if (legendPosition === "top") {
                    legend.width( availableWidth ).key(pie.x());

                    wrap.select('.nv-legendWrap')
                        .datum(data)
                        .call(legend);

                    if (!marginTop && legend.height() !== margin.top) {
                        margin.top = legend.height();
                        availableHeight = nv.utils.availableHeight(height, container, margin);
                    }

                    wrap.select('.nv-legendWrap')
                        .attr('transform', 'translate(0,' + (-margin.top) +')');
                } else if (legendPosition === "right") {
                    var legendWidth = nv.models.legend().width();
                    if (availableWidth / 2 < legendWidth) {
                        legendWidth = (availableWidth / 2)
                    }
                    legend.height(availableHeight).key(pie.x());
                    legend.width(legendWidth);
                    availableWidth -= legend.width();

                    wrap.select('.nv-legendWrap')
                        .datum(data)
                        .call(legend)
                        .attr('transform', 'translate(' + (availableWidth) +',0)');
                } else if (legendPosition === "bottom") {
                    legend.width( availableWidth ).key(pie.x());
                    wrap.select('.nv-legendWrap')
                        .datum(data)
                        .call(legend);

                    margin.bottom = legend.height();
                    availableHeight = nv.utils.availableHeight(height, container, margin);
                    wrap.select('.nv-legendWrap')
                        .attr('transform', 'translate(0,' + availableHeight +')');
                }
            }
            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // Main Chart Component(s)
            pie.width(availableWidth).height(availableHeight);
            var pieWrap = g.select('.nv-pieWrap').datum([data]);
            d3.transition(pieWrap).call(pie);

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState) {
                    state[key] = newState[key];
                }
                dispatch.stateChange(state);
                chart.update();
            });

            // Update chart from a state object passed to event handler
            dispatch.on('changeState', function(e) {
                if (typeof e.disabled !== 'undefined') {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });
                    state.disabled = e.disabled;
                }
                chart.update();
            });
        });

        renderWatch.renderEnd('pieChart immediate');
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    pie.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt['series'] = {
            key: chart.x()(evt.data),
            value: chart.y()(evt.data),
            color: evt.color,
            percent: evt.percent
        };
        if (!showTooltipPercent) {
            delete evt.percent;
            delete evt.series.percent;
        }
        tooltip.data(evt).hidden(false);
    });

    pie.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    pie.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.legend = legend;
    chart.dispatch = dispatch;
    chart.pie = pie;
    chart.tooltip = tooltip;
    chart.options = nv.utils.optionsFunc.bind(chart);

    // use Object get/set functionality to map between vars and chart functions
    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:              {get: function(){return width;},                set: function(_){width=_;}},
        height:             {get: function(){return height;},               set: function(_){height=_;}},
        noData:             {get: function(){return noData;},               set: function(_){noData=_;}},
        showTooltipPercent: {get: function(){return showTooltipPercent;},   set: function(_){showTooltipPercent=_;}},
        showLegend:         {get: function(){return showLegend;},           set: function(_){showLegend=_;}},
        legendPosition:     {get: function(){return legendPosition;},       set: function(_){legendPosition=_;}},
        defaultState:       {get: function(){return defaultState;},         set: function(_){defaultState=_;}},

        // options that require extra logic in the setter
        color: {get: function(){return color;}, set: function(_){
            color = _;
            legend.color(color);
            pie.color(color);
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            pie.duration(duration);
        }},
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }}
    });
    nv.utils.inheritOptions(chart, pie);
    nv.utils.initOptions(chart);
    return chart;
};
nv.models.sankey = function() {
    'use strict';

    // Sources:
    // - https://bost.ocks.org/mike/sankey/
    // - https://github.com/soxofaan/d3-plugin-captain-sankey

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var sankey = {},
        nodeWidth = 24,
        nodePadding = 8,
        size = [1, 1],
        nodes = [],
        links = [],
        sinksRight = true;

    var layout = function(iterations) {
        computeNodeLinks();
        computeNodeValues();
        computeNodeBreadths();
        computeNodeDepths(iterations);
    };

    var relayout = function() {
        computeLinkDepths();
    };

    // SVG path data generator, to be used as 'd' attribute on 'path' element selection.
    var link = function() {
        var curvature = .5;

        function link(d) {

            var x0 = d.source.x + d.source.dx,
                x1 = d.target.x,
                xi = d3.interpolateNumber(x0, x1),
                x2 = xi(curvature),
                x3 = xi(1 - curvature),
                y0 = d.source.y + d.sy + d.dy / 2,
                y1 = d.target.y + d.ty + d.dy / 2;
            var linkPath = 'M' + x0 + ',' + y0
                + 'C' + x2 + ',' + y0
                + ' ' + x3 + ',' + y1
                + ' ' + x1 + ',' + y1;
            return linkPath;
        }

        link.curvature = function(_) {
            if (!arguments.length) return curvature;
            curvature = +_;
            return link;
        };

        return link;
    };

    // Y-position of the middle of a node.
    var center = function(node) {
        return node.y + node.dy / 2;
    };

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    // Populate the sourceLinks and targetLinks for each node.
    // Also, if the source and target are not objects, assume they are indices.
    function computeNodeLinks() {
        nodes.forEach(function(node) {
            // Links that have this node as source.
            node.sourceLinks = [];
            // Links that have this node as target.
            node.targetLinks = [];
        });
        links.forEach(function(link) {
            var source = link.source,
                target = link.target;
            if (typeof source === 'number') source = link.source = nodes[link.source];
            if (typeof target === 'number') target = link.target = nodes[link.target];
            source.sourceLinks.push(link);
            target.targetLinks.push(link);
        });
    }

    // Compute the value (size) of each node by summing the associated links.
    function computeNodeValues() {
        nodes.forEach(function(node) {
            node.value = Math.max(
                d3.sum(node.sourceLinks, value),
                d3.sum(node.targetLinks, value)
            );
        });
    }

    // Iteratively assign the breadth (x-position) for each node.
    // Nodes are assigned the maximum breadth of incoming neighbors plus one;
    // nodes with no incoming links are assigned breadth zero, while
    // nodes with no outgoing links are assigned the maximum breadth.
    function computeNodeBreadths() {
        //
        var remainingNodes = nodes,
            nextNodes,
            x = 0;

        // Work from left to right.
        // Keep updating the breath (x-position) of nodes that are target of recently updated nodes.
        //
        while (remainingNodes.length && x < nodes.length) {
            nextNodes = [];
            remainingNodes.forEach(function(node) {
                node.x = x;
                node.dx = nodeWidth;
                node.sourceLinks.forEach(function(link) {
                    if (nextNodes.indexOf(link.target) < 0) {
                        nextNodes.push(link.target);
                    }
                });
            });
            remainingNodes = nextNodes;
            ++x;
            //
        }

        // Optionally move pure sinks always to the right.
        if (sinksRight) {
            moveSinksRight(x);
        }

        scaleNodeBreadths((size[0] - nodeWidth) / (x - 1));
    }

    function moveSourcesRight() {
        nodes.forEach(function(node) {
            if (!node.targetLinks.length) {
                node.x = d3.min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
            }
        });
    }

    function moveSinksRight(x) {
        nodes.forEach(function(node) {
            if (!node.sourceLinks.length) {
                node.x = x - 1;
            }
        });
    }

    function scaleNodeBreadths(kx) {
        nodes.forEach(function(node) {
            node.x *= kx;
        });
    }

    // Compute the depth (y-position) for each node.
    function computeNodeDepths(iterations) {
        // Group nodes by breath.
        var nodesByBreadth = d3.nest()
            .key(function(d) { return d.x; })
            .sortKeys(d3.ascending)
            .entries(nodes)
            .map(function(d) { return d.values; });

        //
        initializeNodeDepth();
        resolveCollisions();
        computeLinkDepths();
        for (var alpha = 1; iterations > 0; --iterations) {
            relaxRightToLeft(alpha *= .99);
            resolveCollisions();
            computeLinkDepths();
            relaxLeftToRight(alpha);
            resolveCollisions();
            computeLinkDepths();
        }

        function initializeNodeDepth() {
            // Calculate vertical scaling factor.
            var ky = d3.min(nodesByBreadth, function(nodes) {
                return (size[1] - (nodes.length - 1) * nodePadding) / d3.sum(nodes, value);
            });

            nodesByBreadth.forEach(function(nodes) {
                nodes.forEach(function(node, i) {
                    node.y = i;
                    node.dy = node.value * ky;
                });
            });

            links.forEach(function(link) {
                link.dy = link.value * ky;
            });
        }

        function relaxLeftToRight(alpha) {
            nodesByBreadth.forEach(function(nodes, breadth) {
                nodes.forEach(function(node) {
                    if (node.targetLinks.length) {
                        // Value-weighted average of the y-position of source node centers linked to this node.
                        var y = d3.sum(node.targetLinks, weightedSource) / d3.sum(node.targetLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedSource(link) {
                return (link.source.y + link.sy + link.dy / 2) * link.value;
            }
        }

        function relaxRightToLeft(alpha) {
            nodesByBreadth.slice().reverse().forEach(function(nodes) {
                nodes.forEach(function(node) {
                    if (node.sourceLinks.length) {
                        // Value-weighted average of the y-positions of target nodes linked to this node.
                        var y = d3.sum(node.sourceLinks, weightedTarget) / d3.sum(node.sourceLinks, value);
                        node.y += (y - center(node)) * alpha;
                    }
                });
            });

            function weightedTarget(link) {
                return (link.target.y + link.ty + link.dy / 2) * link.value;
            }
        }

        function resolveCollisions() {
            nodesByBreadth.forEach(function(nodes) {
                var node,
                    dy,
                    y0 = 0,
                    n = nodes.length,
                    i;

                // Push any overlapping nodes down.
                nodes.sort(ascendingDepth);
                for (i = 0; i < n; ++i) {
                    node = nodes[i];
                    dy = y0 - node.y;
                    if (dy > 0) node.y += dy;
                    y0 = node.y + node.dy + nodePadding;
                }

                // If the bottommost node goes outside the bounds, push it back up.
                dy = y0 - nodePadding - size[1];
                if (dy > 0) {
                    y0 = node.y -= dy;

                    // Push any overlapping nodes back up.
                    for (i = n - 2; i >= 0; --i) {
                        node = nodes[i];
                        dy = node.y + node.dy + nodePadding - y0;
                        if (dy > 0) node.y -= dy;
                        y0 = node.y;
                    }
                }
            });
        }

        function ascendingDepth(a, b) {
            return a.y - b.y;
        }
    }

    // Compute y-offset of the source endpoint (sy) and target endpoints (ty) of links,
    // relative to the source/target node's y-position.
    function computeLinkDepths() {
        nodes.forEach(function(node) {
            node.sourceLinks.sort(ascendingTargetDepth);
            node.targetLinks.sort(ascendingSourceDepth);
        });
        nodes.forEach(function(node) {
            var sy = 0, ty = 0;
            node.sourceLinks.forEach(function(link) {
                link.sy = sy;
                sy += link.dy;
            });
            node.targetLinks.forEach(function(link) {
                link.ty = ty;
                ty += link.dy;
            });
        });

        function ascendingSourceDepth(a, b) {
            return a.source.y - b.source.y;
        }

        function ascendingTargetDepth(a, b) {
            return a.target.y - b.target.y;
        }
    }

    // Value property accessor.
    function value(x) {
        return x.value;
    }

    sankey.options = nv.utils.optionsFunc.bind(sankey);
    sankey._options = Object.create({}, {
        nodeWidth:    {get: function(){return nodeWidth;},   set: function(_){nodeWidth=+_;}},
        nodePadding:  {get: function(){return nodePadding;}, set: function(_){nodePadding=_;}},
        nodes:        {get: function(){return nodes;},       set: function(_){nodes=_;}},
        links:        {get: function(){return links ;},      set: function(_){links=_;}},
        size:         {get: function(){return size;},        set: function(_){size=_;}},
        sinksRight:   {get: function(){return sinksRight;},  set: function(_){sinksRight=_;}},

        layout:       {get: function(){layout(32);},         set: function(_){layout(_);}},
        relayout:     {get: function(){relayout();},         set: function(_){}},
        center:       {get: function(){return center();},    set: function(_){
            if(typeof _ === 'function'){
                center=_;
            }
        }},
        link:         {get: function(){return link();},      set: function(_){
            if(typeof _ === 'function'){
                link=_;
            }
            return link();
        }}
    });

    nv.utils.initOptions(sankey);

    return sankey;
};
nv.models.sankeyChart = function() {
    "use strict";

    // Sources:
    // - https://bost.ocks.org/mike/sankey/
    // - https://github.com/soxofaan/d3-plugin-captain-sankey

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 5, right: 0, bottom: 5, left: 0}
        , sankey = nv.models.sankey()
        , width = 600
        , height = 400
        , nodeWidth = 36
        , nodePadding =  40
        , units = 'units'
        , center = undefined
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var formatNumber = d3.format(',.0f');    // zero decimal places
    var format = function(d) {
        return formatNumber(d) + ' ' + units;
    };
    var color = d3.scale.category20();
    var linkTitle = function(d){
        return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
    };
    var nodeFillColor = function(d){
        return d.color = color(d.name.replace(/ .*/, ''));
    };
    var nodeStrokeColor = function(d){
        return d3.rgb(d.color).darker(2);
    };
    var nodeTitle = function(d){
        return d.name + '\n' + format(d.value);
    };

    var showError = function(element, message) {
        element.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('class', 'nvd3-sankey-chart-error')
            .attr('text-anchor', 'middle')
            .text(message);
    };

    function chart(selection) {
        selection.each(function(data) {

            var testData = {
                nodes:
                    [
                        {'node': 1, 'name': 'Test 1'},
                        {'node': 2, 'name': 'Test 2'},
                        {'node': 3, 'name': 'Test 3'},
                        {'node': 4, 'name': 'Test 4'},
                        {'node': 5, 'name': 'Test 5'},
                        {'node': 6, 'name': 'Test 6'}
                    ],
                links:
                    [
                        {'source': 0, 'target': 1, 'value': 2295},
                        {'source': 0, 'target': 5, 'value': 1199},
                        {'source': 1, 'target': 2, 'value': 1119},
                        {'source': 1, 'target': 5, 'value': 1176},
                        {'source': 2, 'target': 3, 'value': 487},
                        {'source': 2, 'target': 5, 'value': 632},
                        {'source': 3, 'target': 4, 'value': 301},
                        {'source': 3, 'target': 5, 'value': 186}
                    ]
            };

            // Error handling
            var isDataValid = false;
            var dataAvailable = false;

            // check if data is valid
            if(
                (typeof data['nodes'] === 'object' && data['nodes'].length) >= 0 &&
                (typeof data['links'] === 'object' && data['links'].length) >= 0
            ){
                isDataValid = true;
            }

            // check if data is available
            if(
                data['nodes'] && data['nodes'].length > 0 &&
                data['links'] && data['links'].length > 0
            ) {
                dataAvailable = true;
            }

            // show error
            if(!isDataValid) {
                console.error('NVD3 Sankey chart error:', 'invalid data format for', data);
                console.info('Valid data format is: ', testData, JSON.stringify(testData));
                showError(selection, 'Error loading chart, data is invalid');
                return false;
            }

            // TODO use nv.utils.noData
            if(!dataAvailable) {
                showError(selection, 'No data available');
                return false;
            }

            // No errors, continue

            // append the svg canvas to the page
            var svg = selection.append('svg')
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('class', 'nvd3 nv-wrap nv-sankeyChart');

            // Set the sankey diagram properties
            sankey
                .nodeWidth(nodeWidth)
                .nodePadding(nodePadding)
                .size([width, height]);

            var path = sankey.link();

            sankey
                .nodes(data.nodes)
                .links(data.links)
                .layout(32)
                .center(center);

            // add in the links
            var link = svg.append('g').selectAll('.link')
                .data(data.links)
                .enter().append('path')
                .attr('class', 'link')
                .attr('d', path)
                .style('stroke-width', function(d) { return Math.max(1, d.dy); })
            .sort(function(a,b) { return b.dy - a.dy; });

            // add the link titles
            link.append('title')
                .text(linkTitle);

            // add in the nodes
            var node = svg.append('g').selectAll('.node')
                .data(data.nodes)
                .enter().append('g')
                .attr('class', 'node')
                .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; })
                .call(
                    d3.behavior
                        .drag()
                        .origin(function(d) { return d; })
                        .on('dragstart', function() {
                            this.parentNode.appendChild(this);
                        })
                        .on('drag', dragmove)
                );

            // add the rectangles for the nodes
            node.append('rect')
                .attr('height', function(d) { return d.dy; })
                .attr('width', sankey.nodeWidth())
                .style('fill', nodeFillColor)
                .style('stroke', nodeStrokeColor)
                .append('title')
                .text(nodeTitle);

            // add in the title for the nodes
            node.append('text')
                .attr('x', -6)
                .attr('y', function(d) { return d.dy / 2; })
                .attr('dy', '.35em')
                .attr('text-anchor', 'end')
                .attr('transform', null)
                .text(function(d) { return d.name; })
                .filter(function(d) { return d.x < width / 2; })
                .attr('x', 6 + sankey.nodeWidth())
                .attr('text-anchor', 'start');

            // the function for moving the nodes
            function dragmove(d) {
                d3.select(this).attr('transform',
                'translate(' + d.x + ',' + (
                    d.y = Math.max(0, Math.min(height - d.dy, d3.event.y))
                ) + ')');
                sankey.relayout();
                link.attr('d', path);
            }
        });

        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        units:           {get: function(){return units;},       set: function(_){units=_;}},
        width:           {get: function(){return width;},       set: function(_){width=_;}},
        height:          {get: function(){return height;},      set: function(_){height=_;}},
        format:          {get: function(){return format;},      set: function(_){format=_;}},
        linkTitle:       {get: function(){return linkTitle;},   set: function(_){linkTitle=_;}},
        nodeWidth:       {get: function(){return nodeWidth;},   set: function(_){nodeWidth=_;}},
        nodePadding:     {get: function(){return nodePadding;}, set: function(_){nodePadding=_;}},
        center:          {get: function(){return center},       set: function(_){center=_}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        nodeStyle: {get: function(){return {};}, set: function(_){
            nodeFillColor   = _.fillColor   !== undefined ? _.fillColor   : nodeFillColor;
            nodeStrokeColor = _.strokeColor !== undefined ? _.strokeColor : nodeStrokeColor;
            nodeTitle       = _.title       !== undefined ? _.title       : nodeTitle;
        }}

    });

    nv.utils.initOptions(chart);

    return chart;
};

nv.models.scatter = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin       = {top: 0, right: 0, bottom: 0, left: 0}
        , width        = null
        , height       = null
        , color        = nv.utils.defaultColor() // chooses color
        , pointBorderColor = null
        , id           = Math.floor(Math.random() * 100000) //Create semi-unique ID incase user doesn't select one
        , container    = null
        , x            = d3.scale.linear()
        , y            = d3.scale.linear()
        , z            = d3.scale.linear() //linear because d3.svg.shape.size is treated as area
        , getX         = function(d) { return d.x } // accessor to get the x value
        , getY         = function(d) { return d.y } // accessor to get the y value
        , getSize      = function(d) { return d.size || 1} // accessor to get the point size
        , getShape     = function(d) { return d.shape || 'circle' } // accessor to get point shape
        , forceX       = [] // List of numbers to Force into the X scale (ie. 0, or a max / min, etc.)
        , forceY       = [] // List of numbers to Force into the Y scale
        , forceSize    = [] // List of numbers to Force into the Size scale
        , interactive  = true // If true, plots a voronoi overlay for advanced point intersection
        , pointActive  = function(d) { return !d.notActive } // any points that return false will be filtered out
        , padData      = false // If true, adds half a data points width to front and back, for lining up a line chart with a bar chart
        , padDataOuter = .1 //outerPadding to imitate ordinal scale outer padding
        , clipEdge     = false // if true, masks points within x and y scale
        , clipVoronoi  = true // if true, masks each point with a circle... can turn off to slightly increase performance
        , showVoronoi  = false // display the voronoi areas
        , clipRadius   = function() { return 25 } // function to get the radius for voronoi point clips
        , xDomain      = null // Override x domain (skips the calculation from data)
        , yDomain      = null // Override y domain
        , xRange       = null // Override x range
        , yRange       = null // Override y range
        , sizeDomain   = null // Override point size domain
        , sizeRange    = null
        , singlePoint  = false
        , dispatch     = d3.dispatch('elementClick', 'elementDblClick', 'elementMouseover', 'elementMouseout', 'renderEnd')
        , useVoronoi   = true
        , duration     = 250
        , interactiveUpdateDelay = 300
        , showLabels    = false
        ;


    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var x0, y0, z0 // used to store previous scales
        , xDom, yDom // used to store previous domains
        , width0
        , height0
        , timeoutID
        , needsUpdate = false // Flag for when the points are visually updating, but the interactive layer is behind, to disable tooltips
        , renderWatch = nv.utils.renderWatch(dispatch, duration)
        , _sizeRange_def = [16, 256]
        , _cache = {}
        ;

    //============================================================
    // Diff and Cache Utilities
    //------------------------------------------------------------
    // getDiffs is used to filter unchanged points from the update
    // selection. It implicitly updates it's cache when called and
    // therefor the diff is based upon the previous invocation NOT
    // the previous update.
    //
    // getDiffs takes a point as its first argument followed by n
    // key getter pairs (d, [key, get... key, get]) this approach
    // was chosen for efficiency. (The filter will call it a LOT).
    //
    // It is important to call delCache on point exit to prevent a
    // memory leak. It is also needed to prevent invalid caches if
    // a new point uses the same series and point id key.
    //
    // Argument Performance Concerns:
    // - Object property lists for key getter pairs would be very
    // expensive (points * objects for the GC every update).
    // - ES6 function names for implicit keys would be nice but
    // they are not guaranteed to be unique.
    // - function.toString to obtain implicit keys is possible
    // but long object keys are not free (internal hash).
    // - Explicit key without objects are the most efficient.

    function getCache(d) {
        var key, val;
        key = d[0].series + ':' + d[1];
        val = _cache[key] = _cache[key] || {};
        return val;
    }

    function delCache(d) {
        var key, val;
        key = d[0].series + ':' + d[1];
        delete _cache[key];
    }

    function getDiffs(d) {
        var i, key, val,
            cache = getCache(d),
            diffs = false;
        for (i = 1; i < arguments.length; i += 2) {
            key = arguments[i];
            val = arguments[i + 1](d[0], d[1]);
            if (cache[key] !== val || !cache.hasOwnProperty(key)) {
                cache[key] = val;
                diffs = true;
            }
        }
        return diffs;
    }

    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            container = d3.select(this);
            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            nv.utils.initSVG(container);

            //add series index to each data point for reference
            data.forEach(function(series, i) {
                series.values.forEach(function(point) {
                    point.series = i;
                });
            });

            // Setup Scales
            var logScale = (typeof(chart.yScale().base) === "function"); // Only log scale has a method "base()"
            // remap and flatten the data for use in calculating the scales' domains
            var seriesData = (xDomain && yDomain && sizeDomain) ? [] : // if we know xDomain and yDomain and sizeDomain, no need to calculate.... if Size is constant remember to set sizeDomain to speed up performance
                d3.merge(
                    data.map(function(d) {
                        return d.values.map(function(d,i) {
                            return { x: getX(d,i), y: getY(d,i), size: getSize(d,i) }
                        })
                    })
                );

            x   .domain(xDomain || d3.extent(seriesData.map(function(d) { return d.x; }).concat(forceX)))

            if (padData && data[0])
                x.range(xRange || [(availableWidth * padDataOuter +  availableWidth) / (2 *data[0].values.length), availableWidth - availableWidth * (1 + padDataOuter) / (2 * data[0].values.length)  ]);
            //x.range([availableWidth * .5 / data[0].values.length, availableWidth * (data[0].values.length - .5)  / data[0].values.length ]);
            else
                x.range(xRange || [0, availableWidth]);

             if (logScale) {
                    var min = d3.min(seriesData.map(function(d) { if (d.y !== 0) return d.y; }));
                    y.clamp(true)
                        .domain(yDomain || d3.extent(seriesData.map(function(d) {
                            if (d.y !== 0) return d.y;
                            else return min * 0.1;
                        }).concat(forceY)))
                        .range(yRange || [availableHeight, 0]);
                } else {
                        y.domain(yDomain || d3.extent(seriesData.map(function (d) { return d.y;}).concat(forceY)))
                        .range(yRange || [availableHeight, 0]);
                }

            z   .domain(sizeDomain || d3.extent(seriesData.map(function(d) { return d.size }).concat(forceSize)))
                .range(sizeRange || _sizeRange_def);

            // If scale's domain don't have a range, slightly adjust to make one... so a chart can show a single data point
            singlePoint = x.domain()[0] === x.domain()[1] || y.domain()[0] === y.domain()[1];

            if (x.domain()[0] === x.domain()[1])
                x.domain()[0] ?
                    x.domain([x.domain()[0] - x.domain()[0] * 0.01, x.domain()[1] + x.domain()[1] * 0.01])
                    : x.domain([-1,1]);

            if (y.domain()[0] === y.domain()[1])
                y.domain()[0] ?
                    y.domain([y.domain()[0] - y.domain()[0] * 0.01, y.domain()[1] + y.domain()[1] * 0.01])
                    : y.domain([-1,1]);

            if ( isNaN(x.domain()[0])) {
                x.domain([-1,1]);
            }

            if ( isNaN(y.domain()[0])) {
                y.domain([-1,1]);
            }

            x0 = x0 || x;
            y0 = y0 || y;
            z0 = z0 || z;

            var scaleDiff = x(1) !== x0(1) || y(1) !== y0(1) || z(1) !== z0(1);

            width0 = width0 || width;
            height0 = height0 || height;

            var sizeDiff = width0 !== width || height0 !== height;

            // Domain Diffs

            xDom = xDom || [];
            var domainDiff = xDom[0] !== x.domain()[0] || xDom[1] !== x.domain()[1];
            xDom = x.domain();

            yDom = yDom || [];
            domainDiff = domainDiff || yDom[0] !== y.domain()[0] || yDom[1] !== y.domain()[1];
            yDom = y.domain();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-scatter').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatter nv-chart-' + id);
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            wrap.classed('nv-single-point', singlePoint);
            gEnter.append('g').attr('class', 'nv-groups');
            gEnter.append('g').attr('class', 'nv-point-paths');
            wrapEnter.append('g').attr('class', 'nv-point-clips');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            defsEnter.append('clipPath')
                .attr('id', 'nv-edge-clip-' + id)
                .append('rect')
                .attr('transform', 'translate( -10, -10)');

            wrap.select('#nv-edge-clip-' + id + ' rect')
                .attr('width', availableWidth + 20)
                .attr('height', (availableHeight > 0) ? availableHeight + 20 : 0);

            g.attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');

            function updateInteractiveLayer() {
                // Always clear needs-update flag regardless of whether or not
                // we will actually do anything (avoids needless invocations).
                needsUpdate = false;

                if (!interactive) return false;

                // inject series and point index for reference into voronoi
                if (useVoronoi === true) {

                    // nuke all voronoi paths on reload and recreate them
                    wrap.select('.nv-point-paths').selectAll('path').remove();

                    var vertices = d3.merge(data.map(function(group, groupIndex) {
                            return group.values
                                .map(function(point, pointIndex) {
                                    // *Adding noise to make duplicates very unlikely
                                    // *Injecting series and point index for reference
                                    // *Adding a 'jitter' to the points, because there's an issue in d3.geom.voronoi.
                                    var pX = getX(point,pointIndex);
                                    var pY = getY(point,pointIndex);

                                    return [nv.utils.NaNtoZero(x(pX)) + Math.random() * 1e-4,
                                            nv.utils.NaNtoZero(y(pY)) + Math.random() * 1e-4,
                                        groupIndex,
                                        pointIndex, point];
                                })
                                .filter(function(pointArray, pointIndex) {
                                    return pointActive(pointArray[4], pointIndex); // Issue #237.. move filter to after map, so pointIndex is correct!
                                })
                        })
                    );

                    if (vertices.length == 0) return false;  // No active points, we're done
                    if (vertices.length < 3) {
                        // Issue #283 - Adding 2 dummy points to the voronoi b/c voronoi requires min 3 points to work
                        vertices.push([x.range()[0] - 20, y.range()[0] - 20, null, null]);
                        vertices.push([x.range()[1] + 20, y.range()[1] + 20, null, null]);
                        vertices.push([x.range()[0] - 20, y.range()[0] + 20, null, null]);
                        vertices.push([x.range()[1] + 20, y.range()[1] - 20, null, null]);
                    }

                    // keep voronoi sections from going more than 10 outside of graph
                    // to avoid overlap with other things like legend etc
                    var bounds = d3.geom.polygon([
                        [-10,-10],
                        [-10,height + 10],
                        [width + 10,height + 10],
                        [width + 10,-10]
                    ]);

                    // delete duplicates from vertices - essential assumption for d3.geom.voronoi
                    var epsilon = 1e-4; // Uses 1e-4 to determine equivalence.
                    vertices = vertices.sort(function(a,b){return ((a[0] - b[0]) || (a[1] - b[1]))});
                    for (var i = 0; i < vertices.length - 1; ) {
                        if ((Math.abs(vertices[i][0] - vertices[i+1][0]) < epsilon) &&
                        (Math.abs(vertices[i][1] - vertices[i+1][1]) < epsilon)) {
                            vertices.splice(i+1, 1);
                        } else {
                            i++;
                        }
                    }

                    var voronoi = d3.geom.voronoi(vertices).map(function(d, i) {
                        return {
                            'data': bounds.clip(d),
                            'series': vertices[i][2],
                            'point': vertices[i][3]
                        }
                    });

                    var pointPaths = wrap.select('.nv-point-paths').selectAll('path').data(voronoi);
                    var vPointPaths = pointPaths
                        .enter().append("svg:path")
                        .attr("d", function(d) {
                            if (!d || !d.data || d.data.length === 0)
                                return 'M 0 0';
                            else
                                return "M" + d.data.join(",") + "Z";
                        })
                        .attr("id", function(d,i) {
                            return "nv-path-"+i; })
                        .attr("clip-path", function(d,i) { return "url(#nv-clip-"+id+"-"+i+")"; })
                        ;

                    // good for debugging point hover issues
                    if (showVoronoi) {
                        vPointPaths.style("fill", d3.rgb(230, 230, 230))
                            .style('fill-opacity', 0.4)
                            .style('stroke-opacity', 1)
                            .style("stroke", d3.rgb(200,200,200));
                    }

                    if (clipVoronoi) {
                        // voronoi sections are already set to clip,
                        // just create the circles with the IDs they expect
                        wrap.select('.nv-point-clips').selectAll('*').remove(); // must do * since it has sub-dom
                        var pointClips = wrap.select('.nv-point-clips').selectAll('clipPath').data(vertices);
                        var vPointClips = pointClips
                            .enter().append("svg:clipPath")
                            .attr("id", function(d, i) { return "nv-clip-"+id+"-"+i;})
                            .append("svg:circle")
                            .attr('cx', function(d) { return d[0]; })
                            .attr('cy', function(d) { return d[1]; })
                            .attr('r', clipRadius);
                    }

                    var mouseEventCallback = function(el, d, mDispatch) {
                        if (needsUpdate) return 0;
                        var series = data[d.series];
                        if (series === undefined) return;
                        var point  = series.values[d.point];
                        point['color'] = color(series, d.series);

                        // standardize attributes for tooltip.
                        point['x'] = getX(point);
                        point['y'] = getY(point);

                        // can't just get box of event node since it's actually a voronoi polygon
                        var box = container.node().getBoundingClientRect();
                        var scrollTop  = window.pageYOffset || document.documentElement.scrollTop;
                        var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

                        var pos = {
                            left: x(getX(point, d.point)) + box.left + scrollLeft + margin.left + 10,
                            top: y(getY(point, d.point)) + box.top + scrollTop + margin.top + 10
                        };

                        mDispatch({
                            point: point,
                            series: series,
                            pos: pos,
                            relativePos: [x(getX(point, d.point)) + margin.left, y(getY(point, d.point)) + margin.top],
                            seriesIndex: d.series,
                            pointIndex: d.point,
                            event: d3.event,
                            element: el
                        });
                    };

                    pointPaths
                        .on('click', function(d) {
                            mouseEventCallback(this, d, dispatch.elementClick);
                        })
                        .on('dblclick', function(d) {
                            mouseEventCallback(this, d, dispatch.elementDblClick);
                        })
                        .on('mouseover', function(d) {
                            mouseEventCallback(this, d, dispatch.elementMouseover);
                        })
                        .on('mouseout', function(d, i) {
                            mouseEventCallback(this, d, dispatch.elementMouseout);
                        });

                } else {
                    // add event handlers to points instead voronoi paths
                    wrap.select('.nv-groups').selectAll('.nv-group')
                        .selectAll('.nv-point')
                        //.data(dataWithPoints)
                        //.style('pointer-events', 'auto') // recativate events, disabled by css
                        .on('click', function(d,i) {
                            //nv.log('test', d, i);
                            if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                            var series = data[d.series],
                                point  = series.values[i];
                            var element = this;
                            dispatch.elementClick({
                                point: point,
                                series: series,
                                pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top], //TODO: make this pos base on the page
                                relativePos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                                seriesIndex: d.series,
                                pointIndex: i,
                                event: d3.event,
                                element: element
                            });
                        })
                        .on('dblclick', function(d,i) {
                            if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                            var series = data[d.series],
                                point  = series.values[i];

                            dispatch.elementDblClick({
                                point: point,
                                series: series,
                                pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],//TODO: make this pos base on the page
                                relativePos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                                seriesIndex: d.series,
                                pointIndex: i
                            });
                        })
                        .on('mouseover', function(d,i) {
                            if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                            var series = data[d.series],
                                point  = series.values[i];

                            dispatch.elementMouseover({
                                point: point,
                                series: series,
                                pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],//TODO: make this pos base on the page
                                relativePos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                                seriesIndex: d.series,
                                pointIndex: i,
                                color: color(d, i)
                            });
                        })
                        .on('mouseout', function(d,i) {
                            if (needsUpdate || !data[d.series]) return 0; //check if this is a dummy point
                            var series = data[d.series],
                                point  = series.values[i];

                            dispatch.elementMouseout({
                                point: point,
                                series: series,
                                pos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],//TODO: make this pos base on the page
                                relativePos: [x(getX(point, i)) + margin.left, y(getY(point, i)) + margin.top],
                                seriesIndex: d.series,
                                pointIndex: i,
                                color: color(d, i)
                            });
                        });
                }
            }

            needsUpdate = true;
            var groups = wrap.select('.nv-groups').selectAll('.nv-group')
                .data(function(d) { return d }, function(d) { return d.key });
            groups.enter().append('g')
                .style('stroke-opacity', 1e-6)
                .style('fill-opacity', 1e-6);
            groups.exit()
                .remove();
            groups
                .attr('class', function(d,i) {
                    return (d.classed || '') + ' nv-group nv-series-' + i;
                })
                .classed('nv-noninteractive', !interactive)
                .classed('hover', function(d) { return d.hover });
            groups.watchTransition(renderWatch, 'scatter: groups')
                .style('fill', function(d,i) { return color(d, i) })
                .style('stroke', function(d,i) { return d.pointBorderColor || pointBorderColor || color(d, i) })
                .style('stroke-opacity', 1)
                .style('fill-opacity', .5);

            // create the points, maintaining their IDs from the original data set
            var points = groups.selectAll('path.nv-point')
                .data(function(d) {
                    return d.values.map(
                        function (point, pointIndex) {
                            return [point, pointIndex]
                        }).filter(
                            function(pointArray, pointIndex) {
                                return pointActive(pointArray[0], pointIndex)
                            })
                    });
            points.enter().append('path')
                .attr('class', function (d) {
                    return 'nv-point nv-point-' + d[1];
                })
                .style('fill', function (d) { return d.color })
                .style('stroke', function (d) { return d.color })
                .attr('transform', function(d) {
                    return 'translate(' + nv.utils.NaNtoZero(x0(getX(d[0],d[1]))) + ',' + nv.utils.NaNtoZero(y0(getY(d[0],d[1]))) + ')'
                })
                .attr('d',
                    nv.utils.symbol()
                    .type(function(d) { return getShape(d[0]); })
                    .size(function(d) { return z(getSize(d[0],d[1])) })
            );
            points.exit().each(delCache).remove();
            groups.exit().selectAll('path.nv-point')
                .watchTransition(renderWatch, 'scatter exit')
                .attr('transform', function(d) {
                    return 'translate(' + nv.utils.NaNtoZero(x(getX(d[0],d[1]))) + ',' + nv.utils.NaNtoZero(y(getY(d[0],d[1]))) + ')'
                })
                .remove();

            //============================================================
            // Point Update Optimisation Notes
            //------------------------------------------------------------
            // The following update selections are filtered with getDiffs
            // (defined at the top of this file) this brings a performance
            // benefit for charts with large data sets that accumulate a
            // subset of changes or additions over time.
            //
            // Uneccesary and expensive DOM calls are avoided by culling
            // unchanged points from the selection in exchange for the
            // cheaper overhead of caching and diffing each point first.
            //
            // Due to the way D3 and NVD3 work, other global changes need
            // to be considered in addition to local point properties.
            // This is a potential source of bugs (if any of the global
            // changes that possibly affect points are missed).

            // Update Point Positions [x, y]
            points.filter(function (d) {
                // getDiffs must always be called to update cache
                return getDiffs(d, 'x', getX, 'y', getY) ||
                    scaleDiff || sizeDiff || domainDiff;
            })
            .watchTransition(renderWatch, 'scatter points')
            .attr('transform', function (d) {
                return 'translate(' +
                    nv.utils.NaNtoZero(x(getX(d[0], d[1]))) + ',' +
                    nv.utils.NaNtoZero(y(getY(d[0], d[1]))) + ')'
            });

            // Update Point Appearance [shape, size]
            points.filter(function (d) {
                // getDiffs must always be called to update cache
                return getDiffs(d, 'shape', getShape, 'size', getSize) ||
                    scaleDiff || sizeDiff || domainDiff;
            })
            .watchTransition(renderWatch, 'scatter points')
            .attr('d', nv.utils.symbol()
                .type(function (d) { return getShape(d[0]) })
                .size(function (d) { return z(getSize(d[0], d[1])) })
            );

            // add label a label to scatter chart
            if(showLabels)
            {
                var titles =  groups.selectAll('.nv-label')
                    .data(function(d) {
                        return d.values.map(
                            function (point, pointIndex) {
                                return [point, pointIndex]
                            }).filter(
                                function(pointArray, pointIndex) {
                                    return pointActive(pointArray[0], pointIndex)
                                })
                        });

                titles.enter().append('text')
                    .style('fill', function (d,i) {
                        return d.color })
                    .style('stroke-opacity', 0)
                    .style('fill-opacity', 1)
                    .attr('transform', function(d) {
                        var dx = nv.utils.NaNtoZero(x0(getX(d[0],d[1]))) + Math.sqrt(z(getSize(d[0],d[1]))/Math.PI) + 2;
                        return 'translate(' + dx + ',' + nv.utils.NaNtoZero(y0(getY(d[0],d[1]))) + ')';
                    })
                    .text(function(d,i){
                        return d[0].label;});

                titles.exit().remove();
                groups.exit().selectAll('path.nv-label')
                    .watchTransition(renderWatch, 'scatter exit')
                    .attr('transform', function(d) {
                        var dx = nv.utils.NaNtoZero(x(getX(d[0],d[1])))+ Math.sqrt(z(getSize(d[0],d[1]))/Math.PI)+2;
                        return 'translate(' + dx + ',' + nv.utils.NaNtoZero(y(getY(d[0],d[1]))) + ')';
                    })
                    .remove();
               titles.each(function(d) {
                  d3.select(this)
                    .classed('nv-label', true)
                    .classed('nv-label-' + d[1], false)
                    .classed('hover',false);
                });
                titles.watchTransition(renderWatch, 'scatter labels')
                    .attr('transform', function(d) {
                        var dx = nv.utils.NaNtoZero(x(getX(d[0],d[1])))+ Math.sqrt(z(getSize(d[0],d[1]))/Math.PI)+2;
                        return 'translate(' + dx + ',' + nv.utils.NaNtoZero(y(getY(d[0],d[1]))) + ')'
                    });
            }

            // Delay updating the invisible interactive layer for smoother animation
            if( interactiveUpdateDelay )
            {
                clearTimeout(timeoutID); // stop repeat calls to updateInteractiveLayer
                timeoutID = setTimeout(updateInteractiveLayer, interactiveUpdateDelay );
            }
            else
            {
                updateInteractiveLayer();
            }

            //store old scales for use in transitions on update
            x0 = x.copy();
            y0 = y.copy();
            z0 = z.copy();

            width0 = width;
            height0 = height;

        });
        renderWatch.renderEnd('scatter immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    // utility function calls provided by this chart
    chart._calls = new function() {
        this.clearHighlights = function () {
            nv.dom.write(function() {
                container.selectAll(".nv-point.hover").classed("hover", false);
            });
            return null;
        };
        this.highlightPoint = function (seriesIndex, pointIndex, isHoverOver) {
            nv.dom.write(function() {
                container.select('.nv-groups')
                  .selectAll(".nv-series-" + seriesIndex)
                  .selectAll(".nv-point-" + pointIndex)
                  .classed("hover", isHoverOver);
            });
        };
    };

    // trigger calls from events too
    dispatch.on('elementMouseover.point', function(d) {
        if (interactive) chart._calls.highlightPoint(d.seriesIndex,d.pointIndex,true);
    });

    dispatch.on('elementMouseout.point', function(d) {
        if (interactive) chart._calls.highlightPoint(d.seriesIndex,d.pointIndex,false);
    });

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:        {get: function(){return width;}, set: function(_){width=_;}},
        height:       {get: function(){return height;}, set: function(_){height=_;}},
        xScale:       {get: function(){return x;}, set: function(_){x=_;}},
        yScale:       {get: function(){return y;}, set: function(_){y=_;}},
        pointScale:   {get: function(){return z;}, set: function(_){z=_;}},
        xDomain:      {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain:      {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        pointDomain:  {get: function(){return sizeDomain;}, set: function(_){sizeDomain=_;}},
        xRange:       {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:       {get: function(){return yRange;}, set: function(_){yRange=_;}},
        pointRange:   {get: function(){return sizeRange;}, set: function(_){sizeRange=_;}},
        forceX:       {get: function(){return forceX;}, set: function(_){forceX=_;}},
        forceY:       {get: function(){return forceY;}, set: function(_){forceY=_;}},
        forcePoint:   {get: function(){return forceSize;}, set: function(_){forceSize=_;}},
        interactive:  {get: function(){return interactive;}, set: function(_){interactive=_;}},
        pointActive:  {get: function(){return pointActive;}, set: function(_){pointActive=_;}},
        padDataOuter: {get: function(){return padDataOuter;}, set: function(_){padDataOuter=_;}},
        padData:      {get: function(){return padData;}, set: function(_){padData=_;}},
        clipEdge:     {get: function(){return clipEdge;}, set: function(_){clipEdge=_;}},
        clipVoronoi:  {get: function(){return clipVoronoi;}, set: function(_){clipVoronoi=_;}},
        clipRadius:   {get: function(){return clipRadius;}, set: function(_){clipRadius=_;}},
        showVoronoi:   {get: function(){return showVoronoi;}, set: function(_){showVoronoi=_;}},
        id:           {get: function(){return id;}, set: function(_){id=_;}},
        interactiveUpdateDelay: {get:function(){return interactiveUpdateDelay;}, set: function(_){interactiveUpdateDelay=_;}},
        showLabels: {get: function(){return showLabels;}, set: function(_){ showLabels = _;}},
        pointBorderColor: {get: function(){return pointBorderColor;}, set: function(_){pointBorderColor=_;}},

        // simple functor options
        x:     {get: function(){return getX;}, set: function(_){getX = d3.functor(_);}},
        y:     {get: function(){return getY;}, set: function(_){getY = d3.functor(_);}},
        pointSize: {get: function(){return getSize;}, set: function(_){getSize = d3.functor(_);}},
        pointShape: {get: function(){return getShape;}, set: function(_){getShape = d3.functor(_);}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
        }},
        color: {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        useVoronoi: {get: function(){return useVoronoi;}, set: function(_){
            useVoronoi = _;
            if (useVoronoi === false) {
                clipVoronoi = false;
            }
        }}
    });

    nv.utils.initOptions(chart);
    return chart;
};

nv.models.scatterChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var scatter      = nv.models.scatter()
        , xAxis        = nv.models.axis()
        , yAxis        = nv.models.axis()
        , legend       = nv.models.legend()
        , distX        = nv.models.distribution()
        , distY        = nv.models.distribution()
        , tooltip      = nv.models.tooltip()
        ;

    var margin       = {top: 30, right: 20, bottom: 50, left: 75}
        , marginTop = null
        , width        = null
        , height       = null
        , container    = null
        , color        = nv.utils.defaultColor()
        , x            = scatter.xScale()
        , y            = scatter.yScale()
        , showDistX    = false
        , showDistY    = false
        , showLegend   = true
        , showXAxis    = true
        , showYAxis    = true
        , rightAlignYAxis = false
        , state = nv.utils.state()
        , defaultState = null
        , dispatch = d3.dispatch('stateChange', 'changeState', 'renderEnd')
        , noData       = null
        , duration = 250
        , showLabels    = false
        ;

    scatter.xScale(x).yScale(y);
    xAxis.orient('bottom').tickPadding(10);
    yAxis
        .orient((rightAlignYAxis) ? 'right' : 'left')
        .tickPadding(10)
    ;
    distX.axis('x');
    distY.axis('y');
    tooltip
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        })
        .valueFormatter(function(d, i) {
            return yAxis.tickFormat()(d, i);
        });

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var x0, y0
        , renderWatch = nv.utils.renderWatch(dispatch, duration);

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled })
            };
        }
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.active !== undefined)
                data.forEach(function(series,i) {
                    series.disabled = !state.active[i];
                });
        }
    };

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(scatter);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);
        if (showDistX) renderWatch.models(distX);
        if (showDistY) renderWatch.models(distY);

        selection.each(function(data) {
            var that = this;

            container = d3.select(this);
            nv.utils.initSVG(container);

            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() {
                if (duration === 0)
                    container.call(chart);
                else
                    container.transition().duration(duration).call(chart);
            };
            chart.container = this;

            state
                .setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            // DEPRECATED set state.disableddisabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display noData message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container);
                renderWatch.renderEnd('scatter immediate');
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            // Setup Scales
            x = scatter.xScale();
            y = scatter.yScale();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-scatterChart').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-scatterChart nv-chart-' + scatter.id());
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            // background for pointer events
            gEnter.append('rect').attr('class', 'nvd3 nv-background').style("pointer-events","none");

            gEnter.append('g').attr('class', 'nv-x nv-axis');
            gEnter.append('g').attr('class', 'nv-y nv-axis');
            gEnter.append('g').attr('class', 'nv-scatterWrap');
            gEnter.append('g').attr('class', 'nv-regressionLinesWrap');
            gEnter.append('g').attr('class', 'nv-distWrap');
            gEnter.append('g').attr('class', 'nv-legendWrap');

            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                var legendWidth = availableWidth;
                legend.width(legendWidth);

                wrap.select('.nv-legendWrap')
                    .datum(data)
                    .call(legend);

                if (!marginTop && legend.height() !== margin.top) {
                    margin.top = legend.height();
                    availableHeight = nv.utils.availableHeight(height, container, margin);
                }

                wrap.select('.nv-legendWrap')
                    .attr('transform', 'translate(0' + ',' + (-margin.top) +')');
            }

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // Main Chart Component(s)
            scatter
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    d.color = d.color || color(d, i);
                    return d.color;
                }).filter(function(d,i) { return !data[i].disabled }))
                .showLabels(showLabels);

            wrap.select('.nv-scatterWrap')
                .datum(data.filter(function(d) { return !d.disabled }))
                .call(scatter);


            wrap.select('.nv-regressionLinesWrap')
                .attr('clip-path', 'url(#nv-edge-clip-' + scatter.id() + ')');

            var regWrap = wrap.select('.nv-regressionLinesWrap').selectAll('.nv-regLines')
                .data(function (d) {
                    return d;
                });

            regWrap.enter().append('g').attr('class', 'nv-regLines');

            var regLine = regWrap.selectAll('.nv-regLine')
                .data(function (d) {
                    return [d]
                });

            regLine.enter()
                .append('line').attr('class', 'nv-regLine')
                .style('stroke-opacity', 0);

            // don't add lines unless we have slope and intercept to use
            regLine.filter(function(d) {
                return d.intercept && d.slope;
            })
                .watchTransition(renderWatch, 'scatterPlusLineChart: regline')
                .attr('x1', x.range()[0])
                .attr('x2', x.range()[1])
                .attr('y1', function (d, i) {
                    return y(x.domain()[0] * d.slope + d.intercept)
                })
                .attr('y2', function (d, i) {
                    return y(x.domain()[1] * d.slope + d.intercept)
                })
                .style('stroke', function (d, i, j) {
                    return color(d, j)
                })
                .style('stroke-opacity', function (d, i) {
                    return (d.disabled || typeof d.slope === 'undefined' || typeof d.intercept === 'undefined') ? 0 : 1
                });

            // Setup Axes
            if (showXAxis) {
                xAxis
                    .scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize( -availableHeight , 0);

                g.select('.nv-x.nv-axis')
                    .attr('transform', 'translate(0,' + y.range()[0] + ')')
                    .call(xAxis);
            }

            if (showYAxis) {
                yAxis
                    .scale(y)
                    ._ticks( nv.utils.calcTicksY(availableHeight/36, data) )
                    .tickSize( -availableWidth, 0);

                g.select('.nv-y.nv-axis')
                    .call(yAxis);
            }

            // Setup Distribution
            if (showDistX) {
                distX
                    .getData(scatter.x())
                    .scale(x)
                    .width(availableWidth)
                    .color(data.map(function(d,i) {
                        return d.color || color(d, i);
                    }).filter(function(d,i) { return !data[i].disabled }));
                gEnter.select('.nv-distWrap').append('g')
                    .attr('class', 'nv-distributionX');
                g.select('.nv-distributionX')
                    .attr('transform', 'translate(0,' + y.range()[0] + ')')
                    .datum(data.filter(function(d) { return !d.disabled }))
                    .call(distX);
            }

            if (showDistY) {
                distY
                    .getData(scatter.y())
                    .scale(y)
                    .width(availableHeight)
                    .color(data.map(function(d,i) {
                        return d.color || color(d, i);
                    }).filter(function(d,i) { return !data[i].disabled }));
                gEnter.select('.nv-distWrap').append('g')
                    .attr('class', 'nv-distributionY');
                g.select('.nv-distributionY')
                    .attr('transform', 'translate(' + (rightAlignYAxis ? availableWidth : -distY.size() ) + ',0)')
                    .datum(data.filter(function(d) { return !d.disabled }))
                    .call(distY);
            }

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState)
                    state[key] = newState[key];
                dispatch.stateChange(state);
                chart.update();
            });

            // Update chart from a state object passed to event handler
            dispatch.on('changeState', function(e) {
                if (typeof e.disabled !== 'undefined') {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });
                    state.disabled = e.disabled;
                }
                chart.update();
            });

            // mouseover needs availableHeight so we just keep scatter mouse events inside the chart block
            scatter.dispatch.on('elementMouseout.tooltip', function(evt) {
                tooltip.hidden(true);
                container.select('.nv-chart-' + scatter.id() + ' .nv-series-' + evt.seriesIndex + ' .nv-distx-' + evt.pointIndex)
                    .attr('y1', 0);
                container.select('.nv-chart-' + scatter.id() + ' .nv-series-' + evt.seriesIndex + ' .nv-disty-' + evt.pointIndex)
                    .attr('x2', distY.size());
            });

            scatter.dispatch.on('elementMouseover.tooltip', function(evt) {
                container.select('.nv-series-' + evt.seriesIndex + ' .nv-distx-' + evt.pointIndex)
                    .attr('y1', evt.relativePos[1] - availableHeight);
                container.select('.nv-series-' + evt.seriesIndex + ' .nv-disty-' + evt.pointIndex)
                    .attr('x2', evt.relativePos[0] + distX.size());
                tooltip.data(evt).hidden(false);
            });

            //store old scales for use in transitions on update
            x0 = x.copy();
            y0 = y.copy();

        });

        renderWatch.renderEnd('scatter with line immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.scatter = scatter;
    chart.legend = legend;
    chart.xAxis = xAxis;
    chart.yAxis = yAxis;
    chart.distX = distX;
    chart.distY = distY;
    chart.tooltip = tooltip;

    chart.options = nv.utils.optionsFunc.bind(chart);
    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        container:  {get: function(){return container;}, set: function(_){container=_;}},
        showDistX:  {get: function(){return showDistX;}, set: function(_){showDistX=_;}},
        showDistY:  {get: function(){return showDistY;}, set: function(_){showDistY=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        showXAxis:  {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis:  {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        defaultState:     {get: function(){return defaultState;}, set: function(_){defaultState=_;}},
        noData:     {get: function(){return noData;}, set: function(_){noData=_;}},
        duration:   {get: function(){return duration;}, set: function(_){duration=_;}},
        showLabels: {get: function(){return showLabels;}, set: function(_){showLabels=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( (_) ? 'right' : 'left');
        }},
        color: {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
            distX.color(color);
            distY.color(color);
        }}
    });

    nv.utils.inheritOptions(chart, scatter);
    nv.utils.initOptions(chart);
    return chart;
};

nv.models.sparkline = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 2, right: 0, bottom: 2, left: 0}
        , width = 400
        , height = 32
        , container = null
        , animate = true
        , x = d3.scale.linear()
        , y = d3.scale.linear()
        , getX = function(d) { return d.x }
        , getY = function(d) { return d.y }
        , color = nv.utils.getColor(['#000'])
        , xDomain
        , yDomain
        , xRange
        , yRange
        , showMinMaxPoints = true
        , showCurrentPoint = true
        , dispatch = d3.dispatch('renderEnd')
        ;

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);
    
    function chart(selection) {
        renderWatch.reset();
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            container = d3.select(this);
            nv.utils.initSVG(container);

            // Setup Scales
            x   .domain(xDomain || d3.extent(data, getX ))
                .range(xRange || [0, availableWidth]);

            y   .domain(yDomain || d3.extent(data, getY ))
                .range(yRange || [availableHeight, 0]);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-sparkline').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-sparkline');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

            var paths = wrap.selectAll('path')
                .data(function(d) { return [d] });
            paths.enter().append('path');
            paths.exit().remove();
            paths
                .style('stroke', function(d,i) { return d.color || color(d, i) })
                .attr('d', d3.svg.line()
                    .x(function(d,i) { return x(getX(d,i)) })
                    .y(function(d,i) { return y(getY(d,i)) })
            );

            // TODO: Add CURRENT data point (Need Min, Mac, Current / Most recent)
            var points = wrap.selectAll('circle.nv-point')
                .data(function(data) {
                    var yValues = data.map(function(d, i) { return getY(d,i); });
                    function pointIndex(index) {
                        if (index != -1) {
                            var result = data[index];
                            result.pointIndex = index;
                            return result;
                        } else {
                            return null;
                        }
                    }
                    var maxPoint = pointIndex(yValues.lastIndexOf(y.domain()[1])),
                        minPoint = pointIndex(yValues.indexOf(y.domain()[0])),
                        currentPoint = pointIndex(yValues.length - 1);
                    return [(showMinMaxPoints ? minPoint : null), (showMinMaxPoints ? maxPoint : null), (showCurrentPoint ? currentPoint : null)].filter(function (d) {return d != null;});
                });
            points.enter().append('circle');
            points.exit().remove();
            points
                .attr('cx', function(d,i) { return x(getX(d,d.pointIndex)) })
                .attr('cy', function(d,i) { return y(getY(d,d.pointIndex)) })
                .attr('r', 2)
                .attr('class', function(d,i) {
                    return getX(d, d.pointIndex) == x.domain()[1] ? 'nv-point nv-currentValue' :
                            getY(d, d.pointIndex) == y.domain()[0] ? 'nv-point nv-minValue' : 'nv-point nv-maxValue'
                });
        });
        
        renderWatch.renderEnd('sparkline immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:            {get: function(){return width;}, set: function(_){width=_;}},
        height:           {get: function(){return height;}, set: function(_){height=_;}},
        xDomain:          {get: function(){return xDomain;}, set: function(_){xDomain=_;}},
        yDomain:          {get: function(){return yDomain;}, set: function(_){yDomain=_;}},
        xRange:           {get: function(){return xRange;}, set: function(_){xRange=_;}},
        yRange:           {get: function(){return yRange;}, set: function(_){yRange=_;}},
        xScale:           {get: function(){return x;}, set: function(_){x=_;}},
        yScale:           {get: function(){return y;}, set: function(_){y=_;}},
        animate:          {get: function(){return animate;}, set: function(_){animate=_;}},
        showMinMaxPoints: {get: function(){return showMinMaxPoints;}, set: function(_){showMinMaxPoints=_;}},
        showCurrentPoint: {get: function(){return showCurrentPoint;}, set: function(_){showCurrentPoint=_;}},

        //functor options
        x: {get: function(){return getX;}, set: function(_){getX=d3.functor(_);}},
        y: {get: function(){return getY;}, set: function(_){getY=d3.functor(_);}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }}
    });

    chart.dispatch = dispatch;
    nv.utils.initOptions(chart);
    return chart;
};

nv.models.sparklinePlus = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var sparkline = nv.models.sparkline();

    var margin = {top: 15, right: 100, bottom: 10, left: 50}
        , width = null
        , height = null
        , x
        , y
        , index = []
        , paused = false
        , xTickFormat = d3.format(',r')
        , yTickFormat = d3.format(',.2f')
        , showLastValue = true
        , alignValue = true
        , rightAlignValue = false
        , noData = null
        , dispatch = d3.dispatch('renderEnd')
        ;
        
    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(sparkline);
        selection.each(function(data) {
            var container = d3.select(this);
            nv.utils.initSVG(container);

            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() { container.call(chart); };
            chart.container = this;

            // Display No Data message if there's nothing to show.
            if (!data || !data.length) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            var currentValue = sparkline.y()(data[data.length-1], data.length-1);

            // Setup Scales
            x = sparkline.xScale();
            y = sparkline.yScale();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-sparklineplus').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-sparklineplus');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-sparklineWrap');
            gEnter.append('g').attr('class', 'nv-valueWrap');
            gEnter.append('g').attr('class', 'nv-hoverArea');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // Main Chart Component(s)
            var sparklineWrap = g.select('.nv-sparklineWrap');

            sparkline.width(availableWidth).height(availableHeight);
            sparklineWrap.call(sparkline);

            if (showLastValue) {
                var valueWrap = g.select('.nv-valueWrap');
                var value = valueWrap.selectAll('.nv-currentValue')
                    .data([currentValue]);

                value.enter().append('text').attr('class', 'nv-currentValue')
                    .attr('dx', rightAlignValue ? -8 : 8)
                    .attr('dy', '.9em')
                    .style('text-anchor', rightAlignValue ? 'end' : 'start');

                value
                    .attr('x', availableWidth + (rightAlignValue ? margin.right : 0))
                    .attr('y', alignValue ? function (d) {
                        return y(d)
                    } : 0)
                    .style('fill', sparkline.color()(data[data.length - 1], data.length - 1))
                    .text(yTickFormat(currentValue));
            }

            gEnter.select('.nv-hoverArea').append('rect')
                .on('mousemove', sparklineHover)
                .on('click', function() { paused = !paused })
                .on('mouseout', function() { index = []; updateValueLine(); });

            g.select('.nv-hoverArea rect')
                .attr('transform', function(d) { return 'translate(' + -margin.left + ',' + -margin.top + ')' })
                .attr('width', availableWidth + margin.left + margin.right)
                .attr('height', availableHeight + margin.top);

            //index is currently global (within the chart), may or may not keep it that way
            function updateValueLine() {
                if (paused) return;

                var hoverValue = g.selectAll('.nv-hoverValue').data(index);

                var hoverEnter = hoverValue.enter()
                    .append('g').attr('class', 'nv-hoverValue')
                    .style('stroke-opacity', 0)
                    .style('fill-opacity', 0);

                hoverValue.exit()
                    .transition().duration(250)
                    .style('stroke-opacity', 0)
                    .style('fill-opacity', 0)
                    .remove();

                hoverValue
                    .attr('transform', function(d) { return 'translate(' + x(sparkline.x()(data[d],d)) + ',0)' })
                    .transition().duration(250)
                    .style('stroke-opacity', 1)
                    .style('fill-opacity', 1);

                if (!index.length) return;

                hoverEnter.append('line')
                    .attr('x1', 0)
                    .attr('y1', -margin.top)
                    .attr('x2', 0)
                    .attr('y2', availableHeight);

                hoverEnter.append('text').attr('class', 'nv-xValue')
                    .attr('x', -6)
                    .attr('y', -margin.top)
                    .attr('text-anchor', 'end')
                    .attr('dy', '.9em');

                g.select('.nv-hoverValue .nv-xValue')
                    .text(xTickFormat(sparkline.x()(data[index[0]], index[0])));

                hoverEnter.append('text').attr('class', 'nv-yValue')
                    .attr('x', 6)
                    .attr('y', -margin.top)
                    .attr('text-anchor', 'start')
                    .attr('dy', '.9em');

                g.select('.nv-hoverValue .nv-yValue')
                    .text(yTickFormat(sparkline.y()(data[index[0]], index[0])));
            }

            function sparklineHover() {
                if (paused) return;

                var pos = d3.mouse(this)[0] - margin.left;

                function getClosestIndex(data, x) {
                    var distance = Math.abs(sparkline.x()(data[0], 0) - x);
                    var closestIndex = 0;
                    for (var i = 0; i < data.length; i++){
                        if (Math.abs(sparkline.x()(data[i], i) - x) < distance) {
                            distance = Math.abs(sparkline.x()(data[i], i) - x);
                            closestIndex = i;
                        }
                    }
                    return closestIndex;
                }

                index = [getClosestIndex(data, Math.round(x.invert(pos)))];
                updateValueLine();
            }

        });
        renderWatch.renderEnd('sparklinePlus immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.sparkline = sparkline;

    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:           {get: function(){return width;}, set: function(_){width=_;}},
        height:          {get: function(){return height;}, set: function(_){height=_;}},
        xTickFormat:     {get: function(){return xTickFormat;}, set: function(_){xTickFormat=_;}},
        yTickFormat:     {get: function(){return yTickFormat;}, set: function(_){yTickFormat=_;}},
        showLastValue:   {get: function(){return showLastValue;}, set: function(_){showLastValue=_;}},
        alignValue:      {get: function(){return alignValue;}, set: function(_){alignValue=_;}},
        rightAlignValue: {get: function(){return rightAlignValue;}, set: function(_){rightAlignValue=_;}},
        noData:          {get: function(){return noData;}, set: function(_){noData=_;}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }}
    });

    nv.utils.inheritOptions(chart, sparkline);
    nv.utils.initOptions(chart);

    return chart;
};

nv.models.stackedArea = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 960
        , height = 500
        , color = nv.utils.defaultColor() // a function that computes the color
        , id = Math.floor(Math.random() * 100000) //Create semi-unique ID incase user doesn't selet one
        , container = null
        , getX = function(d) { return d.x } // accessor to get the x value from a data point
        , getY = function(d) { return d.y } // accessor to get the y value from a data point
        , defined = function(d,i) { return !isNaN(getY(d,i)) && getY(d,i) !== null } // allows a line to be not continuous when it is not defined
        , style = 'stack'
        , offset = 'zero'
        , order = 'default'
        , interpolate = 'linear'  // controls the line interpolation
        , clipEdge = false // if true, masks lines within x and y scale
        , x //can be accessed via chart.xScale()
        , y //can be accessed via chart.yScale()
        , scatter = nv.models.scatter()
        , duration = 250
        , dispatch =  d3.dispatch('areaClick', 'areaMouseover', 'areaMouseout','renderEnd', 'elementClick', 'elementMouseover', 'elementMouseout')
        ;

    scatter
        .pointSize(2.2) // default size
        .pointDomain([2.2, 2.2]) // all the same size by default
    ;

    /************************************
     * offset:
     *   'wiggle' (stream)
     *   'zero' (stacked)
     *   'expand' (normalize to 100%)
     *   'silhouette' (simple centered)
     *
     * order:
     *   'inside-out' (stream)
     *   'default' (input order)
     ************************************/

    var renderWatch = nv.utils.renderWatch(dispatch, duration);

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(scatter);
        selection.each(function(data) {
            var availableWidth = width - margin.left - margin.right,
                availableHeight = height - margin.top - margin.bottom;

            container = d3.select(this);
            nv.utils.initSVG(container);

            // Setup Scales
            x = scatter.xScale();
            y = scatter.yScale();

            var dataRaw = data;
            // Injecting point index into each point because d3.layout.stack().out does not give index
            data.forEach(function(aseries, i) {
                aseries.seriesIndex = i;
                aseries.values = aseries.values.map(function(d, j) {
                    d.index = j;
                    d.seriesIndex = i;
                    return d;
                });
            });

            var dataFiltered = data.filter(function(series) {
                return !series.disabled;
            });

            data = d3.layout.stack()
                .order(order)
                .offset(offset)
                .values(function(d) { return d.values })  //TODO: make values customizeable in EVERY model in this fashion
                .x(getX)
                .y(getY)
                .out(function(d, y0, y) {
                    d.display = {
                        y: y,
                        y0: y0
                    };
                })
            (dataFiltered);

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-stackedarea').data([data]);
            var wrapEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedarea');
            var defsEnter = wrapEnter.append('defs');
            var gEnter = wrapEnter.append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-areaWrap');
            gEnter.append('g').attr('class', 'nv-scatterWrap');

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
            
            // If the user has not specified forceY, make sure 0 is included in the domain
            // Otherwise, use user-specified values for forceY
            if (scatter.forceY().length == 0) {
                scatter.forceY().push(0);
            }
            
            scatter
                .width(availableWidth)
                .height(availableHeight)
                .x(getX)
                .y(function(d) {
                    if (d.display !== undefined) { return d.display.y + d.display.y0; }
                })
                .color(data.map(function(d,i) {
                    d.color = d.color || color(d, d.seriesIndex);
                    return d.color;
                }));

            var scatterWrap = g.select('.nv-scatterWrap')
                .datum(data);

            scatterWrap.call(scatter);

            defsEnter.append('clipPath')
                .attr('id', 'nv-edge-clip-' + id)
                .append('rect');

            wrap.select('#nv-edge-clip-' + id + ' rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            g.attr('clip-path', clipEdge ? 'url(#nv-edge-clip-' + id + ')' : '');

            var area = d3.svg.area()
                .defined(defined)
                .x(function(d,i)  { return x(getX(d,i)) })
                .y0(function(d) {
                    return y(d.display.y0)
                })
                .y1(function(d) {
                    return y(d.display.y + d.display.y0)
                })
                .interpolate(interpolate);

            var zeroArea = d3.svg.area()
                .defined(defined)
                .x(function(d,i)  { return x(getX(d,i)) })
                .y0(function(d) { return y(d.display.y0) })
                .y1(function(d) { return y(d.display.y0) });

            var path = g.select('.nv-areaWrap').selectAll('path.nv-area')
                .data(function(d) { return d });

            path.enter().append('path').attr('class', function(d,i) { return 'nv-area nv-area-' + i })
                .attr('d', function(d,i){
                    return zeroArea(d.values, d.seriesIndex);
                })
                .on('mouseover', function(d,i) {
                    d3.select(this).classed('hover', true);
                    dispatch.areaMouseover({
                        point: d,
                        series: d.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: d.seriesIndex
                    });
                })
                .on('mouseout', function(d,i) {
                    d3.select(this).classed('hover', false);
                    dispatch.areaMouseout({
                        point: d,
                        series: d.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: d.seriesIndex
                    });
                })
                .on('click', function(d,i) {
                    d3.select(this).classed('hover', false);
                    dispatch.areaClick({
                        point: d,
                        series: d.key,
                        pos: [d3.event.pageX, d3.event.pageY],
                        seriesIndex: d.seriesIndex
                    });
                });

            path.exit().remove();
            path.style('fill', function(d,i){
                    return d.color || color(d, d.seriesIndex)
                })
                .style('stroke', function(d,i){ return d.color || color(d, d.seriesIndex) });
            path.watchTransition(renderWatch,'stackedArea path')
                .attr('d', function(d,i) {
                    return area(d.values,i)
                });

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            scatter.dispatch.on('elementMouseover.area', function(e) {
                g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', true);
            });
            scatter.dispatch.on('elementMouseout.area', function(e) {
                g.select('.nv-chart-' + id + ' .nv-area-' + e.seriesIndex).classed('hover', false);
            });

            //Special offset functions
            chart.d3_stackedOffset_stackPercent = function(stackData) {
                var n = stackData.length,    //How many series
                    m = stackData[0].length,     //how many points per series
                    i,
                    j,
                    o,
                    y0 = [];

                for (j = 0; j < m; ++j) { //Looping through all points
                    for (i = 0, o = 0; i < dataRaw.length; i++) { //looping through all series
                        o += getY(dataRaw[i].values[j]); //total y value of all series at a certian point in time.
                    }

                    if (o) for (i = 0; i < n; i++) { //(total y value of all series at point in time i) != 0
                        stackData[i][j][1] /= o;
                    } else { //(total y value of all series at point in time i) == 0
                        for (i = 0; i < n; i++) {
                            stackData[i][j][1] = 0;
                        }
                    }
                }
                for (j = 0; j < m; ++j) y0[j] = 0;
                return y0;
            };

        });

        renderWatch.renderEnd('stackedArea immediate');
        return chart;
    }

    //============================================================
    // Global getters and setters
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.scatter = scatter;

    scatter.dispatch.on('elementClick', function(){ dispatch.elementClick.apply(this, arguments); });
    scatter.dispatch.on('elementMouseover', function(){ dispatch.elementMouseover.apply(this, arguments); });
    scatter.dispatch.on('elementMouseout', function(){ dispatch.elementMouseout.apply(this, arguments); });

    chart.interpolate = function(_) {
        if (!arguments.length) return interpolate;
        interpolate = _;
        return chart;
    };

    chart.duration = function(_) {
        if (!arguments.length) return duration;
        duration = _;
        renderWatch.reset(duration);
        scatter.duration(duration);
        return chart;
    };

    chart.dispatch = dispatch;
    chart.scatter = scatter;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        defined: {get: function(){return defined;}, set: function(_){defined=_;}},
        clipEdge: {get: function(){return clipEdge;}, set: function(_){clipEdge=_;}},
        offset:      {get: function(){return offset;}, set: function(_){offset=_;}},
        order:    {get: function(){return order;}, set: function(_){order=_;}},
        interpolate:    {get: function(){return interpolate;}, set: function(_){interpolate=_;}},

        // simple functor options
        x:     {get: function(){return getX;}, set: function(_){getX = d3.functor(_);}},
        y:     {get: function(){return getY;}, set: function(_){getY = d3.functor(_);}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
        }},
        style: {get: function(){return style;}, set: function(_){
            style = _;
            switch (style) {
                case 'stack':
                    chart.offset('zero');
                    chart.order('default');
                    break;
                case 'stream':
                    chart.offset('wiggle');
                    chart.order('inside-out');
                    break;
                case 'stream-center':
                    chart.offset('silhouette');
                    chart.order('inside-out');
                    break;
                case 'expand':
                    chart.offset('expand');
                    chart.order('default');
                    break;
                case 'stack_percent':
                    chart.offset(chart.d3_stackedOffset_stackPercent);
                    chart.order('default');
                    break;
            }
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            scatter.duration(duration);
        }}
    });

    nv.utils.inheritOptions(chart, scatter);
    nv.utils.initOptions(chart);

    return chart;
};

nv.models.stackedAreaChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var stacked = nv.models.stackedArea()
        , xAxis = nv.models.axis()
        , yAxis = nv.models.axis()
        , legend = nv.models.legend()
        , controls = nv.models.legend()
        , interactiveLayer = nv.interactiveGuideline()
        , tooltip = nv.models.tooltip()
        , focus = nv.models.focus(nv.models.stackedArea())
        ;

    var margin = {top: 10, right: 25, bottom: 50, left: 60}
        , marginTop = null
        , width = null
        , height = null
        , color = nv.utils.defaultColor()
        , showControls = true
        , showLegend = true
        , legendPosition = 'top'
        , showXAxis = true
        , showYAxis = true
        , rightAlignYAxis = false
        , focusEnable = false
        , useInteractiveGuideline = false
        , showTotalInTooltip = true
        , totalLabel = 'TOTAL'
        , x //can be accessed via chart.xScale()
        , y //can be accessed via chart.yScale()
        , state = nv.utils.state()
        , defaultState = null
        , noData = null
        , dispatch = d3.dispatch('stateChange', 'changeState','renderEnd')
        , controlWidth = 250
        , controlOptions = ['Stacked','Stream','Expanded']
        , controlLabels = {}
        , duration = 250
        ;

    state.style = stacked.style();
    xAxis.orient('bottom').tickPadding(7);
    yAxis.orient((rightAlignYAxis) ? 'right' : 'left');

    tooltip
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        })
        .valueFormatter(function(d, i) {
            return yAxis.tickFormat()(d, i);
        });

    interactiveLayer.tooltip
        .headerFormatter(function(d, i) {
            return xAxis.tickFormat()(d, i);
        })
        .valueFormatter(function(d, i) {
            return d == null ? "N/A" : yAxis.tickFormat()(d, i);
        });

    var oldYTickFormat = null,
        oldValueFormatter = null;

    controls.updateState(false);

    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);
    var style = stacked.style();

    var stateGetter = function(data) {
        return function(){
            return {
                active: data.map(function(d) { return !d.disabled }),
                style: stacked.style()
            };
        }
    };

    var stateSetter = function(data) {
        return function(state) {
            if (state.style !== undefined)
                style = state.style;
            if (state.active !== undefined)
                data.forEach(function(series,i) {
                    series.disabled = !state.active[i];
                });
        }
    };

    var percentFormatter = d3.format('%');

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(stacked);
        if (showXAxis) renderWatch.models(xAxis);
        if (showYAxis) renderWatch.models(yAxis);

        selection.each(function(data) {
            var container = d3.select(this),
                that = this;
            nv.utils.initSVG(container);

            var availableWidth = nv.utils.availableWidth(width, container, margin),
                availableHeight = nv.utils.availableHeight(height, container, margin) - (focusEnable ? focus.height() : 0);

            chart.update = function() { container.transition().duration(duration).call(chart); };
            chart.container = this;

            state
                .setter(stateSetter(data), chart.update)
                .getter(stateGetter(data))
                .update();

            // DEPRECATED set state.disabled
            state.disabled = data.map(function(d) { return !!d.disabled });

            if (!defaultState) {
                var key;
                defaultState = {};
                for (key in state) {
                    if (state[key] instanceof Array)
                        defaultState[key] = state[key].slice(0);
                    else
                        defaultState[key] = state[key];
                }
            }

            // Display No Data message if there's nothing to show.
            if (!data || !data.length || !data.filter(function(d) { return d.values.length }).length) {
                nv.utils.noData(chart, container)
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }
            // Setup Scales
            x = stacked.xScale();
            y = stacked.yScale();

            // Setup containers and skeleton of chart
            var wrap = container.selectAll('g.nv-wrap.nv-stackedAreaChart').data([data]);
            var gEnter = wrap.enter().append('g').attr('class', 'nvd3 nv-wrap nv-stackedAreaChart').append('g');
            var g = wrap.select('g');

            gEnter.append('g').attr('class', 'nv-legendWrap');
            gEnter.append('g').attr('class', 'nv-controlsWrap');

            var focusEnter = gEnter.append('g').attr('class', 'nv-focus');
            focusEnter.append('g').attr('class', 'nv-background').append('rect');
            focusEnter.append('g').attr('class', 'nv-x nv-axis');
            focusEnter.append('g').attr('class', 'nv-y nv-axis');
            focusEnter.append('g').attr('class', 'nv-stackedWrap');
            focusEnter.append('g').attr('class', 'nv-interactive');

            // g.select("rect").attr("width",availableWidth).attr("height",availableHeight);

            var contextEnter = gEnter.append('g').attr('class', 'nv-focusWrap');

            // Legend
            if (!showLegend) {
                g.select('.nv-legendWrap').selectAll('*').remove();
            } else {
                var legendWidth = (showControls && legendPosition === 'top') ? availableWidth - controlWidth : availableWidth;

                legend.width(legendWidth);
                g.select('.nv-legendWrap').datum(data).call(legend);

                if (legendPosition === 'bottom') {
                	// constant from axis.js, plus some margin for better layout
                	var xAxisHeight = (showXAxis ? 12 : 0) + 10;
                   	margin.bottom = Math.max(legend.height() + xAxisHeight, margin.bottom);
                   	availableHeight = nv.utils.availableHeight(height, container, margin) - (focusEnable ? focus.height() : 0);
                	var legendTop = availableHeight + xAxisHeight;
                    g.select('.nv-legendWrap')
                        .attr('transform', 'translate(0,' + legendTop +')');
                } else if (legendPosition === 'top') {
                    if (!marginTop && margin.top != legend.height()) {
                        margin.top = legend.height();
                        availableHeight = nv.utils.availableHeight(height, container, margin) - (focusEnable ? focus.height() : 0);
                    }

                    g.select('.nv-legendWrap')
                    	.attr('transform', 'translate(' + (availableWidth-legendWidth) + ',' + (-margin.top) +')');
                }
            }

            // Controls
            if (!showControls) {
                 g.select('.nv-controlsWrap').selectAll('*').remove();
            } else {
                var controlsData = [
                    {
                        key: controlLabels.stacked || 'Stacked',
                        metaKey: 'Stacked',
                        disabled: stacked.style() != 'stack',
                        style: 'stack'
                    },
                    {
                        key: controlLabels.stream || 'Stream',
                        metaKey: 'Stream',
                        disabled: stacked.style() != 'stream',
                        style: 'stream'
                    },
                    {
                        key: controlLabels.expanded || 'Expanded',
                        metaKey: 'Expanded',
                        disabled: stacked.style() != 'expand',
                        style: 'expand'
                    },
                    {
                        key: controlLabels.stack_percent || 'Stack %',
                        metaKey: 'Stack_Percent',
                        disabled: stacked.style() != 'stack_percent',
                        style: 'stack_percent'
                    }
                ];

                controlWidth = (controlOptions.length/3) * 260;
                controlsData = controlsData.filter(function(d) {
                    return controlOptions.indexOf(d.metaKey) !== -1;
                });

                controls
                    .width( controlWidth )
                    .color(['#444', '#444', '#444']);

                g.select('.nv-controlsWrap')
                    .datum(controlsData)
                    .call(controls);

                var requiredTop = Math.max(controls.height(), showLegend && (legendPosition === 'top') ? legend.height() : 0);

                if ( margin.top != requiredTop ) {
                    margin.top = requiredTop;
                    availableHeight = nv.utils.availableHeight(height, container, margin) - (focusEnable ? focus.height() : 0);
                }

                g.select('.nv-controlsWrap')
                    .attr('transform', 'translate(0,' + (-margin.top) +')');
            }

            wrap.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            if (rightAlignYAxis) {
                g.select(".nv-y.nv-axis")
                    .attr("transform", "translate(" + availableWidth + ",0)");
            }

            //Set up interactive layer
            if (useInteractiveGuideline) {
                interactiveLayer
                    .width(availableWidth)
                    .height(availableHeight)
                    .margin({left: margin.left, top: margin.top})
                    .svgContainer(container)
                    .xScale(x);
                wrap.select(".nv-interactive").call(interactiveLayer);
            }

            g.select('.nv-focus .nv-background rect')
                .attr('width', availableWidth)
                .attr('height', availableHeight);

            stacked
                .width(availableWidth)
                .height(availableHeight)
                .color(data.map(function(d,i) {
                    return d.color || color(d, i);
                }).filter(function(d,i) { return !data[i].disabled; }));

            var stackedWrap = g.select('.nv-focus .nv-stackedWrap')
                .datum(data.filter(function(d) { return !d.disabled; }));

            // Setup Axes
            if (showXAxis) {
                xAxis.scale(x)
                    ._ticks( nv.utils.calcTicksX(availableWidth/100, data) )
                    .tickSize( -availableHeight, 0);
            }

            if (showYAxis) {
                var ticks;
                if (stacked.offset() === 'wiggle') {
                    ticks = 0;
                }
                else {
                    ticks = nv.utils.calcTicksY(availableHeight/36, data);
                }
                yAxis.scale(y)
                    ._ticks(ticks)
                    .tickSize(-availableWidth, 0);
            }

            //============================================================
            // Update Axes
            //============================================================
            function updateXAxis() {
                if(showXAxis) {
                    g.select('.nv-focus .nv-x.nv-axis')
                        .attr('transform', 'translate(0,' + availableHeight + ')')
                        .transition()
                        .duration(duration)
                        .call(xAxis)
                        ;
                }
            }

            function updateYAxis() {
                if(showYAxis) {
                    if (stacked.style() === 'expand' || stacked.style() === 'stack_percent') {
                        var currentFormat = yAxis.tickFormat();

                        if ( !oldYTickFormat || currentFormat !== percentFormatter )
                            oldYTickFormat = currentFormat;

                        //Forces the yAxis to use percentage in 'expand' mode.
                        yAxis.tickFormat(percentFormatter);
                    }
                    else {
                        if (oldYTickFormat) {
                            yAxis.tickFormat(oldYTickFormat);
                            oldYTickFormat = null;
                        }
                    }

                    g.select('.nv-focus .nv-y.nv-axis')
                    .transition().duration(0)
                    .call(yAxis);
                }
            }

            //============================================================
            // Update Focus
            //============================================================
            if(!focusEnable) {
                stackedWrap.transition().call(stacked);
                updateXAxis();
                updateYAxis();
            } else {
                focus.width(availableWidth);
                g.select('.nv-focusWrap')
                    .attr('transform', 'translate(0,' + ( availableHeight + margin.bottom + focus.margin().top) + ')')
                    .datum(data.filter(function(d) { return !d.disabled; }))
                    .call(focus);
                var extent = focus.brush.empty() ? focus.xDomain() : focus.brush.extent();
                if(extent !== null){
                    onBrush(extent);
                }
            }

            //============================================================
            // Event Handling/Dispatching (in chart's scope)
            //------------------------------------------------------------

            stacked.dispatch.on('areaClick.toggle', function(e) {
                if (data.filter(function(d) { return !d.disabled }).length === 1)
                    data.forEach(function(d) {
                        d.disabled = false;
                    });
                else
                    data.forEach(function(d,i) {
                        d.disabled = (i != e.seriesIndex);
                    });

                state.disabled = data.map(function(d) { return !!d.disabled });
                dispatch.stateChange(state);

                chart.update();
            });

            legend.dispatch.on('stateChange', function(newState) {
                for (var key in newState)
                    state[key] = newState[key];
                dispatch.stateChange(state);
                chart.update();
            });

            controls.dispatch.on('legendClick', function(d,i) {
                if (!d.disabled) return;

                controlsData = controlsData.map(function(s) {
                    s.disabled = true;
                    return s;
                });
                d.disabled = false;

                stacked.style(d.style);


                state.style = stacked.style();
                dispatch.stateChange(state);

                chart.update();
            });

            interactiveLayer.dispatch.on('elementMousemove', function(e) {
                stacked.clearHighlights();
                var singlePoint, pointIndex, pointXLocation, allData = [], valueSum = 0, allNullValues = true, atleastOnePoint = false;
                data
                    .filter(function(series, i) {
                        series.seriesIndex = i;
                        return !series.disabled;
                    })
                    .forEach(function(series,i) {
                        pointIndex = nv.interactiveBisect(series.values, e.pointXValue, chart.x());
                        var point = series.values[pointIndex];
                        var pointYValue = chart.y()(point, pointIndex);
                        if (pointYValue != null && pointYValue > 0) {
                            stacked.highlightPoint(i, pointIndex, true);
                            atleastOnePoint = true;
                        }
                    
                        // Draw at least one point if all values are zero.
                        if (i === (data.length - 1) && !atleastOnePoint) {
                            stacked.highlightPoint(i, pointIndex, true);
                        }
                        if (typeof point === 'undefined') return;
                        if (typeof singlePoint === 'undefined') singlePoint = point;
                        if (typeof pointXLocation === 'undefined') pointXLocation = chart.xScale()(chart.x()(point,pointIndex));

                        //If we are in 'expand' mode, use the stacked percent value instead of raw value.
                        var tooltipValue = (stacked.style() == 'expand') ? point.display.y : chart.y()(point,pointIndex);
                        allData.push({
                            key: series.key,
                            value: tooltipValue,
                            color: color(series,series.seriesIndex),
                            point: point
                        });

                        if (showTotalInTooltip && stacked.style() != 'expand' && tooltipValue != null) {
                          valueSum += tooltipValue;
                          allNullValues = false;
                        };
                    });

                allData.reverse();

                //Highlight the tooltip entry based on which stack the mouse is closest to.
                if (allData.length > 2) {
                    var yValue = chart.yScale().invert(e.mouseY);
                    var yDistMax = Infinity, indexToHighlight = null;
                    allData.forEach(function(series,i) {

                        //To handle situation where the stacked area chart is negative, we need to use absolute values
                        //when checking if the mouse Y value is within the stack area.
                        yValue = Math.abs(yValue);
                        var stackedY0 = Math.abs(series.point.display.y0);
                        var stackedY = Math.abs(series.point.display.y);
                        if ( yValue >= stackedY0 && yValue <= (stackedY + stackedY0))
                        {
                            indexToHighlight = i;
                            return;
                        }
                    });
                    if (indexToHighlight != null)
                        allData[indexToHighlight].highlight = true;
                }

                //If we are not in 'expand' mode, add a 'Total' row to the tooltip.
                if (showTotalInTooltip && stacked.style() != 'expand' && allData.length >= 2 && !allNullValues) {
                    allData.push({
                        key: totalLabel,
                        value: valueSum,
                        total: true
                    });
                }

                var xValue = chart.x()(singlePoint,pointIndex);

                var valueFormatter = interactiveLayer.tooltip.valueFormatter();
                // Keeps track of the tooltip valueFormatter if the chart changes to expanded view
                if (stacked.style() === 'expand' || stacked.style() === 'stack_percent') {
                    if ( !oldValueFormatter ) {
                        oldValueFormatter = valueFormatter;
                    }
                    //Forces the tooltip to use percentage in 'expand' mode.
                    valueFormatter = d3.format(".1%");
                }
                else {
                    if (oldValueFormatter) {
                        valueFormatter = oldValueFormatter;
                        oldValueFormatter = null;
                    }
                }

                interactiveLayer.tooltip
                    .valueFormatter(valueFormatter)
                    .data(
                    {
                        value: xValue,
                        series: allData
                    }
                )();

                interactiveLayer.renderGuideLine(pointXLocation);

            });

            interactiveLayer.dispatch.on("elementMouseout",function(e) {
                stacked.clearHighlights();
            });

            /* Update `main' graph on brush update. */
            focus.dispatch.on("onBrush", function(extent) {
                onBrush(extent);
            });

            // Update chart from a state object passed to event handler
            dispatch.on('changeState', function(e) {

                if (typeof e.disabled !== 'undefined' && data.length === e.disabled.length) {
                    data.forEach(function(series,i) {
                        series.disabled = e.disabled[i];
                    });

                    state.disabled = e.disabled;
                }

                if (typeof e.style !== 'undefined') {
                    stacked.style(e.style);
                    style = e.style;
                }

                chart.update();
            });

            //============================================================
            // Functions
            //------------------------------------------------------------

            function onBrush(extent) {
                // Update Main (Focus)
                var stackedWrap = g.select('.nv-focus .nv-stackedWrap')
                    .datum(
                    data.filter(function(d) { return !d.disabled; })
                        .map(function(d,i) {
                            return {
                                key: d.key,
                                area: d.area,
                                classed: d.classed,
                                values: d.values.filter(function(d,i) {
                                    return stacked.x()(d,i) >= extent[0] && stacked.x()(d,i) <= extent[1];
                                }),
                                disableTooltip: d.disableTooltip
                            };
                        })
                );
                stackedWrap.transition().duration(duration).call(stacked);

                // Update Main (Focus) Axes
                updateXAxis();
                updateYAxis();
            }

        });

        renderWatch.renderEnd('stacked Area chart immediate');
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    stacked.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt.point['x'] = stacked.x()(evt.point);
        evt.point['y'] = stacked.y()(evt.point);
        tooltip.data(evt).hidden(false);
    });

    stacked.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true)
    });
    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.stacked = stacked;
    chart.legend = legend;
    chart.controls = controls;
    chart.xAxis = xAxis;
    chart.x2Axis = focus.xAxis;
    chart.yAxis = yAxis;
    chart.y2Axis = focus.yAxis;
    chart.interactiveLayer = interactiveLayer;
    chart.tooltip = tooltip;
    chart.focus = focus;

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        showLegend: {get: function(){return showLegend;}, set: function(_){showLegend=_;}},
        legendPosition: {get: function(){return legendPosition;}, set: function(_){legendPosition=_;}},
        showXAxis:      {get: function(){return showXAxis;}, set: function(_){showXAxis=_;}},
        showYAxis:    {get: function(){return showYAxis;}, set: function(_){showYAxis=_;}},
        defaultState:    {get: function(){return defaultState;}, set: function(_){defaultState=_;}},
        noData:    {get: function(){return noData;}, set: function(_){noData=_;}},
        showControls:    {get: function(){return showControls;}, set: function(_){showControls=_;}},
        controlLabels:    {get: function(){return controlLabels;}, set: function(_){controlLabels=_;}},
        controlOptions:    {get: function(){return controlOptions;}, set: function(_){controlOptions=_;}},
        showTotalInTooltip:      {get: function(){return showTotalInTooltip;}, set: function(_){showTotalInTooltip=_;}},
        totalLabel:      {get: function(){return totalLabel;}, set: function(_){totalLabel=_;}},
        focusEnable:    {get: function(){return focusEnable;}, set: function(_){focusEnable=_;}},
        focusHeight:     {get: function(){return focus.height();}, set: function(_){focus.height(_);}},
        brushExtent: {get: function(){return focus.brushExtent();}, set: function(_){focus.brushExtent(_);}},

        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            if (_.top !== undefined) {
                margin.top = _.top;
                marginTop = _.top;
            }
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
        }},
        focusMargin: {get: function(){return focus.margin}, set: function(_){
            focus.margin.top    = _.top    !== undefined ? _.top    : focus.margin.top;
            focus.margin.right  = _.right  !== undefined ? _.right  : focus.margin.right;
            focus.margin.bottom = _.bottom !== undefined ? _.bottom : focus.margin.bottom;
            focus.margin.left   = _.left   !== undefined ? _.left   : focus.margin.left;
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            stacked.duration(duration);
            xAxis.duration(duration);
            yAxis.duration(duration);
        }},
        color:  {get: function(){return color;}, set: function(_){
            color = nv.utils.getColor(_);
            legend.color(color);
            stacked.color(color);
            focus.color(color);
        }},
        x: {get: function(){return stacked.x();}, set: function(_){
            stacked.x(_);
            focus.x(_);
        }},
        y: {get: function(){return stacked.y();}, set: function(_){
            stacked.y(_);
            focus.y(_);
        }},
        rightAlignYAxis: {get: function(){return rightAlignYAxis;}, set: function(_){
            rightAlignYAxis = _;
            yAxis.orient( rightAlignYAxis ? 'right' : 'left');
        }},
        useInteractiveGuideline: {get: function(){return useInteractiveGuideline;}, set: function(_){
            useInteractiveGuideline = !!_;
            chart.interactive(!_);
            chart.useVoronoi(!_);
            stacked.scatter.interactive(!_);
        }}
    });

    nv.utils.inheritOptions(chart, stacked);
    nv.utils.initOptions(chart);

    return chart;
};

nv.models.stackedAreaWithFocusChart = function() {
  return nv.models.stackedAreaChart()
    .margin({ bottom: 30 })
    .focusEnable( true );
};
// based on http://bl.ocks.org/kerryrodden/477c1bfb081b783f80ad
nv.models.sunburst = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var margin = {top: 0, right: 0, bottom: 0, left: 0}
        , width = 600
        , height = 600
        , mode = "count"
        , modes = {count: function(d) { return 1; }, value: function(d) { return d.value || d.size }, size: function(d) { return d.value || d.size }}
        , id = Math.floor(Math.random() * 10000) //Create semi-unique ID in case user doesn't select one
        , container = null
        , color = nv.utils.defaultColor()
        , showLabels = false
        , labelFormat = function(d){if(mode === 'count'){return d.name + ' #' + d.value}else{return d.name + ' ' + (d.value || d.size)}}
        , labelThreshold = 0.02
        , sort = function(d1, d2){return d1.name > d2.name;}
        , key = function(d,i){
            if (d.parent !== undefined) {
                return d.name + '-' + d.parent.name + '-' + i;
            } else {
                return d.name;
            }
        }
        , groupColorByParent = true
        , duration = 500
        , dispatch = d3.dispatch('chartClick', 'elementClick', 'elementDblClick', 'elementMousemove', 'elementMouseover', 'elementMouseout', 'renderEnd');

    //============================================================
    // aux functions and setup
    //------------------------------------------------------------

    var x = d3.scale.linear().range([0, 2 * Math.PI]);
    var y = d3.scale.sqrt();

    var partition = d3.layout.partition().sort(sort);

    var node, availableWidth, availableHeight, radius;
    var prevPositions = {};

    var arc = d3.svg.arc()
        .startAngle(function(d) {return Math.max(0, Math.min(2 * Math.PI, x(d.x))) })
        .endAngle(function(d) {return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))) })
        .innerRadius(function(d) {return Math.max(0, y(d.y)) })
        .outerRadius(function(d) {return Math.max(0, y(d.y + d.dy)) });

    function rotationToAvoidUpsideDown(d) {
        var centerAngle = computeCenterAngle(d);
        if(centerAngle > 90){
            return 180;
        }
        else {
            return 0;
        }
    }

    function computeCenterAngle(d) {
        var startAngle = Math.max(0, Math.min(2 * Math.PI, x(d.x)));
        var endAngle = Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
        var centerAngle = (((startAngle + endAngle) / 2) * (180 / Math.PI)) - 90;
        return centerAngle;
    }

    function computeNodePercentage(d) {
        var startAngle = Math.max(0, Math.min(2 * Math.PI, x(d.x)));
        var endAngle = Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));
        return (endAngle - startAngle) / (2 * Math.PI);
    }

    function labelThresholdMatched(d) {
        var startAngle = Math.max(0, Math.min(2 * Math.PI, x(d.x)));
        var endAngle = Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx)));

        var size = endAngle - startAngle;
        return size > labelThreshold;
    }

    // When zooming: interpolate the scales.
    function arcTweenZoom(e,i) {
        var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]),
        yd = d3.interpolate(y.domain(), [node.y, 1]),
        yr = d3.interpolate(y.range(), [node.y ? 20 : 0, radius]);

        if (i === 0) {
            return function() {return arc(e);}
        }
        else {
            return function (t) {
                x.domain(xd(t));
                y.domain(yd(t)).range(yr(t));
                return arc(e);
            }
        };
    }

    function arcTweenUpdate(d) {
        var ipo = d3.interpolate({x: d.x0, dx: d.dx0, y: d.y0, dy: d.dy0}, d);

        return function (t) {
            var b = ipo(t);

            d.x0 = b.x;
            d.dx0 = b.dx;
            d.y0 = b.y;
            d.dy0 = b.dy;

            return arc(b);
        };
    }

    function updatePrevPosition(node) {
        var k = key(node);
        if(! prevPositions[k]) prevPositions[k] = {};
        var pP = prevPositions[k];
        pP.dx = node.dx;
        pP.x = node.x;
        pP.dy = node.dy;
        pP.y = node.y;
    }

    function storeRetrievePrevPositions(nodes) {
        nodes.forEach(function(n){
            var k = key(n);
            var pP = prevPositions[k];
            //console.log(k,n,pP);
            if( pP ){
                n.dx0 = pP.dx;
                n.x0 = pP.x;
                n.dy0 = pP.dy;
                n.y0 = pP.y;
            }
            else {
                n.dx0 = n.dx;
                n.x0 = n.x;
                n.dy0 = n.dy;
                n.y0 = n.y;
            }
            updatePrevPosition(n);
        });
    }

    function zoomClick(d) {
        var labels = container.selectAll('text')
        var path = container.selectAll('path')

        // fade out all text elements
        labels.transition().attr("opacity",0);

        // to allow reference to the new center node
        node = d;

        path.transition()
            .duration(duration)
            .attrTween("d", arcTweenZoom)
            .each('end', function(e) {
                // partially taken from here: http://bl.ocks.org/metmajer/5480307
                // check if the animated element's data e lies within the visible angle span given in d
                if(e.x >= d.x && e.x < (d.x + d.dx) ){
                    if(e.depth >= d.depth){
                        // get a selection of the associated text element
                        var parentNode = d3.select(this.parentNode);
                        var arcText = parentNode.select('text');

                        // fade in the text element and recalculate positions
                        arcText.transition().duration(duration)
                        .text( function(e){return labelFormat(e) })
                        .attr("opacity", function(d){
                            if(labelThresholdMatched(d)) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        })
                        .attr("transform", function() {
                            var width = this.getBBox().width;
                            if(e.depth === 0)
                            return "translate(" + (width / 2 * - 1) + ",0)";
                            else if(e.depth === d.depth){
                                return "translate(" + (y(e.y) + 5) + ",0)";
                            }
                            else {
                                var centerAngle = computeCenterAngle(e);
                                var rotation = rotationToAvoidUpsideDown(e);
                                if (rotation === 0) {
                                    return 'rotate('+ centerAngle +')translate(' + (y(e.y) + 5) + ',0)';
                                }
                                else {
                                    return 'rotate('+ centerAngle +')translate(' + (y(e.y) + width + 5) + ',0)rotate(' + rotation + ')';
                                }
                            }
                        });
                    }
                }
            })
    }

    //============================================================
    // chart function
    //------------------------------------------------------------
    var renderWatch = nv.utils.renderWatch(dispatch);

    function chart(selection) {
        renderWatch.reset();

        selection.each(function(data) {
            container = d3.select(this);
            availableWidth = nv.utils.availableWidth(width, container, margin);
            availableHeight = nv.utils.availableHeight(height, container, margin);
            radius = Math.min(availableWidth, availableHeight) / 2;

            y.range([0, radius]);

            // Setup containers and skeleton of chart
            var wrap = container.select('g.nvd3.nv-wrap.nv-sunburst');
            if( !wrap[0][0] ) {
                wrap = container.append('g')
                    .attr('class', 'nvd3 nv-wrap nv-sunburst nv-chart-' + id)
                    .attr('transform', 'translate(' + ((availableWidth / 2) + margin.left + margin.right) + ',' + ((availableHeight / 2) + margin.top + margin.bottom) + ')');
            } else {
                wrap.attr('transform', 'translate(' + ((availableWidth / 2) + margin.left + margin.right) + ',' + ((availableHeight / 2) + margin.top + margin.bottom) + ')');
            }

            container.on('click', function (d, i) {
                dispatch.chartClick({
                    data: d,
                    index: i,
                    pos: d3.event,
                    id: id
                });
            });

            partition.value(modes[mode] || modes["count"]);

            //reverse the drawing order so that the labels of inner
            //arcs are drawn on top of the outer arcs.
            var nodes = partition.nodes(data[0]).reverse()

            storeRetrievePrevPositions(nodes);
            var cG = wrap.selectAll('.arc-container').data(nodes, key)

            //handle new datapoints
            var cGE = cG.enter()
                .append("g")
                .attr("class",'arc-container')

            cGE.append("path")
                .attr("d", arc)
                .style("fill", function (d) {
                    if (d.color) {
                        return d.color;
                    }
                    else if (groupColorByParent) {
                        return color((d.children ? d : d.parent).name);
                    }
                    else {
                        return color(d.name);
                    }
                })
                .style("stroke", "#FFF")
                .on("click", function(d,i){
                    zoomClick(d);
                    dispatch.elementClick({
                        data: d,
                        index: i
                    })
                })
                .on('mouseover', function(d,i){
                    d3.select(this).classed('hover', true).style('opacity', 0.8);
                    dispatch.elementMouseover({
                        data: d,
                        color: d3.select(this).style("fill"),
                        percent: computeNodePercentage(d)
                    });
                })
                .on('mouseout', function(d,i){
                    d3.select(this).classed('hover', false).style('opacity', 1);
                    dispatch.elementMouseout({
                        data: d
                    });
                })
                .on('mousemove', function(d,i){
                    dispatch.elementMousemove({
                        data: d
                    });
                });

            ///Iterating via each and selecting based on the this
            ///makes it work ... a cG.selectAll('path') doesn't.
            ///Without iteration the data (in the element) didn't update.
            cG.each(function(d){
                d3.select(this).select('path')
                    .transition()
                    .duration(duration)
                    .attrTween('d', arcTweenUpdate);
            });

            if(showLabels){
                //remove labels first and add them back
                cG.selectAll('text').remove();

                //this way labels are on top of newly added arcs
                cG.append('text')
                    .text( function(e){ return labelFormat(e)})
                    .transition()
                    .duration(duration)
                    .attr("opacity", function(d){
                        if(labelThresholdMatched(d)) {
                            return 1;
                        }
                        else {
                            return 0;
                        }
                    })
                    .attr("transform", function(d) {
                        var width = this.getBBox().width;
                        if(d.depth === 0){
                            return "rotate(0)translate(" + (width / 2 * -1) + ",0)";
                        }
                        else {
                            var centerAngle = computeCenterAngle(d);
                            var rotation = rotationToAvoidUpsideDown(d);
                            if (rotation === 0) {
                                return 'rotate('+ centerAngle +')translate(' + (y(d.y) + 5) + ',0)';
                            }
                            else {
                                return 'rotate('+ centerAngle +')translate(' + (y(d.y) + width + 5) + ',0)rotate(' + rotation + ')';
                            }
                        }
                    });
            }

            //zoom out to the center when the data is updated.
            zoomClick(nodes[nodes.length - 1])


            //remove unmatched elements ...
            cG.exit()
                .transition()
                .duration(duration)
                .attr('opacity',0)
                .each('end',function(d){
                    var k = key(d);
                    prevPositions[k] = undefined;
                })
                .remove();
        });


        renderWatch.renderEnd('sunburst immediate');
        return chart;
    }

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    chart.dispatch = dispatch;
    chart.options = nv.utils.optionsFunc.bind(chart);

    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        width:      {get: function(){return width;}, set: function(_){width=_;}},
        height:     {get: function(){return height;}, set: function(_){height=_;}},
        mode:       {get: function(){return mode;}, set: function(_){mode=_;}},
        id:         {get: function(){return id;}, set: function(_){id=_;}},
        duration:   {get: function(){return duration;}, set: function(_){duration=_;}},
        groupColorByParent: {get: function(){return groupColorByParent;}, set: function(_){groupColorByParent=!!_;}},
        showLabels: {get: function(){return showLabels;}, set: function(_){showLabels=!!_}},
        labelFormat: {get: function(){return labelFormat;}, set: function(_){labelFormat=_}},
        labelThreshold: {get: function(){return labelThreshold;}, set: function(_){labelThreshold=_}},
        sort: {get: function(){return sort;}, set: function(_){sort=_}},
        key: {get: function(){return key;}, set: function(_){key=_}},
        // options that require extra logic in the setter
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    != undefined ? _.top    : margin.top;
            margin.right  = _.right  != undefined ? _.right  : margin.right;
            margin.bottom = _.bottom != undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   != undefined ? _.left   : margin.left;
        }},
        color: {get: function(){return color;}, set: function(_){
            color=nv.utils.getColor(_);
        }}
    });

    nv.utils.initOptions(chart);
    return chart;
};
nv.models.sunburstChart = function() {
    "use strict";

    //============================================================
    // Public Variables with Default Settings
    //------------------------------------------------------------

    var sunburst = nv.models.sunburst();
    var tooltip = nv.models.tooltip();

    var margin = {top: 30, right: 20, bottom: 20, left: 20}
        , width = null
        , height = null
        , color = nv.utils.defaultColor()
        , showTooltipPercent = false
        , id = Math.round(Math.random() * 100000)
        , defaultState = null
        , noData = null
        , duration = 250
        , dispatch = d3.dispatch('stateChange', 'changeState','renderEnd');


    //============================================================
    // Private Variables
    //------------------------------------------------------------

    var renderWatch = nv.utils.renderWatch(dispatch);

    tooltip
        .duration(0)
        .headerEnabled(false)
        .valueFormatter(function(d){return d;});

    //============================================================
    // Chart function
    //------------------------------------------------------------

    function chart(selection) {
        renderWatch.reset();
        renderWatch.models(sunburst);

        selection.each(function(data) {
            var container = d3.select(this);

            nv.utils.initSVG(container);

            var availableWidth = nv.utils.availableWidth(width, container, margin);
            var availableHeight = nv.utils.availableHeight(height, container, margin);

            chart.update = function() {
                if (duration === 0) {
                    container.call(chart);
                } else {
                    container.transition().duration(duration).call(chart);
                }
            };
            chart.container = container;

            // Display No Data message if there's nothing to show.
            if (!data || !data.length) {
                nv.utils.noData(chart, container);
                return chart;
            } else {
                container.selectAll('.nv-noData').remove();
            }

            sunburst.width(availableWidth).height(availableHeight).margin(margin);
            container.call(sunburst);
        });

        renderWatch.renderEnd('sunburstChart immediate');
        return chart;
    }

    //============================================================
    // Event Handling/Dispatching (out of chart's scope)
    //------------------------------------------------------------

    sunburst.dispatch.on('elementMouseover.tooltip', function(evt) {
        evt.series = {
            key: evt.data.name,
            value: (evt.data.value || evt.data.size),
            color: evt.color,
            percent: evt.percent
        };
        if (!showTooltipPercent) {
            delete evt.percent;
            delete evt.series.percent;
        }
        tooltip.data(evt).hidden(false);
    });

    sunburst.dispatch.on('elementMouseout.tooltip', function(evt) {
        tooltip.hidden(true);
    });

    sunburst.dispatch.on('elementMousemove.tooltip', function(evt) {
        tooltip();
    });

    //============================================================
    // Expose Public Variables
    //------------------------------------------------------------

    // expose chart's sub-components
    chart.dispatch = dispatch;
    chart.sunburst = sunburst;
    chart.tooltip = tooltip;
    chart.options = nv.utils.optionsFunc.bind(chart);

    // use Object get/set functionality to map between vars and chart functions
    chart._options = Object.create({}, {
        // simple options, just get/set the necessary values
        noData:             {get: function(){return noData;},               set: function(_){noData=_;}},
        defaultState:       {get: function(){return defaultState;},         set: function(_){defaultState=_;}},
        showTooltipPercent: {get: function(){return showTooltipPercent;},   set: function(_){showTooltipPercent=_;}},

        // options that require extra logic in the setter
        color: {get: function(){return color;}, set: function(_){
            color = _;
            sunburst.color(color);
        }},
        duration: {get: function(){return duration;}, set: function(_){
            duration = _;
            renderWatch.reset(duration);
            sunburst.duration(duration);
        }},
        margin: {get: function(){return margin;}, set: function(_){
            margin.top    = _.top    !== undefined ? _.top    : margin.top;
            margin.right  = _.right  !== undefined ? _.right  : margin.right;
            margin.bottom = _.bottom !== undefined ? _.bottom : margin.bottom;
            margin.left   = _.left   !== undefined ? _.left   : margin.left;
            sunburst.margin(margin);
        }}
    });
    nv.utils.inheritOptions(chart, sunburst);
    nv.utils.initOptions(chart);
    return chart;

};

nv.version = "1.8.6";
})();
//# sourceMappingURL=nv.d3.js.map