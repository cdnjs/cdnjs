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
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].code=["YUI.add('graphics-canvas', function (Y, NAME) {","","var IMPLEMENTATION = \"canvas\",","    SHAPE = \"shape\",","	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,","    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\\.][0-9]*/g,","    DOCUMENT = Y.config.doc,","    Y_LANG = Y.Lang,","    AttributeLite = Y.AttributeLite,","	CanvasShape,","	CanvasPath,","	CanvasRect,","    CanvasEllipse,","	CanvasCircle,","    CanvasPieSlice,","    Y_DOM = Y.DOM,","    Y_Color = Y.Color,","    PARSE_INT = parseInt,","    PARSE_FLOAT = parseFloat,","    IS_NUMBER = Y_LANG.isNumber,","    RE = RegExp,","    TORGB = Y_Color.toRGB,","    TOHEX = Y_Color.toHex,","    _getClassName = Y.ClassNameManager.getClassName;","","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class."," * `CanvasDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Drawing.html\">`Drawing`</a>"," * class will point to the `CanvasDrawing` class."," *"," * @module graphics"," * @class CanvasDrawing"," * @constructor"," */","function CanvasDrawing()","{","}","","CanvasDrawing.prototype = {","    /**","     * Maps path to methods","     *","     * @property _pathSymbolToMethod","     * @type Object","     * @private","     */","    _pathSymbolToMethod: {","        M: \"moveTo\",","        m: \"relativeMoveTo\",","        L: \"lineTo\",","        l: \"relativeLineTo\",","        C: \"curveTo\",","        c: \"relativeCurveTo\",","        Q: \"quadraticCurveTo\",","        q: \"relativeQuadraticCurveTo\",","        z: \"closePath\",","        Z: \"closePath\"","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","","    /**","     * Parses hex color string and alpha value to rgba","     *","     * @method _toRGBA","     * @param {Object} val Color value to parse. Can be hex string, rgb or name.","     * @param {Number} alpha Numeric value between 0 and 1 representing the alpha level.","     * @private","     */","    _toRGBA: function(val, alpha) {","        alpha = (alpha !== undefined) ? alpha : 1;","        if (!Y_Color.re_RGB.test(val)) {","            val = TOHEX(val);","        }","","        if(Y_Color.re_hex.exec(val)) {","            val = 'rgba(' + [","                PARSE_INT(RE.$1, 16),","                PARSE_INT(RE.$2, 16),","                PARSE_INT(RE.$3, 16)","            ].join(',') + ',' + alpha + ')';","        }","        return val;","    },","","    /**","     * Converts color to rgb format","     *","     * @method _toRGB","     * @param val Color value to convert.","     * @private","     */","    _toRGB: function(val) {","        return TORGB(val);","    },","","    /**","     * Sets the size of the graphics object.","     *","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     * @private","     */","	setSize: function(w, h) {","        if(this.get(\"autoSize\"))","        {","            if(w > this.node.getAttribute(\"width\"))","            {","                this.node.style.width = w + \"px\";","                this.node.setAttribute(\"width\", w);","            }","            if(h > this.node.getAttribute(\"height\"))","            {","                this.node.style.height = h + \"px\";","                this.node.setAttribute(\"height\", h);","            }","        }","    },","","	/**","     * Tracks coordinates. Used to calculate the start point of dashed lines.","     *","     * @method _updateCoords","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","	 * @private","	 */","    _updateCoords: function(x, y)","    {","        this._xcoords.push(x);","        this._ycoords.push(y);","        this._currentX = x;","        this._currentY = y;","    },","","	/**","     * Clears the coordinate arrays. Called at the end of a drawing operation.","	 *","     * @method _clearAndUpdateCoords","     * @private","	 */","    _clearAndUpdateCoords: function()","    {","        var x = this._xcoords.pop() || 0,","            y = this._ycoords.pop() || 0;","        this._updateCoords(x, y);","    },","","	/**","     * Moves the shape's dom node.","     *","     * @method _updateNodePosition","	 * @private","	 */","    _updateNodePosition: function()","    {","        var node = this.get(\"node\"),","            x = this.get(\"x\"),","            y = this.get(\"y\");","        node.style.position = \"absolute\";","        node.style.left = (x + this._left) + \"px\";","        node.style.top = (y + this._top) + \"px\";","    },","","    /**","     * Queues up a method to be executed when a shape redraws.","     *","     * @method _updateDrawingQueue","     * @param {Array} val An array containing data that can be parsed into a method and arguments. The value at zero-index","     * of the array is a string reference of the drawing method that will be called. All subsequent indices are argument for","     * that method. For example, `lineTo(10, 100)` would be structured as:","     * `[\"lineTo\", 10, 100]`.","     * @private","     */","    _updateDrawingQueue: function(val)","    {","        this._methods.push(val);","    },","","    /**","     * Draws a line segment from the current drawing position to the specified x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    lineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a line segment from the current drawing position to the relative x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    relativeLineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements lineTo methods.","     *","     * @method _lineTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _lineTo: function(args, relative)","    {","        var point1 = args[0],","            i,","            len,","            x,","            y,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        if(!this._lineToMethods)","        {","            this._lineToMethods = [];","        }","        len = args.length - 1;","        if (typeof point1 === 'string' || typeof point1 === 'number') {","            for (i = 0; i < len; i = i + 2) {","                x = parseFloat(args[i]);","                y = parseFloat(args[i + 1]);","                x = x + relativeX;","                y = y + relativeY;","                this._updateDrawingQueue([\"lineTo\", x, y]);","                this._trackSize(x - wt, y - wt);","                this._trackSize(x + wt, y + wt);","                this._updateCoords(x, y);","            }","        }","        else","        {","            for (i = 0; i < len; i = i + 1)","            {","                x = parseFloat(args[i][0]);","                y = parseFloat(args[i][1]);","                this._updateDrawingQueue([\"lineTo\", x, y]);","                this._lineToMethods[this._lineToMethods.length] = this._methods[this._methods.length - 1];","                this._trackSize(x - wt, y - wt);","                this._trackSize(x + wt, y + wt);","                this._updateCoords(x, y);","            }","        }","        this._drawingComplete = false;","        return this;","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    moveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Moves the current drawing position relative to specified x and y coordinates.","     *","     * @method relativeMoveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeMoveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements moveTo methods.","     *","     * @method _moveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _moveTo: function(args, relative) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0,","            x = parseFloat(args[0]) + relativeX,","            y = parseFloat(args[1]) + relativeY;","        this._updateDrawingQueue([\"moveTo\", x, y]);","        this._trackSize(x - wt, y - wt);","        this._trackSize(x + wt, y + wt);","        this._updateCoords(x, y);","        this._drawingComplete = false;","        return this;","    },","","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    curveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a bezier curve relative to the current coordinates.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeCurveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements curveTo methods.","     *","     * @method _curveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _curveTo: function(args, relative) {","        var w,","            h,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            x,","            y,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        len = args.length - 5;","        for(i = 0; i < len; i = i + 6)","        {","            cp1x = parseFloat(args[i]) + relativeX;","            cp1y = parseFloat(args[i + 1]) + relativeY;","            cp2x = parseFloat(args[i + 2]) + relativeX;","            cp2y = parseFloat(args[i + 3]) + relativeY;","            x = parseFloat(args[i + 4]) + relativeX;","            y = parseFloat(args[i + 5]) + relativeY;","            this._updateDrawingQueue([\"bezierCurveTo\", cp1x, cp1y, cp2x, cp2y, x, y]);","            this._drawingComplete = false;","            right = Math.max(x, Math.max(cp1x, cp2x));","            bottom = Math.max(y, Math.max(cp1y, cp2y));","            left = Math.min(x, Math.min(cp1x, cp2x));","            top = Math.min(y, Math.min(cp1y, cp2y));","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    quadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a quadratic bezier curve relative to the current position.","     *","     * @method relativeQuadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeQuadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements quadraticCurveTo methods.","     *","     * @method _quadraticCurveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _quadraticCurveTo: function(args, relative) {","        var cpx,","            cpy,","            x,","            y,","            w,","            h,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len = args.length - 3,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        for(i = 0; i < len; i = i + 4)","        {","            cpx = parseFloat(args[i]) + relativeX;","            cpy = parseFloat(args[i + 1]) + relativeY;","            x = parseFloat(args[i + 2]) + relativeX;","            y = parseFloat(args[i + 3]) + relativeY;","            this._drawingComplete = false;","            right = Math.max(x, cpx);","            bottom = Math.max(y, cpy);","            left = Math.min(x, cpx);","            top = Math.min(y, cpy);","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._updateDrawingQueue([\"quadraticCurveTo\", cpx, cpy, x, y]);","            this._updateCoords(x, y);","        }","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @chainable","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 2 * Math.PI,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            circum = radius * 2;","            circum += wt;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        this._updateDrawingQueue([\"arc\", x + radius, y + radius, radius, startAngle, endAngle, false]);","        return this;","    },","","    /**","     * Draws a diamond.","     *","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @chainable","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws an ellipse. Used internally by `CanvasEllipse` class.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var l = 8,","            theta = -(45/180) * Math.PI,","            angle = 0,","            angleMid,","            radius = w/2,","            yRadius = h/2,","            i,","            centerX = x + radius,","            centerY = y + yRadius,","            ax, ay, bx, by, cx, cy,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","","        ax = centerX + Math.cos(0) * radius;","        ay = centerY + Math.sin(0) * yRadius;","        this.moveTo(ax, ay);","        for(i = 0; i < l; i++)","        {","            angle += theta;","            angleMid = angle - (theta / 2);","            bx = centerX + Math.cos(angle) * radius;","            by = centerY + Math.sin(angle) * yRadius;","            cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","            cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","            this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","        }","        this._trackSize(x + w + wt, y + h + wt);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        return this;","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     */","    drawRect: function(x, y, w, h) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._drawingComplete = false;","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     * @chainable","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._drawingComplete = false;","        this.moveTo( x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @chainable","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius, yRadius)","    {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            segs,","            segAngle,","            theta,","            angle,","            angleMid,","            ax,","            ay,","            bx,","            by,","            cx,","            cy,","            i = 0;","        yRadius = yRadius || radius;","","        this._drawingComplete = false;","        // move to x,y position","        this._updateDrawingQueue([\"moveTo\", x, y]);","","        yRadius = yRadius || radius;","","        // limit sweep to reasonable numbers","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","","        // First we calculate how many segments are needed","        // for a smooth arc.","        segs = Math.ceil(Math.abs(arc) / 45);","","        // Now calculate the sweep of each segment.","        segAngle = arc / segs;","","        // The math requires radians rather than degrees. To convert from degrees","        // use the formula (degrees/180)*Math.PI to get radians.","        theta = -(segAngle / 180) * Math.PI;","","        // convert angle startAngle to radians","        angle = (startAngle / 180) * Math.PI;","","        // draw the curve in segments no larger than 45 degrees.","        if(segs > 0)","        {","            // draw a line from the center to the start of the curve","            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;","            ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;","            this.lineTo(ax, ay);","            // Loop for drawing curve segments","            for(i = 0; i < segs; ++i)","            {","                angle += theta;","                angleMid = angle - (theta / 2);","                bx = x + Math.cos(angle) * radius;","                by = y + Math.sin(angle) * yRadius;","                cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","                cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","                this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","            }","            // close the wedge by drawing a line to the center","            this._updateDrawingQueue([\"lineTo\", x, y]);","        }","        this._trackSize(-wt , -wt);","        this._trackSize((radius * 2) + wt, (radius * 2) + wt);","        return this;","    },","","    /**","     * Completes a drawing operation.","     *","     * @method end","     * @chainable","     */","    end: function() {","        this._closePath();","        return this;","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     * @chainable","     */","    closePath: function()","    {","        this._updateDrawingQueue([\"closePath\"]);","        this._updateDrawingQueue([\"beginPath\"]);","        return this;","    },","","	/**","	 * Clears the graphics object.","	 *","	 * @method clear","     * @chainable","	 */","    clear: function() {","		this._initProps();","        if(this.node)","        {","            this._context.clearRect(0, 0, this.node.width, this.node.height);","        }","        return this;","	},","","","    /**","     * Returns a linear gradient fill","     *","     * @method _getLinearGradient","     * @return CanvasGradient","     * @private","     */","    _getLinearGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            stops = fill.stops,","            opacity,","            color,","            stop,","            i,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            r = fill.rotation || 0,","            x1, x2, y1, y2,","            cx = x + w/2,","            cy = y + h/2,","            offset,","            radCon = Math.PI/180,","            tanRadians = parseFloat(parseFloat(Math.tan(r * radCon)).toFixed(8));","        if(Math.abs(tanRadians) * w/2 >= h/2)","        {","            if(r < 180)","            {","                y1 = y;","                y2 = y + h;","            }","            else","            {","                y1 = y + h;","                y2 = y;","            }","            x1 = cx - ((cy - y1)/tanRadians);","            x2 = cx - ((cy - y2)/tanRadians);","        }","        else","        {","            if(r > 90 && r < 270)","            {","                x1 = x + w;","                x2 = x;","            }","            else","            {","                x1 = x;","                x2 = x + w;","            }","            y1 = ((tanRadians * (cx - x1)) - cy) * -1;","            y2 = ((tanRadians * (cx - x2)) - cy) * -1;","        }","        gradient = this._context.createLinearGradient(x1, y1, x2, y2);","        for(i = 0; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            gradient.addColorStop(offset, color);","        }","        return gradient;","    },","","    /**","     * Returns a radial gradient fill","     *","     * @method _getRadialGradient","     * @return CanvasGradient","     * @private","     */","    _getRadialGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            r = fill.r,","            fx = fill.fx,","            fy = fill.fy,","            stops = fill.stops,","            opacity,","            color,","            stop,","            i,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            x1, x2, y1, y2, r2,","            xc, yc, xn, yn, d,","            offset,","            ratio,","            stopMultiplier;","        xc = x + w/2;","        yc = y + h/2;","        x1 = w * fx;","        y1 = h * fy;","        x2 = x + w/2;","        y2 = y + h/2;","        r2 = w * r;","        d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );","        if(d >= r2)","        {","            ratio = d/r2;","            //hack. gradient won't show if it is exactly on the edge of the arc","            if(ratio === 1)","            {","                ratio = 1.01;","            }","            xn = (x1 - xc)/ratio;","            yn = (y1 - yc)/ratio;","            xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);","            yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);","            x1 = xc + xn;","            y1 = yc + yn;","        }","","        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.","        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work.","        //Instead, adjust the color stops to reflect the smaller radius.","        if(r >= 0.5)","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);","            stopMultiplier = 1;","        }","        else","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);","            stopMultiplier = r * 2;","        }","        for(i = 0; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            offset *= stopMultiplier;","            if(offset <= 1)","            {","                gradient.addColorStop(offset, color);","            }","        }","        return gradient;","    },","","","    /**","     * Clears all values","     *","     * @method _initProps","     * @private","     */","    _initProps: function() {","        this._methods = [];","        this._lineToMethods = [];","        this._xcoords = [0];","		this._ycoords = [0];","		this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._right = 0;","        this._bottom = 0;","        this._currentX = 0;","        this._currentY = 0;","    },","","    /**","     * Indicates a drawing has completed.","     *","     * @property _drawingComplete","     * @type Boolean","     * @private","     */","    _drawingComplete: false,","","    /**","     * Creates canvas element","     *","     * @method _createGraphic","     * @return HTMLCanvasElement","     * @private","     */","    _createGraphic: function(config) {","        var graphic = Y.config.doc.createElement('canvas');","        return graphic;","    },","","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];","            }","        }","        return [ tmp[0][0], tmp[0][1] ];","    },","","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i = 0,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            xy;","        for(i = 0; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right + wt, bottom + wt);","        this._trackSize(left - wt, top - wt);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom)","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    }","};","Y.CanvasDrawing = CanvasDrawing;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class."," * `CanvasShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Shape.html\">`Shape`</a>"," * class will point to the `CanvasShape` class."," *"," * @module graphics"," * @class CanvasShape"," * @constructor"," */","CanvasShape = function(cfg)","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    CanvasShape.superclass.constructor.apply(this, arguments);","};","","CanvasShape.NAME = \"shape\";","","Y.extend(CanvasShape, Y.GraphicBase, Y.mix({","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","    init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic,","            data = this.get(\"data\");","        host._initProps();","		host.createNode();","		host._xcoords = [0];","		host._ycoords = [0];","        if(graphic)","        {","            this._setGraphic(graphic);","        }","        if(data)","        {","            host._parsePathData(data);","        }","		host._updateHandler();","	},","","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a","     * `Graphic` instance, it will be assigned to the `graphic` attribute. Otherwise, a new Graphic instance will be created","     * and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.CanvasGraphic)","        {","            this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.CanvasGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","        }","    },","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute","	 */","	addClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.addClass(className);","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.removeClass(className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains X & Y values for new position (coordinates are page-based)","	 */","	setXY: function(xy)","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = xy[0] - parentXY[0],","			y = xy[1] - parentXY[1];","		this._set(\"x\", x);","		this._set(\"y\", y);","		this._updateNodePosition(x, y);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.","	 *","	 * @method contains","	 * @param {CanvasShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y.one(this.get(\"node\")).test(selector);","		//return Y.Selector.test(this.node, selector);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","		return node === refNode;","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @method _getDefaultFill","	 * @return Object","	 * @private","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			opacity: 1,","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @method _getDefaultStroke","	 * @return Object","	 * @private","	 */","	_getDefaultStroke: function()","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","	/**","	 * Left edge of the path","	 *","     * @property _left","     * @type Number","	 * @private","	 */","	_left: 0,","","	/**","	 * Right edge of the path","	 *","     * @property _right","     * @type Number","	 * @private","	 */","	_right: 0,","","	/**","	 * Top edge of the path","	 *","     * @property _top","     * @type Number","	 * @private","	 */","	_top: 0,","","	/**","	 * Bottom edge of the path","	 *","     * @property _bottom","     * @type Number","	 * @private","	 */","	_bottom: 0,","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var host = this,","            node = Y.config.doc.createElement('canvas'),","			id = host.get(\"id\"),","            concat = host._camelCaseConcat,","            name = host.name;","		host._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.style.overflow = \"visible\";","        if(!host.get(\"visible\"))","        {","            node.style.visibility = \"hidden\";","        }","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","        host.node = node;","		host.addClass(_getClassName(SHAPE) + \" \" + _getClassName(concat(IMPLEMENTATION, SHAPE)) + \" \" + _getClassName(name) + \" \" + _getClassName(concat(IMPLEMENTATION, name)));","	},","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so,","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","     * @param {Object} stroke Properties of the `stroke` attribute.","	 * @private","	 */","	_setStrokeProps: function(stroke)","	{","		var color,","			weight,","			opacity,","			linejoin,","			linecap,","			dashstyle;","        if(stroke)","        {","            color = stroke.color;","            weight = PARSE_FLOAT(stroke.weight);","            opacity = PARSE_FLOAT(stroke.opacity);","            linejoin = stroke.linejoin || \"round\";","            linecap = stroke.linecap || \"butt\";","            dashstyle = stroke.dashstyle;","            this._miterlimit = null;","            this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;","            this._strokeWeight = weight;","","            if (IS_NUMBER(weight) && weight > 0)","            {","                this._stroke = 1;","            }","            else","            {","                this._stroke = 0;","            }","            if (IS_NUMBER(opacity)) {","                this._strokeStyle = this._toRGBA(color, opacity);","            }","            else","            {","                this._strokeStyle = color;","            }","            this._linecap = linecap;","            if(linejoin == \"round\" || linejoin == \"bevel\")","            {","                this._linejoin = linejoin;","            }","            else","            {","                linejoin = parseInt(linejoin, 10);","                if(IS_NUMBER(linejoin))","                {","                    this._miterlimit =  Math.max(linejoin, 1);","                    this._linejoin = \"miter\";","                }","            }","        }","        else","        {","            this._stroke = 0;","        }","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this,","			val = arguments[0];","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _setFillProps","     * @param {Object} fill Properties of the `fill` attribute.","	 * @private","	 */","	_setFillProps: function(fill)","	{","		var isNumber = IS_NUMBER,","			color,","			opacity,","			type;","        if(fill)","        {","            color = fill.color;","            type = fill.type;","            if(type == \"linear\" || type == \"radial\")","            {","                this._fillType = type;","            }","            else if(color)","            {","                opacity = fill.opacity;","                if (isNumber(opacity))","                {","                    opacity = Math.max(0, Math.min(1, opacity));","                    color = this._toRGBA(color, opacity);","                }","                else","                {","                    color = TORGB(color);","                }","","                this._fillColor = color;","                this._fillType = 'solid';","            }","            else","            {","                this._fillColor = null;","            }","        }","		else","		{","            this._fillType = null;","			this._fillColor = null;","		}","	},","","	/**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to transate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y)","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","    skewX: function(x)","    {","        this._addTransform(\"skewX\", arguments);","    },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","    skewY: function(y)","    {","        this._addTransform(\"skewY\", arguments);","    },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","    rotate: function(deg)","    {","        this._rotation = deg;","        this._addTransform(\"rotate\", arguments);","    },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","    scale: function(x, y)","    {","        this._addTransform(\"scale\", arguments);","    },","","    /**","     * Storage for `rotation` atribute.","     *","     * @property _rotation","     * @type Number","	 * @private","	 */","	_rotation: 0,","","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","			key,","			transform,","			transformOrigin = this.get(\"transformOrigin\"),","            matrix = this.matrix,","            i,","            len = this._transforms.length;","","        if(this._transforms && this._transforms.length > 0)","        {","            for(i = 0; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    matrix[key].apply(matrix, this._transforms[i]);","                }","            }","            transform = matrix.toCSSText();","        }","","        this._graphic.addToRedrawQueue(this);","		transformOrigin = (100 * transformOrigin[0]) + \"% \" + (100 * transformOrigin[1]) + \"%\";","        Y_DOM.setStyle(node, \"transformOrigin\", transformOrigin);","        if(transform)","		{","            Y_DOM.setStyle(node, \"transform\", transform);","		}","        this._transforms = [];","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function()","	{","		this._draw();","		this._updateTransform();","	},","","	/**","	 * Updates the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","        var node = this.node;","        this.clear();","		this._closePath();","		node.style.left = this.get(\"x\") + \"px\";","		node.style.top = this.get(\"y\") + \"px\";","	},","","	/**","	 * Completes a shape or drawing","	 *","	 * @method _closePath","	 * @private","	 */","	_closePath: function()","	{","		if(!this._methods)","		{","			return;","		}","		var node = this.get(\"node\"),","			w = this._right - this._left,","			h = this._bottom - this._top,","			context = this._context,","			methods = [],","			cachedMethods = this._methods.concat(),","			i,","			j,","			method,","			args,","            argsLen,","			len = 0;","		this._context.clearRect(0, 0, node.width, node.height);","        if(this._methods)","        {","			len = cachedMethods.length;","			if(!len || len < 1)","			{","				return;","			}","			for(i = 0; i < len; ++i)","			{","				methods[i] = cachedMethods[i].concat();","				args = methods[i];","                argsLen = (args[0] == \"quadraticCurveTo\" || args[0] == \"bezierCurveTo\") ? args.length : 3;","				for(j = 1; j < argsLen; ++j)","				{","					if(j % 2 === 0)","					{","						args[j] = args[j] - this._top;","					}","					else","					{","						args[j] = args[j] - this._left;","					}","				}","			}","            node.setAttribute(\"width\", Math.min(w, 2000));","            node.setAttribute(\"height\", Math.min(2000, h));","            context.beginPath();","			for(i = 0; i < len; ++i)","			{","				args = methods[i].concat();","				if(args && args.length > 0)","				{","					method = args.shift();","					if(method)","					{","                        if(method == \"closePath\")","                        {","                            context.closePath();","                            this._strokeAndFill(context);","                        }","						else if(method && method == \"lineTo\" && this._dashstyle)","						{","							args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);","							this._drawDashedLine.apply(this, args);","						}","						else","						{","                            context[method].apply(context, args);","						}","					}","				}","			}","","            this._strokeAndFill(context);","			this._drawingComplete = true;","			this._clearAndUpdateCoords();","			this._updateNodePosition();","			this._methods = cachedMethods;","		}","	},","","    /**","     * Completes a stroke and/or fill operation on the context.","     *","     * @method _strokeAndFill","     * @param {Context} Reference to the context element of the canvas instance.","     * @private","     */","    _strokeAndFill: function(context)","    {","        if (this._fillType)","        {","            if(this._fillType == \"linear\")","            {","                context.fillStyle = this._getLinearGradient();","            }","            else if(this._fillType == \"radial\")","            {","                context.fillStyle = this._getRadialGradient();","            }","            else","            {","                context.fillStyle = this._fillColor;","            }","            context.closePath();","            context.fill();","        }","","        if (this._stroke) {","            if(this._strokeWeight)","            {","                context.lineWidth = this._strokeWeight;","            }","            context.lineCap = this._linecap;","            context.lineJoin = this._linejoin;","            if(this._miterlimit)","            {","                context.miterLimit = this._miterlimit;","            }","            context.strokeStyle = this._strokeStyle;","            context.stroke();","        }","    },","","	/**","	 * Draws a dashed line between two points.","	 *","	 * @method _drawDashedLine","	 * @param {Number} xStart	The x position of the start of the line","	 * @param {Number} yStart	The y position of the start of the line","	 * @param {Number} xEnd		The x position of the end of the line","	 * @param {Number} yEnd		The y position of the end of the line","	 * @private","	 */","	_drawDashedLine: function(xStart, yStart, xEnd, yEnd)","	{","		var context = this._context,","			dashsize = this._dashstyle[0],","			gapsize = this._dashstyle[1],","			segmentLength = dashsize + gapsize,","			xDelta = xEnd - xStart,","			yDelta = yEnd - yStart,","			delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),","			segmentCount = Math.floor(Math.abs(delta / segmentLength)),","			radians = Math.atan2(yDelta, xDelta),","			xCurrent = xStart,","			yCurrent = yStart,","			i;","		xDelta = Math.cos(radians) * segmentLength;","		yDelta = Math.sin(radians) * segmentLength;","","		for(i = 0; i < segmentCount; ++i)","		{","			context.moveTo(xCurrent, yCurrent);","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","			xCurrent += xDelta;","			yCurrent += yDelta;","		}","","		context.moveTo(xCurrent, yCurrent);","		delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));","","		if(delta > dashsize)","		{","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","		}","		else if(delta > 0)","		{","			context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);","		}","","		context.moveTo(xEnd, yEnd);","	},","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox.","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var type = this._type,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			x = this.get(\"x\"),","			y = this.get(\"y\");","        if(type == \"path\")","        {","            x = x + this._left;","            y = y + this._top;","            w = this._right - this._left;","            h = this._bottom - this._top;","        }","        return this._getContentRect(w, h, x, y);","	},","","    /**","     * Calculates the bounding box for the shape.","     *","     * @method _getContentRect","     * @param {Number} w width of the shape","     * @param {Number} h height of the shape","     * @param {Number} x x-coordinate of the shape","     * @param {Number} y y-coordinate of the shape","     * @private","     */","    _getContentRect: function(w, h, x, y)","    {","        var transformOrigin = this.get(\"transformOrigin\"),","            transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h,","            transforms = this.matrix.getTransformArray(this.get(\"transform\")),","            matrix = new Y.Matrix(),","            i,","            len = transforms.length,","            transform,","            key,","            contentRect;","        if(this._type == \"path\")","        {","            transformX = transformX + x;","            transformY = transformY + y;","        }","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        for(i = 0; i < len; i = i + 1)","        {","            transform = transforms[i];","            key = transform.shift();","            if(key)","            {","                matrix[key].apply(matrix, transform);","            }","        }","        matrix.translate(-transformX, -transformY);","        contentRect = matrix.getContentRect(w, h, x, y);","        return contentRect;","    },","","    /**","     * Places the shape above all other shapes.","     *","     * @method toFront","     */","    toFront: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toFront(this);","        }","    },","","    /**","     * Places the shape underneath all other shapes.","     *","     * @method toFront","     */","    toBack: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toBack(this);","        }","    },","","    /**","     * Parses path data string and call mapped methods.","     *","     * @method _parsePathData","     * @param {String} val The path data","     * @private","     */","    _parsePathData: function(val)","    {","        var method,","            methodSymbol,","            args,","            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),","            i,","            len,","            str,","            symbolToMethod = this._pathSymbolToMethod;","        if(commandArray)","        {","            this.clear();","            len = commandArray.length || 0;","            for(i = 0; i < len; i = i + 1)","            {","                str = commandArray[i];","                methodSymbol = str.substr(0, 1);","                args = str.substr(1).match(SPLITARGSPATTERN);","                method = symbolToMethod[methodSymbol];","                if(method)","                {","                    if(args)","                    {","                        this[method].apply(this, args);","                    }","                    else","                    {","                        this[method].apply(this);","                    }","                }","            }","            this.end();","        }","    },","","    /**","     * Destroys the shape instance.","     *","     * @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {","            Y.one(this.node).remove(true);","            this._context = null;","            this.node = null;","        }","    }","}, Y.CanvasDrawing.prototype));","","CanvasShape.ATTRS =  {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains","     * corresponding methods for each transform that will apply the transform to the current matrix. The below code illustrates how you might use the","     * `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String","	 */","	transform: {","		setter: function(val)","		{","            this.matrix.init();","            this._transforms = this.matrix.getTransformArray(val);","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Dom node for the shape","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        value: 0","    },","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        value: 0","    },","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.get(\"node\"),","                visibility = val ? \"visible\" : \"hidden\";","			if(node)","            {","                node.style.visibility = visibility;","            }","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1.","     *              Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd>","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the","     *      flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and","     *          `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape`","     *          classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p>","	 *","	 * @config fill","	 * @type Object","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","","		setter: function(val)","		{","			var fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","			fill = (val) ? Y.merge(tmpl, val) : null;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color == \"none\")","				{","					fill.color = null;","				}","			}","			this._setFillProps(fill);","			return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set","     *      to an array, the first index indicates the length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin","     *              of miter, you simply specify the limit as opposed to having separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","","		setter: function(val)","		{","			var tmpl = this.get(\"stroke\") || this._getDefaultStroke(),","                wt;","            if(val && val.hasOwnProperty(\"weight\"))","            {","                wt = parseInt(val.weight, 10);","                if(!isNaN(wt))","                {","                    val.weight = wt;","                }","            }","			val = (val) ? Y.merge(tmpl, val) : null;","			this._setStrokeProps(val);","			return val;","		}","	},","","	//Not used. Remove in future.","	autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	//","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","    /**","     * Represents an SVG Path string. This will be parsed and added to shape's API to represent the SVG data across all","     * implementations. Note that when using VML or SVG implementations, part of this content will be added to the DOM using","     * respective VML/SVG attributes. If your content comes from an untrusted source, you will need to ensure that no","     * malicious code is included in that content.","     *","     * @config data","     * @type String","     */","    data: {","        setter: function(val)","        {","            if(this.get(\"node\"))","            {","                this._parsePathData(val);","            }","            return val;","        }","    },","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","    }","};","Y.CanvasShape = CanvasShape;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Path.html\">`Path`</a> class."," * `CanvasPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Path.html\">`Path`</a>"," * class will point to the `CanvasPath` class."," *"," * @module graphics"," * @class CanvasPath"," * @extends CanvasShape"," */","CanvasPath = function(cfg)","{","	CanvasPath.superclass.constructor.apply(this, arguments);","};","CanvasPath.NAME = \"path\";","Y.extend(CanvasPath, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","    _draw: function()","    {","        this._closePath();","        this._updateTransform();","    },","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var host = this,","            node = Y.config.doc.createElement('canvas'),","			name = host.name,","            concat = host._camelCaseConcat,","            id = host.get(\"id\");","		host._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.setAttribute(\"pointer-events\", \"none\");","        node.style.pointerEvents = \"none\";","        node.style.overflow = \"visible\";","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","		host.node = node;","		host.addClass(_getClassName(SHAPE) + \" \" + _getClassName(concat(IMPLEMENTATION, SHAPE)) + \" \" + _getClassName(name) + \" \" + _getClassName(concat(IMPLEMENTATION, name)));","	},","","    /**","     * Completes a drawing operation.","     *","     * @method end","     */","    end: function()","    {","        this._draw();","    }","});","","CanvasPath.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","			return this._width - offset;","		},","","		setter: function(val)","		{","			this._width = val;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","            return this._height - offset;","		},","","		setter: function(val)","		{","			this._height = val;","			return val;","		}","	},","","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","        readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.CanvasPath = CanvasPath;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class."," * `CanvasRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Rect.html\">`Rect`</a>"," * class will point to the `CanvasRect` class."," *"," * @module graphics"," * @class CanvasRect"," * @constructor"," */","CanvasRect = function()","{","	CanvasRect.superclass.constructor.apply(this, arguments);","};","CanvasRect.NAME = \"rect\";","Y.extend(CanvasRect, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawRect(0, 0, w, h);","		this._closePath();","	}","});","CanvasRect.ATTRS = Y.CanvasShape.ATTRS;","Y.CanvasRect = CanvasRect;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * `CanvasEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a>"," * class will point to the `CanvasEllipse` class."," *"," * @module graphics"," * @class CanvasEllipse"," * @constructor"," */","CanvasEllipse = function(cfg)","{","	CanvasEllipse.superclass.constructor.apply(this, arguments);","};","","CanvasEllipse.NAME = \"ellipse\";","","Y.extend(CanvasEllipse, CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"ellipse\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawEllipse(0, 0, w, h);","		this._closePath();","	}","});","CanvasEllipse.ATTRS = Y.merge(CanvasShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse.","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		setter: function(val)","		{","			this.set(\"width\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"width\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse.","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		setter: function(val)","		{","			this.set(\"height\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"height\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	}","});","Y.CanvasEllipse = CanvasEllipse;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class."," * `CanvasCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Circle.html\">`Circle`</a>"," * class will point to the `CanvasCircle` class."," *"," * @module graphics"," * @class CanvasCircle"," * @constructor"," */","CanvasCircle = function(cfg)","{","	CanvasCircle.superclass.constructor.apply(this, arguments);","};","","CanvasCircle.NAME = \"circle\";","","Y.extend(CanvasCircle, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"circle\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var radius = this.get(\"radius\");","		if(radius)","		{","            this.clear();","            this.drawCircle(0, 0, radius);","			this._closePath();","		}","	}","});","","CanvasCircle.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Radius of the circle","	 *","	 * @config radius","     * @type Number","	 */","	radius: {","		lazyAdd: false","	}","});","Y.CanvasCircle = CanvasCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class CanvasPieSlice"," * @constructor"," */","CanvasPieSlice = function()","{","	CanvasPieSlice.superclass.constructor.apply(this, arguments);","};","CanvasPieSlice.NAME = \"canvasPieSlice\";","Y.extend(CanvasPieSlice, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function(e)","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this._left = x;","        this._right = radius;","        this._top = y;","        this._bottom = radius;","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," });","CanvasPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.CanvasShape.ATTRS);","Y.CanvasPieSlice = CanvasPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the `Graphic` class."," * `CanvasGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Graphic.html\">`Graphic`</a>"," * class will point to the `CanvasGraphic` class."," *"," * @module graphics"," * @class CanvasGraphic"," * @constructor"," */","function CanvasGraphic(config) {","","    CanvasGraphic.superclass.constructor.apply(this, arguments);","}","","CanvasGraphic.NAME = \"canvasGraphic\";","","CanvasGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node","     * instance or a CSS selector string.","     *","     * @config render","     * @type Node | String","     */","    render: {},","","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the graphic instance's position.","     *","     *  @config contentBounds","     *  @type Object","     *  @readOnly","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The outermost html element of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     *  @readOnly","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`.","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`.","	 *","	 * @config height","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines the sizing of the Graphic.","     *","     *  <dl>","     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the","     *      <code>width</code> and <code>height</code> attributes or are determined by the dimensions of the parent element. The","     *      content contained in the Graphic will be sized to fit with in the Graphic instance's dimensions. When using this","     *      setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>","     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the","     *      size and positioning of the content.</dd>","     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code>","     *      and <code>height</code> attributes or are determined by the dimensions of the parent element. The contents of the","     *      Graphic instance are not affected by this setting.</dd>","     *  </dl>","     *","     *","     *  @config autoSize","     *  @type Boolean | String","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.","     *","     *  <dl>","     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary","     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>","     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>","     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>","     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>","     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>","     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>","     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>","     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>","     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>","     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>","     *  </dl>","     *","     * @config preserveAspectRatio","     * @type String","     * @default xMidYMid","     */","    preserveAspectRatio: {","        value: \"xMidYMid\"","    },","","    /**","     * The contentBounds will resize to greater values but not smaller values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown","     * @type Boolean","     */","    resizeDown: {","        value: false","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","	/**","	 * Indicates whether the `Graphic` and its children are visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(CanvasGraphic, Y.GraphicBase, {","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function(attr, value)","	{","		var host = this,","            redrawAttrs = {","                autoDraw: true,","                autoSize: true,","                preserveAspectRatio: true,","                resizeDown: true","            },","            key,","            forceRedraw = false;","		AttributeLite.prototype.set.apply(host, arguments);","        if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)","        {","            if(Y_LANG.isString && redrawAttrs[attr])","            {","                forceRedraw = true;","            }","            else if(Y_LANG.isObject(attr))","            {","                for(key in redrawAttrs)","                {","                    if(redrawAttrs.hasOwnProperty(key) && attr[key])","                    {","                        forceRedraw = true;","                        break;","                    }","                }","            }","        }","        if(forceRedraw)","        {","            host._redraw();","        }","	},","","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = Y.one(this._node),","            xy;","        if(node)","        {","            xy = node.getXY();","        }","        return xy;","    },","","	/**","     * Initializes the class.","     *","     * @method initializer","     * @param {Object} config Optional attributes","     * @private","     */","    initializer: function(config) {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","            w = this.get(\"width\") || 0,","            h = this.get(\"height\") || 0;","        this._shapes = {};","        this._redrawQueue = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = DOCUMENT.createElement('div');","        this._node.style.position = \"absolute\";","        this._node.style.visibility = visibility;","        this.set(\"width\", w);","        this.set(\"height\", h);","        if(render)","        {","            this.render(render);","        }","    },","","    /**","     * Adds the graphics node to the dom.","     *","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            node = this._node,","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(node);","        node.style.display = \"block\";","        node.style.position = \"absolute\";","        node.style.left = \"0px\";","        node.style.top = \"0px\";","        this.set(\"width\", w);","        this.set(\"height\", h);","        this.parentNode = parentNode;","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.removeAllShapes();","        if(this._node)","        {","            this._removeChildren(this._node);","            Y.one(this._node).destroy();","        }","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var shapeClass = this._getShapeClass(cfg.type),","            shape = new shapeClass(cfg);","        this._appendShape(shape);","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\"))","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof CanvasShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && shape instanceof CanvasShape)","        {","            shape._destroy();","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","        return shape;","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param {HTMLElement} node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node && node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Returns a shape class. Used by `addShape`.","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class.","     * @return Function","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.CanvasCircle,","        rect: Y.CanvasRect,","        path: Y.CanvasPath,","        ellipse: Y.CanvasEllipse,","        pieslice: Y.CanvasPieSlice","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        var shape = this._shapes[id];","        return shape;","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method();","        this.set(\"autoDraw\", autoDraw);","    },","","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var autoSize = this.get(\"autoSize\"),","            preserveAspectRatio = this.get(\"preserveAspectRatio\"),","            box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds,","            contentWidth,","            contentHeight,","            w,","            h,","            xScale,","            yScale,","            translateX = 0,","            translateY = 0,","            matrix,","            node = this.get(\"node\");","        if(autoSize)","        {","            if(autoSize == \"sizeContentToGraphic\")","            {","                contentWidth = box.right - box.left;","                contentHeight = box.bottom - box.top;","                w = parseFloat(Y_DOM.getComputedStyle(node, \"width\"));","                h = parseFloat(Y_DOM.getComputedStyle(node, \"height\"));","                matrix = new Y.Matrix();","                if(preserveAspectRatio == \"none\")","                {","                    xScale = w/contentWidth;","                    yScale = h/contentHeight;","                }","                else","                {","                    if(contentWidth/contentHeight !== w/h)","                    {","                        if(contentWidth * h/contentHeight > w)","                        {","                            xScale = yScale = w/contentWidth;","                            translateY = this._calculateTranslate(preserveAspectRatio.slice(5).toLowerCase(), contentHeight * w/contentWidth, h);","                        }","                        else","                        {","                            xScale = yScale = h/contentHeight;","                            translateX = this._calculateTranslate(preserveAspectRatio.slice(1, 4).toLowerCase(), contentWidth * h/contentHeight, w);","                        }","                    }","                }","                Y_DOM.setStyle(node, \"transformOrigin\", \"0% 0%\");","                translateX = translateX - (box.left * xScale);","                translateY = translateY - (box.top * yScale);","                matrix.translate(translateX, translateY);","                matrix.scale(xScale, yScale);","                Y_DOM.setStyle(node, \"transform\", matrix.toCSSText());","            }","            else","            {","                this.set(\"width\", box.right);","                this.set(\"height\", box.bottom);","            }","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","    },","","    /**","     * Determines the value for either an x or y value to be used for the <code>translate</code> of the Graphic.","     *","     * @method _calculateTranslate","     * @param {String} position The position for placement. Possible values are min, mid and max.","     * @param {Number} contentSize The total size of the content.","     * @param {Number} boundsSize The total size of the Graphic.","     * @return Number","     * @private","     */","    _calculateTranslate: function(position, contentSize, boundsSize)","    {","        var ratio = boundsSize - contentSize,","            coord;","        switch(position)","        {","            case \"mid\" :","                coord = ratio * 0.5;","            break;","            case \"max\" :","                coord = ratio;","            break;","            default :","                coord = 0;","            break;","        }","        return coord;","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds. Used internally","     * by `Shape` instances.","     *","     * @method addToRedrawQueue","     * @param Shape shape The shape instance to add to the queue","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object}","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {};","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;","                box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;","                box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;","                box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;","            }","        }","        box.left = Y_LANG.isNumber(box.left) ? box.left : 0;","        box.top = Y_LANG.isNumber(box.top) ? box.top : 0;","        box.right = Y_LANG.isNumber(box.right) ? box.right : 0;","        box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;","        this._contentBounds = box;","        return box;","    },","","    /**","     * Inserts shape on the top of the tree.","     *","     * @method _toFront","     * @param {CanvasShape} Shape to add.","     * @private","     */","    _toFront: function(shape)","    {","        var contentNode = this.get(\"node\");","        if(shape instanceof Y.CanvasShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            contentNode.appendChild(shape);","        }","    },","","    /**","     * Inserts shape as the first child of the content node.","     *","     * @method _toBack","     * @param {CanvasShape} Shape to add.","     * @private","     */","    _toBack: function(shape)","    {","        var contentNode = this.get(\"node\"),","            targetNode;","        if(shape instanceof Y.CanvasShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            targetNode = contentNode.firstChild;","            if(targetNode)","            {","                contentNode.insertBefore(shape, targetNode);","            }","            else","            {","                contentNode.appendChild(shape);","            }","        }","    }","});","","Y.CanvasGraphic = CanvasGraphic;","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].lines = {"1":0,"3":0,"37":0,"41":0,"89":0,"90":0,"91":0,"94":0,"95":0,"101":0,"112":0,"124":0,"126":0,"128":0,"129":0,"131":0,"133":0,"134":0,"149":0,"150":0,"151":0,"152":0,"163":0,"165":0,"176":0,"179":0,"180":0,"181":0,"196":0,"209":0,"210":0,"223":0,"224":0,"237":0,"245":0,"247":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"264":0,"266":0,"267":0,"268":0,"269":0,"270":0,"271":0,"272":0,"275":0,"276":0,"289":0,"290":0,"303":0,"304":0,"316":0,"321":0,"322":0,"323":0,"324":0,"325":0,"326":0,"342":0,"343":0,"359":0,"360":0,"372":0,"389":0,"390":0,"392":0,"393":0,"394":0,"395":0,"396":0,"397":0,"398":0,"399":0,"400":0,"401":0,"402":0,"403":0,"404":0,"405":0,"406":0,"407":0,"408":0,"409":0,"424":0,"425":0,"439":0,"440":0,"452":0,"468":0,"470":0,"471":0,"472":0,"473":0,"474":0,"475":0,"476":0,"477":0,"478":0,"479":0,"480":0,"481":0,"482":0,"483":0,"484":0,"486":0,"500":0,"504":0,"505":0,"506":0,"507":0,"508":0,"509":0,"510":0,"526":0,"528":0,"529":0,"530":0,"531":0,"532":0,"533":0,"548":0,"560":0,"561":0,"562":0,"563":0,"565":0,"566":0,"567":0,"568":0,"569":0,"570":0,"571":0,"573":0,"574":0,"575":0,"576":0,"590":0,"591":0,"592":0,"593":0,"594":0,"595":0,"596":0,"597":0,"613":0,"614":0,"615":0,"616":0,"617":0,"618":0,"619":0,"620":0,"621":0,"622":0,"623":0,"624":0,"642":0,"655":0,"657":0,"659":0,"661":0,"664":0,"666":0,"671":0,"674":0,"678":0,"681":0,"684":0,"687":0,"688":0,"689":0,"691":0,"693":0,"694":0,"695":0,"696":0,"697":0,"698":0,"699":0,"702":0,"704":0,"705":0,"706":0,"716":0,"717":0,"728":0,"729":0,"730":0,"740":0,"741":0,"743":0,"745":0,"757":0,"777":0,"779":0,"781":0,"782":0,"786":0,"787":0,"789":0,"790":0,"794":0,"796":0,"797":0,"801":0,"802":0,"804":0,"805":0,"807":0,"808":0,"810":0,"811":0,"812":0,"813":0,"814":0,"816":0,"817":0,"821":0,"823":0,"824":0,"826":0,"837":0,"858":0,"859":0,"860":0,"861":0,"862":0,"863":0,"864":0,"865":0,"866":0,"868":0,"870":0,"872":0,"874":0,"875":0,"876":0,"877":0,"878":0,"879":0,"885":0,"887":0,"888":0,"892":0,"893":0,"895":0,"897":0,"898":0,"899":0,"900":0,"901":0,"903":0,"904":0,"908":0,"910":0,"911":0,"912":0,"914":0,"917":0,"928":0,"929":0,"930":0,"931":0,"932":0,"933":0,"934":0,"935":0,"936":0,"937":0,"938":0,"939":0,"959":0,"960":0,"973":0,"978":0,"979":0,"982":0,"983":0,"984":0,"985":0,"988":0,"1002":0,"1011":0,"1013":0,"1014":0,"1015":0,"1016":0,"1017":0,"1019":0,"1020":0,"1021":0,"1022":0,"1023":0,"1024":0,"1036":0,"1037":0,"1039":0,"1041":0,"1043":0,"1045":0,"1047":0,"1049":0,"1051":0,"1052":0,"1055":0,"1067":0,"1069":0,"1070":0,"1071":0,"1074":0,"1076":0,"1086":0,"1097":0,"1100":0,"1101":0,"1102":0,"1103":0,"1104":0,"1106":0,"1108":0,"1110":0,"1112":0,"1126":0,"1127":0,"1129":0,"1133":0,"1134":0,"1137":0,"1138":0,"1150":0,"1151":0,"1162":0,"1163":0,"1174":0,"1178":0,"1189":0,"1193":0,"1194":0,"1195":0,"1207":0,"1219":0,"1231":0,"1232":0,"1243":0,"1263":0,"1316":0,"1321":0,"1322":0,"1323":0,"1324":0,"1326":0,"1328":0,"1329":0,"1330":0,"1331":0,"1345":0,"1347":0,"1349":0,"1361":0,"1367":0,"1369":0,"1370":0,"1371":0,"1372":0,"1373":0,"1374":0,"1375":0,"1376":0,"1377":0,"1379":0,"1381":0,"1385":0,"1387":0,"1388":0,"1392":0,"1394":0,"1395":0,"1397":0,"1401":0,"1402":0,"1404":0,"1405":0,"1411":0,"1426":0,"1428":0,"1429":0,"1431":0,"1444":0,"1448":0,"1450":0,"1451":0,"1452":0,"1454":0,"1456":0,"1458":0,"1459":0,"1461":0,"1462":0,"1466":0,"1469":0,"1470":0,"1474":0,"1479":0,"1480":0,"1493":0,"1494":0,"1495":0,"1507":0,"1508":0,"1520":0,"1521":0,"1533":0,"1544":0,"1555":0,"1566":0,"1567":0,"1578":0,"1609":0,"1610":0,"1611":0,"1612":0,"1613":0,"1615":0,"1627":0,"1635":0,"1637":0,"1639":0,"1640":0,"1642":0,"1645":0,"1648":0,"1649":0,"1650":0,"1651":0,"1653":0,"1655":0,"1666":0,"1667":0,"1678":0,"1679":0,"1680":0,"1681":0,"1682":0,"1693":0,"1695":0,"1697":0,"1709":0,"1710":0,"1712":0,"1713":0,"1715":0,"1717":0,"1719":0,"1720":0,"1721":0,"1722":0,"1724":0,"1726":0,"1730":0,"1734":0,"1735":0,"1736":0,"1737":0,"1739":0,"1740":0,"1742":0,"1743":0,"1745":0,"1747":0,"1748":0,"1750":0,"1752":0,"1753":0,"1757":0,"1763":0,"1764":0,"1765":0,"1766":0,"1767":0,"1780":0,"1782":0,"1784":0,"1786":0,"1788":0,"1792":0,"1794":0,"1795":0,"1798":0,"1799":0,"1801":0,"1803":0,"1804":0,"1805":0,"1807":0,"1809":0,"1810":0,"1826":0,"1838":0,"1839":0,"1841":0,"1843":0,"1844":0,"1845":0,"1846":0,"1849":0,"1850":0,"1852":0,"1854":0,"1856":0,"1858":0,"1861":0,"1875":0,"1880":0,"1882":0,"1883":0,"1884":0,"1885":0,"1887":0,"1902":0,"1912":0,"1914":0,"1915":0,"1917":0,"1918":0,"1919":0,"1920":0,"1922":0,"1923":0,"1924":0,"1926":0,"1929":0,"1930":0,"1931":0,"1941":0,"1942":0,"1944":0,"1955":0,"1956":0,"1958":0,"1971":0,"1979":0,"1981":0,"1982":0,"1983":0,"1985":0,"1986":0,"1987":0,"1988":0,"1989":0,"1991":0,"1993":0,"1997":0,"2001":0,"2012":0,"2013":0,"2015":0,"2019":0,"2031":0,"2033":0,"2034":0,"2035":0,"2040":0,"2051":0,"2088":0,"2089":0,"2090":0,"2091":0,"2096":0,"2112":0,"2125":0,"2130":0,"2131":0,"2133":0,"2135":0,"2189":0,"2191":0,"2193":0,"2195":0,"2253":0,"2255":0,"2256":0,"2258":0,"2260":0,"2263":0,"2264":0,"2301":0,"2303":0,"2305":0,"2306":0,"2308":0,"2311":0,"2312":0,"2313":0,"2344":0,"2346":0,"2348":0,"2363":0,"2367":0,"2379":0,"2381":0,"2383":0,"2384":0,"2402":0,"2403":0,"2415":0,"2420":0,"2421":0,"2422":0,"2423":0,"2424":0,"2425":0,"2426":0,"2427":0,"2428":0,"2438":0,"2442":0,"2452":0,"2453":0,"2458":0,"2459":0,"2472":0,"2473":0,"2478":0,"2479":0,"2495":0,"2499":0,"2511":0,"2513":0,"2515":0,"2516":0,"2534":0,"2536":0,"2537":0,"2538":0,"2541":0,"2542":0,"2554":0,"2556":0,"2559":0,"2561":0,"2579":0,"2581":0,"2582":0,"2583":0,"2586":0,"2596":0,"2601":0,"2602":0,"2604":0,"2606":0,"2620":0,"2625":0,"2626":0,"2628":0,"2630":0,"2634":0,"2646":0,"2648":0,"2651":0,"2653":0,"2671":0,"2672":0,"2674":0,"2675":0,"2676":0,"2681":0,"2691":0,"2692":0,"2697":0,"2710":0,"2711":0,"2716":0,"2730":0,"2738":0,"2740":0,"2742":0,"2743":0,"2761":0,"2766":0,"2767":0,"2768":0,"2769":0,"2770":0,"2771":0,"2772":0,"2775":0,"2813":0,"2825":0,"2827":0,"2830":0,"2832":0,"2851":0,"2856":0,"2857":0,"2859":0,"2861":0,"2877":0,"2893":0,"2909":0,"2922":0,"2924":0,"2926":0,"2939":0,"2941":0,"2943":0,"3016":0,"3021":0,"3022":0,"3024":0,"3026":0,"3039":0,"3044":0,"3045":0,"3047":0,"3049":0,"3077":0,"3078":0,"3083":0,"3095":0,"3104":0,"3105":0,"3107":0,"3109":0,"3111":0,"3113":0,"3115":0,"3117":0,"3118":0,"3123":0,"3125":0,"3155":0,"3157":0,"3159":0,"3161":0,"3172":0,"3176":0,"3177":0,"3178":0,"3184":0,"3185":0,"3186":0,"3187":0,"3188":0,"3189":0,"3191":0,"3202":0,"3206":0,"3207":0,"3208":0,"3209":0,"3210":0,"3211":0,"3212":0,"3213":0,"3214":0,"3215":0,"3225":0,"3226":0,"3228":0,"3229":0,"3242":0,"3243":0,"3245":0,"3247":0,"3249":0,"3250":0,"3262":0,"3264":0,"3266":0,"3270":0,"3282":0,"3284":0,"3286":0,"3289":0,"3291":0,"3292":0,"3294":0,"3296":0,"3298":0,"3308":0,"3310":0,"3312":0,"3314":0,"3317":0,"3326":0,"3338":0,"3340":0,"3341":0,"3343":0,"3344":0,"3345":0,"3359":0,"3362":0,"3364":0,"3366":0,"3368":0,"3372":0,"3374":0,"3388":0,"3389":0,"3391":0,"3393":0,"3420":0,"3421":0,"3432":0,"3433":0,"3434":0,"3435":0,"3447":0,"3449":0,"3451":0,"3462":0,"3475":0,"3477":0,"3479":0,"3480":0,"3481":0,"3482":0,"3483":0,"3484":0,"3486":0,"3487":0,"3491":0,"3493":0,"3495":0,"3496":0,"3500":0,"3501":0,"3505":0,"3506":0,"3507":0,"3508":0,"3509":0,"3510":0,"3514":0,"3515":0,"3518":0,"3520":0,"3521":0,"3537":0,"3539":0,"3542":0,"3543":0,"3545":0,"3546":0,"3548":0,"3549":0,"3551":0,"3564":0,"3566":0,"3567":0,"3569":0,"3570":0,"3571":0,"3572":0,"3573":0,"3574":0,"3575":0,"3577":0,"3579":0,"3592":0,"3597":0,"3599":0,"3601":0,"3602":0,"3603":0,"3604":0,"3605":0,"3606":0,"3609":0,"3610":0,"3611":0,"3612":0,"3613":0,"3614":0,"3626":0,"3627":0,"3629":0,"3631":0,"3633":0,"3646":0,"3648":0,"3650":0,"3652":0,"3654":0,"3655":0,"3657":0,"3661":0,"3667":0};
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].functions = {"CanvasDrawing:37":0,"_toRGBA:88":0,"_toRGB:111":0,"setSize:123":0,"_updateCoords:147":0,"_clearAndUpdateCoords:161":0,"_updateNodePosition:174":0,"_updateDrawingQueue:194":0,"lineTo:207":0,"relativeLineTo:221":0,"_lineTo:235":0,"moveTo:287":0,"relativeMoveTo:301":0,"_moveTo:315":0,"curveTo:341":0,"relativeCurveTo:358":0,"_curveTo:371":0,"quadraticCurveTo:423":0,"relativeQuadraticCurveTo:438":0,"_quadraticCurveTo:451":0,"drawCircle:499":0,"drawDiamond:524":0,"drawEllipse:547":0,"drawRect:589":0,"drawRoundRect:612":0,"drawWedge:640":0,"end:715":0,"closePath:726":0,"clear:739":0,"_getLinearGradient:756":0,"_getRadialGradient:836":0,"_initProps:927":0,"_createGraphic:958":0,"getBezierData:972":0,"_setCurveBoundingBox:1000":0,"_trackSize:1035":0,"CanvasShape:1067":0,"init:1084":0,"initializer:1095":0,"_setGraphic:1124":0,"addClass:1148":0,"removeClass:1160":0,"getXY:1172":0,"setXY:1187":0,"contains:1205":0,"test:1217":0,"compareTo:1230":0,"_getDefaultFill:1242":0,"_getDefaultStroke:1261":0,"createNode:1314":0,"on:1343":0,"_setStrokeProps:1359":0,"set:1424":0,"_setFillProps:1442":0,"translate:1491":0,"translateX:1505":0,"translateY:1518":0,"skew:1531":0,"skewX:1542":0,"skewY:1553":0,"rotate:1564":0,"scale:1576":0,"_addTransform:1607":0,"_updateTransform:1625":0,"_updateHandler:1664":0,"_draw:1676":0,"_closePath:1691":0,"_strokeAndFill:1778":0,"_drawDashedLine:1824":0,"getBounds:1873":0,"_getContentRect:1900":0,"toFront:1939":0,"toBack:1953":0,"_parsePathData:1969":0,"destroy:2010":0,"_destroy:2029":0,"valueFn:2049":0,"setter:2086":0,"getter:2094":0,"getter:2110":0,"valueFn:2123":0,"setter:2128":0,"setter:2188":0,"setter:2251":0,"setter:2299":0,"setter:2342":0,"getter:2361":0,"CanvasPath:2379":0,"_draw:2400":0,"createNode:2413":0,"end:2436":0,"getter:2450":0,"setter:2456":0,"getter:2470":0,"setter:2476":0,"getter:2493":0,"CanvasRect:2511":0,"_draw:2532":0,"CanvasEllipse:2554":0,"_draw:2577":0,"setter:2594":0,"getter:2599":0,"setter:2618":0,"getter:2623":0,"CanvasCircle:2646":0,"_draw:2669":0,"setter:2689":0,"getter:2695":0,"setter:2708":0,"getter:2714":0,"CanvasPieSlice:2738":0,"_draw:2759":0,"CanvasGraphic:2825":0,"valueFn:2849":0,"setter:2854":0,"getter:2875":0,"getter:2891":0,"getter:2907":0,"setter:2920":0,"setter:2937":0,"getter:3014":0,"setter:3019":0,"getter:3037":0,"setter:3042":0,"setter:3075":0,"set:3093":0,"getXY:3153":0,"initializer:3171":0,"render:3201":0,"destroy:3223":0,"addShape:3240":0,"_appendShape:3260":0,"removeShape:3280":0,"removeAllShapes:3306":0,"clear:3325":0,"_removeChildren:3336":0,"_toggleVisible:3357":0,"_getShapeClass:3386":0,"getShapeById:3418":0,"batch:3430":0,"_getDocFrag:3445":0,"_redraw:3460":0,"_calculateTranslate:3535":0,"addToRedrawQueue:3562":0,"_getUpdatedContentBounds:3590":0,"_toFront:3624":0,"_toBack:3644":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].coveredLines = 899;
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].coveredFunctions = 148;
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1);
YUI.add('graphics-canvas', function (Y, NAME) {

_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "(anonymous 1)", 1);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3);
var IMPLEMENTATION = "canvas",
    SHAPE = "shape",
	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,
    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\.][0-9]*/g,
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
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 468);
for(i = 0; i < len; i = i + 4)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 470);
cpx = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 471);
cpy = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 472);
x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 473);
y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 474);
this._drawingComplete = false;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 475);
right = Math.max(x, cpx);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 476);
bottom = Math.max(y, cpy);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 477);
left = Math.min(x, cpx);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 478);
top = Math.min(y, cpy);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 479);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 480);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 481);
pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 482);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 483);
this._updateDrawingQueue(["quadraticCurveTo", cpx, cpy, x, y]);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 484);
this._updateCoords(x, y);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 486);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawCircle", 499);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 500);
var startAngle = 0,
            endAngle = 2 * Math.PI,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            circum = radius * 2;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 504);
circum += wt;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 505);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 506);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 507);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 508);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 509);
this._updateDrawingQueue(["arc", x + radius, y + radius, radius, startAngle, endAngle, false]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 510);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawDiamond", 524);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 526);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 528);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 529);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 530);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 531);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 532);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 533);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawEllipse", 547);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 548);
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

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 560);
ax = centerX + Math.cos(0) * radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 561);
ay = centerY + Math.sin(0) * yRadius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 562);
this.moveTo(ax, ay);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 563);
for(i = 0; i < l; i++)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 565);
angle += theta;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 566);
angleMid = angle - (theta / 2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 567);
bx = centerX + Math.cos(angle) * radius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 568);
by = centerY + Math.sin(angle) * yRadius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 569);
cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 570);
cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 571);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 573);
this._trackSize(x + w + wt, y + h + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 574);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 575);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 576);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawRect", 589);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 590);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 591);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 592);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 593);
this.lineTo(x + w, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 594);
this.lineTo(x + w, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 595);
this.lineTo(x, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 596);
this.lineTo(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 597);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawRoundRect", 612);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 613);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 614);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 615);
this.moveTo( x, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 616);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 617);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 618);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 619);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 620);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 621);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 622);
this.lineTo(x + ew, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 623);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 624);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawWedge", 640);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 642);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 655);
yRadius = yRadius || radius;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 657);
this._drawingComplete = false;
        // move to x,y position
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 659);
this._updateDrawingQueue(["moveTo", x, y]);

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 661);
yRadius = yRadius || radius;

        // limit sweep to reasonable numbers
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 664);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 666);
arc = 360;
        }

        // First we calculate how many segments are needed
        // for a smooth arc.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 671);
segs = Math.ceil(Math.abs(arc) / 45);

        // Now calculate the sweep of each segment.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 674);
segAngle = arc / segs;

        // The math requires radians rather than degrees. To convert from degrees
        // use the formula (degrees/180)*Math.PI to get radians.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 678);
theta = -(segAngle / 180) * Math.PI;

        // convert angle startAngle to radians
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 681);
angle = (startAngle / 180) * Math.PI;

        // draw the curve in segments no larger than 45 degrees.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 684);
if(segs > 0)
        {
            // draw a line from the center to the start of the curve
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 687);
ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 688);
ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 689);
this.lineTo(ax, ay);
            // Loop for drawing curve segments
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 691);
for(i = 0; i < segs; ++i)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 693);
angle += theta;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 694);
angleMid = angle - (theta / 2);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 695);
bx = x + Math.cos(angle) * radius;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 696);
by = y + Math.sin(angle) * yRadius;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 697);
cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 698);
cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 699);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
            }
            // close the wedge by drawing a line to the center
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 702);
this._updateDrawingQueue(["lineTo", x, y]);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 704);
this._trackSize(-wt , -wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 705);
this._trackSize((radius * 2) + wt, (radius * 2) + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 706);
return this;
    },

    /**
     * Completes a drawing operation.
     *
     * @method end
     * @chainable
     */
    end: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "end", 715);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 716);
this._closePath();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 717);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "closePath", 726);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 728);
this._updateDrawingQueue(["closePath"]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 729);
this._updateDrawingQueue(["beginPath"]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 730);
return this;
    },

	/**
	 * Clears the graphics object.
	 *
	 * @method clear
     * @chainable
	 */
    clear: function() {
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "clear", 739);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 740);
this._initProps();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 741);
if(this.node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 743);
this._context.clearRect(0, 0, this.node.width, this.node.height);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 745);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getLinearGradient", 756);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 757);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 777);
if(Math.abs(tanRadians) * w/2 >= h/2)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 779);
if(r < 180)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 781);
y1 = y;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 782);
y2 = y + h;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 786);
y1 = y + h;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 787);
y2 = y;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 789);
x1 = cx - ((cy - y1)/tanRadians);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 790);
x2 = cx - ((cy - y2)/tanRadians);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 794);
if(r > 90 && r < 270)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 796);
x1 = x + w;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 797);
x2 = x;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 801);
x1 = x;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 802);
x2 = x + w;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 804);
y1 = ((tanRadians * (cx - x1)) - cy) * -1;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 805);
y2 = ((tanRadians * (cx - x2)) - cy) * -1;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 807);
gradient = this._context.createLinearGradient(x1, y1, x2, y2);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 808);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 810);
stop = stops[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 811);
opacity = stop.opacity;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 812);
color = stop.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 813);
offset = stop.offset;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 814);
if(isNumber(opacity))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 816);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 817);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 821);
color = TORGB(color);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 823);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 824);
gradient.addColorStop(offset, color);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 826);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getRadialGradient", 836);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 837);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 858);
xc = x + w/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 859);
yc = y + h/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 860);
x1 = w * fx;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 861);
y1 = h * fy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 862);
x2 = x + w/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 863);
y2 = y + h/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 864);
r2 = w * r;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 865);
d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 866);
if(d >= r2)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 868);
ratio = d/r2;
            //hack. gradient won't show if it is exactly on the edge of the arc
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 870);
if(ratio === 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 872);
ratio = 1.01;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 874);
xn = (x1 - xc)/ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 875);
yn = (y1 - yc)/ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 876);
xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 877);
yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 878);
x1 = xc + xn;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 879);
y1 = yc + yn;
        }

        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.
        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work.
        //Instead, adjust the color stops to reflect the smaller radius.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 885);
if(r >= 0.5)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 887);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 888);
stopMultiplier = 1;
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 892);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 893);
stopMultiplier = r * 2;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 895);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 897);
stop = stops[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 898);
opacity = stop.opacity;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 899);
color = stop.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 900);
offset = stop.offset;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 901);
if(isNumber(opacity))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 903);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 904);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 908);
color = TORGB(color);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 910);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 911);
offset *= stopMultiplier;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 912);
if(offset <= 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 914);
gradient.addColorStop(offset, color);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 917);
return gradient;
    },


    /**
     * Clears all values
     *
     * @method _initProps
     * @private
     */
    _initProps: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_initProps", 927);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 928);
this._methods = [];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 929);
this._lineToMethods = [];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 930);
this._xcoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 931);
this._ycoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 932);
this._width = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 933);
this._height = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 934);
this._left = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 935);
this._top = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 936);
this._right = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 937);
this._bottom = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 938);
this._currentX = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 939);
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
    _createGraphic: function(config) {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_createGraphic", 958);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 959);
var graphic = Y.config.doc.createElement('canvas');
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 960);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getBezierData", 972);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 973);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 978);
for (i = 0; i < n; ++i){
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 979);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 982);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 983);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 984);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 985);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 988);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setCurveBoundingBox", 1000);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1002);
var i = 0,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            xy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1011);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1013);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1014);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1015);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1016);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1017);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1019);
left = Math.round(left * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1020);
right = Math.round(right * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1021);
top = Math.round(top * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1022);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1023);
this._trackSize(right + wt, bottom + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1024);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_trackSize", 1035);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1036);
if (w > this._right) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1037);
this._right = w;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1039);
if(w < this._left)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1041);
this._left = w;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1043);
if (h < this._top)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1045);
this._top = h;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1047);
if (h > this._bottom)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1049);
this._bottom = h;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1051);
this._width = this._right - this._left;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1052);
this._height = this._bottom - this._top;
    }
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1055);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1067);
CanvasShape = function(cfg)
{
    _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasShape", 1067);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1069);
this._transforms = [];
    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1070);
this.matrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1071);
CanvasShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1074);
CanvasShape.NAME = "shape";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1076);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "init", 1084);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1086);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "initializer", 1095);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1097);
var host = this,
            graphic = cfg.graphic,
            data = this.get("data");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1100);
host._initProps();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1101);
host.createNode();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1102);
host._xcoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1103);
host._ycoords = [0];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1104);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1106);
this._setGraphic(graphic);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1108);
if(data)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1110);
host._parsePathData(data);
        }
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1112);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setGraphic", 1124);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1126);
var graphic;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1127);
if(render instanceof Y.CanvasGraphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1129);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1133);
render = Y.one(render);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1134);
graphic = new Y.CanvasGraphic({
                render: render
            });
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1137);
graphic._appendShape(this);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1138);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addClass", 1148);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1150);
var node = Y.one(this.get("node"));
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1151);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeClass", 1160);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1162);
var node = Y.one(this.get("node"));
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1163);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getXY", 1172);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1174);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1178);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setXY", 1187);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1189);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = xy[0] - parentXY[0],
			y = xy[1] - parentXY[1];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1193);
this._set("x", x);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1194);
this._set("y", y);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1195);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "contains", 1205);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1207);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "test", 1217);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1219);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "compareTo", 1230);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1231);
var node = this.node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1232);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDefaultFill", 1242);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1243);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDefaultStroke", 1261);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1263);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "createNode", 1314);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1316);
var host = this,
            node = Y.config.doc.createElement('canvas'),
			id = host.get("id"),
            concat = host._camelCaseConcat,
            name = host.name;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1321);
host._context = node.getContext('2d');
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1322);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1323);
node.style.overflow = "visible";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1324);
if(!host.get("visible"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1326);
node.style.visibility = "hidden";
        }
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1328);
node.setAttribute("id", id);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1329);
id = "#" + id;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1330);
host.node = node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1331);
host.addClass(_getClassName(SHAPE) + " " + _getClassName(concat(IMPLEMENTATION, SHAPE)) + " " + _getClassName(name) + " " + _getClassName(concat(IMPLEMENTATION, name)));
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "on", 1343);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1345);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1347);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1349);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setStrokeProps", 1359);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1361);
var color,
			weight,
			opacity,
			linejoin,
			linecap,
			dashstyle;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1367);
if(stroke)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1369);
color = stroke.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1370);
weight = PARSE_FLOAT(stroke.weight);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1371);
opacity = PARSE_FLOAT(stroke.opacity);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1372);
linejoin = stroke.linejoin || "round";
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1373);
linecap = stroke.linecap || "butt";
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1374);
dashstyle = stroke.dashstyle;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1375);
this._miterlimit = null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1376);
this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1377);
this._strokeWeight = weight;

            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1379);
if (IS_NUMBER(weight) && weight > 0)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1381);
this._stroke = 1;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1385);
this._stroke = 0;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1387);
if (IS_NUMBER(opacity)) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1388);
this._strokeStyle = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1392);
this._strokeStyle = color;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1394);
this._linecap = linecap;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1395);
if(linejoin == "round" || linejoin == "bevel")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1397);
this._linejoin = linejoin;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1401);
linejoin = parseInt(linejoin, 10);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1402);
if(IS_NUMBER(linejoin))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1404);
this._miterlimit =  Math.max(linejoin, 1);
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1405);
this._linejoin = "miter";
                }
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1411);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "set", 1424);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1426);
var host = this,
			val = arguments[0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1428);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1429);
if(host.initialized)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1431);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setFillProps", 1442);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1444);
var isNumber = IS_NUMBER,
			color,
			opacity,
			type;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1448);
if(fill)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1450);
color = fill.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1451);
type = fill.type;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1452);
if(type == "linear" || type == "radial")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1454);
this._fillType = type;
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1456);
if(color)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1458);
opacity = fill.opacity;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1459);
if (isNumber(opacity))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1461);
opacity = Math.max(0, Math.min(1, opacity));
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1462);
color = this._toRGBA(color, opacity);
                }
                else
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1466);
color = TORGB(color);
                }

                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1469);
this._fillColor = color;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1470);
this._fillType = 'solid';
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1474);
this._fillColor = null;
            }}
        }
		else
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1479);
this._fillType = null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1480);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translate", 1491);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1493);
this._translateX += x;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1494);
this._translateY += y;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1495);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translateX", 1505);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1507);
this._translateX += x;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1508);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translateY", 1518);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1520);
this._translateY += y;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1521);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skew", 1531);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1533);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skewX", 1542);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1544);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skewY", 1553);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1555);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "rotate", 1564);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1566);
this._rotation = deg;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1567);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "scale", 1576);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1578);
this._addTransform("scale", arguments);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_addTransform", 1607);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1609);
args = Y.Array(args);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1610);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1611);
args.unshift(type);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1612);
this._transforms.push(args);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1613);
if(this.initialized)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1615);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateTransform", 1625);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1627);
var node = this.node,
			key,
			transform,
			transformOrigin = this.get("transformOrigin"),
            matrix = this.matrix,
            i,
            len = this._transforms.length;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1635);
if(this._transforms && this._transforms.length > 0)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1637);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1639);
key = this._transforms[i].shift();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1640);
if(key)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1642);
matrix[key].apply(matrix, this._transforms[i]);
                }
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1645);
transform = matrix.toCSSText();
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1648);
this._graphic.addToRedrawQueue(this);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1649);
transformOrigin = (100 * transformOrigin[0]) + "% " + (100 * transformOrigin[1]) + "%";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1650);
Y_DOM.setStyle(node, "transformOrigin", transformOrigin);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1651);
if(transform)
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1653);
Y_DOM.setStyle(node, "transform", transform);
		}
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1655);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateHandler", 1664);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1666);
this._draw();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1667);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 1676);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1678);
var node = this.node;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1679);
this.clear();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1680);
this._closePath();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1681);
node.style.left = this.get("x") + "px";
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1682);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_closePath", 1691);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1693);
if(!this._methods)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1695);
return;
		}
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1697);
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
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1709);
this._context.clearRect(0, 0, node.width, node.height);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1710);
if(this._methods)
        {
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1712);
len = cachedMethods.length;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1713);
if(!len || len < 1)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1715);
return;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1717);
for(i = 0; i < len; ++i)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1719);
methods[i] = cachedMethods[i].concat();
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1720);
args = methods[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1721);
argsLen = (args[0] == "quadraticCurveTo" || args[0] == "bezierCurveTo") ? args.length : 3;
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1722);
for(j = 1; j < argsLen; ++j)
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1724);
if(j % 2 === 0)
					{
						_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1726);
args[j] = args[j] - this._top;
					}
					else
					{
						_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1730);
args[j] = args[j] - this._left;
					}
				}
			}
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1734);
node.setAttribute("width", Math.min(w, 2000));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1735);
node.setAttribute("height", Math.min(2000, h));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1736);
context.beginPath();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1737);
for(i = 0; i < len; ++i)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1739);
args = methods[i].concat();
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1740);
if(args && args.length > 0)
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1742);
method = args.shift();
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1743);
if(method)
					{
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1745);
if(method == "closePath")
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1747);
context.closePath();
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1748);
this._strokeAndFill(context);
                        }
						else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1750);
if(method && method == "lineTo" && this._dashstyle)
						{
							_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1752);
args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);
							_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1753);
this._drawDashedLine.apply(this, args);
						}
						else
						{
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1757);
context[method].apply(context, args);
						}}
					}
				}
			}

            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1763);
this._strokeAndFill(context);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1764);
this._drawingComplete = true;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1765);
this._clearAndUpdateCoords();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1766);
this._updateNodePosition();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1767);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_strokeAndFill", 1778);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1780);
if (this._fillType)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1782);
if(this._fillType == "linear")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1784);
context.fillStyle = this._getLinearGradient();
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1786);
if(this._fillType == "radial")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1788);
context.fillStyle = this._getRadialGradient();
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1792);
context.fillStyle = this._fillColor;
            }}
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1794);
context.closePath();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1795);
context.fill();
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1798);
if (this._stroke) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1799);
if(this._strokeWeight)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1801);
context.lineWidth = this._strokeWeight;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1803);
context.lineCap = this._linecap;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1804);
context.lineJoin = this._linejoin;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1805);
if(this._miterlimit)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1807);
context.miterLimit = this._miterlimit;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1809);
context.strokeStyle = this._strokeStyle;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1810);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_drawDashedLine", 1824);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1826);
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
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1838);
xDelta = Math.cos(radians) * segmentLength;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1839);
yDelta = Math.sin(radians) * segmentLength;

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1841);
for(i = 0; i < segmentCount; ++i)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1843);
context.moveTo(xCurrent, yCurrent);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1844);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1845);
xCurrent += xDelta;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1846);
yCurrent += yDelta;
		}

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1849);
context.moveTo(xCurrent, yCurrent);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1850);
delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1852);
if(delta > dashsize)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1854);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
		}
		else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1856);
if(delta > 0)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1858);
context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);
		}}

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1861);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getBounds", 1873);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1875);
var type = this._type,
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1880);
if(type == "path")
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1882);
x = x + this._left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1883);
y = y + this._top;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1884);
w = this._right - this._left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1885);
h = this._bottom - this._top;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1887);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getContentRect", 1900);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1902);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1912);
if(this._type == "path")
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1914);
transformX = transformX + x;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1915);
transformY = transformY + y;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1917);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1918);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1919);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1920);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1922);
transform = transforms[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1923);
key = transform.shift();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1924);
if(key)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1926);
matrix[key].apply(matrix, transform);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1929);
matrix.translate(-transformX, -transformY);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1930);
contentRect = matrix.getContentRect(w, h, x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1931);
return contentRect;
    },

    /**
     * Places the shape above all other shapes.
     *
     * @method toFront
     */
    toFront: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "toFront", 1939);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1941);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1942);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1944);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "toBack", 1953);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1955);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1956);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1958);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_parsePathData", 1969);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1971);
var method,
            methodSymbol,
            args,
            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),
            i,
            len,
            str,
            symbolToMethod = this._pathSymbolToMethod;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1979);
if(commandArray)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1981);
this.clear();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1982);
len = commandArray.length || 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1983);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1985);
str = commandArray[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1986);
methodSymbol = str.substr(0, 1);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1987);
args = str.substr(1).match(SPLITARGSPATTERN);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1988);
method = symbolToMethod[methodSymbol];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1989);
if(method)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1991);
if(args)
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1993);
this[method].apply(this, args);
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1997);
this[method].apply(this);
                    }
                }
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2001);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "destroy", 2010);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2012);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2013);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2015);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2019);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_destroy", 2029);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2031);
if(this.node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2033);
Y.one(this.node).remove(true);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2034);
this._context = null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2035);
this.node = null;
        }
    }
}, Y.CanvasDrawing.prototype));

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2040);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2049);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2051);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2086);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2088);
this.matrix.init();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2089);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2090);
this._transform = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2091);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2094);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2096);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2110);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2112);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2123);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2125);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2128);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2130);
var node = this.node;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2131);
if(node)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2133);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2135);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2188);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2189);
var node = this.get("node"),
                visibility = val ? "visible" : "hidden";
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2191);
if(node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2193);
node.style.visibility = visibility;
            }
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2195);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2251);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2253);
var fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2255);
fill = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2256);
if(fill && fill.color)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2258);
if(fill.color === undefined || fill.color == "none")
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2260);
fill.color = null;
				}
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2263);
this._setFillProps(fill);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2264);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2299);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2301);
var tmpl = this.get("stroke") || this._getDefaultStroke(),
                wt;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2303);
if(val && val.hasOwnProperty("weight"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2305);
wt = parseInt(val.weight, 10);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2306);
if(!isNaN(wt))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2308);
val.weight = wt;
                }
            }
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2311);
val = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2312);
this._setStrokeProps(val);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2313);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2342);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2344);
if(this.get("node"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2346);
this._parsePathData(val);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2348);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2361);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2363);
return this._graphic;
		}
    }
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2367);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2379);
CanvasPath = function(cfg)
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasPath", 2379);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2381);
CanvasPath.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2383);
CanvasPath.NAME = "path";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2384);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2400);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2402);
this._closePath();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2403);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "createNode", 2413);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2415);
var host = this,
            node = Y.config.doc.createElement('canvas'),
			name = host.name,
            concat = host._camelCaseConcat,
            id = host.get("id");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2420);
host._context = node.getContext('2d');
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2421);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2422);
node.setAttribute("pointer-events", "none");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2423);
node.style.pointerEvents = "none";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2424);
node.style.overflow = "visible";
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2425);
node.setAttribute("id", id);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2426);
id = "#" + id;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2427);
host.node = node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2428);
host.addClass(_getClassName(SHAPE) + " " + _getClassName(concat(IMPLEMENTATION, SHAPE)) + " " + _getClassName(name) + " " + _getClassName(concat(IMPLEMENTATION, name)));
	},

    /**
     * Completes a drawing operation.
     *
     * @method end
     */
    end: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "end", 2436);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2438);
this._draw();
    }
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2442);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2450);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2452);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2453);
return this._width - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2456);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2458);
this._width = val;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2459);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2470);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2472);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2473);
return this._height - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2476);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2478);
this._height = val;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2479);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2493);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2495);
return this._path;
		}
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2499);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2511);
CanvasRect = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasRect", 2511);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2513);
CanvasRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2515);
CanvasRect.NAME = "rect";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2516);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2532);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2534);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2536);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2537);
this.drawRect(0, 0, w, h);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2538);
this._closePath();
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2541);
CanvasRect.ATTRS = Y.CanvasShape.ATTRS;
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2542);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2554);
CanvasEllipse = function(cfg)
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasEllipse", 2554);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2556);
CanvasEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2559);
CanvasEllipse.NAME = "ellipse";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2561);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2577);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2579);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2581);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2582);
this.drawEllipse(0, 0, w, h);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2583);
this._closePath();
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2586);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2594);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2596);
this.set("width", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2599);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2601);
var val = this.get("width");
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2602);
if(val)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2604);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2606);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2618);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2620);
this.set("height", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2623);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2625);
var val = this.get("height");
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2626);
if(val)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2628);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2630);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2634);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2646);
CanvasCircle = function(cfg)
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasCircle", 2646);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2648);
CanvasCircle.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2651);
CanvasCircle.NAME = "circle";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2653);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2669);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2671);
var radius = this.get("radius");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2672);
if(radius)
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2674);
this.clear();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2675);
this.drawCircle(0, 0, radius);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2676);
this._closePath();
		}
	}
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2681);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2689);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2691);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2692);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2695);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2697);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2708);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2710);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2711);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2714);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2716);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2730);
Y.CanvasCircle = CanvasCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class CanvasPieSlice
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2738);
CanvasPieSlice = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasPieSlice", 2738);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2740);
CanvasPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2742);
CanvasPieSlice.NAME = "canvasPieSlice";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2743);
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
	_draw: function(e)
	{
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2759);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2761);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2766);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2767);
this._left = x;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2768);
this._right = radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2769);
this._top = y;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2770);
this._bottom = radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2771);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2772);
this.end();
	}
 });
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2775);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2813);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2825);
function CanvasGraphic(config) {

    _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasGraphic", 2825);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2827);
CanvasGraphic.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2830);
CanvasGraphic.NAME = "canvasGraphic";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2832);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2849);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2851);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2854);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2856);
var node = this._node;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2857);
if(node)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2859);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2861);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2875);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2877);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2891);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2893);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2907);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2909);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2920);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2922);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2924);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2926);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2937);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2939);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2941);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2943);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 3014);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3016);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3019);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3021);
this._x = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3022);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3024);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3026);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 3037);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3039);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3042);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3044);
this._y = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3045);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3047);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3049);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3075);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3077);
this._toggleVisible(val);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3078);
return val;
        }
    }
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3083);
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
	set: function(attr, value)
	{
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "set", 3093);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3095);
var host = this,
            redrawAttrs = {
                autoDraw: true,
                autoSize: true,
                preserveAspectRatio: true,
                resizeDown: true
            },
            key,
            forceRedraw = false;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3104);
AttributeLite.prototype.set.apply(host, arguments);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3105);
if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3107);
if(Y_LANG.isString && redrawAttrs[attr])
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3109);
forceRedraw = true;
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3111);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3113);
for(key in redrawAttrs)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3115);
if(redrawAttrs.hasOwnProperty(key) && attr[key])
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3117);
forceRedraw = true;
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3118);
break;
                    }
                }
            }}
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3123);
if(forceRedraw)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3125);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getXY", 3153);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3155);
var node = Y.one(this._node),
            xy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3157);
if(node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3159);
xy = node.getXY();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3161);
return xy;
    },

	/**
     * Initializes the class.
     *
     * @method initializer
     * @param {Object} config Optional attributes
     * @private
     */
    initializer: function(config) {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "initializer", 3171);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3172);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden",
            w = this.get("width") || 0,
            h = this.get("height") || 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3176);
this._shapes = {};
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3177);
this._redrawQueue = {};
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3178);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3184);
this._node = DOCUMENT.createElement('div');
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3185);
this._node.style.position = "absolute";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3186);
this._node.style.visibility = visibility;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3187);
this.set("width", w);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3188);
this.set("height", h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3189);
if(render)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3191);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "render", 3201);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3202);
var parentNode = Y.one(render),
            node = this._node,
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3206);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3207);
parentNode.appendChild(node);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3208);
node.style.display = "block";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3209);
node.style.position = "absolute";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3210);
node.style.left = "0px";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3211);
node.style.top = "0px";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3212);
this.set("width", w);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3213);
this.set("height", h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3214);
this.parentNode = parentNode;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3215);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "destroy", 3223);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3225);
this.removeAllShapes();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3226);
if(this._node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3228);
this._removeChildren(this._node);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3229);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addShape", 3240);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3242);
cfg.graphic = this;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3243);
if(!this.get("visible"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3245);
cfg.visible = false;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3247);
var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3249);
this._appendShape(shape);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3250);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_appendShape", 3260);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3262);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3264);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3266);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3270);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeShape", 3280);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3282);
if(!(shape instanceof CanvasShape))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3284);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3286);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3289);
if(shape && shape instanceof CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3291);
shape._destroy();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3292);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3294);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3296);
this._redraw();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3298);
return shape;
    },

    /**
     * Removes all shape instances from the dom.
     *
     * @method removeAllShapes
     */
    removeAllShapes: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeAllShapes", 3306);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3308);
var shapes = this._shapes,
            i;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3310);
for(i in shapes)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3312);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3314);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3317);
this._shapes = {};
    },

    /**
     * Clears the graphics object.
     *
     * @method clear
     */
    clear: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "clear", 3325);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3326);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_removeChildren", 3336);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3338);
if(node && node.hasChildNodes())
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3340);
var child;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3341);
while(node.firstChild)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3343);
child = node.firstChild;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3344);
this._removeChildren(child);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3345);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toggleVisible", 3357);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3359);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3362);
if(shapes)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3364);
for(i in shapes)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3366);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3368);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3372);
if(this._node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3374);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getShapeClass", 3386);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3388);
var shape = this._shapeClass[val];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3389);
if(shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3391);
return shape;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3393);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getShapeById", 3418);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3420);
var shape = this._shapes[id];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3421);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "batch", 3430);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3432);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3433);
this.set("autoDraw", false);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3434);
method();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3435);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDocFrag", 3445);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3447);
if(!this._frag)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3449);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3451);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_redraw", 3460);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3462);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3475);
if(autoSize)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3477);
if(autoSize == "sizeContentToGraphic")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3479);
contentWidth = box.right - box.left;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3480);
contentHeight = box.bottom - box.top;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3481);
w = parseFloat(Y_DOM.getComputedStyle(node, "width"));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3482);
h = parseFloat(Y_DOM.getComputedStyle(node, "height"));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3483);
matrix = new Y.Matrix();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3484);
if(preserveAspectRatio == "none")
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3486);
xScale = w/contentWidth;
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3487);
yScale = h/contentHeight;
                }
                else
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3491);
if(contentWidth/contentHeight !== w/h)
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3493);
if(contentWidth * h/contentHeight > w)
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3495);
xScale = yScale = w/contentWidth;
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3496);
translateY = this._calculateTranslate(preserveAspectRatio.slice(5).toLowerCase(), contentHeight * w/contentWidth, h);
                        }
                        else
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3500);
xScale = yScale = h/contentHeight;
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3501);
translateX = this._calculateTranslate(preserveAspectRatio.slice(1, 4).toLowerCase(), contentWidth * h/contentHeight, w);
                        }
                    }
                }
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3505);
Y_DOM.setStyle(node, "transformOrigin", "0% 0%");
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3506);
translateX = translateX - (box.left * xScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3507);
translateY = translateY - (box.top * yScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3508);
matrix.translate(translateX, translateY);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3509);
matrix.scale(xScale, yScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3510);
Y_DOM.setStyle(node, "transform", matrix.toCSSText());
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3514);
this.set("width", box.right);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3515);
this.set("height", box.bottom);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3518);
if(this._frag)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3520);
this._node.appendChild(this._frag);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3521);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_calculateTranslate", 3535);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3537);
var ratio = boundsSize - contentSize,
            coord;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3539);
switch(position)
        {
            case "mid" :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3542);
coord = ratio * 0.5;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3543);
break;
            case "max" :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3545);
coord = ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3546);
break;
            default :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3548);
coord = 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3549);
break;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3551);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addToRedrawQueue", 3562);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3564);
var shapeBox,
            box;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3566);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3567);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3569);
shapeBox = shape.getBounds();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3570);
box = this._contentBounds;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3571);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3572);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3573);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3574);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3575);
this._contentBounds = box;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3577);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3579);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getUpdatedContentBounds", 3590);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3592);
var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {};
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3597);
for(i in queue)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3599);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3601);
shape = queue[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3602);
bounds = shape.getBounds();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3603);
box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3604);
box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3605);
box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3606);
box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3609);
box.left = Y_LANG.isNumber(box.left) ? box.left : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3610);
box.top = Y_LANG.isNumber(box.top) ? box.top : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3611);
box.right = Y_LANG.isNumber(box.right) ? box.right : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3612);
box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3613);
this._contentBounds = box;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3614);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toFront", 3624);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3626);
var contentNode = this.get("node");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3627);
if(shape instanceof Y.CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3629);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3631);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3633);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toBack", 3644);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3646);
var contentNode = this.get("node"),
            targetNode;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3648);
if(shape instanceof Y.CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3650);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3652);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3654);
targetNode = contentNode.firstChild;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3655);
if(targetNode)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3657);
contentNode.insertBefore(shape, targetNode);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3661);
contentNode.appendChild(shape);
            }
        }
    }
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3667);
Y.CanvasGraphic = CanvasGraphic;


}, '@VERSION@', {"requires": ["graphics"]});
