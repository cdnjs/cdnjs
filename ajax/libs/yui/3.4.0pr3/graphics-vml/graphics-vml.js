YUI.add('graphics-vml', function(Y) {

var Y_LANG = Y.Lang,
    IS_NUM = Y_LANG.isNumber,
    IS_ARRAY = Y_LANG.isArray,
    Y_DOM = Y.DOM,
    Y_SELECTOR = Y.Selector,
    DOCUMENT = Y.config.doc,
    AttributeLite = Y.AttributeLite,
	VMLShape,
	VMLCircle,
	VMLPath,
	VMLRect,
	VMLEllipse,
	VMLGraphic,
    VMLPieSlice;

function VMLDrawing() {}

/**
 * Set of drawing methods for VML based classes.
 *
 * @module graphics
 * @class VMLDrawing
 * @constructor
 */
VMLDrawing.prototype = {
    /**
     * @private
     */
    _currentX: 0,

    /**
     * @private
     */
    _currentY: 0,

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
        var hiX,
            loX,
            hiY,
            loY;
        x = Math.round(x);
        y = Math.round(y);
        this._path += ' c ' + Math.round(cp1x) + ", " + Math.round(cp1y) + ", " + Math.round(cp2x) + ", " + Math.round(cp2y) + ", " + x + ", " + y;
        this._currentX = x;
        this._currentY = y;
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
        var currentX = this._currentX,
            currentY = this._currentY,
            cp1x = currentX + 0.67*(cpx - currentX),
            cp1y = currentY + 0.67*(cpy - currentY),
            cp2x = cp1x + (x - currentX) * 0.34,
            cp2y = cp1y + (y - currentY) * 0.34;
        this.curveTo(cp1x, cp1y, cp2x, cp2y, x, y);
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
        this._currentX = x;
        this._currentY = y;
        return this;
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
        return this;
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
        var diameter = radius * 2;
        yRadius = yRadius || radius;
        if(Math.abs(arc) > 360)
        {
            arc = 360;
        }
        startAngle *= -65535;
        arc *= 65536;
        this._path += " m " + x + " " + y + " ae " + x + " " + y + " " + radius + " " + yRadius + " " + startAngle + " " + arc;
        this._trackSize(diameter, diameter); 
        this._currentX = x;
        this._currentY = y;
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
            len;
        if (typeof point1 === 'string' || typeof point1 === 'number') {
            args = [[point1, point2]];
        }
        len = args.length;
        if(!this._path)
        {
            this._path = "";
        }
        this._path += ' l ';
        for (i = 0; i < len; ++i) {
            this._path += ' ' + Math.round(args[i][0]) + ', ' + Math.round(args[i][1]);
            this._trackSize.apply(this, args[i]);
            this._currentX = args[i][0];
            this._currentY = args[i][1];
        }
        return this;
    },

    /**
     * Moves the current drawing position to specified x and y coordinates.
     *
     * @method moveTo
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    moveTo: function(x, y) {
        if(!this._path)
        {
            this._path = "";
        }
        this._path += ' m ' + Math.round(x) + ', ' + Math.round(y);
        this._trackSize(x, y);
        this._currentX = x;
        this._currentY = y;
    },

    /**
     * Draws the graphic.
     *
     * @method _draw
     * @private
     */
    _closePath: function()
    {
        var fill = this.get("fill"),
            stroke = this.get("stroke"),
            node = this.node,
            w = this.get("width"),
            h = this.get("height"),
            path = this._path,
            pathEnd = "";
        node.style.visible = "hidden";
        this._fillChangeHandler();
        this._strokeChangeHandler();
        if(path)
        {
            if(fill && fill.color)
            {
                pathEnd += ' x';
            }
            if(stroke)
            {
                pathEnd += ' e';
            }
        }
        if(path)
        {
            node.path = path + pathEnd;
        }
        if(w && h)
        {
            node.coordSize =  w + ', ' + h;
            node.style.position = "absolute";
            node.style.width = w + "px";
            node.style.height = h + "px";
        }
        this._path = path;
        node.style.visible = "visible";
        this._updateTransform();
    },

    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function()
    {
        this._closePath();
    },

    /**
     * Clears the path.
     *
     * @method clear
     */
    clear: function()
    {
		this._path = "";
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
    },

    _left: 0,

    _right: 0,

    _top: 0,

    _bottom: 0,

    _width: 0,

    _height: 0
};
Y.VMLDrawing = VMLDrawing;
/**
 * Base class for creating shapes.
 *
 * @module graphics
 * @class VMLShape
 * @constructor
 * @param {Object} cfg (optional) Attribute configs
 */
VMLShape = function() 
{
    this._transforms = [];
    this.matrix = new Y.Matrix();
    this.rotationMatrix = new Y.Matrix();
    VMLShape.superclass.constructor.apply(this, arguments);
};

VMLShape.NAME = "vmlShape";

Y.extend(VMLShape, Y.BaseGraphic, Y.mix({
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @readOnly
	 * @type String
	 */
	_type: "shape",
    
    /**
     * Init method, invoked during construction.
     * Calls `initializer` method.
     *
     * @method init
     * @protected
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
		var host = this,
            graphic = cfg.graphic;
        host._graphic = graphic;
		host.createNode();
        this._updateHandler();
	},

	/**
	 * Creates the dom node for the shape.
	 *
     * @method createNode
	 * @return HTMLElement
	 * @private
	 */
	createNode: function()
	{
        var node,
			x = this.get("x"),
			y = this.get("y"),
            w = this.get("width"),
            h = this.get("height"),
			id,
			type,
			nodestring,
			strokestring,
			classString,
			stroke,
			endcap,
			opacity,
			joinstyle,
			miterlimit,
			dashstyle,
			fill,
			fillstring;
			id = this.get("id");
			type = this._type;
			classString = 'vml' + type + ' yui3-vmlShape yui3-' + this.constructor.NAME; 
			stroke = this._getStrokeProps();
			fill = this._getFillProps();
			
			nodestring  = '<' + type + '  xmlns="urn:schemas-microsft.com:vml" id="' + id + '" class="' + classString + '" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;"';

		    if(stroke && stroke.weight && stroke.weight > 0)
			{
				endcap = stroke.endcap;
				opacity = parseFloat(stroke.opacity);
				joinstyle = stroke.joinstyle;
				miterlimit = stroke.miterlimit;
				dashstyle = stroke.dashstyle;
				nodestring += ' stroked="t" strokecolor="' + stroke.color + '" strokeWeight="' + stroke.weight + 'px"';
				
				strokestring = '<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;"';
				strokestring += ' opacity="' + opacity + '"';
				if(endcap)
				{
					strokestring += ' endcap="' + endcap + '"';
				}
				if(joinstyle)
				{
					strokestring += ' joinstyle="' + joinstyle + '"';
				}
				if(miterlimit)
				{
					strokestring += ' miterlimit="' + miterlimit + '"';
				}
				if(dashstyle)
				{
					strokestring += ' dashstyle="' + dashstyle + '"';
				}
				strokestring += '></stroke>';
				this._strokeNode = DOCUMENT.createElement(strokestring);
				nodestring += ' stroked="t"';
			}
			else
			{
				nodestring += ' stroked="f"';
			}
			if(fill)
			{
				if(fill.node)
				{
					fillstring = fill.node;
					this._fillNode = DOCUMENT.createElement(fillstring);
				}
				if(fill.color)
				{
					nodestring += ' fillcolor="' + fill.color + '"';
				}
				nodestring += ' filled="' + fill.filled + '"';
			}
			
			
			nodestring += '>';
			nodestring += '</' + type + '>';
			
			node = DOCUMENT.createElement(nodestring);
			if(this._strokeNode)
			{
				node.appendChild(this._strokeNode);
			}
			if(this._fillNode)
			{
				node.appendChild(this._fillNode);
			}

			this.node = node;
            this._strokeFlag = false;
            this._fillFlag = false;
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
		Y_DOM.addClass(node, className);
	},

	/**
	 * Removes a class name from each node.
	 *
	 * @method removeClass
	 * @param {String} className the class name to remove from the node's class attribute
	 */
	removeClass: function(className)
	{
		var node = this.node;
		Y_DOM.removeClass(node, className);
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
	 * @param {Array} Contains x & y values for new position (coordinates are page-based)
     *
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
	 * @param {VMLShape | HTMLElement} needle The possible node or descendent
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
		return Y_SELECTOR.test(this.node, selector);
	},

	/**
	 * @private
	 */
	 _getStrokeProps: function()
	 {
		var props,
			stroke = this.get("stroke"),
			strokeOpacity,
			dashstyle,
			dash = "",
			val,
			i = 0,
			len,
			linecap,
			linejoin;
        if(stroke && stroke.weight && stroke.weight > 0)
		{
			props = {};
			linecap = stroke.linecap || "flat";
			linejoin = stroke.linejoin || "round";
			if(linecap != "round" && linecap != "square")
			{
				linecap = "flat";
			}
			strokeOpacity = parseFloat(stroke.opacity);
			dashstyle = stroke.dashstyle || "none";
			stroke.color = stroke.color || "#000000";
			stroke.weight = stroke.weight || 1;
			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			props.stroked = true;
			props.color = stroke.color;
			props.weight = stroke.weight;
			props.endcap = linecap;
			props.opacity = stroke.opacity;
			if(IS_ARRAY(dashstyle))
			{
				dash = [];
				len = dashstyle.length;
				for(i = 0; i < len; ++i)
				{
					val = dashstyle[i];
					dash[i] = val / stroke.weight;
				}
			}
			if(linejoin == "round" || linejoin == "bevel")
			{
				props.joinstyle = linejoin;
			}
			else
			{
				linejoin = parseInt(linejoin, 10);
				if(IS_NUM(linejoin))
				{
					props.miterlimit = Math.max(linejoin, 1);
					props.joinstyle = "miter";
				}
			}
			props.dashstyle = dash;
		}
		return props;
	 },

	/**
	 * Adds a stroke to the shape node.
	 *
	 * @method _strokeChangeHandler
	 * @private
	 */
	_strokeChangeHandler: function(e)
	{
        if(!this._strokeFlag)
        {
            return;
        }
		var node = this.node,
			stroke = this.get("stroke"),
			strokeOpacity,
			dashstyle,
			dash = "",
			val,
			i = 0,
			len,
			linecap,
			linejoin;
		if(stroke && stroke.weight && stroke.weight > 0)
		{
			linecap = stroke.linecap || "flat";
			linejoin = stroke.linejoin || "round";
			if(linecap != "round" && linecap != "square")
			{
				linecap = "flat";
			}
			strokeOpacity = parseFloat(stroke.opacity);
			dashstyle = stroke.dashstyle || "none";
			stroke.color = stroke.color || "#000000";
			stroke.weight = stroke.weight || 1;
			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			node.stroked = true;
			node.strokeColor = stroke.color;
			node.strokeWeight = stroke.weight + "px";
			if(!this._strokeNode)
			{
				this._strokeNode = this._createGraphicNode("stroke");
				node.appendChild(this._strokeNode);
			}
			this._strokeNode.endcap = linecap;
			this._strokeNode.opacity = stroke.opacity;
			if(IS_ARRAY(dashstyle))
			{
				dash = [];
				len = dashstyle.length;
				for(i = 0; i < len; ++i)
				{
					val = dashstyle[i];
					dash[i] = val / stroke.weight;
				}
			}
			if(linejoin == "round" || linejoin == "bevel")
			{
				this._strokeNode.joinstyle = linejoin;
			}
			else
			{
				linejoin = parseInt(linejoin, 10);
				if(IS_NUM(linejoin))
				{
					this._strokeNode.miterlimit = Math.max(linejoin, 1);
					this._strokeNode.joinstyle = "miter";
				}
			}
			this._strokeNode.dashstyle = dash;
            this._strokeNode.on = true;
		}
		else
		{
            if(this._strokeNode)
            {
                this._strokeNode.on = false;
            }
			node.stroked = false;
		}
        this._strokeFlag = false;
	},

	/**
	 * @private
	 */
	_getFillProps: function()
	{
		var fill = this.get("fill"),
			fillOpacity,
			props,
			gradient,
			i,
			fillstring,
			filled = false;
		if(fill)
		{
			props = {};
			
			if(fill.type == "radial" || fill.type == "linear")
			{
				fillOpacity = parseFloat(fill.opacity);
				fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;
				filled = true;
				gradient = this._getGradientFill(fill);
				fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="' + fillOpacity + '"';
				for(i in gradient)
				{
					if(gradient.hasOwnProperty(i))
					{
						fillstring += ' ' + i + '="' + gradient[i] + '"';
					}
				}
				fillstring += ' />';
				props.node = fillstring;
			}
			else if(fill.color)
			{
				fillOpacity = parseFloat(fill.opacity);
				filled = true;
                props.color = fill.color;
				if(IS_NUM(fillOpacity))
				{
					fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);
                    props.opacity = fillOpacity;    
				    if(fillOpacity < 1)
                    {
                        props.node = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
				    }
                }
			}
			props.filled = filled;
		}
		return props;
	},

	/**
	 * Adds a fill to the shape node.
	 *
	 * @method _fillChangeHandler
	 * @private
	 */
	_fillChangeHandler: function(e)
	{
        if(!this._fillFlag)
        {
            return;
        }
		var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			fillstring,
			filled = false,
            i,
            gradient;
		if(fill)
		{
			if(fill.type == "radial" || fill.type == "linear")
			{
				filled = true;
				gradient = this._getGradientFill(fill);
                if(this._fillNode)
                {
                    for(i in gradient)
                    {
                        if(gradient.hasOwnProperty(i))
                        {
                            this._fillNode.setAttribute(i, gradient[i]);
                        }
                    }
                }
                else
                {
                    fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"';
                    for(i in gradient)
                    {
                        if(gradient.hasOwnProperty(i))
                        {
                            fillstring += ' ' + i + '="' + gradient[i] + '"';
                        }
                    }
                    fillstring += ' />';
                    this._fillNode = DOCUMENT.createElement(fillstring);
                    node.appendChild(this._fillNode);
                }
			}
			else if(fill.color)
			{
                node.fillcolor = fill.color;
				fillOpacity = parseFloat(fill.opacity);
				filled = true;
				if(IS_NUM(fillOpacity) && fillOpacity < 1)
				{
					fill.opacity = fillOpacity;
                    if(this._fillNode)
					{
                        if(this._fillNode.getAttribute("type") != "solid")
                        {
                            this._fillNode.type = "solid";
                        }
						this._fillNode.opacity = fillOpacity;
					}
					else
					{     
                        fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
                        this._fillNode = DOCUMENT.createElement(fillstring);
                        node.appendChild(this._fillNode);
					}
				}
				else if(this._fillNode)
                {   
                    this._fillNode.opacity = 1;
                    this._fillNode.type = "solid";
				}
			}
		}
		node.filled = filled;
        this._fillFlag = false;
	},

	/**
	 * @private
	 */
	_updateFillNode: function(node)
	{
		if(!this._fillNode)
		{
			this._fillNode = this._createGraphicNode("fill");
			node.appendChild(this._fillNode);
		}
	},

	_getGradientFill: function(fill)
	{
		var gradientProps = {},
			gradientBoxWidth,
			gradientBoxHeight,
			type = fill.type,
			w = this.get("width"),
			h = this.get("height"),
			isNumber = IS_NUM,
			stop,
			stops = fill.stops,
			len = stops.length,
			opacity,
			color,
			i = 0,
			oi,
			colorstring = "",
			cx = fill.cx,
			cy = fill.cy,
			fx = fill.fx,
			fy = fill.fy,
			r = fill.r,
			pct,
			rotation = fill.rotation || 0;
		if(type === "linear")
		{
            if(rotation <= 270)
            {
                rotation = Math.abs(rotation - 270);
            }
			else if(rotation < 360)
            {
                rotation = 270 + (360 - rotation);
            }
            else
            {
                rotation = 270;
            }
            gradientProps.type = "gradient";//"gradientunscaled";
			gradientProps.angle = rotation;
		}
		else if(type === "radial")
		{
			gradientBoxWidth = w * (r * 2);
			gradientBoxHeight = h * (r * 2);
			fx = r * 2 * (fx - 0.5);
			fy = r * 2 * (fy - 0.5);
			fx += cx;
			fy += cy;
			gradientProps.focussize = (gradientBoxWidth/w)/10 + "% " + (gradientBoxHeight/h)/10 + "%";
			gradientProps.alignshape = false;
			gradientProps.type = "gradientradial";
			gradientProps.focus = "100%";
			gradientProps.focusposition = Math.round(fx * 100) + "% " + Math.round(fy * 100) + "%";
		}
		for(;i < len; ++i) {
			stop = stops[i];
			color = stop.color;
			opacity = stop.opacity;
			opacity = isNumber(opacity) ? opacity : 1;
			pct = stop.offset || i/(len-1);
			pct *= (r * 2);
			if(pct <= 1)
			{
				pct = Math.round(100 * pct) + "%";
				oi = i > 0 ? i + 1 : "";
				gradientProps["opacity" + oi] = opacity + "";
				colorstring += ", " + pct + " " + color;
			}
		}
		pct = stops[1].offset || 0;
		pct *= 100;
		if(parseInt(pct, 10) < 100)
		{
			colorstring += ", 100% " + color;
		}
		gradientProps.colors = colorstring.substr(2);
		return gradientProps;
	},

	/**
	 * @private
	 */
	_addTransform: function(type, args)
	{
        args = Y.Array(args);
        this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        args.unshift(type);
        this._transforms.push(args);
        if(this.initialized)
        {
            this._updateTransform();
        }
	},
	
    /**
	 * @private
	 */
	_updateTransform: function()
	{
		var node = this.node,
            key,
			transform,
			transformOrigin,
            x = this.get("x"),
            y = this.get("y"),
            w = this.get("width"),
            h = this.get("height"),
            cx,
            cy,
            dx,
            dy,
            originX,
            originY,
            translatedCenterX,
            translatedCenterY,
            oldBounds,
            newBounds,
            tx,
            ty,
            keys = [],
            matrix = this.matrix,
            rotationMatrix = this.rotationMatrix,
            i = 0,
            len = this._transforms.length;

        if(this._transforms && this._transforms.length > 0)
		{
            transformOrigin = this.get("transformOrigin");
            for(; i < len; ++i)
            {
                key = this._transforms[i].shift();
                if(key)
                {
                    if(key == "rotate")
                    {
                        tx = transformOrigin[0];
                        ty =  transformOrigin[1];
                        oldBounds = this.getBounds(matrix);
                        matrix[key].apply(matrix, this._transforms[i]);
                        rotationMatrix[key].apply(rotationMatrix, this._transforms[i]);
                        newBounds = this.getBounds(matrix);
                        cx = w * 0.5;
                        cy = h * 0.5;
                        originX = w * (tx);
                        originY = h * (ty);
                        translatedCenterX = cx - originX;
                        translatedCenterY = cy - originY;
                        translatedCenterX = (matrix.a * translatedCenterX + matrix.b * translatedCenterY);
                        translatedCenterY = (matrix.d * translatedCenterX + matrix.d * translatedCenterY);
                        translatedCenterX += originX;
                        translatedCenterY += originY;
                        matrix.dx = rotationMatrix.dx + translatedCenterX - (newBounds.right - newBounds.left)/2;
                        matrix.dy = rotationMatrix.dy + translatedCenterY - (newBounds.bottom - newBounds.top)/2;
                    }
                    else if(key == "scale")
                    {
				        transformOrigin = this.get("transformOrigin");
                        tx = x + (transformOrigin[0] * this.get("width"));
                        ty = y + (transformOrigin[1] * this.get("height")); 
                        matrix.translate(tx, ty);
                        matrix[key].apply(matrix, this._transforms[i]); 
                        matrix.translate(0 - tx, 0 - ty);
                    }
                    else
                    {
                        matrix[key].apply(matrix, this._transforms[i]); 
                        rotationMatrix[key].apply(rotationMatrix, this._transforms[i]); 
                    }
                    keys.push(key);
                }
			}
            transform = matrix.toFilterText();
		}
        dx = matrix.dx;
        dy = matrix.dy;
        this._graphic.addToRedrawQueue(this);    
        //only apply the filter if necessary as it degrades image quality
        if(Y.Array.indexOf(keys, "skew") > -1 || Y.Array.indexOf(keys, "scale") > -1)
		{
            node.style.filter = transform;
        }
        else if(Y.Array.indexOf(keys,"rotate") > -1)
        {
            node.style.rotation = this._rotation;
            dx = rotationMatrix.dx;
            dy = rotationMatrix.dy;
        }
        this._transforms = [];
        x += dx;
        y += dy;
        node.style.left = x + "px";
		node.style.top = y + "px";
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
     * Storage for the transform attribute.
     *
     * @property _transform
     * @type String
     * @private
     */
    _transform: "",
	
    /**
	 * Applies translate transformation.
	 *
	 * @method translate
	 * @param {Number} x The value to transate on the x-axis.
	 * @param {Number} y The value to translate on the y-axis.
	 */
	translate: function(x, y)
	{
		this._translateX += x;
		this._translateY += y;
		this._addTransform("translate", arguments);
	},

	/**
	 * Performs a translate on the x-coordinate. When translating x and y coordinates,
	 * use the `translate` method.
	 *
	 * @method translateX
	 * @param {Number} y The value to translate.
	 */
	translateX: function(x)
    {
        this._translateX += x;
        this._addTransform("translateX", arguments);
    },

	/**
	 * Performs a translate on the y-coordinate. When translating x and y coordinates,
	 * use the `translate` method.
	 *
	 * @method translateY
	 * @param {Number} y The value to translate.
	 */
	translateY: function(y)
    {
        this._translateY += y;
        this._addTransform("translateY", arguments);
    },

    /**
     * Applies a skew transformation.
     *
     * @method skew
     * @param {Number} x The value to skew on the x-axis.
     * @param {Number} y The value to skew on the y-axis.
     */
    skew: function(x, y)
    {
        this._addTransform("skew", arguments);
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
	 * Applies a skew to the y-coordinate
	 *
	 * @method skewY
	 * @param {Number} y y-coordinate
	 */
	 skewY: function(y)
	 {
		this._addTransform("skewY", arguments);
	 },


	/**
     * Storage for `rotation` atribute.
     *
     * @property _rotation
     * @type Number
	 * @private
	 */
	_rotation: 0,

	/**
	 * Applies a rotation.
	 *
	 * @method rotate
	 * @param {Number} deg The degree of the rotation.
	 */
	 rotate: function(deg)
	 {
		this._rotation += deg;
		this._addTransform("rotate", arguments);
	 },

	/**
	 * Applies a scale transform
	 *
	 * @method scale
	 * @param {Number} val
	 */
	scale: function(x, y)
	{
		this._addTransform("scale", arguments);
	},

	/**
	 * @private
	 */
	on: function(type, fn)
	{
		if(Y.Node.DOM_EVENTS[type])
		{
			return Y.one("#" +  this.get("id")).on(type, fn);
		}
		return Y.on.apply(this, arguments);
	},

	/**
	 * Draws the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
	},

	/**
	 * @private
	 */
	_updateHandler: function(e)
	{
		var host = this,
            node = host.node;
        host._fillChangeHandler();
        host._strokeChangeHandler();
        node.style.width = this.get("width") + "px";
        node.style.height = this.get("height") + "px"; 
        this._draw();
		host._updateTransform();
	},

	/**
	 * Creates a graphic node
	 *
	 * @method _createGraphicNode
	 * @param {String} type node type to create
	 * @param {String} specified pointer-events value
	 * @return HTMLElement
	 * @private
	 */
	_createGraphicNode: function(type)
	{
		type = type || this._type;
		return DOCUMENT.createElement('<' + type + ' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;" class="vml' + type + '"/>');
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
	 * Returns the bounds for a shape.
	 *
	 * @method getBounds
	 * @return Object
	 */
	getBounds: function(cfg)
	{
	    var wt,
            bounds = {},
            matrix = cfg || this.matrix,
            a = matrix.a,
            b = matrix.b,
            c = matrix.c,
            d = matrix.d,
            dx = matrix.dx,
            dy = matrix.dy,
            w = this.get("width"),
            h = this.get("height"),
            left = this.get("x"), 
            top = this.get("y"), 
            right = left + w,
            bottom = top + h,
			stroke = this.get("stroke"),
            //[x1, y1]
            x1 = (a * left + c * top + dx), 
            y1 = (b * left + d * top + dy),
            //[x2, y2]
            x2 = (a * right + c * top + dx),
            y2 = (b * right + d * top + dy),
            //[x3, y3]
            x3 = (a * left + c * bottom + dx),
            y3 = (b * left + d * bottom + dy),
            //[x4, y4]
            x4 = (a * right + c * bottom + dx),
            y4 = (b * right + d * bottom + dy);
        bounds.left = Math.min(x3, Math.min(x1, Math.min(x2, x4)));
        bounds.right = Math.max(x3, Math.max(x1, Math.max(x2, x4)));
        bounds.top = Math.min(y2, Math.min(y4, Math.min(y3, y1)));
        bounds.bottom = Math.max(y2, Math.max(y4, Math.max(y3, y1)));
        //if there is a stroke, extend the bounds to accomodate
        if(stroke && stroke.weight)
		{
			wt = stroke.weight;
            bounds.left -= wt;
            bounds.right += wt;
            bounds.top -= wt;
            bounds.bottom += wt;
		}
        bounds.width = bounds.right - bounds.left;
        bounds.height = bounds.bottom - bounds.top;
        return bounds;
	},
	
    /**
     *  Destroys shape
     *
     *  @method destroy
     */
    destroy: function()
    {
        var parentNode = this._graphic && this._graphic._node ? this._graphic._node : null,
            node = this.node;
        if(this.node)
        {   
            if(this._fillNode)
            {
                node.removeChild(this._fillNode);
            }
            if(this._strokeNode)
            {
                node.removeChild(this._strokeNode);
            }
            if(parentNode)
            {
                parentNode.removeChild(node);
            }
        }
    }
}, Y.VMLDrawing.prototype));

VMLShape.ATTRS = {
	/**
	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a 
	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].
	 *
	 * @config transformOrigin
	 * @type Array
	 */
	transformOrigin: {
		valueFn: function()
		{
			return [0.5, 0.5];
		}
	},
	
    /**
	 * A css transform string.
	 *
	 * @config transform
     * @type String  
     * 
     * @writeOnly
	 */
	transform: {
		setter: function(val)
		{
            this.matrix.init();	
		    this._transforms = this.matrix.getTransformArray(val);
            this._transform = val;
            if(this.initialized)
            {
                this._updateTransform();
            }
            return val;
		},

        getter: function()
        {
            return this._transform;
        }
	},

	/**
	 * Indicates the x position of shape.
	 *
	 * @config x
	 * @type Number
	 */
	x: {
		value: 0
	},

	/**
	 * Indicates the y position of shape.
	 *
	 * @config y
	 * @type Number
	 */
	y: {
		value: 0
	},

	/**
	 * Unique id for class instance.
	 *
	 * @config id
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
	 * 
	 * @config width
	 */
	width: {
		value: 0
	},

	/**
	 * 
	 * @config height
	 */
	height: {
		value: 0
	},

	/**
	 * Indicates whether the shape is visible.
	 *
	 * @config visible
	 * @type Boolean
	 */
	visible: {
		value: true,

		setter: function(val){
			var node = this.node,
				visibility = val ? "visible" : "hidden";
			if(node)
			{
				node.style.visibility = visibility;
			}
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
	 * @config fill
	 * @type Object 
	 */
	fill: {
		valueFn: "_getDefaultFill",
		
		setter: function(val)
		{
			var i,
				fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			
			if(val)
			{
				//ensure, fill type is solid if color is explicitly passed.
				if(val.hasOwnProperty("color"))
				{
					val.type = "solid";
				}
				for(i in val)
				{
					if(val.hasOwnProperty(i))
					{   
						tmpl[i] = val[i];
					}
				}
			}
			fill = tmpl;
			if(fill && fill.color)
			{
				if(fill.color === undefined || fill.color == "none")
				{
					fill.color = null;
				}
			}
			this._fillFlag = true;
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
	 * @config stroke
	 * @type Object
	 */
	stroke: {
		valueFn: "_getDefaultStroke",
		
		setter: function(val)
		{
			var i,
				stroke,
				tmpl = this.get("stroke") || this._getDefaultStroke();
			if(val)
			{
				for(i in val)
				{
					if(val.hasOwnProperty(i))
					{   
						tmpl[i] = val[i];
					}
				}
			}
			stroke = tmpl;
            this._strokeFlag = true;
			return stroke;
		}
	},
	
	/**
	 * Indicates whether or not the instance will size itself based on its contents.
	 *
	 * @config autoSize 
	 * @type Boolean
	 */
	autoSize: {
		value: false
	},

	/**
	 * Determines whether the instance will receive mouse events.
	 * 
	 * @config pointerEvents
	 * @type string
	 */
	pointerEvents: {
		value: "visiblePainted"
	},

	/**
	 * Dom node for the shape.
	 *
	 * @config node
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
	 * Reference to the container Graphic.
	 *
	 * @config graphic
	 * @type Graphic
	 */
	graphic: {
		readOnly: true,

		getter: function()
		{
			return this._graphic;
		}
	}
};
Y.VMLShape = VMLShape;
/**
 * The VMLPath class creates a graphic object with editable 
 * properties.
 *
 * @class VMLPath
 * @extends VMLShape
 */
VMLPath = function()
{
	VMLPath.superclass.constructor.apply(this, arguments);
};

VMLPath.NAME = "vmlPath";
Y.extend(VMLPath, Y.VMLShape, {
	/**
	 * @private
	 */
    _updateHandler: function()
    {   
        var host = this;
            host._fillChangeHandler();
            host._strokeChangeHandler();
        host._updateTransform();
    }
});
VMLPath.ATTRS = Y.merge(Y.VMLShape.ATTRS, {
	/**
	 * Indicates the width of the shape
	 * 
	 * @config width 
	 * @type Number
	 */
	width: {
		getter: function()
		{
			return this._width;
		},

		setter: function(val)
		{
			this._width = val;
			return val;
		}
	},

	/**
	 * Indicates the height of the shape
	 * 
	 * @config height
	 * @type Number
	 */
	height: {
		getter: function()
		{
			return this._height;
		},

		setter: function(val)
		{
			this._height = val;
			return val;
		}
	},
	
	/**
	 * Indicates the path used for the node.
	 *
	 * @config path
	 * @type String
	 */
	path: {
		readOnly: true,

		getter: function()
		{
			return this._path;
		}
	}
});
Y.VMLPath = VMLPath;
/**
 * Draws rectangles
 *
 * @module graphics
 * @class VMLRect
 * @constructor
 */
VMLRect = function()
{
	VMLRect.superclass.constructor.apply(this, arguments);
};
VMLRect.NAME = "vmlRect"; 
Y.extend(VMLRect, Y.VMLShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @readOnly
	 * @type String
	 */
	_type: "rect"
});
VMLRect.ATTRS = Y.VMLShape.ATTRS;
Y.VMLRect = VMLRect;
/**
 * Draws an ellipse
 *
 * @module graphics
 * @class VMLEllipse
 * @constructor
 */
VMLEllipse = function()
{
	VMLEllipse.superclass.constructor.apply(this, arguments);
};

VMLEllipse.NAME = "vmlEllipse";

Y.extend(VMLEllipse, Y.VMLShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @readOnly
	 * @type String
	 */
	_type: "oval"
});
VMLEllipse.ATTRS = Y.merge(Y.VMLShape.ATTRS, {
	/**
	 * Horizontal radius for the ellipse.
	 *
	 * @config xRadius
	 * @type Number
	 */
	xRadius: {
		lazyAdd: false,

		getter: function()
		{
			var val = this.get("width");
			val = Math.round((val/2) * 100)/100;
			return val;
		},
		
		setter: function(val)
		{
			var w = val * 2; 
			this.set("width", w);
			return val;
		}
	},

	/**
	 * Vertical radius for the ellipse.
	 *
	 * @config yRadius
	 * @type Number
	 */
	yRadius: {
		lazyAdd: false,
		
		getter: function()
		{
			var val = this.get("height");
			val = Math.round((val/2) * 100)/100;
			return val;
		},

		setter: function(val)
		{
			var h = val * 2;
			this.set("height", h);
			return val;
		}
	}
});
Y.VMLEllipse = VMLEllipse;
/**
 * Draws a circle
 *
 * @module graphics
 * @class VMLCircle
 * @constructor
 */
VMLCircle = function(cfg)
{
	VMLCircle.superclass.constructor.apply(this, arguments);
};

VMLCircle.NAME = "vmlCircle";

Y.extend(VMLCircle, VMLShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @readOnly
	 * @type String
	 */
	_type: "oval"
});

VMLCircle.ATTRS = Y.merge(VMLShape.ATTRS, {
	/**
	 * Radius for the circle.
	 *
	 * @config radius
	 * @type Number
	 */
	radius: {
		lazyAdd: false,

		value: 0
	},

	/**
	 * Width of the circle
	 *
	 * @config width
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
			var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			return val;
		}
	},

	/**
	 * Width of the circle
	 *
	 * @config width
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
			var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			return val;
		}
	}
});
Y.VMLCircle = VMLCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class VMLPieSlice
 * @constructor
 */
VMLPieSlice = function()
{
	VMLPieSlice.superclass.constructor.apply(this, arguments);
};
VMLPieSlice.NAME = "vmlPieSlice";
Y.extend(VMLPieSlice, Y.VMLShape, Y.mix({
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "shape",

	/**
	 * Change event listener
	 *
	 * @private
	 * @method _updateHandler
	 */
	_draw: function(e)
	{
        var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        this.clear();
        this.drawWedge(x, y, startAngle, arc, radius);
		this.end();
	}
 }, Y.VMLDrawing.prototype));
VMLPieSlice.ATTRS = Y.mix({
    cx: {
        value: 0
    },

    cy: {
        value: 0
    },
    /**
     * Starting angle in relation to a circle in which to begin the pie slice drawing.
     *
     * @config startAngle
     * @type Number
     */
    startAngle: {
        value: 0
    },

    /**
     * Arc of the slice.
     *
     * @config arc
     * @type Number
     */
    arc: {
        value: 0
    },

    /**
     * Radius of the circle in which the pie slice is drawn
     *
     * @config radius
     * @type Number
     */
    radius: {
        value: 0
    }
}, Y.VMLShape.ATTRS);
Y.VMLPieSlice = VMLPieSlice;
/**
 * VMLGraphic is a simple drawing api that allows for basic drawing operations.
 *
 * @class VMLGraphic
 * @constructor
 */
VMLGraphic = function() {
    VMLGraphic.superclass.constructor.apply(this, arguments);    
};

VMLGraphic.NAME = "vmlGraphic";

VMLGraphic.ATTRS = {
    /**
     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node instance or a CSS selector string.
     * 
     * @config render
     * @type Node | String 
     */
    render: {},
	
    /**
	 * Unique id for class instance.
	 *
	 * @config id
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
     *  @config shapes
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
     *  @config contentBounds
     *  @type Object
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
     *  @config node
     *  @type HTMLElement
     */
    node: {
        readOnly: true,

        getter: function()
        {
            return this._node;
        }
    },

	/**
	 * Indicates the width of the `Graphic`. 
	 *
	 * @config width
	 * @type Number
	 */
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

	/**
	 * Indicates the height of the `Graphic`. 
	 *
	 * @config height 
	 * @type Number
	 */
    height: {
        setter: function(val)
        {
            if(this._node)
            {
                this._node.style.height = val + "px";
            }
            return val;
        }
    },

    /**
     *  Determines how the size of instance is calculated. If true, the width and height are determined by the size of the contents.
     *  If false, the width and height values are either explicitly set or determined by the size of the parent node's dimensions.
     *
     *  @config autoSize
     *  @type Boolean
     *  @default false
     */
    autoSize: {
        value: false
    },

    /**
     * When overflow is set to true, by default, the contentBounds will resize to greater values but not values. (for performance)
     * When resizing the contentBounds down is desirable, set the resizeDown value to true.
     *
     * @config resizeDown 
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
	 * @config x
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
	 * @config y
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
     * @config autoDraw
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
    }
};

Y.extend(VMLGraphic, Y.BaseGraphic, {
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
    initializer: function(config) {
        var render = this.get("render");
        this._shapes = {};
		this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        this._node = this._createGraphic();
        this._node.setAttribute("id", this.get("id"));
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
        this.setSize(w, h);
        this.parentNode = parentNode;
        this.set("width", w);
        this.set("height", h);
        return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        this.clear();
        this._node.parentNode.removeChild(this._node);
    },

    /**
     * Generates a shape instance by type.
     *
     * @method addShape
     * @param {String} type type of shape to generate.
     * @param {Object} cfg attributes for the shape
     * @return Shape
     */
    addShape: function(cfg)
    {
        cfg.graphic = this;
        var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        this._appendShape(shape);
        return shape;
    },

    /**
     * Adds a shape instance to the graphic instance.
     *
     * @method _appendShape
     * @param {Shape} shape The shape instance to be added to the graphic.
     * @private
     */
    _appendShape: function(shape)
    {
        var node = shape.node,
            parentNode = this._frag || this._node;
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
     * @param {Shape|String} shape The instance or id of the shape to be removed.
     */
    removeShape: function(shape)
    {
        if(!shape instanceof VMLShape)
        {
            if(Y_LANG.isString(shape))
            {
                shape = this._shapes[shape];
            }
        }
        if(shape && shape instanceof VMLShape)
        {
            shape.destroy();
            delete this._shapes[shape.get("id")];
        }
        if(this.get("autoDraw"))
        {
            this._redraw();
        }
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
     * @param node
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
        this._removeAllShapes();
        this._removeChildren(this._node);
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
        this._node.style.visibility = visibility;
    },

    /**
     * Sets the size of the graphics object.
     * 
     * @method setSize
     * @param w {Number} width to set for the instance.
     * @param h {Number} height to set for the instance.
     */
    setSize: function(w, h) {
        w = Math.round(w);
        h = Math.round(h);
        this._node.style.width = w + 'px';
        this._node.style.height = h + 'px';
        this._node.coordSize = w + ' ' + h;
    },

    /**
     * Sets the positon of the graphics object.
     *
     * @method setPosition
     * @param {Number} x x-coordinate for the object.
     * @param {Number} y y-coordinate for the object.
     */
    setPosition: function(x, y)
    {
        x = Math.round(x);
        y = Math.round(y);
        this._node.style.left = x + "px";
        this._node.style.top = y + "px";
    },

    /**
     * Creates a group element
     *
     * @method _createGraphic
     * @private
     */
    _createGraphic: function() {
        var group = DOCUMENT.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:block;zoom:1;" />');
		group.style.display = "block";
        group.style.position = 'absolute';
        return group;
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
    _createGraphicNode: function(type)
    {
        return DOCUMENT.createElement('<' + type + ' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;zoom:1;" />');
    
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
        return this._shapes[id];
    },

    /**
     * Returns a shape class. Used by `addShape`. 
     *
     * @param {Shape | String} val Indicates which shape class. 
     * @return Function 
     * @private
     */
    _getShapeClass: function(val)
    {
        var shape = this._shapeClass[val];
        if(shape)
        {
            return shape;
        }
        return val;
    },

    /**
     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.
     *
     * @property _shapeClass
     * @type Object
     * @private
     */
    _shapeClass: {
        circle: Y.VMLCircle,
        rect: Y.VMLRect,
        path: Y.VMLPath,
        ellipse: Y.VMLEllipse,
        pieslice: Y.VMLPieSlice
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
        method.apply();
        this._redraw();
        this.set("autoDraw", autoDraw);
    },
    
    /**
     * Returns a document fragment to for attaching shapes.
     *
     * @method _getDocFrag
     * @return DocumentFragment
     * @private
     */
    _getDocFrag: function()
    {
        if(!this._frag)
        {
            this._frag = DOCUMENT.createDocumentFragment();
        }
        return this._frag;
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

    /**
     * Redraws all shapes.
     *
     * @method _redraw
     * @private
     */
    _redraw: function()
    {
        var box = this.get("resizeDown") ? this._getUpdatedContentBounds() : this._contentBounds;
        if(this.get("autoSize"))
        {
            this.setSize(box.right, box.bottom);
        }
        if(this._frag)
        {
            this._node.appendChild(this._frag);
            this._frag = null;
        }
    },
    
    /**
     * Recalculates and returns the `contentBounds` for the `Graphic` instance.
     *
     * @method _getUpdateContentBounds
     * @return {Object} 
     * @private
     */
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
    }
});
Y.VMLGraphic = VMLGraphic;



}, '@VERSION@' ,{requires:['graphics'], skinnable:false});
