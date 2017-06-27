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
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/graphics-canvas/graphics-canvas.js",
    code: []
};
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].code=["YUI.add('graphics-canvas', function (Y, NAME) {","","var IMPLEMENTATION = \"canvas\",","    SHAPE = \"shape\",","	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,","    SPLITARGSPATTERN = /[\\-]?[0-9]*[0-9|\\.][0-9]*/g,","    DOCUMENT = Y.config.doc,","    Y_LANG = Y.Lang,","    AttributeLite = Y.AttributeLite,","	CanvasShape,","	CanvasPath,","	CanvasRect,","    CanvasEllipse,","	CanvasCircle,","    CanvasPieSlice,","    Y_DOM = Y.DOM,","    Y_Color = Y.Color,","    PARSE_INT = parseInt,","    PARSE_FLOAT = parseFloat,","    IS_NUMBER = Y_LANG.isNumber,","    RE = RegExp,","    TORGB = Y_Color.toRGB,","    TOHEX = Y_Color.toHex,","    _getClassName = Y.ClassNameManager.getClassName;","","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class."," * `CanvasDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Drawing.html\">`Drawing`</a>"," * class will point to the `CanvasDrawing` class."," *"," * @module graphics"," * @class CanvasDrawing"," * @constructor"," */","function CanvasDrawing()","{","}","","CanvasDrawing.prototype = {","    /**","     * Maps path to methods","     *","     * @property _pathSymbolToMethod","     * @type Object","     * @private","     */","    _pathSymbolToMethod: {","        M: \"moveTo\",","        m: \"relativeMoveTo\",","        L: \"lineTo\",","        l: \"relativeLineTo\",","        C: \"curveTo\",","        c: \"relativeCurveTo\",","        Q: \"quadraticCurveTo\",","        q: \"relativeQuadraticCurveTo\",","        z: \"closePath\",","        Z: \"closePath\"","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","","    /**","     * Parses hex color string and alpha value to rgba","     *","     * @method _toRGBA","     * @param {Object} val Color value to parse. Can be hex string, rgb or name.","     * @param {Number} alpha Numeric value between 0 and 1 representing the alpha level.","     * @private","     */","    _toRGBA: function(val, alpha) {","        alpha = (alpha !== undefined) ? alpha : 1;","        if (!Y_Color.re_RGB.test(val)) {","            val = TOHEX(val);","        }","","        if(Y_Color.re_hex.exec(val)) {","            val = 'rgba(' + [","                PARSE_INT(RE.$1, 16),","                PARSE_INT(RE.$2, 16),","                PARSE_INT(RE.$3, 16)","            ].join(',') + ',' + alpha + ')';","        }","        return val;","    },","","    /**","     * Converts color to rgb format","     *","     * @method _toRGB","     * @param val Color value to convert.","     * @private","     */","    _toRGB: function(val) {","        return TORGB(val);","    },","","    /**","     * Sets the size of the graphics object.","     *","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     * @private","     */","	setSize: function(w, h) {","        if(this.get(\"autoSize\"))","        {","            if(w > this.node.getAttribute(\"width\"))","            {","                this.node.style.width = w + \"px\";","                this.node.setAttribute(\"width\", w);","            }","            if(h > this.node.getAttribute(\"height\"))","            {","                this.node.style.height = h + \"px\";","                this.node.setAttribute(\"height\", h);","            }","        }","    },","","	/**","     * Tracks coordinates. Used to calculate the start point of dashed lines.","     *","     * @method _updateCoords","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","	 * @private","	 */","    _updateCoords: function(x, y)","    {","        this._xcoords.push(x);","        this._ycoords.push(y);","        this._currentX = x;","        this._currentY = y;","    },","","	/**","     * Clears the coordinate arrays. Called at the end of a drawing operation.","	 *","     * @method _clearAndUpdateCoords","     * @private","	 */","    _clearAndUpdateCoords: function()","    {","        var x = this._xcoords.pop() || 0,","            y = this._ycoords.pop() || 0;","        this._updateCoords(x, y);","    },","","	/**","     * Moves the shape's dom node.","     *","     * @method _updateNodePosition","	 * @private","	 */","    _updateNodePosition: function()","    {","        var node = this.get(\"node\"),","            x = this.get(\"x\"),","            y = this.get(\"y\");","        node.style.position = \"absolute\";","        node.style.left = (x + this._left) + \"px\";","        node.style.top = (y + this._top) + \"px\";","    },","","    /**","     * Queues up a method to be executed when a shape redraws.","     *","     * @method _updateDrawingQueue","     * @param {Array} val An array containing data that can be parsed into a method and arguments. The value at zero-index","     * of the array is a string reference of the drawing method that will be called. All subsequent indices are argument for","     * that method. For example, `lineTo(10, 100)` would be structured as:","     * `[\"lineTo\", 10, 100]`.","     * @private","     */","    _updateDrawingQueue: function(val)","    {","        this._methods.push(val);","    },","","    /**","     * Draws a line segment from the current drawing position to the specified x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    lineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a line segment from the current drawing position to the relative x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    relativeLineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements lineTo methods.","     *","     * @method _lineTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _lineTo: function(args, relative)","    {","        var point1 = args[0],","            i,","            len,","            x,","            y,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        if(!this._lineToMethods)","        {","            this._lineToMethods = [];","        }","        len = args.length - 1;","        if (typeof point1 === 'string' || typeof point1 === 'number') {","            for (i = 0; i < len; i = i + 2) {","                x = parseFloat(args[i]);","                y = parseFloat(args[i + 1]);","                x = x + relativeX;","                y = y + relativeY;","                this._updateDrawingQueue([\"lineTo\", x, y]);","                this._trackSize(x - wt, y - wt);","                this._trackSize(x + wt, y + wt);","                this._updateCoords(x, y);","            }","        }","        else","        {","            for (i = 0; i < len; i = i + 1)","            {","                x = parseFloat(args[i][0]);","                y = parseFloat(args[i][1]);","                this._updateDrawingQueue([\"lineTo\", x, y]);","                this._lineToMethods[this._lineToMethods.length] = this._methods[this._methods.length - 1];","                this._trackSize(x - wt, y - wt);","                this._trackSize(x + wt, y + wt);","                this._updateCoords(x, y);","            }","        }","        this._drawingComplete = false;","        return this;","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    moveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Moves the current drawing position relative to specified x and y coordinates.","     *","     * @method relativeMoveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeMoveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements moveTo methods.","     *","     * @method _moveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _moveTo: function(args, relative) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0,","            x = parseFloat(args[0]) + relativeX,","            y = parseFloat(args[1]) + relativeY;","        this._updateDrawingQueue([\"moveTo\", x, y]);","        this._trackSize(x - wt, y - wt);","        this._trackSize(x + wt, y + wt);","        this._updateCoords(x, y);","        this._drawingComplete = false;","        return this;","    },","","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    curveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a bezier curve relative to the current coordinates.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeCurveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements curveTo methods.","     *","     * @method _curveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _curveTo: function(args, relative) {","        var w,","            h,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            x,","            y,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        len = args.length - 5;","        for(i = 0; i < len; i = i + 6)","        {","            cp1x = parseFloat(args[i]) + relativeX;","            cp1y = parseFloat(args[i + 1]) + relativeY;","            cp2x = parseFloat(args[i + 2]) + relativeX;","            cp2y = parseFloat(args[i + 3]) + relativeY;","            x = parseFloat(args[i + 4]) + relativeX;","            y = parseFloat(args[i + 5]) + relativeY;","            this._updateDrawingQueue([\"bezierCurveTo\", cp1x, cp1y, cp2x, cp2y, x, y]);","            this._drawingComplete = false;","            right = Math.max(x, Math.max(cp1x, cp2x));","            bottom = Math.max(y, Math.max(cp1y, cp2y));","            left = Math.min(x, Math.min(cp1x, cp2x));","            top = Math.min(y, Math.min(cp1y, cp2y));","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    quadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a quadratic bezier curve relative to the current position.","     *","     * @method relativeQuadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeQuadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements quadraticCurveTo methods.","     *","     * @method _quadraticCurveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _quadraticCurveTo: function(args, relative) {","        var cpx,","            cpy,","            x,","            y,","            w,","            h,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len = args.length - 3,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        for(i = 0; i < len; i = i + 4)","        {","            cpx = parseFloat(args[i]) + relativeX;","            cpy = parseFloat(args[i + 1]) + relativeY;","            x = parseFloat(args[i + 2]) + relativeX;","            y = parseFloat(args[i + 3]) + relativeY;","            this._drawingComplete = false;","            right = Math.max(x, cpx);","            bottom = Math.max(y, cpy);","            left = Math.min(x, cpx);","            top = Math.min(y, cpy);","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._updateDrawingQueue([\"quadraticCurveTo\", cpx, cpy, x, y]);","            this._updateCoords(x, y);","        }","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @chainable","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 2 * Math.PI,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            circum = radius * 2;","            circum += wt;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        this._updateDrawingQueue([\"arc\", x + radius, y + radius, radius, startAngle, endAngle, false]);","        return this;","    },","","    /**","     * Draws a diamond.","     *","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @chainable","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws an ellipse. Used internally by `CanvasEllipse` class.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var l = 8,","            theta = -(45/180) * Math.PI,","            angle = 0,","            angleMid,","            radius = w/2,","            yRadius = h/2,","            i,","            centerX = x + radius,","            centerY = y + yRadius,","            ax, ay, bx, by, cx, cy,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","","        ax = centerX + Math.cos(0) * radius;","        ay = centerY + Math.sin(0) * yRadius;","        this.moveTo(ax, ay);","        for(i = 0; i < l; i++)","        {","            angle += theta;","            angleMid = angle - (theta / 2);","            bx = centerX + Math.cos(angle) * radius;","            by = centerY + Math.sin(angle) * yRadius;","            cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","            cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","            this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","        }","        this._trackSize(x + w + wt, y + h + wt);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        return this;","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     */","    drawRect: function(x, y, w, h) {","        this._drawingComplete = false;","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     * @chainable","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        this._drawingComplete = false;","        this.moveTo( x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @chainable","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius, yRadius)","    {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            segs,","            segAngle,","            theta,","            angle,","            angleMid,","            ax,","            ay,","            bx,","            by,","            cx,","            cy,","            i = 0;","        yRadius = yRadius || radius;","","        this._drawingComplete = false;","        // move to x,y position","        this._updateDrawingQueue([\"moveTo\", x, y]);","","        yRadius = yRadius || radius;","","        // limit sweep to reasonable numbers","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","","        // First we calculate how many segments are needed","        // for a smooth arc.","        segs = Math.ceil(Math.abs(arc) / 45);","","        // Now calculate the sweep of each segment.","        segAngle = arc / segs;","","        // The math requires radians rather than degrees. To convert from degrees","        // use the formula (degrees/180)*Math.PI to get radians.","        theta = -(segAngle / 180) * Math.PI;","","        // convert angle startAngle to radians","        angle = (startAngle / 180) * Math.PI;","","        // draw the curve in segments no larger than 45 degrees.","        if(segs > 0)","        {","            // draw a line from the center to the start of the curve","            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;","            ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;","            this.lineTo(ax, ay);","            // Loop for drawing curve segments","            for(i = 0; i < segs; ++i)","            {","                angle += theta;","                angleMid = angle - (theta / 2);","                bx = x + Math.cos(angle) * radius;","                by = y + Math.sin(angle) * yRadius;","                cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","                cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","                this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","            }","            // close the wedge by drawing a line to the center","            this._updateDrawingQueue([\"lineTo\", x, y]);","        }","        this._trackSize(-wt , -wt);","        this._trackSize((radius * 2) + wt, (radius * 2) + wt);","        return this;","    },","","    /**","     * Completes a drawing operation.","     *","     * @method end","     * @chainable","     */","    end: function() {","        this._closePath();","        return this;","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     * @chainable","     */","    closePath: function()","    {","        this._updateDrawingQueue([\"closePath\"]);","        this._updateDrawingQueue([\"beginPath\"]);","        return this;","    },","","	/**","	 * Clears the graphics object.","	 *","	 * @method clear","     * @chainable","	 */","    clear: function() {","		this._initProps();","        if(this.node)","        {","            this._context.clearRect(0, 0, this.node.width, this.node.height);","        }","        return this;","	},","","","    /**","     * Returns a linear gradient fill","     *","     * @method _getLinearGradient","     * @return CanvasGradient","     * @private","     */","    _getLinearGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            stops = fill.stops,","            opacity,","            color,","            stop,","            i,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            r = fill.rotation || 0,","            x1, x2, y1, y2,","            cx = x + w/2,","            cy = y + h/2,","            offset,","            radCon = Math.PI/180,","            tanRadians = parseFloat(parseFloat(Math.tan(r * radCon)).toFixed(8));","        if(Math.abs(tanRadians) * w/2 >= h/2)","        {","            if(r < 180)","            {","                y1 = y;","                y2 = y + h;","            }","            else","            {","                y1 = y + h;","                y2 = y;","            }","            x1 = cx - ((cy - y1)/tanRadians);","            x2 = cx - ((cy - y2)/tanRadians);","        }","        else","        {","            if(r > 90 && r < 270)","            {","                x1 = x + w;","                x2 = x;","            }","            else","            {","                x1 = x;","                x2 = x + w;","            }","            y1 = ((tanRadians * (cx - x1)) - cy) * -1;","            y2 = ((tanRadians * (cx - x2)) - cy) * -1;","        }","        gradient = this._context.createLinearGradient(x1, y1, x2, y2);","        for(i = 0; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            gradient.addColorStop(offset, color);","        }","        return gradient;","    },","","    /**","     * Returns a radial gradient fill","     *","     * @method _getRadialGradient","     * @return CanvasGradient","     * @private","     */","    _getRadialGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            r = fill.r,","            fx = fill.fx,","            fy = fill.fy,","            stops = fill.stops,","            opacity,","            color,","            stop,","            i,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            x1, x2, y1, y2, r2,","            xc, yc, xn, yn, d,","            offset,","            ratio,","            stopMultiplier;","        xc = x + w/2;","        yc = y + h/2;","        x1 = w * fx;","        y1 = h * fy;","        x2 = x + w/2;","        y2 = y + h/2;","        r2 = w * r;","        d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );","        if(d >= r2)","        {","            ratio = d/r2;","            //hack. gradient won't show if it is exactly on the edge of the arc","            if(ratio === 1)","            {","                ratio = 1.01;","            }","            xn = (x1 - xc)/ratio;","            yn = (y1 - yc)/ratio;","            xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);","            yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);","            x1 = xc + xn;","            y1 = yc + yn;","        }","","        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.","        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work.","        //Instead, adjust the color stops to reflect the smaller radius.","        if(r >= 0.5)","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);","            stopMultiplier = 1;","        }","        else","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);","            stopMultiplier = r * 2;","        }","        for(i = 0; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            offset *= stopMultiplier;","            if(offset <= 1)","            {","                gradient.addColorStop(offset, color);","            }","        }","        return gradient;","    },","","","    /**","     * Clears all values","     *","     * @method _initProps","     * @private","     */","    _initProps: function() {","        this._methods = [];","        this._lineToMethods = [];","        this._xcoords = [0];","		this._ycoords = [0];","		this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._right = 0;","        this._bottom = 0;","        this._currentX = 0;","        this._currentY = 0;","    },","","    /**","     * Indicates a drawing has completed.","     *","     * @property _drawingComplete","     * @type Boolean","     * @private","     */","    _drawingComplete: false,","","    /**","     * Creates canvas element","     *","     * @method _createGraphic","     * @return HTMLCanvasElement","     * @private","     */","    _createGraphic: function() {","        var graphic = Y.config.doc.createElement('canvas');","        return graphic;","    },","","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];","            }","        }","        return [ tmp[0][0], tmp[0][1] ];","    },","","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i = 0,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            xy;","        for(i = 0; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right + wt, bottom + wt);","        this._trackSize(left - wt, top - wt);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom)","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    }","};","Y.CanvasDrawing = CanvasDrawing;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class."," * `CanvasShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Shape.html\">`Shape`</a>"," * class will point to the `CanvasShape` class."," *"," * @module graphics"," * @class CanvasShape"," * @constructor"," */","CanvasShape = function()","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    CanvasShape.superclass.constructor.apply(this, arguments);","};","","CanvasShape.NAME = \"shape\";","","Y.extend(CanvasShape, Y.GraphicBase, Y.mix({","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","    init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic,","            data = this.get(\"data\");","        host._initProps();","		host.createNode();","		host._xcoords = [0];","		host._ycoords = [0];","        if(graphic)","        {","            this._setGraphic(graphic);","        }","        if(data)","        {","            host._parsePathData(data);","        }","		host._updateHandler();","	},","","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a","     * `Graphic` instance, it will be assigned to the `graphic` attribute. Otherwise, a new Graphic instance will be created","     * and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.CanvasGraphic)","        {","            this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.CanvasGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","        }","    },","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute","	 */","	addClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.addClass(className);","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.removeClass(className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains X & Y values for new position (coordinates are page-based)","	 */","	setXY: function(xy)","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = xy[0] - parentXY[0],","			y = xy[1] - parentXY[1];","		this._set(\"x\", x);","		this._set(\"y\", y);","		this._updateNodePosition(x, y);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.","	 *","	 * @method contains","	 * @param {CanvasShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y.one(this.get(\"node\")).test(selector);","		//return Y.Selector.test(this.node, selector);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","		return node === refNode;","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @method _getDefaultFill","	 * @return Object","	 * @private","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			opacity: 1,","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @method _getDefaultStroke","	 * @return Object","	 * @private","	 */","	_getDefaultStroke: function()","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","	/**","	 * Left edge of the path","	 *","     * @property _left","     * @type Number","	 * @private","	 */","	_left: 0,","","	/**","	 * Right edge of the path","	 *","     * @property _right","     * @type Number","	 * @private","	 */","	_right: 0,","","	/**","	 * Top edge of the path","	 *","     * @property _top","     * @type Number","	 * @private","	 */","	_top: 0,","","	/**","	 * Bottom edge of the path","	 *","     * @property _bottom","     * @type Number","	 * @private","	 */","	_bottom: 0,","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var host = this,","            node = Y.config.doc.createElement('canvas'),","			id = host.get(\"id\"),","            concat = host._camelCaseConcat,","            name = host.name;","		host._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.style.overflow = \"visible\";","        if(!host.get(\"visible\"))","        {","            node.style.visibility = \"hidden\";","        }","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","        host.node = node;","		host.addClass(","            _getClassName(SHAPE) +","            \" \" +","            _getClassName(concat(IMPLEMENTATION, SHAPE)) +","            \" \" +","            _getClassName(name) +","            \" \" +","            _getClassName(concat(IMPLEMENTATION, name))","        );","	},","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so,","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","     * @param {Object} stroke Properties of the `stroke` attribute.","	 * @private","	 */","	_setStrokeProps: function(stroke)","	{","		var color,","			weight,","			opacity,","			linejoin,","			linecap,","			dashstyle;","        if(stroke)","        {","            color = stroke.color;","            weight = PARSE_FLOAT(stroke.weight);","            opacity = PARSE_FLOAT(stroke.opacity);","            linejoin = stroke.linejoin || \"round\";","            linecap = stroke.linecap || \"butt\";","            dashstyle = stroke.dashstyle;","            this._miterlimit = null;","            this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;","            this._strokeWeight = weight;","","            if (IS_NUMBER(weight) && weight > 0)","            {","                this._stroke = 1;","            }","            else","            {","                this._stroke = 0;","            }","            if (IS_NUMBER(opacity)) {","                this._strokeStyle = this._toRGBA(color, opacity);","            }","            else","            {","                this._strokeStyle = color;","            }","            this._linecap = linecap;","            if(linejoin === \"round\" || linejoin === \"bevel\")","            {","                this._linejoin = linejoin;","            }","            else","            {","                linejoin = parseInt(linejoin, 10);","                if(IS_NUMBER(linejoin))","                {","                    this._miterlimit =  Math.max(linejoin, 1);","                    this._linejoin = \"miter\";","                }","            }","        }","        else","        {","            this._stroke = 0;","        }","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this;","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _setFillProps","     * @param {Object} fill Properties of the `fill` attribute.","	 * @private","	 */","	_setFillProps: function(fill)","	{","		var isNumber = IS_NUMBER,","			color,","			opacity,","			type;","        if(fill)","        {","            color = fill.color;","            type = fill.type;","            if(type === \"linear\" || type === \"radial\")","            {","                this._fillType = type;","            }","            else if(color)","            {","                opacity = fill.opacity;","                if (isNumber(opacity))","                {","                    opacity = Math.max(0, Math.min(1, opacity));","                    color = this._toRGBA(color, opacity);","                }","                else","                {","                    color = TORGB(color);","                }","","                this._fillColor = color;","                this._fillType = 'solid';","            }","            else","            {","                this._fillColor = null;","            }","        }","		else","		{","            this._fillType = null;","			this._fillColor = null;","		}","	},","","	/**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to transate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function()","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","    skewX: function()","    {","        this._addTransform(\"skewX\", arguments);","    },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","    skewY: function()","    {","        this._addTransform(\"skewY\", arguments);","    },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","    rotate: function()","    {","        this._addTransform(\"rotate\", arguments);","    },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","    scale: function()","    {","        this._addTransform(\"scale\", arguments);","    },","","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","			key,","			transform,","			transformOrigin = this.get(\"transformOrigin\"),","            matrix = this.matrix,","            i,","            len = this._transforms.length;","","        if(this._transforms && this._transforms.length > 0)","        {","            for(i = 0; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    matrix[key].apply(matrix, this._transforms[i]);","                }","            }","            transform = matrix.toCSSText();","        }","","        this._graphic.addToRedrawQueue(this);","		transformOrigin = (100 * transformOrigin[0]) + \"% \" + (100 * transformOrigin[1]) + \"%\";","        Y_DOM.setStyle(node, \"transformOrigin\", transformOrigin);","        if(transform)","		{","            Y_DOM.setStyle(node, \"transform\", transform);","		}","        this._transforms = [];","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function()","	{","		this._draw();","		this._updateTransform();","	},","","	/**","	 * Updates the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","        var node = this.node;","        this.clear();","		this._closePath();","		node.style.left = this.get(\"x\") + \"px\";","		node.style.top = this.get(\"y\") + \"px\";","	},","","	/**","	 * Completes a shape or drawing","	 *","	 * @method _closePath","	 * @private","	 */","	_closePath: function()","	{","		if(!this._methods)","		{","			return;","		}","		var node = this.get(\"node\"),","			w = this._right - this._left,","			h = this._bottom - this._top,","			context = this._context,","			methods = [],","			cachedMethods = this._methods.concat(),","			i,","			j,","			method,","			args,","            argsLen,","			len = 0;","		this._context.clearRect(0, 0, node.width, node.height);","        if(this._methods)","        {","			len = cachedMethods.length;","			if(!len || len < 1)","			{","				return;","			}","			for(i = 0; i < len; ++i)","			{","				methods[i] = cachedMethods[i].concat();","				args = methods[i];","                argsLen = (args[0] === \"quadraticCurveTo\" || args[0] === \"bezierCurveTo\") ? args.length : 3;","				for(j = 1; j < argsLen; ++j)","				{","					if(j % 2 === 0)","					{","						args[j] = args[j] - this._top;","					}","					else","					{","						args[j] = args[j] - this._left;","					}","				}","			}","            node.setAttribute(\"width\", Math.min(w, 2000));","            node.setAttribute(\"height\", Math.min(2000, h));","            context.beginPath();","			for(i = 0; i < len; ++i)","			{","				args = methods[i].concat();","				if(args && args.length > 0)","				{","					method = args.shift();","					if(method)","					{","                        if(method === \"closePath\")","                        {","                            context.closePath();","                            this._strokeAndFill(context);","                        }","						else if(method && method === \"lineTo\" && this._dashstyle)","						{","							args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);","							this._drawDashedLine.apply(this, args);","						}","						else","						{","                            context[method].apply(context, args);","						}","					}","				}","			}","","            this._strokeAndFill(context);","			this._drawingComplete = true;","			this._clearAndUpdateCoords();","			this._updateNodePosition();","			this._methods = cachedMethods;","		}","	},","","    /**","     * Completes a stroke and/or fill operation on the context.","     *","     * @method _strokeAndFill","     * @param {Context} Reference to the context element of the canvas instance.","     * @private","     */","    _strokeAndFill: function(context)","    {","        if (this._fillType)","        {","            if(this._fillType === \"linear\")","            {","                context.fillStyle = this._getLinearGradient();","            }","            else if(this._fillType === \"radial\")","            {","                context.fillStyle = this._getRadialGradient();","            }","            else","            {","                context.fillStyle = this._fillColor;","            }","            context.closePath();","            context.fill();","        }","","        if (this._stroke) {","            if(this._strokeWeight)","            {","                context.lineWidth = this._strokeWeight;","            }","            context.lineCap = this._linecap;","            context.lineJoin = this._linejoin;","            if(this._miterlimit)","            {","                context.miterLimit = this._miterlimit;","            }","            context.strokeStyle = this._strokeStyle;","            context.stroke();","        }","    },","","	/**","	 * Draws a dashed line between two points.","	 *","	 * @method _drawDashedLine","	 * @param {Number} xStart	The x position of the start of the line","	 * @param {Number} yStart	The y position of the start of the line","	 * @param {Number} xEnd		The x position of the end of the line","	 * @param {Number} yEnd		The y position of the end of the line","	 * @private","	 */","	_drawDashedLine: function(xStart, yStart, xEnd, yEnd)","	{","		var context = this._context,","			dashsize = this._dashstyle[0],","			gapsize = this._dashstyle[1],","			segmentLength = dashsize + gapsize,","			xDelta = xEnd - xStart,","			yDelta = yEnd - yStart,","			delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),","			segmentCount = Math.floor(Math.abs(delta / segmentLength)),","			radians = Math.atan2(yDelta, xDelta),","			xCurrent = xStart,","			yCurrent = yStart,","			i;","		xDelta = Math.cos(radians) * segmentLength;","		yDelta = Math.sin(radians) * segmentLength;","","		for(i = 0; i < segmentCount; ++i)","		{","			context.moveTo(xCurrent, yCurrent);","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","			xCurrent += xDelta;","			yCurrent += yDelta;","		}","","		context.moveTo(xCurrent, yCurrent);","		delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));","","		if(delta > dashsize)","		{","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","		}","		else if(delta > 0)","		{","			context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);","		}","","		context.moveTo(xEnd, yEnd);","	},","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox.","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var type = this._type,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			x = this.get(\"x\"),","			y = this.get(\"y\");","        if(type === \"path\")","        {","            x = x + this._left;","            y = y + this._top;","            w = this._right - this._left;","            h = this._bottom - this._top;","        }","        return this._getContentRect(w, h, x, y);","	},","","    /**","     * Calculates the bounding box for the shape.","     *","     * @method _getContentRect","     * @param {Number} w width of the shape","     * @param {Number} h height of the shape","     * @param {Number} x x-coordinate of the shape","     * @param {Number} y y-coordinate of the shape","     * @private","     */","    _getContentRect: function(w, h, x, y)","    {","        var transformOrigin = this.get(\"transformOrigin\"),","            transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h,","            transforms = this.matrix.getTransformArray(this.get(\"transform\")),","            matrix = new Y.Matrix(),","            i,","            len = transforms.length,","            transform,","            key,","            contentRect;","        if(this._type === \"path\")","        {","            transformX = transformX + x;","            transformY = transformY + y;","        }","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        for(i = 0; i < len; i = i + 1)","        {","            transform = transforms[i];","            key = transform.shift();","            if(key)","            {","                matrix[key].apply(matrix, transform);","            }","        }","        matrix.translate(-transformX, -transformY);","        contentRect = matrix.getContentRect(w, h, x, y);","        return contentRect;","    },","","    /**","     * Places the shape above all other shapes.","     *","     * @method toFront","     */","    toFront: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toFront(this);","        }","    },","","    /**","     * Places the shape underneath all other shapes.","     *","     * @method toFront","     */","    toBack: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toBack(this);","        }","    },","","    /**","     * Parses path data string and call mapped methods.","     *","     * @method _parsePathData","     * @param {String} val The path data","     * @private","     */","    _parsePathData: function(val)","    {","        var method,","            methodSymbol,","            args,","            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),","            i,","            len,","            str,","            symbolToMethod = this._pathSymbolToMethod;","        if(commandArray)","        {","            this.clear();","            len = commandArray.length || 0;","            for(i = 0; i < len; i = i + 1)","            {","                str = commandArray[i];","                methodSymbol = str.substr(0, 1);","                args = str.substr(1).match(SPLITARGSPATTERN);","                method = symbolToMethod[methodSymbol];","                if(method)","                {","                    if(args)","                    {","                        this[method].apply(this, args);","                    }","                    else","                    {","                        this[method].apply(this);","                    }","                }","            }","            this.end();","        }","    },","","    /**","     * Destroys the shape instance.","     *","     * @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {","            Y.one(this.node).remove(true);","            this._context = null;","            this.node = null;","        }","    }","}, Y.CanvasDrawing.prototype));","","CanvasShape.ATTRS =  {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains","     * corresponding methods for each transform that will apply the transform to the current matrix. The below code illustrates how you might use the","     * `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String","	 */","	transform: {","		setter: function(val)","		{","            this.matrix.init();","            this._transforms = this.matrix.getTransformArray(val);","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Dom node for the shape","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        value: 0","    },","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        value: 0","    },","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.get(\"node\"),","                visibility = val ? \"visible\" : \"hidden\";","			if(node)","            {","                node.style.visibility = visibility;","            }","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1.","     *              Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd>","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the","     *      flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and","     *          `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape`","     *          classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p>","	 *","	 * @config fill","	 * @type Object","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","","		setter: function(val)","		{","			var fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","			fill = (val) ? Y.merge(tmpl, val) : null;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color === \"none\")","				{","					fill.color = null;","				}","			}","			this._setFillProps(fill);","			return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set","     *      to an array, the first index indicates the length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin","     *              of miter, you simply specify the limit as opposed to having separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","","		setter: function(val)","		{","			var tmpl = this.get(\"stroke\") || this._getDefaultStroke(),","                wt;","            if(val && val.hasOwnProperty(\"weight\"))","            {","                wt = parseInt(val.weight, 10);","                if(!isNaN(wt))","                {","                    val.weight = wt;","                }","            }","			val = (val) ? Y.merge(tmpl, val) : null;","			this._setStrokeProps(val);","			return val;","		}","	},","","	//Not used. Remove in future.","	autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	//","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","    /**","     * Represents an SVG Path string. This will be parsed and added to shape's API to represent the SVG data across all","     * implementations. Note that when using VML or SVG implementations, part of this content will be added to the DOM using","     * respective VML/SVG attributes. If your content comes from an untrusted source, you will need to ensure that no","     * malicious code is included in that content.","     *","     * @config data","     * @type String","     */","    data: {","        setter: function(val)","        {","            if(this.get(\"node\"))","            {","                this._parsePathData(val);","            }","            return val;","        }","    },","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","    }","};","Y.CanvasShape = CanvasShape;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Path.html\">`Path`</a> class."," * `CanvasPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Path.html\">`Path`</a>"," * class will point to the `CanvasPath` class."," *"," * @module graphics"," * @class CanvasPath"," * @extends CanvasShape"," */","CanvasPath = function()","{","	CanvasPath.superclass.constructor.apply(this, arguments);","};","CanvasPath.NAME = \"path\";","Y.extend(CanvasPath, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","    _draw: function()","    {","        this._closePath();","        this._updateTransform();","    },","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var host = this,","            node = Y.config.doc.createElement('canvas'),","			name = host.name,","            concat = host._camelCaseConcat,","            id = host.get(\"id\");","		host._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.setAttribute(\"pointer-events\", \"none\");","        node.style.pointerEvents = \"none\";","        node.style.overflow = \"visible\";","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","		host.node = node;","		host.addClass(","            _getClassName(SHAPE) +","            \" \" +","            _getClassName(concat(IMPLEMENTATION, SHAPE)) +","            \" \" +","            _getClassName(name) +","            \" \" +","            _getClassName(concat(IMPLEMENTATION, name))","        );","	},","","    /**","     * Completes a drawing operation.","     *","     * @method end","     */","    end: function()","    {","        this._draw();","    }","});","","CanvasPath.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","			return this._width - offset;","		},","","		setter: function(val)","		{","			this._width = val;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","            return this._height - offset;","		},","","		setter: function(val)","		{","			this._height = val;","			return val;","		}","	},","","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","        readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.CanvasPath = CanvasPath;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class."," * `CanvasRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Rect.html\">`Rect`</a>"," * class will point to the `CanvasRect` class."," *"," * @module graphics"," * @class CanvasRect"," * @constructor"," */","CanvasRect = function()","{","	CanvasRect.superclass.constructor.apply(this, arguments);","};","CanvasRect.NAME = \"rect\";","Y.extend(CanvasRect, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawRect(0, 0, w, h);","		this._closePath();","	}","});","CanvasRect.ATTRS = Y.CanvasShape.ATTRS;","Y.CanvasRect = CanvasRect;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * `CanvasEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a>"," * class will point to the `CanvasEllipse` class."," *"," * @module graphics"," * @class CanvasEllipse"," * @constructor"," */","CanvasEllipse = function()","{","	CanvasEllipse.superclass.constructor.apply(this, arguments);","};","","CanvasEllipse.NAME = \"ellipse\";","","Y.extend(CanvasEllipse, CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"ellipse\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawEllipse(0, 0, w, h);","		this._closePath();","	}","});","CanvasEllipse.ATTRS = Y.merge(CanvasShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse.","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		setter: function(val)","		{","			this.set(\"width\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"width\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse.","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		setter: function(val)","		{","			this.set(\"height\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"height\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	}","});","Y.CanvasEllipse = CanvasEllipse;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class."," * `CanvasCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Circle.html\">`Circle`</a>"," * class will point to the `CanvasCircle` class."," *"," * @module graphics"," * @class CanvasCircle"," * @constructor"," */","CanvasCircle = function()","{","	CanvasCircle.superclass.constructor.apply(this, arguments);","};","","CanvasCircle.NAME = \"circle\";","","Y.extend(CanvasCircle, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"circle\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var radius = this.get(\"radius\");","		if(radius)","		{","            this.clear();","            this.drawCircle(0, 0, radius);","			this._closePath();","		}","	}","});","","CanvasCircle.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Radius of the circle","	 *","	 * @config radius","     * @type Number","	 */","	radius: {","		lazyAdd: false","	}","});","Y.CanvasCircle = CanvasCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class CanvasPieSlice"," * @constructor"," */","CanvasPieSlice = function()","{","	CanvasPieSlice.superclass.constructor.apply(this, arguments);","};","CanvasPieSlice.NAME = \"canvasPieSlice\";","Y.extend(CanvasPieSlice, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function()","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this._left = x;","        this._right = radius;","        this._top = y;","        this._bottom = radius;","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," });","CanvasPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.CanvasShape.ATTRS);","Y.CanvasPieSlice = CanvasPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the `Graphic` class."," * `CanvasGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Graphic.html\">`Graphic`</a>"," * class will point to the `CanvasGraphic` class."," *"," * @module graphics"," * @class CanvasGraphic"," * @constructor"," */","function CanvasGraphic() {","","    CanvasGraphic.superclass.constructor.apply(this, arguments);","}","","CanvasGraphic.NAME = \"canvasGraphic\";","","CanvasGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node","     * instance or a CSS selector string.","     *","     * @config render","     * @type Node | String","     */","    render: {},","","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the graphic instance's position.","     *","     *  @config contentBounds","     *  @type Object","     *  @readOnly","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The outermost html element of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     *  @readOnly","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`.","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`.","	 *","	 * @config height","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines the sizing of the Graphic.","     *","     *  <dl>","     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the","     *      <code>width</code> and <code>height</code> attributes or are determined by the dimensions of the parent element. The","     *      content contained in the Graphic will be sized to fit with in the Graphic instance's dimensions. When using this","     *      setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>","     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the","     *      size and positioning of the content.</dd>","     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code>","     *      and <code>height</code> attributes or are determined by the dimensions of the parent element. The contents of the","     *      Graphic instance are not affected by this setting.</dd>","     *  </dl>","     *","     *","     *  @config autoSize","     *  @type Boolean | String","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.","     *","     *  <dl>","     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary","     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>","     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>","     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>","     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>","     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>","     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>","     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>","     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>","     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>","     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>","     *  </dl>","     *","     * @config preserveAspectRatio","     * @type String","     * @default xMidYMid","     */","    preserveAspectRatio: {","        value: \"xMidYMid\"","    },","","    /**","     * The contentBounds will resize to greater values but not smaller values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown","     * @type Boolean","     */","    resizeDown: {","        value: false","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","	/**","	 * Indicates whether the `Graphic` and its children are visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(CanvasGraphic, Y.GraphicBase, {","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this,","            attr = arguments[0],","            redrawAttrs = {","                autoDraw: true,","                autoSize: true,","                preserveAspectRatio: true,","                resizeDown: true","            },","            key,","            forceRedraw = false;","		AttributeLite.prototype.set.apply(host, arguments);","        if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)","        {","            if(Y_LANG.isString && redrawAttrs[attr])","            {","                forceRedraw = true;","            }","            else if(Y_LANG.isObject(attr))","            {","                for(key in redrawAttrs)","                {","                    if(redrawAttrs.hasOwnProperty(key) && attr[key])","                    {","                        forceRedraw = true;","                        break;","                    }","                }","            }","        }","        if(forceRedraw)","        {","            host._redraw();","        }","	},","","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = Y.one(this._node),","            xy;","        if(node)","        {","            xy = node.getXY();","        }","        return xy;","    },","","	/**","     * Initializes the class.","     *","     * @method initializer","     * @param {Object} config Optional attributes","     * @private","     */","    initializer: function() {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","            w = this.get(\"width\") || 0,","            h = this.get(\"height\") || 0;","        this._shapes = {};","        this._redrawQueue = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = DOCUMENT.createElement('div');","        this._node.style.position = \"absolute\";","        this._node.style.visibility = visibility;","        this.set(\"width\", w);","        this.set(\"height\", h);","        if(render)","        {","            this.render(render);","        }","    },","","    /**","     * Adds the graphics node to the dom.","     *","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            node = this._node,","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(node);","        node.style.display = \"block\";","        node.style.position = \"absolute\";","        node.style.left = \"0px\";","        node.style.top = \"0px\";","        this.set(\"width\", w);","        this.set(\"height\", h);","        this.parentNode = parentNode;","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.removeAllShapes();","        if(this._node)","        {","            this._removeChildren(this._node);","            Y.one(this._node).destroy();","        }","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var ShapeClass = this._getShapeClass(cfg.type),","            shape = new ShapeClass(cfg);","        this._appendShape(shape);","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\"))","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof CanvasShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && shape instanceof CanvasShape)","        {","            shape._destroy();","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","        return shape;","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param {HTMLElement} node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node && node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Returns a shape class. Used by `addShape`.","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class.","     * @return Function","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.CanvasCircle,","        rect: Y.CanvasRect,","        path: Y.CanvasPath,","        ellipse: Y.CanvasEllipse,","        pieslice: Y.CanvasPieSlice","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        var shape = this._shapes[id];","        return shape;","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method();","        this.set(\"autoDraw\", autoDraw);","    },","","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var autoSize = this.get(\"autoSize\"),","            preserveAspectRatio = this.get(\"preserveAspectRatio\"),","            box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds,","            contentWidth,","            contentHeight,","            w,","            h,","            xScale,","            yScale,","            translateX = 0,","            translateY = 0,","            matrix,","            node = this.get(\"node\");","        if(autoSize)","        {","            if(autoSize === \"sizeContentToGraphic\")","            {","                contentWidth = box.right - box.left;","                contentHeight = box.bottom - box.top;","                w = parseFloat(Y_DOM.getComputedStyle(node, \"width\"));","                h = parseFloat(Y_DOM.getComputedStyle(node, \"height\"));","                matrix = new Y.Matrix();","                if(preserveAspectRatio === \"none\")","                {","                    xScale = w/contentWidth;","                    yScale = h/contentHeight;","                }","                else","                {","                    if(contentWidth/contentHeight !== w/h)","                    {","                        if(contentWidth * h/contentHeight > w)","                        {","                            xScale = yScale = w/contentWidth;","                            translateY = this._calculateTranslate(preserveAspectRatio.slice(5).toLowerCase(), contentHeight * w/contentWidth, h);","                        }","                        else","                        {","                            xScale = yScale = h/contentHeight;","                            translateX = this._calculateTranslate(preserveAspectRatio.slice(1, 4).toLowerCase(), contentWidth * h/contentHeight, w);","                        }","                    }","                }","                Y_DOM.setStyle(node, \"transformOrigin\", \"0% 0%\");","                translateX = translateX - (box.left * xScale);","                translateY = translateY - (box.top * yScale);","                matrix.translate(translateX, translateY);","                matrix.scale(xScale, yScale);","                Y_DOM.setStyle(node, \"transform\", matrix.toCSSText());","            }","            else","            {","                this.set(\"width\", box.right);","                this.set(\"height\", box.bottom);","            }","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","    },","","    /**","     * Determines the value for either an x or y value to be used for the <code>translate</code> of the Graphic.","     *","     * @method _calculateTranslate","     * @param {String} position The position for placement. Possible values are min, mid and max.","     * @param {Number} contentSize The total size of the content.","     * @param {Number} boundsSize The total size of the Graphic.","     * @return Number","     * @private","     */","    _calculateTranslate: function(position, contentSize, boundsSize)","    {","        var ratio = boundsSize - contentSize,","            coord;","        switch(position)","        {","            case \"mid\" :","                coord = ratio * 0.5;","            break;","            case \"max\" :","                coord = ratio;","            break;","            default :","                coord = 0;","            break;","        }","        return coord;","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds. Used internally","     * by `Shape` instances.","     *","     * @method addToRedrawQueue","     * @param Shape shape The shape instance to add to the queue","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object}","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {};","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;","                box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;","                box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;","                box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;","            }","        }","        box.left = Y_LANG.isNumber(box.left) ? box.left : 0;","        box.top = Y_LANG.isNumber(box.top) ? box.top : 0;","        box.right = Y_LANG.isNumber(box.right) ? box.right : 0;","        box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;","        this._contentBounds = box;","        return box;","    },","","    /**","     * Inserts shape on the top of the tree.","     *","     * @method _toFront","     * @param {CanvasShape} Shape to add.","     * @private","     */","    _toFront: function(shape)","    {","        var contentNode = this.get(\"node\");","        if(shape instanceof Y.CanvasShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            contentNode.appendChild(shape);","        }","    },","","    /**","     * Inserts shape as the first child of the content node.","     *","     * @method _toBack","     * @param {CanvasShape} Shape to add.","     * @private","     */","    _toBack: function(shape)","    {","        var contentNode = this.get(\"node\"),","            targetNode;","        if(shape instanceof Y.CanvasShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            targetNode = contentNode.firstChild;","            if(targetNode)","            {","                contentNode.insertBefore(shape, targetNode);","            }","            else","            {","                contentNode.appendChild(shape);","            }","        }","    }","});","","Y.CanvasGraphic = CanvasGraphic;","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].lines = {"1":0,"3":0,"37":0,"41":0,"89":0,"90":0,"91":0,"94":0,"95":0,"101":0,"112":0,"124":0,"126":0,"128":0,"129":0,"131":0,"133":0,"134":0,"149":0,"150":0,"151":0,"152":0,"163":0,"165":0,"176":0,"179":0,"180":0,"181":0,"196":0,"209":0,"210":0,"223":0,"224":0,"237":0,"245":0,"247":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"264":0,"266":0,"267":0,"268":0,"269":0,"270":0,"271":0,"272":0,"275":0,"276":0,"289":0,"290":0,"303":0,"304":0,"316":0,"321":0,"322":0,"323":0,"324":0,"325":0,"326":0,"342":0,"343":0,"359":0,"360":0,"372":0,"389":0,"390":0,"392":0,"393":0,"394":0,"395":0,"396":0,"397":0,"398":0,"399":0,"400":0,"401":0,"402":0,"403":0,"404":0,"405":0,"406":0,"407":0,"408":0,"409":0,"424":0,"425":0,"439":0,"440":0,"452":0,"467":0,"469":0,"470":0,"471":0,"472":0,"473":0,"474":0,"475":0,"476":0,"477":0,"478":0,"479":0,"480":0,"481":0,"482":0,"483":0,"485":0,"499":0,"503":0,"504":0,"505":0,"506":0,"507":0,"508":0,"509":0,"525":0,"527":0,"528":0,"529":0,"530":0,"531":0,"532":0,"547":0,"559":0,"560":0,"561":0,"562":0,"564":0,"565":0,"566":0,"567":0,"568":0,"569":0,"570":0,"572":0,"573":0,"574":0,"575":0,"589":0,"590":0,"591":0,"592":0,"593":0,"594":0,"595":0,"611":0,"612":0,"613":0,"614":0,"615":0,"616":0,"617":0,"618":0,"619":0,"620":0,"621":0,"639":0,"652":0,"654":0,"656":0,"658":0,"661":0,"663":0,"668":0,"671":0,"675":0,"678":0,"681":0,"684":0,"685":0,"686":0,"688":0,"690":0,"691":0,"692":0,"693":0,"694":0,"695":0,"696":0,"699":0,"701":0,"702":0,"703":0,"713":0,"714":0,"725":0,"726":0,"727":0,"737":0,"738":0,"740":0,"742":0,"754":0,"774":0,"776":0,"778":0,"779":0,"783":0,"784":0,"786":0,"787":0,"791":0,"793":0,"794":0,"798":0,"799":0,"801":0,"802":0,"804":0,"805":0,"807":0,"808":0,"809":0,"810":0,"811":0,"813":0,"814":0,"818":0,"820":0,"821":0,"823":0,"834":0,"855":0,"856":0,"857":0,"858":0,"859":0,"860":0,"861":0,"862":0,"863":0,"865":0,"867":0,"869":0,"871":0,"872":0,"873":0,"874":0,"875":0,"876":0,"882":0,"884":0,"885":0,"889":0,"890":0,"892":0,"894":0,"895":0,"896":0,"897":0,"898":0,"900":0,"901":0,"905":0,"907":0,"908":0,"909":0,"911":0,"914":0,"925":0,"926":0,"927":0,"928":0,"929":0,"930":0,"931":0,"932":0,"933":0,"934":0,"935":0,"936":0,"956":0,"957":0,"970":0,"975":0,"976":0,"979":0,"980":0,"981":0,"982":0,"985":0,"999":0,"1008":0,"1010":0,"1011":0,"1012":0,"1013":0,"1014":0,"1016":0,"1017":0,"1018":0,"1019":0,"1020":0,"1021":0,"1033":0,"1034":0,"1036":0,"1038":0,"1040":0,"1042":0,"1044":0,"1046":0,"1048":0,"1049":0,"1052":0,"1064":0,"1066":0,"1067":0,"1068":0,"1071":0,"1073":0,"1083":0,"1094":0,"1097":0,"1098":0,"1099":0,"1100":0,"1101":0,"1103":0,"1105":0,"1107":0,"1109":0,"1123":0,"1124":0,"1126":0,"1130":0,"1131":0,"1134":0,"1135":0,"1147":0,"1148":0,"1159":0,"1160":0,"1171":0,"1175":0,"1186":0,"1190":0,"1191":0,"1192":0,"1204":0,"1216":0,"1228":0,"1229":0,"1240":0,"1260":0,"1313":0,"1318":0,"1319":0,"1320":0,"1321":0,"1323":0,"1325":0,"1326":0,"1327":0,"1328":0,"1350":0,"1352":0,"1354":0,"1366":0,"1372":0,"1374":0,"1375":0,"1376":0,"1377":0,"1378":0,"1379":0,"1380":0,"1381":0,"1382":0,"1384":0,"1386":0,"1390":0,"1392":0,"1393":0,"1397":0,"1399":0,"1400":0,"1402":0,"1406":0,"1407":0,"1409":0,"1410":0,"1416":0,"1431":0,"1432":0,"1433":0,"1435":0,"1448":0,"1452":0,"1454":0,"1455":0,"1456":0,"1458":0,"1460":0,"1462":0,"1463":0,"1465":0,"1466":0,"1470":0,"1473":0,"1474":0,"1478":0,"1483":0,"1484":0,"1497":0,"1498":0,"1499":0,"1511":0,"1512":0,"1524":0,"1525":0,"1537":0,"1548":0,"1559":0,"1570":0,"1581":0,"1603":0,"1604":0,"1605":0,"1606":0,"1607":0,"1609":0,"1621":0,"1629":0,"1631":0,"1633":0,"1634":0,"1636":0,"1639":0,"1642":0,"1643":0,"1644":0,"1645":0,"1647":0,"1649":0,"1660":0,"1661":0,"1672":0,"1673":0,"1674":0,"1675":0,"1676":0,"1687":0,"1689":0,"1691":0,"1703":0,"1704":0,"1706":0,"1707":0,"1709":0,"1711":0,"1713":0,"1714":0,"1715":0,"1716":0,"1718":0,"1720":0,"1724":0,"1728":0,"1729":0,"1730":0,"1731":0,"1733":0,"1734":0,"1736":0,"1737":0,"1739":0,"1741":0,"1742":0,"1744":0,"1746":0,"1747":0,"1751":0,"1757":0,"1758":0,"1759":0,"1760":0,"1761":0,"1774":0,"1776":0,"1778":0,"1780":0,"1782":0,"1786":0,"1788":0,"1789":0,"1792":0,"1793":0,"1795":0,"1797":0,"1798":0,"1799":0,"1801":0,"1803":0,"1804":0,"1820":0,"1832":0,"1833":0,"1835":0,"1837":0,"1838":0,"1839":0,"1840":0,"1843":0,"1844":0,"1846":0,"1848":0,"1850":0,"1852":0,"1855":0,"1869":0,"1874":0,"1876":0,"1877":0,"1878":0,"1879":0,"1881":0,"1896":0,"1906":0,"1908":0,"1909":0,"1911":0,"1912":0,"1913":0,"1914":0,"1916":0,"1917":0,"1918":0,"1920":0,"1923":0,"1924":0,"1925":0,"1935":0,"1936":0,"1938":0,"1949":0,"1950":0,"1952":0,"1965":0,"1973":0,"1975":0,"1976":0,"1977":0,"1979":0,"1980":0,"1981":0,"1982":0,"1983":0,"1985":0,"1987":0,"1991":0,"1995":0,"2006":0,"2007":0,"2009":0,"2013":0,"2025":0,"2027":0,"2028":0,"2029":0,"2034":0,"2045":0,"2082":0,"2083":0,"2084":0,"2085":0,"2090":0,"2106":0,"2119":0,"2124":0,"2125":0,"2127":0,"2129":0,"2183":0,"2185":0,"2187":0,"2189":0,"2247":0,"2249":0,"2250":0,"2252":0,"2254":0,"2257":0,"2258":0,"2295":0,"2297":0,"2299":0,"2300":0,"2302":0,"2305":0,"2306":0,"2307":0,"2338":0,"2340":0,"2342":0,"2357":0,"2361":0,"2373":0,"2375":0,"2377":0,"2378":0,"2396":0,"2397":0,"2409":0,"2414":0,"2415":0,"2416":0,"2417":0,"2418":0,"2419":0,"2420":0,"2421":0,"2422":0,"2440":0,"2444":0,"2454":0,"2455":0,"2460":0,"2461":0,"2474":0,"2475":0,"2480":0,"2481":0,"2497":0,"2501":0,"2513":0,"2515":0,"2517":0,"2518":0,"2536":0,"2538":0,"2539":0,"2540":0,"2543":0,"2544":0,"2556":0,"2558":0,"2561":0,"2563":0,"2581":0,"2583":0,"2584":0,"2585":0,"2588":0,"2598":0,"2603":0,"2604":0,"2606":0,"2608":0,"2622":0,"2627":0,"2628":0,"2630":0,"2632":0,"2636":0,"2648":0,"2650":0,"2653":0,"2655":0,"2673":0,"2674":0,"2676":0,"2677":0,"2678":0,"2683":0,"2693":0,"2694":0,"2699":0,"2712":0,"2713":0,"2718":0,"2732":0,"2740":0,"2742":0,"2744":0,"2745":0,"2763":0,"2768":0,"2769":0,"2770":0,"2771":0,"2772":0,"2773":0,"2774":0,"2777":0,"2815":0,"2827":0,"2829":0,"2832":0,"2834":0,"2853":0,"2858":0,"2859":0,"2861":0,"2863":0,"2879":0,"2895":0,"2911":0,"2924":0,"2926":0,"2928":0,"2941":0,"2943":0,"2945":0,"3018":0,"3023":0,"3024":0,"3026":0,"3028":0,"3041":0,"3046":0,"3047":0,"3049":0,"3051":0,"3079":0,"3080":0,"3085":0,"3097":0,"3107":0,"3108":0,"3110":0,"3112":0,"3114":0,"3116":0,"3118":0,"3120":0,"3121":0,"3126":0,"3128":0,"3158":0,"3160":0,"3162":0,"3164":0,"3175":0,"3179":0,"3180":0,"3181":0,"3187":0,"3188":0,"3189":0,"3190":0,"3191":0,"3192":0,"3194":0,"3205":0,"3209":0,"3210":0,"3211":0,"3212":0,"3213":0,"3214":0,"3215":0,"3216":0,"3217":0,"3218":0,"3228":0,"3229":0,"3231":0,"3232":0,"3245":0,"3246":0,"3248":0,"3250":0,"3252":0,"3253":0,"3265":0,"3267":0,"3269":0,"3273":0,"3285":0,"3287":0,"3289":0,"3292":0,"3294":0,"3295":0,"3297":0,"3299":0,"3301":0,"3311":0,"3313":0,"3315":0,"3317":0,"3320":0,"3329":0,"3341":0,"3343":0,"3344":0,"3346":0,"3347":0,"3348":0,"3362":0,"3365":0,"3367":0,"3369":0,"3371":0,"3375":0,"3377":0,"3391":0,"3392":0,"3394":0,"3396":0,"3423":0,"3424":0,"3435":0,"3436":0,"3437":0,"3438":0,"3450":0,"3452":0,"3454":0,"3465":0,"3478":0,"3480":0,"3482":0,"3483":0,"3484":0,"3485":0,"3486":0,"3487":0,"3489":0,"3490":0,"3494":0,"3496":0,"3498":0,"3499":0,"3503":0,"3504":0,"3508":0,"3509":0,"3510":0,"3511":0,"3512":0,"3513":0,"3517":0,"3518":0,"3521":0,"3523":0,"3524":0,"3540":0,"3542":0,"3545":0,"3546":0,"3548":0,"3549":0,"3551":0,"3552":0,"3554":0,"3567":0,"3569":0,"3570":0,"3572":0,"3573":0,"3574":0,"3575":0,"3576":0,"3577":0,"3578":0,"3580":0,"3582":0,"3595":0,"3600":0,"3602":0,"3604":0,"3605":0,"3606":0,"3607":0,"3608":0,"3609":0,"3612":0,"3613":0,"3614":0,"3615":0,"3616":0,"3617":0,"3629":0,"3630":0,"3632":0,"3634":0,"3636":0,"3649":0,"3651":0,"3653":0,"3655":0,"3657":0,"3658":0,"3660":0,"3664":0,"3670":0};
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].functions = {"CanvasDrawing:37":0,"_toRGBA:88":0,"_toRGB:111":0,"setSize:123":0,"_updateCoords:147":0,"_clearAndUpdateCoords:161":0,"_updateNodePosition:174":0,"_updateDrawingQueue:194":0,"lineTo:207":0,"relativeLineTo:221":0,"_lineTo:235":0,"moveTo:287":0,"relativeMoveTo:301":0,"_moveTo:315":0,"curveTo:341":0,"relativeCurveTo:358":0,"_curveTo:371":0,"quadraticCurveTo:423":0,"relativeQuadraticCurveTo:438":0,"_quadraticCurveTo:451":0,"drawCircle:498":0,"drawDiamond:523":0,"drawEllipse:546":0,"drawRect:588":0,"drawRoundRect:610":0,"drawWedge:637":0,"end:712":0,"closePath:723":0,"clear:736":0,"_getLinearGradient:753":0,"_getRadialGradient:833":0,"_initProps:924":0,"_createGraphic:955":0,"getBezierData:969":0,"_setCurveBoundingBox:997":0,"_trackSize:1032":0,"CanvasShape:1064":0,"init:1081":0,"initializer:1092":0,"_setGraphic:1121":0,"addClass:1145":0,"removeClass:1157":0,"getXY:1169":0,"setXY:1184":0,"contains:1202":0,"test:1214":0,"compareTo:1227":0,"_getDefaultFill:1239":0,"_getDefaultStroke:1258":0,"createNode:1311":0,"on:1348":0,"_setStrokeProps:1364":0,"set:1429":0,"_setFillProps:1446":0,"translate:1495":0,"translateX:1509":0,"translateY:1522":0,"skew:1535":0,"skewX:1546":0,"skewY:1557":0,"rotate:1568":0,"scale:1579":0,"_addTransform:1601":0,"_updateTransform:1619":0,"_updateHandler:1658":0,"_draw:1670":0,"_closePath:1685":0,"_strokeAndFill:1772":0,"_drawDashedLine:1818":0,"getBounds:1867":0,"_getContentRect:1894":0,"toFront:1933":0,"toBack:1947":0,"_parsePathData:1963":0,"destroy:2004":0,"_destroy:2023":0,"valueFn:2043":0,"setter:2080":0,"getter:2088":0,"getter:2104":0,"valueFn:2117":0,"setter:2122":0,"setter:2182":0,"setter:2245":0,"setter:2293":0,"setter:2336":0,"getter:2355":0,"CanvasPath:2373":0,"_draw:2394":0,"createNode:2407":0,"end:2438":0,"getter:2452":0,"setter:2458":0,"getter:2472":0,"setter:2478":0,"getter:2495":0,"CanvasRect:2513":0,"_draw:2534":0,"CanvasEllipse:2556":0,"_draw:2579":0,"setter:2596":0,"getter:2601":0,"setter:2620":0,"getter:2625":0,"CanvasCircle:2648":0,"_draw:2671":0,"setter:2691":0,"getter:2697":0,"setter:2710":0,"getter:2716":0,"CanvasPieSlice:2740":0,"_draw:2761":0,"CanvasGraphic:2827":0,"valueFn:2851":0,"setter:2856":0,"getter:2877":0,"getter:2893":0,"getter:2909":0,"setter:2922":0,"setter:2939":0,"getter:3016":0,"setter:3021":0,"getter:3039":0,"setter:3044":0,"setter:3077":0,"set:3095":0,"getXY:3156":0,"initializer:3174":0,"render:3204":0,"destroy:3226":0,"addShape:3243":0,"_appendShape:3263":0,"removeShape:3283":0,"removeAllShapes:3309":0,"clear:3328":0,"_removeChildren:3339":0,"_toggleVisible:3360":0,"_getShapeClass:3389":0,"getShapeById:3421":0,"batch:3433":0,"_getDocFrag:3448":0,"_redraw:3463":0,"_calculateTranslate:3538":0,"addToRedrawQueue:3565":0,"_getUpdatedContentBounds:3593":0,"_toFront:3627":0,"_toBack:3647":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].coveredLines = 896;
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].coveredFunctions = 148;
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1);
YUI.add('graphics-canvas', function (Y, NAME) {

_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "(anonymous 1)", 1);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3);
var IMPLEMENTATION = "canvas",
    SHAPE = "shape",
	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,
    SPLITARGSPATTERN = /[\-]?[0-9]*[0-9|\.][0-9]*/g,
    DOCUMENT = Y.config.doc,
    Y_LANG = Y.Lang,
    AttributeLite = Y.AttributeLite,
	CanvasShape,
	CanvasPath,
	CanvasRect,
    CanvasEllipse,
	CanvasCircle,
    CanvasPieSlice,
    Y_DOM = Y.DOM,
    Y_Color = Y.Color,
    PARSE_INT = parseInt,
    PARSE_FLOAT = parseFloat,
    IS_NUMBER = Y_LANG.isNumber,
    RE = RegExp,
    TORGB = Y_Color.toRGB,
    TOHEX = Y_Color.toHex,
    _getClassName = Y.ClassNameManager.getClassName;

/**
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> implementation of the <a href="Drawing.html">`Drawing`</a> class.
 * `CanvasDrawing` is not intended to be used directly. Instead, use the <a href="Drawing.html">`Drawing`</a> class.
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities but has
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> capabilities, the <a href="Drawing.html">`Drawing`</a>
 * class will point to the `CanvasDrawing` class.
 *
 * @module graphics
 * @class CanvasDrawing
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 37);
function CanvasDrawing()
{
}

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 41);
CanvasDrawing.prototype = {
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
     * Parses hex color string and alpha value to rgba
     *
     * @method _toRGBA
     * @param {Object} val Color value to parse. Can be hex string, rgb or name.
     * @param {Number} alpha Numeric value between 0 and 1 representing the alpha level.
     * @private
     */
    _toRGBA: function(val, alpha) {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toRGBA", 88);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 89);
alpha = (alpha !== undefined) ? alpha : 1;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 90);
if (!Y_Color.re_RGB.test(val)) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 91);
val = TOHEX(val);
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 94);
if(Y_Color.re_hex.exec(val)) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 95);
val = 'rgba(' + [
                PARSE_INT(RE.$1, 16),
                PARSE_INT(RE.$2, 16),
                PARSE_INT(RE.$3, 16)
            ].join(',') + ',' + alpha + ')';
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 101);
return val;
    },

    /**
     * Converts color to rgb format
     *
     * @method _toRGB
     * @param val Color value to convert.
     * @private
     */
    _toRGB: function(val) {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toRGB", 111);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 112);
return TORGB(val);
    },

    /**
     * Sets the size of the graphics object.
     *
     * @method setSize
     * @param w {Number} width to set for the instance.
     * @param h {Number} height to set for the instance.
     * @private
     */
	setSize: function(w, h) {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setSize", 123);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 124);
if(this.get("autoSize"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 126);
if(w > this.node.getAttribute("width"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 128);
this.node.style.width = w + "px";
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 129);
this.node.setAttribute("width", w);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 131);
if(h > this.node.getAttribute("height"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 133);
this.node.style.height = h + "px";
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 134);
this.node.setAttribute("height", h);
            }
        }
    },

	/**
     * Tracks coordinates. Used to calculate the start point of dashed lines.
     *
     * @method _updateCoords
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
	 * @private
	 */
    _updateCoords: function(x, y)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateCoords", 147);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 149);
this._xcoords.push(x);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 150);
this._ycoords.push(y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 151);
this._currentX = x;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 152);
this._currentY = y;
    },

	/**
     * Clears the coordinate arrays. Called at the end of a drawing operation.
	 *
     * @method _clearAndUpdateCoords
     * @private
	 */
    _clearAndUpdateCoords: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_clearAndUpdateCoords", 161);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 163);
var x = this._xcoords.pop() || 0,
            y = this._ycoords.pop() || 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 165);
this._updateCoords(x, y);
    },

	/**
     * Moves the shape's dom node.
     *
     * @method _updateNodePosition
	 * @private
	 */
    _updateNodePosition: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateNodePosition", 174);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 176);
var node = this.get("node"),
            x = this.get("x"),
            y = this.get("y");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 179);
node.style.position = "absolute";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 180);
node.style.left = (x + this._left) + "px";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 181);
node.style.top = (y + this._top) + "px";
    },

    /**
     * Queues up a method to be executed when a shape redraws.
     *
     * @method _updateDrawingQueue
     * @param {Array} val An array containing data that can be parsed into a method and arguments. The value at zero-index
     * of the array is a string reference of the drawing method that will be called. All subsequent indices are argument for
     * that method. For example, `lineTo(10, 100)` would be structured as:
     * `["lineTo", 10, 100]`.
     * @private
     */
    _updateDrawingQueue: function(val)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateDrawingQueue", 194);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 196);
this._methods.push(val);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "lineTo", 207);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 209);
this._lineTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 210);
return this;
    },

    /**
     * Draws a line segment from the current drawing position to the relative x and y coordinates.
     *
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     * @chainable
     */
    relativeLineTo: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeLineTo", 221);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 223);
this._lineTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 224);
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
    _lineTo: function(args, relative)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_lineTo", 235);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 237);
var point1 = args[0],
            i,
            len,
            x,
            y,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 245);
if(!this._lineToMethods)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 247);
this._lineToMethods = [];
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 249);
len = args.length - 1;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 250);
if (typeof point1 === 'string' || typeof point1 === 'number') {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 251);
for (i = 0; i < len; i = i + 2) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 252);
x = parseFloat(args[i]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 253);
y = parseFloat(args[i + 1]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 254);
x = x + relativeX;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 255);
y = y + relativeY;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 256);
this._updateDrawingQueue(["lineTo", x, y]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 257);
this._trackSize(x - wt, y - wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 258);
this._trackSize(x + wt, y + wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 259);
this._updateCoords(x, y);
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 264);
for (i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 266);
x = parseFloat(args[i][0]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 267);
y = parseFloat(args[i][1]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 268);
this._updateDrawingQueue(["lineTo", x, y]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 269);
this._lineToMethods[this._lineToMethods.length] = this._methods[this._methods.length - 1];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 270);
this._trackSize(x - wt, y - wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 271);
this._trackSize(x + wt, y + wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 272);
this._updateCoords(x, y);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 275);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 276);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "moveTo", 287);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 289);
this._moveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 290);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeMoveTo", 301);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 303);
this._moveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 304);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_moveTo", 315);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 316);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0,
            x = parseFloat(args[0]) + relativeX,
            y = parseFloat(args[1]) + relativeY;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 321);
this._updateDrawingQueue(["moveTo", x, y]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 322);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 323);
this._trackSize(x + wt, y + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 324);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 325);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 326);
return this;
    },

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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "curveTo", 341);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 342);
this._curveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 343);
return this;
    },

    /**
     * Draws a bezier curve relative to the current coordinates.
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
    relativeCurveTo: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeCurveTo", 358);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 359);
this._curveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 360);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_curveTo", 371);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 372);
var w,
            h,
            cp1x,
            cp1y,
            cp2x,
            cp2y,
            x,
            y,
            pts,
            right,
            left,
            bottom,
            top,
            i,
            len,
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 389);
len = args.length - 5;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 390);
for(i = 0; i < len; i = i + 6)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 392);
cp1x = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 393);
cp1y = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 394);
cp2x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 395);
cp2y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 396);
x = parseFloat(args[i + 4]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 397);
y = parseFloat(args[i + 5]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 398);
this._updateDrawingQueue(["bezierCurveTo", cp1x, cp1y, cp2x, cp2y, x, y]);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 399);
this._drawingComplete = false;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 400);
right = Math.max(x, Math.max(cp1x, cp2x));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 401);
bottom = Math.max(y, Math.max(cp1y, cp2y));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 402);
left = Math.min(x, Math.min(cp1x, cp2x));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 403);
top = Math.min(y, Math.min(cp1y, cp2y));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 404);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 405);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 406);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 407);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 408);
this._currentX = x;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 409);
this._currentY = y;
        }
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "quadraticCurveTo", 423);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 424);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 425);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeQuadraticCurveTo", 438);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 439);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 440);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_quadraticCurveTo", 451);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 452);
var cpx,
            cpy,
            x,
            y,
            w,
            h,
            pts,
            right,
            left,
            bottom,
            top,
            i,
            len = args.length - 3,
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 467);
for(i = 0; i < len; i = i + 4)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 469);
cpx = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 470);
cpy = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 471);
x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 472);
y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 473);
this._drawingComplete = false;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 474);
right = Math.max(x, cpx);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 475);
bottom = Math.max(y, cpy);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 476);
left = Math.min(x, cpx);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 477);
top = Math.min(y, cpy);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 478);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 479);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 480);
pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 481);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 482);
this._updateDrawingQueue(["quadraticCurveTo", cpx, cpy, x, y]);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 483);
this._updateCoords(x, y);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 485);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawCircle", 498);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 499);
var startAngle = 0,
            endAngle = 2 * Math.PI,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            circum = radius * 2;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 503);
circum += wt;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 504);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 505);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 506);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 507);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 508);
this._updateDrawingQueue(["arc", x + radius, y + radius, radius, startAngle, endAngle, false]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 509);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawDiamond", 523);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 525);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 527);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 528);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 529);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 530);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 531);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 532);
return this;
    },

    /**
     * Draws an ellipse. Used internally by `CanvasEllipse` class.
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawEllipse", 546);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 547);
var l = 8,
            theta = -(45/180) * Math.PI,
            angle = 0,
            angleMid,
            radius = w/2,
            yRadius = h/2,
            i,
            centerX = x + radius,
            centerY = y + yRadius,
            ax, ay, bx, by, cx, cy,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 559);
ax = centerX + Math.cos(0) * radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 560);
ay = centerY + Math.sin(0) * yRadius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 561);
this.moveTo(ax, ay);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 562);
for(i = 0; i < l; i++)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 564);
angle += theta;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 565);
angleMid = angle - (theta / 2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 566);
bx = centerX + Math.cos(angle) * radius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 567);
by = centerY + Math.sin(angle) * yRadius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 568);
cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 569);
cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 570);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 572);
this._trackSize(x + w + wt, y + h + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 573);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 574);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 575);
return this;
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawRect", 588);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 589);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 590);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 591);
this.lineTo(x + w, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 592);
this.lineTo(x + w, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 593);
this.lineTo(x, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 594);
this.lineTo(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 595);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawRoundRect", 610);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 611);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 612);
this.moveTo( x, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 613);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 614);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 615);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 616);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 617);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 618);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 619);
this.lineTo(x + ew, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 620);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 621);
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
    drawWedge: function(x, y, startAngle, arc, radius, yRadius)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawWedge", 637);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 639);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            segs,
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
            i = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 652);
yRadius = yRadius || radius;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 654);
this._drawingComplete = false;
        // move to x,y position
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 656);
this._updateDrawingQueue(["moveTo", x, y]);

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 658);
yRadius = yRadius || radius;

        // limit sweep to reasonable numbers
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 661);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 663);
arc = 360;
        }

        // First we calculate how many segments are needed
        // for a smooth arc.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 668);
segs = Math.ceil(Math.abs(arc) / 45);

        // Now calculate the sweep of each segment.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 671);
segAngle = arc / segs;

        // The math requires radians rather than degrees. To convert from degrees
        // use the formula (degrees/180)*Math.PI to get radians.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 675);
theta = -(segAngle / 180) * Math.PI;

        // convert angle startAngle to radians
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 678);
angle = (startAngle / 180) * Math.PI;

        // draw the curve in segments no larger than 45 degrees.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 681);
if(segs > 0)
        {
            // draw a line from the center to the start of the curve
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 684);
ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 685);
ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 686);
this.lineTo(ax, ay);
            // Loop for drawing curve segments
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 688);
for(i = 0; i < segs; ++i)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 690);
angle += theta;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 691);
angleMid = angle - (theta / 2);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 692);
bx = x + Math.cos(angle) * radius;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 693);
by = y + Math.sin(angle) * yRadius;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 694);
cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 695);
cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 696);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
            }
            // close the wedge by drawing a line to the center
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 699);
this._updateDrawingQueue(["lineTo", x, y]);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 701);
this._trackSize(-wt , -wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 702);
this._trackSize((radius * 2) + wt, (radius * 2) + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 703);
return this;
    },

    /**
     * Completes a drawing operation.
     *
     * @method end
     * @chainable
     */
    end: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "end", 712);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 713);
this._closePath();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 714);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "closePath", 723);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 725);
this._updateDrawingQueue(["closePath"]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 726);
this._updateDrawingQueue(["beginPath"]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 727);
return this;
    },

	/**
	 * Clears the graphics object.
	 *
	 * @method clear
     * @chainable
	 */
    clear: function() {
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "clear", 736);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 737);
this._initProps();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 738);
if(this.node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 740);
this._context.clearRect(0, 0, this.node.width, this.node.height);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 742);
return this;
	},


    /**
     * Returns a linear gradient fill
     *
     * @method _getLinearGradient
     * @return CanvasGradient
     * @private
     */
    _getLinearGradient: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getLinearGradient", 753);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 754);
var isNumber = Y.Lang.isNumber,
            fill = this.get("fill"),
            stops = fill.stops,
            opacity,
            color,
            stop,
            i,
            len = stops.length,
            gradient,
            x = 0,
            y = 0,
            w = this.get("width"),
            h = this.get("height"),
            r = fill.rotation || 0,
            x1, x2, y1, y2,
            cx = x + w/2,
            cy = y + h/2,
            offset,
            radCon = Math.PI/180,
            tanRadians = parseFloat(parseFloat(Math.tan(r * radCon)).toFixed(8));
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 774);
if(Math.abs(tanRadians) * w/2 >= h/2)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 776);
if(r < 180)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 778);
y1 = y;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 779);
y2 = y + h;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 783);
y1 = y + h;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 784);
y2 = y;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 786);
x1 = cx - ((cy - y1)/tanRadians);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 787);
x2 = cx - ((cy - y2)/tanRadians);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 791);
if(r > 90 && r < 270)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 793);
x1 = x + w;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 794);
x2 = x;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 798);
x1 = x;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 799);
x2 = x + w;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 801);
y1 = ((tanRadians * (cx - x1)) - cy) * -1;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 802);
y2 = ((tanRadians * (cx - x2)) - cy) * -1;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 804);
gradient = this._context.createLinearGradient(x1, y1, x2, y2);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 805);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 807);
stop = stops[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 808);
opacity = stop.opacity;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 809);
color = stop.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 810);
offset = stop.offset;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 811);
if(isNumber(opacity))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 813);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 814);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 818);
color = TORGB(color);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 820);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 821);
gradient.addColorStop(offset, color);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 823);
return gradient;
    },

    /**
     * Returns a radial gradient fill
     *
     * @method _getRadialGradient
     * @return CanvasGradient
     * @private
     */
    _getRadialGradient: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getRadialGradient", 833);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 834);
var isNumber = Y.Lang.isNumber,
            fill = this.get("fill"),
            r = fill.r,
            fx = fill.fx,
            fy = fill.fy,
            stops = fill.stops,
            opacity,
            color,
            stop,
            i,
            len = stops.length,
            gradient,
            x = 0,
            y = 0,
            w = this.get("width"),
            h = this.get("height"),
            x1, x2, y1, y2, r2,
            xc, yc, xn, yn, d,
            offset,
            ratio,
            stopMultiplier;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 855);
xc = x + w/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 856);
yc = y + h/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 857);
x1 = w * fx;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 858);
y1 = h * fy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 859);
x2 = x + w/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 860);
y2 = y + h/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 861);
r2 = w * r;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 862);
d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 863);
if(d >= r2)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 865);
ratio = d/r2;
            //hack. gradient won't show if it is exactly on the edge of the arc
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 867);
if(ratio === 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 869);
ratio = 1.01;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 871);
xn = (x1 - xc)/ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 872);
yn = (y1 - yc)/ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 873);
xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 874);
yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 875);
x1 = xc + xn;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 876);
y1 = yc + yn;
        }

        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.
        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work.
        //Instead, adjust the color stops to reflect the smaller radius.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 882);
if(r >= 0.5)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 884);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 885);
stopMultiplier = 1;
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 889);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 890);
stopMultiplier = r * 2;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 892);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 894);
stop = stops[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 895);
opacity = stop.opacity;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 896);
color = stop.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 897);
offset = stop.offset;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 898);
if(isNumber(opacity))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 900);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 901);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 905);
color = TORGB(color);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 907);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 908);
offset *= stopMultiplier;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 909);
if(offset <= 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 911);
gradient.addColorStop(offset, color);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 914);
return gradient;
    },


    /**
     * Clears all values
     *
     * @method _initProps
     * @private
     */
    _initProps: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_initProps", 924);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 925);
this._methods = [];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 926);
this._lineToMethods = [];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 927);
this._xcoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 928);
this._ycoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 929);
this._width = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 930);
this._height = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 931);
this._left = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 932);
this._top = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 933);
this._right = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 934);
this._bottom = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 935);
this._currentX = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 936);
this._currentY = 0;
    },

    /**
     * Indicates a drawing has completed.
     *
     * @property _drawingComplete
     * @type Boolean
     * @private
     */
    _drawingComplete: false,

    /**
     * Creates canvas element
     *
     * @method _createGraphic
     * @return HTMLCanvasElement
     * @private
     */
    _createGraphic: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_createGraphic", 955);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 956);
var graphic = Y.config.doc.createElement('canvas');
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 957);
return graphic;
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getBezierData", 969);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 970);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 975);
for (i = 0; i < n; ++i){
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 976);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 979);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 980);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 981);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 982);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 985);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setCurveBoundingBox", 997);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 999);
var i = 0,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            xy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1008);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1010);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1011);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1012);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1013);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1014);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1016);
left = Math.round(left * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1017);
right = Math.round(right * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1018);
top = Math.round(top * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1019);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1020);
this._trackSize(right + wt, bottom + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1021);
this._trackSize(left - wt, top - wt);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_trackSize", 1032);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1033);
if (w > this._right) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1034);
this._right = w;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1036);
if(w < this._left)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1038);
this._left = w;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1040);
if (h < this._top)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1042);
this._top = h;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1044);
if (h > this._bottom)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1046);
this._bottom = h;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1048);
this._width = this._right - this._left;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1049);
this._height = this._bottom - this._top;
    }
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1052);
Y.CanvasDrawing = CanvasDrawing;
/**
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> implementation of the <a href="Shape.html">`Shape`</a> class.
 * `CanvasShape` is not intended to be used directly. Instead, use the <a href="Shape.html">`Shape`</a> class.
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities but has
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> capabilities, the <a href="Shape.html">`Shape`</a>
 * class will point to the `CanvasShape` class.
 *
 * @module graphics
 * @class CanvasShape
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1064);
CanvasShape = function()
{
    _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasShape", 1064);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1066);
this._transforms = [];
    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1067);
this.matrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1068);
CanvasShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1071);
CanvasShape.NAME = "shape";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1073);
Y.extend(CanvasShape, Y.GraphicBase, Y.mix({
    /**
     * Init method, invoked during construction.
     * Calls `initializer` method.
     *
     * @method init
     * @protected
     */
    init: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "init", 1081);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1083);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "initializer", 1092);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1094);
var host = this,
            graphic = cfg.graphic,
            data = this.get("data");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1097);
host._initProps();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1098);
host.createNode();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1099);
host._xcoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1100);
host._ycoords = [0];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1101);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1103);
this._setGraphic(graphic);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1105);
if(data)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1107);
host._parsePathData(data);
        }
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1109);
host._updateHandler();
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setGraphic", 1121);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1123);
var graphic;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1124);
if(render instanceof Y.CanvasGraphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1126);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1130);
render = Y.one(render);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1131);
graphic = new Y.CanvasGraphic({
                render: render
            });
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1134);
graphic._appendShape(this);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1135);
this._graphic = graphic;
        }
    },

	/**
	 * Add a class name to each node.
	 *
	 * @method addClass
	 * @param {String} className the class name to add to the node's class attribute
	 */
	addClass: function(className)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addClass", 1145);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1147);
var node = Y.one(this.get("node"));
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1148);
node.addClass(className);
	},

	/**
	 * Removes a class name from each node.
	 *
	 * @method removeClass
	 * @param {String} className the class name to remove from the node's class attribute
	 */
	removeClass: function(className)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeClass", 1157);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1159);
var node = Y.one(this.get("node"));
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1160);
node.removeClass(className);
	},

	/**
	 * Gets the current position of the node in page coordinates.
	 *
	 * @method getXY
	 * @return Array The XY position of the shape.
	 */
	getXY: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getXY", 1169);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1171);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1175);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setXY", 1184);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1186);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = xy[0] - parentXY[0],
			y = xy[1] - parentXY[1];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1190);
this._set("x", x);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1191);
this._set("y", y);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1192);
this._updateNodePosition(x, y);
	},

	/**
	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.
	 *
	 * @method contains
	 * @param {CanvasShape | HTMLElement} needle The possible node or descendent
	 * @return Boolean Whether or not this shape is the needle or its ancestor.
	 */
	contains: function(needle)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "contains", 1202);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1204);
return needle === Y.one(this.node);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "test", 1214);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1216);
return Y.one(this.get("node")).test(selector);
		//return Y.Selector.test(this.node, selector);
	},

	/**
	 * Compares nodes to determine if they match.
	 * Node instances can be compared to each other and/or HTMLElements.
	 * @method compareTo
	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.
	 * @return {Boolean} True if the nodes match, false if they do not.
	 */
	compareTo: function(refNode) {
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "compareTo", 1227);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1228);
var node = this.node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1229);
return node === refNode;
	},

	/**
	 * Value function for fill attribute
	 *
	 * @method _getDefaultFill
	 * @return Object
	 * @private
	 */
	_getDefaultFill: function() {
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDefaultFill", 1239);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1240);
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
	 * @method _getDefaultStroke
	 * @return Object
	 * @private
	 */
	_getDefaultStroke: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDefaultStroke", 1258);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1260);
return {
			weight: 1,
			dashstyle: "none",
			color: "#000",
			opacity: 1.0
		};
	},

	/**
	 * Left edge of the path
	 *
     * @property _left
     * @type Number
	 * @private
	 */
	_left: 0,

	/**
	 * Right edge of the path
	 *
     * @property _right
     * @type Number
	 * @private
	 */
	_right: 0,

	/**
	 * Top edge of the path
	 *
     * @property _top
     * @type Number
	 * @private
	 */
	_top: 0,

	/**
	 * Bottom edge of the path
	 *
     * @property _bottom
     * @type Number
	 * @private
	 */
	_bottom: 0,

	/**
	 * Creates the dom node for the shape.
	 *
     * @method createNode
	 * @return HTMLElement
	 * @private
	 */
	createNode: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "createNode", 1311);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1313);
var host = this,
            node = Y.config.doc.createElement('canvas'),
			id = host.get("id"),
            concat = host._camelCaseConcat,
            name = host.name;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1318);
host._context = node.getContext('2d');
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1319);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1320);
node.style.overflow = "visible";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1321);
if(!host.get("visible"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1323);
node.style.visibility = "hidden";
        }
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1325);
node.setAttribute("id", id);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1326);
id = "#" + id;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1327);
host.node = node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1328);
host.addClass(
            _getClassName(SHAPE) +
            " " +
            _getClassName(concat(IMPLEMENTATION, SHAPE)) +
            " " +
            _getClassName(name) +
            " " +
            _getClassName(concat(IMPLEMENTATION, name))
        );
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "on", 1348);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1350);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1352);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1354);
return Y.on.apply(this, arguments);
	},

	/**
	 * Adds a stroke to the shape node.
	 *
	 * @method _strokeChangeHandler
     * @param {Object} stroke Properties of the `stroke` attribute.
	 * @private
	 */
	_setStrokeProps: function(stroke)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setStrokeProps", 1364);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1366);
var color,
			weight,
			opacity,
			linejoin,
			linecap,
			dashstyle;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1372);
if(stroke)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1374);
color = stroke.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1375);
weight = PARSE_FLOAT(stroke.weight);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1376);
opacity = PARSE_FLOAT(stroke.opacity);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1377);
linejoin = stroke.linejoin || "round";
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1378);
linecap = stroke.linecap || "butt";
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1379);
dashstyle = stroke.dashstyle;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1380);
this._miterlimit = null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1381);
this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1382);
this._strokeWeight = weight;

            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1384);
if (IS_NUMBER(weight) && weight > 0)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1386);
this._stroke = 1;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1390);
this._stroke = 0;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1392);
if (IS_NUMBER(opacity)) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1393);
this._strokeStyle = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1397);
this._strokeStyle = color;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1399);
this._linecap = linecap;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1400);
if(linejoin === "round" || linejoin === "bevel")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1402);
this._linejoin = linejoin;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1406);
linejoin = parseInt(linejoin, 10);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1407);
if(IS_NUMBER(linejoin))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1409);
this._miterlimit =  Math.max(linejoin, 1);
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1410);
this._linejoin = "miter";
                }
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1416);
this._stroke = 0;
        }
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "set", 1429);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1431);
var host = this;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1432);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1433);
if(host.initialized)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1435);
host._updateHandler();
		}
	},

	/**
	 * Adds a fill to the shape node.
	 *
	 * @method _setFillProps
     * @param {Object} fill Properties of the `fill` attribute.
	 * @private
	 */
	_setFillProps: function(fill)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setFillProps", 1446);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1448);
var isNumber = IS_NUMBER,
			color,
			opacity,
			type;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1452);
if(fill)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1454);
color = fill.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1455);
type = fill.type;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1456);
if(type === "linear" || type === "radial")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1458);
this._fillType = type;
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1460);
if(color)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1462);
opacity = fill.opacity;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1463);
if (isNumber(opacity))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1465);
opacity = Math.max(0, Math.min(1, opacity));
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1466);
color = this._toRGBA(color, opacity);
                }
                else
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1470);
color = TORGB(color);
                }

                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1473);
this._fillColor = color;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1474);
this._fillType = 'solid';
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1478);
this._fillColor = null;
            }}
        }
		else
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1483);
this._fillType = null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1484);
this._fillColor = null;
		}
	},

	/**
	 * Specifies a 2d translation.
	 *
	 * @method translate
	 * @param {Number} x The value to transate on the x-axis.
	 * @param {Number} y The value to translate on the y-axis.
	 */
	translate: function(x, y)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translate", 1495);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1497);
this._translateX += x;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1498);
this._translateY += y;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1499);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translateX", 1509);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1511);
this._translateX += x;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1512);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translateY", 1522);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1524);
this._translateY += y;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1525);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skew", 1535);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1537);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skewX", 1546);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1548);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skewY", 1557);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1559);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "rotate", 1568);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1570);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "scale", 1579);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1581);
this._addTransform("scale", arguments);
    },

    /**
     * Storage for the transform attribute.
     *
     * @property _transform
     * @type String
     * @private
     */
    _transform: "",

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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_addTransform", 1601);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1603);
args = Y.Array(args);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1604);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1605);
args.unshift(type);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1606);
this._transforms.push(args);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1607);
if(this.initialized)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1609);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateTransform", 1619);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1621);
var node = this.node,
			key,
			transform,
			transformOrigin = this.get("transformOrigin"),
            matrix = this.matrix,
            i,
            len = this._transforms.length;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1629);
if(this._transforms && this._transforms.length > 0)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1631);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1633);
key = this._transforms[i].shift();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1634);
if(key)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1636);
matrix[key].apply(matrix, this._transforms[i]);
                }
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1639);
transform = matrix.toCSSText();
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1642);
this._graphic.addToRedrawQueue(this);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1643);
transformOrigin = (100 * transformOrigin[0]) + "% " + (100 * transformOrigin[1]) + "%";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1644);
Y_DOM.setStyle(node, "transformOrigin", transformOrigin);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1645);
if(transform)
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1647);
Y_DOM.setStyle(node, "transform", transform);
		}
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1649);
this._transforms = [];
	},

	/**
     * Updates `Shape` based on attribute changes.
     *
     * @method _updateHandler
	 * @private
	 */
	_updateHandler: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateHandler", 1658);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1660);
this._draw();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1661);
this._updateTransform();
	},

	/**
	 * Updates the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 1670);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1672);
var node = this.node;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1673);
this.clear();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1674);
this._closePath();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1675);
node.style.left = this.get("x") + "px";
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1676);
node.style.top = this.get("y") + "px";
	},

	/**
	 * Completes a shape or drawing
	 *
	 * @method _closePath
	 * @private
	 */
	_closePath: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_closePath", 1685);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1687);
if(!this._methods)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1689);
return;
		}
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1691);
var node = this.get("node"),
			w = this._right - this._left,
			h = this._bottom - this._top,
			context = this._context,
			methods = [],
			cachedMethods = this._methods.concat(),
			i,
			j,
			method,
			args,
            argsLen,
			len = 0;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1703);
this._context.clearRect(0, 0, node.width, node.height);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1704);
if(this._methods)
        {
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1706);
len = cachedMethods.length;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1707);
if(!len || len < 1)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1709);
return;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1711);
for(i = 0; i < len; ++i)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1713);
methods[i] = cachedMethods[i].concat();
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1714);
args = methods[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1715);
argsLen = (args[0] === "quadraticCurveTo" || args[0] === "bezierCurveTo") ? args.length : 3;
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1716);
for(j = 1; j < argsLen; ++j)
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1718);
if(j % 2 === 0)
					{
						_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1720);
args[j] = args[j] - this._top;
					}
					else
					{
						_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1724);
args[j] = args[j] - this._left;
					}
				}
			}
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1728);
node.setAttribute("width", Math.min(w, 2000));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1729);
node.setAttribute("height", Math.min(2000, h));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1730);
context.beginPath();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1731);
for(i = 0; i < len; ++i)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1733);
args = methods[i].concat();
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1734);
if(args && args.length > 0)
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1736);
method = args.shift();
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1737);
if(method)
					{
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1739);
if(method === "closePath")
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1741);
context.closePath();
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1742);
this._strokeAndFill(context);
                        }
						else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1744);
if(method && method === "lineTo" && this._dashstyle)
						{
							_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1746);
args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);
							_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1747);
this._drawDashedLine.apply(this, args);
						}
						else
						{
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1751);
context[method].apply(context, args);
						}}
					}
				}
			}

            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1757);
this._strokeAndFill(context);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1758);
this._drawingComplete = true;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1759);
this._clearAndUpdateCoords();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1760);
this._updateNodePosition();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1761);
this._methods = cachedMethods;
		}
	},

    /**
     * Completes a stroke and/or fill operation on the context.
     *
     * @method _strokeAndFill
     * @param {Context} Reference to the context element of the canvas instance.
     * @private
     */
    _strokeAndFill: function(context)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_strokeAndFill", 1772);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1774);
if (this._fillType)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1776);
if(this._fillType === "linear")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1778);
context.fillStyle = this._getLinearGradient();
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1780);
if(this._fillType === "radial")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1782);
context.fillStyle = this._getRadialGradient();
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1786);
context.fillStyle = this._fillColor;
            }}
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1788);
context.closePath();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1789);
context.fill();
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1792);
if (this._stroke) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1793);
if(this._strokeWeight)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1795);
context.lineWidth = this._strokeWeight;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1797);
context.lineCap = this._linecap;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1798);
context.lineJoin = this._linejoin;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1799);
if(this._miterlimit)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1801);
context.miterLimit = this._miterlimit;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1803);
context.strokeStyle = this._strokeStyle;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1804);
context.stroke();
        }
    },

	/**
	 * Draws a dashed line between two points.
	 *
	 * @method _drawDashedLine
	 * @param {Number} xStart	The x position of the start of the line
	 * @param {Number} yStart	The y position of the start of the line
	 * @param {Number} xEnd		The x position of the end of the line
	 * @param {Number} yEnd		The y position of the end of the line
	 * @private
	 */
	_drawDashedLine: function(xStart, yStart, xEnd, yEnd)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_drawDashedLine", 1818);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1820);
var context = this._context,
			dashsize = this._dashstyle[0],
			gapsize = this._dashstyle[1],
			segmentLength = dashsize + gapsize,
			xDelta = xEnd - xStart,
			yDelta = yEnd - yStart,
			delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),
			segmentCount = Math.floor(Math.abs(delta / segmentLength)),
			radians = Math.atan2(yDelta, xDelta),
			xCurrent = xStart,
			yCurrent = yStart,
			i;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1832);
xDelta = Math.cos(radians) * segmentLength;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1833);
yDelta = Math.sin(radians) * segmentLength;

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1835);
for(i = 0; i < segmentCount; ++i)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1837);
context.moveTo(xCurrent, yCurrent);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1838);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1839);
xCurrent += xDelta;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1840);
yCurrent += yDelta;
		}

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1843);
context.moveTo(xCurrent, yCurrent);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1844);
delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1846);
if(delta > dashsize)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1848);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
		}
		else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1850);
if(delta > 0)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1852);
context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);
		}}

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1855);
context.moveTo(xEnd, yEnd);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getBounds", 1867);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1869);
var type = this._type,
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1874);
if(type === "path")
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1876);
x = x + this._left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1877);
y = y + this._top;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1878);
w = this._right - this._left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1879);
h = this._bottom - this._top;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1881);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getContentRect", 1894);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1896);
var transformOrigin = this.get("transformOrigin"),
            transformX = transformOrigin[0] * w,
            transformY = transformOrigin[1] * h,
            transforms = this.matrix.getTransformArray(this.get("transform")),
            matrix = new Y.Matrix(),
            i,
            len = transforms.length,
            transform,
            key,
            contentRect;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1906);
if(this._type === "path")
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1908);
transformX = transformX + x;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1909);
transformY = transformY + y;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1911);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1912);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1913);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1914);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1916);
transform = transforms[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1917);
key = transform.shift();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1918);
if(key)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1920);
matrix[key].apply(matrix, transform);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1923);
matrix.translate(-transformX, -transformY);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1924);
contentRect = matrix.getContentRect(w, h, x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1925);
return contentRect;
    },

    /**
     * Places the shape above all other shapes.
     *
     * @method toFront
     */
    toFront: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "toFront", 1933);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1935);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1936);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1938);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "toBack", 1947);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1949);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1950);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1952);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_parsePathData", 1963);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1965);
var method,
            methodSymbol,
            args,
            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),
            i,
            len,
            str,
            symbolToMethod = this._pathSymbolToMethod;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1973);
if(commandArray)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1975);
this.clear();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1976);
len = commandArray.length || 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1977);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1979);
str = commandArray[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1980);
methodSymbol = str.substr(0, 1);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1981);
args = str.substr(1).match(SPLITARGSPATTERN);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1982);
method = symbolToMethod[methodSymbol];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1983);
if(method)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1985);
if(args)
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1987);
this[method].apply(this, args);
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1991);
this[method].apply(this);
                    }
                }
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1995);
this.end();
        }
    },

    /**
     * Destroys the shape instance.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "destroy", 2004);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2006);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2007);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2009);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2013);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_destroy", 2023);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2025);
if(this.node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2027);
Y.one(this.node).remove(true);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2028);
this._context = null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2029);
this.node = null;
        }
    }
}, Y.CanvasDrawing.prototype));

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2034);
CanvasShape.ATTRS =  {
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2043);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2045);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2080);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2082);
this.matrix.init();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2083);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2084);
this._transform = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2085);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2088);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2090);
return this._transform;
        }
	},

	/**
	 * Dom node for the shape
	 *
	 * @config node
	 * @type HTMLElement
	 * @readOnly
	 */
	node: {
		readOnly: true,

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2104);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2106);
return this.node;
		}
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2117);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2119);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2122);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2124);
var node = this.node;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2125);
if(node)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2127);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2129);
return val;
		}
	},

	/**
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
	width: {
        value: 0
    },

	/**
	 * Indicates the height of the shape
	 *
	 * @config height
	 * @type Number
	 */
	height: {
        value: 0
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
	 * Indicates whether the shape is visible.
	 *
	 * @config visible
	 * @type Boolean
	 */
	visible: {
		value: true,

		setter: function(val){
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2182);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2183);
var node = this.get("node"),
                visibility = val ? "visible" : "hidden";
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2185);
if(node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2187);
node.style.visibility = visibility;
            }
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2189);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2245);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2247);
var fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2249);
fill = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2250);
if(fill && fill.color)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2252);
if(fill.color === undefined || fill.color === "none")
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2254);
fill.color = null;
				}
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2257);
this._setFillProps(fill);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2258);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2293);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2295);
var tmpl = this.get("stroke") || this._getDefaultStroke(),
                wt;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2297);
if(val && val.hasOwnProperty("weight"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2299);
wt = parseInt(val.weight, 10);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2300);
if(!isNaN(wt))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2302);
val.weight = wt;
                }
            }
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2305);
val = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2306);
this._setStrokeProps(val);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2307);
return val;
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2336);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2338);
if(this.get("node"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2340);
this._parsePathData(val);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2342);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2355);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2357);
return this._graphic;
		}
    }
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2361);
Y.CanvasShape = CanvasShape;
/**
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> implementation of the <a href="Path.html">`Path`</a> class.
 * `CanvasPath` is not intended to be used directly. Instead, use the <a href="Path.html">`Path`</a> class.
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities but has
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> capabilities, the <a href="Path.html">`Path`</a>
 * class will point to the `CanvasPath` class.
 *
 * @module graphics
 * @class CanvasPath
 * @extends CanvasShape
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2373);
CanvasPath = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasPath", 2373);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2375);
CanvasPath.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2377);
CanvasPath.NAME = "path";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2378);
Y.extend(CanvasPath, Y.CanvasShape, {
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @type String
     * @private
     */
    _type: "path",

	/**
	 * Draws the shape.
	 *
	 * @method _draw
	 * @private
	 */
    _draw: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2394);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2396);
this._closePath();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2397);
this._updateTransform();
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "createNode", 2407);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2409);
var host = this,
            node = Y.config.doc.createElement('canvas'),
			name = host.name,
            concat = host._camelCaseConcat,
            id = host.get("id");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2414);
host._context = node.getContext('2d');
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2415);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2416);
node.setAttribute("pointer-events", "none");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2417);
node.style.pointerEvents = "none";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2418);
node.style.overflow = "visible";
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2419);
node.setAttribute("id", id);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2420);
id = "#" + id;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2421);
host.node = node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2422);
host.addClass(
            _getClassName(SHAPE) +
            " " +
            _getClassName(concat(IMPLEMENTATION, SHAPE)) +
            " " +
            _getClassName(name) +
            " " +
            _getClassName(concat(IMPLEMENTATION, name))
        );
	},

    /**
     * Completes a drawing operation.
     *
     * @method end
     */
    end: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "end", 2438);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2440);
this._draw();
    }
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2444);
CanvasPath.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {
	/**
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
	width: {
		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2452);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2454);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2455);
return this._width - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2458);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2460);
this._width = val;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2461);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2472);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2474);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2475);
return this._height - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2478);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2480);
this._height = val;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2481);
return val;
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2495);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2497);
return this._path;
		}
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2501);
Y.CanvasPath = CanvasPath;
/**
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> implementation of the <a href="Rect.html">`Rect`</a> class.
 * `CanvasRect` is not intended to be used directly. Instead, use the <a href="Rect.html">`Rect`</a> class.
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities but has
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> capabilities, the <a href="Rect.html">`Rect`</a>
 * class will point to the `CanvasRect` class.
 *
 * @module graphics
 * @class CanvasRect
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2513);
CanvasRect = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasRect", 2513);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2515);
CanvasRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2517);
CanvasRect.NAME = "rect";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2518);
Y.extend(CanvasRect, Y.CanvasShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "rect",

	/**
	 * Draws the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2534);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2536);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2538);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2539);
this.drawRect(0, 0, w, h);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2540);
this._closePath();
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2543);
CanvasRect.ATTRS = Y.CanvasShape.ATTRS;
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2544);
Y.CanvasRect = CanvasRect;
/**
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> implementation of the <a href="Ellipse.html">`Ellipse`</a> class.
 * `CanvasEllipse` is not intended to be used directly. Instead, use the <a href="Ellipse.html">`Ellipse`</a> class.
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities but has
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> capabilities, the <a href="Ellipse.html">`Ellipse`</a>
 * class will point to the `CanvasEllipse` class.
 *
 * @module graphics
 * @class CanvasEllipse
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2556);
CanvasEllipse = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasEllipse", 2556);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2558);
CanvasEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2561);
CanvasEllipse.NAME = "ellipse";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2563);
Y.extend(CanvasEllipse, CanvasShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "ellipse",

	/**
     * Draws the shape.
     *
     * @method _draw
	 * @private
	 */
	_draw: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2579);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2581);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2583);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2584);
this.drawEllipse(0, 0, w, h);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2585);
this._closePath();
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2588);
CanvasEllipse.ATTRS = Y.merge(CanvasShape.ATTRS, {
	/**
	 * Horizontal radius for the ellipse.
	 *
	 * @config xRadius
	 * @type Number
	 */
	xRadius: {
		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2596);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2598);
this.set("width", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2601);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2603);
var val = this.get("width");
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2604);
if(val)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2606);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2608);
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
		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2620);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2622);
this.set("height", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2625);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2627);
var val = this.get("height");
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2628);
if(val)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2630);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2632);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2636);
Y.CanvasEllipse = CanvasEllipse;
/**
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> implementation of the <a href="Circle.html">`Circle`</a> class.
 * `CanvasCircle` is not intended to be used directly. Instead, use the <a href="Circle.html">`Circle`</a> class.
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities but has
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> capabilities, the <a href="Circle.html">`Circle`</a>
 * class will point to the `CanvasCircle` class.
 *
 * @module graphics
 * @class CanvasCircle
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2648);
CanvasCircle = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasCircle", 2648);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2650);
CanvasCircle.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2653);
CanvasCircle.NAME = "circle";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2655);
Y.extend(CanvasCircle, Y.CanvasShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "circle",

	/**
     * Draws the shape.
     *
     * @method _draw
	 * @private
	 */
	_draw: function()
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2671);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2673);
var radius = this.get("radius");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2674);
if(radius)
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2676);
this.clear();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2677);
this.drawCircle(0, 0, radius);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2678);
this._closePath();
		}
	}
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2683);
CanvasCircle.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {
	/**
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
	width: {
        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2691);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2693);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2694);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2697);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2699);
return this.get("radius") * 2;
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2710);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2712);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2713);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2716);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2718);
return this.get("radius") * 2;
		}
	},

	/**
	 * Radius of the circle
	 *
	 * @config radius
     * @type Number
	 */
	radius: {
		lazyAdd: false
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2732);
Y.CanvasCircle = CanvasCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class CanvasPieSlice
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2740);
CanvasPieSlice = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasPieSlice", 2740);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2742);
CanvasPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2744);
CanvasPieSlice.NAME = "canvasPieSlice";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2745);
Y.extend(CanvasPieSlice, Y.CanvasShape, {
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @type String
     * @private
     */
    _type: "path",

	/**
	 * Change event listener
	 *
	 * @private
	 * @method _updateHandler
	 */
	_draw: function()
	{
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2761);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2763);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2768);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2769);
this._left = x;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2770);
this._right = radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2771);
this._top = y;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2772);
this._bottom = radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2773);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2774);
this.end();
	}
 });
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2777);
CanvasPieSlice.ATTRS = Y.mix({
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
}, Y.CanvasShape.ATTRS);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2815);
Y.CanvasPieSlice = CanvasPieSlice;
/**
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> implementation of the `Graphic` class.
 * `CanvasGraphic` is not intended to be used directly. Instead, use the <a href="Graphic.html">`Graphic`</a> class.
 * If the browser lacks <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities but has
 * <a href="http://www.w3.org/TR/html5/the-canvas-element.html">Canvas</a> capabilities, the <a href="Graphic.html">`Graphic`</a>
 * class will point to the `CanvasGraphic` class.
 *
 * @module graphics
 * @class CanvasGraphic
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2827);
function CanvasGraphic() {

    _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasGraphic", 2827);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2829);
CanvasGraphic.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2832);
CanvasGraphic.NAME = "canvasGraphic";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2834);
CanvasGraphic.ATTRS = {
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2851);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2853);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2856);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2858);
var node = this._node;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2859);
if(node)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2861);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2863);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2877);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2879);
return this._shapes;
        }
    },

    /**
     *  Object containing size and coordinate data for the content of a Graphic in relation to the graphic instance's position.
     *
     *  @config contentBounds
     *  @type Object
     *  @readOnly
     */
    contentBounds: {
        readOnly: true,

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2893);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2895);
return this._contentBounds;
        }
    },

    /**
     *  The outermost html element of the Graphic instance.
     *
     *  @config node
     *  @type HTMLElement
     *  @readOnly
     */
    node: {
        readOnly: true,

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2909);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2911);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2922);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2924);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2926);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2928);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2939);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2941);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2943);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2945);
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
     * The contentBounds will resize to greater values but not smaller values. (for performance)
     * When resizing the contentBounds down is desirable, set the resizeDown value to true.
     *
     * @config resizeDown
     * @type Boolean
     */
    resizeDown: {
        value: false
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 3016);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3018);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3021);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3023);
this._x = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3024);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3026);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3028);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 3039);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3041);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3044);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3046);
this._y = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3047);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3049);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3051);
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

	/**
	 * Indicates whether the `Graphic` and its children are visible.
	 *
	 * @config visible
	 * @type Boolean
	 */
    visible: {
        value: true,

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3077);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3079);
this._toggleVisible(val);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3080);
return val;
        }
    }
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3085);
Y.extend(CanvasGraphic, Y.GraphicBase, {
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "set", 3095);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3097);
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
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3107);
AttributeLite.prototype.set.apply(host, arguments);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3108);
if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3110);
if(Y_LANG.isString && redrawAttrs[attr])
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3112);
forceRedraw = true;
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3114);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3116);
for(key in redrawAttrs)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3118);
if(redrawAttrs.hasOwnProperty(key) && attr[key])
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3120);
forceRedraw = true;
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3121);
break;
                    }
                }
            }}
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3126);
if(forceRedraw)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3128);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getXY", 3156);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3158);
var node = Y.one(this._node),
            xy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3160);
if(node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3162);
xy = node.getXY();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3164);
return xy;
    },

	/**
     * Initializes the class.
     *
     * @method initializer
     * @param {Object} config Optional attributes
     * @private
     */
    initializer: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "initializer", 3174);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3175);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden",
            w = this.get("width") || 0,
            h = this.get("height") || 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3179);
this._shapes = {};
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3180);
this._redrawQueue = {};
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3181);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3187);
this._node = DOCUMENT.createElement('div');
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3188);
this._node.style.position = "absolute";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3189);
this._node.style.visibility = visibility;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3190);
this.set("width", w);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3191);
this.set("height", h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3192);
if(render)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3194);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "render", 3204);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3205);
var parentNode = Y.one(render),
            node = this._node,
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3209);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3210);
parentNode.appendChild(node);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3211);
node.style.display = "block";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3212);
node.style.position = "absolute";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3213);
node.style.left = "0px";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3214);
node.style.top = "0px";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3215);
this.set("width", w);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3216);
this.set("height", h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3217);
this.parentNode = parentNode;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3218);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "destroy", 3226);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3228);
this.removeAllShapes();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3229);
if(this._node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3231);
this._removeChildren(this._node);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3232);
Y.one(this._node).destroy();
        }
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addShape", 3243);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3245);
cfg.graphic = this;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3246);
if(!this.get("visible"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3248);
cfg.visible = false;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3250);
var ShapeClass = this._getShapeClass(cfg.type),
            shape = new ShapeClass(cfg);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3252);
this._appendShape(shape);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3253);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_appendShape", 3263);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3265);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3267);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3269);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3273);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeShape", 3283);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3285);
if(!(shape instanceof CanvasShape))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3287);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3289);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3292);
if(shape && shape instanceof CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3294);
shape._destroy();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3295);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3297);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3299);
this._redraw();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3301);
return shape;
    },

    /**
     * Removes all shape instances from the dom.
     *
     * @method removeAllShapes
     */
    removeAllShapes: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeAllShapes", 3309);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3311);
var shapes = this._shapes,
            i;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3313);
for(i in shapes)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3315);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3317);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3320);
this._shapes = {};
    },

    /**
     * Clears the graphics object.
     *
     * @method clear
     */
    clear: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "clear", 3328);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3329);
this.removeAllShapes();
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_removeChildren", 3339);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3341);
if(node && node.hasChildNodes())
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3343);
var child;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3344);
while(node.firstChild)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3346);
child = node.firstChild;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3347);
this._removeChildren(child);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3348);
node.removeChild(child);
            }
        }
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toggleVisible", 3360);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3362);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3365);
if(shapes)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3367);
for(i in shapes)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3369);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3371);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3375);
if(this._node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3377);
this._node.style.visibility = visibility;
        }
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getShapeClass", 3389);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3391);
var shape = this._shapeClass[val];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3392);
if(shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3394);
return shape;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3396);
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
        circle: Y.CanvasCircle,
        rect: Y.CanvasRect,
        path: Y.CanvasPath,
        ellipse: Y.CanvasEllipse,
        pieslice: Y.CanvasPieSlice
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getShapeById", 3421);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3423);
var shape = this._shapes[id];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3424);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "batch", 3433);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3435);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3436);
this.set("autoDraw", false);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3437);
method();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3438);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDocFrag", 3448);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3450);
if(!this._frag)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3452);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3454);
return this._frag;
    },

    /**
     * Redraws all shapes.
     *
     * @method _redraw
     * @private
     */
    _redraw: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_redraw", 3463);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3465);
var autoSize = this.get("autoSize"),
            preserveAspectRatio = this.get("preserveAspectRatio"),
            box = this.get("resizeDown") ? this._getUpdatedContentBounds() : this._contentBounds,
            contentWidth,
            contentHeight,
            w,
            h,
            xScale,
            yScale,
            translateX = 0,
            translateY = 0,
            matrix,
            node = this.get("node");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3478);
if(autoSize)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3480);
if(autoSize === "sizeContentToGraphic")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3482);
contentWidth = box.right - box.left;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3483);
contentHeight = box.bottom - box.top;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3484);
w = parseFloat(Y_DOM.getComputedStyle(node, "width"));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3485);
h = parseFloat(Y_DOM.getComputedStyle(node, "height"));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3486);
matrix = new Y.Matrix();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3487);
if(preserveAspectRatio === "none")
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3489);
xScale = w/contentWidth;
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3490);
yScale = h/contentHeight;
                }
                else
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3494);
if(contentWidth/contentHeight !== w/h)
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3496);
if(contentWidth * h/contentHeight > w)
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3498);
xScale = yScale = w/contentWidth;
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3499);
translateY = this._calculateTranslate(preserveAspectRatio.slice(5).toLowerCase(), contentHeight * w/contentWidth, h);
                        }
                        else
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3503);
xScale = yScale = h/contentHeight;
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3504);
translateX = this._calculateTranslate(preserveAspectRatio.slice(1, 4).toLowerCase(), contentWidth * h/contentHeight, w);
                        }
                    }
                }
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3508);
Y_DOM.setStyle(node, "transformOrigin", "0% 0%");
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3509);
translateX = translateX - (box.left * xScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3510);
translateY = translateY - (box.top * yScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3511);
matrix.translate(translateX, translateY);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3512);
matrix.scale(xScale, yScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3513);
Y_DOM.setStyle(node, "transform", matrix.toCSSText());
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3517);
this.set("width", box.right);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3518);
this.set("height", box.bottom);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3521);
if(this._frag)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3523);
this._node.appendChild(this._frag);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3524);
this._frag = null;
        }
    },

    /**
     * Determines the value for either an x or y value to be used for the <code>translate</code> of the Graphic.
     *
     * @method _calculateTranslate
     * @param {String} position The position for placement. Possible values are min, mid and max.
     * @param {Number} contentSize The total size of the content.
     * @param {Number} boundsSize The total size of the Graphic.
     * @return Number
     * @private
     */
    _calculateTranslate: function(position, contentSize, boundsSize)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_calculateTranslate", 3538);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3540);
var ratio = boundsSize - contentSize,
            coord;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3542);
switch(position)
        {
            case "mid" :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3545);
coord = ratio * 0.5;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3546);
break;
            case "max" :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3548);
coord = ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3549);
break;
            default :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3551);
coord = 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3552);
break;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3554);
return coord;
    },

    /**
     * Adds a shape to the redraw queue and calculates the contentBounds. Used internally
     * by `Shape` instances.
     *
     * @method addToRedrawQueue
     * @param Shape shape The shape instance to add to the queue
     * @protected
     */
    addToRedrawQueue: function(shape)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addToRedrawQueue", 3565);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3567);
var shapeBox,
            box;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3569);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3570);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3572);
shapeBox = shape.getBounds();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3573);
box = this._contentBounds;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3574);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3575);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3576);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3577);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3578);
this._contentBounds = box;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3580);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3582);
this._redraw();
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getUpdatedContentBounds", 3593);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3595);
var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {};
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3600);
for(i in queue)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3602);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3604);
shape = queue[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3605);
bounds = shape.getBounds();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3606);
box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3607);
box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3608);
box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3609);
box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3612);
box.left = Y_LANG.isNumber(box.left) ? box.left : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3613);
box.top = Y_LANG.isNumber(box.top) ? box.top : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3614);
box.right = Y_LANG.isNumber(box.right) ? box.right : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3615);
box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3616);
this._contentBounds = box;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3617);
return box;
    },

    /**
     * Inserts shape on the top of the tree.
     *
     * @method _toFront
     * @param {CanvasShape} Shape to add.
     * @private
     */
    _toFront: function(shape)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toFront", 3627);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3629);
var contentNode = this.get("node");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3630);
if(shape instanceof Y.CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3632);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3634);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3636);
contentNode.appendChild(shape);
        }
    },

    /**
     * Inserts shape as the first child of the content node.
     *
     * @method _toBack
     * @param {CanvasShape} Shape to add.
     * @private
     */
    _toBack: function(shape)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toBack", 3647);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3649);
var contentNode = this.get("node"),
            targetNode;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3651);
if(shape instanceof Y.CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3653);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3655);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3657);
targetNode = contentNode.firstChild;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3658);
if(targetNode)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3660);
contentNode.insertBefore(shape, targetNode);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3664);
contentNode.appendChild(shape);
            }
        }
    }
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3670);
Y.CanvasGraphic = CanvasGraphic;


}, '@VERSION@', {"requires": ["graphics"]});
