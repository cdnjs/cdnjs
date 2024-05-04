/* Copyright © 2017-2024 William Ngan and contributors.
Licensed under Apache 2.0 License.
See https://github.com/williamngan/pts for details. */
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/Canvas.ts
  var Canvas_exports = {};
  __export(Canvas_exports, {
    CanvasForm: () => CanvasForm,
    CanvasSpace: () => CanvasSpace2
  });

  // src/Space.ts
  var Space_exports = {};
  __export(Space_exports, {
    MultiTouchSpace: () => MultiTouchSpace,
    Space: () => Space
  });

  // src/Pt.ts
  var Pt_exports = {};
  __export(Pt_exports, {
    Bound: () => Bound,
    Group: () => Group,
    Pt: () => Pt
  });

  // src/Util.ts
  var Util_exports = {};
  __export(Util_exports, {
    Const: () => Const,
    Util: () => Util
  });

  // src/Num.ts
  var Num_exports = {};
  __export(Num_exports, {
    Geom: () => Geom,
    Num: () => Num,
    Range: () => Range,
    Shaping: () => Shaping
  });

  // src/Op.ts
  var Op_exports = {};
  __export(Op_exports, {
    Circle: () => Circle,
    Curve: () => Curve,
    Line: () => Line,
    Polygon: () => Polygon,
    Rectangle: () => Rectangle,
    Triangle: () => Triangle
  });

  // src/LinearAlgebra.ts
  var LinearAlgebra_exports = {};
  __export(LinearAlgebra_exports, {
    Mat: () => Mat,
    Vec: () => Vec
  });
  var Vec = class _Vec {
    /**
     * Add `b` to vector `a`.
     * @returns vector `a`
     */
    static add(a, b) {
      if (typeof b == "number") {
        for (let i = 0, len = a.length; i < len; i++)
          a[i] += b;
      } else {
        for (let i = 0, len = a.length; i < len; i++)
          a[i] += b[i] || 0;
      }
      return a;
    }
    /**
     * Subtract `b` from vector `a`.
     * @returns vector `a`
     */
    static subtract(a, b) {
      if (typeof b == "number") {
        for (let i = 0, len = a.length; i < len; i++)
          a[i] -= b;
      } else {
        for (let i = 0, len = a.length; i < len; i++)
          a[i] -= b[i] || 0;
      }
      return a;
    }
    /**
     * Multiply `b` with vector `a`.
     * @returns vector `a`
     */
    static multiply(a, b) {
      if (typeof b == "number") {
        for (let i = 0, len = a.length; i < len; i++)
          a[i] *= b;
      } else {
        if (a.length != b.length) {
          throw new Error(`Cannot do element-wise multiply since the array lengths don't match: ${a.toString()} multiply-with ${b.toString()}`);
        }
        for (let i = 0, len = a.length; i < len; i++)
          a[i] *= b[i];
      }
      return a;
    }
    /**
     * Divide `a` over `b`.
     * @returns vector `a`
     */
    static divide(a, b) {
      if (typeof b == "number") {
        if (b === 0)
          throw new Error("Cannot divide by zero");
        for (let i = 0, len = a.length; i < len; i++)
          a[i] /= b;
      } else {
        if (a.length != b.length) {
          throw new Error(`Cannot do element-wise divide since the array lengths don't match. ${a.toString()} divide-by ${b.toString()}`);
        }
        for (let i = 0, len = a.length; i < len; i++)
          a[i] /= b[i];
      }
      return a;
    }
    /**
     * Dot product of `a` and `b`.
     */
    static dot(a, b) {
      if (a.length != b.length)
        throw new Error("Array lengths don't match");
      let d = 0;
      for (let i = 0, len = a.length; i < len; i++) {
        d += a[i] * b[i];
      }
      return d;
    }
    /**
     * 2D cross product of `a` and `b`.
     */
    static cross2D(a, b) {
      return a[0] * b[1] - a[1] * b[0];
    }
    /**
     * 3D Cross product of `a` and `b`.
     */
    static cross(a, b) {
      return new Pt(a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]);
    }
    /**
     * Magnitude of `a`.
     */
    static magnitude(a) {
      return Math.sqrt(_Vec.dot(a, a));
    }
    /**
     * Unit vector of `a`. If magnitude of `a` is already known, pass it in the second paramter to optimize calculation.
     */
    static unit(a, magnitude = void 0) {
      const m = magnitude === void 0 ? _Vec.magnitude(a) : magnitude;
      if (m === 0)
        return Pt.make(a.length);
      return _Vec.divide(a, m);
    }
    /**
     * Set `a` to its absolute value in each dimension.
     * @returns vector `a`
     */
    static abs(a) {
      return _Vec.map(a, Math.abs);
    }
    /**
     * Set `a` to its floor value in each dimension.
     * @returns vector `a`
     */
    static floor(a) {
      return _Vec.map(a, Math.floor);
    }
    /**
     * Set `a` to its ceiling value in each dimension.
     * @returns vector `a`
     */
    static ceil(a) {
      return _Vec.map(a, Math.ceil);
    }
    /**
     * Set `a` to its rounded value in each dimension.
     * @returns vector `a`
     */
    static round(a) {
      return _Vec.map(a, Math.round);
    }
    /**
     * Find the max value within a vector's dimensions.
     * @returns an object with `value` and `index` that specifies the max value and its corresponding dimension.
     */
    static max(a) {
      let m = Number.MIN_VALUE;
      let index = 0;
      for (let i = 0, len = a.length; i < len; i++) {
        m = Math.max(m, a[i]);
        if (m === a[i])
          index = i;
      }
      return { value: m, index };
    }
    /**
     * Find the min value within a vector's dimensions.
     * @returns an object with `value` and `index` that specifies the min value and its corresponding dimension.
     */
    static min(a) {
      let m = Number.MAX_VALUE;
      let index = 0;
      for (let i = 0, len = a.length; i < len; i++) {
        m = Math.min(m, a[i]);
        if (m === a[i])
          index = i;
      }
      return { value: m, index };
    }
    /**
     * Add up all the dimensions' values and returns a scalar of the sum.
     */
    static sum(a) {
      let s = 0;
      for (let i = 0, len = a.length; i < len; i++)
        s += a[i];
      return s;
    }
    /**
     * Given a mapping function, update `a`'s value in each dimension.
     * @returns vector `a`
     */
    static map(a, fn) {
      for (let i = 0, len = a.length; i < len; i++) {
        a[i] = fn(a[i], i, a);
      }
      return a;
    }
  };
  var Mat = class _Mat {
    constructor() {
      this.reset();
    }
    /**
     * Get the current value of its stored 3x3 matrix
     */
    get value() {
      return this._33;
    }
    /**
     * Convert the value of its stored 3x3 matrix to a 2D [`DOMMatrix`](https://developer.mozilla.org/en-US/docs/Web/API/DOMMatrix) instance
     */
    get domMatrix() {
      return new DOMMatrix(_Mat.toDOMMatrix(this._33));
    }
    /**
     * Reset the internal 3x3 matrix to its identity
     */
    reset() {
      this._33 = _Mat.scale2DMatrix(1, 1);
    }
    /**
     * Scale the internal 3x3 matrix. You can chain this function with other related functions.
     * @param val [x, y] scale factors
     * @param at Optional origin location to scale from. 
     */
    scale2D(val, at = [0, 0]) {
      const m = _Mat.scaleAt2DMatrix(val[0] || 1, val[1] || 1, at);
      this._33 = _Mat.multiply(this._33, m);
      return this;
    }
    /**
     * Scale the internal 3x3 matrix. You can chain this function with other related functions.
     * @param ang Angle of rotation
     * @param at Optional origin location to rotate from. 
     */
    rotate2D(ang, at = [0, 0]) {
      const m = _Mat.rotateAt2DMatrix(Math.cos(ang), Math.sin(ang), at);
      this._33 = _Mat.multiply(this._33, m);
      return this;
    }
    /**
     * Translate the internal 3x3 matrix. You can chain this function with other related functions.
     * @param val [x, y] offset values
     */
    translate2D(val) {
      const m = _Mat.translate2DMatrix(val[0] || 0, val[1] || 0);
      this._33 = _Mat.multiply(this._33, m);
      return this;
    }
    /**
     * Shear the internal 3x3 matrix. You can chain this function with other related functions.
     * @param val [x, y] shear factors (before tan() operation)
     * @param at Optional origin location to scale from. 
     */
    shear2D(val, at = [0, 0]) {
      const m = _Mat.shearAt2DMatrix(Math.tan(val[0] || 0), Math.tan(val[1] || 1), at);
      this._33 = _Mat.multiply(this._33, m);
      return this;
    }
    /**
     * Matrix addition. Matrices should have the same rows and columns.
     * @param a a group of Pt
     * @param b a scalar number, an array of numeric arrays, or a group of Pt
     * @returns a new group with the same rows and columns as a and b
     */
    static add(a, b) {
      if (typeof b != "number") {
        if (a[0].length != b[0].length)
          throw new Error("Cannot add matrix if rows' and columns' size don't match.");
        if (a.length != b.length)
          throw new Error("Cannot add matrix if rows' and columns' size don't match.");
      }
      const g = new Group();
      const isNum = typeof b == "number";
      for (let i = 0, len = a.length; i < len; i++) {
        g.push(a[i].$add(isNum ? b : b[i]));
      }
      return g;
    }
    /**
     * Matrix multiplication.
     * @param a a Group of M Pts, each with K dimensions (M-rows, K-columns)
     * @param b a scalar number, an array of numeric arrays, or a Group of K Pts, each with N dimensions (K-rows, N-columns) -- or if transposed is true, then N Pts with K dimensions
     * @param transposed (Only applicable if it's not elementwise multiplication) If true, then a and b's columns should match (ie, each Pt should have the same dimensions). Default is `false`.
     * @param elementwise if true, then the multiplication is done element-wise. Default is `false`.
     * @returns If not elementwise, this will return a new group with M Pt, each with N dimensions (M-rows, N-columns).
     */
    static multiply(a, b, transposed = false, elementwise = false) {
      const g = new Group();
      if (typeof b != "number") {
        if (elementwise) {
          if (a.length != b.length)
            throw new Error("Cannot multiply matrix element-wise because the matrices' sizes don't match.");
          for (let ai = 0, alen = a.length; ai < alen; ai++) {
            g.push(a[ai].$multiply(b[ai]));
          }
        } else {
          if (!transposed && a[0].length != b.length)
            throw new Error("Cannot multiply matrix if rows in matrix-a don't match columns in matrix-b.");
          if (transposed && a[0].length != b[0].length)
            throw new Error("Cannot multiply matrix if transposed and the columns in both matrices don't match.");
          if (!transposed)
            b = _Mat.transpose(b);
          for (let ai = 0, alen = a.length; ai < alen; ai++) {
            const p = Pt.make(b.length, 0);
            for (let bi = 0, blen = b.length; bi < blen; bi++) {
              p[bi] = Vec.dot(a[ai], b[bi]);
            }
            g.push(p);
          }
        }
      } else {
        for (let ai = 0, alen = a.length; ai < alen; ai++) {
          g.push(a[ai].$multiply(b));
        }
      }
      return g;
    }
    /**
     * Zip one slice of an array of Pts. For example, if the input `g` are organized in rows, then this function will take the values in a specific column.
     * @param g a group of Pt
     * @param idx index to zip at
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     */
    static zipSlice(g, index, defaultValue = false) {
      const z = [];
      for (let i = 0, len = g.length; i < len; i++) {
        if (g[i].length - 1 < index && defaultValue === false)
          throw `Index ${index} is out of bounds`;
        z.push(g[i][index] || defaultValue);
      }
      return new Pt(z);
    }
    /**
     * Zip a group of Pt. For example, `[[1,2],[3,4],[5,6]]` will become `[[1,3,5],[2,4,6]]`.
     * @param g a group of Pt
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     * @param useLongest If true, find the longest list of values in a Pt and use its length for zipping. Default is false, which uses the first item's length for zipping.
     */
    static zip(g, defaultValue = false, useLongest = false) {
      const ps = new Group();
      const len = useLongest ? g.reduce((a, b) => Math.max(a, b.length), 0) : g[0].length;
      for (let i = 0; i < len; i++) {
        ps.push(_Mat.zipSlice(g, i, defaultValue));
      }
      return ps;
    }
    /**
     * Same as `zip` function.
     */
    static transpose(g, defaultValue = false, useLongest = false) {
      return _Mat.zip(g, defaultValue, useLongest);
    }
    static toDOMMatrix(m) {
      return [m[0][0], m[0][1], m[1][0], m[1][1], m[2][0], m[2][1]];
    }
    /**
     * Transform a 2D point given a 2x3 or 3x3 matrix.
     * @param pt a Pt to be transformed
     * @param m 2x3 or 3x3 matrix
     * @returns a new transformed Pt
     */
    static transform2D(pt, m) {
      const x = pt[0] * m[0][0] + pt[1] * m[1][0] + m[2][0];
      const y = pt[0] * m[0][1] + pt[1] * m[1][1] + m[2][1];
      return new Pt(x, y);
    }
    /**
     * Get a scale matrix for use in `transform2D`.
     */
    static scale2DMatrix(x, y) {
      return new Group(
        new Pt(x, 0, 0),
        new Pt(0, y, 0),
        new Pt(0, 0, 1)
      );
    }
    /**
     * Get a rotate matrix for use in `transform2D`.
     */
    static rotate2DMatrix(cosA, sinA) {
      return new Group(
        new Pt(cosA, sinA, 0),
        new Pt(-sinA, cosA, 0),
        new Pt(0, 0, 1)
      );
    }
    /**
     * Get a shear matrix for use in `transform2D`.
     */
    static shear2DMatrix(tanX, tanY) {
      return new Group(
        new Pt(1, tanX, 0),
        new Pt(tanY, 1, 0),
        new Pt(0, 0, 1)
      );
    }
    /**
     * Get a translate matrix for use in `transform2D`.
     */
    static translate2DMatrix(x, y) {
      return new Group(
        new Pt(1, 0, 0),
        new Pt(0, 1, 0),
        new Pt(x, y, 1)
      );
    }
    /**
     * Get a matrix to scale a point from an origin point. For use in `transform2D`.
     */
    static scaleAt2DMatrix(sx, sy, at) {
      const m = _Mat.scale2DMatrix(sx, sy);
      m[2][0] = -at[0] * sx + at[0];
      m[2][1] = -at[1] * sy + at[1];
      return m;
    }
    /**
     * Get a matrix to rotate a point from an origin point. For use in `transform2D`.
     */
    static rotateAt2DMatrix(cosA, sinA, at) {
      const m = _Mat.rotate2DMatrix(cosA, sinA);
      m[2][0] = at[0] * (1 - cosA) + at[1] * sinA;
      m[2][1] = at[1] * (1 - cosA) - at[0] * sinA;
      return m;
    }
    /**
     * Get a matrix to shear a point from an origin point. For use in `transform2D`.
     */
    static shearAt2DMatrix(tanX, tanY, at) {
      const m = _Mat.shear2DMatrix(tanX, tanY);
      m[2][0] = -at[1] * tanY;
      m[2][1] = -at[0] * tanX;
      return m;
    }
    /**
     * Get a matrix to reflect a point along a line. For use in `transform2D`.
     * @param p1 first end point to define the reflection line
     * @param p1 second end point to define the reflection line
     */
    static reflectAt2DMatrix(p1, p2) {
      const intercept = Line.intercept(p1, p2);
      if (intercept == void 0) {
        return [
          new Pt([-1, 0, 0]),
          new Pt([0, 1, 0]),
          new Pt([p1[0] + p2[0], 0, 1])
        ];
      } else {
        const yi = intercept.yi;
        const ang2 = Math.atan(intercept.slope) * 2;
        const cosA = Math.cos(ang2);
        const sinA = Math.sin(ang2);
        return [
          new Pt([cosA, sinA, 0]),
          new Pt([sinA, -cosA, 0]),
          new Pt([-yi * sinA, yi + yi * cosA, 1])
        ];
      }
    }
  };

  // src/Op.ts
  var _errorLength = (obj, param = "expected") => Util.warn("Group's length is less than " + param, obj);
  var _errorOutofBound = (obj, param = "") => Util.warn(`Index ${param} is out of bound in Group`, obj);
  var Line = class _Line {
    /**
     * Create a line that originates from an anchor point, given an angle and a magnitude.
     * @param anchor an anchor Pt
     * @param angle an angle in radian
     * @param magnitude magnitude of the line
     * @return a Group of 2 Pts representing a line segement
     */
    static fromAngle(anchor, angle, magnitude) {
      let g = new Group(new Pt(anchor), new Pt(anchor));
      g[1].toAngle(angle, magnitude, true);
      return g;
    }
    /**
     * Calculate the slope of a line.
     * @param p1 line's first end point
     * @param p2 line's second end point
     */
    static slope(p1, p2) {
      return p2[0] - p1[0] === 0 ? void 0 : (p2[1] - p1[1]) / (p2[0] - p1[0]);
    }
    /**
     * Calculate the slope and xy intercepts of a line.
     * @param p1 line's first end point
     * @param p2 line's second end point
     * @returns an object with `slope`, `xi`, `yi` properties 
     */
    static intercept(p1, p2) {
      if (p2[0] - p1[0] === 0) {
        return void 0;
      } else {
        let m = (p2[1] - p1[1]) / (p2[0] - p1[0]);
        let c = p1[1] - m * p1[0];
        return { slope: m, yi: c, xi: m === 0 ? void 0 : -c / m };
      }
    }
    /**
     * Given a 2D path and a point, find whether the point is on left or right side of the line.
     * @param line  a Group or an Iterable<PtLike> representing a line
     * @param pt a Pt or numeric array
     * @returns a negative value if on left and a positive value if on right. If collinear, then the return value is 0.
     */
    static sideOfPt2D(line, pt) {
      let _line = Util.iterToArray(line);
      return (_line[1][0] - _line[0][0]) * (pt[1] - _line[0][1]) - (pt[0] - _line[0][0]) * (_line[1][1] - _line[0][1]);
    }
    /**
     * Check if three Pts are collinear, ie, on the same straight path.
     * @param p1 first Pt
     * @param p2 second Pt
     * @param p3 third Pt
     * @param threshold a threshold where a smaller value means higher precision threshold for the straight line. Default is 0.01.
     */
    static collinear(p1, p2, p3, threshold = 0.01) {
      let a = new Pt(0, 0, 0).to(p1).$subtract(p2);
      let b = new Pt(0, 0, 0).to(p1).$subtract(p3);
      return a.$cross(b).divide(1e3).equals(new Pt(0, 0, 0), threshold);
    }
    /**
     * Get magnitude of a line segment.
     * @param line a Group or an Iterable<Pt> with at least 2 Pt
     */
    static magnitude(line) {
      let _line = Util.iterToArray(line);
      return _line.length >= 2 ? _line[1].$subtract(_line[0]).magnitude() : 0;
    }
    /**
     * Get squared magnitude of a line segment.
     * @param _line a Group or an Iterable<Pt> with at least 2 Pt
     */
    static magnitudeSq(line) {
      let _line = Util.iterToArray(line);
      return _line.length >= 2 ? _line[1].$subtract(_line[0]).magnitudeSq() : 0;
    }
    /**
     * Find a point on a line that is perpendicular (shortest distance) to a target point.
     * @param line a Group or an Iterable<Pt> that defines a line
     * @param pt a target Pt 
     * @param asProjection if true, this returns the projection vector instead. Default is false.
     * @returns a Pt on the line that is perpendicular to the target Pt, or a projection vector if `asProjection` is true.
     */
    static perpendicularFromPt(line, pt, asProjection = false) {
      let _line = Util.iterToArray(line);
      if (_line[0].equals(_line[1]))
        return void 0;
      let a = _line[0].$subtract(_line[1]);
      let b = _line[1].$subtract(pt);
      let proj = b.$subtract(a.$project(b));
      return asProjection ? proj : proj.$add(pt);
    }
    /**
     * Given a line and a point, find the shortest distance from the point to the line.
     * @param line a Group of 2 Pts
     * @param pt a Pt
     * @see `Line.perpendicularFromPt`
     */
    static distanceFromPt(line, pt) {
      let _line = Util.iterToArray(line);
      let projectionVector = _Line.perpendicularFromPt(_line, pt, true);
      if (projectionVector) {
        return projectionVector.magnitude();
      } else {
        return _line[0].$subtract(pt).magnitude();
      }
    }
    /**
     * Given two lines as rays (infinite lines), find their intersection point if any.
     * @param la a Group or an Iterable<Pt> with 2 Pt representing a ray
     * @param lb a Group or an Iterable<Pt> with 2 Pts representing another ray
     * @returns an intersection Pt or undefined if no intersection
     */
    static intersectRay2D(la, lb) {
      let _la = Util.iterToArray(la);
      let _lb = Util.iterToArray(lb);
      let a = _Line.intercept(_la[0], _la[1]);
      let b = _Line.intercept(_lb[0], _lb[1]);
      let pa = _la[0];
      let pb = _lb[0];
      if (a == void 0) {
        if (b == void 0)
          return void 0;
        let y1 = -b.slope * (pb[0] - pa[0]) + pb[1];
        return new Pt(pa[0], y1);
      } else {
        if (b == void 0) {
          let y1 = -a.slope * (pa[0] - pb[0]) + pa[1];
          return new Pt(pb[0], y1);
        } else if (b.slope != a.slope) {
          let px = (a.slope * pa[0] - b.slope * pb[0] + pb[1] - pa[1]) / (a.slope - b.slope);
          let py = a.slope * (px - pa[0]) + pa[1];
          return new Pt(px, py);
        } else {
          if (a.yi == b.yi) {
            return new Pt(pa[0], pa[1]);
          } else {
            return void 0;
          }
        }
      }
    }
    /**
     * Given two line segemnts, find their intersection point if any.
     * @param la a Group or an Iterable<Pt> with 2 Pt representing a line segment
     * @param lb a Group or an Iterable<Pt> with 2 Pt representing a line segment
     * @returns an intersection Pt or undefined if no intersection
     */
    static intersectLine2D(la, lb) {
      let _la = Util.iterToArray(la);
      let _lb = Util.iterToArray(lb);
      let pt = _Line.intersectRay2D(_la, _lb);
      return pt && Geom.withinBound(pt, _la[0], _la[1]) && Geom.withinBound(pt, _lb[0], _lb[1]) ? pt : void 0;
    }
    /**
     * Given a line segemnt and a ray (infinite line), find their intersection point if any.
     * @param line a Group of 2 Pts representing a line segment
     * @param ray a Group of 2 Pts representing a ray
     * @returns an intersection Pt or undefined if no intersection
     */
    static intersectLineWithRay2D(line, ray) {
      let _line = Util.iterToArray(line);
      let _ray = Util.iterToArray(ray);
      let pt = _Line.intersectRay2D(_line, _ray);
      return pt && Geom.withinBound(pt, _line[0], _line[1]) ? pt : void 0;
    }
    /**
     * Given a line segemnt or a ray (infinite line), find its intersection point(s) with a polygon.
     * @param lineOrRay a Group or an Iterable<Pt> with 2 Pt representing a line or ray
     * @param poly a Group or an Iterable<Pt> representing a polygon
     * @param sourceIsRay a boolean value to treat the line as a ray (infinite line). Default is `false`.
     */
    static intersectPolygon2D(lineOrRay, poly, sourceIsRay = false) {
      let _lineOrRay = Util.iterToArray(lineOrRay);
      let _poly = Util.iterToArray(poly);
      let fn = sourceIsRay ? _Line.intersectLineWithRay2D : _Line.intersectLine2D;
      let pts = new Group();
      for (let i = 0, len = _poly.length; i < len; i++) {
        let next = i === len - 1 ? 0 : i + 1;
        let d = fn([_poly[i], _poly[next]], _lineOrRay);
        if (d)
          pts.push(d);
      }
      return pts.length > 0 ? pts : void 0;
    }
    /**
     * Find intersection points of 2 sets of lines. This checks all line segments in the two lists. Consider using a bounding-box check before calling this. If you are checking convex polygon intersections, using [`Polygon.intersectPolygon2D`](#link) will be more efficient.
     * @param lines1 an Array/Iterable of (Groups or Iterables<Pt>)
     * @param lines2 an Array/Iterable of (Groups or Iterables<Pt>)
     * @param isRay a boolean value to treat the line as a ray (infinite line). Default is `false`.
     */
    static intersectLines2D(lines1, lines2, isRay = false) {
      let group = new Group();
      let fn = isRay ? _Line.intersectLineWithRay2D : _Line.intersectLine2D;
      for (let l1 of lines1) {
        for (let l2 of lines2) {
          let _ip = fn(l1, l2);
          if (_ip)
            group.push(_ip);
        }
      }
      return group;
    }
    /**
     * Get two points of a ray that intersects with a point on a 2D grid.
     * @param ray a Group or an Iterable<Pt> representing a ray
     * @param gridPt a Pt on the grid
     * @returns a group of two intersecting Pts. The first one is horizontal intersection and the second one is vertical intersection.
     */
    static intersectGridWithRay2D(ray, gridPt) {
      let _ray = Util.iterToArray(ray);
      let t = _Line.intercept(new Pt(_ray[0]).subtract(gridPt), new Pt(_ray[1]).subtract(gridPt));
      let g = new Group();
      if (t && t.xi)
        g.push(new Pt(gridPt[0] + t.xi, gridPt[1]));
      if (t && t.yi)
        g.push(new Pt(gridPt[0], gridPt[1] + t.yi));
      return g;
    }
    /**
     * Get two intersection Pts of a line segment with a 2D grid point.
     * @param line a ray specified by 2 Pts
     * @param gridPt a Pt on the grid
     * @returns a group of two intersecting Pts. The first one is horizontal intersection and the second one is vertical intersection.
     */
    static intersectGridWithLine2D(line, gridPt) {
      let _line = Util.iterToArray(line);
      let g = _Line.intersectGridWithRay2D(_line, gridPt);
      let gg = new Group();
      for (let i = 0, len = g.length; i < len; i++) {
        if (Geom.withinBound(g[i], _line[0], _line[1]))
          gg.push(g[i]);
      }
      return gg;
    }
    /**
     * An easy way to get rectangle-line intersection points. For more optimized implementation, store the rectangle's sides separately (eg, `Rectangle.sides()`) and use `Polygon.intersectPolygon2D()`.
     * @param line a Group representing a line
     * @param rect a Group representing a rectangle
     * @returns a Group of intersecting Pts
     */
    static intersectRect2D(line, rect) {
      let _line = Util.iterToArray(line);
      let _rect = Util.iterToArray(rect);
      let box = Geom.boundingBox(Group.fromPtArray(_line));
      if (!Rectangle.hasIntersectRect2D(box, _rect))
        return new Group();
      return _Line.intersectLines2D([_line], Rectangle.sides(_rect));
    }
    /**
     * Get evenly distributed points on a line. Similar to [`Create.distributeLinear`](#link) but excluding end points.
     * @param line a Group or an Iterable<PtLike> representing a line
     * @param num number of points to get
     */
    static subpoints(line, num) {
      let _line = Util.iterToArray(line);
      let pts = new Group();
      for (let i = 1; i <= num; i++) {
        pts.push(Geom.interpolate(_line[0], _line[1], i / (num + 1)));
      }
      return pts;
    }
    /**
     * Crop this line by a circle or rectangle at end points. This can be useful for creating arrows that connect to an object's edge.
     * @param line a Group or an Iterable<Pt> representing a line to crop
     * @param size size of circle or rectangle as Pt
     * @param index line's end point index, ie, 0 = start and 1 = end.
     * @param cropAsCircle a boolean to specify whether the `size` parameter should be treated as circle. Default is `true`.
     * @return an intersecting point on the line that can be used for cropping.
     */
    static crop(line, size, index = 0, cropAsCircle = true) {
      let _line = Util.iterToArray(line);
      let tdx = index === 0 ? 1 : 0;
      let ls = _line[tdx].$subtract(_line[index]);
      if (ls[0] === 0 || size[0] === 0)
        return _line[index];
      if (cropAsCircle) {
        let d = ls.unit().multiply(size[1]);
        return _line[index].$add(d);
      } else {
        let rect = Rectangle.fromCenter(_line[index], size);
        let sides = Rectangle.sides(rect);
        let sideIdx = 0;
        if (Math.abs(ls[1] / ls[0]) > Math.abs(size[1] / size[0])) {
          sideIdx = ls[1] < 0 ? 0 : 2;
        } else {
          sideIdx = ls[0] < 0 ? 3 : 1;
        }
        return _Line.intersectRay2D(sides[sideIdx], _line);
      }
    }
    /**
     * Create an marker arrow or line, placed at an end point of this line.
     * @param line a Group or an Iterable<Pt> representing a line to place marker
     * @param size size of the marker as Pt
     * @param graphic either "arrow" or "line"
     * @param atTail a boolean, if `true`, the marker will be positioned at tail of the line (ie, index = 1). Default is `true`.
     * @returns a Group that defines the marker's shape
     */
    static marker(line, size, graphic = "arrow", atTail = true) {
      let _line = Util.iterToArray(line);
      let h = atTail ? 0 : 1;
      let t = atTail ? 1 : 0;
      let unit = _line[h].$subtract(_line[t]);
      if (unit.magnitudeSq() === 0)
        return new Group();
      unit.unit();
      let ps = Geom.perpendicular(unit).multiply(size[0]).add(_line[t]);
      if (graphic == "arrow") {
        ps.add(unit.$multiply(size[1]));
        return new Group(_line[t], ps[0], ps[1]);
      } else {
        return new Group(ps[0], ps[1]);
      }
    }
    /**
     * Convert this line to a new rectangle representation.
     * @param line a Group representing a line
     */
    static toRect(line) {
      let _line = Util.iterToArray(line);
      return new Group(_line[0].$min(_line[1]), _line[0].$max(_line[1]));
    }
  };
  var Rectangle = class _Rectangle {
    /**
     * Create a rectangle from top-left anchor point. Same as [`Rectangle.fromTopLeft`](#link).
     * @param topLeft top-left point
     * @param widthOrSize width as a number, or a Pt that defines its size
     * @param height optional height as a number
     * @returns a Group of 2 Pts representing a rectangle
     */
    static from(topLeft, widthOrSize, height) {
      return _Rectangle.fromTopLeft(topLeft, widthOrSize, height);
    }
    /**
     * Create a rectangle given a top-left position and a size.
     * @param topLeft top-left point
     * @param widthOrSize width as a number, or a Pt that defines its size
     * @param height optional height as a number
     * @returns a Group of 2 Pts representing a rectangle
     */
    static fromTopLeft(topLeft, widthOrSize, height) {
      let size = typeof widthOrSize == "number" ? [widthOrSize, height || widthOrSize] : widthOrSize;
      return new Group(new Pt(topLeft), new Pt(topLeft).add(size));
    }
    /**
     * Create a rectangle given a center position and a size.
     * @param topLeft top-left point
     * @param widthOrSize width as a number, or a Pt that defines its size
     * @param height optional height as a number
     * @returns a Group of 2 Pts representing a rectangle
     */
    static fromCenter(center, widthOrSize, height) {
      let half = typeof widthOrSize == "number" ? [widthOrSize / 2, (height || widthOrSize) / 2] : new Pt(widthOrSize).divide(2);
      return new Group(new Pt(center).subtract(half), new Pt(center).add(half));
    }
    /**
     * Create a new circle that either fits within or encloses the rectangle. Same as [`Circle.fromRect`](#link).
     * @param pts a Group or an Iterable<Pt> with 2 Pt representing a rectangle
     * @param within if `true`, the circle will be within the rectangle. If `false`, the circle will enclose the rectangle. 
     * @returns a Group that represents a circle
     */
    static toCircle(pts, within = true) {
      return Circle.fromRect(pts, within);
    }
    /**
     * Create a square that either fits within or encloses a rectangle.
     * @param pts a Group or an Iterable<Pt> with 2 Pt representing a rectangle
     * @param enclose if `true`, the square will enclose the rectangle. Default is `false`, which will fit the square inside the rectangle.
     * @returns a Group of 2 Pts representing a rectangle
     */
    static toSquare(pts, enclose = false) {
      let _pts = Util.iterToArray(pts);
      let s = _Rectangle.size(_pts);
      let m = enclose ? s.maxValue().value : s.minValue().value;
      return _Rectangle.fromCenter(_Rectangle.center(_pts), m, m);
    }
    /**
     * Get the size of this rectangle as a Pt.
     * @param p a Group or an Iterable<Pt> with 2 Pt representing a Rectangle
     */
    static size(pts) {
      let p = Util.iterToArray(pts);
      return p[0].$max(p[1]).subtract(p[0].$min(p[1]));
    }
    /**
     * Get the center of this rectangle.
     * @param p a Group or an Iterable<Pt> with 2 Pt representing a Rectangle
     */
    static center(pts) {
      let p = Util.iterToArray(pts);
      let min = p[0].$min(p[1]);
      let max = p[0].$max(p[1]);
      return min.add(max.$subtract(min).divide(2));
    }
    /**
     * Get the 4 corners of this rectangle as a Group.
     * @param rect a Group or an Iterable<Pt> with 2 Pt representing a Rectangle
     */
    static corners(rect) {
      let _rect = Util.iterToArray(rect);
      let p0 = _rect[0].$min(_rect[1]);
      let p2 = _rect[0].$max(_rect[1]);
      return new Group(p0, new Pt(p2.x, p0.y), p2, new Pt(p0.x, p2.y));
    }
    /**
     * Get the 4 sides of this rectangle as an array of 4 Groups.
     * @param rect a Group or an Iterable<Pt> with 2 Pt representing a Rectangle
     * @returns an array of 4 Groups, each of which represents a line segment
     */
    static sides(rect) {
      let [p0, p1, p2, p3] = _Rectangle.corners(rect);
      return [
        new Group(p0, p1),
        new Group(p1, p2),
        new Group(p2, p3),
        new Group(p3, p0)
      ];
    }
    /**
     * Given an array of rectangles, get a rectangle that bounds all of them.
     * @param rects an array of (Groups or Iterables<PtLike>) that represents a set of rectangles
     * @returns the bounding rectangle as a Group
     */
    static boundingBox(rects) {
      let _rects = Util.iterToArray(rects);
      let merged = Util.flatten(_rects, false);
      let min = Pt.make(2, Number.MAX_VALUE);
      let max = Pt.make(2, Number.MIN_VALUE);
      for (let i = 0, len = merged.length; i < len; i++) {
        let k = 0;
        for (let m of merged[i]) {
          min[k] = Math.min(min[k], m[k]);
          max[k] = Math.max(max[k], m[k]);
          if (++k >= 2)
            break;
        }
      }
      return new Group(min, max);
    }
    /**
     * Convert this rectangle into a Group representing a polygon. An alias for [`Rectangle.corners`](#link)
     * @param rect a Group or an Iterable<Pt> with 2 Pt representing a Rectangle
     */
    static polygon(rect) {
      return _Rectangle.corners(rect);
    }
    /**
     * Subdivide a rectangle into 4 rectangles, one for each quadrant.
     * @param rect a Group or an Iterable<Pt> with 2 Pt representing a Rectangle
     * @returns an array of 4 Groups of rectangles
     */
    static quadrants(rect, center) {
      let _rect = Util.iterToArray(rect);
      let corners = _Rectangle.corners(_rect);
      let _center = center != void 0 ? new Pt(center) : _Rectangle.center(_rect);
      return corners.map((c) => new Group(c, _center).boundingBox());
    }
    /**
     * Subdivde a rectangle into 2 rectangles, by row or by column.
     * @param rect a Group or an Iterable<Pt> with 2 Pt representing a Rectangle
     * @param ratio a value between 0 to 1 to indicate the split ratio
     * @param asRows if `true`, split into 2 rows. Default is `false` which splits into 2 columns.
     * @returns an array of 2 Groups of rectangles
     */
    static halves(rect, ratio = 0.5, asRows = false) {
      let _rect = Util.iterToArray(rect);
      let min = _rect[0].$min(_rect[1]);
      let max = _rect[0].$max(_rect[1]);
      let mid = asRows ? Num.lerp(min[1], max[1], ratio) : Num.lerp(min[0], max[0], ratio);
      return asRows ? [new Group(min, new Pt(max[0], mid)), new Group(new Pt(min[0], mid), max)] : [new Group(min, new Pt(mid, max[1])), new Group(new Pt(mid, min[1]), max)];
    }
    /**
     * Check if a point is within a rectangle.
     * @param rect a Group of 2 Pts representing a Rectangle
     * @param pt the point to check
     */
    static withinBound(rect, pt) {
      let _rect = Util.iterToArray(rect);
      return Geom.withinBound(pt, _rect[0], _rect[1]);
    }
    /**
     * Check if a rectangle is within the bounds of another rectangle.
     * @param rect1 a Group of 2 Pts representing a rectangle
     * @param rect2 a Group of 2 Pts representing a rectangle
     * @param resetBoundingBox if `true`, reset the bounding box. Default is `false` which assumes the rect's first Pt at is its top-left corner.
     */
    static hasIntersectRect2D(rect1, rect2, resetBoundingBox = false) {
      let _rect1 = Util.iterToArray(rect1);
      let _rect2 = Util.iterToArray(rect2);
      if (resetBoundingBox) {
        _rect1 = Geom.boundingBox(_rect1);
        _rect2 = Geom.boundingBox(_rect2);
      }
      if (_rect1[0][0] > _rect2[1][0] || _rect2[0][0] > _rect1[1][0])
        return false;
      if (_rect1[0][1] > _rect2[1][1] || _rect2[0][1] > _rect1[1][1])
        return false;
      return true;
    }
    /**
     * An easy way to get rectangle-rectangle intersection points. For more optimized implementation, store the rectangle's sides separately (eg, `Rectangle.sides()`) and use `Polygon.intersectPolygon2D()`.
     * @param rect1 a Group of 2 Pts representing a rectangle
     * @param rect2 a Group of 2 Pts representing a rectangle
     */
    static intersectRect2D(rect1, rect2) {
      let _rect1 = Util.iterToArray(rect1);
      let _rect2 = Util.iterToArray(rect2);
      if (!_Rectangle.hasIntersectRect2D(_rect1, _rect2))
        return new Group();
      return Line.intersectLines2D(_Rectangle.sides(_rect1), _Rectangle.sides(_rect2));
    }
  };
  var Circle = class _Circle {
    /**
     * Create a circle that either fits within, or encloses, a rectangle.
     * @param pts a Group or an Iterable<PtLike> with 2 Pt representing a rectangle
     * @param enclose if `true`, the circle will enclose the rectangle. Default is `false`, which will fit the circle inside the rectangle.
     * @returns a Group that represents a circle
     */
    static fromRect(pts, enclose = false) {
      let _pts = Util.iterToArray(pts);
      let r = 0;
      let min = r = Rectangle.size(_pts).minValue().value / 2;
      if (enclose) {
        let max = Rectangle.size(_pts).maxValue().value / 2;
        r = Math.sqrt(min * min + max * max);
      } else {
        r = min;
      }
      return new Group(Rectangle.center(_pts), new Pt(r, r));
    }
    /**
     * Create a circle that either fits within, or encloses, a triangle. Same as [`Triangle.circumcircle`](#link) or [`Triangle.incircle`](#link).
     * @param pts a Group or an Iterable<Pt> with 3 Pt representing a rectangle
     * @param enclose if `true`, the circle will enclose the triangle. Default is `false`, which will fit the circle inside the triangle.
     * @returns a Group that represents a circle
     */
    static fromTriangle(pts, enclose = false) {
      if (enclose) {
        return Triangle.circumcircle(pts);
      } else {
        return Triangle.incircle(pts);
      }
    }
    /**
     * Create a circle based on a center point and a radius.
     * @param pt center point of circle
     * @param radius radius of circle
     * @returns a Group that represents a circle
     */
    static fromCenter(pt, radius) {
      return new Group(new Pt(pt), new Pt(radius, radius));
    }
    /**
     * Check if a point is within a circle.
     * @param pts a Group or an Iterable<Pt> with 2 Pt representing a circle
     * @param pt the point to checks
     * @param threshold an optional small number to set threshold. Default is 0.
     */
    static withinBound(pts, pt, threshold = 0) {
      let _pts = Util.iterToArray(pts);
      let d = _pts[0].$subtract(pt);
      return d.dot(d) + threshold < _pts[1].x * _pts[1].x;
    }
    /**
     * Get the intersection points between a circle and a ray (infinite line).
     * @param circle a Group or an Iterable<Pt> with 2 Pt representing a circle
     * @param ray a Group or an Iterable<Pt> with 2 Pt representing a ray 
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectRay2D(circle, ray) {
      let _pts = Util.iterToArray(circle);
      let _ray = Util.iterToArray(ray);
      let d = _ray[0].$subtract(_ray[1]);
      let f = _pts[0].$subtract(_ray[0]);
      let a = d.dot(d);
      let b = f.dot(d);
      let c = f.dot(f) - _pts[1].x * _pts[1].x;
      let p = b / a;
      let q = c / a;
      let disc = p * p - q;
      if (disc < 0) {
        return new Group();
      } else {
        let discSqrt = Math.sqrt(disc);
        let t1 = -p + discSqrt;
        let p1 = _ray[0].$subtract(d.$multiply(t1));
        if (disc === 0)
          return new Group(p1);
        let t2 = -p - discSqrt;
        let p2 = _ray[0].$subtract(d.$multiply(t2));
        return new Group(p1, p2);
      }
    }
    /**
     * Get the intersection points between a circle and a line segment.
     * @param circle a Group or an Iterable<Pt> with Pt representing a circle
     * @param line a Group or an Iterable<Pt> with 2 Pt representing a line
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectLine2D(circle, line) {
      let _pts = Util.iterToArray(circle);
      let _line = Util.iterToArray(line);
      let ps = _Circle.intersectRay2D(_pts, _line);
      let g = new Group();
      if (ps.length > 0) {
        for (let i = 0, len = ps.length; i < len; i++) {
          if (Rectangle.withinBound(_line, ps[i]))
            g.push(ps[i]);
        }
      }
      return g;
    }
    /**
     * Get the intersection points between two circles.
     * @param circle1 a Group or an Iterable<Pt> with 2 Pt representing a circle
     * @param circle2 a Group or an Iterable<Pt> with 2 Pt representing a circle
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectCircle2D(circle1, circle2) {
      let _pts = Util.iterToArray(circle1);
      let _circle = Util.iterToArray(circle2);
      let dv = _circle[0].$subtract(_pts[0]);
      let dr2 = dv.magnitudeSq();
      let dr = Math.sqrt(dr2);
      let ar = _pts[1].x;
      let br = _circle[1].x;
      let ar2 = ar * ar;
      let br2 = br * br;
      if (dr > ar + br) {
        return new Group();
      } else if (dr < Math.abs(ar - br)) {
        return new Group(_pts[0].clone());
      } else {
        let a = (ar2 - br2 + dr2) / (2 * dr);
        let h = Math.sqrt(ar2 - a * a);
        let p = dv.$multiply(a / dr).add(_pts[0]);
        return new Group(
          new Pt(p.x + h * dv.y / dr, p.y - h * dv.x / dr),
          new Pt(p.x - h * dv.y / dr, p.y + h * dv.x / dr)
        );
      }
    }
    /**
     * Quick way to check rectangle intersection with a circle. 
     * For more optimized implementation, store the rectangle's sides separately (eg, [`Rectangle.sides`](#link)) and use [`Polygon.intersectPolygon2D()`](#link).
     * @param circle a Group or an Iterable<Pt> with 2 Pt representing a circle
     * @param rect a Group or an Iterable<Pt> with 2 Pt representing a rectangle
     * @returns a Group of intersection points, or an empty Group if no intersection is found
     */
    static intersectRect2D(circle, rect) {
      let _pts = Util.iterToArray(circle);
      let _rect = Util.iterToArray(rect);
      let sides = Rectangle.sides(_rect);
      let g = [];
      for (let i = 0, len = sides.length; i < len; i++) {
        let ps = _Circle.intersectLine2D(_pts, sides[i]);
        if (ps.length > 0)
          g.push(ps);
      }
      return Util.flatten(g);
    }
    /**
     * Get a rectangle that either fits within or encloses this circle. See also [`Rectangle.toCircle`](#link)
     * @param circle a Group or an Iterable<Pt> with 2 Pt representing a circle
     * @param within if `true`, the rectangle will be within the circle. If `false`, the rectangle will enclose the circle. 
     * @returns a Group representing a rectangle
     */
    static toRect(circle, within = false) {
      let _pts = Util.iterToArray(circle);
      let r = _pts[1][0];
      if (within) {
        let half = Math.sqrt(r * r) / 2;
        return new Group(_pts[0].$subtract(half), _pts[0].$add(half));
      } else {
        return new Group(_pts[0].$subtract(r), _pts[0].$add(r));
      }
    }
    /**
     * Get a triangle that fits within this circle.
     * @param circle a Group or an Iterable<Pt> with 2 Pt representing a circle
     * @param within if `true`, the triangle will be within the circle. If `false`, the triangle will enclose the circle. 
     */
    static toTriangle(circle, within = true) {
      let _pts = Util.iterToArray(circle);
      if (within) {
        let ang = -Math.PI / 2;
        let inc = Math.PI * 2 / 3;
        let g = new Group();
        for (let i = 0; i < 3; i++) {
          g.push(_pts[0].clone().toAngle(ang, _pts[1][0], true));
          ang += inc;
        }
        return g;
      } else {
        return Triangle.fromCenter(_pts[0], _pts[1][0]);
      }
    }
  };
  var Triangle = class _Triangle {
    /**
     * Create a triangle from a rectangle. The triangle will be isosceles, with the bottom of the rectangle as its base.
     * @param rect a Group or an Iterable<Pt> with 2 Pt representing a rectangle
     */
    static fromRect(rect) {
      let _rect = Util.iterToArray(rect);
      let top = _rect[0].$add(_rect[1]).divide(2);
      top.y = _rect[0][1];
      let left = _rect[1].clone();
      left.x = _rect[0][0];
      return new Group(top, _rect[1].clone(), left);
    }
    /**
     * Create a triangle that fits within a circle.
     * @param circle a Group or an Iterable<Pt> with 2 Pt representing a circle
     */
    static fromCircle(circle) {
      return Circle.toTriangle(circle, true);
    }
    /**
     * Create an equilateral triangle based on a center point and a size.
     * @param pt the center point
     * @param size size is the magnitude of lines from center to the triangle's vertices, like a "radius".
     */
    static fromCenter(pt, size) {
      return _Triangle.fromCircle(Circle.fromCenter(pt, size));
    }
    /**
     * Get the medial, which is an inner triangle formed by connecting the midpoints of this triangle's sides.
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @returns a Group representing a medial triangle
     */
    static medial(tri) {
      let _pts = Util.iterToArray(tri);
      if (_pts.length < 3)
        return _errorLength(new Group(), 3);
      return Polygon.midpoints(_pts, true);
    }
    /**
     * Given a point of the triangle, the opposite side is the side which the point doesn't touch.
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @param index a Pt on the triangle group
     * @returns a Group that represents a line of the opposite side
     */
    static oppositeSide(tri, index) {
      let _pts = Util.iterToArray(tri);
      if (_pts.length < 3)
        return _errorLength(new Group(), 3);
      if (index === 0) {
        return Group.fromPtArray([_pts[1], _pts[2]]);
      } else if (index === 1) {
        return Group.fromPtArray([_pts[0], _pts[2]]);
      } else {
        return Group.fromPtArray([_pts[0], _pts[1]]);
      }
    }
    /**
     * Get a triangle's altitude, which is a line from a triangle's point to its opposite side, and perpendicular to its opposite side.
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @param index a Pt on the triangle group
     * @returns a Group that represents the altitude line
     */
    static altitude(tri, index) {
      let _pts = Util.iterToArray(tri);
      let opp = _Triangle.oppositeSide(_pts, index);
      if (opp.length > 1) {
        return new Group(_pts[index], Line.perpendicularFromPt(opp, _pts[index]));
      } else {
        return new Group();
      }
    }
    /**
     * Get orthocenter, which is the intersection point of a triangle's 3 altitudes (the 3 lines that are perpendicular to its 3 opposite sides).
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @returns the orthocenter as a Pt
     */
    static orthocenter(tri) {
      let _pts = Util.iterToArray(tri);
      if (_pts.length < 3)
        return _errorLength(void 0, 3);
      let a = _Triangle.altitude(_pts, 0);
      let b = _Triangle.altitude(_pts, 1);
      return Line.intersectRay2D(a, b);
    }
    /**
     * Get incenter, which is the center point of its inner circle, and also the intersection point of its 3 angle bisector lines (each of which cuts one of the 3 angles in half).
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @returns the incenter as a Pt
     */
    static incenter(tri) {
      let _pts = Util.iterToArray(tri);
      if (_pts.length < 3)
        return _errorLength(void 0, 3);
      let a = Polygon.bisector(_pts, 0).add(_pts[0]);
      let b = Polygon.bisector(_pts, 1).add(_pts[1]);
      return Line.intersectRay2D(new Group(_pts[0], a), new Group(_pts[1], b));
    }
    /**
     * Get an interior circle, which is the largest circle completed enclosed by this triangle.
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @param center Optional parameter if the incenter is already known. Otherwise, leave it empty and the incenter will be calculated
     */
    static incircle(tri, center) {
      let _pts = Util.iterToArray(tri);
      let c = center ? center : _Triangle.incenter(_pts);
      let area = Polygon.area(_pts);
      let perim = Polygon.perimeter(_pts, true);
      let r = 2 * area / perim.total;
      return Circle.fromCenter(c, r);
    }
    /**
     * Get circumcenter, which is the intersection point of its 3 perpendicular bisectors lines ( each of which divides a side in half and is perpendicular to the side).
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @returns the circumcenter as a Pt
     */
    static circumcenter(tri) {
      let _pts = Util.iterToArray(tri);
      let md = _Triangle.medial(_pts);
      let a = [md[0], Geom.perpendicular(_pts[0].$subtract(md[0])).p1.$add(md[0])];
      let b = [md[1], Geom.perpendicular(_pts[1].$subtract(md[1])).p1.$add(md[1])];
      return Line.intersectRay2D(a, b);
    }
    /**
     * Get circumcenter, which is the intersection point of its 3 perpendicular bisectors lines ( each of which divides a side in half and is perpendicular to the side).
     * @param tri a Group or an Iterable<Pt> representing a triangle
     * @param center Optional parameter if the circumcenter is already known. Otherwise, leave it empty and the circumcenter will be calculated 
     */
    static circumcircle(tri, center) {
      let _pts = Util.iterToArray(tri);
      let c = center ? center : _Triangle.circumcenter(_pts);
      let r = _pts[0].$subtract(c).magnitude();
      return Circle.fromCenter(c, r);
    }
  };
  var Polygon = class _Polygon {
    /**
     * Get the centroid of a polygon, which is the average of all its points.
     * @param pts a Group or an Iterable<PtLike> representing a polygon
     */
    static centroid(pts) {
      return Geom.centroid(pts);
    }
    /**
     * Create a rectangular polygon. Same as creating a Rectangle and then getting its corners via [`Rectangle.corners`](#link).
     * @param center center point of the rectangle
     * @param widthOrSize width as number, or a Pt representing the size of the rectangle
     * @param height optional height
     */
    static rectangle(center, widthOrSize, height) {
      return Rectangle.corners(Rectangle.fromCenter(center, widthOrSize, height));
    }
    /**
     * Create a regular polygon.
     * @param center The center position of the polygon
     * @param radius The radius, ie, a length from the center position to one of the polygon's corners.
     * @param sides Number of sides
     */
    static fromCenter(center, radius, sides) {
      let g = new Group();
      for (let i = 0; i < sides; i++) {
        let ang = Math.PI * 2 * i / sides;
        g.push(new Pt(Math.cos(ang) * radius, Math.sin(ang) * radius).add(center));
      }
      return g;
    }
    /**
     * Given a polygon, get one edge using an index.
     * @param pts a Group or an Iterable<PtLike> representing a polygon
     * @param index index of a Pt in the Group
     */
    static lineAt(pts, index) {
      let _pts = Util.iterToArray(pts);
      if (index < 0 || index >= _pts.length)
        throw new Error("index out of the Polygon's range");
      return new Group(_pts[index], index === _pts.length - 1 ? _pts[0] : _pts[index + 1]);
    }
    /**
     * Get the line segments in this polygon.
     * @param poly a Group or an Iterable<Pt>
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @returns an array of Groups which has 2 Pts in each group
     */
    static lines(poly, closePath = true) {
      let _pts = Util.iterToArray(poly);
      if (_pts.length < 2)
        return _errorLength(new Group(), 2);
      let sp = Util.split(_pts, 2, 1);
      if (closePath)
        sp.push(new Group(_pts[_pts.length - 1], _pts[0]));
      return sp.map((g) => g);
    }
    /**
     * Get a new polygon group that is derived from midpoints in this polygon.
     * @param poly a Group or an Iterable<Pt>
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @param t a value between 0 to 1 for interpolation. Default to 0.5 which will get the middle point.
     */
    static midpoints(poly, closePath = false, t = 0.5) {
      let sides = _Polygon.lines(poly, closePath);
      let mids = sides.map((s) => Geom.interpolate(s[0], s[1], t));
      return mids;
    }
    /**
     * Given a Pt in the polygon group, the adjacent sides are the two sides which the Pt touches.
     * @param poly a Group or an Iterable<Pt>
     * @param index the target Pt
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     */
    static adjacentSides(poly, index, closePath = false) {
      let _pts = Util.iterToArray(poly);
      if (_pts.length < 2)
        return _errorLength(new Group(), 2);
      if (index < 0 || index >= _pts.length)
        return _errorOutofBound(new Group(), index);
      let gs = [];
      let left = index - 1;
      if (closePath && left < 0)
        left = _pts.length - 1;
      if (left >= 0)
        gs.push(new Group(_pts[index], _pts[left]));
      let right = index + 1;
      if (closePath && right > _pts.length - 1)
        right = 0;
      if (right <= _pts.length - 1)
        gs.push(new Group(_pts[index], _pts[right]));
      return gs;
    }
    /**
     * Get a bisector which is a line that split between two sides of a polygon equally. 
     * @param poly a Group or an Iterable<Pt>
     * @param index the Pt in the polygon to bisect from
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @returns a bisector Pt that's a normalized unit vector
     */
    static bisector(poly, index) {
      let sides = _Polygon.adjacentSides(poly, index, true);
      if (sides.length >= 2) {
        let a = sides[0][1].$subtract(sides[0][0]).unit();
        let b = sides[1][1].$subtract(sides[1][0]).unit();
        return a.add(b).divide(2);
      } else {
        return void 0;
      }
    }
    /**
     * Find the perimeter of this polygon, ie, the lengths of its sides.
     * @param poly a Group or an Iterable<Pt>
     * @param closePath a boolean to specify whether the polygon should be closed (ie, whether the final segment should be counted).
     * @returns an object with `total` length, and `segments` which is a Pt that stores each segment's length
     */
    static perimeter(poly, closePath = false) {
      let lines = _Polygon.lines(poly, closePath);
      let mag = 0;
      let p = Pt.make(lines.length, 0);
      for (let i = 0, len = lines.length; i < len; i++) {
        let m = Line.magnitude(lines[i]);
        mag += m;
        p[i] = m;
      }
      return {
        total: mag,
        segments: p
      };
    }
    /**
     * Find the area of a *convex* polygon.
     * @param pts a Group or an Iterable<PtLike> representing a polygon
     */
    static area(pts) {
      let _pts = Util.iterToArray(pts);
      if (_pts.length < 3)
        return _errorLength(new Group(), 3);
      let det = (a, b) => a[0] * b[1] - a[1] * b[0];
      let area = 0;
      for (let i = 0, len = _pts.length; i < len; i++) {
        if (i < _pts.length - 1) {
          area += det(_pts[i], _pts[i + 1]);
        } else {
          area += det(_pts[i], _pts[0]);
        }
      }
      return Math.abs(area / 2);
    }
    /**
     * Get a convex hull of a set of points, using Melkman's algorithm. ([Reference](http://geomalgorithms.com/a12-_hull-3.html)).
     * @param pts a Group or an Iterable<PtLike>
     * @param sorted a boolean value to indicate if the group is pre-sorted by x position. Default is false.
     * @returns a group of Pt that defines the convex hull polygon
     */
    static convexHull(pts, sorted = false) {
      let _pts = Util.iterToArray(pts);
      if (_pts.length < 3)
        return _errorLength(new Group(), 3);
      if (!sorted) {
        _pts = _pts.slice();
        _pts.sort((a, b) => a[0] - b[0]);
      }
      let left = (a, b, c) => {
        return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]) > 0;
      };
      let dq = [];
      let bot = _pts.length - 2;
      let top = bot + 3;
      dq[bot] = _pts[2];
      dq[top] = _pts[2];
      if (left(_pts[0], _pts[1], _pts[2])) {
        dq[bot + 1] = _pts[0];
        dq[bot + 2] = _pts[1];
      } else {
        dq[bot + 1] = _pts[1];
        dq[bot + 2] = _pts[0];
      }
      for (let i = 3, len = _pts.length; i < len; i++) {
        let pt = _pts[i];
        if (left(dq[bot], dq[bot + 1], pt) && left(dq[top - 1], dq[top], pt)) {
          continue;
        }
        while (!left(dq[bot], dq[bot + 1], pt)) {
          bot += 1;
        }
        bot -= 1;
        dq[bot] = pt;
        while (!left(dq[top - 1], dq[top], pt)) {
          top -= 1;
        }
        top += 1;
        dq[top] = pt;
      }
      let hull = new Group();
      for (let h = 0; h < top - bot; h++) {
        hull.push(dq[bot + h]);
      }
      return hull;
    }
    /**
     * Given a point in the polygon as an origin, get an array of lines that connect all the remaining points to the origin point.
     * @param poly a Group or an Iterable<Pt> representing a polygon
     * @param originIndex the origin point's index in the polygon
     * @returns an array of Groups of line segments
     */
    static network(poly, originIndex = 0) {
      let _pts = Util.iterToArray(poly);
      let g = [];
      for (let i = 0, len = _pts.length; i < len; i++) {
        if (i != originIndex)
          g.push(new Group(_pts[originIndex], _pts[i]));
      }
      return g;
    }
    /**
     * Given a target Pt, find a Pt in the polygon's corners that's nearest to it.
     * @param poly a Group or an Iterable<Pt>
     * @param pt Pt to check
     * @returns an index in the pts indicating the nearest Pt, or -1 if none found
     */
    static nearestPt(poly, pt) {
      let _near = Number.MAX_VALUE;
      let _item = -1;
      let i = 0;
      for (let p of poly) {
        let d = p.$subtract(pt).magnitudeSq();
        if (d < _near) {
          _near = d;
          _item = i;
        }
        i++;
      }
      return _item;
    }
    /**
     * Project axis (eg, for use in Separation Axis Theorem).
     * @param poly a Group or an Iterable<Pt>
     * @param unitAxis unit axis for calculating dot product
     */
    static projectAxis(poly, unitAxis) {
      let _poly = Util.iterToArray(poly);
      let dot = unitAxis.dot(_poly[0]);
      let d = new Pt(dot, dot);
      for (let n = 1, len = _poly.length; n < len; n++) {
        dot = unitAxis.dot(_poly[n]);
        d = new Pt(Math.min(dot, d[0]), Math.max(dot, d[1]));
      }
      return d;
    }
    /**
     * Check overlap distance from projected axis.
     * @param poly1 a Group or an Iterable<Pt> representing the first polygon
     * @param poly2 a Group or an Iterable<Pt> representing the second polygon
     * @param unitAxis unit axis
     */
    static _axisOverlap(poly1, poly2, unitAxis) {
      let pa = _Polygon.projectAxis(poly1, unitAxis);
      let pb = _Polygon.projectAxis(poly2, unitAxis);
      return pa[0] < pb[0] ? pb[0] - pa[1] : pa[0] - pb[1];
    }
    /**
     * Check if a Pt is inside a convex polygon.
     * @param poly a Group or an Iterable<PtLike> representing a convex polygon
     * @param pt the Pt to check
     */
    static hasIntersectPoint(poly, pt) {
      let _poly = Util.iterToArray(poly);
      let c = false;
      for (let i = 0, len = _poly.length; i < len; i++) {
        let ln = _Polygon.lineAt(_poly, i);
        if (ln[0][1] > pt[1] != ln[1][1] > pt[1] && pt[0] < (ln[1][0] - ln[0][0]) * (pt[1] - ln[0][1]) / (ln[1][1] - ln[0][1]) + ln[0][0]) {
          c = !c;
        }
      }
      return c;
    }
    /**
     * Check if a convex polygon and a circle has intersections using Separating Axis Theorem. 
     * @param poly a Group or an Iterable<Pt> representing a convex polygon
     * @param circle a Group or an Iterable<Pt> representing a circle
     * @returns an `IntersectContext` object that stores the intersection info, or undefined if there's no intersection
     */
    static hasIntersectCircle(poly, circle) {
      let _poly = Util.iterToArray(poly);
      let _circle = Util.iterToArray(circle);
      let info = {
        which: -1,
        // 0 if vertex is on second polygon and edge is on first polygon. 1 if the other way round.
        dist: 0,
        normal: null,
        // perpendicular to edge
        edge: null,
        // the edge where the intersection occur
        vertex: null
        // the vertex on a polygon that has intersected
      };
      let c = _circle[0];
      let r = _circle[1][0];
      let minDist = Number.MAX_SAFE_INTEGER;
      for (let i = 0, len = _poly.length; i < len; i++) {
        let edge = _Polygon.lineAt(_poly, i);
        let axis = new Pt(edge[0].y - edge[1].y, edge[1].x - edge[0].x).unit();
        let poly2 = new Group(c.$add(axis.$multiply(r)), c.$subtract(axis.$multiply(r)));
        let dist = _Polygon._axisOverlap(_poly, poly2, axis);
        if (dist > 0) {
          return null;
        } else if (Math.abs(dist) < minDist) {
          let check = Rectangle.withinBound(edge, Line.perpendicularFromPt(edge, c)) || Circle.intersectLine2D(circle, edge).length > 0;
          if (check) {
            info.edge = edge;
            info.normal = axis;
            minDist = Math.abs(dist);
            info.which = i;
          }
        }
      }
      if (!info.edge)
        return null;
      let dir = c.$subtract(_Polygon.centroid(_poly)).dot(info.normal);
      if (dir < 0)
        info.normal.multiply(-1);
      info.dist = minDist;
      info.vertex = c;
      return info;
    }
    /**
     * Check if two convex polygons have intersections using Separating Axis Theorem. 
     * @param poly1 a Group or an Iterable<Pt> representing a convex polygon
     * @param poly2 a Group or an Iterable<Pt> representing another convex polygon
     * @return an `IntersectContext` object that stores the intersection info, or undefined if there's no intersection
     */
    static hasIntersectPolygon(poly1, poly2) {
      let _poly1 = Util.iterToArray(poly1);
      let _poly2 = Util.iterToArray(poly2);
      let info = {
        which: -1,
        // 0 if vertex is on second polygon and edge is on first polygon. 1 if the other way round.
        dist: 0,
        normal: new Pt(),
        // perpendicular to edge
        edge: new Group(),
        // the edge where the intersection occur
        vertex: new Pt()
        // the vertex on a polygon that has intersected
      };
      let minDist = Number.MAX_SAFE_INTEGER;
      for (let i = 0, plen = _poly1.length + _poly2.length; i < plen; i++) {
        let edge = i < _poly1.length ? _Polygon.lineAt(_poly1, i) : _Polygon.lineAt(_poly2, i - _poly1.length);
        let axis = new Pt(edge[0].y - edge[1].y, edge[1].x - edge[0].x).unit();
        let dist = _Polygon._axisOverlap(_poly1, _poly2, axis);
        if (dist > 0) {
          return null;
        } else if (Math.abs(dist) < minDist) {
          info.edge = edge;
          info.normal = axis;
          minDist = Math.abs(dist);
          info.which = i < _poly1.length ? 0 : 1;
        }
      }
      info.dist = minDist;
      let b1 = info.which === 0 ? _poly2 : _poly1;
      let b2 = info.which === 0 ? _poly1 : _poly2;
      let c1 = _Polygon.centroid(b1);
      let c2 = _Polygon.centroid(b2);
      let dir = c1.$subtract(c2).dot(info.normal);
      if (dir < 0)
        info.normal.multiply(-1);
      let smallest = Number.MAX_SAFE_INTEGER;
      for (let i = 0, len = b1.length; i < len; i++) {
        let d = info.normal.dot(b1[i].$subtract(c2));
        if (d < smallest) {
          smallest = d;
          info.vertex = b1[i];
        }
      }
      return info;
    }
    /**
     * Find intersection points of 2 polygons by checking every side of both polygons. Performance may be slow for complex polygons.
     * @param poly1 a Group or an Iterable<Pt> representing a polygon 
     * @param poly2 a Group or an Iterable<Pt> representing another polygon
     */
    static intersectPolygon2D(poly1, poly2) {
      let _poly1 = Util.iterToArray(poly1);
      let _poly2 = Util.iterToArray(poly2);
      let lp = _Polygon.lines(_poly1);
      let g = [];
      for (let i = 0, len = lp.length; i < len; i++) {
        let ins = Line.intersectPolygon2D(lp[i], _poly2, false);
        if (ins)
          g.push(ins);
      }
      return Util.flatten(g, true);
    }
    /**
     * Get a bounding box for each polygon group, as well as a union bounding-box for all groups.
     * @param polys an Array/Iterable of (Groups or Iterables<Pt>)
     */
    static toRects(polys) {
      let boxes = [];
      for (let g of polys) {
        boxes.push(Geom.boundingBox(g));
      }
      let merged = Util.flatten(boxes, false);
      boxes.unshift(Geom.boundingBox(merged));
      return boxes;
    }
  };
  var Curve = class _Curve {
    /**
     * Get a precalculated coefficients per step. 
     * @param steps number of steps
     */
    static getSteps(steps) {
      let ts = new Group();
      for (let i = 0; i <= steps; i++) {
        let t = i / steps;
        ts.push(new Pt(t * t * t, t * t, t, 1));
      }
      return ts;
    }
    /**
     * Given an index for the starting position in a Pt group, get the control and/or end points of a curve segment.
     * @param pts a Group or an Iterable<PtLike>
     * @param index start index in `pts` array. Default is 0.
     * @param copyStart an optional boolean value to indicate if the start index should be used twice. Default is false.
     * @returns a group of 4 Pts
     */
    static controlPoints(pts, index = 0, copyStart = false) {
      let _pts = Util.iterToArray(pts);
      if (index > _pts.length - 1)
        return new Group();
      let _index = (i) => i < _pts.length - 1 ? i : _pts.length - 1;
      let p0 = _pts[index];
      index = copyStart ? index : index + 1;
      return new Group(
        p0,
        _pts[_index(index++)],
        _pts[_index(index++)],
        _pts[_index(index++)]
      );
    }
    /**
     * Calulcate weighted sum to get the interpolated points.
     * @param ctrls anchors
     * @param params parameters
     */
    static _calcPt(ctrls, params) {
      let x = ctrls.reduce((a, c, i) => a + c.x * params[i], 0);
      let y = ctrls.reduce((a, c, i) => a + c.y * params[i], 0);
      if (ctrls[0].length > 2) {
        let z = ctrls.reduce((a, c, i) => a + c.z * params[i], 0);
        return new Pt(x, y, z);
      }
      return new Pt(x, y);
    }
    /**
     * Create a Catmull-Rom curve. Catmull-Rom is a kind of smooth-looking Cardinal curve.
     * @param pts a Group or an Iterable<PtLike>
     * @param steps the number of line segments per curve. Defaults to 10 steps
     * @returns a curve as a group of interpolated Pt
     */
    static catmullRom(pts, steps = 10) {
      let _pts = Util.iterToArray(pts);
      if (_pts.length < 2)
        return new Group();
      let ps = new Group();
      let ts = _Curve.getSteps(steps);
      let c = _Curve.controlPoints(_pts, 0, true);
      for (let i = 0; i <= steps; i++) {
        ps.push(_Curve.catmullRomStep(ts[i], c));
      }
      let k = 0;
      while (k < _pts.length - 2) {
        let cp = _Curve.controlPoints(_pts, k);
        if (cp.length > 0) {
          for (let i = 0; i <= steps; i++) {
            ps.push(_Curve.catmullRomStep(ts[i], cp));
          }
          k++;
        }
      }
      return ps;
    }
    /**
     * Interpolate to get a point on Catmull-Rom curve.
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @return an interpolated Pt on the curve
     */
    static catmullRomStep(step, ctrls) {
      let m = new Group(
        new Pt(-0.5, 1, -0.5, 0),
        new Pt(1.5, -2.5, 0, 1),
        new Pt(-1.5, 2, 0.5, 0),
        new Pt(0.5, -0.5, 0, 0)
      );
      return _Curve._calcPt(ctrls, Mat.multiply([step], m, true)[0]);
    }
    /**
     * Create a Cardinal curve.
     * @param pts a Group or an Iterable<PtLike>
     * @param steps the number of line segments per curve. Defaults to 10 steps.
     * @param tension optional value between 0 to 1 to specify a "tension". Default to 0.5 which is the tension for Catmull-Rom curve.
     * @returns a curve as a group of interpolated Pt
     */
    static cardinal(pts, steps = 10, tension = 0.5) {
      let _pts = Util.iterToArray(pts);
      if (_pts.length < 2)
        return new Group();
      let ps = new Group();
      let ts = _Curve.getSteps(steps);
      let c = _Curve.controlPoints(_pts, 0, true);
      for (let i = 0; i <= steps; i++) {
        ps.push(_Curve.cardinalStep(ts[i], c, tension));
      }
      let k = 0;
      while (k < _pts.length - 2) {
        let cp = _Curve.controlPoints(_pts, k);
        if (cp.length > 0) {
          for (let i = 0; i <= steps; i++) {
            ps.push(_Curve.cardinalStep(ts[i], cp, tension));
          }
          k++;
        }
      }
      return ps;
    }
    /**
     * Interpolate to get a point on Cardinal curve.
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @param tension optional value between 0 to 1 to specify a "tension". Default to 0.5 which is the tension for Catmull-Rom curve
     * @return an interpolated Pt on the curve
     */
    static cardinalStep(step, ctrls, tension = 0.5) {
      let m = new Group(
        new Pt(-1, 2, -1, 0),
        new Pt(-1, 1, 0, 0),
        new Pt(1, -2, 1, 0),
        new Pt(1, -1, 0, 0)
      );
      let h = Mat.multiply([step], m, true)[0].multiply(tension);
      let h2 = 2 * step[0] - 3 * step[1] + 1;
      let h3 = -2 * step[0] + 3 * step[1];
      let pt = _Curve._calcPt(ctrls, h);
      pt.x += h2 * ctrls[1].x + h3 * ctrls[2].x;
      pt.y += h2 * ctrls[1].y + h3 * ctrls[2].y;
      if (pt.length > 2)
        pt.z += h2 * ctrls[1].z + h3 * ctrls[2].z;
      return pt;
    }
    /**
     * Create a Bezier curve. In a cubic bezier curve, the first and 4th anchors are end-points, and 2nd and 3rd anchors are control-points.
     * @param pts a group of anchor Pt
     * @param steps the number of line segments per curve. Defaults to 10 steps.
     * @returns a curve as a group of interpolated Pt
     */
    static bezier(pts, steps = 10) {
      let _pts = Util.iterToArray(pts);
      if (_pts.length < 4)
        return new Group();
      let ps = new Group();
      let ts = _Curve.getSteps(steps);
      let k = 0;
      while (k < _pts.length - 3) {
        let c = _Curve.controlPoints(_pts, k);
        if (c.length > 0) {
          for (let i = 0; i <= steps; i++) {
            ps.push(_Curve.bezierStep(ts[i], c));
          }
          k += 3;
        }
      }
      return ps;
    }
    /**
     * Interpolate to get a point on a cubic Bezier curve.
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @return an interpolated Pt on the curve
     */
    static bezierStep(step, ctrls) {
      let m = new Group(
        new Pt(-1, 3, -3, 1),
        new Pt(3, -6, 3, 0),
        new Pt(-3, 3, 0, 0),
        new Pt(1, 0, 0, 0)
      );
      return _Curve._calcPt(ctrls, Mat.multiply([step], m, true)[0]);
    }
    /**
     * Create a basis spline (NURBS) curve.
     * @param pts a group of anchor Pt
     * @param steps the number of line segments per curve. Defaults to 10 steps.
     * @param tension optional value between 0 to n to specify a "tension". Default is 1 which is the usual tension.
     * @returns a curve as a group of interpolated Pt
     */
    static bspline(pts, steps = 10, tension = 1) {
      let _pts = Util.iterToArray(pts);
      if (_pts.length < 2)
        return new Group();
      let ps = new Group();
      let ts = _Curve.getSteps(steps);
      let k = 0;
      while (k < _pts.length - 3) {
        let c = _Curve.controlPoints(_pts, k);
        if (c.length > 0) {
          if (tension !== 1) {
            for (let i = 0; i <= steps; i++) {
              ps.push(_Curve.bsplineTensionStep(ts[i], c, tension));
            }
          } else {
            for (let i = 0; i <= steps; i++) {
              ps.push(_Curve.bsplineStep(ts[i], c));
            }
          }
          k++;
        }
      }
      return ps;
    }
    /**
     * Interpolate to get a point on a basis spline curve.
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @return an interpolated Pt on the curve
     */
    static bsplineStep(step, ctrls) {
      let m = new Group(
        new Pt(-0.16666666666666666, 0.5, -0.5, 0.16666666666666666),
        new Pt(0.5, -1, 0, 0.6666666666666666),
        new Pt(-0.5, 0.5, 0.5, 0.16666666666666666),
        new Pt(0.16666666666666666, 0, 0, 0)
      );
      return _Curve._calcPt(ctrls, Mat.multiply([step], m, true)[0]);
    }
    /**
     * Interpolate to get a point on a basis spline curve with tension.
     * @param step the coefficients [t*t*t, t*t, t, 1]
     * @param ctrls a group of anchor Pts
     * @param tension optional value between 0 to n to specify a "tension". Default to 1 which is the usual tension.
     * @return an interpolated Pt on the curve
     */
    static bsplineTensionStep(step, ctrls, tension = 1) {
      let m = new Group(
        new Pt(-0.16666666666666666, 0.5, -0.5, 0.16666666666666666),
        new Pt(-1.5, 2, 0, -0.3333333333333333),
        new Pt(1.5, -2.5, 0.5, 0.16666666666666666),
        new Pt(0.16666666666666666, 0, 0, 0)
      );
      let h = Mat.multiply([step], m, true)[0].multiply(tension);
      let h2 = 2 * step[0] - 3 * step[1] + 1;
      let h3 = -2 * step[0] + 3 * step[1];
      let pt = _Curve._calcPt(ctrls, h);
      pt.x += h2 * ctrls[1].x + h3 * ctrls[2].x;
      pt.y += h2 * ctrls[1].y + h3 * ctrls[2].y;
      if (pt.length > 2)
        pt.z += h2 * ctrls[1].z + h3 * ctrls[2].z;
      return pt;
    }
  };

  // src/uheprng.ts
  function Mash() {
    let n = 4022871197;
    let mash = function(data) {
      if (data) {
        data = data.toString();
        for (let i = 0; i < data.length; i++) {
          n += data.charCodeAt(i);
          let h = 0.02519603282416938 * n;
          n = h >>> 0;
          h -= n;
          h *= n;
          n = h >>> 0;
          h -= n;
          n += h * 4294967296;
        }
        return (n >>> 0) * 23283064365386963e-26;
      } else
        n = 4022871197;
    };
    return mash;
  }
  function uheprng_default(seed) {
    let o = 48;
    let c = 1;
    let p = o;
    let s = new Array(o);
    let i, j, k = 0;
    let mash = Mash();
    for (i = 0; i < o; i++)
      s[i] = mash(Math.random().toString());
    function initState() {
      mash();
      for (i = 0; i < o; i++)
        s[i] = mash(" ");
      c = 1;
      p = o;
    }
    function cleanString(inStr) {
      inStr = inStr.replace(/(^\s*)|(\s*$)/gi, "");
      inStr = inStr.replace(/[\x00-\x1F]/gi, "");
      inStr = inStr.replace(/\n /, "\n");
      return inStr;
    }
    function hashString(inStr) {
      inStr = cleanString(inStr);
      mash(inStr);
      for (i = 0; i < inStr.length; i++) {
        k = inStr.charCodeAt(i);
        for (j = 0; j < o; j++) {
          s[j] -= mash(k.toString());
          if (s[j] < 0)
            s[j] += 1;
        }
      }
    }
    initState();
    hashString(seed);
    return {
      /**
           * this (not anymore) PRIVATE (internal access only) function is the heart of the multiply-with-carry
           * (MWC) PRNG algorithm. When called it returns a pseudo-random number in the form of a
           * 32-bit JavaScript fraction (0.0 to <1.0) it is a PRIVATE function used by the default
           * [0-1] return function, and by the random 'string(n)' function which returns 'n'
           * characters from 33 to 126.
           * @returns a number between 0.0 and 1.0
           */
      random() {
        if (++p >= o)
          p = 0;
        let t = 1768863 * s[p] + c * 23283064365386963e-26;
        return s[p] = t - (c = t | 0);
      }
    };
  }

  // src/Num.ts
  var Num = class _Num {
    /**
     * Check if two numbers are equal or almost equal within a threshold.
     * @param a number a
     * @param b number b
     * @param threshold threshold value that specifies the minimum difference within which the two numbers are considered equal
     */
    static equals(a, b, threshold = 1e-5) {
      return Math.abs(a - b) < threshold;
    }
    /**
     * Calculate linear interpolation between 2 values.
     * @param a start value
     * @param b end value
     * @param t an interpolation value, usually between 0 to 1
     */
    static lerp(a, b, t) {
      return (1 - t) * a + t * b;
    }
    /**
     * Clamp values between min and max.
     * @param val value to clamp
     * @param min min value
     * @param max max value
     */
    static clamp(val, min, max) {
      return Math.max(min, Math.min(max, val));
    }
    /**
     * Different from [`Num.clamp`](#link) in that the value out-of-bound will be "looped back" to the other end.
     * @param val value to bound
     * @param min min value
     * @param max max value
     * @example `boundValue(361, 0, 360)` will return 1
     */
    static boundValue(val, min, max) {
      const len = Math.abs(max - min);
      let a = val % len;
      if (a > max)
        a -= len;
      else if (a < min)
        a += len;
      return a;
    }
    /**
     * Check if a value is within two other values
     * @param p value to check
     * @param a first bounding value
     * @param b second bounding value
     */
    static within(p, a, b) {
      return p >= Math.min(a, b) && p <= Math.max(a, b);
    }
    /**
     * Get a random number within a range.
     * @param a range value 1
     * @param b range value 2
     */
    static randomRange(a, b = 0) {
      const r = a > b ? a - b : b - a;
      return a + _Num.random() * r;
    }
    /**
     * Get a random Pt within the range defined by either 1 or 2 Pt
     * @param a the range if only one Pt is used, or the start of the range if two Pt were used
     * @param b optional Pt to define the end of the range
     */
    static randomPt(a, b) {
      const p = new Pt(a.length);
      const range = b ? Vec.subtract(b.slice(), a) : a;
      const start = b ? a : new Pt(a.length).fill(0);
      for (let i = 0, len = p.length; i < len; i++) {
        p[i] = _Num.random() * range[i] + start[i];
      }
      return p;
    }
    /**
     * Normalize a value within a range.
     * @param n the value to normalize
     * @param a range value 1
     * @param b range value 1
     */
    static normalizeValue(n, a, b) {
      const min = Math.min(a, b);
      const max = Math.max(a, b);
      return (n - min) / (max - min);
    }
    /**
     * Sum a group of numeric arrays.
     * @param pts a Group or an Iterable<PtLike>
     * @returns a Pt of the dimensional sums
     */
    static sum(pts) {
      const _pts = Util.iterToArray(pts);
      const c = new Pt(_pts[0]);
      for (let i = 1, len = _pts.length; i < len; i++) {
        Vec.add(c, _pts[i]);
      }
      return c;
    }
    /**
     * Average a group of numeric arrays
     * @param pts a Group or an Iterable<PtLike>
     * @returns a Pt of averages
     */
    static average(pts) {
      const _pts = Util.iterToArray(pts);
      return _Num.sum(_pts).divide(_pts.length);
    }
    /**
     * Given a value between 0 to 1, returns a value that cycles between 0 -> 1 -> 0 using the provided shaping method.
     * @param t a value between 0 to 1
     * @param method a shaping method. Default to [`Shaping.sineInOut`](#link).
     * @return a value between 0 to 1
     */
    static cycle(t, method = Shaping.sineInOut) {
      return method(t > 0.5 ? 2 - t * 2 : t * 2);
    }
    /**  
     * Map a value from one range to another.
     * @param n a value in the first range
     * @param currMin lower bound of the first range
     * @param currMax upper bound of the first range
     * @param targetMin lower bound of the second range
     * @param targetMax upper bound of the second range
     * @returns a remapped value in the second range
     */
    static mapToRange(n, currA, currB, targetA, targetB) {
      if (currA == currB)
        throw new Error("[currMin, currMax] must define a range that is not zero");
      const min = Math.min(targetA, targetB);
      const max = Math.max(targetA, targetB);
      return _Num.normalizeValue(n, currA, currB) * (max - min) + min;
    }
    /**
     * Seed the pseudorandom generator.
     * @param seed seed string
     */
    static seed(seed) {
      this.generator = uheprng_default(seed);
    }
    /**
     * Return a random number between 0 and 1 from a seed,
     * if the seed is not defined it uses Math.random
     * @returns a number between 0 and 1
     */
    static random() {
      return this.generator ? this.generator.random() : Math.random();
    }
  };
  var Geom = class _Geom {
    /**
     * Bound an angle between 0 to 360 degrees.
     * @param angle angle value
     */
    static boundAngle(angle) {
      return Num.boundValue(angle, 0, 360);
    }
    /**
     * Bound a radian between 0 to two PI.
     * @param radian radian value
     */
    static boundRadian(radian) {
      return Num.boundValue(radian, 0, Const.two_pi);
    }
    /**
     * Convert an angle in degree to radian.
     * @param angle angle value
     */
    static toRadian(angle) {
      return angle * Const.deg_to_rad;
    }
    /**
     * Convert an angle in radian to degree.
     * @param radian radian value
     */
    static toDegree(radian) {
      return radian * Const.rad_to_deg;
    }
    /**
     * Get a bounding box for a set of Pts.
     * @param pts a Group or an Iterable<Pt>
     * @return a Group of two Pts, representing the top-left and bottom-right corners
     */
    static boundingBox(pts) {
      let minPt, maxPt;
      for (const p of pts) {
        if (minPt == void 0) {
          minPt = p.clone();
          maxPt = p.clone();
        } else {
          minPt = minPt.$min(p);
          maxPt = maxPt.$max(p);
        }
      }
      return new Group(minPt, maxPt);
    }
    /**
     * Get a centroid (the average middle point) for a set of Pts.
     * @param pts a Group or an Iterable<PtLike> 
     * @return a centroid Pt 
     */
    static centroid(pts) {
      return Num.average(pts);
    }
    /**
     * Given an anchor Pt, rebase all Pts in this group either to or from this anchor base.
     * @param pts a Group or an Iterable<PtLike> 
     * @param ptOrIndex an index for the Pt array, or an external Pt
     * @param direction a string either "to" (subtract all Pt with this anchor base), or "from" (add all Pt from this anchor base)
     */
    static anchor(pts, ptOrIndex = 0, direction = "to") {
      const method = direction == "to" ? "subtract" : "add";
      let i = 0;
      for (const p of pts) {
        if (typeof ptOrIndex == "number") {
          if (ptOrIndex !== i)
            p[method](pts[ptOrIndex]);
        } else {
          p[method](ptOrIndex);
        }
        i++;
      }
    }
    /**
     * Get an interpolated (or extrapolated) value between two Pts. For linear interpolation between 2 scalar values, use [`Num.lerp`](#link).
     * @param a first Pt
     * @param b second Pt
     * @param t a value between 0 to 1 to interpolate, or any other value to extrapolate
     * @returns interpolated point as a new Pt
     */
    static interpolate(a, b, t = 0.5) {
      const len = Math.min(a.length, b.length);
      const d = Pt.make(len);
      for (let i = 0; i < len; i++) {
        d[i] = a[i] * (1 - t) + b[i] * t;
      }
      return d;
    }
    /**
     * Find two Pts that are perpendicular to this Pt (2D only).
     * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
     * @returns an array of two Pt that are perpendicular to this Pt
     */
    static perpendicular(pt, axis = Const.xy) {
      const y = axis[1];
      const x = axis[0];
      const p = new Pt(pt);
      const pa = new Pt(p);
      pa[x] = -p[y];
      pa[y] = p[x];
      const pb = new Pt(p);
      pb[x] = p[y];
      pb[y] = -p[x];
      return new Group(pa, pb);
    }
    /**
     * Check if two Pts are perpendicular to each other (2D only).
     */
    static isPerpendicular(p1, p2) {
      return new Pt(p1).dot(p2) === 0;
    }
    /**
     * Check if a Pt is within the rectangular boundary defined by two Pts.
     * @param pt the Pt to check
     * @param boundPt1 boundary Pt 1
     * @param boundPt2 boundary Pt 2
     */
    static withinBound(pt, boundPt1, boundPt2) {
      for (let i = 0, len = Math.min(pt.length, boundPt1.length, boundPt2.length); i < len; i++) {
        if (!Num.within(pt[i], boundPt1[i], boundPt2[i]))
          return false;
      }
      return true;
    }
    /**
     * Sort the Pts so that their edges will form a non-overlapping polygon. ([Reference](https://stackoverflow.com/questions/6989100/sort-points-in-clockwise-order))
     * @param pts a Group or an Iterable<Pt>
     */
    static sortEdges(pts) {
      const _pts = Util.iterToArray(pts);
      const bounds = _Geom.boundingBox(_pts);
      const center = bounds[1].add(bounds[0]).divide(2);
      const fn = (a, b) => {
        if (a.length < 2 || b.length < 2)
          throw new Error("Pt dimension cannot be less than 2");
        const da = a.$subtract(center);
        const db = b.$subtract(center);
        if (da[0] >= 0 && db[0] < 0)
          return 1;
        if (da[0] < 0 && db[0] >= 0)
          return -1;
        if (da[0] == 0 && db[0] == 0) {
          if (da[1] >= 0 || db[1] >= 0)
            return da[1] > db[1] ? 1 : -1;
          return db[1] > da[1] ? 1 : -1;
        }
        const det = da.$cross2D(db);
        if (det < 0)
          return 1;
        if (det > 0)
          return -1;
        return da[0] * da[0] + da[1] * da[1] > db[0] * db[0] + db[1] * db[1] ? 1 : -1;
      };
      return _pts.sort(fn);
    }
    /**
     * Scale a Pt or a Group of Pts. You may also use [`Pt.scale`](#link) instance method.
     * @param ps either a single Pt, or a Group or an Iterable<Pt>
     * @param scale scale value
     * @param anchor optional anchor point to scale from
     */
    static scale(ps, scale, anchor) {
      const pts = Util.iterToArray(ps[0] !== void 0 && typeof ps[0] == "number" ? [ps] : ps);
      const scs = typeof scale == "number" ? Pt.make(pts[0].length, scale) : scale;
      if (!anchor)
        anchor = Pt.make(pts[0].length, 0);
      for (let i = 0, len = pts.length; i < len; i++) {
        const p = pts[i];
        for (let k = 0, lenP = p.length; k < lenP; k++) {
          p[k] = anchor && anchor[k] ? anchor[k] + (p[k] - anchor[k]) * scs[k] : p[k] * scs[k];
        }
      }
      return _Geom;
    }
    /**
     * Rotate a Pt or a Group of Pts in 2D space. You may also use [`Pt.rotate2D`](#link) instance method.
     * @param ps either a single Pt, or a Group or an Iterable<Pt>
     * @param angle rotate angle
     * @param anchor optional anchor point to rotate from
     * @param axis optional axis such as "xy" (use Const.xy) to define a 2D plane, or a number array to specify indices
     */
    static rotate2D(ps, angle, anchor, axis) {
      const pts = Util.iterToArray(ps[0] !== void 0 && typeof ps[0] == "number" ? [ps] : ps);
      const fn = anchor ? Mat.rotateAt2DMatrix : Mat.rotate2DMatrix;
      if (!anchor)
        anchor = Pt.make(pts[0].length, 0);
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      for (let i = 0, len = pts.length; i < len; i++) {
        const p = axis ? pts[i].$take(axis) : pts[i];
        p.to(Mat.transform2D(p, fn(cos, sin, anchor)));
        if (axis) {
          for (let k = 0; k < axis.length; k++) {
            pts[i][axis[k]] = p[k];
          }
        }
      }
      return _Geom;
    }
    /**
     * Shear a Pt or a Group of Pts in 2D space. You may also use [`Pt.shear2D`](#link) instance method.
     * @param ps either a single Pt, or a Group or an Iterable<Pt>
     * @param scale shearing value which can be a number or an array of 2 numbers
     * @param anchor optional anchor point to shear from
     * @param axis optional axis such as "xy" (use Const.xy) to define a 2D plane, or a number array to specify indices
     */
    static shear2D(ps, scale, anchor, axis) {
      const pts = Util.iterToArray(ps[0] !== void 0 && typeof ps[0] == "number" ? [ps] : ps);
      const s = typeof scale == "number" ? [scale, scale] : scale;
      if (!anchor)
        anchor = Pt.make(pts[0].length, 0);
      const fn = anchor ? Mat.shearAt2DMatrix : Mat.shear2DMatrix;
      const tanx = Math.tan(s[0]);
      const tany = Math.tan(s[1]);
      for (let i = 0, len = pts.length; i < len; i++) {
        const p = axis ? pts[i].$take(axis) : pts[i];
        p.to(Mat.transform2D(p, fn(tanx, tany, anchor)));
        if (axis) {
          for (let k = 0; k < axis.length; k++) {
            pts[i][axis[k]] = p[k];
          }
        }
      }
      return _Geom;
    }
    /**
     * Reflect a Pt or a Group of Pts along a 2D line. You may also use [`Pt.reflect2D`](#link) instance method.
     * @param ps either a single Pt, or a Group or an Iterable<Pt>
     * @param line a Group or an Iterable<PtLike> that defines a line for reflection
     * @param axis optional axis such as "xy" (use Const.xy) to define a 2D plane, or a number array to specify indices
     */
    static reflect2D(ps, line, axis) {
      const pts = Util.iterToArray(ps[0] !== void 0 && typeof ps[0] == "number" ? [ps] : ps);
      const _line = Util.iterToArray(line);
      const mat = Mat.reflectAt2DMatrix(_line[0], _line[1]);
      for (let i = 0, len = pts.length; i < len; i++) {
        const p = axis ? pts[i].$take(axis) : pts[i];
        p.to(Mat.transform2D(p, mat));
        if (axis) {
          for (let k = 0; k < axis.length; k++) {
            pts[i][axis[k]] = p[k];
          }
        }
      }
      return _Geom;
    }
    /**
     * Generate a cosine lookup table.
     * @returns an object with a cosine tables (array of 360 values) and a function to get cosine given a radian input. 
     */
    static cosTable() {
      const cos = new Float64Array(360);
      for (let i = 0; i < 360; i++)
        cos[i] = Math.cos(i * Math.PI / 180);
      const find = (rad) => cos[Math.floor(_Geom.boundAngle(_Geom.toDegree(rad)))];
      return { table: cos, cos: find };
    }
    /**
     * Generate a sine lookup table.
     * @returns an object with a sine tables (array of 360 values) and a function to get sine value given a radian input. 
     */
    static sinTable() {
      const sin = new Float64Array(360);
      for (let i = 0; i < 360; i++)
        sin[i] = Math.sin(i * Math.PI / 180);
      const find = (rad) => sin[Math.floor(_Geom.boundAngle(_Geom.toDegree(rad)))];
      return { table: sin, sin: find };
    }
  };
  var Shaping = class _Shaping {
    /**
     * Linear mapping.
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static linear(t, c = 1) {
      return c * t;
    }
    /** 
     * Quadratic in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
    */
    static quadraticIn(t, c = 1) {
      return c * t * t;
    }
    /** 
     * Quadratic out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
    */
    static quadraticOut(t, c = 1) {
      return -c * t * (t - 2);
    }
    /** 
     * Quadratic in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static quadraticInOut(t, c = 1) {
      const dt = t * 2;
      return t < 0.5 ? c / 2 * t * t * 4 : -c / 2 * ((dt - 1) * (dt - 3) - 1);
    }
    /** 
     * Cubic in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static cubicIn(t, c = 1) {
      return c * t * t * t;
    }
    /** 
     * Cubic out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static cubicOut(t, c = 1) {
      const dt = t - 1;
      return c * (dt * dt * dt + 1);
    }
    /** 
     * Cubic in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static cubicInOut(t, c = 1) {
      const dt = t * 2;
      return t < 0.5 ? c / 2 * dt * dt * dt : c / 2 * ((dt - 2) * (dt - 2) * (dt - 2) + 2);
    }
    /** 
     * Exponential ease in, adapted from Golan Levin's [polynomial shapers](http://www.flong.com/texts/code/shapers_poly/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p a value between 0 to 1 to control the curve. Default is 0.25.
     */
    static exponentialIn(t, c = 1, p = 0.25) {
      return c * Math.pow(t, 1 / p);
    }
    /** 
     * Exponential ease out, adapted from Golan Levin's [polynomial shapers](http://www.flong.com/texts/code/shapers_poly/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p a value between 0 to 1 to control the curve. Default is 0.25.
     */
    static exponentialOut(t, c = 1, p = 0.25) {
      return c * Math.pow(t, p);
    }
    /** 
     * Sinuous in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static sineIn(t, c = 1) {
      return -c * Math.cos(t * Const.half_pi) + c;
    }
    /** 
     * Sinuous out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static sineOut(t, c = 1) {
      return c * Math.sin(t * Const.half_pi);
    }
    /** 
     * Sinuous in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static sineInOut(t, c = 1) {
      return -c / 2 * (Math.cos(Math.PI * t) - 1);
    }
    /** 
     * A faster way to approximate cosine ease in-out using Blinn-Wyvill Approximation. Adapated from Golan Levin's [polynomial shaping](http://www.flong.com/texts/code/shapers_poly/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static cosineApprox(t, c = 1) {
      const t2 = t * t;
      const t4 = t2 * t2;
      const t6 = t4 * t2;
      return c * (4 * t6 / 9 - 17 * t4 / 9 + 22 * t2 / 9);
    }
    /** 
     * Circular in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static circularIn(t, c = 1) {
      return -c * (Math.sqrt(1 - t * t) - 1);
    }
    /** 
     * Circular out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static circularOut(t, c = 1) {
      const dt = t - 1;
      return c * Math.sqrt(1 - dt * dt);
    }
    /** 
     * Circular in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static circularInOut(t, c = 1) {
      const dt = t * 2;
      return t < 0.5 ? -c / 2 * (Math.sqrt(1 - dt * dt) - 1) : c / 2 * (Math.sqrt(1 - (dt - 2) * (dt - 2)) + 1);
    }
    /** 
     * Elastic in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p elastic parmeter between 0 to 1. The lower the number, the more elastic it will be. Default is 0.7.
     */
    static elasticIn(t, c = 1, p = 0.7) {
      const dt = t - 1;
      const s = p / Const.two_pi * 1.5707963267948966;
      return c * (-Math.pow(2, 10 * dt) * Math.sin((dt - s) * Const.two_pi / p));
    }
    /** 
     * Elastic out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p elastic parmeter between 0 to 1. The lower the number, the more elastic it will be. Default is 0.7.
     */
    static elasticOut(t, c = 1, p = 0.7) {
      const s = p / Const.two_pi * 1.5707963267948966;
      return c * (Math.pow(2, -10 * t) * Math.sin((t - s) * Const.two_pi / p)) + c;
    }
    /** 
     * Elastic in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p elastic parmeter between 0 to 1. The lower the number, the more elastic it will be. Default is 0.6.
     */
    static elasticInOut(t, c = 1, p = 0.6) {
      let dt = t * 2;
      const s = p / Const.two_pi * 1.5707963267948966;
      if (t < 0.5) {
        dt -= 1;
        return c * (-0.5 * (Math.pow(2, 10 * dt) * Math.sin((dt - s) * Const.two_pi / p)));
      } else {
        dt -= 1;
        return c * (0.5 * (Math.pow(2, -10 * dt) * Math.sin((dt - s) * Const.two_pi / p))) + c;
      }
    }
    /** 
     * Bounce in, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static bounceIn(t, c = 1) {
      return c - _Shaping.bounceOut(1 - t, c);
    }
    /** 
     * Bounce out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static bounceOut(t, c = 1) {
      if (t < 1 / 2.75) {
        return c * (7.5625 * t * t);
      } else if (t < 2 / 2.75) {
        t -= 1.5 / 2.75;
        return c * (7.5625 * t * t + 0.75);
      } else if (t < 2.5 / 2.75) {
        t -= 2.25 / 2.75;
        return c * (7.5625 * t * t + 0.9375);
      } else {
        t -= 2.625 / 2.75;
        return c * (7.5625 * t * t + 0.984375);
      }
    }
    /** 
     * Bounce in-out, adapted from Robert Penner's [easing functions](http://robertpenner.com/easing/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     */
    static bounceInOut(t, c = 1) {
      return t < 0.5 ? _Shaping.bounceIn(t * 2, c) / 2 : _Shaping.bounceOut(t * 2 - 1, c) / 2 + c / 2;
    }
    /** 
     * Sigmoid curve changes its shape adapted from the input value, but always returns a value between 0 to 1.
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p the larger the value, the "steeper" the curve will be. Default is 10.
     */
    static sigmoid(t, c = 1, p = 10) {
      const d = p * (t - 0.5);
      return c / (1 + Math.exp(-d));
    }
    /** 
     * Logistic sigmoid, adapted from Golan Levin's [shaping function](http://www.flong.com/texts/code/shapers_exp/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p a parameter between 0 to 1 to control the steepness of the curve. Higher is steeper. Default is 0.7.
     */
    static logSigmoid(t, c = 1, p = 0.7) {
      p = Math.max(Const.epsilon, Math.min(1 - Const.epsilon, p));
      p = 1 / (1 - p);
      const A = 1 / (1 + Math.exp((t - 0.5) * p * -2));
      const B = 1 / (1 + Math.exp(p));
      const C = 1 / (1 + Math.exp(-p));
      return c * (A - B) / (C - B);
    }
    /** 
     * Exponential seat curve, adapted from Golan Levin's [shaping functions](http://www.flong.com/texts/code/shapers_exp/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p a parameter between 0 to 1 to control the steepness of the curve. Higher is steeper. Default is 0.5.
     */
    static seat(t, c = 1, p = 0.5) {
      if (t < 0.5) {
        return c * Math.pow(2 * t, 1 - p) / 2;
      } else {
        return c * (1 - Math.pow(2 * (1 - t), 1 - p) / 2);
      }
    }
    /** 
     * Quadratic bezier curve, adapted from Golan Levin's [shaping functions](http://www.flong.com/texts/code/shapers_exp/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p1 a Pt object specifying the first control Pt, or a value specifying the control Pt's x position (its y position will default to 0.5). Default is `Pt(0.95, 0.95)
     */
    static quadraticBezier(t, c = 1, p = [0.05, 0.95]) {
      const a = typeof p != "number" ? p[0] : p;
      const b = typeof p != "number" ? p[1] : 0.5;
      let om2a = 1 - 2 * a;
      if (om2a === 0) {
        om2a = Const.epsilon;
      }
      const d = (Math.sqrt(a * a + om2a * t) - a) / om2a;
      return c * ((1 - 2 * b) * (d * d) + 2 * b * d);
    }
    /** 
     * Cubic bezier curve. This reuses the bezier functions in Curve class.
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p1` a Pt object specifying the first control Pt. Default is `Pt(0.1, 0.7).
     * @param p2` a Pt object specifying the second control Pt. Default is `Pt(0.9, 0.2).
     */
    static cubicBezier(t, c = 1, p1 = [0.1, 0.7], p2 = [0.9, 0.2]) {
      const curve = new Group(new Pt(0, 0), new Pt(p1), new Pt(p2), new Pt(1, 1));
      return c * Curve.bezierStep(new Pt(t * t * t, t * t, t, 1), Curve.controlPoints(curve)).y;
    }
    /** 
     * Give a Pt, draw a quadratic curve that will pass through that Pt as closely as possible. Adapted from Golan Levin's [shaping functions](http://www.flong.com/texts/code/shapers_poly/).
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p1` a Pt object specifying the Pt to pass through. Default is `Pt(0.2, 0.35)
     */
    static quadraticTarget(t, c = 1, p1 = [0.2, 0.35]) {
      const a = Math.min(1 - Const.epsilon, Math.max(Const.epsilon, p1[0]));
      const b = Math.min(1, Math.max(0, p1[1]));
      const A = (1 - b) / (1 - a) - b / a;
      const B = (A * (a * a) - b) / a;
      const y = A * (t * t) - B * t;
      return c * Math.min(1, Math.max(0, y));
    }
    /** 
     * Step function is a simple jump from 0 to 1 at a specific Pt in time.
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param p usually a value between 0 to 1, which specify the Pt to "jump". Default is 0.5 which is in the middle.
     */
    static cliff(t, c = 1, p = 0.5) {
      return t > p ? c : 0;
    }
    /** 
     * Convert any shaping functions into a series of steps.
     * @param fn the original shaping function
     * @param steps the number of steps
     * @param t a value between 0 to 1
     * @param c the value to shape, default is 1
     * @param args optional paramters to pass to original function
     */
    static step(fn, steps, t, c, ...args) {
      const s = 1 / steps;
      const tt = Math.floor(t / s) * s;
      return fn(tt, c, ...args);
    }
  };
  var Range = class {
    /**
     * Construct a Range instance for a Group of Pts.
     * @param g a Group or an Iterable<Pt>
     */
    constructor(g) {
      this._dims = 0;
      this._source = Group.fromPtArray(g);
      this.calc();
    }
    /**
     * Get this Range's maximum values per dimension.
     */
    get max() {
      return this._max.clone();
    }
    /**
     * Get this Range's minimum values per dimension.
     */
    get min() {
      return this._min.clone();
    }
    /**
     * Get this Range's magnitude in each dimension.
     */
    get magnitude() {
      return this._mag.clone();
    }
    /**
     * Go through the group and find its min and max values. Usually you don't need to call this function directly.
     */
    calc() {
      if (!this._source)
        return;
      const dims = this._source[0].length;
      this._dims = dims;
      const max = new Pt(dims);
      const min = new Pt(dims);
      const mag = new Pt(dims);
      for (let i = 0; i < dims; i++) {
        max[i] = Const.min;
        min[i] = Const.max;
        mag[i] = 0;
        const s = this._source.zipSlice(i);
        for (let k = 0, len = s.length; k < len; k++) {
          max[i] = Math.max(max[i], s[k]);
          min[i] = Math.min(min[i], s[k]);
          mag[i] = max[i] - min[i];
        }
      }
      this._max = max;
      this._min = min;
      this._mag = mag;
      return this;
    }
    /**
     * Map this Range to another range of values.
     * @param min target range's minimum value
     * @param max target range's maximum value
     * @param exclude Optional boolean array where `true` means excluding the conversion in that specific dimension.
     */
    mapTo(min, max, exclude) {
      const target = new Group();
      for (let i = 0, len = this._source.length; i < len; i++) {
        const g = this._source[i];
        const n = new Pt(this._dims);
        for (let k = 0; k < this._dims; k++) {
          n[k] = exclude && exclude[k] ? g[k] : Num.mapToRange(g[k], this._min[k], this._max[k], min, max);
        }
        target.push(n);
      }
      return target;
    }
    /**
     * Add more Pts to this Range and recalculate its min and max values.
     * @param pts a Group or an Iterable<PtLike> to append to this Range
     * @param update Optional. Set the parameter to `false` if you want to append without immediately updating this Range's min and max values. Default is `true`.
     */
    append(pts, update = true) {
      const _pts = Util.iterToArray(pts);
      if (_pts[0].length !== this._dims)
        throw new Error(`Dimensions don't match. ${this._dims} dimensions in Range and ${_pts[0].length} provided in parameter. `);
      this._source = this._source.concat(_pts);
      if (update)
        this.calc();
      return this;
    }
    /**
     * Create a number of evenly spaced "ticks" that span this Range's min and max value.
     * @param count number of subdivision. For example, 10 subdivision will return 11 tick values, which include first(min) and last(max) values.
     */
    ticks(count) {
      const g = new Group();
      for (let i = 0; i <= count; i++) {
        const p = new Pt(this._dims);
        for (let k = 0, len = this._max.length; k < len; k++) {
          p[k] = Num.lerp(this._min[k], this._max[k], i / count);
        }
        g.push(p);
      }
      return g;
    }
  };

  // src/Util.ts
  var Const = {
    /** A string to indicate xy plane. */
    xy: "xy",
    /** A string to indicate yz plane. */
    yz: "yz",
    /** A string to indicate xz plane. */
    xz: "xz",
    /** A string to indicate xyz space. */
    xyz: "xyz",
    /** Represents horizontal direction. */
    horizontal: 0,
    /** Represents vertical direction. */
    vertical: 1,
    /** Represents identical point or value */
    identical: 0,
    /** Represents right position or direction */
    right: 4,
    /** Represents bottom right position or direction */
    bottom_right: 5,
    /** Represents bottom position or direction */
    bottom: 6,
    /** Represents bottom left position or direction */
    bottom_left: 7,
    /** Represents left position or direction */
    left: 8,
    /** Represents top left position or direction */
    top_left: 1,
    /** Represents top position or direction */
    top: 2,
    /** Represents top right position or direction */
    top_right: 3,
    /** Represents an arbitrary very small number. It is set as 0.0001 here. */
    epsilon: 1e-4,
    /** Represents Number.MAX_VALUE */
    max: Number.MAX_VALUE,
    /** Represents Number.MIN_VALUE */
    min: Number.MIN_VALUE,
    /** π radian (180 deg) */
    pi: Math.PI,
    /** Two π radian (360deg) */
    two_pi: 6.283185307179586,
    /** Half π radian (90deg) */
    half_pi: 1.5707963267948966,
    /** π/4 radian (45deg) */
    quarter_pi: 0.7853981633974483,
    /** π/180 or 1 degree in radian */
    one_degree: 0.017453292519943295,
    /** Multiply this constant with a radian to get a degree */
    rad_to_deg: 57.29577951308232,
    /** Multiply this constant with a degree to get a radian */
    deg_to_rad: 0.017453292519943295,
    /** Gravity acceleration (unit: m/s^2) and gravity force (unit: Newton) on 1kg of mass. */
    gravity: 9.81,
    /** 1 Newton: 0.10197 Kilogram-force */
    newton: 0.10197,
    /** Gaussian constant (1 / Math.sqrt(2 * Math.PI)) */
    gaussian: 0.3989422804014327
  };
  var _Util = class _Util {
    /**
     * Set a global warning level setting. If no parameter is passed, this will return the current warn-level. See [`Util.warn`](#link).
     * @param lv a [`WarningType`](#link) option, where "error" will throw an error, "warn" will log in console, and "mute" will ignore the error. 
     */
    static warnLevel(lv) {
      if (lv) {
        _Util._warnLevel = lv;
      }
      return _Util._warnLevel;
    }
    /**
     * Convert different kinds of parameters (arguments, array, object) into an array of numbers.  
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    static getArgs(args) {
      if (args.length < 1)
        return [];
      let pos = [];
      let isArray = Array.isArray(args[0]) || ArrayBuffer.isView(args[0]);
      if (typeof args[0] === "number") {
        pos = Array.prototype.slice.call(args);
      } else if (typeof args[0] === "object" && !isArray) {
        let a = ["x", "y", "z", "w"];
        let p = args[0];
        for (let i = 0; i < a.length; i++) {
          if (p.length && i >= p.length || !(a[i] in p))
            break;
          pos.push(p[a[i]]);
        }
      } else if (isArray) {
        pos = [].slice.call(args[0]);
      }
      return pos;
    }
    /**
     * Send a warning message based on [`Util.warnLevel`](#link) global setting. This allows you to dynamically set whether minor errors should be thrown or printed in console or muted.
     * @param message any error or warning message
     * @param defaultReturn optional return value
     */
    static warn(message = "error", defaultReturn = void 0) {
      if (_Util.warnLevel() == "error") {
        throw new Error(message);
      } else if (_Util.warnLevel() == "warn") {
        console.warn(message);
      }
      return defaultReturn;
    }
    /**
     * Get a random integer. This can be useful for selecting a random index in an array.
     * @param range value range
     * @param start Optional starting value
     */
    static randomInt(range, start = 0) {
      _Util.warn("Util.randomInt is deprecated. Please use `Num.randomRange`");
      return Math.floor(Num.random() * range) + start;
    }
    /**
     * Split an array into chunks of sub-array.
     * @param pts an array 
     * @param size chunk size, ie, number of items in a chunk
     * @param stride optional parameter to "walk through" the array in steps
     * @param loopBack if `true`, always go through the array till the end and loop back to the beginning to complete the segments if needed.
     * @param matchSize if `true`, all chunks's length must match `size`.
     */
    static split(pts, size, stride, loopBack = false, matchSize = true) {
      let chunks = [];
      let part = [];
      let st = stride || size;
      let index = 0;
      if (pts.length <= 0 || st <= 0)
        return [];
      while (index < pts.length) {
        part = [];
        for (let k = 0; k < size; k++) {
          if (loopBack) {
            part.push(pts[(index + k) % pts.length]);
          } else {
            if (index + k >= pts.length)
              break;
            part.push(pts[index + k]);
          }
        }
        index += st;
        if (!matchSize || matchSize && part.length === size)
          chunks.push(part);
      }
      return chunks;
    }
    /**
     * Flatten an array of arrays such as Group[] to a flat Array or Group.
     * @param pts an array, usually an array of Groups
     * @param flattenAsGroup a boolean to specify whether the return type should be a Group or Array. Default is `true` which returns a Group.
     */
    static flatten(pts, flattenAsGroup = true) {
      let arr = flattenAsGroup ? new Group() : [];
      return arr.concat.apply(arr, pts);
    }
    /**
      * Given two arrays of objects, and a function that operate on two objects, return an array. Objects must be of same type. 
      * @param a an array of object, eg `[Group, Group, ...]` 
      * @param b another array of object 
      * @param op a function that takes two parameters (a, b) and returns an object. 
    */
    static combine(a, b, op) {
      let result = [];
      for (let i = 0, len = a.length; i < len; i++) {
        for (let k = 0, lenB = b.length; k < lenB; k++) {
          result.push(op(a[i], b[k]));
        }
      }
      return result;
    }
    /**
     * Zip arrays. eg, `[[1,2],[3,4],[5,6]] => [[1,3,5],[2,4,6]]`.
     * @param arrays an array of arrays 
     */
    static zip(arrays) {
      let z = [];
      for (let i = 0, len = arrays[0].length; i < len; i++) {
        let p = [];
        for (let k = 0; k < arrays.length; k++) {
          p.push(arrays[k][i]);
        }
        z.push(p);
      }
      return z;
    }
    /**
     * Create a convenient stepper. This returns a function which you can call repeatedly to step a counter.
     * @param max Maximum of the stepper range. The resulting stepper will return (min to max-1) values.
     * @param min Minimum of the stepper range. Default is 0.
     * @param stride Stride of the step. Default is 1.
     * @param callback An optional callback function `fn( step )`, which will be called each time when stepper function is called.
     * @example `let counter = stepper(100); let c = counter(); c = counter(); ...`
     * @returns a function which will increment the stepper and return its value at each call.
     */
    static stepper(max, min = 0, stride = 1, callback) {
      let c = min;
      return function() {
        c += stride;
        if (c >= max) {
          c = min + (c - max);
        }
        if (callback)
          callback(c);
        return c;
      };
    }
    /**
     * A convenient way to step through a range. Same as `for (i=0; i<range; i++)`, except this also stores the resulting return values at each step and return them as an array.
     * @param range a range to step through
     * @param fn a callback function `fn(index)`. If this function returns a value, it will be stored at each step
     * @returns an array of returned values at each step  
     */
    static forRange(fn, range, start = 0, step = 1) {
      let temp = [];
      for (let i = start, len = range; i < len; i += step) {
        temp[i] = fn(i);
      }
      return temp;
    }
    /**
     * A helper function to load data from a url via XMLHttpRequest GET. Since the response passed into callback is a string, if you're loading json data, you may use standard `JSON.parse(response)` to get a JSON object. For csv, try using a javascript csv library like papaparse or vega/datalib.
     * @param url the request url
     * @param callback a function to capture the data. It receives two parameters: a `response` as string, and a `success` status as boolean.
     */
    static load(url, callback) {
      let request = new XMLHttpRequest();
      request.open("GET", url, true);
      request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
          callback(request.responseText, true);
        } else {
          callback(`Server error (${request.status}) when loading "${url}"`, false);
        }
      };
      request.onerror = function() {
        callback(`Unknown network error`, false);
      };
      request.send();
    }
    /**
     * Download the current `CanvasSpace` as an image (jpg/png/webp). Calling this function will automatically trigger a download.
     * @param space an instance of `CanvasSpace`
     * @param filename the name of the file, without the extension name. 
     * @param filetype the image type (jpg/png/webp)
     * @param quality a value between 0 to 1, if filetype is either "jpg" or "png"
     */
    static download(space, filename = "pts_canvas_image", filetype = "png", quality = 1) {
      const ftype = filetype === "jpg" ? "jpeg" : filetype;
      space.element.toBlob(function(blob) {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `${filename}.${filetype}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, `image/${ftype}`, quality);
    }
    /**
     * Estimate performance by checking how long it takes to render a frame
     * @param avgFrames The number of frames used calculate to average
     * @example `let perf = Util.performance(); perf();` 
     * @returns milliseconds per frame
     */
    static performance(avgFrames = 10) {
      let last = Date.now();
      let avg = [];
      return function() {
        const now = Date.now();
        avg.push(now - last);
        if (avg.length >= avgFrames)
          avg.shift();
        last = now;
        return Math.floor(avg.reduce((a, b) => a + b, 0) / avg.length);
      };
    }
    /**
     * Check number of items in a Group against a required number
     * @param pts a Group or an Iterable<PtLike> 
     * @param minRequired minimum number of items required
     */
    static arrayCheck(pts, minRequired = 2) {
      if (Array.isArray(pts) && pts.length < minRequired) {
        _Util.warn(`Requires ${minRequired} or more Pts in this Group.`);
        return false;
      }
      return true;
    }
    /**
     * Convert an iterable into an array
     * @param it an iterable
     */
    static iterToArray(it) {
      return !Array.isArray(it) ? [...it] : it;
    }
    /**
     * Check if accessing from a mobile device. Can be useful since some experimental features may not be availble in mobile browsers.
     */
    static isMobile() {
      return /iPhone|iPad|Android/i.test(navigator.userAgent);
    }
    /**
     * Generate a time-based unique ID or a crypto-based ID.
     * @returns 
     */
    static uniqueId(useCrypto = false) {
      return useCrypto && crypto ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).substring(2);
    }
  };
  _Util._warnLevel = "mute";
  var Util = _Util;

  // src/Pt.ts
  var Pt = class _Pt extends Float32Array {
    /**
     * Create a Pt. If no parameter is provided, this will instantiate a Pt with 2 dimensions [0, 0]. 
     * Note that `new Pt(3)` will only instantiate Pt with length of 3 (ie, same as `new Float32Array(3)` ). If you need a Pt with 1 dimension of value 3, use `new Pt([3])`.
     * @example `new Pt()`, `new Pt(1,2,3,4,5)`, `new Pt([1,2])`, `new Pt({x:0, y:1})`, `new Pt(pt)`
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    constructor(...args) {
      let params;
      if (args.length === 1 && typeof args[0] == "number") {
        params = args[0];
      } else {
        params = args.length > 0 ? Util.getArgs(args) : [0, 0];
      }
      super(params);
    }
    /**
     * Create an n-dimensional Pt with either default value or random values.
     * @param dimensions number of dimensions
     * @param defaultValue optional default value to fill the dimensions
     * @param randomize if `true`, randomize the value between 0 to default value
     */
    static make(dimensions, defaultValue = 0, randomize = false) {
      const p = new Float32Array(dimensions);
      if (defaultValue)
        p.fill(defaultValue);
      if (randomize) {
        for (let i = 0, len = p.length; i < len; i++) {
          p[i] = p[i] * Num.random();
        }
      }
      return new _Pt(p);
    }
    /**
     * ID string of this Pt
     */
    get id() {
      return this._id;
    }
    set id(s) {
      this._id = s;
    }
    /**
     * Value in the first dimensional of this Pt
     */
    get x() {
      return this[0];
    }
    set x(n) {
      this[0] = n;
    }
    /**
     * Value in the second dimension of this Pt
     */
    get y() {
      return this[1];
    }
    set y(n) {
      this[1] = n;
    }
    /**
     * Value in the third dimension of this Pt
     */
    get z() {
      return this[2];
    }
    set z(n) {
      this[2] = n;
    }
    /**
     * Value in the forth dimension of this Pt
     */
    get w() {
      return this[3];
    }
    set w(n) {
      this[3] = n;
    }
    /**
     * Clone this Pt and return it as a new Pt.
     */
    clone() {
      return new _Pt(this);
    }
    /**
     * Check if another Pt is equal to this Pt, within a threshold.
     * @param p another Pt to compare with
     * @param threshold a threshold value within which the two Pts are considered equal. Default is 0.000001.
     */
    equals(p, threshold = 1e-6) {
      for (let i = 0, len = this.length; i < len; i++) {
        if (Math.abs(this[i] - p[i]) > threshold)
          return false;
      }
      return true;
    }
    /**
     * Update the values of this Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    to(...args) {
      const p = Util.getArgs(args);
      for (let i = 0, len = Math.min(this.length, p.length); i < len; i++) {
        this[i] = p[i];
      }
      return this;
    }
    /**
     * Like [`Pt.to`](#link) but returns a new Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $to(...args) {
      return this.clone().to(...args);
    }
    /**
     * Update the values of this Pt to point at a specific angle.
     * @param radian target angle in radian
     * @param magnitude Optional magnitude if known. If not provided, it'll calculate and use this Pt's magnitude.
     * @param anchorFromPt If `true`, add it from this Pt's current position. Default is `false` which update the position from origin (0,0). See also [`Geom.rotate2D`](#link) for rotating a point from another anchor point.
     */
    toAngle(radian, magnitude, anchorFromPt = false) {
      const m = magnitude != void 0 ? magnitude : this.magnitude();
      const change = [Math.cos(radian) * m, Math.sin(radian) * m];
      return anchorFromPt ? this.add(change) : this.to(change);
    }
    /**
     * Create an operation using this Pt, passing this Pt into a custom function's first parameter. See the [Op guide](../guide/Op-0400.html) for details.
     * @param fn any function that takes a Pt as its first parameter
     * @example `let myOp = pt.op( fn ); let result = myOp( [1,2,3] );`
     * @returns a resulting function that takes other parameters required in `fn`
     */
    op(fn) {
      const self = this;
      return (...params) => {
        return fn(self, ...params);
      };
    }
    /**
     * This combines a series of operations into an array. See the [Op guide](../guide/Op-0400.html) for details.
     * @param fns an array of functions for `op`
     * @example `let myOps = pt.ops([fn1, fn2, fn3]); let results = myOps.map( (op) => op([1,2,3]) );`
     * @returns an array of resulting functions
     */
    ops(fns) {
      const _ops = [];
      for (let i = 0, len = fns.length; i < len; i++) {
        _ops.push(this.op(fns[i]));
      }
      return _ops;
    }
    /**
     * Take specific dimensional values from this Pt and create a new Pt.
     * @param axis a string such as "xy" (use Const.xy) or an array to specify indices
     */
    $take(axis) {
      const p = [];
      for (let i = 0, len = axis.length; i < len; i++) {
        p.push(this[axis[i]] || 0);
      }
      return new _Pt(p);
    }
    /**
     * Concatenate this Pt with addition dimensional values and return as a new Pt.
     * @param args can be either a list of numbers, an array, a Pt,  or an object with {x,y,z,w} properties
     */
    $concat(...args) {
      return new _Pt(this.toArray().concat(Util.getArgs(args)));
    }
    /**
     * Add scalar or vector values to this Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    add(...args) {
      args.length === 1 && typeof args[0] == "number" ? Vec.add(this, args[0]) : Vec.add(this, Util.getArgs(args));
      return this;
    }
    /**
     * Like [`Pt.add`](#link), but returns result as a new Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $add(...args) {
      return this.clone().add(...args);
    }
    /**
     * Subtract scalar or vector values from this Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    subtract(...args) {
      args.length === 1 && typeof args[0] == "number" ? Vec.subtract(this, args[0]) : Vec.subtract(this, Util.getArgs(args));
      return this;
    }
    /**
     * Like [`Pt.subtract`](#link), but returns result as a new Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $subtract(...args) {
      return this.clone().subtract(...args);
    }
    /**
     * Multiply scalar or vector values (as element-wise) with this Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    multiply(...args) {
      args.length === 1 && typeof args[0] == "number" ? Vec.multiply(this, args[0]) : Vec.multiply(this, Util.getArgs(args));
      return this;
    }
    /**
     * Like [`Pt.multiply`](#link), but returns result as a new Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $multiply(...args) {
      return this.clone().multiply(...args);
    }
    /**
     * Divide this Pt over scalar or vector values (as element-wise).
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    divide(...args) {
      args.length === 1 && typeof args[0] == "number" ? Vec.divide(this, args[0]) : Vec.divide(this, Util.getArgs(args));
      return this;
    }
    /**
     * Like [`Pt.divide`](#link), but returns result as a new Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $divide(...args) {
      return this.clone().divide(...args);
    }
    /**
     * Get the squared distance (magnitude) of this Pt from origin.
     */
    magnitudeSq() {
      return Vec.dot(this, this);
    }
    /**
     * Get the distance (magnitude) of this Pt from origin.
     */
    magnitude() {
      return Vec.magnitude(this);
    }
    /**
     * Convert to a unit vector, which is a normalized vector whose magnitude equals to 1.
     * @param magnitude Optional: if the magnitude is known, pass it as a parameter to avoid duplicate calculation.
     */
    unit(magnitude = void 0) {
      Vec.unit(this, magnitude);
      return this;
    }
    /**
     * Get a new unit vector from this Pt.
     */
    $unit(magnitude = void 0) {
      return this.clone().unit(magnitude);
    }
    /**
     * Dot product of this Pt and another Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    dot(...args) {
      return Vec.dot(this, Util.getArgs(args));
    }
    /**
     * 2D Cross product of this Pt and another Pt. Return results as a new Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $cross2D(...args) {
      return Vec.cross2D(this, Util.getArgs(args));
    }
    /**
     * 3D Cross product of this Pt and another Pt. Return results as a new Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $cross(...args) {
      return Vec.cross(this, Util.getArgs(args));
    }
    /**
     * Calculate vector projection of this Pt on another Pt. 
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     * @returns the projection vector as a Pt
     */
    $project(...args) {
      return this.$multiply(this.dot(...args) / this.magnitudeSq());
    }
    /**
     * Calculate scalar projection.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    projectScalar(...args) {
      return this.dot(...args) / this.magnitude();
    }
    /**
     * Absolute values for all values in this pt.
     */
    abs() {
      Vec.abs(this);
      return this;
    }
    /**
     * Get a new Pt with absolute values of this Pt.
     */
    $abs() {
      return this.clone().abs();
    }
    /**
     * Floor values for all values in this Pt.
     */
    floor() {
      Vec.floor(this);
      return this;
    }
    /**
     * Get a new Pt with floor values of this Pt.
     */
    $floor() {
      return this.clone().floor();
    }
    /**
     * Ceiling values for all values in this Pt.
     */
    ceil() {
      Vec.ceil(this);
      return this;
    }
    /**
     * Get a new Pt with ceiling values of this Pt.
     */
    $ceil() {
      return this.clone().ceil();
    }
    /**
     * Rounded values for all values in this Pt.
     */
    round() {
      Vec.round(this);
      return this;
    }
    /**
     * Get a new Pt with rounded values of this Pt.
     */
    $round() {
      return this.clone().round();
    }
    /**
     * Find the minimum value across all dimensions in this Pt.
     * @returns an object with `value` and `index` which returns the minimum value and its dimensional index
     */
    minValue() {
      return Vec.min(this);
    }
    /**
     * Find the maximum value across all dimensions in this Pt.
     * @returns an object with `value` and `index` which returns the maximum value and its dimensional index
     */
    maxValue() {
      return Vec.max(this);
    }
    /**
     * Get a new Pt that has the minimum dimensional values of this Pt and another Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $min(...args) {
      const p = Util.getArgs(args);
      const m = this.clone();
      for (let i = 0, len = Math.min(this.length, p.length); i < len; i++) {
        m[i] = Math.min(this[i], p[i]);
      }
      return m;
    }
    /**
     * Get a new Pt that has the maximum dimensional values of this Pt and another Pt.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    $max(...args) {
      const p = Util.getArgs(args);
      const m = this.clone();
      for (let i = 0, len = Math.min(this.length, p.length); i < len; i++) {
        m[i] = Math.max(this[i], p[i]);
      }
      return m;
    }
    /**
     * Get angle of this Pt from origin.
     * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
     */
    angle(axis = Const.xy) {
      return Math.atan2(this[axis[1]], this[axis[0]]);
    }
    /**
     * Get the angle between this and another Pt.
     * @param p the other Pt
     * @param axis a string such as "xy" (use Const.xy) or an array to specify index for two dimensions
     */
    angleBetween(p, axis = Const.xy) {
      return Geom.boundRadian(this.angle(axis)) - Geom.boundRadian(p.angle(axis));
    }
    /**
     * Scale this Pt from origin or from an anchor point.
     * @param scale scale ratio
     * @param anchor optional anchor point to scale from
     */
    scale(scale, anchor) {
      Geom.scale(this, scale, anchor || _Pt.make(this.length, 0));
      return this;
    }
    /**
     * Rotate this Pt from origin or from an anchor point in 2D.
     * @param angle rotate angle
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    rotate2D(angle, anchor, axis) {
      Geom.rotate2D(this, angle, anchor || _Pt.make(this.length, 0), axis);
      return this;
    }
    /**
     * Shear this Pt from origin or from an anchor point in 2D.
     * @param shear shearing value which can be a number or an array of 2 numbers
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    shear2D(scale, anchor, axis) {
      Geom.shear2D(this, scale, anchor || _Pt.make(this.length, 0), axis);
      return this;
    }
    /**
     * Reflect this Pt along a 2D line.
     * @param line a Group of 2 Pts that defines a line for reflection
     * @param axis optional axis such as "yz" to define a 2D plane of reflection
     */
    reflect2D(line, axis) {
      Geom.reflect2D(this, line, axis);
      return this;
    }
    /**
     * A string representation of this Pt. Eg, "Pt(1, 2, 3)".
     */
    toString() {
      return `Pt(${this.join(", ")})`;
    }
    /**
     * Convert this Pt to a javascript Array.
     */
    toArray() {
      return [].slice.call(this);
    }
    /**
     * Convert this Pt to a Group as new Group([0,...], pt)
     */
    toGroup() {
      return new Group(_Pt.make(this.length), this.clone());
    }
    /**
     * Convert this Pt to a Bound as new Group([0,...], pt)
     */
    toBound() {
      return new Bound(_Pt.make(this.length), this.clone());
    }
  };
  var Group = class _Group extends Array {
    /**
     * Create a Group by passing an array of [`Pt`](#link). You may also create a Group using [`Group.fromArray`](#link) or [`Group.fromPtArray`](#link).
     * @param args an array of Pts
     */
    constructor(...args) {
      super(...args);
    }
    /**
     * ID string of this Group
     */
    get id() {
      return this._id;
    }
    set id(s) {
      this._id = s;
    }
    /** 
     * The first Pt in this Group 
     */
    get p1() {
      return this[0];
    }
    /** 
     * The second Pt in this Group 
     */
    get p2() {
      return this[1];
    }
    /** 
     * The third Pt in this Group 
     */
    get p3() {
      return this[2];
    }
    /** 
     * The forth Pt in this Group 
     */
    get p4() {
      return this[3];
    }
    /** 
     * The last Pt in this Group 
     */
    get q1() {
      return this[this.length - 1];
    }
    /** 
     * The second-last Pt in this Group 
     */
    get q2() {
      return this[this.length - 2];
    }
    /** 
     * The third-last Pt in this Group 
     */
    get q3() {
      return this[this.length - 3];
    }
    /** 
     * The forth-last Pt in this Group 
     */
    get q4() {
      return this[this.length - 4];
    }
    /**
     * Depp clone this group and its Pts.
     */
    clone() {
      const group = new _Group();
      for (let i = 0, len = this.length; i < len; i++) {
        group.push(this[i].clone());
      }
      return group;
    }
    /**
     * Convert an array of numeric arrays into a Group.
     * @param list an Iterable<PtLike> such as an array or a generator (of PtLike numeric arrays)
     * @example `Group.fromArray( [[1,2], [3,4], [5,6]] )`
     */
    static fromArray(list) {
      const g = new _Group();
      for (const li of list) {
        const p = li instanceof Pt ? li : new Pt(li);
        g.push(p);
      }
      return g;
    }
    /**
     * Convert an Array/Iterable of Pt into a Group.
     * @param list an Iterable<Pt>
     */
    static fromPtArray(list) {
      return _Group.from(list);
    }
    /**
     * Split this Group into an array of sub-groups.
     * @param chunkSize number of items per sub-group
     * @param stride forward-steps after each sub-group
     * @param loopBack if `true`, always go through the array till the end and loop back to the beginning to complete the segments if needed
     */
    split(chunkSize, stride, loopBack = false) {
      const sp = Util.split(this, chunkSize, stride, loopBack);
      return sp;
    }
    /**
     * Insert more Pt into this group.
     * @param pts a Group or an Iterable<Pt>
     * @param index the index position to insert into
     */
    insert(pts, index = 0) {
      _Group.prototype.splice.apply(this, [index, 0, ...pts]);
      return this;
    }
    /**
     * Like Array's splice function, with support for negative index and a friendlier name.
     * @param index start index, which can be negative (where -1 is at index 0, -2 at index 1, etc)
     * @param count number of items to remove
     * @returns The items that are removed. 
     */
    remove(index = 0, count = 1) {
      const param = index < 0 ? [index * -1 - 1, count] : [index, count];
      return _Group.prototype.splice.apply(this, param);
    }
    /**
     * Split this group into an array of sub-group segments.
     * @param pts_per_segment number of Pts in each segment
     * @param stride forward-step to take
     * @param loopBack if `true`, always go through the array till the end and loop back to the beginning to complete the segments if needed
     */
    segments(pts_per_segment = 2, stride = 1, loopBack = false) {
      return this.split(pts_per_segment, stride, loopBack);
    }
    /**
     * Get all the line segments (ie, edges in a graph) of this group.
     */
    lines() {
      return this.segments(2, 1);
    }
    /**
     * Find the centroid of this group's Pts, which is the average middle point.
     */
    centroid() {
      return Geom.centroid(this);
    }
    /**
     * Find the rectangular bounding box of this group's Pts.
     * @returns a Group of 2 Pts representing the top-left and bottom-right of the rectangle
     */
    boundingBox() {
      return Geom.boundingBox(this);
    }
    /**
     * Anchor all the Pts in this Group using a target Pt as origin. (ie, subtract all Pt with the target anchor to get a relative position). All the Pts' values will be updated.
     * @param ptOrIndex a Pt, or a numeric index to target a specific Pt in this Group
     */
    anchorTo(ptOrIndex = 0) {
      Geom.anchor(this, ptOrIndex, "to");
    }
    /**
     * Anchor all the Pts in this Group by its absolute position from a target Pt. (ie, add all Pt with the target anchor to get an absolute position).  All the Pts' values will be updated.
     * @param ptOrIndex a Pt, or a numeric index to target a specific Pt in this Group
     */
    anchorFrom(ptOrIndex = 0) {
      Geom.anchor(this, ptOrIndex, "from");
    }
    /**
     * Create an operation using this Group, passing this Group into a custom function's first parameter.  See the [Op guide](../guide/Op-0400.html) for details.
     * @param fn any function that takes a Group as its first parameter
     * @example `let myOp = group.op( fn ); let result = myOp( [1,2,3] );`
     * @returns a resulting function that takes other parameters required in `fn`
     */
    op(fn) {
      const self = this;
      return (...params) => {
        return fn(self, ...params);
      };
    }
    /**
     * This combines a series of operations into an array. See the [Op guide](../guide/Op-0400.html) for details.
     * @param fns an array of functions for `op`
     * @example `let myOps = pt.ops([fn1, fn2, fn3]); let results = myOps.map( (op) => op([1,2,3]) );`
     * @returns an array of resulting functions
     */
    ops(fns) {
      const _ops = [];
      for (let i = 0, len = fns.length; i < len; i++) {
        _ops.push(this.op(fns[i]));
      }
      return _ops;
    }
    /**
     * Get an interpolated point on the line segments defined by this Group.
     * @param t a value between 0 to 1 usually
     */
    interpolate(t) {
      t = Num.clamp(t, 0, 1);
      const chunk = this.length - 1;
      const tc = 1 / (this.length - 1);
      const idx = Math.floor(t / tc);
      return Geom.interpolate(this[idx], this[Math.min(this.length - 1, idx + 1)], (t - idx * tc) * chunk);
    }
    /**
     * Move every Pt's position by a specific amount. Same as [`Group.add`](#link).
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    moveBy(...args) {
      return this.add(...args);
    }
    /**
     * Move the first Pt in this group to a specific position, and move all the other Pts correspondingly.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    moveTo(...args) {
      const d = new Pt(Util.getArgs(args)).subtract(this[0]);
      this.moveBy(d);
      return this;
    }
    /**
     * Scale this group's Pts from an anchor point. Default anchor point is the first Pt in this group.
     * @param scale scale ratio
     * @param anchor optional anchor point to scale from
     */
    scale(scale, anchor) {
      for (let i = 0, len = this.length; i < len; i++) {
        Geom.scale(this[i], scale, anchor || this[0]);
      }
      return this;
    }
    /**
     * Rotate this group's Pt from an anchor point in 2D. Default anchor point is the first Pt in this group.
     * @param angle rotate angle
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    rotate2D(angle, anchor, axis) {
      for (let i = 0, len = this.length; i < len; i++) {
        Geom.rotate2D(this[i], angle, anchor || this[0], axis);
      }
      return this;
    }
    /**
     * Shear this group's Pt from an anchor point in 2D. Default anchor point is the first Pt in this group.
     * @param shear shearing value which can be a number or an array of 2 numbers
     * @param anchor optional anchor point to scale from
     * @param axis optional string such as "yz" to specify a 2D plane
     */
    shear2D(scale, anchor, axis) {
      for (let i = 0, len = this.length; i < len; i++) {
        Geom.shear2D(this[i], scale, anchor || this[0], axis);
      }
      return this;
    }
    /**
     * Reflect this group's Pts along a 2D line. Default anchor point is the first Pt in this group.
     * @param line a Group or an Iterable<PtLike> with 2 Pt that defines a line for reflection
     * @param axis optional axis such as "yz" to define a 2D plane of reflection
     */
    reflect2D(line, axis) {
      for (let i = 0, len = this.length; i < len; i++) {
        Geom.reflect2D(this[i], line, axis);
      }
      return this;
    }
    /**
     * Sort this group's Pts by values in a specific dimension.
     * @param dim dimensional index
     * @param desc if true, sort descending. Default is false (ascending)
     */
    sortByDimension(dim, desc = false) {
      return this.sort((a, b) => desc ? b[dim] - a[dim] : a[dim] - b[dim]);
    }
    /**
     * Update each Pt in this Group with an existing Pt function.
     * @param ptFn string name of an existing Pt function. Note that the function must return Pt.
     * @param args arguments for the function specified in ptFn
     */
    forEachPt(ptFn, ...args) {
      if (!this[0][ptFn]) {
        Util.warn(`${ptFn} is not a function of Pt`);
        return this;
      }
      for (let i = 0, len = this.length; i < len; i++) {
        this[i] = this[i][ptFn](...args);
      }
      return this;
    }
    /**
     * Add scalar or vector values to this group's Pts.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    add(...args) {
      return this.forEachPt("add", ...args);
    }
    /**
     * Subtract scalar or vector values from this group's Pts.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    subtract(...args) {
      return this.forEachPt("subtract", ...args);
    }
    /**
     * Multiply scalar or vector values (as element-wise) with this group's Pts.
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    multiply(...args) {
      return this.forEachPt("multiply", ...args);
    }
    /**
     * Divide this group's Pts over scalar or vector values (as element-wise).
     * @param args can be either a list of numbers, an array, a Pt, or an object with {x,y,z,w} properties
     */
    divide(...args) {
      return this.forEachPt("divide", ...args);
    }
    /**
     * Apply this group as a matrix and calculate matrix addition.
     * @param g a scalar number, an array of numeric arrays, or a group of Pt
     * @returns a new Group
     */
    $matrixAdd(g) {
      return Mat.add(this, g);
    }
    /**
     * Apply this group as a matrix and calculate matrix multiplication.
     * @param g a scalar number, an array of numeric arrays, or a Group of K Pts, each with N dimensions (K-rows, N-columns) -- or if transposed is true, then N Pts with K dimensions
     * @param transposed (Only applicable if it's not elementwise multiplication) If true, then a and b's columns should match (ie, each Pt should have the same dimensions). Default is `false`.
     * @param elementwise if true, then the multiplication is done element-wise. Default is `false`.
     * @returns If not elementwise, this will return a new  Group with M Pt, each with N dimensions (M-rows, N-columns).
     */
    $matrixMultiply(g, transposed = false, elementwise = false) {
      return Mat.multiply(this, g, transposed, elementwise);
    }
    /**
     * Zip one slice of an array of Pt. Imagine the Pts are organized in rows, then this function will take the values in a specific column.
     * @param idx index to zip at
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     */
    zipSlice(index, defaultValue = false) {
      return Mat.zipSlice(this, index, defaultValue);
    }
    /**
     * Zip a group of Pt. eg, [[1,2],[3,4],[5,6]] => [[1,3,5],[2,4,6]].
     * @param defaultValue a default value to fill if index out of bound. If not provided, it will throw an error instead.
     * @param useLongest If true, find the longest list of values in a Pt and use its length for zipping. Default is false, which uses the first item's length for zipping.
     */
    $zip(defaultValue = void 0, useLongest = false) {
      return Mat.zip(this, defaultValue, useLongest);
    }
    /**
     * Get a Bound instance of this group
     */
    toBound() {
      return Bound.fromGroup(this);
    }
    /**
     * Get a string representation of this group.
     */
    toString() {
      return "Group[ " + this.reduce((p, c) => p + c.toString() + " ", "") + " ]";
    }
  };
  var Bound = class _Bound extends Group {
    /**
     * Create a Bound. This is similar to the Group constructor. You can also create a Bound via the static function [`Bound.fromGroup`](#link), or alternatively via the [Group.toBound](#link) function.
     * @param args a list of Pt as parameters
     * @see Bound.fromGroup
     */
    constructor(...args) {
      super(...args);
      this._center = new Pt();
      this._size = new Pt();
      this._topLeft = new Pt();
      this._bottomRight = new Pt();
      this._inited = false;
      this.init();
    }
    /**
     * Create a Bound from a [`ClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) object.
     * @param rect an object that has {top, left, bottom, right, width, height} properties
     * @returns a Bound object
     */
    static fromBoundingRect(rect) {
      const b = new _Bound(new Pt(rect.left || 0, rect.top || 0), new Pt(rect.right || 0, rect.bottom || 0));
      if (rect.width && rect.height)
        b.size = new Pt(rect.width, rect.height);
      return b;
    }
    /**
     * Create a Bound from a Group or an array of Pts
     * @param g a Group or an Iterable<PtLike>
     */
    static fromGroup(g) {
      const _g = Util.iterToArray(g);
      if (_g.length < 2)
        throw new Error("Cannot create a Bound from a group that has less than 2 Pt");
      return new _Bound(_g[0], _g[_g.length - 1]);
    }
    /**
     * Initiate the bound's properties.
     */
    init() {
      if (this.p1) {
        this._size = this.p1.clone();
        this._inited = true;
      }
      if (this.p1 && this.p2) {
        const a = this.p1;
        const b = this.p2;
        this.topLeft = a.$min(b);
        this._bottomRight = a.$max(b);
        this._updateSize();
        this._inited = true;
      }
    }
    /**
     * Clone this bound and return a new one.
     */
    clone() {
      return new _Bound(this._topLeft.clone(), this._bottomRight.clone());
    }
    /**
     * Recalculte size and center.
     */
    _updateSize() {
      this._size = this._bottomRight.$subtract(this._topLeft).abs();
      this._updateCenter();
    }
    /**
     * Recalculate center.
     */
    _updateCenter() {
      this._center = this._size.$multiply(0.5).add(this._topLeft);
    }
    /**
     * Recalculate based on top-left position and size.
     */
    _updatePosFromTop() {
      this._bottomRight = this._topLeft.$add(this._size);
      this._updateCenter();
    }
    /**
     * Recalculate based on bottom-right position and size.
     */
    _updatePosFromBottom() {
      this._topLeft = this._bottomRight.$subtract(this._size);
      this._updateCenter();
    }
    /**
     * Recalculate based on center position and size.
     */
    _updatePosFromCenter() {
      const half = this._size.$multiply(0.5);
      this._topLeft = this._center.$subtract(half);
      this._bottomRight = this._center.$add(half);
    }
    /**
     * Size of this Bound
     */
    get size() {
      return new Pt(this._size);
    }
    set size(p) {
      this._size = new Pt(p);
      this._updatePosFromTop();
    }
    /**
     * Center position of this Bound
     */
    get center() {
      return new Pt(this._center);
    }
    set center(p) {
      this._center = new Pt(p);
      this._updatePosFromCenter();
    }
    /**
     * Top-left position of this Bound
     */
    get topLeft() {
      return new Pt(this._topLeft);
    }
    set topLeft(p) {
      this._topLeft = new Pt(p);
      this[0] = this._topLeft;
      this._updateSize();
    }
    /**
     * Bottom-right position of this Bound
     */
    get bottomRight() {
      return new Pt(this._bottomRight);
    }
    set bottomRight(p) {
      this._bottomRight = new Pt(p);
      this[1] = this._bottomRight;
      this._updateSize();
    }
    /**
     * Width of this Bound
     */
    get width() {
      return this._size.length > 0 ? this._size.x : 0;
    }
    set width(w) {
      this._size.x = w;
      this._updatePosFromTop();
    }
    /**
     * Height of this Bound
     */
    get height() {
      return this._size.length > 1 ? this._size.y : 0;
    }
    set height(h) {
      this._size.y = h;
      this._updatePosFromTop();
    }
    /**
     * Depth of this Bound
     */
    get depth() {
      return this._size.length > 2 ? this._size.z : 0;
    }
    set depth(d) {
      this._size.z = d;
      this._updatePosFromTop();
    }
    /**
     * First value of the Bound's top-left position
     */
    get x() {
      return this.topLeft.x;
    }
    /**
     * Second value of the Bound's top-left position
     */
    get y() {
      return this.topLeft.y;
    }
    /**
     * Third value of the Bound's top-left position
     */
    get z() {
      return this.topLeft.z;
    }
    /**
     * Whether this Bound has been initiated
     */
    get inited() {
      return this._inited;
    }
    /**
     * If the Bound's Pts are changed, call this function to update the Bound's properties.
     * It's simpler and preferable to change the Bound's properties (eg, topLeft, bottomRight) instead of updating the Bound's Pts.
     */
    update() {
      this._topLeft = this[0];
      this._bottomRight = this[1];
      this._updateSize();
      return this;
    }
  };

  // src/UI.ts
  var UI_exports = {};
  __export(UI_exports, {
    UI: () => UI,
    UIButton: () => UIButton,
    UIDragger: () => UIDragger,
    UIPointerActions: () => UIPointerActions,
    UIShape: () => UIShape
  });
  var UIShape = {
    rectangle: "rectangle",
    circle: "circle",
    polygon: "polygon",
    polyline: "polyline",
    line: "line"
  };
  var UIPointerActions = {
    up: "up",
    down: "down",
    move: "move",
    drag: "drag",
    uidrag: "uidrag",
    drop: "drop",
    uidrop: "uidrop",
    over: "over",
    out: "out",
    enter: "enter",
    leave: "leave",
    click: "click",
    keydown: "keydown",
    keyup: "keyup",
    pointerdown: "pointerdown",
    pointerup: "pointerup",
    contextmenu: "contextmenu",
    all: "all"
  };
  var _UI = class _UI {
    /**
     * Create an UI element. You may also create a new UI using one of the static helper like [`UI.fromRectangle`](#link) or [`UI.fromCircle`](#link).
     * @param group a Group or an Iterable<PtLike> that defines the UI's appearance
     * @param shape specifies the shape of the Group
     * @param states optional a state object keep track of custom states for this UI
     * @param id optional id string
     */
    constructor(group, shape, states = {}, id) {
      this._holds = /* @__PURE__ */ new Map();
      this._group = Group.fromArray(group);
      this._shape = shape;
      this._id = id === void 0 ? `ui_${_UI._counter++}` : id;
      this._states = states;
      this._actions = {};
    }
    /**
     * A static helper function to create a Rectangle UI.
     * @param group a Group or an Iterable<PtLike> with 2 Pt representing a rectangle
     * @param states optional a state object keep track of custom states for this UI
     * @param id optional id string
     */
    static fromRectangle(group, states, id) {
      return new this(group, UIShape.rectangle, states, id);
    }
    /**
     * A static helper function to create a Circle UI.
     * @param group a Group or an Iterable<PtLike> with 2 Pt representing a circle
     * @param states optional a state object keep track of custom states for this UI
     * @param id optional id string
     */
    static fromCircle(group, states, id) {
      return new this(group, UIShape.circle, states, id);
    }
    /**
     * A static helper function to create a Polygon UI.
     * @param group a Group or an Iterable<PtLike> representing a polygon
     * @param states optional a state object keep track of custom states for this UI
     * @param id optional id string
     */
    static fromPolygon(group, states, id) {
      return new this(group, UIShape.polygon, states, id);
    }
    /**
     * A static helper function to create a new UI based on another UI.
     * @param ui base UI
     * @param states optional a state object keep track of custom states for this UI
     */
    static fromUI(ui, states, id) {
      return new this(ui.group, ui.shape, states || ui._states, id);
    }
    /**
     * An unique id of the UI.
     */
    get id() {
      return this._id;
    }
    set id(d) {
      this._id = d;
    }
    /**
     * A group of Pts that defines this UI's shape.
     */
    get group() {
      return this._group;
    }
    set group(d) {
      this._group = d;
    }
    /**
     * A string that describes this UI's shape.
     */
    get shape() {
      return this._shape;
    }
    set shape(d) {
      this._shape = d;
    }
    /**
     * Get and/or set a specific UI state.
     * @param key state's name
     * @param value optionally set a new value for this state.key
     * @param if `value` is changed, return this instance. Otherwise, return the value of the specific key.
     */
    state(key, value) {
      if (!key)
        return null;
      if (value !== void 0) {
        this._states[key] = value;
        return this;
      }
      return this._states[key];
    }
    /**
     * Add an event handler. Remember this UI will also need to be tracked for events via `UI.track`.
     * @param type event type
     * @param fn a [`UIHandler`](#link) callback function: `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`
     * @returns an id number that reference to this handler, for use in [`UI.off`](#link)
     */
    on(type, fn) {
      if (!this._actions[type])
        this._actions[type] = [];
      return _UI._addHandler(this._actions[type], fn);
    }
    /**
     * Remove an event handler.
     * @param type event type
     * @param which an ID number returned by [`UI.on`](#link). If this is not defined, all handlers in this type will be removed.
     * @param fn a [`UIHandler`](#link) function: `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`
     */
    off(type, which) {
      if (!this._actions[type])
        return false;
      if (which === void 0) {
        delete this._actions[type];
        return true;
      } else {
        return _UI._removeHandler(this._actions[type], which);
      }
    }
    /**
     * Listen for UI events and trigger action handlers.
     * @param type an action type. Can be one of UIPointerActions or a custom one.
     * @param p a point to check
     * @param evt a MouseEvent emitted by the browser (See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent))
     */
    listen(type, p, evt) {
      if (this._actions[type] !== void 0) {
        if (this._within(p) || Array.from(this._holds.values()).indexOf(type) >= 0) {
          _UI._trigger(this._actions[type], this, p, type, evt);
          return true;
        } else if (this._actions["all"]) {
          _UI._trigger(this._actions["all"], this, p, type, evt);
          return true;
        }
      }
      return false;
    }
    /**
     * Continue to keep track of an actions even if it's not within this UI. Useful for hover-leave and drag-outside.
     * @param type a string defined in [`UIPointerActions`](#link)
     */
    hold(type) {
      let newKey = Math.max(0, ...Array.from(this._holds.keys())) + 1;
      this._holds.set(newKey, type);
      return newKey;
    }
    /**
     * Stop keeping track of this action
     * @param key an id returned by the [`UI.hold`](#link) function
     */
    unhold(key) {
      if (key !== void 0) {
        this._holds.delete(key);
      } else {
        this._holds.clear();
      }
    }
    /**
     * A static function to listen for a list of UIs. See also [`UI.listen`](#link).
     * @param uis an array of UI
     * @param type an action type. Can be one of `UIPointerActions` or a custom one.
     * @param p a point to check
     * @param evt a MouseEvent emitted by the browser (See [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent))
     */
    static track(uis, type, p, evt) {
      for (let i = 0, len = uis.length; i < len; i++) {
        uis[i].listen(type, p, evt);
      }
    }
    /**
     * Take a custom render function to render this UI.
     * @param fn a render function
     */
    render(fn) {
      fn(this._group, this._states);
    }
    /**
     * Returns a string representation of this UI
     */
    toString() {
      return `UI ${this.group.toString}`;
    }
    /**
     * Check intersection using a specific function based on the shape of the UI.
     * @param p a point to check
     * @returns a boolean to indicate if the event should be triggered
     */
    _within(p) {
      let fn = null;
      if (this._shape === UIShape.rectangle) {
        fn = Rectangle.withinBound;
      } else if (this._shape === UIShape.circle) {
        fn = Circle.withinBound;
      } else if (this._shape === UIShape.polygon) {
        fn = Polygon.hasIntersectPoint;
      } else {
        return false;
      }
      return fn(this._group, p);
    }
    /**
     * Static function to trigger an array of UIHandlers
     */
    static _trigger(fns, target, pt, type, evt) {
      if (fns) {
        for (let i = 0, len = fns.length; i < len; i++) {
          if (fns[i])
            fns[i](target, pt, type, evt);
        }
      }
    }
    /**
     * Static function to add a new handler to an array store of UIHandlers.
     */
    static _addHandler(fns, fn) {
      if (fn) {
        fns.push(fn);
        return fns.length - 1;
      } else {
        return -1;
      }
    }
    /**
     * Static function to remove an existing handler from an array store of UIHandlers.
     */
    static _removeHandler(fns, index) {
      if (index >= 0 && index < fns.length) {
        let temp = fns.length;
        fns.splice(index, 1);
        return temp > fns.length;
      } else {
        return false;
      }
    }
  };
  _UI._counter = 0;
  var UI = _UI;
  var UIButton = class extends UI {
    /**
     * Create an UIButton. A button has 2 states, "clicks" (number) and "hover" (boolean), which you can access through [`UI.state`](#link) function. You may also create a new UIButton using one of the static helper like [`UI.fromRectangle`](#link) or [`UI.fromCircle`](#link).
     * @param group a Group or an Iterable<PtLike> that defines the UI's appearance
     * @param shape specifies the shape of the Group
     * @param states Optional default state object
     * @param id Optional id string
     */
    constructor(group, shape, states = {}, id) {
      super(group, shape, states, id);
      this._hoverID = -1;
      if (states.hover === void 0)
        this._states["hover"] = false;
      if (states.clicks === void 0)
        this._states["clicks"] = 0;
      const UA = UIPointerActions;
      this.on(UA.up, (target, pt, type, evt) => {
        this.state("clicks", this._states.clicks + 1);
      });
      this.on(UA.move, (target, pt, type, evt) => {
        let hover = this._within(pt);
        if (hover && !this._states.hover) {
          this.state("hover", true);
          UI._trigger(this._actions[UA.enter], this, pt, UA.enter, evt);
          let _capID = this.hold(UA.move);
          this._hoverID = this.on(UA.move, (t, p) => {
            if (!this._within(p) && !this.state("dragging")) {
              this.state("hover", false);
              UI._trigger(this._actions[UA.leave], this, pt, UA.leave, evt);
              this.off(UA.move, this._hoverID);
              this.unhold(_capID);
            }
          });
        }
      });
    }
    /**
     * Add a new click handler. Remember this button will also need to be tracked for events via `UI.track`. If you want to track right clicks, you may also consider [`UIButton.onContextMenu`](#link).
     * @param fn a [`UIHandler`](#link) callback function: `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`
     * @returns an id number that refers to this handler, for use in [`UIButton.offClick`](#link) or [`UI.off`](#link).
     */
    onClick(fn) {
      return this.on(UIPointerActions.up, fn);
    }
    /**
     * Remove an existing click handler
     * @param id an ID number returned by [`UIButton.onClick`](#link). If this is not defined, all handlers in this type will be removed.
     * @returns a boolean indicating whether the handler was removed successfully
     */
    offClick(id) {
      return this.off(UIPointerActions.up, id);
    }
    /**
     * Add a new contextmenu handler. `contextmenu` is similar to right click, see the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event). Remember this button will also need to be tracked for events via `UI.track`. Also note that you may need to use `event.preventDefault()` in the callback function to prevent other events from triggering.
     * @param fn a [`UIHandler`](#link) callback function: `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`
     * @returns an id number that refers to this handler, for use in [`UIButton.offContextMenu`](#link) or [`UI.off`](#link).
     */
    onContextMenu(fn) {
      return this.on(UIPointerActions.contextmenu, fn);
    }
    /**
     * Remove an existing contextmenu handler
     * @param id an ID number returned by [`UIButton.onContextMenu`](#link). If this is not defined, all handlers in this type will be removed.
     * @returns a boolean indicating whether the handler was removed successfully
     */
    offContextMenu(id) {
      return this.off(UIPointerActions.contextmenu, id);
    }
    /**
     * Add handlers for hover events. Remember this button will also need to be tracked for events via `UI.track`.
     * @param enter an optional [`UIHandler`](#link) function to handle when pointer enters hover. Eg, `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`
     * @param leave an optional [`UIHandler`](#link) function to handle when pointer exits hover. Eg, `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`
     * @returns id numbers that refer to enter/leave handlers, for use in [`UIButton.offHover`](#link) or [`UI.off`](#link).
     */
    onHover(enter, leave) {
      let ids = [void 0, void 0];
      if (enter)
        ids[0] = this.on(UIPointerActions.enter, enter);
      if (leave)
        ids[1] = this.on(UIPointerActions.leave, leave);
      return ids;
    }
    /**
     * Remove handlers for hover events.
     * @param enterID an ID number returned by [`UI.onClick`](#link), or -1 to skip. If this is not defined, all handlers in this type will be removed. 
     * @param leaveID an ID number returned by [`UI.onClick`](#link), or -1 to skip. If this is not defined, all handlers in this type will be removed. 
     * @returns an array of booleans indicating whether the handlers were removed successfully
     */
    offHover(enterID, leaveID) {
      let s = [false, false];
      if (enterID === void 0 || enterID >= 0)
        s[0] = this.off(UIPointerActions.enter, enterID);
      if (leaveID === void 0 || leaveID >= 0)
        s[1] = this.off(UIPointerActions.leave, leaveID);
      return s;
    }
  };
  var UIDragger = class extends UIButton {
    /**
     * Create a dragger which has all the states in UIButton, with additional "dragging" (a boolean indicating whether it's currently being dragged) and "offset" (a Pt representing the offset between this UI's position and the pointer's position when dragged) states. (See [`UI.state`](#link)) You may also create a new UIDragger using one of the static helper like [`UI.fromRectangle`](#link) or [`UI.fromCircle`](#link).
     * @param group a Group or an Iterable<PtLike> that defines the UI's appearance
     * @param shape specifies the shape of the Group
     * @param states Optional default state object
     * @param id Optional id string
     */
    constructor(group, shape, states = {}, id) {
      super(group, shape, states, id);
      this._draggingID = -1;
      this._moveHoldID = -1;
      this._dropHoldID = -1;
      this._upHoldID = -1;
      if (states.dragging === void 0)
        this._states["dragging"] = false;
      if (states.moved === void 0)
        this._states["moved"] = false;
      if (states.offset === void 0)
        this._states["offset"] = new Pt();
      const UA = UIPointerActions;
      this.on(UA.down, (target, pt, type, evt) => {
        if (this._moveHoldID === -1) {
          this.state("dragging", true);
          this.state("offset", new Pt(pt).subtract(target.group[0]));
          this._moveHoldID = this.hold(UA.move);
        }
        if (this._dropHoldID === -1) {
          this._dropHoldID = this.hold(UA.drop);
        }
        if (this._upHoldID === -1) {
          this._upHoldID = this.hold(UA.up);
        }
        if (this._draggingID === -1) {
          this._draggingID = this.on(UA.move, (t, p) => {
            if (this.state("dragging")) {
              UI._trigger(this._actions[UA.uidrag], t, p, UA.uidrag, evt);
              this.state("moved", true);
            }
          });
        }
      });
      const endDrag = (target, pt, type, evt) => {
        this.state("dragging", false);
        this.off(UA.move, this._draggingID);
        this._draggingID = -1;
        this.unhold(this._moveHoldID);
        this._moveHoldID = -1;
        this.unhold(this._dropHoldID);
        this._dropHoldID = -1;
        this.unhold(this._upHoldID);
        this._upHoldID = -1;
        if (this.state("moved")) {
          UI._trigger(this._actions[UA.uidrop], target, pt, UA.uidrop, evt);
          this.state("moved", false);
        }
      };
      this.on(UA.drop, endDrag);
      this.on(UA.up, endDrag);
      this.on(UA.out, endDrag);
    }
    /**
     * Add a new drag handler. Remember this button will also need to be tracked for events via `UI.track`.
     * @param fn a [`UIHandler`](#link) callback function: `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`. You can access the states "dragging" and "offset" (See [`UI.state`](#link)) in the callback.
     * @returns an id number that refers to this handler, for use in [`UIDragger.offDrag`](#link) or [`UI.off`](#link).
     */
    onDrag(fn) {
      return this.on(UIPointerActions.uidrag, fn);
    }
    /**
     * Remove an existing drag handler
     * @param id an ID number returned by [`UIDragger.onDrag`](#link). If this is not defined, all handlers in this type will be removed.
     * @returns a boolean indicating whether the handler was removed successfully
     */
    offDrag(id) {
      return this.off(UIPointerActions.uidrag, id);
    }
    /**
     * Add a new drop handler. Remember this button will also need to be tracked for events via `UI.track`.
     * @param fn a [`UIHandler`](#link) callback function: `fn( target:UI, pt:Pt, type:string, evt:MouseEvent )`
     * @returns an id number that refers to this handler, for use in [`UIDragger.offDrop`](#link) or [`UI.off`](#link).
     */
    onDrop(fn) {
      return this.on(UIPointerActions.uidrop, fn);
    }
    /**
     * Remove an existing drop handler
     * @param id an ID number returned by [`UIDragger.onDrag`](#link). If this is not defined, all handlers in this type will be removed.
     * @returns a boolean indicating whether the handler was removed successfully
     */
    offDrop(id) {
      return this.off(UIPointerActions.uidrop, id);
    }
  };

  // src/Space.ts
  var Space = class {
    constructor() {
      this.id = "space";
      this.bound = new Bound();
      this._time = { prev: 0, diff: 0, end: -1, min: 0 };
      this.players = {};
      this.playerCount = 0;
      this._animID = -1;
      this._pause = false;
      this._refresh = void 0;
      this._pointer = new Pt();
      this._isReady = false;
      this._playing = false;
    }
    /**
    * Set whether the rendering should be repainted on each frame.
    * @param b a boolean value to set whether to repaint each frame
    */
    refresh(b) {
      this._refresh = b;
      return this;
    }
    /**
     * Set a minimum frame time
     * @param ms at least this amount of miniseconds must have elapsed before frame advances
     */
    minFrameTime(ms = 0) {
      this._time.min = ms;
    }
    /**
    * Add an [`IPlayer`](#link) object or a [`AnimateCallbackFn`](#link) callback function to handle events in this Space. An IPlayer is an object with the following callback functions:    
    * - required: `animate: fn( time, ftime, space )` 
    * - optional: `start: fn(bound, space)`   
    * - optional: `resize: fn( size, event )`
    * - optional: `action: fn( type, x, y, event )`  
    * Subclasses of Space may define other callback functions.
    * @param player an [`IPlayer`](#link) object with animate function, or a callback function `fn(time, ftime)`. 
    */
    add(p) {
      const player = typeof p == "function" ? { animate: p } : p;
      const k = this.playerCount++;
      const pid = player.animateID || this.id + k;
      this.players[pid] = player;
      player.animateID = pid;
      if (player.resize && this.bound.inited)
        player.resize(this.bound);
      if (this._refresh === void 0)
        this._refresh = true;
      return this;
    }
    /**
    * Remove a player from this Space.
    * @param player an IPlayer that has an `animateID` property
    */
    remove(player) {
      delete this.players[player.animateID];
      return this;
    }
    /**
    * Remove all players from this Space.
    */
    removeAll() {
      this.players = {};
      return this;
    }
    /**
    * Main play loop. This implements `window.requestAnimationFrame` and calls it recursively. 
    * You may override this `play()` function to implement your own animation loop.
    * @param time current time
    */
    play(time = 0) {
      if (time === 0 && this._animID !== -1) {
        return;
      }
      this._animID = requestAnimationFrame(this.play.bind(this));
      if (this._pause)
        return this;
      this._time.diff = time - this._time.prev;
      if (this._time.diff < this._time.min)
        return this;
      this._time.prev = time;
      try {
        this.playItems(time);
      } catch (err) {
        cancelAnimationFrame(this._animID);
        this._animID = -1;
        this._playing = false;
        throw err;
      }
      return this;
    }
    /**
    * Replay the animation after [`Space.stop`](#link). This resets the end-time counter. 
    * You may also use [`Space.pause`](#link) and [`resume`](#link) for temporary pause.
    */
    replay() {
      this._time.end = -1;
      this.play();
    }
    /**
    * Main animate function. This calls all the items to perform.
    * @param time current time
    */
    playItems(time) {
      this._playing = true;
      if (this._refresh)
        this.clear();
      if (this._isReady) {
        for (const k in this.players) {
          if (this.players[k].animate)
            this.players[k].animate(time, this._time.diff, this);
        }
      }
      if (this._time.end >= 0 && time > this._time.end) {
        cancelAnimationFrame(this._animID);
        this._animID = -1;
        this._playing = false;
      }
    }
    /**
    * Pause the animation.
    * @param toggle a boolean value to set if this function call should be a toggle (between pause and resume)
    */
    pause(toggle = false) {
      this._pause = toggle ? !this._pause : true;
      return this;
    }
    /**
    * Resume the pause animation.
    */
    resume() {
      this._pause = false;
      return this;
    }
    /**
    * Specify when the animation should stop: immediately, after a time period, or never stops.
    * @param t a value in millisecond to specify a time period to play before stopping, or `-1` to play forever, or `0` to end immediately. Default is 0 which will stop the animation immediately.
    */
    stop(t = 0) {
      this._time.end = t;
      return this;
    }
    /**
    * Play animation loop once. Optionally set a `duration` time to play for that specific duration.
    * @param duration a value in millisecond to specify a time period to play before stopping, or `-1` to play forever
    */
    playOnce(duration = 0) {
      this.play();
      this.stop(duration);
      return this;
    }
    /**
    * Custom rendering.
    * @param context rendering context
    */
    render(context) {
      if (this._renderFunc)
        this._renderFunc(context, this);
      return this;
    }
    /**
    * Set a custom rendering function `fn(graphics_context, canvas_space)` if needed.
    */
    set customRendering(f) {
      this._renderFunc = f;
    }
    get customRendering() {
      return this._renderFunc;
    }
    /**
     * Indicate whether the animation is playing.
     */
    get isPlaying() {
      return this._playing;
    }
    /**
    * The outer bounding box which includes its positions.
    */
    get outerBound() {
      return this.bound.clone();
    }
    /**
    * The inner bounding box of the space, excluding its positions.
    */
    get innerBound() {
      return new Bound(Pt.make(this.size.length, 0), this.size.clone());
    }
    /**
    * The size of this space's bounding box.
    */
    get size() {
      return this.bound.size.clone();
    }
    /**
    * The center of this space's bounding box.
    */
    get center() {
      return this.size.divide(2);
    }
    /**
    * The width of this space's bounding box.
    */
    get width() {
      return this.bound.width;
    }
    /**
    * The height of this space's bounding box.
    */
    get height() {
      return this.bound.height;
    }
  };
  var MultiTouchSpace = class extends Space {
    constructor() {
      super(...arguments);
      // track mouse dragging
      this._pressed = false;
      this._dragged = false;
      this._hasMouse = false;
      this._hasTouch = false;
      this._hasKeyboard = false;
    }
    /**
    * Get the mouse or touch pointer that stores the last action.
    */
    get pointer() {
      const p = this._pointer.clone();
      p.id = this._pointer.id;
      return p;
    }
    /**
    * Bind event listener in canvas element. You can also use [`MultiTouchSpace.bindMouse`](#link) or [`MultiTouchSpace.bindTouch`](#link) to bind mouse or touch events conveniently.
    * @param evt an event string such as "mousedown"
    * @param callback callback function for this event
    * @param options options for [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
    * @param customTarget If needed, this is an optional parameter to set another event target that's not the canvas element itself. See [Technical Notes guide](/guide/Technical-notes-9000.html) for use cases.
    */
    bindCanvas(evt, callback, options = {}, customTarget) {
      const target = customTarget ? customTarget : this._canvas;
      target.addEventListener(evt, callback, options);
    }
    /**
    * Unbind a callback from the event listener.
    * @param evt an event string such as "mousedown"
    * @param callback callback function to unbind
    * @param options options for [removeEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). This should match the options set in bindCanvas.
    * @param customTarget If customTarget is set in bindCanvas, you'll need to pass the same instance here to unbind
    */
    unbindCanvas(evt, callback, options = {}, customTarget) {
      const target = customTarget ? customTarget : this._canvas;
      target.removeEventListener(evt, callback, options);
    }
    bindDoc(evt, callback, options = {}) {
      if (document) {
        document.addEventListener(evt, callback, options);
      }
    }
    unbindDoc(evt, callback, options = {}) {
      if (document) {
        document.removeEventListener(evt, callback, options);
      }
    }
    /**
    * A convenient method to bind (or unbind) all mouse events in canvas element. 
    * All [`IPlayer`](#link) objects added to this space that implement an `action` callback property will receive mouse event callbacks. 
    * The types of mouse actions are defined by [`UIPointerActions`](#link) constants: "up", "down", "move", "drag", "drop", "over", and "out". 
    * @param bind a boolean value to bind mouse events if set to `true`. If `false`, all mouse events will be unbound. Default is true.
    * @param customTarget If needed, this is an optional parameter to set another event target that's not the canvas element itself. See [Technical Notes guide](/guide/Technical-notes-9000.html) for use cases.
    * @see [`Space.add`](#link) 
    */
    bindMouse(bind = true, customTarget) {
      if (bind) {
        this._mouseDown = this._mouseDown.bind(this);
        this._mouseUp = this._mouseUp.bind(this);
        this._mouseOver = this._mouseOver.bind(this);
        this._mouseOut = this._mouseOut.bind(this);
        this._mouseMove = this._mouseMove.bind(this);
        this._mouseClick = this._mouseClick.bind(this);
        this._contextMenu = this._contextMenu.bind(this);
        this.bindCanvas("pointerdown", this._mouseDown, {}, customTarget);
        this.bindCanvas("pointerup", this._mouseUp, {}, customTarget);
        this.bindCanvas("pointerover", this._mouseOver, {}, customTarget);
        this.bindCanvas("pointerout", this._mouseOut, {}, customTarget);
        this.bindCanvas("pointermove", this._mouseMove, {}, customTarget);
        this.bindCanvas("click", this._mouseClick, {}, customTarget);
        this.bindCanvas("contextmenu", this._contextMenu, {}, customTarget);
        this._hasMouse = true;
      } else {
        this.unbindCanvas("pointerdown", this._mouseDown, {}, customTarget);
        this.unbindCanvas("pointerup", this._mouseUp, {}, customTarget);
        this.unbindCanvas("pointerover", this._mouseOver, {}, customTarget);
        this.unbindCanvas("pointerout", this._mouseOut, {}, customTarget);
        this.unbindCanvas("pointermove", this._mouseMove, {}, customTarget);
        this.unbindCanvas("click", this._mouseClick, {}, customTarget);
        this.unbindCanvas("contextmenu", this._contextMenu, {}, customTarget);
        this._hasMouse = false;
      }
      return this;
    }
    /**
    * A convenient method to bind (or unbind) all touch events in canvas element. 
    * All [`IPlayer`](#link) objects added to this space that implement an `action` callback property will receive touch event callbacks. 
    * The types of mouse actions are defined by [`UIPointerActions`](#link) constants: "up", "down", "move", "drag", "drop", "over", and "out". 
    * @param bind a boolean value to bind touch events if set to `true`. If `false`, all mouse events will be unbound. Default is true.
    * @param passive a boolean value to set passive mode, ie, it won't block scrolling. Default is false.
    * @param customTarget If needed, this is an optional parameter to set another event target that's not the canvas element itself. See [Technical Notes guide](/guide/Technical-notes-9000.html) for use cases.
    * @see [`Space.add`](#link)
    */
    bindTouch(bind = true, passive = false, customTarget) {
      if (bind) {
        this.bindCanvas("touchstart", this._touchStart.bind(this), { passive }, customTarget);
        this.bindCanvas("touchend", this._mouseUp.bind(this), {}, customTarget);
        this.bindCanvas("touchmove", this._touchMove.bind(this), { passive }, customTarget);
        this.bindCanvas("touchcancel", this._mouseOut.bind(this), {}, customTarget);
        this._hasTouch = true;
      } else {
        this.unbindCanvas("touchstart", this._touchStart.bind(this), { passive }, customTarget);
        this.unbindCanvas("touchend", this._mouseUp.bind(this), {}, customTarget);
        this.unbindCanvas("touchmove", this._touchMove.bind(this), { passive }, customTarget);
        this.unbindCanvas("touchcancel", this._mouseOut.bind(this), {}, customTarget);
        this._hasTouch = false;
      }
      return this;
    }
    bindKeyboard(bind = true) {
      if (bind) {
        this._keyDownBind = this._keyDown.bind(this);
        this._keyUpBind = this._keyUp.bind(this);
        this.bindDoc("keydown", this._keyDownBind, {});
        this.bindDoc("keyup", this._keyUpBind, {});
        this._hasKeyboard = true;
      } else {
        this.unbindDoc("keydown", this._keyDownBind, {});
        this.unbindDoc("keyup", this._keyUpBind, {});
        this._hasKeyboard = false;
      }
      return this;
    }
    /**
    * A convenient method to convert the touch points in a touch event to an array of Pts.
    * @param evt a touch event which contains touches, changedTouches, and targetTouches list
    * @param which a string to select a touches list: "touches", "changedTouches", or "targetTouches". Default is "touches"
    * @return an array of Pt, whose origin position (0,0) is offset to the top-left of this space
    */
    touchesToPoints(evt, which = "touches") {
      if (!evt || !evt[which])
        return [];
      const ts = [];
      for (let i = 0; i < evt[which].length; i++) {
        const t = evt[which].item(i);
        ts.push(new Pt(t.pageX - this.bound.topLeft.x, t.pageY - this.bound.topLeft.y));
      }
      return ts;
    }
    /**
    * Go through all the added [`IPlayer`](#link) objects and call its `action` callback function.
    * @param type an UIPointerActions constant or string: "up", "down", "move", "drag", "drop", "over", and "out"
    * @param evt mouse or touch event
    * @see [`Space.add`](#link)
    */
    _mouseAction(type, evt) {
      if (!this.isPlaying)
        return;
      let px = 0, py = 0;
      if (evt instanceof MouseEvent) {
        for (const k in this.players) {
          if (this.players.hasOwnProperty(k)) {
            const v = this.players[k];
            px = evt.pageX - this.outerBound.x;
            py = evt.pageY - this.outerBound.y;
            if (v.action)
              v.action(type, px, py, evt);
          }
        }
      } else {
        for (const k in this.players) {
          if (this.players.hasOwnProperty(k)) {
            const v = this.players[k];
            const c = evt.changedTouches && evt.changedTouches.length > 0;
            const touch = evt.changedTouches.item(0);
            px = c ? touch.pageX - this.outerBound.x : 0;
            py = c ? touch.pageY - this.outerBound.y : 0;
            if (v.action)
              v.action(type, px, py, evt);
          }
        }
      }
      if (type) {
        this._pointer.to(px, py);
        this._pointer.id = type;
      }
    }
    /**
    * MouseDown handler.
    * @param evt 
    */
    _mouseDown(evt) {
      this._mouseAction(UIPointerActions.down, evt);
      this._mouseAction(UIPointerActions.pointerdown, evt);
      this._pressed = true;
      if (evt.target instanceof Element) {
        evt.target.setPointerCapture(evt.pointerId);
      }
      return false;
    }
    /**
    * MouseUp handler.
    * @param evt 
    */
    _mouseUp(evt) {
      this._mouseAction(UIPointerActions.pointerup, evt);
      if (this._dragged) {
        this._mouseAction(UIPointerActions.drop, evt);
      } else {
        this._mouseAction(UIPointerActions.up, evt);
      }
      this._pressed = false;
      this._dragged = false;
      if (evt.target instanceof Element) {
        evt.target.releasePointerCapture(evt.pointerId);
      }
      return false;
    }
    /**
    * MouseMove handler.
    * @param evt 
    */
    _mouseMove(evt) {
      if (this._pressed) {
        this._dragged = true;
        this._mouseAction(UIPointerActions.drag, evt);
      } else {
        this._mouseAction(UIPointerActions.move, evt);
      }
      return false;
    }
    /**
    * MouseOver handler.
    * @param evt 
    */
    _mouseOver(evt) {
      this._mouseAction(UIPointerActions.over, evt);
      return false;
    }
    /**
    * MouseOut handler.
    * @param evt 
    */
    _mouseOut(evt) {
      this._mouseAction(UIPointerActions.out, evt);
      if (this._dragged)
        this._mouseAction(UIPointerActions.drop, evt);
      this._dragged = false;
      return false;
    }
    /**
    * MouseClick handler.
    * @param evt 
    */
    _mouseClick(evt) {
      this._mouseAction(UIPointerActions.click, evt);
      this._pressed = false;
      this._dragged = false;
      return false;
    }
    /**
    * ContextMenu handler.
    * @param evt 
    */
    _contextMenu(evt) {
      this._mouseAction(UIPointerActions.contextmenu, evt);
      return false;
    }
    /**
    * TouchMove handler.
    * @param evt 
    */
    _touchMove(evt) {
      this._mouseAction(UIPointerActions.move, evt);
      if (this._pressed) {
        this._dragged = true;
        this._mouseAction(UIPointerActions.drag, evt);
      }
      evt.preventDefault();
      return false;
    }
    /**
    * TouchStart handler.
    * @param evt 
    */
    _touchStart(evt) {
      this._mouseAction(UIPointerActions.down, evt);
      this._pressed = true;
      return false;
      evt.preventDefault();
      return false;
    }
    _keyDown(evt) {
      this._keyboardAction(UIPointerActions.keydown, evt);
      return false;
    }
    _keyUp(evt) {
      this._keyboardAction(UIPointerActions.keyup, evt);
      return false;
    }
    _keyboardAction(type, evt) {
      if (!this.isPlaying)
        return;
      for (const k in this.players) {
        if (this.players.hasOwnProperty(k)) {
          const v = this.players[k];
          if (v.action)
            v.action(type, evt.shiftKey ? 1 : 0, evt.altKey ? 1 : 0, evt);
        }
      }
    }
  };

  // src/Form.ts
  var Form_exports = {};
  __export(Form_exports, {
    Font: () => Font,
    Form: () => Form,
    VisualForm: () => VisualForm
  });
  var Form = class {
    constructor() {
      this._ready = false;
    }
    /**
    * get whether the Form has received the Space's rendering context.
    */
    get ready() {
      return this._ready;
    }
  };
  var VisualForm = class extends Form {
    constructor() {
      super(...arguments);
      this._filled = true;
      this._stroked = true;
      this._font = new Font(14, "sans-serif");
    }
    /**
     * Check whether this form currently has fill style. 
     */
    get filled() {
      return this._filled;
    }
    set filled(b) {
      this._filled = b;
    }
    /**
     * Check whether this form currently has stroke style.
     */
    get stroked() {
      return this._stroked;
    }
    set stroked(b) {
      this._stroked = b;
    }
    /**
     * Get the current font in use in this form.
     */
    get currentFont() {
      return this._font;
    }
    _multiple(groups, shape, ...rest) {
      if (!groups)
        return this;
      for (let i = 0, len = groups.length; i < len; i++) {
        this[shape](groups[i], ...rest);
      }
      return this;
    }
    /**
     * Set alpha (not implemented here  -- to be implemented in subclasses).
     * @param a alpha value between 0 and 1
     */
    alpha(a) {
      return this;
    }
    /**
     * Set fill color (not implemented here  -- to be implemented in subclasses).
     * @param c fill color as string or `false` to specify transparent.
     */
    fill(c) {
      return this;
    }
    /**
    * Set current fill style and remove stroke style. (not implemented here  -- to be implemented in subclasses).
    * @param c fill color as string or `false` to specify transparent.
    */
    fillOnly(c) {
      this.stroke(false);
      return this.fill(c);
    }
    /**
     * Set stroke style (not implemented here  -- to be implemented in subclasses). 
     * @param c stroke color as string or `false` to specify transparent.
     * @param width Optional value (can be floating point) to set line width
     * @param linejoin Optional string to set line joint style. Can be "miter", "bevel", or "round".
     * @param linecap Optional string to set line cap style. Can be "butt", "round", or "square".
     */
    stroke(c, width, linejoin, linecap) {
      return this;
    }
    /**
     * Set stroke style and remove fill style. (not implemented here  -- to be implemented in subclasses). 
     * @param c stroke color as string or `false` to specify transparent.
     * @param width Optional value (can be floating point) to set line width
     * @param linejoin Optional string to set line joint style. Can be "miter", "bevel", or "round".
     * @param linecap Optional string to set line cap style. Can be "butt", "round", or "square".
     */
    strokeOnly(c, width, linejoin, linecap) {
      this.fill(false);
      return this.stroke(c, width, linejoin, linecap);
    }
    /**
    * Draw multiple points at once.
    * @param pts an array of Pt or an array of number arrays
    * @param radius radius of the point. Default is 5.
    * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
    */
    points(pts, radius, shape) {
      if (!pts)
        return;
      for (let i = 0, len = pts.length; i < len; i++) {
        this.point(pts[i], radius, shape);
      }
      return this;
    }
    /**
    * Draw multiple circles at once.
    * @param groups an array of Groups that defines multiple circles
    */
    circles(groups) {
      return this._multiple(groups, "circle");
    }
    /**
    * Draw multiple squares at once.
    * @param groups an array of Groups that defines multiple circles
    */
    squares(groups) {
      return this._multiple(groups, "square");
    }
    /**
    * Draw multiple lines at once.
    * @param groups An array of Groups of Pts
    */
    lines(groups) {
      return this._multiple(groups, "line");
    }
    /**
    * Draw multiple polygons at once.
    * @param groups An array of Groups of Pts
    */
    polygons(groups) {
      return this._multiple(groups, "polygon");
    }
    /**
    * Draw multiple rectangles at once.
    * @param groups An array of Groups of Pts
    */
    rects(groups) {
      return this._multiple(groups, "rect");
    }
  };
  var Font = class {
    /**
    * Create a font style.
    * @param size font size. Defaults is 12px.
    * @param face Optional font-family, use css-like string such as "Helvetica" or "Helvetica, sans-serif". Default is "sans-serif".
    * @param weight Optional font weight such as "bold". Default is "" (none).
    * @param style Optional font style such as "italic". Default is "" (none).
    * @param lineHeight Optional line height. Default is 1.5.
    * @example `new Font(12, "Frutiger, sans-serif", "bold", "underline", 1.5)`
    */
    constructor(size = 12, face = "sans-serif", weight = "", style = "", lineHeight = 1.5) {
      this.size = size;
      this.face = face;
      this.style = style;
      this.weight = weight;
      this.lineHeight = lineHeight;
    }
    /**
    * Get a string representing the font style, in css-like string such as "italic bold 12px/1.5 sans-serif".
    */
    get value() {
      return `${this.style} ${this.weight} ${this.size}px/${this.lineHeight} ${this.face}`;
    }
    /**
    * Get a string representing the font style, in css-like string such as "italic bold 12px/1.5 sans-serif".
    */
    toString() {
      return this.value;
    }
  };

  // src/Typography.ts
  var Typography_exports = {};
  __export(Typography_exports, {
    Typography: () => Typography
  });
  var Typography = class {
    /**
     * Create a heuristic text width estimate function. It will be less accurate but faster.
     * @param fn a reference function that can measure text width accurately
     * @param samples a list of string samples. Default is ["M", "n", "."]
     * @param distribution a list of the samples' probability distribution. Default is [0.06, 0.8, 0.14].
     * @return a function that can estimate text width
     */
    static textWidthEstimator(fn, samples = ["M", "n", "."], distribution = [0.06, 0.8, 0.14]) {
      let m = samples.map(fn);
      let avg = new Pt(distribution).dot(m);
      return (str) => str.length * avg;
    }
    /**
     * Truncate text to fit width.
     * @param fn a function that can measure text width
     * @param str text to truncate
     * @param width width to fit
     * @param tail text to indicate overflow such as "...". Default is empty "".
     */
    static truncate(fn, str, width, tail = "") {
      let trim = Math.floor(str.length * Math.min(1, width / fn(str)));
      if (trim < str.length) {
        trim = Math.max(0, trim - tail.length);
        return [str.substr(0, trim) + tail, trim];
      } else {
        return [str, str.length];
      }
    }
    /**
     * Get a function to scale font size proportionally to text box size changes.
     * @param box a Group or an Iterable<PtLike> representing the initial box
     * @param ratio font-size change ratio. Default is 1.
     * @returns a function where input parameter is a new box, and returns the new font size value
     */
    static fontSizeToBox(box, ratio = 1, byHeight = true) {
      let bound = Bound.fromGroup(box);
      let h = byHeight ? bound.height : bound.width;
      let f = ratio * h;
      return function(box2) {
        let bound2 = Bound.fromGroup(box2);
        let nh = (byHeight ? bound2.height : bound2.width) / h;
        return f * nh;
      };
    }
    /**
     * Get a function to scale font size based on a threshold value.
     * @param defaultSize default font size to base on
     * @param threshold threshold value
     * @param direction if negative, get a font size <= defaultSize; if positive, get a font size >= defaultSize; Default is 0 which will scale font without min or max limits.
     * @returns a function where input parameter is the default font size and a value to compare with threshold, and returns new font size value
     */
    static fontSizeToThreshold(threshold, direction = 0) {
      return function(defaultSize, val) {
        let d = defaultSize * val / threshold;
        if (direction < 0)
          return Math.min(d, defaultSize);
        if (direction > 0)
          return Math.max(d, defaultSize);
        return d;
      };
    }
  };

  // src/Image.ts
  var Image_exports = {};
  __export(Image_exports, {
    Img: () => Img
  });
  var Img = class _Img {
    /**
     * Create an Img
     * @param editable Specify if you want to manipulate pixels of this image. Default is `false`.
     * @param space Set the `CanvasSpace` reference. This is optional but will make sure the image's pixelScale match the canvas and set the context for creating pattern.
     * @param crossOrigin an optional parameter to enable loading cross-domain images if set to true. The image server's configuration must also be set correctly. For more, see [this documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image).
     */
    constructor(editable = false, space, crossOrigin) {
      this._scale = 1;
      this._loaded = false;
      this._editable = editable;
      this._space = space;
      this._scale = this._space ? this._space.pixelScale : 1;
      this._img = new Image();
      if (crossOrigin)
        this._img.crossOrigin = "Anonymous";
    }
    /**
     * A static function to load an image with an optional ready callback. The Img instance will returned immediately before the image is loaded. To use async/await, use the `loadAsync` function or `new Img(...).load(...)`.
     * @param src an url of the image in same domain. Alternatively you can use a base64 string. To load from Blob, use `Img.fromBlob`.
     * @param editable Specify if you want to manipulate pixels of this image. Default is `false`.
     * @param space Set the `CanvasSpace` reference. This is optional but will make sure the image's pixelScale match the canvas and set the context for creating pattern.
     * @param ready An optional ready callback function 
     */
    static load(src, editable = false, space, ready) {
      const img = new _Img(editable, space);
      img.load(src).then((res) => {
        if (ready)
          ready(res);
      });
      return img;
    }
    /**
     * A static method to load an image using async/await.
     * @param src an url of the image in same domain. Alternatively you can use a base64 string. To load from Blob, use `Img.fromBlob`.
     * @param editable Specify if you want to manipulate pixels of this image. Default is `false`.
     * @param space Set the `CanvasSpace` reference. This is optional but will make sure the image's pixelScale match the canvas and set the context for creating pattern.
     * @returns 
     */
    static loadAsync(src, editable = false, space) {
      return __async(this, null, function* () {
        const img = yield new _Img(editable, space).load(src);
        return img;
      });
    }
    /**
     * A static method to load an image pattern using async/await.
     * @param src an url of the image in same domain. Alternatively you can use a base64 string. To load from Blob, use `Img.fromBlob`.
     * @param space Set the `CanvasSpace` reference. This is optional but will make sure the image's pixelScale match the canvas and set the context for creating pattern.
     * @param repeat set how the pattern will repeat fills
     * @param editable Specify if you want to manipulate pixels of this image. Default is `false`.
     * @returns a `CanvasPattern` instance for use in `fill()`
     */
    static loadPattern(src, space, repeat = "repeat", editable = false) {
      return __async(this, null, function* () {
        const img = yield _Img.loadAsync(src, editable, space);
        return img.pattern(repeat);
      });
    }
    /**
     * Create an editable blank image
     * @param size of image
     * @param space Optionally set the `CanvasSpace` reference. This is optional but will make sure the image's pixelScale match the canvas and set the context for creating pattern.
     * @param scale Optionally set a specific pixel scale (density) of the image canvas. 
     */
    static blank(size, space, scale) {
      let img = new _Img(true, space);
      const s = scale ? scale : space ? space.pixelScale : 1;
      img.initCanvas(size[0], size[1], s);
      return img;
    }
    /**
     * Load an image. 
     * @param src an url of the image in same domain. Alternatively you can use a base64 string. To load from Blob, use `Img.fromBlob`.
     * @returns a Promise that resolves to an Img
     */
    load(src) {
      return new Promise((resolve, reject) => {
        if (this._editable && !document) {
          reject("Cannot create html canvas element. document not found.");
        }
        this._img.src = src;
        this._img.onload = () => {
          if (this._editable) {
            if (!this._cv)
              this._cv = document.createElement("canvas");
            this._drawToScale(this._scale, this._img);
            this._data = this._ctx.getImageData(0, 0, this._cv.width, this._cv.height);
          }
          this._loaded = true;
          resolve(this);
        };
        this._img.onerror = (evt) => {
          reject(evt);
        };
      });
    }
    /**
     * Rescale the canvas and draw an image-source on it.
     * @param imgScale rescale factor for the image
     * @param canvasScale rescale factor for the canvas
     * @param img an image source like Image, Canvas, or ImageBitmap.
     */
    _drawToScale(canvasScale, img) {
      const nw = img.width;
      const nh = img.height;
      this.initCanvas(nw, nh, canvasScale);
      if (img)
        this._ctx.drawImage(img, 0, 0, nw, nh, 0, 0, this._cv.width, this._cv.height);
    }
    /**
     * Initiate an editable canvas
     * @param width width of canvas
     * @param height height of canvas
     * @param canvasScale pixel scale
     */
    initCanvas(width, height, canvasScale = 1) {
      if (!this._editable) {
        console.error("Cannot initiate canvas because this Img is not set to be editable");
        return;
      }
      if (!this._cv)
        this._cv = document.createElement("canvas");
      const cms = typeof canvasScale === "number" ? [canvasScale, canvasScale] : canvasScale;
      this._cv.width = width * cms[0];
      this._cv.height = height * cms[1];
      this._ctx = this._cv.getContext("2d");
      this._loaded = true;
    }
    /**
     * Get an efficient, readonly bitmap of the current canvas.
     * @param size Optional size to crop
     * @returns a Promise that resolves to an ImageBitmap
     */
    bitmap(size) {
      const w = size ? size[0] : this._cv.width;
      const h = size ? size[1] : this._cv.height;
      return createImageBitmap(this._cv, 0, 0, w, h);
    }
    /**
     * Create a canvas pattern for `fill()`
     * @param reptition set how the pattern should repeat-fill
     * @param dynamic If true, use this Img's internal canvas content as pattern fill. This enables the pattern to update dynamically.
     * @returns a `CanvasPattern` instance for use in `fill()`
     */
    pattern(reptition = "repeat", dynamic = false) {
      if (!this._space)
        throw "Cannot find CanvasSpace ctx to create image pattern";
      return this._space.ctx.createPattern(dynamic ? this._cv : this._img, reptition);
    }
    /**
     * Replace the image with the current canvas data. For example, you can use CanvasForm's static functions to draw on `this.ctx` and then update the current image.
     * To display the internal canvas, you can also use `form.image( img.canvas )` directly.
     */
    sync() {
      if (this._scale !== 1) {
        this.bitmap().then((b) => {
          this._drawToScale(1 / this._scale, b);
          this.load(this.toBase64());
        });
      } else {
        this._img.src = this.toBase64();
      }
    }
    /**
     * Get the RGBA values of a pixel in the image
     * @param p position of the pixel
     * @param rescale Specify if the pixel position should be scaled. Usually use rescale when tracking image and don't rescale when tracking canvas. You may also set a custom scale value.
     * @returns [R,G,B,A] values of the pixel at the specific position
     */
    pixel(p, rescale = true) {
      const s = typeof rescale == "number" ? rescale : rescale ? this._scale : 1;
      return _Img.getPixel(this._data, [p[0] * s, p[1] * s]);
    }
    /**
     * Given an ImaegData object and a position, return the RGBA pixel value at that position.
     * @param imgData an ImageData object
     * @param p a position on the image
     * @returns [R,G,B,A] values of the pixel at the specific position
     */
    static getPixel(imgData, p) {
      const no = new Pt(0, 0, 0, 0);
      if (p[0] >= imgData.width || p[1] >= imgData.height)
        return no;
      const i = Math.floor(p[1]) * (imgData.width * 4) + Math.floor(p[0]) * 4;
      const d = imgData.data;
      if (i >= d.length - 4)
        return no;
      return new Pt(d[i], d[i + 1], d[i + 2], d[i + 3]);
    }
    /**
     * Resize the canvas image. The original image is unchanged until `sync()`.
     * @param sizeOrScale A PtLike array specifying either [x, y] scales or [x, y] sizes.
     * @param asScale If true, treat the first parameter as scales. Otherwise, treat it as specific sizes.
     */
    resize(sizeOrScale, asScale = false) {
      let s = asScale ? sizeOrScale : [sizeOrScale[0] / this._img.naturalWidth, sizeOrScale[1] / this._img.naturalHeight];
      this._drawToScale(s, this._img);
      this._data = this._ctx.getImageData(0, 0, this._cv.width, this._cv.height);
      return this;
    }
    /**
     * Crop an area of the image.
     * @param box bounding box
     */
    crop(box) {
      let p = box.topLeft.scale(this._scale);
      let s = box.size.scale(this._scale);
      return this._ctx.getImageData(p.x, p.y, s.x, s.y);
    }
    /**
     * Apply filters such as blur and grayscale to the canvas image. The original image is unchanged until `sync()`.
     * @param css a css filter string such as "blur(10px) | contrast(200%)". See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/filter#browser_compatibility) for a list of filter functions.
     */
    filter(css) {
      this._ctx.filter = css;
      this._ctx.drawImage(this._cv, 0, 0);
      this._ctx.filter = "none";
      return this;
    }
    /**
     * Remove the elements and data associated with this Img.
     */
    cleanup() {
      if (this._cv)
        this._cv.remove();
      if (this._img)
        this._img.remove();
      this._data = null;
    }
    /**
     * Create a blob url that can be passed to `Img.load`
     * @param blob an image blob such as `new Blob([my_Uint8Array], {type: 'image/png'})`
     * @param editable Specify if you want to manipulate pixels of this image. Default is `false`.
     */
    static fromBlob(blob, editable = false, space) {
      let url = URL.createObjectURL(blob);
      return new _Img(editable, space).load(url);
    }
    /**
     * Convert ImageData object to a Blob, which you can then create an Img instance via [`Img.fromBlob`](#link). Note that the resulting image's dimensions will not account for pixel density.
     * @param data 
     */
    static imageDataToBlob(data) {
      return new Promise(function(resolve, reject) {
        if (!document) {
          reject("Cannot create html canvas element. document not found.");
        }
        let cv = document.createElement("canvas");
        cv.width = data.width;
        cv.height = data.height;
        cv.getContext("2d").putImageData(data, 0, 0);
        cv.toBlob((blob) => {
          resolve(blob);
          cv.remove();
        });
      });
    }
    /**
     * Export current canvas image as base64 string
     */
    toBase64() {
      return this._cv.toDataURL();
    }
    /**
     * Export current canvas image as a blob
     */
    toBlob() {
      return new Promise((resolve) => {
        this._cv.toBlob((blob) => resolve(blob));
      });
    }
    /**
     * Get a CanvasForm for drawing on the internal canvas if this Img is editable
     */
    getForm() {
      if (!this._editable) {
        console.error("Cannot get a CanvasForm because this Img is not editable");
      }
      return this._ctx ? new CanvasForm(this._ctx) : void 0;
    }
    /**
     * Get current image source. If editable, this will return the canvas, otherwise it will return the original image.
     */
    get current() {
      return this._editable ? this._cv : this._img;
    }
    /**
     * Get the original image
     */
    get image() {
      return this._img;
    }
    /**
     * Get the internal canvas
     */
    get canvas() {
      return this._cv;
    }
    /**
     * Get the internal canvas' ImageData
     */
    get data() {
      return this._data;
    }
    /**
     * Get the internal canvas' context. You can use this to draw directly on canvas, or create a new [CanvasForm](#link) instance with it.
     */
    get ctx() {
      return this._ctx;
    }
    /**
     * Get whether the image is loaded
     */
    get loaded() {
      return this._loaded;
    }
    /**
     * Get pixel density scale
     */
    get pixelScale() {
      return this._scale;
    }
    /**
     * Get size of the original image
     */
    get imageSize() {
      if (!this._img.width || !this._img.height) {
        return this.canvasSize.$divide(this._scale);
      } else {
        return new Pt(this._img.width, this._img.height);
      }
    }
    /**
     * Get size of the canvas
     */
    get canvasSize() {
      return new Pt(this._cv.width, this._cv.height);
    }
    /**
     * Get a Mat instance with a scale transform based on current `pixelScale`. 
     * This can be useful for generating a domMatrix for transforming patterns consistently across different pixel-density screens.
     * @example `img.scaledMatrix.translate2d(...).rotate2D(...).domMatrix`
     */
    get scaledMatrix() {
      const s = 1 / this._scale;
      return new Mat().scale2D([s, s]);
    }
  };

  // src/Canvas.ts
  var CanvasSpace2 = class extends MultiTouchSpace {
    /**
    * Create a CanvasSpace which represents a HTML Canvas Space
    * @param elem Specify an element by its "id" attribute as string, or by the element object itself. An element can be an existing `<canvas>`, or a `<div>` container in which a new `<canvas>` will be created. If left empty, a `<div id="pt_container"><canvas id="pt" /></div>` will be added to DOM. Use css to customize its appearance if needed.
    * @param callback an optional callback `function(boundingBox, spaceElement)` to be called when canvas is appended and ready. Alternatively, a "ready" event will also be fired from the `<canvas>` element when it's appended, which can be traced with `spaceInstance.canvas.addEventListener("ready")`
    * @example `new CanvasSpace( "#myElementID" )`
    */
    constructor(elem, callback) {
      super();
      this._pixelScale = 1;
      this._bgcolor = "#e1e9f0";
      this._offscreen = false;
      this._autoResize = true;
      this._initialResize = false;
      let _selector = null;
      let _existed = false;
      this.id = Util.uniqueId();
      if (elem instanceof Element) {
        _selector = elem;
        this.id = _selector.id || this.id;
      } else {
        let id = elem;
        id = elem[0] === "#" || elem[0] === "." ? elem : "#" + elem;
        _selector = document.querySelector(id);
        this.id = id.substr(1);
      }
      if (!_selector) {
        this._container = this._createElement("div", this.id + "_container");
        this._canvas = this._createElement("canvas", this.id);
        document.body.appendChild(this._container);
      } else if (_selector.nodeName.toLowerCase() != "canvas") {
        this._container = _selector;
        this._canvas = this._createElement("canvas", this.id + "_canvas");
        this._initialResize = true;
      } else {
        this._canvas = _selector;
        this._container = _selector.parentElement;
        this._autoResize = false;
        _existed = true;
      }
      this._ctx = this._canvas.getContext("2d");
      if (!_existed) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.type === "childList" && mutation.addedNodes.length) {
              for (let node of mutation.addedNodes) {
                if (node === this._canvas) {
                  this._ready(callback);
                  observer.disconnect();
                  return;
                }
              }
            }
          });
        });
        observer.observe(this._container, { childList: true });
        this._container.appendChild(this._canvas);
      } else {
        setTimeout(this._ready.bind(this, callback), 100);
      }
    }
    /**
    * Helper function to create a DOM element
    * @param elem element tag name
    * @param id element id attribute
    */
    _createElement(elem = "div", id) {
      const d = document.createElement(elem);
      d.setAttribute("id", id);
      return d;
    }
    /**
    * Handle callbacks after element is mounted in DOM
    * @param callback 
    */
    _ready(callback) {
      if (!this._container)
        throw new Error(`Cannot initiate #${this.id} element`);
      this._isReady = true;
      this._resizeHandler(null);
      this.clear(this._bgcolor);
      this._canvas.dispatchEvent(new Event("ready"));
      for (const k in this.players) {
        if (this.players.hasOwnProperty(k)) {
          if (this.players[k].start)
            this.players[k].start(this.bound.clone(), this);
        }
      }
      this._pointer = this.center;
      this._initialResize = false;
      if (callback)
        callback(this.bound, this._canvas);
    }
    /**
    * Set up various options for CanvasSpace. The `opt` parameter is an object with the following fields. This is usually set during instantiation, eg `new CanvasSpace(...).setup( { opt } )`
    * @param opt a [`CanvasSpaceOptions`](#link) object with optional settings, ie `{ bgcolor:string, resize:boolean, retina:boolean, offscreen:boolean, pixelDensity:number }`.   
    * @example `space.setup({ bgcolor: "#f00", retina: true, resize: true })`
    */
    setup(opt) {
      this._bgcolor = opt.bgcolor ? opt.bgcolor : "transparent";
      this.autoResize = opt.resize != void 0 ? opt.resize : false;
      if (opt.retina !== false) {
        const r1 = window ? window.devicePixelRatio || 1 : 1;
        const r2 = this._ctx.webkitBackingStorePixelRatio || this._ctx.mozBackingStorePixelRatio || this._ctx.msBackingStorePixelRatio || this._ctx.oBackingStorePixelRatio || this._ctx.backingStorePixelRatio || 1;
        this._pixelScale = Math.max(1, r1 / r2);
      }
      if (opt.offscreen) {
        this._offscreen = true;
        this._offCanvas = this._createElement("canvas", this.id + "_offscreen");
        this._offCtx = this._offCanvas.getContext("2d");
      } else {
        this._offscreen = false;
      }
      if (opt.pixelDensity) {
        this._pixelScale = opt.pixelDensity;
      }
      return this;
    }
    /**
    * Set whether the canvas element should resize when its container is resized. 
    * @param auto a boolean value indicating if auto size is set
    */
    set autoResize(auto) {
      this._autoResize = auto;
      if (auto) {
        this._resizeObserver = new ResizeObserver((entries) => {
          this._resizeHandler(null);
        });
        this._resizeObserver.observe(this._container);
      } else {
        if (this._resizeObserver)
          this._resizeObserver.disconnect();
      }
    }
    get autoResize() {
      return this._autoResize;
    }
    /**
    * This overrides Space's `resize` function. It's used as a callback function for window's resize event and not usually called directly. You can keep track of resize events with `resize: (bound ,evt)` callback in your player objects. 
    * @param b a Bound object to resize to
    * @param evt Optionally pass a resize event
    * @see Space.add
    */
    resize(b, evt) {
      this.bound = b;
      this._canvas.width = Math.ceil(this.bound.size.x) * this._pixelScale;
      this._canvas.height = Math.ceil(this.bound.size.y) * this._pixelScale;
      this._canvas.style.width = Math.ceil(this.bound.size.x) + "px";
      this._canvas.style.height = Math.ceil(this.bound.size.y) + "px";
      if (this._offscreen) {
        this._offCanvas.width = Math.ceil(this.bound.size.x) * this._pixelScale;
        this._offCanvas.height = Math.ceil(this.bound.size.y) * this._pixelScale;
      }
      if (this._pixelScale != 1) {
        this._ctx.scale(this._pixelScale, this._pixelScale);
        if (this._offscreen) {
          this._offCtx.scale(this._pixelScale, this._pixelScale);
        }
      }
      for (const k in this.players) {
        if (this.players.hasOwnProperty(k)) {
          const p = this.players[k];
          if (p.resize)
            p.resize(this.bound, evt);
        }
      }
      this.render(this._ctx);
      if (evt && !this.isPlaying)
        this.playOnce(0);
      return this;
    }
    /**
    * Window resize handling
    * @param evt 
    */
    _resizeHandler(evt) {
      const b = this._autoResize || this._initialResize ? this._container.getBoundingClientRect() : this._canvas.getBoundingClientRect();
      if (b) {
        const box = Bound.fromBoundingRect(b);
        box.center = box.center.add((window == null ? void 0 : window.scrollX) || 0, (window == null ? void 0 : window.scrollY) || 0);
        this.resize(box, evt);
      }
    }
    /**
    * Set a background color for this canvas. Alternatively, you may use `clear()` function.
    @param bg background color as hex or rgba string
    */
    set background(bg) {
      this._bgcolor = bg;
    }
    get background() {
      return this._bgcolor;
    }
    /**
    * `pixelScale` property returns a number that let you determine if the screen is "retina" (when value >= 2)
    */
    get pixelScale() {
      return this._pixelScale;
    }
    /**
    * Check if an offscreen canvas is created
    */
    get hasOffscreen() {
      return this._offscreen;
    }
    /**
    * Get the rendering context of offscreen canvas (if created via `setup()`)
    */
    get offscreenCtx() {
      return this._offCtx;
    }
    /**
    * Get the offscreen canvas element
    */
    get offscreenCanvas() {
      return this._offCanvas;
    }
    /**
    * Get a new `CanvasForm` for drawing
    * @see `CanvasForm`
    */
    getForm() {
      return new CanvasForm(this);
    }
    /**
    * Get the html canvas element
    */
    get element() {
      return this._canvas;
    }
    /**
    * Get the parent element that contains the canvas element
    */
    get parent() {
      return this._container;
    }
    /**
     * A property to indicate if the Space is ready
     */
    get ready() {
      return this._isReady;
    }
    /**
    * Get the rendering context of canvas
    * @example `form.ctx.clip()`
    */
    get ctx() {
      return this._ctx;
    }
    /**
    * Clear the canvas with its background color. Overrides Space's `clear` function.
    * @param bg Optionally specify a custom background color in hex or rgba string, or "transparent". If not defined, it will use its `bgcolor` property as background color to clear the canvas.
    */
    clear(bg) {
      if (bg)
        this._bgcolor = bg;
      const lastColor = this._ctx.fillStyle;
      const px = Math.ceil(this.pixelScale);
      if (!this._bgcolor || this._bgcolor === "transparent") {
        this._ctx.clearRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
      } else {
        if (this._bgcolor.indexOf("rgba") === 0 || this._bgcolor.length === 9 && this._bgcolor.indexOf("#") === 0) {
          this._ctx.clearRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
        }
        this._ctx.fillStyle = this._bgcolor;
        this._ctx.fillRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
      }
      this._ctx.fillStyle = lastColor;
      return this;
    }
    /**
    * Similiar to `clear()` but clear the offscreen canvas instead
    * @param bg Optionally specify a custom background color in hex or rgba string, or "transparent". If not defined, it will use its `bgcolor` property as background color to clear the canvas.
    */
    clearOffscreen(bg) {
      if (this._offscreen) {
        const px = Math.ceil(this.pixelScale);
        if (bg) {
          this._offCtx.fillStyle = bg;
          this._offCtx.fillRect(-px, -px, this._canvas.width + px, this._canvas.height + px);
        } else {
          this._offCtx.clearRect(-px, -px, this._offCanvas.width + px, this._offCanvas.height + px);
        }
      }
      return this;
    }
    /**
    * Main animation function.
    * @param time current time
    */
    playItems(time) {
      if (this._isReady) {
        this._ctx.save();
        if (this._offscreen)
          this._offCtx.save();
        super.playItems(time);
        this._ctx.restore();
        if (this._offscreen)
          this._offCtx.restore();
        this.render(this._ctx);
      }
    }
    /**
    * Dispose of browser resources held by this space and remove all players. Call this before unmounting the canvas.
    */
    dispose() {
      this._resizeObserver.disconnect();
      this.stop();
      this.removeAll();
      return this;
    }
    /**
     * Get a [`MediaRecorder`](https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder) to record the current CanvasSpace. You can then call its `start()` function to start recording, and `stop()` to either download the video file or handle the blob data in the callback function you provided.
     * @param downloadOrCallback Either `true` to download the video, or provide a callback function to handle the Blob data, when recording is completed.
     * @param filetype video format. Default is "webm".
     * @param bitrate bitrate per second
     * @example `let rec = space.recorder(true); rec.start(); setTimeout( () => rec.stop(), 5000); // record 5s of video and download the file`
     */
    recorder(downloadOrCallback, filetype = "webm", bitrate = 15e6) {
      const stream = this._canvas.captureStream();
      const recorder = new MediaRecorder(stream, { mimeType: `video/${filetype}`, bitsPerSecond: bitrate });
      recorder.ondataavailable = function(d) {
        const url = URL.createObjectURL(new Blob([d.data], { type: `video/${filetype}` }));
        if (typeof downloadOrCallback === "function") {
          downloadOrCallback(url);
        } else if (downloadOrCallback) {
          const a = document.createElement("a");
          a.href = url;
          a.download = `canvas_video.${filetype}`;
          a.click();
          a.remove();
        }
      };
      return recorder;
    }
  };
  var CanvasForm = class _CanvasForm extends VisualForm {
    /**
    * Create a new CanvasForm. You may also use [`CanvasSpace.getForm()`](#link) to get the default form.
    * @param space an instance of CanvasSpace
    */
    constructor(space) {
      super();
      /** 
      * store common styles so that they can be restored to canvas context when using multiple forms. See `reset()`.
      */
      this._style = {
        fillStyle: "#f03",
        strokeStyle: "#fff",
        lineWidth: 1,
        lineJoin: "bevel",
        lineCap: "butt",
        globalAlpha: 1
      };
      if (!space)
        return this;
      const _setup = (ctx) => {
        this._ctx = ctx;
        this._ctx.fillStyle = this._style.fillStyle;
        this._ctx.strokeStyle = this._style.strokeStyle;
        this._ctx.lineJoin = "bevel";
        this._ctx.font = this._font.value;
        this._ready = true;
      };
      if (space instanceof CanvasSpace2) {
        this._space = space;
        if (this._space.ready && this._space.ctx) {
          _setup(this._space.ctx);
        } else {
          this._space.add({ start: () => {
            _setup(this._space.ctx);
          } });
        }
      } else {
        _setup(space);
      }
    }
    /**
    * get the CanvasSpace instance that this form is associated with
    */
    get space() {
      return this._space;
    }
    /**
    * Get the rendering context of canvas to perform other canvas functions.
    * @example `form.ctx.clip()`
    */
    get ctx() {
      return this._ctx;
    }
    /**
    * Toggle whether to draw on offscreen canvas (if offscreen is set in CanvasSpace)
    * @param off if `true`, draw on offscreen canvas instead of the visible canvas. Default is `true`
    * @param clear optionally provide a valid color string to fill a bg color. see CanvasSpace's `clearOffscreen` function.
    */
    useOffscreen(off = true, clear = false) {
      if (clear)
        this._space.clearOffscreen(typeof clear == "string" ? clear : null);
      this._ctx = this._space.hasOffscreen && off ? this._space.offscreenCtx : this._space.ctx;
      return this;
    }
    /**
    * Render the offscreen canvas's content on the visible canvas
    * @param offset Optional offset on the top-left position when drawing on the visible canvas
    */
    renderOffscreen(offset = [0, 0]) {
      if (this._space.hasOffscreen) {
        this._space.ctx.drawImage(
          this._space.offscreenCanvas,
          offset[0],
          offset[1],
          this._space.width,
          this._space.height
        );
      }
    }
    /**
       * Set current alpha value.
       * @example `form.alpha(0.6)`
       * @param a alpha value between 0 and 1
       */
    alpha(a) {
      this._ctx.globalAlpha = a;
      this._style.globalAlpha = a;
      return this;
    }
    /**
      * Set current fill style. Provide a valid color string such as `"#FFF"` or `"rgba(255,0,100,0.5)"` or `false` to specify no fill color.
      * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
      * @param c fill color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle))
      */
    fill(c) {
      if (typeof c == "boolean") {
        this.filled = c;
      } else {
        this.filled = true;
        this._style.fillStyle = c;
        this._ctx.fillStyle = c;
      }
      return this;
    }
    /**
      * Set current fill style and remove stroke style.
      * @param c fill color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle))
      */
    fillOnly(c) {
      this.stroke(false);
      return this.fill(c);
    }
    /**
      * Set current stroke style. Provide a valid color string or `false` to specify no stroke color.
      * @example `form.stroke("#F90")`, `form.stroke("rgba(0,0,0,.5")`, `form.stroke(false)`, `form.stroke("#000", 0.5, 'round', 'square')`
      * @param c stroke color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle))
      * @param width Optional value (can be floating point) to set line width
      * @param linejoin Optional string to set line joint style. Can be "miter", "bevel", or "round".
      * @param linecap Optional string to set line cap style. Can be "butt", "round", or "square".
      */
    stroke(c, width, linejoin, linecap) {
      if (typeof c == "boolean") {
        this.stroked = c;
      } else {
        this.stroked = true;
        this._style.strokeStyle = c;
        this._ctx.strokeStyle = c;
        if (width) {
          this._ctx.lineWidth = width;
          this._style.lineWidth = width;
        }
        if (linejoin) {
          this._ctx.lineJoin = linejoin;
          this._style.lineJoin = linejoin;
        }
        if (linecap) {
          this._ctx.lineCap = linecap;
          this._style.lineCap = linecap;
        }
      }
      return this;
    }
    /**
      * Set stroke style and remove fill style.
      * @param c stroke color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle))
      * @param width Optional value (can be floating point) to set line width
      * @param linejoin Optional string to set line joint style. Can be "miter", "bevel", or "round".
      * @param linecap Optional string to set line cap style. Can be "butt", "round", or "square".
      */
    strokeOnly(c, width, linejoin, linecap) {
      this.fill(false);
      return this.stroke(c, width, linejoin, linecap);
    }
    /**
       * A convenient function to apply fill and/or stroke after custom drawings using canvas context (eg, `form.ctx.ellipse(...)`). 
       * You don't need to call this function if you're using Pts' drawing functions like `form.point` or `form.rect`
       * @param filled apply fill when set to `true`
       * @param stroked apply stroke when set to `true`
       * @param strokeWidth optionally set a stroke width
       * @example `form.ctx.beginPath(); form.ctx.ellipse(...); form.applyFillStroke();`
       */
    applyFillStroke(filled = true, stroked = true, strokeWidth = 1) {
      if (filled) {
        if (typeof filled === "string")
          this.fill(filled);
        this._ctx.fill();
      }
      if (stroked) {
        if (typeof stroked === "string")
          this.stroke(stroked, strokeWidth);
        this._ctx.stroke();
      }
      return this;
    }
    /**
       * This function takes an array of gradient colors, and returns a function to define the areas of the gradient fill. See demo code in [CanvasForm.gradient](https://ptsjs.org/demo/?name=canvasform.textBox).
       * @param stops an array of gradient stops. This can be an array of colors `["#f00", "#0f0", ...]` for evenly distributed gradient, or an array of [stop, color] like `[[0.1, "#f00"], [0.7, "#0f0"]]`
       * @returns a function that takes 1 or 2 `Group` as parameters. Use a single `Group` to specify a rectangular area for linear gradient, or use 2 `Groups` to specify 2 `Circles` for radial gradient.
       * @example `c1 = Circle.fromCenter(...); grad = form.gradient(["#f00", "#00f"]); form.fill( grad( c1, c2 ) ).circle( c1 )`
       */
    gradient(stops) {
      const vals = [];
      if (stops.length < 2)
        stops.push([0.99, "#000"], [1, "#000"]);
      for (let i = 0, len = stops.length; i < len; i++) {
        const t = typeof stops[i] === "string" ? i * (1 / (stops.length - 1)) : stops[i][0];
        const v = typeof stops[i] === "string" ? stops[i] : stops[i][1];
        vals.push([t, v]);
      }
      return (area1, area2) => {
        const grad = area2 ? this._ctx.createRadialGradient(area1[0][0], area1[0][1], Math.abs(area1[1][0]), area2[0][0], area2[0][1], Math.abs(area2[1][0])) : this._ctx.createLinearGradient(area1[0][0], area1[0][1], area1[1][0], area1[1][1]);
        for (let i = 0, len = vals.length; i < len; i++) {
          grad.addColorStop(vals[i][0], vals[i][1]);
        }
        return grad;
      };
    }
    /**
       * Set composite operation (also known as blend mode). You can also call this function without parameters to get back to default 'source-over' mode. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation) for the full list of operations you can use.
       * @param mode a composite operation such as 'lighten', 'multiply', 'overlay', and 'color-burn'.
       */
    composite(mode = "source-over") {
      this._ctx.globalCompositeOperation = mode;
      return this;
    }
    /**
       * Create a clipping mask from the current path. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clip) for details.
       */
    clip() {
      this._ctx.clip();
      return this;
    }
    /**
      * Activate dashed stroke and set dash style. You can customize the segments and offset.
      * @example `form.dash()`, `form.dash([5, 10])`, `form.dash([5, 5], 5)`, `form.dash(false)`
      * @param segments Dash segments. Defaults to `true` which corresponds to `[5, 5]`. Pass `false` to deactivate dashes. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash))
      * @param offset Dash offset. Defaults to 0. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset)
      */
    dash(segments = true, offset = 0) {
      if (!segments) {
        this._ctx.setLineDash([]);
        this._ctx.lineDashOffset = 0;
      } else {
        if (segments === true) {
          segments = [5, 5];
        }
        this._ctx.setLineDash([segments[0], segments[1]]);
        this._ctx.lineDashOffset = offset;
      }
      return this;
    }
    /**
      * Set the current font.
      * @param sizeOrFont either a number to specify font-size, or a `Font` object to specify all font properties
      * @param weight Optional font-weight string such as "bold"
      * @param style Optional font-style string such as "italic"
      * @param lineHeight Optional line-height number suchas 1.5
      * @param family Optional font-family such as "Helvetica, sans-serif"
      * @example `form.font( myFont )`, `form.font(14, "bold")`
      */
    font(sizeOrFont, weight, style, lineHeight, family) {
      if (typeof sizeOrFont == "number") {
        this._font.size = sizeOrFont;
        if (family)
          this._font.face = family;
        if (weight)
          this._font.weight = weight;
        if (style)
          this._font.style = style;
        if (lineHeight)
          this._font.lineHeight = lineHeight;
      } else {
        this._font = sizeOrFont;
      }
      this._ctx.font = this._font.value;
      if (this._estimateTextWidth)
        this.fontWidthEstimate(true);
      return this;
    }
    /**
       * Set whether to use html canvas' [`measureText`](#link) function, or a faster but less accurate heuristic function.
       * @param estimate `true` to use heuristic function, or `false` to use ctx.measureText
       */
    fontWidthEstimate(estimate = true) {
      this._estimateTextWidth = estimate ? Typography.textWidthEstimator((c) => this._ctx.measureText(c).width) : void 0;
      return this;
    }
    /**
       * Get the width of this text. It will return an actual measurement or an estimate based on [`fontWidthEstimate`](#link) setting. Default is an actual measurement using canvas context's measureText.
       * @param c a string of text contents
       */
    getTextWidth(c) {
      return !this._estimateTextWidth ? this._ctx.measureText(c + " .").width : this._estimateTextWidth(c);
    }
    /**
       * Truncate text to fit width.
       * @param str text to truncate
       * @param width width to fit
       * @param tail text to indicate overflow such as "...". Default is empty "".
       */
    _textTruncate(str, width, tail = "") {
      return Typography.truncate(this.getTextWidth.bind(this), str, width, tail);
    }
    /**
       * Align text within a rectangle box.
       * @param box a Group or an Iterable<PtLike> that defines a rectangular box
       * @param vertical a string that specifies the vertical alignment in the box: "top", "bottom", "middle", "start", "end"
       * @param offset Optional offset from the edge (like padding)
       * @param center Optional center position 
       */
    _textAlign(box, vertical, offset, center) {
      const _box = Util.iterToArray(box);
      if (!Util.arrayCheck(_box))
        return;
      if (!center)
        center = Rectangle.center(_box);
      let px = _box[0][0];
      if (this._ctx.textAlign == "end" || this._ctx.textAlign == "right") {
        px = _box[1][0];
      } else if (this._ctx.textAlign == "center" || this._ctx.textAlign == "middle") {
        px = center[0];
      }
      let py = center[1];
      if (vertical == "top" || vertical == "start") {
        py = _box[0][1];
      } else if (vertical == "end" || vertical == "bottom") {
        py = _box[1][1];
      }
      return offset ? new Pt(px + offset[0], py + offset[1]) : new Pt(px, py);
    }
    /**
      * Reset the rendering context's common styles to this form's styles. This supports using multiple forms on the same canvas context.
      */
    reset() {
      for (const k in this._style) {
        if (this._style.hasOwnProperty(k)) {
          this._ctx[k] = this._style[k];
        }
      }
      this._font = new Font();
      this._ctx.font = this._font.value;
      return this;
    }
    _paint() {
      if (this._filled)
        this._ctx.fill();
      if (this._stroked)
        this._ctx.stroke();
    }
    /**
      * A static function to draw a point.
      * @param ctx canvas rendering context
      * @param p a Pt object
      * @param radius radius of the point. Default is 5.
      * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
      * @example `form.point( p )`, `form.point( p, 10, "circle" )`
      */
    static point(ctx, p, radius = 5, shape = "square") {
      if (!p)
        return;
      if (!_CanvasForm[shape])
        throw new Error(`${shape} is not a static function of CanvasForm`);
      _CanvasForm[shape](ctx, p, radius);
    }
    /**
      * Draws a point.
      * @param p a Pt object
      * @param radius radius of the point. Default is 5.
      * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
      * @example `form.point( p )`, `form.point( p, 10, "circle" )`
      */
    point(p, radius = 5, shape = "square") {
      _CanvasForm.point(this._ctx, p, radius, shape);
      this._paint();
      return this;
    }
    /**
      * A static function to draw a circle.
      * @param ctx canvas rendering context
      * @param pt center position of the circle
      * @param radius radius of the circle
      */
    static circle(ctx, pt, radius = 10) {
      if (!pt)
        return;
      ctx.beginPath();
      ctx.arc(pt[0], pt[1], radius, 0, Const.two_pi, false);
      ctx.closePath();
    }
    /**
      * Draw a circle. See also [`Circle.fromCenter`](#link)
      * @param pts usually a Group or an Iterable<PtLike> with 2 Pt, but it can also take an array of two numeric arrays [ [position], [size] ]
      */
    circle(pts) {
      const p = Util.iterToArray(pts);
      _CanvasForm.circle(this._ctx, p[0], p[1][0]);
      this._paint();
      return this;
    }
    /**
      * A static function to draw an ellipse.
      * @param ctx canvas rendering context
      * @param pt center position 
      * @param radius radius [x, y] of the ellipse
      * @param rotation rotation of the ellipse in radian. Default is 0.
      * @param startAngle start angle of the ellipse. Default is 0.
      * @param endAngle end angle of the ellipse. Default is 2 PI.
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    static ellipse(ctx, pt, radius, rotation = 0, startAngle = 0, endAngle = Const.two_pi, cc = false) {
      if (!pt || !radius)
        return;
      ctx.beginPath();
      ctx.ellipse(pt[0], pt[1], radius[0], radius[1], rotation, startAngle, endAngle, cc);
    }
    /**
      * Draw an ellipse.
      * @param pt center position 
      * @param radius radius [x, y] of the ellipse
      * @param rotation rotation of the ellipse in radian. Default is 0.
      * @param startAngle start angle of the ellipse. Default is 0.
      * @param endAngle end angle of the ellipse. Default is 2 PI.
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    ellipse(pt, radius, rotation = 0, startAngle = 0, endAngle = Const.two_pi, cc = false) {
      _CanvasForm.ellipse(this._ctx, pt, radius, rotation, startAngle, endAngle, cc);
      this._paint();
      return this;
    }
    /**
      * A static function to draw an arc.
      * @param ctx canvas rendering context
      * @param pt center position 
      * @param radius radius of the arc circle
      * @param startAngle start angle of the arc
      * @param endAngle end angle of the arc
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    static arc(ctx, pt, radius, startAngle, endAngle, cc) {
      if (!pt)
        return;
      ctx.beginPath();
      ctx.arc(pt[0], pt[1], radius, startAngle, endAngle, cc);
    }
    /**
      * Draw an arc.
      * @param pt center position
      * @param radius radius of the arc circle
      * @param startAngle start angle of the arc
      * @param endAngle end angle of the arc
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    arc(pt, radius, startAngle, endAngle, cc) {
      _CanvasForm.arc(this._ctx, pt, radius, startAngle, endAngle, cc);
      this._paint();
      return this;
    }
    /**
      * A static function to draw a square.
      * @param ctx canvas rendering context
      * @param pt center position of the square
      * @param halfsize half size of the square
      */
    static square(ctx, pt, halfsize) {
      if (!pt)
        return;
      const x1 = pt[0] - halfsize;
      const y1 = pt[1] - halfsize;
      const x2 = pt[0] + halfsize;
      const y2 = pt[1] + halfsize;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x1, y2);
      ctx.lineTo(x2, y2);
      ctx.lineTo(x2, y1);
      ctx.closePath();
    }
    /**
       * Draw a square, given a center and its half-size.
       * @param pt center Pt
       * @param halfsize half-size
       */
    square(pt, halfsize) {
      _CanvasForm.square(this._ctx, pt, halfsize);
      this._paint();
      return this;
    }
    /**
      * A static function to draw a line or polyline.
      * @param ctx canvas rendering context
      * @param pts a Group or an Iterable<PtLike> representing a line
      */
    static line(ctx, pts) {
      if (!Util.arrayCheck(pts))
        return;
      let i = 0;
      ctx.beginPath();
      for (const it of pts) {
        if (it) {
          if (i++ > 0) {
            ctx.lineTo(it[0], it[1]);
          } else {
            ctx.moveTo(it[0], it[1]);
          }
        }
      }
    }
    /**
      * Draw a line or polyline.
      * @param pts a Group or an Iterable<PtLike> representing a line
      */
    line(pts) {
      _CanvasForm.line(this._ctx, pts);
      this._paint();
      return this;
    }
    /**
      * A static function to draw a polygon.
      * @param ctx canvas rendering context
      * @param pts a Group or an Iterable<PtLike> representing a polygon
      */
    static polygon(ctx, pts) {
      if (!Util.arrayCheck(pts))
        return;
      _CanvasForm.line(ctx, pts);
      ctx.closePath();
    }
    /**
      * Draw a polygon.
      * @param pts a Group or an Iterable<PtLike> representingg a polygon
      */
    polygon(pts) {
      _CanvasForm.polygon(this._ctx, pts);
      this._paint();
      return this;
    }
    /**
      * A static function to draw a rectangle.
      * @param ctx canvas rendering context
      * @param pts a Group or an Iterable<PtLike> with 2 Pt specifying the top-left and bottom-right positions.
      */
    static rect(ctx, pts) {
      const p = Util.iterToArray(pts);
      if (!Util.arrayCheck(p))
        return;
      ctx.beginPath();
      ctx.moveTo(p[0][0], p[0][1]);
      ctx.lineTo(p[0][0], p[1][1]);
      ctx.lineTo(p[1][0], p[1][1]);
      ctx.lineTo(p[1][0], p[0][1]);
      ctx.closePath();
    }
    /**
      * Draw a rectangle.
      * @param pts a Group or an Iterable<PtLike> with 2 Pt specifying the top-left and bottom-right positions.
      */
    rect(pts) {
      _CanvasForm.rect(this._ctx, pts);
      this._paint();
      return this;
    }
    /**
       * A static function to draw an image.
       * @param ctx canvas rendering context
       * @param img either an [Img](#link) instance or an [`CanvasImageSource`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource) instance (eg the image from `<img>`, `<video>` or `<canvas>`)
       * @param ptOrRect a target area to place the image. Either a Pt or numeric array specifying a position, or a Group or an Iterable<PtLike> with 2 Pt (top-left, bottom-right) that specifies a bounding box for resizing. Default is (0,0) at top-left.
       * @param orig optionally a Group or an Iterable<PtLike> with 2 Pt (top-left, bottom-right) that specifies a cropping box in the original target. 
       */
    static image(ctx, ptOrRect, img, orig) {
      const t = Util.iterToArray(ptOrRect);
      let pos;
      if (typeof t[0] === "number") {
        pos = t;
      } else {
        if (orig) {
          const o = Util.iterToArray(orig);
          pos = [
            o[0][0],
            o[0][1],
            o[1][0] - o[0][0],
            o[1][1] - o[0][1],
            t[0][0],
            t[0][1],
            t[1][0] - t[0][0],
            t[1][1] - t[0][1]
          ];
        } else {
          pos = [t[0][0], t[0][1], t[1][0] - t[0][0], t[1][1] - t[0][1]];
        }
      }
      if (img instanceof Img) {
        if (img.loaded) {
          ctx.drawImage(img.image, ...pos);
        }
      } else {
        ctx.drawImage(img, ...pos);
      }
    }
    /**
      * Draw an image.
      * @param img either an [Img](#link) instance or an [`CanvasImageSource`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasImageSource) instance (eg the image from `<img>`, `<video>` or `<canvas>`)
      * @param ptOrRect a target area to place the image. Either a PtLike specifying a position, or a Group or an Iterable<PtLike> with 2 Pt (top-left position, bottom-right position) that specifies a bounding box. Default is (0,0) at top-left.
      * @param orig optionally a Group or an Iterable<PtLike> with 2 Pt (top-left position, bottom-right position) that specifies a cropping box  in the original target. 
      */
    image(ptOrRect, img, orig) {
      if (img instanceof Img) {
        if (img.loaded) {
          _CanvasForm.image(this._ctx, ptOrRect, img.image, orig);
        }
      } else {
        _CanvasForm.image(this._ctx, ptOrRect, img, orig);
      }
      return this;
    }
    /**
       * A static function to draw ImageData on canvas
       * @param ctx canvas rendering context
       * @param ptOrRect a target area to place the image. Either a Pt or numeric array specifying a position, or a Group or an Iterable<PtLike> with 2 Pt (top-left, bottom-right) that specifies a bounding box for resizing. Default is (0,0) at top-left.
       * @param img an ImageData object
       */
    static imageData(ctx, ptOrRect, img) {
      const t = Util.iterToArray(ptOrRect);
      if (typeof t[0] === "number") {
        ctx.putImageData(img, t[0], t[1]);
      } else {
        ctx.putImageData(img, t[0][0], t[0][1], t[0][0], t[0][1], t[1][0], t[1][1]);
      }
    }
    /**
       * Draw ImageData on canvas using ImageData
       * @param ptOrRect a target area to place the image. Either a Pt or numeric array specifying a position, or a Group or an Iterable<PtLike> with 2 Pt (top-left, bottom-right) that specifies a bounding box for resizing. Default is (0,0) at top-left.
       * @param img an ImageData object
       */
    imageData(ptOrRect, img) {
      _CanvasForm.imageData(this._ctx, ptOrRect, img);
      return this;
    }
    /**
      * A static function to draw text.
      * @param ctx canvas rendering context
      * @param `pt` a Point object to specify the anchor point
      * @param `txt` a string of text to draw
      * @param `maxWidth` specify a maximum width per line
      */
    static text(ctx, pt, txt, maxWidth) {
      if (!pt)
        return;
      ctx.fillText(txt, pt[0], pt[1], maxWidth);
    }
    /**
      * Draw text on canvas.
      * @param `pt` a Pt or numeric array to specify the anchor point
      * @param `txt` text
      * @param `maxWidth` specify a maximum width per line
      */
    text(pt, txt, maxWidth) {
      _CanvasForm.text(this._ctx, pt, txt, maxWidth);
      return this;
    }
    /**
       * Fit a single-line text in a rectangular box.
       * @param box a rectangle box defined by a Group or an Iterable<Pt>
       * @param txt string of text
       * @param tail text to indicate overflow such as "...". Default is empty "".
       * @param verticalAlign "top", "middle", or "bottom" to specify vertical alignment inside the box
       * @param overrideBaseline If `true`, use the corresponding baseline as verticalAlign. If `false`, use the current canvas context's textBaseline setting. Default is `true`.
       */
    textBox(box, txt, verticalAlign = "middle", tail = "", overrideBaseline = true) {
      if (overrideBaseline)
        this._ctx.textBaseline = verticalAlign;
      const size = Rectangle.size(box);
      const t = this._textTruncate(txt, size[0], tail);
      this.text(this._textAlign(box, verticalAlign), t[0]);
      return this;
    }
    /**
       * Fit multi-line text in a rectangular box. Note that this will also set canvas context's textBaseline to "top".
       * @param box a Group or an Iterable<PtLike> with 2 Pt that represents a bounding box
       * @param txt string of text
       * @param lineHeight line height as a ratio of font size. Default is 1.2.
       * @param verticalAlign "top", "middle", or "bottom" to specify vertical alignment inside the box
       * @param crop a boolean to specify whether to crop text when overflowing
       */
    paragraphBox(box, txt, lineHeight = 1.2, verticalAlign = "top", crop = true) {
      const b = Util.iterToArray(box);
      const size = Rectangle.size(b);
      this._ctx.textBaseline = "top";
      const lstep = this._font.size * lineHeight;
      const nextLine = (sub, buffer = [], cc = 0) => {
        if (!sub)
          return buffer;
        if (crop && cc * lstep > size[1] - lstep * 2)
          return buffer;
        if (cc > 1e4)
          throw new Error("max recursion reached (10000)");
        const t = this._textTruncate(sub, size[0], "");
        const newln = t[0].indexOf("\n");
        if (newln >= 0) {
          buffer.push(t[0].substr(0, newln));
          return nextLine(sub.substr(newln + 1), buffer, cc + 1);
        }
        let dt = t[0].lastIndexOf(" ") + 1;
        if (dt <= 0 || t[1] === sub.length)
          dt = void 0;
        const line = t[0].substr(0, dt);
        buffer.push(line);
        return t[1] <= 0 || t[1] === sub.length ? buffer : nextLine(sub.substr(dt || t[1]), buffer, cc + 1);
      };
      const lines = nextLine(txt);
      const lsize = lines.length * lstep;
      let lbox = b;
      if (verticalAlign == "middle" || verticalAlign == "center") {
        let lpad = (size[1] - lsize) / 2;
        if (crop)
          lpad = Math.max(0, lpad);
        lbox = new Group(b[0].$add(0, lpad), b[1].$subtract(0, lpad));
      } else if (verticalAlign == "bottom") {
        lbox = new Group(b[0].$add(0, size[1] - lsize), b[1]);
      } else {
        lbox = new Group(b[0], b[0].$add(size[0], lsize));
      }
      const center = Rectangle.center(lbox);
      for (let i = 0, len = lines.length; i < len; i++) {
        this.text(this._textAlign(lbox, "top", [0, i * lstep], center), lines[i]);
      }
      return this;
    }
    /**
       * Set text alignment and baseline (eg, vertical-align).
       * @param alignment HTML canvas' textAlign option: "left", "right", "center", "start", or "end"
       * @param baseline HTML canvas' textBaseline option: "top", "hanging", "middle", "alphabetic", "ideographic", "bottom". For convenience, you can also use "center" (same as "middle"), and "baseline" (same as "alphabetic")
       */
    alignText(alignment = "left", baseline = "alphabetic") {
      if (baseline == "center")
        baseline = "middle";
      if (baseline == "baseline")
        baseline = "alphabetic";
      this._ctx.textAlign = alignment;
      this._ctx.textBaseline = baseline;
      return this;
    }
    /**
      * A convenient way to draw some text on canvas for logging or debugging. It'll be draw on the top-left of the canvas as an overlay.
      * @param txt text
      */
    log(txt) {
      const w = this._ctx.measureText(txt).width + 20;
      this.stroke(false).fill("rgba(0,0,0,.4)").rect([[0, 0], [w, 20]]);
      this.fill("#fff").text([10, 14], txt);
      return this;
    }
  };

  // src/Create.ts
  var Create_exports = {};
  __export(Create_exports, {
    Create: () => Create,
    Delaunay: () => Delaunay,
    Noise: () => Noise
  });
  var Create = class {
    /**
     * Create a set of random points inside a bounday.
     * @param bound the rectangular boundary
     * @param count number of random points to create
     * @param dimensions number of dimensions in each point
     */
    static distributeRandom(bound, count, dimensions = 2) {
      let pts = new Group();
      for (let i = 0; i < count; i++) {
        let p = [bound.x + Num.random() * bound.width];
        if (dimensions > 1)
          p.push(bound.y + Num.random() * bound.height);
        if (dimensions > 2)
          p.push(bound.z + Num.random() * bound.depth);
        pts.push(new Pt(p));
      }
      return pts;
    }
    /**
     * Create a set of points that distribute evenly on a line. Similar to [`Line.subpoints`](#link) but includes the end points.
     * @param line a Group or an Iterable<Pt> representing a line
     * @param count number of points to create
     */
    static distributeLinear(line, count) {
      let _line = Util.iterToArray(line);
      let ln = Line.subpoints(_line, count - 2);
      ln.unshift(_line[0]);
      ln.push(_line[_line.length - 1]);
      return ln;
    }
    /**
     * Create an evenly distributed set of points (like a grid of points) inside a boundary.
     * @param bound the rectangular boundary
     * @param columns number of columns
     * @param rows number of rows
     * @param orientation a Pt or number array to specify where the point should be inside a cell. Default is [0.5, 0.5] which places the point in the middle.
     * @returns a Group of Pts
     */
    static gridPts(bound, columns, rows, orientation = [0.5, 0.5]) {
      if (columns === 0 || rows === 0)
        throw new Error("grid columns and rows cannot be 0");
      let unit = bound.size.$subtract(1).$divide(columns, rows);
      let offset = unit.$multiply(orientation);
      let g = new Group();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          g.push(bound.topLeft.$add(unit.$multiply(c, r)).add(offset));
        }
      }
      return g;
    }
    /**
     * Create a grid of cells inside a boundary, where each cell is defined by a group of 2 Pt.
     * @param bound the rectangular boundary
     * @param columns number of columns
     * @param rows number of rows
     * @returns an array of Groups, where each group represents a rectangular cell
     */
    static gridCells(bound, columns, rows) {
      if (columns === 0 || rows === 0)
        throw new Error("grid columns and rows cannot be 0");
      let unit = bound.size.$subtract(1).divide(columns, rows);
      let g = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          g.push(new Group(
            bound.topLeft.$add(unit.$multiply(c, r)),
            bound.topLeft.$add(unit.$multiply(c, r).add(unit))
          ));
        }
      }
      return g;
    }
    /**
     * Create a set of Pts around a circular path.
     * @param center circle center
     * @param radius circle radius
     * @param count number of Pts to create
     * @param angleOffset offset starting angle
     */
    static radialPts(center, radius, count, angleOffset = -Const.half_pi) {
      let g = new Group();
      let a = Const.two_pi / count;
      for (let i = 0; i < count; i++) {
        g.push(new Pt(center).toAngle(a * i + angleOffset, radius, true));
      }
      return g;
    }
    /**
     * Given a group of Pts, return a new group of `Noise` Pts.
     * @param pts a Group or an Iterable<Pt>
     * @param dx small increment value in x dimension
     * @param dy small increment value in y dimension
     * @param rows Optional row count to generate 2D noise
     * @param columns Optional column count to generate 2D noise
     */
    static noisePts(pts, dx = 0.01, dy = 0.01, rows = 0, columns = 0) {
      let seed = Num.random();
      let g = new Group();
      let i = 0;
      for (let p of pts) {
        let np = new Noise(p);
        let r = rows && rows > 0 ? Math.floor(i / rows) : i;
        let c = columns && columns > 0 ? i % columns : i;
        np.initNoise(dx * c, dy * r);
        np.seed(seed);
        g.push(np);
        i++;
      }
      return g;
    }
    /**
     * Create a Delaunay Group. Use the [`Delaunay.delaunay()`](#link) and [`Delaunay.voronoi()`](#link) functions in the returned group to generate tessellations.
     * @param pts a Group or an array of Pts
     * @returns an instance of the Delaunay class
     */
    static delaunay(pts) {
      return Delaunay.from(pts);
    }
  };
  var __noise_grad3 = [
    [1, 1, 0],
    [-1, 1, 0],
    [1, -1, 0],
    [-1, -1, 0],
    [1, 0, 1],
    [-1, 0, 1],
    [1, 0, -1],
    [-1, 0, -1],
    [0, 1, 1],
    [0, -1, 1],
    [0, 1, -1],
    [0, -1, -1]
  ];
  var __noise_permTable = [
    151,
    160,
    137,
    91,
    90,
    15,
    131,
    13,
    201,
    95,
    96,
    53,
    194,
    233,
    7,
    225,
    140,
    36,
    103,
    30,
    69,
    142,
    8,
    99,
    37,
    240,
    21,
    10,
    23,
    190,
    6,
    148,
    247,
    120,
    234,
    75,
    0,
    26,
    197,
    62,
    94,
    252,
    219,
    203,
    117,
    35,
    11,
    32,
    57,
    177,
    33,
    88,
    237,
    149,
    56,
    87,
    174,
    20,
    125,
    136,
    171,
    168,
    68,
    175,
    74,
    165,
    71,
    134,
    139,
    48,
    27,
    166,
    77,
    146,
    158,
    231,
    83,
    111,
    229,
    122,
    60,
    211,
    133,
    230,
    220,
    105,
    92,
    41,
    55,
    46,
    245,
    40,
    244,
    102,
    143,
    54,
    65,
    25,
    63,
    161,
    1,
    216,
    80,
    73,
    209,
    76,
    132,
    187,
    208,
    89,
    18,
    169,
    200,
    196,
    135,
    130,
    116,
    188,
    159,
    86,
    164,
    100,
    109,
    198,
    173,
    186,
    3,
    64,
    52,
    217,
    226,
    250,
    124,
    123,
    5,
    202,
    38,
    147,
    118,
    126,
    255,
    82,
    85,
    212,
    207,
    206,
    59,
    227,
    47,
    16,
    58,
    17,
    182,
    189,
    28,
    42,
    223,
    183,
    170,
    213,
    119,
    248,
    152,
    2,
    44,
    154,
    163,
    70,
    221,
    153,
    101,
    155,
    167,
    43,
    172,
    9,
    129,
    22,
    39,
    253,
    9,
    98,
    108,
    110,
    79,
    113,
    224,
    232,
    178,
    185,
    112,
    104,
    218,
    246,
    97,
    228,
    251,
    34,
    242,
    193,
    238,
    210,
    144,
    12,
    191,
    179,
    162,
    241,
    81,
    51,
    145,
    235,
    249,
    14,
    239,
    107,
    49,
    192,
    214,
    31,
    181,
    199,
    106,
    157,
    184,
    84,
    204,
    176,
    115,
    121,
    50,
    45,
    127,
    4,
    150,
    254,
    138,
    236,
    205,
    93,
    222,
    114,
    67,
    29,
    24,
    72,
    243,
    141,
    128,
    195,
    78,
    66,
    215,
    61,
    156,
    180
  ];
  var Noise = class extends Pt {
    /**
     * Create a Noise Pt that can generate noise continuously. See a [Noise demo here](../demo/index.html?name=create.noisePts).
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    constructor(...args) {
      super(...args);
      this.perm = [];
      this._n = new Pt(0.01, 0.01);
      this.perm = __noise_permTable.concat(__noise_permTable);
    }
    /**
     * Set the initial dimensional values of the noise.
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     * @example `noise.initNoise( 0.01, 0.1 )`
     */
    initNoise(...args) {
      this._n = new Pt(...args);
      return this;
    }
    /**
     * Add a small increment to the noise values.
     * @param x step in x dimension
     * @param y step in y dimension
     */
    step(x = 0, y = 0) {
      this._n.add(x, y);
      return this;
    }
    /**
     * Specify a seed for this Noise.
     * @param s seed value
     */
    seed(s) {
      if (s > 0 && s < 1)
        s *= 65536;
      s = Math.floor(s);
      if (s < 256)
        s |= s << 8;
      for (let i = 0; i < 255; i++) {
        let v = i & 1 ? __noise_permTable[i] ^ s & 255 : __noise_permTable[i] ^ s >> 8 & 255;
        this.perm[i] = this.perm[i + 256] = v;
      }
      return this;
    }
    /**
     * Generate a 2D Perlin noise value.
     */
    noise2D() {
      let i = Math.max(0, Math.floor(this._n[0])) % 255;
      let j = Math.max(0, Math.floor(this._n[1])) % 255;
      let x = this._n[0] % 255 - i;
      let y = this._n[1] % 255 - j;
      let n00 = Vec.dot(__noise_grad3[(i + this.perm[j]) % 12], [x, y, 0]);
      let n01 = Vec.dot(__noise_grad3[(i + this.perm[j + 1]) % 12], [x, y - 1, 0]);
      let n10 = Vec.dot(__noise_grad3[(i + 1 + this.perm[j]) % 12], [x - 1, y, 0]);
      let n11 = Vec.dot(__noise_grad3[(i + 1 + this.perm[j + 1]) % 12], [x - 1, y - 1, 0]);
      let _fade = (f) => f * f * f * (f * (f * 6 - 15) + 10);
      let tx = _fade(x);
      return Num.lerp(Num.lerp(n00, n10, tx), Num.lerp(n01, n11, tx), _fade(y));
    }
  };
  var Delaunay = class _Delaunay extends Group {
    constructor() {
      super(...arguments);
      this._mesh = [];
    }
    /**
     * Generate Delaunay triangles. This function also caches the mesh that is used to generate Voronoi tessellation in `voronoi()`. See a [Delaunay demo here](../demo/index.html?name=create.delaunay).
     * @param triangleOnly if true, returns an array of triangles in Groups, otherwise return the whole DelaunayShape
     * @returns an array of Groups or an array of DelaunayShapes `{i, j, k, triangle, circle}` which records the indices of the vertices, and the calculated triangles and circumcircles
     */
    delaunay(triangleOnly = true) {
      if (this.length < 3)
        return [];
      this._mesh = [];
      let n = this.length;
      let indices = [];
      for (let i = 0; i < n; i++)
        indices[i] = i;
      indices.sort((i, j) => this[j][0] - this[i][0]);
      let pts = this.slice();
      let st = this._superTriangle();
      pts = pts.concat(st);
      let opened = [this._circum(n, n + 1, n + 2, st)];
      let closed = [];
      let tris = [];
      for (let i = 0, len = indices.length; i < len; i++) {
        let c = indices[i];
        let edges = [];
        let j = opened.length;
        if (!this._mesh[c])
          this._mesh[c] = {};
        while (j--) {
          let circum = opened[j];
          let radius = circum.circle[1][0];
          let d = pts[c].$subtract(circum.circle[0]);
          if (d[0] > 0 && d[0] * d[0] > radius * radius) {
            closed.push(circum);
            tris.push(circum.triangle);
            opened.splice(j, 1);
            continue;
          }
          if (d[0] * d[0] + d[1] * d[1] - radius * radius > Const.epsilon) {
            continue;
          }
          edges.push(circum.i, circum.j, circum.j, circum.k, circum.k, circum.i);
          opened.splice(j, 1);
        }
        _Delaunay._dedupe(edges);
        j = edges.length;
        while (j > 1) {
          opened.push(this._circum(edges[--j], edges[--j], c, false, pts));
        }
      }
      for (let i = 0, len = opened.length; i < len; i++) {
        let o = opened[i];
        if (o.i < n && o.j < n && o.k < n) {
          closed.push(o);
          tris.push(o.triangle);
          this._cache(o);
        }
      }
      return triangleOnly ? tris : closed;
    }
    /**
     * Generate Voronoi cells. `delaunay()` must be called before calling this function. See a [Voronoi demo here](../demo/index.html?name=create.delaunay).
     * @returns an array of Groups, each of which represents a Voronoi cell
     */
    voronoi() {
      let vs = [];
      let n = this._mesh;
      for (let i = 0, len = n.length; i < len; i++) {
        vs.push(this.neighborPts(i, true));
      }
      return vs;
    }
    /**
     * Get the cached mesh. The mesh is an array of objects, each of which representing the enclosing triangles around a Pt in this Delaunay group.
     * @return an array of objects that store a series of DelaunayShapes
     */
    mesh() {
      return this._mesh;
    }
    /**
     * Given an index of a Pt in this Delaunay Group, returns its neighboring Pts in the network.
     * @param i index of a Pt
     * @param sort if true, sort the neighbors so that their edges will form a polygon
     * @returns an array of Pts
     */
    neighborPts(i, sort = false) {
      let cs = new Group();
      let n = this._mesh;
      for (let k in n[i]) {
        if (n[i].hasOwnProperty(k))
          cs.push(n[i][k].circle[0]);
      }
      return sort ? Geom.sortEdges(cs) : cs;
    }
    /**
     * Given an index of a Pt in this Delaunay Group, returns its neighboring DelaunayShapes.
     * @param i index of a Pt
     * @returns an array of DelaunayShapes `{i, j, k, triangle, circle}`
     */
    neighbors(i) {
      let cs = [];
      let n = this._mesh;
      for (let k in n[i]) {
        if (n[i].hasOwnProperty(k))
          cs.push(n[i][k]);
      }
      return cs;
    }
    /**
     * Record a DelaunayShape in the mesh.
     * @param o DelaunayShape instance
     */
    _cache(o) {
      this._mesh[o.i][`${Math.min(o.j, o.k)}-${Math.max(o.j, o.k)}`] = o;
      this._mesh[o.j][`${Math.min(o.i, o.k)}-${Math.max(o.i, o.k)}`] = o;
      this._mesh[o.k][`${Math.min(o.i, o.j)}-${Math.max(o.i, o.j)}`] = o;
    }
    /**
     * Get the initial "super triangle" that contains all the points in this set.
     * @returns a Group representing a triangle
     */
    _superTriangle() {
      let minPt = this[0];
      let maxPt = this[0];
      for (let i = 1, len = this.length; i < len; i++) {
        minPt = minPt.$min(this[i]);
        maxPt = maxPt.$max(this[i]);
      }
      let d = maxPt.$subtract(minPt);
      let mid = minPt.$add(maxPt).divide(2);
      let dmax = Math.max(d[0], d[1]);
      return new Group(mid.$subtract(20 * dmax, dmax), mid.$add(0, 20 * dmax), mid.$add(20 * dmax, -dmax));
    }
    /**
     * Get a triangle from 3 points in a list of points
     * @param i index 1
     * @param j index 2
     * @param k index 3
     * @param pts a Group of Pts
     */
    _triangle(i, j, k, pts = this) {
      return new Group(pts[i], pts[j], pts[k]);
    }
    /**
     * Get a circumcircle and triangle from 3 points in a list of points
     * @param i index 1
     * @param j index 2
     * @param k index 3
     * @param tri a Group representing a triangle, or `false` to create it from indices
     * @param pts a Group of Pts
     */
    _circum(i, j, k, tri, pts = this) {
      let t = tri || this._triangle(i, j, k, pts);
      return {
        i,
        j,
        k,
        triangle: t,
        circle: Triangle.circumcircle(t)
      };
    }
    /**
     * Dedupe the edges array
     * @param edges 
     */
    static _dedupe(edges) {
      let j = edges.length;
      while (j > 1) {
        let b = edges[--j];
        let a = edges[--j];
        let i = j;
        while (i > 1) {
          let n = edges[--i];
          let m = edges[--i];
          if (a == m && b == n || a == n && b == m) {
            edges.splice(j, 2);
            edges.splice(i, 2);
            break;
          }
        }
      }
      return edges;
    }
  };

  // src/Color.ts
  var Color_exports = {};
  __export(Color_exports, {
    Color: () => Color
  });
  var _Color = class _Color extends Pt {
    /**
     * Create a Color. Same as creating a Pt. Optionally you may use [`Color.from`](#link) to create a color.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    constructor(...args) {
      super(...args);
      this._mode = "rgb";
      this._isNorm = false;
    }
    /**
     * Create a Color object with 4 default dimensional values (1,1,1,1).
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    static from(...args) {
      const p = [1, 1, 1, 1];
      const c = Util.getArgs(args);
      for (let i = 0, len = p.length; i < len; i++) {
        if (i < c.length)
          p[i] = c[i];
      }
      return new _Color(p);
    }
    /**
     * Convert a rgb hex string like `"#FF0000"` or `"#F00"` to a Color object.
     * @param hex a hex string, with optional '#' prefix
     */
    static fromHex(hex) {
      if (hex[0] == "#")
        hex = hex.substr(1);
      if (hex.length <= 3) {
        const fn = (i) => hex[i] || "F";
        hex = `${fn(0)}${fn(0)}${fn(1)}${fn(1)}${fn(2)}${fn(2)}`;
      }
      let alpha = 1;
      if (hex.length === 8) {
        alpha = hex.substr(6) && 255 / 255;
        hex = hex.substring(0, 6);
      }
      const hexVal = parseInt(hex, 16);
      return new _Color(hexVal >> 16, hexVal >> 8 & 255, hexVal & 255, alpha);
    }
    /**
     * Create RGB Color. RGB color ranges are (0...255, 0...255, 0...255) respectively. You may use [`Color.normalize`](#link) to convert the ranges to 0...1.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static rgb(...args) {
      return _Color.from(...args).toMode("rgb");
    }
    /**
     * Create HSL Color. HSL color ranges are (0...360, 0...1, 0...1) respectively. You may use [`Color.normalize`](#link) to convert the ranges to 0...1.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static hsl(...args) {
      return _Color.from(...args).toMode("hsl");
    }
    /**
     * Create HSB Color. HSB color ranges are (0...360, 0...1, 0...1) respectively. You may use [`Color.normalize`](#link) to convert the ranges to 0...1.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static hsb(...args) {
      return _Color.from(...args).toMode("hsb");
    }
    /**
     * Create LAB Color. LAB color ranges are (0...100, -128...127, -128...127) respectively. You may use [`Color.normalize`](#link) to convert the ranges to 0...1.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static lab(...args) {
      return _Color.from(...args).toMode("lab");
    }
    /**
     * Create LCH Color. LCH color ranges are (0...100, 0...100, 0...360) respectively. You may use [`Color.normalize`](#link) to convert the ranges to 0...1.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static lch(...args) {
      return _Color.from(...args).toMode("lch");
    }
    /**
     * Create LUV Color. LUV color ranges are (0...100, -134...220, -140...122) respectively. You may use [`Color.normalize`](#link) to convert the ranges to 0...1.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static luv(...args) {
      return _Color.from(...args).toMode("luv");
    }
    /**
     * Create XYZ Color. XYZ color ranges are (0...100, 0...100, 0...100) respectively. You may use [`Color.normalize`](#link) to convert the ranges to 0...1.
     * @param args Pt-like parameters which can be a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties.
     */
    static xyz(...args) {
      return _Color.from(...args).toMode("xyz");
    }
    /**
     * Get a Color object whose values are the maximum of its mode.
     * @param mode a mode string such as "rgb" or "lab"
     * @example Color.maxValue("rgb") will return a rgb Color object with values (255,255,255)
     */
    static maxValues(mode) {
      return _Color.ranges[mode].zipSlice(1).$take([0, 1, 2]);
    }
    /**
     * Get a hex string such as "#FF0000". Same as `toString("hex")`.
     */
    get hex() {
      return this.toString("hex");
    }
    /**
     * Get a rgb string such as "rgb(255,0,0)". Same as `toString("rgb")`.
     */
    get rgb() {
      return this.toString("rgb");
    }
    /**
     * Get a rgba string such as "rgb(255,0,0,0.5)". Same as `toString("rgba")`.
     */
    get rgba() {
      return this.toString("rgba");
    }
    /**
     * Clone this Color.
     */
    clone() {
      const c = new _Color(this);
      c.toMode(this._mode);
      return c;
    }
    /**
     * Convert this color from current color space to another color space.
     * @param mode a ColorType string: "rgb" "hsl" "hsb" "lab" "lch" "luv" "xyz";
     * @param convert if `true`, convert this Color to the new color space specified in `mode`. Default is `false`, which only sets the color mode without converting color values.
     */
    toMode(mode, convert = false) {
      if (convert) {
        const fname = this._mode.toUpperCase() + "to" + mode.toUpperCase();
        if (_Color[fname]) {
          this.to(_Color[fname](this, this._isNorm, this._isNorm));
        } else {
          throw new Error("Cannot convert color with " + fname);
        }
      }
      this._mode = mode;
      return this;
    }
    /**
     * Get this Color's mode.
     */
    get mode() {
      return this._mode;
    }
    // rgb
    /**
     * the `r` value in RGB color mode. Same as `x`.
     */
    get r() {
      return this[0];
    }
    set r(n) {
      this[0] = n;
    }
    /**
     * the `g` value in RGB color mode. Same as `y`.
     */
    get g() {
      return this[1];
    }
    set g(n) {
      this[1] = n;
    }
    /**
     * the `b` value in RGB/LAB/HSB color mode. Same as `z`.
     */
    get b() {
      return this[2];
    }
    set b(n) {
      this[2] = n;
    }
    // hsl, hsb
    /**
     * the `h` value in HSL/HSB or LCH color mode. Same as either `x` or `z` depending on current color mode.
     */
    get h() {
      return this._mode == "lch" ? this[2] : this[0];
    }
    set h(n) {
      const i = this._mode == "lch" ? 2 : 0;
      this[i] = n;
    }
    /**
     * the `s` value in HSL/HSB color mode. Same as `y`.
     */
    get s() {
      return this[1];
    }
    set s(n) {
      this[1] = n;
    }
    /**
     * the `l` value in HSL or LCH/LAB color mode. Same as either `x` or `z` depending on current color mode.
     */
    get l() {
      return this._mode == "hsl" ? this[2] : this[0];
    }
    set l(n) {
      const i = this._mode == "hsl" ? 2 : 0;
      this[i] = n;
    }
    // lab, lch, luv
    /**
     * the `a` value in LAB color mode. Same as `y`.
     */
    get a() {
      return this[1];
    }
    set a(n) {
      this[1] = n;
    }
    /**
     * the `c` value in LCH color mode. Same as `y`.
     */
    get c() {
      return this[1];
    }
    set c(n) {
      this[1] = n;
    }
    /**
     * the `u` value in LUV color mode. Same as `y`.
     */
    get u() {
      return this[1];
    }
    set u(n) {
      this[1] = n;
    }
    /**
     * the `v` value in LUV color mode. Same as `z`.
     */
    get v() {
      return this[2];
    }
    set v(n) {
      this[2] = n;
    }
    /**
     * Get alpha value
     */
    set alpha(n) {
      if (this.length > 3)
        this[3] = n;
    }
    get alpha() {
      return this.length > 3 ? this[3] : 1;
    }
    /**
     * Check if color values are normalized (between 0 to 1). If conversion is needed, use [`Color.normalize`](#link) function.
     */
    get normalized() {
      return this._isNorm;
    }
    set normalized(b) {
      this._isNorm = b;
    }
    /**
     * Normalize the color values to between 0 to 1, or revert it back to the min/max values in current color mode.
     * @param toNorm a boolean value specifying whether to normalize (`true`) or revert (`false`)
     */
    normalize(toNorm = true) {
      if (this._isNorm == toNorm)
        return this;
      const ranges = _Color.ranges[this._mode];
      for (let i = 0; i < 3; i++) {
        this[i] = !toNorm ? Num.mapToRange(this[i], 0, 1, ranges[i][0], ranges[i][1]) : Num.mapToRange(this[i], ranges[i][0], ranges[i][1], 0, 1);
      }
      this._isNorm = toNorm;
      return this;
    }
    /**
     * Like `normalize()` but returns a new Color.
     * @param toNorm a boolean value specifying whether to normalize (`true`) or revert (`false`)
     * @returns new Color
     */
    $normalize(toNorm = true) {
      return this.clone().normalize(toNorm);
    }
    /**
     * Convert this Color to a string. It can be used to get a hex or rgb string for use in rendering.
     * @param format "hex", "rgb", "rgba", or "mode" which means using current color mode label. Default is "mode".
     */
    toString(format = "mode") {
      if (format == "hex") {
        const _hex = (n) => {
          const s = Math.floor(n).toString(16);
          return s.length < 2 ? "0" + s : s;
        };
        return `#${_hex(this[0])}${_hex(this[1])}${_hex(this[2])}`;
      } else if (format == "rgba") {
        return `rgba(${Math.floor(this[0])},${Math.floor(this[1])},${Math.floor(this[2])},${this.alpha})`;
      } else if (format == "rgb") {
        return `rgb(${Math.floor(this[0])},${Math.floor(this[1])},${Math.floor(this[2])})`;
      } else {
        return `${this._mode}(${this[0]},${this[1]},${this[2]},${this.alpha})`;
      }
    }
    /**
     * A static function to convert RGB to HSL.
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new HSL Color
     */
    static RGBtoHSL(rgb, normalizedInput = false, normalizedOutput = false) {
      const [r, g, b] = !normalizedInput ? rgb.$normalize() : rgb;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      let h = (max + min) / 2;
      let s = h;
      const l = h;
      if (max == min) {
        h = 0;
        s = 0;
      } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        h = 0;
        if (max === r) {
          h = (g - b) / d + (g < b ? 6 : 0);
        } else if (max === g) {
          h = (b - r) / d + 2;
        } else if (max === b) {
          h = (r - g) / d + 4;
        }
      }
      return _Color.hsl(normalizedOutput ? h / 60 : h * 60, s, l, rgb.alpha);
    }
    /**
     * A static function to convert HSL to RGB.
     * @param hsl a HSL Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static HSLtoRGB(hsl, normalizedInput = false, normalizedOutput = false) {
      let [h, s, l] = hsl;
      if (!normalizedInput)
        h = h / 360;
      if (s == 0)
        return _Color.rgb(l * 255, l * 255, l * 255, hsl.alpha);
      const q = l <= 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      const convert = (t) => {
        t = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
        if (t * 6 < 1) {
          return p + (q - p) * t * 6;
        } else if (t * 2 < 1) {
          return q;
        } else if (t * 3 < 2) {
          return p + (q - p) * (2 / 3 - t) * 6;
        } else {
          return p;
        }
      };
      const sc = normalizedOutput ? 1 : 255;
      return _Color.rgb(
        sc * convert(h + 1 / 3),
        sc * convert(h),
        sc * convert(h - 1 / 3),
        hsl.alpha
      );
    }
    /**
     * A static function to convert RGB to HSB.
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new HSB Color
     */
    static RGBtoHSB(rgb, normalizedInput = false, normalizedOutput = false) {
      const [r, g, b] = !normalizedInput ? rgb.$normalize() : rgb;
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      const d = max - min;
      let h = 0;
      const s = max === 0 ? 0 : d / max;
      const v = max;
      if (max != min) {
        if (max === r) {
          h = (g - b) / d + (g < b ? 6 : 0);
        } else if (max === g) {
          h = (b - r) / d + 2;
        } else if (max === b) {
          h = (r - g) / d + 4;
        }
      }
      return _Color.hsb(normalizedOutput ? h / 60 : h * 60, s, v, rgb.alpha);
    }
    /**
     * A static function to convert HSB to RGB.
     * @param hsb a HSB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static HSBtoRGB(hsb, normalizedInput = false, normalizedOutput = false) {
      let [h, s, v] = hsb;
      if (!normalizedInput)
        h = h / 360;
      const i = Math.floor(h * 6);
      const f = h * 6 - i;
      const p = v * (1 - s);
      const q = v * (1 - f * s);
      const t = v * (1 - (1 - f) * s);
      const pick = [
        [v, t, p],
        [q, v, p],
        [p, v, t],
        [p, q, v],
        [t, p, v],
        [v, p, q]
      ];
      const c = pick[i % 6];
      const sc = normalizedOutput ? 1 : 255;
      return _Color.rgb(
        sc * c[0],
        sc * c[1],
        sc * c[2],
        hsb.alpha
      );
    }
    /**
     * A static function to convert RGB to LAB.
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LAB Color
     */
    static RGBtoLAB(rgb, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? rgb.$normalize(false) : rgb;
      return _Color.XYZtoLAB(_Color.RGBtoXYZ(c), false, normalizedOutput);
    }
    /**
     * A static function to convert LAB to RGB.
     * @param lab a LAB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static LABtoRGB(lab, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? lab.$normalize(false) : lab;
      return _Color.XYZtoRGB(_Color.LABtoXYZ(c), false, normalizedOutput);
    }
    /**
     * A static function to convert RGB to LCH.
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LCH Color
     */
    static RGBtoLCH(rgb, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? rgb.$normalize(false) : rgb;
      return _Color.LABtoLCH(_Color.RGBtoLAB(c), false, normalizedOutput);
    }
    /**
     * A static function to convert LCH to RGB.
     * @param lch a LCH Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static LCHtoRGB(lch, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? lch.$normalize(false) : lch;
      return _Color.LABtoRGB(_Color.LCHtoLAB(c), false, normalizedOutput);
    }
    /**
     * A static function to convert RGB to LUV.
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LUV Color
     */
    static RGBtoLUV(rgb, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? rgb.$normalize(false) : rgb;
      return _Color.XYZtoLUV(_Color.RGBtoXYZ(c), false, normalizedOutput);
    }
    /**
     * A static function to convert LUV to RGB.
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static LUVtoRGB(luv, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? luv.$normalize(false) : luv;
      return _Color.XYZtoRGB(_Color.LUVtoXYZ(c), false, normalizedOutput);
    }
    /**
     * A static function to convert RGB to XYZ.
     * @param rgb a RGB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new XYZ Color
     */
    static RGBtoXYZ(rgb, normalizedInput = false, normalizedOutput = false) {
      const c = !normalizedInput ? rgb.$normalize() : rgb.clone();
      for (let i = 0; i < 3; i++) {
        c[i] = c[i] > 0.04045 ? Math.pow((c[i] + 0.055) / 1.055, 2.4) : c[i] / 12.92;
        if (!normalizedOutput)
          c[i] = c[i] * 100;
      }
      const cc = _Color.xyz(
        c[0] * 0.4124564 + c[1] * 0.3575761 + c[2] * 0.1804375,
        c[0] * 0.2126729 + c[1] * 0.7151522 + c[2] * 0.072175,
        c[0] * 0.0193339 + c[1] * 0.119192 + c[2] * 0.9503041,
        rgb.alpha
      );
      return normalizedOutput ? cc.normalize() : cc;
    }
    /**
     * A static function to convert XYZ to RGB.
     * @param xyz a XYZ Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new RGB Color
     */
    static XYZtoRGB(xyz, normalizedInput = false, normalizedOutput = false) {
      const [x, y, z] = !normalizedInput ? xyz.$normalize() : xyz;
      const rgb = [
        x * 3.2406254773200533 + y * -1.5372079722103187 + z * -0.4986285986982479,
        x * -0.9689307147293197 + y * 1.8757560608852415 + z * 0.041517523842953964,
        x * 0.055710120445510616 + y * -0.2040210505984867 + z * 1.0569959422543882
      ];
      for (let i = 0; i < 3; i++) {
        rgb[i] = rgb[i] > 31308e-7 ? 1.055 * Math.pow(rgb[i], 1 / 2.4) - 0.055 : 12.92 * rgb[i];
        rgb[i] = Math.max(0, Math.min(1, rgb[i]));
        if (!normalizedOutput)
          rgb[i] = Math.round(rgb[i] * 255);
      }
      const cc = _Color.rgb(rgb[0], rgb[1], rgb[2], xyz.alpha);
      return normalizedOutput ? cc.normalize() : cc;
    }
    /**
     * A static function to convert XYZ to LAB.
     * @param xyz a XYZ Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LAB Color
     */
    static XYZtoLAB(xyz, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? xyz.$normalize(false) : xyz.clone();
      const eps = 0.00885645167;
      const kap = 903.296296296;
      c.divide(_Color.D65);
      const fn = (n) => n > eps ? Math.pow(n, 1 / 3) : (kap * n + 16) / 116;
      const cy = fn(c[1]);
      const cc = _Color.lab(
        116 * cy - 16,
        500 * (fn(c[0]) - cy),
        200 * (cy - fn(c[2])),
        xyz.alpha
      );
      return normalizedOutput ? cc.normalize() : cc;
    }
    /**
     * A static function to convert LAB to XYZ.
     * @param lab a LAB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new XYZ Color
     */
    static LABtoXYZ(lab, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? lab.$normalize(false) : lab;
      const y = (c[0] + 16) / 116;
      const x = c[1] / 500 + y;
      const z = y - c[2] / 200;
      const eps = 0.00885645167;
      const kap = 903.296296296;
      const d = _Color.D65;
      const xxx = Math.pow(x, 3);
      const zzz = Math.pow(z, 3);
      const cc = _Color.xyz(
        d[0] * (xxx > eps ? xxx : (116 * x - 16) / kap),
        d[1] * (c[0] > kap * eps ? Math.pow((c[0] + 16) / 116, 3) : c[0] / kap),
        d[2] * (zzz > eps ? zzz : (116 * z - 16) / kap),
        lab.alpha
      );
      return normalizedOutput ? cc.normalize() : cc;
    }
    /**
     * A static function to convert XYZ to LUV.
     * @param xyz a XYZ Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LUV Color
     */
    static XYZtoLUV(xyz, normalizedInput = false, normalizedOutput = false) {
      let [x, y, z] = normalizedInput ? xyz.$normalize(false) : xyz;
      const u = 4 * x / (x + 15 * y + 3 * z);
      const v = 9 * y / (x + 15 * y + 3 * z);
      y = y / 100;
      y = y > 8856e-6 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
      const refU = 4 * _Color.D65[0] / (_Color.D65[0] + 15 * _Color.D65[1] + 3 * _Color.D65[2]);
      const refV = 9 * _Color.D65[1] / (_Color.D65[0] + 15 * _Color.D65[1] + 3 * _Color.D65[2]);
      const L = 116 * y - 16;
      return _Color.luv(
        L,
        13 * L * (u - refU),
        13 * L * (v - refV),
        xyz.alpha
      );
    }
    /**
     * A static function to convert LUV to XYZ.
     * @param luv a LUV Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new XYZ Color
     */
    static LUVtoXYZ(luv, normalizedInput = false, normalizedOutput = false) {
      let [l, u, v] = normalizedInput ? luv.$normalize(false) : luv;
      let y = (l + 16) / 116;
      const cubeY = y * y * y;
      y = cubeY > 8856e-6 ? cubeY : (y - 16 / 116) / 7.787;
      const refU = 4 * _Color.D65[0] / (_Color.D65[0] + 15 * _Color.D65[1] + 3 * _Color.D65[2]);
      const refV = 9 * _Color.D65[1] / (_Color.D65[0] + 15 * _Color.D65[1] + 3 * _Color.D65[2]);
      u = u / (13 * l) + refU;
      v = v / (13 * l) + refV;
      y = y * 100;
      const x = -1 * (9 * y * u) / ((u - 4) * v - u * v);
      const z = (9 * y - 15 * v * y - v * x) / (3 * v);
      return _Color.xyz(x, y, z, luv.alpha);
    }
    /**
     * A static function to convert LAB to LCH.
     * @param lab a LAB Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LCH Color
     */
    static LABtoLCH(lab, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? lab.$normalize(false) : lab;
      const h = Geom.toDegree(Geom.boundRadian(Math.atan2(c[2], c[1])));
      return _Color.lch(
        c[0],
        Math.sqrt(c[1] * c[1] + c[2] * c[2]),
        h,
        lab.alpha
      );
    }
    /**
     * A static function to convert LCH to LAB.
     * @param lch a LCH Color
     * @param normalizedInput a boolean specifying whether input color is normalized. Default is not normalized: `false`.
     * @param normalizedOutput a boolean specifying whether output color shoud be normalized. Default is not normalized: `false`.
     * @returns a new LAB Color
     */
    static LCHtoLAB(lch, normalizedInput = false, normalizedOutput = false) {
      const c = normalizedInput ? lch.$normalize(false) : lch;
      const rad = Geom.toRadian(c[2]);
      return _Color.lab(
        c[0],
        Math.cos(rad) * c[1],
        Math.sin(rad) * c[1],
        lch.alpha
      );
    }
  };
  // XYZ property for Standard Observer 2deg, Daylight/sRGB illuminant D65
  _Color.D65 = new Pt(95.047, 100, 108.883, 1);
  /**
   * Value range for each color space
   */
  _Color.ranges = {
    rgb: new Group(new Pt(0, 255), new Pt(0, 255), new Pt(0, 255)),
    hsl: new Group(new Pt(0, 360), new Pt(0, 1), new Pt(0, 1)),
    hsb: new Group(new Pt(0, 360), new Pt(0, 1), new Pt(0, 1)),
    lab: new Group(new Pt(0, 100), new Pt(-128, 127), new Pt(-128, 127)),
    lch: new Group(new Pt(0, 100), new Pt(0, 100), new Pt(0, 360)),
    luv: new Group(new Pt(0, 100), new Pt(-134, 220), new Pt(-140, 122)),
    xyz: new Group(new Pt(0, 100), new Pt(0, 100), new Pt(0, 100))
  };
  var Color = _Color;

  // src/Dom.ts
  var Dom_exports = {};
  __export(Dom_exports, {
    DOMSpace: () => DOMSpace,
    HTMLForm: () => HTMLForm,
    HTMLSpace: () => HTMLSpace
  });
  var DOMSpace = class _DOMSpace extends MultiTouchSpace {
    /**
    * Create a DOMSpace for HTML DOM elements
    * @param elem Specify an element by its "id" attribute as string, or by the element object itself. Use css to customize its appearance if needed.
    * @param callback an optional callback `function(boundingBox, spaceElement)` to be called when element is appended and ready. Alternatively, a "ready" event will also be fired from the element when it's appended, which can be traced with `spaceInstance.element.addEventListener("ready")`
    * @example `new DOMSpace( "#myElementID" )`
    */
    constructor(elem, callback) {
      super();
      this.id = "domspace";
      this._autoResize = true;
      this._bgcolor = "#e1e9f0";
      this._css = {};
      let _selector = null;
      let _existed = false;
      this.id = "pts";
      if (elem instanceof Element) {
        _selector = elem;
        this.id = "pts_existing_space";
      } else {
        _selector = document.querySelector(elem);
        _existed = true;
        this.id = elem.substr(1);
      }
      if (!_selector) {
        this._container = _DOMSpace.createElement("div", "pts_container");
        this._canvas = _DOMSpace.createElement("div", "pts_element");
        this._container.appendChild(this._canvas);
        document.body.appendChild(this._container);
        _existed = false;
      } else {
        this._canvas = _selector;
        this._container = _selector.parentElement;
      }
      setTimeout(this._ready.bind(this, callback), 50);
    }
    /**
    * Helper function to create a DOM element.
    * @param elem element tag name
    * @param id element id attribute
    * @param appendTo Optional, if specified, the created element will be appended to this element
    */
    static createElement(elem = "div", id, appendTo) {
      let d = document.createElement(elem);
      if (id)
        d.setAttribute("id", id);
      if (appendTo && appendTo.appendChild)
        appendTo.appendChild(d);
      return d;
    }
    /**
    * Handle callbacks after element is mounted in DOM.
    * @param callback 
    */
    _ready(callback) {
      if (!this._container)
        throw new Error(`Cannot initiate #${this.id} element`);
      this._isReady = true;
      this._resizeHandler(null);
      this.clear(this._bgcolor);
      this._canvas.dispatchEvent(new Event("ready"));
      for (let k in this.players) {
        if (this.players.hasOwnProperty(k)) {
          if (this.players[k].start)
            this.players[k].start(this.bound.clone(), this);
        }
      }
      this._pointer = this.center;
      this.refresh(false);
      if (callback)
        callback(this.bound, this._canvas);
    }
    /**
    * Set up various options for DOMSpace. This is usually set during instantiation, eg `new DOMSpace(...).setup( {opt} )`.
    * @param opt an object with these optional properties: **bgcolor** is a hex or rgba string to set initial background color of the canvas, or use `false` or "transparent" to set a transparent background; **resize** a boolean to set whether `<canvas>` size should auto resize to match its container's size, which can also be set using `autoSize()`.
    * @example `space.setup({ bgcolor: "#f00", resize: true })`
    */
    setup(opt) {
      if (opt.bgcolor) {
        this._bgcolor = opt.bgcolor;
      }
      this.autoResize = opt.resize != void 0 ? opt.resize : false;
      return this;
    }
    /**
     * Not implemented. See SVGSpace and HTMLSpace for implementation.
     */
    getForm() {
      return null;
    }
    /**
    * Set whether the canvas element should resize when its container is resized. 
    * @param auto a boolean value indicating if auto size is set
    */
    set autoResize(auto) {
      this._autoResize = auto;
      if (auto) {
        window.addEventListener("resize", this._resizeHandler.bind(this));
      } else {
        delete this._css["width"];
        delete this._css["height"];
        window.removeEventListener("resize", this._resizeHandler.bind(this));
      }
    }
    get autoResize() {
      return this._autoResize;
    }
    /**
    * This overrides Space's `resize` function. It's used as a callback function for window's resize event and not usually called directly. You can keep track of resize events with `resize: (bound, evt)` callback in your player objects (See [`Space.add`](#link) function). 
    * @param b a Bound object to resize to
    * @param evt Optionally pass a resize event
    */
    resize(b, evt) {
      this.bound = b;
      this.styles({ width: `${b.width}px`, height: `${b.height}px` }, true);
      for (let k in this.players) {
        if (this.players.hasOwnProperty(k)) {
          let p = this.players[k];
          if (p.resize)
            p.resize(this.bound, evt);
        }
      }
      return this;
    }
    /**
    * Window resize handling.
    * @param evt 
    */
    _resizeHandler(evt) {
      let b = Bound.fromBoundingRect(this._container.getBoundingClientRect());
      if (this._autoResize) {
        this.styles({ width: "100%", height: "100%" }, true);
      } else {
        this.styles({ width: `${b.width}px`, height: `${b.height}px` }, true);
      }
      this.resize(b, evt);
    }
    /**
    * Get this DOM element.
    */
    get element() {
      return this._canvas;
    }
    /**
    * Get the parent DOM element that contains this DOM element.
    */
    get parent() {
      return this._container;
    }
    /**
    * A property to indicate if the Space is ready.
    */
    get ready() {
      return this._isReady;
    }
    /**
    * Clear the element's contents, and optionally set a new background color. This overrides Space's `clear` function.
    * @param bg Optionally specify a custom background color in hex or rgba string, or "transparent". If not defined, it will use its `bgcolor` property as background color to clear the canvas.
    */
    clear(bg) {
      if (bg)
        this.background = bg;
      this._canvas.innerHTML = "";
      return this;
    }
    /**
    * Set a background color on the container element.
    @param bg background color as hex or rgba string
    */
    set background(bg) {
      this._bgcolor = bg;
      this._container.style.backgroundColor = this._bgcolor;
    }
    get background() {
      return this._bgcolor;
    }
    /**
    * Add or update a style definition, and optionally update that style in the Element.
    * @param key style name
    * @param val style value
    * @param update a boolean to update the element's style immediately if set to `true`. Default is `false`.
    */
    style(key, val, update = false) {
      this._css[key] = val;
      if (update)
        this._canvas.style[key] = val;
      return this;
    }
    /**
    * Add of update a list of style definitions, and optionally update those styles in the Element.
    * @param styles a key-value objects of style definitions 
    * @param update a boolean to update the element's style immediately if set to `true`. Default is `false`.
    * @return this
    */
    styles(styles, update = false) {
      for (let k in styles) {
        if (styles.hasOwnProperty(k))
          this.style(k, styles[k], update);
      }
      return this;
    }
    /**
    * A static helper function to add or update Element attributes.
    * @param elem Element to update
    * @param data an object with key-value pairs
    * @returns this DOM element 
    */
    static setAttr(elem, data) {
      for (let k in data) {
        if (data.hasOwnProperty(k)) {
          elem.setAttribute(k, data[k]);
        }
      }
      return elem;
    }
    /**
    * A static helper function to compose an inline style string from a object of styles.
    * @param elem Element to update
    * @param data an object with key-value pairs
    * @exmaple `DOMSpace.getInlineStyles( {width: "100px", "font-size": "10px"} )`
    */
    static getInlineStyles(data) {
      let str = "";
      for (let k in data) {
        if (data.hasOwnProperty(k)) {
          if (data[k])
            str += `${k}: ${data[k]}; `;
        }
      }
      return str;
    }
    /**
    * Dispose of browser resources held by this space and remove all players. Call this before unmounting the DOM.
    */
    dispose() {
      window.removeEventListener("resize", this._resizeHandler.bind(this));
      this.stop();
      this.removeAll();
      return this;
    }
  };
  var HTMLSpace = class extends DOMSpace {
    /**
    * Get a new `HTMLForm` which provides visualization functions in html elements. 
    * @see `HTMLForm`
    */
    getForm() {
      return new HTMLForm(this);
    }
    /**
     * A static function to add a DOM element inside a node. Usually you don't need to use this directly. See methods in [`HTMLForm`](#link) instead.
     * @param parent the parent element, or `null` to use current `<svg>` as parent.
     * @param name a string of element name,  such as `rect` or `circle`
     * @param id id attribute of the new element
     * @param autoClass add a class based on the id (from char 0 to index of "-"). Default is true.
     */
    static htmlElement(parent, name, id, autoClass = true) {
      if (!parent || !parent.appendChild)
        throw new Error("parent is not a valid DOM element");
      let elem = document.querySelector(`#${id}`);
      if (!elem) {
        elem = document.createElement(name);
        elem.setAttribute("id", id);
        if (autoClass)
          elem.setAttribute("class", id.substring(0, id.indexOf("-")));
        parent.appendChild(elem);
      }
      return elem;
    }
    /**
    * Remove an item from this space.
    * @param item a player item with an auto-assigned `animateID` property
    */
    remove(player) {
      let temp = this._container.querySelectorAll("." + HTMLForm.scopeID(player));
      temp.forEach((el) => {
        el.parentNode.removeChild(el);
      });
      return super.remove(player);
    }
    /**
     * Remove all items from this space.
     */
    removeAll() {
      this._container.innerHTML = "";
      return super.removeAll();
    }
  };
  var _HTMLForm = class _HTMLForm extends VisualForm {
    /**
     * Create a new `HTMLForm`. Alternatively, you can use [`HTMLSpace.getForm`](#link) function to get an instance of HTMLForm.
     * @param space the space to use
     */
    constructor(space) {
      super();
      /** 
      * store common styles so that they can be restored to canvas context when using multiple forms. See `reset()`.
      */
      this._style = {
        "filled": true,
        "stroked": true,
        "background": "#f03",
        "border-color": "#fff",
        "color": "#000",
        "border-width": "1px",
        "border-radius": "0",
        "border-style": "solid",
        "opacity": 1,
        "position": "absolute",
        "top": 0,
        "left": 0,
        "width": 0,
        "height": 0
      };
      this._ctx = {
        group: null,
        groupID: "pts",
        groupCount: 0,
        currentID: "pts0",
        currentClass: "",
        style: {}
      };
      this._ready = false;
      this._space = space;
      this._space.add({ start: () => {
        this._ctx.group = this._space.element;
        this._ctx.groupID = "pts_dom_" + _HTMLForm.groupID++;
        this._ctx.style = Object.assign({}, this._style);
        this._ready = true;
      } });
    }
    /**
     * Get the corresponding space for this form
     */
    get space() {
      return this._space;
    }
    /**
     * Usually not used directly. This updates a style in `_ctx` context or throw an Error if the style doesn't exist.
     * @param k style key
     * @param v  style value
     * @param unit Optional unit like 'px' to append to value
     */
    styleTo(k, v, unit = "") {
      if (this._ctx.style[k] === void 0)
        throw new Error(`${k} style property doesn't exist`);
      this._ctx.style[k] = `${v}${unit}`;
    }
    /**
     * Set current alpha value.
     * @example `form.alpha(0.6)`
     * @param a alpha value between 0 and 1
     */
    alpha(a) {
      this.styleTo("opacity", a);
      return this;
    }
    /**
    * Set current fill style. Provide a valid color string or `false` to specify no fill color.
    * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
    * @param c fill color
    */
    fill(c) {
      if (typeof c == "boolean") {
        this.styleTo("filled", c);
        if (!c)
          this.styleTo("background", "transparent");
      } else {
        this.styleTo("filled", true);
        this.styleTo("background", c);
      }
      return this;
    }
    /**
    * Set current stroke style. Provide a valid color string or `false` to specify no stroke color.
    * @example `form.stroke("#F90")`, `form.stroke("rgba(0,0,0,.5")`, `form.stroke(false)`, `form.stroke("#000", 0.5, 'round', 'square')`
    * @param c stroke color which can be as color, gradient, or pattern. (See [canvas documentation](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle))
    * @param width Optional value (can be floating point) to set line width
    * @param linejoin not implemented in HTMLForm
    * @param linecap not implemented in HTMLForm
    */
    stroke(c, width, linejoin, linecap) {
      if (typeof c == "boolean") {
        this.styleTo("stroked", c);
        if (!c)
          this.styleTo("border-width", 0);
      } else {
        this.styleTo("stroked", true);
        this.styleTo("border-color", c);
        this.styleTo("border-width", (width || 1) + "px");
      }
      return this;
    }
    /**
    * Set current text color style. Provide a valid color string.
    * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
    * @param c fill color
    */
    fillText(c) {
      this.styleTo("color", c);
      return this;
    }
    /**
     * Add custom class to the created element.
     * @param c custom class name or `false` to reset it
     * @example `form.fill("#f00").cls("myClass").rects(r)` `form.cls(false).circles(c)`
     */
    cls(c) {
      if (typeof c == "boolean") {
        this._ctx.currentClass = "";
      } else {
        this._ctx.currentClass = c;
      }
      return this;
    }
    /**
    * Set the current font.
    * @param sizeOrFont either a number to specify font-size, or a `Font` object to specify all font properties
    * @param weight Optional font-weight string such as "bold"
    * @param style Optional font-style string such as "italic"
    * @param lineHeight Optional line-height number suchas 1.5
    * @param family Optional font-family such as "Helvetica, sans-serif"
    * @example `form.font( myFont )`, `form.font(14, "bold")`
    */
    font(sizeOrFont, weight, style, lineHeight, family) {
      if (typeof sizeOrFont == "number") {
        this._font.size = sizeOrFont;
        if (family)
          this._font.face = family;
        if (weight)
          this._font.weight = weight;
        if (style)
          this._font.style = style;
        if (lineHeight)
          this._font.lineHeight = lineHeight;
      } else {
        this._font = sizeOrFont;
      }
      this._ctx.style["font"] = this._font.value;
      return this;
    }
    /**
    * Reset the context's common styles to this form's styles. This supports using multiple forms on the same canvas context.
    */
    reset() {
      this._ctx.style = Object.assign({}, this._style);
      this._font = new Font(10, "sans-serif");
      this._ctx.style["font"] = this._font.value;
      return this;
    }
    /**
     * Set this form's group scope by an ID, and optionally define the group's parent element. A group scope keeps track of elements by their generated IDs, and updates their properties as needed. See also `scope()`.
     * @param group_id a string to use as prefix for the group's id. For example, group_id "hello" will create elements with id like "hello-1", "hello-2", etc
     * @param group Optional DOM element to define this group's parent element
     * @returns this form's context
     */
    updateScope(group_id, group) {
      this._ctx.group = group;
      this._ctx.groupID = group_id;
      this._ctx.groupCount = 0;
      this.nextID();
      return this._ctx;
    }
    /**
     * Set the current group scope to an item added into space, in order to keep track of any point, circle, etc created within it. The item must have an `animateID` property, so that elements created within the item will have generated IDs like "item-{animateID}-{count}".
     * @param item a "player" item that's added to space (see `space.add(...)`) and has an `animateID` property
     * @returns this form's context
     */
    scope(item) {
      if (!item || item.animateID == null)
        throw new Error("item not defined or not yet added to Space");
      return this.updateScope(_HTMLForm.scopeID(item), this.space.element);
    }
    /**
     * Get next available id in the current group.
     * @returns an id string
     */
    nextID() {
      this._ctx.groupCount++;
      this._ctx.currentID = `${this._ctx.groupID}-${this._ctx.groupCount}`;
      return this._ctx.currentID;
    }
    /**
     * A static function to generate an ID string based on a context object.
     * @param ctx a context object for an HTMLForm
     */
    static getID(ctx) {
      return ctx.currentID || `p-${_HTMLForm.domID++}`;
    }
    /**
     * A static function to generate an ID string for a scope, based on a "player" item in the Space.
     * @param item a "player" item that's added to space (see `space.add(...)`) and has an `animateID` property
     */
    static scopeID(item) {
      return `item-${item.animateID}`;
    }
    /**
     * A static function to help adding style object to an element. This put all styles into `style` attribute instead of individual attributes, so that the styles can be parsed by Adobe Illustrator.
     * @param elem A DOM element to add to
     * @param styles an object of style properties
     * @example `HTMLForm.style(elem, {fill: "#f90", stroke: false})`
     * @returns DOM element 
     */
    static style(elem, styles) {
      let st = [];
      if (!styles["filled"])
        st.push("background: none");
      if (!styles["stroked"])
        st.push("border: none");
      for (let k in styles) {
        if (styles.hasOwnProperty(k) && k != "filled" && k != "stroked") {
          let v = styles[k];
          if (v) {
            if (!styles["filled"] && k.indexOf("background") === 0) {
              continue;
            } else if (!styles["stroked"] && k.indexOf("border-width") === 0) {
              continue;
            } else {
              st.push(`${k}: ${v}`);
            }
          }
        }
      }
      return HTMLSpace.setAttr(elem, { style: st.join(";") });
    }
    /**
     * A helper function to set top, left, width, height of DOM element.
     * @param x left position
     * @param y top position
     * @param w width
     * @param h height
     */
    static rectStyle(ctx, pt, size) {
      ctx.style["left"] = pt[0] + "px";
      ctx.style["top"] = pt[1] + "px";
      ctx.style["width"] = size[0] + "px";
      ctx.style["height"] = size[1] + "px";
      return ctx;
    }
    /**
     * A helper function to set the top and left position styling of text DOM context.
     * @param ctx context to add style to
     * @param pt a Pt object or numeric array determining the top-left position of the text
     */
    static textStyle(ctx, pt) {
      ctx.style["left"] = pt[0] + "px";
      ctx.style["top"] = pt[1] + "px";
      return ctx;
    }
    /**
    * A static function to draws a point.
    * @param ctx a context object of HTMLForm
    * @param pt a Pt object or numeric array
    * @param radius radius of the point. Default is 5.
    * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
    * @example `HTMLForm.point( p )`, `HTMLForm.point( p, 10, "circle" )`
    */
    static point(ctx, pt, radius = 5, shape = "square") {
      if (shape === "circle") {
        return _HTMLForm.circle(ctx, pt, radius);
      } else {
        return _HTMLForm.square(ctx, pt, radius);
      }
    }
    /**
    * Draws a point.
    * @param p a Pt object
    * @param radius radius of the point. Default is 5.
    * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
    * @example `form.point( p )`, `form.point( p, 10, "circle" )`
    */
    point(pt, radius = 5, shape = "square") {
      this.nextID();
      if (shape == "circle")
        this.styleTo("border-radius", "100%");
      _HTMLForm.point(this._ctx, pt, radius, shape);
      return this;
    }
    /**
    * A static function to draw a circle.
    * @param ctx a context object of HTMLForm
    * @param pt center position of the circle
    * @param radius radius of the circle
    */
    static circle(ctx, pt, radius = 10) {
      let elem = HTMLSpace.htmlElement(ctx.group, "div", _HTMLForm.getID(ctx));
      HTMLSpace.setAttr(elem, { class: `pts-form pts-circle ${ctx.currentClass}` });
      _HTMLForm.rectStyle(ctx, new Pt(pt).$subtract(radius), new Pt(radius * 2, radius * 2));
      _HTMLForm.style(elem, ctx.style);
      return elem;
    }
    /**
    * Draw a circle.
    * @param pts usually a Group of 2 Pts, but it can also take an array of two numeric arrays [ [position], [size] ]
    * @see [`Circle.fromCenter`](./?p=Op_Circle#function_fromCenter)
    */
    circle(pts) {
      this.nextID();
      this.styleTo("border-radius", "100%");
      _HTMLForm.circle(this._ctx, pts[0], pts[1][0]);
      return this;
    }
    /**
    * A static function to draw a square.
    * @param ctx a context object of HTMLForm
    * @param pt center position of the square
    * @param halfsize half size of the square
    */
    static square(ctx, pt, halfsize) {
      let elem = HTMLSpace.htmlElement(ctx.group, "div", _HTMLForm.getID(ctx));
      HTMLSpace.setAttr(elem, { class: `pts-form pts-square ${ctx.currentClass}` });
      _HTMLForm.rectStyle(ctx, new Pt(pt).$subtract(halfsize), new Pt(halfsize * 2, halfsize * 2));
      _HTMLForm.style(elem, ctx.style);
      return elem;
    }
    /**
     * Draw a square, given a center and its half-size.
     * @param pt center Pt
     * @param halfsize half-size
     */
    square(pt, halfsize) {
      this.nextID();
      _HTMLForm.square(this._ctx, pt, halfsize);
      return this;
    }
    /**
    * A static function to draw a rectangle.
    * @param ctx a context object of HTMLForm
    * @param pts a Group or an Iterable<PtLike> with 2 Pt specifying the top-left and bottom-right positions.
    */
    static rect(ctx, pts) {
      let p = Util.iterToArray(pts);
      if (!Util.arrayCheck(p))
        return;
      let elem = HTMLSpace.htmlElement(ctx.group, "div", _HTMLForm.getID(ctx));
      HTMLSpace.setAttr(elem, { class: `pts-form pts-rect ${ctx.currentClass}` });
      _HTMLForm.rectStyle(ctx, p[0], p[1]);
      _HTMLForm.style(elem, ctx.style);
      return elem;
    }
    /**
    * Draw a rectangle.
    * @param pts a Group or an Iterable<PtLike> with 2 Pt specifying the top-left and bottom-right positions.
    */
    rect(pts) {
      this.nextID();
      this.styleTo("border-radius", "0");
      _HTMLForm.rect(this._ctx, pts);
      return this;
    }
    /**
    * A static function to draw text.
    * @param ctx a context object of HTMLForm
    * @param `pt` a Point object to specify the anchor point
    * @param `txt` a string of text to draw
    * @param `maxWidth` specify a maximum width per line
    */
    static text(ctx, pt, txt) {
      let elem = HTMLSpace.htmlElement(ctx.group, "div", _HTMLForm.getID(ctx));
      HTMLSpace.setAttr(elem, { class: `pts-form pts-text ${ctx.currentClass}` });
      elem.textContent = txt;
      _HTMLForm.textStyle(ctx, pt);
      _HTMLForm.style(elem, ctx.style);
      return elem;
    }
    /**
    * Draw text on canvas.
    * @param `pt` a Pt or numeric array to specify the anchor point
    * @param `txt` text
    * @param `maxWidth` specify a maximum width per line
    */
    text(pt, txt) {
      this.nextID();
      _HTMLForm.text(this._ctx, pt, txt);
      return this;
    }
    /**
    * A convenient way to draw some text on canvas for logging or debugging. It'll be draw on the top-left of the canvas as an overlay.
    * @param txt text
    */
    log(txt) {
      this.fill("#000").stroke("#fff", 0.5).text([10, 14], txt);
      return this;
    }
    /**
     * Arc is not implemented in HTMLForm.
     */
    arc(pt, radius, startAngle, endAngle, cc) {
      Util.warn("arc is not implemented in HTMLForm");
      return this;
    }
    /**
     * Line is not implemented in HTMLForm.
     */
    line(pts) {
      Util.warn("line is not implemented in HTMLForm");
      return this;
    }
    /**
     * Polygon is not implemented in HTMLForm.
     * @param pts 
     */
    polygon(pts) {
      Util.warn("polygon is not implemented in HTMLForm");
      return this;
    }
  };
  _HTMLForm.groupID = 0;
  _HTMLForm.domID = 0;
  var HTMLForm = _HTMLForm;

  // src/Svg.ts
  var Svg_exports = {};
  __export(Svg_exports, {
    SVGForm: () => SVGForm,
    SVGSpace: () => SVGSpace
  });
  var SVGSpace = class _SVGSpace extends DOMSpace {
    /**
    * Create a SVGSpace which represents a Space for SVG elements.
    * @param elem Specify an element by its "id" attribute as string, or by the element object itself. An element can be an existing `<svg>`, or a `<div>` container in which a new `<svg>` will be created. If left empty, a `<div id="pt_container"><svg id="pt" /></div>` will be added to DOM. Use css to customize its appearance if needed.
    * @param callback an optional callback `function(boundingBox, spaceElement)` to be called when canvas is appended and ready. Alternatively, a "ready" event will also be fired from the `<svg>` element when it's appended, which can be traced with `spaceInstance.canvas.addEventListener("ready")`
    * @example `new SVGSpace( "#myElementID" )`
    */
    constructor(elem, callback) {
      super(elem, callback);
      this._bgcolor = "#999";
      if (this._canvas.nodeName.toLowerCase() != "svg") {
        let s = _SVGSpace.svgElement(this._canvas, "svg", `${this.id}_svg`);
        this._container = this._canvas;
        this._canvas = s;
      }
    }
    /**
    * Get a new [`SVGForm`](#link) for drawing.
    * @see `SVGForm`
    */
    getForm() {
      return new SVGForm(this);
    }
    /**
    * Get the DOM element.
    */
    get element() {
      return this._canvas;
    }
    /**
    * This overrides Space's `resize` function. It's used as a callback function for window's resize event and not usually called directly. 
    * You can keep track of resize events with `resize: (bound ,evt)` callback in your [`IPlayer`](#link) objects (See [`Space.add`](#link)). 
    * @param b a Bound object to resize to
    * @param evt Optionally pass a resize event
    */
    resize(b, evt) {
      super.resize(b, evt);
      _SVGSpace.setAttr(this.element, {
        "viewBox": `0 0 ${this.bound.width} ${this.bound.height}`,
        "width": `${this.bound.width}`,
        "height": `${this.bound.height}`,
        "xmlns": "http://www.w3.org/2000/svg",
        "version": "1.1"
      });
      return this;
    }
    /**
     * A static function to add a svg element inside a node. Usually you don't need to call this directly. See methods in [`SVGForm`](#link) instead.
     * @param parent the parent element, or `null` to use current `<svg>` as parent.
     * @param name a string of element name,  such as `rect` or `circle`
     * @param id id attribute of the new element
     */
    static svgElement(parent, name, id) {
      if (!parent || !parent.appendChild)
        throw new Error("parent is not a valid DOM element");
      let elem = document.querySelector(`#${id}`);
      if (!elem) {
        elem = document.createElementNS("http://www.w3.org/2000/svg", name);
        elem.setAttribute("id", id);
        parent.appendChild(elem);
      }
      return elem;
    }
    /**
    * Remove an item from this Space.
    * @param item a player item with an auto-assigned `animateID` property
    */
    remove(player) {
      let temp = this._container.querySelectorAll("." + SVGForm.scopeID(player));
      temp.forEach((el) => {
        el.parentNode.removeChild(el);
      });
      return super.remove(player);
    }
    /**
     * Remove all items from this Space.
     */
    removeAll() {
      this._container.innerHTML = "";
      return super.removeAll();
    }
  };
  var _SVGForm = class _SVGForm extends VisualForm {
    /**
    * Create a new SVGForm. You may also use [`SVGSpace.getForm`](#link) to get a default form directly.
    * @param space an instance of SVGSpace
    */
    constructor(space) {
      super();
      this._style = {
        "filled": true,
        "stroked": true,
        "fill": "#f03",
        "stroke": "#fff",
        "stroke-width": 1,
        "stroke-linejoin": "bevel",
        "stroke-linecap": "sqaure",
        "opacity": 1
      };
      this._ctx = {
        group: null,
        groupID: "pts",
        groupCount: 0,
        currentID: "pts0",
        currentClass: "",
        style: {}
      };
      this._ready = false;
      this._space = space;
      this._space.add({ start: () => {
        this._ctx.group = this._space.element;
        this._ctx.groupID = "pts_svg_" + _SVGForm.groupID++;
        this._ctx.style = Object.assign({}, this._style);
        this._ready = true;
      } });
    }
    /**
    * Get the [`SVGSpace`](#link) instance that this form is associated with.
    */
    get space() {
      return this._space;
    }
    /**
     * Update a style in current context. It will throw an Erorr if the style doesn't exist.
     * @param k style key
     * @param v  style value
     */
    styleTo(k, v) {
      if (this._ctx.style[k] === void 0)
        throw new Error(`${k} style property doesn't exist`);
      this._ctx.style[k] = v;
    }
    /**
     * Set current alpha value.
     * @example `form.alpha(0.6)`
     * @param a alpha value between 0 and 1
     */
    alpha(a) {
      this.styleTo("opacity", a);
      return this;
    }
    /**
      * Set current fill style. Provide a valid color string or `false` to specify no fill color.
      * @example `form.fill("#F90")`, `form.fill("rgba(0,0,0,.5")`, `form.fill(false)`
      * @param c a valid color string or `false` to specify no fill color.
      */
    fill(c) {
      if (typeof c == "boolean") {
        this.styleTo("filled", c);
      } else {
        this.styleTo("filled", true);
        this.styleTo("fill", c);
      }
      return this;
    }
    /**
      * Set current stroke style. Provide a valid color string or `false` to specify no stroke color.
      * @example `form.stroke("#F90")`, `form.stroke("rgba(0,0,0,.5")`, `form.stroke(false)`, `form.stroke("#000", 0.5, 'round', 'square')`
      * @param c a valid color string or `false` to specify no stroke color.
      * @param width Optional value (can be floating point) to set line width
      * @param linejoin Optional string to set line joint style. Can be "miter", "bevel", or "round".
      * @param linecap Optional string to set line cap style. Can be "butt", "round", or "square".
      */
    stroke(c, width, linejoin, linecap) {
      if (typeof c == "boolean") {
        this.styleTo("stroked", c);
      } else {
        this.styleTo("stroked", true);
        this.styleTo("stroke", c);
        if (width)
          this.styleTo("stroke-width", width);
        if (linejoin)
          this.styleTo("stroke-linejoin", linejoin);
        if (linecap)
          this.styleTo("stroke-linecap", linecap);
      }
      return this;
    }
    /**
     * Add custom class to the created element.
     * @param c custom class name or `false` to reset it
     * @example `form.fill("#f00").cls("myClass").rects(r)` `form.cls(false).circles(c)`
     */
    cls(c) {
      if (typeof c == "boolean") {
        this._ctx.currentClass = "";
      } else {
        this._ctx.currentClass = c;
      }
      return this;
    }
    /**
    * Set the current font.
    * @param sizeOrFont either a number to specify font-size, or a `Font` object to specify all font properties
    * @param weight Optional font-weight string such as "bold"
    * @param style Optional font-style string such as "italic"
    * @param lineHeight Optional line-height number suchas 1.5
    * @param family Optional font-family such as "Helvetica, sans-serif"
    * @example `form.font( myFont )`, `form.font(14, "bold")`
    */
    font(sizeOrFont, weight, style, lineHeight, family) {
      if (typeof sizeOrFont == "number") {
        this._font.size = sizeOrFont;
        if (family)
          this._font.face = family;
        if (weight)
          this._font.weight = weight;
        if (style)
          this._font.style = style;
        if (lineHeight)
          this._font.lineHeight = lineHeight;
      } else {
        this._font = sizeOrFont;
      }
      this._ctx.style["font"] = this._font.value;
      return this;
    }
    /**
    * Reset the context's common styles to this form's styles. This supports using multiple forms in the same space.
    */
    reset() {
      this._ctx.style = Object.assign({}, this._style);
      this._font = new Font(10, "sans-serif");
      this._ctx.style["font"] = this._font.value;
      return this;
    }
    /**
     * Set this form's group scope by an ID, and optionally define the group's parent element. A group scope keeps track of elements by their generated IDs, and updates their properties as needed. See also [`SVGForm.scope`](#link).
     * @param group_id a string to use as prefix for the group's id. For example, group_id "hello" will create elements with id like "hello-1", "hello-2", etc
     * @param group Optional DOM or SVG element to define this group's parent element
     * @returns this form's context
     */
    updateScope(group_id, group) {
      this._ctx.group = group;
      this._ctx.groupID = group_id;
      this._ctx.groupCount = 0;
      this.nextID();
      return this._ctx;
    }
    /**
     * Set the current group scope to an item added into space, in order to keep track of any point, circle, etc created within it in the DOM. 
     * The item must have an `animateID` property, so that elements created within the item will have generated IDs like "item-{animateID}-{count}". 
     * See the svg section in [`Space guide`](../guide/Space-0500.html) to learn more about scope.
     * @param item a [`IPlayer`](#link) object that's added to space (see [`Space.add`](#link)) and has an `animateID` property
     * @returns this form's context
     */
    scope(item) {
      if (!item || item.animateID == null)
        throw new Error("item not defined or not yet added to Space");
      return this.updateScope(_SVGForm.scopeID(item), this.space.element);
    }
    /**
     * Get next available id in the current group.
     * @returns an id string
     */
    nextID() {
      this._ctx.groupCount++;
      this._ctx.currentID = `${this._ctx.groupID}-${this._ctx.groupCount}`;
      return this._ctx.currentID;
    }
    /**
     * A static function to generate an ID string based on a context object.
     * @param ctx a context object for an SVGForm
     */
    static getID(ctx) {
      return ctx.currentID || `p-${_SVGForm.domID++}`;
    }
    /**
     * A static function to generate an ID string for a scope, based on an [`IPlayer`](#link) object in the Space.
     * @param item a [`IPlayer`](#link) object that's added to space (see [`Space.add`](#link)) and has an `animateID` property
     */
    static scopeID(item) {
      return `item-${item.animateID}`;
    }
    /**
     * A static function to help adding style object to an element. 
     * Note that this put all styles into `style` attribute instead of individual svg attributes, so that the styles can be parsed by Adobe Illustrator.
     * @param elem A DOM element to add to
     * @param styles an object of style properties
     * @example `SVGForm.style(elem, {fill: "#f90", stroke: false})`
     * @returns this DOM element 
     */
    static style(elem, styles) {
      let st = [];
      if (!styles["filled"])
        st.push("fill: none");
      if (!styles["stroked"])
        st.push("stroke: none");
      for (let k in styles) {
        if (styles.hasOwnProperty(k) && k != "filled" && k != "stroked") {
          let v = styles[k];
          if (v) {
            if (!styles["filled"] && k.indexOf("fill") === 0) {
              continue;
            } else if (!styles["stroked"] && k.indexOf("stroke") === 0) {
              continue;
            } else {
              st.push(`${k}: ${v}`);
            }
          }
        }
      }
      return DOMSpace.setAttr(elem, { style: st.join(";") });
    }
    /**
      * A static function to draw a point.
      * @param ctx a context object of SVGForm
      * @param pt a Pt object or numeric array
      * @param radius radius of the point. Default is 5.
      * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
      * @example `SVGForm.point( p )`, `SVGForm.point( p, 10, "circle" )`
      */
    static point(ctx, pt, radius = 5, shape = "square") {
      if (shape === "circle") {
        return _SVGForm.circle(ctx, pt, radius);
      } else {
        return _SVGForm.square(ctx, pt, radius);
      }
    }
    /**
      * Draws a point.
      * @param p a Pt object
      * @param radius radius of the point. Default is 5.
      * @param shape The shape of the point. Defaults to "square", but it can be "circle" or a custom shape function in your own implementation.
      * @example `form.point( p )`, `form.point( p, 10, "circle" )`
      */
    point(pt, radius = 5, shape = "square") {
      this.nextID();
      _SVGForm.point(this._ctx, pt, radius, shape);
      return this;
    }
    /**
      * A static function to draw a circle.
      * @param ctx a context object of SVGForm
      * @param pt center position of the circle
      * @param radius radius of the circle
      */
    static circle(ctx, pt, radius = 10) {
      let elem = SVGSpace.svgElement(ctx.group, "circle", _SVGForm.getID(ctx));
      DOMSpace.setAttr(elem, {
        cx: pt[0],
        cy: pt[1],
        r: radius,
        "class": `pts-svgform pts-circle ${ctx.currentClass}`
      });
      _SVGForm.style(elem, ctx.style);
      return elem;
    }
    /**
      * Draw a circle.
      * @param pts a Group or an Iterable<PtLike> representing a circle with `[[position], [size]]`
      * @see [`Circle.fromCenter`](./?p=Op_Circle#function_fromCenter)
      */
    circle(pts) {
      this.nextID();
      let p = Util.iterToArray(pts);
      _SVGForm.circle(this._ctx, p[0], p[1][0]);
      return this;
    }
    /**
      * A static function to draw an arc.
      * @param ctx a context object of SVGForm
      * @param pt center position 
      * @param radius radius of the arc circle
      * @param startAngle start angle of the arc
      * @param endAngle end angle of the arc
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    static arc(ctx, pt, radius, startAngle, endAngle, cc) {
      let elem = SVGSpace.svgElement(ctx.group, "path", _SVGForm.getID(ctx));
      const start = new Pt(pt).toAngle(startAngle, radius, true);
      const end = new Pt(pt).toAngle(endAngle, radius, true);
      const diff = Geom.boundAngle(endAngle) - Geom.boundAngle(startAngle);
      let largeArc = diff > Const.pi ? true : false;
      if (cc)
        largeArc = !largeArc;
      const sweep = cc ? "0" : "1";
      const d = `M ${start[0]} ${start[1]} A ${radius} ${radius} 0 ${largeArc ? "1" : "0"} ${sweep} ${end[0]} ${end[1]}`;
      DOMSpace.setAttr(elem, {
        d,
        "class": `pts-svgform pts-arc ${ctx.currentClass}`
      });
      _SVGForm.style(elem, ctx.style);
      return elem;
    }
    /**
      * Draw an arc.
      * @param pt center position
      * @param radius radius of the arc circle
      * @param startAngle start angle of the arc
      * @param endAngle end angle of the arc
      * @param cc an optional boolean value to specify if it should be drawn clockwise (`false`) or counter-clockwise (`true`). Default is clockwise.
      */
    arc(pt, radius, startAngle, endAngle, cc) {
      this.nextID();
      _SVGForm.arc(this._ctx, pt, radius, startAngle, endAngle, cc);
      return this;
    }
    /**
      * A static function to draw a square.
      * @param ctx a context object of SVGForm
      * @param pt center position of the square
      * @param halfsize half size of the square
      */
    static square(ctx, pt, halfsize) {
      let elem = SVGSpace.svgElement(ctx.group, "rect", _SVGForm.getID(ctx));
      DOMSpace.setAttr(elem, {
        x: pt[0] - halfsize,
        y: pt[1] - halfsize,
        width: halfsize * 2,
        height: halfsize * 2,
        "class": `pts-svgform pts-square ${ctx.currentClass}`
      });
      _SVGForm.style(elem, ctx.style);
      return elem;
    }
    /**
     * Draw a square, given a center and its half-size.
     * @param pt center Pt
     * @param halfsize half-size
     */
    square(pt, halfsize) {
      this.nextID();
      _SVGForm.square(this._ctx, pt, halfsize);
      return this;
    }
    /**
    * A static function to draw a line or polyline.
    * @param ctx a context object of SVGForm
    * @param pts a Group or an Iterable<PtLike>
    */
    static line(ctx, pts) {
      let points = _SVGForm.pointsString(pts);
      if (points.count < 2)
        return;
      if (points.count > 2)
        return _SVGForm._poly(ctx, points.string, false);
      let elem = SVGSpace.svgElement(ctx.group, "line", _SVGForm.getID(ctx));
      let p = Util.iterToArray(pts);
      DOMSpace.setAttr(elem, {
        x1: p[0][0],
        y1: p[0][1],
        x2: p[1][0],
        y2: p[1][1],
        "class": `pts-svgform pts-line ${ctx.currentClass}`
      });
      _SVGForm.style(elem, ctx.style);
      return elem;
    }
    /**
    * Draw a line or polyline.
    * @param pts a Group or an Iterable<PtLike> 
    */
    line(pts) {
      this.nextID();
      _SVGForm.line(this._ctx, pts);
      return this;
    }
    /**
     * A static helper function to draw polyline or polygon.
     * @param ctx a context object of SVGForm
     * @param points a string of points' positions. See `SVGForm.pointsString` for conversion.
     * @param closePath a boolean to specify if the polygon path should be closed
     */
    static _poly(ctx, points, closePath = true) {
      let elem = SVGSpace.svgElement(ctx.group, closePath ? "polygon" : "polyline", _SVGForm.getID(ctx));
      DOMSpace.setAttr(elem, {
        points,
        "class": `pts-svgform pts-polygon ${ctx.currentClass}`
      });
      _SVGForm.style(elem, ctx.style);
      return elem;
    }
    /**
     * Given a list of points, return a space-separated string
     * @param pts a Group or an Iterable<PtLike> 
     * @returns an object of {string, count}
     */
    static pointsString(pts) {
      let points = "";
      let count = 0;
      for (let p of pts) {
        points += `${p[0]},${p[1]} `;
        count++;
      }
      return { string: points, count };
    }
    /**
      * A static function to draw polygon.
      * @param ctx a context object of SVGForm
      * @param pts a Group or an Iterable<PtLike> representing a polygon
      */
    static polygon(ctx, pts) {
      let points = _SVGForm.pointsString(pts);
      return _SVGForm._poly(ctx, points.string, true);
    }
    /**
    * Draw a polygon.
    * @param pts a Group or an Iterable<PtLike> representing a polygon
    */
    polygon(pts) {
      this.nextID();
      _SVGForm.polygon(this._ctx, pts);
      return this;
    }
    /**
    * A static function to draw a rectangle.
    * @param ctx a context object of SVGForm
    * @param pts a Group or an Iterable<PtLike> with 2 Pt specifying the top-left and bottom-right positions. 
    */
    static rect(ctx, pts) {
      if (!Util.arrayCheck(pts))
        return;
      let elem = SVGSpace.svgElement(ctx.group, "rect", _SVGForm.getID(ctx));
      let bound = Group.fromArray(pts).boundingBox();
      let size = Rectangle.size(bound);
      DOMSpace.setAttr(elem, {
        x: bound[0][0],
        y: bound[0][1],
        width: size[0],
        height: size[1],
        "class": `pts-svgform pts-rect ${ctx.currentClass}`
      });
      _SVGForm.style(elem, ctx.style);
      return elem;
    }
    /**
      * Draw a rectangle.
      * @param pts a Group or an Iterable<PtLike> with 2 Pt specifying the top-left and bottom-right positions. 
      */
    rect(pts) {
      this.nextID();
      _SVGForm.rect(this._ctx, pts);
      return this;
    }
    /**
      * A static function to draw text.
      * @param ctx a context object of SVGForm
      * @param `pt` a Point object to specify the anchor point
      * @param `txt` a string of text to draw
      * @param `maxWidth` specify a maximum width per line
      */
    static text(ctx, pt, txt) {
      let elem = SVGSpace.svgElement(ctx.group, "text", _SVGForm.getID(ctx));
      DOMSpace.setAttr(elem, {
        "pointer-events": "none",
        x: pt[0],
        y: pt[1],
        dx: 0,
        dy: 0,
        "class": `pts-svgform pts-text ${ctx.currentClass}`
      });
      elem.textContent = txt;
      _SVGForm.style(elem, ctx.style);
      return elem;
    }
    /**
      * Draw text on canvas.
      * @param `pt` a Pt or numeric array to specify the anchor point
      * @param `txt` text
      * @param `maxWidth` specify a maximum width per line
      */
    text(pt, txt) {
      this.nextID();
      _SVGForm.text(this._ctx, pt, txt);
      return this;
    }
    /**
      * A convenient way to draw some text on canvas for logging or debugging. It'll be draw on the top-left of the canvas as an overlay.
      * @param txt text
      */
    log(txt) {
      this.fill("#000").stroke("#fff", 0.5).text([10, 14], txt);
      return this;
    }
  };
  _SVGForm.groupID = 0;
  _SVGForm.domID = 0;
  var SVGForm = _SVGForm;

  // src/Physics.ts
  var Physics_exports = {};
  __export(Physics_exports, {
    Body: () => Body,
    Particle: () => Particle,
    World: () => World
  });
  var World = class _World {
    /**
     * Create a `World` for 2D physics simulation.
     * @param bound a Group or an Iterable<Pt> representing a rectangular bounding box
     * @param friction a value between 0 to 1, where 1 means no friction. Default is 1
     * @param gravity a number of a Pt to define gravitational force. A number is a shorthand to set `new Pt(0, n)`. Default is 0.
     */
    constructor(bound, friction = 1, gravity = 0) {
      this._lastTime = null;
      this._gravity = new Pt();
      this._friction = 1;
      // general friction
      this._damping = 0.75;
      // collision damping
      this._iterations = 1;
      this._particles = [];
      this._bodies = [];
      this._pnames = [];
      // particle name index
      this._bnames = [];
      this._bound = Bound.fromGroup(bound);
      this._friction = friction;
      this._gravity = typeof gravity === "number" ? new Pt(0, gravity) : new Pt(gravity);
      return this;
    }
    /**
     * Current bound in this `World`.
     */
    get bound() {
      return this._bound;
    }
    set bound(bound) {
      this._bound = bound;
    }
    /**
     * Current gravity in this `World`.
     */
    get gravity() {
      return this._gravity;
    }
    set gravity(g) {
      this._gravity = g;
    }
    /**
     * Current friction in this `World`.
     */
    get friction() {
      return this._friction;
    }
    set friction(f) {
      this._friction = f;
    }
    /**
     * Current damping in this `World`.
     */
    get damping() {
      return this._damping;
    }
    set damping(f) {
      this._damping = f;
    }
    /**
     * constraint solver iterations.
     */
    get iterations() {
      return this._iterations;
    }
    set iterations(f) {
      this._iterations = f;
    }
    /**
     * Get the number of bodies.
     */
    get bodyCount() {
      return this._bodies.length;
    }
    /**
     * Get the number of particles.
     */
    get particleCount() {
      return this._particles.length;
    }
    /**
     * Get a body in this world by index or string id.
     * @param id numeric index of the body, or a string id that associates with it.
     * @returns a Body, or undefined if not found
     */
    body(id) {
      if (typeof id === "string" && id.length > 0) {
        return this._bodies[this._bnames.indexOf(id)];
      }
      return typeof id === "number" && id >= 0 ? this._bodies[id] : void 0;
    }
    /**
     * Get a particle in this world by index or string id.
     * @param id numeric index of the particle, or a string id that associates with it. 
     * @returns a Particle, or undefined if not found
     */
    particle(id) {
      if (typeof id === "string" && id.length > 0) {
        return this._particles[this._pnames.indexOf(id)];
      }
      return typeof id === "number" && id >= 0 ? this._particles[id] : void 0;
    }
    /**
     * Given a body's name, return its index in the bodies array, or -1 if not found.
     * @param name name of the body
     * @returns index number, or -1 if not found
     */
    bodyIndex(name) {
      return this._bnames.indexOf(name);
    }
    /**
     * Given a particle's name, return its index in the particles array, or -1 if not found.
     * @param name name of the particle
     * @returns index number, or -1 if not found
     */
    particleIndex(name) {
      return this._pnames.indexOf(name);
    }
    /**
     * Update this world by one time-step.
     * @param ms change in time in milliseconds
     */
    update(ms) {
      let dt = ms / 1e3;
      this._updateParticles(dt);
      this._updateBodies(dt);
    }
    /**
     * Draw particles using the provided function.
     * @param fn a function that draws a particle passed in the parameters `(particle, index)`.
     */
    drawParticles(fn) {
      this._drawParticles = fn;
    }
    /**
     * Draw bodies using the provided function.
     * @param fn a function that draws a body passed in the parameters `(body, index)`.
     */
    drawBodies(fn) {
      this._drawBodies = fn;
    }
    /**
     * Add a particle or body to this world.
     * @param p `Particle` or `Body` instance
     * @param name optional name, which can be referenced in `body()` or `particle()` function to retrieve this back.
     */
    add(p, name = "") {
      if (p instanceof Body) {
        this._bodies.push(p);
        this._bnames.push(name);
      } else {
        this._particles.push(p);
        this._pnames.push(name);
      }
      return this;
    }
    _index(fn, id) {
      let index = 0;
      if (typeof id === "string") {
        index = fn(id);
        if (index < 0)
          throw new Error(`Cannot find index of ${id}. You can use particleIndex() or bodyIndex() function to check existence by name.`);
      } else {
        index = id;
      }
      return index;
    }
    /**
     * Remove bodies from this world. Support removing a range and negative index.
     * @param from Start index, which can be negative (where -1 is at index 0, -2 at index 1, etc) 
     * @param count Number of items to remove. Default is 1.
     */
    removeBody(from, count = 1) {
      const index = this._index(this.bodyIndex.bind(this), from);
      const param = index < 0 ? [index * -1 - 1, count] : [index, count];
      this._bodies.splice(param[0], param[1]);
      this._bnames.splice(param[0], param[1]);
      return this;
    }
    /**
     * Remove particles from this world. Support removing a range and negative index.
     * @param from Start index, which can be negative (where -1 is at index 0, -2 at index 1, etc) 
     * @param count Number of items to remove. Default is 1.
     */
    removeParticle(from, count = 1) {
      const index = this._index(this.particleIndex.bind(this), from);
      const param = index < 0 ? [index * -1 - 1, count] : [index, count];
      this._particles.splice(param[0], param[1]);
      this._pnames.splice(param[0], param[1]);
      return this;
    }
    /**
     * Static function to calculate edge constraints between 2 particles.
     * @param p1 particle 1
     * @param p2 particle 1
     * @param dist distance between particles
     * @param stiff stiffness between 0 to 1.
     * @param precise use precise distance calculation. Default is `false`.
     */
    static edgeConstraint(p1, p2, dist, stiff = 1, precise = false) {
      const m1 = 1 / (p1.mass || 1);
      const m2 = 1 / (p2.mass || 1);
      const mm = m1 + m2;
      let delta = p2.$subtract(p1);
      let distSq = dist * dist;
      let d = precise ? dist / delta.magnitude() - 1 : distSq / (delta.dot(delta) + distSq) - 0.5;
      let f = delta.$multiply(d * stiff);
      p1.subtract(f.$multiply(m1 / mm));
      p2.add(f.$multiply(m2 / mm));
      return p1;
    }
    /**
     * Static function to calculate bounding box constraints.
     * @param p particle
     * @param rect a Group or an Iterable<Pt> representing a bounding box
     * @param damping damping between 0 to 1, where 1 means no damping. Default is 0.75.
     */
    static boundConstraint(p, rect, damping = 0.75) {
      let bound = Geom.boundingBox(rect);
      let np = p.$min(bound[1].subtract(p.radius)).$max(bound[0].add(p.radius));
      if (np[0] === bound[0][0] || np[0] === bound[1][0]) {
        let c = p.changed.$multiply(damping);
        p.previous = np.$subtract(new Pt(-c[0], c[1]));
      } else if (np[1] === bound[0][1] || np[1] === bound[1][1]) {
        let c = p.changed.$multiply(damping);
        p.previous = np.$subtract(new Pt(c[0], -c[1]));
      }
      p.to(np);
    }
    /**
     * Internal integrate function
     * @param p particle
     * @param dt time changed
     * @param prevDt previous change in time, optional
     */
    integrate(p, dt, prevDt) {
      p.addForce(this._gravity);
      p.verlet(dt, this._friction, prevDt);
      return p;
    }
    /**
     * Internal function to update particles
     */
    _updateParticles(dt) {
      for (let i = 0, len = this._particles.length; i < len; i++) {
        let p = this._particles[i];
        this.integrate(p, dt, this._lastTime);
        _World.boundConstraint(p, this._bound, this._damping);
        for (let k = i + 1; k < len; k++) {
          if (i !== k) {
            let p2 = this._particles[k];
            p.collide(p2, this._damping);
          }
        }
        if (this._drawParticles)
          this._drawParticles(p, i);
      }
      this._lastTime = dt;
    }
    /**
     * Internal function to update bodies
     */
    _updateBodies(dt) {
      for (let i = 0, len = this._bodies.length; i < len; i++) {
        let bds = this._bodies[i];
        if (bds) {
          for (let k = 0, klen = bds.length; k < klen; k++) {
            let bk = bds[k];
            _World.boundConstraint(bk, this._bound, this._damping);
            this.integrate(bk, dt, this._lastTime);
          }
          for (let k = i + 1; k < len; k++) {
            bds.processBody(this._bodies[k]);
          }
          for (let m = 0, mlen = this._particles.length; m < mlen; m++) {
            bds.processParticle(this._particles[m]);
          }
          for (let i2 = 0; i2 < this._iterations; i2++) {
            bds.processEdges();
          }
          if (this._drawBodies)
            this._drawBodies(bds, i);
        }
      }
    }
  };
  var Particle = class extends Pt {
    /**
     * Create a particle. Once a particle is created, you can set its mass and radius via the corresponding accessors.
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    constructor(...args) {
      super(...args);
      this._mass = 1;
      this._radius = 0;
      this._force = new Pt();
      this._prev = new Pt();
      this._lock = false;
      this._prev = this.clone();
    }
    /**
     * Mass of this particle.
     */
    get mass() {
      return this._mass;
    }
    set mass(m) {
      this._mass = m;
    }
    /**
     * Radius of this particle.
     */
    get radius() {
      return this._radius;
    }
    set radius(f) {
      this._radius = f;
    }
    /**
     * Get this particle's previous position.
     */
    get previous() {
      return this._prev;
    }
    set previous(p) {
      this._prev = p;
    }
    /**
     * Get current accumulated force.
     */
    get force() {
      return this._force;
    }
    set force(g) {
      this._force = g;
    }
    /**
     * Get the body of this particle, if any.
     */
    get body() {
      return this._body;
    }
    set body(b) {
      this._body = b;
    }
    /**
     * Lock this particle in current position.
     */
    get lock() {
      return this._lock;
    }
    set lock(b) {
      this._lock = b;
      this._lockPt = new Pt(this);
    }
    /**
     * Get the change in position since last time step.
     */
    get changed() {
      return this.$subtract(this._prev);
    }
    /**
     * Set a new position, and update previous and lock states if needed.
     */
    set position(p) {
      this.previous.to(this);
      if (this._lock)
        this._lockPt = p;
      this.to(p);
    }
    /**
     * Set the size of this particle. This sets both the radius and the mass.
     * @param r `radius` value, and also set `mass` to the same value.
     */
    size(r) {
      this._mass = r;
      this._radius = r;
      return this;
    }
    /**
     * Add to the accumulated force.
     * @param args a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     */
    addForce(...args) {
      this._force.add(...args);
      return this._force;
    }
    /**
     * Verlet integration. 
     * @param dt change in time 
     * @param friction friction from 0 to 1, where 1 means no friction
     * @param lastDt optional last change in time 
     */
    verlet(dt, friction, lastDt) {
      if (this._lock) {
        this.to(this._lockPt);
      } else {
        let lt = lastDt ? lastDt : dt;
        let a = this._force.multiply(dt * (dt + lt) / 2);
        let v = this.changed.multiply(friction * dt / lt).add(a);
        this._prev = this.clone();
        this.add(v);
        this._force = new Pt();
      }
      return this;
    }
    /**
     * Hit this particle with an impulse.
     * @param args an impulse vector defined by either a list of numeric parameters, an array of numbers, or an object with {x,y,z,w} properties
     * @example `hit(10, 20)`, `hit( new Pt(5, 9) )`
     */
    hit(...args) {
      this._prev.subtract(new Pt(...args).$divide(Math.sqrt(this._mass)));
      return this;
    }
    /**
     * Check and respoond to collisions between this and another particle.
     * @param p2 another particle
     * @param damp damping value between 0 to 1, where 1 means no damping.
     */
    collide(p2, damp = 1) {
      let p1 = this;
      let dp = p1.$subtract(p2);
      let distSq = dp.magnitudeSq();
      let dr = p1.radius + p2.radius;
      if (distSq < dr * dr) {
        let c1 = p1.changed;
        let c2 = p2.changed;
        let dist = Math.sqrt(distSq);
        let d = dp.$multiply((dist - dr) / dist / 2);
        let np1 = p1.$subtract(d);
        let np2 = p2.$add(d);
        p1.to(np1);
        p2.to(np2);
        let f1 = damp * dp.dot(c1) / distSq;
        let f2 = damp * dp.dot(c2) / distSq;
        let dm1 = p1.mass / (p1.mass + p2.mass);
        let dm2 = p2.mass / (p1.mass + p2.mass);
        c1.add(new Pt(f2 * dp[0] - f1 * dp[0], f2 * dp[1] - f1 * dp[1]).$multiply(dm2));
        c2.add(new Pt(f1 * dp[0] - f2 * dp[0], f1 * dp[1] - f2 * dp[1]).$multiply(dm1));
        p1.previous = p1.$subtract(c1);
        p2.previous = p2.$subtract(c2);
      }
    }
    /**
     * Get a string representation of this particle
     */
    toString() {
      return `Particle: ${this[0]} ${this[1]} | previous ${this._prev[0]} ${this._prev[1]} | mass ${this._mass}`;
    }
  };
  var Body = class _Body extends Group {
    /**
     * Create an empty Body, this is usually followed by [`Body.init`](#link) to populate the Body. Alternatively, use static function [`Body.fromGroup`](#link) to create and initate a body directly.
     */
    constructor() {
      super();
      this._cs = [];
      this._stiff = 1;
      this._locks = {};
      this._mass = 1;
    }
    /**
     * Create and populate a body.
     * @param body a Group or an Iterable<Pt> to define the body
     * @param stiff stiffness value from 0 to 1, where 1 is the most stiff. Default is 1.
     * @param autoLink Automatically create links between the Pts. This usually works for regular convex polygons. Default is true.
     * @param autoMass Automatically calculate the mass based on the area of the polygon. Default is true.
     */
    static fromGroup(body, stiff = 1, autoLink = true, autoMass = true) {
      let b = new _Body().init(body);
      if (autoLink)
        b.linkAll(stiff);
      if (autoMass)
        b.autoMass();
      return b;
    }
    /**
     * Initiate a body.
     * @param body a Group or an Iterable<Pt> to define a body
     * @param stiff stiffness value from 0 to 1, where 1 is the most stiff. Default is 1.
     */
    init(body, stiff = 1) {
      let c = new Pt();
      for (let li of body) {
        let p = new Particle(li);
        p.body = this;
        c.add(li);
        this.push(p);
      }
      this._stiff = stiff;
      return this;
    }
    /**
     * Get mass of this body. 
     */
    get mass() {
      return this._mass;
    }
    set mass(m) {
      this._mass = m;
      for (let i = 0, len = this.length; i < len; i++) {
        this[i].mass = this._mass;
      }
    }
    /**
     * Automatically calculate a body's `mass` based on the area of the polygon.
     */
    autoMass() {
      this.mass = Math.sqrt(Polygon.area(this)) / 10;
      return this;
    }
    /**
     * Create a linked edge between two points.
     * @param index1 first point by index
     * @param index2 first point by index
     * @param stiff optionally stiffness value between 0 to 1, where 1 is the most stiff.
     */
    link(index1, index2, stiff) {
      if (index1 < 0 || index1 >= this.length)
        throw new Error("index1 is not in the Group's indices");
      if (index2 < 0 || index2 >= this.length)
        throw new Error("index1 is not in the Group's indices");
      let d = this[index1].$subtract(this[index2]).magnitude();
      this._cs.push([index1, index2, d, stiff || this._stiff]);
      return this;
    }
    /**
     * Automatically create links for all the points to preserve the initial body shape. This usually works for regular convex polygon.
     * @param stiff optionally stiffness value between 0 to 1, where 1 is the most stiff.
     */
    linkAll(stiff) {
      let half = this.length / 2;
      for (let i = 0, len = this.length; i < len; i++) {
        let n = i >= len - 1 ? 0 : i + 1;
        this.link(i, n, stiff);
        if (len > 4) {
          let nd = Math.floor(half / 2) + 1;
          let n2 = i >= len - nd ? i % len : i + nd;
          this.link(i, n2, stiff);
        }
        if (i <= half - 1) {
          this.link(i, Math.min(this.length - 1, i + Math.floor(half)));
        }
      }
    }
    /**
     * Return a list of all the linked edges as line segments.
     * @returns an array of Groups, each of which represents an edge
     */
    linksToLines() {
      let gs = [];
      for (let i = 0, len = this._cs.length; i < len; i++) {
        let ln = this._cs[i];
        gs.push(new Group(this[ln[0]], this[ln[1]]));
      }
      return gs;
    }
    /**
     * Recalculate all edge constraints.
     */
    processEdges() {
      for (let i = 0, len = this._cs.length; i < len; i++) {
        let [m, n, d, s] = this._cs[i];
        World.edgeConstraint(this[m], this[n], d, s);
      }
    }
    /**
     * Check and respond to collisions between two bodies.
     * @param b another body
     */
    processBody(b) {
      let b1 = this;
      let b2 = b;
      let hit = Polygon.hasIntersectPolygon(b1, b2);
      if (hit) {
        let cv = hit.normal.$multiply(hit.dist);
        let t;
        let eg = hit.edge;
        if (Math.abs(eg[0][0] - eg[1][0]) > Math.abs(eg[0][1] - eg[1][1])) {
          t = (hit.vertex[0] - cv[0] - eg[0][0]) / (eg[1][0] - eg[0][0]);
        } else {
          t = (hit.vertex[1] - cv[1] - eg[0][1]) / (eg[1][1] - eg[0][1]);
        }
        let lambda = 1 / (t * t + (1 - t) * (1 - t));
        let m0 = hit.vertex.body.mass || 1;
        let m1 = hit.edge[0].body.mass || 1;
        let mr0 = m0 / (m0 + m1);
        let mr1 = m1 / (m0 + m1);
        eg[0].subtract(cv.$multiply(mr0 * (1 - t) * lambda / 2));
        eg[1].subtract(cv.$multiply(mr0 * t * lambda / 2));
        hit.vertex.add(cv.$multiply(mr1));
      }
    }
    /**
     * Check and respond to collisions between this body and a particle.
     * @param b a particle
     */
    processParticle(b) {
      let b1 = this;
      let b2 = b;
      let hit = Polygon.hasIntersectCircle(b1, Circle.fromCenter(b, b.radius));
      if (hit) {
        let cv = hit.normal.$multiply(hit.dist);
        let t;
        let eg = hit.edge;
        if (Math.abs(eg[0][0] - eg[1][0]) > Math.abs(eg[0][1] - eg[1][1])) {
          t = (hit.vertex[0] - cv[0] - eg[0][0]) / (eg[1][0] - eg[0][0]);
        } else {
          t = (hit.vertex[1] - cv[1] - eg[0][1]) / (eg[1][1] - eg[0][1]);
        }
        let lambda = 1 / (t * t + (1 - t) * (1 - t));
        let m0 = hit.vertex.mass || b2.mass || 1;
        let m1 = hit.edge[0].body.mass || 1;
        let mr0 = m0 / (m0 + m1);
        let mr1 = m1 / (m0 + m1);
        eg[0].subtract(cv.$multiply(mr0 * (1 - t) * lambda / 2));
        eg[1].subtract(cv.$multiply(mr0 * t * lambda / 2));
        let c1 = b.changed.add(cv.$multiply(mr1));
        b.previous = b.$subtract(c1);
      }
    }
  };

  // src/Play.ts
  var Play_exports = {};
  __export(Play_exports, {
    Sound: () => Sound,
    Tempo: () => Tempo
  });
  var Tempo = class _Tempo {
    /**
     * Construct a new Tempo instance by beats-per-minute. Alternatively, you can use [`Tempo.fromBeat`](#link) to create from milliseconds.
     * @param bpm beats per minute
     */
    constructor(bpm) {
      // millis per beat
      this._listeners = {};
      this._listenerInc = 0;
      this.bpm = bpm;
    }
    /**
     * Create a new Tempo instance by specifying milliseconds-per-beat.
     * @param ms milliseconds per beat
     */
    static fromBeat(ms) {
      return new _Tempo(6e4 / ms);
    }
    /**
     * Beats-per-minute value
     */
    get bpm() {
      return this._bpm;
    }
    set bpm(n) {
      this._bpm = n;
      this._ms = 6e4 / this._bpm;
    }
    /**
     * Milliseconds per beat (Note that this is derived from the bpm value).
     */
    get ms() {
      return this._ms;
    }
    set ms(n) {
      this._bpm = Math.floor(6e4 / n);
      this._ms = 6e4 / this._bpm;
    }
    // Get a listener unique id
    _createID(listener) {
      let id = "";
      if (typeof listener === "function") {
        id = "_b" + this._listenerInc++;
      } else {
        id = listener.name || "_b" + this._listenerInc++;
      }
      return id;
    }
    /**
     * This is a core function that let you specify a rhythm and then define responses by calling the `start` and `progress` functions from the returned object. See [Animation guide](../guide/Animation-0700.html) for more details.
     * The `start` function lets you set a callback on every start. It takes a function ([`ITempoStartFn`](#link)).
     * The `progress` function lets you set a callback during progress. It takes a function ([`ITempoProgressFn`](#link)). Both functions let you optionally specify a time offset and a custom name.
     * See [Animation guide](../guide/animation-0700.html) for more details.
     * @param beats a rhythm in beats as a number or an array of numbers
     * @example `tempo.every(2).start( (count) => ... )`, `tempo.every([2,4,6]).progress( (count, t) => ... )`
     * @returns an object with chainable functions
     */
    every(beats) {
      const self = this;
      const p = Array.isArray(beats) ? beats[0] : beats;
      return {
        start: function(fn, offset = 0, name) {
          const id = name || self._createID(fn);
          self._listeners[id] = { name: id, beats, period: p, index: 0, offset, duration: -1, continuous: false, fn };
          return this;
        },
        progress: function(fn, offset = 0, name) {
          const id = name || self._createID(fn);
          self._listeners[id] = { name: id, beats, period: p, index: 0, offset, duration: -1, continuous: true, fn };
          return this;
        }
      };
    }
    /**
     * Usually you can add a tempo instance to a space via [`Space.add`](#link) and it will track time automatically.
     * But if necessary, you can track time manually via this function.
     * @param time current time in milliseconds
     */
    track(time) {
      for (const k in this._listeners) {
        if (this._listeners.hasOwnProperty(k)) {
          const li = this._listeners[k];
          const _t = li.offset ? time + li.offset : time;
          const ms = li.period * this._ms;
          let isStart = false;
          if (_t > li.duration + ms) {
            li.duration = _t - _t % this._ms;
            if (Array.isArray(li.beats)) {
              li.index = (li.index + 1) % li.beats.length;
              li.period = li.beats[li.index];
            }
            isStart = true;
          }
          const count = Math.max(0, Math.ceil(Math.floor(li.duration / this._ms) / li.period));
          const params = li.continuous ? [count, Num.clamp((_t - li.duration) / ms, 0, 1), _t, isStart] : [count];
          if (li.continuous || isStart) {
            const done = li.fn.apply(li, params);
            if (done)
              delete this._listeners[li.name];
          }
        }
      }
    }
    /**
     * Remove a `start` or `progress` callback function from the list of callbacks. See [`Tempo.every`](#link) for details
     * @param name a name string specified when creating the callback function.
     */
    stop(name) {
      if (this._listeners[name])
        delete this._listeners[name];
    }
    /**
     * IPlayer interface. Internal implementation that calls `track( time )`.
     */
    animate(time, ftime) {
      this.track(time);
    }
    /**
     * IPlayer interface. Not implementated.
     */
    resize(bound, evt) {
      return;
    }
    /**
     * IPlayer interface. Not implementated.
     */
    action(type, px, py, evt) {
      return;
    }
  };
  var Sound = class _Sound {
    // Tracking play time against ctx.currentTime
    /**
     * Construct a `Sound` instance. Usually, it's more convenient to use one of the static methods like [`Sound.load`](#function_load) or [`Sound.from`](#function_from).
     * @param type a `SoundType` string: "file", "input", or "gen"
     */
    constructor(type) {
      this._playing = false;
      this._type = type;
      this._createAudioContext();
    }
    /**
     * Create an AudioContext instance. This is called internally only.
     */
    _createAudioContext() {
      const _ctx = window.AudioContext;
      if (!_ctx)
        throw new Error("Your browser doesn't support Web Audio. (No AudioContext)");
      this._ctx = _ctx ? new _ctx() : void 0;
    }
    /**
     * Create a `Sound` given an [AudioNode](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode) and an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) from Web Audio API. See also [this example](../guide/js/examples/tone.html) using tone.js in the [guide](../guide/Sound-0800.html).
     * @param node an AudioNode instance
     * @param ctx an AudioContext instance
     * @param type a string representing a type of input source: either "file", "input", or "gen".
     * @param stream Optionally include a MediaStream, if the type is "input"
     * @returns a `Sound` instance
     */
    static from(node, ctx, type = "gen", stream) {
      const s = new _Sound(type);
      s._node = node;
      s._ctx = ctx;
      if (stream)
        s._stream = stream;
      return s;
    }
    /**
     * Create a `Sound` by loading from a sound file or an audio element.
     * @param source either an url string to load a sound file, or an audio element.
     * @param crossOrigin whether to support loading cross-origin. Default is "anonymous".
     * @returns a `Sound` instance
     * @example `Sound.load( '/path/to/file.mp3' )`
     */
    static load(source, crossOrigin = "anonymous") {
      return new Promise((resolve, reject) => {
        const s = new _Sound("file");
        s._source = typeof source === "string" ? new Audio(source) : source;
        s._source.autoplay = false;
        s._source.crossOrigin = crossOrigin;
        s._source.addEventListener("ended", function() {
          s._playing = false;
        });
        s._source.addEventListener("error", function() {
          reject("Error loading sound");
        });
        s._source.addEventListener("canplaythrough", function() {
          if (!s._node) {
            s._node = s._ctx.createMediaElementSource(s._source);
          }
          resolve(s);
        });
      });
    }
    /**
     * Create a `Sound` by loading from a sound file url as `AudioBufferSourceNode`. This method is cumbersome since it can only be played once.
     * Use this method for now if you need to visualize sound in Safari and iOS. Once Apple has full support for FFT with streaming `HTMLMediaElement`, this method will likely be deprecated.
     * @param url an url to the sound file
     */
    static loadAsBuffer(url) {
      return new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.responseType = "arraybuffer";
        const s = new _Sound("file");
        request.onload = function() {
          s._ctx.decodeAudioData(request.response, function(buffer) {
            s.createBuffer(buffer);
            resolve(s);
          }, (err) => reject("Error decoding audio"));
        };
        request.send();
      });
    }
    /**
     * Create or re-use an AudioBuffer. Only needed if you are using `Sound.loadAsBuffer`.
     * @param buf an AudioBuffer. Optionally, you can call this without parameters to re-use existing buffer.
     */
    createBuffer(buf) {
      this._node = this._ctx.createBufferSource();
      if (buf !== void 0)
        this._buffer = buf;
      this._node.buffer = this._buffer;
      this._node.onended = () => {
        this._playing = false;
      };
      return this;
    }
    /**
     * Create a `Sound` by generating a waveform using [OscillatorNode](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode).
     * @param type a string representing the waveform type: "sine", "square", "sawtooth", "triangle", "custom"
     * @param val the frequency value in Hz to play, or a PeriodicWave instance if type is "custom".
     * @returns a `Sound` instance
     * @example `Sound.generate( 'sine', 120 )`
     */
    static generate(type, val) {
      const s = new _Sound("gen");
      return s._gen(type, val);
    }
    // Create the oscillator
    _gen(type, val) {
      this._node = this._ctx.createOscillator();
      const osc = this._node;
      osc.type = type;
      if (type === "custom") {
        osc.setPeriodicWave(val);
      } else {
        osc.frequency.value = val;
      }
      return this;
    }
    /**
     * Create a `Sound` by streaming from an input device like microphone. Note that this function returns a Promise which resolves to a Sound instance.
     * @param constraint @param constraint Optional constraints which can be used to select a specific input device. For example, you may use [`enumerateDevices`](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/enumerateDevices) to find a specific deviceId;
     * @returns a `Promise` which resolves to `Sound` instance
     * @example `Sound.input().then( s => sound = s );`
     */
    static input(constraint) {
      return __async(this, null, function* () {
        try {
          const s = new _Sound("input");
          if (!s)
            return void 0;
          const c = constraint ? constraint : { audio: true, video: false };
          s._stream = yield navigator.mediaDevices.getUserMedia(c);
          s._node = s._ctx.createMediaStreamSource(s._stream);
          return s;
        } catch (e) {
          console.error("Cannot get audio from input device.");
          return Promise.resolve(null);
        }
      });
    }
    /**
     * Get this Sound's AudioContext instance for advanced use-cases.
     */
    get ctx() {
      return this._ctx;
    }
    /**
     * Get this Sound's AudioNode subclass instance for advanced use-cases.
     */
    get node() {
      return this._node;
    }
    /**
     * Get this Sound's Output node AudioNode instance for advanced use-cases.
     */
    get outputNode() {
      return this._outputNode;
    }
    /**
     * Get this Sound's MediaStream (eg, from microphone, if in use) instance for advanced use-cases. See [`Sound.input`](#link)
     */
    get stream() {
      return this._stream;
    }
    /**
     * Get this Sound's Audio element (if used) instance for advanced use-cases. See [`Sound.load`](#link).
     */
    get source() {
      return this._source;
    }
    /**
     * Get this Sound's AudioBuffer (if any) instance for advanced use-cases. See [`Sound.loadAsBuffer`](#link).
     */
    get buffer() {
      return this._buffer;
    }
    set buffer(b) {
      this._buffer = b;
    }
    /**
     * Get the type of input for this Sound instance. Either "file", "input", or "gen"
     */
    get type() {
      return this._type;
    }
    /**
     * Indicate whether the sound is currently playing.
     */
    get playing() {
      return this._playing;
    }
    /**
     * A value between 0 to 1 to indicate playback progress.
     */
    get progress() {
      let dur = 0;
      let curr = 0;
      if (this._buffer) {
        dur = this._buffer.duration;
        curr = this._timestamp ? this._ctx.currentTime - this._timestamp : 0;
      } else {
        dur = this._source.duration;
        curr = this._source.currentTime;
      }
      return curr / dur;
    }
    /**
     * Indicate whether the sound is ready to play. When loading from a file, this corresponds to a ["canplaythrough"](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState) event.
     * You can also use `this.source.addEventListener( 'canplaythrough', ...)` if needed. See also [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/canplaythrough_event).
     */
    get playable() {
      return this._type === "input" ? this._node !== void 0 : !!this._buffer || this._source.readyState === 4;
    }
    /**
     * If an analyzer is added (see [`analyze`](##unction_analyze) function), get the number of frequency bins in the analyzer.
     */
    get binSize() {
      return this.analyzer.size;
    }
    /**
     * Get the sample rate of the audio, for example, at 44100 hz.
     */
    get sampleRate() {
      return this._ctx.sampleRate;
    }
    /**
     * If the sound is generated, this sets and gets the frequency of the tone.
     */
    get frequency() {
      return this._type === "gen" ? this._node.frequency.value : 0;
    }
    set frequency(f) {
      if (this._type === "gen")
        this._node.frequency.value = f;
    }
    /**
     * Connect another AudioNode to this `Sound` instance's AudioNode. Using this function, you can extend the capabilities of this `Sound` instance for advanced use cases such as filtering.
     * @param node another AudioNode
     */
    connect(node) {
      this._node.connect(node);
      return this;
    }
    /**
     * Sets the 'output' node for this Sound
     * This would typically be used after Sound.connect, if you are adding nodes
     * in your chain for filtering purposes.
     * @param  outputNode The AudioNode that should connect to the AudioContext
     */
    setOutputNode(outputNode) {
      this._outputNode = outputNode;
      return this;
    }
    /**
     * Removes the 'output' node added from setOuputNode
     * Note: if you start the Sound after calling this, it will play via the default node
     */
    removeOutputNode() {
      this._outputNode = null;
      return this;
    }
    /**
     * Add an analyzer to this `Sound`. Call this once only.
     * @param size the number of frequency bins
     * @param minDb Optional minimum decibels (corresponds to `AnalyserNode.minDecibels`)
     * @param maxDb Optional maximum decibels (corresponds to `AnalyserNode.maxDecibels`)
     * @param smooth Optional smoothing value (corresponds to `AnalyserNode.smoothingTimeConstant`)
     */
    analyze(size = 256, minDb = -100, maxDb = -30, smooth = 0.8) {
      const a = this._ctx.createAnalyser();
      a.fftSize = size * 2;
      a.minDecibels = minDb;
      a.maxDecibels = maxDb;
      a.smoothingTimeConstant = smooth;
      this.analyzer = {
        node: a,
        size: a.frequencyBinCount,
        data: new Uint8Array(a.frequencyBinCount)
      };
      this._node.connect(this.analyzer.node);
      return this;
    }
    // Get either time-domain or frequency domain
    _domain(time) {
      if (this.analyzer) {
        if (time) {
          this.analyzer.node.getByteTimeDomainData(this.analyzer.data);
        } else {
          this.analyzer.node.getByteFrequencyData(this.analyzer.data);
        }
        return this.analyzer.data;
      }
      return new Uint8Array(0);
    }
    // Map domain data to another range
    _domainTo(time, size, position = [0, 0], trim = [0, 0]) {
      const data = time ? this.timeDomain() : this.freqDomain();
      const g = new Group();
      for (let i = trim[0], len = data.length - trim[1]; i < len; i++) {
        g.push(new Pt(position[0] + size[0] * i / len, position[1] + size[1] * data[i] / 255));
      }
      return g;
    }
    /**
     * Get the raw time-domain data from analyzer as unsigned 8-bit integers. An analyzer must be added before calling this function (See [analyze](#function_analyze) function).
     */
    timeDomain() {
      return this._domain(true);
    }
    /**
     * Map the time-domain data from analyzer to a range. An analyzer must be added before calling this function (See [analyze](#function_analyze) function).
     * @param size map each data point `[index, value]` to `[width, height]`
     * @param position Optionally, set a starting `[x, y]` position. Default is `[0, 0]`
     * @param trim Optionally, trim the start and end values by `[startTrim, data.length-endTrim]`
     * @returns a Group containing the mapped values
     * @example form.point( s.timeDomainTo( space.size ) )
     */
    timeDomainTo(size, position = [0, 0], trim = [0, 0]) {
      return this._domainTo(true, size, position, trim);
    }
    /**
     * Get the raw frequency-domain data from analyzer as unsigned 8-bit integers. An analyzer must be added before calling this function (See [analyze](#function_analyze) function).
     */
    freqDomain() {
      return this._domain(false);
    }
    /**
     * Map the frequency-domain data from analyzer to a range. An analyzer must be added before calling this function (See [analyze](#function_analyze) function).
     * @param size map each data point `[index, value]` to `[width, height]`
     * @param position Optionally, set a starting `[x, y]` position. Default is `[0, 0]`
     * @param trim Optionally, trim the start and end values by `[startTrim, data.length-endTrim]`
     * @returns a Group containing the mapped values
     * @example `form.point( s.freqDomainTo( space.size ) )`
     */
    freqDomainTo(size, position = [0, 0], trim = [0, 0]) {
      return this._domainTo(false, size, position, trim);
    }
    /**
     * Stop playing and disconnect the AudioNode.
     */
    reset() {
      this.stop();
      this._node.disconnect();
      return this;
    }
    /**
     * Start playing. Internally this connects the `AudioNode` to `AudioContext`'s destination.
     * @param timeAt optional parameter to play from a specific time
     */
    start(timeAt = 0) {
      if (!this._ctx) {
        this._createAudioContext();
      } else if (this._ctx.state === "suspended") {
        this._ctx.resume();
      }
      if (this._type === "file") {
        if (this._buffer) {
          this._node.start(timeAt);
          this._timestamp = this._ctx.currentTime + timeAt;
        } else {
          this._source.play();
          if (timeAt > 0)
            this._source.currentTime = timeAt;
        }
      } else if (this._type === "gen") {
        this._gen(this._node.type, this._node.frequency.value);
        this._node.start();
        if (this.analyzer)
          this._node.connect(this.analyzer.node);
      }
      (this._outputNode || this._node).connect(this._ctx.destination);
      this._playing = true;
      return this;
    }
    /**
     * Stop playing. Internally this also disconnects the `AudioNode` from `AudioContext`'s destination.
     */
    stop() {
      if (this._playing)
        (this._outputNode || this._node).disconnect(this._ctx.destination);
      if (this._type === "file") {
        if (this._buffer) {
          if (this.progress < 1)
            this._node.stop();
        } else {
          this._source.pause();
        }
      } else if (this._type === "gen") {
        this._node.stop();
      } else if (this._type === "input") {
        this._stream.getAudioTracks().forEach((track) => track.stop());
      }
      this._playing = false;
      return this;
    }
    /**
     * Toggle between `start` and `stop`. This won't work if using [`Sound.loadAsBuffer`](#link), since `AudioBuffer` can only be played once. (See [`Sound.createBuffer`](#link) to reset buffer for replay).
     */
    toggle() {
      if (this._playing) {
        this.stop();
      } else {
        this.start();
      }
      return this;
    }
  };

  // src/_script.ts
  globalThis.Pts = __spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues(__spreadValues({}, Canvas_exports), Create_exports), Form_exports), LinearAlgebra_exports), Num_exports), Op_exports), Pt_exports), Space_exports), Color_exports), Util_exports), Dom_exports), Svg_exports), Typography_exports), Physics_exports), UI_exports), Play_exports), Image_exports);
  globalThis.Pts.namespace = (scope) => {
    let lib = globalThis.Pts;
    for (let k in lib) {
      if (k != "namespace") {
        scope[k] = lib[k];
      }
    }
  };
  globalThis.Pts.quickStart = (id, bg = "#9ab") => {
    if (!window)
      return;
    let s = globalThis;
    globalThis.Pts.namespace(s);
    s.space = new CanvasSpace2(id).setup({ bgcolor: bg, resize: true, retina: true });
    s.form = s.space.getForm();
    return function(animate = null, start = null, action = null, resize = null) {
      s.space.add({
        start,
        animate,
        resize,
        action
      });
      s.space.bindMouse().bindTouch().play();
    };
  };
})();
/*! Pts.js is licensed under Apache License 2.0. Copyright © 2017-current William Ngan and contributors. (https://github.com/williamngan/pts) */
