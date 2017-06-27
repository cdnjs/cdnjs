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
_yuitest_coverage["/build/matrix/matrix.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "/build/matrix/matrix.js",
    code: []
};
_yuitest_coverage["/build/matrix/matrix.js"].code=["YUI.add('matrix', function(Y) {","","var MatrixUtil = {","        /**","         * Used as value for the _rounding method.","         *","         * @property _rounder","         * @private","         */","        _rounder: 100000,","        ","        /**","         * Rounds values","         *","         * @method _round","         * @private","         */","        _round: function(val) {","            val = Math.round(val * MatrixUtil._rounder) / MatrixUtil._rounder;","            return val;","        },","        /**","         * Converts a radian value to a degree.","         *","         * @method rad2deg","         * @param {Number} rad Radian value to be converted.","         * @return Number","         */","        rad2deg: function(rad) {","            var deg = rad * (180 / Math.PI);","            return deg;","        },","","        /**","         * Converts a degree value to a radian.","         *","         * @method deg2rad","         * @param {Number} deg Degree value to be converted to radian.","         * @return Number","         */","        deg2rad: function(deg) {","            var rad = deg * (Math.PI / 180);","            return rad;","        },","","        /**","         * Converts an angle to a radian","         *","         * @method angle2rad","         * @param {Objecxt} val Value to be converted to radian.","         * @return Number","         */","        angle2rad: function(val) {","            if (typeof val === 'string' && val.indexOf('rad') > -1) {","                val = parseFloat(val);","            } else { // default to deg","                val = MatrixUtil.deg2rad(parseFloat(val));","            }","","            return val;","        },","","        /**","         * Converts a transform object to an array of column vectors. ","         *","         * /                                             \\","         * | matrix[0][0]   matrix[1][0]    matrix[2][0] |","         * | matrix[0][1]   matrix[1][1]    matrix[2][1] |","         * | matrix[0][2]   matrix[1][2]    matrix[2][2] |","         * \\                                             /","         *","         * @method getnxn","         * @return Array","         */","        convertTransformToArray: function(matrix)","        {","            var matrixArray = [","                    [matrix.a, matrix.c, matrix.dx],","                    [matrix.b, matrix.d, matrix.dy],","                    [0, 0, 1]","                ];","            return matrixArray;","        },","","        /**","         * Returns the determinant of a given matrix. ","         *","         * /                                             \\","         * | matrix[0][0]   matrix[1][0]    matrix[2][0] |","         * | matrix[0][1]   matrix[1][1]    matrix[2][1] |","         * | matrix[0][2]   matrix[1][2]    matrix[2][2] |","         * | matrix[0][3]   matrix[1][3]    matrix[2][3] |","         * \\                                             /","         *","         * @method getDeterminant","         * @param {Array} matrix An nxn matrix represented an array of vector (column) arrays. Each vector array has index for each row.","         * @return Number","         */","        getDeterminant: function(matrix)","        {","            var determinant = 0,","                len = matrix.length,","                i = 0,","                multiplier;","","            if(len == 2)","            {","                return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];","            }","            for(; i < len; ++i)","            {","                multiplier = matrix[i][0];","                if(i % 2 === 0 || i === 0)","                {","                    determinant += multiplier * MatrixUtil.getDeterminant(MatrixUtil.getMinors(matrix, i, 0));  ","                }","                else","                {","                    determinant -= multiplier * MatrixUtil.getDeterminant(MatrixUtil.getMinors(matrix, i, 0));","                }","            }","            return determinant;","        },","","        /**","         * Returns the inverse of a matrix","         *","         * @method inverse","         * @param Array matrix An array representing an nxn matrix","         * @return Array","         *","         * /                                             \\","         * | matrix[0][0]   matrix[1][0]    matrix[2][0] |","         * | matrix[0][1]   matrix[1][1]    matrix[2][1] |","         * | matrix[0][2]   matrix[1][2]    matrix[2][2] |","         * | matrix[0][3]   matrix[1][3]    matrix[2][3] |","         * \\                                             /","         */","        inverse: function(matrix)","        {","            var determinant = 0,","                len = matrix.length,","                i = 0,","                j,","                inverse,","                adjunct = [],","                //vector representing 2x2 matrix","                minor = [];","            if(len === 2) ","            {","                determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];","                inverse = [","                    [matrix[1][1] * determinant, -matrix[1][0] * determinant],","                    [-matrix[0][1] * determinant, matrix[0][0] * determinant]","                ]; ","            }","            else","            {","                determinant = MatrixUtil.getDeterminant(matrix);","                for(; i < len; ++i)","                {","                    adjunct[i] = [];","                    for(j = 0; j < len; ++j)","                    {","                        minor = MatrixUtil.getMinors(matrix, j, i);","                        adjunct[i][j] = MatrixUtil.getDeterminant(minor);","                        if((i + j) % 2 !== 0 && (i + j) !== 0)","                        {","                            adjunct[i][j] *= -1;","                        }","                    }","                }","                inverse = MatrixUtil.scalarMultiply(adjunct, 1/determinant);","            }","            return inverse;","        },","","        /**","         * Multiplies a matrix by a numeric value.","         *","         * @method scalarMultiply","         * @param {Array} matrix The matrix to be altered.","         * @param {Number} multiplier The number to multiply against the matrix.","         * @return Array","         */","        scalarMultiply: function(matrix, multiplier)","        {","            var i = 0,","                j,","                len = matrix.length;","            for(; i < len; ++i)","            {","                for(j = 0; j < len; ++j)","                {","                    matrix[i][j] = MatrixUtil._round(matrix[i][j] * multiplier);","                }","            }","            return matrix;","        },","","        /**","         * Returns the transpose for an nxn matrix.","         *","         * @method transpose","         * @param matrix An nxn matrix represented by an array of vector arrays.","         * @return Array","         */","        transpose: function(matrix)","        {","            var len = matrix.length,","                i = 0,","                j = 0,","                transpose = [];","            for(; i < len; ++i)","            {","                transpose[i] = [];","                for(j = 0; j < len; ++j)","                {","                    transpose[i].push(matrix[j][i]);","                }","            }","            return transpose;","        },","","        /**","         * Returns a matrix of minors based on a matrix, column index and row index.","         *","         * @method getMinors","         * @param {Array} matrix The matrix from which to extract the matrix of minors.","         * @param {Number} columnIndex A zero-based index representing the specified column to exclude.","         * @param {Number} rowIndex A zero-based index represeenting the specified row to exclude.","         * @return Array","         */","        getMinors: function(matrix, columnIndex, rowIndex)","        {","            var minors = [],","                len = matrix.length,","                i = 0,","                j,","                column;","            for(; i < len; ++i)","            {","                if(i !== columnIndex)","                {","                    column = [];","                    for(j = 0; j < len; ++j)","                    {","                        if(j !== rowIndex)","                        {","                            column.push(matrix[i][j]);","                        }","                    }","                    minors.push(column);","                }","            }","            return minors;","        },","","        /**","         * Returns the sign of value","         *","         * @method sign","         * @param {Number} val value to be interpreted","         * @return Number","         */","        sign: function(val)","        {","            return val === 0 ? 1 : val/Math.abs(val);","        },","","        /**","         * Multiplies a vector and a matrix","         *","         * @method vectorMatrixProduct","         * @param {Array} vector Array representing a column vector","         * @param {Array} matrix Array representing an nxn matrix","         * @return Array","         */","        vectorMatrixProduct: function(vector, matrix)","        {","            var i,","                j,","                len = vector.length,","                product = [],","                rowProduct;","            for(i = 0; i < len; ++i)","            {","                rowProduct = 0;","                for(j = 0; j < len; ++j)","                {","                    rowProduct += vector[i] * matrix[i][j];","                }","                product[i] = rowProduct;","            }","            return product;","        },","        ","        /**","         * Breaks up a 2d transform matrix into a series of transform operations.","         *","         * @method decompose","         * @param {Array} 3x3 matrix array","         * @return Array","         */","        decompose: function(matrix)","        {","            var a = parseFloat(matrix[0][0]),","                b = parseFloat(matrix[1][0]),","                c = parseFloat(matrix[0][1]),","                d = parseFloat(matrix[1][1]),","                dx = parseFloat(matrix[0][2]),","                dy = parseFloat(matrix[1][2]),","                rotate,","                sx,","                sy,","                shear;","            if((a * d - b * c) === 0)","            {","                return false;","            }","            //get length of vector(ab)","            sx = MatrixUtil._round(Math.sqrt(a * a + b * b));","            //normalize components of vector(ab)","            a /= sx;","            b /= sx;","            shear = MatrixUtil._round(a * c + b * d);","            c -= a * shear;","            d -= b * shear;","            //get length of vector(cd)","            sy = MatrixUtil._round(Math.sqrt(c * c + d * d));","            //normalize components of vector(cd)","            c /= sy;","            d /= sy;","            shear /=sy;","            shear = MatrixUtil._round(MatrixUtil.rad2deg(Math.atan(shear)));","            rotate = MatrixUtil._round(MatrixUtil.rad2deg(Math.atan2(matrix[1][0], matrix[0][0])));","","            return [","                [\"translate\", dx, dy],","                [\"rotate\", rotate],","                [\"skewX\", shear],","                [\"scale\", sx, sy]","            ];","        },","","        /**","         * Parses a transform string and returns an array of transform arrays.","         *","         * @method getTransformArray ","         * @param {String} val A transform string","         * @return Array","         */","        getTransformArray: function(transform) {","            var re = /\\s*([a-z]*)\\(([\\w,\\.,\\-,\\s]*)\\)/gi,","                transforms = [],","                args,","                m,","                decomp,","                methods = MatrixUtil.transformMethods;","            ","            while ((m = re.exec(transform))) {","                if (methods.hasOwnProperty(m[1])) ","                {","                    args = m[2].split(',');","                    args.unshift(m[1]);","                    transforms.push(args);","                }","                else if(m[1] == \"matrix\")","                {","                    args = m[2].split(',');","                    decomp = MatrixUtil.decompose([","                        [args[0], args[2], args[4]],","                        [args[1], args[3], args[5]],","                        [0, 0, 1]","                    ]);","                    transforms.push(decomp[0]);","                    transforms.push(decomp[1]);","                    transforms.push(decomp[2]);","                    transforms.push(decomp[3]);","                }","            }","            return transforms;","        },","        ","        /**","         * Returns an array of transform arrays representing transform functions and arguments.","         *","         * @method getTransformFunctionArray","         * @return Array","         */","        getTransformFunctionArray: function(transform) {","            var list;","            switch(transform)","            {","                case \"skew\" :","                    list = [transform, 0, 0];","                break;","                case \"scale\" :","                    list = [transform, 1, 1];","                break;","                case \"scaleX\" :","                    list = [transform, 1];","                break;","                case \"scaleY\" :","                    list = [transform, 1];","                break;","                case \"translate\" :","                    list = [transform, 0, 0];","                break;","                default :","                    list = [transform, 0];","                break;","            }","            return list;","        },","","        /**","         * Compares to arrays or transform functions to ensure both contain the same functions in the same ","         * order.","         *","         * @method compareTransformSequence","         * @param {Array} list1 Array to compare","         * @param {Array} list2 Array to compare","         * @return Boolean","         */","        compareTransformSequence: function(list1, list2)","        {","            var i = 0,","                len = list1.length,","                len2 = list2.length,","                isEqual = len === len2;","            if(isEqual)","            {","                for(; i < len; ++i)","                {","                    if(list1[i][0] != list2[i][0])","                    {","                        isEqual = false;","                        break;","                    }","                }","            }","            return isEqual;","        },","","        /**","         * Mapping of possible transform method names.","         *","         * @property transformMethods","         * @type Object","         */","        transformMethods: {","            rotate: \"rotate\",","            skew: \"skew\",","            skewX: \"skewX\",","            skewY: \"skewY\",","            translate: \"translate\",","            translateX: \"translateX\",","            translateY: \"tranlsateY\",","            scale: \"scale\",","            scaleX: \"scaleX\",","            scaleY: \"scaleY\"","        }","","};","","Y.MatrixUtil = MatrixUtil;","","/**"," * Matrix is a class that allows for the manipulation of a transform matrix."," * This class is a work in progress."," *"," * @class Matrix"," * @constructor"," * @module matrix"," */","var Matrix = function(config) {","    this.init(config);","};","","Matrix.prototype = {","    /**","     * Used as value for the _rounding method.","     *","     * @property _rounder","     * @private","     */","    _rounder: 100000,","","    /**","     * Updates the matrix. ","     *","     * @method multiple","     * @param {Number} a ","     * @param {Number} b","     * @param {Number} c","     * @param {Number} d","     * @param {Number} dx","     * @param {Number} dy","     */","    multiply: function(a, b, c, d, dx, dy) {","        var matrix = this,","            matrix_a = matrix.a * a + matrix.c * b,","            matrix_b = matrix.b * a + matrix.d * b,","            matrix_c = matrix.a * c + matrix.c * d,","            matrix_d = matrix.b * c + matrix.d * d,","            matrix_dx = matrix.a * dx + matrix.c * dy + matrix.dx,","            matrix_dy = matrix.b * dx + matrix.d * dy + matrix.dy;","","        matrix.a = this._round(matrix_a);","        matrix.b = this._round(matrix_b);","        matrix.c = this._round(matrix_c);","        matrix.d = this._round(matrix_d);","        matrix.dx = this._round(matrix_dx);","        matrix.dy = this._round(matrix_dy);","        return this;","    },","","    /**","     * Parses a string and updates the matrix.","     *","     * @method applyCSSText","     * @param {String} val A css transform string","     */","    applyCSSText: function(val) {","        var re = /\\s*([a-z]*)\\(([\\w,\\.,\\-,\\s]*)\\)/gi,","            args,","            m;","","        val = val.replace(/matrix/g, \"multiply\");","        while ((m = re.exec(val))) {","            if (typeof this[m[1]] === 'function') {","                args = m[2].split(',');","                this[m[1]].apply(this, args);","            }","        }","    },","    ","    /**","     * Parses a string and returns an array of transform arrays.","     *","     * @method getTransformArray ","     * @param {String} val A css transform string","     * @return Array","     */","    getTransformArray: function(val) {","        var re = /\\s*([a-z]*)\\(([\\w,\\.,\\-,\\s]*)\\)/gi,","            transforms = [],","            args,","            m;","        ","        val = val.replace(/matrix/g, \"multiply\");","        while ((m = re.exec(val))) {","            if (typeof this[m[1]] === 'function') {","                args = m[2].split(',');","                args.unshift(m[1]);","                transforms.push(args);","            }","        }","        return transforms;","    },","","    /**","     * Default values for the matrix","     *","     * @property _defaults","     * @private","     */","    _defaults: {","        a: 1,","        b: 0,","        c: 0,","        d: 1,","        dx: 0,","        dy: 0","    },","","    /**","     * Rounds values","     *","     * @method _round","     * @private","     */","    _round: function(val) {","        val = Math.round(val * this._rounder) / this._rounder;","        return val;","    },","","    /**","     * Initializes a matrix.","     *","     * @method init","     * @param {Object} config Specified key value pairs for matrix properties. If a property is not explicitly defined in the config argument,","     * the default value will be used.","     */","    init: function(config) {","        var defaults = this._defaults,","            prop;","","        config = config || {};","","        for (prop in defaults) {","            if(defaults.hasOwnProperty(prop))","            {","                this[prop] = (prop in config) ? config[prop] : defaults[prop];","            }","        }","","        this._config = config;","    },","","    /**","     * Applies a scale transform","     *","     * @method scale","     * @param {Number} val","     */","    scale: function(x, y) {","        this.multiply(x, 0, 0, y, 0, 0);","        return this;","    },","    ","    /**","     * Applies a skew transformation.","     *","     * @method skew","     * @param {Number} x The value to skew on the x-axis.","     * @param {Number} y The value to skew on the y-axis.","     */","    skew: function(x, y) {","        x = x || 0;","        y = y || 0;","","        if (x !== undefined) { // null or undef","            x = Math.tan(this.angle2rad(x));","","        }","","        if (y !== undefined) { // null or undef","            y = Math.tan(this.angle2rad(y));","        }","","        this.multiply(1, y, x, 1, 0, 0);","        return this;","    },","","    /**","     * Applies a skew to the x-coordinate","     *","     * @method skewX","     * @param {Number} x x-coordinate","     */","    skewX: function(x) {","        this.skew(x);","        return this;","    },","","    /**","     * Applies a skew to the y-coordinate","     *","     * @method skewY","     * @param {Number} y y-coordinate","     */","    skewY: function(y) {","        this.skew(null, y);","        return this;","    },","","    /**","     * Returns a string of text that can be used to populate a the css transform property of an element.","     *","     * @method toCSSText","     * @return String","     */","    toCSSText: function() {","        var matrix = this,","            dx = matrix.dx,","            dy = matrix.dy,","            text = 'matrix(';","","","        if (Y.UA.gecko) { // requires unit","            if (!isNaN(dx)) {","                dx += 'px';","            }","            if (!isNaN(dy)) {","                dy += 'px';","            }","        }","","        text +=     matrix.a + ',' + ","                    matrix.b + ',' + ","                    matrix.c + ',' + ","                    matrix.d + ',' + ","                    dx + ',' +","                    dy;","","        text += ')';","","        return text;","    },","","    /**","     * Returns a string that can be used to populate the css filter property of an element.","     *","     * @method toFilterText","     * @return String","     */","    toFilterText: function() {","        var matrix = this,","            text = 'progid:DXImageTransform.Microsoft.Matrix(';","        text +=     'M11=' + matrix.a + ',' + ","                    'M21=' + matrix.b + ',' + ","                    'M12=' + matrix.c + ',' + ","                    'M22=' + matrix.d + ',' +","                    'sizingMethod=\"auto expand\")';","","        text += '';","","        return text;","    },","","    /**","     * Converts a radian value to a degree.","     *","     * @method rad2deg","     * @param {Number} rad Radian value to be converted.","     * @return Number","     */","    rad2deg: function(rad) {","        var deg = rad * (180 / Math.PI);","        return deg;","    },","","    /**","     * Converts a degree value to a radian.","     *","     * @method deg2rad","     * @param {Number} deg Degree value to be converted to radian.","     * @return Number","     */","    deg2rad: function(deg) {","        var rad = deg * (Math.PI / 180);","        return rad;","    },","","    angle2rad: function(val) {","        if (typeof val === 'string' && val.indexOf('rad') > -1) {","            val = parseFloat(val);","        } else { // default to deg","            val = this.deg2rad(parseFloat(val));","        }","","        return val;","    },","","    /**","     * Applies a rotate transform.","     *","     * @method rotate","     * @param {Number} deg The degree of the rotation.","     */","    rotate: function(deg, x, y) {","        var rad = this.angle2rad(deg),","            sin = Math.sin(rad),","            cos = Math.cos(rad);","        this.multiply(cos, sin, 0 - sin, cos, 0, 0);","        return this;","    },","","    /**","     * Applies translate transformation.","     *","     * @method translate","     * @param {Number} x The value to transate on the x-axis.","     * @param {Number} y The value to translate on the y-axis.","     */","    translate: function(x, y) {","        x = parseFloat(x) || 0;","        y = parseFloat(y) || 0;","        this.multiply(1, 0, 0, 1, x, y);","        return this;","    },","    ","    /**","     * Applies a translate to the x-coordinate","     *","     * @method translateX","     * @param {Number} x x-coordinate","     */","    translateX: function(x) {","        this.translate(x);","        return this;","    },","","    /**","     * Applies a translate to the y-coordinate","     *","     * @method translateY","     * @param {Number} y y-coordinate","     */","    translateY: function(y) {","        this.translate(null, y);","        return this;","    },","","","    /**","     * Returns an identity matrix.","     *","     * @method identity","     * @return Object","     */","    identity: function() {","        var config = this._config,","            defaults = this._defaults,","            prop;","","        for (prop in config) {","            if (prop in defaults) {","                this[prop] = defaults[prop];","            }","        }","        return this;","    },","","    /**","     * Returns a 3x3 Matrix array","     *","     * /                                             \\","     * | matrix[0][0]   matrix[1][0]    matrix[2][0] |","     * | matrix[0][1]   matrix[1][1]    matrix[2][1] |","     * | matrix[0][2]   matrix[1][2]    matrix[2][2] |","     * \\                                             /","     *","     * @method getMatrixArray","     * @return Array","     */","    getMatrixArray: function()","    {","        var matrix = this,","            matrixArray = [","                [matrix.a, matrix.c, matrix.dx],","                [matrix.b, matrix.d, matrix.dy],","                [0, 0, 1]","            ];","        return matrixArray;","    },","","    /**","     * Returns the left, top, right and bottom coordinates for a transformed","     * item.","     *","     * @method getContentRect","     * @param {Number} width The width of the item.","     * @param {Number} height The height of the item.","     * @param {Number} x The x-coordinate of the item.","     * @param {Number} y The y-coordinate of the item.","     * @return Object","     */","    getContentRect: function(width, height, x, y)","    {","        var left = !isNaN(x) ? x : 0,","            top = !isNaN(y) ? y : 0,","            right = left + width,","            bottom = top + height,","            matrix = this,","            a = matrix.a,","            b = matrix.b,","            c = matrix.c,","            d = matrix.d,","            dx = matrix.dx,","            dy = matrix.dy,","            x1 = (a * left + c * top + dx), ","            y1 = (b * left + d * top + dy),","            //[x2, y2]","            x2 = (a * right + c * top + dx),","            y2 = (b * right + d * top + dy),","            //[x3, y3]","            x3 = (a * left + c * bottom + dx),","            y3 = (b * left + d * bottom + dy),","            //[x4, y4]","            x4 = (a * right + c * bottom + dx),","            y4 = (b * right + d * bottom + dy);","        return {","            left: Math.min(x3, Math.min(x1, Math.min(x2, x4))),","            right: Math.max(x3, Math.max(x1, Math.max(x2, x4))),","            top: Math.min(y2, Math.min(y4, Math.min(y3, y1))),","            bottom: Math.max(y2, Math.max(y4, Math.max(y3, y1)))","        };","    },       ","    ","    /**","     * Returns the determinant of the matrix.","     *","     * @method getDeterminant","     * @return Number","     */","    getDeterminant: function()","    {","        return Y.MatrixUtil.getDeterminant(this.getMatrixArray());","    },","","    /**","     * Returns the inverse (in array form) of the matrix.","     *","     * @method inverse","     * @return Array","     */","    inverse: function()","    {","        return Y.MatrixUtil.inverse(this.getMatrixArray());","    },","","    /**","     * Returns the transpose of the matrix","     *","     * @method transpose","     * @return Array","     */","    transpose: function()","    {","        return Y.MatrixUtil.transpose(this.getMatrixArray());","    },","","    /**","     * Returns an array of transform commands that represent the matrix.","     *","     * @method decompose","     * @return Array","     */","    decompose: function()","    {","        return Y.MatrixUtil.decompose(this.getMatrixArray());","    }","};","","Y.Matrix = Matrix;","","","}, '@VERSION@' ,{requires:['yui-base']});"];
_yuitest_coverage["/build/matrix/matrix.js"].lines = {"1":0,"3":0,"19":0,"20":0,"30":0,"31":0,"42":0,"43":0,"54":0,"55":0,"57":0,"60":0,"77":0,"82":0,"101":0,"106":0,"108":0,"110":0,"112":0,"113":0,"115":0,"119":0,"122":0,"141":0,"149":0,"151":0,"152":0,"159":0,"160":0,"162":0,"163":0,"165":0,"166":0,"167":0,"169":0,"173":0,"175":0,"188":0,"191":0,"193":0,"195":0,"198":0,"210":0,"214":0,"216":0,"217":0,"219":0,"222":0,"236":0,"241":0,"243":0,"245":0,"246":0,"248":0,"250":0,"253":0,"256":0,"268":0,"281":0,"286":0,"288":0,"289":0,"291":0,"293":0,"295":0,"307":0,"317":0,"319":0,"322":0,"324":0,"325":0,"326":0,"327":0,"328":0,"330":0,"332":0,"333":0,"334":0,"335":0,"336":0,"338":0,"354":0,"361":0,"362":0,"364":0,"365":0,"366":0,"368":0,"370":0,"371":0,"376":0,"377":0,"378":0,"379":0,"382":0,"392":0,"393":0,"396":0,"397":0,"399":0,"400":0,"402":0,"403":0,"405":0,"406":0,"408":0,"409":0,"411":0,"412":0,"414":0,"428":0,"432":0,"434":0,"436":0,"438":0,"439":0,"443":0,"467":0,"477":0,"478":0,"481":0,"502":0,"510":0,"511":0,"512":0,"513":0,"514":0,"515":0,"516":0,"526":0,"530":0,"531":0,"532":0,"533":0,"534":0,"547":0,"552":0,"553":0,"554":0,"555":0,"556":0,"557":0,"560":0,"585":0,"586":0,"597":0,"600":0,"602":0,"603":0,"605":0,"609":0,"619":0,"620":0,"631":0,"632":0,"634":0,"635":0,"639":0,"640":0,"643":0,"644":0,"654":0,"655":0,"665":0,"666":0,"676":0,"682":0,"683":0,"684":0,"686":0,"687":0,"691":0,"698":0,"700":0,"710":0,"712":0,"718":0,"720":0,"731":0,"732":0,"743":0,"744":0,"748":0,"749":0,"751":0,"754":0,"764":0,"767":0,"768":0,"779":0,"780":0,"781":0,"782":0,"792":0,"793":0,"803":0,"804":0,"815":0,"819":0,"820":0,"821":0,"824":0,"841":0,"847":0,"863":0,"885":0,"901":0,"912":0,"923":0,"934":0,"938":0};
_yuitest_coverage["/build/matrix/matrix.js"].functions = {"_round:18":0,"rad2deg:29":0,"deg2rad:41":0,"angle2rad:53":0,"convertTransformToArray:75":0,"getDeterminant:99":0,"inverse:139":0,"scalarMultiply:186":0,"transpose:208":0,"getMinors:234":0,"sign:266":0,"vectorMatrixProduct:279":0,"decompose:305":0,"getTransformArray:353":0,"getTransformFunctionArray:391":0,"compareTransformSequence:426":0,"Matrix:477":0,"multiply:501":0,"applyCSSText:525":0,"getTransformArray:546":0,"_round:584":0,"init:596":0,"scale:618":0,"skew:630":0,"skewX:653":0,"skewY:664":0,"toCSSText:675":0,"toFilterText:709":0,"rad2deg:730":0,"deg2rad:742":0,"angle2rad:747":0,"rotate:763":0,"translate:778":0,"translateX:791":0,"translateY:802":0,"identity:814":0,"getMatrixArray:839":0,"getContentRect:861":0,"getDeterminant:899":0,"inverse:910":0,"transpose:921":0,"decompose:932":0,"(anonymous 1):1":0};
_yuitest_coverage["/build/matrix/matrix.js"].coveredLines = 211;
_yuitest_coverage["/build/matrix/matrix.js"].coveredFunctions = 43;
_yuitest_coverline("/build/matrix/matrix.js", 1);
YUI.add('matrix', function(Y) {

_yuitest_coverfunc("/build/matrix/matrix.js", "(anonymous 1)", 1);
_yuitest_coverline("/build/matrix/matrix.js", 3);
var MatrixUtil = {
        /**
         * Used as value for the _rounding method.
         *
         * @property _rounder
         * @private
         */
        _rounder: 100000,
        
        /**
         * Rounds values
         *
         * @method _round
         * @private
         */
        _round: function(val) {
            _yuitest_coverfunc("/build/matrix/matrix.js", "_round", 18);
_yuitest_coverline("/build/matrix/matrix.js", 19);
val = Math.round(val * MatrixUtil._rounder) / MatrixUtil._rounder;
            _yuitest_coverline("/build/matrix/matrix.js", 20);
return val;
        },
        /**
         * Converts a radian value to a degree.
         *
         * @method rad2deg
         * @param {Number} rad Radian value to be converted.
         * @return Number
         */
        rad2deg: function(rad) {
            _yuitest_coverfunc("/build/matrix/matrix.js", "rad2deg", 29);
_yuitest_coverline("/build/matrix/matrix.js", 30);
var deg = rad * (180 / Math.PI);
            _yuitest_coverline("/build/matrix/matrix.js", 31);
return deg;
        },

        /**
         * Converts a degree value to a radian.
         *
         * @method deg2rad
         * @param {Number} deg Degree value to be converted to radian.
         * @return Number
         */
        deg2rad: function(deg) {
            _yuitest_coverfunc("/build/matrix/matrix.js", "deg2rad", 41);
_yuitest_coverline("/build/matrix/matrix.js", 42);
var rad = deg * (Math.PI / 180);
            _yuitest_coverline("/build/matrix/matrix.js", 43);
return rad;
        },

        /**
         * Converts an angle to a radian
         *
         * @method angle2rad
         * @param {Objecxt} val Value to be converted to radian.
         * @return Number
         */
        angle2rad: function(val) {
            _yuitest_coverfunc("/build/matrix/matrix.js", "angle2rad", 53);
_yuitest_coverline("/build/matrix/matrix.js", 54);
if (typeof val === 'string' && val.indexOf('rad') > -1) {
                _yuitest_coverline("/build/matrix/matrix.js", 55);
val = parseFloat(val);
            } else { // default to deg
                _yuitest_coverline("/build/matrix/matrix.js", 57);
val = MatrixUtil.deg2rad(parseFloat(val));
            }

            _yuitest_coverline("/build/matrix/matrix.js", 60);
return val;
        },

        /**
         * Converts a transform object to an array of column vectors. 
         *
         * /                                             \
         * | matrix[0][0]   matrix[1][0]    matrix[2][0] |
         * | matrix[0][1]   matrix[1][1]    matrix[2][1] |
         * | matrix[0][2]   matrix[1][2]    matrix[2][2] |
         * \                                             /
         *
         * @method getnxn
         * @return Array
         */
        convertTransformToArray: function(matrix)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "convertTransformToArray", 75);
_yuitest_coverline("/build/matrix/matrix.js", 77);
var matrixArray = [
                    [matrix.a, matrix.c, matrix.dx],
                    [matrix.b, matrix.d, matrix.dy],
                    [0, 0, 1]
                ];
            _yuitest_coverline("/build/matrix/matrix.js", 82);
return matrixArray;
        },

        /**
         * Returns the determinant of a given matrix. 
         *
         * /                                             \
         * | matrix[0][0]   matrix[1][0]    matrix[2][0] |
         * | matrix[0][1]   matrix[1][1]    matrix[2][1] |
         * | matrix[0][2]   matrix[1][2]    matrix[2][2] |
         * | matrix[0][3]   matrix[1][3]    matrix[2][3] |
         * \                                             /
         *
         * @method getDeterminant
         * @param {Array} matrix An nxn matrix represented an array of vector (column) arrays. Each vector array has index for each row.
         * @return Number
         */
        getDeterminant: function(matrix)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "getDeterminant", 99);
_yuitest_coverline("/build/matrix/matrix.js", 101);
var determinant = 0,
                len = matrix.length,
                i = 0,
                multiplier;

            _yuitest_coverline("/build/matrix/matrix.js", 106);
if(len == 2)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 108);
return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
            }
            _yuitest_coverline("/build/matrix/matrix.js", 110);
for(; i < len; ++i)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 112);
multiplier = matrix[i][0];
                _yuitest_coverline("/build/matrix/matrix.js", 113);
if(i % 2 === 0 || i === 0)
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 115);
determinant += multiplier * MatrixUtil.getDeterminant(MatrixUtil.getMinors(matrix, i, 0));  
                }
                else
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 119);
determinant -= multiplier * MatrixUtil.getDeterminant(MatrixUtil.getMinors(matrix, i, 0));
                }
            }
            _yuitest_coverline("/build/matrix/matrix.js", 122);
return determinant;
        },

        /**
         * Returns the inverse of a matrix
         *
         * @method inverse
         * @param Array matrix An array representing an nxn matrix
         * @return Array
         *
         * /                                             \
         * | matrix[0][0]   matrix[1][0]    matrix[2][0] |
         * | matrix[0][1]   matrix[1][1]    matrix[2][1] |
         * | matrix[0][2]   matrix[1][2]    matrix[2][2] |
         * | matrix[0][3]   matrix[1][3]    matrix[2][3] |
         * \                                             /
         */
        inverse: function(matrix)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "inverse", 139);
_yuitest_coverline("/build/matrix/matrix.js", 141);
var determinant = 0,
                len = matrix.length,
                i = 0,
                j,
                inverse,
                adjunct = [],
                //vector representing 2x2 matrix
                minor = [];
            _yuitest_coverline("/build/matrix/matrix.js", 149);
if(len === 2) 
            {
                _yuitest_coverline("/build/matrix/matrix.js", 151);
determinant = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
                _yuitest_coverline("/build/matrix/matrix.js", 152);
inverse = [
                    [matrix[1][1] * determinant, -matrix[1][0] * determinant],
                    [-matrix[0][1] * determinant, matrix[0][0] * determinant]
                ]; 
            }
            else
            {
                _yuitest_coverline("/build/matrix/matrix.js", 159);
determinant = MatrixUtil.getDeterminant(matrix);
                _yuitest_coverline("/build/matrix/matrix.js", 160);
for(; i < len; ++i)
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 162);
adjunct[i] = [];
                    _yuitest_coverline("/build/matrix/matrix.js", 163);
for(j = 0; j < len; ++j)
                    {
                        _yuitest_coverline("/build/matrix/matrix.js", 165);
minor = MatrixUtil.getMinors(matrix, j, i);
                        _yuitest_coverline("/build/matrix/matrix.js", 166);
adjunct[i][j] = MatrixUtil.getDeterminant(minor);
                        _yuitest_coverline("/build/matrix/matrix.js", 167);
if((i + j) % 2 !== 0 && (i + j) !== 0)
                        {
                            _yuitest_coverline("/build/matrix/matrix.js", 169);
adjunct[i][j] *= -1;
                        }
                    }
                }
                _yuitest_coverline("/build/matrix/matrix.js", 173);
inverse = MatrixUtil.scalarMultiply(adjunct, 1/determinant);
            }
            _yuitest_coverline("/build/matrix/matrix.js", 175);
return inverse;
        },

        /**
         * Multiplies a matrix by a numeric value.
         *
         * @method scalarMultiply
         * @param {Array} matrix The matrix to be altered.
         * @param {Number} multiplier The number to multiply against the matrix.
         * @return Array
         */
        scalarMultiply: function(matrix, multiplier)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "scalarMultiply", 186);
_yuitest_coverline("/build/matrix/matrix.js", 188);
var i = 0,
                j,
                len = matrix.length;
            _yuitest_coverline("/build/matrix/matrix.js", 191);
for(; i < len; ++i)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 193);
for(j = 0; j < len; ++j)
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 195);
matrix[i][j] = MatrixUtil._round(matrix[i][j] * multiplier);
                }
            }
            _yuitest_coverline("/build/matrix/matrix.js", 198);
return matrix;
        },

        /**
         * Returns the transpose for an nxn matrix.
         *
         * @method transpose
         * @param matrix An nxn matrix represented by an array of vector arrays.
         * @return Array
         */
        transpose: function(matrix)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "transpose", 208);
_yuitest_coverline("/build/matrix/matrix.js", 210);
var len = matrix.length,
                i = 0,
                j = 0,
                transpose = [];
            _yuitest_coverline("/build/matrix/matrix.js", 214);
for(; i < len; ++i)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 216);
transpose[i] = [];
                _yuitest_coverline("/build/matrix/matrix.js", 217);
for(j = 0; j < len; ++j)
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 219);
transpose[i].push(matrix[j][i]);
                }
            }
            _yuitest_coverline("/build/matrix/matrix.js", 222);
return transpose;
        },

        /**
         * Returns a matrix of minors based on a matrix, column index and row index.
         *
         * @method getMinors
         * @param {Array} matrix The matrix from which to extract the matrix of minors.
         * @param {Number} columnIndex A zero-based index representing the specified column to exclude.
         * @param {Number} rowIndex A zero-based index represeenting the specified row to exclude.
         * @return Array
         */
        getMinors: function(matrix, columnIndex, rowIndex)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "getMinors", 234);
_yuitest_coverline("/build/matrix/matrix.js", 236);
var minors = [],
                len = matrix.length,
                i = 0,
                j,
                column;
            _yuitest_coverline("/build/matrix/matrix.js", 241);
for(; i < len; ++i)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 243);
if(i !== columnIndex)
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 245);
column = [];
                    _yuitest_coverline("/build/matrix/matrix.js", 246);
for(j = 0; j < len; ++j)
                    {
                        _yuitest_coverline("/build/matrix/matrix.js", 248);
if(j !== rowIndex)
                        {
                            _yuitest_coverline("/build/matrix/matrix.js", 250);
column.push(matrix[i][j]);
                        }
                    }
                    _yuitest_coverline("/build/matrix/matrix.js", 253);
minors.push(column);
                }
            }
            _yuitest_coverline("/build/matrix/matrix.js", 256);
return minors;
        },

        /**
         * Returns the sign of value
         *
         * @method sign
         * @param {Number} val value to be interpreted
         * @return Number
         */
        sign: function(val)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "sign", 266);
_yuitest_coverline("/build/matrix/matrix.js", 268);
return val === 0 ? 1 : val/Math.abs(val);
        },

        /**
         * Multiplies a vector and a matrix
         *
         * @method vectorMatrixProduct
         * @param {Array} vector Array representing a column vector
         * @param {Array} matrix Array representing an nxn matrix
         * @return Array
         */
        vectorMatrixProduct: function(vector, matrix)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "vectorMatrixProduct", 279);
_yuitest_coverline("/build/matrix/matrix.js", 281);
var i,
                j,
                len = vector.length,
                product = [],
                rowProduct;
            _yuitest_coverline("/build/matrix/matrix.js", 286);
for(i = 0; i < len; ++i)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 288);
rowProduct = 0;
                _yuitest_coverline("/build/matrix/matrix.js", 289);
for(j = 0; j < len; ++j)
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 291);
rowProduct += vector[i] * matrix[i][j];
                }
                _yuitest_coverline("/build/matrix/matrix.js", 293);
product[i] = rowProduct;
            }
            _yuitest_coverline("/build/matrix/matrix.js", 295);
return product;
        },
        
        /**
         * Breaks up a 2d transform matrix into a series of transform operations.
         *
         * @method decompose
         * @param {Array} 3x3 matrix array
         * @return Array
         */
        decompose: function(matrix)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "decompose", 305);
_yuitest_coverline("/build/matrix/matrix.js", 307);
var a = parseFloat(matrix[0][0]),
                b = parseFloat(matrix[1][0]),
                c = parseFloat(matrix[0][1]),
                d = parseFloat(matrix[1][1]),
                dx = parseFloat(matrix[0][2]),
                dy = parseFloat(matrix[1][2]),
                rotate,
                sx,
                sy,
                shear;
            _yuitest_coverline("/build/matrix/matrix.js", 317);
if((a * d - b * c) === 0)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 319);
return false;
            }
            //get length of vector(ab)
            _yuitest_coverline("/build/matrix/matrix.js", 322);
sx = MatrixUtil._round(Math.sqrt(a * a + b * b));
            //normalize components of vector(ab)
            _yuitest_coverline("/build/matrix/matrix.js", 324);
a /= sx;
            _yuitest_coverline("/build/matrix/matrix.js", 325);
b /= sx;
            _yuitest_coverline("/build/matrix/matrix.js", 326);
shear = MatrixUtil._round(a * c + b * d);
            _yuitest_coverline("/build/matrix/matrix.js", 327);
c -= a * shear;
            _yuitest_coverline("/build/matrix/matrix.js", 328);
d -= b * shear;
            //get length of vector(cd)
            _yuitest_coverline("/build/matrix/matrix.js", 330);
sy = MatrixUtil._round(Math.sqrt(c * c + d * d));
            //normalize components of vector(cd)
            _yuitest_coverline("/build/matrix/matrix.js", 332);
c /= sy;
            _yuitest_coverline("/build/matrix/matrix.js", 333);
d /= sy;
            _yuitest_coverline("/build/matrix/matrix.js", 334);
shear /=sy;
            _yuitest_coverline("/build/matrix/matrix.js", 335);
shear = MatrixUtil._round(MatrixUtil.rad2deg(Math.atan(shear)));
            _yuitest_coverline("/build/matrix/matrix.js", 336);
rotate = MatrixUtil._round(MatrixUtil.rad2deg(Math.atan2(matrix[1][0], matrix[0][0])));

            _yuitest_coverline("/build/matrix/matrix.js", 338);
return [
                ["translate", dx, dy],
                ["rotate", rotate],
                ["skewX", shear],
                ["scale", sx, sy]
            ];
        },

        /**
         * Parses a transform string and returns an array of transform arrays.
         *
         * @method getTransformArray 
         * @param {String} val A transform string
         * @return Array
         */
        getTransformArray: function(transform) {
            _yuitest_coverfunc("/build/matrix/matrix.js", "getTransformArray", 353);
_yuitest_coverline("/build/matrix/matrix.js", 354);
var re = /\s*([a-z]*)\(([\w,\.,\-,\s]*)\)/gi,
                transforms = [],
                args,
                m,
                decomp,
                methods = MatrixUtil.transformMethods;
            
            _yuitest_coverline("/build/matrix/matrix.js", 361);
while ((m = re.exec(transform))) {
                _yuitest_coverline("/build/matrix/matrix.js", 362);
if (methods.hasOwnProperty(m[1])) 
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 364);
args = m[2].split(',');
                    _yuitest_coverline("/build/matrix/matrix.js", 365);
args.unshift(m[1]);
                    _yuitest_coverline("/build/matrix/matrix.js", 366);
transforms.push(args);
                }
                else {_yuitest_coverline("/build/matrix/matrix.js", 368);
if(m[1] == "matrix")
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 370);
args = m[2].split(',');
                    _yuitest_coverline("/build/matrix/matrix.js", 371);
decomp = MatrixUtil.decompose([
                        [args[0], args[2], args[4]],
                        [args[1], args[3], args[5]],
                        [0, 0, 1]
                    ]);
                    _yuitest_coverline("/build/matrix/matrix.js", 376);
transforms.push(decomp[0]);
                    _yuitest_coverline("/build/matrix/matrix.js", 377);
transforms.push(decomp[1]);
                    _yuitest_coverline("/build/matrix/matrix.js", 378);
transforms.push(decomp[2]);
                    _yuitest_coverline("/build/matrix/matrix.js", 379);
transforms.push(decomp[3]);
                }}
            }
            _yuitest_coverline("/build/matrix/matrix.js", 382);
return transforms;
        },
        
        /**
         * Returns an array of transform arrays representing transform functions and arguments.
         *
         * @method getTransformFunctionArray
         * @return Array
         */
        getTransformFunctionArray: function(transform) {
            _yuitest_coverfunc("/build/matrix/matrix.js", "getTransformFunctionArray", 391);
_yuitest_coverline("/build/matrix/matrix.js", 392);
var list;
            _yuitest_coverline("/build/matrix/matrix.js", 393);
switch(transform)
            {
                case "skew" :
                    _yuitest_coverline("/build/matrix/matrix.js", 396);
list = [transform, 0, 0];
                _yuitest_coverline("/build/matrix/matrix.js", 397);
break;
                case "scale" :
                    _yuitest_coverline("/build/matrix/matrix.js", 399);
list = [transform, 1, 1];
                _yuitest_coverline("/build/matrix/matrix.js", 400);
break;
                case "scaleX" :
                    _yuitest_coverline("/build/matrix/matrix.js", 402);
list = [transform, 1];
                _yuitest_coverline("/build/matrix/matrix.js", 403);
break;
                case "scaleY" :
                    _yuitest_coverline("/build/matrix/matrix.js", 405);
list = [transform, 1];
                _yuitest_coverline("/build/matrix/matrix.js", 406);
break;
                case "translate" :
                    _yuitest_coverline("/build/matrix/matrix.js", 408);
list = [transform, 0, 0];
                _yuitest_coverline("/build/matrix/matrix.js", 409);
break;
                default :
                    _yuitest_coverline("/build/matrix/matrix.js", 411);
list = [transform, 0];
                _yuitest_coverline("/build/matrix/matrix.js", 412);
break;
            }
            _yuitest_coverline("/build/matrix/matrix.js", 414);
return list;
        },

        /**
         * Compares to arrays or transform functions to ensure both contain the same functions in the same 
         * order.
         *
         * @method compareTransformSequence
         * @param {Array} list1 Array to compare
         * @param {Array} list2 Array to compare
         * @return Boolean
         */
        compareTransformSequence: function(list1, list2)
        {
            _yuitest_coverfunc("/build/matrix/matrix.js", "compareTransformSequence", 426);
_yuitest_coverline("/build/matrix/matrix.js", 428);
var i = 0,
                len = list1.length,
                len2 = list2.length,
                isEqual = len === len2;
            _yuitest_coverline("/build/matrix/matrix.js", 432);
if(isEqual)
            {
                _yuitest_coverline("/build/matrix/matrix.js", 434);
for(; i < len; ++i)
                {
                    _yuitest_coverline("/build/matrix/matrix.js", 436);
if(list1[i][0] != list2[i][0])
                    {
                        _yuitest_coverline("/build/matrix/matrix.js", 438);
isEqual = false;
                        _yuitest_coverline("/build/matrix/matrix.js", 439);
break;
                    }
                }
            }
            _yuitest_coverline("/build/matrix/matrix.js", 443);
return isEqual;
        },

        /**
         * Mapping of possible transform method names.
         *
         * @property transformMethods
         * @type Object
         */
        transformMethods: {
            rotate: "rotate",
            skew: "skew",
            skewX: "skewX",
            skewY: "skewY",
            translate: "translate",
            translateX: "translateX",
            translateY: "tranlsateY",
            scale: "scale",
            scaleX: "scaleX",
            scaleY: "scaleY"
        }

};

_yuitest_coverline("/build/matrix/matrix.js", 467);
Y.MatrixUtil = MatrixUtil;

/**
 * Matrix is a class that allows for the manipulation of a transform matrix.
 * This class is a work in progress.
 *
 * @class Matrix
 * @constructor
 * @module matrix
 */
_yuitest_coverline("/build/matrix/matrix.js", 477);
var Matrix = function(config) {
    _yuitest_coverfunc("/build/matrix/matrix.js", "Matrix", 477);
_yuitest_coverline("/build/matrix/matrix.js", 478);
this.init(config);
};

_yuitest_coverline("/build/matrix/matrix.js", 481);
Matrix.prototype = {
    /**
     * Used as value for the _rounding method.
     *
     * @property _rounder
     * @private
     */
    _rounder: 100000,

    /**
     * Updates the matrix. 
     *
     * @method multiple
     * @param {Number} a 
     * @param {Number} b
     * @param {Number} c
     * @param {Number} d
     * @param {Number} dx
     * @param {Number} dy
     */
    multiply: function(a, b, c, d, dx, dy) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "multiply", 501);
_yuitest_coverline("/build/matrix/matrix.js", 502);
var matrix = this,
            matrix_a = matrix.a * a + matrix.c * b,
            matrix_b = matrix.b * a + matrix.d * b,
            matrix_c = matrix.a * c + matrix.c * d,
            matrix_d = matrix.b * c + matrix.d * d,
            matrix_dx = matrix.a * dx + matrix.c * dy + matrix.dx,
            matrix_dy = matrix.b * dx + matrix.d * dy + matrix.dy;

        _yuitest_coverline("/build/matrix/matrix.js", 510);
matrix.a = this._round(matrix_a);
        _yuitest_coverline("/build/matrix/matrix.js", 511);
matrix.b = this._round(matrix_b);
        _yuitest_coverline("/build/matrix/matrix.js", 512);
matrix.c = this._round(matrix_c);
        _yuitest_coverline("/build/matrix/matrix.js", 513);
matrix.d = this._round(matrix_d);
        _yuitest_coverline("/build/matrix/matrix.js", 514);
matrix.dx = this._round(matrix_dx);
        _yuitest_coverline("/build/matrix/matrix.js", 515);
matrix.dy = this._round(matrix_dy);
        _yuitest_coverline("/build/matrix/matrix.js", 516);
return this;
    },

    /**
     * Parses a string and updates the matrix.
     *
     * @method applyCSSText
     * @param {String} val A css transform string
     */
    applyCSSText: function(val) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "applyCSSText", 525);
_yuitest_coverline("/build/matrix/matrix.js", 526);
var re = /\s*([a-z]*)\(([\w,\.,\-,\s]*)\)/gi,
            args,
            m;

        _yuitest_coverline("/build/matrix/matrix.js", 530);
val = val.replace(/matrix/g, "multiply");
        _yuitest_coverline("/build/matrix/matrix.js", 531);
while ((m = re.exec(val))) {
            _yuitest_coverline("/build/matrix/matrix.js", 532);
if (typeof this[m[1]] === 'function') {
                _yuitest_coverline("/build/matrix/matrix.js", 533);
args = m[2].split(',');
                _yuitest_coverline("/build/matrix/matrix.js", 534);
this[m[1]].apply(this, args);
            }
        }
    },
    
    /**
     * Parses a string and returns an array of transform arrays.
     *
     * @method getTransformArray 
     * @param {String} val A css transform string
     * @return Array
     */
    getTransformArray: function(val) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "getTransformArray", 546);
_yuitest_coverline("/build/matrix/matrix.js", 547);
var re = /\s*([a-z]*)\(([\w,\.,\-,\s]*)\)/gi,
            transforms = [],
            args,
            m;
        
        _yuitest_coverline("/build/matrix/matrix.js", 552);
val = val.replace(/matrix/g, "multiply");
        _yuitest_coverline("/build/matrix/matrix.js", 553);
while ((m = re.exec(val))) {
            _yuitest_coverline("/build/matrix/matrix.js", 554);
if (typeof this[m[1]] === 'function') {
                _yuitest_coverline("/build/matrix/matrix.js", 555);
args = m[2].split(',');
                _yuitest_coverline("/build/matrix/matrix.js", 556);
args.unshift(m[1]);
                _yuitest_coverline("/build/matrix/matrix.js", 557);
transforms.push(args);
            }
        }
        _yuitest_coverline("/build/matrix/matrix.js", 560);
return transforms;
    },

    /**
     * Default values for the matrix
     *
     * @property _defaults
     * @private
     */
    _defaults: {
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        dx: 0,
        dy: 0
    },

    /**
     * Rounds values
     *
     * @method _round
     * @private
     */
    _round: function(val) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "_round", 584);
_yuitest_coverline("/build/matrix/matrix.js", 585);
val = Math.round(val * this._rounder) / this._rounder;
        _yuitest_coverline("/build/matrix/matrix.js", 586);
return val;
    },

    /**
     * Initializes a matrix.
     *
     * @method init
     * @param {Object} config Specified key value pairs for matrix properties. If a property is not explicitly defined in the config argument,
     * the default value will be used.
     */
    init: function(config) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "init", 596);
_yuitest_coverline("/build/matrix/matrix.js", 597);
var defaults = this._defaults,
            prop;

        _yuitest_coverline("/build/matrix/matrix.js", 600);
config = config || {};

        _yuitest_coverline("/build/matrix/matrix.js", 602);
for (prop in defaults) {
            _yuitest_coverline("/build/matrix/matrix.js", 603);
if(defaults.hasOwnProperty(prop))
            {
                _yuitest_coverline("/build/matrix/matrix.js", 605);
this[prop] = (prop in config) ? config[prop] : defaults[prop];
            }
        }

        _yuitest_coverline("/build/matrix/matrix.js", 609);
this._config = config;
    },

    /**
     * Applies a scale transform
     *
     * @method scale
     * @param {Number} val
     */
    scale: function(x, y) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "scale", 618);
_yuitest_coverline("/build/matrix/matrix.js", 619);
this.multiply(x, 0, 0, y, 0, 0);
        _yuitest_coverline("/build/matrix/matrix.js", 620);
return this;
    },
    
    /**
     * Applies a skew transformation.
     *
     * @method skew
     * @param {Number} x The value to skew on the x-axis.
     * @param {Number} y The value to skew on the y-axis.
     */
    skew: function(x, y) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "skew", 630);
_yuitest_coverline("/build/matrix/matrix.js", 631);
x = x || 0;
        _yuitest_coverline("/build/matrix/matrix.js", 632);
y = y || 0;

        _yuitest_coverline("/build/matrix/matrix.js", 634);
if (x !== undefined) { // null or undef
            _yuitest_coverline("/build/matrix/matrix.js", 635);
x = Math.tan(this.angle2rad(x));

        }

        _yuitest_coverline("/build/matrix/matrix.js", 639);
if (y !== undefined) { // null or undef
            _yuitest_coverline("/build/matrix/matrix.js", 640);
y = Math.tan(this.angle2rad(y));
        }

        _yuitest_coverline("/build/matrix/matrix.js", 643);
this.multiply(1, y, x, 1, 0, 0);
        _yuitest_coverline("/build/matrix/matrix.js", 644);
return this;
    },

    /**
     * Applies a skew to the x-coordinate
     *
     * @method skewX
     * @param {Number} x x-coordinate
     */
    skewX: function(x) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "skewX", 653);
_yuitest_coverline("/build/matrix/matrix.js", 654);
this.skew(x);
        _yuitest_coverline("/build/matrix/matrix.js", 655);
return this;
    },

    /**
     * Applies a skew to the y-coordinate
     *
     * @method skewY
     * @param {Number} y y-coordinate
     */
    skewY: function(y) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "skewY", 664);
_yuitest_coverline("/build/matrix/matrix.js", 665);
this.skew(null, y);
        _yuitest_coverline("/build/matrix/matrix.js", 666);
return this;
    },

    /**
     * Returns a string of text that can be used to populate a the css transform property of an element.
     *
     * @method toCSSText
     * @return String
     */
    toCSSText: function() {
        _yuitest_coverfunc("/build/matrix/matrix.js", "toCSSText", 675);
_yuitest_coverline("/build/matrix/matrix.js", 676);
var matrix = this,
            dx = matrix.dx,
            dy = matrix.dy,
            text = 'matrix(';


        _yuitest_coverline("/build/matrix/matrix.js", 682);
if (Y.UA.gecko) { // requires unit
            _yuitest_coverline("/build/matrix/matrix.js", 683);
if (!isNaN(dx)) {
                _yuitest_coverline("/build/matrix/matrix.js", 684);
dx += 'px';
            }
            _yuitest_coverline("/build/matrix/matrix.js", 686);
if (!isNaN(dy)) {
                _yuitest_coverline("/build/matrix/matrix.js", 687);
dy += 'px';
            }
        }

        _yuitest_coverline("/build/matrix/matrix.js", 691);
text +=     matrix.a + ',' + 
                    matrix.b + ',' + 
                    matrix.c + ',' + 
                    matrix.d + ',' + 
                    dx + ',' +
                    dy;

        _yuitest_coverline("/build/matrix/matrix.js", 698);
text += ')';

        _yuitest_coverline("/build/matrix/matrix.js", 700);
return text;
    },

    /**
     * Returns a string that can be used to populate the css filter property of an element.
     *
     * @method toFilterText
     * @return String
     */
    toFilterText: function() {
        _yuitest_coverfunc("/build/matrix/matrix.js", "toFilterText", 709);
_yuitest_coverline("/build/matrix/matrix.js", 710);
var matrix = this,
            text = 'progid:DXImageTransform.Microsoft.Matrix(';
        _yuitest_coverline("/build/matrix/matrix.js", 712);
text +=     'M11=' + matrix.a + ',' + 
                    'M21=' + matrix.b + ',' + 
                    'M12=' + matrix.c + ',' + 
                    'M22=' + matrix.d + ',' +
                    'sizingMethod="auto expand")';

        _yuitest_coverline("/build/matrix/matrix.js", 718);
text += '';

        _yuitest_coverline("/build/matrix/matrix.js", 720);
return text;
    },

    /**
     * Converts a radian value to a degree.
     *
     * @method rad2deg
     * @param {Number} rad Radian value to be converted.
     * @return Number
     */
    rad2deg: function(rad) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "rad2deg", 730);
_yuitest_coverline("/build/matrix/matrix.js", 731);
var deg = rad * (180 / Math.PI);
        _yuitest_coverline("/build/matrix/matrix.js", 732);
return deg;
    },

    /**
     * Converts a degree value to a radian.
     *
     * @method deg2rad
     * @param {Number} deg Degree value to be converted to radian.
     * @return Number
     */
    deg2rad: function(deg) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "deg2rad", 742);
_yuitest_coverline("/build/matrix/matrix.js", 743);
var rad = deg * (Math.PI / 180);
        _yuitest_coverline("/build/matrix/matrix.js", 744);
return rad;
    },

    angle2rad: function(val) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "angle2rad", 747);
_yuitest_coverline("/build/matrix/matrix.js", 748);
if (typeof val === 'string' && val.indexOf('rad') > -1) {
            _yuitest_coverline("/build/matrix/matrix.js", 749);
val = parseFloat(val);
        } else { // default to deg
            _yuitest_coverline("/build/matrix/matrix.js", 751);
val = this.deg2rad(parseFloat(val));
        }

        _yuitest_coverline("/build/matrix/matrix.js", 754);
return val;
    },

    /**
     * Applies a rotate transform.
     *
     * @method rotate
     * @param {Number} deg The degree of the rotation.
     */
    rotate: function(deg, x, y) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "rotate", 763);
_yuitest_coverline("/build/matrix/matrix.js", 764);
var rad = this.angle2rad(deg),
            sin = Math.sin(rad),
            cos = Math.cos(rad);
        _yuitest_coverline("/build/matrix/matrix.js", 767);
this.multiply(cos, sin, 0 - sin, cos, 0, 0);
        _yuitest_coverline("/build/matrix/matrix.js", 768);
return this;
    },

    /**
     * Applies translate transformation.
     *
     * @method translate
     * @param {Number} x The value to transate on the x-axis.
     * @param {Number} y The value to translate on the y-axis.
     */
    translate: function(x, y) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "translate", 778);
_yuitest_coverline("/build/matrix/matrix.js", 779);
x = parseFloat(x) || 0;
        _yuitest_coverline("/build/matrix/matrix.js", 780);
y = parseFloat(y) || 0;
        _yuitest_coverline("/build/matrix/matrix.js", 781);
this.multiply(1, 0, 0, 1, x, y);
        _yuitest_coverline("/build/matrix/matrix.js", 782);
return this;
    },
    
    /**
     * Applies a translate to the x-coordinate
     *
     * @method translateX
     * @param {Number} x x-coordinate
     */
    translateX: function(x) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "translateX", 791);
_yuitest_coverline("/build/matrix/matrix.js", 792);
this.translate(x);
        _yuitest_coverline("/build/matrix/matrix.js", 793);
return this;
    },

    /**
     * Applies a translate to the y-coordinate
     *
     * @method translateY
     * @param {Number} y y-coordinate
     */
    translateY: function(y) {
        _yuitest_coverfunc("/build/matrix/matrix.js", "translateY", 802);
_yuitest_coverline("/build/matrix/matrix.js", 803);
this.translate(null, y);
        _yuitest_coverline("/build/matrix/matrix.js", 804);
return this;
    },


    /**
     * Returns an identity matrix.
     *
     * @method identity
     * @return Object
     */
    identity: function() {
        _yuitest_coverfunc("/build/matrix/matrix.js", "identity", 814);
_yuitest_coverline("/build/matrix/matrix.js", 815);
var config = this._config,
            defaults = this._defaults,
            prop;

        _yuitest_coverline("/build/matrix/matrix.js", 819);
for (prop in config) {
            _yuitest_coverline("/build/matrix/matrix.js", 820);
if (prop in defaults) {
                _yuitest_coverline("/build/matrix/matrix.js", 821);
this[prop] = defaults[prop];
            }
        }
        _yuitest_coverline("/build/matrix/matrix.js", 824);
return this;
    },

    /**
     * Returns a 3x3 Matrix array
     *
     * /                                             \
     * | matrix[0][0]   matrix[1][0]    matrix[2][0] |
     * | matrix[0][1]   matrix[1][1]    matrix[2][1] |
     * | matrix[0][2]   matrix[1][2]    matrix[2][2] |
     * \                                             /
     *
     * @method getMatrixArray
     * @return Array
     */
    getMatrixArray: function()
    {
        _yuitest_coverfunc("/build/matrix/matrix.js", "getMatrixArray", 839);
_yuitest_coverline("/build/matrix/matrix.js", 841);
var matrix = this,
            matrixArray = [
                [matrix.a, matrix.c, matrix.dx],
                [matrix.b, matrix.d, matrix.dy],
                [0, 0, 1]
            ];
        _yuitest_coverline("/build/matrix/matrix.js", 847);
return matrixArray;
    },

    /**
     * Returns the left, top, right and bottom coordinates for a transformed
     * item.
     *
     * @method getContentRect
     * @param {Number} width The width of the item.
     * @param {Number} height The height of the item.
     * @param {Number} x The x-coordinate of the item.
     * @param {Number} y The y-coordinate of the item.
     * @return Object
     */
    getContentRect: function(width, height, x, y)
    {
        _yuitest_coverfunc("/build/matrix/matrix.js", "getContentRect", 861);
_yuitest_coverline("/build/matrix/matrix.js", 863);
var left = !isNaN(x) ? x : 0,
            top = !isNaN(y) ? y : 0,
            right = left + width,
            bottom = top + height,
            matrix = this,
            a = matrix.a,
            b = matrix.b,
            c = matrix.c,
            d = matrix.d,
            dx = matrix.dx,
            dy = matrix.dy,
            x1 = (a * left + c * top + dx), 
            y1 = (b * left + d * top + dy),
            //[x2, y2]
            x2 = (a * right + c * top + dx),
            y2 = (b * right + d * top + dy),
            //[x3, y3]
            x3 = (a * left + c * bottom + dx),
            y3 = (b * left + d * bottom + dy),
            //[x4, y4]
            x4 = (a * right + c * bottom + dx),
            y4 = (b * right + d * bottom + dy);
        _yuitest_coverline("/build/matrix/matrix.js", 885);
return {
            left: Math.min(x3, Math.min(x1, Math.min(x2, x4))),
            right: Math.max(x3, Math.max(x1, Math.max(x2, x4))),
            top: Math.min(y2, Math.min(y4, Math.min(y3, y1))),
            bottom: Math.max(y2, Math.max(y4, Math.max(y3, y1)))
        };
    },       
    
    /**
     * Returns the determinant of the matrix.
     *
     * @method getDeterminant
     * @return Number
     */
    getDeterminant: function()
    {
        _yuitest_coverfunc("/build/matrix/matrix.js", "getDeterminant", 899);
_yuitest_coverline("/build/matrix/matrix.js", 901);
return Y.MatrixUtil.getDeterminant(this.getMatrixArray());
    },

    /**
     * Returns the inverse (in array form) of the matrix.
     *
     * @method inverse
     * @return Array
     */
    inverse: function()
    {
        _yuitest_coverfunc("/build/matrix/matrix.js", "inverse", 910);
_yuitest_coverline("/build/matrix/matrix.js", 912);
return Y.MatrixUtil.inverse(this.getMatrixArray());
    },

    /**
     * Returns the transpose of the matrix
     *
     * @method transpose
     * @return Array
     */
    transpose: function()
    {
        _yuitest_coverfunc("/build/matrix/matrix.js", "transpose", 921);
_yuitest_coverline("/build/matrix/matrix.js", 923);
return Y.MatrixUtil.transpose(this.getMatrixArray());
    },

    /**
     * Returns an array of transform commands that represent the matrix.
     *
     * @method decompose
     * @return Array
     */
    decompose: function()
    {
        _yuitest_coverfunc("/build/matrix/matrix.js", "decompose", 932);
_yuitest_coverline("/build/matrix/matrix.js", 934);
return Y.MatrixUtil.decompose(this.getMatrixArray());
    }
};

_yuitest_coverline("/build/matrix/matrix.js", 938);
Y.Matrix = Matrix;


}, '@VERSION@' ,{requires:['yui-base']});
