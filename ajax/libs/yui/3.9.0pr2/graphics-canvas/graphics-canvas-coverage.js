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
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].code=["YUI.add('graphics-canvas', function (Y, NAME) {","","var IMPLEMENTATION = \"canvas\",","    SHAPE = \"shape\",","	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,","    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\\.][0-9]*/g,","    DOCUMENT = Y.config.doc,","    Y_LANG = Y.Lang,","    AttributeLite = Y.AttributeLite,","	CanvasShape,","	CanvasPath,","	CanvasRect,","    CanvasEllipse,","	CanvasCircle,","    CanvasPieSlice,","    Y_DOM = Y.DOM,","    Y_Color = Y.Color,","    PARSE_INT = parseInt,","    PARSE_FLOAT = parseFloat,","    IS_NUMBER = Y_LANG.isNumber,","    RE = RegExp,","    TORGB = Y_Color.toRGB,","    TOHEX = Y_Color.toHex,","    _getClassName = Y.ClassNameManager.getClassName;","","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class."," * `CanvasDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Drawing.html\">`Drawing`</a>"," * class will point to the `CanvasDrawing` class."," *"," * @module graphics"," * @class CanvasDrawing"," * @constructor"," */","function CanvasDrawing()","{","}","","CanvasDrawing.prototype = {","    /**","     * Maps path to methods","     *","     * @property _pathSymbolToMethod","     * @type Object","     * @private","     */","    _pathSymbolToMethod: {","        M: \"moveTo\",","        m: \"relativeMoveTo\",","        L: \"lineTo\",","        l: \"relativeLineTo\",","        C: \"curveTo\",","        c: \"relativeCurveTo\",","        Q: \"quadraticCurveTo\",","        q: \"relativeQuadraticCurveTo\",","        z: \"closePath\",","        Z: \"closePath\"","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","","    /**","     * Parses hex color string and alpha value to rgba","     *","     * @method _toRGBA","     * @param {Object} val Color value to parse. Can be hex string, rgb or name.","     * @param {Number} alpha Numeric value between 0 and 1 representing the alpha level.","     * @private","     */","    _toRGBA: function(val, alpha) {","        alpha = (alpha !== undefined) ? alpha : 1;","        if (!Y_Color.re_RGB.test(val)) {","            val = TOHEX(val);","        }","","        if(Y_Color.re_hex.exec(val)) {","            val = 'rgba(' + [","                PARSE_INT(RE.$1, 16),","                PARSE_INT(RE.$2, 16),","                PARSE_INT(RE.$3, 16)","            ].join(',') + ',' + alpha + ')';","        }","        return val;","    },","","    /**","     * Converts color to rgb format","     *","     * @method _toRGB","     * @param val Color value to convert.","     * @private","     */","    _toRGB: function(val) {","        return TORGB(val);","    },","","    /**","     * Sets the size of the graphics object.","     *","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     * @private","     */","	setSize: function(w, h) {","        if(this.get(\"autoSize\"))","        {","            if(w > this.node.getAttribute(\"width\"))","            {","                this.node.style.width = w + \"px\";","                this.node.setAttribute(\"width\", w);","            }","            if(h > this.node.getAttribute(\"height\"))","            {","                this.node.style.height = h + \"px\";","                this.node.setAttribute(\"height\", h);","            }","        }","    },","","	/**","     * Tracks coordinates. Used to calculate the start point of dashed lines.","     *","     * @method _updateCoords","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","	 * @private","	 */","    _updateCoords: function(x, y)","    {","        this._xcoords.push(x);","        this._ycoords.push(y);","        this._currentX = x;","        this._currentY = y;","    },","","	/**","     * Clears the coordinate arrays. Called at the end of a drawing operation.","	 *","     * @method _clearAndUpdateCoords","     * @private","	 */","    _clearAndUpdateCoords: function()","    {","        var x = this._xcoords.pop() || 0,","            y = this._ycoords.pop() || 0;","        this._updateCoords(x, y);","    },","","	/**","     * Moves the shape's dom node.","     *","     * @method _updateNodePosition","	 * @private","	 */","    _updateNodePosition: function()","    {","        var node = this.get(\"node\"),","            x = this.get(\"x\"),","            y = this.get(\"y\");","        node.style.position = \"absolute\";","        node.style.left = (x + this._left) + \"px\";","        node.style.top = (y + this._top) + \"px\";","    },","","    /**","     * Queues up a method to be executed when a shape redraws.","     *","     * @method _updateDrawingQueue","     * @param {Array} val An array containing data that can be parsed into a method and arguments. The value at zero-index","     * of the array is a string reference of the drawing method that will be called. All subsequent indices are argument for","     * that method. For example, `lineTo(10, 100)` would be structured as:","     * `[\"lineTo\", 10, 100]`.","     * @private","     */","    _updateDrawingQueue: function(val)","    {","        this._methods.push(val);","    },","","    /**","     * Draws a line segment from the current drawing position to the specified x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     */","    lineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Draws a line segment from the current drawing position to the relative x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     */","    relativeLineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), true]);","    },","","    /**","     * Implements lineTo methods.","     *","     * @method _lineTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _lineTo: function(args, relative)","    {","        var point1 = args[0],","            i,","            len,","            x,","            y,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        if(!this._lineToMethods)","        {","            this._lineToMethods = [];","        }","        len = args.length - 1;","        if (typeof point1 === 'string' || typeof point1 === 'number') {","            for (i = 0; i < len; i = i + 2) {","                x = parseFloat(args[i]);","                y = parseFloat(args[i + 1]);","                x = x + relativeX;","                y = y + relativeY;","                this._updateDrawingQueue([\"lineTo\", x, y]);","                this._trackSize(x - wt, y - wt);","                this._trackSize(x + wt, y + wt);","                this._updateCoords(x, y);","            }","        }","        else","        {","            for (i = 0; i < len; i = i + 1)","            {","                x = parseFloat(args[i][0]);","                y = parseFloat(args[i][1]);","                this._updateDrawingQueue([\"lineTo\", x, y]);","                this._lineToMethods[this._lineToMethods.length] = this._methods[this._methods.length - 1];","                this._trackSize(x - wt, y - wt);","                this._trackSize(x + wt, y + wt);","                this._updateCoords(x, y);","            }","        }","        this._drawingComplete = false;","        return this;","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    moveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Moves the current drawing position relative to specified x and y coordinates.","     *","     * @method relativeMoveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    relativeMoveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), true]);","    },","","    /**","     * Implements moveTo methods.","     *","     * @method _moveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _moveTo: function(args, relative) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0,","            x = parseFloat(args[0]) + relativeX,","            y = parseFloat(args[1]) + relativeY;","        this._updateDrawingQueue([\"moveTo\", x, y]);","        this._trackSize(x - wt, y - wt);","        this._trackSize(x + wt, y + wt);","        this._updateCoords(x, y);","        this._drawingComplete = false;","        return this;","    },","","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    curveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Draws a bezier curve relative to the current coordinates.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    relativeCurveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), true]);","    },","","    /**","     * Implements curveTo methods.","     *","     * @method _curveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _curveTo: function(args, relative) {","        var w,","            h,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            x,","            y,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        len = args.length - 5;","        for(i = 0; i < len; i = i + 6)","        {","            cp1x = parseFloat(args[i]) + relativeX;","            cp1y = parseFloat(args[i + 1]) + relativeY;","            cp2x = parseFloat(args[i + 2]) + relativeX;","            cp2y = parseFloat(args[i + 3]) + relativeY;","            x = parseFloat(args[i + 4]) + relativeX;","            y = parseFloat(args[i + 5]) + relativeY;","            this._updateDrawingQueue([\"bezierCurveTo\", cp1x, cp1y, cp2x, cp2y, x, y]);","            this._drawingComplete = false;","            right = Math.max(x, Math.max(cp1x, cp2x));","            bottom = Math.max(y, Math.max(cp1y, cp2y));","            left = Math.min(x, Math.min(cp1x, cp2x));","            top = Math.min(y, Math.min(cp1y, cp2y));","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    quadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);","    },","","    /**","     * Draws a quadratic bezier curve relative to the current position.","     *","     * @method relativeQuadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    relativeQuadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);","    },","","    /**","     * Implements quadraticCurveTo methods.","     *","     * @method _quadraticCurveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _quadraticCurveTo: function(args, relative) {","        var cpx,","            cpy,","            x,","            y,","            w,","            h,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len = args.length - 3,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        for(i = 0; i < len; i = i + 4)","        {","            cpx = parseFloat(args[i]) + relativeX;","            cpy = parseFloat(args[i + 1]) + relativeY;","            x = parseFloat(args[i + 2]) + relativeX;","            y = parseFloat(args[i + 3]) + relativeY;","            this._drawingComplete = false;","            right = Math.max(x, cpx);","            bottom = Math.max(y, cpy);","            left = Math.min(x, cpx);","            top = Math.min(y, cpy);","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._updateDrawingQueue([\"quadraticCurveTo\", cpx, cpy, x, y]);","            this._updateCoords(x, y);","        }","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 2 * Math.PI,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            circum = radius * 2;","            circum += wt;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        this._updateDrawingQueue([\"arc\", x + radius, y + radius, radius, startAngle, endAngle, false]);","        return this;","    },","","    /**","     * Draws a diamond.","     *","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws an ellipse. Used internally by `CanvasEllipse` class.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var l = 8,","            theta = -(45/180) * Math.PI,","            angle = 0,","            angleMid,","            radius = w/2,","            yRadius = h/2,","            i,","            centerX = x + radius,","            centerY = y + yRadius,","            ax, ay, bx, by, cx, cy,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","","        ax = centerX + Math.cos(0) * radius;","        ay = centerY + Math.sin(0) * yRadius;","        this.moveTo(ax, ay);","        for(i = 0; i < l; i++)","        {","            angle += theta;","            angleMid = angle - (theta / 2);","            bx = centerX + Math.cos(angle) * radius;","            by = centerY + Math.sin(angle) * yRadius;","            cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","            cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","            this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","        }","        this._trackSize(x + w + wt, y + h + wt);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        return this;","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     */","    drawRect: function(x, y, w, h) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._drawingComplete = false;","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._drawingComplete = false;","        this.moveTo( x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius, yRadius)","    {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            segs,","            segAngle,","            theta,","            angle,","            angleMid,","            ax,","            ay,","            bx,","            by,","            cx,","            cy,","            i = 0;","        yRadius = yRadius || radius;","","        this._drawingComplete = false;","        // move to x,y position","        this._updateDrawingQueue([\"moveTo\", x, y]);","","        yRadius = yRadius || radius;","","        // limit sweep to reasonable numbers","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","","        // First we calculate how many segments are needed","        // for a smooth arc.","        segs = Math.ceil(Math.abs(arc) / 45);","","        // Now calculate the sweep of each segment.","        segAngle = arc / segs;","","        // The math requires radians rather than degrees. To convert from degrees","        // use the formula (degrees/180)*Math.PI to get radians.","        theta = -(segAngle / 180) * Math.PI;","","        // convert angle startAngle to radians","        angle = (startAngle / 180) * Math.PI;","","        // draw the curve in segments no larger than 45 degrees.","        if(segs > 0)","        {","            // draw a line from the center to the start of the curve","            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;","            ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;","            this.lineTo(ax, ay);","            // Loop for drawing curve segments","            for(i = 0; i < segs; ++i)","            {","                angle += theta;","                angleMid = angle - (theta / 2);","                bx = x + Math.cos(angle) * radius;","                by = y + Math.sin(angle) * yRadius;","                cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","                cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","                this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","            }","            // close the wedge by drawing a line to the center","            this._updateDrawingQueue([\"lineTo\", x, y]);","        }","        this._trackSize(-wt , -wt);","        this._trackSize((radius * 2) + wt, (radius * 2) + wt);","        return this;","    },","","    /**","     * Completes a drawing operation.","     *","     * @method end","     */","    end: function() {","        this._closePath();","        return this;","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     */","    closePath: function()","    {","        this._updateDrawingQueue([\"closePath\"]);","        this._updateDrawingQueue([\"beginPath\"]);","    },","","	/**","	 * Clears the graphics object.","	 *","	 * @method clear","	 */","","    /**","     * Returns a linear gradient fill","     *","     * @method _getLinearGradient","     * @return CanvasGradient","     * @private","     */","    _getLinearGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            stops = fill.stops,","            opacity,","            color,","            stop,","            i,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            r = fill.rotation || 0,","            x1, x2, y1, y2,","            cx = x + w/2,","            cy = y + h/2,","            offset,","            radCon = Math.PI/180,","            tanRadians = parseFloat(parseFloat(Math.tan(r * radCon)).toFixed(8));","        if(Math.abs(tanRadians) * w/2 >= h/2)","        {","            if(r < 180)","            {","                y1 = y;","                y2 = y + h;","            }","            else","            {","                y1 = y + h;","                y2 = y;","            }","            x1 = cx - ((cy - y1)/tanRadians);","            x2 = cx - ((cy - y2)/tanRadians);","        }","        else","        {","            if(r > 90 && r < 270)","            {","                x1 = x + w;","                x2 = x;","            }","            else","            {","                x1 = x;","                x2 = x + w;","            }","            y1 = ((tanRadians * (cx - x1)) - cy) * -1;","            y2 = ((tanRadians * (cx - x2)) - cy) * -1;","        }","        gradient = this._context.createLinearGradient(x1, y1, x2, y2);","        for(i = 0; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            gradient.addColorStop(offset, color);","        }","        return gradient;","    },","","    /**","     * Returns a radial gradient fill","     *","     * @method _getRadialGradient","     * @return CanvasGradient","     * @private","     */","    _getRadialGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            r = fill.r,","            fx = fill.fx,","            fy = fill.fy,","            stops = fill.stops,","            opacity,","            color,","            stop,","            i,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            x1, x2, y1, y2, r2,","            xc, yc, xn, yn, d,","            offset,","            ratio,","            stopMultiplier;","        xc = x + w/2;","        yc = y + h/2;","        x1 = w * fx;","        y1 = h * fy;","        x2 = x + w/2;","        y2 = y + h/2;","        r2 = w * r;","        d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );","        if(d >= r2)","        {","            ratio = d/r2;","            //hack. gradient won't show if it is exactly on the edge of the arc","            if(ratio === 1)","            {","                ratio = 1.01;","            }","            xn = (x1 - xc)/ratio;","            yn = (y1 - yc)/ratio;","            xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);","            yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);","            x1 = xc + xn;","            y1 = yc + yn;","        }","","        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.","        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work.","        //Instead, adjust the color stops to reflect the smaller radius.","        if(r >= 0.5)","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);","            stopMultiplier = 1;","        }","        else","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);","            stopMultiplier = r * 2;","        }","        for(i = 0; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            offset *= stopMultiplier;","            if(offset <= 1)","            {","                gradient.addColorStop(offset, color);","            }","        }","        return gradient;","    },","","","    /**","     * Clears all values","     *","     * @method _initProps","     * @private","     */","    _initProps: function() {","        this._methods = [];","        this._lineToMethods = [];","        this._xcoords = [0];","		this._ycoords = [0];","		this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._right = 0;","        this._bottom = 0;","        this._currentX = 0;","        this._currentY = 0;","    },","","    /**","     * Indicates a drawing has completed.","     *","     * @property _drawingComplete","     * @type Boolean","     * @private","     */","    _drawingComplete: false,","","    /**","     * Creates canvas element","     *","     * @method _createGraphic","     * @return HTMLCanvasElement","     * @private","     */","    _createGraphic: function(config) {","        var graphic = Y.config.doc.createElement('canvas');","        return graphic;","    },","","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];","            }","        }","        return [ tmp[0][0], tmp[0][1] ];","    },","","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i = 0,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            xy;","        for(i = 0; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right + wt, bottom + wt);","        this._trackSize(left - wt, top - wt);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom)","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    }","};","Y.CanvasDrawing = CanvasDrawing;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class."," * `CanvasShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Shape.html\">`Shape`</a>"," * class will point to the `CanvasShape` class."," *"," * @module graphics"," * @class CanvasShape"," * @constructor"," */","CanvasShape = function(cfg)","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    CanvasShape.superclass.constructor.apply(this, arguments);","};","","CanvasShape.NAME = \"shape\";","","Y.extend(CanvasShape, Y.GraphicBase, Y.mix({","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","    init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic,","            data = this.get(\"data\");","        host._initProps();","		host.createNode();","		host._xcoords = [0];","		host._ycoords = [0];","        if(graphic)","        {","            this._setGraphic(graphic);","        }","        if(data)","        {","            host._parsePathData(data);","        }","		host._updateHandler();","	},","","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a","     * `Graphic` instance, it will be assigned to the `graphic` attribute. Otherwise, a new Graphic instance will be created","     * and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.CanvasGraphic)","        {","            this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.CanvasGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","        }","    },","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute","	 */","	addClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.addClass(className);","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.removeClass(className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains X & Y values for new position (coordinates are page-based)","	 */","	setXY: function(xy)","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = xy[0] - parentXY[0],","			y = xy[1] - parentXY[1];","		this._set(\"x\", x);","		this._set(\"y\", y);","		this._updateNodePosition(x, y);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.","	 *","	 * @method contains","	 * @param {CanvasShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y.one(this.get(\"node\")).test(selector);","		//return Y.Selector.test(this.node, selector);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","		return node === refNode;","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @method _getDefaultFill","	 * @return Object","	 * @private","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			opacity: 1,","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @method _getDefaultStroke","	 * @return Object","	 * @private","	 */","	_getDefaultStroke: function()","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","	/**","	 * Left edge of the path","	 *","     * @property _left","     * @type Number","	 * @private","	 */","	_left: 0,","","	/**","	 * Right edge of the path","	 *","     * @property _right","     * @type Number","	 * @private","	 */","	_right: 0,","","	/**","	 * Top edge of the path","	 *","     * @property _top","     * @type Number","	 * @private","	 */","	_top: 0,","","	/**","	 * Bottom edge of the path","	 *","     * @property _bottom","     * @type Number","	 * @private","	 */","	_bottom: 0,","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var host = this,","            node = Y.config.doc.createElement('canvas'),","			id = host.get(\"id\"),","            concat = host._camelCaseConcat,","            name = host.name;","		host._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.style.overflow = \"visible\";","        if(!host.get(\"visible\"))","        {","            node.style.visibility = \"hidden\";","        }","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","        host.node = node;","		host.addClass(_getClassName(SHAPE) + \" \" + _getClassName(concat(IMPLEMENTATION, SHAPE)) + \" \" + _getClassName(name) + \" \" + _getClassName(concat(IMPLEMENTATION, name)));","	},","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so,","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","     * @param {Object} stroke Properties of the `stroke` attribute.","	 * @private","	 */","	_setStrokeProps: function(stroke)","	{","		var color,","			weight,","			opacity,","			linejoin,","			linecap,","			dashstyle;","        if(stroke)","        {","            color = stroke.color;","            weight = PARSE_FLOAT(stroke.weight);","            opacity = PARSE_FLOAT(stroke.opacity);","            linejoin = stroke.linejoin || \"round\";","            linecap = stroke.linecap || \"butt\";","            dashstyle = stroke.dashstyle;","            this._miterlimit = null;","            this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;","            this._strokeWeight = weight;","","            if (IS_NUMBER(weight) && weight > 0)","            {","                this._stroke = 1;","            }","            else","            {","                this._stroke = 0;","            }","            if (IS_NUMBER(opacity)) {","                this._strokeStyle = this._toRGBA(color, opacity);","            }","            else","            {","                this._strokeStyle = color;","            }","            this._linecap = linecap;","            if(linejoin == \"round\" || linejoin == \"bevel\")","            {","                this._linejoin = linejoin;","            }","            else","            {","                linejoin = parseInt(linejoin, 10);","                if(IS_NUMBER(linejoin))","                {","                    this._miterlimit =  Math.max(linejoin, 1);","                    this._linejoin = \"miter\";","                }","            }","        }","        else","        {","            this._stroke = 0;","        }","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this,","			val = arguments[0];","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _setFillProps","     * @param {Object} fill Properties of the `fill` attribute.","	 * @private","	 */","	_setFillProps: function(fill)","	{","		var isNumber = IS_NUMBER,","			color,","			opacity,","			type;","        if(fill)","        {","            color = fill.color;","            type = fill.type;","            if(type == \"linear\" || type == \"radial\")","            {","                this._fillType = type;","            }","            else if(color)","            {","                opacity = fill.opacity;","                if (isNumber(opacity))","                {","                    opacity = Math.max(0, Math.min(1, opacity));","                    color = this._toRGBA(color, opacity);","                }","                else","                {","                    color = TORGB(color);","                }","","                this._fillColor = color;","                this._fillType = 'solid';","            }","            else","            {","                this._fillColor = null;","            }","        }","		else","		{","            this._fillType = null;","			this._fillColor = null;","		}","	},","","	/**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to transate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y)","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","    skewX: function(x)","    {","        this._addTransform(\"skewX\", arguments);","    },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","    skewY: function(y)","    {","        this._addTransform(\"skewY\", arguments);","    },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","    rotate: function(deg)","    {","        this._rotation = deg;","        this._addTransform(\"rotate\", arguments);","    },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","    scale: function(x, y)","    {","        this._addTransform(\"scale\", arguments);","    },","","    /**","     * Storage for `rotation` atribute.","     *","     * @property _rotation","     * @type Number","	 * @private","	 */","	_rotation: 0,","","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","			key,","			transform,","			transformOrigin = this.get(\"transformOrigin\"),","            matrix = this.matrix,","            i,","            len = this._transforms.length;","","        if(this._transforms && this._transforms.length > 0)","        {","            for(i = 0; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    matrix[key].apply(matrix, this._transforms[i]);","                }","            }","            transform = matrix.toCSSText();","        }","","        this._graphic.addToRedrawQueue(this);","		transformOrigin = (100 * transformOrigin[0]) + \"% \" + (100 * transformOrigin[1]) + \"%\";","        Y_DOM.setStyle(node, \"transformOrigin\", transformOrigin);","        if(transform)","		{","            Y_DOM.setStyle(node, \"transform\", transform);","		}","        this._transforms = [];","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function()","	{","		this._draw();","		this._updateTransform();","	},","","	/**","	 * Updates the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","        var node = this.node;","        this.clear();","		this._closePath();","		node.style.left = this.get(\"x\") + \"px\";","		node.style.top = this.get(\"y\") + \"px\";","	},","","	/**","	 * Completes a shape or drawing","	 *","	 * @method _closePath","	 * @private","	 */","	_closePath: function()","	{","		if(!this._methods)","		{","			return;","		}","		var node = this.get(\"node\"),","			w = this._right - this._left,","			h = this._bottom - this._top,","			context = this._context,","			methods = [],","			cachedMethods = this._methods.concat(),","			i,","			j,","			method,","			args,","            argsLen,","			len = 0;","		this._context.clearRect(0, 0, node.width, node.height);","        if(this._methods)","        {","			len = cachedMethods.length;","			if(!len || len < 1)","			{","				return;","			}","			for(i = 0; i < len; ++i)","			{","				methods[i] = cachedMethods[i].concat();","				args = methods[i];","                argsLen = (args[0] == \"quadraticCurveTo\" || args[0] == \"bezierCurveTo\") ? args.length : 3;","				for(j = 1; j < argsLen; ++j)","				{","					if(j % 2 === 0)","					{","						args[j] = args[j] - this._top;","					}","					else","					{","						args[j] = args[j] - this._left;","					}","				}","			}","            node.setAttribute(\"width\", Math.min(w, 2000));","            node.setAttribute(\"height\", Math.min(2000, h));","            context.beginPath();","			for(i = 0; i < len; ++i)","			{","				args = methods[i].concat();","				if(args && args.length > 0)","				{","					method = args.shift();","					if(method)","					{","                        if(method == \"closePath\")","                        {","                            context.closePath();","                            this._strokeAndFill(context);","                        }","						else if(method && method == \"lineTo\" && this._dashstyle)","						{","							args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);","							this._drawDashedLine.apply(this, args);","						}","						else","						{","                            context[method].apply(context, args);","						}","					}","				}","			}","","            this._strokeAndFill(context);","			this._drawingComplete = true;","			this._clearAndUpdateCoords();","			this._updateNodePosition();","			this._methods = cachedMethods;","		}","	},","","    /**","     * Completes a stroke and/or fill operation on the context.","     *","     * @method _strokeAndFill","     * @param {Context} Reference to the context element of the canvas instance.","     * @private","     */","    _strokeAndFill: function(context)","    {","        if (this._fillType)","        {","            if(this._fillType == \"linear\")","            {","                context.fillStyle = this._getLinearGradient();","            }","            else if(this._fillType == \"radial\")","            {","                context.fillStyle = this._getRadialGradient();","            }","            else","            {","                context.fillStyle = this._fillColor;","            }","            context.closePath();","            context.fill();","        }","","        if (this._stroke) {","            if(this._strokeWeight)","            {","                context.lineWidth = this._strokeWeight;","            }","            context.lineCap = this._linecap;","            context.lineJoin = this._linejoin;","            if(this._miterlimit)","            {","                context.miterLimit = this._miterlimit;","            }","            context.strokeStyle = this._strokeStyle;","            context.stroke();","        }","    },","","	/**","	 * Draws a dashed line between two points.","	 *","	 * @method _drawDashedLine","	 * @param {Number} xStart	The x position of the start of the line","	 * @param {Number} yStart	The y position of the start of the line","	 * @param {Number} xEnd		The x position of the end of the line","	 * @param {Number} yEnd		The y position of the end of the line","	 * @private","	 */","	_drawDashedLine: function(xStart, yStart, xEnd, yEnd)","	{","		var context = this._context,","			dashsize = this._dashstyle[0],","			gapsize = this._dashstyle[1],","			segmentLength = dashsize + gapsize,","			xDelta = xEnd - xStart,","			yDelta = yEnd - yStart,","			delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),","			segmentCount = Math.floor(Math.abs(delta / segmentLength)),","			radians = Math.atan2(yDelta, xDelta),","			xCurrent = xStart,","			yCurrent = yStart,","			i;","		xDelta = Math.cos(radians) * segmentLength;","		yDelta = Math.sin(radians) * segmentLength;","","		for(i = 0; i < segmentCount; ++i)","		{","			context.moveTo(xCurrent, yCurrent);","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","			xCurrent += xDelta;","			yCurrent += yDelta;","		}","","		context.moveTo(xCurrent, yCurrent);","		delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));","","		if(delta > dashsize)","		{","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","		}","		else if(delta > 0)","		{","			context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);","		}","","		context.moveTo(xEnd, yEnd);","	},","","	//This should move to CanvasDrawing class.","    //Currently docmented in CanvasDrawing class.","    clear: function() {","		this._initProps();","        if(this.node)","        {","            this._context.clearRect(0, 0, this.node.width, this.node.height);","        }","        return this;","	},","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox.","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var type = this._type,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			x = this.get(\"x\"),","			y = this.get(\"y\");","        if(type == \"path\")","        {","            x = x + this._left;","            y = y + this._top;","            w = this._right - this._left;","            h = this._bottom - this._top;","        }","        return this._getContentRect(w, h, x, y);","	},","","    /**","     * Calculates the bounding box for the shape.","     *","     * @method _getContentRect","     * @param {Number} w width of the shape","     * @param {Number} h height of the shape","     * @param {Number} x x-coordinate of the shape","     * @param {Number} y y-coordinate of the shape","     * @private","     */","    _getContentRect: function(w, h, x, y)","    {","        var transformOrigin = this.get(\"transformOrigin\"),","            transformX = transformOrigin[0] * w,","            transformY = transformOrigin[1] * h,","            transforms = this.matrix.getTransformArray(this.get(\"transform\")),","            matrix = new Y.Matrix(),","            i,","            len = transforms.length,","            transform,","            key,","            contentRect;","        if(this._type == \"path\")","        {","            transformX = transformX + x;","            transformY = transformY + y;","        }","        transformX = !isNaN(transformX) ? transformX : 0;","        transformY = !isNaN(transformY) ? transformY : 0;","        matrix.translate(transformX, transformY);","        for(i = 0; i < len; i = i + 1)","        {","            transform = transforms[i];","            key = transform.shift();","            if(key)","            {","                matrix[key].apply(matrix, transform);","            }","        }","        matrix.translate(-transformX, -transformY);","        contentRect = matrix.getContentRect(w, h, x, y);","        return contentRect;","    },","","    /**","     * Places the shape above all other shapes.","     *","     * @method toFront","     */","    toFront: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toFront(this);","        }","    },","","    /**","     * Places the shape underneath all other shapes.","     *","     * @method toFront","     */","    toBack: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toBack(this);","        }","    },","","    /**","     * Parses path data string and call mapped methods.","     *","     * @method _parsePathData","     * @param {String} val The path data","     * @private","     */","    _parsePathData: function(val)","    {","        var method,","            methodSymbol,","            args,","            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),","            i,","            len,","            str,","            symbolToMethod = this._pathSymbolToMethod;","        if(commandArray)","        {","            this.clear();","            len = commandArray.length || 0;","            for(i = 0; i < len; i = i + 1)","            {","                str = commandArray[i];","                methodSymbol = str.substr(0, 1);","                args = str.substr(1).match(SPLITARGSPATTERN);","                method = symbolToMethod[methodSymbol];","                if(method)","                {","                    if(args)","                    {","                        this[method].apply(this, args);","                    }","                    else","                    {","                        this[method].apply(this);","                    }","                }","            }","            this.end();","        }","    },","","    /**","     * Destroys the shape instance.","     *","     * @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {","            Y.one(this.node).remove(true);","            this._context = null;","            this.node = null;","        }","    }","}, Y.CanvasDrawing.prototype));","","CanvasShape.ATTRS =  {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains","     * corresponding methods for each transform that will apply the transform to the current matrix. The below code illustrates how you might use the","     * `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String","	 */","	transform: {","		setter: function(val)","		{","            this.matrix.init();","            this._transforms = this.matrix.getTransformArray(val);","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Dom node for the shape","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        value: 0","    },","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        value: 0","    },","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.get(\"node\"),","                visibility = val ? \"visible\" : \"hidden\";","			if(node)","            {","                node.style.visibility = visibility;","            }","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1.","     *              Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd>","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the","     *      flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and","     *          `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape`","     *          classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p>","	 *","	 * @config fill","	 * @type Object","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","","		setter: function(val)","		{","			var fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","			fill = (val) ? Y.merge(tmpl, val) : null;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color == \"none\")","				{","					fill.color = null;","				}","			}","			this._setFillProps(fill);","			return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set","     *      to an array, the first index indicates the length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin","     *              of miter, you simply specify the limit as opposed to having separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","","		setter: function(val)","		{","			var tmpl = this.get(\"stroke\") || this._getDefaultStroke(),","                wt;","            if(val && val.hasOwnProperty(\"weight\"))","            {","                wt = parseInt(val.weight, 10);","                if(!isNaN(wt))","                {","                    val.weight = wt;","                }","            }","			val = (val) ? Y.merge(tmpl, val) : null;","			this._setStrokeProps(val);","			return val;","		}","	},","","	//Not used. Remove in future.","	autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	//","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","    /**","     * Represents an SVG Path string. This will be parsed and added to shape's API to represent the SVG data across all","     * implementations. Note that when using VML or SVG implementations, part of this content will be added to the DOM using","     * respective VML/SVG attributes. If your content comes from an untrusted source, you will need to ensure that no","     * malicious code is included in that content.","     *","     * @config data","     * @type String","     */","    data: {","        setter: function(val)","        {","            if(this.get(\"node\"))","            {","                this._parsePathData(val);","            }","            return val;","        }","    },","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","    }","};","Y.CanvasShape = CanvasShape;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Path.html\">`Path`</a> class."," * `CanvasPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Path.html\">`Path`</a>"," * class will point to the `CanvasPath` class."," *"," * @module graphics"," * @class CanvasPath"," * @extends CanvasShape"," */","CanvasPath = function(cfg)","{","	CanvasPath.superclass.constructor.apply(this, arguments);","};","CanvasPath.NAME = \"path\";","Y.extend(CanvasPath, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","    _draw: function()","    {","        this._closePath();","        this._updateTransform();","    },","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var host = this,","            node = Y.config.doc.createElement('canvas'),","			name = host.name,","            concat = host._camelCaseConcat,","            id = host.get(\"id\");","		host._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.setAttribute(\"pointer-events\", \"none\");","        node.style.pointerEvents = \"none\";","        node.style.overflow = \"visible\";","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","		host.node = node;","		host.addClass(_getClassName(SHAPE) + \" \" + _getClassName(concat(IMPLEMENTATION, SHAPE)) + \" \" + _getClassName(name) + \" \" + _getClassName(concat(IMPLEMENTATION, name)));","	},","","    /**","     * Completes a drawing operation.","     *","     * @method end","     */","    end: function()","    {","        this._draw();","    }","});","","CanvasPath.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","			return this._width - offset;","		},","","		setter: function(val)","		{","			this._width = val;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","            return this._height - offset;","		},","","		setter: function(val)","		{","			this._height = val;","			return val;","		}","	},","","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","        readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.CanvasPath = CanvasPath;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class."," * `CanvasRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Rect.html\">`Rect`</a>"," * class will point to the `CanvasRect` class."," *"," * @module graphics"," * @class CanvasRect"," * @constructor"," */","CanvasRect = function()","{","	CanvasRect.superclass.constructor.apply(this, arguments);","};","CanvasRect.NAME = \"rect\";","Y.extend(CanvasRect, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawRect(0, 0, w, h);","		this._closePath();","	}","});","CanvasRect.ATTRS = Y.CanvasShape.ATTRS;","Y.CanvasRect = CanvasRect;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * `CanvasEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a>"," * class will point to the `CanvasEllipse` class."," *"," * @module graphics"," * @class CanvasEllipse"," * @constructor"," */","CanvasEllipse = function(cfg)","{","	CanvasEllipse.superclass.constructor.apply(this, arguments);","};","","CanvasEllipse.NAME = \"ellipse\";","","Y.extend(CanvasEllipse, CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"ellipse\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawEllipse(0, 0, w, h);","		this._closePath();","	}","});","CanvasEllipse.ATTRS = Y.merge(CanvasShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse.","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		setter: function(val)","		{","			this.set(\"width\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"width\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse.","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		setter: function(val)","		{","			this.set(\"height\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"height\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	}","});","Y.CanvasEllipse = CanvasEllipse;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class."," * `CanvasCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Circle.html\">`Circle`</a>"," * class will point to the `CanvasCircle` class."," *"," * @module graphics"," * @class CanvasCircle"," * @constructor"," */","CanvasCircle = function(cfg)","{","	CanvasCircle.superclass.constructor.apply(this, arguments);","};","","CanvasCircle.NAME = \"circle\";","","Y.extend(CanvasCircle, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"circle\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var radius = this.get(\"radius\");","		if(radius)","		{","            this.clear();","            this.drawCircle(0, 0, radius);","			this._closePath();","		}","	}","});","","CanvasCircle.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Radius of the circle","	 *","	 * @config radius","     * @type Number","	 */","	radius: {","		lazyAdd: false","	}","});","Y.CanvasCircle = CanvasCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class CanvasPieSlice"," * @constructor"," */","CanvasPieSlice = function()","{","	CanvasPieSlice.superclass.constructor.apply(this, arguments);","};","CanvasPieSlice.NAME = \"canvasPieSlice\";","Y.extend(CanvasPieSlice, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function(e)","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this._left = x;","        this._right = radius;","        this._top = y;","        this._bottom = radius;","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," });","CanvasPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.CanvasShape.ATTRS);","Y.CanvasPieSlice = CanvasPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the `Graphic` class."," * `CanvasGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class."," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Graphic.html\">`Graphic`</a>"," * class will point to the `CanvasGraphic` class."," *"," * @module graphics"," * @class CanvasGraphic"," * @constructor"," */","function CanvasGraphic(config) {","","    CanvasGraphic.superclass.constructor.apply(this, arguments);","}","","CanvasGraphic.NAME = \"canvasGraphic\";","","CanvasGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node","     * instance or a CSS selector string.","     *","     * @config render","     * @type Node | String","     */","    render: {},","","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the graphic instance's position.","     *","     *  @config contentBounds","     *  @type Object","     *  @readOnly","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The outermost html element of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     *  @readOnly","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`.","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`.","	 *","	 * @config height","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines the sizing of the Graphic.","     *","     *  <dl>","     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the","     *      <code>width</code> and <code>height</code> attributes or are determined by the dimensions of the parent element. The","     *      content contained in the Graphic will be sized to fit with in the Graphic instance's dimensions. When using this","     *      setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>","     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the","     *      size and positioning of the content.</dd>","     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code>","     *      and <code>height</code> attributes or are determined by the dimensions of the parent element. The contents of the","     *      Graphic instance are not affected by this setting.</dd>","     *  </dl>","     *","     *","     *  @config autoSize","     *  @type Boolean | String","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.","     *","     *  <dl>","     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary","     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>","     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>","     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>","     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>","     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>","     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>","     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>","     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>","     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>","     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>","     *  </dl>","     *","     * @config preserveAspectRatio","     * @type String","     * @default xMidYMid","     */","    preserveAspectRatio: {","        value: \"xMidYMid\"","    },","","    /**","     * The contentBounds will resize to greater values but not smaller values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown","     * @type Boolean","     */","    resizeDown: {","        value: false","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","	/**","	 * Indicates whether the `Graphic` and its children are visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(CanvasGraphic, Y.GraphicBase, {","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function(attr, value)","	{","		var host = this,","            redrawAttrs = {","                autoDraw: true,","                autoSize: true,","                preserveAspectRatio: true,","                resizeDown: true","            },","            key,","            forceRedraw = false;","		AttributeLite.prototype.set.apply(host, arguments);","        if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)","        {","            if(Y_LANG.isString && redrawAttrs[attr])","            {","                forceRedraw = true;","            }","            else if(Y_LANG.isObject(attr))","            {","                for(key in redrawAttrs)","                {","                    if(redrawAttrs.hasOwnProperty(key) && attr[key])","                    {","                        forceRedraw = true;","                        break;","                    }","                }","            }","        }","        if(forceRedraw)","        {","            host._redraw();","        }","	},","","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = Y.one(this._node),","            xy;","        if(node)","        {","            xy = node.getXY();","        }","        return xy;","    },","","	/**","     * Initializes the class.","     *","     * @method initializer","     * @param {Object} config Optional attributes","     * @private","     */","    initializer: function(config) {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","            w = this.get(\"width\") || 0,","            h = this.get(\"height\") || 0;","        this._shapes = {};","        this._redrawQueue = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = DOCUMENT.createElement('div');","        this._node.style.position = \"absolute\";","        this._node.style.visibility = visibility;","        this.set(\"width\", w);","        this.set(\"height\", h);","        if(render)","        {","            this.render(render);","        }","    },","","    /**","     * Adds the graphics node to the dom.","     *","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            node = this._node,","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(node);","        node.style.display = \"block\";","        node.style.position = \"absolute\";","        node.style.left = \"0px\";","        node.style.top = \"0px\";","        this.set(\"width\", w);","        this.set(\"height\", h);","        this.parentNode = parentNode;","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.removeAllShapes();","        if(this._node)","        {","            this._removeChildren(this._node);","            Y.one(this._node).destroy();","        }","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var shapeClass = this._getShapeClass(cfg.type),","            shape = new shapeClass(cfg);","        this._appendShape(shape);","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\"))","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof CanvasShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && shape instanceof CanvasShape)","        {","            shape._destroy();","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","        return shape;","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param {HTMLElement} node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node && node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Returns a shape class. Used by `addShape`.","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class.","     * @return Function","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.CanvasCircle,","        rect: Y.CanvasRect,","        path: Y.CanvasPath,","        ellipse: Y.CanvasEllipse,","        pieslice: Y.CanvasPieSlice","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        var shape = this._shapes[id];","        return shape;","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method();","        this.set(\"autoDraw\", autoDraw);","    },","","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var autoSize = this.get(\"autoSize\"),","            preserveAspectRatio = this.get(\"preserveAspectRatio\"),","            box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds,","            contentWidth,","            contentHeight,","            w,","            h,","            xScale,","            yScale,","            translateX = 0,","            translateY = 0,","            matrix,","            node = this.get(\"node\");","        if(autoSize)","        {","            if(autoSize == \"sizeContentToGraphic\")","            {","                contentWidth = box.right - box.left;","                contentHeight = box.bottom - box.top;","                w = parseFloat(Y_DOM.getComputedStyle(node, \"width\"));","                h = parseFloat(Y_DOM.getComputedStyle(node, \"height\"));","                matrix = new Y.Matrix();","                if(preserveAspectRatio == \"none\")","                {","                    xScale = w/contentWidth;","                    yScale = h/contentHeight;","                }","                else","                {","                    if(contentWidth/contentHeight !== w/h)","                    {","                        if(contentWidth * h/contentHeight > w)","                        {","                            xScale = yScale = w/contentWidth;","                            translateY = this._calculateTranslate(preserveAspectRatio.slice(5).toLowerCase(), contentHeight * w/contentWidth, h);","                        }","                        else","                        {","                            xScale = yScale = h/contentHeight;","                            translateX = this._calculateTranslate(preserveAspectRatio.slice(1, 4).toLowerCase(), contentWidth * h/contentHeight, w);","                        }","                    }","                }","                Y_DOM.setStyle(node, \"transformOrigin\", \"0% 0%\");","                translateX = translateX - (box.left * xScale);","                translateY = translateY - (box.top * yScale);","                matrix.translate(translateX, translateY);","                matrix.scale(xScale, yScale);","                Y_DOM.setStyle(node, \"transform\", matrix.toCSSText());","            }","            else","            {","                this.set(\"width\", box.right);","                this.set(\"height\", box.bottom);","            }","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","    },","","    /**","     * Determines the value for either an x or y value to be used for the <code>translate</code> of the Graphic.","     *","     * @method _calculateTranslate","     * @param {String} position The position for placement. Possible values are min, mid and max.","     * @param {Number} contentSize The total size of the content.","     * @param {Number} boundsSize The total size of the Graphic.","     * @return Number","     * @private","     */","    _calculateTranslate: function(position, contentSize, boundsSize)","    {","        var ratio = boundsSize - contentSize,","            coord;","        switch(position)","        {","            case \"mid\" :","                coord = ratio * 0.5;","            break;","            case \"max\" :","                coord = ratio;","            break;","            default :","                coord = 0;","            break;","        }","        return coord;","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds. Used internally","     * by `Shape` instances.","     *","     * @method addToRedrawQueue","     * @param Shape shape The shape instance to add to the queue","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object}","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {};","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;","                box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;","                box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;","                box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;","            }","        }","        box.left = Y_LANG.isNumber(box.left) ? box.left : 0;","        box.top = Y_LANG.isNumber(box.top) ? box.top : 0;","        box.right = Y_LANG.isNumber(box.right) ? box.right : 0;","        box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;","        this._contentBounds = box;","        return box;","    },","","    /**","     * Inserts shape on the top of the tree.","     *","     * @method _toFront","     * @param {CanvasShape} Shape to add.","     * @private","     */","    _toFront: function(shape)","    {","        var contentNode = this.get(\"node\");","        if(shape instanceof Y.CanvasShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            contentNode.appendChild(shape);","        }","    },","","    /**","     * Inserts shape as the first child of the content node.","     *","     * @method _toBack","     * @param {CanvasShape} Shape to add.","     * @private","     */","    _toBack: function(shape)","    {","        var contentNode = this.get(\"node\"),","            targetNode;","        if(shape instanceof Y.CanvasShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            targetNode = contentNode.firstChild;","            if(targetNode)","            {","                contentNode.insertBefore(shape, targetNode);","            }","            else","            {","                contentNode.appendChild(shape);","            }","        }","    }","});","","Y.CanvasGraphic = CanvasGraphic;","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].lines = {"1":0,"3":0,"37":0,"41":0,"89":0,"90":0,"91":0,"94":0,"95":0,"101":0,"112":0,"124":0,"126":0,"128":0,"129":0,"131":0,"133":0,"134":0,"149":0,"150":0,"151":0,"152":0,"163":0,"165":0,"176":0,"179":0,"180":0,"181":0,"196":0,"208":0,"220":0,"233":0,"241":0,"243":0,"245":0,"246":0,"247":0,"248":0,"249":0,"250":0,"251":0,"252":0,"253":0,"254":0,"255":0,"260":0,"262":0,"263":0,"264":0,"265":0,"266":0,"267":0,"268":0,"271":0,"272":0,"284":0,"296":0,"308":0,"313":0,"314":0,"315":0,"316":0,"317":0,"318":0,"333":0,"348":0,"360":0,"377":0,"378":0,"380":0,"381":0,"382":0,"383":0,"384":0,"385":0,"386":0,"387":0,"388":0,"389":0,"390":0,"391":0,"392":0,"393":0,"394":0,"395":0,"396":0,"397":0,"411":0,"424":0,"436":0,"452":0,"454":0,"455":0,"456":0,"457":0,"458":0,"459":0,"460":0,"461":0,"462":0,"463":0,"464":0,"465":0,"466":0,"467":0,"468":0,"470":0,"483":0,"487":0,"488":0,"489":0,"490":0,"491":0,"492":0,"493":0,"508":0,"510":0,"511":0,"512":0,"513":0,"514":0,"515":0,"529":0,"541":0,"542":0,"543":0,"544":0,"546":0,"547":0,"548":0,"549":0,"550":0,"551":0,"552":0,"554":0,"555":0,"556":0,"557":0,"570":0,"571":0,"572":0,"573":0,"574":0,"575":0,"576":0,"577":0,"592":0,"593":0,"594":0,"595":0,"596":0,"597":0,"598":0,"599":0,"600":0,"601":0,"602":0,"603":0,"620":0,"633":0,"635":0,"637":0,"639":0,"642":0,"644":0,"649":0,"652":0,"656":0,"659":0,"662":0,"665":0,"666":0,"667":0,"669":0,"671":0,"672":0,"673":0,"674":0,"675":0,"676":0,"677":0,"680":0,"682":0,"683":0,"684":0,"693":0,"694":0,"704":0,"705":0,"722":0,"742":0,"744":0,"746":0,"747":0,"751":0,"752":0,"754":0,"755":0,"759":0,"761":0,"762":0,"766":0,"767":0,"769":0,"770":0,"772":0,"773":0,"775":0,"776":0,"777":0,"778":0,"779":0,"781":0,"782":0,"786":0,"788":0,"789":0,"791":0,"802":0,"823":0,"824":0,"825":0,"826":0,"827":0,"828":0,"829":0,"830":0,"831":0,"833":0,"835":0,"837":0,"839":0,"840":0,"841":0,"842":0,"843":0,"844":0,"850":0,"852":0,"853":0,"857":0,"858":0,"860":0,"862":0,"863":0,"864":0,"865":0,"866":0,"868":0,"869":0,"873":0,"875":0,"876":0,"877":0,"879":0,"882":0,"893":0,"894":0,"895":0,"896":0,"897":0,"898":0,"899":0,"900":0,"901":0,"902":0,"903":0,"904":0,"924":0,"925":0,"938":0,"943":0,"944":0,"947":0,"948":0,"949":0,"950":0,"953":0,"967":0,"976":0,"978":0,"979":0,"980":0,"981":0,"982":0,"984":0,"985":0,"986":0,"987":0,"988":0,"989":0,"1001":0,"1002":0,"1004":0,"1006":0,"1008":0,"1010":0,"1012":0,"1014":0,"1016":0,"1017":0,"1020":0,"1032":0,"1034":0,"1035":0,"1036":0,"1039":0,"1041":0,"1051":0,"1062":0,"1065":0,"1066":0,"1067":0,"1068":0,"1069":0,"1071":0,"1073":0,"1075":0,"1077":0,"1091":0,"1092":0,"1094":0,"1098":0,"1099":0,"1102":0,"1103":0,"1115":0,"1116":0,"1127":0,"1128":0,"1139":0,"1143":0,"1154":0,"1158":0,"1159":0,"1160":0,"1172":0,"1184":0,"1196":0,"1197":0,"1208":0,"1228":0,"1281":0,"1286":0,"1287":0,"1288":0,"1289":0,"1291":0,"1293":0,"1294":0,"1295":0,"1296":0,"1310":0,"1312":0,"1314":0,"1326":0,"1332":0,"1334":0,"1335":0,"1336":0,"1337":0,"1338":0,"1339":0,"1340":0,"1341":0,"1342":0,"1344":0,"1346":0,"1350":0,"1352":0,"1353":0,"1357":0,"1359":0,"1360":0,"1362":0,"1366":0,"1367":0,"1369":0,"1370":0,"1376":0,"1391":0,"1393":0,"1394":0,"1396":0,"1409":0,"1413":0,"1415":0,"1416":0,"1417":0,"1419":0,"1421":0,"1423":0,"1424":0,"1426":0,"1427":0,"1431":0,"1434":0,"1435":0,"1439":0,"1444":0,"1445":0,"1458":0,"1459":0,"1460":0,"1472":0,"1473":0,"1485":0,"1486":0,"1498":0,"1509":0,"1520":0,"1531":0,"1532":0,"1543":0,"1574":0,"1575":0,"1576":0,"1577":0,"1578":0,"1580":0,"1592":0,"1600":0,"1602":0,"1604":0,"1605":0,"1607":0,"1610":0,"1613":0,"1614":0,"1615":0,"1616":0,"1618":0,"1620":0,"1631":0,"1632":0,"1643":0,"1644":0,"1645":0,"1646":0,"1647":0,"1658":0,"1660":0,"1662":0,"1674":0,"1675":0,"1677":0,"1678":0,"1680":0,"1682":0,"1684":0,"1685":0,"1686":0,"1687":0,"1689":0,"1691":0,"1695":0,"1699":0,"1700":0,"1701":0,"1702":0,"1704":0,"1705":0,"1707":0,"1708":0,"1710":0,"1712":0,"1713":0,"1715":0,"1717":0,"1718":0,"1722":0,"1728":0,"1729":0,"1730":0,"1731":0,"1732":0,"1745":0,"1747":0,"1749":0,"1751":0,"1753":0,"1757":0,"1759":0,"1760":0,"1763":0,"1764":0,"1766":0,"1768":0,"1769":0,"1770":0,"1772":0,"1774":0,"1775":0,"1791":0,"1803":0,"1804":0,"1806":0,"1808":0,"1809":0,"1810":0,"1811":0,"1814":0,"1815":0,"1817":0,"1819":0,"1821":0,"1823":0,"1826":0,"1832":0,"1833":0,"1835":0,"1837":0,"1851":0,"1856":0,"1858":0,"1859":0,"1860":0,"1861":0,"1863":0,"1878":0,"1888":0,"1890":0,"1891":0,"1893":0,"1894":0,"1895":0,"1896":0,"1898":0,"1899":0,"1900":0,"1902":0,"1905":0,"1906":0,"1907":0,"1917":0,"1918":0,"1920":0,"1931":0,"1932":0,"1934":0,"1947":0,"1955":0,"1957":0,"1958":0,"1959":0,"1961":0,"1962":0,"1963":0,"1964":0,"1965":0,"1967":0,"1969":0,"1973":0,"1977":0,"1988":0,"1989":0,"1991":0,"1995":0,"2007":0,"2009":0,"2010":0,"2011":0,"2016":0,"2027":0,"2064":0,"2065":0,"2066":0,"2067":0,"2072":0,"2088":0,"2101":0,"2106":0,"2107":0,"2109":0,"2111":0,"2165":0,"2167":0,"2169":0,"2171":0,"2229":0,"2231":0,"2232":0,"2234":0,"2236":0,"2239":0,"2240":0,"2277":0,"2279":0,"2281":0,"2282":0,"2284":0,"2287":0,"2288":0,"2289":0,"2320":0,"2322":0,"2324":0,"2339":0,"2343":0,"2355":0,"2357":0,"2359":0,"2360":0,"2378":0,"2379":0,"2391":0,"2396":0,"2397":0,"2398":0,"2399":0,"2400":0,"2401":0,"2402":0,"2403":0,"2404":0,"2414":0,"2418":0,"2428":0,"2429":0,"2434":0,"2435":0,"2448":0,"2449":0,"2454":0,"2455":0,"2471":0,"2475":0,"2487":0,"2489":0,"2491":0,"2492":0,"2510":0,"2512":0,"2513":0,"2514":0,"2517":0,"2518":0,"2530":0,"2532":0,"2535":0,"2537":0,"2555":0,"2557":0,"2558":0,"2559":0,"2562":0,"2572":0,"2577":0,"2578":0,"2580":0,"2582":0,"2596":0,"2601":0,"2602":0,"2604":0,"2606":0,"2610":0,"2622":0,"2624":0,"2627":0,"2629":0,"2647":0,"2648":0,"2650":0,"2651":0,"2652":0,"2657":0,"2667":0,"2668":0,"2673":0,"2686":0,"2687":0,"2692":0,"2706":0,"2714":0,"2716":0,"2718":0,"2719":0,"2737":0,"2742":0,"2743":0,"2744":0,"2745":0,"2746":0,"2747":0,"2748":0,"2751":0,"2789":0,"2801":0,"2803":0,"2806":0,"2808":0,"2827":0,"2832":0,"2833":0,"2835":0,"2837":0,"2853":0,"2869":0,"2885":0,"2898":0,"2900":0,"2902":0,"2915":0,"2917":0,"2919":0,"2992":0,"2997":0,"2998":0,"3000":0,"3002":0,"3015":0,"3020":0,"3021":0,"3023":0,"3025":0,"3053":0,"3054":0,"3059":0,"3071":0,"3080":0,"3081":0,"3083":0,"3085":0,"3087":0,"3089":0,"3091":0,"3093":0,"3094":0,"3099":0,"3101":0,"3131":0,"3133":0,"3135":0,"3137":0,"3148":0,"3152":0,"3153":0,"3154":0,"3160":0,"3161":0,"3162":0,"3163":0,"3164":0,"3165":0,"3167":0,"3178":0,"3182":0,"3183":0,"3184":0,"3185":0,"3186":0,"3187":0,"3188":0,"3189":0,"3190":0,"3191":0,"3201":0,"3202":0,"3204":0,"3205":0,"3218":0,"3219":0,"3221":0,"3223":0,"3225":0,"3226":0,"3238":0,"3240":0,"3242":0,"3246":0,"3258":0,"3260":0,"3262":0,"3265":0,"3267":0,"3268":0,"3270":0,"3272":0,"3274":0,"3284":0,"3286":0,"3288":0,"3290":0,"3293":0,"3302":0,"3314":0,"3316":0,"3317":0,"3319":0,"3320":0,"3321":0,"3335":0,"3338":0,"3340":0,"3342":0,"3344":0,"3348":0,"3350":0,"3364":0,"3365":0,"3367":0,"3369":0,"3396":0,"3397":0,"3408":0,"3409":0,"3410":0,"3411":0,"3423":0,"3425":0,"3427":0,"3438":0,"3451":0,"3453":0,"3455":0,"3456":0,"3457":0,"3458":0,"3459":0,"3460":0,"3462":0,"3463":0,"3467":0,"3469":0,"3471":0,"3472":0,"3476":0,"3477":0,"3481":0,"3482":0,"3483":0,"3484":0,"3485":0,"3486":0,"3490":0,"3491":0,"3494":0,"3496":0,"3497":0,"3513":0,"3515":0,"3518":0,"3519":0,"3521":0,"3522":0,"3524":0,"3525":0,"3527":0,"3540":0,"3542":0,"3543":0,"3545":0,"3546":0,"3547":0,"3548":0,"3549":0,"3550":0,"3551":0,"3553":0,"3555":0,"3568":0,"3573":0,"3575":0,"3577":0,"3578":0,"3579":0,"3580":0,"3581":0,"3582":0,"3585":0,"3586":0,"3587":0,"3588":0,"3589":0,"3590":0,"3602":0,"3603":0,"3605":0,"3607":0,"3609":0,"3622":0,"3624":0,"3626":0,"3628":0,"3630":0,"3631":0,"3633":0,"3637":0,"3643":0};
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].functions = {"CanvasDrawing:37":0,"_toRGBA:88":0,"_toRGB:111":0,"setSize:123":0,"_updateCoords:147":0,"_clearAndUpdateCoords:161":0,"_updateNodePosition:174":0,"_updateDrawingQueue:194":0,"lineTo:206":0,"relativeLineTo:218":0,"_lineTo:231":0,"moveTo:282":0,"relativeMoveTo:294":0,"_moveTo:307":0,"curveTo:332":0,"relativeCurveTo:347":0,"_curveTo:359":0,"quadraticCurveTo:410":0,"relativeQuadraticCurveTo:423":0,"_quadraticCurveTo:435":0,"drawCircle:482":0,"drawDiamond:506":0,"drawEllipse:528":0,"drawRect:569":0,"drawRoundRect:591":0,"drawWedge:618":0,"end:692":0,"closePath:702":0,"_getLinearGradient:721":0,"_getRadialGradient:801":0,"_initProps:892":0,"_createGraphic:923":0,"getBezierData:937":0,"_setCurveBoundingBox:965":0,"_trackSize:1000":0,"CanvasShape:1032":0,"init:1049":0,"initializer:1060":0,"_setGraphic:1089":0,"addClass:1113":0,"removeClass:1125":0,"getXY:1137":0,"setXY:1152":0,"contains:1170":0,"test:1182":0,"compareTo:1195":0,"_getDefaultFill:1207":0,"_getDefaultStroke:1226":0,"createNode:1279":0,"on:1308":0,"_setStrokeProps:1324":0,"set:1389":0,"_setFillProps:1407":0,"translate:1456":0,"translateX:1470":0,"translateY:1483":0,"skew:1496":0,"skewX:1507":0,"skewY:1518":0,"rotate:1529":0,"scale:1541":0,"_addTransform:1572":0,"_updateTransform:1590":0,"_updateHandler:1629":0,"_draw:1641":0,"_closePath:1656":0,"_strokeAndFill:1743":0,"_drawDashedLine:1789":0,"clear:1831":0,"getBounds:1849":0,"_getContentRect:1876":0,"toFront:1915":0,"toBack:1929":0,"_parsePathData:1945":0,"destroy:1986":0,"_destroy:2005":0,"valueFn:2025":0,"setter:2062":0,"getter:2070":0,"getter:2086":0,"valueFn:2099":0,"setter:2104":0,"setter:2164":0,"setter:2227":0,"setter:2275":0,"setter:2318":0,"getter:2337":0,"CanvasPath:2355":0,"_draw:2376":0,"createNode:2389":0,"end:2412":0,"getter:2426":0,"setter:2432":0,"getter:2446":0,"setter:2452":0,"getter:2469":0,"CanvasRect:2487":0,"_draw:2508":0,"CanvasEllipse:2530":0,"_draw:2553":0,"setter:2570":0,"getter:2575":0,"setter:2594":0,"getter:2599":0,"CanvasCircle:2622":0,"_draw:2645":0,"setter:2665":0,"getter:2671":0,"setter:2684":0,"getter:2690":0,"CanvasPieSlice:2714":0,"_draw:2735":0,"CanvasGraphic:2801":0,"valueFn:2825":0,"setter:2830":0,"getter:2851":0,"getter:2867":0,"getter:2883":0,"setter:2896":0,"setter:2913":0,"getter:2990":0,"setter:2995":0,"getter:3013":0,"setter:3018":0,"setter:3051":0,"set:3069":0,"getXY:3129":0,"initializer:3147":0,"render:3177":0,"destroy:3199":0,"addShape:3216":0,"_appendShape:3236":0,"removeShape:3256":0,"removeAllShapes:3282":0,"clear:3301":0,"_removeChildren:3312":0,"_toggleVisible:3333":0,"_getShapeClass:3362":0,"getShapeById:3394":0,"batch:3406":0,"_getDocFrag:3421":0,"_redraw:3436":0,"_calculateTranslate:3511":0,"addToRedrawQueue:3538":0,"_getUpdatedContentBounds:3566":0,"_toFront:3600":0,"_toBack:3620":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-canvas/graphics-canvas.js"].coveredLines = 890;
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
     */
    lineTo: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "lineTo", 206);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 208);
this._lineTo.apply(this, [Y.Array(arguments), false]);
    },

    /**
     * Draws a line segment from the current drawing position to the relative x and y coordinates.
     *
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     */
    relativeLineTo: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeLineTo", 218);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 220);
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
    _lineTo: function(args, relative)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_lineTo", 231);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 233);
var point1 = args[0],
            i,
            len,
            x,
            y,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 241);
if(!this._lineToMethods)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 243);
this._lineToMethods = [];
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 245);
len = args.length - 1;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 246);
if (typeof point1 === 'string' || typeof point1 === 'number') {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 247);
for (i = 0; i < len; i = i + 2) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 248);
x = parseFloat(args[i]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 249);
y = parseFloat(args[i + 1]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 250);
x = x + relativeX;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 251);
y = y + relativeY;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 252);
this._updateDrawingQueue(["lineTo", x, y]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 253);
this._trackSize(x - wt, y - wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 254);
this._trackSize(x + wt, y + wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 255);
this._updateCoords(x, y);
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 260);
for (i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 262);
x = parseFloat(args[i][0]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 263);
y = parseFloat(args[i][1]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 264);
this._updateDrawingQueue(["lineTo", x, y]);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 265);
this._lineToMethods[this._lineToMethods.length] = this._methods[this._methods.length - 1];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 266);
this._trackSize(x - wt, y - wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 267);
this._trackSize(x + wt, y + wt);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 268);
this._updateCoords(x, y);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 271);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 272);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "moveTo", 282);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 284);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeMoveTo", 294);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 296);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_moveTo", 307);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 308);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0,
            x = parseFloat(args[0]) + relativeX,
            y = parseFloat(args[1]) + relativeY;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 313);
this._updateDrawingQueue(["moveTo", x, y]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 314);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 315);
this._trackSize(x + wt, y + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 316);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 317);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 318);
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
     */
    curveTo: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "curveTo", 332);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 333);
this._curveTo.apply(this, [Y.Array(arguments), false]);
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
     */
    relativeCurveTo: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeCurveTo", 347);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 348);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_curveTo", 359);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 360);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 377);
len = args.length - 5;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 378);
for(i = 0; i < len; i = i + 6)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 380);
cp1x = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 381);
cp1y = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 382);
cp2x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 383);
cp2y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 384);
x = parseFloat(args[i + 4]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 385);
y = parseFloat(args[i + 5]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 386);
this._updateDrawingQueue(["bezierCurveTo", cp1x, cp1y, cp2x, cp2y, x, y]);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 387);
this._drawingComplete = false;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 388);
right = Math.max(x, Math.max(cp1x, cp2x));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 389);
bottom = Math.max(y, Math.max(cp1y, cp2y));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 390);
left = Math.min(x, Math.min(cp1x, cp2x));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 391);
top = Math.min(y, Math.min(cp1y, cp2y));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 392);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 393);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 394);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 395);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 396);
this._currentX = x;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 397);
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
     */
    quadraticCurveTo: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "quadraticCurveTo", 410);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 411);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "relativeQuadraticCurveTo", 423);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 424);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_quadraticCurveTo", 435);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 436);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 452);
for(i = 0; i < len; i = i + 4)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 454);
cpx = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 455);
cpy = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 456);
x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 457);
y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 458);
this._drawingComplete = false;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 459);
right = Math.max(x, cpx);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 460);
bottom = Math.max(y, cpy);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 461);
left = Math.min(x, cpx);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 462);
top = Math.min(y, cpy);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 463);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 464);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 465);
pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 466);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 467);
this._updateDrawingQueue(["quadraticCurveTo", cpx, cpy, x, y]);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 468);
this._updateCoords(x, y);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 470);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawCircle", 482);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 483);
var startAngle = 0,
            endAngle = 2 * Math.PI,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            circum = radius * 2;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 487);
circum += wt;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 488);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 489);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 490);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 491);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 492);
this._updateDrawingQueue(["arc", x + radius, y + radius, radius, startAngle, endAngle, false]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 493);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawDiamond", 506);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 508);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 510);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 511);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 512);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 513);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 514);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 515);
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
     * @protected
     */
	drawEllipse: function(x, y, w, h) {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawEllipse", 528);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 529);
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

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 541);
ax = centerX + Math.cos(0) * radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 542);
ay = centerY + Math.sin(0) * yRadius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 543);
this.moveTo(ax, ay);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 544);
for(i = 0; i < l; i++)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 546);
angle += theta;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 547);
angleMid = angle - (theta / 2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 548);
bx = centerX + Math.cos(angle) * radius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 549);
by = centerY + Math.sin(angle) * yRadius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 550);
cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 551);
cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 552);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 554);
this._trackSize(x + w + wt, y + h + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 555);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 556);
this._updateCoords(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 557);
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
     */
    drawRect: function(x, y, w, h) {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawRect", 569);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 570);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 571);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 572);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 573);
this.lineTo(x + w, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 574);
this.lineTo(x + w, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 575);
this.lineTo(x, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 576);
this.lineTo(x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 577);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawRoundRect", 591);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 592);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 593);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 594);
this.moveTo( x, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 595);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 596);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 597);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 598);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 599);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 600);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 601);
this.lineTo(x + ew, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 602);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 603);
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
    drawWedge: function(x, y, startAngle, arc, radius, yRadius)
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "drawWedge", 618);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 620);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 633);
yRadius = yRadius || radius;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 635);
this._drawingComplete = false;
        // move to x,y position
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 637);
this._updateDrawingQueue(["moveTo", x, y]);

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 639);
yRadius = yRadius || radius;

        // limit sweep to reasonable numbers
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 642);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 644);
arc = 360;
        }

        // First we calculate how many segments are needed
        // for a smooth arc.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 649);
segs = Math.ceil(Math.abs(arc) / 45);

        // Now calculate the sweep of each segment.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 652);
segAngle = arc / segs;

        // The math requires radians rather than degrees. To convert from degrees
        // use the formula (degrees/180)*Math.PI to get radians.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 656);
theta = -(segAngle / 180) * Math.PI;

        // convert angle startAngle to radians
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 659);
angle = (startAngle / 180) * Math.PI;

        // draw the curve in segments no larger than 45 degrees.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 662);
if(segs > 0)
        {
            // draw a line from the center to the start of the curve
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 665);
ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 666);
ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 667);
this.lineTo(ax, ay);
            // Loop for drawing curve segments
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 669);
for(i = 0; i < segs; ++i)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 671);
angle += theta;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 672);
angleMid = angle - (theta / 2);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 673);
bx = x + Math.cos(angle) * radius;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 674);
by = y + Math.sin(angle) * yRadius;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 675);
cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 676);
cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 677);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
            }
            // close the wedge by drawing a line to the center
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 680);
this._updateDrawingQueue(["lineTo", x, y]);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 682);
this._trackSize(-wt , -wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 683);
this._trackSize((radius * 2) + wt, (radius * 2) + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 684);
return this;
    },

    /**
     * Completes a drawing operation.
     *
     * @method end
     */
    end: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "end", 692);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 693);
this._closePath();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 694);
return this;
    },

    /**
     * Ends a fill and stroke
     *
     * @method closePath
     */
    closePath: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "closePath", 702);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 704);
this._updateDrawingQueue(["closePath"]);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 705);
this._updateDrawingQueue(["beginPath"]);
    },

	/**
	 * Clears the graphics object.
	 *
	 * @method clear
	 */

    /**
     * Returns a linear gradient fill
     *
     * @method _getLinearGradient
     * @return CanvasGradient
     * @private
     */
    _getLinearGradient: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getLinearGradient", 721);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 722);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 742);
if(Math.abs(tanRadians) * w/2 >= h/2)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 744);
if(r < 180)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 746);
y1 = y;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 747);
y2 = y + h;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 751);
y1 = y + h;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 752);
y2 = y;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 754);
x1 = cx - ((cy - y1)/tanRadians);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 755);
x2 = cx - ((cy - y2)/tanRadians);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 759);
if(r > 90 && r < 270)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 761);
x1 = x + w;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 762);
x2 = x;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 766);
x1 = x;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 767);
x2 = x + w;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 769);
y1 = ((tanRadians * (cx - x1)) - cy) * -1;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 770);
y2 = ((tanRadians * (cx - x2)) - cy) * -1;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 772);
gradient = this._context.createLinearGradient(x1, y1, x2, y2);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 773);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 775);
stop = stops[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 776);
opacity = stop.opacity;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 777);
color = stop.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 778);
offset = stop.offset;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 779);
if(isNumber(opacity))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 781);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 782);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 786);
color = TORGB(color);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 788);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 789);
gradient.addColorStop(offset, color);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 791);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getRadialGradient", 801);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 802);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 823);
xc = x + w/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 824);
yc = y + h/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 825);
x1 = w * fx;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 826);
y1 = h * fy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 827);
x2 = x + w/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 828);
y2 = y + h/2;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 829);
r2 = w * r;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 830);
d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 831);
if(d >= r2)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 833);
ratio = d/r2;
            //hack. gradient won't show if it is exactly on the edge of the arc
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 835);
if(ratio === 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 837);
ratio = 1.01;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 839);
xn = (x1 - xc)/ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 840);
yn = (y1 - yc)/ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 841);
xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 842);
yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 843);
x1 = xc + xn;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 844);
y1 = yc + yn;
        }

        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.
        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work.
        //Instead, adjust the color stops to reflect the smaller radius.
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 850);
if(r >= 0.5)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 852);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 853);
stopMultiplier = 1;
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 857);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 858);
stopMultiplier = r * 2;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 860);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 862);
stop = stops[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 863);
opacity = stop.opacity;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 864);
color = stop.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 865);
offset = stop.offset;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 866);
if(isNumber(opacity))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 868);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 869);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 873);
color = TORGB(color);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 875);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 876);
offset *= stopMultiplier;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 877);
if(offset <= 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 879);
gradient.addColorStop(offset, color);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 882);
return gradient;
    },


    /**
     * Clears all values
     *
     * @method _initProps
     * @private
     */
    _initProps: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_initProps", 892);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 893);
this._methods = [];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 894);
this._lineToMethods = [];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 895);
this._xcoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 896);
this._ycoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 897);
this._width = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 898);
this._height = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 899);
this._left = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 900);
this._top = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 901);
this._right = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 902);
this._bottom = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 903);
this._currentX = 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 904);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_createGraphic", 923);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 924);
var graphic = Y.config.doc.createElement('canvas');
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 925);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getBezierData", 937);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 938);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 943);
for (i = 0; i < n; ++i){
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 944);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 947);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 948);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 949);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 950);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 953);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setCurveBoundingBox", 965);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 967);
var i = 0,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            xy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 976);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 978);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 979);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 980);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 981);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 982);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 984);
left = Math.round(left * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 985);
right = Math.round(right * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 986);
top = Math.round(top * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 987);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 988);
this._trackSize(right + wt, bottom + wt);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 989);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_trackSize", 1000);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1001);
if (w > this._right) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1002);
this._right = w;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1004);
if(w < this._left)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1006);
this._left = w;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1008);
if (h < this._top)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1010);
this._top = h;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1012);
if (h > this._bottom)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1014);
this._bottom = h;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1016);
this._width = this._right - this._left;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1017);
this._height = this._bottom - this._top;
    }
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1020);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1032);
CanvasShape = function(cfg)
{
    _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasShape", 1032);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1034);
this._transforms = [];
    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1035);
this.matrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1036);
CanvasShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1039);
CanvasShape.NAME = "shape";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1041);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "init", 1049);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1051);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "initializer", 1060);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1062);
var host = this,
            graphic = cfg.graphic,
            data = this.get("data");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1065);
host._initProps();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1066);
host.createNode();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1067);
host._xcoords = [0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1068);
host._ycoords = [0];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1069);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1071);
this._setGraphic(graphic);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1073);
if(data)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1075);
host._parsePathData(data);
        }
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1077);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setGraphic", 1089);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1091);
var graphic;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1092);
if(render instanceof Y.CanvasGraphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1094);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1098);
render = Y.one(render);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1099);
graphic = new Y.CanvasGraphic({
                render: render
            });
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1102);
graphic._appendShape(this);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1103);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addClass", 1113);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1115);
var node = Y.one(this.get("node"));
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1116);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeClass", 1125);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1127);
var node = Y.one(this.get("node"));
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1128);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getXY", 1137);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1139);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1143);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setXY", 1152);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1154);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = xy[0] - parentXY[0],
			y = xy[1] - parentXY[1];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1158);
this._set("x", x);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1159);
this._set("y", y);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1160);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "contains", 1170);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1172);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "test", 1182);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1184);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "compareTo", 1195);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1196);
var node = this.node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1197);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDefaultFill", 1207);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1208);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDefaultStroke", 1226);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1228);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "createNode", 1279);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1281);
var host = this,
            node = Y.config.doc.createElement('canvas'),
			id = host.get("id"),
            concat = host._camelCaseConcat,
            name = host.name;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1286);
host._context = node.getContext('2d');
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1287);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1288);
node.style.overflow = "visible";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1289);
if(!host.get("visible"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1291);
node.style.visibility = "hidden";
        }
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1293);
node.setAttribute("id", id);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1294);
id = "#" + id;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1295);
host.node = node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1296);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "on", 1308);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1310);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1312);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1314);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setStrokeProps", 1324);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1326);
var color,
			weight,
			opacity,
			linejoin,
			linecap,
			dashstyle;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1332);
if(stroke)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1334);
color = stroke.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1335);
weight = PARSE_FLOAT(stroke.weight);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1336);
opacity = PARSE_FLOAT(stroke.opacity);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1337);
linejoin = stroke.linejoin || "round";
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1338);
linecap = stroke.linecap || "butt";
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1339);
dashstyle = stroke.dashstyle;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1340);
this._miterlimit = null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1341);
this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1342);
this._strokeWeight = weight;

            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1344);
if (IS_NUMBER(weight) && weight > 0)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1346);
this._stroke = 1;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1350);
this._stroke = 0;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1352);
if (IS_NUMBER(opacity)) {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1353);
this._strokeStyle = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1357);
this._strokeStyle = color;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1359);
this._linecap = linecap;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1360);
if(linejoin == "round" || linejoin == "bevel")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1362);
this._linejoin = linejoin;
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1366);
linejoin = parseInt(linejoin, 10);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1367);
if(IS_NUMBER(linejoin))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1369);
this._miterlimit =  Math.max(linejoin, 1);
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1370);
this._linejoin = "miter";
                }
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1376);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "set", 1389);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1391);
var host = this,
			val = arguments[0];
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1393);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1394);
if(host.initialized)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1396);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_setFillProps", 1407);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1409);
var isNumber = IS_NUMBER,
			color,
			opacity,
			type;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1413);
if(fill)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1415);
color = fill.color;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1416);
type = fill.type;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1417);
if(type == "linear" || type == "radial")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1419);
this._fillType = type;
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1421);
if(color)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1423);
opacity = fill.opacity;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1424);
if (isNumber(opacity))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1426);
opacity = Math.max(0, Math.min(1, opacity));
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1427);
color = this._toRGBA(color, opacity);
                }
                else
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1431);
color = TORGB(color);
                }

                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1434);
this._fillColor = color;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1435);
this._fillType = 'solid';
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1439);
this._fillColor = null;
            }}
        }
		else
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1444);
this._fillType = null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1445);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translate", 1456);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1458);
this._translateX += x;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1459);
this._translateY += y;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1460);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translateX", 1470);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1472);
this._translateX += x;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1473);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "translateY", 1483);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1485);
this._translateY += y;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1486);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skew", 1496);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1498);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skewX", 1507);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1509);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "skewY", 1518);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1520);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "rotate", 1529);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1531);
this._rotation = deg;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1532);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "scale", 1541);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1543);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_addTransform", 1572);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1574);
args = Y.Array(args);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1575);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1576);
args.unshift(type);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1577);
this._transforms.push(args);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1578);
if(this.initialized)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1580);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateTransform", 1590);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1592);
var node = this.node,
			key,
			transform,
			transformOrigin = this.get("transformOrigin"),
            matrix = this.matrix,
            i,
            len = this._transforms.length;

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1600);
if(this._transforms && this._transforms.length > 0)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1602);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1604);
key = this._transforms[i].shift();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1605);
if(key)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1607);
matrix[key].apply(matrix, this._transforms[i]);
                }
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1610);
transform = matrix.toCSSText();
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1613);
this._graphic.addToRedrawQueue(this);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1614);
transformOrigin = (100 * transformOrigin[0]) + "% " + (100 * transformOrigin[1]) + "%";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1615);
Y_DOM.setStyle(node, "transformOrigin", transformOrigin);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1616);
if(transform)
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1618);
Y_DOM.setStyle(node, "transform", transform);
		}
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1620);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_updateHandler", 1629);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1631);
this._draw();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1632);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 1641);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1643);
var node = this.node;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1644);
this.clear();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1645);
this._closePath();
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1646);
node.style.left = this.get("x") + "px";
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1647);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_closePath", 1656);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1658);
if(!this._methods)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1660);
return;
		}
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1662);
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
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1674);
this._context.clearRect(0, 0, node.width, node.height);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1675);
if(this._methods)
        {
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1677);
len = cachedMethods.length;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1678);
if(!len || len < 1)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1680);
return;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1682);
for(i = 0; i < len; ++i)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1684);
methods[i] = cachedMethods[i].concat();
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1685);
args = methods[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1686);
argsLen = (args[0] == "quadraticCurveTo" || args[0] == "bezierCurveTo") ? args.length : 3;
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1687);
for(j = 1; j < argsLen; ++j)
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1689);
if(j % 2 === 0)
					{
						_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1691);
args[j] = args[j] - this._top;
					}
					else
					{
						_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1695);
args[j] = args[j] - this._left;
					}
				}
			}
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1699);
node.setAttribute("width", Math.min(w, 2000));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1700);
node.setAttribute("height", Math.min(2000, h));
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1701);
context.beginPath();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1702);
for(i = 0; i < len; ++i)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1704);
args = methods[i].concat();
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1705);
if(args && args.length > 0)
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1707);
method = args.shift();
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1708);
if(method)
					{
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1710);
if(method == "closePath")
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1712);
context.closePath();
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1713);
this._strokeAndFill(context);
                        }
						else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1715);
if(method && method == "lineTo" && this._dashstyle)
						{
							_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1717);
args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);
							_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1718);
this._drawDashedLine.apply(this, args);
						}
						else
						{
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1722);
context[method].apply(context, args);
						}}
					}
				}
			}

            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1728);
this._strokeAndFill(context);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1729);
this._drawingComplete = true;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1730);
this._clearAndUpdateCoords();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1731);
this._updateNodePosition();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1732);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_strokeAndFill", 1743);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1745);
if (this._fillType)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1747);
if(this._fillType == "linear")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1749);
context.fillStyle = this._getLinearGradient();
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1751);
if(this._fillType == "radial")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1753);
context.fillStyle = this._getRadialGradient();
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1757);
context.fillStyle = this._fillColor;
            }}
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1759);
context.closePath();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1760);
context.fill();
        }

        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1763);
if (this._stroke) {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1764);
if(this._strokeWeight)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1766);
context.lineWidth = this._strokeWeight;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1768);
context.lineCap = this._linecap;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1769);
context.lineJoin = this._linejoin;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1770);
if(this._miterlimit)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1772);
context.miterLimit = this._miterlimit;
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1774);
context.strokeStyle = this._strokeStyle;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1775);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_drawDashedLine", 1789);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1791);
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
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1803);
xDelta = Math.cos(radians) * segmentLength;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1804);
yDelta = Math.sin(radians) * segmentLength;

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1806);
for(i = 0; i < segmentCount; ++i)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1808);
context.moveTo(xCurrent, yCurrent);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1809);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1810);
xCurrent += xDelta;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1811);
yCurrent += yDelta;
		}

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1814);
context.moveTo(xCurrent, yCurrent);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1815);
delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1817);
if(delta > dashsize)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1819);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
		}
		else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1821);
if(delta > 0)
		{
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1823);
context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);
		}}

		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1826);
context.moveTo(xEnd, yEnd);
	},

	//This should move to CanvasDrawing class.
    //Currently docmented in CanvasDrawing class.
    clear: function() {
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "clear", 1831);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1832);
this._initProps();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1833);
if(this.node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1835);
this._context.clearRect(0, 0, this.node.width, this.node.height);
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1837);
return this;
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getBounds", 1849);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1851);
var type = this._type,
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1856);
if(type == "path")
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1858);
x = x + this._left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1859);
y = y + this._top;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1860);
w = this._right - this._left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1861);
h = this._bottom - this._top;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1863);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getContentRect", 1876);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1878);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1888);
if(this._type == "path")
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1890);
transformX = transformX + x;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1891);
transformY = transformY + y;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1893);
transformX = !isNaN(transformX) ? transformX : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1894);
transformY = !isNaN(transformY) ? transformY : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1895);
matrix.translate(transformX, transformY);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1896);
for(i = 0; i < len; i = i + 1)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1898);
transform = transforms[i];
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1899);
key = transform.shift();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1900);
if(key)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1902);
matrix[key].apply(matrix, transform);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1905);
matrix.translate(-transformX, -transformY);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1906);
contentRect = matrix.getContentRect(w, h, x, y);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1907);
return contentRect;
    },

    /**
     * Places the shape above all other shapes.
     *
     * @method toFront
     */
    toFront: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "toFront", 1915);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1917);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1918);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1920);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "toBack", 1929);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1931);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1932);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1934);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_parsePathData", 1945);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1947);
var method,
            methodSymbol,
            args,
            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),
            i,
            len,
            str,
            symbolToMethod = this._pathSymbolToMethod;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1955);
if(commandArray)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1957);
this.clear();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1958);
len = commandArray.length || 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1959);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1961);
str = commandArray[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1962);
methodSymbol = str.substr(0, 1);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1963);
args = str.substr(1).match(SPLITARGSPATTERN);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1964);
method = symbolToMethod[methodSymbol];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1965);
if(method)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1967);
if(args)
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1969);
this[method].apply(this, args);
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1973);
this[method].apply(this);
                    }
                }
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1977);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "destroy", 1986);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1988);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1989);
if(graphic)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1991);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 1995);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_destroy", 2005);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2007);
if(this.node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2009);
Y.one(this.node).remove(true);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2010);
this._context = null;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2011);
this.node = null;
        }
    }
}, Y.CanvasDrawing.prototype));

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2016);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2025);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2027);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2062);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2064);
this.matrix.init();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2065);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2066);
this._transform = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2067);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2070);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2072);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2086);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2088);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2099);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2101);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2104);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2106);
var node = this.node;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2107);
if(node)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2109);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2111);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2164);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2165);
var node = this.get("node"),
                visibility = val ? "visible" : "hidden";
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2167);
if(node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2169);
node.style.visibility = visibility;
            }
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2171);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2227);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2229);
var fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2231);
fill = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2232);
if(fill && fill.color)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2234);
if(fill.color === undefined || fill.color == "none")
				{
					_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2236);
fill.color = null;
				}
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2239);
this._setFillProps(fill);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2240);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2275);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2277);
var tmpl = this.get("stroke") || this._getDefaultStroke(),
                wt;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2279);
if(val && val.hasOwnProperty("weight"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2281);
wt = parseInt(val.weight, 10);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2282);
if(!isNaN(wt))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2284);
val.weight = wt;
                }
            }
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2287);
val = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2288);
this._setStrokeProps(val);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2289);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2318);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2320);
if(this.get("node"))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2322);
this._parsePathData(val);
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2324);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2337);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2339);
return this._graphic;
		}
    }
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2343);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2355);
CanvasPath = function(cfg)
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasPath", 2355);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2357);
CanvasPath.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2359);
CanvasPath.NAME = "path";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2360);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2376);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2378);
this._closePath();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2379);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "createNode", 2389);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2391);
var host = this,
            node = Y.config.doc.createElement('canvas'),
			name = host.name,
            concat = host._camelCaseConcat,
            id = host.get("id");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2396);
host._context = node.getContext('2d');
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2397);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2398);
node.setAttribute("pointer-events", "none");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2399);
node.style.pointerEvents = "none";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2400);
node.style.overflow = "visible";
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2401);
node.setAttribute("id", id);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2402);
id = "#" + id;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2403);
host.node = node;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2404);
host.addClass(_getClassName(SHAPE) + " " + _getClassName(concat(IMPLEMENTATION, SHAPE)) + " " + _getClassName(name) + " " + _getClassName(concat(IMPLEMENTATION, name)));
	},

    /**
     * Completes a drawing operation.
     *
     * @method end
     */
    end: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "end", 2412);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2414);
this._draw();
    }
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2418);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2426);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2428);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2429);
return this._width - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2432);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2434);
this._width = val;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2435);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2446);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2448);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2449);
return this._height - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2452);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2454);
this._height = val;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2455);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2469);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2471);
return this._path;
		}
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2475);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2487);
CanvasRect = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasRect", 2487);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2489);
CanvasRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2491);
CanvasRect.NAME = "rect";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2492);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2508);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2510);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2512);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2513);
this.drawRect(0, 0, w, h);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2514);
this._closePath();
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2517);
CanvasRect.ATTRS = Y.CanvasShape.ATTRS;
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2518);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2530);
CanvasEllipse = function(cfg)
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasEllipse", 2530);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2532);
CanvasEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2535);
CanvasEllipse.NAME = "ellipse";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2537);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2553);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2555);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2557);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2558);
this.drawEllipse(0, 0, w, h);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2559);
this._closePath();
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2562);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2570);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2572);
this.set("width", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2575);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2577);
var val = this.get("width");
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2578);
if(val)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2580);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2582);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2594);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2596);
this.set("height", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2599);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2601);
var val = this.get("height");
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2602);
if(val)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2604);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2606);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2610);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2622);
CanvasCircle = function(cfg)
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasCircle", 2622);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2624);
CanvasCircle.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2627);
CanvasCircle.NAME = "circle";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2629);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2645);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2647);
var radius = this.get("radius");
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2648);
if(radius)
		{
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2650);
this.clear();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2651);
this.drawCircle(0, 0, radius);
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2652);
this._closePath();
		}
	}
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2657);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2665);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2667);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2668);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2671);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2673);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2684);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2686);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2687);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2690);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2692);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2706);
Y.CanvasCircle = CanvasCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class CanvasPieSlice
 * @constructor
 */
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2714);
CanvasPieSlice = function()
{
	_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasPieSlice", 2714);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2716);
CanvasPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2718);
CanvasPieSlice.NAME = "canvasPieSlice";
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2719);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_draw", 2735);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2737);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2742);
this.clear();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2743);
this._left = x;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2744);
this._right = radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2745);
this._top = y;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2746);
this._bottom = radius;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2747);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2748);
this.end();
	}
 });
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2751);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2789);
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
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2801);
function CanvasGraphic(config) {

    _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "CanvasGraphic", 2801);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2803);
CanvasGraphic.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2806);
CanvasGraphic.NAME = "canvasGraphic";

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2808);
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
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "valueFn", 2825);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2827);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2830);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2832);
var node = this._node;
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2833);
if(node)
			{
				_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2835);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2837);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2851);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2853);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2867);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2869);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2883);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2885);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2896);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2898);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2900);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2902);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2913);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2915);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2917);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2919);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 2990);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2992);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 2995);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2997);
this._x = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 2998);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3000);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3002);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getter", 3013);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3015);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3018);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3020);
this._y = val;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3021);
if(this._node)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3023);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3025);
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
            _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "setter", 3051);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3053);
this._toggleVisible(val);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3054);
return val;
        }
    }
};

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3059);
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
		_yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "set", 3069);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3071);
var host = this,
            redrawAttrs = {
                autoDraw: true,
                autoSize: true,
                preserveAspectRatio: true,
                resizeDown: true
            },
            key,
            forceRedraw = false;
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3080);
AttributeLite.prototype.set.apply(host, arguments);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3081);
if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3083);
if(Y_LANG.isString && redrawAttrs[attr])
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3085);
forceRedraw = true;
            }
            else {_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3087);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3089);
for(key in redrawAttrs)
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3091);
if(redrawAttrs.hasOwnProperty(key) && attr[key])
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3093);
forceRedraw = true;
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3094);
break;
                    }
                }
            }}
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3099);
if(forceRedraw)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3101);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getXY", 3129);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3131);
var node = Y.one(this._node),
            xy;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3133);
if(node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3135);
xy = node.getXY();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3137);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "initializer", 3147);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3148);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden",
            w = this.get("width") || 0,
            h = this.get("height") || 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3152);
this._shapes = {};
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3153);
this._redrawQueue = {};
		_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3154);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3160);
this._node = DOCUMENT.createElement('div');
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3161);
this._node.style.position = "absolute";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3162);
this._node.style.visibility = visibility;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3163);
this.set("width", w);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3164);
this.set("height", h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3165);
if(render)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3167);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "render", 3177);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3178);
var parentNode = Y.one(render),
            node = this._node,
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3182);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3183);
parentNode.appendChild(node);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3184);
node.style.display = "block";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3185);
node.style.position = "absolute";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3186);
node.style.left = "0px";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3187);
node.style.top = "0px";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3188);
this.set("width", w);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3189);
this.set("height", h);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3190);
this.parentNode = parentNode;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3191);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "destroy", 3199);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3201);
this.removeAllShapes();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3202);
if(this._node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3204);
this._removeChildren(this._node);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3205);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addShape", 3216);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3218);
cfg.graphic = this;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3219);
if(!this.get("visible"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3221);
cfg.visible = false;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3223);
var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3225);
this._appendShape(shape);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3226);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_appendShape", 3236);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3238);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3240);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3242);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3246);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeShape", 3256);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3258);
if(!(shape instanceof CanvasShape))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3260);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3262);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3265);
if(shape && shape instanceof CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3267);
shape._destroy();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3268);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3270);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3272);
this._redraw();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3274);
return shape;
    },

    /**
     * Removes all shape instances from the dom.
     *
     * @method removeAllShapes
     */
    removeAllShapes: function()
    {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "removeAllShapes", 3282);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3284);
var shapes = this._shapes,
            i;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3286);
for(i in shapes)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3288);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3290);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3293);
this._shapes = {};
    },

    /**
     * Clears the graphics object.
     *
     * @method clear
     */
    clear: function() {
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "clear", 3301);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3302);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_removeChildren", 3312);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3314);
if(node && node.hasChildNodes())
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3316);
var child;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3317);
while(node.firstChild)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3319);
child = node.firstChild;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3320);
this._removeChildren(child);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3321);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toggleVisible", 3333);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3335);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3338);
if(shapes)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3340);
for(i in shapes)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3342);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3344);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3348);
if(this._node)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3350);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getShapeClass", 3362);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3364);
var shape = this._shapeClass[val];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3365);
if(shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3367);
return shape;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3369);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "getShapeById", 3394);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3396);
var shape = this._shapes[id];
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3397);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "batch", 3406);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3408);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3409);
this.set("autoDraw", false);
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3410);
method();
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3411);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getDocFrag", 3421);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3423);
if(!this._frag)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3425);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3427);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_redraw", 3436);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3438);
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
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3451);
if(autoSize)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3453);
if(autoSize == "sizeContentToGraphic")
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3455);
contentWidth = box.right - box.left;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3456);
contentHeight = box.bottom - box.top;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3457);
w = parseFloat(Y_DOM.getComputedStyle(node, "width"));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3458);
h = parseFloat(Y_DOM.getComputedStyle(node, "height"));
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3459);
matrix = new Y.Matrix();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3460);
if(preserveAspectRatio == "none")
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3462);
xScale = w/contentWidth;
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3463);
yScale = h/contentHeight;
                }
                else
                {
                    _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3467);
if(contentWidth/contentHeight !== w/h)
                    {
                        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3469);
if(contentWidth * h/contentHeight > w)
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3471);
xScale = yScale = w/contentWidth;
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3472);
translateY = this._calculateTranslate(preserveAspectRatio.slice(5).toLowerCase(), contentHeight * w/contentWidth, h);
                        }
                        else
                        {
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3476);
xScale = yScale = h/contentHeight;
                            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3477);
translateX = this._calculateTranslate(preserveAspectRatio.slice(1, 4).toLowerCase(), contentWidth * h/contentHeight, w);
                        }
                    }
                }
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3481);
Y_DOM.setStyle(node, "transformOrigin", "0% 0%");
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3482);
translateX = translateX - (box.left * xScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3483);
translateY = translateY - (box.top * yScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3484);
matrix.translate(translateX, translateY);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3485);
matrix.scale(xScale, yScale);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3486);
Y_DOM.setStyle(node, "transform", matrix.toCSSText());
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3490);
this.set("width", box.right);
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3491);
this.set("height", box.bottom);
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3494);
if(this._frag)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3496);
this._node.appendChild(this._frag);
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3497);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_calculateTranslate", 3511);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3513);
var ratio = boundsSize - contentSize,
            coord;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3515);
switch(position)
        {
            case "mid" :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3518);
coord = ratio * 0.5;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3519);
break;
            case "max" :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3521);
coord = ratio;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3522);
break;
            default :
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3524);
coord = 0;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3525);
break;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3527);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "addToRedrawQueue", 3538);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3540);
var shapeBox,
            box;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3542);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3543);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3545);
shapeBox = shape.getBounds();
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3546);
box = this._contentBounds;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3547);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3548);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3549);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3550);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3551);
this._contentBounds = box;
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3553);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3555);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_getUpdatedContentBounds", 3566);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3568);
var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {};
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3573);
for(i in queue)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3575);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3577);
shape = queue[i];
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3578);
bounds = shape.getBounds();
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3579);
box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3580);
box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3581);
box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3582);
box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;
            }
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3585);
box.left = Y_LANG.isNumber(box.left) ? box.left : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3586);
box.top = Y_LANG.isNumber(box.top) ? box.top : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3587);
box.right = Y_LANG.isNumber(box.right) ? box.right : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3588);
box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3589);
this._contentBounds = box;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3590);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toFront", 3600);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3602);
var contentNode = this.get("node");
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3603);
if(shape instanceof Y.CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3605);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3607);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3609);
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
        _yuitest_coverfunc("build/graphics-canvas/graphics-canvas.js", "_toBack", 3620);
_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3622);
var contentNode = this.get("node"),
            targetNode;
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3624);
if(shape instanceof Y.CanvasShape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3626);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3628);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3630);
targetNode = contentNode.firstChild;
            _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3631);
if(targetNode)
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3633);
contentNode.insertBefore(shape, targetNode);
            }
            else
            {
                _yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3637);
contentNode.appendChild(shape);
            }
        }
    }
});

_yuitest_coverline("build/graphics-canvas/graphics-canvas.js", 3643);
Y.CanvasGraphic = CanvasGraphic;


}, '@VERSION@', {"requires": ["graphics"]});
