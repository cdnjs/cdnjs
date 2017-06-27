if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["/build/graphics-vml/graphics-vml.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/graphics-vml/graphics-vml.js",
    code: []
};
_yuitest_coverage["/build/graphics-vml/graphics-vml.js"].code=["YUI.add('graphics-vml', function(Y) {","","var SHAPE = \"vmlShape\",","    Y_LANG = Y.Lang,","    IS_NUM = Y_LANG.isNumber,","    IS_ARRAY = Y_LANG.isArray,","    IS_STRING = Y_LANG.isString,","    Y_DOM = Y.DOM,","    Y_SELECTOR = Y.Selector,","    DOCUMENT = Y.config.doc,","    AttributeLite = Y.AttributeLite,","	VMLShape,","	VMLCircle,","	VMLPath,","	VMLRect,","	VMLEllipse,","	VMLGraphic,","    VMLPieSlice,","    _getClassName = Y.ClassNameManager.getClassName;","","function VMLDrawing() {}","","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class. "," * `VMLDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Drawing.html\">`Drawing`</a> class will point to the `VMLDrawing` class."," *"," * @module graphics"," * @class VMLDrawing"," * @constructor"," */","VMLDrawing.prototype = {","    /**","     * Value for rounding up to coordsize","     *","     * @property _coordSpaceMultiplier","     * @type Number","     * @private","     */","    _coordSpaceMultiplier: 100,","","    /**","     * Rounds dimensions and position values based on the coordinate space.","     *","     * @method _round","     * @param {Number} The value for rounding","     * @return Number","     * @private","     */","    _round:function(val)","    {","        return Math.round(val * this._coordSpaceMultiplier);","    },","","    /**","     * Concatanates the path.","     *","     * @method _addToPath","     * @param {String} val The value to add to the path string.","     * @private","     */","    _addToPath: function(val)","    {","        this._path = this._path || \"\";","        if(this._movePath)","        {","            this._path += this._movePath;","            this._movePath = null;","        }","        this._path += val;","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    curveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {","        var w,","            h,","            pts,","            right,","            left,","            bottom,","            top;","        this._addToPath(\" c \" + this._round(cp1x) + \", \" + this._round(cp1y) + \", \" + this._round(cp2x) + \", \" + this._round(cp2y) + \", \" + this._round(x) + \", \" + this._round(y));","        right = Math.max(x, Math.max(cp1x, cp2x));","        bottom = Math.max(y, Math.max(cp1y, cp2y));","        left = Math.min(x, Math.min(cp1x, cp2x));","        top = Math.min(y, Math.min(cp1y, cp2y));","        w = Math.abs(right - left);","        h = Math.abs(bottom - top);","        pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]]; ","        this._setCurveBoundingBox(pts, w, h);","        this._currentX = x;","        this._currentY = y;","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    quadraticCurveTo: function(cpx, cpy, x, y) {","        var currentX = this._currentX,","            currentY = this._currentY,","            cp1x = currentX + 0.67*(cpx - currentX),","            cp1y = currentY + 0.67*(cpy - currentY),","            cp2x = cp1x + (x - currentX) * 0.34,","            cp2y = cp1y + (y - currentY) * 0.34;","        this.curveTo(cp1x, cp1y, cp2x, cp2y, x, y);","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     */","    drawRect: function(x, y, w, h) {","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        this._currentX = x;","        this._currentY = y;","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     * ","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        this.moveTo(x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 360,","            circum = radius * 2;","","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this.moveTo((x + circum), (y + radius));","        this._addToPath(\" ae \" + this._round(x + radius) + \", \" + this._round(y + radius) + \", \" + this._round(radius) + \", \" + this._round(radius) + \", \" + startAngle + \", \" + endAngle);","        return this;","    },","    ","    /**","     * Draws an ellipse.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var startAngle = 0,","            endAngle = 360,","            radius = w * 0.5,","            yRadius = h * 0.5;","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + w, y + h);","        this.moveTo((x + w), (y + yRadius));","        this._addToPath(\" ae \" + this._round(x + radius) + \", \" + this._round(x + radius) + \", \" + this._round(y + yRadius) + \", \" + this._round(radius) + \", \" + this._round(yRadius) + \", \" + startAngle + \", \" + endAngle);","        return this;","    },","    ","    /**","     * Draws a diamond.     ","     * ","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius)","    {","        var diameter = radius * 2;","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","        this._currentX = x;","        this._currentY = y;","        startAngle *= -65535;","        arc *= 65536;","        startAngle = Math.round(startAngle);","        arc = Math.round(arc);","        this.moveTo(x, y);","        this._addToPath(\" ae \" + this._round(x) + \", \" + this._round(y) + \", \" + this._round(radius) + \" \" + this._round(radius) + \", \" +  startAngle + \", \" + arc);","        this._trackSize(diameter, diameter); ","        return this;","    },","","    /**","     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.","     * ","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     */","    lineTo: function(point1, point2, etc) {","        var args = arguments,","            i,","            len,","            path = ' l ';","        if (typeof point1 === 'string' || typeof point1 === 'number') {","            args = [[point1, point2]];","        }","        len = args.length;","        for (i = 0; i < len; ++i) {","            path += ' ' + this._round(args[i][0]) + ', ' + this._round(args[i][1]);","            this._trackSize.apply(this, args[i]);","            this._currentX = args[i][0];","            this._currentY = args[i][1];","        }","        this._addToPath(path);","        return this;","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    moveTo: function(x, y) {","        this._movePath = \" m \" + this._round(x) + \", \" + this._round(y);","        this._trackSize(x, y);","        this._currentX = x;","        this._currentY = y;","    },","","    /**","     * Draws the graphic.","     *","     * @method _draw","     * @private","     */","    _closePath: function()","    {","        var fill = this.get(\"fill\"),","            stroke = this.get(\"stroke\"),","            node = this.node,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            path = this._path,","            pathEnd = \"\",","            multiplier = this._coordSpaceMultiplier;","        this._fillChangeHandler();","        this._strokeChangeHandler();","        if(path)","        {","            if(fill && fill.color)","            {","                pathEnd += ' x';","            }","            if(stroke)","            {","                pathEnd += ' e';","            }","        }","        if(path)","        {","            node.path = path + pathEnd;","        }","        if(!isNaN(w) && !isNaN(h))","        {","            node.coordOrigin = this._left + \", \" + this._top;","            node.coordSize = (w * multiplier) + \", \" + (h * multiplier);","            node.style.position = \"absolute\";","            node.style.width =  w + \"px\";","            node.style.height =  h + \"px\";","        }","        this._path = path;","        this._movePath = null;","        this._updateTransform();","    },","","    /**","     * Completes a drawing operation. ","     *","     * @method end","     */","    end: function()","    {","        this._closePath();","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     */","    closePath: function()","    {","        this._addToPath(\" x e\");","    },","","    /**","     * Clears the path.","     *","     * @method clear","     */","    clear: function()","    {","		this._right = 0;","        this._bottom = 0;","        this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._path = \"\";","        this._movePath = null;","    },","    ","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {  ","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","        ","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; ","            }","        }","        return [ tmp[0][0], tmp[0][1] ]; ","    },","  ","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i = 0,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            xy;","        for(; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right, bottom);","        this._trackSize(left, top);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;    ","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom) ","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    },","","    _left: 0,","","    _right: 0,","","    _top: 0,","","    _bottom: 0,","","    _width: 0,","","    _height: 0","};","Y.VMLDrawing = VMLDrawing;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class. "," * `VMLShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Shape.html\">`Shape`</a> class will point to the `VMLShape` class."," *"," * @module graphics"," * @class VMLShape"," * @constructor"," * @param {Object} cfg (optional) Attribute configs"," */","VMLShape = function() ","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    this._normalizedMatrix = new Y.Matrix();","    VMLShape.superclass.constructor.apply(this, arguments);","};","","VMLShape.NAME = \"vmlShape\";","","Y.extend(VMLShape, Y.GraphicBase, Y.mix({","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"shape\",","    ","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","	init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic;","		host.createNode();","        if(graphic)","        {","            this._setGraphic(graphic);","        }","        this._updateHandler();","	},"," ","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a `Graphic` instance, it will be assigned","     * to the `graphic` attribute. Otherwise, a new Graphic instance will be created and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.VMLGraphic)","        {","		    this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.VMLGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","        }","    },","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","        var node,","			x = this.get(\"x\"),","			y = this.get(\"y\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","			id,","			type,","			nodestring,","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","			strokestring,","			classString,","			stroke,","			endcap,","			opacity,","			joinstyle,","			miterlimit,","			dashstyle,","			fill,","			fillstring;","			id = this.get(\"id\");","			type = this._type == \"path\" ? \"shape\" : this._type;","			classString = 'vml' + type + ' ' + _getClassName(SHAPE) + \" \" + _getClassName(this.constructor.NAME); ","			stroke = this._getStrokeProps();","			fill = this._getFillProps();","			","			nodestring  = '<' + type + '  xmlns=\"urn:schemas-microsft.com:vml\" id=\"' + id + '\" class=\"' + classString + '\" style=\"behavior:url(#default#VML);display:inline-block;position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;visibility:' + visibility + '\"';","","		    if(stroke && stroke.weight && stroke.weight > 0)","			{","				endcap = stroke.endcap;","				opacity = parseFloat(stroke.opacity);","				joinstyle = stroke.joinstyle;","				miterlimit = stroke.miterlimit;","				dashstyle = stroke.dashstyle;","				nodestring += ' stroked=\"t\" strokecolor=\"' + stroke.color + '\" strokeWeight=\"' + stroke.weight + 'px\"';","				","				strokestring = '<stroke class=\"vmlstroke\" xmlns=\"urn:schemas-microsft.com:vml\" on=\"t\" style=\"behavior:url(#default#VML);display:inline-block;\"';","				strokestring += ' opacity=\"' + opacity + '\"';","				if(endcap)","				{","					strokestring += ' endcap=\"' + endcap + '\"';","				}","				if(joinstyle)","				{","					strokestring += ' joinstyle=\"' + joinstyle + '\"';","				}","				if(miterlimit)","				{","					strokestring += ' miterlimit=\"' + miterlimit + '\"';","				}","				if(dashstyle)","				{","					strokestring += ' dashstyle=\"' + dashstyle + '\"';","				}","				strokestring += '></stroke>';","				this._strokeNode = DOCUMENT.createElement(strokestring);","				nodestring += ' stroked=\"t\"';","			}","			else","			{","				nodestring += ' stroked=\"f\"';","			}","			if(fill)","			{","				if(fill.node)","				{","					fillstring = fill.node;","					this._fillNode = DOCUMENT.createElement(fillstring);","				}","				if(fill.color)","				{","					nodestring += ' fillcolor=\"' + fill.color + '\"';","				}","				nodestring += ' filled=\"' + fill.filled + '\"';","			}","			","			","			nodestring += '>';","			nodestring += '</' + type + '>';","			","			node = DOCUMENT.createElement(nodestring);","			if(this._strokeNode)","			{","				node.appendChild(this._strokeNode);","			}","			if(this._fillNode)","			{","				node.appendChild(this._fillNode);","			}","","            this.node = node;","            this._strokeFlag = false;","            this._fillFlag = false;","	},","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute ","	 */","	addClass: function(className)","	{","		var node = this.node;","		Y_DOM.addClass(node, className);","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = this.node;","		Y_DOM.removeClass(node, className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains x & y values for new position (coordinates are page-based)","     *","	 */","	setXY: function(xy)","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY();","		this.set(\"x\", xy[0] - parentXY[0]);","		this.set(\"y\", xy[1] - parentXY[1]);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy. ","	 *","	 * @method contains","	 * @param {VMLShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","","		return node === refNode;","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y_SELECTOR.test(this.node, selector);","	},","","	/**","     * Calculates and returns properties for setting an initial stroke.","     *","     * @method _getStrokeProps","     * @return Object","     *","	 * @private","	 */","	 _getStrokeProps: function()","	 {","		var props,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","        if(stroke && stroke.weight && stroke.weight > 0)","		{","			props = {};","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","			if(linecap != \"round\" && linecap != \"square\")","			{","				linecap = \"flat\";","			}","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			props.stroked = true;","			props.color = stroke.color;","			props.weight = stroke.weight;","			props.endcap = linecap;","			props.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin == \"round\" || linejoin == \"bevel\")","			{","				props.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					props.miterlimit = Math.max(linejoin, 1);","					props.joinstyle = \"miter\";","				}","			}","			props.dashstyle = dash;","		}","		return props;","	 },","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","	 * @private","	 */","	_strokeChangeHandler: function(e)","	{","        if(!this._strokeFlag)","        {","            return;","        }","		var node = this.node,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","		if(stroke && stroke.weight && stroke.weight > 0)","		{","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","			if(linecap != \"round\" && linecap != \"square\")","			{","				linecap = \"flat\";","			}","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			node.stroked = true;","			node.strokeColor = stroke.color;","			node.strokeWeight = stroke.weight + \"px\";","			if(!this._strokeNode)","			{","				this._strokeNode = this._createGraphicNode(\"stroke\");","				node.appendChild(this._strokeNode);","			}","			this._strokeNode.endcap = linecap;","			this._strokeNode.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin == \"round\" || linejoin == \"bevel\")","			{","				this._strokeNode.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					this._strokeNode.miterlimit = Math.max(linejoin, 1);","					this._strokeNode.joinstyle = \"miter\";","				}","			}","			this._strokeNode.dashstyle = dash;","            this._strokeNode.on = true;","		}","		else","		{","            if(this._strokeNode)","            {","                this._strokeNode.on = false;","            }","			node.stroked = false;","		}","        this._strokeFlag = false;","	},","","	/**","     * Calculates and returns properties for setting an initial fill.","     *","     * @method _getFillProps","     * @return Object","     *","	 * @private","	 */","	_getFillProps: function()","	{","		var fill = this.get(\"fill\"),","			fillOpacity,","			props,","			gradient,","			i,","			fillstring,","			filled = false;","		if(fill)","		{","			props = {};","			","			if(fill.type == \"radial\" || fill.type == \"linear\")","			{","				fillOpacity = parseFloat(fill.opacity);","				fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;","				filled = true;","				gradient = this._getGradientFill(fill);","				fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" opacity=\"' + fillOpacity + '\"';","				for(i in gradient)","				{","					if(gradient.hasOwnProperty(i))","					{","						fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","					}","				}","				fillstring += ' />';","				props.node = fillstring;","			}","			else if(fill.color)","			{","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","                props.color = fill.color;","				if(IS_NUM(fillOpacity))","				{","					fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);","                    props.opacity = fillOpacity;    ","				    if(fillOpacity < 1)","                    {","                        props.node = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" type=\"solid\" opacity=\"' + fillOpacity + '\"/>';","				    }","                }","			}","			props.filled = filled;","		}","		return props;","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _fillChangeHandler","	 * @private","	 */","	_fillChangeHandler: function(e)","	{","        if(!this._fillFlag)","        {","            return;","        }","		var node = this.node,","			fill = this.get(\"fill\"),","			fillOpacity,","			fillstring,","			filled = false,","            i,","            gradient;","		if(fill)","		{","			if(fill.type == \"radial\" || fill.type == \"linear\")","			{","				filled = true;","				gradient = this._getGradientFill(fill);","                if(this._fillNode)","                {","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            if(i == \"colors\")","                            {","                                this._fillNode.colors.value = gradient[i];","                            }","                            else","                            {","                                this._fillNode[i] = gradient[i];","                            }","                        }","                    }","                }","                else","                {","                    fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\"';","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","                        }","                    }","                    fillstring += ' />';","                    this._fillNode = DOCUMENT.createElement(fillstring);","                    node.appendChild(this._fillNode);","                }","			}","			else if(fill.color)","			{","                node.fillcolor = fill.color;","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","				if(IS_NUM(fillOpacity) && fillOpacity < 1)","				{","					fill.opacity = fillOpacity;","                    if(this._fillNode)","					{","                        if(this._fillNode.getAttribute(\"type\") != \"solid\")","                        {","                            this._fillNode.type = \"solid\";","                        }","						this._fillNode.opacity = fillOpacity;","					}","					else","					{     ","                        fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" type=\"solid\" opacity=\"' + fillOpacity + '\"/>';","                        this._fillNode = DOCUMENT.createElement(fillstring);","                        node.appendChild(this._fillNode);","					}","				}","				else if(this._fillNode)","                {   ","                    this._fillNode.opacity = 1;","                    this._fillNode.type = \"solid\";","				}","			}","		}","		node.filled = filled;","        this._fillFlag = false;","	},","","	//not used. remove next release.","    _updateFillNode: function(node)","	{","		if(!this._fillNode)","		{","			this._fillNode = this._createGraphicNode(\"fill\");","			node.appendChild(this._fillNode);","		}","	},","","    /**","     * Calculates and returns an object containing gradient properties for a fill node. ","     *","     * @method _getGradientFill","     * @param {Object} fill Object containing fill properties.","     * @return Object","     * @private","     */","	_getGradientFill: function(fill)","	{","		var gradientProps = {},","			gradientBoxWidth,","			gradientBoxHeight,","			type = fill.type,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			isNumber = IS_NUM,","			stop,","			stops = fill.stops,","			len = stops.length,","			opacity,","			color,","			i = 0,","			oi,","			colorstring = \"\",","			cx = fill.cx,","			cy = fill.cy,","			fx = fill.fx,","			fy = fill.fy,","			r = fill.r,","            pct,","			rotation = fill.rotation || 0;","		if(type === \"linear\")","		{","            if(rotation <= 270)","            {","                rotation = Math.abs(rotation - 270);","            }","			else if(rotation < 360)","            {","                rotation = 270 + (360 - rotation);","            }","            else","            {","                rotation = 270;","            }","            gradientProps.type = \"gradient\";//\"gradientunscaled\";","			gradientProps.angle = rotation;","		}","		else if(type === \"radial\")","		{","			gradientBoxWidth = w * (r * 2);","			gradientBoxHeight = h * (r * 2);","			fx = r * 2 * (fx - 0.5);","			fy = r * 2 * (fy - 0.5);","			fx += cx;","			fy += cy;","			gradientProps.focussize = (gradientBoxWidth/w)/10 + \"% \" + (gradientBoxHeight/h)/10 + \"%\";","			gradientProps.alignshape = false;","			gradientProps.type = \"gradientradial\";","			gradientProps.focus = \"100%\";","			gradientProps.focusposition = Math.round(fx * 100) + \"% \" + Math.round(fy * 100) + \"%\";","		}","		for(;i < len; ++i) {","			stop = stops[i];","			color = stop.color;","			opacity = stop.opacity;","			opacity = isNumber(opacity) ? opacity : 1;","			pct = stop.offset || i/(len-1);","			pct *= (r * 2);","            pct = Math.round(100 * pct) + \"%\";","            oi = i > 0 ? i + 1 : \"\";","            gradientProps[\"opacity\" + oi] = opacity + \"\";","            colorstring += \", \" + pct + \" \" + color;","		}","		if(parseFloat(pct) < 100)","		{","			colorstring += \", 100% \" + color;","		}","		gradientProps.colors = colorstring.substr(2);","		return gradientProps;","	},","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","	","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","            key,","			transform,","			transformOrigin,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            tx,","            ty,","            matrix = this.matrix,","            normalizedMatrix = this._normalizedMatrix,","            isPathShape = this instanceof Y.VMLPath,","            i = 0,","            len = this._transforms.length;","        if(this._transforms && this._transforms.length > 0)","		{","            transformOrigin = this.get(\"transformOrigin\");","       ","            if(isPathShape)","            {","                normalizedMatrix.translate(this._left, this._top);","            }","            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.","            //subtract 0.5 from values","            tx = transformOrigin[0] - 0.5;","            ty = transformOrigin[1] - 0.5;","            ","            //ensure the values are within the appropriate range to avoid errors","            tx = Math.max(-0.5, Math.min(0.5, tx));","            ty = Math.max(-0.5, Math.min(0.5, ty));","            for(; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]); ","                    matrix[key].apply(matrix, this._transforms[i]); ","                }","			}","            if(isPathShape)","            {","                normalizedMatrix.translate(-this._left, -this._top);","            }","            transform = normalizedMatrix.a + \",\" + ","                        normalizedMatrix.c + \",\" + ","                        normalizedMatrix.b + \",\" + ","                        normalizedMatrix.d + \",\" + ","                        0 + \",\" +","                        0;","		}","        this._graphic.addToRedrawQueue(this);    ","        if(transform)","        {","            if(!this._skew)","            {","                this._skew = DOCUMENT.createElement( '<skew class=\"vmlskew\" xmlns=\"urn:schemas-microsft.com:vml\" on=\"false\" style=\"behavior:url(#default#VML);display:inline-block;\" />');","                this.node.appendChild(this._skew); ","            }","            this._skew.matrix = transform;","            this._skew.on = true;","            //use offset for translate","            this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + \"px, \" + this._getSkewOffsetValue(normalizedMatrix.dy) + \"px\";","            this._skew.origin = tx + \", \" + ty;","        }","        if(this._type != \"path\")","        {","            this._transforms = [];","        }","        node.style.left = x + \"px\";","        node.style.top =  y + \"px\";","    },","    ","    /**","     * Normalizes the skew offset values between -32767 and 32767.","     *","     * @method _getSkewOffsetValue","     * @param {Number} val The value to normalize","     * @return Number","     * @private","     */","    _getSkewOffsetValue: function(val)","    {","        var sign = Y.MatrixUtil.sign(val),","            absVal = Math.abs(val);","        val = Math.min(absVal, 32767) * sign;","        return val;","    },","	","	/**","	 * Storage for translateX","	 *","     * @property _translateX","     * @type Number","	 * @private","	 */","	_translateX: 0,","","	/**","	 * Storage for translateY","	 *","     * @property _translateY","     * @type Number","	 * @private","	 */","	_translateY: 0,","    ","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","	","    /**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to transate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y)","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","	 skewX: function(x)","	 {","		this._addTransform(\"skewX\", arguments);","	 },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","	 skewY: function(y)","	 {","		this._addTransform(\"skewY\", arguments);","	 },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","	 rotate: function(deg)","	 {","		this._addTransform(\"rotate\", arguments);","	 },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","	scale: function(x, y)","	{","		this._addTransform(\"scale\", arguments);","	},","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so, ","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function(e)","	{","		var host = this,","            node = host.node;","        host._fillChangeHandler();","        host._strokeChangeHandler();","        node.style.width = this.get(\"width\") + \"px\";","        node.style.height = this.get(\"height\") + \"px\"; ","        this._draw();","		host._updateTransform();","	},","","	/**","	 * Creates a graphic node","	 *","	 * @method _createGraphicNode","	 * @param {String} type node type to create","	 * @return HTMLElement","	 * @private","	 */","	_createGraphicNode: function(type)","	{","		type = type || this._type;","		return DOCUMENT.createElement('<' + type + ' xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);display:inline-block;\" class=\"vml' + type + '\"/>');","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @private","	 * @method _getDefaultFill","	 * @return Object","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @private","	 * @method _getDefaultStroke","	 * @return Object","	 */","	_getDefaultStroke: function() ","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can ","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as ","     * the name param.","     */","	set: function() ","	{","		var host = this;","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox. ","     *","	 * @method getBounds","     * @param {Matrix} [optional] cfg Reference to matrix instance","	 * @return Object","	 */","	getBounds: function(cfg)","	{","		var stroke = this.get(\"stroke\"),","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			x = this.get(\"x\"),","			y = this.get(\"y\"),","            wt = 0;","		if(stroke && stroke.weight)","		{","			wt = stroke.weight;","		}","        w = (x + w + wt) - (x - wt); ","        h = (y + h + wt) - (y - wt);","        x -= wt;","        y -= wt;","		return this._normalizedMatrix.getContentRect(w, h, x, y);","	},","	","    /**","     *  Destroys shape","     *","     *  @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {   ","            if(this._fillNode)","            {","                this.node.removeChild(this._fillNode);","                this._fillNode = null;","            }","            if(this._strokeNode)","            {","                this.node.removeChild(this._strokeNode);","                this._strokeNode = null;","            }","            Y.one(this.node).remove(true);","        }","    }","}, Y.VMLDrawing.prototype));","","VMLShape.ATTRS = {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a ","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","	","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *     ","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>      ","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains corresponding methods for each transform","     * that will apply the transform to the current matrix. The below code illustrates how you might use the `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","    ","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String  ","	 */","	transform: {","		setter: function(val)","		{","            var i = 0,","                len,","                transform;","            this.matrix.init();	","            this._normalizedMatrix.init();	","            this._transforms = this.matrix.getTransformArray(val);","            len = this._transforms.length;","            for(;i < len; ++i)","            {","                transform = this._transforms[i];","            }","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","	","	/**","	 * ","	 * @config width","	 */","	width: {","		value: 0","	},","","	/**","	 * ","	 * @config height","	 */","	height: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.node,","				visibility = val ? \"visible\" : \"hidden\";","			if(node)","			{","				node.style.visibility = visibility;","			}","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape. ","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1. Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd> ","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p> ","	 *","	 * @config fill","	 * @type Object ","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","		","		setter: function(val)","		{","			var i,","				fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","			","			if(val)","			{","				//ensure, fill type is solid if color is explicitly passed.","				if(val.hasOwnProperty(\"color\"))","				{","					val.type = \"solid\";","				}","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{   ","						tmpl[i] = val[i];","					}","				}","			}","			fill = tmpl;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color == \"none\")","				{","					fill.color = null;","				}","			}","			this._fillFlag = true;","            return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set to an array, the first index indicates the","     *  length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin of miter, you simply specify the limit as opposed to having","     *  separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","		","		setter: function(val)","		{","			var i,","				stroke,","                wt,","				tmpl = this.get(\"stroke\") || this._getDefaultStroke();","			if(val)","			{","                if(val.hasOwnProperty(\"weight\"))","                {","                    wt = parseInt(val.weight, 10);","                    if(!isNaN(wt))","                    {","                        val.weight = wt;","                    }","                }","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{   ","						tmpl[i] = val[i];","					}","				}","			}","			stroke = tmpl;","            this._strokeFlag = true;","			return stroke;","		}","	},","	","	//Not used. Remove in future.","    autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	// ","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","	/**","	 * Dom node for the shape.","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","	}","};","Y.VMLShape = VMLShape;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Path.html\">`Path`</a> class. "," * `VMLPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Path.html\">`Path`</a> class will point to the `VMLPath` class."," *"," * @module graphics"," * @class VMLPath"," * @extends VMLShape"," */","VMLPath = function()","{","	VMLPath.superclass.constructor.apply(this, arguments);","};","","VMLPath.NAME = \"vmlPath\";","Y.extend(VMLPath, Y.VMLShape);","VMLPath.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 * ","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var val = Math.max(this._right - this._left, 0);","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 * ","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			return Math.max(this._bottom - this._top, 0);","		}","	},","	","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","		readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.VMLPath = VMLPath;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class. "," * `VMLRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Rect.html\">`Rect`</a> class will point to the `VMLRect` class."," *"," * @module graphics"," * @class VMLRect"," * @constructor"," */","VMLRect = function()","{","	VMLRect.superclass.constructor.apply(this, arguments);","};","VMLRect.NAME = \"vmlRect\"; ","Y.extend(VMLRect, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\"","});","VMLRect.ATTRS = Y.VMLShape.ATTRS;","Y.VMLRect = VMLRect;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class. "," * `VMLEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a> class will point to the `VMLEllipse` class."," *"," * @module graphics"," * @class VMLEllipse"," * @constructor"," */","VMLEllipse = function()","{","	VMLEllipse.superclass.constructor.apply(this, arguments);","};","","VMLEllipse.NAME = \"vmlEllipse\";","","Y.extend(VMLEllipse, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","VMLEllipse.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse. ","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		lazyAdd: false,","","		getter: function()","		{","			var val = this.get(\"width\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","		","		setter: function(val)","		{","			var w = val * 2; ","			this.set(\"width\", w);","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse. ","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		lazyAdd: false,","		","		getter: function()","		{","			var val = this.get(\"height\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","","		setter: function(val)","		{","			var h = val * 2;","			this.set(\"height\", h);","			return val;","		}","	}","});","Y.VMLEllipse = VMLEllipse;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class. "," * `VMLCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Circle.html\">`Circle`</a> class will point to the `VMLCircle` class."," *"," * @module graphics"," * @class VMLCircle"," * @constructor"," */","VMLCircle = function(cfg)","{","	VMLCircle.superclass.constructor.apply(this, arguments);","};","","VMLCircle.NAME = \"vmlCircle\";","","Y.extend(VMLCircle, VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","","VMLCircle.ATTRS = Y.merge(VMLShape.ATTRS, {","	/**","	 * Radius for the circle.","	 *","	 * @config radius","	 * @type Number","	 */","	radius: {","		lazyAdd: false,","","		value: 0","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{   ","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{   ","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	}","});","Y.VMLCircle = VMLCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class VMLPieSlice"," * @constructor"," */","VMLPieSlice = function()","{","	VMLPieSlice.superclass.constructor.apply(this, arguments);","};","VMLPieSlice.NAME = \"vmlPieSlice\";","Y.extend(VMLPieSlice, Y.VMLShape, Y.mix({","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"shape\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function(e)","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," }, Y.VMLDrawing.prototype));","VMLPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.VMLShape.ATTRS);","Y.VMLPieSlice = VMLPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Graphic.html\">`Graphic`</a> class. "," * `VMLGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Graphic.html\">`Graphic`</a> class will point to the `VMLGraphic` class."," *"," * @module graphics"," * @class VMLGraphic"," * @constructor"," */","VMLGraphic = function() {","    VMLGraphic.superclass.constructor.apply(this, arguments);    ","};","","VMLGraphic.NAME = \"vmlGraphic\";","","VMLGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node instance or a CSS selector string.","     * ","     * @config render","     * @type Node | String ","     */","    render: {},","	","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.","     *","     *  @config contentBounds","     *  @type Object","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The html element that represents to coordinate system of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`. ","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`. ","	 *","	 * @config height ","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines how the size of instance is calculated. If true, the width and height are determined by the size of the contents.","     *  If false, the width and height values are either explicitly set or determined by the size of the parent node's dimensions.","     *","     *  @config autoSize","     *  @type Boolean","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * The contentBounds will resize to greater values but not values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown ","     * @type Boolean","     */","    resizeDown: {","        getter: function()","        {","            return this._resizeDown;","        },","","        setter: function(val)","        {","            this._resizeDown = val;","            if(this._node)","            {","                this._redraw();","            }","            return val;","        }","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(VMLGraphic, Y.GraphicBase, {","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = this.parentNode,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            xy;","        if(node)","        {","            xy = Y.one(node).getXY();","            xy[0] += x;","            xy[1] += y;","        }","        else","        {","            xy = Y.DOM._getOffset(this._node);","        }","        return xy;","    },","","    /**","     * @private","     * @property _resizeDown ","     * @type Boolean","     */","    _resizeDown: false,","","    /**","     * Initializes the class.","     *","     * @method initializer","     * @private","     */","    initializer: function(config) {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\";","        this._shapes = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = this._createGraphic();","        this._node.style.visibility = visibility;","        this._node.setAttribute(\"id\", this.get(\"id\"));","        if(render)","        {","            this.render(render);","        }","    },","    ","    /**","     * Adds the graphics node to the dom.","     * ","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(this._node);","        this.setSize(w, h);","        this.parentNode = parentNode;","        this.set(\"width\", w);","        this.set(\"height\", h);","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.clear();","        Y.one(this._node).remove(true);","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var shapeClass = this._getShapeClass(cfg.type),","            shape = new shapeClass(cfg);","        this._appendShape(shape);","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\")) ","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof VMLShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && (shape instanceof VMLShape))","        {","            shape._destroy();","            this._shapes[shape.get(\"id\")] = null;","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","        this._removeChildren(this._node);","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Sets the size of the graphics object.","     * ","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     */","    setSize: function(w, h) {","        w = Math.round(w);","        h = Math.round(h);","        this._node.style.width = w + 'px';","        this._node.style.height = h + 'px';","        this._node.coordSize = w + ' ' + h;","    },","","    /**","     * Sets the positon of the graphics object.","     *","     * @method setPosition","     * @param {Number} x x-coordinate for the object.","     * @param {Number} y y-coordinate for the object.","     */","    setPosition: function(x, y)","    {","        x = Math.round(x);","        y = Math.round(y);","        this._node.style.left = x + \"px\";","        this._node.style.top = y + \"px\";","    },","","    /**","     * Creates a group element","     *","     * @method _createGraphic","     * @private","     */","    _createGraphic: function() {","        var group = DOCUMENT.createElement('<group xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);display:block;position:absolute;top:0px;left:0px;zoom:1;\" />');","        return group;","    },","","    /**","     * Creates a graphic node","     *","     * @method _createGraphicNode","     * @param {String} type node type to create","     * @param {String} pe specified pointer-events value","     * @return HTMLElement","     * @private","     */","    _createGraphicNode: function(type)","    {","        return DOCUMENT.createElement('<' + type + ' xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);display:inline-block;zoom:1;\" />');","    ","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        return this._shapes[id];","    },","","    /**","     * Returns a shape class. Used by `addShape`. ","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class. ","     * @return Function ","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.VMLCircle,","        rect: Y.VMLRect,","        path: Y.VMLPath,","        ellipse: Y.VMLEllipse,","        pieslice: Y.VMLPieSlice","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method.apply();","        this._redraw();","        this.set(\"autoDraw\", autoDraw);","    },","    ","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds. ","     *","     * @method addToRedrawQueue","     * @param shape {VMLShape}","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this._resizeDown)","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            box.width = box.right - box.left;","            box.height = box.bottom - box.top;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\")) ","        {","            this._redraw();","        }","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var box = this._resizeDown ? this._getUpdatedContentBounds() : this._contentBounds;","        if(this.get(\"autoSize\"))","        {","            this.setSize(box.right, box.bottom);","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","    },","    ","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object} ","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {","                left: 0,","                top: 0,","                right: 0,","                bottom: 0","            };","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Math.min(box.left, bounds.left);","                box.top = Math.min(box.top, bounds.top);","                box.right = Math.max(box.right, bounds.right);","                box.bottom = Math.max(box.bottom, bounds.bottom);","            }","        }","        box.width = box.right - box.left;","        box.height = box.bottom - box.top;","        this._contentBounds = box;","        return box;","    }","});","Y.VMLGraphic = VMLGraphic;","","","","}, '@VERSION@' ,{requires:['graphics'], skinnable:false});"];
_yuitest_coverage["/build/graphics-vml/graphics-vml.js"].lines = {"1":0,"3":0,"21":0,"33":0,"53":0,"65":0,"66":0,"68":0,"69":0,"71":0,"104":0,"111":0,"112":0,"113":0,"114":0,"115":0,"116":0,"117":0,"118":0,"119":0,"120":0,"121":0,"134":0,"140":0,"153":0,"154":0,"155":0,"156":0,"157":0,"158":0,"159":0,"160":0,"175":0,"176":0,"177":0,"178":0,"179":0,"180":0,"181":0,"182":0,"183":0,"184":0,"197":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"220":0,"224":0,"225":0,"226":0,"227":0,"228":0,"229":0,"244":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"268":0,"269":0,"271":0,"273":0,"274":0,"275":0,"276":0,"277":0,"278":0,"279":0,"280":0,"281":0,"282":0,"293":0,"297":0,"298":0,"300":0,"301":0,"302":0,"303":0,"304":0,"305":0,"307":0,"308":0,"319":0,"320":0,"321":0,"322":0,"333":0,"341":0,"342":0,"343":0,"345":0,"347":0,"349":0,"351":0,"354":0,"356":0,"358":0,"360":0,"361":0,"362":0,"363":0,"364":0,"366":0,"367":0,"368":0,"378":0,"388":0,"398":0,"399":0,"400":0,"401":0,"402":0,"403":0,"404":0,"405":0,"418":0,"423":0,"424":0,"427":0,"428":0,"429":0,"430":0,"433":0,"447":0,"455":0,"457":0,"458":0,"459":0,"460":0,"461":0,"463":0,"464":0,"465":0,"466":0,"467":0,"468":0,"480":0,"481":0,"483":0,"485":0,"487":0,"489":0,"491":0,"493":0,"495":0,"496":0,"511":0,"523":0,"525":0,"526":0,"527":0,"528":0,"531":0,"533":0,"552":0,"563":0,"565":0,"566":0,"568":0,"570":0,"583":0,"584":0,"586":0,"590":0,"591":0,"594":0,"595":0,"608":0,"627":0,"628":0,"629":0,"630":0,"631":0,"633":0,"635":0,"637":0,"638":0,"639":0,"640":0,"641":0,"642":0,"644":0,"645":0,"646":0,"648":0,"650":0,"652":0,"654":0,"656":0,"658":0,"660":0,"662":0,"663":0,"664":0,"668":0,"670":0,"672":0,"674":0,"675":0,"677":0,"679":0,"681":0,"685":0,"686":0,"688":0,"689":0,"691":0,"693":0,"695":0,"698":0,"699":0,"700":0,"711":0,"712":0,"723":0,"724":0,"735":0,"739":0,"751":0,"753":0,"754":0,"766":0,"777":0,"779":0,"791":0,"804":0,"814":0,"816":0,"817":0,"818":0,"819":0,"821":0,"823":0,"824":0,"825":0,"826":0,"827":0,"828":0,"829":0,"830":0,"831":0,"832":0,"833":0,"835":0,"836":0,"837":0,"839":0,"840":0,"843":0,"845":0,"849":0,"850":0,"852":0,"853":0,"856":0,"858":0,"869":0,"871":0,"873":0,"883":0,"885":0,"886":0,"887":0,"889":0,"891":0,"892":0,"893":0,"894":0,"895":0,"896":0,"897":0,"898":0,"899":0,"901":0,"902":0,"904":0,"905":0,"906":0,"908":0,"909":0,"910":0,"912":0,"913":0,"916":0,"918":0,"922":0,"923":0,"925":0,"926":0,"929":0,"930":0,"934":0,"936":0,"938":0,"940":0,"953":0,"960":0,"962":0,"964":0,"966":0,"967":0,"968":0,"969":0,"970":0,"971":0,"973":0,"975":0,"978":0,"979":0,"981":0,"983":0,"984":0,"985":0,"986":0,"988":0,"989":0,"990":0,"992":0,"996":0,"998":0,"1009":0,"1011":0,"1013":0,"1020":0,"1022":0,"1024":0,"1025":0,"1026":0,"1028":0,"1030":0,"1032":0,"1034":0,"1038":0,"1045":0,"1046":0,"1048":0,"1050":0,"1053":0,"1054":0,"1055":0,"1058":0,"1060":0,"1061":0,"1062":0,"1063":0,"1065":0,"1066":0,"1068":0,"1070":0,"1072":0,"1076":0,"1077":0,"1078":0,"1081":0,"1083":0,"1084":0,"1088":0,"1089":0,"1095":0,"1097":0,"1098":0,"1112":0,"1134":0,"1136":0,"1138":0,"1140":0,"1142":0,"1146":0,"1148":0,"1149":0,"1151":0,"1153":0,"1154":0,"1155":0,"1156":0,"1157":0,"1158":0,"1159":0,"1160":0,"1161":0,"1162":0,"1163":0,"1165":0,"1166":0,"1167":0,"1168":0,"1169":0,"1170":0,"1171":0,"1172":0,"1173":0,"1174":0,"1175":0,"1177":0,"1179":0,"1181":0,"1182":0,"1195":0,"1196":0,"1197":0,"1198":0,"1199":0,"1201":0,"1213":0,"1226":0,"1228":0,"1230":0,"1232":0,"1236":0,"1237":0,"1240":0,"1241":0,"1242":0,"1244":0,"1245":0,"1247":0,"1248":0,"1251":0,"1253":0,"1255":0,"1262":0,"1263":0,"1265":0,"1267":0,"1268":0,"1270":0,"1271":0,"1273":0,"1274":0,"1276":0,"1278":0,"1280":0,"1281":0,"1294":0,"1296":0,"1297":0,"1336":0,"1337":0,"1338":0,"1350":0,"1351":0,"1363":0,"1364":0,"1376":0,"1387":0,"1398":0,"1409":0,"1420":0,"1434":0,"1436":0,"1438":0,"1459":0,"1461":0,"1462":0,"1463":0,"1464":0,"1465":0,"1466":0,"1479":0,"1480":0,"1491":0,"1510":0,"1529":0,"1530":0,"1531":0,"1533":0,"1549":0,"1555":0,"1557":0,"1559":0,"1560":0,"1561":0,"1562":0,"1563":0,"1573":0,"1574":0,"1576":0,"1580":0,"1592":0,"1594":0,"1596":0,"1597":0,"1599":0,"1601":0,"1602":0,"1604":0,"1609":0,"1620":0,"1656":0,"1659":0,"1660":0,"1661":0,"1662":0,"1663":0,"1665":0,"1667":0,"1668":0,"1673":0,"1706":0,"1711":0,"1712":0,"1714":0,"1716":0,"1746":0,"1748":0,"1750":0,"1752":0,"1804":0,"1808":0,"1811":0,"1813":0,"1815":0,"1817":0,"1819":0,"1823":0,"1824":0,"1826":0,"1828":0,"1831":0,"1832":0,"1869":0,"1873":0,"1875":0,"1877":0,"1878":0,"1880":0,"1883":0,"1885":0,"1887":0,"1891":0,"1892":0,"1893":0,"1924":0,"1939":0,"1943":0,"1954":0,"1956":0,"1959":0,"1960":0,"1961":0,"1971":0,"1972":0,"1985":0,"2001":0,"2005":0,"2016":0,"2018":0,"2020":0,"2021":0,"2031":0,"2032":0,"2043":0,"2045":0,"2048":0,"2050":0,"2060":0,"2072":0,"2073":0,"2074":0,"2079":0,"2080":0,"2081":0,"2097":0,"2098":0,"2099":0,"2104":0,"2105":0,"2106":0,"2110":0,"2121":0,"2123":0,"2126":0,"2128":0,"2139":0,"2161":0,"2162":0,"2167":0,"2169":0,"2182":0,"2183":0,"2188":0,"2190":0,"2194":0,"2202":0,"2204":0,"2206":0,"2207":0,"2225":0,"2230":0,"2231":0,"2232":0,"2235":0,"2273":0,"2284":0,"2285":0,"2288":0,"2290":0,"2308":0,"2313":0,"2314":0,"2316":0,"2318":0,"2334":0,"2349":0,"2364":0,"2377":0,"2379":0,"2381":0,"2394":0,"2396":0,"2398":0,"2424":0,"2429":0,"2430":0,"2432":0,"2434":0,"2447":0,"2452":0,"2453":0,"2455":0,"2457":0,"2470":0,"2475":0,"2476":0,"2478":0,"2480":0,"2502":0,"2503":0,"2508":0,"2535":0,"2539":0,"2541":0,"2542":0,"2543":0,"2547":0,"2549":0,"2566":0,"2568":0,"2569":0,"2575":0,"2576":0,"2577":0,"2578":0,"2580":0,"2591":0,"2594":0,"2595":0,"2596":0,"2597":0,"2598":0,"2599":0,"2600":0,"2610":0,"2611":0,"2623":0,"2624":0,"2626":0,"2628":0,"2630":0,"2631":0,"2643":0,"2645":0,"2647":0,"2651":0,"2663":0,"2665":0,"2667":0,"2670":0,"2672":0,"2673":0,"2674":0,"2676":0,"2678":0,"2689":0,"2691":0,"2693":0,"2695":0,"2698":0,"2710":0,"2712":0,"2713":0,"2715":0,"2716":0,"2717":0,"2728":0,"2729":0,"2741":0,"2744":0,"2746":0,"2748":0,"2750":0,"2754":0,"2756":0,"2768":0,"2769":0,"2770":0,"2771":0,"2772":0,"2784":0,"2785":0,"2786":0,"2787":0,"2797":0,"2798":0,"2812":0,"2825":0,"2838":0,"2839":0,"2841":0,"2843":0,"2869":0,"2870":0,"2871":0,"2872":0,"2873":0,"2885":0,"2887":0,"2889":0,"2901":0,"2903":0,"2904":0,"2906":0,"2907":0,"2908":0,"2909":0,"2910":0,"2911":0,"2912":0,"2913":0,"2914":0,"2916":0,"2918":0,"2930":0,"2931":0,"2933":0,"2935":0,"2937":0,"2938":0,"2951":0,"2961":0,"2963":0,"2965":0,"2966":0,"2967":0,"2968":0,"2969":0,"2970":0,"2973":0,"2974":0,"2975":0,"2976":0,"2979":0};
_yuitest_coverage["/build/graphics-vml/graphics-vml.js"].functions = {"VMLDrawing:21":0,"_round:51":0,"_addToPath:63":0,"curveTo:103":0,"quadraticCurveTo:133":0,"drawRect:152":0,"drawRoundRect:174":0,"drawCircle:196":0,"drawEllipse:219":0,"drawDiamond:242":0,"drawWedge:266":0,"lineTo:292":0,"moveTo:318":0,"_closePath:331":0,"end:376":0,"closePath:386":0,"clear:396":0,"getBezierData:417":0,"_setCurveBoundingBox:445":0,"_trackSize:479":0,"VMLShape:523":0,"init:550":0,"initializer:561":0,"_setGraphic:581":0,"createNode:606":0,"addClass:709":0,"removeClass:721":0,"getXY:733":0,"setXY:749":0,"contains:764":0,"compareTo:776":0,"test:789":0,"_getStrokeProps:802":0,"_strokeChangeHandler:867":0,"_getFillProps:951":0,"_fillChangeHandler:1007":0,"_updateFillNode:1093":0,"_getGradientFill:1110":0,"_addTransform:1193":0,"_updateTransform:1211":0,"_getSkewOffsetValue:1292":0,"translate:1334":0,"translateX:1348":0,"translateY:1361":0,"skew:1374":0,"skewX:1385":0,"skewY:1396":0,"rotate:1407":0,"scale:1418":0,"on:1432":0,"_updateHandler:1457":0,"_createGraphicNode:1477":0,"_getDefaultFill:1490":0,"_getDefaultStroke:1508":0,"set:1527":0,"getBounds:1547":0,"destroy:1571":0,"_destroy:1590":0,"valueFn:1618":0,"setter:1654":0,"getter:1671":0,"valueFn:1704":0,"setter:1709":0,"setter:1745":0,"setter:1802":0,"setter:1867":0,"getter:1922":0,"getter:1937":0,"VMLPath:1954":0,"getter:1969":0,"getter:1983":0,"getter:1999":0,"VMLRect:2016":0,"VMLEllipse:2043":0,"getter:2070":0,"setter:2077":0,"getter:2095":0,"setter:2102":0,"VMLCircle:2121":0,"setter:2159":0,"getter:2165":0,"setter:2180":0,"getter:2186":0,"VMLPieSlice:2202":0,"_draw:2223":0,"VMLGraphic:2284":0,"valueFn:2306":0,"setter:2311":0,"getter:2332":0,"getter:2347":0,"getter:2362":0,"setter:2375":0,"setter:2392":0,"getter:2422":0,"setter:2427":0,"getter:2445":0,"setter:2450":0,"getter:2468":0,"setter:2473":0,"setter:2500":0,"getXY:2533":0,"initializer:2565":0,"render:2590":0,"destroy:2608":0,"addShape:2621":0,"_appendShape:2641":0,"removeShape:2661":0,"removeAllShapes:2687":0,"_removeChildren:2708":0,"clear:2727":0,"_toggleVisible:2739":0,"setSize:2767":0,"setPosition:2782":0,"_createGraphic:2796":0,"_createGraphicNode:2810":0,"getShapeById:2823":0,"_getShapeClass:2836":0,"batch:2867":0,"_getDocFrag:2883":0,"addToRedrawQueue:2899":0,"_redraw:2928":0,"_getUpdatedContentBounds:2949":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/graphics-vml/graphics-vml.js"].coveredLines = 757;
_yuitest_coverage["/build/graphics-vml/graphics-vml.js"].coveredFunctions = 123;
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1);
YUI.add('graphics-vml', function(Y) {

_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 3);
var SHAPE = "vmlShape",
    Y_LANG = Y.Lang,
    IS_NUM = Y_LANG.isNumber,
    IS_ARRAY = Y_LANG.isArray,
    IS_STRING = Y_LANG.isString,
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
    VMLPieSlice,
    _getClassName = Y.ClassNameManager.getClassName;

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 21);
function VMLDrawing() {}

/**
 * <a href="http://www.w3.org/TR/NOTE-VML">VML</a> implementation of the <a href="Drawing.html">`Drawing`</a> class. 
 * `VMLDrawing` is not intended to be used directly. Instead, use the <a href="Drawing.html">`Drawing`</a> class. 
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> and <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> 
 * capabilities, the <a href="Drawing.html">`Drawing`</a> class will point to the `VMLDrawing` class.
 *
 * @module graphics
 * @class VMLDrawing
 * @constructor
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 33);
VMLDrawing.prototype = {
    /**
     * Value for rounding up to coordsize
     *
     * @property _coordSpaceMultiplier
     * @type Number
     * @private
     */
    _coordSpaceMultiplier: 100,

    /**
     * Rounds dimensions and position values based on the coordinate space.
     *
     * @method _round
     * @param {Number} The value for rounding
     * @return Number
     * @private
     */
    _round:function(val)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_round", 51);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 53);
return Math.round(val * this._coordSpaceMultiplier);
    },

    /**
     * Concatanates the path.
     *
     * @method _addToPath
     * @param {String} val The value to add to the path string.
     * @private
     */
    _addToPath: function(val)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_addToPath", 63);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 65);
this._path = this._path || "";
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 66);
if(this._movePath)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 68);
this._path += this._movePath;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 69);
this._movePath = null;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 71);
this._path += val;
    },

    /**
     * Current x position of the drawing.
     *
     * @property _currentX
     * @type Number
     * @private
     */
    _currentX: 0,

    /**
     * Current y position of the drqwing.
     *
     * @property _currentY
     * @type Number
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "curveTo", 103);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 104);
var w,
            h,
            pts,
            right,
            left,
            bottom,
            top;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 111);
this._addToPath(" c " + this._round(cp1x) + ", " + this._round(cp1y) + ", " + this._round(cp2x) + ", " + this._round(cp2y) + ", " + this._round(x) + ", " + this._round(y));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 112);
right = Math.max(x, Math.max(cp1x, cp2x));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 113);
bottom = Math.max(y, Math.max(cp1y, cp2y));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 114);
left = Math.min(x, Math.min(cp1x, cp2x));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 115);
top = Math.min(y, Math.min(cp1y, cp2y));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 116);
w = Math.abs(right - left);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 117);
h = Math.abs(bottom - top);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 118);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]]; 
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 119);
this._setCurveBoundingBox(pts, w, h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 120);
this._currentX = x;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 121);
this._currentY = y;
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "quadraticCurveTo", 133);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 134);
var currentX = this._currentX,
            currentY = this._currentY,
            cp1x = currentX + 0.67*(cpx - currentX),
            cp1y = currentY + 0.67*(cpy - currentY),
            cp2x = cp1x + (x - currentX) * 0.34,
            cp2y = cp1y + (y - currentY) * 0.34;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 140);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "drawRect", 152);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 153);
this.moveTo(x, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 154);
this.lineTo(x + w, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 155);
this.lineTo(x + w, y + h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 156);
this.lineTo(x, y + h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 157);
this.lineTo(x, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 158);
this._currentX = x;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 159);
this._currentY = y;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 160);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "drawRoundRect", 174);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 175);
this.moveTo(x, y + eh);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 176);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 177);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 178);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 179);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 180);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 181);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 182);
this.lineTo(x + ew, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 183);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 184);
return this;
    },

    /**
     * Draws a circle. Used internally by `CanvasCircle` class.
     *
     * @method drawCircle
     * @param {Number} x y-coordinate
     * @param {Number} y x-coordinate
     * @param {Number} r radius
     * @protected
     */
	drawCircle: function(x, y, radius) {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "drawCircle", 196);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 197);
var startAngle = 0,
            endAngle = 360,
            circum = radius * 2;

        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 201);
endAngle *= 65535;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 202);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 203);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 204);
this.moveTo((x + circum), (y + radius));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 205);
this._addToPath(" ae " + this._round(x + radius) + ", " + this._round(y + radius) + ", " + this._round(radius) + ", " + this._round(radius) + ", " + startAngle + ", " + endAngle);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 206);
return this;
    },
    
    /**
     * Draws an ellipse.
     *
     * @method drawEllipse
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @param {Number} w width
     * @param {Number} h height
     * @protected
     */
	drawEllipse: function(x, y, w, h) {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "drawEllipse", 219);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 220);
var startAngle = 0,
            endAngle = 360,
            radius = w * 0.5,
            yRadius = h * 0.5;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 224);
endAngle *= 65535;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 225);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 226);
this._trackSize(x + w, y + h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 227);
this.moveTo((x + w), (y + yRadius));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 228);
this._addToPath(" ae " + this._round(x + radius) + ", " + this._round(x + radius) + ", " + this._round(y + yRadius) + ", " + this._round(radius) + ", " + this._round(yRadius) + ", " + startAngle + ", " + endAngle);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 229);
return this;
    },
    
    /**
     * Draws a diamond.     
     * 
     * @method drawDiamond
     * @param {Number} x y-coordinate
     * @param {Number} y x-coordinate
     * @param {Number} width width
     * @param {Number} height height
     * @protected
     */
    drawDiamond: function(x, y, width, height)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "drawDiamond", 242);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 244);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 246);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 247);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 248);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 249);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 250);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 251);
return this;
    },

    /**
     * Draws a wedge.
     *
     * @method drawWedge
     * @param {Number} x x-coordinate of the wedge's center point
     * @param {Number} y y-coordinate of the wedge's center point
     * @param {Number} startAngle starting angle in degrees
     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.
     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.
     * @param {Number} yRadius [optional] y radius for wedge.
     * @private
     */
    drawWedge: function(x, y, startAngle, arc, radius)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "drawWedge", 266);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 268);
var diameter = radius * 2;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 269);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 271);
arc = 360;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 273);
this._currentX = x;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 274);
this._currentY = y;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 275);
startAngle *= -65535;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 276);
arc *= 65536;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 277);
startAngle = Math.round(startAngle);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 278);
arc = Math.round(arc);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 279);
this.moveTo(x, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 280);
this._addToPath(" ae " + this._round(x) + ", " + this._round(y) + ", " + this._round(radius) + " " + this._round(radius) + ", " +  startAngle + ", " + arc);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 281);
this._trackSize(diameter, diameter); 
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 282);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "lineTo", 292);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 293);
var args = arguments,
            i,
            len,
            path = ' l ';
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 297);
if (typeof point1 === 'string' || typeof point1 === 'number') {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 298);
args = [[point1, point2]];
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 300);
len = args.length;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 301);
for (i = 0; i < len; ++i) {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 302);
path += ' ' + this._round(args[i][0]) + ', ' + this._round(args[i][1]);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 303);
this._trackSize.apply(this, args[i]);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 304);
this._currentX = args[i][0];
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 305);
this._currentY = args[i][1];
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 307);
this._addToPath(path);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 308);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "moveTo", 318);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 319);
this._movePath = " m " + this._round(x) + ", " + this._round(y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 320);
this._trackSize(x, y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 321);
this._currentX = x;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 322);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_closePath", 331);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 333);
var fill = this.get("fill"),
            stroke = this.get("stroke"),
            node = this.node,
            w = this.get("width"),
            h = this.get("height"),
            path = this._path,
            pathEnd = "",
            multiplier = this._coordSpaceMultiplier;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 341);
this._fillChangeHandler();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 342);
this._strokeChangeHandler();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 343);
if(path)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 345);
if(fill && fill.color)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 347);
pathEnd += ' x';
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 349);
if(stroke)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 351);
pathEnd += ' e';
            }
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 354);
if(path)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 356);
node.path = path + pathEnd;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 358);
if(!isNaN(w) && !isNaN(h))
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 360);
node.coordOrigin = this._left + ", " + this._top;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 361);
node.coordSize = (w * multiplier) + ", " + (h * multiplier);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 362);
node.style.position = "absolute";
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 363);
node.style.width =  w + "px";
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 364);
node.style.height =  h + "px";
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 366);
this._path = path;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 367);
this._movePath = null;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 368);
this._updateTransform();
    },

    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function()
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "end", 376);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 378);
this._closePath();
    },

    /**
     * Ends a fill and stroke
     *
     * @method closePath
     */
    closePath: function()
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "closePath", 386);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 388);
this._addToPath(" x e");
    },

    /**
     * Clears the path.
     *
     * @method clear
     */
    clear: function()
    {
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "clear", 396);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 398);
this._right = 0;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 399);
this._bottom = 0;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 400);
this._width = 0;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 401);
this._height = 0;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 402);
this._left = 0;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 403);
this._top = 0;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 404);
this._path = "";
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 405);
this._movePath = null;
    },
    
    /**
     * Returns the points on a curve
     *
     * @method getBezierData
     * @param Array points Array containing the begin, end and control points of a curve.
     * @param Number t The value for incrementing the next set of points.
     * @return Array
     * @private
     */
    getBezierData: function(points, t) {  
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getBezierData", 417);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 418);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 423);
for (i = 0; i < n; ++i){
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 424);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }
        
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 427);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 428);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 429);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 430);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; 
            }
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 433);
return [ tmp[0][0], tmp[0][1] ]; 
    },
  
    /**
     * Calculates the bounding box for a curve
     *
     * @method _setCurveBoundingBox
     * @param Array pts Array containing points for start, end and control points of a curve.
     * @param Number w Width used to calculate the number of points to describe the curve.
     * @param Number h Height used to calculate the number of points to describe the curve.
     * @private
     */
    _setCurveBoundingBox: function(pts, w, h)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_setCurveBoundingBox", 445);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 447);
var i = 0,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            xy;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 455);
for(; i < len; ++i)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 457);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 458);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 459);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 460);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 461);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 463);
left = Math.round(left * 10)/10;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 464);
right = Math.round(right * 10)/10;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 465);
top = Math.round(top * 10)/10;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 466);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 467);
this._trackSize(right, bottom);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 468);
this._trackSize(left, top);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_trackSize", 479);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 480);
if (w > this._right) {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 481);
this._right = w;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 483);
if(w < this._left)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 485);
this._left = w;    
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 487);
if (h < this._top)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 489);
this._top = h;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 491);
if (h > this._bottom) 
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 493);
this._bottom = h;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 495);
this._width = this._right - this._left;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 496);
this._height = this._bottom - this._top;
    },

    _left: 0,

    _right: 0,

    _top: 0,

    _bottom: 0,

    _width: 0,

    _height: 0
};
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 511);
Y.VMLDrawing = VMLDrawing;
/**
 * <a href="http://www.w3.org/TR/NOTE-VML">VML</a> implementation of the <a href="Shape.html">`Shape`</a> class. 
 * `VMLShape` is not intended to be used directly. Instead, use the <a href="Shape.html">`Shape`</a> class. 
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> and <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> 
 * capabilities, the <a href="Shape.html">`Shape`</a> class will point to the `VMLShape` class.
 *
 * @module graphics
 * @class VMLShape
 * @constructor
 * @param {Object} cfg (optional) Attribute configs
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 523);
VMLShape = function() 
{
    _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "VMLShape", 523);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 525);
this._transforms = [];
    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 526);
this.matrix = new Y.Matrix();
    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 527);
this._normalizedMatrix = new Y.Matrix();
    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 528);
VMLShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 531);
VMLShape.NAME = "vmlShape";

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 533);
Y.extend(VMLShape, Y.GraphicBase, Y.mix({
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "init", 550);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 552);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "initializer", 561);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 563);
var host = this,
            graphic = cfg.graphic;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 565);
host.createNode();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 566);
if(graphic)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 568);
this._setGraphic(graphic);
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 570);
this._updateHandler();
	},
 
    /**
     * Set the Graphic instance for the shape.
     *
     * @method _setGraphic
     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a `Graphic` instance, it will be assigned
     * to the `graphic` attribute. Otherwise, a new Graphic instance will be created and rendered into the dom element that the render represents.
     * @private
     */
    _setGraphic: function(render)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_setGraphic", 581);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 583);
var graphic;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 584);
if(render instanceof Y.VMLGraphic)
        {
		    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 586);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 590);
render = Y.one(render);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 591);
graphic = new Y.VMLGraphic({
                render: render
            });
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 594);
graphic._appendShape(this);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 595);
this._graphic = graphic;
        }
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "createNode", 606);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 608);
var node,
			x = this.get("x"),
			y = this.get("y"),
            w = this.get("width"),
            h = this.get("height"),
			id,
			type,
			nodestring,
            visibility = this.get("visible") ? "visible" : "hidden",
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
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 627);
id = this.get("id");
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 628);
type = this._type == "path" ? "shape" : this._type;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 629);
classString = 'vml' + type + ' ' + _getClassName(SHAPE) + " " + _getClassName(this.constructor.NAME); 
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 630);
stroke = this._getStrokeProps();
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 631);
fill = this._getFillProps();
			
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 633);
nodestring  = '<' + type + '  xmlns="urn:schemas-microsft.com:vml" id="' + id + '" class="' + classString + '" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;visibility:' + visibility + '"';

		    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 635);
if(stroke && stroke.weight && stroke.weight > 0)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 637);
endcap = stroke.endcap;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 638);
opacity = parseFloat(stroke.opacity);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 639);
joinstyle = stroke.joinstyle;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 640);
miterlimit = stroke.miterlimit;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 641);
dashstyle = stroke.dashstyle;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 642);
nodestring += ' stroked="t" strokecolor="' + stroke.color + '" strokeWeight="' + stroke.weight + 'px"';
				
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 644);
strokestring = '<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;"';
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 645);
strokestring += ' opacity="' + opacity + '"';
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 646);
if(endcap)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 648);
strokestring += ' endcap="' + endcap + '"';
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 650);
if(joinstyle)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 652);
strokestring += ' joinstyle="' + joinstyle + '"';
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 654);
if(miterlimit)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 656);
strokestring += ' miterlimit="' + miterlimit + '"';
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 658);
if(dashstyle)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 660);
strokestring += ' dashstyle="' + dashstyle + '"';
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 662);
strokestring += '></stroke>';
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 663);
this._strokeNode = DOCUMENT.createElement(strokestring);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 664);
nodestring += ' stroked="t"';
			}
			else
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 668);
nodestring += ' stroked="f"';
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 670);
if(fill)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 672);
if(fill.node)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 674);
fillstring = fill.node;
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 675);
this._fillNode = DOCUMENT.createElement(fillstring);
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 677);
if(fill.color)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 679);
nodestring += ' fillcolor="' + fill.color + '"';
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 681);
nodestring += ' filled="' + fill.filled + '"';
			}
			
			
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 685);
nodestring += '>';
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 686);
nodestring += '</' + type + '>';
			
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 688);
node = DOCUMENT.createElement(nodestring);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 689);
if(this._strokeNode)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 691);
node.appendChild(this._strokeNode);
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 693);
if(this._fillNode)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 695);
node.appendChild(this._fillNode);
			}

            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 698);
this.node = node;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 699);
this._strokeFlag = false;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 700);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "addClass", 709);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 711);
var node = this.node;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 712);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "removeClass", 721);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 723);
var node = this.node;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 724);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getXY", 733);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 735);
var graphic = this._graphic,
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 739);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setXY", 749);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 751);
var graphic = this._graphic,
			parentXY = graphic.getXY();
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 753);
this.set("x", xy[0] - parentXY[0]);
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 754);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "contains", 764);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 766);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "compareTo", 776);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 777);
var node = this.node;

		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 779);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "test", 789);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 791);
return Y_SELECTOR.test(this.node, selector);
	},

	/**
     * Calculates and returns properties for setting an initial stroke.
     *
     * @method _getStrokeProps
     * @return Object
     *
	 * @private
	 */
	 _getStrokeProps: function()
	 {
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getStrokeProps", 802);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 804);
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
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 814);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 816);
props = {};
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 817);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 818);
linejoin = stroke.linejoin || "round";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 819);
if(linecap != "round" && linecap != "square")
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 821);
linecap = "flat";
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 823);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 824);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 825);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 826);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 827);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 828);
props.stroked = true;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 829);
props.color = stroke.color;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 830);
props.weight = stroke.weight;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 831);
props.endcap = linecap;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 832);
props.opacity = stroke.opacity;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 833);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 835);
dash = [];
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 836);
len = dashstyle.length;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 837);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 839);
val = dashstyle[i];
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 840);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 843);
if(linejoin == "round" || linejoin == "bevel")
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 845);
props.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 849);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 850);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 852);
props.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 853);
props.joinstyle = "miter";
				}
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 856);
props.dashstyle = dash;
		}
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 858);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_strokeChangeHandler", 867);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 869);
if(!this._strokeFlag)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 871);
return;
        }
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 873);
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
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 883);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 885);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 886);
linejoin = stroke.linejoin || "round";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 887);
if(linecap != "round" && linecap != "square")
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 889);
linecap = "flat";
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 891);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 892);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 893);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 894);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 895);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 896);
node.stroked = true;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 897);
node.strokeColor = stroke.color;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 898);
node.strokeWeight = stroke.weight + "px";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 899);
if(!this._strokeNode)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 901);
this._strokeNode = this._createGraphicNode("stroke");
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 902);
node.appendChild(this._strokeNode);
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 904);
this._strokeNode.endcap = linecap;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 905);
this._strokeNode.opacity = stroke.opacity;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 906);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 908);
dash = [];
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 909);
len = dashstyle.length;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 910);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 912);
val = dashstyle[i];
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 913);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 916);
if(linejoin == "round" || linejoin == "bevel")
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 918);
this._strokeNode.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 922);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 923);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 925);
this._strokeNode.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 926);
this._strokeNode.joinstyle = "miter";
				}
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 929);
this._strokeNode.dashstyle = dash;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 930);
this._strokeNode.on = true;
		}
		else
		{
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 934);
if(this._strokeNode)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 936);
this._strokeNode.on = false;
            }
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 938);
node.stroked = false;
		}
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 940);
this._strokeFlag = false;
	},

	/**
     * Calculates and returns properties for setting an initial fill.
     *
     * @method _getFillProps
     * @return Object
     *
	 * @private
	 */
	_getFillProps: function()
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getFillProps", 951);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 953);
var fill = this.get("fill"),
			fillOpacity,
			props,
			gradient,
			i,
			fillstring,
			filled = false;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 960);
if(fill)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 962);
props = {};
			
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 964);
if(fill.type == "radial" || fill.type == "linear")
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 966);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 967);
fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 968);
filled = true;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 969);
gradient = this._getGradientFill(fill);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 970);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="' + fillOpacity + '"';
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 971);
for(i in gradient)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 973);
if(gradient.hasOwnProperty(i))
					{
						_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 975);
fillstring += ' ' + i + '="' + gradient[i] + '"';
					}
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 978);
fillstring += ' />';
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 979);
props.node = fillstring;
			}
			else {_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 981);
if(fill.color)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 983);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 984);
filled = true;
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 985);
props.color = fill.color;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 986);
if(IS_NUM(fillOpacity))
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 988);
fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 989);
props.opacity = fillOpacity;    
				    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 990);
if(fillOpacity < 1)
                    {
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 992);
props.node = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
				    }
                }
			}}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 996);
props.filled = filled;
		}
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 998);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_fillChangeHandler", 1007);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1009);
if(!this._fillFlag)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1011);
return;
        }
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1013);
var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			fillstring,
			filled = false,
            i,
            gradient;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1020);
if(fill)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1022);
if(fill.type == "radial" || fill.type == "linear")
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1024);
filled = true;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1025);
gradient = this._getGradientFill(fill);
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1026);
if(this._fillNode)
                {
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1028);
for(i in gradient)
                    {
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1030);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1032);
if(i == "colors")
                            {
                                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1034);
this._fillNode.colors.value = gradient[i];
                            }
                            else
                            {
                                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1038);
this._fillNode[i] = gradient[i];
                            }
                        }
                    }
                }
                else
                {
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1045);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"';
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1046);
for(i in gradient)
                    {
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1048);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1050);
fillstring += ' ' + i + '="' + gradient[i] + '"';
                        }
                    }
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1053);
fillstring += ' />';
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1054);
this._fillNode = DOCUMENT.createElement(fillstring);
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1055);
node.appendChild(this._fillNode);
                }
			}
			else {_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1058);
if(fill.color)
			{
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1060);
node.fillcolor = fill.color;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1061);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1062);
filled = true;
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1063);
if(IS_NUM(fillOpacity) && fillOpacity < 1)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1065);
fill.opacity = fillOpacity;
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1066);
if(this._fillNode)
					{
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1068);
if(this._fillNode.getAttribute("type") != "solid")
                        {
                            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1070);
this._fillNode.type = "solid";
                        }
						_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1072);
this._fillNode.opacity = fillOpacity;
					}
					else
					{     
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1076);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1077);
this._fillNode = DOCUMENT.createElement(fillstring);
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1078);
node.appendChild(this._fillNode);
					}
				}
				else {_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1081);
if(this._fillNode)
                {   
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1083);
this._fillNode.opacity = 1;
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1084);
this._fillNode.type = "solid";
				}}
			}}
		}
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1088);
node.filled = filled;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1089);
this._fillFlag = false;
	},

	//not used. remove next release.
    _updateFillNode: function(node)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_updateFillNode", 1093);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1095);
if(!this._fillNode)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1097);
this._fillNode = this._createGraphicNode("fill");
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1098);
node.appendChild(this._fillNode);
		}
	},

    /**
     * Calculates and returns an object containing gradient properties for a fill node. 
     *
     * @method _getGradientFill
     * @param {Object} fill Object containing fill properties.
     * @return Object
     * @private
     */
	_getGradientFill: function(fill)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getGradientFill", 1110);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1112);
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
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1134);
if(type === "linear")
		{
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1136);
if(rotation <= 270)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1138);
rotation = Math.abs(rotation - 270);
            }
			else {_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1140);
if(rotation < 360)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1142);
rotation = 270 + (360 - rotation);
            }
            else
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1146);
rotation = 270;
            }}
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1148);
gradientProps.type = "gradient";//"gradientunscaled";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1149);
gradientProps.angle = rotation;
		}
		else {_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1151);
if(type === "radial")
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1153);
gradientBoxWidth = w * (r * 2);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1154);
gradientBoxHeight = h * (r * 2);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1155);
fx = r * 2 * (fx - 0.5);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1156);
fy = r * 2 * (fy - 0.5);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1157);
fx += cx;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1158);
fy += cy;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1159);
gradientProps.focussize = (gradientBoxWidth/w)/10 + "% " + (gradientBoxHeight/h)/10 + "%";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1160);
gradientProps.alignshape = false;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1161);
gradientProps.type = "gradientradial";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1162);
gradientProps.focus = "100%";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1163);
gradientProps.focusposition = Math.round(fx * 100) + "% " + Math.round(fy * 100) + "%";
		}}
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1165);
for(;i < len; ++i) {
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1166);
stop = stops[i];
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1167);
color = stop.color;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1168);
opacity = stop.opacity;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1169);
opacity = isNumber(opacity) ? opacity : 1;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1170);
pct = stop.offset || i/(len-1);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1171);
pct *= (r * 2);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1172);
pct = Math.round(100 * pct) + "%";
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1173);
oi = i > 0 ? i + 1 : "";
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1174);
gradientProps["opacity" + oi] = opacity + "";
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1175);
colorstring += ", " + pct + " " + color;
		}
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1177);
if(parseFloat(pct) < 100)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1179);
colorstring += ", 100% " + color;
		}
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1181);
gradientProps.colors = colorstring.substr(2);
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1182);
return gradientProps;
	},

    /**
     * Adds a transform to the shape.
     *
     * @method _addTransform
     * @param {String} type The transform being applied.
     * @param {Array} args The arguments for the transform.
	 * @private
	 */
	_addTransform: function(type, args)
	{
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_addTransform", 1193);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1195);
args = Y.Array(args);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1196);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1197);
args.unshift(type);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1198);
this._transforms.push(args);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1199);
if(this.initialized)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1201);
this._updateTransform();
        }
	},
	
	/**
     * Applies all transforms.
     *
     * @method _updateTransform
	 * @private
	 */
	_updateTransform: function()
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_updateTransform", 1211);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1213);
var node = this.node,
            key,
			transform,
			transformOrigin,
            x = this.get("x"),
            y = this.get("y"),
            tx,
            ty,
            matrix = this.matrix,
            normalizedMatrix = this._normalizedMatrix,
            isPathShape = this instanceof Y.VMLPath,
            i = 0,
            len = this._transforms.length;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1226);
if(this._transforms && this._transforms.length > 0)
		{
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1228);
transformOrigin = this.get("transformOrigin");
       
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1230);
if(isPathShape)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1232);
normalizedMatrix.translate(this._left, this._top);
            }
            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.
            //subtract 0.5 from values
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1236);
tx = transformOrigin[0] - 0.5;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1237);
ty = transformOrigin[1] - 0.5;
            
            //ensure the values are within the appropriate range to avoid errors
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1240);
tx = Math.max(-0.5, Math.min(0.5, tx));
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1241);
ty = Math.max(-0.5, Math.min(0.5, ty));
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1242);
for(; i < len; ++i)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1244);
key = this._transforms[i].shift();
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1245);
if(key)
                {
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1247);
normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]); 
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1248);
matrix[key].apply(matrix, this._transforms[i]); 
                }
			}
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1251);
if(isPathShape)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1253);
normalizedMatrix.translate(-this._left, -this._top);
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1255);
transform = normalizedMatrix.a + "," + 
                        normalizedMatrix.c + "," + 
                        normalizedMatrix.b + "," + 
                        normalizedMatrix.d + "," + 
                        0 + "," +
                        0;
		}
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1262);
this._graphic.addToRedrawQueue(this);    
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1263);
if(transform)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1265);
if(!this._skew)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1267);
this._skew = DOCUMENT.createElement( '<skew class="vmlskew" xmlns="urn:schemas-microsft.com:vml" on="false" style="behavior:url(#default#VML);display:inline-block;" />');
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1268);
this.node.appendChild(this._skew); 
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1270);
this._skew.matrix = transform;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1271);
this._skew.on = true;
            //use offset for translate
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1273);
this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + "px, " + this._getSkewOffsetValue(normalizedMatrix.dy) + "px";
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1274);
this._skew.origin = tx + ", " + ty;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1276);
if(this._type != "path")
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1278);
this._transforms = [];
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1280);
node.style.left = x + "px";
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1281);
node.style.top =  y + "px";
    },
    
    /**
     * Normalizes the skew offset values between -32767 and 32767.
     *
     * @method _getSkewOffsetValue
     * @param {Number} val The value to normalize
     * @return Number
     * @private
     */
    _getSkewOffsetValue: function(val)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getSkewOffsetValue", 1292);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1294);
var sign = Y.MatrixUtil.sign(val),
            absVal = Math.abs(val);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1296);
val = Math.min(absVal, 32767) * sign;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1297);
return val;
    },
	
	/**
	 * Storage for translateX
	 *
     * @property _translateX
     * @type Number
	 * @private
	 */
	_translateX: 0,

	/**
	 * Storage for translateY
	 *
     * @property _translateY
     * @type Number
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
	 * Specifies a 2d translation.
	 *
	 * @method translate
	 * @param {Number} x The value to transate on the x-axis.
	 * @param {Number} y The value to translate on the y-axis.
	 */
	translate: function(x, y)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "translate", 1334);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1336);
this._translateX += x;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1337);
this._translateY += y;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1338);
this._addTransform("translate", arguments);
	},

	/**
	 * Translates the shape along the x-axis. When translating x and y coordinates,
	 * use the `translate` method.
	 *
	 * @method translateX
	 * @param {Number} x The value to translate.
	 */
	translateX: function(x)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "translateX", 1348);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1350);
this._translateX += x;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1351);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "translateY", 1361);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1363);
this._translateY += y;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1364);
this._addTransform("translateY", arguments);
    },

    /**
     * Skews the shape around the x-axis and y-axis.
     *
     * @method skew
     * @param {Number} x The value to skew on the x-axis.
     * @param {Number} y The value to skew on the y-axis.
     */
    skew: function(x, y)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "skew", 1374);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1376);
this._addTransform("skew", arguments);
    },

	/**
	 * Skews the shape around the x-axis.
	 *
	 * @method skewX
	 * @param {Number} x x-coordinate
	 */
	 skewX: function(x)
	 {
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "skewX", 1385);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1387);
this._addTransform("skewX", arguments);
	 },

	/**
	 * Skews the shape around the y-axis.
	 *
	 * @method skewY
	 * @param {Number} y y-coordinate
	 */
	 skewY: function(y)
	 {
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "skewY", 1396);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1398);
this._addTransform("skewY", arguments);
	 },

	/**
	 * Rotates the shape clockwise around it transformOrigin.
	 *
	 * @method rotate
	 * @param {Number} deg The degree of the rotation.
	 */
	 rotate: function(deg)
	 {
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "rotate", 1407);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1409);
this._addTransform("rotate", arguments);
	 },

	/**
	 * Specifies a 2d scaling operation.
	 *
	 * @method scale
	 * @param {Number} val
	 */
	scale: function(x, y)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "scale", 1418);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1420);
this._addTransform("scale", arguments);
	},

	/**
     * Overrides default `on` method. Checks to see if its a dom interaction event. If so, 
     * return an event attached to the `node` element. If not, return the normal functionality.
     *
     * @method on
     * @param {String} type event type
     * @param {Object} callback function
	 * @private
	 */
	on: function(type, fn)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "on", 1432);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1434);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1436);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1438);
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
     * Updates `Shape` based on attribute changes.
     *
     * @method _updateHandler
	 * @private
	 */
	_updateHandler: function(e)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_updateHandler", 1457);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1459);
var host = this,
            node = host.node;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1461);
host._fillChangeHandler();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1462);
host._strokeChangeHandler();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1463);
node.style.width = this.get("width") + "px";
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1464);
node.style.height = this.get("height") + "px"; 
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1465);
this._draw();
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1466);
host._updateTransform();
	},

	/**
	 * Creates a graphic node
	 *
	 * @method _createGraphicNode
	 * @param {String} type node type to create
	 * @return HTMLElement
	 * @private
	 */
	_createGraphicNode: function(type)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_createGraphicNode", 1477);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1479);
type = type || this._type;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1480);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getDefaultFill", 1490);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1491);
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
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getDefaultStroke", 1508);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1510);
return {
			weight: 1,
			dashstyle: "none",
			color: "#000",
			opacity: 1.0
		};
	},

    /**
     * Sets the value of an attribute.
     *
     * @method set
     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can 
     * be passed in to set multiple attributes at once.
     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as 
     * the name param.
     */
	set: function() 
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "set", 1527);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1529);
var host = this;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1530);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1531);
if(host.initialized)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1533);
host._updateHandler();
		}
	},

	/**
	 * Returns the bounds for a shape.
	 *
     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.
     * The calculated bounding box is used by the graphic instance to calculate its viewBox. 
     *
	 * @method getBounds
     * @param {Matrix} [optional] cfg Reference to matrix instance
	 * @return Object
	 */
	getBounds: function(cfg)
	{
		_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getBounds", 1547);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1549);
var stroke = this.get("stroke"),
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y"),
            wt = 0;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1555);
if(stroke && stroke.weight)
		{
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1557);
wt = stroke.weight;
		}
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1559);
w = (x + w + wt) - (x - wt); 
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1560);
h = (y + h + wt) - (y - wt);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1561);
x -= wt;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1562);
y -= wt;
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1563);
return this._normalizedMatrix.getContentRect(w, h, x, y);
	},
	
    /**
     *  Destroys shape
     *
     *  @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "destroy", 1571);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1573);
var graphic = this.get("graphic");
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1574);
if(graphic)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1576);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1580);
this._destroy();
        }
    },

    /**
     *  Implementation for shape destruction
     *
     *  @method destroy
     *  @protected
     */
    _destroy: function()
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_destroy", 1590);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1592);
if(this.node)
        {   
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1594);
if(this._fillNode)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1596);
this.node.removeChild(this._fillNode);
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1597);
this._fillNode = null;
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1599);
if(this._strokeNode)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1601);
this.node.removeChild(this._strokeNode);
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1602);
this._strokeNode = null;
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1604);
Y.one(this.node).remove(true);
        }
    }
}, Y.VMLDrawing.prototype));

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1609);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "valueFn", 1618);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1620);
return [0.5, 0.5];
		}
	},
	
    /**
     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:
     *     
     *    <dl>
     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>
     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>
     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>
     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>
     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>
     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>
     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>
     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>
     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>      
     *    </dl>
     * </p>
     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains corresponding methods for each transform
     * that will apply the transform to the current matrix. The below code illustrates how you might use the `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>
            var myRect = new Y.Rect({
                type:"rect",
                width: 50,
                height: 40,
                transform: "rotate(45)"
            };
     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>
    
        myRect.set("transform", "translate(40, 50) rotate(45)");
	 * @config transform
     * @type String  
	 */
	transform: {
		setter: function(val)
		{
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 1654);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1656);
var i = 0,
                len,
                transform;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1659);
this.matrix.init();	
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1660);
this._normalizedMatrix.init();	
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1661);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1662);
len = this._transforms.length;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1663);
for(;i < len; ++i)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1665);
transform = this._transforms[i];
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1667);
this._transform = val;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1668);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 1671);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1673);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "valueFn", 1704);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1706);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 1709);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1711);
var node = this.node;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1712);
if(node)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1714);
node.setAttribute("id", val);
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1716);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 1745);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1746);
var node = this.node,
				visibility = val ? "visible" : "hidden";
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1748);
if(node)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1750);
node.style.visibility = visibility;
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1752);
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
     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:
     *  <dl>
     *      <dt>stops</dt><dd>An array of objects containing the following properties:
     *          <dl>
     *              <dt>color</dt><dd>The color of the stop.</dd>
     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1. Note: No effect for IE 6 - 8</dd>
     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd> 
     *          </dl>
     *      </dd>
     *      <p>Linear gradients also have the following property:</p>
     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>
     *      <p>Radial gradients have the following additional properties:</p>
     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>
     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>
     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>
     *  </dl>
     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>
     *  <dl>
     *      <dt>cx</dt><dd>
     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>
     *      </dd>
     *      <dt>cy</dt><dd>
     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>
     *      </dd>
     *  </dl>
     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p> 
	 *
	 * @config fill
	 * @type Object 
	 */
	fill: {
		valueFn: "_getDefaultFill",
		
		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 1802);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1804);
var i,
				fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1808);
if(val)
			{
				//ensure, fill type is solid if color is explicitly passed.
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1811);
if(val.hasOwnProperty("color"))
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1813);
val.type = "solid";
				}
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1815);
for(i in val)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1817);
if(val.hasOwnProperty(i))
					{   
						_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1819);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1823);
fill = tmpl;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1824);
if(fill && fill.color)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1826);
if(fill.color === undefined || fill.color == "none")
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1828);
fill.color = null;
				}
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1831);
this._fillFlag = true;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1832);
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
     *  length of the dash. The second index indicates the length of gap.
     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:
     *          <dl>
     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>
     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>
     *              <dt>round</dt><dd>Specifies a round linecap.</dd>
     *          </dl>
     *      </dd>
     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:
     *          <dl>
     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>
     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>
     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin of miter, you simply specify the limit as opposed to having
     *  separate miter and miter limit values.</dd>
     *          </dl>
     *      </dd>
     *  </dl>
	 *
	 * @config stroke
	 * @type Object
	 */
	stroke: {
		valueFn: "_getDefaultStroke",
		
		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 1867);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1869);
var i,
				stroke,
                wt,
				tmpl = this.get("stroke") || this._getDefaultStroke();
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1873);
if(val)
			{
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1875);
if(val.hasOwnProperty("weight"))
                {
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1877);
wt = parseInt(val.weight, 10);
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1878);
if(!isNaN(wt))
                    {
                        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1880);
val.weight = wt;
                    }
                }
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1883);
for(i in val)
				{
					_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1885);
if(val.hasOwnProperty(i))
					{   
						_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1887);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1891);
stroke = tmpl;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1892);
this._strokeFlag = true;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1893);
return stroke;
		}
	},
	
	//Not used. Remove in future.
    autoSize: {
		value: false
	},

	// Only implemented in SVG
	// Determines whether the instance will receive mouse events.
	// 
	// @config pointerEvents
	// @type string
	//
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 1922);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1924);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 1937);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1939);
return this._graphic;
		}
	}
};
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1943);
Y.VMLShape = VMLShape;
/**
 * <a href="http://www.w3.org/TR/NOTE-VML">VML</a> implementation of the <a href="Path.html">`Path`</a> class. 
 * `VMLPath` is not intended to be used directly. Instead, use the <a href="Path.html">`Path`</a> class. 
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> and <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> 
 * capabilities, the <a href="Path.html">`Path`</a> class will point to the `VMLPath` class.
 *
 * @module graphics
 * @class VMLPath
 * @extends VMLShape
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1954);
VMLPath = function()
{
	_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "VMLPath", 1954);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1956);
VMLPath.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1959);
VMLPath.NAME = "vmlPath";
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1960);
Y.extend(VMLPath, Y.VMLShape);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1961);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 1969);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1971);
var val = Math.max(this._right - this._left, 0);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1972);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 1983);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 1985);
return Math.max(this._bottom - this._top, 0);
		}
	},
	
	/**
	 * Indicates the path used for the node.
	 *
	 * @config path
	 * @type String
     * @readOnly
	 */
	path: {
		readOnly: true,

		getter: function()
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 1999);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2001);
return this._path;
		}
	}
});
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2005);
Y.VMLPath = VMLPath;
/**
 * <a href="http://www.w3.org/TR/NOTE-VML">VML</a> implementation of the <a href="Rect.html">`Rect`</a> class. 
 * `VMLRect` is not intended to be used directly. Instead, use the <a href="Rect.html">`Rect`</a> class. 
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> and <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> 
 * capabilities, the <a href="Rect.html">`Rect`</a> class will point to the `VMLRect` class.
 *
 * @module graphics
 * @class VMLRect
 * @constructor
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2016);
VMLRect = function()
{
	_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "VMLRect", 2016);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2018);
VMLRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2020);
VMLRect.NAME = "vmlRect"; 
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2021);
Y.extend(VMLRect, Y.VMLShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "rect"
});
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2031);
VMLRect.ATTRS = Y.VMLShape.ATTRS;
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2032);
Y.VMLRect = VMLRect;
/**
 * <a href="http://www.w3.org/TR/NOTE-VML">VML</a> implementation of the <a href="Ellipse.html">`Ellipse`</a> class. 
 * `VMLEllipse` is not intended to be used directly. Instead, use the <a href="Ellipse.html">`Ellipse`</a> class. 
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> and <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> 
 * capabilities, the <a href="Ellipse.html">`Ellipse`</a> class will point to the `VMLEllipse` class.
 *
 * @module graphics
 * @class VMLEllipse
 * @constructor
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2043);
VMLEllipse = function()
{
	_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "VMLEllipse", 2043);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2045);
VMLEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2048);
VMLEllipse.NAME = "vmlEllipse";

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2050);
Y.extend(VMLEllipse, Y.VMLShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "oval"
});
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2060);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2070);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2072);
var val = this.get("width");
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2073);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2074);
return val;
		},
		
		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2077);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2079);
var w = val * 2; 
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2080);
this.set("width", w);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2081);
return val;
		}
	},

	/**
	 * Vertical radius for the ellipse. 
	 *
	 * @config yRadius
	 * @type Number
	 * @readOnly
	 */
	yRadius: {
		lazyAdd: false,
		
		getter: function()
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2095);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2097);
var val = this.get("height");
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2098);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2099);
return val;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2102);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2104);
var h = val * 2;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2105);
this.set("height", h);
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2106);
return val;
		}
	}
});
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2110);
Y.VMLEllipse = VMLEllipse;
/**
 * <a href="http://www.w3.org/TR/NOTE-VML">VML</a> implementation of the <a href="Circle.html">`Circle`</a> class. 
 * `VMLCircle` is not intended to be used directly. Instead, use the <a href="Circle.html">`Circle`</a> class. 
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> and <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> 
 * capabilities, the <a href="Circle.html">`Circle`</a> class will point to the `VMLCircle` class.
 *
 * @module graphics
 * @class VMLCircle
 * @constructor
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2121);
VMLCircle = function(cfg)
{
	_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "VMLCircle", 2121);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2123);
VMLCircle.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2126);
VMLCircle.NAME = "vmlCircle";

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2128);
Y.extend(VMLCircle, VMLShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "oval"
});

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2139);
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
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
	width: {
        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2159);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2161);
this.set("radius", val/2);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2162);
return val;
        },

		getter: function()
		{   
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2165);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2167);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2169);
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
        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2180);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2182);
this.set("radius", val/2);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2183);
return val;
        },

		getter: function()
		{   
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2186);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2188);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2190);
return val;
		}
	}
});
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2194);
Y.VMLCircle = VMLCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class VMLPieSlice
 * @constructor
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2202);
VMLPieSlice = function()
{
	_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "VMLPieSlice", 2202);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2204);
VMLPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2206);
VMLPieSlice.NAME = "vmlPieSlice";
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2207);
Y.extend(VMLPieSlice, Y.VMLShape, Y.mix({
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @type String
     * @private
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_draw", 2223);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2225);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2230);
this.clear();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2231);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2232);
this.end();
	}
 }, Y.VMLDrawing.prototype));
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2235);
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
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2273);
Y.VMLPieSlice = VMLPieSlice;
/**
 * <a href="http://www.w3.org/TR/NOTE-VML">VML</a> implementation of the <a href="Graphic.html">`Graphic`</a> class. 
 * `VMLGraphic` is not intended to be used directly. Instead, use the <a href="Graphic.html">`Graphic`</a> class. 
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> and <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> 
 * capabilities, the <a href="Graphic.html">`Graphic`</a> class will point to the `VMLGraphic` class.
 *
 * @module graphics
 * @class VMLGraphic
 * @constructor
 */
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2284);
VMLGraphic = function() {
    _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "VMLGraphic", 2284);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2285);
VMLGraphic.superclass.constructor.apply(this, arguments);    
};

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2288);
VMLGraphic.NAME = "vmlGraphic";

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2290);
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
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "valueFn", 2306);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2308);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2311);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2313);
var node = this._node;
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2314);
if(node)
			{
				_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2316);
node.setAttribute("id", val);
			}
			_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2318);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2332);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2334);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2347);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2349);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2362);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2364);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2375);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2377);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2379);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2381);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2392);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2394);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2396);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2398);
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
     * The contentBounds will resize to greater values but not values. (for performance)
     * When resizing the contentBounds down is desirable, set the resizeDown value to true.
     *
     * @config resizeDown 
     * @type Boolean
     */
    resizeDown: {
        getter: function()
        {
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2422);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2424);
return this._resizeDown;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2427);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2429);
this._resizeDown = val;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2430);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2432);
this._redraw();
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2434);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2445);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2447);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2450);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2452);
this._x = val;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2453);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2455);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2457);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getter", 2468);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2470);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2473);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2475);
this._y = val;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2476);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2478);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2480);
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
            _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setter", 2500);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2502);
this._toggleVisible(val);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2503);
return val;
        }
    }
};

_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2508);
Y.extend(VMLGraphic, Y.GraphicBase, {
    /**
     * Storage for `x` attribute.
     *
     * @property _x
     * @type Number
     * @private
     */
    _x: 0,

    /**
     * Storage for `y` attribute.
     *
     * @property _y
     * @type Number
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getXY", 2533);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2535);
var node = this.parentNode,
            x = this.get("x"),
            y = this.get("y"),
            xy;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2539);
if(node)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2541);
xy = Y.one(node).getXY();
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2542);
xy[0] += x;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2543);
xy[1] += y;
        }
        else
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2547);
xy = Y.DOM._getOffset(this._node);
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2549);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "initializer", 2565);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2566);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden";
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2568);
this._shapes = {};
		_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2569);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2575);
this._node = this._createGraphic();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2576);
this._node.style.visibility = visibility;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2577);
this._node.setAttribute("id", this.get("id"));
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2578);
if(render)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2580);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "render", 2590);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2591);
var parentNode = Y.one(render),
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2594);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2595);
parentNode.appendChild(this._node);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2596);
this.setSize(w, h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2597);
this.parentNode = parentNode;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2598);
this.set("width", w);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2599);
this.set("height", h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2600);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "destroy", 2608);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2610);
this.clear();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2611);
Y.one(this._node).remove(true);
    },

    /**
     * Generates a shape instance by type.
     *
     * @method addShape
     * @param {Object} cfg attributes for the shape
     * @return Shape
     */
    addShape: function(cfg)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "addShape", 2621);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2623);
cfg.graphic = this;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2624);
if(!this.get("visible"))
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2626);
cfg.visible = false;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2628);
var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2630);
this._appendShape(shape);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2631);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_appendShape", 2641);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2643);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2645);
if(this.get("autoDraw")) 
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2647);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2651);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "removeShape", 2661);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2663);
if(!(shape instanceof VMLShape))
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2665);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2667);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2670);
if(shape && (shape instanceof VMLShape))
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2672);
shape._destroy();
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2673);
this._shapes[shape.get("id")] = null;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2674);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2676);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2678);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "removeAllShapes", 2687);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2689);
var shapes = this._shapes,
            i;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2691);
for(i in shapes)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2693);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2695);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2698);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_removeChildren", 2708);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2710);
if(node.hasChildNodes())
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2712);
var child;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2713);
while(node.firstChild)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2715);
child = node.firstChild;
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2716);
this._removeChildren(child);
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2717);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "clear", 2727);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2728);
this.removeAllShapes();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2729);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_toggleVisible", 2739);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2741);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2744);
if(shapes)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2746);
for(i in shapes)
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2748);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2750);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2754);
if(this._node)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2756);
this._node.style.visibility = visibility;
        }
    },

    /**
     * Sets the size of the graphics object.
     * 
     * @method setSize
     * @param w {Number} width to set for the instance.
     * @param h {Number} height to set for the instance.
     */
    setSize: function(w, h) {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setSize", 2767);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2768);
w = Math.round(w);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2769);
h = Math.round(h);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2770);
this._node.style.width = w + 'px';
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2771);
this._node.style.height = h + 'px';
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2772);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "setPosition", 2782);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2784);
x = Math.round(x);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2785);
y = Math.round(y);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2786);
this._node.style.left = x + "px";
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2787);
this._node.style.top = y + "px";
    },

    /**
     * Creates a group element
     *
     * @method _createGraphic
     * @private
     */
    _createGraphic: function() {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_createGraphic", 2796);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2797);
var group = DOCUMENT.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);display:block;position:absolute;top:0px;left:0px;zoom:1;" />');
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2798);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_createGraphicNode", 2810);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2812);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "getShapeById", 2823);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2825);
return this._shapes[id];
    },

    /**
     * Returns a shape class. Used by `addShape`. 
     *
     * @method _getShapeClass
     * @param {Shape | String} val Indicates which shape class. 
     * @return Function 
     * @private
     */
    _getShapeClass: function(val)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getShapeClass", 2836);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2838);
var shape = this._shapeClass[val];
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2839);
if(shape)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2841);
return shape;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2843);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "batch", 2867);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2869);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2870);
this.set("autoDraw", false);
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2871);
method.apply();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2872);
this._redraw();
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2873);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getDocFrag", 2883);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2885);
if(!this._frag)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2887);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2889);
return this._frag;
    },

    /**
     * Adds a shape to the redraw queue and calculates the contentBounds. 
     *
     * @method addToRedrawQueue
     * @param shape {VMLShape}
     * @protected
     */
    addToRedrawQueue: function(shape)
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "addToRedrawQueue", 2899);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2901);
var shapeBox,
            box;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2903);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2904);
if(!this._resizeDown)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2906);
shapeBox = shape.getBounds();
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2907);
box = this._contentBounds;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2908);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2909);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2910);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2911);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2912);
box.width = box.right - box.left;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2913);
box.height = box.bottom - box.top;
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2914);
this._contentBounds = box;
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2916);
if(this.get("autoDraw")) 
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2918);
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
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_redraw", 2928);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2930);
var box = this._resizeDown ? this._getUpdatedContentBounds() : this._contentBounds;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2931);
if(this.get("autoSize"))
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2933);
this.setSize(box.right, box.bottom);
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2935);
if(this._frag)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2937);
this._node.appendChild(this._frag);
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2938);
this._frag = null;
        }
    },
    
    /**
     * Recalculates and returns the `contentBounds` for the `Graphic` instance.
     *
     * @method _getUpdatedContentBounds
     * @return {Object} 
     * @private
     */
    _getUpdatedContentBounds: function()
    {
        _yuitest_coverfunc("/build/graphics-vml/graphics-vml.js", "_getUpdatedContentBounds", 2949);
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2951);
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
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2961);
for(i in queue)
        {
            _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2963);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2965);
shape = queue[i];
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2966);
bounds = shape.getBounds();
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2967);
box.left = Math.min(box.left, bounds.left);
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2968);
box.top = Math.min(box.top, bounds.top);
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2969);
box.right = Math.max(box.right, bounds.right);
                _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2970);
box.bottom = Math.max(box.bottom, bounds.bottom);
            }
        }
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2973);
box.width = box.right - box.left;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2974);
box.height = box.bottom - box.top;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2975);
this._contentBounds = box;
        _yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2976);
return box;
    }
});
_yuitest_coverline("/build/graphics-vml/graphics-vml.js", 2979);
Y.VMLGraphic = VMLGraphic;



}, '@VERSION@' ,{requires:['graphics'], skinnable:false});
