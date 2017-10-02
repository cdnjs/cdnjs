/* http://keith-wood.name/svg.html
   SVG for jQuery v1.5.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2007.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/** The SVG manager.
	<p>Use the singleton instance of this class, $.svg, 
	to interact with the SVG functionality.</p>
	<p>Expects HTML like:</p>
	<pre>&lt;div>&lt;/div></pre>
	@module SVGManager */
function SVGManager() {
	this._settings = []; // Settings to be remembered per SVG object
	this._extensions = []; // List of SVG extensions added to SVGWrapper
		// for each entry [0] is extension name, [1] is extension class (function)
		// the function takes one parameter - the SVGWrapper instance
	this.regional = []; // Localisations, indexed by language, '' for default (English)
	this.regional[''] = {errorLoadingText: 'Error loading'};
	this.local = this.regional['']; // Current localisation
	this._uuid = new Date().getTime();
	this._ie = !!window.ActiveXObject;
}

$.extend(SVGManager.prototype, {
	/** Class name added to elements to indicate already configured with SVG. */
	markerClassName: 'hasSVG',
	/** Name of the data property for instance settings. */
	propertyName: 'svgwrapper',

	/** SVG namespace. */
	svgNS: 'http://www.w3.org/2000/svg',
	/** XLink namespace. */
	xlinkNS: 'http://www.w3.org/1999/xlink',

	/** SVG wrapper class. */
	_wrapperClass: SVGWrapper,

	/* Camel-case versions of attribute names containing dashes or are reserved words. */
	_attrNames: {class_: 'class', in_: 'in',
		alignmentBaseline: 'alignment-baseline', baselineShift: 'baseline-shift',
		clipPath: 'clip-path', clipRule: 'clip-rule',
		colorInterpolation: 'color-interpolation',
		colorInterpolationFilters: 'color-interpolation-filters',
		colorRendering: 'color-rendering', dominantBaseline: 'dominant-baseline',
		enableBackground: 'enable-background', fillOpacity: 'fill-opacity',
		fillRule: 'fill-rule', floodColor: 'flood-color',
		floodOpacity: 'flood-opacity', fontFamily: 'font-family',
		fontSize: 'font-size', fontSizeAdjust: 'font-size-adjust',
		fontStretch: 'font-stretch', fontStyle: 'font-style',
		fontVariant: 'font-variant', fontWeight: 'font-weight',
		glyphOrientationHorizontal: 'glyph-orientation-horizontal',
		glyphOrientationVertical: 'glyph-orientation-vertical',
		horizAdvX: 'horiz-adv-x', horizOriginX: 'horiz-origin-x',
		imageRendering: 'image-rendering', letterSpacing: 'letter-spacing',
		lightingColor: 'lighting-color', markerEnd: 'marker-end',
		markerMid: 'marker-mid', markerStart: 'marker-start',
		stopColor: 'stop-color', stopOpacity: 'stop-opacity',
		strikethroughPosition: 'strikethrough-position',
		strikethroughThickness: 'strikethrough-thickness',
		strokeDashArray: 'stroke-dasharray', strokeDashOffset: 'stroke-dashoffset',
		strokeLineCap: 'stroke-linecap', strokeLineJoin: 'stroke-linejoin',
		strokeMiterLimit: 'stroke-miterlimit', strokeOpacity: 'stroke-opacity',
		strokeWidth: 'stroke-width', textAnchor: 'text-anchor',
		textDecoration: 'text-decoration', textRendering: 'text-rendering',
		underlinePosition: 'underline-position', underlineThickness: 'underline-thickness',
		vertAdvY: 'vert-adv-y', vertOriginY: 'vert-origin-y',
		wordSpacing: 'word-spacing', writingMode: 'writing-mode'},

	/* Add the SVG object to its container. */
	_attachSVG: function(container, settings) {
		var svg = (container.namespaceURI === this.svgNS ? container : null);
		var container = (svg ? null : container);
		if ($(container || svg).hasClass(this.markerClassName)) {
			return;
		}
		if (typeof settings === 'string') {
			settings = {loadURL: settings};
		}
		else if (typeof settings === 'function') {
			settings = {onLoad: settings};
		}
		$(container || svg).addClass(this.markerClassName);
		try {
			if (!svg) {
				svg = document.createElementNS(this.svgNS, 'svg');
				svg.setAttribute('version', '1.1');
				if (container.clientWidth > 0) {
					svg.setAttribute('width', container.clientWidth);
				}
				if (container.clientHeight > 0) {
					svg.setAttribute('height', container.clientHeight);
				}
				container.appendChild(svg);
			}
			this._afterLoad(container, svg, settings || {});
		}
		catch (e) {
			$(container).html('<p>SVG is not supported natively on this browser</p>');
		}
	},

	/* Post-processing once loaded. */
	_afterLoad: function(container, svg, settings) {
		var settings = settings || this._settings[container.id];
		this._settings[container ? container.id : ''] = null;
		var wrapper = new this._wrapperClass(svg, container);
		$.data(container || svg, $.svg.propertyName, wrapper);
		try {
			if (settings.loadURL) { // Load URL
				wrapper.load(settings.loadURL, settings);
			}
			if (settings.settings) { // Additional settings
				wrapper.configure(settings.settings);
			}
			if (settings.onLoad && !settings.loadURL) { // Onload callback
				settings.onLoad.apply(container || svg, [wrapper]);
			}
		}
		catch (e) {
			alert(e);
		}
	},

	/** Return the SVG wrapper created for a given container.
		@param container {string|Element|jQuery} Selector for the container or
				the container for the SVG object or jQuery collection where first entry is the container.
		@return {SVGWrapper} The corresponding SVG wrapper element, or <code>null</code> if not attached. */
	_getSVG: function(container) {
		return $(container).data(this.propertyName);
	},

	/** Remove the SVG functionality from a div.
		@param container {Element} The container for the SVG object. */
	_destroySVG: function(container) {
		container = $(container);
		if (!container.hasClass(this.markerClassName)) {
			return;
		}
		container.removeClass(this.markerClassName).removeData(this.propertyName);
		if (container[0].namespaceURI !== this.svgNS) {
			container.empty();
		}
	},

	/** Extend the SVGWrapper object with an embedded class.
		<p>The constructor function must take a single parameter that is
	   a reference to the owning SVG root object. This allows the 
		extension to access the basic SVG functionality.</p>
		@param name {string} The name of the <code>SVGWrapper</code> attribute to access the new class.
		@param extClass {function} The extension class constructor. */
	addExtension: function(name, extClass) {
		this._extensions.push([name, extClass]);
	},

	/** Does this node belong to SVG?
		@param node {Element} The node to be tested.
		@return {boolean} <code>true</code> if an SVG node, <code>false</code> if not. */
	isSVGElem: function(node) {
		return (node.nodeType === 1 && node.namespaceURI === $.svg.svgNS);
	}
});

/** The main SVG interface, which encapsulates the SVG element.
	<p>Obtain a reference from $().svg('get')</p>
	@module SVGWrapper */
function SVGWrapper(svg, container) {
	this._svg = svg; // The SVG root node
	this._container = container; // The containing div
	for (var i = 0; i < $.svg._extensions.length; i++) {
		var extension = $.svg._extensions[i];
		this[extension[0]] = new extension[1](this);
	}
}

$.extend(SVGWrapper.prototype, {

	/** Retrieve the width of the SVG object.
		@return {number} The width of the SVG canvas. */
	width: function() {
		return (this._container ? this._container.clientWidth : this._svg.width);
	},

	/** Retrieve the height of the SVG object.
		@return {number} The height of the SVG canvas. */
	height: function() {
		return (this._container ? this._container.clientHeight : this._svg.height);
	},

	/** Retrieve the root SVG element.
		@return {SVGElement} The top-level SVG element. */
	root: function() {
		return this._svg;
	},

	/** Configure a SVG node.
		@param [node] {SVGElement} The node to configure, or the SVG root if not specified.
		@param settings {object} Additional settings for the root.
		@param [clear=false] {boolean} <code>true</code> to remove existing attributes first,
				<code>false</code> to add to what is already there.
		@return {SVGWrapper} This wrapper. */
	configure: function(node, settings, clear) {
		if (!node.nodeName) {
			clear = settings;
			settings = node;
			node = this._svg;
		}
		if (clear) {
			for (var i = node.attributes.length - 1; i >= 0; i--) {
				var attr = node.attributes.item(i);
				if (!(attr.nodeName === 'onload' || attr.nodeName === 'version' || 
						attr.nodeName.substring(0, 5) === 'xmlns')) {
					node.attributes.removeNamedItem(attr.nodeName);
				}
			}
		}
		for (var attrName in settings) {
			node.setAttribute($.svg._attrNames[attrName] || attrName, settings[attrName]);
		}
		return this;
	},

	/** Locate a specific element in the SVG document.
		@param id {string} The element's identifier.
		@return {SVGElement} The element reference, or <code>null</code> if not found. */
	getElementById: function(id) {
		return this._svg.ownerDocument.getElementById(id);
	},

	/** Change the attributes for a SVG node.
		@param element {SVGElement} The node to change.
		@param settings {object} The new settings.
		@return {SVGWrapper} This wrapper. */
	change: function(element, settings) {
		if (element) {
			for (var name in settings) {
				if (settings[name] == null) {
					element.removeAttribute($.svg._attrNames[name] || name);
				}
				else {
					element.setAttribute($.svg._attrNames[name] || name, settings[name]);
				}
			}
		}
		return this;
	},

	/** Check for parent being absent and adjust arguments accordingly.
		@private
		@param values {string[]} The given parameters.
		@param names {string[]} The names of the parameters in order.
		@param optSettings {string[]} The names of optional parameters.
		@return {object} An object representing the named parameters. */
	_args: function(values, names, optSettings) {
		names.splice(0, 0, 'parent');
		names.splice(names.length, 0, 'settings');
		var args = {};
		var offset = 0;
		if (values[0] != null && values[0].jquery) {
			values[0] = values[0][0];
		}
		if (values[0] != null && !(typeof values[0] === 'object' && values[0].nodeName)) {
			args['parent'] = null;
			offset = 1;
		}
		for (var i = 0; i < values.length; i++) {
			args[names[i + offset]] = values[i];
		}
		if (optSettings) {
			$.each(optSettings, function(i, value) {
				if (typeof args[value] === 'object') {
					args.settings = args[value];
					args[value] = null;
				}
			});
		}
		return args;
	},

	/** Add a title.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param text {string} The text of the title.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new title node. */
	title: function(parent, text, settings) {
		var args = this._args(arguments, ['text']);
		var node = this._makeNode(args.parent, 'title', args.settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
		return node;
	},

	/** Add a description.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param text {string} The text of the description.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new description node. */
	describe: function(parent, text, settings) {
		var args = this._args(arguments, ['text']);
		var node = this._makeNode(args.parent, 'desc', args.settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(args.text));
		return node;
	},

	/** Add a definitions node.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param [id] {string} The ID of this definitions (optional).
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new definitions node. */
	defs: function(parent, id, settings) {
		var args = this._args(arguments, ['id'], ['id']);
		return this._makeNode(args.parent, 'defs', $.extend((args.id ? {id: args.id} : {}), args.settings || {}));
	},

	/** Add a symbol definition.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID of this symbol.
		@param x1 {number} The left coordinate for this symbol.
		@param y1 {number} The top coordinate for this symbol.
		@param width {number} The width of this symbol.
		@param height {number} The height of this symbol.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new symbol node. */
	symbol: function(parent, id, x1, y1, width, height, settings) {
		var args = this._args(arguments, ['id', 'x1', 'y1', 'width', 'height']);
		return this._makeNode(args.parent, 'symbol', $.extend({id: args.id,
				viewBox: args.x1 + ' ' + args.y1 + ' ' + args.width + ' ' + args.height}, args.settings || {}));
	},

	/** Add a marker definition.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID of this marker.
		@param refX {number} The x-coordinate for the reference point.
		@param refY {number} The y-coordinate for the reference point.
		@param mWidth {number} The marker viewport width.
		@param mHeight {number} The marker viewport height.
		@param [orient] {string|number} 'auto' or angle (degrees).
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new marker node. */
	marker: function(parent, id, refX, refY, mWidth, mHeight, orient, settings) {
		var args = this._args(arguments, ['id', 'refX', 'refY', 'mWidth', 'mHeight', 'orient'], ['orient']);
		return this._makeNode(args.parent, 'marker', $.extend(
			{id: args.id, refX: args.refX, refY: args.refY, markerWidth: args.mWidth, 
			markerHeight: args.mHeight, orient: args.orient || 'auto'}, args.settings || {}));
	},

	/** Add a style node.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param styles {string} The CSS styles.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new style node. */
	style: function(parent, styles, settings) {
		var args = this._args(arguments, ['styles']);
		var node = this._makeNode(args.parent, 'style', $.extend({type: 'text/css'}, args.settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(args.styles));
		return node;
	},

	/** Add a script node.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param script {string} The JavaScript code.
		@param [type='text/javascript'] {string} The MIME type for the code.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new script node. */
	script: function(parent, script, type, settings) {
		var args = this._args(arguments, ['script', 'type'], ['type']);
		var node = this._makeNode(args.parent, 'script', $.extend(
			{type: args.type || 'text/javascript'}, args.settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(args.script));
		if ($.svg._ie) {
			$.globalEval(args.script);
		}
		return node;
	},

	/** Add a linear gradient definition.
		<p>Specify all of <code>x1</code>, <code>y1</code>, <code>x2</code>, <code>y2</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID for this gradient.
		@param stops {string[][]} The gradient stops, each entry is [0] is offset (0.0-1.0 or 0%-100%),
				[1] is colour, [2] is opacity (optional).
		@param [x1] {number} The x-coordinate of the gradient start.
		@param [y1] {number} The y-coordinate of the gradient start.
		@param [x2] {number} The x-coordinate of the gradient end.
		@param [y2] {number} The y-coordinate of the gradient end.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new linear gradient node. */
	linearGradient: function(parent, id, stops, x1, y1, x2, y2, settings) {
		var args = this._args(arguments, ['id', 'stops', 'x1', 'y1', 'x2', 'y2'], ['x1']);
		var sets = $.extend({id: args.id},
				(args.x1 != null ? {x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2} : {}));
		return this._gradient(args.parent, 'linearGradient', $.extend(sets, args.settings || {}), args.stops);
	},

	/** Add a radial gradient definition.
		<p>Specify all of <code>cx</code>, <code>cy</code>, <code>r</code>,
		<code>fx</code>, <code>fy</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID for this gradient.
		@param stops {string[][]} The gradient stops, each entry [0] is offset (0.0-1.0 or 0%-100%),
				[1] is colour, [2] is opacity (optional).
		@param [cx] {number} The x-coordinate of the largest circle centre.
		@param [cy] {number} The y-coordinate of the largest circle centre.
		@param [r] {number} The radius of the largest circle.
		@param [fx] {number} The x-coordinate of the gradient focus.
		@param [fy] {number} The y-coordinate of the gradient focus.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new radial gradient node. */
	radialGradient: function(parent, id, stops, cx, cy, r, fx, fy, settings) {
		var args = this._args(arguments, ['id', 'stops', 'cx', 'cy', 'r', 'fx', 'fy'], ['cx']);
		var sets = $.extend({id: args.id},
			(args.cx != null ? {cx: args.cx, cy: args.cy, r: args.r, fx: args.fx, fy: args.fy} : {}));
		return this._gradient(args.parent, 'radialGradient', $.extend(sets, args.settings || {}), args.stops);
	},

	/** Add a gradient node.
		@private
		@param parent {SVGElement|jQuery} The parent node for the new node.
		@param name {string} The type of gradient node to create.
		@param settings {object} The settings for this node.
		@param stops {string[][]} The gradient stops.
		@return {SVGElement} The new gradient node. */
	_gradient: function(parent, name, settings, stops) {
		var node = this._makeNode(parent, name, settings);
		for (var i = 0; i < stops.length; i++) {
			var stop = stops[i];
			this._makeNode(node, 'stop', $.extend({offset: stop[0], stopColor: stop[1]}, 
				(stop[2] != null ? {stopOpacity: stop[2]} : {})));
		}
		return node;
	},

	/** Add a pattern definition.
		<p>Specify all of <code>vx</code>, <code>vy</code>, <code>xwidth</code>,
		<code>vheight</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID for this pattern.
		@param x {number} The x-coordinate for the left edge of the pattern.
		@param y {number} The y-coordinate for the top edge of the pattern.
		@param width {number} The width of the pattern.
		@param height {number} The height of the pattern.
		@param [vx] {number} The minimum x-coordinate for view box.
		@param [vy] {number} The minimum y-coordinate for the view box.
		@param [vwidth] {number} The width of the view box.
		@param [vheight] {number} The height of the view box.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new pattern definition node. */
	pattern: function(parent, id, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height', 'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
		var sets = $.extend({id: args.id, x: args.x, y: args.y, width: args.width, height: args.height},
			(args.vx != null ? {viewBox: args.vx + ' ' + args.vy + ' ' + args.vwidth + ' ' + args.vheight} : {}));
		return this._makeNode(args.parent, 'pattern', $.extend(sets, args.settings || {}));
	},

	/** Add a clip path definition.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID for this path.
		@param [units='userSpaceOnUse'] {string} Either 'userSpaceOnUse' or 'objectBoundingBox'.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new clip path definition node. */
	clipPath: function(parent, id, units, settings) {
		var args = this._args(arguments, ['id', 'units']);
		args.units = args.units || 'userSpaceOnUse';
		return this._makeNode(args.parent, 'clipPath', $.extend(
			{id: args.id, clipPathUnits: args.units}, args.settings || {}));
	},

	/** Add a mask definition.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param id {string} The ID for this mask.
		@param x {number} The x-coordinate for the left edge of the mask.
		@param y {number} The y-coordinate for the top edge of the mask.
		@param width {number} The width of the mask.
		@param height {number} The height of the mask.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new mask definition node. */
	mask: function(parent, id, x, y, width, height, settings) {
		var args = this._args(arguments, ['id', 'x', 'y', 'width', 'height']);
		return this._makeNode(args.parent, 'mask', $.extend(
			{id: args.id, x: args.x, y: args.y, width: args.width, height: args.height}, args.settings || {}));
	},

	/** Create a new path object.
		@return {SVGPath} A new path object. */
	createPath: function() {
		return new SVGPath();
	},

	/** Create a new text object.
		@return {SVGText} A new text object. */
	createText: function() {
		return new SVGText();
	},

	/** Add an embedded SVG element.
		<p>Specify all of <code>vx</code>, <code>vy</code>,
		<code>vwidth</code>, <code>vheight</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param x {number} The x-coordinate for the left edge of the node.
		@param y {number} The y-coordinate for the top edge of the node.
		@param width {number} The width of the node.
		@param height {number} The height of the node.
		@param [vx] {number} The minimum x-coordinate for view box.
		@param [vy] {number} The minimum y-coordinate for the view box.
		@param [vwidth] {number} The width of the view box.
		@param [vheight] {number} The height of the view box.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new svg node. */
	svg: function(parent, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'vx', 'vy', 'vwidth', 'vheight'], ['vx']);
		var sets = $.extend({x: args.x, y: args.y, width: args.width, height: args.height}, 
			(args.vx != null ? {viewBox: args.vx + ' ' + args.vy + ' ' + args.vwidth + ' ' + args.vheight} : {}));
		return this._makeNode(args.parent, 'svg', $.extend(sets, args.settings || {}));
	},

	/** Create a group.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param [id] {string} The ID of this group.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new group node. */
	group: function(parent, id, settings) {
		var args = this._args(arguments, ['id'], ['id']);
		return this._makeNode(args.parent, 'g', $.extend({id: args.id}, args.settings || {}));
	},

	/** Add a usage reference.
		<p>Specify all of <code>x</code>, <code>y</code>, <code>width</code>, <code>height</code> or none of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param [x] {number} The x-coordinate for the left edge of the node.
		@param [y] {number} The y-coordinate for the top edge of the node.
		@param [width] {number} The width of the node.
		@param [height] {number} The height of the node.
		@param ref {string} The ID of the definition node.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new usage reference node. */
	use: function(parent, x, y, width, height, ref, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
		if (typeof args.x === 'string') {
			args.ref = args.x;
			args.settings = args.y;
			args.x = args.y = args.width = args.height = null;
		}
		var node = this._makeNode(args.parent, 'use', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height}, args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/** Add a link, which applies to all child elements.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param ref {string} The target URL.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new link node. */
	link: function(parent, ref, settings) {
		var args = this._args(arguments, ['ref']);
		var node = this._makeNode(args.parent, 'a', args.settings);
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/** Add an image.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param x {number} The x-coordinate for the left edge of the image.
		@param y {number} The y-coordinate for the top edge of the image.
		@param width {number} The width of the image.
		@param height {number} The height of the image.
		@param ref {string} The path to the image.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new image node. */
	image: function(parent, x, y, width, height, ref, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'ref']);
		var node = this._makeNode(args.parent, 'image', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height}, args.settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', args.ref);
		return node;
	},

	/** Draw a path.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param path {string|SVGPath} The path to draw.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new path node. */
	path: function(parent, path, settings) {
		var args = this._args(arguments, ['path']);
		return this._makeNode(args.parent, 'path', $.extend(
			{d: (args.path.path ? args.path.path() : args.path)}, args.settings || {}));
	},

	/** Draw a rectangle.
		<p>Specify both of <code>rx</code> and <code>ry</code> or neither.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param x {number} The x-coordinate for the left edge of the rectangle.
		@param y {number} The y-coordinate for the top edge of the rectangle.
		@param width {number} The width of the rectangle.
		@param height {number} The height of the rectangle.
		@param [rx] {number} The x-radius of the ellipse for the rounded corners.
		@param [ry] {number} The y-radius of the ellipse for the rounded corners.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new rectangle node. */
	rect: function(parent, x, y, width, height, rx, ry, settings) {
		var args = this._args(arguments, ['x', 'y', 'width', 'height', 'rx', 'ry'], ['rx']);
		return this._makeNode(args.parent, 'rect', $.extend(
			{x: args.x, y: args.y, width: args.width, height: args.height},
			(args.rx ? {rx: args.rx, ry: args.ry} : {}), args.settings || {}));
	},

	/** Draw a circle.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param cx {number} The x-coordinate for the centre of the circle.
		@param cy {number} The y-coordinate for the centre of the circle.
		@param r {number} The radius of the circle.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new circle node. */
	circle: function(parent, cx, cy, r, settings) {
		var args = this._args(arguments, ['cx', 'cy', 'r']);
		return this._makeNode(args.parent, 'circle', $.extend(
			{cx: args.cx, cy: args.cy, r: args.r}, args.settings || {}));
	},

	/** Draw an ellipse.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param cx {number} The x-coordinate for the centre of the ellipse.
		@param cy {number} The y-coordinate for the centre of the ellipse.
		@param rx {number} The x-radius of the ellipse.
		@param ry {number} The y-radius of the ellipse.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new ellipse node. */
	ellipse: function(parent, cx, cy, rx, ry, settings) {
		var args = this._args(arguments, ['cx', 'cy', 'rx', 'ry']);
		return this._makeNode(args.parent, 'ellipse', $.extend(
			{cx: args.cx, cy: args.cy, rx: args.rx, ry: args.ry}, args.settings || {}));
	},

	/** Draw a line.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param x1 {number} The x-coordinate for the start of the line.
		@param y1 {number} The y-coordinate for the start of the line.
		@param x2 {number} The x-coordinate for the end of the line.
		@param y2 {number} The y-coordinate for the end of the line.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new line node. */
	line: function(parent, x1, y1, x2, y2, settings) {
		var args = this._args(arguments, ['x1', 'y1', 'x2', 'y2']);
		return this._makeNode(args.parent, 'line', $.extend(
			{x1: args.x1, y1: args.y1, x2: args.x2, y2: args.y2}, args.settings || {}));
	},

	/** Draw a polygonal line.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param points {number[][]} The x-/y-coordinates for the points on the line.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new polygonal line node. */
	polyline: function(parent, points, settings) {
		var args = this._args(arguments, ['points']);
		return this._poly(args.parent, 'polyline', args.points, args.settings);
	},

	/** Draw a polygonal shape.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param points {number[][]} The x-/y-coordinates for the points on the shape.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new polygonal shape node. */
	polygon: function(parent, points, settings) {
		var args = this._args(arguments, ['points']);
		return this._poly(args.parent, 'polygon', args.points, args.settings);
	},

	/** Draw a polygonal line or shape.
		@private
		@param parent {SVGElement|jQuery} The parent node for the new node.
		@param name {string} The type of polygon to create.
		@param points {number[][]} The x-/y-coordinates for the points on the shape.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new polygon node. */
	_poly: function(parent, name, points, settings) {
		var ps = '';
		for (var i = 0; i < points.length; i++) {
			ps += points[i].join() + ' ';
		}
		return this._makeNode(parent, name, $.extend({points: $.trim(ps)}, settings || {}));
	},

	/** Draw text.
		<p>Specify both of <code>x</code> and <code>y</code> or neither of them.</p>
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param [x] {number|number[]} The x-coordinate(s) for the text.
		@param [y] {number|number[]} The y-coordinate(s) for the text.
		@param value {string|SVGText} The text content or text with spans and references.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new text node. */
	text: function(parent, x, y, value, settings) {
		var args = this._args(arguments, ['x', 'y', 'value']);
		if (typeof args.x === 'string' && arguments.length < 4) {
			args.value = args.x;
			args.settings = args.y;
			args.x = args.y = null;
		}
		return this._text(args.parent, 'text', args.value, $.extend(
			{x: (args.x && $.isArray(args.x) ? args.x.join(' ') : args.x),
			y: (args.y && $.isArray(args.y) ? args.y.join(' ') : args.y)}, args.settings || {}));
	},

	/** Draw text along a path.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param path {string} The ID of the path.
		@param value {string|SVGText} The text content or text with spans and references.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new textpath node. */
	textpath: function(parent, path, value, settings) {
		var args = this._args(arguments, ['path', 'value']);
		var node = this._text(args.parent, 'textPath', args.value, args.settings || {});
		node.setAttributeNS($.svg.xlinkNS, 'href', args.path);
		return node;
	},

	/** Draw text.
		@private
		@param parent {SVGElement|jQuery} The parent node for the new node.
		@param name {string} The type of text to create.
		@param value {string|SVGText} The text content or text with spans and references.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new text node. */
	_text: function(parent, name, value, settings) {
		var node = this._makeNode(parent, name, settings);
		if (typeof value === 'string') {
			node.appendChild(node.ownerDocument.createTextNode(value));
		}
		else {
			for (var i = 0; i < value._parts.length; i++) {
				var part = value._parts[i];
				if (part[0] === 'tspan') {
					var child = this._makeNode(node, part[0], part[2]);
					child.appendChild(node.ownerDocument.createTextNode(part[1]));
					node.appendChild(child);
				}
				else if (part[0] === 'tref') {
					var child = this._makeNode(node, part[0], part[2]);
					child.setAttributeNS($.svg.xlinkNS, 'href', part[1]);
					node.appendChild(child);
				}
				else if (part[0] === 'textpath') {
					var set = $.extend({}, part[2]);
					set.href = null;
					var child = this._makeNode(node, part[0], set);
					child.setAttributeNS($.svg.xlinkNS, 'href', part[2].href);
					child.appendChild(node.ownerDocument.createTextNode(part[1]));
					node.appendChild(child);
				}
				else { // straight text
					node.appendChild(node.ownerDocument.createTextNode(part[1]));
				}
			}
		}
		return node;
	},

	/** Add a custom SVG element.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param name {string} The name of the element.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new custom node. */
	other: function(parent, name, settings) {
		var args = this._args(arguments, ['name']);
		return this._makeNode(args.parent, args.name, args.settings || {});
	},

	/** Create a SVG node with the given settings.
		@private
		@param parent {SVGElement|jQuery} The parent node for the new node, or SVG root if <code>null</code>.
		@param name {string} The name of the element.
		@param [settings] {object} Additional settings for this node.
		@return {SVGElement} The new node. */
	_makeNode: function(parent, name, settings) {
		parent = parent || this._svg;
		var node = this._svg.ownerDocument.createElementNS($.svg.svgNS, name);
		for (var name in settings) {
			var value = settings[name];
			if (value != null && (typeof value !== 'string' || value !== '')) {
				node.setAttribute($.svg._attrNames[name] || name, value);
			}
		}
		parent.appendChild(node);
		return node;
	},

	/** Add an existing SVG node to the document.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param node {SVGElement|string|jQuery} The new node to add or
				the jQuery selector for the node or the set of nodes to add.
		@return {SVGWrapper} This wrapper. */
	add: function(parent, node) {
		var args = this._args((arguments.length === 1 ? [null, parent] : arguments), ['node']);
		var svg = this;
		args.parent = args.parent || this._svg;
		args.node = (args.node.jquery ? args.node : $(args.node));
		try {
			args.parent.appendChild(args.node.cloneNode(true));
		}
		catch (e) {
			args.node.each(function() {
				var child = svg._cloneAsSVG(this);
				if (child) {
					args.parent.appendChild(child);
				}
			});
		}
		return this;
	},

	/** Clone an existing SVG node and add it to the document.
		@param [parent] {SVGElement|jQuery} The parent node for the new node, or SVG root if not specified.
		@param node {SVGEelement|string|jQuery} The new node to add or
				the jQuery selector for the node or the set of nodes to clone.
		@return {SVGElement[]} The collection of new nodes. */
	clone: function(parent, node) {
		var svg = this;
		var args = this._args((arguments.length === 1 ? [null, parent] : arguments), ['node']);
		args.parent = args.parent || this._svg;
		args.node = (args.node.jquery ? args.node : $(args.node));
		var newNodes = [];
		args.node.each(function() {
			var child = svg._cloneAsSVG(this);
			if (child) {
				child.id = '';
				args.parent.appendChild(child);
				newNodes.push(child);
			}
		});
		return newNodes;
	},

	/** SVG nodes must belong to the SVG namespace, so clone and ensure this is so.
		@private
		@param node {SVGElement} The SVG node to clone.
		@return {SVGElement} The cloned node. */
	_cloneAsSVG: function(node) {
		var newNode = null;
		if (node.nodeType === 1) { // element
			newNode = this._svg.ownerDocument.createElementNS($.svg.svgNS, this._checkName(node.nodeName));
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes.item(i);
				if (attr.nodeName !== 'xmlns' && attr.nodeValue) {
					if (attr.prefix === 'xlink') {
						newNode.setAttributeNS($.svg.xlinkNS, attr.localName || attr.baseName, attr.nodeValue);
					}
					else {
						newNode.setAttribute(this._checkName(attr.nodeName), attr.nodeValue);
					}
				}
			}
			for (var i = 0; i < node.childNodes.length; i++) {
				var child = this._cloneAsSVG(node.childNodes[i]);
				if (child) {
					newNode.appendChild(child);
				}
			}
		}
		else if (node.nodeType === 3) { // text
			if ($.trim(node.nodeValue)) {
				newNode = this._svg.ownerDocument.createTextNode(node.nodeValue);
			}
		}
		else if (node.nodeType === 4) { // CDATA
			if ($.trim(node.nodeValue)) {
				try {
					newNode = this._svg.ownerDocument.createCDATASection(node.nodeValue);
				}
				catch (e) {
					newNode = this._svg.ownerDocument.createTextNode(
						node.nodeValue.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'));
				}
			}
		}
		return newNode;
	},

	/** Node names must be lower case and without SVG namespace prefix.
		@private
		@param name {string} The name to check.
		@return {string} The corrected name. */
	_checkName: function(name) {
		name = (name.substring(0, 1) >= 'A' && name.substring(0, 1) <= 'Z' ? name.toLowerCase() : name);
		return (name.substring(0, 4) === 'svg:' ? name.substring(4) : name);
	},

	/** Load an external SVG document.
		@param url {string} The location of the SVG document or
				the actual SVG content (starting with '<code>&lt;svg</code>'.
		@param settings {boolean|function|object} Either <code>addTo</code> below or <code>onLoad</code> below or
				additional settings for the load with attributes below:
				<code>addTo</code> {boolean} <code>true</code> to add to what's already there,
				or <code>false</code> to clear the canvas first,
				<code>changeSize</code> {boolean} <code>true</code> to allow the canvas size to change,
				or <code>false</code> to retain the original,
				<code>onLoad</code> {function} callback after the document has loaded,
				'<code>this</code>' is the container, receives SVG object and optional error message as a parameter,
				<code>parent</code> {string|SVGElement|jQuery} the parent to load into,
				defaults to top-level svg element.
		@return {SVGWrapper} This wrapper. */
	load: function(url, settings) {
		settings = (typeof settings === 'boolean' ? {addTo: settings} :
				(typeof settings === 'function' ? {onLoad: settings} :
				(typeof settings === 'string' ? {parent: settings} : 
				(typeof settings === 'object' && settings.nodeName ? {parent: settings} :
				(typeof settings === 'object' && settings.jquery ? {parent: settings} : settings || {})))));
		if (!settings.parent && !settings.addTo) {
			this.clear(false);
		}
		var size = [this._svg.getAttribute('width'), this._svg.getAttribute('height')];
		var wrapper = this;
		// Report a problem with the load
		var reportError = function(message) {
			message = $.svg.local.errorLoadingText + ': ' + message;
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper, message]);
			}
			else {
				wrapper.text(null, 10, 20, message);
			}
		};
		// Create a DOM from SVG content
		var loadXML4IE = function(data) {
			var xml = new ActiveXObject('Microsoft.XMLDOM');
			xml.validateOnParse = false;
			xml.resolveExternals = false;
			xml.async = false;
			xml.loadXML(data);
			if (xml.parseError.errorCode !== 0) {
				reportError(xml.parseError.reason);
				return null;
			}
			return xml;
		};
		// Load the SVG DOM
		var loadSVG = function(data) {
			if (!data) {
				return;
			}
			if (data.documentElement.nodeName !== 'svg') {
				var errors = data.getElementsByTagName('parsererror');
				var messages = (errors.length ? errors[0].getElementsByTagName('div') : []); // Safari
				reportError(!errors.length ? '???' : (messages.length ? messages[0] : errors[0]).firstChild.nodeValue);
				return;
			}
			var parent = (settings.parent ? $(settings.parent)[0] : wrapper._svg);
			var attrs = {};
			for (var i = 0; i < data.documentElement.attributes.length; i++) {
				var attr = data.documentElement.attributes.item(i);
				if (!(attr.nodeName === 'version' || attr.nodeName.substring(0, 5) === 'xmlns')) {
					attrs[attr.nodeName] = attr.nodeValue;
				}
			}
			wrapper.configure(parent, attrs, !settings.parent);
			var nodes = data.documentElement.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				try {
					parent.appendChild(wrapper._svg.ownerDocument.importNode(nodes[i], true));
					if (nodes[i].nodeName === 'script') {
						$.globalEval(nodes[i].textContent);
					}
				}
				catch (e) {
					wrapper.add(parent, nodes[i]);
				}
			}
			if (!settings.keepRelativeLinks && url.match('/')) {
				var base = url.replace(/\/[^\/]*$/, '/');
				$('*', parent).each(function() {
					var href = $(this).attr('xlink:href');
					if (href && !href.match(/(^[a-z][-a-z0-9+.]*:.*$)|(^\/.*$)|(^#.*$)/i)) {
						$(this).attr('xlink:href', base + href);
					}
				});
			}
			if (!settings.changeSize) {
				wrapper.configure(parent, {width: size[0], height: size[1]});
			}
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container || wrapper._svg, [wrapper]);
			}
		};
		if (url.match('<svg')) { // Inline SVG
			try {
				loadSVG(new DOMParser().parseFromString(url, 'text/xml'));
			} catch (e) {
				reportError(e);
			}
		}
		else { // Remote SVG
			$.ajax({url: url, dataType: 'xml',
				success: function(xml) {
					loadSVG(xml);
				}, error: function(http, message, exc) {
					reportError(message + (exc ? ' ' + exc.message : ''));
				}});
		}
		return this;
	},

	/** Delete a specified node.
		@param node {SVGElement|jQuery} The drawing node to remove.
		@return {SVGWrapper} This wrapper. */
	remove: function(node) {
		node = (node.jquery ? node[0] : node);
		node.parentNode.removeChild(node);
		return this;
	},

	/** Delete everything in the current document.
		@param [attrsToo=false] {boolean} <code>true</code> to clear any root attributes as well,
				<code>false</code> to leave them.
		@return {SVGWrapper} This wrapper. */
	clear: function(attrsToo) {
		if (attrsToo) {
			this.configure({}, true);
		}
		while (this._svg.firstChild) {
			this._svg.removeChild(this._svg.firstChild);
		}
		return this;
	},

	/** Serialise the current diagram into an SVG text document.
		@param [node] {SVGElement} The starting node, or SVG root if not specified .
		@return {string} The SVG as text. */
	toSVG: function(node) {
		node = node || this._svg;
		return (typeof XMLSerializer === 'undefined' ? this._toSVG(node) : new XMLSerializer().serializeToString(node));
	},

	/** Serialise one node in the SVG hierarchy.
		@private
		@param node {SVGElement} The current node to serialise.
		@return {string} The serialised SVG. */
	_toSVG: function(node) {
		var svgDoc = '';
		if (!node) {
			return svgDoc;
		}
		if (node.nodeType === 3) { // Text
			svgDoc = node.nodeValue;
		}
		else if (node.nodeType === 4) { // CDATA
			svgDoc = '<![CDATA[' + node.nodeValue + ']]>';
		}
		else { // Element
			svgDoc = '<' + node.nodeName;
			if (node.attributes) {
				for (var i = 0; i < node.attributes.length; i++) {
					var attr = node.attributes.item(i);
					if (!($.trim(attr.nodeValue) === '' || attr.nodeValue.match(/^\[object/) ||
							attr.nodeValue.match(/^function/))) {
						svgDoc += ' ' + (attr.namespaceURI === $.svg.xlinkNS ? 'xlink:' : '') +
							attr.nodeName + '="' + attr.nodeValue + '"';
					}
				}
			}	
			if (node.firstChild) {
				svgDoc += '>';
				var child = node.firstChild;
				while (child) {
					svgDoc += this._toSVG(child);
					child = child.nextSibling;
				}
				svgDoc += '</' + node.nodeName + '>';
			}
				else {
				svgDoc += '/>';
			}
		}
		return svgDoc;
	}
});

/** Helper to generate an SVG path.
	<p>Obtain an instance from the SVGWrapper object.</p>
	<p>String calls together to generate the path and use its value:</p>
	@module SVGPath
	@example var path = root.createPath();
   root.path(null, path.move(100, 100).line(300, 100).line(200, 300).close(), {fill: 'red'});
 // or
   root.path(null, path.move(100, 100).line([[300, 100], [200, 300]]).close(), {fill: 'red'}); */
function SVGPath() {
	this._path = '';
}

$.extend(SVGPath.prototype, {
	/** Prepare to create a new path.
		@return {SVGPath} This path. */
	reset: function() {
		this._path = '';
		return this;
	},

	/** Move the pointer to a position.
		@param x {number|number[][]} x-coordinate to move to or x-/y-coordinates to move to.
		@param [y] {number} y-coordinate to move to (omitted if <code>x</code> is array).
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	move: function(x, y, relative) {
		relative = ($.isArray(x) ? y : relative);
		return this._coords((relative ? 'm' : 'M'), x, y);
	},

	/** Draw a line to a position.
		@param x {number|number[][]} x-coordinate to move to or x-/y-coordinates to move to.
		@param [y] {number} y-coordinate to move to (omitted if <code>x</code> is array).
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	line: function(x, y, relative) {
		relative = ($.isArray(x) ? y : relative);
		return this._coords((relative ? 'l' : 'L'), x, y);
	},

	/** Draw a horizontal line to a position.
		@param x {number|number[]} x-coordinate to draw to or x-coordinates to draw to.
		@param relative {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	horiz: function(x, relative) {
		this._path += (relative ? 'h' : 'H') + ($.isArray(x) ? x.join(' ') : x);
		return this;
	},

	/** Draw a vertical line to a position.
		@param y {number|number[]} y-coordinate to draw to or y-coordinates to draw to.
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	vert: function(y, relative) {
		this._path += (relative ? 'v' : 'V') + ($.isArray(y) ? y.join(' ') : y);
		return this;
	},

	/** Draw a cubic Bézier curve.
		@param x1 {number|number[][]} x-coordinate of beginning control point or
				x-/y-coordinates of control and end points to draw to.
		@param [y1] {number} y-coordinate of beginning control point (omitted if <code>x1</code> is array).
		@param [x2] {number} x-coordinate of ending control point (omitted if <code>x1</code> is array).
		@param [y2] {number} y-coordinate of ending control point (omitted if <code>x1</code> is array).
		@param [x] {number} x-coordinate of curve end (omitted if <code>x1</code> is array).
		@param [y] {number} y-coordinate of curve end (omitted if <code>x1</code> is array).
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	curveC: function(x1, y1, x2, y2, x, y, relative) {
		relative = ($.isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'c' : 'C'), x1, y1, x2, y2, x, y);
	},

	/** Continue a cubic Bézier curve.
		<p>Starting control point is the reflection of the previous end control point.</p>
		@param x2 {number|number[][]} x-coordinate of ending control point or
				x-/y-coordinates of control and end points to draw to.
		@param [y2] {number} y-coordinate of ending control point (omitted if <code>x2</code> is array).
		@param [x] {number} x-coordinate of curve end (omitted if <code>x2</code> is array).
		@param [y] {number} y-coordinate of curve end (omitted if <code>x2</code> is array).
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	smoothC: function(x2, y2, x, y, relative) {
		relative = ($.isArray(x2) ? y2 : relative);
		return this._coords((relative ? 's' : 'S'), x2, y2, x, y);
	},

	/** Draw a quadratic Bézier curve.
		@param x1 {number|number[][]} x-coordinate of control point or
				x-/y-coordinates of control and end points to draw to.
		@param [y1] {number} y-coordinate of control point (omitted if <code>x1</code> is array).
		@param [x] {number} x-coordinate of curve end (omitted if <code>x1</code> is array).
		@param [y] {number} y-coordinate of curve end (omitted if <code>x1</code> is array).
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	curveQ: function(x1, y1, x, y, relative) {
		relative = ($.isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'q' : 'Q'), x1, y1, x, y);
	},

	/** Continue a quadratic Bézier curve.
		<p>Control point is the reflection of the previous control point.</p>
		@param x {number|number[][]} x-coordinate of curve end or x-/y-coordinates of points to draw to.
		@param [y] {number} y-coordinate of curve end (omitted if <code>x</code> is array).
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	smoothQ: function(x, y, relative) {
		relative = ($.isArray(x) ? y : relative);
		return this._coords((relative ? 't' : 'T'), x, y);
	},

	/** Generate a path command with (a list of) coordinates.
		@private
		@param cmd {string} The command for the path element.
		@param x1 {number} The first x-coordinate.
		@param y1 {number} The first y-coordinate.
		@param [x2] {number} The second x-coordinate.
		@param [y2] {number} The second y-coordinate.
		@param [x3] {number} The third x-coordinate.
		@param [y3] {number} The third y-coordinate.
		@return {SVGPath} This path. */
	_coords: function(cmd, x1, y1, x2, y2, x3, y3) {
		if ($.isArray(x1)) {
			for (var i = 0; i < x1.length; i++) {
				var cs = x1[i];
				this._path += (i === 0 ? cmd : ' ') + cs[0] + ',' + cs[1] + (cs.length < 4 ? '' :
						' ' + cs[2] + ',' + cs[3] + (cs.length < 6 ? '': ' ' + cs[4] + ',' + cs[5]));
			}
		}
		else {
			this._path += cmd + x1 + ',' + y1 + 
				(x2 == null ? '' : ' ' + x2 + ',' + y2 + (x3 == null ? '' : ' ' + x3 + ',' + y3));
		}
		return this;
	},

	/** Draw an arc to a position.
		@param rx {number|any[][]} x-radius of arc or x-/y-coordinates and flags for points to draw to.
		@param [ry] {number} y-radius of arc (omitted if <code>rx</code> is array).
		@param [xRotate] {number} x-axis rotation (degrees, clockwise) (omitted if <code>rx</code> is array).
		@param [large] {boolean} <code>true</code> to draw the large part of the arc,
				<code>false</code> to draw the small part (omitted if <code>rx</code> is array).
		@param [clockwise] {boolean} <code>true</code> to draw the clockwise arc,
				<code>false</code> to draw the anti-clockwise arc (omitted if <code>rx</code> is array).
		@param [x] {number} x-coordinate of arc end (omitted if <code>rx</code> is array).
		@param [y] {number} y-coordinate of arc end (omitted if <code>rx</code> is array).
		@param [relative=false] {boolean} <code>true</code> for coordinates relative to the current point,
				<code>false</code> for coordinates being absolute.
		@return {SVGPath} This path. */
	arc: function(rx, ry, xRotate, large, clockwise, x, y, relative) {
		relative = ($.isArray(rx) ? ry : relative);
		this._path += (relative ? 'a' : 'A');
		if ($.isArray(rx)) {
			for (var i = 0; i < rx.length; i++) {
				var cs = rx[i];
				this._path += (i === 0 ? '' : ' ') + cs[0] + ',' + cs[1] + ' ' +
					cs[2] + ' ' + (cs[3] ? '1' : '0') + ',' + (cs[4] ? '1' : '0') + ' ' + cs[5] + ',' + cs[6];
			}
		}
		else {
			this._path += rx + ',' + ry + ' ' + xRotate + ' ' +
				(large ? '1' : '0') + ',' + (clockwise ? '1' : '0') + ' ' + x + ',' + y;
		}
		return this;
	},

	/** Close the current path.
		@return {SVGPath} This path. */
	close: function() {
		this._path += 'z';
		return this;
	},

	/** Return the string rendering of the specified path.
		@return {string} The stringified path. */
	path: function() {
		return this._path;
	}
});

SVGPath.prototype.moveTo = SVGPath.prototype.move;
SVGPath.prototype.lineTo = SVGPath.prototype.line;
SVGPath.prototype.horizTo = SVGPath.prototype.horiz;
SVGPath.prototype.vertTo = SVGPath.prototype.vert;
SVGPath.prototype.curveCTo = SVGPath.prototype.curveC;
SVGPath.prototype.smoothCTo = SVGPath.prototype.smoothC;
SVGPath.prototype.curveQTo = SVGPath.prototype.curveQ;
SVGPath.prototype.smoothQTo = SVGPath.prototype.smoothQ;
SVGPath.prototype.arcTo = SVGPath.prototype.arc;

/** Helper to generate an SVG text object.
	<p>Obtain an instance from the SVGWrapper object.</p>
	<p>String calls together to generate the text and use its value:</p>
	@module SVGText
	@example var text = root.createText();
   root.text(null, x, y, text.string('This is ').
     span('red', {fill: 'red'}).string('!'), {fill: 'blue'}); */
function SVGText() {
	this._parts = []; // The components of the text object
}

$.extend(SVGText.prototype, {
	/** Prepare to create a new text object.
		@return {SVGText} This text object. */
	reset: function() {
		this._parts = [];
		return this;
	},

	/** Add a straight string value.
		@param value {string} The actual text.
		@return {SVGText} This text object. */
	string: function(value) {
		this._parts.push(['text', value]);
		return this;
	},

	/** Add a separate text span that has its own settings.
		@param value {string} The actual text.
		@param settings {object} The settings for this text.
		@return {SVGText} This text object. */
	span: function(value, settings) {
		this._parts.push(['tspan', value, settings]);
		return this;
	},

	/** Add a reference to a previously defined text string.
		@param id {string} The ID of the actual text.
		@param settings {object} The settings for this text.
		@return {SVGText} This text object. */
	ref: function(id, settings) {
		this._parts.push(['tref', id, settings]);
		return this;
	},

	/** Add text drawn along a path.
		@param id {string} The ID of the path.
		@param value {string} The actual text.
		@param settings {object} The settings for this text.
		@return {SVGText} This text object. */
	path: function(id, value, settings) {
		this._parts.push(['textpath', value, $.extend({href: id}, settings || {})]);
		return this;
	}
});

/** Attach the SVG functionality to a jQuery selection.
	@param [command] {string} The command to run.
	@param [options] {object} The new settings to use for these SVG instances.
	@return {jQuery} For chaining further calls. */
$.fn.svg = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options === 'string' && options === 'get') {
		return $.svg['_' + options + 'SVG'].apply($.svg, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options === 'string') {
			$.svg['_' + options + 'SVG'].apply($.svg, [this].concat(otherArgs));
		}
		else {
			$.svg._attachSVG(this, options || {});
		} 
	});
};

// Singleton primary SVG interface
$.svg = new SVGManager();

})(jQuery);
