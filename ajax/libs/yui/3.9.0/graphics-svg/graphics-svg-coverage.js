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
_yuitest_coverage["build/graphics-svg/graphics-svg.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/graphics-svg/graphics-svg.js",
    code: []
};
_yuitest_coverage["build/graphics-svg/graphics-svg.js"].code=["YUI.add('graphics-svg', function (Y, NAME) {","","var IMPLEMENTATION = \"svg\",","    SHAPE = \"shape\",","	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,","    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\\.][0-9]*/g,","    Y_LANG = Y.Lang,","	AttributeLite = Y.AttributeLite,","	SVGGraphic,","    SVGShape,","	SVGCircle,","	SVGRect,","	SVGPath,","	SVGEllipse,","    SVGPieSlice,","    DOCUMENT = Y.config.doc,","    _getClassName = Y.ClassNameManager.getClassName;","","function SVGDrawing(){}","","/**"," * <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> implementation of the <a href=\"Drawing.html\">`Drawing`</a> class."," * `SVGDrawing` is not intended to be used directly. Instead, use the <a href=\"Drawing.html\">`Drawing`</a> class."," * If the browser has <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities, the <a href=\"Drawing.html\">`Drawing`</a>"," * class will point to the `SVGDrawing` class."," *"," * @module graphics"," * @class SVGDrawing"," * @constructor"," */","SVGDrawing.prototype = {","    /**","     * Maps path to methods","     *","     * @property _pathSymbolToMethod","     * @type Object","     * @private","     */","    _pathSymbolToMethod: {","        M: \"moveTo\",","        m: \"relativeMoveTo\",","        L: \"lineTo\",","        l: \"relativeLineTo\",","        C: \"curveTo\",","        c: \"relativeCurveTo\",","        Q: \"quadraticCurveTo\",","        q: \"relativeQuadraticCurveTo\",","        z: \"closePath\",","        Z: \"closePath\"","    },","","    /**","     * Current x position of the drawing.","     *","     * @property _currentX","     * @type Number","     * @private","     */","    _currentX: 0,","","    /**","     * Current y position of the drqwing.","     *","     * @property _currentY","     * @type Number","     * @private","     */","    _currentY: 0,","","    /**","     * Indicates the type of shape","     *","     * @private","     * @property _type","     * @readOnly","     * @type String","     */","    _type: \"path\",","","    /**","     * Draws a bezier curve.","     *","     * @method curveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    curveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a bezier curve relative to the current coordinates.","     *","     * @method relativeCurveTo","     * @param {Number} cp1x x-coordinate for the first control point.","     * @param {Number} cp1y y-coordinate for the first control point.","     * @param {Number} cp2x x-coordinate for the second control point.","     * @param {Number} cp2y y-coordinate for the second control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeCurveTo: function() {","        this._curveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements curveTo methods.","     *","     * @method _curveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _curveTo: function(args, relative) {","        var w,","            h,","            pts,","            cp1x,","            cp1y,","            cp2x,","            cp2y,","            x,","            y,","            right,","            left,","            bottom,","            top,","            i,","            len,","            pathArrayLen,","            currentArray,","            command = relative ? \"c\" : \"C\",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        this._pathArray = this._pathArray || [];","        if(this._pathType !== command)","        {","            this._pathType = command;","            currentArray = [command];","            this._pathArray.push(currentArray);","        }","        else","        {","            currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];","            if(!currentArray)","            {","                currentArray = [];","                this._pathArray.push(currentArray);","            }","        }","        pathArrayLen = this._pathArray.length - 1;","        this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat(args);","        len = args.length - 5;","        for(i = 0; i < len; i = i + 6)","        {","            cp1x = parseFloat(args[i]) + relativeX;","            cp1y = parseFloat(args[i + 1]) + relativeY;","            cp2x = parseFloat(args[i + 2]) + relativeX;","            cp2y = parseFloat(args[i + 3]) + relativeY;","            x = parseFloat(args[i + 4]) + relativeX;","            y = parseFloat(args[i + 5]) + relativeY;","            right = Math.max(x, Math.max(cp1x, cp2x));","            bottom = Math.max(y, Math.max(cp1y, cp2y));","            left = Math.min(x, Math.min(cp1x, cp2x));","            top = Math.min(y, Math.min(cp1y, cp2y));","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","    },","","    /**","     * Draws a quadratic bezier curve.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    quadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a quadratic bezier curve relative to the current position.","     *","     * @method quadraticCurveTo","     * @param {Number} cpx x-coordinate for the control point.","     * @param {Number} cpy y-coordinate for the control point.","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeQuadraticCurveTo: function() {","        this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements quadraticCurveTo methods.","     *","     * @method _quadraticCurveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _quadraticCurveTo: function(args, relative) {","        var cpx,","            cpy,","            x,","            y,","            pathArrayLen,","            currentArray,","            w,","            h,","            pts,","            right,","            left,","            bottom,","            top,","            i,","            len,","            command = relative ? \"q\" : \"Q\",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        this._pathArray = this._pathArray || [];","        if(this._pathType !== command)","        {","            this._pathType = command;","            currentArray = [command];","            this._pathArray.push(currentArray);","        }","        else","        {","            currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];","            if(!currentArray)","            {","                currentArray = [];","                this._pathArray.push(currentArray);","            }","        }","        pathArrayLen = this._pathArray.length - 1;","        this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat(args);","        len = args.length - 3;","        for(i = 0; i < len; i = i + 4)","        {","            cpx = parseFloat(args[i]) + relativeX;","            cpy = parseFloat(args[i + 1]) + relativeY;","            x = parseFloat(args[i + 2]) + relativeX;","            y = parseFloat(args[i + 3]) + relativeY;","            right = Math.max(x, cpx);","            bottom = Math.max(y, cpy);","            left = Math.min(x, cpx);","            top = Math.min(y, cpy);","            w = Math.abs(right - left);","            h = Math.abs(bottom - top);","            pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];","            this._setCurveBoundingBox(pts, w, h);","            this._currentX = x;","            this._currentY = y;","        }","    },","","    /**","     * Draws a rectangle.","     *","     * @method drawRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     */","    drawRect: function(x, y, w, h) {","        this.moveTo(x, y);","        this.lineTo(x + w, y);","        this.lineTo(x + w, y + h);","        this.lineTo(x, y + h);","        this.lineTo(x, y);","        return this;","    },","","    /**","     * Draws a rectangle with rounded corners.","     *","     * @method drawRoundRect","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @param {Number} ew width of the ellipse used to draw the rounded corners","     * @param {Number} eh height of the ellipse used to draw the rounded corners","     * @chainable","     */","    drawRoundRect: function(x, y, w, h, ew, eh) {","        this.moveTo(x, y + eh);","        this.lineTo(x, y + h - eh);","        this.quadraticCurveTo(x, y + h, x + ew, y + h);","        this.lineTo(x + w - ew, y + h);","        this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);","        this.lineTo(x + w, y + eh);","        this.quadraticCurveTo(x + w, y, x + w - ew, y);","        this.lineTo(x + ew, y);","        this.quadraticCurveTo(x, y, x, y + eh);","        return this;","	},","","    /**","     * Draws a circle.","     *","     * @method drawCircle","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} r radius","     * @chainable","     * @protected","     */","	drawCircle: function(x, y, radius) {","        var circum = radius * 2;","        this._drawingComplete = false;","        this._trackSize(x, y);","        this._trackSize(x + circum, y + circum);","        this._pathArray = this._pathArray || [];","        this._pathArray.push([\"M\", x + radius, y]);","        this._pathArray.push([\"A\",  radius, radius, 0, 1, 0, x + radius, y + circum]);","        this._pathArray.push([\"A\",  radius, radius, 0, 1, 0, x + radius, y]);","        this._currentX = x;","        this._currentY = y;","        return this;","    },","","    /**","     * Draws an ellipse.","     *","     * @method drawEllipse","     * @param {Number} x x-coordinate","     * @param {Number} y y-coordinate","     * @param {Number} w width","     * @param {Number} h height","     * @chainable","     * @protected","     */","	drawEllipse: function(x, y, w, h) {","        var radius = w * 0.5,","            yRadius = h * 0.5;","        this._drawingComplete = false;","        this._trackSize(x, y);","        this._trackSize(x + w, y + h);","        this._pathArray = this._pathArray || [];","        this._pathArray.push([\"M\", x + radius, y]);","        this._pathArray.push([\"A\",  radius, yRadius, 0, 1, 0, x + radius, y + h]);","        this._pathArray.push([\"A\",  radius, yRadius, 0, 1, 0, x + radius, y]);","        this._currentX = x;","        this._currentY = y;","        return this;","    },","","    /**","     * Draws a diamond.","     *","     * @method drawDiamond","     * @param {Number} x y-coordinate","     * @param {Number} y x-coordinate","     * @param {Number} width width","     * @param {Number} height height","     * @chainable","     * @protected","     */","    drawDiamond: function(x, y, width, height)","    {","        var midWidth = width * 0.5,","            midHeight = height * 0.5;","        this.moveTo(x + midWidth, y);","        this.lineTo(x + width, y + midHeight);","        this.lineTo(x + midWidth, y + height);","        this.lineTo(x, y + midHeight);","        this.lineTo(x + midWidth, y);","        return this;","    },","","    /**","     * Draws a wedge.","     *","     * @method drawWedge","     * @param {Number} x x-coordinate of the wedge's center point","     * @param {Number} y y-coordinate of the wedge's center point","     * @param {Number} startAngle starting angle in degrees","     * @param {Number} arc sweep of the wedge. Negative values draw clockwise.","     * @param {Number} radius radius of wedge. If [optional] yRadius is defined, then radius is the x radius.","     * @param {Number} yRadius [optional] y radius for wedge.","     * @chainable","     * @private","     */","    drawWedge: function(x, y, startAngle, arc, radius, yRadius)","    {","        var segs,","            segAngle,","            theta,","            angle,","            angleMid,","            ax,","            ay,","            bx,","            by,","            cx,","            cy,","            i,","            diameter = radius * 2,","            currentArray,","            pathArrayLen;","        this._pathArray = this._pathArray || [];","        yRadius = yRadius || radius;","        if(this._pathType != \"M\")","        {","            this._pathType = \"M\";","            currentArray = [\"M\"];","            this._pathArray.push(currentArray);","        }","        else","        {","            currentArray = this._getCurrentArray();","        }","        pathArrayLen = this._pathArray.length - 1;","        this._pathArray[pathArrayLen].push(x);","        this._pathArray[pathArrayLen].push(x);","","        // limit sweep to reasonable numbers","        if(Math.abs(arc) > 360)","        {","            arc = 360;","        }","","        // First we calculate how many segments are needed","        // for a smooth arc.","        segs = Math.ceil(Math.abs(arc) / 45);","","        // Now calculate the sweep of each segment.","        segAngle = arc / segs;","","        // The math requires radians rather than degrees. To convert from degrees","        // use the formula (degrees/180)*Math.PI to get radians.","        theta = -(segAngle / 180) * Math.PI;","","        // convert angle startAngle to radians","        angle = (startAngle / 180) * Math.PI;","        if(segs > 0)","        {","            // draw a line from the center to the start of the curve","            ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;","            ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;","            this._pathType = \"L\";","            pathArrayLen++;","            this._pathArray[pathArrayLen] = [\"L\"];","            this._pathArray[pathArrayLen].push(Math.round(ax));","            this._pathArray[pathArrayLen].push(Math.round(ay));","            pathArrayLen++;","            this._pathType = \"Q\";","            this._pathArray[pathArrayLen] = [\"Q\"];","            for(i = 0; i < segs; ++i)","            {","                angle += theta;","                angleMid = angle - (theta / 2);","                bx = x + Math.cos(angle) * radius;","                by = y + Math.sin(angle) * yRadius;","                cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));","                cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));","                this._pathArray[pathArrayLen].push(Math.round(cx));","                this._pathArray[pathArrayLen].push(Math.round(cy));","                this._pathArray[pathArrayLen].push(Math.round(bx));","                this._pathArray[pathArrayLen].push(Math.round(by));","            }","        }","        this._currentX = x;","        this._currentY = y;","        this._trackSize(diameter, diameter);","        return this;","    },","","    /**","     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.","     *","     * @method lineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    lineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Draws a line segment using the current line style from the current drawing position to the relative x and y coordinates.","     *","     * @method relativeLineTo","     * @param {Number} point1 x-coordinate for the end point.","     * @param {Number} point2 y-coordinate for the end point.","     * @chainable","     */","    relativeLineTo: function()","    {","        this._lineTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements lineTo methods.","     *","     * @method _lineTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _lineTo: function(args, relative) {","        var point1 = args[0],","            i,","            len,","            pathArrayLen,","            currentArray,","            x,","            y,","            command = relative ? \"l\" : \"L\",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        this._pathArray = this._pathArray || [];","        this._shapeType = \"path\";","        len = args.length;","        if(this._pathType !== command)","        {","            this._pathType = command;","            currentArray = [command];","            this._pathArray.push(currentArray);","        }","        else","        {","            currentArray = this._getCurrentArray();","        }","        pathArrayLen = this._pathArray.length - 1;","        if (typeof point1 === 'string' || typeof point1 === 'number') {","            for (i = 0; i < len; i = i + 2) {","                x = parseFloat(args[i]);","                y = parseFloat(args[i + 1]);","                this._pathArray[pathArrayLen].push(x);","                this._pathArray[pathArrayLen].push(y);","                x = x + relativeX;","                y = y + relativeY;","                this._currentX = x;","                this._currentY = y;","                this._trackSize.apply(this, [x, y]);","            }","        }","        else","        {","            for (i = 0; i < len; ++i) {","                x = parseFloat(args[i][0]);","                y = parseFloat(args[i][1]);","                this._pathArray[pathArrayLen].push(x);","                this._pathArray[pathArrayLen].push(y);","                this._currentX = x;","                this._currentY = y;","                x = x + relativeX;","                y = y + relativeY;","                this._trackSize.apply(this, [x, y]);","            }","        }","    },","","    /**","     * Moves the current drawing position to specified x and y coordinates.","     *","     * @method moveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    moveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), false]);","        return this;","    },","","    /**","     * Moves the current drawing position relative to specified x and y coordinates.","     *","     * @method relativeMoveTo","     * @param {Number} x x-coordinate for the end point.","     * @param {Number} y y-coordinate for the end point.","     * @chainable","     */","    relativeMoveTo: function()","    {","        this._moveTo.apply(this, [Y.Array(arguments), true]);","        return this;","    },","","    /**","     * Implements moveTo methods.","     *","     * @method _moveTo","     * @param {Array} args The arguments to be used.","     * @param {Boolean} relative Indicates whether or not to use relative coordinates.","     * @private","     */","    _moveTo: function(args, relative) {","        var pathArrayLen,","            currentArray,","            x = parseFloat(args[0]),","            y = parseFloat(args[1]),","            command = relative ? \"m\" : \"M\",","            relativeX = relative ? parseFloat(this._currentX) : 0,","            relativeY = relative ? parseFloat(this._currentY) : 0;","        this._pathArray = this._pathArray || [];","        this._pathType = command;","        currentArray = [command];","        this._pathArray.push(currentArray);","        pathArrayLen = this._pathArray.length - 1;","        this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat([x, y]);","        x = x + relativeX;","        y = y + relativeY;","        this._currentX = x;","        this._currentY = y;","        this._trackSize(x, y);","    },","","    /**","     * Completes a drawing operation.","     *","     * @method end","     * @chainable","     */","    end: function()","    {","        this._closePath();","        return this;","    },","","    /**","     * Clears the path.","     *","     * @method clear","     * @chainable","     */","    clear: function()","    {","        this._currentX = 0;","        this._currentY = 0;","        this._width = 0;","        this._height = 0;","        this._left = 0;","        this._right = 0;","        this._top = 0;","        this._bottom = 0;","        this._pathArray = [];","        this._path = \"\";","        this._pathType = \"\";","        return this;","    },","","    /**","     * Draws the path.","     *","     * @method _closePath","     * @private","     */","    _closePath: function()","    {","        var pathArray,","            segmentArray,","            pathType,","            len,","            val,","            val2,","            i,","            path = \"\",","            node = this.node,","            left = parseFloat(this._left),","            top = parseFloat(this._top),","            fill = this.get(\"fill\");","        if(this._pathArray)","        {","            pathArray = this._pathArray.concat();","            while(pathArray && pathArray.length > 0)","            {","                segmentArray = pathArray.shift();","                len = segmentArray.length;","                pathType = segmentArray[0];","                if(pathType === \"A\")","                {","                    path += pathType + segmentArray[1] + \",\" + segmentArray[2];","                }","                else if(pathType == \"z\" || pathType == \"Z\")","                {","                    path += \" z \";","                }","                else if(pathType == \"C\" || pathType == \"c\")","                {","                    path += pathType + (segmentArray[1] - left)+ \",\" + (segmentArray[2] - top);","                }","                else","                {","                    path += \" \" + pathType + parseFloat(segmentArray[1] - left);","                }","                switch(pathType)","                {","                    case \"L\" :","                    case \"l\" :","                    case \"M\" :","                    case \"m\" :","                    case \"Q\" :","                    case \"q\" :","                        for(i = 2; i < len; ++i)","                        {","                            val = (i % 2 === 0) ? top : left;","                            val = segmentArray[i] - val;","                            path += \", \" + parseFloat(val);","                        }","                    break;","                    case \"A\" :","                        val = \" \" + parseFloat(segmentArray[3]) + \" \" + parseFloat(segmentArray[4]);","                        val += \",\" + parseFloat(segmentArray[5]) + \" \" + parseFloat(segmentArray[6] - left);","                        val += \",\" + parseFloat(segmentArray[7] - top);","                        path += \" \" + val;","                    break;","                    case \"C\" :","                    case \"c\" :","                        for(i = 3; i < len - 1; i = i + 2)","                        {","                            val = parseFloat(segmentArray[i] - left);","                            val = val + \", \";","                            val = val + parseFloat(segmentArray[i + 1] - top);","                            path += \" \" + val;","                        }","                    break;","                }","            }","            if(fill && fill.color)","            {","                path += 'z';","            }","            Y.Lang.trim(path);","            if(path)","            {","                node.setAttribute(\"d\", path);","            }","","            this._path = path;","            this._fillChangeHandler();","            this._strokeChangeHandler();","            this._updateTransform();","        }","    },","","    /**","     * Ends a fill and stroke","     *","     * @method closePath","     * @chainable","     */","    closePath: function()","    {","        this._pathArray.push([\"z\"]);","        return this;","    },","","    /**","     * Returns the current array of drawing commands.","     *","     * @method _getCurrentArray","     * @return Array","     * @private","     */","    _getCurrentArray: function()","    {","        var currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];","        if(!currentArray)","        {","            currentArray = [];","            this._pathArray.push(currentArray);","        }","        return currentArray;","    },","","    /**","     * Returns the points on a curve","     *","     * @method getBezierData","     * @param Array points Array containing the begin, end and control points of a curve.","     * @param Number t The value for incrementing the next set of points.","     * @return Array","     * @private","     */","    getBezierData: function(points, t) {","        var n = points.length,","            tmp = [],","            i,","            j;","","        for (i = 0; i < n; ++i){","            tmp[i] = [points[i][0], points[i][1]]; // save input","        }","","        for (j = 1; j < n; ++j) {","            for (i = 0; i < n - j; ++i) {","                tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];","                tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];","            }","        }","        return [ tmp[0][0], tmp[0][1] ];","    },","","    /**","     * Calculates the bounding box for a curve","     *","     * @method _setCurveBoundingBox","     * @param Array pts Array containing points for start, end and control points of a curve.","     * @param Number w Width used to calculate the number of points to describe the curve.","     * @param Number h Height used to calculate the number of points to describe the curve.","     * @private","     */","    _setCurveBoundingBox: function(pts, w, h)","    {","        var i,","            left = this._currentX,","            right = left,","            top = this._currentY,","            bottom = top,","            len = Math.round(Math.sqrt((w * w) + (h * h))),","            t = 1/len,","            xy;","        for(i = 0; i < len; ++i)","        {","            xy = this.getBezierData(pts, t * i);","            left = isNaN(left) ? xy[0] : Math.min(xy[0], left);","            right = isNaN(right) ? xy[0] : Math.max(xy[0], right);","            top = isNaN(top) ? xy[1] : Math.min(xy[1], top);","            bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);","        }","        left = Math.round(left * 10)/10;","        right = Math.round(right * 10)/10;","        top = Math.round(top * 10)/10;","        bottom = Math.round(bottom * 10)/10;","        this._trackSize(right, bottom);","        this._trackSize(left, top);","    },","","    /**","     * Updates the size of the graphics object","     *","     * @method _trackSize","     * @param {Number} w width","     * @param {Number} h height","     * @private","     */","    _trackSize: function(w, h) {","        if (w > this._right) {","            this._right = w;","        }","        if(w < this._left)","        {","            this._left = w;","        }","        if (h < this._top)","        {","            this._top = h;","        }","        if (h > this._bottom)","        {","            this._bottom = h;","        }","        this._width = this._right - this._left;","        this._height = this._bottom - this._top;","    }","};","Y.SVGDrawing = SVGDrawing;","/**"," * <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> implementation of the <a href=\"Shape.html\">`Shape`</a> class."," * `SVGShape` is not intended to be used directly. Instead, use the <a href=\"Shape.html\">`Shape`</a> class."," * If the browser has <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities, the <a href=\"Shape.html\">`Shape`</a>"," * class will point to the `SVGShape` class."," *"," * @module graphics"," * @class SVGShape"," * @constructor"," * @param {Object} cfg (optional) Attribute configs"," */","SVGShape = function(cfg)","{","    this._transforms = [];","    this.matrix = new Y.Matrix();","    this._normalizedMatrix = new Y.Matrix();","    SVGShape.superclass.constructor.apply(this, arguments);","};","","SVGShape.NAME = \"shape\";","","Y.extend(SVGShape, Y.GraphicBase, Y.mix({","    /**","     * Storage for x attribute.","     *","     * @property _x","     * @protected","     */","    _x: 0,","","    /**","     * Storage for y attribute.","     *","     * @property _y","     * @protected","     */","    _y: 0,","","    /**","     * Init method, invoked during construction.","     * Calls `initializer` method.","     *","     * @method init","     * @protected","     */","	init: function()","	{","		this.initializer.apply(this, arguments);","	},","","	/**","	 * Initializes the shape","	 *","	 * @private","	 * @method initializer","	 */","	initializer: function(cfg)","	{","		var host = this,","            graphic = cfg.graphic,","            data = this.get(\"data\");","		host.createNode();","		if(graphic)","        {","            host._setGraphic(graphic);","        }","        if(data)","        {","            host._parsePathData(data);","        }","        host._updateHandler();","	},","","    /**","     * Set the Graphic instance for the shape.","     *","     * @method _setGraphic","     * @param {Graphic | Node | HTMLElement | String} render This param is used to determine the graphic instance. If it is a","     * `Graphic` instance, it will be assigned to the `graphic` attribute. Otherwise, a new Graphic instance will be created","     * and rendered into the dom element that the render represents.","     * @private","     */","    _setGraphic: function(render)","    {","        var graphic;","        if(render instanceof Y.SVGGraphic)","        {","            this._graphic = render;","        }","        else","        {","            render = Y.one(render);","            graphic = new Y.SVGGraphic({","                render: render","            });","            graphic._appendShape(this);","            this._graphic = graphic;","        }","    },","","	/**","	 * Add a class name to each node.","	 *","	 * @method addClass","	 * @param {String} className the class name to add to the node's class attribute","	 */","	addClass: function(className)","	{","        var node = this.node;","		node.className.baseVal = Y_LANG.trim([node.className.baseVal, className].join(' '));","	},","","	/**","	 * Removes a class name from each node.","	 *","	 * @method removeClass","	 * @param {String} className the class name to remove from the node's class attribute","	 */","	removeClass: function(className)","	{","		var node = this.node,","			classString = node.className.baseVal;","		classString = classString.replace(new RegExp(className + ' '), className).replace(new RegExp(className), '');","		node.className.baseVal = classString;","	},","","	/**","	 * Gets the current position of the node in page coordinates.","	 *","	 * @method getXY","	 * @return Array The XY position of the shape.","	 */","	getXY: function()","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY(),","			x = this._x,","			y = this._y;","		return [parentXY[0] + x, parentXY[1] + y];","	},","","	/**","	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.","	 *","	 * @method setXY","	 * @param {Array} Contains x & y values for new position (coordinates are page-based)","	 */","	setXY: function(xy)","	{","		var graphic = this._graphic,","			parentXY = graphic.getXY();","		this._x = xy[0] - parentXY[0];","		this._y = xy[1] - parentXY[1];","        this.set(\"transform\", this.get(\"transform\"));","	},","","	/**","	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.","	 *","	 * @method contains","	 * @param {SVGShape | HTMLElement} needle The possible node or descendent","	 * @return Boolean Whether or not this shape is the needle or its ancestor.","	 */","	contains: function(needle)","	{","		return needle === Y.one(this.node);","	},","","	/**","	 * Compares nodes to determine if they match.","	 * Node instances can be compared to each other and/or HTMLElements.","	 * @method compareTo","	 * @param {HTMLElement | Node} refNode The reference node to compare to the node.","	 * @return {Boolean} True if the nodes match, false if they do not.","	 */","	compareTo: function(refNode) {","		var node = this.node;","","		return node === refNode;","	},","","	/**","	 * Test if the supplied node matches the supplied selector.","	 *","	 * @method test","	 * @param {String} selector The CSS selector to test against.","	 * @return Boolean Wheter or not the shape matches the selector.","	 */","	test: function(selector)","	{","		return Y.Selector.test(this.node, selector);","	},","","	/**","	 * Value function for fill attribute","	 *","	 * @private","	 * @method _getDefaultFill","	 * @return Object","	 */","	_getDefaultFill: function() {","		return {","			type: \"solid\",","			opacity: 1,","			cx: 0.5,","			cy: 0.5,","			fx: 0.5,","			fy: 0.5,","			r: 0.5","		};","	},","","	/**","	 * Value function for stroke attribute","	 *","	 * @private","	 * @method _getDefaultStroke","	 * @return Object","	 */","	_getDefaultStroke: function()","	{","		return {","			weight: 1,","			dashstyle: \"none\",","			color: \"#000\",","			opacity: 1.0","		};","	},","","	/**","	 * Creates the dom node for the shape.","	 *","     * @method createNode","	 * @return HTMLElement","	 * @private","	 */","	createNode: function()","	{","		var host = this,","            node = DOCUMENT.createElementNS(\"http://www.w3.org/2000/svg\", \"svg:\" + this._type),","			id = host.get(\"id\"),","            name = host.name,","            concat = host._camelCaseConcat,","			pointerEvents = host.get(\"pointerEvents\");","		host.node = node;","		host.addClass(_getClassName(SHAPE) + \" \" + _getClassName(concat(IMPLEMENTATION, SHAPE)) + \" \" + _getClassName(name) + \" \" + _getClassName(concat(IMPLEMENTATION, name)));","        if(id)","		{","			node.setAttribute(\"id\", id);","		}","		if(pointerEvents)","		{","			node.setAttribute(\"pointer-events\", pointerEvents);","		}","        if(!host.get(\"visible\"))","        {","            Y.one(node).setStyle(\"visibility\", \"hidden\");","        }","	},","","","	/**","     * Overrides default `on` method. Checks to see if its a dom interaction event. If so,","     * return an event attached to the `node` element. If not, return the normal functionality.","     *","     * @method on","     * @param {String} type event type","     * @param {Object} callback function","	 * @private","	 */","	on: function(type, fn)","	{","		if(Y.Node.DOM_EVENTS[type])","		{","			return Y.one(\"#\" +  this.get(\"id\")).on(type, fn);","		}","		return Y.on.apply(this, arguments);","	},","","	/**","	 * Adds a stroke to the shape node.","	 *","	 * @method _strokeChangeHandler","	 * @private","	 */","	_strokeChangeHandler: function(e)","	{","		var node = this.node,","			stroke = this.get(\"stroke\"),","			strokeOpacity,","			dashstyle,","			dash,","			linejoin;","		if(stroke && stroke.weight && stroke.weight > 0)","		{","			linejoin = stroke.linejoin || \"round\";","			strokeOpacity = parseFloat(stroke.opacity);","			dashstyle = stroke.dashstyle || \"none\";","			dash = Y_LANG.isArray(dashstyle) ? dashstyle.toString() : dashstyle;","			stroke.color = stroke.color || \"#000000\";","			stroke.weight = stroke.weight || 1;","			stroke.opacity = Y_LANG.isNumber(strokeOpacity) ? strokeOpacity : 1;","			stroke.linecap = stroke.linecap || \"butt\";","			node.setAttribute(\"stroke-dasharray\", dash);","			node.setAttribute(\"stroke\", stroke.color);","			node.setAttribute(\"stroke-linecap\", stroke.linecap);","			node.setAttribute(\"stroke-width\",  stroke.weight);","			node.setAttribute(\"stroke-opacity\", stroke.opacity);","			if(linejoin == \"round\" || linejoin == \"bevel\")","			{","				node.setAttribute(\"stroke-linejoin\", linejoin);","			}","			else","			{","				linejoin = parseInt(linejoin, 10);","				if(Y_LANG.isNumber(linejoin))","				{","					node.setAttribute(\"stroke-miterlimit\",  Math.max(linejoin, 1));","					node.setAttribute(\"stroke-linejoin\", \"miter\");","				}","			}","		}","		else","		{","			node.setAttribute(\"stroke\", \"none\");","		}","	},","","	/**","	 * Adds a fill to the shape node.","	 *","	 * @method _fillChangeHandler","	 * @private","	 */","	_fillChangeHandler: function(e)","	{","		var node = this.node,","			fill = this.get(\"fill\"),","			fillOpacity,","			type;","		if(fill)","		{","			type = fill.type;","			if(type == \"linear\" || type == \"radial\")","			{","				this._setGradientFill(fill);","				node.setAttribute(\"fill\", \"url(#grad\" + this.get(\"id\") + \")\");","			}","			else if(!fill.color)","			{","				node.setAttribute(\"fill\", \"none\");","			}","			else","			{","                fillOpacity = parseFloat(fill.opacity);","				fillOpacity = Y_LANG.isNumber(fillOpacity) ? fillOpacity : 1;","				node.setAttribute(\"fill\", fill.color);","				node.setAttribute(\"fill-opacity\", fillOpacity);","			}","		}","		else","		{","			node.setAttribute(\"fill\", \"none\");","		}","	},","","	/**","	 * Creates a gradient fill","	 *","	 * @method _setGradientFill","	 * @param {String} type gradient type","	 * @private","	 */","	_setGradientFill: function(fill) {","		var offset,","			opacity,","			color,","			stopNode,","            newStop,","			isNumber = Y_LANG.isNumber,","			graphic = this._graphic,","			type = fill.type,","			gradientNode = graphic.getGradientNode(\"grad\" + this.get(\"id\"), type),","			stops = fill.stops,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			rotation = fill.rotation || 0,","			radCon = Math.PI/180,","            tanRadians = parseFloat(parseFloat(Math.tan(rotation * radCon)).toFixed(8)),","            i,","			len,","			def,","			stop,","			x1 = \"0%\",","			x2 = \"100%\",","			y1 = \"0%\",","			y2 = \"0%\",","			cx = fill.cx,","			cy = fill.cy,","			fx = fill.fx,","			fy = fill.fy,","			r = fill.r,","            stopNodes = [];","		if(type == \"linear\")","		{","            cx = w/2;","            cy = h/2;","            if(Math.abs(tanRadians) * w/2 >= h/2)","            {","                if(rotation < 180)","                {","                    y1 = 0;","                    y2 = h;","                }","                else","                {","                    y1 = h;","                    y2 = 0;","                }","                x1 = cx - ((cy - y1)/tanRadians);","                x2 = cx - ((cy - y2)/tanRadians);","            }","            else","            {","                if(rotation > 90 && rotation < 270)","                {","                    x1 = w;","                    x2 = 0;","                }","                else","                {","                    x1 = 0;","                    x2 = w;","                }","                y1 = ((tanRadians * (cx - x1)) - cy) * -1;","                y2 = ((tanRadians * (cx - x2)) - cy) * -1;","            }","","            x1 = Math.round(100 * x1/w);","            x2 = Math.round(100 * x2/w);","            y1 = Math.round(100 * y1/h);","            y2 = Math.round(100 * y2/h);","","            //Set default value if not valid","            x1 = isNumber(x1) ? x1 : 0;","            x2 = isNumber(x2) ? x2 : 100;","            y1 = isNumber(y1) ? y1 : 0;","            y2 = isNumber(y2) ? y2 : 0;","","            gradientNode.setAttribute(\"spreadMethod\", \"pad\");","			gradientNode.setAttribute(\"width\", w);","			gradientNode.setAttribute(\"height\", h);","            gradientNode.setAttribute(\"x1\", x1 + \"%\");","            gradientNode.setAttribute(\"x2\", x2 + \"%\");","            gradientNode.setAttribute(\"y1\", y1 + \"%\");","            gradientNode.setAttribute(\"y2\", y2 + \"%\");","		}","		else","		{","			gradientNode.setAttribute(\"cx\", (cx * 100) + \"%\");","			gradientNode.setAttribute(\"cy\", (cy * 100) + \"%\");","			gradientNode.setAttribute(\"fx\", (fx * 100) + \"%\");","			gradientNode.setAttribute(\"fy\", (fy * 100) + \"%\");","			gradientNode.setAttribute(\"r\", (r * 100) + \"%\");","		}","","		len = stops.length;","		def = 0;","        for(i = 0; i < len; ++i)","		{","            if(this._stops && this._stops.length > 0)","            {","                stopNode = this._stops.shift();","                newStop = false;","            }","            else","            {","                stopNode = graphic._createGraphicNode(\"stop\");","                newStop = true;","            }","			stop = stops[i];","			opacity = stop.opacity;","			color = stop.color;","			offset = stop.offset || i/(len - 1);","			offset = Math.round(offset * 100) + \"%\";","			opacity = isNumber(opacity) ? opacity : 1;","			opacity = Math.max(0, Math.min(1, opacity));","			def = (i + 1) / len;","			stopNode.setAttribute(\"offset\", offset);","			stopNode.setAttribute(\"stop-color\", color);","			stopNode.setAttribute(\"stop-opacity\", opacity);","			if(newStop)","            {","                gradientNode.appendChild(stopNode);","            }","            stopNodes.push(stopNode);","		}","        while(this._stops && this._stops.length > 0)","        {","            gradientNode.removeChild(this._stops.shift());","        }","        this._stops = stopNodes;","	},","","    _stops: null,","","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function()","	{","		var host = this;","		AttributeLite.prototype.set.apply(host, arguments);","		if(host.initialized)","		{","			host._updateHandler();","		}","	},","","	/**","	 * Specifies a 2d translation.","	 *","	 * @method translate","	 * @param {Number} x The value to transate on the x-axis.","	 * @param {Number} y The value to translate on the y-axis.","	 */","	translate: function(x, y)","	{","		this._addTransform(\"translate\", arguments);","	},","","	/**","	 * Translates the shape along the x-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateX","	 * @param {Number} x The value to translate.","	 */","	translateX: function(x)","    {","        this._addTransform(\"translateX\", arguments);","    },","","	/**","	 * Translates the shape along the y-axis. When translating x and y coordinates,","	 * use the `translate` method.","	 *","	 * @method translateY","	 * @param {Number} y The value to translate.","	 */","	translateY: function(y)","    {","        this._addTransform(\"translateY\", arguments);","    },","","    /**","     * Skews the shape around the x-axis and y-axis.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y)","    {","        this._addTransform(\"skew\", arguments);","    },","","	/**","	 * Skews the shape around the x-axis.","	 *","	 * @method skewX","	 * @param {Number} x x-coordinate","	 */","    skewX: function(x)","    {","        this._addTransform(\"skewX\", arguments);","    },","","	/**","	 * Skews the shape around the y-axis.","	 *","	 * @method skewY","	 * @param {Number} y y-coordinate","	 */","    skewY: function(y)","    {","        this._addTransform(\"skewY\", arguments);","    },","","	/**","	 * Rotates the shape clockwise around it transformOrigin.","	 *","	 * @method rotate","	 * @param {Number} deg The degree of the rotation.","	 */","    rotate: function(deg)","    {","        this._addTransform(\"rotate\", arguments);","    },","","	/**","	 * Specifies a 2d scaling operation.","	 *","	 * @method scale","	 * @param {Number} val","	 */","    scale: function(x, y)","    {","        this._addTransform(\"scale\", arguments);","    },","","    /**","     * Adds a transform to the shape.","     *","     * @method _addTransform","     * @param {String} type The transform being applied.","     * @param {Array} args The arguments for the transform.","	 * @private","	 */","	_addTransform: function(type, args)","	{","        args = Y.Array(args);","        this._transform = Y_LANG.trim(this._transform + \" \" + type + \"(\" + args.join(\", \") + \")\");","        args.unshift(type);","        this._transforms.push(args);","        if(this.initialized)","        {","            this._updateTransform();","        }","	},","","	/**","     * Applies all transforms.","     *","     * @method _updateTransform","	 * @private","	 */","	_updateTransform: function()","	{","		var isPath = this._type == \"path\",","		    node = this.node,","			key,","			transform,","			transformOrigin,","			x,","			y,","            tx,","            ty,","            matrix = this.matrix,","            normalizedMatrix = this._normalizedMatrix,","            i,","            len = this._transforms.length;","","        if(isPath || (this._transforms && this._transforms.length > 0))","		{","            x = this._x;","            y = this._y;","            transformOrigin = this.get(\"transformOrigin\");","            tx = x + (transformOrigin[0] * this.get(\"width\"));","            ty = y + (transformOrigin[1] * this.get(\"height\"));","            //need to use translate for x/y coords","            if(isPath)","            {","                //adjust origin for custom shapes","                if(!(this instanceof Y.SVGPath))","                {","                    tx = this._left + (transformOrigin[0] * this.get(\"width\"));","                    ty = this._top + (transformOrigin[1] * this.get(\"height\"));","                }","                normalizedMatrix.init({dx: x + this._left, dy: y + this._top});","            }","            normalizedMatrix.translate(tx, ty);","            for(i = 0; i < len; ++i)","            {","                key = this._transforms[i].shift();","                if(key)","                {","                    normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]);","                    matrix[key].apply(matrix, this._transforms[i]);","                }","                if(isPath)","                {","                    this._transforms[i].unshift(key);","                }","			}","            normalizedMatrix.translate(-tx, -ty);","            transform = \"matrix(\" + normalizedMatrix.a + \",\" +","                            normalizedMatrix.b + \",\" +","                            normalizedMatrix.c + \",\" +","                            normalizedMatrix.d + \",\" +","                            normalizedMatrix.dx + \",\" +","                            normalizedMatrix.dy + \")\";","		}","        this._graphic.addToRedrawQueue(this);","        if(transform)","		{","            node.setAttribute(\"transform\", transform);","        }","        if(!isPath)","        {","            this._transforms = [];","        }","	},","","	/**","	 * Draws the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var node = this.node;","		node.setAttribute(\"width\", this.get(\"width\"));","		node.setAttribute(\"height\", this.get(\"height\"));","		node.setAttribute(\"x\", this._x);","		node.setAttribute(\"y\", this._y);","		node.style.left = this._x + \"px\";","		node.style.top = this._y + \"px\";","		this._fillChangeHandler();","		this._strokeChangeHandler();","		this._updateTransform();","	},","","	/**","     * Updates `Shape` based on attribute changes.","     *","     * @method _updateHandler","	 * @private","	 */","	_updateHandler: function(e)","	{","		this._draw();","	},","","    /**","     * Storage for the transform attribute.","     *","     * @property _transform","     * @type String","     * @private","     */","    _transform: \"\",","","	/**","	 * Returns the bounds for a shape.","	 *","     * Calculates the a new bounding box from the original corner coordinates (base on size and position) and the transform matrix.","     * The calculated bounding box is used by the graphic instance to calculate its viewBox.","     *","	 * @method getBounds","	 * @return Object","	 */","	getBounds: function()","	{","		var type = this._type,","			stroke = this.get(\"stroke\"),","            w = this.get(\"width\"),","			h = this.get(\"height\"),","			x = type == \"path\" ? 0 : this._x,","			y = type == \"path\" ? 0 : this._y,","            wt = 0;","        if(type != \"path\")","        {","            if(stroke && stroke.weight)","            {","                wt = stroke.weight;","            }","            w = (x + w + wt) - (x - wt);","            h = (y + h + wt) - (y - wt);","            x -= wt;","            y -= wt;","        }","		return this._normalizedMatrix.getContentRect(w, h, x, y);","	},","","    /**","     * Places the shape above all other shapes.","     *","     * @method toFront","     */","    toFront: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toFront(this);","        }","    },","","    /**","     * Places the shape underneath all other shapes.","     *","     * @method toFront","     */","    toBack: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic._toBack(this);","        }","    },","","    /**","     * Parses path data string and call mapped methods.","     *","     * @method _parsePathData","     * @param {String} val The path data","     * @private","     */","    _parsePathData: function(val)","    {","        var method,","            methodSymbol,","            args,","            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),","            i,","            len,","            str,","            symbolToMethod = this._pathSymbolToMethod;","        if(commandArray)","        {","            this.clear();","            len = commandArray.length || 0;","            for(i = 0; i < len; i = i + 1)","            {","                str = commandArray[i];","                methodSymbol = str.substr(0, 1);","                args = str.substr(1).match(SPLITARGSPATTERN);","                method = symbolToMethod[methodSymbol];","                if(method)","                {","                    if(args)","                    {","                        this[method].apply(this, args);","                    }","                    else","                    {","                        this[method].apply(this);","                    }","                }","            }","            this.end();","        }","    },","","    /**","     * Destroys the shape instance.","     *","     * @method destroy","     */","    destroy: function()","    {","        var graphic = this.get(\"graphic\");","        if(graphic)","        {","            graphic.removeShape(this);","        }","        else","        {","            this._destroy();","        }","    },","","    /**","     *  Implementation for shape destruction","     *","     *  @method destroy","     *  @protected","     */","    _destroy: function()","    {","        if(this.node)","        {","            Y.Event.purgeElement(this.node, true);","            if(this.node.parentNode)","            {","                this.node.parentNode.removeChild(this.node);","            }","            this.node = null;","        }","    }"," }, Y.SVGDrawing.prototype));","","SVGShape.ATTRS = {","	/**","	 * An array of x, y values which indicates the transformOrigin in which to rotate the shape. Valid values range between 0 and 1 representing a","	 * fraction of the shape's corresponding bounding box dimension. The default value is [0.5, 0.5].","	 *","	 * @config transformOrigin","	 * @type Array","	 */","	transformOrigin: {","		valueFn: function()","		{","			return [0.5, 0.5];","		}","	},","","    /**","     * <p>A string containing, in order, transform operations applied to the shape instance. The `transform` string can contain the following values:","     *","     *    <dl>","     *        <dt>rotate</dt><dd>Rotates the shape clockwise around it transformOrigin.</dd>","     *        <dt>translate</dt><dd>Specifies a 2d translation.</dd>","     *        <dt>skew</dt><dd>Skews the shape around the x-axis and y-axis.</dd>","     *        <dt>scale</dt><dd>Specifies a 2d scaling operation.</dd>","     *        <dt>translateX</dt><dd>Translates the shape along the x-axis.</dd>","     *        <dt>translateY</dt><dd>Translates the shape along the y-axis.</dd>","     *        <dt>skewX</dt><dd>Skews the shape around the x-axis.</dd>","     *        <dt>skewY</dt><dd>Skews the shape around the y-axis.</dd>","     *        <dt>matrix</dt><dd>Specifies a 2D transformation matrix comprised of the specified six values.</dd>","     *    </dl>","     * </p>","     * <p>Applying transforms through the transform attribute will reset the transform matrix and apply a new transform. The shape class also contains","     * corresponding methods for each transform that will apply the transform to the current matrix. The below code illustrates how you might use the","     * `transform` attribute to instantiate a recangle with a rotation of 45 degrees.</p>","            var myRect = new Y.Rect({","                type:\"rect\",","                width: 50,","                height: 40,","                transform: \"rotate(45)\"","            };","     * <p>The code below would apply `translate` and `rotate` to an existing shape.</p>","","        myRect.set(\"transform\", \"translate(40, 50) rotate(45)\");","	 * @config transform","     * @type String","	 */","	transform: {","		setter: function(val)","        {","            this.matrix.init();","            this._normalizedMatrix.init();","            this._transforms = this.matrix.getTransformArray(val);","            this._transform = val;","            return val;","		},","","        getter: function()","        {","            return this._transform;","        }","	},","","	/**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","	/**","	 * Indicates the x position of shape.","	 *","	 * @config x","	 * @type Number","	 */","	x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            var transform = this.get(\"transform\");","            this._x = val;","            if(transform)","            {","                this.set(\"transform\", transform);","            }","        }","	},","","	/**","	 * Indicates the y position of shape.","	 *","	 * @config y","	 * @type Number","	 */","	y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            var transform = this.get(\"transform\");","            this._y = val;","            if(transform)","            {","                this.set(\"transform\", transform);","            }","        }","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","        value: 0","    },","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","        value: 0","    },","","	/**","	 * Indicates whether the shape is visible.","	 *","	 * @config visible","	 * @type Boolean","	 */","	visible: {","		value: true,","","		setter: function(val){","			var visibility = val ? \"visible\" : \"hidden\";","			if(this.node)","            {","                this.node.style.visibility = visibility;","            }","			return val;","		}","	},","","	/**","	 * Contains information about the fill of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the fill.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the fill. The default value is 1.</dd>","     *      <dt>type</dt><dd>Type of fill.","     *          <dl>","     *              <dt>solid</dt><dd>Solid single color fill. (default)</dd>","     *              <dt>linear</dt><dd>Linear gradient fill.</dd>","     *              <dt>radial</dt><dd>Radial gradient fill.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","     *  <p>If a `linear` or `radial` is specified as the fill type. The following additional property is used:","     *  <dl>","     *      <dt>stops</dt><dd>An array of objects containing the following properties:","     *          <dl>","     *              <dt>color</dt><dd>The color of the stop.</dd>","     *              <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stop. The default value is 1.","     *              Note: No effect for IE 6 - 8</dd>","     *              <dt>offset</dt><dd>Number between 0 and 1 indicating where the color stop is positioned.</dd>","     *          </dl>","     *      </dd>","     *      <p>Linear gradients also have the following property:</p>","     *      <dt>rotation</dt><dd>Linear gradients flow left to right by default. The rotation property allows you to change the","     *      flow by rotation. (e.g. A rotation of 180 would make the gradient pain from right to left.)</dd>","     *      <p>Radial gradients have the following additional properties:</p>","     *      <dt>r</dt><dd>Radius of the gradient circle.</dd>","     *      <dt>fx</dt><dd>Focal point x-coordinate of the gradient.</dd>","     *      <dt>fy</dt><dd>Focal point y-coordinate of the gradient.</dd>","     *      <dt>cx</dt><dd>","     *          <p>The x-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and","     *          `VMLShape` classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *      <dt>cy</dt><dd>","     *          <p>The y-coordinate of the center of the gradient circle. Determines where the color stop begins. The default value 0.5.</p>","     *          <p><strong>Note: </strong>Currently, this property is not implemented for corresponding `CanvasShape` and `VMLShape`","     *          classes which are used on Android or IE 6 - 8.</p>","     *      </dd>","     *  </dl>","	 *","	 * @config fill","	 * @type Object","	 */","	fill: {","		valueFn: \"_getDefaultFill\",","","		setter: function(val)","		{","			var fill,","				tmpl = this.get(\"fill\") || this._getDefaultFill();","			fill = (val) ? Y.merge(tmpl, val) : null;","			if(fill && fill.color)","			{","				if(fill.color === undefined || fill.color == \"none\")","				{","					fill.color = null;","				}","			}","			return fill;","		}","	},","","	/**","	 * Contains information about the stroke of the shape.","     *  <dl>","     *      <dt>color</dt><dd>The color of the stroke.</dd>","     *      <dt>weight</dt><dd>Number that indicates the width of the stroke.</dd>","     *      <dt>opacity</dt><dd>Number between 0 and 1 that indicates the opacity of the stroke. The default value is 1.</dd>","     *      <dt>dashstyle</dt>Indicates whether to draw a dashed stroke. When set to \"none\", a solid stroke is drawn. When set","     *      to an array, the first index indicates the length of the dash. The second index indicates the length of gap.","     *      <dt>linecap</dt><dd>Specifies the linecap for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>butt (default)</dt><dd>Specifies a butt linecap.</dd>","     *              <dt>square</dt><dd>Specifies a sqare linecap.</dd>","     *              <dt>round</dt><dd>Specifies a round linecap.</dd>","     *          </dl>","     *      </dd>","     *      <dt>linejoin</dt><dd>Specifies a linejoin for the stroke. The following values can be specified:","     *          <dl>","     *              <dt>round (default)</dt><dd>Specifies that the linejoin will be round.</dd>","     *              <dt>bevel</dt><dd>Specifies a bevel for the linejoin.</dd>","     *              <dt>miter limit</dt><dd>An integer specifying the miter limit of a miter linejoin. If you want to specify a linejoin","     *              of miter, you simply specify the limit as opposed to having separate miter and miter limit values.</dd>","     *          </dl>","     *      </dd>","     *  </dl>","	 *","	 * @config stroke","	 * @type Object","	 */","	stroke: {","		valueFn: \"_getDefaultStroke\",","","		setter: function(val)","		{","			var tmpl = this.get(\"stroke\") || this._getDefaultStroke(),","                wt;","            if(val && val.hasOwnProperty(\"weight\"))","            {","                wt = parseInt(val.weight, 10);","                if(!isNaN(wt))","                {","                    val.weight = wt;","                }","            }","            return (val) ? Y.merge(tmpl, val) : null;","		}","	},","","	// Only implemented in SVG","	// Determines whether the instance will receive mouse events.","	//","	// @config pointerEvents","	// @type string","	//","	pointerEvents: {","		valueFn: function()","		{","			var val = \"visiblePainted\",","				node = this.node;","			if(node)","			{","				node.setAttribute(\"pointer-events\", val);","			}","			return val;","		},","","		setter: function(val)","		{","			var node = this.node;","			if(node)","			{","				node.setAttribute(\"pointer-events\", val);","			}","			return val;","		}","	},","","	/**","	 * Dom node for the shape.","	 *","	 * @config node","	 * @type HTMLElement","	 * @readOnly","	 */","	node: {","		readOnly: true,","","        getter: function()","        {","            return this.node;","        }","	},","","    /**","     * Represents an SVG Path string. This will be parsed and added to shape's API to represent the SVG data across all","     * implementations. Note that when using VML or SVG implementations, part of this content will be added to the DOM using","     * respective VML/SVG attributes. If your content comes from an untrusted source, you will need to ensure that no","     * malicious code is included in that content.","     *","     * @config data","     * @type String","     */","    data: {","        setter: function(val)","        {","            if(this.get(\"node\"))","            {","                this._parsePathData(val);","            }","            return val;","        }","    },","","	/**","	 * Reference to the parent graphic instance","	 *","	 * @config graphic","	 * @type SVGGraphic","	 * @readOnly","	 */","	graphic: {","		readOnly: true,","","        getter: function()","        {","            return this._graphic;","        }","	}","};","Y.SVGShape = SVGShape;","","/**"," * <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> implementation of the <a href=\"Path.html\">`Path`</a> class."," * `SVGPath` is not intended to be used directly. Instead, use the <a href=\"Path.html\">`Path`</a> class."," * If the browser has <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities, the <a href=\"Path.html\">`Path`</a>"," * class will point to the `SVGPath` class."," *"," * @module graphics"," * @class SVGPath"," * @extends SVGShape"," * @constructor"," */","SVGPath = function(cfg)","{","	SVGPath.superclass.constructor.apply(this, arguments);","};","SVGPath.NAME = \"path\";","Y.extend(SVGPath, Y.SVGShape, {","    /**","     * Left edge of the path","     *","     * @property _left","     * @type Number","     * @private","     */","    _left: 0,","","    /**","     * Right edge of the path","     *","     * @property _right","     * @type Number","     * @private","     */","    _right: 0,","","    /**","     * Top edge of the path","     *","     * @property _top","     * @type Number","     * @private","     */","    _top: 0,","","    /**","     * Bottom edge of the path","     *","     * @property _bottom","     * @type Number","     * @private","     */","    _bottom: 0,","","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @readOnly","     * @type String","     * @private","     */","    _type: \"path\",","","    /**","     * Storage for path","     *","     * @property _path","     * @type String","     * @private","     */","	_path: \"\"","});","","SVGPath.ATTRS = Y.merge(Y.SVGShape.ATTRS, {","	/**","	 * Indicates the path used for the node.","	 *","	 * @config path","	 * @type String","     * @readOnly","	 */","	path: {","		readOnly: true,","","		getter: function()","		{","			return this._path;","		}","	},","","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","	width: {","		getter: function()","		{","			var val = Math.max(this._right - this._left, 0);","			return val;","		}","	},","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","	height: {","		getter: function()","		{","			return Math.max(this._bottom - this._top, 0);","		}","	}","});","Y.SVGPath = SVGPath;","/**"," * <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> implementation of the <a href=\"Rect.html\">`Rect`</a> class."," * `SVGRect` is not intended to be used directly. Instead, use the <a href=\"Rect.html\">`Rect`</a> class."," * If the browser has <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities, the <a href=\"Rect.html\">`Rect`</a>"," * class will point to the `SVGRect` class."," *"," * @module graphics"," * @class SVGRect"," * @constructor"," */","SVGRect = function()","{","	SVGRect.superclass.constructor.apply(this, arguments);","};","SVGRect.NAME = \"rect\";","Y.extend(SVGRect, Y.SVGShape, {","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"rect\""," });","SVGRect.ATTRS = Y.SVGShape.ATTRS;","Y.SVGRect = SVGRect;","/**"," * <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> implementation of the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * `SVGEllipse` is not intended to be used directly. Instead, use the <a href=\"Ellipse.html\">`Ellipse`</a> class."," * If the browser has <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities, the <a href=\"Ellipse.html\">`Ellipse`</a>"," * class will point to the `SVGEllipse` class."," *"," * @module graphics"," * @class SVGEllipse"," * @constructor"," */","SVGEllipse = function(cfg)","{","	SVGEllipse.superclass.constructor.apply(this, arguments);","};","","SVGEllipse.NAME = \"ellipse\";","","Y.extend(SVGEllipse, SVGShape, {","	/**","	 * Indicates the type of shape","	 *","	 * @property _type","	 * @type String","     * @private","	 */","	_type: \"ellipse\",","","	/**","	 * Updates the shape.","	 *","	 * @method _draw","	 * @private","	 */","	_draw: function()","	{","		var node = this.node,","			w = this.get(\"width\"),","			h = this.get(\"height\"),","			x = this.get(\"x\"),","			y = this.get(\"y\"),","			xRadius = w * 0.5,","			yRadius = h * 0.5,","			cx = x + xRadius,","			cy = y + yRadius;","		node.setAttribute(\"rx\", xRadius);","		node.setAttribute(\"ry\", yRadius);","		node.setAttribute(\"cx\", cx);","		node.setAttribute(\"cy\", cy);","		this._fillChangeHandler();","		this._strokeChangeHandler();","		this._updateTransform();","	}","});","","SVGEllipse.ATTRS = Y.merge(SVGShape.ATTRS, {","	/**","	 * Horizontal radius for the ellipse.","	 *","	 * @config xRadius","	 * @type Number","	 */","	xRadius: {","		setter: function(val)","		{","			this.set(\"width\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"width\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	},","","	/**","	 * Vertical radius for the ellipse.","	 *","	 * @config yRadius","	 * @type Number","	 * @readOnly","	 */","	yRadius: {","		setter: function(val)","		{","			this.set(\"height\", val * 2);","		},","","		getter: function()","		{","			var val = this.get(\"height\");","			if(val)","			{","				val *= 0.5;","			}","			return val;","		}","	}","});","Y.SVGEllipse = SVGEllipse;","/**"," * <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> implementation of the <a href=\"Circle.html\">`Circle`</a> class."," * `SVGCircle` is not intended to be used directly. Instead, use the <a href=\"Circle.html\">`Circle`</a> class."," * If the browser has <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities, the <a href=\"Circle.html\">`Circle`</a>"," * class will point to the `SVGCircle` class."," *"," * @module graphics"," * @class SVGCircle"," * @constructor"," */"," SVGCircle = function(cfg)"," {","    SVGCircle.superclass.constructor.apply(this, arguments);"," };",""," SVGCircle.NAME = \"circle\";",""," Y.extend(SVGCircle, Y.SVGShape, {","","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"circle\",","","    /**","     * Updates the shape.","     *","     * @method _draw","     * @private","     */","    _draw: function()","    {","        var node = this.node,","            x = this.get(\"x\"),","            y = this.get(\"y\"),","            radius = this.get(\"radius\"),","            cx = x + radius,","            cy = y + radius;","        node.setAttribute(\"r\", radius);","        node.setAttribute(\"cx\", cx);","        node.setAttribute(\"cy\", cy);","        this._fillChangeHandler();","        this._strokeChangeHandler();","        this._updateTransform();","    }"," });","","SVGCircle.ATTRS = Y.merge(Y.SVGShape.ATTRS, {","	/**","	 * Indicates the width of the shape","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","        getter: function()","        {","            return this.get(\"radius\") * 2;","        }","    },","","	/**","	 * Indicates the height of the shape","	 *","	 * @config height","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            this.set(\"radius\", val/2);","            return val;","        },","","        getter: function()","        {","            return this.get(\"radius\") * 2;","        }","    },","","    /**","     * Radius of the circle","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","});","Y.SVGCircle = SVGCircle;","/**"," * Draws pie slices"," *"," * @module graphics"," * @class SVGPieSlice"," * @constructor"," */","SVGPieSlice = function()","{","	SVGPieSlice.superclass.constructor.apply(this, arguments);","};","SVGPieSlice.NAME = \"svgPieSlice\";","Y.extend(SVGPieSlice, Y.SVGShape, Y.mix({","    /**","     * Indicates the type of shape","     *","     * @property _type","     * @type String","     * @private","     */","    _type: \"path\",","","	/**","	 * Change event listener","	 *","	 * @private","	 * @method _updateHandler","	 */","	_draw: function(e)","	{","        var x = this.get(\"cx\"),","            y = this.get(\"cy\"),","            startAngle = this.get(\"startAngle\"),","            arc = this.get(\"arc\"),","            radius = this.get(\"radius\");","        this.clear();","        this.drawWedge(x, y, startAngle, arc, radius);","		this.end();","	}"," }, Y.SVGDrawing.prototype));","SVGPieSlice.ATTRS = Y.mix({","    cx: {","        value: 0","    },","","    cy: {","        value: 0","    },","    /**","     * Starting angle in relation to a circle in which to begin the pie slice drawing.","     *","     * @config startAngle","     * @type Number","     */","    startAngle: {","        value: 0","    },","","    /**","     * Arc of the slice.","     *","     * @config arc","     * @type Number","     */","    arc: {","        value: 0","    },","","    /**","     * Radius of the circle in which the pie slice is drawn","     *","     * @config radius","     * @type Number","     */","    radius: {","        value: 0","    }","}, Y.SVGShape.ATTRS);","Y.SVGPieSlice = SVGPieSlice;","/**"," * <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> implementation of the <a href=\"Graphic.html\">`Graphic`</a> class."," * `SVGGraphic` is not intended to be used directly. Instead, use the <a href=\"Graphic.html\">`Graphic`</a> class."," * If the browser has <a href=\"http://www.w3.org/TR/SVG/\">SVG</a> capabilities, the <a href=\"Graphic.html\">`Graphic`</a>"," * class will point to the `SVGGraphic` class."," *"," * @module graphics"," * @class SVGGraphic"," * @constructor"," */","SVGGraphic = function(cfg) {","    SVGGraphic.superclass.constructor.apply(this, arguments);","};","","SVGGraphic.NAME = \"svgGraphic\";","","SVGGraphic.ATTRS = {","    /**","     * Whether or not to render the `Graphic` automatically after to a specified parent node after init. This can be a Node","     * instance or a CSS selector string.","     *","     * @config render","     * @type Node | String","     */","    render: {},","","    /**","	 * Unique id for class instance.","	 *","	 * @config id","	 * @type String","	 */","	id: {","		valueFn: function()","		{","			return Y.guid();","		},","","		setter: function(val)","		{","			var node = this._node;","			if(node)","			{","				node.setAttribute(\"id\", val);","			}","			return val;","		}","	},","","    /**","     * Key value pairs in which a shape instance is associated with its id.","     *","     *  @config shapes","     *  @type Object","     *  @readOnly","     */","    shapes: {","        readOnly: true,","","        getter: function()","        {","            return this._shapes;","        }","    },","","    /**","     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.","     *","     *  @config contentBounds","     *  @type Object","     *  @readOnly","     */","    contentBounds: {","        readOnly: true,","","        getter: function()","        {","            return this._contentBounds;","        }","    },","","    /**","     *  The html element that represents to coordinate system of the Graphic instance.","     *","     *  @config node","     *  @type HTMLElement","     *  @readOnly","     */","    node: {","        readOnly: true,","","        getter: function()","        {","            return this._node;","        }","    },","","	/**","	 * Indicates the width of the `Graphic`.","	 *","	 * @config width","	 * @type Number","	 */","    width: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.width = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the height of the `Graphic`.","	 *","	 * @config height","	 * @type Number","	 */","    height: {","        setter: function(val)","        {","            if(this._node)","            {","                this._node.style.height = val  + \"px\";","            }","            return val;","        }","    },","","    /**","     *  Determines the sizing of the Graphic.","     *","     *  <dl>","     *      <dt>sizeContentToGraphic</dt><dd>The Graphic's width and height attributes are, either explicitly set through the","     *      <code>width</code> and <code>height</code> attributes or are determined by the dimensions of the parent element. The","     *      content contained in the Graphic will be sized to fit with in the Graphic instance's dimensions. When using this","     *      setting, the <code>preserveAspectRatio</code> attribute will determine how the contents are sized.</dd>","     *      <dt>sizeGraphicToContent</dt><dd>(Also accepts a value of true) The Graphic's width and height are determined by the","     *      size and positioning of the content.</dd>","     *      <dt>false</dt><dd>The Graphic's width and height attributes are, either explicitly set through the <code>width</code>","     *      and <code>height</code> attributes or are determined by the dimensions of the parent element. The contents of the","     *      Graphic instance are not affected by this setting.</dd>","     *  </dl>","     *","     *","     *  @config autoSize","     *  @type Boolean | String","     *  @default false","     */","    autoSize: {","        value: false","    },","","    /**","     * Determines how content is sized when <code>autoSize</code> is set to <code>sizeContentToGraphic</code>.","     *","     *  <dl>","     *      <dt>none<dt><dd>Do not force uniform scaling. Scale the graphic content of the given element non-uniformly if necessary","     *      such that the element's bounding box exactly matches the viewport rectangle.</dd>","     *      <dt>xMinYMin</dt><dd>Force uniform scaling position along the top left of the Graphic's node.</dd>","     *      <dt>xMidYMin</dt><dd>Force uniform scaling horizontally centered and positioned at the top of the Graphic's node.<dd>","     *      <dt>xMaxYMin</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the top.</dd>","     *      <dt>xMinYMid</dt>Force uniform scaling positioned horizontally from the left and vertically centered.</dd>","     *      <dt>xMidYMid (the default)</dt><dd>Force uniform scaling with the content centered.</dd>","     *      <dt>xMaxYMid</dt><dd>Force uniform scaling positioned horizontally from the right and vertically centered.</dd>","     *      <dt>xMinYMax</dt><dd>Force uniform scaling positioned horizontally from the left and vertically from the bottom.</dd>","     *      <dt>xMidYMax</dt><dd>Force uniform scaling horizontally centered and position vertically from the bottom.</dd>","     *      <dt>xMaxYMax</dt><dd>Force uniform scaling positioned horizontally from the right and vertically from the bottom.</dd>","     *  </dl>","     *","     * @config preserveAspectRatio","     * @type String","     * @default xMidYMid","     */","    preserveAspectRatio: {","        value: \"xMidYMid\"","    },","","    /**","     * The contentBounds will resize to greater values but not to smaller values. (for performance)","     * When resizing the contentBounds down is desirable, set the resizeDown value to true.","     *","     * @config resizeDown","     * @type Boolean","     */","    resizeDown: {","        value: false","    },","","	/**","	 * Indicates the x-coordinate for the instance.","	 *","	 * @config x","	 * @type Number","	 */","    x: {","        getter: function()","        {","            return this._x;","        },","","        setter: function(val)","        {","            this._x = val;","            if(this._node)","            {","                this._node.style.left = val + \"px\";","            }","            return val;","        }","    },","","	/**","	 * Indicates the y-coordinate for the instance.","	 *","	 * @config y","	 * @type Number","	 */","    y: {","        getter: function()","        {","            return this._y;","        },","","        setter: function(val)","        {","            this._y = val;","            if(this._node)","            {","                this._node.style.top = val + \"px\";","            }","            return val;","        }","    },","","    /**","     * Indicates whether or not the instance will automatically redraw after a change is made to a shape.","     * This property will get set to false when batching operations.","     *","     * @config autoDraw","     * @type Boolean","     * @default true","     * @private","     */","    autoDraw: {","        value: true","    },","","    visible: {","        value: true,","","        setter: function(val)","        {","            this._toggleVisible(val);","            return val;","        }","    },","","    //","    //  Indicates the pointer-events setting for the svg:svg element.","    //","    //  @config pointerEvents","    //  @type String","    //","    pointerEvents: {","        value: \"none\"","    }","};","","Y.extend(SVGGraphic, Y.GraphicBase, {","    /**","     * Sets the value of an attribute.","     *","     * @method set","     * @param {String|Object} name The name of the attribute. Alternatively, an object of key value pairs can","     * be passed in to set multiple attributes at once.","     * @param {Any} value The value to set the attribute to. This value is ignored if an object is received as","     * the name param.","     */","	set: function(attr, value)","	{","		var host = this,","            redrawAttrs = {","                autoDraw: true,","                autoSize: true,","                preserveAspectRatio: true,","                resizeDown: true","            },","            key,","            forceRedraw = false;","		AttributeLite.prototype.set.apply(host, arguments);","        if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)","        {","            if(Y_LANG.isString && redrawAttrs[attr])","            {","                forceRedraw = true;","            }","            else if(Y_LANG.isObject(attr))","            {","                for(key in redrawAttrs)","                {","                    if(redrawAttrs.hasOwnProperty(key) && attr[key])","                    {","                        forceRedraw = true;","                        break;","                    }","                }","            }","        }","        if(forceRedraw)","        {","            host._redraw();","        }","	},","","    /**","     * Storage for `x` attribute.","     *","     * @property _x","     * @type Number","     * @private","     */","    _x: 0,","","    /**","     * Storage for `y` attribute.","     *","     * @property _y","     * @type Number","     * @private","     */","    _y: 0,","","    /**","     * Gets the current position of the graphic instance in page coordinates.","     *","     * @method getXY","     * @return Array The XY position of the shape.","     */","    getXY: function()","    {","        var node = Y.one(this._node),","            xy;","        if(node)","        {","            xy = node.getXY();","        }","        return xy;","    },","","    /**","     * Initializes the class.","     *","     * @method initializer","     * @private","     */","    initializer: function() {","        var render = this.get(\"render\"),","            visibility = this.get(\"visible\") ? \"visible\" : \"hidden\";","        this._shapes = {};","		this._contentBounds = {","            left: 0,","            top: 0,","            right: 0,","            bottom: 0","        };","        this._gradients = {};","        this._node = DOCUMENT.createElement('div');","        this._node.style.position = \"absolute\";","        this._node.style.left = this.get(\"x\") + \"px\";","        this._node.style.top = this.get(\"y\") + \"px\";","        this._node.style.visibility = visibility;","        this._contentNode = this._createGraphics();","        this._contentNode.style.visibility = visibility;","        this._contentNode.setAttribute(\"id\", this.get(\"id\"));","        this._node.appendChild(this._contentNode);","        if(render)","        {","            this.render(render);","        }","    },","","    /**","     * Adds the graphics node to the dom.","     *","     * @method render","     * @param {HTMLElement} parentNode node in which to render the graphics node into.","     */","    render: function(render) {","        var parentNode = Y.one(render),","            w = this.get(\"width\") || parseInt(parentNode.getComputedStyle(\"width\"), 10),","            h = this.get(\"height\") || parseInt(parentNode.getComputedStyle(\"height\"), 10);","        parentNode = parentNode || Y.one(DOCUMENT.body);","        parentNode.append(this._node);","        this.parentNode = parentNode;","        this.set(\"width\", w);","        this.set(\"height\", h);","        return this;","    },","","    /**","     * Removes all nodes.","     *","     * @method destroy","     */","    destroy: function()","    {","        this.removeAllShapes();","        if(this._contentNode)","        {","            this._removeChildren(this._contentNode);","            if(this._contentNode.parentNode)","            {","                this._contentNode.parentNode.removeChild(this._contentNode);","            }","            this._contentNode = null;","        }","        if(this._node)","        {","            this._removeChildren(this._node);","            Y.one(this._node).remove(true);","            this._node = null;","        }","    },","","    /**","     * Generates a shape instance by type.","     *","     * @method addShape","     * @param {Object} cfg attributes for the shape","     * @return Shape","     */","    addShape: function(cfg)","    {","        cfg.graphic = this;","        if(!this.get(\"visible\"))","        {","            cfg.visible = false;","        }","        var shapeClass = this._getShapeClass(cfg.type),","            shape = new shapeClass(cfg);","        this._appendShape(shape);","        return shape;","    },","","    /**","     * Adds a shape instance to the graphic instance.","     *","     * @method _appendShape","     * @param {Shape} shape The shape instance to be added to the graphic.","     * @private","     */","    _appendShape: function(shape)","    {","        var node = shape.node,","            parentNode = this._frag || this._contentNode;","        if(this.get(\"autoDraw\"))","        {","            parentNode.appendChild(node);","        }","        else","        {","            this._getDocFrag().appendChild(node);","        }","    },","","    /**","     * Removes a shape instance from from the graphic instance.","     *","     * @method removeShape","     * @param {Shape|String} shape The instance or id of the shape to be removed.","     */","    removeShape: function(shape)","    {","        if(!(shape instanceof SVGShape))","        {","            if(Y_LANG.isString(shape))","            {","                shape = this._shapes[shape];","            }","        }","        if(shape && shape instanceof SVGShape)","        {","            shape._destroy();","            delete this._shapes[shape.get(\"id\")];","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","        return shape;","    },","","    /**","     * Removes all shape instances from the dom.","     *","     * @method removeAllShapes","     */","    removeAllShapes: function()","    {","        var shapes = this._shapes,","            i;","        for(i in shapes)","        {","            if(shapes.hasOwnProperty(i))","            {","                shapes[i]._destroy();","            }","        }","        this._shapes = {};","    },","","    /**","     * Removes all child nodes.","     *","     * @method _removeChildren","     * @param {HTMLElement} node","     * @private","     */","    _removeChildren: function(node)","    {","        if(node.hasChildNodes())","        {","            var child;","            while(node.firstChild)","            {","                child = node.firstChild;","                this._removeChildren(child);","                node.removeChild(child);","            }","        }","    },","","    /**","     * Clears the graphics object.","     *","     * @method clear","     */","    clear: function() {","        this.removeAllShapes();","    },","","    /**","     * Toggles visibility","     *","     * @method _toggleVisible","     * @param {Boolean} val indicates visibilitye","     * @private","     */","    _toggleVisible: function(val)","    {","        var i,","            shapes = this._shapes,","            visibility = val ? \"visible\" : \"hidden\";","        if(shapes)","        {","            for(i in shapes)","            {","                if(shapes.hasOwnProperty(i))","                {","                    shapes[i].set(\"visible\", val);","                }","            }","        }","        if(this._contentNode)","        {","            this._contentNode.style.visibility = visibility;","        }","        if(this._node)","        {","            this._node.style.visibility = visibility;","        }","    },","","    /**","     * Returns a shape class. Used by `addShape`.","     *","     * @method _getShapeClass","     * @param {Shape | String} val Indicates which shape class.","     * @return Function","     * @private","     */","    _getShapeClass: function(val)","    {","        var shape = this._shapeClass[val];","        if(shape)","        {","            return shape;","        }","        return val;","    },","","    /**","     * Look up for shape classes. Used by `addShape` to retrieve a class for instantiation.","     *","     * @property _shapeClass","     * @type Object","     * @private","     */","    _shapeClass: {","        circle: Y.SVGCircle,","        rect: Y.SVGRect,","        path: Y.SVGPath,","        ellipse: Y.SVGEllipse,","        pieslice: Y.SVGPieSlice","    },","","    /**","     * Returns a shape based on the id of its dom node.","     *","     * @method getShapeById","     * @param {String} id Dom id of the shape's node attribute.","     * @return Shape","     */","    getShapeById: function(id)","    {","        var shape = this._shapes[id];","        return shape;","    },","","	/**","	 * Allows for creating multiple shapes in order to batch appending and redraw operations.","	 *","	 * @method batch","	 * @param {Function} method Method to execute.","	 */","    batch: function(method)","    {","        var autoDraw = this.get(\"autoDraw\");","        this.set(\"autoDraw\", false);","        method();","        this.set(\"autoDraw\", autoDraw);","    },","","    /**","     * Returns a document fragment to for attaching shapes.","     *","     * @method _getDocFrag","     * @return DocumentFragment","     * @private","     */","    _getDocFrag: function()","    {","        if(!this._frag)","        {","            this._frag = DOCUMENT.createDocumentFragment();","        }","        return this._frag;","    },","","    /**","     * Redraws all shapes.","     *","     * @method _redraw","     * @private","     */","    _redraw: function()","    {","        var autoSize = this.get(\"autoSize\"),","            preserveAspectRatio = this.get(\"preserveAspectRatio\"),","            box = this.get(\"resizeDown\") ? this._getUpdatedContentBounds() : this._contentBounds,","            left = box.left,","            right = box.right,","            top = box.top,","            bottom = box.bottom,","            width = right - left,","            height = bottom - top,","            computedWidth,","            computedHeight,","            computedLeft,","            computedTop,","            node;","        if(autoSize)","        {","            if(autoSize == \"sizeContentToGraphic\")","            {","                node = Y.one(this._node);","                computedWidth = parseFloat(node.getComputedStyle(\"width\"));","                computedHeight = parseFloat(node.getComputedStyle(\"height\"));","                computedLeft = computedTop = 0;","                this._contentNode.setAttribute(\"preserveAspectRatio\", preserveAspectRatio);","            }","            else","            {","                computedWidth = width;","                computedHeight = height;","                computedLeft = left;","                computedTop = top;","                this._state.width = width;","                this._state.height = height;","                if(this._node)","                {","                    this._node.style.width = width + \"px\";","                    this._node.style.height = height + \"px\";","                }","            }","        }","        else","        {","                computedWidth = width;","                computedHeight = height;","                computedLeft = left;","                computedTop = top;","        }","        if(this._contentNode)","        {","            this._contentNode.style.left = computedLeft + \"px\";","            this._contentNode.style.top = computedTop + \"px\";","            this._contentNode.setAttribute(\"width\", computedWidth);","            this._contentNode.setAttribute(\"height\", computedHeight);","            this._contentNode.style.width = computedWidth + \"px\";","            this._contentNode.style.height = computedHeight + \"px\";","            this._contentNode.setAttribute(\"viewBox\", \"\" + left + \" \" + top + \" \" + width + \" \" + height + \"\");","        }","        if(this._frag)","        {","            if(this._contentNode)","            {","                this._contentNode.appendChild(this._frag);","            }","            this._frag = null;","        }","    },","","    /**","     * Adds a shape to the redraw queue and calculates the contentBounds. Used internally","     * by `Shape` instances.","     *","     * @method addToRedrawQueue","     * @param shape {SVGShape}","     * @protected","     */","    addToRedrawQueue: function(shape)","    {","        var shapeBox,","            box;","        this._shapes[shape.get(\"id\")] = shape;","        if(!this.get(\"resizeDown\"))","        {","            shapeBox = shape.getBounds();","            box = this._contentBounds;","            box.left = box.left < shapeBox.left ? box.left : shapeBox.left;","            box.top = box.top < shapeBox.top ? box.top : shapeBox.top;","            box.right = box.right > shapeBox.right ? box.right : shapeBox.right;","            box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;","            box.width = box.right - box.left;","            box.height = box.bottom - box.top;","            this._contentBounds = box;","        }","        if(this.get(\"autoDraw\"))","        {","            this._redraw();","        }","    },","","    /**","     * Recalculates and returns the `contentBounds` for the `Graphic` instance.","     *","     * @method _getUpdatedContentBounds","     * @return {Object}","     * @private","     */","    _getUpdatedContentBounds: function()","    {","        var bounds,","            i,","            shape,","            queue = this._shapes,","            box = {};","        for(i in queue)","        {","            if(queue.hasOwnProperty(i))","            {","                shape = queue[i];","                bounds = shape.getBounds();","                box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;","                box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;","                box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;","                box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;","            }","        }","        box.left = Y_LANG.isNumber(box.left) ? box.left : 0;","        box.top = Y_LANG.isNumber(box.top) ? box.top : 0;","        box.right = Y_LANG.isNumber(box.right) ? box.right : 0;","        box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;","        this._contentBounds = box;","        return box;","    },","","    /**","     * Creates a contentNode element","     *","     * @method _createGraphics","     * @private","     */","    _createGraphics: function() {","        var contentNode = this._createGraphicNode(\"svg\"),","            pointerEvents = this.get(\"pointerEvents\");","        contentNode.style.position = \"absolute\";","        contentNode.style.top = \"0px\";","        contentNode.style.left = \"0px\";","        contentNode.style.overflow = \"auto\";","        contentNode.setAttribute(\"overflow\", \"auto\");","        contentNode.setAttribute(\"pointer-events\", pointerEvents);","        return contentNode;","    },","","    /**","     * Creates a graphic node","     *","     * @method _createGraphicNode","     * @param {String} type node type to create","     * @param {String} pe specified pointer-events value","     * @return HTMLElement","     * @private","     */","    _createGraphicNode: function(type, pe)","    {","        var node = DOCUMENT.createElementNS(\"http://www.w3.org/2000/svg\", \"svg:\" + type),","            v = pe || \"none\";","        if(type !== \"defs\" && type !== \"stop\" && type !== \"linearGradient\" && type != \"radialGradient\")","        {","            node.setAttribute(\"pointer-events\", v);","        }","        return node;","    },","","    /**","     * Returns a reference to a gradient definition based on an id and type.","     *","     * @method getGradientNode","     * @param {String} key id that references the gradient definition","     * @param {String} type description of the gradient type","     * @return HTMLElement","     * @protected","     */","    getGradientNode: function(key, type)","    {","        var gradients = this._gradients,","            gradient,","            nodeType = type + \"Gradient\";","        if(gradients.hasOwnProperty(key) && gradients[key].tagName.indexOf(type) > -1)","        {","            gradient = this._gradients[key];","        }","        else","        {","            gradient = this._createGraphicNode(nodeType);","            if(!this._defs)","            {","                this._defs = this._createGraphicNode(\"defs\");","                this._contentNode.appendChild(this._defs);","            }","            this._defs.appendChild(gradient);","            key = key || \"gradient\" + Math.round(100000 * Math.random());","            gradient.setAttribute(\"id\", key);","            if(gradients.hasOwnProperty(key))","            {","                this._defs.removeChild(gradients[key]);","            }","            gradients[key] = gradient;","        }","        return gradient;","    },","","    /**","     * Inserts shape on the top of the tree.","     *","     * @method _toFront","     * @param {SVGShape} Shape to add.","     * @private","     */","    _toFront: function(shape)","    {","        var contentNode = this._contentNode;","        if(shape instanceof Y.SVGShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            contentNode.appendChild(shape);","        }","    },","","    /**","     * Inserts shape as the first child of the content node.","     *","     * @method _toBack","     * @param {SVGShape} Shape to add.","     * @private","     */","    _toBack: function(shape)","    {","        var contentNode = this._contentNode,","            targetNode;","        if(shape instanceof Y.SVGShape)","        {","            shape = shape.get(\"node\");","        }","        if(contentNode && shape)","        {","            targetNode = contentNode.firstChild;","            if(targetNode)","            {","                contentNode.insertBefore(shape, targetNode);","            }","            else","            {","                contentNode.appendChild(shape);","            }","        }","    }","});","","Y.SVGGraphic = SVGGraphic;","","","","}, '@VERSION@', {\"requires\": [\"graphics\"]});"];
_yuitest_coverage["build/graphics-svg/graphics-svg.js"].lines = {"1":0,"3":0,"19":0,"31":0,"93":0,"94":0,"110":0,"111":0,"123":0,"143":0,"144":0,"146":0,"147":0,"148":0,"152":0,"153":0,"155":0,"156":0,"159":0,"160":0,"161":0,"162":0,"164":0,"165":0,"166":0,"167":0,"168":0,"169":0,"170":0,"171":0,"172":0,"173":0,"174":0,"175":0,"176":0,"177":0,"178":0,"179":0,"194":0,"195":0,"209":0,"210":0,"222":0,"240":0,"241":0,"243":0,"244":0,"245":0,"249":0,"250":0,"252":0,"253":0,"256":0,"257":0,"258":0,"259":0,"261":0,"262":0,"263":0,"264":0,"265":0,"266":0,"267":0,"268":0,"269":0,"270":0,"271":0,"272":0,"273":0,"274":0,"289":0,"290":0,"291":0,"292":0,"293":0,"294":0,"310":0,"311":0,"312":0,"313":0,"314":0,"315":0,"316":0,"317":0,"318":0,"319":0,"333":0,"334":0,"335":0,"336":0,"337":0,"338":0,"339":0,"340":0,"341":0,"342":0,"343":0,"358":0,"360":0,"361":0,"362":0,"363":0,"364":0,"365":0,"366":0,"367":0,"368":0,"369":0,"385":0,"387":0,"388":0,"389":0,"390":0,"391":0,"392":0,"410":0,"425":0,"426":0,"427":0,"429":0,"430":0,"431":0,"435":0,"437":0,"438":0,"439":0,"442":0,"444":0,"449":0,"452":0,"456":0,"459":0,"460":0,"463":0,"464":0,"465":0,"466":0,"467":0,"468":0,"469":0,"470":0,"471":0,"472":0,"473":0,"475":0,"476":0,"477":0,"478":0,"479":0,"480":0,"481":0,"482":0,"483":0,"484":0,"487":0,"488":0,"489":0,"490":0,"503":0,"504":0,"517":0,"518":0,"530":0,"540":0,"541":0,"542":0,"543":0,"545":0,"546":0,"547":0,"551":0,"553":0,"554":0,"555":0,"556":0,"557":0,"558":0,"559":0,"560":0,"561":0,"562":0,"563":0,"564":0,"569":0,"570":0,"571":0,"572":0,"573":0,"574":0,"575":0,"576":0,"577":0,"578":0,"593":0,"594":0,"607":0,"608":0,"620":0,"627":0,"628":0,"629":0,"630":0,"631":0,"632":0,"633":0,"634":0,"635":0,"636":0,"637":0,"648":0,"649":0,"660":0,"661":0,"662":0,"663":0,"664":0,"665":0,"666":0,"667":0,"668":0,"669":0,"670":0,"671":0,"682":0,"694":0,"696":0,"697":0,"699":0,"700":0,"701":0,"702":0,"704":0,"706":0,"708":0,"710":0,"712":0,"716":0,"718":0,"726":0,"728":0,"729":0,"730":0,"732":0,"734":0,"735":0,"736":0,"737":0,"738":0,"741":0,"743":0,"744":0,"745":0,"746":0,"748":0,"751":0,"753":0,"755":0,"756":0,"758":0,"761":0,"762":0,"763":0,"764":0,"776":0,"777":0,"789":0,"790":0,"792":0,"793":0,"795":0,"808":0,"813":0,"814":0,"817":0,"818":0,"819":0,"820":0,"823":0,"837":0,"845":0,"847":0,"848":0,"849":0,"850":0,"851":0,"853":0,"854":0,"855":0,"856":0,"857":0,"858":0,"870":0,"871":0,"873":0,"875":0,"877":0,"879":0,"881":0,"883":0,"885":0,"886":0,"889":0,"901":0,"903":0,"904":0,"905":0,"906":0,"909":0,"911":0,"937":0,"948":0,"951":0,"952":0,"954":0,"956":0,"958":0,"960":0,"974":0,"975":0,"977":0,"981":0,"982":0,"985":0,"986":0,"998":0,"999":0,"1010":0,"1012":0,"1013":0,"1024":0,"1028":0,"1039":0,"1041":0,"1042":0,"1043":0,"1055":0,"1066":0,"1068":0,"1080":0,"1091":0,"1111":0,"1128":0,"1134":0,"1135":0,"1136":0,"1138":0,"1140":0,"1142":0,"1144":0,"1146":0,"1162":0,"1164":0,"1166":0,"1177":0,"1183":0,"1185":0,"1186":0,"1187":0,"1188":0,"1189":0,"1190":0,"1191":0,"1192":0,"1193":0,"1194":0,"1195":0,"1196":0,"1197":0,"1198":0,"1200":0,"1204":0,"1205":0,"1207":0,"1208":0,"1214":0,"1226":0,"1230":0,"1232":0,"1233":0,"1235":0,"1236":0,"1238":0,"1240":0,"1244":0,"1245":0,"1246":0,"1247":0,"1252":0,"1264":0,"1293":0,"1295":0,"1296":0,"1297":0,"1299":0,"1301":0,"1302":0,"1306":0,"1307":0,"1309":0,"1310":0,"1314":0,"1316":0,"1317":0,"1321":0,"1322":0,"1324":0,"1325":0,"1328":0,"1329":0,"1330":0,"1331":0,"1334":0,"1335":0,"1336":0,"1337":0,"1339":0,"1340":0,"1341":0,"1342":0,"1343":0,"1344":0,"1345":0,"1349":0,"1350":0,"1351":0,"1352":0,"1353":0,"1356":0,"1357":0,"1358":0,"1360":0,"1362":0,"1363":0,"1367":0,"1368":0,"1370":0,"1371":0,"1372":0,"1373":0,"1374":0,"1375":0,"1376":0,"1377":0,"1378":0,"1379":0,"1380":0,"1381":0,"1383":0,"1385":0,"1387":0,"1389":0,"1391":0,"1407":0,"1408":0,"1409":0,"1411":0,"1424":0,"1436":0,"1448":0,"1460":0,"1471":0,"1482":0,"1493":0,"1504":0,"1517":0,"1518":0,"1519":0,"1520":0,"1521":0,"1523":0,"1535":0,"1549":0,"1551":0,"1552":0,"1553":0,"1554":0,"1555":0,"1557":0,"1560":0,"1562":0,"1563":0,"1565":0,"1567":0,"1568":0,"1570":0,"1571":0,"1573":0,"1574":0,"1576":0,"1578":0,"1581":0,"1582":0,"1589":0,"1590":0,"1592":0,"1594":0,"1596":0,"1608":0,"1609":0,"1610":0,"1611":0,"1612":0,"1613":0,"1614":0,"1615":0,"1616":0,"1617":0,"1628":0,"1651":0,"1658":0,"1660":0,"1662":0,"1664":0,"1665":0,"1666":0,"1667":0,"1669":0,"1679":0,"1680":0,"1682":0,"1693":0,"1694":0,"1696":0,"1709":0,"1717":0,"1719":0,"1720":0,"1721":0,"1723":0,"1724":0,"1725":0,"1726":0,"1727":0,"1729":0,"1731":0,"1735":0,"1739":0,"1750":0,"1751":0,"1753":0,"1757":0,"1769":0,"1771":0,"1772":0,"1774":0,"1776":0,"1781":0,"1792":0,"1829":0,"1830":0,"1831":0,"1832":0,"1833":0,"1838":0,"1851":0,"1856":0,"1857":0,"1859":0,"1861":0,"1874":0,"1879":0,"1880":0,"1881":0,"1883":0,"1897":0,"1902":0,"1903":0,"1904":0,"1906":0,"1941":0,"1942":0,"1944":0,"1946":0,"2000":0,"2002":0,"2003":0,"2005":0,"2007":0,"2010":0,"2047":0,"2049":0,"2051":0,"2052":0,"2054":0,"2057":0,"2070":0,"2072":0,"2074":0,"2076":0,"2081":0,"2082":0,"2084":0,"2086":0,"2102":0,"2118":0,"2120":0,"2122":0,"2138":0,"2142":0,"2155":0,"2157":0,"2159":0,"2160":0,"2217":0,"2230":0,"2243":0,"2244":0,"2257":0,"2261":0,"2272":0,"2274":0,"2276":0,"2277":0,"2287":0,"2288":0,"2299":0,"2301":0,"2304":0,"2306":0,"2324":0,"2333":0,"2334":0,"2335":0,"2336":0,"2337":0,"2338":0,"2339":0,"2343":0,"2353":0,"2358":0,"2359":0,"2361":0,"2363":0,"2377":0,"2382":0,"2383":0,"2385":0,"2387":0,"2391":0,"2402":0,"2404":0,"2407":0,"2409":0,"2428":0,"2434":0,"2435":0,"2436":0,"2437":0,"2438":0,"2439":0,"2443":0,"2453":0,"2454":0,"2459":0,"2472":0,"2473":0,"2478":0,"2492":0,"2500":0,"2502":0,"2504":0,"2505":0,"2523":0,"2528":0,"2529":0,"2530":0,"2533":0,"2571":0,"2582":0,"2583":0,"2586":0,"2588":0,"2607":0,"2612":0,"2613":0,"2615":0,"2617":0,"2633":0,"2649":0,"2665":0,"2678":0,"2680":0,"2682":0,"2695":0,"2697":0,"2699":0,"2772":0,"2777":0,"2778":0,"2780":0,"2782":0,"2795":0,"2800":0,"2801":0,"2803":0,"2805":0,"2827":0,"2828":0,"2843":0,"2855":0,"2864":0,"2865":0,"2867":0,"2869":0,"2871":0,"2873":0,"2875":0,"2877":0,"2878":0,"2883":0,"2885":0,"2915":0,"2917":0,"2919":0,"2921":0,"2931":0,"2933":0,"2934":0,"2940":0,"2941":0,"2942":0,"2943":0,"2944":0,"2945":0,"2946":0,"2947":0,"2948":0,"2949":0,"2950":0,"2952":0,"2963":0,"2966":0,"2967":0,"2968":0,"2969":0,"2970":0,"2971":0,"2981":0,"2982":0,"2984":0,"2985":0,"2987":0,"2989":0,"2991":0,"2993":0,"2994":0,"2995":0,"3008":0,"3009":0,"3011":0,"3013":0,"3015":0,"3016":0,"3028":0,"3030":0,"3032":0,"3036":0,"3048":0,"3050":0,"3052":0,"3055":0,"3057":0,"3058":0,"3060":0,"3062":0,"3064":0,"3074":0,"3076":0,"3078":0,"3080":0,"3083":0,"3095":0,"3097":0,"3098":0,"3100":0,"3101":0,"3102":0,"3113":0,"3125":0,"3128":0,"3130":0,"3132":0,"3134":0,"3138":0,"3140":0,"3142":0,"3144":0,"3158":0,"3159":0,"3161":0,"3163":0,"3190":0,"3191":0,"3202":0,"3203":0,"3204":0,"3205":0,"3217":0,"3219":0,"3221":0,"3232":0,"3246":0,"3248":0,"3250":0,"3251":0,"3252":0,"3253":0,"3254":0,"3258":0,"3259":0,"3260":0,"3261":0,"3262":0,"3263":0,"3264":0,"3266":0,"3267":0,"3273":0,"3274":0,"3275":0,"3276":0,"3278":0,"3280":0,"3281":0,"3282":0,"3283":0,"3284":0,"3285":0,"3286":0,"3288":0,"3290":0,"3292":0,"3294":0,"3308":0,"3310":0,"3311":0,"3313":0,"3314":0,"3315":0,"3316":0,"3317":0,"3318":0,"3319":0,"3320":0,"3321":0,"3323":0,"3325":0,"3338":0,"3343":0,"3345":0,"3347":0,"3348":0,"3349":0,"3350":0,"3351":0,"3352":0,"3355":0,"3356":0,"3357":0,"3358":0,"3359":0,"3360":0,"3370":0,"3372":0,"3373":0,"3374":0,"3375":0,"3376":0,"3377":0,"3378":0,"3392":0,"3394":0,"3396":0,"3398":0,"3412":0,"3415":0,"3417":0,"3421":0,"3422":0,"3424":0,"3425":0,"3427":0,"3428":0,"3429":0,"3430":0,"3432":0,"3434":0,"3436":0,"3448":0,"3449":0,"3451":0,"3453":0,"3455":0,"3468":0,"3470":0,"3472":0,"3474":0,"3476":0,"3477":0,"3479":0,"3483":0,"3489":0};
_yuitest_coverage["build/graphics-svg/graphics-svg.js"].functions = {"SVGDrawing:19":0,"curveTo:92":0,"relativeCurveTo:109":0,"_curveTo:122":0,"quadraticCurveTo:193":0,"relativeQuadraticCurveTo:208":0,"_quadraticCurveTo:221":0,"drawRect:288":0,"drawRoundRect:309":0,"drawCircle:332":0,"drawEllipse:357":0,"drawDiamond:383":0,"drawWedge:408":0,"lineTo:501":0,"relativeLineTo:515":0,"_lineTo:529":0,"moveTo:591":0,"relativeMoveTo:605":0,"_moveTo:619":0,"end:646":0,"clear:658":0,"_closePath:680":0,"closePath:774":0,"_getCurrentArray:787":0,"getBezierData:807":0,"_setCurveBoundingBox:835":0,"_trackSize:869":0,"SVGShape:901":0,"init:935":0,"initializer:946":0,"_setGraphic:972":0,"addClass:996":0,"removeClass:1008":0,"getXY:1022":0,"setXY:1037":0,"contains:1053":0,"compareTo:1065":0,"test:1078":0,"_getDefaultFill:1090":0,"_getDefaultStroke:1109":0,"createNode:1126":0,"on:1160":0,"_strokeChangeHandler:1175":0,"_fillChangeHandler:1224":0,"_setGradientFill:1263":0,"set:1405":0,"translate:1422":0,"translateX:1434":0,"translateY:1446":0,"skew:1458":0,"skewX:1469":0,"skewY:1480":0,"rotate:1491":0,"scale:1502":0,"_addTransform:1515":0,"_updateTransform:1533":0,"_draw:1606":0,"_updateHandler:1626":0,"getBounds:1649":0,"toFront:1677":0,"toBack:1691":0,"_parsePathData:1707":0,"destroy:1748":0,"_destroy:1767":0,"valueFn:1790":0,"setter:1827":0,"getter:1836":0,"valueFn:1849":0,"setter:1854":0,"getter:1872":0,"setter:1877":0,"getter:1895":0,"setter:1900":0,"setter:1940":0,"setter:1998":0,"setter:2045":0,"valueFn:2068":0,"setter:2079":0,"getter:2100":0,"setter:2116":0,"getter:2136":0,"SVGPath:2155":0,"getter:2228":0,"getter:2241":0,"getter:2255":0,"SVGRect:2272":0,"SVGEllipse:2299":0,"_draw:2322":0,"setter:2351":0,"getter:2356":0,"setter:2375":0,"getter:2380":0,"SVGCircle:2402":0,"_draw:2426":0,"setter:2451":0,"getter:2457":0,"setter:2470":0,"getter:2476":0,"SVGPieSlice:2500":0,"_draw:2521":0,"SVGGraphic:2582":0,"valueFn:2605":0,"setter:2610":0,"getter:2631":0,"getter:2647":0,"getter:2663":0,"setter:2676":0,"setter:2693":0,"getter:2770":0,"setter:2775":0,"getter:2793":0,"setter:2798":0,"setter:2825":0,"set:2853":0,"getXY:2913":0,"initializer:2930":0,"render:2962":0,"destroy:2979":0,"addShape:3006":0,"_appendShape:3026":0,"removeShape:3046":0,"removeAllShapes:3072":0,"_removeChildren:3093":0,"clear:3112":0,"_toggleVisible:3123":0,"_getShapeClass:3156":0,"getShapeById:3188":0,"batch:3200":0,"_getDocFrag:3215":0,"_redraw:3230":0,"addToRedrawQueue:3306":0,"_getUpdatedContentBounds:3336":0,"_createGraphics:3369":0,"_createGraphicNode:3390":0,"getGradientNode:3410":0,"_toFront:3446":0,"_toBack:3466":0,"(anonymous 1):1":0};
_yuitest_coverage["build/graphics-svg/graphics-svg.js"].coveredLines = 902;
_yuitest_coverage["build/graphics-svg/graphics-svg.js"].coveredFunctions = 138;
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1);
YUI.add('graphics-svg', function (Y, NAME) {

_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "(anonymous 1)", 1);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3);
var IMPLEMENTATION = "svg",
    SHAPE = "shape",
	SPLITPATHPATTERN = /[a-z][^a-z]*/ig,
    SPLITARGSPATTERN = /[-]?[0-9]*[0-9|\.][0-9]*/g,
    Y_LANG = Y.Lang,
	AttributeLite = Y.AttributeLite,
	SVGGraphic,
    SVGShape,
	SVGCircle,
	SVGRect,
	SVGPath,
	SVGEllipse,
    SVGPieSlice,
    DOCUMENT = Y.config.doc,
    _getClassName = Y.ClassNameManager.getClassName;

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 19);
function SVGDrawing(){}

/**
 * <a href="http://www.w3.org/TR/SVG/">SVG</a> implementation of the <a href="Drawing.html">`Drawing`</a> class.
 * `SVGDrawing` is not intended to be used directly. Instead, use the <a href="Drawing.html">`Drawing`</a> class.
 * If the browser has <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities, the <a href="Drawing.html">`Drawing`</a>
 * class will point to the `SVGDrawing` class.
 *
 * @module graphics
 * @class SVGDrawing
 * @constructor
 */
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 31);
SVGDrawing.prototype = {
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
     * Indicates the type of shape
     *
     * @private
     * @property _type
     * @readOnly
     * @type String
     */
    _type: "path",

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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "curveTo", 92);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 93);
this._curveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 94);
return this;
    },

    /**
     * Draws a bezier curve relative to the current coordinates.
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "relativeCurveTo", 109);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 110);
this._curveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 111);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_curveTo", 122);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 123);
var w,
            h,
            pts,
            cp1x,
            cp1y,
            cp2x,
            cp2y,
            x,
            y,
            right,
            left,
            bottom,
            top,
            i,
            len,
            pathArrayLen,
            currentArray,
            command = relative ? "c" : "C",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 143);
this._pathArray = this._pathArray || [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 144);
if(this._pathType !== command)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 146);
this._pathType = command;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 147);
currentArray = [command];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 148);
this._pathArray.push(currentArray);
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 152);
currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 153);
if(!currentArray)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 155);
currentArray = [];
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 156);
this._pathArray.push(currentArray);
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 159);
pathArrayLen = this._pathArray.length - 1;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 160);
this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat(args);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 161);
len = args.length - 5;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 162);
for(i = 0; i < len; i = i + 6)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 164);
cp1x = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 165);
cp1y = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 166);
cp2x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 167);
cp2y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 168);
x = parseFloat(args[i + 4]) + relativeX;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 169);
y = parseFloat(args[i + 5]) + relativeY;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 170);
right = Math.max(x, Math.max(cp1x, cp2x));
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 171);
bottom = Math.max(y, Math.max(cp1y, cp2y));
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 172);
left = Math.min(x, Math.min(cp1x, cp2x));
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 173);
top = Math.min(y, Math.min(cp1y, cp2y));
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 174);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 175);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 176);
pts = [[this._currentX, this._currentY] , [cp1x, cp1y], [cp2x, cp2y], [x, y]];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 177);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 178);
this._currentX = x;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 179);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "quadraticCurveTo", 193);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 194);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 195);
return this;
    },

    /**
     * Draws a quadratic bezier curve relative to the current position.
     *
     * @method quadraticCurveTo
     * @param {Number} cpx x-coordinate for the control point.
     * @param {Number} cpy y-coordinate for the control point.
     * @param {Number} x x-coordinate for the end point.
     * @param {Number} y y-coordinate for the end point.
     * @chainable
     */
    relativeQuadraticCurveTo: function() {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "relativeQuadraticCurveTo", 208);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 209);
this._quadraticCurveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 210);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_quadraticCurveTo", 221);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 222);
var cpx,
            cpy,
            x,
            y,
            pathArrayLen,
            currentArray,
            w,
            h,
            pts,
            right,
            left,
            bottom,
            top,
            i,
            len,
            command = relative ? "q" : "Q",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 240);
this._pathArray = this._pathArray || [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 241);
if(this._pathType !== command)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 243);
this._pathType = command;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 244);
currentArray = [command];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 245);
this._pathArray.push(currentArray);
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 249);
currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 250);
if(!currentArray)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 252);
currentArray = [];
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 253);
this._pathArray.push(currentArray);
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 256);
pathArrayLen = this._pathArray.length - 1;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 257);
this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat(args);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 258);
len = args.length - 3;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 259);
for(i = 0; i < len; i = i + 4)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 261);
cpx = parseFloat(args[i]) + relativeX;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 262);
cpy = parseFloat(args[i + 1]) + relativeY;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 263);
x = parseFloat(args[i + 2]) + relativeX;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 264);
y = parseFloat(args[i + 3]) + relativeY;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 265);
right = Math.max(x, cpx);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 266);
bottom = Math.max(y, cpy);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 267);
left = Math.min(x, cpx);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 268);
top = Math.min(y, cpy);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 269);
w = Math.abs(right - left);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 270);
h = Math.abs(bottom - top);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 271);
pts = [[this._currentX, this._currentY] , [cpx, cpy], [x, y]];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 272);
this._setCurveBoundingBox(pts, w, h);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 273);
this._currentX = x;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 274);
this._currentY = y;
        }
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "drawRect", 288);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 289);
this.moveTo(x, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 290);
this.lineTo(x + w, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 291);
this.lineTo(x + w, y + h);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 292);
this.lineTo(x, y + h);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 293);
this.lineTo(x, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 294);
return this;
    },

    /**
     * Draws a rectangle with rounded corners.
     *
     * @method drawRoundRect
     * @param {Number} x x-coordinate
     * @param {Number} y y-coordinate
     * @param {Number} w width
     * @param {Number} h height
     * @param {Number} ew width of the ellipse used to draw the rounded corners
     * @param {Number} eh height of the ellipse used to draw the rounded corners
     * @chainable
     */
    drawRoundRect: function(x, y, w, h, ew, eh) {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "drawRoundRect", 309);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 310);
this.moveTo(x, y + eh);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 311);
this.lineTo(x, y + h - eh);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 312);
this.quadraticCurveTo(x, y + h, x + ew, y + h);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 313);
this.lineTo(x + w - ew, y + h);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 314);
this.quadraticCurveTo(x + w, y + h, x + w, y + h - eh);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 315);
this.lineTo(x + w, y + eh);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 316);
this.quadraticCurveTo(x + w, y, x + w - ew, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 317);
this.lineTo(x + ew, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 318);
this.quadraticCurveTo(x, y, x, y + eh);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 319);
return this;
	},

    /**
     * Draws a circle.
     *
     * @method drawCircle
     * @param {Number} x y-coordinate
     * @param {Number} y x-coordinate
     * @param {Number} r radius
     * @chainable
     * @protected
     */
	drawCircle: function(x, y, radius) {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "drawCircle", 332);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 333);
var circum = radius * 2;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 334);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 335);
this._trackSize(x, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 336);
this._trackSize(x + circum, y + circum);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 337);
this._pathArray = this._pathArray || [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 338);
this._pathArray.push(["M", x + radius, y]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 339);
this._pathArray.push(["A",  radius, radius, 0, 1, 0, x + radius, y + circum]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 340);
this._pathArray.push(["A",  radius, radius, 0, 1, 0, x + radius, y]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 341);
this._currentX = x;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 342);
this._currentY = y;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 343);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "drawEllipse", 357);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 358);
var radius = w * 0.5,
            yRadius = h * 0.5;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 360);
this._drawingComplete = false;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 361);
this._trackSize(x, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 362);
this._trackSize(x + w, y + h);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 363);
this._pathArray = this._pathArray || [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 364);
this._pathArray.push(["M", x + radius, y]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 365);
this._pathArray.push(["A",  radius, yRadius, 0, 1, 0, x + radius, y + h]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 366);
this._pathArray.push(["A",  radius, yRadius, 0, 1, 0, x + radius, y]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 367);
this._currentX = x;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 368);
this._currentY = y;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 369);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "drawDiamond", 383);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 385);
var midWidth = width * 0.5,
            midHeight = height * 0.5;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 387);
this.moveTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 388);
this.lineTo(x + width, y + midHeight);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 389);
this.lineTo(x + midWidth, y + height);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 390);
this.lineTo(x, y + midHeight);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 391);
this.lineTo(x + midWidth, y);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 392);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "drawWedge", 408);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 410);
var segs,
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
            i,
            diameter = radius * 2,
            currentArray,
            pathArrayLen;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 425);
this._pathArray = this._pathArray || [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 426);
yRadius = yRadius || radius;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 427);
if(this._pathType != "M")
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 429);
this._pathType = "M";
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 430);
currentArray = ["M"];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 431);
this._pathArray.push(currentArray);
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 435);
currentArray = this._getCurrentArray();
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 437);
pathArrayLen = this._pathArray.length - 1;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 438);
this._pathArray[pathArrayLen].push(x);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 439);
this._pathArray[pathArrayLen].push(x);

        // limit sweep to reasonable numbers
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 442);
if(Math.abs(arc) > 360)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 444);
arc = 360;
        }

        // First we calculate how many segments are needed
        // for a smooth arc.
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 449);
segs = Math.ceil(Math.abs(arc) / 45);

        // Now calculate the sweep of each segment.
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 452);
segAngle = arc / segs;

        // The math requires radians rather than degrees. To convert from degrees
        // use the formula (degrees/180)*Math.PI to get radians.
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 456);
theta = -(segAngle / 180) * Math.PI;

        // convert angle startAngle to radians
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 459);
angle = (startAngle / 180) * Math.PI;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 460);
if(segs > 0)
        {
            // draw a line from the center to the start of the curve
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 463);
ax = x + Math.cos(startAngle / 180 * Math.PI) * radius;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 464);
ay = y + Math.sin(startAngle / 180 * Math.PI) * yRadius;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 465);
this._pathType = "L";
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 466);
pathArrayLen++;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 467);
this._pathArray[pathArrayLen] = ["L"];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 468);
this._pathArray[pathArrayLen].push(Math.round(ax));
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 469);
this._pathArray[pathArrayLen].push(Math.round(ay));
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 470);
pathArrayLen++;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 471);
this._pathType = "Q";
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 472);
this._pathArray[pathArrayLen] = ["Q"];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 473);
for(i = 0; i < segs; ++i)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 475);
angle += theta;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 476);
angleMid = angle - (theta / 2);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 477);
bx = x + Math.cos(angle) * radius;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 478);
by = y + Math.sin(angle) * yRadius;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 479);
cx = x + Math.cos(angleMid) * (radius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 480);
cy = y + Math.sin(angleMid) * (yRadius / Math.cos(theta / 2));
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 481);
this._pathArray[pathArrayLen].push(Math.round(cx));
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 482);
this._pathArray[pathArrayLen].push(Math.round(cy));
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 483);
this._pathArray[pathArrayLen].push(Math.round(bx));
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 484);
this._pathArray[pathArrayLen].push(Math.round(by));
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 487);
this._currentX = x;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 488);
this._currentY = y;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 489);
this._trackSize(diameter, diameter);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 490);
return this;
    },

    /**
     * Draws a line segment using the current line style from the current drawing position to the specified x and y coordinates.
     *
     * @method lineTo
     * @param {Number} point1 x-coordinate for the end point.
     * @param {Number} point2 y-coordinate for the end point.
     * @chainable
     */
    lineTo: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "lineTo", 501);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 503);
this._lineTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 504);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "relativeLineTo", 515);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 517);
this._lineTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 518);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_lineTo", 529);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 530);
var point1 = args[0],
            i,
            len,
            pathArrayLen,
            currentArray,
            x,
            y,
            command = relative ? "l" : "L",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 540);
this._pathArray = this._pathArray || [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 541);
this._shapeType = "path";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 542);
len = args.length;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 543);
if(this._pathType !== command)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 545);
this._pathType = command;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 546);
currentArray = [command];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 547);
this._pathArray.push(currentArray);
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 551);
currentArray = this._getCurrentArray();
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 553);
pathArrayLen = this._pathArray.length - 1;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 554);
if (typeof point1 === 'string' || typeof point1 === 'number') {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 555);
for (i = 0; i < len; i = i + 2) {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 556);
x = parseFloat(args[i]);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 557);
y = parseFloat(args[i + 1]);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 558);
this._pathArray[pathArrayLen].push(x);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 559);
this._pathArray[pathArrayLen].push(y);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 560);
x = x + relativeX;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 561);
y = y + relativeY;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 562);
this._currentX = x;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 563);
this._currentY = y;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 564);
this._trackSize.apply(this, [x, y]);
            }
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 569);
for (i = 0; i < len; ++i) {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 570);
x = parseFloat(args[i][0]);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 571);
y = parseFloat(args[i][1]);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 572);
this._pathArray[pathArrayLen].push(x);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 573);
this._pathArray[pathArrayLen].push(y);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 574);
this._currentX = x;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 575);
this._currentY = y;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 576);
x = x + relativeX;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 577);
y = y + relativeY;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 578);
this._trackSize.apply(this, [x, y]);
            }
        }
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "moveTo", 591);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 593);
this._moveTo.apply(this, [Y.Array(arguments), false]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 594);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "relativeMoveTo", 605);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 607);
this._moveTo.apply(this, [Y.Array(arguments), true]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 608);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_moveTo", 619);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 620);
var pathArrayLen,
            currentArray,
            x = parseFloat(args[0]),
            y = parseFloat(args[1]),
            command = relative ? "m" : "M",
            relativeX = relative ? parseFloat(this._currentX) : 0,
            relativeY = relative ? parseFloat(this._currentY) : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 627);
this._pathArray = this._pathArray || [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 628);
this._pathType = command;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 629);
currentArray = [command];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 630);
this._pathArray.push(currentArray);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 631);
pathArrayLen = this._pathArray.length - 1;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 632);
this._pathArray[pathArrayLen] = this._pathArray[pathArrayLen].concat([x, y]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 633);
x = x + relativeX;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 634);
y = y + relativeY;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 635);
this._currentX = x;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 636);
this._currentY = y;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 637);
this._trackSize(x, y);
    },

    /**
     * Completes a drawing operation.
     *
     * @method end
     * @chainable
     */
    end: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "end", 646);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 648);
this._closePath();
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 649);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "clear", 658);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 660);
this._currentX = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 661);
this._currentY = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 662);
this._width = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 663);
this._height = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 664);
this._left = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 665);
this._right = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 666);
this._top = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 667);
this._bottom = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 668);
this._pathArray = [];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 669);
this._path = "";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 670);
this._pathType = "";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 671);
return this;
    },

    /**
     * Draws the path.
     *
     * @method _closePath
     * @private
     */
    _closePath: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_closePath", 680);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 682);
var pathArray,
            segmentArray,
            pathType,
            len,
            val,
            val2,
            i,
            path = "",
            node = this.node,
            left = parseFloat(this._left),
            top = parseFloat(this._top),
            fill = this.get("fill");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 694);
if(this._pathArray)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 696);
pathArray = this._pathArray.concat();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 697);
while(pathArray && pathArray.length > 0)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 699);
segmentArray = pathArray.shift();
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 700);
len = segmentArray.length;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 701);
pathType = segmentArray[0];
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 702);
if(pathType === "A")
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 704);
path += pathType + segmentArray[1] + "," + segmentArray[2];
                }
                else {_yuitest_coverline("build/graphics-svg/graphics-svg.js", 706);
if(pathType == "z" || pathType == "Z")
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 708);
path += " z ";
                }
                else {_yuitest_coverline("build/graphics-svg/graphics-svg.js", 710);
if(pathType == "C" || pathType == "c")
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 712);
path += pathType + (segmentArray[1] - left)+ "," + (segmentArray[2] - top);
                }
                else
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 716);
path += " " + pathType + parseFloat(segmentArray[1] - left);
                }}}
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 718);
switch(pathType)
                {
                    case "L" :
                    case "l" :
                    case "M" :
                    case "m" :
                    case "Q" :
                    case "q" :
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 726);
for(i = 2; i < len; ++i)
                        {
                            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 728);
val = (i % 2 === 0) ? top : left;
                            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 729);
val = segmentArray[i] - val;
                            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 730);
path += ", " + parseFloat(val);
                        }
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 732);
break;
                    case "A" :
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 734);
val = " " + parseFloat(segmentArray[3]) + " " + parseFloat(segmentArray[4]);
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 735);
val += "," + parseFloat(segmentArray[5]) + " " + parseFloat(segmentArray[6] - left);
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 736);
val += "," + parseFloat(segmentArray[7] - top);
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 737);
path += " " + val;
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 738);
break;
                    case "C" :
                    case "c" :
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 741);
for(i = 3; i < len - 1; i = i + 2)
                        {
                            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 743);
val = parseFloat(segmentArray[i] - left);
                            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 744);
val = val + ", ";
                            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 745);
val = val + parseFloat(segmentArray[i + 1] - top);
                            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 746);
path += " " + val;
                        }
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 748);
break;
                }
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 751);
if(fill && fill.color)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 753);
path += 'z';
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 755);
Y.Lang.trim(path);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 756);
if(path)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 758);
node.setAttribute("d", path);
            }

            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 761);
this._path = path;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 762);
this._fillChangeHandler();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 763);
this._strokeChangeHandler();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 764);
this._updateTransform();
        }
    },

    /**
     * Ends a fill and stroke
     *
     * @method closePath
     * @chainable
     */
    closePath: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "closePath", 774);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 776);
this._pathArray.push(["z"]);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 777);
return this;
    },

    /**
     * Returns the current array of drawing commands.
     *
     * @method _getCurrentArray
     * @return Array
     * @private
     */
    _getCurrentArray: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_getCurrentArray", 787);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 789);
var currentArray = this._pathArray[Math.max(0, this._pathArray.length - 1)];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 790);
if(!currentArray)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 792);
currentArray = [];
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 793);
this._pathArray.push(currentArray);
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 795);
return currentArray;
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getBezierData", 807);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 808);
var n = points.length,
            tmp = [],
            i,
            j;

        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 813);
for (i = 0; i < n; ++i){
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 814);
tmp[i] = [points[i][0], points[i][1]]; // save input
        }

        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 817);
for (j = 1; j < n; ++j) {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 818);
for (i = 0; i < n - j; ++i) {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 819);
tmp[i][0] = (1 - t) * tmp[i][0] + t * tmp[parseInt(i + 1, 10)][0];
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 820);
tmp[i][1] = (1 - t) * tmp[i][1] + t * tmp[parseInt(i + 1, 10)][1];
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 823);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_setCurveBoundingBox", 835);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 837);
var i,
            left = this._currentX,
            right = left,
            top = this._currentY,
            bottom = top,
            len = Math.round(Math.sqrt((w * w) + (h * h))),
            t = 1/len,
            xy;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 845);
for(i = 0; i < len; ++i)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 847);
xy = this.getBezierData(pts, t * i);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 848);
left = isNaN(left) ? xy[0] : Math.min(xy[0], left);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 849);
right = isNaN(right) ? xy[0] : Math.max(xy[0], right);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 850);
top = isNaN(top) ? xy[1] : Math.min(xy[1], top);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 851);
bottom = isNaN(bottom) ? xy[1] : Math.max(xy[1], bottom);
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 853);
left = Math.round(left * 10)/10;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 854);
right = Math.round(right * 10)/10;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 855);
top = Math.round(top * 10)/10;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 856);
bottom = Math.round(bottom * 10)/10;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 857);
this._trackSize(right, bottom);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 858);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_trackSize", 869);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 870);
if (w > this._right) {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 871);
this._right = w;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 873);
if(w < this._left)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 875);
this._left = w;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 877);
if (h < this._top)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 879);
this._top = h;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 881);
if (h > this._bottom)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 883);
this._bottom = h;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 885);
this._width = this._right - this._left;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 886);
this._height = this._bottom - this._top;
    }
};
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 889);
Y.SVGDrawing = SVGDrawing;
/**
 * <a href="http://www.w3.org/TR/SVG/">SVG</a> implementation of the <a href="Shape.html">`Shape`</a> class.
 * `SVGShape` is not intended to be used directly. Instead, use the <a href="Shape.html">`Shape`</a> class.
 * If the browser has <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities, the <a href="Shape.html">`Shape`</a>
 * class will point to the `SVGShape` class.
 *
 * @module graphics
 * @class SVGShape
 * @constructor
 * @param {Object} cfg (optional) Attribute configs
 */
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 901);
SVGShape = function(cfg)
{
    _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "SVGShape", 901);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 903);
this._transforms = [];
    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 904);
this.matrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 905);
this._normalizedMatrix = new Y.Matrix();
    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 906);
SVGShape.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 909);
SVGShape.NAME = "shape";

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 911);
Y.extend(SVGShape, Y.GraphicBase, Y.mix({
    /**
     * Storage for x attribute.
     *
     * @property _x
     * @protected
     */
    _x: 0,

    /**
     * Storage for y attribute.
     *
     * @property _y
     * @protected
     */
    _y: 0,

    /**
     * Init method, invoked during construction.
     * Calls `initializer` method.
     *
     * @method init
     * @protected
     */
	init: function()
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "init", 935);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 937);
this.initializer.apply(this, arguments);
	},

	/**
	 * Initializes the shape
	 *
	 * @private
	 * @method initializer
	 */
	initializer: function(cfg)
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "initializer", 946);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 948);
var host = this,
            graphic = cfg.graphic,
            data = this.get("data");
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 951);
host.createNode();
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 952);
if(graphic)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 954);
host._setGraphic(graphic);
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 956);
if(data)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 958);
host._parsePathData(data);
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 960);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_setGraphic", 972);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 974);
var graphic;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 975);
if(render instanceof Y.SVGGraphic)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 977);
this._graphic = render;
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 981);
render = Y.one(render);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 982);
graphic = new Y.SVGGraphic({
                render: render
            });
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 985);
graphic._appendShape(this);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 986);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "addClass", 996);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 998);
var node = this.node;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 999);
node.className.baseVal = Y_LANG.trim([node.className.baseVal, className].join(' '));
	},

	/**
	 * Removes a class name from each node.
	 *
	 * @method removeClass
	 * @param {String} className the class name to remove from the node's class attribute
	 */
	removeClass: function(className)
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "removeClass", 1008);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1010);
var node = this.node,
			classString = node.className.baseVal;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1012);
classString = classString.replace(new RegExp(className + ' '), className).replace(new RegExp(className), '');
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1013);
node.className.baseVal = classString;
	},

	/**
	 * Gets the current position of the node in page coordinates.
	 *
	 * @method getXY
	 * @return Array The XY position of the shape.
	 */
	getXY: function()
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getXY", 1022);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1024);
var graphic = this._graphic,
			parentXY = graphic.getXY(),
			x = this._x,
			y = this._y;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1028);
return [parentXY[0] + x, parentXY[1] + y];
	},

	/**
	 * Set the position of the shape in page coordinates, regardless of how the node is positioned.
	 *
	 * @method setXY
	 * @param {Array} Contains x & y values for new position (coordinates are page-based)
	 */
	setXY: function(xy)
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setXY", 1037);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1039);
var graphic = this._graphic,
			parentXY = graphic.getXY();
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1041);
this._x = xy[0] - parentXY[0];
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1042);
this._y = xy[1] - parentXY[1];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1043);
this.set("transform", this.get("transform"));
	},

	/**
	 * Determines whether the node is an ancestor of another HTML element in the DOM hierarchy.
	 *
	 * @method contains
	 * @param {SVGShape | HTMLElement} needle The possible node or descendent
	 * @return Boolean Whether or not this shape is the needle or its ancestor.
	 */
	contains: function(needle)
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "contains", 1053);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1055);
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "compareTo", 1065);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1066);
var node = this.node;

		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1068);
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "test", 1078);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1080);
return Y.Selector.test(this.node, selector);
	},

	/**
	 * Value function for fill attribute
	 *
	 * @private
	 * @method _getDefaultFill
	 * @return Object
	 */
	_getDefaultFill: function() {
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_getDefaultFill", 1090);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1091);
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_getDefaultStroke", 1109);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1111);
return {
			weight: 1,
			dashstyle: "none",
			color: "#000",
			opacity: 1.0
		};
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "createNode", 1126);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1128);
var host = this,
            node = DOCUMENT.createElementNS("http://www.w3.org/2000/svg", "svg:" + this._type),
			id = host.get("id"),
            name = host.name,
            concat = host._camelCaseConcat,
			pointerEvents = host.get("pointerEvents");
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1134);
host.node = node;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1135);
host.addClass(_getClassName(SHAPE) + " " + _getClassName(concat(IMPLEMENTATION, SHAPE)) + " " + _getClassName(name) + " " + _getClassName(concat(IMPLEMENTATION, name)));
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1136);
if(id)
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1138);
node.setAttribute("id", id);
		}
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1140);
if(pointerEvents)
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1142);
node.setAttribute("pointer-events", pointerEvents);
		}
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1144);
if(!host.get("visible"))
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1146);
Y.one(node).setStyle("visibility", "hidden");
        }
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "on", 1160);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1162);
if(Y.Node.DOM_EVENTS[type])
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1164);
return Y.one("#" +  this.get("id")).on(type, fn);
		}
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1166);
return Y.on.apply(this, arguments);
	},

	/**
	 * Adds a stroke to the shape node.
	 *
	 * @method _strokeChangeHandler
	 * @private
	 */
	_strokeChangeHandler: function(e)
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_strokeChangeHandler", 1175);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1177);
var node = this.node,
			stroke = this.get("stroke"),
			strokeOpacity,
			dashstyle,
			dash,
			linejoin;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1183);
if(stroke && stroke.weight && stroke.weight > 0)
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1185);
linejoin = stroke.linejoin || "round";
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1186);
strokeOpacity = parseFloat(stroke.opacity);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1187);
dashstyle = stroke.dashstyle || "none";
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1188);
dash = Y_LANG.isArray(dashstyle) ? dashstyle.toString() : dashstyle;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1189);
stroke.color = stroke.color || "#000000";
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1190);
stroke.weight = stroke.weight || 1;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1191);
stroke.opacity = Y_LANG.isNumber(strokeOpacity) ? strokeOpacity : 1;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1192);
stroke.linecap = stroke.linecap || "butt";
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1193);
node.setAttribute("stroke-dasharray", dash);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1194);
node.setAttribute("stroke", stroke.color);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1195);
node.setAttribute("stroke-linecap", stroke.linecap);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1196);
node.setAttribute("stroke-width",  stroke.weight);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1197);
node.setAttribute("stroke-opacity", stroke.opacity);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1198);
if(linejoin == "round" || linejoin == "bevel")
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1200);
node.setAttribute("stroke-linejoin", linejoin);
			}
			else
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1204);
linejoin = parseInt(linejoin, 10);
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1205);
if(Y_LANG.isNumber(linejoin))
				{
					_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1207);
node.setAttribute("stroke-miterlimit",  Math.max(linejoin, 1));
					_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1208);
node.setAttribute("stroke-linejoin", "miter");
				}
			}
		}
		else
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1214);
node.setAttribute("stroke", "none");
		}
	},

	/**
	 * Adds a fill to the shape node.
	 *
	 * @method _fillChangeHandler
	 * @private
	 */
	_fillChangeHandler: function(e)
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_fillChangeHandler", 1224);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1226);
var node = this.node,
			fill = this.get("fill"),
			fillOpacity,
			type;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1230);
if(fill)
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1232);
type = fill.type;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1233);
if(type == "linear" || type == "radial")
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1235);
this._setGradientFill(fill);
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1236);
node.setAttribute("fill", "url(#grad" + this.get("id") + ")");
			}
			else {_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1238);
if(!fill.color)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1240);
node.setAttribute("fill", "none");
			}
			else
			{
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1244);
fillOpacity = parseFloat(fill.opacity);
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1245);
fillOpacity = Y_LANG.isNumber(fillOpacity) ? fillOpacity : 1;
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1246);
node.setAttribute("fill", fill.color);
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1247);
node.setAttribute("fill-opacity", fillOpacity);
			}}
		}
		else
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1252);
node.setAttribute("fill", "none");
		}
	},

	/**
	 * Creates a gradient fill
	 *
	 * @method _setGradientFill
	 * @param {String} type gradient type
	 * @private
	 */
	_setGradientFill: function(fill) {
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_setGradientFill", 1263);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1264);
var offset,
			opacity,
			color,
			stopNode,
            newStop,
			isNumber = Y_LANG.isNumber,
			graphic = this._graphic,
			type = fill.type,
			gradientNode = graphic.getGradientNode("grad" + this.get("id"), type),
			stops = fill.stops,
			w = this.get("width"),
			h = this.get("height"),
			rotation = fill.rotation || 0,
			radCon = Math.PI/180,
            tanRadians = parseFloat(parseFloat(Math.tan(rotation * radCon)).toFixed(8)),
            i,
			len,
			def,
			stop,
			x1 = "0%",
			x2 = "100%",
			y1 = "0%",
			y2 = "0%",
			cx = fill.cx,
			cy = fill.cy,
			fx = fill.fx,
			fy = fill.fy,
			r = fill.r,
            stopNodes = [];
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1293);
if(type == "linear")
		{
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1295);
cx = w/2;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1296);
cy = h/2;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1297);
if(Math.abs(tanRadians) * w/2 >= h/2)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1299);
if(rotation < 180)
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1301);
y1 = 0;
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1302);
y2 = h;
                }
                else
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1306);
y1 = h;
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1307);
y2 = 0;
                }
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1309);
x1 = cx - ((cy - y1)/tanRadians);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1310);
x2 = cx - ((cy - y2)/tanRadians);
            }
            else
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1314);
if(rotation > 90 && rotation < 270)
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1316);
x1 = w;
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1317);
x2 = 0;
                }
                else
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1321);
x1 = 0;
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1322);
x2 = w;
                }
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1324);
y1 = ((tanRadians * (cx - x1)) - cy) * -1;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1325);
y2 = ((tanRadians * (cx - x2)) - cy) * -1;
            }

            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1328);
x1 = Math.round(100 * x1/w);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1329);
x2 = Math.round(100 * x2/w);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1330);
y1 = Math.round(100 * y1/h);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1331);
y2 = Math.round(100 * y2/h);

            //Set default value if not valid
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1334);
x1 = isNumber(x1) ? x1 : 0;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1335);
x2 = isNumber(x2) ? x2 : 100;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1336);
y1 = isNumber(y1) ? y1 : 0;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1337);
y2 = isNumber(y2) ? y2 : 0;

            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1339);
gradientNode.setAttribute("spreadMethod", "pad");
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1340);
gradientNode.setAttribute("width", w);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1341);
gradientNode.setAttribute("height", h);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1342);
gradientNode.setAttribute("x1", x1 + "%");
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1343);
gradientNode.setAttribute("x2", x2 + "%");
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1344);
gradientNode.setAttribute("y1", y1 + "%");
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1345);
gradientNode.setAttribute("y2", y2 + "%");
		}
		else
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1349);
gradientNode.setAttribute("cx", (cx * 100) + "%");
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1350);
gradientNode.setAttribute("cy", (cy * 100) + "%");
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1351);
gradientNode.setAttribute("fx", (fx * 100) + "%");
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1352);
gradientNode.setAttribute("fy", (fy * 100) + "%");
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1353);
gradientNode.setAttribute("r", (r * 100) + "%");
		}

		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1356);
len = stops.length;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1357);
def = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1358);
for(i = 0; i < len; ++i)
		{
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1360);
if(this._stops && this._stops.length > 0)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1362);
stopNode = this._stops.shift();
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1363);
newStop = false;
            }
            else
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1367);
stopNode = graphic._createGraphicNode("stop");
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1368);
newStop = true;
            }
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1370);
stop = stops[i];
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1371);
opacity = stop.opacity;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1372);
color = stop.color;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1373);
offset = stop.offset || i/(len - 1);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1374);
offset = Math.round(offset * 100) + "%";
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1375);
opacity = isNumber(opacity) ? opacity : 1;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1376);
opacity = Math.max(0, Math.min(1, opacity));
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1377);
def = (i + 1) / len;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1378);
stopNode.setAttribute("offset", offset);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1379);
stopNode.setAttribute("stop-color", color);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1380);
stopNode.setAttribute("stop-opacity", opacity);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1381);
if(newStop)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1383);
gradientNode.appendChild(stopNode);
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1385);
stopNodes.push(stopNode);
		}
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1387);
while(this._stops && this._stops.length > 0)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1389);
gradientNode.removeChild(this._stops.shift());
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1391);
this._stops = stopNodes;
	},

    _stops: null,

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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "set", 1405);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1407);
var host = this;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1408);
AttributeLite.prototype.set.apply(host, arguments);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1409);
if(host.initialized)
		{
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1411);
host._updateHandler();
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "translate", 1422);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1424);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "translateX", 1434);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1436);
this._addTransform("translateX", arguments);
    },

	/**
	 * Translates the shape along the y-axis. When translating x and y coordinates,
	 * use the `translate` method.
	 *
	 * @method translateY
	 * @param {Number} y The value to translate.
	 */
	translateY: function(y)
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "translateY", 1446);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1448);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "skew", 1458);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1460);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "skewX", 1469);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1471);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "skewY", 1480);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1482);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "rotate", 1491);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1493);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "scale", 1502);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1504);
this._addTransform("scale", arguments);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_addTransform", 1515);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1517);
args = Y.Array(args);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1518);
this._transform = Y_LANG.trim(this._transform + " " + type + "(" + args.join(", ") + ")");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1519);
args.unshift(type);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1520);
this._transforms.push(args);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1521);
if(this.initialized)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1523);
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_updateTransform", 1533);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1535);
var isPath = this._type == "path",
		    node = this.node,
			key,
			transform,
			transformOrigin,
			x,
			y,
            tx,
            ty,
            matrix = this.matrix,
            normalizedMatrix = this._normalizedMatrix,
            i,
            len = this._transforms.length;

        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1549);
if(isPath || (this._transforms && this._transforms.length > 0))
		{
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1551);
x = this._x;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1552);
y = this._y;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1553);
transformOrigin = this.get("transformOrigin");
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1554);
tx = x + (transformOrigin[0] * this.get("width"));
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1555);
ty = y + (transformOrigin[1] * this.get("height"));
            //need to use translate for x/y coords
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1557);
if(isPath)
            {
                //adjust origin for custom shapes
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1560);
if(!(this instanceof Y.SVGPath))
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1562);
tx = this._left + (transformOrigin[0] * this.get("width"));
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1563);
ty = this._top + (transformOrigin[1] * this.get("height"));
                }
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1565);
normalizedMatrix.init({dx: x + this._left, dy: y + this._top});
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1567);
normalizedMatrix.translate(tx, ty);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1568);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1570);
key = this._transforms[i].shift();
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1571);
if(key)
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1573);
normalizedMatrix[key].apply(normalizedMatrix, this._transforms[i]);
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1574);
matrix[key].apply(matrix, this._transforms[i]);
                }
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1576);
if(isPath)
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1578);
this._transforms[i].unshift(key);
                }
			}
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1581);
normalizedMatrix.translate(-tx, -ty);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1582);
transform = "matrix(" + normalizedMatrix.a + "," +
                            normalizedMatrix.b + "," +
                            normalizedMatrix.c + "," +
                            normalizedMatrix.d + "," +
                            normalizedMatrix.dx + "," +
                            normalizedMatrix.dy + ")";
		}
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1589);
this._graphic.addToRedrawQueue(this);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1590);
if(transform)
		{
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1592);
node.setAttribute("transform", transform);
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1594);
if(!isPath)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1596);
this._transforms = [];
        }
	},

	/**
	 * Draws the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_draw", 1606);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1608);
var node = this.node;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1609);
node.setAttribute("width", this.get("width"));
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1610);
node.setAttribute("height", this.get("height"));
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1611);
node.setAttribute("x", this._x);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1612);
node.setAttribute("y", this._y);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1613);
node.style.left = this._x + "px";
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1614);
node.style.top = this._y + "px";
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1615);
this._fillChangeHandler();
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1616);
this._strokeChangeHandler();
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1617);
this._updateTransform();
	},

	/**
     * Updates `Shape` based on attribute changes.
     *
     * @method _updateHandler
	 * @private
	 */
	_updateHandler: function(e)
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_updateHandler", 1626);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1628);
this._draw();
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getBounds", 1649);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1651);
var type = this._type,
			stroke = this.get("stroke"),
            w = this.get("width"),
			h = this.get("height"),
			x = type == "path" ? 0 : this._x,
			y = type == "path" ? 0 : this._y,
            wt = 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1658);
if(type != "path")
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1660);
if(stroke && stroke.weight)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1662);
wt = stroke.weight;
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1664);
w = (x + w + wt) - (x - wt);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1665);
h = (y + h + wt) - (y - wt);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1666);
x -= wt;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1667);
y -= wt;
        }
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1669);
return this._normalizedMatrix.getContentRect(w, h, x, y);
	},

    /**
     * Places the shape above all other shapes.
     *
     * @method toFront
     */
    toFront: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "toFront", 1677);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1679);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1680);
if(graphic)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1682);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "toBack", 1691);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1693);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1694);
if(graphic)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1696);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_parsePathData", 1707);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1709);
var method,
            methodSymbol,
            args,
            commandArray = Y.Lang.trim(val.match(SPLITPATHPATTERN)),
            i,
            len,
            str,
            symbolToMethod = this._pathSymbolToMethod;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1717);
if(commandArray)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1719);
this.clear();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1720);
len = commandArray.length || 0;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1721);
for(i = 0; i < len; i = i + 1)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1723);
str = commandArray[i];
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1724);
methodSymbol = str.substr(0, 1);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1725);
args = str.substr(1).match(SPLITARGSPATTERN);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1726);
method = symbolToMethod[methodSymbol];
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1727);
if(method)
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1729);
if(args)
                    {
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1731);
this[method].apply(this, args);
                    }
                    else
                    {
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1735);
this[method].apply(this);
                    }
                }
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1739);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "destroy", 1748);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1750);
var graphic = this.get("graphic");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1751);
if(graphic)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1753);
graphic.removeShape(this);
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1757);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_destroy", 1767);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1769);
if(this.node)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1771);
Y.Event.purgeElement(this.node, true);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1772);
if(this.node.parentNode)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1774);
this.node.parentNode.removeChild(this.node);
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1776);
this.node = null;
        }
    }
 }, Y.SVGDrawing.prototype));

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1781);
SVGShape.ATTRS = {
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
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "valueFn", 1790);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1792);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 1827);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1829);
this.matrix.init();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1830);
this._normalizedMatrix.init();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1831);
this._transforms = this.matrix.getTransformArray(val);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1832);
this._transform = val;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1833);
return val;
		},

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 1836);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1838);
return this._transform;
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
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "valueFn", 1849);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1851);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 1854);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1856);
var node = this.node;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1857);
if(node)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1859);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1861);
return val;
		}
	},

	/**
	 * Indicates the x position of shape.
	 *
	 * @config x
	 * @type Number
	 */
	x: {
        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 1872);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1874);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 1877);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1879);
var transform = this.get("transform");
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1880);
this._x = val;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1881);
if(transform)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1883);
this.set("transform", transform);
            }
        }
	},

	/**
	 * Indicates the y position of shape.
	 *
	 * @config y
	 * @type Number
	 */
	y: {
        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 1895);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1897);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 1900);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1902);
var transform = this.get("transform");
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1903);
this._y = val;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1904);
if(transform)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1906);
this.set("transform", transform);
            }
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
	 * Indicates whether the shape is visible.
	 *
	 * @config visible
	 * @type Boolean
	 */
	visible: {
		value: true,

		setter: function(val){
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 1940);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1941);
var visibility = val ? "visible" : "hidden";
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1942);
if(this.node)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 1944);
this.node.style.visibility = visibility;
            }
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 1946);
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
	 *
	 * @config fill
	 * @type Object
	 */
	fill: {
		valueFn: "_getDefaultFill",

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 1998);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2000);
var fill,
				tmpl = this.get("fill") || this._getDefaultFill();
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2002);
fill = (val) ? Y.merge(tmpl, val) : null;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2003);
if(fill && fill.color)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2005);
if(fill.color === undefined || fill.color == "none")
				{
					_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2007);
fill.color = null;
				}
			}
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2010);
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
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2045);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2047);
var tmpl = this.get("stroke") || this._getDefaultStroke(),
                wt;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2049);
if(val && val.hasOwnProperty("weight"))
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2051);
wt = parseInt(val.weight, 10);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2052);
if(!isNaN(wt))
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2054);
val.weight = wt;
                }
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2057);
return (val) ? Y.merge(tmpl, val) : null;
		}
	},

	// Only implemented in SVG
	// Determines whether the instance will receive mouse events.
	//
	// @config pointerEvents
	// @type string
	//
	pointerEvents: {
		valueFn: function()
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "valueFn", 2068);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2070);
var val = "visiblePainted",
				node = this.node;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2072);
if(node)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2074);
node.setAttribute("pointer-events", val);
			}
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2076);
return val;
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2079);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2081);
var node = this.node;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2082);
if(node)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2084);
node.setAttribute("pointer-events", val);
			}
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2086);
return val;
		}
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2100);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2102);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2116);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2118);
if(this.get("node"))
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2120);
this._parsePathData(val);
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2122);
return val;
        }
    },

	/**
	 * Reference to the parent graphic instance
	 *
	 * @config graphic
	 * @type SVGGraphic
	 * @readOnly
	 */
	graphic: {
		readOnly: true,

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2136);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2138);
return this._graphic;
        }
	}
};
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2142);
Y.SVGShape = SVGShape;

/**
 * <a href="http://www.w3.org/TR/SVG/">SVG</a> implementation of the <a href="Path.html">`Path`</a> class.
 * `SVGPath` is not intended to be used directly. Instead, use the <a href="Path.html">`Path`</a> class.
 * If the browser has <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities, the <a href="Path.html">`Path`</a>
 * class will point to the `SVGPath` class.
 *
 * @module graphics
 * @class SVGPath
 * @extends SVGShape
 * @constructor
 */
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2155);
SVGPath = function(cfg)
{
	_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "SVGPath", 2155);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2157);
SVGPath.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2159);
SVGPath.NAME = "path";
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2160);
Y.extend(SVGPath, Y.SVGShape, {
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
     * Indicates the type of shape
     *
     * @property _type
     * @readOnly
     * @type String
     * @private
     */
    _type: "path",

    /**
     * Storage for path
     *
     * @property _path
     * @type String
     * @private
     */
	_path: ""
});

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2217);
SVGPath.ATTRS = Y.merge(Y.SVGShape.ATTRS, {
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
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2228);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2230);
return this._path;
		}
	},

	/**
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
	width: {
		getter: function()
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2241);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2243);
var val = Math.max(this._right - this._left, 0);
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2244);
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
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2255);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2257);
return Math.max(this._bottom - this._top, 0);
		}
	}
});
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2261);
Y.SVGPath = SVGPath;
/**
 * <a href="http://www.w3.org/TR/SVG/">SVG</a> implementation of the <a href="Rect.html">`Rect`</a> class.
 * `SVGRect` is not intended to be used directly. Instead, use the <a href="Rect.html">`Rect`</a> class.
 * If the browser has <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities, the <a href="Rect.html">`Rect`</a>
 * class will point to the `SVGRect` class.
 *
 * @module graphics
 * @class SVGRect
 * @constructor
 */
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2272);
SVGRect = function()
{
	_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "SVGRect", 2272);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2274);
SVGRect.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2276);
SVGRect.NAME = "rect";
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2277);
Y.extend(SVGRect, Y.SVGShape, {
    /**
     * Indicates the type of shape
     *
     * @property _type
     * @type String
     * @private
     */
    _type: "rect"
 });
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2287);
SVGRect.ATTRS = Y.SVGShape.ATTRS;
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2288);
Y.SVGRect = SVGRect;
/**
 * <a href="http://www.w3.org/TR/SVG/">SVG</a> implementation of the <a href="Ellipse.html">`Ellipse`</a> class.
 * `SVGEllipse` is not intended to be used directly. Instead, use the <a href="Ellipse.html">`Ellipse`</a> class.
 * If the browser has <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities, the <a href="Ellipse.html">`Ellipse`</a>
 * class will point to the `SVGEllipse` class.
 *
 * @module graphics
 * @class SVGEllipse
 * @constructor
 */
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2299);
SVGEllipse = function(cfg)
{
	_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "SVGEllipse", 2299);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2301);
SVGEllipse.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2304);
SVGEllipse.NAME = "ellipse";

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2306);
Y.extend(SVGEllipse, SVGShape, {
	/**
	 * Indicates the type of shape
	 *
	 * @property _type
	 * @type String
     * @private
	 */
	_type: "ellipse",

	/**
	 * Updates the shape.
	 *
	 * @method _draw
	 * @private
	 */
	_draw: function()
	{
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_draw", 2322);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2324);
var node = this.node,
			w = this.get("width"),
			h = this.get("height"),
			x = this.get("x"),
			y = this.get("y"),
			xRadius = w * 0.5,
			yRadius = h * 0.5,
			cx = x + xRadius,
			cy = y + yRadius;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2333);
node.setAttribute("rx", xRadius);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2334);
node.setAttribute("ry", yRadius);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2335);
node.setAttribute("cx", cx);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2336);
node.setAttribute("cy", cy);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2337);
this._fillChangeHandler();
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2338);
this._strokeChangeHandler();
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2339);
this._updateTransform();
	}
});

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2343);
SVGEllipse.ATTRS = Y.merge(SVGShape.ATTRS, {
	/**
	 * Horizontal radius for the ellipse.
	 *
	 * @config xRadius
	 * @type Number
	 */
	xRadius: {
		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2351);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2353);
this.set("width", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2356);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2358);
var val = this.get("width");
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2359);
if(val)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2361);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2363);
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
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2375);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2377);
this.set("height", val * 2);
		},

		getter: function()
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2380);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2382);
var val = this.get("height");
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2383);
if(val)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2385);
val *= 0.5;
			}
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2387);
return val;
		}
	}
});
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2391);
Y.SVGEllipse = SVGEllipse;
/**
 * <a href="http://www.w3.org/TR/SVG/">SVG</a> implementation of the <a href="Circle.html">`Circle`</a> class.
 * `SVGCircle` is not intended to be used directly. Instead, use the <a href="Circle.html">`Circle`</a> class.
 * If the browser has <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities, the <a href="Circle.html">`Circle`</a>
 * class will point to the `SVGCircle` class.
 *
 * @module graphics
 * @class SVGCircle
 * @constructor
 */
 _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2402);
SVGCircle = function(cfg)
 {
    _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "SVGCircle", 2402);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2404);
SVGCircle.superclass.constructor.apply(this, arguments);
 };

 _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2407);
SVGCircle.NAME = "circle";

 _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2409);
Y.extend(SVGCircle, Y.SVGShape, {

    /**
     * Indicates the type of shape
     *
     * @property _type
     * @type String
     * @private
     */
    _type: "circle",

    /**
     * Updates the shape.
     *
     * @method _draw
     * @private
     */
    _draw: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_draw", 2426);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2428);
var node = this.node,
            x = this.get("x"),
            y = this.get("y"),
            radius = this.get("radius"),
            cx = x + radius,
            cy = y + radius;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2434);
node.setAttribute("r", radius);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2435);
node.setAttribute("cx", cx);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2436);
node.setAttribute("cy", cy);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2437);
this._fillChangeHandler();
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2438);
this._strokeChangeHandler();
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2439);
this._updateTransform();
    }
 });

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2443);
SVGCircle.ATTRS = Y.merge(Y.SVGShape.ATTRS, {
	/**
	 * Indicates the width of the shape
	 *
	 * @config width
	 * @type Number
	 */
    width: {
        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2451);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2453);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2454);
return val;
        },

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2457);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2459);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2470);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2472);
this.set("radius", val/2);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2473);
return val;
        },

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2476);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2478);
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
        value: 0
    }
});
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2492);
Y.SVGCircle = SVGCircle;
/**
 * Draws pie slices
 *
 * @module graphics
 * @class SVGPieSlice
 * @constructor
 */
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2500);
SVGPieSlice = function()
{
	_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "SVGPieSlice", 2500);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2502);
SVGPieSlice.superclass.constructor.apply(this, arguments);
};
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2504);
SVGPieSlice.NAME = "svgPieSlice";
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2505);
Y.extend(SVGPieSlice, Y.SVGShape, Y.mix({
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_draw", 2521);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2523);
var x = this.get("cx"),
            y = this.get("cy"),
            startAngle = this.get("startAngle"),
            arc = this.get("arc"),
            radius = this.get("radius");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2528);
this.clear();
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2529);
this.drawWedge(x, y, startAngle, arc, radius);
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2530);
this.end();
	}
 }, Y.SVGDrawing.prototype));
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2533);
SVGPieSlice.ATTRS = Y.mix({
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
}, Y.SVGShape.ATTRS);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2571);
Y.SVGPieSlice = SVGPieSlice;
/**
 * <a href="http://www.w3.org/TR/SVG/">SVG</a> implementation of the <a href="Graphic.html">`Graphic`</a> class.
 * `SVGGraphic` is not intended to be used directly. Instead, use the <a href="Graphic.html">`Graphic`</a> class.
 * If the browser has <a href="http://www.w3.org/TR/SVG/">SVG</a> capabilities, the <a href="Graphic.html">`Graphic`</a>
 * class will point to the `SVGGraphic` class.
 *
 * @module graphics
 * @class SVGGraphic
 * @constructor
 */
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2582);
SVGGraphic = function(cfg) {
    _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "SVGGraphic", 2582);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2583);
SVGGraphic.superclass.constructor.apply(this, arguments);
};

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2586);
SVGGraphic.NAME = "svgGraphic";

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2588);
SVGGraphic.ATTRS = {
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
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "valueFn", 2605);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2607);
return Y.guid();
		},

		setter: function(val)
		{
			_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2610);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2612);
var node = this._node;
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2613);
if(node)
			{
				_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2615);
node.setAttribute("id", val);
			}
			_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2617);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2631);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2633);
return this._shapes;
        }
    },

    /**
     *  Object containing size and coordinate data for the content of a Graphic in relation to the coordSpace node.
     *
     *  @config contentBounds
     *  @type Object
     *  @readOnly
     */
    contentBounds: {
        readOnly: true,

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2647);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2649);
return this._contentBounds;
        }
    },

    /**
     *  The html element that represents to coordinate system of the Graphic instance.
     *
     *  @config node
     *  @type HTMLElement
     *  @readOnly
     */
    node: {
        readOnly: true,

        getter: function()
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2663);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2665);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2676);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2678);
if(this._node)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2680);
this._node.style.width = val + "px";
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2682);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2693);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2695);
if(this._node)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2697);
this._node.style.height = val  + "px";
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2699);
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
     * The contentBounds will resize to greater values but not to smaller values. (for performance)
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2770);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2772);
return this._x;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2775);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2777);
this._x = val;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2778);
if(this._node)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2780);
this._node.style.left = val + "px";
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2782);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getter", 2793);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2795);
return this._y;
        },

        setter: function(val)
        {
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2798);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2800);
this._y = val;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2801);
if(this._node)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2803);
this._node.style.top = val + "px";
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2805);
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
            _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "setter", 2825);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2827);
this._toggleVisible(val);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2828);
return val;
        }
    },

    //
    //  Indicates the pointer-events setting for the svg:svg element.
    //
    //  @config pointerEvents
    //  @type String
    //
    pointerEvents: {
        value: "none"
    }
};

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2843);
Y.extend(SVGGraphic, Y.GraphicBase, {
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
		_yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "set", 2853);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2855);
var host = this,
            redrawAttrs = {
                autoDraw: true,
                autoSize: true,
                preserveAspectRatio: true,
                resizeDown: true
            },
            key,
            forceRedraw = false;
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2864);
AttributeLite.prototype.set.apply(host, arguments);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2865);
if(host._state.autoDraw === true && Y.Object.size(this._shapes) > 0)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2867);
if(Y_LANG.isString && redrawAttrs[attr])
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2869);
forceRedraw = true;
            }
            else {_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2871);
if(Y_LANG.isObject(attr))
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2873);
for(key in redrawAttrs)
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2875);
if(redrawAttrs.hasOwnProperty(key) && attr[key])
                    {
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2877);
forceRedraw = true;
                        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2878);
break;
                    }
                }
            }}
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2883);
if(forceRedraw)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2885);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getXY", 2913);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2915);
var node = Y.one(this._node),
            xy;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2917);
if(node)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2919);
xy = node.getXY();
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2921);
return xy;
    },

    /**
     * Initializes the class.
     *
     * @method initializer
     * @private
     */
    initializer: function() {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "initializer", 2930);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2931);
var render = this.get("render"),
            visibility = this.get("visible") ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2933);
this._shapes = {};
		_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2934);
this._contentBounds = {
            left: 0,
            top: 0,
            right: 0,
            bottom: 0
        };
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2940);
this._gradients = {};
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2941);
this._node = DOCUMENT.createElement('div');
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2942);
this._node.style.position = "absolute";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2943);
this._node.style.left = this.get("x") + "px";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2944);
this._node.style.top = this.get("y") + "px";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2945);
this._node.style.visibility = visibility;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2946);
this._contentNode = this._createGraphics();
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2947);
this._contentNode.style.visibility = visibility;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2948);
this._contentNode.setAttribute("id", this.get("id"));
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2949);
this._node.appendChild(this._contentNode);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2950);
if(render)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2952);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "render", 2962);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2963);
var parentNode = Y.one(render),
            w = this.get("width") || parseInt(parentNode.getComputedStyle("width"), 10),
            h = this.get("height") || parseInt(parentNode.getComputedStyle("height"), 10);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2966);
parentNode = parentNode || Y.one(DOCUMENT.body);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2967);
parentNode.append(this._node);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2968);
this.parentNode = parentNode;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2969);
this.set("width", w);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2970);
this.set("height", h);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2971);
return this;
    },

    /**
     * Removes all nodes.
     *
     * @method destroy
     */
    destroy: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "destroy", 2979);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 2981);
this.removeAllShapes();
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2982);
if(this._contentNode)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2984);
this._removeChildren(this._contentNode);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2985);
if(this._contentNode.parentNode)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2987);
this._contentNode.parentNode.removeChild(this._contentNode);
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2989);
this._contentNode = null;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2991);
if(this._node)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2993);
this._removeChildren(this._node);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2994);
Y.one(this._node).remove(true);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 2995);
this._node = null;
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "addShape", 3006);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3008);
cfg.graphic = this;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3009);
if(!this.get("visible"))
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3011);
cfg.visible = false;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3013);
var shapeClass = this._getShapeClass(cfg.type),
            shape = new shapeClass(cfg);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3015);
this._appendShape(shape);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3016);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_appendShape", 3026);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3028);
var node = shape.node,
            parentNode = this._frag || this._contentNode;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3030);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3032);
parentNode.appendChild(node);
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3036);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "removeShape", 3046);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3048);
if(!(shape instanceof SVGShape))
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3050);
if(Y_LANG.isString(shape))
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3052);
shape = this._shapes[shape];
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3055);
if(shape && shape instanceof SVGShape)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3057);
shape._destroy();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3058);
delete this._shapes[shape.get("id")];
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3060);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3062);
this._redraw();
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3064);
return shape;
    },

    /**
     * Removes all shape instances from the dom.
     *
     * @method removeAllShapes
     */
    removeAllShapes: function()
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "removeAllShapes", 3072);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3074);
var shapes = this._shapes,
            i;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3076);
for(i in shapes)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3078);
if(shapes.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3080);
shapes[i]._destroy();
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3083);
this._shapes = {};
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_removeChildren", 3093);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3095);
if(node.hasChildNodes())
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3097);
var child;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3098);
while(node.firstChild)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3100);
child = node.firstChild;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3101);
this._removeChildren(child);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3102);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "clear", 3112);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3113);
this.removeAllShapes();
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_toggleVisible", 3123);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3125);
var i,
            shapes = this._shapes,
            visibility = val ? "visible" : "hidden";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3128);
if(shapes)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3130);
for(i in shapes)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3132);
if(shapes.hasOwnProperty(i))
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3134);
shapes[i].set("visible", val);
                }
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3138);
if(this._contentNode)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3140);
this._contentNode.style.visibility = visibility;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3142);
if(this._node)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3144);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_getShapeClass", 3156);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3158);
var shape = this._shapeClass[val];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3159);
if(shape)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3161);
return shape;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3163);
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
        circle: Y.SVGCircle,
        rect: Y.SVGRect,
        path: Y.SVGPath,
        ellipse: Y.SVGEllipse,
        pieslice: Y.SVGPieSlice
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getShapeById", 3188);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3190);
var shape = this._shapes[id];
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3191);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "batch", 3200);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3202);
var autoDraw = this.get("autoDraw");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3203);
this.set("autoDraw", false);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3204);
method();
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3205);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_getDocFrag", 3215);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3217);
if(!this._frag)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3219);
this._frag = DOCUMENT.createDocumentFragment();
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3221);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_redraw", 3230);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3232);
var autoSize = this.get("autoSize"),
            preserveAspectRatio = this.get("preserveAspectRatio"),
            box = this.get("resizeDown") ? this._getUpdatedContentBounds() : this._contentBounds,
            left = box.left,
            right = box.right,
            top = box.top,
            bottom = box.bottom,
            width = right - left,
            height = bottom - top,
            computedWidth,
            computedHeight,
            computedLeft,
            computedTop,
            node;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3246);
if(autoSize)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3248);
if(autoSize == "sizeContentToGraphic")
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3250);
node = Y.one(this._node);
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3251);
computedWidth = parseFloat(node.getComputedStyle("width"));
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3252);
computedHeight = parseFloat(node.getComputedStyle("height"));
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3253);
computedLeft = computedTop = 0;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3254);
this._contentNode.setAttribute("preserveAspectRatio", preserveAspectRatio);
            }
            else
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3258);
computedWidth = width;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3259);
computedHeight = height;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3260);
computedLeft = left;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3261);
computedTop = top;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3262);
this._state.width = width;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3263);
this._state.height = height;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3264);
if(this._node)
                {
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3266);
this._node.style.width = width + "px";
                    _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3267);
this._node.style.height = height + "px";
                }
            }
        }
        else
        {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3273);
computedWidth = width;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3274);
computedHeight = height;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3275);
computedLeft = left;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3276);
computedTop = top;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3278);
if(this._contentNode)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3280);
this._contentNode.style.left = computedLeft + "px";
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3281);
this._contentNode.style.top = computedTop + "px";
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3282);
this._contentNode.setAttribute("width", computedWidth);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3283);
this._contentNode.setAttribute("height", computedHeight);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3284);
this._contentNode.style.width = computedWidth + "px";
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3285);
this._contentNode.style.height = computedHeight + "px";
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3286);
this._contentNode.setAttribute("viewBox", "" + left + " " + top + " " + width + " " + height + "");
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3288);
if(this._frag)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3290);
if(this._contentNode)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3292);
this._contentNode.appendChild(this._frag);
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3294);
this._frag = null;
        }
    },

    /**
     * Adds a shape to the redraw queue and calculates the contentBounds. Used internally
     * by `Shape` instances.
     *
     * @method addToRedrawQueue
     * @param shape {SVGShape}
     * @protected
     */
    addToRedrawQueue: function(shape)
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "addToRedrawQueue", 3306);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3308);
var shapeBox,
            box;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3310);
this._shapes[shape.get("id")] = shape;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3311);
if(!this.get("resizeDown"))
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3313);
shapeBox = shape.getBounds();
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3314);
box = this._contentBounds;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3315);
box.left = box.left < shapeBox.left ? box.left : shapeBox.left;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3316);
box.top = box.top < shapeBox.top ? box.top : shapeBox.top;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3317);
box.right = box.right > shapeBox.right ? box.right : shapeBox.right;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3318);
box.bottom = box.bottom > shapeBox.bottom ? box.bottom : shapeBox.bottom;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3319);
box.width = box.right - box.left;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3320);
box.height = box.bottom - box.top;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3321);
this._contentBounds = box;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3323);
if(this.get("autoDraw"))
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3325);
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
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_getUpdatedContentBounds", 3336);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3338);
var bounds,
            i,
            shape,
            queue = this._shapes,
            box = {};
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3343);
for(i in queue)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3345);
if(queue.hasOwnProperty(i))
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3347);
shape = queue[i];
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3348);
bounds = shape.getBounds();
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3349);
box.left = Y_LANG.isNumber(box.left) ? Math.min(box.left, bounds.left) : bounds.left;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3350);
box.top = Y_LANG.isNumber(box.top) ? Math.min(box.top, bounds.top) : bounds.top;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3351);
box.right = Y_LANG.isNumber(box.right) ? Math.max(box.right, bounds.right) : bounds.right;
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3352);
box.bottom = Y_LANG.isNumber(box.bottom) ? Math.max(box.bottom, bounds.bottom) : bounds.bottom;
            }
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3355);
box.left = Y_LANG.isNumber(box.left) ? box.left : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3356);
box.top = Y_LANG.isNumber(box.top) ? box.top : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3357);
box.right = Y_LANG.isNumber(box.right) ? box.right : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3358);
box.bottom = Y_LANG.isNumber(box.bottom) ? box.bottom : 0;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3359);
this._contentBounds = box;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3360);
return box;
    },

    /**
     * Creates a contentNode element
     *
     * @method _createGraphics
     * @private
     */
    _createGraphics: function() {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_createGraphics", 3369);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3370);
var contentNode = this._createGraphicNode("svg"),
            pointerEvents = this.get("pointerEvents");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3372);
contentNode.style.position = "absolute";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3373);
contentNode.style.top = "0px";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3374);
contentNode.style.left = "0px";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3375);
contentNode.style.overflow = "auto";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3376);
contentNode.setAttribute("overflow", "auto");
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3377);
contentNode.setAttribute("pointer-events", pointerEvents);
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3378);
return contentNode;
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
    _createGraphicNode: function(type, pe)
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_createGraphicNode", 3390);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3392);
var node = DOCUMENT.createElementNS("http://www.w3.org/2000/svg", "svg:" + type),
            v = pe || "none";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3394);
if(type !== "defs" && type !== "stop" && type !== "linearGradient" && type != "radialGradient")
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3396);
node.setAttribute("pointer-events", v);
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3398);
return node;
    },

    /**
     * Returns a reference to a gradient definition based on an id and type.
     *
     * @method getGradientNode
     * @param {String} key id that references the gradient definition
     * @param {String} type description of the gradient type
     * @return HTMLElement
     * @protected
     */
    getGradientNode: function(key, type)
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "getGradientNode", 3410);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3412);
var gradients = this._gradients,
            gradient,
            nodeType = type + "Gradient";
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3415);
if(gradients.hasOwnProperty(key) && gradients[key].tagName.indexOf(type) > -1)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3417);
gradient = this._gradients[key];
        }
        else
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3421);
gradient = this._createGraphicNode(nodeType);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3422);
if(!this._defs)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3424);
this._defs = this._createGraphicNode("defs");
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3425);
this._contentNode.appendChild(this._defs);
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3427);
this._defs.appendChild(gradient);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3428);
key = key || "gradient" + Math.round(100000 * Math.random());
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3429);
gradient.setAttribute("id", key);
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3430);
if(gradients.hasOwnProperty(key))
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3432);
this._defs.removeChild(gradients[key]);
            }
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3434);
gradients[key] = gradient;
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3436);
return gradient;
    },

    /**
     * Inserts shape on the top of the tree.
     *
     * @method _toFront
     * @param {SVGShape} Shape to add.
     * @private
     */
    _toFront: function(shape)
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_toFront", 3446);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3448);
var contentNode = this._contentNode;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3449);
if(shape instanceof Y.SVGShape)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3451);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3453);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3455);
contentNode.appendChild(shape);
        }
    },

    /**
     * Inserts shape as the first child of the content node.
     *
     * @method _toBack
     * @param {SVGShape} Shape to add.
     * @private
     */
    _toBack: function(shape)
    {
        _yuitest_coverfunc("build/graphics-svg/graphics-svg.js", "_toBack", 3466);
_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3468);
var contentNode = this._contentNode,
            targetNode;
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3470);
if(shape instanceof Y.SVGShape)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3472);
shape = shape.get("node");
        }
        _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3474);
if(contentNode && shape)
        {
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3476);
targetNode = contentNode.firstChild;
            _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3477);
if(targetNode)
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3479);
contentNode.insertBefore(shape, targetNode);
            }
            else
            {
                _yuitest_coverline("build/graphics-svg/graphics-svg.js", 3483);
contentNode.appendChild(shape);
            }
        }
    }
});

_yuitest_coverline("build/graphics-svg/graphics-svg.js", 3489);
Y.SVGGraphic = SVGGraphic;



}, '@VERSION@', {"requires": ["graphics"]});
