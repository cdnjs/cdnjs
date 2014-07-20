/**
 * Utility class to calculate [affine transformation](http://en.wikipedia.org/wiki/Affine_transformation) matrix.
 *
 * This class is compatible with SVGMatrix (http://www.w3.org/TR/SVG11/coords.html#InterfaceSVGMatrix) except:
 *
 *   1. Ext.draw.Matrix is not read only.
 *   2. Using Number as its components rather than floats.
 *
 * Using this class to reduce the severe numeric problem with HTML Canvas and SVG transformation:
 * http://stackoverflow.com/questions/8784405/large-numbers-in-html-canvas-translate-result-in-strange-behavior
 * There's also no way to get current transformation matrix in Canvas:
 * http://stackoverflow.com/questions/7395813/html5-canvas-get-transform-matrix
 *
 */
Ext.define('Ext.draw.Matrix', {

    statics: {
        /**
         * @static
         * Return the affine matrix that transform two points (x0, y0) and (x1, y1) to (x0p, y0p) and (x1p, y1p)
         * @param {Number} x0
         * @param {Number} y0
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x0p
         * @param {Number} y0p
         * @param {Number} x1p
         * @param {Number} y1p
         */
        createAffineMatrixFromTwoPair: function (x0, y0, x1, y1, x0p, y0p, x1p, y1p) {
            var dx = x1 - x0,
                dy = y1 - y0,
                dxp = x1p - x0p,
                dyp = y1p - y0p,
                r = 1 / (dx * dx + dy * dy),
                a = dx * dxp + dy * dyp,
                b = dxp * dy - dx * dyp,
                c = -a * x0 - b * y0,
                f = b * x0 - a * y0;

            return new this(a * r, -b * r, b * r, a * r, c * r + x0p, f * r + y0p);
        },

        /**
         * @static
         * Return the affine matrix that transform two points (x0, y0) and (x1, y1) to (x0p, y0p) and (x1p, y1p)
         * @param {Number} x0
         * @param {Number} y0
         * @param {Number} x1
         * @param {Number} y1
         * @param {Number} x0p
         * @param {Number} y0p
         * @param {Number} x1p
         * @param {Number} y1p
         */
        createPanZoomFromTwoPair: function (x0, y0, x1, y1, x0p, y0p, x1p, y1p) {
            if (arguments.length === 2) {
                return this.createPanZoomFromTwoPair.apply(this, x0.concat(y0));
            }
            var dx = x1 - x0,
                dy = y1 - y0,
                cx = (x0 + x1) * 0.5,
                cy = (y0 + y1) * 0.5,
                dxp = x1p - x0p,
                dyp = y1p - y0p,
                cxp = (x0p + x1p) * 0.5,
                cyp = (y0p + y1p) * 0.5,
                r = dx * dx + dy * dy,
                rp = dxp * dxp + dyp * dyp,
                scale = Math.sqrt(rp / r);

            return new this(scale, 0, 0, scale, cxp - scale * cx, cyp - scale * cy);
        },

        /**
         * @static
         * Create a flyweight to wrap the given array.
         * The flyweight will directly refer the object and the elements can be changed by other methods.
         *
         * Do not hold the instance of flyweight matrix.
         *
         * @param {Array} elements
         * @return {Ext.draw.Matrix}
         */
        fly: (function () {
            var flyMatrix = null,
                simplefly = function (elements) {
                    flyMatrix.elements = elements;
                    return flyMatrix;
                };

            return function (elements) {
                if (!flyMatrix) {
                    flyMatrix = new Ext.draw.Matrix();
                }
                flyMatrix.elements = elements;
                Ext.draw.Matrix.fly = simplefly;
                return flyMatrix;
            };
        })(),

        /**
         * @static
         * Create a matrix from `mat`. If `mat` is already a matrix, returns it.
         * @param {Mixed} mat
         * @return {Ext.draw.Matrix}
         */
        create: function (mat) {
            if (mat instanceof this) {
                return mat;
            }
            return new this(mat);
        }
    },

    /**
     * Create an affine transform matrix.
     *
     * @param {Number} xx Coefficient from x to x
     * @param {Number} xy Coefficient from x to y
     * @param {Number} yx Coefficient from y to x
     * @param {Number} yy Coefficient from y to y
     * @param {Number} dx Offset of x
     * @param {Number} dy Offset of y
     */
    constructor: function (xx, xy, yx, yy, dx, dy) {
        if (xx && xx.length === 6) {
            this.elements = xx.slice();
        } else if (xx !== undefined) {
            this.elements = [xx, xy, yx, yy, dx, dy];
        } else {
            this.elements = [1, 0, 0, 1, 0, 0];
        }
    },

    /**
     * Prepend a matrix onto the current.
     *
     * __Note:__ The given transform will come after the current one.
     *
     * @param {Number} xx Coefficient from x to x.
     * @param {Number} xy Coefficient from x to y.
     * @param {Number} yx Coefficient from y to x.
     * @param {Number} yy Coefficient from y to y.
     * @param {Number} dx Offset of x.
     * @param {Number} dy Offset of y.
     * @return {Ext.draw.Matrix} this
     */
    prepend: function (xx, xy, yx, yy, dx, dy) {
        var elements = this.elements,
            xx0 = elements[0],
            xy0 = elements[1],
            yx0 = elements[2],
            yy0 = elements[3],
            dx0 = elements[4],
            dy0 = elements[5];

        elements[0] = xx * xx0 + yx * xy0;
        elements[1] = xy * xx0 + yy * xy0;
        elements[2] = xx * yx0 + yx * yy0;
        elements[3] = xy * yx0 + yy * yy0;
        elements[4] = xx * dx0 + yx * dy0 + dx;
        elements[5] = xy * dx0 + yy * dy0 + dy;
        return this;
    },

    /**
     * Prepend a matrix onto the current.
     *
     * __Note:__ The given transform will come after the current one.
     * @param {Ext.draw.Matrix} matrix
     * @return {Ext.draw.Matrix} this
     */
    prependMatrix: function (matrix) {
        return this.prepend.apply(this, matrix.elements);
    },

    /**
     * Postpend a matrix onto the current.
     *
     * __Note:__ The given transform will come before the current one.
     *
     * @param {Number} xx Coefficient from x to x.
     * @param {Number} xy Coefficient from x to y.
     * @param {Number} yx Coefficient from y to x.
     * @param {Number} yy Coefficient from y to y.
     * @param {Number} dx Offset of x.
     * @param {Number} dy Offset of y.
     * @return {Ext.draw.Matrix} this
     */
    append: function (xx, xy, yx, yy, dx, dy) {
        var elements = this.elements,
            xx0 = elements[0],
            xy0 = elements[1],
            yx0 = elements[2],
            yy0 = elements[3],
            dx0 = elements[4],
            dy0 = elements[5];

        elements[0] = xx * xx0 + xy * yx0;
        elements[1] = xx * xy0 + xy * yy0;
        elements[2] = yx * xx0 + yy * yx0;
        elements[3] = yx * xy0 + yy * yy0;
        elements[4] = dx * xx0 + dy * yx0 + dx0;
        elements[5] = dx * xy0 + dy * yy0 + dy0;
        return this;
    },

    /**
     * Postpend a matrix onto the current.
     *
     * __Note:__ The given transform will come before the current one.
     *
     * @param {Ext.draw.Matrix} matrix
     * @return {Ext.draw.Matrix} this
     */
    appendMatrix: function (matrix) {
        return this.append.apply(this, matrix.elements);
    },

    /**
     * Set the elements of a Matrix
     * @param {Number} xx
     * @param {Number} xy
     * @param {Number} yx
     * @param {Number} yy
     * @param {Number} dx
     * @param {Number} dy
     * @return {Ext.draw.Matrix} this
     */
    set: function (xx, xy, yx, yy, dx, dy) {
        var elements = this.elements;

        elements[0] = xx;
        elements[1] = xy;
        elements[2] = yx;
        elements[3] = yy;
        elements[4] = dx;
        elements[5] = dy;
        return this;
    },

    /**
     * Return a new matrix represents the opposite transformation of the current one.
     *
     * @param {Ext.draw.Matrix} [target] A target matrix. If present, it will receive
     * the result of inversion to avoid creating a new object.
     *
     * @return {Ext.draw.Matrix}
     */
    inverse: function (target) {
        var elements = this.elements,
            a = elements[0],
            b = elements[1],
            c = elements[2],
            d = elements[3],
            e = elements[4],
            f = elements[5],
            rDim = 1 / (a * d - b * c);

        a *= rDim;
        b *= rDim;
        c *= rDim;
        d *= rDim;
        if (target) {
            target.set(d, -b, -c, a, c * f - d * e, b * e - a * f);
            return target;
        } else {
            return new Ext.draw.Matrix(d, -b, -c, a, c * f - d * e, b * e - a * f);
        }
    },

    /**
     * Translate the matrix.
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} [prepend] If `true`, this will transformation be prepended to the matrix.
     * @return {Ext.draw.Matrix} this
     */
    translate: function (x, y, prepend) {
        if (prepend) {
            return this.prepend(1, 0, 0, 1, x, y);
        } else {
            return this.append(1, 0, 0, 1, x, y);
        }
    },

    /**
     * Scale the matrix.
     *
     * @param {Number} sx
     * @param {Number} sy
     * @param {Number} scx
     * @param {Number} scy
     * @param {Boolean} [prepend] If `true`, this will transformation be prepended to the matrix.
     * @return {Ext.draw.Matrix} this
     */
    scale: function (sx, sy, scx, scy, prepend) {
        var me = this;

        // null or undefined
        if (sy == null) {
            sy = sx;
        }
        if (scx === undefined) {
            scx = 0;
        }
        if (scy === undefined) {
            scy = 0;
        }

        if (prepend) {
            return me.prepend(sx, 0, 0, sy, scx - scx * sx, scy - scy * sy);
        } else {
            return me.append(sx, 0, 0, sy, scx - scx * sx, scy - scy * sy);
        }
    },

    /**
     * Rotate the matrix.
     *
     * @param {Number} angle Radians to rotate
     * @param {Number|null} rcx Center of rotation.
     * @param {Number|null} rcy Center of rotation.
     * @param {Boolean} [prepend] If `true`, this will transformation be prepended to the matrix.
     * @return {Ext.draw.Matrix} this
     */
    rotate: function (angle, rcx, rcy, prepend) {
        var me = this,
            cos = Math.cos(angle),
            sin = Math.sin(angle);

        rcx = rcx || 0;
        rcy = rcy || 0;

        if (prepend) {
            return me.prepend(
                cos, sin,
                -sin, cos,
                rcx - cos * rcx + rcy * sin,
                rcy - cos * rcy - rcx * sin
            );
        } else {
            return me.append(
                cos, sin,
                -sin, cos,
                rcx - cos * rcx + rcy * sin,
                rcy - cos * rcy - rcx * sin
            );
        }
    },

    /**
     * Rotate the matrix by the angle of a vector.
     *
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} [prepend] If `true`, this will transformation be prepended to the matrix.
     * @return {Ext.draw.Matrix} this
     */
    rotateFromVector: function (x, y, prepend) {
        var me = this,
            d = Math.sqrt(x * x + y * y),
            cos = x / d,
            sin = y / d;
        if (prepend) {
            return me.prepend(cos, sin, -sin, cos, 0, 0);
        } else {
            return me.append(cos, sin, -sin, cos, 0, 0);
        }
    },

    /**
     * Clone this matrix.
     * @return {Ext.draw.Matrix}
     */
    clone: function () {
        return new Ext.draw.Matrix(this.elements);
    },

    /**
     * Horizontally flip the matrix
     * @return {Ext.draw.Matrix} this
     */
    flipX: function () {
        return this.append(-1, 0, 0, 1, 0, 0);
    },

    /**
     * Vertically flip the matrix
     * @return {Ext.draw.Matrix} this
     */
    flipY: function () {
        return this.append(1, 0, 0, -1, 0, 0);
    },

    /**
     * Skew the matrix
     * @param {Number} angle
     * @return {Ext.draw.Matrix} this
     */
    skewX: function (angle) {
        return this.append(1, Math.tan(angle), 0, -1, 0, 0);
    },

    /**
     * Skew the matrix
     * @param {Number} angle
     * @return {Ext.draw.Matrix} this
     */
    skewY: function (angle) {
        return this.append(1, 0, Math.tan(angle), -1, 0, 0);
    },

    /**
     * Reset the matrix to identical.
     * @return {Ext.draw.Matrix} this
     */
    reset: function () {
        return this.set(1, 0, 0, 1, 0, 0);
    },

    /**
     * @private
     * Split Matrix to `{{devicePixelRatio,c,0},{b,devicePixelRatio,0},{0,0,1}}.{{xx,0,dx},{0,yy,dy},{0,0,1}}`
     * @return {Object} Object with b,c,d=devicePixelRatio,xx,yy,dx,dy
     */
    precisionCompensate: function (devicePixelRatio, comp) {
        var elements = this.elements,
            x2x = elements[0],
            x2y = elements[1],
            y2x = elements[2],
            y2y = elements[3],
            newDx = elements[4],
            newDy = elements[5],
            r = x2y * y2x - x2x * y2y;

        comp.b = devicePixelRatio * x2y / x2x;
        comp.c = devicePixelRatio * y2x / y2y;
        comp.d = devicePixelRatio;
        comp.xx = x2x / devicePixelRatio;
        comp.yy = y2y / devicePixelRatio;
        comp.dx = (newDy * x2x * y2x - newDx * x2x * y2y) / r / devicePixelRatio;
        comp.dy = (newDx * x2y * y2y - newDy * x2x * y2y) / r / devicePixelRatio;
    },

    /**
     * @private
     * Split Matrix to `{{1,c,0},{b,d,0},{0,0,1}}.{{xx,0,dx},{0,xx,dy},{0,0,1}}`
     * @return {Object} Object with b,c,d,xx,yy=xx,dx,dy
     */
    precisionCompensateRect: function (devicePixelRatio, comp) {
        var elements = this.elements,
            x2x = elements[0],
            x2y = elements[1],
            y2x = elements[2],
            y2y = elements[3],
            newDx = elements[4],
            newDy = elements[5],
            yxOnXx = y2x / x2x;

        comp.b = devicePixelRatio * x2y / x2x;
        comp.c = devicePixelRatio * yxOnXx;
        comp.d = devicePixelRatio * y2y / x2x;
        comp.xx = x2x / devicePixelRatio;
        comp.yy = x2x / devicePixelRatio;
        comp.dx = (newDy * y2x - newDx * y2y) / (x2y * yxOnXx - y2y) / devicePixelRatio;
        comp.dy = -(newDy * x2x - newDx * x2y) / (x2y * yxOnXx - y2y) / devicePixelRatio;
    },

    /**
     * Transform point returning the x component of the result.
     * @param {Number} x
     * @param {Number} y
     * @return {Number} x component of the result.
     */
    x: function (x, y) {
        var elements = this.elements;
        return x * elements[0] + y * elements[2] + elements[4];
    },

    /**
     * Transform point returning the y component of the result.
     * @param {Number} x
     * @param {Number} y
     * @return {Number} y component of the result.
     */
    y: function (x, y) {
        var elements = this.elements;

        return x * elements[1] + y * elements[3] + elements[5];
    },

    /**
     * @private
     * @param {Number} i
     * @param {Number} j
     * @return {String}
     */
    get: function (i, j) {
        return +this.elements[i + j * 2].toFixed(4);
    },

    /**
     * Transform a point to a new array.
     * @param {Array} point
     * @return {Array}
     */
    transformPoint: function (point) {
        var elements = this.elements;

        return [
            point[0] * elements[0] + point[1] * elements[2] + elements[4],
            point[0] * elements[1] + point[1] * elements[3] + elements[5]
        ];
    },

    /**
     * @param {Object} bbox Given as `{x: Number, y: Number, width: Number, height: Number}`.
     * @param {Number} [radius]
     * @param {Object} [target] Optional target object to recieve the result.
     * Recommended to use it for better gc.
     *
     * @return {Object} Object with x, y, width and height.
     */
    transformBBox: function (bbox, radius, target) {
        var elements = this.elements,
            l = bbox.x,
            t = bbox.y,
            w0 = bbox.width * 0.5,
            h0 = bbox.height * 0.5,
            xx = elements[0],
            xy = elements[1],
            yx = elements[2],
            yy = elements[3],
            cx = l + w0,
            cy = t + h0,
            w, h, scales;

        if (radius) {
            w0 -= radius;
            h0 -= radius;
            scales = [
                Math.sqrt(elements[0] * elements[0] + elements[2] * elements[2]),
                Math.sqrt(elements[1] * elements[1] + elements[3] * elements[3])
            ];
            w = Math.abs(w0 * xx) + Math.abs(h0 * yx) + Math.abs(scales[0] * radius);
            h = Math.abs(w0 * xy) + Math.abs(h0 * yy) + Math.abs(scales[1] * radius);
        } else {
            w = Math.abs(w0 * xx) + Math.abs(h0 * yx);
            h = Math.abs(w0 * xy) + Math.abs(h0 * yy);
        }

        if (!target) {
            target = {};
        }

        target.x = cx * xx + cy * yx + elements[4] - w;
        target.y = cx * xy + cy * yy + elements[5] - h;
        target.width = w + w;
        target.height = h + h;

        return target;
    },

    /**
     * Transform a list for points.
     *
     * __Note:__ will change the original list but not points inside it.
     * @param {Array} list
     * @return {Array} list
     */
    transformList: function (list) {
        var elements = this.elements,
            xx = elements[0], yx = elements[2], dx = elements[4],
            xy = elements[1], yy = elements[3], dy = elements[5],
            ln = list.length,
            p, i;

        for (i = 0; i < ln; i++) {
            p = list[i];
            list[i] = [
                p[0] * xx + p[1] * yx + dx,
                p[0] * xy + p[1] * yy + dy
            ];
        }
        return list;
    },

    /**
     * Determines whether this matrix is an identity matrix (no transform).
     * @return {Boolean}
     */
    isIdentity: function () {
        var elements = this.elements;

        return elements[0] === 1 &&
            elements[1] === 0 &&
            elements[2] === 0 &&
            elements[3] === 1 &&
            elements[4] === 0 &&
            elements[5] === 0;
    },

    /**
     * Determines if this matrix has the same values as another matrix.
     * @param {Ext.draw.Matrix} matrix
     * @return {Boolean}
     */
    equals: function (matrix) {
        var elements = this.elements,
            elements2 = matrix.elements;

        return elements[0] === elements2[0] &&
            elements[1] === elements2[1] &&
            elements[2] === elements2[2] &&
            elements[3] === elements2[3] &&
            elements[4] === elements2[4] &&
            elements[5] === elements2[5];
    },

    /**
     * Create an array of elements by horizontal order (xx,yx,dx,yx,yy,dy).
     * @return {Array}
     */
    toArray: function () {
        var elements = this.elements;
        return [elements[0], elements[2], elements[4], elements[1], elements[3], elements[5]];
    },

    /**
     * Create an array of elements by vertical order (xx,xy,yx,yy,dx,dy).
     * @return {Array|String}
     */
    toVerticalArray: function () {
        return this.elements.slice();
    },

    /**
     * Get an array of elements.
     * The numbers are rounded to keep only 4 decimals.
     * @return {Array}
     */
    toString: function () {
        var me = this;
        return [me.get(0, 0), me.get(0, 1), me.get(1, 0), me.get(1, 1), me.get(2, 0), me.get(2, 1)].join(',');
    },

    /**
     * Apply the matrix to a drawing context.
     * @param {Object} ctx
     * @return {Ext.draw.Matrix} this
     */
    toContext: function (ctx) {
        ctx.transform.apply(ctx, this.elements);
        return this;
    },

    /**
     * Return a string that can be used as transform attribute in SVG.
     * @return {String}
     */
    toSvg: function () {
        var elements = this.elements;
        // The reason why we cannot use `.join` is the `1e5` form is not accepted in svg.
        return "matrix(" +
            elements[0].toFixed(9) + ',' +
            elements[1].toFixed(9) + ',' +
            elements[2].toFixed(9) + ',' +
            elements[3].toFixed(9) + ',' +
            elements[4].toFixed(9) + ',' +
            elements[5].toFixed(9) +
            ")";
    },

    /**
     * Get the x scale of the matrix.
     * @return {Number}
     */
    getScaleX: function () {
        var elements = this.elements;
        return Math.sqrt(elements[0] * elements[0] + elements[2] * elements[2]);
    },

    /**
     * Get the y scale of the matrix.
     * @return {Number}
     */
    getScaleY: function () {
        var elements = this.elements;
        return Math.sqrt(elements[1] * elements[1] + elements[3] * elements[3]);
    },

    /**
     * Get x-to-x component of the matrix
     * @return {Number}
     */
    getXX: function () {
        return this.elements[0];
    },

    /**
     * Get x-to-y component of the matrix.
     * @return {Number}
     */
    getXY: function () {
        return this.elements[1];
    },

    /**
     * Get y-to-x component of the matrix.
     * @return {Number}
     */
    getYX: function () {
        return this.elements[2];
    },

    /**
     * Get y-to-y component of the matrix.
     * @return {Number}
     */
    getYY: function () {
        return this.elements[3];
    },

    /**
     * Get offset x component of the matrix.
     * @return {Number}
     */
    getDX: function () {
        return this.elements[4];
    },

    /**
     * Get offset y component of the matrix.
     * @return {Number}
     */
    getDY: function () {
        return this.elements[5];
    },

    /**
     * Split matrix into Translate, Scale, Shear, and Rotate.
     * @return {Object}
     */
    split: function () {
        var el = this.elements,
            xx = el[0],
            xy = el[1],
            yx = el[2],
            yy = el[3],
            out = {
                translateX: el[4],
                translateY: el[5]
            };
        out.scaleX = Math.sqrt(xx * xx + yx * yx);
        out.shear = (xx * xy + yx * yy) / out.scaleX;
        xy -= out.shear * xx;
        yy -= out.shear * yx;
        out.scaleY = Math.sqrt(xy * xy + yy * yy);
        out.shear /= out.scaleY;
        out.rotation = -Math.atan2(yx / out.scaleX, xy / out.scaleY);
        out.isSimple = Math.abs(out.shear) < 1e-9 && (!out.rotation || Math.abs(out.scaleX - out.scaleY) < 1e-9);
        return out;
    }
}, function () {
    function registerName(properties, name, i) {
        properties[name] = {
            get: function () {
                return this.elements[i];
            },
            set: function (val) {
                this.elements[i] = val;
            }
        };
    }

    // Compatibility with SVGMatrix.
    if (Object.defineProperties) {
        var properties = {};
        /**
         * @property {Number} a Get x-to-x component of the matrix. Avoid using it for performance consideration.
         * Use {@link #getXX} instead.
         */
        registerName(properties, 'a', 0);
        registerName(properties, 'b', 1);
        registerName(properties, 'c', 2);
        registerName(properties, 'd', 3);
        registerName(properties, 'e', 4);
        registerName(properties, 'f', 5);
        Object.defineProperties(this.prototype, properties);
    }

    /**
     * Performs matrix multiplication. This matrix is post-multiplied by another matrix.
     *
     * __Note:__ The given transform will come before the current one.
     *
     * @method
     * @param {Ext.draw.Matrix} matrix
     * @return {Ext.draw.Matrix} this
     */
    this.prototype.multiply = this.prototype.appendMatrix;
});
