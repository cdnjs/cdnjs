YUI.add('graphics-svg', function(Y) {

var SHAPE = "svgShape",
	Y_LANG = Y.Lang,
	AttributeLite = Y.AttributeLite,
	SVGGraphic,
    SVGShape,
	SVGCircle,
	SVGRect,
	SVGPath,
	SVGEllipse,
    DOCUMENT = Y.config.doc;

function SVGDrawing(){}

SVGDrawing.prototype = {
    /**
     * Draws a bezier curve.
     *
     * @method curveTo
     * @param {Number} cp1x x-coordinate for the first control point.
     * @param {Number} cp1y y-coordinate for the first control point.
     * @param {Number} cp2x x-coordinate for the second control point.
     * @param {Number} cp2y y-coordinate for the second control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    curveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
        var pathArrayLen,
            currentArray,
            hiX,
            loX,
            hiY,
            loY;
        if(this._pathType !== "C")
        {
            this._pathType = "C";
            currentArray = ["C"];
            this._pathArray.push(currentArray);
        }
        else
        {
            currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];
            if(!currentArray)
            {
                currentArray = [];
                this._pathArray.push(currentArray);
            }
        }
        pathArrayLen = this._pathArray.length - 1;
        this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat([Math.round(cp1x), Math.round(cp1y), Math.round(cp2x) , Math.round(cp2y), x, y]);
        hiX = Math.max(x, Math.max(cp1x, cp2x));
        hiY = Math.max(y, Math.max(cp1y, cp2y));
        loX = Math.min(x, Math.min(cp1x, cp2x));
        loY = Math.min(y, Math.min(cp1y, cp2y));
        this._trackSize(hiX, hiY);
        this._trackSize(loX, loY);
    },

    /**
     * Draws a quadratic bezier curve.
     *
     * @method quadraticCurveTo
     * @param {Number} cpx x-coordinate for the control point.
     * @param {Number} cpy y-coordinate for the control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    quadraticCurveTo: function(cpx, cpy, x, y) {
        var pathArrayLen,
            currentArray,
            hiX,
            loX,
            hiY,
            loY;
        if(this._pathType !== "Q")
        {
            this._pathType = "Q";
            currentArray = ["Q"];
            this._pathArray.push(currentArray);
        }
        else
        {
            currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];
            if(!currentArray)
            {
                currentArray = [];
                this._pathArray.push(currentArray);
            }
        }
        pathArrayLen = this._pathArray.length - 1;
        this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat([Math.round(cpx), Math.round(cpy), Math.round(x), Math.round(y)]);
        hiX = Math.max(x, cpx);
        hiY = Math.max(y, cpy);
        loX = Math.min(x, cpx);
        loY = Math.min(y, cpy);
        this._trackSize(hiX, hiY);
        this._trackSize(loX, loY);
    },

    /**
     * Draws a rectangle.
     *
     * @method drawRect
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @param {Number} w width
     * @param {Number} h height
     */
    drawRect: function(x, y, w, h) {
        this.moveTo(x, y);
        this.lineTo(x + w, y);
        this.lineTo(x + w, y + h);
        this.lineTo(x, y + h);
        this.lineTo(x, y);
    },

    /**
     * Draws a rectangle with rounded corners.
     * 
     * @method drawRect
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @param {Number} w width
     * @param {Number} h height
     * @param {Number} ew width of the ellipse used to draw the rounded corners
     * @param {Number} eh height of the ellipse used to draw the rounded corners
     */
    drawRoundRect: function(x, y, w, h, ew, eh) {
        this.moveTo(x, y + eh);
        this.lineTo(x, y + h - eh);
        this.quadraticCurveTo(x, y + h, x + ew, y + h);
        this.lineTo(x + w - ew, y + h);
        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        this.lineTo(x + w, y + eh);
        this.quadraticCurveTo(x + w, y, x + w - ew, y);
        this.lineTo(x + ew, y);
        this.quadraticCurveTo(x, y, x, y + eh);
	},

    /**
     * Draws a wedge.
     * 
     * @param {Number} x			x-coordinate of the wedge's center point
     * @param {Number} y			y-coordinate of the wedge's center point
     * @param {Number} startAngle	starting angle in degrees
     * @param {Number} arc			sweep of the wedge. Negative values draw clockwise.
     * @param {Number} radius		radius of wedge. If [optional] yRadius is defined, then radius is the x radius.
     * @param {Number} yRadius		[optional] y radius for wedge.
     */
    drawWedge: function(x, y, startAngle, arc, radius, yRadius)
    {
        var segs,
            segAngle,
            theta,
            angle,
            angleMid,
            ax,
            ay,
            bx,
            by,
            cx,
            cy,
            i = 0,
            diameter = radius * 2;
        yRadius = yRadius || radius;
        if(this._pathType != "M")
        {
            this._pathType = "M";
            currentArray = ["M"];
            this._pathArray.push(currentArray);
        }
        else
        {
            currentArray = this._getCurrentArray(); 
        }
        pathArrayLen = this._pathArray.length - 1;
        this._pathArray[pathArrayLen].push(x); 
        this._pathArray[pathArrayLen].push(x); 
        
        // limit sweep to reasonable numbers
        if(Math.abs(arc) > 360)
        {
            arc = 360;
        }
        
        // First we calculate how many segments are needed
        // for a smooth arc.
        segs = Math.ceil(Math.abs(arc) / 45);
        
        // Now calculate the sweep of each segment.
        segAngle = arc / segs;
        
        // The math requires radians rather than degrees. To convert from degrees
        // use the formula (degrees/180)*Math.PI to get radians.
        theta = -(segAngle / 180) * Math.PI;
        
        // convert angle startAngle to radians
        angle = (startAngle / 180) * Math.PI;
        if(segs > 0)
        {
            // draw a line from the center to the start of the curve
            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;
            ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;
            this._pathType = "L";
            pathArrayLen++;
            this._pathArray[pathArrayLen] = ["L"];
            this._pathArray[pathArrayLen].push(Math.round(ax));
            this._pathArray[pathArrayLen].push(Math.round(ay));
            pathArrayLen++; 
            this._pathType = "Q";
            this._pathArray[pathArrayLen] = ["Q"];
            for(; i < segs; ++i)
            {
                angle += theta;
                angleMid = angle - (theta / 2);
                bx = x + Math.cos(angle) * radius;
                by = y + Math.sin(angle) * yRadius;
                cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
                cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
                this._pathArray[pathArrayLen].push(Math.round(cx));
                this._pathArray[pathArrayLen].push(Math.round(cy));
                this._pathArray[pathArrayLen].push(Math.round(bx));
                this._pathArray[pathArrayLen].push(Math.round(by));
            }
        }
        this._trackSize(diameter, diameter); 
        return this;
    },
    
    /**
     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.
     * 
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     */
    lineTo: function(point1, point2, etc) {
        var args = arguments,
            i,
            len,
            pathArrayLen,
            currentArray;
        this._pathArray = this._pathArray || [];
        if (typeof point1 === 'string' || typeof point1 === 'number') {
            args = [[point1, point2]];
        }
        len = args.length;
        this._shapeType = "path";
        if(this._pathType !== "L")
        {
            this._pathType = "L";
            currentArray = ['L'];
            this._pathArray.push(currentArray);
        }
        else
        {
            currentArray = this._getCurrentArray();
        }
        pathArrayLen = this._pathArray.length - 1;
        for (i = 0; i < len; ++i) {
            this._pathArray[pathArrayLen].push(args[i][0]);
            this._pathArray[pathArrayLen].push(args[i][1]);
            this._trackSize.apply(this, args[i]);
        }
    },

    _getCurrentArray: function()
    {
        var currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];
        if(!currentArray)
        {
            currentArray = [];
            this._pathArray.push(currentArray);
        }
        return currentArray;
    },

    /**
     * Moves the current drawing position to specified x and y coordinates.
     *
     * @method moveTo
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    moveTo: function(x, y) {
        var pathArrayLen,
            currentArray;
        this._pathArray = this._pathArray || [];
        if(this._pathType != "M")
        {
            this._pathType = "M";
            currentArray = ["M"];
            this._pathArray.push(currentArray);
        }
        else
        {
            currentArray = this._getCurrentArray(); 
        }
        pathArrayLen = this._pathArray.length - 1;
        this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat([x, y]);
        this._trackSize(x, y);
    },

    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function() {
        this._draw();
    },

    /**
     * Updates the size of the graphics object
     *
     * @method _trackSize
     * @param {Number} w width
     * @param {Number} h height
     * @private
     */
    _trackSize: function(w, h) {
        if (w > this._right) {
            this._right = w;
        }
        if(w < this._left)
        {
            this._left = w;    
        }
        if (h < this._top)
        {
            this._top = h;
        }
        if (h > this._bottom) 
        {
            this._bottom = h;
        }
        this._width = this._right - this._left;
        this._height = this._bottom - this._top;
    }
};
Y.SVGDrawing = SVGDrawing;
/**
 * Base class for creating shapes.
 *
 * @class SVGShape
 */
SVGShape = function(cfg)
{
    SVGShape.superclass.constructor.apply(this, arguments);
};

SVGShape.NAME = "svgShape";

Y.extend(SVGShape, Y.BaseGraphic, {
    /**
     * @private
     */
	init: function()
	{
		this.initializer.apply(this, arguments);
	},

	/**
	 * Initializes the shape
	 *
	 * @private
	 * @method _initialize
	 */
	initializer: function(cfg)
	{
		var host = this;
		host.createNode(); 
		host._graphic = cfg.graphic;
		host._updateHandler();
	},
   
	/**
	 * Add a class name to each node.
	 *
	 * @method addClass
	 * @param {String} className the class name to add to the node's class attribute 
	 */
	addClass: function(className)
	{
		var node = this.node;
		node.className.baseVal = Y_LANG.trim([node.className.baseVal, className].join(' '));
	},

	/**
	 * Removes a class name from each node.
	 *
	 * @method removeClass
	 * @param {String} className the class name to remove from the node's class attribute
	 */
	removeClass: function(className)
	{
		var node = this.node,
			classString = node.className.baseVal;
		classString = classString.replace(new RegExp(className + ' '), className).replace(new RegExp(className), '');
		node.className.baseVal = classString;
	},

	/**
	 * Gets the current position of the node in page coordinates.
	 *
	 * @method getXY
	 * @return Array The XY position of the shape.
	 */
	getXY: function()
	{
		var graphic = this._graphic,
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		return [parentXY[0] + x, parentXY[1] + y];
	},

	/**
	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.
	 *
	 * @method setXY
	 * @param {Array} Contains X & Y values for new position (coordinates are page-based)
	 */
	setXY: function(xy)
	{
		var graphic = this._graphic,
			parentXY = graphic.getXY();
		this.set("x", xy[0] - parentXY[0]);
		this.set("y", xy[1] - parentXY[1]);
	},

	/**
	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy. 
	 *
	 * @method contains
	 * @param {SVGShape | HTMLElement} needle The possible node or descendent
	 * @return Boolean Whether or not this shape is the needle or its ancestor.
	 */
	contains: function(needle)
	{
		return needle === Y.one(this.node);
	},

	/**
	 * Compares nodes to determine if they match.
	 * Node instances can be compared to each other and/or HTMLElements.
	 * @method compareTo
	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.
	 * @return {Boolean} True if the nodes match, false if they do not.
	 */
	compareTo: function(refNode) {
		var node = this.node;

		return node === refNode;
	},

	/**
	 * Test if the supplied node matches the supplied selector.
	 *
	 * @method test
	 * @param {String} selector The CSS selector to test against.
	 * @return Boolean Wheter or not the shape matches the selector.
	 */
	test: function(selector)
	{
		return Y.Selector.test(this.node, selector);
	},
	
	/**
	 * Value function for fill attribute
	 *
	 * @private
	 * @method _getDefaultFill
	 * @return Object
	 */
	_getDefaultFill: function() {
		return {
			type: "solid",
			opacity: 1,
			cx: 0.5,
			cy: 0.5,
			fx: 0.5,
			fy: 0.5,
			r: 0.5
		};
	},
	
	/**
	 * Value function for stroke attribute
	 *
	 * @private
	 * @method _getDefaultStroke
	 * @return Object
	 */
	_getDefaultStroke: function() 
	{
		return {
			weight: 1,
			dashstyle: "none",
			color: "#000",
			opacity: 1.0
		};
	},

	/**
	 * Creates the dom node for the shape.
	 *
	 * @private
	 * @return HTMLElement
	 */
	createNode: function()
	{
		var node = document.createElementNS("http://www.w3.org/2000/svg", "svg:" + this._type),
			id = this.get("id"),
			pointerEvents = this.get("pointerEvents");
		this.node = node;
		this.addClass("yui3-" + SHAPE + " yui3-" + this.name);
		if(id)
		{
			node.setAttribute("id", id);
		}
		if(pointerEvents)
		{
			node.setAttribute("pointer-events", pointerEvents);
		}
	},

	/**
	 * @private
	 */
	isMouseEvent: function(type)
	{
		if(type.indexOf('mouse') > -1 || type.indexOf('click') > -1)
		{
			return true;
		}
		return false;
	},
	
	/**
	 * @private
	 */
	before: function(type, fn)
	{
		if(this.isMouseEvent(type))
		{
			return Y.before(type, fn, "#" +  this.get("id"));
		}
		return Y.on.apply(this, arguments);
	},
	
	/**
	 * @private
	 */
	on: function(type, fn)
	{
		if(this.isMouseEvent(type))
		{
			return Y.on(type, fn, "#" +  this.get("id"));
		}
		return Y.on.apply(this, arguments);
	},
	
	/**
	 * @private
	 */
	after: function(type, fn)
	{
		if(this.isMouseEvent(type))
		{
			return Y.after(type, fn, "#" +  this.get("id"));
		}
		return Y.on.apply(this, arguments);
	},
	
	/**
	 * Adds a stroke to the shape node.
	 *
	 * @method _strokeChangeHandler
	 * @private
	 */
	_strokeChangeHandler: function(e)
	{
		var node = this.node,
			stroke = this.get("stroke"),
			strokeOpacity,
			dashstyle,
			dash,
			linejoin;
		if(stroke && stroke.weight && stroke.weight > 0)
		{
			linejoin = stroke.linejoin || "round";
			strokeOpacity = parseFloat(stroke.opacity);
			dashstyle = stroke.dashstyle || "none";
			dash = Y_LANG.isArray(dashstyle) ? dashstyle.toString() : dashstyle;
			stroke.color = stroke.color || "#000000";
			stroke.weight = stroke.weight || 1;
			stroke.opacity = Y_LANG.isNumber(strokeOpacity) ? strokeOpacity : 1;
			stroke.linecap = stroke.linecap || "butt";
			node.setAttribute("stroke-dasharray", dash);
			node.setAttribute("stroke", stroke.color);
			node.setAttribute("stroke-linecap", stroke.linecap);
			node.setAttribute("stroke-width",  stroke.weight);
			node.setAttribute("stroke-opacity", stroke.opacity);
			if(linejoin == "round" || linejoin == "bevel")
			{
				node.setAttribute("stroke-linejoin", linejoin);
			}
			else
			{
				linejoin = parseInt(linejoin, 10);
				if(Y_LANG.isNumber(linejoin))
				{
					node.setAttribute("stroke-miterlimit",  Math.max(linejoin, 1));
					node.setAttribute("stroke-linejoin", "miter");
				}
			}
		}
		else
		{
			node.setAttribute("stroke", "none");
		}
	},
	
	/**
	 * Adds a fill to the shape node.
	 *
	 * @method _fillChangeHandler
	 * @private
	 */
	_fillChangeHandler: function(e)
	{
		var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			type;
		if(fill)
		{
			type = fill.type;
			if(type == "linear" || type == "radial")
			{
				this._setGradientFill(fill);
				node.setAttribute("fill", "url(#grad" + this.get("id") + ")");
			}
			else if(!fill.color)
			{
				node.setAttribute("fill", "none");
			}
			else
			{
                fillOpacity = parseFloat(fill.opacity);
				fillOpacity = Y_LANG.isNumber(fillOpacity) ? fillOpacity : 1;
				node.setAttribute("fill", fill.color);
				node.setAttribute("fill-opacity", fillOpacity);
			}
		}
		else
		{
			node.setAttribute("fill", "none");
		}
	},

	/**
	 * Returns a linear gradient fill
	 *
	 * @method _getLinearGradient
	 * @param {String} type gradient type
	 * @private
	 */
	_setGradientFill: function(fill) {
		var offset,
			opacity,
			color,
			stopNode,
			isNumber = Y_LANG.isNumber,
			graphic = this._graphic,
			type = fill.type, 
			gradientNode = graphic.getGradientNode("grad" + this.get("id"), type),
			stops = fill.stops,
			w = this.get("width"),
			h = this.get("height"),
			rotation = fill.rotation,
			i,
			len,
			def,
			stop,
			x1 = "0%", 
			x2 = "100%", 
			y1 = "50%", 
			y2 = "50%",
			cx = fill.cx,
			cy = fill.cy,
			fx = fill.fx,
			fy = fill.fy,
			r = fill.r;
		if(type == "linear")
		{
			gradientNode.setAttribute("gradientTransform", "rotate(" + rotation + "," + (w/2) + ", " + (h/2) + ")");
			gradientNode.setAttribute("width", w);
			gradientNode.setAttribute("height", h);
			gradientNode.setAttribute("x1", x1);
			gradientNode.setAttribute("y1", y1);
			gradientNode.setAttribute("x2", x2);
			gradientNode.setAttribute("y2", y2);
			gradientNode.setAttribute("gradientUnits", "userSpaceOnUse");
		}
		else
		{
			gradientNode.setAttribute("cx", (cx * 100) + "%");
			gradientNode.setAttribute("cy", (cy * 100) + "%");
			gradientNode.setAttribute("fx", (fx * 100) + "%");
			gradientNode.setAttribute("fy", (fy * 100) + "%");
			gradientNode.setAttribute("r", (r * 100) + "%");
		}
		
		len = stops.length;
		def = 0;
		for(i = 0; i < len; ++i)
		{
			stop = stops[i];
			opacity = stop.opacity;
			color = stop.color;
			offset = stop.offset || i/(len - 1);
			offset = Math.round(offset * 100) + "%";
			opacity = isNumber(opacity) ? opacity : 1;
			opacity = Math.max(0, Math.min(1, opacity));
			def = (i + 1) / len;
			stopNode = graphic._createGraphicNode("stop");
			stopNode.setAttribute("offset", offset);
			stopNode.setAttribute("stop-color", color);
			stopNode.setAttribute("stop-opacity", opacity);
			gradientNode.appendChild(stopNode);
		}
	},

	/**
	 * @private
	 */
	set: function() 
	{
		var host = this;
		AttributeLite.prototype.set.apply(host, arguments);
		if(host.initialized)
		{
			host._updateHandler();
		}
	},

	/**
	 * Applies translate transformation.
	 *
	 * @method translate
	 * @param {Number} x The x-coordinate
	 * @param {Number} y The y-coordinate
	 */
	translate: function(x, y)
	{
		this._translateX = x;
		this._translateY = y;
		this._translate.apply(this, arguments);
	},

	/**
	 * Applies translate transformation.
	 *
	 * @method translate
	 * @param {Number} x The x-coordinate
	 * @param {Number} y The y-coordinate
	 * @protected
	 */
	_translate: function(x, y)
	{
		this._addTransform("translate", arguments);
	},

	/**
	 * Applies a skew to the x-coordinate
	 *
	 * @method skewX
	 * @param {Number} x x-coordinate
	 */
	 skewX: function(x)
	 {
		this._addTransform("skewX", arguments);
	 },

	/**
	 * Applies a skew to the x-coordinate
	 *
	 * @method skewX
	 * @param {Number} x x-coordinate
	 */
	 skewY: function(y)
	 {
		this._addTransform("skewY", arguments);
	 },

	/**
	 * @private
	 */
	 _rotation: 0,

	 /**
	  * Applies a rotation.
	  *
	  * @method rotate
	  * @param
	  */
	 rotate: function(deg)
	 {
		this._rotation = deg;
		this._addTransform("rotate", arguments);
	 },

	/**
	 * Applies a scale transform
	 *
	 * @method scale
	 * @param {Number} val
	 */
	scale: function(val)
	{
		this._addTransform("scale", arguments);
	},

	/**
	 * Applies a matrix transformation
	 *
	 * @method matrix
	 */
	matrix: function(a, b, c, d, e, f)
	{
		this._addTransform("matrix", arguments);
	},

	/**
	 * @private
	 */
	_addTransform: function(type, args)
	{
		if(!this._transformArgs)
		{
			this._transformArgs = {};
		}
		this._transformArgs[type] = Array.prototype.slice.call(args, 0);
		this._updateTransform();
	},

	/**
	 * @private
	 */
	_updateTransform: function()
	{
		var node = this.node,
			key,
			args,
			val,
			transform = node.getAttribute("transform"),
			test,
			transformOrigin;
		if(this._transformArgs)
		{
			if(this._transformArgs.hasOwnProperty("rotate"))
			{
				transformOrigin = this.get("transformOrigin");
				args = this._transformArgs.rotate;
				args[1] = this.get("x") + (this.get("width") * transformOrigin[0]);
				args[2] = this.get("y") + (this.get("height") * transformOrigin[1]);
			}
		}
		for(key in this._transformArgs)
		{
			if(key && this._transformArgs.hasOwnProperty(key))
			{
				val = key + "(" + this._transformArgs[key].toString() + ")";
				if(transform && transform.length > 0)
				{
					test = new RegExp(key + '(.*)');
					if(transform.indexOf(key) > -1)
					{
						transform = transform.replace(test, val);
					}
					else
					{
						transform += " " + val;
					}
				}
				else
				{
					transform = val;
				}
			}
		}
        this._graphic.addToRedrawQueue(this);    
		if(transform)
		{
			node.setAttribute("transform", transform);
		}
	},

	/**
	 * Updates the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
		var node = this.node;
		node.setAttribute("width", this.get("width"));
		node.setAttribute("height", this.get("height"));
		node.setAttribute("x", this.get("x"));
		node.setAttribute("y", this.get("y"));
		node.style.left = this.get("x") + "px";
		node.style.top = this.get("y") + "px";
		this._fillChangeHandler();
		this._strokeChangeHandler();
		this._updateTransform();
	},

	/**
	 * Change event listener
	 *
	 * @private
	 * @method _updateHandler
	 */
	_updateHandler: function(e)
	{
		this._draw();
	},
	
	/**
	 * Storage for translateX
	 *
	 * @private
	 */
	_translateX: 0,

	/**
	 * Storage for translateY
	 *
	 * @private
	 */
	_translateY: 0,

	/**
	 * Returns the bounds for a shape.
	 *
	 * @method getBounds
	 * @return Object
	 */
	getBounds: function()
	{
		var rotation = this.get("rotation"),
			radCon = Math.PI/180,
			sinRadians = parseFloat(parseFloat(Math.sin(rotation * radCon)).toFixed(8)),
			cosRadians = parseFloat(parseFloat(Math.cos(rotation * radCon)).toFixed(8)),
			w = this.get("width"),
			h = this.get("height"),
			stroke = this.get("stroke"),
			x = this.get("x"),
			y = this.get("y"),
            right = x + w,
            bottom = y + h,
            tlx,
            tly,
            blx,
            bly,
            brx,
            bry,
            trx,
            trY,
            wt = 0,
			tx = this.get("translateX"),
			ty = this.get("translateY"),
			bounds = {},
			transformOrigin = this.get("transformOrigin"),
			tox = transformOrigin[0],
			toy = transformOrigin[1];
		if(stroke && stroke.weight)
		{
			wt = stroke.weight;
		}
		if(rotation !== 0)
		{
            tox = x + (tox * w);
            toy = y + (toy * h);
            tlx = this._getRotatedCornerX(x, y, tox, toy, cosRadians, sinRadians); 
            tly = this._getRotatedCornerY(x, y, tox, toy, cosRadians, sinRadians); 
            blx = this._getRotatedCornerX(x, bottom, tox, toy, cosRadians, sinRadians); 
            bly = this._getRotatedCornerY(x, bottom, tox, toy, cosRadians, sinRadians);
            brx = this._getRotatedCornerX(right, bottom, tox, toy, cosRadians, sinRadians);
            bry = this._getRotatedCornerY(right, bottom, tox, toy, cosRadians, sinRadians);
            trx = this._getRotatedCornerX(right, y, tox, toy, cosRadians, sinRadians);
            trY = this._getRotatedCornerY(right, y, tox, toy, cosRadians, sinRadians);
            bounds.left = Math.min(tlx, Math.min(blx, Math.min(brx, trx)));
            bounds.right = Math.max(tlx, Math.max(blx, Math.max(brx, trx)));
            bounds.top = Math.min(tly, Math.min(bly, Math.min(bry, trY)));
            bounds.bottom = Math.max(tly, Math.max(bly, Math.max(bry, trY)));
		}
        else
        {
            bounds.left = x - wt + tx;
            bounds.top = y - wt + ty;
            bounds.right = x + w + wt + tx;
            bounds.bottom = y + h + wt + ty;
        }
		return bounds;
	},

    /**
     * Returns the x coordinate for a bounding box's corner based on the corner's original x/y coordinates, rotation and transform origin of the rotation.
     *
     * @method _getRotatedCornerX
     * @param {Number} x original x-coordinate of corner
     * @param {Number} y original y-coordinate of corner
     * @param {Number} tox transform origin x-coordinate of rotation
     * @param {Number} toy transform origin y-coordinate of rotation
     * @param {Number} cosRadians cosine (in radians) of rotation
     * @param {Number} sinRadians sin (in radians) or rotation
     * @return Number
     * @private
     */
    _getRotatedCornerX: function(x, y, tox, toy, cosRadians, sinRadians)
    {
        return (tox + (x - tox) * cosRadians + (y - toy) * sinRadians);
    },

    /**
     * Returns the y coordinate for a bounding box's corner based on the corner's original x/y coordinates, rotation and transform origin of the rotation.
     *
     * @method _getRotatedCornerY
     * @param {Number} x original x-coordinate of corner
     * @param {Number} y original y-coordinate of corner
     * @param {Number} tox transform origin x-coordinate of rotation
     * @param {Number} toy transform origin y-coordinate of rotation
     * @param {Number} cosRadians cosine (in radians) of rotation
     * @param {Number} sinRadians sin (in radians) or rotation
     * @return Number
     * @private
     */
    _getRotatedCornerY: function(x, y, tox, toy, cosRadians, sinRadians)
    {
        return (toy - (x - tox) * sinRadians + (y - toy) * cosRadians);
    },

    destroy: function()
    {
        if(this._graphic && this._graphic._contentNode)
        {
            this._graphic._contentNode.removeChild(this.node);
        }
    }
 });
	
SVGShape.ATTRS = {
	/**
	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a 
	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].
	 *
	 * @attribute transformOrigin
	 * @type Array
	 */
	transformOrigin: {
		valueFn: function()
		{
			return [0.5, 0.5];
		}
	},

	/**
	 * The rotation (in degrees) of the shape.
	 *
	 * @attribute rotation
	 * @type Number
	 */
	rotation: {
		setter: function(val)
		{
			this.rotate(val);
		},

		getter: function()
		{
			return this._rotation;
		}
	},

	/**
	 * Unique id for class instance.
	 *
	 * @attribute id
	 * @type String
	 */
	id: {
		valueFn: function()
		{
			return Y.guid();
		},

		setter: function(val)
		{
			var node = this.node;
			if(node)
			{
				node.setAttribute("id", val);
			}
			return val;
		}
	},

	/**
	 * Indicates the x position of shape.
	 *
	 * @attribute x
	 * @type Number
	 */
	x: {
		value: 0
	},

	/**
	 * Indicates the y position of shape.
	 *
	 * @attribute y
	 * @type Number
	 */
	y: {
		value: 0
	},

	/**
	 * Indicates the width of the shape
	 *
	 * @attribute width
	 * @type Number
	 */
	width: {
        value: 0
    },

	/**
	 * Indicates the height of the shape
	 * 
	 * @attribute height
	 * @type Number
	 */
	height: {
        value: 0
    },

	/**
	 * Indicates whether the shape is visible.
	 *
	 * @attribute visible
	 * @type Boolean
	 */
	visible: {
		value: true,

		setter: function(val){
			var visibility = val ? "visible" : "hidden";
			this.node.style.visibility = visibility;
			return val;
		}
	},

	/**
	 * Contains information about the fill of the shape. 
	 *  <dl>
	 *      <dt>color</dt><dd>The color of the fill.</dd>
	 *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>
	 *      <dt>type</dt><dd>Type of fill.
	 *          <dl>
	 *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>
	 *              <dt>linear</dt><dd>Linear gradient fill.</dd>
	 *              <dt>radial</dt><dd>Radial gradient fill.</dd>
	 *          </dl>
	 *      </dd>
	 *  </dl>
	 *
	 *  <p>If a gradient (linear or radial) is specified as the fill type. The following properties are used:
	 *  <dl>
	 *      <dt>stops</dt><dd>An array of objects containing the following properties:
	 *          <dl>
	 *              <dt>color</dt><dd>The color of the stop.</dd>
	 *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1. Note: No effect for IE <= 8</dd>
	 *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd> 
	 *          </dl>
	 *      </dd>
	 *      <dt></dt><dd></dd>
	 *      <dt></dt><dd></dd>
	 *      <dt></dt><dd></dd>
	 *  </dl>
	 *  </p>
	 *
	 * @attribute fill
	 * @type Object 
	 */
	fill: {
		valueFn: "_getDefaultFill",
		
		setter: function(val)
		{
			var fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			fill = (val) ? Y.merge(tmpl, val) : null;
			if(fill && fill.color)
			{
				if(fill.color === undefined || fill.color == "none")
				{
					fill.color = null;
				}
			}
			return fill;
		}
	},

	/**
	 * Contains information about the stroke of the shape.
	 *  <dl>
	 *      <dt>color</dt><dd>The color of the stroke.</dd>
	 *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>
	 *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>
	 *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to "none", a solid stroke is drawn. When set to an array, the first index indicates the
	 *      length of the dash. The second index indicates the length of gap.
	 *  </dl>
	 *
	 * @attribute stroke
	 * @type Object
	 */
	stroke: {
		valueFn: "_getDefaultStroke",

		setter: function(val)
		{
			var tmpl = this.get("stroke") || this._getDefaultStroke();
			return (val) ? Y.merge(tmpl, val) : null;
		}
	},
	
	/**
	 * Indicates whether or not the instance will size itself based on its contents.
	 *
	 * @attribute autoSize 
	 * @type Boolean
	 */
	autoSize: {
		value: false
	},

	/**
	 * Determines whether the instance will receive mouse events.
	 * 
	 * @attribute pointerEvents
	 * @type string
	 */
	pointerEvents: {
		valueFn: function() 
		{
			var val = "visiblePainted",
				node = this.node;
			if(node)
			{
				node.setAttribute("pointer-events", val);
			}
			return val;
		},

		setter: function(val)
		{
			var node = this.node;
			if(node)
			{
				node.setAttribute("pointer-events", val);
			}
			return val;
		}
	},

	/**
	 * Performs a translate on the x-coordinate. When translating x and y coordinates,
	 * use the <code>translate</code> method.
	 *
	 * @attribute translateX
	 * @type Number
	 */
	translateX: {
		getter: function()
		{
			return this._translateX;
		},

		setter: function(val)
		{
			this._translateX = val;
			this._translate(val, this._translateY);
			return val;
		}
	},
	
	/**
	 * Performs a translate on the y-coordinate. When translating x and y coordinates,
	 * use the <code>translate</code> method.
	 *
	 * @attribute translateX
	 * @type Number
	 */
	translateY: {
		getter: function()
		{
			return this._translateY;
		},

		setter: function(val)
		{
			this._translateY = val;
			this._translate(this._translateX, val);
			return val;
		}
	},

	/**
	 * The node used for gradient fills.
	 *
	 * @attribute gradientNode
	 * @type HTMLElement
	 */
	gradientNode: {
		setter: function(val)
		{
			if(Y_LANG.isString(val))
			{
				val = this._graphic.getGradientNode("linear", val);
			}
			return val;
		}
	},

	/**
	 * Indicates whether to automatically refresh.
	 *  
	 * @attribute autoDraw
	 * @type Boolean
	 * @readOnly
	 */
	autoDraw: {
		getter: function()
		{
			return this._graphic.autoDraw;
		}
	},

	/**
	 * Dom node for the shape.
	 *
	 * @attribute node
	 * @type HTMLElement
	 * @readOnly
	 */
	node: {
		readOnly: true,

		getter: function()
		{
			return this.node;
		}
	},

	/**
	 * Reference to the parent graphic instance
	 *
	 * @graphic
	 * @type SVGGraphic
	 * @readOnly
	 */
	graphic: {
		readOnly: true,

		getter: function()
		{
			return this._graphic;
		}
	}
};
Y.SVGShape = SVGShape;

/**
 * The SVGPath class creates a shape through the use of drawing methods.
 *
 * @class SVGPath
 * @extends SVGShape
 */
SVGPath = function(cfg)
{
	SVGPath.superclass.constructor.apply(this, arguments);
};
SVGPath.NAME = "svgPath";
Y.extend(SVGPath, Y.SVGShape, Y.merge(Y.SVGDrawing.prototype, {
    /**
     * Left edge of the path
     *
     * @private
     * @property _left
     */
    _left: 0,

    /**
     * Right edge of the path
     *
     * @private
     * @property _right
     */
    _right: 0,
    
    /**
     * Top edge of the path
     *
     * @private
     * @property _top
     */
    _top: 0, 
    
    /**
     * Bottom edge of the path
     *
     * @private
     * @property _bottom
     */
    _bottom: 0,

    /**
     * Indicates the type of shape
     *
     * @private
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "path",

    /**
     * Draws the path.
     *
     * @method _draw
     * @private
     */
    _draw: function()
    {
        var pathArray,
            segmentArray,
            pathType,
            len,
            val,
            val2,
            i,
            path = "",
            node = this.node,
            tx = this.get("translateX"),
            ty = this.get("translateY"),
            left = this._left,
            top = this._top,
            fill = this.get("fill");
        if(this._pathArray)
        {
            pathArray = this._pathArray.concat();
            while(pathArray && pathArray.length > 0)
            {
                segmentArray = pathArray.shift();
                len = segmentArray.length;
                pathType = segmentArray[0];
                path += " " + pathType + (segmentArray[1] - left);
                switch(pathType)
                {
                    case "L" :
                    case "M" :
                    case "Q" :
                        for(i = 2; i < len; ++i)
                        {
                            val = (i % 2 === 0) ? top : left;
                            val = segmentArray[i] - val;
                            path += ", " + val;
                        }
                    break;
                    case "C" :
                        for(i = 2; i < len; ++i)
                        {
                            val = (i % 2 === 0) ? top : left;
                            val2 = segmentArray[i];
                            val2 -= val;
                            path += " " + val2;
                        }
                    break;

                }
            }
            if(fill && fill.color)
            {
                path += 'z';
            }
            if(path)
            {
                node.setAttribute("d", path);
            }
            //Use transform to handle positioning.
            this._transformArgs = this._transformArgs || {};
            this._transformArgs.translate = [left + tx, top + ty];
            
            this._path = path;
            this._fillChangeHandler();
            this._strokeChangeHandler();
            this._updateTransform();
        }
    },
   
    /**
     * Applies translate transformation.
     *
     * @method translate
     * @param {Number} x The x-coordinate
     * @param {Number} y The y-coordinate
     */
    translate: function(x, y)
    {
        x = parseInt(x, 10);
        y = parseInt(y, 10);
        this._translateX = x;
        this._translateY = y;
        this._translate(this._left + x, this._top + y);
    },
  
	/**
	 * @private
	 */ 
	_updateHandler: function()
	{
		//do nothing
	},
 
    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function()
    {
        this._draw();
        this._graphic.addToRedrawQueue(this);    
    },

    /**
     * Clears the path.
     *
     * @method clear
     */
    clear: function()
    {
        this._left = 0;
        this._right = 0;
        this._top = 0;
        this._bottom = 0;
        this._pathArray = [];
        this._path = "";
    },

    /**
     * Returns the bounds for a shape.
     *
     * @method getBounds
     * @return Object
     */
    getBounds: function()
    {
        var wt = 0,
            bounds = {},
            stroke = this.get("stroke"),
            tx = this.get("translateX"),
            ty = this.get("translateY");
        if(stroke && stroke.weight)
        {
            wt = stroke.weight;
        }
        bounds.left = this._left - wt + tx;
        bounds.top = this._top - wt + ty;
        bounds.right = (this._right - this._left) + wt + tx;
        bounds.bottom = (this._bottom - this._top) + wt + ty;
        return bounds;
    },

	_path: ""
}));

SVGPath.ATTRS = Y.merge(Y.SVGShape.ATTRS, {
	/**
	 * Path string of the shape
	 *
	 * @attribute path
	 * @type String
	 */	
	path: {
		readOnly: true,

		getter: function()
		{
			return this._path;
		}
	},

	/**
	 * Indicates the height of the shape
	 * 
	 * @attribute height
	 * @type Number
	 */
	width: {
		getter: function()
		{
			var val = Math.max(this._right - this._left, 0);
			return val;
		}
	},

	/**
	 * Indicates the height of the shape
	 * 
	 * @attribute height
	 * @type Number
	 */
	height: {
		getter: function()
		{
			return Math.max(this._bottom - this._top, 0);
		}
	}
});
Y.SVGPath = SVGPath;
/**
 * Draws rectangles
 */
SVGRect = function()
{
	SVGRect.superclass.constructor.apply(this, arguments);
};
SVGRect.NAME = "svgRect";
Y.extend(SVGRect, Y.SVGShape, {
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "rect"
 });
SVGRect.ATTRS = Y.SVGShape.ATTRS;
Y.SVGRect = SVGRect;
/**
 * Draws an ellipse
 */
SVGEllipse = function(cfg)
{
	SVGEllipse.superclass.constructor.apply(this, arguments);
};

SVGEllipse.NAME = "svgEllipse";

Y.extend(SVGEllipse, SVGShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @readOnly
	 * @type String
	 */
	_type: "ellipse",

	/**
	 * Updates the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
		var node = this.node,
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y"),
			xRadius = w * 0.5,
			yRadius = h * 0.5,
			cx = x + xRadius,
			cy = y + yRadius;
		node.setAttribute("rx", xRadius);
		node.setAttribute("ry", yRadius);
		node.setAttribute("cx", cx);
		node.setAttribute("cy", cy);
		this._fillChangeHandler();
		this._strokeChangeHandler();
		this._updateTransform();
	}
});

SVGEllipse.ATTRS = Y.merge(SVGShape.ATTRS, {
	/**
	 * Horizontal radius for the ellipse.
	 *
	 * @attribute xRadius
	 * @type Number
	 * @readOnly
	 */
	xRadius: {
		setter: function(val)
		{
			this.set("width", val/2);
		},

		getter: function()
		{
			var val = this.get("width");
			if(val) 
			{
				val *= 0.5;
			}
			return val;
		}
	},

	/**
	 * Vertical radius for the ellipse.
	 *
	 * @attribute yRadius
	 * @type Number
	 * @readOnly
	 */
	yRadius: {
		setter: function(val)
		{
			this.set("height", val/2);
		},

		getter: function()
		{
			var val = this.get("height");
			if(val) 
			{
				val *= 0.5;
			}
			return val;
		}
	}
});
Y.SVGEllipse = SVGEllipse;
/**
 * Draws an circle
 */
 SVGCircle = function(cfg)
 {
    SVGCircle.superclass.constructor.apply(this, arguments);
 };
    
 SVGCircle.NAME = "svgCircle";

 Y.extend(SVGCircle, Y.SVGShape, {    
    
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "circle",

    /**
     * Updates the shape.
     *
     * @method _draw
     * @private
     */
    _draw: function()
    {
        var node = this.node,
            x = this.get("x"),
            y = this.get("y"),
            radius = this.get("radius"),
            cx = x + radius,
            cy = y + radius;
        node.setAttribute("r", radius);
        node.setAttribute("cx", cx);
        node.setAttribute("cy", cy);
        this._fillChangeHandler();
        this._strokeChangeHandler();
        this._updateTransform();
    }
 });
    
SVGCircle.ATTRS = Y.merge(Y.SVGShape.ATTRS, {
	/**
	 * Indicates the width of the shape
	 *
	 * @attribute width
	 * @type Number
	 */
    width: {
        setter: function(val)
        {
            this.set("radius", val/2);
            return val;
        },

        getter: function()
        {
            return this.get("radius") * 2;
        }
    },

	/**
	 * Indicates the height of the shape
	 *
	 * @attribute height
	 * @type Number
	 */
    height: {
        setter: function(val)
        {
            this.set("radius", val/2);
            return val;
        },

        getter: function()
        {
            return this.get("radius") * 2;
        }
    },

    /**
     * Radius of the circle
     *
     * @attribute radius
     * @type Number
     */
    radius: {
        value: 0
    }
});
Y.SVGCircle = SVGCircle;
/**
 * Draws pie slices
 */
SVGPieSlice = function()
{
	SVGPieSlice.superclass.constructor.apply(this, arguments);
};
SVGPieSlice.NAME = "svgPieSlice";
Y.extend(SVGPieSlice, Y.SVGPath, {
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "path",

	/**
	 * Change event listener
	 *
	 * @private
	 * @method _updateHandler
	 */
	_updateHandler: function(e)
	{
        var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        this.clear();
        this.drawWedge(x, y, startAngle, arc, radius)
		this._draw();
	}
 });
SVGPieSlice.ATTRS = Y.mix(Y.SVGPath.ATTRS, {
    cx: {
        value: 0
    },

    cy: {
        value: 0
    },
    /**
     * Starting angle in relation to a circle in which to begin the pie slice drawing.
     *
     * @attribute startAngle
     * @type Number
     */
    startAngle: {
        value: 0
    },

    /**
     * Arc of the slice.
     *
     * @attribute arc
     * @type Number
     */
    arc: {
        value: 0
    },

    /**
     * Radius of the circle in which the pie slice is drawn
     *
     * @attribute radius
     * @type Number
     */
    radius: {
        value: 0
    }
});
Y.SVGPieSlice = SVGPieSlice;
/**
 * Graphic is a simple drawing api that allows for basic drawing operations.
 *
 * @class Graphic
 * @constructor
 */
SVGGraphic = function(cfg) {
    SVGGraphic.superclass.constructor.apply(this, arguments);
};

SVGGraphic.NAME = "svgGraphic";

SVGGraphic.ATTRS = {
    render: {},
	
    /**
	 * Unique id for class instance.
	 *
	 * @attribute id
	 * @type String
	 */
	id: {
		valueFn: function()
		{
			return Y.guid();
		},

		setter: function(val)
		{
			var node = this._node;
			if(node)
			{
				node.setAttribute("id", val);
			}
			return val;
		}
	},

    /**
     * Key value pairs in which a shape instance is associated with its id.
     *
     *  @attribute shapes
     *  @type Object
     *  @readOnly
     */
    shapes: {
        readOnly: true,

        getter: function()
        {
            return this._shapes;
        }
    },

    /**
     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.
     *
     *  @attribute contentBounds
     *  @type Object 
     *  @readOnly
     */
    contentBounds: {
        readOnly: true,

        getter: function()
        {
            return this._contentBounds;
        }
    },

    /**
     *  The html element that represents to coordinate system of the Graphic instance.
     *
     *  @attribute node
     *  @type HTMLElement
     *  @readOnly
     */
    node: {
        readOnly: true,

        getter: function()
        {
            return this._node;
        }
    },
    
    width: {
        setter: function(val)
        {
            if(this._node)
            {
                this._node.style.width = val + "px";
            }
            return val; 
        }
    },

    height: {
        setter: function(val)
        {
            if(this._node)
            {
                this._node.style.height = val  + "px";
            }
            return val;
        }
    },

    /**
     *  Determines how the size of instance is calculated. If true, the width and height are determined by the size of the contents.
     *  If false, the width and height values are either explicitly set or determined by the size of the parent node's dimensions.
     *
     *  @attribute autoSize
     *  @type Boolean
     *  @default false
     */
    autoSize: {
        value: false
    },

    /**
     * When overflow is set to true, by default, the viewBox will resize to greater values but not values. (for performance)
     * When resizing the viewBox down is desirable, set the resizeDown value to true.
     *
     * @attribute resizeDown 
     * @type Boolean
     */
    resizeDown: {
        getter: function()
        {
            return this._resizeDown;
        },

        setter: function(val)
        {
            this._resizeDown = val;
            this._redraw();
            return val;
        }
    },

	/**
	 * Indicates the x-coordinate for the instance.
	 *
	 * @attribute x
	 * @type Number
	 */
    x: {
        getter: function()
        {
            return this._x;
        },

        setter: function(val)
        {
            this._x = val;
            if(this._node)
            {
                this._node.style.left = val + "px";
            }
            return val;
        }
    },

	/**
	 * Indicates the y-coordinate for the instance.
	 *
	 * @attribute y
	 * @type Number
	 */
    y: {
        getter: function()
        {
            return this._y;
        },

        setter: function(val)
        {
            this._y = val;
            if(this._node)
            {
                this._node.style.top = val + "px";
            }
            return val;
        }
    },

    /**
     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.
     * This property will get set to false when batching operations.
     *
     * @attribute autoDraw
     * @type Boolean
     * @default true
     * @private
     */
    autoDraw: {
        value: true
    },
    
    visible: {
        value: true,

        setter: function(val)
        {
            this._toggleVisible(val);
            return val;
        }
    },

    /**
     *  Indicates the pointer-events setting for the svg:svg element.
     *
     *  @attribute pointerEvents
     *  @type String
     */
    pointerEvents: {
        value: "none"
    }
};

Y.extend(SVGGraphic, Y.BaseGraphic, {
    /**
     * @private
     */
    _x: 0,

    /**
     * @private
     */
    _y: 0,

    /**
     * Gets the current position of the graphic instance in page coordinates.
     *
     * @method getXY
     * @return Array The XY position of the shape.
     */
    getXY: function()
    {
        var node = Y.one(this._node),
            xy;
        if(node)
        {
            xy = node.getXY();
        }
        return xy;
    },

    /**
     * @private
     * @property _resizeDown 
     * @type Boolean
     */
    _resizeDown: false,

    /**
     * Initializes the class.
     *
     * @method initializer
     * @private
     */
    initializer: function() {
        var render = this.get("render");
        this._shapes = {};
		this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this._gradients = {};
        this._node = DOCUMENT.createElement('div');
        this._node.style.position = "absolute";
        this._node.style.left = this.get("x") + "px";
        this._node.style.top = this.get("y") + "px";
        this._contentNode = this._createGraphics();
        this._contentNode.setAttribute("id", this.get("id"));
        this._node.appendChild(this._contentNode);
        if(render)
        {
            this.render(render);
        }
    },

    /**
     * Adds the graphics node to the dom.
     * 
     * @method render
     * @param {HTMLElement} parentNode node in which to render the graphics node into.
     */
    render: function(render) {
        var parentNode = Y.one(render),
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        parentNode = parentNode || DOCUMENT.body;
        parentNode.appendChild(this._node);
        this.parentNode = parentNode;
        this.set("width", w);
        this.set("height", h);
        this.parentNode = parentNode;
        return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        this.removeAllShapes();
        this._removeChildren(this._node);
        if(this._node && this._node.parentNode)
        {
            this._node.parentNode.removeChild(this._node);
        }
    },

    /**
     * Generates a shape instance by type.
     *
     * @method getShape
     * @param {String} type type of shape to generate.
     * @param {Object} cfg attributes for the shape
     * @return Shape
     */
    getShape: function(cfg)
    {
        cfg.graphic = this;
        var shape = new this._shapeClass[cfg.type](cfg);
        this.addShape(shape);
        return shape;
    },

    /**
     * Adds a shape instance to the graphic instance.
     *
     * @method addShape
     * @param {Shape} shape The shape instance to be added to the graphic.
     */
    addShape: function(shape)
    {
        var node = shape.node,
            parentNode = this._frag || this._contentNode;
        if(this.get("autoDraw")) 
        {
            parentNode.appendChild(node);
        }
        else
        {
            this._getDocFrag().appendChild(node);
        }
    },

    /**
     * Removes a shape instance from from the graphic instance.
     *
     * @method removeShape
     * @param {Shape|String}
     */
    removeShape: function(shape)
    {
        if(!(shape instanceof SVGShape))
        {
            if(Y_LANG.isString(shape))
            {
                shape = this._shapes[shape];
            }
        }
        if(shape && shape instanceof SVGShape)
        {
            shape.destroy();
            delete this._shapes[shape.get("id")];
        }
        if(this.get("autoDraw")) 
        {
            this._redraw();
        }
        return shape;
    },

    /**
     * Removes all shape instances from the dom.
     *
     * @method removeAllShapes
     */
    removeAllShapes: function()
    {
        var shapes = this._shapes,
            i;
        for(i in shapes)
        {
            if(shapes.hasOwnProperty(i))
            {
                shapes[i].destroy();
            }
        }
        this._shapes = {};
    },
    
    /**
     * Removes all child nodes.
     *
     * @method _removeChildren
     * @param {HTMLElement} node
     * @private
     */
    _removeChildren: function(node)
    {
        if(node.hasChildNodes())
        {
            var child;
            while(node.firstChild)
            {
                child = node.firstChild;
                this._removeChildren(child);
                node.removeChild(child);
            }
        }
    },

    /**
     * Clears the graphics object.
     *
     * @method clear
     */
    clear: function() {
        this.removeAllShapes();
    },

    /**
     * Toggles visibility
     *
     * @method _toggleVisible
     * @param {Boolean} val indicates visibilitye
     * @private
     */
    _toggleVisible: function(val)
    {
        var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        if(shapes)
        {
            for(i in shapes)
            {
                if(shapes.hasOwnProperty(i))
                {
                    shapes[i].set("visible", val);
                }
            }
        }
        this._contentNode.style.visibility = visibility;
        this._node.style.visibility = visibility;
    },

    /**
     * @private
     */
    _shapeClass: {
        circle: Y.SVGCircle,
        rect: Y.SVGRect,
        path: Y.SVGPath,
        ellipse: Y.SVGEllipse,
        pieslice: Y.SVGPieSlice
    },
    
    /**
     * Returns a shape based on the id of its dom node.
     *
     * @method getShapeById
     * @param {String} id Dom id of the shape's node attribute.
     * @return Shape
     */
    getShapeById: function(id)
    {
        var shape = this._shapes[id];
        return shape;
    },

	/**
	 * Allows for creating multiple shapes in order to batch appending and redraw operations.
	 *
	 * @method batch
	 * @param {Function} method Method to execute.
	 */
    batch: function(method)
    {
        var autoDraw = this.get("autoDraw");
        this.set("autoDraw", false);
        method();
        this._redraw();
        this.set("autoDraw", autoDraw);
    },
    
    _getDocFrag: function()
    {
        if(!this._frag)
        {
            this._frag = document.createDocumentFragment();
        }
        return this._frag;
    },

    _redraw: function()
    {
        var box = this.get("resizeDown") ? this._getUpdatedContentBounds() : this._contentBounds;
        this._contentNode.style.left = box.left + "px";
        this._contentNode.style.top = box.top + "px";
        this._contentNode.setAttribute("width", box.width);
        this._contentNode.setAttribute("height", box.height);
        this._contentNode.style.width = box.width + "px";
        this._contentNode.style.height = box.height + "px";
        this._contentNode.setAttribute("viewBox", "" + box.left + " " + box.top + " " + box.width + " " + box.height + "");
        if(this.get("autoSize"))
        {
            this.set("width", box.right);
            this.set("height", box.bottom);
        }
        if(this._frag)
        {
            this._contentNode.appendChild(this._frag);
            this._frag = null;
        }
    },

    /**
     * Adds a shape to the redraw queue and calculates the contentBounds. 
     *
     * @method addToRedrawQueue
     * @param shape {SVGShape}
     */
    addToRedrawQueue: function(shape)
    {
        var shapeBox,
            box;
        this._shapes[shape.get("id")] = shape;
        if(!this.get("resizeDown"))
        {
            shapeBox = shape.getBounds();
            box = this._contentBounds;
            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            box.width = box.right - box.left;
            box.height = box.bottom - box.top;
            this._contentBounds = box;
        }
        if(this.get("autoDraw")) 
        {
            this._redraw();
        }
    },
    
    _getUpdatedContentBounds: function()
    {
        var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            };
        for(i in queue)
        {
            if(queue.hasOwnProperty(i))
            {
                shape = queue[i];
                bounds = shape.getBounds();
                box.left = Math.min(box.left, bounds.left);
                box.top = Math.min(box.top, bounds.top);
                box.right = Math.max(box.right, bounds.right);
                box.bottom = Math.max(box.bottom, bounds.bottom);
            }
        }
        box.width = box.right - box.left;
        box.height = box.bottom - box.top;
        this._contentBounds = box;
        return box;
    },

    /**
     * Creates a contentNode element
     *
     * @method _createGraphics
     * @private
     */
    _createGraphics: function() {
        var contentNode = this._createGraphicNode("svg"),
            pointerEvents = this.get("pointerEvents");
        contentNode.style.position = "absolute";
        contentNode.style.top = "px";
        contentNode.style.left = "0px";
        contentNode.style.overflow = "auto";
        contentNode.setAttribute("overflow", "auto");
        contentNode.setAttribute("pointer-events", pointerEvents);
        return contentNode;
    },

    /**
     * Creates a graphic node
     *
     * @method _createGraphicNode
     * @param {String} type node type to create
     * @param {String} pe specified pointer-events value
     * @return HTMLElement
     * @private
     */
    _createGraphicNode: function(type, pe)
    {
        var node = document.createElementNS("http://www.w3.org/2000/svg", "svg:" + type),
            v = pe || "none";
        if(type !== "defs" && type !== "stop" && type !== "linearGradient" && type != "radialGradient")
        {
            node.setAttribute("pointer-events", v);
        }
        return node;
    },

    /**
     * Returns a reference to a gradient definition based on an id and type.
     *
     * @method getGradientNode
     * @key {String} id that references the gradient definition
     * @type {String} description of the gradient type
     * @return HTMLElement
     */
    getGradientNode: function(key, type)
    {
        var gradients = this._gradients,
            gradient,
            nodeType = type + "Gradient";
        if(gradients.hasOwnProperty(key) && gradients[key].tagName.indexOf(type) > -1)
        {
            gradient = this._gradients[key];
        }
        else
        {
            gradient = this._createGraphicNode(nodeType);
            if(!this._defs)
            {
                this._defs = this._createGraphicNode("defs");
                this._contentNode.appendChild(this._defs);
            }
            this._defs.appendChild(gradient);
            key = key || "gradient" + Math.round(100000 * Math.random());
            gradient.setAttribute("id", key);
            if(gradients.hasOwnProperty(key))
            {
                this._defs.removeChild(gradients[key]);
            }
            gradients[key] = gradient;
        }
        return gradient;
    }

});

Y.SVGGraphic = SVGGraphic;



}, '@VERSION@' ,{requires:['graphics'], skinnable:false});
