/* http://keith-wood.name/svg.html
   SVG plotting extension for jQuery v1.5.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) December 2008.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

$.svg.addExtension('plot', SVGPlot);

/** The SVG plotting manager.
	<p>Use the singleton instance of this class, $.svg.plot, 
	to interact with the SVG plotting functionality.</p>
	@module SVGPlot */
function SVGPlot(wrapper) {
	this._wrapper = wrapper; // The attached SVG wrapper object
	this._drawNow = false; // True for immediate update, false to wait for redraw call
	// The plot title and settings
	this._title = {value: '', offset: 25, settings: {textAnchor: 'middle'}};
	this._area = [0.1, 0.1, 0.8, 0.9]; // The chart area: left, top, right, bottom, > 1 in pixels, <= 1 as proportion
	this._areaFormat = {fill: 'none', stroke: 'black'}; // The formatting for the plot area
	this._gridlines = []; // The formatting of the x- and y-gridlines
	this._equalXY = true; // True for equal-sized x- and y-units, false to fill available space
	this._functions = []; // The functions to be plotted, each is an object
	this._onstatus = null; // The callback function for status updates
	this._uuid = new Date().getTime();
	this._plotCont = this._wrapper.svg(0, 0, 0, 0, {class_: 'svg-plot'}); // The main container for the plot

	/** The main x-axis for this plot. */
	this.xAxis = new SVGPlotAxis(this);
	this.xAxis.title('X', 20);
	/** The main y-axis for this plot. */
	this.yAxis = new SVGPlotAxis(this);
	this.yAxis.title('Y', 20);
	/** The legend for this plot. */
	this.legend = new SVGPlotLegend(this);
	this._drawNow = true;
}

$.extend(SVGPlot.prototype, {

	/* Useful indexes. */
	/** Index in a dimensions array for x-coordinate. */
	X: 0,
	/** Index in a dimensions array for y-coordinate. */
	Y: 1,
	/** Index in a dimensions array for width. */
	W: 2,
	/** Index in a dimensions array for height. */
	H: 3,
	/** Index in an area array for left x-coordinate. */
	L: 0,
	/** Index in an area array for top y-coordinate. */
	T: 1,
	/** Index in an area array for right x-coordinate. */
	R: 2,
	/** Index in an area array for bottom y-coordinate. */
	B: 3,

	/** Set or retrieve the container for the plot.
		@param cont {SVGElement} The container for the plot.
		@return {SVGPlot|SVGElement} This plot object or the current container (if no parameters). */
	container: function(cont) {
		if (arguments.length === 0) {
			return this._plotCont;
		}
		this._plotCont = cont;
		return this;
	},

	/** Set or retrieve the main plotting area.
		@param left {number|number[]} > 1 is pixels, <= 1 is proportion of width or array for left, top, right, bottom.
		@param [top] {number) > 1 is pixels, <= 1 is proportion of height.
		@param [right] {number) > 1 is pixels, <= 1 is proportion of width.
		@param [bottom] {number) > 1 is pixels, <= 1 is proportion of height.
		@return {SVGPlot|number[]} This plot object or the plotting area: left, top, right, bottom (if no parameters). */
	area: function(left, top, right, bottom) {
		if (arguments.length === 0) {
			return this._area;
		}
		this._area = ($.isArray(left) ? left : [left, top, right, bottom]);
		this._drawPlot();
		return this;
	},

	/** Set or retrieve the background of the plot area.
		@param fill {string} How to fill the area background.
		@param [stroke] {string} The colour of the outline.
		@param [settings] {object} Additional formatting for the area background.
		@return {SVGPlot|object} This plot object or the area format (if no parameters). */
	format: function(fill, stroke, settings) {
		if (arguments.length === 0) {
			return this._areaFormat;
		}
		if (typeof stroke === 'object') {
			settings = stroke;
			stroke = null;
		}
		this._areaFormat = $.extend({fill: fill}, (stroke ? {stroke: stroke} : {}), settings || {});
		this._drawPlot();
		return this;
	},

	/** Set or retrieve the gridlines formatting for the plot area.
		@param xSettings {string|object} The colour of the gridlines along the x-axis,
				or formatting for the gridlines along the x-axis, or <code>null</code> for none.
		@param ySettings {string|object} The colour of the gridlines along the y-axis,
				or formatting for the gridlines along the y-axis, or <code>null</code> for none.
		@return {SVGPlot|object[]} This plot object or the gridlines formatting (if no parameters). */
	gridlines: function(xSettings, ySettings) {
		if (arguments.length === 0) {
			return this._gridlines;
		}
		this._gridlines = [(typeof xSettings === 'string' ? {stroke: xSettings} : xSettings),
			(typeof ySettings === 'string' ? {stroke: ySettings} : ySettings)];
		if (this._gridlines[0] == null && this._gridlines[1] == null) {
			this._gridlines = [];
		}
		this._drawPlot();
		return this;
	},

	/** Set or retrieve the equality of the x- and y-axes.
		@param value {boolean} <code>true</code> for equal x- and y-units,
				<code>false</code> to fill the available space.
		@return {SVGPlot|boolean} This plot object or the current setting (if no parameters). */
	equalXY: function(value) {
		if (arguments.length === 0) {
			return this._equalXY;
		}
		this._equalXY = value;
		return this;
	},

	/** Set or retrieve the title of the plot and its formatting.
		@param value {string} The title.
		@param [offset] {number} The vertical positioning of the title, > 1 is pixels, <= 1 is proportion of width.
		@param [colour] {string} The colour of the title.
		@param [settings] {object} Formatting for the title.
		@return {SVGPlot|object} This plot object or value, offset, and settings for the title (if no parameters). */
	title: function(value, offset, colour, settings) {
		if (arguments.length === 0) {
			return this._title;
		}
		if (typeof offset !== 'number') {
			settings = colour;
			colour = offset;
			offset = null;
		}
		if (typeof colour !== 'string') {
			settings = colour;
			colour = null;
		}
		this._title = {value: value, offset: offset || this._title.offset,
			settings: $.extend({textAnchor: 'middle'}, (colour ? {fill: colour} : {}), settings || {})};
		this._drawPlot();
		return this;
	},

	/** Add a function to be plotted on the plot.
		@param [name] {string} The name of this series.
		@param fn {function} The function to be plotted.
		@param [range] {number[]} The range of values to plot.
		@param [points] {number} The number of points to plot within this range.
		@param [stroke] {string} The colour of the plotted lines.
		@param [strokeWidth] {number} The width of the plotted lines.
		@param [settings] {object} Additional settings for the plotted values.
		@return {SVGPlot} This plot object. */
	addFunction: function(name, fn, range, points, stroke, strokeWidth, settings) {
		this._functions.push(new SVGPlotFunction(this, name, fn, range, points, stroke, strokeWidth, settings));
		this._drawPlot();
		return this;
	},

	/** Retrieve the function wrappers.
		@param [i] {number} the function index.
		@return {SVGPlotFunction|SVGPlotFunction[]} the specified function or the list of functions. */
	functions: function(i) {
		return (arguments.length > 0 ? this._functions[i] : null) || this._functions;
	},

	/** Suppress drawing of the plot until redraw() is called.
		@return {SVGPlot} this plot object. */
	noDraw: function() {
		this._drawNow = false;
		return this;
	},

	/** Redraw the entire plot with the current settings and values.
		@return {SVGPlot} This plot object. */
	redraw: function() {
		this._drawNow = true;
		this._drawPlot();
		return this;
	},

	/** Set the callback function for status updates.
		@param onstatus {function} The callback function.
		@return {SVGPlot} This plot object. */
	status: function(onstatus) {
		this._onstatus = onstatus;
		return this;
	},

	/** Actually draw the plot (if allowed).
		@private */
	_drawPlot: function() {
		if (!this._drawNow) {
			return;
		}
		while (this._plotCont.firstChild) {
			this._plotCont.removeChild(this._plotCont.firstChild);
		}
		if (!this._plotCont.parent) {
			this._wrapper._svg.appendChild(this._plotCont);
		}
		// Set sizes if not already there
		if (!this._plotCont.width) {
			this._plotCont.setAttribute('width',
				parseInt(this._plotCont.getAttribute('width'), 10) || this._wrapper.width());
		}
		else if (this._plotCont.width.baseVal) {
			this._plotCont.width.baseVal.value = this._plotCont.width.baseVal.value || this._wrapper.width();
		}
		else {
			this._plotCont.width = this._plotCont.width || this._wrapper.width();
		}
		if (!this._plotCont.height) {
			this._plotCont.setAttribute('height',
				parseInt(this._plotCont.getAttribute('height'), 10) || this._wrapper.height());
		}
		else if (this._plotCont.height.baseVal) {
			this._plotCont.height.baseVal.value = this._plotCont.height.baseVal.value || this._wrapper.height();
		}
		else {
			this._plotCont.height = this._plotCont.height || this._wrapper.height();
		}
		this._drawChartBackground();
		var dims = this._getDims();
		var clip = this._wrapper.other(this._plotCont, 'clipPath', {id: 'clip' + this._uuid});
		this._wrapper.rect(clip, dims[this.X], dims[this.Y], dims[this.W], dims[this.H]);
		this._plot = this._wrapper.group(this._plotCont,
			{class_: 'foreground', clipPath: 'url(#clip' + this._uuid + ')'});
		this._drawAxis(true);
		this._drawAxis(false);
		for (var i = 0; i < this._functions.length; i++) {
			this._plotFunction(this._functions[i], i);
		}
		this._drawTitle();
		this._drawLegend();
	},

	/** Decode an attribute value.
		@private
		@param node {SVGElement} The node to examine.
		@param name {string} The attribute name.
		@return {string} The actual value. */
	_getValue: function(node, name) {
		return (!node[name] ? parseInt(node.getAttribute(name), 10) :
			(node[name].baseVal ? node[name].baseVal.value : node[name]));
	},

	/** Calculate the actual dimensions of the plot area.
		@private
		@param [area] {number[]} The area values to evaluate, or the current area if not specified.
		@return {number[]} An array of dimension values: left, top, width, height. */
	_getDims: function(area) {
		var otherArea = (area != null);
		area = area || this._area;
		var availWidth = this._getValue(this._plotCont, 'width');
		var availHeight = this._getValue(this._plotCont, 'height');
		var left = (area[this.L] > 1 ? area[this.L] : availWidth * area[this.L]);
		var top = (area[this.T] > 1 ? area[this.T] : availHeight * area[this.T]);
		var width = (area[this.R] > 1 ? area[this.R] : availWidth * area[this.R]) - left;
		var height = (area[this.B] > 1 ? area[this.B] : availHeight * area[this.B]) - top;
		if (this._equalXY && !otherArea) {
			var scale = Math.min(width / (this.xAxis._scale.max - this.xAxis._scale.min),
				height / (this.yAxis._scale.max - this.yAxis._scale.min));
			width = scale * (this.xAxis._scale.max - this.xAxis._scale.min);
			height = scale * (this.yAxis._scale.max - this.yAxis._scale.min);
		}
		return [left, top, width, height];
	},

	/** Calculate the scaling factors for the plot area.
		@private
		@return {number[]} The x- and y-scaling factors. */
	_getScales: function() {
		var dims = this._getDims();
		return [dims[this.W] / (this.xAxis._scale.max - this.xAxis._scale.min),
			dims[this.H] / (this.yAxis._scale.max - this.yAxis._scale.min)];
	},

	/** Draw the chart background, including gridlines.
		@private
		@param [noXGrid] {boolean} <code>true</code> to suppress the x-gridlines, <code>false</code> to draw them.
		@param [noYGrid] {boolean} <code>true</code> to suppress the y-gridlines, <code>false</code> to draw them.
		@return {SVGElement} The background group element. */
	_drawChartBackground: function(noXGrid, noYGrid) {
		var bg = this._wrapper.group(this._plotCont, {class_: 'background'});
		var dims = this._getDims();
		this._wrapper.rect(bg, dims[this.X], dims[this.Y], dims[this.W], dims[this.H], this._areaFormat);
		if (this._gridlines[0] && this.yAxis._ticks.major && !noYGrid) {
			this._drawGridlines(bg, true, this._gridlines[0], dims);
		}
		if (this._gridlines[1] && this.xAxis._ticks.major && !noXGrid) {
			this._drawGridlines(bg, false, this._gridlines[1], dims);
		}
		return bg;
	},

	/** Draw one set of gridlines.
		@private
		@param bg {SVGElement} The background group element.
		@param horiz {boolean} <code>true</code> if horizontal, <code>false</code> if vertical.
		@param format {object} Additional settings for the gridlines. */
	_drawGridlines: function(bg, horiz, format, dims) {
		var g = this._wrapper.group(bg, format);
		var axis = (horiz ? this.yAxis : this.xAxis);
		var scales = this._getScales();
		var major = Math.floor(axis._scale.min / axis._ticks.major) * axis._ticks.major;
		major += (major <= axis._scale.min ? axis._ticks.major : 0);
		while (major < axis._scale.max) {
			var v = (horiz ? axis._scale.max - major : major - axis._scale.min) *
				scales[horiz ? 1 : 0] + (horiz ? dims[this.Y] : dims[this.X]);
			this._wrapper.line(g, (horiz ? dims[this.X] : v), (horiz ? v : dims[this.Y]),
				(horiz ? dims[this.X] + dims[this.W] : v), (horiz ? v : dims[this.Y] + dims[this.H]));
			major += axis._ticks.major;
		}
	},

	/** Draw an axis, its tick marks, and title.
		@private
		@param horiz {boolean} <code>true</code> for x-axis, <code>false</code> for y-axis. */
	_drawAxis: function(horiz) {
		var id = (horiz ? 'x' : 'y') + 'Axis';
		var axis = (horiz ? this.xAxis : this.yAxis);
		var axis2 = (horiz ? this.yAxis : this.xAxis);
		var dims = this._getDims();
		var scales = this._getScales();
		var gl = this._wrapper.group(this._plot, $.extend({class_: id}, axis._lineFormat));
		var gt = this._wrapper.group(this._plot, $.extend({class_: id + 'Labels',
			textAnchor: (horiz ? 'middle' : 'end')}, axis._labelFormat));
		var zero = (horiz ? axis2._scale.max : -axis2._scale.min) *
			scales[horiz ? 1 : 0] + (horiz ? dims[this.Y] : dims[this.X]);
		this._wrapper.line(gl, (horiz ? dims[this.X] : zero), (horiz ? zero : dims[this.Y]),
			(horiz ? dims[this.X] + dims[this.W] : zero), (horiz ? zero : dims[this.Y] + dims[this.H]));
		if (axis._ticks.major) {
			var size = axis._ticks.size;
			var major = Math.floor(axis._scale.min / axis._ticks.major) * axis._ticks.major;
			major = (major < axis._scale.min ? major + axis._ticks.major : major);
			var minor = (!axis._ticks.minor ? axis._scale.max + 1 :
				Math.floor(axis._scale.min / axis._ticks.minor) * axis._ticks.minor);
			minor = (minor < axis._scale.min ? minor + axis._ticks.minor : minor);
			var offsets = [(axis._ticks.position === 'nw' || axis._ticks.position === 'both' ? -1 : 0),
				(axis._ticks.position === 'se' || axis._ticks.position === 'both' ? +1 : 0)];
			while (major <= axis._scale.max || minor <= axis._scale.max) {
				var cur = Math.min(major, minor);
				var len = (cur === major ? size : size / 2);
				var xy = (horiz ? cur - axis._scale.min : axis._scale.max - cur) *
					scales[horiz ? 0 : 1] + (horiz ? dims[this.X] : dims[this.Y]);
				this._wrapper.line(gl, (horiz ? xy : zero + len * offsets[0]), (horiz ? zero + len * offsets[0] : xy),
					(horiz ? xy : zero + len * offsets[1]), (horiz ? zero + len * offsets[1] : xy));
				if (cur === major && cur !== 0) {
					this._wrapper.text(gt, (horiz ? xy : zero - size), (horiz ? zero - size : xy), '' + cur);
				}
				major += (cur === major ? axis._ticks.major : 0);
				minor += (cur === minor ? axis._ticks.minor : 0);
			}
		}
		if (axis._title) {
			if (horiz) {
				this._wrapper.text(this._plotCont, dims[this.X] - axis._titleOffset,
					zero, axis._title, $.extend({textAnchor: 'end'}, axis._titleFormat || {}));
			}
			else {
				this._wrapper.text(this._plotCont, zero, dims[this.Y] + dims[this.H] + axis._titleOffset,
					axis._title, $.extend({textAnchor : 'middle'}, axis._titleFormat || {}));
			}
		}
	},

	/** Plot an individual function.
		@private
		@param fn {function} The function to plot.
		@param cur {number} The current function index. */
	_plotFunction: function(fn, cur) {
		var dims = this._getDims();
		var scales = this._getScales();
		var path = this._wrapper.createPath();
		var range = fn._range || [this.xAxis._scale.min, this.xAxis._scale.max];
		var xScale = (range[1] - range[0]) / fn._points;
		var first = true;
		for (var i = 0; i <= fn._points; i++) {
			var x = range[0] + i * xScale;
			if (x > this.xAxis._scale.max + xScale) {
				break;
			}
			if (x < this.xAxis._scale.min - xScale) {
				continue;
			}
			var px = (x - this.xAxis._scale.min) * scales[0] + dims[this.X];
			var py = dims[this.H] - ((fn._fn(x) - this.yAxis._scale.min) * scales[1]) + dims[this.Y];
			path[(first ? 'move' : 'line') + 'To'](px, py);
			first = false;
		}
		var p = this._wrapper.path(this._plot, path, $.extend({class_: 'fn' + cur, fill: 'none', stroke: fn._stroke,
			strokeWidth: fn._strokeWidth}, fn._settings || {}));
		this._showStatus(p, fn._name);
	},

	/** Draw the plot title - centred
		@private */
	_drawTitle: function() {
		this._wrapper.text(this._plotCont, this._getValue(this._plotCont, 'width') / 2,
			this._title.offset, this._title.value, this._title.settings);
	},

	/** Draw the chart legend.
		@private */
	_drawLegend: function() {
		if (!this.legend._show) {
			return;
		}
		var g = this._wrapper.group(this._plotCont, {class_: 'legend'});
		var dims = this._getDims(this.legend._area);
		this._wrapper.rect(g, dims[this.X], dims[this.Y], dims[this.W], dims[this.H], this.legend._bgSettings);
		var horiz =  dims[this.W] > dims[this.H];
		var numFn = this._functions.length;
		var offset = (horiz ? dims[this.W] : dims[this.H]) / numFn;
		var xBase = dims[this.X] + 5;
		var yBase = dims[this.Y] + ((horiz ? dims[this.H] : offset) + this.legend._sampleSize) / 2;
		for (var i = 0; i < numFn; i++) {
			var fn = this._functions[i];
			this._wrapper.rect(g, xBase + (horiz ? i * offset : 0),
				yBase + (horiz ? 0 : i * offset) - this.legend._sampleSize,
				this.legend._sampleSize, this.legend._sampleSize, {fill: fn._stroke});
			this._wrapper.text(g, xBase + (horiz ? i * offset : 0) + this.legend._sampleSize + 5,
				yBase + (horiz ? 0 : i * offset), fn._name, this.legend._textSettings);
		}
	},

	/** Show the current value status on hover.
		@private
		@param elem {SVGElement} The current plot element.
		@param label {string} The current status label. */
	_showStatus: function(elem, label) {
		var status = this._onstatus;
		if (this._onstatus) {
			$(elem).hover(function(evt) { status.apply(this, [label]); },
				function() { status.apply(this, ['']); });
		}
	}
});

/** A plot function definition.
	@module SVGPlotFunction */
	
/** Details about each plot function.
	<p>Created through <code>plot.addFunction()</code>.</p>
	@param plot {SVGPlot} The owning plot.
	@param [name] {string} The name of this function.
	@param fn {function} The function to be plotted.
	@param [range] {number[]} The range of values to be plotted.
	@param [points] {number} The number of points to plot within this range.
	@param [stroke] {string} The colour of the (out)line for the plot.
	@param [strokeWidth] {number} The width of the (out)line for the plot.
	@param [settings] {object} Additional settings for the plotted values.
	@return {SVGPlotFunction} The new plot function object. */
function SVGPlotFunction(plot, name, fn, range, points, stroke, strokeWidth, settings) {
	if (typeof name !== 'string') {
		settings = strokeWidth;
		strokeWidth = stroke;
		stroke = points;
		points = range;
		range = fn;
		fn = name;
		name = null;
	}
	if (!$.isArray(range)) {
		settings = strokeWidth;
		strokeWidth = stroke;
		stroke = points;
		points = range;
		range = null;
	}
	if (typeof points !== 'number') {
		settings = strokeWidth;
		strokeWidth = stroke;
		stroke = points;
		points = null;
	}
	if (typeof stroke !== 'string') {
		settings = strokeWidth;
		strokeWidth = stroke;
		stroke = null;
	}
	if (typeof strokeWidth !== 'number') {
		settings = strokeWidth;
		strokeWidth = null;
	}
	this._plot = plot; // The owning plot
	this._name = name || ''; // Display name
	this._fn = fn || identity; // The actual function: y = fn(x)
	this._range = range; // The range of values plotted
	this._points = points || 100; // The number of points plotted
	this._stroke = stroke || 'black'; // The line colour
	this._strokeWidth = strokeWidth || 1; // The line width
	this._settings = settings || {}; // Any other settings
}

$.extend(SVGPlotFunction.prototype, {

	/** Set or retrieve the name for this function.
		@param name {string} The function's name.
		@return {SVGPlotFunction|string} This plot function object or the function name (if no parameters). */
	name: function(name) {
		if (arguments.length === 0) {
			return this._name;
		}
		this._name = name;
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the function to be plotted.
		@param [name] {string} The function's name.
		@param fn {function} The function to be ploted.
		@return {SVGPlotFunction|function} This plot function object or the actual function (if no parameters). */
	fn: function(name, fn) {
		if (arguments.length === 0) {
			return this._fn;
		}
		if (typeof name === 'function') {
			fn = name;
			name = null;
		}
		this._name = name || this._name;
		this._fn = fn;
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the range of values to be plotted.
		@param min {number} The minimum value to be plotted.
		@param max {number} The maximum value to be plotted.
		@return {SVGPlotFunction|number[]} This plot function object or the value range (if no parameters). */
	range: function(min, max) {
		if (arguments.length === 0) {
			return this._range;
		}
		this._range = (min == null ? null : [min, max]);
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the number of points to be plotted.
		@param value {number} The number of points to plot.
		@return {SVGPlotFunction|number} This plot function object or the number of points (if no parameters). */
	points: function(value) {
		if (arguments.length === 0) {
			return this._points;
		}
		this._points = value;
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the formatting for this function.
		@param stroke {string} The (out)line colour.
		@param [strokeWidth] {number} The line's width.
		@param [settings] {object} Additional formatting settings for the function.
		@return {SVGPlotFunction|object} This plot function object or formatting settings (if no parameters). */
	format: function(stroke, strokeWidth, settings) {
		if (arguments.length === 0) {
			return $.extend({stroke: this._stroke, strokeWidth: this._strokeWidth}, this._settings);
		}
		if (typeof strokeWidth !== 'number') {
			settings = strokeWidth;
			strokeWidth = null;
		}
		this._stroke = stroke || this._stroke;
		this._strokeWidth = strokeWidth || this._strokeWidth;
		$.extend(this._settings, settings || {});
		this._plot._drawPlot();
		return this;
	},

	/** Return to the parent plot.
		@return {SVGPlot} The parent plot. */
	end: function() {
		return this._plot;
	}
});

/* Default function to plot.
   @param  x  (number) the input value
   @return  (number) the same value */
function identity(x) {
	return x;
}

/** A plot axis definition.
	@module SVGPlotAxis */
	
/** Details about each plot axis.
	<p>Accessed through <code>plot.xAxis</code> or <code>plot.yAxis</code>.</p>
	@param plot {SVGPlot} The owning plot.
	@param title {string} The title of the axis.
	@param min {number} The minimum value displayed on this axis.
	@param max {number} The maximum value displayed on this axis.
	@param major {number} The distance between major ticks.
	@param [minor] {number} The distance between minor ticks.
	@return {SVGPlotAxis} The new plot axis object. */
function SVGPlotAxis(plot, title, min, max, major, minor) {
	this._plot = plot; // The owning plot
	this._title = title || ''; // The plot's title
	this._titleFormat = {}; // Formatting settings for the title
	this._titleOffset = 0; // The offset for positioning the title
	this._labelFormat = {}; // Formatting settings for the labels
	this._lineFormat = {stroke: 'black', strokeWidth: 1}; // Formatting settings for the axis lines
	this._ticks = {major: major || 10, minor: minor || 0, size: 10, position: 'both'}; // Tick mark options
	this._scale = {min: min || 0, max: max || 100}; // Axis scale settings
	this._crossAt = 0; // Where this axis crosses the other one. */
}

$.extend(SVGPlotAxis.prototype, {

	/** Set or retrieve the scale for this axis.
		@param min {number} The minimum value shown.
		@param max {number} The maximum value shown.
		@return {SVGPlotAxis|object} This axis object or min and max values (if no parameters). */
	scale: function(min, max) {
		if (arguments.length === 0) {
			return this._scale;
		}
		this._scale.min = min;
		this._scale.max = max;
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the ticks for this axis.
		@param major {number} The distance between major ticks.
		@param minor {number} The distance between minor ticks.
		@param [size] {number} The length of the major ticks (minor are half).
		@param [position] {string} The location of the ticks: 'nw', 'se', 'both'.
		@return {SVGPlotAxis|object} This axis object or major, minor, size, and position values (if no parameters). */
	ticks: function(major, minor, size, position) {
		if (arguments.length === 0) {
			return this._ticks;
		}
		if (typeof size === 'string') {
			position = size;
			size = null;
		}
		this._ticks.major = major;
		this._ticks.minor = minor;
		this._ticks.size = size || this._ticks.size;
		this._ticks.position = position || this._ticks.position;
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the title for this axis.
		@param title {string} The title text
		@param [offset] {number} The distance to offset the title position.
		@param [colour] {string} How to colour the title. 
		@param [format] {object} Formatting settings for the title.
		@return {SVGPlotAxis|object} This axis object or title, offset, and format values (if no parameters). */
	title: function(title, offset, colour, format) {
		if (arguments.length === 0) {
			return {title: this._title, offset: this._titleOffset, format: this._titleFormat};
		}
		if (typeof offset !== 'number') {
			format = colour;
			colour = offset;
			offset = null;
		}
		if (typeof colour !== 'string') {
			format = colour;
			colour = null;
		}
		this._title = title;
		this._titleOffset = (offset != null ? offset : this._titleOffset);
		if (colour || format) {
			this._titleFormat = $.extend(format || {}, (colour ? {fill: colour} : {}));
		}
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the label format for this axis.
		@param [colour] {string} How to colour the labels. 
		@param [format] {object} Formatting settings for the labels.
		@return {SVGPlotAxis|object} This axis object or format values (if no parameters). */
	format: function(colour, format) {
		if (arguments.length === 0) {
			return this._labelFormat;
		}
		if (typeof colour !== 'string') {
			format = colour;
			colour = null;
		}
		this._labelFormat = $.extend(format || {}, (colour ? {fill: colour} : {}));
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the line formatting for this axis.
		@param colour {string} The line's colour.
		@param [width] {number} The line's width.
		@param [settings] {object} Additional formatting settings for the line.
		@return {SVGPlotAxis|object} This axis object or line formatting values (if no parameters). */
	line: function(colour, width, settings) {
		if (arguments.length === 0) {
			return this._lineFormat;
		}
		if (typeof width !== 'number') {
			settings = width;
			width = null;
		}
		$.extend(this._lineFormat, {stroke: colour, strokeWidth: width || this._lineFormat.strokeWidth}, settings || {});
		this._plot._drawPlot();
		return this;
	},

	/** Return to the parent plot.
		@return {SVGPlot} The parent plot. */
	end: function() {
		return this._plot;
	}
});

/** A plot legend definition.
	@module SVGPlotLegend */
	
/** Details about each plot legend.
	<p>Accessed through <code>plot.legend</code>.</p>
	@param plot {SVGPlot} The owning plot.
	@param [bgSettings] {object} Additional formatting settings for the legend background.
	@param [textSettings] {object} Additional formatting settings for the legend text.
	@return {SVGPlotLegend} The new plot legend object. */
function SVGPlotLegend(plot, bgSettings, textSettings) {
	this._plot = plot; // The owning plot
	this._show = true; // Show the legend?
	this._area = [0.9, 0.1, 1.0, 0.9]; // The legend area: left, top, right, bottom,
		// > 1 in pixels, <= 1 as proportion
	this._sampleSize = 15; // Size of sample box
	this._bgSettings = bgSettings || {stroke: 'gray'}; // Additional formatting settings for the legend background
	this._textSettings = textSettings || {}; // Additional formatting settings for the text
}

$.extend(SVGPlotLegend.prototype, {

	/** Set or retrieve whether the legend should be shown.
		@param show {boolean} <code>true</code> to display it, <code>false</code> to hide it.
		@return {SVGPlotLegend|boolean} This legend object or show the legend? (if no parameters) */
	show: function(show) {
		if (arguments.length === 0) {
			return this._show;
		}
		this._show = show;
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve the legend area.
		@param left {number|number[]} > 1 is pixels, <= 1 is proportion of width or array for left, top, right, bottom.
		@param [top] {number} > 1 is pixels, <= 1 is proportion of height.
		@param [right] {number} > 1 is pixels, <= 1 is proportion of width.
		@param [bottom] {number} > 1 is pixels, <= 1 is proportion of height.
		@return {SVGPlotLegend|number[]} This legend object or the legend area:
				left, top, right, bottom (if no parameters). */
	area: function(left, top, right, bottom) {
		if (arguments.length === 0) {
			return this._area;
		}
		this._area = ($.isArray(left) ? left : [left, top, right, bottom]);
		this._plot._drawPlot();
		return this;
	},

	/** Set or retrieve additional settings for the legend area.
		@param [sampleSize] {number} The size of the sample box to display.
		@param bgSettings {object} Additional formatting settings for the legend background.
		@param [textSettings] {object} Additional formatting settings for the legend text.
		@return {SVGPlotLegend|object} This legend object or
				bgSettings and textSettings for the legend (if no parameters). */
	settings: function(sampleSize, bgSettings, textSettings) {
		if (arguments.length === 0) {
			return {sampleSize: this._sampleSize, bgSettings: this._bgSettings, textSettings: this._textSettings};
		}
		if (typeof sampleSize === 'object') {
			textSettings = bgSettings;
			bgSettings = sampleSize;
			sampleSize = null;
		}
		this._sampleSize = sampleSize || this._sampleSize;
		this._bgSettings = bgSettings;
		this._textSettings = textSettings || this._textSettings;
		this._plot._drawPlot();
		return this;
	},

	/** Return to the parent plot.
		@return {SVGPlot} The parent plot. */
	end: function() {
		return this._plot;
	}
});

})(jQuery)
