/* http://keith-wood.name/svg.html
   SVG for jQuery v1.1.1.
   Written by Keith Wood (kbwood@virginbroadband.com.au) August 2007.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

/* SVG manager.
   Use the singleton instance of this class, $.svg, 
   to interact with the SVG functionality. */
function SVGManager() {
	this._nextId = 0; // Next ID for a SVG root
	this._svgs = []; // List of SVG roots indexed by ID
	this._settings = []; // Settings to be remembered per SVG object:
		// [0] is width, [1] is height, [2] is URL to load initially, [3] is callback function
	this._extensions = []; // List of SVG extensions added to SVGRoot
		// for each entry [0] is extension name, [1] is extension class (function)
		// the function takes one parameter - the SVGRoot instance
	this.regional = []; // Localisations, indexed by language, '' for default (English)
	this.regional[''] = {notSupportedText: 'This browser does not support SVG',
		errorLoadingText: 'Error loading'};
	this.local = this.regional['']; // Current localisation
}

$.extend(SVGManager.prototype, {
	/* Class name added to elements to indicate already configured with SVG. */
	markerClassName: 'hasSVG',
	
	/* SVG namespace. */
	svgNS: 'http://www.w3.org/2000/svg',
	/* XLink namespace. */
	xlinkNS: 'http://www.w3.org/1999/xlink',
	
	/* SVG root class. */
	_rootClass: SVGRoot,
	
	/* Add the SVG object to its container. */
	_connectSVG: function(container, settings) {
		if ($(container).is('.' + this.markerClassName)) {
			return;
		}
		var id = this._nextId++;
		container._svgId = id;
		$(container).addClass(this.markerClassName);
		settings = $.extend(settings, {container: container});
		var svg = null;
		if ($.browser.msie) {
			container.innerHTML = '<embed type="image/svg+xml" width="' + container.clientWidth +
				'" height="' + container.clientHeight + '" src="blank.svg"/>';
			this._settings[id] = settings;
		}
		else if (document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#SVG', '1.1') ||
				($.browser.mozilla && $.browser.version.substr(0, 3) == '1.9')) { // FF 3
			svg = document.createElementNS(this.svgNS, 'svg');
			svg.setAttribute('version', '1.1');
			svg.setAttribute('width', container.clientWidth);
			svg.setAttribute('height', container.clientHeight);
			container.appendChild(svg);
			this._afterLoad(id, svg, settings);
		}
		else {
			container.innerHTML = '<p class="svg_error">' + this.local.notSupportedText + '</p>';
		}
		return id;
	},

	/* SVG callback after loading - register SVG root. */
	_registerSVG: function() {
		for (var i = 0; i < document.embeds.length; i++) { // Check all
			var id = document.embeds[i].parentNode._svgId;
			if (!id && id != 0) {
				continue;
			}
			var svg = null;
			try {
				svg = document.embeds[i].getSVGDocument();
			}
			catch(e) {
				setTimeout('$.svg._registerSVG()', 250); // Renesis takes longer to load
				return;
			}
			svg = (svg ? svg.documentElement : null);
			if (id != null && svg && !this._svgs[id]) { // Valid and not already done
				this._afterLoad(id, svg);
			}
		}
	},

	/* Post-processing once loaded. */
	_afterLoad: function(id, svg, settings) {
		var settings = settings || this._settings[id];
		var root = this._svgs[id] = new this._rootClass(svg, settings.container);
		if (settings.loadURL) { // Load URL
			root.load(settings.loadURL);
		}
		if (settings.settings) { // Additional settings
			root.configure(settings.settings);
		}
		if (settings.onLoad) { // Onload callback
			settings.onLoad(settings.container);
		}
	},
	
	/* Return the SVG root created for a given container.
	   @param  container  string - selector for the container or
	                      element - the container for the SVG object or
	                      jQuery collection - first entry is the container
	   @return  the corresponding SVG root element, or null if not attached */
	_getSVG: function(container) {
		container = (typeof container == 'string' ? $(container)[0] :
			(container.jquery ? container[0] : container));
		return this._svgs[container._svgId];
	},
	
	/* Remove the SVG functionality from a div.
	   @param  container  element - the container for the SVG object */
	_destroySVG: function(container) {
		container = $(container);
		if (!container.is('.' + this.markerClassName)) {
			return;
		}
		container.removeClass(this.markerClassName).empty()[0]._svgId = null;
	},

	/* Extend the SVGRoot object with an embedded class.
	   The constructor function must take a single parameter that is
	   a reference to the owning SVG root object. This allows the 
	   extension to access the basic SVG functionality.
	   @param  name      string - the name of the SVGRoot attribute to access the new class
	   @param  extClass  function - the extension class constructor */
	addExtension: function(name, extClass) {
		this._extensions[this._extensions.length] = [name, extClass];
	}
});



/* The main SVG interface, which encapsulates the SVG element.
   Obtain a reference from $().svg('get') */
function SVGRoot(svg, container) {
	this._svg = svg; // The SVG root node
	this._container = container; // The containing div
	for (var i = 0; i < $.svg._extensions.length; i++) {
		var extension = $.svg._extensions[i];
		this[extension[0]] = new extension[1](this);
	}
}

$.extend(SVGRoot.prototype, {

	/* Retrieve the width of the SVG object. */
	_width: function() {
		return this._container.clientWidth;
	},

	/* Retrieve the height of the SVG object. */
	_height: function() {
		return this._container.clientHeight;
	},
	
	/* Configure the SVG root.
	   @param  settings  object - additional settings for the root
	   @param  clear     boolean - true to remove existing attributes first,
	                     false to add to what is already there (optional)
	   @return  this root */
	configure: function(settings, clear) {
		if (clear) {
			for (var i = this._svg.attributes.length - 1; i >= 0; i--) {
				var attr = this._svg.attributes.item(i);
				if (!(attr.nodeName == 'onload' || attr.nodeName == 'version' || 
						attr.nodeName.substring(0, 5) == 'xmlns')) {
					this._svg.attributes.removeNamedItem(attr.nodeName);
				}
			}
		}
		for (var attrName in settings) {
			this._svg.setAttribute(attrName, settings[attrName]);
		}
		return this;
	},
	
	/* Locate a specific element in the SVG document.
	   @param  id  the element's identifier
	   @return  the element reference, or null if not found */
	getElementById: function(id) {
		return ($.browser.msie || $.browser.opera ?
			this._svg.getElementById(id) : document.getElementById(id));
	},
	
	/* Add a title.
	   @param  parent    element - the parent node for the new title
	   @param  text      string - the text of the title
	   @param  settings  object - additional settings for the title (optional)
	   @return  the new title node */
	title: function(parent, text, settings) {
		var node = this._makeNode(parent, 'title', settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(text));
		return node;
	},

	/* Add a description.
	   @param  parent    element - the parent node for the new description
	   @param  text      string - the text of the description
	   @param  settings  object - additional settings for the description (optional)
	   @return  the new description node */
	describe: function(parent, text, settings) {
		var node = this._makeNode(parent, 'desc', settings || {});
		node.appendChild(this._svg.ownerDocument.createTextNode(text));
		return node;
	},

	/* Add a definitions node.
	   @param  parent    element - the parent node for the new definitions
	   @param  id        string - the ID of this definitions (optional)
	   @param  settings  object - additional settings for the definitions (optional)
	   @return  the new definitions node */
	defs: function(parent, id, settings) {
		if (typeof id != 'string') {
			settings = id;
			id = null;
		}
		return this._makeNode(parent, 'defs', $.extend(
			(id ? {id: id} : {}), settings || {}));
	},

	/* Add a symbol definition.
	   @param  parent    element - the parent node for the new symbol
	   @param  id        string - the ID of this symbol
	   @param  x1        number - the left coordinate for this symbol
	   @param  y1        number - the top coordinate for this symbol
	   @param  x2        number - the right coordinate for this symbol
	   @param  y2        number - the bottom coordinate for this symbol
	   @param  settings  object - additional settings for the symbol (optional)
	   @return  the new symbol node */
	symbol: function(parent, id, x1, y1, x2, y2, settings) {
		return this._makeNode(parent, 'symbol', $.extend(
			{id: id, viewBox: x1 + ' ' + y1 + ' ' + x2 + ' ' + y2}, settings || {}));
	},

	/* Add a marker definition.
	   @param  parent    element - the parent node for the new marker
	   @param  id        string - the ID of this marker
	   @param  refX      number - the x-coordinate for the reference point
	   @param  refY      number - the y-coordinate for the reference point
	   @param  mWidth    number - the marker viewport width
	   @param  mHeight   number - the marker viewport height
	   @param  orient    string or int - 'auto' or angle (degrees) (optional)
	   @param  settings  object - additional settings for the marker (optional)
	   @return  the new marker node */
	marker: function(parent, id, refX, refY, mWidth, mHeight, orient, settings) {
		if (typeof orient == 'object') {
			settings = orient;
			orient = null;
		}
		return this._makeNode(parent, 'marker', $.extend(
			{id: id, refX: refX, refY: refY, markerWidth: mWidth, 
			markerHeight: mHeight, orient: orient || 'auto'}, settings || {}));
	},

	/* Add a style node.
	   @param  parent    element - the parent node for the new node
	   @param  styles    string - the CSS styles
	   @param  settings  object - additional settings for the node (optional)
	   @return  the new style node */
	style: function(parent, styles, settings) {
		var node = this._makeNode(parent, 'style', $.extend(
			{type: 'text/css'}, settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(this._escapeXML(styles)));
		return node;
	},

	/* Add a script node.
	   @param  parent    element - the parent node for the new node
	   @param  script    string - the JavaScript code
	   @param  type      string - the MIME type for the code (optional, default 'text/javascript')
	   @param  settings  object - additional settings for the node (optional)
	   @return  the new script node */
	script: function(parent, script, type, settings) {
		if (typeof type == 'object') {
			settings = type;
			type = null;
		}
		var node = this._makeNode(parent, 'script', $.extend(
			{type: type || 'text/javascript'}, settings || {}));
		node.appendChild(this._svg.ownerDocument.createTextNode(this._escapeXML(script)));
		return node;
	},
	
	/* Add a linear gradient definition.
	   Specify all of x1, y1, x2, y2 or none of them.
	   @param  parent    element - the parent node for the new gradient
	   @param  id        string - the ID for this gradient
	   @param  stops     string[][] - the gradient stops, each entry is
	                     [0] is offset (0.0-1.0 or 0%-100%), [1] is colour, 
						 [2] is opacity (optional)
	   @param  x1        number - the x-coordinate of the gradient start (optional)
	   @param  y1        number - the y-coordinate of the gradient start (optional)
	   @param  x2        number - the x-coordinate of the gradient end (optional)
	   @param  y2        number - the y-coordinate of the gradient end (optional)
	   @param  settings  object - additional settings for the gradient (optional)
	   @return  the new gradient node */
	linearGradient: function(parent, id, stops, x1, y1, x2, y2, settings) {
		if (typeof x1 == 'object') {
			settings = x1;
			x1 = null;
		}
		var sets = $.extend({id: id}, 
			(x1 != null ? {x1: x1, y1: y1, x2: x2, y2: y2} : {}));
		return this._gradient(parent, 'linearGradient', 
			$.extend(sets, settings || {}), stops);
	},
	
	/* Add a radial gradient definition.
	   Specify all of cx, cy, r, fx, fy or none of them.
	   @param  parent    element - the parent node for the new gradient
	   @param  id        string - the ID for this gradient
	   @param  stops     string[][] - the gradient stops, each entry
	                     [0] is offset, [1] is colour, [2] is opacity (optional)
	   @param  cx        number - the x-coordinate of the largest circle centre (optional)
	   @param  cy        number - the y-coordinate of the largest circle centre (optional)
	   @param  r         number - the radius of the largest circle (optional)
	   @param  fx        number - the x-coordinate of the gradient focus (optional)
	   @param  fy        number - the y-coordinate of the gradient focus (optional)
	   @param  settings  object - additional settings for the gradient (optional)
	   @return  the new gradient node */
	radialGradient: function(parent, id, stops, cx, cy, r, fx, fy, settings) {
		if (typeof cx == 'object') {
			settings = cx;
			cx = null;
		}
		var sets = $.extend({id: id}, 
			(cx != null ? {cx: cx, cy: cy, r: r, fx: fx, fy: fy} : {}));
		return this._gradient(parent, 'radialGradient', 
			$.extend(sets, settings || {}), stops);
	},
	
	/* Add a gradient node. */
	_gradient: function(parent, name, settings, stops) {
		var node = this._makeNode(parent, name, settings);
		for (var i = 0; i < stops.length; i++) {
			var stop = stops[i];
			this._makeNode(node, 'stop', $.extend(
				{offset: stop[0], 'stop-color': stop[1]}, 
				(stop[2] != null ? {'stop-opacity': stop[2]} : {})));
		}
		return node;
	},

	/* Add a pattern definition.
	   Specify all of vx, vy, xwidth, vheight or none of them.
	   @param  parent    element - the parent node for the new pattern
	   @param  id        string - the ID for this pattern
	   @param  x         number - the x-coordinate for the left edge of the pattern
	   @param  y         number - the y-coordinate for the top edge of the pattern
	   @param  width     number - the width of the pattern
	   @param  height    number - the height of the pattern
	   @param  vx        number - the minimum x-coordinate for view box (optional)
	   @param  vy        number - the minimum y-coordinate for the view box (optional)
	   @param  vwidth    number - the width of the view box (optional)
	   @param  vheight   number - the height of the view box (optional)
	   @param  settings  object - additional settings for the pattern (optional)
	   @return  the new pattern node */
	pattern: function(parent, id, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		if (typeof vx == 'object') {
			settings = vx;
			vx = null;
		}
		var sets = $.extend({id: id, x: x, y: y, width: width, height: height}, 
			(vx != null ? {viewBox: vx + ' ' + vy + ' ' + vwidth + ' ' + vheight} : {}));
		return this._makeNode(parent, 'pattern', $.extend(sets, settings || {}));
	},

	/* Add a mask definition.
	   @param  parent    element - the parent node for the new mask
	   @param  id        string - the ID for this mask
	   @param  x         number - the x-coordinate for the left edge of the mask
	   @param  y         number - the y-coordinate for the top edge of the mask
	   @param  width     number - the width of the mask
	   @param  height    number - the height of the mask
	   @param  settings  object - additional settings for the mask (optional)
	   @return  the new mask node */
	mask: function(parent, id, x, y, width, height, settings) {
		return this._makeNode(parent, 'mask', $.extend(
			{id: id, x: x, y: y, width: width, height: height}, settings || {}));
	},

	/* Create a new path object.
	   @return  a new path object */
	createPath: function() {
		return new SVGPath();
	},

	/* Create a new text object.
	   @return  a new text object */
	createText: function() {
		return new SVGText();
	},

	/* Add an embedded SVG element.
	   Specify all of vx, vy, vwidth, vheight or none of them.
	   @param  parent    element - the parent node for the new node
	   @param  x         number - the x-coordinate for the left edge of the node
	   @param  y         number - the y-coordinate for the top edge of the node
	   @param  width     number - the width of the node
	   @param  height    number - the height of the node
	   @param  vx        number - the minimum x-coordinate for view box (optional)
	   @param  vy        number - the minimum y-coordinate for the view box (optional)
	   @param  vwidth    number - the width of the view box (optional)
	   @param  vheight   number - the height of the view box (optional)
	   @param  settings  object - additional settings for the node (optional)
	   @return  the new node */
	svg: function(parent, x, y, width, height, vx, vy, vwidth, vheight, settings) {
		if (typeof vx == 'object') {
			settings = vx;
			vx = null;
		}
		var sets = $.extend({x: x, y: y, width: width, height: height}, 
			(vx != null ? {viewBox: vx + ' ' + vy + ' ' + vwidth + ' ' + vheight} : {}));
		return this._makeNode(parent, 'svg', $.extend(sets, settings || {}));
	},

	/* Create a group.
	   @param  parent    element - the parent node for the new group
	   @param  id        string - the ID of this group (optional)
	   @param  settings  object - additional settings for the group (optional)
	   @return  the new group node */
	group: function(parent, id, settings) {
		if (typeof id == 'object') {
			settings = id;
			id = null;
		}
		return this._makeNode(parent, 'g', $.extend({id: id}, settings || {}));
	},

	/* Add a usage reference.
	   Specify all of x, y, width, height or none of them.
	   @param  parent    element - the parent node for the new node
	   @param  x         number - the x-coordinate for the left edge of the node (optional)
	   @param  y         number - the y-coordinate for the top edge of the node (optional)
	   @param  width     number - the width of the node (optional)
	   @param  height    number - the height of the node (optional)
	   @param  ref       string - the ID of the definition node
	   @param  settings  object - additional settings for the node (optional)
	   @return  the new node */
	use: function(parent, x, y, width, height, ref, settings) {
		if (typeof x == 'string') {
			ref = x;
			settings = y;
			x = y = width = height = null;
		}
		var node = this._makeNode(parent, 'use', $.extend(
			{x: x, y: y, width: width, height: height}, settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', ref);
		return node;
	},

	/* Add a link, which applies to all child elements.
	   @param  parent    element - the parent node for the new link
	   @param  ref       string - the target URL
	   @param  settings  object - additional settings for the link (optional)
	   @return  the new link node */
	link: function(parent, ref, settings) {
		var node = this._makeNode(parent, 'a', settings);
		node.setAttributeNS($.svg.xlinkNS, 'href', ref);
		return node;
	},

	/* Add an image.
	   @param  parent    element - the parent node for the new image
	   @param  x         number - the x-coordinate for the left edge of the image
	   @param  y         number - the y-coordinate for the top edge of the image
	   @param  width     number - the width of the image
	   @param  height    number - the height of the image
	   @param  ref       string - the path to the image
	   @param  settings  object - additional settings for the image (optional)
	   @return  the new image node */
	image: function(parent, x, y, width, height, ref, settings) {
		var node = this._makeNode(parent, 'image', $.extend(
			{x: x, y: y, width: width, height: height}, settings || {}));
		node.setAttributeNS($.svg.xlinkNS, 'href', ref);
		return node;
	},

	/* Draw a path.
	   @param  parent    element - the parent node for the new shape
	   @param  path      string or SVGPath - the path to draw
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	path: function(parent, path, settings) {
		return this._makeNode(parent, 'path', $.extend(
			{d: (path.path ? path.path() : path)}, settings || {}));
	},

	/* Draw a rectangle.
	   Specify both of rx and ry or neither.
	   @param  parent    element - the parent node for the new shape
	   @param  x         number - the x-coordinate for the left edge of the rectangle
	   @param  y         number - the y-coordinate for the top edge of the rectangle
	   @param  width     number - the width of the rectangle
	   @param  height    number - the height of the rectangle
	   @param  rx        number - the x-radius of the ellipse for the rounded corners (optional)
	   @param  ry        number - the y-radius of the ellipse for the rounded corners (optional)
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	rect: function(parent, x, y, width, height, rx, ry, settings) {
		if (typeof rx == 'object') {
			settings = rx;
			rx = ry = null;
		}
		return this._makeNode(parent, 'rect', $.extend(
			{x: x, y: y, width: width, height: height},
			(rx ? {rx: rx, ry: ry} : {}), settings || {}));
	},

	/* Draw a circle.
	   @param  parent    element - the parent node for the new shape
	   @param  cx        number - the x-coordinate for the centre of the circle
	   @param  cy        number - the y-coordinate for the centre of the circle
	   @param  r         number - the radius of the circle
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	circle: function(parent, cx, cy, r, settings) {
		return this._makeNode(parent, 'circle', $.extend(
			{cx: cx, cy: cy, r: r}, settings || {}));
	},

	/* Draw an ellipse.
	   @param  parent    element - the parent node for the new shape
	   @param  cx        number - the x-coordinate for the centre of the ellipse
	   @param  cy        number - the y-coordinate for the centre of the ellipse
	   @param  rx        number - the x-radius of the ellipse
	   @param  ry        number - the y-radius of the ellipse
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	ellipse: function(parent, cx, cy, rx, ry, settings) {
		return this._makeNode(parent, 'ellipse', $.extend(
			{cx: cx, cy: cy, rx: rx, ry: ry}, settings || {}));
	},

	/* Draw a line.
	   @param  parent    element - the parent node for the new shape
	   @param  x1        number - the x-coordinate for the start of the line
	   @param  y1        number - the y-coordinate for the start of the line
	   @param  x2        number - the x-coordinate for the end of the line
	   @param  y2        number - the y-coordinate for the end of the line
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	line: function(parent, x1, y1, x2, y2, settings) {
		return this._makeNode(parent, 'line', $.extend(
			{x1: x1, y1: y1, x2: x2, y2: y2}, settings || {}));
	},

	/* Draw a polygonal line.
	   @param  parent    element - the parent node for the new shape
	   @param  points    number[][] - the x-/y-coordinates for the points on the line
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	polyline: function(parent, points, settings) {
		return this._poly(parent, 'polyline', points, settings);
	},

	/* Draw a polygonal shape.
	   @param  parent    element - the parent node for the new shape
	   @param  points    number[][] - the x-/y-coordinates for the points on the shape
	   @param  settings  object - additional settings for the shape (optional)
	   @return  the new shape node */
	polygon: function(parent, points, settings) {
		return this._poly(parent, 'polygon', points, settings);
	},

	/* Draw a polygonal line or shape. */
	_poly: function(parent, name, points, settings) {
		var ps = '';
		for (var i = 0; i < points.length; i++) {
			ps += points[i].join() + ' ';
		}
		return this._makeNode(parent, name, $.extend(
			{points: $.trim(ps)}, settings || {}));
	},
	
	/* Draw text.
	   Specify both of x and y or neither of them.
	   @param  parent    element - the parent node for the text
	   @param  x         number or number[] - the x-coordinate(s) for the text (optional)
	   @param  y         number or number[] - the y-coordinate(s) for the text (optional)
	   @param  value     string - the text content or
	                     SVGText - text with spans and references
	   @param  settings  object - additional settings for the text (optional)
	   @return  the new text node */
	text: function(parent, x, y, value, settings) {
		if (typeof x == 'string' && arguments.length < 4) {
			value = x;
			settings = y;
			x = y = null;
		}
		return this._text(parent, 'text', value, $.extend(
			{x: (x && isArray(x) ? x.join(' ') : x), y: (y && isArray(y) ? y.join(' ') : y)}, 
			settings || {}));
	},
	
	/* Draw text along a path.
	   @param  parent    element - the parent node for the text
	   @param  path      string - the ID of the path
	   @param  value     string - the text content or
	                     SVGText - text with spans and references
	   @param  settings  object - additional settings for the text (optional)
	   @return  the new text node */
	textpath: function(parent, path, value, settings) {
		var node = this._text(parent, 'textPath', value, settings || {});
		node.setAttributeNS($.svg.xlinkNS, 'href', path);
		return node;
	},
	
	/* Draw text. */
	_text: function(parent, name, value, settings) {
		var node = this._makeNode(parent, name, settings);
		if (typeof value == 'string') {
			node.appendChild(node.ownerDocument.createTextNode(value));
		}
		else {
			for (var i = 0; i < value._parts.length; i++) {
				var part = value._parts[i];
				if (part[0] == 'tspan') {
					var child = this._makeNode(node, part[0], part[2]);
					child.appendChild(node.ownerDocument.createTextNode(part[1]));
					node.appendChild(child);
				}
				else if (part[0] == 'tref') {
					var child = this._makeNode(node, part[0], part[2]);
					child.setAttributeNS($.svg.xlinkNS, 'href', part[1]);
					node.appendChild(child);
				}
				else if (part[0] == 'textpath') {
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

	/* Add a custom SVG element.
	   @param  parent    element - the parent node for the new element
	   @param  name      string - the name of the element
	   @param  settings  object - additional settings for the element (optional)
	   @return  the new title node */
	other: function(parent, name, settings) {
		return this._makeNode(parent, name, settings || {});
	},

	/* Create a shape node with the given settings. */
	_makeNode: function(parent, name, settings) {
		parent = parent || this._svg;
		var node = this._svg.ownerDocument.createElementNS($.svg.svgNS, name);
		for (var name in settings) {
			var value = settings[name];
			if (value != null && value != null && 
					(typeof value != 'string' || value != '')) {
				node.setAttribute(name, value);
			}
		}
		parent.appendChild(node);
		return node;
	},
	
	/* Add an existing SVG node to the diagram.
	   @param  parent  element - the parent node for the new node
	   @param  node    element - the new node to add or
	                   string - the jQuery selector for the node or
	                   jQuery collection - set of nodes to add
	   @return  this root */
	add: function(parent, node) {
		var svg = this;
		parent = parent || this._svg;
		node = (node.jquery ? node : $(node));
		node.each(function() {
			var child = svg._cloneAsSVG(this);
			if (child) {
				parent.appendChild(child);
			}
		});
		return this;
	},
	
	/* SVG nodes must belong to the SVG namespace, so clone and ensure this is so. */
	_cloneAsSVG: function(node) {
		var newNode = null;
		if (node.nodeType == 1) { // element
			newNode = this._svg.ownerDocument.createElementNS(
				$.svg.svgNS, this._checkName(node.nodeName));
			for (var i = 0; i < node.attributes.length; i++) {
				var attr = node.attributes.item(i);
				if (attr.nodeName != 'xmlns' && attr.nodeValue) {
					if (attr.prefix == 'xlink') {
						newNode.setAttributeNS($.svg.xlinkNS, attr.localName, attr.nodeValue);
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
		else if (node.nodeType == 3) { // text
			if ($.trim(node.nodeValue)) {
				newNode = this._svg.ownerDocument.createTextNode(node.nodeValue);
			}
		}
		else if (node.nodeType == 4) { // CDATA
			if ($.trim(node.nodeValue)) {
				newNode = this._svg.ownerDocument.createCDATASection(node.nodeValue);
			}
		}
		return newNode;
	},
	
	/* Node names must be lower case and without SVG namespace prefix. */
	_checkName: function(name) {
		name = (name.substring(0, 1) >= 'A' && name.substring(0, 1) <= 'Z' ? name.toLowerCase() : name);
		return (name.substring(0, 4) == 'svg:' ? name.substring(4) : name);
	},

	/* Load an external SVG document.
	   @param  url    string - the location of the SVG document
	   @param  settings  boolean - see addTo below or
	                     object - additional settings for the load with attributes below:
	                       addTo       boolean - true to add to what's already there,
	                                   or false to clear the canvas first
						   changeSize  boolean - true to allow the canvas size to change,
	                                   or false to retain the original
	                       onLoad      function - callback after the document has loaded,
	                                   'this' is the container, receives SVG object and
	                                   optional error message as a parameter
	   @return  this root */
	load: function(url, settings) {
		if (typeof settings == 'boolean') {
			settings = {addTo: settings};
		}
		else {
			settings = settings || {};
		}
		if (!settings.addTo) {
			this.clear(false);
		}
		var size = [this._svg.getAttribute('width'), this._svg.getAttribute('height')];
		var wrapper = this;
		var http = $.ajax({url: url, dataType: ($.browser.msie ? 'text' : 'xml'), success: function(data) {
			if ($.browser.msie) { // Doesn't load properly!
				var xml = new ActiveXObject('Microsoft.XMLDOM');
				xml.validateOnParse = false;
				xml.resolveExternals = false;
				xml.loadXML(data);
				if (xml.parseError.errorCode != 0) {
					var message = $.svg.local.errorLoadingText + ': ' + xml.parseError.reason;
					if (settings.onLoad) {
						settings.onLoad.apply(wrapper._container, [wrapper, message]);
					}
					else {
						wrapper.text(null, 10, 20, message);
					}
					return;
				}
				data = xml;
			}
			var attrs = {};
			for (var i = 0; i < data.documentElement.attributes.length; i++) {
				var attr = data.documentElement.attributes.item(i);
				if (!(attr.nodeName == 'version' || attr.nodeName.substring(0, 5) == 'xmlns')) {
					attrs[attr.nodeName] = attr.nodeValue;
				}
			}
			wrapper.configure(attrs, true);
			var nodes = data.documentElement.childNodes;
			for (var i = 0; i < nodes.length; i++) {
				wrapper.add(null, nodes[i]);
			}
			if (!settings.changeSize) {
				wrapper.configure({width: size[0], height: size[1]});
			}
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container, [wrapper]);
			}
		}, error: function(http, message, exc) {
			message = $.svg.local.errorLoadingText + ': ' + message + (exc ? ' ' + exc.message : '');
			if (settings.onLoad) {
				settings.onLoad.apply(wrapper._container, [wrapper, message]);
			}
			else {
				wrapper.text(null, 10, 20, message);
			}
		}});
		return this;
	},

	/* Delete a specified node.
	   @param  node  element - the drawing node to remove
	   @return  this root */
	remove: function(node) {
		node.parentNode.removeChild(node);
		return this;
	},

	/* Delete everything in the current document.
	   @param  attrsToo  boolean - true to clear any root attributes as well,
	                     false to leave them (optional)
	   @return  this root */
	clear: function(attrsToo) {
		if (attrsToo) {
			this.configure({}, true);
		}
		while (this._svg.firstChild) {
			this._svg.removeChild(this._svg.firstChild);
		}
		return this;
	},
	
	/* Serialise the current diagram into an SVG text document.
	   @return  the SVG as text */
	toSVG: function() {
		return this._toSVG(this._svg);
	},
	
	/* Serialise one node in the SVG hierarchy. */
	_toSVG: function(node) {
		var svgDoc = '';
		if (!node) {
			return svgDoc;
		}
		if (node.nodeType == 3) { // Text
			svgDoc = node.nodeValue;
		}
		else if (node.nodeType == 4) { // CDATA
			svgDoc = '<![CDATA[' + node.nodeValue + ']]>';
		}
		else { // Element
			svgDoc = '<' + node.nodeName;
			if (node.attributes) {
				for (var i = 0; i < node.attributes.length; i++) {
					var attr = node.attributes.item(i);
					if (!($.trim(attr.nodeValue) == '' || attr.nodeValue.match(/^\[object/) ||
							attr.nodeValue.match(/^function/))) {
						svgDoc += ' ' + (attr.namespaceURI == $.svg.xlinkNS ? 'xlink:' : '') + 
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
	},
	
	/* Escape reserved characters in XML. */
	_escapeXML: function(text) {
		text = text.replace(/&/g, '&amp;');
		text = text.replace(/</g, '&lt;');
		text = text.replace(/>/g, '&gt;');
		return text;
	}
});

/* Helper to generate an SVG path.
   Obtain an instance from the SVGRoot object.
   String calls together to generate the path and use its value:
   var path = root.createPath();
   root.path(null, path.moveTo(100, 100).lineTo(300, 100).lineTo(200, 300).close(), {fill: 'red'});
   or
   root.path(null, path.moveTo(100, 100).lineTo([[300, 100], [200, 300]]).close(), {fill: 'red'}); */
function SVGPath() {
	this._path = '';
}

$.extend(SVGPath.prototype, {
	/* Prepare to create a new path.
	   @return  this path */
	reset: function() {
		this._path = '';
		return this;
	},

	/* Move the pointer to a position.
	   @param  x         number - x-coordinate to move to or
	                     number[][] - x-/y-coordinates to move to
	   @param  y         number - y-coordinate to move to (omitted if x is array)
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	moveTo: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 'm' : 'M'), x, y);
	},

	/* Draw a line to a position.
	   @param  x         number - x-coordinate to move to or
	                     number[][] - x-/y-coordinates to move to
	   @param  y         number - y-coordinate to move to (omitted if x is array)
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	lineTo: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 'l' : 'L'), x, y);
	},

	/* Draw a horizontal line to a position.
	   @param  x         number - x-coordinate to draw to or
	                     number[] - x-coordinates to draw to
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	horizTo: function(x, relative) {
		this._path += (relative ? 'h' : 'H') + (isArray(x) ? x.join(' ') : x);
		return this;
	},

	/* Draw a vertical line to a position.
	   @param  y         number - y-coordinate to draw to or
	                     number[] - y-coordinates to draw to
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	vertTo: function(y, relative) {
		this._path += (relative ? 'v' : 'V') + (isArray(y) ? y.join(' ') : y);
		return this;
	},

	/* Draw a cubic Bézier curve.
	   @param  x1        number - x-coordinate of beginning control point or
	                     number[][] - x-/y-coordinates of control and end points to draw to
	   @param  y1        number - y-coordinate of beginning control point (omitted if x1 is array)
	   @param  x2        number - x-coordinate of ending control point (omitted if x1 is array)
	   @param  y2        number - y-coordinate of ending control point (omitted if x1 is array)
	   @param  x         number - x-coordinate of curve end (omitted if x1 is array)
	   @param  y         number - y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	curveCTo: function(x1, y1, x2, y2, x, y, relative) {
		relative = (isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'c' : 'C'), x1, y1, x2, y2, x, y);
	},

	/* Continue a cubic Bézier curve.
	   Starting control point is the reflection of the previous end control point.
	   @param  x2        number - x-coordinate of ending control point or
	                     number[][] - x-/y-coordinates of control and end points to draw to
	   @param  y2        number - y-coordinate of ending control point (omitted if x2 is array)
	   @param  x         number - x-coordinate of curve end (omitted if x2 is array)
	   @param  y         number - y-coordinate of curve end (omitted if x2 is array)
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	smoothCTo: function(x2, y2, x, y, relative) {
		relative = (isArray(x2) ? y2 : relative);
		return this._coords((relative ? 's' : 'S'), x2, y2, x, y);
	},

	/* Draw a quadratic Bézier curve.
	   @param  x1        number - x-coordinate of control point or
	                     number[][] - x-/y-coordinates of control and end points to draw to
	   @param  y1        number - y-coordinate of control point (omitted if x1 is array)
	   @param  x         number - x-coordinate of curve end (omitted if x1 is array)
	   @param  y         number - y-coordinate of curve end (omitted if x1 is array)
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	curveQTo: function(x1, y1, x, y, relative) {
		relative = (isArray(x1) ? y1 : relative);
		return this._coords((relative ? 'q' : 'Q'), x1, y1, x, y);
	},

	/* Continue a quadratic Bézier curve.
	   Control point is the reflection of the previous control point.
	   @param  x         number - x-coordinate of curve end or
	                     number[][] - x-/y-coordinates of points to draw to
	   @param  y         number - y-coordinate of curve end (omitted if x is array)
	   @param  relative  boolean - true for coordinates relative to the current point,
	                     false for coordinates being absolute
	   @return  this path */
	smoothQTo: function(x, y, relative) {
		relative = (isArray(x) ? y : relative);
		return this._coords((relative ? 't' : 'T'), x, y);
	},

	/* Generate a path command with (a list of) coordinates. */
	_coords: function(cmd, x1, y1, x2, y2, x3, y3) {
		if (isArray(x1)) {
			for (var i = 0; i < x1.length; i++) {
				var cs = x1[i];
				this._path += (i == 0 ? cmd : ' ') + cs[0] + ',' + cs[1] + 
					(cs.length < 4 ? '' : ' ' + cs[2] + ',' + cs[3] + 
					(cs.length < 6 ? '': ' ' + cs[4] + ',' + cs[5]));
			}
		}
		else {
			this._path += cmd + x1 + ',' + y1 + 
				(x2 == null ? '' : ' ' + x2 + ',' + y2 +
				(x3 == null ? '' : ' ' + x3 + ',' + y3));
		}
		return this;
	},

	/* Draw an arc to a position.
	   @param  rx         number - x-radius of arc or
	                      number/boolean[][] - x-/y-coordinates and flags for points to draw to
	   @param  ry         number - y-radius of arc (omitted if rx is array)
	   @param  xRotate    number - x-axis rotation (degrees, clockwise) (omitted if rx is array)
	   @param  large      boolean - true to draw the large part of the arc,
	                      false to draw the small part (omitted if rx is array)
	   @param  clockwise  boolean - true to draw the clockwise arc,
	                      false to draw the anti-clockwise arc (omitted if rx is array)
	   @param  x          number - x-coordinate of arc end (omitted if rx is array)
	   @param  y          number - y-coordinate of arc end (omitted if rx is array)
	   @param  relative   boolean - true for coordinates relative to the current point,
	                      false for coordinates being absolute
	   @return  this path */
	arcTo: function(rx, ry, xRotate, large, clockwise, x, y, relative) {
		relative = (isArray(rx) ? ry : relative);
		this._path += (relative ? 'a' : 'A');
		if (isArray(rx)) {
			for (var i = 0; i < rx.length; i++) {
				var cs = rx[i];
				this._path += (i == 0 ? '' : ' ') + cs[0] + ',' + cs[1] + ' ' +
					cs[2] + ' ' + (cs[3] ? '1' : '0') + ',' +
					(cs[4] ? '1' : '0') + ' ' + cs[5] + ',' + cs[6];
			}
		}
		else {
			this._path += rx + ',' + ry + ' ' + xRotate + ' ' +
				(large ? '1' : '0') + ',' + (clockwise ? '1' : '0') + ' ' + x + ',' + y;
		}
		return this;
	},
	
	/* Close the current path.
	   @return  this path */
	close: function() {
		this._path += 'z';
		return this;
	},

	/* Return the string rendering of the specified path.
	   @return  stringified path */
	path: function() {
		return this._path;
	}
});

/* Helper to generate an SVG text object.
   Obtain an instance from the SVGRoot object.
   String calls together to generate the text and use its value:
   var text = root.createText();
   root.text(null, x, y, text.string('This is ').
     span('red', {fill: 'red'}).string('!'), {fill: 'blue'}); */
function SVGText() {
	this._parts = []; // The components of the text object
}

$.extend(SVGText.prototype, {
	/* Prepare to create a new text object.
	   @return  this text */
	reset: function() {
		this._parts = [];
		return this;
	},
	
	/* Add a straight string value.
	   @param  value  string - the actual text
	   @return  this text object */
	string: function(value) {
		this._parts[this._parts.length] = ['text', value];
		return this;
	},
	
	/* Add a separate text span that has its own settings.
	   @param  value     string - the actual text
	   @param  settings  object - the settings for this text
	   @return  this text object */
	span: function(value, settings) {
		this._parts[this._parts.length] = ['tspan', value, settings];
		return this;
	},
	
	/* Add a reference to a previously defined text string.
	   @param  id        string - the ID of the actual text
	   @param  settings  object - the settings for this text
	   @return  this text object */
	ref: function(id, settings) {
		this._parts[this._parts.length] = ['tref', id, settings];
		return this;
	},

	/* Add text drawn along a path.
	   @param  id        string - the ID of the path
	   @param  value     string - the actual text
	   @param  settings  object - the settings for this text
	   @return  this text object */
	path: function(id, value, settings) {
		this._parts[this._parts.length] = ['textpath', value, 
			$.extend({href: id}, settings || {})];
		return this;
	}
});

/* Attach the SVG functionality to a jQuery selection.
   @param  command  string - the command to run (optional, default 'attach')
   @param  options  object - the new settings to use for these SVG instances
   @return jQuery object - for chaining further calls */
$.fn.svg = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	if (typeof options == 'string' && options == 'get') {
		return $.svg['_' + options + 'SVG'].apply($.svg, [this[0]].concat(otherArgs));
	}
	return this.each(function() {
		if (typeof options == 'string') {
			$.svg['_' + options + 'SVG'].apply($.svg, [this].concat(otherArgs));
		}
		else {
			$.svg._connectSVG(this, options || {});
		} 
	});
};

/* Determine whether an object is an array. */
function isArray(a) {
	return (($.browser.safari && typeof a == 'object' && a.length) ||
		(a && a.constructor && a.constructor.toString().match(/\Array\(\)/)));
}

// Singleton primary SVG interface
$.svg = new SVGManager();

})(jQuery);
