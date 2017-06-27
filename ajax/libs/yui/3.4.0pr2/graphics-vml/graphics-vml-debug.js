YUI.add('graphics-vml', function(Y) {

Y.log('using VML');
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
	VMLGraphic;

function VMLDrawing() {}

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
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function() {
        this._draw();
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
 * @class VMLShape
 */
VMLShape = function() 
{
    VMLShape.superclass.constructor.apply(this, arguments);
};

VMLShape.NAME = "vmlShape";

Y.extend(VMLShape, Y.BaseGraphic, {
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
		var host = this,
            graphic = cfg.graphic;
		host.createNode(); 
        host._graphic = graphic;
        graphic.addToRedrawQueue(this);
	},

	/**
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

			if(stroke)
			{
				endcap = stroke.endcap;
				opacity = parseFloat(stroke.opacity);
				joinstyle = stroke.joinstyle;
				miterlimit = stroke.miterlimit;
				dashstyle = stroke.dashstyle;
				nodestring += ' stroked="t" strokecolor="' + stroke.strokeColor + '" strokeWeight="' + stroke.strokeWeight + 'px"';
				
				strokestring = '<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;"';
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
				this._strokeNode = document.createElement(strokestring);
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
					this._fillNode = document.createElement(fillstring);
				}
				else if(fill.color)
				{
					nodestring += ' fillcolor="' + fill.color + '"';
				}
				nodestring += ' filled="' + fill.filled + '"';
			}
			
			
			nodestring += '>';
			nodestring += '</' + type + '>';
			
			node = document.createElement(nodestring);
			if(this._strokeNode)
			{
				node.appendChild(this._strokeNode);
			}
			if(this._fillNode)
			{
				node.appendChild(this._fillNode);
			}

			this.node = node;
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
			props.strokeColor = stroke.color;
			props.strokeWeight = stroke.weight;
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
		}
		else
		{
			node.stroked = false;
		}
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
				fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;" opacity="' + fillOpacity + '"';
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
                        props.node = '<fill xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;" opacity="' + fillOpacity + '" color="' + fill.color + '"/>';
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
		var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			fillstring,
			filled = false;
		if(fill)
		{
			if(fill.type == "radial" || fill.type == "linear")
			{
				filled = true;
				this._setGradientFill(node, fill);
			}
			else if(fill.color)
			{
				fillOpacity = fill.opacity;
				filled = true;
				if(IS_NUM(fillOpacity))
				{
					fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);
					fill.opacity = fillOpacity;
                    if(this._fillNode && this._fillNode.getAttribute("type") == "solid")
					{
					    if(node.fillcolor)
                        {
                            node.fillcolor = fill.color;
                        }
                        this._fillNode.type = "solid";
						this._fillNode.opacity = fillOpacity;
						this._fillNode.color = fill.color;
					}
					else
					{      

						if(this._fillNode)
						{
                            this._fillNode.opacity = fillOpacity;
                            this._fillNode.color = fill.color;
						}
                        else
                        {
                            fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" opacity="' + fillOpacity + '" color="' + fill.color + '"/>';
                            this._fillNode = document.createElement(fillstring);
                            node.appendChild(this._fillNode);
                        }
					    if(node.fillcolor)
                        {
                            node.fillcolor = fill.color;
                        }
					}
				}
				else
				{
					if(this._fillNode)
					{   
						this._fillNode.color = fill.color;
                        this._fillNode.opacity = 1;
					}
                    else
                    {
                        node.fillcolor = fill.color;
                    }
				}
                //node.fillcolor = fill.color;
			}
		}
		node.filled = filled;
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
			if(rotation > 0 && rotation <= 90)
			{
				rotation = 450 - rotation;
			}
			else if(rotation <= 270)
			{
				rotation = 270 - rotation;
			}
			else if(rotation <= 360)
			{
				rotation = 630 - rotation;
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
			//gradientProps.focusSize = ((r - cx) * 10) + "% " + ((r - cy) * 10) + "%"; 
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

	_setGradientFill: function(node, fill)
	{
		this._updateFillNode(node);
		var gradientBoxWidth,
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
			if(rotation > 0 && rotation <= 90)
			{
				rotation = 450 - rotation;
			}
			else if(rotation <= 270)
			{
				rotation = 270 - rotation;
			}
			else if(rotation <= 360)
			{
				rotation = 630 - rotation;
			}
			else
			{
				rotation = 270;
			}
			this._fillNode.type = "gradient";//"gradientunscaled";
			this._fillNode.angle = rotation;
		}
		else if(type === "radial")
		{
			gradientBoxWidth = w * (r * 2);
			gradientBoxHeight = h * (r * 2);
			fx = r * 2 * (fx - 0.5);
			fy = r * 2 * (fy - 0.5);
			fx += cx;
			fy += cy;
			this._fillNode.focussize = (gradientBoxWidth/w)/10 + "% " + (gradientBoxHeight/h)/10 + "%";
			//this._fillNode.focusSize = ((r - cx) * 10) + "% " + ((r - cy) * 10) + "%"; 
			this._fillNode.alignshape = false;
			this._fillNode.type = "gradientradial";
			this._fillNode.focus = "100%";
			this._fillNode.focusposition = Math.round(fx * 100) + "% " + Math.round(fy * 100) + "%";
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
				this._fillNode["opacity" + oi] = opacity + "";
				colorstring += ", " + pct + " " + color;
			}
		}
		pct = stops[1].offset || 0;
		pct *= 100;
		if(parseInt(pct, 10) < 100)
		{
			colorstring += ", 100% " + color;
		}
		this._fillNode.colors.value = colorstring.substr(2);
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
		var host = this,
			node = host.node,
			w,
			h,
			x = host.get("x"),
			y = host.get("y"),
			transformOrigin,
			transX,
			transY,
			tx,
			ty,
			originX,
			originY,
			absRot,
			radCon,
			sinRadians,
			cosRadians,
			x2,
			y2,
			coordSize,
			transformArgs = host._transformArgs;
		if(transformArgs)
		{
			w = host.get("width");
			h = host.get("height");
			coordSize = node.coordSize;
			if(transformArgs.hasOwnProperty("translate"))
			{
				transX = 0 - (coordSize.x/w * host._translateX);
				transY = 0 - (coordSize.y/h * host._translateY);
				node.coordOrigin = transX + "," + transY;
			}
			if(transformArgs.hasOwnProperty("rotate"))
			{
				transformOrigin = host.get("transformOrigin");
				tx = transformOrigin[0];
				ty = transformOrigin[1];
				originX = w * (tx - 0.5);
				originY = h * (ty - 0.5);
				absRot = Math.abs(host._rotation);
				radCon = Math.PI/180;
				sinRadians = parseFloat(parseFloat(Math.sin(absRot * radCon)).toFixed(8));
				cosRadians = parseFloat(parseFloat(Math.cos(absRot * radCon)).toFixed(8));
				x2 = (originX * cosRadians) - (originY * sinRadians);
				y2 = (originX * sinRadians) + (originY * cosRadians);
				node.style.rotation = host._rotation;
				x = x + (originX - x2);
				y = y + (originY - y2);
			}
		}
		node.style.left = x + "px";
		node.style.top = y + "px";
        this._graphic.addToRedrawQueue(this);
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
		this._addTransform("translate", arguments);
	},

	/**
	 * Applies a skew to the x-coordinate
	 *
	 * @method skewX:q
	 * @param {Number} x x-coordinate
	 */
	 skewX: function(x)
	 {
		//var node = this.node;
	 },

	/**
	 * Applies a skew to the x-coordinate
	 *
	 * @method skewX:q
	 * @param {Number} x x-coordinate
	 */
	 skewY: function(y)
	 {
		//var node = this.node;
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
		//var node = this.node;
	},

	/**
	 * Applies a matrix transformation
	 *
	 * @method matrix
	 */
	matrix: function(a, b, c, d, e, f)
	{
		//var node = this.node;
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
	 * @private
	 */
	_draw: function()
	{
		var host = this,
            node = host.node,
			w = host.get("width"),
			h = host.get("height");
		if(!node)
		{
		   host.createNode(); 
		}
		else
		{
			host._fillChangeHandler();
			host._strokeChangeHandler();
			node.style.width = w + "px";
			node.style.height = h + "px";
		}
		host._updateTransform();
	},

	/**
	 * @private
	 */
	_updateHandler: function(e)
	{
		var node = this.node;
		if(node)
		{
			node.style.visible = "hidden";
		}
		this._draw();
		if(node)
		{
			node.style.visible = "visible";
		}
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
		return document.createElement('<' + type + ' xmlns="urn:schemas-microsft.com:vml" class="vml' + type + '"/>');
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
	getBounds: function()
	{
		var w = this.get("width"),
			h = this.get("height"),
			stroke = this.get("stroke"),
			x = this.get("x"),
			y = this.get("y"),
			wt = 0,
			bounds = {};
		if(stroke && stroke.weight)
		{
			wt = stroke.weight;
		}
		bounds.left = x - wt;
		bounds.top = y - wt;
		bounds.right = x + w + wt;
		bounds.bottom = y + h + wt;
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
});

VMLShape.ATTRS = {
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
			this._addTransform("translate", [val, this._translateY]);
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
			this._addTransform("translate", [this._translateX, val]);
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
	 * 
	 * @attribute width
	 */
	width: {
		value: 0
	},

	/**
	 * 
	 * @attribute height
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
	 * @attribute fill
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
			return stroke;
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
		value: "visiblePainted"
	},

	/**
	 * Reference to the container Graphic.
	 *
	 * @attribute graphic
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
Y.extend(VMLPath, Y.VMLShape, Y.merge(Y.VMLDrawing.prototype, {
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "shape",

    /**
     * Draws the graphic.
     *
     * @method _draw
     * @private
     */
    _draw: function()
    {
        var fill = this.get("fill"),
            stroke = this.get("stroke"),
            node = this.node,
            w = this.get("width"),
            h = this.get("height"),
            path = this.get("path"),
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
        this._draw();
    },

    /**
     * Clears the path.
     *
     * @method clear
     */
    clear: function()
    {
		this._path = "";
    }
}));
VMLPath.ATTRS = Y.merge(Y.VMLShape.ATTRS, {
	/**
	 * Indicates the width of the shape
	 * 
	 * @attribute width 
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
	 * @attribute height
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
	 * @attribute path
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
	 * @attribute xRadius
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
	 * @attribute yRadius
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
 * Draws an circle
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
	 * Horizontal radius for the circle.
	 *
	 * @attribute radius
	 * @type Number
	 */
	radius: {
		lazyAdd: false,

		value: 0
	},

	/**
	 * Width of the circle
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
			var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			return val;
		}
	},

	/**
	 * Width of the circle
	 *
	 * @attribute width
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
 */
VMLPieSlice = function()
{
	VMLPieSlice.superclass.constructor.apply(this, arguments);
};
VMLPieSlice.NAME = "vmlPieSlice";
Y.extend(VMLPieSlice, Y.VMLPath, {
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "shape",
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
		host.createNode(); 
        host._graphic = graphic;
        host._updateHandler();
        graphic.addToRedrawQueue(this);
	},

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
VMLPieSlice.ATTRS = Y.mix(Y.VMLPath.ATTRS, {
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
                this._node.style.height = val + "px";
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
     * @param {Shape|String}
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
        var group = document.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:block;zoom:1;" />');
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
        return document.createElement('<' + type + ' xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:inline-block;zoom:1;" />');
    
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
    
    _getDocFrag: function()
    {
        if(!this._frag)
        {
            this._frag = document.createDocumentFragment();
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
