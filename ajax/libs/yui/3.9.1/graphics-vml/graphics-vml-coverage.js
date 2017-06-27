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
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].code=["YUI.add('graphics-vml', function (Y, NAME) {","","var IMPLEMENTATION = \"vml\",","    SHAPE = \"shape\",","	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,","    SPLITARGSPATTERN = /[\\-]?[0-9]*[0-9|\\.][0-9]*/g,","    Y_LANG = Y.Lang,","    IS_NUM = Y_LANG.isNumber,","    IS_ARRAY = Y_LANG.isArray,","    Y_DOM = Y.DOM,","    Y_SELECTOR = Y.Selector,","    DOCUMENT = Y.config.doc,","    AttributeLite = Y.AttributeLite,","	VMLShape,","	VMLCircle,","	VMLPath,","	VMLRect,","	VMLEllipse,","	VMLGraphic,","    VMLPieSlice,","    _getClassName = Y.ClassNameManager.getClassName;","","function VMLDrawing() {}","","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class."," * `VMLDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Drawing.html\">`Drawing`</a> class will point to the `VMLDrawing` class."," *"," * @module graphics"," * @class VMLDrawing"," * @constructor"," */","VMLDrawing.prototype = {","    /**","     * Maps path to methods","     *","     * @property _pathSymbolToMethod","     * @type Object","     * @private","     */","    _pathSymbolToMethod: {","        M: \"moveTo\",","        m: \"relativeMoveTo\",","        L: \"lineTo\",","        l: \"relativeLineTo\",","        C: \"curveTo\",","        c: \"relativeCurveTo\",","        Q: \"quadraticCurveTo\",","        q: \"relativeQuadraticCurveTo\",","        z: \"closePath\",","        Z: \"closePath\"","    },","","    /**","     * Value for rounding up to coordsize","     *","     * @property _coordSpaceMultiplier","     * @type Number","     * @private","     */","    _coordSpaceMultiplier: 100,","","    /**","     * Rounds dimensions and position values based on the coordinate space.","     *","     * @method _round","     * @param {Number} The value for rounding","     * @return Number","     * @private","     */","    _round:function(val)","    {","        return Math.round(val * this._coordSpaceMultiplier);","    },","","    /**","     * Concatanates the path.","     *","     * @method _addToPath","     * @param {String} val The value to add to the path string.","     * @private","     */","    _addToPath: function(val)","    {","        this._path = this._path || \"\";","        if(this._movePath)","        {","            this._path += this._movePath;","            this._movePath = null;","        }","        this._path += val;","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    curveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a bezier curve.","     *","     * @method relativeCurveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeCurveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements curveTo methods.","     *","     * @method _curveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _curveTo: function(args, relative) {","        var w,","            h,","            x,","            y,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len,","            path,","            command = relative ? \" v \" : \" c \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        len = args.length - 5;","        path = command;","        for(i = 0; i < len; i = i + 6)","        {","            cp1x = parseFloat(args[i]);","            cp1y = parseFloat(args[i + 1]);","            cp2x = parseFloat(args[i + 2]);","            cp2y = parseFloat(args[i + 3]);","            x = parseFloat(args[i + 4]);","            y = parseFloat(args[i + 5]);","            if(i > 0)","            {","                path = path + \", \";","            }","            path = path +","                    this._round(cp1x) +","                    \", \" +","                    this._round(cp1y) +","                    \", \" +","                    this._round(cp2x) +","                    \", \" +","                    this._round(cp2y) +","                    \", \" +","                    this._round(x) +","                    \", \" +","                    this._round(y);","            cp1x = cp1x + relativeX;","            cp1y = cp1y + relativeY;","            cp2x = cp2x + relativeX;","            cp2y = cp2y + relativeY;","            x = x + relativeX;","            y = y + relativeY;","            right = Math.max(x, Math.max(cp1x, cp2x));","            bottom = Math.max(y, Math.max(cp1y, cp2y));","            left = Math.min(x, Math.min(cp1x, cp2x));","            top = Math.min(y, Math.min(cp1y, cp2y));","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","        this._addToPath(path);","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    quadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a quadratic bezier curve relative to the current position.","     *","     * @method relativeQuadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeQuadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements quadraticCurveTo methods.","     *","     * @method _quadraticCurveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _quadraticCurveTo: function(args, relative) {","        var cpx,","            cpy,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            x,","            y,","            currentX = this._currentX,","            currentY = this._currentY,","            i,","            len = args.length - 3,","            bezierArgs = [],","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        for(i = 0; i < len; i = i + 4)","        {","            cpx = parseFloat(args[i]) + relativeX;","            cpy = parseFloat(args[i + 1]) + relativeY;","            x = parseFloat(args[i + 2]) + relativeX;","            y = parseFloat(args[i + 3]) + relativeY;","            cp1x = currentX + 0.67*(cpx - currentX);","            cp1y = currentY + 0.67*(cpy - currentY);","            cp2x = cp1x + (x - currentX) * 0.34;","            cp2y = cp1y + (y - currentY) * 0.34;","            bezierArgs.push(cp1x);","            bezierArgs.push(cp1y);","            bezierArgs.push(cp2x);","            bezierArgs.push(cp2y);","            bezierArgs.push(x);","            bezierArgs.push(y);","        }","        this._curveTo.apply(this, [bezierArgs, false]);","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     */","    drawRect: function(x, y, w, h) {","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        this._currentX = x;","        this._currentY = y;","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     * @chainable","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        this.moveTo(x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @chainable","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 360,","            circum = radius * 2;","","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this.moveTo((x + circum), (y + radius));","        this._addToPath(","            \" ae \" +","            this._round(x + radius) +","            \", \" +","            this._round(y + radius) +","            \", \" +","            this._round(radius) +","            \", \" +","            this._round(radius) +","            \", \" +","            startAngle +","            \", \" +","            endAngle","        );","        return this;","    },","","    /**","     * Draws an ellipse.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var startAngle = 0,","            endAngle = 360,","            radius = w * 0.5,","            yRadius = h * 0.5;","        endAngle *= 65535;","        this._drawingComplete = false;","        this._trackSize(x + w, y + h);","        this.moveTo((x + w), (y + yRadius));","        this._addToPath(","            \" ae \" +","            this._round(x + radius) +","            \", \" +","            this._round(x + radius) +","            \", \" +","            this._round(y + yRadius) +","            \", \" +","            this._round(radius) +","            \", \" +","            this._round(yRadius) +","            \", \" +","            startAngle +","            \", \" +","            endAngle","        );","        return this;","    },","","    /**","     * Draws a diamond.","     *","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @chainable","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @chainable","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius)","    {","        var diameter = radius * 2;","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","        this._currentX = x;","        this._currentY = y;","        startAngle *= -65535;","        arc *= 65536;","        startAngle = Math.round(startAngle);","        arc = Math.round(arc);","        this.moveTo(x, y);","        this._addToPath(","            \" ae \" +","            this._round(x) +","            \", \" +","            this._round(y) +","            \", \" +","            this._round(radius) +","            \" \" +","            this._round(radius) +","            \", \" +","            startAngle +","            \", \" +","            arc","        );","        this._trackSize(diameter, diameter);","        return this;","    },","","    /**","     * Draws a line segment from the current drawing position to the specified x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    lineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a line segment using the current line style from the current drawing position to the relative x and y coordinates.","     *","     * @method relativeLineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    relativeLineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements lineTo methods.","     *","     * @method _lineTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _lineTo: function(args, relative) {","        var point1 = args[0],","            i,","            len,","            x,","            y,","            path = relative ? \" r \" : \" l \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        if (typeof point1 === \"string\" || typeof point1 === \"number\") {","            len = args.length - 1;","            for (i = 0; i < len; i = i + 2) {","                x = parseFloat(args[i]);","                y = parseFloat(args[i + 1]);","                path += ' ' + this._round(x) + ', ' + this._round(y);","                x = x + relativeX;","                y = y + relativeY;","                this._currentX = x;","                this._currentY = y;","                this._trackSize.apply(this, [x, y]);","            }","        }","        else","        {","            len = args.length;","            for (i = 0; i < len; i = i + 1) {","                x = parseFloat(args[i][0]);","                y = parseFloat(args[i][1]);","                path += ' ' + this._round(x) + ', ' + this._round(y);","                x = x + relativeX;","                y = y + relativeY;","                this._currentX = x;","                this._currentY = y;","                this._trackSize.apply(this, [x, y]);","            }","        }","        this._addToPath(path);","        return this;","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    moveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Moves the current drawing position relative to specified x and y coordinates.","     *","     * @method relativeMoveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeMoveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements moveTo methods.","     *","     * @method _moveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _moveTo: function(args, relative) {","        var x = parseFloat(args[0]),","            y = parseFloat(args[1]),","            command = relative ? \" t \" : \" m \",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        this._movePath = command + this._round(x) + \", \" + this._round(y);","        x = x + relativeX;","        y = y + relativeY;","        this._trackSize(x, y);","        this._currentX = x;","        this._currentY = y;","    },","","    /**","     * Draws the graphic.","     *","     * @method _draw","     * @private","     */","    _closePath: function()","    {","        var fill = this.get(\"fill\"),","            stroke = this.get(\"stroke\"),","            node = this.node,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            path = this._path,","            pathEnd = \"\",","            multiplier = this._coordSpaceMultiplier;","        this._fillChangeHandler();","        this._strokeChangeHandler();","        if(path)","        {","            if(fill && fill.color)","            {","                pathEnd += ' x';","            }","            if(stroke)","            {","                pathEnd += ' e';","            }","        }","        if(path)","        {","            node.path = path + pathEnd;","        }","        if(!isNaN(w) && !isNaN(h))","        {","            node.coordOrigin = this._left + \", \" + this._top;","            node.coordSize = (w * multiplier) + \", \" + (h * multiplier);","            node.style.position = \"absolute\";","            node.style.width =  w + \"px\";","            node.style.height =  h + \"px\";","        }","        this._path = path;","        this._movePath = null;","        this._updateTransform();","    },","","    /**","     * Completes a drawing operation.","     *","     * @method end","     * @chainable","     */","    end: function()","    {","        this._closePath();","        return this;","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     * @chainable","     */","    closePath: function()","    {","        this._addToPath(\" x e\");","        return this;","    },","","    /**","     * Clears the path.","     *","     * @method clear","     * @chainable","     */","    clear: function()","    {","		this._right = 0;","        this._bottom = 0;","        this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._path = \"\";","        this._movePath = null;","        return this;","    },","","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];","            }","        }","        return [ tmp[0][0], tmp[0][1] ];","    },","","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            xy;","        for(i = 0; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right, bottom);","        this._trackSize(left, top);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom)","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    },","","    _left: 0,","","    _right: 0,","","    _top: 0,","","    _bottom: 0,","","    _width: 0,","","    _height: 0","};","Y.VMLDrawing = VMLDrawing;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class."," * `VMLShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Shape.html\">`Shape`</a> class will point to the `VMLShape` class."," *"," * @module graphics"," * @class VMLShape"," * @constructor"," * @param {Object} cfg (optional) Attribute configs"," */","VMLShape = function()","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    this._normalizedMatrix = new Y.Matrix();","    VMLShape.superclass.constructor.apply(this, arguments);","};","","VMLShape.NAME = \"shape\";","","Y.extend(VMLShape, Y.GraphicBase, Y.mix({","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"shape\",","","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","	init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic,","            data = this.get(\"data\");","		host.createNode();","        if(graphic)","        {","            this._setGraphic(graphic);","        }","        if(data)","        {","            host._parsePathData(data);","        }","        this._updateHandler();","	},","","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a","     * `Graphic` instance, it will be assigned to the `graphic` attribute. Otherwise, a new Graphic instance will be created","     * and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.VMLGraphic)","        {","            this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.VMLGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","            this._appendStrokeAndFill();","        }","    },","","    /**","     * Appends fill and stroke nodes to the shape.","     *","     * @method _appendStrokeAndFill","     * @private","     */","    _appendStrokeAndFill: function()","    {","        if(this._strokeNode)","        {","            this.node.appendChild(this._strokeNode);","        }","        if(this._fillNode)","        {","            this.node.appendChild(this._fillNode);","        }","    },","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","        var node,","            concat = this._camelCaseConcat,","			x = this.get(\"x\"),","			y = this.get(\"y\"),","            w = this.get(\"width\"),","            h = this.get(\"height\"),","			id,","			type,","			name = this.name,","            nodestring,","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","			strokestring,","			classString,","			stroke,","			endcap,","			opacity,","			joinstyle,","			miterlimit,","			dashstyle,","			fill,","			fillstring;","			id = this.get(\"id\");","		type = this._type === \"path\" ? \"shape\" : this._type;","        classString = _getClassName(SHAPE) +","                    \" \" +","                    _getClassName(concat(IMPLEMENTATION, SHAPE)) +","                    \" \" +","                    _getClassName(name) +","                    \" \" +","                    _getClassName(concat(IMPLEMENTATION, name)) +","                    \" \" +","                    IMPLEMENTATION +","                    type;","        stroke = this._getStrokeProps();","        fill = this._getFillProps();","","		nodestring  = '<' +","                        type +","                        '  xmlns=\"urn:schemas-microsft.com:vml\" id=\"' +","                        id +","                        '\" class=\"' +","                        classString +","                        '\" style=\"behavior:url(#default#VML);display:inline-block;position:absolute;left:' +","                        x +","                        'px;top:' +","                        y +","                        'px;width:' +","                        w +","                        'px;height:' +","                        h +","                        'px;visibility:' +","                        visibility +","                        '\"';","","        if(stroke && stroke.weight && stroke.weight > 0)","        {","            endcap = stroke.endcap;","            opacity = parseFloat(stroke.opacity);","            joinstyle = stroke.joinstyle;","            miterlimit = stroke.miterlimit;","            dashstyle = stroke.dashstyle;","            nodestring += ' stroked=\"t\" strokecolor=\"' + stroke.color + '\" strokeWeight=\"' + stroke.weight + 'px\"';","","            strokestring = '<stroke class=\"vmlstroke\"' +","                            ' xmlns=\"urn:schemas-microsft.com:vml\"' +","                            ' on=\"t\"' +","                            ' style=\"behavior:url(#default#VML);display:inline-block;\"' +","                            ' opacity=\"' + opacity + '\"';","            if(endcap)","            {","                strokestring += ' endcap=\"' + endcap + '\"';","            }","            if(joinstyle)","            {","                strokestring += ' joinstyle=\"' + joinstyle + '\"';","            }","            if(miterlimit)","            {","                strokestring += ' miterlimit=\"' + miterlimit + '\"';","            }","            if(dashstyle)","            {","                strokestring += ' dashstyle=\"' + dashstyle + '\"';","            }","            strokestring += '></stroke>';","            this._strokeNode = DOCUMENT.createElement(strokestring);","            nodestring += ' stroked=\"t\"';","        }","        else","        {","            nodestring += ' stroked=\"f\"';","        }","        if(fill)","        {","            if(fill.node)","            {","                fillstring = fill.node;","                this._fillNode = DOCUMENT.createElement(fillstring);","            }","            if(fill.color)","            {","                nodestring += ' fillcolor=\"' + fill.color + '\"';","            }","            nodestring += ' filled=\"' + fill.filled + '\"';","        }","","","        nodestring += '>';","        nodestring += '</' + type + '>';","","        node = DOCUMENT.createElement(nodestring);","","        this.node = node;","        this._strokeFlag = false;","        this._fillFlag = false;","	},","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute","	 */","	addClass: function(className)","	{","        var node = this.node;","		Y_DOM.addClass(node, className);","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","        var node = this.node;","		Y_DOM.removeClass(node, className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains x & y values for new position (coordinates are page-based)","     *","	 */","	setXY: function(xy)","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY();","		this.set(\"x\", xy[0] - parentXY[0]);","		this.set(\"y\", xy[1] - parentXY[1]);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.","	 *","	 * @method contains","	 * @param {VMLShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","        var node = this.node;","		return node === refNode;","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y_SELECTOR.test(this.node, selector);","	},","","	/**","     * Calculates and returns properties for setting an initial stroke.","     *","     * @method _getStrokeProps","     * @return Object","     *","	 * @private","	 */","    _getStrokeProps: function()","    {","		var props,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","        if(stroke && stroke.weight && stroke.weight > 0)","		{","			props = {};","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","            if(linecap !== \"round\" && linecap !== \"square\")","            {","                linecap = \"flat\";","            }","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			props.stroked = true;","			props.color = stroke.color;","			props.weight = stroke.weight;","			props.endcap = linecap;","			props.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin === \"round\" || linejoin === \"bevel\")","			{","				props.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					props.miterlimit = Math.max(linejoin, 1);","					props.joinstyle = \"miter\";","				}","			}","			props.dashstyle = dash;","        }","        return props;","    },","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","	 * @private","	 */","	_strokeChangeHandler: function()","	{","        if(!this._strokeFlag)","        {","            return;","        }","        var node = this.node,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash = \"\",","			val,","			i = 0,","			len,","			linecap,","			linejoin;","		if(stroke && stroke.weight && stroke.weight > 0)","		{","			linecap = stroke.linecap || \"flat\";","			linejoin = stroke.linejoin || \"round\";","			if(linecap !== \"round\" && linecap !== \"square\")","			{","				linecap = \"flat\";","			}","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;","			node.stroked = true;","			node.strokeColor = stroke.color;","			node.strokeWeight = stroke.weight + \"px\";","			if(!this._strokeNode)","			{","				this._strokeNode = this._createGraphicNode(\"stroke\");","				node.appendChild(this._strokeNode);","			}","			this._strokeNode.endcap = linecap;","			this._strokeNode.opacity = stroke.opacity;","			if(IS_ARRAY(dashstyle))","			{","				dash = [];","				len = dashstyle.length;","				for(i = 0; i < len; ++i)","				{","					val = dashstyle[i];","					dash[i] = val / stroke.weight;","				}","			}","			if(linejoin === \"round\" || linejoin === \"bevel\")","			{","				this._strokeNode.joinstyle = linejoin;","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(IS_NUM(linejoin))","				{","					this._strokeNode.miterlimit = Math.max(linejoin, 1);","					this._strokeNode.joinstyle = \"miter\";","				}","			}","			this._strokeNode.dashstyle = dash;","            this._strokeNode.on = true;","		}","		else","		{","            if(this._strokeNode)","            {","                this._strokeNode.on = false;","            }","			node.stroked = false;","		}","        this._strokeFlag = false;","	},","","	/**","     * Calculates and returns properties for setting an initial fill.","     *","     * @method _getFillProps","     * @return Object","     *","	 * @private","	 */","	_getFillProps: function()","	{","		var fill = this.get(\"fill\"),","			fillOpacity,","			props,","			gradient,","			i,","			fillstring,","			filled = false;","		if(fill)","		{","			props = {};","","			if(fill.type === \"radial\" || fill.type === \"linear\")","			{","				fillOpacity = parseFloat(fill.opacity);","				fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;","				filled = true;","				gradient = this._getGradientFill(fill);","				fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\"' +","                            ' class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\"' +","                            ' opacity=\"' + fillOpacity + '\"';","				for(i in gradient)","				{","					if(gradient.hasOwnProperty(i))","					{","						fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","					}","				}","				fillstring += ' />';","				props.node = fillstring;","			}","			else if(fill.color)","			{","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","                props.color = fill.color;","				if(IS_NUM(fillOpacity))","				{","					fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);","                    props.opacity = fillOpacity;","                    if(fillOpacity < 1)","                    {","                        props.node = '<fill xmlns=\"urn:schemas-microsft.com:vml\"' +","                        ' class=\"vmlfill\" style=\"behavior:url(#default#VML);display:inline-block;\"' +","                        ' type=\"solid\" opacity=\"' + fillOpacity + '\"/>';","                    }","                }","			}","			props.filled = filled;","		}","		return props;","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _fillChangeHandler","	 * @private","	 */","	_fillChangeHandler: function()","	{","        if(!this._fillFlag)","        {","            return;","        }","		var node = this.node,","			fill = this.get(\"fill\"),","			fillOpacity,","			fillstring,","			filled = false,","            i,","            gradient;","		if(fill)","		{","			if(fill.type === \"radial\" || fill.type === \"linear\")","			{","				filled = true;","				gradient = this._getGradientFill(fill);","                if(this._fillNode)","                {","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            if(i === \"colors\")","                            {","                                this._fillNode.colors.value = gradient[i];","                            }","                            else","                            {","                                this._fillNode[i] = gradient[i];","                            }","                        }","                    }","                }","                else","                {","                    fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\"' +","                                ' class=\"vmlfill\"' +","                                ' style=\"behavior:url(#default#VML);display:inline-block;\"';","                    for(i in gradient)","                    {","                        if(gradient.hasOwnProperty(i))","                        {","                            fillstring += ' ' + i + '=\"' + gradient[i] + '\"';","                        }","                    }","                    fillstring += ' />';","                    this._fillNode = DOCUMENT.createElement(fillstring);","                    node.appendChild(this._fillNode);","                }","			}","			else if(fill.color)","			{","                node.fillcolor = fill.color;","				fillOpacity = parseFloat(fill.opacity);","				filled = true;","				if(IS_NUM(fillOpacity) && fillOpacity < 1)","				{","					fill.opacity = fillOpacity;","                    if(this._fillNode)","					{","                        if(this._fillNode.getAttribute(\"type\") !== \"solid\")","                        {","                            this._fillNode.type = \"solid\";","                        }","						this._fillNode.opacity = fillOpacity;","					}","					else","					{","                        fillstring = '<fill xmlns=\"urn:schemas-microsft.com:vml\"' +","                        ' class=\"vmlfill\"' +","                        ' style=\"behavior:url(#default#VML);display:inline-block;\"' +","                        ' type=\"solid\"' +","                        ' opacity=\"' + fillOpacity + '\"' +","                        '/>';","                        this._fillNode = DOCUMENT.createElement(fillstring);","                        node.appendChild(this._fillNode);","					}","				}","				else if(this._fillNode)","                {","                    this._fillNode.opacity = 1;","                    this._fillNode.type = \"solid\";","				}","			}","		}","		node.filled = filled;","        this._fillFlag = false;","	},","","	//not used. remove next release.","    _updateFillNode: function(node)","	{","		if(!this._fillNode)","		{","			this._fillNode = this._createGraphicNode(\"fill\");","			node.appendChild(this._fillNode);","		}","	},","","    /**","     * Calculates and returns an object containing gradient properties for a fill node.","     *","     * @method _getGradientFill","     * @param {Object} fill Object containing fill properties.","     * @return Object","     * @private","     */","	_getGradientFill: function(fill)","	{","		var gradientProps = {},","			gradientBoxWidth,","			gradientBoxHeight,","			type = fill.type,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			isNumber = IS_NUM,","			stop,","			stops = fill.stops,","			len = stops.length,","			opacity,","			color,","			i,","			oi,","			colorstring = \"\",","			cx = fill.cx,","			cy = fill.cy,","			fx = fill.fx,","			fy = fill.fy,","			r = fill.r,","            pct,","			rotation = fill.rotation || 0;","		if(type === \"linear\")","		{","            if(rotation <= 270)","            {","                rotation = Math.abs(rotation - 270);","            }","			else if(rotation < 360)","            {","                rotation = 270 + (360 - rotation);","            }","            else","            {","                rotation = 270;","            }","            gradientProps.type = \"gradient\";//\"gradientunscaled\";","			gradientProps.angle = rotation;","		}","		else if(type === \"radial\")","		{","			gradientBoxWidth = w * (r * 2);","			gradientBoxHeight = h * (r * 2);","			fx = r * 2 * (fx - 0.5);","			fy = r * 2 * (fy - 0.5);","			fx += cx;","			fy += cy;","			gradientProps.focussize = (gradientBoxWidth/w)/10 + \"% \" + (gradientBoxHeight/h)/10 + \"%\";","			gradientProps.alignshape = false;","			gradientProps.type = \"gradientradial\";","			gradientProps.focus = \"100%\";","			gradientProps.focusposition = Math.round(fx * 100) + \"% \" + Math.round(fy * 100) + \"%\";","		}","		for(i = 0;i < len; ++i) {","			stop = stops[i];","			color = stop.color;","			opacity = stop.opacity;","			opacity = isNumber(opacity) ? opacity : 1;","			pct = stop.offset || i/(len-1);","			pct *= (r * 2);","            pct = Math.round(100 * pct) + \"%\";","            oi = i > 0 ? i + 1 : \"\";","            gradientProps[\"opacity\" + oi] = opacity + \"\";","            colorstring += \", \" + pct + \" \" + color;","		}","		if(parseFloat(pct) < 100)","		{","			colorstring += \", 100% \" + color;","		}","		gradientProps.colors = colorstring.substr(2);","		return gradientProps;","	},","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","            key,","			transform,","			transformOrigin,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            tx,","            ty,","            matrix = this.matrix,","            normalizedMatrix = this._normalizedMatrix,","            isPathShape = this instanceof Y.VMLPath,","            i,","            len = this._transforms.length;","        if(this._transforms && this._transforms.length > 0)","		{","            transformOrigin = this.get(\"transformOrigin\");","","            if(isPathShape)","            {","                normalizedMatrix.translate(this._left, this._top);","            }","            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.","            //subtract 0.5 from values","            tx = transformOrigin[0] - 0.5;","            ty = transformOrigin[1] - 0.5;","","            //ensure the values are within the appropriate range to avoid errors","            tx = Math.max(-0.5, Math.min(0.5, tx));","            ty = Math.max(-0.5, Math.min(0.5, ty));","            for(i = 0; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]);","                    matrix[key].apply(matrix, this._transforms[i]);","                }","			}","            if(isPathShape)","            {","                normalizedMatrix.translate(-this._left, -this._top);","            }","            transform = normalizedMatrix.a + \",\" +","                        normalizedMatrix.c + \",\" +","                        normalizedMatrix.b + \",\" +","                        normalizedMatrix.d + \",\" +","                        0 + \",\" +","                        0;","		}","        this._graphic.addToRedrawQueue(this);","        if(transform)","        {","            if(!this._skew)","            {","                this._skew = DOCUMENT.createElement(","                    '<skew class=\"vmlskew\"' +","                    ' xmlns=\"urn:schemas-microsft.com:vml\"' +","                    ' on=\"false\"' +","                    ' style=\"behavior:url(#default#VML);display:inline-block;\"' +","                    '/>'","                );","                this.node.appendChild(this._skew);","            }","            this._skew.matrix = transform;","            this._skew.on = true;","            //this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + \"px, \" + this._getSkewOffsetValue(normalizedMatrix.dy) + \"px\";","            this._skew.origin = tx + \", \" + ty;","        }","        if(this._type !== \"path\")","        {","            this._transforms = [];","        }","        //add the translate to the x and y coordinates","        node.style.left = (x + this._getSkewOffsetValue(normalizedMatrix.dx)) + \"px\";","        node.style.top =  (y + this._getSkewOffsetValue(normalizedMatrix.dy)) + \"px\";","    },","","    /**","     * Normalizes the skew offset values between -32767 and 32767.","     *","     * @method _getSkewOffsetValue","     * @param {Number} val The value to normalize","     * @return Number","     * @private","     */","    _getSkewOffsetValue: function(val)","    {","        var sign = Y.MatrixUtil.sign(val),","            absVal = Math.abs(val);","        val = Math.min(absVal, 32767) * sign;","        return val;","    },","","	/**","	 * Storage for translateX","	 *","     * @property _translateX","     * @type Number","	 * @private","	 */","	_translateX: 0,","","	/**","	 * Storage for translateY","	 *","     * @property _translateY","     * @type Number","	 * @private","	 */","	_translateY: 0,","","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","","    /**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to translate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function()","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","     skewX: function()","     {","        this._addTransform(\"skewX\", arguments);","     },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","     skewY: function()","     {","        this._addTransform(\"skewY\", arguments);","     },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","     rotate: function()","     {","        this._addTransform(\"rotate\", arguments);","     },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","    scale: function()","    {","        this._addTransform(\"scale\", arguments);","    },","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so,","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function()","	{","		var host = this,","            node = host.node;","        host._fillChangeHandler();","        host._strokeChangeHandler();","        node.style.width = this.get(\"width\") + \"px\";","        node.style.height = this.get(\"height\") + \"px\";","        this._draw();","		host._updateTransform();","	},","","	/**","	 * Creates a graphic node","	 *","	 * @method _createGraphicNode","	 * @param {String} type node type to create","	 * @return HTMLElement","	 * @private","	 */","	_createGraphicNode: function(type)","	{","		type = type || this._type;","		return DOCUMENT.createElement(","                '<' + type +","                ' xmlns=\"urn:schemas-microsft.com:vml\"' +","                ' style=\"behavior:url(#default#VML);display:inline-block;\"' +","                ' class=\"vml' + type + '\"' +","                '/>'","            );","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @private","	 * @method _getDefaultFill","	 * @return Object","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			opacity: 1,","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @private","	 * @method _getDefaultStroke","	 * @return Object","	 */","	_getDefaultStroke: function()","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this;","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox.","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var isPathShape = this instanceof Y.VMLPath,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","            x = this.get(\"x\"),","            y = this.get(\"y\");","        if(isPathShape)","        {","            x = x + this._left;","            y = y + this._top;","            w = this._right - this._left;","            h = this._bottom - this._top;","        }","        return this._getContentRect(w, h, x, y);","	},","","    /**","     * Calculates the bounding box for the shape.","     *","     * @method _getContentRect","     * @param {Number} w width of the shape","     * @param {Number} h height of the shape","     * @param {Number} x x-coordinate of the shape","     * @param {Number} y y-coordinate of the shape","     * @private","     */","    _getContentRect: function(w, h, x, y)","    {","        var transformOrigin = this.get(\"transformOrigin\"),","            transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h,","            transforms = this.matrix.getTransformArray(this.get(\"transform\")),","            matrix = new Y.Matrix(),","            i,","            len = transforms.length,","            transform,","            key,","            contentRect,","            isPathShape = this instanceof Y.VMLPath;","        if(isPathShape)","        {","            matrix.translate(this._left, this._top);","        }","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        for(i = 0; i < len; i = i + 1)","        {","            transform = transforms[i];","            key = transform.shift();","            if(key)","            {","                matrix[key].apply(matrix, transform);","            }","        }","        matrix.translate(-transformX, -transformY);","        if(isPathShape)","        {","            matrix.translate(-this._left, -this._top);","        }","        contentRect = matrix.getContentRect(w, h, x, y);","        return contentRect;","    },","","    /**","     * Places the shape above all other shapes.","     *","     * @method toFront","     */","    toFront: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toFront(this);","        }","    },","","    /**","     * Places the shape underneath all other shapes.","     *","     * @method toFront","     */","    toBack: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toBack(this);","        }","    },","","    /**","     * Parses path data string and call mapped methods.","     *","     * @method _parsePathData","     * @param {String} val The path data","     * @private","     */","    _parsePathData: function(val)","    {","        var method,","            methodSymbol,","            args,","            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),","            i,","            len,","            str,","            symbolToMethod = this._pathSymbolToMethod;","        if(commandArray)","        {","            this.clear();","            len = commandArray.length || 0;","            for(i = 0; i < len; i = i + 1)","            {","                str = commandArray[i];","                methodSymbol = str.substr(0, 1);","                args = str.substr(1).match(SPLITARGSPATTERN);","                method = symbolToMethod[methodSymbol];","                if(method)","                {","                    if(args)","                    {","                        this[method].apply(this, args);","                    }","                    else","                    {","                        this[method].apply(this);","                    }","                }","            }","            this.end();","        }","    },","","    /**","     *  Destroys shape","     *","     *  @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {","            if(this._fillNode)","            {","                this.node.removeChild(this._fillNode);","                this._fillNode = null;","            }","            if(this._strokeNode)","            {","                this.node.removeChild(this._strokeNode);","                this._strokeNode = null;","            }","            Y.one(this.node).remove(true);","        }","    }","}, Y.VMLDrawing.prototype));","","VMLShape.ATTRS = {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains","     * corresponding methods for each transform that will apply the transform to the current matrix. The below code illustrates how you might use the","     * `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String","	 */","	transform: {","		setter: function(val)","		{","            var i,","                len,","                transform;","            this.matrix.init();","            this._normalizedMatrix.init();","            this._transforms = this.matrix.getTransformArray(val);","            len = this._transforms.length;","            for(i = 0;i < len; ++i)","            {","                transform = this._transforms[i];","            }","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","	/**","	 *","	 * @config width","	 */","	width: {","		value: 0","	},","","	/**","	 *","	 * @config height","	 */","	height: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.node,","				visibility = val ? \"visible\" : \"hidden\";","			if(node)","			{","				node.style.visibility = visibility;","			}","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1.","     *              Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd>","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the","     *      flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and","     *          `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape`","     *          classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p>","	 *","	 * @config fill","	 * @type Object","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","","		setter: function(val)","		{","			var i,","				fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","","			if(val)","			{","				//ensure, fill type is solid if color is explicitly passed.","				if(val.hasOwnProperty(\"color\"))","				{","					val.type = \"solid\";","				}","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{","						tmpl[i] = val[i];","					}","				}","			}","			fill = tmpl;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color === \"none\")","				{","					fill.color = null;","				}","			}","			this._fillFlag = true;","            return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set","     *      to an array, the first index indicates the length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin","     *              of miter, you simply specify the limit as opposed to having separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","","		setter: function(val)","		{","			var i,","				stroke,","                wt,","				tmpl = this.get(\"stroke\") || this._getDefaultStroke();","			if(val)","			{","                if(val.hasOwnProperty(\"weight\"))","                {","                    wt = parseInt(val.weight, 10);","                    if(!isNaN(wt))","                    {","                        val.weight = wt;","                    }","                }","				for(i in val)","				{","					if(val.hasOwnProperty(i))","					{","						tmpl[i] = val[i];","					}","				}","			}","			stroke = tmpl;","            this._strokeFlag = true;","			return stroke;","		}","	},","","	//Not used. Remove in future.","    autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	//","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","	/**","	 * Dom node for the shape.","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","    /**","     * Represents an SVG Path string. This will be parsed and added to shape's API to represent the SVG data across all","     * implementations. Note that when using VML or SVG implementations, part of this content will be added to the DOM using","     * respective VML/SVG attributes. If your content comes from an untrusted source, you will need to ensure that no","     * malicious code is included in that content.","     *","     * @config data","     * @type String","     */","    data: {","        setter: function(val)","        {","            if(this.get(\"node\"))","            {","                this._parsePathData(val);","            }","            return val;","        }","    },","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","	}","};","Y.VMLShape = VMLShape;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Path.html\">`Path`</a> class."," * `VMLPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Path.html\">`Path`</a> class will point to the `VMLPath` class."," *"," * @module graphics"," * @class VMLPath"," * @extends VMLShape"," */","VMLPath = function()","{","	VMLPath.superclass.constructor.apply(this, arguments);","};","","VMLPath.NAME = \"path\";","Y.extend(VMLPath, Y.VMLShape);","VMLPath.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var val = Math.max(this._right - this._left, 0);","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			return Math.max(this._bottom - this._top, 0);","		}","	},","","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","		readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.VMLPath = VMLPath;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class."," * `VMLRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Rect.html\">`Rect`</a> class will point to the `VMLRect` class."," *"," * @module graphics"," * @class VMLRect"," * @constructor"," */","VMLRect = function()","{","	VMLRect.superclass.constructor.apply(this, arguments);","};","VMLRect.NAME = \"rect\";","Y.extend(VMLRect, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\"","});","VMLRect.ATTRS = Y.VMLShape.ATTRS;","Y.VMLRect = VMLRect;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * `VMLEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a> class will point to the `VMLEllipse` class."," *"," * @module graphics"," * @class VMLEllipse"," * @constructor"," */","VMLEllipse = function()","{","	VMLEllipse.superclass.constructor.apply(this, arguments);","};","","VMLEllipse.NAME = \"ellipse\";","","Y.extend(VMLEllipse, Y.VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","VMLEllipse.ATTRS = Y.merge(Y.VMLShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse.","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		lazyAdd: false,","","		getter: function()","		{","			var val = this.get(\"width\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","","		setter: function(val)","		{","			var w = val * 2;","			this.set(\"width\", w);","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse.","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		lazyAdd: false,","","		getter: function()","		{","			var val = this.get(\"height\");","			val = Math.round((val/2) * 100)/100;","			return val;","		},","","		setter: function(val)","		{","			var h = val * 2;","			this.set(\"height\", h);","			return val;","		}","	}","});","Y.VMLEllipse = VMLEllipse;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class."," * `VMLCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Circle.html\">`Circle`</a> class will point to the `VMLCircle` class."," *"," * @module graphics"," * @class VMLCircle"," * @constructor"," */","VMLCircle = function()","{","	VMLCircle.superclass.constructor.apply(this, arguments);","};","","VMLCircle.NAME = \"circle\";","","Y.extend(VMLCircle, VMLShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"oval\"","});","","VMLCircle.ATTRS = Y.merge(VMLShape.ATTRS, {","	/**","	 * Radius for the circle.","	 *","	 * @config radius","	 * @type Number","	 */","	radius: {","		lazyAdd: false,","","		value: 0","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			var radius = this.get(\"radius\"),","			val = radius && radius > 0 ? radius * 2 : 0;","			return val;","		}","	}","});","Y.VMLCircle = VMLCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class VMLPieSlice"," * @constructor"," */","VMLPieSlice = function()","{","	VMLPieSlice.superclass.constructor.apply(this, arguments);","};","VMLPieSlice.NAME = \"vmlPieSlice\";","Y.extend(VMLPieSlice, Y.VMLShape, Y.mix({","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"shape\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function()","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," }, Y.VMLDrawing.prototype));","VMLPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.VMLShape.ATTRS);","Y.VMLPieSlice = VMLPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/NOTE-VML\">VML</a> implementation of the <a href=\"Graphic.html\">`Graphic`</a> class."," * `VMLGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> and <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a>"," * capabilities, the <a href=\"Graphic.html\">`Graphic`</a> class will point to the `VMLGraphic` class."," *"," * @module graphics"," * @class VMLGraphic"," * @constructor"," */","VMLGraphic = function() {","    VMLGraphic.superclass.constructor.apply(this, arguments);","};","","VMLGraphic.NAME = \"vmlGraphic\";","","VMLGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node","     * instance or a CSS selector string.","     *","     * @config render","     * @type Node | String","     */","    render: {},","","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.","     *","     *  @config contentBounds","     *  @type Object","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The html element that represents to coordinate system of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`.","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`.","	 *","	 * @config height","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines the sizing of the Graphic.","     *","     *  <dl>","     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the","     *      <code>width</code> and <code>height</code> attributes or are determined by the dimensions of the parent element. The","     *      content contained in the Graphic will be sized to fit with in the Graphic instance's dimensions. When using this","     *      setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>","     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the","     *      size and positioning of the content.</dd>","     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code>","     *      and <code>height</code> attributes or are determined by the dimensions of the parent element. The contents of the","     *      Graphic instance are not affected by this setting.</dd>","     *  </dl>","     *","     *","     *  @config autoSize","     *  @type Boolean | String","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.","     *","     *  <dl>","     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary","     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>","     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>","     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>","     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>","     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>","     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>","     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>","     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>","     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>","     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>","     *  </dl>","     *","     * @config preserveAspectRatio","     * @type String","     * @default xMidYMid","     */","    preserveAspectRatio: {","        value: \"xMidYMid\"","    },","","    /**","     * The contentBounds will resize to greater values but not values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown","     * @type Boolean","     */","    resizeDown: {","        resizeDown: false","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(VMLGraphic, Y.GraphicBase, {","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this,","            attr = arguments[0],","            redrawAttrs = {","                autoDraw: true,","                autoSize: true,","                preserveAspectRatio: true,","                resizeDown: true","            },","            key,","            forceRedraw = false;","		AttributeLite.prototype.set.apply(host, arguments);","        if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)","        {","            if(Y_LANG.isString && redrawAttrs[attr])","            {","                forceRedraw = true;","            }","            else if(Y_LANG.isObject(attr))","            {","                for(key in redrawAttrs)","                {","                    if(redrawAttrs.hasOwnProperty(key) && attr[key])","                    {","                        forceRedraw = true;","                        break;","                    }","                }","            }","        }","        if(forceRedraw)","        {","            host._redraw();","        }","	},","","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = this.parentNode,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            xy;","        if(node)","        {","            xy = Y.one(node).getXY();","            xy[0] += x;","            xy[1] += y;","        }","        else","        {","            xy = Y.DOM._getOffset(this._node);","        }","        return xy;","    },","","    /**","     * Initializes the class.","     *","     * @method initializer","     * @private","     */","    initializer: function() {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\";","        this._shapes = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = this._createGraphic();","        this._node.style.left = this.get(\"x\") + \"px\";","        this._node.style.top = this.get(\"y\") + \"px\";","        this._node.style.visibility = visibility;","        this._node.setAttribute(\"id\", this.get(\"id\"));","        if(render)","        {","            this.render(render);","        }","    },","","    /**","     * Adds the graphics node to the dom.","     *","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(this._node);","        this.parentNode = parentNode;","        this.set(\"width\", w);","        this.set(\"height\", h);","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.clear();","        Y.one(this._node).remove(true);","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var ShapeClass = this._getShapeClass(cfg.type),","            shape = new ShapeClass(cfg);","        this._appendShape(shape);","        shape._appendStrokeAndFill();","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\") || this.get(\"autoSize\") === \"sizeContentToGraphic\")","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof VMLShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && (shape instanceof VMLShape))","        {","            shape._destroy();","            this._shapes[shape.get(\"id\")] = null;","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","        this._removeChildren(this._node);","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Sets the size of the graphics object.","     *","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     */","    setSize: function(w, h) {","        w = Math.round(w);","        h = Math.round(h);","        this._node.style.width = w + 'px';","        this._node.style.height = h + 'px';","    },","","    /**","     * Sets the positon of the graphics object.","     *","     * @method setPosition","     * @param {Number} x x-coordinate for the object.","     * @param {Number} y y-coordinate for the object.","     */","    setPosition: function(x, y)","    {","        x = Math.round(x);","        y = Math.round(y);","        this._node.style.left = x + \"px\";","        this._node.style.top = y + \"px\";","    },","","    /**","     * Creates a group element","     *","     * @method _createGraphic","     * @private","     */","    _createGraphic: function() {","        var group = DOCUMENT.createElement(","            '<group xmlns=\"urn:schemas-microsft.com:vml\"' +","            ' style=\"behavior:url(#default#VML);padding:0px 0px 0px 0px;display:block;position:absolute;top:0px;left:0px;zoom:1;\"' +","            '/>'","        );","        return group;","    },","","    /**","     * Creates a graphic node","     *","     * @method _createGraphicNode","     * @param {String} type node type to create","     * @param {String} pe specified pointer-events value","     * @return HTMLElement","     * @private","     */","    _createGraphicNode: function(type)","    {","        return DOCUMENT.createElement(","            '<' +","            type +","            ' xmlns=\"urn:schemas-microsft.com:vml\"' +","            ' style=\"behavior:url(#default#VML);display:inline-block;zoom:1;\"' +","            '/>'","        );","","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        return this._shapes[id];","    },","","    /**","     * Returns a shape class. Used by `addShape`.","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class.","     * @return Function","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.VMLCircle,","        rect: Y.VMLRect,","        path: Y.VMLPath,","        ellipse: Y.VMLEllipse,","        pieslice: Y.VMLPieSlice","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method.apply();","        this.set(\"autoDraw\", autoDraw);","    },","","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds.","     *","     * @method addToRedrawQueue","     * @param shape {VMLShape}","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            box.width = box.right - box.left;","            box.height = box.bottom - box.top;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var autoSize = this.get(\"autoSize\"),","            preserveAspectRatio,","            node = this.parentNode,","            nodeWidth = parseFloat(node.getComputedStyle(\"width\")),","            nodeHeight = parseFloat(node.getComputedStyle(\"height\")),","            xCoordOrigin = 0,","            yCoordOrigin = 0,","            box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds,","            left = box.left,","            right = box.right,","            top = box.top,","            bottom = box.bottom,","            contentWidth = right - left,","            contentHeight = bottom - top,","            aspectRatio,","            xCoordSize,","            yCoordSize,","            scaledWidth,","            scaledHeight,","            visible = this.get(\"visible\");","        this._node.style.visibility = \"hidden\";","        if(autoSize)","        {","            if(autoSize === \"sizeContentToGraphic\")","            {","                preserveAspectRatio = this.get(\"preserveAspectRatio\");","                if(preserveAspectRatio === \"none\" || contentWidth/contentHeight === nodeWidth/nodeHeight)","                {","                    xCoordOrigin = left;","                    yCoordOrigin = top;","                    xCoordSize = contentWidth;","                    yCoordSize = contentHeight;","                }","                else","                {","                    if(contentWidth * nodeHeight/contentHeight > nodeWidth)","                    {","                        aspectRatio = nodeHeight/nodeWidth;","                        xCoordSize = contentWidth;","                        yCoordSize = contentWidth * aspectRatio;","                        scaledHeight = (nodeWidth * (contentHeight/contentWidth)) * (yCoordSize/nodeHeight);","                        yCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(5).toLowerCase(), scaledHeight, yCoordSize);","                        yCoordOrigin = top + yCoordOrigin;","                        xCoordOrigin = left;","                    }","                    else","                    {","                        aspectRatio = nodeWidth/nodeHeight;","                        xCoordSize = contentHeight * aspectRatio;","                        yCoordSize = contentHeight;","                        scaledWidth = (nodeHeight * (contentWidth/contentHeight)) * (xCoordSize/nodeWidth);","                        xCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(1, 4).toLowerCase(), scaledWidth, xCoordSize);","                        xCoordOrigin = xCoordOrigin + left;","                        yCoordOrigin = top;","                    }","                }","                this._node.style.width = nodeWidth + \"px\";","                this._node.style.height = nodeHeight + \"px\";","                this._node.coordOrigin = xCoordOrigin + \", \" + yCoordOrigin;","            }","            else","            {","                xCoordSize = contentWidth;","                yCoordSize = contentHeight;","                this._node.style.width = contentWidth + \"px\";","                this._node.style.height = contentHeight + \"px\";","                this._state.width = contentWidth;","                this._state.height =  contentHeight;","","            }","            this._node.coordSize = xCoordSize + \", \" + yCoordSize;","        }","        else","        {","            this._node.style.width = nodeWidth + \"px\";","            this._node.style.height = nodeHeight + \"px\";","            this._node.coordSize = nodeWidth + \", \" + nodeHeight;","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","        if(visible)","        {","            this._node.style.visibility = \"visible\";","        }","    },","","    /**","     * Determines the value for either an x or y coordinate to be used for the <code>coordOrigin</code> of the Graphic.","     *","     * @method _calculateCoordOrigin","     * @param {String} position The position for placement. Possible values are min, mid and max.","     * @param {Number} size The total scaled size of the content.","     * @param {Number} coordsSize The coordsSize for the Graphic.","     * @return Number","     * @private","     */","    _calculateCoordOrigin: function(position, size, coordsSize)","    {","        var coord;","        switch(position)","        {","            case \"min\" :","                coord = 0;","            break;","            case \"mid\" :","                coord = (size - coordsSize)/2;","            break;","            case \"max\" :","                coord = (size - coordsSize);","            break;","        }","        return coord;","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object}","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {};","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;","                box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;","                box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;","                box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;","            }","        }","        box.left = Y_LANG.isNumber(box.left) ? box.left : 0;","        box.top = Y_LANG.isNumber(box.top) ? box.top : 0;","        box.right = Y_LANG.isNumber(box.right) ? box.right : 0;","        box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;","        this._contentBounds = box;","        return box;","    },","","    /**","     * Inserts shape on the top of the tree.","     *","     * @method _toFront","     * @param {VMLShape} Shape to add.","     * @private","     */","    _toFront: function(shape)","    {","        var contentNode = this._node;","        if(shape instanceof Y.VMLShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            contentNode.appendChild(shape);","        }","    },","","    /**","     * Inserts shape as the first child of the content node.","     *","     * @method _toBack","     * @param {VMLShape} Shape to add.","     * @private","     */","    _toBack: function(shape)","    {","        var contentNode = this._node,","            targetNode;","        if(shape instanceof Y.VMLShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            targetNode = contentNode.firstChild;","            if(targetNode)","            {","                contentNode.insertBefore(shape, targetNode);","            }","            else","            {","                contentNode.appendChild(shape);","            }","        }","    }","});","Y.VMLGraphic = VMLGraphic;","","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].lines = {"1":0,"3":0,"23":0,"35":0,"75":0,"87":0,"88":0,"90":0,"91":0,"93":0,"127":0,"128":0,"144":0,"145":0,"157":0,"176":0,"177":0,"178":0,"180":0,"181":0,"182":0,"183":0,"184":0,"185":0,"186":0,"188":0,"190":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"208":0,"209":0,"210":0,"211":0,"212":0,"213":0,"214":0,"215":0,"216":0,"217":0,"219":0,"233":0,"234":0,"248":0,"249":0,"261":0,"276":0,"278":0,"279":0,"280":0,"281":0,"282":0,"283":0,"284":0,"285":0,"286":0,"287":0,"288":0,"289":0,"290":0,"291":0,"293":0,"307":0,"308":0,"309":0,"310":0,"311":0,"312":0,"313":0,"314":0,"330":0,"331":0,"332":0,"333":0,"334":0,"335":0,"336":0,"337":0,"338":0,"339":0,"353":0,"357":0,"358":0,"359":0,"360":0,"361":0,"375":0,"390":0,"394":0,"395":0,"396":0,"397":0,"398":0,"414":0,"430":0,"432":0,"433":0,"434":0,"435":0,"436":0,"437":0,"455":0,"456":0,"458":0,"460":0,"461":0,"462":0,"463":0,"464":0,"465":0,"466":0,"467":0,"481":0,"482":0,"495":0,"496":0,"509":0,"510":0,"522":0,"530":0,"531":0,"532":0,"533":0,"534":0,"535":0,"536":0,"537":0,"538":0,"539":0,"540":0,"545":0,"546":0,"547":0,"548":0,"549":0,"550":0,"551":0,"552":0,"553":0,"554":0,"557":0,"558":0,"571":0,"572":0,"585":0,"586":0,"598":0,"603":0,"604":0,"605":0,"606":0,"607":0,"608":0,"619":0,"627":0,"628":0,"629":0,"631":0,"633":0,"635":0,"637":0,"640":0,"642":0,"644":0,"646":0,"647":0,"648":0,"649":0,"650":0,"652":0,"653":0,"654":0,"665":0,"666":0,"677":0,"678":0,"689":0,"690":0,"691":0,"692":0,"693":0,"694":0,"695":0,"696":0,"697":0,"710":0,"715":0,"716":0,"719":0,"720":0,"721":0,"722":0,"725":0,"739":0,"747":0,"749":0,"750":0,"751":0,"752":0,"753":0,"755":0,"756":0,"757":0,"758":0,"759":0,"760":0,"772":0,"773":0,"775":0,"777":0,"779":0,"781":0,"783":0,"785":0,"787":0,"788":0,"803":0,"815":0,"817":0,"818":0,"819":0,"820":0,"823":0,"825":0,"844":0,"855":0,"858":0,"859":0,"861":0,"863":0,"865":0,"867":0,"881":0,"882":0,"884":0,"888":0,"889":0,"892":0,"893":0,"894":0,"906":0,"908":0,"910":0,"912":0,"925":0,"946":0,"947":0,"948":0,"958":0,"959":0,"961":0,"979":0,"981":0,"982":0,"983":0,"984":0,"985":0,"986":0,"988":0,"993":0,"995":0,"997":0,"999":0,"1001":0,"1003":0,"1005":0,"1007":0,"1009":0,"1010":0,"1011":0,"1015":0,"1017":0,"1019":0,"1021":0,"1022":0,"1024":0,"1026":0,"1028":0,"1032":0,"1033":0,"1035":0,"1037":0,"1038":0,"1039":0,"1050":0,"1051":0,"1062":0,"1063":0,"1074":0,"1078":0,"1090":0,"1092":0,"1093":0,"1105":0,"1116":0,"1117":0,"1129":0,"1142":0,"1152":0,"1154":0,"1155":0,"1156":0,"1157":0,"1159":0,"1161":0,"1162":0,"1163":0,"1164":0,"1165":0,"1166":0,"1167":0,"1168":0,"1169":0,"1170":0,"1171":0,"1173":0,"1174":0,"1175":0,"1177":0,"1178":0,"1181":0,"1183":0,"1187":0,"1188":0,"1190":0,"1191":0,"1194":0,"1196":0,"1207":0,"1209":0,"1211":0,"1221":0,"1223":0,"1224":0,"1225":0,"1227":0,"1229":0,"1230":0,"1231":0,"1232":0,"1233":0,"1234":0,"1235":0,"1236":0,"1237":0,"1239":0,"1240":0,"1242":0,"1243":0,"1244":0,"1246":0,"1247":0,"1248":0,"1250":0,"1251":0,"1254":0,"1256":0,"1260":0,"1261":0,"1263":0,"1264":0,"1267":0,"1268":0,"1272":0,"1274":0,"1276":0,"1278":0,"1291":0,"1298":0,"1300":0,"1302":0,"1304":0,"1305":0,"1306":0,"1307":0,"1308":0,"1311":0,"1313":0,"1315":0,"1318":0,"1319":0,"1321":0,"1323":0,"1324":0,"1325":0,"1326":0,"1328":0,"1329":0,"1330":0,"1332":0,"1338":0,"1340":0,"1351":0,"1353":0,"1355":0,"1362":0,"1364":0,"1366":0,"1367":0,"1368":0,"1370":0,"1372":0,"1374":0,"1376":0,"1380":0,"1387":0,"1390":0,"1392":0,"1394":0,"1397":0,"1398":0,"1399":0,"1402":0,"1404":0,"1405":0,"1406":0,"1407":0,"1409":0,"1410":0,"1412":0,"1414":0,"1416":0,"1420":0,"1426":0,"1427":0,"1430":0,"1432":0,"1433":0,"1437":0,"1438":0,"1444":0,"1446":0,"1447":0,"1461":0,"1483":0,"1485":0,"1487":0,"1489":0,"1491":0,"1495":0,"1497":0,"1498":0,"1500":0,"1502":0,"1503":0,"1504":0,"1505":0,"1506":0,"1507":0,"1508":0,"1509":0,"1510":0,"1511":0,"1512":0,"1514":0,"1515":0,"1516":0,"1517":0,"1518":0,"1519":0,"1520":0,"1521":0,"1522":0,"1523":0,"1524":0,"1526":0,"1528":0,"1530":0,"1531":0,"1544":0,"1545":0,"1546":0,"1547":0,"1548":0,"1550":0,"1562":0,"1575":0,"1577":0,"1579":0,"1581":0,"1585":0,"1586":0,"1589":0,"1590":0,"1591":0,"1593":0,"1594":0,"1596":0,"1597":0,"1600":0,"1602":0,"1604":0,"1611":0,"1612":0,"1614":0,"1616":0,"1623":0,"1625":0,"1626":0,"1628":0,"1630":0,"1632":0,"1635":0,"1636":0,"1649":0,"1651":0,"1652":0,"1691":0,"1692":0,"1693":0,"1705":0,"1706":0,"1718":0,"1719":0,"1731":0,"1742":0,"1753":0,"1764":0,"1775":0,"1789":0,"1791":0,"1793":0,"1814":0,"1816":0,"1817":0,"1818":0,"1819":0,"1820":0,"1821":0,"1834":0,"1835":0,"1852":0,"1872":0,"1891":0,"1892":0,"1893":0,"1895":0,"1910":0,"1915":0,"1917":0,"1918":0,"1919":0,"1920":0,"1922":0,"1937":0,"1948":0,"1950":0,"1952":0,"1953":0,"1954":0,"1955":0,"1957":0,"1958":0,"1959":0,"1961":0,"1964":0,"1965":0,"1967":0,"1969":0,"1970":0,"1980":0,"1981":0,"1983":0,"1994":0,"1995":0,"1997":0,"2010":0,"2018":0,"2020":0,"2021":0,"2022":0,"2024":0,"2025":0,"2026":0,"2027":0,"2028":0,"2030":0,"2032":0,"2036":0,"2040":0,"2051":0,"2052":0,"2054":0,"2058":0,"2070":0,"2072":0,"2074":0,"2075":0,"2077":0,"2079":0,"2080":0,"2082":0,"2087":0,"2098":0,"2135":0,"2138":0,"2139":0,"2140":0,"2141":0,"2142":0,"2144":0,"2146":0,"2147":0,"2152":0,"2185":0,"2190":0,"2191":0,"2193":0,"2195":0,"2225":0,"2227":0,"2229":0,"2231":0,"2289":0,"2293":0,"2296":0,"2298":0,"2300":0,"2302":0,"2304":0,"2308":0,"2309":0,"2311":0,"2313":0,"2316":0,"2317":0,"2354":0,"2358":0,"2360":0,"2362":0,"2363":0,"2365":0,"2368":0,"2370":0,"2372":0,"2376":0,"2377":0,"2378":0,"2409":0,"2425":0,"2427":0,"2429":0,"2444":0,"2448":0,"2459":0,"2461":0,"2464":0,"2465":0,"2466":0,"2476":0,"2477":0,"2490":0,"2506":0,"2510":0,"2521":0,"2523":0,"2525":0,"2526":0,"2536":0,"2537":0,"2548":0,"2550":0,"2553":0,"2555":0,"2565":0,"2577":0,"2578":0,"2579":0,"2584":0,"2585":0,"2586":0,"2602":0,"2603":0,"2604":0,"2609":0,"2610":0,"2611":0,"2615":0,"2626":0,"2628":0,"2631":0,"2633":0,"2644":0,"2666":0,"2667":0,"2672":0,"2674":0,"2687":0,"2688":0,"2693":0,"2695":0,"2699":0,"2707":0,"2709":0,"2711":0,"2712":0,"2730":0,"2735":0,"2736":0,"2737":0,"2740":0,"2778":0,"2789":0,"2790":0,"2793":0,"2795":0,"2814":0,"2819":0,"2820":0,"2822":0,"2824":0,"2840":0,"2855":0,"2870":0,"2883":0,"2885":0,"2887":0,"2900":0,"2902":0,"2904":0,"2977":0,"2982":0,"2983":0,"2985":0,"2987":0,"3000":0,"3005":0,"3006":0,"3008":0,"3010":0,"3032":0,"3033":0,"3038":0,"3050":0,"3060":0,"3061":0,"3063":0,"3065":0,"3067":0,"3069":0,"3071":0,"3073":0,"3074":0,"3079":0,"3081":0,"3111":0,"3115":0,"3117":0,"3118":0,"3119":0,"3123":0,"3125":0,"3135":0,"3137":0,"3138":0,"3144":0,"3145":0,"3146":0,"3147":0,"3148":0,"3149":0,"3151":0,"3162":0,"3165":0,"3166":0,"3167":0,"3168":0,"3169":0,"3170":0,"3180":0,"3181":0,"3193":0,"3194":0,"3196":0,"3198":0,"3200":0,"3201":0,"3202":0,"3214":0,"3216":0,"3218":0,"3222":0,"3234":0,"3236":0,"3238":0,"3241":0,"3243":0,"3244":0,"3245":0,"3247":0,"3249":0,"3260":0,"3262":0,"3264":0,"3266":0,"3269":0,"3281":0,"3283":0,"3284":0,"3286":0,"3287":0,"3288":0,"3299":0,"3300":0,"3312":0,"3315":0,"3317":0,"3319":0,"3321":0,"3325":0,"3327":0,"3329":0,"3331":0,"3343":0,"3344":0,"3345":0,"3346":0,"3358":0,"3359":0,"3360":0,"3361":0,"3371":0,"3376":0,"3390":0,"3409":0,"3422":0,"3423":0,"3425":0,"3427":0,"3453":0,"3454":0,"3455":0,"3456":0,"3468":0,"3470":0,"3472":0,"3484":0,"3486":0,"3487":0,"3489":0,"3490":0,"3491":0,"3492":0,"3493":0,"3494":0,"3495":0,"3496":0,"3497":0,"3499":0,"3501":0,"3513":0,"3533":0,"3534":0,"3536":0,"3538":0,"3539":0,"3541":0,"3542":0,"3543":0,"3544":0,"3548":0,"3550":0,"3551":0,"3552":0,"3553":0,"3554":0,"3555":0,"3556":0,"3560":0,"3561":0,"3562":0,"3563":0,"3564":0,"3565":0,"3566":0,"3569":0,"3570":0,"3571":0,"3575":0,"3576":0,"3577":0,"3578":0,"3579":0,"3580":0,"3583":0,"3587":0,"3588":0,"3589":0,"3591":0,"3593":0,"3594":0,"3596":0,"3598":0,"3614":0,"3615":0,"3618":0,"3619":0,"3621":0,"3622":0,"3624":0,"3625":0,"3627":0,"3639":0,"3644":0,"3646":0,"3648":0,"3649":0,"3650":0,"3651":0,"3652":0,"3653":0,"3656":0,"3657":0,"3658":0,"3659":0,"3660":0,"3661":0,"3673":0,"3674":0,"3676":0,"3678":0,"3680":0,"3693":0,"3695":0,"3697":0,"3699":0,"3701":0,"3702":0,"3704":0,"3708":0,"3713":0};
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].functions = {"VMLDrawing:23":0,"_round:73":0,"_addToPath:85":0,"curveTo:126":0,"relativeCurveTo:143":0,"_curveTo:156":0,"quadraticCurveTo:232":0,"relativeQuadraticCurveTo:247":0,"_quadraticCurveTo:260":0,"drawRect:306":0,"drawRoundRect:329":0,"drawCircle:352":0,"drawEllipse:389":0,"drawDiamond:428":0,"drawWedge:453":0,"lineTo:493":0,"relativeLineTo:507":0,"_lineTo:521":0,"moveTo:569":0,"relativeMoveTo:583":0,"_moveTo:597":0,"_closePath:617":0,"end:663":0,"closePath:675":0,"clear:687":0,"getBezierData:709":0,"_setCurveBoundingBox:737":0,"_trackSize:771":0,"VMLShape:815":0,"init:842":0,"initializer:853":0,"_setGraphic:879":0,"_appendStrokeAndFill:904":0,"createNode:923":0,"addClass:1048":0,"removeClass:1060":0,"getXY:1072":0,"setXY:1088":0,"contains:1103":0,"compareTo:1115":0,"test:1127":0,"_getStrokeProps:1140":0,"_strokeChangeHandler:1205":0,"_getFillProps:1289":0,"_fillChangeHandler:1349":0,"_updateFillNode:1442":0,"_getGradientFill:1459":0,"_addTransform:1542":0,"_updateTransform:1560":0,"_getSkewOffsetValue:1647":0,"translate:1689":0,"translateX:1703":0,"translateY:1716":0,"skew:1729":0,"skewX:1740":0,"skewY:1751":0,"rotate:1762":0,"scale:1773":0,"on:1787":0,"_updateHandler:1812":0,"_createGraphicNode:1832":0,"_getDefaultFill:1851":0,"_getDefaultStroke:1870":0,"set:1889":0,"getBounds:1908":0,"_getContentRect:1935":0,"toFront:1978":0,"toBack:1992":0,"_parsePathData:2008":0,"destroy:2049":0,"_destroy:2068":0,"valueFn:2096":0,"setter:2133":0,"getter:2150":0,"valueFn:2183":0,"setter:2188":0,"setter:2224":0,"setter:2287":0,"setter:2352":0,"getter:2407":0,"setter:2423":0,"getter:2442":0,"VMLPath:2459":0,"getter:2474":0,"getter:2488":0,"getter:2504":0,"VMLRect:2521":0,"VMLEllipse:2548":0,"getter:2575":0,"setter:2582":0,"getter:2600":0,"setter:2607":0,"VMLCircle:2626":0,"setter:2664":0,"getter:2670":0,"setter:2685":0,"getter:2691":0,"VMLPieSlice:2707":0,"_draw:2728":0,"VMLGraphic:2789":0,"valueFn:2812":0,"setter:2817":0,"getter:2838":0,"getter:2853":0,"getter:2868":0,"setter:2881":0,"setter:2898":0,"getter:2975":0,"setter:2980":0,"getter:2998":0,"setter:3003":0,"setter:3030":0,"set:3048":0,"getXY:3109":0,"initializer:3134":0,"render:3161":0,"destroy:3178":0,"addShape:3191":0,"_appendShape:3212":0,"removeShape:3232":0,"removeAllShapes:3258":0,"_removeChildren:3279":0,"clear:3298":0,"_toggleVisible:3310":0,"setSize:3342":0,"setPosition:3356":0,"_createGraphic:3370":0,"_createGraphicNode:3388":0,"getShapeById:3407":0,"_getShapeClass:3420":0,"batch:3451":0,"_getDocFrag:3466":0,"addToRedrawQueue:3482":0,"_redraw:3511":0,"_calculateCoordOrigin:3612":0,"_getUpdatedContentBounds:3637":0,"_toFront:3671":0,"_toBack:3691":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].coveredLines = 934;
_yuitest_coverage["build/graphics-vml/graphics-vml.js"].coveredFunctions = 139;
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1);
YUI.add('graphics-vml', function (Y, NAME) {

_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "(anonymous 1)", 1);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3);
var IMPLEMENTATION = "vml",
    SHAPE = "shape",
	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,
    SPLITARGSPATTERN = /[\-]?[0-9]*[0-9|\.][0-9]*/g,
    Y_LANG = Y.Lang,
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
    VMLPieSlice,
    _getClassName = Y.ClassNameManager.getClassName;

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 23);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 35);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_round", 73);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 75);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_addToPath", 85);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 87);
this._path = this._path || "";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 88);
if(this._movePath)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 90);
this._path += this._movePath;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 91);
this._movePath = null;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 93);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "curveTo", 126);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 127);
this._curveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 128);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeCurveTo", 143);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 144);
this._curveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 145);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_curveTo", 156);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 157);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 176);
len = args.length - 5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 177);
path = command;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 178);
for(i = 0; i < len; i = i + 6)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 180);
cp1x = parseFloat(args[i]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 181);
cp1y = parseFloat(args[i + 1]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 182);
cp2x = parseFloat(args[i + 2]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 183);
cp2y = parseFloat(args[i + 3]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 184);
x = parseFloat(args[i + 4]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 185);
y = parseFloat(args[i + 5]);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 186);
if(i > 0)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 188);
path = path + ", ";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 190);
path = path +
                    this._round(cp1x) +
                    ", " +
                    this._round(cp1y) +
                    ", " +
                    this._round(cp2x) +
                    ", " +
                    this._round(cp2y) +
                    ", " +
                    this._round(x) +
                    ", " +
                    this._round(y);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 202);
cp1x = cp1x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 203);
cp1y = cp1y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 204);
cp2x = cp2x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 205);
cp2y = cp2y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 206);
x = x + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 207);
y = y + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 208);
right = Math.max(x, Math.max(cp1x, cp2x));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 209);
bottom = Math.max(y, Math.max(cp1y, cp2y));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 210);
left = Math.min(x, Math.min(cp1x, cp2x));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 211);
top = Math.min(y, Math.min(cp1y, cp2y));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 212);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 213);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 214);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 215);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 216);
this._currentX = x;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 217);
this._currentY = y;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 219);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "quadraticCurveTo", 232);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 233);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 234);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeQuadraticCurveTo", 247);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 248);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 249);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_quadraticCurveTo", 260);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 261);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 276);
for(i = 0; i < len; i = i + 4)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 278);
cpx = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 279);
cpy = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 280);
x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 281);
y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 282);
cp1x = currentX + 0.67*(cpx - currentX);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 283);
cp1y = currentY + 0.67*(cpy - currentY);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 284);
cp2x = cp1x + (x - currentX) * 0.34;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 285);
cp2y = cp1y + (y - currentY) * 0.34;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 286);
bezierArgs.push(cp1x);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 287);
bezierArgs.push(cp1y);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 288);
bezierArgs.push(cp2x);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 289);
bezierArgs.push(cp2y);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 290);
bezierArgs.push(x);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 291);
bezierArgs.push(y);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 293);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawRect", 306);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 307);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 308);
this.lineTo(x + w, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 309);
this.lineTo(x + w, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 310);
this.lineTo(x, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 311);
this.lineTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 312);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 313);
this._currentY = y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 314);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawRoundRect", 329);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 330);
this.moveTo(x, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 331);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 332);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 333);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 334);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 335);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 336);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 337);
this.lineTo(x + ew, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 338);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 339);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawCircle", 352);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 353);
var startAngle = 0,
            endAngle = 360,
            circum = radius * 2;

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 357);
endAngle *= 65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 358);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 359);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 360);
this.moveTo((x + circum), (y + radius));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 361);
this._addToPath(
            " ae " +
            this._round(x + radius) +
            ", " +
            this._round(y + radius) +
            ", " +
            this._round(radius) +
            ", " +
            this._round(radius) +
            ", " +
            startAngle +
            ", " +
            endAngle
        );
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 375);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawEllipse", 389);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 390);
var startAngle = 0,
            endAngle = 360,
            radius = w * 0.5,
            yRadius = h * 0.5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 394);
endAngle *= 65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 395);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 396);
this._trackSize(x + w, y + h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 397);
this.moveTo((x + w), (y + yRadius));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 398);
this._addToPath(
            " ae " +
            this._round(x + radius) +
            ", " +
            this._round(x + radius) +
            ", " +
            this._round(y + yRadius) +
            ", " +
            this._round(radius) +
            ", " +
            this._round(yRadius) +
            ", " +
            startAngle +
            ", " +
            endAngle
        );
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 414);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawDiamond", 428);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 430);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 432);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 433);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 434);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 435);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 436);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 437);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "drawWedge", 453);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 455);
var diameter = radius * 2;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 456);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 458);
arc = 360;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 460);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 461);
this._currentY = y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 462);
startAngle *= -65535;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 463);
arc *= 65536;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 464);
startAngle = Math.round(startAngle);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 465);
arc = Math.round(arc);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 466);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 467);
this._addToPath(
            " ae " +
            this._round(x) +
            ", " +
            this._round(y) +
            ", " +
            this._round(radius) +
            " " +
            this._round(radius) +
            ", " +
            startAngle +
            ", " +
            arc
        );
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 481);
this._trackSize(diameter, diameter);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 482);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "lineTo", 493);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 495);
this._lineTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 496);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeLineTo", 507);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 509);
this._lineTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 510);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_lineTo", 521);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 522);
var point1 = args[0],
            i,
            len,
            x,
            y,
            path = relative ? " r " : " l ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 530);
if (typeof point1 === "string" || typeof point1 === "number") {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 531);
len = args.length - 1;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 532);
for (i = 0; i < len; i = i + 2) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 533);
x = parseFloat(args[i]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 534);
y = parseFloat(args[i + 1]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 535);
path += ' ' + this._round(x) + ', ' + this._round(y);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 536);
x = x + relativeX;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 537);
y = y + relativeY;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 538);
this._currentX = x;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 539);
this._currentY = y;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 540);
this._trackSize.apply(this, [x, y]);
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 545);
len = args.length;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 546);
for (i = 0; i < len; i = i + 1) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 547);
x = parseFloat(args[i][0]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 548);
y = parseFloat(args[i][1]);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 549);
path += ' ' + this._round(x) + ', ' + this._round(y);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 550);
x = x + relativeX;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 551);
y = y + relativeY;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 552);
this._currentX = x;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 553);
this._currentY = y;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 554);
this._trackSize.apply(this, [x, y]);
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 557);
this._addToPath(path);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 558);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "moveTo", 569);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 571);
this._moveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 572);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "relativeMoveTo", 583);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 585);
this._moveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 586);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_moveTo", 597);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 598);
var x = parseFloat(args[0]),
            y = parseFloat(args[1]),
            command = relative ? " t " : " m ",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 603);
this._movePath = command + this._round(x) + ", " + this._round(y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 604);
x = x + relativeX;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 605);
y = y + relativeY;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 606);
this._trackSize(x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 607);
this._currentX = x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 608);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_closePath", 617);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 619);
var fill = this.get("fill"),
            stroke = this.get("stroke"),
            node = this.node,
            w = this.get("width"),
            h = this.get("height"),
            path = this._path,
            pathEnd = "",
            multiplier = this._coordSpaceMultiplier;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 627);
this._fillChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 628);
this._strokeChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 629);
if(path)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 631);
if(fill && fill.color)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 633);
pathEnd += ' x';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 635);
if(stroke)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 637);
pathEnd += ' e';
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 640);
if(path)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 642);
node.path = path + pathEnd;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 644);
if(!isNaN(w) && !isNaN(h))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 646);
node.coordOrigin = this._left + ", " + this._top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 647);
node.coordSize = (w * multiplier) + ", " + (h * multiplier);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 648);
node.style.position = "absolute";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 649);
node.style.width =  w + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 650);
node.style.height =  h + "px";
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 652);
this._path = path;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 653);
this._movePath = null;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 654);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "end", 663);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 665);
this._closePath();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 666);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "closePath", 675);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 677);
this._addToPath(" x e");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 678);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "clear", 687);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 689);
this._right = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 690);
this._bottom = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 691);
this._width = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 692);
this._height = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 693);
this._left = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 694);
this._top = 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 695);
this._path = "";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 696);
this._movePath = null;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 697);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getBezierData", 709);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 710);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 715);
for (i = 0; i < n; ++i){
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 716);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 719);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 720);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 721);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 722);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 725);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_setCurveBoundingBox", 737);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 739);
var i,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            xy;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 747);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 749);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 750);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 751);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 752);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 753);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 755);
left = Math.round(left * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 756);
right = Math.round(right * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 757);
top = Math.round(top * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 758);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 759);
this._trackSize(right, bottom);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 760);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_trackSize", 771);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 772);
if (w > this._right) {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 773);
this._right = w;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 775);
if(w < this._left)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 777);
this._left = w;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 779);
if (h < this._top)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 781);
this._top = h;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 783);
if (h > this._bottom)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 785);
this._bottom = h;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 787);
this._width = this._right - this._left;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 788);
this._height = this._bottom - this._top;
    },

    _left: 0,

    _right: 0,

    _top: 0,

    _bottom: 0,

    _width: 0,

    _height: 0
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 803);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 815);
VMLShape = function()
{
    _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLShape", 815);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 817);
this._transforms = [];
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 818);
this.matrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 819);
this._normalizedMatrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 820);
VMLShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 823);
VMLShape.NAME = "shape";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 825);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "init", 842);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 844);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "initializer", 853);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 855);
var host = this,
            graphic = cfg.graphic,
            data = this.get("data");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 858);
host.createNode();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 859);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 861);
this._setGraphic(graphic);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 863);
if(data)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 865);
host._parsePathData(data);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 867);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_setGraphic", 879);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 881);
var graphic;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 882);
if(render instanceof Y.VMLGraphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 884);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 888);
render = Y.one(render);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 889);
graphic = new Y.VMLGraphic({
                render: render
            });
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 892);
graphic._appendShape(this);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 893);
this._graphic = graphic;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 894);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_appendStrokeAndFill", 904);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 906);
if(this._strokeNode)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 908);
this.node.appendChild(this._strokeNode);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 910);
if(this._fillNode)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 912);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "createNode", 923);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 925);
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
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 946);
id = this.get("id");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 947);
type = this._type === "path" ? "shape" : this._type;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 948);
classString = _getClassName(SHAPE) +
                    " " +
                    _getClassName(concat(IMPLEMENTATION, SHAPE)) +
                    " " +
                    _getClassName(name) +
                    " " +
                    _getClassName(concat(IMPLEMENTATION, name)) +
                    " " +
                    IMPLEMENTATION +
                    type;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 958);
stroke = this._getStrokeProps();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 959);
fill = this._getFillProps();

		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 961);
nodestring  = '<' +
                        type +
                        '  xmlns="urn:schemas-microsft.com:vml" id="' +
                        id +
                        '" class="' +
                        classString +
                        '" style="behavior:url(#default#VML);display:inline-block;position:absolute;left:' +
                        x +
                        'px;top:' +
                        y +
                        'px;width:' +
                        w +
                        'px;height:' +
                        h +
                        'px;visibility:' +
                        visibility +
                        '"';

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 979);
if(stroke && stroke.weight && stroke.weight > 0)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 981);
endcap = stroke.endcap;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 982);
opacity = parseFloat(stroke.opacity);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 983);
joinstyle = stroke.joinstyle;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 984);
miterlimit = stroke.miterlimit;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 985);
dashstyle = stroke.dashstyle;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 986);
nodestring += ' stroked="t" strokecolor="' + stroke.color + '" strokeWeight="' + stroke.weight + 'px"';

            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 988);
strokestring = '<stroke class="vmlstroke"' +
                            ' xmlns="urn:schemas-microsft.com:vml"' +
                            ' on="t"' +
                            ' style="behavior:url(#default#VML);display:inline-block;"' +
                            ' opacity="' + opacity + '"';
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 993);
if(endcap)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 995);
strokestring += ' endcap="' + endcap + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 997);
if(joinstyle)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 999);
strokestring += ' joinstyle="' + joinstyle + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1001);
if(miterlimit)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1003);
strokestring += ' miterlimit="' + miterlimit + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1005);
if(dashstyle)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1007);
strokestring += ' dashstyle="' + dashstyle + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1009);
strokestring += '></stroke>';
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1010);
this._strokeNode = DOCUMENT.createElement(strokestring);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1011);
nodestring += ' stroked="t"';
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1015);
nodestring += ' stroked="f"';
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1017);
if(fill)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1019);
if(fill.node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1021);
fillstring = fill.node;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1022);
this._fillNode = DOCUMENT.createElement(fillstring);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1024);
if(fill.color)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1026);
nodestring += ' fillcolor="' + fill.color + '"';
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1028);
nodestring += ' filled="' + fill.filled + '"';
        }


        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1032);
nodestring += '>';
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1033);
nodestring += '</' + type + '>';

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1035);
node = DOCUMENT.createElement(nodestring);

        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1037);
this.node = node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1038);
this._strokeFlag = false;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1039);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addClass", 1048);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1050);
var node = this.node;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1051);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeClass", 1060);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1062);
var node = this.node;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1063);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getXY", 1072);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1074);
var graphic = this._graphic,
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1078);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setXY", 1088);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1090);
var graphic = this._graphic,
			parentXY = graphic.getXY();
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1092);
this.set("x", xy[0] - parentXY[0]);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1093);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "contains", 1103);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1105);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "compareTo", 1115);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1116);
var node = this.node;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1117);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "test", 1127);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1129);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getStrokeProps", 1140);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1142);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1152);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1154);
props = {};
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1155);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1156);
linejoin = stroke.linejoin || "round";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1157);
if(linecap !== "round" && linecap !== "square")
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1159);
linecap = "flat";
            }
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1161);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1162);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1163);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1164);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1165);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1166);
props.stroked = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1167);
props.color = stroke.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1168);
props.weight = stroke.weight;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1169);
props.endcap = linecap;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1170);
props.opacity = stroke.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1171);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1173);
dash = [];
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1174);
len = dashstyle.length;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1175);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1177);
val = dashstyle[i];
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1178);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1181);
if(linejoin === "round" || linejoin === "bevel")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1183);
props.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1187);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1188);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1190);
props.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1191);
props.joinstyle = "miter";
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1194);
props.dashstyle = dash;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1196);
return props;
    },

	/**
	 * Adds a stroke to the shape node.
	 *
	 * @method _strokeChangeHandler
	 * @private
	 */
	_strokeChangeHandler: function()
	{
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_strokeChangeHandler", 1205);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1207);
if(!this._strokeFlag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1209);
return;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1211);
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
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1221);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1223);
linecap = stroke.linecap || "flat";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1224);
linejoin = stroke.linejoin || "round";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1225);
if(linecap !== "round" && linecap !== "square")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1227);
linecap = "flat";
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1229);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1230);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1231);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1232);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1233);
stroke.opacity = IS_NUM(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1234);
node.stroked = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1235);
node.strokeColor = stroke.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1236);
node.strokeWeight = stroke.weight + "px";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1237);
if(!this._strokeNode)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1239);
this._strokeNode = this._createGraphicNode("stroke");
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1240);
node.appendChild(this._strokeNode);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1242);
this._strokeNode.endcap = linecap;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1243);
this._strokeNode.opacity = stroke.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1244);
if(IS_ARRAY(dashstyle))
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1246);
dash = [];
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1247);
len = dashstyle.length;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1248);
for(i = 0; i < len; ++i)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1250);
val = dashstyle[i];
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1251);
dash[i] = val / stroke.weight;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1254);
if(linejoin === "round" || linejoin === "bevel")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1256);
this._strokeNode.joinstyle = linejoin;
			}
			else
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1260);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1261);
if(IS_NUM(linejoin))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1263);
this._strokeNode.miterlimit = Math.max(linejoin, 1);
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1264);
this._strokeNode.joinstyle = "miter";
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1267);
this._strokeNode.dashstyle = dash;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1268);
this._strokeNode.on = true;
		}
		else
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1272);
if(this._strokeNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1274);
this._strokeNode.on = false;
            }
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1276);
node.stroked = false;
		}
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1278);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getFillProps", 1289);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1291);
var fill = this.get("fill"),
			fillOpacity,
			props,
			gradient,
			i,
			fillstring,
			filled = false;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1298);
if(fill)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1300);
props = {};

			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1302);
if(fill.type === "radial" || fill.type === "linear")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1304);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1305);
fillOpacity = IS_NUM(fillOpacity) ? fillOpacity : 1;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1306);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1307);
gradient = this._getGradientFill(fill);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1308);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml"' +
                            ' class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"' +
                            ' opacity="' + fillOpacity + '"';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1311);
for(i in gradient)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1313);
if(gradient.hasOwnProperty(i))
					{
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1315);
fillstring += ' ' + i + '="' + gradient[i] + '"';
					}
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1318);
fillstring += ' />';
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1319);
props.node = fillstring;
			}
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1321);
if(fill.color)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1323);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1324);
filled = true;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1325);
props.color = fill.color;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1326);
if(IS_NUM(fillOpacity))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1328);
fillOpacity = Math.max(Math.min(fillOpacity, 1), 0);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1329);
props.opacity = fillOpacity;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1330);
if(fillOpacity < 1)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1332);
props.node = '<fill xmlns="urn:schemas-microsft.com:vml"' +
                        ' class="vmlfill" style="behavior:url(#default#VML);display:inline-block;"' +
                        ' type="solid" opacity="' + fillOpacity + '"/>';
                    }
                }
			}}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1338);
props.filled = filled;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1340);
return props;
	},

	/**
	 * Adds a fill to the shape node.
	 *
	 * @method _fillChangeHandler
	 * @private
	 */
	_fillChangeHandler: function()
	{
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_fillChangeHandler", 1349);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1351);
if(!this._fillFlag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1353);
return;
        }
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1355);
var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			fillstring,
			filled = false,
            i,
            gradient;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1362);
if(fill)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1364);
if(fill.type === "radial" || fill.type === "linear")
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1366);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1367);
gradient = this._getGradientFill(fill);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1368);
if(this._fillNode)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1370);
for(i in gradient)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1372);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1374);
if(i === "colors")
                            {
                                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1376);
this._fillNode.colors.value = gradient[i];
                            }
                            else
                            {
                                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1380);
this._fillNode[i] = gradient[i];
                            }
                        }
                    }
                }
                else
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1387);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml"' +
                                ' class="vmlfill"' +
                                ' style="behavior:url(#default#VML);display:inline-block;"';
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1390);
for(i in gradient)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1392);
if(gradient.hasOwnProperty(i))
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1394);
fillstring += ' ' + i + '="' + gradient[i] + '"';
                        }
                    }
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1397);
fillstring += ' />';
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1398);
this._fillNode = DOCUMENT.createElement(fillstring);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1399);
node.appendChild(this._fillNode);
                }
			}
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1402);
if(fill.color)
			{
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1404);
node.fillcolor = fill.color;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1405);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1406);
filled = true;
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1407);
if(IS_NUM(fillOpacity) && fillOpacity < 1)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1409);
fill.opacity = fillOpacity;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1410);
if(this._fillNode)
					{
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1412);
if(this._fillNode.getAttribute("type") !== "solid")
                        {
                            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1414);
this._fillNode.type = "solid";
                        }
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1416);
this._fillNode.opacity = fillOpacity;
					}
					else
					{
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1420);
fillstring = '<fill xmlns="urn:schemas-microsft.com:vml"' +
                        ' class="vmlfill"' +
                        ' style="behavior:url(#default#VML);display:inline-block;"' +
                        ' type="solid"' +
                        ' opacity="' + fillOpacity + '"' +
                        '/>';
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1426);
this._fillNode = DOCUMENT.createElement(fillstring);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1427);
node.appendChild(this._fillNode);
					}
				}
				else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1430);
if(this._fillNode)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1432);
this._fillNode.opacity = 1;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1433);
this._fillNode.type = "solid";
				}}
			}}
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1437);
node.filled = filled;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1438);
this._fillFlag = false;
	},

	//not used. remove next release.
    _updateFillNode: function(node)
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateFillNode", 1442);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1444);
if(!this._fillNode)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1446);
this._fillNode = this._createGraphicNode("fill");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1447);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getGradientFill", 1459);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1461);
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
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1483);
if(type === "linear")
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1485);
if(rotation <= 270)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1487);
rotation = Math.abs(rotation - 270);
            }
			else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1489);
if(rotation < 360)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1491);
rotation = 270 + (360 - rotation);
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1495);
rotation = 270;
            }}
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1497);
gradientProps.type = "gradient";//"gradientunscaled";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1498);
gradientProps.angle = rotation;
		}
		else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1500);
if(type === "radial")
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1502);
gradientBoxWidth = w * (r * 2);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1503);
gradientBoxHeight = h * (r * 2);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1504);
fx = r * 2 * (fx - 0.5);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1505);
fy = r * 2 * (fy - 0.5);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1506);
fx += cx;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1507);
fy += cy;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1508);
gradientProps.focussize = (gradientBoxWidth/w)/10 + "% " + (gradientBoxHeight/h)/10 + "%";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1509);
gradientProps.alignshape = false;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1510);
gradientProps.type = "gradientradial";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1511);
gradientProps.focus = "100%";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1512);
gradientProps.focusposition = Math.round(fx * 100) + "% " + Math.round(fy * 100) + "%";
		}}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1514);
for(i = 0;i < len; ++i) {
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1515);
stop = stops[i];
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1516);
color = stop.color;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1517);
opacity = stop.opacity;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1518);
opacity = isNumber(opacity) ? opacity : 1;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1519);
pct = stop.offset || i/(len-1);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1520);
pct *= (r * 2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1521);
pct = Math.round(100 * pct) + "%";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1522);
oi = i > 0 ? i + 1 : "";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1523);
gradientProps["opacity" + oi] = opacity + "";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1524);
colorstring += ", " + pct + " " + color;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1526);
if(parseFloat(pct) < 100)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1528);
colorstring += ", 100% " + color;
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1530);
gradientProps.colors = colorstring.substr(2);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1531);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_addTransform", 1542);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1544);
args = Y.Array(args);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1545);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1546);
args.unshift(type);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1547);
this._transforms.push(args);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1548);
if(this.initialized)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1550);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateTransform", 1560);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1562);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1575);
if(this._transforms && this._transforms.length > 0)
		{
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1577);
transformOrigin = this.get("transformOrigin");

            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1579);
if(isPathShape)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1581);
normalizedMatrix.translate(this._left, this._top);
            }
            //vml skew matrix transformOrigin ranges from -0.5 to 0.5.
            //subtract 0.5 from values
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1585);
tx = transformOrigin[0] - 0.5;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1586);
ty = transformOrigin[1] - 0.5;

            //ensure the values are within the appropriate range to avoid errors
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1589);
tx = Math.max(-0.5, Math.min(0.5, tx));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1590);
ty = Math.max(-0.5, Math.min(0.5, ty));
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1591);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1593);
key = this._transforms[i].shift();
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1594);
if(key)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1596);
normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1597);
matrix[key].apply(matrix, this._transforms[i]);
                }
			}
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1600);
if(isPathShape)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1602);
normalizedMatrix.translate(-this._left, -this._top);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1604);
transform = normalizedMatrix.a + "," +
                        normalizedMatrix.c + "," +
                        normalizedMatrix.b + "," +
                        normalizedMatrix.d + "," +
                        0 + "," +
                        0;
		}
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1611);
this._graphic.addToRedrawQueue(this);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1612);
if(transform)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1614);
if(!this._skew)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1616);
this._skew = DOCUMENT.createElement(
                    '<skew class="vmlskew"' +
                    ' xmlns="urn:schemas-microsft.com:vml"' +
                    ' on="false"' +
                    ' style="behavior:url(#default#VML);display:inline-block;"' +
                    '/>'
                );
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1623);
this.node.appendChild(this._skew);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1625);
this._skew.matrix = transform;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1626);
this._skew.on = true;
            //this._skew.offset = this._getSkewOffsetValue(normalizedMatrix.dx) + "px, " + this._getSkewOffsetValue(normalizedMatrix.dy) + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1628);
this._skew.origin = tx + ", " + ty;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1630);
if(this._type !== "path")
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1632);
this._transforms = [];
        }
        //add the translate to the x and y coordinates
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1635);
node.style.left = (x + this._getSkewOffsetValue(normalizedMatrix.dx)) + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1636);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getSkewOffsetValue", 1647);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1649);
var sign = Y.MatrixUtil.sign(val),
            absVal = Math.abs(val);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1651);
val = Math.min(absVal, 32767) * sign;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1652);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translate", 1689);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1691);
this._translateX += x;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1692);
this._translateY += y;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1693);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translateX", 1703);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1705);
this._translateX += x;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1706);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "translateY", 1716);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1718);
this._translateY += y;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1719);
this._addTransform("translateY", arguments);
    },

    /**
     * Skews the shape around the x-axis and y-axis.
     *
     * @method skew
     * @param {Number} x The value to skew on the x-axis.
     * @param {Number} y The value to skew on the y-axis.
     */
    skew: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skew", 1729);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1731);
this._addTransform("skew", arguments);
    },

	/**
	 * Skews the shape around the x-axis.
	 *
	 * @method skewX
	 * @param {Number} x x-coordinate
	 */
     skewX: function()
     {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skewX", 1740);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1742);
this._addTransform("skewX", arguments);
     },

	/**
	 * Skews the shape around the y-axis.
	 *
	 * @method skewY
	 * @param {Number} y y-coordinate
	 */
     skewY: function()
     {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "skewY", 1751);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1753);
this._addTransform("skewY", arguments);
     },

	/**
	 * Rotates the shape clockwise around it transformOrigin.
	 *
	 * @method rotate
	 * @param {Number} deg The degree of the rotation.
	 */
     rotate: function()
     {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "rotate", 1762);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1764);
this._addTransform("rotate", arguments);
     },

	/**
	 * Specifies a 2d scaling operation.
	 *
	 * @method scale
	 * @param {Number} val
	 */
    scale: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "scale", 1773);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1775);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "on", 1787);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1789);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1791);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1793);
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
	_updateHandler: function()
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_updateHandler", 1812);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1814);
var host = this,
            node = host.node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1816);
host._fillChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1817);
host._strokeChangeHandler();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1818);
node.style.width = this.get("width") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1819);
node.style.height = this.get("height") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1820);
this._draw();
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1821);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphicNode", 1832);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1834);
type = type || this._type;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1835);
return DOCUMENT.createElement(
                '<' + type +
                ' xmlns="urn:schemas-microsft.com:vml"' +
                ' style="behavior:url(#default#VML);display:inline-block;"' +
                ' class="vml' + type + '"' +
                '/>'
            );
	},

	/**
	 * Value function for fill attribute
	 *
	 * @private
	 * @method _getDefaultFill
	 * @return Object
	 */
	_getDefaultFill: function() {
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDefaultFill", 1851);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1852);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDefaultStroke", 1870);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1872);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "set", 1889);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1891);
var host = this;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1892);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1893);
if(host.initialized)
		{
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1895);
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
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getBounds", 1908);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1910);
var isPathShape = this instanceof Y.VMLPath,
			w = this.get("width"),
			h = this.get("height"),
            x = this.get("x"),
            y = this.get("y");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1915);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1917);
x = x + this._left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1918);
y = y + this._top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1919);
w = this._right - this._left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1920);
h = this._bottom - this._top;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1922);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getContentRect", 1935);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1937);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1948);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1950);
matrix.translate(this._left, this._top);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1952);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1953);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1954);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1955);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1957);
transform = transforms[i];
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1958);
key = transform.shift();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1959);
if(key)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1961);
matrix[key].apply(matrix, transform);
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1964);
matrix.translate(-transformX, -transformY);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1965);
if(isPathShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1967);
matrix.translate(-this._left, -this._top);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1969);
contentRect = matrix.getContentRect(w, h, x, y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1970);
return contentRect;
    },

    /**
     * Places the shape above all other shapes.
     *
     * @method toFront
     */
    toFront: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "toFront", 1978);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1980);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1981);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1983);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "toBack", 1992);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 1994);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1995);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 1997);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_parsePathData", 2008);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2010);
var method,
            methodSymbol,
            args,
            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),
            i,
            len,
            str,
            symbolToMethod = this._pathSymbolToMethod;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2018);
if(commandArray)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2020);
this.clear();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2021);
len = commandArray.length || 0;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2022);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2024);
str = commandArray[i];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2025);
methodSymbol = str.substr(0, 1);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2026);
args = str.substr(1).match(SPLITARGSPATTERN);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2027);
method = symbolToMethod[methodSymbol];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2028);
if(method)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2030);
if(args)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2032);
this[method].apply(this, args);
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2036);
this[method].apply(this);
                    }
                }
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2040);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "destroy", 2049);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2051);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2052);
if(graphic)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2054);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2058);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_destroy", 2068);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2070);
if(this.node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2072);
if(this._fillNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2074);
this.node.removeChild(this._fillNode);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2075);
this._fillNode = null;
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2077);
if(this._strokeNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2079);
this.node.removeChild(this._strokeNode);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2080);
this._strokeNode = null;
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2082);
Y.one(this.node).remove(true);
        }
    }
}, Y.VMLDrawing.prototype));

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2087);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 2096);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2098);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2133);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2135);
var i,
                len,
                transform;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2138);
this.matrix.init();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2139);
this._normalizedMatrix.init();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2140);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2141);
len = this._transforms.length;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2142);
for(i = 0;i < len; ++i)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2144);
transform = this._transforms[i];
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2146);
this._transform = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2147);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2150);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2152);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 2183);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2185);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2188);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2190);
var node = this.node;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2191);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2193);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2195);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2224);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2225);
var node = this.node,
				visibility = val ? "visible" : "hidden";
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2227);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2229);
node.style.visibility = visibility;
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2231);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2287);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2289);
var i,
				fill,
				tmpl = this.get("fill") || this._getDefaultFill();

			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2293);
if(val)
			{
				//ensure, fill type is solid if color is explicitly passed.
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2296);
if(val.hasOwnProperty("color"))
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2298);
val.type = "solid";
				}
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2300);
for(i in val)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2302);
if(val.hasOwnProperty(i))
					{
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2304);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2308);
fill = tmpl;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2309);
if(fill && fill.color)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2311);
if(fill.color === undefined || fill.color === "none")
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2313);
fill.color = null;
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2316);
this._fillFlag = true;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2317);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2352);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2354);
var i,
				stroke,
                wt,
				tmpl = this.get("stroke") || this._getDefaultStroke();
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2358);
if(val)
			{
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2360);
if(val.hasOwnProperty("weight"))
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2362);
wt = parseInt(val.weight, 10);
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2363);
if(!isNaN(wt))
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2365);
val.weight = wt;
                    }
                }
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2368);
for(i in val)
				{
					_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2370);
if(val.hasOwnProperty(i))
					{
						_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2372);
tmpl[i] = val[i];
					}
				}
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2376);
stroke = tmpl;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2377);
this._strokeFlag = true;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2378);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2407);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2409);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2423);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2425);
if(this.get("node"))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2427);
this._parsePathData(val);
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2429);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2442);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2444);
return this._graphic;
		}
	}
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2448);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2459);
VMLPath = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLPath", 2459);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2461);
VMLPath.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2464);
VMLPath.NAME = "path";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2465);
Y.extend(VMLPath, Y.VMLShape);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2466);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2474);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2476);
var val = Math.max(this._right - this._left, 0);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2477);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2488);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2490);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2504);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2506);
return this._path;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2510);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2521);
VMLRect = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLRect", 2521);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2523);
VMLRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2525);
VMLRect.NAME = "rect";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2526);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2536);
VMLRect.ATTRS = Y.VMLShape.ATTRS;
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2537);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2548);
VMLEllipse = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLEllipse", 2548);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2550);
VMLEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2553);
VMLEllipse.NAME = "ellipse";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2555);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2565);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2575);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2577);
var val = this.get("width");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2578);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2579);
return val;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2582);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2584);
var w = val * 2;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2585);
this.set("width", w);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2586);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2600);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2602);
var val = this.get("height");
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2603);
val = Math.round((val/2) * 100)/100;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2604);
return val;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2607);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2609);
var h = val * 2;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2610);
this.set("height", h);
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2611);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2615);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2626);
VMLCircle = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLCircle", 2626);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2628);
VMLCircle.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2631);
VMLCircle.NAME = "circle";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2633);
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

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2644);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2664);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2666);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2667);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2670);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2672);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2674);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2685);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2687);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2688);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2691);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2693);
var radius = this.get("radius"),
			val = radius && radius > 0 ? radius * 2 : 0;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2695);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2699);
Y.VMLCircle = VMLCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class VMLPieSlice
 * @constructor
 */
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2707);
VMLPieSlice = function()
{
	_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLPieSlice", 2707);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2709);
VMLPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2711);
VMLPieSlice.NAME = "vmlPieSlice";
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2712);
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
	_draw: function()
	{
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_draw", 2728);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2730);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2735);
this.clear();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2736);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2737);
this.end();
	}
 }, Y.VMLDrawing.prototype));
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2740);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2778);
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
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2789);
VMLGraphic = function() {
    _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "VMLGraphic", 2789);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2790);
VMLGraphic.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2793);
VMLGraphic.NAME = "vmlGraphic";

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2795);
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
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "valueFn", 2812);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2814);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2817);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2819);
var node = this._node;
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2820);
if(node)
			{
				_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2822);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2824);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2838);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2840);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2853);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2855);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2868);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2870);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2881);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2883);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2885);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2887);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2898);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2900);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2902);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2904);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2975);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2977);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 2980);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 2982);
this._x = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2983);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2985);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 2987);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getter", 2998);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3000);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 3003);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3005);
this._y = val;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3006);
if(this._node)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3008);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3010);
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
            _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setter", 3030);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3032);
this._toggleVisible(val);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3033);
return val;
        }
    }
};

_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3038);
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
	set: function()
	{
		_yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "set", 3048);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3050);
var host = this,
            attr = arguments[0],
            redrawAttrs = {
                autoDraw: true,
                autoSize: true,
                preserveAspectRatio: true,
                resizeDown: true
            },
            key,
            forceRedraw = false;
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3060);
AttributeLite.prototype.set.apply(host, arguments);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3061);
if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3063);
if(Y_LANG.isString && redrawAttrs[attr])
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3065);
forceRedraw = true;
            }
            else {_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3067);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3069);
for(key in redrawAttrs)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3071);
if(redrawAttrs.hasOwnProperty(key) && attr[key])
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3073);
forceRedraw = true;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3074);
break;
                    }
                }
            }}
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3079);
if(forceRedraw)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3081);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getXY", 3109);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3111);
var node = this.parentNode,
            x = this.get("x"),
            y = this.get("y"),
            xy;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3115);
if(node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3117);
xy = Y.one(node).getXY();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3118);
xy[0] += x;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3119);
xy[1] += y;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3123);
xy = Y.DOM._getOffset(this._node);
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3125);
return xy;
    },

    /**
     * Initializes the class.
     *
     * @method initializer
     * @private
     */
    initializer: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "initializer", 3134);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3135);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3137);
this._shapes = {};
		_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3138);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3144);
this._node = this._createGraphic();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3145);
this._node.style.left = this.get("x") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3146);
this._node.style.top = this.get("y") + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3147);
this._node.style.visibility = visibility;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3148);
this._node.setAttribute("id", this.get("id"));
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3149);
if(render)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3151);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "render", 3161);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3162);
var parentNode = Y.one(render),
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3165);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3166);
parentNode.appendChild(this._node);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3167);
this.parentNode = parentNode;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3168);
this.set("width", w);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3169);
this.set("height", h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3170);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "destroy", 3178);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3180);
this.clear();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3181);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addShape", 3191);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3193);
cfg.graphic = this;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3194);
if(!this.get("visible"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3196);
cfg.visible = false;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3198);
var ShapeClass = this._getShapeClass(cfg.type),
            shape = new ShapeClass(cfg);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3200);
this._appendShape(shape);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3201);
shape._appendStrokeAndFill();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3202);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_appendShape", 3212);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3214);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3216);
if(this.get("autoDraw") || this.get("autoSize") === "sizeContentToGraphic")
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3218);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3222);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeShape", 3232);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3234);
if(!(shape instanceof VMLShape))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3236);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3238);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3241);
if(shape && (shape instanceof VMLShape))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3243);
shape._destroy();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3244);
this._shapes[shape.get("id")] = null;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3245);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3247);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3249);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "removeAllShapes", 3258);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3260);
var shapes = this._shapes,
            i;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3262);
for(i in shapes)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3264);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3266);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3269);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_removeChildren", 3279);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3281);
if(node.hasChildNodes())
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3283);
var child;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3284);
while(node.firstChild)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3286);
child = node.firstChild;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3287);
this._removeChildren(child);
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3288);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "clear", 3298);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3299);
this.removeAllShapes();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3300);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toggleVisible", 3310);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3312);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3315);
if(shapes)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3317);
for(i in shapes)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3319);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3321);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3325);
if(this._node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3327);
this._node.style.visibility = visibility;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3329);
if(this._node)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3331);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setSize", 3342);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3343);
w = Math.round(w);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3344);
h = Math.round(h);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3345);
this._node.style.width = w + 'px';
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3346);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "setPosition", 3356);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3358);
x = Math.round(x);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3359);
y = Math.round(y);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3360);
this._node.style.left = x + "px";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3361);
this._node.style.top = y + "px";
    },

    /**
     * Creates a group element
     *
     * @method _createGraphic
     * @private
     */
    _createGraphic: function() {
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphic", 3370);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3371);
var group = DOCUMENT.createElement(
            '<group xmlns="urn:schemas-microsft.com:vml"' +
            ' style="behavior:url(#default#VML);padding:0px 0px 0px 0px;display:block;position:absolute;top:0px;left:0px;zoom:1;"' +
            '/>'
        );
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3376);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_createGraphicNode", 3388);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3390);
return DOCUMENT.createElement(
            '<' +
            type +
            ' xmlns="urn:schemas-microsft.com:vml"' +
            ' style="behavior:url(#default#VML);display:inline-block;zoom:1;"' +
            '/>'
        );

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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "getShapeById", 3407);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3409);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getShapeClass", 3420);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3422);
var shape = this._shapeClass[val];
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3423);
if(shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3425);
return shape;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3427);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "batch", 3451);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3453);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3454);
this.set("autoDraw", false);
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3455);
method.apply();
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3456);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getDocFrag", 3466);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3468);
if(!this._frag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3470);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3472);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "addToRedrawQueue", 3482);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3484);
var shapeBox,
            box;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3486);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3487);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3489);
shapeBox = shape.getBounds();
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3490);
box = this._contentBounds;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3491);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3492);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3493);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3494);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3495);
box.width = box.right - box.left;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3496);
box.height = box.bottom - box.top;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3497);
this._contentBounds = box;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3499);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3501);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_redraw", 3511);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3513);
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
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3533);
this._node.style.visibility = "hidden";
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3534);
if(autoSize)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3536);
if(autoSize === "sizeContentToGraphic")
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3538);
preserveAspectRatio = this.get("preserveAspectRatio");
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3539);
if(preserveAspectRatio === "none" || contentWidth/contentHeight === nodeWidth/nodeHeight)
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3541);
xCoordOrigin = left;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3542);
yCoordOrigin = top;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3543);
xCoordSize = contentWidth;
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3544);
yCoordSize = contentHeight;
                }
                else
                {
                    _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3548);
if(contentWidth * nodeHeight/contentHeight > nodeWidth)
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3550);
aspectRatio = nodeHeight/nodeWidth;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3551);
xCoordSize = contentWidth;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3552);
yCoordSize = contentWidth * aspectRatio;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3553);
scaledHeight = (nodeWidth * (contentHeight/contentWidth)) * (yCoordSize/nodeHeight);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3554);
yCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(5).toLowerCase(), scaledHeight, yCoordSize);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3555);
yCoordOrigin = top + yCoordOrigin;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3556);
xCoordOrigin = left;
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3560);
aspectRatio = nodeWidth/nodeHeight;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3561);
xCoordSize = contentHeight * aspectRatio;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3562);
yCoordSize = contentHeight;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3563);
scaledWidth = (nodeHeight * (contentWidth/contentHeight)) * (xCoordSize/nodeWidth);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3564);
xCoordOrigin = this._calculateCoordOrigin(preserveAspectRatio.slice(1, 4).toLowerCase(), scaledWidth, xCoordSize);
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3565);
xCoordOrigin = xCoordOrigin + left;
                        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3566);
yCoordOrigin = top;
                    }
                }
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3569);
this._node.style.width = nodeWidth + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3570);
this._node.style.height = nodeHeight + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3571);
this._node.coordOrigin = xCoordOrigin + ", " + yCoordOrigin;
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3575);
xCoordSize = contentWidth;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3576);
yCoordSize = contentHeight;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3577);
this._node.style.width = contentWidth + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3578);
this._node.style.height = contentHeight + "px";
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3579);
this._state.width = contentWidth;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3580);
this._state.height =  contentHeight;

            }
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3583);
this._node.coordSize = xCoordSize + ", " + yCoordSize;
        }
        else
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3587);
this._node.style.width = nodeWidth + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3588);
this._node.style.height = nodeHeight + "px";
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3589);
this._node.coordSize = nodeWidth + ", " + nodeHeight;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3591);
if(this._frag)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3593);
this._node.appendChild(this._frag);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3594);
this._frag = null;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3596);
if(visible)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3598);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_calculateCoordOrigin", 3612);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3614);
var coord;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3615);
switch(position)
        {
            case "min" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3618);
coord = 0;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3619);
break;
            case "mid" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3621);
coord = (size - coordsSize)/2;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3622);
break;
            case "max" :
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3624);
coord = (size - coordsSize);
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3625);
break;
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3627);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_getUpdatedContentBounds", 3637);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3639);
var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {};
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3644);
for(i in queue)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3646);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3648);
shape = queue[i];
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3649);
bounds = shape.getBounds();
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3650);
box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3651);
box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3652);
box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3653);
box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;
            }
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3656);
box.left = Y_LANG.isNumber(box.left) ? box.left : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3657);
box.top = Y_LANG.isNumber(box.top) ? box.top : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3658);
box.right = Y_LANG.isNumber(box.right) ? box.right : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3659);
box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3660);
this._contentBounds = box;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3661);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toFront", 3671);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3673);
var contentNode = this._node;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3674);
if(shape instanceof Y.VMLShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3676);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3678);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3680);
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
        _yuitest_coverfunc("build/graphics-vml/graphics-vml.js", "_toBack", 3691);
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3693);
var contentNode = this._node,
            targetNode;
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3695);
if(shape instanceof Y.VMLShape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3697);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3699);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3701);
targetNode = contentNode.firstChild;
            _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3702);
if(targetNode)
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3704);
contentNode.insertBefore(shape, targetNode);
            }
            else
            {
                _yuitest_coverline("build/graphics-vml/graphics-vml.js", 3708);
contentNode.appendChild(shape);
            }
        }
    }
});
_yuitest_coverline("build/graphics-vml/graphics-vml.js", 3713);
Y.VMLGraphic = VMLGraphic;



}, '@VERSION@', {"requires": ["graphics"]});
