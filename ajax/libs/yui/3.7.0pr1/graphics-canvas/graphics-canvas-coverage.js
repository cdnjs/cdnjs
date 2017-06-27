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
_yuitest_coverage["/build/graphics-canvas/graphics-canvas.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/graphics-canvas/graphics-canvas.js",
    code: []
};
_yuitest_coverage["/build/graphics-canvas/graphics-canvas.js"].code=["YUI.add('graphics-canvas', function(Y) {","","var SHAPE = \"canvasShape\",","    DOCUMENT = Y.config.doc,","    Y_LANG = Y.Lang,","    AttributeLite = Y.AttributeLite,","	CanvasShape,","	CanvasPath,","	CanvasRect,","    CanvasEllipse,","	CanvasCircle,","    CanvasPieSlice,","    Y_Color = Y.Color,","    PARSE_INT = parseInt,","    PARSE_FLOAT = parseFloat,","    IS_NUMBER = Y_LANG.isNumber,","    RE = RegExp,","    TORGB = Y_Color.toRGB,","    TOHEX = Y_Color.toHex,","    _getClassName = Y.ClassNameManager.getClassName;","","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class. "," * `CanvasDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Drawing.html\">`Drawing`</a> "," * class will point to the `CanvasDrawing` class."," *"," * @module graphics"," * @class CanvasDrawing"," * @constructor"," */","function CanvasDrawing()","{","}","","CanvasDrawing.prototype = {","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","    ","    /**","     * Parses hex color string and alpha value to rgba","     *","     * @method _toRGBA","     * @param {Object} val Color value to parse. Can be hex string, rgb or name.","     * @param {Number} alpha Numeric value between 0 and 1 representing the alpha level.","     * @private","     */","    _toRGBA: function(val, alpha) {","        alpha = (alpha !== undefined) ? alpha : 1;","        if (!Y_Color.re_RGB.test(val)) {","            val = TOHEX(val);","        }","","        if(Y_Color.re_hex.exec(val)) {","            val = 'rgba(' + [","                PARSE_INT(RE.$1, 16),","                PARSE_INT(RE.$2, 16),","                PARSE_INT(RE.$3, 16)","            ].join(',') + ',' + alpha + ')';","        }","        return val;","    },","","    /**","     * Converts color to rgb format","     *","     * @method _toRGB","     * @param val Color value to convert.","     * @private ","     */","    _toRGB: function(val) {","        return TORGB(val);","    },","","    /**","     * Sets the size of the graphics object.","     * ","     * @method setSize","     * @param w {Number} width to set for the instance.","     * @param h {Number} height to set for the instance.","     * @private","     */","	setSize: function(w, h) {","        if(this.get(\"autoSize\"))","        {","            if(w > this.node.getAttribute(\"width\"))","            {","                this.node.style.width = w + \"px\";","                this.node.setAttribute(\"width\", w);","            }","            if(h > this.node.getAttribute(\"height\"))","            {","                this.node.style.height = h + \"px\";","                this.node.setAttribute(\"height\", h);","            }","        }","    },","    ","	/**","     * Tracks coordinates. Used to calculate the start point of dashed lines. ","     *","     * @method _updateCoords","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","	 * @private","	 */","    _updateCoords: function(x, y)","    {","        this._xcoords.push(x);","        this._ycoords.push(y);","        this._currentX = x;","        this._currentY = y;","    },","","	/**","     * Clears the coordinate arrays. Called at the end of a drawing operation.  ","	 * ","     * @method _clearAndUpdateCoords","     * @private","	 */","    _clearAndUpdateCoords: function()","    {","        var x = this._xcoords.pop() || 0,","            y = this._ycoords.pop() || 0;","        this._updateCoords(x, y);","    },","","	/**","     * Moves the shape's dom node.","     *","     * @method _updateNodePosition","	 * @private","	 */","    _updateNodePosition: function()","    {","        var node = this.get(\"node\"),","            x = this.get(\"x\"),","            y = this.get(\"y\"); ","        node.style.position = \"absolute\";","        node.style.left = (x + this._left) + \"px\";","        node.style.top = (y + this._top) + \"px\";","    },","    ","    /**","     * Queues up a method to be executed when a shape redraws.","     *","     * @method _updateDrawingQueue","     * @param {Array} val An array containing data that can be parsed into a method and arguments. The value at zero-index of the array is a string reference of","     * the drawing method that will be called. All subsequent indices are argument for that method. For example, `lineTo(10, 100)` would be structured as:","     * `[\"lineTo\", 10, 100]`.","     * @private","     */","    _updateDrawingQueue: function(val)","    {","        this._methods.push(val);","    },","    ","    /**","     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.","     * ","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     */","    lineTo: function(point1, point2, etc) ","    {","        var args = arguments, ","            i = 0, ","            len,","            x,","            y,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        if(!this._lineToMethods)","        {","            this._lineToMethods = [];","        }","        if (typeof point1 === 'string' || typeof point1 === 'number') {","            args = [[point1, point2]];","        }","","        len = args.length;","        for (; i < len; ++i) ","        {","            if(args[i])","            {","                x = args[i][0];","                y = args[i][1];","                this._updateDrawingQueue([\"lineTo\", x, y]);","                this._lineToMethods[this._lineToMethods.length] = this._methods[this._methods.length - 1];","                this._trackSize(x - wt, y - wt);","                this._trackSize(x + wt, y + wt);","                this._updateCoords(x, y);","            }","        }","        this._drawingComplete = false;","        return this;","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    moveTo: function(x, y) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._updateDrawingQueue([\"moveTo\", x, y]);","        this._trackSize(x - wt, y - wt);","        this._trackSize(x + wt, y + wt);","        this._updateCoords(x, y);","        this._drawingComplete = false;","        return this;","    },","    ","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    curveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {","        var w,","            h,","            pts,","            right,","            left,","            bottom,","            top;","        this._updateDrawingQueue([\"bezierCurveTo\", cp1x, cp1y, cp2x, cp2y, x, y]);","        this._drawingComplete = false;","        right = Math.max(x, Math.max(cp1x, cp2x));","        bottom = Math.max(y, Math.max(cp1y, cp2y));","        left = Math.min(x, Math.min(cp1x, cp2x));","        top = Math.min(y, Math.min(cp1y, cp2y));","        w = Math.abs(right - left);","        h = Math.abs(bottom - top);","        pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]]; ","        this._setCurveBoundingBox(pts, w, h);","        this._updateCoords(x, y);","        return this;","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     */","    quadraticCurveTo: function(cpx, cpy, x, y) {","        var w,","            h,","            pts,","            right,","            left,","            bottom,","            top,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._updateDrawingQueue([\"quadraticCurveTo\", cpx, cpy, x, y]);","        this._drawingComplete = false;","        right = Math.max(x, cpx);","        bottom = Math.max(y, cpy);","        left = Math.min(x, cpx);","        top = Math.min(y, cpy);","        w = Math.abs(right - left);","        h = Math.abs(bottom - top);","        pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]]; ","        this._setCurveBoundingBox(pts, w, h);","        this._updateCoords(x, y);","        return this;","    },","","    /**","     * Draws a circle. Used internally by `CanvasCircle` class.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var startAngle = 0,","            endAngle = 2 * Math.PI,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            circum = radius * 2;","            circum += wt;","        this._drawingComplete = false;","        this._trackSize(x + circum, y + circum);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        this._updateDrawingQueue([\"arc\", x + radius, y + radius, radius, startAngle, endAngle, false]);","        return this;","    },","","    /**","     * Draws a diamond.     ","     * ","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws an ellipse. Used internally by `CanvasEllipse` class.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var l = 8,","            theta = -(45/180) * Math.PI,","            angle = 0,","            angleMid,","            radius = w/2,","            yRadius = h/2,","            i = 0,","            centerX = x + radius,","            centerY = y + yRadius,","            ax, ay, bx, by, cx, cy,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","","        ax = centerX + Math.cos(0) * radius;","        ay = centerY + Math.sin(0) * yRadius;","        this.moveTo(ax, ay);","        for(; i < l; i++)","        {","            angle += theta;","            angleMid = angle - (theta / 2);","            bx = centerX + Math.cos(angle) * radius;","            by = centerY + Math.sin(angle) * yRadius;","            cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","            cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","            this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","        }","        this._trackSize(x + w + wt, y + h + wt);","        this._trackSize(x - wt, y - wt);","        this._updateCoords(x, y);","        return this;","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     */","    drawRect: function(x, y, w, h) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._drawingComplete = false;","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     * ","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;","        this._drawingComplete = false;","        this.moveTo( x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","    },","    ","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius, yRadius)","    {","        var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            segs,","            segAngle,","            theta,","            angle,","            angleMid,","            ax,","            ay,","            bx,","            by,","            cx,","            cy,","            i = 0;","        yRadius = yRadius || radius;","","        this._drawingComplete = false;","        // move to x,y position","        this._updateDrawingQueue([\"moveTo\", x, y]);","        ","        yRadius = yRadius || radius;","        ","        // limit sweep to reasonable numbers","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","        ","        // First we calculate how many segments are needed","        // for a smooth arc.","        segs = Math.ceil(Math.abs(arc) / 45);","        ","        // Now calculate the sweep of each segment.","        segAngle = arc / segs;","        ","        // The math requires radians rather than degrees. To convert from degrees","        // use the formula (degrees/180)*Math.PI to get radians.","        theta = -(segAngle / 180) * Math.PI;","        ","        // convert angle startAngle to radians","        angle = (startAngle / 180) * Math.PI;","        ","        // draw the curve in segments no larger than 45 degrees.","        if(segs > 0)","        {","            // draw a line from the center to the start of the curve","            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;","            ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;","            this.lineTo(ax, ay);","            // Loop for drawing curve segments","            for(; i < segs; ++i)","            {","                angle += theta;","                angleMid = angle - (theta / 2);","                bx = x + Math.cos(angle) * radius;","                by = y + Math.sin(angle) * yRadius;","                cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","                cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","                this._updateDrawingQueue([\"quadraticCurveTo\", cx, cy, bx, by]);","            }","            // close the wedge by drawing a line to the center","            this._updateDrawingQueue([\"lineTo\", x, y]);","        }","        this._trackSize(0 - wt , 0 - wt);","        this._trackSize((radius * 2) + wt, (radius * 2) + wt);","        return this;","    },","    ","    /**","     * Completes a drawing operation. ","     *","     * @method end","     */","    end: function() {","        this._closePath();","        return this;","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     */","    closePath: function()","    {","        this._updateDrawingQueue([\"closePath\"]);","        this._updateDrawingQueue([\"beginPath\"]);","    },","","	/**","	 * Clears the graphics object.","	 *","	 * @method clear","	 */","    ","    /**","     * Returns a linear gradient fill","     *","     * @method _getLinearGradient","     * @return CanvasGradient","     * @private","     */","    _getLinearGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            stops = fill.stops,","            opacity,","            color,","            stop,","            i = 0,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            r = fill.rotation || 0,","            x1, x2, y1, y2,","            cx = x + w/2,","            cy = y + h/2,","            offset,","            radCon = Math.PI/180,","            tanRadians = parseFloat(parseFloat(Math.tan(r * radCon)).toFixed(8));","        if(Math.abs(tanRadians) * w/2 >= h/2)","        {","            if(r < 180)","            {","                y1 = y;","                y2 = y + h;","            }","            else","            {","                y1 = y + h;","                y2 = y;","            }","            x1 = cx - ((cy - y1)/tanRadians);","            x2 = cx - ((cy - y2)/tanRadians); ","        }","        else","        {","            if(r > 90 && r < 270)","            {","                x1 = x + w;","                x2 = x;","            }","            else","            {","                x1 = x;","                x2 = x + w;","            }","            y1 = ((tanRadians * (cx - x1)) - cy) * -1;","            y2 = ((tanRadians * (cx - x2)) - cy) * -1;","        }","        gradient = this._context.createLinearGradient(x1, y1, x2, y2);","        for(; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            gradient.addColorStop(offset, color);","        }","        return gradient;","    },","","    /**","     * Returns a radial gradient fill","     *","     * @method _getRadialGradient","     * @return CanvasGradient","     * @private","     */","    _getRadialGradient: function() {","        var isNumber = Y.Lang.isNumber,","            fill = this.get(\"fill\"),","            r = fill.r,","            fx = fill.fx,","            fy = fill.fy,","            stops = fill.stops,","            opacity,","            color,","            stop,","            i = 0,","            len = stops.length,","            gradient,","            x = 0,","            y = 0,","            w = this.get(\"width\"),","            h = this.get(\"height\"),","            x1, x2, y1, y2, r2, ","            xc, yc, xn, yn, d, ","            offset,","            ratio,","            stopMultiplier;","        xc = x + w/2;","        yc = y + h/2;","        x1 = w * fx;","        y1 = h * fy;","        x2 = x + w/2;","        y2 = y + h/2;","        r2 = w * r;","        d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );","        if(d >= r2)","        {","            ratio = d/r2;","            //hack. gradient won't show if it is exactly on the edge of the arc","            if(ratio === 1)","            {","                ratio = 1.01;","            }","            xn = (x1 - xc)/ratio;","            yn = (y1 - yc)/ratio;","            xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);","            yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);","            x1 = xc + xn;","            y1 = yc + yn;","        }","        ","        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.","        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work. ","        //Instead, adjust the color stops to reflect the smaller radius.","        if(r >= 0.5)","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);","            stopMultiplier = 1;","        }","        else","        {","            gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);","            stopMultiplier = r * 2;","        }","        for(; i < len; ++i)","        {","            stop = stops[i];","            opacity = stop.opacity;","            color = stop.color;","            offset = stop.offset;","            if(isNumber(opacity))","            {","                opacity = Math.max(0, Math.min(1, opacity));","                color = this._toRGBA(color, opacity);","            }","            else","            {","                color = TORGB(color);","            }","            offset = stop.offset || i/(len - 1);","            offset *= stopMultiplier;","            if(offset <= 1)","            {","                gradient.addColorStop(offset, color);","            }","        }","        return gradient;","    },","","","    /**","     * Clears all values","     *","     * @method _initProps","     * @private","     */","    _initProps: function() {","        this._methods = [];","        this._lineToMethods = [];","        this._xcoords = [0];","		this._ycoords = [0];","		this._width = 0;","        this._height = 0;","        this._left = 0;","        this._top = 0;","        this._right = 0;","        this._bottom = 0;","        this._currentX = 0;","        this._currentY = 0;","    },","   ","    /**","     * Indicates a drawing has completed.","     *","     * @property _drawingComplete","     * @type Boolean","     * @private","     */","    _drawingComplete: false,","","    /**","     * Creates canvas element","     *","     * @method _createGraphic","     * @return HTMLCanvasElement","     * @private","     */","    _createGraphic: function(config) {","        var graphic = Y.config.doc.createElement('canvas');","        return graphic;","    },","    ","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {  ","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","        ","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; ","            }","        }","        return [ tmp[0][0], tmp[0][1] ]; ","    },","  ","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i = 0,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,","            xy;","        for(; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right + wt, bottom + wt);","        this._trackSize(left - wt, top - wt);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;    ","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom) ","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    }","};","Y.CanvasDrawing = CanvasDrawing;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class. "," * `CanvasShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Shape.html\">`Shape`</a> "," * class will point to the `CanvasShape` class."," *"," * @module graphics"," * @class CanvasShape"," * @constructor"," */","CanvasShape = function(cfg)","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    CanvasShape.superclass.constructor.apply(this, arguments);","};","","CanvasShape.NAME = \"canvasShape\";","","Y.extend(CanvasShape, Y.GraphicBase, Y.mix({","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","    init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method _initialize","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic;","        host._initProps();","		host.createNode(); ","		host._xcoords = [0];","		host._ycoords = [0];","        if(graphic)","        {","            this._setGraphic(graphic);","        }","		host._updateHandler();","	},"," ","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a `Graphic` instance, it will be assigned","     * to the `graphic` attribute. Otherwise, a new Graphic instance will be created and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.CanvasGraphic)","        {","		    this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.CanvasGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","        }","    },","   ","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute ","	 */","	addClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.addClass(className);","	},","	","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = Y.one(this.get(\"node\"));","		node.removeClass(className);","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = this.get(\"x\"),","			y = this.get(\"y\");","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains X & Y values for new position (coordinates are page-based)","	 */","	setXY: function(xy)","	{","		var graphic = this.get(\"graphic\"),","			parentXY = graphic.getXY(),","			x = xy[0] - parentXY[0],","			y = xy[1] - parentXY[1];","		this._set(\"x\", x);","		this._set(\"y\", y);","		this._updateNodePosition(x, y);","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy. ","	 *","	 * @method contains","	 * @param {CanvasShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y.one(this.get(\"node\")).test(selector);","		//return Y.Selector.test(this.node, selector);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","		return node === refNode;","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @method _getDefaultFill","	 * @return Object","	 * @private","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @method _getDefaultStroke","	 * @return Object","	 * @private","	 */","	_getDefaultStroke: function() ","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","	/**","	 * Left edge of the path","	 *","     * @property _left","     * @type Number","	 * @private","	 */","	_left: 0,","","	/**","	 * Right edge of the path","	 *","     * @property _right","     * @type Number","	 * @private","	 */","	_right: 0,","	","	/**","	 * Top edge of the path","	 *","     * @property _top","     * @type Number","	 * @private","	 */","	_top: 0, ","	","	/**","	 * Bottom edge of the path","	 *","     * @property _bottom","     * @type Number","	 * @private","	 */","	_bottom: 0,","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var node = Y.config.doc.createElement('canvas'),","			id = this.get(\"id\");","		this._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.style.overflow = \"visible\";","        if(!this.get(\"visible\"))","        {","            node.style.visibility = \"hidden\";","        }","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","		this.node = node;","		this.addClass(_getClassName(SHAPE) + \" \" + _getClassName(this.name)); ","	},","	","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so, ","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","	","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","     * @param {Object} stroke Properties of the `stroke` attribute.","	 * @private","	 */","	_setStrokeProps: function(stroke)","	{","		var color,","			weight,","			opacity,","			linejoin,","			linecap,","			dashstyle;","	    if(stroke)","        {","            color = stroke.color;","            weight = PARSE_FLOAT(stroke.weight);","            opacity = PARSE_FLOAT(stroke.opacity);","            linejoin = stroke.linejoin || \"round\";","            linecap = stroke.linecap || \"butt\";","            dashstyle = stroke.dashstyle;","            this._miterlimit = null;","            this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;","            this._strokeWeight = weight;","","            if (IS_NUMBER(weight) && weight > 0) ","            {","                this._stroke = 1;","            } ","            else ","            {","                this._stroke = 0;","            }","            if (IS_NUMBER(opacity)) {","                this._strokeStyle = this._toRGBA(color, opacity);","            }","            else","            {","                this._strokeStyle = color;","            }","            this._linecap = linecap;","            if(linejoin == \"round\" || linejoin == \"bevel\")","            {","                this._linejoin = linejoin;","            }","            else","            {","                linejoin = parseInt(linejoin, 10);","                if(IS_NUMBER(linejoin))","                {","                    this._miterlimit =  Math.max(linejoin, 1);","                    this._linejoin = \"miter\";","                }","            }","        }","        else","        {","            this._stroke = 0;","        }","	},","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can ","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as ","     * the name param.","     */","	set: function() ","	{","		var host = this,","			val = arguments[0];","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","	","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _setFillProps ","     * @param {Object} fill Properties of the `fill` attribute.","	 * @private","	 */","	_setFillProps: function(fill)","	{","		var isNumber = IS_NUMBER,","			color,","			opacity,","			type;","        if(fill)","        {","            color = fill.color;","            type = fill.type;","            if(type == \"linear\" || type == \"radial\")","            {","                this._fillType = type;","            }","            else if(color)","            {","                opacity = fill.opacity;","                if (isNumber(opacity)) ","                {","                    opacity = Math.max(0, Math.min(1, opacity));","                    color = this._toRGBA(color, opacity);","                } ","                else ","                {","                    color = TORGB(color);","                }","","                this._fillColor = color;","                this._fillType = 'solid';","            }","            else","            {","                this._fillColor = null;","            }","        }","		else","		{","            this._fillType = null;","			this._fillColor = null;","		}","	},","","	/**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to transate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._translateX += x;","		this._translateY += y;","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._translateX += x;","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Performs a translate on the y-coordinate. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._translateY += y;","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y)","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","	 skewX: function(x)","	 {","		this._addTransform(\"skewX\", arguments);","	 },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","	 skewY: function(y)","	 {","		this._addTransform(\"skewY\", arguments);","	 },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","	 rotate: function(deg)","	 {","		this._rotation = deg;","		this._addTransform(\"rotate\", arguments);","	 },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","	scale: function(x, y)","	{","		this._addTransform(\"scale\", arguments);","	},","	","    /**","     * Storage for `rotation` atribute.","     *","     * @property _rotation","     * @type Number","	 * @private","	 */","	_rotation: 0,","    ","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var node = this.node,","			key,","			transform,","			transformOrigin = this.get(\"transformOrigin\"),","            matrix = this.matrix,","            i = 0,","            len = this._transforms.length;","        ","        if(this._transforms && this._transforms.length > 0)","        {","            for(; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    matrix[key].apply(matrix, this._transforms[i]); ","                }","            }","            transform = matrix.toCSSText();","        }","        ","        this._graphic.addToRedrawQueue(this);    ","		transformOrigin = (100 * transformOrigin[0]) + \"% \" + (100 * transformOrigin[1]) + \"%\";","		node.style.MozTransformOrigin = transformOrigin; ","		node.style.webkitTransformOrigin = transformOrigin;","		node.style.msTransformOrigin = transformOrigin;","		node.style.OTransformOrigin = transformOrigin;","        if(transform)","		{","            node.style.MozTransform = transform;","            node.style.webkitTransform = transform;","            node.style.msTransform = transform;","            node.style.OTransform = transform;","		}","        this._transforms = [];","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function()","	{","		this._draw();","		this._updateTransform();","	},","	","	/**","	 * Updates the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","        var node = this.node;","        this.clear();","		this._closePath();","		node.style.left = this.get(\"x\") + \"px\";","		node.style.top = this.get(\"y\") + \"px\";","	},","","	/**","	 * Completes a shape or drawing","	 *","	 * @method _closePath","	 * @private","	 */","	_closePath: function()","	{","		if(!this._methods)","		{","			return;","		}","		var node = this.get(\"node\"),","			w = this._right - this._left,","			h = this._bottom - this._top,","			context = this._context,","			methods = [],","			cachedMethods = this._methods.concat(),","			i = 0,","			j,","			method,","			args,","            argsLen,","			len = 0;","		this._context.clearRect(0, 0, node.width, node.height);","	   if(this._methods)","	   {","			len = cachedMethods.length;","			if(!len || len < 1)","			{","				return;","			}","			for(; i < len; ++i)","			{","				methods[i] = cachedMethods[i].concat();","				args = methods[i];","                argsLen = args[0] == \"quadraticCurveTo\" ? args.length : 3;","				for(j = 1; j < argsLen; ++j)","				{","					if(j % 2 === 0)","					{","						args[j] = args[j] - this._top;","					}","					else","					{","						args[j] = args[j] - this._left;","					}","				}","			}","            node.setAttribute(\"width\", Math.min(w, 2000));","            node.setAttribute(\"height\", Math.min(2000, h));","            context.beginPath();","			for(i = 0; i < len; ++i)","			{","				args = methods[i].concat();","				if(args && args.length > 0)","				{","					method = args.shift();","					if(method)","					{","                        if(method == \"closePath\")","                        {","                            this._strokeAndFill(context);","                        }","						if(method && method == \"lineTo\" && this._dashstyle)","						{","							args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);","							this._drawDashedLine.apply(this, args);","						}","						else","						{","                            context[method].apply(context, args); ","						}","					}","				}","			}","","            this._strokeAndFill(context);","			this._drawingComplete = true;","			this._clearAndUpdateCoords();","			this._updateNodePosition();","			this._methods = cachedMethods;","		}","	},","","    /**","     * Completes a stroke and/or fill operation on the context.","     *","     * @method _strokeAndFill","     * @param {Context} Reference to the context element of the canvas instance.","     * @private","     */","    _strokeAndFill: function(context)","    {","        if (this._fillType) ","        {","            if(this._fillType == \"linear\")","            {","                context.fillStyle = this._getLinearGradient();","            }","            else if(this._fillType == \"radial\")","            {","                context.fillStyle = this._getRadialGradient();","            }","            else","            {","                context.fillStyle = this._fillColor;","            }","            context.closePath();","            context.fill();","        }","","        if (this._stroke) {","            if(this._strokeWeight)","            {","                context.lineWidth = this._strokeWeight;","            }","            context.lineCap = this._linecap;","            context.lineJoin = this._linejoin;","            if(this._miterlimit)","            {","                context.miterLimit = this._miterlimit;","            }","            context.strokeStyle = this._strokeStyle;","            context.stroke();","        }","    },","","	/**","	 * Draws a dashed line between two points.","	 * ","	 * @method _drawDashedLine","	 * @param {Number} xStart	The x position of the start of the line","	 * @param {Number} yStart	The y position of the start of the line","	 * @param {Number} xEnd		The x position of the end of the line","	 * @param {Number} yEnd		The y position of the end of the line","	 * @private","	 */","	_drawDashedLine: function(xStart, yStart, xEnd, yEnd)","	{","		var context = this._context,","			dashsize = this._dashstyle[0],","			gapsize = this._dashstyle[1],","			segmentLength = dashsize + gapsize,","			xDelta = xEnd - xStart,","			yDelta = yEnd - yStart,","			delta = Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2)),","			segmentCount = Math.floor(Math.abs(delta / segmentLength)),","			radians = Math.atan2(yDelta, xDelta),","			xCurrent = xStart,","			yCurrent = yStart,","			i;","		xDelta = Math.cos(radians) * segmentLength;","		yDelta = Math.sin(radians) * segmentLength;","		","		for(i = 0; i < segmentCount; ++i)","		{","			context.moveTo(xCurrent, yCurrent);","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","			xCurrent += xDelta;","			yCurrent += yDelta;","		}","		","		context.moveTo(xCurrent, yCurrent);","		delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));","		","		if(delta > dashsize)","		{","			context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);","		}","		else if(delta > 0)","		{","			context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);","		}","		","		context.moveTo(xEnd, yEnd);","	},","","	//This should move to CanvasDrawing class. ","    //Currently docmented in CanvasDrawing class.","    clear: function() {","		this._initProps();","        if(this.node) ","        {","            this._context.clearRect(0, 0, this.node.width, this.node.height);","        }","        return this;","	},","	","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox. ","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var stroke = this.get(\"stroke\"),","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			x = this.get(\"x\"),","			y = this.get(\"y\"),","            wt = 0;","		if(stroke && stroke.weight)","		{","			wt = stroke.weight;","		}","        w = (x + w + wt) - (x - wt); ","        h = (y + h + wt) - (y - wt);","        x -= wt;","        y -= wt;","		return this.matrix.getContentRect(w, h, x, y);","	},","","    /**","     * Destroys the shape instance.","     *","     * @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {","            Y.one(this.node).remove(true);","            this._context = null;","            this.node = null;","        }","    }","}, Y.CanvasDrawing.prototype));","","CanvasShape.ATTRS =  {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a ","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","	","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *     ","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>      ","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains corresponding methods for each transform","     * that will apply the transform to the current matrix. The below code illustrates how you might use the `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","    ","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String  ","	 */","	transform: {","		setter: function(val)","		{","            this.matrix.init();	","		    this._transforms = this.matrix.getTransformArray(val);","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Dom node for the shape","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","		getter: function()","		{","			return this.node;","		}","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        value: 0","    },","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        value: 0","    },","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","		value: 0","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","		value: 0","	},","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var node = this.get(\"node\"),","                visibility = val ? \"visible\" : \"hidden\";","			if(node)","            {","                node.style.visibility = visibility;","            }","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape. ","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1. Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd> ","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *  </dl>","     *  <p>The corresponding `SVGShape` class implements the following additional properties.</p>","     *  <dl>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *      </dd>","     *  </dl>","     *  <p>These properties are not currently implemented in `CanvasShape` or `VMLShape`.</p> ","	 *","	 * @config fill","	 * @type Object ","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","		","		setter: function(val)","		{","			var fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","			fill = (val) ? Y.merge(tmpl, val) : null;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color == \"none\")","				{","					fill.color = null;","				}","			}","			this._setFillProps(fill);","			return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set to an array, the first index indicates the","     *  length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin of miter, you simply specify the limit as opposed to having","     *  separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","","		setter: function(val)","		{","			var tmpl = this.get(\"stroke\") || this._getDefaultStroke(),","                wt;","            if(val && val.hasOwnProperty(\"weight\"))","            {","                wt = parseInt(val.weight, 10);","                if(!isNaN(wt))","                {","                    val.weight = wt;","                }","            }","			val = (val) ? Y.merge(tmpl, val) : null;","			this._setStrokeProps(val);","			return val;","		}","	},","	","	//Not used. Remove in future.","	autoSize: {","		value: false","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	// ","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		value: \"visiblePainted\"","	},","","	/**","	 * Reference to the container Graphic.","	 *","	 * @config graphic","	 * @type Graphic","	 */","	graphic: {","		readOnly: true,","","		getter: function()","		{","			return this._graphic;","		}","    }","};","Y.CanvasShape = CanvasShape;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Path.html\">`Path`</a> class. "," * `CanvasPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Path.html\">`Path`</a> "," * class will point to the `CanvasPath` class."," *"," * @module graphics"," * @class CanvasPath"," * @extends CanvasShape"," */","CanvasPath = function(cfg)","{","	CanvasPath.superclass.constructor.apply(this, arguments);","};","CanvasPath.NAME = \"canvasPath\";","Y.extend(CanvasPath, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","    _draw: function()","    {","        this._closePath();","    },","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var node = Y.config.doc.createElement('canvas'),","			id = this.get(\"id\");","		this._context = node.getContext('2d');","		node.setAttribute(\"overflow\", \"visible\");","        node.setAttribute(\"pointer-events\", \"none\");","        node.style.pointerEvents = \"none\";","        node.style.overflow = \"visible\";","		node.setAttribute(\"id\", id);","		id = \"#\" + id;","		this.node = node;","		this.addClass(_getClassName(SHAPE) + \" \" + _getClassName(this.name)); ","	},","","    /**","     * Completes a drawing operation. ","     *","     * @method end","     */","    end: function()","    {","        this._draw();","    }","});","","CanvasPath.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","			return this._width - offset;","		},","","		setter: function(val)","		{","			this._width = val;","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;","            return this._height - offset;","		},","","		setter: function(val)","		{","			this._height = val;","			return val;","		}","	},","	","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","        readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	}","});","Y.CanvasPath = CanvasPath;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class. "," * `CanvasRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Rect.html\">`Rect`</a> "," * class will point to the `CanvasRect` class."," *"," * @module graphics"," * @class CanvasRect"," * @constructor"," */","CanvasRect = function()","{","	CanvasRect.superclass.constructor.apply(this, arguments);","};","CanvasRect.NAME = \"canvasRect\";","Y.extend(CanvasRect, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"rect\",","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawRect(0, 0, w, h);","		this._closePath();","	}","});","CanvasRect.ATTRS = Y.CanvasShape.ATTRS;","Y.CanvasRect = CanvasRect;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class. "," * `CanvasEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a> "," * class will point to the `CanvasEllipse` class."," *"," * @module graphics"," * @class CanvasEllipse"," * @constructor"," */","CanvasEllipse = function(cfg)","{","	CanvasEllipse.superclass.constructor.apply(this, arguments);","};","","CanvasEllipse.NAME = \"canvasEllipse\";","","Y.extend(CanvasEllipse, CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"ellipse\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var w = this.get(\"width\"),","			h = this.get(\"height\");","		this.clear();","        this.drawEllipse(0, 0, w, h);","		this._closePath();","	}","});","CanvasEllipse.ATTRS = Y.merge(CanvasShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse. ","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		setter: function(val)","		{","			this.set(\"width\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"width\");","			if(val) ","			{","				val *= 0.5;","			}","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse. ","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		setter: function(val)","		{","			this.set(\"height\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"height\");","			if(val) ","			{","				val *= 0.5;","			}","			return val;","		}","	}","});","Y.CanvasEllipse = CanvasEllipse;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class. "," * `CanvasCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Circle.html\">`Circle`</a> "," * class will point to the `CanvasCircle` class."," *"," * @module graphics"," * @class CanvasCircle"," * @constructor"," */","CanvasCircle = function(cfg)","{","	CanvasCircle.superclass.constructor.apply(this, arguments);","};","    ","CanvasCircle.NAME = \"canvasCircle\";","","Y.extend(CanvasCircle, Y.CanvasShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"circle\",","","	/**","     * Draws the shape.","     *","     * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var radius = this.get(\"radius\");","		if(radius)","		{","            this.clear();","            this.drawCircle(0, 0, radius);","			this._closePath();","		}","	}","});","","CanvasCircle.ATTRS = Y.merge(Y.CanvasShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","		getter: function()","		{","			return this.get(\"radius\") * 2;","		}","	},","","	/**","	 * Radius of the circle","	 *","	 * @config radius","     * @type Number","	 */","	radius: {","		lazyAdd: false","	}","});","Y.CanvasCircle = CanvasCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class CanvasPieSlice"," * @constructor"," */","CanvasPieSlice = function()","{","	CanvasPieSlice.superclass.constructor.apply(this, arguments);","};","CanvasPieSlice.NAME = \"canvasPieSlice\";","Y.extend(CanvasPieSlice, Y.CanvasShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function(e)","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this._left = x;","        this._right = radius;","        this._top = y;","        this._bottom = radius;","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," });","CanvasPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.CanvasShape.ATTRS);","Y.CanvasPieSlice = CanvasPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> implementation of the `Graphic` class. "," * `CanvasGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class. "," * If the browser lacks <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities but has "," * <a href=\"http://www.w3.org/TR/html5/the-canvas-element.html\">Canvas</a> capabilities, the <a href=\"Graphic.html\">`Graphic`</a> "," * class will point to the `CanvasGraphic` class."," *"," * @module graphics"," * @class CanvasGraphic"," * @constructor"," */","function CanvasGraphic(config) {","    ","    CanvasGraphic.superclass.constructor.apply(this, arguments);","}","","CanvasGraphic.NAME = \"canvasGraphic\";","","CanvasGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node instance or a CSS selector string.","     * ","     * @config render","     * @type Node | String ","     */","    render: {},","	","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the graphic instance's position.","     *","     *  @config contentBounds ","     *  @type Object","     *  @readOnly","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The outermost html element of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     *  @readOnly","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`. ","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";            ","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`. ","	 *","	 * @config height ","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines how the size of instance is calculated. If true, the width and height are determined by the size of the contents.","     *  If false, the width and height values are either explicitly set or determined by the size of the parent node's dimensions.","     *","     *  @config autoSize","     *  @type Boolean","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * The contentBounds will resize to greater values but not smaller values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown ","     * @type Boolean","     */","    resizeDown: {","        getter: function()","        {","            return this._resizeDown;","        },","","        setter: function(val)","        {","            this._resizeDown = val;","            if(this._node)","            {","                this._redraw();","            }","            return val;","        }","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","	/**","	 * Indicates whether the `Graphic` and its children are visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    }","};","","Y.extend(CanvasGraphic, Y.GraphicBase, {","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = Y.one(this._node),","            xy;","        if(node)","        {","            xy = node.getXY();","        }","        return xy;","    },","","    /**","     * Storage for `resizeDown` attribute.","     *","     * @property _resizeDown ","     * @type Boolean","     * @private","     */","    _resizeDown: false,","    ","	/**","     * Initializes the class.","     *","     * @method initializer","     * @param {Object} config Optional attributes ","     * @private","     */","    initializer: function(config) {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\",","            w = this.get(\"width\") || 0,","            h = this.get(\"height\") || 0;","        this._shapes = {};","        this._redrawQueue = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._node = DOCUMENT.createElement('div');","        this._node.style.position = \"absolute\";","        this._node.style.visibility = visibility;","        this.set(\"width\", w);","        this.set(\"height\", h);","        if(render)","        {","            this.render(render);","        }","    },","","    /**","     * Adds the graphics node to the dom.","     * ","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            node = this._node,","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || DOCUMENT.body;","        parentNode.appendChild(node);","        node.style.display = \"block\";","        node.style.position = \"absolute\";","        node.style.left = \"0px\";","        node.style.top = \"0px\";","        this.set(\"width\", w);","        this.set(\"height\", h);","        this.parentNode = parentNode;","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.removeAllShapes();","        if(this._node)","        {","            this._removeChildren(this._node);","            Y.one(this._node).destroy();","        }","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var shapeClass = this._getShapeClass(cfg.type),","            shape = new shapeClass(cfg);","        this._appendShape(shape);","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._node;","        if(this.get(\"autoDraw\")) ","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof CanvasShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && shape instanceof CanvasShape)","        {","            shape._destroy();","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\")) ","        {","            this._redraw();","        }","        return shape;","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i].destroy();","            }","        }","        this._shapes = {};","    },","    ","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param {HTMLElement} node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node && node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","    ","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Returns a shape class. Used by `addShape`. ","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class. ","     * @return Function ","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","    ","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.CanvasCircle,","        rect: Y.CanvasRect,","        path: Y.CanvasPath,","        ellipse: Y.CanvasEllipse,","        pieslice: Y.CanvasPieSlice","    },","    ","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        var shape = this._shapes[id];","        return shape;","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method();","        this._redraw();","        this.set(\"autoDraw\", autoDraw);","    },","","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","    ","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds;","        if(this.get(\"autoSize\"))","        {","            this.set(\"width\", box.right);","            this.set(\"height\", box.bottom);","        }","        if(this._frag)","        {","            this._node.appendChild(this._frag);","            this._frag = null;","        }","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds. Used internally ","     * by `Shape` instances.","     *","     * @method addToRedrawQueue","     * @param Shape shape The shape instance to add to the queue","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            box.width = box.right - box.left;","            box.height = box.bottom - box.top;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\")) ","        {","            this._redraw();","        }","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object} ","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {","                left: 0,","                top: 0,","                right: 0,","                bottom: 0","            };","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Math.min(box.left, bounds.left);","                box.top = Math.min(box.top, bounds.top);","                box.right = Math.max(box.right, bounds.right);","                box.bottom = Math.max(box.bottom, bounds.bottom);","            }","        }","        box.width = box.right - box.left;","        box.height = box.bottom - box.top;","        this._contentBounds = box;","        return box;","    }","});","","Y.CanvasGraphic = CanvasGraphic;","","","}, '@VERSION@' ,{requires:['graphics'], skinnable:false});"];
_yuitest_coverage["/build/graphics-canvas/graphics-canvas.js"].lines = {"1":0,"3":0,"33":0,"37":0,"65":0,"66":0,"67":0,"70":0,"71":0,"77":0,"88":0,"100":0,"102":0,"104":0,"105":0,"107":0,"109":0,"110":0,"125":0,"126":0,"127":0,"128":0,"139":0,"141":0,"152":0,"155":0,"156":0,"157":0,"171":0,"183":0,"189":0,"191":0,"193":0,"194":0,"197":0,"198":0,"200":0,"202":0,"203":0,"204":0,"205":0,"206":0,"207":0,"208":0,"211":0,"212":0,"223":0,"224":0,"225":0,"226":0,"227":0,"228":0,"229":0,"244":0,"251":0,"252":0,"253":0,"254":0,"255":0,"256":0,"257":0,"258":0,"259":0,"260":0,"261":0,"262":0,"275":0,"283":0,"284":0,"285":0,"286":0,"287":0,"288":0,"289":0,"290":0,"291":0,"292":0,"293":0,"294":0,"307":0,"311":0,"312":0,"313":0,"314":0,"315":0,"316":0,"317":0,"332":0,"334":0,"335":0,"336":0,"337":0,"338":0,"339":0,"353":0,"365":0,"366":0,"367":0,"368":0,"370":0,"371":0,"372":0,"373":0,"374":0,"375":0,"376":0,"378":0,"379":0,"380":0,"381":0,"394":0,"395":0,"396":0,"397":0,"398":0,"399":0,"400":0,"401":0,"416":0,"417":0,"418":0,"419":0,"420":0,"421":0,"422":0,"423":0,"424":0,"425":0,"426":0,"427":0,"444":0,"457":0,"459":0,"461":0,"463":0,"466":0,"468":0,"473":0,"476":0,"480":0,"483":0,"486":0,"489":0,"490":0,"491":0,"493":0,"495":0,"496":0,"497":0,"498":0,"499":0,"500":0,"501":0,"504":0,"506":0,"507":0,"508":0,"517":0,"518":0,"528":0,"529":0,"546":0,"566":0,"568":0,"570":0,"571":0,"575":0,"576":0,"578":0,"579":0,"583":0,"585":0,"586":0,"590":0,"591":0,"593":0,"594":0,"596":0,"597":0,"599":0,"600":0,"601":0,"602":0,"603":0,"605":0,"606":0,"610":0,"612":0,"613":0,"615":0,"626":0,"647":0,"648":0,"649":0,"650":0,"651":0,"652":0,"653":0,"654":0,"655":0,"657":0,"659":0,"661":0,"663":0,"664":0,"665":0,"666":0,"667":0,"668":0,"674":0,"676":0,"677":0,"681":0,"682":0,"684":0,"686":0,"687":0,"688":0,"689":0,"690":0,"692":0,"693":0,"697":0,"699":0,"700":0,"701":0,"703":0,"706":0,"717":0,"718":0,"719":0,"720":0,"721":0,"722":0,"723":0,"724":0,"725":0,"726":0,"727":0,"728":0,"748":0,"749":0,"762":0,"767":0,"768":0,"771":0,"772":0,"773":0,"774":0,"777":0,"791":0,"800":0,"802":0,"803":0,"804":0,"805":0,"806":0,"808":0,"809":0,"810":0,"811":0,"812":0,"813":0,"825":0,"826":0,"828":0,"830":0,"832":0,"834":0,"836":0,"838":0,"840":0,"841":0,"844":0,"856":0,"858":0,"859":0,"860":0,"863":0,"865":0,"875":0,"886":0,"888":0,"889":0,"890":0,"891":0,"892":0,"894":0,"896":0,"909":0,"910":0,"912":0,"916":0,"917":0,"920":0,"921":0,"933":0,"934":0,"945":0,"946":0,"957":0,"961":0,"972":0,"976":0,"977":0,"978":0,"990":0,"1002":0,"1014":0,"1015":0,"1026":0,"1045":0,"1098":0,"1100":0,"1101":0,"1102":0,"1103":0,"1105":0,"1107":0,"1108":0,"1109":0,"1110":0,"1124":0,"1126":0,"1128":0,"1140":0,"1146":0,"1148":0,"1149":0,"1150":0,"1151":0,"1152":0,"1153":0,"1154":0,"1155":0,"1156":0,"1158":0,"1160":0,"1164":0,"1166":0,"1167":0,"1171":0,"1173":0,"1174":0,"1176":0,"1180":0,"1181":0,"1183":0,"1184":0,"1190":0,"1205":0,"1207":0,"1208":0,"1210":0,"1223":0,"1227":0,"1229":0,"1230":0,"1231":0,"1233":0,"1235":0,"1237":0,"1238":0,"1240":0,"1241":0,"1245":0,"1248":0,"1249":0,"1253":0,"1258":0,"1259":0,"1272":0,"1273":0,"1274":0,"1286":0,"1287":0,"1299":0,"1300":0,"1312":0,"1323":0,"1334":0,"1345":0,"1346":0,"1357":0,"1388":0,"1389":0,"1390":0,"1391":0,"1392":0,"1394":0,"1406":0,"1414":0,"1416":0,"1418":0,"1419":0,"1421":0,"1424":0,"1427":0,"1428":0,"1429":0,"1430":0,"1431":0,"1432":0,"1433":0,"1435":0,"1436":0,"1437":0,"1438":0,"1440":0,"1451":0,"1452":0,"1463":0,"1464":0,"1465":0,"1466":0,"1467":0,"1478":0,"1480":0,"1482":0,"1494":0,"1495":0,"1497":0,"1498":0,"1500":0,"1502":0,"1504":0,"1505":0,"1506":0,"1507":0,"1509":0,"1511":0,"1515":0,"1519":0,"1520":0,"1521":0,"1522":0,"1524":0,"1525":0,"1527":0,"1528":0,"1530":0,"1532":0,"1534":0,"1536":0,"1537":0,"1541":0,"1547":0,"1548":0,"1549":0,"1550":0,"1551":0,"1564":0,"1566":0,"1568":0,"1570":0,"1572":0,"1576":0,"1578":0,"1579":0,"1582":0,"1583":0,"1585":0,"1587":0,"1588":0,"1589":0,"1591":0,"1593":0,"1594":0,"1610":0,"1622":0,"1623":0,"1625":0,"1627":0,"1628":0,"1629":0,"1630":0,"1633":0,"1634":0,"1636":0,"1638":0,"1640":0,"1642":0,"1645":0,"1651":0,"1652":0,"1654":0,"1656":0,"1670":0,"1676":0,"1678":0,"1680":0,"1681":0,"1682":0,"1683":0,"1684":0,"1694":0,"1695":0,"1697":0,"1701":0,"1713":0,"1715":0,"1716":0,"1717":0,"1722":0,"1733":0,"1769":0,"1770":0,"1771":0,"1772":0,"1777":0,"1793":0,"1806":0,"1811":0,"1812":0,"1814":0,"1816":0,"1870":0,"1872":0,"1874":0,"1876":0,"1928":0,"1930":0,"1931":0,"1933":0,"1935":0,"1938":0,"1939":0,"1976":0,"1978":0,"1980":0,"1981":0,"1983":0,"1986":0,"1987":0,"1988":0,"2018":0,"2022":0,"2034":0,"2036":0,"2038":0,"2039":0,"2057":0,"2069":0,"2071":0,"2072":0,"2073":0,"2074":0,"2075":0,"2076":0,"2077":0,"2078":0,"2079":0,"2089":0,"2093":0,"2103":0,"2104":0,"2109":0,"2110":0,"2123":0,"2124":0,"2129":0,"2130":0,"2146":0,"2150":0,"2162":0,"2164":0,"2166":0,"2167":0,"2185":0,"2187":0,"2188":0,"2189":0,"2192":0,"2193":0,"2205":0,"2207":0,"2210":0,"2212":0,"2230":0,"2232":0,"2233":0,"2234":0,"2237":0,"2247":0,"2252":0,"2253":0,"2255":0,"2257":0,"2271":0,"2276":0,"2277":0,"2279":0,"2281":0,"2285":0,"2297":0,"2299":0,"2302":0,"2304":0,"2322":0,"2323":0,"2325":0,"2326":0,"2327":0,"2332":0,"2342":0,"2343":0,"2348":0,"2361":0,"2362":0,"2367":0,"2381":0,"2389":0,"2391":0,"2393":0,"2394":0,"2412":0,"2417":0,"2418":0,"2419":0,"2420":0,"2421":0,"2422":0,"2423":0,"2426":0,"2464":0,"2476":0,"2478":0,"2481":0,"2483":0,"2501":0,"2506":0,"2507":0,"2509":0,"2511":0,"2527":0,"2543":0,"2559":0,"2572":0,"2574":0,"2576":0,"2589":0,"2591":0,"2593":0,"2619":0,"2624":0,"2625":0,"2627":0,"2629":0,"2642":0,"2647":0,"2648":0,"2650":0,"2652":0,"2665":0,"2670":0,"2671":0,"2673":0,"2675":0,"2703":0,"2704":0,"2709":0,"2736":0,"2738":0,"2740":0,"2742":0,"2762":0,"2766":0,"2767":0,"2768":0,"2774":0,"2775":0,"2776":0,"2777":0,"2778":0,"2779":0,"2781":0,"2792":0,"2796":0,"2797":0,"2798":0,"2799":0,"2800":0,"2801":0,"2802":0,"2803":0,"2804":0,"2805":0,"2815":0,"2816":0,"2818":0,"2819":0,"2832":0,"2833":0,"2835":0,"2837":0,"2839":0,"2840":0,"2852":0,"2854":0,"2856":0,"2860":0,"2872":0,"2874":0,"2876":0,"2879":0,"2881":0,"2882":0,"2884":0,"2886":0,"2888":0,"2898":0,"2900":0,"2902":0,"2904":0,"2907":0,"2916":0,"2928":0,"2930":0,"2931":0,"2933":0,"2934":0,"2935":0,"2949":0,"2952":0,"2954":0,"2956":0,"2958":0,"2962":0,"2964":0,"2978":0,"2979":0,"2981":0,"2983":0,"3010":0,"3011":0,"3022":0,"3023":0,"3024":0,"3025":0,"3026":0,"3038":0,"3040":0,"3042":0,"3053":0,"3054":0,"3056":0,"3057":0,"3059":0,"3061":0,"3062":0,"3076":0,"3078":0,"3079":0,"3081":0,"3082":0,"3083":0,"3084":0,"3085":0,"3086":0,"3087":0,"3088":0,"3089":0,"3091":0,"3093":0,"3106":0,"3116":0,"3118":0,"3120":0,"3121":0,"3122":0,"3123":0,"3124":0,"3125":0,"3128":0,"3129":0,"3130":0,"3131":0,"3135":0};
_yuitest_coverage["/build/graphics-canvas/graphics-canvas.js"].functions = {"CanvasDrawing:33":0,"_toRGBA:64":0,"_toRGB:87":0,"setSize:99":0,"_updateCoords:123":0,"_clearAndUpdateCoords:137":0,"_updateNodePosition:150":0,"_updateDrawingQueue:169":0,"lineTo:181":0,"moveTo:222":0,"curveTo:243":0,"quadraticCurveTo:274":0,"drawCircle:306":0,"drawDiamond:330":0,"drawEllipse:352":0,"drawRect:393":0,"drawRoundRect:415":0,"drawWedge:442":0,"end:516":0,"closePath:526":0,"_getLinearGradient:545":0,"_getRadialGradient:625":0,"_initProps:716":0,"_createGraphic:747":0,"getBezierData:761":0,"_setCurveBoundingBox:789":0,"_trackSize:824":0,"CanvasShape:856":0,"init:873":0,"initializer:884":0,"_setGraphic:907":0,"addClass:931":0,"removeClass:943":0,"getXY:955":0,"setXY:970":0,"contains:988":0,"test:1000":0,"compareTo:1013":0,"_getDefaultFill:1025":0,"_getDefaultStroke:1043":0,"createNode:1096":0,"on:1122":0,"_setStrokeProps:1138":0,"set:1203":0,"_setFillProps:1221":0,"translate:1270":0,"translateX:1284":0,"translateY:1297":0,"skew:1310":0,"skewX:1321":0,"skewY:1332":0,"rotate:1343":0,"scale:1355":0,"_addTransform:1386":0,"_updateTransform:1404":0,"_updateHandler:1449":0,"_draw:1461":0,"_closePath:1476":0,"_strokeAndFill:1562":0,"_drawDashedLine:1608":0,"clear:1650":0,"getBounds:1668":0,"destroy:1692":0,"_destroy:1711":0,"valueFn:1731":0,"setter:1767":0,"getter:1775":0,"getter:1791":0,"valueFn:1804":0,"setter:1809":0,"setter:1869":0,"setter:1926":0,"setter:1974":0,"getter:2016":0,"CanvasPath:2034":0,"_draw:2055":0,"createNode:2067":0,"end:2087":0,"getter:2101":0,"setter:2107":0,"getter:2121":0,"setter:2127":0,"getter:2144":0,"CanvasRect:2162":0,"_draw:2183":0,"CanvasEllipse:2205":0,"_draw:2228":0,"setter:2245":0,"getter:2250":0,"setter:2269":0,"getter:2274":0,"CanvasCircle:2297":0,"_draw:2320":0,"setter:2340":0,"getter:2346":0,"setter:2359":0,"getter:2365":0,"CanvasPieSlice:2389":0,"_draw:2410":0,"CanvasGraphic:2476":0,"valueFn:2499":0,"setter:2504":0,"getter:2525":0,"getter:2541":0,"getter:2557":0,"setter:2570":0,"setter:2587":0,"getter:2617":0,"setter:2622":0,"getter:2640":0,"setter:2645":0,"getter:2663":0,"setter:2668":0,"setter:2701":0,"getXY:2734":0,"initializer:2761":0,"render:2791":0,"destroy:2813":0,"addShape:2830":0,"_appendShape:2850":0,"removeShape:2870":0,"removeAllShapes:2896":0,"clear:2915":0,"_removeChildren:2926":0,"_toggleVisible:2947":0,"_getShapeClass:2976":0,"getShapeById:3008":0,"batch:3020":0,"_getDocFrag:3036":0,"_redraw:3051":0,"addToRedrawQueue:3074":0,"_getUpdatedContentBounds:3104":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/graphics-canvas/graphics-canvas.js"].coveredLines = 778;
_yuitest_coverage["/build/graphics-canvas/graphics-canvas.js"].coveredFunctions = 133;
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1);
YUI.add('graphics-canvas', function(Y) {

_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3);
var SHAPE = "canvasShape",
    DOCUMENT = Y.config.doc,
    Y_LANG = Y.Lang,
    AttributeLite = Y.AttributeLite,
	CanvasShape,
	CanvasPath,
	CanvasRect,
    CanvasEllipse,
	CanvasCircle,
    CanvasPieSlice,
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 33);
function CanvasDrawing()
{
}

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 37);
CanvasDrawing.prototype = {
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_toRGBA", 64);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 65);
alpha = (alpha !== undefined) ? alpha : 1;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 66);
if (!Y_Color.re_RGB.test(val)) {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 67);
val = TOHEX(val);
        }

        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 70);
if(Y_Color.re_hex.exec(val)) {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 71);
val = 'rgba(' + [
                PARSE_INT(RE.$1, 16),
                PARSE_INT(RE.$2, 16),
                PARSE_INT(RE.$3, 16)
            ].join(',') + ',' + alpha + ')';
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 77);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_toRGB", 87);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 88);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setSize", 99);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 100);
if(this.get("autoSize"))
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 102);
if(w > this.node.getAttribute("width"))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 104);
this.node.style.width = w + "px";
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 105);
this.node.setAttribute("width", w);
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 107);
if(h > this.node.getAttribute("height"))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 109);
this.node.style.height = h + "px";
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 110);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_updateCoords", 123);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 125);
this._xcoords.push(x);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 126);
this._ycoords.push(y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 127);
this._currentX = x;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 128);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_clearAndUpdateCoords", 137);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 139);
var x = this._xcoords.pop() || 0,
            y = this._ycoords.pop() || 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 141);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_updateNodePosition", 150);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 152);
var node = this.get("node"),
            x = this.get("x"),
            y = this.get("y"); 
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 155);
node.style.position = "absolute";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 156);
node.style.left = (x + this._left) + "px";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 157);
node.style.top = (y + this._top) + "px";
    },
    
    /**
     * Queues up a method to be executed when a shape redraws.
     *
     * @method _updateDrawingQueue
     * @param {Array} val An array containing data that can be parsed into a method and arguments. The value at zero-index of the array is a string reference of
     * the drawing method that will be called. All subsequent indices are argument for that method. For example, `lineTo(10, 100)` would be structured as:
     * `["lineTo", 10, 100]`.
     * @private
     */
    _updateDrawingQueue: function(val)
    {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_updateDrawingQueue", 169);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 171);
this._methods.push(val);
    },
    
    /**
     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.
     * 
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     */
    lineTo: function(point1, point2, etc) 
    {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "lineTo", 181);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 183);
var args = arguments, 
            i = 0, 
            len,
            x,
            y,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 189);
if(!this._lineToMethods)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 191);
this._lineToMethods = [];
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 193);
if (typeof point1 === 'string' || typeof point1 === 'number') {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 194);
args = [[point1, point2]];
        }

        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 197);
len = args.length;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 198);
for (; i < len; ++i) 
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 200);
if(args[i])
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 202);
x = args[i][0];
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 203);
y = args[i][1];
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 204);
this._updateDrawingQueue(["lineTo", x, y]);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 205);
this._lineToMethods[this._lineToMethods.length] = this._methods[this._methods.length - 1];
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 206);
this._trackSize(x - wt, y - wt);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 207);
this._trackSize(x + wt, y + wt);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 208);
this._updateCoords(x, y);
            }
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 211);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 212);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "moveTo", 222);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 223);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 224);
this._updateDrawingQueue(["moveTo", x, y]);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 225);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 226);
this._trackSize(x + wt, y + wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 227);
this._updateCoords(x, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 228);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 229);
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
    curveTo: function(cp1x, cp1y, cp2x, cp2y, x, y) {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "curveTo", 243);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 244);
var w,
            h,
            pts,
            right,
            left,
            bottom,
            top;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 251);
this._updateDrawingQueue(["bezierCurveTo", cp1x, cp1y, cp2x, cp2y, x, y]);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 252);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 253);
right = Math.max(x, Math.max(cp1x, cp2x));
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 254);
bottom = Math.max(y, Math.max(cp1y, cp2y));
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 255);
left = Math.min(x, Math.min(cp1x, cp2x));
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 256);
top = Math.min(y, Math.min(cp1y, cp2y));
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 257);
w = Math.abs(right - left);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 258);
h = Math.abs(bottom - top);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 259);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]]; 
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 260);
this._setCurveBoundingBox(pts, w, h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 261);
this._updateCoords(x, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 262);
return this;
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "quadraticCurveTo", 274);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 275);
var w,
            h,
            pts,
            right,
            left,
            bottom,
            top,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 283);
this._updateDrawingQueue(["quadraticCurveTo", cpx, cpy, x, y]);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 284);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 285);
right = Math.max(x, cpx);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 286);
bottom = Math.max(y, cpy);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 287);
left = Math.min(x, cpx);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 288);
top = Math.min(y, cpy);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 289);
w = Math.abs(right - left);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 290);
h = Math.abs(bottom - top);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 291);
pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]]; 
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 292);
this._setCurveBoundingBox(pts, w, h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 293);
this._updateCoords(x, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 294);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "drawCircle", 306);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 307);
var startAngle = 0,
            endAngle = 2 * Math.PI,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            circum = radius * 2;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 311);
circum += wt;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 312);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 313);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 314);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 315);
this._updateCoords(x, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 316);
this._updateDrawingQueue(["arc", x + radius, y + radius, radius, startAngle, endAngle, false]);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 317);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "drawDiamond", 330);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 332);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 334);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 335);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 336);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 337);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 338);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 339);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "drawEllipse", 352);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 353);
var l = 8,
            theta = -(45/180) * Math.PI,
            angle = 0,
            angleMid,
            radius = w/2,
            yRadius = h/2,
            i = 0,
            centerX = x + radius,
            centerY = y + yRadius,
            ax, ay, bx, by, cx, cy,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;

        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 365);
ax = centerX + Math.cos(0) * radius;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 366);
ay = centerY + Math.sin(0) * yRadius;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 367);
this.moveTo(ax, ay);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 368);
for(; i < l; i++)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 370);
angle += theta;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 371);
angleMid = angle - (theta / 2);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 372);
bx = centerX + Math.cos(angle) * radius;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 373);
by = centerY + Math.sin(angle) * yRadius;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 374);
cx = centerX + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 375);
cy = centerY + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 376);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 378);
this._trackSize(x + w + wt, y + h + wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 379);
this._trackSize(x - wt, y - wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 380);
this._updateCoords(x, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 381);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "drawRect", 393);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 394);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 395);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 396);
this.moveTo(x, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 397);
this.lineTo(x + w, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 398);
this.lineTo(x + w, y + h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 399);
this.lineTo(x, y + h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 400);
this.lineTo(x, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 401);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "drawRoundRect", 415);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 416);
var wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 417);
this._drawingComplete = false;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 418);
this.moveTo( x, y + eh);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 419);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 420);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 421);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 422);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 423);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 424);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 425);
this.lineTo(x + ew, y);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 426);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 427);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "drawWedge", 442);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 444);
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
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 457);
yRadius = yRadius || radius;

        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 459);
this._drawingComplete = false;
        // move to x,y position
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 461);
this._updateDrawingQueue(["moveTo", x, y]);
        
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 463);
yRadius = yRadius || radius;
        
        // limit sweep to reasonable numbers
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 466);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 468);
arc = 360;
        }
        
        // First we calculate how many segments are needed
        // for a smooth arc.
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 473);
segs = Math.ceil(Math.abs(arc) / 45);
        
        // Now calculate the sweep of each segment.
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 476);
segAngle = arc / segs;
        
        // The math requires radians rather than degrees. To convert from degrees
        // use the formula (degrees/180)*Math.PI to get radians.
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 480);
theta = -(segAngle / 180) * Math.PI;
        
        // convert angle startAngle to radians
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 483);
angle = (startAngle / 180) * Math.PI;
        
        // draw the curve in segments no larger than 45 degrees.
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 486);
if(segs > 0)
        {
            // draw a line from the center to the start of the curve
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 489);
ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 490);
ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 491);
this.lineTo(ax, ay);
            // Loop for drawing curve segments
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 493);
for(; i < segs; ++i)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 495);
angle += theta;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 496);
angleMid = angle - (theta / 2);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 497);
bx = x + Math.cos(angle) * radius;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 498);
by = y + Math.sin(angle) * yRadius;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 499);
cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 500);
cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 501);
this._updateDrawingQueue(["quadraticCurveTo", cx, cy, bx, by]);
            }
            // close the wedge by drawing a line to the center
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 504);
this._updateDrawingQueue(["lineTo", x, y]);
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 506);
this._trackSize(0 - wt , 0 - wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 507);
this._trackSize((radius * 2) + wt, (radius * 2) + wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 508);
return this;
    },
    
    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function() {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "end", 516);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 517);
this._closePath();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 518);
return this;
    },

    /**
     * Ends a fill and stroke
     *
     * @method closePath
     */
    closePath: function()
    {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "closePath", 526);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 528);
this._updateDrawingQueue(["closePath"]);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 529);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_getLinearGradient", 545);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 546);
var isNumber = Y.Lang.isNumber,
            fill = this.get("fill"),
            stops = fill.stops,
            opacity,
            color,
            stop,
            i = 0,
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
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 566);
if(Math.abs(tanRadians) * w/2 >= h/2)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 568);
if(r < 180)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 570);
y1 = y;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 571);
y2 = y + h;
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 575);
y1 = y + h;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 576);
y2 = y;
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 578);
x1 = cx - ((cy - y1)/tanRadians);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 579);
x2 = cx - ((cy - y2)/tanRadians); 
        }
        else
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 583);
if(r > 90 && r < 270)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 585);
x1 = x + w;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 586);
x2 = x;
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 590);
x1 = x;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 591);
x2 = x + w;
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 593);
y1 = ((tanRadians * (cx - x1)) - cy) * -1;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 594);
y2 = ((tanRadians * (cx - x2)) - cy) * -1;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 596);
gradient = this._context.createLinearGradient(x1, y1, x2, y2);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 597);
for(; i < len; ++i)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 599);
stop = stops[i];
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 600);
opacity = stop.opacity;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 601);
color = stop.color;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 602);
offset = stop.offset;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 603);
if(isNumber(opacity))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 605);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 606);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 610);
color = TORGB(color);
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 612);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 613);
gradient.addColorStop(offset, color);
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 615);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_getRadialGradient", 625);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 626);
var isNumber = Y.Lang.isNumber,
            fill = this.get("fill"),
            r = fill.r,
            fx = fill.fx,
            fy = fill.fy,
            stops = fill.stops,
            opacity,
            color,
            stop,
            i = 0,
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
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 647);
xc = x + w/2;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 648);
yc = y + h/2;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 649);
x1 = w * fx;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 650);
y1 = h * fy;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 651);
x2 = x + w/2;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 652);
y2 = y + h/2;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 653);
r2 = w * r;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 654);
d = Math.sqrt( Math.pow(Math.abs(xc - x1), 2) + Math.pow(Math.abs(yc - y1), 2) );
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 655);
if(d >= r2)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 657);
ratio = d/r2;
            //hack. gradient won't show if it is exactly on the edge of the arc
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 659);
if(ratio === 1)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 661);
ratio = 1.01;
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 663);
xn = (x1 - xc)/ratio;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 664);
yn = (y1 - yc)/ratio;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 665);
xn = xn > 0 ? Math.floor(xn) : Math.ceil(xn);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 666);
yn = yn > 0 ? Math.floor(yn) : Math.ceil(yn);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 667);
x1 = xc + xn;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 668);
y1 = yc + yn;
        }
        
        //If the gradient radius is greater than the circle's, adjusting the radius stretches the gradient properly.
        //If the gradient radius is less than the circle's, adjusting the radius of the gradient will not work. 
        //Instead, adjust the color stops to reflect the smaller radius.
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 674);
if(r >= 0.5)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 676);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, r * w);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 677);
stopMultiplier = 1;
        }
        else
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 681);
gradient = this._context.createRadialGradient(x1, y1, r, x2, y2, w/2);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 682);
stopMultiplier = r * 2;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 684);
for(; i < len; ++i)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 686);
stop = stops[i];
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 687);
opacity = stop.opacity;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 688);
color = stop.color;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 689);
offset = stop.offset;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 690);
if(isNumber(opacity))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 692);
opacity = Math.max(0, Math.min(1, opacity));
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 693);
color = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 697);
color = TORGB(color);
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 699);
offset = stop.offset || i/(len - 1);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 700);
offset *= stopMultiplier;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 701);
if(offset <= 1)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 703);
gradient.addColorStop(offset, color);
            }
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 706);
return gradient;
    },


    /**
     * Clears all values
     *
     * @method _initProps
     * @private
     */
    _initProps: function() {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_initProps", 716);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 717);
this._methods = [];
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 718);
this._lineToMethods = [];
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 719);
this._xcoords = [0];
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 720);
this._ycoords = [0];
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 721);
this._width = 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 722);
this._height = 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 723);
this._left = 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 724);
this._top = 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 725);
this._right = 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 726);
this._bottom = 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 727);
this._currentX = 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 728);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_createGraphic", 747);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 748);
var graphic = Y.config.doc.createElement('canvas');
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 749);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getBezierData", 761);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 762);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 767);
for (i = 0; i < n; ++i){
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 768);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }
        
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 771);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 772);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 773);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 774);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1]; 
            }
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 777);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_setCurveBoundingBox", 789);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 791);
var i = 0,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            wt = this._stroke && this._strokeWeight ? this._strokeWeight : 0,
            xy;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 800);
for(; i < len; ++i)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 802);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 803);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 804);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 805);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 806);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 808);
left = Math.round(left * 10)/10;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 809);
right = Math.round(right * 10)/10;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 810);
top = Math.round(top * 10)/10;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 811);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 812);
this._trackSize(right + wt, bottom + wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 813);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_trackSize", 824);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 825);
if (w > this._right) {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 826);
this._right = w;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 828);
if(w < this._left)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 830);
this._left = w;    
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 832);
if (h < this._top)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 834);
this._top = h;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 836);
if (h > this._bottom) 
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 838);
this._bottom = h;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 840);
this._width = this._right - this._left;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 841);
this._height = this._bottom - this._top;
    }
};
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 844);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 856);
CanvasShape = function(cfg)
{
    _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "CanvasShape", 856);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 858);
this._transforms = [];
    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 859);
this.matrix = new Y.Matrix();
    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 860);
CanvasShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 863);
CanvasShape.NAME = "canvasShape";

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 865);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "init", 873);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 875);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "initializer", 884);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 886);
var host = this,
            graphic = cfg.graphic;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 888);
host._initProps();
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 889);
host.createNode(); 
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 890);
host._xcoords = [0];
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 891);
host._ycoords = [0];
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 892);
if(graphic)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 894);
this._setGraphic(graphic);
        }
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 896);
host._updateHandler();
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_setGraphic", 907);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 909);
var graphic;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 910);
if(render instanceof Y.CanvasGraphic)
        {
		    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 912);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 916);
render = Y.one(render);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 917);
graphic = new Y.CanvasGraphic({
                render: render
            });
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 920);
graphic._appendShape(this);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 921);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "addClass", 931);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 933);
var node = Y.one(this.get("node"));
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 934);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "removeClass", 943);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 945);
var node = Y.one(this.get("node"));
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 946);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getXY", 955);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 957);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = this.get("x"),
			y = this.get("y");
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 961);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setXY", 970);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 972);
var graphic = this.get("graphic"),
			parentXY = graphic.getXY(),
			x = xy[0] - parentXY[0],
			y = xy[1] - parentXY[1];
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 976);
this._set("x", x);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 977);
this._set("y", y);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 978);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "contains", 988);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 990);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "test", 1000);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1002);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "compareTo", 1013);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1014);
var node = this.node;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1015);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_getDefaultFill", 1025);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1026);
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
	 * @method _getDefaultStroke
	 * @return Object
	 * @private
	 */
	_getDefaultStroke: function() 
	{
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_getDefaultStroke", 1043);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1045);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "createNode", 1096);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1098);
var node = Y.config.doc.createElement('canvas'),
			id = this.get("id");
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1100);
this._context = node.getContext('2d');
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1101);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1102);
node.style.overflow = "visible";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1103);
if(!this.get("visible"))
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1105);
node.style.visibility = "hidden";
        }
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1107);
node.setAttribute("id", id);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1108);
id = "#" + id;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1109);
this.node = node;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1110);
this.addClass(_getClassName(SHAPE) + " " + _getClassName(this.name)); 
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "on", 1122);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1124);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1126);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1128);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_setStrokeProps", 1138);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1140);
var color,
			weight,
			opacity,
			linejoin,
			linecap,
			dashstyle;
	    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1146);
if(stroke)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1148);
color = stroke.color;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1149);
weight = PARSE_FLOAT(stroke.weight);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1150);
opacity = PARSE_FLOAT(stroke.opacity);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1151);
linejoin = stroke.linejoin || "round";
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1152);
linecap = stroke.linecap || "butt";
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1153);
dashstyle = stroke.dashstyle;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1154);
this._miterlimit = null;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1155);
this._dashstyle = (dashstyle && Y.Lang.isArray(dashstyle) && dashstyle.length > 1) ? dashstyle : null;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1156);
this._strokeWeight = weight;

            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1158);
if (IS_NUMBER(weight) && weight > 0) 
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1160);
this._stroke = 1;
            } 
            else 
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1164);
this._stroke = 0;
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1166);
if (IS_NUMBER(opacity)) {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1167);
this._strokeStyle = this._toRGBA(color, opacity);
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1171);
this._strokeStyle = color;
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1173);
this._linecap = linecap;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1174);
if(linejoin == "round" || linejoin == "bevel")
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1176);
this._linejoin = linejoin;
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1180);
linejoin = parseInt(linejoin, 10);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1181);
if(IS_NUMBER(linejoin))
                {
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1183);
this._miterlimit =  Math.max(linejoin, 1);
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1184);
this._linejoin = "miter";
                }
            }
        }
        else
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1190);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "set", 1203);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1205);
var host = this,
			val = arguments[0];
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1207);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1208);
if(host.initialized)
		{
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1210);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_setFillProps", 1221);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1223);
var isNumber = IS_NUMBER,
			color,
			opacity,
			type;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1227);
if(fill)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1229);
color = fill.color;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1230);
type = fill.type;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1231);
if(type == "linear" || type == "radial")
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1233);
this._fillType = type;
            }
            else {_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1235);
if(color)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1237);
opacity = fill.opacity;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1238);
if (isNumber(opacity)) 
                {
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1240);
opacity = Math.max(0, Math.min(1, opacity));
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1241);
color = this._toRGBA(color, opacity);
                } 
                else 
                {
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1245);
color = TORGB(color);
                }

                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1248);
this._fillColor = color;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1249);
this._fillType = 'solid';
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1253);
this._fillColor = null;
            }}
        }
		else
		{
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1258);
this._fillType = null;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1259);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "translate", 1270);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1272);
this._translateX += x;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1273);
this._translateY += y;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1274);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "translateX", 1284);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1286);
this._translateX += x;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1287);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "translateY", 1297);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1299);
this._translateY += y;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1300);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "skew", 1310);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1312);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "skewX", 1321);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1323);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "skewY", 1332);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1334);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "rotate", 1343);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1345);
this._rotation = deg;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1346);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "scale", 1355);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1357);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_addTransform", 1386);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1388);
args = Y.Array(args);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1389);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1390);
args.unshift(type);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1391);
this._transforms.push(args);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1392);
if(this.initialized)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1394);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_updateTransform", 1404);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1406);
var node = this.node,
			key,
			transform,
			transformOrigin = this.get("transformOrigin"),
            matrix = this.matrix,
            i = 0,
            len = this._transforms.length;
        
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1414);
if(this._transforms && this._transforms.length > 0)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1416);
for(; i < len; ++i)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1418);
key = this._transforms[i].shift();
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1419);
if(key)
                {
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1421);
matrix[key].apply(matrix, this._transforms[i]); 
                }
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1424);
transform = matrix.toCSSText();
        }
        
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1427);
this._graphic.addToRedrawQueue(this);    
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1428);
transformOrigin = (100 * transformOrigin[0]) + "% " + (100 * transformOrigin[1]) + "%";
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1429);
node.style.MozTransformOrigin = transformOrigin; 
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1430);
node.style.webkitTransformOrigin = transformOrigin;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1431);
node.style.msTransformOrigin = transformOrigin;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1432);
node.style.OTransformOrigin = transformOrigin;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1433);
if(transform)
		{
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1435);
node.style.MozTransform = transform;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1436);
node.style.webkitTransform = transform;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1437);
node.style.msTransform = transform;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1438);
node.style.OTransform = transform;
		}
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1440);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_updateHandler", 1449);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1451);
this._draw();
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1452);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_draw", 1461);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1463);
var node = this.node;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1464);
this.clear();
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1465);
this._closePath();
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1466);
node.style.left = this.get("x") + "px";
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1467);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_closePath", 1476);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1478);
if(!this._methods)
		{
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1480);
return;
		}
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1482);
var node = this.get("node"),
			w = this._right - this._left,
			h = this._bottom - this._top,
			context = this._context,
			methods = [],
			cachedMethods = this._methods.concat(),
			i = 0,
			j,
			method,
			args,
            argsLen,
			len = 0;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1494);
this._context.clearRect(0, 0, node.width, node.height);
	   _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1495);
if(this._methods)
	   {
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1497);
len = cachedMethods.length;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1498);
if(!len || len < 1)
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1500);
return;
			}
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1502);
for(; i < len; ++i)
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1504);
methods[i] = cachedMethods[i].concat();
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1505);
args = methods[i];
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1506);
argsLen = args[0] == "quadraticCurveTo" ? args.length : 3;
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1507);
for(j = 1; j < argsLen; ++j)
				{
					_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1509);
if(j % 2 === 0)
					{
						_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1511);
args[j] = args[j] - this._top;
					}
					else
					{
						_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1515);
args[j] = args[j] - this._left;
					}
				}
			}
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1519);
node.setAttribute("width", Math.min(w, 2000));
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1520);
node.setAttribute("height", Math.min(2000, h));
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1521);
context.beginPath();
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1522);
for(i = 0; i < len; ++i)
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1524);
args = methods[i].concat();
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1525);
if(args && args.length > 0)
				{
					_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1527);
method = args.shift();
					_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1528);
if(method)
					{
                        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1530);
if(method == "closePath")
                        {
                            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1532);
this._strokeAndFill(context);
                        }
						_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1534);
if(method && method == "lineTo" && this._dashstyle)
						{
							_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1536);
args.unshift(this._xcoords[i] - this._left, this._ycoords[i] - this._top);
							_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1537);
this._drawDashedLine.apply(this, args);
						}
						else
						{
                            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1541);
context[method].apply(context, args); 
						}
					}
				}
			}

            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1547);
this._strokeAndFill(context);
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1548);
this._drawingComplete = true;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1549);
this._clearAndUpdateCoords();
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1550);
this._updateNodePosition();
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1551);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_strokeAndFill", 1562);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1564);
if (this._fillType) 
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1566);
if(this._fillType == "linear")
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1568);
context.fillStyle = this._getLinearGradient();
            }
            else {_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1570);
if(this._fillType == "radial")
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1572);
context.fillStyle = this._getRadialGradient();
            }
            else
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1576);
context.fillStyle = this._fillColor;
            }}
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1578);
context.closePath();
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1579);
context.fill();
        }

        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1582);
if (this._stroke) {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1583);
if(this._strokeWeight)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1585);
context.lineWidth = this._strokeWeight;
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1587);
context.lineCap = this._linecap;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1588);
context.lineJoin = this._linejoin;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1589);
if(this._miterlimit)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1591);
context.miterLimit = this._miterlimit;
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1593);
context.strokeStyle = this._strokeStyle;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1594);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_drawDashedLine", 1608);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1610);
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
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1622);
xDelta = Math.cos(radians) * segmentLength;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1623);
yDelta = Math.sin(radians) * segmentLength;
		
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1625);
for(i = 0; i < segmentCount; ++i)
		{
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1627);
context.moveTo(xCurrent, yCurrent);
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1628);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1629);
xCurrent += xDelta;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1630);
yCurrent += yDelta;
		}
		
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1633);
context.moveTo(xCurrent, yCurrent);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1634);
delta = Math.sqrt((xEnd - xCurrent) * (xEnd - xCurrent) + (yEnd - yCurrent) * (yEnd - yCurrent));
		
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1636);
if(delta > dashsize)
		{
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1638);
context.lineTo(xCurrent + Math.cos(radians) * dashsize, yCurrent + Math.sin(radians) * dashsize);
		}
		else {_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1640);
if(delta > 0)
		{
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1642);
context.lineTo(xCurrent + Math.cos(radians) * delta, yCurrent + Math.sin(radians) * delta);
		}}
		
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1645);
context.moveTo(xEnd, yEnd);
	},

	//This should move to CanvasDrawing class. 
    //Currently docmented in CanvasDrawing class.
    clear: function() {
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "clear", 1650);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1651);
this._initProps();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1652);
if(this.node) 
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1654);
this._context.clearRect(0, 0, this.node.width, this.node.height);
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1656);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getBounds", 1668);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1670);
var stroke = this.get("stroke"),
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y"),
            wt = 0;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1676);
if(stroke && stroke.weight)
		{
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1678);
wt = stroke.weight;
		}
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1680);
w = (x + w + wt) - (x - wt); 
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1681);
h = (y + h + wt) - (y - wt);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1682);
x -= wt;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1683);
y -= wt;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1684);
return this.matrix.getContentRect(w, h, x, y);
	},

    /**
     * Destroys the shape instance.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "destroy", 1692);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1694);
var graphic = this.get("graphic");
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1695);
if(graphic)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1697);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1701);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_destroy", 1711);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1713);
if(this.node)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1715);
Y.one(this.node).remove(true);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1716);
this._context = null;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1717);
this.node = null;
        }
    }
}, Y.CanvasDrawing.prototype));

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1722);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "valueFn", 1731);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1733);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 1767);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1769);
this.matrix.init();	
		    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1770);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1771);
this._transform = val;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1772);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 1775);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1777);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 1791);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1793);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "valueFn", 1804);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1806);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 1809);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1811);
var node = this.node;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1812);
if(node)
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1814);
node.setAttribute("id", val);
			}
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1816);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 1869);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1870);
var node = this.get("node"),
                visibility = val ? "visible" : "hidden";
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1872);
if(node)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1874);
node.style.visibility = visibility;
            }
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1876);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 1926);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1928);
var fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1930);
fill = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1931);
if(fill && fill.color)
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1933);
if(fill.color === undefined || fill.color == "none")
				{
					_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1935);
fill.color = null;
				}
			}
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1938);
this._setFillProps(fill);
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1939);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 1974);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1976);
var tmpl = this.get("stroke") || this._getDefaultStroke(),
                wt;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1978);
if(val && val.hasOwnProperty("weight"))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1980);
wt = parseInt(val.weight, 10);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1981);
if(!isNaN(wt))
                {
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1983);
val.weight = wt;
                }
            }
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1986);
val = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1987);
this._setStrokeProps(val);
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 1988);
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
	 * Reference to the container Graphic.
	 *
	 * @config graphic
	 * @type Graphic
	 */
	graphic: {
		readOnly: true,

		getter: function()
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2016);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2018);
return this._graphic;
		}
    }
};
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2022);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2034);
CanvasPath = function(cfg)
{
	_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "CanvasPath", 2034);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2036);
CanvasPath.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2038);
CanvasPath.NAME = "canvasPath";
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2039);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_draw", 2055);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2057);
this._closePath();
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "createNode", 2067);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2069);
var node = Y.config.doc.createElement('canvas'),
			id = this.get("id");
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2071);
this._context = node.getContext('2d');
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2072);
node.setAttribute("overflow", "visible");
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2073);
node.setAttribute("pointer-events", "none");
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2074);
node.style.pointerEvents = "none";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2075);
node.style.overflow = "visible";
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2076);
node.setAttribute("id", id);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2077);
id = "#" + id;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2078);
this.node = node;
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2079);
this.addClass(_getClassName(SHAPE) + " " + _getClassName(this.name)); 
	},

    /**
     * Completes a drawing operation. 
     *
     * @method end
     */
    end: function()
    {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "end", 2087);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2089);
this._draw();
    }
});

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2093);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2101);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2103);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2104);
return this._width - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2107);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2109);
this._width = val;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2110);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2121);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2123);
var offset = this._stroke && this._strokeWeight ? (this._strokeWeight * 2) : 0;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2124);
return this._height - offset;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2127);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2129);
this._height = val;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2130);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2144);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2146);
return this._path;
		}
	}
});
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2150);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2162);
CanvasRect = function()
{
	_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "CanvasRect", 2162);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2164);
CanvasRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2166);
CanvasRect.NAME = "canvasRect";
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2167);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_draw", 2183);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2185);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2187);
this.clear();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2188);
this.drawRect(0, 0, w, h);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2189);
this._closePath();
	}
});
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2192);
CanvasRect.ATTRS = Y.CanvasShape.ATTRS;
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2193);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2205);
CanvasEllipse = function(cfg)
{
	_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "CanvasEllipse", 2205);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2207);
CanvasEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2210);
CanvasEllipse.NAME = "canvasEllipse";

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2212);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_draw", 2228);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2230);
var w = this.get("width"),
			h = this.get("height");
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2232);
this.clear();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2233);
this.drawEllipse(0, 0, w, h);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2234);
this._closePath();
	}
});
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2237);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2245);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2247);
this.set("width", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2250);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2252);
var val = this.get("width");
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2253);
if(val) 
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2255);
val *= 0.5;
			}
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2257);
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2269);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2271);
this.set("height", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2274);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2276);
var val = this.get("height");
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2277);
if(val) 
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2279);
val *= 0.5;
			}
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2281);
return val;
		}
	}
});
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2285);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2297);
CanvasCircle = function(cfg)
{
	_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "CanvasCircle", 2297);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2299);
CanvasCircle.superclass.constructor.apply(this, arguments);
};
    
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2302);
CanvasCircle.NAME = "canvasCircle";

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2304);
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
		_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_draw", 2320);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2322);
var radius = this.get("radius");
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2323);
if(radius)
		{
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2325);
this.clear();
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2326);
this.drawCircle(0, 0, radius);
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2327);
this._closePath();
		}
	}
});

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2332);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2340);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2342);
this.set("radius", val/2);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2343);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2346);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2348);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2359);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2361);
this.set("radius", val/2);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2362);
return val;
        },

		getter: function()
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2365);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2367);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2381);
Y.CanvasCircle = CanvasCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class CanvasPieSlice
 * @constructor
 */
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2389);
CanvasPieSlice = function()
{
	_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "CanvasPieSlice", 2389);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2391);
CanvasPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2393);
CanvasPieSlice.NAME = "canvasPieSlice";
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2394);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_draw", 2410);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2412);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2417);
this.clear();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2418);
this._left = x;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2419);
this._right = radius;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2420);
this._top = y;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2421);
this._bottom = radius;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2422);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2423);
this.end();
	}
 });
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2426);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2464);
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
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2476);
function CanvasGraphic(config) {
    
    _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "CanvasGraphic", 2476);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2478);
CanvasGraphic.superclass.constructor.apply(this, arguments);
}

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2481);
CanvasGraphic.NAME = "canvasGraphic";

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2483);
CanvasGraphic.ATTRS = {
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
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "valueFn", 2499);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2501);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2504);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2506);
var node = this._node;
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2507);
if(node)
			{
				_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2509);
node.setAttribute("id", val);
			}
			_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2511);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2525);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2527);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2541);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2543);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2557);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2559);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2570);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2572);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2574);
this._node.style.width = val + "px";            
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2576);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2587);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2589);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2591);
this._node.style.height = val + "px";
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2593);
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
     * The contentBounds will resize to greater values but not smaller values. (for performance)
     * When resizing the contentBounds down is desirable, set the resizeDown value to true.
     *
     * @config resizeDown 
     * @type Boolean
     */
    resizeDown: {
        getter: function()
        {
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2617);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2619);
return this._resizeDown;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2622);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2624);
this._resizeDown = val;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2625);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2627);
this._redraw();
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2629);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2640);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2642);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2645);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2647);
this._x = val;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2648);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2650);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2652);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getter", 2663);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2665);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2668);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2670);
this._y = val;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2671);
if(this._node)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2673);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2675);
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
            _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "setter", 2701);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2703);
this._toggleVisible(val);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2704);
return val;
        }
    }
};

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2709);
Y.extend(CanvasGraphic, Y.GraphicBase, {
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getXY", 2734);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2736);
var node = Y.one(this._node),
            xy;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2738);
if(node)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2740);
xy = node.getXY();
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2742);
return xy;
    },

    /**
     * Storage for `resizeDown` attribute.
     *
     * @property _resizeDown 
     * @type Boolean
     * @private
     */
    _resizeDown: false,
    
	/**
     * Initializes the class.
     *
     * @method initializer
     * @param {Object} config Optional attributes 
     * @private
     */
    initializer: function(config) {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "initializer", 2761);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2762);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden",
            w = this.get("width") || 0,
            h = this.get("height") || 0;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2766);
this._shapes = {};
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2767);
this._redrawQueue = {};
		_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2768);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2774);
this._node = DOCUMENT.createElement('div');
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2775);
this._node.style.position = "absolute";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2776);
this._node.style.visibility = visibility;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2777);
this.set("width", w);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2778);
this.set("height", h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2779);
if(render)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2781);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "render", 2791);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2792);
var parentNode = Y.one(render),
            node = this._node,
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2796);
parentNode = parentNode || DOCUMENT.body;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2797);
parentNode.appendChild(node);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2798);
node.style.display = "block";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2799);
node.style.position = "absolute";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2800);
node.style.left = "0px";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2801);
node.style.top = "0px";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2802);
this.set("width", w);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2803);
this.set("height", h);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2804);
this.parentNode = parentNode;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2805);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "destroy", 2813);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2815);
this.removeAllShapes();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2816);
if(this._node)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2818);
this._removeChildren(this._node);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2819);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "addShape", 2830);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2832);
cfg.graphic = this;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2833);
if(!this.get("visible"))
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2835);
cfg.visible = false;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2837);
var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2839);
this._appendShape(shape);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2840);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_appendShape", 2850);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2852);
var node = shape.node,
            parentNode = this._frag || this._node;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2854);
if(this.get("autoDraw")) 
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2856);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2860);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "removeShape", 2870);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2872);
if(!(shape instanceof CanvasShape))
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2874);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2876);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2879);
if(shape && shape instanceof CanvasShape)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2881);
shape._destroy();
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2882);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2884);
if(this.get("autoDraw")) 
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2886);
this._redraw();
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2888);
return shape;
    },

    /**
     * Removes all shape instances from the dom.
     *
     * @method removeAllShapes
     */
    removeAllShapes: function()
    {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "removeAllShapes", 2896);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2898);
var shapes = this._shapes,
            i;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2900);
for(i in shapes)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2902);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2904);
shapes[i].destroy();
            }
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2907);
this._shapes = {};
    },
    
    /**
     * Clears the graphics object.
     *
     * @method clear
     */
    clear: function() {
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "clear", 2915);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2916);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_removeChildren", 2926);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2928);
if(node && node.hasChildNodes())
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2930);
var child;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2931);
while(node.firstChild)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2933);
child = node.firstChild;
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2934);
this._removeChildren(child);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2935);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_toggleVisible", 2947);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2949);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2952);
if(shapes)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2954);
for(i in shapes)
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2956);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2958);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2962);
if(this._node)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2964);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_getShapeClass", 2976);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2978);
var shape = this._shapeClass[val];
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2979);
if(shape)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2981);
return shape;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 2983);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "getShapeById", 3008);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3010);
var shape = this._shapes[id];
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3011);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "batch", 3020);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3022);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3023);
this.set("autoDraw", false);
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3024);
method();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3025);
this._redraw();
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3026);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_getDocFrag", 3036);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3038);
if(!this._frag)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3040);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3042);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_redraw", 3051);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3053);
var box = this.get("resizeDown") ? this._getUpdatedContentBounds() : this._contentBounds;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3054);
if(this.get("autoSize"))
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3056);
this.set("width", box.right);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3057);
this.set("height", box.bottom);
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3059);
if(this._frag)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3061);
this._node.appendChild(this._frag);
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3062);
this._frag = null;
        }
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "addToRedrawQueue", 3074);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3076);
var shapeBox,
            box;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3078);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3079);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3081);
shapeBox = shape.getBounds();
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3082);
box = this._contentBounds;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3083);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3084);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3085);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3086);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3087);
box.width = box.right - box.left;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3088);
box.height = box.bottom - box.top;
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3089);
this._contentBounds = box;
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3091);
if(this.get("autoDraw")) 
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3093);
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
        _yuitest_coverfunc("/build/graphics-canvas/graphics-canvas.js", "_getUpdatedContentBounds", 3104);
_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3106);
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
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3116);
for(i in queue)
        {
            _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3118);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3120);
shape = queue[i];
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3121);
bounds = shape.getBounds();
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3122);
box.left = Math.min(box.left, bounds.left);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3123);
box.top = Math.min(box.top, bounds.top);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3124);
box.right = Math.max(box.right, bounds.right);
                _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3125);
box.bottom = Math.max(box.bottom, bounds.bottom);
            }
        }
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3128);
box.width = box.right - box.left;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3129);
box.height = box.bottom - box.top;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3130);
this._contentBounds = box;
        _yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3131);
return box;
    }
});

_yuitest_coverline("/build/graphics-canvas/graphics-canvas.js", 3135);
Y.CanvasGraphic = CanvasGraphic;


}, '@VERSION@' ,{requires:['graphics'], skinnable:false});
