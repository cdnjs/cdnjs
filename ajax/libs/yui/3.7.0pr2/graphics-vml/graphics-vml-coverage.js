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
_yuitest_coverage["build/graphics-vml/graphics-vml.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/graphics-vml/graphics-vml.js",
    code: []
};
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].code=["YUI.add('graphics-vml', function (Y, NAME) {","","var IMPLEMENTATION = \"vml\",","    SHAPE = \"shape\",","	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,","    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\\.][0-9]*/g,","    Y_LANG = Y.Lang,","    IS_NUM = Y_LANG.isNumber,","    IS_ARRAY = Y_LANG.isArray,","    IS_STRING = Y_LANG.isString,","    Y_DOM = Y.DOM,","    Y_SELECTOR = Y.Selector,","    DOCUMENT = Y.config.doc,","    AttributeLite = Y.AttributeLite,","	VMLShape,","	VMLCircle,","	VMLPath,","	VMLRect,","	VMLEllipse,","	VMLGraphic,","    VMLPieSlice,","    _getClassName = Y.ClassNameManager.getClassName;","","function VMLDrawing() {}","","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class. "," * `VMLDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Drawing.html\">`Drawing`</a> class will point to the `VMLDrawing` class."," *"," * @module graphics"," * @class VMLDrawing"," * @constructor"," */","VMLDrawing.prototype = {","    /**","     * Maps path to methods","     *","     * @property _pathSymbolToMethod","     * @type Object","     * @private","     */","    _pathSymbolToMethod: {","        M: \"moveTo\",","        m: \"relativeMoveTo\",","        L: \"lineTo\",","        l: \"relativeLineTo\",","        C: \"curveTo\",","        c: \"relativeCurveTo\",","        Q: \"quadraticCurveTo\",","        q: \"relativeQuadraticCurveTo\",","        z: \"closePath\",","        Z: \"closePath\"","    },","","    /**","     * Value for rounding up to coordsize","     *","     * @property _coordSpaceMultiplier","     * @type Number","     * @private","     */","    _coordSpaceMultiplier: 100,","","    /**","     * Rounds dimensions and position values based on the coordinate space.","     *","     * @method _round","     * @param {Number} The value for rounding","     * @return Number","     * @private","     */","    _round:function(val)","    {","        return Math.round(val * this._coordSpaceMultiplier);","    },","","    /**","     * Concatanates the path.","     *","     * @method _addToPath","     * @param {String} val The value to add to the path string.","     * @private","     */","    _addToPath: function(val)","    {","        this._path = this._path || \"\";","        if(this._movePath)","        {","            this._path += this._movePath;","            this._movePath = null;","        }","        this._path += val;","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","    ","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    curveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Draws a bezier curve.","     *","     * @method relativeCurveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    relativeCurveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), true]);","    },","    ","    /**","     * Implements curveTo methods.","     *","     * @method _curveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _curveTo: function(args, relative) {","        var w,","            h,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            pts,","            right,","            left,","            bottom,","            top,","            i = 0,","            len,","            path,","            command = relative ? \" v \" : \" c \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        len = args.length - 5;","        path = command; ","        for(; i < len; i = i + 6)","        {","            cp1x = parseFloat(args[i]);","            cp1y = parseFloat(args[i + 1]);","            cp2x = parseFloat(args[i + 2]);","            cp2y = parseFloat(args[i + 3]);","            x = parseFloat(args[i + 4]);","            y = parseFloat(args[i + 5]);","            if(i > 0)","            {","                path = path + \", \";","            }","            path = path + this._round(cp1x) + \", \" + this._round(cp1y) + \", \" + this._round(cp2x) + \", \" + this._round(cp2y) + \", \" + this._round(x) + \", \" + this._round(y); ","            cp1x = cp1x + relativeX;","            cp1y = cp1y + relativeY;","            cp2x = cp2x + relativeX;","            cp2y = cp2y + relativeY;","            x = x + relativeX;","            y = y + relativeY;","            right = Math.max(x, Math.max(cp1x, cp2x));","            bottom = Math.max(y, Math.max(cp1y, cp2y));","            left = Math.min(x, Math.min(cp1x, cp2x));","            top = Math.min(y, Math.min(cp1y, cp2y));","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]]; ","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","        this._addToPath(path);","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    quadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Draws a quadratic bezier curve relative to the current position.","     *","     * @method relativeQuadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    relativeQuadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);","    },","","    /**","     * Implements quadraticCurveTo methods.","     *","     * @method _quadraticCurveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _quadraticCurveTo: function(args, relative) {","        var cpx, ","            cpy,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            x, ","            y,","            currentX = this._currentX,","            currentY = this._currentY,","            i = 0,","            len = args.length - 3,","            bezierArgs = [],","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        for(; i < len; i = i + 4)","        {","            cpx = parseFloat(args[i]) + relativeX;","            cpy = parseFloat(args[i + 1]) + relativeY;","            x = parseFloat(args[i + 2]) + relativeX;","            y = parseFloat(args[i + 3]) + relativeY;","            cp1x = currentX + 0.67*(cpx - currentX);","            cp1y = currentY + 0.67*(cpy - currentY);","            cp2x = cp1x + (x - currentX) * 0.34;","            cp2y = cp1y + (y - currentY) * 0.34;","            bezierArgs.push(cp1x),","            bezierArgs.push(cp1y),","            bezierArgs.push(cp2x),","            bezierArgs.push(cp2y);","            bezierArgs.push(x);","            bezierArgs.push(y);","        }","        this._curveTo.apply(this, [bezierArgs, false]);","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     */","    drawRect: function(x, y, w, h) {","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        this._currentX = x;","        this._currentY = y;","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     * ","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        this.moveTo(x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 360,","            circum = radius * 2;","","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this.moveTo((x + circum), (y + radius));","        this._addToPath(\" ae \" + this._round(x + radius) + \", \" + this._round(y + radius) + \", \" + this._round(radius) + \", \" + this._round(radius) + \", \" + startAngle + \", \" + endAngle);","        return this;","    },","    ","    /**","     * Draws an ellipse.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var startAngle = 0,","            endAngle = 360,","            radius = w * 0.5,","            yRadius = h * 0.5;","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + w, y + h);","        this.moveTo((x + w), (y + yRadius));","        this._addToPath(\" ae \" + this._round(x + radius) + \", \" + this._round(x + radius) + \", \" + this._round(y + yRadius) + \", \" + this._round(radius) + \", \" + this._round(yRadius) + \", \" + startAngle + \", \" + endAngle);","        return this;","    },","    ","    /**","     * Draws a diamond.     ","     * ","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius)","    {","        var diameter = radius * 2;","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","        this._currentX = x;","        this._currentY = y;","        startAngle *= -65535;","        arc *= 65536;","        startAngle = Math.round(startAngle);","        arc = Math.round(arc);","        this.moveTo(x, y);","        this._addToPath(\" ae \" + this._round(x) + \", \" + this._round(y) + \", \" + this._round(radius) + \" \" + this._round(radius) + \", \" +  startAngle + \", \" + arc);","        this._trackSize(diameter, diameter); ","        return this;","    },","","    /**","     * Draws a line segment from the current drawing position to the specified x and y coordinates.","     * ","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     */","    lineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Draws a line segment using the current line style from the current drawing position to the relative x and y coordinates.","     * ","     * @method relativeLineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     */","    relativeLineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), true]);","    },","","    /**","     * Implements lineTo methods.","     *","     * @method _lineTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _lineTo: function(args, relative) {","        var point1 = args[0],","            i,","            len,","            x,","            y,","            path = relative ? \" r \" : \" l \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        if (typeof point1 == \"string\" || typeof point1 == \"number\") {","            len = args.length - 1;","            for (i = 0; i < len; i = i + 2) {","                x = parseFloat(args[i]);","                y = parseFloat(args[i + 1]);","                path += ' ' + this._round(x) + ', ' + this._round(y);","                x = x + relativeX;","                y = y + relativeY;","                this._currentX = x;","                this._currentY = y;","                this._trackSize.apply(this, [x, y]);","            }","        }","        else","        {","            len = args.length;","            for (i = 0; i < len; i = i + 1) {","                x = parseFloat(args[i][0]);","                y = parseFloat(args[i][1]);","                path += ' ' + this._round(x) + ', ' + this._round(y);","                x = x + relativeX;","                y = y + relativeY;","                this._currentX = x;","                this._currentY = y;","                this._trackSize.apply(this, [x, y]);","            }","        }","        this._addToPath(path);","        return this;","    },","    ","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    moveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Moves the current drawing position relative to specified x and y coordinates.","     *","     * @method relativeMoveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    relativeMoveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), true]);","    },","","    /**","     * Implements moveTo methods.","     *","     * @method _moveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _moveTo: function(args, relative) {","        var x = parseFloat(args[0]);","            y = parseFloat(args[1]),","            command = relative ? \" t \" : \" m \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        this._movePath = command + this._round(x) + \", \" + this._round(y);","        x = x + relativeX;","        y = y + relativeY;","        this._trackSize(x, y);","        this._currentX = x;","        this._currentY = y;","    },","","    /**","     * Draws the graphic.","     *","     * @method _draw","     * @private","     */","    _closePath: function()","    {","        var fill = this.get(\"fill\"),","            stroke = this.get(\"stroke\"),","            node = this.node,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            path = this._path,","            pathEnd = \"\",","            multiplier = this._coordSpaceMultiplier;","        this._fillChangeHandler();","        this._strokeChangeHandler();","        if(path)","        {","            if(fill && fill.color)","            {","                pathEnd += ' x';","            }","            if(stroke)","            {","                pathEnd += ' e';","            }","        }","        if(path)","        {","            node.path = path + pathEnd;","        }","        if(!isNaN(w) && !isNaN(h))","        {","            node.coordOrigin = this._left + \", \" + this._top;","            node.coordSize = (w * multiplier) + \", \" + (h * multiplier);","            node.style.position = \"absolute\";","            node.style.width =  w + \"px\";","            node.style.height =  h + \"px\";","        }","        this._path = path;","        this._movePath = null;","        this._updateTransform();","    },","","    /**","     * Completes a drawing operation. ","     *","     * @method end","     */","    end: function()","    {","        this._closePath();","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     */","    closePath: function()","    {","        this._addToPath(\" x e\");","    },","","    /**","     * Clears the path.","     *","     * @method clear","     */","    clear: function()","    {","		this._right = 0;","        this._bottom = 0;","        this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._path = \"\";","        this._movePath = null;","    },","    ","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {  ","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","        ","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; ","            }","        }","        return [ tmp[0][0], tmp[0][1] ]; ","    },","  ","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i = 0,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            xy;","        for(; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right, bottom);","        this._trackSize(left, top);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;    ","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom) ","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    },","","    _left: 0,","","    _right: 0,","","    _top: 0,","","    _bottom: 0,","","    _width: 0,","","    _height: 0","};","Y.VMLDrawing = VMLDrawing;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class. "," * `VMLShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Shape.html\">`Shape`</a> class will point to the `VMLShape` class."," *"," * @module graphics"," * @class VMLShape"," * @constructor"," * @param {Object} cfg (optional) Attribute configs"," */","VMLShape = function() ","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    this._normalizedMatrix = new Y.Matrix();","    VMLShape.superclass.constructor.apply(this, arguments);","};","","VMLShape.NAME = \"shape\";","","Y.extend(VMLShape, Y.GraphicBase, Y.mix({","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"shape\",","    ","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","	init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic,","            data = this.get(\"data\");","		host.createNode();","        if(graphic)","        {","            this._setGraphic(graphic);","        }","        if(data)","        {","            host._parsePathData(data);","        }","        this._updateHandler();","	},"," ","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a `Graphic` instance, it will be assigned","     * to the `graphic` attribute. Otherwise, a new Graphic instance will be created and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.VMLGraphic)","        {","		    this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.VMLGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","            this._appendStrokeAndFill();","        }","    },","    ","    /**","     * Appends fill and stroke nodes to the shape.","     *","     * @method _appendStrokeAndFill","     * @private","     */","    _appendStrokeAndFill: function()","    {","        if(this._strokeNode)","        {","            this.node.appendChild(this._strokeNode);","        }","        if(this._fillNode)","        {","            this.node.appendChild(this._fillNode);","        }","    },","    ","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","        var node,","            concat = this._camelCaseConcat,","			x = this.get(\"x\"),","			y = this.get(\"y\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","			id,","			type,","			name = this.name,","            nodestring,","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","			strokestring,","			classString,","			stroke,","			endcap,","			opacity,","			joinstyle,","			miterlimit,","			dashstyle,","			fill,","			fillstring;","			id = this.get(\"id\");","			type = this._type == \"path\" ? \"shape\" : this._type;","		    classString = _getClassName(SHAPE) + \" \" + _getClassName(concat(IMPLEMENTATION, SHAPE)) + \" \" + _getClassName(name) + \" \" + _getClassName(concat(IMPLEMENTATION, name)) + \" \" + IMPLEMENTATION + type; ","			stroke = this._getStrokeProps();","			fill = this._getFillProps();","			","			nodestring  = '<' + type + '  xmlns=\"urn:schemas-microsft.com:vml\" id=\"' + id + '\" class=\"' + classString + '\" style=\"behavior:url(#default#VML);display:inline-block;position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;visibility:' + visibility + '\"';","","		    if(stroke && stroke.weight && stroke.weight > 0)","			{","				endcap = stroke.endcap;","				opacity = parseFloat(stroke.opacity);","				joinstyle = stroke.joinstyle;","				miterlimit = stroke.miterlimit;","				dashstyle = stroke.dashstyle;","				nodestring += ' stroked=\"t\" strokecolor=\"' + stroke.color + '\" strokeWeight=\"' + stroke.weight + 'px\"';","				","				strokestring = '<stroke class=\"vmlstroke\" xmlns=\"urn:schemas-microsft.com:vml\" on=\"t\" style=\"behavior:url(#default#VML);display:inline-block;\"';","				strokestring += ' opacity=\"' + opacity + '\"';","				if(endcap)","				{","					strokestring += ' endcap=\"' + endcap + '\"';","				}","				if(joinstyle)","				{","					strokestring += ' joinstyle=\"' + joinstyle + '\"';","				}","				if(miterlimit)","				{","					strokestring += ' miterlimit=\"' + miterlimit + '\"';","				}","				if(dashstyle)","				{","					strokestring += ' dashstyle=\"' + dashstyle + '\"';","				}","				strokestring += '></stroke>';","				this._strokeNode = DOCUMENT.createElement(strokestring);","				nodestring += ' stroked=\"t\"';","			}","			else","			{","				nodestring += ' stroked=\"f\"';","			}","			if(fill)","			{","				if(fill.node)","				{","					fillstring = fill.node;","					this._fillNode = DOCUMENT.createElement(fillstring);","				}","				if(fill.color)","				{","					nodestring += ' fillcolor=\"' + fill.color + '\"';","				}","				nodestring += ' filled=\"' + fill.filled + '\"';","			}","			","			","			nodestring += '>';","			nodestring += '</' + type + '>';","			","			node = DOCUMENT.createElement(nodestring);","","            this.node = node;","            this._strokeFlag = false;","            this._fillFlag = false;","	},","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute ","	 */","	addClass: function(className)","	{","		var node = this.node;","		Y_DOM.addClass(node, className);","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = this.node;","		Y_DOM.removeClass(node, className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains x & y values for new position (coordinates are page-based)","     *","	 */","	setXY: function(xy)","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY();","		this.set(\"x\", xy[0] - parentXY[0]);","		this.set(\"y\", xy[1] - parentXY[1]);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy. ","	 *","	 * @method contains","	 * @param {VMLShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","","		return node === refNode;","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y_SELECTOR.test(this.node, selector);","	},","","	/**","     * Calculates and returns properties for setting an initial stroke.","     *","     * @method _getStrokeProps","     * @return Object","     *","	 * @private","	 */","	 _getStrokeProps: function()","	 {","		var props,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","        if(stroke && stroke.weight && stroke.weight > 0)","		{","			props = {};","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","			if(linecap != \"round\" && linecap != \"square\")","			{","				linecap = \"flat\";","			}","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			props.stroked = true;","			props.color = stroke.color;","			props.weight = stroke.weight;","			props.endcap = linecap;","			props.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin == \"round\" || linejoin == \"bevel\")","			{","				props.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					props.miterlimit = Math.max(linejoin, 1);","					props.joinstyle = \"miter\";","				}","			}","			props.dashstyle = dash;","		}","		return props;","	 },","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","	 * @private","	 */","	_strokeChangeHandler: function(e)","	{","        if(!this._strokeFlag)","        {","            return;","        }","		var node = this.node,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","		if(stroke && stroke.weight && stroke.weight > 0)","		{","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","			if(linecap != \"round\" && linecap != \"square\")","			{","				linecap = \"flat\";","			}","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			node.stroked = true;","			node.strokeColor = stroke.color;","			node.strokeWeight = stroke.weight + \"px\";","			if(!this._strokeNode)","			{","				this._strokeNode = this._createGraphicNode(\"stroke\");","				node.appendChild(this._strokeNode);","			}","			this._strokeNode.endcap = linecap;","			this._strokeNode.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin == \"round\" || linejoin == \"bevel\")","			{","				this._strokeNode.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					this._strokeNode.miterlimit = Math.max(linejoin, 1);","					this._strokeNode.joinstyle = \"miter\";","				}","			}","			this._strokeNode.dashstyle = dash;","            this._strokeNode.on = true;","		}","		else","		{","            if(this._strokeNode)","            {","                this._strokeNode.on = false;","            }","			node.stroked = false;","		}","        this._strokeFlag = false;","	},","","	/**","     * Calculates and returns properties for setting an initial fill.","     *","     * @method _getFillProps","     * @return Object","     *","	 * @private","	 */","	_getFillProps: function()","	{","		var fill = this.get(\"fill\"),","			fillOpacity,","			props,","			gradient,","			i,","			fillstring,","			filled = false;","		if(fill)","		{","			props = {};","			","			if(fill.type == \"radial\" || fill.type == \"linear\")","			{","				fillOpacity = parseFloat(fill.opacity);","				fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;","				filled = true;","				gradient = this._getGradientFill(fill);","				fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" opacity=\"' + fillOpacity + '\"';","				for(i in gradient)","				{","					if(gradient.hasOwnProperty(i))","					{","						fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","					}","				}","				fillstring += ' />';","				props.node = fillstring;","			}","			else if(fill.color)","			{","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","                props.color = fill.color;","				if(IS_NUM(fillOpacity))","				{","					fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);","                    props.opacity = fillOpacity;    ","				    if(fillOpacity < 1)","                    {","                        props.node = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" type=\"solid\" opacity=\"' + fillOpacity + '\"/>';","				    }","                }","			}","			props.filled = filled;","		}","		return props;","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _fillChangeHandler","	 * @private","	 */","	_fillChangeHandler: function(e)","	{","        if(!this._fillFlag)","        {","            return;","        }","		var node = this.node,","			fill = this.get(\"fill\"),","			fillOpacity,","			fillstring,","			filled = false,","            i,","            gradient;","		if(fill)","		{","			if(fill.type == \"radial\" || fill.type == \"linear\")","			{","				filled = true;","				gradient = this._getGradientFill(fill);","                if(this._fillNode)","                {","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            if(i == \"colors\")","                            {","                                this._fillNode.colors.value = gradient[i];","                            }","                            else","                            {","                                this._fillNode[i] = gradient[i];","                            }","                        }","                    }","                }","                else","                {","                    fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\"';","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","                        }","                    }","                    fillstring += ' />';","                    this._fillNode = DOCUMENT.createElement(fillstring);","                    node.appendChild(this._fillNode);","                }","			}","			else if(fill.color)","			{","                node.fillcolor = fill.color;","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","				if(IS_NUM(fillOpacity) && fillOpacity < 1)","				{","					fill.opacity = fillOpacity;","                    if(this._fillNode)","					{","                        if(this._fillNode.getAttribute(\"type\") != \"solid\")","                        {","                            this._fillNode.type = \"solid\";","                        }","						this._fillNode.opacity = fillOpacity;","					}","					else","					{     ","                        fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" type=\"solid\" opacity=\"' + fillOpacity + '\"/>';","                        this._fillNode = DOCUMENT.createElement(fillstring);","                        node.appendChild(this._fillNode);","					}","				}","				else if(this._fillNode)","                {   ","                    this._fillNode.opacity = 1;","                    this._fillNode.type = \"solid\";","				}","			}","		}","		node.filled = filled;","        this._fillFlag = false;","	},","","	//not used. remove next release.","    _updateFillNode: function(node)","	{","		if(!this._fillNode)","		{","			this._fillNode = this._createGraphicNode(\"fill\");","			node.appendChild(this._fillNode);","		}","	},","","    /**","     * Calculates and returns an object containing gradient properties for a fill node. ","     *","     * @method _getGradientFill","     * @param {Object} fill Object containing fill properties.","     * @return Object","     * @private","     */","	_getGradientFill: function(fill)","	{","		var gradientProps = {},","			gradientBoxWidth,","			gradientBoxHeight,","			type = fill.type,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			isNumber = IS_NUM,","			stop,","			stops = fill.stops,","			len = stops.length,","			opacity,","			color,","			i = 0,","			oi,","			colorstring = \"\",","			cx = fill.cx,","			cy = fill.cy,","			fx = fill.fx,","			fy = fill.fy,","			r = fill.r,","            pct,","			rotation = fill.rotation || 0;","		if(type === \"linear\")","		{","            if(rotation <= 270)","            {","                rotation = Math.abs(rotation - 270);","            }","			else if(rotation < 360)","            {","                rotation = 270 + (360 - rotation);","            }","            else","            {","                rotation = 270;","            }","            gradientProps.type = \"gradient\";//\"gradientunscaled\";","			gradientProps.angle = rotation;","		}","		else if(type === \"radial\")","		{","			gradientBoxWidth = w * (r * 2);","			gradientBoxHeight = h * (r * 2);","			fx = r * 2 * (fx - 0.5);","			fy = r * 2 * (fy - 0.5);","			fx += cx;","			fy += cy;","			gradientProps.focussize = (gradientBoxWidth/w)/10 + \"% \" + (gradientBoxHeight/h)/10 + \"%\";","			gradientProps.alignshape = false;","			gradientProps.type = \"gradientradial\";","			gradientProps.focus = \"100%\";","			gradientProps.focusposition = Math.round(fx * 100) + \"% \" + Math.round(fy * 100) + \"%\";","		}","		for(;i < len; ++i) {","			stop = stops[i];","			color = stop.color;","			opacity = stop.opacity;","			opacity = isNumber(opacity) ? opacity : 1;","			pct = stop.offset || i/(len-1);","			pct *= (r * 2);","            pct = Math.round(100 * pct) + \"%\";","            oi = i > 0 ? i + 1 : \"\";","            gradientProps[\"opacity\" + oi] = opacity + \"\";","            colorstring += \", \" + pct + \" \" + color;","		}","		if(parseFloat(pct) < 100)","		{","			colorstring += \", 100% \" + color;","		}","		gradientProps.colors = colorstring.substr(2);","		return gradientProps;","	},","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","	","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","            key,","			transform,","			transformOrigin,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            tx,","            ty,","            matrix = this.matrix,","            normalizedMatrix = this._normalizedMatrix,","            isPathShape = this instanceof Y.VMLPath,","            i = 0,","            len = this._transforms.length;","        if(this._transforms && this._transforms.length > 0)","		{","            transformOrigin = this.get(\"transformOrigin\");","       ","            if(isPathShape)","            {","                normalizedMatrix.translate(this._left, this._top);","            }","            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.","            //subtract 0.5 from values","            tx = transformOrigin[0] - 0.5;","            ty = transformOrigin[1] - 0.5;","            ","            //ensure the values are within the appropriate range to avoid errors","            tx = Math.max(-0.5, Math.min(0.5, tx));","            ty = Math.max(-0.5, Math.min(0.5, ty));","            for(; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]); ","                    matrix[key].apply(matrix, this._transforms[i]); ","                }","			}","            if(isPathShape)","            {","                normalizedMatrix.translate(-this._left, -this._top);","            }","            transform = normalizedMatrix.a + \",\" + ","                        normalizedMatrix.c + \",\" + ","                        normalizedMatrix.b + \",\" + ","                        normalizedMatrix.d + \",\" + ","                        0 + \",\" +","                        0;","		}","        this._graphic.addToRedrawQueue(this);    ","        if(transform)","        {","            if(!this._skew)","            {","                this._skew = DOCUMENT.createElement( '<skew class=\"vmlskew\" xmlns=\"urn:schemas-microsft.com:vml\" on=\"false\" style=\"behavior:url(#default#VML);display:inline-block;\" />');","                this.node.appendChild(this._skew); ","            }","            this._skew.matrix = transform;","            this._skew.on = true;","            //this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + \"px, \" + this._getSkewOffsetValue(normalizedMatrix.dy) + \"px\";","            this._skew.origin = tx + \", \" + ty;","        }","        if(this._type != \"path\")","        {","            this._transforms = [];","        }","        //add the translate to the x and y coordinates","        node.style.left = (x + this._getSkewOffsetValue(normalizedMatrix.dx)) + \"px\";","        node.style.top =  (y + this._getSkewOffsetValue(normalizedMatrix.dy)) + \"px\";","    },","    ","    /**","     * Normalizes the skew offset values between -32767 and 32767.","     *","     * @method _getSkewOffsetValue","     * @param {Number} val The value to normalize","     * @return Number","     * @private","     */","    _getSkewOffsetValue: function(val)","    {","        var sign = Y.MatrixUtil.sign(val),","            absVal = Math.abs(val);","        val = Math.min(absVal, 32767) * sign;","        return val;","    },","	","	/**","	 * Storage for translateX","	 *","     * @property _translateX","     * @type Number","	 * @private","	 */","	_translateX: 0,","","	/**","	 * Storage for translateY","	 *","     * @property _translateY","     * @type Number","	 * @private","	 */","	_translateY: 0,","    ","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","	","    /**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to translate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y)","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","	 skewX: function(x)","	 {","		this._addTransform(\"skewX\", arguments);","	 },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","	 skewY: function(y)","	 {","		this._addTransform(\"skewY\", arguments);","	 },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","	 rotate: function(deg)","	 {","		this._addTransform(\"rotate\", arguments);","	 },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","	scale: function(x, y)","	{","		this._addTransform(\"scale\", arguments);","	},","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so, ","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function(e)","	{","		var host = this,","            node = host.node;","        host._fillChangeHandler();","        host._strokeChangeHandler();","        node.style.width = this.get(\"width\") + \"px\";","        node.style.height = this.get(\"height\") + \"px\"; ","        this._draw();","		host._updateTransform();","	},","","	/**","	 * Creates a graphic node","	 *","	 * @method _createGraphicNode","	 * @param {String} type node type to create","	 * @return HTMLElement","	 * @private","	 */","	_createGraphicNode: function(type)","	{","		type = type || this._type;","		return DOCUMENT.createElement('<' + type + ' xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);display:inline-block;\" class=\"vml' + type + '\"/>');","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @private","	 * @method _getDefaultFill","	 * @return Object","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @private","	 * @method _getDefaultStroke","	 * @return Object","	 */","	_getDefaultStroke: function() ","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can ","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as ","     * the name param.","     */","	set: function() ","	{","		var host = this;","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox. ","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var isPathShape = this instanceof Y.VMLPath,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","            x = this.get(\"x\"),","            y = this.get(\"y\");","        if(isPathShape)","        {","            x = x + this._left;","            y = y + this._top;","            w = this._right - this._left;","            h = this._bottom - this._top;","        }","        return this._getContentRect(w, h, x, y);","	},","","    /**","     * Calculates the bounding box for the shape.","     *","     * @method _getContentRect","     * @param {Number} w width of the shape","     * @param {Number} h height of the shape","     * @param {Number} x x-coordinate of the shape","     * @param {Number} y y-coordinate of the shape","     * @private","     */","    _getContentRect: function(w, h, x, y)","    {","        var transformOrigin = this.get(\"transformOrigin\"),","            transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h,","		    transforms = this.matrix.getTransformArray(this.get(\"transform\")),","            matrix = new Y.Matrix(),","            i = 0,","            len = transforms.length,","            transform,","            key,","            contentRect,","            isPathShape = this instanceof Y.VMLPath;","        if(isPathShape)","        {","            matrix.translate(this._left, this._top);","        }","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        for(; i < len; i = i + 1)","        {","            transform = transforms[i];","            key = transform.shift();","            if(key)","            {","                matrix[key].apply(matrix, transform); ","            }","        }","        matrix.translate(-transformX, -transformY);","        if(isPathShape)","        {","            matrix.translate(-this._left, -this._top);","        }","        contentRect = matrix.getContentRect(w, h, x, y);","        return contentRect;","    },","","    /**","     * Places the shape above all other shapes.","     *","     * @method toFront","     */","    toFront: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toFront(this);","        }","    },","","    /**","     * Places the shape underneath all other shapes.","     *","     * @method toFront","     */","    toBack: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toBack(this);","        }","    },","","    /**","     * Parses path data string and call mapped methods.","     *","     * @method _parsePathData","     * @param {String} val The path data","     * @private","     */","    _parsePathData: function(val)","    {","        var method,","            methodSymbol,","            args,","            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),","            i = 0,","            len, ","            str,","            symbolToMethod = this._pathSymbolToMethod;","        if(commandArray)","        {","            this.clear();","            len = commandArray.length || 0;","            for(; i < len; i = i + 1)","            {","                str = commandArray[i];","                methodSymbol = str.substr(0, 1),","                args = str.substr(1).match(SPLITARGSPATTERN);","                method = symbolToMethod[methodSymbol];","                if(method)","                {","                    if(args)","                    {","                        this[method].apply(this, args);","                    }","                    else","                    {","                        this[method].apply(this);","                    }","                }","            }","            this.end();","        }","    },","	","    /**","     *  Destroys shape","     *","     *  @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {   ","            if(this._fillNode)","            {","                this.node.removeChild(this._fillNode);","                this._fillNode = null;","            }","            if(this._strokeNode)","            {","                this.node.removeChild(this._strokeNode);","                this._strokeNode = null;","            }","            Y.one(this.node).remove(true);","        }","    }","}, Y.VMLDrawing.prototype));","","VMLShape.ATTRS = {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a ","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","	","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *     ","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>      ","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains corresponding methods for each transform","     * that will apply the transform to the current matrix. The below code illustrates how you might use the `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","    ","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String  ","	 */","	transform: {","		setter: function(val)","		{","            var i = 0,","                len,","                transform;","            this.matrix.init();	","            this._normalizedMatrix.init();	","            this._transforms = this.matrix.getTransformArray(val);","            len = this._transforms.length;","            for(;i < len; ++i)","            {","                transform = this._transforms[i];","            }","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","	","	/**","	 * ","	 * @config width","	 */","	width: {","		value: 0","	},","","	/**","	 * ","	 * @config height","	 */","	height: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.node,","				visibility = val ? \"visible\" : \"hidden\";","			if(node)","			{","				node.style.visibility = visibility;","			}","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape. ","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1. Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd> ","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p> ","	 *","	 * @config fill","	 * @type Object ","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","		","		setter: function(val)","		{","			var i,","				fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","			","			if(val)","			{","				//ensure, fill type is solid if color is explicitly passed.","				if(val.hasOwnProperty(\"color\"))","				{","					val.type = \"solid\";","				}","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{   ","						tmpl[i] = val[i];","					}","				}","			}","			fill = tmpl;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color == \"none\")","				{","					fill.color = null;","				}","			}","			this._fillFlag = true;","            return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set to an array, the first index indicates the","     *  length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin of miter, you simply specify the limit as opposed to having","     *  separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","		","		setter: function(val)","		{","			var i,","				stroke,","                wt,","				tmpl = this.get(\"stroke\") || this._getDefaultStroke();","			if(val)","			{","                if(val.hasOwnProperty(\"weight\"))","                {","                    wt = parseInt(val.weight, 10);","                    if(!isNaN(wt))","                    {","                        val.weight = wt;","                    }","                }","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{   ","						tmpl[i] = val[i];","					}","				}","			}","			stroke = tmpl;","            this._strokeFlag = true;","			return stroke;","		}","	},","	","	//Not used. Remove in future.","    autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	// ","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","	/**","	 * Dom node for the shape.","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","    /**","     * Represents an SVG Path string.","     *","     * @config data","     * @type String","     */","    data: {","        setter: function(val)","        {","            if(this.get(\"node\"))","            {","                this._parsePathData(val);","            }","            return val;","        }","    },","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","	}","};","Y.VMLShape = VMLShape;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Path.html\">`Path`</a> class. "," * `VMLPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Path.html\">`Path`</a> class will point to the `VMLPath` class."," *"," * @module graphics"," * @class VMLPath"," * @extends VMLShape"," */","VMLPath = function()","{","	VMLPath.superclass.constructor.apply(this, arguments);","};","","VMLPath.NAME = \"path\";","Y.extend(VMLPath, Y.VMLShape);","VMLPath.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 * ","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var val = Math.max(this._right - this._left, 0);","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 * ","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			return Math.max(this._bottom - this._top, 0);","		}","	},","	","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","		readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.VMLPath = VMLPath;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class. "," * `VMLRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Rect.html\">`Rect`</a> class will point to the `VMLRect` class."," *"," * @module graphics"," * @class VMLRect"," * @constructor"," */","VMLRect = function()","{","	VMLRect.superclass.constructor.apply(this, arguments);","};","VMLRect.NAME = \"rect\"; ","Y.extend(VMLRect, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\"","});","VMLRect.ATTRS = Y.VMLShape.ATTRS;","Y.VMLRect = VMLRect;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class. "," * `VMLEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a> class will point to the `VMLEllipse` class."," *"," * @module graphics"," * @class VMLEllipse"," * @constructor"," */","VMLEllipse = function()","{","	VMLEllipse.superclass.constructor.apply(this, arguments);","};","","VMLEllipse.NAME = \"ellipse\";","","Y.extend(VMLEllipse, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","VMLEllipse.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse. ","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		lazyAdd: false,","","		getter: function()","		{","			var val = this.get(\"width\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","		","		setter: function(val)","		{","			var w = val * 2; ","			this.set(\"width\", w);","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse. ","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		lazyAdd: false,","		","		getter: function()","		{","			var val = this.get(\"height\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","","		setter: function(val)","		{","			var h = val * 2;","			this.set(\"height\", h);","			return val;","		}","	}","});","Y.VMLEllipse = VMLEllipse;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class. "," * `VMLCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Circle.html\">`Circle`</a> class will point to the `VMLCircle` class."," *"," * @module graphics"," * @class VMLCircle"," * @constructor"," */","VMLCircle = function(cfg)","{","	VMLCircle.superclass.constructor.apply(this, arguments);","};","","VMLCircle.NAME = \"circle\";","","Y.extend(VMLCircle, VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","","VMLCircle.ATTRS = Y.merge(VMLShape.ATTRS, {","	/**","	 * Radius for the circle.","	 *","	 * @config radius","	 * @type Number","	 */","	radius: {","		lazyAdd: false,","","		value: 0","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{   ","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{   ","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	}","});","Y.VMLCircle = VMLCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class VMLPieSlice"," * @constructor"," */","VMLPieSlice = function()","{","	VMLPieSlice.superclass.constructor.apply(this, arguments);","};","VMLPieSlice.NAME = \"vmlPieSlice\";","Y.extend(VMLPieSlice, Y.VMLShape, Y.mix({","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"shape\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function(e)","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," }, Y.VMLDrawing.prototype));","VMLPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.VMLShape.ATTRS);","Y.VMLPieSlice = VMLPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Graphic.html\">`Graphic`</a> class. "," * `VMLGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> "," * capabilities, the <a href=\"Graphic.html\">`Graphic`</a> class will point to the `VMLGraphic` class."," *"," * @module graphics"," * @class VMLGraphic"," * @constructor"," */","VMLGraphic = function() {","    VMLGraphic.superclass.constructor.apply(this, arguments);    ","};","","VMLGraphic.NAME = \"vmlGraphic\";","","VMLGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node instance or a CSS selector string.","     * ","     * @config render","     * @type Node | String ","     */","    render: {},","	","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.","     *","     *  @config contentBounds","     *  @type Object","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The html element that represents to coordinate system of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`. ","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`. ","	 *","	 * @config height ","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines the sizing of the Graphic. ","     *","     *  <dl>","     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code> and <code>height</code>","     *      attributes or are determined by the dimensions of the parent element. The content contained in the Graphic will be sized to fit with in the Graphic instance's ","     *      dimensions. When using this setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>","     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the size and positioning of the content.</dd>","     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code> and <code>height</code>","     *      attributes or are determined by the dimensions of the parent element. The contents of the Graphic instance are not affected by this setting.</dd>","     *  </dl>","     *","     *","     *  @config autoSize","     *  @type Boolean | String","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.","     *","     *  <dl>","     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary ","     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>","     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>","     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>","     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>","     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>","     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>","     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>","     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>","     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>","     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>","     *  </dl>","     * ","     * @config preserveAspectRatio","     * @type String","     * @default xMidYMid","     */","    preserveAspectRatio: {","        value: \"xMidYMid\"","    },","","    /**","     * The contentBounds will resize to greater values but not values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown ","     * @type Boolean","     */","    resizeDown: {","        resizeDown: false","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(VMLGraphic, Y.GraphicBase, {","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can ","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as ","     * the name param.","     */","	set: function(attr, value) ","	{","		var host = this,","            redrawAttrs = {","                autoDraw: true,","                autoSize: true,","                preserveAspectRatio: true,","                resizeDown: true","            },","            key,","            forceRedraw = false;","		AttributeLite.prototype.set.apply(host, arguments);	","        if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)","        {","            if(Y_LANG.isString && redrawAttrs[attr])","            {","                forceRedraw = true;","            }","            else if(Y_LANG.isObject(attr))","            {","                for(key in redrawAttrs)","                {","                    if(redrawAttrs.hasOwnProperty(key) && attr[key])","                    {","                        forceRedraw = true;","                        break;","                    }","                }","            }","        }","        if(forceRedraw)","        {","            host._redraw();","        }","	},","","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = this.parentNode,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            xy;","        if(node)","        {","            xy = Y.one(node).getXY();","            xy[0] += x;","            xy[1] += y;","        }","        else","        {","            xy = Y.DOM._getOffset(this._node);","        }","        return xy;","    },","","    /**","     * Initializes the class.","     *","     * @method initializer","     * @private","     */","    initializer: function(config) {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\";","        this._shapes = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = this._createGraphic();","        this._node.style.left = this.get(\"x\") + \"px\";","        this._node.style.top = this.get(\"y\") + \"px\";","        this._node.style.visibility = visibility;","        this._node.setAttribute(\"id\", this.get(\"id\"));","        if(render)","        {","            this.render(render);","        }","    },","    ","    /**","     * Adds the graphics node to the dom.","     * ","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(this._node);","        this.parentNode = parentNode;","        this.set(\"width\", w);","        this.set(\"height\", h);","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.clear();","        Y.one(this._node).remove(true);","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var shapeClass = this._getShapeClass(cfg.type),","            shape = new shapeClass(cfg);","        this._appendShape(shape);","        shape._appendStrokeAndFill();","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\") || this.get(\"autoSize\") == \"sizeContentToGraphic\") ","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof VMLShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && (shape instanceof VMLShape))","        {","            shape._destroy();","            this._shapes[shape.get(\"id\")] = null;","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","        this._removeChildren(this._node);","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Sets the size of the graphics object.","     * ","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     */","    setSize: function(w, h) {","        w = Math.round(w);","        h = Math.round(h);","        this._node.style.width = w + 'px';","        this._node.style.height = h + 'px';","    },","","    /**","     * Sets the positon of the graphics object.","     *","     * @method setPosition","     * @param {Number} x x-coordinate for the object.","     * @param {Number} y y-coordinate for the object.","     */","    setPosition: function(x, y)","    {","        x = Math.round(x);","        y = Math.round(y);","        this._node.style.left = x + \"px\";","        this._node.style.top = y + \"px\";","    },","","    /**","     * Creates a group element","     *","     * @method _createGraphic","     * @private","     */","    _createGraphic: function() {","        var group = DOCUMENT.createElement('<group xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);padding:0px 0px 0px 0px;display:block;position:absolute;top:0px;left:0px;zoom:1;\" />');","        return group;","    },","","    /**","     * Creates a graphic node","     *","     * @method _createGraphicNode","     * @param {String} type node type to create","     * @param {String} pe specified pointer-events value","     * @return HTMLElement","     * @private","     */","    _createGraphicNode: function(type)","    {","        return DOCUMENT.createElement('<' + type + ' xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);display:inline-block;zoom:1;\" />');","    ","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        return this._shapes[id];","    },","","    /**","     * Returns a shape class. Used by `addShape`. ","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class. ","     * @return Function ","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.VMLCircle,","        rect: Y.VMLRect,","        path: Y.VMLPath,","        ellipse: Y.VMLEllipse,","        pieslice: Y.VMLPieSlice","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method.apply();","        this.set(\"autoDraw\", autoDraw);","    },","    ","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds. ","     *","     * @method addToRedrawQueue","     * @param shape {VMLShape}","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            box.width = box.right - box.left;","            box.height = box.bottom - box.top;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\")) ","        {","            this._redraw();","        }","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var autoSize = this.get(\"autoSize\"),","            preserveAspectRatio,","            node = this.parentNode,","            nodeWidth = parseFloat(node.getComputedStyle(\"width\")),","            nodeHeight = parseFloat(node.getComputedStyle(\"height\")),","            xCoordOrigin = 0,","            yCoordOrigin = 0,","            box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds,","            left = box.left,","            right = box.right,","            top = box.top,","            bottom = box.bottom,","            contentWidth = right - left,","            contentHeight = bottom - top,","            aspectRatio,","            xCoordSize,","            yCoordSize,","            scaledWidth,","            scaledHeight,","            visible = this.get(\"visible\");","        this._node.style.visibility = \"hidden\";","        if(autoSize)","        {","            if(autoSize == \"sizeContentToGraphic\")","            {","                preserveAspectRatio = this.get(\"preserveAspectRatio\");","                if(preserveAspectRatio == \"none\" || contentWidth/contentHeight === nodeWidth/nodeHeight)","                {","                    xCoordOrigin = left;","                    yCoordOrigin = top;","                    xCoordSize = contentWidth;","                    yCoordSize = contentHeight;","                }","                else ","                {","                    if(contentWidth * nodeHeight/contentHeight > nodeWidth)","                    {","                        aspectRatio = nodeHeight/nodeWidth;","                        xCoordSize = contentWidth;","                        yCoordSize = contentWidth * aspectRatio;","                        scaledHeight = (nodeWidth * (contentHeight/contentWidth)) * (yCoordSize/nodeHeight);","                        yCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(5).toLowerCase(), scaledHeight, yCoordSize);","                        yCoordOrigin = top + yCoordOrigin;","                        xCoordOrigin = left;","                    }","                    else","                    {","                        aspectRatio = nodeWidth/nodeHeight;","                        xCoordSize = contentHeight * aspectRatio;","                        yCoordSize = contentHeight;","                        scaledWidth = (nodeHeight * (contentWidth/contentHeight)) * (xCoordSize/nodeWidth);","                        xCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(1, 4).toLowerCase(), scaledWidth, xCoordSize);","                        xCoordOrigin = xCoordOrigin + left;","                        yCoordOrigin = top;","                    }","                }","                this._node.style.width = nodeWidth + \"px\";","                this._node.style.height = nodeHeight + \"px\";","                this._node.coordOrigin = xCoordOrigin + \", \" + yCoordOrigin;","            }","            else ","            {","                xCoordSize = contentWidth;","                yCoordSize = contentHeight;","                this._node.style.width = contentWidth + \"px\";","                this._node.style.height = contentHeight + \"px\";","                this._state.width = contentWidth;","                this._state.height =  contentHeight;","","            }","            this._node.coordSize = xCoordSize + \", \" + yCoordSize;","        }","        else","        {","            this._node.style.width = nodeWidth + \"px\";","            this._node.style.height = nodeHeight + \"px\";","            this._node.coordSize = nodeWidth + \", \" + nodeHeight;","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","        if(visible)","        {","            this._node.style.visibility = \"visible\";","        }","    },","    ","    /**","     * Determines the value for either an x or y coordinate to be used for the <code>coordOrigin</code> of the Graphic.","     *","     * @method _calculateCoordOrigin","     * @param {String} position The position for placement. Possible values are min, mid and max.","     * @param {Number} size The total scaled size of the content.","     * @param {Number} coordsSize The coordsSize for the Graphic.","     * @return Number","     * @private","     */","    _calculateCoordOrigin: function(position, size, coordsSize)","    {","        var coord;","        switch(position)","        {","            case \"min\" :","                coord = 0;","            break;","            case \"mid\" :","                coord = (size - coordsSize)/2;","            break;","            case \"max\" :","                coord = (size - coordsSize);","            break;","        }","        return coord;","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object} ","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {};","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;","                box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;","                box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;","                box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;","            }","        }","        box.left = Y_LANG.isNumber(box.left) ? box.left : 0;","        box.top = Y_LANG.isNumber(box.top) ? box.top : 0;","        box.right = Y_LANG.isNumber(box.right) ? box.right : 0;","        box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;","        this._contentBounds = box;","        return box;","    },","","    /**","     * Inserts shape on the top of the tree.","     *","     * @method _toFront","     * @param {VMLShape} Shape to add.","     * @private","     */","    _toFront: function(shape)","    {","        var contentNode = this._node;","        if(shape instanceof Y.VMLShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            contentNode.appendChild(shape);","        }","    },","","    /**","     * Inserts shape as the first child of the content node.","     *","     * @method _toBack","     * @param {VMLShape} Shape to add.","     * @private","     */","    _toBack: function(shape)","    {","        var contentNode = this._node,","            targetNode;","        if(shape instanceof Y.VMLShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            targetNode = contentNode.firstChild;","            if(targetNode)","            {","                contentNode.insertBefore(shape, targetNode);","            }","            else","            {","                contentNode.appendChild(shape);","            }","        }","    }","});","Y.VMLGraphic = VMLGraphic;","","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].lines = {"1":0,"3":0,"24":0,"36":0,"76":0,"88":0,"89":0,"91":0,"92":0,"94":0,"127":0,"142":0,"154":0,"171":0,"172":0,"173":0,"175":0,"176":0,"177":0,"178":0,"179":0,"180":0,"181":0,"183":0,"185":0,"186":0,"187":0,"188":0,"189":0,"190":0,"191":0,"192":0,"193":0,"194":0,"195":0,"196":0,"197":0,"198":0,"199":0,"200":0,"201":0,"203":0,"216":0,"229":0,"241":0,"256":0,"258":0,"259":0,"260":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"270":0,"271":0,"273":0,"286":0,"287":0,"288":0,"289":0,"290":0,"291":0,"292":0,"293":0,"308":0,"309":0,"310":0,"311":0,"312":0,"313":0,"314":0,"315":0,"316":0,"317":0,"330":0,"334":0,"335":0,"336":0,"337":0,"338":0,"339":0,"353":0,"357":0,"358":0,"359":0,"360":0,"361":0,"362":0,"377":0,"379":0,"380":0,"381":0,"382":0,"383":0,"384":0,"401":0,"402":0,"404":0,"406":0,"407":0,"408":0,"409":0,"410":0,"411":0,"412":0,"413":0,"414":0,"415":0,"427":0,"439":0,"451":0,"459":0,"460":0,"461":0,"462":0,"463":0,"464":0,"465":0,"466":0,"467":0,"468":0,"469":0,"474":0,"475":0,"476":0,"477":0,"478":0,"479":0,"480":0,"481":0,"482":0,"483":0,"486":0,"487":0,"499":0,"511":0,"523":0,"524":0,"528":0,"529":0,"530":0,"531":0,"532":0,"533":0,"544":0,"552":0,"553":0,"554":0,"556":0,"558":0,"560":0,"562":0,"565":0,"567":0,"569":0,"571":0,"572":0,"573":0,"574":0,"575":0,"577":0,"578":0,"579":0,"589":0,"599":0,"609":0,"610":0,"611":0,"612":0,"613":0,"614":0,"615":0,"616":0,"629":0,"634":0,"635":0,"638":0,"639":0,"640":0,"641":0,"644":0,"658":0,"666":0,"668":0,"669":0,"670":0,"671":0,"672":0,"674":0,"675":0,"676":0,"677":0,"678":0,"679":0,"691":0,"692":0,"694":0,"696":0,"698":0,"700":0,"702":0,"704":0,"706":0,"707":0,"722":0,"734":0,"736":0,"737":0,"738":0,"739":0,"742":0,"744":0,"763":0,"774":0,"777":0,"778":0,"780":0,"782":0,"784":0,"786":0,"799":0,"800":0,"802":0,"806":0,"807":0,"810":0,"811":0,"812":0,"824":0,"826":0,"828":0,"830":0,"843":0,"864":0,"865":0,"866":0,"867":0,"868":0,"870":0,"872":0,"874":0,"875":0,"876":0,"877":0,"878":0,"879":0,"881":0,"882":0,"883":0,"885":0,"887":0,"889":0,"891":0,"893":0,"895":0,"897":0,"899":0,"900":0,"901":0,"905":0,"907":0,"909":0,"911":0,"912":0,"914":0,"916":0,"918":0,"922":0,"923":0,"925":0,"927":0,"928":0,"929":0,"940":0,"941":0,"952":0,"953":0,"964":0,"968":0,"980":0,"982":0,"983":0,"995":0,"1006":0,"1008":0,"1020":0,"1033":0,"1043":0,"1045":0,"1046":0,"1047":0,"1048":0,"1050":0,"1052":0,"1053":0,"1054":0,"1055":0,"1056":0,"1057":0,"1058":0,"1059":0,"1060":0,"1061":0,"1062":0,"1064":0,"1065":0,"1066":0,"1068":0,"1069":0,"1072":0,"1074":0,"1078":0,"1079":0,"1081":0,"1082":0,"1085":0,"1087":0,"1098":0,"1100":0,"1102":0,"1112":0,"1114":0,"1115":0,"1116":0,"1118":0,"1120":0,"1121":0,"1122":0,"1123":0,"1124":0,"1125":0,"1126":0,"1127":0,"1128":0,"1130":0,"1131":0,"1133":0,"1134":0,"1135":0,"1137":0,"1138":0,"1139":0,"1141":0,"1142":0,"1145":0,"1147":0,"1151":0,"1152":0,"1154":0,"1155":0,"1158":0,"1159":0,"1163":0,"1165":0,"1167":0,"1169":0,"1182":0,"1189":0,"1191":0,"1193":0,"1195":0,"1196":0,"1197":0,"1198":0,"1199":0,"1200":0,"1202":0,"1204":0,"1207":0,"1208":0,"1210":0,"1212":0,"1213":0,"1214":0,"1215":0,"1217":0,"1218":0,"1219":0,"1221":0,"1225":0,"1227":0,"1238":0,"1240":0,"1242":0,"1249":0,"1251":0,"1253":0,"1254":0,"1255":0,"1257":0,"1259":0,"1261":0,"1263":0,"1267":0,"1274":0,"1275":0,"1277":0,"1279":0,"1282":0,"1283":0,"1284":0,"1287":0,"1289":0,"1290":0,"1291":0,"1292":0,"1294":0,"1295":0,"1297":0,"1299":0,"1301":0,"1305":0,"1306":0,"1307":0,"1310":0,"1312":0,"1313":0,"1317":0,"1318":0,"1324":0,"1326":0,"1327":0,"1341":0,"1363":0,"1365":0,"1367":0,"1369":0,"1371":0,"1375":0,"1377":0,"1378":0,"1380":0,"1382":0,"1383":0,"1384":0,"1385":0,"1386":0,"1387":0,"1388":0,"1389":0,"1390":0,"1391":0,"1392":0,"1394":0,"1395":0,"1396":0,"1397":0,"1398":0,"1399":0,"1400":0,"1401":0,"1402":0,"1403":0,"1404":0,"1406":0,"1408":0,"1410":0,"1411":0,"1424":0,"1425":0,"1426":0,"1427":0,"1428":0,"1430":0,"1442":0,"1455":0,"1457":0,"1459":0,"1461":0,"1465":0,"1466":0,"1469":0,"1470":0,"1471":0,"1473":0,"1474":0,"1476":0,"1477":0,"1480":0,"1482":0,"1484":0,"1491":0,"1492":0,"1494":0,"1496":0,"1497":0,"1499":0,"1500":0,"1502":0,"1504":0,"1506":0,"1509":0,"1510":0,"1523":0,"1525":0,"1526":0,"1565":0,"1566":0,"1567":0,"1579":0,"1580":0,"1592":0,"1593":0,"1605":0,"1616":0,"1627":0,"1638":0,"1649":0,"1663":0,"1665":0,"1667":0,"1688":0,"1690":0,"1691":0,"1692":0,"1693":0,"1694":0,"1695":0,"1708":0,"1709":0,"1720":0,"1739":0,"1758":0,"1759":0,"1760":0,"1762":0,"1777":0,"1782":0,"1784":0,"1785":0,"1786":0,"1787":0,"1789":0,"1804":0,"1815":0,"1817":0,"1819":0,"1820":0,"1821":0,"1822":0,"1824":0,"1825":0,"1826":0,"1828":0,"1831":0,"1832":0,"1834":0,"1836":0,"1837":0,"1847":0,"1848":0,"1850":0,"1861":0,"1862":0,"1864":0,"1877":0,"1885":0,"1887":0,"1888":0,"1889":0,"1891":0,"1892":0,"1894":0,"1895":0,"1897":0,"1899":0,"1903":0,"1907":0,"1918":0,"1919":0,"1921":0,"1925":0,"1937":0,"1939":0,"1941":0,"1942":0,"1944":0,"1946":0,"1947":0,"1949":0,"1954":0,"1965":0,"2001":0,"2004":0,"2005":0,"2006":0,"2007":0,"2008":0,"2010":0,"2012":0,"2013":0,"2018":0,"2051":0,"2056":0,"2057":0,"2059":0,"2061":0,"2091":0,"2093":0,"2095":0,"2097":0,"2149":0,"2153":0,"2156":0,"2158":0,"2160":0,"2162":0,"2164":0,"2168":0,"2169":0,"2171":0,"2173":0,"2176":0,"2177":0,"2214":0,"2218":0,"2220":0,"2222":0,"2223":0,"2225":0,"2228":0,"2230":0,"2232":0,"2236":0,"2237":0,"2238":0,"2269":0,"2282":0,"2284":0,"2286":0,"2301":0,"2305":0,"2316":0,"2318":0,"2321":0,"2322":0,"2323":0,"2333":0,"2334":0,"2347":0,"2363":0,"2367":0,"2378":0,"2380":0,"2382":0,"2383":0,"2393":0,"2394":0,"2405":0,"2407":0,"2410":0,"2412":0,"2422":0,"2434":0,"2435":0,"2436":0,"2441":0,"2442":0,"2443":0,"2459":0,"2460":0,"2461":0,"2466":0,"2467":0,"2468":0,"2472":0,"2483":0,"2485":0,"2488":0,"2490":0,"2501":0,"2523":0,"2524":0,"2529":0,"2531":0,"2544":0,"2545":0,"2550":0,"2552":0,"2556":0,"2564":0,"2566":0,"2568":0,"2569":0,"2587":0,"2592":0,"2593":0,"2594":0,"2597":0,"2635":0,"2646":0,"2647":0,"2650":0,"2652":0,"2670":0,"2675":0,"2676":0,"2678":0,"2680":0,"2696":0,"2711":0,"2726":0,"2739":0,"2741":0,"2743":0,"2756":0,"2758":0,"2760":0,"2830":0,"2835":0,"2836":0,"2838":0,"2840":0,"2853":0,"2858":0,"2859":0,"2861":0,"2863":0,"2885":0,"2886":0,"2891":0,"2903":0,"2912":0,"2913":0,"2915":0,"2917":0,"2919":0,"2921":0,"2923":0,"2925":0,"2926":0,"2931":0,"2933":0,"2963":0,"2967":0,"2969":0,"2970":0,"2971":0,"2975":0,"2977":0,"2987":0,"2989":0,"2990":0,"2996":0,"2997":0,"2998":0,"2999":0,"3000":0,"3001":0,"3003":0,"3014":0,"3017":0,"3018":0,"3019":0,"3020":0,"3021":0,"3022":0,"3032":0,"3033":0,"3045":0,"3046":0,"3048":0,"3050":0,"3052":0,"3053":0,"3054":0,"3066":0,"3068":0,"3070":0,"3074":0,"3086":0,"3088":0,"3090":0,"3093":0,"3095":0,"3096":0,"3097":0,"3099":0,"3101":0,"3112":0,"3114":0,"3116":0,"3118":0,"3121":0,"3133":0,"3135":0,"3136":0,"3138":0,"3139":0,"3140":0,"3151":0,"3152":0,"3164":0,"3167":0,"3169":0,"3171":0,"3173":0,"3177":0,"3179":0,"3181":0,"3183":0,"3195":0,"3196":0,"3197":0,"3198":0,"3210":0,"3211":0,"3212":0,"3213":0,"3223":0,"3224":0,"3238":0,"3251":0,"3264":0,"3265":0,"3267":0,"3269":0,"3295":0,"3296":0,"3297":0,"3298":0,"3310":0,"3312":0,"3314":0,"3326":0,"3328":0,"3329":0,"3331":0,"3332":0,"3333":0,"3334":0,"3335":0,"3336":0,"3337":0,"3338":0,"3339":0,"3341":0,"3343":0,"3355":0,"3375":0,"3376":0,"3378":0,"3380":0,"3381":0,"3383":0,"3384":0,"3385":0,"3386":0,"3390":0,"3392":0,"3393":0,"3394":0,"3395":0,"3396":0,"3397":0,"3398":0,"3402":0,"3403":0,"3404":0,"3405":0,"3406":0,"3407":0,"3408":0,"3411":0,"3412":0,"3413":0,"3417":0,"3418":0,"3419":0,"3420":0,"3421":0,"3422":0,"3425":0,"3429":0,"3430":0,"3431":0,"3433":0,"3435":0,"3436":0,"3438":0,"3440":0,"3456":0,"3457":0,"3460":0,"3461":0,"3463":0,"3464":0,"3466":0,"3467":0,"3469":0,"3481":0,"3486":0,"3488":0,"3490":0,"3491":0,"3492":0,"3493":0,"3494":0,"3495":0,"3498":0,"3499":0,"3500":0,"3501":0,"3502":0,"3503":0,"3515":0,"3516":0,"3518":0,"3520":0,"3522":0,"3535":0,"3537":0,"3539":0,"3541":0,"3543":0,"3544":0,"3546":0,"3550":0,"3555":0};
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].functions = {"VMLDrawing:24":0,"_round:74":0,"_addToPath:86":0,"curveTo:126":0,"relativeCurveTo:141":0,"_curveTo:153":0,"quadraticCurveTo:215":0,"relativeQuadraticCurveTo:228":0,"_quadraticCurveTo:240":0,"drawRect:285":0,"drawRoundRect:307":0,"drawCircle:329":0,"drawEllipse:352":0,"drawDiamond:375":0,"drawWedge:399":0,"lineTo:425":0,"relativeLineTo:437":0,"_lineTo:450":0,"moveTo:497":0,"relativeMoveTo:509":0,"_moveTo:522":0,"_closePath:542":0,"end:587":0,"closePath:597":0,"clear:607":0,"getBezierData:628":0,"_setCurveBoundingBox:656":0,"_trackSize:690":0,"VMLShape:734":0,"init:761":0,"initializer:772":0,"_setGraphic:797":0,"_appendStrokeAndFill:822":0,"createNode:841":0,"addClass:938":0,"removeClass:950":0,"getXY:962":0,"setXY:978":0,"contains:993":0,"compareTo:1005":0,"test:1018":0,"_getStrokeProps:1031":0,"_strokeChangeHandler:1096":0,"_getFillProps:1180":0,"_fillChangeHandler:1236":0,"_updateFillNode:1322":0,"_getGradientFill:1339":0,"_addTransform:1422":0,"_updateTransform:1440":0,"_getSkewOffsetValue:1521":0,"translate:1563":0,"translateX:1577":0,"translateY:1590":0,"skew:1603":0,"skewX:1614":0,"skewY:1625":0,"rotate:1636":0,"scale:1647":0,"on:1661":0,"_updateHandler:1686":0,"_createGraphicNode:1706":0,"_getDefaultFill:1719":0,"_getDefaultStroke:1737":0,"set:1756":0,"getBounds:1775":0,"_getContentRect:1802":0,"toFront:1845":0,"toBack:1859":0,"_parsePathData:1875":0,"destroy:1916":0,"_destroy:1935":0,"valueFn:1963":0,"setter:1999":0,"getter:2016":0,"valueFn:2049":0,"setter:2054":0,"setter:2090":0,"setter:2147":0,"setter:2212":0,"getter:2267":0,"setter:2280":0,"getter:2299":0,"VMLPath:2316":0,"getter:2331":0,"getter:2345":0,"getter:2361":0,"VMLRect:2378":0,"VMLEllipse:2405":0,"getter:2432":0,"setter:2439":0,"getter:2457":0,"setter:2464":0,"VMLCircle:2483":0,"setter:2521":0,"getter:2527":0,"setter:2542":0,"getter:2548":0,"VMLPieSlice:2564":0,"_draw:2585":0,"VMLGraphic:2646":0,"valueFn:2668":0,"setter:2673":0,"getter:2694":0,"getter:2709":0,"getter:2724":0,"setter:2737":0,"setter:2754":0,"getter:2828":0,"setter:2833":0,"getter:2851":0,"setter:2856":0,"setter:2883":0,"set:2901":0,"getXY:2961":0,"initializer:2986":0,"render:3013":0,"destroy:3030":0,"addShape:3043":0,"_appendShape:3064":0,"removeShape:3084":0,"removeAllShapes:3110":0,"_removeChildren:3131":0,"clear:3150":0,"_toggleVisible:3162":0,"setSize:3194":0,"setPosition:3208":0,"_createGraphic:3222":0,"_createGraphicNode:3236":0,"getShapeById:3249":0,"_getShapeClass:3262":0,"batch:3293":0,"_getDocFrag:3308":0,"addToRedrawQueue:3324":0,"_redraw:3353":0,"_calculateCoordOrigin:3454":0,"_getUpdatedContentBounds:3479":0,"_toFront:3513":0,"_toBack:3533":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].coveredLines = 921;
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].coveredFunctions = 139;
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1);
YUI.add('graphics-vml', function (Y, NAME) {

_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "(anonymous 1)", 1);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3);
var IMPLEMENTATION = "vml",
    SHAPE = "shape",
	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,
    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\.][0-9]*/g,
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

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 24);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 36);
VMLDrawing.prototype = {
    /**
     * Maps path to methods
     *
     * @property _pathSymbolToMethod
     * @type Object
     * @private
     */
    _pathSymbolToMethod: {
        M: "moveTo",
        m: "relativeMoveTo",
        L: "lineTo",
        l: "relativeLineTo",
        C: "curveTo",
        c: "relativeCurveTo",
        Q: "quadraticCurveTo",
        q: "relativeQuadraticCurveTo",
        z: "closePath",
        Z: "closePath"
    },

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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_round", 74);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 76);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_addToPath", 86);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 88);
this._path = this._path || "";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 89);
if(this._movePath)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 91);
this._path += this._movePath;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 92);
this._movePath = null;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 94);
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
    curveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "curveTo", 126);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 127);
this._curveTo.apply(this, [Y.Array(arguments), false]);
    },

    /**
     * Draws a bezier curve.
     *
     * @method relativeCurveTo
     * @param {Number} cp1x x-coordinate for the first control point.
     * @param {Number} cp1y y-coordinate for the first control point.
     * @param {Number} cp2x x-coordinate for the second control point.
     * @param {Number} cp2y y-coordinate for the second control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    relativeCurveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeCurveTo", 141);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 142);
this._curveTo.apply(this, [Y.Array(arguments), true]);
    },
    
    /**
     * Implements curveTo methods.
     *
     * @method _curveTo
     * @param {Array} args The arguments to be used.
     * @param {Boolean} relative Indicates whether or not to use relative coordinates.
     * @private
     */
    _curveTo: function(args, relative) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_curveTo", 153);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 154);
var w,
            h,
            cp1x,
            cp1y,
            cp2x,
            cp2y,
            pts,
            right,
            left,
            bottom,
            top,
            i = 0,
            len,
            path,
            command = relative ? " v " : " c ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 171);
len = args.length - 5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 172);
path = command; 
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 173);
for(; i < len; i = i + 6)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 175);
cp1x = parseFloat(args[i]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 176);
cp1y = parseFloat(args[i + 1]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 177);
cp2x = parseFloat(args[i + 2]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 178);
cp2y = parseFloat(args[i + 3]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 179);
x = parseFloat(args[i + 4]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 180);
y = parseFloat(args[i + 5]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 181);
if(i > 0)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 183);
path = path + ", ";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 185);
path = path + this._round(cp1x) + ", " + this._round(cp1y) + ", " + this._round(cp2x) + ", " + this._round(cp2y) + ", " + this._round(x) + ", " + this._round(y); 
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 186);
cp1x = cp1x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 187);
cp1y = cp1y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 188);
cp2x = cp2x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 189);
cp2y = cp2y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 190);
x = x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 191);
y = y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 192);
right = Math.max(x, Math.max(cp1x, cp2x));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 193);
bottom = Math.max(y, Math.max(cp1y, cp2y));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 194);
left = Math.min(x, Math.min(cp1x, cp2x));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 195);
top = Math.min(y, Math.min(cp1y, cp2y));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 196);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 197);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 198);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]]; 
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 199);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 200);
this._currentX = x;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 201);
this._currentY = y;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 203);
this._addToPath(path);
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
    quadraticCurveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "quadraticCurveTo", 215);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 216);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);
    },

    /**
     * Draws a quadratic bezier curve relative to the current position.
     *
     * @method relativeQuadraticCurveTo
     * @param {Number} cpx x-coordinate for the control point.
     * @param {Number} cpy y-coordinate for the control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    relativeQuadraticCurveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeQuadraticCurveTo", 228);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 229);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);
    },

    /**
     * Implements quadraticCurveTo methods.
     *
     * @method _quadraticCurveTo
     * @param {Array} args The arguments to be used.
     * @param {Boolean} relative Indicates whether or not to use relative coordinates.
     * @private
     */
    _quadraticCurveTo: function(args, relative) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_quadraticCurveTo", 240);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 241);
var cpx, 
            cpy,
            cp1x,
            cp1y,
            cp2x,
            cp2y,
            x, 
            y,
            currentX = this._currentX,
            currentY = this._currentY,
            i = 0,
            len = args.length - 3,
            bezierArgs = [],
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 256);
for(; i < len; i = i + 4)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 258);
cpx = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 259);
cpy = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 260);
x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 261);
y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 262);
cp1x = currentX + 0.67*(cpx - currentX);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 263);
cp1y = currentY + 0.67*(cpy - currentY);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 264);
cp2x = cp1x + (x - currentX) * 0.34;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 265);
cp2y = cp1y + (y - currentY) * 0.34;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 266);
bezierArgs.push(cp1x),
            bezierArgs.push(cp1y),
            bezierArgs.push(cp2x),
            bezierArgs.push(cp2y);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 270);
bezierArgs.push(x);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 271);
bezierArgs.push(y);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 273);
this._curveTo.apply(this, [bezierArgs, false]);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawRect", 285);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 286);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 287);
this.lineTo(x + w, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 288);
this.lineTo(x + w, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 289);
this.lineTo(x, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 290);
this.lineTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 291);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 292);
this._currentY = y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 293);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawRoundRect", 307);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 308);
this.moveTo(x, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 309);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 310);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 311);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 312);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 313);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 314);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 315);
this.lineTo(x + ew, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 316);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 317);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawCircle", 329);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 330);
var startAngle = 0,
            endAngle = 360,
            circum = radius * 2;

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 334);
endAngle *= 65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 335);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 336);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 337);
this.moveTo((x + circum), (y + radius));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 338);
this._addToPath(" ae " + this._round(x + radius) + ", " + this._round(y + radius) + ", " + this._round(radius) + ", " + this._round(radius) + ", " + startAngle + ", " + endAngle);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 339);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawEllipse", 352);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 353);
var startAngle = 0,
            endAngle = 360,
            radius = w * 0.5,
            yRadius = h * 0.5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 357);
endAngle *= 65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 358);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 359);
this._trackSize(x + w, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 360);
this.moveTo((x + w), (y + yRadius));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 361);
this._addToPath(" ae " + this._round(x + radius) + ", " + this._round(x + radius) + ", " + this._round(y + yRadius) + ", " + this._round(radius) + ", " + this._round(yRadius) + ", " + startAngle + ", " + endAngle);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 362);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawDiamond", 375);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 377);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 379);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 380);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 381);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 382);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 383);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 384);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawWedge", 399);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 401);
var diameter = radius * 2;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 402);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 404);
arc = 360;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 406);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 407);
this._currentY = y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 408);
startAngle *= -65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 409);
arc *= 65536;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 410);
startAngle = Math.round(startAngle);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 411);
arc = Math.round(arc);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 412);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 413);
this._addToPath(" ae " + this._round(x) + ", " + this._round(y) + ", " + this._round(radius) + " " + this._round(radius) + ", " +  startAngle + ", " + arc);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 414);
this._trackSize(diameter, diameter); 
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 415);
return this;
    },

    /**
     * Draws a line segment from the current drawing position to the specified x and y coordinates.
     * 
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     */
    lineTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "lineTo", 425);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 427);
this._lineTo.apply(this, [Y.Array(arguments), false]);
    },

    /**
     * Draws a line segment using the current line style from the current drawing position to the relative x and y coordinates.
     * 
     * @method relativeLineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     */
    relativeLineTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeLineTo", 437);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 439);
this._lineTo.apply(this, [Y.Array(arguments), true]);
    },

    /**
     * Implements lineTo methods.
     *
     * @method _lineTo
     * @param {Array} args The arguments to be used.
     * @param {Boolean} relative Indicates whether or not to use relative coordinates.
     * @private
     */
    _lineTo: function(args, relative) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_lineTo", 450);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 451);
var point1 = args[0],
            i,
            len,
            x,
            y,
            path = relative ? " r " : " l ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 459);
if (typeof point1 == "string" || typeof point1 == "number") {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 460);
len = args.length - 1;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 461);
for (i = 0; i < len; i = i + 2) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 462);
x = parseFloat(args[i]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 463);
y = parseFloat(args[i + 1]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 464);
path += ' ' + this._round(x) + ', ' + this._round(y);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 465);
x = x + relativeX;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 466);
y = y + relativeY;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 467);
this._currentX = x;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 468);
this._currentY = y;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 469);
this._trackSize.apply(this, [x, y]);
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 474);
len = args.length;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 475);
for (i = 0; i < len; i = i + 1) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 476);
x = parseFloat(args[i][0]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 477);
y = parseFloat(args[i][1]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 478);
path += ' ' + this._round(x) + ', ' + this._round(y);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 479);
x = x + relativeX;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 480);
y = y + relativeY;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 481);
this._currentX = x;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 482);
this._currentY = y;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 483);
this._trackSize.apply(this, [x, y]);
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 486);
this._addToPath(path);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 487);
return this;
    },
    
    /**
     * Moves the current drawing position to specified x and y coordinates.
     *
     * @method moveTo
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    moveTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "moveTo", 497);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 499);
this._moveTo.apply(this, [Y.Array(arguments), false]);
    },

    /**
     * Moves the current drawing position relative to specified x and y coordinates.
     *
     * @method relativeMoveTo
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     */
    relativeMoveTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeMoveTo", 509);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 511);
this._moveTo.apply(this, [Y.Array(arguments), true]);
    },

    /**
     * Implements moveTo methods.
     *
     * @method _moveTo
     * @param {Array} args The arguments to be used.
     * @param {Boolean} relative Indicates whether or not to use relative coordinates.
     * @private
     */
    _moveTo: function(args, relative) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_moveTo", 522);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 523);
var x = parseFloat(args[0]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 524);
y = parseFloat(args[1]),
            command = relative ? " t " : " m ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 528);
this._movePath = command + this._round(x) + ", " + this._round(y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 529);
x = x + relativeX;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 530);
y = y + relativeY;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 531);
this._trackSize(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 532);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 533);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_closePath", 542);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 544);
var fill = this.get("fill"),
            stroke = this.get("stroke"),
            node = this.node,
            w = this.get("width"),
            h = this.get("height"),
            path = this._path,
            pathEnd = "",
            multiplier = this._coordSpaceMultiplier;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 552);
this._fillChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 553);
this._strokeChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 554);
if(path)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 556);
if(fill && fill.color)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 558);
pathEnd += ' x';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 560);
if(stroke)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 562);
pathEnd += ' e';
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 565);
if(path)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 567);
node.path = path + pathEnd;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 569);
if(!isNaN(w) && !isNaN(h))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 571);
node.coordOrigin = this._left + ", " + this._top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 572);
node.coordSize = (w * multiplier) + ", " + (h * multiplier);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 573);
node.style.position = "absolute";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 574);
node.style.width =  w + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 575);
node.style.height =  h + "px";
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 577);
this._path = path;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 578);
this._movePath = null;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 579);
this._updateTransform();
    },

    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "end", 587);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 589);
this._closePath();
    },

    /**
     * Ends a fill and stroke
     *
     * @method closePath
     */
    closePath: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "closePath", 597);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 599);
this._addToPath(" x e");
    },

    /**
     * Clears the path.
     *
     * @method clear
     */
    clear: function()
    {
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "clear", 607);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 609);
this._right = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 610);
this._bottom = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 611);
this._width = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 612);
this._height = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 613);
this._left = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 614);
this._top = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 615);
this._path = "";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 616);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getBezierData", 628);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 629);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 634);
for (i = 0; i < n; ++i){
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 635);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }
        
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 638);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 639);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 640);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 641);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; 
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 644);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_setCurveBoundingBox", 656);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 658);
var i = 0,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            xy;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 666);
for(; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 668);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 669);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 670);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 671);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 672);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 674);
left = Math.round(left * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 675);
right = Math.round(right * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 676);
top = Math.round(top * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 677);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 678);
this._trackSize(right, bottom);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 679);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_trackSize", 690);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 691);
if (w > this._right) {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 692);
this._right = w;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 694);
if(w < this._left)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 696);
this._left = w;    
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 698);
if (h < this._top)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 700);
this._top = h;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 702);
if (h > this._bottom) 
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 704);
this._bottom = h;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 706);
this._width = this._right - this._left;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 707);
this._height = this._bottom - this._top;
    },

    _left: 0,

    _right: 0,

    _top: 0,

    _bottom: 0,

    _width: 0,

    _height: 0
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 722);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 734);
VMLShape = function() 
{
    _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLShape", 734);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 736);
this._transforms = [];
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 737);
this.matrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 738);
this._normalizedMatrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 739);
VMLShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 742);
VMLShape.NAME = "shape";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 744);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "init", 761);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 763);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "initializer", 772);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 774);
var host = this,
            graphic = cfg.graphic,
            data = this.get("data");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 777);
host.createNode();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 778);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 780);
this._setGraphic(graphic);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 782);
if(data)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 784);
host._parsePathData(data);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 786);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_setGraphic", 797);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 799);
var graphic;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 800);
if(render instanceof Y.VMLGraphic)
        {
		    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 802);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 806);
render = Y.one(render);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 807);
graphic = new Y.VMLGraphic({
                render: render
            });
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 810);
graphic._appendShape(this);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 811);
this._graphic = graphic;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 812);
this._appendStrokeAndFill();
        }
    },
    
    /**
     * Appends fill and stroke nodes to the shape.
     *
     * @method _appendStrokeAndFill
     * @private
     */
    _appendStrokeAndFill: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_appendStrokeAndFill", 822);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 824);
if(this._strokeNode)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 826);
this.node.appendChild(this._strokeNode);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 828);
if(this._fillNode)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 830);
this.node.appendChild(this._fillNode);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "createNode", 841);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 843);
var node,
            concat = this._camelCaseConcat,
			x = this.get("x"),
			y = this.get("y"),
            w = this.get("width"),
            h = this.get("height"),
			id,
			type,
			name = this.name,
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
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 864);
id = this.get("id");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 865);
type = this._type == "path" ? "shape" : this._type;
		    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 866);
classString = _getClassName(SHAPE) + " " + _getClassName(concat(IMPLEMENTATION, SHAPE)) + " " + _getClassName(name) + " " + _getClassName(concat(IMPLEMENTATION, name)) + " " + IMPLEMENTATION + type; 
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 867);
stroke = this._getStrokeProps();
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 868);
fill = this._getFillProps();
			
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 870);
nodestring  = '<' + type + '  xmlns="urn:schemas-microsft.com:vml" id="' + id + '" class="' + classString + '" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;visibility:' + visibility + '"';

		    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 872);
if(stroke && stroke.weight && stroke.weight > 0)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 874);
endcap = stroke.endcap;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 875);
opacity = parseFloat(stroke.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 876);
joinstyle = stroke.joinstyle;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 877);
miterlimit = stroke.miterlimit;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 878);
dashstyle = stroke.dashstyle;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 879);
nodestring += ' stroked="t" strokecolor="' + stroke.color + '" strokeWeight="' + stroke.weight + 'px"';
				
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 881);
strokestring = '<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;"';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 882);
strokestring += ' opacity="' + opacity + '"';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 883);
if(endcap)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 885);
strokestring += ' endcap="' + endcap + '"';
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 887);
if(joinstyle)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 889);
strokestring += ' joinstyle="' + joinstyle + '"';
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 891);
if(miterlimit)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 893);
strokestring += ' miterlimit="' + miterlimit + '"';
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 895);
if(dashstyle)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 897);
strokestring += ' dashstyle="' + dashstyle + '"';
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 899);
strokestring += '></stroke>';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 900);
this._strokeNode = DOCUMENT.createElement(strokestring);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 901);
nodestring += ' stroked="t"';
			}
			else
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 905);
nodestring += ' stroked="f"';
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 907);
if(fill)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 909);
if(fill.node)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 911);
fillstring = fill.node;
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 912);
this._fillNode = DOCUMENT.createElement(fillstring);
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 914);
if(fill.color)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 916);
nodestring += ' fillcolor="' + fill.color + '"';
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 918);
nodestring += ' filled="' + fill.filled + '"';
			}
			
			
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 922);
nodestring += '>';
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 923);
nodestring += '</' + type + '>';
			
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 925);
node = DOCUMENT.createElement(nodestring);

            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 927);
this.node = node;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 928);
this._strokeFlag = false;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 929);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addClass", 938);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 940);
var node = this.node;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 941);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeClass", 950);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 952);
var node = this.node;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 953);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getXY", 962);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 964);
var graphic = this._graphic,
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 968);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setXY", 978);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 980);
var graphic = this._graphic,
			parentXY = graphic.getXY();
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 982);
this.set("x", xy[0] - parentXY[0]);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 983);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "contains", 993);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 995);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "compareTo", 1005);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1006);
var node = this.node;

		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1008);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "test", 1018);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1020);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getStrokeProps", 1031);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1033);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1043);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1045);
props = {};
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1046);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1047);
linejoin = stroke.linejoin || "round";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1048);
if(linecap != "round" && linecap != "square")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1050);
linecap = "flat";
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1052);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1053);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1054);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1055);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1056);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1057);
props.stroked = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1058);
props.color = stroke.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1059);
props.weight = stroke.weight;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1060);
props.endcap = linecap;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1061);
props.opacity = stroke.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1062);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1064);
dash = [];
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1065);
len = dashstyle.length;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1066);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1068);
val = dashstyle[i];
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1069);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1072);
if(linejoin == "round" || linejoin == "bevel")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1074);
props.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1078);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1079);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1081);
props.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1082);
props.joinstyle = "miter";
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1085);
props.dashstyle = dash;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1087);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_strokeChangeHandler", 1096);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1098);
if(!this._strokeFlag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1100);
return;
        }
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1102);
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
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1112);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1114);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1115);
linejoin = stroke.linejoin || "round";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1116);
if(linecap != "round" && linecap != "square")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1118);
linecap = "flat";
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1120);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1121);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1122);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1123);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1124);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1125);
node.stroked = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1126);
node.strokeColor = stroke.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1127);
node.strokeWeight = stroke.weight + "px";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1128);
if(!this._strokeNode)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1130);
this._strokeNode = this._createGraphicNode("stroke");
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1131);
node.appendChild(this._strokeNode);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1133);
this._strokeNode.endcap = linecap;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1134);
this._strokeNode.opacity = stroke.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1135);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1137);
dash = [];
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1138);
len = dashstyle.length;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1139);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1141);
val = dashstyle[i];
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1142);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1145);
if(linejoin == "round" || linejoin == "bevel")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1147);
this._strokeNode.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1151);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1152);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1154);
this._strokeNode.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1155);
this._strokeNode.joinstyle = "miter";
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1158);
this._strokeNode.dashstyle = dash;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1159);
this._strokeNode.on = true;
		}
		else
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1163);
if(this._strokeNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1165);
this._strokeNode.on = false;
            }
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1167);
node.stroked = false;
		}
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1169);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getFillProps", 1180);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1182);
var fill = this.get("fill"),
			fillOpacity,
			props,
			gradient,
			i,
			fillstring,
			filled = false;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1189);
if(fill)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1191);
props = {};
			
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1193);
if(fill.type == "radial" || fill.type == "linear")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1195);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1196);
fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1197);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1198);
gradient = this._getGradientFill(fill);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1199);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="' + fillOpacity + '"';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1200);
for(i in gradient)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1202);
if(gradient.hasOwnProperty(i))
					{
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1204);
fillstring += ' ' + i + '="' + gradient[i] + '"';
					}
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1207);
fillstring += ' />';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1208);
props.node = fillstring;
			}
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1210);
if(fill.color)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1212);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1213);
filled = true;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1214);
props.color = fill.color;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1215);
if(IS_NUM(fillOpacity))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1217);
fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1218);
props.opacity = fillOpacity;    
				    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1219);
if(fillOpacity < 1)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1221);
props.node = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
				    }
                }
			}}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1225);
props.filled = filled;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1227);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_fillChangeHandler", 1236);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1238);
if(!this._fillFlag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1240);
return;
        }
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1242);
var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			fillstring,
			filled = false,
            i,
            gradient;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1249);
if(fill)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1251);
if(fill.type == "radial" || fill.type == "linear")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1253);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1254);
gradient = this._getGradientFill(fill);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1255);
if(this._fillNode)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1257);
for(i in gradient)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1259);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1261);
if(i == "colors")
                            {
                                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1263);
this._fillNode.colors.value = gradient[i];
                            }
                            else
                            {
                                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1267);
this._fillNode[i] = gradient[i];
                            }
                        }
                    }
                }
                else
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1274);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"';
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1275);
for(i in gradient)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1277);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1279);
fillstring += ' ' + i + '="' + gradient[i] + '"';
                        }
                    }
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1282);
fillstring += ' />';
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1283);
this._fillNode = DOCUMENT.createElement(fillstring);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1284);
node.appendChild(this._fillNode);
                }
			}
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1287);
if(fill.color)
			{
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1289);
node.fillcolor = fill.color;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1290);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1291);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1292);
if(IS_NUM(fillOpacity) && fillOpacity < 1)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1294);
fill.opacity = fillOpacity;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1295);
if(this._fillNode)
					{
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1297);
if(this._fillNode.getAttribute("type") != "solid")
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1299);
this._fillNode.type = "solid";
                        }
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1301);
this._fillNode.opacity = fillOpacity;
					}
					else
					{     
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1305);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1306);
this._fillNode = DOCUMENT.createElement(fillstring);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1307);
node.appendChild(this._fillNode);
					}
				}
				else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1310);
if(this._fillNode)
                {   
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1312);
this._fillNode.opacity = 1;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1313);
this._fillNode.type = "solid";
				}}
			}}
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1317);
node.filled = filled;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1318);
this._fillFlag = false;
	},

	//not used. remove next release.
    _updateFillNode: function(node)
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateFillNode", 1322);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1324);
if(!this._fillNode)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1326);
this._fillNode = this._createGraphicNode("fill");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1327);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getGradientFill", 1339);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1341);
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
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1363);
if(type === "linear")
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1365);
if(rotation <= 270)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1367);
rotation = Math.abs(rotation - 270);
            }
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1369);
if(rotation < 360)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1371);
rotation = 270 + (360 - rotation);
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1375);
rotation = 270;
            }}
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1377);
gradientProps.type = "gradient";//"gradientunscaled";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1378);
gradientProps.angle = rotation;
		}
		else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1380);
if(type === "radial")
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1382);
gradientBoxWidth = w * (r * 2);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1383);
gradientBoxHeight = h * (r * 2);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1384);
fx = r * 2 * (fx - 0.5);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1385);
fy = r * 2 * (fy - 0.5);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1386);
fx += cx;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1387);
fy += cy;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1388);
gradientProps.focussize = (gradientBoxWidth/w)/10 + "% " + (gradientBoxHeight/h)/10 + "%";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1389);
gradientProps.alignshape = false;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1390);
gradientProps.type = "gradientradial";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1391);
gradientProps.focus = "100%";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1392);
gradientProps.focusposition = Math.round(fx * 100) + "% " + Math.round(fy * 100) + "%";
		}}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1394);
for(;i < len; ++i) {
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1395);
stop = stops[i];
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1396);
color = stop.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1397);
opacity = stop.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1398);
opacity = isNumber(opacity) ? opacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1399);
pct = stop.offset || i/(len-1);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1400);
pct *= (r * 2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1401);
pct = Math.round(100 * pct) + "%";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1402);
oi = i > 0 ? i + 1 : "";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1403);
gradientProps["opacity" + oi] = opacity + "";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1404);
colorstring += ", " + pct + " " + color;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1406);
if(parseFloat(pct) < 100)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1408);
colorstring += ", 100% " + color;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1410);
gradientProps.colors = colorstring.substr(2);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1411);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_addTransform", 1422);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1424);
args = Y.Array(args);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1425);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1426);
args.unshift(type);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1427);
this._transforms.push(args);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1428);
if(this.initialized)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1430);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateTransform", 1440);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1442);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1455);
if(this._transforms && this._transforms.length > 0)
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1457);
transformOrigin = this.get("transformOrigin");
       
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1459);
if(isPathShape)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1461);
normalizedMatrix.translate(this._left, this._top);
            }
            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.
            //subtract 0.5 from values
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1465);
tx = transformOrigin[0] - 0.5;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1466);
ty = transformOrigin[1] - 0.5;
            
            //ensure the values are within the appropriate range to avoid errors
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1469);
tx = Math.max(-0.5, Math.min(0.5, tx));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1470);
ty = Math.max(-0.5, Math.min(0.5, ty));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1471);
for(; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1473);
key = this._transforms[i].shift();
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1474);
if(key)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1476);
normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]); 
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1477);
matrix[key].apply(matrix, this._transforms[i]); 
                }
			}
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1480);
if(isPathShape)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1482);
normalizedMatrix.translate(-this._left, -this._top);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1484);
transform = normalizedMatrix.a + "," + 
                        normalizedMatrix.c + "," + 
                        normalizedMatrix.b + "," + 
                        normalizedMatrix.d + "," + 
                        0 + "," +
                        0;
		}
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1491);
this._graphic.addToRedrawQueue(this);    
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1492);
if(transform)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1494);
if(!this._skew)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1496);
this._skew = DOCUMENT.createElement( '<skew class="vmlskew" xmlns="urn:schemas-microsft.com:vml" on="false" style="behavior:url(#default#VML);display:inline-block;" />');
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1497);
this.node.appendChild(this._skew); 
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1499);
this._skew.matrix = transform;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1500);
this._skew.on = true;
            //this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + "px, " + this._getSkewOffsetValue(normalizedMatrix.dy) + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1502);
this._skew.origin = tx + ", " + ty;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1504);
if(this._type != "path")
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1506);
this._transforms = [];
        }
        //add the translate to the x and y coordinates
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1509);
node.style.left = (x + this._getSkewOffsetValue(normalizedMatrix.dx)) + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1510);
node.style.top =  (y + this._getSkewOffsetValue(normalizedMatrix.dy)) + "px";
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getSkewOffsetValue", 1521);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1523);
var sign = Y.MatrixUtil.sign(val),
            absVal = Math.abs(val);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1525);
val = Math.min(absVal, 32767) * sign;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1526);
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
	 * @param {Number} x The value to translate on the x-axis.
	 * @param {Number} y The value to translate on the y-axis.
	 */
	translate: function(x, y)
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translate", 1563);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1565);
this._translateX += x;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1566);
this._translateY += y;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1567);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translateX", 1577);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1579);
this._translateX += x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1580);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translateY", 1590);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1592);
this._translateY += y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1593);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skew", 1603);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1605);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skewX", 1614);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1616);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skewY", 1625);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1627);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "rotate", 1636);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1638);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "scale", 1647);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1649);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "on", 1661);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1663);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1665);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1667);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateHandler", 1686);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1688);
var host = this,
            node = host.node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1690);
host._fillChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1691);
host._strokeChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1692);
node.style.width = this.get("width") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1693);
node.style.height = this.get("height") + "px"; 
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1694);
this._draw();
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1695);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphicNode", 1706);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1708);
type = type || this._type;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1709);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDefaultFill", 1719);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1720);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDefaultStroke", 1737);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1739);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "set", 1756);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1758);
var host = this;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1759);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1760);
if(host.initialized)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1762);
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
	 * @return Object
	 */
	getBounds: function()
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getBounds", 1775);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1777);
var isPathShape = this instanceof Y.VMLPath,
			w = this.get("width"),
			h = this.get("height"),
            x = this.get("x"),
            y = this.get("y");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1782);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1784);
x = x + this._left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1785);
y = y + this._top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1786);
w = this._right - this._left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1787);
h = this._bottom - this._top;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1789);
return this._getContentRect(w, h, x, y);
	},

    /**
     * Calculates the bounding box for the shape.
     *
     * @method _getContentRect
     * @param {Number} w width of the shape
     * @param {Number} h height of the shape
     * @param {Number} x x-coordinate of the shape
     * @param {Number} y y-coordinate of the shape
     * @private
     */
    _getContentRect: function(w, h, x, y)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getContentRect", 1802);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1804);
var transformOrigin = this.get("transformOrigin"),
            transformX = transformOrigin[0] * w,
            transformY = transformOrigin[1] * h,
		    transforms = this.matrix.getTransformArray(this.get("transform")),
            matrix = new Y.Matrix(),
            i = 0,
            len = transforms.length,
            transform,
            key,
            contentRect,
            isPathShape = this instanceof Y.VMLPath;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1815);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1817);
matrix.translate(this._left, this._top);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1819);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1820);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1821);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1822);
for(; i < len; i = i + 1)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1824);
transform = transforms[i];
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1825);
key = transform.shift();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1826);
if(key)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1828);
matrix[key].apply(matrix, transform); 
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1831);
matrix.translate(-transformX, -transformY);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1832);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1834);
matrix.translate(-this._left, -this._top);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1836);
contentRect = matrix.getContentRect(w, h, x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1837);
return contentRect;
    },

    /**
     * Places the shape above all other shapes.
     *
     * @method toFront
     */
    toFront: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "toFront", 1845);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1847);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1848);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1850);
graphic._toFront(this);
        }
    },

    /**
     * Places the shape underneath all other shapes.
     *
     * @method toFront
     */
    toBack: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "toBack", 1859);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1861);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1862);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1864);
graphic._toBack(this);
        }
    },

    /**
     * Parses path data string and call mapped methods.
     *
     * @method _parsePathData
     * @param {String} val The path data
     * @private
     */
    _parsePathData: function(val)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_parsePathData", 1875);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1877);
var method,
            methodSymbol,
            args,
            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),
            i = 0,
            len, 
            str,
            symbolToMethod = this._pathSymbolToMethod;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1885);
if(commandArray)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1887);
this.clear();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1888);
len = commandArray.length || 0;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1889);
for(; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1891);
str = commandArray[i];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1892);
methodSymbol = str.substr(0, 1),
                args = str.substr(1).match(SPLITARGSPATTERN);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1894);
method = symbolToMethod[methodSymbol];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1895);
if(method)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1897);
if(args)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1899);
this[method].apply(this, args);
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1903);
this[method].apply(this);
                    }
                }
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1907);
this.end();
        }
    },
	
    /**
     *  Destroys shape
     *
     *  @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "destroy", 1916);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1918);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1919);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1921);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1925);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_destroy", 1935);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1937);
if(this.node)
        {   
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1939);
if(this._fillNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1941);
this.node.removeChild(this._fillNode);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1942);
this._fillNode = null;
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1944);
if(this._strokeNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1946);
this.node.removeChild(this._strokeNode);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1947);
this._strokeNode = null;
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1949);
Y.one(this.node).remove(true);
        }
    }
}, Y.VMLDrawing.prototype));

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1954);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 1963);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1965);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 1999);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2001);
var i = 0,
                len,
                transform;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2004);
this.matrix.init();	
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2005);
this._normalizedMatrix.init();	
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2006);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2007);
len = this._transforms.length;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2008);
for(;i < len; ++i)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2010);
transform = this._transforms[i];
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2012);
this._transform = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2013);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2016);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2018);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 2049);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2051);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2054);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2056);
var node = this.node;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2057);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2059);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2061);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2090);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2091);
var node = this.node,
				visibility = val ? "visible" : "hidden";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2093);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2095);
node.style.visibility = visibility;
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2097);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2147);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2149);
var i,
				fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2153);
if(val)
			{
				//ensure, fill type is solid if color is explicitly passed.
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2156);
if(val.hasOwnProperty("color"))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2158);
val.type = "solid";
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2160);
for(i in val)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2162);
if(val.hasOwnProperty(i))
					{   
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2164);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2168);
fill = tmpl;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2169);
if(fill && fill.color)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2171);
if(fill.color === undefined || fill.color == "none")
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2173);
fill.color = null;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2176);
this._fillFlag = true;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2177);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2212);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2214);
var i,
				stroke,
                wt,
				tmpl = this.get("stroke") || this._getDefaultStroke();
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2218);
if(val)
			{
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2220);
if(val.hasOwnProperty("weight"))
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2222);
wt = parseInt(val.weight, 10);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2223);
if(!isNaN(wt))
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2225);
val.weight = wt;
                    }
                }
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2228);
for(i in val)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2230);
if(val.hasOwnProperty(i))
					{   
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2232);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2236);
stroke = tmpl;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2237);
this._strokeFlag = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2238);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2267);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2269);
return this.node;
		}
	},

    /**
     * Represents an SVG Path string.
     *
     * @config data
     * @type String
     */
    data: {
        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2280);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2282);
if(this.get("node"))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2284);
this._parsePathData(val);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2286);
return val;
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2299);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2301);
return this._graphic;
		}
	}
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2305);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2316);
VMLPath = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLPath", 2316);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2318);
VMLPath.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2321);
VMLPath.NAME = "path";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2322);
Y.extend(VMLPath, Y.VMLShape);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2323);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2331);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2333);
var val = Math.max(this._right - this._left, 0);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2334);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2345);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2347);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2361);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2363);
return this._path;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2367);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2378);
VMLRect = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLRect", 2378);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2380);
VMLRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2382);
VMLRect.NAME = "rect"; 
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2383);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2393);
VMLRect.ATTRS = Y.VMLShape.ATTRS;
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2394);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2405);
VMLEllipse = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLEllipse", 2405);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2407);
VMLEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2410);
VMLEllipse.NAME = "ellipse";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2412);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2422);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2432);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2434);
var val = this.get("width");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2435);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2436);
return val;
		},
		
		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2439);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2441);
var w = val * 2; 
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2442);
this.set("width", w);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2443);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2457);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2459);
var val = this.get("height");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2460);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2461);
return val;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2464);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2466);
var h = val * 2;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2467);
this.set("height", h);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2468);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2472);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2483);
VMLCircle = function(cfg)
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLCircle", 2483);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2485);
VMLCircle.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2488);
VMLCircle.NAME = "circle";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2490);
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

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2501);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2521);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2523);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2524);
return val;
        },

		getter: function()
		{   
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2527);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2529);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2531);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2542);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2544);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2545);
return val;
        },

		getter: function()
		{   
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2548);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2550);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2552);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2556);
Y.VMLCircle = VMLCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class VMLPieSlice
 * @constructor
 */
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2564);
VMLPieSlice = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLPieSlice", 2564);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2566);
VMLPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2568);
VMLPieSlice.NAME = "vmlPieSlice";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2569);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_draw", 2585);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2587);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2592);
this.clear();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2593);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2594);
this.end();
	}
 }, Y.VMLDrawing.prototype));
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2597);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2635);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2646);
VMLGraphic = function() {
    _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLGraphic", 2646);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2647);
VMLGraphic.superclass.constructor.apply(this, arguments);    
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2650);
VMLGraphic.NAME = "vmlGraphic";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2652);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 2668);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2670);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2673);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2675);
var node = this._node;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2676);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2678);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2680);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2694);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2696);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2709);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2711);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2724);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2726);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2737);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2739);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2741);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2743);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2754);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2756);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2758);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2760);
return val;
        }
    },

    /**
     *  Determines the sizing of the Graphic. 
     *
     *  <dl>
     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code> and <code>height</code>
     *      attributes or are determined by the dimensions of the parent element. The content contained in the Graphic will be sized to fit with in the Graphic instance's 
     *      dimensions. When using this setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>
     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the size and positioning of the content.</dd>
     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code> and <code>height</code>
     *      attributes or are determined by the dimensions of the parent element. The contents of the Graphic instance are not affected by this setting.</dd>
     *  </dl>
     *
     *
     *  @config autoSize
     *  @type Boolean | String
     *  @default false
     */
    autoSize: {
        value: false
    },

    /**
     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.
     *
     *  <dl>
     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary 
     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>
     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>
     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>
     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>
     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>
     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>
     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>
     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>
     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>
     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>
     *  </dl>
     * 
     * @config preserveAspectRatio
     * @type String
     * @default xMidYMid
     */
    preserveAspectRatio: {
        value: "xMidYMid"
    },

    /**
     * The contentBounds will resize to greater values but not values. (for performance)
     * When resizing the contentBounds down is desirable, set the resizeDown value to true.
     *
     * @config resizeDown 
     * @type Boolean
     */
    resizeDown: {
        resizeDown: false
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2828);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2830);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2833);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2835);
this._x = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2836);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2838);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2840);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2851);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2853);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2856);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2858);
this._y = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2859);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2861);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2863);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2883);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2885);
this._toggleVisible(val);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2886);
return val;
        }
    }
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2891);
Y.extend(VMLGraphic, Y.GraphicBase, {
    /**
     * Sets the value of an attribute.
     *
     * @method set
     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can 
     * be passed in to set multiple attributes at once.
     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as 
     * the name param.
     */
	set: function(attr, value) 
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "set", 2901);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2903);
var host = this,
            redrawAttrs = {
                autoDraw: true,
                autoSize: true,
                preserveAspectRatio: true,
                resizeDown: true
            },
            key,
            forceRedraw = false;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2912);
AttributeLite.prototype.set.apply(host, arguments);	
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2913);
if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2915);
if(Y_LANG.isString && redrawAttrs[attr])
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2917);
forceRedraw = true;
            }
            else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2919);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2921);
for(key in redrawAttrs)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2923);
if(redrawAttrs.hasOwnProperty(key) && attr[key])
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2925);
forceRedraw = true;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2926);
break;
                    }
                }
            }}
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2931);
if(forceRedraw)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2933);
host._redraw();
        }
	},

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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getXY", 2961);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2963);
var node = this.parentNode,
            x = this.get("x"),
            y = this.get("y"),
            xy;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2967);
if(node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2969);
xy = Y.one(node).getXY();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2970);
xy[0] += x;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2971);
xy[1] += y;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2975);
xy = Y.DOM._getOffset(this._node);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2977);
return xy;
    },

    /**
     * Initializes the class.
     *
     * @method initializer
     * @private
     */
    initializer: function(config) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "initializer", 2986);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2987);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2989);
this._shapes = {};
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2990);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2996);
this._node = this._createGraphic();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2997);
this._node.style.left = this.get("x") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2998);
this._node.style.top = this.get("y") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2999);
this._node.style.visibility = visibility;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3000);
this._node.setAttribute("id", this.get("id"));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3001);
if(render)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3003);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "render", 3013);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3014);
var parentNode = Y.one(render),
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3017);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3018);
parentNode.appendChild(this._node);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3019);
this.parentNode = parentNode;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3020);
this.set("width", w);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3021);
this.set("height", h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3022);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "destroy", 3030);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3032);
this.clear();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3033);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addShape", 3043);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3045);
cfg.graphic = this;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3046);
if(!this.get("visible"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3048);
cfg.visible = false;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3050);
var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3052);
this._appendShape(shape);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3053);
shape._appendStrokeAndFill();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3054);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_appendShape", 3064);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3066);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3068);
if(this.get("autoDraw") || this.get("autoSize") == "sizeContentToGraphic") 
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3070);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3074);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeShape", 3084);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3086);
if(!(shape instanceof VMLShape))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3088);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3090);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3093);
if(shape && (shape instanceof VMLShape))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3095);
shape._destroy();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3096);
this._shapes[shape.get("id")] = null;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3097);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3099);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3101);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeAllShapes", 3110);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3112);
var shapes = this._shapes,
            i;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3114);
for(i in shapes)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3116);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3118);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3121);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_removeChildren", 3131);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3133);
if(node.hasChildNodes())
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3135);
var child;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3136);
while(node.firstChild)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3138);
child = node.firstChild;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3139);
this._removeChildren(child);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3140);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "clear", 3150);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3151);
this.removeAllShapes();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3152);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toggleVisible", 3162);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3164);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3167);
if(shapes)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3169);
for(i in shapes)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3171);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3173);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3177);
if(this._node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3179);
this._node.style.visibility = visibility;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3181);
if(this._node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3183);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setSize", 3194);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3195);
w = Math.round(w);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3196);
h = Math.round(h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3197);
this._node.style.width = w + 'px';
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3198);
this._node.style.height = h + 'px';
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setPosition", 3208);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3210);
x = Math.round(x);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3211);
y = Math.round(y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3212);
this._node.style.left = x + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3213);
this._node.style.top = y + "px";
    },

    /**
     * Creates a group element
     *
     * @method _createGraphic
     * @private
     */
    _createGraphic: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphic", 3222);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3223);
var group = DOCUMENT.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);padding:0px 0px 0px 0px;display:block;position:absolute;top:0px;left:0px;zoom:1;" />');
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3224);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphicNode", 3236);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3238);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getShapeById", 3249);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3251);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getShapeClass", 3262);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3264);
var shape = this._shapeClass[val];
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3265);
if(shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3267);
return shape;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3269);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "batch", 3293);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3295);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3296);
this.set("autoDraw", false);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3297);
method.apply();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3298);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDocFrag", 3308);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3310);
if(!this._frag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3312);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3314);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addToRedrawQueue", 3324);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3326);
var shapeBox,
            box;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3328);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3329);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3331);
shapeBox = shape.getBounds();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3332);
box = this._contentBounds;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3333);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3334);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3335);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3336);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3337);
box.width = box.right - box.left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3338);
box.height = box.bottom - box.top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3339);
this._contentBounds = box;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3341);
if(this.get("autoDraw")) 
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3343);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_redraw", 3353);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3355);
var autoSize = this.get("autoSize"),
            preserveAspectRatio,
            node = this.parentNode,
            nodeWidth = parseFloat(node.getComputedStyle("width")),
            nodeHeight = parseFloat(node.getComputedStyle("height")),
            xCoordOrigin = 0,
            yCoordOrigin = 0,
            box = this.get("resizeDown") ? this._getUpdatedContentBounds() : this._contentBounds,
            left = box.left,
            right = box.right,
            top = box.top,
            bottom = box.bottom,
            contentWidth = right - left,
            contentHeight = bottom - top,
            aspectRatio,
            xCoordSize,
            yCoordSize,
            scaledWidth,
            scaledHeight,
            visible = this.get("visible");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3375);
this._node.style.visibility = "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3376);
if(autoSize)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3378);
if(autoSize == "sizeContentToGraphic")
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3380);
preserveAspectRatio = this.get("preserveAspectRatio");
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3381);
if(preserveAspectRatio == "none" || contentWidth/contentHeight === nodeWidth/nodeHeight)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3383);
xCoordOrigin = left;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3384);
yCoordOrigin = top;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3385);
xCoordSize = contentWidth;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3386);
yCoordSize = contentHeight;
                }
                else 
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3390);
if(contentWidth * nodeHeight/contentHeight > nodeWidth)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3392);
aspectRatio = nodeHeight/nodeWidth;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3393);
xCoordSize = contentWidth;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3394);
yCoordSize = contentWidth * aspectRatio;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3395);
scaledHeight = (nodeWidth * (contentHeight/contentWidth)) * (yCoordSize/nodeHeight);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3396);
yCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(5).toLowerCase(), scaledHeight, yCoordSize);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3397);
yCoordOrigin = top + yCoordOrigin;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3398);
xCoordOrigin = left;
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3402);
aspectRatio = nodeWidth/nodeHeight;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3403);
xCoordSize = contentHeight * aspectRatio;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3404);
yCoordSize = contentHeight;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3405);
scaledWidth = (nodeHeight * (contentWidth/contentHeight)) * (xCoordSize/nodeWidth);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3406);
xCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(1, 4).toLowerCase(), scaledWidth, xCoordSize);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3407);
xCoordOrigin = xCoordOrigin + left;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3408);
yCoordOrigin = top;
                    }
                }
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3411);
this._node.style.width = nodeWidth + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3412);
this._node.style.height = nodeHeight + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3413);
this._node.coordOrigin = xCoordOrigin + ", " + yCoordOrigin;
            }
            else 
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3417);
xCoordSize = contentWidth;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3418);
yCoordSize = contentHeight;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3419);
this._node.style.width = contentWidth + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3420);
this._node.style.height = contentHeight + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3421);
this._state.width = contentWidth;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3422);
this._state.height =  contentHeight;

            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3425);
this._node.coordSize = xCoordSize + ", " + yCoordSize;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3429);
this._node.style.width = nodeWidth + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3430);
this._node.style.height = nodeHeight + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3431);
this._node.coordSize = nodeWidth + ", " + nodeHeight;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3433);
if(this._frag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3435);
this._node.appendChild(this._frag);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3436);
this._frag = null;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3438);
if(visible)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3440);
this._node.style.visibility = "visible";
        }
    },
    
    /**
     * Determines the value for either an x or y coordinate to be used for the <code>coordOrigin</code> of the Graphic.
     *
     * @method _calculateCoordOrigin
     * @param {String} position The position for placement. Possible values are min, mid and max.
     * @param {Number} size The total scaled size of the content.
     * @param {Number} coordsSize The coordsSize for the Graphic.
     * @return Number
     * @private
     */
    _calculateCoordOrigin: function(position, size, coordsSize)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_calculateCoordOrigin", 3454);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3456);
var coord;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3457);
switch(position)
        {
            case "min" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3460);
coord = 0;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3461);
break;
            case "mid" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3463);
coord = (size - coordsSize)/2;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3464);
break;
            case "max" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3466);
coord = (size - coordsSize);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3467);
break;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3469);
return coord;
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getUpdatedContentBounds", 3479);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3481);
var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {};
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3486);
for(i in queue)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3488);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3490);
shape = queue[i];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3491);
bounds = shape.getBounds();
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3492);
box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3493);
box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3494);
box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3495);
box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3498);
box.left = Y_LANG.isNumber(box.left) ? box.left : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3499);
box.top = Y_LANG.isNumber(box.top) ? box.top : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3500);
box.right = Y_LANG.isNumber(box.right) ? box.right : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3501);
box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3502);
this._contentBounds = box;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3503);
return box;
    },

    /**
     * Inserts shape on the top of the tree.
     *
     * @method _toFront
     * @param {VMLShape} Shape to add.
     * @private
     */
    _toFront: function(shape)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toFront", 3513);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3515);
var contentNode = this._node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3516);
if(shape instanceof Y.VMLShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3518);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3520);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3522);
contentNode.appendChild(shape);
        }
    },

    /**
     * Inserts shape as the first child of the content node.
     *
     * @method _toBack
     * @param {VMLShape} Shape to add.
     * @private
     */
    _toBack: function(shape)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toBack", 3533);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3535);
var contentNode = this._node,
            targetNode;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3537);
if(shape instanceof Y.VMLShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3539);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3541);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3543);
targetNode = contentNode.firstChild;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3544);
if(targetNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3546);
contentNode.insertBefore(shape, targetNode);
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3550);
contentNode.appendChild(shape);
            }
        }
    }
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3555);
Y.VMLGraphic = VMLGraphic;



}, '@VERSION@', {"requires": ["graphics"]});
