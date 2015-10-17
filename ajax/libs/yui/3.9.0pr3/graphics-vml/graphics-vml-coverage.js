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
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].code=["YUI.add('graphics-vml', function (Y, NAME) {","","var IMPLEMENTATION = \"vml\",","    SHAPE = \"shape\",","	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,","    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\\.][0-9]*/g,","    Y_LANG = Y.Lang,","    IS_NUM = Y_LANG.isNumber,","    IS_ARRAY = Y_LANG.isArray,","    IS_STRING = Y_LANG.isString,","    Y_DOM = Y.DOM,","    Y_SELECTOR = Y.Selector,","    DOCUMENT = Y.config.doc,","    AttributeLite = Y.AttributeLite,","	VMLShape,","	VMLCircle,","	VMLPath,","	VMLRect,","	VMLEllipse,","	VMLGraphic,","    VMLPieSlice,","    _getClassName = Y.ClassNameManager.getClassName;","","function VMLDrawing() {}","","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class."," * `VMLDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Drawing.html\">`Drawing`</a> class will point to the `VMLDrawing` class."," *"," * @module graphics"," * @class VMLDrawing"," * @constructor"," */","VMLDrawing.prototype = {","    /**","     * Maps path to methods","     *","     * @property _pathSymbolToMethod","     * @type Object","     * @private","     */","    _pathSymbolToMethod: {","        M: \"moveTo\",","        m: \"relativeMoveTo\",","        L: \"lineTo\",","        l: \"relativeLineTo\",","        C: \"curveTo\",","        c: \"relativeCurveTo\",","        Q: \"quadraticCurveTo\",","        q: \"relativeQuadraticCurveTo\",","        z: \"closePath\",","        Z: \"closePath\"","    },","","    /**","     * Value for rounding up to coordsize","     *","     * @property _coordSpaceMultiplier","     * @type Number","     * @private","     */","    _coordSpaceMultiplier: 100,","","    /**","     * Rounds dimensions and position values based on the coordinate space.","     *","     * @method _round","     * @param {Number} The value for rounding","     * @return Number","     * @private","     */","    _round:function(val)","    {","        return Math.round(val * this._coordSpaceMultiplier);","    },","","    /**","     * Concatanates the path.","     *","     * @method _addToPath","     * @param {String} val The value to add to the path string.","     * @private","     */","    _addToPath: function(val)","    {","        this._path = this._path || \"\";","        if(this._movePath)","        {","            this._path += this._movePath;","            this._movePath = null;","        }","        this._path += val;","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    curveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a bezier curve.","     *","     * @method relativeCurveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeCurveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements curveTo methods.","     *","     * @method _curveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _curveTo: function(args, relative) {","        var w,","            h,","            x,","            y,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len,","            path,","            command = relative ? \" v \" : \" c \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        len = args.length - 5;","        path = command;","        for(i = 0; i < len; i = i + 6)","        {","            cp1x = parseFloat(args[i]);","            cp1y = parseFloat(args[i + 1]);","            cp2x = parseFloat(args[i + 2]);","            cp2y = parseFloat(args[i + 3]);","            x = parseFloat(args[i + 4]);","            y = parseFloat(args[i + 5]);","            if(i > 0)","            {","                path = path + \", \";","            }","            path = path + this._round(cp1x) + \", \" + this._round(cp1y) + \", \" + this._round(cp2x) + \", \" + this._round(cp2y) + \", \" + this._round(x) + \", \" + this._round(y);","            cp1x = cp1x + relativeX;","            cp1y = cp1y + relativeY;","            cp2x = cp2x + relativeX;","            cp2y = cp2y + relativeY;","            x = x + relativeX;","            y = y + relativeY;","            right = Math.max(x, Math.max(cp1x, cp2x));","            bottom = Math.max(y, Math.max(cp1y, cp2y));","            left = Math.min(x, Math.min(cp1x, cp2x));","            top = Math.min(y, Math.min(cp1y, cp2y));","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","        this._addToPath(path);","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    quadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a quadratic bezier curve relative to the current position.","     *","     * @method relativeQuadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeQuadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements quadraticCurveTo methods.","     *","     * @method _quadraticCurveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _quadraticCurveTo: function(args, relative) {","        var cpx,","            cpy,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            x,","            y,","            currentX = this._currentX,","            currentY = this._currentY,","            i,","            len = args.length - 3,","            bezierArgs = [],","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        for(i = 0; i < len; i = i + 4)","        {","            cpx = parseFloat(args[i]) + relativeX;","            cpy = parseFloat(args[i + 1]) + relativeY;","            x = parseFloat(args[i + 2]) + relativeX;","            y = parseFloat(args[i + 3]) + relativeY;","            cp1x = currentX + 0.67*(cpx - currentX);","            cp1y = currentY + 0.67*(cpy - currentY);","            cp2x = cp1x + (x - currentX) * 0.34;","            cp2y = cp1y + (y - currentY) * 0.34;","            bezierArgs.push(cp1x);","            bezierArgs.push(cp1y);","            bezierArgs.push(cp2x);","            bezierArgs.push(cp2y);","            bezierArgs.push(x);","            bezierArgs.push(y);","        }","        this._curveTo.apply(this, [bezierArgs, false]);","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     */","    drawRect: function(x, y, w, h) {","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        this._currentX = x;","        this._currentY = y;","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     * @chainable","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        this.moveTo(x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @chainable","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 360,","            circum = radius * 2;","","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this.moveTo((x + circum), (y + radius));","        this._addToPath(\" ae \" + this._round(x + radius) + \", \" + this._round(y + radius) + \", \" + this._round(radius) + \", \" + this._round(radius) + \", \" + startAngle + \", \" + endAngle);","        return this;","    },","","    /**","     * Draws an ellipse.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var startAngle = 0,","            endAngle = 360,","            radius = w * 0.5,","            yRadius = h * 0.5;","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + w, y + h);","        this.moveTo((x + w), (y + yRadius));","        this._addToPath(\" ae \" + this._round(x + radius) + \", \" + this._round(x + radius) + \", \" + this._round(y + yRadius) + \", \" + this._round(radius) + \", \" + this._round(yRadius) + \", \" + startAngle + \", \" + endAngle);","        return this;","    },","","    /**","     * Draws a diamond.","     *","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @chainable","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @chainable","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius)","    {","        var diameter = radius * 2;","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","        this._currentX = x;","        this._currentY = y;","        startAngle *= -65535;","        arc *= 65536;","        startAngle = Math.round(startAngle);","        arc = Math.round(arc);","        this.moveTo(x, y);","        this._addToPath(\" ae \" + this._round(x) + \", \" + this._round(y) + \", \" + this._round(radius) + \" \" + this._round(radius) + \", \" +  startAngle + \", \" + arc);","        this._trackSize(diameter, diameter);","        return this;","    },","","    /**","     * Draws a line segment from the current drawing position to the specified x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    lineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a line segment using the current line style from the current drawing position to the relative x and y coordinates.","     *","     * @method relativeLineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    relativeLineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements lineTo methods.","     *","     * @method _lineTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _lineTo: function(args, relative) {","        var point1 = args[0],","            i,","            len,","            x,","            y,","            path = relative ? \" r \" : \" l \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        if (typeof point1 == \"string\" || typeof point1 == \"number\") {","            len = args.length - 1;","            for (i = 0; i < len; i = i + 2) {","                x = parseFloat(args[i]);","                y = parseFloat(args[i + 1]);","                path += ' ' + this._round(x) + ', ' + this._round(y);","                x = x + relativeX;","                y = y + relativeY;","                this._currentX = x;","                this._currentY = y;","                this._trackSize.apply(this, [x, y]);","            }","        }","        else","        {","            len = args.length;","            for (i = 0; i < len; i = i + 1) {","                x = parseFloat(args[i][0]);","                y = parseFloat(args[i][1]);","                path += ' ' + this._round(x) + ', ' + this._round(y);","                x = x + relativeX;","                y = y + relativeY;","                this._currentX = x;","                this._currentY = y;","                this._trackSize.apply(this, [x, y]);","            }","        }","        this._addToPath(path);","        return this;","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    moveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Moves the current drawing position relative to specified x and y coordinates.","     *","     * @method relativeMoveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeMoveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements moveTo methods.","     *","     * @method _moveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _moveTo: function(args, relative) {","        var x = parseFloat(args[0]),","            y = parseFloat(args[1]),","            command = relative ? \" t \" : \" m \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        this._movePath = command + this._round(x) + \", \" + this._round(y);","        x = x + relativeX;","        y = y + relativeY;","        this._trackSize(x, y);","        this._currentX = x;","        this._currentY = y;","    },","","    /**","     * Draws the graphic.","     *","     * @method _draw","     * @private","     */","    _closePath: function()","    {","        var fill = this.get(\"fill\"),","            stroke = this.get(\"stroke\"),","            node = this.node,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            path = this._path,","            pathEnd = \"\",","            multiplier = this._coordSpaceMultiplier;","        this._fillChangeHandler();","        this._strokeChangeHandler();","        if(path)","        {","            if(fill && fill.color)","            {","                pathEnd += ' x';","            }","            if(stroke)","            {","                pathEnd += ' e';","            }","        }","        if(path)","        {","            node.path = path + pathEnd;","        }","        if(!isNaN(w) && !isNaN(h))","        {","            node.coordOrigin = this._left + \", \" + this._top;","            node.coordSize = (w * multiplier) + \", \" + (h * multiplier);","            node.style.position = \"absolute\";","            node.style.width =  w + \"px\";","            node.style.height =  h + \"px\";","        }","        this._path = path;","        this._movePath = null;","        this._updateTransform();","    },","","    /**","     * Completes a drawing operation.","     *","     * @method end","     * @chainable","     */","    end: function()","    {","        this._closePath();","        return this;","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     * @chainable","     */","    closePath: function()","    {","        this._addToPath(\" x e\");","        return this;","    },","","    /**","     * Clears the path.","     *","     * @method clear","     * @chainable","     */","    clear: function()","    {","		this._right = 0;","        this._bottom = 0;","        this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._path = \"\";","        this._movePath = null;","        return this;","    },","","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];","            }","        }","        return [ tmp[0][0], tmp[0][1] ];","    },","","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            xy;","        for(i = 0; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right, bottom);","        this._trackSize(left, top);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom)","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    },","","    _left: 0,","","    _right: 0,","","    _top: 0,","","    _bottom: 0,","","    _width: 0,","","    _height: 0","};","Y.VMLDrawing = VMLDrawing;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class."," * `VMLShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Shape.html\">`Shape`</a> class will point to the `VMLShape` class."," *"," * @module graphics"," * @class VMLShape"," * @constructor"," * @param {Object} cfg (optional) Attribute configs"," */","VMLShape = function()","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    this._normalizedMatrix = new Y.Matrix();","    VMLShape.superclass.constructor.apply(this, arguments);","};","","VMLShape.NAME = \"shape\";","","Y.extend(VMLShape, Y.GraphicBase, Y.mix({","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"shape\",","","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","	init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic,","            data = this.get(\"data\");","		host.createNode();","        if(graphic)","        {","            this._setGraphic(graphic);","        }","        if(data)","        {","            host._parsePathData(data);","        }","        this._updateHandler();","	},","","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a","     * `Graphic` instance, it will be assigned to the `graphic` attribute. Otherwise, a new Graphic instance will be created","     * and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.VMLGraphic)","        {","            this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.VMLGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","            this._appendStrokeAndFill();","        }","    },","","    /**","     * Appends fill and stroke nodes to the shape.","     *","     * @method _appendStrokeAndFill","     * @private","     */","    _appendStrokeAndFill: function()","    {","        if(this._strokeNode)","        {","            this.node.appendChild(this._strokeNode);","        }","        if(this._fillNode)","        {","            this.node.appendChild(this._fillNode);","        }","    },","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","        var node,","            concat = this._camelCaseConcat,","			x = this.get(\"x\"),","			y = this.get(\"y\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","			id,","			type,","			name = this.name,","            nodestring,","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","			strokestring,","			classString,","			stroke,","			endcap,","			opacity,","			joinstyle,","			miterlimit,","			dashstyle,","			fill,","			fillstring;","			id = this.get(\"id\");","		type = this._type == \"path\" ? \"shape\" : this._type;","        classString = _getClassName(SHAPE) + \" \" + _getClassName(concat(IMPLEMENTATION, SHAPE)) + \" \" + _getClassName(name) + \" \" + _getClassName(concat(IMPLEMENTATION, name)) + \" \" + IMPLEMENTATION + type;","        stroke = this._getStrokeProps();","        fill = this._getFillProps();","","		nodestring  = '<' + type + '  xmlns=\"urn:schemas-microsft.com:vml\" id=\"' + id + '\" class=\"' + classString + '\" style=\"behavior:url(#default#VML);display:inline-block;position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;visibility:' + visibility + '\"';","","        if(stroke && stroke.weight && stroke.weight > 0)","        {","            endcap = stroke.endcap;","            opacity = parseFloat(stroke.opacity);","            joinstyle = stroke.joinstyle;","            miterlimit = stroke.miterlimit;","            dashstyle = stroke.dashstyle;","            nodestring += ' stroked=\"t\" strokecolor=\"' + stroke.color + '\" strokeWeight=\"' + stroke.weight + 'px\"';","","            strokestring = '<stroke class=\"vmlstroke\" xmlns=\"urn:schemas-microsft.com:vml\" on=\"t\" style=\"behavior:url(#default#VML);display:inline-block;\"';","            strokestring += ' opacity=\"' + opacity + '\"';","            if(endcap)","            {","                strokestring += ' endcap=\"' + endcap + '\"';","            }","            if(joinstyle)","            {","                strokestring += ' joinstyle=\"' + joinstyle + '\"';","            }","            if(miterlimit)","            {","                strokestring += ' miterlimit=\"' + miterlimit + '\"';","            }","            if(dashstyle)","            {","                strokestring += ' dashstyle=\"' + dashstyle + '\"';","            }","            strokestring += '></stroke>';","            this._strokeNode = DOCUMENT.createElement(strokestring);","            nodestring += ' stroked=\"t\"';","        }","        else","        {","            nodestring += ' stroked=\"f\"';","        }","        if(fill)","        {","            if(fill.node)","            {","                fillstring = fill.node;","                this._fillNode = DOCUMENT.createElement(fillstring);","            }","            if(fill.color)","            {","                nodestring += ' fillcolor=\"' + fill.color + '\"';","            }","            nodestring += ' filled=\"' + fill.filled + '\"';","        }","","","        nodestring += '>';","        nodestring += '</' + type + '>';","","        node = DOCUMENT.createElement(nodestring);","","        this.node = node;","        this._strokeFlag = false;","        this._fillFlag = false;","	},","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute","	 */","	addClass: function(className)","	{","		var node = this.node;","		Y_DOM.addClass(node, className);","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = this.node;","		Y_DOM.removeClass(node, className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains x & y values for new position (coordinates are page-based)","     *","	 */","	setXY: function(xy)","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY();","		this.set(\"x\", xy[0] - parentXY[0]);","		this.set(\"y\", xy[1] - parentXY[1]);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.","	 *","	 * @method contains","	 * @param {VMLShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","","		return node === refNode;","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y_SELECTOR.test(this.node, selector);","	},","","	/**","     * Calculates and returns properties for setting an initial stroke.","     *","     * @method _getStrokeProps","     * @return Object","     *","	 * @private","	 */","    _getStrokeProps: function()","    {","		var props,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","        if(stroke && stroke.weight && stroke.weight > 0)","		{","			props = {};","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","            if(linecap != \"round\" && linecap != \"square\")","            {","                linecap = \"flat\";","            }","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			props.stroked = true;","			props.color = stroke.color;","			props.weight = stroke.weight;","			props.endcap = linecap;","			props.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin == \"round\" || linejoin == \"bevel\")","			{","				props.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					props.miterlimit = Math.max(linejoin, 1);","					props.joinstyle = \"miter\";","				}","			}","			props.dashstyle = dash;","        }","        return props;","    },","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","	 * @private","	 */","	_strokeChangeHandler: function(e)","	{","        if(!this._strokeFlag)","        {","            return;","        }","		var node = this.node,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","		if(stroke && stroke.weight && stroke.weight > 0)","		{","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","			if(linecap != \"round\" && linecap != \"square\")","			{","				linecap = \"flat\";","			}","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			node.stroked = true;","			node.strokeColor = stroke.color;","			node.strokeWeight = stroke.weight + \"px\";","			if(!this._strokeNode)","			{","				this._strokeNode = this._createGraphicNode(\"stroke\");","				node.appendChild(this._strokeNode);","			}","			this._strokeNode.endcap = linecap;","			this._strokeNode.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin == \"round\" || linejoin == \"bevel\")","			{","				this._strokeNode.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					this._strokeNode.miterlimit = Math.max(linejoin, 1);","					this._strokeNode.joinstyle = \"miter\";","				}","			}","			this._strokeNode.dashstyle = dash;","            this._strokeNode.on = true;","		}","		else","		{","            if(this._strokeNode)","            {","                this._strokeNode.on = false;","            }","			node.stroked = false;","		}","        this._strokeFlag = false;","	},","","	/**","     * Calculates and returns properties for setting an initial fill.","     *","     * @method _getFillProps","     * @return Object","     *","	 * @private","	 */","	_getFillProps: function()","	{","		var fill = this.get(\"fill\"),","			fillOpacity,","			props,","			gradient,","			i,","			fillstring,","			filled = false;","		if(fill)","		{","			props = {};","","			if(fill.type == \"radial\" || fill.type == \"linear\")","			{","				fillOpacity = parseFloat(fill.opacity);","				fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;","				filled = true;","				gradient = this._getGradientFill(fill);","				fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" opacity=\"' + fillOpacity + '\"';","				for(i in gradient)","				{","					if(gradient.hasOwnProperty(i))","					{","						fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","					}","				}","				fillstring += ' />';","				props.node = fillstring;","			}","			else if(fill.color)","			{","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","                props.color = fill.color;","				if(IS_NUM(fillOpacity))","				{","					fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);","                    props.opacity = fillOpacity;","                    if(fillOpacity < 1)","                    {","                        props.node = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" type=\"solid\" opacity=\"' + fillOpacity + '\"/>';","                    }","                }","			}","			props.filled = filled;","		}","		return props;","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _fillChangeHandler","	 * @private","	 */","	_fillChangeHandler: function(e)","	{","        if(!this._fillFlag)","        {","            return;","        }","		var node = this.node,","			fill = this.get(\"fill\"),","			fillOpacity,","			fillstring,","			filled = false,","            i,","            gradient;","		if(fill)","		{","			if(fill.type == \"radial\" || fill.type == \"linear\")","			{","				filled = true;","				gradient = this._getGradientFill(fill);","                if(this._fillNode)","                {","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            if(i == \"colors\")","                            {","                                this._fillNode.colors.value = gradient[i];","                            }","                            else","                            {","                                this._fillNode[i] = gradient[i];","                            }","                        }","                    }","                }","                else","                {","                    fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\"';","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","                        }","                    }","                    fillstring += ' />';","                    this._fillNode = DOCUMENT.createElement(fillstring);","                    node.appendChild(this._fillNode);","                }","			}","			else if(fill.color)","			{","                node.fillcolor = fill.color;","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","				if(IS_NUM(fillOpacity) && fillOpacity < 1)","				{","					fill.opacity = fillOpacity;","                    if(this._fillNode)","					{","                        if(this._fillNode.getAttribute(\"type\") != \"solid\")","                        {","                            this._fillNode.type = \"solid\";","                        }","						this._fillNode.opacity = fillOpacity;","					}","					else","					{","                        fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\" class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\" type=\"solid\" opacity=\"' + fillOpacity + '\"/>';","                        this._fillNode = DOCUMENT.createElement(fillstring);","                        node.appendChild(this._fillNode);","					}","				}","				else if(this._fillNode)","                {","                    this._fillNode.opacity = 1;","                    this._fillNode.type = \"solid\";","				}","			}","		}","		node.filled = filled;","        this._fillFlag = false;","	},","","	//not used. remove next release.","    _updateFillNode: function(node)","	{","		if(!this._fillNode)","		{","			this._fillNode = this._createGraphicNode(\"fill\");","			node.appendChild(this._fillNode);","		}","	},","","    /**","     * Calculates and returns an object containing gradient properties for a fill node.","     *","     * @method _getGradientFill","     * @param {Object} fill Object containing fill properties.","     * @return Object","     * @private","     */","	_getGradientFill: function(fill)","	{","		var gradientProps = {},","			gradientBoxWidth,","			gradientBoxHeight,","			type = fill.type,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			isNumber = IS_NUM,","			stop,","			stops = fill.stops,","			len = stops.length,","			opacity,","			color,","			i,","			oi,","			colorstring = \"\",","			cx = fill.cx,","			cy = fill.cy,","			fx = fill.fx,","			fy = fill.fy,","			r = fill.r,","            pct,","			rotation = fill.rotation || 0;","		if(type === \"linear\")","		{","            if(rotation <= 270)","            {","                rotation = Math.abs(rotation - 270);","            }","			else if(rotation < 360)","            {","                rotation = 270 + (360 - rotation);","            }","            else","            {","                rotation = 270;","            }","            gradientProps.type = \"gradient\";//\"gradientunscaled\";","			gradientProps.angle = rotation;","		}","		else if(type === \"radial\")","		{","			gradientBoxWidth = w * (r * 2);","			gradientBoxHeight = h * (r * 2);","			fx = r * 2 * (fx - 0.5);","			fy = r * 2 * (fy - 0.5);","			fx += cx;","			fy += cy;","			gradientProps.focussize = (gradientBoxWidth/w)/10 + \"% \" + (gradientBoxHeight/h)/10 + \"%\";","			gradientProps.alignshape = false;","			gradientProps.type = \"gradientradial\";","			gradientProps.focus = \"100%\";","			gradientProps.focusposition = Math.round(fx * 100) + \"% \" + Math.round(fy * 100) + \"%\";","		}","		for(i = 0;i < len; ++i) {","			stop = stops[i];","			color = stop.color;","			opacity = stop.opacity;","			opacity = isNumber(opacity) ? opacity : 1;","			pct = stop.offset || i/(len-1);","			pct *= (r * 2);","            pct = Math.round(100 * pct) + \"%\";","            oi = i > 0 ? i + 1 : \"\";","            gradientProps[\"opacity\" + oi] = opacity + \"\";","            colorstring += \", \" + pct + \" \" + color;","		}","		if(parseFloat(pct) < 100)","		{","			colorstring += \", 100% \" + color;","		}","		gradientProps.colors = colorstring.substr(2);","		return gradientProps;","	},","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","            key,","			transform,","			transformOrigin,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            tx,","            ty,","            matrix = this.matrix,","            normalizedMatrix = this._normalizedMatrix,","            isPathShape = this instanceof Y.VMLPath,","            i,","            len = this._transforms.length;","        if(this._transforms && this._transforms.length > 0)","		{","            transformOrigin = this.get(\"transformOrigin\");","","            if(isPathShape)","            {","                normalizedMatrix.translate(this._left, this._top);","            }","            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.","            //subtract 0.5 from values","            tx = transformOrigin[0] - 0.5;","            ty = transformOrigin[1] - 0.5;","","            //ensure the values are within the appropriate range to avoid errors","            tx = Math.max(-0.5, Math.min(0.5, tx));","            ty = Math.max(-0.5, Math.min(0.5, ty));","            for(i = 0; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]);","                    matrix[key].apply(matrix, this._transforms[i]);","                }","			}","            if(isPathShape)","            {","                normalizedMatrix.translate(-this._left, -this._top);","            }","            transform = normalizedMatrix.a + \",\" +","                        normalizedMatrix.c + \",\" +","                        normalizedMatrix.b + \",\" +","                        normalizedMatrix.d + \",\" +","                        0 + \",\" +","                        0;","		}","        this._graphic.addToRedrawQueue(this);","        if(transform)","        {","            if(!this._skew)","            {","                this._skew = DOCUMENT.createElement( '<skew class=\"vmlskew\" xmlns=\"urn:schemas-microsft.com:vml\" on=\"false\" style=\"behavior:url(#default#VML);display:inline-block;\" />');","                this.node.appendChild(this._skew);","            }","            this._skew.matrix = transform;","            this._skew.on = true;","            //this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + \"px, \" + this._getSkewOffsetValue(normalizedMatrix.dy) + \"px\";","            this._skew.origin = tx + \", \" + ty;","        }","        if(this._type != \"path\")","        {","            this._transforms = [];","        }","        //add the translate to the x and y coordinates","        node.style.left = (x + this._getSkewOffsetValue(normalizedMatrix.dx)) + \"px\";","        node.style.top =  (y + this._getSkewOffsetValue(normalizedMatrix.dy)) + \"px\";","    },","","    /**","     * Normalizes the skew offset values between -32767 and 32767.","     *","     * @method _getSkewOffsetValue","     * @param {Number} val The value to normalize","     * @return Number","     * @private","     */","    _getSkewOffsetValue: function(val)","    {","        var sign = Y.MatrixUtil.sign(val),","            absVal = Math.abs(val);","        val = Math.min(absVal, 32767) * sign;","        return val;","    },","","	/**","	 * Storage for translateX","	 *","     * @property _translateX","     * @type Number","	 * @private","	 */","	_translateX: 0,","","	/**","	 * Storage for translateY","	 *","     * @property _translateY","     * @type Number","	 * @private","	 */","	_translateY: 0,","","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","","    /**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to translate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y)","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","     skewX: function(x)","     {","        this._addTransform(\"skewX\", arguments);","     },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","     skewY: function(y)","     {","        this._addTransform(\"skewY\", arguments);","     },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","     rotate: function(deg)","     {","        this._addTransform(\"rotate\", arguments);","     },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","    scale: function(x, y)","    {","        this._addTransform(\"scale\", arguments);","    },","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so,","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function(e)","	{","		var host = this,","            node = host.node;","        host._fillChangeHandler();","        host._strokeChangeHandler();","        node.style.width = this.get(\"width\") + \"px\";","        node.style.height = this.get(\"height\") + \"px\";","        this._draw();","		host._updateTransform();","	},","","	/**","	 * Creates a graphic node","	 *","	 * @method _createGraphicNode","	 * @param {String} type node type to create","	 * @return HTMLElement","	 * @private","	 */","	_createGraphicNode: function(type)","	{","		type = type || this._type;","		return DOCUMENT.createElement('<' + type + ' xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);display:inline-block;\" class=\"vml' + type + '\"/>');","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @private","	 * @method _getDefaultFill","	 * @return Object","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			opacity: 1,","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @private","	 * @method _getDefaultStroke","	 * @return Object","	 */","	_getDefaultStroke: function()","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this;","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox.","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var isPathShape = this instanceof Y.VMLPath,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","            x = this.get(\"x\"),","            y = this.get(\"y\");","        if(isPathShape)","        {","            x = x + this._left;","            y = y + this._top;","            w = this._right - this._left;","            h = this._bottom - this._top;","        }","        return this._getContentRect(w, h, x, y);","	},","","    /**","     * Calculates the bounding box for the shape.","     *","     * @method _getContentRect","     * @param {Number} w width of the shape","     * @param {Number} h height of the shape","     * @param {Number} x x-coordinate of the shape","     * @param {Number} y y-coordinate of the shape","     * @private","     */","    _getContentRect: function(w, h, x, y)","    {","        var transformOrigin = this.get(\"transformOrigin\"),","            transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h,","            transforms = this.matrix.getTransformArray(this.get(\"transform\")),","            matrix = new Y.Matrix(),","            i,","            len = transforms.length,","            transform,","            key,","            contentRect,","            isPathShape = this instanceof Y.VMLPath;","        if(isPathShape)","        {","            matrix.translate(this._left, this._top);","        }","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        for(i = 0; i < len; i = i + 1)","        {","            transform = transforms[i];","            key = transform.shift();","            if(key)","            {","                matrix[key].apply(matrix, transform);","            }","        }","        matrix.translate(-transformX, -transformY);","        if(isPathShape)","        {","            matrix.translate(-this._left, -this._top);","        }","        contentRect = matrix.getContentRect(w, h, x, y);","        return contentRect;","    },","","    /**","     * Places the shape above all other shapes.","     *","     * @method toFront","     */","    toFront: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toFront(this);","        }","    },","","    /**","     * Places the shape underneath all other shapes.","     *","     * @method toFront","     */","    toBack: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toBack(this);","        }","    },","","    /**","     * Parses path data string and call mapped methods.","     *","     * @method _parsePathData","     * @param {String} val The path data","     * @private","     */","    _parsePathData: function(val)","    {","        var method,","            methodSymbol,","            args,","            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),","            i,","            len,","            str,","            symbolToMethod = this._pathSymbolToMethod;","        if(commandArray)","        {","            this.clear();","            len = commandArray.length || 0;","            for(i = 0; i < len; i = i + 1)","            {","                str = commandArray[i];","                methodSymbol = str.substr(0, 1);","                args = str.substr(1).match(SPLITARGSPATTERN);","                method = symbolToMethod[methodSymbol];","                if(method)","                {","                    if(args)","                    {","                        this[method].apply(this, args);","                    }","                    else","                    {","                        this[method].apply(this);","                    }","                }","            }","            this.end();","        }","    },","","    /**","     *  Destroys shape","     *","     *  @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {","            if(this._fillNode)","            {","                this.node.removeChild(this._fillNode);","                this._fillNode = null;","            }","            if(this._strokeNode)","            {","                this.node.removeChild(this._strokeNode);","                this._strokeNode = null;","            }","            Y.one(this.node).remove(true);","        }","    }","}, Y.VMLDrawing.prototype));","","VMLShape.ATTRS = {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains","     * corresponding methods for each transform that will apply the transform to the current matrix. The below code illustrates how you might use the","     * `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String","	 */","	transform: {","		setter: function(val)","		{","            var i,","                len,","                transform;","            this.matrix.init();","            this._normalizedMatrix.init();","            this._transforms = this.matrix.getTransformArray(val);","            len = this._transforms.length;","            for(i = 0;i < len; ++i)","            {","                transform = this._transforms[i];","            }","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","	/**","	 *","	 * @config width","	 */","	width: {","		value: 0","	},","","	/**","	 *","	 * @config height","	 */","	height: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.node,","				visibility = val ? \"visible\" : \"hidden\";","			if(node)","			{","				node.style.visibility = visibility;","			}","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1.","     *              Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd>","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the","     *      flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and","     *          `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape`","     *          classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p>","	 *","	 * @config fill","	 * @type Object","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","","		setter: function(val)","		{","			var i,","				fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","","			if(val)","			{","				//ensure, fill type is solid if color is explicitly passed.","				if(val.hasOwnProperty(\"color\"))","				{","					val.type = \"solid\";","				}","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{","						tmpl[i] = val[i];","					}","				}","			}","			fill = tmpl;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color == \"none\")","				{","					fill.color = null;","				}","			}","			this._fillFlag = true;","            return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set","     *      to an array, the first index indicates the length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin","     *              of miter, you simply specify the limit as opposed to having separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","","		setter: function(val)","		{","			var i,","				stroke,","                wt,","				tmpl = this.get(\"stroke\") || this._getDefaultStroke();","			if(val)","			{","                if(val.hasOwnProperty(\"weight\"))","                {","                    wt = parseInt(val.weight, 10);","                    if(!isNaN(wt))","                    {","                        val.weight = wt;","                    }","                }","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{","						tmpl[i] = val[i];","					}","				}","			}","			stroke = tmpl;","            this._strokeFlag = true;","			return stroke;","		}","	},","","	//Not used. Remove in future.","    autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	//","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","	/**","	 * Dom node for the shape.","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","    /**","     * Represents an SVG Path string. This will be parsed and added to shape's API to represent the SVG data across all","     * implementations. Note that when using VML or SVG implementations, part of this content will be added to the DOM using","     * respective VML/SVG attributes. If your content comes from an untrusted source, you will need to ensure that no","     * malicious code is included in that content.","     *","     * @config data","     * @type String","     */","    data: {","        setter: function(val)","        {","            if(this.get(\"node\"))","            {","                this._parsePathData(val);","            }","            return val;","        }","    },","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","	}","};","Y.VMLShape = VMLShape;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Path.html\">`Path`</a> class."," * `VMLPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Path.html\">`Path`</a> class will point to the `VMLPath` class."," *"," * @module graphics"," * @class VMLPath"," * @extends VMLShape"," */","VMLPath = function()","{","	VMLPath.superclass.constructor.apply(this, arguments);","};","","VMLPath.NAME = \"path\";","Y.extend(VMLPath, Y.VMLShape);","VMLPath.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var val = Math.max(this._right - this._left, 0);","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			return Math.max(this._bottom - this._top, 0);","		}","	},","","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","		readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.VMLPath = VMLPath;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class."," * `VMLRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Rect.html\">`Rect`</a> class will point to the `VMLRect` class."," *"," * @module graphics"," * @class VMLRect"," * @constructor"," */","VMLRect = function()","{","	VMLRect.superclass.constructor.apply(this, arguments);","};","VMLRect.NAME = \"rect\";","Y.extend(VMLRect, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\"","});","VMLRect.ATTRS = Y.VMLShape.ATTRS;","Y.VMLRect = VMLRect;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * `VMLEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a> class will point to the `VMLEllipse` class."," *"," * @module graphics"," * @class VMLEllipse"," * @constructor"," */","VMLEllipse = function()","{","	VMLEllipse.superclass.constructor.apply(this, arguments);","};","","VMLEllipse.NAME = \"ellipse\";","","Y.extend(VMLEllipse, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","VMLEllipse.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse.","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		lazyAdd: false,","","		getter: function()","		{","			var val = this.get(\"width\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","","		setter: function(val)","		{","			var w = val * 2;","			this.set(\"width\", w);","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse.","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		lazyAdd: false,","","		getter: function()","		{","			var val = this.get(\"height\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","","		setter: function(val)","		{","			var h = val * 2;","			this.set(\"height\", h);","			return val;","		}","	}","});","Y.VMLEllipse = VMLEllipse;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class."," * `VMLCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Circle.html\">`Circle`</a> class will point to the `VMLCircle` class."," *"," * @module graphics"," * @class VMLCircle"," * @constructor"," */","VMLCircle = function(cfg)","{","	VMLCircle.superclass.constructor.apply(this, arguments);","};","","VMLCircle.NAME = \"circle\";","","Y.extend(VMLCircle, VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","","VMLCircle.ATTRS = Y.merge(VMLShape.ATTRS, {","	/**","	 * Radius for the circle.","	 *","	 * @config radius","	 * @type Number","	 */","	radius: {","		lazyAdd: false,","","		value: 0","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	}","});","Y.VMLCircle = VMLCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class VMLPieSlice"," * @constructor"," */","VMLPieSlice = function()","{","	VMLPieSlice.superclass.constructor.apply(this, arguments);","};","VMLPieSlice.NAME = \"vmlPieSlice\";","Y.extend(VMLPieSlice, Y.VMLShape, Y.mix({","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"shape\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function(e)","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," }, Y.VMLDrawing.prototype));","VMLPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.VMLShape.ATTRS);","Y.VMLPieSlice = VMLPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Graphic.html\">`Graphic`</a> class."," * `VMLGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Graphic.html\">`Graphic`</a> class will point to the `VMLGraphic` class."," *"," * @module graphics"," * @class VMLGraphic"," * @constructor"," */","VMLGraphic = function() {","    VMLGraphic.superclass.constructor.apply(this, arguments);","};","","VMLGraphic.NAME = \"vmlGraphic\";","","VMLGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node","     * instance or a CSS selector string.","     *","     * @config render","     * @type Node | String","     */","    render: {},","","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.","     *","     *  @config contentBounds","     *  @type Object","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The html element that represents to coordinate system of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`.","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`.","	 *","	 * @config height","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines the sizing of the Graphic.","     *","     *  <dl>","     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the","     *      <code>width</code> and <code>height</code> attributes or are determined by the dimensions of the parent element. The","     *      content contained in the Graphic will be sized to fit with in the Graphic instance's dimensions. When using this","     *      setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>","     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the","     *      size and positioning of the content.</dd>","     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code>","     *      and <code>height</code> attributes or are determined by the dimensions of the parent element. The contents of the","     *      Graphic instance are not affected by this setting.</dd>","     *  </dl>","     *","     *","     *  @config autoSize","     *  @type Boolean | String","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.","     *","     *  <dl>","     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary","     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>","     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>","     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>","     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>","     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>","     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>","     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>","     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>","     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>","     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>","     *  </dl>","     *","     * @config preserveAspectRatio","     * @type String","     * @default xMidYMid","     */","    preserveAspectRatio: {","        value: \"xMidYMid\"","    },","","    /**","     * The contentBounds will resize to greater values but not values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown","     * @type Boolean","     */","    resizeDown: {","        resizeDown: false","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(VMLGraphic, Y.GraphicBase, {","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function(attr, value)","	{","		var host = this,","            redrawAttrs = {","                autoDraw: true,","                autoSize: true,","                preserveAspectRatio: true,","                resizeDown: true","            },","            key,","            forceRedraw = false;","		AttributeLite.prototype.set.apply(host, arguments);","        if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)","        {","            if(Y_LANG.isString && redrawAttrs[attr])","            {","                forceRedraw = true;","            }","            else if(Y_LANG.isObject(attr))","            {","                for(key in redrawAttrs)","                {","                    if(redrawAttrs.hasOwnProperty(key) && attr[key])","                    {","                        forceRedraw = true;","                        break;","                    }","                }","            }","        }","        if(forceRedraw)","        {","            host._redraw();","        }","	},","","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = this.parentNode,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            xy;","        if(node)","        {","            xy = Y.one(node).getXY();","            xy[0] += x;","            xy[1] += y;","        }","        else","        {","            xy = Y.DOM._getOffset(this._node);","        }","        return xy;","    },","","    /**","     * Initializes the class.","     *","     * @method initializer","     * @private","     */","    initializer: function(config) {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\";","        this._shapes = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = this._createGraphic();","        this._node.style.left = this.get(\"x\") + \"px\";","        this._node.style.top = this.get(\"y\") + \"px\";","        this._node.style.visibility = visibility;","        this._node.setAttribute(\"id\", this.get(\"id\"));","        if(render)","        {","            this.render(render);","        }","    },","","    /**","     * Adds the graphics node to the dom.","     *","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(this._node);","        this.parentNode = parentNode;","        this.set(\"width\", w);","        this.set(\"height\", h);","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.clear();","        Y.one(this._node).remove(true);","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var shapeClass = this._getShapeClass(cfg.type),","            shape = new shapeClass(cfg);","        this._appendShape(shape);","        shape._appendStrokeAndFill();","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\") || this.get(\"autoSize\") == \"sizeContentToGraphic\")","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof VMLShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && (shape instanceof VMLShape))","        {","            shape._destroy();","            this._shapes[shape.get(\"id\")] = null;","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","        this._removeChildren(this._node);","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Sets the size of the graphics object.","     *","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     */","    setSize: function(w, h) {","        w = Math.round(w);","        h = Math.round(h);","        this._node.style.width = w + 'px';","        this._node.style.height = h + 'px';","    },","","    /**","     * Sets the positon of the graphics object.","     *","     * @method setPosition","     * @param {Number} x x-coordinate for the object.","     * @param {Number} y y-coordinate for the object.","     */","    setPosition: function(x, y)","    {","        x = Math.round(x);","        y = Math.round(y);","        this._node.style.left = x + \"px\";","        this._node.style.top = y + \"px\";","    },","","    /**","     * Creates a group element","     *","     * @method _createGraphic","     * @private","     */","    _createGraphic: function() {","        var group = DOCUMENT.createElement('<group xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);padding:0px 0px 0px 0px;display:block;position:absolute;top:0px;left:0px;zoom:1;\" />');","        return group;","    },","","    /**","     * Creates a graphic node","     *","     * @method _createGraphicNode","     * @param {String} type node type to create","     * @param {String} pe specified pointer-events value","     * @return HTMLElement","     * @private","     */","    _createGraphicNode: function(type)","    {","        return DOCUMENT.createElement('<' + type + ' xmlns=\"urn:schemas-microsft.com:vml\" style=\"behavior:url(#default#VML);display:inline-block;zoom:1;\" />');","","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        return this._shapes[id];","    },","","    /**","     * Returns a shape class. Used by `addShape`.","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class.","     * @return Function","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.VMLCircle,","        rect: Y.VMLRect,","        path: Y.VMLPath,","        ellipse: Y.VMLEllipse,","        pieslice: Y.VMLPieSlice","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method.apply();","        this.set(\"autoDraw\", autoDraw);","    },","","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds.","     *","     * @method addToRedrawQueue","     * @param shape {VMLShape}","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            box.width = box.right - box.left;","            box.height = box.bottom - box.top;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var autoSize = this.get(\"autoSize\"),","            preserveAspectRatio,","            node = this.parentNode,","            nodeWidth = parseFloat(node.getComputedStyle(\"width\")),","            nodeHeight = parseFloat(node.getComputedStyle(\"height\")),","            xCoordOrigin = 0,","            yCoordOrigin = 0,","            box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds,","            left = box.left,","            right = box.right,","            top = box.top,","            bottom = box.bottom,","            contentWidth = right - left,","            contentHeight = bottom - top,","            aspectRatio,","            xCoordSize,","            yCoordSize,","            scaledWidth,","            scaledHeight,","            visible = this.get(\"visible\");","        this._node.style.visibility = \"hidden\";","        if(autoSize)","        {","            if(autoSize == \"sizeContentToGraphic\")","            {","                preserveAspectRatio = this.get(\"preserveAspectRatio\");","                if(preserveAspectRatio == \"none\" || contentWidth/contentHeight === nodeWidth/nodeHeight)","                {","                    xCoordOrigin = left;","                    yCoordOrigin = top;","                    xCoordSize = contentWidth;","                    yCoordSize = contentHeight;","                }","                else","                {","                    if(contentWidth * nodeHeight/contentHeight > nodeWidth)","                    {","                        aspectRatio = nodeHeight/nodeWidth;","                        xCoordSize = contentWidth;","                        yCoordSize = contentWidth * aspectRatio;","                        scaledHeight = (nodeWidth * (contentHeight/contentWidth)) * (yCoordSize/nodeHeight);","                        yCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(5).toLowerCase(), scaledHeight, yCoordSize);","                        yCoordOrigin = top + yCoordOrigin;","                        xCoordOrigin = left;","                    }","                    else","                    {","                        aspectRatio = nodeWidth/nodeHeight;","                        xCoordSize = contentHeight * aspectRatio;","                        yCoordSize = contentHeight;","                        scaledWidth = (nodeHeight * (contentWidth/contentHeight)) * (xCoordSize/nodeWidth);","                        xCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(1, 4).toLowerCase(), scaledWidth, xCoordSize);","                        xCoordOrigin = xCoordOrigin + left;","                        yCoordOrigin = top;","                    }","                }","                this._node.style.width = nodeWidth + \"px\";","                this._node.style.height = nodeHeight + \"px\";","                this._node.coordOrigin = xCoordOrigin + \", \" + yCoordOrigin;","            }","            else","            {","                xCoordSize = contentWidth;","                yCoordSize = contentHeight;","                this._node.style.width = contentWidth + \"px\";","                this._node.style.height = contentHeight + \"px\";","                this._state.width = contentWidth;","                this._state.height =  contentHeight;","","            }","            this._node.coordSize = xCoordSize + \", \" + yCoordSize;","        }","        else","        {","            this._node.style.width = nodeWidth + \"px\";","            this._node.style.height = nodeHeight + \"px\";","            this._node.coordSize = nodeWidth + \", \" + nodeHeight;","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","        if(visible)","        {","            this._node.style.visibility = \"visible\";","        }","    },","","    /**","     * Determines the value for either an x or y coordinate to be used for the <code>coordOrigin</code> of the Graphic.","     *","     * @method _calculateCoordOrigin","     * @param {String} position The position for placement. Possible values are min, mid and max.","     * @param {Number} size The total scaled size of the content.","     * @param {Number} coordsSize The coordsSize for the Graphic.","     * @return Number","     * @private","     */","    _calculateCoordOrigin: function(position, size, coordsSize)","    {","        var coord;","        switch(position)","        {","            case \"min\" :","                coord = 0;","            break;","            case \"mid\" :","                coord = (size - coordsSize)/2;","            break;","            case \"max\" :","                coord = (size - coordsSize);","            break;","        }","        return coord;","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object}","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {};","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;","                box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;","                box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;","                box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;","            }","        }","        box.left = Y_LANG.isNumber(box.left) ? box.left : 0;","        box.top = Y_LANG.isNumber(box.top) ? box.top : 0;","        box.right = Y_LANG.isNumber(box.right) ? box.right : 0;","        box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;","        this._contentBounds = box;","        return box;","    },","","    /**","     * Inserts shape on the top of the tree.","     *","     * @method _toFront","     * @param {VMLShape} Shape to add.","     * @private","     */","    _toFront: function(shape)","    {","        var contentNode = this._node;","        if(shape instanceof Y.VMLShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            contentNode.appendChild(shape);","        }","    },","","    /**","     * Inserts shape as the first child of the content node.","     *","     * @method _toBack","     * @param {VMLShape} Shape to add.","     * @private","     */","    _toBack: function(shape)","    {","        var contentNode = this._node,","            targetNode;","        if(shape instanceof Y.VMLShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            targetNode = contentNode.firstChild;","            if(targetNode)","            {","                contentNode.insertBefore(shape, targetNode);","            }","            else","            {","                contentNode.appendChild(shape);","            }","        }","    }","});","Y.VMLGraphic = VMLGraphic;","","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].lines = {"1":0,"3":0,"24":0,"36":0,"76":0,"88":0,"89":0,"91":0,"92":0,"94":0,"128":0,"129":0,"145":0,"146":0,"158":0,"177":0,"178":0,"179":0,"181":0,"182":0,"183":0,"184":0,"185":0,"186":0,"187":0,"189":0,"191":0,"192":0,"193":0,"194":0,"195":0,"196":0,"197":0,"198":0,"199":0,"200":0,"201":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"209":0,"223":0,"224":0,"238":0,"239":0,"251":0,"266":0,"268":0,"269":0,"270":0,"271":0,"272":0,"273":0,"274":0,"275":0,"276":0,"277":0,"278":0,"279":0,"280":0,"281":0,"283":0,"297":0,"298":0,"299":0,"300":0,"301":0,"302":0,"303":0,"304":0,"320":0,"321":0,"322":0,"323":0,"324":0,"325":0,"326":0,"327":0,"328":0,"329":0,"343":0,"347":0,"348":0,"349":0,"350":0,"351":0,"352":0,"367":0,"371":0,"372":0,"373":0,"374":0,"375":0,"376":0,"392":0,"394":0,"395":0,"396":0,"397":0,"398":0,"399":0,"417":0,"418":0,"420":0,"422":0,"423":0,"424":0,"425":0,"426":0,"427":0,"428":0,"429":0,"430":0,"431":0,"444":0,"445":0,"458":0,"459":0,"471":0,"479":0,"480":0,"481":0,"482":0,"483":0,"484":0,"485":0,"486":0,"487":0,"488":0,"489":0,"494":0,"495":0,"496":0,"497":0,"498":0,"499":0,"500":0,"501":0,"502":0,"503":0,"506":0,"507":0,"520":0,"521":0,"534":0,"535":0,"547":0,"552":0,"553":0,"554":0,"555":0,"556":0,"557":0,"568":0,"576":0,"577":0,"578":0,"580":0,"582":0,"584":0,"586":0,"589":0,"591":0,"593":0,"595":0,"596":0,"597":0,"598":0,"599":0,"601":0,"602":0,"603":0,"614":0,"615":0,"626":0,"627":0,"638":0,"639":0,"640":0,"641":0,"642":0,"643":0,"644":0,"645":0,"646":0,"659":0,"664":0,"665":0,"668":0,"669":0,"670":0,"671":0,"674":0,"688":0,"696":0,"698":0,"699":0,"700":0,"701":0,"702":0,"704":0,"705":0,"706":0,"707":0,"708":0,"709":0,"721":0,"722":0,"724":0,"726":0,"728":0,"730":0,"732":0,"734":0,"736":0,"737":0,"752":0,"764":0,"766":0,"767":0,"768":0,"769":0,"772":0,"774":0,"793":0,"804":0,"807":0,"808":0,"810":0,"812":0,"814":0,"816":0,"830":0,"831":0,"833":0,"837":0,"838":0,"841":0,"842":0,"843":0,"855":0,"857":0,"859":0,"861":0,"874":0,"895":0,"896":0,"897":0,"898":0,"899":0,"901":0,"903":0,"905":0,"906":0,"907":0,"908":0,"909":0,"910":0,"912":0,"913":0,"914":0,"916":0,"918":0,"920":0,"922":0,"924":0,"926":0,"928":0,"930":0,"931":0,"932":0,"936":0,"938":0,"940":0,"942":0,"943":0,"945":0,"947":0,"949":0,"953":0,"954":0,"956":0,"958":0,"959":0,"960":0,"971":0,"972":0,"983":0,"984":0,"995":0,"999":0,"1011":0,"1013":0,"1014":0,"1026":0,"1037":0,"1039":0,"1051":0,"1064":0,"1074":0,"1076":0,"1077":0,"1078":0,"1079":0,"1081":0,"1083":0,"1084":0,"1085":0,"1086":0,"1087":0,"1088":0,"1089":0,"1090":0,"1091":0,"1092":0,"1093":0,"1095":0,"1096":0,"1097":0,"1099":0,"1100":0,"1103":0,"1105":0,"1109":0,"1110":0,"1112":0,"1113":0,"1116":0,"1118":0,"1129":0,"1131":0,"1133":0,"1143":0,"1145":0,"1146":0,"1147":0,"1149":0,"1151":0,"1152":0,"1153":0,"1154":0,"1155":0,"1156":0,"1157":0,"1158":0,"1159":0,"1161":0,"1162":0,"1164":0,"1165":0,"1166":0,"1168":0,"1169":0,"1170":0,"1172":0,"1173":0,"1176":0,"1178":0,"1182":0,"1183":0,"1185":0,"1186":0,"1189":0,"1190":0,"1194":0,"1196":0,"1198":0,"1200":0,"1213":0,"1220":0,"1222":0,"1224":0,"1226":0,"1227":0,"1228":0,"1229":0,"1230":0,"1231":0,"1233":0,"1235":0,"1238":0,"1239":0,"1241":0,"1243":0,"1244":0,"1245":0,"1246":0,"1248":0,"1249":0,"1250":0,"1252":0,"1256":0,"1258":0,"1269":0,"1271":0,"1273":0,"1280":0,"1282":0,"1284":0,"1285":0,"1286":0,"1288":0,"1290":0,"1292":0,"1294":0,"1298":0,"1305":0,"1306":0,"1308":0,"1310":0,"1313":0,"1314":0,"1315":0,"1318":0,"1320":0,"1321":0,"1322":0,"1323":0,"1325":0,"1326":0,"1328":0,"1330":0,"1332":0,"1336":0,"1337":0,"1338":0,"1341":0,"1343":0,"1344":0,"1348":0,"1349":0,"1355":0,"1357":0,"1358":0,"1372":0,"1394":0,"1396":0,"1398":0,"1400":0,"1402":0,"1406":0,"1408":0,"1409":0,"1411":0,"1413":0,"1414":0,"1415":0,"1416":0,"1417":0,"1418":0,"1419":0,"1420":0,"1421":0,"1422":0,"1423":0,"1425":0,"1426":0,"1427":0,"1428":0,"1429":0,"1430":0,"1431":0,"1432":0,"1433":0,"1434":0,"1435":0,"1437":0,"1439":0,"1441":0,"1442":0,"1455":0,"1456":0,"1457":0,"1458":0,"1459":0,"1461":0,"1473":0,"1486":0,"1488":0,"1490":0,"1492":0,"1496":0,"1497":0,"1500":0,"1501":0,"1502":0,"1504":0,"1505":0,"1507":0,"1508":0,"1511":0,"1513":0,"1515":0,"1522":0,"1523":0,"1525":0,"1527":0,"1528":0,"1530":0,"1531":0,"1533":0,"1535":0,"1537":0,"1540":0,"1541":0,"1554":0,"1556":0,"1557":0,"1596":0,"1597":0,"1598":0,"1610":0,"1611":0,"1623":0,"1624":0,"1636":0,"1647":0,"1658":0,"1669":0,"1680":0,"1694":0,"1696":0,"1698":0,"1719":0,"1721":0,"1722":0,"1723":0,"1724":0,"1725":0,"1726":0,"1739":0,"1740":0,"1751":0,"1771":0,"1790":0,"1791":0,"1792":0,"1794":0,"1809":0,"1814":0,"1816":0,"1817":0,"1818":0,"1819":0,"1821":0,"1836":0,"1847":0,"1849":0,"1851":0,"1852":0,"1853":0,"1854":0,"1856":0,"1857":0,"1858":0,"1860":0,"1863":0,"1864":0,"1866":0,"1868":0,"1869":0,"1879":0,"1880":0,"1882":0,"1893":0,"1894":0,"1896":0,"1909":0,"1917":0,"1919":0,"1920":0,"1921":0,"1923":0,"1924":0,"1925":0,"1926":0,"1927":0,"1929":0,"1931":0,"1935":0,"1939":0,"1950":0,"1951":0,"1953":0,"1957":0,"1969":0,"1971":0,"1973":0,"1974":0,"1976":0,"1978":0,"1979":0,"1981":0,"1986":0,"1997":0,"2034":0,"2037":0,"2038":0,"2039":0,"2040":0,"2041":0,"2043":0,"2045":0,"2046":0,"2051":0,"2084":0,"2089":0,"2090":0,"2092":0,"2094":0,"2124":0,"2126":0,"2128":0,"2130":0,"2188":0,"2192":0,"2195":0,"2197":0,"2199":0,"2201":0,"2203":0,"2207":0,"2208":0,"2210":0,"2212":0,"2215":0,"2216":0,"2253":0,"2257":0,"2259":0,"2261":0,"2262":0,"2264":0,"2267":0,"2269":0,"2271":0,"2275":0,"2276":0,"2277":0,"2308":0,"2324":0,"2326":0,"2328":0,"2343":0,"2347":0,"2358":0,"2360":0,"2363":0,"2364":0,"2365":0,"2375":0,"2376":0,"2389":0,"2405":0,"2409":0,"2420":0,"2422":0,"2424":0,"2425":0,"2435":0,"2436":0,"2447":0,"2449":0,"2452":0,"2454":0,"2464":0,"2476":0,"2477":0,"2478":0,"2483":0,"2484":0,"2485":0,"2501":0,"2502":0,"2503":0,"2508":0,"2509":0,"2510":0,"2514":0,"2525":0,"2527":0,"2530":0,"2532":0,"2543":0,"2565":0,"2566":0,"2571":0,"2573":0,"2586":0,"2587":0,"2592":0,"2594":0,"2598":0,"2606":0,"2608":0,"2610":0,"2611":0,"2629":0,"2634":0,"2635":0,"2636":0,"2639":0,"2677":0,"2688":0,"2689":0,"2692":0,"2694":0,"2713":0,"2718":0,"2719":0,"2721":0,"2723":0,"2739":0,"2754":0,"2769":0,"2782":0,"2784":0,"2786":0,"2799":0,"2801":0,"2803":0,"2876":0,"2881":0,"2882":0,"2884":0,"2886":0,"2899":0,"2904":0,"2905":0,"2907":0,"2909":0,"2931":0,"2932":0,"2937":0,"2949":0,"2958":0,"2959":0,"2961":0,"2963":0,"2965":0,"2967":0,"2969":0,"2971":0,"2972":0,"2977":0,"2979":0,"3009":0,"3013":0,"3015":0,"3016":0,"3017":0,"3021":0,"3023":0,"3033":0,"3035":0,"3036":0,"3042":0,"3043":0,"3044":0,"3045":0,"3046":0,"3047":0,"3049":0,"3060":0,"3063":0,"3064":0,"3065":0,"3066":0,"3067":0,"3068":0,"3078":0,"3079":0,"3091":0,"3092":0,"3094":0,"3096":0,"3098":0,"3099":0,"3100":0,"3112":0,"3114":0,"3116":0,"3120":0,"3132":0,"3134":0,"3136":0,"3139":0,"3141":0,"3142":0,"3143":0,"3145":0,"3147":0,"3158":0,"3160":0,"3162":0,"3164":0,"3167":0,"3179":0,"3181":0,"3182":0,"3184":0,"3185":0,"3186":0,"3197":0,"3198":0,"3210":0,"3213":0,"3215":0,"3217":0,"3219":0,"3223":0,"3225":0,"3227":0,"3229":0,"3241":0,"3242":0,"3243":0,"3244":0,"3256":0,"3257":0,"3258":0,"3259":0,"3269":0,"3270":0,"3284":0,"3297":0,"3310":0,"3311":0,"3313":0,"3315":0,"3341":0,"3342":0,"3343":0,"3344":0,"3356":0,"3358":0,"3360":0,"3372":0,"3374":0,"3375":0,"3377":0,"3378":0,"3379":0,"3380":0,"3381":0,"3382":0,"3383":0,"3384":0,"3385":0,"3387":0,"3389":0,"3401":0,"3421":0,"3422":0,"3424":0,"3426":0,"3427":0,"3429":0,"3430":0,"3431":0,"3432":0,"3436":0,"3438":0,"3439":0,"3440":0,"3441":0,"3442":0,"3443":0,"3444":0,"3448":0,"3449":0,"3450":0,"3451":0,"3452":0,"3453":0,"3454":0,"3457":0,"3458":0,"3459":0,"3463":0,"3464":0,"3465":0,"3466":0,"3467":0,"3468":0,"3471":0,"3475":0,"3476":0,"3477":0,"3479":0,"3481":0,"3482":0,"3484":0,"3486":0,"3502":0,"3503":0,"3506":0,"3507":0,"3509":0,"3510":0,"3512":0,"3513":0,"3515":0,"3527":0,"3532":0,"3534":0,"3536":0,"3537":0,"3538":0,"3539":0,"3540":0,"3541":0,"3544":0,"3545":0,"3546":0,"3547":0,"3548":0,"3549":0,"3561":0,"3562":0,"3564":0,"3566":0,"3568":0,"3581":0,"3583":0,"3585":0,"3587":0,"3589":0,"3590":0,"3592":0,"3596":0,"3601":0};
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].functions = {"VMLDrawing:24":0,"_round:74":0,"_addToPath:86":0,"curveTo:127":0,"relativeCurveTo:144":0,"_curveTo:157":0,"quadraticCurveTo:222":0,"relativeQuadraticCurveTo:237":0,"_quadraticCurveTo:250":0,"drawRect:296":0,"drawRoundRect:319":0,"drawCircle:342":0,"drawEllipse:366":0,"drawDiamond:390":0,"drawWedge:415":0,"lineTo:442":0,"relativeLineTo:456":0,"_lineTo:470":0,"moveTo:518":0,"relativeMoveTo:532":0,"_moveTo:546":0,"_closePath:566":0,"end:612":0,"closePath:624":0,"clear:636":0,"getBezierData:658":0,"_setCurveBoundingBox:686":0,"_trackSize:720":0,"VMLShape:764":0,"init:791":0,"initializer:802":0,"_setGraphic:828":0,"_appendStrokeAndFill:853":0,"createNode:872":0,"addClass:969":0,"removeClass:981":0,"getXY:993":0,"setXY:1009":0,"contains:1024":0,"compareTo:1036":0,"test:1049":0,"_getStrokeProps:1062":0,"_strokeChangeHandler:1127":0,"_getFillProps:1211":0,"_fillChangeHandler:1267":0,"_updateFillNode:1353":0,"_getGradientFill:1370":0,"_addTransform:1453":0,"_updateTransform:1471":0,"_getSkewOffsetValue:1552":0,"translate:1594":0,"translateX:1608":0,"translateY:1621":0,"skew:1634":0,"skewX:1645":0,"skewY:1656":0,"rotate:1667":0,"scale:1678":0,"on:1692":0,"_updateHandler:1717":0,"_createGraphicNode:1737":0,"_getDefaultFill:1750":0,"_getDefaultStroke:1769":0,"set:1788":0,"getBounds:1807":0,"_getContentRect:1834":0,"toFront:1877":0,"toBack:1891":0,"_parsePathData:1907":0,"destroy:1948":0,"_destroy:1967":0,"valueFn:1995":0,"setter:2032":0,"getter:2049":0,"valueFn:2082":0,"setter:2087":0,"setter:2123":0,"setter:2186":0,"setter:2251":0,"getter:2306":0,"setter:2322":0,"getter:2341":0,"VMLPath:2358":0,"getter:2373":0,"getter:2387":0,"getter:2403":0,"VMLRect:2420":0,"VMLEllipse:2447":0,"getter:2474":0,"setter:2481":0,"getter:2499":0,"setter:2506":0,"VMLCircle:2525":0,"setter:2563":0,"getter:2569":0,"setter:2584":0,"getter:2590":0,"VMLPieSlice:2606":0,"_draw:2627":0,"VMLGraphic:2688":0,"valueFn:2711":0,"setter:2716":0,"getter:2737":0,"getter:2752":0,"getter:2767":0,"setter:2780":0,"setter:2797":0,"getter:2874":0,"setter:2879":0,"getter:2897":0,"setter:2902":0,"setter:2929":0,"set:2947":0,"getXY:3007":0,"initializer:3032":0,"render:3059":0,"destroy:3076":0,"addShape:3089":0,"_appendShape:3110":0,"removeShape:3130":0,"removeAllShapes:3156":0,"_removeChildren:3177":0,"clear:3196":0,"_toggleVisible:3208":0,"setSize:3240":0,"setPosition:3254":0,"_createGraphic:3268":0,"_createGraphicNode:3282":0,"getShapeById:3295":0,"_getShapeClass:3308":0,"batch:3339":0,"_getDocFrag:3354":0,"addToRedrawQueue:3370":0,"_redraw:3399":0,"_calculateCoordOrigin:3500":0,"_getUpdatedContentBounds:3525":0,"_toFront:3559":0,"_toBack:3579":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].coveredLines = 935;
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
     * @chainable
     */
    curveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "curveTo", 127);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 128);
this._curveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 129);
return this;
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
     * @chainable
     */
    relativeCurveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeCurveTo", 144);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 145);
this._curveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 146);
return this;
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_curveTo", 157);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 158);
var w,
            h,
            x,
            y,
            cp1x,
            cp1y,
            cp2x,
            cp2y,
            pts,
            right,
            left,
            bottom,
            top,
            i,
            len,
            path,
            command = relative ? " v " : " c ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 177);
len = args.length - 5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 178);
path = command;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 179);
for(i = 0; i < len; i = i + 6)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 181);
cp1x = parseFloat(args[i]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 182);
cp1y = parseFloat(args[i + 1]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 183);
cp2x = parseFloat(args[i + 2]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 184);
cp2y = parseFloat(args[i + 3]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 185);
x = parseFloat(args[i + 4]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 186);
y = parseFloat(args[i + 5]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 187);
if(i > 0)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 189);
path = path + ", ";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 191);
path = path + this._round(cp1x) + ", " + this._round(cp1y) + ", " + this._round(cp2x) + ", " + this._round(cp2y) + ", " + this._round(x) + ", " + this._round(y);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 192);
cp1x = cp1x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 193);
cp1y = cp1y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 194);
cp2x = cp2x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 195);
cp2y = cp2y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 196);
x = x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 197);
y = y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 198);
right = Math.max(x, Math.max(cp1x, cp2x));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 199);
bottom = Math.max(y, Math.max(cp1y, cp2y));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 200);
left = Math.min(x, Math.min(cp1x, cp2x));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 201);
top = Math.min(y, Math.min(cp1y, cp2y));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 202);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 203);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 204);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 205);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 206);
this._currentX = x;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 207);
this._currentY = y;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 209);
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
     * @chainable
     */
    quadraticCurveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "quadraticCurveTo", 222);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 223);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 224);
return this;
    },

    /**
     * Draws a quadratic bezier curve relative to the current position.
     *
     * @method relativeQuadraticCurveTo
     * @param {Number} cpx x-coordinate for the control point.
     * @param {Number} cpy y-coordinate for the control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     * @chainable
     */
    relativeQuadraticCurveTo: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeQuadraticCurveTo", 237);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 238);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 239);
return this;
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_quadraticCurveTo", 250);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 251);
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
            i,
            len = args.length - 3,
            bezierArgs = [],
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 266);
for(i = 0; i < len; i = i + 4)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 268);
cpx = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 269);
cpy = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 270);
x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 271);
y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 272);
cp1x = currentX + 0.67*(cpx - currentX);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 273);
cp1y = currentY + 0.67*(cpy - currentY);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 274);
cp2x = cp1x + (x - currentX) * 0.34;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 275);
cp2y = cp1y + (y - currentY) * 0.34;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 276);
bezierArgs.push(cp1x);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 277);
bezierArgs.push(cp1y);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 278);
bezierArgs.push(cp2x);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 279);
bezierArgs.push(cp2y);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 280);
bezierArgs.push(x);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 281);
bezierArgs.push(y);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 283);
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
     * @chainable
     */
    drawRect: function(x, y, w, h) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawRect", 296);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 297);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 298);
this.lineTo(x + w, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 299);
this.lineTo(x + w, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 300);
this.lineTo(x, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 301);
this.lineTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 302);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 303);
this._currentY = y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 304);
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
     * @chainable
     */
    drawRoundRect: function(x, y, w, h, ew, eh) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawRoundRect", 319);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 320);
this.moveTo(x, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 321);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 322);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 323);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 324);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 325);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 326);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 327);
this.lineTo(x + ew, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 328);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 329);
return this;
    },

    /**
     * Draws a circle. Used internally by `CanvasCircle` class.
     *
     * @method drawCircle
     * @param {Number} x y-coordinate
     * @param {Number} y x-coordinate
     * @param {Number} r radius
     * @chainable
     * @protected
     */
	drawCircle: function(x, y, radius) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawCircle", 342);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 343);
var startAngle = 0,
            endAngle = 360,
            circum = radius * 2;

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 347);
endAngle *= 65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 348);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 349);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 350);
this.moveTo((x + circum), (y + radius));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 351);
this._addToPath(" ae " + this._round(x + radius) + ", " + this._round(y + radius) + ", " + this._round(radius) + ", " + this._round(radius) + ", " + startAngle + ", " + endAngle);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 352);
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
     * @chainable
     * @protected
     */
	drawEllipse: function(x, y, w, h) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawEllipse", 366);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 367);
var startAngle = 0,
            endAngle = 360,
            radius = w * 0.5,
            yRadius = h * 0.5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 371);
endAngle *= 65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 372);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 373);
this._trackSize(x + w, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 374);
this.moveTo((x + w), (y + yRadius));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 375);
this._addToPath(" ae " + this._round(x + radius) + ", " + this._round(x + radius) + ", " + this._round(y + yRadius) + ", " + this._round(radius) + ", " + this._round(yRadius) + ", " + startAngle + ", " + endAngle);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 376);
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
     * @chainable
     * @protected
     */
    drawDiamond: function(x, y, width, height)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawDiamond", 390);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 392);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 394);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 395);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 396);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 397);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 398);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 399);
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
     * @chainable
     * @private
     */
    drawWedge: function(x, y, startAngle, arc, radius)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawWedge", 415);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 417);
var diameter = radius * 2;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 418);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 420);
arc = 360;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 422);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 423);
this._currentY = y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 424);
startAngle *= -65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 425);
arc *= 65536;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 426);
startAngle = Math.round(startAngle);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 427);
arc = Math.round(arc);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 428);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 429);
this._addToPath(" ae " + this._round(x) + ", " + this._round(y) + ", " + this._round(radius) + " " + this._round(radius) + ", " +  startAngle + ", " + arc);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 430);
this._trackSize(diameter, diameter);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 431);
return this;
    },

    /**
     * Draws a line segment from the current drawing position to the specified x and y coordinates.
     *
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     * @chainable
     */
    lineTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "lineTo", 442);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 444);
this._lineTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 445);
return this;
    },

    /**
     * Draws a line segment using the current line style from the current drawing position to the relative x and y coordinates.
     *
     * @method relativeLineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     * @chainable
     */
    relativeLineTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeLineTo", 456);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 458);
this._lineTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 459);
return this;
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_lineTo", 470);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 471);
var point1 = args[0],
            i,
            len,
            x,
            y,
            path = relative ? " r " : " l ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 479);
if (typeof point1 == "string" || typeof point1 == "number") {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 480);
len = args.length - 1;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 481);
for (i = 0; i < len; i = i + 2) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 482);
x = parseFloat(args[i]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 483);
y = parseFloat(args[i + 1]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 484);
path += ' ' + this._round(x) + ', ' + this._round(y);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 485);
x = x + relativeX;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 486);
y = y + relativeY;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 487);
this._currentX = x;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 488);
this._currentY = y;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 489);
this._trackSize.apply(this, [x, y]);
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 494);
len = args.length;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 495);
for (i = 0; i < len; i = i + 1) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 496);
x = parseFloat(args[i][0]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 497);
y = parseFloat(args[i][1]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 498);
path += ' ' + this._round(x) + ', ' + this._round(y);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 499);
x = x + relativeX;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 500);
y = y + relativeY;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 501);
this._currentX = x;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 502);
this._currentY = y;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 503);
this._trackSize.apply(this, [x, y]);
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 506);
this._addToPath(path);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 507);
return this;
    },

    /**
     * Moves the current drawing position to specified x and y coordinates.
     *
     * @method moveTo
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     * @chainable
     */
    moveTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "moveTo", 518);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 520);
this._moveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 521);
return this;
    },

    /**
     * Moves the current drawing position relative to specified x and y coordinates.
     *
     * @method relativeMoveTo
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     * @chainable
     */
    relativeMoveTo: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeMoveTo", 532);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 534);
this._moveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 535);
return this;
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_moveTo", 546);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 547);
var x = parseFloat(args[0]),
            y = parseFloat(args[1]),
            command = relative ? " t " : " m ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 552);
this._movePath = command + this._round(x) + ", " + this._round(y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 553);
x = x + relativeX;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 554);
y = y + relativeY;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 555);
this._trackSize(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 556);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 557);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_closePath", 566);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 568);
var fill = this.get("fill"),
            stroke = this.get("stroke"),
            node = this.node,
            w = this.get("width"),
            h = this.get("height"),
            path = this._path,
            pathEnd = "",
            multiplier = this._coordSpaceMultiplier;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 576);
this._fillChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 577);
this._strokeChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 578);
if(path)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 580);
if(fill && fill.color)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 582);
pathEnd += ' x';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 584);
if(stroke)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 586);
pathEnd += ' e';
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 589);
if(path)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 591);
node.path = path + pathEnd;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 593);
if(!isNaN(w) && !isNaN(h))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 595);
node.coordOrigin = this._left + ", " + this._top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 596);
node.coordSize = (w * multiplier) + ", " + (h * multiplier);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 597);
node.style.position = "absolute";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 598);
node.style.width =  w + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 599);
node.style.height =  h + "px";
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 601);
this._path = path;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 602);
this._movePath = null;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 603);
this._updateTransform();
    },

    /**
     * Completes a drawing operation.
     *
     * @method end
     * @chainable
     */
    end: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "end", 612);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 614);
this._closePath();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 615);
return this;
    },

    /**
     * Ends a fill and stroke
     *
     * @method closePath
     * @chainable
     */
    closePath: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "closePath", 624);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 626);
this._addToPath(" x e");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 627);
return this;
    },

    /**
     * Clears the path.
     *
     * @method clear
     * @chainable
     */
    clear: function()
    {
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "clear", 636);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 638);
this._right = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 639);
this._bottom = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 640);
this._width = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 641);
this._height = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 642);
this._left = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 643);
this._top = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 644);
this._path = "";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 645);
this._movePath = null;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 646);
return this;
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getBezierData", 658);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 659);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 664);
for (i = 0; i < n; ++i){
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 665);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 668);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 669);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 670);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 671);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 674);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_setCurveBoundingBox", 686);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 688);
var i,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            xy;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 696);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 698);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 699);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 700);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 701);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 702);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 704);
left = Math.round(left * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 705);
right = Math.round(right * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 706);
top = Math.round(top * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 707);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 708);
this._trackSize(right, bottom);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 709);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_trackSize", 720);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 721);
if (w > this._right) {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 722);
this._right = w;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 724);
if(w < this._left)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 726);
this._left = w;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 728);
if (h < this._top)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 730);
this._top = h;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 732);
if (h > this._bottom)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 734);
this._bottom = h;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 736);
this._width = this._right - this._left;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 737);
this._height = this._bottom - this._top;
    },

    _left: 0,

    _right: 0,

    _top: 0,

    _bottom: 0,

    _width: 0,

    _height: 0
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 752);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 764);
VMLShape = function()
{
    _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLShape", 764);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 766);
this._transforms = [];
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 767);
this.matrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 768);
this._normalizedMatrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 769);
VMLShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 772);
VMLShape.NAME = "shape";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 774);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "init", 791);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 793);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "initializer", 802);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 804);
var host = this,
            graphic = cfg.graphic,
            data = this.get("data");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 807);
host.createNode();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 808);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 810);
this._setGraphic(graphic);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 812);
if(data)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 814);
host._parsePathData(data);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 816);
this._updateHandler();
	},

    /**
     * Set the Graphic instance for the shape.
     *
     * @method _setGraphic
     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a
     * `Graphic` instance, it will be assigned to the `graphic` attribute. Otherwise, a new Graphic instance will be created
     * and rendered into the dom element that the render represents.
     * @private
     */
    _setGraphic: function(render)
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_setGraphic", 828);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 830);
var graphic;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 831);
if(render instanceof Y.VMLGraphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 833);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 837);
render = Y.one(render);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 838);
graphic = new Y.VMLGraphic({
                render: render
            });
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 841);
graphic._appendShape(this);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 842);
this._graphic = graphic;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 843);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_appendStrokeAndFill", 853);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 855);
if(this._strokeNode)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 857);
this.node.appendChild(this._strokeNode);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 859);
if(this._fillNode)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 861);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "createNode", 872);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 874);
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
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 895);
id = this.get("id");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 896);
type = this._type == "path" ? "shape" : this._type;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 897);
classString = _getClassName(SHAPE) + " " + _getClassName(concat(IMPLEMENTATION, SHAPE)) + " " + _getClassName(name) + " " + _getClassName(concat(IMPLEMENTATION, name)) + " " + IMPLEMENTATION + type;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 898);
stroke = this._getStrokeProps();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 899);
fill = this._getFillProps();

		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 901);
nodestring  = '<' + type + '  xmlns="urn:schemas-microsft.com:vml" id="' + id + '" class="' + classString + '" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;visibility:' + visibility + '"';

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 903);
if(stroke && stroke.weight && stroke.weight > 0)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 905);
endcap = stroke.endcap;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 906);
opacity = parseFloat(stroke.opacity);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 907);
joinstyle = stroke.joinstyle;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 908);
miterlimit = stroke.miterlimit;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 909);
dashstyle = stroke.dashstyle;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 910);
nodestring += ' stroked="t" strokecolor="' + stroke.color + '" strokeWeight="' + stroke.weight + 'px"';

            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 912);
strokestring = '<stroke class="vmlstroke" xmlns="urn:schemas-microsft.com:vml" on="t" style="behavior:url(#default#VML);display:inline-block;"';
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 913);
strokestring += ' opacity="' + opacity + '"';
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 914);
if(endcap)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 916);
strokestring += ' endcap="' + endcap + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 918);
if(joinstyle)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 920);
strokestring += ' joinstyle="' + joinstyle + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 922);
if(miterlimit)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 924);
strokestring += ' miterlimit="' + miterlimit + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 926);
if(dashstyle)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 928);
strokestring += ' dashstyle="' + dashstyle + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 930);
strokestring += '></stroke>';
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 931);
this._strokeNode = DOCUMENT.createElement(strokestring);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 932);
nodestring += ' stroked="t"';
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 936);
nodestring += ' stroked="f"';
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 938);
if(fill)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 940);
if(fill.node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 942);
fillstring = fill.node;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 943);
this._fillNode = DOCUMENT.createElement(fillstring);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 945);
if(fill.color)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 947);
nodestring += ' fillcolor="' + fill.color + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 949);
nodestring += ' filled="' + fill.filled + '"';
        }


        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 953);
nodestring += '>';
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 954);
nodestring += '</' + type + '>';

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 956);
node = DOCUMENT.createElement(nodestring);

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 958);
this.node = node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 959);
this._strokeFlag = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 960);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addClass", 969);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 971);
var node = this.node;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 972);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeClass", 981);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 983);
var node = this.node;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 984);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getXY", 993);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 995);
var graphic = this._graphic,
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 999);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setXY", 1009);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1011);
var graphic = this._graphic,
			parentXY = graphic.getXY();
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1013);
this.set("x", xy[0] - parentXY[0]);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1014);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "contains", 1024);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1026);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "compareTo", 1036);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1037);
var node = this.node;

		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1039);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "test", 1049);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1051);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getStrokeProps", 1062);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1064);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1074);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1076);
props = {};
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1077);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1078);
linejoin = stroke.linejoin || "round";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1079);
if(linecap != "round" && linecap != "square")
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1081);
linecap = "flat";
            }
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1083);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1084);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1085);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1086);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1087);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1088);
props.stroked = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1089);
props.color = stroke.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1090);
props.weight = stroke.weight;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1091);
props.endcap = linecap;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1092);
props.opacity = stroke.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1093);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1095);
dash = [];
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1096);
len = dashstyle.length;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1097);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1099);
val = dashstyle[i];
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1100);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1103);
if(linejoin == "round" || linejoin == "bevel")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1105);
props.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1109);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1110);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1112);
props.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1113);
props.joinstyle = "miter";
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1116);
props.dashstyle = dash;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1118);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_strokeChangeHandler", 1127);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1129);
if(!this._strokeFlag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1131);
return;
        }
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1133);
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
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1143);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1145);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1146);
linejoin = stroke.linejoin || "round";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1147);
if(linecap != "round" && linecap != "square")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1149);
linecap = "flat";
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1151);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1152);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1153);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1154);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1155);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1156);
node.stroked = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1157);
node.strokeColor = stroke.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1158);
node.strokeWeight = stroke.weight + "px";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1159);
if(!this._strokeNode)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1161);
this._strokeNode = this._createGraphicNode("stroke");
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1162);
node.appendChild(this._strokeNode);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1164);
this._strokeNode.endcap = linecap;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1165);
this._strokeNode.opacity = stroke.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1166);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1168);
dash = [];
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1169);
len = dashstyle.length;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1170);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1172);
val = dashstyle[i];
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1173);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1176);
if(linejoin == "round" || linejoin == "bevel")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1178);
this._strokeNode.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1182);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1183);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1185);
this._strokeNode.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1186);
this._strokeNode.joinstyle = "miter";
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1189);
this._strokeNode.dashstyle = dash;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1190);
this._strokeNode.on = true;
		}
		else
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1194);
if(this._strokeNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1196);
this._strokeNode.on = false;
            }
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1198);
node.stroked = false;
		}
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1200);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getFillProps", 1211);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1213);
var fill = this.get("fill"),
			fillOpacity,
			props,
			gradient,
			i,
			fillstring,
			filled = false;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1220);
if(fill)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1222);
props = {};

			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1224);
if(fill.type == "radial" || fill.type == "linear")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1226);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1227);
fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1228);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1229);
gradient = this._getGradientFill(fill);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1230);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" opacity="' + fillOpacity + '"';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1231);
for(i in gradient)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1233);
if(gradient.hasOwnProperty(i))
					{
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1235);
fillstring += ' ' + i + '="' + gradient[i] + '"';
					}
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1238);
fillstring += ' />';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1239);
props.node = fillstring;
			}
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1241);
if(fill.color)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1243);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1244);
filled = true;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1245);
props.color = fill.color;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1246);
if(IS_NUM(fillOpacity))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1248);
fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1249);
props.opacity = fillOpacity;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1250);
if(fillOpacity < 1)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1252);
props.node = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
                    }
                }
			}}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1256);
props.filled = filled;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1258);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_fillChangeHandler", 1267);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1269);
if(!this._fillFlag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1271);
return;
        }
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1273);
var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			fillstring,
			filled = false,
            i,
            gradient;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1280);
if(fill)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1282);
if(fill.type == "radial" || fill.type == "linear")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1284);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1285);
gradient = this._getGradientFill(fill);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1286);
if(this._fillNode)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1288);
for(i in gradient)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1290);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1292);
if(i == "colors")
                            {
                                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1294);
this._fillNode.colors.value = gradient[i];
                            }
                            else
                            {
                                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1298);
this._fillNode[i] = gradient[i];
                            }
                        }
                    }
                }
                else
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1305);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"';
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1306);
for(i in gradient)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1308);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1310);
fillstring += ' ' + i + '="' + gradient[i] + '"';
                        }
                    }
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1313);
fillstring += ' />';
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1314);
this._fillNode = DOCUMENT.createElement(fillstring);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1315);
node.appendChild(this._fillNode);
                }
			}
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1318);
if(fill.color)
			{
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1320);
node.fillcolor = fill.color;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1321);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1322);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1323);
if(IS_NUM(fillOpacity) && fillOpacity < 1)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1325);
fill.opacity = fillOpacity;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1326);
if(this._fillNode)
					{
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1328);
if(this._fillNode.getAttribute("type") != "solid")
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1330);
this._fillNode.type = "solid";
                        }
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1332);
this._fillNode.opacity = fillOpacity;
					}
					else
					{
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1336);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml" class="vmlfill" style="behavior:url(#default#VML);display:inline-block;" type="solid" opacity="' + fillOpacity + '"/>';
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1337);
this._fillNode = DOCUMENT.createElement(fillstring);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1338);
node.appendChild(this._fillNode);
					}
				}
				else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1341);
if(this._fillNode)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1343);
this._fillNode.opacity = 1;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1344);
this._fillNode.type = "solid";
				}}
			}}
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1348);
node.filled = filled;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1349);
this._fillFlag = false;
	},

	//not used. remove next release.
    _updateFillNode: function(node)
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateFillNode", 1353);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1355);
if(!this._fillNode)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1357);
this._fillNode = this._createGraphicNode("fill");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1358);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getGradientFill", 1370);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1372);
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
			i,
			oi,
			colorstring = "",
			cx = fill.cx,
			cy = fill.cy,
			fx = fill.fx,
			fy = fill.fy,
			r = fill.r,
            pct,
			rotation = fill.rotation || 0;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1394);
if(type === "linear")
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1396);
if(rotation <= 270)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1398);
rotation = Math.abs(rotation - 270);
            }
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1400);
if(rotation < 360)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1402);
rotation = 270 + (360 - rotation);
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1406);
rotation = 270;
            }}
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1408);
gradientProps.type = "gradient";//"gradientunscaled";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1409);
gradientProps.angle = rotation;
		}
		else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1411);
if(type === "radial")
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1413);
gradientBoxWidth = w * (r * 2);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1414);
gradientBoxHeight = h * (r * 2);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1415);
fx = r * 2 * (fx - 0.5);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1416);
fy = r * 2 * (fy - 0.5);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1417);
fx += cx;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1418);
fy += cy;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1419);
gradientProps.focussize = (gradientBoxWidth/w)/10 + "% " + (gradientBoxHeight/h)/10 + "%";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1420);
gradientProps.alignshape = false;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1421);
gradientProps.type = "gradientradial";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1422);
gradientProps.focus = "100%";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1423);
gradientProps.focusposition = Math.round(fx * 100) + "% " + Math.round(fy * 100) + "%";
		}}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1425);
for(i = 0;i < len; ++i) {
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1426);
stop = stops[i];
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1427);
color = stop.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1428);
opacity = stop.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1429);
opacity = isNumber(opacity) ? opacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1430);
pct = stop.offset || i/(len-1);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1431);
pct *= (r * 2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1432);
pct = Math.round(100 * pct) + "%";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1433);
oi = i > 0 ? i + 1 : "";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1434);
gradientProps["opacity" + oi] = opacity + "";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1435);
colorstring += ", " + pct + " " + color;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1437);
if(parseFloat(pct) < 100)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1439);
colorstring += ", 100% " + color;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1441);
gradientProps.colors = colorstring.substr(2);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1442);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_addTransform", 1453);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1455);
args = Y.Array(args);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1456);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1457);
args.unshift(type);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1458);
this._transforms.push(args);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1459);
if(this.initialized)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1461);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateTransform", 1471);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1473);
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
            i,
            len = this._transforms.length;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1486);
if(this._transforms && this._transforms.length > 0)
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1488);
transformOrigin = this.get("transformOrigin");

            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1490);
if(isPathShape)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1492);
normalizedMatrix.translate(this._left, this._top);
            }
            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.
            //subtract 0.5 from values
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1496);
tx = transformOrigin[0] - 0.5;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1497);
ty = transformOrigin[1] - 0.5;

            //ensure the values are within the appropriate range to avoid errors
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1500);
tx = Math.max(-0.5, Math.min(0.5, tx));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1501);
ty = Math.max(-0.5, Math.min(0.5, ty));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1502);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1504);
key = this._transforms[i].shift();
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1505);
if(key)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1507);
normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1508);
matrix[key].apply(matrix, this._transforms[i]);
                }
			}
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1511);
if(isPathShape)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1513);
normalizedMatrix.translate(-this._left, -this._top);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1515);
transform = normalizedMatrix.a + "," +
                        normalizedMatrix.c + "," +
                        normalizedMatrix.b + "," +
                        normalizedMatrix.d + "," +
                        0 + "," +
                        0;
		}
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1522);
this._graphic.addToRedrawQueue(this);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1523);
if(transform)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1525);
if(!this._skew)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1527);
this._skew = DOCUMENT.createElement( '<skew class="vmlskew" xmlns="urn:schemas-microsft.com:vml" on="false" style="behavior:url(#default#VML);display:inline-block;" />');
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1528);
this.node.appendChild(this._skew);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1530);
this._skew.matrix = transform;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1531);
this._skew.on = true;
            //this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + "px, " + this._getSkewOffsetValue(normalizedMatrix.dy) + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1533);
this._skew.origin = tx + ", " + ty;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1535);
if(this._type != "path")
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1537);
this._transforms = [];
        }
        //add the translate to the x and y coordinates
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1540);
node.style.left = (x + this._getSkewOffsetValue(normalizedMatrix.dx)) + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1541);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getSkewOffsetValue", 1552);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1554);
var sign = Y.MatrixUtil.sign(val),
            absVal = Math.abs(val);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1556);
val = Math.min(absVal, 32767) * sign;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1557);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translate", 1594);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1596);
this._translateX += x;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1597);
this._translateY += y;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1598);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translateX", 1608);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1610);
this._translateX += x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1611);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translateY", 1621);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1623);
this._translateY += y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1624);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skew", 1634);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1636);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skewX", 1645);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1647);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skewY", 1656);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1658);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "rotate", 1667);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1669);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "scale", 1678);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1680);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "on", 1692);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1694);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1696);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1698);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateHandler", 1717);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1719);
var host = this,
            node = host.node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1721);
host._fillChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1722);
host._strokeChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1723);
node.style.width = this.get("width") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1724);
node.style.height = this.get("height") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1725);
this._draw();
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1726);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphicNode", 1737);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1739);
type = type || this._type;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1740);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDefaultFill", 1750);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1751);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDefaultStroke", 1769);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1771);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "set", 1788);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1790);
var host = this;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1791);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1792);
if(host.initialized)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1794);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getBounds", 1807);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1809);
var isPathShape = this instanceof Y.VMLPath,
			w = this.get("width"),
			h = this.get("height"),
            x = this.get("x"),
            y = this.get("y");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1814);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1816);
x = x + this._left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1817);
y = y + this._top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1818);
w = this._right - this._left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1819);
h = this._bottom - this._top;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1821);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getContentRect", 1834);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1836);
var transformOrigin = this.get("transformOrigin"),
            transformX = transformOrigin[0] * w,
            transformY = transformOrigin[1] * h,
            transforms = this.matrix.getTransformArray(this.get("transform")),
            matrix = new Y.Matrix(),
            i,
            len = transforms.length,
            transform,
            key,
            contentRect,
            isPathShape = this instanceof Y.VMLPath;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1847);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1849);
matrix.translate(this._left, this._top);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1851);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1852);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1853);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1854);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1856);
transform = transforms[i];
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1857);
key = transform.shift();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1858);
if(key)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1860);
matrix[key].apply(matrix, transform);
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1863);
matrix.translate(-transformX, -transformY);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1864);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1866);
matrix.translate(-this._left, -this._top);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1868);
contentRect = matrix.getContentRect(w, h, x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1869);
return contentRect;
    },

    /**
     * Places the shape above all other shapes.
     *
     * @method toFront
     */
    toFront: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "toFront", 1877);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1879);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1880);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1882);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "toBack", 1891);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1893);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1894);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1896);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_parsePathData", 1907);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1909);
var method,
            methodSymbol,
            args,
            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),
            i,
            len,
            str,
            symbolToMethod = this._pathSymbolToMethod;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1917);
if(commandArray)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1919);
this.clear();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1920);
len = commandArray.length || 0;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1921);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1923);
str = commandArray[i];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1924);
methodSymbol = str.substr(0, 1);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1925);
args = str.substr(1).match(SPLITARGSPATTERN);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1926);
method = symbolToMethod[methodSymbol];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1927);
if(method)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1929);
if(args)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1931);
this[method].apply(this, args);
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1935);
this[method].apply(this);
                    }
                }
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1939);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "destroy", 1948);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1950);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1951);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1953);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1957);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_destroy", 1967);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1969);
if(this.node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1971);
if(this._fillNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1973);
this.node.removeChild(this._fillNode);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1974);
this._fillNode = null;
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1976);
if(this._strokeNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1978);
this.node.removeChild(this._strokeNode);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1979);
this._strokeNode = null;
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1981);
Y.one(this.node).remove(true);
        }
    }
}, Y.VMLDrawing.prototype));

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1986);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 1995);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1997);
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
     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains
     * corresponding methods for each transform that will apply the transform to the current matrix. The below code illustrates how you might use the
     * `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2032);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2034);
var i,
                len,
                transform;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2037);
this.matrix.init();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2038);
this._normalizedMatrix.init();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2039);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2040);
len = this._transforms.length;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2041);
for(i = 0;i < len; ++i)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2043);
transform = this._transforms[i];
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2045);
this._transform = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2046);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2049);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2051);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 2082);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2084);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2087);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2089);
var node = this.node;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2090);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2092);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2094);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2123);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2124);
var node = this.node,
				visibility = val ? "visible" : "hidden";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2126);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2128);
node.style.visibility = visibility;
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2130);
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
     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1.
     *              Note: No effect for IE 6 - 8</dd>
     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd>
     *          </dl>
     *      </dd>
     *      <p>Linear gradients also have the following property:</p>
     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the
     *      flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>
     *      <p>Radial gradients have the following additional properties:</p>
     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>
     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>
     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>
     *  </dl>
     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>
     *  <dl>
     *      <dt>cx</dt><dd>
     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>
     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and
     *          `VMLShape` classes which are used on Android or IE 6 - 8.</p>
     *      </dd>
     *      <dt>cy</dt><dd>
     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>
     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape`
     *          classes which are used on Android or IE 6 - 8.</p>
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2186);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2188);
var i,
				fill,
				tmpl = this.get("fill") || this._getDefaultFill();

			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2192);
if(val)
			{
				//ensure, fill type is solid if color is explicitly passed.
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2195);
if(val.hasOwnProperty("color"))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2197);
val.type = "solid";
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2199);
for(i in val)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2201);
if(val.hasOwnProperty(i))
					{
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2203);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2207);
fill = tmpl;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2208);
if(fill && fill.color)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2210);
if(fill.color === undefined || fill.color == "none")
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2212);
fill.color = null;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2215);
this._fillFlag = true;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2216);
return fill;
		}
	},

	/**
	 * Contains information about the stroke of the shape.
     *  <dl>
     *      <dt>color</dt><dd>The color of the stroke.</dd>
     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>
     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>
     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to "none", a solid stroke is drawn. When set
     *      to an array, the first index indicates the length of the dash. The second index indicates the length of gap.
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
     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin
     *              of miter, you simply specify the limit as opposed to having separate miter and miter limit values.</dd>
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2251);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2253);
var i,
				stroke,
                wt,
				tmpl = this.get("stroke") || this._getDefaultStroke();
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2257);
if(val)
			{
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2259);
if(val.hasOwnProperty("weight"))
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2261);
wt = parseInt(val.weight, 10);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2262);
if(!isNaN(wt))
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2264);
val.weight = wt;
                    }
                }
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2267);
for(i in val)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2269);
if(val.hasOwnProperty(i))
					{
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2271);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2275);
stroke = tmpl;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2276);
this._strokeFlag = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2277);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2306);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2308);
return this.node;
		}
	},

    /**
     * Represents an SVG Path string. This will be parsed and added to shape's API to represent the SVG data across all
     * implementations. Note that when using VML or SVG implementations, part of this content will be added to the DOM using
     * respective VML/SVG attributes. If your content comes from an untrusted source, you will need to ensure that no
     * malicious code is included in that content.
     *
     * @config data
     * @type String
     */
    data: {
        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2322);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2324);
if(this.get("node"))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2326);
this._parsePathData(val);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2328);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2341);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2343);
return this._graphic;
		}
	}
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2347);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2358);
VMLPath = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLPath", 2358);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2360);
VMLPath.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2363);
VMLPath.NAME = "path";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2364);
Y.extend(VMLPath, Y.VMLShape);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2365);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2373);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2375);
var val = Math.max(this._right - this._left, 0);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2376);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2387);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2389);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2403);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2405);
return this._path;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2409);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2420);
VMLRect = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLRect", 2420);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2422);
VMLRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2424);
VMLRect.NAME = "rect";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2425);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2435);
VMLRect.ATTRS = Y.VMLShape.ATTRS;
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2436);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2447);
VMLEllipse = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLEllipse", 2447);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2449);
VMLEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2452);
VMLEllipse.NAME = "ellipse";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2454);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2464);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2474);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2476);
var val = this.get("width");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2477);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2478);
return val;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2481);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2483);
var w = val * 2;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2484);
this.set("width", w);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2485);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2499);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2501);
var val = this.get("height");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2502);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2503);
return val;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2506);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2508);
var h = val * 2;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2509);
this.set("height", h);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2510);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2514);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2525);
VMLCircle = function(cfg)
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLCircle", 2525);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2527);
VMLCircle.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2530);
VMLCircle.NAME = "circle";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2532);
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

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2543);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2563);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2565);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2566);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2569);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2571);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2573);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2584);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2586);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2587);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2590);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2592);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2594);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2598);
Y.VMLCircle = VMLCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class VMLPieSlice
 * @constructor
 */
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2606);
VMLPieSlice = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLPieSlice", 2606);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2608);
VMLPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2610);
VMLPieSlice.NAME = "vmlPieSlice";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2611);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_draw", 2627);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2629);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2634);
this.clear();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2635);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2636);
this.end();
	}
 }, Y.VMLDrawing.prototype));
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2639);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2677);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2688);
VMLGraphic = function() {
    _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLGraphic", 2688);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2689);
VMLGraphic.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2692);
VMLGraphic.NAME = "vmlGraphic";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2694);
VMLGraphic.ATTRS = {
    /**
     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node
     * instance or a CSS selector string.
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 2711);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2713);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2716);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2718);
var node = this._node;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2719);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2721);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2723);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2737);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2739);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2752);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2754);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2767);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2769);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2780);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2782);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2784);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2786);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2797);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2799);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2801);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2803);
return val;
        }
    },

    /**
     *  Determines the sizing of the Graphic.
     *
     *  <dl>
     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the
     *      <code>width</code> and <code>height</code> attributes or are determined by the dimensions of the parent element. The
     *      content contained in the Graphic will be sized to fit with in the Graphic instance's dimensions. When using this
     *      setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>
     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the
     *      size and positioning of the content.</dd>
     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code>
     *      and <code>height</code> attributes or are determined by the dimensions of the parent element. The contents of the
     *      Graphic instance are not affected by this setting.</dd>
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2874);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2876);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2879);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2881);
this._x = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2882);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2884);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2886);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2897);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2899);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2902);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2904);
this._y = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2905);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2907);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2909);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2929);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2931);
this._toggleVisible(val);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2932);
return val;
        }
    }
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2937);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "set", 2947);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2949);
var host = this,
            redrawAttrs = {
                autoDraw: true,
                autoSize: true,
                preserveAspectRatio: true,
                resizeDown: true
            },
            key,
            forceRedraw = false;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2958);
AttributeLite.prototype.set.apply(host, arguments);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2959);
if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2961);
if(Y_LANG.isString && redrawAttrs[attr])
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2963);
forceRedraw = true;
            }
            else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2965);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2967);
for(key in redrawAttrs)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2969);
if(redrawAttrs.hasOwnProperty(key) && attr[key])
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2971);
forceRedraw = true;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2972);
break;
                    }
                }
            }}
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2977);
if(forceRedraw)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2979);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getXY", 3007);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3009);
var node = this.parentNode,
            x = this.get("x"),
            y = this.get("y"),
            xy;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3013);
if(node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3015);
xy = Y.one(node).getXY();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3016);
xy[0] += x;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3017);
xy[1] += y;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3021);
xy = Y.DOM._getOffset(this._node);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3023);
return xy;
    },

    /**
     * Initializes the class.
     *
     * @method initializer
     * @private
     */
    initializer: function(config) {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "initializer", 3032);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3033);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3035);
this._shapes = {};
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3036);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3042);
this._node = this._createGraphic();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3043);
this._node.style.left = this.get("x") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3044);
this._node.style.top = this.get("y") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3045);
this._node.style.visibility = visibility;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3046);
this._node.setAttribute("id", this.get("id"));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3047);
if(render)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3049);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "render", 3059);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3060);
var parentNode = Y.one(render),
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3063);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3064);
parentNode.appendChild(this._node);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3065);
this.parentNode = parentNode;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3066);
this.set("width", w);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3067);
this.set("height", h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3068);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "destroy", 3076);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3078);
this.clear();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3079);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addShape", 3089);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3091);
cfg.graphic = this;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3092);
if(!this.get("visible"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3094);
cfg.visible = false;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3096);
var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3098);
this._appendShape(shape);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3099);
shape._appendStrokeAndFill();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3100);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_appendShape", 3110);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3112);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3114);
if(this.get("autoDraw") || this.get("autoSize") == "sizeContentToGraphic")
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3116);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3120);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeShape", 3130);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3132);
if(!(shape instanceof VMLShape))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3134);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3136);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3139);
if(shape && (shape instanceof VMLShape))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3141);
shape._destroy();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3142);
this._shapes[shape.get("id")] = null;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3143);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3145);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3147);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeAllShapes", 3156);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3158);
var shapes = this._shapes,
            i;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3160);
for(i in shapes)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3162);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3164);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3167);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_removeChildren", 3177);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3179);
if(node.hasChildNodes())
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3181);
var child;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3182);
while(node.firstChild)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3184);
child = node.firstChild;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3185);
this._removeChildren(child);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3186);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "clear", 3196);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3197);
this.removeAllShapes();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3198);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toggleVisible", 3208);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3210);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3213);
if(shapes)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3215);
for(i in shapes)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3217);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3219);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3223);
if(this._node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3225);
this._node.style.visibility = visibility;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3227);
if(this._node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3229);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setSize", 3240);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3241);
w = Math.round(w);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3242);
h = Math.round(h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3243);
this._node.style.width = w + 'px';
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3244);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setPosition", 3254);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3256);
x = Math.round(x);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3257);
y = Math.round(y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3258);
this._node.style.left = x + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3259);
this._node.style.top = y + "px";
    },

    /**
     * Creates a group element
     *
     * @method _createGraphic
     * @private
     */
    _createGraphic: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphic", 3268);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3269);
var group = DOCUMENT.createElement('<group xmlns="urn:schemas-microsft.com:vml" style="behavior:url(#default#VML);padding:0px 0px 0px 0px;display:block;position:absolute;top:0px;left:0px;zoom:1;" />');
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3270);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphicNode", 3282);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3284);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getShapeById", 3295);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3297);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getShapeClass", 3308);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3310);
var shape = this._shapeClass[val];
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3311);
if(shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3313);
return shape;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3315);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "batch", 3339);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3341);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3342);
this.set("autoDraw", false);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3343);
method.apply();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3344);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDocFrag", 3354);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3356);
if(!this._frag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3358);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3360);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addToRedrawQueue", 3370);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3372);
var shapeBox,
            box;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3374);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3375);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3377);
shapeBox = shape.getBounds();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3378);
box = this._contentBounds;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3379);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3380);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3381);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3382);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3383);
box.width = box.right - box.left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3384);
box.height = box.bottom - box.top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3385);
this._contentBounds = box;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3387);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3389);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_redraw", 3399);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3401);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3421);
this._node.style.visibility = "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3422);
if(autoSize)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3424);
if(autoSize == "sizeContentToGraphic")
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3426);
preserveAspectRatio = this.get("preserveAspectRatio");
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3427);
if(preserveAspectRatio == "none" || contentWidth/contentHeight === nodeWidth/nodeHeight)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3429);
xCoordOrigin = left;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3430);
yCoordOrigin = top;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3431);
xCoordSize = contentWidth;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3432);
yCoordSize = contentHeight;
                }
                else
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3436);
if(contentWidth * nodeHeight/contentHeight > nodeWidth)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3438);
aspectRatio = nodeHeight/nodeWidth;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3439);
xCoordSize = contentWidth;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3440);
yCoordSize = contentWidth * aspectRatio;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3441);
scaledHeight = (nodeWidth * (contentHeight/contentWidth)) * (yCoordSize/nodeHeight);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3442);
yCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(5).toLowerCase(), scaledHeight, yCoordSize);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3443);
yCoordOrigin = top + yCoordOrigin;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3444);
xCoordOrigin = left;
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3448);
aspectRatio = nodeWidth/nodeHeight;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3449);
xCoordSize = contentHeight * aspectRatio;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3450);
yCoordSize = contentHeight;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3451);
scaledWidth = (nodeHeight * (contentWidth/contentHeight)) * (xCoordSize/nodeWidth);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3452);
xCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(1, 4).toLowerCase(), scaledWidth, xCoordSize);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3453);
xCoordOrigin = xCoordOrigin + left;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3454);
yCoordOrigin = top;
                    }
                }
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3457);
this._node.style.width = nodeWidth + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3458);
this._node.style.height = nodeHeight + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3459);
this._node.coordOrigin = xCoordOrigin + ", " + yCoordOrigin;
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3463);
xCoordSize = contentWidth;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3464);
yCoordSize = contentHeight;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3465);
this._node.style.width = contentWidth + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3466);
this._node.style.height = contentHeight + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3467);
this._state.width = contentWidth;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3468);
this._state.height =  contentHeight;

            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3471);
this._node.coordSize = xCoordSize + ", " + yCoordSize;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3475);
this._node.style.width = nodeWidth + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3476);
this._node.style.height = nodeHeight + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3477);
this._node.coordSize = nodeWidth + ", " + nodeHeight;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3479);
if(this._frag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3481);
this._node.appendChild(this._frag);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3482);
this._frag = null;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3484);
if(visible)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3486);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_calculateCoordOrigin", 3500);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3502);
var coord;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3503);
switch(position)
        {
            case "min" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3506);
coord = 0;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3507);
break;
            case "mid" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3509);
coord = (size - coordsSize)/2;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3510);
break;
            case "max" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3512);
coord = (size - coordsSize);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3513);
break;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3515);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getUpdatedContentBounds", 3525);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3527);
var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {};
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3532);
for(i in queue)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3534);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3536);
shape = queue[i];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3537);
bounds = shape.getBounds();
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3538);
box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3539);
box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3540);
box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3541);
box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3544);
box.left = Y_LANG.isNumber(box.left) ? box.left : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3545);
box.top = Y_LANG.isNumber(box.top) ? box.top : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3546);
box.right = Y_LANG.isNumber(box.right) ? box.right : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3547);
box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3548);
this._contentBounds = box;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3549);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toFront", 3559);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3561);
var contentNode = this._node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3562);
if(shape instanceof Y.VMLShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3564);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3566);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3568);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toBack", 3579);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3581);
var contentNode = this._node,
            targetNode;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3583);
if(shape instanceof Y.VMLShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3585);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3587);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3589);
targetNode = contentNode.firstChild;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3590);
if(targetNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3592);
contentNode.insertBefore(shape, targetNode);
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3596);
contentNode.appendChild(shape);
            }
        }
    }
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3601);
Y.VMLGraphic = VMLGraphic;



}, '@VERSION@', {"requires": ["graphics"]});
